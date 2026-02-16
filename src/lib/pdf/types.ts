// ============================================================
// PDF Viewer & Annotation Types
// Chat with PDF system for ScholarSync
// ============================================================

/** Text selection captured from the PDF viewer */
export interface PDFTextSelection {
  text: string;
  pageNumber: number;
  rects: Array<{
    x: number; // percentage of page width (0-100)
    y: number; // percentage of page height (0-100)
    width: number;
    height: number;
  }>;
  startOffset: number;
  endOffset: number;
}

/** Highlight color options with semantic defaults */
export type HighlightColor = "yellow" | "green" | "blue" | "pink" | "orange";

/** Persistent highlight stored in the database */
export interface PDFHighlight {
  id: string;
  projectId: string;
  paperId: string;
  pageNumber: number;
  rects: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
  selectedText: string;
  startOffset: number;
  endOffset: number;
  color: HighlightColor;
  note?: string;
  targetSection?: TargetSection;
  createdAt: Date;
  updatedAt: Date;
}

/** Sections for evidence note targeting */
export type TargetSection =
  | "introduction"
  | "background"
  | "methods"
  | "results"
  | "discussion"
  | "general";

/** Evidence note created from PDF reading */
export interface EvidenceNote {
  id: string;
  projectId: string;
  paperId: string;
  pageNumber: number;
  startOffset: number;
  endOffset: number;
  quotedText: string;
  userNote: string;
  targetSection: TargetSection;
  createdAt: Date;
  color: HighlightColor;
}

/** Source quote backing an AI claim */
export interface SourceQuote {
  id: string;
  paperId: string;
  pageNumber: number;
  sectionName?: string;
  startOffset: number;
  endOffset: number;
  quotedText: string;
  usedIn: Array<{
    type: "ai_summary" | "ai_chat" | "extraction" | "user_note";
    referenceId?: string;
  }>;
}

/** Paper metadata for display in the PDF viewer */
export interface PaperMetadata {
  id: string;
  title: string;
  authors: string[];
  journal?: string;
  year?: number;
  doi?: string;
  pmid?: string;
  abstract?: string;
}

/** Navigation target for scrolling to a specific location */
export interface NavigationTarget {
  pageNumber: number;
  highlightSpan?: {
    startOffset: number;
    endOffset: number;
  };
}

/** Layout configuration for the PDF viewer panel */
export type PDFViewerLayout = "pdf-editor" | "pdf-chat" | "pdf-chat-editor";

/** Chat message in the PDF chat panel */
export interface PDFChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sourceQuotes?: SourceQuote[];
  createdAt: Date;
}

/** Extended citation metadata for PDF navigation */
export interface CitationSourceQuote {
  pageNumber?: number;
  sectionName?: string;
  quotedText?: string;
  startOffset?: number;
  endOffset?: number;
}

/** Highlight color CSS mapping */
export const HIGHLIGHT_COLOR_MAP: Record<HighlightColor, string> = {
  yellow: "bg-yellow-300/40",
  green: "bg-green-300/40",
  blue: "bg-blue-300/40",
  pink: "bg-pink-300/40",
  orange: "bg-orange-300/40",
} as const;

/** Highlight color labels for semantic use */
export const HIGHLIGHT_COLOR_LABELS: Record<HighlightColor, string> = {
  yellow: "General",
  green: "Supporting evidence",
  blue: "Methods / procedures",
  pink: "Limitations / concerns",
  orange: "Key statistics",
} as const;

/** Target section options for evidence notes */
export const TARGET_SECTION_OPTIONS: Array<{
  value: TargetSection;
  label: string;
}> = [
  { value: "introduction", label: "Introduction" },
  { value: "background", label: "Background" },
  { value: "methods", label: "Methods" },
  { value: "results", label: "Results" },
  { value: "discussion", label: "Discussion" },
  { value: "general", label: "General" },
];
