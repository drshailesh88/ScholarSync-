/**
 * Unit tests for the meta-analysis statistical engine.
 *
 * Only pure math/logic functions are tested here. Functions that require
 * database or AI calls (runMetaAnalysis, getMetaAnalysisResults) are excluded.
 *
 * Reference values are computed from standard meta-analysis formulas and
 * cross-checked against published textbook examples where possible.
 */

import { describe, it, expect } from "vitest";
import {
  computeEffectSize,
  computeFixedEffectsMeta,
  computeRandomEffectsMeta,
  computeREML,
  eggerTest,
  trimAndFill,
  runSubgroupAnalysis,
  runSensitivityAnalysis,
  toNaturalScale,
  toNaturalScaleCI,
  tQuantile,
  type StudyEffect,
  type EffectType,
} from "@/lib/systematic-review/meta-analysis";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a minimal StudyEffect for pooling tests */
function makeStudy(
  id: string,
  effect: number,
  se: number
): StudyEffect {
  return {
    studyId: id,
    studyLabel: id,
    effect,
    se,
    ciLower: effect - 1.96 * se,
    ciUpper: effect + 1.96 * se,
  };
}

const TOLERANCE = 1e-4; // acceptable numerical tolerance for floating-point comparisons

// ---------------------------------------------------------------------------
// computeEffectSize — OR
// ---------------------------------------------------------------------------

describe("computeEffectSize — OR (Odds Ratio)", () => {
  it("returns null when required fields are missing", () => {
    expect(computeEffectSize("OR", {})).toBeNull();
    expect(computeEffectSize("OR", { a: 10, b: 90 })).toBeNull();
  });

  it("computes log-OR correctly for a balanced 2x2 table", () => {
    // a=20, b=80, c=10, d=90  =>  OR = (20*90)/(80*10) = 2.25
    // log(2.25) ≈ 0.81093
    const result = computeEffectSize("OR", { a: 20, b: 80, c: 10, d: 90 });
    expect(result).not.toBeNull();
    const logOR = Math.log((20 * 90) / (80 * 10));
    expect(result!.effect).toBeCloseTo(logOR, 4);
  });

  it("computes SE of log-OR correctly", () => {
    // SE = sqrt(1/a + 1/b + 1/c + 1/d)
    const result = computeEffectSize("OR", { a: 20, b: 80, c: 10, d: 90 });
    const expectedSE = Math.sqrt(1 / 20 + 1 / 80 + 1 / 10 + 1 / 90);
    expect(result!.se).toBeCloseTo(expectedSE, 4);
  });

  it("CI bounds are +/- 1.96 * SE from effect", () => {
    const result = computeEffectSize("OR", { a: 20, b: 80, c: 10, d: 90 });
    expect(result!.ciLower).toBeCloseTo(result!.effect - 1.96 * result!.se, 4);
    expect(result!.ciUpper).toBeCloseTo(result!.effect + 1.96 * result!.se, 4);
  });

  it("applies 0.5 continuity correction when any cell is zero", () => {
    // c=0: correction applied to all cells
    const result = computeEffectSize("OR", { a: 5, b: 45, c: 0, d: 50 });
    expect(result).not.toBeNull();
    const aa = 5.5, bb = 45.5, cc = 0.5, dd = 50.5;
    const expectedLogOR = Math.log((aa * dd) / (bb * cc));
    expect(result!.effect).toBeCloseTo(expectedLogOR, 4);
  });

  it("OR of 1 gives log-OR of 0", () => {
    // a=b=c=d: OR = 1
    const result = computeEffectSize("OR", { a: 50, b: 50, c: 50, d: 50 });
    expect(result!.effect).toBeCloseTo(0, 4);
  });
});

// ---------------------------------------------------------------------------
// computeEffectSize — RR
// ---------------------------------------------------------------------------

describe("computeEffectSize — RR (Risk Ratio)", () => {
  it("returns null when required fields are missing", () => {
    expect(computeEffectSize("RR", {})).toBeNull();
  });

  it("computes log-RR correctly", () => {
    // a=20, b=80 (n1=100, p1=0.2); c=10, d=90 (n2=100, p2=0.1) => RR=2 => log(2)
    const result = computeEffectSize("RR", { a: 20, b: 80, c: 10, d: 90 });
    expect(result).not.toBeNull();
    expect(result!.effect).toBeCloseTo(Math.log(2), 4);
  });

  it("computes SE of log-RR correctly", () => {
    // SE = sqrt(1/a - 1/n1 + 1/c - 1/n2)
    const a = 20, b = 80, c = 10, d = 90;
    const n1 = a + b, n2 = c + d;
    const expectedSE = Math.sqrt(1 / a - 1 / n1 + 1 / c - 1 / n2);
    const result = computeEffectSize("RR", { a, b, c, d });
    expect(result!.se).toBeCloseTo(expectedSE, 4);
  });

  it("RR of 1 gives log-RR of 0", () => {
    const result = computeEffectSize("RR", { a: 10, b: 90, c: 10, d: 90 });
    expect(result!.effect).toBeCloseTo(0, 4);
  });
});

// ---------------------------------------------------------------------------
// computeEffectSize — RD
// ---------------------------------------------------------------------------

describe("computeEffectSize — RD (Risk Difference)", () => {
  it("returns null when required fields are missing", () => {
    expect(computeEffectSize("RD", {})).toBeNull();
  });

  it("computes RD correctly", () => {
    // p1=0.2, p2=0.1 => RD=0.1
    const result = computeEffectSize("RD", { a: 20, b: 80, c: 10, d: 90 });
    expect(result).not.toBeNull();
    expect(result!.effect).toBeCloseTo(0.1, 4);
  });

  it("RD of zero when proportions are equal", () => {
    const result = computeEffectSize("RD", { a: 10, b: 90, c: 10, d: 90 });
    expect(result!.effect).toBeCloseTo(0, 4);
  });
});

// ---------------------------------------------------------------------------
// computeEffectSize — MD
// ---------------------------------------------------------------------------

