import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { getModel, traceGeneration } from "@/lib/ai/models";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const schema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().max(5000).optional(),
  audienceType: z.string().optional(),
  cardCount: z.number().int().min(3).max(30).optional(),
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

    const parseResult = schema.safeParse(await req.json());
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
    const targetCards = body.cardCount ?? 8;

    const trace = traceGeneration({
      tier: "standard",
      modelId: "outline-gen",
      feature: "slides-outline",
      userId,
    });

    const { text, usage } = await generateText({
      model: getModel(),
      system: `You generate presentation outlines. Return valid JSON only, no markdown fences.
Target audience: ${body.audienceType ?? "general"}
Generate exactly ${targetCards} cards.

Response format:
{
  "outline": [
    { "title": "Card title", "bulletPoints": ["Key point 1", "Key point 2", "Key point 3"] }
  ]
}

Rules:
1. First card should be a title card
2. Last card should be a summary/conclusion
3. Each card should have 2-4 bullet points
4. Be specific and content-rich, avoid vague placeholders
5. For academic audiences, include methodology, results, discussion sections`,
      prompt: `Create a presentation outline for: "${body.title}"${body.description ? `\n\nDescription: ${body.description}` : ""}`,
    });
    trace.end(usage);

    const clean = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const result = JSON.parse(clean);

    return NextResponse.json(result);
  } catch (error) {
    log.error("Outline generation error", error);
    return NextResponse.json(
      { error: "Failed to generate outline" },
      { status: 500 }
    );
  }
}
