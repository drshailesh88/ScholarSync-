"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useSlidesStore } from "@/stores/slides-store";
import type {
  BlockPosition,
  ContentBlock,
  ThemeConfig,
  SlideLayout,
  ImageCrop,
  BlockAnimation,
} from "@/types/presentation";
import { PRESET_THEMES } from "@/types/presentation";
import { useContextMenu } from "@/hooks/use-context-menu";
import {
  buildBlockAnimationStylesheet,
  estimateBlockTypewriterSteps,
  getAnimatedBlockEntries,
  getAnimationRunTimeSeconds,
  getBlockAnimationPlaybackProps,
  getRevealOrders,
  hasRevealAnimation,
  normalizeAnimationOrder,
  type BlockAnimationPlaybackState,
} from "@/lib/presentation/block-animations";
import { computeLayout, regionToCSS } from "../shared/slide-layout-engine";
import type { ContextMenuItem } from "../shared/context-menu";
import { ThemeProvider } from "../shared/theme-engine";
import { AnimationTimeline } from "../shared/animation-timeline";
import {
  getSlideBackgroundOverlayStyle,
  getSlideBackgroundStyle,
} from "../shared/slide-background";
import { GridOverlay } from "../shared/grid-overlay";
import { CanvasRulers, type RulerUnit } from "../shared/canvas-rulers";
import { Lock, LockOpen } from "@phosphor-icons/react";
import { ArrowCounterClockwise } from "@phosphor-icons/react";
import { BLOCK_REGISTRY, createDefaultBlock } from "../blocks";
import { ImageBlock } from "../blocks/image-block";
import { BlockSelectionWrapper } from "./block-selection-wrapper";
import { EditableTextBlock, EditableBulletsBlock } from "./editable-text-block";
import { EditableTableBlock } from "./editable-table-block";
import { BlockInserter } from "./block-inserter";
import { RemoteCursorsSlot } from "../shared/collaboration-slots";
import { rectsIntersect, toBoundsRect, type DragSelection } from "./selection-utils";
import {
  getSlideMasterById,
  masterPlaceholderPrompt,
} from "../shared/slide-master-utils";
import { SlideRegenerateDialog } from "../shared/slide-regenerate-dialog";
import type { RegenerateTone } from "@/lib/slides/regenerate";

const BLOCK_ANIMATION_STYLESHEET = buildBlockAnimationStylesheet();

// ---------------------------------------------------------------------------
// SlideCanvasWYSIWYG — The slide IS the editor.
// Each content block is clickable and editable in-place.
// ---------------------------------------------------------------------------

interface CanvasPreviewState {
  running: boolean;
  revealedOrder: number;
  activeOrder: number | null;
}

const IDLE_PREVIEW_STATE: CanvasPreviewState = {
  running: false,
  revealedOrder: Number.MAX_SAFE_INTEGER,
  activeOrder: null,
};

