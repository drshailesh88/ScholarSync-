"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { BlockPosition, ContentBlock } from "@/types/presentation";
import { cn } from "@/lib/utils";
import {
  computeAlignmentGuides,
  computeEqualSpacingGuides,
  type AlignmentGuide,
  type SpacingGuide,
} from "../shared/alignment-engine";
import { AlignmentGuidesOverlay } from "../shared/alignment-guides-overlay";
import { snapPercentToGrid } from "../shared/grid-utils";

// ---------------------------------------------------------------------------
// BlockSelectionWrapper — wraps every block on the WYSIWYG canvas with
// click-to-select, resize handles, and a drag handle.
// ---------------------------------------------------------------------------

interface BlockSelectionWrapperProps {
  block: ContentBlock;
  blockIndex: number;
  isSelected: boolean;
  isEditing: boolean;
  maintainAspectRatio?: boolean;
  onSelect: (options?: { addToSelection?: boolean }) => void;
  onStartEdit: () => void;
  onDelete: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  onResize?: (position: BlockPosition) => void;
  onMove?: (position: BlockPosition) => void;
  onRotate?: (rotation: number) => void;
  snapToGrid?: boolean;
  gridSize?: number;
  initialPosition?: BlockPosition;
  canvasRef?: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
}

const RESIZE_HANDLES = [
  { position: "top-left", cursor: "nwse-resize", x: -1, y: -1 },
  { position: "top-right", cursor: "nesw-resize", x: 1, y: -1 },
  { position: "bottom-left", cursor: "nesw-resize", x: -1, y: 1 },
  { position: "bottom-right", cursor: "nwse-resize", x: 1, y: 1 },
  { position: "top", cursor: "ns-resize", x: 0, y: -1 },
  { position: "bottom", cursor: "ns-resize", x: 0, y: 1 },
  { position: "left", cursor: "ew-resize", x: -1, y: 0 },
  { position: "right", cursor: "ew-resize", x: 1, y: 0 },
] as const;

const MIN_BLOCK_SIZE_PERCENT = 5;
const SNAP_THRESHOLD_PERCENT = 1.5;

type ResizeHandle = typeof RESIZE_HANDLES[number];

interface ResizeDragState {
  effectiveHandleX: -1 | 0 | 1;
  effectiveHandleY: -1 | 0 | 1;
  rotationRadians: number;
  maintainAspectRatio: boolean;
  aspectRatio: number;
  startClientX: number;
  startClientY: number;
  canvasWidth: number;
  canvasHeight: number;
  startPosition: BlockPosition;
  currentPosition: BlockPosition;
}

interface MoveDragState {
  startClientX: number;
  startClientY: number;
  canvasWidth: number;
  canvasHeight: number;
  startPosition: BlockPosition;
  currentPosition: BlockPosition;
  hasMoved: boolean;
  ghostElement: HTMLDivElement;
}

interface RotateDragState {
  centerX: number;
  centerY: number;
}

