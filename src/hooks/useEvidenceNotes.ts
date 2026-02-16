"use client";

import { useState, useCallback } from "react";
import type {
  EvidenceNote,
  PDFTextSelection,
  TargetSection,
  HighlightColor,
} from "@/lib/pdf/types";

/**
 * Hook for managing evidence notes created from PDF reading.
 */
export function useEvidenceNotes(projectId: string) {
  const [notes, setNotes] = useState<EvidenceNote[]>([]);
  const [loading, setLoading] = useState(false);

  /** Load evidence notes for a project */
  const loadNotes = useCallback(
    async (paperId?: string) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ projectId });
        if (paperId) params.set("paperId", paperId);

        const res = await fetch(
          `/api/research/evidence-notes?${params.toString()}`
        );
        if (res.ok) {
          const data = await res.json();
          setNotes(data.notes || []);
        }
      } catch {
        console.error("Failed to load evidence notes");
      } finally {
        setLoading(false);
      }
    },
    [projectId]
  );

  /** Create a new evidence note from a PDF selection */
  const createNote = useCallback(
    async (
      paperId: string,
      selection: PDFTextSelection,
      targetSection: TargetSection,
      userNote: string,
      color: HighlightColor = "yellow"
    ): Promise<EvidenceNote | null> => {
      const note: EvidenceNote = {
        id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        projectId,
        paperId,
        pageNumber: selection.pageNumber,
        startOffset: selection.startOffset,
        endOffset: selection.endOffset,
        quotedText: selection.text,
        userNote,
        targetSection,
        color,
        createdAt: new Date(),
      };

      setNotes((prev) => [...prev, note]);

      try {
        await fetch("/api/research/evidence-notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(note),
        });
        return note;
      } catch {
        console.error("Failed to save evidence note");
        return note; // Still return the locally created note
      }
    },
    [projectId]
  );

  /** Delete an evidence note */
  const deleteNote = useCallback(async (noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));

    try {
      await fetch(`/api/research/evidence-notes?id=${noteId}`, {
        method: "DELETE",
      });
    } catch {
      console.error("Failed to delete evidence note");
    }
  }, []);

  /** Filter notes by target section */
  const getNotesBySection = useCallback(
    (section: TargetSection) => {
      return notes.filter((n) => n.targetSection === section);
    },
    [notes]
  );

  return {
    notes,
    loading,
    loadNotes,
    createNote,
    deleteNote,
    getNotesBySection,
  };
}
