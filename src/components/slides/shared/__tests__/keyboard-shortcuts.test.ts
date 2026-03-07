// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { registerGlobalShortcuts } from "../keyboard-shortcuts";
import { useSlidesStore, type SlideState } from "@/stores/slides-store";
import type { ContentBlock } from "@/types/presentation";

type StoreState = ReturnType<typeof useSlidesStore.getState>;

function textBlock(text: string): ContentBlock {
  return { type: "text", data: { text, style: "body" } };
}

function createSlides(): SlideState[] {
  return [
    {
      id: 1,
      sortOrder: 0,
      layout: "title_content",
      title: "Slide 1",
      subtitle: "",
      contentBlocks: [textBlock("A"), textBlock("B"), textBlock("C")],
      speakerNotes: "",
    },
    {
      id: 2,
      sortOrder: 1,
      layout: "title_content",
      title: "Slide 2",
      subtitle: "",
      contentBlocks: [textBlock("D")],
      speakerNotes: "",
    },
    {
      id: 3,
      sortOrder: 2,
      layout: "title_content",
      title: "Slide 3",
      subtitle: "",
      contentBlocks: [textBlock("E")],
      speakerNotes: "",
    },
  ];
}

function createMockStore(initial?: Partial<StoreState>) {
  const state = {
    slides: createSlides(),
    activeSlideId: 2,
    selectedBlockIndices: new Set<number>([1]),
    allBlocksSelected: false,
    editingBlockIndex: null,
    isPresenting: false,
    showFindReplace: false,
  } as unknown as StoreState;

  const spies = {
    setShowFindReplace: vi.fn((v: boolean) => {
      state.showFindReplace = v;
    }),
    selectBlock: vi.fn((index: number, addToSelection?: boolean) => {
      if (addToSelection) {
        if (state.selectedBlockIndices.has(index)) {
          state.selectedBlockIndices.delete(index);
        } else {
          state.selectedBlockIndices.add(index);
        }
      } else {
        state.selectedBlockIndices = new Set<number>([index]);
      }
      state.allBlocksSelected = false;
    }),
    selectAllBlocks: vi.fn(() => {
      const activeSlide = state.slides.find((slide) => slide.id === state.activeSlideId);
      if (!activeSlide) {
        state.selectedBlockIndices = new Set<number>();
        state.allBlocksSelected = false;
        return;
      }
      state.selectedBlockIndices = new Set<number>(
        activeSlide.contentBlocks.map((_block, index) => index)
      );
      state.allBlocksSelected = activeSlide.contentBlocks.length > 0;
    }),
    deselectAll: vi.fn(() => {
      state.selectedBlockIndices = new Set<number>();
      state.allBlocksSelected = false;
    }),
    getPrimarySelectedBlockIndex: vi.fn(() => {
      const activeSlide = state.slides.find((slide) => slide.id === state.activeSlideId);
      if (!activeSlide) return null;
      const sorted = [...state.selectedBlockIndices]
        .filter((index) => index >= 0 && index < activeSlide.contentBlocks.length)
        .sort((a, b) => a - b);
      return sorted.length > 0 ? sorted[0] : null;
    }),
    setAllBlocksSelected: vi.fn((v: boolean) => {
      state.allBlocksSelected = v;
      if (!v) {
        state.selectedBlockIndices = new Set<number>();
        return;
      }
      const activeSlide = state.slides.find((slide) => slide.id === state.activeSlideId);
      state.selectedBlockIndices = new Set<number>(
        (activeSlide?.contentBlocks ?? []).map((_block, index) => index)
      );
    }),
    setEditingBlockIndex: vi.fn((idx: number | null) => {
      state.editingBlockIndex = idx;
    }),
    setIsPresenting: vi.fn((v: boolean) => {
      state.isPresenting = v;
    }),
    setActiveSlide: vi.fn((id: number | null) => {
      state.activeSlideId = id;
      state.selectedBlockIndices = new Set<number>();
      state.allBlocksSelected = false;
      state.editingBlockIndex = null;
    }),
    getActiveSlide: vi.fn(() =>
      state.slides.find((slide) => slide.id === state.activeSlideId) ?? null
    ),
    updateSlide: vi.fn((id: number, data: Partial<SlideState>) => {
      state.slides = state.slides.map((slide) =>
        slide.id === id ? { ...slide, ...data } : slide
      );
    }),
    deleteSelectedBlocks: vi.fn(() => {
      const activeSlide = state.slides.find((slide) => slide.id === state.activeSlideId);
      if (!activeSlide) return;
      const nextBlocks = activeSlide.contentBlocks.filter(
        (_block, index) => !state.selectedBlockIndices.has(index)
      );
      state.slides = state.slides.map((slide) =>
        slide.id === activeSlide.id ? { ...slide, contentBlocks: nextBlocks } : slide
      );
      state.selectedBlockIndices = new Set<number>();
      state.allBlocksSelected = false;
    }),
    duplicateSlide: vi.fn(async (_id: number) => undefined),
    copySlide: vi.fn((_id: number) => undefined),
    pasteSlide: vi.fn(async () => undefined),
    copyBlock: vi.fn(() => undefined),
    cutBlock: vi.fn(() => undefined),
    pasteBlock: vi.fn(() => undefined),
    bringToFront: vi.fn((_index: number) => undefined),
    sendToBack: vi.fn((_index: number) => undefined),
    bringForward: vi.fn((_index: number) => undefined),
    sendBackward: vi.fn((_index: number) => undefined),
    undo: vi.fn(() => undefined),
    redo: vi.fn(() => undefined),
  };

  Object.assign(state, spies, initial ?? {});

  const store = {
    getState: () => state,
  } as unknown as typeof useSlidesStore;

  return { store, state, spies };
}

