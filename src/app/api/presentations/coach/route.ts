import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { getModel } from "@/lib/ai/models";
import { getCoachSystemPrompt } from "@/lib/ai/prompts/presentation";
import { saveCoachEvaluation } from "@/lib/actions/presentations";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import type { CoachEvaluation } from "@/types/presentation";

const coachSchema = z.object({
  deckId: z.number().int().positive(),
  audienceType: z.enum(["thesis_defense", "conference", "journal_club", "classroom", "general"]).optional(),
  slides: z
    .array(
      z.object({
        title: z.string().nullish(),
        subtitle: z.string().nullish(),
        layout: z.string().nullish(),
        contentBlocks: z.array(z.any()).optional(),
        speakerNotes: z.string().nullish(),
      })
    )
    .min(1)
    .max(100),
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
    const parseResult = coachSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const body = parseResult.data;

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
    log.error("Coach error", error);
    return NextResponse.json(
      { error: "Coach evaluation failed" },
      { status: 500 }
    );
  }
}
