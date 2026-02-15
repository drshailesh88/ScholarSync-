import { NextResponse } from "next/server";
import type { UnifiedSearchResult, SearchResponse } from "@/types/search";
import { searchPubMed } from "@/lib/search/sources/pubmed";
import { searchSemanticScholar } from "@/lib/search/sources/semantic-scholar";
import { searchOpenAlex } from "@/lib/search/sources/openalex";
import { searchClinicalTrials } from "@/lib/search/sources/clinical-trials";
import { reciprocalRankFusion } from "@/lib/search/rank-fusion";
import { rerankResults } from "@/lib/search/rerank";
import { getEvidenceLevel } from "@/lib/search/evidence-level";
import { augmentQuery } from "@/lib/ai/query-augment";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "0", 10);
  const perPage = parseInt(searchParams.get("perPage") || "20", 10);
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

  if (!q) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  try {
    // Step 1: Query augmentation (if enabled and query is long enough)
    let pubmedQuery = q;
    let s2Query = q;
    let oaQuery = q;
    let augmentedQueries: SearchResponse["augmentedQueries"] | undefined;

    if (augment && q.length > 20) {
      try {
        const augmented = await augmentQuery(q);
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

    // Step 2: Fan out to all sources in parallel
    const [pubmedResult, s2Result, oaResult, ctResult] = await Promise.allSettled([
      searchPubMed(pubmedQuery, {
        maxResults: perPage,
        page: 0,
        yearStart,
        yearEnd,
      }),
      searchSemanticScholar(s2Query, {
        limit: perPage,
        offset: 0,
        yearStart,
        yearEnd,
      }),
      searchOpenAlex(oaQuery, {
        limit: perPage,
        page: 1,
        yearStart,
        yearEnd,
        onlyOpenAccess: openAccessOnly,
      }),
      searchClinicalTrials(q, {
        limit: perPage,
        yearStart,
        yearEnd,
      }),
    ]);

    const pubmedResults =
      pubmedResult.status === "fulfilled" ? pubmedResult.value.results : [];
    const s2Results =
      s2Result.status === "fulfilled" ? s2Result.value.results : [];
    const oaResults =
      oaResult.status === "fulfilled" ? oaResult.value.results : [];
    const ctResults =
      ctResult.status === "fulfilled" ? ctResult.value.results : [];

    const sourceCounts = {
      pubmed: pubmedResults.length,
      semanticScholar: s2Results.length,
      openAlex: oaResults.length,
      clinicalTrials: ctResults.length,
    };

    // Step 3: RRF fusion
    let fused = reciprocalRankFusion([
      { source: "pubmed", results: pubmedResults },
      { source: "semantic_scholar", results: s2Results },
      { source: "openalex", results: oaResults },
      { source: "clinical_trials", results: ctResults },
    ]);

    // Step 4: Rerank (if Cohere key available)
    fused = await rerankResults(q, fused);

    // Step 5: Apply evidence levels
    fused = fused.map((result) => {
      if (result.studyType && !result.evidenceLevel) {
        const evidence = getEvidenceLevel(result.studyType);
        return { ...result, evidenceLevel: evidence.level };
      }
      return result;
    });

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
    console.error("Unified search error:", error);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}
