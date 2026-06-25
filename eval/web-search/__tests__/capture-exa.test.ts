import { describe, it, expect } from "vitest";
import { mapExaResult, categoryForTab, captureAll } from "../capture-exa";
import type { WebBenchmarkQuery } from "../types";

describe("categoryForTab", () => {
  it("maps news and discussions to Exa categories, web to undefined", () => {
    expect(categoryForTab("news")).toBe("news");
    expect(categoryForTab("discussions")).toBe("tweets");
    expect(categoryForTab("web")).toBeUndefined();
  });
});

describe("mapExaResult", () => {
  it("derives domain from url and carries date + snippet", () => {
    const row = mapExaResult(
      { title: "T", url: "https://www.reuters.com/x", publishedDate: "2026-06-01", text: "snippet here" },
      3,
    );
    expect(row).toEqual({ rank: 3, title: "T", url: "https://www.reuters.com/x", domain: "reuters.com", publishedDate: "2026-06-01", snippet: "snippet here" });
  });
});

describe("captureAll", () => {
  it("collects per-query fixtures using the injected search fn (no network)", async () => {
    const queries: WebBenchmarkQuery[] = [
      { id: "news-x", tab: "news", queryClass: "recency", query: "q", intent: "", recencyBiased: true, mustHaves: [{ label: "a", domain: "reuters.com", rule: "consensus" }] },
    ];
    const fakeSearch = async () => ({ results: [{ title: "T", url: "https://reuters.com/x", publishedDate: "2026-06-01", text: "s" }] });
    const out = await captureAll(fakeSearch, queries, 0);
    expect(out["news-x"]).toHaveLength(1);
    expect(out["news-x"][0].domain).toBe("reuters.com");
  });
});
