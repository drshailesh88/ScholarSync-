"use client";

import { useState, useCallback, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  X,
  CaretLeft,
  CaretRight,
  MagnifyingGlassPlus,
  MagnifyingGlassMinus,
  ArrowsOutSimple,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PDFViewerProps {
  url?: string;
  file?: File;
  onClose?: () => void;
  className?: string;
}

export function PDFViewer({ url, file, onClose, className }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pdfFile = useMemo(() => {
    if (file) return file;
    if (url) return url;
    return null;
  }, [file, url]);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages: total }: { numPages: number }) => {
      setNumPages(total);
      setPageNumber(1);
      setLoading(false);
      setError(null);
    },
    []
  );

  const onDocumentLoadError = useCallback((err: Error) => {
    setError(err.message || "Failed to load PDF");
    setLoading(false);
  }, []);

  const goToPrevPage = useCallback(() => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  }, [numPages]);

  const zoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.25, 3.0));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  }, []);

  const fitWidth = useCallback(() => {
    setScale(1.0);
  }, []);

  if (!pdfFile) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-sm",
        className
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface border-b border-border">
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <CaretLeft size={18} />
          </button>
          <span className="text-sm text-ink tabular-nums min-w-[5rem] text-center">
            {loading ? "..." : `${pageNumber} / ${numPages}`}
          </span>
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <CaretRight size={18} />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Zoom out"
          >
            <MagnifyingGlassMinus size={18} />
          </button>
          <span className="text-xs text-ink-muted tabular-nums min-w-[3rem] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            disabled={scale >= 3.0}
            className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Zoom in"
          >
            <MagnifyingGlassPlus size={18} />
          </button>
          <button
            onClick={fitWidth}
            className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
            aria-label="Fit width"
          >
            <ArrowsOutSimple size={18} />
          </button>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
            aria-label="Close PDF viewer"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto flex justify-center py-6 bg-surface/50">
        {error ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <X size={24} className="text-red-500" />
            </div>
            <p className="text-sm text-ink-muted">Failed to load PDF</p>
            <p className="text-xs text-ink-muted max-w-sm text-center">
              {error}
            </p>
          </div>
        ) : (
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex flex-col items-center justify-center gap-3 py-20">
                <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-ink-muted">Loading PDF...</p>
              </div>
            }
            error={
              <div className="flex flex-col items-center justify-center gap-3 py-20">
                <p className="text-sm text-ink-muted">
                  Failed to load PDF document.
                </p>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              className="shadow-xl rounded-lg"
              loading={
                <div className="flex items-center justify-center py-20">
                  <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                </div>
              }
            />
          </Document>
        )}
      </div>
    </div>
  );
}
