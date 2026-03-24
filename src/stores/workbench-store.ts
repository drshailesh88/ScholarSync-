import { create } from "zustand";

export type WorkbenchTool = "sources" | "assistant" | "review";
export type WorkbenchAssistantMode = "ask" | "draft" | "learn";
export type WorkbenchReviewTab = "comments" | "integrity";
export type WorkbenchSourcesTab = "search" | "library" | "cited";

interface WorkbenchStore {
  isOpen: boolean;
  activeTool: WorkbenchTool;
  activeAssistantMode: WorkbenchAssistantMode;
  activeReviewTab: WorkbenchReviewTab;
  activeSourcesTab: WorkbenchSourcesTab;
  pendingPrompt: string | null;

  open: (tool?: WorkbenchTool) => void;
  close: () => void;
  setTool: (tool: WorkbenchTool) => void;
  toggle: (tool?: WorkbenchTool) => void;
  setActiveAssistantMode: (mode: WorkbenchAssistantMode) => void;
  setActiveReviewTab: (tab: WorkbenchReviewTab) => void;
  setActiveSourcesTab: (tab: WorkbenchSourcesTab) => void;
  submitPrompt: (prompt: string) => void;
  clearPendingPrompt: () => void;
}

export const useWorkbenchStore = create<WorkbenchStore>((set, get) => ({
  isOpen: false,
  activeTool: "sources",
  activeAssistantMode: "ask",
  activeReviewTab: "comments",
  activeSourcesTab: "search",
  pendingPrompt: null,

  open: (tool) =>
    set({ isOpen: true, ...(tool ? { activeTool: tool } : {}) }),

  close: () => set({ isOpen: false }),

  setTool: (tool) => set({ activeTool: tool }),

  setActiveAssistantMode: (mode) => set({ activeAssistantMode: mode }),

  setActiveReviewTab: (tab) => set({ activeReviewTab: tab }),

  setActiveSourcesTab: (tab) => set({ activeSourcesTab: tab }),

  toggle: (tool) => {
    const state = get();
    if (!state.isOpen) {
      // Closed → open to the given tool (or current)
      set({ isOpen: true, ...(tool ? { activeTool: tool } : {}) });
    } else if (tool && state.activeTool !== tool) {
      // Open but different tool → switch
      set({ activeTool: tool });
    } else {
      // Open and same tool (or no tool specified) → close
      set({ isOpen: false });
    }
  },

  submitPrompt: (prompt) =>
    set({
      pendingPrompt: prompt,
      isOpen: true,
      activeTool: "assistant",
      activeAssistantMode: "ask",
    }),

  clearPendingPrompt: () => set({ pendingPrompt: null }),
}));
