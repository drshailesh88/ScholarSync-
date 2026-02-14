import { streamText, tool, stepCountIs } from "ai";
import { getModel } from "@/lib/ai/models";
import { z } from "zod";
import { searchPubMed } from "@/lib/search/sources/pubmed";
import { searchSemanticScholar, getSemanticScholarPaper } from "@/lib/search/sources/semantic-scholar";
import { searchOpenAlex } from "@/lib/search/sources/openalex";
import { getRecommendationsForPaper } from "@/lib/search/sources/s2-recommendations";
import { savePaper } from "@/lib/actions/papers";
import { getCurrentUserId } from "@/lib/auth";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a medical research librarian AI. You conduct systematic literature searches.

PHASE 1 - BROAD SWEEP (3-4 tool calls):
- Search PubMed with MeSH-optimized queries
- Search Semantic Scholar with natural language variants
- Search OpenAlex for broader coverage
- Try at least 2 different query formulations per source

PHASE 2 - ASSESS COVERAGE (analyze results):
- Review what you've found. What aspects of the question are NOT covered?
- Which landmark studies are missing?
- Are there gaps in evidence levels (e.g., all reviews but no RCTs)?

PHASE 3 - TARGETED SEARCH (2-3 tool calls):
- Search for gaps identified in Phase 2
- Use findSimilarPapers on the most relevant papers from Phase 1

PHASE 4 - SYNTHESIZE:
- Rank papers by relevance to the original question
- Note where evidence is strong vs. weak
- Identify conflicting findings
- Suggest which papers to save

Stop when: new searches return mostly papers already found, OR all key aspects covered.

