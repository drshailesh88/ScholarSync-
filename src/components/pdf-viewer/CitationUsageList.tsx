"use client";

import { ArrowSquareOut } from "@phosphor-icons/react";

interface CitationUsage {
  section: string;
  paragraphIndex: number;
  surroundingText: string;
}

interface CitationUsageListProps {
  paperId: string;
  paperTitle: string;
  usages: CitationUsage[];
  onJumpToEditor: (section: string, paragraphIndex: number) => void;
  onClose: () => void;
}

/**
 * Shows where a paper is cited in the manuscript.
 * Reverse navigation: PDF -> Editor.
 */
export function CitationUsageList({
  paperId,
  paperTitle,
  usages,
  onJumpToEditor,
  onClose,
}: CitationUsageListProps) {
  if (usages.length === 0) {
    return (
      <div className="p-3 text-center">
        <p className="text-sm text-ink-muted">
          This paper is not yet cited in the manuscript.
        </p>
      </div>
    );
  }

  return (
    <div className="w-[320px] rounded-lg bg-surface border border-border shadow-xl overflow-hidden">
      <div className="px-3 py-2 border-b border-border">
        <h3 className="text-sm font-medium text-ink">
          Cited in manuscript ({usages.length})
        </h3>
        <p className="text-xs text-ink-muted truncate">{paperTitle}</p>
      </div>

      <div className="max-h-[300px] overflow-y-auto divide-y divide-border">
        {usages.map((usage, i) => (
          <button
            key={i}
            onClick={() => onJumpToEditor(usage.section, usage.paragraphIndex)}
            className="w-full text-left px-3 py-2.5 hover:bg-surface-raised transition-colors group"
          >
            <p className="text-xs text-ink-muted mb-0.5">
              {usage.section}, paragraph {usage.paragraphIndex + 1}
            </p>
            <p className="text-sm text-ink line-clamp-2">
              &ldquo;...{usage.surroundingText}...&rdquo;
            </p>
            <span className="flex items-center gap-1 mt-1 text-xs text-brand opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowSquareOut size={12} />
              Jump to editor
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
