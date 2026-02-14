"use client";

import { useState, useEffect } from "react";
import { File, FileText, TextT, BookOpen } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export type SourceType = "papers" | "document" | "text";

interface SourceSelectorProps {
  sourceType: SourceType;
  onSourceTypeChange: (type: SourceType) => void;
  selectedPaperIds: number[];
  onPaperIdsChange: (ids: number[]) => void;
  selectedDocumentId: number | null;
  onDocumentIdChange: (id: number | null) => void;
  rawText: string;
  onRawTextChange: (text: string) => void;
}

const SOURCE_OPTIONS: { key: SourceType; label: string; description: string; icon: React.ReactNode }[] = [
  {
    key: "papers",
    label: "From Papers",
    description: "Select papers from your library",
    icon: <BookOpen size={20} />,
  },
  {
    key: "document",
    label: "From Document",
    description: "Use a synthesis document",
    icon: <FileText size={20} />,
  },
  {
    key: "text",
    label: "From Text",
    description: "Paste content directly",
    icon: <TextT size={20} />,
  },
];

export function SourceSelector({
  sourceType,
  onSourceTypeChange,
  selectedPaperIds,
  onPaperIdsChange,
  selectedDocumentId,
  onDocumentIdChange,
  rawText,
  onRawTextChange,
}: SourceSelectorProps) {
  return (
    <div className="space-y-4">
      {/* Source type selector */}
      <div className="grid grid-cols-3 gap-3">
        {SOURCE_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => onSourceTypeChange(opt.key)}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors text-center",
              sourceType === opt.key
                ? "border-brand bg-brand/5 text-brand"
                : "border-border text-ink-muted hover:border-brand/40"
            )}
          >
            {opt.icon}
            <span className="text-xs font-medium">{opt.label}</span>
            <span className="text-[10px] opacity-60">{opt.description}</span>
          </button>
        ))}
      </div>

      {/* Source-specific input */}
      {sourceType === "papers" && (
        <div>
          <label className="text-sm font-medium text-ink block mb-2">
            Paper IDs{" "}
            <span className="text-ink-muted font-normal">
              (comma-separated)
            </span>
          </label>
          <input
            value={selectedPaperIds.join(", ")}
            onChange={(e) => {
              const ids = e.target.value
                .split(",")
                .map((s) => parseInt(s.trim(), 10))
                .filter((n) => !isNaN(n));
              onPaperIdsChange(ids);
            }}
            placeholder="e.g., 1, 2, 3"
            className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
          <p className="text-[10px] text-ink-muted mt-1">
            Enter the IDs of papers from your library to generate slides from
          </p>
        </div>
      )}

      {sourceType === "document" && (
        <div>
          <label className="text-sm font-medium text-ink block mb-2">
            Document ID
          </label>
          <input
            type="number"
            value={selectedDocumentId ?? ""}
            onChange={(e) =>
              onDocumentIdChange(e.target.value ? parseInt(e.target.value, 10) : null)
            }
            placeholder="Enter document ID"
            className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
          <p className="text-[10px] text-ink-muted mt-1">
            Enter the ID of a synthesis document to generate slides from
          </p>
        </div>
      )}

      {sourceType === "text" && (
        <div>
          <label className="text-sm font-medium text-ink block mb-2">
            Content
          </label>
          <textarea
            value={rawText}
            onChange={(e) => onRawTextChange(e.target.value)}
            placeholder="Paste your research content, abstract, or notes here..."
            rows={8}
            className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30 resize-none"
          />
          <p className="text-[10px] text-ink-muted mt-1">
            {rawText.length} characters
          </p>
        </div>
      )}
    </div>
  );
}
