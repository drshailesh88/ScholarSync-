"use client";

import {
  MagnifyingGlass,
  FunnelSimple,
  SortAscending,
  SortDescending,
  X,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useFeedStore } from "@/stores/feed-store";

export function ArticleSearchBar() {
  const {
    searchQuery,
    setSearchQuery,
    filterDateFrom,
    filterDateTo,
    filterJournal,
    sortBy,
    sortDir,
    showAdvancedFilters,
    toggleAdvancedFilters,
    setDateRange,
    setFilterJournal,
    setSortBy,
    setSort,
    clearFilters,
    availableJournals,
  } = useFeedStore();

  const hasActiveFilters = !!(filterDateFrom || filterDateTo || filterJournal);
  const currentLegacySort = sortBy === "relevance" ? "title" : "published";

  return (
    <div className="space-y-2 mb-3">
      {/* Search + filter toggle row */}
      <div className="flex gap-2">
        {/* Search input */}
        <div className="relative flex-1">
          <MagnifyingGlass
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
          />
          <input aria-label="Text input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-raised border border-border text-ink placeholder:text-ink-muted text-xs focus:outline-none focus:ring-2 focus:ring-brand/40 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter toggle */}
        <button
          onClick={toggleAdvancedFilters}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors",
            hasActiveFilters
              ? "bg-brand/10 text-brand border-brand/20"
              : "bg-surface-raised text-ink-muted border-border hover:text-ink"
          )}
        >
          <FunnelSimple size={14} />
          Filters
          {hasActiveFilters && (
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
          )}
        </button>

        {/* Sort toggle */}
        <button
          onClick={() => setSortBy(sortBy === "oldest" ? "newest" : "oldest")}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium bg-surface-raised text-ink-muted border border-border hover:text-ink transition-colors"
        >
          {sortBy === "oldest" ? (
            <SortAscending size={14} />
          ) : (
            <SortDescending size={14} />
          )}
        </button>
      </div>

      {/* Advanced filter panel (collapsible) */}
      {showAdvancedFilters && (
        <div className="glass-panel rounded-xl p-3 space-y-3">
          <div className="flex gap-3">
            {/* Date from */}
            <div className="flex-1">
              <label className="text-[10px] text-ink-muted font-medium uppercase tracking-wide">
                From
              </label>
              <input aria-label="Date"
                type="date"
                value={filterDateFrom || ""}
                onChange={(e) =>
                  setDateRange(e.target.value || null, filterDateTo)
                }
                className="w-full mt-1 px-2 py-1.5 rounded-lg bg-surface-raised border border-border text-ink text-xs focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
            </div>

            {/* Date to */}
            <div className="flex-1">
              <label className="text-[10px] text-ink-muted font-medium uppercase tracking-wide">
                To
              </label>
              <input aria-label="Date"
                type="date"
                value={filterDateTo || ""}
                onChange={(e) =>
                  setDateRange(filterDateFrom, e.target.value || null)
                }
                className="w-full mt-1 px-2 py-1.5 rounded-lg bg-surface-raised border border-border text-ink text-xs focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
            </div>
          </div>

          {/* Journal dropdown */}
          <div>
            <label className="text-[10px] text-ink-muted font-medium uppercase tracking-wide">
              Journal
            </label>
            <select aria-label="Select option"
              value={filterJournal || ""}
              onChange={(e) => setFilterJournal(e.target.value || null)}
              className="w-full mt-1 px-2 py-1.5 rounded-lg bg-surface-raised border border-border text-ink text-xs focus:outline-none focus:ring-2 focus:ring-brand/40"
            >
              <option value="">All journals</option>
              {availableJournals.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
          </div>

          {/* Sort by */}
          <div>
            <label className="text-[10px] text-ink-muted font-medium uppercase tracking-wide">
              Sort by
            </label>
            <div className="flex gap-1 mt-1">
              {(["published", "added", "title"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSort(s, sortDir)}
                  className={cn(
                    "flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    currentLegacySort === s
                      ? "bg-brand/10 text-brand border border-brand/20"
                      : "bg-surface-raised text-ink-muted border border-border hover:text-ink"
                  )}
                >
                  {s === "published"
                    ? "Date"
                    : s === "added"
                      ? "Added"
                      : "Title"}
                </button>
              ))}
            </div>
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full py-1.5 rounded-lg text-xs text-ink-muted hover:text-ink transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
