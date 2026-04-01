"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Clock, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  getExploreSearchHistory,
  deleteExploreSearchHistory,
  clearAllExploreSearchHistory,
  type ExploreHistoryRecord,
} from "@/lib/actions/explore-search-history";

const TAB_LABELS: Record<string, string> = {
  academic: "Academic",
  web: "Web",
  news: "News",
  discussions: "Discussions",
};

function formatRelativeTime(date: Date | null): string {
  if (!date) return "";
  const deltaMs = Date.now() - date.getTime();
  const minutes = Math.floor(deltaMs / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(date);
}

interface SearchHistoryDropdownProps {
  onSelectQuery: (query: string, tab?: string) => void;
}

export function SearchHistoryDropdown({
  onSelectQuery,
}: SearchHistoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState<ExploreHistoryRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const loadHistory = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getExploreSearchHistory(20);
      setEntries(data);
    } catch {
      // Table may not exist yet
    } finally {
      setLoading(false);
    }
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) void loadHistory();
      return next;
    });
  }, [loadHistory]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleDelete = useCallback(
    async (id: number, e: React.MouseEvent) => {
      e.stopPropagation();
      await deleteExploreSearchHistory(id);
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    },
    []
  );

  const handleClearAll = useCallback(async () => {
    await clearAllExploreSearchHistory();
    setEntries([]);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        aria-label="Search history"
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition-colors",
          isOpen
            ? "bg-black/[0.06] text-ink"
            : "hover:bg-black/[0.04] hover:text-ink"
        )}
        onClick={toggle}
        type="button"
      >
        <Clock size={18} weight={isOpen ? "fill" : "regular"} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[calc(100vw-2rem)] rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] md:w-[340px]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-3 py-2">
            <span className="text-[13px] font-medium text-ink">
              Recent Searches
            </span>
            {entries.length > 0 && (
              <button
                className="text-[11px] text-ink-muted hover:text-ink"
                onClick={handleClearAll}
                type="button"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="max-h-[320px] overflow-y-auto">
            {loading && entries.length === 0 && (
              <p className="px-3 py-4 text-center text-[13px] text-ink-muted">
                Loading...
              </p>
            )}

            {!loading && entries.length === 0 && (
              <p className="px-3 py-4 text-center text-[13px] text-ink-muted">
                No recent searches
              </p>
            )}

            {entries.map((entry) => (
              <button
                key={entry.id}
                className="group flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-[var(--surface-raised)]"
                onClick={() => {
                  onSelectQuery(entry.query, entry.activeTab);
                  setIsOpen(false);
                }}
                type="button"
              >
                <Clock
                  className="shrink-0 text-ink-muted/50"
                  size={14}
                  weight="regular"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-normal text-ink">
                    {entry.query}
                  </p>
                  <p className="text-[11px] text-ink-muted/60">
                    {TAB_LABELS[entry.activeTab] ?? entry.activeTab}
                    {" \u00b7 "}
                    {formatRelativeTime(entry.createdAt)}
                  </p>
                </div>
                <button
                  aria-label={`Delete "${entry.query}"`}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-ink-muted/40 opacity-0 transition-all hover:bg-black/[0.06] hover:text-ink group-hover:opacity-100"
                  onClick={(e) => void handleDelete(entry.id, e)}
                  type="button"
                >
                  <X size={12} weight="bold" />
                </button>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
