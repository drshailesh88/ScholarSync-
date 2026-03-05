import { NextRequest, NextResponse } from "next/server";

interface PubMedArticle {
  uid: string;
  title: string;
  authors: Array<{ name: string }>;
  pubdate: string;
  source: string;
  elocationid?: string;
}

interface PubMedSearchResult {
  esearchresult: {
    idlist: string[];
  };
}

interface PubMedSummaryResult {
  result: Record<string, PubMedArticle>;
}

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    // Search PubMed via NCBI E-utilities (free, no API key needed for basic usage)
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmax=10&retmode=json`;
    const searchRes = await fetch(searchUrl);

    if (!searchRes.ok) {
      return NextResponse.json({ error: "PubMed search failed" }, { status: 500 });
    }

    const searchData = (await searchRes.json()) as PubMedSearchResult;
    const ids = searchData.esearchresult.idlist;

    if (ids.length === 0) {
      return NextResponse.json({ results: [] });
    }

    // Fetch details
    const fetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(",")}&retmode=json`;
    const fetchRes = await fetch(fetchUrl);

    if (!fetchRes.ok) {
      return NextResponse.json({ error: "Failed to fetch article details" }, { status: 500 });
    }

    const fetchData = (await fetchRes.json()) as PubMedSummaryResult;

    const results = Object.values(fetchData.result)
      .filter((r): r is PubMedArticle => r.uid !== undefined)
      .map((article) => {
        const yearMatch = article.pubdate.match(/\d{4}/);
        const year = yearMatch ? yearMatch[0] : "";
        const firstAuthor = article.authors?.[0]?.name || "Unknown";

        return {
          id: article.uid,
          title: article.title,
          authors: article.authors?.map((a) => a.name).join(", ") || "",
          year,
          journal: article.source,
          doi: article.elocationid || "",
          citation: `${firstAuthor} et al. ${year}. ${article.source}`,
        };
      });

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Citation search error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
