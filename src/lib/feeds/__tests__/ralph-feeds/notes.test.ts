import { existsSync, readFileSync } from "fs";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/db", () => ({
  db: new Proxy(
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
}));

vi.mock("@/lib/db/schema", () => ({
  userArticleStatus: { userId: "uid", articleId: "aid", notes: "notes" },
  feedArticles: {},
  feedSources: {},
  userFeedSubscriptions: {},
  papers: {},
}));

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: vi.fn(async () => "test-user"),
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

describe("JF-920: Article notes", () => {
  it("saveArticleNote action exists", async () => {
    const actions = await import("@/lib/actions/feeds");
    expect(typeof actions.saveArticleNote).toBe("function");
  });

  it("getArticleNote action exists", async () => {
    const actions = await import("@/lib/actions/feeds");
    expect(typeof actions.getArticleNote).toBe("function");
  });

  it("notes API route exists", () => {
    expect(existsSync("src/app/api/feeds/articles/[id]/notes/route.ts")).toBe(true);
    const contents = readFileSync("src/app/api/feeds/articles/[id]/notes/route.ts", "utf-8");
    expect(contents).toContain("export async function GET");
    expect(contents).toContain("export async function PUT");
  });

  it("ArticleNotes component exists", () => {
    expect(existsSync("src/components/feeds/article-notes.tsx")).toBe(true);
  });

  it("store has articleNotes + saveArticleNote", () => {
    const contents = readFileSync("src/stores/feed-store.ts", "utf-8");
    expect(contents).toContain("articleNotes");
    expect(contents).toContain("saveArticleNote");
  });

  it("schema has notes column", () => {
    expect(readFileSync("src/lib/db/schema/feeds.ts", "utf-8")).toMatch(/notes.*text|text.*notes/);
  });

  it("article-reader renders ArticleNotes", () => {
    expect(readFileSync("src/components/feeds/article-reader.tsx", "utf-8")).toContain("ArticleNotes");
  });

  it("notes component has auto-save with debounce", () => {
    const contents = readFileSync("src/components/feeds/article-notes.tsx", "utf-8");
    expect(contents).toContain("setTimeout");
    expect(contents).toContain("onBlur");
  });
});
