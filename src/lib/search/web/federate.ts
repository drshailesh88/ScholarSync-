/**
 * Non-academic federation: fan a query out across a per-tab set of sources in
 * parallel, each fail-open and timeout-bounded, then RRF-fuse the survivors on
 * canonical URL. A single source short-circuits to a passthrough (no reorder, no
 * rrfScore) so a SearXNG-only configuration reproduces the legacy single-source
 * path byte-for-byte — the property CYCLE 0 validates.
 *
 * Lives entirely outside the academic engine: only the non-academic branch of
 * the unified route calls this.
 */
import type { UnifiedSearchResult } from "@/types/search";
import { okStatus, classifyRejectionReason, type SourceStatus } from "@/lib/search/source-status";
import { searchSearXNG, type SearXNGCategory } from "@/lib/search/sources/searxng";
import { searchReddit } from "@/lib/search/sources/reddit";
import { searchHackerNews } from "@/lib/search/sources/hacker-news";
import { searchStackExchange } from "@/lib/search/sources/stackexchange";
import { reciprocalRankFusionWeb } from "./rank-fusion-web";

export type FederatedTab = "web" | "news" | "discussions";

export interface FederateOptions {
  limit?: number;
  timeRange?: "24h" | "week" | "month" | "year";
  /** Per-source wall-clock ceiling. A slow source is dropped, never blocking. */
  timeoutMs?: number;
}

export interface WebSourceResult {
  results: UnifiedSearchResult[];
  total: number;
  status: SourceStatus;
}

export interface WebSource {
  id: string;
  label: string;
  run: (query: string, options: FederateOptions) => Promise<WebSourceResult>;
}

export interface FederationResult {
  results: UnifiedSearchResult[];
  perSource: Array<{ id: string; label: string; count: number; status: SourceStatus }>;
  /** Per-source raw rows — debug/provenance only (e.g. the capture provider tag). */
  perSourceRows: Array<{ id: string; results: UnifiedSearchResult[] }>;
  degraded: boolean;
}

const DEFAULT_SOURCE_TIMEOUT_MS = 9000;

const SEARXNG_CATEGORY_BY_TAB: Record<FederatedTab, SearXNGCategory> = {
  web: "general",
  news: "news",
  discussions: "social media",
};

export function searxngSourceForTab(tab: FederatedTab): WebSource {
  const category = SEARXNG_CATEGORY_BY_TAB[tab];
  return {
    id: "searxng",
    label: `SearXNG (${category})`,
    run: async (query, options) => {
      const r = await searchSearXNG(query, {
        category,
        limit: options.limit,
        timeRange: options.timeRange,
      });
      return {
        results: r.results,
        total: r.total,
        status: r.degraded
          ? { status: "error", message: "SearXNG degraded" }
          : okStatus(),
      };
    },
  };
}

const redditSource: WebSource = {
  id: "reddit",
  label: "Reddit",
  run: (query, options) => searchReddit(query, { limit: options.limit }),
};

const hackerNewsSource: WebSource = {
  id: "hacker-news",
  label: "Hacker News",
  run: (query, options) => searchHackerNews(query, { limit: options.limit }),
};

const stackExchangeSource: WebSource = {
  id: "stackexchange",
  label: "Stack Exchange",
  run: (query, options) => searchStackExchange(query, { limit: options.limit }),
};

/**
 * Per-tab source set. Discussions federates the real-thread verticals; SearXNG
 * "social media" is intentionally excluded (it returns fediverse noise — no
 * Reddit/HN/SE — and measured worse). web/news stay single-SearXNG so their
 * serving path is unchanged.
 */
export const SOURCES_BY_TAB: Record<FederatedTab, WebSource[]> = {
  web: [searxngSourceForTab("web")],
  news: [searxngSourceForTab("news")],
  discussions: [redditSource, hackerNewsSource, stackExchangeSource],
};

async function withTimeout<T>(label: string, promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export async function federateWith(
  query: string,
  _tab: FederatedTab,
  sources: WebSource[],
  options: FederateOptions = {}
): Promise<FederationResult> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_SOURCE_TIMEOUT_MS;

  const settled = await Promise.all(
    sources.map(async (source) => {
      try {
        const r = await withTimeout(source.id, source.run(query, options), timeoutMs);
        return { id: source.id, label: source.label, ...r };
      } catch (error) {
        return {
          id: source.id,
          label: source.label,
          results: [] as UnifiedSearchResult[],
          total: 0,
          status: classifyRejectionReason(error),
        };
      }
    })
  );

  const lists = settled
    .filter((s) => s.results.length > 0)
    .map((s) => ({ source: s.id, results: s.results }));

  // Single contributing source → passthrough (no reorder, no rrfScore) so a
  // one-source federation is byte-identical to the legacy direct call.
  const results =
    lists.length <= 1 ? (lists[0]?.results ?? []) : reciprocalRankFusionWeb(lists);

  const anyOk = settled.some((s) => s.status.status === "ok");
  const degraded = !anyOk && results.length === 0;

  return {
    results,
    perSource: settled.map((s) => ({ id: s.id, label: s.label, count: s.results.length, status: s.status })),
    perSourceRows: settled.map((s) => ({ id: s.id, results: s.results })),
    degraded,
  };
}

export async function federateNonAcademic(
  query: string,
  tab: FederatedTab,
  options: FederateOptions = {}
): Promise<FederationResult> {
  return federateWith(query, tab, SOURCES_BY_TAB[tab], options);
}
