"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  Annotation,
  AnnotationColor,
  AnchorType,
  AnchorPayload,
} from "@/lib/library/annotations";

interface UseAnnotationsOptions {
  libraryId: string;
}

export function useAnnotations({ libraryId }: UseAnnotationsOptions) {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAnnotations = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/library/annotations?libraryId=${encodeURIComponent(libraryId)}`
      );
      if (res.ok) {
        const data = await res.json();
        setAnnotations(data);
      }
    } catch {
      // Silently fail — annotations are non-critical
    } finally {
      setLoading(false);
    }
  }, [libraryId]);

  useEffect(() => {
    fetchAnnotations();
  }, [fetchAnnotations]);

  const createHighlight = useCallback(
    async (input: {
      selectedText: string;
      anchorType: AnchorType;
      anchorPayload: AnchorPayload;
      color?: AnnotationColor;
      note?: string;
    }) => {
      const res = await fetch("/api/library/annotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "highlight", libraryId, ...input }),
      });
      if (res.ok) {
        const annotation = await res.json();
        setAnnotations((prev) => [annotation, ...prev]);
        return annotation as Annotation;
      }
      throw new Error("Failed to create highlight");
    },
    [libraryId]
  );

  const createNote = useCallback(
    async (note: string) => {
      const res = await fetch("/api/library/annotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "note", libraryId, note }),
      });
      if (res.ok) {
        const annotation = await res.json();
        setAnnotations((prev) => [annotation, ...prev]);
        return annotation as Annotation;
      }
      throw new Error("Failed to create note");
    },
    [libraryId]
  );

  const updateAnnotation = useCallback(
    async (input: { id: number; note?: string | null; color?: AnnotationColor }) => {
      const res = await fetch("/api/library/annotations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (res.ok) {
        const updated = await res.json();
        setAnnotations((prev) =>
          prev.map((a) => (a.id === updated.id ? updated : a))
        );
        return updated as Annotation;
      }
      throw new Error("Failed to update annotation");
    },
    []
  );

  const deleteAnnotation = useCallback(async (id: number) => {
    const res = await fetch(`/api/library/annotations?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setAnnotations((prev) => prev.filter((a) => a.id !== id));
    } else {
      throw new Error("Failed to delete annotation");
    }
  }, []);

  const highlights = annotations.filter((a) => a.selectedText != null);
  const notes = annotations.filter(
    (a) => a.selectedText == null && a.note != null
  );

  return {
    annotations,
    highlights,
    notes,
    loading,
    createHighlight,
    createNote,
    updateAnnotation,
    deleteAnnotation,
    refetch: fetchAnnotations,
  };
}
