"use client";

import { useState, useCallback } from "react";
import type { LibrarySource, WorkflowState, LibrarySourceFilters } from "@/lib/library";
import { LibrarySourceCard } from "./LibrarySourceCard";
import { BulkSelectionToolbar } from "./BulkSelectionToolbar";
import { UndoToast } from "./UndoToast";

const PAGE_SIZE = 25;

interface SourceListProps {
  initialSources: LibrarySource[];
  totalCount: number;
  filters: LibrarySourceFilters;
  onMoveState: (libraryId: string, newState: WorkflowState) => void;
  onDelete?: (libraryId: string) => Promise<void>;
  onRestoreDeleted?: (libraryId: string) => Promise<void>;
  onLoadMore: (filters: LibrarySourceFilters) => Promise<LibrarySource[]>;
  showStateBadge?: boolean;
  citedIds?: Set<string>;
}

export function SourceList({
  initialSources,
  totalCount,
  filters,
  onMoveState,
  onDelete,
  onRestoreDeleted,
  onLoadMore,
  showStateBadge = false,
  citedIds,
}: SourceListProps) {
  const [sources, setSources] = useState(initialSources);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deletedUndo, setDeletedUndo] = useState<{ libraryId: string; title: string } | null>(null);

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
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(libraryId);
        return next;
      });
      onMoveState(libraryId, newState);
    },
    [onMoveState]
  );

  const handleToggleSelect = useCallback((libraryId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(libraryId)) {
        next.delete(libraryId);
      } else {
        next.add(libraryId);
      }
      return next;
    });
  }, []);

  const handleDelete = useCallback(
    (libraryId: string) => {
      if (!onDelete) return;
      const source = sources.find((s) => s.libraryId === libraryId);
      setSources((prev) => prev.filter((s) => s.libraryId !== libraryId));
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(libraryId);
        return next;
      });
      setDeletedUndo(source ? { libraryId, title: source.title } : null);
      onDelete(libraryId);
    },
    [onDelete, sources]
  );

  const handleUndoDelete = useCallback(async () => {
    if (!deletedUndo || !onRestoreDeleted) return;
    await onRestoreDeleted(deletedUndo.libraryId);
    setDeletedUndo(null);
  }, [deletedUndo, onRestoreDeleted]);

  const handleClearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  if (sources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-sm text-ink-muted">No sources in this view.</p>
      </div>
    );
  }

  return (
    <div>
      <BulkSelectionToolbar
        selectedIds={Array.from(selectedIds)}
        onClearSelection={handleClearSelection}
      />
      <div className="space-y-2">
        {sources.map((source) => (
          <LibrarySourceCard
            key={source.libraryId}
            source={source}
            onMoveState={handleMoveState}
            onDelete={onDelete ? handleDelete : undefined}
            showStateBadge={showStateBadge}
            selected={selectedIds.has(source.libraryId)}
            onToggleSelect={handleToggleSelect}
            isCited={citedIds?.has(source.libraryId)}
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

      {deletedUndo && (
        <UndoToast
          message={`"${deletedUndo.title}" moved to Trash`}
          onUndo={handleUndoDelete}
          onDismiss={() => setDeletedUndo(null)}
        />
      )}
    </div>
  );
}
