import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

interface PubMedESearchResult {
  esearchresult: {
    idlist: string[];
    count: string;
  };
}

async function fetchWithRetry(
  url: string,
  maxRetries = 3,
  baseDelay = 400
): Promise<Response> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const res = await fetch(url);
    if (res.ok) return res;

    // PubMed returns 429 when rate limited (3 req/sec without API key)
    if (res.status === 429 && attempt < maxRetries) {
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise((r) => setTimeout(r, delay));
      continue;
    }

    if (!res.ok && attempt === maxRetries) {
      throw new Error(`PubMed returned ${res.status} after ${maxRetries + 1} attempts`);
    }
  }
  throw new Error("Unreachable");
}

function extractAbstractFromXml(
  articleNode: Record<string, unknown>
): string {
  const medlineCitation = articleNode?.MedlineCitation as Record<string, unknown> | undefined;
  const article = medlineCitation?.Article as Record<string, unknown> | undefined;
  const abstractNode = article?.Abstract as Record<string, unknown> | undefined;

  if (!abstractNode) return "";

  const abstractText = abstractNode.AbstractText;

  // Single string abstract
  if (typeof abstractText === "string") return abstractText;

  // Structured abstract with labeled sections
  if (Array.isArray(abstractText)) {
    return abstractText
      .map((section: Record<string, unknown> | string) => {
        if (typeof section === "string") return section;
        const label = section?.["@_Label"] as string | undefined;
        const text = section?.["#text"] as string ?? "";
        return label ? `${label}: ${text}` : text;
      })
      .filter(Boolean)
      .join(" ");
  }

  // Object with #text
  if (typeof abstractText === "object" && abstractText !== null) {
    const obj = abstractText as Record<string, unknown>;
    return (obj["#text"] as string) ?? "";
  }

  return "";
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const maxResults = Math.min(
    parseInt(searchParams.get("maxResults") || "10", 10),
    50
  );
  const page = Math.max(parseInt(searchParams.get("page") || "0", 10), 0);

  if (!q) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  try {
    // Step 1: ESearch to get PMIDs
    const retstart = page * maxResults;
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(q)}&retmax=${maxResults}&retstart=${retstart}&retmode=json`;
    const searchRes = await fetchWithRetry(searchUrl);
    const searchData: PubMedESearchResult = await searchRes.json();
    const pmids = searchData.esearchresult.idlist;

    if (pmids.length === 0) {
      return NextResponse.json({
        results: [],
        total: parseInt(searchData.esearchresult.count, 10),
        page,
      });
    }

    // Step 2: EFetch to get full records including abstracts (XML)
    const efetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmids.join(",")}&rettype=xml&retmode=xml`;
    const efetchRes = await fetchWithRetry(efetchUrl);
    const xmlText = await efetchRes.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      isArray: (name) => name === "PubmedArticle" || name === "AbstractText" || name === "Author" || name === "ArticleId",
    });
    const parsed = parser.parse(xmlText);

    const articles: Record<string, unknown>[] = Array.isArray(
      parsed?.PubmedArticleSet?.PubmedArticle
    )
      ? parsed.PubmedArticleSet.PubmedArticle
      : parsed?.PubmedArticleSet?.PubmedArticle
        ? [parsed.PubmedArticleSet.PubmedArticle]
        : [];

    const results = articles
      .map((articleNode: Record<string, unknown>) => {
        const medlineCitation = articleNode?.MedlineCitation as Record<string, unknown> | undefined;
        const pmid = String(
          (medlineCitation?.PMID as Record<string, unknown>)?.["#text"] ??
          medlineCitation?.PMID ?? ""
        );

        const article = medlineCitation?.Article as Record<string, unknown> | undefined;
        const title = (article?.ArticleTitle as string) ?? "";

        // Authors
        const authorList = (article?.AuthorList as Record<string, unknown>)?.Author;
        const authors: string[] = Array.isArray(authorList)
          ? authorList.map((a: Record<string, unknown>) => {
              const last = a.LastName as string ?? "";
              const initials = a.Initials as string ?? "";
              return `${last} ${initials}`.trim();
            }).filter(Boolean)
          : [];

        // Journal
        const journal = (article?.Journal as Record<string, unknown>);
        const journalTitle = (journal?.Title as string) ?? (journal?.ISOAbbreviation as string) ?? "";

        // Year
        const pubDate = (journal?.JournalIssue as Record<string, unknown>)?.PubDate as Record<string, unknown> | undefined;
        const year = parseInt(String(pubDate?.Year ?? "0"), 10);

        // DOI
        const pubmedData = articleNode?.PubmedData as Record<string, unknown> | undefined;
        const articleIdList = (pubmedData?.ArticleIdList as Record<string, unknown>)?.ArticleId;
        let doi = "";
        if (Array.isArray(articleIdList)) {
          const doiEntry = articleIdList.find(
            (id: Record<string, unknown>) => id?.["@_IdType"] === "doi"
          ) as Record<string, unknown> | undefined;
          doi = (doiEntry?.["#text"] as string) ?? "";
        }

        // Abstract
        const abstract = extractAbstractFromXml(articleNode);

        return {
          id: pmid,
          source: "pubmed" as const,
          title: title.replace(/<[^>]*>/g, ""), // Strip HTML tags from titles
          authors,
          journal: journalTitle,
          year,
          doi,
          pmid,
          abstract,
        };
      })
      .filter((r) => r.id);

    return NextResponse.json({
      results,
      total: parseInt(searchData.esearchresult.count, 10),
      page,
    });
  } catch (error) {
    console.error("PubMed search error:", error);
    return NextResponse.json(
      { error: "PubMed search failed" },
      { status: 500 }
    );
  }
}
