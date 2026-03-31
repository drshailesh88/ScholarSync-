import { NextResponse } from "next/server";
import type { SearchResponse } from "@/types/search";
import { searchPubMed } from "@/lib/search/sources/pubmed";
import { searchSemanticScholar } from "@/lib/search/sources/semantic-scholar";
import { searchOpenAlex } from "@/lib/search/sources/openalex";
import { searchClinicalTrials } from "@/lib/search/sources/clinical-trials";
import { searchArxiv } from "@/lib/search/sources/arxiv";
import { searchSearXNG, type SearXNGCategory } from "@/lib/search/sources/searxng";
import { reciprocalRankFusion } from "@/lib/search/rank-fusion";
import { rerankResults } from "@/lib/search/rerank";
import { getDomainEvidenceLevel } from "@/lib/search/evidence-level";
import { getDomainConfig } from "@/lib/search/domains";
import { augmentQuery } from "@/lib/ai/query-augment";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { lookupJournalQuality } from "@/lib/search/journal-quality";
import { getDevelopmentFallbackResults } from "@/lib/search/dev-fallback";
import { getCurrentUserDomainConfig } from "@/lib/search/domains/user-domain";
import { enrichStudyTypes } from "@/lib/search/study-type-detector";
import { qualityRank } from "@/lib/search/quality-ranker";
import { expandQueryForDomain } from "@/lib/search/query-expander";
import type { SourceId } from "@/lib/search/domains";
import type { UnifiedSearchResult } from "@/types/search";

type SourceSearchResponse = {
  results: UnifiedSearchResult[];
  total: number;
};

type SearchTab = "academic" | "web" | "news" | "discussions";

type SourceDefinition = {
  sourceId: SourceId;
  label: string;
  run: () => Promise<SourceSearchResponse>;
};

const SEARXNG_CATEGORY_BY_TAB: Record<
  Exclude<SearchTab, "academic">,
  SearXNGCategory
> = {
  web: "general",
  news: "news",
  discussions: "social media",
};

function isSearchTab(tab: string): tab is SearchTab {
  return (
    tab === "academic" ||
    tab === "web" ||
    tab === "news" ||
    tab === "discussions"
  );
}