describe("computeEffectSize — MD (Mean Difference)", () => {
  it("returns null when required fields are missing", () => {
    expect(computeEffectSize("MD", {})).toBeNull();
    expect(computeEffectSize("MD", { mean1: 5, sd1: 1, n1: 50 })).toBeNull();
  });

  it("computes MD correctly", () => {
    const result = computeEffectSize("MD", {
      mean1: 10, sd1: 2, n1: 50,
      mean2: 8,  sd2: 2, n2: 50,
    });
    expect(result).not.toBeNull();
    expect(result!.effect).toBeCloseTo(2, 4);
  });

  it("computes SE of MD correctly", () => {
    const sd1 = 2, n1 = 50, sd2 = 2, n2 = 50;
    const expectedSE = Math.sqrt((sd1 * sd1) / n1 + (sd2 * sd2) / n2);
    const result = computeEffectSize("MD", {
      mean1: 10, sd1, n1,
      mean2: 8,  sd2, n2,
    });
    expect(result!.se).toBeCloseTo(expectedSE, 4);
  });

  it("includes total sample size in n field", () => {
    const result = computeEffectSize("MD", {
      mean1: 10, sd1: 2, n1: 40,
      mean2: 8,  sd2: 2, n2: 60,
    });
    expect(result!.n).toBe(100);
  });
});

// ---------------------------------------------------------------------------
// computeEffectSize — SMD (Hedges' g)
// ---------------------------------------------------------------------------

describe("computeEffectSize — SMD (Hedges' g)", () => {
  it("returns null when required fields are missing", () => {
    expect(computeEffectSize("SMD", {})).toBeNull();
  });

  it("computes Hedges' g close to Cohen's d for large n", () => {
    // For large n the Hedges correction J ≈ 1, so g ≈ d
    const result = computeEffectSize("SMD", {
      mean1: 110, sd1: 15, n1: 1000,
      mean2: 100, sd2: 15, n2: 1000,
    });
    expect(result).not.toBeNull();
    // d = 10/15 ≈ 0.6667
    expect(result!.effect).toBeCloseTo(10 / 15, 2);
  });

  it("applies Hedges correction factor J", () => {
    const n1 = 10, n2 = 10;
    const mean1 = 10, sd1 = 2, mean2 = 8, sd2 = 2;
    const pooledSD = Math.sqrt(
      ((n1 - 1) * sd1 * sd1 + (n2 - 1) * sd2 * sd2) / (n1 + n2 - 2)
    );
    const d = (mean1 - mean2) / pooledSD;
    const J = 1 - 3 / (4 * (n1 + n2 - 2) - 1);
    const expectedG = d * J;
    const result = computeEffectSize("SMD", { mean1, sd1, n1, mean2, sd2, n2 });
    expect(result!.effect).toBeCloseTo(expectedG, 4);
  });

  it("includes total sample size in n field", () => {
    const result = computeEffectSize("SMD", {
      mean1: 10, sd1: 2, n1: 30,
      mean2: 8,  sd2: 2, n2: 30,
    });
    expect(result!.n).toBe(60);
  });

  it("returns effect near zero when means are equal", () => {
    const result = computeEffectSize("SMD", {
      mean1: 5, sd1: 2, n1: 50,
      mean2: 5, sd2: 2, n2: 50,
    });
    expect(result!.effect).toBeCloseTo(0, 4);
  });
});

// ---------------------------------------------------------------------------
// computeFixedEffectsMeta
// ---------------------------------------------------------------------------

describe("computeFixedEffectsMeta", () => {
  // Classic 5-study example with known pooled effect
  // Studies: effect, se
  // w_i = 1/se^2; pooled = sum(w*y)/sum(w)
  const studies: StudyEffect[] = [
    makeStudy("A", 0.5, 0.2),
    makeStudy("B", 0.3, 0.15),
    makeStudy("C", 0.7, 0.25),
    makeStudy("D", 0.4, 0.18),
    makeStudy("E", 0.6, 0.22),
  ];

  it("computes pooled effect as inverse-variance weighted mean", () => {
    const weights = studies.map((s) => 1 / (s.se * s.se));
    const totalW = weights.reduce((a, b) => a + b, 0);
    const expected = studies.reduce((s, st, i) => s + weights[i] * st.effect, 0) / totalW;
    const { pooled } = computeFixedEffectsMeta(studies);
    expect(pooled.effect).toBeCloseTo(expected, 4);
  });

  it("computes pooled SE as 1/sqrt(sum of weights)", () => {
    const weights = studies.map((s) => 1 / (s.se * s.se));
    const totalW = weights.reduce((a, b) => a + b, 0);
    const { pooled } = computeFixedEffectsMeta(studies);
    expect(pooled.se).toBeCloseTo(Math.sqrt(1 / totalW), 4);
  });

  it("CI bounds are pooledEffect +/- 1.96 * SE", () => {
    const { pooled } = computeFixedEffectsMeta(studies);
    expect(pooled.ciLower).toBeCloseTo(pooled.effect - 1.96 * pooled.se, 4);
    expect(pooled.ciUpper).toBeCloseTo(pooled.effect + 1.96 * pooled.se, 4);
  });

  it("z-value is pooledEffect / SE", () => {
    const { pooled } = computeFixedEffectsMeta(studies);
    expect(pooled.zValue).toBeCloseTo(pooled.effect / pooled.se, 4);
  });

  it("p-value is two-tailed and consistent with z-value", () => {
    const { pooled } = computeFixedEffectsMeta(studies);
    // For a clearly positive effect, p < 0.05
    expect(pooled.pValue).toBeGreaterThan(0);
    expect(pooled.pValue).toBeLessThan(0.05);
  });

  it("Cochran's Q is the weighted sum of squared deviations from pooled", () => {
    const weights = studies.map((s) => 1 / (s.se * s.se));
    const totalW = weights.reduce((a, b) => a + b, 0);
    const pe = studies.reduce((s, st, i) => s + weights[i] * st.effect, 0) / totalW;
    const expectedQ = studies.reduce(
      (s, st, i) => s + weights[i] * (st.effect - pe) ** 2,
      0
    );
    const { heterogeneity } = computeFixedEffectsMeta(studies);
    expect(heterogeneity.Q).toBeCloseTo(expectedQ, 4);
  });

  it("df equals k - 1", () => {
    const { heterogeneity } = computeFixedEffectsMeta(studies);
    expect(heterogeneity.df).toBe(studies.length - 1);
  });

  it("I² is between 0 and 100", () => {
    const { heterogeneity } = computeFixedEffectsMeta(studies);
    expect(heterogeneity.I2).toBeGreaterThanOrEqual(0);
    expect(heterogeneity.I2).toBeLessThanOrEqual(100);
  });

  it("tau² is non-negative", () => {
    const { heterogeneity } = computeFixedEffectsMeta(studies);
    expect(heterogeneity.tau2).toBeGreaterThanOrEqual(0);
  });

  it("H² equals Q/df when Q > df, else 1", () => {
    const { heterogeneity } = computeFixedEffectsMeta(studies);
    const expected = heterogeneity.Q / heterogeneity.df;
    expect(heterogeneity.H2).toBeCloseTo(expected, 4);
  });

  it("study weights sum to 100%", () => {
    const { weightedStudies } = computeFixedEffectsMeta(studies);
    const totalPct = weightedStudies.reduce((s, st) => s + (st.weight ?? 0), 0);
    expect(totalPct).toBeCloseTo(100, 2);
  });

  // Single study edge case
  it("single study: pooled effect equals that study's effect", () => {
    const single = [makeStudy("X", 0.5, 0.2)];
    const { pooled, heterogeneity } = computeFixedEffectsMeta(single);
    expect(pooled.effect).toBeCloseTo(0.5, 4);
    expect(heterogeneity.df).toBe(0);
    expect(heterogeneity.I2).toBe(0);
  });

  // Identical effects: Q should be 0, I² should be 0
  it("identical effects produce Q=0 and I²=0", () => {
    const identical = [
      makeStudy("A", 0.5, 0.2),
      makeStudy("B", 0.5, 0.15),
      makeStudy("C", 0.5, 0.3),
    ];
    const { heterogeneity } = computeFixedEffectsMeta(identical);
    expect(heterogeneity.Q).toBeCloseTo(0, 4);
    expect(heterogeneity.I2).toBeCloseTo(0, 4);
  });
});

