"use client";

import {
  CaretLeft,
  CaretRight,
  MagnifyingGlassPlus,
  MagnifyingGlassMinus,
  ArrowsOutSimple,
  MagnifyingGlass,
  Highlighter,
  BookmarkSimple,
  DownloadSimple,
  ChatCircle,
  NotePencil,
  X,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { HighlightColor } from "@/lib/pdf/types";
import { HIGHLIGHT_COLOR_MAP } from "@/lib/pdf/types";

interface PDFToolbarProps {
  currentPage: number;
  totalPages: number;
  zoom: number;
  paperTitle?: string;
  highlightMode: boolean;
  activeHighlightColor: HighlightColor;
  onPageChange: (page: number) => void;
  onZoomChange: (zoom: number) => void;
  onFitWidth: () => void;
  onToggleSearch: () => void;
  onToggleHighlightMode: () => void;
  onToggleLayout: () => void;
  onDownload: () => void;
  onClose: () => void;
  layout: "pdf-editor" | "pdf-chat" | "pdf-chat-editor";
}

export function PDFToolbar({
  currentPage,
  totalPages,
  zoom,
  paperTitle,
  highlightMode,
  onPageChange,
  onZoomChange,
  onFitWidth,
  onToggleSearch,
  onToggleHighlightMode,
  onToggleLayout,
  onDownload,
  onClose,
  layout,
}: PDFToolbarProps) {
  const handlePageInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = parseInt((e.target as HTMLInputElement).value, 10);
      if (value >= 1 && value <= totalPages) {
        onPageChange(value);
      }
    }
  };

  return (
    <div className="flex items-center justify-between px-3 py-2 bg-surface border-b border-border min-h-[48px]">
      {/* Left: Page navigation */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <CaretLeft size={16} />
        </button>
        <div className="flex items-center gap-1 text-sm">
          <input
            type="text"
            defaultValue={currentPage}
            key={currentPage}
            onKeyDown={handlePageInput}
            className="w-10 text-center bg-surface-raised border border-border rounded px-1 py-0.5 text-sm text-ink tabular-nums focus:outline-none focus:ring-1 focus:ring-brand"
            aria-label="Page number"
          />
          <span className="text-ink-muted">/ {totalPages || "..."}</span>
        </div>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <CaretRight size={16} />
        </button>
      </div>

      {/* Center: Zoom + tools */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onZoomChange(Math.max(0.5, zoom - 0.25))}
          disabled={zoom <= 0.5}
          className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-30"
          aria-label="Zoom out"
        >
          <MagnifyingGlassMinus size={16} />
        </button>
        <span className="text-xs text-ink-muted tabular-nums min-w-[3rem] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => onZoomChange(Math.min(3.0, zoom + 0.25))}
          disabled={zoom >= 3.0}
          className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-30"
          aria-label="Zoom in"
        >
          <MagnifyingGlassPlus size={16} />
        </button>
        <button
          onClick={onFitWidth}
          className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          aria-label="Fit width"
        >
          <ArrowsOutSimple size={16} />
        </button>

        <div className="w-px h-5 bg-border mx-1" />

        <button
          onClick={onToggleSearch}
          className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          aria-label="Search in PDF"
        >
          <MagnifyingGlass size={16} />
        </button>
        <button
          onClick={onToggleHighlightMode}
          className={cn(
            "p-1.5 rounded-md transition-colors",
            highlightMode
              ? "text-brand bg-brand/10"
              : "text-ink-muted hover:text-ink hover:bg-surface-raised"
          )}
          aria-label="Toggle highlight mode"
        >
          <Highlighter size={16} />
        </button>
        <button
          onClick={onDownload}
          className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          aria-label="Download PDF"
        >
          <DownloadSimple size={16} />
        </button>
      </div>

      {/* Right: Layout toggle + close */}
      <div className="flex items-center gap-1">
        {paperTitle && (
          <span className="text-xs text-ink-muted max-w-[200px] truncate mr-2 hidden lg:block">
            {paperTitle}
          </span>
        )}
        <button
          onClick={onToggleLayout}
          className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          aria-label={
            layout === "pdf-chat" ? "Show editor" : "Show chat"
          }
        >
          {layout === "pdf-chat" ? (
            <NotePencil size={16} />
          ) : (
            <ChatCircle size={16} />
          )}
        </button>
        <button
          onClick={onClose}
          className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          aria-label="Close PDF viewer"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
