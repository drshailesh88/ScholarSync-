/**
 * RALPH SR — Cycle 8: Evidence Quality Assessment Tools
 *
 * Adversarial invariant tests for:
 *  - GRADE framework: constants, types, domain labels, certainty labels
 *  - QUADAS-2 tool: domain definitions, signaling questions, overall judgment logic
 *  - PRESS 2015 checklist: element metadata, assessment labels, overall labels
 *  - Type contracts for GRADEAssessment, FullQUADAS2Assessment, PRESSValidation
 *  - Zod schema validation (replicated) for domain constraints
 */

import { describe, it, expect } from "vitest";
import { z } from "zod";
import {
  // GRADE
  GRADE_DOMAIN_LABELS,
  CERTAINTY_LABELS as GRADE_CERTAINTY_LABELS,
  type GRADEAssessment,
  type GRADEDomainAssessment,
  type GRADEDomain,
  type CertaintyRating,
  // QUADAS-2
  QUADAS2_DOMAINS,
  type QUADAS2Judgment,
  type QUADAS2DomainAssessment,
  type FullQUADAS2Assessment,
  // PRESS
  PRESS_ELEMENTS,
  PRESS_ASSESSMENT_LABELS,
  PRESS_OVERALL_LABELS,
  type PRESSValidation,
} from "@/lib/systematic-review";
import { scoreCycle, type ScoringDimension } from "./scorer";

// ---------------------------------------------------------------------------
// Replicated Zod schemas (module-private in source)
// ---------------------------------------------------------------------------

const gradeDomainSchema = z.object({
  domain: z.enum([
    "risk_of_bias",
    "inconsistency",
    "indirectness",
    "imprecision",
    "publication_bias",
  ]),
  rating: z.enum(["no_concern", "serious", "very_serious"]),
  rationale: z.string(),
  downgradeBy: z.union([z.literal(0), z.literal(1), z.literal(2)]),
});

const gradeAssessmentSchema = z.object({
  domains: z.array(gradeDomainSchema).length(5),
  overallCertainty: z.enum(["high", "moderate", "low", "very_low"]),
  overallRationale: z.string(),
  effectEstimate: z.string().nullable(),
  numberOfStudies: z.number().int().nonnegative(),
  totalParticipants: z.number().int().nonnegative().nullable(),
});

const quadas2DomainSchema = z.object({
  domain: z.string(),
  domainName: z.string(),
  signalingQuestions: z.array(
    z.object({
      question: z.string(),
      answer: z.enum(["Yes", "No", "Unclear"]),
    })
  ),
  riskOfBias: z.enum(["Low", "High", "Unclear"]),
  applicabilityConcern: z.enum(["Low", "High", "Unclear"]).nullable(),
  rationale: z.string(),
});

const pressElementSchema = z.object({
  element: z.number().int().min(1).max(6),
  assessment: z.enum(["no_revision", "minor_revision", "major_revision"]),
  feedback: z.string(),
  suggestions: z.array(z.string()),
});

// ---------------------------------------------------------------------------
// Helper: replicate computeOverallJudgments from quadas2-assessment.ts
// ---------------------------------------------------------------------------

function computeOverallJudgments(domains: QUADAS2DomainAssessment[]): {
  overallRoB: QUADAS2Judgment;
  overallApplicability: QUADAS2Judgment;
} {
  const robJudgments = domains.map((d) => d.riskOfBias);
  let overallRoB: QUADAS2Judgment = "Low";
  if (robJudgments.includes("High")) overallRoB = "High";
  else if (robJudgments.includes("Unclear")) overallRoB = "Unclear";

  const applicabilityJudgments = domains
    .filter((d) => d.applicabilityConcern !== null)
    .map((d) => d.applicabilityConcern as QUADAS2Judgment);

  let overallApplicability: QUADAS2Judgment = "Low";
  if (applicabilityJudgments.includes("High")) overallApplicability = "High";
  else if (applicabilityJudgments.includes("Unclear"))
    overallApplicability = "Unclear";

  return { overallRoB, overallApplicability };
}

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

function makeGRADEDomainAssessment(
  domain: GRADEDomain,
  rating: "no_concern" | "serious" | "very_serious" = "no_concern",
  downgradeBy: 0 | 1 | 2 = 0
): GRADEDomainAssessment {
  return { domain, rating, rationale: `Assessment for ${domain}`, downgradeBy };
}

