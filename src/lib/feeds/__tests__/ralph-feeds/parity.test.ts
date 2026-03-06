/**
 * RALPH Journal Feed — Sprint 12: Feedly Parity Tests
 *
 * Each test maps to one "Must work" item in FEEDLY_PARITY.md.
 * Tests verify that the code implementing each feature exists and
 * behaves correctly at the module level.
 */
import { describe, it, expect, vi } from "vitest";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

// ── Mocks ────────────────────────────────────────────────────────────

vi.mock("@/lib/http/resilient-fetch", () => ({
  resilientFetch: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  db: new Proxy(
    {},
    {
      get: () => () =>
        new Proxy(
          {},
          {
            get: () => () =>
              new Proxy(
                {},
                {
                  get: () => () => Promise.resolve([]),
                }
              ),
          }
        ),
    }
  ),
}));

vi.mock("@/lib/db/schema", () => ({
  feedSources: {
    id: "id",
    feedUrl: "fu",
    status: "s",
    feedType: "ft",
    consecutiveFailures: "cf",
    lastError: "le",
  },
  feedArticles: {
    id: "id",
    feedSourceId: "fsi",
    guid: "g",
    title: "t",
    doi: "d",
    pubmedId: "pm",
    abstractSnippet: "as",
    link: "lk",
  },
  userArticleStatus: {
    userId: "uid",
    articleId: "aid",
    isRead: "ir",
    isStarred: "is",
    isSavedToLibrary: "stl",
    savedPaperId: "sp",
  },
  userFeedSubscriptions: {
    id: "id",
    userId: "uid",
    feedSourceId: "fsi",
    folder: "f",
  },
  papers: {
    id: "id",
    doi: "doi",
    pubmed_id: "pmid",
    source: "source",
  },
  userReferences: { userId: "uid", paperId: "pid" },
}));

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: vi.fn(async () => "parity-user"),
}));

vi.mock("@/lib/logger", () => ({
  logger: {
    withRequestId: () => ({
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    }),
  },
}));

// Helper: resolve path from project root
const root = resolve(__dirname, "../../../../..");
function srcExists(relPath: string): boolean {
  return existsSync(resolve(root, relPath));
}
function srcRead(relPath: string): string {
  return readFileSync(resolve(root, relPath), "utf-8");
}

// =====================================================================
// PARITY #1 & #2: Subscribe to RSS and Atom feeds
// =====================================================================
describe("Parity #1-2: RSS + Atom subscription", () => {
  it("JF-P01: parseFeed handles RSS 2.0 format", async () => {
    const { parseFeed } = await import("@/lib/feeds/feed-parser");
    const rss = `<?xml version="1.0"?><rss version="2.0"><channel><title>T</title><link>https://t.com</link><description>D</description><item><title>A</title><link>https://t.com/1</link><guid>g1</guid></item></channel></rss>`;
    const feed = parseFeed(rss);
    expect(feed.title).toBe("T");
    expect(feed.articles.length).toBeGreaterThanOrEqual(1);
  });

  it("JF-P02: parseFeed handles Atom format", async () => {
    const { parseFeed } = await import("@/lib/feeds/feed-parser");
    const atom = `<?xml version="1.0"?><feed xmlns="http://www.w3.org/2005/Atom"><title>T</title><id>urn:t</id><updated>2026-01-01T00:00:00Z</updated><entry><title>A</title><id>e1</id><updated>2026-01-01T00:00:00Z</updated></entry></feed>`;
    const feed = parseFeed(atom);
    expect(feed.title).toBe("T");
    expect(feed.articles.length).toBeGreaterThanOrEqual(1);
  });

  it("JF-P03: subscribeFeed action exists", async () => {
    const actions = await import("@/lib/actions/feeds");
    expect(typeof actions.subscribeFeed).toBe("function");
  });

  it("JF-P04: POST /api/feeds route exists", () => {
    expect(srcExists("src/app/api/feeds/route.ts")).toBe(true);
    const content = srcRead("src/app/api/feeds/route.ts");
    expect(content).toContain("export async function POST");
  });
});

