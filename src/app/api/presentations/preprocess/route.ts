import { NextResponse } from "next/server";
import { z } from "zod";
import { streamText } from "ai";
import { getModel } from "@/lib/ai/models";
import { getPreProcessorSystemPrompt } from "@/lib/ai/prompts/presentation";
import { db } from "@/lib/db";
import { papers, synthesisDocuments, synthesisSections } from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const preprocessSchema = z.object({
  sourceType: z.enum(["papers", "document", "text"]),
  paperIds: z.array(z.number().int().positive()).max(50).optional(),
  documentId: z.number().int().positive().optional(),
  rawText: z.string().max(100000).optional(),
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
        .select()
        .from(papers)
        .where(inArray(papers.id, body.paperIds));

      sourceContent = paperData
        .map(
          (p) =>
            `--- Paper: ${p.title} ---\nAuthors: ${p.authors}\nAbstract: ${p.abstract ?? "N/A"}\nFull Text: ${p.full_text_plain?.slice(0, 8000) ?? "Abstract only"}\n`
        )
        .join("\n\n");
    } else if (body.sourceType === "document" && body.documentId) {
      sourceLabel = "synthesis document";
      const [doc] = await db
        .select()
        .from(synthesisDocuments)
        .where(eq(synthesisDocuments.id, body.documentId));

      if (doc) {
        const sections = await db
          .select()
          .from(synthesisSections)
          .where(eq(synthesisSections.document_id, body.documentId))
          .orderBy(synthesisSections.sort_order);

        sourceContent = `Document: ${doc.title}\n\n${sections
          .map((s) => `## ${s.title}\n${s.plain_text_content ?? ""}`)
          .join("\n\n")}`;
      }
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
      prompt: sourceContent.slice(0, 30000),
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
