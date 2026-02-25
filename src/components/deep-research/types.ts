/**
 * Types for the Deep Research feature.
 */

// ── Source type for deep research papers ────────────────────────────
export interface ExtractedDataSummary {
  studyDesign?: string;
  sampleSize?: number;
  effectSizes?: string[];
  pValues?: string[];
  populationCharacteristics?: string;
  followUpDuration?: string;
  keyFindings?: string[];
}

export interface DeepResearchSource {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  year: number;
  journal: string;
  doi: string;
  pmid: string;
  citationCount: number;
  source: string;
  isOpenAccess: boolean;
  pdfUrl?: string;
  semanticScholarId?: string;
  studyType?: string;
  evidenceLevel?: string;
  extractedData?: ExtractedDataSummary;
}

/**
 * Derive an evidence level from study design string.
 * Returns: "high" | "moderate" | "low" | "unknown"
 */
export function getEvidenceLevel(source: DeepResearchSource): "high" | "moderate" | "low" | "unknown" {
  const design = (
    source.extractedData?.studyDesign ||
    source.studyType ||
    source.evidenceLevel ||
    ""
  ).toLowerCase();

  if (
    design.includes("meta-analysis") ||
    design.includes("systematic review") ||
    design.includes("rct") ||
    design.includes("randomized") ||
    design.includes("randomised")
  ) {
    return "high";
  }

  if (
    design.includes("cohort") ||
    design.includes("case-control") ||
    design.includes("case control") ||
    design.includes("observational") ||
    design.includes("cross-sectional") ||
    design.includes("prospective") ||
    design.includes("retrospective")
  ) {
    return "moderate";
  }

  if (
    design.includes("case series") ||
    design.includes("case report") ||
    design.includes("expert") ||
    design.includes("opinion") ||
    design.includes("editorial") ||
    design.includes("narrative review") ||
    design.includes("letter")
  ) {
    return "low";
  }

  return "unknown";
}

// ── Perspective in synthesis report ─────────────────────────────────
export interface Perspective {
  name: string;
  findings: string;
  sourceCount: number;
}

// ── Legacy SynthesisReport format (backward compat) ─────────────────
export interface SynthesisReport {
  topic: string;
  mode: string;
  summary: string;
  keyFindings: string[];
  perspectives: Perspective[];
  gaps: string[];
  contradictions: string[];
  totalSources: number;
  sources: DeepResearchSource[];
}

// ── Enhanced report with flowing markdown ───────────────────────────
export interface EnhancedSynthesisReport extends SynthesisReport {
  markdownReport: string;
}

// ── Research mode options ───────────────────────────────────────────
export type ResearchMode = "quick" | "standard" | "deep" | "exhaustive";

export interface ResearchModeOption {
  id: ResearchMode;
  label: string;
  description: string;
  icon: string;
  estimatedTime: string;
}

export const RESEARCH_MODES: ResearchModeOption[] = [
  {
    id: "quick",
    label: "Quick",
    description: "Fast overview with key papers",
    icon: "Zap",
    estimatedTime: "~1 min",
  },
  {
    id: "standard",
    label: "Standard",
    description: "Balanced breadth and depth",
    icon: "Search",
    estimatedTime: "~3 min",
  },
  {
    id: "deep",
    label: "Deep",
    description: "Thorough multi-perspective analysis",
    icon: "Layers",
    estimatedTime: "~5 min",
  },
  {
    id: "exhaustive",
    label: "Exhaustive",
    description: "Comprehensive with citation traversal",
    icon: "Database",
    estimatedTime: "~10 min",
  },
];

// ── Progress stages ─────────────────────────────────────────────────
export interface ProgressStage {
  id: string;
  label: string;
  status: "pending" | "active" | "completed" | "error";
}

export const STAGE_LABELS: Record<string, string> = {
  "search-round-1": "Searching papers...",
  "citation-traversal": "Traversing citation graph...",
  "search-round-2": "Expanding search...",
  "full-text-extraction": "Reading full-text PDFs...",
  "data-extraction": "Extracting data from papers...",
  "synthesis-perspectives": "Analyzing perspectives...",
  "synthesis-summary": "Writing executive summary...",
  "synthesis-tables": "Generating tables...",
  "synthesis-critique": "Self-critique and revision...",
};

// ── SSE event types ─────────────────────────────────────────────────
export type SSEEventType =
  | "progress"
  | "perspectives"
  | "section"
  | "report"
  | "error";

export interface SSEProgressEvent {
  type: "progress";
  stage: string;
  message: string;
  progress: number;
}

export interface SSEPerspectivesEvent {
  type: "perspectives";
  perspectives: Array<{
    name: string;
    queries: string[];
  }>;
}

export interface SSESectionEvent {
  type: "section";
  markdown: string;
}

export interface SSEReportEvent {
  type: "report";
  report: EnhancedSynthesisReport | SynthesisReport;
}

export interface SSEErrorEvent {
  type: "error";
  error: string;
}

export type SSEEvent =
  | SSEProgressEvent
  | SSEPerspectivesEvent
  | SSESectionEvent
  | SSEReportEvent
  | SSEErrorEvent;

// ── Research plan perspective ───────────────────────────────────────
export interface PlanPerspective {
  name: string;
  queries: string[];
}
