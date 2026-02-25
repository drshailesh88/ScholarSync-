/**
 * Types for the Deep Research feature.
 */

// ── Source type for deep research papers ────────────────────────────
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
