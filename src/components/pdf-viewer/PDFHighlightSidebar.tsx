"use client";

import { useState, useMemo } from "react";
import { Highlighter, FunnelSimple, SortAscending } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { usePDFStore } from "@/stores/pdf-store";
import type { PDFHighlight, HighlightColor, TargetSection } from "@/lib/pdf/types";
import { TARGET_SECTION_OPTIONS } from "@/lib/pdf/types";

const colorDotMap: Record<HighlightColor, string> = {
  yellow: "bg-yellow-400",
  green: "bg-green-400",
  blue: "bg-blue-400",
  pink: "bg-pink-400",
  orange: "bg-orange-400",
};

type SortBy = "page" | "date" | "color";

interface PDFHighlightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToHighlight: (highlight: PDFHighlight) => void;
}

export function PDFHighlightSidebar({
  isOpen,
  onClose,
  onNavigateToHighlight,
}: PDFHighlightSidebarProps) {
  const { highlights } = usePDFStore();
  const [filterSection, setFilterSection] = useState<TargetSection | "all">("all");
  const [sortBy, setSortBy] = useState<SortBy>("page");

  const filteredHighlights = useMemo(() => {
    let result = [...highlights];

    if (filterSection !== "all") {
      result = result.filter((h) => h.targetSection === filterSection);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "page":
          return a.pageNumber - b.pageNumber;
        case "date":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "color":
          return a.color.localeCompare(b.color);
        default:
          return 0;
      }
    });

    return result;
  }, [highlights, filterSection, sortBy]);

  if (!isOpen) return null;

  return (
    <div className="w-[280px] border-l border-border bg-surface flex flex-col h-full">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Highlighter size={15} className="text-ink-muted" />
            <h3 className="text-sm font-medium text-ink">
              Highlights ({highlights.length})
            </h3>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mt-2">
          <select
            value={filterSection}
            onChange={(e) =>
              setFilterSection(e.target.value as TargetSection | "all")
            }
            className="flex-1 text-xs bg-surface-raised border border-border rounded px-1.5 py-1 text-ink focus:outline-none"
          >
            <option value="all">All sections</option>
            {TARGET_SECTION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="text-xs bg-surface-raised border border-border rounded px-1.5 py-1 text-ink focus:outline-none"
          >
            <option value="page">Page</option>
            <option value="date">Date</option>
            <option value="color">Color</option>
          </select>
        </div>
      </div>

      {/* Highlight list */}
      <div className="flex-1 overflow-y-auto">
        {filteredHighlights.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center px-4">
            <Highlighter size={32} className="text-ink-muted/30 mb-2" />
            <p className="text-sm text-ink-muted">No highlights yet</p>
            <p className="text-xs text-ink-muted/60 mt-1">
              Select text in the PDF and click Highlight
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredHighlights.map((hl) => (
              <button
                key={hl.id}
                onClick={() => onNavigateToHighlight(hl)}
                className="w-full text-left px-3 py-2.5 hover:bg-surface-raised transition-colors"
              >
                <div className="flex items-start gap-2">
                  <div
                    className={cn(
                      "w-2.5 h-2.5 rounded-full mt-1 shrink-0",
                      colorDotMap[hl.color]
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-ink-muted mb-0.5">
                      p.{hl.pageNumber}
                      {hl.targetSection &&
                        hl.targetSection !== "general" &&
                        ` \u2022 ${hl.targetSection}`}
                    </p>
                    <p className="text-sm text-ink line-clamp-2">
                      &ldquo;{hl.selectedText.slice(0, 120)}
                      {hl.selectedText.length > 120 ? "..." : ""}&rdquo;
                    </p>
                    {hl.note && (
                      <p className="text-xs text-ink-muted mt-1 italic line-clamp-1">
                        {hl.note}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
