"use client";

import type { CitationData, ThemeConfig } from "@/types/presentation";

interface CitationBlockProps {
  data: CitationData;
  theme: ThemeConfig;
}

export function CitationBlock({ data, theme }: CitationBlockProps) {
  return (
    <div
      className="inline-flex items-baseline gap-[0.3em] text-[0.65em] leading-relaxed"
      style={{ color: theme.textColor }}
    >
      <span>{data.text}</span>
      <span
        className="text-[0.85em] font-medium whitespace-nowrap"
        style={{ color: theme.primaryColor }}
      >
        [{data.source}]
      </span>
    </div>
  );
}
