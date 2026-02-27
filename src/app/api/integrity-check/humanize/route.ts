import { getCurrentUserId } from "@/lib/auth";
import { isAIConfigured, getSmallModel, traceGeneration } from "@/lib/ai/models";
import { generateObject } from "ai";
import { z } from "zod";

// ── Request validation ───────────────────────────────────────────────

const requestSchema = z.object({
  text: z
    .string()
    .min(10, "Text must be at least 10 characters")
    .max(5000, "Text must not exceed 5000 characters"),
  context: z
    .string()
    .max(2000, "Context must not exceed 2000 characters")
    .optional(),
});

// ── Response schema for structured output ────────────────────────────

const humanizeResponseSchema = z.object({
  rewritten: z
    .string()
    .describe(
      "The rewritten paragraph that sounds more naturally human-written while preserving meaning and citations"
    ),
  changes: z
    .array(z.string())
    .describe(
      "List of specific changes made, e.g. 'Varied sentence lengths', 'Replaced passive voice with active voice'"
    ),
});

// ── Route handler ────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    // Authentication
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return new Response(
        JSON.stringify({ error: "Not authenticated" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    // AI configuration check
    if (!isAIConfigured()) {
      return new Response(
        JSON.stringify({ error: "AI service is not configured." }),
        { status: 503, headers: { "Content-Type": "application/json" } },
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
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const { text, context } = parsed.data;

    const contextPrompt = context
      ? `\n\nSurrounding context for tone matching:\n${context}`
      : "";

    const trace = traceGeneration({ tier: "small", modelId: "claude-haiku-4-5-20251001", feature: "integrity-humanize", userId });
    const { object, usage } = await generateObject({
      model: getSmallModel(),
      schema: humanizeResponseSchema,
      system:
        "Rewrite this academic paragraph to sound more naturally human-written. " +
        "Vary sentence lengths, reduce hedging phrases, use active voice where " +
        "appropriate, and maintain academic rigor. Do NOT change the meaning or " +
        "remove citations.",
      prompt:
        `Rewrite the following paragraph to sound more naturally human-written ` +
        `and list the specific changes you made.\n\n` +
        `Paragraph:\n${text}${contextPrompt}`,
    });
    trace.end(usage);

    return new Response(
      JSON.stringify({
        rewritten: object.rewritten,
        changes: object.changes,
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("[humanize] Failed to humanize text:", error);
    return new Response(
      JSON.stringify({ error: "Failed to humanize text" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
