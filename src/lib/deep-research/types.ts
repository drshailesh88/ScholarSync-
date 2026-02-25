/**
 * Types for the Deep Research engine.
 *
 * Adapted from CursorWriter2's multi-agent research system.
 * Uses ScholarSync's existing UnifiedSearchResult type.
 */

import type { UnifiedSearchResult } from "@/types/search";

// ── Research modes ──────────────────────────────────────────────────

export type ResearchMode =
  | "quick"
  | "standard"
  | "deep"
  | "exhaustive";

export interface ResearchModeConfig {
  label: string;
  depth: number;
  breadth: number;
  maxSources: number;
  estimatedMinutes: string;
}

export const RESEARCH_MODES: Record<ResearchMode, ResearchModeConfig> = {
  quick: { label: "Quick Scan", depth: 1, breadth: 2, maxSources: 15, estimatedMinutes: "1-2" },
  standard: { label: "Standard", depth: 2, breadth: 3, maxSources: 30, estimatedMinutes: "3-5" },
  deep: { label: "Deep Dive", depth: 3, breadth: 4, maxSources: 60, estimatedMinutes: "8-12" },
  exhaustive: { label: "Exhaustive", depth: 4, breadth: 5, maxSources: 100, estimatedMinutes: "15-25" },
};

// ── Research config ─────────────────────────────────────────────────

export interface ResearchConfig {
  mode: ResearchMode;
  depth: number;
  breadth: number;
  maxSources: number;
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
}

// ── Exploration tree ────────────────────────────────────────────────

export interface ExplorationNode {
  id: string;
  query: string;
  perspectiveId: string;
  depth: number;
  status: "pending" | "searching" | "done" | "failed";
  results: UnifiedSearchResult[];
  followUpQueries: string[];
}

export interface ExplorationTree {
  rootId: string;
  topic: string;
  nodes: Map<string, ExplorationNode>;
  totalNodes: number;
  completedNodes: number;
}

// ── Research progress (SSE events) ──────────────────────────────────

export type ResearchStage =
  | "initialization"
  | "perspective-generation"
  | "research"
  | "deduplication"
  | "synthesis"
  | "complete"
  | "error";

export interface ResearchProgress {
  stage: ResearchStage;
  message: string;
  progress: number; // 0-100
  perspectivesGenerated?: number;
  nodesExplored?: number;
  sourcesFound?: number;
}

// ── Synthesis ───────────────────────────────────────────────────────

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
