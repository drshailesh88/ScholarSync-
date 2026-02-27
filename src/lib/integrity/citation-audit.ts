/**
 * Citation Audit Engine
 *
 * Verifies that citations in an academic document are real and valid by:
 *   1. Extracting citation markers ([1], [2,3], [1-5]) and reference lists
 *   2. Verifying DOIs against Crossref
 *   3. Verifying PMIDs against PubMed (batched)
 *   4. Detecting uncited factual claims via heuristics
 *   5. Cross-checking in-text markers against the reference list
 */

import type { CitationIssue, CitationAuditResult } from "./types";

// ── Constants ──────────────────────────────────────────────────────

const CROSSREF_API = "https://api.crossref.org/works";
const PUBMED_API =
  "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi";
const MAILTO = "scholarsync-bot@scholarsync.app";

/** PubMed allows 3 req/sec without key; we stay conservative. */
const PUBMED_BATCH_SIZE = 50;
const PUBMED_DELAY_MS = 350;

/** Crossref concurrent request cap to stay in the polite pool. */
const CROSSREF_CONCURRENCY = 5;

// ── Regex patterns ─────────────────────────────────────────────────

/** Matches [1], [2,3], [1-5], [1, 3-7, 9] etc. */
const CITATION_MARKER_RE = /\[(\d+(?:\s*[-–,]\s*\d+)*)\]/g;

/** Matches a DOI anywhere in text. */
const DOI_RE = /\b(10\.\d{4,9}\/[^\s,;)\]}>]+)/g;

/** Matches a bare PMID label like "PMID: 12345678" or "PMID 12345678". */
const PMID_RE = /\bPMID[:\s]+(\d{6,9})\b/gi;

/**
 * Heuristic patterns for factual claims that should carry a citation.
 * Each entry is [regex, human-readable label].
 */
const UNCITED_CLAIM_PATTERNS: [RegExp, string][] = [
  [/\bstudies\s+have\s+shown\b/i, "\"Studies have shown...\""],
  [/\bresearch\s+(indicates?|suggests?|shows?|has\s+shown)\b/i, "\"Research indicates/suggests...\""],
  [/\bit\s+has\s+been\s+(demonstrated|shown|established|reported|found)\b/i, "\"It has been demonstrated...\""],
  [/\bevidence\s+suggests?\b/i, "\"Evidence suggests...\""],
  [/\baccording\s+to\b/i, "\"According to...\""],
  [/\bprevious(ly)?\s+(studies|research|work|findings)\b/i, "\"Previous studies/research...\""],
  [/\bliterature\s+(suggests?|indicates?|shows?|reports?)\b/i, "\"Literature suggests...\""],
  [/\b\d{1,3}(\.\d+)?%\s+of\s+(patients?|participants?|subjects?|cases?|respondents?|samples?|individuals?|people)\b/i, "Statistical claim about population"],
  [/\b(a\s+)?(recent|landmark|seminal|pivotal)\s+study\b/i, "Reference to a specific study"],
  [/\bhas\s+been\s+widely\s+(reported|documented|observed)\b/i, "\"Has been widely reported...\""],
  [/\bmeta-analysis\b/i, "Reference to a meta-analysis"],
  [/\b(randomized|randomised)\s+controlled\s+trial\b/i, "Reference to an RCT"],
];

/** Headings that delimit the reference / bibliography section. */
const REFERENCE_SECTION_RE =
  /^#{0,3}\s*(references|bibliography|works\s+cited|literature\s+cited)\s*$/im;

/** A numbered reference line, e.g. "1. Author..." or "[1] Author...". */
const NUMBERED_REF_RE = /^\s*\[?(\d+)\]?[.)]\s+(.+)/;

// ── Internal helpers ───────────────────────────────────────────────

/**
 * Expand a citation marker string like "1, 3-5, 8" into an array [1,3,4,5,8].
 */
function expandCitationNumbers(raw: string): number[] {
  const nums = new Set<number>();
  const parts = raw.split(/\s*,\s*/);
  for (const part of parts) {
    const rangeParts = part.split(/\s*[-–]\s*/);
    if (rangeParts.length === 2) {
      const lo = parseInt(rangeParts[0], 10);
      const hi = parseInt(rangeParts[1], 10);
      if (!isNaN(lo) && !isNaN(hi)) {
        for (let i = lo; i <= hi; i++) nums.add(i);
      }
    } else {
      const n = parseInt(part, 10);
      if (!isNaN(n)) nums.add(n);
    }
  }
  return [...nums].sort((a, b) => a - b);
}

