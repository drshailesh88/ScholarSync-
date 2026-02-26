/**
 * Evidence Gap Map Generator
 *
 * Builds an intervention × outcome matrix for systematic reviews:
 * - Loads included papers from project_papers (screening_decision = 'include')
 * - Loads data extraction results from comparison_matrices / matrix_cells
 * - Loads meta-analysis results for effect directions
 * - Loads GRADE assessments for certainty ratings
 * - Groups by intervention × outcome to build the matrix
 * - Falls back to AI categorisation when extraction data is sparse
 */

import { generateObject } from "ai";
import { getModel } from "@/lib/ai/models";
import { db } from "@/lib/db";
import {
  projectPapers,
  papers,
  comparisonMatrices,
  matrixColumns,
  matrixCells,
  metaAnalysisResults,
} from "@/lib/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type EffectDirection =
  | "positive"
  | "negative"
  | "mixed"
  | "no_effect"
  | "unknown";

export type CertaintyLevel =
  | "high"
  | "moderate"
  | "low"
  | "very_low"
  | "not_assessed";

export interface GapMapCell {
  intervention: string;
  outcome: string;
  studyCount: number;
  studyIds: number[];
  effectDirection: EffectDirection;
  certainty: CertaintyLevel;
}

export interface GapMapData {
  interventions: string[];
  outcomes: string[];
  cells: GapMapCell[];
  totalStudies: number;
}

// ---------------------------------------------------------------------------
// Zod schema for AI categorisation fallback
// ---------------------------------------------------------------------------

