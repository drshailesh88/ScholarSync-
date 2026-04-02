"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { PencilLine, X, Spinner } from "@phosphor-icons/react";
import { createEditorHandoffFromIds } from "@/lib/library/editor-handoff";

interface BulkSelectionToolbarProps {
  selectedIds: string[];
  onClearSelection: () => void;
}

export function BulkSelectionToolbar({
  selectedIds,
  onClearSelection,
}: BulkSelectionToolbarProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (selectedIds.length === 0) return null;

  function handleSendToEditor() {
    setError(null);
    startTransition(async () => {
      try {
        const { handoffId } = await createEditorHandoffFromIds(selectedIds);
        router.push(`/editor/new?handoff=${handoffId}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create handoff");
      }
    });
  }

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between gap-3 rounded-lg border border-[var(--library-accent)] bg-[var(--library-accent-tint)] px-4 py-2.5 mb-3">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-[var(--ink)]">
          {selectedIds.length} selected
        </span>
        <button
          onClick={onClearSelection}
          className="flex items-center gap-1 text-xs text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
        >
          <X size={12} />
          Clear
        </button>
      </div>
      <div className="flex items-center gap-2">
        {error && <span className="text-xs text-red-500">{error}</span>}
        <button
          onClick={handleSendToEditor}
          disabled={isPending}
          className="flex items-center gap-1.5 rounded-md bg-[var(--brand)] px-3 py-1.5 text-xs font-medium text-white hover:bg-[var(--brand)]/90 transition-colors disabled:opacity-50"
        >
          {isPending ? (
            <Spinner size={13} className="animate-spin" />
          ) : (
            <PencilLine size={13} />
          )}
          Send to Editor
        </button>
      </div>
    </div>
  );
}
