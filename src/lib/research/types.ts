/**
 * Shared types for the Deep Research & Literature Discovery system.
 *
 * Extends the existing UnifiedSearchResult from src/types/search.ts
 * with research-specific metadata for the sidebar, evidence tables,
 * verification, and synthesis features.
 */

import type { UnifiedSearchResult } from "@/types/search";

// ── Study Types ──────────────────────────────────────────────────────

export type StudyType =
  | "rct"
  | "systematic_review"
  | "meta_analysis"
  | "cohort"
  | "case_control"
  | "cross_sectional"
  | "case_report"
  | "case_series"
  | "clinical_trial"
  | "guideline"
  | "narrative_review"
  | "other";

export const STUDY_TYPE_LABELS: Record<StudyType, string> = {
  rct: "RCT",
  systematic_review: "SR",
  meta_analysis: "MA",
  cohort: "Cohort",
  case_control: "CC",
  cross_sectional: "XS",
  case_report: "Case",
  case_series: "Series",
  clinical_trial: "Trial",
  guideline: "Guide",
  narrative_review: "Review",
  other: "Other",
};

export const STUDY_TYPE_COLORS: Record<StudyType, string> = {
  rct: "text-blue-400 bg-blue-500/10",
  systematic_review: "text-emerald-400 bg-emerald-500/10",
  meta_analysis: "text-emerald-400 bg-emerald-500/10",
  cohort: "text-slate-400 bg-slate-500/10",
  case_control: "text-slate-400 bg-slate-500/10",
  cross_sectional: "text-slate-400 bg-slate-500/10",
  case_report: "text-slate-400 bg-slate-500/10",
  case_series: "text-slate-400 bg-slate-500/10",
  clinical_trial: "text-blue-400 bg-blue-500/10",
  guideline: "text-violet-400 bg-violet-500/10",
  narrative_review: "text-amber-400 bg-amber-500/10",
  other: "text-slate-400 bg-slate-500/10",
};

// ── Paper Result ─────────────────────────────────────────────────────

/** Extended paper result used in the research sidebar */
export interface PaperResult extends UnifiedSearchResult {
  /** Internal unique ID (generated client-side) */
  id: string;
  /** Mapped study type */
  studyTypeEnum?: StudyType;
  /** Verification status */
  verificationStatus: "verified" | "partial" | "unverified" | "retracted" | "pending";
  /** Source database tag */
  source: "pubmed" | "semantic_scholar" | "both";
  /** Whether this paper is in the current document's library */
  inLibrary?: boolean;
  /** Number of times cited in the current document */
  citedCount?: number;
  /** User notes for this paper (project-scoped) */
  notes?: string;
}

// ── Search Filters ───────────────────────────────────────────────────

export interface ResearchSearchFilters {
  dateFrom: number;
  dateTo: number;
  studyTypes: StudyType[];
  fullTextOnly: boolean;
  sources: ("pubmed" | "semantic_scholar")[];
  language: "english" | "all";
}

export const DEFAULT_SEARCH_FILTERS: ResearchSearchFilters = {
  dateFrom: new Date().getFullYear() - 10,
  dateTo: new Date().getFullYear(),
  studyTypes: [],
  fullTextOnly: false,
  sources: ["pubmed", "semantic_scholar"],
  language: "english",
};

// ── Search Plan ──────────────────────────────────────────────────────

export interface SearchPlan {
  originalQuery: string;
  pubmedQuery: string;
  meshTerms: string[];
  synonyms: Record<string, string[]>;
  suggestedFilters: {
    dateFrom?: number;
    dateTo?: number;
    studyTypes?: StudyType[];
  };
  estimatedResults: string;
  rationale: string;
}

// ── Paper Detail & Extraction ────────────────────────────────────────

export interface Author {
  name: string;
  firstName?: string;
  lastName?: string;
  affiliation?: string;
}

export interface ExtractionField {
  value: string;
  source: string; // exact quote from text
}

export interface ExtractionResult {
  summary: string;
  summarySourceSentences: string[];
  fields: {
    population?: ExtractionField;
    intervention?: ExtractionField;
    comparator?: ExtractionField;
    primaryOutcome?: ExtractionField;
    effectSize?: ExtractionField;
    sampleSize?: ExtractionField;
    followUp?: ExtractionField;
    studyDesign?: ExtractionField;
    limitations?: ExtractionField;
  };
}

export interface PaperDetail {
  paper: PaperResult;
  extraction?: ExtractionResult;
  isExtracting: boolean;
}

// ── Verification ─────────────────────────────────────────────────────

export interface VerificationResult {
  status: "verified" | "partial" | "unverified" | "retracted";
  pmidVerified: boolean;
  doiVerified: boolean;
  metadataMatches: {
    title: boolean;
    year: boolean;
    journal: boolean;
    authors: boolean;
  };
  retractionNotice?: {
    isRetracted: boolean;
    retractionDate?: string;
    retractionUrl?: string;
    reason?: string;
  };
  details: string;
}

// ── Evidence Table ───────────────────────────────────────────────────

