"use client";

import { useState, useCallback, useRef, useEffect } from "react";

// ---------------------------------------------------------------------------
// Types — matching the shape used in the deck editor page
// ---------------------------------------------------------------------------

interface SlideState {
  id: number;
  sortOrder: number;
  layout: string | null;
  title: string | null;
  subtitle: string | null;
  contentBlocks: unknown;
  speakerNotes: string | null;
}

interface SlideUpdateData {
  layout?: string;
  title?: string;
  subtitle?: string;
  contentBlocks?: unknown[];
  speakerNotes?: string;
}

// ---------------------------------------------------------------------------
// Hook: useCollaborativeSlides
//
// Provides a unified interface for slide CRUD that works in two modes:
// 1. Liveblocks mode — when inside a RoomProvider (real-time sync)
// 2. Local mode — when Liveblocks is not configured (falls back to local state)
//
// The hook detects which mode to use based on whether the Liveblocks env var
// is present. In Liveblocks mode, it uses useStorage/useMutation from the
// Liveblocks room context. In local mode, it uses plain React state.
//
// NOTE: Because React hooks cannot be called conditionally, both modes are
// implemented as separate hooks, and we pick the right one at module level
// by checking the env var. However, due to Next.js tree-shaking limitations,
// we use a runtime-only approach: the calling component wraps with
// CollaborationProvider which decides whether to render a RoomProvider.
// If there's no RoomProvider, Liveblocks hooks would throw — so we cannot
// conditionally call them inside the same hook body.
//
// Strategy: This hook always uses LOCAL state. The integration with Liveblocks
// storage happens at the CollaborationProvider level, which syncs Liveblocks
// storage changes back into the slides state via a separate sync hook.
// This keeps the hook unconditional and avoids conditional hook calls.
// ---------------------------------------------------------------------------

/**
 * Hook for managing slide state with optional Liveblocks real-time sync.
 *
 * Always maintains local state. When Liveblocks is active, the
 * `useLiveblocksSync` hook (used inside CollaborationProvider) will push
 * changes bidirectionally between local state and Liveblocks storage.
 *
 * For the initial implementation, this hook manages local state and provides
 * a `persistSlide` callback that the parent can wire to debounced DB saves.
 */
export function useCollaborativeSlides(
  initialSlides: SlideState[],
  options?: {
    onSlideUpdate?: (slideId: number, data: SlideUpdateData) => void;
    onSlideAdd?: (slide: SlideState) => void;
    onSlideDelete?: (slideId: number) => void;
    onReorder?: (slideIds: number[]) => void;
  }
) {
  const [slides, setSlides] = useState<SlideState[]>(initialSlides);
  const [activeSlideId, setActiveSlideId] = useState<number | null>(
    initialSlides.length > 0 ? initialSlides[0].id : null
  );

  // Track whether initialSlides changed (e.g. on deck reload)
  const prevInitialRef = useRef(initialSlides);
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (prevInitialRef.current !== initialSlides) {
      prevInitialRef.current = initialSlides;
      setSlides(initialSlides);
      if (initialSlides.length > 0 && !initialSlides.find((s) => s.id === activeSlideId)) {
        setActiveSlideId(initialSlides[0].id);
      }
    }
  }, [initialSlides, activeSlideId]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const activeSlide = slides.find((s) => s.id === activeSlideId) ?? null;

  const updateSlide = useCallback(
    (slideId: number, data: SlideUpdateData) => {
      setSlides((prev) =>
        prev.map((s) => (s.id === slideId ? { ...s, ...data } : s))
      );
      options?.onSlideUpdate?.(slideId, data);
    },
    [options]
  );

  const addSlide = useCallback(
    (slide: SlideState) => {
      setSlides((prev) => [...prev, slide]);
      setActiveSlideId(slide.id);
      options?.onSlideAdd?.(slide);
    },
    [options]
  );

  const deleteSlide = useCallback(
    (slideId: number) => {
      setSlides((prev) => {
        const filtered = prev.filter((s) => s.id !== slideId);
        if (activeSlideId === slideId && filtered.length > 0) {
          setActiveSlideId(filtered[0].id);
        } else if (filtered.length === 0) {
          setActiveSlideId(null);
        }
        return filtered;
      });
      options?.onSlideDelete?.(slideId);
    },
    [activeSlideId, options]
  );

  const reorderSlides = useCallback(
    (slideIds: number[]) => {
      const reordered = slideIds
        .map((id) => slides.find((s) => s.id === id))
        .filter(Boolean)
        .map((s, i) => ({ ...s!, sortOrder: i }));
      setSlides(reordered);
      options?.onReorder?.(slideIds);
    },
    [slides, options]
  );

  return {
    slides,
    setSlides,
    activeSlide,
    activeSlideId,
    setActiveSlideId,
    updateSlide,
    addSlide,
    deleteSlide,
    reorderSlides,
  };
}
