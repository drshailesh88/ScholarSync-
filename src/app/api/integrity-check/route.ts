import { generateObject } from "ai";
import { getModel, isAIConfigured, requiredKeyName } from "@/lib/ai/models";
import { z } from "zod";

const integrityCheckRequestSchema = z.object({
  text: z
    .string({ error: "text is required" })
    .min(50, "Text must be at least 50 characters")
    .max(100000, "Text must not exceed 100000 characters"),
  mode: z.enum(["full", "ai_detection", "plagiarism"]).optional().default("full"),
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
  if (!isAIConfigured()) {
    return new Response(
      JSON.stringify({
        error: `API key not configured. Add ${requiredKeyName()} to .env.local to enable integrity checks.`,
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();
    const parsed = integrityCheckRequestSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Invalid request body", details: parsed.error.flatten().fieldErrors }),
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

    return new Response(JSON.stringify(object), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Integrity check error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to analyze text" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
