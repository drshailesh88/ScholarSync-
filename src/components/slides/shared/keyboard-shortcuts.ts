import { useSlidesStore } from "@/stores/slides-store";

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    target.isContentEditable ||
    target.closest("[contenteditable='true']") !== null
  );
}

function getSortedSlides(state: ReturnType<typeof useSlidesStore.getState>) {
  return [...state.slides].sort((a, b) => a.sortOrder - b.sortOrder);
}

function navigateToSlide(
  state: ReturnType<typeof useSlidesStore.getState>,
  direction: "first" | "last" | "prev" | "next"
) {
  const sortedSlides = getSortedSlides(state);
  if (sortedSlides.length === 0) return;

  const currentIndex = sortedSlides.findIndex((slide) => slide.id === state.activeSlideId);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;

  if (direction === "first") {
    state.setActiveSlide(sortedSlides[0].id);
    return;
  }

  if (direction === "last") {
    state.setActiveSlide(sortedSlides[sortedSlides.length - 1].id);
    return;
  }

  if (direction === "prev") {
    const prevIndex = Math.max(safeIndex - 1, 0);
    state.setActiveSlide(sortedSlides[prevIndex].id);
    return;
  }

  const nextIndex = Math.min(safeIndex + 1, sortedSlides.length - 1);
  state.setActiveSlide(sortedSlides[nextIndex].id);
}

function deleteSelectedBlocks(state: ReturnType<typeof useSlidesStore.getState>) {
  if (state.selectedBlockIndices.size === 0) return;
  state.deleteSelectedBlocks();
}

export function registerGlobalShortcuts(store: typeof useSlidesStore) {
  const onKeyDown = (e: KeyboardEvent) => {
    const state = store.getState();
    const mod = e.ctrlKey || e.metaKey;
    const key = e.key.toLowerCase();

    if (mod && key === "s") {
      e.preventDefault();
      return;
    }

    if (mod && key === "f") {
      e.preventDefault();
      state.setShowFindReplace(!state.showFindReplace);
      return;
    }

    if (e.key === "F5") {
      const sortedSlides = getSortedSlides(state);
      if (sortedSlides.length === 0) return;

      e.preventDefault();
      if (!e.shiftKey) {
        state.setActiveSlide(sortedSlides[0].id);
      }
      state.setIsPresenting(true);
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      if (state.editingBlockIndex !== null) {
        state.setEditingBlockIndex(null);
      } else if (state.selectedBlockIndices.size > 0 || state.allBlocksSelected) {
        state.deselectAll();
      } else if (state.isPresenting) {
        state.setIsPresenting(false);
      }
      return;
    }

    if (state.isPresenting) return;

    const blockEditing = state.editingBlockIndex !== null;
    const editableTarget = isEditableTarget(e.target);

    if (mod && key === "z" && !e.shiftKey && !editableTarget && !blockEditing) {
      e.preventDefault();
      state.undo();
      return;
    }

    if (
      ((mod && key === "y") || (mod && e.shiftKey && key === "z")) &&
      !editableTarget &&
      !blockEditing
    ) {
      e.preventDefault();
      state.redo();
      return;
    }

    if (editableTarget || blockEditing) return;

    if (mod && key === "a") {
      const activeSlide = state.getActiveSlide();
      e.preventDefault();
      if (!activeSlide || activeSlide.contentBlocks.length === 0) {
        state.deselectAll();
        return;
      }
      state.setEditingBlockIndex(null);
      state.selectAllBlocks();
      return;
    }

    if (
      mod &&
      state.selectedBlockIndices.size > 0 &&
      !state.allBlocksSelected &&
      (e.code === "BracketRight" || e.code === "BracketLeft")
    ) {
      const blockIndex = state.getPrimarySelectedBlockIndex();
      if (blockIndex === null) return;

      e.preventDefault();

      if (e.code === "BracketRight") {
        if (e.shiftKey) {
          state.bringToFront(blockIndex);
        } else {
          state.bringForward(blockIndex);
        }
        return;
      }

      if (e.shiftKey) {
        state.sendToBack(blockIndex);
      } else {
        state.sendBackward(blockIndex);
      }
      return;
    }

    if (mod && key === "l" && !e.shiftKey) {
      if (state.selectedBlockIndices.size > 0 && !state.allBlocksSelected) {
        e.preventDefault();
        const blockIndex = state.getPrimarySelectedBlockIndex();
        if (blockIndex !== null) {
          state.toggleBlockLock(blockIndex);
        }
        return;
      }
    }

    if (mod && e.shiftKey && key === "g") {
      e.preventDefault();
      // TODO: implement ungroup selected blocks
      return;
    }

    if (mod && key === "g") {
      e.preventDefault();
      // TODO: implement group selected blocks
      return;
    }

    if (mod && e.shiftKey && key === "d" && state.activeSlideId !== null) {
      e.preventDefault();
      void state.duplicateSlide(state.activeSlideId);
      return;
    }

    if (mod && (key === "c" || key === "x" || key === "v")) {
      if (state.selectedBlockIndices.size > 0) {
        e.preventDefault();
        if (key === "c") {
          state.copyBlock();
        } else if (key === "x") {
          state.cutBlock();
        } else {
          state.pasteBlock();
        }
        return;
      }

      if (key === "c" && state.activeSlideId !== null) {
        state.copySlide(state.activeSlideId);
        return;
      }

      if (key === "v") {
        e.preventDefault();
        void state.pasteSlide();
        return;
      }
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      if (state.selectedBlockIndices.size > 0 || state.allBlocksSelected) {
        // Don't delete if any selected block is locked
        const activeSlide = state.getActiveSlide();
        if (activeSlide) {
          const anyLocked = [...state.selectedBlockIndices].some(
            (idx) => activeSlide.contentBlocks[idx]?.locked
          );
          if (anyLocked) return;
        }
        e.preventDefault();
        deleteSelectedBlocks(state);
      }
      return;
    }

    if (e.key === "Tab" && state.selectedBlockIndices.size > 0 && !state.allBlocksSelected) {
      const activeSlide = state.getActiveSlide();
      if (!activeSlide || activeSlide.contentBlocks.length === 0) return;

      e.preventDefault();
      const currentIndex = state.getPrimarySelectedBlockIndex();
      if (currentIndex === null) return;
      const maxIndex = activeSlide.contentBlocks.length - 1;
      const nextIndex = e.shiftKey
        ? Math.max(currentIndex - 1, 0)
        : Math.min(currentIndex + 1, maxIndex);
      state.selectBlock(nextIndex);
      return;
    }

    if (e.key === "Home") {
      e.preventDefault();
      navigateToSlide(state, "first");
      return;
    }

    if (e.key === "End") {
      e.preventDefault();
      navigateToSlide(state, "last");
      return;
    }

    if (e.key === "PageUp") {
      e.preventDefault();
      navigateToSlide(state, "prev");
      return;
    }

    if (e.key === "PageDown") {
      e.preventDefault();
      navigateToSlide(state, "next");
    }
  };

  window.addEventListener("keydown", onKeyDown);

  return () => {
    window.removeEventListener("keydown", onKeyDown);
  };
}
