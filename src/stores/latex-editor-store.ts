import { create } from "zustand";

export type EditorViewMode = "source" | "visual";
export type PreviewMode = "live" | "pdf";
export type CompileStatus = "idle" | "compiling" | "success" | "error";
export type SaveState = "saved" | "saving" | "unsaved" | "error";

interface LatexEditorState {
  // Active file
  activeFileId: string | null;
  setActiveFileId: (id: string | null) => void;

  // Editor mode (source vs visual)
  viewMode: EditorViewMode;
  setViewMode: (mode: EditorViewMode) => void;

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

  // Document content (for preview syncing)
  documentContent: string;
  setDocumentContent: (content: string) => void;

  // Compiled PDF URL (blob URL for pdfjs-dist)
  compiledPdfUrl: string | null;
  setCompiledPdfUrl: (url: string | null) => void;

  // Project title
  projectTitle: string;
  setProjectTitle: (title: string) => void;
}

export const useLatexEditorStore = create<LatexEditorState>((set) => ({
  // Active file
  activeFileId: null,
  setActiveFileId: (activeFileId) => set({ activeFileId }),

  // Editor mode
  viewMode: "source",
  setViewMode: (viewMode) => set({ viewMode }),

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

  // Document content
  documentContent: "",
  setDocumentContent: (documentContent) => set({ documentContent }),

  // Compiled PDF
  compiledPdfUrl: null,
  setCompiledPdfUrl: (compiledPdfUrl) => set({ compiledPdfUrl }),

  // Project title
  projectTitle: "Untitled Paper",
  setProjectTitle: (projectTitle) => set({ projectTitle }),
}));
