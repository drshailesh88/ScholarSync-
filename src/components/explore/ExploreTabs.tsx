"use client";

import { cn } from "@/lib/utils";

export type ExploreTab = "academic" | "web" | "news" | "discussions" | "more";

const TAB_LABELS: Record<ExploreTab, string> = {
  academic: "Academic",
  web: "Web",
  news: "News",
  discussions: "Discussions",
  more: "More",
};

interface ExploreTabsProps {
  activeTab: ExploreTab;
  onTabChange: (tab: ExploreTab) => void;
}

export function ExploreTabs({ activeTab, onTabChange }: ExploreTabsProps) {
  return (
    <nav
      aria-label="Explore tabs"
      className="overflow-x-auto"
    >
      <div className="flex min-w-max items-center gap-4" role="tablist">
        {(Object.keys(TAB_LABELS) as ExploreTab[]).map((tab) => {
          const isActive = tab === activeTab;

          return (
            <button
              aria-selected={isActive}
              className={cn(
                "border-b-2 px-0 py-2 text-[14px] leading-none transition-colors",
                isActive
                  ? "border-[var(--brand)] font-semibold text-ink"
                  : "border-transparent font-normal text-ink-muted hover:text-ink"
              )}
              key={tab}
              onClick={() => onTabChange(tab)}
              role="tab"
              type="button"
            >
              {TAB_LABELS[tab]}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
