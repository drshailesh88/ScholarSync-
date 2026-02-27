// ============================================================================
// Poster Types — Academic conference poster generation system
// Reuses ContentBlock, ThemeConfig, InstitutionKit from presentation.ts
// ============================================================================

import type { ContentBlock, ThemeConfig, InstitutionKit } from "./presentation";

// ---------------------------------------------------------------------------
// Poster Sizes — standard academic conference poster dimensions
// ---------------------------------------------------------------------------

export type PosterSize =
  | "a0_portrait"
  | "a0_landscape"
  | "a1_portrait"
  | "a1_landscape"
  | "48x36"
  | "36x24";

export const POSTER_SIZES: Record<
  PosterSize,
  { width: number; height: number; unit: string; label: string; pdfPoints: { width: number; height: number } }
> = {
  a0_portrait: {
    width: 841,
    height: 1189,
    unit: "mm",
    label: "A0 Portrait (841 x 1189 mm)",
    pdfPoints: { width: 2384, height: 3370 },
  },
  a0_landscape: {
    width: 1189,
    height: 841,
    unit: "mm",
    label: "A0 Landscape (1189 x 841 mm)",
    pdfPoints: { width: 3370, height: 2384 },
  },
  a1_portrait: {
    width: 594,
    height: 841,
    unit: "mm",
    label: "A1 Portrait (594 x 841 mm)",
    pdfPoints: { width: 1684, height: 2384 },
  },
  a1_landscape: {
    width: 841,
    height: 594,
    unit: "mm",
    label: "A1 Landscape (841 x 594 mm)",
    pdfPoints: { width: 2384, height: 1684 },
  },
  "48x36": {
    width: 48,
    height: 36,
    unit: "in",
    label: "48 x 36 inches (US Standard)",
    pdfPoints: { width: 3456, height: 2592 },
  },
  "36x24": {
    width: 36,
    height: 24,
    unit: "in",
    label: "36 x 24 inches (Small)",
    pdfPoints: { width: 2592, height: 1728 },
  },
};

// ---------------------------------------------------------------------------
// Poster Grid Layouts
// ---------------------------------------------------------------------------

export type PosterGridLayout =
  | "three_column"
  | "two_column_wide"
  | "four_column"
  | "two_plus_one";

export const POSTER_GRID_LAYOUTS: Record<
  PosterGridLayout,
  { label: string; columns: number; description: string }
> = {
  three_column: {
    label: "Three Column",
    columns: 3,
    description: "Classic 3-column academic poster layout",
  },
  two_column_wide: {
    label: "Two Column (Wide)",
    columns: 2,
    description: "Two wide columns for text-heavy posters",
  },
  four_column: {
    label: "Four Column",
    columns: 4,
    description: "Four narrow columns for data-dense posters",
  },
  two_plus_one: {
    label: "2 + 1 Split",
    columns: 3,
    description: "Two narrow columns + one wide results column",
  },
};

// ---------------------------------------------------------------------------
// Poster Section — a content region within the poster grid
// ---------------------------------------------------------------------------

export interface PosterSection {
  id: string;
  title: string;
  column: number;
  row: number;
  colSpan?: number;
  contentBlocks: ContentBlock[];
}

// ---------------------------------------------------------------------------
// PosterData — full poster state
// ---------------------------------------------------------------------------

export interface PosterData {
  id: string;
  deckId: number;
  title: string;
  authors: string[];
  affiliations: string[];
  size: PosterSize;
  gridLayout: PosterGridLayout;
  sections: PosterSection[];
  themeConfig: ThemeConfig;
  institutionKit?: InstitutionKit;
  qrCodeUrl?: string;
}

// ---------------------------------------------------------------------------
// Poster Templates
// ---------------------------------------------------------------------------

export interface PosterTemplateSection {
  title: string;
  column: number;
  row: number;
  colSpan?: number;
  guidance: string;
}

export interface PosterTemplate {
  name: string;
  description: string;
  gridLayout: PosterGridLayout;
  sections: PosterTemplateSection[];
}

