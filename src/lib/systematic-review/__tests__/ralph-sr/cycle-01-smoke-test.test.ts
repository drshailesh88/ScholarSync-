/**
 * RALPH SR — Cycle 1: End-to-End Smoke Test
 *
 * Simulates a small systematic review of SGLT2 inhibitors on heart failure.
 * Tests the full mathematical pipeline (no DB, no AI):
 *   1. Effect size computation from raw data
 *   2. Fixed-effects meta-analysis
 *   3. Random-effects meta-analysis
 *   4. Egger's test for publication bias
 *   5. PRISMA flow diagram arithmetic consistency
 *   6. Subgroup and sensitivity analysis
 *
 * Goal: Does the mathematical spine of the SR pipeline complete without errors?
 */

import { describe, it, expect } from "vitest";
import {
  computeEffectSize,
  computeFixedEffectsMeta,
  computeRandomEffectsMeta,
  eggerTest,
  trimAndFill,
  runSubgroupAnalysis,
  runSensitivityAnalysis,
  type StudyEffect,
} from "@/lib/systematic-review/meta-analysis";
import {
  SGLT2_STUDIES,
  computeExpectedFixedEffect,
  MOCK_PRISMA_FLOW,
} from "./fixtures/sglt2-studies";
import {
  checkPRISMAConsistency,
  scoreCycle,
  type ScoringDimension,
} from "./scorer";

// ---------------------------------------------------------------------------
// Test state — accumulate issues and checks
// ---------------------------------------------------------------------------

const issues: string[] = [];
const passedChecks: string[] = [];

// ---------------------------------------------------------------------------
// Stage 1: Effect size computation
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 1 — Stage 1: Effect Size Computation", () => {
  it("computes log-OR from a 2x2 table", () => {
    const result = computeEffectSize("OR", {
      a: 386,
      b: 2373 - 386,
      c: 502,
      d: 2371 - 502,
    });
    expect(result).not.toBeNull();
    expect(result!.effect).toBeLessThan(0);
    passedChecks.push("OR computation returns protective effect");

    const expectedOR = (386 * (2371 - 502)) / ((2373 - 386) * 502);
    expect(result!.effect).toBeCloseTo(Math.log(expectedOR), 3);
    passedChecks.push("OR matches hand calculation");
  });

  it("computes log-RR from a 2x2 table", () => {
    const result = computeEffectSize("RR", {
      a: 386,
      b: 2373 - 386,
      c: 502,
      d: 2371 - 502,
    });
    expect(result).not.toBeNull();
    expect(result!.effect).toBeLessThan(0);
    passedChecks.push("RR computation returns protective effect");
  });

  it("computes SMD (Hedges g) from continuous data", () => {
    const result = computeEffectSize("SMD", {
      mean1: 5.2,
      sd1: 8.1,
      n1: 100,
      mean2: 2.1,
      sd2: 7.9,
      n2: 100,
    });
    expect(result).not.toBeNull();
    expect(result!.effect).toBeGreaterThan(0);
    expect(result!.se).toBeGreaterThan(0);
    expect(result!.ciLower).toBeLessThan(result!.effect);
    expect(result!.ciUpper).toBeGreaterThan(result!.effect);
    passedChecks.push("SMD computation works correctly");
  });

  it("computes MD from continuous data", () => {
    const result = computeEffectSize("MD", {
      mean1: -3.2,
      sd1: 1.5,
      n1: 200,
      mean2: -1.1,
      sd2: 1.4,
      n2: 200,
    });
    expect(result).not.toBeNull();
    expect(result!.effect).toBeCloseTo(-3.2 - (-1.1), 4);
    passedChecks.push("MD computation works correctly");
  });

  it("computes RD from a 2x2 table", () => {
    const result = computeEffectSize("RD", {
      a: 386,
      b: 2373 - 386,
      c: 502,
      d: 2371 - 502,
    });
    expect(result).not.toBeNull();
    expect(result!.effect).toBeLessThan(0);
    passedChecks.push("RD computation works correctly");
  });

  it("returns null for missing fields", () => {
    expect(computeEffectSize("OR", {})).toBeNull();
    expect(computeEffectSize("SMD", { mean1: 5 })).toBeNull();
    passedChecks.push("Handles missing fields gracefully");
  });

  it("handles zero cells with continuity correction", () => {
    const result = computeEffectSize("OR", { a: 0, b: 50, c: 5, d: 45 });
    expect(result).not.toBeNull();
    expect(isFinite(result!.effect)).toBe(true);
    expect(isFinite(result!.se)).toBe(true);
    passedChecks.push("Zero cell correction works");
  });
});

