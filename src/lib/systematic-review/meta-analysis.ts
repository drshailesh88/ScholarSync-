/**
 * Meta-Analysis Statistical Engine (pure TypeScript, no R dependency)
 *
 * Implements:
 * - Fixed-effects meta-analysis (inverse-variance weighting)
 * - Random-effects meta-analysis (DerSimonian-Laird method)
 * - Effect size computation (OR, RR, SMD, MD, RD)
 * - Heterogeneity statistics (Q, I², tau²)
 * - Publication bias detection (Egger's test)
 * - Trim-and-fill method for bias-adjusted estimates
 */

import { db } from "@/lib/db";
import { metaAnalysisResults } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type EffectType = "OR" | "RR" | "SMD" | "MD" | "RD";
export type ModelType = "fixed" | "random";

export interface StudyEffect {
  studyId: string;
  studyLabel: string;
  effect: number; // log-scale for OR/RR, raw for SMD/MD/RD
  se: number; // standard error
  ciLower: number;
  ciUpper: number;
  weight?: number; // computed during analysis
  n?: number; // sample size (optional)
}

export interface HeterogeneityStats {
  Q: number; // Cochran's Q
  df: number;
  pValue: number;
  I2: number; // I-squared (0-100)
  tau2: number; // between-study variance
  H2: number;
}

export interface PooledResult {
  effect: number;
  se: number;
  ciLower: number;
  ciUpper: number;
  zValue: number;
  pValue: number;
}

export interface MetaAnalysisOutput {
  model: ModelType;
  effectType: EffectType;
  studies: StudyEffect[];
  pooled: PooledResult;
  heterogeneity: HeterogeneityStats;
  eggerTest: { intercept: number; se: number; pValue: number } | null;
}

// ---------------------------------------------------------------------------
// Normal distribution helpers
// ---------------------------------------------------------------------------

/** Standard normal CDF (Abramowitz & Stegun approximation) */
function normalCDF(z: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = z < 0 ? -1 : 1;
  z = Math.abs(z) / Math.sqrt(2);
  const t = 1.0 / (1.0 + p * z);
  const y =
    1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);

  return 0.5 * (1.0 + sign * y);
}

/** Two-tailed p-value from z-score */
function zToPValue(z: number): number {
  return 2 * (1 - normalCDF(Math.abs(z)));
}

/** Chi-squared CDF approximation (Wilson-Hilferty) */
function chiSquaredPValue(x: number, df: number): number {
  if (df <= 0) return 1;
  if (x <= 0) return 1;
  // Wilson-Hilferty approximation
  const z = Math.pow(x / df, 1 / 3) - (1 - 2 / (9 * df));
  const denom = Math.sqrt(2 / (9 * df));
  return 1 - normalCDF(z / denom);
}

const Z_95 = 1.96; // z-value for 95% CI

// ---------------------------------------------------------------------------
// Effect size computation from raw data
// ---------------------------------------------------------------------------

