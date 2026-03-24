import { create } from "zustand";

export type WorkbenchTool = "sources" | "assistant" | "review";

interface WorkbenchStore {
  isOpen: boolean;
  activeTool: WorkbenchTool;

  open: (tool?: WorkbenchTool) => void;
  close: () => void;
  setTool: (tool: WorkbenchTool) => void;
  toggle: (tool?: WorkbenchTool) => void;
}

export const useWorkbenchStore = create<WorkbenchStore>((set, get) => ({
  isOpen: false,
  activeTool: "sources",

  open: (tool) =>
    set({ isOpen: true, ...(tool ? { activeTool: tool } : {}) }),

  close: () => set({ isOpen: false }),

  setTool: (tool) => set({ activeTool: tool }),

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
}));
