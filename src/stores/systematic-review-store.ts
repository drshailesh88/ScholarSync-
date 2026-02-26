/**
 * Zustand store for the Systematic Review workflow.
 *
 * Manages project context, workflow tab state, and per-panel data
 * so all 5+ tabs share a single project context.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type WorkflowTab =
  | "strategy"
  | "import"
  | "screening"
  | "prisma"
  | "rob2"
  | "extraction"
  | "meta_analysis"
  | "snowball"
  | "export"
  | "living"
  | "protocol"
  | "grade"
  | "manuscript";

export type ReviewStage =
  | "search_strategy"
  | "screening"
  | "full_text_screening"
  | "data_extraction"
  | "risk_of_bias"
  | "meta_analysis"
  | "reporting";

export interface PICOInput {
  population: string;
  intervention: string;
  comparison: string;
  outcome: string;
}

export interface SearchStrategy {
  fullSearchString: string;
  blocks: Array<{
    picoElement: string;
    meshTerms: string[];
    freeTextTerms: string[];
    booleanBlock: string;
  }>;
  estimatedResults?: number;
  suggestedFilters: string[];
}

export interface Criterion {
  id?: number;
  type: "inclusion" | "exclusion";
  description: string;
}

export interface ScreeningResult {
  paperId: number;
  title: string;
  decision: "include" | "exclude" | "conflict";
  confidence: number;
  requiresHumanReview: boolean;
  reason: string;
}

export interface ScreeningSummary {
  total: number;
  included: number;
  excluded: number;
  conflicts: number;
}

export interface ReviewConfig {
  id: number;
  projectId: number;
  pico: PICOInput | null;
  searchStrategy: SearchStrategy | null;
  searchDatabases: string[];
  protocolRegistration: string | null;
  reviewStage: ReviewStage;
  settings: Record<string, unknown>;
}

export interface SRProject {
  id: number;
  title: string;
  description: string | null;
  researchQuestion: string | null;
  status: string;
  reviewStage: ReviewStage;
  paperCount: number;
  screeningProgress: number; // 0–100
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Store interface
// ---------------------------------------------------------------------------

interface SystematicReviewStore {
  // Project context
  projectId: number | null;
  projectTitle: string;
  reviewConfig: ReviewConfig | null;
  activeTab: WorkflowTab;

  // Workflow progress
  reviewStage: ReviewStage;

  // Search strategy state
  pico: PICOInput;
  generatedStrategy: SearchStrategy | null;

  // Screening state
  criteria: Criterion[];
  screeningResults: ScreeningResult[];
  screeningSummary: ScreeningSummary | null;

  // Project list (hub page)
  projects: SRProject[];
  isLoadingProjects: boolean;

  // Actions — project
  setProject: (projectId: number, title: string, config: ReviewConfig) => void;
  clearProject: () => void;
  setActiveTab: (tab: WorkflowTab) => void;
  setReviewStage: (stage: ReviewStage) => void;

  // Actions — search strategy
  setPICO: (pico: PICOInput) => void;
  setGeneratedStrategy: (strategy: SearchStrategy | null) => void;

  // Actions — screening
  setCriteria: (criteria: Criterion[]) => void;
  setScreeningResults: (results: ScreeningResult[]) => void;
  setScreeningSummary: (summary: ScreeningSummary | null) => void;

  // Actions — project list
  setProjects: (projects: SRProject[]) => void;
  setIsLoadingProjects: (loading: boolean) => void;
}

// ---------------------------------------------------------------------------
// Default values
// ---------------------------------------------------------------------------

const DEFAULT_PICO: PICOInput = {
  population: "",
  intervention: "",
  comparison: "",
  outcome: "",
};

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useSystematicReviewStore = create<SystematicReviewStore>()(
  persist(
    (set) => ({
      // Project context
      projectId: null,
      projectTitle: "",
      reviewConfig: null,
      activeTab: "strategy",

      // Workflow
      reviewStage: "search_strategy",

      // Search strategy
      pico: { ...DEFAULT_PICO },
      generatedStrategy: null,

      // Screening
      criteria: [{ type: "inclusion", description: "" }],
      screeningResults: [],
      screeningSummary: null,

      // Project list
      projects: [],
      isLoadingProjects: false,

      // Actions — project
      setProject: (projectId, title, config) =>
        set({
          projectId,
          projectTitle: title,
          reviewConfig: config,
          reviewStage: config.reviewStage,
          pico: config.pico ?? { ...DEFAULT_PICO },
          generatedStrategy: config.searchStrategy ?? null,
        }),

      clearProject: () =>
        set({
          projectId: null,
          projectTitle: "",
          reviewConfig: null,
          activeTab: "strategy",
          reviewStage: "search_strategy",
          pico: { ...DEFAULT_PICO },
          generatedStrategy: null,
          criteria: [{ type: "inclusion", description: "" }],
          screeningResults: [],
          screeningSummary: null,
        }),

      setActiveTab: (tab) => set({ activeTab: tab }),
      setReviewStage: (stage) => set({ reviewStage: stage }),

      // Actions — search strategy
      setPICO: (pico) => set({ pico }),
      setGeneratedStrategy: (strategy) =>
        set({ generatedStrategy: strategy }),

      // Actions — screening
      setCriteria: (criteria) => set({ criteria }),
      setScreeningResults: (results) => set({ screeningResults: results }),
      setScreeningSummary: (summary) => set({ screeningSummary: summary }),

      // Actions — project list
      setProjects: (projects) => set({ projects }),
      setIsLoadingProjects: (loading) =>
        set({ isLoadingProjects: loading }),
    }),
    {
      name: "scholarsync-systematic-review",
      partialize: (state) => ({
        projectId: state.projectId,
        projectTitle: state.projectTitle,
        activeTab: state.activeTab,
        reviewStage: state.reviewStage,
        pico: state.pico,
      }),
    }
  )
);
