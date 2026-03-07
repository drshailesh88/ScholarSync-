import { create } from "zustand";
import type { Editor as TiptapEditor } from "@tiptap/core";
import type { TableCellMeta } from "@/types/presentation";

export interface ActiveTableCellState {
  key: string;
  rowIndex: number;
  columnIndex: number;
  isHeader: boolean;
  meta: TableCellMeta;
}

interface TableEditorState {
  activeBlockIndex: number | null;
  editor: TiptapEditor | null;
  selectedCell: ActiveTableCellState | null;
  canMergeCells: boolean;
  canSplitCell: boolean;
  setActiveEditor: (blockIndex: number, editor: TiptapEditor) => void;
  clearActiveEditor: (blockIndex?: number) => void;
  setSelectionState: (state: {
    selectedCell: ActiveTableCellState | null;
    canMergeCells: boolean;
    canSplitCell: boolean;
  }) => void;
}

export const useTableEditorStore = create<TableEditorState>((set, get) => ({
  activeBlockIndex: null,
  editor: null,
  selectedCell: null,
  canMergeCells: false,
  canSplitCell: false,
  setActiveEditor: (activeBlockIndex, editor) =>
    set({
      activeBlockIndex,
      editor,
    }),
  clearActiveEditor: (blockIndex) => {
    const currentBlockIndex = get().activeBlockIndex;
    if (blockIndex !== undefined && currentBlockIndex !== blockIndex) return;
    set({
      activeBlockIndex: null,
      editor: null,
      selectedCell: null,
      canMergeCells: false,
      canSplitCell: false,
    });
  },
  setSelectionState: ({ selectedCell, canMergeCells, canSplitCell }) =>
    set({
      selectedCell,
      canMergeCells,
      canSplitCell,
    }),
}));
