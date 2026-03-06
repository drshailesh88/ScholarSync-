"use client";

import { Rss, Star, Circle, FunnelSimple } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useFeedStore, type ViewFilter } from "@/stores/feed-store";

const viewFilters: { key: ViewFilter; label: string }[] = [
  { key: "all", label: "All Articles" },
  { key: "unread", label: "Unread" },
  { key: "starred", label: "Starred" },
];

export function FeedSidebar() {
  const subscriptions = useFeedStore((s) => s.subscriptions);
  const viewFilter = useFeedStore((s) => s.viewFilter);
  const selectedFeedId = useFeedStore((s) => s.selectedFeedId);
  const selectedFolder = useFeedStore((s) => s.selectedFolder);
  const setViewFilter = useFeedStore((s) => s.setViewFilter);
  const setSelectedFeed = useFeedStore((s) => s.setSelectedFeed);
  const setSelectedFolder = useFeedStore((s) => s.setSelectedFolder);

  // Group subscriptions by folder
  const folders = new Map<string, typeof subscriptions>();
  const ungrouped: typeof subscriptions = [];

  for (const sub of subscriptions) {
    if (sub.folder) {
      const list = folders.get(sub.folder) || [];
      list.push(sub);
      folders.set(sub.folder, list);
    } else {
      ungrouped.push(sub);
    }
  }

  const isAllSelected = !selectedFeedId && !selectedFolder;

  return (
    <div className="glass-panel rounded-2xl h-full overflow-y-auto p-3">
      {/* View filters */}
      <div className="mb-3 pb-3 border-b border-border-subtle">
        <div className="flex items-center gap-1.5 px-2 mb-2 text-[10px] font-semibold tracking-widest text-ink-muted/60">
          <FunnelSimple size={12} />
          FILTER
        </div>
        {viewFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => {
              setViewFilter(f.key);
              setSelectedFeed(null);
              setSelectedFolder(null);
            }}
            className={cn(
              "flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              viewFilter === f.key && isAllSelected
                ? "bg-surface-raised text-ink"
                : "text-ink-muted hover:text-ink hover:bg-surface-raised/50"
            )}
          >
            {f.key === "starred" ? (
              <Star size={16} weight={viewFilter === "starred" && isAllSelected ? "fill" : "regular"} />
            ) : f.key === "unread" ? (
              <Circle size={16} weight="fill" className="text-brand" />
            ) : (
              <Rss size={16} />
            )}
            {f.label}
          </button>
        ))}
      </div>

      {/* Folders */}
      {Array.from(folders.entries()).map(([folder, subs]) => (
        <div key={folder} className="mb-2">
          <button
            onClick={() => setSelectedFolder(folder)}
            className={cn(
              "flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors",
              selectedFolder === folder
                ? "bg-surface-raised text-ink"
                : "text-ink-muted hover:text-ink"
            )}
          >
            {folder}
            <span className="text-[10px] tabular-nums text-ink-muted">
              {subs.reduce((sum, s) => sum + s.unreadCount, 0)}
            </span>
          </button>
          <div className="ml-2">
            {subs.map((sub) => (
              <FeedItem
                key={sub.id}
                name={sub.displayName || sub.feedSource.title}
                unreadCount={sub.unreadCount}
                isSelected={selectedFeedId === sub.feedSourceId}
                onClick={() => setSelectedFeed(sub.feedSourceId)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Ungrouped feeds */}
      {ungrouped.length > 0 && (
        <div>
          <div className="px-3 mb-1 text-[10px] font-semibold tracking-widest text-ink-muted/60">
            FEEDS
          </div>
          {ungrouped.map((sub) => (
            <FeedItem
              key={sub.id}
              name={sub.displayName || sub.feedSource.title}
              unreadCount={sub.unreadCount}
              isSelected={selectedFeedId === sub.feedSourceId}
              onClick={() => setSelectedFeed(sub.feedSourceId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FeedItem({
  name,
  unreadCount,
  isSelected,
  onClick,
}: {
  name: string;
  unreadCount: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-sm transition-colors",
        isSelected
          ? "bg-surface-raised text-ink font-medium"
          : "text-ink-muted hover:text-ink hover:bg-surface-raised/50"
      )}
    >
      <span className="truncate">{name}</span>
      {unreadCount > 0 && (
        <span className="ml-2 text-[10px] font-medium tabular-nums px-1.5 py-0.5 rounded-full bg-brand/10 text-brand shrink-0">
          {unreadCount}
        </span>
      )}
    </button>
  );
}