export function computeEffectSize(
  type: EffectType,
  data: {
    // For OR/RR/RD: 2x2 table
    a?: number; // treatment events
    b?: number; // treatment non-events
    c?: number; // control events
    d?: number; // control non-events
    // For SMD/MD: continuous data
    mean1?: number;
    sd1?: number;
    n1?: number;
    mean2?: number;
    sd2?: number;
    n2?: number;
  }
): StudyEffect | null {
  switch (type) {
    case "OR": {
      const { a, b, c, d } = data;
      if (a == null || b == null || c == null || d == null) return null;
      // Add 0.5 continuity correction if any cell is 0
      const aa = a === 0 || b === 0 || c === 0 || d === 0 ? a + 0.5 : a;
      const bb = a === 0 || b === 0 || c === 0 || d === 0 ? b + 0.5 : b;
      const cc = a === 0 || b === 0 || c === 0 || d === 0 ? c + 0.5 : c;
      const dd = a === 0 || b === 0 || c === 0 || d === 0 ? d + 0.5 : d;
      const logOR = Math.log((aa * dd) / (bb * cc));
      const se = Math.sqrt(1 / aa + 1 / bb + 1 / cc + 1 / dd);
      return {
        studyId: "",
        studyLabel: "",
        effect: logOR,
        se,
        ciLower: logOR - Z_95 * se,
        ciUpper: logOR + Z_95 * se,
      };
    }
    case "RR": {
      const { a, b, c, d } = data;
      if (a == null || b == null || c == null || d == null) return null;
      const n1 = a + b;
      const n2 = c + d;
      const logRR = Math.log((a / n1) / (c / n2));
      const se = Math.sqrt(1 / a - 1 / n1 + 1 / c - 1 / n2);
      return {
        studyId: "",
        studyLabel: "",
        effect: logRR,
        se,
        ciLower: logRR - Z_95 * se,
        ciUpper: logRR + Z_95 * se,
      };
    }
    case "RD": {
      const { a, b, c, d } = data;
      if (a == null || b == null || c == null || d == null) return null;
      const n1 = a + b;
      const n2 = c + d;
      const p1 = a / n1;
      const p2 = c / n2;
      const rd = p1 - p2;
      const se = Math.sqrt((p1 * (1 - p1)) / n1 + (p2 * (1 - p2)) / n2);
      return {
        studyId: "",
        studyLabel: "",
        effect: rd,
        se,
        ciLower: rd - Z_95 * se,
        ciUpper: rd + Z_95 * se,
      };
    }
    case "MD": {
      const { mean1, sd1, n1, mean2, sd2, n2 } = data;
      if (
        mean1 == null || sd1 == null || n1 == null ||
        mean2 == null || sd2 == null || n2 == null
      )
        return null;
      const md = mean1 - mean2;
      const se = Math.sqrt((sd1 * sd1) / n1 + (sd2 * sd2) / n2);
      return {
        studyId: "",
        studyLabel: "",
        effect: md,
        se,
        ciLower: md - Z_95 * se,
        ciUpper: md + Z_95 * se,
        n: n1 + n2,
      };
    }
    case "SMD": {
      const { mean1, sd1, n1, mean2, sd2, n2 } = data;
      if (
        mean1 == null || sd1 == null || n1 == null ||
        mean2 == null || sd2 == null || n2 == null
      )
        return null;
      // Hedges' g (bias-corrected SMD)
      const pooledSD = Math.sqrt(
        ((n1 - 1) * sd1 * sd1 + (n2 - 1) * sd2 * sd2) / (n1 + n2 - 2)
      );
      const d = (mean1 - mean2) / pooledSD;
      const J = 1 - 3 / (4 * (n1 + n2 - 2) - 1); // Hedges correction
      const g = d * J;
      const se = Math.sqrt((n1 + n2) / (n1 * n2) + (g * g) / (2 * (n1 + n2)));
      return {
        studyId: "",
        studyLabel: "",
        effect: g,
        se,
        ciLower: g - Z_95 * se,
        ciUpper: g + Z_95 * se,
        n: n1 + n2,
      };
    }
  }
}

// ---------------------------------------------------------------------------
// Fixed-effects meta-analysis (inverse-variance weighting)
// ---------------------------------------------------------------------------

export function computeFixedEffectsMeta(
  studies: StudyEffect[]
): { pooled: PooledResult; heterogeneity: HeterogeneityStats; weightedStudies: StudyEffect[] } {
  const k = studies.length;

  // Weights: w_i = 1 / SE_i²
  const weights = studies.map((s) => 1 / (s.se * s.se));
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  // Pooled effect (weighted mean)
  const pooledEffect =
    studies.reduce((sum, s, i) => sum + weights[i] * s.effect, 0) / totalWeight;

  const pooledSE = Math.sqrt(1 / totalWeight);
  const zValue = pooledEffect / pooledSE;

  // Heterogeneity: Cochran's Q
  const Q = studies.reduce(
    (sum, s, i) => sum + weights[i] * (s.effect - pooledEffect) ** 2,
    0
  );
  const df = k - 1;
  const pQ = chiSquaredPValue(Q, df);

  // I² = max(0, (Q - df) / Q * 100)
  const I2 = df > 0 ? Math.max(0, ((Q - df) / Q) * 100) : 0;

  // tau² (DerSimonian-Laird estimator, for info even in fixed model)
  const C = totalWeight - weights.reduce((s, w) => s + (w * w) / totalWeight, 0);
  const tau2 = Math.max(0, (Q - df) / C);

  const H2 = df > 0 ? Q / df : 1;

  const weightedStudies = studies.map((s, i) => ({
    ...s,
    weight: (weights[i] / totalWeight) * 100,
  }));

  return {
    pooled: {
      effect: pooledEffect,
      se: pooledSE,
      ciLower: pooledEffect - Z_95 * pooledSE,
      ciUpper: pooledEffect + Z_95 * pooledSE,
      zValue,
      pValue: zToPValue(zValue),
    },
    heterogeneity: { Q, df, pValue: pQ, I2, tau2, H2 },
    weightedStudies,
  };
}

