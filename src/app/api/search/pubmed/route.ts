import { NextResponse } from "next/server";
import { searchPubMed } from "@/lib/search/sources/pubmed";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const maxResults = parseInt(searchParams.get("maxResults") || "20", 10);
  const page = parseInt(searchParams.get("page") || "0", 10);
  const yearStart = searchParams.get("yearStart")
    ? parseInt(searchParams.get("yearStart")!, 10)
    : undefined;
  const yearEnd = searchParams.get("yearEnd")
    ? parseInt(searchParams.get("yearEnd")!, 10)
    : undefined;

  if (!q) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  try {
    const data = await searchPubMed(q, { maxResults, page, yearStart, yearEnd });
    return NextResponse.json(data);
  } catch (error) {
    console.error("PubMed search error:", error);
    return NextResponse.json(
      { error: "PubMed search failed" },
      { status: 500 }
    );
  }
}
