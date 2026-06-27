/**
 * Content-addressed candidate cache for the literature-search eval harness.
 *
 * Why this exists: a full 87q eval fans out to PubMed / OpenAlex / the MedCPT
 * dense lane (GPU) for EVERY query, every run. Re-running an eval to measure a
 * pure ranking change therefore re-spends API quota + GPU minutes AND reintroduces
 * live-retrieval noise (throttle, pool drift) that makes per-cycle keep/revert
 * unsound. This module freezes the post-enrichment candidate POOL to local JSON,
 * keyed by the retrieval-affecting inputs (query + sources + year window), so the
 * FIRST run spends once and every repeat run is $0 and deterministic — the ranking
 * stage (the only thing under test) re-runs against the identical frozen pool.
 *
 * Pure, dependency-injected (`capture`, `now`, `dir`) so the cache logic is unit
 * tested without touching the network. The harness wires it to the real search.
 */

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { UnifiedSearchResult } from "@/types/search";

/** A frozen candidate pool for one benchmark query. */
export interface CachedPool {
  id: string;
  query: string;
  /** Content key (see {@link poolCacheKey}). */
  key: string;
  /** ISO timestamp of capture; drives {@link isFresh}. */
  capturedAt: string;
  /** The recency plan flag at capture time (date- vs relevance-sorted retrieval). */
  recency: boolean;
  candidates: UnifiedSearchResult[];
}

/** The inputs that change WHICH papers are retrieved — and so the cache key. */
export interface PoolKeyParams {
  query: string;
  sources?: string[];
  yearFrom?: number;
  yearTo?: number;
}

/**
 * Stable, content-addressed key for a candidate pool. Normalizes the query
 * (trim + lowercase + collapse whitespace) so trivially-different phrasings of the
 * SAME search share a cache entry, and sorts `sources` so lane order never forks
 * the key. The year window forks the key (it changes retrieval). 16 hex chars of
 * SHA-1 — collision-free at benchmark scale and filesystem-friendly.
 */
export function poolCacheKey(params: PoolKeyParams): string {
  const normalized = {
    query: params.query.trim().toLowerCase().replace(/\s+/g, " "),
    sources: params.sources ? [...params.sources].sort() : null,
    yearFrom: params.yearFrom ?? null,
    yearTo: params.yearTo ?? null,
  };
  return createHash("sha1").update(JSON.stringify(normalized)).digest("hex").slice(0, 16);
}

/** True when a cached entry was captured within the last `ttlDays` (and not in the future). */
export function isFresh(entry: { capturedAt: string }, ttlDays: number, now: Date): boolean {
  const captured = Date.parse(entry.capturedAt);
  if (Number.isNaN(captured)) return false;
  const ageMs = now.getTime() - captured;
  return ageMs >= 0 && ageMs <= ttlDays * 24 * 60 * 60 * 1000;
}

export function cachePath(dir: string, key: string): string {
  return join(dir, `${key}.json`);
}

/** Read a cached pool by key. Returns null on miss or unparseable file (never throws). */
export function readPool(dir: string, key: string): CachedPool | null {
  const path = cachePath(dir, key);
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8")) as CachedPool;
  } catch {
    return null;
  }
}

export function writePool(dir: string, entry: CachedPool): void {
  mkdirSync(dir, { recursive: true });
  writeFileSync(cachePath(dir, entry.key), JSON.stringify(entry, null, 2));
}

/** Fetches a fresh candidate pool from the live search (the expensive path). */
export type CaptureFn = (
  params: PoolKeyParams
) => Promise<{ candidates: UnifiedSearchResult[]; recency: boolean }>;

export interface LoadOrCaptureDeps {
  dir: string;
  ttlDays: number;
  now: () => Date;
  capture: CaptureFn;
  /** Force a live re-capture even when a fresh entry exists. */
  refresh?: boolean;
}

/**
 * Return the frozen candidate pool for a query: serve a fresh cache entry without
 * spending anything (`fromCache: true`), otherwise call `capture` once, persist
 * the result, and return it (`fromCache: false`). The single seam that turns a
 * "re-spend every run" harness into a "spend once, replay free" one.
 */
export async function loadOrCapturePool(
  id: string,
  params: PoolKeyParams,
  deps: LoadOrCaptureDeps
): Promise<{ entry: CachedPool; fromCache: boolean }> {
  const key = poolCacheKey(params);
  if (!deps.refresh) {
    const existing = readPool(deps.dir, key);
    if (existing && isFresh(existing, deps.ttlDays, deps.now())) {
      return { entry: existing, fromCache: true };
    }
  }
  const fetched = await deps.capture(params);
  const entry: CachedPool = {
    id,
    query: params.query,
    key,
    capturedAt: deps.now().toISOString(),
    recency: fetched.recency,
    candidates: fetched.candidates,
  };
  writePool(deps.dir, entry);
  return { entry, fromCache: false };
}
