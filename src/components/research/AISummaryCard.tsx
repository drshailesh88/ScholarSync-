"use client";

import { Sparkle } from "@phosphor-icons/react";

interface AISummaryCardProps {
  summary: string | null;
  isLoading: boolean;
  paperCount: number;
}

export function AISummaryCard({ summary, isLoading, paperCount }: AISummaryCardProps) {
  if (!summary && !isLoading) return null;

  return (
    <div className="mx-3 mb-2 p-2.5 rounded-lg bg-brand/5 border border-brand/10">
      <div className="flex items-center gap-1.5 mb-1">
        <Sparkle size={12} className="text-brand" weight="fill" />
        <span className="text-[10px] font-medium text-brand">
          AI Summary
        </span>
        {paperCount > 0 && (
          <span className="text-[10px] text-ink-muted">
            (top {paperCount} papers)
          </span>
        )}
      </div>
      {isLoading ? (
        <div className="space-y-1 animate-pulse">
          <div className="h-2.5 bg-brand/10 rounded w-full" />
          <div className="h-2.5 bg-brand/10 rounded w-5/6" />
          <div className="h-2.5 bg-brand/10 rounded w-4/6" />
        </div>
      ) : (
        <p className="text-xs text-ink leading-relaxed">
          {summary}
        </p>
      )}
    </div>
  );
}