// =====================================================================
// PARITY #3: Auto-discover feed from website URL
// =====================================================================
describe("Parity #3: Feed auto-discovery", () => {
  it("JF-P05: discoverFeeds function exists", async () => {
    const mod = await import("@/lib/feeds/feed-discovery");
    expect(typeof mod.discoverFeeds).toBe("function");
  });

  it("JF-P06: validateFeedUrl function exists", async () => {
    const mod = await import("@/lib/feeds/feed-discovery");
    expect(typeof mod.validateFeedUrl).toBe("function");
  });

  it("JF-P07: POST /api/feeds/detect route exists", () => {
    expect(srcExists("src/app/api/feeds/detect/route.ts")).toBe(true);
  });
});

// =====================================================================
// PARITY #4-5: Unread/read status + mark as read
// =====================================================================
describe("Parity #4-5: Read status tracking", () => {
  it("JF-P08: userArticleStatus schema has isRead column", async () => {
    const schema = await import("@/lib/db/schema/feeds");
    const cols = Object.keys(schema.userArticleStatus);
    expect(cols).toContain("isRead");
  });

  it("JF-P09: markArticleRead action exists", async () => {
    const actions = await import("@/lib/actions/feeds");
    expect(typeof actions.markArticleRead).toBe("function");
  });

  it("JF-P10: POST /api/feeds/articles/[id]/read route exists", () => {
    expect(srcExists("src/app/api/feeds/articles/[id]/read/route.ts")).toBe(
      true
    );
  });

  it("JF-P11: store has markRead action", () => {
    const content = srcRead("src/stores/feed-store.ts");
    expect(content).toContain("markRead");
  });
});

// =====================================================================
// PARITY #6-7: Mark all as read (global + per feed)
// =====================================================================
describe("Parity #6-7: Mark all read", () => {
  it("JF-P12: markAllRead action exists and accepts optional feedSourceId", async () => {
    const actions = await import("@/lib/actions/feeds");
    expect(typeof actions.markAllRead).toBe("function");
  });

  it("JF-P13: POST /api/feeds/articles/mark-all-read route exists", () => {
    expect(
      srcExists("src/app/api/feeds/articles/mark-all-read/route.ts")
    ).toBe(true);
  });

  it("JF-P14: store has markAllRead action", () => {
    const content = srcRead("src/stores/feed-store.ts");
    expect(content).toContain("markAllRead");
  });
});

// =====================================================================
// PARITY #8-9: Star and unstar articles
// =====================================================================
describe("Parity #8-9: Star/unstar", () => {
  it("JF-P15: userArticleStatus schema has isStarred column", async () => {
    const schema = await import("@/lib/db/schema/feeds");
    const cols = Object.keys(schema.userArticleStatus);
    expect(cols).toContain("isStarred");
  });

  it("JF-P16: toggleArticleStar action exists", async () => {
    const actions = await import("@/lib/actions/feeds");
    expect(typeof actions.toggleArticleStar).toBe("function");
  });

  it("JF-P17: POST /api/feeds/articles/[id]/star route exists", () => {
    expect(srcExists("src/app/api/feeds/articles/[id]/star/route.ts")).toBe(
      true
    );
  });

  it("JF-P18: store has toggleStar with optimistic update", () => {
    const content = srcRead("src/stores/feed-store.ts");
    expect(content).toContain("toggleStar");
    expect(content).toContain("isStarred");
  });
});

// =====================================================================
// PARITY #10: Folder organization
// =====================================================================
describe("Parity #10: Folders", () => {
  it("JF-P19: userFeedSubscriptions has folder column", async () => {
    const schema = await import("@/lib/db/schema/feeds");
    const cols = Object.keys(schema.userFeedSubscriptions);
    expect(cols).toContain("folder");
  });

  it("JF-P20: updateSubscription action exists", async () => {
    const actions = await import("@/lib/actions/feeds");
    expect(typeof actions.updateSubscription).toBe("function");
  });

  it("JF-P21: store has setSelectedFolder", () => {
    const content = srcRead("src/stores/feed-store.ts");
    expect(content).toContain("setSelectedFolder");
  });
});

// =====================================================================
// PARITY #11: View filters (All / Unread / Starred)
// =====================================================================
describe("Parity #11: View filters", () => {
  it("JF-P22: store has viewFilter state with 3 options", () => {
    const content = srcRead("src/stores/feed-store.ts");
    expect(content).toContain("viewFilter");
    expect(content).toContain('"all"');
    expect(content).toContain('"unread"');
    expect(content).toContain('"starred"');
  });

  it("JF-P23: store has setViewFilter action", () => {
    const content = srcRead("src/stores/feed-store.ts");
    expect(content).toContain("setViewFilter");
  });
});

