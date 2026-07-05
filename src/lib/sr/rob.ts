import type {
  Candidate,
  RobDomainAssessment,
  RobJudgment,
  SrReview,
} from "./types";

export interface Rob2Domain {
  id: string;
  /** Display number + name, e.g. "1 · Randomisation process". */
  name: string;
  signalling: string[];
}

/** The five RoB 2 domains (Cochrane Risk of Bias 2 for randomised trials). */
export const ROB2_DOMAINS: Rob2Domain[] = [
  {
    id: "randomisation",
    name: "1 · Randomisation process",
    signalling: [
      "Was the allocation sequence random?",
      "Was the allocation sequence concealed?",
      "Did baseline differences suggest a problem with randomisation?",
    ],
  },
  {
    id: "deviations",
    name: "2 · Deviations from intended intervention",
    signalling: [
      "Were participants aware of their assigned intervention?",
      "Were carers and people delivering the intervention aware of assignment?",
      "Was an appropriate analysis used to estimate the effect of assignment?",
    ],
  },
  {
    id: "missing",
    name: "3 · Missing outcome data",
    signalling: [
      "Were data available for all, or nearly all, randomised participants?",
      "Is there evidence the result was not biased by missing data?",
    ],
  },
  {
    id: "measurement",
    name: "4 · Measurement of the outcome",
    signalling: [
      "Was the method of measuring the outcome appropriate?",
      "Could measurement have differed between intervention groups?",
      "Were outcome assessors aware of the intervention received?",
    ],
  },
  {
    id: "selection",
    name: "5 · Selection of the reported result",
    signalling: [
      "Were the data analysed in accordance with a pre-specified plan?",
      "Was the reported result selected from multiple measurements?",
      "Was the reported result selected from multiple analyses?",
    ],
  },
];

/**
 * RoB 2 overall judgment: Low only if every domain is Low; High if any domain
 * is High; otherwise Some concerns (an unassessed domain is at least Some
 * concerns, never Low).
 */
export function overallRobJudgment(
  domainJudgments: Array<RobJudgment | undefined>,
): RobJudgment {
  if (domainJudgments.some((j) => j === "high")) return "high";
  if (domainJudgments.every((j) => j === "low")) return "low";
  return "some_concerns";
}

export const ROB_JUDGMENT_LABEL: Record<RobJudgment, string> = {
  low: "Low",
  some_concerns: "Some concerns",
  high: "High",
};

/** design.md functional colour token for a RoB judgment. */
export const ROB_JUDGMENT_TOKEN: Record<RobJudgment, string> = {
  low: "var(--inc)",
  some_concerns: "var(--may)",
  high: "var(--exc)",
};

export interface RobStudy {
  candidate: Candidate;
  /** Trial short name shown in the study list (e.g. "EMPEROR-Preserved"). */
  label: string;
  /** First author + year, e.g. "Anker 2021". */
  sublabel: string;
  domains: RobDomainAssessment[];
  overall: RobJudgment;
}

const TRIAL_LABELS: Record<number, string> = {
  2241: "EMPEROR-Preserved",
  1660: "DAPA-HF",
  1904: "DELIVER",
  2310: "Meta-analysis",
};

function sublabelFor(candidate: Candidate): string {
  const surname = candidate.authors[0]?.split(" ")[0] ?? "";
  return candidate.year ? `${surname} ${candidate.year}` : surname;
}

/** Studies with a RoB 2 assessment, joined to their candidate + overall. */
export function deriveRobStudyList(review: SrReview): RobStudy[] {
  const byId = new Map(review.candidates.map((c) => [c.id, c]));
  return review.robAssessments
    .map((assessment) => {
      const candidate = byId.get(assessment.candidateId);
      if (!candidate) return null;
      return {
        candidate,
        label: TRIAL_LABELS[candidate.refId] ?? candidate.title,
        sublabel: sublabelFor(candidate),
        domains: assessment.domains,
        overall: overallRobJudgment(
          assessment.domains.map((domain) => domain.judgment),
        ),
      };
    })
    .filter((study): study is RobStudy => study !== null);
}
