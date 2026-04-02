"use client";

import { useState, useCallback } from "react";
import { LibrarySidebar, type LibraryCounts } from "./LibrarySidebar";
import { UndoToast } from "./UndoToast";
import { moveLibrarySourceState } from "@/lib/library/service";
import type { WorkflowState } from "@/lib/library";

interface UndoEntry {
  libraryId: string;
  previousState: WorkflowState;
  newState: WorkflowState;
  message: string;
}

export function LibraryShell({
  counts,
  children,
}: {
  counts: LibraryCounts;
  children: React.ReactNode;
}) {
  const [undoEntry, setUndoEntry] = useState<UndoEntry | null>(null);
  const [liveCounts, setLiveCounts] = useState(counts);

  const handleMoveState = useCallback(
    async (libraryId: string, newState: WorkflowState, previousState?: WorkflowState) => {
      const prev = previousState ?? "inbox";

      // Optimistic count update
      setLiveCounts((c) => ({
        ...c,
        [prev]: Math.max(0, c[prev as keyof LibraryCounts] as number - 1),
        [newState]: (c[newState as keyof LibraryCounts] as number) + 1,
      }));

      setUndoEntry({
        libraryId,
        previousState: prev,
        newState,
        message: `Moved to ${newState}`,
      });

      try {
        await moveLibrarySourceState(libraryId, newState);
      } catch {
        // Revert counts on error
        setLiveCounts((c) => ({
          ...c,
          [prev]: (c[prev as keyof LibraryCounts] as number) + 1,
          [newState]: Math.max(0, c[newState as keyof LibraryCounts] as number - 1),
        }));
        setUndoEntry(null);
      }
    },
    []
  );

  const handleUndo = useCallback(async () => {
    if (!undoEntry) return;
    const { libraryId, previousState, newState } = undoEntry;
    setUndoEntry(null);

    // Revert counts
    setLiveCounts((c) => ({
      ...c,
      [newState]: Math.max(0, c[newState as keyof LibraryCounts] as number - 1),
      [previousState]: (c[previousState as keyof LibraryCounts] as number) + 1,
    }));

    await moveLibrarySourceState(libraryId, previousState);
  }, [undoEntry]);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <LibrarySidebar counts={liveCounts} />
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {children}
      </div>

      {undoEntry && (
        <UndoToast
          message={undoEntry.message}
          onUndo={handleUndo}
          onDismiss={() => setUndoEntry(null)}
        />
      )}
    </div>
  );
}
