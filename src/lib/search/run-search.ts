/**
 * Server-side literature search orchestration.
 *
 * Single source of truth for fanning out to PubMed / Semantic Scholar / OpenAlex,
 * fusing with RRF, filtering, and normalizing results. Both the web API route
 * (`/api/research/search`) and the MCP tool (`/api/mcp`) call this — neither
 * reimplements the search logic, and neither performs auth here (auth lives at
 * each transport's boundary).
 */

import { searchPubMed } from "@/lib/search/sources/pubmed";
import {
  searchSemanticScholar,
  getSemanticScholarPaper,
} from "@/lib/search/sources/semantic-scholar";
import { searchOpenAlex } from "@/lib/search/sources/openalex";
import { reciprocalRankFusion } from "@/lib/search/rank-fusion";
import type { UnifiedSearchResult } from "@/types/search";

export const SEARCH_SOURCES = ["pubmed", "semantic_scholar", "openalex"] as const;
export type SearchSourceId = (typeof SEARCH_SOURCES)[number];

/** Sources used when a caller does not specify any. Matches historical UI behavior. */
export const DEFAULT_SOURCES: SearchSourceId[] = ["pubmed", "semantic_scholar"];

/** Hard ceiling on results per search, shared across web and MCP transports. */
export const MAX_RESULTS = 50;
export const DEFAULT_PER_PAGE = 10;

/** Normalized study-type buckets surfaced to clients. */
export const STUDY_TYPES = [
  "systematic_review",
  "meta_analysis",
  "rct",
  "clinical_trial",
  "cohort",
  "case_report",
  "narrative_review",
  "guideline",
  "other",
] as const;

export interface RunLiteratureSearchParams {
  query: string;
  /** Optional PubMed-specific query override (e.g. from a research plan). */
  pubmedQuery?: string;
  sources?: SearchSourceId[];
  yearFrom?: number;
  yearTo?: number;
  studyTypes?: string[];
  fullTextOnly?: boolean;
  page?: number;
  perPage?: number;
}

export type LiteraturePaper = UnifiedSearchResult & {
  id: string;
  studyTypeEnum: string;
  verificationStatus: "pending";
  source: string;
  inLibrary: boolean;
};

export interface LiteratureSearchResult {
  results: LiteraturePaper[];
  total: number;
  page: number;
  perPage: number;
  hasMore: boolean;
  sourceCounts: Record<string, number>;
}

function withSourceTimeout<T>(
  label: string,
  promise: Promise<T>,
  timeoutMs = 8000
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error(`${label} timed out after ${timeoutMs}ms`));
      }, timeoutMs);
    }),
  ]).finally(() => {
    if (timeoutId) clearTimeout(timeoutId);
  });
}

const STUDY_TYPE_MAP: Record<string, string> = {
  "Randomized Controlled Trial": "rct",
  systematic_review: "systematic_review",
  meta_analysis: "meta_analysis",
  Review: "narrative_review",
  "Clinical Trial": "clinical_trial",
  "Case Reports": "case_report",
  "Cohort Studies": "cohort",
  Guideline: "guideline",
  "Practice Guideline": "guideline",
};

export function mapStudyType(studyType: string | undefined): string {
  if (!studyType) return "other";
  return STUDY_TYPE_MAP[studyType] || studyType;
}

function generatePaperId(result: UnifiedSearchResult): string {
  if (result.pmid) return `pm_${result.pmid}`;
  if (result.doi) return `doi_${result.doi.replace(/[^a-zA-Z0-9]/g, "_")}`;
  if (result.s2Id) return `s2_${result.s2Id}`;
  if (result.openalexId) return `oa_${result.openalexId.replace(/[^a-zA-Z0-9]/g, "_")}`;
  return `paper_${result.title.slice(0, 24).replace(/[^a-zA-Z0-9]/g, "_")}`;
}

function determineSource(result: UnifiedSearchResult): string {
  const sources = result.sources || [];
  const hasPubmed = sources.includes("pubmed");
  const hasSS = sources.includes("semantic_scholar");
  if (hasPubmed && hasSS) return "both";
  if (hasSS) return "semantic_scholar";
  if (hasPubmed) return "pubmed";
  return sources[0] || "unknown";
}

/** Ensure every paper has a resolvable URL, deriving one from its identifiers. */
export function resolvePaperUrl(result: UnifiedSearchResult): string | undefined {
  if (result.url) return result.url;
  if (result.pmid) return `https://pubmed.ncbi.nlm.nih.gov/${result.pmid}/`;
  if (result.doi) return `https://doi.org/${result.doi}`;
  if (result.openalexId) return result.openalexId;
  return undefined;
}

function normalizeSources(sources?: SearchSourceId[]): SearchSourceId[] {
  if (!sources || sources.length === 0) return DEFAULT_SOURCES;
  const allowed = sources.filter((s): s is SearchSourceId =>
    SEARCH_SOURCES.includes(s)
  );
  return allowed.length > 0 ? allowed : DEFAULT_SOURCES;
}

