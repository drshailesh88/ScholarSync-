/**
 * Hook for managing paper detail panel and AI extraction.
 */

"use client";

import { useCallback } from "react";
import { useResearchStore } from "@/stores/research-store";
import type { ExtractionResult } from "@/lib/research/types";

export function usePaperDetail() {
  const {
    selectedPaperId,
    selectedPaperDetail,
    selectPaper,
    setSelectedPaperDetail,
    setExtraction,
    query,
  } = useResearchStore();

  /**
   * Open paper detail and trigger AI extraction.
   */
  const openPaperDetail = useCallback(
    async (paperId: string) => {
      selectPaper(paperId);

      // Get the updated detail from the store after selectPaper
      const state = useResearchStore.getState();
      const detail = state.selectedPaperDetail;
      if (!detail?.paper?.abstract) return;

      // Skip if already extracted
      if (detail.extraction) return;

      // Mark as extracting
      setSelectedPaperDetail({
        ...detail,
        isExtracting: true,
      });

      try {
        const res = await fetch("/api/research/extract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: "detail",
            title: detail.paper.title,
            abstractText: detail.paper.abstract,
            userQuery: query || detail.paper.title,
          }),
        });

        if (!res.ok) throw new Error("Extraction failed");

        const data = await res.json();
        if (data.extraction) {
          setExtraction(paperId, data.extraction as ExtractionResult);
        }
      } catch (error) {
        console.error("Extraction error:", error);
        setSelectedPaperDetail({
          ...detail,
          isExtracting: false,
        });
      }
    },
    [query, selectPaper, setSelectedPaperDetail, setExtraction]
  );

  /**
   * Close paper detail panel.
   */
  const closePaperDetail = useCallback(() => {
    selectPaper(null);
  }, [selectPaper]);

  return {
    selectedPaperId,
    selectedPaperDetail,
    openPaperDetail,
    closePaperDetail,
  };
}
