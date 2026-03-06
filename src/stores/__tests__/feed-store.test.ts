/**
 * RALPH Journal Feed — Sprint 8: Zustand Store Tests
 *
 * Tests the feed store's state management and optimistic updates.
 * Mocks fetch() globally for API calls.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mock fetch globally ─────────────────────────────────────────────

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

// Import store AFTER mock
import { useFeedStore } from "../feed-store";
import type { FeedSubscription, FeedArticleWithStatus } from "@/types/feed";

// ── Test data ───────────────────────────────────────────────────────

function createMockSubscription(
  id: number,
  title: string,
  unread: number
): FeedSubscription {
  return {
    id,
    feedSourceId: id * 10,
    folder: null,
    displayName: null,
    isMuted: false,
    notifyOnNew: false,
    addedAt: new Date(),
    feedSource: {
      id: id * 10,
      title,
      description: null,
      feedUrl: `https://test.com/feed-${id}`,
      siteUrl: "https://test.com",
      faviconUrl: null,
      feedType: "rss" as const,
      status: "active" as const,
      category: "General",
      specialty: "Internal Medicine",
      publisher: "Test Publisher",
      issn: null,
      isCurated: false,
      articleCount: 10,
      lastFetchedAt: null,
      lastSuccessAt: null,
      consecutiveFailures: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    unreadCount: unread,
  };
}

function createMockArticle(
  id: number,
  overrides: Partial<FeedArticleWithStatus> = {}
): FeedArticleWithStatus {
  return {
    id,
    feedSourceId: 10,
    guid: `guid-${id}`,
    title: `Article ${id}`,
    authors: "Smith J",
    abstractSnippet: "Test abstract",
    link: `https://test.com/article-${id}`,
    doi: null,
    pubmedId: null,
    publishedAt: new Date(),
    imageUrl: null,
    contentHtml: null,
    journal: "Test Journal",
    volume: null,
    issue: null,
    createdAt: new Date(),
    isRead: false,
    isStarred: false,
    isSavedToLibrary: false,
    savedPaperId: null,
    feedSourceTitle: "Test Feed",
    feedSourceFaviconUrl: null,
    ...overrides,
  };
}

// ── Reset store before each test ────────────────────────────────────

beforeEach(() => {
  mockFetch.mockReset();
  useFeedStore.setState({
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
    error: null,
  });
});

// =====================================================================
// JF-200: Initial state defaults
// =====================================================================
describe("JF-200: Initial state", () => {
  it("has empty subscriptions", () => {
    expect(useFeedStore.getState().subscriptions).toEqual([]);
  });

  it("has empty articles", () => {
    expect(useFeedStore.getState().articles).toEqual([]);
  });

  it("defaults to unread view filter", () => {
    expect(useFeedStore.getState().viewFilter).toBe("unread");
  });

  it("has no selected feed", () => {
    expect(useFeedStore.getState().selectedFeedId).toBeNull();
  });

  it("has totalUnread of 0", () => {
    expect(useFeedStore.getState().totalUnread).toBe(0);
  });

  it("is not loading", () => {
    expect(useFeedStore.getState().isLoadingSubscriptions).toBe(false);
    expect(useFeedStore.getState().isLoadingArticles).toBe(false);
  });

  it("has no error", () => {
    expect(useFeedStore.getState().error).toBeNull();
  });
});

// =====================================================================
// JF-201: loadSubscriptions fetches and stores data
// =====================================================================
describe("JF-201: loadSubscriptions", () => {
  it("sets isLoadingSubscriptions during fetch", async () => {
    let resolvePromise: (value: unknown) => void;
    mockFetch.mockReturnValueOnce(
      new Promise((r) => {
        resolvePromise = r;
      })
    );

    const promise = useFeedStore.getState().loadSubscriptions();
    expect(useFeedStore.getState().isLoadingSubscriptions).toBe(true);

    resolvePromise!({
      ok: true,
      json: () => Promise.resolve({ subscriptions: [], totalUnread: 0 }),
    });
    await promise;

    expect(useFeedStore.getState().isLoadingSubscriptions).toBe(false);
  });

  it("stores subscriptions from API response", async () => {
    const subs = [createMockSubscription(1, "NEJM", 5)];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ subscriptions: subs, totalUnread: 5 }),
    });

    await useFeedStore.getState().loadSubscriptions();

    expect(useFeedStore.getState().subscriptions).toHaveLength(1);
    expect(useFeedStore.getState().totalUnread).toBe(5);
  });

  it("sets error on failure", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });

    await useFeedStore.getState().loadSubscriptions();

    expect(useFeedStore.getState().error).toBeTruthy();
    expect(useFeedStore.getState().isLoadingSubscriptions).toBe(false);
  });
});

// =====================================================================
// JF-202: loadArticles fetches with current filters
// =====================================================================
describe("JF-202: loadArticles", () => {
  it("passes filters as query params", async () => {
    useFeedStore.setState({ selectedFeedId: 10, viewFilter: "starred" });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({ articles: [], total: 0, hasMore: false }),
    });

    await useFeedStore.getState().loadArticles();

    const calledUrl = mockFetch.mock.calls[0][0];
    expect(calledUrl).toContain("feedSourceId=10");
    expect(calledUrl).toContain("isStarred=true");
  });

  it("clears articles on reset=true (default)", async () => {
    useFeedStore.setState({ articles: [createMockArticle(1)] });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          articles: [createMockArticle(2)],
          total: 1,
          hasMore: false,
        }),
    });

    await useFeedStore.getState().loadArticles(true);

    expect(useFeedStore.getState().articles).toHaveLength(1);
    expect(useFeedStore.getState().articles[0].id).toBe(2);
  });
});

// =====================================================================
// JF-203: loadMore appends next page
// =====================================================================
describe("JF-203: loadMore", () => {
  it("does nothing when hasMore is false", async () => {
    useFeedStore.setState({ hasMore: false });

    await useFeedStore.getState().loadMore();

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("does nothing when already loading", async () => {
    useFeedStore.setState({ hasMore: true, isLoadingArticles: true });

    await useFeedStore.getState().loadMore();

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("increments page and appends articles", async () => {
    useFeedStore.setState({
      hasMore: true,
      page: 0,
      articles: [createMockArticle(1)],
    });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          articles: [createMockArticle(2)],
          total: 2,
          hasMore: false,
        }),
    });

    await useFeedStore.getState().loadMore();

    expect(useFeedStore.getState().page).toBe(1);
  });
});

// =====================================================================
// JF-204: markRead optimistic update
// =====================================================================
describe("JF-204: markRead (optimistic)", () => {
  it("immediately marks article as read in state", () => {
    useFeedStore.setState({
      articles: [createMockArticle(1, { isRead: false })],
      totalUnread: 5,
    });
    mockFetch.mockResolvedValueOnce({ ok: true });

    useFeedStore.getState().markRead(1);

    expect(useFeedStore.getState().articles[0].isRead).toBe(true);
    expect(useFeedStore.getState().totalUnread).toBe(4);
  });

  it("fires API call in background", () => {
    useFeedStore.setState({
      articles: [createMockArticle(1)],
      totalUnread: 1,
    });
    mockFetch.mockResolvedValueOnce({ ok: true });

    useFeedStore.getState().markRead(1);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/feeds/articles/1/read"),
      expect.objectContaining({ method: "POST" })
    );
  });
});

// =====================================================================
// JF-205: markRead reverts on API failure
// =====================================================================
describe("JF-205: markRead revert on failure", () => {
  it("reverts to unread if API call fails", async () => {
    useFeedStore.setState({
      articles: [createMockArticle(1, { isRead: false })],
      totalUnread: 5,
    });
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    useFeedStore.getState().markRead(1);

    // Immediately after: should be marked read (optimistic)
    expect(useFeedStore.getState().articles[0].isRead).toBe(true);

    // Wait for the catch to execute
    await new Promise((r) => setTimeout(r, 50));

    // After catch: should be reverted
    expect(useFeedStore.getState().articles[0].isRead).toBe(false);
    expect(useFeedStore.getState().totalUnread).toBe(5);
  });
});

// =====================================================================
// JF-206: toggleStar optimistic update
// =====================================================================
describe("JF-206: toggleStar (optimistic)", () => {
  it("flips isStarred immediately", () => {
    useFeedStore.setState({
      articles: [createMockArticle(1, { isStarred: false })],
    });
    mockFetch.mockResolvedValueOnce({ ok: true });

    useFeedStore.getState().toggleStar(1);

    expect(useFeedStore.getState().articles[0].isStarred).toBe(true);
  });

  it("un-stars a starred article", () => {
    useFeedStore.setState({
      articles: [createMockArticle(1, { isStarred: true })],
    });
    mockFetch.mockResolvedValueOnce({ ok: true });

    useFeedStore.getState().toggleStar(1);

    expect(useFeedStore.getState().articles[0].isStarred).toBe(false);
  });

  it("does nothing for non-existent article", () => {
    useFeedStore.setState({ articles: [] });

    useFeedStore.getState().toggleStar(999);

    expect(mockFetch).not.toHaveBeenCalled();
  });
});

// =====================================================================
// JF-207: setSelectedFeed triggers loadArticles
// =====================================================================
describe("JF-207: setSelectedFeed", () => {
  it("sets selectedFeedId and clears selectedFolder", () => {
    useFeedStore.setState({ selectedFolder: "Cardiology" });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({ articles: [], total: 0, hasMore: false }),
    });

    useFeedStore.getState().setSelectedFeed(10);

    expect(useFeedStore.getState().selectedFeedId).toBe(10);
    expect(useFeedStore.getState().selectedFolder).toBeNull();
  });

  it("triggers a fetch call", () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({ articles: [], total: 0, hasMore: false }),
    });

    useFeedStore.getState().setSelectedFeed(10);

    expect(mockFetch).toHaveBeenCalled();
  });
});

// =====================================================================
// JF-208: setViewFilter triggers loadArticles
// =====================================================================
describe("JF-208: setViewFilter", () => {
  it("updates viewFilter state", () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({ articles: [], total: 0, hasMore: false }),
    });

    useFeedStore.getState().setViewFilter("starred");

    expect(useFeedStore.getState().viewFilter).toBe("starred");
  });
});

// =====================================================================
// JF-209: subscribe calls API and reloads
// =====================================================================
describe("JF-209: subscribe", () => {
  it("calls POST /api/feeds with feedUrl", async () => {
    // First call: POST /api/feeds
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ subscription: { id: 1 } }),
    });
    // Second call: loadSubscriptions reload
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({ subscriptions: [], totalUnread: 0 }),
    });

    await useFeedStore.getState().subscribe("https://test.com/feed");

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/feeds",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining("feedUrl"),
      })
    );
  });

  it("sets error on API failure", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: "Invalid feed URL" }),
    });

    await expect(
      useFeedStore.getState().subscribe("https://bad.com")
    ).rejects.toThrow();

    expect(useFeedStore.getState().error).toContain("Invalid feed");
  });
});

// =====================================================================
// JF-210: unsubscribe removes from state
// =====================================================================
describe("JF-210: unsubscribe", () => {
  it("removes subscription from state on success", async () => {
    useFeedStore.setState({
      subscriptions: [
        createMockSubscription(1, "NEJM", 3),
        createMockSubscription(2, "Lancet", 5),
      ],
    });
    mockFetch.mockResolvedValueOnce({ ok: true });

    await useFeedStore.getState().unsubscribe(1);

    expect(useFeedStore.getState().subscriptions).toHaveLength(1);
    expect(useFeedStore.getState().subscriptions[0].id).toBe(2);
  });
});

// =====================================================================
// JF-211: setSelectedArticle auto-marks as read
// =====================================================================
describe("JF-211: setSelectedArticle", () => {
  it("sets the selected article ID", () => {
    useFeedStore.setState({
      articles: [createMockArticle(1, { isRead: false })],
      totalUnread: 1,
    });
    mockFetch.mockResolvedValueOnce({ ok: true });

    useFeedStore.getState().setSelectedArticle(1);

    expect(useFeedStore.getState().selectedArticleId).toBe(1);
  });

  it("auto-marks unread article as read", () => {
    useFeedStore.setState({
      articles: [createMockArticle(1, { isRead: false })],
      totalUnread: 1,
    });
    mockFetch.mockResolvedValueOnce({ ok: true });

    useFeedStore.getState().setSelectedArticle(1);

    expect(useFeedStore.getState().articles[0].isRead).toBe(true);
  });

  it("does not re-mark already-read articles", () => {
    useFeedStore.setState({
      articles: [createMockArticle(1, { isRead: true })],
      totalUnread: 0,
    });

    useFeedStore.getState().setSelectedArticle(1);

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("clears selection when null", () => {
    useFeedStore.setState({ selectedArticleId: 1 });

    useFeedStore.getState().setSelectedArticle(null);

    expect(useFeedStore.getState().selectedArticleId).toBeNull();
  });
});

// =====================================================================
// JF-212: clearError resets error state
// =====================================================================
describe("JF-212: clearError", () => {
  it("sets error to null", () => {
    useFeedStore.setState({ error: "Something went wrong" });

    useFeedStore.getState().clearError();

    expect(useFeedStore.getState().error).toBeNull();
  });
});

// =====================================================================
// JF-213: totalUnread never goes below 0
// =====================================================================
describe("JF-213: totalUnread floor", () => {
  it("does not go negative when markRead called on last unread", () => {
    useFeedStore.setState({
      articles: [createMockArticle(1, { isRead: false })],
      totalUnread: 0,
    });
    mockFetch.mockResolvedValueOnce({ ok: true });

    useFeedStore.getState().markRead(1);

    expect(useFeedStore.getState().totalUnread).toBe(0);
  });
});
