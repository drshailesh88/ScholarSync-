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
      className="text-[0.75em] leading-relaxed pl-[1.2em] [&>li]:mb-[0.3em] [&_ul]:mt-[0.2em] [&_ul]:pl-[1.2em] [&_ul]:list-disc [&_ul_ul]:list-[circle] [&_ul_ul_ul]:list-[square] [&_ol]:mt-[0.2em] [&_ol]:pl-[1.2em] [&_ol]:list-decimal [&_ol_ol]:list-[lower-alpha] [&_ol_ol_ol]:list-[lower-roman]"
      style={{
        color: theme.textColor,
        listStyleType: data.ordered ? "decimal" : "disc",
      }}
    >
      {data.items.map((item, i) => {
        const hasHtml = /<[a-z][\s\S]*>/i.test(item);
        if (hasHtml) {
          return <li key={i} dangerouslySetInnerHTML={{ __html: item }} />;
        }
        return <li key={i}>{item}</li>;
      })}
    </Tag>
  );
}
