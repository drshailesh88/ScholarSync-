"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowCounterClockwise,
  TrashSimple,
  Warning,
} from "@phosphor-icons/react";
import type { LibrarySource } from "@/lib/library";
import {
  restoreLibrarySource,
  permanentlyDeleteLibrarySource,
} from "@/lib/library/service";
import { UndoToast } from "@/components/library/UndoToast";

interface TrashViewClientProps {
  initialSources: LibrarySource[];
  deletedAtMap: Record<string, string>;
  trashCount: number;
}

function daysUntilExpiry(deletedAt: string): number {
  const deleted = new Date(deletedAt);
  const expiresAt = new Date(deleted.getTime() + 30 * 24 * 60 * 60 * 1000);
  const now = new Date();
  return Math.max(0, Math.ceil((expiresAt.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)));
}

function timeAgo(deletedAt: string): string {
  const ms = Date.now() - new Date(deletedAt).getTime();
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  if (days === 0) return "today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export function TrashViewClient({
  initialSources,
  deletedAtMap,
  trashCount: _trashCount,
}: TrashViewClientProps) {
  const router = useRouter();
  const [sources, setSources] = useState(initialSources);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [undoState, setUndoState] = useState<{
    libraryId: string;
    title: string;
  } | null>(null);

  const handleRestore = useCallback(
    async (libraryId: string) => {
      const source = sources.find((s) => s.libraryId === libraryId);
      setSources((prev) => prev.filter((s) => s.libraryId !== libraryId));
      await restoreLibrarySource(libraryId);
      if (source) {
        setUndoState({ libraryId, title: source.title });
      }
      router.refresh();
    },
    [sources, router]
  );

  const handleUndoRestore = useCallback(async () => {
    if (!undoState) return;
    // Re-delete the source (undo the restore)
    const { softDeleteLibrarySource } = await import("@/lib/library/service");
    await softDeleteLibrarySource(undoState.libraryId);
    setUndoState(null);
    router.refresh();
  }, [undoState, router]);

  const handlePermanentDelete = useCallback(
    async (libraryId: string) => {
      setSources((prev) => prev.filter((s) => s.libraryId !== libraryId));
      setConfirmDeleteId(null);
      await permanentlyDeleteLibrarySource(libraryId);
      router.refresh();
    },
    [router]
  );

  if (sources.length === 0) {
    return (
      <div className="max-w-3xl">
        <h1 className="text-xl font-semibold text-ink mb-6">Trash</h1>
        <div className="flex flex-col items-center justify-center py-16">
          <TrashSimple size={40} className="text-ink-muted/40 mb-3" />
          <p className="text-sm text-ink-muted">Trash is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-ink">Trash</h1>
        <p className="text-[13px] text-ink-muted">
          Items are permanently deleted after 30 days
        </p>
      </div>

      <div className="space-y-2">
        {sources.map((source) => {
          const deletedAt = deletedAtMap[source.libraryId];
          const daysLeft = deletedAt ? daysUntilExpiry(deletedAt) : 30;
          const isConfirming = confirmDeleteId === source.libraryId;

          return (
            <div
              key={source.libraryId}
              className="flex items-center gap-3 rounded-xl border border-[var(--border)] px-4 py-3 transition-colors hover:bg-[var(--surface-raised)]"
            >
              {/* Source info */}
              <div className="min-w-0 flex-1">
                <Link
                  href={`/library/item/${source.libraryId}`}
                  className="block truncate text-[14px] font-medium text-ink hover:text-[var(--library-accent)]"
                >
                  {source.title}
                </Link>
                <div className="mt-0.5 flex items-center gap-2 text-[12px] text-ink-muted">
                  <span>{source.sourceType === "paper" ? source.journal ?? "Paper" : source.domain ?? "Web"}</span>
                  {deletedAt && (
                    <>
                      <span>&middot;</span>
                      <span>Deleted {timeAgo(deletedAt)}</span>
                      <span>&middot;</span>
                      <span className={daysLeft <= 7 ? "text-red-500 font-medium" : ""}>
                        {daysLeft} {daysLeft === 1 ? "day" : "days"} left
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleRestore(source.libraryId)}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] text-ink-muted hover:bg-[var(--surface-raised)] hover:text-ink transition-colors"
                  title="Restore"
                  type="button"
                >
                  <ArrowCounterClockwise size={14} />
                  Restore
                </button>

                {isConfirming ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handlePermanentDelete(source.libraryId)}
                      className="inline-flex items-center gap-1 rounded-lg bg-red-500 px-2.5 py-1.5 text-[13px] font-medium text-white hover:bg-red-600 transition-colors"
                      type="button"
                    >
                      <Warning size={14} weight="fill" />
                      Confirm
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="rounded-lg px-2 py-1.5 text-[13px] text-ink-muted hover:text-ink transition-colors"
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDeleteId(source.libraryId)}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] text-red-500/70 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 transition-colors"
                    title="Delete permanently"
                    type="button"
                  >
                    <TrashSimple size={14} />
                    Delete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {undoState && (
        <UndoToast
          message={`"${undoState.title}" restored to Inbox`}
          onUndo={handleUndoRestore}
          onDismiss={() => setUndoState(null)}
        />
      )}
    </div>
  );
}
