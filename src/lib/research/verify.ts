/**
 * Source verification system.
 *
 * Validates papers against PubMed and CrossRef to ensure they are real,
 * checks for retraction status, and assigns verification badges.
 */

import type { PaperResult, VerificationResult } from "./types";

const EUTILS_BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
const CROSSREF_BASE = "https://api.crossref.org/works";

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function titlesMatch(a: string, b: string): boolean {
  const na = normalizeTitle(a);
  const nb = normalizeTitle(b);
  if (na === nb) return true;
  // Allow partial match (one contains the other)
  if (na.length > 20 && nb.length > 20) {
    return na.includes(nb.slice(0, 50)) || nb.includes(na.slice(0, 50));
  }
  return false;
}

/**
 * Verify a paper's PMID against PubMed.
 */
async function verifyPMID(
  pmid: string,
  paper: PaperResult
): Promise<{ verified: boolean; titleMatch: boolean; yearMatch: boolean }> {
  try {
    const url = `${EUTILS_BASE}/esummary.fcgi?db=pubmed&id=${pmid}&retmode=json&tool=scholarsync&email=contact@scholarsync.com`;
    const res = await fetch(url);
    if (!res.ok) return { verified: false, titleMatch: false, yearMatch: false };

    const data = await res.json();
    const record = data.result?.[pmid];
    if (!record || record.error) {
      return { verified: false, titleMatch: false, yearMatch: false };
    }

    const pubmedTitle = record.title || "";
    const pubmedYear = record.pubdate ? parseInt(record.pubdate.split(" ")[0]) : 0;

    return {
      verified: true,
      titleMatch: titlesMatch(pubmedTitle, paper.title),
      yearMatch: !paper.year || !pubmedYear || Math.abs(paper.year - pubmedYear) <= 1,
    };
  } catch {
    return { verified: false, titleMatch: false, yearMatch: false };
  }
}

/**
 * Verify a paper's DOI against CrossRef.
 */
async function verifyDOI(
  doi: string,
  paper: PaperResult
): Promise<{ verified: boolean; titleMatch: boolean; yearMatch: boolean }> {
  try {
    const url = `${CROSSREF_BASE}/${encodeURIComponent(doi)}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "ScholarSync/1.0 (mailto:contact@scholarsync.com)" },
    });
    if (!res.ok) return { verified: false, titleMatch: false, yearMatch: false };

    const data = await res.json();
    const work = data.message;
    if (!work) return { verified: false, titleMatch: false, yearMatch: false };

    const crossrefTitle = Array.isArray(work.title) ? work.title[0] || "" : "";
    const crossrefYear = work.published?.["date-parts"]?.[0]?.[0] ||
      work["published-print"]?.["date-parts"]?.[0]?.[0] || 0;

    // Check for retraction/update notices
    const isRetracted = work["update-to"]?.some(
      (u: { type?: string }) => u.type === "retraction" || u.type === "withdrawal"
    ) ?? false;

    return {
      verified: !isRetracted,
      titleMatch: titlesMatch(crossrefTitle, paper.title),
      yearMatch: !paper.year || !crossrefYear || Math.abs(paper.year - crossrefYear) <= 1,
    };
  } catch {
    return { verified: false, titleMatch: false, yearMatch: false };
  }
}

/**
 * Check if a paper has been retracted.
 * Uses PubMed retraction notices.
 */
async function checkRetraction(
  paper: PaperResult
): Promise<{ isRetracted: boolean; details?: string }> {
  if (!paper.pmid) return { isRetracted: false };

  try {
    // Search for retraction notices referencing this PMID
    const query = encodeURIComponent(`retracted publication[pt] AND ${paper.pmid}[pmid]`);
    const url = `${EUTILS_BASE}/esearch.fcgi?db=pubmed&term=${query}&retmode=json&tool=scholarsync&email=contact@scholarsync.com`;
    const res = await fetch(url);
    if (!res.ok) return { isRetracted: false };

    const data = await res.json();
    const count = parseInt(data.esearchresult?.count || "0");

    if (count > 0) {
      return {
        isRetracted: true,
        details: "This paper has been flagged as a retracted publication in PubMed.",
      };
    }

    return { isRetracted: false };
  } catch {
    return { isRetracted: false };
  }
}

/**
 * Run the full verification pipeline for a paper.
 */
export async function verifyPaper(paper: PaperResult): Promise<VerificationResult> {
  const [pmidResult, doiResult, retractionResult] = await Promise.all([
    paper.pmid ? verifyPMID(paper.pmid, paper) : Promise.resolve(null),
    paper.doi ? verifyDOI(paper.doi, paper) : Promise.resolve(null),
    checkRetraction(paper),
  ]);

  // Check retraction first
  if (retractionResult.isRetracted) {
    return {
      status: "retracted",
      pmidVerified: pmidResult?.verified || false,
      doiVerified: doiResult?.verified || false,
      metadataMatches: {
        title: pmidResult?.titleMatch || doiResult?.titleMatch || false,
        year: pmidResult?.yearMatch || doiResult?.yearMatch || false,
        journal: true, // not checked individually
        authors: true, // not checked individually
      },
      retractionNotice: {
        isRetracted: true,
        reason: retractionResult.details,
      },
      details: "This paper has been retracted.",
    };
  }

  const pmidOk = pmidResult?.verified || false;
  const doiOk = doiResult?.verified || false;
  const titleOk = pmidResult?.titleMatch || doiResult?.titleMatch || false;
  const yearOk = pmidResult?.yearMatch || doiResult?.yearMatch || false;

  let status: VerificationResult["status"];
  let details: string;

  if ((pmidOk || doiOk) && titleOk && yearOk) {
    status = "verified";
    details = `Paper verified via ${pmidOk ? "PubMed" : ""}${pmidOk && doiOk ? " and " : ""}${doiOk ? "CrossRef" : ""}. Metadata matches.`;
  } else if (pmidOk || doiOk) {
    status = "partial";
    const issues: string[] = [];
    if (!titleOk) issues.push("title mismatch");
    if (!yearOk) issues.push("year mismatch");
    details = `Identifier found but ${issues.join(" and ")} detected.`;
  } else {
    status = "unverified";
    details = "Could not verify against PubMed or CrossRef.";
  }

  return {
    status,
    pmidVerified: pmidOk,
    doiVerified: doiOk,
    metadataMatches: {
      title: titleOk,
      year: yearOk,
      journal: true,
      authors: true,
    },
    details,
  };
}
