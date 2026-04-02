"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { HomeScreen } from "@/components/library/HomeScreen";
import { moveLibrarySourceState } from "@/lib/library/service";
import type { LibraryHomeData } from "@/lib/library/home";
import type { WorkflowState } from "@/lib/library";

export function LibraryHomeClient({ data }: { data: LibraryHomeData }) {
  const router = useRouter();

  const handleMoveState = useCallback(
    async (libraryId: string, newState: WorkflowState) => {
      await moveLibrarySourceState(libraryId, newState);
      router.refresh();
    },
    [router]
  );

  return <HomeScreen data={data} onMoveState={handleMoveState} />;
}
