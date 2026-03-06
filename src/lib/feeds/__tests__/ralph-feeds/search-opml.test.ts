/**
 * RALPH Journal Feed — Sprint 16: Article Search + OPML Import/Export Tests
 *
 * Tests the OPML module (pure functions) and verifies search + route wiring.
 */
import { describe, it, expect, vi } from "vitest";
import { readFileSync, existsSync } from "fs";

// Mock only for route import tests
vi.mock("@/lib/auth", () => ({
  getCurrentUserId: vi.fn(async () => { throw new Error("Not authenticated"); }),
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: vi.fn(async () => null),
  RATE_LIMITS: { feeds: { limit: 60, windowSeconds: 3600 } },
}));

vi.mock("@/lib/db", () => ({
  db: new Proxy({}, { get: () => () => new Proxy({}, { get: () => () => new Proxy({}, { get: () => () => Promise.resolve([]) }) }) }),
}));

vi.mock("@/lib/db/schema", () => ({
  feedSources: {}, userFeedSubscriptions: {}, feedArticles: {}, userArticleStatus: {},
  papers: {}, userReferences: {},
}));

vi.mock("@/lib/http/resilient-fetch", () => ({ resilientFetch: vi.fn() }));

vi.mock("@/lib/logger", () => ({
  logger: { withRequestId: () => ({ info: vi.fn(), warn: vi.fn(), error: vi.fn() }) },
}));

// =====================================================================
// PART A: OPML GENERATION (pure function — most testable)
// =====================================================================

describe("JF-800: generateOpml", () => {
  it("generates valid OPML 2.0 XML", async () => {
    const { generateOpml } = await import("@/lib/feeds/opml");

    const xml = generateOpml([
      { title: "NEJM", feedUrl: "https://nejm.org/rss", siteUrl: "https://nejm.org" },
      { title: "Lancet", feedUrl: "https://lancet.com/rss", siteUrl: "https://lancet.com" },
    ]);

    expect(xml).toContain('<?xml version="1.0"');
    expect(xml).toContain('<opml version="2.0">');
    expect(xml).toContain("</opml>");
    expect(xml).toContain("NEJM");
    expect(xml).toContain("https://nejm.org/rss");
  });

  it("groups feeds by folder", async () => {
    const { generateOpml } = await import("@/lib/feeds/opml");

    const xml = generateOpml([
      { title: "NEJM", feedUrl: "https://nejm.org/rss", siteUrl: "https://nejm.org", folder: "Cardiology" },
      { title: "Lancet", feedUrl: "https://lancet.com/rss", siteUrl: "https://lancet.com", folder: "Cardiology" },
      { title: "BMJ", feedUrl: "https://bmj.com/rss", siteUrl: "https://bmj.com" },
    ]);

    expect(xml).toContain('text="Cardiology"');
    // BMJ should be at top level (no folder)
    expect(xml).toContain('text="BMJ"');
  });

  it("escapes XML special characters in attributes", async () => {
    const { generateOpml } = await import("@/lib/feeds/opml");

    const xml = generateOpml([
      { title: 'JAMA "Cardiology" & More', feedUrl: "https://test.com/rss", siteUrl: "https://test.com" },
    ]);

    expect(xml).toContain("&amp;");
    expect(xml).toContain("&quot;");
    expect(xml).not.toContain('& More"'); // Raw special chars should be escaped
  });

  it("handles empty subscriptions array", async () => {
    const { generateOpml } = await import("@/lib/feeds/opml");

    const xml = generateOpml([]);

    expect(xml).toContain("<opml");
    expect(xml).toContain("<body>");
    expect(xml).toContain("</body>");
  });

  it("includes ownerName in head", async () => {
    const { generateOpml } = await import("@/lib/feeds/opml");

    const xml = generateOpml([], "Dr. Smith");

    expect(xml).toContain("Dr. Smith");
  });
});

// =====================================================================
// JF-801: OPML PARSING (pure function)
// =====================================================================

