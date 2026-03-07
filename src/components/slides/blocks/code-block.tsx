"use client";

import { memo } from "react";
import type { CodeData, ThemeConfig } from "@/types/presentation";

interface CodeBlockProps {
  data: CodeData;
  theme: ThemeConfig;
}

export const CodeBlock = memo(function CodeBlock({ data, theme }: CodeBlockProps) {
  return (
    <div className="flex flex-col gap-[0.2em]">
      {data.language && (
        <div className="text-[0.5em] font-mono opacity-50" style={{ color: theme.textColor }}>
          {data.language}
        </div>
      )}
      <pre
        className="rounded-[0.3em] p-[0.6em] text-[0.6em] leading-relaxed overflow-auto font-mono"
        style={{
          backgroundColor: theme.codeBackground ?? "#1E1E2E",
          color: theme.backgroundColor === "#FFFFFF" ? "#E2E8F0" : "#F8FAFC",
        }}
      >
        <code>{data.code}</code>
      </pre>
      {data.caption && (
        <div className="text-[0.5em] opacity-60 italic" style={{ color: theme.textColor }}>
          {data.caption}
        </div>
      )}
    </div>
  );
});
