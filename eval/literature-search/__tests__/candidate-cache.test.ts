import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mkdtempSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { UnifiedSearchResult } from "@/types/search";
import {
  poolCacheKey,
  isFresh,
  cachePath,
  readPool,
  writePool,
  loadOrCapturePool,
  type CachedPool,
} from "../candidate-cache";

function paper(title: string): UnifiedSearchResult {
  return { title, authors: [], journal: "", year: 2024, sources: ["pubmed"] } as unknown as UnifiedSearchResult;
}

let dir: string;
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "cand-cache-"));
});
afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

describe("poolCacheKey — stable & content-addressed", () => {
  it("is deterministic for the same query", () => {
    expect(poolCacheKey({ query: "SGLT2 in heart failure" })).toBe(
      poolCacheKey({ query: "SGLT2 in heart failure" })
    );
  });

  it("normalizes whitespace and case so trivially-different phrasings share a key", () => {
    expect(poolCacheKey({ query: "  SGLT2   in Heart Failure " })).toBe(
      poolCacheKey({ query: "sglt2 in heart failure" })
    );
  });

  it("changes when retrieval-affecting params change (year window, sources)", () => {
    const base = poolCacheKey({ query: "q" });
    expect(poolCacheKey({ query: "q", yearFrom: 2020 })).not.toBe(base);
    expect(poolCacheKey({ query: "q", sources: ["pubmed", "openalex"] })).not.toBe(base);
    // source order must not matter
    expect(poolCacheKey({ query: "q", sources: ["openalex", "pubmed"] })).toBe(
      poolCacheKey({ query: "q", sources: ["pubmed", "openalex"] })
    );
  });
});

describe("isFresh — TTL boundary", () => {
  const now = new Date("2026-06-27T12:00:00Z");
  it("is fresh within the TTL window", () => {
    expect(isFresh({ capturedAt: "2026-06-26T12:00:00Z" }, 7, now)).toBe(true);
  });
  it("is stale past the TTL window", () => {
    expect(isFresh({ capturedAt: "2026-06-01T12:00:00Z" }, 7, now)).toBe(false);
  });
  it("treats a malformed or future timestamp as not fresh", () => {
    expect(isFresh({ capturedAt: "not-a-date" }, 7, now)).toBe(false);
    expect(isFresh({ capturedAt: "2099-01-01T00:00:00Z" }, 7, now)).toBe(false);
  });
});

describe("readPool / writePool — round-trip", () => {
  it("writes by key and reads it back", () => {
    const entry: CachedPool = {
      id: "q1",
      query: "q one",
      key: poolCacheKey({ query: "q one" }),
      capturedAt: "2026-06-27T00:00:00Z",
      recency: false,
      candidates: [paper("A"), paper("B")],
    };
    writePool(dir, entry);
    expect(existsSync(cachePath(dir, entry.key))).toBe(true);
    const back = readPool(dir, entry.key);
    expect(back?.candidates.map((c) => c.title)).toEqual(["A", "B"]);
  });

  it("returns null for a missing key and for corrupt JSON", () => {
    expect(readPool(dir, "deadbeef")).toBeNull();
    const key = "corrupt0000000000";
    writeFileSync(cachePath(dir, key), "{ not json");
    expect(readPool(dir, key)).toBeNull();
  });
});

describe("loadOrCapturePool — the cache that stops re-spending", () => {
  const now = () => new Date("2026-06-27T12:00:00Z");

  it("MISS: calls capture once, persists, returns fromCache=false", async () => {
    const capture = vi.fn(async () => ({ candidates: [paper("A")], recency: false }));
    const { entry, fromCache } = await loadOrCapturePool(
      "q1",
      { query: "dapagliflozin heart failure" },
      { dir, ttlDays: 7, now, capture }
    );
    expect(fromCache).toBe(false);
    expect(capture).toHaveBeenCalledTimes(1);
    expect(entry.candidates.map((c) => c.title)).toEqual(["A"]);
    expect(readPool(dir, poolCacheKey({ query: "dapagliflozin heart failure" }))).not.toBeNull();
  });

  it("HIT: a fresh cached pool is served WITHOUT calling capture (no re-spend)", async () => {
    const capture = vi.fn(async () => ({ candidates: [paper("A")], recency: false }));
    const params = { query: "same query" };
    await loadOrCapturePool("q1", params, { dir, ttlDays: 7, now, capture });
    const second = await loadOrCapturePool("q1", params, { dir, ttlDays: 7, now, capture });
    expect(second.fromCache).toBe(true);
    expect(capture).toHaveBeenCalledTimes(1); // still 1 — the repeat eval spent nothing
  });

  it("STALE: re-captures when the cached pool is older than the TTL", async () => {
    const params = { query: "stale query" };
    const key = poolCacheKey(params);
    writePool(dir, {
      id: "q1",
      query: params.query,
      key,
      capturedAt: "2026-01-01T00:00:00Z",
      recency: false,
      candidates: [paper("OLD")],
    });
    const capture = vi.fn(async () => ({ candidates: [paper("NEW")], recency: false }));
    const { entry, fromCache } = await loadOrCapturePool("q1", params, {
      dir,
      ttlDays: 7,
      now,
      capture,
    });
    expect(fromCache).toBe(false);
    expect(capture).toHaveBeenCalledTimes(1);
    expect(entry.candidates.map((c) => c.title)).toEqual(["NEW"]);
  });

  it("REFRESH: bypasses a fresh entry when refresh=true", async () => {
    const params = { query: "force refresh" };
    await loadOrCapturePool("q1", params, {
      dir,
      ttlDays: 7,
      now,
      capture: async () => ({ candidates: [paper("A")], recency: false }),
    });
    const capture = vi.fn(async () => ({ candidates: [paper("B")], recency: false }));
    const { entry, fromCache } = await loadOrCapturePool("q1", params, {
      dir,
      ttlDays: 7,
      now,
      capture,
      refresh: true,
    });
    expect(fromCache).toBe(false);
    expect(capture).toHaveBeenCalledTimes(1);
    expect(entry.candidates.map((c) => c.title)).toEqual(["B"]);
  });
});
