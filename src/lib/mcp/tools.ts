/**
 * MCP tool implementations for Manan OS literature search.
 *
 * These are pure functions (input -> structured output) so they can be unit
 * tested without spinning up the MCP transport. The route layer (`/api/mcp`)
 * wires them into `mcp-handler` with zod input schemas and bearer auth.
 */

import { z } from "zod";
import {
  runLiteratureSearch,
  fetchPaperById,
  resolvePaperUrl,
  SEARCH_SOURCES,
  DEFAULT_SOURCES,
  STUDY_TYPES,
  MAX_RESULTS,
  DEFAULT_PER_PAGE,
  type LiteraturePaper,
  type SearchSourceId,
} from "@/lib/search/run-search";

export const searchPapersInputSchema = {
  query: z.string().min(1).describe("Free-text literature search query"),
  maxResults: z
    .number()
    .int()
    .min(1)
    .max(MAX_RESULTS)
    .default(DEFAULT_PER_PAGE)
    .describe(`Number of papers to return (1-${MAX_RESULTS}, default ${DEFAULT_PER_PAGE})`),
  sources: z
    .array(z.enum(SEARCH_SOURCES))
    .optional()
    .describe(
      `Which sources to query. Defaults to [${DEFAULT_SOURCES.join(", ")}]. Options: ${SEARCH_SOURCES.join(", ")}`
    ),
  yearFrom: z.number().int().optional().describe("Earliest publication year (inclusive)"),
  yearTo: z.number().int().optional().describe("Latest publication year (inclusive)"),
  studyTypes: z
    .array(z.enum(STUDY_TYPES))
    .optional()
    .describe("Restrict to specific study types / evidence categories"),
  includeAbstract: z
    .boolean()
    .default(true)
    .describe("Include the full abstract in each result (default true)"),
};

export const fetchPaperInputSchema = {
  doi: z.string().optional().describe("DOI, e.g. 10.1016/j.jacc.2026.02.5063"),
  pmid: z.string().optional().describe("PubMed ID"),
  id: z.string().optional().describe("Internal Manan OS paper id (e.g. pm_12345, s2_<id>)"),
};

export interface McpPaper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  snippet?: string;
  abstract?: string;
  doi?: string;
  pmid?: string;
  nctId?: string;
  url?: string;
  source: string;
  sources: string[];
  studyType?: string;
  evidenceLevel?: string;
  citationCount?: number;
  relevanceScore?: number;
  /** Deterministic one-line rationale for the ranking. */
  whyRelevant?: string;
  /** Missing / low-confidence metadata, surfaced not hidden (never hallucinated). */
  flags?: string[];
  /** Per-signal ranking breakdown (evidence, citation, journal, rrf, relevance). */
  rankingTrace?: import("@/types/search").RankingTrace;
}

function snippetOf(paper: LiteraturePaper): string | undefined {
  if (paper.tldr) return paper.tldr;
  if (paper.abstract) {
    return paper.abstract.length > 300
      ? `${paper.abstract.slice(0, 300).trimEnd()}…`
      : paper.abstract;
  }
  return undefined;
}

export function toMcpPaper(
  paper: LiteraturePaper,
  options: { includeAbstract: boolean }
): McpPaper {
  return {
    id: paper.id,
    title: paper.title,
    authors: paper.authors ?? [],
    year: paper.year,
    journal: paper.journal,
    snippet: snippetOf(paper),
    abstract: options.includeAbstract ? paper.abstract : undefined,
    doi: paper.doi,
    pmid: paper.pmid,
    nctId: paper.nctId,
    url: resolvePaperUrl(paper),
    source: paper.source,
    sources: paper.sources ?? [],
    studyType: paper.studyTypeEnum,
    evidenceLevel: paper.evidenceLevel,
    citationCount: paper.citationCount,
    relevanceScore: paper.rrfScore,
    whyRelevant: paper.whyRelevant,
    flags: paper.flags,
    rankingTrace: paper.rankingTrace,
  };
}