export const POSTER_TEMPLATES: Record<string, PosterTemplate> = {
  clinical_research: {
    name: "Clinical Research",
    description: "Standard IMRAD poster for clinical studies with emphasis on results",
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, institutional logos" },
      { title: "Introduction", column: 0, row: 1, guidance: "Background, significance, and rationale (3-5 sentences)" },
      { title: "Objectives", column: 0, row: 2, guidance: "Primary and secondary objectives as numbered list" },
      { title: "Methods", column: 0, row: 3, guidance: "Study design, population, setting, interventions, analysis" },
      { title: "Results", column: 1, row: 1, colSpan: 2, guidance: "Key findings with charts, tables, and statistical results" },
      { title: "Discussion", column: 1, row: 2, guidance: "Interpretation, comparison with prior work, clinical significance" },
      { title: "Conclusions", column: 2, row: 2, guidance: "3-5 bullet points of take-home messages" },
      { title: "References", column: 1, row: 3, guidance: "Key references in Vancouver style" },
      { title: "Acknowledgments", column: 2, row: 3, guidance: "Funding, conflicts of interest, QR code" },
    ],
  },
  basic_science: {
    name: "Basic Science",
    description: "Lab research poster with detailed methodology and data visualization",
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, affiliations, lab logo" },
      { title: "Background", column: 0, row: 1, guidance: "Scientific context and knowledge gap" },
      { title: "Hypothesis", column: 0, row: 2, guidance: "Research hypothesis and specific aims" },
      { title: "Materials & Methods", column: 0, row: 3, guidance: "Experimental design, reagents, protocols, analysis" },
      { title: "Results", column: 1, row: 1, colSpan: 2, guidance: "Figures, quantification, statistical analysis" },
      { title: "Discussion", column: 1, row: 2, guidance: "Interpretation, mechanism, limitations" },
      { title: "Conclusions & Future Directions", column: 2, row: 2, guidance: "Summary and planned next experiments" },
      { title: "References", column: 1, row: 3, guidance: "Key references" },
      { title: "Acknowledgments", column: 2, row: 3, guidance: "Funding sources, contributors" },
    ],
  },
  systematic_review: {
    name: "Systematic Review",
    description: "PRISMA-compliant poster for systematic reviews and meta-analyses",
    gridLayout: "three_column",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 3, guidance: "Title, authors, PROSPERO registration number" },
      { title: "Background", column: 0, row: 1, guidance: "Clinical question, rationale for the review" },
      { title: "Methods", column: 0, row: 2, guidance: "Search strategy, databases, inclusion/exclusion criteria" },
      { title: "PRISMA Flow", column: 0, row: 3, guidance: "PRISMA flow diagram showing study selection" },
      { title: "Results", column: 1, row: 1, colSpan: 2, guidance: "Forest plots, pooled estimates, heterogeneity statistics" },
      { title: "Risk of Bias", column: 1, row: 2, guidance: "Risk of bias assessment summary" },
      { title: "Conclusions", column: 2, row: 2, guidance: "Key findings, GRADE certainty, clinical implications" },
      { title: "References", column: 1, row: 3, guidance: "Key references from included studies" },
      { title: "Acknowledgments", column: 2, row: 3, guidance: "Funding, QR code to full publication" },
    ],
  },
  engineering: {
    name: "Engineering / CS",
    description: "Technical poster for engineering and computer science research",
    gridLayout: "two_column_wide",
    sections: [
      { title: "Title", column: 0, row: 0, colSpan: 2, guidance: "Title, authors, affiliations, lab/group logos" },
      { title: "Problem Statement", column: 0, row: 1, guidance: "Problem definition, motivation, current limitations" },
      { title: "Proposed Approach", column: 0, row: 2, guidance: "Architecture, algorithm, or system design with diagrams" },
      { title: "Implementation", column: 0, row: 3, guidance: "Technical details, code snippets, tools used" },
      { title: "Results & Evaluation", column: 1, row: 1, guidance: "Benchmarks, performance charts, comparison tables" },
      { title: "Analysis", column: 1, row: 2, guidance: "Discussion of results, ablation studies, limitations" },
      { title: "Conclusions & Future Work", column: 1, row: 3, guidance: "Summary, contributions, planned extensions" },
      { title: "References", column: 0, row: 4, guidance: "Key citations" },
      { title: "Acknowledgments", column: 1, row: 4, guidance: "Funding, acknowledgments, QR code to repo/paper" },
    ],
  },
};
