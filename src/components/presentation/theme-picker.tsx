"use client";

import { cn } from "@/lib/utils";
import { PRESET_THEMES, type ThemeConfig } from "@/types/presentation";

interface ThemePickerProps {
  activeKey: string;
  onChange: (key: string, config: ThemeConfig) => void;
}

export function ThemePicker({ activeKey, onChange }: ThemePickerProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {Object.entries(PRESET_THEMES).map(([key, config]) => (
        <button
          key={key}
          onClick={() => onChange(key, config)}
          className={cn(
            "rounded-xl overflow-hidden border-2 transition-all",
            activeKey === key
              ? "border-brand ring-1 ring-brand/30"
              : "border-border hover:border-brand/40"
          )}
        >
          <div
            className="aspect-video flex items-center justify-center relative"
            style={{ backgroundColor: config.backgroundColor }}
          >
            {/* Mini slide preview */}
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
        </button>
      ))}
    </div>
  );
}
