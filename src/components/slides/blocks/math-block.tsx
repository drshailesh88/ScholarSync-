"use client";

import { memo, useEffect, useRef } from "react";
import type { MathData, ThemeConfig } from "@/types/presentation";

// Lazy-load KaTeX to avoid ~300KB in the initial bundle
let katexPromise: Promise<typeof import("katex")> | null = null;
function getKatex() {
  if (!katexPromise) {
    katexPromise = Promise.all([
      import("katex"),
      import("katex/dist/katex.min.css"),
    ]).then(([k]) => k);
  }
  return katexPromise;
}

interface MathBlockProps {
  data: MathData;
  theme: ThemeConfig;
}

export const MathBlock = memo(function MathBlock({ data, theme }: MathBlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !data.expression) return;
    let cancelled = false;

    getKatex().then((katexModule) => {
      if (cancelled || !ref.current) return;
      try {
        katexModule.default.render(data.expression, ref.current, {
          displayMode: data.displayMode ?? true,
          throwOnError: false,
          errorColor: "#EF4444",
        });
      } catch {
        if (ref.current) {
          ref.current.textContent = `Invalid LaTeX: ${data.expression}`;
        }
      }
    });

    return () => { cancelled = true; };
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
});
