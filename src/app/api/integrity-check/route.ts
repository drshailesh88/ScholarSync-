import { generateObject } from "ai";
import { getModel, isAIConfigured } from "@/lib/ai/models";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { z } from "zod";

const requestSchema = z.object({
  text: z
    .string()
    .min(50, "Text must be at least 50 characters")
    .max(50000, "Text must not exceed 50000 characters"),
  mode: z
    .enum(["full", "ai_detection", "plagiarism"])
    .optional()
    .default("full"),
});

const integritySchema = z.object({
  humanScore: z
    .number()
    .min(0)
    .max(100)
    .describe("Percentage likely human-written"),
  aiScore: z
    .number()
    .min(0)
    .max(100)
    .describe("Percentage likely AI-generated"),
  overallRisk: z.enum(["low", "medium", "high"]),
  paragraphAnalysis: z.array(
    z.object({
      paragraphIndex: z.number(),
      humanProbability: z.number().min(0).max(100),
      flags: z.array(z.string()),
      suggestion: z.string().optional(),
    })
  ),
  plagiarismIndicators: z.array(
    z.object({
      excerpt: z.string(),
      concern: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    })
  ),
  writingQuality: z.object({
    passiveVoiceCount: z.number(),
    averageSentenceLength: z.number(),
    readabilityGrade: z.number(),
    suggestions: z.array(z.string()),
  }),
});

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    // Authentication
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return new Response(
        JSON.stringify({ error: "Not authenticated" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Rate limiting
    const rateLimitResponse = await checkRateLimit(
      userId,
      "integrity-check",
      RATE_LIMITS.analysis
    );
    if (rateLimitResponse) return rateLimitResponse;

    // AI configuration check
    if (!isAIConfigured()) {
      return new Response(
        JSON.stringify({ error: "AI service is not configured." }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          error: "Invalid request",
          details: parsed.error.flatten().fieldErrors,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { text, mode } = parsed.data;

    let systemPrompt =
      "You are an academic integrity analyzer. Analyze the following text for:";

    if (mode === "full" || mode === "ai_detection") {
      systemPrompt += `
1. AI Detection: Estimate what percentage is human-written vs AI-generated. Look for:
   - Unnaturally perfect grammar and structure
   - Repetitive hedging phrases ("It is important to note that...")
   - Lack of personal voice or specific examples
   - Overly balanced/neutral tone typical of LLMs
   - Generic topic sentences followed by predictable elaboration`;
    }

    if (mode === "full" || mode === "plagiarism") {
      systemPrompt += `
2. Plagiarism Indicators: Flag any passages that appear to be common phrases from well-known sources, uncited claims, or text that seems copied rather than original.`;
    }

    systemPrompt += `
3. Writing Quality: Analyze passive voice usage, sentence length, readability level, and provide actionable suggestions.

Be rigorous but fair. Academic writing naturally has some formal patterns that should not be flagged as AI-generated.`;

    const { object } = await generateObject({
      model: getModel(),
      schema: integritySchema,
      system: systemPrompt,
      prompt: text,
    });

    log.info("Integrity check completed", { userId, mode });

    return new Response(JSON.stringify(object), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    log.error("Integrity check failed", error);
    return new Response(
      JSON.stringify({ error: "Failed to analyze text" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