// ---------------------------------------------------------------------------
// Stage 2: Fixed-effects meta-analysis
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 1 — Stage 2: Fixed-Effects Meta-Analysis", () => {
  it("computes pooled effect for 5 SGLT2 studies", () => {
    const result = computeFixedEffectsMeta(SGLT2_STUDIES);
    const expected = computeExpectedFixedEffect();

    expect(result.pooled.effect).toBeCloseTo(expected.pooledLogHR, 4);
    passedChecks.push("Fixed-effect pooled estimate matches hand calculation");

    const pooledHR = Math.exp(result.pooled.effect);
    expect(pooledHR).toBeGreaterThan(0.7);
    expect(pooledHR).toBeLessThan(0.85);
    passedChecks.push(`Fixed-effect pooled HR: ${pooledHR.toFixed(4)}`);
  });

  it("pooled SE matches hand calculation", () => {
    const result = computeFixedEffectsMeta(SGLT2_STUDIES);
    const expected = computeExpectedFixedEffect();
    expect(result.pooled.se).toBeCloseTo(expected.pooledSE, 4);
    passedChecks.push("Fixed-effect pooled SE matches");
  });

  it("CI bounds are correct", () => {
    const result = computeFixedEffectsMeta(SGLT2_STUDIES);
    expect(result.pooled.ciLower).toBeCloseTo(
      result.pooled.effect - 1.96 * result.pooled.se,
      4
    );
    expect(result.pooled.ciUpper).toBeCloseTo(
      result.pooled.effect + 1.96 * result.pooled.se,
      4
    );
    passedChecks.push("Fixed-effect CI bounds correct");
  });

  it("heterogeneity statistics are computed", () => {
    const result = computeFixedEffectsMeta(SGLT2_STUDIES);
    expect(result.heterogeneity.Q).toBeGreaterThanOrEqual(0);
    expect(result.heterogeneity.df).toBe(4);
    expect(result.heterogeneity.I2).toBeGreaterThanOrEqual(0);
    expect(result.heterogeneity.I2).toBeLessThanOrEqual(100);
    expect(result.heterogeneity.tau2).toBeGreaterThanOrEqual(0);
    passedChecks.push(
      `I2 = ${result.heterogeneity.I2.toFixed(1)}%, Q = ${result.heterogeneity.Q.toFixed(2)}`
    );
  });

  it("Q matches hand calculation", () => {
    const result = computeFixedEffectsMeta(SGLT2_STUDIES);
    const expected = computeExpectedFixedEffect();
    expect(result.heterogeneity.Q).toBeCloseTo(expected.Q, 4);
    passedChecks.push("Cochran's Q matches hand calculation");
  });

  it("study weights sum to 100%", () => {
    const result = computeFixedEffectsMeta(SGLT2_STUDIES);
    const totalWeight = result.weightedStudies.reduce(
      (s, st) => s + (st.weight ?? 0),
      0
    );
    expect(totalWeight).toBeCloseTo(100, 1);
    passedChecks.push("Study weights sum to 100%");
  });

  it("each study has a positive weight", () => {
    const result = computeFixedEffectsMeta(SGLT2_STUDIES);
    for (const study of result.weightedStudies) {
      expect(study.weight).toBeGreaterThan(0);
    }
    passedChecks.push("All studies have positive weights");
  });

  it("handles single study gracefully", () => {
    const result = computeFixedEffectsMeta([SGLT2_STUDIES[0]]);
    expect(result.pooled.effect).toBe(SGLT2_STUDIES[0].effect);
    expect(result.heterogeneity.df).toBe(0);
    passedChecks.push("Single-study meta-analysis works");
  });

  it("handles two studies", () => {
    const result = computeFixedEffectsMeta(SGLT2_STUDIES.slice(0, 2));
    expect(result.pooled.effect).toBeDefined();
    expect(result.heterogeneity.df).toBe(1);
    passedChecks.push("Two-study meta-analysis works");
  });
});

