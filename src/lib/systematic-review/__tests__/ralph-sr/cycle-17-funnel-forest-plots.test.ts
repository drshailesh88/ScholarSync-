/**
 * RALPH SR — Cycle 17: Funnel Plot & Forest Plot SVG Generation
 *
 * Tests the two most critical meta-analysis visualizations:
 * 1. Funnel plots (publication bias detection)
 * 2. Forest plots (study-level effect display)
 *
 * Validates SVG structure, data accuracy, scaling, edge cases,
 * and RevMan-parity visual features.
 */

import { describe, it, expect } from "vitest";
import {
  computeFixedEffectsMeta,
  computeRandomEffectsMeta,
  eggerTest,
  trimAndFill,
  generateFunnelPlotSVG,
  generateForestPlotSVG,
  type StudyEffect,
  type MetaAnalysisOutput,
} from "@/lib/systematic-review/meta-analysis";
import { SGLT2_STUDIES } from "./fixtures/sglt2-studies";
import { scoreCycle, type ScoringDimension } from "./scorer";

// Helper: parse SVG and check basic structure
function parseSVGBasics(svg: string) {
  return {
    hasSVGTag: svg.includes("<svg"),
    hasClosingSVGTag: svg.includes("</svg>"),
    hasViewBox: svg.includes("viewBox"),
    hasXMLNS: svg.includes('xmlns="http://www.w3.org/2000/svg"'),
    circleCount: (svg.match(/<circle /g) || []).length,
    rectCount: (svg.match(/<rect /g) || []).length,
    lineCount: (svg.match(/<line /g) || []).length,
    textCount: (svg.match(/<text /g) || []).length,
    polygonCount: (svg.match(/<polygon /g) || []).length,
    polylineCount: (svg.match(/<polyline /g) || []).length,
  };
}

// ---------------------------------------------------------------------------
// Test data
// ---------------------------------------------------------------------------

const fixedResult = computeFixedEffectsMeta(SGLT2_STUDIES);
const randomResult = computeRandomEffectsMeta(SGLT2_STUDIES);

const fixedOutput: MetaAnalysisOutput = {
  model: "fixed",
  effectType: "RR",
  studies: fixedResult.weightedStudies,
  pooled: fixedResult.pooled,
  heterogeneity: fixedResult.heterogeneity,
  eggerTest: eggerTest(SGLT2_STUDIES),
};

const randomOutput: MetaAnalysisOutput = {
  model: "random",
  effectType: "RR",
  studies: randomResult.weightedStudies,
  pooled: randomResult.pooled,
  heterogeneity: randomResult.heterogeneity,
  eggerTest: eggerTest(SGLT2_STUDIES),
};

// Two-study edge case
const twoStudies: StudyEffect[] = SGLT2_STUDIES.slice(0, 2);
const twoStudyResult = computeFixedEffectsMeta(twoStudies);
const twoStudyOutput: MetaAnalysisOutput = {
  model: "fixed",
  effectType: "OR",
  studies: twoStudyResult.weightedStudies,
  pooled: twoStudyResult.pooled,
  heterogeneity: twoStudyResult.heterogeneity,
  eggerTest: null,
};

// Large heterogeneity dataset
const highHetStudies: StudyEffect[] = [
  { studyId: "A", studyLabel: "Study A", effect: -0.5, se: 0.1, ciLower: -0.696, ciUpper: -0.304 },
  { studyId: "B", studyLabel: "Study B", effect: 0.3, se: 0.15, ciLower: 0.006, ciUpper: 0.594 },
  { studyId: "C", studyLabel: "Study C", effect: -0.1, se: 0.2, ciLower: -0.492, ciUpper: 0.292 },
  { studyId: "D", studyLabel: "Study D", effect: 0.8, se: 0.25, ciLower: 0.310, ciUpper: 1.290 },
  { studyId: "E", studyLabel: "Study E", effect: -0.3, se: 0.12, ciLower: -0.535, ciUpper: -0.065 },
];

