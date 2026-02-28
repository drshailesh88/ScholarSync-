import { NextResponse } from "next/server";
import { z } from "zod";
import { streamText } from "ai";
import { getModel } from "@/lib/ai/models";
import { getPreProcessorSystemPrompt } from "@/lib/ai/prompts/presentation";
import { db } from "@/lib/db";
import { papers, synthesisDocuments, synthesisSections, deepResearchSessions } from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const preprocessSchema = z.object({
  sourceType: z.enum(["papers", "document", "text", "deep_research", "references"]),
  paperIds: z.array(z.number().int().positive()).max(50).optional(),
  documentId: z.number().int().positive().optional(),
  deepResearchSessionId: z.number().int().positive().optional(),
  rawText: z.string().max(500000).optional(),
  /** Formatted reference content (used when sourceType is "references") */
  referenceContent: z.string().max(500000).optional(),
});

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    // Authentication
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limiting
    const rateLimitResponse = await checkRateLimit(userId, "presentations", RATE_LIMITS.ai);
    if (rateLimitResponse) return rateLimitResponse;

    // Validation
    const parseResult = preprocessSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const body = parseResult.data;

    let sourceContent = "";
    let sourceLabel = "content";

    // Gather source material
    if (body.sourceType === "papers" && body.paperIds?.length) {
      sourceLabel = "research papers";
      const paperData = await db
        .select({
          title: papers.title,
          authors: papers.authors,
          abstract: papers.abstract,
          full_text_plain: papers.full_text_plain,
        })
        .from(papers)
        .where(inArray(papers.id, body.paperIds));

      sourceContent = paperData
        .map(
          (p) =>
            `--- Paper: ${p.title} ---\nAuthors: ${p.authors}\nAbstract: ${p.abstract ?? "N/A"}\nFull Text: ${p.full_text_plain?.slice(0, 15000) ?? "Abstract only"}\n`
        )
        .join("\n\n");
    } else if (body.sourceType === "document" && body.documentId) {
      sourceLabel = "synthesis document";
      const [doc] = await db
        .select({ id: synthesisDocuments.id, title: synthesisDocuments.title })
        .from(synthesisDocuments)
        .where(eq(synthesisDocuments.id, body.documentId));

      if (doc) {
        const sections = await db
          .select({
            title: synthesisSections.title,
            plain_text_content: synthesisSections.plain_text_content,
            sort_order: synthesisSections.sort_order,
          })
          .from(synthesisSections)
          .where(eq(synthesisSections.document_id, body.documentId))
          .orderBy(synthesisSections.sort_order);

        sourceContent = `Document: ${doc.title}\n\n${sections
          .map((s) => `## ${s.title}\n${s.plain_text_content ?? ""}`)
          .join("\n\n")}`;
      }
    } else if (body.sourceType === "deep_research" && body.deepResearchSessionId) {
      const [session] = await db
        .select({
          originalQuery: deepResearchSessions.originalQuery,
          finalReport: deepResearchSessions.finalReport,
          keyFindings: deepResearchSessions.keyFindings,
        })
        .from(deepResearchSessions)
        .where(eq(deepResearchSessions.id, body.deepResearchSessionId));

      if (session) {
        sourceLabel = "deep research synthesis";
        sourceContent = `Research Query: ${session.originalQuery}\n\nFinal Report:\n${session.finalReport ?? ""}\n\nKey Findings:\n${JSON.stringify(session.keyFindings)}`;
      }
    } else if (body.sourceType === "references" && (body.referenceContent || body.rawText)) {
      sourceLabel = "imported reference library";
      sourceContent = body.referenceContent || body.rawText || "";
    } else if (body.sourceType === "text" && body.rawText) {
      sourceLabel = "text";
      sourceContent = body.rawText;
    }

    if (!sourceContent.trim()) {
      return NextResponse.json(
        { error: "No source content provided" },
        { status: 400 }
      );
    }

    const result = streamText({
      model: getModel(),
      system: getPreProcessorSystemPrompt(sourceLabel),
      prompt: sourceContent.slice(0, 60000),
    });

    return result.toTextStreamResponse();
  } catch (error) {
    log.error("Preprocess error", error);
    return NextResponse.json(
      { error: "Preprocessing failed" },
      { status: 500 }
    );
  }
}
