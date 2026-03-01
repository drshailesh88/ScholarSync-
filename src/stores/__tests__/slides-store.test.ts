import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ---------------------------------------------------------------------------
// Hoisted mocks
// ---------------------------------------------------------------------------
const { mockGetDeck, mockUpdateDeck, mockCreateSlide, mockDeleteSlide, mockReorderSlides, mockUpdateSlide } = vi.hoisted(() => ({
  mockGetDeck: vi.fn(),
  mockUpdateDeck: vi.fn(),
  mockCreateSlide: vi.fn(),
  mockDeleteSlide: vi.fn(),
  mockReorderSlides: vi.fn(),
  mockUpdateSlide: vi.fn(),
}));

vi.mock("@/lib/actions/presentations", () => ({
  getDeck: mockGetDeck,
  updateDeck: mockUpdateDeck,
  createSlide: mockCreateSlide,
  updateSlide: mockUpdateSlide,
  deleteSlide: mockDeleteSlide,
  reorderSlides: mockReorderSlides,
}));

// ---------------------------------------------------------------------------
// Import under test
// ---------------------------------------------------------------------------
import { useSlidesStore } from "../slides-store";
import type { SlideState } from "../slides-store";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function resetStore() {
  useSlidesStore.setState({
    deckId: null,
    title: "",
    description: "",
    audienceType: "general",
    themeKey: "modern",
    slides: [],
    activeSlideId: null,
    selectedBlockIndex: null,
    mode: "slides",
    rightPanel: "properties",
    agentMode: "draft",
    isPresenting: false,
    showSharePanel: false,
    saveStatus: "idle",
    _saveTimer: null,
    _undoStack: [],
    _redoStack: [],
    _undoTimer: null,
    _pendingUndoBefore: null,
    _pendingUndoSlideId: null,
  });
}

const mockSlide: SlideState = {
  id: 1,
  sortOrder: 0,
  layout: "title_content",
  title: "Test Slide",
  subtitle: "",
  contentBlocks: [],
  speakerNotes: "",
};

