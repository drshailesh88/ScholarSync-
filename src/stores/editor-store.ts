import { create } from "zustand";

export type EditorMode = "editing" | "suggesting" | "viewing";

export interface OutlineItem {
  id: string;
  type: "heading" | "figure" | "table";
  level?: number;
  text: string;
  pos: number;
  wordCount?: number;
}

export interface SaveStatus {
  state: "saved" | "saving" | "unsaved" | "offline";
  lastSavedAt?: Date;
}

interface EditorState {
  // Mode
  mode: EditorMode;
  setMode: (mode: EditorMode) => void;

  // Outline
  outline: OutlineItem[];
  setOutline: (outline: OutlineItem[]) => void;
  outlineVisible: boolean;
  toggleOutline: () => void;
  setOutlineVisible: (visible: boolean) => void;

  // Word count
  wordCount: number;
  sectionWordCounts: Record<string, number>;
  setWordCount: (count: number) => void;
  setSectionWordCounts: (counts: Record<string, number>) => void;

  // Save status
  saveStatus: SaveStatus;
  setSaveStatus: (status: SaveStatus) => void;

  // Active section (for outline highlighting)
  activeSectionPos: number | null;
  setActiveSectionPos: (pos: number | null) => void;

  // Sidebars
  referenceSidebarOpen: boolean;
  commentSidebarOpen: boolean;
  toggleReferenceSidebar: () => void;
  toggleCommentSidebar: () => void;

  // Document metadata
  documentTitle: string;
  setDocumentTitle: (title: string) => void;
  documentType: string;
  setDocumentType: (type: string) => void;

  // Reference & comment counts (for top bar badges)
  referenceCount: number;
  commentCount: number;
  setReferenceCount: (count: number) => void;
  setCommentCount: (count: number) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  // Mode
  mode: "editing",
  setMode: (mode) => set({ mode }),

  // Outline
  outline: [],
  setOutline: (outline) => set({ outline }),
  outlineVisible: false,
  toggleOutline: () => set((s) => ({ outlineVisible: !s.outlineVisible })),
  setOutlineVisible: (outlineVisible) => set({ outlineVisible }),

  // Word count
  wordCount: 0,
  sectionWordCounts: {},
  setWordCount: (wordCount) => set({ wordCount }),
  setSectionWordCounts: (sectionWordCounts) => set({ sectionWordCounts }),

  // Save status
  saveStatus: { state: "saved" },
  setSaveStatus: (saveStatus) => set({ saveStatus }),

  // Active section
  activeSectionPos: null,
  setActiveSectionPos: (activeSectionPos) => set({ activeSectionPos }),

  // Sidebars
  referenceSidebarOpen: false,
  commentSidebarOpen: false,
  toggleReferenceSidebar: () =>
    set((s) => ({ referenceSidebarOpen: !s.referenceSidebarOpen })),
  toggleCommentSidebar: () =>
    set((s) => ({ commentSidebarOpen: !s.commentSidebarOpen })),

  // Document metadata
  documentTitle: "Untitled Manuscript",
  setDocumentTitle: (documentTitle) => set({ documentTitle }),
  documentType: "original-article",
  setDocumentType: (documentType) => set({ documentType }),

  // Counts
  referenceCount: 0,
  commentCount: 0,
  setReferenceCount: (referenceCount) => set({ referenceCount }),
  setCommentCount: (commentCount) => set({ commentCount }),
}));
