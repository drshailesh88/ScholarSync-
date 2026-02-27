import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { getModel, traceGeneration } from "@/lib/ai/models";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const agentSchema = z.object({
  deckId: z.number().int().positive(),
  command: z.string().min(1).max(2000),
  slides: z
    .array(
      z.object({
        id: z.number().int(),
        title: z.string().nullish(),
        contentBlocks: z.array(z.any()).optional(),
        speakerNotes: z.string().nullish(),
      })
    )
    .min(1)
    .max(100),
  audienceType: z.string().optional(),
});

function getAgentSystemPrompt(audienceType: string): string {
  return `You are an expert presentation editor for academic and scientific presentations.
You receive an entire slide deck and a user command. Your job is to apply the command across the WHOLE deck and return only the slides that were modified.

Target audience: ${audienceType}

RULES:
1. Analyze all slides holistically before making changes.
2. Only return slides that were actually modified — do NOT return unmodified slides.
3. Preserve the content block structure. Each content block has a "type" and "data" field.
4. Valid content block types: text, bullets, image, chart, table, citation, quote, math, diagram, code, callout, stat_result, bibliography, timeline, divider.
5. When shortening, reduce word count by ~30% while preserving key information and citations.
6. When adding citations, insert citation-type content blocks with proper academic formatting.
7. When improving flow, adjust transitions, reorder points for logical progression, and ensure narrative coherence.
8. When generating a bibliography, collect all citations across slides and create a properly formatted bibliography slide.
9. When restructuring, reorder slides for better narrative flow and add section headers where needed.
10. When adapting for a different audience, adjust tone, terminology, and depth appropriately.

RESPONSE FORMAT — Return valid JSON only, no markdown fences:
{
  "modifiedSlides": [
    {
      "slideId": <number>,
      "contentBlocks": [<content blocks array>],
      "speakerNotes": "<updated speaker notes or null if unchanged>"
    }
  ],
  "summary": "<human-readable summary of all changes made>"
}`;
}

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
    const parseResult = agentSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const body = parseResult.data;

    const systemPrompt = getAgentSystemPrompt(body.audienceType ?? "general");

    const slideSummary = body.slides
      .map(
        (s) =>
          `Slide ID ${s.id}: "${s.title ?? "Untitled"}"\n` +
          `Content: ${JSON.stringify(s.contentBlocks ?? [])}\n` +
          `Speaker Notes: ${s.speakerNotes ?? "None"}`
      )
      .join("\n\n");

    const trace = traceGeneration({ tier: "standard", modelId: "claude-sonnet-4-20250514", feature: "presentation-agent", userId });
    const { text, usage } = await generateText({
      model: getModel(),
      system: systemPrompt,
      prompt: `Command: ${body.command}\n\nHere is the full deck (${body.slides.length} slides):\n\n${slideSummary}`,
    });
    trace.end(usage);

    const cleanText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const result = JSON.parse(cleanText);

    return NextResponse.json(result);
  } catch (error) {
    log.error("Agent error", error);
    return NextResponse.json(
      { error: "Agent operation failed" },
      { status: 500 }
    );
  }
}
