/**
 * POST /api/research/search
 *
 * Execute a literature search against PubMed + Semantic Scholar.
 * Leverages the existing search infrastructure (sources, dedup, evidence levels).
 */

import { NextRequest, NextResponse } from "next/server";
import { searchPubMed } from "@/lib/search/sources/pubmed";
import { searchSemanticScholar } from "@/lib/search/sources/semantic-scholar";
import { reciprocalRankFusion } from "@/lib/search/rank-fusion";
import type { UnifiedSearchResult } from "@/types/search";

interface SearchRequestBody {
  query: string;
  filters?: {
    dateFrom?: number;
    dateTo?: number;
    studyTypes?: string[];
    fullTextOnly?: boolean;
    sources?: ("pubmed" | "semantic_scholar")[];
    language?: "english" | "all";
  };
  page?: number;
  perPage?: number;
  pubmedQuery?: string; // Override query for PubMed (from research plan)
}

function mapStudyType(studyType: string | undefined): string {
  if (!studyType) return "other";
  const mapping: Record<string, string> = {
    "Randomized Controlled Trial": "rct",
    "systematic_review": "systematic_review",
    "meta_analysis": "meta_analysis",
    "Review": "narrative_review",
    "Clinical Trial": "clinical_trial",
    "Case Reports": "case_report",
    "Cohort Studies": "cohort",
    "Guideline": "guideline",
    "Practice Guideline": "guideline",
  };
  return mapping[studyType] || studyType;
}

function generatePaperId(result: UnifiedSearchResult): string {
  if (result.pmid) return `pm_${result.pmid}`;
  if (result.doi) return `doi_${result.doi.replace(/[^a-zA-Z0-9]/g, "_")}`;
  if (result.s2Id) return `s2_${result.s2Id}`;
  return `paper_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function determineSource(result: UnifiedSearchResult): "pubmed" | "semantic_scholar" | "both" {
  const sources = result.sources || [];
  const hasPubmed = sources.includes("pubmed");
  const hasSS = sources.includes("semantic_scholar");
  if (hasPubmed && hasSS) return "both";
  if (hasSS) return "semantic_scholar";
  return "pubmed";
}

export async function POST(req: NextRequest) {
  try {
    const body: SearchRequestBody = await req.json();
    const {
      query,
      filters = {},
      page = 0,
      perPage = 10,
      pubmedQuery,
    } = body;

    if (!query && !pubmedQuery) {
      return NextResponse.json(
        { error: "Missing required field: query" },
        { status: 400 }
      );
    }

    const sources = filters.sources || ["pubmed", "semantic_scholar"];
    const searchQuery = query || "";
    const pmQuery = pubmedQuery || searchQuery;

    // Fan out to requested sources
    const promises: Promise<{ source: string; results: UnifiedSearchResult[]; total: number }>[] = [];

    if (sources.includes("pubmed")) {
      promises.push(
        searchPubMed(pmQuery, {
          maxResults: perPage,
          page,
          yearStart: filters.dateFrom,
          yearEnd: filters.dateTo,
        }).then(({ results, total }) => ({ source: "pubmed", results, total }))
          .catch(() => ({ source: "pubmed", results: [], total: 0 }))
      );
    }

    if (sources.includes("semantic_scholar")) {
      promises.push(
        searchSemanticScholar(searchQuery, {
          limit: perPage,
          offset: page * perPage,
          yearStart: filters.dateFrom,
          yearEnd: filters.dateTo,
        }).then(({ results, total }) => ({ source: "semantic_scholar", results, total }))
          .catch(() => ({ source: "semantic_scholar", results: [], total: 0 }))
      );
    }

    const sourceResults = await Promise.all(promises);

    // Calculate totals per source
    const sourceCounts: Record<string, number> = {};
    let maxTotal = 0;
    for (const sr of sourceResults) {
      sourceCounts[sr.source] = sr.total;
      maxTotal = Math.max(maxTotal, sr.total);
    }

    // Fuse results with RRF
    const fused = reciprocalRankFusion(
      sourceResults.map((sr) => ({ source: sr.source, results: sr.results }))
    );

    // Filter by study type if requested
    let filtered = fused;
    if (filters.studyTypes && filters.studyTypes.length > 0) {
      const allowedTypes = new Set(filters.studyTypes);
      filtered = filtered.filter((r) => {
        const mapped = mapStudyType(r.studyType);
        return allowedTypes.has(mapped);
      });
    }

    // Filter by open access if requested
    if (filters.fullTextOnly) {
      filtered = filtered.filter((r) => r.isOpenAccess);
    }

    // Map to PaperResult format
    const results = filtered.map((r) => ({
      ...r,
      id: generatePaperId(r),
      studyTypeEnum: mapStudyType(r.studyType),
      verificationStatus: "pending" as const,
      source: determineSource(r),
      inLibrary: false,
    }));

    return NextResponse.json({
      results,
      total: maxTotal,
      page,
      perPage,
      hasMore: results.length >= perPage,
      sourceCounts,
    });
  } catch (error) {
    console.error("Research search error:", error);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}