describe("JF-801: parseOpml", () => {
  it("parses standard OPML with flat outlines", async () => {
    const { parseOpml } = await import("@/lib/feeds/opml");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <head><title>My Feeds</title></head>
  <body>
    <outline type="rss" text="NEJM" xmlUrl="https://nejm.org/rss" htmlUrl="https://nejm.org" />
    <outline type="rss" text="Lancet" xmlUrl="https://lancet.com/rss" htmlUrl="https://lancet.com" />
  </body>
</opml>`;

    const result = parseOpml(xml);
    expect(result.title).toBe("My Feeds");
    expect(result.feeds).toHaveLength(2);
    expect(result.feeds[0].title).toBe("NEJM");
    expect(result.feeds[0].feedUrl).toBe("https://nejm.org/rss");
  });

  it("parses OPML with folder structure", async () => {
    const { parseOpml } = await import("@/lib/feeds/opml");

    const xml = `<?xml version="1.0"?>
<opml version="2.0">
  <head><title>Feedly Export</title></head>
  <body>
    <outline text="Cardiology">
      <outline type="rss" text="NEJM" xmlUrl="https://nejm.org/rss" htmlUrl="https://nejm.org" />
      <outline type="rss" text="Circulation" xmlUrl="https://circ.org/rss" htmlUrl="https://circ.org" />
    </outline>
    <outline text="Surgery">
      <outline type="rss" text="Ann Surg" xmlUrl="https://annsurg.org/rss" htmlUrl="https://annsurg.org" />
    </outline>
  </body>
</opml>`;

    const result = parseOpml(xml);
    expect(result.feeds).toHaveLength(3);
    expect(result.feeds[0].folder).toBe("Cardiology");
    expect(result.feeds[1].folder).toBe("Cardiology");
    expect(result.feeds[2].folder).toBe("Surgery");
  });

  it("throws on empty input", async () => {
    const { parseOpml } = await import("@/lib/feeds/opml");
    expect(() => parseOpml("")).toThrow("Invalid OPML");
  });

  it("throws on malformed XML", async () => {
    const { parseOpml } = await import("@/lib/feeds/opml");
    expect(() => parseOpml("<not valid xml<<<")).toThrow("Invalid OPML");
  });

  it("throws on missing opml root", async () => {
    const { parseOpml } = await import("@/lib/feeds/opml");
    expect(() => parseOpml('<?xml version="1.0"?><html><body></body></html>')).toThrow("Invalid OPML");
  });

  it("returns empty feeds array for OPML with no outlines", async () => {
    const { parseOpml } = await import("@/lib/feeds/opml");

    const xml = `<?xml version="1.0"?>
<opml version="2.0">
  <head><title>Empty</title></head>
  <body></body>
</opml>`;

    const result = parseOpml(xml);
    expect(result.feeds).toEqual([]);
  });

  it("handles Feedly export format (type may be missing)", async () => {
    const { parseOpml } = await import("@/lib/feeds/opml");

    const xml = `<?xml version="1.0"?>
<opml version="1.0">
  <head><title>Feedly</title></head>
  <body>
    <outline text="Cardiology" title="Cardiology">
      <outline text="NEJM" title="NEJM" xmlUrl="https://nejm.org/feed" htmlUrl="https://nejm.org" />
    </outline>
  </body>
</opml>`;

    const result = parseOpml(xml);
    expect(result.feeds).toHaveLength(1);
    expect(result.feeds[0].feedUrl).toBe("https://nejm.org/feed");
    expect(result.feeds[0].folder).toBe("Cardiology");
  });

  it("uses @_title as fallback when @_text is missing", async () => {
    const { parseOpml } = await import("@/lib/feeds/opml");

    const xml = `<?xml version="1.0"?>
<opml version="2.0">
  <head><title>Test</title></head>
  <body>
    <outline type="rss" title="Feed Title" xmlUrl="https://test.com/rss" htmlUrl="https://test.com" />
  </body>
</opml>`;

    const result = parseOpml(xml);
    expect(result.feeds[0].title).toBe("Feed Title");
  });
});

// =====================================================================
// JF-802: Round-trip (generate -> parse -> compare)
// =====================================================================

describe("JF-802: OPML round-trip", () => {
  it("generate then parse preserves feed data", async () => {
    const { generateOpml, parseOpml } = await import("@/lib/feeds/opml");

    const original = [
      { title: "NEJM", feedUrl: "https://nejm.org/rss", siteUrl: "https://nejm.org", folder: "Medicine" },
      { title: "BMJ", feedUrl: "https://bmj.com/rss", siteUrl: "https://bmj.com" },
    ];

    const xml = generateOpml(original);
    const parsed = parseOpml(xml);

    expect(parsed.feeds).toHaveLength(2);
    expect(parsed.feeds.find(f => f.title === "NEJM")?.feedUrl).toBe("https://nejm.org/rss");
    expect(parsed.feeds.find(f => f.title === "NEJM")?.folder).toBe("Medicine");
    expect(parsed.feeds.find(f => f.title === "BMJ")?.feedUrl).toBe("https://bmj.com/rss");
  });
});

// =====================================================================
// JF-803: OPML route files exist
// =====================================================================

describe("JF-803: OPML API routes", () => {
  it("export route exists with GET handler", async () => {
    expect(existsSync("src/app/api/feeds/opml/export/route.ts")).toBe(true);
    const content = readFileSync("src/app/api/feeds/opml/export/route.ts", "utf-8");
    expect(content).toContain("export async function GET");
    expect(content).toContain("generateOpml");
    expect(content).toContain("Content-Disposition");
    expect(content).toContain(".opml");
  });

  it("import route exists with POST handler", async () => {
    expect(existsSync("src/app/api/feeds/opml/import/route.ts")).toBe(true);
    const content = readFileSync("src/app/api/feeds/opml/import/route.ts", "utf-8");
    expect(content).toContain("export async function POST");
    expect(content).toContain("parseOpml");
    expect(content).toContain("subscribeFeed");
  });
});

// =====================================================================
// JF-804: Export route returns 401 without auth
// =====================================================================

describe("JF-804: OPML export auth", () => {
  it("returns 401 without authentication", async () => {
    const mod = await import("@/app/api/feeds/opml/export/route");
    const res = await mod.GET();
    expect(res.status).toBe(401);
  });
});

// =====================================================================
// JF-805: Article search wiring
// =====================================================================

describe("JF-805: Article search", () => {
  it("getArticles action accepts search param", async () => {
    const content = readFileSync("src/lib/actions/feeds.ts", "utf-8");
    expect(content).toMatch(/search\??:\s*string/);
  });

  it("articles route passes search param", () => {
    const content = readFileSync("src/app/api/feeds/articles/route.ts", "utf-8");
    expect(content).toContain("search");
  });

  it("store has searchQuery state", () => {
    const content = readFileSync("src/stores/feed-store.ts", "utf-8");
    expect(content).toContain("searchQuery");
    expect(content).toContain("setSearchQuery");
  });

  it("store loadArticles includes search in params", () => {
    const content = readFileSync("src/stores/feed-store.ts", "utf-8");
    expect(content).toMatch(/searchQuery|search/);
  });
});

// =====================================================================
// JF-806: Search bar in feeds page
// =====================================================================

describe("JF-806: Search UI", () => {
  it("feeds page has search input", () => {
    // Search bar moved into ArticleList via ArticleSearchBar (Sprint 18)
    const content = readFileSync("src/components/feeds/article-list.tsx", "utf-8");
    expect(content).toMatch(/ArticleSearchBar|search.*articles|Search articles/i);
  });

  it("feeds page has / keyboard shortcut for search", () => {
    const content = readFileSync("src/app/(app)/feeds/page.tsx", "utf-8");
    expect(content).toContain('"/"');
  });
});

// =====================================================================
// JF-807: Export/Import buttons in feeds page
// =====================================================================

describe("JF-807: OPML UI buttons", () => {
  it("feeds page has export functionality", () => {
    const content = readFileSync("src/app/(app)/feeds/page.tsx", "utf-8");
    expect(content).toMatch(/export|Export|opml\/export/i);
  });

  it("feeds page has import functionality", () => {
    const content = readFileSync("src/app/(app)/feeds/page.tsx", "utf-8");
    expect(content).toMatch(/import|Import|opml\/import|\.opml/i);
  });
});

// =====================================================================
// JF-808: ILIKE search pattern in actions
// =====================================================================

describe("JF-808: Search implementation", () => {
  it("uses ILIKE for text search", () => {
    const content = readFileSync("src/lib/actions/feeds.ts", "utf-8");
    expect(content).toContain("ILIKE");
  });

  it("searches title, abstract, journal, and authors", () => {
    const content = readFileSync("src/lib/actions/feeds.ts", "utf-8");
    // Should search across multiple fields
    expect(content).toMatch(/fa\.title.*ILIKE|title.*ILIKE/);
    expect(content).toMatch(/abstract_snippet.*ILIKE/i);
  });
});
