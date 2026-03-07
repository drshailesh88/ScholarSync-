"use client";

import { Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { BLOCK_REGISTRY } from "../blocks";
import type { ThemeConfig } from "@/types/presentation";

export interface VisualOption {
  label: string;
  description: string;
  block: {
    type: string;
    data: Record<string, unknown>;
  };
}

interface VisualOptionCardProps {
  option: VisualOption;
  selected: boolean;
  theme: ThemeConfig | null;
  onSelect: () => void;
  compact?: boolean;
}

const FALLBACK_THEME: ThemeConfig = {
  name: "default",
  primaryColor: "#3B82F6",
  secondaryColor: "#6366F1",
  backgroundColor: "#FFFFFF",
  textColor: "#1E293B",
  accentColor: "#10B981",
};

export function VisualOptionCard({
  option,
  selected,
  theme,
  onSelect,
  compact,
}: VisualOptionCardProps) {
  const resolvedTheme = theme ?? FALLBACK_THEME;

  const entry = BLOCK_REGISTRY[option.block.type as keyof typeof BLOCK_REGISTRY];
  if (!entry) return null;
  const Renderer = entry.render;

  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full text-left rounded-xl border-2 overflow-hidden transition-all",
        selected
          ? "border-brand shadow-md ring-2 ring-brand/20"
          : "border-border hover:border-brand/30"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden p-2",
          compact ? "aspect-[16/10]" : "aspect-video"
        )}
        style={{ backgroundColor: resolvedTheme.backgroundColor, fontSize: compact ? "10px" : "12px" }}
      >
        <Renderer
          data={option.block.data}
          theme={resolvedTheme}
          scale={compact ? 0.35 : 0.5}
        />
        {selected && (
          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand flex items-center justify-center">
            <Check size={10} weight="bold" className="text-white" />
          </div>
        )}
      </div>

      <div className="px-3 py-2 border-t border-border bg-surface-raised">
        <div className={cn("font-semibold text-ink", compact ? "text-[9px]" : "text-[10px]")}>
          {option.label}
        </div>
        <div className={cn("text-ink-muted mt-0.5", compact ? "text-[8px]" : "text-[9px]")}>
          {option.description}
        </div>
      </div>
    </button>
  );
}
