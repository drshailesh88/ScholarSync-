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

export interface PredictionInterval {
  lower: number;
  upper: number;
}

export interface MetaAnalysisOutput {
  model: ModelType;
  effectType: EffectType;
  studies: StudyEffect[];
  pooled: PooledResult;
  heterogeneity: HeterogeneityStats;
  eggerTest: { intercept: number; se: number; pValue: number } | null;
  predictionInterval?: PredictionInterval | null;
}

/** Options for random-effects confidence interval and prediction interval. */
export interface RandomEffectsOptions {
  /** "wald" = standard z-based CI (default); "hksj" = Knapp-Hartung adjusted CI */
  ci?: "wald" | "hksj";
  /** When true, compute the 95% prediction interval */
  predictionInterval?: boolean;
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
// t-distribution quantile (inverse CDF)
// ---------------------------------------------------------------------------

/**
 * Approximates the quantile function (inverse CDF) of the standard normal
 * distribution using the rational approximation by Peter J. Acklam.
 * Maximum absolute error < 1.15e-9.
 */
function normalQuantile(p: number): number {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;

  const a = [
    -3.969683028665376e1,  2.209460984245205e2,
    -2.759285104469687e2,  1.383577518672690e2,
    -3.066479806614716e1,  2.506628277459239e0,
  ];
  const b = [
    -5.447609879822406e1,  1.615858368580409e2,
    -1.556989798598866e2,  6.680131188771972e1,
    -1.328068155288572e1,
  ];
  const c = [
    -7.784894002430293e-3, -3.223964580411365e-1,
    -2.400758277161838e0,  -2.549732539343734e0,
     4.374664141464968e0,   2.938163982698783e0,
  ];
  const d = [
     7.784695709041462e-3,  3.224671290700398e-1,
     2.445134137142996e0,   3.754408661907416e0,
  ];

  const pLow  = 0.02425;
  const pHigh = 1 - pLow;

  let q: number;
  if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p));
    return (
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  } else if (p <= pHigh) {
    q = p - 0.5;
    const r = q * q;
    return (
      ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
    );
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  }
}

/**
 * Approximates the inverse CDF (quantile function) of the Student t-distribution
 * with `df` degrees of freedom at cumulative probability `p`.
 *
 * Uses the Hill (1970) algorithm for small df and falls back to the normal
 * quantile for df > 300.
 *
 * Reference: Hill, G.W. (1970). Algorithm 395: Student's t-distribution.
 * Communications of the ACM, 13(10), 617-619.
 */
export function tQuantile(p: number, df: number): number {
  if (df > 300) return normalQuantile(p);
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;

  // Work with the upper tail probability for the two-sided case
  // Reflect so we work in the upper tail: p > 0.5
  const sign = p < 0.5 ? -1 : 1;
  const pp = p < 0.5 ? 1 - p : p;

  // For df = 1 (Cauchy)
  if (df === 1) return sign * Math.tan(Math.PI * (pp - 0.5));

  // For df = 2: CDF is F(t) = 0.5*(1 + t/sqrt(t^2+2)), inverse is:
  // t = alpha * sqrt(2 / (1 - alpha^2)) where alpha = 2*pp - 1
  if (df === 2) {
    const alpha = 2 * pp - 1;
    return sign * alpha * Math.sqrt(2 / (1 - alpha * alpha));
  }

  // General case: use normal approximation as starting point, then refine
  // via Cornish-Fisher expansion (Abramowitz & Stegun 26.7.8)
  const z = normalQuantile(pp);
  const g1 = (z * z * z + z) / 4;
  const g2 = (5 * z * z * z * z * z + 16 * z * z * z + 3 * z) / 96;
  const g3 =
    (3 * z * z * z * z * z * z * z +
      19 * z * z * z * z * z +
      17 * z * z * z -
      15 * z) /
    384;
  const g4 =
    (79 * Math.pow(z, 9) +
      776 * Math.pow(z, 7) +
      1482 * Math.pow(z, 5) -
      1920 * Math.pow(z, 3) -
      945 * z) /
    92160;

  const t0 =
    z +
    g1 / df +
    g2 / (df * df) +
    g3 / (df * df * df) +
    g4 / (df * df * df * df);

  return sign * t0;
}

/**
 * Two-tailed p-value from a t-statistic with given degrees of freedom.
 * Uses the relationship between the t-CDF and the incomplete beta function,
 * approximated via a series expansion for computational tractability.
 */
export function tToPValue(tVal: number, df: number): number {
  // For large df the t-distribution approaches normality
  if (df > 300) return zToPValue(tVal);

  const t = Math.abs(tVal);
  // Use the regularized incomplete beta function approximation
  // I_x(a, b) where x = df/(df + t^2), a = df/2, b = 0.5
  const x = df / (df + t * t);
  const a = df / 2;
  const b = 0.5;

  // Compute regularized incomplete beta I_x(a, b) via continued fraction (Lentz)
  // We use the relation: P(T > t) = 0.5 * I_x(a, b) for the one-tail probability
  const ibeta = incompleteBeta(x, a, b);
  return ibeta; // this is already two-tailed: P(|T| >= t) = I_x(df/2, 0.5)
}

