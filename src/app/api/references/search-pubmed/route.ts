import { NextRequest, NextResponse } from "next/server";
import { parsePubMedXml } from "@/lib/citations/pubmed-parser";

/**
 * POST /api/references/search-pubmed
 *
 * Search PubMed using NCBI E-utilities and return parsed references.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      query,
      filters = {},
      page = 1,
      pageSize = 10,
      documentId = "default",
    } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { results: [], totalCount: 0, page: 1, error: "Missing query" },
        { status: 400 }
      );
    }

    const clampedPageSize = Math.min(Math.max(pageSize, 1), 20);
    const retStart = (page - 1) * clampedPageSize;

    // Build PubMed query with filters
    let fullQuery = query;

    if (filters.yearFrom || filters.yearTo) {
      const from = filters.yearFrom || 1900;
      const to = filters.yearTo || new Date().getFullYear();
      fullQuery += ` AND ${from}:${to}[dp]`;
    }

    if (filters.articleType) {
      const typeMap: Record<string, string> = {
        "randomized-controlled-trial": "randomized controlled trial[pt]",
        review: "review[pt]",
        "meta-analysis": "meta-analysis[pt]",
        guideline: "practice guideline[pt]",
        "case-report": "case reports[pt]",
      };
      const ptFilter = typeMap[filters.articleType];
      if (ptFilter) {
        fullQuery += ` AND ${ptFilter}`;
      }
    }

    // Step 1: esearch to get PMIDs
    const apiKey = process.env.NCBI_API_KEY;
    const baseParams = apiKey ? `&api_key=${apiKey}` : "";

    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(fullQuery)}&retmax=${clampedPageSize}&retstart=${retStart}&retmode=json${baseParams}`;

    const searchRes = await fetch(searchUrl, {
      signal: AbortSignal.timeout(10000),
    });

    if (!searchRes.ok) {
      return NextResponse.json(
        {
          results: [],
          totalCount: 0,
          page,
          error: "PubMed search failed",
        },
        { status: 502 }
      );
    }

    const searchData = await searchRes.json();
    const pmids: string[] = searchData.esearchresult?.idlist || [];
    const totalCount = parseInt(
      searchData.esearchresult?.count || "0",
      10
    );

    if (pmids.length === 0) {
      return NextResponse.json({
        results: [],
        totalCount: 0,
        page,
      });
    }

    // Step 2: efetch to get full metadata
    const fetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmids.join(",")}&rettype=xml&retmode=xml${baseParams}`;

    const fetchRes = await fetch(fetchUrl, {
      signal: AbortSignal.timeout(15000),
    });

    if (!fetchRes.ok) {
      return NextResponse.json(
        {
          results: [],
          totalCount,
          page,
          error: "Failed to fetch PubMed records",
        },
        { status: 502 }
      );
    }

    const xml = await fetchRes.text();
    const references = parsePubMedXml(xml, documentId);

    return NextResponse.json({
      results: references,
      totalCount,
      page,
    });
  } catch (err: any) {
    console.error("PubMed search error:", err);

    if (err.name === "TimeoutError") {
      return NextResponse.json(
        {
          results: [],
          totalCount: 0,
          page: 1,
          error: "PubMed request timed out. Try again.",
        },
        { status: 504 }
      );
    }

    return NextResponse.json(
      {
        results: [],
        totalCount: 0,
        page: 1,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
