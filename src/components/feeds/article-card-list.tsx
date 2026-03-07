"use client";

import { cn } from "@/lib/utils";
import { estimateReadingTime } from "@/lib/feeds/reading-time";
import type { FeedArticleWithStatus } from "@/types/feed";

function formatRelativeTime(date: Date | null): string {
  if (!date) return "";

  const now = Date.now();
  const then = new Date(date).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;

  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;

  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays < 30) return `${diffDays}d ago`;

  return new Date(date).toLocaleDateString();
}

interface ArticleCardListProps {
  article: FeedArticleWithStatus;
  isSelected: boolean;
  onClick: () => void;
}

export function ArticleCardList({
  article,
  isSelected,
  onClick,
}: ArticleCardListProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
        isSelected ? "bg-brand/5 border border-brand/20" : "hover:bg-surface-raised/50",
        !article.isRead ? "font-medium" : "text-ink-muted"
      )}
    >
      {!article.isRead && (
        <span className="w-2 h-2 rounded-full bg-brand shrink-0" />
      )}
      {article.isRead && <span className="w-2 h-2 shrink-0" aria-hidden="true" />}
      <span
        className={cn(
          "flex-1 text-sm truncate",
          !article.isRead ? "text-ink" : "text-ink-muted"
        )}
      >
        {article.title}
      </span>
      <span className="text-xs text-ink-muted shrink-0 hidden md:inline">
        {article.feedSourceTitle}
      </span>
      <span className="text-xs text-ink-muted shrink-0">
        {formatRelativeTime(article.publishedAt)}
      </span>
      <span className="text-xs text-ink-muted shrink-0 hidden lg:inline">
        {estimateReadingTime(article.abstractSnippet)}
      </span>
    </button>
  );
}