function getHandleStyle(pos: string): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 8,
    height: 8,
    backgroundColor: "#3B82F6",
    border: "1px solid white",
    borderRadius: 2,
    zIndex: 10,
  };

  switch (pos) {
    case "top-left": return { ...base, top: -4, left: -4 };
    case "top-right": return { ...base, top: -4, right: -4 };
    case "bottom-left": return { ...base, bottom: -4, left: -4 };
    case "bottom-right": return { ...base, bottom: -4, right: -4 };
    case "top": return { ...base, top: -4, left: "50%", transform: "translateX(-50%)" };
    case "bottom": return { ...base, bottom: -4, left: "50%", transform: "translateX(-50%)" };
    case "left": return { ...base, left: -4, top: "50%", transform: "translateY(-50%)" };
    case "right": return { ...base, right: -4, top: "50%", transform: "translateY(-50%)" };
    default: return base;
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function roundPercent(value: number): number {
  return Number(value.toFixed(4));
}

function normalizeDegrees(value: number): number {
  const normalized = value % 360;
  return normalized < 0 ? normalized + 360 : normalized;
}

function getRotationFromPoint(centerX: number, centerY: number, clientX: number, clientY: number): number {
  const radians = Math.atan2(clientY - centerY, clientX - centerX);
  return normalizeDegrees((radians * 180) / Math.PI + 90);
}

function getRotatedDelta(deltaX: number, deltaY: number, rotationRadians: number): { x: number; y: number } {
  const cos = Math.cos(rotationRadians);
  const sin = Math.sin(rotationRadians);
  return {
    x: (deltaX * cos) + (deltaY * sin),
    y: (-deltaX * sin) + (deltaY * cos),
  };
}

function resolveResizeCursor(
  handleX: -1 | 0 | 1,
  handleY: -1 | 0 | 1,
  rotationDegrees: number,
  scaleX: number,
  scaleY: number
): React.CSSProperties["cursor"] {
  const signedX = handleX === 0 ? 0 : (scaleX < 0 ? -handleX : handleX);
  const signedY = handleY === 0 ? 0 : (scaleY < 0 ? -handleY : handleY);
  const radians = (rotationDegrees * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const vectorX = (signedX * cos) - (signedY * sin);
  const vectorY = (signedX * sin) + (signedY * cos);
  const angle = normalizeDegrees((Math.atan2(vectorY, vectorX) * 180) / Math.PI) % 180;

  if (angle < 22.5 || angle >= 157.5) return "ew-resize";
  if (angle < 67.5) return "nwse-resize";
  if (angle < 112.5) return "ns-resize";
  return "nesw-resize";
}

function hasAxisGuide(guides: AlignmentGuide[], axis: AlignmentGuide["axis"]): boolean {
  return guides.some((guide) => guide.axis === axis);
}

function dedupeAlignmentGuides(guides: AlignmentGuide[]): AlignmentGuide[] {
  const map = new Map<string, AlignmentGuide>();
  for (const guide of guides) {
    const key = `${guide.axis}:${roundPercent(guide.position)}:${guide.type}`;
    if (!map.has(key)) {
      map.set(key, {
        ...guide,
        position: roundPercent(guide.position),
      });
    }
  }
  return [...map.values()];
}

function createGhostElement(wrapper: HTMLDivElement, position: BlockPosition): HTMLDivElement {
  const ghost = wrapper.cloneNode(true) as HTMLDivElement;
  ghost.setAttribute("data-drag-ghost", "true");
  ghost.removeAttribute("data-resizing");
  ghost.removeAttribute("data-moving");
  ghost.removeAttribute("tabindex");
  ghost.querySelectorAll("[data-resize-handle],[data-rotation-handle],[data-rotation-connector]").forEach((node) => node.remove());
  ghost.style.position = "absolute";
  ghost.style.left = `${position.x}%`;
  ghost.style.top = `${position.y}%`;
  ghost.style.width = `${position.width}%`;
  ghost.style.height = `${position.height}%`;
  ghost.style.margin = "0";
  ghost.style.opacity = "0.55";
  ghost.style.pointerEvents = "none";
  ghost.style.zIndex = "999";
  return ghost;
}

export function BlockSelectionWrapper({
  block,
  blockIndex,
  isSelected,
  isEditing,
  maintainAspectRatio = false,
  onSelect,
  onStartEdit,
  onDelete,
  onContextMenu,
  onResize,
  onMove,
  onRotate,
  snapToGrid = false,
  gridSize = 5,
  initialPosition,
  canvasRef,
  children,
  className,
  style,
  contentClassName,
  contentStyle,
}: BlockSelectionWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const resizeDragStateRef = useRef<ResizeDragState | null>(null);
  const moveDragStateRef = useRef<MoveDragState | null>(null);
  const rotateDragStateRef = useRef<RotateDragState | null>(null);
  const suppressClickRef = useRef(false);
  const [isInteractionActive, setIsInteractionActive] = useState(false);
  const [alignmentGuides, setAlignmentGuides] = useState<AlignmentGuide[]>([]);
  const [spacingGuides, setSpacingGuides] = useState<SpacingGuide[]>([]);

  const rotation = normalizeDegrees(block.rotation ?? 0);
  const scaleX = block.scaleX ?? 1;
  const scaleY = block.scaleY ?? 1;

  const clearGuideState = useCallback(() => {
    setAlignmentGuides([]);
    setSpacingGuides([]);
    setIsInteractionActive(false);
  }, []);

  const resolvePosition = useCallback((): BlockPosition | null => {
    if (initialPosition) {
      return {
        x: roundPercent(initialPosition.x),
        y: roundPercent(initialPosition.y),
        width: roundPercent(initialPosition.width),
        height: roundPercent(initialPosition.height),
      };
    }

    const wrapper = wrapperRef.current;
    const canvas = canvasRef?.current;
    if (!wrapper || !canvas) return null;

    const wrapperRect = wrapper.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    if (canvasRect.width <= 0 || canvasRect.height <= 0) return null;

    return {
      x: roundPercent(((wrapperRect.left - canvasRect.left) / canvasRect.width) * 100),
      y: roundPercent(((wrapperRect.top - canvasRect.top) / canvasRect.height) * 100),
      width: roundPercent((wrapperRect.width / canvasRect.width) * 100),
      height: roundPercent((wrapperRect.height / canvasRect.height) * 100),
    };
  }, [canvasRef, initialPosition]);

  const resolveOtherBlockPositions = useCallback((): BlockPosition[] => {
    const canvas = canvasRef?.current;
    if (!canvas) return [];

    const canvasRect = canvas.getBoundingClientRect();
    if (canvasRect.width <= 0 || canvasRect.height <= 0) return [];

    const blockElements = canvas.querySelectorAll<HTMLElement>("[data-block-index]");
    const positions: BlockPosition[] = [];

    blockElements.forEach((element) => {
      if (element.dataset.dragGhost === "true") return;
      const indexAttr = element.dataset.blockIndex;
      if (!indexAttr) return;

      const index = Number(indexAttr);
      if (!Number.isFinite(index) || index === blockIndex) return;
      if (element === wrapperRef.current) return;

      const blockRect = element.getBoundingClientRect();
      if (blockRect.width <= 0 || blockRect.height <= 0) return;

      positions.push({
        x: roundPercent(((blockRect.left - canvasRect.left) / canvasRect.width) * 100),
        y: roundPercent(((blockRect.top - canvasRect.top) / canvasRect.height) * 100),
        width: roundPercent((blockRect.width / canvasRect.width) * 100),
        height: roundPercent((blockRect.height / canvasRect.height) * 100),
      });
    });

    return positions;
  }, [blockIndex, canvasRef]);

  const applyResizeDragStyle = useCallback((position: BlockPosition) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    wrapper.style.position = "absolute";
    wrapper.style.left = `${position.x}%`;
    wrapper.style.top = `${position.y}%`;
    wrapper.style.width = `${position.width}%`;
    wrapper.style.height = `${position.height}%`;
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (
        suppressClickRef.current ||
        wrapperRef.current?.dataset.resizing === "true" ||
        wrapperRef.current?.dataset.moving === "true" ||
        wrapperRef.current?.dataset.rotating === "true"
      ) {
        return;
      }
      onSelect({ addToSelection: e.shiftKey || e.ctrlKey || e.metaKey });
    },
    [onSelect]
  );

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (
        suppressClickRef.current ||
        wrapperRef.current?.dataset.resizing === "true" ||
        wrapperRef.current?.dataset.moving === "true" ||
        wrapperRef.current?.dataset.rotating === "true"
      ) {
        return;
      }
      onStartEdit();
    },
    [onStartEdit]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isSelected && !isEditing) {
        if (e.key === "Enter") {
          e.preventDefault();
          onStartEdit();
        }
      }
    },
    [isSelected, isEditing, onStartEdit]
  );

  const handleResizeMouseMove = useCallback((e: MouseEvent) => {
    const dragState = resizeDragStateRef.current;
    if (!dragState) return;

    const screenDeltaXPct = ((e.clientX - dragState.startClientX) / dragState.canvasWidth) * 100;
    const screenDeltaYPct = ((e.clientY - dragState.startClientY) / dragState.canvasHeight) * 100;
    const localDelta = getRotatedDelta(
      screenDeltaXPct,
      screenDeltaYPct,
      dragState.rotationRadians
    );
    const deltaXPct = localDelta.x;
    const deltaYPct = localDelta.y;

    const { startPosition } = dragState;
    const handleX = dragState.effectiveHandleX;
    const handleY = dragState.effectiveHandleY;
    let left = startPosition.x;
    let top = startPosition.y;
    let right = startPosition.x + startPosition.width;
    let bottom = startPosition.y + startPosition.height;

    if (dragState.maintainAspectRatio && dragState.aspectRatio > 0) {
      const ratio = dragState.aspectRatio;
      const minWidth = Math.max(MIN_BLOCK_SIZE_PERCENT, MIN_BLOCK_SIZE_PERCENT * ratio);
      const minHeight = Math.max(MIN_BLOCK_SIZE_PERCENT, MIN_BLOCK_SIZE_PERCENT / ratio);

      if (handleY === 0) {
        const maxWidth = handleX === 1
          ? 100 - startPosition.x
          : startPosition.x + startPosition.width;
        const nextWidth = clamp(
          handleX === 1
            ? startPosition.width + deltaXPct
            : startPosition.width - deltaXPct,
          minWidth,
          maxWidth
        );
        const nextHeight = nextWidth / ratio;
        const centerY = startPosition.y + startPosition.height / 2;
        top = centerY - nextHeight / 2;
        bottom = centerY + nextHeight / 2;
        if (top < 0) {
          bottom -= top;
          top = 0;
        }
        if (bottom > 100) {
          top -= bottom - 100;
          bottom = 100;
        }
        if (handleX === 1) {
          left = startPosition.x;
          right = startPosition.x + nextWidth;
        } else {
          right = startPosition.x + startPosition.width;
          left = right - nextWidth;
        }
      } else if (handleX === 0) {
        const maxHeight = handleY === 1
          ? 100 - startPosition.y
          : startPosition.y + startPosition.height;
        const nextHeight = clamp(
          handleY === 1
            ? startPosition.height + deltaYPct
            : startPosition.height - deltaYPct,
          minHeight,
          maxHeight
        );
        const nextWidth = nextHeight * ratio;
        const centerX = startPosition.x + startPosition.width / 2;
        left = centerX - nextWidth / 2;
        right = centerX + nextWidth / 2;
        if (left < 0) {
          right -= left;
          left = 0;
        }
        if (right > 100) {
          left -= right - 100;
          right = 100;
        }
        if (handleY === 1) {
          top = startPosition.y;
          bottom = startPosition.y + nextHeight;
        } else {
          bottom = startPosition.y + startPosition.height;
          top = bottom - nextHeight;
        }
      } else {
        const anchorX = handleX === 1
          ? startPosition.x
          : startPosition.x + startPosition.width;
        const anchorY = handleY === 1
          ? startPosition.y
          : startPosition.y + startPosition.height;
        const widthFromX = handleX === 1
          ? startPosition.width + deltaXPct
          : startPosition.width - deltaXPct;
        const heightFromY = handleY === 1
          ? startPosition.height + deltaYPct
          : startPosition.height - deltaYPct;
        const widthFromY = heightFromY * ratio;
        const deltaFromX = Math.abs(widthFromX - startPosition.width);
        const deltaFromY = Math.abs(widthFromY - startPosition.width);
        const preferredWidth = deltaFromX >= deltaFromY ? widthFromX : widthFromY;
        const maxWidthByX = handleX === 1 ? 100 - anchorX : anchorX;
        const maxHeightByY = handleY === 1 ? 100 - anchorY : anchorY;
        const maxWidth = Math.min(maxWidthByX, maxHeightByY * ratio);
        const nextWidth = clamp(preferredWidth, minWidth, maxWidth);
        const nextHeight = nextWidth / ratio;
        if (handleX === 1) {
          left = anchorX;
          right = anchorX + nextWidth;
        } else {
          right = anchorX;
          left = anchorX - nextWidth;
        }
        if (handleY === 1) {
          top = anchorY;
          bottom = anchorY + nextHeight;
        } else {
          bottom = anchorY;
          top = anchorY - nextHeight;
        }
      }
    } else {
      if (handleX === -1) {
        left = clamp(startPosition.x + deltaXPct, 0, right - MIN_BLOCK_SIZE_PERCENT);
      } else if (handleX === 1) {
        right = clamp(
          startPosition.x + startPosition.width + deltaXPct,
          left + MIN_BLOCK_SIZE_PERCENT,
          100
        );
      }

      if (handleY === -1) {
        top = clamp(startPosition.y + deltaYPct, 0, bottom - MIN_BLOCK_SIZE_PERCENT);
      } else if (handleY === 1) {
        bottom = clamp(
          startPosition.y + startPosition.height + deltaYPct,
          top + MIN_BLOCK_SIZE_PERCENT,
          100
        );
      }
    }

    const otherBlocks = resolveOtherBlockPositions();
    const resizeGuides: AlignmentGuide[] = [];

    if (handleX !== 0) {
      const movingX = handleX === 1 ? right : left;
      const probeBlock: BlockPosition = {
        x: movingX,
        y: top,
        width: 0,
        height: Math.max(bottom - top, MIN_BLOCK_SIZE_PERCENT),
      };
      const snapResult = computeAlignmentGuides(
        probeBlock,
        otherBlocks,
        dragState.canvasWidth,
        dragState.canvasHeight,
        SNAP_THRESHOLD_PERCENT
      );
      const verticalGuides = snapResult.guides.filter((guide) => guide.axis === "vertical");
      resizeGuides.push(...verticalGuides);
      if (handleX === 1) {
        right = clamp(snapResult.snappedPosition.x, left + MIN_BLOCK_SIZE_PERCENT, 100);
      } else {
        left = clamp(snapResult.snappedPosition.x, 0, right - MIN_BLOCK_SIZE_PERCENT);
      }

      if (snapToGrid && verticalGuides.length === 0) {
        const snappedX = snapPercentToGrid(handleX === 1 ? right : left, gridSize);
        if (handleX === 1) {
          right = clamp(snappedX, left + MIN_BLOCK_SIZE_PERCENT, 100);
        } else {
          left = clamp(snappedX, 0, right - MIN_BLOCK_SIZE_PERCENT);
        }
      }
    }

    if (handleY !== 0) {
      const movingY = handleY === 1 ? bottom : top;
      const probeBlock: BlockPosition = {
        x: left,
        y: movingY,
        width: Math.max(right - left, MIN_BLOCK_SIZE_PERCENT),
        height: 0,
      };
      const snapResult = computeAlignmentGuides(
        probeBlock,
        otherBlocks,
        dragState.canvasWidth,
        dragState.canvasHeight,
        SNAP_THRESHOLD_PERCENT
      );
      const horizontalGuides = snapResult.guides.filter((guide) => guide.axis === "horizontal");
      resizeGuides.push(...horizontalGuides);
      if (handleY === 1) {
        bottom = clamp(snapResult.snappedPosition.y, top + MIN_BLOCK_SIZE_PERCENT, 100);
      } else {
        top = clamp(snapResult.snappedPosition.y, 0, bottom - MIN_BLOCK_SIZE_PERCENT);
      }

      if (snapToGrid && horizontalGuides.length === 0) {
        const snappedY = snapPercentToGrid(handleY === 1 ? bottom : top, gridSize);
        if (handleY === 1) {
          bottom = clamp(snappedY, top + MIN_BLOCK_SIZE_PERCENT, 100);
        } else {
          top = clamp(snappedY, 0, bottom - MIN_BLOCK_SIZE_PERCENT);
        }
      }
    }

    if (dragState.maintainAspectRatio) {
      const currentPosition: BlockPosition = {
        x: left,
        y: top,
        width: Math.max(MIN_BLOCK_SIZE_PERCENT, right - left),
        height: Math.max(MIN_BLOCK_SIZE_PERCENT, bottom - top),
      };
      const snapResult = computeAlignmentGuides(
        currentPosition,
        otherBlocks,
        dragState.canvasWidth,
        dragState.canvasHeight,
        SNAP_THRESHOLD_PERCENT
      );
      resizeGuides.push(...snapResult.guides);

      if (handleX === 0) {
        const deltaX = snapResult.snappedPosition.x - currentPosition.x;
        const clampedDeltaX = clamp(deltaX, -left, 100 - right);
        left += clampedDeltaX;
        right += clampedDeltaX;
      }
      if (handleY === 0) {
        const deltaY = snapResult.snappedPosition.y - currentPosition.y;
        const clampedDeltaY = clamp(deltaY, -top, 100 - bottom);
        top += clampedDeltaY;
        bottom += clampedDeltaY;
      }
    }

    left = clamp(left, 0, 100 - MIN_BLOCK_SIZE_PERCENT);
    top = clamp(top, 0, 100 - MIN_BLOCK_SIZE_PERCENT);
    right = clamp(right, left + MIN_BLOCK_SIZE_PERCENT, 100);
    bottom = clamp(bottom, top + MIN_BLOCK_SIZE_PERCENT, 100);

    const nextPosition: BlockPosition = {
      x: roundPercent(left),
      y: roundPercent(top),
      width: roundPercent(right - left),
      height: roundPercent(bottom - top),
    };

    const equalSpacing = computeEqualSpacingGuides(
      nextPosition,
      otherBlocks,
      SNAP_THRESHOLD_PERCENT
    );

    setIsInteractionActive(true);
    setAlignmentGuides(dedupeAlignmentGuides(resizeGuides));
    setSpacingGuides(equalSpacing);

    dragState.currentPosition = nextPosition;
    applyResizeDragStyle(nextPosition);
  }, [applyResizeDragStyle, gridSize, resolveOtherBlockPositions, snapToGrid]);

  const finalizeResize = useCallback(() => {
    const dragState = resizeDragStateRef.current;
    if (!dragState) return;
    resizeDragStateRef.current = null;

    window.removeEventListener("mousemove", handleResizeMouseMove);
    window.removeEventListener("mouseup", finalizeResize);
    wrapperRef.current?.removeAttribute("data-resizing");

    if (onResize) {
      onResize(dragState.currentPosition);
    }

    clearGuideState();

    setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  }, [clearGuideState, handleResizeMouseMove, onResize]);

  const startResize = useCallback((handle: ResizeHandle, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!onResize) return;
    if (wrapperRef.current?.dataset.rotating === "true") return;

    const wrapper = wrapperRef.current;
    const canvas = canvasRef?.current;
    if (!wrapper || !canvas) return;

    const canvasRect = canvas.getBoundingClientRect();
    if (canvasRect.width <= 0 || canvasRect.height <= 0) return;

    const startPosition = resolvePosition();
    if (!startPosition) return;

    const effectiveHandleX: -1 | 0 | 1 =
      handle.x === 0 ? 0 : scaleX < 0 ? (handle.x === 1 ? -1 : 1) : handle.x;
    const effectiveHandleY: -1 | 0 | 1 =
      handle.y === 0 ? 0 : scaleY < 0 ? (handle.y === 1 ? -1 : 1) : handle.y;

    resizeDragStateRef.current = {
      effectiveHandleX,
      effectiveHandleY,
      rotationRadians: (rotation * Math.PI) / 180,
      maintainAspectRatio,
      aspectRatio: startPosition.width / startPosition.height,
      startClientX: e.clientX,
      startClientY: e.clientY,
      canvasWidth: canvasRect.width,
      canvasHeight: canvasRect.height,
      startPosition,
      currentPosition: startPosition,
    };

    setIsInteractionActive(true);
    setAlignmentGuides([]);
    setSpacingGuides([]);

    suppressClickRef.current = true;
    wrapper.setAttribute("data-resizing", "true");
    window.addEventListener("mousemove", handleResizeMouseMove);
    window.addEventListener("mouseup", finalizeResize);
  }, [canvasRef, finalizeResize, handleResizeMouseMove, maintainAspectRatio, onResize, resolvePosition, rotation, scaleX, scaleY]);

  const handleRotateMouseMove = useCallback((e: MouseEvent) => {
    const dragState = rotateDragStateRef.current;
    if (!dragState || !onRotate) return;

    let nextRotation = getRotationFromPoint(
      dragState.centerX,
      dragState.centerY,
      e.clientX,
      e.clientY
    );
    if (e.shiftKey) {
      nextRotation = normalizeDegrees(Math.round(nextRotation / 15) * 15);
    }
    onRotate(nextRotation);
  }, [onRotate]);

  const finalizeRotate = useCallback(() => {
    const dragState = rotateDragStateRef.current;
    if (!dragState) return;
    rotateDragStateRef.current = null;

    window.removeEventListener("mousemove", handleRotateMouseMove);
    window.removeEventListener("mouseup", finalizeRotate);
    wrapperRef.current?.removeAttribute("data-rotating");

    clearGuideState();

    setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  }, [clearGuideState, handleRotateMouseMove]);

  const startRotate = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if (!isSelected || isEditing || !onRotate) return;
    if (wrapperRef.current?.dataset.resizing === "true") return;
    if (wrapperRef.current?.dataset.moving === "true") return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    e.preventDefault();
    e.stopPropagation();

    rotateDragStateRef.current = {
      centerX: rect.left + (rect.width / 2),
      centerY: rect.top + (rect.height / 2),
    };

    setIsInteractionActive(false);
    setAlignmentGuides([]);
    setSpacingGuides([]);

    suppressClickRef.current = true;
    wrapper.setAttribute("data-rotating", "true");
    window.addEventListener("mousemove", handleRotateMouseMove);
    window.addEventListener("mouseup", finalizeRotate);
  }, [finalizeRotate, handleRotateMouseMove, isEditing, isSelected, onRotate]);

  const removeMoveArtifacts = useCallback((dragState: MoveDragState | null) => {
    if (!dragState) return;
    dragState.ghostElement.remove();
  }, []);

  const handleMoveMouseMove = useCallback((e: MouseEvent) => {
    const dragState = moveDragStateRef.current;
    if (!dragState) return;

    const deltaXPct = ((e.clientX - dragState.startClientX) / dragState.canvasWidth) * 100;
    const deltaYPct = ((e.clientY - dragState.startClientY) / dragState.canvasHeight) * 100;

    const rawPosition: BlockPosition = {
      x: clamp(dragState.startPosition.x + deltaXPct, 0, 100 - dragState.startPosition.width),
      y: clamp(dragState.startPosition.y + deltaYPct, 0, 100 - dragState.startPosition.height),
      width: dragState.startPosition.width,
      height: dragState.startPosition.height,
    };

    const otherBlocks = resolveOtherBlockPositions();
    const { guides, snappedPosition } = computeAlignmentGuides(
      rawPosition,
      otherBlocks,
      dragState.canvasWidth,
      dragState.canvasHeight,
      SNAP_THRESHOLD_PERCENT
    );
    const equalSpacing = computeEqualSpacingGuides(
      snappedPosition,
      otherBlocks,
      SNAP_THRESHOLD_PERCENT
    );

    const snapToGridX = snapToGrid && !hasAxisGuide(guides, "vertical");
    const snapToGridY = snapToGrid && !hasAxisGuide(guides, "horizontal");
    const nextX = snapToGridX
      ? snapPercentToGrid(snappedPosition.x, gridSize)
      : snappedPosition.x;
    const nextY = snapToGridY
      ? snapPercentToGrid(snappedPosition.y, gridSize)
      : snappedPosition.y;

    const nextPosition: BlockPosition = {
      x: roundPercent(clamp(nextX, 0, 100 - dragState.startPosition.width)),
      y: roundPercent(clamp(nextY, 0, 100 - dragState.startPosition.height)),
      width: dragState.startPosition.width,
      height: dragState.startPosition.height,
    };

    dragState.currentPosition = nextPosition;
    if (
      Math.abs(e.clientX - dragState.startClientX) > 1 ||
      Math.abs(e.clientY - dragState.startClientY) > 1
    ) {
      dragState.hasMoved = true;
    }

    setIsInteractionActive(true);
    setAlignmentGuides(guides);
    setSpacingGuides(equalSpacing);

    dragState.ghostElement.style.left = `${nextPosition.x}%`;
    dragState.ghostElement.style.top = `${nextPosition.y}%`;
  }, [gridSize, resolveOtherBlockPositions, snapToGrid]);

  const finalizeMove = useCallback(() => {
    const dragState = moveDragStateRef.current;
    if (!dragState) return;
    moveDragStateRef.current = null;

    window.removeEventListener("mousemove", handleMoveMouseMove);
    window.removeEventListener("mouseup", finalizeMove);
    wrapperRef.current?.removeAttribute("data-moving");
    removeMoveArtifacts(dragState);

    if (dragState.hasMoved && onMove) {
      onMove(dragState.currentPosition);
    }

    clearGuideState();

    setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  }, [clearGuideState, handleMoveMouseMove, onMove, removeMoveArtifacts]);

  const startMove = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if (!isSelected || isEditing || !onMove) return;
    if ((e.target as HTMLElement).closest("[data-resize-handle]")) return;
    if ((e.target as HTMLElement).closest("[data-rotation-handle]")) return;
    if (wrapperRef.current?.dataset.resizing === "true") return;
    if (wrapperRef.current?.dataset.rotating === "true") return;

    const wrapper = wrapperRef.current;
    const canvas = canvasRef?.current;
    if (!wrapper || !canvas) return;

    const canvasRect = canvas.getBoundingClientRect();
    if (canvasRect.width <= 0 || canvasRect.height <= 0) return;

    const startPosition = resolvePosition();
    if (!startPosition) return;

    e.preventDefault();
    e.stopPropagation();

    const ghostElement = createGhostElement(wrapper, startPosition);
    canvas.appendChild(ghostElement);

    moveDragStateRef.current = {
      startClientX: e.clientX,
      startClientY: e.clientY,
      canvasWidth: canvasRect.width,
      canvasHeight: canvasRect.height,
      startPosition,
      currentPosition: startPosition,
      hasMoved: false,
      ghostElement,
    };

    setIsInteractionActive(true);
    setAlignmentGuides([]);
    setSpacingGuides([]);

    suppressClickRef.current = true;
    wrapper.setAttribute("data-moving", "true");
    window.addEventListener("mousemove", handleMoveMouseMove);
    window.addEventListener("mouseup", finalizeMove);
  }, [canvasRef, finalizeMove, handleMoveMouseMove, isEditing, isSelected, onMove, resolvePosition]);

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleResizeMouseMove);
      window.removeEventListener("mouseup", finalizeResize);
      window.removeEventListener("mousemove", handleMoveMouseMove);
      window.removeEventListener("mouseup", finalizeMove);
      window.removeEventListener("mousemove", handleRotateMouseMove);
      window.removeEventListener("mouseup", finalizeRotate);
      removeMoveArtifacts(moveDragStateRef.current);
      moveDragStateRef.current = null;
      rotateDragStateRef.current = null;
    };
  }, [
    finalizeMove,
    finalizeResize,
    finalizeRotate,
    handleMoveMouseMove,
    handleResizeMouseMove,
    handleRotateMouseMove,
    removeMoveArtifacts,
  ]);

  const transformParts = [
    style?.transform,
    `rotate(${rotation}deg)`,
    `scaleX(${scaleX})`,
    `scaleY(${scaleY})`,
  ].filter(Boolean);

  const wrapperStyle: React.CSSProperties = {
    ...style,
    transformOrigin: style?.transformOrigin ?? "center",
    transform: transformParts.join(" "),
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className={cn(
          "relative group transition-all outline-none",
          // Hover state (not selected, not editing)
          !isSelected && !isEditing && "hover:outline hover:outline-2 hover:outline-blue-300/50 hover:outline-offset-1",
          // Selected state
          isSelected && !isEditing && "outline outline-2 outline-blue-500 outline-offset-1",
          // Editing state
          isEditing && "outline outline-2 outline-blue-500 outline-offset-1",
          className
        )}
        style={wrapperStyle}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onKeyDown={handleKeyDown}
        onMouseDown={startMove}
        onContextMenu={onContextMenu}
        tabIndex={0}
        data-block-index={blockIndex}
        data-block-type={block.type}
      >
        <div
          className={contentClassName}
          style={contentStyle}
          data-block-animation-content="true"
        >
          {children}
        </div>

        {/* Resize handles — only shown when selected but NOT editing */}
        {isSelected && !isEditing &&
          RESIZE_HANDLES.map((handle) => (
            <div
              key={handle.position}
              style={{
                ...getHandleStyle(handle.position),
                cursor: resolveResizeCursor(handle.x, handle.y, rotation, scaleX, scaleY),
              }}
              data-resize-handle={handle.position}
              onMouseDown={(e) => startResize(handle, e)}
            />
          ))}

        {isSelected && !isEditing && (
          <>
            <div
              className="absolute"
              style={{
                top: -16,
                left: "50%",
                width: 1,
                height: 12,
                transform: "translateX(-50%)",
                backgroundColor: "#3B82F6",
                zIndex: 10,
              }}
              data-rotation-connector="true"
            />
            <div
              className="absolute rounded-full border-2 border-white bg-blue-500"
              style={{
                top: -26,
                left: "50%",
                width: 10,
                height: 10,
                transform: "translateX(-50%)",
                cursor: wrapperRef.current?.dataset.rotating === "true" ? "grabbing" : "grab",
                zIndex: 11,
              }}
              data-rotation-handle="true"
              onMouseDown={startRotate}
            />
          </>
        )}
      </div>

      {canvasRef?.current &&
        createPortal(
          <AlignmentGuidesOverlay
            visible={isInteractionActive}
            guides={alignmentGuides}
            spacingGuides={spacingGuides}
          />,
          canvasRef.current
        )}
    </>
  );
}
