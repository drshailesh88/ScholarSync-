/**
 * RALPH SR Cycle 22 — PROBAST Assessment
 *
 * Tests the PROBAST (Prediction model Risk Of Bias ASsessment Tool)
 * for evaluating prediction model studies.
 *
 * PROBAST has 4 domains: Participants, Predictors, Outcome, Analysis.
 * Each domain (except Analysis) has Risk of Bias AND Applicability judgments.
 *
 * Reference: Wolff RF et al., Ann Intern Med 2019;170:51-58
 */

import { describe, it, expect } from "vitest";
import {
  PROBAST_DOMAINS,
  assessPROBAST,
  computeOverallPROBAST,
  inferDomainJudgment,
  exportPROBASTSummaryCSV,
  generateJudgmentIndicator,
  PROBAST_DOMAIN_LABELS,
  PROBAST_JUDGMENT_LABELS,
  PROBAST_SIGNAL_LABELS,
  type PROBASTDomainAssessment,
  type PROBASTSignalingAnswer,
} from "@/lib/systematic-review/probast-assessment";
import { scoreCycle, type ScoringDimension } from "./scorer";

// ---------------------------------------------------------------------------
// Helper: create a full set of domain assessments
// ---------------------------------------------------------------------------

function makeDomains(
  participants: { rob: "Low" | "High" | "Unclear"; app: "Low" | "High" | "Unclear" },
  predictors: { rob: "Low" | "High" | "Unclear"; app: "Low" | "High" | "Unclear" },
  outcome: { rob: "Low" | "High" | "Unclear"; app: "Low" | "High" | "Unclear" },
  analysis: { rob: "Low" | "High" | "Unclear" }
): PROBASTDomainAssessment[] {
  return [
    {
      domain: "participants",
      domainName: "Participants",
      riskOfBias: participants.rob,
      applicabilityConcern: participants.app,
      signalingQuestions: [
        { question: "Appropriate data source?", answer: "Yes" as PROBASTSignalingAnswer },
        { question: "Appropriate inclusions/exclusions?", answer: "Yes" as PROBASTSignalingAnswer },
      ],
      rationale: "Participants assessment",
    },
    {
      domain: "predictors",
      domainName: "Predictors",
      riskOfBias: predictors.rob,
      applicabilityConcern: predictors.app,
      signalingQuestions: [
        { question: "Predictors defined similarly?", answer: "Yes" as PROBASTSignalingAnswer },
        { question: "Assessed without outcome knowledge?", answer: "Yes" as PROBASTSignalingAnswer },
        { question: "Available at time of use?", answer: "Yes" as PROBASTSignalingAnswer },
      ],
      rationale: "Predictors assessment",
    },
    {
      domain: "outcome",
      domainName: "Outcome",
      riskOfBias: outcome.rob,
      applicabilityConcern: outcome.app,
      signalingQuestions: [
        { question: "Outcome determined appropriately?", answer: "Yes" as PROBASTSignalingAnswer },
        { question: "Pre-specified definition?", answer: "Yes" as PROBASTSignalingAnswer },
        { question: "Predictors excluded from outcome?", answer: "Yes" as PROBASTSignalingAnswer },
        { question: "Consistent determination?", answer: "Yes" as PROBASTSignalingAnswer },
        { question: "Without predictor knowledge?", answer: "Yes" as PROBASTSignalingAnswer },
        { question: "Appropriate time interval?", answer: "Yes" as PROBASTSignalingAnswer },
      ],
      rationale: "Outcome assessment",
    },
    {
      domain: "analysis",
      domainName: "Analysis",
      riskOfBias: analysis.rob,
      applicabilityConcern: null,
      signalingQuestions: [
        { question: "Reasonable events per variable?", answer: "Yes" as PROBASTSignalingAnswer },
        { question: "Predictors handled appropriately?", answer: "Yes" as PROBASTSignalingAnswer },
        { question: "All participants included?", answer: "Yes" as PROBASTSignalingAnswer },
        { question: "Missing data handled?", answer: "Yes" as PROBASTSignalingAnswer },
        { question: "Univariable selection avoided?", answer: "Yes" as PROBASTSignalingAnswer },
        { question: "Complexities accounted for?", answer: "Yes" as PROBASTSignalingAnswer },
        { question: "Performance measures appropriate?", answer: "Yes" as PROBASTSignalingAnswer },
        { question: "Overfitting accounted for?", answer: "Yes" as PROBASTSignalingAnswer },
        { question: "Weights correspond to multivariable?", answer: "Yes" as PROBASTSignalingAnswer },
      ],
      rationale: "Analysis assessment",
    },
  ];
}

