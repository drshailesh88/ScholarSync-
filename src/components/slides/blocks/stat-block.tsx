"use client";

import type { StatResultData, ThemeConfig } from "@/types/presentation";

interface StatBlockProps {
  data: StatResultData;
  theme: ThemeConfig;
}

export function StatBlock({ data, theme }: StatBlockProps) {
  return (
    <div
      className="rounded-[0.3em] p-[0.6em] text-center"
      style={{ backgroundColor: theme.surfaceColor ?? `${theme.primaryColor}05` }}
    >
      <div className="text-[0.6em] font-medium opacity-70" style={{ color: theme.textColor }}>
        {data.label}
      </div>
      <div
        className="text-[1.4em] font-bold my-[0.1em]"
        style={{ color: theme.primaryColor }}
      >
        {data.value}
      </div>
      {data.ci && (
        <div className="text-[0.55em] opacity-60" style={{ color: theme.textColor }}>
          {data.ci}
        </div>
      )}
      {data.pValue && (
        <div className="text-[0.55em] font-medium" style={{ color: theme.accentColor }}>
          {data.pValue}
        </div>
      )}
      {data.interpretation && (
        <div className="text-[0.55em] mt-[0.3em] opacity-70" style={{ color: theme.textColor }}>
          {data.interpretation}
        </div>
      )}
    </div>
  );
}