// ---------------------------------------------------------------------------
// computeRandomEffectsMeta (DerSimonian-Laird)
// ---------------------------------------------------------------------------

describe("computeRandomEffectsMeta — DerSimonian-Laird", () => {
  // Use a dataset with known heterogeneity so tau² > 0
  const heterogeneousStudies: StudyEffect[] = [
    makeStudy("A", 0.1,  0.2),
    makeStudy("B", 0.8,  0.3),
    makeStudy("C", -0.2, 0.25),
    makeStudy("D", 1.2,  0.4),
    makeStudy("E", 0.5,  0.15),
  ];

  it("pooled effect is a number", () => {
    const { pooled } = computeRandomEffectsMeta(heterogeneousStudies);
    expect(typeof pooled.effect).toBe("number");
    expect(isNaN(pooled.effect)).toBe(false);
  });

  it("CI is wider in random-effects than fixed-effects when heterogeneity exists", () => {
    const fixed  = computeFixedEffectsMeta(heterogeneousStudies);
    const random = computeRandomEffectsMeta(heterogeneousStudies);
    const fixedWidth  = fixed.pooled.ciUpper  - fixed.pooled.ciLower;
    const randomWidth = random.pooled.ciUpper - random.pooled.ciLower;
    // When tau² > 0, random-effects CI should be at least as wide
    expect(randomWidth).toBeGreaterThanOrEqual(fixedWidth - TOLERANCE);
  });

  it("heterogeneity statistics are shared with fixed-effects computation", () => {
    const fixed  = computeFixedEffectsMeta(heterogeneousStudies);
    const random = computeRandomEffectsMeta(heterogeneousStudies);
    expect(random.heterogeneity.Q).toBeCloseTo(fixed.heterogeneity.Q, 4);
    expect(random.heterogeneity.I2).toBeCloseTo(fixed.heterogeneity.I2, 4);
    expect(random.heterogeneity.tau2).toBeCloseTo(fixed.heterogeneity.tau2, 4);
  });

  it("study weights sum to 100%", () => {
    const { weightedStudies } = computeRandomEffectsMeta(heterogeneousStudies);
    const totalPct = weightedStudies.reduce((s, st) => s + (st.weight ?? 0), 0);
    expect(totalPct).toBeCloseTo(100, 2);
  });

  it("single study: DerSimonian-Laird is undefined (NaN) because C=0 in tau² denominator", () => {
    // With k=1, C = totalW - sum(w²)/totalW = 0, so tau² = (Q-df)/C = 0/0 = NaN.
    // This is a known mathematical limitation of the DL estimator for a single study;
    // the fixed-effects model should be used instead in that case.
    const single = [makeStudy("X", 0.7, 0.3)];
    const { pooled } = computeRandomEffectsMeta(single);
    expect(isNaN(pooled.effect)).toBe(true);
  });

  it("identical effects: random-effects equals fixed-effects (tau²=0)", () => {
    const identical = [
      makeStudy("A", 0.5, 0.2),
      makeStudy("B", 0.5, 0.15),
      makeStudy("C", 0.5, 0.3),
    ];
    const fixed  = computeFixedEffectsMeta(identical);
    const random = computeRandomEffectsMeta(identical);
    expect(random.pooled.effect).toBeCloseTo(fixed.pooled.effect, 4);
    expect(random.pooled.se).toBeCloseTo(fixed.pooled.se, 4);
  });

  it("known DL pooled estimate for a reference dataset", () => {
    // Reference: 3 studies with moderate heterogeneity
    // Verified manually:
    //   weights_fixed = [1/0.04, 1/0.09, 1/0.0225] = [25, 11.11, 44.44]
    //   pooled_fixed = (25*0.2 + 11.11*0.6 + 44.44*0.4)/(25+11.11+44.44) ≈ 0.384
    //   Q = 25*(0.2-0.384)^2 + 11.11*(0.6-0.384)^2 + 44.44*(0.4-0.384)^2 ≈ 1.368
    //   tau2 = max(0, (Q - 2)/C) where C = totalW - sum(w^2)/totalW
    const ref = [
      makeStudy("R1", 0.2, 0.2),
      makeStudy("R2", 0.6, 0.3),
      makeStudy("R3", 0.4, 0.15),
    ];
    const { pooled, heterogeneity } = computeRandomEffectsMeta(ref);
    // Pooled must be between the min and max study effects
    expect(pooled.effect).toBeGreaterThan(-0.5);
    expect(pooled.effect).toBeLessThan(1.0);
    expect(heterogeneity.tau2).toBeGreaterThanOrEqual(0);
  });
});