/** Regularized incomplete beta function I_x(a, b) via continued fraction. */
function incompleteBeta(x: number, a: number, b: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  // Use symmetry: I_x(a,b) = 1 - I_{1-x}(b,a) when x > (a+1)/(a+b+2)
  if (x > (a + 1) / (a + b + 2)) {
    return 1 - incompleteBeta(1 - x, b, a);
  }

  // Log of beta function via Stirling
  const logBeta =
    lgamma(a) + lgamma(b) - lgamma(a + b);

  const front =
    Math.exp(Math.log(x) * a + Math.log(1 - x) * b - logBeta) / a;

  // Lentz continued fraction
  let f = 1;
  let C = 1;
  let D = 1 - ((a + b) * x) / (a + 1);
  D = D === 0 ? 1e-30 : 1 / D;
  f = D;

  for (let m = 1; m <= 200; m++) {
    // Even step
    let num = (m * (b - m) * x) / ((a + 2 * m - 1) * (a + 2 * m));
    D = 1 + num * D;
    C = 1 + num / C;
    D = D === 0 ? 1e-30 : 1 / D;
    C = C === 0 ? 1e-30 : C;
    f *= C * D;

    // Odd step
    num = -((a + m) * (a + b + m) * x) / ((a + 2 * m) * (a + 2 * m + 1));
    D = 1 + num * D;
    C = 1 + num / C;
    D = D === 0 ? 1e-30 : 1 / D;
    C = C === 0 ? 1e-30 : C;
    const delta = C * D;
    f *= delta;

    if (Math.abs(delta - 1) < 1e-10) break;
  }

  return front * f;
}

/** Log-gamma function via Lanczos approximation. */
function lgamma(z: number): number {
  const g = 7;
  const p = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];

  if (z < 0.5) {
    return Math.log(Math.PI / Math.sin(Math.PI * z)) - lgamma(1 - z);
  }

  z -= 1;
  let x = p[0];
  for (let i = 1; i < g + 2; i++) {
    x += p[i] / (z + i);
  }
  const t = z + g + 0.5;
  return (
    0.5 * Math.log(2 * Math.PI) +
    (z + 0.5) * Math.log(t) -
    t +
    Math.log(x)
  );
}

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
// REML (Restricted Maximum Likelihood) estimator for tau²
// ---------------------------------------------------------------------------

/**
 * Computes the REML estimate of tau² using the Fisher scoring algorithm.
 *
 * REML is the default estimator in Cochrane RevMan 2025 and is generally
 * preferred over DerSimonian-Laird for its better statistical properties,
 * particularly reduced bias when the number of studies is small.
 *
 * Reference: Viechtbauer (2005), "Bias and efficiency of meta-analytic
 * variance estimators in the random-effects model", JASA.
 */
export function computeREML(
  studies: StudyEffect[]
): { tau2: number; converged: boolean; iterations: number } {
  const k = studies.length;
  if (k < 2) return { tau2: 0, converged: true, iterations: 0 };

  const effects = studies.map((s) => s.effect);
  const variances = studies.map((s) => s.se * s.se);

  // Step 1: Compute DerSimonian-Laird tau² as starting value
  const wFixed = variances.map((v) => 1 / v);
  const sumW = wFixed.reduce((a, b) => a + b, 0);
  const muFixed =
    wFixed.reduce((acc, w, i) => acc + w * effects[i], 0) / sumW;
  const Q = wFixed.reduce(
    (acc, w, i) => acc + w * (effects[i] - muFixed) ** 2,
    0
  );
  const c =
    sumW - wFixed.reduce((acc, w) => acc + (w * w) / sumW, 0);
  let tau2 = Math.max(0, (Q - (k - 1)) / c);

  // Step 2: Fisher scoring iterations
  const maxIter = 100;
  const tol = 1e-5;
  let converged = false;
  let iter = 0;

  for (iter = 0; iter < maxIter; iter++) {
    const w = variances.map((v) => 1 / (tau2 + v));
    const sumW_re = w.reduce((a, b) => a + b, 0);
    const mu =
      w.reduce((acc, wi, i) => acc + wi * effects[i], 0) / sumW_re;

    // P_i = w_i - w_i² / sum(w)
    const P = w.map((wi) => wi - (wi * wi) / sumW_re);

    // Score: s = 0.5 * [-sum(P_i) + sum(P_i² * (y_i - mu)²)]
    const score =
      0.5 *
      (-P.reduce((a, b) => a + b, 0) +
        P.reduce((acc, pi, i) => acc + pi * pi * (effects[i] - mu) ** 2, 0));

    // Fisher information: I = 0.5 * sum(P_i²)
    const info = 0.5 * P.reduce((acc, pi) => acc + pi * pi, 0);

    if (info === 0) break;

    let tau2New = tau2 + score / info;

    // Step halving if tau2New is negative
    let halving = 0;
    while (tau2New < 0 && halving < 20) {
      halving++;
      tau2New = tau2 + Math.pow(0.5, halving) * (score / info);
    }
    if (tau2New < 0) tau2New = 0;

    if (Math.abs(tau2New - tau2) < tol) {
      tau2 = tau2New;
      converged = true;
      iter++;
      break;
    }
    tau2 = tau2New;
  }

  return { tau2, converged, iterations: iter };
}

// ---------------------------------------------------------------------------
// Random-effects meta-analysis (DerSimonian-Laird or REML)
// ---------------------------------------------------------------------------

export type RandomEffectsMethod = "DL" | "REML";

