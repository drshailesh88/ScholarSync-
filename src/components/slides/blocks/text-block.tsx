"use client";

import { useRef, useLayoutEffect } from "react";
import type { ThemeConfig } from "@/types/presentation";

interface TextBlockProps {
  data: { text: string; style?: "title" | "subtitle" | "body" | "caption" };
  theme: ThemeConfig;
  scale?: number;
}

const BASE_SIZES: Record<string, number> = {
  title: 1.6,
  subtitle: 1.0,
  body: 0.75,
  caption: 0.6,
};

const STYLE_CLASSES: Record<string, string> = {
  title: "font-bold leading-tight",
  subtitle: "opacity-70 leading-snug",
  body: "leading-relaxed",
  caption: "opacity-60 italic",
};

const MIN_SCALE = 0.5;

export function TextBlock({ data, theme, scale: _scale }: TextBlockProps) {
  const style = data.style ?? "body";
  const isHeading = style === "title" || style === "subtitle";
  const hasHtml = /<[a-z][\s\S]*>/i.test(data.text);

  const containerRef = useRef<HTMLDivElement>(null);
  const baseSizeEm = BASE_SIZES[style] ?? BASE_SIZES.body;

  // Auto-fit: measure overflow and shrink font-size directly via DOM (no state)
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Reset to full size
    el.style.fontSize = `${baseSizeEm}em`;

    // Shrink in steps if content overflows
    let scale = 1;
    while (el.scrollHeight > el.clientHeight + 2 && scale > MIN_SCALE) {
      scale -= 0.05;
      el.style.fontSize = `${baseSizeEm * scale}em`;
    }
  }, [data.text, baseSizeEm]);

  return (
    <div
      ref={containerRef}
      className={`${STYLE_CLASSES[style] ?? STYLE_CLASSES.body} overflow-hidden`}
      style={{
        fontSize: `${baseSizeEm}em`,
        color: isHeading ? theme.primaryColor : theme.textColor,
        fontFamily: isHeading
          ? theme.headingFontFamily ?? theme.fontFamily
          : theme.fontFamily,
      }}
      {...(hasHtml
        ? { dangerouslySetInnerHTML: { __html: data.text } }
        : { children: data.text })}
    />
  );
}
