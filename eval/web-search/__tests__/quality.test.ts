// eval/web-search/__tests__/quality.test.ts
import { describe, it, expect } from "vitest";
import { toEvalItems, applyQualityLayer, toPacketRows } from "../quality";
import type { UnifiedSearchResult } from "@/types/search";

const r = (over: Partial<UnifiedSearchResult>): UnifiedSearchResult => ({
  title: "t", authors: [], journal: "", url: "https://cdc.gov/flu", year: 2026,
  citationCount: 0, publicationTypes: [], isOpenAccess: false, sources: ["news"], ...over,
});

describe("toEvalItems", () => {
  it("maps unified results to web eval items with trust tier + domain", () => {
    const items = toEvalItems([r({ url: "https://www.cdc.gov/flu", publishedAt: "2026-06-01" })]);
    expect(items[0].domain).toBe("cdc.gov");
    expect(items[0].trustTier).toBe("government");
    expect(items[0].publishedAt).toBe("2026-06-01");
  });
});

describe("applyQualityLayer", () => {
  it("is fail-open: with no COHERE_API_KEY it returns results unchanged in order", async () => {
    const orig = process.env.COHERE_API_KEY;
    delete process.env.COHERE_API_KEY;
    try {
      const input = [r({ url: "https://a.com/1" }), r({ url: "https://b.com/2" })];
      const out = await applyQualityLayer("flu", input);
      expect(out.map((x) => x.url)).toEqual(["https://a.com/1", "https://b.com/2"]);
    } finally {
      if (orig !== undefined) process.env.COHERE_API_KEY = orig;
    }
  });
});

describe("toPacketRows", () => {
  it("maps top-10 unified results to blinding-safe CommonRows (title/url/domain/publishedDate/snippet)", () => {
    const rows = toPacketRows([
      r({ url: "https://www.cdc.gov/flu", title: "Flu update", publishedAt: "2026-06-01", abstract: "snippet text" }),
    ]);
    expect(rows[0]).toEqual({
      title: "Flu update",
      url: "https://www.cdc.gov/flu",
      domain: "cdc.gov",
      publishedDate: "2026-06-01",
      snippet: "snippet text",
    });
  });
  it("caps at 10 rows", () => {
    const many = Array.from({ length: 14 }, (_v, i) => r({ url: `https://a.com/${i}` }));
    expect(toPacketRows(many)).toHaveLength(10);
  });
});
