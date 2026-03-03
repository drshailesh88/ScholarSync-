/**
 * RALPH Integrity Scorer
 *
 * Scoring dimensions (1-10 per dimension):
 *   - Sensitivity  (30%): Catches AI-generated text (true positive rate)
 *   - Specificity  (30%): Correctly passes human text (true negative rate)
 *   - Actionability (15%): Flagged passages are useful, suggestions help fix issues
 *   - Citation accuracy (15%): Citation audit correctly validates/invalidates references
 *   - Robustness  (10%): Survives adversarial attacks (humanizer, paraphrasing)
 *
 * Per-cycle scoring focuses on the relevant dimensions:
 *   Cycle 1 (human text): primarily specificity + actionability
 *   Cycle 2 (AI text): primarily sensitivity + actionability
 */

import type { AIDetectionResult } from "../../types";

// ── Types ────────────────────────────────────────────────────────────

export interface DimensionScores {
  sensitivity: number;
  specificity: number;
  actionability: number;
  citationAccuracy: number;
  robustness: number;
}

export interface CaseScore {
  testId: string;
  name: string;
  dimensions: DimensionScores;
  weighted: number;
  pass: boolean;
  details: ScoreDetail[];
}

export interface ScoreDetail {
  dimension: keyof DimensionScores;
  metric: string;
  value: number | string;
  target: string;
  pass: boolean;
}

export interface CycleScore {
  cycleId: string;
  name: string;
  phase: number;
  caseScores: CaseScore[];
  avgDimensions: DimensionScores;
  weightedAvg: number;
  allPassing: boolean;
  timestamp: string;
}

// ── Weights ──────────────────────────────────────────────────────────

const WEIGHTS: Record<keyof DimensionScores, number> = {
  sensitivity: 0.30,
  specificity: 0.30,
  actionability: 0.15,
  citationAccuracy: 0.15,
  robustness: 0.10,
};

export function computeWeighted(dims: DimensionScores): number {
  return (
    dims.sensitivity * WEIGHTS.sensitivity +
    dims.specificity * WEIGHTS.specificity +
    dims.actionability * WEIGHTS.actionability +
    dims.citationAccuracy * WEIGHTS.citationAccuracy +
    dims.robustness * WEIGHTS.robustness
  );
}

// ── Specificity Scorer (Cycle 1: Human Text) ─────────────────────────

export interface SpecificityInput {
  result: AIDetectionResult;
  expectedMinHuman: number;
  expectedMaxFlagged: number;
}

export function scoreSpecificityCase(input: SpecificityInput): {
  dimensions: DimensionScores;
  details: ScoreDetail[];
} {
  const { result, expectedMinHuman, expectedMaxFlagged } = input;
  const details: ScoreDetail[] = [];

  // Specificity: how well does the detector pass human text?
  // Higher humanScore = better specificity
  let specificity: number;
  if (result.humanScore >= 85) specificity = 10;
  else if (result.humanScore >= 80) specificity = 9;
  else if (result.humanScore >= 75) specificity = 8;
  else if (result.humanScore >= 70) specificity = 7;
  else if (result.humanScore >= 65) specificity = 6;
  else if (result.humanScore >= 55) specificity = 5;
  else if (result.humanScore >= 45) specificity = 4;
  else if (result.humanScore >= 35) specificity = 3;
  else specificity = 2;

  details.push({
    dimension: "specificity",
    metric: "humanScore",
    value: result.humanScore,
    target: `≥ ${expectedMinHuman}%`,
    pass: result.humanScore >= expectedMinHuman,
  });

  details.push({
    dimension: "specificity",
    metric: "overallRisk",
    value: result.overallRisk,
    target: "low",
    pass: result.overallRisk === "low",
  });

  // Flagged paragraphs (false positives)
  const flagged = result.paragraphs.filter((p) => p.humanProbability < 50);
  details.push({
    dimension: "specificity",
    metric: "flaggedParagraphs",
    value: flagged.length,
    target: `≤ ${expectedMaxFlagged}`,
    pass: flagged.length <= expectedMaxFlagged,
  });

  // Actionability: are the suggestions/flags useful (even on human text)?
  // For human text, actionability means NOT giving misleading flags
  const misleadingFlags = result.paragraphs.filter(
    (p) => p.humanProbability < 50 && p.flags.length > 0
  );
  let actionability: number;
  if (misleadingFlags.length === 0) actionability = 10;
  else if (misleadingFlags.length <= 1) actionability = 7;
  else if (misleadingFlags.length <= 2) actionability = 5;
  else actionability = 3;

  details.push({
    dimension: "actionability",
    metric: "misleadingFlags",
    value: misleadingFlags.length,
    target: "0 (no false AI flags on human text)",
    pass: misleadingFlags.length === 0,
  });

  // Sensitivity, citation accuracy, robustness are N/A for Cycle 1
  // Score them as neutral (5) so they don't drag the average
  return {
    dimensions: {
      specificity,
      actionability,
      sensitivity: 5, // N/A for this cycle
      citationAccuracy: 5, // N/A for this cycle
      robustness: 5, // N/A for this cycle
    },
    details,
  };
}

