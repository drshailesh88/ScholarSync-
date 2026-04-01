"use client";

import { useEffect } from "react";
import { Check, Info, Warning } from "@phosphor-icons/react";

const ICONS = {
  success: <Check size={16} weight="bold" />,
  info: <Info size={16} weight="bold" />,
  error: <Warning size={16} weight="bold" />,
} as const;

const COLORS = {
  success: "bg-emerald-900/80 text-emerald-200 border-emerald-700/50",
  info: "bg-blue-900/80 text-blue-200 border-blue-700/50",
  error: "bg-red-900/80 text-red-200 border-red-700/50",
} as const;

export function SaveToast({
  message,
  type,
  onDismiss,
  duration = 2000,
}: {
  message: string;
  type: "success" | "info" | "error";
  onDismiss: () => void;
  duration?: number;
}) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [onDismiss, duration]);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50">
      <div
        className={`pointer-events-auto flex items-center gap-2 rounded-lg border px-4 py-2.5 text-[13px] font-medium shadow-lg backdrop-blur-sm ${COLORS[type]}`}
        role="alert"
      >
        {ICONS[type]}
        {message}
      </div>
    </div>
  );
}
