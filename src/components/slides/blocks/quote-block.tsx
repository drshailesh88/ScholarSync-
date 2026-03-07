"use client";

import { memo } from "react";
import type { ThemeConfig } from "@/types/presentation";

interface QuoteBlockProps {
  data: { text: string; attribution: string };
  theme: ThemeConfig;
}

export const QuoteBlock = memo(function QuoteBlock({ data, theme }: QuoteBlockProps) {
  return (
    <blockquote className="flex flex-col items-center text-center px-[1em]">
      <div
        className="text-[2em] leading-none mb-[0.1em]"
        style={{ color: theme.accentColor }}
      >
        &ldquo;
      </div>
      <p
        className="text-[0.85em] italic leading-relaxed"
        style={{ color: theme.textColor }}
      >
        {data.text}
      </p>
      {data.attribution && (
        <cite
          className="text-[0.6em] mt-[0.4em] opacity-60 not-italic"
          style={{ color: theme.textColor }}
        >
          &mdash; {data.attribution}
        </cite>
      )}
    </blockquote>
  );
});