/**
 * Split document text into paragraphs (non-empty lines separated by blanks).
 */
function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/**
 * Parse the References section from the document text.
 * Returns a map from reference number to the raw reference text.
 */
function parseReferencesSection(
  text: string
): Map<number, string> {
  const refs = new Map<number, string>();
  const match = REFERENCE_SECTION_RE.exec(text);
  if (!match) return refs;

  const sectionStart = match.index + match[0].length;
  const sectionText = text.slice(sectionStart);
  const lines = sectionText.split("\n");

  for (const line of lines) {
    const m = NUMBERED_REF_RE.exec(line);
    if (m) {
      const num = parseInt(m[1], 10);
      refs.set(num, m[2].trim());
    }
  }

  return refs;
}

/**
 * Extract all DOIs from a text block.
 */
function extractDOIs(text: string): string[] {
  const dois = new Set<string>();
  let m: RegExpExecArray | null;
  DOI_RE.lastIndex = 0;
  while ((m = DOI_RE.exec(text)) !== null) {
    // Clean trailing punctuation that may have been captured
    const doi = m[1].replace(/[.,;:]+$/, "");
    dois.add(doi);
  }
  return [...dois];
}

/**
 * Extract all PMIDs from a text block.
 */
function extractPMIDs(text: string): string[] {
  const pmids = new Set<string>();
  let m: RegExpExecArray | null;
  PMID_RE.lastIndex = 0;
  while ((m = PMID_RE.exec(text)) !== null) {
    pmids.add(m[1]);
  }
  return [...pmids];
}

/**
 * Collect all citation numbers referenced in the body text (before the
 * References section).
 */
function collectCitedNumbers(text: string): Set<number> {
  const refSectionMatch = REFERENCE_SECTION_RE.exec(text);
  const bodyText = refSectionMatch ? text.slice(0, refSectionMatch.index) : text;

  const cited = new Set<number>();
  let m: RegExpExecArray | null;
  CITATION_MARKER_RE.lastIndex = 0;
  while ((m = CITATION_MARKER_RE.exec(bodyText)) !== null) {
    for (const n of expandCitationNumbers(m[1])) {
      cited.add(n);
    }
  }
  return cited;
}

// ── Crossref verification ──────────────────────────────────────────

interface CrossrefResult {
  doi: string;
  verified: boolean;
  title?: string;
  authors?: string[];
  year?: number;
  error?: string;
}

