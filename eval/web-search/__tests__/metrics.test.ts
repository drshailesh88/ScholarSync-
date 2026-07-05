import { describe, it, expect } from "vitest";
import { canonicalUrl, webMatches, recallAtK, mrr, ndcgAtK, scoreTab } from "../metrics";
import type { WebEvalItem } from "../metrics";
import type { WebBenchmarkQuery } from "../types";

const item = (over: Partial<WebEvalItem>): WebEvalItem => ({
  title: "t", url: "https://x.com/a", ...over,
});

describe("canonicalUrl", () => {
  it("strips scheme, www, and trailing slash; lowercases", () => {
    expect(canonicalUrl("https://www.Reddit.com/r/PhD/")).toBe("reddit.com/r/phd");
  });
});

describe("webMatches", () => {
  it("matches by canonical url", () => {
    expect(webMatches(item({ url: "https://www.cdc.gov/flu/" }), { label: "x", url: "https://cdc.gov/flu", rule: "authority" })).toBe(true);
  });
  it("matches by domain suffix", () => {
    expect(webMatches(item({ domain: "old.reddit.com" }), { label: "x", domain: "reddit.com", rule: "consensus" })).toBe(true);
  });
  it("requires title fragment when one is given", () => {
    const m = { label: "x", domain: "reddit.com", titleIncludes: ["burnout"], rule: "consensus" as const };
    expect(webMatches(item({ domain: "reddit.com", title: "PhD burnout" }), m)).toBe(true);
    expect(webMatches(item({ domain: "reddit.com", title: "unrelated" }), m)).toBe(false);
  });
});

describe("recallAtK / mrr / ndcgAtK", () => {
  const items: WebEvalItem[] = [
    item({ url: "https://a.com/1" }),
    item({ url: "https://cdc.gov/flu" }),
    item({ url: "https://b.com/3" }),
  ];
  const mh = [{ label: "cdc", url: "https://cdc.gov/flu", rule: "authority" as const }];
  it("recall@10 is 1 when the must-have is present", () => {
    expect(recallAtK(items, mh, 10)).toBe(1);
  });
  it("recall@1 is 0 when the must-have is below rank 1", () => {
    expect(recallAtK(items, mh, 1)).toBe(0);
  });
  it("mrr reflects rank 2", () => {
    expect(mrr(items, mh)).toBeCloseTo(0.5, 5);
  });
  it("ndcg@10 is in (0,1]", () => {
    const v = ndcgAtK(items, mh, 10)!;
    expect(v).toBeGreaterThan(0);
    expect(v).toBeLessThanOrEqual(1);
  });
  it("ndcg@10 penalizes missing must-haves (1 of 3 found at rank 1)", () => {
    const items3: WebEvalItem[] = [
      item({ url: "https://cdc.gov/flu" }),
      item({ url: "https://a.com/1" }),
      item({ url: "https://b.com/3" }),
    ];
    const threeMh = [
      { label: "cdc", url: "https://cdc.gov/flu", rule: "authority" as const },
      { label: "who", url: "https://who.int/flu", rule: "authority" as const },
      { label: "nih", url: "https://nih.gov/flu", rule: "authority" as const },
    ];
    // DCG = 1 (one match at rank 1); IDCG over 3 ideal = 1 + 0.6309 + 0.5 = 2.1309
    expect(ndcgAtK(items3, threeMh, 10)).toBeCloseTo(0.47, 2);
  });
});

describe("scoreTab", () => {
  const q: WebBenchmarkQuery = {
    id: "news-x", tab: "news", queryClass: "recency", query: "flu outbreak", intent: "", recencyBiased: true,
    mustHaves: [{ label: "cdc", domain: "cdc.gov", rule: "authority" }],
  };
  const fresh = new Date("2026-06-20").toISOString();
  const items: WebEvalItem[] = [
    item({ url: "https://cdc.gov/flu", domain: "cdc.gov", trustTier: "government", publishedAt: fresh, title: "flu outbreak update" }),
    item({ url: "https://reuters.com/a", domain: "reuters.com", trustTier: "major_journalism", publishedAt: fresh, title: "flu outbreak spreads" }),
  ];
  it("returns a composite in [0,10] and a boolean pass", () => {
    const s = scoreTab(items, q, new Date("2026-06-24").getTime());
    expect(s.composite).toBeGreaterThanOrEqual(0);
    expect(s.composite).toBeLessThanOrEqual(10);
    expect(typeof s.pass).toBe("boolean");
    expect(s.dimensions.authority).toBeGreaterThan(0);
  });

  it("relevance is ORDERING-AWARE: the same must-have ranked higher scores better (a set-based gate would tie them)", () => {
    const webQ: WebBenchmarkQuery = {
      id: "web-x", tab: "web", queryClass: "mainstream", query: "flu", intent: "", recencyBiased: false,
      mustHaves: [{ label: "cdc", url: "https://cdc.gov/flu", rule: "authority" }],
    };
    const now = new Date("2026-06-24").getTime();
    const rankedHigh: WebEvalItem[] = [
      item({ url: "https://cdc.gov/flu" }),
      item({ url: "https://a.com/1" }),
      item({ url: "https://b.com/2" }),
    ];
    const rankedLow: WebEvalItem[] = [
      item({ url: "https://a.com/1" }),
      item({ url: "https://b.com/2" }),
      item({ url: "https://cdc.gov/flu" }),
    ];
    // Identical set membership → identical recall@10; only the RANK differs.
    expect(recallAtK(rankedHigh, webQ.mustHaves, 10)).toBe(recallAtK(rankedLow, webQ.mustHaves, 10));
    const high = scoreTab(rankedHigh, webQ, now);
    const low = scoreTab(rankedLow, webQ, now);
    expect(high.dimensions.relevance).toBeGreaterThan(low.dimensions.relevance);
  });
});