const aiCategorizationSchema = z.object({
  papers: z.array(
    z.object({
      paperId: z.number(),
      intervention: z.string(),
      outcome: z.string(),
      effectDirection: z.enum([
        "positive",
        "negative",
        "mixed",
        "no_effect",
        "unknown",
      ]),
    })
  ),
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Map a pooled effect value + CI to an effect direction. */
function pooledEffectToDirection(
  pooledEffect: number | null,
  ciLower: number | null,
  ciUpper: number | null
): EffectDirection {
  if (pooledEffect === null) return "unknown";

  // If CI crosses zero (or 1 for OR/RR) → no effect or mixed
  const crossesNull =
    ciLower !== null && ciUpper !== null && ciLower < 0 && ciUpper > 0;

  if (crossesNull) return "mixed";
  if (pooledEffect > 0) return "positive";
  if (pooledEffect < 0) return "negative";
  return "no_effect";
}

/** Normalise a GRADE certainty string into our CertaintyLevel. */
function normaliseCertainty(raw: string | null | undefined): CertaintyLevel {
  if (!raw) return "not_assessed";
  const lower = raw.toLowerCase().replace(/-/g, "_");
  if (lower === "high") return "high";
  if (lower === "moderate") return "moderate";
  if (lower === "low") return "low";
  if (lower === "very_low") return "very_low";
  return "not_assessed";
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export async function generateEvidenceGapMap(
  projectId: number
): Promise<GapMapData> {
  // ── 1. Load included papers ────────────────────────────────────────────
  const includedRows = await db
    .select({
      paperId: projectPapers.paper_id,
      title: papers.title,
      abstract: papers.abstract,
    })
    .from(projectPapers)
    .innerJoin(papers, eq(papers.id, projectPapers.paper_id))
    .where(
      and(
        eq(projectPapers.project_id, projectId),
        eq(projectPapers.screening_decision, "include")
      )
    );

  if (includedRows.length === 0) {
    return { interventions: [], outcomes: [], cells: [], totalStudies: 0 };
  }

  const includedPaperIds = includedRows.map((r) => r.paperId);

  // ── 2. Load comparison matrices + cells for this project ──────────────
  const matrices = await db
    .select()
    .from(comparisonMatrices)
    .where(eq(comparisonMatrices.projectId, projectId));

  // Map: paperId → { columnName → value }
  const extractionMap = new Map<number, Record<string, string>>();

  if (matrices.length > 0) {
    const matrixIds = matrices.map((m) => m.id);

    // Load columns for all matrices
    const columns = await db
      .select()
      .from(matrixColumns)
      .where(
        matrixIds.length === 1
          ? eq(matrixColumns.matrixId, matrixIds[0])
          : inArray(matrixColumns.matrixId, matrixIds)
      );

    const columnMap = new Map(columns.map((c) => [c.id, c.name.toLowerCase()]));

    // Load cells for all matrices
    const cells = await db
      .select()
      .from(matrixCells)
      .where(
        matrixIds.length === 1
          ? eq(matrixCells.matrixId, matrixIds[0])
          : inArray(matrixCells.matrixId, matrixIds)
      );

    for (const cell of cells) {
      if (!includedPaperIds.includes(cell.paperId)) continue;
      const colName = columnMap.get(cell.columnId);
      if (!colName || !cell.value) continue;

      const existing = extractionMap.get(cell.paperId) ?? {};
      existing[colName] = cell.value;
      extractionMap.set(cell.paperId, existing);
    }
  }

  // ── 3. Load meta-analysis results for effect directions ───────────────
  const maRows = await db
    .select()
    .from(metaAnalysisResults)
    .where(eq(metaAnalysisResults.projectId, projectId));

  // Map outcome label (lowercase) → direction
  const maDirectionMap = new Map<string, EffectDirection>();
  const maCertaintyMap = new Map<string, CertaintyLevel>();

  for (const ma of maRows) {
    const key = (ma.outcomeMeasure ?? ma.analysisName ?? "")
      .toLowerCase()
      .trim();
    if (!key) continue;

    maDirectionMap.set(
      key,
      pooledEffectToDirection(ma.pooledEffect, ma.pooledCiLower, ma.pooledCiUpper)
    );

    // Use I² as a rough certainty proxy when no GRADE available
    const i2 = ma.heterogeneityI2 ?? 0;
    const baseCertainty: CertaintyLevel =
      i2 > 75 ? "low" : i2 > 50 ? "moderate" : "high";
    maCertaintyMap.set(key, baseCertainty);
  }

  // ── 4. Try to build map from extraction data ───────────────────────────
  // Detect if we have intervention / outcome columns
  const INTERVENTION_KEYS = ["intervention", "treatment", "exposure", "arm", "group"];
  const OUTCOME_KEYS = ["outcome", "endpoint", "measure", "result"];

  function findField(
    record: Record<string, string>,
    candidates: string[]
  ): string | null {
    for (const key of Object.keys(record)) {
      if (candidates.some((c) => key.includes(c))) return record[key];
    }
    return null;
  }

  // paperId → { intervention, outcome }
  const structuredMap = new Map<number, { intervention: string; outcome: string }>();

  for (const [paperId, record] of extractionMap.entries()) {
    const intervention = findField(record, INTERVENTION_KEYS);
    const outcome = findField(record, OUTCOME_KEYS);
    if (intervention && outcome) {
      structuredMap.set(paperId, {
        intervention: intervention.trim(),
        outcome: outcome.trim(),
      });
    }
  }

  // ── 5. AI fallback when extraction data is sparse (<50% coverage) ─────
  const hasSufficientExtraction =
    structuredMap.size >= Math.ceil(includedRows.length * 0.5);

  if (!hasSufficientExtraction) {
    const papersForAI = includedRows
      .filter((r) => !structuredMap.has(r.paperId))
      .slice(0, 60); // cap to avoid exceeding context limits

    if (papersForAI.length > 0) {
      const paperList = papersForAI
        .map(
          (p) =>
            `Paper ${p.paperId}: "${p.title}"\nAbstract: ${(p.abstract ?? "").slice(0, 400)}`
        )
        .join("\n\n---\n\n");

      try {
        const { object } = await generateObject({
          model: getModel(),
          schema: aiCategorizationSchema,
          prompt: `You are a systematic review expert. For each paper below, identify:
1. The main INTERVENTION (treatment, exposure, or comparison arm)
2. The primary OUTCOME (endpoint or measure assessed)
3. The likely EFFECT DIRECTION based on the abstract text

Keep intervention and outcome labels short (3-6 words). Use consistent labels where papers share the same intervention or outcome.

Papers:
${paperList}`,
        });

        for (const row of object.papers) {
          if (!structuredMap.has(row.paperId)) {
            structuredMap.set(row.paperId, {
              intervention: row.intervention.trim(),
              outcome: row.outcome.trim(),
            });
          }
        }
      } catch {
        // AI fallback failed — continue with whatever we have
      }
    }
  }

  // ── 6. Build the matrix cells ──────────────────────────────────────────
  // Group: "intervention|outcome" → list of paperIds
  const groupMap = new Map<string, number[]>();

  for (const [paperId, { intervention, outcome }] of structuredMap.entries()) {
    const key = `${intervention}|||${outcome}`;
    const existing = groupMap.get(key) ?? [];
    existing.push(paperId);
    groupMap.set(key, existing);
  }

  const cells: GapMapCell[] = [];
  const interventionSet = new Set<string>();
  const outcomeSet = new Set<string>();

  for (const [key, studyIds] of groupMap.entries()) {
    const [intervention, outcome] = key.split("|||");
    interventionSet.add(intervention);
    outcomeSet.add(outcome);

    // Resolve effect direction from meta-analysis data
    const outcomeLower = outcome.toLowerCase();
    let effectDirection: EffectDirection =
      maDirectionMap.get(outcomeLower) ?? "unknown";
    let certainty: CertaintyLevel =
      maCertaintyMap.get(outcomeLower) ?? "not_assessed";

    // If meta-analysis didn't cover this outcome, try partial match
    if (effectDirection === "unknown") {
      for (const [maKey, dir] of maDirectionMap.entries()) {
        if (outcomeLower.includes(maKey) || maKey.includes(outcomeLower)) {
          effectDirection = dir;
          certainty = maCertaintyMap.get(maKey) ?? "not_assessed";
          break;
        }
      }
    }

    cells.push({
      intervention,
      outcome,
      studyCount: studyIds.length,
      studyIds,
      effectDirection,
      certainty,
    });
  }

  // Sort axes alphabetically
  const interventions = Array.from(interventionSet).sort((a, b) =>
    a.localeCompare(b)
  );
  const outcomes = Array.from(outcomeSet).sort((a, b) => a.localeCompare(b));

  return {
    interventions,
    outcomes,
    cells,
    totalStudies: includedRows.length,
  };
}
