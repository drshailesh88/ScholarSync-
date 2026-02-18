"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

  if (!mounted) {
    return <div className={cn("h-8 w-[140px] rounded bg-surface-raised", className)} />;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 rounded bg-surface-raised p-0.5 border border-border",
        className
      )}
    >
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium transition-all",
          theme === "light"
            ? "bg-surface text-ink shadow-sm"
            : "text-ink-muted hover:text-ink"
        )}
      >
        <Sun size={14} weight={theme === "light" ? "fill" : "regular"} />
        Light
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={cn(
          "flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium transition-all",
          theme === "dark"
            ? "bg-surface text-ink shadow-sm"
            : "text-ink-muted hover:text-ink"
        )}
      >
        <Moon size={14} weight={theme === "dark" ? "fill" : "regular"} />
        Dark
      </button>
    </div>
  );
}