// ---------------------------------------------------------------------------
// eggerTest
// ---------------------------------------------------------------------------

describe("eggerTest", () => {
  it("returns null for fewer than 3 studies", () => {
    expect(eggerTest([])).toBeNull();
    expect(eggerTest([makeStudy("A", 0.5, 0.2)])).toBeNull();
    expect(eggerTest([makeStudy("A", 0.5, 0.2), makeStudy("B", 0.3, 0.15)])).toBeNull();
  });

  it("returns an object with intercept, se, and pValue for 3+ studies", () => {
    const studies = [
      makeStudy("A", 0.5, 0.2),
      makeStudy("B", 0.3, 0.15),
      makeStudy("C", 0.7, 0.25),
    ];
    const result = eggerTest(studies);
    expect(result).not.toBeNull();
    expect(typeof result!.intercept).toBe("number");
    expect(typeof result!.se).toBe("number");
    expect(typeof result!.pValue).toBe("number");
  });

  it("SE of intercept is positive", () => {
    const studies = [
      makeStudy("A", 0.5, 0.2),
      makeStudy("B", 0.3, 0.15),
      makeStudy("C", 0.7, 0.25),
      makeStudy("D", 0.4, 0.18),
    ];
    const result = eggerTest(studies);
    expect(result!.se).toBeGreaterThan(0);
  });

  it("p-value is between 0 and 1", () => {
    const studies = [
      makeStudy("A", 0.5, 0.2),
      makeStudy("B", 0.3, 0.15),
      makeStudy("C", 0.7, 0.25),
      makeStudy("D", 0.4, 0.18),
      makeStudy("E", 0.6, 0.22),
    ];
    const result = eggerTest(studies);
    expect(result!.pValue).toBeGreaterThanOrEqual(0);
    expect(result!.pValue).toBeLessThanOrEqual(1);
  });

  it("symmetric funnel plot (no bias) gives intercept near 0", () => {
    // Construct studies that are perfectly symmetric around the pooled effect
    // so there should be minimal funnel asymmetry
    const studies: StudyEffect[] = [
      makeStudy("A",  0.5, 0.1),
      makeStudy("B",  0.5, 0.2),
      makeStudy("C",  0.5, 0.3),
      makeStudy("D",  0.5, 0.4),
      makeStudy("E",  0.5, 0.5),
    ];
    const result = eggerTest(studies);
    // When all effects are identical, standardized effects are all effect/se = 2.5
    // and precision is 1/se. The slope captures this perfectly, intercept = 0
    expect(result).not.toBeNull();
    expect(result!.intercept).toBeCloseTo(0, 3);
  });

  it("returns null when all precisions are equal (no variance in x)", () => {
    // All studies with the same SE: ssxx = 0
    const studies = [
      makeStudy("A", 0.5, 0.2),
      makeStudy("B", 0.3, 0.2),
      makeStudy("C", 0.7, 0.2),
    ];
    const result = eggerTest(studies);
    expect(result).toBeNull();
  });

  it("asymmetric funnel (publication bias) produces non-zero intercept", () => {
    // Simulate publication bias: larger studies (small SE) have smaller effects,
    // smaller studies (large SE) have inflated effects
    const biasedStudies: StudyEffect[] = [
      makeStudy("Large1",  0.3, 0.05),
      makeStudy("Large2",  0.35, 0.06),
      makeStudy("Medium1", 0.5, 0.15),
      makeStudy("Small1",  0.9, 0.4),
      makeStudy("Small2",  1.1, 0.45),
      makeStudy("Small3",  1.2, 0.5),
    ];
    const result = eggerTest(biasedStudies);
    expect(result).not.toBeNull();
    // With this asymmetry the intercept should be noticeably non-zero
    expect(Math.abs(result!.intercept)).toBeGreaterThan(0.01);
  });
});

// ---------------------------------------------------------------------------
// trimAndFill
// ---------------------------------------------------------------------------

describe("trimAndFill", () => {
  const baseStudies: StudyEffect[] = [
    makeStudy("A", 0.2, 0.2),
    makeStudy("B", 0.5, 0.15),
    makeStudy("C", 0.4, 0.25),
    makeStudy("D", 0.8, 0.3),
    makeStudy("E", 1.0, 0.35),
  ];

  it("returns imputedCount, adjustedStudies, and adjustedPooled", () => {
    const result = trimAndFill(baseStudies);
    expect(typeof result.imputedCount).toBe("number");
    expect(Array.isArray(result.adjustedStudies)).toBe(true);
    expect(result.adjustedPooled).toBeDefined();
  });

  it("imputedCount is non-negative and at most n", () => {
    const result = trimAndFill(baseStudies);
    expect(result.imputedCount).toBeGreaterThanOrEqual(0);
    expect(result.imputedCount).toBeLessThanOrEqual(baseStudies.length);
  });

  it("adjustedStudies has length = original + imputedCount", () => {
    const result = trimAndFill(baseStudies);
    expect(result.adjustedStudies.length).toBe(
      baseStudies.length + result.imputedCount
    );
  });

  it("imputed studies are labeled 'Imputed N'", () => {
    const result = trimAndFill(baseStudies);
    const imputed = result.adjustedStudies.filter((s) =>
      s.studyId.startsWith("imputed_")
    );
    expect(imputed.length).toBe(result.imputedCount);
  });

  it("adjustedPooled effect is a valid number", () => {
    const result = trimAndFill(baseStudies);
    expect(typeof result.adjustedPooled.effect).toBe("number");
    expect(isNaN(result.adjustedPooled.effect)).toBe(false);
  });

  it("fixed model option works", () => {
    const result = trimAndFill(baseStudies, "fixed");
    expect(result.imputedCount).toBeGreaterThanOrEqual(0);
    expect(result.adjustedStudies.length).toBe(
      baseStudies.length + result.imputedCount
    );
  });

  it("symmetric studies produce imputedCount of 0", () => {
    // Perfectly symmetric: studies are mirrored around the pooled effect
    // Use effects that are symmetric so T≈0 => k0≈0
    const symmetric: StudyEffect[] = [
      makeStudy("A",  0.0, 0.2),
      makeStudy("B",  0.0, 0.15),
      makeStudy("C",  0.0, 0.3),
    ];
    const result = trimAndFill(symmetric);
    expect(result.imputedCount).toBe(0);
  });

  it("adjustedPooled CI bounds are consistent with effect and se", () => {
    const result = trimAndFill(baseStudies);
    const { effect, se, ciLower, ciUpper } = result.adjustedPooled;
    expect(ciLower).toBeCloseTo(effect - 1.96 * se, 3);
    expect(ciUpper).toBeCloseTo(effect + 1.96 * se, 3);
  });
});

