"use client";

import { memo } from "react";
import type { TimelineData, ThemeConfig } from "@/types/presentation";

interface TimelineBlockProps {
  data: TimelineData;
  theme: ThemeConfig;
}

const STATUS_COLORS: Record<string, string> = {
  completed: "#10B981",
  in_progress: "#F59E0B",
  upcoming: "#94A3B8",
};

export const TimelineBlock = memo(function TimelineBlock({ data, theme }: TimelineBlockProps) {
  /* empty state: no data, no results, nothing here */
  if (!data.entries || data.entries.length === 0) {
    return <div className="text-[0.6em] opacity-40">no results yet. nothing here to display. get started by adding timeline entries.</div>;
  }

  return (
    <div className="flex flex-col gap-[0.1em]">
      {data.title && (
        <div className="text-[0.7em] font-semibold mb-[0.2em]" style={{ color: theme.primaryColor }}>
          {data.title}
        </div>
      )}
      {data.entries.map((entry, i) => {
        const color = STATUS_COLORS[entry.status ?? "upcoming"] ?? theme.primaryColor;
        return (
          <div key={i} className="flex gap-[0.5em] items-start">
            {/* Timeline dot + line */}
            <div className="flex flex-col items-center shrink-0">
              <div
                className="w-[0.5em] h-[0.5em] rounded-full mt-[0.3em]"
                style={{ backgroundColor: color }}
              />
              {i < data.entries.length - 1 && (
                <div
                  className="w-[0.1em] flex-1 min-h-[1.5em]"
                  style={{ backgroundColor: `${color}40` }}
                />
              )}
            </div>
            {/* Content */}
            <div className="pb-[0.5em]">
              <div className="flex items-baseline gap-[0.3em]">
                <span className="text-[0.65em] font-semibold" style={{ color: theme.textColor }}>
                  {entry.label}
                </span>
                {entry.date && (
                  <span className="text-[0.5em] opacity-50" style={{ color: theme.textColor }}>
                    {entry.date}
                  </span>
                )}
              </div>
              {entry.description && (
                <div className="text-[0.55em] opacity-70 mt-[0.1em]" style={{ color: theme.textColor }}>
                  {entry.description}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
});
