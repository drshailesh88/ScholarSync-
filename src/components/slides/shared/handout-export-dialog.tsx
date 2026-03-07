"use client";

import { useState } from "react";
import { X, FilePdf } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export type HandoutLayout =
  | "full_slide"
  | "two_up"
  | "three_up_notes"
  | "six_up"
  | "outline";

export type PaperSize = "letter" | "a4";

export interface HandoutExportOptions {
  layout: HandoutLayout;
  includeSlideNumbers: boolean;
  includeHeader: boolean;
  includeSpeakerNotes: boolean;
  paperSize: PaperSize;
}

interface HandoutExportDialogProps {
  open: boolean;
  onClose: () => void;
  onExport: (options: HandoutExportOptions) => void;
  exporting?: boolean;
}

const LAYOUTS: {
  value: HandoutLayout;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "full_slide",
    label: "Full Slide",
    description: "1 per page, landscape",
    icon: (
      <svg viewBox="0 0 40 30" className="w-10 h-8">
        <rect x="2" y="2" width="36" height="26" rx="2" fill="currentColor" opacity={0.12} stroke="currentColor" strokeWidth="1" />
        <rect x="6" y="6" width="28" height="18" rx="1" fill="currentColor" opacity={0.2} />
      </svg>
    ),
  },
  {
    value: "two_up",
    label: "2 Slides",
    description: "Portrait, stacked",
    icon: (
      <svg viewBox="0 0 30 40" className="w-7 h-10">
        <rect x="2" y="2" width="26" height="36" rx="2" fill="currentColor" opacity={0.12} stroke="currentColor" strokeWidth="1" />
        <rect x="5" y="5" width="20" height="13" rx="1" fill="currentColor" opacity={0.2} />
        <rect x="5" y="22" width="20" height="13" rx="1" fill="currentColor" opacity={0.2} />
      </svg>
    ),
  },
  {
    value: "three_up_notes",
    label: "3 Slides + Notes",
    description: "Slides left, notes right",
    icon: (
      <svg viewBox="0 0 30 40" className="w-7 h-10">
        <rect x="2" y="2" width="26" height="36" rx="2" fill="currentColor" opacity={0.12} stroke="currentColor" strokeWidth="1" />
        <rect x="4" y="5" width="11" height="8" rx="1" fill="currentColor" opacity={0.2} />
        <rect x="4" y="16" width="11" height="8" rx="1" fill="currentColor" opacity={0.2} />
        <rect x="4" y="27" width="11" height="8" rx="1" fill="currentColor" opacity={0.2} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <line x1="17" y1={7 + i * 11} x2="26" y2={7 + i * 11} stroke="currentColor" strokeWidth="0.5" opacity={0.25} />
            <line x1="17" y1={9.5 + i * 11} x2="26" y2={9.5 + i * 11} stroke="currentColor" strokeWidth="0.5" opacity={0.25} />
            <line x1="17" y1={12 + i * 11} x2="26" y2={12 + i * 11} stroke="currentColor" strokeWidth="0.5" opacity={0.25} />
          </g>
        ))}
      </svg>
    ),
  },
  {
    value: "six_up",
    label: "6 Slides",
    description: "3x2 grid",
    icon: (
      <svg viewBox="0 0 30 40" className="w-7 h-10">
        <rect x="2" y="2" width="26" height="36" rx="2" fill="currentColor" opacity={0.12} stroke="currentColor" strokeWidth="1" />
        {[0, 1, 2].map((row) =>
          [0, 1].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={4 + col * 13}
              y={5 + row * 11}
              width={10}
              height={8}
              rx="1"
              fill="currentColor"
              opacity={0.2}
            />
          )),
        )}
      </svg>
    ),
  },
  {
    value: "outline",
    label: "Outline Only",
    description: "Text document, no images",
    icon: (
      <svg viewBox="0 0 30 40" className="w-7 h-10">
        <rect x="2" y="2" width="26" height="36" rx="2" fill="currentColor" opacity={0.12} stroke="currentColor" strokeWidth="1" />
        <line x1="6" y1="8" x2="24" y2="8" stroke="currentColor" strokeWidth="1.5" opacity={0.35} />
        <line x1="8" y1="13" x2="22" y2="13" stroke="currentColor" strokeWidth="0.75" opacity={0.2} />
        <line x1="8" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="0.75" opacity={0.2} />
        <line x1="6" y1="22" x2="24" y2="22" stroke="currentColor" strokeWidth="1.5" opacity={0.35} />
        <line x1="8" y1="27" x2="22" y2="27" stroke="currentColor" strokeWidth="0.75" opacity={0.2} />
        <line x1="8" y1="30" x2="18" y2="30" stroke="currentColor" strokeWidth="0.75" opacity={0.2} />
      </svg>
    ),
  },
];

