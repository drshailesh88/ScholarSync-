/**
 * Tests for editor Zustand store
 *
 * Tests editor state management including mode, outline, word count, save status
 */

import { describe, it, expect, beforeEach } from "vitest";
import { useEditorStore } from "../editor-store";

describe("useEditorStore", () => {
  beforeEach(() => {
    // Reset store before each test
    useEditorStore.setState({
      mode: "editing",
      outline: [],
      outlineVisible: false,
      wordCount: 0,
      sectionWordCounts: {},
      saveStatus: { state: "saved" },
      activeSectionPos: null,
      referenceSidebarOpen: false,
      commentSidebarOpen: false,
      documentTitle: "Untitled Manuscript",
      documentType: "original-article",
      referenceCount: 0,
      commentCount: 0,
    });
  });

  describe("initial state", () => {
    it("has correct default mode", () => {
      const state = useEditorStore.getState();
      expect(state.mode).toBe("editing");
    });

    it("has empty outline", () => {
      const state = useEditorStore.getState();
      expect(state.outline).toEqual([]);
    });

    it("outline is not visible by default", () => {
      const state = useEditorStore.getState();
      expect(state.outlineVisible).toBe(false);
    });

    it("has zero word count", () => {
      const state = useEditorStore.getState();
      expect(state.wordCount).toBe(0);
    });

    it("has saved status", () => {
      const state = useEditorStore.getState();
      expect(state.saveStatus.state).toBe("saved");
    });

    it("has default document title", () => {
      const state = useEditorStore.getState();
      expect(state.documentTitle).toBe("Untitled Manuscript");
    });

    it("has default document type", () => {
      const state = useEditorStore.getState();
      expect(state.documentType).toBe("original-article");
    });

    it("sidebars are closed by default", () => {
      const state = useEditorStore.getState();
      expect(state.referenceSidebarOpen).toBe(false);
      expect(state.commentSidebarOpen).toBe(false);
    });
  });

  describe("setMode", () => {
    it("changes mode correctly", () => {
      const store = useEditorStore.getState();
      store.setMode("viewing");
      expect(useEditorStore.getState().mode).toBe("viewing");
    });

    it("accepts all valid modes", () => {
      const store = useEditorStore.getState();
      const modes: Array<"editing" | "viewing"> = ["editing", "viewing"];
      modes.forEach((mode) => {
        store.setMode(mode);
        expect(useEditorStore.getState().mode).toBe(mode);
      });
    });
  });

  describe("outline", () => {
    it("setOutline updates outline array", () => {
      const store = useEditorStore.getState();
      const newOutline = [
        { id: "1", type: "heading" as const, level: 2, text: "Introduction", pos: 0 },
      ];
      store.setOutline(newOutline);
      expect(useEditorStore.getState().outline).toEqual(newOutline);
    });

    it("toggleOutline flips outlineVisible", () => {
      const store = useEditorStore.getState();
      expect(useEditorStore.getState().outlineVisible).toBe(false);

      store.toggleOutline();
      expect(useEditorStore.getState().outlineVisible).toBe(true);

      store.toggleOutline();
      expect(useEditorStore.getState().outlineVisible).toBe(false);
    });

    it("setOutlineVisible sets specific value", () => {
      const store = useEditorStore.getState();
      store.setOutlineVisible(true);
      expect(useEditorStore.getState().outlineVisible).toBe(true);

      store.setOutlineVisible(false);
      expect(useEditorStore.getState().outlineVisible).toBe(false);
    });
  });

  describe("word count", () => {
    it("setWordCount updates count", () => {
      const store = useEditorStore.getState();
      store.setWordCount(1500);
      expect(useEditorStore.getState().wordCount).toBe(1500);
    });

    it("setSectionWordCounts updates section counts", () => {
      const store = useEditorStore.getState();
      const counts = { introduction: 200, methods: 500 };
      store.setSectionWordCounts(counts);
      expect(useEditorStore.getState().sectionWordCounts).toEqual(counts);
    });
  });

  describe("save status", () => {
    it("setSaveStatus updates state and lastSavedAt", () => {
      const store = useEditorStore.getState();
      const now = new Date();
      store.setSaveStatus({ state: "saving", lastSavedAt: now });

      const state = useEditorStore.getState();
      expect(state.saveStatus.state).toBe("saving");
      expect(state.saveStatus.lastSavedAt).toBe(now);
    });

    it("accepts all status values", () => {
      const store = useEditorStore.getState();
      const states: Array<"saved" | "saving" | "unsaved" | "offline"> =
        ["saved", "saving", "unsaved", "offline"];

      states.forEach((status) => {
        store.setSaveStatus({ state: status });
        expect(useEditorStore.getState().saveStatus.state).toBe(status);
      });
    });
  });

  describe("active section", () => {
    it("setActiveSectionPos updates position", () => {
      const store = useEditorStore.getState();
      store.setActiveSectionPos(100);
      expect(useEditorStore.getState().activeSectionPos).toBe(100);
    });

    it("can set to null", () => {
      const store = useEditorStore.getState();
      store.setActiveSectionPos(50);
      expect(useEditorStore.getState().activeSectionPos).toBe(50);

      store.setActiveSectionPos(null);
      expect(useEditorStore.getState().activeSectionPos).toBeNull();
    });
  });

  describe("sidebars", () => {
    it("toggleReferenceSidebar flips state", () => {
      const store = useEditorStore.getState();
      expect(useEditorStore.getState().referenceSidebarOpen).toBe(false);

      store.toggleReferenceSidebar();
      expect(useEditorStore.getState().referenceSidebarOpen).toBe(true);

      store.toggleReferenceSidebar();
      expect(useEditorStore.getState().referenceSidebarOpen).toBe(false);
    });

    it("toggleCommentSidebar flips state", () => {
      const store = useEditorStore.getState();
      expect(useEditorStore.getState().commentSidebarOpen).toBe(false);

      store.toggleCommentSidebar();
      expect(useEditorStore.getState().commentSidebarOpen).toBe(true);

      store.toggleCommentSidebar();
      expect(useEditorStore.getState().commentSidebarOpen).toBe(false);
    });
  });

  describe("document metadata", () => {
    it("setDocumentTitle updates title", () => {
      const store = useEditorStore.getState();
      store.setDocumentTitle("My Paper");
      expect(useEditorStore.getState().documentTitle).toBe("My Paper");
    });

    it("setDocumentType updates type", () => {
      const store = useEditorStore.getState();
      store.setDocumentType("case-report");
      expect(useEditorStore.getState().documentType).toBe("case-report");
    });
  });

  describe("counts", () => {
    it("setReferenceCount updates count", () => {
      const store = useEditorStore.getState();
      store.setReferenceCount(15);
      expect(useEditorStore.getState().referenceCount).toBe(15);
    });

    it("setCommentCount updates count", () => {
      const store = useEditorStore.getState();
      store.setCommentCount(3);
      expect(useEditorStore.getState().commentCount).toBe(3);
    });
  });

  describe("multiple state updates", () => {
    it("handles rapid state changes", () => {
      const store = useEditorStore.getState();
      store.setMode("viewing");
      store.setWordCount(2500);
      store.setDocumentTitle("Updated");

      const state = useEditorStore.getState();
      expect(state.mode).toBe("viewing");
      expect(state.wordCount).toBe(2500);
      expect(state.documentTitle).toBe("Updated");
    });
  });
});
