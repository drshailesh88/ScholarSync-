import { NextResponse } from "next/server";

interface S2Paper {
  paperId: string;
  title: string;
  authors: { name: string }[];
  year: number;
  abstract: string | null;
  citationCount: number;
  journal: { name: string } | null;
  tldr: { text: string } | null;
  externalIds: { DOI?: string } | null;
  url: string;
}

interface S2SearchResponse {
  total: number;
  data: S2Paper[];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  if (!q) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
  }

  try {
    const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(q)}&limit=${limit}&fields=title,authors,year,abstract,citationCount,journal,tldr,externalIds,url`;
    const res = await fetch(url);

    if (res.status === 429) {
      return NextResponse.json(
        { error: "Semantic Scholar rate limit reached. Please try again in a moment." },
        { status: 429 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: `Semantic Scholar returned ${res.status}` },
        { status: 502 }
      );
    }

    const data: S2SearchResponse = await res.json();

    const results = (data.data || []).map((paper) => ({
      id: paper.paperId,
      source: "semantic_scholar" as const,
      title: paper.title || "",
      authors: paper.authors?.map((a) => a.name) || [],
      journal: paper.journal?.name || "",
      year: paper.year || 0,
      abstract: paper.abstract || "",
      citationCount: paper.citationCount || 0,
      tldr: paper.tldr?.text || "",
      doi: paper.externalIds?.DOI || "",
    }));

    return NextResponse.json({ results, total: data.total || 0 });
  } catch (error) {
    console.error("Semantic Scholar search error:", error);
    return NextResponse.json({ error: "Semantic Scholar search failed" }, { status: 500 });
  }
}
