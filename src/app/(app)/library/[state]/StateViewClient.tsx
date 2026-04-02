"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { SourceList } from "@/components/library/SourceList";
import { getLibrarySources } from "@/lib/library/service";
import { moveLibrarySourceState } from "@/lib/library/service";
import type { LibrarySource, LibrarySourceFilters, WorkflowState } from "@/lib/library";

interface StateViewClientProps {
  title: string;
  initialSources: LibrarySource[];
  totalCount: number;
  filters: LibrarySourceFilters;
  showStateBadge: boolean;
}

export function StateViewClient({
  title,
  initialSources,
  totalCount,
  filters,
  showStateBadge,
}: StateViewClientProps) {
  const router = useRouter();

  const handleMoveState = useCallback(
    async (libraryId: string, newState: WorkflowState) => {
      await moveLibrarySourceState(libraryId, newState);
      router.refresh();
    },
    [router]
  );

  const handleLoadMore = useCallback(
    async (loadFilters: LibrarySourceFilters): Promise<LibrarySource[]> => {
      return getLibrarySources(loadFilters);
    },
    []
  );

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold text-ink mb-6">{title}</h1>
      <SourceList
        initialSources={initialSources}
        totalCount={totalCount}
        filters={filters}
        onMoveState={handleMoveState}
        onLoadMore={handleLoadMore}
        showStateBadge={showStateBadge}
      />
    </div>
  );
}
