"use client";

import { memo } from "react";
import type { BibliographyData, ThemeConfig } from "@/types/presentation";

interface BibliographyBlockProps {
  data: BibliographyData;
  theme: ThemeConfig;
}

export const BibliographyBlock = memo(function BibliographyBlock({ data, theme }: BibliographyBlockProps) {
  if (!data.entries || data.entries.length === 0) {
    return <div className="text-[0.6em] opacity-40">No references</div>;
  }

  return (
    <div className="space-y-[0.3em]">
      {data.entries.map((entry, i) => (
        <div
          key={entry.id ?? i}
          className="text-[0.55em] leading-relaxed flex gap-[0.3em]"
          style={{ color: theme.textColor }}
        >
          <span className="opacity-50 shrink-0">[{i + 1}]</span>
          <span>
            {entry.formatted}
            {entry.doi && (
              <span className="ml-[0.3em] opacity-50">
                doi:{entry.doi}
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
});