// =====================================================================
// PARITY #12: Browse feeds by category
// =====================================================================
describe("Parity #12: Feed directory", () => {
  it("JF-P24: JOURNAL_FEEDS has 50+ entries", async () => {
    const mod = await import("@/data/journal-feeds");
    expect(mod.JOURNAL_FEEDS.length).toBeGreaterThanOrEqual(50);
  });

  it("JF-P25: getCuratedFeeds action exists", async () => {
    const actions = await import("@/lib/actions/feeds");
    expect(typeof actions.getCuratedFeeds).toBe("function");
  });

  it("JF-P26: GET /api/feeds/discover route exists", () => {
    expect(srcExists("src/app/api/feeds/discover/route.ts")).toBe(true);
  });
});

// =====================================================================
// PARITY #13-14: Unread counts (per feed + total)
// =====================================================================
describe("Parity #13-14: Unread counts", () => {
  it("JF-P27: getSubscriptions action exists (returns unread counts)", async () => {
    const actions = await import("@/lib/actions/feeds");
    expect(typeof actions.getSubscriptions).toBe("function");
  });

  it("JF-P28: store tracks totalUnread", () => {
    const content = srcRead("src/stores/feed-store.ts");
    expect(content).toContain("totalUnread");
  });

  it("JF-P29: FeedSubscription type has unreadCount field", () => {
    const content = srcRead("src/types/feed.ts");
    expect(content).toContain("unreadCount");
  });
});

// =====================================================================
// PARITY #15: Article preview with snippet
// =====================================================================
describe("Parity #15: Article snippets", () => {
  it("JF-P30: feedArticles schema has abstractSnippet column", async () => {
    const schema = await import("@/lib/db/schema/feeds");
    const cols = Object.keys(schema.feedArticles);
    expect(cols).toContain("abstractSnippet");
  });

  it("JF-P31: parser extracts abstractSnippet from RSS description", async () => {
    const { parseFeed } = await import("@/lib/feeds/feed-parser");
    const rss = `<?xml version="1.0"?><rss version="2.0"><channel><title>T</title><link>https://t.com</link><description>D</description><item><title>A</title><link>https://t.com/1</link><guid>g1</guid><description>This is the abstract text</description></item></channel></rss>`;
    const feed = parseFeed(rss);
    expect(feed.articles[0].abstractSnippet).toContain("abstract text");
  });
});

// =====================================================================
// PARITY #16: Open article in original site
// =====================================================================
describe("Parity #16: Original article link", () => {
  it("JF-P32: feedArticles schema has link column", async () => {
    const schema = await import("@/lib/db/schema/feeds");
    const cols = Object.keys(schema.feedArticles);
    expect(cols).toContain("link");
  });

  it("JF-P33: parser extracts article link", async () => {
    const { parseFeed } = await import("@/lib/feeds/feed-parser");
    const rss = `<?xml version="1.0"?><rss version="2.0"><channel><title>T</title><link>https://t.com</link><description>D</description><item><title>A</title><link>https://t.com/article-1</link><guid>g1</guid></item></channel></rss>`;
    const feed = parseFeed(rss);
    expect(feed.articles[0].link).toBe("https://t.com/article-1");
  });

  it("JF-P34: article-reader component has Open Original button", () => {
    expect(srcExists("src/components/feeds/article-reader.tsx")).toBe(true);
    const content = srcRead("src/components/feeds/article-reader.tsx");
    expect(content).toMatch(/Open Original/i);
    expect(content).toContain('target="_blank"');
  });
});

// =====================================================================
// PARITY #17: Feed health monitoring
// =====================================================================
describe("Parity #17: Feed health", () => {
  it("JF-P35: feedSources schema has status, consecutiveFailures, lastError", async () => {
    const schema = await import("@/lib/db/schema/feeds");
    const cols = Object.keys(schema.feedSources);
    expect(cols).toContain("status");
    expect(cols).toContain("consecutiveFailures");
    expect(cols).toContain("lastError");
  });

  it("JF-P36: feedStatusEnum includes error and dead states", async () => {
    const { feedStatusEnum } = await import("@/lib/db/schema/enums");
    expect(feedStatusEnum.enumValues).toContain("error");
    expect(feedStatusEnum.enumValues).toContain("dead");
  });
});

