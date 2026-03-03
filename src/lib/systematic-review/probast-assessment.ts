/**
 * PROBAST — Prediction model Risk Of Bias ASsessment Tool
 *
 * Implements the PROBAST framework for assessing risk of bias and
 * applicability of prediction model studies (diagnostic or prognostic).
 *
 * 4 domains:
 *   1. Participants — selection, eligibility, sampling
 *   2. Predictors — definition, measurement, availability at intended use
 *   3. Outcome — definition, measurement, blinding, timing
 *   4. Analysis — sample size, missing data, model building, evaluation
 *
 * Each domain has:
 *   - Signaling questions → answered Yes / Probably Yes / No / Probably No / No Information
 *   - Risk of Bias judgment → Low / High / Unclear
 *   - Applicability concern → Low / High / Unclear
 *
 * Overall judgment:
 *   - RoB is "High" if ANY domain is "High"; "Unclear" if any "Unclear" (none High); else "Low"
 *   - Applicability is "High" if ANY of the first 3 domains is "High"; else same rule
 *
 * Reference: Wolff RF et al., Ann Intern Med 2019;170:51-58
 */

// ---------------------------------------------------------------------------
// Domain definitions
// ---------------------------------------------------------------------------

export const PROBAST_DOMAINS = [
  {
    domain: "participants",
    name: "Participants",
    hasApplicability: true,
    signalingQuestions: [
      "Were appropriate data sources used (e.g., cohort, RCT, or nested case-control)?",
      "Were all inclusions and exclusions of participants appropriate?",
    ],
    applicabilityQuestion:
      "Are there concerns that the included participants and setting do not match the review question?",
  },
  {
    domain: "predictors",
    name: "Predictors",
    hasApplicability: true,
    signalingQuestions: [
      "Were predictors defined and assessed in a similar way for all participants?",
      "Were predictor assessments made without knowledge of outcome data?",
      "Are all predictors available at the time the model is intended to be used?",
    ],
    applicabilityQuestion:
      "Are there concerns that the definition, assessment, or timing of predictors in the model do not match the review question?",
  },
  {
    domain: "outcome",
    name: "Outcome",
    hasApplicability: true,
    signalingQuestions: [
      "Was the outcome determined appropriately?",
      "Was a pre-specified or standard outcome definition used?",
      "Were predictors excluded from the outcome definition?",
      "Was the outcome defined and determined in a similar way for all participants?",
      "Was the outcome determined without knowledge of predictor information?",
      "Was the time interval between predictor assessment and outcome determination appropriate?",
    ],
    applicabilityQuestion:
      "Are there concerns that the outcome, its definition, timing, or determination do not match the review question?",
  },
  {
    domain: "analysis",
    name: "Analysis",
    hasApplicability: false,
    signalingQuestions: [
      "Were there a reasonable number of participants with the outcome?",
      "Were continuous and categorical predictors handled appropriately?",
      "Were all enrolled participants included in the analysis?",
      "Were participants with missing data handled appropriately?",
      "Was selection of predictors based on univariable analysis avoided?",
      "Were complexities in the data (e.g., censoring, competing risks, sampling) accounted for?",
      "Were relevant model performance measures evaluated appropriately?",
      "Were model overfitting and optimism accounted for?",
      "Do predictors and their assigned weights in the final model correspond to the results from multivariable analysis?",
    ],
    applicabilityQuestion: null,
  },
] as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PROBASTJudgment = "Low" | "High" | "Unclear";

export type PROBASTSignalingAnswer =
  | "Yes"
  | "Probably Yes"
  | "No"
  | "Probably No"
  | "No Information";

export interface PROBASTSignalingQuestion {
  question: string;
  answer: PROBASTSignalingAnswer;
}

export interface PROBASTDomainAssessment {
  domain: string;
  domainName: string;
  riskOfBias: PROBASTJudgment;
  applicabilityConcern: PROBASTJudgment | null; // null for Analysis domain
  signalingQuestions: PROBASTSignalingQuestion[];
  rationale: string;
}

export interface FullPROBASTAssessment {
  studyId: string;
  modelName: string;
  domains: PROBASTDomainAssessment[];
  overallRoB: PROBASTJudgment;
  overallApplicability: PROBASTJudgment;
}

export const PROBAST_DOMAIN_LABELS: Record<string, string> = {
  participants: "Participants",
  predictors: "Predictors",
  outcome: "Outcome",
  analysis: "Analysis",
};

export const PROBAST_JUDGMENT_LABELS: Record<PROBASTJudgment, string> = {
  Low: "Low risk",
  High: "High risk",
  Unclear: "Unclear",
};

export const PROBAST_SIGNAL_LABELS: Record<PROBASTSignalingAnswer, string> = {
  Yes: "Yes",
  "Probably Yes": "Probably Yes",
  No: "No",
  "Probably No": "Probably No",
  "No Information": "No Information",
};

// ---------------------------------------------------------------------------
// Judgment inference from signaling questions
// ---------------------------------------------------------------------------