export interface SearchPapersArgs {
  query: string;
  maxResults?: number;
  sources?: SearchSourceId[];
  yearFrom?: number;
  yearTo?: number;
  studyTypes?: string[];
  includeAbstract?: boolean;
  /** Discipline (medicine, computer_science, …) — routes the reranker (MedCPT vs bge). */
  domainId?: string;
}

export async function searchPapers(args: SearchPapersArgs): Promise<{
  query: string;
  count: number;
  total: number;
  sources: string[];
  sourceCounts: Record<string, number>;
  sourceStatuses?: Record<string, { status: string; message?: string }>;
  plan?: { pubmedQuery: string; recency: boolean; trialAcronyms: string[]; wantsTrials: boolean };
  results: McpPaper[];
}> {
  const maxResults = Math.min(MAX_RESULTS, Math.max(1, args.maxResults ?? DEFAULT_PER_PAGE));
  const includeAbstract = args.includeAbstract ?? true;

  const search = await runLiteratureSearch({
    query: args.query,
    sources: args.sources,
    yearFrom: args.yearFrom,
    yearTo: args.yearTo,
    studyTypes: args.studyTypes,
    domainId: args.domainId,
    perPage: maxResults,
    page: 0,
  });

  const results = search.results
    .slice(0, maxResults)
    .map((p) => toMcpPaper(p, { includeAbstract }));

  return {
    query: args.query,
    count: results.length,
    total: search.total,
    sources: args.sources ?? DEFAULT_SOURCES,
    sourceCounts: search.sourceCounts,
    sourceStatuses: search.sourceStatuses,
    plan: search.plan,
    results,
  };
}

export async function fetchPaper(args: {
  doi?: string;
  pmid?: string;
  id?: string;
}): Promise<{ found: boolean; paper?: McpPaper; error?: string }> {
  if (!args.doi && !args.pmid && !args.id) {
    return { found: false, error: "Provide one of: doi, pmid, id" };
  }

  const paper = await fetchPaperById(args);
  if (!paper) {
    return { found: false, error: "Paper not found for the given identifier" };
  }

  return { found: true, paper: toMcpPaper(paper, { includeAbstract: true }) };
}

export function getSearchCapabilities(): {
  sources: { id: string; default: boolean; description: string }[];
  filters: Record<string, string>;
  limits: { maxResults: number; defaultResults: number };
  studyTypes: readonly string[];
  outputFields: string[];
} {
  return {
    sources: SEARCH_SOURCES.map((id) => ({
      id,
      default: DEFAULT_SOURCES.includes(id),
      description: SOURCE_DESCRIPTIONS[id],
    })),
    filters: {
      yearFrom: "Earliest publication year (inclusive)",
      yearTo: "Latest publication year (inclusive)",
      studyTypes: `Restrict to study types: ${STUDY_TYPES.join(", ")}`,
      includeAbstract: "Toggle full abstracts in output",
    },
    limits: { maxResults: MAX_RESULTS, defaultResults: DEFAULT_PER_PAGE },
    studyTypes: STUDY_TYPES,
    outputFields: [
      "title",
      "authors",
      "year",
      "journal",
      "abstract",
      "snippet",
      "doi",
      "pmid",
      "nctId",
      "url",
      "source",
      "sources",
      "studyType",
      "evidenceLevel",
      "citationCount",
      "relevanceScore",
      "whyRelevant",
      "flags",
      "rankingTrace",
    ],
  };
}

const SOURCE_DESCRIPTIONS: Record<SearchSourceId, string> = {
  pubmed: "PubMed / MEDLINE — biomedical literature with MeSH and evidence levels",
  europepmc:
    "Europe PMC — biomedical literature and preprints with native citation counts and open-access links",
  scopus:
    "Scopus (Elsevier) — broad multidisciplinary abstracts and citation counts",
  springer:
    "Springer Nature — journal and book full text with open-access PDF links",
};
