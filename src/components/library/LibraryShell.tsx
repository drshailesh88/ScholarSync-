"use client";

import { useState, useCallback } from "react";
import { List } from "@phosphor-icons/react";
import { LibrarySidebar, type LibraryCounts } from "./LibrarySidebar";
import { ProjectSwitcher } from "./ProjectSwitcher";
import { AddSourceButton, AddSourceDialog } from "./AddSourceDialog";
import { UndoToast } from "./UndoToast";
import { moveLibrarySourceState } from "@/lib/library/service";
import type { WorkflowState } from "@/lib/library";
import type { LibraryProject } from "@/lib/library/project-context";

interface UndoEntry {
  libraryId: string;
  previousState: WorkflowState;
  newState: WorkflowState;
  message: string;
}

export function LibraryShell({
  counts,
  projects,
  activeProjectId,
  children,
}: {
  counts: LibraryCounts;
  projects: LibraryProject[];
  activeProjectId: number | null;
  children: React.ReactNode;
}) {
  const [undoEntry, setUndoEntry] = useState<UndoEntry | null>(null);
  const [liveCounts, setLiveCounts] = useState(counts);
  const [addSourceOpen, setAddSourceOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- passed to children via page-level props
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
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <LibrarySidebar counts={liveCounts} activeProjectId={activeProjectId} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-40 md:hidden">
            <LibrarySidebar counts={liveCounts} activeProjectId={activeProjectId} />
          </div>
        </>
      )}

      <div className="flex-1 overflow-y-auto min-w-0">
        {/* Library header with project switcher */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-1.5 rounded-md hover:bg-[var(--surface-raised)] text-ink-muted"
            >
              <List size={20} />
            </button>
            <ProjectSwitcher
              projects={projects}
              activeProjectId={activeProjectId}
            />
          </div>
          <AddSourceButton onClick={() => setAddSourceOpen(true)} />
        </div>

        <AddSourceDialog
          open={addSourceOpen}
          onClose={() => setAddSourceOpen(false)}
          activeProjectId={activeProjectId}
        />

        <div className="px-4 md:px-6 py-4">
          {children}
        </div>
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
