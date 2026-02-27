/**
 * AMSTAR 2 Pre-Submission Self-Assessment
 *
 * Implements the AMSTAR 2 (A MeaSurement Tool to Assess systematic Reviews)
 * updated tool (Shea et al., BMJ 2017):
 * - 16-item checklist covering methodological quality of systematic reviews
 * - 7 critical domains that drive the overall confidence rating
 * - AI-powered assessment against actual project data
 * - Overall confidence: High / Moderate / Low / Critically Low
 */

import { generateObject } from "ai";
import { getModel } from "@/lib/ai/models";
import { db } from "@/lib/db";
import {
  systematicReviewConfig,
  screeningDecisions,
  riskOfBias,
  metaAnalysisResults,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

// ---------------------------------------------------------------------------
// AMSTAR 2 Item Definitions — all 16 items (Shea et al., BMJ 2017)
// ---------------------------------------------------------------------------

export interface AMSTAR2Item {
  itemNumber: number;
  domain: string;
  question: string;
  isCritical: boolean; // 7 of 16 items are critical
}

export const AMSTAR2_ITEMS: AMSTAR2Item[] = [
  {
    itemNumber: 1,
    domain: "Research questions",
    question:
      "Did the research questions and inclusion criteria for the review include the components of PICO?",
    isCritical: false,
  },
  {
    itemNumber: 2,
    domain: "Protocol",
    question:
      "Was the review protocol registered before or at the time of commencement, and if registered, was the protocol registered before commencement of the review?",
    isCritical: true,
  },
  {
    itemNumber: 3,
    domain: "Study design",
    question:
      "Did the review authors explain their selection of the study designs for inclusion in the review?",
    isCritical: false,
  },
  {
    itemNumber: 4,
    domain: "Search strategy",
    question:
      "Did the review authors use a comprehensive literature search strategy?",
    isCritical: true,
  },
  {
    itemNumber: 5,
    domain: "Study selection",
    question:
      "Did the review authors perform study selection in duplicate?",
    isCritical: false,
  },
  {
    itemNumber: 6,
    domain: "Data extraction",
    question:
      "Did the review authors perform data extraction in duplicate?",
    isCritical: false,
  },
  {
    itemNumber: 7,
    domain: "Excluded studies",
    question:
      "Did the review authors provide a list of excluded studies and justify the exclusions?",
    isCritical: true,
  },
  {
    itemNumber: 8,
    domain: "Study details",
    question:
      "Did the review authors describe the included studies in adequate detail?",
    isCritical: false,
  },
  {
    itemNumber: 9,
    domain: "Risk of bias",
    question:
      "Did the review authors use a satisfactory technique for assessing the risk of bias (RoB) in individual studies that were included in the review?",
    isCritical: true,
  },
  {
    itemNumber: 10,
    domain: "Funding sources",
    question:
      "Did the review authors report on the sources of funding for the studies included in the review?",
    isCritical: false,
  },
  {
    itemNumber: 11,
    domain: "Meta-analysis methods",
    question:
      "If meta-analysis was performed, did the review authors use appropriate methods for statistical combination of results?",
    isCritical: true,
  },
  {
    itemNumber: 12,
    domain: "RoB impact",
    question:
      "If meta-analysis was performed, did the review authors assess the potential impact of RoB in individual studies on the results of the meta-analysis or other evidence synthesis?",
    isCritical: false,
  },
  {
    itemNumber: 13,
    domain: "RoB discussion",
    question:
      "Did the review authors account for RoB in individual studies when interpreting/discussing the results of the review?",
    isCritical: true,
  },
  {
    itemNumber: 14,
    domain: "Heterogeneity",
    question:
      "Did the review authors provide a satisfactory explanation for, and discussion of, any heterogeneity observed in the results of the review?",
    isCritical: false,
  },
  {
    itemNumber: 15,
    domain: "Publication bias",
    question:
      "If they performed quantitative synthesis, did the review authors carry out an adequate investigation of publication bias (small study bias) and discuss its likely impact on the results of the review?",
    isCritical: true,
  },
  {
    itemNumber: 16,
    domain: "Conflicts of interest",
    question:
      "Did the review authors report any potential sources of conflict of interest, including any funding they received for conducting the review?",
    isCritical: false,
  },
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AMSTAR2Rating = "yes" | "partial_yes" | "no";
export type OverallConfidence = "high" | "moderate" | "low" | "critically_low";

export interface AMSTAR2ItemResult {
  item: AMSTAR2Item;
  rating: AMSTAR2Rating;
  rationale: string;
  suggestion: string;
}

export interface AMSTAR2Assessment {
  items: AMSTAR2ItemResult[];
  overallConfidence: OverallConfidence;
  criticalWeaknesses: number[]; // item numbers of critical domains rated "no"
  nonCriticalWeaknesses: number[]; // item numbers of non-critical domains rated "no"
  assessedAt: string;
}

// ---------------------------------------------------------------------------
// Zod schema for AI output
// ---------------------------------------------------------------------------

const amstar2ItemResultSchema = z.object({
  itemNumber: z.number().int().min(1).max(16),
  rating: z.enum(["yes", "partial_yes", "no"]),
  rationale: z
    .string()
    .describe("Evidence-based reasoning for the rating, referencing the project data"),
  suggestion: z
    .string()
    .describe(
      "Specific actionable suggestion to improve the score, or empty string if already 'yes'"
    ),
});

const amstar2BatchSchema = z.object({
  items: z.array(amstar2ItemResultSchema),
});

// ---------------------------------------------------------------------------
// Helper: compute overall confidence from weakness counts
// ---------------------------------------------------------------------------

function computeOverallConfidence(
  criticalWeaknesses: number,
  nonCriticalWeaknesses: number
): OverallConfidence {
  if (criticalWeaknesses > 1) return "critically_low";
  if (criticalWeaknesses === 1) return "low";
  if (nonCriticalWeaknesses > 1) return "moderate";
  return "high";
}

// ---------------------------------------------------------------------------
// Helper: gather project data for context
// ---------------------------------------------------------------------------

async function gatherProjectContext(projectId: number): Promise<string> {
  const [config, screeningRows, robRows, maRows] = await Promise.all([
    db
      .select()
      .from(systematicReviewConfig)
      .where(eq(systematicReviewConfig.projectId, projectId))
      .limit(1),
    db
      .select()
      .from(screeningDecisions)
      .where(eq(screeningDecisions.projectId, projectId))
      .limit(500),
    db
      .select()
      .from(riskOfBias)
      .where(eq(riskOfBias.projectId, projectId))
      .limit(100),
    db
      .select()
      .from(metaAnalysisResults)
      .where(eq(metaAnalysisResults.projectId, projectId))
      .limit(20),
  ]);

  const cfg = config[0] ?? null;
  const pico = cfg?.pico as Record<string, string> | null;
  const protocolRegistration = cfg?.protocolRegistration ?? null;
  const protocolDoi = cfg?.protocolDoi ?? null;
  const searchDatabases = cfg?.searchDatabases as string[] | null;
  const searchStrategy = cfg?.searchStrategy as Record<string, unknown> | null;

  const includedCount = screeningRows.filter(
    (d) => d.decision === "include"
  ).length;
  const excludedCount = screeningRows.filter(
    (d) => d.decision === "exclude"
  ).length;
  const dualScreeningCount = screeningRows.length;

  const robCount = robRows.length;
  const hasRoB = robCount > 0;
  const robData = robRows.slice(0, 5).map((r) => {
    return `Paper ${r.paperId} — domain: ${r.domain}, judgment: ${r.judgment ?? "unset"}, support: ${(r.supportText ?? "").slice(0, 120)}`;
  });

  const _hasMetaAnalysis = maRows.length > 0;
  const maNames = maRows.map((m) => m.analysisName).filter(Boolean).join(", ");
  const heterogeneity = maRows
    .filter((m) => m.heterogeneityI2 !== null)
    .map((m) => `${m.analysisName}: I²=${m.heterogeneityI2}%`)
    .join(", ");

  const sections: string[] = [];

  sections.push(`## Project Configuration
- Protocol registered: ${protocolRegistration ? `Yes (ID: ${protocolRegistration})` : "No"}
- Protocol DOI: ${protocolDoi ?? "Not provided"}
- Search databases: ${searchDatabases ? searchDatabases.join(", ") : "Not specified"}
- Search strategy stored: ${searchStrategy ? "Yes" : "No"}`);

  if (pico) {
    sections.push(`## PICO Framework
- Population: ${pico.population ?? "Not specified"}
- Intervention: ${pico.intervention ?? "Not specified"}
- Comparison: ${pico.comparison ?? "Not specified"}
- Outcome: ${pico.outcome ?? "Not specified"}`);
  } else {
    sections.push("## PICO Framework\n- Not defined in project configuration.");
  }

  sections.push(`## Screening Statistics
- Total screening decisions recorded: ${dualScreeningCount}
- Studies included: ${includedCount}
- Studies excluded: ${excludedCount}
- Dual (duplicate) screening records present: ${dualScreeningCount > 0 ? "Yes" : "Unknown — no decisions recorded"}`);

  sections.push(`## Risk of Bias Assessment
- RoB assessments conducted: ${robCount}
- Has any RoB data: ${hasRoB ? "Yes" : "No"}
${hasRoB ? `- Sample assessments:\n  ${robData.join("\n  ")}` : ""}`);

  sections.push(`## Meta-Analysis
- Meta-analyses performed: ${maRows.length}
- Analysis names: ${maNames || "None"}
- Heterogeneity data: ${heterogeneity || "None available"}`);

  return sections.join("\n\n");
}

// ---------------------------------------------------------------------------
// AI-powered AMSTAR 2 assessment
// ---------------------------------------------------------------------------

export async function assessAMSTAR2(
  projectId: number
): Promise<AMSTAR2Assessment> {
  const projectContext = await gatherProjectContext(projectId);

  // Process items in two batches of 8 to keep prompt size manageable
  const batchSize = 8;
  const allRatings: Map<number, { rating: AMSTAR2Rating; rationale: string; suggestion: string }> =
    new Map();

  for (let i = 0; i < AMSTAR2_ITEMS.length; i += batchSize) {
    const batch = AMSTAR2_ITEMS.slice(i, i + batchSize);

    const itemDescriptions = batch
      .map(
        (item) =>
          `Item ${item.itemNumber} [${item.isCritical ? "CRITICAL" : "non-critical"}] — ${item.domain}:\n  ${item.question}`
      )
      .join("\n\n");

    const prompt = `You are an expert systematic review methodologist applying the AMSTAR 2 tool (Shea et al., BMJ 2017).

Assess the methodological quality of this systematic review project against the AMSTAR 2 items listed below.

Use the following project data to base your ratings:

${projectContext}

## AMSTAR 2 Rating Scale
- "yes": The criterion is fully met with adequate evidence
- "partial_yes": The criterion is partially met or information is incomplete
- "no": The criterion is not met or no relevant information is present

## Items to Rate
${itemDescriptions}

For each item:
1. Assign the appropriate rating based strictly on the available project data
2. Provide a concise rationale citing specific evidence from the project data
3. If the rating is not "yes", provide a specific, actionable suggestion to address the gap

Return ratings for exactly these item numbers: ${batch.map((b) => b.itemNumber).join(", ")}`;

    const { object } = await generateObject({
      model: getModel(),
      schema: amstar2BatchSchema,
      prompt,
    });

    for (const result of object.items) {
      allRatings.set(result.itemNumber, {
        rating: result.rating,
        rationale: result.rationale,
        suggestion: result.suggestion,
      });
    }
  }

  // Build the full item results, filling in any AI-missed items
  const items: AMSTAR2ItemResult[] = AMSTAR2_ITEMS.map((item) => {
    const aiResult = allRatings.get(item.itemNumber);
    return {
      item,
      rating: aiResult?.rating ?? "no",
      rationale:
        aiResult?.rationale ??
        "This item could not be automatically evaluated. Please review manually.",
      suggestion:
        aiResult?.suggestion ??
        "Manual review required for this item.",
    };
  });

  // Classify weaknesses
  const criticalWeaknesses = items
    .filter((r) => r.item.isCritical && r.rating === "no")
    .map((r) => r.item.itemNumber);

  const nonCriticalWeaknesses = items
    .filter((r) => !r.item.isCritical && r.rating === "no")
    .map((r) => r.item.itemNumber);

  const overallConfidence = computeOverallConfidence(
    criticalWeaknesses.length,
    nonCriticalWeaknesses.length
  );

  const assessment: AMSTAR2Assessment = {
    items,
    overallConfidence,
    criticalWeaknesses,
    nonCriticalWeaknesses,
    assessedAt: new Date().toISOString(),
  };

  // Persist to the project's systematic review config settings JSONB field
  const existing = await db
    .select()
    .from(systematicReviewConfig)
    .where(eq(systematicReviewConfig.projectId, projectId))
    .limit(1);

  if (existing.length > 0) {
    const currentSettings =
      (existing[0].settings as Record<string, unknown>) ?? {};
    await db
      .update(systematicReviewConfig)
      .set({
        settings: {
          ...currentSettings,
          amstar2Assessment: assessment,
        },
        updatedAt: new Date(),
      })
      .where(eq(systematicReviewConfig.projectId, projectId));
  } else {
    await db.insert(systematicReviewConfig).values({
      projectId,
      settings: { amstar2Assessment: assessment },
    });
  }

  return assessment;
}

// ---------------------------------------------------------------------------
// Get stored AMSTAR 2 assessment for a project
// ---------------------------------------------------------------------------

export async function getAMSTAR2Assessment(
  projectId: number
): Promise<AMSTAR2Assessment | null> {
  const rows = await db
    .select({ settings: systematicReviewConfig.settings })
    .from(systematicReviewConfig)
    .where(eq(systematicReviewConfig.projectId, projectId))
    .limit(1);

  if (rows.length === 0) return null;

  const settings = rows[0].settings as Record<string, unknown> | null;
  if (!settings?.amstar2Assessment) return null;

  return settings.amstar2Assessment as AMSTAR2Assessment;
}

// ---------------------------------------------------------------------------
// Labels and constants for UI use
// ---------------------------------------------------------------------------

export const AMSTAR2_RATING_LABELS: Record<AMSTAR2Rating, string> = {
  yes: "Yes",
  partial_yes: "Partial Yes",
  no: "No",
};

export const CONFIDENCE_LABELS: Record<OverallConfidence, string> = {
  high: "High",
  moderate: "Moderate",
  low: "Low",
  critically_low: "Critically Low",
};
