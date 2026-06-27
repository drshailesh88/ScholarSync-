import { describe, expect, it } from "vitest";
import { federateWith, type WebSource } from "../federate";
import { okStatus } from "@/lib/search/source-status";
import type { UnifiedSearchResult } from "@/types/search";

function row(url: string, title: string): UnifiedSearchResult {
  return { title, authors: [], journal: "", year: 0, url, sources: ["discussions"], citationCount: 0, publicationTypes: ["discussions"], isOpenAccess: false };
}

function okSource(id: string, results: UnifiedSearchResult[]): WebSource {
  return { id, label: id, run: async () => ({ results, total: results.length, status: okStatus() }) };
}

function failSource(id: string): WebSource {
  return { id, label: id, run: async () => { throw new Error(`[${id}] HTTP 403`); } };
}

function emptyOkSource(id: string): WebSource {
  return { id, label: id, run: async () => ({ results: [], total: 0, status: okStatus() }) };
}

describe("federateWith", () => {
  it("passes a single source through unchanged (no reorder, no rrfScore)", async () => {
    const results = [row("https://a.com/1", "one"), row("https://a.com/2", "two")];
    const fed = await federateWith("q", "discussions", [okSource("searxng", results)]);
    expect(fed.results).toEqual(results); // identical objects, identical order
    expect(fed.results[0].rrfScore).toBeUndefined();
    expect(fed.degraded).toBe(false);
  });

  it("RRF-fuses when more than one source contributes", async () => {
    const fed = await federateWith("q", "discussions", [
      okSource("hn", [row("https://hn/1", "a")]),
      okSource("se", [row("https://se/1", "b")]),
    ]);
    expect(fed.results).toHaveLength(2);
    expect(fed.results[0].rrfScore).toBeGreaterThan(0);
  });

  it("is fail-open: a throwing source never zeroes the tab", async () => {
    const fed = await federateWith("q", "discussions", [
      failSource("reddit"),
      okSource("hn", [row("https://hn/1", "a"), row("https://hn/2", "b")]),
    ]);
    expect(fed.results).toHaveLength(2); // hn survives reddit's 403
    expect(fed.degraded).toBe(false);
    expect(fed.perSource.find((s) => s.id === "reddit")!.status.status).not.toBe("ok");
    expect(fed.perSource.find((s) => s.id === "hn")!.count).toBe(2);
  });

  it("marks degraded only when every source fails AND nothing is returned", async () => {
    const fed = await federateWith("q", "discussions", [failSource("reddit"), failSource("hn")]);
    expect(fed.results).toEqual([]);
    expect(fed.degraded).toBe(true);
  });

  it("is not degraded when sources are healthy but genuinely empty", async () => {
    const fed = await federateWith("q", "discussions", [emptyOkSource("hn"), emptyOkSource("se")]);
    expect(fed.results).toEqual([]);
    expect(fed.degraded).toBe(false);
  });

  it("drops a source that exceeds the per-source timeout without blocking", async () => {
    const slow: WebSource = {
      id: "slow",
      label: "slow",
      run: () => new Promise((resolve) => setTimeout(() => resolve({ results: [row("https://x/1", "x")], total: 1, status: okStatus() }), 1000)),
    };
    const fed = await federateWith("q", "discussions", [slow, okSource("hn", [row("https://hn/1", "a")])], { timeoutMs: 50 });
    expect(fed.results).toHaveLength(1);
    expect(fed.results[0].url).toBe("https://hn/1");
    expect(fed.perSource.find((s) => s.id === "slow")!.status.status).toBe("timeout");
  });
});