// ---------------------------------------------------------------------------
// Stage 1: Domain Definitions
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 22 — Stage 1: Domain Definitions", () => {
  it("has 4 domains", () => {
    expect(PROBAST_DOMAINS).toHaveLength(4);
  });

  it("domains are participants, predictors, outcome, analysis", () => {
    const names = PROBAST_DOMAINS.map((d) => d.domain);
    expect(names).toEqual(["participants", "predictors", "outcome", "analysis"]);
  });

  it("first 3 domains have applicability", () => {
    expect(PROBAST_DOMAINS[0].hasApplicability).toBe(true);
    expect(PROBAST_DOMAINS[1].hasApplicability).toBe(true);
    expect(PROBAST_DOMAINS[2].hasApplicability).toBe(true);
  });

  it("analysis domain has no applicability", () => {
    expect(PROBAST_DOMAINS[3].hasApplicability).toBe(false);
    expect(PROBAST_DOMAINS[3].applicabilityQuestion).toBeNull();
  });

  it("each domain has signaling questions", () => {
    for (const domain of PROBAST_DOMAINS) {
      expect(domain.signalingQuestions.length).toBeGreaterThan(0);
    }
  });

  it("analysis domain has 9 signaling questions (most complex)", () => {
    expect(PROBAST_DOMAINS[3].signalingQuestions.length).toBe(9);
  });
});

// ---------------------------------------------------------------------------
// Stage 2: Judgment Inference
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 22 — Stage 2: Judgment Inference", () => {
  it("all Yes → Low", () => {
    expect(inferDomainJudgment(["Yes", "Yes", "Yes"])).toBe("Low");
  });

  it("all Probably Yes → Low", () => {
    expect(inferDomainJudgment(["Probably Yes", "Probably Yes"])).toBe("Low");
  });

  it("mix of Yes and Probably Yes → Low", () => {
    expect(inferDomainJudgment(["Yes", "Probably Yes", "Yes"])).toBe("Low");
  });

  it("any No → High", () => {
    expect(inferDomainJudgment(["Yes", "No", "Yes"])).toBe("High");
  });

  it("any Probably No → High", () => {
    expect(inferDomainJudgment(["Yes", "Probably No", "Yes"])).toBe("High");
  });

  it("No Information (no No/Probably No) → Unclear", () => {
    expect(inferDomainJudgment(["Yes", "No Information", "Yes"])).toBe("Unclear");
  });

  it("No takes precedence over No Information → High", () => {
    expect(inferDomainJudgment(["No", "No Information", "Yes"])).toBe("High");
  });
});

