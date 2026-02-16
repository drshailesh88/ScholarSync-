"use client";

import { useCallback } from "react";
import { usePDFStore } from "@/stores/pdf-store";
import type { PaperMetadata } from "@/lib/pdf/types";

/**
 * Hook for controlling the PDF viewer.
 * Provides actions to open/close PDFs and manage viewer state.
 */
export function usePDFViewer() {
  const store = usePDFStore();

  const openPDF = useCallback(
    (paperId: string, pdfUrl: string, metadata?: PaperMetadata) => {
      store.openPDF(paperId, pdfUrl, metadata);
    },
    [store]
  );

  const closePDF = useCallback(() => {
    store.closePDF();
  }, [store]);

  const togglePDF = useCallback(() => {
    if (store.isOpen) {
      store.closePDF();
    }
  }, [store]);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= store.totalPages) {
        store.setPage(page);
      }
    },
    [store]
  );

  const zoomIn = useCallback(() => {
    store.setZoom(store.zoom + 0.25);
  }, [store]);

  const zoomOut = useCallback(() => {
    store.setZoom(store.zoom - 0.25);
  }, [store]);

  return {
    // State
    isOpen: store.isOpen,
    pdfUrl: store.pdfUrl,
    currentPage: store.currentPage,
    totalPages: store.totalPages,
    zoom: store.zoom,
    layout: store.layout,
    paperMetadata: store.paperMetadata,

    // Actions
    openPDF,
    closePDF,
    togglePDF,
    goToPage,
    zoomIn,
    zoomOut,
    setLayout: store.setLayout,
  };
}