export function computeRandomEffectsMeta(
  studies: StudyEffect[],
  method: RandomEffectsMethod = "DL",
  options?: RandomEffectsOptions
): {
  pooled: PooledResult;
  heterogeneity: HeterogeneityStats;
  weightedStudies: StudyEffect[];
  predictionInterval: PredictionInterval | null;
} {
  const k = studies.length;

  // Compute fixed-effects first to get Q, I², df, H² (used for heterogeneity stats)
  const fixed = computeFixedEffectsMeta(studies);

  // Determine tau² using the requested method
  let tau2: number;
  if (method === "REML") {
    const reml = computeREML(studies);
    tau2 = reml.tau2;
  } else {
    // DerSimonian-Laird (default — backward compatible)
    tau2 = fixed.heterogeneity.tau2;
  }

  // Random-effects weights: w*_i = 1 / (SE_i² + tau²)
  const weights = studies.map((s) => 1 / (s.se * s.se + tau2));
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  const pooledEffect =
    studies.reduce((sum, s, i) => sum + weights[i] * s.effect, 0) / totalWeight;

  const pooledSE = Math.sqrt(1 / totalWeight);

  const weightedStudies = studies.map((s, i) => ({
    ...s,
    weight: (weights[i] / totalWeight) * 100,
  }));

  // Build heterogeneity stats; tau2 reflects the chosen estimator
  const heterogeneity: HeterogeneityStats = {
    ...fixed.heterogeneity,
    tau2,
  };

  // -----------------------------------------------------------------------
  // Confidence interval: Wald (default) or Knapp-Hartung (HKSJ)
  // -----------------------------------------------------------------------
  let ciLower: number;
  let ciUpper: number;
  let zValue: number;
  let pValue: number;

  const ciMethod = options?.ci ?? "wald";

  if (ciMethod === "hksj" && k >= 2) {
    // Knapp-Hartung / HKSJ adjustment
    // q = (1 / (k - 1)) * sum_i[ w_i * (y_i - pooledEffect)^2 ]
    // Truncated at 1 per Knapp-Hartung (2003) recommendation
    const qHKSJ =
      (1 / (k - 1)) *
      studies.reduce(
        (sum, s, i) => sum + weights[i] * (s.effect - pooledEffect) ** 2,
        0
      );
    const qTruncated = Math.max(1, qHKSJ);

    // SE under HKSJ: sqrt(q / sum(w_i))
    const seHKSJ = Math.sqrt(qTruncated / totalWeight);

    // t-distribution with k-1 degrees of freedom
    const tCrit = tQuantile(0.975, k - 1); // two-sided 95% CI => 0.975 quantile
    ciLower = pooledEffect - tCrit * seHKSJ;
    ciUpper = pooledEffect + tCrit * seHKSJ;

    // t-statistic and p-value under HKSJ
    const tStat = pooledEffect / seHKSJ;
    pValue = tToPValue(tStat, k - 1);
    zValue = tStat; // stored in zValue field (represents t-statistic here)
  } else {
    // Standard Wald CI using z-distribution
    zValue = pooledEffect / pooledSE;
    ciLower = pooledEffect - Z_95 * pooledSE;
    ciUpper = pooledEffect + Z_95 * pooledSE;
    pValue = zToPValue(zValue);
  }

  // -----------------------------------------------------------------------
  // Prediction interval (Higgins et al. 2009; Cochrane Handbook 2025)
  // PI: pooledEffect ± t_{k-2, 0.025} * sqrt(tau² + se_pooled²)
  // Undefined for k < 3.
  // -----------------------------------------------------------------------
  let predInterval: PredictionInterval | null = null;

  if (options?.predictionInterval) {
    if (k >= 3) {
      const tCritPI = tQuantile(0.975, k - 2);
      const piSE = Math.sqrt(tau2 + pooledSE * pooledSE);
      predInterval = {
        lower: pooledEffect - tCritPI * piSE,
        upper: pooledEffect + tCritPI * piSE,
      };
    }
    // For k < 3, predInterval remains null
  }

  return {
    pooled: {
      effect: pooledEffect,
      se: pooledSE,
      ciLower,
      ciUpper,
      zValue,
      pValue,
    },
    heterogeneity,
    weightedStudies,
    predictionInterval: predInterval,
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

// ---------------------------------------------------------------------------
// Subgroup Analysis
// ---------------------------------------------------------------------------

export interface SubgroupResult {
  groupName: string;
  studyCount: number;
  pooled: PooledResult;
  heterogeneity: HeterogeneityStats;
  studies: StudyEffect[];
}

export interface SubgroupAnalysisOutput {
  subgroups: SubgroupResult[];
  testForDifferences: { Q: number; df: number; p: number };
}

export function runSubgroupAnalysis(
  studies: StudyEffect[],
  groups: { name: string; studyIndices: number[] }[],
  effectType: EffectType,
  modelType: ModelType
): SubgroupAnalysisOutput {
  const compute =
    modelType === "fixed" ? computeFixedEffectsMeta : computeRandomEffectsMeta;

  const subgroups: SubgroupResult[] = groups
    .filter((g) => g.studyIndices.length >= 2)
    .map((g) => {
      const subset = g.studyIndices
        .filter((idx) => idx >= 0 && idx < studies.length)
        .map((idx) => studies[idx]);
      const result = compute(subset);
      return {
        groupName: g.name,
        studyCount: subset.length,
        pooled: result.pooled,
        heterogeneity: result.heterogeneity,
        studies: result.weightedStudies,
      };
    });

  // Test for subgroup differences (between-group heterogeneity)
  // Q_between = Q_total - sum(Q_within)
  const allIndices = groups.flatMap((g) => g.studyIndices);
  const allStudiesUsed = allIndices
    .filter((idx) => idx >= 0 && idx < studies.length)
    .map((idx) => studies[idx]);

  let QBetween = 0;
  const K = subgroups.length;

  if (K >= 2 && allStudiesUsed.length >= 2) {
    const totalResult = compute(allStudiesUsed);
    const QTotal = totalResult.heterogeneity.Q;
    const QWithinSum = subgroups.reduce(
      (sum, sg) => sum + sg.heterogeneity.Q,
      0
    );
    QBetween = Math.max(0, QTotal - QWithinSum);
  }

  const dfBetween = Math.max(0, K - 1);
  const pBetween = dfBetween > 0 ? chiSquaredPValue(QBetween, dfBetween) : 1;

  return {
    subgroups,
    testForDifferences: { Q: QBetween, df: dfBetween, p: pBetween },
  };
}

// ---------------------------------------------------------------------------
// Sensitivity Analysis (Leave-One-Out)
// ---------------------------------------------------------------------------

export interface LeaveOneOutResult {
  excludedStudyName: string;
  excludedIndex: number;
  pooled: PooledResult;
  heterogeneity: HeterogeneityStats;
}

export function runSensitivityAnalysis(
  studies: StudyEffect[],
  effectType: EffectType,
  modelType: ModelType
): LeaveOneOutResult[] {
  if (studies.length < 3) return [];

  const compute =
    modelType === "fixed" ? computeFixedEffectsMeta : computeRandomEffectsMeta;

  return studies.map((excluded, i) => {
    const subset = studies.filter((_, j) => j !== i);
    const result = compute(subset);
    return {
      excludedStudyName: excluded.studyLabel,
      excludedIndex: i,
      pooled: result.pooled,
      heterogeneity: result.heterogeneity,
    };
  });
}

// ---------------------------------------------------------------------------
// Meta-Regression (Weighted Least Squares)
// ---------------------------------------------------------------------------

export interface MetaRegressionCovariate {
  name: string;
  values: number[]; // one value per study, in same order as studies array
}

export interface MetaRegressionCoefficient {
  name: string;
  estimate: number;
  se: number;
  ciLower: number;
  ciUpper: number;
  zValue: number;
  pValue: number;
}

export interface MetaRegressionOutput {
  intercept: MetaRegressionCoefficient;
  coefficients: MetaRegressionCoefficient[];
  /** Proportion of heterogeneity explained (analogous to R²) */
  R2: number;
  /** Residual heterogeneity (tau² after accounting for covariates) */
  tau2Residual: number;
  /** Q-test for residual heterogeneity */
  QResidual: number;
  QResidualDf: number;
  QResidualP: number;
  /** Omnibus test of moderators (all coefficients = 0) */
  QModerator: number;
  QModeratorDf: number;
  QModeratorP: number;
  /** Model used */
  modelType: ModelType;
}

/**
 * Meta-regression via weighted least squares (WLS).
 *
 * For fixed-effects: weights = 1/SE²
 * For random-effects: weights = 1/(SE² + tau²), where tau² is estimated
 * from the unrestricted model using method-of-moments (DerSimonian-Laird).
 *
 * Reference: Thompson & Higgins, Stat Med 2002;21:1559-73
 */
export function runMetaRegression(
  studies: StudyEffect[],
  covariates: MetaRegressionCovariate[],
  effectType: EffectType,
  modelType: ModelType = "random"
): MetaRegressionOutput {
  const k = studies.length;
  const p = covariates.length; // number of predictors (excluding intercept)

  if (k < p + 2) {
    throw new Error(`Meta-regression requires at least ${p + 2} studies for ${p} covariate(s)`);
  }

  // Validate covariate lengths
  for (const cov of covariates) {
    if (cov.values.length !== k) {
      throw new Error(`Covariate "${cov.name}" has ${cov.values.length} values but there are ${k} studies`);
    }
  }

  // Step 1: Build design matrix X (k × (p+1)) with intercept column
  const X: number[][] = studies.map((_, i) => [1, ...covariates.map((c) => c.values[i])]);
  const y = studies.map((s) => s.effect);

  // Step 2: Initial fixed-effects weights
  const w0 = studies.map((s) => 1 / (s.se * s.se));

  // Step 3: Estimate tau² for random-effects
  let tau2 = 0;
  if (modelType === "random") {
    const fixedFit = wlsFit(X, y, w0);
    const QRes = fixedFit.QResidual;
    const dfRes = k - p - 1;

    if (dfRes > 0 && QRes > dfRes) {
      const sumW = w0.reduce((a, b) => a + b, 0);
      const sumW2 = w0.reduce((a, b) => a + b * b, 0);
      const C = sumW - sumW2 / sumW;
      tau2 = Math.max(0, (QRes - dfRes) / C);
    }
  }

  // Step 4: Compute final weights incorporating tau²
  const wFinal = studies.map((s) => 1 / (s.se * s.se + tau2));

  // Step 5: WLS fit with final weights
  const fit = wlsFit(X, y, wFinal);

  // Step 6: Compute R² (proportion of tau² explained)
  const unrestrictedResult = computeRandomEffectsMeta(studies);
  const tau2Unrestricted = unrestrictedResult.heterogeneity.tau2;
  const R2 =
    tau2Unrestricted > 0 ? Math.max(0, 1 - tau2 / tau2Unrestricted) : 0;

  // Step 7: Omnibus test of moderators
  const interceptOnlyFit = wlsFit(
    studies.map(() => [1]),
    y,
    wFinal
  );
  const QModerator = Math.max(0, interceptOnlyFit.QResidual - fit.QResidual);
  const dfModerator = p;
  const QModeratorP = dfModerator > 0 ? chiSquaredPValue(QModerator, dfModerator) : 1;

  // Step 8: Build coefficient results
  const dfRes = k - p - 1;
  const QResP = dfRes > 0 ? chiSquaredPValue(fit.QResidual, dfRes) : 1;

  const makeCoefficientResult = (
    name: string,
    estimate: number,
    se: number
  ): MetaRegressionCoefficient => {
    const z = se > 0 ? estimate / se : 0;
    return {
      name,
      estimate,
      se,
      ciLower: estimate - Z_95 * se,
      ciUpper: estimate + Z_95 * se,
      zValue: z,
      pValue: se > 0 ? 2 * (1 - normalCDF(Math.abs(z))) : 1,
    };
  };

  const intercept = makeCoefficientResult(
    "intercept",
    fit.beta[0],
    fit.seBeta[0]
  );

  const coefficients = covariates.map((cov, i) =>
    makeCoefficientResult(cov.name, fit.beta[i + 1], fit.seBeta[i + 1])
  );

  return {
    intercept,
    coefficients,
    R2,
    tau2Residual: tau2,
    QResidual: fit.QResidual,
    QResidualDf: dfRes,
    QResidualP: QResP,
    QModerator,
    QModeratorDf: dfModerator,
    QModeratorP,
    modelType,
  };
}

/** Weighted least squares fit: beta = (X'WX)^{-1} X'Wy */
function wlsFit(
  X: number[][],
  y: number[],
  w: number[]
): { beta: number[]; seBeta: number[]; QResidual: number } {
  const k = X.length;
  const m = X[0].length;

  const XWX: number[][] = Array.from({ length: m }, () => Array(m).fill(0));
  const XWy: number[] = Array(m).fill(0);

  for (let i = 0; i < k; i++) {
    for (let a = 0; a < m; a++) {
      XWy[a] += X[i][a] * w[i] * y[i];
      for (let b = 0; b < m; b++) {
        XWX[a][b] += X[i][a] * w[i] * X[i][b];
      }
    }
  }

  const inv = invertMatrix(XWX);

  const beta: number[] = Array(m).fill(0);
  for (let a = 0; a < m; a++) {
    for (let b = 0; b < m; b++) {
      beta[a] += inv[a][b] * XWy[b];
    }
  }

  const seBeta = inv.map((row, i) => Math.sqrt(Math.max(0, row[i])));

  let QResidual = 0;
  for (let i = 0; i < k; i++) {
    let predicted = 0;
    for (let a = 0; a < m; a++) {
      predicted += X[i][a] * beta[a];
    }
    const resid = y[i] - predicted;
    QResidual += w[i] * resid * resid;
  }

  return { beta, seBeta, QResidual };
}

/** Gauss-Jordan matrix inversion for small symmetric matrices */
function invertMatrix(mat: number[][]): number[][] {
  const n = mat.length;
  const aug: number[][] = mat.map((row, i) => {
    const newRow = [...row];
    for (let j = 0; j < n; j++) {
      newRow.push(i === j ? 1 : 0);
    }
    return newRow;
  });

  for (let col = 0; col < n; col++) {
    let maxRow = col;
    let maxVal = Math.abs(aug[col][col]);
    for (let row = col + 1; row < n; row++) {
      if (Math.abs(aug[row][col]) > maxVal) {
        maxVal = Math.abs(aug[row][col]);
        maxRow = row;
      }
    }
    if (maxRow !== col) {
      [aug[col], aug[maxRow]] = [aug[maxRow], aug[col]];
    }

    const pivot = aug[col][col];
    if (Math.abs(pivot) < 1e-15) {
      return mat.map((_, i) =>
        Array.from({ length: n }, (__, j) => (i === j ? 1e10 : 0))
      );
    }

    for (let j = 0; j < 2 * n; j++) {
      aug[col][j] /= pivot;
    }

    for (let row = 0; row < n; row++) {
      if (row !== col) {
        const factor = aug[row][col];
        for (let j = 0; j < 2 * n; j++) {
          aug[row][j] -= factor * aug[col][j];
        }
      }
    }
  }

  return aug.map((row) => row.slice(n));
}

// ---------------------------------------------------------------------------
// Cumulative Meta-Analysis
// ---------------------------------------------------------------------------

export interface CumulativeMetaAnalysisResult {
  /** Study added at this step */
  studyLabel: string;
  /** Number of studies included so far */
  studiesIncluded: number;
  /** Pooled result including all studies up to this point */
  pooled: PooledResult;
  /** Heterogeneity stats at this point */
  heterogeneity: HeterogeneityStats;
}

/**
 * Cumulative meta-analysis: re-pools the estimate after adding each study.
 *
 * Studies are added in the order provided. Typically the caller sorts by
 * publication year (or another meaningful order) before calling.
 *
 * Reference: Lau et al., NEJM 1992;327:248-54
 */
export function runCumulativeMetaAnalysis(
  studies: StudyEffect[],
  effectType: EffectType,
  modelType: ModelType = "random"
): CumulativeMetaAnalysisResult[] {
  if (studies.length < 2) return [];

  const compute =
    modelType === "fixed" ? computeFixedEffectsMeta : computeRandomEffectsMeta;

  const results: CumulativeMetaAnalysisResult[] = [];

  for (let i = 1; i < studies.length; i++) {
    const subset = studies.slice(0, i + 1);
    const output = compute(subset);
    results.push({
      studyLabel: studies[i].studyLabel,
      studiesIncluded: i + 1,
      pooled: output.pooled,
      heterogeneity: output.heterogeneity,
    });
  }

  return results;
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

// ---------------------------------------------------------------------------
// Funnel Plot SVG Generator
// ---------------------------------------------------------------------------

export interface FunnelPlotOptions {
  width?: number;
  height?: number;
  /** Display on natural scale for OR/RR (exp transform) */
  naturalScale?: boolean;
  /** Show Egger's regression line */
  showEggerLine?: boolean;
  /** Show trim-and-fill imputed studies */
  showTrimAndFill?: boolean;
}

/**
 * Generates a publication-quality funnel plot SVG.
 *
 * X-axis: Effect size (log-scale for OR/RR, raw for SMD/MD/RD)
 * Y-axis: Standard error (inverted, so precise studies are at the top)
 *
 * Includes:
 * - 95% pseudo-CI lines (the funnel shape)
 * - Pooled estimate vertical line
 * - Optional Egger's regression line
 * - Optional trim-and-fill imputed studies
 *
 * Reference: Sterne & Egger, BMJ 2001;323:101-105
 */
export function generateFunnelPlotSVG(
  studies: StudyEffect[],
  pooledEffect: number,
  effectType: EffectType,
  options: FunnelPlotOptions = {}
): string {
  const W = options.width ?? 700;
  const H = options.height ?? 500;
  const pad = { top: 40, right: 60, bottom: 60, left: 70 };

  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  // Determine data range
  const seValues = studies.map((s) => s.se);
  const effectValues = studies.map((s) => s.effect);
  const maxSE = Math.max(...seValues) * 1.2;

  // Effect range: extend beyond data to show funnel
  const effectSpread = maxSE * Z_95;
  const effectMin = Math.min(pooledEffect - effectSpread * 1.3, Math.min(...effectValues) - 0.1);
  const effectMax = Math.max(pooledEffect + effectSpread * 1.3, Math.max(...effectValues) + 0.1);
  const effectRange = effectMax - effectMin;

  // Scale functions
  const xScale = (val: number) =>
    pad.left + ((val - effectMin) / effectRange) * plotW;
  const yScale = (se: number) =>
    pad.top + (se / maxSE) * plotH; // SE=0 at top, maxSE at bottom

  // Funnel lines: at SE=s, the 95% CI bounds are pooledEffect ± 1.96 * s
  const funnelPoints = 50;
  const leftLine: string[] = [];
  const rightLine: string[] = [];
  for (let i = 0; i <= funnelPoints; i++) {
    const se = (i / funnelPoints) * maxSE;
    const x1 = xScale(pooledEffect - Z_95 * se);
    const x2 = xScale(pooledEffect + Z_95 * se);
    const y = yScale(se);
    leftLine.push(`${x1},${y}`);
    rightLine.push(`${x2},${y}`);
  }

  // Study dots
  const dots = studies.map((s) => {
    const cx = xScale(s.effect);
    const cy = yScale(s.se);
    const isImputed = s.studyId.startsWith("imputed_");
    return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="4"
      fill="${isImputed ? "none" : "#3b82f6"}"
      stroke="${isImputed ? "#ef4444" : "#1e40af"}"
      stroke-width="${isImputed ? 1.5 : 1}"
      stroke-dasharray="${isImputed ? "3,2" : "none"}"
      data-study="${s.studyLabel}" data-effect="${s.effect.toFixed(4)}" data-se="${s.se.toFixed(4)}"/>`;
  });

  // Optional: Egger's regression line
  let eggerLineSVG = "";
  if (options.showEggerLine) {
    const egger = eggerTest(studies.filter((s) => !s.studyId.startsWith("imputed_")));
    if (egger) {
      // Egger regression: y/se = intercept + slope*(1/se), rearranged: effect = intercept*se + slope
      // At SE=0: effect = slope (precision → ∞)
      // At SE=maxSE: effect = intercept*maxSE + slope
      const eTop = pooledEffect;
      const eBottom = egger.intercept * maxSE + pooledEffect;
      eggerLineSVG = `<line x1="${xScale(eTop).toFixed(1)}" y1="${yScale(0).toFixed(1)}"
        x2="${xScale(eBottom).toFixed(1)}" y2="${yScale(maxSE).toFixed(1)}"
        stroke="#ef4444" stroke-width="1" stroke-dasharray="5,3"/>`;
    }
  }

  // X-axis ticks
  const tickCount = 7;
  const xTicks: string[] = [];
  for (let i = 0; i <= tickCount; i++) {
    const val = effectMin + (i / tickCount) * effectRange;
    const x = xScale(val);
    const displayVal =
      options.naturalScale && (effectType === "OR" || effectType === "RR")
        ? Math.exp(val).toFixed(2)
        : val.toFixed(2);
    xTicks.push(`<line x1="${x.toFixed(1)}" y1="${pad.top + plotH}" x2="${x.toFixed(1)}" y2="${pad.top + plotH + 5}" stroke="#64748b"/>
      <text x="${x.toFixed(1)}" y="${pad.top + plotH + 20}" text-anchor="middle" class="tick">${displayVal}</text>`);
  }

  // Y-axis ticks
  const yTickCount = 5;
  const yTicks: string[] = [];
  for (let i = 0; i <= yTickCount; i++) {
    const se = (i / yTickCount) * maxSE;
    const y = yScale(se);
    yTicks.push(`<line x1="${pad.left - 5}" y1="${y.toFixed(1)}" x2="${pad.left}" y2="${y.toFixed(1)}" stroke="#64748b"/>
      <text x="${pad.left - 10}" y="${(y + 4).toFixed(1)}" text-anchor="end" class="tick">${se.toFixed(2)}</text>`);
  }

  const axisLabel =
    options.naturalScale && (effectType === "OR" || effectType === "RR")
      ? effectType
      : `log(${effectType})`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" font-family="sans-serif" font-size="11">
  <style>
    .tick { fill: #64748b; font-size: 10px; }
    .axis-label { fill: #1e293b; font-size: 12px; font-weight: 600; }
    .title { fill: #1e293b; font-size: 14px; font-weight: 700; }
  </style>

  <!-- Title -->
  <text x="${W / 2}" y="20" text-anchor="middle" class="title">Funnel Plot</text>

  <!-- Plot area background -->
  <rect x="${pad.left}" y="${pad.top}" width="${plotW}" height="${plotH}" fill="#fafafa" stroke="#e2e8f0"/>

  <!-- 95% pseudo-CI funnel -->
  <polygon points="${leftLine.join(" ")} ${rightLine.reverse().join(" ")}" fill="#e0f2fe" fill-opacity="0.5" stroke="none"/>
  <polyline points="${leftLine.join(" ")}" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,2"/>
  <polyline points="${rightLine.reverse().join(" ")}" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,2"/>

  <!-- Pooled estimate vertical line -->
  <line x1="${xScale(pooledEffect).toFixed(1)}" y1="${pad.top}" x2="${xScale(pooledEffect).toFixed(1)}" y2="${pad.top + plotH}" stroke="#334155" stroke-width="1" stroke-dasharray="6,3"/>

  ${eggerLineSVG}

  <!-- Study dots -->
  ${dots.join("\n  ")}

  <!-- X-axis -->
  <line x1="${pad.left}" y1="${pad.top + plotH}" x2="${pad.left + plotW}" y2="${pad.top + plotH}" stroke="#334155" stroke-width="1"/>
  ${xTicks.join("\n  ")}
  <text x="${pad.left + plotW / 2}" y="${H - 10}" text-anchor="middle" class="axis-label">${axisLabel}</text>

  <!-- Y-axis -->
  <line x1="${pad.left}" y1="${pad.top}" x2="${pad.left}" y2="${pad.top + plotH}" stroke="#334155" stroke-width="1"/>
  ${yTicks.join("\n  ")}
  <text x="15" y="${pad.top + plotH / 2}" text-anchor="middle" class="axis-label" transform="rotate(-90, 15, ${pad.top + plotH / 2})">Standard Error</text>
</svg>`;
}

// ---------------------------------------------------------------------------
// Forest Plot SVG Generator
// ---------------------------------------------------------------------------

export interface ForestPlotOptions {
  width?: number;
  height?: number;
  /** Display on natural scale for OR/RR (exp transform) */
  naturalScale?: boolean;
  /** Show prediction interval for random-effects */
  showPredictionInterval?: boolean;
  /** Custom null effect line (default: 0 for SMD/MD/RD, 1 for natural OR/RR) */
  nullEffect?: number;
}

/**
 * Generates a publication-quality forest plot SVG.
 *
 * Each study is shown as:
 * - A square (area proportional to study weight)
 * - Horizontal whiskers for 95% CI
 * - Study label and numeric effect + CI on the sides
 *
 * Pooled estimate is shown as a diamond at the bottom.
 *
 * Reference: Lewis & Clarke, BMJ 2001;322:1479-1480
 */
export function generateForestPlotSVG(
  output: MetaAnalysisOutput,
  options: ForestPlotOptions = {}
): string {
  const studies = output.studies;
  const k = studies.length;
  const useNatural = options.naturalScale && (output.effectType === "OR" || output.effectType === "RR");

  const W = options.width ?? 800;
  const rowH = 28;
  const H = options.height ?? Math.max(300, (k + 4) * rowH + 100);
  const labelW = 220; // left label area
  const statsW = 150; // right stats area
  const pad = { top: 50, bottom: 50 };
  const plotLeft = labelW;
  const plotRight = W - statsW;
  const plotW = plotRight - plotLeft;

  // Transform helper
  const tx = (val: number) => useNatural ? Math.exp(val) : val;

  // Determine data range (in display scale)
  const allLower = studies.map((s) => tx(s.ciLower));
  const allUpper = studies.map((s) => tx(s.ciUpper));
  const pooledLower = tx(output.pooled.ciLower);
  const pooledUpper = tx(output.pooled.ciUpper);

  const dataMin = Math.min(Math.min(...allLower), pooledLower);
  const dataMax = Math.max(Math.max(...allUpper), pooledUpper);
  const dataPad = (dataMax - dataMin) * 0.15;
  const xMin = dataMin - dataPad;
  const xMax = dataMax + dataPad;
  const xRange = xMax - xMin;

  // Null effect line
  const nullVal = options.nullEffect ?? (useNatural ? 1 : 0);

  const xScale = (val: number) =>
    plotLeft + ((val - xMin) / xRange) * plotW;

  // Max weight for square sizing
  const maxWeight = Math.max(...studies.map((s) => s.weight ?? 1));

  // Study rows
  const rows: string[] = [];
  studies.forEach((s, i) => {
    const y = pad.top + (i + 1) * rowH;
    const effect = tx(s.effect);
    const ciL = tx(s.ciLower);
    const ciU = tx(s.ciUpper);
    const w = s.weight ?? (100 / k);
    const sqSize = Math.max(4, Math.sqrt(w / maxWeight) * 14);

    // Clamp CI whiskers to visible area
    const x1 = Math.max(plotLeft, xScale(ciL));
    const x2 = Math.min(plotRight, xScale(ciU));
    const xCenter = xScale(effect);

    // Study label
    rows.push(`<text x="${labelW - 10}" y="${y + 4}" text-anchor="end" class="study-label">${s.studyLabel}</text>`);

    // CI whisker
    rows.push(`<line x1="${x1.toFixed(1)}" y1="${y}" x2="${x2.toFixed(1)}" y2="${y}" stroke="#1e293b" stroke-width="1.5"/>`);

    // Effect square
    rows.push(`<rect x="${(xCenter - sqSize / 2).toFixed(1)}" y="${(y - sqSize / 2).toFixed(1)}" width="${sqSize.toFixed(1)}" height="${sqSize.toFixed(1)}" fill="#3b82f6" stroke="#1e40af" stroke-width="0.5"/>`);

    // Stats text (right side)
    const effectDisplay = effect.toFixed(2);
    const ciDisplay = `[${ciL.toFixed(2)}, ${ciU.toFixed(2)}]`;
    const weightDisplay = `${w.toFixed(1)}%`;
    rows.push(`<text x="${plotRight + 10}" y="${y + 4}" class="stats-text">${effectDisplay} ${ciDisplay}</text>`);
    rows.push(`<text x="${W - 10}" y="${y + 4}" text-anchor="end" class="stats-text">${weightDisplay}</text>`);
  });

  // Pooled diamond
  const pooledY = pad.top + (k + 2) * rowH;
  const pooledEffect = tx(output.pooled.effect);
  const pL = xScale(tx(output.pooled.ciLower));
  const pR = xScale(tx(output.pooled.ciUpper));
  const pC = xScale(pooledEffect);
  const dH = 8; // diamond half-height

  const diamondPoints = `${pL.toFixed(1)},${pooledY} ${pC.toFixed(1)},${pooledY - dH} ${pR.toFixed(1)},${pooledY} ${pC.toFixed(1)},${pooledY + dH}`;

  // Header row
  const headerY = pad.top - 10;

  // X-axis ticks
  const tickCount = 7;
  const xAxisY = pad.top + (k + 3) * rowH;
  const xTicks: string[] = [];
  for (let i = 0; i <= tickCount; i++) {
    const val = xMin + (i / tickCount) * xRange;
    const x = xScale(val);
    xTicks.push(`<line x1="${x.toFixed(1)}" y1="${xAxisY}" x2="${x.toFixed(1)}" y2="${xAxisY + 5}" stroke="#64748b"/>
      <text x="${x.toFixed(1)}" y="${xAxisY + 18}" text-anchor="middle" class="tick">${val.toFixed(2)}</text>`);
  }

  // Axis label
  const axisLabel = useNatural ? output.effectType : `${output.effectType} (${output.effectType === "OR" || output.effectType === "RR" ? "log scale" : "raw"})`;

  // Separator line between studies and pooled
  const sepY = pad.top + (k + 1.5) * rowH;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" font-family="sans-serif" font-size="11">
  <style>
    .study-label { fill: #1e293b; font-size: 11px; }
    .stats-text { fill: #475569; font-size: 10px; }
    .tick { fill: #64748b; font-size: 10px; }
    .axis-label { fill: #1e293b; font-size: 12px; font-weight: 600; }
    .title { fill: #1e293b; font-size: 14px; font-weight: 700; }
    .header { fill: #1e293b; font-size: 11px; font-weight: 700; }
  </style>

  <!-- Title -->
  <text x="${W / 2}" y="20" text-anchor="middle" class="title">Forest Plot — ${output.model === "random" ? "Random" : "Fixed"}-Effects Model</text>

  <!-- Column headers -->
  <text x="${labelW - 10}" y="${headerY}" text-anchor="end" class="header">Study</text>
  <text x="${plotLeft + plotW / 2}" y="${headerY}" text-anchor="middle" class="header">${axisLabel}</text>
  <text x="${plotRight + 10}" y="${headerY}" class="header">Effect [95% CI]</text>
  <text x="${W - 10}" y="${headerY}" text-anchor="end" class="header">Weight</text>

  <!-- Plot area -->
  <rect x="${plotLeft}" y="${pad.top - 5}" width="${plotW}" height="${(k + 3) * rowH + 10}" fill="#fafafa" stroke="none"/>

  <!-- Null effect line -->
  <line x1="${xScale(nullVal).toFixed(1)}" y1="${pad.top - 5}" x2="${xScale(nullVal).toFixed(1)}" y2="${xAxisY}" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,3"/>

  <!-- Study rows -->
  ${rows.join("\n  ")}

  <!-- Separator -->
  <line x1="${labelW - 200}" y1="${sepY}" x2="${W}" y2="${sepY}" stroke="#cbd5e1" stroke-width="0.5"/>

  <!-- Pooled estimate label -->
  <text x="${labelW - 10}" y="${pooledY + 4}" text-anchor="end" class="header">${output.model === "random" ? "RE" : "FE"} Model</text>

  <!-- Pooled diamond -->
  <polygon points="${diamondPoints}" fill="#ef4444" stroke="#991b1b" stroke-width="1"/>

  <!-- Pooled stats -->
  <text x="${plotRight + 10}" y="${pooledY + 4}" class="stats-text">${pooledEffect.toFixed(2)} [${tx(output.pooled.ciLower).toFixed(2)}, ${tx(output.pooled.ciUpper).toFixed(2)}]</text>

  <!-- Heterogeneity footer -->
  <text x="${plotLeft}" y="${xAxisY + 35}" class="stats-text">Heterogeneity: I² = ${output.heterogeneity.I2.toFixed(1)}%, τ² = ${output.heterogeneity.tau2.toFixed(4)}, Q = ${output.heterogeneity.Q.toFixed(2)} (p = ${output.heterogeneity.pValue.toFixed(3)})</text>

  <!-- X-axis -->
  <line x1="${plotLeft}" y1="${xAxisY}" x2="${plotRight}" y2="${xAxisY}" stroke="#334155" stroke-width="1"/>
  ${xTicks.join("\n  ")}

  <!-- Favours labels -->
  <text x="${xScale(nullVal) - 30}" y="${xAxisY + 35}" text-anchor="end" class="axis-label" font-size="10">← Favours treatment</text>
  <text x="${xScale(nullVal) + 30}" y="${xAxisY + 35}" text-anchor="start" class="axis-label" font-size="10">Favours control →</text>
</svg>`;
}