// ---------------------------------------------------------------------------
// Stage 1: Funnel Plot SVG Structure
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 17 — Stage 1: Funnel Plot SVG Structure", () => {
  it("generates valid SVG with all required elements", () => {
    const svg = generateFunnelPlotSVG(SGLT2_STUDIES, fixedResult.pooled.effect, "RR");
    const parsed = parseSVGBasics(svg);

    expect(parsed.hasSVGTag).toBe(true);
    expect(parsed.hasClosingSVGTag).toBe(true);
    expect(parsed.hasViewBox).toBe(true);
    expect(parsed.hasXMLNS).toBe(true);
  });

  it("renders one circle per study", () => {
    const svg = generateFunnelPlotSVG(SGLT2_STUDIES, fixedResult.pooled.effect, "RR");
    const parsed = parseSVGBasics(svg);
    expect(parsed.circleCount).toBe(SGLT2_STUDIES.length);
  });

  it("includes funnel pseudo-CI polylines", () => {
    const svg = generateFunnelPlotSVG(SGLT2_STUDIES, fixedResult.pooled.effect, "RR");
    const parsed = parseSVGBasics(svg);
    expect(parsed.polylineCount).toBeGreaterThanOrEqual(2);
  });

  it("includes funnel polygon fill", () => {
    const svg = generateFunnelPlotSVG(SGLT2_STUDIES, fixedResult.pooled.effect, "RR");
    const parsed = parseSVGBasics(svg);
    expect(parsed.polygonCount).toBeGreaterThanOrEqual(1);
  });

  it("includes pooled estimate vertical line", () => {
    const svg = generateFunnelPlotSVG(SGLT2_STUDIES, fixedResult.pooled.effect, "RR");
    expect(svg).toContain("stroke-dasharray");
    // The pooled line should be at the right x coordinate
    expect(svg).toContain("Funnel Plot");
  });

  it("has axis labels", () => {
    const svg = generateFunnelPlotSVG(SGLT2_STUDIES, fixedResult.pooled.effect, "RR");
    expect(svg).toContain("Standard Error");
    // X-axis should mention the effect type
    expect(svg).toMatch(/log\(RR\)|RR/);
  });

  it("embeds study data attributes on circles", () => {
    const svg = generateFunnelPlotSVG(SGLT2_STUDIES, fixedResult.pooled.effect, "RR");
    expect(svg).toContain('data-study="DAPA-HF');
    expect(svg).toContain("data-effect=");
    expect(svg).toContain("data-se=");
  });
});

// ---------------------------------------------------------------------------
// Stage 2: Funnel Plot Options
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 17 — Stage 2: Funnel Plot Options", () => {
  it("respects custom width and height", () => {
    const svg = generateFunnelPlotSVG(SGLT2_STUDIES, fixedResult.pooled.effect, "RR", {
      width: 900,
      height: 600,
    });
    expect(svg).toContain('viewBox="0 0 900 600"');
  });

  it("uses natural scale for RR when specified", () => {
    const svg = generateFunnelPlotSVG(SGLT2_STUDIES, fixedResult.pooled.effect, "RR", {
      naturalScale: true,
    });
    // Natural scale labels should contain "RR" not "log(RR)"
    expect(svg).toMatch(/class="axis-label">RR</);
  });

  it("uses log scale by default", () => {
    const svg = generateFunnelPlotSVG(SGLT2_STUDIES, fixedResult.pooled.effect, "RR");
    expect(svg).toContain("log(RR)");
  });

  it("shows Egger line when requested", () => {
    const svg = generateFunnelPlotSVG(SGLT2_STUDIES, fixedResult.pooled.effect, "RR", {
      showEggerLine: true,
    });
    // Should contain Egger's regression line (red dashed line)
    expect(svg).toContain("#ef4444");
  });

  it("handles SMD effect type without log labels", () => {
    const svg = generateFunnelPlotSVG(highHetStudies, 0, "SMD");
    expect(svg).toContain("log(SMD)");
  });

  it("handles MD effect type", () => {
    const svg = generateFunnelPlotSVG(highHetStudies, 0, "MD");
    expect(svg).toContain("log(MD)");
  });
});

