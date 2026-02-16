"use client";

import { useCallback } from "react";
import { usePDFStore } from "@/stores/pdf-store";
import type { CitationSourceQuote, PaperMetadata } from "@/lib/pdf/types";

/**
 * Hook for bidirectional navigation between editor citations and PDF viewer.
 */
export function useCitationNavigation() {
  const store = usePDFStore();

  /**
   * Navigate from an editor citation to the source in the PDF.
   * Opens the PDF if not already open, then navigates to the page.
   */
  const navigateToPDFSource = useCallback(
    (
      paperId: string,
      pdfUrl: string,
      sourceQuote?: CitationSourceQuote,
      metadata?: PaperMetadata
    ) => {
      // Open the PDF if it's not the currently open one
      if (store.currentPaperId !== paperId) {
        store.openPDF(paperId, pdfUrl, metadata);
      }

      // Navigate to the specific page if we have source quote data
      if (sourceQuote?.pageNumber) {
        store.navigateTo({
          pageNumber: sourceQuote.pageNumber,
          highlightSpan:
            sourceQuote.startOffset != null &&
            sourceQuote.endOffset != null
              ? {
                  startOffset: sourceQuote.startOffset,
                  endOffset: sourceQuote.endOffset,
                }
              : undefined,
        });
      }
    },
    [store]
  );

  /**
   * Get the number of times a paper is cited in the current document.
   * (This will integrate with the Tiptap editor's citation nodes.)
   */
  const getCitationCount = useCallback(
    (_paperId: string): number => {
      // Placeholder — will be integrated with Tiptap editor
      return 0;
    },
    []
  );

  return {
    navigateToPDFSource,
    getCitationCount,
    isViewerOpen: store.isOpen,
    currentPaperId: store.currentPaperId,
  };
}
