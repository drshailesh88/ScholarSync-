"use client";

import { useState } from "react";
import { MagnifyingGlass, Trash, Plus, BookOpen, Table } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { ResultRow } from "./ResultRow";
import type { PaperResult } from "@/lib/research/types";

interface LibraryTabProps {
  papers: PaperResult[];
  selectedPaperIds: string[];
  onTogglePaperSelection: (paperId: string) => void;
  onViewDetail: (paperId: string) => void;
  onInsertCitation: (paper: PaperResult) => void;
  onRemoveFromLibrary: (paperId: string) => void;
  onBuildEvidenceTable: () => void;
}

export function LibraryTab({
  papers,
  selectedPaperIds,
  onTogglePaperSelection,
  onViewDetail,
  onInsertCitation,
  onRemoveFromLibrary,
  onBuildEvidenceTable,
}: LibraryTabProps) {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "title" | "year">("recent");

  const filtered = papers.filter((p) => {
    if (!filter) return true;
    const q = filter.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.authors?.some((a) => a.toLowerCase().includes(q)) ||
      p.journal?.toLowerCase().includes(q)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "year":
        return (b.year || 0) - (a.year || 0);
      case "recent":
      default:
        return 0; // Keep insertion order
    }
  });

  const selectedCount = selectedPaperIds.filter((id) =>
    papers.some((p) => p.id === id)
  ).length;

  return (
    <div className="flex flex-col h-full">
      {/* Search + sort bar */}
      <div className="px-3 py-2 border-b border-border-subtle space-y-2">
        <div className="relative">
          <MagnifyingGlass
            size={12}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted"
          />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter papers..."
            className="w-full pl-7 pr-3 py-1.5 rounded-md bg-surface-raised border border-border text-xs text-ink placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-brand/40"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {(["recent", "title", "year"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={cn(
                  "px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors capitalize",
                  sortBy === s
                    ? "bg-brand/10 text-brand"
                    : "text-ink-muted hover:text-ink"
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-ink-muted">
            {papers.length} paper{papers.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Selected papers actions */}
      {selectedCount > 0 && (
        <div className="px-3 py-1.5 bg-brand/5 border-b border-brand/10 flex items-center justify-between">
          <span className="text-[10px] text-brand font-medium">
            {selectedCount} selected
          </span>
          <button
            onClick={onBuildEvidenceTable}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-brand text-white text-[10px] font-medium hover:bg-brand-hover transition-colors"
          >
            <Table size={10} />
            Build Evidence Table
          </button>
        </div>
      )}

      {/* Papers list */}
      <div className="flex-1 overflow-y-auto">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <BookOpen size={24} className="text-ink-muted/30 mb-2" />
            <p className="text-xs text-ink-muted text-center">
              {papers.length === 0
                ? "No papers in your library yet. Add papers from search results."
                : "No papers match your filter."}
            </p>
          </div>
        ) : (
          sorted.map((paper) => (
            <ResultRow
              key={paper.id}
              paper={paper}
              isSelected={selectedPaperIds.includes(paper.id)}
              onToggleSelect={() => onTogglePaperSelection(paper.id)}
              onViewDetail={() => onViewDetail(paper.id)}
              onInsertCitation={() => onInsertCitation(paper)}
              onAddToLibrary={() => onRemoveFromLibrary(paper.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