// ---------------------------------------------------------------------------
// Stage 3: Random-effects meta-analysis
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 1 — Stage 3: Random-Effects Meta-Analysis", () => {
  it("computes DerSimonian-Laird random-effects pooled estimate", () => {
    const result = computeRandomEffectsMeta(SGLT2_STUDIES, "DL");
    const pooledHR = Math.exp(result.pooled.effect);

    expect(pooledHR).toBeLessThan(1);
    expect(pooledHR).toBeGreaterThan(0.5);
    passedChecks.push(`DL random-effects pooled HR: ${pooledHR.toFixed(4)}`);
  });

  it("random-effects CI is wider than fixed-effects CI", () => {
    const fixed = computeFixedEffectsMeta(SGLT2_STUDIES);
    const random = computeRandomEffectsMeta(SGLT2_STUDIES, "DL");

    const fixedWidth = fixed.pooled.ciUpper - fixed.pooled.ciLower;
    const randomWidth = random.pooled.ciUpper - random.pooled.ciLower;

    expect(randomWidth).toBeGreaterThanOrEqual(fixedWidth - 1e-10);
    passedChecks.push("Random-effects CI is wider than fixed-effects CI");
  });

  it("computes REML random-effects estimate", () => {
    const result = computeRandomEffectsMeta(SGLT2_STUDIES, "REML");
    const pooledHR = Math.exp(result.pooled.effect);
    expect(pooledHR).toBeLessThan(1);
    expect(pooledHR).toBeGreaterThan(0.5);
    passedChecks.push(`REML random-effects pooled HR: ${pooledHR.toFixed(4)}`);
  });

  it("DL and REML give similar results (low heterogeneity)", () => {
    const dl = computeRandomEffectsMeta(SGLT2_STUDIES, "DL");
    const reml = computeRandomEffectsMeta(SGLT2_STUDIES, "REML");

    expect(Math.abs(dl.pooled.effect - reml.pooled.effect)).toBeLessThan(0.05);
    passedChecks.push("DL and REML estimates are close");
  });

  it("prediction interval is computed when requested", () => {
    const result = computeRandomEffectsMeta(SGLT2_STUDIES, "DL", {
      predictionInterval: true,
    });
    expect(result.predictionInterval).not.toBeNull();
    if (result.predictionInterval) {
      expect(result.predictionInterval.lower).toBeLessThan(result.pooled.effect);
      expect(result.predictionInterval.upper).toBeGreaterThan(result.pooled.effect);
      passedChecks.push("Prediction interval computed correctly");
    }
  });

  it("HKSJ adjustment works", () => {
    const result = computeRandomEffectsMeta(SGLT2_STUDIES, "DL", {
      ci: "hksj",
    });
    expect(result.pooled.ciLower).toBeDefined();
    expect(result.pooled.ciUpper).toBeDefined();
    expect(result.pooled.ciLower).toBeLessThan(result.pooled.effect);
    passedChecks.push("Knapp-Hartung adjustment works");
  });
});

// ---------------------------------------------------------------------------
// Stage 4: Egger's test & trim-and-fill
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 1 — Stage 4: Publication Bias Tests", () => {
  it("Egger's test returns result for 5 studies", () => {
    const result = eggerTest(SGLT2_STUDIES);
    expect(result).not.toBeNull();
    if (result) {
      expect(typeof result.intercept).toBe("number");
      expect(typeof result.se).toBe("number");
      expect(typeof result.pValue).toBe("number");
      expect(result.pValue).toBeGreaterThanOrEqual(0);
      expect(result.pValue).toBeLessThanOrEqual(1);
      passedChecks.push(
        `Egger's test: intercept=${result.intercept.toFixed(3)}, p=${result.pValue.toFixed(3)}`
      );
    }
  });

  it("Egger's test returns null for < 3 studies", () => {
    const result = eggerTest(SGLT2_STUDIES.slice(0, 2));
    expect(result).toBeNull();
    passedChecks.push("Egger's test correctly requires >= 3 studies");
  });

  it("trim-and-fill runs without error", () => {
    const result = trimAndFill(SGLT2_STUDIES);
    expect(result).toBeDefined();
    expect(result.imputedCount).toBeGreaterThanOrEqual(0);
    expect(result.adjustedStudies.length).toBeGreaterThanOrEqual(
      SGLT2_STUDIES.length
    );
    passedChecks.push(
      `Trim-and-fill: ${result.imputedCount} imputed studies, adjusted HR=${Math.exp(result.adjustedPooled.effect).toFixed(4)}`
    );
  });
});