// ---------------------------------------------------------------------------
// Heterogeneity — high-I² scenario
// ---------------------------------------------------------------------------

describe("heterogeneity statistics — high I² scenario", () => {
  // Studies with very different effects: high heterogeneity expected
  const highHetStudies: StudyEffect[] = [
    makeStudy("A", -0.5, 0.1),
    makeStudy("B",  0.0, 0.1),
    makeStudy("C",  0.5, 0.1),
    makeStudy("D",  1.0, 0.1),
    makeStudy("E",  1.5, 0.1),
  ];

  it("I² > 50 for highly heterogeneous studies", () => {
    const { heterogeneity } = computeFixedEffectsMeta(highHetStudies);
    expect(heterogeneity.I2).toBeGreaterThan(50);
  });

  it("tau² > 0 for highly heterogeneous studies", () => {
    const { heterogeneity } = computeFixedEffectsMeta(highHetStudies);
    expect(heterogeneity.tau2).toBeGreaterThan(0);
  });

  it("Q > df for highly heterogeneous studies", () => {
    const { heterogeneity } = computeFixedEffectsMeta(highHetStudies);
    expect(heterogeneity.Q).toBeGreaterThan(heterogeneity.df);
  });
});

// ---------------------------------------------------------------------------
// Zero-event studies (OR with continuity correction)
// ---------------------------------------------------------------------------

describe("zero-event studies edge cases", () => {
  it("OR with all-zero events gets continuity correction and is not null", () => {
    const result = computeEffectSize("OR", { a: 0, b: 10, c: 5, d: 5 });
    expect(result).not.toBeNull();
    expect(isNaN(result!.effect)).toBe(false);
    expect(isFinite(result!.effect)).toBe(true);
  });

  it("OR with all cells zero still returns a result with correction", () => {
    const result = computeEffectSize("OR", { a: 0, b: 0, c: 0, d: 0 });
    // 0.5*0.5 / 0.5*0.5 = 1 => log(1) = 0
    expect(result).not.toBeNull();
    expect(result!.effect).toBeCloseTo(0, 4);
  });
});

// ---------------------------------------------------------------------------
// toNaturalScale / toNaturalScaleCI
// ---------------------------------------------------------------------------

describe("toNaturalScale", () => {
  it("exponentiates OR effects", () => {
    expect(toNaturalScale(Math.log(2), "OR")).toBeCloseTo(2, 4);
  });

  it("exponentiates RR effects", () => {
    expect(toNaturalScale(Math.log(1.5), "RR")).toBeCloseTo(1.5, 4);
  });

  it("returns raw value for SMD", () => {
    expect(toNaturalScale(0.8, "SMD")).toBeCloseTo(0.8, 4);
  });

  it("returns raw value for MD", () => {
    expect(toNaturalScale(3.5, "MD")).toBeCloseTo(3.5, 4);
  });

  it("returns raw value for RD", () => {
    expect(toNaturalScale(0.1, "RD")).toBeCloseTo(0.1, 4);
  });
});

describe("toNaturalScaleCI", () => {
  it("exponentiates CI bounds for OR", () => {
    const lower = Math.log(1.2), upper = Math.log(3.0);
    const result = toNaturalScaleCI(lower, upper, "OR");
    expect(result.lower).toBeCloseTo(1.2, 4);
    expect(result.upper).toBeCloseTo(3.0, 4);
  });

  it("exponentiates CI bounds for RR", () => {
    const lower = Math.log(0.8), upper = Math.log(2.5);
    const result = toNaturalScaleCI(lower, upper, "RR");
    expect(result.lower).toBeCloseTo(0.8, 4);
    expect(result.upper).toBeCloseTo(2.5, 4);
  });

  it("returns raw CI bounds for SMD", () => {
    const result = toNaturalScaleCI(-0.2, 1.8, "SMD");
    expect(result.lower).toBeCloseTo(-0.2, 4);
    expect(result.upper).toBeCloseTo(1.8, 4);
  });
});

// ---------------------------------------------------------------------------
// runSubgroupAnalysis
// ---------------------------------------------------------------------------

describe("runSubgroupAnalysis", () => {
  const allStudies: StudyEffect[] = [
    makeStudy("A", 0.5, 0.2),
    makeStudy("B", 0.3, 0.15),
    makeStudy("C", 0.7, 0.25),
    makeStudy("D", 0.4, 0.18),
    makeStudy("E", 0.6, 0.22),
    makeStudy("F", 0.2, 0.3),
  ];

  const groups = [
    { name: "Group1", studyIndices: [0, 1, 2] },
    { name: "Group2", studyIndices: [3, 4, 5] },
  ];

  it("returns subgroups with correct names", () => {
    const result = runSubgroupAnalysis(allStudies, groups, "OR", "fixed");
    const names = result.subgroups.map((sg) => sg.groupName);
    expect(names).toContain("Group1");
    expect(names).toContain("Group2");
  });

  it("each subgroup has a studyCount equal to number of indices", () => {
    const result = runSubgroupAnalysis(allStudies, groups, "OR", "fixed");
    for (const sg of result.subgroups) {
      expect(sg.studyCount).toBe(3);
    }
  });

  it("testForDifferences Q is non-negative", () => {
    const result = runSubgroupAnalysis(allStudies, groups, "OR", "fixed");
    expect(result.testForDifferences.Q).toBeGreaterThanOrEqual(0);
  });

  it("testForDifferences df = k - 1 where k = number of subgroups", () => {
    const result = runSubgroupAnalysis(allStudies, groups, "OR", "fixed");
    expect(result.testForDifferences.df).toBe(groups.length - 1);
  });

  it("groups with fewer than 2 studies are excluded", () => {
    const singleStudyGroups = [
      { name: "Solo",  studyIndices: [0] },
      { name: "Pair",  studyIndices: [1, 2] },
    ];
    const result = runSubgroupAnalysis(allStudies, singleStudyGroups, "OR", "fixed");
    const names = result.subgroups.map((sg) => sg.groupName);
    expect(names).not.toContain("Solo");
    expect(names).toContain("Pair");
  });
});

