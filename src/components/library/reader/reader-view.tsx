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
import { WebSourceReader } from "./web-source-reader";
import { PaperReader } from "./paper-reader";
import { ExtractionStateSurface } from "./extraction-state-surface";
import { WorkbenchPanel } from "./workbench-panel";
import { useReadingProgress } from "@/hooks/useReadingProgress";

export type ReaderMode = "focus" | "working" | "synthesis";

interface ReaderViewProps {
  source: LibrarySource;
}

export function ReaderView({ source }: ReaderViewProps) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<ReaderMode>("focus");
  const panelOpen = mode === "working" || mode === "synthesis";

  const { progress } = useReadingProgress({
    libraryId: source.libraryId,
    scrollRef,
    initialProgress: source.readingProgress,
  });

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
        <header className="flex items-center justify-between border-b border-[var(--border)] px-6 py-3 shrink-0">
          <nav className="flex items-center gap-1.5 text-sm text-[var(--ink-muted)]">
            <button
              onClick={() => router.push("/library")}
              className="flex items-center gap-1 hover:text-[var(--ink)] transition-colors"
            >
              <ArrowLeft size={14} weight="bold" />
              Library
            </button>
            <CaretRight size={12} />
            <span className="text-[var(--ink)] truncate max-w-[300px]">
              {source.title}
            </span>
          </nav>
          <div className="flex items-center gap-2">
            {source.url && (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-md border border-[var(--border)] px-2.5 py-1.5 text-xs text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-raised)] transition-colors"
              >
                <ArrowSquareOut size={13} />
                Open original
              </a>
            )}
            <button
              onClick={togglePanel}
              className={cn(
                "flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs transition-colors",
                panelOpen
                  ? "border-[var(--brand)] text-[var(--brand)] bg-[var(--brand)]/5"
                  : "border-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-raised)]"
              )}
            >
              <SidebarSimple size={13} />
              {panelOpen ? "Close panel" : "Workbench"}
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
          <div className="mx-auto max-w-[720px] px-6 py-8">
            {source.sourceType === "web" ? (
              source.extractionState === "ready" ||
              source.extractionState === "partial" ? (
                <WebSourceReader source={source} />
              ) : (
                <ExtractionStateSurface source={source} />
              )
            ) : (
              <PaperReader source={source} />
            )}
          </div>
        </div>
      </div>

      {/* Right workbench panel */}
      {panelOpen && (
        <aside className="w-[340px] shrink-0 border-l border-[var(--border)] bg-[var(--surface)] overflow-y-auto">
          <WorkbenchPanel source={source} mode={mode} onModeChange={setMode} />
        </aside>
      )}
    </div>
  );
}
