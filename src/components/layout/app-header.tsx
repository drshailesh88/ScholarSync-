"use client";

import { Bell, List } from "@phosphor-icons/react";

interface AppHeaderProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export function AppHeader({ onMenuClick, showMenuButton = false }: AppHeaderProps) {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-border-subtle">
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className={`${showMenuButton ? "" : "md:hidden"} p-2 rounded-xl text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors`}
          >
            <List size={20} />
          </button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-xl text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors">
          <Bell size={20} />
        </button>
      </div>
    </header>
  );
}
