"use client";

import { ArrowsDownUp } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { ResultRow } from "./ResultRow";
import type { PaperResult } from "@/lib/research/types";

interface ResultsTableProps {
  results: PaperResult[];
  totalResults: number;
  isSearching: boolean;
  selectedPaperIds: string[];
  onTogglePaperSelection: (paperId: string) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onViewDetail: (paperId: string) => void;
  onInsertCitation: (paper: PaperResult) => void;
  onAddToLibrary: (paper: PaperResult) => void;
  onLoadMore: () => void;
  hasMore: boolean;
}

export function ResultsTable({
  results,
  totalResults,
  isSearching,
  selectedPaperIds,
  onTogglePaperSelection,
  onSelectAll,
  onClearSelection,
  onViewDetail,
  onInsertCitation,
  onAddToLibrary,
  onLoadMore,
  hasMore,
}: ResultsTableProps) {
  if (results.length === 0 && !isSearching) {
    return null;
  }

  const allSelected =
    results.length > 0 && results.every((r) => selectedPaperIds.includes(r.id));

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border-subtle bg-surface-raised/30">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={() => (allSelected ? onClearSelection() : onSelectAll())}
            className="rounded border-border"
          />
          <span className="text-[10px] text-ink-muted">
            {totalResults > 0
              ? `Showing ${results.length} of ${totalResults} results`
              : "No results"}
          </span>
        </div>
        {selectedPaperIds.length > 0 && (
          <span className="text-[10px] text-brand font-medium">
            {selectedPaperIds.length} selected
          </span>
        )}
      </div>

      {/* Skeleton loader */}
      {isSearching && results.length === 0 && (
        <div className="px-3 py-2 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse space-y-1.5">
              <div className="h-3 bg-surface-raised rounded w-full" />
              <div className="h-2.5 bg-surface-raised rounded w-3/4" />
              <div className="flex gap-2">
                <div className="h-2 bg-surface-raised rounded w-8" />
                <div className="h-2 bg-surface-raised rounded w-10" />
                <div className="h-2 bg-surface-raised rounded w-12" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results list */}
      <div className="flex-1 overflow-y-auto">
        {results.map((paper) => (
          <ResultRow
            key={paper.id}
            paper={paper}
            isSelected={selectedPaperIds.includes(paper.id)}
            onToggleSelect={() => onTogglePaperSelection(paper.id)}
            onViewDetail={() => onViewDetail(paper.id)}
            onInsertCitation={() => onInsertCitation(paper)}
            onAddToLibrary={() => onAddToLibrary(paper)}
          />
        ))}

        {/* Load more */}
        {hasMore && !isSearching && (
          <button
            onClick={onLoadMore}
            className="w-full py-2 text-xs text-brand hover:text-brand-hover font-medium transition-colors"
          >
            Load more results...
          </button>
        )}

        {isSearching && results.length > 0 && (
          <div className="py-2 text-center text-xs text-ink-muted animate-pulse">
            Loading more...
          </div>
        )}
      </div>
    </div>
  );
}
