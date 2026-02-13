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
  externalIds: { DOI?: string; PubMed?: string; ArXiv?: string } | null;
  url: string;
}

interface S2SearchResponse {
  total: number;
  offset: number;
  next?: number;
  data: S2Paper[];
}

async function fetchWithRetry(
  url: string,
  maxRetries = 3,
  baseDelay = 1000
): Promise<Response> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const res = await fetch(url);
    if (res.ok) return res;

    if (res.status === 429 && attempt < maxRetries) {
      // Respect Retry-After header if present
      const retryAfter = res.headers.get("Retry-After");
      const delay = retryAfter
        ? parseInt(retryAfter, 10) * 1000
        : baseDelay * Math.pow(2, attempt);
      await new Promise((r) => setTimeout(r, delay));
      continue;
    }

    if (!res.ok && attempt === maxRetries) {
      throw new Error(
        `Semantic Scholar returned ${res.status} after ${maxRetries + 1} attempts`
      );
    }
  }
  throw new Error("Unreachable");
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const limit = Math.min(
    parseInt(searchParams.get("limit") || "10", 10),
    100
  );
  const offset = Math.max(
    parseInt(searchParams.get("offset") || "0", 10),
    0
  );

  if (!q) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  try {
    const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(q)}&limit=${limit}&offset=${offset}&fields=title,authors,year,abstract,citationCount,journal,tldr,externalIds,url`;
    const res = await fetchWithRetry(url);
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
      pmid: paper.externalIds?.PubMed || "",
      semanticScholarId: paper.paperId,
    }));

    return NextResponse.json({
      results,
      total: data.total || 0,
      offset,
      nextOffset: data.next,
    });
  } catch (error) {
    console.error("Semantic Scholar search error:", error);
    return NextResponse.json(
      { error: "Semantic Scholar search failed" },
      { status: 500 }
    );
  }
}
