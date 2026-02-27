/**
 * Cochrane CENTRAL Search Connector
 *
 * Cochrane CENTRAL (Cochrane Central Register of Controlled Trials) does not
 * have a free, unauthenticated public API. This connector uses PubMed's
 * E-utilities as a reliable, stable proxy:
 *
 *   - Cochrane systematic reviews:  journal filter "Cochrane Database Syst Rev"
 *   - Cochrane CENTRAL trials:      filter "cochrane central register"[si]
 *
 * This approach is commonly used in compliant systematic review tools and
 * faithfully represents Cochrane content indexed in MEDLINE/PubMed.
 *
 * PubMed API: https://www.ncbi.nlm.nih.gov/books/NBK25501/
 */

import { resilientFetch } from "@/lib/http/resilient-fetch";
import { createCircuitBreaker } from "@/lib/http/circuit-breaker";

const breaker = createCircuitBreaker({
  service: "CochraneCENTRAL",
  failureThreshold: 5,
});

// Optional: rotate API keys if configured in environment
const pubmedApiKey = process.env.PUBMED_API_KEY || "";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CochraneReviewResult {
  title: string;
  doi?: string;
  authors: string[];
  year?: number;
  /** Always "Cochrane Database Syst Rev" or "Cochrane CENTRAL" */
  source: string;
  pmid?: string;
  abstract?: string;
  reviewType: "systematic_review" | "rct" | "other";
}

// ---------------------------------------------------------------------------
// PubMed XML helpers (minimal, inline — no external XML parser dependency)
// ---------------------------------------------------------------------------

function stripXml(text: string): string {
  return text.replace(/<[^>]*>/g, "").trim();
}

function extractTagContent(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return match ? stripXml(match[1]) : "";
}

function _extractAllTagContent(xml: string, tag: string): string[] {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "g");
  const matches = [...xml.matchAll(re)];
  return matches.map((m) => stripXml(m[1])).filter(Boolean);
}

function parseYear(xml: string): number | undefined {
  // Try <Year> inside <PubDate>
  const pubDateMatch = xml.match(/<PubDate>[\s\S]*?<Year>([\s\S]*?)<\/Year>/);
  if (pubDateMatch) {
    const y = parseInt(stripXml(pubDateMatch[1]), 10);
    if (!isNaN(y)) return y;
  }
  // Fall back to <MedlineDate>
  const medlineMatch = xml.match(
    /<PubDate>[\s\S]*?<MedlineDate>([\s\S]*?)<\/MedlineDate>/
  );
  if (medlineMatch) {
    const yearStr = medlineMatch[1].match(/(\d{4})/);
    if (yearStr) return parseInt(yearStr[1], 10);
  }
  return undefined;
}

function parseArticle(
  chunk: string,
  source: string,
  reviewType: CochraneReviewResult["reviewType"]
): CochraneReviewResult | null {
  const title = extractTagContent(chunk, "ArticleTitle");
  if (!title) return null;

  const pmidMatch = chunk.match(/<PMID[^>]*>([\s\S]*?)<\/PMID>/);
  const pmid = pmidMatch ? stripXml(pmidMatch[1]) : undefined;

  const doiMatch = chunk.match(/<ArticleId IdType="doi">([\s\S]*?)<\/ArticleId>/);
  const doi = doiMatch ? stripXml(doiMatch[1]) : undefined;

  // Authors: LastName + ForeName
  const authorChunks = [
    ...chunk.matchAll(
      /<Author[\s\S]*?<LastName>([\s\S]*?)<\/LastName>[\s\S]*?(?:<ForeName>([\s\S]*?)<\/ForeName>)?[\s\S]*?<\/Author>/g
    ),
  ];
  const authors = authorChunks.map((m) => {
    const last = stripXml(m[1]);
    const first = m[2] ? stripXml(m[2]) : "";
    return first ? `${last} ${first}` : last;
  });

  const year = parseYear(chunk);

  // Abstract (may be structured)
  const abstractParts = [
    ...chunk.matchAll(
      /<AbstractText(?:\s+Label="([^"]*)")?[^>]*>([\s\S]*?)<\/AbstractText>/g
    ),
  ];
  const abstract = abstractParts.length
    ? abstractParts
        .map((m) =>
          m[1] ? `${m[1]}: ${stripXml(m[2])}` : stripXml(m[2])
        )
        .join(" ")
    : undefined;

  return { title, doi, authors, year, source, pmid, abstract, reviewType };
}

