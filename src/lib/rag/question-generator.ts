/**
 * Dynamic Suggested Question Generator
 *
 * Generates contextual starter questions based on stored source overviews
 * from all selected papers. Questions span factual, comparative, analytical,
 * and applied types — tailored to the actual uploaded content.
 *
 * Falls back to static suggestions when overviews aren't available yet.
 */

import { generateObject } from "ai";
import { z } from "zod";
import { getSmallModel } from "@/lib/ai/models";
import type { SourceOverview } from "./source-summarizer";

// ── Types ────────────────────────────────────────────────────────

export type QuestionType = "factual" | "comparative" | "analytical" | "applied";

export interface SuggestedQuestion {
  question: string;
  type: QuestionType;
}

export interface PaperOverviewInput {
  paperId: number;
  title: string;
  overview: SourceOverview;
}

// ── Static fallback suggestions ──────────────────────────────────

export const STATIC_SUGGESTIONS: SuggestedQuestion[] = [
  { question: "Summarize Key Themes", type: "analytical" },
  { question: "Find Contradictions", type: "comparative" },
  { question: "Compare Methodologies", type: "comparative" },
  { question: "What are the main findings?", type: "factual" },
  { question: "What does this evidence suggest for practice?", type: "applied" },
];

// ── Zod schema for structured output ─────────────────────────────

const suggestedQuestionsSchema = z.object({
  questions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("A specific question about the uploaded papers"),
        type: z.enum(["factual", "comparative", "analytical", "applied"]).describe(
          "Question type: factual (about specific data), comparative (across papers), analytical (limitations/gaps), applied (clinical/practical implications)"
        ),
      })
    )
    .min(5)
    .max(6)
    .describe("5-6 suggested questions spanning different types"),
});

// ── Core function ────────────────────────────────────────────────

/**
 * Generate dynamic suggested questions from paper overviews.
 *
 * @param paperOverviews - Source overviews for all selected papers
 * @returns Array of suggested questions with types
 */
export async function generateSuggestedQuestions(
  paperOverviews: PaperOverviewInput[]
): Promise<SuggestedQuestion[]> {
  // Fallback: no overviews available
  if (paperOverviews.length === 0) {
    return STATIC_SUGGESTIONS;
  }

  // Build context from overviews
  const overviewContext = paperOverviews
    .map((p) => {
      const topicsStr = p.overview.keyTopics.join(", ");
      return `Paper: "${p.title}"\nSummary: ${p.overview.summary}\nKey Topics: ${topicsStr}`;
    })
    .join("\n\n");

  const singlePaper = paperOverviews.length === 1;

  const systemPrompt = `You are a research assistant generating starter questions for students reviewing academic papers.

RULES:
1. Questions MUST be answerable from the paper summaries and topics provided. Do NOT ask about content not mentioned.
2. Each question must reference specific content from the papers (drug names, outcomes, populations — not generic placeholders).
3. Generate exactly ${singlePaper ? 5 : 6} questions spanning different types:
   - factual: About specific data, results, or methods in the papers
   - comparative: How papers compare on findings, methods, or populations${singlePaper ? " (compare aspects within the paper)" : ""}
   - analytical: About limitations, gaps, assumptions, or implications
   - applied: What the evidence means for clinical practice or future research
4. At least 3 of the 4 types must be represented.
5. Do NOT ask generic questions like "What are the main findings?" — be specific to the content.
6. Questions should be 1 sentence, end with "?", and be under 120 characters.`;

  const userPrompt = `Based on these uploaded papers, generate suggested questions:\n\n${overviewContext}`;

  const result = await generateObject({
    model: getSmallModel(),
    schema: suggestedQuestionsSchema,
    system: systemPrompt,
    prompt: userPrompt,
  });

  return result.object.questions;
}

/**
 * Get suggested questions with graceful fallback.
 *
 * If some papers have overviews and some don't, generates questions
 * from the available overviews. If none have overviews, returns static.
 */
export function getSuggestedQuestionsWithFallback(
  paperOverviews: PaperOverviewInput[],
  generatedQuestions: SuggestedQuestion[] | null
): SuggestedQuestion[] {
  if (generatedQuestions && generatedQuestions.length >= 3) {
    return generatedQuestions;
  }
  if (paperOverviews.length === 0) {
    return STATIC_SUGGESTIONS;
  }
  // Partial fallback: have overviews but generation failed
  return STATIC_SUGGESTIONS;
}
