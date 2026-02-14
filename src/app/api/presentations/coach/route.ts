import { NextResponse } from "next/server";
import { generateText } from "ai";
import { getModel } from "@/lib/ai/models";
import { getCoachSystemPrompt } from "@/lib/ai/prompts/presentation";
import { saveCoachEvaluation } from "@/lib/actions/presentations";
import type { AudienceType, ContentBlock, CoachEvaluation } from "@/types/presentation";
import { z } from "zod";

const coachContentBlockSchema = z.object({
  type: z.string().min(1),
  data: z.record(z.string(), z.unknown()),
});

const coachSlideSchema = z.object({
  title: z.string().nullable().optional(),
  subtitle: z.string().nullable().optional(),
  layout: z.string().nullable().optional(),
  contentBlocks: z.array(coachContentBlockSchema).optional(),
  speakerNotes: z.string().nullable().optional(),
});

const coachRequestSchema = z.object({
  deckId: z.number({ error: "deckId is required" }).int().positive(),
  audienceType: z.enum(["general", "academic", "clinical", "student", "executive"]).optional().default("general"),
  slides: z
    .array(coachSlideSchema)
    .min(1, "At least one slide is required")
    .max(200, "Too many slides"),
});

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
    const rawBody = await req.json();
    const parsed = coachRequestSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const body = parsed.data as CoachRequest;

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
