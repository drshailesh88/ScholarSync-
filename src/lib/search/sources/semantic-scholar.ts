import type { UnifiedSearchResult } from "@/types/search";
import { mapS2PublicationType, getEvidenceLevel } from "@/lib/search/evidence-level";
import { resilientFetch } from "@/lib/http/resilient-fetch";
import { createCircuitBreaker } from "@/lib/http/circuit-breaker";

const breaker = createCircuitBreaker({ service: "SemanticScholar", failureThreshold: 5 });

interface S2SearchOptions {
  limit?: number;
  offset?: number;
  yearStart?: number;
  yearEnd?: number;
}

interface S2Paper {
  paperId: string;
  title: string;
  authors: { name: string }[];
  year: number;
  abstract: string | null;
  citationCount: number;
  influentialCitationCount: number;
  referenceCount: number;
  journal: { name: string } | null;
  tldr: { text: string } | null;
  externalIds: { DOI?: string; PubMed?: string } | null;
  url: string;
  publicationTypes: string[] | null;
  openAccessPdf: { url: string } | null;
  fieldsOfStudy: { category: string }[] | null;
  isOpenAccess: boolean;
}

interface S2SearchResponse {
  total: number;
  data: S2Paper[];
}

const S2_FIELDS = "title,authors,year,abstract,citationCount,journal,tldr,externalIds,url,publicationTypes,openAccessPdf,fieldsOfStudy,isOpenAccess,referenceCount,influentialCitationCount";

function mapPaper(paper: S2Paper): UnifiedSearchResult {
  const publicationTypes = paper.publicationTypes || [];
  let studyType = "other";
  for (const pt of publicationTypes) {
    const mapped = mapS2PublicationType(pt);
    if (mapped !== "other") {
      studyType = mapped;
      break;
    }
  }
  const evidence = getEvidenceLevel(studyType);

  return {
    title: paper.title || "",
    authors: paper.authors?.map((a) => a.name) || [],
    journal: paper.journal?.name || "",
    year: paper.year || 0,
    doi: paper.externalIds?.DOI || undefined,
    pmid: paper.externalIds?.PubMed || undefined,
    s2Id: paper.paperId,
    abstract: paper.abstract || undefined,
    tldr: paper.tldr?.text || undefined,
    citationCount: paper.citationCount || 0,
    influentialCitationCount: paper.influentialCitationCount || 0,
    referenceCount: paper.referenceCount || 0,
    publicationTypes,
    fieldsOfStudy: paper.fieldsOfStudy?.map((f) => f.category) || [],
    isOpenAccess: paper.isOpenAccess || false,
    openAccessPdfUrl: paper.openAccessPdf?.url || null,
    studyType,
    evidenceLevel: evidence.level,
    sources: ["semantic_scholar"],
  };
}

export async function searchSemanticScholar(
  query: string,
  options: S2SearchOptions = {}
): Promise<{ results: UnifiedSearchResult[]; total: number }> {
  if (!breaker.canRequest()) {
    console.warn("[SemanticScholar] Circuit open — skipping");
    return { results: [], total: 0 };
  }

  const limit = options.limit || 20;
  const offset = options.offset || 0;

  let url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}&fields=${S2_FIELDS}`;

  if (options.yearStart && options.yearEnd) {
    url += `&year=${options.yearStart}-${options.yearEnd}`;
  } else if (options.yearStart) {
    url += `&year=${options.yearStart}-`;
  } else if (options.yearEnd) {
    url += `&year=-${options.yearEnd}`;
  }

  const headers: Record<string, string> = {};
  if (process.env.SEMANTIC_SCHOLAR_API_KEY) {
    headers["x-api-key"] = process.env.SEMANTIC_SCHOLAR_API_KEY;
  }

  try {
    const res = await resilientFetch(url, { headers }, { service: "SemanticScholar", timeout: 15000, baseDelay: 1000 });
    const data: S2SearchResponse = await res.json();

    const results = (data.data || []).map(mapPaper);
    breaker.onSuccess();
    return { results, total: data.total || 0 };
  } catch (error) {
    breaker.onFailure();
    console.error("[SemanticScholar] Search failed:", error);
    return { results: [], total: 0 };
  }
}
