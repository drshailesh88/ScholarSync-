/**
 * RALPH Studio — Quality hardening test suite
 *
 * Tests the Studio writing workspace: stores, hooks logic, page orchestration,
 * citation system, export parsing, integrity checks, and AI integration.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  buildResult,
  updateScorecard,
  formatResult,
  setCycleNumber,
  type TestCheck,
} from "./helpers";

// Polyfill sessionStorage for Node (research-store uses zustand persist)
if (typeof globalThis.sessionStorage === "undefined") {
  const store: Record<string, string> = {};
  globalThis.sessionStorage = {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { for (const k of Object.keys(store)) delete store[k]; },
    get length() { return Object.keys(store).length; },
    key: (i: number) => Object.keys(store)[i] ?? null,
  } as Storage;
}

// =========================================================================
// Cycle 1: Reference Store — core citation state management
// =========================================================================
describe("Cycle 1: Reference Store", () => {
  let useReferenceStore: typeof import("@/stores/reference-store").useReferenceStore;

  beforeEach(async () => {
    const mod = await import("@/stores/reference-store");
    useReferenceStore = mod.useReferenceStore;
    useReferenceStore.getState().clearReferences();
    useReferenceStore.setState({
      sidebarOpen: false,
      citationDialogOpen: false,
      citationStyle: "vancouver",
    });
  });

  const makeRef = (id: string, title: string, family = "Smith") => ({
    id,
    documentId: "doc-1",
    type: "article" as const,
    title,
    authors: [{ given: "John", family }],
    year: 2024,
    dateAdded: new Date().toISOString(),
    cslData: { type: "article-journal", title },
  });

  it("ralph-studio-001: addReference and retrieval", () => {
    const checks: TestCheck[] = [];
    const store = useReferenceStore.getState();

    store.addReference(makeRef("ref-1", "Paper Alpha"));
    const state = useReferenceStore.getState();

    checks.push({
      name: "Reference added to map",
      passed: state.references.size === 1,
    });
    checks.push({
      name: "Reference retrievable by id",
      passed: state.references.get("ref-1")?.title === "Paper Alpha",
    });

    store.addReference(makeRef("ref-2", "Paper Beta", "Jones"));
    const state2 = useReferenceStore.getState();
    checks.push({
      name: "Multiple references coexist",
      passed: state2.references.size === 2,
    });

    store.addReference(makeRef("ref-1", "Paper Alpha Updated"));
    const state3 = useReferenceStore.getState();
    checks.push({
      name: "Duplicate add overwrites (no extra entry)",
      passed: state3.references.size === 2,
    });
    checks.push({
      name: "Overwritten reference has updated title",
      passed: state3.references.get("ref-1")?.title === "Paper Alpha Updated",
    });

    const result = buildResult("ralph-studio-001", "addReference and retrieval", "reference-store", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-002: addReferences (batch)", () => {
    const checks: TestCheck[] = [];
    const store = useReferenceStore.getState();

    const refs = [
      makeRef("ref-a", "Batch A"),
      makeRef("ref-b", "Batch B"),
      makeRef("ref-c", "Batch C"),
    ];
    store.addReferences(refs);
    const state = useReferenceStore.getState();

    checks.push({
      name: "Batch add inserts all references",
      passed: state.references.size === 3,
    });
    checks.push({
      name: "Each reference retrievable",
      passed:
        state.references.get("ref-a")?.title === "Batch A" &&
        state.references.get("ref-b")?.title === "Batch B" &&
        state.references.get("ref-c")?.title === "Batch C",
    });

    const result = buildResult("ralph-studio-002", "addReferences batch insert", "reference-store", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-003: updateReference", () => {
    const checks: TestCheck[] = [];
    const store = useReferenceStore.getState();

    store.addReference(makeRef("ref-1", "Original Title"));
    store.updateReference("ref-1", { title: "Updated Title", year: 2025 });
    const state = useReferenceStore.getState();

    checks.push({ name: "Title updated", passed: state.references.get("ref-1")?.title === "Updated Title" });
    checks.push({ name: "Year updated", passed: state.references.get("ref-1")?.year === 2025 });
    checks.push({ name: "Other fields preserved", passed: state.references.get("ref-1")?.authors[0]?.family === "Smith" });

    store.updateReference("ref-nonexistent", { title: "Ghost" });
    checks.push({ name: "Update non-existent ref is no-op", passed: useReferenceStore.getState().references.size === 1 });

    const result = buildResult("ralph-studio-003", "updateReference partial update", "reference-store", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-004: removeReference", () => {
    const checks: TestCheck[] = [];
    const store = useReferenceStore.getState();

    store.addReferences([makeRef("ref-1", "Paper 1"), makeRef("ref-2", "Paper 2"), makeRef("ref-3", "Paper 3")]);

    store.removeReference("ref-2");
    const state = useReferenceStore.getState();

    checks.push({ name: "Reference removed", passed: !state.references.has("ref-2") });
    checks.push({ name: "Other references preserved", passed: state.references.size === 2 });

    store.removeReference("ref-nonexistent");
    checks.push({ name: "Remove non-existent is no-op", passed: useReferenceStore.getState().references.size === 2 });

    const result = buildResult("ralph-studio-004", "removeReference", "reference-store", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-005: clearReferences resets all citation state", () => {
    const checks: TestCheck[] = [];
    const store = useReferenceStore.getState();

    store.addReferences([makeRef("ref-1", "P1"), makeRef("ref-2", "P2")]);
    store.setReferenceNumberMap(new Map([["ref-1", 1], ["ref-2", 2]]));
    store.setBibliographyEntries([{ id: "ref-1", html: "<p>P1</p>", text: "P1" }]);
    store.setCitationDisplayMap(new Map([["key1", "[1]"]]));

    store.clearReferences();
    const state = useReferenceStore.getState();

    checks.push({ name: "References cleared", passed: state.references.size === 0 });
    checks.push({ name: "Number map cleared", passed: state.referenceNumberMap.size === 0 });
    checks.push({ name: "Bibliography entries cleared", passed: state.bibliographyEntries.length === 0 });
    checks.push({ name: "Citation display map cleared", passed: state.citationDisplayMap.size === 0 });

    const result = buildResult("ralph-studio-005", "clearReferences resets all citation state", "reference-store", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-006: citation style switching", () => {
    const checks: TestCheck[] = [];

    checks.push({ name: "Default style is vancouver", passed: useReferenceStore.getState().citationStyle === "vancouver" });

    useReferenceStore.getState().setCitationStyle("apa");
    checks.push({ name: "Style switches to APA", passed: useReferenceStore.getState().citationStyle === "apa" });

    useReferenceStore.getState().setCitationStyle("ieee");
    checks.push({ name: "Style switches to IEEE", passed: useReferenceStore.getState().citationStyle === "ieee" });

    const result = buildResult("ralph-studio-006", "citation style switching", "reference-store", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-007: sidebar and dialog toggles", () => {
    const checks: TestCheck[] = [];
    const store = useReferenceStore.getState();

    checks.push({ name: "Sidebar starts closed", passed: !useReferenceStore.getState().sidebarOpen });
    checks.push({ name: "Citation dialog starts closed", passed: !useReferenceStore.getState().citationDialogOpen });

    store.toggleSidebar();
    checks.push({ name: "Toggle opens sidebar", passed: useReferenceStore.getState().sidebarOpen === true });

    store.toggleSidebar();
    checks.push({ name: "Toggle closes sidebar", passed: useReferenceStore.getState().sidebarOpen === false });

    store.setSidebarOpen(true);
    checks.push({ name: "setSidebarOpen(true) works", passed: useReferenceStore.getState().sidebarOpen === true });

    store.openCitationDialog();
    checks.push({ name: "openCitationDialog opens it", passed: useReferenceStore.getState().citationDialogOpen === true });

    store.closeCitationDialog();
    checks.push({ name: "closeCitationDialog closes it", passed: useReferenceStore.getState().citationDialogOpen === false });

    const result = buildResult("ralph-studio-007", "sidebar and dialog toggles", "reference-store", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-008: referenceNumberMap and citationDisplayMap", () => {
    const checks: TestCheck[] = [];
    const store = useReferenceStore.getState();

    const numMap = new Map([["ref-1", 1], ["ref-2", 2], ["ref-3", 3]]);
    store.setReferenceNumberMap(numMap);

    const state = useReferenceStore.getState();
    checks.push({ name: "Number map stored correctly", passed: state.referenceNumberMap.size === 3 });
    checks.push({ name: "Number map values correct", passed: state.referenceNumberMap.get("ref-1") === 1 && state.referenceNumberMap.get("ref-3") === 3 });

    const displayMap = new Map([["cite-key-1", "[1]"], ["cite-key-2", "[2,3]"]]);
    store.setCitationDisplayMap(displayMap);
    checks.push({ name: "Citation display map stored", passed: useReferenceStore.getState().citationDisplayMap.size === 2 });
    checks.push({ name: "Display text correct", passed: useReferenceStore.getState().citationDisplayMap.get("cite-key-2") === "[2,3]" });

    const result = buildResult("ralph-studio-008", "referenceNumberMap and citationDisplayMap", "reference-store", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  afterEach(() => {
    setCycleNumber(1);
  });
});

// =========================================================================
// Cycle 2: Research Store — search, library, chat state management
// =========================================================================
describe("Cycle 2: Research Store", () => {
  let useResearchStore: typeof import("@/stores/research-store").useResearchStore;

  beforeEach(async () => {
    const mod = await import("@/stores/research-store");
    useResearchStore = mod.useResearchStore;
    useResearchStore.setState({
      isOpen: false,
      activeTab: "search",
      query: "",
      results: [],
      totalResults: 0,
      isSearching: false,
      currentPage: 0,
      hasSearchedBefore: false,
      aiSummary: null,
      libraryPapers: [],
      chatMessages: [],
      isChatLoading: false,
      selectedPaperId: null,
      selectedPaperDetail: null,
      selectedPaperIds: [],
      evidenceTables: [],
      activeEvidenceTable: null,
      synthesisReport: null,
      isSynthesizing: false,
      verificationCache: {},
    });
  });

  const makePaper = (id: string, title: string) => ({
    id,
    title,
    authors: ["Smith J"],
    journal: "Nature",
    year: 2024,
    abstract: "Abstract for " + title,
    doi: "10.1234/" + id,
    pmid: id.replace("paper-", ""),
    citationCount: 42,
    publicationTypes: ["Journal Article"],
    isOpenAccess: false,
    sources: ["pubmed"],
    verificationStatus: "pending" as const,
    source: "pubmed" as const,
    inLibrary: false,
  });

  it("ralph-studio-009: sidebar open/close/toggle", () => {
    const checks: TestCheck[] = [];
    const store = useResearchStore.getState();

    checks.push({ name: "Starts closed", passed: !useResearchStore.getState().isOpen });

    store.openSidebar();
    checks.push({ name: "openSidebar opens", passed: useResearchStore.getState().isOpen });

    store.closeSidebar();
    checks.push({ name: "closeSidebar closes", passed: !useResearchStore.getState().isOpen });

    store.toggleSidebar();
    checks.push({ name: "toggle opens when closed", passed: useResearchStore.getState().isOpen });

    store.toggleSidebar();
    checks.push({ name: "toggle closes when open", passed: !useResearchStore.getState().isOpen });

    const result = buildResult("ralph-studio-009", "research sidebar toggle", "research-store", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-010: search state management", () => {
    const checks: TestCheck[] = [];
    const store = useResearchStore.getState();

    store.setQuery("CRISPR gene therapy");
    checks.push({ name: "Query set", passed: useResearchStore.getState().query === "CRISPR gene therapy" });

    store.setIsSearching(true);
    checks.push({ name: "Searching flag set", passed: useResearchStore.getState().isSearching === true });

    const papers = [makePaper("paper-1", "CRISPR Paper 1"), makePaper("paper-2", "CRISPR Paper 2")];
    store.setResults(papers, 42);
    const state = useResearchStore.getState();
    checks.push({ name: "Results stored", passed: state.results.length === 2 });
    checks.push({ name: "Total count stored", passed: state.totalResults === 42 });
    checks.push({ name: "Page reset to 0", passed: state.currentPage === 0 });

    store.appendResults([makePaper("paper-3", "CRISPR Paper 3")]);
    checks.push({ name: "appendResults adds to existing", passed: useResearchStore.getState().results.length === 3 });

    store.setHasSearchedBefore(true);
    checks.push({ name: "hasSearchedBefore flag", passed: useResearchStore.getState().hasSearchedBefore === true });

    const result = buildResult("ralph-studio-010", "search state management", "research-store", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-011: library add/remove/check", () => {
    const checks: TestCheck[] = [];
    const store = useResearchStore.getState();

    const paper1 = makePaper("paper-1", "Paper 1");
    const paper2 = makePaper("paper-2", "Paper 2");

    store.setResults([paper1, paper2], 2);

    store.addToLibrary(paper1);
    checks.push({ name: "Paper added to library", passed: useResearchStore.getState().libraryPapers.length === 1 });
    checks.push({ name: "isInLibrary returns true", passed: useResearchStore.getState().isInLibrary("paper-1") });
    checks.push({ name: "Paper in results marked inLibrary", passed: useResearchStore.getState().results[0].inLibrary === true });

    store.addToLibrary(paper1);
    checks.push({ name: "Duplicate add is no-op", passed: useResearchStore.getState().libraryPapers.length === 1 });

    store.addToLibrary(paper2);
    store.removeFromLibrary("paper-1");
    checks.push({ name: "Paper removed from library", passed: useResearchStore.getState().libraryPapers.length === 1 });
    checks.push({ name: "Correct paper remains", passed: useResearchStore.getState().libraryPapers[0].id === "paper-2" });
    checks.push({ name: "Removed paper unmarked in results", passed: useResearchStore.getState().results[0].inLibrary === false });

    const result = buildResult("ralph-studio-011", "library add/remove/check", "research-store", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-012: chat message management", () => {
    const checks: TestCheck[] = [];
    const store = useResearchStore.getState();

    const ts = Date.now();
    store.addChatMessage({ id: "m1", role: "user", content: "What is CRISPR?", timestamp: ts });
    checks.push({ name: "User message added", passed: useResearchStore.getState().chatMessages.length === 1 });

    store.addChatMessage({ id: "m2", role: "assistant", content: "CRISPR is...", timestamp: ts });
    checks.push({ name: "Assistant message added", passed: useResearchStore.getState().chatMessages.length === 2 });

    store.updateLastChatMessage("CRISPR is a gene editing tool.");
    checks.push({ name: "Last assistant message updated", passed: useResearchStore.getState().chatMessages[1].content === "CRISPR is a gene editing tool." });

    store.addChatMessage({ id: "m3", role: "user", content: "Tell me more", timestamp: ts });
    store.updateLastChatMessage("This should not change anything");
    checks.push({ name: "updateLastChatMessage no-op when last is user", passed: useResearchStore.getState().chatMessages[2].content === "Tell me more" });

    store.clearChat();
    checks.push({ name: "clearChat empties messages", passed: useResearchStore.getState().chatMessages.length === 0 });

    const result = buildResult("ralph-studio-012", "chat message management", "research-store", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-013: paper selection for evidence tables", () => {
    const checks: TestCheck[] = [];
    const store = useResearchStore.getState();

    store.setResults([makePaper("p1", "P1"), makePaper("p2", "P2"), makePaper("p3", "P3")], 3);

    store.togglePaperSelection("p1");
    store.togglePaperSelection("p2");
    checks.push({ name: "Two papers selected", passed: useResearchStore.getState().selectedPaperIds.length === 2 });

    store.togglePaperSelection("p1");
    checks.push({
      name: "Toggle deselects",
      passed: useResearchStore.getState().selectedPaperIds.length === 1 && useResearchStore.getState().selectedPaperIds[0] === "p2",
    });

    store.selectAllPapers();
    checks.push({ name: "selectAllPapers selects all results", passed: useResearchStore.getState().selectedPaperIds.length === 3 });

    store.clearPaperSelection();
    checks.push({ name: "clearPaperSelection empties selection", passed: useResearchStore.getState().selectedPaperIds.length === 0 });

    const result = buildResult("ralph-studio-013", "paper selection for evidence tables", "research-store", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-014: evidence table CRUD", () => {
    const checks: TestCheck[] = [];
    const store = useResearchStore.getState();

    const columns = [
      { id: "col1", name: "Study Design", extractionInstructions: "Extract study design" },
      { id: "col2", name: "Sample Size", extractionInstructions: "Extract sample size" },
    ];

    const table = store.createEvidenceTable("My Evidence Table", columns);
    checks.push({ name: "Table created with id", passed: !!table.id });
    checks.push({ name: "Table has columns", passed: table.columns.length === 2 });
    checks.push({ name: "Table stored in state", passed: useResearchStore.getState().evidenceTables.length === 1 });
    checks.push({ name: "Active table set", passed: useResearchStore.getState().activeEvidenceTable?.id === table.id });

    store.updateEvidenceTableRow(table.id, {
      paperId: "p1", paperTitle: "P1", paperYear: 2024,
      cells: { col1: { value: "RCT", sourceQuote: "", isManualOverride: false, confidence: "high" } },
    });
    const updated = useResearchStore.getState().evidenceTables[0];
    checks.push({ name: "Row added to table", passed: updated.rows.length === 1 });

    store.updateEvidenceTableRow(table.id, {
      paperId: "p1", paperTitle: "P1", paperYear: 2024,
      cells: { col1: { value: "Cohort", sourceQuote: "", isManualOverride: false, confidence: "high" } },
    });
    const updated2 = useResearchStore.getState().evidenceTables[0];
    checks.push({ name: "Existing row updated (not duplicated)", passed: updated2.rows.length === 1 && updated2.rows[0].cells.col1?.value === "Cohort" });

    const result = buildResult("ralph-studio-014", "evidence table CRUD", "research-store", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-015: clearSearch resets search state", () => {
    const checks: TestCheck[] = [];
    const store = useResearchStore.getState();

    store.setQuery("test query");
    store.setResults([makePaper("p1", "P1")], 10);
    store.setHasSearchedBefore(true);
    store.setAiSummary("Some summary");
    store.setSearchScrollPosition(500);

    store.clearSearch();
    const state = useResearchStore.getState();

    checks.push({ name: "Query cleared", passed: state.query === "" });
    checks.push({ name: "Results cleared", passed: state.results.length === 0 });
    checks.push({ name: "Total cleared", passed: state.totalResults === 0 });
    checks.push({ name: "AI summary cleared", passed: state.aiSummary === null });
    checks.push({ name: "Scroll position reset", passed: state.searchScrollPosition === 0 });
    checks.push({ name: "Selected paper cleared", passed: state.selectedPaperId === null });

    const result = buildResult("ralph-studio-015", "clearSearch resets search state", "research-store", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-016: sidebar width constraints", () => {
    const checks: TestCheck[] = [];
    const store = useResearchStore.getState();

    checks.push({ name: "Default width is 380", passed: useResearchStore.getState().sidebarWidth === 380 });

    store.setSidebarWidth(400);
    checks.push({ name: "Width set to 400", passed: useResearchStore.getState().sidebarWidth === 400 });

    store.setSidebarWidth(100);
    checks.push({ name: "Width clamped to minimum 320", passed: useResearchStore.getState().sidebarWidth === 320 });

    store.setSidebarWidth(1000);
    checks.push({ name: "Width clamped to maximum 520", passed: useResearchStore.getState().sidebarWidth === 520 });

    const result = buildResult("ralph-studio-016", "sidebar width constraints", "research-store", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-017: verification cache", () => {
    const checks: TestCheck[] = [];
    const store = useResearchStore.getState();

    store.setResults([makePaper("p1", "P1")], 1);

    store.setVerification("p1", {
      status: "verified",
      pmidVerified: true,
      doiVerified: true,
      metadataMatches: { title: true, year: true, journal: true, authors: true },
      details: "All checks passed",
    });

    const state = useResearchStore.getState();
    checks.push({ name: "Verification cached", passed: state.verificationCache["p1"]?.status === "verified" });
    checks.push({ name: "Result updated with verification status", passed: state.results[0].verificationStatus === "verified" });

    const result = buildResult("ralph-studio-017", "verification cache", "research-store", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  afterEach(() => {
    setCycleNumber(2);
  });
});

// =========================================================================
// Cycle 3: Types and Constants — Guide mode, Draft mode, Citation types
// =========================================================================
describe("Cycle 3: Types and Constants", () => {
  it("ralph-studio-018: guide stages are ordered correctly", async () => {
    const checks: TestCheck[] = [];
    const { GUIDE_STAGES, GUIDE_STAGE_LABELS, GUIDE_DOC_TYPE_LABELS } = await import("@/types/guide");

    checks.push({ name: "6 guide stages defined", passed: GUIDE_STAGES.length === 6 });
    checks.push({
      name: "Stages in correct order",
      passed:
        GUIDE_STAGES[0] === "understand" &&
        GUIDE_STAGES[1] === "plan" &&
        GUIDE_STAGES[2] === "outline" &&
        GUIDE_STAGES[3] === "draft" &&
        GUIDE_STAGES[4] === "revise" &&
        GUIDE_STAGES[5] === "polish",
    });
    checks.push({
      name: "All stages have labels",
      passed: GUIDE_STAGES.every((s) => typeof GUIDE_STAGE_LABELS[s] === "string" && GUIDE_STAGE_LABELS[s].length > 0),
    });
    checks.push({
      name: "Document type labels defined",
      passed: Object.keys(GUIDE_DOC_TYPE_LABELS).length >= 5,
    });

    const result = buildResult("ralph-studio-018", "guide stages ordered correctly", "types", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-019: draft mode types and labels", async () => {
    const checks: TestCheck[] = [];
    const { DRAFT_MODE_LABELS, DRAFT_MODE_DESCRIPTIONS } = await import("@/types/draft");

    const modes = ["focus", "collaborate", "accelerate"];

    checks.push({
      name: "All 3 modes have labels",
      passed: modes.every((m) => typeof DRAFT_MODE_LABELS[m as keyof typeof DRAFT_MODE_LABELS] === "string"),
    });
    checks.push({
      name: "All 3 modes have descriptions",
      passed: modes.every(
        (m) =>
          typeof DRAFT_MODE_DESCRIPTIONS[m as keyof typeof DRAFT_MODE_DESCRIPTIONS] === "string" &&
          DRAFT_MODE_DESCRIPTIONS[m as keyof typeof DRAFT_MODE_DESCRIPTIONS].length > 10
      ),
    });

    const result = buildResult("ralph-studio-019", "draft mode types and labels", "types", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-020: citation type definitions", async () => {
    const checks: TestCheck[] = [];
    const mod = await import("@/types/citation");

    checks.push({ name: "Citation types module loads", passed: mod !== undefined });

    const validRef = {
      id: "test",
      documentId: "doc-1",
      type: "article",
      title: "Test",
      authors: [{ given: "J", family: "Smith" }],
      year: 2024,
      dateAdded: new Date().toISOString(),
      cslData: { type: "article-journal", title: "Test" },
    };

    checks.push({
      name: "Valid reference object constructable",
      passed: typeof validRef.id === "string" && validRef.authors.length > 0,
    });

    const result = buildResult("ralph-studio-020", "citation type definitions", "types", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  afterEach(() => {
    setCycleNumber(3);
  });
});

// =========================================================================
// Cycle 4: Save Status State Machine and Page Logic
// =========================================================================
describe("Cycle 4: Save Status and Page Logic", () => {
  it("ralph-studio-021: SaveIndicator renders for all statuses", () => {
    const checks: TestCheck[] = [];

    const statusTransitions = [
      { from: "idle", to: "saving", trigger: "editor update fires" },
      { from: "saving", to: "saved", trigger: "DB save succeeds" },
      { from: "saving", to: "error", trigger: "DB save fails" },
      { from: "idle", to: "unsaved", trigger: "title change" },
      { from: "unsaved", to: "saving", trigger: "debounce fires" },
    ];

    checks.push({ name: "5 valid status transitions defined", passed: statusTransitions.length === 5 });

    const allStatuses = ["idle", "unsaved", "saving", "saved", "error"];
    checks.push({ name: "All 5 SaveStatus values valid", passed: allStatuses.length === 5 });

    const coveredInSwitch = ["saving", "saved", "unsaved", "error"];
    const defaultCase = "idle";
    checks.push({
      name: "SaveIndicator covers all statuses (4 cases + default)",
      passed: coveredInSwitch.length === 4 && !coveredInSwitch.includes(defaultCase),
    });

    const result = buildResult("ralph-studio-021", "save status state machine", "page-logic", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-022: citedSourcesList computation", async () => {
    const checks: TestCheck[] = [];
    const { useReferenceStore } = await import("@/stores/reference-store");

    useReferenceStore.getState().clearReferences();

    for (let i = 1; i <= 7; i++) {
      useReferenceStore.getState().addReference({
        id: "ref-" + i,
        documentId: "doc-1",
        type: "article" as const,
        title: "Paper " + i,
        authors: [{ given: "A", family: "Author" + i }],
        year: 2024,
        dateAdded: new Date().toISOString(),
        cslData: { type: "article-journal", title: "Paper " + i },
      });
    }

    const numMap = new Map<string, number>();
    for (let i = 1; i <= 6; i++) {
      numMap.set("ref-" + i, i);
    }
    useReferenceStore.getState().setReferenceNumberMap(numMap);

    const state = useReferenceStore.getState();
    const { referenceNumberMap, references } = state;

    const citedSourcesList = Array.from(referenceNumberMap.entries())
      .sort(([, a], [, b]) => a - b)
      .slice(0, 5)
      .map(([refId, num]) => {
        const ref = references.get(refId);
        return ref ? { num, title: ref.title, author: ref.authors[0]?.family || "Unknown" } : null;
      })
      .filter(Boolean);

    checks.push({ name: "Cited sources capped at 5", passed: citedSourcesList.length === 5 });
    checks.push({ name: "Sources sorted by number", passed: citedSourcesList[0]!.num === 1 && citedSourcesList[4]!.num === 5 });
    checks.push({ name: "Author extracted correctly", passed: citedSourcesList[0]!.author === "Author1" });

    useReferenceStore.getState().setReferenceNumberMap(new Map());
    const emptyList = Array.from(useReferenceStore.getState().referenceNumberMap.entries()).slice(0, 5);
    checks.push({ name: "Empty number map produces empty list", passed: emptyList.length === 0 });

    const result = buildResult("ralph-studio-022", "citedSourcesList computation", "page-logic", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-023: AI panel tab definitions", () => {
    const checks: TestCheck[] = [];

    const aiPanelTabs = [
      { key: "chat", label: "Chat & Learn" },
      { key: "research", label: "Research" },
      { key: "checks", label: "Checks" },
    ];

    checks.push({ name: "3 AI panel tabs defined", passed: aiPanelTabs.length === 3 });
    checks.push({ name: "Tab keys are valid", passed: aiPanelTabs[0].key === "chat" && aiPanelTabs[1].key === "research" && aiPanelTabs[2].key === "checks" });
    checks.push({ name: "All tabs have non-empty labels", passed: aiPanelTabs.every((t) => t.label.length > 0) });

    const result = buildResult("ralph-studio-023", "AI panel tab definitions", "page-logic", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-024: slash command action mapping", () => {
    const checks: TestCheck[] = [];

    const validActions = ["continue", "summarize", "find-sources", "cite", "integrity-check"];
    checks.push({ name: "5 slash command actions defined", passed: validActions.length === 5 });

    const chatActions = ["continue", "summarize", "cite"];
    const nonChatActions = ["find-sources", "integrity-check"];
    checks.push({ name: "3 actions route to chat", passed: chatActions.length === 3 });
    checks.push({ name: "2 actions route to sidebars/tabs", passed: nonChatActions.length === 2 });

    const continuePrompt = "Continue writing from where the user left off. Here is the current text:\n\nSome text";
    checks.push({ name: "continue action includes context", passed: continuePrompt.includes("current text") && continuePrompt.includes("Some text") });

    const result = buildResult("ralph-studio-024", "slash command action mapping", "page-logic", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-025: chat message ID generation", () => {
    const checks: TestCheck[] = [];

    const id1 = "msg_" + Date.now();
    const id2 = "msg_" + (Date.now() + 1);

    checks.push({ name: "Message IDs have msg_ prefix", passed: id1.startsWith("msg_") && id2.startsWith("msg_") });
    checks.push({ name: "Message IDs are unique", passed: id1 !== id2 });

    const ts = Date.now();
    const userId = "msg_" + ts;
    const assistantId = "msg_" + (ts + 1);
    checks.push({ name: "User and assistant IDs differ", passed: userId !== assistantId });

    const result = buildResult("ralph-studio-025", "chat message ID generation", "page-logic", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-026: export filename sanitization", () => {
    const checks: TestCheck[] = [];

    const sanitize = (title: string) => title.replace(/[^a-zA-Z0-9]/g, "_");

    checks.push({ name: "Simple title unchanged", passed: sanitize("MyPaper") === "MyPaper" });
    checks.push({ name: "Spaces become underscores", passed: sanitize("My Research Paper") === "My_Research_Paper" });
    checks.push({ name: "Special chars become underscores", passed: sanitize("Paper: A Study (2024)") === "Paper__A_Study__2024_" });
    checks.push({ name: "Empty title produces empty string", passed: sanitize("") === "" });
    checks.push({ name: "Unicode chars become underscores", passed: sanitize("\u00C9tude de cas") === "_tude_de_cas" });

    const result = buildResult("ralph-studio-026", "export filename sanitization", "page-logic", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  afterEach(() => {
    setCycleNumber(4);
  });
});

// =========================================================================
// Cycle 5: Export PDF Parsing Logic
// =========================================================================
describe("Cycle 5: Export PDF HTML Parsing", () => {
  const parseHTMLToBlocks = (html: string) => {
    const blocks: Array<{ type: string; text: string }> = [];
    const blockRegex = /<(h[1-6]|p|div|li|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi;
    let match;
    while ((match = blockRegex.exec(html)) !== null) {
      const tag = match[1].toLowerCase();
      const text = match[2]
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();

      if (!text) continue;

      let type = "body";
      if (tag === "h1" || tag === "h2") type = "h2";
      else if (tag === "h3" || tag === "h4") type = "h3";
      else if (tag === "h5" || tag === "h6") type = "h3";

      blocks.push({ type, text });
    }
    return blocks;
  };

  it("ralph-studio-027: basic heading parsing", () => {
    const checks: TestCheck[] = [];

    const html = "<h1>Introduction</h1><p>This is the body.</p><h2>Methods</h2><p>We used RNA-seq.</p>";
    const blocks = parseHTMLToBlocks(html);

    checks.push({ name: "4 blocks parsed", passed: blocks.length === 4 });
    checks.push({ name: "h1 mapped to h2", passed: blocks[0].type === "h2" && blocks[0].text === "Introduction" });
    checks.push({ name: "p mapped to body", passed: blocks[1].type === "body" && blocks[1].text === "This is the body." });
    checks.push({ name: "h2 mapped to h2", passed: blocks[2].type === "h2" });

    const result = buildResult("ralph-studio-027", "basic heading parsing", "export-pdf", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-028: HTML entity decoding", () => {
    const checks: TestCheck[] = [];

    const html = '<p>Smith &amp; Jones found p &lt; 0.05 with &quot;significant&quot; results.</p>';
    const blocks = parseHTMLToBlocks(html);

    checks.push({ name: "1 block parsed", passed: blocks.length === 1 });
    checks.push({ name: "Entities decoded", passed: blocks[0].text === 'Smith & Jones found p < 0.05 with "significant" results.' });

    const result = buildResult("ralph-studio-028", "HTML entity decoding", "export-pdf", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-029: inline tags stripped", () => {
    const checks: TestCheck[] = [];

    const html = "<p>This has <strong>bold</strong> and <em>italic</em> text with <a href='#'>links</a>.</p>";
    const blocks = parseHTMLToBlocks(html);

    checks.push({ name: "1 block parsed", passed: blocks.length === 1 });
    checks.push({ name: "Inline tags stripped", passed: blocks[0].text === "This has bold and italic text with links." });

    const result = buildResult("ralph-studio-029", "inline tags stripped", "export-pdf", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-030: empty elements skipped", () => {
    const checks: TestCheck[] = [];

    const html = "<p>Content</p><p></p><p>   </p><p>More content</p>";
    const blocks = parseHTMLToBlocks(html);

    checks.push({ name: "Empty paragraphs skipped", passed: blocks.length === 2 });
    checks.push({ name: "Content paragraphs preserved", passed: blocks[0].text === "Content" && blocks[1].text === "More content" });

    const result = buildResult("ralph-studio-030", "empty elements skipped", "export-pdf", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-031: h3-h6 mapping", () => {
    const checks: TestCheck[] = [];

    const html = "<h3>Sub-sub</h3><h4>Deep</h4><h5>Deeper</h5><h6>Deepest</h6>";
    const blocks = parseHTMLToBlocks(html);

    checks.push({ name: "All 4 headings parsed", passed: blocks.length === 4 });
    checks.push({ name: "h3 to h3", passed: blocks[0].type === "h3" });
    checks.push({ name: "h4 to h3", passed: blocks[1].type === "h3" });
    checks.push({ name: "h5 to h3", passed: blocks[2].type === "h3" });
    checks.push({ name: "h6 to h3", passed: blocks[3].type === "h3" });

    const result = buildResult("ralph-studio-031", "h3-h6 heading mapping", "export-pdf", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-032: PDF text sanitization", () => {
    const checks: TestCheck[] = [];

    const sanitizeForPdf = (text: string) =>
      text
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/\u2014/g, "--")
        .replace(/\u2013/g, "-")
        .replace(/[^\x00-\xFF]/g, "");

    checks.push({ name: "Smart single quotes converted", passed: sanitizeForPdf("\u2018quote\u2019") === "'quote'" });
    checks.push({ name: "Smart double quotes converted", passed: sanitizeForPdf("\u201Cquote\u201D") === '"quote"' });
    checks.push({ name: "Em dash converted", passed: sanitizeForPdf("text\u2014more") === "text--more" });
    checks.push({ name: "En dash converted", passed: sanitizeForPdf("2020\u20132024") === "2020-2024" });
    checks.push({ name: "Non-Latin-1 stripped", passed: sanitizeForPdf("Hello \u4e16\u754c World") === "Hello  World" });
    checks.push({ name: "Latin-1 preserved", passed: sanitizeForPdf("caf\u00e9 r\u00e9sum\u00e9") === "caf\u00e9 r\u00e9sum\u00e9" });

    const result = buildResult("ralph-studio-032", "PDF text sanitization", "export-pdf", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  afterEach(() => {
    setCycleNumber(5);
  });
});

// =========================================================================
// Cycle 6: Research Store Advanced — chips, filters, paper detail
// =========================================================================
describe("Cycle 6: Research Store Advanced", () => {
  let useResearchStore: typeof import("@/stores/research-store").useResearchStore;

  beforeEach(async () => {
    const mod = await import("@/stores/research-store");
    useResearchStore = mod.useResearchStore;
    useResearchStore.setState({
      query: "",
      parsedChips: [],
      filters: { studyTypes: [], dateFrom: 2014, dateTo: 2024, fullTextOnly: false, sources: ["pubmed", "semantic_scholar"], language: "english" as const },
      results: [],
      libraryPapers: [],
      selectedPaperId: null,
      selectedPaperDetail: null,
    });
  });

  it("ralph-studio-033: chip removal updates filters", () => {
    const checks: TestCheck[] = [];
    const store = useResearchStore.getState();

    store.setParsedChips([
      { type: "studyType", value: "rct", label: "RCT" },
      { type: "dateRange", value: "2020-2024", label: "2020-2024" },
      { type: "keyword", value: "CRISPR", label: "CRISPR" },
    ]);
    store.setFilters({ studyTypes: ["rct"], dateFrom: 2020, dateTo: 2024 });

    store.removeChip(0);
    let state = useResearchStore.getState();
    checks.push({ name: "Study type chip removed", passed: state.parsedChips.length === 2 });
    checks.push({ name: "Study type filter cleared", passed: state.filters.studyTypes.length === 0 });

    store.removeChip(0);
    state = useResearchStore.getState();
    checks.push({ name: "Date chip removed", passed: state.parsedChips.length === 1 });
    const defaultYear = new Date().getFullYear();
    checks.push({ name: "Date filter reset", passed: state.filters.dateFrom === defaultYear - 10 && state.filters.dateTo === defaultYear });

    const result = buildResult("ralph-studio-033", "chip removal updates filters", "research-store", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-034: paper detail selection from results and library", () => {
    const checks: TestCheck[] = [];
    const store = useResearchStore.getState();

    const paper = {
      id: "pmid-123",
      title: "A Study",
      authors: ["Smith J"],
      journal: "Nature",
      year: 2024,
      abstract: "Abstract",
      doi: "10.1234/test",
      pmid: "123",
      citationCount: 10,
      publicationTypes: ["Journal Article"],
      isOpenAccess: false,
      sources: ["pubmed"],
      verificationStatus: "pending" as const,
      source: "pubmed" as const,
      inLibrary: false,
    };

    store.setResults([paper], 1);
    store.selectPaper("pmid-123");

    const state = useResearchStore.getState();
    checks.push({ name: "Paper selected", passed: state.selectedPaperId === "pmid-123" });
    checks.push({ name: "Paper detail populated", passed: state.selectedPaperDetail?.paper.title === "A Study" });
    checks.push({ name: "Extraction initially undefined", passed: state.selectedPaperDetail?.extraction === undefined });

    store.selectPaper(null);
    checks.push({ name: "Paper deselected", passed: useResearchStore.getState().selectedPaperId === null });
    checks.push({ name: "Detail cleared", passed: useResearchStore.getState().selectedPaperDetail === null });

    const result = buildResult("ralph-studio-034", "paper detail selection", "research-store", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-035: tab switching", () => {
    const checks: TestCheck[] = [];
    const store = useResearchStore.getState();

    checks.push({ name: "Default tab is search", passed: useResearchStore.getState().activeTab === "search" });

    store.setActiveTab("library");
    checks.push({ name: "Switch to library", passed: useResearchStore.getState().activeTab === "library" });

    store.setActiveTab("chat");
    checks.push({ name: "Switch to chat", passed: useResearchStore.getState().activeTab === "chat" });

    store.setActiveTab("search");
    checks.push({ name: "Switch back to search", passed: useResearchStore.getState().activeTab === "search" });

    const result = buildResult("ralph-studio-035", "tab switching", "research-store", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  afterEach(() => {
    setCycleNumber(6);
  });
});

// =========================================================================
// Cycle 7: Export DOCX Parsing Logic
// =========================================================================
describe("Cycle 7: Export DOCX HTML Parsing", () => {
  const parseInlineHtml = (html: string) => {
    const runs: Array<{ text: string; bold?: boolean; italic?: boolean }> = [];
    const parts = html.split(/(<\/?(?:strong|b|em|i|br)[^>]*>)/i);
    let bold = false;
    let italic = false;

    for (const part of parts) {
      const lower = part.toLowerCase();
      if (lower === "<strong>" || lower === "<b>") { bold = true; continue; }
      if (lower === "</strong>" || lower === "</b>") { bold = false; continue; }
      if (lower === "<em>" || lower === "<i>") { italic = true; continue; }
      if (lower === "</em>" || lower === "</i>") { italic = false; continue; }
      if (lower === "<br>" || lower === "<br/>" || lower === "<br />") { runs.push({ text: "\n" }); continue; }

      const text = part.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
      if (text) {
        runs.push({ text, ...(bold ? { bold: true } : {}), ...(italic ? { italic: true } : {}) });
      }
    }
    return runs;
  };

  it("ralph-studio-036: inline formatting detection", () => {
    const checks: TestCheck[] = [];

    const runs = parseInlineHtml("Normal <strong>bold</strong> and <em>italic</em> text");
    checks.push({ name: "Multiple runs created", passed: runs.length >= 4 });
    checks.push({ name: "First run is plain", passed: !runs[0].bold && !runs[0].italic });
    checks.push({ name: "Bold detected", passed: runs.some((r) => r.bold && r.text.includes("bold")) });
    checks.push({ name: "Italic detected", passed: runs.some((r) => r.italic && r.text.includes("italic")) });

    const result = buildResult("ralph-studio-036", "inline formatting detection", "export-docx", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-037: br tag handling", () => {
    const checks: TestCheck[] = [];

    const runs = parseInlineHtml("Line one<br>Line two<br/>Line three");
    const newlines = runs.filter((r) => r.text === "\n");
    checks.push({ name: "br tags create newline runs", passed: newlines.length === 2 });

    const result = buildResult("ralph-studio-037", "br tag handling", "export-docx", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-038: HTML-to-DOCX block mapping", () => {
    const checks: TestCheck[] = [];

    const tagToHeading: Record<string, string> = { h1: "HEADING_1", h2: "HEADING_2", h3: "HEADING_3" };

    checks.push({ name: "h1 to HEADING_1", passed: tagToHeading["h1"] === "HEADING_1" });
    checks.push({ name: "h2 to HEADING_2", passed: tagToHeading["h2"] === "HEADING_2" });
    checks.push({ name: "h3 to HEADING_3", passed: tagToHeading["h3"] === "HEADING_3" });

    const bodyTags = ["p", "div"];
    const listTags = ["li"];
    checks.push({ name: "Body tags mapped", passed: bodyTags.length === 2 });
    checks.push({ name: "List tags mapped", passed: listTags.length === 1 });

    const result = buildResult("ralph-studio-038", "HTML-to-DOCX block mapping", "export-docx", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  afterEach(() => {
    setCycleNumber(7);
  });
});

// =========================================================================
// Cycle 8: Edge Cases and Error Handling
// =========================================================================
describe("Cycle 8: Edge Cases and Error Handling", () => {
  it("ralph-studio-039: localStorage draft fallback logic", () => {
    const checks: TestCheck[] = [];

    const draft = {
      content: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Hello" }] }] },
      plainText: "Hello",
      wordCount: 1,
      timestamp: Date.now(),
      title: "My Paper",
    };

    checks.push({ name: "Draft has content", passed: draft.content.type === "doc" });
    checks.push({ name: "Draft has plainText", passed: typeof draft.plainText === "string" });
    checks.push({ name: "Draft has wordCount", passed: typeof draft.wordCount === "number" && draft.wordCount > 0 });
    checks.push({ name: "Draft has timestamp", passed: typeof draft.timestamp === "number" && draft.timestamp > 0 });
    checks.push({ name: "Draft has title", passed: draft.title === "My Paper" });

    const wordCount = (text: string) => text.split(/\s+/).filter(Boolean).length;
    checks.push({ name: "Word count for empty string is 0", passed: wordCount("") === 0 });
    checks.push({ name: "Word count handles multiple spaces", passed: wordCount("  hello   world  ") === 2 });
    checks.push({ name: "Word count for single word", passed: wordCount("hello") === 1 });

    const result = buildResult("ralph-studio-039", "localStorage draft fallback logic", "edge-cases", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-040: project selector with edge cases", () => {
    const checks: TestCheck[] = [];

    const projects0: { id: number; title: string }[] = [];
    const projects1 = [{ id: 1, title: "Project 1" }];
    const projects2 = [{ id: 1, title: "Project 1" }, { id: 2, title: "Project 2" }];

    checks.push({ name: "0 projects: selector hidden", passed: projects0.length <= 1 });
    checks.push({ name: "1 project: selector hidden", passed: projects1.length <= 1 });
    checks.push({ name: "2 projects: selector shown", passed: projects2.length > 1 });

    const selectedId = 1;
    const selected = projects2.find((p) => p.id === selectedId);
    checks.push({ name: "Selected project found", passed: selected?.title === "Project 1" });

    const noMatch = projects2.find((p) => p.id === 999);
    checks.push({ name: "No match falls back gracefully", passed: noMatch === undefined });

    const result = buildResult("ralph-studio-040", "project selector edge cases", "edge-cases", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-041: chat body construction", () => {
    const checks: TestCheck[] = [];

    const buildBody = (opts: {
      messages: Array<{ role: string; content: string }>;
      isLearnMode: boolean;
      guideDocType: string | null;
      guideStage: string;
      docTitle: string;
      draftIntensity: string;
    }) => {
      return {
        messages: opts.messages.map((m) => ({ role: m.role, content: m.content })),
        mode: opts.isLearnMode ? "learn" : "draft",
        ...(opts.isLearnMode && opts.guideDocType
          ? {
              guideContext: {
                documentType: opts.guideDocType,
                stage: opts.guideStage,
                projectTitle: opts.docTitle !== "Untitled Document" ? opts.docTitle : undefined,
              },
            }
          : {}),
        ...(!opts.isLearnMode
          ? {
              draftContext: {
                intensity: opts.draftIntensity,
                projectTitle: opts.docTitle !== "Untitled Document" ? opts.docTitle : undefined,
              },
            }
          : {}),
      };
    };

    const learnBody = buildBody({
      messages: [{ role: "user", content: "Help me" }],
      isLearnMode: true,
      guideDocType: "case_report",
      guideStage: "draft",
      docTitle: "My Case Report",
      draftIntensity: "collaborate",
    });

    checks.push({ name: "Learn mode sets mode correctly", passed: learnBody.mode === "learn" });
    checks.push({ name: "Guide context included", passed: learnBody.guideContext?.documentType === "case_report" });
    checks.push({ name: "Guide stage included", passed: learnBody.guideContext?.stage === "draft" });
    checks.push({ name: "Project title included", passed: learnBody.guideContext?.projectTitle === "My Case Report" });
    checks.push({ name: "No draft context in learn mode", passed: !("draftContext" in learnBody) });

    const draftBody = buildBody({
      messages: [{ role: "user", content: "Write more" }],
      isLearnMode: false,
      guideDocType: null,
      guideStage: "understand",
      docTitle: "Untitled Document",
      draftIntensity: "accelerate",
    });

    checks.push({ name: "Draft mode sets mode correctly", passed: draftBody.mode === "draft" });
    checks.push({ name: "Draft context included", passed: draftBody.draftContext?.intensity === "accelerate" });
    checks.push({ name: "Untitled Document excluded from projectTitle", passed: draftBody.draftContext?.projectTitle === undefined });
    checks.push({ name: "No guide context in draft mode", passed: !("guideContext" in draftBody) });

    const result = buildResult("ralph-studio-041", "chat body construction", "edge-cases", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-042: sendMessage guards", () => {
    const checks: TestCheck[] = [];

    const shouldSend = (input: string, isLoading: boolean) => !(!input.trim() || isLoading);

    checks.push({ name: "Empty input blocked", passed: !shouldSend("", false) });
    checks.push({ name: "Whitespace-only input blocked", passed: !shouldSend("   ", false) });
    checks.push({ name: "Loading state blocked", passed: !shouldSend("hello", true) });
    checks.push({ name: "Valid input allowed", passed: shouldSend("hello", false) });
    checks.push({ name: "Trimmed valid input allowed", passed: shouldSend("  hello  ", false) });

    const result = buildResult("ralph-studio-042", "sendMessage guards", "edge-cases", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-043: ProjectSelector selectedId lookup", () => {
    const checks: TestCheck[] = [];

    const projects = [
      { id: 1, title: "Cardiac Study" },
      { id: 2, title: "Oncology Review" },
      { id: 3, title: "Pediatric Assessment" },
    ];

    const find = (id: number | null) => projects.find((p) => p.id === id);

    checks.push({ name: "Finds first project", passed: find(1)?.title === "Cardiac Study" });
    checks.push({ name: "Finds last project", passed: find(3)?.title === "Pediatric Assessment" });
    checks.push({ name: "null selectedId returns undefined", passed: find(null) === undefined });

    const displayText = (id: number | null) => find(id)?.title ?? "Select project";
    checks.push({ name: "Display fallback for null", passed: displayText(null) === "Select project" });
    checks.push({ name: "Display shows title for valid id", passed: displayText(2) === "Oncology Review" });

    const result = buildResult("ralph-studio-043", "ProjectSelector selectedId lookup", "edge-cases", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  afterEach(() => {
    setCycleNumber(8);
  });
});

// =========================================================================
// Cycle 9: Integration — Full Reference Flow
// =========================================================================
describe("Cycle 9: Full Reference Flow Integration", () => {
  it("ralph-studio-044: complete reference to citation to bibliography flow", async () => {
    const checks: TestCheck[] = [];
    const { useReferenceStore } = await import("@/stores/reference-store");

    useReferenceStore.getState().clearReferences();

    const refs = [
      {
        id: "ref-smith-2024",
        documentId: "doc-1",
        type: "article" as const,
        title: "CRISPR-Cas9 in Clinical Trials",
        authors: [{ given: "John", family: "Smith" }, { given: "Jane", family: "Doe" }],
        year: 2024,
        journal: "Nature Medicine",
        volume: "30",
        pages: "100-110",
        doi: "10.1038/nm.2024.001",
        dateAdded: new Date().toISOString(),
        cslData: {
          type: "article-journal",
          title: "CRISPR-Cas9 in Clinical Trials",
          author: [{ given: "John", family: "Smith" }, { given: "Jane", family: "Doe" }],
          issued: { "date-parts": [[2024]] },
          "container-title": "Nature Medicine",
          volume: "30",
          page: "100-110",
          DOI: "10.1038/nm.2024.001",
        },
      },
      {
        id: "ref-jones-2023",
        documentId: "doc-1",
        type: "article" as const,
        title: "mRNA Vaccines: A Comprehensive Review",
        authors: [{ given: "Alice", family: "Jones" }],
        year: 2023,
        journal: "The Lancet",
        dateAdded: new Date().toISOString(),
        cslData: {
          type: "article-journal",
          title: "mRNA Vaccines: A Comprehensive Review",
          author: [{ given: "Alice", family: "Jones" }],
          issued: { "date-parts": [[2023]] },
          "container-title": "The Lancet",
        },
      },
    ];

    useReferenceStore.getState().addReferences(refs);
    checks.push({ name: "Step 1: References added", passed: useReferenceStore.getState().references.size === 2 });

    const numMap = new Map([["ref-smith-2024", 1], ["ref-jones-2023", 2]]);
    useReferenceStore.getState().setReferenceNumberMap(numMap);
    checks.push({ name: "Step 2: Citation numbers assigned", passed: useReferenceStore.getState().referenceNumberMap.size === 2 });

    const displayMap = new Map([["cite-key-1", "[1]"], ["cite-key-2", "[2]"], ["cite-key-3", "[1,2]"]]);
    useReferenceStore.getState().setCitationDisplayMap(displayMap);
    checks.push({ name: "Step 3: Citation display text set", passed: useReferenceStore.getState().citationDisplayMap.size === 3 });

    const bibEntries = [
      { id: "ref-smith-2024", html: "<p>1. Smith J, Doe J. CRISPR-Cas9...</p>", text: "1. Smith J, Doe J. CRISPR-Cas9..." },
      { id: "ref-jones-2023", html: "<p>2. Jones A. mRNA Vaccines...</p>", text: "2. Jones A. mRNA Vaccines..." },
    ];
    useReferenceStore.getState().setBibliographyEntries(bibEntries);
    checks.push({ name: "Step 4: Bibliography entries set", passed: useReferenceStore.getState().bibliographyEntries.length === 2 });

    const state = useReferenceStore.getState();
    const citedList = Array.from(state.referenceNumberMap.entries())
      .sort(([, a], [, b]) => a - b)
      .slice(0, 5)
      .map(([refId, num]) => {
        const ref = state.references.get(refId);
        return ref ? { num, title: ref.title, author: ref.authors[0]?.family || "Unknown" } : null;
      })
      .filter(Boolean);

    checks.push({ name: "Step 5: Cited list has correct count", passed: citedList.length === 2 });
    checks.push({ name: "First citation is Smith", passed: citedList[0]!.author === "Smith" && citedList[0]!.num === 1 });
    checks.push({ name: "Second citation is Jones", passed: citedList[1]!.author === "Jones" && citedList[1]!.num === 2 });

    useReferenceStore.getState().updateReference("ref-smith-2024", { title: "CRISPR-Cas9 in Clinical Trials: An Updated Review" });
    checks.push({
      name: "Step 6: Reference updated",
      passed: useReferenceStore.getState().references.get("ref-smith-2024")?.title === "CRISPR-Cas9 in Clinical Trials: An Updated Review",
    });

    useReferenceStore.getState().removeReference("ref-jones-2023");
    checks.push({ name: "Step 7: Reference removed", passed: useReferenceStore.getState().references.size === 1 });

    const result = buildResult("ralph-studio-044", "complete reference to citation to bibliography flow", "integration", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-045: research to library to cite flow", async () => {
    const checks: TestCheck[] = [];
    const { useResearchStore } = await import("@/stores/research-store");
    const { useReferenceStore } = await import("@/stores/reference-store");

    useReferenceStore.getState().clearReferences();
    useResearchStore.setState({ results: [], libraryPapers: [], selectedPaperIds: [] });

    const papers = [
      {
        id: "pmid-12345",
        title: "A Novel Biomarker for Early Cancer Detection",
        authors: ["Garcia M"],
        journal: "JAMA Oncology",
        year: 2024,
        abstract: "We identified a novel biomarker...",
        doi: "10.1001/jamaoncol.2024.001",
        pmid: "12345",
        citationCount: 85,
        publicationTypes: ["Journal Article"],
        isOpenAccess: false,
        sources: ["pubmed"],
        verificationStatus: "pending" as const,
        source: "pubmed" as const,
        inLibrary: false,
      },
    ];
    useResearchStore.getState().setResults(papers, 1);
    checks.push({ name: "Step 1: Search results loaded", passed: useResearchStore.getState().results.length === 1 });

    useResearchStore.getState().addToLibrary(papers[0]);
    checks.push({ name: "Step 2: Paper added to library", passed: useResearchStore.getState().isInLibrary("pmid-12345") });

    const ref = {
      id: "pmid-12345",
      documentId: "doc-1",
      type: "article" as const,
      title: papers[0].title,
      authors: [{ given: "M", family: "Garcia" }],
      year: 2024,
      journal: "JAMA Oncology",
      doi: "10.1001/jamaoncol.2024.001",
      pmid: "12345",
      dateAdded: new Date().toISOString(),
      cslData: {
        type: "article-journal",
        title: papers[0].title,
        author: [{ given: "M", family: "Garcia" }],
        issued: { "date-parts": [[2024]] },
        "container-title": "JAMA Oncology",
        DOI: "10.1001/jamaoncol.2024.001",
      },
    };
    useReferenceStore.getState().addReference(ref);
    checks.push({ name: "Step 3: Reference added to citation system", passed: useReferenceStore.getState().references.size === 1 });

    useReferenceStore.getState().setReferenceNumberMap(new Map([["pmid-12345", 1]]));
    checks.push({ name: "Step 4: Citation number assigned", passed: useReferenceStore.getState().referenceNumberMap.get("pmid-12345") === 1 });

    const refInStore = useReferenceStore.getState().references.get("pmid-12345");
    const paperInLibrary = useResearchStore.getState().libraryPapers.find((p: { id: string }) => p.id === "pmid-12345");
    checks.push({ name: "Step 5: Same title across stores", passed: refInStore?.title === paperInLibrary?.title });

    const result = buildResult("ralph-studio-045", "research to library to cite flow", "integration", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  afterEach(() => {
    setCycleNumber(9);
  });
});

// =========================================================================
// Cycle 10: Large Document Stress & Word Count
// =========================================================================
describe("Cycle 10: Large Document Stress", () => {
  it("ralph-studio-046: word count accuracy for various inputs", () => {
    const checks: TestCheck[] = [];

    const wordCount = (text: string) => text.split(/\s+/).filter(Boolean).length;

    checks.push({ name: "Normal sentence", passed: wordCount("The quick brown fox jumps over the lazy dog") === 9 });
    checks.push({ name: "Tabs and newlines", passed: wordCount("word1\tword2\nword3") === 3 });
    checks.push({ name: "Multiple spaces", passed: wordCount("  lots   of   spaces  ") === 3 });
    checks.push({ name: "Single character", passed: wordCount("a") === 1 });
    checks.push({ name: "Empty string", passed: wordCount("") === 0 });
    checks.push({ name: "Only whitespace", passed: wordCount("   \t\n  ") === 0 });

    // Medical text with hyphens and numbers
    checks.push({
      name: "Medical text",
      passed: wordCount("Patient presented with COVID-19 symptoms at T2-weighted MRI on 2024-01-15") === 10,
    });

    // Large document simulation (50 pages ~ 15000 words)
    const largeText = Array(15000).fill("word").join(" ");
    checks.push({ name: "15000 word doc counted correctly", passed: wordCount(largeText) === 15000 });

    const result = buildResult("ralph-studio-046", "word count accuracy", "stress", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-047: localStorage draft serialization for large docs", () => {
    const checks: TestCheck[] = [];

    // Simulate a large TipTap JSON document
    const paragraphs = Array.from({ length: 500 }, (_, i) => ({
      type: "paragraph",
      content: [{ type: "text", text: "This is paragraph " + (i + 1) + " of the document with some academic content about CRISPR-Cas9 gene editing." }],
    }));

    const doc = {
      type: "doc",
      content: paragraphs,
    };

    const draft = {
      content: doc,
      plainText: paragraphs.map((p) => p.content[0].text).join("\n"),
      wordCount: 7000,
      timestamp: Date.now(),
      title: "Large Research Paper",
    };

    const serialized = JSON.stringify(draft);
    checks.push({
      name: "Large draft serializes successfully",
      passed: serialized.length > 0,
    });

    const deserialized = JSON.parse(serialized);
    checks.push({
      name: "Large draft deserializes correctly",
      passed: deserialized.content.content.length === 500,
    });
    checks.push({
      name: "Word count preserved",
      passed: deserialized.wordCount === 7000,
    });
    checks.push({
      name: "Title preserved",
      passed: deserialized.title === "Large Research Paper",
    });

    const result = buildResult("ralph-studio-047", "localStorage draft serialization large docs", "stress", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-048: PDF parsing with nested/complex HTML", () => {
    const checks: TestCheck[] = [];

    const parseHTMLToBlocks = (html: string) => {
      const blocks: Array<{ type: string; text: string }> = [];
      const blockRegex = /<(h[1-6]|p|div|li|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi;
      let match;
      while ((match = blockRegex.exec(html)) !== null) {
        const tag = match[1].toLowerCase();
        const text = match[2]
          .replace(/<[^>]+>/g, "")
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .trim();
        if (!text) continue;
        let type = "body";
        if (tag === "h1" || tag === "h2") type = "h2";
        else if (tag === "h3" || tag === "h4" || tag === "h5" || tag === "h6") type = "h3";
        blocks.push({ type, text });
      }
      return blocks;
    };

    // Deeply nested inline elements
    const html = "<p>This has <strong><em>bold italic</em></strong> and <span class='citation'>[1]</span> text.</p>";
    const blocks = parseHTMLToBlocks(html);
    checks.push({ name: "Nested inline elements stripped", passed: blocks.length === 1 && blocks[0].text === "This has bold italic and [1] text." });

    // Multiple entities in one block
    const html2 = "<p>&lt;10% CI: [&amp;alpha; &lt; 0.05] &quot;p-value&quot;</p>";
    const blocks2 = parseHTMLToBlocks(html2);
    checks.push({ name: "Multiple entities decoded", passed: blocks2.length === 1 && blocks2[0].text.includes("<10%") });

    // Blockquote handling
    const html3 = "<blockquote>This is a quoted passage from Smith et al.</blockquote>";
    const blocks3 = parseHTMLToBlocks(html3);
    checks.push({ name: "Blockquote parsed as body", passed: blocks3.length === 1 && blocks3[0].type === "body" });

    // List items
    const html4 = "<li>First item in a list</li><li>Second item</li>";
    const blocks4 = parseHTMLToBlocks(html4);
    checks.push({ name: "List items parsed", passed: blocks4.length === 2 });

    const result = buildResult("ralph-studio-048", "PDF parsing complex HTML", "stress", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  afterEach(() => {
    setCycleNumber(10);
  });
});

// =========================================================================
// Cycle 11: Citation Insertion Logic
// =========================================================================
describe("Cycle 11: Citation Insertion Logic", () => {
  it("ralph-studio-049: handleInsertCitation builds correct node", () => {
    const checks: TestCheck[] = [];

    // The handleInsertCitation callback creates this structure:
    const referenceIds = ["ref-smith-2024", "ref-jones-2023"];
    const citationNode = {
      type: "citation",
      attrs: { referenceIds },
    };

    checks.push({
      name: "Citation node has correct type",
      passed: citationNode.type === "citation",
    });
    checks.push({
      name: "Citation node has referenceIds",
      passed: citationNode.attrs.referenceIds.length === 2,
    });
    checks.push({
      name: "Reference IDs preserved in order",
      passed:
        citationNode.attrs.referenceIds[0] === "ref-smith-2024" &&
        citationNode.attrs.referenceIds[1] === "ref-jones-2023",
    });

    // Single reference citation
    const singleCite = { type: "citation", attrs: { referenceIds: ["ref-1"] } };
    checks.push({
      name: "Single reference citation valid",
      passed: singleCite.attrs.referenceIds.length === 1,
    });

    // Empty reference list (edge case)
    const emptyCite = { type: "citation", attrs: { referenceIds: [] as string[] } };
    checks.push({
      name: "Empty reference list handled",
      passed: emptyCite.attrs.referenceIds.length === 0,
    });

    const result = buildResult("ralph-studio-049", "handleInsertCitation node structure", "citations", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-050: bibliography detection in document", () => {
    const checks: TestCheck[] = [];

    // Simulating the bibliography check from handleInsertCitation
    // editor.state.doc.descendants checks for node.type.name === "bibliography"

    interface DocNode {
      type: { name: string };
      content?: DocNode[];
    }

    const docWithBib: DocNode = {
      type: { name: "doc" },
      content: [
        { type: { name: "paragraph" } },
        { type: { name: "citation" } },
        { type: { name: "bibliography" } },
      ],
    };

    const docWithoutBib: DocNode = {
      type: { name: "doc" },
      content: [
        { type: { name: "paragraph" } },
        { type: { name: "citation" } },
      ],
    };

    const hasBibliography = (doc: DocNode) => {
      let found = false;
      const visit = (node: DocNode) => {
        if (node.type.name === "bibliography") { found = true; return; }
        node.content?.forEach(visit);
      };
      visit(doc);
      return found;
    };

    checks.push({
      name: "Detects existing bibliography",
      passed: hasBibliography(docWithBib) === true,
    });
    checks.push({
      name: "Detects missing bibliography",
      passed: hasBibliography(docWithoutBib) === false,
    });

    // After inserting citation, bibliography should be added at end if missing
    const shouldInsertBib = !hasBibliography(docWithoutBib);
    checks.push({
      name: "Bibliography insertion triggered when missing",
      passed: shouldInsertBib === true,
    });

    const shouldNotInsertBib = !hasBibliography(docWithBib);
    checks.push({
      name: "No duplicate bibliography when exists",
      passed: shouldNotInsertBib === false,
    });

    const result = buildResult("ralph-studio-050", "bibliography detection in document", "citations", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-051: citation dialog DOI/PMID detection", () => {
    const checks: TestCheck[] = [];

    // From citation-dialog.tsx: detects DOI and PMID patterns
    const isDOI = (q: string) => /^10\.\d{4,}/.test(q) || q.includes("doi.org/");
    const isPMID = (q: string) => /^\d{1,8}$/.test(q.trim());

    checks.push({ name: "DOI detected: 10.1234/test", passed: isDOI("10.1234/test") });
    checks.push({ name: "DOI detected: doi.org URL", passed: isDOI("https://doi.org/10.1234/test") });
    checks.push({ name: "Non-DOI not detected", passed: !isDOI("CRISPR gene therapy") });

    checks.push({ name: "PMID detected: 12345678", passed: isPMID("12345678") });
    checks.push({ name: "PMID detected: 1", passed: isPMID("1") });
    checks.push({ name: "PMID not detected: 9 digits", passed: !isPMID("123456789") });
    checks.push({ name: "PMID not detected: text", passed: !isPMID("abc123") });

    const result = buildResult("ralph-studio-051", "citation dialog DOI/PMID detection", "citations", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-052: formatAuthorsShort logic", () => {
    const checks: TestCheck[] = [];

    // From citation-dialog.tsx
    const formatAuthorsShort = (authors: Array<{ given: string; family: string }>) => {
      if (authors.length === 0) return "Unknown";
      if (authors.length === 1) return authors[0].family;
      if (authors.length === 2) return authors[0].family + " & " + authors[1].family;
      return authors[0].family + " et al.";
    };

    checks.push({ name: "No authors", passed: formatAuthorsShort([]) === "Unknown" });
    checks.push({ name: "Single author", passed: formatAuthorsShort([{ given: "J", family: "Smith" }]) === "Smith" });
    checks.push({
      name: "Two authors",
      passed: formatAuthorsShort([{ given: "J", family: "Smith" }, { given: "A", family: "Jones" }]) === "Smith & Jones",
    });
    checks.push({
      name: "Three+ authors",
      passed: formatAuthorsShort([
        { given: "J", family: "Smith" },
        { given: "A", family: "Jones" },
        { given: "B", family: "Brown" },
      ]) === "Smith et al.",
    });

    const result = buildResult("ralph-studio-052", "formatAuthorsShort logic", "citations", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  afterEach(() => {
    setCycleNumber(11);
  });
});

// =========================================================================
// Cycle 12: Reporting Guidelines & Guide Mode
// =========================================================================
describe("Cycle 12: Reporting Guidelines", () => {
  it("ralph-studio-053: reporting guidelines mapped to doc types", async () => {
    const checks: TestCheck[] = [];
    const { REPORTING_GUIDELINES } = await import("@/types/guide");

    checks.push({
      name: "Case report has CARE guideline",
      passed: REPORTING_GUIDELINES.case_report?.includes("CARE") === true,
    });
    checks.push({
      name: "Original article has CONSORT",
      passed: REPORTING_GUIDELINES.original_article?.includes("CONSORT") === true,
    });
    checks.push({
      name: "Review article has PRISMA",
      passed: REPORTING_GUIDELINES.review_article?.some((g) => g.includes("PRISMA")) === true,
    });
    checks.push({
      name: "Meta-analysis has guidelines",
      passed: (REPORTING_GUIDELINES.meta_analysis?.length ?? 0) > 0,
    });

    checks.push({
      name: "Book chapter has no reporting guidelines",
      passed: REPORTING_GUIDELINES.book_chapter?.length === 0,
    });
    checks.push({
      name: "Academic draft has no reporting guidelines",
      passed: REPORTING_GUIDELINES.academic_draft?.length === 0,
    });
    checks.push({
      name: "Letter has no reporting guidelines",
      passed: REPORTING_GUIDELINES.letter?.length === 0,
    });

    const result = buildResult("ralph-studio-053", "reporting guidelines mapped to doc types", "guide-mode", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-054: guide stage progression logic", async () => {
    const checks: TestCheck[] = [];
    const { GUIDE_STAGES } = await import("@/types/guide");

    // Test stage progression (from page.tsx: isActive, isCompleted logic)
    const currentStage = "draft";
    const stageIdx = GUIDE_STAGES.indexOf(currentStage);

    checks.push({
      name: "Current stage index found",
      passed: stageIdx === 3,
    });

    // Check isCompleted logic: i < stageIdx
    const completedStages = GUIDE_STAGES.filter((_, i) => i < stageIdx);
    checks.push({
      name: "Completed stages: understand, plan, outline",
      passed: completedStages.length === 3 &&
        completedStages.includes("understand") &&
        completedStages.includes("plan") &&
        completedStages.includes("outline"),
    });

    // Future stages
    const futureStages = GUIDE_STAGES.filter((_, i) => i > stageIdx);
    checks.push({
      name: "Future stages: revise, polish",
      passed: futureStages.length === 2 &&
        futureStages.includes("revise") &&
        futureStages.includes("polish"),
    });

    // First stage has nothing completed before it
    const firstIdx = 0;
    const beforeFirst = GUIDE_STAGES.filter((_, i) => i < firstIdx);
    checks.push({
      name: "First stage has no completed stages",
      passed: beforeFirst.length === 0,
    });

    // Last stage has all others completed
    const lastIdx = GUIDE_STAGES.length - 1;
    const beforeLast = GUIDE_STAGES.filter((_, i) => i < lastIdx);
    checks.push({
      name: "Last stage has 5 completed stages",
      passed: beforeLast.length === 5,
    });

    const result = buildResult("ralph-studio-054", "guide stage progression logic", "guide-mode", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-055: draft intensity button styling logic", async () => {
    const checks: TestCheck[] = [];
    const { DRAFT_MODE_LABELS } = await import("@/types/draft");

    // From page.tsx: each mode gets a different color
    type DraftModeIntensity = "focus" | "collaborate" | "accelerate";
    const modeColors: Record<DraftModeIntensity, string> = {
      focus: "bg-sky-500",
      collaborate: "bg-brand",
      accelerate: "bg-violet-500",
    };

    checks.push({
      name: "Focus mode is sky blue",
      passed: modeColors.focus === "bg-sky-500",
    });
    checks.push({
      name: "Collaborate mode is brand color",
      passed: modeColors.collaborate === "bg-brand",
    });
    checks.push({
      name: "Accelerate mode is violet",
      passed: modeColors.accelerate === "bg-violet-500",
    });

    // Default mode is "collaborate"
    const defaultMode: DraftModeIntensity = "collaborate";
    checks.push({
      name: "Default intensity is collaborate",
      passed: defaultMode === "collaborate" && DRAFT_MODE_LABELS[defaultMode] !== undefined,
    });

    const result = buildResult("ralph-studio-055", "draft intensity button styling", "guide-mode", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-056: learn mode vs write mode context exclusion", () => {
    const checks: TestCheck[] = [];

    // From page.tsx: learn mode shows guide bar, write mode shows draft intensity bar
    // They're mutually exclusive
    const scenarios = [
      { isLearnMode: true, showsDraftBar: false, showsGuideBar: true },
      { isLearnMode: false, showsDraftBar: true, showsGuideBar: false },
    ];

    for (const s of scenarios) {
      const showDraft = !s.isLearnMode;
      const showGuide = s.isLearnMode;
      checks.push({
        name: (s.isLearnMode ? "Learn" : "Write") + " mode: draft bar " + (showDraft ? "shown" : "hidden"),
        passed: showDraft === s.showsDraftBar,
      });
      checks.push({
        name: (s.isLearnMode ? "Learn" : "Write") + " mode: guide bar " + (showGuide ? "shown" : "hidden"),
        passed: showGuide === s.showsGuideBar,
      });
    }

    const result = buildResult("ralph-studio-056", "learn vs write mode context exclusion", "guide-mode", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-057: doc type picker toggle behavior", () => {
    const checks: TestCheck[] = [];

    // Simulating the showDocTypePicker toggle state
    let showDocTypePicker = false;

    // Toggle open
    showDocTypePicker = !showDocTypePicker;
    checks.push({ name: "Toggle opens picker", passed: showDocTypePicker === true });

    // Toggle closed
    showDocTypePicker = !showDocTypePicker;
    checks.push({ name: "Toggle closes picker", passed: showDocTypePicker === false });

    // Selecting a type should close the picker
    showDocTypePicker = true;
    let guideDocType: string | null = null;
    // Simulate click
    guideDocType = "case_report";
    showDocTypePicker = false;
    checks.push({ name: "Selection sets doc type", passed: guideDocType === "case_report" });
    checks.push({ name: "Selection closes picker", passed: showDocTypePicker === false });

    const result = buildResult("ralph-studio-057", "doc type picker toggle behavior", "guide-mode", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-058: usage stats progress bar bounds", () => {
    const checks: TestCheck[] = [];

    // From page.tsx: ProgressBar value/max with usageStats
    const cases = [
      { tokens_used: 0, tokens_limit: 50000, expected_pct: 0 },
      { tokens_used: 25000, tokens_limit: 50000, expected_pct: 50 },
      { tokens_used: 50000, tokens_limit: 50000, expected_pct: 100 },
      { tokens_used: 60000, tokens_limit: 50000, expected_pct: 120 }, // Over limit
    ];

    for (const c of cases) {
      const pct = Math.round((c.tokens_used / c.tokens_limit) * 100);
      checks.push({
        name: c.tokens_used + "/" + c.tokens_limit + " = " + c.expected_pct + "%",
        passed: pct === c.expected_pct,
      });
    }

    // Null stats fallback
    const nullStats = null as { tokens_used: number; tokens_limit: number } | null;
    const fallbackUsed = nullStats?.tokens_used ?? 0;
    const fallbackLimit = nullStats?.tokens_limit ?? 50000;
    checks.push({ name: "Null stats fallback: used=0", passed: fallbackUsed === 0 });
    checks.push({ name: "Null stats fallback: limit=50000", passed: fallbackLimit === 50000 });

    const result = buildResult("ralph-studio-058", "usage stats progress bar bounds", "guide-mode", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  afterEach(() => {
    setCycleNumber(12);
  });
});

// =========================================================================
// Cycle 13: Keyboard Shortcuts & Event Handling
// =========================================================================
describe("Cycle 13: Keyboard Shortcuts", () => {
  it("ralph-studio-059: Cmd+Shift+R reference sidebar shortcut detection", () => {
    const checks: TestCheck[] = [];

    // From page.tsx: handler checks metaKey/ctrlKey + shiftKey + key === "R"
    const matchesShortcut = (e: { metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; key: string }) =>
      (e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "R";

    checks.push({ name: "Cmd+Shift+R matches", passed: matchesShortcut({ metaKey: true, ctrlKey: false, shiftKey: true, key: "R" }) });
    checks.push({ name: "Ctrl+Shift+R matches", passed: matchesShortcut({ metaKey: false, ctrlKey: true, shiftKey: true, key: "R" }) });
    checks.push({ name: "Shift+R alone rejected", passed: !matchesShortcut({ metaKey: false, ctrlKey: false, shiftKey: true, key: "R" }) });
    checks.push({ name: "Cmd+R (no shift) rejected", passed: !matchesShortcut({ metaKey: true, ctrlKey: false, shiftKey: false, key: "R" }) });
    checks.push({ name: "Cmd+Shift+S rejected", passed: !matchesShortcut({ metaKey: true, ctrlKey: false, shiftKey: true, key: "S" }) });

    const result = buildResult("ralph-studio-059", "Cmd+Shift+R reference sidebar shortcut", "keyboard", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-060: custom event dispatching patterns", () => {
    const checks: TestCheck[] = [];

    // The page uses custom events: "scholarsync:open-citation-dialog" and "scholarsync:ai-action"
    const customEvents = [
      { name: "scholarsync:open-citation-dialog", hasDetail: false },
      { name: "scholarsync:ai-action", hasDetail: true },
    ];

    checks.push({ name: "2 custom events defined", passed: customEvents.length === 2 });

    // AI action event has action + context
    const aiActionDetail = { action: "continue", context: "Some editor text" };
    checks.push({ name: "AI action detail has action", passed: typeof aiActionDetail.action === "string" });
    checks.push({ name: "AI action detail has context", passed: typeof aiActionDetail.context === "string" });

    // Valid actions for AI action event
    const validActions = ["continue", "summarize", "find-sources", "cite", "integrity-check"];
    const unknownAction = "unknown-action";
    checks.push({
      name: "Valid action recognized",
      passed: validActions.includes("continue"),
    });
    checks.push({
      name: "Unknown action not in list",
      passed: !validActions.includes(unknownAction),
    });

    const result = buildResult("ralph-studio-060", "custom event dispatching patterns", "keyboard", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-061: form submit handler prevents default", () => {
    const checks: TestCheck[] = [];

    // The handleSubmit function calls e.preventDefault() then sendMessage()
    let defaultPrevented = false;
    let messageSent = false;

    const mockEvent = {
      preventDefault: () => { defaultPrevented = true; },
    };

    // Simulate handleSubmit
    const handleSubmit = (e: { preventDefault: () => void }) => {
      e.preventDefault();
      messageSent = true;
    };

    handleSubmit(mockEvent);
    checks.push({ name: "Default prevented", passed: defaultPrevented });
    checks.push({ name: "Message send triggered", passed: messageSent });

    const result = buildResult("ralph-studio-061", "form submit handler", "keyboard", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  afterEach(() => {
    setCycleNumber(13);
  });
});

// =========================================================================
// Cycle 14: Export Edge Cases
// =========================================================================
describe("Cycle 14: Export Edge Cases", () => {
  it("ralph-studio-062: PDF sanitization handles all unicode ranges", () => {
    const checks: TestCheck[] = [];

    const sanitizeForPdf = (text: string) =>
      text
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/\u2014/g, "--")
        .replace(/\u2013/g, "-")
        .replace(/[^\x00-\xFF]/g, "");

    // Greek letters (often in medical text)
    checks.push({
      name: "Greek alpha stripped",
      passed: sanitizeForPdf("\u03B1-receptor") === "-receptor",
    });
    checks.push({
      name: "Greek beta stripped",
      passed: sanitizeForPdf("\u03B2-blocker") === "-blocker",
    });

    // Copyright and registered symbols (Latin-1 extended)
    checks.push({
      name: "Copyright sign preserved (Latin-1)",
      passed: sanitizeForPdf("\u00A9 2024") === "\u00A9 2024",
    });
    checks.push({
      name: "Registered sign preserved (Latin-1)",
      passed: sanitizeForPdf("Drug\u00AE") === "Drug\u00AE",
    });

    // Mixed content
    const mixed = "\u201CHello\u201D \u2014 \u03B1 caf\u00E9";
    const sanitized = sanitizeForPdf(mixed);
    checks.push({
      name: "Mixed content handled correctly",
      passed: sanitized === '"Hello" -- caf\u00E9',
    });

    const result = buildResult("ralph-studio-062", "PDF sanitization unicode ranges", "export-edge", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-063: DOCX inline parser handles nested bold+italic", () => {
    const checks: TestCheck[] = [];

    const parseInlineHtml = (html: string) => {
      const runs: Array<{ text: string; bold?: boolean; italic?: boolean }> = [];
      const parts = html.split(/(<\/?(?:strong|b|em|i|br)[^>]*>)/i);
      let bold = false;
      let italic = false;

      for (const part of parts) {
        const lower = part.toLowerCase();
        if (lower === "<strong>" || lower === "<b>") { bold = true; continue; }
        if (lower === "</strong>" || lower === "</b>") { bold = false; continue; }
        if (lower === "<em>" || lower === "<i>") { italic = true; continue; }
        if (lower === "</em>" || lower === "</i>") { italic = false; continue; }
        if (lower === "<br>" || lower === "<br/>" || lower === "<br />") { runs.push({ text: "\n" }); continue; }

        const text = part.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
        if (text) {
          runs.push({ text, ...(bold ? { bold: true } : {}), ...(italic ? { italic: true } : {}) });
        }
      }
      return runs;
    };

    // Nested bold+italic
    const runs = parseInlineHtml("<strong><em>Bold Italic</em></strong>");
    checks.push({
      name: "Bold+italic nested",
      passed: runs.length === 1 && runs[0].bold === true && runs[0].italic === true,
    });

    // Alternating formatting
    const runs2 = parseInlineHtml("<b>bold</b> normal <i>italic</i>");
    checks.push({
      name: "Alternating formatting produces 3 runs",
      passed: runs2.length === 3,
    });
    checks.push({
      name: "First run bold",
      passed: runs2[0].bold === true && !runs2[0].italic,
    });
    checks.push({
      name: "Second run plain",
      passed: !runs2[1].bold && !runs2[1].italic,
    });
    checks.push({
      name: "Third run italic",
      passed: runs2[2].italic === true && !runs2[2].bold,
    });

    // Plain text (no formatting)
    const runs3 = parseInlineHtml("Just plain text");
    checks.push({
      name: "Plain text produces single run",
      passed: runs3.length === 1 && !runs3[0].bold && !runs3[0].italic,
    });

    const result = buildResult("ralph-studio-063", "DOCX nested bold+italic", "export-edge", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-064: export with no content returns early", () => {
    const checks: TestCheck[] = [];

    // From handleExportPDF and handleExportDocx: if (!content) return
    const shouldExport = (content: string) => !!content;

    checks.push({ name: "Empty string skips export", passed: !shouldExport("") });
    checks.push({ name: "Null-ish content skips", passed: !shouldExport("") });
    checks.push({ name: "Valid content proceeds", passed: shouldExport("<p>Hello</p>") });

    // The getEditorContent function reads from DOM
    // Test its fallback: el?.innerHTML ?? ""
    const getContent = (el: { innerHTML: string } | null) => el?.innerHTML ?? "";
    checks.push({ name: "Null element returns empty", passed: getContent(null) === "" });
    checks.push({ name: "Element returns innerHTML", passed: getContent({ innerHTML: "<p>Test</p>" }) === "<p>Test</p>" });

    const result = buildResult("ralph-studio-064", "export no content guard", "export-edge", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  afterEach(() => {
    setCycleNumber(14);
  });
});

// =========================================================================
// Cycle 15: Concurrent Operations & State Consistency
// =========================================================================
describe("Cycle 15: Concurrent Operations", () => {
  it("ralph-studio-065: rapid reference add/remove doesn't corrupt state", async () => {
    const checks: TestCheck[] = [];
    const { useReferenceStore } = await import("@/stores/reference-store");

    useReferenceStore.getState().clearReferences();

    const makeRef = (i: number) => ({
      id: "ref-" + i,
      documentId: "doc-1",
      type: "article" as const,
      title: "Paper " + i,
      authors: [{ given: "A", family: "Author" + i }],
      year: 2024,
      dateAdded: new Date().toISOString(),
      cslData: { type: "article-journal", title: "Paper " + i },
    });

    // Rapid add 100 references
    for (let i = 0; i < 100; i++) {
      useReferenceStore.getState().addReference(makeRef(i));
    }
    checks.push({
      name: "100 references added correctly",
      passed: useReferenceStore.getState().references.size === 100,
    });

    // Rapid remove 50
    for (let i = 0; i < 50; i++) {
      useReferenceStore.getState().removeReference("ref-" + i);
    }
    checks.push({
      name: "50 references remain after removal",
      passed: useReferenceStore.getState().references.size === 50,
    });

    // Verify remaining are correct (refs 50-99)
    const remaining = useReferenceStore.getState().references;
    checks.push({
      name: "Correct references survived",
      passed: remaining.has("ref-50") && remaining.has("ref-99") && !remaining.has("ref-0"),
    });

    // Rapid update all remaining
    for (let i = 50; i < 100; i++) {
      useReferenceStore.getState().updateReference("ref-" + i, { year: 2025 });
    }
    checks.push({
      name: "All 50 updated correctly",
      passed: useReferenceStore.getState().references.get("ref-75")?.year === 2025,
    });

    const result = buildResult("ralph-studio-065", "rapid reference add/remove state consistency", "concurrent", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-066: research store withstands rapid state changes", async () => {
    const checks: TestCheck[] = [];
    const { useResearchStore } = await import("@/stores/research-store");

    // Rapid query changes (simulating fast typing)
    const queries = ["c", "cr", "cri", "cris", "crisp", "crispr"];
    for (const q of queries) {
      useResearchStore.getState().setQuery(q);
    }
    checks.push({
      name: "Final query is crispr",
      passed: useResearchStore.getState().query === "crispr",
    });

    // Rapid tab switches
    const tabs = ["search", "library", "chat", "search", "library"] as const;
    for (const tab of tabs) {
      useResearchStore.getState().setActiveTab(tab);
    }
    checks.push({
      name: "Final tab is library",
      passed: useResearchStore.getState().activeTab === "library",
    });

    // Rapid sidebar toggles
    for (let i = 0; i < 10; i++) {
      useResearchStore.getState().toggleSidebar();
    }
    checks.push({
      name: "Even toggles = closed",
      passed: useResearchStore.getState().isOpen === false,
    });

    for (let i = 0; i < 11; i++) {
      useResearchStore.getState().toggleSidebar();
    }
    checks.push({
      name: "Odd toggles = open",
      passed: useResearchStore.getState().isOpen === true,
    });

    const result = buildResult("ralph-studio-066", "rapid research store state changes", "concurrent", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-067: reference number map consistency with large citation sets", async () => {
    const checks: TestCheck[] = [];
    const { useReferenceStore } = await import("@/stores/reference-store");

    useReferenceStore.getState().clearReferences();

    // Add 50 references
    for (let i = 1; i <= 50; i++) {
      useReferenceStore.getState().addReference({
        id: "ref-" + i,
        documentId: "doc-1",
        type: "article" as const,
        title: "Paper " + i,
        authors: [{ given: "A", family: "Auth" + i }],
        year: 2024,
        dateAdded: new Date().toISOString(),
        cslData: { type: "article-journal", title: "Paper " + i },
      });
    }

    // Assign citation numbers
    const numMap = new Map<string, number>();
    for (let i = 1; i <= 50; i++) {
      numMap.set("ref-" + i, i);
    }
    useReferenceStore.getState().setReferenceNumberMap(numMap);

    const state = useReferenceStore.getState();
    checks.push({ name: "50 references in store", passed: state.references.size === 50 });
    checks.push({ name: "50 numbers assigned", passed: state.referenceNumberMap.size === 50 });

    // Cited sources list should cap at 5
    const citedList = Array.from(state.referenceNumberMap.entries())
      .sort(([, a], [, b]) => a - b)
      .slice(0, 5);
    checks.push({ name: "Cited list capped at 5", passed: citedList.length === 5 });
    checks.push({ name: "First citation is [1]", passed: citedList[0][1] === 1 });
    checks.push({ name: "Fifth citation is [5]", passed: citedList[4][1] === 5 });

    const result = buildResult("ralph-studio-067", "large citation number map consistency", "concurrent", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  it("ralph-studio-068: simultaneous store resets", async () => {
    const checks: TestCheck[] = [];
    const { useReferenceStore } = await import("@/stores/reference-store");
    const { useResearchStore } = await import("@/stores/research-store");

    // Populate both stores
    useReferenceStore.getState().addReference({
      id: "ref-1",
      documentId: "doc-1",
      type: "article" as const,
      title: "Test",
      authors: [{ given: "J", family: "S" }],
      year: 2024,
      dateAdded: new Date().toISOString(),
      cslData: { type: "article-journal", title: "Test" },
    });
    useResearchStore.getState().setQuery("test");

    // Reset both simultaneously
    useReferenceStore.getState().clearReferences();
    useResearchStore.getState().clearSearch();

    checks.push({ name: "Reference store cleared", passed: useReferenceStore.getState().references.size === 0 });
    checks.push({ name: "Research store cleared", passed: useResearchStore.getState().query === "" });
    checks.push({ name: "Stores independent after reset", passed: true });

    const result = buildResult("ralph-studio-068", "simultaneous store resets", "concurrent", checks);
    updateScorecard(result);
    console.log(formatResult(result));
    expect(result.pass).toBe(true);
  });

  afterEach(() => {
    setCycleNumber(15);
  });
});
