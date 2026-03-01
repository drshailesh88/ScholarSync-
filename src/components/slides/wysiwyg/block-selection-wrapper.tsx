"use client";

import { useRef, useCallback } from "react";
import type { ContentBlock } from "@/types/presentation";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// BlockSelectionWrapper — wraps every block on the WYSIWYG canvas with
// click-to-select, resize handles, and a drag handle.
// ---------------------------------------------------------------------------

interface BlockSelectionWrapperProps {
  block: ContentBlock;
  blockIndex: number;
  isSelected: boolean;
  isEditing: boolean;
  onSelect: () => void;
  onStartEdit: () => void;
  onDelete: () => void;
  onResize?: (width: number, height: number) => void;
  children: React.ReactNode;
  className?: string;
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

export function BlockSelectionWrapper({
  block,
  blockIndex,
  isSelected,
  isEditing,
  onSelect,
  onStartEdit,
  onDelete,
  children,
  className,
}: BlockSelectionWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isSelected) {
        onSelect();
      }
    },
    [isSelected, onSelect]
  );

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onStartEdit();
    },
    [onStartEdit]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isSelected && !isEditing) {
        if (e.key === "Delete" || e.key === "Backspace") {
          e.preventDefault();
          onDelete();
        }
        if (e.key === "Enter") {
          e.preventDefault();
          onStartEdit();
        }
      }
    },
    [isSelected, isEditing, onDelete, onStartEdit]
  );

  return (
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
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      data-block-index={blockIndex}
      data-block-type={block.type}
    >
      {children}

      {/* Resize handles — only shown when selected but NOT editing */}
      {isSelected && !isEditing &&
        RESIZE_HANDLES.map(({ position, cursor }) => (
          <div
            key={position}
            style={{ ...getHandleStyle(position), cursor }}
          />
        ))}
    </div>
  );
}
