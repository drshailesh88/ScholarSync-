/**
 * Zustand store for the Journal Feed reader.
 *
 * Manages subscriptions, articles, filters, and optimistic updates.
 * No persist middleware — feed data is always fetched fresh from the server.
 */

import { create } from "zustand";
import type {
  FeedSubscription,
  FeedArticleWithStatus,
} from "@/types/feed";

// ── Types ───────────────────────────────────────────────────────────

export type ViewFilter = "all" | "unread" | "starred";

interface FeedStore {
  // ── State ──────────────────────────────────────────────────────────

  /** List of user's feed subscriptions */
  subscriptions: FeedSubscription[];

  /** Articles for the current view */
  articles: FeedArticleWithStatus[];

  /** Currently selected feed source ID (null = all feeds) */
  selectedFeedId: number | null;

  /** Currently selected folder filter (null = all folders) */
  selectedFolder: string | null;

  /** Current view filter: all articles, unread only, or starred only */
  viewFilter: ViewFilter;

  /** Whether subscriptions are loading */
  isLoadingSubscriptions: boolean;

  /** Whether articles are loading */
  isLoadingArticles: boolean;

  /** Total unread count across all feeds */
  totalUnread: number;

  /** Whether more articles are available (pagination) */
  hasMore: boolean;

  /** Current page (0-indexed) */
  page: number;

  /** Currently selected article (for reading pane) */
  selectedArticleId: number | null;

  /** Current search query for articles */
  searchQuery: string;

  /** Advanced filter: date from (ISO string) */
  filterDateFrom: string | null;

  /** Advanced filter: date to (ISO string) */
  filterDateTo: string | null;

  /** Advanced filter: specific journal */
  filterJournal: string | null;

  /** Article sort order */
  sortBy: "newest" | "oldest" | "relevance";

  /** Compatibility sort direction for advanced search controls */
  sortDir: "asc" | "desc";

  /** Article list layout */
  layout: "list" | "card" | "magazine";

  /** Whether the advanced filter panel is expanded */
  showAdvancedFilters: boolean;

  /** Available journal names for the dropdown */
  availableJournals: string[];

  /** Error message (null when no error) */
  error: string | null;

  // ── Copilot state ────────────────────────────────────────────────

  /** Whether the copilot panel is open */
  copilotOpen: boolean;

  /** Source tier for the current article */
  copilotSourceTier: "full_paper" | "abstract_only" | "title_only" | null;

  /** Source label (human-readable) */
  copilotSourceLabel: string | null;

  /** Chat messages for the copilot */
  copilotMessages: Array<{
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
  }>;

  /** Whether the copilot is generating a response */
  copilotLoading: boolean;

  /** Suggested follow-up questions */
  copilotSuggestions: string[];

  /** Summary cache: articleId → summary (avoids re-generating) */
  copilotSummaryCache: Record<number, string>;

  /** Related papers for the current article */
  relatedPapers: Array<{
    title: string;
    authors: string[];
    journal: string;
    year: number;
    doi: string | null;
    pmid: string | null;
    abstract: string | null;
    citationCount: number;
    isOpenAccess: boolean;
    openAccessPdfUrl: string | null;
  }>;

  /** Whether related papers are loading */
  relatedPapersLoading: boolean;

  /** Source message for related papers */
  relatedPapersSource: string | null;

  // ── Actions ────────────────────────────────────────────────────────

  /** Fetch subscriptions from the server */
  loadSubscriptions: () => Promise<void>;

  /** Fetch articles with current filters. reset=true clears existing articles. */
  loadArticles: (reset?: boolean) => Promise<void>;

  /** Load the next page of articles (append to existing) */
  loadMore: () => Promise<void>;

  /** Subscribe to a feed by URL */
  subscribe: (feedUrl: string) => Promise<void>;

  /** Subscribe to a PubMed search query */
  subscribePubMed: (query: string) => Promise<void>;

  /** Unsubscribe from a feed */
  unsubscribe: (subscriptionId: number) => Promise<void>;

  /** Mark an article as read — optimistic update */
  markRead: (articleId: number) => void;

  /** Toggle star on an article — optimistic update */
  toggleStar: (articleId: number) => void;

  /** Save an article to the Library — returns paperId */
  saveToLibrary: (articleId: number) => Promise<number | null>;

  /** Mark all articles as read (optionally for a specific feed) */
  markAllRead: (feedSourceId?: number) => Promise<void>;

  /** Set the selected feed (triggers article reload) */
  setSelectedFeed: (feedId: number | null) => void;

  /** Set the selected folder (triggers article reload) */
  setSelectedFolder: (folder: string | null) => void;

