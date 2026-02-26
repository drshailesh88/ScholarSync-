import { getCurrentUserId } from "@/lib/auth";
import { isAIConfigured } from "@/lib/ai/models";
import { getSmallModel } from "@/lib/ai/models";
import { generateObject } from "ai";
import { z } from "zod";

// ── Request validation ───────────────────────────────────────────────

const requestSchema = z.object({
  text: z
    .string()
    .min(10, "Text must be at least 10 characters")
    .max(5000, "Text must not exceed 5000 characters"),
  sourceTitle: z.string().min(1, "Source title is required"),
  sourceDoi: z.string().optional(),
  sourceYear: z.number().int().positive().optional(),
});

// ── Response schema for structured output ────────────────────────────

const paraphraseResponseSchema = z.object({
  paraphrased: z
    .string()
    .describe("The rewritten passage expressing the same ideas in original language"),
  citationSuggestion: z
    .string()
    .describe(
      "A suggested citation string, e.g. '(Author, Year)' or a full citation"
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

    const { text, sourceTitle, sourceDoi, sourceYear } = parsed.data;

    // Build source context for the prompt
    const sourceInfo = [
      `Title: "${sourceTitle}"`,
      sourceDoi ? `DOI: ${sourceDoi}` : null,
      sourceYear ? `Year: ${sourceYear}` : null,
    ]
      .filter(Boolean)
      .join(", ");

    const { object } = await generateObject({
      model: getSmallModel(),
      schema: paraphraseResponseSchema,
      system:
        "Rewrite this passage to express the same ideas in original language. " +
        "Add a proper citation to the source. The goal is to reduce plagiarism " +
        "similarity while maintaining academic integrity. Output both the " +
        "paraphrased text and a suggested citation string.",
      prompt:
        `Paraphrase the following passage and provide a citation for the source.\n\n` +
        `Source: ${sourceInfo}\n\n` +
        `Passage:\n${text}`,
    });

    return new Response(
      JSON.stringify({
        paraphrased: object.paraphrased,
        citationSuggestion: object.citationSuggestion,
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("[paraphrase] Failed to paraphrase text:", error);
    return new Response(
      JSON.stringify({ error: "Failed to paraphrase text" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
