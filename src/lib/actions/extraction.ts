"use server";

import { generateObject } from "ai";
import { getSmallModel } from "@/lib/ai/models";
import { db } from "@/lib/db";
import { papers, paperExtractions, paperChunks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { z } from "zod";

/**
 * Schema for structured extraction output.
 * Maps to the paper_extractions table columns.
 */
const extractionSchema = z.object({
  population: z
    .string()
    .optional()
    .describe("Study population: who was studied (e.g., 'Adults aged 18-65 with type 2 diabetes')"),
  intervention: z
    .string()
    .optional()
    .describe("Primary intervention or exposure (e.g., 'Dapagliflozin 10mg daily')"),
  comparison: z
    .string()
    .optional()
    .describe("Comparator/control group (e.g., 'Placebo', 'Standard care')"),
  outcome: z
    .string()
    .optional()
    .describe("Primary outcome measured (e.g., 'All-cause mortality at 12 months')"),
  sample_size: z
    .number()
    .optional()
    .describe("Total number of participants/subjects enrolled"),
  study_design: z
    .string()
    .optional()
    .describe("Study design (e.g., 'Randomized controlled trial', 'Retrospective cohort', 'Meta-analysis', 'Cross-sectional survey')"),
  effect_size: z
    .string()
    .optional()
    .describe("Primary effect size with units (e.g., 'HR 0.83', 'OR 1.45', 'Mean difference -2.3 mmHg')"),
  p_value: z
    .string()
    .optional()
    .describe("P-value for primary outcome (e.g., 'p<0.001', 'p=0.034')"),
  confidence_interval: z
    .string()
    .optional()
    .describe("95% confidence interval (e.g., '95% CI 0.73-0.95')"),
  risk_of_bias: z
    .enum(["low", "moderate", "high", "unclear"])
    .optional()
    .describe("Overall risk of bias assessment"),
  evidence_level: z
    .enum(["1a", "1b", "2a", "2b", "3a", "3b", "4", "5"])
    .optional()
    .describe("Oxford CEBM evidence level"),
  key_findings: z
    .string()
    .optional()
    .describe("2-3 sentence summary of key findings"),
  limitations: z
    .string()
    .optional()
    .describe("Major limitations noted by authors or apparent from design"),
});

type ExtractionResult = z.infer<typeof extractionSchema>;

/**
 * Extract structured facts from a paper's text.
 * Uses the existing AI provider (GLM-5 or Claude) via generateObject.
 *
 * @param paperId - The paper to extract from
 * @param projectId - Optional project context for the extraction
 * @returns The extraction result and database record ID
 */
export async function extractPaperFacts(
  paperId: number,
  projectId?: number
): Promise<{ extraction: ExtractionResult; recordId: number }> {
  await getCurrentUserId();

  // Get the paper
  const [paper] = await db
    .select()
    .from(papers)
    .where(eq(papers.id, paperId));

  if (!paper) {
    throw new Error(`Paper ${paperId} not found`);
  }

  // Build the best available text for extraction
  const text = await buildExtractionText(paperId, paper);

  if (!text || text.trim().length < 50) {
    throw new Error("Insufficient text for extraction. Upload or process the PDF first.");
  }

  // Run structured extraction with the AI provider
  const { object: extraction } = await generateObject({
    model: getSmallModel(),
    schema: extractionSchema,
    system: `You are a medical research data extractor. Extract structured information from the following academic paper text. Be precise and factual. Only extract what is explicitly stated — do NOT infer or guess.

Rules:
- For PICO fields, extract exactly what is described in the paper
- For study_design, use standard epidemiological terms
- For effect_size, include the metric type (HR, OR, RR, mean difference, etc.)
- For evidence_level, use the Oxford Centre for Evidence-Based Medicine (CEBM) levels
- For risk_of_bias, assess based on study design and methodology described
- If a field is not mentioned or cannot be determined, omit it
- For p_value and confidence_interval, copy the exact values from the text`,
    prompt: `Extract structured data from this paper:\n\nTitle: ${paper.title}\n\n${text}`,
  });

  // Check if extraction already exists for this paper
  const existing = await db
    .select({ id: paperExtractions.id })
    .from(paperExtractions)
    .where(eq(paperExtractions.paper_id, paperId))
    .limit(1);

  let recordId: number;

  if (existing.length > 0) {
    // Update existing extraction
    await db
      .update(paperExtractions)
      .set({
        population: extraction.population || null,
        intervention: extraction.intervention || null,
        comparison: extraction.comparison || null,
        outcome: extraction.outcome || null,
        sample_size: extraction.sample_size || null,
        study_design: extraction.study_design || null,
        effect_size: extraction.effect_size || null,
        p_value: extraction.p_value || null,
        confidence_interval: extraction.confidence_interval || null,
        risk_of_bias: extraction.risk_of_bias || null,
        evidence_level: extraction.evidence_level || null,
        custom_extractions: {
          key_findings: extraction.key_findings,
          limitations: extraction.limitations,
        },
        extraction_model: "ai-provider",
        confidence_score: 0.85,
        human_verified: false,
      })
      .where(eq(paperExtractions.id, existing[0].id));
    recordId = existing[0].id;
  } else {
    // Insert new extraction
    const [row] = await db
      .insert(paperExtractions)
      .values({
        paper_id: paperId,
        project_id: projectId || null,
        population: extraction.population || null,
        intervention: extraction.intervention || null,
        comparison: extraction.comparison || null,
        outcome: extraction.outcome || null,
        sample_size: extraction.sample_size || null,
        study_design: extraction.study_design || null,
        effect_size: extraction.effect_size || null,
        p_value: extraction.p_value || null,
        confidence_interval: extraction.confidence_interval || null,
        risk_of_bias: extraction.risk_of_bias || null,
        evidence_level: extraction.evidence_level || null,
        custom_extractions: {
          key_findings: extraction.key_findings,
          limitations: extraction.limitations,
        },
        extraction_model: "ai-provider",
        confidence_score: 0.85,
        human_verified: false,
      })
      .returning({ id: paperExtractions.id });
    recordId = row.id;
  }

  // Mark paper as extracted
  await db
    .update(papers)
    .set({ is_extracted: true })
    .where(eq(papers.id, paperId));

  return { extraction, recordId };
}

/**
 * Batch extract facts from multiple papers.
 */
export async function batchExtractFacts(
  paperIds: number[],
  projectId?: number
): Promise<{ success: number; failed: number; errors: string[] }> {
  await getCurrentUserId();

  let success = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const paperId of paperIds) {
    try {
      await extractPaperFacts(paperId, projectId);
      success++;
    } catch (error) {
      failed++;
      errors.push(
        `Paper ${paperId}: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  return { success, failed, errors };
}

/**
 * Mark an extraction as human-verified.
 */
export async function verifyExtraction(extractionId: number): Promise<void> {
  await getCurrentUserId();

  await db
    .update(paperExtractions)
    .set({ human_verified: true })
    .where(eq(paperExtractions.id, extractionId));
}

/**
 * Get the extraction for a paper, if it exists.
 */
export async function getExtractionForPaper(
  paperId: number
): Promise<typeof paperExtractions.$inferSelect | null> {
  await getCurrentUserId();

  const [extraction] = await db
    .select()
    .from(paperExtractions)
    .where(eq(paperExtractions.paper_id, paperId))
    .limit(1);

  return extraction || null;
}

/**
 * Build the best available text for extraction from a paper.
 * Priority: full_text_plain > chunks > abstract
 */
async function buildExtractionText(
  paperId: number,
  paper: { abstract: string | null; full_text_plain: string | null; title: string }
): Promise<string> {
  // Best: full text from PDF
  if (paper.full_text_plain && paper.full_text_plain.length > 200) {
    // Truncate to ~4000 words to stay within model context
    const words = paper.full_text_plain.split(/\s+/);
    if (words.length > 4000) {
      return words.slice(0, 4000).join(" ");
    }
    return paper.full_text_plain;
  }

  // Good: concatenated chunks
  const chunks = await db
    .select({ text: paperChunks.text, section_type: paperChunks.section_type })
    .from(paperChunks)
    .where(eq(paperChunks.paper_id, paperId))
    .orderBy(paperChunks.chunk_index);

  if (chunks.length > 0) {
    const chunkText = chunks.map((c) => c.text).join("\n\n");
    const words = chunkText.split(/\s+/);
    if (words.length > 4000) {
      return words.slice(0, 4000).join(" ");
    }
    return chunkText;
  }

  // Minimum: abstract only
  return paper.abstract || "";
}