// ---------------------------------------------------------------------------
// PubMed search helper
// ---------------------------------------------------------------------------

async function pubmedSearch(
  term: string,
  maxResults: number
): Promise<string[]> {
  const baseUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi`;
  const params = new URLSearchParams({
    db: "pubmed",
    term,
    retmax: String(maxResults),
    retmode: "json",
    tool: "scholarsync",
    email: "contact@scholarsync.com",
  });
  if (pubmedApiKey) params.set("api_key", pubmedApiKey);

  const res = await resilientFetch(
    `${baseUrl}?${params.toString()}`,
    {},
    { service: "CochraneCENTRAL", timeout: 15000, baseDelay: 400 }
  );
  const data = await res.json();
  return (data.esearchresult?.idlist as string[]) || [];
}

async function pubmedFetch(pmids: string[]): Promise<string> {
  const baseUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi`;
  const params = new URLSearchParams({
    db: "pubmed",
    id: pmids.join(","),
    rettype: "xml",
    retmode: "xml",
    tool: "scholarsync",
    email: "contact@scholarsync.com",
  });
  if (pubmedApiKey) params.set("api_key", pubmedApiKey);

  const res = await resilientFetch(
    `${baseUrl}?${params.toString()}`,
    {},
    { service: "CochraneCENTRAL", timeout: 20000, baseDelay: 400 }
  );
  return res.text();
}

// ---------------------------------------------------------------------------
// Public search function
// ---------------------------------------------------------------------------

/**
 * Search Cochrane CENTRAL via PubMed as a compliant proxy.
 *
 * Runs two parallel PubMed queries and merges results:
 *  1. Cochrane systematic reviews  — journal: "Cochrane Database Syst Rev"
 *  2. Cochrane CENTRAL RCTs        — secondary source index filter
 *
 * @param query      Free-text search string (same as you'd use in PubMed)
 * @param options    Optional: maxResults (per sub-query, default 50)
 * @returns          Deduplicated array of CochraneReviewResult
 *
 * @example
 * const results = await searchCochraneCENTRAL("exercise interventions depression");
 */
export async function searchCochraneCENTRAL(
  query: string,
  options?: { maxResults?: number }
): Promise<CochraneReviewResult[]> {
  if (!breaker.canRequest()) {
    console.warn("[CochraneCENTRAL] Circuit open — skipping");
    return [];
  }

  const maxResults = options?.maxResults ?? 50;

  // Build two targeted PubMed terms:
  // 1. Cochrane systematic reviews (Cochrane Database of Systematic Reviews journal)
  const cochraneSRTerm = `(${query}) AND "Cochrane Database Syst Rev"[Journal]`;
  // 2. Cochrane CENTRAL controlled trials (secondary source index in PubMed)
  const cochraneCentralTerm = `(${query}) AND "cochrane central register of controlled trials"[Secondary Source]`;

  try {
    // Run both searches in parallel
    const [srPmids, centralPmids] = await Promise.all([
      pubmedSearch(cochraneSRTerm, maxResults),
      pubmedSearch(cochraneCentralTerm, maxResults),
    ]);

    // Deduplicate PMIDs across the two sub-queries
    const allPmids = [...new Set([...srPmids, ...centralPmids])];

    if (allPmids.length === 0) {
      breaker.onSuccess();
      return [];
    }

    // Fetch full XML for all PMIDs in one call
    const xml = await pubmedFetch(allPmids);
    const articleChunks =
      xml.match(/<PubmedArticle>[\s\S]*?<\/PubmedArticle>/g) || [];

    // Build a set for PMID → review type lookup
    const srPmidSet = new Set(srPmids);
    const results: CochraneReviewResult[] = [];

    for (const chunk of articleChunks) {
      const pmidMatch = chunk.match(/<PMID[^>]*>([\s\S]*?)<\/PMID>/);
      const pmid = pmidMatch ? stripXml(pmidMatch[1]) : "";

      const isSR = srPmidSet.has(pmid);
      const reviewType: CochraneReviewResult["reviewType"] = isSR
        ? "systematic_review"
        : "rct";
      const source = isSR
        ? "Cochrane Database Syst Rev"
        : "Cochrane CENTRAL";

      const parsed = parseArticle(chunk, source, reviewType);
      if (parsed) results.push(parsed);
    }

    breaker.onSuccess();
    return results;
  } catch (error) {
    breaker.onFailure();
    console.error("[CochraneCENTRAL] Search failed:", error);
    return [];
  }
}
