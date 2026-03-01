import { describe, it, expect, vi, beforeEach } from "vitest";

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
    mode: "slides",
    rightPanel: "properties",
    agentMode: "draft",
    isPresenting: false,
    showSharePanel: false,
    saveStatus: "idle",
    _saveTimer: null,
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
      useSlidesStore.getState().setMode("chat");
      expect(useSlidesStore.getState().mode).toBe("chat");
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
});
