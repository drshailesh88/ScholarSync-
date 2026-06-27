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
  enrichCitationsByIds,
} from "@/lib/search/sources/openalex";
import { searchMedcptDense } from "@/lib/search/sources/medcpt-dense";
import { fetchCrossrefByDoi } from "@/lib/search/sources/crossref";
import { searchClinicalTrials } from "@/lib/search/sources/clinical-trials";
import { searchTavily } from "@/lib/search/sources/tavily";
import { expandByPmra } from "@/lib/search/sources/expansion";
import { reciprocalRankFusion } from "@/lib/search/rank-fusion";
import { planQuery } from "@/lib/search/query-planner";
import { rankAndAnnotate } from "@/lib/search/pipeline";
import { searchResultCache, buildCacheKey } from "@/lib/search/result-cache";
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
  /**
   * Opt-in citation/PMRA neighbour expansion (a high-recall, slower mode for
   * systematic-review-style searches). Off by default to keep the default path
   * fast — the OpenAlex dense semantic lane already provides corpus-free recall.
   */
  expandCitations?: boolean;
  /**
   * Eval-only: also return the post-enrichment/rerank candidate POOL (pre-final-
   * ranking), so the offline harness can freeze it and re-rank deterministically.
   * Off by default; never set on the live web/MCP path.
   */
  includeRawCandidates?: boolean;
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
  /**
   * Eval-only: the frozen post-enrichment/rerank candidate pool (present only when
   * `includeRawCandidates` was set). Lets the offline harness re-rank a fixed pool
   * deterministically, isolating ranking changes from live-retrieval noise.
   */
  rawCandidates?: UnifiedSearchResult[];
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

/**
 * Global fan-out deadline (ms). A single stuck/throttled lane must not hold the
 * whole query — at the deadline we proceed with whatever lanes have resolved
 * (partial results), marking the rest as dropped. Caps the p95 tail.
 */
export const FANOUT_DEADLINE_MS = 5000;

// Cap for the post-fusion enrich+rerank pool. Only the top candidates by RRF
// score can reach the returned page, so bounding both steps here keeps OpenAlex
// enrichment to a single batch regardless of how many lanes contributed —
// protecting the shared OpenAlex token bucket from metadata-light lanes.
export const POST_FUSION_POOL = 50;

const DEADLINE = Symbol("fanout-deadline");

/**
 * Await source lanes up to a global deadline, returning PARTIAL results: lanes
 * that resolved are used as-is; lanes still pending at the deadline are recorded
 * as a "timeout" outcome (so they never block the query, and `sourceStatuses`
 * shows them degraded rather than a false "ok with 0 results"). Each input
 * promise already resolves to a SourceOutcome (never rejects).
 */
export async function settleWithinDeadline(
  outcomes: Promise<SourceOutcome>[],
  labels: string[],
  deadlineMs: number
): Promise<SourceOutcome[]> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const deadline = new Promise<typeof DEADLINE>((resolve) => {
    timer = setTimeout(() => resolve(DEADLINE), deadlineMs);
  });
  try {
    return await Promise.all(
      outcomes.map(async (p, i) => {
        const res = await Promise.race([p, deadline]);
        if (res === DEADLINE) {
          return {
            source: labels[i] ?? `lane_${i}`,
            results: [],
            total: 0,
            status: {
              status: "timeout" as const,
              message: `dropped: fan-out exceeded ${deadlineMs}ms`,
            },
          };
        }
        return res;
      })
    );
  } finally {
    if (timer) clearTimeout(timer);
  }
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
  queries: { primary: string; broadened: string | null; fallback: string; relaxed: string },
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
  const safeSearch = (q: string) =>
    searchPubMed(q, base).catch(() => ({ results: [], total: 0, status: okStatus() }));

  const runs = await Promise.all(
    [queries.primary, queries.broadened].filter((q): q is string => Boolean(q)).map(safeSearch)
  );
  const merged = runs.flatMap((r) => r.results);
  const total = Math.max(0, ...runs.map((r) => r.total));
  const status = runs.find((r) => r.status.status === "ok")?.status ?? runs[0]?.status ?? okStatus();

  if (merged.length > 0) {
    return { source: "pubmed", results: merged, total, status };
  }

  // Tier 2: verbatim fallback (distinct natural-language phrasing).
  let out = { results: merged, total, status };
  if (queries.primary !== queries.fallback) {
    out = await safeSearch(queries.fallback);
  }

  // Tier 3: OR-relaxation — an over-constrained AND-query (e.g. a multi-trial
  // family lookup) produced nothing; retry with the distinctive tokens OR-ed so
  // recall never collapses to an empty result set.
  if (
    out.results.length === 0 &&
    queries.relaxed &&
    queries.relaxed !== queries.primary &&
    queries.relaxed !== queries.fallback
  ) {
    out = await safeSearch(queries.relaxed);
  }
  return { source: "pubmed", results: out.results, total: out.total, status: out.status };
}

