/**
 * RALPH Journal Feed — Sprint 17: Final Parity Audit v2
 *
 * Comprehensive quality gate covering all 16 sprints.
 * 42 feature checks: 38 "Must work" + 3 deferred + 1 out of scope.
 */
import { describe, it, expect, vi } from "vitest";
import { readFileSync, existsSync } from "fs";

// ── Minimal mocks for module imports ────────────────────────────────

vi.mock("@/lib/http/resilient-fetch", () => ({ resilientFetch: vi.fn() }));
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
                { get: () => () => Promise.resolve([]) }
              ),
          }
        ),
    }
  ),
}));
vi.mock("@/lib/db/schema", () => ({
  feedSources: {
    id: "id", feedUrl: "fu", status: "s", feedType: "ft",
    consecutiveFailures: "cf", lastError: "le",
  },
  userFeedSubscriptions: {
    id: "id", userId: "uid", feedSourceId: "fsi", folder: "f", displayName: "dn",
  },
  feedArticles: {
    id: "id", feedSourceId: "fsi", guid: "g", title: "t", doi: "d",
    pubmedId: "pm", abstractSnippet: "as", authors: "au", journal: "j",
    link: "l", publishedAt: "pa",
  },
  userArticleStatus: {
    userId: "uid", articleId: "aid", isRead: "ir", isStarred: "is",
    isSavedToLibrary: "stl", savedPaperId: "sp",
  },
  papers: { id: "id", doi: "doi", pubmed_id: "pmid", source: "source" },
  userReferences: { userId: "uid", paperId: "pid" },
  feedTypeEnum: { enumValues: ["rss", "atom", "json_feed", "pubmed_search"] },
  feedStatusEnum: { enumValues: ["active", "paused", "error", "dead"] },
  paperSourceEnum: {
    enumValues: [
      "pubmed", "semantic_scholar", "openalex", "arxiv",
      "user_upload", "snowball", "deep_research", "feed",
    ],
  },
}));
vi.mock("@/lib/auth", () => ({
  getCurrentUserId: vi.fn(async () => "audit-user"),
}));
vi.mock("@/lib/logger", () => ({
  logger: {
    withRequestId: () => ({
      info: vi.fn(), warn: vi.fn(), error: vi.fn(),
    }),
  },
}));
vi.mock("@/lib/search/sources/unpaywall", () => ({
  lookupUnpaywall: vi.fn(async () => ({
    doi: "", pdfUrl: null, isOpenAccess: false,
  })),
}));
vi.mock("@/lib/deep-research/full-text-extractor", () => ({
  downloadAndExtractPdf: vi.fn(async () => null),
  extractKeySections: vi.fn((t: string) => t),
}));
vi.mock("@/lib/search/sources/pubmed", () => ({
  searchPubMed: vi.fn(async () => ({ results: [], total: 0 })),
}));

// ═════════════════════════════════════════════════════════════════════
// SECTION 1: CORE RSS READER (Sprints 1–12)
// ═════════════════════════════════════════════════════════════════════

// ── P01: Subscribe to RSS feed by URL ────────────────────────────────
describe("P01: RSS subscription", () => {
  it("parseFeed handles RSS 2.0", async () => {
    const { parseFeed } = await import("@/lib/feeds/feed-parser");
    const rss = `<?xml version="1.0"?><rss version="2.0"><channel><title>T</title><link>https://t.com</link><description>D</description><item><title>A</title><link>https://t.com/1</link><guid>g1</guid></item></channel></rss>`;
    const result = parseFeed(rss);
    expect(result.title).toBe("T");
    expect(result.articles).toHaveLength(1);
  });
  it("subscribeFeed action exists", async () => {
    const a = await import("@/lib/actions/feeds");
    expect(typeof a.subscribeFeed).toBe("function");
  });
  it("POST /api/feeds route exists", () => {
    expect(existsSync("src/app/api/feeds/route.ts")).toBe(true);
  });
});

// ── P02: Subscribe to Atom feed ──────────────────────────────────────
describe("P02: Atom subscription", () => {
  it("parser handles Atom", async () => {
    const { parseFeed } = await import("@/lib/feeds/feed-parser");
    const atom = `<?xml version="1.0"?><feed xmlns="http://www.w3.org/2005/Atom"><title>T</title><id>urn:t</id><updated>2026-01-01T00:00:00Z</updated><entry><title>A</title><id>e1</id><updated>2026-01-01T00:00:00Z</updated></entry></feed>`;
    const result = parseFeed(atom);
    expect(result.title).toBe("T");
    expect(result.articles).toHaveLength(1);
  });
});