export function SlideCanvasWYSIWYG() {
  const activeSlide = useSlidesStore((s) => s.getActiveSlide());
  const masters = useSlidesStore((s) => s.masters);
  const themeKey = useSlidesStore((s) => s.themeKey);
  const themeConfig = useSlidesStore((s) => s.themeConfig);
  const institutionKit = useSlidesStore((s) => s.institutionKit);
  const updateSlide = useSlidesStore((s) => s.updateSlide);
  const addSlide = useSlidesStore((s) => s.addSlide);
  const regenerateSlide = useSlidesStore((s) => s.regenerateSlide);
  const setRightPanel = useSlidesStore((s) => s.setRightPanel);
  const clipboardBlocks = useSlidesStore((s) => s.clipboardBlocks);
  const copyBlock = useSlidesStore((s) => s.copyBlock);
  const cutBlock = useSlidesStore((s) => s.cutBlock);
  const pasteBlock = useSlidesStore((s) => s.pasteBlock);
  const deleteSelectedBlocks = useSlidesStore((s) => s.deleteSelectedBlocks);
  const bringToFront = useSlidesStore((s) => s.bringToFront);
  const sendToBack = useSlidesStore((s) => s.sendToBack);
  const bringForward = useSlidesStore((s) => s.bringForward);
  const sendBackward = useSlidesStore((s) => s.sendBackward);
  const lockBlock = useSlidesStore((s) => s.lockBlock);
  const unlockBlock = useSlidesStore((s) => s.unlockBlock);
  const showGrid = useSlidesStore((s) => s.showGrid);
  const showRulers = useSlidesStore((s) => s.showRulers);
  const gridSize = useSlidesStore((s) => s.gridSize);
  const snapToGrid = useSlidesStore((s) => s.snapToGrid);

  // Block selection lives in the store so the properties panel can see it
  const selectedBlockIndices = useSlidesStore((s) => s.selectedBlockIndices);
  const primarySelectedBlockIndex = useSlidesStore((s) => s.getPrimarySelectedBlockIndex());
  const selectBlock = useSlidesStore((s) => s.selectBlock);
  const selectAllBlocks = useSlidesStore((s) => s.selectAllBlocks);
  const deselectAll = useSlidesStore((s) => s.deselectAll);
  const isBlockSelected = useSlidesStore((s) => s.isBlockSelected);
  const allBlocksSelected = useSlidesStore((s) => s.allBlocksSelected);
  const editingBlockIndex = useSlidesStore((s) => s.editingBlockIndex);
  const setEditingBlockIndex = useSlidesStore((s) => s.setEditingBlockIndex);

  const theme = themeConfig ?? PRESET_THEMES[themeKey] ?? PRESET_THEMES.modern;
  const activeMaster = useMemo(
    () => getSlideMasterById(masters, activeSlide?.masterId),
    [activeSlide?.masterId, masters]
  );

  // Title/subtitle editing stays local (block editing is in the store for global shortcuts)
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingSubtitle, setEditingSubtitle] = useState(false);
  const [contextBlockIndex, setContextBlockIndex] = useState<number | null>(null);
  const [showRegenerateDialog, setShowRegenerateDialog] = useState(false);
  const [marqueeRect, setMarqueeRect] = useState<DragSelection | null>(null);
  const [mouseRulerPosition, setMouseRulerPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [selectedRulerBounds, setSelectedRulerBounds] = useState<BlockPosition | null>(null);
  const [rulerUnit, setRulerUnit] = useState<RulerUnit>("percent");
  const [previewState, setPreviewState] = useState<CanvasPreviewState>(IDLE_PREVIEW_STATE);

  const canvasRef = useRef<HTMLDivElement>(null);
  const rulerSurfaceRef = useRef<HTMLDivElement>(null);
  const previewTimersRef = useRef<number[]>([]);
  const suppressNextCanvasClickRef = useRef(false);
  const prevSlideIdRef = useRef(activeSlide?.id);
  const {
    openMenu: openCanvasMenu,
    closeMenu: closeCanvasMenu,
    ContextMenuPortal: CanvasContextMenuPortal,
  } = useContextMenu();
  const {
    openMenu: openBlockMenu,
    closeMenu: closeBlockMenu,
    ContextMenuPortal: BlockContextMenuPortal,
  } = useContextMenu();

  const cloneBlock = useCallback(
    (block: ContentBlock): ContentBlock =>
      JSON.parse(JSON.stringify(block)) as ContentBlock,
    []
  );

  const clearPreviewTimers = useCallback(() => {
    for (const timerId of previewTimersRef.current) {
      window.clearTimeout(timerId);
    }
    previewTimersRef.current = [];
  }, []);

  // Reset selection when active slide changes
  if (prevSlideIdRef.current !== activeSlide?.id) {
    prevSlideIdRef.current = activeSlide?.id;
    if (selectedBlockIndices.size > 0) deselectAll();
    if (editingBlockIndex !== null) setEditingBlockIndex(null);
    if (editingTitle) setEditingTitle(false);
    if (editingSubtitle) setEditingSubtitle(false);
  }

  const toRulerPercent = useCallback((clientX: number, clientY: number) => {
    const surface = rulerSurfaceRef.current;
    if (!surface) return null;
    const rect = surface.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return null;
    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      return null;
    }

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    return {
      x: Number(Math.min(Math.max(x, 0), 100).toFixed(4)),
      y: Number(Math.min(Math.max(y, 0), 100).toFixed(4)),
    };
  }, []);

  const measureSelectedRulerBounds = useCallback(() => {
    if (!showRulers) {
      setSelectedRulerBounds(null);
      return;
    }

    const surface = rulerSurfaceRef.current;
    if (!surface || primarySelectedBlockIndex === null) {
      setSelectedRulerBounds(null);
      return;
    }

    const selectedEl =
      surface.querySelector<HTMLElement>(
        `[data-block-index="${primarySelectedBlockIndex}"][data-drag-ghost="true"]`
      ) ??
      surface.querySelector<HTMLElement>(`[data-block-index="${primarySelectedBlockIndex}"]`);

    if (!selectedEl) {
      setSelectedRulerBounds(null);
      return;
    }

    const surfaceRect = surface.getBoundingClientRect();
    const blockRect = selectedEl.getBoundingClientRect();
    if (surfaceRect.width <= 0 || surfaceRect.height <= 0) {
      setSelectedRulerBounds(null);
      return;
    }

    const x = ((blockRect.left - surfaceRect.left) / surfaceRect.width) * 100;
    const y = ((blockRect.top - surfaceRect.top) / surfaceRect.height) * 100;
    const width = (blockRect.width / surfaceRect.width) * 100;
    const height = (blockRect.height / surfaceRect.height) * 100;

    setSelectedRulerBounds({
      x: Number(Math.min(Math.max(x, 0), 100).toFixed(4)),
      y: Number(Math.min(Math.max(y, 0), 100).toFixed(4)),
      width: Number(Math.min(Math.max(width, 0), 100).toFixed(4)),
      height: Number(Math.min(Math.max(height, 0), 100).toFixed(4)),
    });
  }, [primarySelectedBlockIndex, showRulers]);

  const handleRulerSurfaceMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!showRulers) return;
      setMouseRulerPosition(toRulerPercent(event.clientX, event.clientY));
    },
    [showRulers, toRulerPercent]
  );

  const handleRulerSurfaceMouseLeave = useCallback(() => {
    setMouseRulerPosition(null);
  }, []);

  // Click on canvas background deselects
  const handleCanvasClick = useCallback(() => {
    if (suppressNextCanvasClickRef.current) {
      suppressNextCanvasClickRef.current = false;
      return;
    }
    deselectAll();
    setEditingBlockIndex(null);
    setEditingTitle(false);
    setEditingSubtitle(false);
  }, [deselectAll, setEditingBlockIndex]);

  // Update a specific block in the slide
  const updateBlock = useCallback(
    (blockIndex: number, updatedBlock: ContentBlock) => {
      if (!activeSlide) return;
      const newBlocks = [...activeSlide.contentBlocks];
      newBlocks[blockIndex] = updatedBlock;
      updateSlide(activeSlide.id, { contentBlocks: newBlocks });
    },
    [activeSlide, updateSlide]
  );

  const getRenderedBlockBounds = useCallback((blockIndex: number): BlockPosition | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const element = canvas.querySelector<HTMLElement>(
      `[data-block-index="${blockIndex}"]`
    );
    if (!element) return null;

    const canvasRect = canvas.getBoundingClientRect();
    const blockRect = element.getBoundingClientRect();
    if (canvasRect.width <= 0 || canvasRect.height <= 0) return null;

    return {
      x: Number((((blockRect.left - canvasRect.left) / canvasRect.width) * 100).toFixed(4)),
      y: Number((((blockRect.top - canvasRect.top) / canvasRect.height) * 100).toFixed(4)),
      width: Number(((blockRect.width / canvasRect.width) * 100).toFixed(4)),
      height: Number(((blockRect.height / canvasRect.height) * 100).toFixed(4)),
    };
  }, []);

  const moveBlock = useCallback(
    (blockIndex: number, position: BlockPosition) => {
      if (!activeSlide) return;
      const block = activeSlide.contentBlocks[blockIndex];
      if (!block) return;

      const selectedIndices = [...selectedBlockIndices].sort((a, b) => a - b);
      const canMoveAsGroup =
        selectedIndices.length > 1 && selectedIndices.includes(blockIndex);

      if (!canMoveAsGroup) {
        updateBlock(blockIndex, { ...block, position });
        return;
      }

      const startingPosition =
        block.position ?? getRenderedBlockBounds(blockIndex) ?? position;
      const deltaX = position.x - startingPosition.x;
      const deltaY = position.y - startingPosition.y;

      /* empty state: no data, no results, nothing here */
      const startPositions = selectedIndices
        .map((index) => {
          const item = activeSlide.contentBlocks[index];
          if (!item) return null;
          return {
            index,
            block: item,
            position: item.position ?? getRenderedBlockBounds(index),
          };
        })
        .filter(
          (
            entry
          ): entry is { index: number; block: ContentBlock; position: BlockPosition } =>
            entry !== null && entry.position !== null
        );

      if (startPositions.length === 0) return;

      const minDeltaX = Math.max(...startPositions.map((entry) => -entry.position.x));
      const maxDeltaX = Math.min(
        ...startPositions.map((entry) => 100 - (entry.position.x + entry.position.width))
      );
      const minDeltaY = Math.max(...startPositions.map((entry) => -entry.position.y));
      const maxDeltaY = Math.min(
        ...startPositions.map((entry) => 100 - (entry.position.y + entry.position.height))
      );

      const clampedDeltaX = Math.min(Math.max(deltaX, minDeltaX), maxDeltaX);
      const clampedDeltaY = Math.min(Math.max(deltaY, minDeltaY), maxDeltaY);

      const newBlocks = [...activeSlide.contentBlocks];
      for (const entry of startPositions) {
        const updatedPosition: BlockPosition = {
          ...entry.position,
          x: Number((entry.position.x + clampedDeltaX).toFixed(4)),
          y: Number((entry.position.y + clampedDeltaY).toFixed(4)),
        };
        newBlocks[entry.index] = { ...entry.block, position: updatedPosition };
      }
      updateSlide(activeSlide.id, { contentBlocks: newBlocks });
    },
    [
      activeSlide,
      getRenderedBlockBounds,
      selectedBlockIndices,
      updateBlock,
      updateSlide,
    ]
  );

  // Delete a block
  const deleteBlock = useCallback(
    (blockIndex: number) => {
      if (!activeSlide) return;
      const newBlocks = activeSlide.contentBlocks.filter((_, i) => i !== blockIndex);
      updateSlide(activeSlide.id, { contentBlocks: newBlocks });
      deselectAll();
      setEditingBlockIndex(null);
    },
    [activeSlide, deselectAll, setEditingBlockIndex, updateSlide]
  );

  const deleteBySelection = useCallback(
    (blockIndex: number) => {
      if (
        selectedBlockIndices.size > 1 &&
        selectedBlockIndices.has(blockIndex)
      ) {
        deleteSelectedBlocks();
        return;
      }
      deleteBlock(blockIndex);
    },
    [deleteBlock, deleteSelectedBlocks, selectedBlockIndices]
  );

  // Insert a block after a given index
  const insertBlockAfter = useCallback(
    (afterIndex: number, block: ContentBlock) => {
      if (!activeSlide) return;
      const newBlocks = [...activeSlide.contentBlocks];
      newBlocks.splice(afterIndex + 1, 0, block);
      updateSlide(activeSlide.id, { contentBlocks: newBlocks });
      selectBlock(afterIndex + 1);
    },
    [activeSlide, selectBlock, updateSlide]
  );

  // Insert a block at the end
  const appendBlock = useCallback(
    (block: ContentBlock) => {
      if (!activeSlide) return;
      const newBlocks = [...activeSlide.contentBlocks, block];
      updateSlide(activeSlide.id, { contentBlocks: newBlocks });
      selectBlock(newBlocks.length - 1);
    },
    [activeSlide, selectBlock, updateSlide]
  );

  const insertFromMasterPlaceholder = useCallback(
    (placeholderId: string) => {
      if (!activeSlide || !activeMaster) return;
      const placeholder = activeMaster.placeholders.find((entry) => entry.id === placeholderId);
      if (!placeholder) return;

      const nextBlock = {
        ...createDefaultBlock(placeholder.defaultType),
        placeholderId: placeholder.id,
        position: { ...placeholder.position },
      } as ContentBlock;
      const nextBlocks = [...activeSlide.contentBlocks, nextBlock];
      const nextIndex = nextBlocks.length - 1;
      updateSlide(activeSlide.id, { contentBlocks: nextBlocks });
      selectBlock(nextIndex);
      setEditingBlockIndex(nextIndex);
    },
    [activeMaster, activeSlide, selectBlock, setEditingBlockIndex, updateSlide]
  );

  const copyBlockByIndex = useCallback(
    (blockIndex: number) => {
      if (!activeSlide?.contentBlocks[blockIndex]) return;
      selectBlock(blockIndex);
      copyBlock();
    },
    [activeSlide, copyBlock, selectBlock]
  );

  const duplicateBlockByIndex = useCallback(
    (blockIndex: number) => {
      if (!activeSlide) return;
      const block = activeSlide.contentBlocks[blockIndex];
      if (!block) return;
      insertBlockAfter(blockIndex, cloneBlock(block));
    },
    [activeSlide, cloneBlock, insertBlockAfter]
  );

  const pasteBlockAfterIndex = useCallback(
    (blockIndex: number) => {
      selectBlock(blockIndex);
      pasteBlock();
    },
    [pasteBlock, selectBlock]
  );

  const pasteBlockToCanvas = useCallback(() => {
    deselectAll();
    pasteBlock();
  }, [deselectAll, pasteBlock]);

  const getBlockRenderZIndex = useCallback(
    (block: ContentBlock, blockIndex: number) => block.zIndex ?? blockIndex,
    []
  );

  const applyMarqueeSelection = useCallback(
    (dragState: DragSelection) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const selectionRect = toBoundsRect(dragState);
      const width = selectionRect.right - selectionRect.left;
      const height = selectionRect.bottom - selectionRect.top;
      if (width < 3 && height < 3) return;

      const canvasRect = canvas.getBoundingClientRect();
      const blockElements = canvas.querySelectorAll<HTMLElement>("[data-block-index]");
      const nextSelection: number[] = [];

      blockElements.forEach((element) => {
        const indexAttr = element.dataset.blockIndex;
        if (!indexAttr) return;
        const index = Number(indexAttr);
        if (!Number.isFinite(index)) return;

        const blockRect = element.getBoundingClientRect();
        const blockLeft = blockRect.left - canvasRect.left;
        const blockTop = blockRect.top - canvasRect.top;
        const blockRight = blockLeft + blockRect.width;
        const blockBottom = blockTop + blockRect.height;

        const intersects = rectsIntersect(selectionRect, {
          left: blockLeft,
          top: blockTop,
          right: blockRight,
          bottom: blockBottom,
        });

        if (intersects && !nextSelection.includes(index)) {
          nextSelection.push(index);
        }
      });

      setEditingBlockIndex(null);
      setEditingTitle(false);
      setEditingSubtitle(false);
      deselectAll();
      if (nextSelection.length === 0) return;
      selectBlock(nextSelection[0]);
      nextSelection.slice(1).forEach((index) => selectBlock(index, true));
    },
    [deselectAll, selectBlock, setEditingBlockIndex]
  );

  const handleCanvasMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      const target = e.target as HTMLElement;
      if (target.closest("[data-block-index]")) return;
      if (target.closest("[contenteditable='true']")) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const canvasRect = canvas.getBoundingClientRect();

      e.preventDefault();
      const startX = e.clientX - canvasRect.left;
      const startY = e.clientY - canvasRect.top;
      const initialState: DragSelection = {
        startX,
        startY,
        currentX: startX,
        currentY: startY,
      };
      setMarqueeRect(initialState);

      const handleMouseMove = (event: MouseEvent) => {
        setMarqueeRect((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            currentX: event.clientX - canvasRect.left,
            currentY: event.clientY - canvasRect.top,
          };
        });
      };

      const handleMouseUp = (event: MouseEvent) => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);

        const endState: DragSelection = {
          startX,
          startY,
          currentX: event.clientX - canvasRect.left,
          currentY: event.clientY - canvasRect.top,
        };
        const didDrag =
          Math.abs(endState.currentX - endState.startX) >= 3 ||
          Math.abs(endState.currentY - endState.startY) >= 3;
        if (didDrag) suppressNextCanvasClickRef.current = true;
        setMarqueeRect(null);
        applyMarqueeSelection(endState);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [applyMarqueeSelection]
  );

  const handleCanvasContextMenu = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-block-index]")) return;
      setContextBlockIndex(null);
      closeBlockMenu();
      openCanvasMenu(e);
    },
    [closeBlockMenu, openCanvasMenu]
  );

  const handleBlockContextMenu = useCallback(
    (e: React.MouseEvent, blockIndex: number) => {
      selectBlock(blockIndex);
      setEditingBlockIndex(null);
      setEditingTitle(false);
      setEditingSubtitle(false);
      setContextBlockIndex(blockIndex);
      closeCanvasMenu();
      openBlockMenu(e);
    },
    [closeCanvasMenu, openBlockMenu, selectBlock, setEditingBlockIndex]
  );

  // Reset context menu when slide changes (React render-time state adjustment)
  const [prevSlideIdForCtx, setPrevSlideIdForCtx] = useState(activeSlide?.id);
  if (prevSlideIdForCtx !== activeSlide?.id) {
    setPrevSlideIdForCtx(activeSlide?.id);
    setContextBlockIndex(null);
    closeCanvasMenu();
    closeBlockMenu();
  }

  // Validate context block still exists
  if (
    contextBlockIndex !== null &&
    activeSlide &&
    !activeSlide.contentBlocks[contextBlockIndex]
  ) {
    setContextBlockIndex(null);
    closeBlockMenu();
  }

  // Reset ruler state when rulers disabled (React render-time state adjustment)
  const [prevShowRulers, setPrevShowRulers] = useState(showRulers);
  if (showRulers !== prevShowRulers) {
    setPrevShowRulers(showRulers);
    if (!showRulers) {
      setMouseRulerPosition(null);
      setSelectedRulerBounds(null);
    }
  }

  useEffect(() => {
    if (!showRulers) return;

    const handleWindowMouseMove = (event: MouseEvent) => {
      setMouseRulerPosition(toRulerPercent(event.clientX, event.clientY));
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, [showRulers, toRulerPercent]);

  useEffect(() => {
    if (!showRulers) return;

    let rafId = 0;
    const tick = () => {
      measureSelectedRulerBounds();
      rafId = window.requestAnimationFrame(tick);
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial DOM measurement
    measureSelectedRulerBounds();
    rafId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [measureSelectedRulerBounds, showRulers]);

  const canvasContextItems = useMemo<ContextMenuItem[]>(
    () => [
      {
        label: "Paste",
        disabled: clipboardBlocks.length === 0,
        onClick: pasteBlockToCanvas,
      },
      {
        label: "Regenerate with AI...",
        icon: <ArrowCounterClockwise size={13} />,
        onClick: () => setShowRegenerateDialog(true),
      },
      {
        label: "Select All",
        onClick: selectAllBlocks,
      },
      {
        label: "New Slide",
        onClick: () => {
          if (!activeSlide) return;
          void addSlide(activeSlide.id);
        },
      },
      { label: "divider-canvas", divider: true, onClick: () => {} },
      {
        label: "Slide Properties",
        onClick: () => setRightPanel("properties"),
      },
    ],
    [
      activeSlide,
      addSlide,
      clipboardBlocks.length,
      pasteBlockToCanvas,
      selectAllBlocks,
      setRightPanel,
    ]
  );

  async function handleRegenerateSubmit(
    instruction: string,
    tone: RegenerateTone,
  ): Promise<boolean> {
    if (!activeSlide) return false;
    return regenerateSlide(activeSlide.id, instruction, tone);
  }

  const blockContextItems = useMemo<ContextMenuItem[]>(() => {
    if (contextBlockIndex === null || !activeSlide) return [];
    const contextBlock = activeSlide.contentBlocks[contextBlockIndex];
    if (!contextBlock) return [];

    const items: ContextMenuItem[] = [
      {
        label: "Cut",
        onClick: () => {
          selectBlock(contextBlockIndex);
          cutBlock();
          setEditingBlockIndex(null);
        },
      },
      {
        label: "Copy",
        onClick: () => copyBlockByIndex(contextBlockIndex),
      },
      {
        label: "Paste After",
        disabled: clipboardBlocks.length === 0,
        onClick: () => pasteBlockAfterIndex(contextBlockIndex),
      },
      {
        label: "Duplicate",
        onClick: () => duplicateBlockByIndex(contextBlockIndex),
      },
    ];

    if (contextBlock.position) {
      items.push({
        label: "Reset Position",
        onClick: () => updateBlock(contextBlockIndex, { ...contextBlock, position: undefined }),
      });
    }

    items.push(
      { label: "divider-lock", divider: true, onClick: () => {} },
      contextBlock.locked
        ? {
            label: "Unlock",
            icon: <LockOpen size={13} />,
            shortcut: "⌘L",
            onClick: () => unlockBlock(contextBlockIndex),
          }
        : {
            label: "Lock",
            icon: <Lock size={13} />,
            shortcut: "⌘L",
            onClick: () => lockBlock(contextBlockIndex),
          },
      { label: "divider-z-index-top", divider: true, onClick: () => {} },
      {
        label: "Bring to Front",
        onClick: () => bringToFront(contextBlockIndex),
      },
      {
        label: "Bring Forward",
        onClick: () => bringForward(contextBlockIndex),
      },
      {
        label: "Send Backward",
        onClick: () => sendBackward(contextBlockIndex),
      },
      {
        label: "Send to Back",
        onClick: () => sendToBack(contextBlockIndex),
      },
      { label: "divider-z-index-bottom", divider: true, onClick: () => {} },
      {
        label: "Delete",
        danger: true,
        onClick: () => deleteBySelection(contextBlockIndex),
      },
    );

    return items;
  }, [
    activeSlide,
    bringForward,
    bringToFront,
    clipboardBlocks.length,
    contextBlockIndex,
    copyBlockByIndex,
    cutBlock,
    deleteBySelection,
    duplicateBlockByIndex,
    lockBlock,
    pasteBlockAfterIndex,
    sendBackward,
    sendToBack,
    selectBlock,
    setEditingBlockIndex,
    unlockBlock,
    updateBlock,
  ]);

  // Keyboard handler for block-to-block arrow navigation only
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!activeSlide || editingBlockIndex !== null) return;
      if (primarySelectedBlockIndex === null || allBlocksSelected) return;
      if (activeSlide.contentBlocks.length === 0) return;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const next = Math.min(
          primarySelectedBlockIndex + 1,
          activeSlide.contentBlocks.length - 1
        );
        selectBlock(next);
        return;
      }

      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = Math.max(primarySelectedBlockIndex - 1, 0);
        selectBlock(prev);
      }
    },
    [
      activeSlide,
      allBlocksSelected,
      editingBlockIndex,
      primarySelectedBlockIndex,
      selectBlock,
    ]
  );

  const layout = (activeMaster?.layout ?? activeSlide?.layout ?? "title_content") as SlideLayout;
  const flowBlocks = useMemo(
    () => (activeSlide ? activeSlide.contentBlocks.filter((block) => !block.position) : []),
    [activeSlide]
  );
  const slideBackgroundStyle = getSlideBackgroundStyle(
    activeSlide?.cardBackground ?? activeMaster?.background
  );
  const slideOverlayStyle = getSlideBackgroundOverlayStyle(
    activeSlide?.cardBackground ?? activeMaster?.background
  );
  const layoutResult = useMemo(
    () => computeLayout(layout, flowBlocks),
    [flowBlocks, layout]
  );
  const hasFixedSlideNumber = activeMaster?.fixedBlocks.some(
    (block) => block.masterFixedKey === "slide_number"
  ) ?? false;

  const updateBlockAnimationFromTimeline = useCallback(
    (blockIndex: number, patch: Partial<BlockAnimation>) => {
      if (!activeSlide) return;
      const block = activeSlide.contentBlocks[blockIndex];
      if (!block || !hasRevealAnimation(block.animation)) return;

      const nextAnimation = {
        ...block.animation,
        ...patch,
      };

      nextAnimation.delay = Math.max(0, Number(nextAnimation.delay ?? block.animation.delay ?? 0));
      nextAnimation.duration = Math.max(0.05, Number(nextAnimation.duration ?? block.animation.duration ?? 0.4));
      nextAnimation.order = Math.max(1, Math.round(Number(nextAnimation.order ?? block.animation.order ?? 1)));

      const nextBlocks = [...activeSlide.contentBlocks];
      nextBlocks[blockIndex] = {
        ...block,
        animation: nextAnimation,
      };
      updateSlide(activeSlide.id, { contentBlocks: nextBlocks });
    },
    [activeSlide, updateSlide]
  );

  const runAnimationPreview = useCallback(() => {
    if (!activeSlide) return;
    const entries = getAnimatedBlockEntries(activeSlide.contentBlocks);
    const revealOrders = getRevealOrders(activeSlide.contentBlocks);
    if (entries.length === 0 || revealOrders.length === 0) return;

    clearPreviewTimers();
    setPreviewState({
      running: true,
      revealedOrder: 0,
      activeOrder: null,
    });

    let elapsedSeconds = 0;
    for (const order of revealOrders) {
      const orderEntries = entries.filter((entry) => entry.order === order);
      const orderRunTime = Math.max(
        ...orderEntries.map((entry) => getAnimationRunTimeSeconds(entry.animation)),
        0.05,
      );

      const timerId = window.setTimeout(() => {
        setPreviewState({
          running: true,
          revealedOrder: order,
          activeOrder: order,
        });
      }, Math.round(elapsedSeconds * 1000));
      previewTimersRef.current.push(timerId);

      elapsedSeconds += orderRunTime;
    }

    const finalizeTimer = window.setTimeout(() => {
      setPreviewState(IDLE_PREVIEW_STATE);
      clearPreviewTimers();
    }, Math.round((elapsedSeconds + 0.05) * 1000));
    previewTimersRef.current.push(finalizeTimer);
  }, [activeSlide, clearPreviewTimers]);

  useEffect(() => {
    return () => {
      clearPreviewTimers();
    };
  }, [clearPreviewTimers]);

  // Reset animation preview when slide changes
  useEffect(() => {
    clearPreviewTimers();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset preview on slide change
    setPreviewState(IDLE_PREVIEW_STATE);
  }, [activeSlide?.id, clearPreviewTimers]);

  const resolveBlockAnimationContentProps = useCallback(
    (block: ContentBlock): { className?: string; style: React.CSSProperties } => {
      if (!hasRevealAnimation(block.animation)) {
        return { style: {} };
      }

      let playbackState: BlockAnimationPlaybackState = "visible";
      if (previewState.running) {
        const order = normalizeAnimationOrder(block.animation);
        if (order > previewState.revealedOrder) {
          playbackState = "hidden";
        } else if (previewState.activeOrder !== null && order === previewState.activeOrder) {
          playbackState = "animate";
        }
      }

      return getBlockAnimationPlaybackProps(block.animation, {
        state: playbackState,
        typewriterSteps: estimateBlockTypewriterSteps(block),
      });
    },
    [previewState]
  );

  if (!activeSlide) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-ink-muted">Select a slide to start editing</p>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label="Slide canvas"
      className="flex-1 flex items-center justify-center p-8 overflow-auto"
      onClick={handleCanvasClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="w-full max-w-5xl">
        <CanvasRulers
          enabled={showRulers}
          mousePosition={mouseRulerPosition}
          selectedBounds={selectedRulerBounds}
          unit={rulerUnit}
          onUnitChange={setRulerUnit}
        >
          {/* The slide frame — 16:9 aspect ratio */}
          <div
            ref={rulerSurfaceRef}
            className="aspect-video relative"
            style={slideBackgroundStyle}
            onMouseMove={handleRulerSurfaceMouseMove}
            onMouseLeave={handleRulerSurfaceMouseLeave}
            data-testid="slide-ruler-surface"
          >
            <ThemeProvider
              theme={theme}
              className="relative h-full w-full overflow-hidden rounded-lg shadow-2xl"
              style={{ fontSize: "16px", ...slideBackgroundStyle }}
            >
          <style>{BLOCK_ANIMATION_STYLESHEET}</style>
          {slideOverlayStyle && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={slideOverlayStyle}
              data-testid="slide-background-overlay"
            />
          )}

          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ backgroundColor: theme.primaryColor }}
          />

          <div
            ref={canvasRef}
            className="absolute inset-0 p-[6%] pt-[8%] flex flex-col"
            onMouseDown={handleCanvasMouseDown}
            onContextMenu={handleCanvasContextMenu}
          >
            <GridOverlay visible={showGrid} gridSize={gridSize} />

            {/* Remote cursors overlay — shows other users' cursors */}
            <RemoteCursorsSlot canvasRef={canvasRef} />

            {/* Title area — editable in-place */}
            {!activeMaster && !layoutResult.hasBuiltInTitle && (
              <div className="mb-[0.5em] shrink-0">
                <EditableTextBlock
                  content={activeSlide.title}
                  isEditing={editingTitle}
                  onStartEdit={() => {
                    setEditingTitle(true);
                    setEditingSubtitle(false);
                    setEditingBlockIndex(null);
                    deselectAll();
                  }}
                  onUpdate={(html) => {
                    const text = html.replace(/<[^>]*>/g, "").trim();
                    updateSlide(activeSlide.id, { title: text });
                  }}
                  onBlur={() => setEditingTitle(false)}
                  placeholder="Click to add title..."
                  theme={theme}
                  style="title"
                  {...activeSlide.titleEffects}
                />
                <EditableTextBlock
                  content={activeSlide.subtitle}
                  isEditing={editingSubtitle}
                  onStartEdit={() => {
                    setEditingSubtitle(true);
                    setEditingTitle(false);
                    setEditingBlockIndex(null);
                    deselectAll();
                  }}
                  onUpdate={(html) => {
                    const text = html.replace(/<[^>]*>/g, "").trim();
                    updateSlide(activeSlide.id, { subtitle: text });
                  }}
                  onBlur={() => setEditingSubtitle(false)}
                  placeholder="Click to add subtitle..."
                  theme={theme}
                  style="subtitle"
                  {...activeSlide.subtitleEffects}
                />
              </div>
            )}

            {/* Built-in title layouts */}
            {!activeMaster && layout === "title_slide" && (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-[0.5em]">
                <EditableTextBlock
                  content={activeSlide.title}
                  isEditing={editingTitle}
                  onStartEdit={() => {
                    setEditingTitle(true);
                    setEditingSubtitle(false);
                    setEditingBlockIndex(null);
                    deselectAll();
                  }}
                  onUpdate={(html) => {
                    const text = html.replace(/<[^>]*>/g, "").trim();
                    updateSlide(activeSlide.id, { title: text });
                  }}
                  onBlur={() => setEditingTitle(false)}
                  placeholder="Presentation Title"
                  theme={theme}
                  style="title"
                  className="text-center"
                  {...activeSlide.titleEffects}
                />
                <EditableTextBlock
                  content={activeSlide.subtitle}
                  isEditing={editingSubtitle}
                  onStartEdit={() => {
                    setEditingSubtitle(true);
                    setEditingTitle(false);
                    setEditingBlockIndex(null);
                    deselectAll();
                  }}
                  onUpdate={(html) => {
                    const text = html.replace(/<[^>]*>/g, "").trim();
                    updateSlide(activeSlide.id, { subtitle: text });
                  }}
                  onBlur={() => setEditingSubtitle(false)}
                  placeholder="Subtitle"
                  theme={theme}
                  style="subtitle"
                  className="text-center"
                  {...activeSlide.subtitleEffects}
                />
              </div>
            )}

            {!activeMaster && layout === "section_header" && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div
                  className="w-[3em] h-[0.15em] mb-[0.8em] rounded-full"
                  style={{ backgroundColor: theme.accentColor }}
                />
                <EditableTextBlock
                  content={activeSlide.title}
                  isEditing={editingTitle}
                  onStartEdit={() => {
                    setEditingTitle(true);
                    setEditingBlockIndex(null);
                    deselectAll();
                  }}
                  onUpdate={(html) => {
                    const text = html.replace(/<[^>]*>/g, "").trim();
                    updateSlide(activeSlide.id, { title: text });
                  }}
                  onBlur={() => setEditingTitle(false)}
                  placeholder="Section Title"
                  theme={theme}
                  style="title"
                  className="text-center"
                  {...activeSlide.titleEffects}
                />
              </div>
            )}

            {/* Content regions with editable blocks */}
            {layoutResult.regions.length > 0 && (
              <div className="flex-1 relative min-h-0 group">
                {layoutResult.regions.map((region) => (
                  <div key={region.id} style={regionToCSS(region)}>
                    {region.blocks.map((block, localIdx) => {
                      // Find the global index of this block
                      const globalIdx = activeSlide.contentBlocks.indexOf(block);
                      const blockIndex = globalIdx >= 0 ? globalIdx : localIdx;
                      const animationContentProps = resolveBlockAnimationContentProps(block);

                      return (
                        <div key={`${block.type}-${blockIndex}`} className="group/block-gap">
                          <EditableBlockDispatcher
                            block={block}
                            blockIndex={blockIndex}
                            isSelected={isBlockSelected(blockIndex)}
                            isEditing={editingBlockIndex === blockIndex}
                            onSelect={(options) => {
                              selectBlock(blockIndex, options?.addToSelection);
                              setEditingBlockIndex(null);
                              setEditingTitle(false);
                              setEditingSubtitle(false);
                            }}
                            onStartEdit={() => {
                              selectBlock(blockIndex);
                              setEditingBlockIndex(blockIndex);
                              setEditingTitle(false);
                              setEditingSubtitle(false);
                            }}
                            onStopEdit={() => setEditingBlockIndex(null)}
                            onUpdate={(updated) => updateBlock(blockIndex, updated)}
                            onDelete={() => deleteBySelection(blockIndex)}
                            onInsertAfter={(newBlock) => insertBlockAfter(blockIndex, newBlock)}
                            onMove={moveBlock}
                            onContextMenu={handleBlockContextMenu}
                            theme={theme}
                            canvasRef={canvasRef}
                            snapToGrid={snapToGrid}
                            gridSize={gridSize}
                            wrapperStyle={{ zIndex: getBlockRenderZIndex(block, blockIndex) }}
                            contentClassName={animationContentProps.className}
                            contentStyle={animationContentProps.style}
                          />
                          <BlockInserter
                            onInsert={(newBlock) => insertBlockAfter(blockIndex, newBlock)}
                            className="my-1"
                          />
                        </div>
                      );
                    })}

                    {/* Block inserter at the end of each region */}
                    {region.blocks.length === 0 && (
                      <BlockInserter
                        onInsert={(block) => appendBlock(block)}
                        className="mt-1"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeMaster?.placeholders
              .filter(
                (placeholder) =>
                  !activeSlide.contentBlocks.some(
                    (block) => block.placeholderId === placeholder.id
                  )
              )
              .map((placeholder) => (
                <button
                  key={`master-placeholder-${placeholder.id}`}
                  type="button"
                  className="absolute rounded-md border border-dashed border-brand/50 bg-brand/5 px-2 py-1 text-center text-[0.58em] text-ink-muted hover:bg-brand/10"
                  style={{
                    left: `${placeholder.position.x}%`,
                    top: `${placeholder.position.y}%`,
                    width: `${placeholder.position.width}%`,
                    height: `${placeholder.position.height}%`,
                    zIndex: 1700,
                  }}
                  data-testid={`master-placeholder-${placeholder.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    insertFromMasterPlaceholder(placeholder.id);
                  }}
                >
                  {masterPlaceholderPrompt(placeholder.defaultType)}
                </button>
              ))}

            {activeMaster?.fixedBlocks.map((block, fixedIndex) => {
              const blockEntry = BLOCK_REGISTRY[block.type];
              if (!blockEntry || !block.position) return null;
              const Renderer = blockEntry.render;

              return (
                <div
                  key={`master-fixed-${fixedIndex}`}
                  className="absolute pointer-events-none select-none"
                  style={{
                    left: `${block.position.x}%`,
                    top: `${block.position.y}%`,
                    width: `${block.position.width}%`,
                    height: `${block.position.height}%`,
                    zIndex: 2000 + fixedIndex,
                  }}
                  data-testid={`master-fixed-block-${fixedIndex}`}
                >
                  <Renderer
                    data={block.data as Record<string, unknown>}
                    theme={theme}
                    institutionKit={institutionKit}
                  />
                </div>
              );
            })}

            {/* Freeform-positioned blocks render absolutely over the canvas */}
            {activeSlide.contentBlocks.map((block, blockIndex) => {
              if (!block.position) return null;
              const animationContentProps = resolveBlockAnimationContentProps(block);

              return (
                <EditableBlockDispatcher
                  key={`positioned-${block.type}-${blockIndex}`}
                  block={block}
                  blockIndex={blockIndex}
                  isSelected={isBlockSelected(blockIndex)}
                  isEditing={editingBlockIndex === blockIndex}
                  onSelect={(options) => {
                    selectBlock(blockIndex, options?.addToSelection);
                    setEditingBlockIndex(null);
                    setEditingTitle(false);
                    setEditingSubtitle(false);
                  }}
                  onStartEdit={() => {
                    selectBlock(blockIndex);
                    setEditingBlockIndex(blockIndex);
                    setEditingTitle(false);
                    setEditingSubtitle(false);
                  }}
                  onStopEdit={() => setEditingBlockIndex(null)}
                  onUpdate={(updated) => updateBlock(blockIndex, updated)}
                  onDelete={() => deleteBySelection(blockIndex)}
                  onInsertAfter={(newBlock) => insertBlockAfter(blockIndex, newBlock)}
                  onMove={moveBlock}
                  onContextMenu={handleBlockContextMenu}
                  theme={theme}
                  canvasRef={canvasRef}
                  snapToGrid={snapToGrid}
                  gridSize={gridSize}
                  wrapperClassName="absolute"
                  wrapperStyle={{
                    left: `${block.position.x}%`,
                    top: `${block.position.y}%`,
                    width: `${block.position.width}%`,
                    height: `${block.position.height}%`,
                    zIndex: getBlockRenderZIndex(block, blockIndex),
                  }}
                  contentClassName={animationContentProps.className}
                  contentStyle={animationContentProps.style}
                />
              );
            })}

            {marqueeRect && (
              <div
                className="pointer-events-none absolute border border-dashed border-blue-500 bg-blue-400/10"
                style={{
                  left: `${Math.min(marqueeRect.startX, marqueeRect.currentX)}px`,
                  top: `${Math.min(marqueeRect.startY, marqueeRect.currentY)}px`,
                  width: `${Math.abs(marqueeRect.currentX - marqueeRect.startX)}px`,
                  height: `${Math.abs(marqueeRect.currentY - marqueeRect.startY)}px`,
                }}
              />
            )}
          </div>

          {/* Slide number */}
          {(activeMaster?.showSlideNumber ?? true) && !hasFixedSlideNumber && (
            <div
              className="absolute bottom-[3%] right-[4%] text-[0.6em] opacity-30"
              style={{ color: theme.textColor }}
            >
              {activeSlide.sortOrder + 1}
            </div>
          )}
            </ThemeProvider>
          </div>
        </CanvasRulers>

        <AnimationTimeline
          blocks={activeSlide.contentBlocks}
          selectedBlockIndex={primarySelectedBlockIndex}
          previewRunning={previewState.running}
          onSelectBlock={(blockIndex) => {
            selectBlock(blockIndex);
            setEditingBlockIndex(null);
            setEditingTitle(false);
            setEditingSubtitle(false);
            setRightPanel("properties");
          }}
          onUpdateAnimation={updateBlockAnimationFromTimeline}
          onPreview={runAnimationPreview}
        />
      </div>
      <CanvasContextMenuPortal items={canvasContextItems} />
      <BlockContextMenuPortal items={blockContextItems} />
      <SlideRegenerateDialog
        open={showRegenerateDialog}
        title="Regenerate This Slide"
        slideTitles={[activeSlide.title || "Untitled slide"]}
        submitLabel="Regenerate"
        onClose={() => setShowRegenerateDialog(false)}
        onSubmit={handleRegenerateSubmit}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// EditableBlockDispatcher — routes block types to their editable renderers
// ---------------------------------------------------------------------------

interface EditableBlockDispatcherProps {
  block: ContentBlock;
  blockIndex: number;
  isSelected: boolean;
  isEditing: boolean;
  onSelect: (options?: { addToSelection?: boolean }) => void;
  onStartEdit: () => void;
  onStopEdit: () => void;
  onUpdate: (block: ContentBlock) => void;
  onDelete: () => void;
  onInsertAfter: (block: ContentBlock) => void;
  onMove: (blockIndex: number, position: BlockPosition) => void;
  onContextMenu: (e: React.MouseEvent, blockIndex: number) => void;
  theme: ThemeConfig;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  snapToGrid: boolean;
  gridSize: number;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
}

function EditableBlockDispatcher({
  block,
  blockIndex,
  isSelected,
  isEditing,
  onSelect,
  onStartEdit,
  onStopEdit,
  onUpdate,
  onDelete,
  onMove,
  onContextMenu,
  theme,
  canvasRef,
  snapToGrid,
  gridSize,
  wrapperClassName,
  wrapperStyle,
  contentClassName,
  contentStyle,
}: EditableBlockDispatcherProps) {
  const institutionKit = useSlidesStore((s) => s.institutionKit);
  const [isCropMode, setIsCropMode] = useState(false);
  const [draftCrop, setDraftCrop] = useState<ImageCrop | null>(null);

  // Reset crop mode when deselected or block changes (React render-time state adjustment)
  const [prevCropState, setPrevCropState] = useState({ blockIndex, isSelected });
  if (
    prevCropState.blockIndex !== blockIndex ||
    (!isSelected && prevCropState.isSelected)
  ) {
    setPrevCropState({ blockIndex, isSelected });
    if (isCropMode) {
      setIsCropMode(false);
      setDraftCrop(null);
    }
  } else if (prevCropState.isSelected !== isSelected) {
    setPrevCropState({ blockIndex, isSelected });
  }

  const handleResize = useCallback(
    (position: BlockPosition) => {
      onUpdate({ ...block, position });
    },
    [block, onUpdate]
  );

  const handleMove = useCallback(
    (position: BlockPosition) => {
      onMove(blockIndex, position);
    },
    [blockIndex, onMove]
  );

  const handleRotate = useCallback(
    (rotation: number) => {
      onUpdate({ ...block, rotation });
    },
    [block, onUpdate]
  );

  const normalizeCrop = useCallback((crop?: ImageCrop): ImageCrop => {
    const minSize = 5;
    const x = Math.max(0, Math.min(100 - minSize, crop?.x ?? 0));
    const y = Math.max(0, Math.min(100 - minSize, crop?.y ?? 0));
    const width = Math.max(minSize, Math.min(100 - x, crop?.width ?? 100));
    const height = Math.max(minSize, Math.min(100 - y, crop?.height ?? 100));
    return {
      x: Number(x.toFixed(4)),
      y: Number(y.toFixed(4)),
      width: Number(width.toFixed(4)),
      height: Number(height.toFixed(4)),
    };
  }, []);

  // Text and bullets get TipTap-powered editing
  if (block.type === "text") {
    return (
      <BlockSelectionWrapper
        block={block}
        blockIndex={blockIndex}
        isSelected={isSelected}
        isEditing={isEditing}
        onSelect={onSelect}
        onStartEdit={onStartEdit}
        onDelete={onDelete}
        onContextMenu={(e) => onContextMenu(e, blockIndex)}
        onResize={handleResize}
        onMove={handleMove}
        onRotate={handleRotate}
        initialPosition={block.position}
        canvasRef={canvasRef}
        snapToGrid={snapToGrid}
        gridSize={gridSize}
        className={wrapperClassName}
        style={wrapperStyle}
        contentClassName={contentClassName}
        contentStyle={contentStyle}
      >
        <EditableTextBlock
          content={block.data.text}
          isEditing={isEditing}
          onStartEdit={onStartEdit}
          onUpdate={(html) => {
            onUpdate({ ...block, data: { ...block.data, text: html } });
          }}
          onBlur={onStopEdit}
          theme={theme}
          style={block.data.style ?? "body"}
          fontFamily={block.data.fontFamily}
          fontSize={block.data.fontSize}
          color={block.data.color}
          lineHeight={block.data.lineHeight}
          paragraphSpacing={block.data.paragraphSpacing}
          onLineHeightChange={(nextLineHeight) => {
            onUpdate({ ...block, data: { ...block.data, lineHeight: nextLineHeight } });
          }}
          textShadow={block.data.textShadow}
          textOutline={block.data.textOutline}
          textTransform={block.data.textTransform}
          letterSpacing={block.data.letterSpacing}
        />
      </BlockSelectionWrapper>
    );
  }

  if (block.type === "bullets") {
    return (
      <BlockSelectionWrapper
        block={block}
        blockIndex={blockIndex}
        isSelected={isSelected}
        isEditing={isEditing}
        onSelect={onSelect}
        onStartEdit={onStartEdit}
        onDelete={onDelete}
        onContextMenu={(e) => onContextMenu(e, blockIndex)}
        onResize={handleResize}
        onMove={handleMove}
        onRotate={handleRotate}
        initialPosition={block.position}
        canvasRef={canvasRef}
        snapToGrid={snapToGrid}
        gridSize={gridSize}
        className={wrapperClassName}
        style={wrapperStyle}
        contentClassName={contentClassName}
        contentStyle={contentStyle}
      >
        <EditableBulletsBlock
          items={block.data.items}
          ordered={block.data.ordered}
          isEditing={isEditing}
          onStartEdit={onStartEdit}
          onUpdate={(items, ordered) => {
            onUpdate({ ...block, data: { items, ordered } });
          }}
          onBlur={onStopEdit}
          theme={theme}
        />
      </BlockSelectionWrapper>
    );
  }

  if (block.type === "quote") {
    return (
      <BlockSelectionWrapper
        block={block}
        blockIndex={blockIndex}
        isSelected={isSelected}
        isEditing={isEditing}
        onSelect={onSelect}
        onStartEdit={onStartEdit}
        onDelete={onDelete}
        onContextMenu={(e) => onContextMenu(e, blockIndex)}
        onResize={handleResize}
        onMove={handleMove}
        onRotate={handleRotate}
        initialPosition={block.position}
        canvasRef={canvasRef}
        snapToGrid={snapToGrid}
        gridSize={gridSize}
        className={wrapperClassName}
        style={wrapperStyle}
        contentClassName={contentClassName}
        contentStyle={contentStyle}
      >
        <EditableTextBlock
          content={block.data.text}
          isEditing={isEditing}
          onStartEdit={onStartEdit}
          onUpdate={(html) => {
            const text = html.replace(/<[^>]*>/g, "").trim();
            onUpdate({ ...block, data: { ...block.data, text } });
          }}
          onBlur={onStopEdit}
          theme={theme}
          style="body"
          placeholder="Enter quote..."
        />
      </BlockSelectionWrapper>
    );
  }

  if (block.type === "table") {
    return (
      <BlockSelectionWrapper
        block={block}
        blockIndex={blockIndex}
        isSelected={isSelected}
        isEditing={isEditing}
        onSelect={onSelect}
        onStartEdit={onStartEdit}
        onDelete={onDelete}
        onContextMenu={(e) => onContextMenu(e, blockIndex)}
        onResize={handleResize}
        onMove={handleMove}
        onRotate={handleRotate}
        initialPosition={block.position}
        canvasRef={canvasRef}
        snapToGrid={snapToGrid}
        gridSize={gridSize}
        className={wrapperClassName}
        style={wrapperStyle}
        contentClassName={contentClassName}
        contentStyle={contentStyle}
      >
        <EditableTableBlock
          blockIndex={blockIndex}
          data={block.data}
          isEditing={isEditing}
          onUpdate={(nextData) => {
            onUpdate({ ...block, data: nextData });
          }}
          onBlur={onStopEdit}
          theme={theme}
        />
      </BlockSelectionWrapper>
    );
  }

  if (block.type === "image") {
    const data = block.data;

    const startCropMode = () => {
      onSelect();
      if (!data.url) return;
      setDraftCrop(normalizeCrop(data.crop));
      setIsCropMode(true);
    };

    const confirmCrop = () => {
      if (!draftCrop) return;
      onUpdate({
        ...block,
        data: {
          ...data,
          crop: normalizeCrop(draftCrop),
        },
      });
      setIsCropMode(false);
      setDraftCrop(null);
    };

    const cancelCrop = () => {
      setIsCropMode(false);
      setDraftCrop(null);
    };

    return (
      <BlockSelectionWrapper
        block={block}
        blockIndex={blockIndex}
        isSelected={isSelected}
        isEditing={isCropMode}
        maintainAspectRatio={data.lockAspectRatio ?? false}
        onSelect={onSelect}
        onStartEdit={startCropMode}
        onDelete={onDelete}
        onContextMenu={(e) => onContextMenu(e, blockIndex)}
        onResize={handleResize}
        onMove={handleMove}
        onRotate={handleRotate}
        initialPosition={block.position}
        canvasRef={canvasRef}
        snapToGrid={snapToGrid}
        gridSize={gridSize}
        className={wrapperClassName}
        style={wrapperStyle}
        contentClassName={contentClassName}
        contentStyle={contentStyle}
      >
        <div className="relative h-full w-full">
          <ImageBlock
            data={data}
            theme={theme}
            showFullImage={isCropMode}
            onDataChange={(partial) => {
              onUpdate({ ...block, data: { ...data, ...partial } });
            }}
          />
          {isCropMode && data.url && draftCrop && (
            <ImageCropOverlay
              crop={draftCrop}
              onChange={setDraftCrop}
              onConfirm={confirmCrop}
              onCancel={cancelCrop}
            />
          )}
        </div>
      </BlockSelectionWrapper>
    );
  }

  // All other block types: render with BlockSelectionWrapper + read-only renderer
  // Click to select — properties panel shows block-specific editor
  const entry = BLOCK_REGISTRY[block.type];
  if (!entry) return null;
  const Renderer = entry.render;

  return (
    <BlockSelectionWrapper
      block={block}
      blockIndex={blockIndex}
      isSelected={isSelected}
      isEditing={false}
      onSelect={onSelect}
      onStartEdit={onSelect} // For non-text blocks, "edit" = select (properties panel)
      onDelete={onDelete}
      onContextMenu={(e) => onContextMenu(e, blockIndex)}
      onResize={handleResize}
      onMove={handleMove}
      onRotate={handleRotate}
      initialPosition={block.position}
      canvasRef={canvasRef}
      snapToGrid={snapToGrid}
      gridSize={gridSize}
      className={wrapperClassName}
      style={wrapperStyle}
      contentClassName={contentClassName}
      contentStyle={contentStyle}
    >
      <Renderer
        data={block.data as Record<string, unknown>}
        theme={theme}
        scale={1}
        institutionKit={institutionKit}
      />
    </BlockSelectionWrapper>
  );
}

type CropDragMode =
  | "move"
  | "top-left"
  | "top"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom"
  | "bottom-left"
  | "left";

interface ImageCropOverlayProps {
  crop: ImageCrop;
  onChange: (crop: ImageCrop) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

interface CropDragState {
  mode: CropDragMode;
  startClientX: number;
  startClientY: number;
  startCrop: ImageCrop;
}

const CROP_MIN_SIZE_PERCENT = 5;

function clampCrop(crop: ImageCrop): ImageCrop {
  const x = Math.max(0, Math.min(100 - CROP_MIN_SIZE_PERCENT, crop.x));
  const y = Math.max(0, Math.min(100 - CROP_MIN_SIZE_PERCENT, crop.y));
  const width = Math.max(CROP_MIN_SIZE_PERCENT, Math.min(100 - x, crop.width));
  const height = Math.max(CROP_MIN_SIZE_PERCENT, Math.min(100 - y, crop.height));
  return {
    x: Number(x.toFixed(4)),
    y: Number(y.toFixed(4)),
    width: Number(width.toFixed(4)),
    height: Number(height.toFixed(4)),
  };
}

function ImageCropOverlay({ crop, onChange, onConfirm, onCancel }: ImageCropOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<CropDragState | null>(null);

  const startDrag = (mode: CropDragMode, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current = {
      mode,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startCrop: crop,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const drag = dragRef.current;
      const overlayRect = overlayRef.current?.getBoundingClientRect();
      if (!drag || !overlayRect || overlayRect.width <= 0 || overlayRect.height <= 0) return;

      const deltaXPct = ((e.clientX - drag.startClientX) / overlayRect.width) * 100;
      const deltaYPct = ((e.clientY - drag.startClientY) / overlayRect.height) * 100;
      const start = drag.startCrop;

      if (drag.mode === "move") {
        onChange(
          clampCrop({
            x: Math.max(0, Math.min(100 - start.width, start.x + deltaXPct)),
            y: Math.max(0, Math.min(100 - start.height, start.y + deltaYPct)),
            width: start.width,
            height: start.height,
          })
        );
        return;
      }

      let left = start.x;
      let top = start.y;
      let right = start.x + start.width;
      let bottom = start.y + start.height;

      if (drag.mode.includes("left")) {
        left = Math.max(0, Math.min(right - CROP_MIN_SIZE_PERCENT, start.x + deltaXPct));
      }
      if (drag.mode.includes("right")) {
        right = Math.min(100, Math.max(left + CROP_MIN_SIZE_PERCENT, start.x + start.width + deltaXPct));
      }
      if (drag.mode.includes("top")) {
        top = Math.max(0, Math.min(bottom - CROP_MIN_SIZE_PERCENT, start.y + deltaYPct));
      }
      if (drag.mode.includes("bottom")) {
        bottom = Math.min(100, Math.max(top + CROP_MIN_SIZE_PERCENT, start.y + start.height + deltaYPct));
      }

      onChange(
        clampCrop({
          x: left,
          y: top,
          width: right - left,
          height: bottom - top,
        })
      );
    };

    const handleMouseUp = () => {
      dragRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [onChange]);

  const handles: { mode: CropDragMode; cursor: string; style: React.CSSProperties }[] = [
    { mode: "top-left", cursor: "nwse-resize", style: { top: -4, left: -4 } },
    { mode: "top", cursor: "ns-resize", style: { top: -4, left: "50%", transform: "translateX(-50%)" } },
    { mode: "top-right", cursor: "nesw-resize", style: { top: -4, right: -4 } },
    { mode: "right", cursor: "ew-resize", style: { top: "50%", right: -4, transform: "translateY(-50%)" } },
    { mode: "bottom-right", cursor: "nwse-resize", style: { bottom: -4, right: -4 } },
    { mode: "bottom", cursor: "ns-resize", style: { bottom: -4, left: "50%", transform: "translateX(-50%)" } },
    { mode: "bottom-left", cursor: "nesw-resize", style: { bottom: -4, left: -4 } },
    { mode: "left", cursor: "ew-resize", style: { top: "50%", left: -4, transform: "translateY(-50%)" } },
  ];

  return (
    <div ref={overlayRef} className="absolute inset-0 z-20 select-none" onMouseDown={(e) => e.stopPropagation()}>
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      <div
        className="absolute border-2 border-blue-500 bg-transparent"
        style={{
          left: `${crop.x}%`,
          top: `${crop.y}%`,
          width: `${crop.width}%`,
          height: `${crop.height}%`,
          cursor: "move",
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.25)",
        }}
        onMouseDown={(e) => startDrag("move", e)}
      >
        {handles.map((handle) => (
          <div
            key={handle.mode}
            className="absolute h-2 w-2 rounded-sm border border-white bg-blue-500"
            style={{ ...handle.style, cursor: handle.cursor }}
            onMouseDown={(e) => startDrag(handle.mode, e)}
          />
        ))}
      </div>
      <div className="absolute right-2 top-2 flex items-center gap-2">
        <button
          type="button"
          className="rounded border border-border bg-surface px-2 py-1 text-xs text-ink"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onCancel();
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          className="rounded bg-blue-600 px-2 py-1 text-xs text-white"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onConfirm();
          }}
        >
          Apply Crop
        </button>
      </div>
    </div>
  );
}
