// ============================================================================
// Presentation Types — Content Block union, Theme config, AI interfaces
// ============================================================================

// ---------------------------------------------------------------------------
// Content Blocks (stored as jsonb in slides.content_blocks)
// ---------------------------------------------------------------------------
export type ContentBlock =
  | { type: "text"; data: { text: string; style?: "title" | "subtitle" | "body" | "caption" } }
  | { type: "bullets"; data: { items: string[]; ordered?: boolean } }
  | { type: "image"; data: { url?: string; alt: string; caption?: string; suggestion?: string } }
  | { type: "chart"; data: { chartType: "bar" | "line" | "pie"; title: string; labels: string[]; datasets: { label: string; data: number[] }[] } }
  | { type: "table"; data: { headers: string[]; rows: string[][] } }
  | { type: "citation"; data: { text: string; source: string; paperId?: number } }
  | { type: "quote"; data: { text: string; attribution: string } };

// ---------------------------------------------------------------------------
// Theme Config (stored as jsonb in slide_decks.theme_config)
// ---------------------------------------------------------------------------
export interface ThemeConfig {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily?: string;
  headingFontFamily?: string;
}

export const PRESET_THEMES: Record<string, ThemeConfig> = {
  modern: {
    name: "Modern",
    primaryColor: "#4F46E5",
    secondaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    textColor: "#1F2937",
    accentColor: "#06B6D4",
    fontFamily: "Inter, sans-serif",
    headingFontFamily: "Inter, sans-serif",
  },
  dark: {
    name: "Dark",
    primaryColor: "#3B82F6",
    secondaryColor: "#8B5CF6",
    backgroundColor: "#0F172A",
    textColor: "#F8FAFC",
    accentColor: "#22D3EE",
    fontFamily: "Inter, sans-serif",
    headingFontFamily: "Inter, sans-serif",
  },
  thesis: {
    name: "Thesis",
    primaryColor: "#1E3A5F",
    secondaryColor: "#44403C",
    backgroundColor: "#FAFAF9",
    textColor: "#1C1917",
    accentColor: "#B45309",
    fontFamily: "Georgia, serif",
    headingFontFamily: "Georgia, serif",
  },
  vibrant: {
    name: "Vibrant",
    primaryColor: "#0EA5E9",
    secondaryColor: "#F97316",
    backgroundColor: "#FFFFFF",
    textColor: "#0F172A",
    accentColor: "#10B981",
    fontFamily: "Inter, sans-serif",
    headingFontFamily: "Inter, sans-serif",
  },
  academic: {
    name: "Academic",
    primaryColor: "#1D4ED8",
    secondaryColor: "#9333EA",
    backgroundColor: "#FFFFFF",
    textColor: "#111827",
    accentColor: "#DC2626",
    fontFamily: "Times New Roman, serif",
    headingFontFamily: "Arial, sans-serif",
  },
  minimal: {
    name: "Minimal",
    primaryColor: "#18181B",
    secondaryColor: "#71717A",
    backgroundColor: "#FFFFFF",
    textColor: "#18181B",
    accentColor: "#3B82F6",
    fontFamily: "Inter, sans-serif",
    headingFontFamily: "Inter, sans-serif",
  },
  nature: {
    name: "Nature",
    primaryColor: "#166534",
    secondaryColor: "#15803D",
    backgroundColor: "#F0FDF4",
    textColor: "#14532D",
    accentColor: "#CA8A04",
    fontFamily: "Inter, sans-serif",
    headingFontFamily: "Inter, sans-serif",
  },
  clinical: {
    name: "Clinical",
    primaryColor: "#0369A1",
    secondaryColor: "#0891B2",
    backgroundColor: "#F0F9FF",
    textColor: "#0C4A6E",
    accentColor: "#E11D48",
    fontFamily: "Helvetica, Arial, sans-serif",
    headingFontFamily: "Helvetica, Arial, sans-serif",
  },
};

// ---------------------------------------------------------------------------
// Slide Layout definitions
// ---------------------------------------------------------------------------
export type SlideLayout =
  | "title_slide"
  | "title_content"
  | "two_column"
  | "section_header"
  | "image_text"
  | "chart_slide"
  | "table_slide"
  | "quote_slide"
  | "comparison"
  | "blank";

export type AudienceType = "thesis_defense" | "conference" | "journal_club" | "classroom" | "general";
export type GenerationStatus = "pending" | "processing" | "completed" | "failed";

// ---------------------------------------------------------------------------
// Coach Evaluation
// ---------------------------------------------------------------------------
export interface CoachEvaluation {
  structureScore: number;
  evidenceScore: number;
  narrativeScore: number;
  designScore: number;
  audienceFitScore: number;
  overallScore: number;
  slideInsights: SlideInsight[];
  suggestions: CoachSuggestion[];
}

export interface SlideInsight {
  slideIndex: number;
  slideTitle: string;
  issues: string[];
  strengths: string[];
}

export interface CoachSuggestion {
  category: "structure" | "evidence" | "narrative" | "design" | "audience";
  priority: "high" | "medium" | "low";
  text: string;
  slideIndex?: number;
  autoFixAvailable?: boolean;
}

// ---------------------------------------------------------------------------
// AI Generation Interfaces
// ---------------------------------------------------------------------------
export interface GenerateRequest {
  sourceType: "papers" | "document" | "text" | "thesis";
  paperIds?: number[];
  documentId?: number;
  rawText?: string;
  audienceType: AudienceType;
  slideCount?: number;
  additionalInstructions?: string;
  themeKey?: string;
}

export interface GenerateResponse {
  deckId: number;
  slides: GeneratedSlide[];
}

export interface GeneratedSlide {
  layout: SlideLayout;
  title: string;
  subtitle?: string;
  contentBlocks: ContentBlock[];
  speakerNotes: string;
}

export interface PreprocessedData {
  title: string;
  sections: PreprocessedSection[];
  keyFindings: string[];
  statistics: { label: string; value: string }[];
  chartData: ContentBlock[];
}

export interface PreprocessedSection {
  heading: string;
  summary: string;
  keyPoints: string[];
  citations: string[];
}

// ---------------------------------------------------------------------------
// Per-Slide AI Edit Actions
// ---------------------------------------------------------------------------
export type SlideEditAction =
  | "shorten"
  | "expand"
  | "rephrase"
  | "suggest_image"
  | "add_citations"
  | "improve_bullets"
  | "regenerate";

export interface SlideEditRequest {
  slideId: number;
  action: SlideEditAction;
  additionalContext?: string;
}

export interface SlideEditResponse {
  contentBlocks: ContentBlock[];
  speakerNotes?: string;
}
