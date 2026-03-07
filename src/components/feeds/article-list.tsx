"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useFeedStore } from "@/stores/feed-store";
import { ArticleCard } from "@/components/feeds/article-card";
import { ArticleCardList } from "@/components/feeds/article-card-list";
import { ArticleCardMagazine } from "@/components/feeds/article-card-magazine";
import { ArticleSearchBar } from "@/components/feeds/article-search-bar";
import { SkeletonCard } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Newspaper } from "@phosphor-icons/react";

interface ArticleListProps {
  onCite?: (articleId: number) => void;
  onAI?: (articleId: number) => void;
}

export function ArticleList({ onCite, onAI }: ArticleListProps) {
  const articles = useFeedStore((s) => s.articles);
  const isLoading = useFeedStore((s) => s.isLoadingArticles);
  const hasMore = useFeedStore((s) => s.hasMore);
  const layout = useFeedStore((s) => s.layout);
  const selectedArticleId = useFeedStore((s) => s.selectedArticleId);
  const setSelectedArticle = useFeedStore((s) => s.setSelectedArticle);
  const loadMore = useFeedStore((s) => s.loadMore);

  useEffect(() => {
    useFeedStore.getState().loadJournals();
  }, []);

  if (isLoading && articles.length === 0) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!isLoading && articles.length === 0) {
    return (
      <EmptyState
        icon={Newspaper}
        title="No articles"
        description="No articles match your current filters. Try selecting a different feed or changing the view filter."
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ArticleSearchBar />
      <div
        className={cn(
          "flex-1 overflow-y-auto",
          layout === "magazine" ? "space-y-4" : "space-y-1"
        )}
      >
        {articles.map((article) => {
          const Card =
            layout === "list"
              ? ArticleCardList
              : layout === "magazine"
                ? ArticleCardMagazine
                : ArticleCard;

          return (
            <Card
              key={article.id}
              article={article}
              isSelected={article.id === selectedArticleId}
              onClick={() => setSelectedArticle(article.id)}
              onCite={onCite ? () => onCite(article.id) : undefined}
              onAI={onAI ? () => onAI(article.id) : undefined}
            />
          );
        })}
      </div>

      {hasMore && (
        <div className="pt-3 pb-1 shrink-0">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="w-full py-2 rounded-xl text-sm font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
