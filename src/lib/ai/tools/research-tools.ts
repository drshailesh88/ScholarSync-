/* eslint-disable @typescript-eslint/no-explicit-any */
import { tool } from "ai";
import { z } from "zod";

/**
 * Research tools for the AI agent (Research Copilot, Deep Research).
 *
 * These wrap PubMed + Semantic Scholar APIs as Vercel AI SDK tools,
 * giving the agent the ability to search literature, fetch paper details,
 * and explore citation networks autonomously.
 */

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------
async function getXmlParser() {
  const { XMLParser } = await import("fast-xml-parser");
  return new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    isArray: (name: string) =>
      name === "PubmedArticle" ||
      name === "AbstractText" ||
      name === "Author" ||
      name === "ArticleId",
  });
}

function parsePubMedArticle(node: any) {
  const mc = node?.MedlineCitation;
  const art = mc?.Article;
  const pmid = String(mc?.PMID?.["#text"] ?? mc?.PMID ?? "");
  const title = String(art?.ArticleTitle ?? "").replace(/<[^>]*>/g, "");

  const authorList = art?.AuthorList?.Author;
  const authors: string[] = Array.isArray(authorList)
    ? authorList
        .map((a: any) => `${a.LastName || ""} ${a.Initials || ""}`.trim())
        .filter(Boolean)
    : [];

  const absNode = art?.Abstract?.AbstractText;
  let abstract = "";
  if (typeof absNode === "string") abstract = absNode;
  else if (Array.isArray(absNode))
    abstract = absNode
      .map((s: any) =>
        typeof s === "string"
          ? s
          : `${s["@_Label"] || ""}: ${s["#text"] || ""}`
      )
      .join(" ");

  const idList = node?.PubmedData?.ArticleIdList?.ArticleId;
  const doi = Array.isArray(idList)
    ? (idList.find((id: any) => id?.["@_IdType"] === "doi")?.["#text"] ?? "")
    : "";

  const journal =
    art?.Journal?.Title ?? art?.Journal?.ISOAbbreviation ?? "";
  const year = parseInt(
    String(art?.Journal?.JournalIssue?.PubDate?.Year ?? "0"),
    10
  );

  return { pmid, title, authors, abstract, doi, journal, year };
}

// ---------------------------------------------------------------------------
// Parameter schemas (defined separately for reuse in type annotations)
// ---------------------------------------------------------------------------
const searchPubMedParams = z.object({
  query: z
    .string()
    .describe("Search query (supports PubMed syntax like MeSH terms)"),
  maxResults: z
    .number()
    .min(1)
    .max(50)
    .default(10)
    .describe("Maximum number of results to return"),
  minDate: z.string().optional().describe("Start date filter (YYYY/MM/DD)"),
  maxDate: z.string().optional().describe("End date filter (YYYY/MM/DD)"),
});

const searchS2Params = z.object({
  query: z.string().describe("Natural language search query"),
  limit: z
    .number()
    .min(1)
    .max(100)
    .default(10)
    .describe("Maximum number of results"),
  minYear: z.number().optional().describe("Minimum publication year"),
  maxYear: z.number().optional().describe("Maximum publication year"),
});

const paperDetailsParams = z.object({
  identifier: z.string().describe("DOI, PMID, or Semantic Scholar paper ID"),
  identifierType: z
    .enum(["doi", "pmid", "s2id"])
    .describe("Type of identifier"),
});

const citationNetworkParams = z.object({
  paperId: z
    .string()
    .describe(
      "Semantic Scholar paper ID, DOI (prefixed with DOI:), or PMID (prefixed with PMID:)"
    ),
  direction: z
    .enum(["citations", "references"])
    .describe("'citations' for forward snowball, 'references' for backward"),
  limit: z.number().min(1).max(100).default(20),
});

const savePaperParams = z.object({
  title: z.string(),
  authors: z.array(z.string()).optional(),
  journal: z.string().optional(),
  year: z.number().optional(),
  doi: z.string().optional(),
  abstract: z.string().optional(),
  pmid: z.string().optional(),
  semanticScholarId: z.string().optional(),
  citationCount: z.number().optional(),
  tldr: z.string().optional(),
  collection: z.string().optional().default("All Papers"),
});

