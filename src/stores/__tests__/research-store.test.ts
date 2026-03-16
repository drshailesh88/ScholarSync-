/**
 * Tests for research Zustand store
 *
 * Tests Deep Research & Literature Discovery system state
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import type { PaperResult, PaperChatMessage, SearchPlan, EvidenceTable, EvidenceColumn, EvidenceRow, VerificationResult } from "@/lib/research/types";

// Create a proper in-memory storage mock for sessionStorage
const storage = new Map<string, string>();
const sessionStorageMock = {
  getItem: (name: string) => {
    const value = storage.get(name);
    return value !== undefined ? value : null;
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  removeItem: (name: string) => {
    storage.delete(name);
  },
  clear: () => {
    storage.clear();
  },
  length: 0,
  key: (index: number) => {
    const keys = Array.from(storage.keys());
    return keys[index] ?? null;
  },
};
vi.stubGlobal("sessionStorage", sessionStorageMock);

import { useResearchStore } from "../research-store";

// Helper to create a mock paper
function createPaper(id: string, title: string): PaperResult {
  return {
    id,
    title,
    authors: [],
    year: 2023,
    journal: "Test Journal",
    citationCount: 10,
    abstract: "Test abstract",
    isOpenAccess: false,
    sources: ["pubmed"],
    publicationTypes: [],
    studyType: "rct",
    evidenceLevel: "II",
    source: "pubmed",
    verificationStatus: "pending",
    inLibrary: false,
  };
}

describe("useResearchStore", () => {
  beforeEach(() => {
    // Clear storage and reset store state completely
    storage.clear();
    const state = useResearchStore.getState();
    // Reset all state fields to defaults
    useResearchStore.setState({
      isOpen: false,
      activeTab: "search",
      sidebarWidth: 380,
      query: "",
      filters: state.filters, // Keep default filters
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
      searchScrollPosition: 0,
      libraryPapers: [],
      chatScope: "library",
      chatScopePaperIds: [],
      chatMessages: [],
      isChatLoading: false,
      selectedPaperId: null,
      selectedPaperDetail: null,
      selectedPaperIds: [],
      evidenceTables: [],
      activeEvidenceTable: null,
      isExtracting: false,
      extractionProgress: null,
      synthesisReport: null,
      synthesisPlan: null,
      isSynthesizing: false,
      verificationCache: {},
    });
  });

  describe("initial state", () => {
    it("sidebar is closed by default", () => {
      const state = useResearchStore.getState();
      expect(state.isOpen).toBe(false);
    });

    it("starts on search tab", () => {
      const state = useResearchStore.getState();
      expect(state.activeTab).toBe("search");
    });

    it("has default sidebar width", () => {
      const state = useResearchStore.getState();
      expect(state.sidebarWidth).toBe(380);
    });

    it("has empty search state", () => {
      const state = useResearchStore.getState();
      expect(state.query).toBe("");
      expect(state.results).toEqual([]);
      expect(state.totalResults).toBe(0);
      expect(state.isSearching).toBe(false);
      expect(state.currentPage).toBe(0);
    });

    it("has no search plan", () => {
      const state = useResearchStore.getState();
      expect(state.searchPlan).toBeNull();
      expect(state.showPlan).toBe(false);
    });

    it("has empty library", () => {
      const state = useResearchStore.getState();
      expect(state.libraryPapers).toEqual([]);
    });

    it("has empty chat state", () => {
      const state = useResearchStore.getState();
      expect(state.chatScope).toBe("library");
      expect(state.chatScopePaperIds).toEqual([]);
      expect(state.chatMessages).toEqual([]);
      expect(state.isChatLoading).toBe(false);
    });

    it("has no selected paper", () => {
      const state = useResearchStore.getState();
      expect(state.selectedPaperId).toBeNull();
      expect(state.selectedPaperDetail).toBeNull();
    });
  });

  describe("sidebar actions", () => {
    it("toggleSidebar flips isOpen state", () => {
      const store = useResearchStore.getState();
      expect(useResearchStore.getState().isOpen).toBe(false);

      store.toggleSidebar();
      expect(useResearchStore.getState().isOpen).toBe(true);

      store.toggleSidebar();
      expect(useResearchStore.getState().isOpen).toBe(false);
    });

    it("openSidebar opens sidebar", () => {
      const store = useResearchStore.getState();
      store.openSidebar();
      expect(useResearchStore.getState().isOpen).toBe(true);
    });

    it("closeSidebar closes sidebar", () => {
      const store = useResearchStore.getState();
      store.openSidebar();
      expect(useResearchStore.getState().isOpen).toBe(true);

      store.closeSidebar();
      expect(useResearchStore.getState().isOpen).toBe(false);
    });

    it("setActiveTab changes tab", () => {
      const store = useResearchStore.getState();
      store.setActiveTab("library");
      expect(useResearchStore.getState().activeTab).toBe("library");
    });

    it("setSidebarWidth changes width within bounds", () => {
      const store = useResearchStore.getState();
      store.setSidebarWidth(450);
      expect(useResearchStore.getState().sidebarWidth).toBe(450);
    });

    it("clamps sidebarWidth to minimum 320", () => {
      const store = useResearchStore.getState();
      store.setSidebarWidth(300);
      expect(useResearchStore.getState().sidebarWidth).toBe(320);
    });

    it("clamps sidebarWidth to maximum 520", () => {
      const store = useResearchStore.getState();
      store.setSidebarWidth(600);
      expect(useResearchStore.getState().sidebarWidth).toBe(520);
    });
  });

  describe("search actions", () => {
    it("setQuery updates query string", () => {
      const store = useResearchStore.getState();
      store.setQuery("diabetes treatment");
      expect(useResearchStore.getState().query).toBe("diabetes treatment");
    });

    it("setFilters merges with existing filters", () => {
      const store = useResearchStore.getState();
      store.setFilters({ studyTypes: ["rct"] });
      expect(useResearchStore.getState().filters.studyTypes).toEqual(["rct"]);
    });

    it("setParsedChips sets chips", () => {
      const store = useResearchStore.getState();
      const chips = [
        { type: "studyType" as const, value: "rct", label: "RCT" },
      ];
      store.setParsedChips(chips);
      expect(useResearchStore.getState().parsedChips).toEqual(chips);
    });

    it("removeChip removes chip and updates filters", () => {
      const store = useResearchStore.getState();
      store.setParsedChips([
        { type: "studyType" as const, value: "rct", label: "RCT" },
        { type: "dateRange" as const, value: "2020-2023", label: "2020-2023" },
      ]);
      store.setFilters({ studyTypes: ["rct"] });

      store.removeChip(0);

      expect(useResearchStore.getState().parsedChips).toHaveLength(1);
      expect(useResearchStore.getState().parsedChips[0].type).toBe("dateRange");
    });

    it("setResults sets results and total", () => {
      const store = useResearchStore.getState();
      const results = [createPaper("1", "Paper 1"), createPaper("2", "Paper 2")];

      store.setResults(results, 100);

      expect(useResearchStore.getState().results).toEqual(results);
      expect(useResearchStore.getState().totalResults).toBe(100);
      expect(useResearchStore.getState().currentPage).toBe(0);
    });

    it("appendResults adds to existing results", () => {
      const store = useResearchStore.getState();
      store.setResults([createPaper("1", "P1")], 1);

      store.appendResults([createPaper("2", "P2")]);

      expect(useResearchStore.getState().results).toHaveLength(2);
    });

    it("setIsSearching changes loading state", () => {
      const store = useResearchStore.getState();
      store.setIsSearching(true);
      expect(useResearchStore.getState().isSearching).toBe(true);

      store.setIsSearching(false);
      expect(useResearchStore.getState().isSearching).toBe(false);
    });

    it("setCurrentPage changes page", () => {
      const store = useResearchStore.getState();
      store.setCurrentPage(2);
      expect(useResearchStore.getState().currentPage).toBe(2);
    });

    it("setSearchPlan sets plan", () => {
      const store = useResearchStore.getState();
      const plan: SearchPlan = {
        originalQuery: "test",
        pubmedQuery: "test",
        meshTerms: [],
        synonyms: {},
        suggestedFilters: {},
        estimatedResults: "100",
        rationale: "Test",
      };

      store.setSearchPlan(plan);
      expect(useResearchStore.getState().searchPlan).toEqual(plan);
    });

    it("setShowPlan changes plan visibility", () => {
      const store = useResearchStore.getState();
      store.setShowPlan(true);
      expect(useResearchStore.getState().showPlan).toBe(true);
    });

    it("setHasSearchedBefore marks searched", () => {
      const store = useResearchStore.getState();
      expect(useResearchStore.getState().hasSearchedBefore).toBe(false);

      store.setHasSearchedBefore(true);
      expect(useResearchStore.getState().hasSearchedBefore).toBe(true);
    });

    it("clearSearch resets search state", () => {
      const store = useResearchStore.getState();
      store.setQuery("test");
      store.setResults([createPaper("1", "P1")], 1);
      store.setCurrentPage(2);
      store.setHasSearchedBefore(true);
      store.setSearchPlan({
        originalQuery: "test",
        pubmedQuery: "test",
        meshTerms: [],
        synonyms: {},
        suggestedFilters: {},
        estimatedResults: "10",
        rationale: "test",
      });
      store.setShowPlan(true);
      store.setAiSummary("summary");
      store.setSearchScrollPosition(120);
      store.selectPaper("paper-123");

      store.clearSearch();

      expect(useResearchStore.getState().query).toBe("");
      expect(useResearchStore.getState().results).toEqual([]);
      expect(useResearchStore.getState().totalResults).toBe(0);
      expect(useResearchStore.getState().currentPage).toBe(0);
      expect(useResearchStore.getState().searchPlan).toBeNull();
      expect(useResearchStore.getState().showPlan).toBe(false);
      expect(useResearchStore.getState().aiSummary).toBeNull();
      expect(useResearchStore.getState().searchScrollPosition).toBe(0);
      expect(useResearchStore.getState().selectedPaperId).toBeNull();
      expect(useResearchStore.getState().selectedPaperDetail).toBeNull();
      expect(useResearchStore.getState().hasSearchedBefore).toBe(true);
    });
  });

  describe("library actions", () => {
    it("addToLibrary adds paper to library", () => {
      const store = useResearchStore.getState();
      const paper = createPaper("1", "Paper 1");

      store.addToLibrary(paper);

      expect(useResearchStore.getState().libraryPapers).toHaveLength(1);
      expect(useResearchStore.getState().libraryPapers[0].inLibrary).toBe(true);
    });

    it("addToLibrary updates inLibrary flag in results if present", () => {
      const store = useResearchStore.getState();
      const paper = createPaper("1", "Paper 1");
      store.setResults([paper], 1);

      store.addToLibrary(paper);

      expect(useResearchStore.getState().results[0].inLibrary).toBe(true);
    });

    it("addToLibrary does not add duplicate papers", () => {
      const store = useResearchStore.getState();
      const paper = createPaper("1", "Paper 1");

      store.addToLibrary(paper);
      store.addToLibrary(paper);

      expect(useResearchStore.getState().libraryPapers).toHaveLength(1);
    });

    it("removeFromLibrary removes paper and updates results", () => {
      const store = useResearchStore.getState();
      const paper = createPaper("1", "Paper 1");
      store.addToLibrary(paper);
      expect(useResearchStore.getState().libraryPapers).toHaveLength(1);

      store.removeFromLibrary("1");

      expect(useResearchStore.getState().libraryPapers).toHaveLength(0);
    });

    it("isInLibrary checks if paper is in library", () => {
      const store = useResearchStore.getState();
      const paper = createPaper("1", "Paper 1");

      expect(store.isInLibrary("1")).toBe(false);

      store.addToLibrary(paper);
      expect(store.isInLibrary("1")).toBe(true);
    });
  });

  describe("chat actions", () => {
    it("setChatScope changes scope", () => {
      const store = useResearchStore.getState();
      store.setChatScope("selected");
      expect(useResearchStore.getState().chatScope).toBe("selected");
    });

    it("setChatScopePaperIds sets paper IDs", () => {
      const store = useResearchStore.getState();
      store.setChatScopePaperIds(["1", "2", "3"]);
      expect(useResearchStore.getState().chatScopePaperIds).toEqual(["1", "2", "3"]);
    });

    it("addChatMessage appends message", () => {
      const store = useResearchStore.getState();
      const msg: PaperChatMessage = { id: "1", role: "user" as const, content: "Question?", timestamp: Date.now() };

      store.addChatMessage(msg);

      expect(useResearchStore.getState().chatMessages).toHaveLength(1);
      expect(useResearchStore.getState().chatMessages[0]).toEqual(msg);
    });

    it("updateLastChatMessage updates last assistant message", () => {
      const store = useResearchStore.getState();
      store.addChatMessage({ id: "1", role: "user" as const, content: "Q", timestamp: Date.now() });
      store.addChatMessage({ id: "2", role: "assistant" as const, content: "Partial", timestamp: Date.now() });

      store.updateLastChatMessage("Complete");

      expect(useResearchStore.getState().chatMessages[1].content).toBe("Complete");
    });

    it("updateLastChatMessage does nothing if last message is not assistant", () => {
      const store = useResearchStore.getState();
      store.addChatMessage({ id: "1", role: "user" as const, content: "Q", timestamp: Date.now() });

      const originalLength = useResearchStore.getState().chatMessages.length;

      store.updateLastChatMessage("A");

      expect(useResearchStore.getState().chatMessages.length).toBe(originalLength);
    });

    it("setIsChatLoading changes loading state", () => {
      const store = useResearchStore.getState();
      store.setIsChatLoading(true);
      expect(useResearchStore.getState().isChatLoading).toBe(true);
    });

    it("clearChat empties messages", () => {
      const store = useResearchStore.getState();
      store.addChatMessage({ id: "1", role: "user" as const, content: "Q", timestamp: Date.now() });
      expect(useResearchStore.getState().chatMessages.length).toBe(1);

      store.clearChat();
      expect(useResearchStore.getState().chatMessages).toEqual([]);
    });
  });

  describe("paper detail actions", () => {
    it("selectPaper with valid ID sets detail", () => {
      const store = useResearchStore.getState();
      const paper = createPaper("1", "Paper 1");
      store.setResults([paper], 1);

      store.selectPaper("1");

      expect(useResearchStore.getState().selectedPaperId).toBe("1");
      expect(useResearchStore.getState().selectedPaperDetail?.paper).toEqual(paper);
    });

    it("selectPaper with null clears selection", () => {
      const store = useResearchStore.getState();
      const paper = createPaper("1", "Paper 1");
      store.setResults([paper], 1);

      store.selectPaper("1");
      expect(useResearchStore.getState().selectedPaperId).toBe("1");

      store.selectPaper(null);

      expect(useResearchStore.getState().selectedPaperId).toBeNull();
      expect(useResearchStore.getState().selectedPaperDetail).toBeNull();
    });

    it("selectPaper finds paper in results and library", () => {
      const store = useResearchStore.getState();
      const paper1 = createPaper("1", "Paper 1");
      const paper2 = createPaper("2", "Paper 2");
      store.setResults([paper1], 1);
      store.addToLibrary(paper2);

      store.selectPaper("2");

      // Paper from library has inLibrary: true added by addToLibrary
      const actualPaper = useResearchStore.getState().selectedPaperDetail?.paper;
      expect(actualPaper?.id).toBe("2");
      expect(actualPaper?.title).toBe("Paper 2");
      expect(actualPaper?.inLibrary).toBe(true);
    });

    it("setSelectedPaperDetail sets detail directly", () => {
      const store = useResearchStore.getState();
      const detail = {
        paper: createPaper("1", "Paper 1"),
        extraction: undefined,
        isExtracting: false,
      };

      store.setSelectedPaperDetail(detail);

      expect(useResearchStore.getState().selectedPaperDetail).toEqual(detail);
    });

    it("setExtraction updates extraction for selected paper", () => {
      const store = useResearchStore.getState();
      const paper = createPaper("1", "Paper 1");
      store.setResults([paper], 1);

      store.selectPaper("1");
      expect(useResearchStore.getState().selectedPaperDetail).toBeDefined();

      store.setExtraction("1", { summary: "Test", summarySourceSentences: [], fields: {} });

      expect(useResearchStore.getState().selectedPaperDetail?.extraction).toBeDefined();
      expect(useResearchStore.getState().selectedPaperDetail?.isExtracting).toBe(false);
    });

    it("setExtraction does nothing if paper not selected", () => {
      const store = useResearchStore.getState();
      store.setExtraction("1", { summary: "Test", summarySourceSentences: [], fields: {} });

      // Should not throw, and no change
      expect(useResearchStore.getState().selectedPaperDetail).toBeNull();
    });
  });

  describe("evidence table actions", () => {
    const createColumn = (id: string): EvidenceColumn => ({
      id,
      name: "Test Column",
      extractionInstructions: "Test instructions",
    });

    const createRow = (paperId: string): EvidenceRow => ({
      paperId,
      paperTitle: "Test Paper",
      paperYear: 2023,
      cells: {},
    });

    const createTable = (): EvidenceTable => ({
      id: "table-1",
      projectId: "current",
      name: "Test Table",
      columns: [],
      rows: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    it("togglePaperSelection adds and removes IDs", () => {
      const store = useResearchStore.getState();
      // Initially empty
      expect(useResearchStore.getState().selectedPaperIds).not.toContain("1");

      // Add ID
      store.togglePaperSelection("1");
      expect(useResearchStore.getState().selectedPaperIds).toContain("1");

      // Remove ID
      store.togglePaperSelection("1");
      expect(useResearchStore.getState().selectedPaperIds).not.toContain("1");
    });

    it("selectAllPapers selects all results", () => {
      const store = useResearchStore.getState();
      store.setResults([createPaper("1", "P1"), createPaper("2", "P2")], 2);

      store.selectAllPapers();

      expect(useResearchStore.getState().selectedPaperIds).toEqual(["1", "2"]);
    });

    it("clearPaperSelection clears all selections", () => {
      const store = useResearchStore.getState();
      store.setResults([createPaper("1", "P1")], 1);
      store.togglePaperSelection("1");

      store.clearPaperSelection();

      expect(useResearchStore.getState().selectedPaperIds).toEqual([]);
    });

    it("setActiveEvidenceTable sets active table", () => {
      const store = useResearchStore.getState();
      const table = createTable();

      store.setActiveEvidenceTable(table);

      expect(useResearchStore.getState().activeEvidenceTable).toEqual(table);
    });

    it("createEvidenceTable creates and sets active table", () => {
      const store = useResearchStore.getState();
      const columns = [createColumn("col-1")];

      const table = store.createEvidenceTable("New Table", columns);

      expect(table.name).toBe("New Table");
      expect(table.columns).toEqual(columns);
      expect(useResearchStore.getState().evidenceTables).toContain(table);
      expect(useResearchStore.getState().activeEvidenceTable).toEqual(table);
    });

    it("updateEvidenceTableRow updates or adds row", () => {
      const store = useResearchStore.getState();
      const columns = [createColumn("col-1")];
      const table = store.createEvidenceTable("Test", columns);
      const row = createRow("paper-1");

      store.updateEvidenceTableRow(table.id, row);

      const updatedTable = useResearchStore.getState().evidenceTables[0];
      expect(updatedTable.rows).toHaveLength(1);
      expect(updatedTable.rows[0]).toEqual(row);
    });

    it("setIsExtracting changes loading state", () => {
      const store = useResearchStore.getState();
      store.setIsExtracting(true);
      expect(useResearchStore.getState().isExtracting).toBe(true);
    });

    it("setExtractionProgress sets progress", () => {
      const store = useResearchStore.getState();
      const progress = { current: 5, total: 10 };

      store.setExtractionProgress(progress);

      expect(useResearchStore.getState().extractionProgress).toEqual(progress);
    });

    it("setExtractionProgress clears with null", () => {
      const store = useResearchStore.getState();
      store.setExtractionProgress({ current: 5, total: 10 });
      expect(useResearchStore.getState().extractionProgress).toBeDefined();

      store.setExtractionProgress(null);
      expect(useResearchStore.getState().extractionProgress).toBeNull();
    });
  });

  describe("synthesis actions", () => {
    it("setSynthesisReport sets report", () => {
      const store = useResearchStore.getState();
      const report = {
        id: "syn-1",
        content: "Content",
        citations: [],
        plan: { sections: [], estimatedWordCount: 0, papersPerSection: {} },
        reportType: "quick_summary" as const,
        createdAt: new Date().toISOString(),
      };

      store.setSynthesisReport(report);

      expect(useResearchStore.getState().synthesisReport).toEqual(report);
    });

    it("setSynthesisPlan sets plan", () => {
      const store = useResearchStore.getState();
      const plan = {
        sections: [{ title: "Section 1", description: "Description" }],
        estimatedWordCount: 1000,
        papersPerSection: {},
      };

      store.setSynthesisPlan(plan);

      expect(useResearchStore.getState().synthesisPlan).toEqual(plan);
    });

    it("setIsSynthesizing changes loading state", () => {
      const store = useResearchStore.getState();
      store.setIsSynthesizing(true);
      expect(useResearchStore.getState().isSynthesizing).toBe(true);
    });
  });

  describe("verification actions", () => {
    it("setVerification sets result in cache and updates paper status", () => {
      const store = useResearchStore.getState();
      const paper = createPaper("1", "Paper 1");
      store.setResults([paper], 1);

      const result: VerificationResult = {
        status: "verified",
        pmidVerified: true,
        doiVerified: true,
        metadataMatches: {
          title: true,
          year: true,
          journal: true,
          authors: true,
        },
        details: "All metadata verified",
      };

      store.setVerification("1", result);

      expect(useResearchStore.getState().verificationCache["1"]).toEqual(result);
      expect(useResearchStore.getState().results[0].verificationStatus).toBe("verified");
    });

    it("setVerification updates library papers too", () => {
      const store = useResearchStore.getState();
      const paper = createPaper("1", "Paper 1");
      store.addToLibrary(paper);

      const result: VerificationResult = {
        status: "unverified",
        pmidVerified: false,
        doiVerified: false,
        metadataMatches: {
          title: false,
          year: false,
          journal: false,
          authors: false,
        },
        details: "Could not verify",
      };

      store.setVerification("1", result);

      expect(useResearchStore.getState().libraryPapers[0].verificationStatus).toBe("unverified");
    });
  });
});
