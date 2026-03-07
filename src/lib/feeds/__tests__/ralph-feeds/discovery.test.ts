/**
 * RALPH Journal Feed — Sprint 3: Feed Discovery Tests
 *
 * All HTTP calls are mocked via vi.mock on resilientFetch.
 * No real network requests are made.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mock resilientFetch ─────────────────────────────────────────────

const mockFetch = vi.fn();

vi.mock("@/lib/http/resilient-fetch", () => ({
  resilientFetch: (...args: unknown[]) => mockFetch(...args),
}));

// Import AFTER mock is set up
const { discoverFeeds, validateFeedUrl } = await import("@/lib/feeds/feed-discovery");

// ── Helpers ─────────────────────────────────────────────────────────

function mockResponse(body: string, contentType = "text/html", status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers({ "content-type": contentType }),
    text: () => Promise.resolve(body),
  } as unknown as Response;
}

const SIMPLE_RSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Test Journal</title>
    <link>https://www.testjournal.com</link>
    <description>A test journal feed.</description>
    <item>
      <title>Test Article</title>
      <link>https://www.testjournal.com/article/1</link>
      <guid>test-article-1</guid>
      <description>This is a test article.</description>
      <pubDate>Mon, 03 Mar 2026 08:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>`;

const SIMPLE_ATOM = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Test Atom Feed</title>
  <link href="https://www.testfeed.com" rel="alternate"/>
  <id>urn:uuid:test-feed</id>
  <updated>2026-03-05T09:00:00Z</updated>
  <entry>
    <title>Test Entry</title>
    <link href="https://www.testfeed.com/entry/1" rel="alternate"/>
    <id>test-entry-1</id>
    <updated>2026-03-05T09:00:00Z</updated>
    <summary>Test entry summary.</summary>
  </entry>
</feed>`;

const HTML_WITH_RSS_LINK = `<!DOCTYPE html>
<html>
<head>
  <title>Journal Homepage</title>
  <link rel="alternate" type="application/rss+xml" title="Journal RSS" href="/rss.xml" />
  <link rel="stylesheet" href="/style.css" />
</head>
<body><h1>Welcome</h1></body>
</html>`;

const HTML_WITH_MULTIPLE_FEEDS = `<!DOCTYPE html>
<html>
<head>
  <title>Multi-Feed Site</title>
  <link rel="alternate" type="application/rss+xml" title="News RSS" href="https://www.example.com/news/rss" />
  <link rel="alternate" type="application/atom+xml" title="Blog Atom" href="/blog/atom.xml" />
  <link rel="alternate" type="application/rss+xml" title="Research RSS" href="/research/feed.xml" />
</head>
<body><h1>Multi-Feed Site</h1></body>
</html>`;

const HTML_NO_FEEDS = `<!DOCTYPE html>
<html>
<head><title>No Feeds Here</title></head>
<body><h1>Just a regular page</h1></body>
</html>`;

const HTML_SINGLE_QUOTES = `<!DOCTYPE html>
<html>
<head>
  <link rel='alternate' type='application/rss+xml' title='Feed' href='/feed.xml' />
</head>
<body></body>
</html>`;

// ── Setup ───────────────────────────────────────────────────────────

beforeEach(() => {
  mockFetch.mockReset();
});

// =====================================================================
// JF-060: Direct RSS URL returns discovered feed
// =====================================================================
describe("JF-060: Direct RSS URL discovery", () => {
  it("returns the URL itself as a discovered feed", async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse(SIMPLE_RSS, "application/rss+xml")
    );

    const feeds = await discoverFeeds("https://www.nejm.org/rss.xml");
    expect(feeds).toHaveLength(1);
    expect(feeds[0].feedUrl).toBe("https://www.nejm.org/rss.xml");
    expect(feeds[0].title).toBe("Test Journal");
    expect(feeds[0].feedType).toBe("rss");
  });
});

// =====================================================================
// JF-061: Direct Atom URL returns discovered feed
// =====================================================================
describe("JF-061: Direct Atom URL discovery", () => {
  it("returns Atom feed with correct type", async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse(SIMPLE_ATOM, "application/atom+xml")
    );

    const feeds = await discoverFeeds("https://www.example.com/atom.xml");
    expect(feeds).toHaveLength(1);
    expect(feeds[0].feedType).toBe("atom");
    expect(feeds[0].title).toBe("Test Atom Feed");
  });
});

// =====================================================================
// JF-062: HTML page with <link rel="alternate"> extracts feed URL
// =====================================================================
describe("JF-062: HTML with feed link tag", () => {
  it("extracts RSS feed URL from link tag", async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse(HTML_WITH_RSS_LINK, "text/html")
    );

    const feeds = await discoverFeeds("https://www.journal.com");
    expect(feeds).toHaveLength(1);
    expect(feeds[0].feedUrl).toContain("/rss.xml");
    expect(feeds[0].title).toBe("Journal RSS");
  });
});

// =====================================================================
// JF-063: HTML with multiple feed links returns all
// =====================================================================
describe("JF-063: HTML with multiple feed links", () => {
  it("returns all discovered feeds", async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse(HTML_WITH_MULTIPLE_FEEDS, "text/html")
    );

    const feeds = await discoverFeeds("https://www.example.com");
    expect(feeds.length).toBeGreaterThanOrEqual(3);
  });

  it("includes both RSS and Atom types", async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse(HTML_WITH_MULTIPLE_FEEDS, "text/html")
    );

    const feeds = await discoverFeeds("https://www.example.com");
    const types = feeds.map(f => f.feedType);
    expect(types).toContain("rss");
    expect(types).toContain("atom");
  });
});

// =====================================================================
// JF-064: HTML with no feed links tries common paths
// =====================================================================
describe("JF-064: Fallback to common paths", () => {
  it("tries common paths when no link tags found", async () => {
    // First call: the page itself (HTML with no feeds)
    mockFetch.mockResolvedValueOnce(
      mockResponse(HTML_NO_FEEDS, "text/html")
    );

    // Second call: /feed path returns valid RSS
    mockFetch.mockResolvedValueOnce(
      mockResponse(SIMPLE_RSS, "application/rss+xml")
    );

    // All remaining common path attempts fail
    for (let i = 0; i < 10; i++) {
      mockFetch.mockRejectedValueOnce(new Error("404"));
    }

    const feeds = await discoverFeeds("https://www.someblog.com");
    expect(feeds.length).toBeGreaterThanOrEqual(1);
  });
});

// =====================================================================
// JF-065: Relative URLs are resolved to absolute
// =====================================================================
describe("JF-065: Relative URL resolution", () => {
  it("resolves relative href to absolute URL", async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse(HTML_WITH_RSS_LINK, "text/html")
    );

    const feeds = await discoverFeeds("https://www.journal.com/home");
    expect(feeds).toHaveLength(1);
    // /rss.xml relative to https://www.journal.com/home → https://www.journal.com/rss.xml
    expect(feeds[0].feedUrl).toMatch(/^https:\/\/www\.journal\.com\/rss\.xml$/);
  });
});

// =====================================================================
// JF-066: Invalid URL returns empty array
// =====================================================================
describe("JF-066: Invalid URL handling", () => {
  it("returns empty array for completely invalid URL", async () => {
    const feeds = await discoverFeeds("not a url at all");
    expect(feeds).toEqual([]);
    // Should NOT have called fetch
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("returns empty array for empty string", async () => {
    const feeds = await discoverFeeds("");
    expect(feeds).toEqual([]);
  });
});

// =====================================================================
// JF-067: 404 response returns empty array
// =====================================================================
describe("JF-067: HTTP 404 handling", () => {
  it("returns empty array when URL returns 404", async () => {
    mockFetch.mockRejectedValueOnce(new Error("[RSS-Discovery] HTTP 404"));

    const feeds = await discoverFeeds("https://www.example.com/nonexistent");
    expect(feeds).toEqual([]);
  });
});

// =====================================================================
// JF-068: HTTP 500 handling
// =====================================================================
describe("JF-068: HTTP 500 handling", () => {
  it("returns empty array on server error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("[RSS-Discovery] HTTP 500"));

    const feeds = await discoverFeeds("https://www.broken.com");
    expect(feeds).toEqual([]);
  });
});

// =====================================================================
// JF-069: Timeout returns empty array
// =====================================================================
describe("JF-069: Timeout handling", () => {
  it("returns empty array on timeout", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Request timed out"));

    const feeds = await discoverFeeds("https://www.slow-server.com");
    expect(feeds).toEqual([]);
  });
});

// =====================================================================
// JF-070: validateFeedUrl with valid RSS
// =====================================================================
describe("JF-070: validateFeedUrl success", () => {
  it("returns ParsedFeed for valid RSS URL", async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse(SIMPLE_RSS, "application/rss+xml")
    );

    const feed = await validateFeedUrl("https://www.nejm.org/rss.xml");
    expect(feed.title).toBe("Test Journal");
    expect(feed.articles).toHaveLength(1);
    expect(feed.feedType).toBe("rss");
  });
});

// =====================================================================
// JF-071: validateFeedUrl with HTML page throws
// =====================================================================
describe("JF-071: validateFeedUrl rejects HTML", () => {
  it("throws when URL returns HTML instead of feed", async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse(HTML_NO_FEEDS, "text/html")
    );

    await expect(
      validateFeedUrl("https://www.example.com")
    ).rejects.toThrow("Feed validation failed");
  });
});

// =====================================================================
// JF-072: validateFeedUrl with empty response throws
// =====================================================================
describe("JF-072: validateFeedUrl rejects empty response", () => {
  it("throws when response body is empty", async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse("", "text/xml")
    );

    await expect(
      validateFeedUrl("https://www.example.com/empty")
    ).rejects.toThrow("Feed validation failed");
  });
});

// =====================================================================
// JF-073: URL trailing slash normalization
// =====================================================================
describe("JF-073: URL normalization", () => {
  it("handles URL with trailing slash", async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse(HTML_WITH_RSS_LINK, "text/html")
    );

    const feeds = await discoverFeeds("https://www.journal.com/");
    expect(feeds).toHaveLength(1);
    // Should not produce double slashes like https://www.journal.com//rss.xml
    expect(feeds[0].feedUrl).not.toContain("//rss");
  });
});

// =====================================================================
// JF-074: URL with query parameters preserved
// =====================================================================
describe("JF-074: Query parameter preservation", () => {
  it("preserves query params in feed URL", async () => {
    const pubmedRss = SIMPLE_RSS.replace("Test Journal", "PubMed Search");
    mockFetch.mockResolvedValueOnce(
      mockResponse(pubmedRss, "application/rss+xml")
    );

    const feeds = await discoverFeeds(
      "https://pubmed.ncbi.nlm.nih.gov/rss/search/sglt2?limit=20&format=rss"
    );
    expect(feeds).toHaveLength(1);
    expect(feeds[0].feedUrl).toContain("?limit=20");
  });
});

// =====================================================================
// JF-075: discoverFeeds never throws
// =====================================================================
describe("JF-075: discoverFeeds is crash-proof", () => {
  it("returns empty array even on unexpected errors", async () => {
    mockFetch.mockImplementationOnce(() => {
      throw new TypeError("Unexpected failure");
    });

    const feeds = await discoverFeeds("https://www.broken.com");
    expect(feeds).toEqual([]);
  });

  it("returns empty array when mockFetch rejects with non-Error", async () => {
    mockFetch.mockRejectedValueOnce("string error");

    const feeds = await discoverFeeds("https://www.broken.com");
    expect(feeds).toEqual([]);
  });
});

// =====================================================================
// JF-076: validateFeedUrl propagates network errors
// =====================================================================
describe("JF-076: validateFeedUrl error propagation", () => {
  it("throws with descriptive message on network error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Connection refused"));

    await expect(
      validateFeedUrl("https://www.dead-server.com/feed")
    ).rejects.toThrow("Feed validation failed");
  });
});

// =====================================================================
// JF-077: XML with text/xml content type is detected as feed
// =====================================================================
describe("JF-077: text/xml content type", () => {
  it("treats text/xml response as potential feed", async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse(SIMPLE_RSS, "text/xml; charset=utf-8")
    );

    const feeds = await discoverFeeds("https://www.example.com/feed");
    expect(feeds).toHaveLength(1);
    expect(feeds[0].feedType).toBe("rss");
  });
});

// =====================================================================
// JF-078: URL without protocol gets https:// prepended
// =====================================================================
describe("JF-078: Protocol normalization", () => {
  it("adds https:// to bare domain", async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse(HTML_WITH_RSS_LINK, "text/html")
    );

    const feeds = await discoverFeeds("www.journal.com");
    expect(feeds).toHaveLength(1);
    // Verify fetch was called with https://
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("https://"),
      expect.anything(),
      expect.anything()
    );
  });
});

// =====================================================================
// JF-079: Single-quote HTML attributes
// =====================================================================
describe("JF-079: Single-quote attributes in HTML", () => {
  it("extracts feed links from HTML using single quotes", async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse(HTML_SINGLE_QUOTES, "text/html")
    );

    const feeds = await discoverFeeds("https://www.example.com");
    expect(feeds).toHaveLength(1);
    expect(feeds[0].feedUrl).toContain("feed.xml");
  });
});

// =====================================================================
// JF-080: discoverFeeds uses correct resilientFetch options
// =====================================================================
describe("JF-080: resilientFetch configuration", () => {
  it("passes service name and timeout to resilientFetch", async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse(SIMPLE_RSS, "application/rss+xml")
    );

    await discoverFeeds("https://www.example.com/feed.xml");

    expect(mockFetch).toHaveBeenCalledWith(
      "https://www.example.com/feed.xml",
      expect.anything(),
      expect.objectContaining({
        service: expect.any(String),
        timeout: expect.any(Number),
      })
    );
  });
});