export async function runLiteratureSearch(
  params: RunLiteratureSearchParams
): Promise<LiteratureSearchResult> {
  const sources = normalizeSources(params.sources);
  const page = Math.max(0, params.page ?? 0);
  const perPage = Math.min(MAX_RESULTS, Math.max(1, params.perPage ?? DEFAULT_PER_PAGE));
  const searchQuery = params.query || "";
  const pmQuery = params.pubmedQuery || searchQuery;

  const promises: Promise<{
    source: string;
    results: UnifiedSearchResult[];
    total: number;
  }>[] = [];

  if (sources.includes("pubmed")) {
    promises.push(
      withSourceTimeout(
        "PubMed",
        searchPubMed(pmQuery, {
          maxResults: perPage,
          page,
          yearStart: params.yearFrom,
          yearEnd: params.yearTo,
        }).then(({ results, total }) => ({ source: "pubmed", results, total }))
      ).catch(() => ({ source: "pubmed", results: [], total: 0 }))
    );
  }

  if (sources.includes("semantic_scholar")) {
    promises.push(
      withSourceTimeout(
        "Semantic Scholar",
        searchSemanticScholar(searchQuery, {
          limit: perPage,
          offset: page * perPage,
          yearStart: params.yearFrom,
          yearEnd: params.yearTo,
        }).then(({ results, total }) => ({
          source: "semantic_scholar",
          results,
          total,
        }))
      ).catch(() => ({ source: "semantic_scholar", results: [], total: 0 }))
    );
  }

  if (sources.includes("openalex")) {
    promises.push(
      withSourceTimeout(
        "OpenAlex",
        searchOpenAlex(searchQuery, {
          limit: perPage,
          page: page + 1,
          yearStart: params.yearFrom,
          yearEnd: params.yearTo,
          onlyOpenAccess: params.fullTextOnly,
        }).then(({ results, total }) => ({ source: "openalex", results, total }))
      ).catch(() => ({ source: "openalex", results: [], total: 0 }))
    );
  }

  const sourceResults = await Promise.all(promises);

  const sourceCounts: Record<string, number> = {};
  let maxTotal = 0;
  for (const sr of sourceResults) {
    sourceCounts[sr.source] = sr.total;
    maxTotal = Math.max(maxTotal, sr.total);
  }

  const fused = reciprocalRankFusion(
    sourceResults.map((sr) => ({ source: sr.source, results: sr.results }))
  );

  let filtered = fused;
  if (params.studyTypes && params.studyTypes.length > 0) {
    const allowedTypes = new Set(params.studyTypes);
    filtered = filtered.filter((r) => allowedTypes.has(mapStudyType(r.studyType)));
  }

  if (params.fullTextOnly) {
    filtered = filtered.filter((r) => r.isOpenAccess);
  }

  const results: LiteraturePaper[] = filtered.map((r) => ({
    ...r,
    url: resolvePaperUrl(r),
    id: generatePaperId(r),
    studyTypeEnum: mapStudyType(r.studyType),
    verificationStatus: "pending" as const,
    source: determineSource(r),
    inLibrary: false,
  }));

  return {
    results,
    total: maxTotal,
    page,
    perPage,
    hasMore: results.length >= perPage,
    sourceCounts,
  };
}

/**
 * Fetch a single paper by identifier. Accepts a DOI, PMID, or an internal id
 * produced by {@link generatePaperId} (e.g. `pm_12345`, `s2_<id>`). Resolution
 * goes through Semantic Scholar's direct lookup, which understands DOI/PMID/S2
 * identifiers.
 */
export async function fetchPaperById(params: {
  doi?: string;
  pmid?: string;
  id?: string;
}): Promise<LiteraturePaper | null> {
  const identifier = resolveLookupIdentifier(params);
  if (!identifier) return null;

  const paper = await getSemanticScholarPaper(identifier);
  if (!paper) return null;

  return {
    ...paper,
    url: resolvePaperUrl(paper),
    id: generatePaperId(paper),
    studyTypeEnum: mapStudyType(paper.studyType),
    verificationStatus: "pending" as const,
    source: determineSource(paper),
    inLibrary: false,
  };
}

function resolveLookupIdentifier(params: {
  doi?: string;
  pmid?: string;
  id?: string;
}): string | null {
  if (params.doi) return `DOI:${params.doi.replace(/^https?:\/\/doi\.org\//, "")}`;
  if (params.pmid) return `PMID:${params.pmid}`;
  if (params.id) {
    if (params.id.startsWith("pm_")) return `PMID:${params.id.slice(3)}`;
    if (params.id.startsWith("s2_")) return params.id.slice(3);
    // `doi_` ids are lossy (non-alphanumerics were replaced) and cannot be
    // reversed reliably — callers should pass the raw `doi` field instead.
    if (params.id.startsWith("doi_")) return null;
    return params.id;
  }
  return null;
}