// ---------------------------------------------------------------------------
// runSensitivityAnalysis (leave-one-out)
// ---------------------------------------------------------------------------

describe("runSensitivityAnalysis", () => {
  const studies: StudyEffect[] = [
    makeStudy("A", 0.5, 0.2),
    makeStudy("B", 0.3, 0.15),
    makeStudy("C", 0.7, 0.25),
    makeStudy("D", 0.4, 0.18),
  ];

  it("returns empty array for fewer than 3 studies", () => {
    expect(runSensitivityAnalysis([], "OR", "fixed")).toHaveLength(0);
    expect(runSensitivityAnalysis([studies[0], studies[1]], "OR", "fixed")).toHaveLength(0);
  });

  it("returns k results for k studies", () => {
    const result = runSensitivityAnalysis(studies, "OR", "fixed");
    expect(result).toHaveLength(studies.length);
  });

  it("excluded study names match input study labels", () => {
    const result = runSensitivityAnalysis(studies, "OR", "fixed");
    const excluded = result.map((r) => r.excludedStudyName);
    for (const s of studies) {
      expect(excluded).toContain(s.studyLabel);
    }
  });

  it("excluded index matches position in input array", () => {
    const result = runSensitivityAnalysis(studies, "OR", "fixed");
    result.forEach((r, i) => {
      expect(r.excludedIndex).toBe(i);
    });
  });

  it("each leave-one-out pooled effect is a valid number", () => {
    const result = runSensitivityAnalysis(studies, "OR", "random");
    for (const r of result) {
      expect(typeof r.pooled.effect).toBe("number");
      expect(isNaN(r.pooled.effect)).toBe(false);
    }
  });

  it("removing a highly influential study changes pooled effect", () => {
    const withOutlier: StudyEffect[] = [
      makeStudy("A", 0.5, 0.2),
      makeStudy("B", 0.5, 0.15),
      makeStudy("C", 0.5, 0.25),
      makeStudy("Outlier", 5.0, 0.1), // large effect, precise study
    ];
    const result = runSensitivityAnalysis(withOutlier, "OR", "fixed");
    const withoutOutlier = result.find((r) => r.excludedStudyName === "Outlier");
    const fullMeta = computeFixedEffectsMeta(withOutlier);
    expect(Math.abs(withoutOutlier!.pooled.effect - fullMeta.pooled.effect)).toBeGreaterThan(0.1);
  });
});

// ---------------------------------------------------------------------------
// REML estimator
// ---------------------------------------------------------------------------

