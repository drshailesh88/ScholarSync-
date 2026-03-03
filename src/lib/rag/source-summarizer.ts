/**
 * Source Overview Generator
 *
 * Generates structured summaries of uploaded papers for instant display.
 * Takes a paper's chunks (first 8-10 covering abstract + intro + results)
 * and produces a SourceOverview: summary, key topics, and suggested questions.
 *
 * This is the backend module for NotebookLM-parity source cards.
 * Frontend integration is separate.
 */

import { generateObject } from "ai";
import { z } from "zod";
import { getSmallModel } from "@/lib/ai/models";
import { db } from "@/lib/db";
import { papers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// ── Types ────────────────────────────────────────────────────────

export interface SourceOverview {
  /** 3-4 sentence summary grounded in the paper's content */
  summary: string;
  /** 4-6 key topic tags (short phrases, not sentences) */
  keyTopics: string[];
  /** 3 suggested questions specific to and answerable from this paper */
  suggestedQuestions: string[];
  /** ISO timestamp of when the overview was generated */
  generatedAt: string;
}

/** Minimal chunk shape needed by the summarizer */
export interface SummarizerChunk {
  text: string;
  section_type: string | null;
  chunk_index: number;
}

// ── Zod schema for structured output ─────────────────────────────

const sourceOverviewSchema = z.object({
  summary: z
    .string()
    .describe(
      "A 3-4 sentence summary of the paper. Must be grounded in the provided text — do NOT fabricate results, trial names, or statistics not present in the excerpts."
    ),
  keyTopics: z
    .array(z.string())
    .min(4)
    .max(6)
    .describe(
      "4-6 key topic tags as short phrases (e.g., 'heart failure', 'SGLT2 inhibitors', 'mortality'). Must reflect actual content, not inferred topics."
    ),
  suggestedQuestions: z
    .array(z.string())
    .min(3)
    .max(3)
    .describe(
      "3 questions a researcher might ask about this paper that are answerable from the provided excerpts. Questions should be specific to the paper's findings, not generic."
    ),
});

// ── Core function ────────────────────────────────────────────────

/**
 * Generate a structured overview from a paper's chunks.
 *
 * @param paperTitle - The paper's title for context
 * @param paperAuthors - Author list (first 3)
 * @param chunks - First 8-10 chunks ordered by chunk_index (abstract → intro → results)
 * @returns Structured SourceOverview
 */
export async function generateSourceOverview(
  paperTitle: string,
  paperAuthors: string[],
  chunks: SummarizerChunk[]
): Promise<SourceOverview> {
  // Take first 10 chunks max, sorted by chunk_index
  const selectedChunks = [...chunks]
    .sort((a, b) => a.chunk_index - b.chunk_index)
    .slice(0, 10);

  // Build the source text with section labels
  const sourceText = selectedChunks
    .map((c) => {
      const sectionLabel = c.section_type
        ? `[${c.section_type.toUpperCase()}] `
        : "";
      return `${sectionLabel}${c.text}`;
    })
    .join("\n\n");

  const systemPrompt = `You are a research paper summarizer. Given excerpts from an academic paper, generate a structured overview.

CRITICAL RULES:
1. The summary MUST only contain information present in the provided excerpts. Do NOT add results, statistics, trial names, or conclusions not in the text.
2. Key topics must reflect the actual content of the excerpts.
3. Suggested questions must be answerable from the excerpts provided — do NOT ask about information that isn't covered.
4. Keep the summary to 3-4 sentences. Be precise and factual.
5. If the excerpts are from a clinical trial, mention the intervention, population, and key findings — but ONLY what is stated in the text.`;

  const userPrompt = `Paper: "${paperTitle}" by ${paperAuthors.slice(0, 3).join(", ")}

Excerpts from the paper:
${sourceText}

Generate a structured overview of this paper.`;

  const result = await generateObject({
    model: getSmallModel(),
    schema: sourceOverviewSchema,
    system: systemPrompt,
    prompt: userPrompt,
  });

  return {
    ...result.object,
    generatedAt: new Date().toISOString(),
  };
}

// ── Storage helper ───────────────────────────────────────────────

/**
 * Store a source overview in the paper's metadata JSONB column.
 * Merges with existing metadata rather than replacing it.
 */
export async function storeSourceOverview(
  paperId: number,
  overview: SourceOverview
): Promise<void> {
  // Read current metadata
  const [row] = await db
    .select({ metadata: papers.metadata })
    .from(papers)
    .where(eq(papers.id, paperId))
    .limit(1);

  const existing =
    row?.metadata && typeof row.metadata === "object" ? row.metadata : {};

  await db
    .update(papers)
    .set({
      metadata: { ...(existing as Record<string, unknown>), sourceOverview: overview },
      updated_at: new Date(),
    })
    .where(eq(papers.id, paperId));
}

/**
 * Retrieve a stored source overview from the paper's metadata.
 * Returns null if no overview has been generated yet.
 */
export async function getStoredOverview(
  paperId: number
): Promise<SourceOverview | null> {
  const [row] = await db
    .select({ metadata: papers.metadata })
    .from(papers)
    .where(eq(papers.id, paperId))
    .limit(1);

  if (!row?.metadata || typeof row.metadata !== "object") return null;

  const meta = row.metadata as Record<string, unknown>;
  if (!meta.sourceOverview) return null;

  return meta.sourceOverview as SourceOverview;
}
