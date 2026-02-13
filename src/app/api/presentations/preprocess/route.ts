import { NextResponse } from "next/server";
import { streamText } from "ai";
import { getModel } from "@/lib/ai/models";
import { getPreProcessorSystemPrompt } from "@/lib/ai/prompts/presentation";
import { db } from "@/lib/db";
import { papers, synthesisDocuments, synthesisSections } from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";

interface PreprocessRequest {
  sourceType: "papers" | "document" | "text";
  paperIds?: number[];
  documentId?: number;
  rawText?: string;
}

export async function POST(req: Request) {
  try {
    const body: PreprocessRequest = await req.json();
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
