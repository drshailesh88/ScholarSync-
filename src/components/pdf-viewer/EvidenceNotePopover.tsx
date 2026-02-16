"use client";

import { useState } from "react";
import { X } from "@phosphor-icons/react";
import type {
  PDFTextSelection,
  TargetSection,
  HighlightColor,
} from "@/lib/pdf/types";
import { TARGET_SECTION_OPTIONS } from "@/lib/pdf/types";

interface EvidenceNotePopoverProps {
  selection: PDFTextSelection;
  position: { x: number; y: number };
  paperTitle?: string;
  onSave: (data: {
    selection: PDFTextSelection;
    targetSection: TargetSection;
    userNote: string;
    color: HighlightColor;
  }) => void;
  onCancel: () => void;
}

export function EvidenceNotePopover({
  selection,
  position,
  paperTitle,
  onSave,
  onCancel,
}: EvidenceNotePopoverProps) {
  const [targetSection, setTargetSection] = useState<TargetSection>("general");
  const [userNote, setUserNote] = useState("");

  const handleSave = () => {
    onSave({
      selection,
      targetSection,
      userNote,
      color: "yellow",
    });
  };

  return (
    <div
      className="fixed z-[60] animate-in fade-in slide-in-from-bottom-2 duration-150"
      style={{
        left: Math.min(position.x - 160, window.innerWidth - 360),
        top: Math.min(position.y + 10, window.innerHeight - 350),
      }}
    >
      <div className="w-[340px] rounded-lg bg-surface border border-border shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border">
          <h3 className="text-sm font-medium text-ink">
            Save as Evidence Note
          </h3>
          <button
            onClick={onCancel}
            className="p-1 rounded text-ink-muted hover:text-ink hover:bg-surface-raised"
          >
            <X size={14} />
          </button>
        </div>

        <div className="p-3 space-y-3">
          {/* Quote preview */}
          <div>
            <label className="text-xs text-ink-muted block mb-1">Quote</label>
            <p className="text-sm text-ink bg-surface-raised rounded p-2 line-clamp-3 italic">
              &ldquo;{selection.text.slice(0, 250)}
              {selection.text.length > 250 ? "..." : ""}&rdquo;
            </p>
            <p className="text-xs text-ink-muted mt-1">
              Page {selection.pageNumber}
              {paperTitle && ` \u2022 ${paperTitle}`}
            </p>
          </div>

          {/* Section target */}
          <div>
            <label className="text-xs text-ink-muted block mb-1">
              Section
            </label>
            <select
              value={targetSection}
              onChange={(e) =>
                setTargetSection(e.target.value as TargetSection)
              }
              className="w-full text-sm bg-surface-raised border border-border rounded px-2 py-1.5 text-ink focus:outline-none focus:ring-1 focus:ring-brand"
            >
              {TARGET_SECTION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* User note */}
          <div>
            <label className="text-xs text-ink-muted block mb-1">
              Your note (optional)
            </label>
            <textarea
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              placeholder="Why is this important?"
              rows={2}
              className="w-full text-sm bg-surface-raised border border-border rounded px-2 py-1.5 text-ink placeholder:text-ink-muted/50 resize-none focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={onCancel}
              className="px-3 py-1.5 rounded-md text-sm text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 rounded-md text-sm text-white bg-brand hover:bg-brand-hover transition-colors"
            >
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
