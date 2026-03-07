import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "fs";

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: vi.fn(async () => "test-user"),
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

function chainable() {
  const chain: Record<string, unknown> = {};
  const handler: ProxyHandler<Record<string, unknown>> = {
    get(_target, prop) {
      if (prop === "then") {
        return (resolve: (value: unknown[]) => void) => resolve([]);
      }

      return () => new Proxy(chain, handler);
    },
  };

  return new Proxy(chain, handler);
}

vi.mock("@/lib/db", () => ({
  db: new Proxy(
    {},
    {
      get() {
        return () => chainable();
      },
    }
  ),
}));

vi.mock("@/lib/db/schema", () => ({
  feedSources: { feedUrl: "feed_url", id: "id" },
  userFeedSubscriptions: { feedSourceId: "feed_source_id", userId: "user_id" },
  feedArticles: {},
  userArticleStatus: {},
  papers: {},
  userReferences: {},
  users: { id: "id", specialty: "specialty" },
}));

describe("JF-960: Enhanced feed discovery", () => {
  it("getCuratedFeeds returns pubmedSuggestion when search provided", async () => {
    const actions = await import("@/lib/actions/feeds");
    const result = await actions.getCuratedFeeds({ search: "cardiology" });

    expect(result).toHaveProperty("pubmedSuggestion");
    expect(result.pubmedSuggestion).toEqual({
      query: "cardiology",
      label: "PubMed: cardiology",
    });
  });

  it("getCuratedFeeds returns null pubmedSuggestion for short search", async () => {
    const actions = await import("@/lib/actions/feeds");
    const result = await actions.getCuratedFeeds({ search: "ab" });

    expect(result.pubmedSuggestion).toBeNull();
  });

  it("getCuratedFeeds returns null pubmedSuggestion when no search", async () => {
    const actions = await import("@/lib/actions/feeds");
    const result = await actions.getCuratedFeeds({});

    expect(result.pubmedSuggestion).toBeNull();
  });

  it("getCuratedFeeds filters by search text including category and specialty fields", async () => {
    const actions = await import("@/lib/actions/feeds");
    const result = await actions.getCuratedFeeds({ search: "cardiology" });

    expect(result.feeds.length).toBeGreaterThan(0);

    for (const feed of result.feeds) {
      const searchable =
        `${feed.title} ${feed.publisher} ${feed.category} ${feed.specialty} ${feed.description || ""}`.toLowerCase();
      expect(searchable).toContain("cardiology");
    }
  });
});

describe("JF-961: Journal browser shows PubMed suggestion", () => {
  it("journal-browser has PubMed feed creation UI", () => {
    const content = readFileSync(
      "src/components/feeds/journal-browser.tsx",
      "utf-8"
    );

    expect(content).toMatch(
      /PubMed Search Feed|pubmedSuggestion|Create Feed|subscribePubMed/i
    );
  });

  it("journal-browser has search input", () => {
    const content = readFileSync(
      "src/components/feeds/journal-browser.tsx",
      "utf-8"
    );

    expect(content).toMatch(/search|Search|SearchInput|placeholder.*search/i);
  });
});

describe("JF-962: Discover route passes pubmedSuggestion", () => {
  it("discover route returns pubmedSuggestion", () => {
    const content = readFileSync(
      "src/app/api/feeds/discover/route.ts",
      "utf-8"
    );

    expect(content).toContain("pubmedSuggestion");
  });
});
