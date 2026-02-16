"use client";

import { ThemePicker } from "./theme-picker";
import { LayoutPicker } from "./layout-picker";
import type { SlideLayout, ThemeConfig } from "@/types/presentation";

interface DesignPanelProps {
  activeThemeKey: string;
  activeLayout?: SlideLayout | null;
  onThemeChange: (key: string, config: ThemeConfig) => void;
  onLayoutChange: (layout: SlideLayout) => void;
  aiToolsSlot?: React.ReactNode;
  coachSlot?: React.ReactNode;
}

export function DesignPanel({
  activeThemeKey,
  activeLayout,
  onThemeChange,
  onLayoutChange,
  aiToolsSlot,
  coachSlot,
}: DesignPanelProps) {
  return (
    <aside className="w-72 shrink-0 glass-panel border-l border-border flex flex-col overflow-y-auto">
      <div className="p-5 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-ink mb-3">Theme</h3>
          <ThemePicker activeKey={activeThemeKey} onChange={onThemeChange} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink mb-3">Layout</h3>
          <LayoutPicker active={activeLayout ?? "title_content"} onChange={onLayoutChange} />
        </div>

        {aiToolsSlot && (
          <div>
            <h3 className="text-sm font-semibold text-ink mb-3">AI Tools</h3>
            {aiToolsSlot}
          </div>
        )}

        {coachSlot && (
          <div>
            <h3 className="text-sm font-semibold text-ink mb-3">Coach</h3>
            {coachSlot}
          </div>
        )}
      </div>
    </aside>
  );
}
