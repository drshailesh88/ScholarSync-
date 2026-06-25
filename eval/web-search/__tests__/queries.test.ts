import { describe, it, expect } from "vitest";
import { BENCHMARK_QUERIES } from "../queries";
import type { WebTab } from "../types";

describe("BENCHMARK_QUERIES", () => {
  it("has unique ids", () => {
    const ids = BENCHMARK_QUERIES.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("covers all three tabs with at least 3 queries each", () => {
    const tabs: WebTab[] = ["web", "news", "discussions"];
    for (const tab of tabs) {
      expect(BENCHMARK_QUERIES.filter((q) => q.tab === tab).length).toBeGreaterThanOrEqual(3);
    }
  });

  it("every query has a non-empty query string and at least one must-have with a valid rule", () => {
    for (const q of BENCHMARK_QUERIES) {
      expect(q.query.trim().length).toBeGreaterThan(0);
      expect(q.mustHaves.length).toBeGreaterThanOrEqual(1);
      for (const m of q.mustHaves) {
        expect(["authority", "consensus"]).toContain(m.rule);
        // a must-have must be matchable: either a url, or a domain (optionally + titleIncludes)
        expect(Boolean(m.url) || Boolean(m.domain)).toBe(true);
      }
    }
  });
});