/**
 * Cached entry point. Coalesces concurrent identical queries and serves from the
 * two-tier cache (memory → Upstash) — cutting latency and upstream-call pressure.
 * Only HEALTHY results (≥3 papers) are cached, so a throttle-degraded/empty
 * response can never poison the cache; stale-if-error serves a retained result
 * if a later compute fails. TTL 1h (literature is slow-changing).
 */
export async function runLiteratureSearch(
  params: RunLiteratureSearchParams
): Promise<LiteratureSearchResult> {
  const key = buildCacheKey("litsearch:v1", {
    query: params.query,
    pubmedQuery: params.pubmedQuery,
    sources: params.sources ? [...params.sources].sort() : undefined,
    yearFrom: params.yearFrom,
    yearTo: params.yearTo,
    studyTypes: params.studyTypes ? [...params.studyTypes].sort() : undefined,
    fullTextOnly: params.fullTextOnly,
    page: params.page,
    perPage: params.perPage,
    expandCitations: params.expandCitations,
  });
  const { value } = await searchResultCache.getOrCompute(
    key,
    () => runLiteratureSearchUncached(params),
    { ttlSeconds: 3600, staleSeconds: 6 * 3600, shouldCache: (r) => r.results.length >= 3 }
  );
  return value;
}

async function runLiteratureSearchUncached(
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
  // A caller-supplied pubmedQuery overrides planning entirely (no broadening/relaxation).
  const pmBroadened = params.pubmedQuery ? null : plan.pubmedBroadened;
  const pmRelaxed = params.pubmedQuery ? "" : plan.pubmedRelaxed;

  const promises: Promise<SourceOutcome>[] = [];
  const laneLabels: string[] = [];
  const pushLane = (label: string, p: Promise<SourceOutcome>) => {
    promises.push(p);
    laneLabels.push(label);
  };

  if (sources.includes("pubmed")) {
    pushLane(
      "pubmed",
      withSourceTimeout(
        "PubMed",
        searchPubMedPlanned(
          { primary: pmPrimary, broadened: pmBroadened, fallback: pmFallback, relaxed: pmRelaxed },
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
    pushLane(
      "openalex",
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
  }

  // Dense first-stage retrieval over the self-hosted MedCPT PubMed index
  // (Turbopuffer int8 + a Modal-served MedCPT Query-Encoder) — the throttle-proof
  // replacement for the OpenAlex `search.semantic` lane. Retrieves by MEANING,
  // surfacing landmarks that share no surface terms with the query, and cannot be
  // rate-limited away because we own it. Fused into the candidate pool before RRF,
  // exactly like the lane it replaces. Runs alongside the core biomedical lexical
  // lanes (PubMed / OpenAlex) and fails open: dormant (missing_config) until the
  // index + encoder are configured, so it never degrades live search.
  if (sources.includes("pubmed") || sources.includes("openalex")) {
    pushLane(
      "medcpt_dense",
      withSourceTimeout(
        "MedCPT Dense",
        searchMedcptDense(searchQuery, {
          limit: poolPerSource,
          yearStart: params.yearFrom,
          yearEnd: params.yearTo,
        }).then(({ results, total, status }) => ({
          source: "medcpt_dense",
          results,
          total,
          status,
        }))
      ).catch((e) =>
        errorOutcome("medcpt_dense", e instanceof Error ? e.message : "MedCPT dense failed")
      )
    );
  }

  // Semantic Scholar is opt-in only (never required). Used purely as an extra
  // citation/metadata signal when explicitly requested and reachable.
  if (sources.includes("semantic_scholar")) {
    pushLane(
      "semantic_scholar",
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
    pushLane(
      "clinical_trials",
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
    pushLane(
      "web",
      withSourceTimeout(
        "Tavily",
        searchTavily(searchQuery, { maxResults: 5, topic: plan.recency ? "news" : "general" }).then(
          ({ results, total, status }) => ({ source: "web", results, total, status })
        )
      ).catch((e) => errorOutcome("web", e instanceof Error ? e.message : "Tavily failed"))
    );
  }

  // Await lanes up to a global deadline → partial results (a stuck/throttled lane
  // never holds the whole query; dropped lanes are marked "timeout", not "ok").
  const sourceResults = await settleWithinDeadline(promises, laneLabels, FANOUT_DEADLINE_MS);

  // Wave 2 (opt-in): neighbour/citation expansion on the top seeds — a corpus-free
  // recall booster that pulls PubMed related-articles (PMRA) of the best wave-1
  // hits, so landmark papers related to (but not lexically matching) the query
  // enter the pool. Sequential (depends on wave-1 seeds) and slower, so it is
  // gated behind `expandCitations` (high-recall mode); fail-open.
  if (params.expandCitations && sources.includes("pubmed")) {
    const seedPmids = sourceResults
      .flatMap((sr) => sr.results.slice(0, 5))
      .map((r) => r.pmid)
      .filter((p): p is string => Boolean(p));
    if (seedPmids.length > 0) {
      const expanded = await withSourceTimeout(
        "PMRA expand",
        expandByPmra(seedPmids, { limit: poolPerSource }),
        12000
      ).catch(() => [] as UnifiedSearchResult[]);
      if (expanded.length > 0) {
        sourceResults.push({
          source: "pubmed_pmra",
          results: expanded,
          total: expanded.length,
          status: okStatus(),
        });
      }
    }
  }

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

  // Post-fusion enrichment + rerank run CONCURRENTLY (they mutate disjoint fields
  // of `fused`: enrichment fills citationCount/PMID/DOI/OA; rerank attaches
  // rerankScore). Running them in parallel instead of back-to-back cuts the
  // post-fusion critical path ~30-45% and shrinks the window where lane timeouts
  // accumulate. Both fail-open.
  //  - enrich: OpenAlex citation/PMID/DOI backfill — the S2-independent landmark signal.
  //  - rerank: Cohere cross-encoder relevance score (dominant relevance signal).
  //
  // Both are bounded to the top `POST_FUSION_POOL` candidates by RRF score, in
  // place (slice shares object refs, so the originals in `fused` still get the
  // mutated fields). This caps the OpenAlex enrichment at a single batch and
  // stops a metadata-light lane (e.g. the MedCPT dense lane, whose precomputed
  // rows carry no DOI/citation) from injecting EXTRA enrichment batches that
  // drain OpenAlex's shared token bucket and starve the lexical search lanes of
  // the next query's fan-out budget. Candidates past the pool are not reranked
  // anyway, so they can never reach the returned page — enriching them is wasted.
  const enrichRerankPool = fused.slice(0, POST_FUSION_POOL);
  // The cross-encoder rerank is COUNTERPRODUCTIVE for a specific trial-acronym
  // lookup: fed a bare acronym ("KEYNOTE-189"), it scores secondary papers that
  // mention the acronym above the trial's PRIMARY report (whose title describes the
  // intervention, not the acronym), demoting the canonical answer off the page
  // (measured: the GT primary sits in the rerank pool but is pushed out of the top-10
  // only when reranked). For these the exact-match lexical lane + clinical-quality
  // composite + demoteSecondaryTrialResults already float the primary first, so we
  // skip the rerank (enrichment still runs). Non-acronym queries keep it.
  const skipRerank = plan.trialAcronyms.length > 0;
  await Promise.all([
    withSourceTimeout("OpenAlex enrich", enrichCitationsByIds(enrichRerankPool), 3500).catch(() => 0),
    skipRerank
      ? Promise.resolve(fused)
      : withSourceTimeout(
          "Cross-encoder rerank",
          attachRerankScores(searchQuery, enrichRerankPool, POST_FUSION_POOL),
          4000
        ).catch(() => fused),
  ]);

  // Eval-only: snapshot the enriched candidate pool BEFORE final ranking, so the
  // offline harness can re-rank this exact pool deterministically.
  const rawCandidates = params.includeRawCandidates
    ? fused.map((r) => ({ ...r }))
    : undefined;

  // Rank by clinical quality (relevance[rerank] + evidence hierarchy + citations
  // + velocity + journal) and annotate with a trace, flags, and "why relevant".
  const ranked = rankAndAnnotate(fused, {
    query: searchQuery,
    recency: plan.recency,
    isTrialLookup: plan.isTrialLookup,
  });

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
    ...(rawCandidates ? { rawCandidates } : {}),
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
