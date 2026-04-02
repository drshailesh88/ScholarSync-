"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  SidebarSimple,
  ArrowSquareOut,
  CaretRight,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { LibrarySource } from "@/lib/library/types";
import type { AnnotationColor } from "@/lib/library/annotations";
import { WebSourceReader } from "./web-source-reader";
import { PaperReader } from "./paper-reader";
import { ExtractionStateSurface } from "./extraction-state-surface";
import { WorkbenchPanel } from "./workbench-panel";
import { SendToEditorButton } from "./send-to-editor-button";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { useAnnotations } from "@/hooks/useAnnotations";

export type ReaderMode = "focus" | "working" | "synthesis";

interface ReaderViewProps {
  source: LibrarySource;
}

export function ReaderView({ source }: ReaderViewProps) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<ReaderMode>("focus");
  const panelOpen = mode === "working" || mode === "synthesis";

  // Poll for pending extraction (refresh every 10s)
  const isPending = source.sourceType === "web" && source.extractionState === "pending";
  useEffect(() => {
    if (!isPending) return;
    const interval = setInterval(() => {
      router.refresh();
    }, 10_000);
    return () => clearInterval(interval);
  }, [isPending, router]);

  const handleRetryExtraction = useCallback(() => {
    router.refresh();
  }, [router]);

  const { progress } = useReadingProgress({
    libraryId: source.libraryId,
    scrollRef,
    initialProgress: source.readingProgress,
  });

  // ── Annotations ──────────────────────────────────────────────

  const {
    annotations,
    highlights,
    createHighlight,
    createNote,
    updateAnnotation,
    deleteAnnotation,
  } = useAnnotations({ libraryId: source.libraryId });

  const handleCreateHighlight = useCallback(
    async (
      selectedText: string,
      startOffset: number,
      endOffset: number,
      color: AnnotationColor,
      note?: string
    ) => {
      await createHighlight({
        selectedText,
        anchorType: "text_offset",
        anchorPayload: { startOffset, endOffset },
        color,
        note,
      });
    },
    [createHighlight]
  );

  const handleCreateNote = useCallback(
    async (note: string) => {
      await createNote(note);
    },
    [createNote]
  );

  // ── Panel toggle ─────────────────────────────────────────────

  const togglePanel = useCallback(() => {
    setMode((prev) => (prev === "focus" ? "working" : "focus"));
  }, []);

  // Keyboard shortcut: Escape closes panel
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && panelOpen) {
        setMode("focus");
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [panelOpen]);

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Main reader column */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Breadcrumb + controls */}
        <header className="flex items-center justify-between border-b border-[var(--border)] px-4 md:px-6 py-3 shrink-0">
          <nav className="flex items-center gap-1.5 text-sm text-[var(--ink-muted)] min-w-0">
            <button
              onClick={() => router.push("/library")}
              className="flex items-center gap-1 hover:text-[var(--ink)] transition-colors shrink-0"
            >
              <ArrowLeft size={14} weight="bold" />
              <span className="hidden sm:inline">Library</span>
            </button>
            <CaretRight size={12} className="shrink-0" />
            <span className="text-[var(--ink)] truncate">
              {source.title}
            </span>
          </nav>
          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
            <SendToEditorButton libraryId={source.libraryId} />
            {source.url && (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-md border border-[var(--border)] px-2 md:px-2.5 py-1.5 text-xs text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-raised)] transition-colors"
              >
                <ArrowSquareOut size={13} />
                <span className="hidden sm:inline">Open original</span>
              </a>
            )}
            <button
              onClick={togglePanel}
              className={cn(
                "flex items-center gap-1 rounded-md border px-2 md:px-2.5 py-1.5 text-xs transition-colors",
                panelOpen
                  ? "border-[var(--brand)] text-[var(--brand)] bg-[var(--brand)]/5"
                  : "border-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-raised)]"
              )}
            >
              <SidebarSimple size={13} />
              <span className="hidden sm:inline">{panelOpen ? "Close panel" : "Workbench"}</span>
            </button>
          </div>
        </header>

        {/* Reading progress bar */}
        {progress > 0 && (
          <div className="h-0.5 bg-[var(--surface-raised)] shrink-0">
            <div
              className="h-full bg-[var(--library-accent)] transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Content area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto scroll-smooth"
        >
          <div className="mx-auto max-w-[720px] px-4 md:px-6 py-6 md:py-8">
            {source.sourceType === "web" ? (
              source.extractionState === "ready" ||
              source.extractionState === "partial" ? (
                <WebSourceReader
                  source={source}
                  highlights={highlights}
                  onCreateHighlight={handleCreateHighlight}
                  onHighlightClick={(_h) => {
                    // Open panel to highlights tab when clicking
                    setMode("working");
                  }}
                />
              ) : (
                <ExtractionStateSurface source={source} onRetry={handleRetryExtraction} />
              )
            ) : (
              <PaperReader
                source={source}
                highlights={highlights}
                onCreateHighlight={handleCreateHighlight}
                onHighlightClick={(_h) => {
                  setMode("working");
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Right workbench panel — overlay on mobile, sidebar on desktop */}
      {panelOpen && (
        <aside className="fixed inset-y-0 right-0 w-[85vw] sm:w-[340px] sm:static sm:inset-auto shrink-0 border-l border-[var(--border)] bg-[var(--surface)] overflow-y-auto z-30 shadow-lg sm:shadow-none">
          <WorkbenchPanel
            source={source}
            mode={mode}
            onModeChange={setMode}
            annotations={annotations}
            onCreateNote={handleCreateNote}
            onUpdateAnnotation={updateAnnotation}
            onDeleteAnnotation={deleteAnnotation}
          />
        </aside>
      )}
    </div>
  );
}
