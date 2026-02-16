"use client";

import { useState } from "react";
import {
  ChatCircle,
  PaperclipHorizontal,
  Trash,
  X,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type {
  PDFHighlight,
  HighlightColor,
  TargetSection,
} from "@/lib/pdf/types";
import {
  HIGHLIGHT_COLOR_LABELS,
  TARGET_SECTION_OPTIONS,
} from "@/lib/pdf/types";

const colorOptions: HighlightColor[] = [
  "yellow",
  "green",
  "blue",
  "pink",
  "orange",
];

const colorDotMap: Record<HighlightColor, string> = {
  yellow: "bg-yellow-400",
  green: "bg-green-400",
  blue: "bg-blue-400",
  pink: "bg-pink-400",
  orange: "bg-orange-400",
};

interface PDFAnnotationPopoverProps {
  highlight: PDFHighlight;
  position: { x: number; y: number };
  onUpdateNote: (id: string, note: string) => void;
  onUpdateColor: (id: string, color: HighlightColor) => void;
  onUpdateSection: (id: string, section: TargetSection) => void;
  onAskAI: (highlight: PDFHighlight) => void;
  onCite: (highlight: PDFHighlight) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export function PDFAnnotationPopover({
  highlight,
  position,
  onUpdateNote,
  onUpdateColor,
  onUpdateSection,
  onAskAI,
  onCite,
  onDelete,
  onClose,
}: PDFAnnotationPopoverProps) {
  const [note, setNote] = useState(highlight.note || "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleNoteBlur = () => {
    if (note !== (highlight.note || "")) {
      onUpdateNote(highlight.id, note);
    }
  };

  return (
    <div
      className="fixed z-[60] animate-in fade-in slide-in-from-bottom-2 duration-150"
      style={{
        left: Math.min(position.x, window.innerWidth - 360),
        top: Math.min(position.y, window.innerHeight - 400),
      }}
    >
      <div className="w-[340px] rounded-lg bg-surface border border-border shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between p-3 border-b border-border">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-ink line-clamp-3 italic">
              &ldquo;{highlight.selectedText.slice(0, 200)}
              {highlight.selectedText.length > 200 ? "..." : ""}&rdquo;
            </p>
            <p className="text-xs text-ink-muted mt-1">
              Page {highlight.pageNumber}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-ink-muted hover:text-ink hover:bg-surface-raised ml-2 shrink-0"
          >
            <X size={14} />
          </button>
        </div>

        {/* Section target */}
        <div className="px-3 py-2 border-b border-border">
          <label className="text-xs text-ink-muted block mb-1">
            Section target
          </label>
          <select
            value={highlight.targetSection || "general"}
            onChange={(e) =>
              onUpdateSection(highlight.id, e.target.value as TargetSection)
            }
            className="w-full text-sm bg-surface-raised border border-border rounded px-2 py-1 text-ink focus:outline-none focus:ring-1 focus:ring-brand"
          >
            {TARGET_SECTION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Note */}
        <div className="px-3 py-2 border-b border-border">
          <label className="text-xs text-ink-muted block mb-1">Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onBlur={handleNoteBlur}
            placeholder="Add a note..."
            rows={2}
            className="w-full text-sm bg-surface-raised border border-border rounded px-2 py-1.5 text-ink placeholder:text-ink-muted/50 resize-none focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>

        {/* Color picker */}
        <div className="px-3 py-2 border-b border-border">
          <label className="text-xs text-ink-muted block mb-1.5">Color</label>
          <div className="flex items-center gap-2">
            {colorOptions.map((color) => (
              <button
                key={color}
                onClick={() => onUpdateColor(highlight.id, color)}
                className={cn(
                  "w-6 h-6 rounded-full transition-all",
                  colorDotMap[color],
                  highlight.color === color
                    ? "ring-2 ring-offset-2 ring-offset-surface ring-ink/40 scale-110"
                    : "opacity-60 hover:opacity-100"
                )}
                title={HIGHLIGHT_COLOR_LABELS[color]}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onAskAI(highlight)}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
            >
              <ChatCircle size={14} />
              Ask AI
            </button>
            <button
              onClick={() => onCite(highlight)}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
            >
              <PaperclipHorizontal size={14} />
              Cite
            </button>
          </div>

          <div className="flex items-center gap-1">
            {showDeleteConfirm ? (
              <div className="flex items-center gap-1">
                <span className="text-xs text-red-500">Delete?</span>
                <button
                  onClick={() => onDelete(highlight.id)}
                  className="px-2 py-1 rounded text-xs text-red-500 bg-red-500/10 hover:bg-red-500/20 transition-colors"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-2 py-1 rounded text-xs text-ink-muted hover:bg-surface-raised transition-colors"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-1 px-2 py-1 rounded text-xs text-ink-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <Trash size={14} />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
