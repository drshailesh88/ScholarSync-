/**
 * Types for the Deep Research engine.
 *
 * Defines the core type system for multi-perspective deep research,
 * including research modes, configuration, exploration trees, synthesis reports,
 * and the enhanced types for the multi-pass synthesis pipeline.
 */

import type { UnifiedSearchResult } from "@/types/search";

// ── Research Modes ──────────────────────────────────────────────────

export type ResearchMode = "quick" | "standard" | "deep" | "exhaustive";

export interface ResearchModeConfig {
  label: string;
  depth: number;
  breadth: number;
  maxSources: number;
  perSourceLimit: number;
  estimatedMinutes: string;
}

export const RESEARCH_MODES: Record<ResearchMode, ResearchModeConfig> = {
  quick: { label: "Quick Scan", depth: 1, breadth: 2, maxSources: 15, perSourceLimit: 10, estimatedMinutes: "1-2" },
  standard: { label: "Standard", depth: 2, breadth: 3, maxSources: 30, perSourceLimit: 15, estimatedMinutes: "3-5" },
  deep: { label: "Deep Dive", depth: 3, breadth: 5, maxSources: 60, perSourceLimit: 20, estimatedMinutes: "8-12" },
  exhaustive: { label: "Exhaustive", depth: 4, breadth: 7, maxSources: 100, perSourceLimit: 25, estimatedMinutes: "15-25" },
};

// ── Research Config ─────────────────────────────────────────────────

export interface ResearchConfig {
  mode: ResearchMode;
  depth: number;
  breadth: number;
  maxSources: number;
  perSourceLimit: number;
  yearStart?: number;
  yearEnd?: number;
  studyTypes?: string[];
  openAccessOnly?: boolean;
}

export function buildConfig(
  mode: ResearchMode,
  overrides?: Partial<ResearchConfig>
): ResearchConfig {
  const defaults = RESEARCH_MODES[mode];
  return {
    mode,
    depth: overrides?.depth ?? defaults.depth,
    breadth: overrides?.breadth ?? defaults.breadth,
    maxSources: overrides?.maxSources ?? defaults.maxSources,
    perSourceLimit: overrides?.perSourceLimit ?? defaults.perSourceLimit,
    yearStart: overrides?.yearStart,
    yearEnd: overrides?.yearEnd,
    studyTypes: overrides?.studyTypes,
    openAccessOnly: overrides?.openAccessOnly,
  };
}

// ── Perspectives ────────────────────────────────────────────────────

export interface Perspective {
  id: string;
  name: string;
  description: string;
  searchQueries: string[];
  expectedPaperTypes: string[];
}

// ── Exploration Tree ────────────────────────────────────────────────

export interface ExplorationNode {
  id: string;
  query: string;
  perspectiveId: string;
  depth: number;
  status: "pending" | "searching" | "complete" | "failed";
  results: UnifiedSearchResult[];
  children: ExplorationNode[];
}

export interface ExplorationTree {
  topic: string;
  root: ExplorationNode;
  totalNodes: number;
}

// ── Research Progress ───────────────────────────────────────────────

export type ResearchStage =
  | "validating"
  | "generating-perspectives"
  | "building-tree"
  | "searching"
  | "search-round-2"
  | "search-round-3"
  | "citation-traversal"
  | "unpaywall-lookup"
  | "full-text-extraction"
  | "data-extraction"
  | "deduplicating"
  | "synthesizing"
  | "synthesis-perspectives"
  | "synthesis-summary"
  | "synthesis-tables"
  | "synthesis-critique"
  | "complete"
  | "error";

export type EnhancedResearchStage = ResearchStage;

export interface ResearchProgress {
  stage: ResearchStage;
  message: string;
  progress?: number;
  currentPerspective?: string;
  papersFound?: number;
}

// ── Progress Callbacks ──────────────────────────────────────────────

export type ResearchProgressCallback = (stage: ResearchStage, message: string) => void;
export type SynthesisProgressCallback = (stage: string, message: string) => void;

// ── Extracted Paper Data ────────────────────────────────────────────

export interface ExtractedPaperData {
  paperId: string;
  studyDesign?: string;
  sampleSize?: number;
  effectSizes?: string[];
  pValues?: string[];
  populationCharacteristics?: string;
  followUpDuration?: string;
  keyFindings?: string[];
}

// ── Enhanced Paper ──────────────────────────────────────────────────

export interface EnhancedPaper extends UnifiedSearchResult {
  extractedData?: ExtractedPaperData;
  fullText?: string;
  fullTextUrl?: string;
  perspectiveIds: string[];
}

// ── Synthesis Report (base — backward-compatible) ───────────────────

export interface SynthesisReport {
  topic: string;
  mode: ResearchMode;
  summary: string;
  keyFindings: string[];
  perspectives: Array<{
    name: string;
    findings: string;
    sourceCount: number;
  }>;
  gaps: string[];
  contradictions: string[];
  totalSources: number;
  sources: UnifiedSearchResult[];
}

// ── Enhanced Synthesis Types ────────────────────────────────────────

export interface PerspectiveSection {
  perspectiveId: string;
  perspectiveName: string;
  markdownContent: string;
  papersUsed: string[];
  sourceCount: number;
}

export interface EnhancedSynthesisReport extends SynthesisReport {
  markdownReport: string;
  perspectiveSections: PerspectiveSection[];
  executiveSummary: string;
  tablesSection: string;
  gapsAnalysis: string;
  contradictionsAnalysis: string;
  conclusions: string;
}

// ── Deep Research Result ────────────────────────────────────────────

export interface DeepResearchResult {
  report: EnhancedSynthesisReport;
  sources: EnhancedPaper[];
  searchRounds: number;
  citationTraversalPapers: number;
  extractedDataCount: number;
  durationMs: number;
}

// ── Session (matches DB schema) ─────────────────────────────────────

export interface DeepResearchSession {
  id: number;
  userId: string;
  projectId?: number;
  originalQuery: string;
  status: "planning" | "searching" | "synthesizing" | "complete" | "failed";
  totalSteps: number;
  completedSteps: number;
  papersFound: number;
  finalReport?: string;
  keyFindings?: string[];
  gaps?: string[];
}