// ---------------------------------------------------------------------------
// Tool: Search PubMed
// ---------------------------------------------------------------------------
export const searchPubMed = tool({
  description:
    "Search PubMed for biomedical papers. Returns titles, authors, abstracts, DOIs, and PMIDs. Use for clinical/medical literature.",
  inputSchema: searchPubMedParams,
  execute: async (args: z.infer<typeof searchPubMedParams>) => {
    let term = args.query;
    if (args.minDate || args.maxDate) {
      const min = args.minDate || "1900/01/01";
      const max = args.maxDate || "3000/12/31";
      term += ` AND ("${min}"[Date - Publication] : "${max}"[Date - Publication])`;
    }

    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(term)}&retmax=${args.maxResults}&retmode=json`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    const pmids: string[] = searchData.esearchresult?.idlist || [];

    if (pmids.length === 0) {
      return {
        results: [] as ReturnType<typeof parsePubMedArticle>[],
        total: parseInt(searchData.esearchresult?.count || "0", 10),
      };
    }

    const parser = await getXmlParser();
    const efetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmids.join(",")}&rettype=xml&retmode=xml`;
    const efetchRes = await fetch(efetchUrl);
    const xmlText = await efetchRes.text();
    const parsed = parser.parse(xmlText);

    const articles = Array.isArray(parsed?.PubmedArticleSet?.PubmedArticle)
      ? parsed.PubmedArticleSet.PubmedArticle
      : parsed?.PubmedArticleSet?.PubmedArticle
        ? [parsed.PubmedArticleSet.PubmedArticle]
        : [];

    return {
      results: articles.map(parsePubMedArticle),
      total: parseInt(searchData.esearchresult?.count || "0", 10),
    };
  },
});

// ---------------------------------------------------------------------------
// Tool: Search Semantic Scholar
// ---------------------------------------------------------------------------
export const searchSemanticScholar = tool({
  description:
    "Search Semantic Scholar for academic papers. Returns titles, abstracts, TL;DR summaries, citation counts, and DOIs. Broader coverage than PubMed.",
  inputSchema: searchS2Params,
  execute: async (args: z.infer<typeof searchS2Params>) => {
    let url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(args.query)}&limit=${args.limit}&fields=title,authors,year,abstract,citationCount,journal,tldr,externalIds,url`;
    if (args.minYear && args.maxYear)
      url += `&year=${args.minYear}-${args.maxYear}`;
    else if (args.minYear) url += `&year=${args.minYear}-`;
    else if (args.maxYear) url += `&year=-${args.maxYear}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Semantic Scholar returned ${res.status}`);

    const data = await res.json();
    const results = (data.data || []).map((paper: any) => ({
      semanticScholarId: paper.paperId,
      title: paper.title || "",
      authors: paper.authors?.map((a: any) => a.name) || [],
      year: paper.year || 0,
      abstract: paper.abstract || "",
      citationCount: paper.citationCount || 0,
      journal: paper.journal?.name || "",
      tldr: paper.tldr?.text || "",
      doi: paper.externalIds?.DOI || "",
      pmid: paper.externalIds?.PubMed || "",
      url: paper.url || "",
    }));

    return { results, total: data.total || 0 };
  },
});

// ---------------------------------------------------------------------------
// Tool: Get Paper Details (by DOI or PMID)
// ---------------------------------------------------------------------------
export const getPaperDetails = tool({
  description:
    "Fetch detailed information about a specific paper using its DOI, PMID, or Semantic Scholar ID.",
  inputSchema: paperDetailsParams,
  execute: async (args: z.infer<typeof paperDetailsParams>) => {
    let s2Query: string;
    switch (args.identifierType) {
      case "doi":
        s2Query = `DOI:${args.identifier}`;
        break;
      case "pmid":
        s2Query = `PMID:${args.identifier}`;
        break;
      case "s2id":
        s2Query = args.identifier;
        break;
    }

    const url = `https://api.semanticscholar.org/graph/v1/paper/${encodeURIComponent(s2Query)}?fields=title,authors,year,abstract,citationCount,referenceCount,journal,tldr,externalIds,url,references.title,references.authors,references.year,references.externalIds,citations.title,citations.authors,citations.year,citations.externalIds`;
    const res = await fetch(url);

    if (!res.ok) {
      return {
        found: false as const,
        error: `Paper not found (${res.status})`,
      };
    }

    const paper = await res.json();
    const mapPaper = (p: any) => ({
      title: (p.title || "") as string,
      authors: (p.authors?.map((a: any) => a.name) || []) as string[],
      year: p.year as number | null,
      doi: (p.externalIds?.DOI || "") as string,
    });

    return {
      found: true as const,
      title: paper.title as string,
      authors: (paper.authors?.map((a: any) => a.name) || []) as string[],
      year: paper.year as number,
      abstract: (paper.abstract || "") as string,
      citationCount: (paper.citationCount || 0) as number,
      referenceCount: (paper.referenceCount || 0) as number,
      journal: (paper.journal?.name || "") as string,
      tldr: (paper.tldr?.text || "") as string,
      doi: (paper.externalIds?.DOI || "") as string,
      pmid: (paper.externalIds?.PubMed || "") as string,
      semanticScholarId: paper.paperId as string,
      topCitations: (paper.citations || []).slice(0, 10).map(mapPaper),
      topReferences: (paper.references || []).slice(0, 10).map(mapPaper),
    };
  },
});