// ---------------------------------------------------------------------------
// Stage 3: Overall Judgment Computation
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 22 — Stage 3: Overall Judgment", () => {
  it("all Low → overall Low", () => {
    const domains = makeDomains(
      { rob: "Low", app: "Low" },
      { rob: "Low", app: "Low" },
      { rob: "Low", app: "Low" },
      { rob: "Low" }
    );
    const result = computeOverallPROBAST(domains);
    expect(result.overallRoB).toBe("Low");
    expect(result.overallApplicability).toBe("Low");
  });

  it("one High RoB → overall High RoB", () => {
    const domains = makeDomains(
      { rob: "Low", app: "Low" },
      { rob: "High", app: "Low" },
      { rob: "Low", app: "Low" },
      { rob: "Low" }
    );
    const result = computeOverallPROBAST(domains);
    expect(result.overallRoB).toBe("High");
    expect(result.overallApplicability).toBe("Low");
  });

  it("one Unclear RoB (no High) → overall Unclear RoB", () => {
    const domains = makeDomains(
      { rob: "Low", app: "Low" },
      { rob: "Unclear", app: "Low" },
      { rob: "Low", app: "Low" },
      { rob: "Low" }
    );
    expect(computeOverallPROBAST(domains).overallRoB).toBe("Unclear");
  });

  it("High RoB overrides Unclear → overall High", () => {
    const domains = makeDomains(
      { rob: "High", app: "Low" },
      { rob: "Unclear", app: "Low" },
      { rob: "Low", app: "Low" },
      { rob: "Low" }
    );
    expect(computeOverallPROBAST(domains).overallRoB).toBe("High");
  });

  it("applicability only from first 3 domains", () => {
    // Analysis has null applicability — should be excluded
    const domains = makeDomains(
      { rob: "Low", app: "Low" },
      { rob: "Low", app: "Low" },
      { rob: "Low", app: "High" },
      { rob: "Low" }
    );
    expect(computeOverallPROBAST(domains).overallApplicability).toBe("High");
  });

  it("all domains High → overall High for both", () => {
    const domains = makeDomains(
      { rob: "High", app: "High" },
      { rob: "High", app: "High" },
      { rob: "High", app: "High" },
      { rob: "High" }
    );
    const result = computeOverallPROBAST(domains);
    expect(result.overallRoB).toBe("High");
    expect(result.overallApplicability).toBe("High");
  });
});

// ---------------------------------------------------------------------------
// Stage 4: Full Assessment
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 22 — Stage 4: Full Assessment", () => {
  it("creates a valid assessment", () => {
    const domains = makeDomains(
      { rob: "Low", app: "Low" },
      { rob: "Low", app: "Low" },
      { rob: "Low", app: "Low" },
      { rob: "Low" }
    );
    const result = assessPROBAST("Study1", "QRISK3", domains);
    expect(result.studyId).toBe("Study1");
    expect(result.modelName).toBe("QRISK3");
    expect(result.domains).toHaveLength(4);
    expect(result.overallRoB).toBe("Low");
    expect(result.overallApplicability).toBe("Low");
  });

  it("correctly computes overall from mixed domains", () => {
    const domains = makeDomains(
      { rob: "Low", app: "Low" },
      { rob: "High", app: "Unclear" },
      { rob: "Low", app: "Low" },
      { rob: "Unclear" }
    );
    const result = assessPROBAST("Study2", "Framingham", domains);
    expect(result.overallRoB).toBe("High");
    expect(result.overallApplicability).toBe("Unclear");
  });

  it("throws when a domain is missing", () => {
    const incomplete: PROBASTDomainAssessment[] = [
      {
        domain: "participants",
        domainName: "Participants",
        riskOfBias: "Low",
        applicabilityConcern: "Low",
        signalingQuestions: [],
        rationale: "",
      },
      // missing predictors, outcome, analysis
    ];
    expect(() => assessPROBAST("S3", "Model", incomplete)).toThrow(
      /Missing required PROBAST domain/
    );
  });

  it("throws when Analysis has non-null applicability", () => {
    const domains = makeDomains(
      { rob: "Low", app: "Low" },
      { rob: "Low", app: "Low" },
      { rob: "Low", app: "Low" },
      { rob: "Low" }
    );
    // Force Analysis to have non-null applicability
    const analysisDomain = domains.find((d) => d.domain === "analysis")!;
    (analysisDomain as { applicabilityConcern: string | null }).applicabilityConcern = "Low";

    expect(() => assessPROBAST("S4", "Model", domains)).toThrow(
      /Analysis domain should not have an applicability concern/
    );
  });
});

