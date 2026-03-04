/**
 * Tests for LaTeX editor Zustand store
 *
 * Tests LaTeX editor state including modes, compile status, and panels
 */

import { describe, it, expect, beforeEach } from "vitest";
import { useLatexEditorStore } from "../latex-editor-store";

describe("useLatexEditorStore", () => {
  beforeEach(() => {
    // Reset to defaults
    useLatexEditorStore.setState({
      activeFileId: null,
      viewMode: "source",
      previewMode: "live",
      compileStatus: "idle",
      compileError: null,
      saveState: "saved",
      lastSavedAt: null,
      fileTreeOpen: false,
      agentPanelOpen: false,
      agentTab: "draft",
      documentContent: "",
      compiledPdfUrl: null,
      projectTitle: "Untitled Paper",
    });
  });

  describe("initial state", () => {
    it("has no active file", () => {
      const state = useLatexEditorStore.getState();
      expect(state.activeFileId).toBeNull();
    });

    it("is in source view mode", () => {
      const state = useLatexEditorStore.getState();
      expect(state.viewMode).toBe("source");
    });

    it("is in live preview mode", () => {
      const state = useLatexEditorStore.getState();
      expect(state.previewMode).toBe("live");
    });

    it("has idle compile status", () => {
      const state = useLatexEditorStore.getState();
      expect(state.compileStatus).toBe("idle");
    });

    it("has no compile error", () => {
      const state = useLatexEditorStore.getState();
      expect(state.compileError).toBeNull();
    });

    it("is in saved state", () => {
      const state = useLatexEditorStore.getState();
      expect(state.saveState).toBe("saved");
    });

    it("has no last saved time", () => {
      const state = useLatexEditorStore.getState();
      expect(state.lastSavedAt).toBeNull();
    });

    it("panels are closed", () => {
      const state = useLatexEditorStore.getState();
      expect(state.fileTreeOpen).toBe(false);
      expect(state.agentPanelOpen).toBe(false);
    });

    it("has draft agent tab active", () => {
      const state = useLatexEditorStore.getState();
      expect(state.agentTab).toBe("draft");
    });

    it("has empty document content", () => {
      const state = useLatexEditorStore.getState();
      expect(state.documentContent).toBe("");
    });

    it("has no compiled PDF URL", () => {
      const state = useLatexEditorStore.getState();
      expect(state.compiledPdfUrl).toBeNull();
    });

    it("has default project title", () => {
      const state = useLatexEditorStore.getState();
      expect(state.projectTitle).toBe("Untitled Paper");
    });
  });

  describe("active file", () => {
    it("setActiveFileId changes active file", () => {
      const store = useLatexEditorStore.getState();
      store.setActiveFileId("file-123");
      expect(useLatexEditorStore.getState().activeFileId).toBe("file-123");
    });

    it("can set to null", () => {
      const store = useLatexEditorStore.getState();
      store.setActiveFileId("file-456");
      store.setActiveFileId(null);
      expect(useLatexEditorStore.getState().activeFileId).toBeNull();
    });
  });

  describe("view mode", () => {
    it("setViewMode changes mode", () => {
      const store = useLatexEditorStore.getState();
      store.setViewMode("visual");
      expect(useLatexEditorStore.getState().viewMode).toBe("visual");
    });

    it("accepts source and visual modes", () => {
      const store = useLatexEditorStore.getState();
      store.setViewMode("source");
      expect(useLatexEditorStore.getState().viewMode).toBe("source");

      store.setViewMode("visual");
      expect(useLatexEditorStore.getState().viewMode).toBe("visual");
    });
  });

  describe("preview mode", () => {
    it("setPreviewMode changes mode", () => {
      const store = useLatexEditorStore.getState();
      store.setPreviewMode("pdf");
      expect(useLatexEditorStore.getState().previewMode).toBe("pdf");
    });

    it("accepts live and pdf modes", () => {
      const store = useLatexEditorStore.getState();
      store.setPreviewMode("live");
      expect(useLatexEditorStore.getState().previewMode).toBe("live");

      store.setPreviewMode("pdf");
      expect(useLatexEditorStore.getState().previewMode).toBe("pdf");
    });
  });

  describe("compile status", () => {
    it("setCompileStatus changes status", () => {
      const store = useLatexEditorStore.getState();
      store.setCompileStatus("compiling");
      expect(useLatexEditorStore.getState().compileStatus).toBe("compiling");
    });

    it("accepts all status values", () => {
      const store = useLatexEditorStore.getState();
      const statuses: Array<"idle" | "compiling" | "success" | "error"> =
        ["idle", "compiling", "success", "error"];

      statuses.forEach((status) => {
        store.setCompileStatus(status);
        expect(useLatexEditorStore.getState().compileStatus).toBe(status);
      });
    });
  });

  describe("compile error", () => {
    it("setCompileError sets error message", () => {
      const store = useLatexEditorStore.getState();
      store.setCompileError("Undefined control sequence");
      expect(useLatexEditorStore.getState().compileError).toBe("Undefined control sequence");
    });

    it("can clear error with null", () => {
      const store = useLatexEditorStore.getState();
      store.setCompileError("Error");
      store.setCompileError(null);
      expect(useLatexEditorStore.getState().compileError).toBeNull();
    });
  });

  describe("save state", () => {
    it("setSaveState changes state", () => {
      const store = useLatexEditorStore.getState();
      store.setSaveState("unsaved");
      expect(useLatexEditorStore.getState().saveState).toBe("unsaved");
    });

    it("accepts all state values", () => {
      const store = useLatexEditorStore.getState();
      const states: Array<"saved" | "saving" | "unsaved" | "error"> =
        ["saved", "saving", "unsaved", "error"];

      states.forEach((status) => {
        store.setSaveState(status);
        expect(useLatexEditorStore.getState().saveState).toBe(status);
      });
    });
  });

  describe("last saved time", () => {
    it("setLastSavedAt updates time", () => {
      const store = useLatexEditorStore.getState();
      const now = new Date();
      store.setLastSavedAt(now);
      expect(useLatexEditorStore.getState().lastSavedAt).toEqual(now);
    });

    it("can set to null", () => {
      const store = useLatexEditorStore.getState();
      store.setLastSavedAt(new Date());
      store.setLastSavedAt(null);
      expect(useLatexEditorStore.getState().lastSavedAt).toBeNull();
    });
  });

  describe("file tree panel", () => {
    it("toggleFileTree flips state", () => {
      const store = useLatexEditorStore.getState();
      expect(useLatexEditorStore.getState().fileTreeOpen).toBe(false);

      store.toggleFileTree();
      expect(useLatexEditorStore.getState().fileTreeOpen).toBe(true);

      store.toggleFileTree();
      expect(useLatexEditorStore.getState().fileTreeOpen).toBe(false);
    });

    it("setFileTreeOpen sets specific value", () => {
      const store = useLatexEditorStore.getState();
      store.setFileTreeOpen(true);
      expect(useLatexEditorStore.getState().fileTreeOpen).toBe(true);

      store.setFileTreeOpen(false);
      expect(useLatexEditorStore.getState().fileTreeOpen).toBe(false);
    });
  });

  describe("agent panel", () => {
    it("toggleAgentPanel flips state", () => {
      const store = useLatexEditorStore.getState();
      expect(useLatexEditorStore.getState().agentPanelOpen).toBe(false);

      store.toggleAgentPanel();
      expect(useLatexEditorStore.getState().agentPanelOpen).toBe(true);

      store.toggleAgentPanel();
      expect(useLatexEditorStore.getState().agentPanelOpen).toBe(false);
    });

    it("setAgentPanelOpen sets specific value", () => {
      const store = useLatexEditorStore.getState();
      store.setAgentPanelOpen(true);
      expect(useLatexEditorStore.getState().agentPanelOpen).toBe(true);

      store.setAgentPanelOpen(false);
      expect(useLatexEditorStore.getState().agentPanelOpen).toBe(false);
    });
  });

  describe("agent tab", () => {
    it("setAgentTab changes active tab", () => {
      const store = useLatexEditorStore.getState();
      store.setAgentTab("cite");
      expect(useLatexEditorStore.getState().agentTab).toBe("cite");
    });

    it("accepts all tab values", () => {
      const store = useLatexEditorStore.getState();
      const tabs: Array<"draft" | "learn" | "cite" | "check"> =
        ["draft", "learn", "cite", "check"];

      tabs.forEach((tab) => {
        store.setAgentTab(tab);
        expect(useLatexEditorStore.getState().agentTab).toBe(tab);
      });
    });
  });

  describe("document content", () => {
    it("setDocumentContent updates content", () => {
      const store = useLatexEditorStore.getState();
      store.setDocumentContent("\\documentclass{article}");
      expect(useLatexEditorStore.getState().documentContent).toBe("\\documentclass{article}");
    });
  });

  describe("compiled PDF", () => {
    it("setCompiledPdfUrl updates URL", () => {
      const store = useLatexEditorStore.getState();
      const url = "blob:http://example.com/blob";
      store.setCompiledPdfUrl(url);
      expect(useLatexEditorStore.getState().compiledPdfUrl).toBe(url);
    });

    it("can clear URL with null", () => {
      const store = useLatexEditorStore.getState();
      store.setCompiledPdfUrl("blob:http://example.com/blob");
      store.setCompiledPdfUrl(null);
      expect(useLatexEditorStore.getState().compiledPdfUrl).toBeNull();
    });
  });

  describe("project title", () => {
    it("setProjectTitle updates title", () => {
      const store = useLatexEditorStore.getState();
      store.setProjectTitle("My LaTeX Paper");
      expect(useLatexEditorStore.getState().projectTitle).toBe("My LaTeX Paper");
    });
  });
});
