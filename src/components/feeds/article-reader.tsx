"use client";

import { Star, BookmarkSimple, ArrowSquareOut, Quotes, Sparkle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useFeedStore } from "@/stores/feed-store";

interface ArticleReaderProps {
  onCite?: (articleId: number) => void;
  onOpenCopilot?: () => void;
}

export function ArticleReader({ onCite, onOpenCopilot }: ArticleReaderProps) {
  const articles = useFeedStore((s) => s.articles);
  const selectedArticleId = useFeedStore((s) => s.selectedArticleId);
  const toggleStar = useFeedStore((s) => s.toggleStar);
  const saveToLibrary = useFeedStore((s) => s.saveToLibrary);

  const article = articles.find((a) => a.id === selectedArticleId);

  if (!article) {
    return (
      <div className="glass-panel rounded-2xl h-full flex items-center justify-center">
        <p className="text-sm text-ink-muted">Select an article to read</p>
      </div>
    );
  }

  const journalInfo = [article.journal, article.volume && `Vol. ${article.volume}`, article.issue && `Issue ${article.issue}`]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="glass-panel rounded-2xl h-full overflow-y-auto p-5">
      {/* Title */}
      <h2 className="text-lg font-bold text-ink leading-snug mb-3">
        {article.title}
      </h2>

      {/* Authors */}
      {article.authors && (
        <p className="text-sm text-ink-muted mb-2">{article.authors}</p>
      )}

      {/* Journal info */}
      {journalInfo && (
        <p className="text-xs text-ink-muted/70 mb-1">{journalInfo}</p>
      )}

      {/* Published date */}
      {article.publishedAt && (
        <p className="text-xs text-ink-muted/70 mb-4">
          Published {new Date(article.publishedAt).toLocaleDateString()}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border-subtle">
        <button
          onClick={() => toggleStar(article.id)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
            article.isStarred
              ? "bg-yellow-500/10 text-yellow-500"
              : "bg-surface-raised text-ink-muted hover:text-ink"
          )}
        >
          <Star size={14} weight={article.isStarred ? "fill" : "regular"} />
          {article.isStarred ? "Starred" : "Star"}
        </button>
        <button
          onClick={() => saveToLibrary(article.id)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
            article.isSavedToLibrary
              ? "bg-brand/10 text-brand"
              : "bg-surface-raised text-ink-muted hover:text-ink"
          )}
        >
          <BookmarkSimple size={14} weight={article.isSavedToLibrary ? "fill" : "regular"} />
          {article.isSavedToLibrary ? "Saved" : "Save"}
        </button>
        {onCite && (
          <button
            onClick={() => onCite(article.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-raised text-ink-muted hover:text-ink transition-colors"
          >
            <Quotes size={14} />
            Cite
          </button>
        )}
        {onOpenCopilot && (
          <button
            onClick={onOpenCopilot}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand/10 text-brand hover:bg-brand/15 border border-brand/20 transition-colors"
          >
            <Sparkle size={14} weight="fill" />
            AI
          </button>
        )}
        {article.link && (
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-raised text-ink-muted hover:text-ink transition-colors"
          >
            <ArrowSquareOut size={14} />
            Open Original
          </a>
        )}
      </div>

      {/* Abstract */}
      {article.abstractSnippet && (
        <div>
          <h3 className="text-sm font-semibold text-ink mb-2">Abstract</h3>
          <p className="text-sm text-ink-muted leading-relaxed">
            {article.abstractSnippet}
          </p>
        </div>
      )}

      {/* DOI */}
      {article.doi && (
        <p className="mt-4 text-xs text-ink-muted">
          DOI:{" "}
          <a
            href={`https://doi.org/${article.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            {article.doi}
          </a>
        </p>
      )}
    </div>
  );
}