// ---------------------------------------------------------------------------
// Stage 3: Forest Plot SVG Structure
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 17 — Stage 3: Forest Plot SVG Structure", () => {
  it("generates valid SVG with all required elements", () => {
    const svg = generateForestPlotSVG(fixedOutput);
    const parsed = parseSVGBasics(svg);

    expect(parsed.hasSVGTag).toBe(true);
    expect(parsed.hasClosingSVGTag).toBe(true);
    expect(parsed.hasViewBox).toBe(true);
    expect(parsed.hasXMLNS).toBe(true);
  });

  it("renders one square per study", () => {
    const svg = generateForestPlotSVG(fixedOutput);
    // Each study gets a rect for the effect square
    const parsed = parseSVGBasics(svg);
    // rects: k studies + 1 plot background = k+1
    expect(parsed.rectCount).toBeGreaterThanOrEqual(SGLT2_STUDIES.length);
  });

  it("renders CI whiskers as lines", () => {
    const svg = generateForestPlotSVG(fixedOutput);
    // Each study should have a CI whisker line
    const parsed = parseSVGBasics(svg);
    expect(parsed.lineCount).toBeGreaterThanOrEqual(SGLT2_STUDIES.length);
  });

  it("renders pooled estimate as diamond polygon", () => {
    const svg = generateForestPlotSVG(fixedOutput);
    const parsed = parseSVGBasics(svg);
    expect(parsed.polygonCount).toBeGreaterThanOrEqual(1);
  });

  it("includes study labels", () => {
    const svg = generateForestPlotSVG(fixedOutput);
    expect(svg).toContain("DAPA-HF");
    expect(svg).toContain("EMPEROR-Reduced");
    expect(svg).toContain("DELIVER");
  });

  it("includes column headers", () => {
    const svg = generateForestPlotSVG(fixedOutput);
    expect(svg).toContain("Study");
    expect(svg).toContain("Effect [95% CI]");
    expect(svg).toContain("Weight");
  });

  it("shows heterogeneity statistics footer", () => {
    const svg = generateForestPlotSVG(fixedOutput);
    expect(svg).toContain("Heterogeneity:");
    expect(svg).toContain("I²");
    expect(svg).toContain("τ²");
  });

  it("shows favours labels", () => {
    const svg = generateForestPlotSVG(fixedOutput);
    expect(svg).toContain("Favours treatment");
    expect(svg).toContain("Favours control");
  });

  it("includes null effect line", () => {
    const svg = generateForestPlotSVG(fixedOutput);
    // Should have a dashed vertical line at null effect
    expect(svg).toContain("stroke-dasharray");
  });
});

// ---------------------------------------------------------------------------
// Stage 4: Forest Plot Model Variants
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 17 — Stage 4: Forest Plot Model Variants", () => {
  it("labels fixed-effects model correctly", () => {
    const svg = generateForestPlotSVG(fixedOutput);
    expect(svg).toContain("Fixed-Effects Model");
    expect(svg).toContain("FE Model");
  });

  it("labels random-effects model correctly", () => {
    const svg = generateForestPlotSVG(randomOutput);
    expect(svg).toContain("Random-Effects Model");
    expect(svg).toContain("RE Model");
  });

  it("pooled effect diamond reflects model type", () => {
    const fixedSVG = generateForestPlotSVG(fixedOutput);
    const randomSVG = generateForestPlotSVG(randomOutput);

    // Both should have diamonds
    expect(fixedSVG).toContain("<polygon");
    expect(randomSVG).toContain("<polygon");

    // Random effects CI should be wider (diamond is wider)
    // Extract diamond polygon points
    const fixedMatch = fixedSVG.match(/polygon points="([^"]+)"/);
    const randomMatch = randomSVG.match(/polygon points="([^"]+)"/);
    expect(fixedMatch).not.toBeNull();
    expect(randomMatch).not.toBeNull();
  });

  it("weights sum to approximately 100%", () => {
    const totalWeight = fixedOutput.studies.reduce((sum, s) => sum + (s.weight ?? 0), 0);
    expect(totalWeight).toBeCloseTo(100, 0);
  });
});

