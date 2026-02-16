"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  ChatCircle,
  PaperclipHorizontal,
  NotePencil,
  Highlighter,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { PDFTextSelection } from "@/lib/pdf/types";

interface PDFSelectionMenuProps {
  selection: PDFTextSelection;
  position: { x: number; y: number };
  onAskAI: (selection: PDFTextSelection) => void;
  onCite: (selection: PDFTextSelection) => void;
  onNote: (selection: PDFTextSelection) => void;
  onHighlight: (selection: PDFTextSelection) => void;
  onDismiss: () => void;
}

const actions = [
  { key: "1", label: "Ask AI", icon: ChatCircle, action: "askAI" as const },
  { key: "2", label: "Cite", icon: PaperclipHorizontal, action: "cite" as const },
  { key: "3", label: "Note", icon: NotePencil, action: "note" as const },
  { key: "4", label: "Highlight", icon: Highlighter, action: "highlight" as const },
];

export function PDFSelectionMenu({
  selection,
  position,
  onAskAI,
  onCite,
  onNote,
  onHighlight,
  onDismiss,
}: PDFSelectionMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleAction = useCallback(
    (action: "askAI" | "cite" | "note" | "highlight") => {
      switch (action) {
        case "askAI":
          onAskAI(selection);
          break;
        case "cite":
          onCite(selection);
          break;
        case "note":
          onNote(selection);
          break;
        case "highlight":
          onHighlight(selection);
          break;
      }
    },
    [selection, onAskAI, onCite, onNote, onHighlight]
  );

  // Keyboard shortcuts: 1-4 for actions, Escape to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onDismiss();
        return;
      }
      const actionItem = actions.find((a) => a.key === e.key);
      if (actionItem) {
        e.preventDefault();
        handleAction(actionItem.action);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleAction, onDismiss]);

  // Dismiss on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onDismiss();
      }
    };

    // Delay to avoid immediately dismissing on the mouseup that triggered the menu
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onDismiss]);

  // Compute menu position: ensure it stays within viewport
  const menuWidth = 340;
  const menuHeight = 44;
  let x = position.x - menuWidth / 2;
  let y = position.y - menuHeight - 8;

  // Clamp to viewport
  if (x < 8) x = 8;
  if (x + menuWidth > window.innerWidth - 8) x = window.innerWidth - menuWidth - 8;
  if (y < 8) y = position.y + 30; // Flip below if too close to top

  return (
    <div
      ref={menuRef}
      className="fixed z-[60] animate-in fade-in slide-in-from-bottom-2 duration-150"
      style={{ left: x, top: y }}
    >
      <div className="flex items-center gap-0.5 px-1.5 py-1.5 rounded-lg bg-surface border border-border shadow-lg backdrop-blur-sm">
        {actions.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.action}
              onClick={() => handleAction(item.action)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm",
                "text-ink-muted hover:text-ink hover:bg-surface-raised",
                "transition-colors whitespace-nowrap"
              )}
              title={`${item.label} (${item.key})`}
            >
              <Icon size={15} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
