import { NextResponse } from "next/server";
import { streamText } from "ai";
import { getModel } from "@/lib/ai/models";
import { getPreProcessorSystemPrompt } from "@/lib/ai/prompts/presentation";
import { db } from "@/lib/db";
import { papers, synthesisDocuments, synthesisSections } from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";
import { z } from "zod";

const preprocessRequestSchema = z.object({
  sourceType: z.enum(["papers", "document", "text"], {
    error: "sourceType must be one of: papers, document, text",
  }),
  paperIds: z.array(z.number().int().positive()).optional(),
  documentId: z.number().int().positive().optional(),
  rawText: z.string().max(100000, "rawText must not exceed 100000 characters").optional(),
});

interface PreprocessRequest {
  sourceType: "papers" | "document" | "text";
  paperIds?: number[];
  documentId?: number;
  rawText?: string;
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const parsed = preprocessRequestSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const body = parsed.data as PreprocessRequest;
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
    console.error("Preprocess error:", error);
    return NextResponse.json(
      { error: "Preprocessing failed" },
      { status: 500 }
    );
  }
}
