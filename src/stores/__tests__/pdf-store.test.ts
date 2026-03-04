/**
 * Tests for PDF Zustand store
 *
 * Tests PDF viewer state including navigation, highlights, and chat
 */

import { describe, it, expect, beforeEach } from "vitest";
import { usePDFStore } from "../pdf-store";

describe("usePDFStore", () => {
  beforeEach(() => {
    usePDFStore.getState().closePDF();
  });

  describe("initial state", () => {
    it("has no current paper", () => {
      const state = usePDFStore.getState();
      expect(state.currentPaperId).toBeNull();
      expect(state.pdfUrl).toBeNull();
      expect(state.paperMetadata).toBeNull();
    });

    it("starts on page 1", () => {
      const state = usePDFStore.getState();
      expect(state.currentPage).toBe(1);
    });

    it("has zero total pages", () => {
      const state = usePDFStore.getState();
      expect(state.totalPages).toBe(0);
    });

    it("has default zoom 1.0", () => {
      const state = usePDFStore.getState();
      expect(state.zoom).toBe(1.0);
    });

    it("is closed by default", () => {
      const state = usePDFStore.getState();
      expect(state.isOpen).toBe(false);
    });

    it("has pdf-chat layout", () => {
      const state = usePDFStore.getState();
      expect(state.layout).toBe("pdf-chat");
    });

    it("has no selection or highlights", () => {
      const state = usePDFStore.getState();
      expect(state.currentSelection).toBeNull();
      expect(state.highlights).toEqual([]);
      expect(state.activeHighlightColor).toBe("yellow");
    });
  });

  describe("openPDF", () => {
    it("opens PDF with metadata", () => {
      const store = usePDFStore.getState();
      store.openPDF("paper-123", "https://example.com/paper.pdf", {
        id: "paper-123",
        title: "Test Paper",
        authors: ["Author One"],
      });

      const state = usePDFStore.getState();
      expect(state.currentPaperId).toBe("paper-123");
      expect(state.pdfUrl).toBe("https://example.com/paper.pdf");
      expect(state.isOpen).toBe(true);
      expect(state.currentPage).toBe(1);
      expect(state.paperMetadata?.title).toBe("Test Paper");
    });

    it("opens PDF without metadata", () => {
      const store = usePDFStore.getState();
      store.openPDF("paper-456", "https://example.com/paper2.pdf");

      expect(usePDFStore.getState().currentPaperId).toBe("paper-456");
      expect(usePDFStore.getState().paperMetadata).toBeNull();
    });

    it("resets chat messages when opening new PDF", () => {
      const store = usePDFStore.getState();
      // Add a chat message first
      store.addChatMessage({
        id: "msg-1",
        role: "user" as const,
        content: "Test",
        createdAt: new Date(),
      });
      expect(usePDFStore.getState().chatMessages.length).toBe(1);

      store.openPDF("paper-789", "https://example.com/paper3.pdf");
      expect(usePDFStore.getState().chatMessages).toEqual([]);
    });
  });

  describe("closePDF", () => {
    it("resets all PDF state", () => {
      const store = usePDFStore.getState();
      store.openPDF("paper-123", "https://example.com/paper.pdf");
      store.setPage(5);
      store.setTotalPages(10);
      const highlight = {
        id: "h1",
        projectId: "proj-1",
        paperId: "paper-123",
        pageNumber: 1,
        rects: [{ x: 0, y: 0, width: 100, height: 20 }],
        selectedText: "test",
        startOffset: 0,
        endOffset: 4,
        color: "yellow" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      store.addHighlight(highlight);

      store.closePDF();

      const state = usePDFStore.getState();
      expect(state.isOpen).toBe(false);
      expect(state.currentPaperId).toBeNull();
      expect(state.pdfUrl).toBeNull();
      expect(state.currentPage).toBe(1);
      expect(state.totalPages).toBe(0);
      expect(state.highlights).toEqual([]);
    });
  });

  describe("page navigation", () => {
    beforeEach(() => {
      usePDFStore.getState().openPDF("paper-123", "https://example.com/paper.pdf");
      usePDFStore.getState().setTotalPages(10);
    });

    it("setPage changes current page", () => {
      const store = usePDFStore.getState();
      store.setPage(5);
      expect(usePDFStore.getState().currentPage).toBe(5);
    });

    it("setTotalPages updates total", () => {
      const store = usePDFStore.getState();
      store.setTotalPages(15);
      expect(usePDFStore.getState().totalPages).toBe(15);
    });
  });

  describe("zoom", () => {
    it("setZoom changes zoom level", () => {
      const store = usePDFStore.getState();
      store.setZoom(1.5);
      expect(usePDFStore.getState().zoom).toBe(1.5);
    });

    it("clamps zoom to minimum 0.5", () => {
      const store = usePDFStore.getState();
      store.setZoom(0.1);
      expect(usePDFStore.getState().zoom).toBe(0.5);
    });

    it("clamps zoom to maximum 3.0", () => {
      const store = usePDFStore.getState();
      store.setZoom(5.0);
      expect(usePDFStore.getState().zoom).toBe(3.0);
    });
  });

  describe("layout", () => {
    it("setLayout changes layout", () => {
      const store = usePDFStore.getState();
      store.setLayout("pdf-editor");
      expect(usePDFStore.getState().layout).toBe("pdf-editor");
    });
  });

  describe("selection", () => {
    it("setSelection sets selection and opens menu", () => {
      const store = usePDFStore.getState();
      const selection = {
        pageNumber: 1,
        text: "selected text",
        rects: [{ x: 0, y: 0, width: 100, height: 20 }],
        startOffset: 0,
        endOffset: 13,
      };

      store.setSelection(selection);

      const state = usePDFStore.getState();
      expect(state.currentSelection).toEqual(selection);
      expect(state.isSelectionMenuOpen).toBe(true);
    });

    it("setting null selection closes menu", () => {
      const store = usePDFStore.getState();
      store.setSelection({
        pageNumber: 1,
        text: "text",
        rects: [{ x: 0, y: 0, width: 100, height: 20 }],
        startOffset: 0,
        endOffset: 4,
      });
      expect(usePDFStore.getState().isSelectionMenuOpen).toBe(true);

      store.setSelection(null);
      expect(usePDFStore.getState().currentSelection).toBeNull();
      expect(usePDFStore.getState().isSelectionMenuOpen).toBe(false);
    });

    it("setSelectionMenuOpen independently sets state", () => {
      const store = usePDFStore.getState();
      store.setSelectionMenuOpen(true);
      expect(usePDFStore.getState().isSelectionMenuOpen).toBe(true);

      store.setSelectionMenuOpen(false);
      expect(usePDFStore.getState().isSelectionMenuOpen).toBe(false);
    });
  });

  describe("highlights", () => {
    const createHighlight = (id: string) => ({
      id,
      projectId: "proj-1",
      paperId: "paper-1",
      pageNumber: 1,
      rects: [{ x: 0, y: 0, width: 100, height: 20 }],
      selectedText: "text",
      startOffset: 0,
      endOffset: 4,
      color: "yellow" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    it("setHighlights replaces all highlights", () => {
      const store = usePDFStore.getState();
      const highlights = [createHighlight("h1"), createHighlight("h2")];

      store.setHighlights(highlights);

      expect(usePDFStore.getState().highlights).toHaveLength(2);
    });

    it("addHighlight appends highlight", () => {
      const store = usePDFStore.getState();
      store.addHighlight(createHighlight("h1"));
      store.addHighlight(createHighlight("h2"));

      expect(usePDFStore.getState().highlights).toHaveLength(2);
    });

    it("updateHighlight updates existing highlight", () => {
      const store = usePDFStore.getState();
      store.addHighlight(createHighlight("h1"));

      store.updateHighlight("h1", { color: "blue" });

      const highlight = usePDFStore.getState().highlights[0];
      expect(highlight?.color).toBe("blue");
    });

    it("updateHighlight adds updatedAt timestamp", () => {
      const store = usePDFStore.getState();
      store.addHighlight(createHighlight("h1"));

      store.updateHighlight("h1", { color: "blue" });

      const highlight = usePDFStore.getState().highlights[0];
      expect(highlight?.updatedAt).toBeInstanceOf(Date);
    });

    it("removeHighlight removes highlight by id", () => {
      const store = usePDFStore.getState();
      store.addHighlight(createHighlight("h1"));
      store.addHighlight(createHighlight("h2"));

      store.removeHighlight("h1");

      expect(usePDFStore.getState().highlights).toHaveLength(1);
      expect(usePDFStore.getState().highlights[0].id).toBe("h2");
    });

    it("setActiveHighlightColor changes color", () => {
      const store = usePDFStore.getState();
      store.setActiveHighlightColor("blue");
      expect(usePDFStore.getState().activeHighlightColor).toBe("blue");
    });
  });

  describe("chat", () => {
    it("addChatMessage appends message", () => {
      const store = usePDFStore.getState();
      store.addChatMessage({
        id: "msg-1",
        role: "user" as const,
        content: "Question",
        createdAt: new Date(),
      });

      expect(usePDFStore.getState().chatMessages).toHaveLength(1);
    });

    it("setChatMessages replaces all messages", () => {
      const store = usePDFStore.getState();
      store.addChatMessage({ id: "msg-1", role: "user" as const, content: "Q1", createdAt: new Date() });
      store.addChatMessage({ id: "msg-2", role: "assistant" as const, content: "A1", createdAt: new Date() });

      const newMessages = [{ id: "msg-3", role: "user" as const, content: "Q2", createdAt: new Date() }];
      store.setChatMessages(newMessages);

      expect(usePDFStore.getState().chatMessages).toHaveLength(1);
      expect(usePDFStore.getState().chatMessages[0].content).toBe("Q2");
    });

    it("setChatLoading changes loading state", () => {
      const store = usePDFStore.getState();
      store.setChatLoading(true);
      expect(usePDFStore.getState().isChatLoading).toBe(true);

      store.setChatLoading(false);
      expect(usePDFStore.getState().isChatLoading).toBe(false);
    });

    it("clearChat empties messages", () => {
      const store = usePDFStore.getState();
      store.addChatMessage({ id: "msg-1", role: "user" as const, content: "Q", createdAt: new Date() });
      expect(usePDFStore.getState().chatMessages.length).toBe(1);

      store.clearChat();
      expect(usePDFStore.getState().chatMessages).toEqual([]);
    });
  });

  describe("navigation", () => {
    it("navigateTo sets target and page", () => {
      const store = usePDFStore.getState();
      const target = {
        pageNumber: 5,
        highlightSpan: { startOffset: 0, endOffset: 10 },
      };

      store.navigateTo(target);

      expect(usePDFStore.getState().navigationTarget).toEqual(target);
      expect(usePDFStore.getState().currentPage).toBe(5);
    });

    it("clearNavigationTarget clears target", () => {
      const store = usePDFStore.getState();
      store.navigateTo({ pageNumber: 3 });
      expect(usePDFStore.getState().navigationTarget).toBeDefined();

      store.clearNavigationTarget();
      expect(usePDFStore.getState().navigationTarget).toBeNull();
    });

    it("setFlashHighlight sets flash highlight", () => {
      const store = usePDFStore.getState();
      const flash = { pageNumber: 2, rects: [{ x: 0, y: 0, width: 100, height: 20 }] };

      store.setFlashHighlight(flash);

      expect(usePDFStore.getState().flashHighlight).toEqual(flash);
    });

    it("setFlashHighlight clears with null", () => {
      const store = usePDFStore.getState();
      store.setFlashHighlight({ pageNumber: 1, rects: [] });
      store.setFlashHighlight(null);

      expect(usePDFStore.getState().flashHighlight).toBeNull();
    });
  });
});
