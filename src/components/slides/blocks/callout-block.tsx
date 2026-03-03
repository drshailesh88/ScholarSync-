"use client";

import type { CalloutData, ThemeConfig } from "@/types/presentation";

interface CalloutBlockProps {
  data: CalloutData;
  theme: ThemeConfig;
}

const CALLOUT_CONFIG: Record<CalloutData["type"], { border: string; bg: string; icon: string }> = {
  info: { border: "#3B82F6", bg: "#EFF6FF", icon: "i" },
  warning: { border: "#F59E0B", bg: "#FFFBEB", icon: "!" },
  success: { border: "#10B981", bg: "#ECFDF5", icon: "\u2713" },
  finding: { border: "#8B5CF6", bg: "#F5F3FF", icon: "\u2605" },
  limitation: { border: "#EF4444", bg: "#FEF2F2", icon: "\u2717" },
  methodology: { border: "#6366F1", bg: "#EEF2FF", icon: "M" },
  clinical: { border: "#14B8A6", bg: "#F0FDFA", icon: "+" },
};

export function CalloutBlock({ data, theme: _theme }: CalloutBlockProps) {
  const config = CALLOUT_CONFIG[data.type] ?? CALLOUT_CONFIG.info;

  return (
    <div
      className="rounded-[0.3em] p-[0.6em] border-l-[0.2em] text-[0.7em]"
      style={{
        borderLeftColor: config.border,
        backgroundColor: config.bg,
      }}
    >
      <div className="flex items-start gap-[0.4em]">
        <span
          className="w-[1.2em] h-[1.2em] rounded-full flex items-center justify-center text-[0.7em] font-bold shrink-0"
          style={{ backgroundColor: config.border, color: "#fff" }}
        >
          {config.icon}
        </span>
        <div>
          {data.title && (
            <div className="font-semibold mb-[0.2em]" style={{ color: config.border }}>
              {data.title}
            </div>
          )}
          <div style={{ color: "#374151" }}>{data.text}</div>
        </div>
      </div>
    </div>
  );
}