async function verifySingleDOI(doi: string): Promise<CrossrefResult> {
  try {
    const res = await fetch(
      `${CROSSREF_API}/${encodeURIComponent(doi)}`,
      {
        headers: {
          "User-Agent": `ScholarSync/1.0 (mailto:${MAILTO})`,
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(10_000),
      }
    );

    if (res.status === 404) {
      return { doi, verified: false, error: "DOI not found in Crossref" };
    }

    if (!res.ok) {
      return {
        doi,
        verified: false,
        error: `Crossref returned HTTP ${res.status}`,
      };
    }

    const json = await res.json();
    const work = json?.message;
    if (!work) {
      return { doi, verified: false, error: "Empty Crossref response" };
    }

    const title =
      work.title?.[0] ?? work["short-title"]?.[0] ?? "Untitled";
    const authors: string[] = (work.author ?? []).map(
      (a: { given?: string; family?: string }) =>
        [a.given, a.family].filter(Boolean).join(" ")
    );
    const year: number | undefined =
      work.published?.["date-parts"]?.[0]?.[0] ??
      work["published-print"]?.["date-parts"]?.[0]?.[0] ??
      work["published-online"]?.["date-parts"]?.[0]?.[0];

    return { doi, verified: true, title, authors, year };
  } catch (err) {
    // Network / timeout errors are "unverified", not "invalid"
    const message =
      err instanceof Error ? err.message : "Unknown network error";
    return { doi, verified: false, error: message };
  }
}

/**
 * Verify a list of DOIs with bounded concurrency.
 */
async function verifyDOIs(
  dois: string[]
): Promise<Map<string, CrossrefResult>> {
  const results = new Map<string, CrossrefResult>();
  if (dois.length === 0) return results;

  for (let i = 0; i < dois.length; i += CROSSREF_CONCURRENCY) {
    const batch = dois.slice(i, i + CROSSREF_CONCURRENCY);
    const batchResults = await Promise.all(batch.map(verifySingleDOI));
    for (const r of batchResults) {
      results.set(r.doi, r);
    }
  }

  return results;
}

// ── PubMed verification ────────────────────────────────────────────

interface PubMedResult {
  pmid: string;
  verified: boolean;
  title?: string;
  authors?: string[];
  year?: number;
  error?: string;
}

/**
 * Verify a batch of PMIDs in a single request.
 */
async function verifyPMIDBatch(pmids: string[]): Promise<PubMedResult[]> {
  if (pmids.length === 0) return [];

  try {
    const url = `${PUBMED_API}?db=pubmed&id=${pmids.join(",")}&retmode=json`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": `ScholarSync/1.0 (mailto:${MAILTO})`,
      },
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      return pmids.map((pmid) => ({
        pmid,
        verified: false,
        error: `PubMed returned HTTP ${res.status}`,
      }));
    }

    const json = await res.json();
    const resultMap: Record<string, unknown> = json?.result ?? {};

    return pmids.map((pmid) => {
      const entry = resultMap[pmid] as
        | Record<string, unknown>
        | undefined;
      if (!entry || entry.error) {
        return {
          pmid,
          verified: false,
          error:
            (entry?.error as string) ?? "PMID not found in PubMed",
        };
      }

      const title = (entry.title as string) ?? "Untitled";
      const authors: string[] = Array.isArray(entry.authors)
        ? (entry.authors as Array<{ name?: string }>).map(
            (a) => a.name ?? "Unknown"
          )
        : [];
      const pubdate = (entry.pubdate as string) ?? "";
      const yearMatch = pubdate.match(/(\d{4})/);
      const year = yearMatch ? parseInt(yearMatch[1], 10) : undefined;

      return { pmid, verified: true, title, authors, year };
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown network error";
    return pmids.map((pmid) => ({
      pmid,
      verified: false,
      error: message,
    }));
  }
}

/**
 * Verify all PMIDs, batching requests and respecting rate limits.
 */
async function verifyPMIDs(
  pmids: string[]
): Promise<Map<string, PubMedResult>> {
  const results = new Map<string, PubMedResult>();
  if (pmids.length === 0) return results;

  for (let i = 0; i < pmids.length; i += PUBMED_BATCH_SIZE) {
    if (i > 0) {
      await new Promise((resolve) => setTimeout(resolve, PUBMED_DELAY_MS));
    }
    const batch = pmids.slice(i, i + PUBMED_BATCH_SIZE);
    const batchResults = await verifyPMIDBatch(batch);
    for (const r of batchResults) {
      results.set(r.pmid, r);
    }
  }

  return results;
}

// ── Uncited claims detection ───────────────────────────────────────

/**
 * Scan paragraphs for factual claims that lack citation markers.
 * Only checks the body text (before the References section).
 */
function detectUncitedClaims(
  text: string,
  paragraphs: string[]
): CitationIssue[] {
  const issues: CitationIssue[] = [];

  // Determine where the reference section starts so we can skip it
  const refSectionMatch = REFERENCE_SECTION_RE.exec(text);
  const refSectionStart = refSectionMatch
    ? refSectionMatch.index
    : text.length;

  for (let i = 0; i < paragraphs.length; i++) {
    const para = paragraphs[i];

    // Skip if this paragraph is inside the references section
    const paraStart = text.indexOf(para);
    if (paraStart >= refSectionStart) continue;

    // Skip very short paragraphs (headings, captions)
    if (para.length < 40) continue;

    for (const [pattern, label] of UNCITED_CLAIM_PATTERNS) {
      pattern.lastIndex = 0;
      const match = pattern.exec(para);
      if (!match) continue;

      // Check if there is a citation marker [N] within a reasonable distance
      // after the claim phrase (within the same sentence or next 200 chars).
      const afterClaim = para.slice(match.index);
      const sentenceEnd = afterClaim.search(/[.!?]\s/);
      const window =
        sentenceEnd > 0
          ? afterClaim.slice(0, sentenceEnd + 1)
          : afterClaim.slice(0, 200);

      if (!CITATION_MARKER_RE.test(window)) {
        CITATION_MARKER_RE.lastIndex = 0;
        issues.push({
          type: "missing_citation",
          severity: "warning",
          message: `Uncited claim detected: ${label} (paragraph ${i + 1})`,
          paragraphIndex: i,
        });
        // Only report one issue per paragraph to avoid noise
        break;
      }
      CITATION_MARKER_RE.lastIndex = 0;
    }
  }

  return issues;
}

// ── Cross-referencing markers vs. reference list ───────────────────

function crossCheckReferences(
  citedNumbers: Set<number>,
  refList: Map<number, string>
): CitationIssue[] {
  const issues: CitationIssue[] = [];

  // Citations used in body but missing from the reference list
  for (const num of citedNumbers) {
    if (!refList.has(num)) {
      issues.push({
        type: "hallucinated_ref",
        severity: "error",
        message: `Citation [${num}] is used in the text but has no corresponding entry in the References section`,
        reference: `[${num}]`,
      });
    }
  }

  // References in the list that are never cited in the body
  for (const num of refList.keys()) {
    if (!citedNumbers.has(num)) {
      issues.push({
        type: "missing_citation",
        severity: "info",
        message: `Reference [${num}] appears in the References section but is never cited in the text`,
        reference: `[${num}]`,
      });
    }
  }

  return issues;
}

// ── Main entry point ───────────────────────────────────────────────

/**
 * Run a full citation audit on a document.
 *
 * @param text - The full document text including any References section.
 * @param sources - Optional structured references from the document. If
 *   provided, DOIs and PMIDs from these are verified directly. Otherwise
 *   the engine parses references from the text.
 */
export async function runCitationAudit(
  text: string,
  sources?: Array<{
    title?: string;
    doi?: string;
    pmid?: string;
    authors?: string[];
    year?: number;
  }>
): Promise<CitationAuditResult> {
  const issues: CitationIssue[] = [];
  const verifiedReferences: CitationAuditResult["verifiedReferences"] = [];

  // ── 1. Parse structure ────────────────────────────────────────────
  const paragraphs = splitParagraphs(text);
  const refList = parseReferencesSection(text);
  const citedNumbers = collectCitedNumbers(text);

  const totalCitations = citedNumbers.size;

  // ── 2. Collect DOIs and PMIDs to verify ───────────────────────────

  // Maps: refIndex -> doi/pmid for tracking which reference owns which ID
  const doiToRefIndex = new Map<string, number>();
  const pmidToRefIndex = new Map<string, number>();

  const allDOIs: string[] = [];
  const allPMIDs: string[] = [];

  if (sources && sources.length > 0) {
    // Use structured sources — index is 1-based to match citation markers
    for (let i = 0; i < sources.length; i++) {
      const refIndex = i + 1;
      const src = sources[i];
      if (src.doi) {
        allDOIs.push(src.doi);
        doiToRefIndex.set(src.doi, refIndex);
      }
      if (src.pmid) {
        allPMIDs.push(src.pmid);
        pmidToRefIndex.set(src.pmid, refIndex);
      }
    }
  } else {
    // Parse DOIs and PMIDs from the reference section text
    for (const [num, refText] of refList) {
      const dois = extractDOIs(refText);
      for (const doi of dois) {
        allDOIs.push(doi);
        doiToRefIndex.set(doi, num);
      }
      const pmids = extractPMIDs(refText);
      for (const pmid of pmids) {
        allPMIDs.push(pmid);
        pmidToRefIndex.set(pmid, num);
      }
    }

    // Also scan the full text for DOIs/PMIDs not in the reference section
    const textDOIs = extractDOIs(text);
    for (const doi of textDOIs) {
      if (!allDOIs.includes(doi)) allDOIs.push(doi);
    }
    const textPMIDs = extractPMIDs(text);
    for (const pmid of textPMIDs) {
      if (!allPMIDs.includes(pmid)) allPMIDs.push(pmid);
    }
  }

  // ── 3. Verify DOIs and PMIDs in parallel ──────────────────────────

  const [doiResults, pmidResults] = await Promise.all([
    verifyDOIs(allDOIs),
    verifyPMIDs(allPMIDs),
  ]);

  // ── 4. Build verified references and collect issues ───────────────

  let verifiedCount = 0;

  // Track which reference indices we have already processed
  const processedIndices = new Set<number>();

  // Process DOI results
  for (const [doi, result] of doiResults) {
    const refIndex = doiToRefIndex.get(doi);

    if (result.verified) {
      verifiedCount++;
      if (refIndex !== undefined) {
        processedIndices.add(refIndex);
        verifiedReferences.push({
          index: refIndex,
          doi,
          title: result.title ?? "Untitled",
          verified: true,
        });
      }
    } else {
      // Distinguish network errors (unverified) from confirmed-invalid DOIs
      const isNetworkError =
        result.error !== undefined &&
        !result.error.includes("not found") &&
        !result.error.includes("404");

      issues.push({
        type: isNetworkError ? "unverified_doi" : "invalid_doi",
        severity: isNetworkError ? "warning" : "error",
        message: isNetworkError
          ? `Could not verify DOI ${doi}: ${result.error}`
          : `DOI ${doi} does not resolve to a valid record in Crossref`,
        reference: refIndex !== undefined ? `[${refIndex}]` : doi,
      });

      if (refIndex !== undefined) {
        processedIndices.add(refIndex);
        verifiedReferences.push({
          index: refIndex,
          doi,
          title:
            (sources?.[refIndex - 1]?.title ??
              refList.get(refIndex)?.slice(0, 80)) ??
            "Unknown",
          verified: false,
        });
      }
    }
  }

  // Process PMID results
  for (const [pmid, result] of pmidResults) {
    const refIndex = pmidToRefIndex.get(pmid);

    if (result.verified) {
      verifiedCount++;
      if (refIndex !== undefined && !processedIndices.has(refIndex)) {
        processedIndices.add(refIndex);
        verifiedReferences.push({
          index: refIndex,
          pmid,
          title: result.title ?? "Untitled",
          verified: true,
        });
      } else if (refIndex !== undefined) {
        // Already have this reference from DOI check — augment with PMID
        const existing = verifiedReferences.find(
          (r) => r.index === refIndex
        );
        if (existing) {
          existing.pmid = pmid;
          // If DOI failed but PMID succeeded, mark as verified
          if (!existing.verified) {
            existing.verified = true;
            existing.title = result.title ?? existing.title;
          }
        }
      }
    } else {
      const isNetworkError =
        result.error !== undefined &&
        !result.error.includes("not found") &&
        !result.error.includes("error");

      issues.push({
        type: "broken_pmid",
        severity: isNetworkError ? "warning" : "error",
        message: isNetworkError
          ? `Could not verify PMID ${pmid}: ${result.error}`
          : `PMID ${pmid} does not correspond to a valid PubMed record`,
        reference:
          refIndex !== undefined ? `[${refIndex}]` : `PMID:${pmid}`,
      });

      if (refIndex !== undefined && !processedIndices.has(refIndex)) {
        processedIndices.add(refIndex);
        verifiedReferences.push({
          index: refIndex,
          pmid,
          title:
            (sources?.[refIndex - 1]?.title ??
              refList.get(refIndex)?.slice(0, 80)) ??
            "Unknown",
          verified: false,
        });
      }
    }
  }

  // ── 5. Add unverifiable references (no DOI or PMID) ───────────────

  if (sources && sources.length > 0) {
    for (let i = 0; i < sources.length; i++) {
      const refIndex = i + 1;
      if (!processedIndices.has(refIndex)) {
        verifiedReferences.push({
          index: refIndex,
          title: sources[i].title ?? "Unknown",
          verified: false,
        });
        issues.push({
          type: "unverified_doi",
          severity: "info",
          message: `Reference [${refIndex}] has no DOI or PMID and could not be independently verified`,
          reference: `[${refIndex}]`,
        });
      }
    }
  } else {
    for (const [num, refText] of refList) {
      if (!processedIndices.has(num)) {
        verifiedReferences.push({
          index: num,
          title: refText.slice(0, 100),
          verified: false,
        });
        issues.push({
          type: "unverified_doi",
          severity: "info",
          message: `Reference [${num}] has no DOI or PMID and could not be independently verified`,
          reference: `[${num}]`,
        });
      }
    }
  }

  // Sort verified references by index
  verifiedReferences.sort((a, b) => a.index - b.index);

  // ── 6. Cross-check in-text markers vs. reference list ─────────────

  const refIndexSet: Map<number, string> =
    sources && sources.length > 0
      ? new Map(sources.map((s, i) => [i + 1, s.title ?? ""]))
      : refList;

  const crossCheckIssues = crossCheckReferences(
    citedNumbers,
    refIndexSet
  );
  issues.push(...crossCheckIssues);

  // ── 7. Detect uncited claims ──────────────────────────────────────

  const uncitedIssues = detectUncitedClaims(text, paragraphs);
  issues.push(...uncitedIssues);

  // ── 8. Return audit result ────────────────────────────────────────

  return {
    totalCitations,
    verifiedCitations: verifiedCount,
    issues,
    verifiedReferences,
  };
}
