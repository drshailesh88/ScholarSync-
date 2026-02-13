import { generateObject } from "ai";
import { getModel } from "@/lib/ai/models";
import { z } from "zod";

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
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          "API key not configured. Add ANTHROPIC_API_KEY to .env.local to enable integrity checks.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { text, mode = "full" } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length < 50) {
      return new Response(
        JSON.stringify({ error: "Text must be at least 50 characters" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

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