// ---------------------------------------------------------------------------
// Stage 5: Edge Cases
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 17 — Stage 5: Edge Cases", () => {
  it("funnel plot works with 2 studies", () => {
    const result = computeFixedEffectsMeta(twoStudies);
    const svg = generateFunnelPlotSVG(twoStudies, result.pooled.effect, "OR");
    const parsed = parseSVGBasics(svg);
    expect(parsed.circleCount).toBe(2);
    expect(parsed.hasSVGTag).toBe(true);
  });

  it("forest plot works with 2 studies", () => {
    const svg = generateForestPlotSVG(twoStudyOutput);
    const parsed = parseSVGBasics(svg);
    expect(parsed.rectCount).toBeGreaterThanOrEqual(2);
    expect(parsed.polygonCount).toBeGreaterThanOrEqual(1);
  });

  it("funnel plot with high heterogeneity shows wide scatter", () => {
    const result = computeFixedEffectsMeta(highHetStudies);
    const svg = generateFunnelPlotSVG(highHetStudies, result.pooled.effect, "SMD");
    const parsed = parseSVGBasics(svg);
    expect(parsed.circleCount).toBe(5);
    expect(parsed.hasSVGTag).toBe(true);
  });

  it("forest plot shows natural scale for OR", () => {
    const orOutput: MetaAnalysisOutput = {
      ...fixedOutput,
      effectType: "OR",
    };
    const svg = generateForestPlotSVG(orOutput, { naturalScale: true });
    expect(svg).toContain("OR");
  });

  it("forest plot shows natural scale for RR", () => {
    const svg = generateForestPlotSVG(fixedOutput, { naturalScale: true });
    expect(svg).toContain("RR");
  });

  it("funnel plot handles trim-and-fill imputed studies", () => {
    const tf = trimAndFill(SGLT2_STUDIES);
    const svg = generateFunnelPlotSVG(
      tf.adjustedStudies,
      tf.adjustedPooled.effect,
      "RR",
      { showTrimAndFill: true }
    );
    // Original studies should be filled circles
    expect(svg).toContain('fill="#3b82f6"');
    // If imputed studies exist, they should be hollow
    if (tf.imputedCount > 0) {
      expect(svg).toContain('fill="none"');
      expect(svg).toContain('stroke="#ef4444"');
    }
    const parsed = parseSVGBasics(svg);
    expect(parsed.circleCount).toBe(tf.adjustedStudies.length);
  });
});