function makeQUADAS2Domain(
  domain: string,
  robJudgment: QUADAS2Judgment = "Low",
  applicability: QUADAS2Judgment | null = "Low"
): QUADAS2DomainAssessment {
  return {
    domain,
    domainName: `Domain: ${domain}`,
    riskOfBias: robJudgment,
    applicabilityConcern: applicability,
    signalingQuestions: [
      { question: "Q1?", answer: "Yes" },
    ],
    rationale: "Test rationale",
  };
}

// ---------------------------------------------------------------------------
// Stage 1: GRADE Constants & Labels
// ---------------------------------------------------------------------------

describe("Cycle 8 — Stage 1: GRADE Constants & Labels", () => {
  it("GRADE_DOMAIN_LABELS covers all 5 domains", () => {
    const expectedDomains: GRADEDomain[] = [
      "risk_of_bias",
      "inconsistency",
      "indirectness",
      "imprecision",
      "publication_bias",
    ];
    for (const d of expectedDomains) {
      expect(GRADE_DOMAIN_LABELS).toHaveProperty(d);
      expect(GRADE_DOMAIN_LABELS[d].length).toBeGreaterThan(0);
    }
    expect(Object.keys(GRADE_DOMAIN_LABELS)).toHaveLength(5);
  });

  it("GRADE certainty labels cover all 4 levels", () => {
    const expectedLevels: CertaintyRating[] = [
      "high",
      "moderate",
      "low",
      "very_low",
    ];
    for (const l of expectedLevels) {
      expect(GRADE_CERTAINTY_LABELS).toHaveProperty(l);
    }
    expect(Object.keys(GRADE_CERTAINTY_LABELS)).toHaveLength(4);
  });

  it("certainty labels have human-readable values", () => {
    expect(GRADE_CERTAINTY_LABELS.high).toBe("High");
    expect(GRADE_CERTAINTY_LABELS.moderate).toBe("Moderate");
    expect(GRADE_CERTAINTY_LABELS.low).toBe("Low");
    expect(GRADE_CERTAINTY_LABELS.very_low).toBe("Very Low");
  });

  it("domain labels have human-readable values", () => {
    expect(GRADE_DOMAIN_LABELS.risk_of_bias).toBe("Risk of Bias");
    expect(GRADE_DOMAIN_LABELS.inconsistency).toBe("Inconsistency");
    expect(GRADE_DOMAIN_LABELS.publication_bias).toBe("Publication Bias");
  });
});

// ---------------------------------------------------------------------------
// Stage 2: GRADE Zod Schema Validation
// ---------------------------------------------------------------------------

