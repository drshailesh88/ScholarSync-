import type { UnifiedSearchResult } from "@/types/search";
import { mapOpenAlexType, getEvidenceLevel } from "@/lib/search/evidence-level";

interface OpenAlexSearchOptions {
  limit?: number;
  page?: number;
  yearStart?: number;
  yearEnd?: number;
  onlyOpenAccess?: boolean;
  type?: string;
}

interface OpenAlexWork {
  id: string;
  doi: string | null;
  title: string;
  display_name: string;
  publication_year: number;
  type: string;
  cited_by_count: number;
  is_oa: boolean;
  open_access: { is_oa: boolean; oa_url: string | null } | null;
  authorships: {
    author: { display_name: string };
    institutions: { display_name: string }[];
  }[];
  primary_location: {
    source: { display_name: string } | null;
  } | null;
  abstract_inverted_index: Record<string, number[]> | null;
  concepts: { display_name: string; level: number; score: number }[];
}

interface OpenAlexResponse {
  meta: { count: number; per_page: number; page: number };
  results: OpenAlexWork[];
}

function reconstructAbstract(
  invertedIndex: Record<string, number[]> | null
): string {
  if (!invertedIndex) return "";
  const words: [string, number][] = [];
  for (const [word, positions] of Object.entries(invertedIndex)) {
    for (const pos of positions) {
      words.push([word, pos]);
    }
  }
  words.sort((a, b) => a[1] - b[1]);
  return words.map((w) => w[0]).join(" ");
}

function mapWork(work: OpenAlexWork): UnifiedSearchResult {
  const studyType = mapOpenAlexType(work.type || "");
  const evidence = getEvidenceLevel(studyType);
  const doi = work.doi ? work.doi.replace("https://doi.org/", "") : undefined;

  return {
    title: work.display_name || work.title || "",
    authors: work.authorships?.map((a) => a.author.display_name) || [],
    journal: work.primary_location?.source?.display_name || "",
    year: work.publication_year || 0,
    doi,
    openalexId: work.id,
    abstract: reconstructAbstract(work.abstract_inverted_index) || undefined,
    citationCount: work.cited_by_count || 0,
    isOpenAccess: work.is_oa || false,
    openAccessPdfUrl: work.open_access?.oa_url || null,
    publicationTypes: work.type ? [work.type] : [],
    concepts: work.concepts
      ?.filter((c) => c.score > 0.3)
      .map((c) => c.display_name) || [],
    studyType,
    evidenceLevel: evidence.level,
    sources: ["openalex"],
  };
}

export async function searchOpenAlex(
  query: string,
  options: OpenAlexSearchOptions = {}
): Promise<{ results: UnifiedSearchResult[]; total: number }> {
  const limit = options.limit || 20;
  const page = options.page || 1;

  let url = `https://api.openalex.org/works?search=${encodeURIComponent(query)}&per_page=${limit}&page=${page}&mailto=contact@scholarsync.com`;

  const filters: string[] = [];
  if (options.yearStart && options.yearEnd) {
    filters.push(`publication_year:${options.yearStart}-${options.yearEnd}`);
  } else if (options.yearStart) {
    filters.push(`publication_year:${options.yearStart}-`);
  } else if (options.yearEnd) {
    filters.push(`publication_year:-${options.yearEnd}`);
  }
  if (options.onlyOpenAccess) {
    filters.push("is_oa:true");
  }
  if (options.type) {
    filters.push(`type:${options.type}`);
  }
  if (filters.length > 0) {
    url += `&filter=${filters.join(",")}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`OpenAlex API error: ${res.status}`);
  }

  const data: OpenAlexResponse = await res.json();
  const results = (data.results || []).map(mapWork);

  return { results, total: data.meta?.count || 0 };
}