const mockSlide2: SlideState = {
  id: 2,
  sortOrder: 1,
  layout: "two_column",
  title: "Second Slide",
  subtitle: "",
  contentBlocks: [],
  speakerNotes: "Some notes",
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("slides-store", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetStore();
  });

  // -----------------------------------------------------------------------
  // Initial state
  // -----------------------------------------------------------------------
  describe("initial state", () => {
    it("starts with default values", () => {
      const state = useSlidesStore.getState();
      expect(state.deckId).toBeNull();
      expect(state.title).toBe("");
      expect(state.slides).toEqual([]);
      expect(state.activeSlideId).toBeNull();
      expect(state.mode).toBe("slides");
      expect(state.rightPanel).toBe("properties");
      expect(state.agentMode).toBe("draft");
      expect(state.saveStatus).toBe("idle");
    });
  });

  // -----------------------------------------------------------------------
  // Mode management
  // -----------------------------------------------------------------------
  describe("mode management", () => {
    it("setMode changes workspace mode", () => {
      useSlidesStore.getState().setMode("create");
      expect(useSlidesStore.getState().mode).toBe("create");
    });

    it("setRightPanel changes right panel", () => {
      useSlidesStore.getState().setRightPanel("agent");
      expect(useSlidesStore.getState().rightPanel).toBe("agent");
    });

    it("setRightPanel can be set to null", () => {
      useSlidesStore.getState().setRightPanel(null);
      expect(useSlidesStore.getState().rightPanel).toBeNull();
    });

    it("setAgentMode changes agent mode", () => {
      useSlidesStore.getState().setAgentMode("learn");
      expect(useSlidesStore.getState().agentMode).toBe("learn");
    });

    it("setIsPresenting toggles presenter mode", () => {
      useSlidesStore.getState().setIsPresenting(true);
      expect(useSlidesStore.getState().isPresenting).toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // Load deck
  // -----------------------------------------------------------------------
  describe("loadDeck", () => {
    it("loads deck data from server", async () => {
      mockGetDeck.mockResolvedValue({
        id: 42,
        title: "My Deck",
        description: "A description",
        audienceType: "conference",
        theme: "dark",
        themeConfig: null,
        slides: [
          { id: 1, sortOrder: 0, layout: "title_slide", title: "Title", subtitle: "", contentBlocks: [], speakerNotes: "" },
          { id: 2, sortOrder: 1, layout: "title_content", title: "Content", subtitle: "", contentBlocks: [], speakerNotes: "" },
        ],
      });

      const ok = await useSlidesStore.getState().loadDeck(42);
      expect(ok).toBe(true);

      const state = useSlidesStore.getState();
      expect(state.deckId).toBe(42);
      expect(state.title).toBe("My Deck");
      expect(state.audienceType).toBe("conference");
      expect(state.themeKey).toBe("dark");
      expect(state.slides).toHaveLength(2);
      expect(state.activeSlideId).toBe(1);
    });

    it("returns false when deck not found", async () => {
      mockGetDeck.mockResolvedValue(null);
      const ok = await useSlidesStore.getState().loadDeck(999);
      expect(ok).toBe(false);
    });

    it("returns false on server error", async () => {
      mockGetDeck.mockRejectedValue(new Error("Network error"));
      const ok = await useSlidesStore.getState().loadDeck(999);
      expect(ok).toBe(false);
    });
  });

  // -----------------------------------------------------------------------
  // Slide management
  // -----------------------------------------------------------------------
  describe("slide management", () => {
    beforeEach(() => {
      useSlidesStore.setState({
        deckId: 1,
        slides: [mockSlide, mockSlide2],
        activeSlideId: 1,
      });
    });

    it("setActiveSlide changes active slide", () => {
      useSlidesStore.getState().setActiveSlide(2);
      expect(useSlidesStore.getState().activeSlideId).toBe(2);
    });

    it("getActiveSlide returns current active slide", () => {
      const active = useSlidesStore.getState().getActiveSlide();
      expect(active).not.toBeNull();
      expect(active!.id).toBe(1);
      expect(active!.title).toBe("Test Slide");
    });

    it("getActiveSlide returns null when no active slide", () => {
      useSlidesStore.setState({ activeSlideId: null });
      const active = useSlidesStore.getState().getActiveSlide();
      expect(active).toBeNull();
    });

    it("updateSlide modifies a slide in state", () => {
      useSlidesStore.getState().updateSlide(1, { title: "Updated Title" });
      const slide = useSlidesStore.getState().slides.find((s) => s.id === 1);
      expect(slide!.title).toBe("Updated Title");
    });

    it("addSlide creates a new slide", async () => {
      mockCreateSlide.mockResolvedValue({
        id: 3,
        deckId: 1,
        sortOrder: 2,
        layout: "title_content",
        title: "New Slide",
        contentBlocks: [{ type: "text", data: { text: "Click to add content", style: "body" } }],
      });

      const result = await useSlidesStore.getState().addSlide();
      expect(result).not.toBeNull();
      expect(result!.id).toBe(3);
      expect(useSlidesStore.getState().slides).toHaveLength(3);
      expect(useSlidesStore.getState().activeSlideId).toBe(3);
    });

    it("addSlide inserts after specified slide", async () => {
      mockCreateSlide.mockResolvedValue({
        id: 3,
        deckId: 1,
        sortOrder: 1,
        layout: "title_content",
        title: "Inserted",
        contentBlocks: [],
      });

      await useSlidesStore.getState().addSlide(1);
      const slides = useSlidesStore.getState().slides;
      expect(slides).toHaveLength(3);
      // Slide with id 3 should be at index 1
      expect(slides[1].id).toBe(3);
    });

    it("addSlide returns null when no deckId", async () => {
      useSlidesStore.setState({ deckId: null });
      const result = await useSlidesStore.getState().addSlide();
      expect(result).toBeNull();
    });

    it("deleteSlide removes a slide", async () => {
      mockDeleteSlide.mockResolvedValue({ id: 1, deckId: 1, sortOrder: 0 });
      await useSlidesStore.getState().deleteSlide(1);
      const state = useSlidesStore.getState();
      expect(state.slides).toHaveLength(1);
      expect(state.slides[0].id).toBe(2);
      // Active slide should change since deleted slide was active
      expect(state.activeSlideId).toBe(2);
    });

    it("deleteSlide preserves activeSlideId when deleting non-active slide", async () => {
      mockDeleteSlide.mockResolvedValue({ id: 2, deckId: 1, sortOrder: 1 });
      await useSlidesStore.getState().deleteSlide(2);
      expect(useSlidesStore.getState().activeSlideId).toBe(1);
    });

    it("duplicateSlide creates a copy", async () => {
      mockCreateSlide.mockResolvedValue({
        id: 10,
        deckId: 1,
        sortOrder: 1,
        layout: "title_content",
        title: "Test Slide (copy)",
        contentBlocks: [],
      });

      await useSlidesStore.getState().duplicateSlide(1);
      expect(mockCreateSlide).toHaveBeenCalled();
      expect(useSlidesStore.getState().slides).toHaveLength(3);
    });

    it("replaceAllSlides replaces the entire slide array", () => {
      const newSlides: SlideState[] = [
        { id: 100, sortOrder: 0, layout: "blank", title: "New", subtitle: "", contentBlocks: [], speakerNotes: "" },
      ];
      useSlidesStore.getState().replaceAllSlides(newSlides);
      expect(useSlidesStore.getState().slides).toHaveLength(1);
      expect(useSlidesStore.getState().slides[0].id).toBe(100);
      expect(useSlidesStore.getState().activeSlideId).toBe(100);
    });
  });

  // -----------------------------------------------------------------------
  // Metadata updates
  // -----------------------------------------------------------------------
  describe("metadata updates", () => {
    beforeEach(() => {
      useSlidesStore.setState({ deckId: 5 });
    });

    it("setTitle updates title and calls updateDeck", () => {
      useSlidesStore.getState().setTitle("New Title");
      expect(useSlidesStore.getState().title).toBe("New Title");
      expect(mockUpdateDeck).toHaveBeenCalledWith(5, { title: "New Title" });
    });

    it("setAudienceType updates audience type", () => {
      useSlidesStore.getState().setAudienceType("conference");
      expect(useSlidesStore.getState().audienceType).toBe("conference");
      expect(mockUpdateDeck).toHaveBeenCalledWith(5, { audienceType: "conference" });
    });

    it("setTheme updates theme key and config", () => {
      const config = { name: "test", primaryColor: "#000", secondaryColor: "#111", backgroundColor: "#fff", textColor: "#333", accentColor: "#f00" };
      useSlidesStore.getState().setTheme("test", config);
      expect(useSlidesStore.getState().themeKey).toBe("test");
      expect(useSlidesStore.getState().themeConfig.primaryColor).toBe("#000");
    });
  });

  // -----------------------------------------------------------------------
  // Reorder slides
  // -----------------------------------------------------------------------
  describe("reorderSlides", () => {
    it("optimistically reorders slides", async () => {
      useSlidesStore.setState({
        deckId: 1,
        slides: [mockSlide, mockSlide2],
      });
      mockReorderSlides.mockResolvedValue(undefined);

      await useSlidesStore.getState().reorderSlides([2, 1]);
      const slides = useSlidesStore.getState().slides;
      expect(slides[0].id).toBe(2);
      expect(slides[1].id).toBe(1);
      expect(slides[0].sortOrder).toBe(0);
      expect(slides[1].sortOrder).toBe(1);
    });
  });

  // -----------------------------------------------------------------------
  // Block selection
  // -----------------------------------------------------------------------
  describe("block selection", () => {
    beforeEach(() => {
      useSlidesStore.setState({
        deckId: 1,
        slides: [
          {
            ...mockSlide,
            contentBlocks: [
              { type: "text", data: { text: "Hello", style: "body" } },
              { type: "chart", data: { chartType: "bar", title: "Chart", labels: ["A"], datasets: [{ label: "S", data: [1] }] } },
            ],
          },
          mockSlide2,
        ],
        activeSlideId: 1,
      });
    });

    it("selectedBlockIndex starts null", () => {
      expect(useSlidesStore.getState().selectedBlockIndex).toBeNull();
    });

    it("setSelectedBlockIndex updates selection", () => {
      useSlidesStore.getState().setSelectedBlockIndex(0);
      expect(useSlidesStore.getState().selectedBlockIndex).toBe(0);
    });

    it("getSelectedBlock returns the correct block", () => {
      useSlidesStore.getState().setSelectedBlockIndex(1);
      const block = useSlidesStore.getState().getSelectedBlock();
      expect(block).not.toBeNull();
      expect(block!.type).toBe("chart");
    });

    it("getSelectedBlock returns null when no selection", () => {
      expect(useSlidesStore.getState().getSelectedBlock()).toBeNull();
    });

    it("setActiveSlide clears selectedBlockIndex", () => {
      useSlidesStore.getState().setSelectedBlockIndex(0);
      useSlidesStore.getState().setActiveSlide(2);
      expect(useSlidesStore.getState().selectedBlockIndex).toBeNull();
    });

    it("updateBlock modifies a specific block", () => {
      useSlidesStore.getState().setSelectedBlockIndex(0);
      useSlidesStore.getState().updateBlock(0, {
        type: "text",
        data: { text: "Updated", style: "body" },
      });
      const slide = useSlidesStore.getState().getActiveSlide();
      expect(slide!.contentBlocks[0]).toEqual({
        type: "text",
        data: { text: "Updated", style: "body" },
      });
    });
  });

  // -----------------------------------------------------------------------
  // Undo / Redo
  // -----------------------------------------------------------------------
  describe("undo / redo", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      useSlidesStore.setState({
        deckId: 1,
        slides: [mockSlide, mockSlide2],
        activeSlideId: 1,
        _undoStack: [],
        _redoStack: [],
        _pendingUndoBefore: null,
        _pendingUndoSlideId: null,
        _undoTimer: null,
      });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("starts with empty undo/redo stacks", () => {
      expect(useSlidesStore.getState().canUndo()).toBe(false);
      expect(useSlidesStore.getState().canRedo()).toBe(false);
    });

    it("updateSlide marks canUndo immediately (pending entry)", () => {
      useSlidesStore.getState().updateSlide(1, { title: "New Title" });
      // Before the debounce timer fires, canUndo is true via pending entry
      expect(useSlidesStore.getState().canUndo()).toBe(true);
      expect(useSlidesStore.getState()._pendingUndoBefore).toEqual({ title: "Test Slide" });
    });

    it("debounce flushes pending entry to stack after 500ms", () => {
      useSlidesStore.getState().updateSlide(1, { title: "New Title" });
      expect(useSlidesStore.getState()._undoStack).toHaveLength(0);
      vi.advanceTimersByTime(500);
      expect(useSlidesStore.getState()._undoStack).toHaveLength(1);
      expect(useSlidesStore.getState()._undoStack[0].before).toEqual({ title: "Test Slide" });
    });

    it("rapid edits to same slide coalesce into one undo entry", () => {
      useSlidesStore.getState().updateSlide(1, { title: "V1" });
      useSlidesStore.getState().updateSlide(1, { title: "V2" });
      useSlidesStore.getState().updateSlide(1, { title: "V3" });
      vi.advanceTimersByTime(500);
      // All 3 coalesce — undo entry captures state BEFORE the first edit
      expect(useSlidesStore.getState()._undoStack).toHaveLength(1);
      expect(useSlidesStore.getState()._undoStack[0].before).toEqual({ title: "Test Slide" });
    });

    it("undo reverts the last change (flushes pending first)", () => {
      useSlidesStore.getState().updateSlide(1, { title: "Changed" });
      expect(useSlidesStore.getState().slides[0].title).toBe("Changed");

      // Undo flushes the pending entry then applies it
      useSlidesStore.getState().undo();
      expect(useSlidesStore.getState().slides[0].title).toBe("Test Slide");
      expect(useSlidesStore.getState().canUndo()).toBe(false);
      expect(useSlidesStore.getState().canRedo()).toBe(true);
    });

    it("redo re-applies the undone change", () => {
      useSlidesStore.getState().updateSlide(1, { title: "Changed" });
      useSlidesStore.getState().undo();
      useSlidesStore.getState().redo();
      expect(useSlidesStore.getState().slides[0].title).toBe("Changed");
      expect(useSlidesStore.getState().canUndo()).toBe(true);
      expect(useSlidesStore.getState().canRedo()).toBe(false);
    });

    it("new changes clear the redo stack", () => {
      useSlidesStore.getState().updateSlide(1, { title: "V1" });
      useSlidesStore.getState().undo();
      expect(useSlidesStore.getState().canRedo()).toBe(true);

      useSlidesStore.getState().updateSlide(1, { title: "V2" });
      expect(useSlidesStore.getState().canRedo()).toBe(false);
    });

    it("edits on different slides create separate undo entries", () => {
      useSlidesStore.getState().updateSlide(1, { title: "S1 edit" });
      // Switching to a different slide flushes the pending entry for slide 1
      useSlidesStore.getState().updateSlide(2, { title: "S2 edit" });
      vi.advanceTimersByTime(500);
      expect(useSlidesStore.getState()._undoStack).toHaveLength(2);
      expect(useSlidesStore.getState()._undoStack[0].slideId).toBe(1);
      expect(useSlidesStore.getState()._undoStack[1].slideId).toBe(2);
    });

    it("multiple undos across slides work in sequence", () => {
      useSlidesStore.getState().updateSlide(1, { title: "S1 changed" });
      useSlidesStore.getState().updateSlide(2, { title: "S2 changed" });
      vi.advanceTimersByTime(500);

      useSlidesStore.getState().undo();
      expect(useSlidesStore.getState().slides[1].title).toBe("Second Slide");
      useSlidesStore.getState().undo();
      expect(useSlidesStore.getState().slides[0].title).toBe("Test Slide");
    });

    it("undo does nothing when stack is empty", () => {
      useSlidesStore.getState().undo();
      expect(useSlidesStore.getState().slides[0].title).toBe("Test Slide");
    });

    it("redo does nothing when stack is empty", () => {
      useSlidesStore.getState().redo();
      expect(useSlidesStore.getState().slides[0].title).toBe("Test Slide");
    });
  });
});
