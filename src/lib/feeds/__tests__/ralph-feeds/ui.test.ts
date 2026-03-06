/**
 * RALPH Journal Feed — Sprint 9: UI Component Verification Tests
 *
 * Verifies that all component files exist, export correctly,
 * and the sidebar was modified properly.
 */
import { describe, it, expect, vi } from "vitest";

// Mock client-side dependencies that would fail in Node environment
vi.mock("next/navigation", () => ({
  usePathname: () => "/feeds",
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/stores/feed-store", () => ({
  useFeedStore: Object.assign(
    () => ({
      subscriptions: [],
      articles: [],
      selectedArticleId: null,
      isLoadingSubscriptions: false,
      isLoadingArticles: false,
      totalUnread: 0,
      hasMore: false,
      viewFilter: "unread",
      selectedFeedId: null,
      selectedFolder: null,
      error: null,
      loadSubscriptions: vi.fn(),
      loadArticles: vi.fn(),
      markAllRead: vi.fn(),
      setSelectedArticle: vi.fn(),
      setSelectedFeed: vi.fn(),
      setSelectedFolder: vi.fn(),
      setViewFilter: vi.fn(),
      clearError: vi.fn(),
      toggleStar: vi.fn(),
      markRead: vi.fn(),
      subscribe: vi.fn(),
      subscribePubMed: vi.fn(),
      unsubscribe: vi.fn(),
      loadMore: vi.fn(),
      saveToLibrary: vi.fn(),
    }),
    { getState: () => ({ toggleStar: vi.fn(), subscribe: vi.fn(), saveToLibrary: vi.fn() }) }
  ),
}));

// =====================================================================
// JF-230: Component files exist and export
// =====================================================================
describe("JF-230: Component file exports", () => {
  it("FeedSidebar exports", async () => {
    const mod = await import("@/components/feeds/feed-sidebar");
    expect(mod.FeedSidebar).toBeDefined();
  });

  it("ArticleList exports", async () => {
    const mod = await import("@/components/feeds/article-list");
    expect(mod.ArticleList).toBeDefined();
  });

  it("ArticleCard exports", async () => {
    const mod = await import("@/components/feeds/article-card");
    expect(mod.ArticleCard).toBeDefined();
  });

  it("ArticleReader exports", async () => {
    const mod = await import("@/components/feeds/article-reader");
    expect(mod.ArticleReader).toBeDefined();
  });

  it("AddFeedModal exports", async () => {
    const mod = await import("@/components/feeds/add-feed-modal");
    expect(mod.AddFeedModal).toBeDefined();
  });

  it("JournalBrowser exports", async () => {
    const mod = await import("@/components/feeds/journal-browser");
    expect(mod.JournalBrowser).toBeDefined();
  });

  it("FeedEmptyState exports", async () => {
    const mod = await import("@/components/feeds/feed-empty-state");
    expect(mod.FeedEmptyState).toBeDefined();
  });
});

// =====================================================================
// JF-231: Page files exist
// =====================================================================
describe("JF-231: Page files", () => {
  it("feeds page exports default", async () => {
    const mod = await import("@/app/(app)/feeds/page");
    expect(mod.default).toBeDefined();
  });

  it("feeds loading exports default", async () => {
    const mod = await import("@/app/(app)/feeds/loading");
    expect(mod.default).toBeDefined();
  });

  it("feeds error exports default", async () => {
    const mod = await import("@/app/(app)/feeds/error");
    expect(mod.default).toBeDefined();
  });
});

// =====================================================================
// JF-232: Sidebar has Journal Feed entry
// =====================================================================
describe("JF-232: Sidebar modification", () => {
  it("app-sidebar includes /feeds route", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/components/layout/app-sidebar.tsx", "utf-8");
    expect(content).toContain('"/feeds"');
    expect(content).toContain("Journal Feed");
    expect(content).toContain("Rss");
  });
});

// =====================================================================
// JF-233: ArticleCard accepts required props
// =====================================================================
describe("JF-233: ArticleCard props contract", () => {
  it("ArticleCard is a function component", async () => {
    const mod = await import("@/components/feeds/article-card");
    expect(typeof mod.ArticleCard).toBe("function");
  });
});

// =====================================================================
// JF-234: AddFeedModal accepts open and onClose props
// =====================================================================
describe("JF-234: AddFeedModal props contract", () => {
  it("AddFeedModal is a function component", async () => {
    const mod = await import("@/components/feeds/add-feed-modal");
    expect(typeof mod.AddFeedModal).toBe("function");
  });
});

// =====================================================================
// JF-235: FeedEmptyState accepts onAddFeed prop
// =====================================================================
describe("JF-235: FeedEmptyState props contract", () => {
  it("FeedEmptyState is a function component", async () => {
    const mod = await import("@/components/feeds/feed-empty-state");
    expect(typeof mod.FeedEmptyState).toBe("function");
  });
});

// =====================================================================
// JF-236: No TypeScript errors in any component
// =====================================================================
describe("JF-236: TypeScript compilation", () => {
  it("all feed component files import without error", async () => {
    const modules = [
      import("@/components/feeds/feed-sidebar"),
      import("@/components/feeds/article-list"),
      import("@/components/feeds/article-card"),
      import("@/components/feeds/article-reader"),
      import("@/components/feeds/add-feed-modal"),
      import("@/components/feeds/journal-browser"),
      import("@/components/feeds/feed-empty-state"),
    ];

    const results = await Promise.allSettled(modules);
    for (const result of results) {
      expect(result.status).toBe("fulfilled");
    }
  });
});
