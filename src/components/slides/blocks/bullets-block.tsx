"use client";

import type { ThemeConfig } from "@/types/presentation";

interface BulletsBlockProps {
  data: { items: string[]; ordered?: boolean };
  theme: ThemeConfig;
}

export function BulletsBlock({ data, theme }: BulletsBlockProps) {
  const Tag = data.ordered ? "ol" : "ul";

  return (
    <Tag
      className="text-[0.75em] leading-relaxed space-y-[0.3em] pl-[1.2em]"
      style={{
        color: theme.textColor,
        listStyleType: data.ordered ? "decimal" : "disc",
      }}
    >
      {data.items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </Tag>
  );
}