// ---------------------------------------------------------------------------
// Random-effects meta-analysis (DerSimonian-Laird)
// ---------------------------------------------------------------------------

export function computeRandomEffectsMeta(
  studies: StudyEffect[]
): { pooled: PooledResult; heterogeneity: HeterogeneityStats; weightedStudies: StudyEffect[] } {
  // First compute fixed-effects to get tau²
  const fixed = computeFixedEffectsMeta(studies);
  const tau2 = fixed.heterogeneity.tau2;

  // Random-effects weights: w*_i = 1 / (SE_i² + tau²)
  const weights = studies.map((s) => 1 / (s.se * s.se + tau2));
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  const pooledEffect =
    studies.reduce((sum, s, i) => sum + weights[i] * s.effect, 0) / totalWeight;

  const pooledSE = Math.sqrt(1 / totalWeight);
  const zValue = pooledEffect / pooledSE;

  const weightedStudies = studies.map((s, i) => ({
    ...s,
    weight: (weights[i] / totalWeight) * 100,
  }));

  return {
    pooled: {
      effect: pooledEffect,
      se: pooledSE,
      ciLower: pooledEffect - Z_95 * pooledSE,
      ciUpper: pooledEffect + Z_95 * pooledSE,
      zValue,
      pValue: zToPValue(zValue),
    },
    heterogeneity: fixed.heterogeneity,
    weightedStudies,
  };
}

// ---------------------------------------------------------------------------
// Egger's test for publication bias
// ---------------------------------------------------------------------------

export function eggerTest(
  studies: StudyEffect[]
): { intercept: number; se: number; pValue: number } | null {
  if (studies.length < 3) return null;

  const n = studies.length;

  // Egger's regression: standardized effect (y/se) = a + b*(1/se)
  const x = studies.map((s) => 1 / s.se); // precision
  const y = studies.map((s) => s.effect / s.se); // standardized effect

  const xMean = x.reduce((a, b) => a + b, 0) / n;
  const yMean = y.reduce((a, b) => a + b, 0) / n;

  const ssxx = x.reduce((s, xi) => s + (xi - xMean) ** 2, 0);
  const ssxy = x.reduce((s, xi, i) => s + (xi - xMean) * (y[i] - yMean), 0);

  if (ssxx === 0) return null;

  const slope = ssxy / ssxx;
  const intercept = yMean - slope * xMean;

  // Residuals and SE of intercept
  const residuals = y.map((yi, i) => yi - (intercept + slope * x[i]));
  const residualSS = residuals.reduce((s, r) => s + r * r, 0);
  const mse = residualSS / (n - 2);
  const seIntercept = Math.sqrt(mse * (1 / n + (xMean * xMean) / ssxx));

  const tValue = intercept / seIntercept;
  // Use normal approximation for p-value (df = n-2)
  const pValue = zToPValue(tValue);

  return { intercept, se: seIntercept, pValue };
}

// ---------------------------------------------------------------------------
// Trim-and-fill for bias-adjusted pooled estimate
// ---------------------------------------------------------------------------

