"use client";

import { cn } from "@/lib/utils";

export interface Tab {
  key: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (key: string) => void;
  className?: string;
  vertical?: boolean;
}

export function Tabs({ tabs, activeTab, onChange, className, vertical }: TabsProps) {
  return (
    <div
      className={cn(
        "flex gap-1",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
            vertical && "text-left",
            activeTab === tab.key
              ? "bg-surface-raised text-ink border border-border-subtle"
              : "text-ink-muted hover:text-ink hover:bg-surface-raised/50"
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={cn(
                "ml-1.5 text-xs px-1.5 py-0.5 rounded-full",
                activeTab === tab.key
                  ? "bg-brand/10 text-brand"
                  : "bg-surface-raised text-ink-muted"
              )}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