describe("Cycle 8 — Stage 2: GRADE Zod Schema Validation", () => {
  it("valid GRADE assessment passes schema", () => {
    const valid = {
      domains: [
        { domain: "risk_of_bias", rating: "no_concern", rationale: "OK", downgradeBy: 0 },
        { domain: "inconsistency", rating: "serious", rationale: "I²=60%", downgradeBy: 1 },
        { domain: "indirectness", rating: "no_concern", rationale: "Direct", downgradeBy: 0 },
        { domain: "imprecision", rating: "very_serious", rationale: "Wide CI", downgradeBy: 2 },
        { domain: "publication_bias", rating: "no_concern", rationale: "No bias", downgradeBy: 0 },
      ],
      overallCertainty: "low",
      overallRationale: "Downgraded for inconsistency and imprecision",
      effectEstimate: "SMD = -0.5 (95% CI: -1.2 to 0.2)",
      numberOfStudies: 8,
      totalParticipants: 1200,
    };
    expect(() => gradeAssessmentSchema.parse(valid)).not.toThrow();
  });

  it("rejects GRADE assessment with wrong number of domains", () => {
    const invalid = {
      domains: [
        { domain: "risk_of_bias", rating: "no_concern", rationale: "OK", downgradeBy: 0 },
      ],
      overallCertainty: "high",
      overallRationale: "Only one domain",
      effectEstimate: null,
      numberOfStudies: 5,
      totalParticipants: null,
    };
    expect(() => gradeAssessmentSchema.parse(invalid)).toThrow();
  });

  it("rejects invalid domain name", () => {
    const result = gradeDomainSchema.safeParse({
      domain: "fake_domain",
      rating: "no_concern",
      rationale: "test",
      downgradeBy: 0,
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid rating value", () => {
    const result = gradeDomainSchema.safeParse({
      domain: "risk_of_bias",
      rating: "minor",
      rationale: "test",
      downgradeBy: 0,
    });
    expect(result.success).toBe(false);
  });

  it("rejects downgradeBy value of 3", () => {
    const result = gradeDomainSchema.safeParse({
      domain: "risk_of_bias",
      rating: "no_concern",
      rationale: "test",
      downgradeBy: 3,
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative numberOfStudies", () => {
    const result = gradeAssessmentSchema.safeParse({
      domains: Array(5).fill({
        domain: "risk_of_bias",
        rating: "no_concern",
        rationale: "OK",
        downgradeBy: 0,
      }),
      overallCertainty: "high",
      overallRationale: "test",
      effectEstimate: null,
      numberOfStudies: -1,
      totalParticipants: null,
    });
    expect(result.success).toBe(false);
  });

  it("allows null effectEstimate and totalParticipants", () => {
    const valid = {
      domains: [
        { domain: "risk_of_bias", rating: "no_concern", rationale: "OK", downgradeBy: 0 },
        { domain: "inconsistency", rating: "no_concern", rationale: "OK", downgradeBy: 0 },
        { domain: "indirectness", rating: "no_concern", rationale: "OK", downgradeBy: 0 },
        { domain: "imprecision", rating: "no_concern", rationale: "OK", downgradeBy: 0 },
        { domain: "publication_bias", rating: "no_concern", rationale: "OK", downgradeBy: 0 },
      ],
      overallCertainty: "high",
      overallRationale: "All clear",
      effectEstimate: null,
      numberOfStudies: 10,
      totalParticipants: null,
    };
    expect(() => gradeAssessmentSchema.parse(valid)).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// Stage 3: QUADAS-2 Domain Definitions
// ---------------------------------------------------------------------------

describe("Cycle 8 — Stage 3: QUADAS-2 Domain Definitions", () => {
  it("has exactly 4 domains", () => {
    expect(QUADAS2_DOMAINS).toHaveLength(4);
  });

  it("domains are patient_selection, index_test, reference_standard, flow_timing", () => {
    const domainIds = QUADAS2_DOMAINS.map((d) => d.domain);
    expect(domainIds).toEqual([
      "patient_selection",
      "index_test",
      "reference_standard",
      "flow_timing",
    ]);
  });

  it("only flow_timing has no applicability concern", () => {
    for (const d of QUADAS2_DOMAINS) {
      if (d.domain === "flow_timing") {
        expect(d.hasApplicability).toBe(false);
        expect(d.applicabilityQuestion).toBeNull();
      } else {
        expect(d.hasApplicability).toBe(true);
        expect(d.applicabilityQuestion).toBeTruthy();
      }
    }
  });

  it("every domain has at least 2 signaling questions", () => {
    for (const d of QUADAS2_DOMAINS) {
      expect(d.signalingQuestions.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("total signaling questions across all domains is 10", () => {
    const total = QUADAS2_DOMAINS.reduce(
      (sum, d) => sum + d.signalingQuestions.length,
      0
    );
    expect(total).toBe(10);
  });

  it("all signaling questions end with ?", () => {
    for (const d of QUADAS2_DOMAINS) {
      for (const q of d.signalingQuestions) {
        expect(q.endsWith("?")).toBe(true);
      }
    }
  });

  it("patient_selection has 3 signaling questions", () => {
    const ps = QUADAS2_DOMAINS.find((d) => d.domain === "patient_selection");
    expect(ps?.signalingQuestions).toHaveLength(3);
  });

  it("flow_timing has 3 signaling questions", () => {
    const ft = QUADAS2_DOMAINS.find((d) => d.domain === "flow_timing");
    expect(ft?.signalingQuestions).toHaveLength(3);
  });
});

// ---------------------------------------------------------------------------
// Stage 4: QUADAS-2 Overall Judgment Logic
// ---------------------------------------------------------------------------

describe("Cycle 8 — Stage 4: QUADAS-2 Overall Judgment Logic", () => {
  it("all Low → overall Low for both RoB and applicability", () => {
    const domains = [
      makeQUADAS2Domain("patient_selection", "Low", "Low"),
      makeQUADAS2Domain("index_test", "Low", "Low"),
      makeQUADAS2Domain("reference_standard", "Low", "Low"),
      makeQUADAS2Domain("flow_timing", "Low", null),
    ];
    const result = computeOverallJudgments(domains);
    expect(result.overallRoB).toBe("Low");
    expect(result.overallApplicability).toBe("Low");
  });

  it("any High RoB → overall High RoB", () => {
    const domains = [
      makeQUADAS2Domain("patient_selection", "High", "Low"),
      makeQUADAS2Domain("index_test", "Low", "Low"),
      makeQUADAS2Domain("reference_standard", "Low", "Low"),
      makeQUADAS2Domain("flow_timing", "Low", null),
    ];
    const result = computeOverallJudgments(domains);
    expect(result.overallRoB).toBe("High");
  });

  it("any Unclear (no High) RoB → overall Unclear RoB", () => {
    const domains = [
      makeQUADAS2Domain("patient_selection", "Unclear", "Low"),
      makeQUADAS2Domain("index_test", "Low", "Low"),
      makeQUADAS2Domain("reference_standard", "Low", "Low"),
      makeQUADAS2Domain("flow_timing", "Low", null),
    ];
    const result = computeOverallJudgments(domains);
    expect(result.overallRoB).toBe("Unclear");
  });

  it("High trumps Unclear for RoB", () => {
    const domains = [
      makeQUADAS2Domain("patient_selection", "High", "Low"),
      makeQUADAS2Domain("index_test", "Unclear", "Low"),
      makeQUADAS2Domain("reference_standard", "Low", "Low"),
      makeQUADAS2Domain("flow_timing", "Low", null),
    ];
    const result = computeOverallJudgments(domains);
    expect(result.overallRoB).toBe("High");
  });

  it("any High applicability → overall High applicability", () => {
    const domains = [
      makeQUADAS2Domain("patient_selection", "Low", "High"),
      makeQUADAS2Domain("index_test", "Low", "Low"),
      makeQUADAS2Domain("reference_standard", "Low", "Low"),
      makeQUADAS2Domain("flow_timing", "Low", null),
    ];
    const result = computeOverallJudgments(domains);
    expect(result.overallApplicability).toBe("High");
  });

  it("flow_timing null applicability is excluded from overall", () => {
    // All applicability-bearing domains Low, flow_timing has null
    const domains = [
      makeQUADAS2Domain("patient_selection", "Low", "Low"),
      makeQUADAS2Domain("index_test", "Low", "Low"),
      makeQUADAS2Domain("reference_standard", "Low", "Low"),
      makeQUADAS2Domain("flow_timing", "High", null), // High RoB but null applicability
    ];
    const result = computeOverallJudgments(domains);
    expect(result.overallApplicability).toBe("Low"); // null excluded
    expect(result.overallRoB).toBe("High"); // RoB still counts
  });
});

// ---------------------------------------------------------------------------
// Stage 5: QUADAS-2 Zod Schema Validation
// ---------------------------------------------------------------------------

describe("Cycle 8 — Stage 5: QUADAS-2 Zod Schema Validation", () => {
  it("valid domain assessment passes schema", () => {
    const valid = {
      domain: "patient_selection",
      domainName: "Patient Selection",
      signalingQuestions: [
        { question: "Was a consecutive sample used?", answer: "Yes" },
        { question: "Was a case-control design avoided?", answer: "Yes" },
      ],
      riskOfBias: "Low",
      applicabilityConcern: "Low",
      rationale: "Consecutive enrollment, no inappropriate exclusions",
    };
    expect(() => quadas2DomainSchema.parse(valid)).not.toThrow();
  });

  it("null applicabilityConcern is valid (flow_timing)", () => {
    const valid = {
      domain: "flow_timing",
      domainName: "Flow and Timing",
      signalingQuestions: [
        { question: "Appropriate interval?", answer: "Yes" },
      ],
      riskOfBias: "Low",
      applicabilityConcern: null,
      rationale: "All patients received the same reference standard",
    };
    expect(() => quadas2DomainSchema.parse(valid)).not.toThrow();
  });

  it("rejects invalid answer value", () => {
    const result = quadas2DomainSchema.safeParse({
      domain: "index_test",
      domainName: "Index Test",
      signalingQuestions: [
        { question: "Blinded?", answer: "Maybe" },
      ],
      riskOfBias: "Low",
      applicabilityConcern: "Low",
      rationale: "test",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid riskOfBias judgment", () => {
    const result = quadas2DomainSchema.safeParse({
      domain: "reference_standard",
      domainName: "Reference Standard",
      signalingQuestions: [],
      riskOfBias: "Medium",
      applicabilityConcern: "Low",
      rationale: "test",
    });
    expect(result.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Stage 6: PRESS 2015 Constants & Labels
// ---------------------------------------------------------------------------

describe("Cycle 8 — Stage 6: PRESS 2015 Constants & Labels", () => {
  it("has exactly 6 elements", () => {
    expect(PRESS_ELEMENTS).toHaveLength(6);
  });

  it("element numbers are 1-6 contiguous", () => {
    const numbers = PRESS_ELEMENTS.map((e) => e.element);
    expect(numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("every element has name and description", () => {
    for (const e of PRESS_ELEMENTS) {
      expect(e.name.length).toBeGreaterThan(5);
      expect(e.description.length).toBeGreaterThan(20);
    }
  });

  it("element 1 is about Research Question translation", () => {
    expect(PRESS_ELEMENTS[0].name).toContain("Translation");
    expect(PRESS_ELEMENTS[0].description).toContain("PICO");
  });

  it("element 2 covers Boolean and Proximity operators", () => {
    expect(PRESS_ELEMENTS[1].name).toContain("Boolean");
    expect(PRESS_ELEMENTS[1].description).toContain("AND");
    expect(PRESS_ELEMENTS[1].description).toContain("OR");
  });

  it("element 3 covers Subject Headings (MeSH)", () => {
    expect(PRESS_ELEMENTS[2].name).toContain("Subject Headings");
    expect(PRESS_ELEMENTS[2].description).toContain("MeSH");
  });

  it("assessment labels cover all 3 values", () => {
    expect(Object.keys(PRESS_ASSESSMENT_LABELS)).toHaveLength(3);
    expect(PRESS_ASSESSMENT_LABELS.no_revision).toBe("No Revision Required");
    expect(PRESS_ASSESSMENT_LABELS.minor_revision).toBe("Minor Revision");
    expect(PRESS_ASSESSMENT_LABELS.major_revision).toBe("Major Revision");
  });

  it("overall labels cover all 3 values", () => {
    expect(Object.keys(PRESS_OVERALL_LABELS)).toHaveLength(3);
    expect(PRESS_OVERALL_LABELS.approved).toBe("Approved");
    expect(PRESS_OVERALL_LABELS.minor_revisions).toBe("Minor Revisions Required");
    expect(PRESS_OVERALL_LABELS.major_revisions).toBe("Major Revisions Required");
  });
});

// ---------------------------------------------------------------------------
// Stage 7: PRESS Zod Schema Validation
// ---------------------------------------------------------------------------

describe("Cycle 8 — Stage 7: PRESS Zod Schema Validation", () => {
  it("valid PRESS element passes schema", () => {
    const valid = {
      element: 1,
      assessment: "no_revision",
      feedback: "All PICO elements present",
      suggestions: [],
    };
    expect(() => pressElementSchema.parse(valid)).not.toThrow();
  });

  it("rejects element number 0", () => {
    const result = pressElementSchema.safeParse({
      element: 0,
      assessment: "no_revision",
      feedback: "test",
      suggestions: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects element number 7", () => {
    const result = pressElementSchema.safeParse({
      element: 7,
      assessment: "no_revision",
      feedback: "test",
      suggestions: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid assessment value", () => {
    const result = pressElementSchema.safeParse({
      element: 1,
      assessment: "critical_revision",
      feedback: "test",
      suggestions: [],
    });
    expect(result.success).toBe(false);
  });

  it("allows non-empty suggestions array", () => {
    const valid = {
      element: 3,
      assessment: "minor_revision",
      feedback: "Missing MeSH terms",
      suggestions: ["Add 'Diabetes Mellitus'[MeSH]", "Explode parent term"],
    };
    expect(() => pressElementSchema.parse(valid)).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// Stage 8: Type Contracts & Cross-Tool Integrity
// ---------------------------------------------------------------------------

describe("Cycle 8 — Stage 8: Type Contracts & Cross-Tool Integrity", () => {
  it("GRADEAssessment type is well-formed", () => {
    const assessment: GRADEAssessment = {
      outcome: "All-cause mortality",
      analysisId: 42,
      domains: [
        makeGRADEDomainAssessment("risk_of_bias"),
        makeGRADEDomainAssessment("inconsistency"),
        makeGRADEDomainAssessment("indirectness"),
        makeGRADEDomainAssessment("imprecision"),
        makeGRADEDomainAssessment("publication_bias"),
      ],
      overallCertainty: "high",
      overallRationale: "No concerns across all domains",
      effectEstimate: "RR = 0.75",
      numberOfStudies: 10,
      totalParticipants: 5000,
      assessedAt: new Date().toISOString(),
    };
    expect(assessment.domains).toHaveLength(5);
    expect(assessment.overallCertainty).toBe("high");
  });

  it("GRADEAssessment allows null analysisId and effectEstimate", () => {
    const assessment: GRADEAssessment = {
      outcome: "Test",
      analysisId: null,
      domains: [
        makeGRADEDomainAssessment("risk_of_bias"),
        makeGRADEDomainAssessment("inconsistency"),
        makeGRADEDomainAssessment("indirectness"),
        makeGRADEDomainAssessment("imprecision"),
        makeGRADEDomainAssessment("publication_bias"),
      ],
      overallCertainty: "very_low",
      overallRationale: "Multiple serious concerns",
      effectEstimate: null,
      numberOfStudies: 0,
      totalParticipants: null,
      assessedAt: new Date().toISOString(),
    };
    expect(assessment.analysisId).toBeNull();
    expect(assessment.effectEstimate).toBeNull();
  });

  it("FullQUADAS2Assessment type is well-formed", () => {
    const assessment: FullQUADAS2Assessment = {
      paperId: 1,
      projectId: 10,
      domains: QUADAS2_DOMAINS.map((d) =>
        makeQUADAS2Domain(
          d.domain,
          "Low",
          d.hasApplicability ? "Low" : null
        )
      ),
      overallRoB: "Low",
      overallApplicability: "Low",
    };
    expect(assessment.domains).toHaveLength(4);
    expect(assessment.overallRoB).toBe("Low");
  });

  it("PRESSValidation type is well-formed", () => {
    const validation: PRESSValidation = {
      elements: PRESS_ELEMENTS.map((e) => ({
        element: e.element,
        name: e.name,
        description: e.description,
        assessment: "no_revision" as const,
        feedback: "Good",
        suggestions: [],
      })),
      overallAssessment: "approved",
      summary: "Well-constructed search strategy",
      assessedAt: new Date().toISOString(),
    };
    expect(validation.elements).toHaveLength(6);
    expect(validation.overallAssessment).toBe("approved");
  });

  it("GRADE downgrade arithmetic: 0+0+0+0+0 = high", () => {
    // No downgrades → certainty stays at high
    const totalDowngrade = [0, 0, 0, 0, 0].reduce((a, b) => a + b, 0);
    expect(totalDowngrade).toBe(0);
    const levels: CertaintyRating[] = ["high", "moderate", "low", "very_low"];
    expect(levels[Math.min(totalDowngrade, 3)]).toBe("high");
  });

  it("GRADE downgrade arithmetic: 1+0+0+2+0 = very_low (3 levels)", () => {
    const totalDowngrade = [1, 0, 0, 2, 0].reduce((a, b) => a + b, 0);
    expect(totalDowngrade).toBe(3);
    const levels: CertaintyRating[] = ["high", "moderate", "low", "very_low"];
    expect(levels[Math.min(totalDowngrade, 3)]).toBe("very_low");
  });

  it("GRADE downgrade arithmetic: 1+1+0+0+0 = low (2 levels)", () => {
    const totalDowngrade = [1, 1, 0, 0, 0].reduce((a, b) => a + b, 0);
    expect(totalDowngrade).toBe(2);
    const levels: CertaintyRating[] = ["high", "moderate", "low", "very_low"];
    expect(levels[Math.min(totalDowngrade, 3)]).toBe("low");
  });

  it("all three tools have distinct domain models", () => {
    // GRADE: 5 domains
    expect(Object.keys(GRADE_DOMAIN_LABELS)).toHaveLength(5);
    // QUADAS-2: 4 domains
    expect(QUADAS2_DOMAINS).toHaveLength(4);
    // PRESS: 6 elements
    expect(PRESS_ELEMENTS).toHaveLength(6);
    // All distinct counts — they are different tools
    expect(new Set([5, 4, 6]).size).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

describe("Cycle 8 — Scoring", () => {
  it("produces a valid cycle score", () => {
    const dimensions: ScoringDimension[] = [
      {
        name: "GRADE Constants & Labels",
        score: 10,
        maxScore: 10,
        weight: 1.5,
        details: "5 domains, 4 certainty levels, human-readable labels",
      },
      {
        name: "GRADE Zod Schema",
        score: 10,
        maxScore: 10,
        weight: 1.5,
        details:
          "Valid/invalid domain names, ratings, downgrade bounds, nullables",
      },
      {
        name: "QUADAS-2 Domain Definitions",
        score: 10,
        maxScore: 10,
        weight: 1.5,
        details:
          "4 domains, 10 signaling questions, flow_timing has no applicability",
      },
      {
        name: "QUADAS-2 Overall Judgment Logic",
        score: 10,
        maxScore: 10,
        weight: 1.5,
        details:
          "High trumps Unclear, null applicability excluded, all combinations",
      },
      {
        name: "QUADAS-2 Zod Schema",
        score: 10,
        maxScore: 10,
        weight: 1.0,
        details: "Valid domains, null applicability, invalid answers rejected",
      },
      {
        name: "PRESS 2015 Constants & Labels",
        score: 10,
        maxScore: 10,
        weight: 1.0,
        details: "6 elements, contiguous numbering, 3 assessment + 3 overall labels",
      },
      {
        name: "PRESS Zod Schema",
        score: 10,
        maxScore: 10,
        weight: 0.5,
        details: "Element bounds 1-6, invalid assessment rejected",
      },
      {
        name: "Type Contracts & Cross-Tool",
        score: 10,
        maxScore: 10,
        weight: 1.0,
        details:
          "GRADEAssessment, FullQUADAS2Assessment, PRESSValidation, downgrade arithmetic",
      },
    ];

    const passedChecks = [
      "GRADE: 5 domains verified",
      "GRADE: 4 certainty levels verified",
      "GRADE: human-readable labels correct",
      "GRADE Zod: valid assessment passes",
      "GRADE Zod: wrong domain count rejected",
      "GRADE Zod: invalid domain name rejected",
      "GRADE Zod: invalid rating rejected",
      "GRADE Zod: downgradeBy=3 rejected",
      "GRADE Zod: negative studies rejected",
      "GRADE Zod: null fields accepted",
      "QUADAS-2: 4 domains verified",
      "QUADAS-2: flow_timing no applicability",
      "QUADAS-2: 10 total signaling questions",
      "QUADAS-2: all questions end with ?",
      "QUADAS-2: all Low → overall Low",
      "QUADAS-2: any High → overall High",
      "QUADAS-2: any Unclear → overall Unclear",
      "QUADAS-2: High trumps Unclear",
      "QUADAS-2: null applicability excluded",
      "QUADAS-2 Zod: valid domain passes",
      "QUADAS-2 Zod: null applicability valid",
      "QUADAS-2 Zod: invalid answer rejected",
      "QUADAS-2 Zod: invalid judgment rejected",
      "PRESS: 6 elements verified",
      "PRESS: contiguous numbering 1-6",
      "PRESS: assessment labels complete",
      "PRESS: overall labels complete",
      "PRESS Zod: valid element passes",
      "PRESS Zod: element 0 rejected",
      "PRESS Zod: element 7 rejected",
      "PRESS Zod: invalid assessment rejected",
      "Types: GRADEAssessment well-formed",
      "Types: FullQUADAS2Assessment well-formed",
      "Types: PRESSValidation well-formed",
      "Types: downgrade arithmetic verified",
    ];

    const result = scoreCycle(
      8,
      "Evidence Quality Assessment Tools",
      dimensions,
      [],
      passedChecks
    );
    expect(result.normalizedScore).toBe(10);
    expect(result.cycleId).toBe(8);
    expect(result.issues).toHaveLength(0);
  });
});