function dispatchKeyboardEvent(
  key: string,
  options: KeyboardEventInit = {},
  target: EventTarget = window
) {
  const event = new KeyboardEvent("keydown", {
    key,
    bubbles: true,
    cancelable: true,
    ...options,
  });

  if (target === window) {
    window.dispatchEvent(event);
  } else {
    (target as HTMLElement).dispatchEvent(event);
  }

  return event;
}

describe("registerGlobalShortcuts", () => {
  let cleanup: (() => void) | null = null;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (cleanup) {
      cleanup();
      cleanup = null;
    }
    document.body.innerHTML = "";
  });

  it("Ctrl+S prevents default browser save", () => {
    const { store } = createMockStore();
    cleanup = registerGlobalShortcuts(store);

    const event = dispatchKeyboardEvent("s", { ctrlKey: true });

    expect(event.defaultPrevented).toBe(true);
  });

  it("Ctrl+A selects all blocks when not editing", () => {
    const { store, state, spies } = createMockStore({
      activeSlideId: 1,
      selectedBlockIndices: new Set<number>([0]),
    });
    cleanup = registerGlobalShortcuts(store);

    const event = dispatchKeyboardEvent("a", { ctrlKey: true });

    expect(event.defaultPrevented).toBe(true);
    expect(spies.selectAllBlocks).toHaveBeenCalled();
    expect(state.allBlocksSelected).toBe(true);
    expect([...state.selectedBlockIndices].sort((a, b) => a - b)).toEqual([0, 1, 2]);
  });

  it("Ctrl+G and Ctrl+Shift+G are handled without propagation", () => {
    const { store } = createMockStore();
    cleanup = registerGlobalShortcuts(store);

    const groupEvent = new KeyboardEvent("keydown", { key: "g", ctrlKey: true, bubbles: true, cancelable: true });
    const ungroupEvent = new KeyboardEvent("keydown", { key: "g", ctrlKey: true, shiftKey: true, bubbles: true, cancelable: true });

    window.dispatchEvent(groupEvent);
    window.dispatchEvent(ungroupEvent);

    expect(groupEvent.defaultPrevented).toBe(true);
    expect(ungroupEvent.defaultPrevented).toBe(true);
  });

  it("Escape exits editing first, then selection, then presentation", () => {
    const { store, state, spies } = createMockStore({ editingBlockIndex: 2 });
    cleanup = registerGlobalShortcuts(store);

    dispatchKeyboardEvent("Escape");
    expect(spies.setEditingBlockIndex).toHaveBeenCalledWith(null);

    spies.setEditingBlockIndex.mockClear();
    state.selectedBlockIndices = new Set<number>([1]);
    dispatchKeyboardEvent("Escape");
    expect(spies.deselectAll).toHaveBeenCalled();

    spies.deselectAll.mockClear();
    state.selectedBlockIndices = new Set<number>();
    state.isPresenting = true;
    dispatchKeyboardEvent("Escape");
    expect(spies.setIsPresenting).toHaveBeenCalledWith(false);
  });

  it("Delete and Backspace remove selected blocks when not editing", () => {
    const { store, state, spies } = createMockStore({
      activeSlideId: 1,
      selectedBlockIndices: new Set<number>([1]),
    });
    cleanup = registerGlobalShortcuts(store);

    const deleteEvent = dispatchKeyboardEvent("Delete");
    expect(deleteEvent.defaultPrevented).toBe(true);
    expect(spies.deleteSelectedBlocks).toHaveBeenCalledTimes(1);
    expect(state.getActiveSlide()?.contentBlocks).toEqual([textBlock("A"), textBlock("C")]);

    spies.deleteSelectedBlocks.mockClear();
    state.selectedBlockIndices = new Set<number>([0]);
    const backspaceEvent = dispatchKeyboardEvent("Backspace");
    expect(backspaceEvent.defaultPrevented).toBe(true);
    expect(spies.deleteSelectedBlocks).toHaveBeenCalledTimes(1);
  });

  it("Tab and Shift+Tab navigate selected block when not editing", () => {
    const { store, state } = createMockStore({
      activeSlideId: 1,
      selectedBlockIndices: new Set<number>([0]),
    });
    cleanup = registerGlobalShortcuts(store);

    const tabEvent = dispatchKeyboardEvent("Tab");
    expect(tabEvent.defaultPrevented).toBe(true);
    expect([...state.selectedBlockIndices]).toEqual([1]);

    const shiftTabEvent = dispatchKeyboardEvent("Tab", { shiftKey: true });
    expect(shiftTabEvent.defaultPrevented).toBe(true);
    expect([...state.selectedBlockIndices]).toEqual([0]);
  });

  it("Home/End/PageUp/PageDown navigate slides", () => {
    const { store, state } = createMockStore({ activeSlideId: 2 });
    cleanup = registerGlobalShortcuts(store);

    dispatchKeyboardEvent("Home");
    expect(state.activeSlideId).toBe(1);

    dispatchKeyboardEvent("End");
    expect(state.activeSlideId).toBe(3);

    dispatchKeyboardEvent("PageUp");
    expect(state.activeSlideId).toBe(2);

    dispatchKeyboardEvent("PageDown");
    expect(state.activeSlideId).toBe(3);
  });

  it("F5 and Shift+F5 start presentation from beginning/current slide", () => {
    const { store, state, spies } = createMockStore({ activeSlideId: 2 });
    cleanup = registerGlobalShortcuts(store);

    dispatchKeyboardEvent("F5");
    expect(spies.setActiveSlide).toHaveBeenCalledWith(1);
    expect(spies.setIsPresenting).toHaveBeenCalledWith(true);

    spies.setActiveSlide.mockClear();
    spies.setIsPresenting.mockClear();
    state.activeSlideId = 2;

    dispatchKeyboardEvent("F5", { shiftKey: true });
    expect(spies.setActiveSlide).not.toHaveBeenCalled();
    expect(spies.setIsPresenting).toHaveBeenCalledWith(true);
  });

  it("Ctrl+Shift+D duplicates the current slide", () => {
    const { store, spies } = createMockStore({ activeSlideId: 2 });
    cleanup = registerGlobalShortcuts(store);

    const event = dispatchKeyboardEvent("d", { ctrlKey: true, shiftKey: true });

    expect(event.defaultPrevented).toBe(true);
    expect(spies.duplicateSlide).toHaveBeenCalledWith(2);
  });

  it("Ctrl+] and Ctrl+[ move selected block one layer", () => {
    const { store, spies } = createMockStore({
      activeSlideId: 1,
      selectedBlockIndices: new Set<number>([1]),
    });
    cleanup = registerGlobalShortcuts(store);

    const forwardEvent = dispatchKeyboardEvent("]", {
      ctrlKey: true,
      code: "BracketRight",
    });
    const backwardEvent = dispatchKeyboardEvent("[", {
      ctrlKey: true,
      code: "BracketLeft",
    });

    expect(forwardEvent.defaultPrevented).toBe(true);
    expect(backwardEvent.defaultPrevented).toBe(true);
    expect(spies.bringForward).toHaveBeenCalledWith(1);
    expect(spies.sendBackward).toHaveBeenCalledWith(1);
  });

  it("Ctrl+Shift+] and Ctrl+Shift+[ move selected block to front/back", () => {
    const { store, spies } = createMockStore({
      activeSlideId: 1,
      selectedBlockIndices: new Set<number>([1]),
    });
    cleanup = registerGlobalShortcuts(store);

    const frontEvent = dispatchKeyboardEvent("}", {
      ctrlKey: true,
      shiftKey: true,
      code: "BracketRight",
    });
    const backEvent = dispatchKeyboardEvent("{", {
      ctrlKey: true,
      shiftKey: true,
      code: "BracketLeft",
    });

    expect(frontEvent.defaultPrevented).toBe(true);
    expect(backEvent.defaultPrevented).toBe(true);
    expect(spies.bringToFront).toHaveBeenCalledWith(1);
    expect(spies.sendToBack).toHaveBeenCalledWith(1);
  });

  it("does not intercept text-editing shortcuts while a block is being edited", () => {
    const editable = document.createElement("div");
    editable.setAttribute("contenteditable", "true");
    document.body.appendChild(editable);

    const { store, spies } = createMockStore({
      activeSlideId: 1,
      selectedBlockIndices: new Set<number>([1]),
      editingBlockIndex: 1,
    });
    cleanup = registerGlobalShortcuts(store);

    const selectAllEvent = dispatchKeyboardEvent("a", { ctrlKey: true }, editable);
    const deleteEvent = dispatchKeyboardEvent("Delete", {}, editable);
    const tabEvent = dispatchKeyboardEvent("Tab", {}, editable);

    expect(selectAllEvent.defaultPrevented).toBe(false);
    expect(deleteEvent.defaultPrevented).toBe(false);
    expect(tabEvent.defaultPrevented).toBe(false);
    expect(spies.selectAllBlocks).not.toHaveBeenCalled();
    expect(spies.updateSlide).not.toHaveBeenCalled();
    expect(spies.selectBlock).not.toHaveBeenCalled();
  });
});