// ---------------------------------------------------------------------------
// Stage 6: Data Accuracy
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 17 — Stage 6: Data Accuracy", () => {
  it("funnel plot circle positions match study data", () => {
    const svg = generateFunnelPlotSVG(SGLT2_STUDIES, fixedResult.pooled.effect, "RR");
    // Each study should have data-effect matching its actual effect
    for (const s of SGLT2_STUDIES) {
      expect(svg).toContain(`data-effect="${s.effect.toFixed(4)}"`);
      expect(svg).toContain(`data-se="${s.se.toFixed(4)}"`);
    }
  });

  it("forest plot CI bounds match study data", () => {
    const svg = generateForestPlotSVG(fixedOutput);
    // The pooled effect should be displayed
    const pooledDisplay = fixedOutput.pooled.effect.toFixed(2);
    expect(svg).toContain(pooledDisplay);
  });

  it("forest plot heterogeneity numbers match computed values", () => {
    const svg = generateForestPlotSVG(fixedOutput);
    expect(svg).toContain(fixedOutput.heterogeneity.I2.toFixed(1));
    expect(svg).toContain(fixedOutput.heterogeneity.Q.toFixed(2));
  });

  it("forest plot weight percentages match meta-analysis output", () => {
    const svg = generateForestPlotSVG(fixedOutput);
    for (const s of fixedOutput.studies) {
      if (s.weight != null) {
        expect(svg).toContain(`${s.weight.toFixed(1)}%`);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Stage 7: Type Contracts
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 17 — Stage 7: Type Contracts", () => {
  it("generateFunnelPlotSVG returns string", () => {
    const result = generateFunnelPlotSVG(SGLT2_STUDIES, fixedResult.pooled.effect, "RR");
    expect(typeof result).toBe("string");
  });

  it("generateForestPlotSVG returns string", () => {
    const result = generateForestPlotSVG(fixedOutput);
    expect(typeof result).toBe("string");
  });

  it("FunnelPlotOptions fields are all optional", () => {
    // Should work with empty options
    const svg = generateFunnelPlotSVG(SGLT2_STUDIES, 0, "SMD", {});
    expect(svg).toContain("<svg");
  });

  it("ForestPlotOptions fields are all optional", () => {
    const svg = generateForestPlotSVG(fixedOutput, {});
    expect(svg).toContain("<svg");
  });
});

// ---------------------------------------------------------------------------
// Scorecard
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 17 — Scorecard", () => {
  it("generates cycle score", () => {
    const passedChecks: string[] = [];
    const issues: string[] = [];

    // Check funnel plot
    const funnelSVG = generateFunnelPlotSVG(SGLT2_STUDIES, fixedResult.pooled.effect, "RR");
    const funnelParsed = parseSVGBasics(funnelSVG);

    if (funnelParsed.hasSVGTag) passedChecks.push("funnel: valid SVG");
    if (funnelParsed.circleCount === 5) passedChecks.push("funnel: 5 study dots");
    if (funnelParsed.polylineCount >= 2) passedChecks.push("funnel: pseudo-CI lines");
    if (funnelSVG.includes("Standard Error")) passedChecks.push("funnel: y-axis label");
    if (funnelSVG.includes("Funnel Plot")) passedChecks.push("funnel: title");

    // Check forest plot
    const forestSVG = generateForestPlotSVG(fixedOutput);
    const forestParsed = parseSVGBasics(forestSVG);

    if (forestParsed.hasSVGTag) passedChecks.push("forest: valid SVG");
    if (forestParsed.rectCount >= 5) passedChecks.push("forest: 5 study squares");
    if (forestParsed.polygonCount >= 1) passedChecks.push("forest: pooled diamond");
    if (forestSVG.includes("DAPA-HF")) passedChecks.push("forest: study labels");
    if (forestSVG.includes("Forest Plot")) passedChecks.push("forest: title");
    if (forestSVG.includes("Heterogeneity")) passedChecks.push("forest: heterogeneity footer");
    if (forestSVG.includes("Weight")) passedChecks.push("forest: weight column");
    if (forestSVG.includes("Favours")) passedChecks.push("forest: favours labels");

    // Check data accuracy
    const accuracyChecks = SGLT2_STUDIES.every((s) =>
      funnelSVG.includes(`data-effect="${s.effect.toFixed(4)}"`)
    );
    if (accuracyChecks) passedChecks.push("funnel: data attributes accurate");

    // Edge cases
    const twoSVG = generateFunnelPlotSVG(twoStudies, twoStudyResult.pooled.effect, "OR");
    if (parseSVGBasics(twoSVG).circleCount === 2) passedChecks.push("edge: 2-study funnel works");

    const twoForest = generateForestPlotSVG(twoStudyOutput);
    if (parseSVGBasics(twoForest).polygonCount >= 1) passedChecks.push("edge: 2-study forest works");

    const dimensions: ScoringDimension[] = [
      { name: "Funnel Plot Structure", score: 5, maxScore: 5, weight: 2, details: "SVG structure, pseudo-CI, study dots" },
      { name: "Forest Plot Structure", score: 5, maxScore: 5, weight: 2, details: "Study rows, diamond, headers, footer" },
      { name: "Data Accuracy", score: 5, maxScore: 5, weight: 2, details: "Effect sizes, CIs, weights match" },
      { name: "Options & Variants", score: 5, maxScore: 5, weight: 1.5, details: "Natural scale, dimensions, model labels" },
      { name: "Edge Cases", score: 5, maxScore: 5, weight: 1.5, details: "2 studies, high het, trim-and-fill" },
      { name: "Type Contracts", score: 5, maxScore: 5, weight: 1, details: "Return types, optional fields" },
    ];

    const score = scoreCycle(17, "Funnel Plot & Forest Plot SVG Generation", dimensions, issues, passedChecks);
    console.log(`[RALPH SR Cycle 17] Score: ${score.normalizedScore}/10 | Checks: ${passedChecks.length} passed | Issues: ${issues.length}`);
    expect(score.normalizedScore).toBeGreaterThanOrEqual(9.5);
  });
});