export function HandoutExportDialog({
  open,
  onClose,
  onExport,
  exporting,
}: HandoutExportDialogProps) {
  const [layout, setLayout] = useState<HandoutLayout>("three_up_notes");
  const [includeSlideNumbers, setIncludeSlideNumbers] = useState(true);
  const [includeHeader, setIncludeHeader] = useState(true);
  const [includeSpeakerNotes, setIncludeSpeakerNotes] = useState(true);
  const [paperSize, setPaperSize] = useState<PaperSize>("letter");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Dialog */}
      <div className="relative bg-surface rounded-2xl shadow-xl border border-border w-full max-w-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <FilePdf size={18} />
            Export PDF Handout
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Layout selector */}
        <div className="mb-5">
          <div className="text-xs font-medium text-ink-muted mb-2">Layout</div>
          <div className="grid grid-cols-5 gap-2">
            {LAYOUTS.map((l) => (
              <button
                key={l.value}
                onClick={() => setLayout(l.value)}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition-all text-ink-muted",
                  layout === l.value
                    ? "border-brand bg-brand/5 text-brand"
                    : "border-border hover:border-ink-muted/30 hover:bg-surface-raised",
                )}
              >
                {l.icon}
                <span className="text-[10px] font-medium leading-tight text-center">
                  {l.label}
                </span>
              </button>
            ))}
          </div>
          <div className="text-[10px] text-ink-muted mt-1.5">
            {LAYOUTS.find((l) => l.value === layout)?.description}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-2.5 mb-5">
          <div className="text-xs font-medium text-ink-muted mb-1">Options</div>

          <label className="flex items-center gap-2 text-xs text-ink cursor-pointer">
            <input
              type="checkbox"
              checked={includeSlideNumbers}
              onChange={() => setIncludeSlideNumbers(!includeSlideNumbers)}
              className="rounded"
            />
            Include slide numbers
          </label>

          <label className="flex items-center gap-2 text-xs text-ink cursor-pointer">
            <input
              type="checkbox"
              checked={includeHeader}
              onChange={() => setIncludeHeader(!includeHeader)}
              className="rounded"
            />
            Include header with deck title
          </label>

          <label
            className={cn(
              "flex items-center gap-2 text-xs cursor-pointer",
              layout === "three_up_notes" ? "text-ink" : "text-ink-muted/60 cursor-not-allowed",
            )}
          >
            <input
              type="checkbox"
              checked={includeSpeakerNotes}
              disabled={layout !== "three_up_notes"}
              onChange={() => setIncludeSpeakerNotes(!includeSpeakerNotes)}
              className="rounded"
            />
            Include speaker notes
          </label>

          {/* Paper size */}
          <div className="flex items-center gap-3 pt-1">
            <span className="text-xs text-ink-muted">Paper size:</span>
            <div className="flex rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => setPaperSize("letter")}
                className={cn(
                  "px-3 py-1 text-xs font-medium transition-colors",
                  paperSize === "letter"
                    ? "bg-brand text-white"
                    : "text-ink-muted hover:bg-surface-raised",
                )}
              >
                Letter
              </button>
              <button
                onClick={() => setPaperSize("a4")}
                className={cn(
                  "px-3 py-1 text-xs font-medium transition-colors border-l border-border",
                  paperSize === "a4"
                    ? "bg-brand text-white"
                    : "text-ink-muted hover:bg-surface-raised",
                )}
              >
                A4
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onExport({
                layout,
                includeSlideNumbers,
                includeHeader,
                includeSpeakerNotes,
                paperSize,
              })
            }
            disabled={exporting}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium bg-brand text-white hover:bg-brand/90 transition-colors disabled:opacity-50"
          >
            <FilePdf size={14} />
            {exporting ? "Exporting..." : "Export PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}