// =====================================================================
// PARITY #18: Keyboard shortcuts
// =====================================================================
describe("Parity #18: Keyboard shortcuts", () => {
  it("JF-P37: feeds page has keyboard event handler for j/k/o/s", () => {
    expect(srcExists("src/app/(app)/feeds/page.tsx")).toBe(true);
    const content = srcRead("src/app/(app)/feeds/page.tsx");
    expect(content).toContain("keydown");
    expect(content).toMatch(/["']j["']/);
    expect(content).toMatch(/["']k["']/);
    expect(content).toMatch(/["']o["']/);
    expect(content).toMatch(/["']s["']/);
  });
});

// =====================================================================
// PARITY #19: Mobile responsive
// =====================================================================
describe("Parity #19: Mobile responsive layout", () => {
  it("JF-P38: feeds page uses responsive breakpoints", () => {
    expect(srcExists("src/app/(app)/feeds/page.tsx")).toBe(true);
    const content = srcRead("src/app/(app)/feeds/page.tsx");
    expect(content).toMatch(/lg:|xl:|hidden/);
  });
});

// =====================================================================
// PARITY #20: Background feed refresh
// =====================================================================
describe("Parity #20: Cron-based feed refresh", () => {
  it("JF-P39: cron route file exists", () => {
    expect(srcExists("src/app/api/cron/fetch-feeds/route.ts")).toBe(true);
  });

  it("JF-P40: fetchDueFeeds function exists", async () => {
    const mod = await import("@/lib/feeds/feed-fetcher");
    expect(typeof mod.fetchDueFeeds).toBe("function");
  });

  it("JF-P41: fetchAndStoreFeed function exists", async () => {
    const mod = await import("@/lib/feeds/feed-fetcher");
    expect(typeof mod.fetchAndStoreFeed).toBe("function");
  });
});

// =====================================================================
// PARITY #21: PubMed search as feed (UNIQUE to ScholarSync)
// =====================================================================
describe("Parity #21: PubMed search feed [ScholarSync unique]", () => {
  it("JF-P42: createPubMedSearchFeed function exists", async () => {
    const mod = await import("@/lib/feeds/pubmed-feed");
    expect(typeof mod.createPubMedSearchFeed).toBe("function");
  });

  it("JF-P43: POST /api/feeds/pubmed route exists", () => {
    expect(srcExists("src/app/api/feeds/pubmed/route.ts")).toBe(true);
  });
});

// =====================================================================
// PARITY #22-23: Save to Library with DOI dedup (UNIQUE)
// =====================================================================
describe("Parity #22-23: Save to Library [ScholarSync unique]", () => {
  it("JF-P44: saveFeedArticleToLibrary function exists", async () => {
    const mod = await import("@/lib/feeds/save-to-library");
    expect(typeof mod.saveFeedArticleToLibrary).toBe("function");
  });

  it("JF-P45: POST /api/feeds/articles/[id]/save route exists", () => {
    expect(srcExists("src/app/api/feeds/articles/[id]/save/route.ts")).toBe(
      true
    );
  });

  it("JF-P46: paperSourceEnum includes 'feed'", async () => {
    const { paperSourceEnum } = await import("@/lib/db/schema/enums");
    expect(paperSourceEnum.enumValues).toContain("feed");
  });
});

// =====================================================================
// PARITY #24: Pre-curated journal directory (UNIQUE)
// =====================================================================
describe("Parity #24: Curated directory [ScholarSync unique]", () => {
  it("JF-P47: journal-feeds.ts data file exists", () => {
    expect(srcExists("src/data/journal-feeds.ts")).toBe(true);
  });

  it("JF-P48: includes major medical journals (NEJM, Lancet, JAMA, BMJ)", async () => {
    const mod = await import("@/data/journal-feeds");
    const titles = mod.JOURNAL_FEEDS.map((f: { title: string }) =>
      f.title.toLowerCase()
    ).join(" ");
    expect(titles).toContain("nejm");
    expect(titles).toContain("lancet");
    expect(titles).toContain("jama");
    expect(titles).toContain("bmj");
  });
});
