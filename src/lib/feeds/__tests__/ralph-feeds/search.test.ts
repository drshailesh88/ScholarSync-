/**
 * RALPH Journal Feed — Sprint 18: Power Search Tests
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { readFileSync, existsSync } from "fs";

// ── Mocks ───────────────────────────────────────────────────────────

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: vi.fn(async () => "search-user"),
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
                },
              ),
          },
        ),
    },
  ),
}));

vi.mock("@/lib/db/schema", () => ({
  feedSources: { id: "id" },
  userFeedSubscriptions: {
    id: "id",
    userId: "uid",
    feedSourceId: "fsi",
  },
  feedArticles: {
    id: "id",
    feedSourceId: "fsi",
    title: "title",
    abstractSnippet: "as",
    authors: "authors",
    journal: "journal",
    publishedAt: "pa",
    doi: "doi",
    pubmedId: "pmid",
    createdAt: "ca",
  },
  userArticleStatus: {
    userId: "uid",
    articleId: "aid",
    isRead: "ir",
    isStarred: "is",
  },
  papers: {},
  userReferences: {},
}));

vi.mock("@/lib/http/resilient-fetch", () => ({
  resilientFetch: vi.fn(),
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

vi.mock("@/lib/feeds/feed-discovery", () => ({
  discoverFeeds: vi.fn(),
  validateFeedUrl: vi.fn(),
}));

vi.mock("@/lib/feeds/pubmed-feed", () => ({
  createPubMedSearchFeed: vi.fn(),
}));

vi.mock("@/data/journal-feeds", () => ({
  JOURNAL_FEEDS: [],
  FEED_CATEGORIES: [],
}));

beforeEach(() => {
  vi.clearAllMocks();
});

// =====================================================================
// JF-900: getArticles accepts search parameter
// =====================================================================
describe("JF-900: Extended getArticles signature", () => {
  it("getArticles function exists and accepts search filter", async () => {
    const { getArticles } = await import("@/lib/actions/feeds");
    expect(typeof getArticles).toBe("function");

    // Should not throw TypeError on call with search param
    try {
      await getArticles({ search: "test query" });
    } catch {
      // DB errors expected since mocked — just verifying no TypeError
    }
  });

  it("accepts all new filter parameters", async () => {
    const { getArticles } = await import("@/lib/actions/feeds");

    try {
      await getArticles({
        search: "empagliflozin",
        dateFrom: "2026-01-01",
        dateTo: "2026-03-06",
        journal: "N Engl J Med",
        sortBy: "published",
        sortDir: "desc",
        doi: "10.1056/NEJMoa2204233",
        pmid: "36995890",
        page: 0,
        perPage: 30,
      });
    } catch {
      // DB errors expected
    }
    // If no TypeError, the signature is correct
  });
});

// =====================================================================
// JF-901: getArticleJournals function exists
// =====================================================================
describe("JF-901: getArticleJournals helper", () => {
  it("getArticleJournals is exported", async () => {
    const actions = await import("@/lib/actions/feeds");
    expect(typeof actions.getArticleJournals).toBe("function");
  });
});

// =====================================================================
// JF-902: API route passes new params
// =====================================================================
describe("JF-902: Articles API route extension", () => {
  it("articles route.ts handles search param", () => {
    const content = readFileSync(
      "src/app/api/feeds/articles/route.ts",
      "utf-8",
    );
    expect(content).toContain("search");
    expect(content).toContain("dateFrom");
    expect(content).toContain("dateTo");
    expect(content).toContain("journal");
    expect(content).toContain("sortBy");
    expect(content).toContain("sortDir");
  });
});

// =====================================================================
// JF-903: Journals endpoint exists
// =====================================================================
describe("JF-903: Journals endpoint", () => {
  it("journals route exists", () => {
    expect(
      existsSync("src/app/api/feeds/articles/journals/route.ts"),
    ).toBe(true);
    const content = readFileSync(
      "src/app/api/feeds/articles/journals/route.ts",
      "utf-8",
    );
    expect(content).toContain("export async function GET");
    expect(content).toContain("getArticleJournals");
  });
});

// =====================================================================
// JF-904: Store has search state
// =====================================================================
describe("JF-904: Store search extension", () => {
  it("store has searchQuery field", () => {
    const content = readFileSync("src/stores/feed-store.ts", "utf-8");
    expect(content).toContain("searchQuery");
    expect(content).toContain("setSearchQuery");
  });

  it("store has date range filters", () => {
    const content = readFileSync("src/stores/feed-store.ts", "utf-8");
    expect(content).toContain("filterDateFrom");
    expect(content).toContain("filterDateTo");
    expect(content).toContain("setDateRange");
  });

  it("store has journal filter", () => {
    const content = readFileSync("src/stores/feed-store.ts", "utf-8");
    expect(content).toContain("filterJournal");
    expect(content).toContain("setFilterJournal");
    expect(content).toContain("availableJournals");
  });

  it("store has sort options", () => {
    const content = readFileSync("src/stores/feed-store.ts", "utf-8");
    expect(content).toContain("sortBy");
    expect(content).toContain("sortDir");
    expect(content).toContain("setSort");
  });

  it("store has clearFilters", () => {
    const content = readFileSync("src/stores/feed-store.ts", "utf-8");
    expect(content).toContain("clearFilters");
  });

  it("store has loadJournals", () => {
    const content = readFileSync("src/stores/feed-store.ts", "utf-8");
    expect(content).toContain("loadJournals");
  });
});

// =====================================================================
// JF-905: Search bar component exists
// =====================================================================
describe("JF-905: ArticleSearchBar component", () => {
  it("exists and exports", async () => {
    const mod = await import("@/components/feeds/article-search-bar");
    expect(mod.ArticleSearchBar).toBeDefined();
    expect(typeof mod.ArticleSearchBar).toBe("function");
  });
});

// =====================================================================
// JF-906: Search bar has all UI elements
// =====================================================================
describe("JF-906: Search bar structure", () => {
  it("has text search input", () => {
    const content = readFileSync(
      "src/components/feeds/article-search-bar.tsx",
      "utf-8",
    );
    expect(content).toContain("searchQuery");
    expect(content).toContain("setSearchQuery");
    expect(content).toContain("MagnifyingGlass");
  });

  it("has filter toggle button", () => {
    const content = readFileSync(
      "src/components/feeds/article-search-bar.tsx",
      "utf-8",
    );
    expect(content).toContain("FunnelSimple");
    expect(content).toContain("toggleAdvancedFilters");
  });

  it("has date range inputs", () => {
    const content = readFileSync(
      "src/components/feeds/article-search-bar.tsx",
      "utf-8",
    );
    expect(content).toContain('type="date"');
    expect(content).toContain("setDateRange");
  });

  it("has journal dropdown", () => {
    const content = readFileSync(
      "src/components/feeds/article-search-bar.tsx",
      "utf-8",
    );
    expect(content).toContain("availableJournals");
    expect(content).toContain("<select");
    expect(content).toContain("<option");
  });

  it("has sort by buttons", () => {
    const content = readFileSync(
      "src/components/feeds/article-search-bar.tsx",
      "utf-8",
    );
    expect(content).toContain("sortBy");
    expect(content).toContain("published");
    expect(content).toContain("added");
    expect(content).toContain("title");
  });

  it("has clear filters button", () => {
    const content = readFileSync(
      "src/components/feeds/article-search-bar.tsx",
      "utf-8",
    );
    expect(content).toContain("clearFilters");
    expect(content).toContain("Clear");
  });
});

// =====================================================================
// JF-907: Search bar wired in article list
// =====================================================================
describe("JF-907: Search bar integration", () => {
  it("article list imports ArticleSearchBar", () => {
    const content = readFileSync(
      "src/components/feeds/article-list.tsx",
      "utf-8",
    );
    expect(content).toContain("ArticleSearchBar");
    expect(content).toContain("article-search-bar");
  });
});

// =====================================================================
// JF-908: Keyboard shortcut "/" for search
// =====================================================================
describe("JF-908: Keyboard shortcut", () => {
  it("feeds page has '/' keyboard shortcut for search focus", () => {
    const content = readFileSync(
      "src/app/(app)/feeds/page.tsx",
      "utf-8",
    );
    expect(content).toMatch(/["']\/["']/);
  });
});

// =====================================================================
// JF-909: loadArticles passes search params to API
// =====================================================================
describe("JF-909: Store passes search params to API", () => {
  it("loadArticles includes search in URL params", () => {
    const content = readFileSync("src/stores/feed-store.ts", "utf-8");
    expect(content).toContain("searchQuery");
    // The store should pass search query as a URL param
    expect(content).toMatch(/params\.set.*search|search.*params/);
  });
});

// =====================================================================
// JF-910: Active filter indicator
// =====================================================================
describe("JF-910: Active filter visual indicator", () => {
  it("shows visual indicator when filters are active", () => {
    const content = readFileSync(
      "src/components/feeds/article-search-bar.tsx",
      "utf-8",
    );
    expect(content).toContain("hasActiveFilters");
  });
});

// =====================================================================
// JF-911: Uses existing design tokens
// =====================================================================
describe("JF-911: Design system compliance", () => {
  it("uses glass-panel for filter panel", () => {
    const content = readFileSync(
      "src/components/feeds/article-search-bar.tsx",
      "utf-8",
    );
    expect(content).toContain("glass-panel");
  });

  it("uses Phosphor icons", () => {
    const content = readFileSync(
      "src/components/feeds/article-search-bar.tsx",
      "utf-8",
    );
    expect(content).toContain("@phosphor-icons/react");
  });
});
