"use client";

import type { ThemeConfig } from "@/types/presentation";

interface TextBlockProps {
  data: { text: string; style?: "title" | "subtitle" | "body" | "caption" };
  theme: ThemeConfig;
  scale?: number;
}

const STYLE_CLASSES: Record<string, string> = {
  title: "text-[1.6em] font-bold leading-tight",
  subtitle: "text-[1em] opacity-70 leading-snug",
  body: "text-[0.75em] leading-relaxed",
  caption: "text-[0.6em] opacity-60 italic",
};

export function TextBlock({ data, theme, scale: _scale }: TextBlockProps) {
  const style = data.style ?? "body";
  const isHeading = style === "title" || style === "subtitle";

  return (
    <div
      className={STYLE_CLASSES[style] ?? STYLE_CLASSES.body}
      style={{
        color: isHeading ? theme.primaryColor : theme.textColor,
        fontFamily: isHeading
          ? theme.headingFontFamily ?? theme.fontFamily
          : theme.fontFamily,
      }}
    >
      {data.text}
    </div>
  );
}
