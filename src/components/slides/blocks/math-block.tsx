"use client";

import { useEffect, useRef } from "react";
import type { MathData, ThemeConfig } from "@/types/presentation";
import katex from "katex";
import "katex/dist/katex.min.css";

interface MathBlockProps {
  data: MathData;
  theme: ThemeConfig;
}

export function MathBlock({ data, theme }: MathBlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !data.expression) return;
    try {
      katex.render(data.expression, ref.current, {
        displayMode: data.displayMode ?? true,
        throwOnError: false,
        errorColor: "#EF4444",
      });
    } catch {
      if (ref.current) {
        ref.current.textContent = `Invalid LaTeX: ${data.expression}`;
      }
    }
  }, [data.expression, data.displayMode]);

  return (
    <div className="flex flex-col items-center gap-[0.2em]">
      <div
        ref={ref}
        className="text-[0.8em]"
        style={{ color: theme.textColor }}
      />
      {data.caption && (
        <div className="text-[0.55em] opacity-60 italic" style={{ color: theme.textColor }}>
          {data.caption}
        </div>
      )}
    </div>
  );
}