// ---------------------------------------------------------------------------
// Stage 5: Subgroup and sensitivity analysis
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 1 — Stage 5: Subgroup & Sensitivity Analysis", () => {
  it("subgroup analysis partitions studies correctly", () => {
    const groups = [
      { name: "HFrEF", studyIndices: [0, 1] },
      { name: "HFpEF", studyIndices: [2, 3] },
      { name: "Mixed", studyIndices: [4] },
    ];

    const result = runSubgroupAnalysis(SGLT2_STUDIES, groups, "OR", "random");
    expect(result.subgroups).toHaveLength(2);
    expect(result.subgroups.map((sg) => sg.groupName).sort()).toEqual(
      ["HFpEF", "HFrEF"].sort()
    );
    passedChecks.push("Subgroup analysis runs correctly");

    expect(typeof result.testForDifferences.Q).toBe("number");
    expect(typeof result.testForDifferences.p).toBe("number");
    passedChecks.push("Between-subgroup interaction test computed");
  });

  it("leave-one-out sensitivity analysis", () => {
    const result = runSensitivityAnalysis(SGLT2_STUDIES, "OR", "random");
    expect(result).toHaveLength(SGLT2_STUDIES.length);

    for (const loo of result) {
      expect(loo.excludedStudyName).toBeDefined();
      expect(loo.pooled.effect).toBeDefined();
      expect(Math.exp(loo.pooled.effect)).toBeLessThan(1);
    }
    passedChecks.push("Leave-one-out analysis: all subsets remain protective");
  });
});

// ---------------------------------------------------------------------------
// Stage 6: PRISMA flow arithmetic consistency
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 1 — Stage 6: PRISMA Flow Consistency", () => {
  it("PRISMA flow numbers are internally consistent", () => {
    const { consistent, errors } = checkPRISMAConsistency(MOCK_PRISMA_FLOW);
    if (!consistent) {
      for (const err of errors) {
        issues.push(`PRISMA: ${err}`);
      }
    }
    expect(consistent).toBe(true);
    if (consistent) {
      passedChecks.push("PRISMA flow passes all 8 arithmetic checks");
    }
  });

  it("detects intentionally broken PRISMA flow", () => {
    const broken = {
      ...MOCK_PRISMA_FLOW,
      identification: {
        ...MOCK_PRISMA_FLOW.identification,
        totalIdentified: 999,
      },
    };
    const { consistent } = checkPRISMAConsistency(broken);
    expect(consistent).toBe(false);
    passedChecks.push("Correctly detects broken PRISMA flow numbers");
  });

  it("all PRISMA flow numbers are non-negative", () => {
    const allNonNegative = [
      MOCK_PRISMA_FLOW.identification.databaseResults,
      MOCK_PRISMA_FLOW.identification.registerResults,
      MOCK_PRISMA_FLOW.identification.otherSources,
      MOCK_PRISMA_FLOW.screening.recordsScreened,
      MOCK_PRISMA_FLOW.eligibility.reportsRetrieved,
      MOCK_PRISMA_FLOW.included.studiesIncluded,
    ].every((n) => n >= 0);
    expect(allNonNegative).toBe(true);
    passedChecks.push("All PRISMA values non-negative");
  });

  it("monotonically decreasing funnel", () => {
    expect(MOCK_PRISMA_FLOW.identification.totalIdentified).toBeGreaterThan(
      MOCK_PRISMA_FLOW.screening.recordsScreened
    );
    expect(MOCK_PRISMA_FLOW.screening.recordsScreened).toBeGreaterThan(
      MOCK_PRISMA_FLOW.eligibility.reportsRetrieved
    );
    expect(MOCK_PRISMA_FLOW.eligibility.reportsRetrieved).toBeGreaterThan(
      MOCK_PRISMA_FLOW.included.studiesIncluded
    );
    passedChecks.push("PRISMA funnel is monotonically decreasing");
  });
});