/**
 * Infer domain-level RoB judgment from signaling question answers.
 *
 * Per PROBAST guidance:
 * - "Low" if all answers are "Yes" or "Probably Yes"
 * - "High" if any answer is "No" or "Probably No"
 * - "Unclear" if any answer is "No Information" and none are "No"/"Probably No"
 */
export function inferDomainJudgment(
  answers: PROBASTSignalingAnswer[]
): PROBASTJudgment {
  const hasNo = answers.some((a) => a === "No" || a === "Probably No");
  const hasNoInfo = answers.some((a) => a === "No Information");

  if (hasNo) return "High";
  if (hasNoInfo) return "Unclear";
  return "Low";
}

// ---------------------------------------------------------------------------
// Overall judgment computation
// ---------------------------------------------------------------------------

/**
 * Compute overall RoB and applicability from domain assessments.
 *
 * Per PROBAST guidance:
 * - Overall RoB is "High" if ANY domain is "High"
 * - Overall RoB is "Unclear" if any domain is "Unclear" (none "High")
 * - Overall RoB is "Low" only if ALL domains are "Low"
 *
 * Applicability uses only the first 3 domains (Analysis has no applicability).
 */
export function computeOverallPROBAST(
  domains: PROBASTDomainAssessment[]
): { overallRoB: PROBASTJudgment; overallApplicability: PROBASTJudgment } {
  // Overall Risk of Bias
  const robJudgments = domains.map((d) => d.riskOfBias);
  let overallRoB: PROBASTJudgment = "Low";
  if (robJudgments.includes("High")) {
    overallRoB = "High";
  } else if (robJudgments.includes("Unclear")) {
    overallRoB = "Unclear";
  }

  // Overall Applicability (only domains that have it: Participants, Predictors, Outcome)
  const appJudgments = domains
    .filter((d) => d.applicabilityConcern !== null)
    .map((d) => d.applicabilityConcern as PROBASTJudgment);

  let overallApplicability: PROBASTJudgment = "Low";
  if (appJudgments.includes("High")) {
    overallApplicability = "High";
  } else if (appJudgments.includes("Unclear")) {
    overallApplicability = "Unclear";
  }

  return { overallRoB, overallApplicability };
}

// ---------------------------------------------------------------------------
// Full assessment function (pure / non-AI)
// ---------------------------------------------------------------------------

/**
 * Assess a prediction model study using PROBAST.
 *
 * Accepts pre-populated domain assessments and validates completeness.
 */
export function assessPROBAST(
  studyId: string,
  modelName: string,
  domains: PROBASTDomainAssessment[]
): FullPROBASTAssessment {
  // Validate all 4 domains are present
  const domainSet = new Set(domains.map((d) => d.domain));
  const requiredDomains = ["participants", "predictors", "outcome", "analysis"];

  for (const req of requiredDomains) {
    if (!domainSet.has(req)) {
      throw new Error(`Missing required PROBAST domain: ${req}`);
    }
  }

  // Validate Analysis domain has null applicability
  const analysisDomain = domains.find((d) => d.domain === "analysis");
  if (analysisDomain && analysisDomain.applicabilityConcern !== null) {
    throw new Error(
      "Analysis domain should not have an applicability concern (must be null)"
    );
  }

  const { overallRoB, overallApplicability } = computeOverallPROBAST(domains);

  return {
    studyId,
    modelName,
    domains,
    overallRoB,
    overallApplicability,
  };
}

// ---------------------------------------------------------------------------
// Summary table export (CSV)
// ---------------------------------------------------------------------------

/**
 * Export PROBAST results as a CSV summary table.
 */
export function exportPROBASTSummaryCSV(
  assessments: FullPROBASTAssessment[]
): string {
  const headers = [
    "Study ID",
    "Model Name",
    "Participants RoB",
    "Participants Applicability",
    "Predictors RoB",
    "Predictors Applicability",
    "Outcome RoB",
    "Outcome Applicability",
    "Analysis RoB",
    "Overall RoB",
    "Overall Applicability",
  ];

  const rows = assessments.map((a) => {
    const getDomainJudgment = (domain: string) => {
      const found = a.domains.find((d) => d.domain === domain);
      return found ? found.riskOfBias : "N/A";
    };
    const getDomainApplicability = (domain: string) => {
      const found = a.domains.find((d) => d.domain === domain);
      if (!found) return "N/A";
      return found.applicabilityConcern ?? "N/A";
    };

    return [
      a.studyId,
      `"${a.modelName.replace(/"/g, '""')}"`,
      getDomainJudgment("participants"),
      getDomainApplicability("participants"),
      getDomainJudgment("predictors"),
      getDomainApplicability("predictors"),
      getDomainJudgment("outcome"),
      getDomainApplicability("outcome"),
      getDomainJudgment("analysis"),
      a.overallRoB,
      a.overallApplicability,
    ];
  });

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

/**
 * Generate a visual traffic-light indicator for a judgment.
 */
export function generateJudgmentIndicator(judgment: PROBASTJudgment): string {
  switch (judgment) {
    case "Low":
      return "🟢 Low";
    case "High":
      return "🔴 High";
    case "Unclear":
      return "🟡 Unclear";
  }
}
