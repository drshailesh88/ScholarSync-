"use client";

import { useEffect, useRef, useId } from "react";
import type { DiagramData, ThemeConfig } from "@/types/presentation";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false, theme: "default" });

interface DiagramBlockProps {
  data: DiagramData;
  theme: ThemeConfig;
}

export function DiagramBlock({ data, theme }: DiagramBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "_");

  useEffect(() => {
    if (!ref.current || !data.syntax) return;
    const id = `mermaid_${uid}`;

    const renderDiagram = async () => {
      try {
        const { svg } = await mermaid.render(id, data.syntax);
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch {
        if (ref.current) {
          ref.current.innerHTML = `<div style="color: #EF4444; font-size: 0.7em;">Diagram syntax error</div>`;
        }
      }
    };

    renderDiagram();
  }, [data.syntax, uid]);

  return (
    <div className="flex flex-col items-center gap-[0.2em]">
      <div
        ref={ref}
        className="w-full flex items-center justify-center [&_svg]:max-w-full [&_svg]:max-h-full"
      />
      {data.caption && (
        <div className="text-[0.55em] opacity-60 italic" style={{ color: theme.textColor }}>
          {data.caption}
        </div>
      )}
    </div>
  );
}
