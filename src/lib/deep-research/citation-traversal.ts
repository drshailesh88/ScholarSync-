/**
 * Citation Graph Traversal for Deep Research.
 *
 * Fetches forward citations and backward references for top papers
 * using the Semantic Scholar Graph API, then converts them to
 * UnifiedSearchResult format for merging with search results.
 */

import type { UnifiedSearchResult } from "@/types/search";
import type { ResearchProgressCallback } from "./types";

// ── S2 Citation/Reference API types ──────────────────────────────────

interface S2CitationPaper {
  paperId: string;
  title: string | null;
  authors: { name: string }[] | null;
  year: number | null;
  abstract: string | null;
  citationCount: number | null;
  journal: { name: string } | null;
  externalIds: { DOI?: string; PubMed?: string } | null;
  isOpenAccess: boolean | null;
}

interface S2CitationEntry {
  citingPaper?: S2CitationPaper;
  citedPaper?: S2CitationPaper;
}

interface S2CitationResponse {
  data: S2CitationEntry[];
}

const CITATION_FIELDS =
  "title,authors,year,abstract,citationCount,journal,externalIds,isOpenAccess";

// ── Helpers ───────────────────────────────────────────────────────────

function getS2Headers(): Record<string, string> {
  const headers: Record<string, string> = {};
  if (process.env.SEMANTIC_SCHOLAR_API_KEY) {
    headers["x-api-key"] = process.env.SEMANTIC_SCHOLAR_API_KEY;
  }
  return headers;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mapCitationPaper(paper: S2CitationPaper): UnifiedSearchResult | null {
  if (!paper.title || !paper.paperId) return null;

  return {
    title: paper.title,
    authors: paper.authors?.map((a) => a.name) || [],
    journal: paper.journal?.name || "",
    year: paper.year || 0,
    doi: paper.externalIds?.DOI || undefined,
    pmid: paper.externalIds?.PubMed || undefined,
    s2Id: paper.paperId,
    abstract: paper.abstract || undefined,
    citationCount: paper.citationCount || 0,
    isOpenAccess: paper.isOpenAccess || false,
    publicationTypes: [],
    sources: ["semantic_scholar"],
  };
}

// ── Core Functions ────────────────────────────────────────────────────

/**
 * Fetch forward citations (papers that cite this paper).
 */
async function fetchCitations(
  paperId: string,
  limit: number = 10
): Promise<UnifiedSearchResult[]> {
  const url = `https://api.semanticscholar.org/graph/v1/paper/${encodeURIComponent(paperId)}/citations?fields=${CITATION_FIELDS}&limit=${limit}`;

  try {
    const res = await fetch(url, {
      headers: getS2Headers(),
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      console.warn(`[CitationTraversal] Citations fetch failed for ${paperId}: HTTP ${res.status}`);
      return [];
    }

    const data: S2CitationResponse = await res.json();
    const results: UnifiedSearchResult[] = [];

    for (const entry of data.data || []) {
      const paper = entry.citingPaper;
      if (paper) {
        const mapped = mapCitationPaper(paper);
        if (mapped) results.push(mapped);
      }
    }

    return results;
  } catch (error) {
    console.warn(`[CitationTraversal] Citations fetch error for ${paperId}:`, error);
    return [];
  }
}

/**
 * Fetch backward references (papers this paper cites).
 */
async function fetchReferences(
  paperId: string,
  limit: number = 10
): Promise<UnifiedSearchResult[]> {
  const url = `https://api.semanticscholar.org/graph/v1/paper/${encodeURIComponent(paperId)}/references?fields=${CITATION_FIELDS}&limit=${limit}`;

  try {
    const res = await fetch(url, {
      headers: getS2Headers(),
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      console.warn(`[CitationTraversal] References fetch failed for ${paperId}: HTTP ${res.status}`);
      return [];
    }

    const data: S2CitationResponse = await res.json();
    const results: UnifiedSearchResult[] = [];

    for (const entry of data.data || []) {
      const paper = entry.citedPaper;
      if (paper) {
        const mapped = mapCitationPaper(paper);
        if (mapped) results.push(mapped);
      }
    }

    return results;
  } catch (error) {
    console.warn(`[CitationTraversal] References fetch error for ${paperId}:`, error);
    return [];
  }
}

// ── Public API ────────────────────────────────────────────────────────

/**
 * Select the top papers for citation traversal based on citation count
 * and relevance (having an abstract indicates a meaningful result).
 */
export function selectTopPapers(
  papers: UnifiedSearchResult[],
  maxPapers: number = 10
): UnifiedSearchResult[] {
  return papers
    .filter((p) => p.s2Id && p.abstract)
    .sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0))
    .slice(0, maxPapers);
}

/**
 * Traverse the citation graph for a set of seed papers.
 *
 * For each seed paper, fetches both forward citations and backward references
 * from Semantic Scholar. Processes papers in batches of 3 with 500ms delays
 * to respect rate limits.
 *
 * Returns all discovered papers (not deduplicated -- caller should dedup).
 */
export async function traverseCitationGraph(
  seedPapers: UnifiedSearchResult[],
  onProgress?: ResearchProgressCallback
): Promise<UnifiedSearchResult[]> {
  const allDiscovered: UnifiedSearchResult[] = [];
  const batchSize = 3;

  onProgress?.("citation-traversal", `Traversing citation graph for ${seedPapers.length} seed papers...`);

  for (let i = 0; i < seedPapers.length; i += batchSize) {
    const batch = seedPapers.slice(i, i + batchSize);

    const batchPromises = batch.map(async (paper) => {
      const paperId = paper.s2Id;
      if (!paperId) return [];

      const [citations, references] = await Promise.all([
        fetchCitations(paperId, 10),
        fetchReferences(paperId, 10),
      ]);

      return [...citations, ...references];
    });

    const batchResults = await Promise.all(batchPromises);
    for (const results of batchResults) {
      allDiscovered.push(...results);
    }

    onProgress?.(
      "citation-traversal",
      `Citation traversal: processed ${Math.min(i + batchSize, seedPapers.length)}/${seedPapers.length} papers (${allDiscovered.length} new papers found)`
    );

    // Rate limit: 500ms between batches
    if (i + batchSize < seedPapers.length) {
      await sleep(500);
    }
  }

  onProgress?.(
    "citation-traversal",
    `Citation traversal complete: ${allDiscovered.length} papers discovered`
  );

  return allDiscovered;
}
