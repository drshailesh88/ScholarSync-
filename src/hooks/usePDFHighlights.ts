"use client";

import { useCallback } from "react";
import { usePDFStore } from "@/stores/pdf-store";
import type {
  PDFHighlight,
  HighlightColor,
  TargetSection,
} from "@/lib/pdf/types";

/**
 * Hook for managing PDF highlights (CRUD + persistence).
 */
export function usePDFHighlights() {
  const store = usePDFStore();

  /** Load highlights from the server for a given paper */
  const loadHighlights = useCallback(
    async (paperId: string, projectId: string) => {
      try {
        const res = await fetch(
          `/api/research/highlights?paperId=${paperId}&projectId=${projectId}`
        );
        if (res.ok) {
          const data = await res.json();
          store.setHighlights(data.highlights || []);
        }
      } catch {
        console.error("Failed to load highlights");
      }
    },
    [store]
  );

  /** Save a highlight to the server */
  const saveHighlight = useCallback(
    async (highlight: PDFHighlight) => {
      store.addHighlight(highlight);

      try {
        await fetch("/api/research/highlights", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(highlight),
        });
      } catch {
        console.error("Failed to persist highlight");
      }
    },
    [store]
  );

  /** Update a highlight */
  const updateHighlight = useCallback(
    async (
      id: string,
      updates: {
        note?: string;
        color?: HighlightColor;
        targetSection?: TargetSection;
      }
    ) => {
      store.updateHighlight(id, updates);

      try {
        await fetch("/api/research/highlights", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, ...updates }),
        });
      } catch {
        console.error("Failed to update highlight");
      }
    },
    [store]
  );

  /** Delete a highlight */
  const deleteHighlight = useCallback(
    async (id: string) => {
      store.removeHighlight(id);

      try {
        await fetch(`/api/research/highlights?id=${id}`, {
          method: "DELETE",
        });
      } catch {
        console.error("Failed to delete highlight");
      }
    },
    [store]
  );

  return {
    highlights: store.highlights,
    activeColor: store.activeHighlightColor,
    setActiveColor: store.setActiveHighlightColor,
    loadHighlights,
    saveHighlight,
    updateHighlight,
    deleteHighlight,
  };
}