// ── Sensitivity Scorer (Cycle 2: AI Text) ────────────────────────────

export interface SensitivityInput {
  result: AIDetectionResult;
  expectedMaxHuman: number;
  expectedMinFlagged: number;
}

export function scoreSensitivityCase(input: SensitivityInput): {
  dimensions: DimensionScores;
  details: ScoreDetail[];
} {
  const { result, expectedMaxHuman, expectedMinFlagged } = input;
  const details: ScoreDetail[] = [];

  // Sensitivity: lower humanScore = better detection of AI text
  let sensitivity: number;
  if (result.humanScore <= 10) sensitivity = 10;
  else if (result.humanScore <= 15) sensitivity = 9;
  else if (result.humanScore <= 20) sensitivity = 8;
  else if (result.humanScore <= 25) sensitivity = 7;
  else if (result.humanScore <= 30) sensitivity = 6;
  else if (result.humanScore <= 40) sensitivity = 5;
  else if (result.humanScore <= 50) sensitivity = 4;
  else sensitivity = 2;

  details.push({
    dimension: "sensitivity",
    metric: "humanScore",
    value: result.humanScore,
    target: `≤ ${expectedMaxHuman}%`,
    pass: result.humanScore <= expectedMaxHuman,
  });

  details.push({
    dimension: "sensitivity",
    metric: "overallRisk",
    value: result.overallRisk,
    target: "high",
    pass: result.overallRisk === "high",
  });

  const flagged = result.paragraphs.filter((p) => p.humanProbability < 50);
  details.push({
    dimension: "sensitivity",
    metric: "flaggedParagraphs",
    value: flagged.length,
    target: `≥ ${expectedMinFlagged}`,
    pass: flagged.length >= expectedMinFlagged,
  });

  // Actionability: do the flags actually explain WHY the text looks AI?
  const flaggedWithReasons = result.paragraphs.filter(
    (p) => p.humanProbability < 50 && p.flags.length > 0
  );
  const flaggedWithSuggestions = result.paragraphs.filter(
    (p) => p.humanProbability < 50 && p.suggestion
  );
  const reasonCoverage = flagged.length > 0 ? flaggedWithReasons.length / flagged.length : 0;
  const suggestionCoverage = flagged.length > 0 ? flaggedWithSuggestions.length / flagged.length : 0;
  const actionability = Math.round((reasonCoverage * 5 + suggestionCoverage * 5) * 10) / 10;

  details.push({
    dimension: "actionability",
    metric: "flagsWithReasons",
    value: `${flaggedWithReasons.length}/${flagged.length}`,
    target: "100% coverage",
    pass: reasonCoverage >= 0.8,
  });

  details.push({
    dimension: "actionability",
    metric: "flagsWithSuggestions",
    value: `${flaggedWithSuggestions.length}/${flagged.length}`,
    target: "≥80% coverage",
    pass: suggestionCoverage >= 0.8,
  });

  return {
    dimensions: {
      sensitivity,
      actionability,
      specificity: 5,
      citationAccuracy: 5,
      robustness: 5,
    },
    details,
  };
}

// ── Aggregate ────────────────────────────────────────────────────────

export function aggregateDimensions(cases: DimensionScores[]): DimensionScores {
  const n = cases.length || 1;
  const sum: DimensionScores = {
    sensitivity: 0, specificity: 0, actionability: 0,
    citationAccuracy: 0, robustness: 0,
  };
  for (const c of cases) {
    sum.sensitivity += c.sensitivity;
    sum.specificity += c.specificity;
    sum.actionability += c.actionability;
    sum.citationAccuracy += c.citationAccuracy;
    sum.robustness += c.robustness;
  }
  return {
    sensitivity: Math.round((sum.sensitivity / n) * 10) / 10,
    specificity: Math.round((sum.specificity / n) * 10) / 10,
    actionability: Math.round((sum.actionability / n) * 10) / 10,
    citationAccuracy: Math.round((sum.citationAccuracy / n) * 10) / 10,
    robustness: Math.round((sum.robustness / n) * 10) / 10,
  };
}
