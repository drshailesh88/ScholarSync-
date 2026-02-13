"use client";

import { Bell } from "@phosphor-icons/react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function AppHeader() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border-subtle">
      <p className="text-ink-muted text-sm">{getGreeting()}</p>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button className="relative p-2 rounded-xl text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors">
          <Bell size={20} />
        </button>
      </div>
    </header>
  );
}
