/**
 * Structured Data Extraction for Deep Research.
 *
 * Uses AI (claude-haiku via getSmallModel) to extract structured data
 * from paper abstracts: study design, sample size, effect sizes,
 * p-values, population characteristics, and follow-up duration.
 */

import { generateText } from "ai";
import { getSmallModel } from "@/lib/ai/models";
import type { UnifiedSearchResult } from "@/types/search";
import type { ExtractedPaperData, ResearchProgressCallback } from "./types";

// ── Extraction Prompt ─────────────────────────────────────────────────

const EXTRACTION_SYSTEM_PROMPT = `You are a research data extraction assistant. Extract structured information from paper abstracts.

Rules:
- ONLY extract information explicitly stated in the abstract
- For numerical values (sample sizes, effect sizes, p-values), copy exactly as written
- If a field cannot be determined, omit it from the response
- Be precise and conservative — do not infer or speculate

Respond in JSON format:
{
  "studyDesign": "e.g., RCT, cohort study, meta-analysis, cross-sectional, case-control",
  "sampleSize": 1234,
  "effectSizes": ["HR 0.75 (95% CI 0.60-0.93)", "OR 1.5"],
  "pValues": ["p=0.008", "p<0.001"],
  "populationCharacteristics": "brief description of study population",
  "followUpDuration": "e.g., 12 months, median 3.5 years",
  "keyFindings": ["finding 1", "finding 2"]
}

Only include fields that have extractable data. Return empty JSON {} if the abstract contains no extractable structured data.`;

// ── Helpers ───────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseExtractionJSON(text: string): Partial<ExtractedPaperData> | null {
  let jsonStr = text.trim();

  // Strip markdown code block if present
  const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    jsonStr = codeBlockMatch[1].trim();
  }

  try {
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}

/**
 * Extract structured data from a single paper's abstract.
 */
async function extractSinglePaper(
  paper: UnifiedSearchResult
): Promise<ExtractedPaperData | null> {
  if (!paper.abstract) return null;

  const paperId = paper.doi || paper.pmid || paper.s2Id || paper.title.slice(0, 50);

  try {
    const { text } = await generateText({
      model: getSmallModel(),
      system: EXTRACTION_SYSTEM_PROMPT,
      prompt: `Paper title: "${paper.title}"
Authors: ${paper.authors?.slice(0, 5).join(", ") || "Unknown"}
Year: ${paper.year || "Unknown"}
Journal: ${paper.journal || "Unknown"}

Abstract:
${paper.abstract}`,
      maxOutputTokens: 1000,
    });

    const parsed = parseExtractionJSON(text);
    if (!parsed || Object.keys(parsed).length === 0) return null;

    return {
      paperId,
      studyDesign: parsed.studyDesign,
      sampleSize: parsed.sampleSize,
      effectSizes: parsed.effectSizes,
      pValues: parsed.pValues,
      populationCharacteristics: parsed.populationCharacteristics,
      followUpDuration: parsed.followUpDuration,
      keyFindings: parsed.keyFindings,
    };
  } catch (error) {
    console.warn(`[DataExtraction] Failed to extract data for "${paper.title}":`, error);
    return null;
  }
}

// ── Public API ────────────────────────────────────────────────────────

/**
 * Extract structured data from multiple papers in parallel batches.
 *
 * Processes papers in batches of 5 using getSmallModel() (claude-haiku)
 * for speed. Returns a Map of paper identifier -> ExtractedPaperData.
 */
export async function extractStructuredData(
  papers: UnifiedSearchResult[],
  onProgress?: ResearchProgressCallback
): Promise<Map<string, ExtractedPaperData>> {
  const results = new Map<string, ExtractedPaperData>();
  const papersWithAbstracts = papers.filter((p) => p.abstract);

  if (papersWithAbstracts.length === 0) {
    onProgress?.("data-extraction", "No papers with abstracts to extract data from");
    return results;
  }

  const batchSize = 5;
  onProgress?.(
    "data-extraction",
    `Extracting structured data from ${papersWithAbstracts.length} papers...`
  );

  for (let i = 0; i < papersWithAbstracts.length; i += batchSize) {
    const batch = papersWithAbstracts.slice(i, i + batchSize);

    const batchResults = await Promise.allSettled(
      batch.map((paper) => extractSinglePaper(paper))
    );

    for (const result of batchResults) {
      if (result.status === "fulfilled" && result.value) {
        results.set(result.value.paperId, result.value);
      }
    }

    const processed = Math.min(i + batchSize, papersWithAbstracts.length);
    onProgress?.(
      "data-extraction",
      `Extracted data from ${processed}/${papersWithAbstracts.length} papers (${results.size} successful)`
    );

    // Small delay between batches to avoid overwhelming the AI API
    if (i + batchSize < papersWithAbstracts.length) {
      await sleep(200);
    }
  }

  onProgress?.(
    "data-extraction",
    `Data extraction complete: ${results.size}/${papersWithAbstracts.length} papers extracted`
  );

  return results;
}
