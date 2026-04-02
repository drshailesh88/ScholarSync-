"use client";

import { useState, useCallback } from "react";
import type { LibrarySource, WorkflowState, LibrarySourceFilters } from "@/lib/library";
import { LibrarySourceCard } from "./LibrarySourceCard";

const PAGE_SIZE = 25;

interface SourceListProps {
  initialSources: LibrarySource[];
  totalCount: number;
  filters: LibrarySourceFilters;
  onMoveState: (libraryId: string, newState: WorkflowState) => void;
  onLoadMore: (filters: LibrarySourceFilters) => Promise<LibrarySource[]>;
  showStateBadge?: boolean;
}

export function SourceList({
  initialSources,
  totalCount,
  filters,
  onMoveState,
  onLoadMore,
  showStateBadge = false,
}: SourceListProps) {
  const [sources, setSources] = useState(initialSources);
  const [loading, setLoading] = useState(false);

  const remaining = totalCount - sources.length;
  const hasMore = remaining > 0;

  const handleLoadMore = useCallback(async () => {
    setLoading(true);
    try {
      const more = await onLoadMore({
        ...filters,
        offset: sources.length,
        limit: PAGE_SIZE,
      });
      setSources((prev) => [...prev, ...more]);
    } finally {
      setLoading(false);
    }
  }, [sources.length, filters, onLoadMore]);

  // Remove a card optimistically when moved to a different state
  const handleMoveState = useCallback(
    (libraryId: string, newState: WorkflowState) => {
      setSources((prev) => prev.filter((s) => s.libraryId !== libraryId));
      onMoveState(libraryId, newState);
    },
    [onMoveState]
  );

  if (sources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-sm text-ink-muted">No sources in this view.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-2">
        {sources.map((source) => (
          <LibrarySourceCard
            key={source.libraryId}
            source={source}
            onMoveState={handleMoveState}
            showStateBadge={showStateBadge}
          />
        ))}
      </div>

      {hasMore && (
        <div className="mt-4 flex items-center justify-center">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-4 py-2 text-sm text-[var(--library-accent)] hover:bg-[var(--library-accent-tint)] rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Loading..." : `Show ${Math.min(PAGE_SIZE, remaining)} more (${remaining} remaining)`}
          </button>
        </div>
      )}
    </div>
  );
}
