import { NextResponse } from "next/server";
import { streamText } from "ai";
import { getModel, isAIConfigured, requiredKeyName } from "@/lib/ai/models";
import { z } from "zod";

type HumanizeLevel = "light" | "medium" | "heavy";

const humanizeRequestSchema = z.object({
  text: z
    .string({ error: "text is required" })
    .min(1, "text must be a non-empty string")
    .max(50000, "text must not exceed 50000 characters"),
  level: z.enum(["light", "medium", "heavy"], {
    error: "level must be one of: light, medium, heavy",
  }),
});

interface HumanizeRequest {
  text: string;
  level: HumanizeLevel;
}

function getSystemPrompt(level: HumanizeLevel): string {
  const base =
    "You are an expert academic editor who specializes in making AI-generated or overly formal text sound naturally written by a human academic. " +
    "You preserve all factual content, citations, and technical accuracy while adjusting the tone and style. " +
    "Return ONLY the rewritten text with no preamble, explanation, or commentary.";

  switch (level) {
    case "light":
      return (
        base +
        "\n\nApply light humanization: " +
        "Make minimal changes to improve natural flow. " +
        "Vary sentence length slightly, replace a few overly mechanical transitions, and soften any robotic phrasing. " +
        "Keep the overall structure and most of the original wording intact. " +
        "The result should read like a well-edited academic draft."
      );

    case "medium":
      return (
        base +
        "\n\nApply medium humanization: " +
        "Rewrite for a natural, confident academic voice. " +
        "Vary sentence structure and length throughout. Replace formulaic transitions with more organic ones. " +
        "Add occasional hedging language where appropriate (e.g., 'suggests', 'appears to', 'may indicate'). " +
        "Break up overly long or compound sentences. Ensure the text flows as if written by a thoughtful researcher. " +
        "Maintain academic rigor while removing any detectable AI patterns."
      );

    case "heavy":
      return (
        base +
        "\n\nApply heavy humanization: " +
        "Substantially rewrite the text to sound authentically human-written. " +
        "Use varied and natural sentence structures, including occasional short punchy sentences mixed with longer analytical ones. " +
        "Introduce natural academic discourse markers and transitions. " +
        "Add appropriate hedging and nuance. Occasionally restructure paragraphs for better rhetorical flow. " +
        "Include subtle stylistic choices a human writer would make: rhetorical questions where fitting, " +
        "em-dashes for emphasis, parenthetical asides for nuance, and varied paragraph lengths. " +
        "The result must be indistinguishable from text written by an experienced academic researcher."
      );
  }
}

export async function POST(req: Request) {
  if (!isAIConfigured()) {
    return NextResponse.json(
      {
        error: `API key not configured. Add ${requiredKeyName()} to .env.local to enable humanization.`,
      },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const parsed = humanizeRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { text, level } = parsed.data;

    const systemPrompt = getSystemPrompt(level);

    const result = streamText({
      model: getModel(),
      system: systemPrompt,
      prompt: text,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Humanize API error:", error);
    return NextResponse.json(
      { error: "Humanization failed. Please try again." },
      { status: 500 }
    );
  }
}
