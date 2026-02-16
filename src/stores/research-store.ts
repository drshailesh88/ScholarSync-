/**
 * Zustand store for the Deep Research & Literature Discovery system.
 *
 * Manages all state for the research sidebar: search, library, chat,
 * evidence tables, paper detail, and verification.
 */

import { create } from "zustand";
import type {
  PaperResult,
  ResearchSearchFilters,
  SearchPlan,
  PaperDetail,
  ExtractionResult,
  EvidenceTable,
  EvidenceColumn,
  EvidenceRow,
  PaperChatMessage,
  ChatScope,
  SynthesisReport,
  SynthesisPlan,
  VerificationResult,
  ParsedFilter,
} from "@/lib/research/types";
import { DEFAULT_SEARCH_FILTERS } from "@/lib/research/types";

// ── Store interface ──────────────────────────────────────────────────

interface ResearchStore {
  // Sidebar state
  isOpen: boolean;
  activeTab: "search" | "library" | "chat";
  sidebarWidth: number;

  // Search state
  query: string;
  filters: ResearchSearchFilters;
  parsedChips: ParsedFilter["chips"];
  results: PaperResult[];
  totalResults: number;
  isSearching: boolean;
  currentPage: number;
  searchPlan: SearchPlan | null;
  showPlan: boolean;
  isGeneratingPlan: boolean;
  hasSearchedBefore: boolean;
  aiSummary: string | null;
  isGeneratingSummary: boolean;

  // Library state
  libraryPapers: PaperResult[];

  // Chat state
  chatScope: ChatScope;
  chatScopePaperIds: string[];
  chatMessages: PaperChatMessage[];
  isChatLoading: boolean;

  // Selected paper detail
  selectedPaperId: string | null;
  selectedPaperDetail: PaperDetail | null;

  // Evidence table state
  evidenceTables: EvidenceTable[];
  activeEvidenceTable: EvidenceTable | null;
  selectedPaperIds: string[];
  isExtracting: boolean;
  extractionProgress: { current: number; total: number } | null;

  // Synthesis state
  synthesisReport: SynthesisReport | null;
  synthesisPlan: SynthesisPlan | null;
  isSynthesizing: boolean;

  // Verification cache
  verificationCache: Record<string, VerificationResult>;

  // ── Actions ──────────────────────────────────────────────────────

  // Sidebar actions
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  setActiveTab: (tab: "search" | "library" | "chat") => void;
  setSidebarWidth: (width: number) => void;

  // Search actions
  setQuery: (query: string) => void;
  setFilters: (filters: Partial<ResearchSearchFilters>) => void;
  setParsedChips: (chips: ParsedFilter["chips"]) => void;
  removeChip: (index: number) => void;
  setResults: (results: PaperResult[], total: number) => void;
  appendResults: (results: PaperResult[]) => void;
  setIsSearching: (loading: boolean) => void;
  setCurrentPage: (page: number) => void;
  setSearchPlan: (plan: SearchPlan | null) => void;
  setShowPlan: (show: boolean) => void;
  setIsGeneratingPlan: (loading: boolean) => void;
  setHasSearchedBefore: (val: boolean) => void;
  setAiSummary: (summary: string | null) => void;
  setIsGeneratingSummary: (loading: boolean) => void;
  clearSearch: () => void;

  // Library actions
  addToLibrary: (paper: PaperResult) => void;
  removeFromLibrary: (paperId: string) => void;
  isInLibrary: (paperId: string) => boolean;

  // Chat actions
  setChatScope: (scope: ChatScope) => void;
  setChatScopePaperIds: (ids: string[]) => void;
  addChatMessage: (message: PaperChatMessage) => void;
  updateLastChatMessage: (content: string) => void;
  setIsChatLoading: (loading: boolean) => void;
  clearChat: () => void;

  // Paper detail actions
  selectPaper: (paperId: string | null) => void;
  setSelectedPaperDetail: (detail: PaperDetail | null) => void;
  setExtraction: (paperId: string, extraction: ExtractionResult) => void;

  // Evidence table actions
  togglePaperSelection: (paperId: string) => void;
  selectAllPapers: () => void;
  clearPaperSelection: () => void;
  setActiveEvidenceTable: (table: EvidenceTable | null) => void;
  createEvidenceTable: (name: string, columns: EvidenceColumn[]) => EvidenceTable;
  updateEvidenceTableRow: (tableId: string, row: EvidenceRow) => void;
  setIsExtracting: (loading: boolean) => void;
  setExtractionProgress: (progress: { current: number; total: number } | null) => void;

