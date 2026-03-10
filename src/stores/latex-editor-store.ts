import { create } from "zustand";
import type { TrackChange } from "@/types/track-changes";

export type EditorViewMode = "source" | "visual";
export type PreviewMode = "live" | "pdf";
export type CompileStatus = "idle" | "compiling" | "success" | "error";
export type SaveState = "saved" | "saving" | "unsaved" | "error";
export type EditingMode = "edit" | "suggest" | "view";

interface LatexEditorState {
  // Active file
  activeFileId: string | null;
  setActiveFileId: (id: string | null) => void;

  // Editor mode (source vs visual)
  viewMode: EditorViewMode;
  setViewMode: (mode: EditorViewMode) => void;

  // Editing mode (edit vs suggest vs view) - for track changes
  editingMode: EditingMode;
  setEditingMode: (mode: EditingMode) => void;

  // Preview mode (live KaTeX/LaTeX.js vs full PDF)
  previewMode: PreviewMode;
  setPreviewMode: (mode: PreviewMode) => void;

  // Compile status
  compileStatus: CompileStatus;
  setCompileStatus: (status: CompileStatus) => void;
  compileError: string | null;
  setCompileError: (error: string | null) => void;

  // Save status
  saveState: SaveState;
  setSaveState: (state: SaveState) => void;
  lastSavedAt: Date | null;
  setLastSavedAt: (date: Date | null) => void;

  // Panel visibility (progressive disclosure)
  fileTreeOpen: boolean;
  toggleFileTree: () => void;
  setFileTreeOpen: (open: boolean) => void;

  agentPanelOpen: boolean;
  toggleAgentPanel: () => void;
  setAgentPanelOpen: (open: boolean) => void;

  // Agent panel active tab
  agentTab: "draft" | "learn" | "cite" | "check";
  setAgentTab: (tab: "draft" | "learn" | "cite" | "check") => void;
  pendingDraftSection: string | null;
  setPendingDraftSection: (section: string | null) => void;

  // Document content (for preview syncing)
  documentContent: string;
  setDocumentContent: (content: string) => void;

  // Compiled PDF URL (blob URL for pdfjs-dist)
  compiledPdfUrl: string | null;
  setCompiledPdfUrl: (url: string | null) => void;

  // Project title
  projectTitle: string;
  setProjectTitle: (title: string) => void;

  // Track changes (suggesting mode)
  pendingChanges: TrackChange[];
  setPendingChanges: (changes: TrackChange[]) => void;
  addChange: (change: TrackChange) => void;
  acceptChange: (id: string) => void;
  rejectChange: (id: string) => void;
  acceptAllChanges: () => void;
  rejectAllChanges: () => void;

  // Track changes shadow document (for diff computation)
  shadowDocument: string;
  setShadowDocument: (doc: string) => void;
}

export const useLatexEditorStore = create<LatexEditorState>((set, get) => ({
  // Active file
  activeFileId: null,
  setActiveFileId: (activeFileId) => set({ activeFileId }),

  // Editor mode
  viewMode: "source",
  setViewMode: (viewMode) => set({ viewMode }),

  // Editing mode (track changes)
  editingMode: "edit",
  setEditingMode: (editingMode) => set({ editingMode }),

  // Preview mode
  previewMode: "live",
  setPreviewMode: (previewMode) => set({ previewMode }),

  // Compile status
  compileStatus: "idle",
  setCompileStatus: (compileStatus) => set({ compileStatus }),
  compileError: null,
  setCompileError: (compileError) => set({ compileError }),

  // Save status
  saveState: "saved",
  setSaveState: (saveState) => set({ saveState }),
  lastSavedAt: null,
  setLastSavedAt: (lastSavedAt) => set({ lastSavedAt }),

  // Panels
  fileTreeOpen: false,
  toggleFileTree: () => set((s) => ({ fileTreeOpen: !s.fileTreeOpen })),
  setFileTreeOpen: (fileTreeOpen) => set({ fileTreeOpen }),

  agentPanelOpen: false,
  toggleAgentPanel: () => set((s) => ({ agentPanelOpen: !s.agentPanelOpen })),
  setAgentPanelOpen: (agentPanelOpen) => set({ agentPanelOpen }),

  // Agent panel tab
  agentTab: "draft",
  setAgentTab: (agentTab) => set({ agentTab }),
  pendingDraftSection: null,
  setPendingDraftSection: (pendingDraftSection) => set({ pendingDraftSection }),

  // Document content
  documentContent: "",
  setDocumentContent: (documentContent) => set({ documentContent }),

  // Compiled PDF
  compiledPdfUrl: null,
  setCompiledPdfUrl: (compiledPdfUrl) => set({ compiledPdfUrl }),

  // Project title
  projectTitle: "Untitled Paper",
  setProjectTitle: (projectTitle) => set({ projectTitle }),

  // Track changes
  pendingChanges: [],
  setPendingChanges: (pendingChanges) => set({ pendingChanges }),
  addChange: (change) => set((s) => ({ pendingChanges: [...s.pendingChanges, change] })),
  acceptChange: (id) => {
    const { pendingChanges } = get();
    const updated = pendingChanges.map((c) =>
      c.id === id ? { ...c, status: "accepted" as const } : c
    );
    set({ pendingChanges: updated });

    // Also update on server
    fetch("/api/latex/track-changes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "accepted" }),
    }).catch(() => {
      // Silent failure - local state is still updated
    });
  },
  rejectChange: (id) => {
    const { pendingChanges } = get();
    const updated = pendingChanges.map((c) =>
      c.id === id ? { ...c, status: "rejected" as const } : c
    );
    set({ pendingChanges: updated });

    // Also update on server
    fetch("/api/latex/track-changes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "rejected" }),
    }).catch(() => {
      // Silent failure - local state is still updated
    });
  },
  acceptAllChanges: () => {
    const { pendingChanges } = get();
    const updated = pendingChanges.map((c) => ({ ...c, status: "accepted" as const }));
    set({ pendingChanges: updated });

    // Batch update on server
    Promise.all(
      pendingChanges.map((c) =>
        fetch("/api/latex/track-changes", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: c.id, status: "accepted" }),
        })
      )
    ).catch(() => {
      // Silent failure
    });
  },
  rejectAllChanges: () => {
    const { pendingChanges } = get();
    const updated = pendingChanges.map((c) => ({ ...c, status: "rejected" as const }));
    set({ pendingChanges: updated });

    // Batch update on server
    Promise.all(
      pendingChanges.map((c) =>
        fetch("/api/latex/track-changes", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: c.id, status: "rejected" }),
        })
      )
    ).catch(() => {
      // Silent failure
    });
  },

  // Shadow document
  shadowDocument: "",
  setShadowDocument: (shadowDocument) => set({ shadowDocument }),
}));
