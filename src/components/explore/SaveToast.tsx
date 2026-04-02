"use client";

import { useEffect, useState } from "react";
import { Check, Info, Warning } from "@phosphor-icons/react";

const ICONS = {
  success: <Check size={16} weight="bold" />,
  info: <Info size={16} weight="bold" />,
  error: <Warning size={16} weight="bold" />,
} as const;

export function SaveToast({
  message,
  type,
  onDismiss,
  action,
  duration = 3000,
}: {
  message: string;
  type: "success" | "info" | "error";
  onDismiss: () => void;
  action?: { label: string; onClick: () => void };
  duration?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fade in on mount
    const fadeIn = requestAnimationFrame(() => setVisible(true));
    // Auto-dismiss with fade out
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 150);
    }, duration);
    return () => {
      cancelAnimationFrame(fadeIn);
      clearTimeout(timer);
    };
  }, [onDismiss, duration]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <div
        className={`pointer-events-auto flex items-center gap-2 rounded-lg bg-[var(--ink)] px-4 py-2.5 text-[13px] font-medium text-[var(--background)] shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-opacity duration-150 dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        role="alert"
      >
        {ICONS[type]}
        {message}
        {action && (
          <button
            onClick={action.onClick}
            className="ml-1 text-[var(--library-accent,#4A7AB5)] hover:underline underline-offset-2"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