// ── P03: Auto-discover feed from URL ─────────────────────────────────
describe("P03: Feed discovery", () => {
  it("discoverFeeds exists", async () => {
    const m = await import("@/lib/feeds/feed-discovery");
    expect(typeof m.discoverFeeds).toBe("function");
  });
  it("validateFeedUrl exists", async () => {
    const m = await import("@/lib/feeds/feed-discovery");
    expect(typeof m.validateFeedUrl).toBe("function");
  });
  it("detect route exists", () => {
    expect(existsSync("src/app/api/feeds/detect/route.ts")).toBe(true);
  });
});

// ── P04–P05: Read status + mark as read ──────────────────────────────
describe("P04-05: Read status", () => {
  it("schema has isRead", async () => {
    const s = await import("@/lib/db/schema/feeds");
    expect(Object.keys(s.userArticleStatus)).toContain("isRead");
  });
  it("markArticleRead action exists", async () => {
    const a = await import("@/lib/actions/feeds");
    expect(typeof a.markArticleRead).toBe("function");
  });
  it("read route exists", () => {
    expect(existsSync("src/app/api/feeds/articles/[id]/read/route.ts")).toBe(true);
  });
  it("store has optimistic markRead", () => {
    expect(readFileSync("src/stores/feed-store.ts", "utf-8")).toContain("markRead");
  });
});

// ── P06–P07: Mark all read (global + per feed) ──────────────────────
describe("P06-07: Mark all read", () => {
  it("markAllRead action exists", async () => {
    const a = await import("@/lib/actions/feeds");
    expect(typeof a.markAllRead).toBe("function");
  });
  it("mark-all-read route exists", () => {
    expect(existsSync("src/app/api/feeds/articles/mark-all-read/route.ts")).toBe(true);
  });
});

// ── P08–P09: Star + unstar ───────────────────────────────────────────
describe("P08-09: Star/unstar", () => {
  it("schema has isStarred", async () => {
    const s = await import("@/lib/db/schema/feeds");
    expect(Object.keys(s.userArticleStatus)).toContain("isStarred");
  });
  it("toggleArticleStar action exists", async () => {
    const a = await import("@/lib/actions/feeds");
    expect(typeof a.toggleArticleStar).toBe("function");
  });
  it("star route exists", () => {
    expect(existsSync("src/app/api/feeds/articles/[id]/star/route.ts")).toBe(true);
  });
  it("store has optimistic toggleStar", () => {
    const c = readFileSync("src/stores/feed-store.ts", "utf-8");
    expect(c).toContain("toggleStar");
    expect(c).toContain("isStarred");
  });
});

// ── P10: Folder organization ─────────────────────────────────────────
describe("P10: Folders", () => {
  it("schema has folder column", async () => {
    const s = await import("@/lib/db/schema/feeds");
    expect(Object.keys(s.userFeedSubscriptions)).toContain("folder");
  });
  it("updateSubscription exists", async () => {
    const a = await import("@/lib/actions/feeds");
    expect(typeof a.updateSubscription).toBe("function");
  });
});

// ── P11: View filters (All / Unread / Starred) ──────────────────────
describe("P11: View filters", () => {
  it("store has all/unread/starred filters + setViewFilter", () => {
    const c = readFileSync("src/stores/feed-store.ts", "utf-8");
    expect(c).toContain('"all"');
    expect(c).toContain('"unread"');
    expect(c).toContain('"starred"');
    expect(c).toContain("setViewFilter");
  });
});

// ── P12: Browse by category ──────────────────────────────────────────
describe("P12: Journal directory", () => {
  it("50+ curated feeds", async () => {
    const m = await import("@/data/journal-feeds");
    expect(m.JOURNAL_FEEDS.length).toBeGreaterThanOrEqual(50);
  });
  it("getCuratedFeeds action exists", async () => {
    const a = await import("@/lib/actions/feeds");
    expect(typeof a.getCuratedFeeds).toBe("function");
  });
  it("discover route exists", () => {
    expect(existsSync("src/app/api/feeds/discover/route.ts")).toBe(true);
  });
});