export function trimAndFill(
  studies: StudyEffect[],
  model: ModelType = "random"
): { adjustedStudies: StudyEffect[]; imputedCount: number; adjustedPooled: PooledResult } {
  // Step 1: Initial pooled estimate
  const initial =
    model === "fixed"
      ? computeFixedEffectsMeta(studies)
      : computeRandomEffectsMeta(studies);

  const pooledEffect = initial.pooled.effect;

  // Step 2: Rank residuals by absolute deviation
  const residuals = studies
    .map((s, i) => ({
      index: i,
      deviation: s.effect - pooledEffect,
      absDeviation: Math.abs(s.effect - pooledEffect),
    }))
    .sort((a, b) => b.absDeviation - a.absDeviation);

  // Step 3: Count asymmetric studies (L0 estimator)
  // Count studies on the "light" side (positive residuals assuming missing small studies)
  let k0 = 0;
  const n = studies.length;

  // Rank-based estimator (R0)
  const ranks = residuals.map((_, i) => i + 1);
  let T = 0;
  for (let i = 0; i < n; i++) {
    if (residuals[i].deviation > 0) {
      T += ranks[i];
    }
  }
  k0 = Math.max(0, Math.round(4 * T / n - n));
  k0 = Math.min(k0, n); // Can't impute more than existing studies

  // Step 4: Impute missing studies as mirrors of the k0 most extreme
  const imputed: StudyEffect[] = [];
  const sortedByEffect = [...studies].sort((a, b) => a.effect - b.effect);

  for (let i = 0; i < k0; i++) {
    // Mirror around pooled effect
    const extremeStudy =
      sortedByEffect[sortedByEffect.length - 1 - i] || sortedByEffect[0];
    const mirroredEffect = 2 * pooledEffect - extremeStudy.effect;
    imputed.push({
      studyId: `imputed_${i + 1}`,
      studyLabel: `Imputed ${i + 1}`,
      effect: mirroredEffect,
      se: extremeStudy.se,
      ciLower: mirroredEffect - Z_95 * extremeStudy.se,
      ciUpper: mirroredEffect + Z_95 * extremeStudy.se,
    });
  }

  // Step 5: Recompute pooled with all studies
  const allStudies = [...studies, ...imputed];
  const adjusted =
    model === "fixed"
      ? computeFixedEffectsMeta(allStudies)
      : computeRandomEffectsMeta(allStudies);

  return {
    adjustedStudies: allStudies,
    imputedCount: k0,
    adjustedPooled: adjusted.pooled,
  };
}

// ---------------------------------------------------------------------------
// Run full meta-analysis and persist results
// ---------------------------------------------------------------------------

export async function runMetaAnalysis(
  projectId: number,
  analysisName: string,
  outcomeMeasure: string,
  effectType: EffectType,
  model: ModelType,
  studies: StudyEffect[]
): Promise<MetaAnalysisOutput> {
  const result =
    model === "fixed"
      ? computeFixedEffectsMeta(studies)
      : computeRandomEffectsMeta(studies);

  const egger = eggerTest(studies);

  // Transform effects back from log-scale for OR/RR display
  const output: MetaAnalysisOutput = {
    model,
    effectType,
    studies: result.weightedStudies,
    pooled: result.pooled,
    heterogeneity: result.heterogeneity,
    eggerTest: egger,
  };

  // Persist to database
  await db
    .insert(metaAnalysisResults)
    .values({
      projectId,
      analysisName,
      outcomeMeasure,
      effectModel: model,
      pooledEffect: result.pooled.effect,
      pooledCiLower: result.pooled.ciLower,
      pooledCiUpper: result.pooled.ciUpper,
      heterogeneityI2: result.heterogeneity.I2,
      heterogeneityP: result.heterogeneity.pValue,
      studyData: output as unknown as Record<string, unknown>,
    });

  return output;
}

// ---------------------------------------------------------------------------
// Get stored meta-analysis results
// ---------------------------------------------------------------------------

export async function getMetaAnalysisResults(projectId: number) {
  return db
    .select()
    .from(metaAnalysisResults)
    .where(eq(metaAnalysisResults.projectId, projectId));
}

// ---------------------------------------------------------------------------
// Helper: convert log-scale effect to natural scale for display
// ---------------------------------------------------------------------------

export function toNaturalScale(
  effect: number,
  effectType: EffectType
): number {
  if (effectType === "OR" || effectType === "RR") {
    return Math.exp(effect);
  }
  return effect;
}

export function toNaturalScaleCI(
  lower: number,
  upper: number,
  effectType: EffectType
): { lower: number; upper: number } {
  if (effectType === "OR" || effectType === "RR") {
    return { lower: Math.exp(lower), upper: Math.exp(upper) };
  }
  return { lower, upper };
}
