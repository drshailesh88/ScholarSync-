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
import { searchSemanticScholar } from "@/lib/search/sources/semantic-scholar";
import {
  searchOpenAlex,
  searchOpenAlexSemantic,
  enrichCitationsByIds,
} from "@/lib/search/sources/openalex";
import { fetchCrossrefByDoi } from "@/lib/search/sources/crossref";
import { searchClinicalTrials } from "@/lib/search/sources/clinical-trials";
import { searchTavily } from "@/lib/search/sources/tavily";
import { reciprocalRankFusion } from "@/lib/search/rank-fusion";
import { planQuery } from "@/lib/search/query-planner";
import { rankAndAnnotate } from "@/lib/search/pipeline";
import { attachRerankScores } from "@/lib/search/rerank";
import { okStatus, type SourceStatus } from "@/lib/search/source-status";
import type { UnifiedSearchResult } from "@/types/search";

export const SEARCH_SOURCES = ["pubmed", "semantic_scholar", "openalex"] as const;
export type SearchSourceId = (typeof SEARCH_SOURCES)[number];

/**
 * Sources used when a caller does not specify any. PubMed-first for clinical
 * relevance, OpenAlex for citation counts + open-access links. Semantic Scholar
 * is intentionally NOT in the default set — it is optional and the system works
 * fully without it (it 403s / rate-limits frequently). Pass it explicitly to opt in.
 */
export const DEFAULT_SOURCES: SearchSourceId[] = ["pubmed", "openalex"];

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
  /**
   * Per-source health. A source marked anything other than "ok" was degraded —
   * its zero count must NOT be read as "no results". Surfaced so callers can
   * distinguish "source down" from "genuinely nothing found".
   */
  sourceStatuses: Record<string, SourceStatus>;
  /** The retrieval plan used (sort strategy, expansions, trial detection). */
  plan: {
    pubmedQuery: string;
    recency: boolean;
    trialAcronyms: string[];
    wantsTrials: boolean;
  };
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

interface SourceOutcome {
  source: string;
  results: UnifiedSearchResult[];
  total: number;
  status: SourceStatus;
}

const errorOutcome = (source: string, message: string): SourceOutcome => ({
  source,
  results: [],
  total: 0,
  status: { status: "error", message },
});

/**
 * PubMed retrieval with a robust multi-query strategy:
 *  - Run the keyword-simplified PRIMARY query (relevance- or date-sorted).
 *  - Also run the BROADENED core-topic query (qualifiers stripped) and UNION it,
 *    so a seminal trial matching the topic but not the qualifiers ("six year
 *    outcomes") is still retrieved, then ranked.
 *  - If the union is empty AND a distinct verbatim FALLBACK exists, retry with it
 *    (eliminates empty-result-sets for natural-language / PICO queries).
 * Union dedup is handled downstream by RRF (`isSamePaper`).
 */
async function searchPubMedPlanned(
  queries: { primary: string; broadened: string | null; fallback: string },
  opts: { maxResults: number; page: number; yearStart?: number; yearEnd?: number; recency: boolean }
): Promise<SourceOutcome> {
  const sort = opts.recency ? "date" : "relevance";
  const base = {
    maxResults: opts.maxResults,
    page: opts.page,
    yearStart: opts.yearStart,
    yearEnd: opts.yearEnd,
    sort,
  } as const;

  const runs = await Promise.all(
    [queries.primary, queries.broadened]
      .filter((q): q is string => Boolean(q))
      .map((q) =>
        searchPubMed(q, base).catch(() => ({ results: [], total: 0, status: okStatus() }))
      )
  );
  const merged = runs.flatMap((r) => r.results);
  const total = Math.max(0, ...runs.map((r) => r.total));
  const status = runs.find((r) => r.status.status === "ok")?.status ?? runs[0]?.status ?? okStatus();

  if (merged.length > 0 || queries.primary === queries.fallback) {
    return { source: "pubmed", results: merged, total, status };
  }
  const fb = await searchPubMed(queries.fallback, base);
  return { source: "pubmed", results: fb.results, total: fb.total, status: fb.status };
}

