import type { UnifiedSearchResult } from "@/types/search";
import { mapPubMedPublicationType, getEvidenceLevel } from "@/lib/search/evidence-level";
import { createKeyRotator } from "@/lib/search/api-key-rotator";

// Initialize key rotator: prefer PUBMED_API_KEYS (comma-separated), fall back to PUBMED_API_KEY (singular)
const pubmedKeys: string[] =
  process.env.PUBMED_API_KEYS?.split(",") ??
  (process.env.PUBMED_API_KEY ? [process.env.PUBMED_API_KEY] : []);
const keyRotator = createKeyRotator(pubmedKeys);

/** Append the next rotated API key to a PubMed URL, or return the URL unchanged if no keys. */
function appendApiKey(url: string): string {
  const key = keyRotator.next();
  if (!key) return url;
  return `${url}&api_key=${encodeURIComponent(key)}`;
}

interface PubMedSearchOptions {
  maxResults?: number;
  page?: number;
  yearStart?: number;
  yearEnd?: number;
}

interface PubMedESearchResult {
  esearchresult: {
    idlist: string[];
    count: string;
  };
}

async function fetchWithRetry(
  url: string,
  maxRetries: number = 3,
  baseDelay: number = 400
): Promise<Response> {
  let currentUrl = url;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await fetch(currentUrl);
    if (response.ok) return response;
    if (response.status === 429) {
      // Rate-limited: rotate to the next key before retrying
      const baseUrl = currentUrl.replace(/&api_key=[^&]*/, "");
      currentUrl = appendApiKey(baseUrl);
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
      continue;
    }
    if (response.status >= 500) {
      // Server error: retry with the same URL (not a rate-limit issue)
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
      continue;
    }
    throw new Error(`PubMed API error: ${response.status}`);
  }
  throw new Error("PubMed API: max retries exceeded");
}

function stripXmlTags(text: string): string {
  return text.replace(/<[^>]*>/g, "").trim();
}

function parseArticle(article: string): UnifiedSearchResult | null {
  // Title
  const titleMatch = article.match(/<ArticleTitle>([\s\S]*?)<\/ArticleTitle>/);
  const title = titleMatch ? stripXmlTags(titleMatch[1]) : "";
  if (!title) return null;

  // Abstract (handle structured abstracts)
  const abstractTexts = [
    ...article.matchAll(
      /<AbstractText(?:\s+Label="([^"]*)")?[^>]*>([\s\S]*?)<\/AbstractText>/g
    ),
  ];
  const abstract = abstractTexts
    .map((m) =>
      m[1]
        ? `${m[1]}: ${stripXmlTags(m[2])}`
        : stripXmlTags(m[2])
    )
    .join(" ");

  // Authors
  const authorMatches = [
    ...article.matchAll(
      /<Author[\s\S]*?<LastName>([\s\S]*?)<\/LastName>[\s\S]*?(?:<ForeName>([\s\S]*?)<\/ForeName>)?[\s\S]*?<\/Author>/g
    ),
  ];
  const authors = authorMatches.map((m) => {
    const lastName = stripXmlTags(m[1]);
    const foreName = m[2] ? stripXmlTags(m[2]) : "";
    return foreName ? `${lastName} ${foreName}` : lastName;
  });

  // Journal
  const journalMatch =
    article.match(/<ISOAbbreviation>([\s\S]*?)<\/ISOAbbreviation>/) ||
    article.match(/<Title>([\s\S]*?)<\/Title>/);
  const journal = journalMatch ? stripXmlTags(journalMatch[1]) : "";

  // Year
  const yearMatch =
    article.match(/<PubDate>[\s\S]*?<Year>([\s\S]*?)<\/Year>/) ||
    article.match(/<PubDate>[\s\S]*?<MedlineDate>([\s\S]*?)<\/MedlineDate>/);
  const yearStr = yearMatch ? stripXmlTags(yearMatch[1]) : "";
  const yearNumMatch = yearStr.match(/(\d{4})/);
  const year = yearNumMatch ? parseInt(yearNumMatch[1], 10) : 0;

  // DOI
  const doiMatch = article.match(
    /<ArticleId IdType="doi">([\s\S]*?)<\/ArticleId>/
  );
  const doi = doiMatch ? stripXmlTags(doiMatch[1]) : undefined;

  // PMID
  const pmidMatch = article.match(
    /<PMID[^>]*>([\s\S]*?)<\/PMID>/
  );
  const pmid = pmidMatch ? stripXmlTags(pmidMatch[1]) : "";

  // Publication types
  const pubTypeMatches = [
    ...article.matchAll(/<PublicationType[^>]*>([\s\S]*?)<\/PublicationType>/g),
  ];
  const publicationTypes = pubTypeMatches.map((m) => stripXmlTags(m[1]));

  // MeSH terms
  const meshMatches = [
    ...article.matchAll(/<DescriptorName[^>]*>([\s\S]*?)<\/DescriptorName>/g),
  ];
  const meshTerms = meshMatches.map((m) => stripXmlTags(m[1]));

  // Derive study type from publication types
  let studyType = "other";
  for (const pt of publicationTypes) {
    const mapped = mapPubMedPublicationType(pt);
    if (mapped !== "other") {
      studyType = mapped;
      break;
    }
  }

  const evidence = getEvidenceLevel(studyType);

  return {
    title,
    authors,
    journal,
    year,
    doi,
    pmid,
    abstract: abstract || undefined,
    citationCount: 0,
    publicationTypes,
    meshTerms,
    studyType,
    evidenceLevel: evidence.level,
    isOpenAccess: false,
    sources: ["pubmed"],
  };
}

export async function searchPubMed(
  query: string,
  options: PubMedSearchOptions = {}
): Promise<{ results: UnifiedSearchResult[]; total: number }> {
  const maxResults = options.maxResults || 20;
  const page = options.page || 0;
  const retstart = page * maxResults;

  // Build search URL
  let searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmax=${maxResults}&retstart=${retstart}&retmode=json&tool=scholarsync&email=contact@scholarsync.com`;

  if (options.yearStart || options.yearEnd) {
    const minDate = options.yearStart || 1900;
    const maxDate = options.yearEnd || new Date().getFullYear();
    searchUrl += `&mindate=${minDate}&maxdate=${maxDate}&datetype=pdat`;
  }

  // Step 1: ESearch for PMIDs
  const searchRes = await fetchWithRetry(appendApiKey(searchUrl));
  const searchData: PubMedESearchResult = await searchRes.json();
  const pmids = searchData.esearchresult.idlist;
  const total = parseInt(searchData.esearchresult.count, 10);

  if (pmids.length === 0) {
    return { results: [], total: 0 };
  }

  // Step 2: EFetch for full XML
  const baseFetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmids.join(",")}&rettype=xml&retmode=xml&tool=scholarsync&email=contact@scholarsync.com`;
  const fetchRes = await fetchWithRetry(appendApiKey(baseFetchUrl));
  const xml = await fetchRes.text();

  // Parse individual articles
  const articleChunks =
    xml.match(/<PubmedArticle>[\s\S]*?<\/PubmedArticle>/g) || [];

  const results: UnifiedSearchResult[] = [];
  for (const chunk of articleChunks) {
    const parsed = parseArticle(chunk);
    if (parsed) results.push(parsed);
  }

  return { results, total };
}
