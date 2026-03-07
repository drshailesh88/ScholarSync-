"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { Rss, Star, Circle, FunnelSimple, Bell, BellSlash } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { getFaviconUrl } from "@/lib/feeds/favicon";
import { useFeedStore, type ViewFilter } from "@/stores/feed-store";
import type { FeedSubscription } from "@/types/feed";

const viewFilters: { key: ViewFilter; label: string }[] = [
  { key: "all", label: "All Articles" },
  { key: "unread", label: "Unread" },
  { key: "starred", label: "Starred" },
];

export function FeedSidebar() {
  const [pendingMuteId, setPendingMuteId] = useState<number | null>(null);
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
                sub={sub}
                isSelected={selectedFeedId === sub.feedSourceId}
                onClick={() => setSelectedFeed(sub.feedSourceId)}
                onToggleMute={async () => {
                  try {
                    setPendingMuteId(sub.id);
                    await fetch(`/api/feeds/${sub.id}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ isMuted: !sub.isMuted }),
                    });
                    await useFeedStore.getState().loadSubscriptions();
                  } finally {
                    setPendingMuteId(null);
                  }
                }}
                isPending={pendingMuteId === sub.id}
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
              sub={sub}
              isSelected={selectedFeedId === sub.feedSourceId}
              onClick={() => setSelectedFeed(sub.feedSourceId)}
              onToggleMute={async () => {
                try {
                  setPendingMuteId(sub.id);
                  await fetch(`/api/feeds/${sub.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ isMuted: !sub.isMuted }),
                  });
                  await useFeedStore.getState().loadSubscriptions();
                } finally {
                  setPendingMuteId(null);
                }
              }}
              isPending={pendingMuteId === sub.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FeedItem({
  sub,
  isSelected,
  onClick,
  onToggleMute,
  isPending,
}: {
  sub: FeedSubscription;
  isSelected: boolean;
  onClick: () => void;
  onToggleMute: () => void | Promise<void>;
  isPending: boolean;
}) {
  const name = sub.displayName || sub.feedSource.title;
  const faviconSrc =
    sub.feedSource.faviconUrl ||
    getFaviconUrl(sub.feedSource.siteUrl ?? sub.feedSource.feedUrl);

  return (
    <div
      className={cn(
        "flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-sm transition-colors group",
        sub.isMuted && "opacity-50",
        isSelected
          ? "bg-surface-raised text-ink font-medium"
          : "text-ink-muted hover:text-ink hover:bg-surface-raised/50"
      )}
    >
      <button onClick={onClick} className="flex items-center gap-2 min-w-0 flex-1 text-left">
        {faviconSrc && (
          <img
            src={faviconSrc}
            alt=""
            className="w-4 h-4 rounded shrink-0"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        )}
        <span className="truncate">{name}</span>
      </button>
      <span className="flex items-center gap-1.5 ml-2 shrink-0">
        {sub.unreadCount > 0 && (
          <span className="text-[10px] font-medium tabular-nums px-1.5 py-0.5 rounded-full bg-brand/10 text-brand shrink-0">
            {sub.unreadCount}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            void onToggleMute();
          }}
          disabled={isPending}
          className="opacity-0 group-hover:opacity-100 p-1 rounded text-ink-muted hover:text-ink transition-all disabled:opacity-40"
          title={sub.isMuted ? "Unmute" : "Mute"}
        >
          {sub.isMuted ? <BellSlash size={14} /> : <Bell size={14} />}
        </button>
      </span>
    </div>
  );
}
