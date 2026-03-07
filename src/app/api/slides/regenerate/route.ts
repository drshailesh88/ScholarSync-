import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { getModel, traceGeneration } from "@/lib/ai/models";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { getDeck } from "@/lib/actions/presentations";
import { getRegenerateTonePrompt } from "@/lib/slides/regenerate";

const LAYOUT_VALUES = [
  "title_slide",
  "title_content",
  "two_column",
  "three_column",
  "section_header",
  "image_text",
  "chart_slide",
  "table_slide",
  "quote_slide",
  "comparison",
  "blank",
  "bibliography_slide",
  "methodology",
  "results_summary",
  "key_findings",
  "timeline_slide",
  "stat_overview",
  "big_number",
] as const;

const requestSchema = z.object({
  deckId: z.number().int().positive(),
  slideId: z.number().int().positive(),
  instruction: z.string().max(4000),
  tone: z.string().min(1).max(100),
  context: z.object({
    prevSlideTitle: z.string().optional(),
    nextSlideTitle: z.string().optional(),
    deckTitle: z.string().max(500),
    audienceType: z.string().max(100),
  }),
});

const generatedSlideSchema = z.object({
  title: z.string(),
  subtitle: z.string().default(""),
  layout: z.enum(LAYOUT_VALUES),
  contentBlocks: z.array(z.any()),
  speakerNotes: z.string().default(""),
});

function cleanJson(text: string): string {
  return text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
}

export function getRegenerateSlideSystemPrompt(input: {
  deckTitle: string;
  audienceType: string;
  prevSlideTitle?: string;
  nextSlideTitle?: string;
  instruction: string;
  tone: string;
}): string {
  return `You are regenerating a single slide inside an existing academic presentation.
Return valid JSON only, with no markdown fences.

DECK CONTEXT:
- Deck title: ${input.deckTitle}
- Target audience: ${input.audienceType}
- Previous slide title: ${input.prevSlideTitle ?? "None"}
- Next slide title: ${input.nextSlideTitle ?? "None"}

REGENERATION GOAL:
- User instruction: ${input.instruction || "Refresh the slide while keeping it aligned with the deck."}
- Tone guidance: ${getRegenerateTonePrompt(input.tone)}

RULES:
1. Regenerate only one slide.
2. Keep the slide aligned with the surrounding flow implied by the previous and next slide titles.
3. Preserve the slide's core topic unless the user explicitly requests a pivot.
4. Prefer concrete, presentation-ready content over placeholders.
5. Return this exact shape:
{
  "title": "Slide title",
  "subtitle": "Optional subtitle",
  "layout": "title_slide|title_content|two_column|three_column|section_header|image_text|chart_slide|table_slide|quote_slide|comparison|blank|bibliography_slide|methodology|results_summary|key_findings|timeline_slide|stat_overview|big_number",
  "contentBlocks": [
    { "type": "text", "data": { "text": "...", "style": "title|subtitle|body|caption" } }
  ],
  "speakerNotes": "Detailed speaker notes"
}

VALID CONTENT BLOCK TYPES:
- text
- bullets
- chart
- table
- citation
- quote
- image
- math
- diagram
- code
- callout
- stat_result
- bibliography
- timeline
- divider
- infographic
- illustration
- media`;
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

    const rateLimitResponse = await checkRateLimit(userId, "presentations", RATE_LIMITS.ai);
    if (rateLimitResponse) return rateLimitResponse;

    const parseResult = requestSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const body = parseResult.data;

    const deck = await getDeck(body.deckId);
    if (!deck) {
      return NextResponse.json({ error: "Deck not found" }, { status: 404 });
    }

    const sortedSlides = [...deck.slides].sort((a, b) => {
      const left = (a.sortOrder as number) ?? 0;
      const right = (b.sortOrder as number) ?? 0;
      return left - right;
    });
    const slide = sortedSlides.find((candidate) => candidate.id === body.slideId);
    if (!slide) {
      return NextResponse.json({ error: "Slide not found" }, { status: 404 });
    }

    const slideIndex = sortedSlides.findIndex((candidate) => candidate.id === body.slideId);
    const prevSlideTitle = body.context.prevSlideTitle ?? sortedSlides[slideIndex - 1]?.title ?? undefined;
    const nextSlideTitle = body.context.nextSlideTitle ?? sortedSlides[slideIndex + 1]?.title ?? undefined;
    const deckTitle = body.context.deckTitle || deck.title || "Untitled deck";
    const audienceType = body.context.audienceType || deck.audienceType || "general";

    const systemPrompt = getRegenerateSlideSystemPrompt({
      deckTitle,
      audienceType,
      prevSlideTitle,
      nextSlideTitle,
      instruction: body.instruction,
      tone: body.tone,
    });

    const trace = traceGeneration({
      tier: "standard",
      modelId: "claude-sonnet-4-20250514",
      feature: "slides-regenerate",
      userId,
    });

    const { text, usage } = await generateText({
      model: getModel(),
      system: systemPrompt,
      prompt: JSON.stringify(
        {
          currentSlide: {
            title: slide.title ?? "",
            subtitle: slide.subtitle ?? "",
            layout: slide.layout ?? "title_content",
            contentBlocks: slide.contentBlocks ?? [],
            speakerNotes: slide.speakerNotes ?? "",
          },
        },
        null,
        2
      ).slice(0, 30000),
    });
    trace.end(usage);

    const result = generatedSlideSchema.parse(JSON.parse(cleanJson(text)));
    return NextResponse.json(result);
  } catch (error) {
    log.error("Slides regenerate error", error);
    return NextResponse.json(
      { error: "Slide regeneration failed" },
      { status: 500 }
    );
  }
}
