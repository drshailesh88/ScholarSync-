import { streamText } from "ai";
import { getModel } from "@/lib/ai/models";
import { advancedRetrieve } from "@/lib/rag/pipeline";
import type { RAGResult } from "@/lib/rag/pipeline";
import { db } from "@/lib/db";
import { papers } from "@/lib/db/schema";
import { inArray } from "drizzle-orm";
import { z } from "zod";

const ragChatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().min(1, "Message content must not be empty"),
      })
    )
    .min(1, "At least one message is required")
    .max(100, "Too many messages"),
  paperIds: z.array(z.number().int().positive()).optional(),
  mode: z.enum(["notebook", "general", "learn"]).optional(),
  ragConfig: z
    .object({
      useMultiQuery: z.boolean().optional(),
      useHyDE: z.boolean().optional(),
      useSelfQuery: z.boolean().optional(),
      useRerank: z.boolean().optional(),
      useCompression: z.boolean().optional(),
      topK: z.number().int().min(1).max(50).optional(),
    })
    .optional(),
});

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const parsed = ragChatRequestSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          error: "Invalid request body",
          details: parsed.error.flatten().fieldErrors,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const { messages, paperIds, mode, ragConfig } = parsed.data;

    // Get the latest user message for retrieval
    const lastUserMsg = [...messages]
      .reverse()
      .find((m) => m.role === "user");
    const query = lastUserMsg?.content || "";

    // Run advanced RAG retrieval
    let contextChunks: RAGResult[] = [];
    const sourcePapers = new Map<
      number,
      { title: string; authors: unknown; year: number | null }
    >();

    if (query && paperIds && paperIds.length > 0) {
      try {
        const retrievedChunks = await advancedRetrieve(query, paperIds, {
          useMultiQuery: true,
          useHyDE: true,
          useSelfQuery: true,
          useRerank: true,
          useCompression: false,
          topK: 8,
          ...(ragConfig as Record<string, boolean | number> | undefined),
        });
        contextChunks = retrievedChunks;

        // Fetch paper metadata for source attribution
        const chunkPaperIds = [
          ...new Set(retrievedChunks.map((c) => c.paper_id)),
        ];
        if (chunkPaperIds.length > 0) {
          const paperRows = await db
            .select({
              id: papers.id,
              title: papers.title,
              authors: papers.authors,
              year: papers.year,
            })
            .from(papers)
            .where(inArray(papers.id, chunkPaperIds));
          for (const p of paperRows) {
            sourcePapers.set(p.id, {
              title: p.title,
              authors: p.authors,
              year: p.year,
            });
          }
        }
      } catch {
        // Fallback to no-context mode if RAG fails
      }
    }

    // Build system prompt with source-grounded context
    let systemPrompt: string;

    if (mode === "learn") {
      systemPrompt = `You are ScholarSync in Learn mode — a Socratic research tutor. Your goal is to help the student develop critical thinking skills about their research sources. Use the retrieved passages to formulate probing questions rather than giving direct answers. Challenge their assumptions, ask them to compare findings across sources, and guide them to discover insights themselves. When referencing sources, still use [1], [2] citation format so the student can follow along.`;
    } else {
      systemPrompt = `You are ScholarSync, an AI research assistant for academic writing. You help students and researchers analyze their papers and answer questions.`;
      if (mode === "notebook") {
        systemPrompt += ` You are in Notebook mode — analyzing uploaded research sources.`;
      }
    }

    if (contextChunks.length > 0) {
      systemPrompt += `\n\nRelevant sources from the user's research papers:\n\n`;

      contextChunks.forEach((chunk, i) => {
        const paper = sourcePapers.get(chunk.paper_id);
        const paperTitle = paper?.title || "Unknown paper";
        const paperAuthors = Array.isArray(paper?.authors)
          ? (paper.authors as string[]).slice(0, 3).join(", ")
          : "Unknown authors";
        const pageInfo = chunk.page_number
          ? ` | Page ${chunk.page_number}`
          : "";
        const sectionInfo = chunk.section_type
          ? ` | Section: ${chunk.section_type}`
          : "";
        const relevance =
          "rerankScore" in chunk
            ? ` | Relevance: ${(
                (chunk as { rerankScore: number }).rerankScore * 100
              ).toFixed(0)}%`
            : "";

        systemPrompt += `[Source ${i + 1}] "${paperTitle}" — ${paperAuthors}${pageInfo}${sectionInfo}${relevance}\n`;
        systemPrompt += `${
          "compressedText" in chunk
            ? (chunk as { compressedText: string }).compressedText
            : chunk.text
        }\n\n`;
      });

      systemPrompt += `CRITICAL RULES:
1. For EVERY factual claim, cite the source number in brackets like [1] or [1][2].
2. NEVER make unsourced claims. If you don't have a source, say "Based on general knowledge" or "I don't have a specific source for this."
3. If sources conflict, cite both and note the disagreement.
4. When quoting numbers (HR, CI, p-values), always cite the exact source.
5. End your response with a "Sources:" section listing all cited references.`;
    }

    // Stream the response
    const result = streamText({
      model: getModel(),
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    // Return streaming response with source metadata in headers
    const response = result.toTextStreamResponse();

    const sourceMetadata = contextChunks.map((chunk, i) => {
      const paper = sourcePapers.get(chunk.paper_id);
      return {
        sourceIndex: i + 1,
        paperId: chunk.paper_id,
        paperTitle: paper?.title || "Unknown",
        paperAuthors: paper?.authors || [],
        pageNumber: chunk.page_number,
        sectionType: chunk.section_type,
        chunkId: chunk.id,
      };
    });

    return new Response(response.body, {
      headers: {
        ...Object.fromEntries(response.headers.entries()),
        "X-RAG-Sources": JSON.stringify(sourceMetadata),
      },
    });
  } catch (error) {
    console.error("RAG chat error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process RAG chat" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