export interface EvidenceColumn {
  id: string;
  name: string;
  extractionInstructions: string;
  width?: number;
}

export interface EvidenceCell {
  value: string;
  sourceQuote: string;
  isManualOverride: boolean;
  confidence: "high" | "medium" | "low";
}

export interface EvidenceRow {
  paperId: string;
  paperTitle: string;
  paperYear: number;
  cells: Record<string, EvidenceCell>;
}

export interface EvidenceTable {
  id: string;
  projectId: string;
  name: string;
  columns: EvidenceColumn[];
  rows: EvidenceRow[];
  createdAt: string;
  updatedAt: string;
}

export const EVIDENCE_TABLE_PRESETS: Record<
  string,
  { name: string; columns: Omit<EvidenceColumn, "id">[] }
> = {
  rct: {
    name: "RCT Evidence Table",
    columns: [
      { name: "Study Design", extractionInstructions: "Identify the study design (e.g., parallel-group RCT, crossover RCT)" },
      { name: "Population (n)", extractionInstructions: "Sample size and population characteristics (age, condition, inclusion criteria)" },
      { name: "Intervention", extractionInstructions: "Main intervention including drug name, dose, and regimen" },
      { name: "Comparator", extractionInstructions: "Control or comparison group treatment" },
      { name: "Primary Outcome", extractionInstructions: "Primary outcome measure as stated" },
      { name: "Effect Size", extractionInstructions: "Effect size with confidence interval (HR, OR, RR, mean difference)" },
      { name: "p-value", extractionInstructions: "p-value for the primary outcome" },
      { name: "Follow-up", extractionInstructions: "Duration of follow-up" },
      { name: "Risk of Bias", extractionInstructions: "Any noted limitations or risk of bias concerns" },
    ],
  },
  systematic_review: {
    name: "Systematic Review Summary",
    columns: [
      { name: "Included Studies", extractionInstructions: "Number and types of included studies" },
      { name: "Total Participants", extractionInstructions: "Total number of participants across all studies" },
      { name: "Quality Assessment", extractionInstructions: "Method and results of quality assessment (GRADE, Newcastle-Ottawa, etc.)" },
      { name: "Main Findings", extractionInstructions: "Key quantitative findings with effect estimates" },
      { name: "Heterogeneity", extractionInstructions: "I-squared and heterogeneity assessment" },
      { name: "Limitations", extractionInstructions: "Key limitations noted by the authors" },
    ],
  },
  drug_safety: {
    name: "Drug Safety",
    columns: [
      { name: "Drug / Dose", extractionInstructions: "Drug name and dosage studied" },
      { name: "Population", extractionInstructions: "Patient population and sample size" },
      { name: "Adverse Events", extractionInstructions: "List all reported adverse events with frequencies/percentages" },
      { name: "Serious AEs", extractionInstructions: "Serious adverse events specifically" },
      { name: "Discontinuation", extractionInstructions: "Rate of treatment discontinuation due to adverse events" },
      { name: "Contraindications", extractionInstructions: "Any noted contraindications" },
    ],
  },
  diagnostic: {
    name: "Diagnostic Accuracy",
    columns: [
      { name: "Test", extractionInstructions: "Diagnostic test or biomarker evaluated" },
      { name: "Reference Standard", extractionInstructions: "Gold standard or reference test used" },
      { name: "Population", extractionInstructions: "Study population and sample size" },
      { name: "Sensitivity", extractionInstructions: "Sensitivity with confidence interval" },
      { name: "Specificity", extractionInstructions: "Specificity with confidence interval" },
      { name: "PPV", extractionInstructions: "Positive predictive value" },
      { name: "NPV", extractionInstructions: "Negative predictive value" },
      { name: "AUC", extractionInstructions: "Area under ROC curve if reported" },
    ],
  },
};

// ── Chat ─────────────────────────────────────────────────────────────

export type ChatScope = "paper" | "selected" | "library";

export interface PaperChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  papersUsed?: { id: string; title: string; firstAuthor: string; year: number; pmid?: string }[];
  timestamp: number;
}

// ── Synthesis ────────────────────────────────────────────────────────

export type SynthesisReportType =
  | "quick_summary"
  | "literature_review"
  | "evidence_summary"
  | "custom";

export interface SynthesisRequest {
  paperIds: string[];
  reportType: SynthesisReportType;
  customInstructions?: string;
  targetWordCount?: number;
}

export interface SynthesisPlan {
  sections: { title: string; description: string }[];
  estimatedWordCount: number;
  papersPerSection: Record<string, string[]>;
}

export interface SynthesisReport {
  id: string;
  content: string; // Markdown with [N] citation markers
  citations: { marker: number; paperId: string }[];
  plan: SynthesisPlan;
  reportType: SynthesisReportType;
  createdAt: string;
}

// ── Parsed Filter (from natural language) ────────────────────────────

export interface ParsedFilter {
  query: string;
  chips: { label: string; type: "studyType" | "dateRange" | "population" | "keyword"; value: string }[];
  filters: Partial<ResearchSearchFilters>;
}
