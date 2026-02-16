// ---------------------------------------------------------------------------
// ScholarSync Guided Mode — Types
// ---------------------------------------------------------------------------

/** The seven document types supported by Guided Mode personas */
export type GuideDocumentType =
  | "case_report"
  | "original_article"
  | "review_article"
  | "meta_analysis"
  | "book_chapter"
  | "academic_draft"
  | "letter";

/** The six-stage pipeline every document type follows */
export type GuideStage =
  | "understand"
  | "plan"
  | "outline"
  | "draft"
  | "revise"
  | "polish";

/** Ordered stages for progression logic */
export const GUIDE_STAGES: GuideStage[] = [
  "understand",
  "plan",
  "outline",
  "draft",
  "revise",
  "polish",
];

/** Human-readable labels for each stage */
export const GUIDE_STAGE_LABELS: Record<GuideStage, string> = {
  understand: "Understand",
  plan: "Plan",
  outline: "Outline",
  draft: "Draft",
  revise: "Revise",
  polish: "Polish",
};

/** Human-readable labels for each document type */
export const GUIDE_DOC_TYPE_LABELS: Record<GuideDocumentType, string> = {
  case_report: "Case Report",
  original_article: "Original Article",
  review_article: "Review Article",
  meta_analysis: "Meta-Analysis",
  book_chapter: "Book Chapter",
  academic_draft: "Academic Draft",
  letter: "Letter / Correspondence",
};

/** Reporting guidelines mapped to document types */
export const REPORTING_GUIDELINES: Record<GuideDocumentType, string[]> = {
  case_report: ["CARE"],
  original_article: ["CONSORT", "STROBE", "STARD", "TRIPOD"],
  review_article: ["PRISMA", "Narrative review best practices"],
  meta_analysis: ["PRISMA 2020", "Cochrane Handbook"],
  book_chapter: [],
  academic_draft: [],
  letter: [],
};

/** Context passed from the UI to the chat API for guide mode */
export interface GuideContext {
  documentType: GuideDocumentType;
  stage: GuideStage;
  targetJournal?: string;
  studyType?: string;
  projectTitle?: string;
  /** Checklist items the user has already completed in the current stage */
  completedChecklist?: string[];
  /** Number of Socratic rounds attempted (for escalation logic) */
  socraticRounds?: number;
}