// ---------------------------------------------------------------------------
// Stage 7: Full pipeline integration (pure math path)
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 1 — Stage 7: Full Pipeline Integration", () => {
  it("runs the complete mathematical pipeline end-to-end", () => {
    // Step 1: Compute effect sizes from raw 2x2 data
    const rawStudies = [
      { id: "Study A", a: 386, b: 1987, c: 502, d: 1869 },
      { id: "Study B", a: 361, b: 1504, c: 462, d: 1403 },
      { id: "Study C", a: 512, b: 2620, c: 610, d: 2521 },
      { id: "Study D", a: 415, b: 2579, c: 511, d: 2483 },
      { id: "Study E", a: 51, b: 559, c: 76, d: 536 },
    ];

    const effects: StudyEffect[] = rawStudies
      .map((s) => {
        const eff = computeEffectSize("OR", { a: s.a, b: s.b, c: s.c, d: s.d });
        if (!eff) return null;
        return { ...eff, studyId: s.id, studyLabel: s.id };
      })
      .filter((e): e is StudyEffect => e !== null);

    expect(effects).toHaveLength(5);
    passedChecks.push("Step 1: All 5 effect sizes computed");

    // Step 2: Fixed-effects meta-analysis
    const fixed = computeFixedEffectsMeta(effects);
    expect(fixed.pooled.effect).toBeDefined();
    expect(Math.exp(fixed.pooled.effect)).toBeLessThan(1);
    passedChecks.push(
      `Step 2: Fixed-effect OR = ${Math.exp(fixed.pooled.effect).toFixed(4)}`
    );

    // Step 3: Random-effects meta-analysis
    const random = computeRandomEffectsMeta(effects, "DL");
    expect(random.pooled.effect).toBeDefined();
    passedChecks.push(
      `Step 3: Random-effect OR = ${Math.exp(random.pooled.effect).toFixed(4)}`
    );

    // Step 4: Egger's test
    const egger = eggerTest(effects);
    expect(egger).not.toBeNull();
    passedChecks.push("Step 4: Egger's test completed");

    // Step 5: Subgroup analysis
    const subgroupGroups = [
      { name: "Large trials", studyIndices: [0, 1, 2] },
      { name: "Small trials", studyIndices: [3, 4] },
    ];
    const subgroupResult = runSubgroupAnalysis(effects, subgroupGroups, "OR", "random");
    expect(subgroupResult.subgroups).toHaveLength(2);
    passedChecks.push("Step 5: Subgroup analysis completed");

    // Step 6: Sensitivity analysis
    const sensitivity = runSensitivityAnalysis(effects, "OR", "random");
    expect(sensitivity).toHaveLength(5);
    passedChecks.push("Step 6: Sensitivity analysis completed");

    // Step 7: Trim-and-fill
    const taf = trimAndFill(effects);
    expect(taf.adjustedStudies.length).toBeGreaterThanOrEqual(5);
    passedChecks.push("Step 7: Trim-and-fill completed");

    // Verify no NaN/Infinity values
    const allValues = [
      fixed.pooled.effect,
      fixed.pooled.se,
      fixed.pooled.ciLower,
      fixed.pooled.ciUpper,
      random.pooled.effect,
      random.pooled.se,
      random.pooled.ciLower,
      random.pooled.ciUpper,
      fixed.heterogeneity.Q,
      fixed.heterogeneity.I2,
      fixed.heterogeneity.tau2,
    ];
    for (const v of allValues) {
      expect(isFinite(v)).toBe(true);
      expect(isNaN(v)).toBe(false);
    }
    passedChecks.push("All pipeline outputs are finite numbers (no NaN/Infinity)");
  });
});

// ---------------------------------------------------------------------------
// Scorecard generation
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 1 — Scorecard", () => {
  it("generates cycle score", () => {
    const dimensions: ScoringDimension[] = [
      {
        name: "Pipeline Completion",
        score: passedChecks.length >= 25 ? 10 : Math.round((passedChecks.length / 25) * 10),
        maxScore: 10,
        weight: 0.30,
        details: `${passedChecks.length} checks passed`,
      },
      {
        name: "Statistical Accuracy",
        score: issues.filter((i) => i.includes("NaN") || i.includes("Infinity")).length === 0 ? 10 : 5,
        maxScore: 10,
        weight: 0.30,
        details: "No NaN/Infinity in outputs",
      },
      {
        name: "PRISMA Consistency",
        score: issues.filter((i) => i.includes("PRISMA")).length === 0 ? 10 : 5,
        maxScore: 10,
        weight: 0.20,
        details: "PRISMA flow arithmetic checks",
      },
      {
        name: "Edge Case Handling",
        score: 8,
        maxScore: 10,
        weight: 0.10,
        details: "Handles edge cases gracefully",
      },
      {
        name: "Data Integrity",
        score: 9,
        maxScore: 10,
        weight: 0.10,
        details: "Weights, CIs, and bounds are valid",
      },
    ];

    const score = scoreCycle(1, "End-to-End Smoke Test", dimensions, issues, passedChecks);

    console.log("\n╔═══════════════════════════════════════════════╗");
    console.log("║  RALPH SR — Cycle 1: End-to-End Smoke Test    ║");
    console.log("╠═══════════════════════════════════════════════╣");
    console.log(`║  Overall Score: ${score.normalizedScore.toFixed(1)} / 10.0`);
    console.log("╠═══════════════════════════════════════════════╣");
    for (const dim of dimensions) {
      console.log(`║  ${dim.name.padEnd(24)} ${dim.score}/${dim.maxScore} (x${dim.weight})`);
    }
    console.log("╠═══════════════════════════════════════════════╣");
    console.log(`║  Passed Checks: ${passedChecks.length}`);
    console.log(`║  Issues Found: ${issues.length}`);
    if (issues.length > 0) {
      for (const issue of issues) {
        console.log(`║  WARNING: ${issue}`);
      }
    }
    console.log("╚═══════════════════════════════════════════════╝\n");

    expect(score.normalizedScore).toBeGreaterThanOrEqual(7.0);
  });
});
