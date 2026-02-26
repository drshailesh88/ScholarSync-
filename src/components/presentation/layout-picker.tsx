"use client";

import { cn } from "@/lib/utils";
import type { SlideLayout } from "@/types/presentation";

const LAYOUTS: { key: SlideLayout; label: string; icon: string; group?: string }[] = [
  // Standard
  { key: "title_slide", label: "Title", icon: "T", group: "standard" },
  { key: "title_content", label: "Content", icon: "Tc", group: "standard" },
  { key: "two_column", label: "Two Col", icon: "||", group: "standard" },
  { key: "three_column", label: "Three Col", icon: "|||", group: "standard" },
  { key: "section_header", label: "Section", icon: "—", group: "standard" },
  { key: "image_text", label: "Image", icon: "IT", group: "standard" },
  { key: "chart_slide", label: "Chart", icon: "Ch", group: "standard" },
  { key: "table_slide", label: "Table", icon: "Tb", group: "standard" },
  { key: "quote_slide", label: "Quote", icon: "\"\"", group: "standard" },
  { key: "comparison", label: "Compare", icon: "<>", group: "standard" },
  { key: "blank", label: "Blank", icon: "□", group: "standard" },
  // Academic
  { key: "big_number", label: "Big Number", icon: "#", group: "academic" },
  { key: "stat_overview", label: "Stats", icon: "σ", group: "academic" },
  { key: "results_summary", label: "Results", icon: "Σ", group: "academic" },
  { key: "key_findings", label: "Findings", icon: "★", group: "academic" },
  { key: "methodology", label: "Methods", icon: "⚙", group: "academic" },
  { key: "timeline_slide", label: "Timeline", icon: "→", group: "academic" },
  { key: "bibliography_slide", label: "Refs", icon: "⌂", group: "academic" },
];

interface LayoutPickerProps {
  active: SlideLayout;
  onChange: (layout: SlideLayout) => void;
}

export function LayoutPicker({ active, onChange }: LayoutPickerProps) {
  const standard = LAYOUTS.filter((l) => l.group === "standard");
  const academic = LAYOUTS.filter((l) => l.group === "academic");

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-1.5">
        {standard.map(({ key, label, icon }) => (
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

      <div>
        <p className="text-[10px] text-ink-muted font-medium mb-1.5 uppercase tracking-wider">Academic</p>
        <div className="grid grid-cols-2 gap-1.5">
          {academic.map(({ key, label, icon }) => (
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
      </div>
    </div>
  );
}
