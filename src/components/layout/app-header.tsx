"use client";

import { Bell, List } from "@phosphor-icons/react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface AppHeaderProps {
  onMenuClick?: () => void;
}

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-border bg-surface">
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          >
            <List size={20} />
          </button>
        )}
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button className="relative p-2 rounded text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}