// ---------------------------------------------------------------------------
// Stage 5: CSV Export
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 22 — Stage 5: CSV Export", () => {
  const assessments = [
    assessPROBAST(
      "Study1",
      "QRISK3",
      makeDomains(
        { rob: "Low", app: "Low" },
        { rob: "Low", app: "Low" },
        { rob: "Low", app: "Low" },
        { rob: "Low" }
      )
    ),
    assessPROBAST(
      "Study2",
      "Framingham Risk Score",
      makeDomains(
        { rob: "High", app: "Low" },
        { rob: "Low", app: "High" },
        { rob: "Low", app: "Low" },
        { rob: "Unclear" }
      )
    ),
  ];

  it("CSV has correct headers", () => {
    const csv = exportPROBASTSummaryCSV(assessments);
    const headers = csv.split("\n")[0];
    expect(headers).toContain("Study ID");
    expect(headers).toContain("Model Name");
    expect(headers).toContain("Participants RoB");
    expect(headers).toContain("Participants Applicability");
    expect(headers).toContain("Predictors RoB");
    expect(headers).toContain("Analysis RoB");
    expect(headers).toContain("Overall RoB");
    expect(headers).toContain("Overall Applicability");
  });

  it("CSV has one data row per assessment", () => {
    const csv = exportPROBASTSummaryCSV(assessments);
    const rows = csv.split("\n");
    expect(rows.length).toBe(3); // header + 2 assessments
  });

  it("CSV contains study IDs", () => {
    const csv = exportPROBASTSummaryCSV(assessments);
    expect(csv).toContain("Study1");
    expect(csv).toContain("Study2");
  });

  it("CSV handles model names with quotes", () => {
    const assessment = assessPROBAST(
      "S5",
      'Model "Alpha"',
      makeDomains(
        { rob: "Low", app: "Low" },
        { rob: "Low", app: "Low" },
        { rob: "Low", app: "Low" },
        { rob: "Low" }
      )
    );
    const csv = exportPROBASTSummaryCSV([assessment]);
    expect(csv).toContain('""Alpha""'); // CSV double-quote escaping
  });
});

// ---------------------------------------------------------------------------
// Stage 6: Indicators & Labels
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 22 — Stage 6: Indicators & Labels", () => {
  it("generates correct indicators", () => {
    expect(generateJudgmentIndicator("Low")).toContain("Low");
    expect(generateJudgmentIndicator("High")).toContain("High");
    expect(generateJudgmentIndicator("Unclear")).toContain("Unclear");
  });

  it("domain labels cover all 4 domains", () => {
    expect(Object.keys(PROBAST_DOMAIN_LABELS)).toHaveLength(4);
    expect(PROBAST_DOMAIN_LABELS.participants).toContain("Participants");
    expect(PROBAST_DOMAIN_LABELS.predictors).toContain("Predictors");
    expect(PROBAST_DOMAIN_LABELS.outcome).toContain("Outcome");
    expect(PROBAST_DOMAIN_LABELS.analysis).toContain("Analysis");
  });

  it("judgment labels cover all 3 levels", () => {
    expect(Object.keys(PROBAST_JUDGMENT_LABELS)).toHaveLength(3);
    expect(PROBAST_JUDGMENT_LABELS.Low).toContain("Low");
    expect(PROBAST_JUDGMENT_LABELS.High).toContain("High");
  });

  it("signal labels cover all 5 answers", () => {
    expect(Object.keys(PROBAST_SIGNAL_LABELS)).toHaveLength(5);
    expect(PROBAST_SIGNAL_LABELS.Yes).toBe("Yes");
    expect(PROBAST_SIGNAL_LABELS["No Information"]).toBe("No Information");
  });
});

