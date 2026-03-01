import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { getModel, traceGeneration } from "@/lib/ai/models";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const chatSchema = z.object({
  deckId: z.number().int().positive(),
  message: z.string().min(1).max(4000),
  slides: z
    .array(
      z.object({
        id: z.number().int(),
        title: z.string().nullish(),
        contentBlocks: z.array(z.any()).optional(),
        speakerNotes: z.string().nullish(),
      })
    )
    .max(100),
  activeSlideId: z.number().int().nullish(),
  audienceType: z.string().optional(),
});

function getChatSystemPrompt(audienceType: string): string {
  return `You are an expert presentation builder for academic and scientific presentations, operating in a Gamma-like chat mode.
Target audience: ${audienceType}

The user describes what they want in natural language and you build/modify their slides.

VALID CONTENT BLOCK TYPES:
- text: { "text": "...", "style": "title" | "subtitle" | "body" | "caption" }
- bullets: { "items": ["..."], "ordered": false }
- chart: { "chartType": "bar"|"line"|"pie"|"scatter"|"area"|"radar", "title": "...", "labels": [...], "datasets": [{"label":"...","data":[...]}] }
- table: { "headers": [...], "rows": [[...]], "caption": "..." }
- citation: { "text": "...", "source": "Author et al., Year", "doi": "..." }
- math: { "expression": "LaTeX", "displayMode": true }
- callout: { "type": "finding"|"limitation"|"methodology"|"clinical"|"warning"|"important"|"note", "text": "...", "title": "..." }
- stat_result: { "label": "...", "value": "...", "ci": "...", "pValue": "...", "interpretation": "..." }
- timeline: { "entries": [{"label":"...","description":"...","date":"...","status":"completed"|"in_progress"|"upcoming"}] }
- quote: { "text": "...", "attribution": "..." }
- image: { "url": "", "alt": "...", "caption": "..." }
- code: { "code": "...", "language": "python" }
- divider: { "style": "solid"|"dashed"|"gradient" }

VALID LAYOUTS: title_slide, title_content, two_column, three_column, section_header, image_text, chart_slide, table_slide, quote_slide, comparison, blank, bibliography_slide, methodology, results_summary, key_findings, timeline_slide, stat_overview, big_number

RESPONSE FORMAT — Return valid JSON only, no markdown fences:
{
  "summary": "<human-readable summary of changes>",
  "modifiedSlides": [
    {
      "slideId": <existing slide ID to modify>,
      "title": "<new title or null>",
      "layout": "<new layout or null>",
      "contentBlocks": [<array of content blocks>],
      "speakerNotes": "<notes or null>"
    }
  ],
  "newSlides": [
    {
      "title": "<slide title>",
      "layout": "<layout>",
      "contentBlocks": [<array of content blocks>],
      "speakerNotes": "<notes or empty>"
    }
  ]
}

RULES:
1. If the user wants to modify existing slides, use "modifiedSlides" with the correct slideId.
2. If the user wants new slides, use "newSlides".
3. You can use both arrays in one response.
4. Only include "modifiedSlides" entries for slides that actually change.
5. Ensure all content blocks are valid and well-structured.
6. Prefer specific, data-rich content over vague placeholders.`;
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

    const parseResult = chatSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const body = parseResult.data;

    const systemPrompt = getChatSystemPrompt(body.audienceType ?? "general");

    const slideSummary = body.slides
      .map(
        (s) =>
          `Slide ID ${s.id}: "${s.title ?? "Untitled"}"\nContent: ${JSON.stringify(s.contentBlocks ?? [])}\nSpeaker Notes: ${s.speakerNotes ?? "None"}`
      )
      .join("\n\n");

    const activeNote = body.activeSlideId
      ? `\nThe user is currently viewing slide ID ${body.activeSlideId}.`
      : "";

    const trace = traceGeneration({
      tier: "standard",
      modelId: "claude-sonnet-4-20250514",
      feature: "slides-chat",
      userId,
    });

    const { text, usage } = await generateText({
      model: getModel(),
      system: systemPrompt,
      prompt: `User message: ${body.message}${activeNote}\n\nCurrent deck (${body.slides.length} slides):\n\n${slideSummary}`.slice(
        0,
        60000
      ),
    });
    trace.end(usage);

    const cleanText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const result = JSON.parse(cleanText);

    return NextResponse.json(result);
  } catch (error) {
    log.error("Slides chat error", error);
    return NextResponse.json(
      { error: "Chat operation failed" },
      { status: 500 }
    );
  }
}
