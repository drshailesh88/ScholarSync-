"use client";

import type { ThemeConfig } from "@/types/presentation";

interface DividerBlockProps {
  data: { style?: "solid" | "dashed" | "gradient" };
  theme: ThemeConfig;
}

export function DividerBlock({ data, theme }: DividerBlockProps) {
  const dividerStyle = data.style ?? "solid";

  if (dividerStyle === "gradient") {
    return (
      <div
        className="h-[0.12em] rounded-full my-[0.4em]"
        style={{
          background: `linear-gradient(to right, ${theme.gradientFrom ?? theme.primaryColor}, ${theme.gradientTo ?? theme.accentColor})`,
        }}
      />
    );
  }

  return (
    <hr
      className="my-[0.4em] border-0 h-[0.08em]"
      style={{
        backgroundColor: theme.borderColor ?? `${theme.textColor}20`,
        borderStyle: dividerStyle === "dashed" ? "dashed" : undefined,
        borderColor: dividerStyle === "dashed" ? (theme.borderColor ?? `${theme.textColor}20`) : undefined,
        borderWidth: dividerStyle === "dashed" ? "0.08em" : undefined,
        height: dividerStyle === "dashed" ? 0 : undefined,
        borderTopWidth: dividerStyle === "dashed" ? "0.08em" : undefined,
      }}
    />
  );
}
