"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Checks,
  Export,
  Upload,
  List,
  SquaresFour,
  Rows,
  SortAscending,
  SortDescending,
  MagnifyingGlass,
  Rss,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useFeedStore } from "@/stores/feed-store";
import { FeedSidebar } from "@/components/feeds/feed-sidebar";
import { ArticleList } from "@/components/feeds/article-list";
import { ArticleReader } from "@/components/feeds/article-reader";
import { CopilotPanel } from "@/components/feeds/copilot-panel";
import { EmptyState } from "@/components/ui/empty-state";
import { AddFeedModal } from "@/components/feeds/add-feed-modal";
import { CitationModal } from "@/components/feeds/citation-modal";
import type { FeedArticleWithStatus } from "@/types/feed";

export default function FeedsPage() {
  const {
    subscriptions,
    articles,
    selectedArticleId,
    isLoadingSubscriptions,
    totalUnread,
    error,
    copilotOpen,
    sortBy,
    layout,
    loadSubscriptions,
    loadArticles,
    markAllRead,
    setSelectedArticle,
    setSortBy,
    setLayout,
    openCopilot,
    clearError,
  } = useFeedStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [citeArticle, setCiteArticle] = useState<FeedArticleWithStatus | null>(null);

  // Load subscriptions on mount
  useEffect(() => {
    loadSubscriptions();
    loadArticles();
  }, [loadSubscriptions, loadArticles]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const currentIndex = articles.findIndex((a) => a.id === selectedArticleId);

      switch (e.key) {
        case "j":
          if (currentIndex < articles.length - 1) {
            setSelectedArticle(articles[currentIndex + 1].id);
          }
          break;
        case "k":
          if (currentIndex > 0) {
            setSelectedArticle(articles[currentIndex - 1].id);
          }
          break;
        case "o":
          if (selectedArticleId) {
            const article = articles.find((a) => a.id === selectedArticleId);
            if (article?.link) window.open(article.link, "_blank");
          }
          break;
        case "s":
          if (selectedArticleId) {
            useFeedStore.getState().toggleStar(selectedArticleId);
          }
          break;
        case "c":
          if (selectedArticleId) {
            const citeTarget = articles.find((a) => a.id === selectedArticleId);
            if (citeTarget) setCiteArticle(citeTarget);
          }
          break;
        case "a":
          if (selectedArticleId) {
            const { copilotOpen: isOpen, openCopilot: doOpen, closeCopilot: doClose } = useFeedStore.getState();
            if (isOpen) doClose();
            else doOpen();
          }
          break;
        case "/":
          e.preventDefault();
          document.querySelector<HTMLInputElement>('input[placeholder*="Search"]')?.focus();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [articles, selectedArticleId, setSelectedArticle]);

  const hasSubscriptions = subscriptions.length > 0 || isLoadingSubscriptions;

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      {/* Header */}
      <div className="flex items-center justify-between px-1 mb-4 shrink-0">
        <div>
          <h1 className="text-xl font-bold text-ink">Journal Feed</h1>
          {totalUnread > 0 && (
            <p className="text-xs text-ink-muted mt-0.5">
              {totalUnread} unread article{totalUnread !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={async () => {
              const res = await fetch("/api/feeds/opml/export");
              if (res.ok) {
                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "scholarsync-feeds.opml";
                a.click();
                URL.revokeObjectURL(url);
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          >
            <Export size={16} />
            Export
          </button>
          <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors cursor-pointer">
            <Upload size={16} />
            Import
            <input
              type="file"
              accept=".opml,.xml"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const text = await file.text();
                const res = await fetch("/api/feeds/opml/import", {
                  method: "POST",
                  headers: { "Content-Type": "application/xml" },
                  body: text,
                });
                const data = await res.json();
                if (res.ok) {
                  alert(`Imported ${data.imported} feeds, ${data.skipped} already subscribed, ${data.failed} failed.`);
                  useFeedStore.getState().loadSubscriptions();
                } else {
                  alert(data.error || "Import failed");
                }
                e.target.value = "";
              }}
            />
          </label>
          <button
            onClick={() => markAllRead()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          >
            <Checks size={16} />
            Mark all read
          </button>
          <div className="flex items-center bg-surface-raised rounded-xl p-0.5">
            {([
              { key: "newest", icon: SortDescending, label: "Newest" },
              { key: "oldest", icon: SortAscending, label: "Oldest" },
              { key: "relevance", icon: MagnifyingGlass, label: "Relevance" },
            ] as const).map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-xs font-medium transition-colors",
                  sortBy === key
                    ? "bg-surface text-ink shadow-sm"
                    : "text-ink-muted hover:text-ink"
                )}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
          <div className="flex items-center bg-surface-raised rounded-lg p-0.5">
            {([
              { key: "list", icon: Rows, label: "List" },
              { key: "card", icon: SquaresFour, label: "Card" },
              { key: "magazine", icon: List, label: "Magazine" },
            ] as const).map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setLayout(key)}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  layout === key ? "bg-surface text-ink shadow-sm" : "text-ink-muted hover:text-ink"
                )}
                title={label}
                aria-label={label}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors"
          >
            <Plus size={16} weight="bold" />
            Add Feed
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mx-1 mb-3 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center justify-between shrink-0">
          <span>{error}</span>
          <button onClick={clearError} className="text-red-400 hover:text-red-300 text-xs font-medium">
            Dismiss
          </button>
        </div>
      )}

      {/* Main content */}
      {!hasSubscriptions ? (
        <EmptyState
          icon={Rss}
          title="Your Journal Feed is empty"
          description="Subscribe to medical journals, PubMed searches, or any RSS feed to stay current with the latest research."
          actionLabel="Add Your First Feed"
          onAction={() => setShowAddModal(true)}
        />
      ) : (
        <div className="flex gap-4 flex-1 min-h-0">
          <div className="hidden lg:block w-56 shrink-0">
            <FeedSidebar />
          </div>
          <div className="flex-1 min-w-0">
            <ArticleList
              onCite={(id) => {
                const a = articles.find((x) => x.id === id);
                if (a) setCiteArticle(a);
              }}
              onAI={(id) => {
                setSelectedArticle(id);
                setTimeout(() => useFeedStore.getState().openCopilot(), 50);
              }}
            />
          </div>
          {selectedArticleId && (
            <div className="hidden xl:block w-[420px] shrink-0">
              {copilotOpen ? (
                <CopilotPanel />
              ) : (
                <ArticleReader
                  onOpenCopilot={() => openCopilot()}
                  onCite={(id) => {
                    const a = articles.find((x) => x.id === id);
                    if (a) setCiteArticle(a);
                  }}
                />
              )}
            </div>
          )}
        </div>
      )}

      <AddFeedModal open={showAddModal} onClose={() => setShowAddModal(false)} />
      <CitationModal article={citeArticle} onClose={() => setCiteArticle(null)} />
    </div>
  );
}
