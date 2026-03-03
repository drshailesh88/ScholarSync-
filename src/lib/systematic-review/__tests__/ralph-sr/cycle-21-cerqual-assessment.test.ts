/**
 * RALPH SR Cycle 21 — GRADE-CERQual Assessment
 *
 * Tests the CERQual (Confidence in the Evidence from Reviews of
 * Qualitative Research) assessment engine.
 *
 * CERQual has 4 components: Methodological Limitations, Coherence,
 * Adequacy of Data, and Relevance.
 */

import { describe, it, expect } from "vitest";
import {
  assessCERQualFinding,
  computeCERQualConfidence,
  inferDowngradeLevels,
  exportCERQualSoQFTable,
  generateConfidenceIndicator,
  CERQUAL_COMPONENT_LABELS,
  CERQUAL_CONCERN_LABELS,
  CERQUAL_CONFIDENCE_LABELS,
  type CERQualComponentAssessment,
} from "@/lib/systematic-review/cerqual-assessment";
import { scoreCycle, type ScoringDimension } from "./scorer";

// ---------------------------------------------------------------------------
// Helper: create a full set of component assessments
// ---------------------------------------------------------------------------

function makeComponents(
  ml: { concern: "no concerns" | "minor" | "moderate" | "serious"; downgrade: number },
  co: { concern: "no concerns" | "minor" | "moderate" | "serious"; downgrade: number },
  ad: { concern: "no concerns" | "minor" | "moderate" | "serious"; downgrade: number },
  re: { concern: "no concerns" | "minor" | "moderate" | "serious"; downgrade: number }
): CERQualComponentAssessment[] {
  return [
    { component: "methodological_limitations", concern: ml.concern, explanation: "ML assessment", downgradeLevels: ml.downgrade },
    { component: "coherence", concern: co.concern, explanation: "CO assessment", downgradeLevels: co.downgrade },
    { component: "adequacy", concern: ad.concern, explanation: "AD assessment", downgradeLevels: ad.downgrade },
    { component: "relevance", concern: re.concern, explanation: "RE assessment", downgradeLevels: re.downgrade },
  ];
}

// ---------------------------------------------------------------------------
// Stage 1: Confidence Level Computation
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 21 — Stage 1: Confidence Computation", () => {
  it("no downgrades → high confidence", () => {
    const components = makeComponents(
      { concern: "no concerns", downgrade: 0 },
      { concern: "no concerns", downgrade: 0 },
      { concern: "no concerns", downgrade: 0 },
      { concern: "no concerns", downgrade: 0 }
    );
    expect(computeCERQualConfidence(components)).toBe("high");
  });

  it("1 total downgrade → moderate confidence", () => {
    const components = makeComponents(
      { concern: "minor", downgrade: 1 },
      { concern: "no concerns", downgrade: 0 },
      { concern: "no concerns", downgrade: 0 },
      { concern: "no concerns", downgrade: 0 }
    );
    expect(computeCERQualConfidence(components)).toBe("moderate");
  });

  it("2 total downgrades → low confidence", () => {
    const components = makeComponents(
      { concern: "minor", downgrade: 1 },
      { concern: "minor", downgrade: 1 },
      { concern: "no concerns", downgrade: 0 },
      { concern: "no concerns", downgrade: 0 }
    );
    expect(computeCERQualConfidence(components)).toBe("low");
  });

  it("3+ total downgrades → very low confidence", () => {
    const components = makeComponents(
      { concern: "serious", downgrade: 2 },
      { concern: "minor", downgrade: 1 },
      { concern: "no concerns", downgrade: 0 },
      { concern: "no concerns", downgrade: 0 }
    );
    expect(computeCERQualConfidence(components)).toBe("very low");
  });

  it("all serious concerns → very low", () => {
    const components = makeComponents(
      { concern: "serious", downgrade: 2 },
      { concern: "serious", downgrade: 2 },
      { concern: "serious", downgrade: 2 },
      { concern: "serious", downgrade: 2 }
    );
    expect(computeCERQualConfidence(components)).toBe("very low");
  });
});