  /** Set the view filter (triggers article reload) */
  setViewFilter: (filter: ViewFilter) => void;

  /** Set the selected article for the reading pane */
  setSelectedArticle: (articleId: number | null) => void;

  /** Set search query and reload articles */
  setSearchQuery: (query: string) => void;

  /** Clear search */
  clearSearch: () => void;

  /** Set date range filter */
  setDateRange: (from: string | null, to: string | null) => void;

  /** Set journal filter */
  setFilterJournal: (journal: string | null) => void;

  /** Set article sort order */
  setSortBy: (sortBy: "newest" | "oldest" | "relevance") => void;

  /** Set sort options */
  setSort: (
    sortBy: "published" | "added" | "title" | "newest" | "oldest" | "relevance",
    sortDir: "asc" | "desc"
  ) => void;

  /** Set article list layout */
  setLayout: (layout: "list" | "card" | "magazine") => void;

  /** Toggle advanced filters panel visibility */
  toggleAdvancedFilters: () => void;

  /** Clear all advanced filters */
  clearFilters: () => void;

  /** Load available journal names for dropdown */
  loadJournals: () => Promise<void>;

  /** Clear error */
  clearError: () => void;

  // ── Copilot actions ──────────────────────────────────────────────

  /** Open the copilot panel for the selected article */
  openCopilot: () => void;

  /** Close the copilot panel */
  closeCopilot: () => void;

  /** Generate a summary for the selected article */
  summarizeArticle: () => Promise<void>;

  /** Send a chat message to the copilot */
  sendCopilotMessage: (question: string) => Promise<void>;

  /** Use a suggested question */
  useSuggestion: (question: string) => void;

  /** Find related papers for the selected article */
  findRelatedPapers: () => Promise<void>;

  /** Clear copilot state (when article changes) */
  clearCopilot: () => void;
}

// ── Store ────────────────────────────────────────────────────────────

