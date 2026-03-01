import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { getModel, traceGeneration } from "@/lib/ai/models";
import { getSlideGeneratorSystemPrompt } from "@/lib/ai/prompts/presentation";
import {
  createSlide,
  updateDeck,
} from "@/lib/actions/presentations";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import type {
  GeneratedSlide,
  ContentBlock,
  SlideLayout,
} from "@/types/presentation";

const generateSchema = z.object({
  deckId: z.number().int().positive(),
  title: z.string().min(1).max(500),
  description: z.string().min(1).max(10000),
  audienceType: z
    .enum([
      "thesis_defense",
      "conference",
      "journal_club",
      "classroom",
      "general",
      "grant_presentation",
      "poster_session",
      "systematic_review",
      "patient_case",
      "grand_rounds",
    ])
    .optional(),
  themeKey: z.string().optional(),
  slideCount: z.number().int().positive().max(30).optional(),
});

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateLimitResponse = await checkRateLimit(
      userId,
      "presentations",
      RATE_LIMITS.ai
    );
    if (rateLimitResponse) return rateLimitResponse;

    const parseResult = generateSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    const body = parseResult.data;

    await updateDeck(body.deckId, { generationStatus: "processing" });

    try {
      const systemPrompt = getSlideGeneratorSystemPrompt({
        audienceType: body.audienceType ?? "general",
        slideCount: body.slideCount,
        themeKey: body.themeKey ?? "modern",
      });

      const userPrompt = `Generate slides for: "${body.title}"\n\nDescription: ${body.description}`;

      const trace = traceGeneration({
        tier: "standard",
        modelId: "claude-sonnet-4-20250514",
        feature: "slides-generate",
        userId,
      });

      const { text, usage } = await generateText({
        model: getModel(),
        system: systemPrompt,
        prompt: userPrompt.slice(0, 30000),
      });
      trace.end(usage);

      const cleanText = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      const generated: { slides: GeneratedSlide[] } = JSON.parse(cleanText);

      // Create slides in DB (skip the first which is the title slide created in the page)
      const slidesToCreate = generated.slides ?? [];
      for (let i = 0; i < slidesToCreate.length; i++) {
        const s = slidesToCreate[i];
        await createSlide({
          deckId: body.deckId,
          sortOrder: i + 1, // +1 because title slide is at 0
          layout: (s.layout as SlideLayout) ?? "title_content",
          title: s.title ?? `Slide ${i + 2}`,
          subtitle: s.subtitle,
          contentBlocks: (s.contentBlocks as ContentBlock[]) ?? [],
          speakerNotes: s.speakerNotes,
        });
      }

      await updateDeck(body.deckId, {
        generationStatus: "completed",
        theme: body.themeKey ?? "modern",
      });

      return NextResponse.json({
        success: true,
        slideCount: slidesToCreate.length,
      });
    } catch (genError) {
      log.error("Generation LLM error", genError);
      await updateDeck(body.deckId, { generationStatus: "failed" });
      return NextResponse.json(
        { error: "Slide generation failed" },
        { status: 500 }
      );
    }
  } catch (error) {
    log.error("Generate stream error", error);
    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}
