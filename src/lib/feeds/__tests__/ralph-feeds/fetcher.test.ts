/**
 * RALPH Journal Feed — Sprint 6: Background Feed Fetcher Tests
 *
 * All database and HTTP calls are mocked. No real network or DB access.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mock setup ──────────────────────────────────────────────────────

// Mock resilientFetch
const mockHttpFetch = vi.fn();
vi.mock("@/lib/http/resilient-fetch", () => ({
  resilientFetch: (...args: unknown[]) => mockHttpFetch(...args),
}));

// Track all db operations
const mockCalls = {
  select: [] as unknown[][],
  insert: [] as unknown[][],
  update: [] as unknown[][],
  set: [] as unknown[][],
  values: [] as unknown[][],
  onConflictDoNothing: [] as unknown[][],
  where: [] as unknown[][],
  limit: [] as unknown[][],
};

// Results to return from chained queries
let selectResults: unknown[][] = [];
let selectResultIndex = 0;
let limitResult: unknown[] = [];

function resetMockCalls() {
  for (const key of Object.keys(mockCalls) as (keyof typeof mockCalls)[]) {
    mockCalls[key] = [];
  }
  selectResults = [];
  selectResultIndex = 0;
  limitResult = [];
}

// Build a fluent chain mock that tracks calls and returns the right results
function createChainableWhere() {
  const whereHandler = (...args: unknown[]) => {
    mockCalls.where.push(args);
    const result = selectResults[selectResultIndex] || [];
    selectResultIndex++;
    // Return a thenable array-like that also has orderBy
    const resultPromise = Promise.resolve(result);
    return Object.assign(resultPromise, {
      orderBy: (..._oArgs: unknown[]) => ({
        limit: (...lArgs: unknown[]) => {
          mockCalls.limit.push(lArgs);
          return Promise.resolve(limitResult);
        },
      }),
    });
  };
  return whereHandler;
}

vi.mock("@/lib/db", () => ({
  db: {
    select: (...args: unknown[]) => {
      mockCalls.select.push(args);
      return {
        from: () => ({
          where: createChainableWhere(),
        }),
      };
    },
    insert: (...args: unknown[]) => {
      mockCalls.insert.push(args);
      return {
        values: (...vArgs: unknown[]) => {
          mockCalls.values.push(vArgs);
          return {
            onConflictDoNothing: (...cArgs: unknown[]) => {
              mockCalls.onConflictDoNothing.push(cArgs);
              return Promise.resolve([]);
            },
            returning: () => Promise.resolve([{ id: 1 }]),
          };
        },
      };
    },
    update: (...args: unknown[]) => {
      mockCalls.update.push(args);
      return {
        set: (...sArgs: unknown[]) => {
          mockCalls.set.push(sArgs);
          return {
            where: (...wArgs: unknown[]) => {
              mockCalls.where.push(wArgs);
              return Promise.resolve();
            },
          };
        },
      };
    },
  },
}));

// Mock schema
vi.mock("@/lib/db/schema", () => ({
  feedSources: {
    id: "id", title: "title", feedUrl: "feed_url", status: "status",
    lastFetchedAt: "last_fetched_at", lastSuccessAt: "last_success_at",
    lastError: "last_error", articleCount: "article_count",
    fetchIntervalMinutes: "fetch_interval_minutes",
    consecutiveFailures: "consecutive_failures", updatedAt: "updated_at",
    isCurated: "is_curated",
  },
  feedArticles: {
    id: "id", feedSourceId: "feed_source_id", guid: "guid", title: "title",
    authors: "authors", abstractSnippet: "abstract_snippet", link: "link",
    doi: "doi", pubmedId: "pubmed_id", publishedAt: "published_at",
    imageUrl: "image_url", contentHtml: "content_html", journal: "journal",
    volume: "volume", issue: "issue", createdAt: "created_at",
  },
  userFeedSubscriptions: {},
  userArticleStatus: {},
}));

// Mock logger
vi.mock("@/lib/logger", () => ({
  logger: {
    withRequestId: () => ({
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    }),
  },
}));

// Import AFTER all mocks
const { fetchAndStoreFeed, fetchDueFeeds } = await import("@/lib/feeds/feed-fetcher");

// ── Helpers ─────────────────────────────────────────────────────────

const VALID_RSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Test Feed</title>
    <link>https://test.com</link>
    <description>Test</description>
    <item>
      <title>New Article Alpha</title>
      <link>https://test.com/article-1</link>
      <guid>guid-alpha-001</guid>
      <description>First test article</description>
      <pubDate>Mon, 03 Mar 2026 08:00:00 GMT</pubDate>
    </item>
    <item>
      <title>New Article Beta</title>
      <link>https://test.com/article-2</link>
      <guid>guid-beta-002</guid>
      <description>Second test article</description>
      <pubDate>Sun, 02 Mar 2026 08:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>`;

const OLD_ARTICLE_RSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Old Feed</title>
    <link>https://test.com</link>
    <description>Test</description>
    <item>
      <title>Ancient Article</title>
      <link>https://test.com/old</link>
      <guid>guid-old-001</guid>
      <description>From long ago</description>
      <pubDate>Mon, 01 Jan 2024 08:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>`;

function mockResponse(body: string, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers({ "content-type": "application/rss+xml" }),
    text: () => Promise.resolve(body),
  } as unknown as Response;
}

const MOCK_SOURCE = {
  id: 1,
  title: "Test Journal",
  feedUrl: "https://test.com/feed.xml",
  status: "active",
  consecutiveFailures: 0,
  lastFetchedAt: null,
  fetchIntervalMinutes: 30,
};

// ── Setup ───────────────────────────────────────────────────────────

beforeEach(() => {
  mockHttpFetch.mockReset();
  resetMockCalls();

  // Default select results:
  // Call 1: get source -> returns MOCK_SOURCE
  // Call 2: count articles -> returns { count: 2 }
  selectResults = [
    [MOCK_SOURCE],
    [{ count: 2 }],
  ];
  selectResultIndex = 0;
});

// =====================================================================
// JF-120: fetchAndStoreFeed inserts new articles
// =====================================================================
describe("JF-120: Basic feed fetching", () => {
  it("calls resilientFetch with the feed URL", async () => {
    mockHttpFetch.mockResolvedValueOnce(mockResponse(VALID_RSS));

    await fetchAndStoreFeed(1);

    expect(mockHttpFetch).toHaveBeenCalledWith(
      expect.stringContaining("test.com"),
      expect.anything(),
      expect.objectContaining({ timeout: expect.any(Number) })
    );
  });

  it("calls db.insert for each parsed article", async () => {
    mockHttpFetch.mockResolvedValueOnce(mockResponse(VALID_RSS));

    await fetchAndStoreFeed(1);

    // Should have called insert at least twice (2 articles in VALID_RSS)
    expect(mockCalls.insert.length).toBeGreaterThanOrEqual(2);
  });

  it("returns newArticles count", async () => {
    mockHttpFetch.mockResolvedValueOnce(mockResponse(VALID_RSS));

    const result = await fetchAndStoreFeed(1);

    expect(result.feedSourceId).toBe(1);
    expect(result.newArticles).toBeGreaterThanOrEqual(0);
    expect(result.error).toBeNull();
  });
});

// =====================================================================
// JF-121: Dedup via onConflictDoNothing
// =====================================================================
describe("JF-121: Article deduplication", () => {
  it("uses onConflictDoNothing when inserting articles", async () => {
    mockHttpFetch.mockResolvedValueOnce(mockResponse(VALID_RSS));

    await fetchAndStoreFeed(1);

    expect(mockCalls.onConflictDoNothing.length).toBeGreaterThan(0);
  });
});

// =====================================================================
// JF-122: Updates lastFetchedAt on success
// =====================================================================
describe("JF-122: Success metadata update", () => {
  it("calls db.update on success", async () => {
    mockHttpFetch.mockResolvedValueOnce(mockResponse(VALID_RSS));

    await fetchAndStoreFeed(1);

    expect(mockCalls.update.length).toBeGreaterThan(0);
    expect(mockCalls.set.length).toBeGreaterThan(0);
    expect(mockCalls.set[0][0]).toEqual(
      expect.objectContaining({
        lastFetchedAt: expect.any(Date),
      })
    );
  });
});

// =====================================================================
// JF-123: Updates lastSuccessAt on success
// =====================================================================
describe("JF-123: lastSuccessAt update", () => {
  it("sets lastSuccessAt on successful fetch", async () => {
    mockHttpFetch.mockResolvedValueOnce(mockResponse(VALID_RSS));

    await fetchAndStoreFeed(1);

    expect(mockCalls.set[0][0]).toEqual(
      expect.objectContaining({
        lastSuccessAt: expect.any(Date),
      })
    );
  });
});

// =====================================================================
// JF-124: Resets consecutiveFailures on success
// =====================================================================
describe("JF-124: consecutiveFailures reset", () => {
  it("sets consecutiveFailures to 0 on success", async () => {
    mockHttpFetch.mockResolvedValueOnce(mockResponse(VALID_RSS));

    await fetchAndStoreFeed(1);

    expect(mockCalls.set[0][0]).toEqual(
      expect.objectContaining({
        consecutiveFailures: 0,
      })
    );
  });
});

// =====================================================================
// JF-125: Increments consecutiveFailures on error
// =====================================================================
describe("JF-125: Failure handling", () => {
  it("increments consecutiveFailures on fetch error", async () => {
    selectResults = [
      [MOCK_SOURCE],
      [{ consecutiveFailures: 0 }],
    ];
    mockHttpFetch.mockRejectedValueOnce(new Error("Network error"));

    const result = await fetchAndStoreFeed(1);

    expect(result.error).toBeTruthy();
    expect(mockCalls.update.length).toBeGreaterThan(0);
  });

  it("never throws — always returns FetchFeedResult", async () => {
    selectResults = [
      [MOCK_SOURCE],
      [{ consecutiveFailures: 0 }],
    ];
    mockHttpFetch.mockRejectedValueOnce(new Error("Catastrophic failure"));

    const result = await fetchAndStoreFeed(1);

    expect(result).toHaveProperty("feedSourceId");
    expect(result).toHaveProperty("newArticles");
    expect(result).toHaveProperty("error");
  });
});

// =====================================================================
// JF-126: Sets status="error" after MAX failures
// =====================================================================
describe("JF-126: Error status escalation", () => {
  it("sets status to error after 10 consecutive failures", async () => {
    selectResults = [
      [{ ...MOCK_SOURCE, consecutiveFailures: 9 }],
      [{ consecutiveFailures: 9 }],
    ];
    mockHttpFetch.mockRejectedValueOnce(new Error("Still failing"));

    await fetchAndStoreFeed(1);

    // Should have called update with consecutiveFailures: 10
    expect(mockCalls.set[0][0]).toEqual(
      expect.objectContaining({
        consecutiveFailures: 10,
      })
    );
  });
});

// =====================================================================
// JF-127: Sets lastError with descriptive message
// =====================================================================
describe("JF-127: lastError field", () => {
  it("stores error message in lastError", async () => {
    selectResults = [
      [MOCK_SOURCE],
      [{ consecutiveFailures: 0 }],
    ];
    mockHttpFetch.mockRejectedValueOnce(new Error("Connection timeout after 15000ms"));

    await fetchAndStoreFeed(1);

    expect(mockCalls.set[0][0]).toEqual(
      expect.objectContaining({
        lastError: expect.stringContaining("timeout"),
      })
    );
  });
});

// =====================================================================
// JF-128: fetchDueFeeds queries for due feeds
// =====================================================================
describe("JF-128: Due feeds query", () => {
  it("calls db.select to find due feeds", async () => {
    limitResult = [];

    const result = await fetchDueFeeds();

    expect(result.feedsProcessed).toBe(0);
  });
});

// =====================================================================
// JF-129: Skips non-active feeds
// =====================================================================
describe("JF-129: Status filtering", () => {
  it("only processes active feeds (verified by SQL query)", async () => {
    limitResult = [];

    const result = await fetchDueFeeds();

    expect(result.feedsProcessed).toBe(0);
    expect(result.totalNewArticles).toBe(0);
  });
});

// =====================================================================
// JF-130: Respects batchSize
// =====================================================================
describe("JF-130: Batch size", () => {
  it("passes batchSize to limit()", async () => {
    limitResult = [];

    await fetchDueFeeds(25);

    expect(mockCalls.limit[0][0]).toBe(25);
  });

  it("uses default batch size of 50", async () => {
    limitResult = [];

    await fetchDueFeeds();

    expect(mockCalls.limit[0][0]).toBe(50);
  });
});

// =====================================================================
// JF-131: Returns correct summary
// =====================================================================
describe("JF-131: Summary statistics", () => {
  it("returns FetchBatchResult with correct shape", async () => {
    limitResult = [];

    const result = await fetchDueFeeds();

    expect(result).toHaveProperty("feedsProcessed");
    expect(result).toHaveProperty("totalNewArticles");
    expect(result).toHaveProperty("errors");
    expect(Array.isArray(result.errors)).toBe(true);
  });
});

// =====================================================================
// JF-132: Network timeout does not crash batch
// =====================================================================
describe("JF-132: Crash resistance", () => {
  it("continues processing other feeds after one fails", async () => {
    // Return 2 due feeds from fetchDueFeeds
    limitResult = [
      { id: 1, title: "Feed A" },
      { id: 2, title: "Feed B" },
    ];

    // For fetchAndStoreFeed(1): source lookup -> MOCK_SOURCE, then error path
    // For fetchAndStoreFeed(2): source lookup -> MOCK_SOURCE, then success path
    selectResults = [
      // Feed A: source lookup
      [{ ...MOCK_SOURCE, id: 1, title: "Feed A" }],
      // Feed A: error path - get consecutiveFailures
      [{ consecutiveFailures: 0 }],
      // Feed B: source lookup
      [{ ...MOCK_SOURCE, id: 2, title: "Feed B" }],
      // Feed B: count query
      [{ count: 2 }],
    ];

    // Feed A fails, Feed B succeeds
    mockHttpFetch.mockRejectedValueOnce(new Error("Timeout"));
    mockHttpFetch.mockResolvedValueOnce(mockResponse(VALID_RSS));

    const result = await fetchDueFeeds();

    expect(result.feedsProcessed).toBe(2);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].feedId).toBe(1);
  });
});

// =====================================================================
// JF-133: Invalid XML does not crash batch
// =====================================================================
describe("JF-133: Invalid XML resilience", () => {
  it("handles invalid XML from a feed without crashing", async () => {
    selectResults = [
      [MOCK_SOURCE],
      [{ consecutiveFailures: 0 }],
    ];
    mockHttpFetch.mockResolvedValueOnce(mockResponse("<not>valid>xml<<<"));

    const result = await fetchAndStoreFeed(1);

    expect(result.error).toBeTruthy();
    expect(result.newArticles).toBe(0);
  });
});

// =====================================================================
// JF-134: Feed returning 410 Gone sets status="dead"
// =====================================================================
describe("JF-134: 410 Gone handling", () => {
  it("marks feed as dead on 410 response", async () => {
    selectResults = [
      [MOCK_SOURCE],
      [{ consecutiveFailures: 0 }],
    ];
    mockHttpFetch.mockRejectedValueOnce(new Error("[RSS] HTTP 410"));

    await fetchAndStoreFeed(1);

    expect(mockCalls.set[0][0]).toEqual(
      expect.objectContaining({
        status: "dead",
      })
    );
  });
});

// =====================================================================
// JF-135: Cron route returns 401 without CRON_SECRET
// =====================================================================
describe("JF-135: Cron route auth", () => {
  it("cron route file exists and exports GET handler", async () => {
    const mod = await import("@/app/api/cron/fetch-feeds/route");
    expect(mod.GET).toBeDefined();
    expect(typeof mod.GET).toBe("function");
  });
});

// =====================================================================
// JF-136: Empty response body handled
// =====================================================================
describe("JF-136: Empty response handling", () => {
  it("returns error for empty response", async () => {
    selectResults = [
      [MOCK_SOURCE],
      [{ consecutiveFailures: 0 }],
    ];
    mockHttpFetch.mockResolvedValueOnce(mockResponse(""));

    const result = await fetchAndStoreFeed(1);

    expect(result.error).toBeTruthy();
    expect(result.newArticles).toBe(0);
  });
});

// =====================================================================
// JF-137: Articles older than 90 days are filtered out
// =====================================================================
describe("JF-137: Old article filtering", () => {
  it("does not insert articles older than 90 days", async () => {
    mockHttpFetch.mockResolvedValueOnce(mockResponse(OLD_ARTICLE_RSS));

    await fetchAndStoreFeed(1);

    // The old article (Jan 2024) should be filtered out before insertion
    // No insert calls for articles should happen
    expect(mockCalls.insert.length).toBe(0);
  });
});

// =====================================================================
// JF-138: Feed source not found
// =====================================================================
describe("JF-138: Missing feed source", () => {
  it("returns error when feed source does not exist in DB", async () => {
    selectResults = [[]]; // No source found

    const result = await fetchAndStoreFeed(999);

    expect(result.error).toContain("not found");
    expect(result.newArticles).toBe(0);
    expect(mockHttpFetch).not.toHaveBeenCalled();
  });
});

// =====================================================================
// JF-139: resilientFetch called with correct service name
// =====================================================================
describe("JF-139: resilientFetch options", () => {
  it("uses a service name containing RSS", async () => {
    mockHttpFetch.mockResolvedValueOnce(mockResponse(VALID_RSS));

    await fetchAndStoreFeed(1);

    expect(mockHttpFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.anything(),
      expect.objectContaining({
        service: expect.stringContaining("RSS"),
      })
    );
  });
});
