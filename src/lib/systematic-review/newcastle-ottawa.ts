/**
 * Newcastle-Ottawa Scale (NOS) Assessment Engine
 *
 * The NOS is a star-based quality assessment tool for non-randomized studies
 * used in systematic reviews and meta-analyses.
 *
 * Supports two study designs:
 * - Cohort studies (Selection 4★, Comparability 2★, Outcome 3★ = max 9★)
 * - Case-control studies (Selection 4★, Comparability 2★, Exposure 3★ = max 9★)
 *
 * Quality thresholds:
 * - Good: 7-9★
 * - Fair: 4-6★
 * - Poor: 0-3★
 *
 * Reference: Wells GA et al. The Newcastle-Ottawa Scale (NOS) for assessing
 * the quality of nonrandomised studies in meta-analyses. Ottawa Hospital
 * Research Institute, 2000.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type NOSStudyDesign = "cohort" | "case-control";

export type NOSQualityRating = "good" | "fair" | "poor";

export interface NOSItem {
  id: string;
  category: "selection" | "comparability" | "outcome" | "exposure";
  question: string;
  maxStars: number;
  options: NOSItemOption[];
}

export interface NOSItemOption {
  label: string;
  stars: number;
  description?: string;
}

export interface NOSItemResult {
  itemId: string;
  category: string;
  question: string;
  selectedOption: string;
  starsAwarded: number;
  maxStars: number;
  rationale: string;
}

export interface NOSAssessment {
  paperId: string;
  studyDesign: NOSStudyDesign;
  items: NOSItemResult[];
  categoryScores: {
    selection: { score: number; max: number };
    comparability: { score: number; max: number };
    outcomeOrExposure: { score: number; max: number };
  };
  totalStars: number;
  maxStars: number;
  qualityRating: NOSQualityRating;
  overallRationale: string;
}

// ---------------------------------------------------------------------------
// Cohort Study Items (Wells et al.)
// ---------------------------------------------------------------------------

export const NOS_COHORT_ITEMS: NOSItem[] = [
  {
    id: "S1",
    category: "selection",
    question: "Representativeness of the exposed cohort",
    maxStars: 1,
    options: [
      { label: "Truly representative of the average in the community", stars: 1 },
      { label: "Somewhat representative of the average in the community", stars: 1 },
      { label: "Selected group of users (e.g., nurses, volunteers)", stars: 0 },
      { label: "No description of the derivation of the cohort", stars: 0 },
    ],
  },
  {
    id: "S2",
    category: "selection",
    question: "Selection of the non-exposed cohort",
    maxStars: 1,
    options: [
      { label: "Drawn from the same community as the exposed cohort", stars: 1 },
      { label: "Drawn from a different source", stars: 0 },
      { label: "No description of the derivation of the non-exposed cohort", stars: 0 },
    ],
  },
  {
    id: "S3",
    category: "selection",
    question: "Ascertainment of exposure",
    maxStars: 1,
    options: [
      { label: "Secure record (e.g., surgical records)", stars: 1 },
      { label: "Structured interview", stars: 1 },
      { label: "Written self-report", stars: 0 },
      { label: "No description", stars: 0 },
    ],
  },
  {
    id: "S4",
    category: "selection",
    question: "Demonstration that outcome of interest was not present at start of study",
    maxStars: 1,
    options: [
      { label: "Yes", stars: 1 },
      { label: "No", stars: 0 },
    ],
  },
  {
    id: "C1",
    category: "comparability",
    question: "Comparability of cohorts on the basis of design or analysis",
    maxStars: 2,
    options: [
      { label: "Study controls for the most important factor AND additional factor", stars: 2 },
      { label: "Study controls for the most important factor only", stars: 1 },
      { label: "Study does not control for confounders", stars: 0 },
    ],
  },
  {
    id: "O1",
    category: "outcome",
    question: "Assessment of outcome",
    maxStars: 1,
    options: [
      { label: "Independent blind assessment", stars: 1 },
      { label: "Record linkage", stars: 1 },
      { label: "Self-report", stars: 0 },
      { label: "No description", stars: 0 },
    ],
  },
  {
    id: "O2",
    category: "outcome",
    question: "Was follow-up long enough for outcomes to occur",
    maxStars: 1,
    options: [
      { label: "Yes (adequate follow-up for outcome)", stars: 1 },
      { label: "No", stars: 0 },
    ],
  },
  {
    id: "O3",
    category: "outcome",
    question: "Adequacy of follow-up of cohorts",
    maxStars: 1,
    options: [
      { label: "Complete follow-up — all subjects accounted for", stars: 1 },
      { label: "Subjects lost to follow-up unlikely to introduce bias (≤20% lost, or described)", stars: 1 },
      { label: "Follow-up rate <80% and no description of those lost", stars: 0 },
      { label: "No statement", stars: 0 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Case-Control Study Items
// ---------------------------------------------------------------------------

export const NOS_CASE_CONTROL_ITEMS: NOSItem[] = [
  {
    id: "S1",
    category: "selection",
    question: "Is the case definition adequate?",
    maxStars: 1,
    options: [
      { label: "Yes, with independent validation", stars: 1 },
      { label: "Yes, e.g., record linkage or based on self-reports", stars: 1 },
      { label: "No description", stars: 0 },
    ],
  },
  {
    id: "S2",
    category: "selection",
    question: "Representativeness of the cases",
    maxStars: 1,
    options: [
      { label: "Consecutive or obviously representative series of cases", stars: 1 },
      { label: "Potential for selection biases or not stated", stars: 0 },
    ],
  },
  {
    id: "S3",
    category: "selection",
    question: "Selection of controls",
    maxStars: 1,
    options: [
      { label: "Community controls", stars: 1 },
      { label: "Hospital controls", stars: 0 },
      { label: "No description", stars: 0 },
    ],
  },
  {
    id: "S4",
    category: "selection",
    question: "Definition of controls",
    maxStars: 1,
    options: [
      { label: "No history of disease (endpoint)", stars: 1 },
      { label: "No description of source", stars: 0 },
    ],
  },
  {
    id: "C1",
    category: "comparability",
    question: "Comparability of cases and controls on the basis of design or analysis",
    maxStars: 2,
    options: [
      { label: "Study controls for the most important factor AND additional factor", stars: 2 },
      { label: "Study controls for the most important factor only", stars: 1 },
      { label: "Study does not control for confounders", stars: 0 },
    ],
  },
  {
    id: "E1",
    category: "exposure",
    question: "Ascertainment of exposure",
    maxStars: 1,
    options: [
      { label: "Secure record (e.g., surgical records)", stars: 1 },
      { label: "Structured interview where blind to case/control status", stars: 1 },
      { label: "Interview not blinded to case/control status", stars: 0 },
      { label: "Written self-report or medical record only", stars: 0 },
      { label: "No description", stars: 0 },
    ],
  },
  {
    id: "E2",
    category: "exposure",
    question: "Same method of ascertainment for cases and controls",
    maxStars: 1,
    options: [
      { label: "Yes", stars: 1 },
      { label: "No", stars: 0 },
    ],
  },
  {
    id: "E3",
    category: "exposure",
    question: "Non-response rate",
    maxStars: 1,
    options: [
      { label: "Same rate for both groups", stars: 1 },
      { label: "Non-respondents described", stars: 1 },
      { label: "Rate different and no designation", stars: 0 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Assessment functions
// ---------------------------------------------------------------------------

export function getNOSItems(studyDesign: NOSStudyDesign): NOSItem[] {
  return studyDesign === "cohort" ? NOS_COHORT_ITEMS : NOS_CASE_CONTROL_ITEMS;
}

export function computeQualityRating(totalStars: number): NOSQualityRating {
  if (totalStars >= 7) return "good";
  if (totalStars >= 4) return "fair";
  return "poor";
}

export function scoreNOSAssessment(
  paperId: string,
  studyDesign: NOSStudyDesign,
  items: NOSItemResult[],
  overallRationale: string = ""
): NOSAssessment {
  const selectionScore = items
    .filter((item) => item.category === "selection")
    .reduce((sum, item) => sum + item.starsAwarded, 0);
  const selectionMax = items
    .filter((item) => item.category === "selection")
    .reduce((sum, item) => sum + item.maxStars, 0);

  const comparabilityScore = items
    .filter((item) => item.category === "comparability")
    .reduce((sum, item) => sum + item.starsAwarded, 0);
  const comparabilityMax = items
    .filter((item) => item.category === "comparability")
    .reduce((sum, item) => sum + item.maxStars, 0);

  const oeCategory = studyDesign === "cohort" ? "outcome" : "exposure";
  const oeScore = items
    .filter((item) => item.category === oeCategory)
    .reduce((sum, item) => sum + item.starsAwarded, 0);
  const oeMax = items
    .filter((item) => item.category === oeCategory)
    .reduce((sum, item) => sum + item.maxStars, 0);

  const totalStars = selectionScore + comparabilityScore + oeScore;
  const maxStars = selectionMax + comparabilityMax + oeMax;

  return {
    paperId,
    studyDesign,
    items,
    categoryScores: {
      selection: { score: selectionScore, max: selectionMax },
      comparability: { score: comparabilityScore, max: comparabilityMax },
      outcomeOrExposure: { score: oeScore, max: oeMax },
    },
    totalStars,
    maxStars,
    qualityRating: computeQualityRating(totalStars),
    overallRationale,
  };
}

export function exportNOSSummaryCSV(assessments: NOSAssessment[]): string {
  const headers = [
    "Paper ID",
    "Study Design",
    "Selection (max 4)",
    "Comparability (max 2)",
    "Outcome/Exposure (max 3)",
    "Total Stars",
    "Quality Rating",
  ];

  const rows = assessments.map((a) => [
    a.paperId,
    a.studyDesign,
    `${a.categoryScores.selection.score}`,
    `${a.categoryScores.comparability.score}`,
    `${a.categoryScores.outcomeOrExposure.score}`,
    `${a.totalStars}`,
    a.qualityRating,
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

export function generateStarDisplay(assessment: NOSAssessment): string {
  const filled = "★".repeat(assessment.totalStars);
  const empty = "☆".repeat(assessment.maxStars - assessment.totalStars);
  return `${filled}${empty} (${assessment.totalStars}/${assessment.maxStars})`;
}