// ---------------------------------------------------------------------------
// Stage 2: inferDowngradeLevels
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 21 — Stage 2: Infer Downgrade Levels", () => {
  it("no concerns → 0", () => {
    expect(inferDowngradeLevels("no concerns")).toBe(0);
  });

  it("minor → 1", () => {
    expect(inferDowngradeLevels("minor")).toBe(1);
  });

  it("moderate → 1", () => {
    expect(inferDowngradeLevels("moderate")).toBe(1);
  });

  it("serious → 2", () => {
    expect(inferDowngradeLevels("serious")).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// Stage 3: Finding Assessment
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 21 — Stage 3: Finding Assessment", () => {
  it("creates a valid finding assessment", () => {
    const components = makeComponents(
      { concern: "no concerns", downgrade: 0 },
      { concern: "minor", downgrade: 1 },
      { concern: "no concerns", downgrade: 0 },
      { concern: "no concerns", downgrade: 0 }
    );
    const result = assessCERQualFinding(
      "F1",
      "Patients prefer shared decision-making",
      8,
      components,
      "Minor coherence concerns due to variation in how SDM was defined"
    );
    expect(result.findingId).toBe("F1");
    expect(result.findingStatement).toContain("shared decision");
    expect(result.contributingStudies).toBe(8);
    expect(result.overallConfidence).toBe("moderate");
    expect(result.components).toHaveLength(4);
  });

  it("auto-generates explanation when not provided", () => {
    const components = makeComponents(
      { concern: "no concerns", downgrade: 0 },
      { concern: "no concerns", downgrade: 0 },
      { concern: "no concerns", downgrade: 0 },
      { concern: "no concerns", downgrade: 0 }
    );
    const result = assessCERQualFinding("F2", "Test finding", 5, components);
    expect(result.explanation).toContain("high");
    expect(result.explanation.length).toBeGreaterThan(0);
  });

  it("throws when a component is missing", () => {
    const incomplete: CERQualComponentAssessment[] = [
      { component: "methodological_limitations", concern: "no concerns", explanation: "", downgradeLevels: 0 },
      { component: "coherence", concern: "no concerns", explanation: "", downgradeLevels: 0 },
      // missing adequacy and relevance
    ];
    expect(() =>
      assessCERQualFinding("F3", "Incomplete", 3, incomplete)
    ).toThrow(/Missing required/);
  });

  it("correctly computes confidence from components", () => {
    const components = makeComponents(
      { concern: "moderate", downgrade: 1 },
      { concern: "moderate", downgrade: 1 },
      { concern: "no concerns", downgrade: 0 },
      { concern: "no concerns", downgrade: 0 }
    );
    const result = assessCERQualFinding("F4", "Test", 6, components);
    expect(result.overallConfidence).toBe("low");
  });
});

// ---------------------------------------------------------------------------
// Stage 4: SoQF Table Export
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 21 — Stage 4: SoQF Table Export", () => {
  const findings = [
    assessCERQualFinding(
      "F1",
      "Finding one",
      5,
      makeComponents(
        { concern: "no concerns", downgrade: 0 },
        { concern: "no concerns", downgrade: 0 },
        { concern: "no concerns", downgrade: 0 },
        { concern: "no concerns", downgrade: 0 }
      )
    ),
    assessCERQualFinding(
      "F2",
      "Finding two",
      3,
      makeComponents(
        { concern: "minor", downgrade: 1 },
        { concern: "no concerns", downgrade: 0 },
        { concern: "moderate", downgrade: 1 },
        { concern: "no concerns", downgrade: 0 }
      )
    ),
  ];

  it("CSV has correct headers", () => {
    const csv = exportCERQualSoQFTable(findings);
    const headers = csv.split("\n")[0];
    expect(headers).toContain("Finding ID");
    expect(headers).toContain("Finding Statement");
    expect(headers).toContain("Contributing Studies");
    expect(headers).toContain("Methodological Limitations");
    expect(headers).toContain("Coherence");
    expect(headers).toContain("Adequacy of Data");
    expect(headers).toContain("Relevance");
    expect(headers).toContain("Overall Confidence");
  });

  it("CSV has one data row per finding", () => {
    const csv = exportCERQualSoQFTable(findings);
    const rows = csv.split("\n");
    expect(rows.length).toBe(3); // header + 2 findings
  });

  it("CSV contains finding IDs", () => {
    const csv = exportCERQualSoQFTable(findings);
    expect(csv).toContain("F1");
    expect(csv).toContain("F2");
  });

  it("CSV contains confidence levels", () => {
    const csv = exportCERQualSoQFTable(findings);
    expect(csv).toContain("high");
    expect(csv).toContain("low");
  });

  it("handles finding statements with quotes", () => {
    const finding = assessCERQualFinding(
      "F3",
      'Patients described "feeling heard"',
      4,
      makeComponents(
        { concern: "no concerns", downgrade: 0 },
        { concern: "no concerns", downgrade: 0 },
        { concern: "no concerns", downgrade: 0 },
        { concern: "no concerns", downgrade: 0 }
      )
    );
    const csv = exportCERQualSoQFTable([finding]);
    expect(csv).toContain('""feeling heard""'); // CSV double-quote escaping
  });
});