async function withSourceTimeout<T>(
  label: string,
  promise: Promise<T>,
  timeoutMs = 4500
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error(`${label} timed out after ${timeoutMs}ms`));
        }, timeoutMs);
      }),
    ]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export async function GET(req: Request) {
  const log = logger.withRequestId();

  // Authentication
  let userId: string;
  try {
    userId = await getCurrentUserId();
  } catch {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  // Rate limiting
  const rateLimitResponse = await checkRateLimit(userId, "search", RATE_LIMITS.search);
  if (rateLimitResponse) return rateLimitResponse;

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "0", 10);
  const perPage = Math.min(parseInt(searchParams.get("perPage") || "20", 10), 100);
  const yearStart = searchParams.get("yearStart")
    ? parseInt(searchParams.get("yearStart")!, 10)
    : undefined;
  const yearEnd = searchParams.get("yearEnd")
    ? parseInt(searchParams.get("yearEnd")!, 10)
    : undefined;
  const studyTypes = searchParams.get("studyTypes")
    ? searchParams.get("studyTypes")!.split(",")
    : undefined;
  const openAccessOnly = searchParams.get("openAccessOnly") === "true";
  const augment = searchParams.get("augment") !== "false";
  const sort = searchParams.get("sort") || "relevance";
  const tabParam = searchParams.get("tab") || "academic";

  if (!q) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  if (q.length > 500) {
    return NextResponse.json(
      { error: "Query parameter 'q' must not exceed 500 characters" },
      { status: 400 }
    );
  }

  if (!isSearchTab(tabParam)) {
    return NextResponse.json(
      { error: "Query parameter 'tab' must be academic, web, news, or discussions" },
      { status: 400 }
    );
  }

  try {
    if (tabParam !== "academic") {
      const category = SEARXNG_CATEGORY_BY_TAB[tabParam];
      const neededResults = Math.min((page + 1) * perPage, 100);
      const { results, total, degraded } = await searchSearXNG(q, {
        category,
        limit: neededResults,
      });
      const start = page * perPage;
      const paged = results.slice(start, start + perPage);

      return NextResponse.json({
        results: paged,
        total,
        page,
        perPage,
        hasMore: start + perPage < total,
        sourceCounts: { [tabParam]: total },
        searxngUnavailable: degraded,
      } satisfies SearchResponse);
    }

    const requestedDomainId = searchParams.get("domain");
    const domain = requestedDomainId
      ? getDomainConfig(requestedDomainId)
      : await getCurrentUserDomainConfig(userId);

    // Step 1: Query augmentation (if enabled and query is long enough)
    let pubmedQuery = q;
    let s2Query = q;
    let oaQuery = q;
    let augmentedQueries: SearchResponse["augmentedQueries"] | undefined;

    if (augment && q.length > 20) {
      try {
        const augmented = await augmentQuery(q, domain);
        pubmedQuery = augmented.pubmedQuery;
        s2Query = augmented.semanticScholarQuery;
        oaQuery = augmented.openAlexQuery;
        augmentedQueries = {
          pubmed: pubmedQuery,
          semanticScholar: s2Query,
          openAlex: oaQuery,
        };
      } catch {
        // Fall back to raw query if augmentation fails
      }
    }

    // Step 1b: Regex-based synonym expansion (supplementary PubMed search)
    let supplementaryPubmedQuery: string | null = null;
    try {
      const expansion = expandQueryForDomain(q, domain);
      supplementaryPubmedQuery = expansion.supplementary;
    } catch {
      log.warn("Query expansion failed, continuing without synonyms");
    }

    // Step 2: Fan out to all sources in parallel
    // Fetch enough results from each source to fill the requested page.
    // We need (page+1)*perPage results after fusion to serve the slice,
    // so ask each source for that many (capped at 100 for API limits).
    const neededPerSource = Math.min((page + 1) * perPage, 100);
    const sourceDefinitions: SourceDefinition[] = [];

    if (domain.sources.includes("pubmed")) {
      sourceDefinitions.push({
        sourceId: "pubmed",
        label: "PubMed",
        run: () =>
          searchPubMed(pubmedQuery, {
            maxResults: neededPerSource,
            page: 0,
            yearStart,
            yearEnd,
          }),
      });
    }

    if (supplementaryPubmedQuery && domain.sources.includes("pubmed")) {
      const expandedQuery = supplementaryPubmedQuery;
      sourceDefinitions.push({
        sourceId: "pubmed" as SourceId,
        label: "PubMed (expanded)",
        run: () =>
          searchPubMed(expandedQuery, {
            maxResults: neededPerSource,
            page: 0,
            yearStart,
            yearEnd,
          }),
      });
    }

    if (domain.sources.includes("semantic_scholar")) {
      sourceDefinitions.push({
        sourceId: "semantic_scholar",
        label: "Semantic Scholar",
        run: () =>
          searchSemanticScholar(s2Query, {
            limit: neededPerSource,
            offset: 0,
            yearStart,
            yearEnd,
          }),
      });
    }

    if (domain.sources.includes("openalex")) {
      sourceDefinitions.push({
        sourceId: "openalex",
        label: "OpenAlex",
        run: () =>
          searchOpenAlex(oaQuery, {
            limit: neededPerSource,
            page: 1,
            yearStart,
            yearEnd,
            onlyOpenAccess: openAccessOnly,
          }),
      });
    }

    if (
      domain.features.clinicalTrialsSearch &&
      domain.sources.includes("clinical_trials")
    ) {
      sourceDefinitions.push({
        sourceId: "clinical_trials",
        label: "ClinicalTrials.gov",
        run: () =>
          searchClinicalTrials(q, {
            limit: perPage,
            yearStart,
            yearEnd,
          }),
      });
    }

    if (domain.sources.includes("arxiv")) {
      sourceDefinitions.push({
        sourceId: "arxiv",
        label: "arXiv",
        run: () =>
          searchArxiv(q, {
            maxResults: neededPerSource,
            start: 0,
            yearStart,
            yearEnd,
          }),
      });
    }

    const sourceResults = await Promise.allSettled(
      sourceDefinitions.map((source) =>
        withSourceTimeout(source.label, source.run())
      )
    );

    const resultsBySource: Partial<Record<SourceId, UnifiedSearchResult[]>> = {};

    sourceDefinitions.forEach((source, index) => {
      const result = sourceResults[index];
      if (result.status === "fulfilled") {
        resultsBySource[source.sourceId] = result.value.results;
        return;
      }

      resultsBySource[source.sourceId] = [];
      log.warn(`${source.label} search degraded`, {
        query: q,
        error: String(result.reason),
      });
    });

    if (
      sourceDefinitions.length > 0 &&
      sourceDefinitions.every(
        (source) => (resultsBySource[source.sourceId] ?? []).length === 0
      )
    ) {
      const fallback = await getDevelopmentFallbackResults(q, neededPerSource);
      if (fallback) {
        const fallbackBySource: Partial<Record<SourceId, UnifiedSearchResult[]>> = {
          pubmed: fallback.pubmedResults,
          semantic_scholar: fallback.semanticScholarResults,
          openalex: fallback.openAlexResults,
          clinical_trials: fallback.clinicalTrialsResults,
        };

        sourceDefinitions.forEach((source) => {
          if (fallbackBySource[source.sourceId]) {
            resultsBySource[source.sourceId] = fallbackBySource[source.sourceId];
          }
        });

        log.info("Unified search served development fallback results", {
          query: q,
        });
      }
    }

    const sourceCounts = Object.fromEntries(
      sourceDefinitions.map((source) => [
        source.sourceId,
        (resultsBySource[source.sourceId] ?? []).length,
      ])
    );

    // Step 3: RRF fusion
    let fused = reciprocalRankFusion(
      sourceDefinitions.map((source) => ({
        source: source.sourceId,
        results: resultsBySource[source.sourceId] ?? [],
      }))
    );

    // Step 4: Rerank (if Cohere key available)
    fused = await rerankResults(q, fused);

    // Step 4b: Detect study types from title/abstract text
    try {
      enrichStudyTypes(fused);
    } catch {
      log.warn("Study type enrichment failed, continuing");
    }

    // Step 5: Apply evidence levels
    fused = fused.map((result) => {
      if (result.studyType && !result.evidenceLevel) {
        const evidence = getDomainEvidenceLevel(result.studyType, domain);
        return { ...result, evidenceLevel: evidence.level };
      }
      return result;
    });

    // Step 5b: Enrich with journal quality indicators
    fused = fused.map((result) => {
      if (result.journal) {
        const quality = lookupJournalQuality(result.journal);
        if (quality) {
          return {
            ...result,
            journalQuartile: quality.quartile,
            journalImpactProxy: quality.citesPerDoc2y,
          };
        }
      }
      return result;
    });

    // Step 5c: Quality-weighted composite ranking
    try {
      fused = qualityRank(fused, q);
    } catch {
      log.warn("Quality ranking failed, continuing with rerank order");
    }

    // Step 6: Apply study type filter
    let filtered = fused;
    if (studyTypes && studyTypes.length > 0) {
      filtered = filtered.filter(
        (r) => r.studyType && studyTypes.includes(r.studyType)
      );
    }

    // Step 7: Apply open access filter (if not already applied at source level)
    if (openAccessOnly) {
      filtered = filtered.filter((r) => r.isOpenAccess);
    }

    // Step 8: Sort
    if (sort === "citations") {
      filtered.sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0));
    } else if (sort === "year") {
      filtered.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (sort === "evidence") {
      const levelOrder: Record<string, number> = {
        I: 1,
        II: 2,
        III: 3,
        IV: 4,
        V: 5,
      };
      filtered.sort(
        (a, b) =>
          (levelOrder[a.evidenceLevel || "V"] || 5) -
          (levelOrder[b.evidenceLevel || "V"] || 5)
      );
    } else if (sort === "impact") {
      filtered.sort(
        (a, b) =>
          (b.journalImpactProxy ?? -1) - (a.journalImpactProxy ?? -1),
      );
    }
    // "relevance" keeps RRF/rerank order (default)

    // Step 9: Pagination
    const total = filtered.length;
    const start = page * perPage;
    const paged = filtered.slice(start, start + perPage);
    const hasMore = start + perPage < total;

    const response: SearchResponse = {
      results: paged,
      total,
      page,
      perPage,
      hasMore,
      sourceCounts,
      augmentedQueries,
    };

    return NextResponse.json(response);
  } catch (error) {
    log.error("Unified search error", error);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}
