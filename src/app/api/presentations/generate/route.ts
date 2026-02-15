import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { getModel } from "@/lib/ai/models";
import { getSlideGeneratorSystemPrompt } from "@/lib/ai/prompts/presentation";
import {
  createDeck,
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
import { PRESET_THEMES } from "@/types/presentation";

const generateSchema = z.object({
  title: z.string().min(1).max(500),
  preprocessedData: z.string().min(1).max(100000),
  audienceType: z.enum(["thesis_defense", "conference", "journal_club", "classroom", "general"]),
  slideCount: z.number().int().positive().optional(),
  themeKey: z.string().optional(),
  projectId: z.number().int().positive().optional(),
  documentId: z.number().int().positive().optional(),
  additionalInstructions: z.string().optional(),
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
    const parseResult = generateSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const body = parseResult.data;

    const themeKey = body.themeKey ?? "modern";

    // Update generation status
    const deck = await createDeck({
      title: body.title,
      projectId: body.projectId,
      documentId: body.documentId,
      audienceType: body.audienceType,
      themeConfig: PRESET_THEMES[themeKey],
      sourceType: body.documentId ? "synthesis" : "custom",
    });

    await updateDeck(deck.id, {
      generationStatus: "processing",
      generationPrompt: body.additionalInstructions,
    });

    try {
      const systemPrompt = getSlideGeneratorSystemPrompt({
        audienceType: body.audienceType,
        slideCount: body.slideCount,
        themeKey,
      });

      let userPrompt = `Here is the preprocessed content to turn into slides:\n\n${body.preprocessedData}`;
      if (body.additionalInstructions) {
        userPrompt += `\n\nAdditional instructions: ${body.additionalInstructions}`;
      }

      const { text } = await generateText({
        model: getModel(),
        system: systemPrompt,
        prompt: userPrompt.slice(0, 30000),
      });

      // Parse the generated slides
      const cleanText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const generatedSlides: GeneratedSlide[] = JSON.parse(cleanText);

      // Save slides to DB
      const validLayouts = new Set([
        "title_slide", "title_content", "two_column", "section_header",
        "image_text", "chart_slide", "table_slide", "quote_slide",
        "comparison", "blank",
      ]);

      for (let i = 0; i < generatedSlides.length; i++) {
        const gs = generatedSlides[i];
        const layout = validLayouts.has(gs.layout) ? gs.layout : "title_content";
        await createSlide({
          deckId: deck.id,
          sortOrder: i,
          layout: layout as SlideLayout,
          title: gs.title,
          subtitle: gs.subtitle,
          contentBlocks: gs.contentBlocks as ContentBlock[],
          speakerNotes: gs.speakerNotes,
          generatedByAi: true,
        });
      }

      await updateDeck(deck.id, {
        generationStatus: "completed",
        totalSlides: generatedSlides.length,
        theme: themeKey,
      });

      return NextResponse.json({
        deckId: deck.id,
        slideCount: generatedSlides.length,
      });
    } catch (genError) {
      await updateDeck(deck.id, { generationStatus: "failed" });
      throw genError;
    }
  } catch (error) {
    log.error("Generation error", error);
    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}