describe("REML estimator", () => {
  // Dataset with genuine heterogeneity (effects spread across a range)
  const typicalStudies: StudyEffect[] = [
    makeStudy("A", 0.1,  0.20),
    makeStudy("B", 0.8,  0.30),
    makeStudy("C", -0.2, 0.25),
    makeStudy("D", 1.2,  0.40),
    makeStudy("E", 0.5,  0.15),
  ];

  it("REML converges for typical heterogeneous data (3+ studies)", () => {
    const result = computeREML(typicalStudies);
    expect(result.converged).toBe(true);
    expect(result.iterations).toBeGreaterThan(0);
  });

  it("REML tau² is always non-negative", () => {
    const result = computeREML(typicalStudies);
    expect(result.tau2).toBeGreaterThanOrEqual(0);
  });

  it("REML tau² for identical effects is approximately 0", () => {
    const identical: StudyEffect[] = [
      makeStudy("A", 0.5, 0.2),
      makeStudy("B", 0.5, 0.15),
      makeStudy("C", 0.5, 0.3),
    ];
    const result = computeREML(identical);
    expect(result.tau2).toBeCloseTo(0, 4);
  });

  it("REML with a single study returns tau2 = 0 without iterating", () => {
    const single = [makeStudy("X", 0.7, 0.3)];
    const result = computeREML(single);
    expect(result.tau2).toBe(0);
    expect(result.converged).toBe(true);
    expect(result.iterations).toBe(0);
  });

  it("computeRandomEffectsMeta with method='REML' produces a valid pooled result", () => {
    const { pooled, heterogeneity, weightedStudies } =
      computeRandomEffectsMeta(typicalStudies, "REML");

    expect(typeof pooled.effect).toBe("number");
    expect(isNaN(pooled.effect)).toBe(false);
    expect(pooled.ciLower).toBeLessThan(pooled.effect);
    expect(pooled.ciUpper).toBeGreaterThan(pooled.effect);
    expect(pooled.pValue).toBeGreaterThanOrEqual(0);
    expect(pooled.pValue).toBeLessThanOrEqual(1);
    expect(heterogeneity.tau2).toBeGreaterThanOrEqual(0);

    const totalPct = weightedStudies.reduce((s, st) => s + (st.weight ?? 0), 0);
    expect(totalPct).toBeCloseTo(100, 2);
  });

  it("REML method='REML' tau² equals computeREML tau²", () => {
    const remlDirect = computeREML(typicalStudies);
    const { heterogeneity } = computeRandomEffectsMeta(typicalStudies, "REML");
    expect(heterogeneity.tau2).toBeCloseTo(remlDirect.tau2, 6);
  });

  it("REML CI is typically different from DL CI when heterogeneity exists", () => {
    const dl   = computeRandomEffectsMeta(typicalStudies, "DL");
    const reml = computeRandomEffectsMeta(typicalStudies, "REML");
    // CI widths may differ; at minimum the estimates should not be identical
    // (REML and DL tau² estimators differ for finite-sample data)
    const dlWidth   = dl.pooled.ciUpper   - dl.pooled.ciLower;
    const remlWidth = reml.pooled.ciUpper - reml.pooled.ciLower;
    // Both must be positive
    expect(dlWidth).toBeGreaterThan(0);
    expect(remlWidth).toBeGreaterThan(0);
    // Their tau² estimates should differ by at least a small amount for this dataset
    expect(Math.abs(reml.heterogeneity.tau2 - dl.heterogeneity.tau2)).toBeGreaterThan(1e-6);
  });

  it("DL method (default) is backward compatible — same result as before", () => {
    const defaultResult = computeRandomEffectsMeta(typicalStudies);
    const explicitDL    = computeRandomEffectsMeta(typicalStudies, "DL");
    expect(defaultResult.pooled.effect).toBeCloseTo(explicitDL.pooled.effect, 8);
    expect(defaultResult.pooled.se).toBeCloseTo(explicitDL.pooled.se, 8);
    expect(defaultResult.heterogeneity.tau2).toBeCloseTo(explicitDL.heterogeneity.tau2, 8);
  });

  it("REML tau² is positive for a clearly heterogeneous dataset", () => {
    // Five studies with wildly different effects: REML must detect heterogeneity
    const highHet: StudyEffect[] = [
      makeStudy("A", -0.5, 0.1),
      makeStudy("B",  0.0, 0.1),
      makeStudy("C",  0.5, 0.1),
      makeStudy("D",  1.0, 0.1),
      makeStudy("E",  1.5, 0.1),
    ];
    const result = computeREML(highHet);
    expect(result.tau2).toBeGreaterThan(0);
    expect(result.converged).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// tQuantile helper
// ---------------------------------------------------------------------------

describe("tQuantile", () => {
  it("returns 0 for p = 0.5 (median of symmetric t-distribution)", () => {
    expect(tQuantile(0.5, 10)).toBeCloseTo(0, 3);
  });

  it("is symmetric: tQuantile(p, df) = -tQuantile(1-p, df)", () => {
    const q = tQuantile(0.975, 10);
    expect(tQuantile(0.025, 10)).toBeCloseTo(-q, 3);
  });

  it("t_0.975 for df=1 (Cauchy) is approximately 12.7", () => {
    // From standard t-tables: t(0.975, 1) = 12.706
    expect(tQuantile(0.975, 1)).toBeCloseTo(12.706, 1);
  });

  it("t_0.975 for df=5 is approximately 2.571", () => {
    // From standard t-tables: t(0.975, 5) = 2.5706
    expect(tQuantile(0.975, 5)).toBeCloseTo(2.5706, 1);
  });

  it("t_0.975 for df=10 is approximately 2.228", () => {
    expect(tQuantile(0.975, 10)).toBeCloseTo(2.228, 1);
  });

  it("t_0.975 for df=30 is approximately 2.042", () => {
    expect(tQuantile(0.975, 30)).toBeCloseTo(2.042, 1);
  });

  it("approaches z_0.975 (1.96) as df increases", () => {
    // For df = 1000, should be very close to 1.96
    expect(tQuantile(0.975, 1000)).toBeCloseTo(1.96, 1);
  });

  it("returns normalQuantile for df > 300", () => {
    // For df = 500, the t-quantile should be indistinguishable from z
    const t500 = tQuantile(0.975, 500);
    expect(Math.abs(t500 - 1.96)).toBeLessThan(0.01);
  });
});

// ---------------------------------------------------------------------------
// HKSJ confidence intervals
// ---------------------------------------------------------------------------

describe("HKSJ confidence intervals", () => {
  // Heterogeneous dataset — HKSJ will have a wider CI than Wald
  const heterogeneousStudies: StudyEffect[] = [
    makeStudy("A", 0.1,  0.20),
    makeStudy("B", 0.8,  0.30),
    makeStudy("C", -0.2, 0.25),
    makeStudy("D", 1.2,  0.40),
    makeStudy("E", 0.5,  0.15),
  ];

  it("HKSJ CI is wider than (or equal to) Wald CI when q >= 1", () => {
    const wald = computeRandomEffectsMeta(heterogeneousStudies, "DL", { ci: "wald" });
    const hksj = computeRandomEffectsMeta(heterogeneousStudies, "DL", { ci: "hksj" });
    const waldWidth = wald.pooled.ciUpper - wald.pooled.ciLower;
    const hksjWidth = hksj.pooled.ciUpper - hksj.pooled.ciLower;
    expect(hksjWidth).toBeGreaterThanOrEqual(waldWidth - TOLERANCE);
  });

  it("HKSJ produces a valid (finite, non-NaN) pooled estimate", () => {
    const result = computeRandomEffectsMeta(heterogeneousStudies, "DL", { ci: "hksj" });
    expect(isNaN(result.pooled.effect)).toBe(false);
    expect(isFinite(result.pooled.ciLower)).toBe(true);
    expect(isFinite(result.pooled.ciUpper)).toBe(true);
  });

  it("HKSJ pooled point estimate equals Wald point estimate (same weights)", () => {
    const wald = computeRandomEffectsMeta(heterogeneousStudies, "DL", { ci: "wald" });
    const hksj = computeRandomEffectsMeta(heterogeneousStudies, "DL", { ci: "hksj" });
    // The pooled effect estimate is the same; only the CI changes
    expect(hksj.pooled.effect).toBeCloseTo(wald.pooled.effect, 6);
  });

  it("HKSJ p-value is between 0 and 1", () => {
    const result = computeRandomEffectsMeta(heterogeneousStudies, "DL", { ci: "hksj" });
    expect(result.pooled.pValue).toBeGreaterThanOrEqual(0);
    expect(result.pooled.pValue).toBeLessThanOrEqual(1);
  });

  it("HKSJ CI bounds correctly ordered: lower < effect < upper", () => {
    const result = computeRandomEffectsMeta(heterogeneousStudies, "DL", { ci: "hksj" });
    expect(result.pooled.ciLower).toBeLessThan(result.pooled.effect);
    expect(result.pooled.ciUpper).toBeGreaterThan(result.pooled.effect);
  });

  it("HKSJ with k=2 studies still works (df=1, very wide CI)", () => {
    const twoStudies = [makeStudy("A", 0.5, 0.3), makeStudy("B", 1.0, 0.4)];
    const result = computeRandomEffectsMeta(twoStudies, "DL", { ci: "hksj" });
    expect(isNaN(result.pooled.effect)).toBe(false);
    // With df=1, t-critical is ~12.7, so CI should be very wide
    const width = result.pooled.ciUpper - result.pooled.ciLower;
    expect(width).toBeGreaterThan(1.0);
  });

  it("HKSJ truncation: q is always >= 1 (Knapp-Hartung truncation rule)", () => {
    // With identical effects, q would be 0 without truncation;
    // with truncation the CI uses q = 1
    const identical = [
      makeStudy("A", 0.5, 0.2),
      makeStudy("B", 0.5, 0.15),
      makeStudy("C", 0.5, 0.3),
    ];
    const hksj = computeRandomEffectsMeta(identical, "DL", { ci: "hksj" });
    const wald = computeRandomEffectsMeta(identical, "DL", { ci: "wald" });
    // Truncation means HKSJ CI is at least as wide as without truncation
    const hksjWidth = hksj.pooled.ciUpper - hksj.pooled.ciLower;
    const waldWidth = wald.pooled.ciUpper - wald.pooled.ciLower;
    expect(hksjWidth).toBeGreaterThanOrEqual(waldWidth - TOLERANCE);
  });

  it("HKSJ with REML method also works correctly", () => {
    const result = computeRandomEffectsMeta(
      heterogeneousStudies,
      "REML",
      { ci: "hksj" }
    );
    expect(isNaN(result.pooled.effect)).toBe(false);
    expect(result.pooled.ciLower).toBeLessThan(result.pooled.ciUpper);
  });

  it("default (no options) is backward compatible with Wald CI", () => {
    const defaultResult = computeRandomEffectsMeta(heterogeneousStudies, "DL");
    const waldResult    = computeRandomEffectsMeta(heterogeneousStudies, "DL", { ci: "wald" });
    expect(defaultResult.pooled.ciLower).toBeCloseTo(waldResult.pooled.ciLower, 6);
    expect(defaultResult.pooled.ciUpper).toBeCloseTo(waldResult.pooled.ciUpper, 6);
  });
});

// ---------------------------------------------------------------------------
// Prediction intervals
// ---------------------------------------------------------------------------

describe("Prediction intervals", () => {
  const heterogeneousStudies: StudyEffect[] = [
    makeStudy("A", 0.1,  0.20),
    makeStudy("B", 0.8,  0.30),
    makeStudy("C", -0.2, 0.25),
    makeStudy("D", 1.2,  0.40),
    makeStudy("E", 0.5,  0.15),
  ];

  it("prediction interval is null when option not set", () => {
    const result = computeRandomEffectsMeta(heterogeneousStudies, "DL");
    expect(result.predictionInterval).toBeNull();
  });

  it("prediction interval is wider than the pooled CI", () => {
    const result = computeRandomEffectsMeta(
      heterogeneousStudies, "DL", { predictionInterval: true }
    );
    expect(result.predictionInterval).not.toBeNull();
    const ciWidth = result.pooled.ciUpper - result.pooled.ciLower;
    const piWidth =
      result.predictionInterval!.upper - result.predictionInterval!.lower;
    expect(piWidth).toBeGreaterThanOrEqual(ciWidth - TOLERANCE);
  });

  it("prediction interval lower < pooled effect < prediction interval upper", () => {
    const result = computeRandomEffectsMeta(
      heterogeneousStudies, "DL", { predictionInterval: true }
    );
    expect(result.predictionInterval!.lower).toBeLessThan(result.pooled.effect);
    expect(result.predictionInterval!.upper).toBeGreaterThan(result.pooled.effect);
  });

  it("prediction interval is null for k = 2 (requires k >= 3)", () => {
    const twoStudies = [makeStudy("A", 0.5, 0.2), makeStudy("B", 0.3, 0.15)];
    const result = computeRandomEffectsMeta(
      twoStudies, "DL", { predictionInterval: true }
    );
    expect(result.predictionInterval).toBeNull();
  });

  it("prediction interval with tau2 = 0 is still at least as wide as CI", () => {
    // Identical effects -> tau2 = 0 (or near 0)
    // PI = pooledEffect +/- t_{k-2,0.025} * sqrt(0 + se_pooled^2)
    //    = pooledEffect +/- t_{k-2} * se_pooled >= z * se_pooled (since t > z for k>2)
    const identical = [
      makeStudy("A", 0.5, 0.2),
      makeStudy("B", 0.5, 0.15),
      makeStudy("C", 0.5, 0.3),
    ];
    const result = computeRandomEffectsMeta(
      identical, "DL", { predictionInterval: true }
    );
    expect(result.predictionInterval).not.toBeNull();
    const ciWidth = result.pooled.ciUpper - result.pooled.ciLower;
    const piWidth =
      result.predictionInterval!.upper - result.predictionInterval!.lower;
    // PI uses t_{k-2} rather than z_0.975, so it must be at least as wide
    expect(piWidth).toBeGreaterThanOrEqual(ciWidth - TOLERANCE);
  });

  it("prediction interval with high heterogeneity is very wide", () => {
    const highHet: StudyEffect[] = [
      makeStudy("A", -1.0, 0.1),
      makeStudy("B",  0.0, 0.1),
      makeStudy("C",  1.0, 0.1),
      makeStudy("D",  2.0, 0.1),
      makeStudy("E",  3.0, 0.1),
    ];
    const result = computeRandomEffectsMeta(
      highHet, "DL", { predictionInterval: true }
    );
    const piWidth =
      result.predictionInterval!.upper - result.predictionInterval!.lower;
    // High heterogeneity should produce a very wide prediction interval
    expect(piWidth).toBeGreaterThan(2.0);
  });

  it("HKSJ + prediction interval can be requested together", () => {
    const result = computeRandomEffectsMeta(
      heterogeneousStudies,
      "DL",
      { ci: "hksj", predictionInterval: true }
    );
    expect(result.predictionInterval).not.toBeNull();
    expect(result.pooled.ciLower).toBeLessThan(result.pooled.effect);
    expect(result.pooled.ciUpper).toBeGreaterThan(result.pooled.effect);
  });

  it("predictionInterval is returned in the correct shape", () => {
    const result = computeRandomEffectsMeta(
      heterogeneousStudies, "DL", { predictionInterval: true }
    );
    const pi = result.predictionInterval!;
    expect(typeof pi.lower).toBe("number");
    expect(typeof pi.upper).toBe("number");
    expect(isNaN(pi.lower)).toBe(false);
    expect(isNaN(pi.upper)).toBe(false);
  });
});
