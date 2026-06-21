/**
 * POST /api/research/search
 *
 * Execute a literature search against PubMed + Semantic Scholar.
 * Auth + rate limiting live here at the web boundary; the actual search
 * orchestration is shared via `runLiteratureSearch` (also used by the MCP tool).
 */

import { NextRequest, NextResponse } from "next/server";
import { runLiteratureSearch, type SearchSourceId } from "@/lib/search/run-search";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

interface SearchRequestBody {
  query: string;
  filters?: {
    dateFrom?: number;
    dateTo?: number;
    studyTypes?: string[];
    fullTextOnly?: boolean;
    sources?: SearchSourceId[];
    language?: "english" | "all";
  };
  page?: number;
  perPage?: number;
  pubmedQuery?: string; // Override query for PubMed (from research plan)
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    const rateLimitResponse = await checkRateLimit(userId, "research", RATE_LIMITS.ai);
    if (rateLimitResponse) return rateLimitResponse;

    const body: SearchRequestBody = await req.json();
    const { query, filters = {}, page = 0, perPage = 10, pubmedQuery } = body;

    if (!query && !pubmedQuery) {
      return NextResponse.json(
        { error: "Missing required field: query" },
        { status: 400 }
      );
    }

    const result = await runLiteratureSearch({
      query: query || "",
      pubmedQuery,
      sources: filters.sources,
      yearFrom: filters.dateFrom,
      yearTo: filters.dateTo,
      studyTypes: filters.studyTypes,
      fullTextOnly: filters.fullTextOnly,
      page,
      perPage,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Research search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
