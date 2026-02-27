import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { getModel, traceGeneration } from "@/lib/ai/models";
import { getPosterGeneratorSystemPrompt } from "@/lib/ai/prompts/presentation";
import {
  createDeck,
  createSlide,
  updateDeck,
} from "@/lib/actions/presentations";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import type { ContentBlock } from "@/types/presentation";
import { PRESET_THEMES } from "@/types/presentation";
import type { PosterGridLayout, PosterSection } from "@/types/poster";
import { POSTER_GRID_LAYOUTS } from "@/types/poster";

const generatePosterSchema = z.object({
  title: z.string().min(1).max(500),
  preprocessedData: z.string().min(1).max(200000),
  posterSize: z.enum(["a0_portrait", "a0_landscape", "a1_portrait", "a1_landscape", "48x36", "36x24"]),
  gridLayout: z.enum(["three_column", "two_column_wide", "four_column", "two_plus_one"]),
  themeKey: z.string().optional(),
  templateId: z.string().optional(),
  additionalInstructions: z.string().optional(),
  projectId: z.number().int().positive().optional(),
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
    const parseResult = generatePosterSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const body = parseResult.data;

    const themeKey = body.themeKey ?? "modern";
    const gridLayout = body.gridLayout as PosterGridLayout;
    const gridConfig = POSTER_GRID_LAYOUTS[gridLayout];
    const columns = gridConfig?.columns ?? 3;

    // Create a deck record with poster metadata stored in JSONB
    const deck = await createDeck({
      title: body.title,
      projectId: body.projectId,
      audienceType: "poster_session",
      themeConfig: PRESET_THEMES[themeKey],
      sourceType: "custom",
    });

    await updateDeck(deck.id, {
      generationStatus: "processing",
      generationPrompt: body.additionalInstructions,
    });

    try {
      const systemPrompt = getPosterGeneratorSystemPrompt({
        templateId: body.templateId,
        gridLayout,
        columns,
      });

      let userPrompt = `Here is the preprocessed content to turn into a conference poster:\n\n${body.preprocessedData}`;
      if (body.additionalInstructions) {
        userPrompt += `\n\nAdditional instructions: ${body.additionalInstructions}`;
      }

      const trace = traceGeneration({ tier: "standard", modelId: "claude-sonnet-4-20250514", feature: "poster-generate", userId });
      const { text, usage } = await generateText({
        model: getModel(),
        system: systemPrompt,
        prompt: userPrompt.slice(0, 60000),
      });
      trace.end(usage);

      // Parse the generated poster data
      const cleanText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const posterData = JSON.parse(cleanText);

      // Store poster metadata as a single slide with sortOrder 0
      // The slide's contentBlocks stores the poster sections as JSON
      const posterMetadata = {
        posterSize: body.posterSize,
        gridLayout: body.gridLayout,
        authors: posterData.authors ?? [],
        affiliations: posterData.affiliations ?? [],
        sections: posterData.sections ?? [],
        isPoster: true,
      };

      await createSlide({
        deckId: deck.id,
        sortOrder: 0,
        layout: "title_slide",
        title: posterData.title ?? body.title,
        contentBlocks: [
          {
            type: "text" as const,
            data: {
              text: JSON.stringify(posterMetadata),
              style: "body" as const,
            },
          },
        ],
        generatedByAi: true,
      });

      // Also store individual sections as separate slides for compatibility
      const sections: PosterSection[] = posterData.sections ?? [];
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        await createSlide({
          deckId: deck.id,
          sortOrder: i + 1,
          layout: "title_content",
          title: section.title,
          contentBlocks: (section.contentBlocks ?? []) as ContentBlock[],
          generatedByAi: true,
        });
      }

      await updateDeck(deck.id, {
        generationStatus: "completed",
        totalSlides: sections.length + 1,
        theme: themeKey,
      });

      return NextResponse.json({
        deckId: deck.id,
        sectionCount: sections.length,
        posterData: posterMetadata,
      });
    } catch (genError) {
      await updateDeck(deck.id, { generationStatus: "failed" });
      throw genError;
    }
  } catch (error) {
    log.error("Poster generation error", error);
    return NextResponse.json(
      { error: "Poster generation failed" },
      { status: 500 }
    );
  }
}
