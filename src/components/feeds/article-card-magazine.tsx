"use client";
/* eslint-disable @next/next/no-img-element */

import {
  ArrowSquareOut,
  BookmarkSimple,
  Quotes,
  Sparkle,
  Star,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useFeedStore } from "@/stores/feed-store";
import { estimateReadingTime } from "@/lib/feeds/reading-time";
import { getFaviconUrl } from "@/lib/feeds/favicon";
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

interface ArticleCardMagazineProps {
  article: FeedArticleWithStatus;
  isSelected: boolean;
  onClick: () => void;
  onCite?: () => void;
  onAI?: () => void;
}

export function ArticleCardMagazine({
  article,
  isSelected,
  onClick,
  onCite,
  onAI,
}: ArticleCardMagazineProps) {
  const toggleStar = useFeedStore((s) => s.toggleStar);
  const saveToLibrary = useFeedStore((s) => s.saveToLibrary);
  const faviconSrc =
    article.feedSourceFaviconUrl ||
    getFaviconUrl(article.feedSourceSiteUrl ?? article.link ?? "");

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left glass-panel rounded-2xl overflow-hidden transition-all",
        isSelected ? "ring-2 ring-brand/30" : "hover:ring-1 hover:ring-border"
      )}
    >
      {article.imageUrl && (
        <div className="w-full h-48 bg-surface-raised overflow-hidden">
          { }
          <img alt=""
            src={article.imageUrl}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3 text-xs text-ink-muted">
          {!article.isRead && <span className="w-2 h-2 rounded-full bg-brand shrink-0" />}
          {faviconSrc && (
            <img alt=""
              src={faviconSrc}
              className="w-4 h-4 rounded shrink-0"
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          )}
          <span className="truncate">{article.feedSourceTitle}</span>
          <span>·</span>
          <span>{formatRelativeTime(article.publishedAt)}</span>
          <span>·</span>
          <span>{estimateReadingTime(article.abstractSnippet)}</span>
        </div>
        <h3
          className={cn(
            "text-base mb-2 line-clamp-2",
            !article.isRead ? "font-bold text-ink" : "font-medium text-ink-muted"
          )}
        >
          {article.title}
        </h3>
        {article.authors && (
          <p className="text-xs text-ink-muted mb-2 truncate">{article.authors}</p>
        )}
        {article.abstractSnippet && (
          <p className="text-sm text-ink-muted line-clamp-3 leading-relaxed">
            {article.abstractSnippet}
          </p>
        )}
        <div className="flex items-center gap-3 mt-4" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => toggleStar(article.id)}
            className={cn(
              "p-1 rounded-md transition-colors",
              article.isStarred ? "text-yellow-500 hover:text-yellow-400" : "text-ink-muted hover:text-ink"
            )}
            title={article.isStarred ? "Unstar" : "Star"}
          >
            <Star size={14} weight={article.isStarred ? "fill" : "regular"} />
          </button>
          <button
            onClick={() => saveToLibrary(article.id)}
            className={cn(
              "p-1 rounded-md transition-colors",
              article.isSavedToLibrary ? "text-brand" : "text-ink-muted hover:text-ink"
            )}
            title={article.isSavedToLibrary ? "Saved" : "Save to Library"}
          >
            <BookmarkSimple size={14} weight={article.isSavedToLibrary ? "fill" : "regular"} />
          </button>
          {onCite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCite();
              }}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-ink-muted hover:text-brand hover:bg-brand/5 transition-colors"
            >
              <Quotes size={14} />
              Cite
            </button>
          )}
          {onAI && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAI();
              }}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-brand/70 hover:text-brand hover:bg-brand/5 transition-colors"
            >
              <Sparkle size={12} weight="fill" />
              AI
            </button>
          )}
          {article.link && (
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-ink-muted hover:text-brand transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ArrowSquareOut size={12} />
              Open
            </a>
          )}
        </div>
      </div>
    </button>
  );
}
