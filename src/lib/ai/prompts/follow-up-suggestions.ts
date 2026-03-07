import { generateObject } from "ai";
import { z } from "zod";
import { getSmallModel } from "@/lib/ai/models";
import type { QuestionType } from "@/lib/rag/question-generator";

export interface FollowUpSuggestion {
  text: string;
  type: QuestionType;
}

const followUpSchema = z.object({
  suggestions: z
    .array(
      z.object({
        text: z
          .string()
          .max(100)
          .describe("A concise follow-up question under 100 characters"),
        type: z.enum(["factual", "comparative", "analytical", "applied"]),
      })
    )
    .length(3),
});

interface FollowUpInput {
  responseText: string;
  sourceTitles: string[];
  userQuery: string;
  mode: "research" | "learn";
}

export async function generateFollowUpSuggestions(
  input: FollowUpInput
): Promise<FollowUpSuggestion[]> {
  const truncatedResponse = input.responseText.slice(0, 1500);
  const hasMultipleSources = input.sourceTitles.length > 1;

  const sourcesContext =
    input.sourceTitles.length > 0
      ? `\nSources referenced: ${input.sourceTitles.join(", ")}`
      : "";

  const modeInstruction =
    input.mode === "learn"
      ? `CRITICAL: You are in LEARN (Socratic) mode. Suggestions must be Socratic and guide deeper thinking.
Use prompts such as:
- "Why do you think..."
- "What would happen if..."
- "How would you design a study to..."
- "What assumptions underlie..."
- "Can you identify a flaw in..."
Do not generate direct factual retrieval questions in Learn mode.`
      : `You are in RESEARCH mode. Generate analytical follow-up questions that deepen evidence review.
Prefer questions that:
- Probe a specific claim or finding mentioned in the response
- Compare across sources if multiple are cited
- Examine limitations or methodology
- Connect findings to implications`;

  const systemPrompt = `You generate exactly 3 follow-up suggestion chips for an AI research notebook.

${modeInstruction}

RULES:
1. Each suggestion must be under 100 characters.
2. Suggestions must reference specific response content (paper names, findings, methods).
3. Never generate generic prompts such as "Tell me more" or "Explain further".
4. Suggestions must be answerable from loaded papers; avoid external data.
5. ${hasMultipleSources
    ? "If multiple papers are discussed, include at least one comparative suggestion."
    : "Only one source is available; avoid comparative suggestions."}
6. If a specific trial/result is mentioned, at least one suggestion should probe it.
7. Return exactly 3 suggestions with different types (pick 3 of 4 types).`;

  const userPrompt = `User asked: "${input.userQuery}"

AI responded (truncated):
${truncatedResponse}
${sourcesContext}

Generate 3 follow-up suggestions.`;

  try {
    const result = await generateObject({
      model: getSmallModel(),
      schema: followUpSchema,
      system: systemPrompt,
      prompt: userPrompt,
    });

    const normalized = result.object.suggestions.map((suggestion) => {
      if (!hasMultipleSources && suggestion.type === "comparative") {
        return { ...suggestion, type: "analytical" as const };
      }
      return suggestion;
    });

    return normalized;
  } catch (error) {
    console.error("Follow-up suggestion generation failed:", error);
    return [];
  }
}
