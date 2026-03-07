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
import {
  collectMissingImageBlocks,
  mergeGeneratedImageData,
  updateBlockAtPath,
} from "@/lib/slides/image-blocks";
import { generateSlideImage } from "@/lib/slides/image-generation";
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

type StreamEvent =
  | { type: "status"; message: string }
  | { type: "images"; current: number; total: number; message: string }
  | { type: "complete"; slideCount: number; generatedImages: number }
  | { type: "error"; error: string };

const encoder = new TextEncoder();

function writeEvent(
  controller: ReadableStreamDefaultController<Uint8Array>,
  event: StreamEvent
) {
  controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
}

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

    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        void (async () => {
          try {
            writeEvent(controller, {
              type: "status",
              message: "Generating your presentation...",
            });

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

            const slidesToCreate = generated.slides ?? [];
            const totalImages = slidesToCreate.reduce((count, slide) => {
              const blocks = (slide.contentBlocks as ContentBlock[]) ?? [];
              return count + collectMissingImageBlocks(blocks).length;
            }, 0);

            let processedImages = 0;
            if (totalImages > 0) {
              writeEvent(controller, {
                type: "images",
                current: 0,
                total: totalImages,
                message: `Generating images... (0/${totalImages})`,
              });
            }

            const hydratedSlides = [];
            for (const slide of slidesToCreate) {
              let contentBlocks = (slide.contentBlocks as ContentBlock[]) ?? [];
              const missingImages = collectMissingImageBlocks(contentBlocks);

              for (const imageRef of missingImages) {
                const prompt = imageRef.block.data.suggestion?.trim();
                if (!prompt) continue;

                try {
                  const generatedImage = await generateSlideImage({
                    prompt,
                    style: "illustration",
                    aspectRatio: "16:9",
                  });

                  contentBlocks = updateBlockAtPath(
                    contentBlocks,
                    imageRef.path,
                    (block) => {
                      if (block.type !== "image") return block;
                      return {
                        ...block,
                        data: mergeGeneratedImageData(block.data, {
                          imageUrl: generatedImage.imageUrl,
                          attribution: generatedImage.attribution,
                          prompt,
                        }),
                      };
                    }
                  );
                } catch (imageError) {
                  log.warn("Slide image generation failed", {
                    error: imageError instanceof Error ? imageError.message : String(imageError),
                    prompt,
                  });
                } finally {
                  processedImages += 1;
                  writeEvent(controller, {
                    type: "images",
                    current: processedImages,
                    total: totalImages,
                    message: `Generating images... (${processedImages}/${totalImages})`,
                  });
                }
              }

              hydratedSlides.push({
                ...slide,
                contentBlocks,
              });
            }

            writeEvent(controller, {
              type: "status",
              message: "Saving your deck...",
            });

            for (let i = 0; i < hydratedSlides.length; i++) {
              const slide = hydratedSlides[i];
              await createSlide({
                deckId: body.deckId,
                sortOrder: i + 1,
                layout: (slide.layout as SlideLayout) ?? "title_content",
                title: slide.title ?? `Slide ${i + 2}`,
                subtitle: slide.subtitle,
                contentBlocks: (slide.contentBlocks as ContentBlock[]) ?? [],
                speakerNotes: slide.speakerNotes,
              });
            }

            await updateDeck(body.deckId, {
              generationStatus: "completed",
              theme: body.themeKey ?? "modern",
            });

            writeEvent(controller, {
              type: "complete",
              slideCount: hydratedSlides.length,
              generatedImages: processedImages,
            });
            controller.close();
          } catch (genError) {
            log.error("Generation LLM error", genError);
            await updateDeck(body.deckId, { generationStatus: "failed" });
            writeEvent(controller, {
              type: "error",
              error: "Slide generation failed",
            });
            controller.close();
          }
        })();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (error) {
    log.error("Generate stream error", error);
    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}