export async function runLiteratureSearch(
  params: RunLiteratureSearchParams
): Promise<LiteratureSearchResult> {
  const sources = normalizeSources(params.sources);
  const page = Math.max(0, params.page ?? 0);
  const perPage = Math.min(MAX_RESULTS, Math.max(1, params.perPage ?? DEFAULT_PER_PAGE));
  // Over-fetch a larger candidate pool per source than the page size, so a
  // landmark sitting just outside a source's top-N (e.g. PARTNER 3 at PubMed
  // rank ~15) still enters the pool, gets reranked, and can reach the top page.
  const poolPerSource = Math.min(MAX_RESULTS, Math.max(perPage, 25));
  const searchQuery = params.query || "";
  const plan = planQuery(searchQuery);
  const pmPrimary = params.pubmedQuery || plan.pubmedPrimary;
  const pmFallback = params.pubmedQuery || plan.pubmedFallback;
  // A caller-supplied pubmedQuery overrides planning entirely (no broadening).
  const pmBroadened = params.pubmedQuery ? null : plan.pubmedBroadened;

  const promises: Promise<SourceOutcome>[] = [];

  if (sources.includes("pubmed")) {
    promises.push(
      withSourceTimeout(
        "PubMed",
        searchPubMedPlanned(
          { primary: pmPrimary, broadened: pmBroadened, fallback: pmFallback },
          {
            maxResults: poolPerSource,
            page,
            yearStart: params.yearFrom,
            yearEnd: params.yearTo,
            recency: plan.recency,
          }
        )
      ).catch((e) => errorOutcome("pubmed", e instanceof Error ? e.message : "PubMed failed"))
    );
  }

  if (sources.includes("openalex")) {
    promises.push(
      withSourceTimeout(
        "OpenAlex",
        searchOpenAlex(searchQuery, {
          limit: poolPerSource,
          page: page + 1,
          yearStart: params.yearFrom,
          yearEnd: params.yearTo,
          onlyOpenAccess: params.fullTextOnly,
        }).then(({ results, total, status }) => ({ source: "openalex", results, total, status }))
      ).catch((e) => errorOutcome("openalex", e instanceof Error ? e.message : "OpenAlex failed"))
    );

    // Dense semantic lane (OpenAlex search.semantic) — the corpus-free fix for the
    // lexical recall gap. Retrieves by meaning, surfacing landmarks with no shared
    // surface terms. Fused into the pool before RRF; fails open like any source.
    promises.push(
      withSourceTimeout(
        "OpenAlex Semantic",
        searchOpenAlexSemantic(searchQuery, {
          limit: poolPerSource,
          yearStart: params.yearFrom,
          yearEnd: params.yearTo,
        }).then(({ results, total, status }) => ({
          source: "openalex_semantic",
          results,
          total,
          status,
        }))
      ).catch((e) =>
        errorOutcome("openalex_semantic", e instanceof Error ? e.message : "OpenAlex semantic failed")
      )
    );
  }

  // Semantic Scholar is opt-in only (never required). Used purely as an extra
  // citation/metadata signal when explicitly requested and reachable.
  if (sources.includes("semantic_scholar")) {
    promises.push(
      withSourceTimeout(
        "Semantic Scholar",
        searchSemanticScholar(searchQuery, {
          limit: poolPerSource,
          offset: page * poolPerSource,
          yearStart: params.yearFrom,
          yearEnd: params.yearTo,
        }).then(({ results, total, status }) => ({
          source: "semantic_scholar",
          results,
          total,
          status,
        }))
      ).catch((e) =>
        errorOutcome("semantic_scholar", e instanceof Error ? e.message : "Semantic Scholar failed")
      )
    );
  }

  // ClinicalTrials.gov linking for trial-acronym / NCT / explicit-trial queries.
  if (plan.wantsTrials) {
    promises.push(
      withSourceTimeout(
        "ClinicalTrials",
        searchClinicalTrials(searchQuery, { limit: Math.min(5, perPage) }).then(
          ({ results, total, status }) => ({ source: "clinical_trials", results, total, status })
        )
      ).catch((e) =>
        errorOutcome("clinical_trials", e instanceof Error ? e.message : "ClinicalTrials failed")
      )
    );
  }

  // Optional web fallback (Tavily) for guideline / recency queries. No-op without
  // TAVILY_API_KEY. Restricted to trusted biomedical/guideline domains and
  // trust-tiered so it can never out-rank stable primary literature.
  if (plan.wantsWeb && process.env.TAVILY_API_KEY) {
    promises.push(
      withSourceTimeout(
        "Tavily",
        searchTavily(searchQuery, { maxResults: 5, topic: plan.recency ? "news" : "general" }).then(
          ({ results, total, status }) => ({ source: "web", results, total, status })
        )
      ).catch((e) => errorOutcome("web", e instanceof Error ? e.message : "Tavily failed"))
    );
  }

  const sourceResults = await Promise.all(promises);

  const sourceCounts: Record<string, number> = {};
  const sourceStatuses: Record<string, SourceStatus> = {};
  let maxTotal = 0;
  for (const sr of sourceResults) {
    sourceCounts[sr.source] = sr.total;
    sourceStatuses[sr.source] = sr.status;
    maxTotal = Math.max(maxTotal, sr.total);
  }

  const fused = reciprocalRankFusion(
    sourceResults.map((sr) => ({ source: sr.source, results: sr.results }))
  );

  // Backfill citation counts (and OA/concepts) from OpenAlex by PMID/DOI so the
  // quality ranker has a reliable, S2-independent citation/landmark signal even
  // for PubMed-only results. Fail-open: ranking proceeds regardless.
  await withSourceTimeout("OpenAlex enrich", enrichCitationsByIds(fused), 9000).catch(
    () => 0
  );

  // Cross-encoder rerank (Cohere): attach a semantic relevance score to the
  // fused candidates BEFORE ranking, so the quality composite uses it as the
  // dominant relevance signal (rather than keyword overlap). Fail-open.
  await withSourceTimeout(
    "Cohere rerank",
    attachRerankScores(searchQuery, fused, 50),
    12000
  ).catch(() => fused);

  // Rank by clinical quality (relevance[rerank] + evidence hierarchy + citations
  // + velocity + journal) and annotate with a trace, flags, and "why relevant".
  const ranked = rankAndAnnotate(fused, { query: searchQuery, recency: plan.recency });

  let filtered = ranked;
  if (params.studyTypes && params.studyTypes.length > 0) {
    const allowedTypes = new Set(params.studyTypes);
    filtered = filtered.filter((r) => allowedTypes.has(mapStudyType(r.studyType)));
  }

  if (params.fullTextOnly) {
    filtered = filtered.filter((r) => r.isOpenAccess);
  }

  // The full pool was over-fetched and ranked; return only the requested page.
  const pageResults = filtered.slice(0, perPage);
  const results: LiteraturePaper[] = pageResults.map((r) => ({
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
    hasMore: filtered.length > perPage,
    sourceCounts,
    sourceStatuses,
    plan: {
      pubmedQuery: pmPrimary,
      recency: plan.recency,
      trialAcronyms: plan.trialAcronyms,
      wantsTrials: plan.wantsTrials,
    },
  };
}

async function fetchSinglePubMed(term: string): Promise<UnifiedSearchResult | null> {
  try {
    const { results } = await searchPubMed(term, { maxResults: 1 });
    return results[0] ?? null;
  } catch {
    return null;
  }
}

/**
 * Fetch a single paper by identifier — Semantic-Scholar-free. Accepts a DOI,
 * PMID, or an internal `pm_<pmid>` id and resolves through stable primary
 * sources in order: PubMed (by PMID or DOI), then Crossref (by DOI), then
 * OpenAlex citation enrichment. `doi_`/`s2_`/`oa_` internal ids are lossy and
 * cannot be reversed — callers should pass the raw `doi`/`pmid` instead.
 */
export async function fetchPaperById(params: {
  doi?: string;
  pmid?: string;
  id?: string;
}): Promise<LiteraturePaper | null> {
  const pmid =
    params.pmid?.trim() ||
    (params.id?.startsWith("pm_") ? params.id.slice(3) : undefined);
  const doi = (params.doi ?? "")
    .trim()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//, "")
    .toLowerCase();

  let paper: UnifiedSearchResult | null = null;
  if (pmid) paper = await fetchSinglePubMed(`${pmid}[uid]`);
  if (!paper && doi) {
    paper = await fetchSinglePubMed(`${doi}[doi]`);
    if (!paper) paper = await fetchCrossrefByDoi(doi);
  }
  if (!paper) return null;

  await enrichCitationsByIds([paper]).catch(() => 0);

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
