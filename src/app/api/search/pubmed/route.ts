import { NextResponse } from "next/server";

interface PubMedESearchResult {
  esearchresult: {
    idlist: string[];
    count: string;
  };
}

interface PubMedSummaryResult {
  result: Record<
    string,
    {
      uid: string;
      title: string;
      authors: { name: string }[];
      source: string;
      pubdate: string;
      elocationid: string;
      articleids: { idtype: string; value: string }[];
    }
  >;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const maxResults = parseInt(searchParams.get("maxResults") || "10", 10);

  if (!q) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
  }

  try {
    // Step 1: ESearch to get PMIDs
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(q)}&retmax=${maxResults}&retmode=json`;
    const searchRes = await fetch(searchUrl);
    const searchData: PubMedESearchResult = await searchRes.json();
    const pmids = searchData.esearchresult.idlist;

    if (pmids.length === 0) {
      return NextResponse.json({ results: [], total: 0 });
    }

    // Step 2: ESummary to get details
    const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${pmids.join(",")}&retmode=json`;
    const summaryRes = await fetch(summaryUrl);
    const summaryData: PubMedSummaryResult = await summaryRes.json();

    const results = pmids.map((pmid) => {
      const article = summaryData.result[pmid];
      if (!article) return null;

      const doi = article.articleids?.find((id) => id.idtype === "doi")?.value || article.elocationid?.replace("doi: ", "") || "";
      const year = parseInt(article.pubdate?.split(" ")[0] || "0", 10);

      return {
        id: pmid,
        source: "pubmed" as const,
        title: article.title || "",
        authors: article.authors?.map((a) => a.name) || [],
        journal: article.source || "",
        year,
        doi,
        pmid,
      };
    }).filter(Boolean);

    return NextResponse.json({
      results,
      total: parseInt(searchData.esearchresult.count, 10),
    });
  } catch (error) {
    console.error("PubMed search error:", error);
    return NextResponse.json({ error: "PubMed search failed" }, { status: 500 });
  }
}
