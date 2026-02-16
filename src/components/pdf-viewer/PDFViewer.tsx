"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { cn } from "@/lib/utils";
import { usePDFStore } from "@/stores/pdf-store";
import { capturePDFSelection } from "@/lib/pdf/selection-utils";
import type {
  PDFTextSelection,
  PDFHighlight,
  HighlightColor,
  TargetSection,
} from "@/lib/pdf/types";
import { PDFToolbar } from "./PDFToolbar";
import { PDFSelectionMenu } from "./PDFSelectionMenu";
import { PDFHighlightLayer } from "./PDFHighlightLayer";
import { PDFAnnotationPopover } from "./PDFAnnotationPopover";
import { PDFSearchBar } from "./PDFSearchBar";
import { EvidenceNotePopover } from "./EvidenceNotePopover";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PDFViewerComponentProps {
  className?: string;
}

export function PDFViewerComponent({ className }: PDFViewerComponentProps) {
  const {
    pdfUrl,
    paperMetadata,
    currentPage,
    totalPages,
    zoom,
    layout,
    highlights,
    activeHighlightColor,
    currentSelection,
    flashHighlight,
    navigationTarget,
    setPage,
    setTotalPages,
    setZoom,
    setLayout,
    setSelection,
    setSelectionMenuOpen,
    addHighlight,
    updateHighlight,
    removeHighlight,
    closePDF,
    navigateTo,
    clearNavigationTarget,
    setFlashHighlight,
  } = usePDFStore();

  const [highlightMode, setHighlightMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectionMenuPos, setSelectionMenuPos] = useState({ x: 0, y: 0 });
  const [activeAnnotation, setActiveAnnotation] = useState<PDFHighlight | null>(null);
  const [annotationPos, setAnnotationPos] = useState({ x: 0, y: 0 });
  const [showNotePopover, setShowNotePopover] = useState(false);
  const [notePopoverPos, setNotePopoverPos] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle document load
  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setTotalPages(numPages);
    },
    [setTotalPages]
  );

  // Handle text selection on mouseup
  const handleMouseUp = useCallback(() => {
    // Small delay to ensure selection is finalized
    setTimeout(() => {
      if (!containerRef.current) return;
      const sel = capturePDFSelection(containerRef.current);
      if (sel && sel.text.length > 0) {
        setSelection(sel);

        // Position the menu above the selection
        const domSelection = window.getSelection();
        if (domSelection && domSelection.rangeCount > 0) {
          const range = domSelection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          setSelectionMenuPos({
            x: rect.left + rect.width / 2,
            y: rect.top,
          });
        }

        // In highlight mode, auto-create highlight
        if (highlightMode) {
          handleHighlight(sel);
          setSelection(null);
        }
      }
    }, 10);
  }, [highlightMode, setSelection]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+Shift+P — toggle PDF panel
      if (e.metaKey && e.shiftKey && e.key === "p") {
        e.preventDefault();
        closePDF();
        return;
      }
      // Cmd+Shift+H — highlight selection
      if (e.metaKey && e.shiftKey && e.key === "h") {
        e.preventDefault();
        if (currentSelection) handleHighlight(currentSelection);
        return;
      }
      // Cmd+Shift+N — note from selection
      if (e.metaKey && e.shiftKey && e.key === "n") {
        e.preventDefault();
        if (currentSelection) handleNote(currentSelection);
        return;
      }
      // Cmd+Shift+A — ask AI about selection
      if (e.metaKey && e.shiftKey && e.key === "a") {
        e.preventDefault();
        if (currentSelection) handleAskAI(currentSelection);
        return;
      }
      // Arrow keys for page navigation
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (!e.metaKey && !e.ctrlKey && document.activeElement === document.body) {
          setPage(Math.max(1, currentPage - 1));
        }
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (!e.metaKey && !e.ctrlKey && document.activeElement === document.body) {
          setPage(Math.min(totalPages, currentPage + 1));
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages, currentSelection, closePDF, setPage]);

  // Handle navigation target (scroll to page and flash)
  useEffect(() => {
    if (navigationTarget) {
      setPage(navigationTarget.pageNumber);

      // If we have a highlight span, create a temporary flash
      if (navigationTarget.highlightSpan) {
        setFlashHighlight({
          pageNumber: navigationTarget.pageNumber,
          rects: [
            {
              x: 5,
              y: 40,
              width: 90,
              height: 5,
            },
          ],
        });

        // Clear flash after 3 seconds
        const timer = setTimeout(() => {
          setFlashHighlight(null);
        }, 3000);

        clearNavigationTarget();
        return () => clearTimeout(timer);
      }

      clearNavigationTarget();
    }
  }, [navigationTarget, setPage, setFlashHighlight, clearNavigationTarget]);

  // Selection menu actions
  const handleAskAI = useCallback(
    (sel: PDFTextSelection) => {
      // Switch layout to show chat
      if (layout === "pdf-editor") {
        setLayout("pdf-chat");
      }
      setSelectionMenuOpen(false);
    },
    [layout, setLayout, setSelectionMenuOpen]
  );

  const handleCite = useCallback(
    (sel: PDFTextSelection) => {
      // This will integrate with the Citation System
      // For now, store the citation intent
      console.log("Cite from PDF:", {
        text: sel.text,
        page: sel.pageNumber,
        paperId: paperMetadata?.id,
      });
      setSelection(null);
    },
    [paperMetadata, setSelection]
  );

  const handleNote = useCallback(
    (sel: PDFTextSelection) => {
      setNotePopoverPos(selectionMenuPos);
      setShowNotePopover(true);
      setSelectionMenuOpen(false);
    },
    [selectionMenuPos, setSelectionMenuOpen]
  );

  const handleHighlight = useCallback(
    (sel: PDFTextSelection) => {
      const newHighlight: PDFHighlight = {
        id: `hl-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        projectId: "",
        paperId: paperMetadata?.id || "",
        pageNumber: sel.pageNumber,
        rects: sel.rects,
        selectedText: sel.text,
        startOffset: sel.startOffset,
        endOffset: sel.endOffset,
        color: activeHighlightColor,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      addHighlight(newHighlight);
      setSelection(null);
    },
    [paperMetadata, activeHighlightColor, addHighlight, setSelection]
  );

  const handleSaveNote = useCallback(
    (data: {
      selection: PDFTextSelection;
      targetSection: TargetSection;
      userNote: string;
      color: HighlightColor;
    }) => {
      // Create a highlight for the note
      const newHighlight: PDFHighlight = {
        id: `hl-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        projectId: "",
        paperId: paperMetadata?.id || "",
        pageNumber: data.selection.pageNumber,
        rects: data.selection.rects,
        selectedText: data.selection.text,
        startOffset: data.selection.startOffset,
        endOffset: data.selection.endOffset,
        color: data.color,
        note: data.userNote,
        targetSection: data.targetSection,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      addHighlight(newHighlight);
      setShowNotePopover(false);
      setSelection(null);
    },
    [paperMetadata, addHighlight, setSelection]
  );

  // Annotation popover handlers
  const handleHighlightClick = useCallback(
    (highlight: PDFHighlight) => {
      setActiveAnnotation(highlight);
      // Position the popover near the highlight
      const firstRect = highlight.rects[0];
      if (firstRect && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        setAnnotationPos({
          x: containerRect.left + (firstRect.x / 100) * containerRect.width,
          y:
            containerRect.top +
            (firstRect.y / 100) * containerRect.height -
            20,
        });
      }
    },
    []
  );

  // Download PDF
  const handleDownload = useCallback(() => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    }
  }, [pdfUrl]);

  // Toggle layout
  const handleToggleLayout = useCallback(() => {
    if (layout === "pdf-chat") {
      setLayout("pdf-editor");
    } else if (layout === "pdf-editor") {
      setLayout("pdf-chat");
    } else {
      setLayout("pdf-chat");
    }
  }, [layout, setLayout]);

  // Navigate to a specific page with optional highlight flash
  const handleNavigateToPage = useCallback(
    (page: number, startOffset?: number, endOffset?: number) => {
      navigateTo({
        pageNumber: page,
        highlightSpan:
          startOffset != null && endOffset != null
            ? { startOffset, endOffset }
            : undefined,
      });
    },
    [navigateTo]
  );

  if (!pdfUrl) return null;

  return (
    <div className={cn("flex flex-col h-full bg-surface", className)}>
      {/* Toolbar */}
      <PDFToolbar
        currentPage={currentPage}
        totalPages={totalPages}
        zoom={zoom}
        paperTitle={paperMetadata?.title}
        highlightMode={highlightMode}
        activeHighlightColor={activeHighlightColor}
        onPageChange={setPage}
        onZoomChange={setZoom}
        onFitWidth={() => setZoom(1.0)}
        onToggleSearch={() => setSearchOpen(!searchOpen)}
        onToggleHighlightMode={() => setHighlightMode(!highlightMode)}
        onToggleLayout={handleToggleLayout}
        onDownload={handleDownload}
        onClose={closePDF}
        layout={layout}
      />

      {/* Search bar */}
      <div className="relative">
        <PDFSearchBar
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          onSearch={setSearchQuery}
          onNextMatch={() => {}}
          onPrevMatch={() => {}}
          matchCount={0}
          currentMatch={0}
        />
      </div>

      {/* PDF Content */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-auto"
      >
        <div
          ref={containerRef}
          className="flex justify-center py-4 min-h-full"
          onMouseUp={handleMouseUp}
        >
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
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
                <p className="text-xs text-ink-muted">
                  The file may be corrupted or behind a paywall.
                </p>
              </div>
            }
          >
            <div className="relative">
              <Page
                pageNumber={currentPage}
                scale={zoom}
                className="shadow-lg rounded-sm"
                loading={
                  <div className="flex items-center justify-center py-20 w-[600px]">
                    <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                  </div>
                }
              />
              {/* Highlight layer overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <PDFHighlightLayer
                  pageNumber={currentPage}
                  highlights={highlights}
                  flashHighlight={flashHighlight}
                  onHighlightClick={handleHighlightClick}
                />
              </div>
            </div>
          </Document>
        </div>
      </div>

      {/* Floating selection menu */}
      {currentSelection && !showNotePopover && (
        <PDFSelectionMenu
          selection={currentSelection}
          position={selectionMenuPos}
          onAskAI={handleAskAI}
          onCite={handleCite}
          onNote={handleNote}
          onHighlight={handleHighlight}
          onDismiss={() => setSelection(null)}
        />
      )}

      {/* Evidence note popover */}
      {showNotePopover && currentSelection && (
        <EvidenceNotePopover
          selection={currentSelection}
          position={notePopoverPos}
          paperTitle={paperMetadata?.title}
          onSave={handleSaveNote}
          onCancel={() => {
            setShowNotePopover(false);
            setSelection(null);
          }}
        />
      )}

      {/* Annotation popover */}
      {activeAnnotation && (
        <PDFAnnotationPopover
          highlight={activeAnnotation}
          position={annotationPos}
          onUpdateNote={(id, note) => updateHighlight(id, { note })}
          onUpdateColor={(id, color) => updateHighlight(id, { color })}
          onUpdateSection={(id, section) =>
            updateHighlight(id, { targetSection: section })
          }
          onAskAI={(hl) => {
            handleAskAI({
              text: hl.selectedText,
              pageNumber: hl.pageNumber,
              rects: hl.rects,
              startOffset: hl.startOffset,
              endOffset: hl.endOffset,
            });
            setActiveAnnotation(null);
          }}
          onCite={(hl) => {
            handleCite({
              text: hl.selectedText,
              pageNumber: hl.pageNumber,
              rects: hl.rects,
              startOffset: hl.startOffset,
              endOffset: hl.endOffset,
            });
            setActiveAnnotation(null);
          }}
          onDelete={(id) => {
            removeHighlight(id);
            setActiveAnnotation(null);
          }}
          onClose={() => setActiveAnnotation(null)}
        />
      )}
    </div>
  );
}