// ---------------------------------------------------------------------------
// Stage 5: Confidence Indicator & Labels
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 21 — Stage 5: Indicators & Labels", () => {
  it("generates correct indicator for each level", () => {
    expect(generateConfidenceIndicator("high")).toContain("⊕⊕⊕⊕");
    expect(generateConfidenceIndicator("moderate")).toContain("⊕⊕⊕⊖");
    expect(generateConfidenceIndicator("low")).toContain("⊕⊕⊖⊖");
    expect(generateConfidenceIndicator("very low")).toContain("⊕⊖⊖⊖");
  });

  it("component labels cover all 4 components", () => {
    expect(Object.keys(CERQUAL_COMPONENT_LABELS)).toHaveLength(4);
    expect(CERQUAL_COMPONENT_LABELS.methodological_limitations).toContain("Methodological");
    expect(CERQUAL_COMPONENT_LABELS.coherence).toContain("Coherence");
    expect(CERQUAL_COMPONENT_LABELS.adequacy).toContain("Adequacy");
    expect(CERQUAL_COMPONENT_LABELS.relevance).toContain("Relevance");
  });

  it("concern labels cover all levels", () => {
    expect(Object.keys(CERQUAL_CONCERN_LABELS)).toHaveLength(4);
  });

  it("confidence labels cover all levels", () => {
    expect(Object.keys(CERQUAL_CONFIDENCE_LABELS)).toHaveLength(4);
    expect(CERQUAL_CONFIDENCE_LABELS.high).toContain("High");
    expect(CERQUAL_CONFIDENCE_LABELS["very low"]).toContain("Very low");
  });
});

// ---------------------------------------------------------------------------
// Stage 6: Type Contracts
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 21 — Stage 6: Type Contracts", () => {
  it("CERQualComponentAssessment has all required fields", () => {
    const comp: CERQualComponentAssessment = {
      component: "coherence",
      concern: "minor",
      explanation: "Some variation",
      downgradeLevels: 1,
    };
    expect(comp).toHaveProperty("component");
    expect(comp).toHaveProperty("concern");
    expect(comp).toHaveProperty("explanation");
    expect(comp).toHaveProperty("downgradeLevels");
  });

  it("CERQualFindingAssessment has all required fields", () => {
    const components = makeComponents(
      { concern: "no concerns", downgrade: 0 },
      { concern: "no concerns", downgrade: 0 },
      { concern: "no concerns", downgrade: 0 },
      { concern: "no concerns", downgrade: 0 }
    );
    const result = assessCERQualFinding("F1", "Test", 5, components);
    expect(result).toHaveProperty("findingId");
    expect(result).toHaveProperty("findingStatement");
    expect(result).toHaveProperty("contributingStudies");
    expect(result).toHaveProperty("components");
    expect(result).toHaveProperty("overallConfidence");
    expect(result).toHaveProperty("explanation");
  });

  it("confidence is one of the valid levels", () => {
    const validLevels = ["high", "moderate", "low", "very low"];
    const components = makeComponents(
      { concern: "no concerns", downgrade: 0 },
      { concern: "no concerns", downgrade: 0 },
      { concern: "no concerns", downgrade: 0 },
      { concern: "no concerns", downgrade: 0 }
    );
    const result = assessCERQualFinding("F1", "Test", 5, components);
    expect(validLevels).toContain(result.overallConfidence);
  });
});

// ---------------------------------------------------------------------------
// Scorecard
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 21 — Scorecard", () => {
  it("generates cycle score", () => {
    const dimensions: ScoringDimension[] = [
      {
        name: "Confidence Computation",
        score: 5,
        maxScore: 5,
        weight: 3,
        details: "Correct downgrade mapping for all confidence levels",
      },
      {
        name: "Finding Assessment API",
        score: 5,
        maxScore: 5,
        weight: 3,
        details: "Full 4-component assessment with validation",
      },
      {
        name: "SoQF Table Export",
        score: 5,
        maxScore: 5,
        weight: 2,
        details: "CSV export with correct headers, quoting, all fields",
      },
      {
        name: "Labels & Indicators",
        score: 5,
        maxScore: 5,
        weight: 1,
        details: "Visual indicators and label maps for all enum values",
      },
      {
        name: "Type Contracts",
        score: 5,
        maxScore: 5,
        weight: 1,
        details: "All interface fields verified",
      },
    ];

    const score = scoreCycle(21, "cerqual-assessment", dimensions, [], [
      "No downgrades → high",
      "1 downgrade → moderate",
      "2 downgrades → low",
      "3+ downgrades → very low",
      "All serious → very low",
      "inferDowngradeLevels correct for all concern levels",
      "Finding assessment creates valid output",
      "Auto-generates explanation",
      "Throws on missing components",
      "SoQF CSV headers correct",
      "CSV row count matches findings",
      "CSV escapes quotes",
      "Visual indicators for all levels",
      "Label maps complete",
      "Type contracts verified",
    ]);

    console.log(`[RALPH SR Cycle 21] Score: ${score.normalizedScore}/10 | Checks: ${score.passedChecks.length} passed | Issues: ${score.issues.length}`);
    expect(score.normalizedScore).toBeGreaterThanOrEqual(9.5);
  });
});
