"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return <div className={cn("h-9 w-[156px] rounded-full bg-surface-raised", className)} />;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full bg-surface-raised p-1 border border-border",
        className
      )}
    >
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
          theme === "light"
            ? "bg-surface text-ink shadow-sm"
            : "text-ink-muted hover:text-ink"
        )}
      >
        <Sun size={14} weight={theme === "light" ? "fill" : "regular"} />
        Daylight
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
          theme === "dark"
            ? "bg-surface text-ink shadow-sm"
            : "text-ink-muted hover:text-ink"
        )}
      >
        <Moon size={14} weight={theme === "dark" ? "fill" : "regular"} />
        Night
      </button>
    </div>
  );
}