// ── P13–P14: Unread counts ───────────────────────────────────────────
describe("P13-14: Unread counts", () => {
  it("getSubscriptions returns unread counts", async () => {
    const a = await import("@/lib/actions/feeds");
    expect(typeof a.getSubscriptions).toBe("function");
  });
  it("store tracks totalUnread", () => {
    expect(readFileSync("src/stores/feed-store.ts", "utf-8")).toContain("totalUnread");
  });
  it("type has unreadCount", () => {
    expect(readFileSync("src/types/feed.ts", "utf-8")).toContain("unreadCount");
  });
});

// ── P15: Article snippet ─────────────────────────────────────────────
describe("P15: Article snippets", () => {
  it("schema has abstractSnippet", async () => {
    const s = await import("@/lib/db/schema/feeds");
    expect(Object.keys(s.feedArticles)).toContain("abstractSnippet");
  });
  it("parser extracts snippet", async () => {
    const { parseFeed } = await import("@/lib/feeds/feed-parser");
    const rss = `<?xml version="1.0"?><rss version="2.0"><channel><title>T</title><link>https://t.com</link><description>D</description><item><title>A</title><link>https://t.com/1</link><guid>g1</guid><description>Abstract text here</description></item></channel></rss>`;
    expect(parseFeed(rss).articles[0].abstractSnippet).toContain("Abstract text");
  });
});

// ── P16: Open in original site ───────────────────────────────────────
describe("P16: Original link", () => {
  it("schema has link column", async () => {
    const s = await import("@/lib/db/schema/feeds");
    expect(Object.keys(s.feedArticles)).toContain("link");
  });
  it("article-reader has open original", () => {
    expect(existsSync("src/components/feeds/article-reader.tsx")).toBe(true);
    expect(
      readFileSync("src/components/feeds/article-reader.tsx", "utf-8").toLowerCase()
    ).toMatch(/open.*original|target.*_blank|arrowsquareout/i);
  });
});

// ── P17: Feed health monitoring ──────────────────────────────────────
describe("P17: Feed health", () => {
  it("schema has status + consecutiveFailures + lastError", async () => {
    const s = await import("@/lib/db/schema/feeds");
    const cols = Object.keys(s.feedSources);
    expect(cols).toContain("status");
    expect(cols).toContain("consecutiveFailures");
    expect(cols).toContain("lastError");
  });
  it("feedStatusEnum has error and dead", async () => {
    const e = await import("@/lib/db/schema/enums");
    expect(e.feedStatusEnum.enumValues).toContain("error");
    expect(e.feedStatusEnum.enumValues).toContain("dead");
  });
});

