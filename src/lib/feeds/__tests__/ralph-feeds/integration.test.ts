/**
 * RALPH Journal Feed — Sprint 11: Cross-Module Integration Tests
 *
 * Verifies that modules from different sprints work together correctly.
 * Uses real module implementations where possible and mocks only external I/O.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockResilientFetch = vi.fn();

vi.mock("@/lib/http/resilient-fetch", () => ({
  resilientFetch: (...args: unknown[]) => mockResilientFetch(...args),
}));

function mockResponse(body: string, contentType = "application/rss+xml"): Response {
  return {
    headers: new Headers({ "content-type": contentType }),
    text: async () => body,
  } as unknown as Response;
}

beforeEach(() => {
  mockResilientFetch.mockReset();
});

// =====================================================================
// JF-300: Parser output matches fetcher's expected input
// =====================================================================
describe("JF-300: Parser -> Fetcher compatibility", () => {
  it("parseFeed returns ParsedArticle objects with all fields the fetcher needs", async () => {
    const { parseFeed } = await import("@/lib/feeds/feed-parser");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Test</title>
    <link>https://test.com</link>
    <description>Test</description>
    <item>
      <title>Test Article</title>
      <link>https://test.com/1</link>
      <guid>test-001</guid>
      <dc:creator>Smith J</dc:creator>
      <description>Test abstract</description>
      <pubDate>Mon, 03 Mar 2026 08:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>`;

    const feed = parseFeed(rss);
    expect(feed.articles).toHaveLength(1);

    const article = feed.articles[0];
    expect(article).toHaveProperty("guid");
    expect(article).toHaveProperty("title");
    expect(article).toHaveProperty("authors");
    expect(article).toHaveProperty("abstractSnippet");
    expect(article).toHaveProperty("link");
    expect(article).toHaveProperty("doi");
    expect(article).toHaveProperty("pubmedId");
    expect(article).toHaveProperty("publishedAt");
    expect(article).toHaveProperty("imageUrl");
    expect(article).toHaveProperty("contentHtml");
    expect(article).toHaveProperty("journal");
    expect(article).toHaveProperty("volume");
    expect(article).toHaveProperty("issue");

    expect(typeof article.guid).toBe("string");
    expect(article.guid.length).toBeGreaterThan(0);
    expect(typeof article.title).toBe("string");
    expect(article.title.length).toBeGreaterThan(0);
    expect(article.publishedAt === null || article.publishedAt instanceof Date).toBe(true);
  });
});

// =====================================================================
// JF-301: Parser handles all fixture formats without crashing
// =====================================================================
describe("JF-301: Parser robustness across all fixtures", () => {
  it("parses every fixture file in the fixtures directory", async () => {
    const { parseFeed } = await import("@/lib/feeds/feed-parser");
    const fs = await import("node:fs");
    const path = await import("node:path");

    const fixturesDir = path.join(
      process.cwd(),
      "src/lib/feeds/__tests__/ralph-feeds/fixtures"
    );

    if (!fs.existsSync(fixturesDir)) {
      return;
    }

    const files = fs.readdirSync(fixturesDir).filter((f) => f.endsWith(".xml"));
    expect(files.length).toBeGreaterThan(0);

    for (const file of files) {
      const xml = fs.readFileSync(path.join(fixturesDir, file), "utf-8");
      expect(() => parseFeed(xml)).not.toThrow();
    }
  });
});

// =====================================================================
// JF-302: ParsedArticle -> SaveToLibrary field mapping
// =====================================================================
describe("JF-302: Parser -> Save-to-Library field compatibility", () => {
  it("parseAuthorsToArray handles parser output format", async () => {
    const { parseAuthorsToArray } = await import("@/lib/feeds/save-to-library");

    expect(parseAuthorsToArray("Smith J, Jones K")).toEqual(["Smith J", "Jones K"]);
    expect(parseAuthorsToArray(null)).toEqual([]);
    expect(parseAuthorsToArray("Single Author")).toEqual(["Single Author"]);
  });
});

// =====================================================================
// JF-303: Journal directory entries have valid structure
// =====================================================================
describe("JF-303: Journal directory data integrity", () => {
  it("every entry can be used to create a feedSource", async () => {
    const { JOURNAL_FEEDS } = await import("@/data/journal-feeds");
    expect(Array.isArray(JOURNAL_FEEDS)).toBe(true);
    expect(JOURNAL_FEEDS.length).toBeGreaterThan(0);

    for (const feed of JOURNAL_FEEDS) {
      expect(typeof feed.title).toBe("string");
      expect(typeof feed.feedUrl).toBe("string");
      expect(feed.feedUrl.startsWith("https://")).toBe(true);
      expect(typeof feed.siteUrl).toBe("string");
      expect(typeof feed.publisher).toBe("string");
      expect(typeof feed.category).toBe("string");
      expect(typeof feed.specialty).toBe("string");
    }
  });
});

// =====================================================================
// JF-304: PubMed feed URL format is parseable by the parser
// =====================================================================
describe("JF-304: PubMed feed URL -> parser compatibility", () => {
  it("PubMed RSS XML format is supported by parseFeed", async () => {
    const { parseFeed } = await import("@/lib/feeds/feed-parser");

    const pubmedRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>PubMed: test query - Search Results</title>
    <link>https://pubmed.ncbi.nlm.nih.gov</link>
    <description>Search results</description>
    <item>
      <title>Test PubMed Article</title>
      <link>https://pubmed.ncbi.nlm.nih.gov/12345678/</link>
      <guid>https://pubmed.ncbi.nlm.nih.gov/12345678/</guid>
      <description>Abstract text here</description>
      <pubDate>Mon, 03 Mar 2026 06:00:00 EST</pubDate>
    </item>
  </channel>
</rss>`;

    const feed = parseFeed(pubmedRss);
    expect(feed.articles).toHaveLength(1);
    expect(feed.articles[0].pubmedId).toBe("12345678");
  });
});

// =====================================================================
// JF-305: Feed type enum values in schema match discovery output
// =====================================================================
describe("JF-305: Schema enum <-> discovery output alignment", () => {
  it("validateFeedUrl feedType values are valid feedTypeEnum values", async () => {
    const { feedTypeEnum } = await import("@/lib/db/schema/enums");
    const { validateFeedUrl } = await import("@/lib/feeds/feed-discovery");

    const rss = `<?xml version="1.0"?><rss version="2.0"><channel><title>T</title><link>https://t.com</link><description>D</description></channel></rss>`;
    const atom = `<?xml version="1.0"?><feed xmlns="http://www.w3.org/2005/Atom"><title>T</title><id>urn:test</id><updated>2026-01-01T00:00:00Z</updated></feed>`;

    mockResilientFetch.mockResolvedValueOnce(mockResponse(rss, "application/rss+xml"));
    const rssFeed = await validateFeedUrl("https://example.com/rss");

    mockResilientFetch.mockResolvedValueOnce(mockResponse(atom, "application/atom+xml"));
    const atomFeed = await validateFeedUrl("https://example.com/atom");

    expect(feedTypeEnum.enumValues).toContain(rssFeed.feedType);
    expect(feedTypeEnum.enumValues).toContain(atomFeed.feedType);
  });
});

// =====================================================================
// JF-306: paperSourceEnum includes "feed"
// =====================================================================
describe('JF-306: paperSourceEnum has "feed" value', () => {
  it("papers can be created with source='feed'", async () => {
    const { paperSourceEnum } = await import("@/lib/db/schema/enums");
    expect(paperSourceEnum.enumValues).toContain("feed");
  });
});

// =====================================================================
// JF-307: Feed store API paths match route file paths
// =====================================================================
describe("JF-307: Store -> Route path alignment", () => {
  it("store fetches correct API paths", async () => {
    const fs = await import("node:fs");
    const storePath = "src/stores/feed-store.ts";

    expect(fs.existsSync(storePath)).toBe(true);
    const content = fs.readFileSync(storePath, "utf-8");

    expect(content).toContain('"/api/feeds"');
    expect(content).toContain("/api/feeds/articles");
    expect(content).toContain("/api/feeds/articles/mark-all-read");

    const routePaths = [
      "src/app/api/feeds/route.ts",
      "src/app/api/feeds/articles/route.ts",
      "src/app/api/feeds/articles/mark-all-read/route.ts",
      "src/app/api/feeds/discover/route.ts",
      "src/app/api/feeds/detect/route.ts",
      "src/app/api/feeds/pubmed/route.ts",
      "src/app/api/cron/fetch-feeds/route.ts",
    ];

    for (const routePath of routePaths) {
      expect(fs.existsSync(routePath), `Missing route file: ${routePath}`).toBe(true);
    }
  });
});

// =====================================================================
// JF-308: Sidebar has feed navigation entry
// =====================================================================
describe("JF-308: Navigation entry exists", () => {
  it("app-sidebar.tsx contains /feeds route", async () => {
    const fs = await import("node:fs");
    const sidebarPath = "src/components/layout/app-sidebar.tsx";
    const content = fs.readFileSync(sidebarPath, "utf-8");

    expect(content).toContain('"/feeds"');
    expect(content).toContain("Journal Feed");
  });
});

// =====================================================================
// JF-309: All feed module files exist
// =====================================================================
describe("JF-309: File inventory", () => {
  it("all expected files exist", async () => {
    const fs = await import("node:fs");

    const requiredFiles = [
      "src/lib/db/schema/feeds.ts",
      "src/types/feed.ts",
      "src/lib/feeds/feed-parser.ts",
      "src/lib/feeds/types.ts",
      "src/lib/feeds/feed-discovery.ts",
      "src/data/journal-feeds.ts",
      "src/lib/feeds/pubmed-feed.ts",
      "src/lib/feeds/feed-fetcher.ts",
      "src/app/api/cron/fetch-feeds/route.ts",
      "src/lib/actions/feeds.ts",
      "src/lib/feeds/save-to-library.ts",
    ];

    const missing: string[] = [];
    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) missing.push(file);
    }

    expect(missing, `Missing files: ${missing.join(", ")}`).toHaveLength(0);
  });
});

// =====================================================================
// JF-310: Rate limit preset exists
// =====================================================================
describe("JF-310: Rate limit configuration", () => {
  it("RATE_LIMITS includes feeds preset", async () => {
    const { RATE_LIMITS } = await import("@/lib/rate-limit");
    expect(RATE_LIMITS).toHaveProperty("feeds");
    expect(RATE_LIMITS.feeds.limit).toBeGreaterThan(0);
    expect(RATE_LIMITS.feeds.windowSeconds).toBeGreaterThan(0);
  });
});

// =====================================================================
// JF-311: Barrel exports include all feed tables
// =====================================================================
describe("JF-311: Schema barrel exports", () => {
  it("all feed tables are exported from schema index", async () => {
    const schema = await import("@/lib/db/schema");
    expect(schema.feedSources).toBeDefined();
    expect(schema.userFeedSubscriptions).toBeDefined();
    expect(schema.feedArticles).toBeDefined();
    expect(schema.userArticleStatus).toBeDefined();
    expect(schema.feedTypeEnum).toBeDefined();
    expect(schema.feedStatusEnum).toBeDefined();
  });
});

// =====================================================================
// JF-312: Type consistency between TS interfaces and Drizzle schema
// =====================================================================
describe("JF-312: Type system consistency", () => {
  it("FeedSource type fields align with feedSources table columns", async () => {
    const schema = await import("@/lib/db/schema/feeds");
    const columns = Object.keys(schema.feedSources);

    const required = ["id", "title", "feedUrl", "status", "feedType", "category", "specialty"];
    for (const col of required) {
      expect(columns, `Missing column ${col} in feedSources`).toContain(col);
    }
  });

  it("FeedArticle type fields align with feedArticles table columns", async () => {
    const schema = await import("@/lib/db/schema/feeds");
    const columns = Object.keys(schema.feedArticles);

    const required = ["id", "feedSourceId", "guid", "title", "doi", "pubmedId", "publishedAt"];
    for (const col of required) {
      expect(columns, `Missing column ${col} in feedArticles`).toContain(col);
    }
  });
});

// =====================================================================
// JF-313: Performance — parser doesn't regress
// =====================================================================
describe("JF-313: Parser performance", () => {
  it("parses a feed in under 50ms on average", async () => {
    const { parseFeed } = await import("@/lib/feeds/feed-parser");

    const xml = `<?xml version="1.0"?><rss version="2.0"><channel><title>T</title><link>https://t.com</link><description>D</description>${
      Array.from({ length: 50 }, (_, i) =>
        `<item><title>Article ${i}</title><link>https://t.com/${i}</link><guid>id-${i}</guid><description>Abstract ${i}</description><pubDate>Mon, 03 Mar 2026 08:00:00 GMT</pubDate></item>`
      ).join("")
    }</channel></rss>`;

    const start = performance.now();
    for (let i = 0; i < 50; i++) {
      parseFeed(xml);
    }
    const elapsed = performance.now() - start;
    const perParse = elapsed / 50;

    expect(perParse).toBeLessThan(50);
  });
});
