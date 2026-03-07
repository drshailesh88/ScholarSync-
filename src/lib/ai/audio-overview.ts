/**
 * Audio Overview Script Generator
 *
 * Takes source overviews (from Sprint 2) and generates a natural-language
 * audio script suitable for TTS. The script is conversational, avoids
 * citation numbers, and synthesizes findings across papers.
 */

import { generateText } from "ai";
import { getSmallModel } from "@/lib/ai/models";
import type { SourceOverview } from "@/lib/rag/source-summarizer";

export type AudioOverviewMode = "research" | "learn";

export interface AudioScriptInput {
  paperOverviews: Array<{
    title: string;
    authors: string[];
    overview: SourceOverview;
  }>;
  mode: AudioOverviewMode;
}

export interface AudioScript {
  text: string;
  wordCount: number;
  estimatedDurationSeconds: number;
  generatedAt: string;
}

function sanitizeScript(raw: string): string {
  const withoutCitations = raw
    .replace(/\[(\d+)\]/g, "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "");

  const normalizedLines = withoutCitations
    .split("\n")
    .map((line) => line.replace(/^\s{0,3}(#{1,6}|[-*+]\s+|\d+\.\s+)/, "").trim())
    .filter(Boolean);

  return normalizedLines.join("\n\n").trim();
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Generate a natural-language audio script from paper overviews.
 *
 * Target: 500-800 words (~2-3 minutes of audio at normal speech rate).
 * The script must NOT contain citation brackets [1], [2], etc.
 */
export async function generateAudioScript(
  input: AudioScriptInput
): Promise<AudioScript> {
  const overviewContext = input.paperOverviews
    .map((paper, index) => {
      const authorStr = paper.authors.slice(0, 3).join(", ") || "Unknown authors";
      const topicsStr = paper.overview.keyTopics.join(", ");

      return [
        `Paper ${index + 1}: "${paper.title}" by ${authorStr}`,
        `Summary: ${paper.overview.summary}`,
        `Key Topics: ${topicsStr}`,
      ].join("\n");
    })
    .join("\n\n");

  const paperCount = input.paperOverviews.length;
  const modeContext =
    input.mode === "learn"
      ? "The listener is a medical student studying these papers. Be educational, explain concepts clearly, and use occasional rhetorical questions to keep attention."
      : "The listener is a researcher reviewing these papers. Focus on methodology, key findings, and how the papers connect or disagree.";

  const systemPrompt = `You are creating a spoken audio summary for a research notebook. Write a script that will be read aloud by a text-to-speech system.

CRITICAL RULES:
1. Write in a natural, conversational tone, as if you are a knowledgeable colleague discussing these papers over coffee.
2. NEVER include citation numbers like [1] or [2].
3. NEVER include markdown formatting, headers, bullet points, or numbered lists.
4. Refer to papers by short title cues or key author names, not by paper numbers.
5. Length target: 500-800 words.
6. Structure: opening hook -> per-paper highlights -> connections/contrasts -> clear takeaway.
7. Use smooth transitions such as "Now turning to...", "What's interesting here is...", and "Building on that...".
8. If there is only one paper, go deeper into methods and findings rather than comparing.
9. End with one clear takeaway sentence.
10. ${modeContext}`;

  const userPrompt = `Generate an audio overview script for ${paperCount} research paper${paperCount > 1 ? "s" : ""}:

${overviewContext}`;

  const result = await generateText({
    model: getSmallModel(),
    system: systemPrompt,
    prompt: userPrompt,
    maxOutputTokens: 1400,
  });

  const text = sanitizeScript(result.text);
  const wordCount = countWords(text);

  // ~150 words per minute at normal speech rate
  const estimatedDurationSeconds = Math.max(1, Math.ceil((wordCount / 150) * 60));

  return {
    text,
    wordCount,
    estimatedDurationSeconds,
    generatedAt: new Date().toISOString(),
  };
}
