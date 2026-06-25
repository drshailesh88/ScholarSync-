import { describe, it, expect } from "vitest";
import { cacheKey, CATEGORY_BY_TAB, captureToCache } from "../capture-searxng";
import { mkdtempSync, readFileSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { WebBenchmarkQuery } from "../types";

describe("cacheKey", () => {
  it("is stable and tab-scoped", () => {
    expect(cacheKey("news", "flu")).toBe(cacheKey("news", "flu"));
    expect(cacheKey("news", "flu")).not.toBe(cacheKey("web", "flu"));
  });
});

describe("CATEGORY_BY_TAB", () => {
  it("maps tabs to SearXNG categories", () => {
    expect(CATEGORY_BY_TAB.web).toBe("general");
    expect(CATEGORY_BY_TAB.news).toBe("news");
    expect(CATEGORY_BY_TAB.discussions).toBe("social media");
  });
});

describe("captureToCache", () => {
  it("writes one cache file per query with the frozen results", async () => {
    const dir = mkdtempSync(join(tmpdir(), "wseval-"));
    const queries: WebBenchmarkQuery[] = [
      { id: "news-x", tab: "news", queryClass: "recency", query: "flu", intent: "", recencyBiased: true, mustHaves: [{ label: "a", domain: "cdc.gov", rule: "authority" }] },
    ];
    const fakeSearch = async () => ({
      results: [{ title: "Flu update", url: "https://cdc.gov/flu", domain: "cdc.gov", year: 2026, sources: ["news"] }],
      total: 1, degraded: false,
    });
    const n = await captureToCache(fakeSearch as never, queries, dir);
    expect(n).toBe(1);
    const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
    expect(files).toHaveLength(1);
    const body = JSON.parse(readFileSync(join(dir, files[0]), "utf8"));
    expect(body.tab).toBe("news");
    expect(body.results[0].url).toBe("https://cdc.gov/flu");
  });
});
