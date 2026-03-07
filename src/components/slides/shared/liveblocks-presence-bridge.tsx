"use client";

import { useEffect, useRef } from "react";
import { useUpdateMyPresence } from "@/lib/liveblocks/config";
import { useSlidesStore } from "@/stores/slides-store";
import { formatEditingBlockId } from "@/hooks/use-slides-presence";

// ---------------------------------------------------------------------------
// LiveblocksPresenceBridge — invisible component that syncs Zustand store
// state to Liveblocks presence. Must be rendered inside a RoomProvider.
//
// Broadcasts:
//   - activeSlideId  → presence.activeSlideId
//   - editingBlockId → presence.editingBlockId
// ---------------------------------------------------------------------------

export function LiveblocksPresenceBridge() {
  const updateMyPresence = useUpdateMyPresence();
  const prevRef = useRef({
    activeSlideId: null as number | null,
    editingBlockId: null as string | null,
  });

  useEffect(() => {
    // Push initial state
    const state = useSlidesStore.getState();
    const initialBlockId = formatEditingBlockId(
      state.activeSlideId,
      state.editingBlockIndex
    );
    updateMyPresence({
      activeSlideId: state.activeSlideId,
      editingBlockId: initialBlockId,
    });
    prevRef.current = {
      activeSlideId: state.activeSlideId,
      editingBlockId: initialBlockId,
    };

    // Subscribe to store changes
    const unsubscribe = useSlidesStore.subscribe((state) => {
      const prev = prevRef.current;
      const patches: Record<string, unknown> = {};

      if (state.activeSlideId !== prev.activeSlideId) {
        patches.activeSlideId = state.activeSlideId;
      }

      const editingBlockId = formatEditingBlockId(
        state.activeSlideId,
        state.editingBlockIndex
      );
      if (editingBlockId !== prev.editingBlockId) {
        patches.editingBlockId = editingBlockId;
      }

      if (Object.keys(patches).length > 0) {
        updateMyPresence(patches);
        prevRef.current = {
          activeSlideId: state.activeSlideId,
          editingBlockId,
        };
      }
    });

    return unsubscribe;
  }, [updateMyPresence]);

  return null;
}