// ---------------------------------------------------------------------------
// Tool: Citation Network (for Snowball search)
// ---------------------------------------------------------------------------
export const exploreCitationNetwork = tool({
  description:
    "Explore the citation network around a paper. Find papers that cite it (forward snowball) or papers it references (backward snowball). Useful for systematic reviews.",
  inputSchema: citationNetworkParams,
  execute: async (args: z.infer<typeof citationNetworkParams>) => {
    const url = `https://api.semanticscholar.org/graph/v1/paper/${encodeURIComponent(args.paperId)}/${args.direction}?fields=title,authors,year,abstract,citationCount,externalIds&limit=${args.limit}`;
    const res = await fetch(url);

    if (!res.ok) {
      return {
        direction: args.direction,
        paperCount: 0,
        papers: [] as Array<Record<string, unknown>>,
        error: `Failed to fetch ${args.direction} (${res.status})`,
      };
    }

    const data = await res.json();
    const papers = (data.data || []).map((item: any) => {
      const p = item.citedPaper || item.citingPaper || item;
      return {
        title: (p.title || "") as string,
        authors: (p.authors?.map((a: any) => a.name) || []) as string[],
        year: p.year as number | null,
        abstract: (p.abstract || "") as string,
        citationCount: (p.citationCount || 0) as number,
        doi: (p.externalIds?.DOI || "") as string,
        pmid: (p.externalIds?.PubMed || "") as string,
        semanticScholarId: (p.paperId || "") as string,
      };
    });

    return {
      direction: args.direction,
      paperCount: papers.length,
      papers,
    };
  },
});

// ---------------------------------------------------------------------------
// Tool: Save Paper to Library
// ---------------------------------------------------------------------------
export const savePaperToLibrary = tool({
  description:
    "Save a paper to the user's ScholarSync library. Use this when the user asks you to save or bookmark a paper from the search results.",
  inputSchema: savePaperParams,
  execute: async (params: z.infer<typeof savePaperParams>) => {
    const { savePaper } = await import("@/lib/actions/papers");
    const paperId = await savePaper({
      title: params.title,
      authors: params.authors,
      journal: params.journal,
      year: params.year,
      doi: params.doi,
      abstract: params.abstract,
      source: "deep_research",
      pubmed_id: params.pmid,
      semantic_scholar_id: params.semanticScholarId,
      citation_count: params.citationCount,
      tldr: params.tldr,
      collection: params.collection,
    });
    return { saved: true, paperId };
  },
});

// ---------------------------------------------------------------------------
// Export all tools as a single object for use with streamText()
// ---------------------------------------------------------------------------
export const researchTools = {
  searchPubMed,
  searchSemanticScholar,
  getPaperDetails,
  exploreCitationNetwork,
  savePaperToLibrary,
};
