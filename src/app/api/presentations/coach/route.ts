import { NextResponse } from "next/server";
import { generateText } from "ai";
import { getModel } from "@/lib/ai/models";
import { getCoachSystemPrompt } from "@/lib/ai/prompts/presentation";
import { saveCoachEvaluation } from "@/lib/actions/presentations";
import type { AudienceType, ContentBlock, CoachEvaluation } from "@/types/presentation";

interface CoachRequest {
  deckId: number;
  audienceType: AudienceType;
  slides: {
    title?: string | null;
    subtitle?: string | null;
    layout?: string | null;
    contentBlocks?: ContentBlock[];
    speakerNotes?: string | null;
  }[];
}

export async function POST(req: Request) {
  try {
    const body: CoachRequest = await req.json();

    if (!body.deckId || !body.slides?.length) {
      return NextResponse.json(
        { error: "deckId and slides are required" },
        { status: 400 }
      );
    }

    const systemPrompt = getCoachSystemPrompt(body.audienceType ?? "general");

    const slideSummary = body.slides
      .map(
        (s, i) =>
          `Slide ${i + 1}: "${s.title ?? "Untitled"}" (layout: ${s.layout ?? "unknown"})\n` +
          `Content: ${JSON.stringify(s.contentBlocks ?? [])}\n` +
          `Speaker Notes: ${s.speakerNotes ?? "None"}`
      )
      .join("\n\n");

    const { text } = await generateText({
      model: getModel(),
      system: systemPrompt,
      prompt: `Evaluate this ${body.slides.length}-slide presentation:\n\n${slideSummary}`,
    });

    const cleanText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const evaluation: CoachEvaluation = JSON.parse(cleanText);

    // Save to database
    await saveCoachEvaluation(body.deckId, evaluation);

    return NextResponse.json(evaluation);
  } catch (error) {
    console.error("Coach error:", error);
    return NextResponse.json(
      { error: "Coach evaluation failed" },
      { status: 500 }
    );
  }
}