Always cite paper titles and key findings when discussing results. Format recommendations clearly.`;

export async function POST(req: Request) {
  try {
    await getCurrentUserId();

    const body = await req.json();
    const { messages, context } = body as {
      messages: { role: "user" | "assistant"; content: string }[];
      context?: { savedPaperIds?: string[] };
    };

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    const result = streamText({
      model: getModel(),
      system:
        SYSTEM_PROMPT +
        (context?.savedPaperIds?.length
          ? `\n\nThe user has ${context.savedPaperIds.length} papers saved in their library.`
          : ""),
      messages,
      stopWhen: stepCountIs(12),
      tools: {
        searchPubMed: tool({
          description:
            "Search PubMed with a query. Use MeSH terms and Boolean operators for best results.",
          inputSchema: z.object({
            query: z.string().describe("PubMed search query"),
            maxResults: z
              .number()
              .default(10)
              .describe("Max results to return"),
            page: z.number().default(0).describe("Page number (0-indexed)"),
            yearStart: z
              .number()
              .optional()
              .describe("Filter by start year"),
            yearEnd: z.number().optional().describe("Filter by end year"),
          }),
          execute: async ({ query, maxResults, page, yearStart, yearEnd }) => {
            const data = await searchPubMed(query, {
              maxResults,
              page,
              yearStart,
              yearEnd,
            });
            return {
              total: data.total,
              results: data.results.slice(0, maxResults).map((r) => ({
                title: r.title,
                authors: r.authors.slice(0, 3),
                year: r.year,
                journal: r.journal,
                doi: r.doi,
                pmid: r.pmid,
                abstract: r.abstract?.slice(0, 300),
                studyType: r.studyType,
                evidenceLevel: r.evidenceLevel,
              })),
            };
          },
        }),

        searchSemanticScholar: tool({
          description:
            "Search Semantic Scholar with natural language. Good for conceptual/semantic searches.",
          inputSchema: z.object({
            query: z.string().describe("Natural language search query"),
            limit: z
              .number()
              .default(10)
              .describe("Max results to return"),
            offset: z.number().default(0).describe("Result offset"),
            yearStart: z
              .number()
              .optional()
              .describe("Filter by start year"),
            yearEnd: z.number().optional().describe("Filter by end year"),
          }),
          execute: async ({ query, limit, offset, yearStart, yearEnd }) => {
            const data = await searchSemanticScholar(query, {
              limit,
              offset,
              yearStart,
              yearEnd,
            });
            return {
              total: data.total,
              results: data.results.slice(0, limit).map((r) => ({
                title: r.title,
                authors: r.authors.slice(0, 3),
                year: r.year,
                journal: r.journal,
                doi: r.doi,
                s2Id: r.s2Id,
                citationCount: r.citationCount,
                tldr: r.tldr,
                studyType: r.studyType,
                evidenceLevel: r.evidenceLevel,
              })),
            };
          },
        }),

        searchOpenAlex: tool({
          description:
            "Search OpenAlex for broader academic coverage including preprints.",
          inputSchema: z.object({
            query: z.string().describe("Search query"),
            limit: z.number().default(10).describe("Max results"),
            page: z
              .number()
              .default(1)
              .describe("Page number (1-indexed)"),
            yearStart: z
              .number()
              .optional()
              .describe("Filter by start year"),
            yearEnd: z.number().optional().describe("Filter by end year"),
            onlyOpenAccess: z
              .boolean()
              .optional()
              .describe("Only return open access papers"),
          }),
          execute: async ({
            query,
            limit,
            page,
            yearStart,
            yearEnd,
            onlyOpenAccess,
          }) => {
            const data = await searchOpenAlex(query, {
              limit,
              page,
              yearStart,
              yearEnd,
              onlyOpenAccess,
            });
            return {
              total: data.total,
              results: data.results.slice(0, limit).map((r) => ({
                title: r.title,
                authors: r.authors.slice(0, 3),
                year: r.year,
                journal: r.journal,
                doi: r.doi,
                citationCount: r.citationCount,
                isOpenAccess: r.isOpenAccess,
                concepts: r.concepts?.slice(0, 5),
              })),
            };
          },
        }),

        getPaperDetails: tool({
          description:
            "Fetch full metadata for a paper by DOI, PMID, or Semantic Scholar ID.",
          inputSchema: z.object({
            doi: z.string().optional().describe("Paper DOI"),
            pmid: z.string().optional().describe("PubMed ID"),
            s2Id: z
              .string()
              .optional()
              .describe("Semantic Scholar paper ID"),
          }),
          execute: async ({ doi, pmid, s2Id }) => {
            if (s2Id) {
              const paper = await getSemanticScholarPaper(s2Id);
              return paper || { error: "Paper not found" };
            }
            if (doi) {
              const paper = await getSemanticScholarPaper(`DOI:${doi}`);
              return paper || { error: "Paper not found" };
            }
            if (pmid) {
              const paper = await getSemanticScholarPaper(`PMID:${pmid}`);
              if (paper) return paper;
              // Fallback to PubMed search if S2 doesn't have this PMID
              const data = await searchPubMed(pmid, { maxResults: 1 });
              return data.results[0] || { error: "Paper not found" };
            }
            return { error: "Provide at least one identifier" };
          },
        }),

        findSimilarPapers: tool({
          description:
            "Find papers similar to a given paper using Semantic Scholar recommendations.",
          inputSchema: z.object({
            paperId: z.string().describe("Semantic Scholar paper ID"),
            limit: z
              .number()
              .default(5)
              .describe("Number of similar papers"),
          }),
          execute: async ({ paperId, limit }) => {
            const results = await getRecommendationsForPaper(paperId, limit);
            return results.map((r) => ({
              title: r.title,
              authors: r.authors.slice(0, 3),
              year: r.year,
              journal: r.journal,
              doi: r.doi,
              s2Id: r.s2Id,
              citationCount: r.citationCount,
              tldr: r.tldr,
            }));
          },
        }),

        savePaperToLibrary: tool({
          description: "Save a paper to the user's library.",
          inputSchema: z.object({
            title: z.string(),
            authors: z.array(z.string()).optional(),
            doi: z.string().optional(),
            pmid: z.string().optional(),
            s2Id: z.string().optional(),
            abstract: z.string().optional(),
            year: z.number().optional(),
            journal: z.string().optional(),
            source: z
              .string()
              .describe("Source: pubmed, semantic_scholar, or openalex"),
          }),
          execute: async (params) => {
            const paperId = await savePaper({
              title: params.title,
              authors: params.authors,
              doi: params.doi,
              abstract: params.abstract,
              year: params.year,
              journal: params.journal,
              source: params.source as
                | "pubmed"
                | "semantic_scholar"
                | "openalex",
              pubmed_id: params.pmid,
              semantic_scholar_id: params.s2Id,
            });
            return { success: true, paperId };
          },
        }),
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Research agent error:", error);
    return NextResponse.json(
      { error: "Research agent failed" },
      { status: 500 }
    );
  }
}
