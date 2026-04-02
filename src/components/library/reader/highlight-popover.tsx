"use client";

import { useState } from "react";
import { HighlighterCircle, NotePencil } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { AnnotationColor } from "@/lib/library/annotations";

interface HighlightPopoverProps {
  position: { top: number; left: number };
  onHighlight: (color: AnnotationColor, note?: string) => void;
  onClose: () => void;
}

const COLORS: { key: AnnotationColor; label: string; className: string }[] = [
  {
    key: "yellow",
    label: "Default highlight",
    className: "bg-yellow-300/80 hover:bg-yellow-300",
  },
  {
    key: "blue",
    label: "Important highlight",
    className: "bg-[var(--library-accent-tint)] hover:bg-[var(--library-accent)]/30",
  },
];

export function HighlightPopover({
  position,
  onHighlight,
  onClose,
}: HighlightPopoverProps) {
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState("");
  const [selectedColor, setSelectedColor] = useState<AnnotationColor>("yellow");

  const handleHighlight = (color: AnnotationColor) => {
    if (showNote) return;
    onHighlight(color);
  };

  const handleSubmitWithNote = () => {
    onHighlight(selectedColor, note || undefined);
  };

  return (
    <div
      className="fixed z-50 animate-in fade-in-0 zoom-in-95 duration-150"
      style={{ top: position.top, left: position.left, transform: "translate(-50%, -100%)" }}
    >
      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-lg p-1.5">
        {!showNote ? (
          <div className="flex items-center gap-1">
            {COLORS.map((color) => (
              <button
                key={color.key}
                title={color.label}
                onClick={() => handleHighlight(color.key)}
                className={cn(
                  "w-7 h-7 rounded-md flex items-center justify-center transition-colors",
                  color.className
                )}
              >
                <HighlighterCircle size={16} weight="bold" />
              </button>
            ))}
            <div className="w-px h-5 bg-[var(--border)] mx-0.5" />
            <button
              title="Highlight with note"
              onClick={() => setShowNote(true)}
              className="w-7 h-7 rounded-md flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-raised)] transition-colors"
            >
              <NotePencil size={16} weight="bold" />
            </button>
          </div>
        ) : (
          <div className="w-64 space-y-2 p-1">
            <div className="flex gap-1">
              {COLORS.map((color) => (
                <button
                  key={color.key}
                  onClick={() => setSelectedColor(color.key)}
                  className={cn(
                    "w-6 h-6 rounded-md flex items-center justify-center transition-all",
                    color.className,
                    selectedColor === color.key && "ring-2 ring-[var(--brand)] ring-offset-1"
                  )}
                >
                  <HighlighterCircle size={14} weight="bold" />
                </button>
              ))}
            </div>
            <textarea
              autoFocus
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note..."
              className="w-full rounded-md border border-[var(--border)] bg-[var(--surface-raised)] px-2.5 py-1.5 text-sm text-[var(--ink)] placeholder:text-[var(--ink-muted)] resize-none focus:outline-none focus:ring-1 focus:ring-[var(--brand)]"
              rows={2}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  handleSubmitWithNote();
                }
                if (e.key === "Escape") {
                  onClose();
                }
              }}
            />
            <div className="flex justify-end gap-1.5">
              <button
                onClick={onClose}
                className="px-2.5 py-1 text-xs text-[var(--ink-muted)] hover:text-[var(--ink)] rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitWithNote}
                className="px-2.5 py-1 text-xs bg-[var(--brand)] text-white rounded hover:opacity-90 transition-opacity"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Arrow pointing down */}
      <div className="flex justify-center -mt-px">
        <div className="w-2.5 h-2.5 rotate-45 border-r border-b border-[var(--border)] bg-[var(--surface)] -translate-y-1.5" />
      </div>
    </div>
  );
}
