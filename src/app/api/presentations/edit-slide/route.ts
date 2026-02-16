import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { getSmallModel } from "@/lib/ai/models";
import { getSlideEditorSystemPrompt } from "@/lib/ai/prompts/presentation";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import type { SlideEditAction } from "@/types/presentation";

const editSlideSchema = z.object({
  action: z.string().min(1),
  contentBlocks: z.array(z.any()).min(1),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  speakerNotes: z.string().optional(),
  additionalContext: z.string().optional(),
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
    const parseResult = editSlideSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const body = parseResult.data;

    const systemPrompt = getSlideEditorSystemPrompt(body.action as SlideEditAction);

    const slideContent = JSON.stringify({
      title: body.title,
      subtitle: body.subtitle,
      contentBlocks: body.contentBlocks,
      speakerNotes: body.speakerNotes,
    });

    let userPrompt = `Here is the current slide content:\n${slideContent}`;
    if (body.additionalContext) {
      userPrompt += `\n\nAdditional context: ${body.additionalContext}`;
    }

    const { text } = await generateText({
      model: getSmallModel(),
      system: systemPrompt,
      prompt: userPrompt,
    });

    const cleanText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const result = JSON.parse(cleanText);

    return NextResponse.json(result);
  } catch (error) {
    log.error("Edit slide error", error);
    return NextResponse.json(
      { error: "Slide editing failed" },
      { status: 500 }
    );
  }
}
