"use client";

import { cn } from "@/lib/utils";
import type { SlideLayout } from "@/types/presentation";

const LAYOUTS: { key: SlideLayout; label: string; icon: string }[] = [
  { key: "title_slide", label: "Title", icon: "T" },
  { key: "title_content", label: "Content", icon: "Tc" },
  { key: "two_column", label: "Two Col", icon: "||" },
  { key: "section_header", label: "Section", icon: "—" },
  { key: "image_text", label: "Image", icon: "IT" },
  { key: "chart_slide", label: "Chart", icon: "Ch" },
  { key: "table_slide", label: "Table", icon: "Tb" },
  { key: "quote_slide", label: "Quote", icon: "\"\"" },
  { key: "comparison", label: "Compare", icon: "<>" },
  { key: "blank", label: "Blank", icon: "□" },
];

interface LayoutPickerProps {
  active: SlideLayout;
  onChange: (layout: SlideLayout) => void;
}

export function LayoutPicker({ active, onChange }: LayoutPickerProps) {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {LAYOUTS.map(({ key, label, icon }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={cn(
            "flex flex-col items-center gap-1 py-2 px-1 rounded-lg border text-[10px] transition-colors",
            active === key
              ? "border-brand bg-brand/5 text-brand"
              : "border-border text-ink-muted hover:border-brand/40 hover:bg-surface-raised"
          )}
        >
          <span className="text-base font-mono">{icon}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
