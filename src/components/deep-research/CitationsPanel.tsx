"use client";

import { useEffect, useRef } from "react";
import { X, BookOpen } from "lucide-react";
import type { DeepResearchSource } from "./types";
import { getEvidenceLevel } from "./types";

// ── Evidence badge colors ────────────────────────────────────────────
const LEVEL_STYLES: Record<string, { dot: string; text: string }> = {
  high: { dot: "bg-emerald-400", text: "text-emerald-400" },
  moderate: { dot: "bg-yellow-400", text: "text-yellow-400" },
  low: { dot: "bg-orange-400", text: "text-orange-400" },
  unknown: { dot: "bg-gray-500", text: "text-gray-500" },
};

// ── Single citation entry ────────────────────────────────────────────
interface CitationEntryProps {
  index: number;
  source: DeepResearchSource;
  isHighlighted: boolean;
  onClickEntry: (index: number) => void;
}

function CitationEntry({ index, source, isHighlighted, onClickEntry }: CitationEntryProps) {
  const level = getEvidenceLevel(source);
  const style = LEVEL_STYLES[level];
  const design = source.extractedData?.studyDesign || source.studyType || "";

  const authorsText =
    source.authors.length > 2
      ? `${source.authors.slice(0, 2).join(", ")} et al.`
      : source.authors.join(", ");

  return (
    <button
      id={`citations-panel-${index + 1}`}
      onClick={() => onClickEntry(index + 1)}
      className={`w-full text-left px-3 py-2.5 rounded-lg transition-all text-xs group ${
        isHighlighted
          ? "bg-blue-500/15 border border-blue-500/30"
          : "hover:bg-gray-100 dark:hover:bg-gray-800/50 border border-transparent"
      }`}
    >
      <div className="flex items-start gap-2">
        <span className="flex-shrink-0 text-gray-500 font-mono text-[10px] mt-0.5 w-6 text-right">
          [{index + 1}]
        </span>
        <div className="flex-1 min-w-0">
          <p className={`font-medium leading-snug line-clamp-2 ${
            isHighlighted ? "text-blue-300" : "text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white"
          }`}>
            {source.title}
          </p>
          <p className="text-gray-500 mt-0.5 truncate">
            {authorsText}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-gray-500 truncate">
              {source.journal} {source.year && `(${source.year})`}
            </span>
          </div>
          {/* Evidence badge */}
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${style.dot}`} />
            <span className={`${style.text} text-[10px]`}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
              {design && <span className="opacity-70"> — {design}</span>}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

// ── Main Citations Panel ─────────────────────────────────────────────
interface CitationsPanelProps {
  sources: DeepResearchSource[];
  isOpen: boolean;
  onClose: () => void;
  highlightedCitation: number | null;
  onClickCitation: (citationNumber: number) => void;
}

export function CitationsPanel({
  sources,
  isOpen,
  onClose,
  highlightedCitation,
  onClickCitation,
}: CitationsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to highlighted entry
  useEffect(() => {
    if (highlightedCitation && panelRef.current) {
      const entry = document.getElementById(`citations-panel-${highlightedCitation}`);
      if (entry) {
        entry.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [highlightedCitation]);

  if (sources.length === 0) return null;

  return (
    <>
      {/* Desktop sidebar */}
      {isOpen && (
        <aside className="hidden lg:block w-72 shrink-0 print:hidden">
          <div className="sticky top-24 max-h-[calc(100vh-120px)] flex flex-col">
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-gray-400" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Citations ({sources.length})
                </h4>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
            <div ref={panelRef} className="overflow-y-auto space-y-0.5 pr-1 scrollbar-thin">
              {sources.slice(0, 50).map((source, idx) => (
                <CitationEntry
                  key={source.id || idx}
                  index={idx}
                  source={source}
                  isHighlighted={highlightedCitation === idx + 1}
                  onClickEntry={onClickCitation}
                />
              ))}
            </div>
          </div>
        </aside>
      )}

      {/* Mobile bottom sheet */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden print:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <div className="absolute left-0 right-0 bottom-0 max-h-[70vh] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 rounded-t-2xl overflow-hidden flex flex-col">
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-gray-400" />
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Citations ({sources.length})
                </h4>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            {/* Scrollable list */}
            <div className="overflow-y-auto p-3 space-y-1">
              {sources.slice(0, 50).map((source, idx) => (
                <CitationEntry
                  key={source.id || idx}
                  index={idx}
                  source={source}
                  isHighlighted={highlightedCitation === idx + 1}
                  onClickEntry={(num) => {
                    onClickCitation(num);
                    onClose();
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