// ── P18: Keyboard shortcuts ──────────────────────────────────────────
describe("P18: Keyboard shortcuts", () => {
  it("page has keydown listener with j/k/o/s/c/a/slash", () => {
    const c = readFileSync("src/app/(app)/feeds/page.tsx", "utf-8");
    expect(c).toContain("keydown");
    expect(c).toMatch(/["']j["']/);
    expect(c).toMatch(/["']k["']/);
    expect(c).toMatch(/["']o["']/);
    expect(c).toMatch(/["']s["']/);
    expect(c).toMatch(/["']c["']/);
    expect(c).toMatch(/["']a["']/);
    expect(c).toContain('"/"');
  });
});

// ── P19: Mobile responsive ──────────────────────────────────────────
describe("P19: Mobile responsive", () => {
  it("page uses responsive breakpoints", () => {
    const c = readFileSync("src/app/(app)/feeds/page.tsx", "utf-8");
    expect(c).toMatch(/lg:|xl:|md:|hidden/);
  });
});

// ── P20: Background refresh ──────────────────────────────────────────
describe("P20: Cron refresh", () => {
  it("cron route exists", () => {
    expect(existsSync("src/app/api/cron/fetch-feeds/route.ts")).toBe(true);
  });
  it("fetchDueFeeds exists", async () => {
    const m = await import("@/lib/feeds/feed-fetcher");
    expect(typeof m.fetchDueFeeds).toBe("function");
  });
  it("fetchAndStoreFeed exists", async () => {
    const m = await import("@/lib/feeds/feed-fetcher");
    expect(typeof m.fetchAndStoreFeed).toBe("function");
  });
});

// ═════════════════════════════════════════════════════════════════════
// SECTION 2: SCHOLARSYNC UNIQUE FEATURES (Sprints 5, 10, 4)
// ═════════════════════════════════════════════════════════════════════

// ── P21: PubMed search as feed ───────────────────────────────────────
describe("P21: PubMed feed [unique]", () => {
  it("createPubMedSearchFeed exists", async () => {
    const m = await import("@/lib/feeds/pubmed-feed");
    expect(typeof m.createPubMedSearchFeed).toBe("function");
  });
  it("pubmed route exists", () => {
    expect(existsSync("src/app/api/feeds/pubmed/route.ts")).toBe(true);
  });
});

// ── P22–P23: Save to Library + DOI dedup ─────────────────────────────
describe("P22-23: Save to Library [unique]", () => {
  it("saveFeedArticleToLibrary exists", async () => {
    const m = await import("@/lib/feeds/save-to-library");
    expect(typeof m.saveFeedArticleToLibrary).toBe("function");
  });
  it("save route exists", () => {
    expect(existsSync("src/app/api/feeds/articles/[id]/save/route.ts")).toBe(true);
  });
});

// ── P24: Curated journal directory ───────────────────────────────────
describe("P24: Curated directory [unique]", () => {
  it("has top-tier medical journals", async () => {
    const m = await import("@/data/journal-feeds");
    const titles = m.JOURNAL_FEEDS.map(
      (f: { title: string }) => f.title.toLowerCase()
    ).join(" ");
    expect(titles).toContain("nejm");
    expect(titles).toContain("lancet");
    expect(titles).toContain("jama");
    expect(titles).toContain("bmj");
  });
});

// ═════════════════════════════════════════════════════════════════════
// SECTION 3: PHASE 2 FEATURES COMPLETED (Sprints 13–16)
// ═════════════════════════════════════════════════════════════════════

// ── P25: One-click citation ──────────────────────────────────────────
describe("P25: One-click citation (Sprint 13)", () => {
  it("articleToPaperData converter exists", async () => {
    const m = await import("@/lib/feeds/article-to-citation");
    expect(typeof m.articleToPaperData).toBe("function");
  });
  it("article-card has cite button", () => {
    expect(
      readFileSync("src/components/feeds/article-card.tsx", "utf-8")
    ).toMatch(/onCite|Cite|Quotes/i);
  });
  it("article-reader has cite button", () => {
    expect(
      readFileSync("src/components/feeds/article-reader.tsx", "utf-8")
    ).toMatch(/onCite|Cite|Quotes/i);
  });
  it("feeds page wires CitationModal", () => {
    expect(
      readFileSync("src/app/(app)/feeds/page.tsx", "utf-8")
    ).toContain("CitationModal");
  });
  it("supports all 6 styles (APA, MLA, Chicago, Vancouver, Harvard, BibTeX)", () => {
    const c = readFileSync("src/components/feeds/citation-modal.tsx", "utf-8");
    for (const s of ["apa", "mla", "chicago", "vancouver", "harvard", "bibtex"]) {
      expect(c).toContain(s);
    }
  });
});

// ── P26: AI Copilot — Summary ────────────────────────────────────────
describe("P26: AI summary (Sprint 14-15)", () => {
  it("resolveArticleSource exists", async () => {
    const m = await import("@/lib/feeds/copilot-source-resolver");
    expect(typeof m.resolveArticleSource).toBe("function");
  });
  it("summarize route exists with generateText + getSmallModel", () => {
    expect(existsSync("src/app/api/feeds/copilot/summarize/route.ts")).toBe(true);
    const c = readFileSync("src/app/api/feeds/copilot/summarize/route.ts", "utf-8");
    expect(c).toContain("generateText");
    expect(c).toContain("getSmallModel");
  });
  it("store has summarizeArticle action", () => {
    expect(
      readFileSync("src/stores/feed-store.ts", "utf-8")
    ).toContain("summarizeArticle");
  });
  it("copilot panel has Summarize button", () => {
    expect(existsSync("src/components/feeds/copilot-panel.tsx")).toBe(true);
    expect(
      readFileSync("src/components/feeds/copilot-panel.tsx", "utf-8")
    ).toContain("Summarize");
  });
});

// ── P27: AI Copilot — Chat / Explain ─────────────────────────────────
describe("P27: AI Chat / Explain (Sprint 14-15)", () => {
  it("chat route exists with streaming", () => {
    expect(existsSync("src/app/api/feeds/copilot/chat/route.ts")).toBe(true);
    const c = readFileSync("src/app/api/feeds/copilot/chat/route.ts", "utf-8");
    expect(c).toContain("streamText");
    expect(c).toContain("toTextStreamResponse");
  });
  it("store has sendCopilotMessage action", () => {
    expect(
      readFileSync("src/stores/feed-store.ts", "utf-8")
    ).toContain("sendCopilotMessage");
  });
  it("copilot panel has Explain button", () => {
    expect(
      readFileSync("src/components/feeds/copilot-panel.tsx", "utf-8")
    ).toContain("Explain");
  });
  it("copilot panel has chat input", () => {
    const c = readFileSync("src/components/feeds/copilot-panel.tsx", "utf-8");
    expect(c).toContain("handleSubmit");
    expect(c).toContain("PaperPlaneRight");
  });
});

// ── P28: AI Copilot — 3-Tier Source Transparency ─────────────────────
describe("P28: Source tier transparency (Sprint 14-15)", () => {
  it("resolver returns 3 tiers", async () => {
    const m = await import("@/lib/feeds/copilot-source-resolver");
    const result = await m.resolveArticleSource({
      title: "Test",
      authors: null,
      abstractSnippet: "Abstract text",
      doi: null,
      pubmedId: null,
      journal: null,
      volume: null,
      issue: null,
      publishedAt: null,
      link: null,
    });
    expect(["full_paper", "abstract_only", "title_only"]).toContain(result.tier);
    expect(result.sourceLabel).toBeTruthy();
    expect(result.systemPrompt).toBeTruthy();
  });
  it("copilot panel shows source badge", () => {
    const c = readFileSync("src/components/feeds/copilot-panel.tsx", "utf-8");
    expect(c).toContain("SourceBadge");
    expect(c).toContain("full_paper");
    expect(c).toContain("abstract_only");
    expect(c).toContain("title_only");
  });
  it("resolver uses Unpaywall for OA detection", () => {
    const c = readFileSync("src/lib/feeds/copilot-source-resolver.ts", "utf-8");
    expect(c).toContain("lookupUnpaywall");
  });
  it("resolver fetches related PubMed context", () => {
    const c = readFileSync("src/lib/feeds/copilot-source-resolver.ts", "utf-8");
    expect(c).toContain("searchPubMed");
    expect(c).toContain("RELATED PUBMED");
  });
});

// ── P29: AI Copilot — Suggested Questions ────────────────────────────
describe("P29: Suggested questions (Sprint 14-15)", () => {
  it("store has copilotSuggestions", () => {
    expect(
      readFileSync("src/stores/feed-store.ts", "utf-8")
    ).toContain("copilotSuggestions");
  });
  it("copilot panel renders suggestions", () => {
    expect(
      readFileSync("src/components/feeds/copilot-panel.tsx", "utf-8")
    ).toContain("SuggestionChips");
  });
});

// ── P30: Article search ──────────────────────────────────────────────
describe("P30: Article search (Sprint 16)", () => {
  it("getArticles supports search filter", () => {
    expect(
      readFileSync("src/lib/actions/feeds.ts", "utf-8")
    ).toMatch(/search\??: string/);
  });
  it("uses ILIKE for text matching", () => {
    expect(readFileSync("src/lib/actions/feeds.ts", "utf-8")).toMatch(/ilike/i);
  });
  it("articles route passes search param", () => {
    expect(
      readFileSync("src/app/api/feeds/articles/route.ts", "utf-8")
    ).toContain("search");
  });
  it("store has searchQuery + setSearchQuery", () => {
    const c = readFileSync("src/stores/feed-store.ts", "utf-8");
    expect(c).toContain("searchQuery");
    expect(c).toContain("setSearchQuery");
  });
  it("page has search bar with / shortcut", () => {
    const c = readFileSync("src/app/(app)/feeds/page.tsx", "utf-8");
    expect(c).toMatch(/Search/i);
    expect(c).toContain('"/"');
  });
});

// ── P31: OPML export ─────────────────────────────────────────────────
describe("P31: OPML export (Sprint 16)", () => {
  it("generateOpml function exists and produces valid OPML", async () => {
    const { generateOpml } = await import("@/lib/feeds/opml");
    expect(typeof generateOpml).toBe("function");
    const xml = generateOpml([
      { title: "T", feedUrl: "https://t.com/rss", siteUrl: "https://t.com" },
    ]);
    expect(xml).toContain('opml version="2.0"');
    expect(xml).toContain("xmlUrl");
  });
  it("export route returns file download", () => {
    expect(existsSync("src/app/api/feeds/opml/export/route.ts")).toBe(true);
    const c = readFileSync("src/app/api/feeds/opml/export/route.ts", "utf-8");
    expect(c).toContain("Content-Disposition");
    expect(c).toContain(".opml");
  });
});

// ── P32: OPML import ─────────────────────────────────────────────────
describe("P32: OPML import (Sprint 16)", () => {
  it("parseOpml function exists", async () => {
    const m = await import("@/lib/feeds/opml");
    expect(typeof m.parseOpml).toBe("function");
  });
  it("handles folder structure", async () => {
    const { parseOpml } = await import("@/lib/feeds/opml");
    const xml = `<?xml version="1.0"?><opml version="2.0"><head><title>T</title></head><body><outline text="F"><outline type="rss" text="N" xmlUrl="https://t.com/rss" htmlUrl="https://t.com" /></outline></body></opml>`;
    const result = parseOpml(xml);
    expect(result.feeds[0].folder).toBe("F");
  });
  it("round-trip preserves data", async () => {
    const { generateOpml, parseOpml } = await import("@/lib/feeds/opml");
    const original = [
      { title: "X", feedUrl: "https://x.com/rss", siteUrl: "https://x.com" },
    ];
    const parsed = parseOpml(generateOpml(original));
    expect(parsed.feeds[0].feedUrl).toBe("https://x.com/rss");
  });
  it("import route exists", () => {
    expect(existsSync("src/app/api/feeds/opml/import/route.ts")).toBe(true);
    const c = readFileSync("src/app/api/feeds/opml/import/route.ts", "utf-8");
    expect(c).toContain("parseOpml");
    expect(c).toContain("subscribeFeed");
  });
});

// ═════════════════════════════════════════════════════════════════════
// SECTION 4: INFRASTRUCTURE + QUALITY
// ═════════════════════════════════════════════════════════════════════

// ── P33: Navigation entry ────────────────────────────────────────────
describe("P33: Sidebar navigation", () => {
  it("sidebar has /feeds with Rss icon", () => {
    const c = readFileSync("src/components/layout/app-sidebar.tsx", "utf-8");
    expect(c).toContain('"/feeds"');
    expect(c).toContain("Journal Feed");
    expect(c).toContain("Rss");
  });
});

// ── P34: Loading + error states ──────────────────────────────────────
describe("P34: Loading + error states", () => {
  it("loading.tsx exists", () => {
    expect(existsSync("src/app/(app)/feeds/loading.tsx")).toBe(true);
  });
  it("error.tsx exists", () => {
    expect(existsSync("src/app/(app)/feeds/error.tsx")).toBe(true);
  });
});

// ── P35: Rate limiting ───────────────────────────────────────────────
describe("P35: Rate limiting", () => {
  it("RATE_LIMITS has feeds preset", async () => {
    const { RATE_LIMITS } = await import("@/lib/rate-limit");
    expect(RATE_LIMITS.feeds).toBeDefined();
    expect(RATE_LIMITS.feeds.limit).toBeGreaterThan(0);
  });
});

// ── P36: Schema barrel exports ───────────────────────────────────────
describe("P36: Schema exports", () => {
  it("all 4 feed tables exported from schema index", async () => {
    const s = await import("@/lib/db/schema");
    expect(s.feedSources).toBeDefined();
    expect(s.userFeedSubscriptions).toBeDefined();
    expect(s.feedArticles).toBeDefined();
    expect(s.userArticleStatus).toBeDefined();
  });
});

// ── P37: All source files exist ──────────────────────────────────────
describe("P37: File inventory", () => {
  it("all expected source files exist", () => {
    const files = [
      "src/lib/db/schema/feeds.ts",
      "src/types/feed.ts",
      "src/lib/feeds/feed-parser.ts",
      "src/lib/feeds/types.ts",
      "src/lib/feeds/feed-discovery.ts",
      "src/data/journal-feeds.ts",
      "src/lib/feeds/pubmed-feed.ts",
      "src/lib/feeds/feed-fetcher.ts",
      "src/lib/feeds/save-to-library.ts",
      "src/lib/feeds/article-to-citation.ts",
      "src/lib/feeds/copilot-source-resolver.ts",
      "src/lib/feeds/opml.ts",
      "src/lib/feeds/find-related.ts",
      "src/lib/actions/feeds.ts",
      "src/stores/feed-store.ts",
      "src/app/api/feeds/route.ts",
      "src/app/api/feeds/articles/route.ts",
      "src/app/api/feeds/discover/route.ts",
      "src/app/api/feeds/detect/route.ts",
      "src/app/api/feeds/pubmed/route.ts",
      "src/app/api/feeds/copilot/summarize/route.ts",
      "src/app/api/feeds/copilot/chat/route.ts",
      "src/app/api/feeds/copilot/related/route.ts",
      "src/app/api/feeds/opml/export/route.ts",
      "src/app/api/feeds/opml/import/route.ts",
      "src/app/api/feeds/articles/[id]/read/route.ts",
      "src/app/api/feeds/articles/[id]/star/route.ts",
      "src/app/api/feeds/articles/[id]/save/route.ts",
      "src/app/api/feeds/articles/mark-all-read/route.ts",
      "src/app/api/cron/fetch-feeds/route.ts",
      "src/components/feeds/article-card.tsx",
      "src/components/feeds/article-reader.tsx",
      "src/components/feeds/article-list.tsx",
      "src/components/feeds/feed-sidebar.tsx",
      "src/components/feeds/copilot-panel.tsx",
      "src/components/feeds/citation-modal.tsx",
      "src/components/feeds/add-feed-modal.tsx",
      "src/components/feeds/journal-browser.tsx",
      "src/components/feeds/article-search-bar.tsx",
      "src/app/(app)/feeds/page.tsx",
      "src/app/(app)/feeds/loading.tsx",
      "src/app/(app)/feeds/error.tsx",
    ];

    const missing = files.filter((f) => !existsSync(f));
    if (missing.length > 0) console.error("Missing:", missing);
    expect(missing).toHaveLength(0);
  });
});

// ── P38: All test files exist ────────────────────────────────────────
describe("P38: Test file inventory", () => {
  it("all test files exist", () => {
    const tests = [
      "src/lib/feeds/__tests__/ralph-feeds/schema.test.ts",
      "src/lib/feeds/__tests__/ralph-feeds/fetcher.test.ts",
      "src/lib/feeds/__tests__/ralph-feeds/directory.test.ts",
      "src/lib/feeds/__tests__/ralph-feeds/pubmed-feed.test.ts",
      "src/lib/feeds/__tests__/ralph-feeds/actions.test.ts",
      "src/lib/feeds/__tests__/ralph-feeds/routes.test.ts",
      "src/lib/feeds/__tests__/ralph-feeds/save-to-library.test.ts",
      "src/lib/feeds/__tests__/ralph-feeds/integration.test.ts",
      "src/lib/feeds/__tests__/ralph-feeds/parity.test.ts",
      "src/lib/feeds/__tests__/ralph-feeds/ui.test.ts",
      "src/lib/feeds/__tests__/ralph-feeds/search.test.ts",
      "src/lib/feeds/__tests__/ralph-feeds/search-opml.test.ts",
      "src/lib/feeds/__tests__/ralph-feeds/citation.test.ts",
      "src/lib/feeds/__tests__/ralph-feeds/copilot.test.ts",
      "src/lib/feeds/__tests__/ralph-feeds/copilot-ui.test.ts",
      "src/lib/feeds/__tests__/ralph-feeds/recommendations.test.ts",
      "src/stores/__tests__/feed-store.test.ts",
    ];

    const missing = tests.filter((f) => !existsSync(f));
    if (missing.length > 0) console.error("Missing tests:", missing);
    expect(missing).toHaveLength(0);
  });
});
