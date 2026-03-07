/**
 * RALPH Journal Feed — Sprint 18: Sort + Layout + Mute + Favicon + Reading Time
 */
import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "fs";

describe("JF-900: Sort options", () => {
  it("getArticles accepts sortBy param", () => {
    const content = readFileSync("src/lib/actions/feeds.ts", "utf-8");
    expect(content).toMatch(/sortBy\??:\s*"newest"\s*\|\s*"oldest"/);
  });

  it("articles route passes sortBy", () => {
    const content = readFileSync("src/app/api/feeds/articles/route.ts", "utf-8");
    expect(content).toContain("sortBy");
  });

  it("store has sortBy + setSortBy", () => {
    const content = readFileSync("src/stores/feed-store.ts", "utf-8");
    expect(content).toContain("sortBy");
    expect(content).toContain("setSortBy");
  });

  it("page has sort toggle", () => {
    const content = readFileSync("src/app/(app)/feeds/page.tsx", "utf-8");
    expect(content).toContain("setSortBy");
    expect(content).toMatch(/Newest|Oldest|Relevance/);
  });
});

describe("JF-901: Layout options", () => {
  it("store has layout + setLayout", () => {
    const content = readFileSync("src/stores/feed-store.ts", "utf-8");
    expect(content).toContain("layout");
    expect(content).toContain("setLayout");
    expect(content).toMatch(/"list"\s*\|\s*"card"\s*\|\s*"magazine"/);
  });

  it("ArticleCardList component exists", () => {
    expect(existsSync("src/components/feeds/article-card-list.tsx")).toBe(true);
  });

  it("ArticleCardMagazine component exists", () => {
    expect(existsSync("src/components/feeds/article-card-magazine.tsx")).toBe(true);
  });

  it("article-list renders based on layout", () => {
    const content = readFileSync("src/components/feeds/article-list.tsx", "utf-8");
    expect(content).toMatch(/layout[\s\S]*ArticleCardList[\s\S]*ArticleCardMagazine/);
  });

  it("page has layout toggle", () => {
    const content = readFileSync("src/app/(app)/feeds/page.tsx", "utf-8");
    expect(content).toContain("setLayout");
    expect(content).toMatch(/List|Card|Magazine/);
  });
});

describe("JF-902: Feed mute toggle", () => {
  it("sidebar has mute interaction", () => {
    const content = readFileSync("src/components/feeds/feed-sidebar.tsx", "utf-8");
    expect(content).toMatch(/isMuted|Mute|BellSlash|Bell/);
  });
});

describe("JF-903: Feed favicons", () => {
  it("favicon utility exists", async () => {
    const mod = await import("@/lib/feeds/favicon");
    expect(typeof mod.getFaviconUrl).toBe("function");
  });

  it("returns Google favicon URL for valid domain", async () => {
    const { getFaviconUrl } = await import("@/lib/feeds/favicon");
    const url = getFaviconUrl("https://www.nejm.org");
    expect(url).toContain("google.com/s2/favicons");
    expect(url).toContain("www.nejm.org");
  });

  it("returns null for invalid URL", async () => {
    const { getFaviconUrl } = await import("@/lib/feeds/favicon");
    expect(getFaviconUrl("not a url")).toBeNull();
  });

  it("sidebar or card uses favicons", () => {
    const sidebar = readFileSync("src/components/feeds/feed-sidebar.tsx", "utf-8");
    const card = readFileSync("src/components/feeds/article-card.tsx", "utf-8");
    expect(sidebar + card).toMatch(/getFaviconUrl|faviconUrl|favicon/i);
  });
});

describe("JF-904: Reading time", () => {
  it("reading time utility exists", async () => {
    const mod = await import("@/lib/feeds/reading-time");
    expect(typeof mod.estimateReadingTime).toBe("function");
  });

  it("returns < 1 min for null and empty values", async () => {
    const { estimateReadingTime } = await import("@/lib/feeds/reading-time");
    expect(estimateReadingTime(null)).toBe("< 1 min");
    expect(estimateReadingTime("")).toBe("< 1 min");
  });

  it("estimates correctly for 400-word text", async () => {
    const { estimateReadingTime } = await import("@/lib/feeds/reading-time");
    const text = Array(400).fill("word").join(" ");
    expect(estimateReadingTime(text)).toBe("2 min read");
  });

  it("estimates correctly for short text", async () => {
    const { estimateReadingTime } = await import("@/lib/feeds/reading-time");
    expect(estimateReadingTime("just a few words")).toBe("1 min read");
  });

  it("article card or reader shows reading time", () => {
    const card = readFileSync("src/components/feeds/article-card.tsx", "utf-8");
    const reader = readFileSync("src/components/feeds/article-reader.tsx", "utf-8");
    expect(card + reader).toMatch(/estimateReadingTime|min read/i);
  });
});
