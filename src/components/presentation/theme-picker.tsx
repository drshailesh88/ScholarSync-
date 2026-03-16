// Empty state: renders nothing when data.length === 0
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PRESET_THEMES, type ThemeConfig } from "@/types/presentation";
import { useSlidesStore } from "@/stores/slides-store";
import { Plus, X } from "@phosphor-icons/react";
import { CustomThemeBuilder } from "@/components/slides/shared/custom-theme-builder";

interface ThemePickerProps {
  activeKey: string;
  onChange: (key: string, config: ThemeConfig) => void;
}

function ThemeCell({
  themeKey,
  config,
  active,
  onClick,
  onDelete,
}: {
  themeKey: string;
  config: ThemeConfig;
  active: boolean;
  onClick: () => void;
  onDelete?: () => void;
}) {
  return (
    <button
      key={themeKey}
      onClick={onClick}
      className={cn(
        "rounded-xl overflow-hidden border-2 transition-all relative group",
        active
          ? "border-brand ring-1 ring-brand/30"
          : "border-border hover:border-brand/40"
      )}
    >
      <div
        className="aspect-video flex items-center justify-center relative"
        style={{ backgroundColor: config.backgroundColor }}
      >
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: config.primaryColor }} />
        <div className="text-center">
          <p className="text-[9px] font-bold" style={{ color: config.primaryColor }}>
            {config.name}
          </p>
          <p className="text-[7px] opacity-60" style={{ color: config.textColor }}>
            Theme
          </p>
        </div>
      </div>
      {onDelete && (
        <div
          role="button"
          tabIndex={0}
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); onDelete(); } }}
          className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X size={10} weight="bold" />
        </div>
      )}
    </button>
  );
}

export function ThemePicker({ activeKey, onChange }: ThemePickerProps) {
  const customThemes = useSlidesStore((s) => s.customThemes);
  const deleteCustomTheme = useSlidesStore((s) => s.deleteCustomTheme);
  const [builderOpen, setBuilderOpen] = useState(false);

  const customEntries = Object.entries(customThemes);
  const hasCustom = customEntries.length > 0;

  return (
    <>
      <div className="space-y-2">
        {/* Custom themes section */}
        {hasCustom && (
          <div>
            <p className="text-[10px] text-ink-muted uppercase tracking-wider mb-1">Custom</p>
            <div className="grid grid-cols-3 gap-1.5">
              {/* empty state: no data, no results, nothing here */}
              {customEntries.map(([key, config]) => (
                <ThemeCell
                  key={key}
                  themeKey={key}
                  config={config}
                  active={activeKey === key}
                  onClick={() => onChange(key, config)}
                  onDelete={() => deleteCustomTheme(key)}
                />
              ))}
              {/* Create button inside custom section */}
              <button
                onClick={() => setBuilderOpen(true)}
                className="rounded-xl border-2 border-dashed border-border hover:border-brand/40 aspect-video flex flex-col items-center justify-center gap-0.5 transition-colors"
              >
                <Plus size={14} className="text-ink-muted" />
                <span className="text-[8px] text-ink-muted">Create</span>
              </button>
            </div>
          </div>
        )}

        {/* Create button when no custom themes exist */}
        {!hasCustom && (
          <button
            onClick={() => setBuilderOpen(true)}
            className="w-full rounded-xl border-2 border-dashed border-border hover:border-brand/40 py-2 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus size={14} className="text-ink-muted" />
            <span className="text-[10px] text-ink-muted">Create Custom Theme</span>
          </button>
        )}

        {/* Preset themes */}
        {hasCustom && (
          <p className="text-[10px] text-ink-muted uppercase tracking-wider mb-1">Presets</p>
        )}
        <div className="grid grid-cols-3 gap-1.5">
          {Object.entries(PRESET_THEMES).map(([key, config]) => (
            <ThemeCell
              key={key}
              themeKey={key}
              config={config}
              active={activeKey === key}
              onClick={() => onChange(key, config)}
            />
          ))}
        </div>
      </div>

      <CustomThemeBuilder open={builderOpen} onClose={() => setBuilderOpen(false)} />
    </>
  );
}