  // Synthesis actions
  setSynthesisReport: (report: SynthesisReport | null) => void;
  setSynthesisPlan: (plan: SynthesisPlan | null) => void;
  setIsSynthesizing: (loading: boolean) => void;

  // Verification actions
  setVerification: (paperId: string, result: VerificationResult) => void;
}

// ── Helpers ──────────────────────────────────────────────────────────

function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// ── Store ────────────────────────────────────────────────────────────

export const useResearchStore = create<ResearchStore>((set, get) => ({
  // Initial state
  isOpen: false,
  activeTab: "search",
  sidebarWidth: 380,

  query: "",
  filters: { ...DEFAULT_SEARCH_FILTERS },
  parsedChips: [],
  results: [],
  totalResults: 0,
  isSearching: false,
  currentPage: 0,
  searchPlan: null,
  showPlan: false,
  isGeneratingPlan: false,
  hasSearchedBefore: false,
  aiSummary: null,
  isGeneratingSummary: false,

  libraryPapers: [],

  chatScope: "library",
  chatScopePaperIds: [],
  chatMessages: [],
  isChatLoading: false,

  selectedPaperId: null,
  selectedPaperDetail: null,

  evidenceTables: [],
  activeEvidenceTable: null,
  selectedPaperIds: [],
  isExtracting: false,
  extractionProgress: null,

  synthesisReport: null,
  synthesisPlan: null,
  isSynthesizing: false,

  verificationCache: {},

  // ── Sidebar actions ──────────────────────────────────────────────

  toggleSidebar: () => set((s) => ({ isOpen: !s.isOpen })),
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSidebarWidth: (width) =>
    set({ sidebarWidth: Math.min(520, Math.max(320, width)) }),

  // ── Search actions ───────────────────────────────────────────────

  setQuery: (query) => set({ query }),
  setFilters: (filters) =>
    set((s) => ({ filters: { ...s.filters, ...filters } })),
  setParsedChips: (chips) => set({ parsedChips: chips }),
  removeChip: (index) =>
    set((s) => {
      const chip = s.parsedChips[index];
      const newChips = s.parsedChips.filter((_, i) => i !== index);
      const newFilters = { ...s.filters };

      if (chip?.type === "studyType") {
        newFilters.studyTypes = newFilters.studyTypes.filter(
          (st) => st !== chip.value
        );
      } else if (chip?.type === "dateRange") {
        newFilters.dateFrom = DEFAULT_SEARCH_FILTERS.dateFrom;
        newFilters.dateTo = DEFAULT_SEARCH_FILTERS.dateTo;
      }

      return { parsedChips: newChips, filters: newFilters };
    }),
  setResults: (results, total) =>
    set({ results, totalResults: total, currentPage: 0 }),
  appendResults: (results) =>
    set((s) => ({ results: [...s.results, ...results] })),
  setIsSearching: (loading) => set({ isSearching: loading }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSearchPlan: (plan) => set({ searchPlan: plan }),
  setShowPlan: (show) => set({ showPlan: show }),
  setIsGeneratingPlan: (loading) => set({ isGeneratingPlan: loading }),
  setHasSearchedBefore: (val) => set({ hasSearchedBefore: val }),
  setAiSummary: (summary) => set({ aiSummary: summary }),
  setIsGeneratingSummary: (loading) => set({ isGeneratingSummary: loading }),
  clearSearch: () =>
    set({
      query: "",
      filters: { ...DEFAULT_SEARCH_FILTERS },
      parsedChips: [],
      results: [],
      totalResults: 0,
      currentPage: 0,
      searchPlan: null,
      showPlan: false,
      aiSummary: null,
      selectedPaperId: null,
      selectedPaperDetail: null,
    }),

  // ── Library actions ──────────────────────────────────────────────

  addToLibrary: (paper) =>
    set((s) => {
      if (s.libraryPapers.some((p) => p.id === paper.id)) return s;
      const updated = { ...paper, inLibrary: true };
      // Also update in results if present
      const updatedResults = s.results.map((r) =>
        r.id === paper.id ? { ...r, inLibrary: true } : r
      );
      return {
        libraryPapers: [...s.libraryPapers, updated],
        results: updatedResults,
      };
    }),
  removeFromLibrary: (paperId) =>
    set((s) => {
      const updatedResults = s.results.map((r) =>
        r.id === paperId ? { ...r, inLibrary: false } : r
      );
      return {
        libraryPapers: s.libraryPapers.filter((p) => p.id !== paperId),
        results: updatedResults,
      };
    }),
  isInLibrary: (paperId) => get().libraryPapers.some((p) => p.id === paperId),

  // ── Chat actions ─────────────────────────────────────────────────

  setChatScope: (scope) => set({ chatScope: scope }),
  setChatScopePaperIds: (ids) => set({ chatScopePaperIds: ids }),
  addChatMessage: (message) =>
    set((s) => ({ chatMessages: [...s.chatMessages, message] })),
  updateLastChatMessage: (content) =>
    set((s) => {
      const msgs = [...s.chatMessages];
      if (msgs.length > 0 && msgs[msgs.length - 1].role === "assistant") {
        msgs[msgs.length - 1] = { ...msgs[msgs.length - 1], content };
      }
      return { chatMessages: msgs };
    }),
  setIsChatLoading: (loading) => set({ isChatLoading: loading }),
  clearChat: () => set({ chatMessages: [] }),

  // ── Paper detail actions ─────────────────────────────────────────

  selectPaper: (paperId) => {
    if (!paperId) {
      set({ selectedPaperId: null, selectedPaperDetail: null });
      return;
    }
    const allPapers = [...get().results, ...get().libraryPapers];
    const paper = allPapers.find((p) => p.id === paperId);
    if (paper) {
      set({
        selectedPaperId: paperId,
        selectedPaperDetail: {
          paper,
          extraction: undefined,
          isExtracting: false,
        },
      });
    }
  },
  setSelectedPaperDetail: (detail) => set({ selectedPaperDetail: detail }),
  setExtraction: (paperId, extraction) =>
    set((s) => {
      if (s.selectedPaperDetail?.paper.id === paperId) {
        return {
          selectedPaperDetail: {
            ...s.selectedPaperDetail,
            extraction,
            isExtracting: false,
          },
        };
      }
      return s;
    }),

  // ── Evidence table actions ───────────────────────────────────────

  togglePaperSelection: (paperId) =>
    set((s) => ({
      selectedPaperIds: s.selectedPaperIds.includes(paperId)
        ? s.selectedPaperIds.filter((id) => id !== paperId)
        : [...s.selectedPaperIds, paperId],
    })),
  selectAllPapers: () =>
    set((s) => ({
      selectedPaperIds: s.results.map((r) => r.id),
    })),
  clearPaperSelection: () => set({ selectedPaperIds: [] }),
  setActiveEvidenceTable: (table) => set({ activeEvidenceTable: table }),
  createEvidenceTable: (name, columns) => {
    const table: EvidenceTable = {
      id: generateId(),
      projectId: "current",
      name,
      columns,
      rows: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((s) => ({
      evidenceTables: [...s.evidenceTables, table],
      activeEvidenceTable: table,
    }));
    return table;
  },
  updateEvidenceTableRow: (tableId, row) =>
    set((s) => {
      const updateTable = (t: EvidenceTable) => {
        if (t.id !== tableId) return t;
        const existingIdx = t.rows.findIndex((r) => r.paperId === row.paperId);
        const newRows =
          existingIdx >= 0
            ? t.rows.map((r, i) => (i === existingIdx ? row : r))
            : [...t.rows, row];
        return { ...t, rows: newRows, updatedAt: new Date().toISOString() };
      };

      return {
        evidenceTables: s.evidenceTables.map(updateTable),
        activeEvidenceTable: s.activeEvidenceTable
          ? updateTable(s.activeEvidenceTable)
          : null,
      };
    }),
  setIsExtracting: (loading) => set({ isExtracting: loading }),
  setExtractionProgress: (progress) => set({ extractionProgress: progress }),

  // ── Synthesis actions ────────────────────────────────────────────

  setSynthesisReport: (report) => set({ synthesisReport: report }),
  setSynthesisPlan: (plan) => set({ synthesisPlan: plan }),
  setIsSynthesizing: (loading) => set({ isSynthesizing: loading }),

  // ── Verification actions ─────────────────────────────────────────

  setVerification: (paperId, result) =>
    set((s) => ({
      verificationCache: { ...s.verificationCache, [paperId]: result },
      results: s.results.map((r) =>
        r.id === paperId ? { ...r, verificationStatus: result.status } : r
      ),
      libraryPapers: s.libraryPapers.map((r) =>
        r.id === paperId ? { ...r, verificationStatus: result.status } : r
      ),
    })),
}));