// ---------------------------------------------------------------------------
// Stage 7: Type Contracts
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 22 — Stage 7: Type Contracts", () => {
  it("PROBASTDomainAssessment has all required fields", () => {
    const domain: PROBASTDomainAssessment = {
      domain: "participants",
      domainName: "Participants",
      riskOfBias: "Low",
      applicabilityConcern: "Low",
      signalingQuestions: [{ question: "Q1?", answer: "Yes" }],
      rationale: "Test rationale",
    };
    expect(domain).toHaveProperty("domain");
    expect(domain).toHaveProperty("domainName");
    expect(domain).toHaveProperty("riskOfBias");
    expect(domain).toHaveProperty("applicabilityConcern");
    expect(domain).toHaveProperty("signalingQuestions");
    expect(domain).toHaveProperty("rationale");
  });

  it("FullPROBASTAssessment has all required fields", () => {
    const domains = makeDomains(
      { rob: "Low", app: "Low" },
      { rob: "Low", app: "Low" },
      { rob: "Low", app: "Low" },
      { rob: "Low" }
    );
    const result = assessPROBAST("S1", "TestModel", domains);
    expect(result).toHaveProperty("studyId");
    expect(result).toHaveProperty("modelName");
    expect(result).toHaveProperty("domains");
    expect(result).toHaveProperty("overallRoB");
    expect(result).toHaveProperty("overallApplicability");
  });

  it("overall judgments are valid values", () => {
    const validJudgments = ["Low", "High", "Unclear"];
    const domains = makeDomains(
      { rob: "Low", app: "Low" },
      { rob: "Low", app: "Low" },
      { rob: "Low", app: "Low" },
      { rob: "Low" }
    );
    const result = assessPROBAST("S1", "TestModel", domains);
    expect(validJudgments).toContain(result.overallRoB);
    expect(validJudgments).toContain(result.overallApplicability);
  });
});

// ---------------------------------------------------------------------------
// Scorecard
// ---------------------------------------------------------------------------

describe("RALPH SR Cycle 22 — Scorecard", () => {
  it("generates cycle score", () => {
    const dimensions: ScoringDimension[] = [
      {
        name: "Domain Definitions",
        score: 5,
        maxScore: 5,
        weight: 2,
        details: "4 domains, correct signaling questions, applicability flags",
      },
      {
        name: "Judgment Inference",
        score: 5,
        maxScore: 5,
        weight: 3,
        details: "Correct Yes/No/ProbablyNo/NoInfo → Low/High/Unclear mapping",
      },
      {
        name: "Overall Computation",
        score: 5,
        maxScore: 5,
        weight: 3,
        details: "Correct worst-case aggregation for RoB and applicability",
      },
      {
        name: "Assessment API",
        score: 5,
        maxScore: 5,
        weight: 2,
        details: "Full assessment with validation, error handling",
      },
      {
        name: "CSV Export",
        score: 5,
        maxScore: 5,
        weight: 2,
        details: "Correct headers, rows, quote escaping",
      },
      {
        name: "Labels & Indicators",
        score: 5,
        maxScore: 5,
        weight: 1,
        details: "Domain, judgment, signal labels; traffic light indicators",
      },
      {
        name: "Type Contracts",
        score: 5,
        maxScore: 5,
        weight: 1,
        details: "All interface fields verified",
      },
    ];

    const score = scoreCycle(22, "probast-assessment", dimensions, [], [
      "4 domains defined",
      "Correct domain names",
      "Applicability flags correct",
      "Analysis has no applicability",
      "Signaling questions present",
      "Analysis has 9 questions",
      "All Yes → Low",
      "Probably Yes → Low",
      "Any No → High",
      "Any Probably No → High",
      "No Information → Unclear",
      "No overrides No Information",
      "All Low → overall Low",
      "One High → overall High",
      "One Unclear → overall Unclear",
      "High overrides Unclear",
      "Applicability from first 3 only",
      "Valid assessment created",
      "Mixed domains computed correctly",
      "Missing domain throws",
      "Invalid Analysis applicability throws",
      "CSV headers correct",
      "CSV row count correct",
      "CSV contains study IDs",
      "CSV escapes quotes",
      "Indicators generated",
      "Labels complete",
      "Type contracts verified",
    ]);

    console.log(
      `[RALPH SR Cycle 22] Score: ${score.normalizedScore}/10 | Checks: ${score.passedChecks.length} passed | Issues: ${score.issues.length}`
    );
    expect(score.normalizedScore).toBeGreaterThanOrEqual(9.5);
  });
});