export const useFeedStore = create<FeedStore>()((set, get) => ({
  // ── Initial state ──────────────────────────────────────────────────

  subscriptions: [],
  articles: [],
  selectedFeedId: null,
  selectedFolder: null,
  viewFilter: "unread",
  isLoadingSubscriptions: false,
  isLoadingArticles: false,
  totalUnread: 0,
  hasMore: false,
  page: 0,
  selectedArticleId: null,
  searchQuery: "",
  filterDateFrom: null,
  filterDateTo: null,
  filterJournal: null,
  sortBy: "newest",
  sortDir: "desc",
  layout: "card",
  showAdvancedFilters: false,
  availableJournals: [],
  error: null,

  // ── Copilot initial state ──────────────────────────────────────────
  copilotOpen: false,
  copilotSourceTier: null,
  copilotSourceLabel: null,
  copilotMessages: [],
  copilotLoading: false,
  copilotSuggestions: [],
  copilotSummaryCache: {},

  // ── Related papers initial state ──────────────────────────────────
  relatedPapers: [],
  relatedPapersLoading: false,
  relatedPapersSource: null,

  // ── loadSubscriptions ──────────────────────────────────────────────

  loadSubscriptions: async () => {
    set({ isLoadingSubscriptions: true, error: null });
    try {
      const res = await fetch("/api/feeds");
      if (!res.ok) throw new Error("Failed to load subscriptions");
      const data = await res.json();
      set({
        subscriptions: data.subscriptions,
        totalUnread: data.totalUnread,
        isLoadingSubscriptions: false,
      });
    } catch (err) {
      set({
        isLoadingSubscriptions: false,
        error:
          err instanceof Error ? err.message : "Failed to load subscriptions",
      });
    }
  },

  // ── loadArticles ───────────────────────────────────────────────────

  loadArticles: async (reset = true) => {
    const {
      selectedFeedId, selectedFolder, viewFilter, searchQuery,
      filterDateFrom, filterDateTo, filterJournal, sortBy, sortDir,
    } = get();
    const page = reset ? 0 : get().page;

    set({
      isLoadingArticles: true,
      error: null,
      ...(reset ? { articles: [], page: 0, selectedArticleId: null } : {}),
    });

    try {
      const params = new URLSearchParams();
      if (selectedFeedId) params.set("feedSourceId", String(selectedFeedId));
      if (selectedFolder) params.set("folder", selectedFolder);
      if (viewFilter === "unread") params.set("isRead", "false");
      if (viewFilter === "starred") params.set("isStarred", "true");
      if (searchQuery) params.set("search", searchQuery);
      if (filterDateFrom) params.set("dateFrom", filterDateFrom);
      if (filterDateTo) params.set("dateTo", filterDateTo);
      if (filterJournal) params.set("journal", filterJournal);
      if (sortBy !== "newest") params.set("sortBy", sortBy);
      params.set("sortDir", sortDir);
      params.set("page", String(page));
      params.set("perPage", "30");

      const res = await fetch(`/api/feeds/articles?${params}`);
      if (!res.ok) throw new Error("Failed to load articles");
      const data = await res.json();

      set((s) => ({
        articles: reset ? data.articles : [...s.articles, ...data.articles],
        hasMore: data.hasMore,
        page,
        isLoadingArticles: false,
      }));
    } catch (err) {
      set({
        isLoadingArticles: false,
        error:
          err instanceof Error ? err.message : "Failed to load articles",
      });
    }
  },

  // ── loadMore ───────────────────────────────────────────────────────

  loadMore: async () => {
    const { hasMore, isLoadingArticles, page } = get();
    if (!hasMore || isLoadingArticles) return;

    set({ page: page + 1 });
    await get().loadArticles(false);
  },

  // ── subscribe ──────────────────────────────────────────────────────

  subscribe: async (feedUrl) => {
    set({ error: null });
    try {
      const res = await fetch("/api/feeds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedUrl }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to subscribe");
      }
      await get().loadSubscriptions();
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to subscribe",
      });
      throw err;
    }
  },

  // ── subscribePubMed ────────────────────────────────────────────────

  subscribePubMed: async (query) => {
    set({ error: null });
    try {
      const res = await fetch("/api/feeds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pubmedQuery: query }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create PubMed feed");
      }
      await get().loadSubscriptions();
    } catch (err) {
      set({
        error:
          err instanceof Error
            ? err.message
            : "Failed to create PubMed feed",
      });
      throw err;
    }
  },

  // ── unsubscribe ────────────────────────────────────────────────────

  unsubscribe: async (subscriptionId) => {
    set({ error: null });
    try {
      const res = await fetch(`/api/feeds/${subscriptionId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to unsubscribe");

      set((s) => ({
        subscriptions: s.subscriptions.filter(
          (sub) => sub.id !== subscriptionId
        ),
      }));
    } catch (err) {
      set({
        error:
          err instanceof Error ? err.message : "Failed to unsubscribe",
      });
    }
  },

  // ── markRead (OPTIMISTIC) ──────────────────────────────────────────

  markRead: (articleId) => {
    const article = get().articles.find((a) => a.id === articleId);
    if (!article || article.isRead) return;

    set((s) => ({
      articles: s.articles.map((a) =>
        a.id === articleId ? { ...a, isRead: true } : a
      ),
      totalUnread: Math.max(0, s.totalUnread - 1),
    }));

    fetch(`/api/feeds/articles/${articleId}/read`, { method: "POST" }).catch(
      () => {
        set((s) => ({
          articles: s.articles.map((a) =>
            a.id === articleId ? { ...a, isRead: false } : a
          ),
          totalUnread: s.totalUnread + 1,
        }));
      }
    );
  },

  // ── toggleStar (OPTIMISTIC) ────────────────────────────────────────

  toggleStar: (articleId) => {
    const article = get().articles.find((a) => a.id === articleId);
    if (!article) return;

    const newStarred = !article.isStarred;

    set((s) => ({
      articles: s.articles.map((a) =>
        a.id === articleId ? { ...a, isStarred: newStarred } : a
      ),
    }));

    fetch(`/api/feeds/articles/${articleId}/star`, { method: "POST" }).catch(
      () => {
        set((s) => ({
          articles: s.articles.map((a) =>
            a.id === articleId ? { ...a, isStarred: !newStarred } : a
          ),
        }));
      }
    );
  },

  // ── saveToLibrary ──────────────────────────────────────────────────

  saveToLibrary: async (articleId) => {
    try {
      const res = await fetch(`/api/feeds/articles/${articleId}/save`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to save to library");
      const data = await res.json();

      set((s) => ({
        articles: s.articles.map((a) =>
          a.id === articleId
            ? { ...a, isSavedToLibrary: true, savedPaperId: data.paperId }
            : a
        ),
      }));

      return data.paperId;
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to save",
      });
      return null;
    }
  },

  // ── markAllRead ────────────────────────────────────────────────────

  markAllRead: async (feedSourceId) => {
    try {
      const res = await fetch("/api/feeds/articles/mark-all-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedSourceId }),
      });
      if (!res.ok) throw new Error("Failed to mark all read");

      set((s) => ({
        articles: s.articles.map((a) =>
          !feedSourceId || a.feedSourceId === feedSourceId
            ? { ...a, isRead: true }
            : a
        ),
        totalUnread: feedSourceId
          ? Math.max(
              0,
              s.totalUnread -
                s.articles.filter(
                  (a) => a.feedSourceId === feedSourceId && !a.isRead
                ).length
            )
          : 0,
      }));

      await get().loadSubscriptions();
    } catch (err) {
      set({
        error:
          err instanceof Error ? err.message : "Failed to mark all read",
      });
    }
  },

  // ── Filter setters (trigger article reload) ────────────────────────

  setSelectedFeed: (feedId) => {
    set({ selectedFeedId: feedId, selectedFolder: null, page: 0 });
    get().loadArticles();
  },

  setSelectedFolder: (folder) => {
    set({ selectedFolder: folder, selectedFeedId: null, page: 0 });
    get().loadArticles();
  },

  setViewFilter: (filter) => {
    set({ viewFilter: filter, page: 0 });
    get().loadArticles();
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query, page: 0 });
    get().loadArticles();
  },

  clearSearch: () => {
    set({ searchQuery: "", page: 0 });
    get().loadArticles();
  },

  setDateRange: (from, to) => {
    set({ filterDateFrom: from, filterDateTo: to, page: 0 });
    get().loadArticles();
  },

  setFilterJournal: (journal) => {
    set({ filterJournal: journal, page: 0 });
    get().loadArticles();
  },

  setSortBy: (sortBy) => {
    set({
      sortBy,
      sortDir: sortBy === "oldest" ? "asc" : "desc",
      page: 0,
    });
    get().loadArticles();
  },

  setSort: (sortBy, sortDir) => {
    const normalizedSortBy =
      sortBy === "title" || sortBy === "relevance"
        ? "relevance"
        : sortBy === "oldest" || sortDir === "asc"
          ? "oldest"
          : "newest";

    set({ sortBy: normalizedSortBy, sortDir, page: 0 });
    get().loadArticles();
  },

  setLayout: (layout) => {
    set({ layout });
  },

  toggleAdvancedFilters: () => {
    set((s) => ({ showAdvancedFilters: !s.showAdvancedFilters }));
  },

  clearFilters: () => {
    set({
      filterDateFrom: null,
      filterDateTo: null,
      filterJournal: null,
      page: 0,
    });
    get().loadArticles();
  },

  loadJournals: async () => {
    try {
      const res = await fetch("/api/feeds/articles/journals");
      if (!res.ok) return;
      const data = await res.json();
      set({ availableJournals: data.journals || [] });
    } catch {
      // Silently fail — journal list is non-critical
    }
  },

  setSelectedArticle: (articleId) => {
    const prev = get().selectedArticleId;
    set({ selectedArticleId: articleId });

    // Clear copilot when article changes
    if (articleId !== prev) {
      get().clearCopilot();
    }

    if (articleId) {
      const article = get().articles.find((a) => a.id === articleId);
      if (article && !article.isRead) {
        get().markRead(articleId);
      }
    }
  },

  clearError: () => set({ error: null }),

  // ── Copilot actions ────────────────────────────────────────────────

  openCopilot: () => {
    set({ copilotOpen: true });
  },

  closeCopilot: () => {
    set({ copilotOpen: false });
  },

  summarizeArticle: async () => {
    const articleId = get().selectedArticleId;
    if (!articleId) return;

    // Check cache first
    const cached = get().copilotSummaryCache[articleId];
    if (cached) {
      set((s) => ({
        copilotMessages: [
          ...s.copilotMessages,
          {
            id: `summary-${Date.now()}`,
            role: "assistant" as const,
            content: cached,
          },
        ],
      }));
      return;
    }

    const article = get().articles.find((a) => a.id === articleId);
    if (!article) return;

    const articleInput = {
      title: article.title,
      authors: article.authors,
      abstractSnippet: article.abstractSnippet,
      doi: article.doi,
      pubmedId: article.pubmedId,
      journal: article.journal,
      volume: article.volume,
      issue: article.issue,
      publishedAt:
        article.publishedAt instanceof Date
          ? article.publishedAt.toISOString()
          : article.publishedAt ?? null,
      link: article.link,
    };

    set({ copilotLoading: true });

    try {
      const res = await fetch("/api/feeds/copilot/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleInput),
      });

      if (!res.ok) throw new Error("Failed to generate summary");

      const data = await res.json();

      set((s) => ({
        copilotLoading: false,
        copilotSourceTier: data.sourceTier,
        copilotSourceLabel: data.sourceLabel,
        copilotSuggestions: data.suggestedQuestions || [],
        copilotMessages: [
          ...s.copilotMessages,
          {
            id: `summary-${Date.now()}`,
            role: "assistant" as const,
            content: data.summary,
          },
        ],
        copilotSummaryCache: {
          ...s.copilotSummaryCache,
          [articleId]: data.summary,
        },
      }));
    } catch (err) {
      set({
        copilotLoading: false,
        error:
          err instanceof Error ? err.message : "Failed to generate summary",
      });
    }
  },

  sendCopilotMessage: async (question) => {
    const articleId = get().selectedArticleId;
    if (!articleId) return;

    const article = get().articles.find((a) => a.id === articleId);
    if (!article) return;

    const articleInput = {
      title: article.title,
      authors: article.authors,
      abstractSnippet: article.abstractSnippet,
      doi: article.doi,
      pubmedId: article.pubmedId,
      journal: article.journal,
      volume: article.volume,
      issue: article.issue,
      publishedAt:
        article.publishedAt instanceof Date
          ? article.publishedAt.toISOString()
          : article.publishedAt ?? null,
      link: article.link,
    };

    // Add user message
    const userMsgId = `user-${Date.now()}`;
    const assistantMsgId = `assistant-${Date.now()}`;

    set((s) => ({
      copilotMessages: [
        ...s.copilotMessages,
        { id: userMsgId, role: "user" as const, content: question },
      ],
      copilotLoading: true,
      copilotSuggestions: [],
    }));

    try {
      // Build messages history (exclude system messages)
      const history = get()
        .copilotMessages.filter(
          (m) => m.role === "user" || m.role === "assistant"
        )
        .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

      // Remove the just-added user message from history (it goes as `question`)
      const priorMessages = history.slice(0, -1);

      const res = await fetch("/api/feeds/copilot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          article: articleInput,
          messages: priorMessages,
          question,
        }),
      });

      if (!res.ok) throw new Error("Chat failed");

      // Add empty assistant message to stream into
      set((s) => ({
        copilotMessages: [
          ...s.copilotMessages,
          { id: assistantMsgId, role: "assistant" as const, content: "" },
        ],
      }));

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });

        set((s) => ({
          copilotMessages: s.copilotMessages.map((m) =>
            m.id === assistantMsgId
              ? { ...m, content: m.content + text }
              : m
          ),
        }));
      }

      set({ copilotLoading: false });
    } catch (err) {
      set({
        copilotLoading: false,
        error: err instanceof Error ? err.message : "Chat failed",
      });
    }
  },

  useSuggestion: (question) => {
    get().sendCopilotMessage(question);
  },

  findRelatedPapers: async () => {
    const { articles, selectedArticleId } = get();
    const article = articles.find((a) => a.id === selectedArticleId);
    if (!article) return;

    set({ relatedPapersLoading: true, relatedPapers: [], relatedPapersSource: null });

    try {
      const res = await fetch("/api/feeds/copilot/related", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: article.title,
          doi: article.doi,
          pubmedId: article.pubmedId,
        }),
      });

      if (!res.ok) throw new Error("Failed to find related papers");
      const data = await res.json();

      set({
        relatedPapers: data.papers,
        relatedPapersSource: data.sourceMessage,
        relatedPapersLoading: false,
      });

      // Inject as a copilot message so it appears in the chat flow
      if (data.papers.length > 0) {
        const summaryMsg =
          `${data.sourceMessage}\n\n` +
          data.papers
            .slice(0, 5)
            .map(
              (
                p: {
                  title: string;
                  authors: string[];
                  journal: string;
                  year: number;
                  citationCount: number;
                },
                i: number
              ) =>
                `${i + 1}. **${p.title}**\n   ${p.authors.slice(0, 3).join(", ")}${p.authors.length > 3 ? " et al." : ""} · ${p.journal} (${p.year}) · ${p.citationCount} citations`
            )
            .join("\n\n");

        set((s) => ({
          copilotMessages: [
            ...s.copilotMessages,
            {
              id: `related-${Date.now()}`,
              role: "assistant" as const,
              content: summaryMsg,
            },
          ],
        }));
      }
    } catch {
      set({
        relatedPapersLoading: false,
        relatedPapersSource: "Failed to find related papers",
      });
    }
  },

  clearCopilot: () => {
    set({
      copilotOpen: false,
      copilotSourceTier: null,
      copilotSourceLabel: null,
      copilotMessages: [],
      copilotLoading: false,
      copilotSuggestions: [],
      relatedPapers: [],
      relatedPapersLoading: false,
      relatedPapersSource: null,
    });
  },
}));
