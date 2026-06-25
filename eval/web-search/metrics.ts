import type { WebTab, WebMustHave, WebBenchmarkQuery } from "./types";

export interface WebEvalItem {
  title: string;
  url: string;
  domain?: string;
  publishedAt?: string;
  trustTier?: "government" | "major_journalism" | "community" | "other";
  abstract?: string;
}

export function canonicalUrl(u: string): string {
  try {
    const url = new URL(u);
    const host = url.hostname.replace(/^www\./, "");
    const path = url.pathname.replace(/\/+$/, "");
    return `${host}${path}`.toLowerCase();
  } catch {
    return u.trim().toLowerCase();
  }
}

function domainMatches(itemDomain: string, mhDomain: string): boolean {
  const a = itemDomain.toLowerCase();
  const b = mhDomain.toLowerCase();
  return a === b || a.endsWith(`.${b}`);
}

export function webMatches(item: WebEvalItem, m: WebMustHave): boolean {
  if (m.url && canonicalUrl(item.url) === canonicalUrl(m.url)) return true;
  const dom = (item.domain ?? "").toLowerCase();
  if (m.domain && dom && domainMatches(dom, m.domain)) {
    if (!m.titleIncludes?.length) return true;
    const t = item.title.toLowerCase();
    return m.titleIncludes.some((n) => t.includes(n.toLowerCase()));
  }
  return false;
}

function firstRank(items: WebEvalItem[], m: WebMustHave): number | null {
  for (let i = 0; i < items.length; i++) if (webMatches(items[i], m)) return i + 1;
  return null;
}

export function recallAtK(items: WebEvalItem[], mustHaves: WebMustHave[] | undefined, k: number): number | null {
  if (!mustHaves?.length) return null;
  const top = items.slice(0, k);
  const found = mustHaves.filter((m) => top.some((r) => webMatches(r, m))).length;
  return found / mustHaves.length;
}

export function mrr(items: WebEvalItem[], mustHaves: WebMustHave[] | undefined): number | null {
  if (!mustHaves?.length) return null;
  const sum = mustHaves.reduce((acc, m) => {
    const r = firstRank(items, m);
    return acc + (r ? 1 / r : 0);
  }, 0);
  return sum / mustHaves.length;
}

export function ndcgAtK(items: WebEvalItem[], mustHaves: WebMustHave[] | undefined, k: number): number | null {
  if (!mustHaves?.length) return null;
  const top = items.slice(0, k);
  const relevant = new Set<number>();
  for (const m of mustHaves) {
    for (let i = 0; i < top.length; i++) {
      if (relevant.has(i)) continue;
      if (webMatches(top[i], m)) { relevant.add(i); break; }
    }
  }
  let dcg = 0;
  for (const pos of relevant) dcg += 1 / Math.log2(pos + 2);
  let idcg = 0;
  for (let i = 0; i < relevant.size; i++) idcg += 1 / Math.log2(i + 2);
  return idcg === 0 ? 0 : dcg / idcg;
}

// ---- per-tab dimension scoring ----

export type DimensionKey = "relevance" | "authority" | "recency" | "diversity" | "dedup";

export interface TabScore {
  dimensions: Record<DimensionKey, number>;
  composite: number;
  pass: boolean;
  details: string[];
}

/** Per-tab weights (sum to 1). Mirrors §6.2 of the spec; tune as data arrives. */
export const TAB_WEIGHTS: Record<WebTab, Record<DimensionKey, number>> = {
  web:         { relevance: 0.40, authority: 0.30, recency: 0.05, diversity: 0.15, dedup: 0.10 },
  news:        { relevance: 0.30, authority: 0.25, recency: 0.25, diversity: 0.10, dedup: 0.10 },
  discussions: { relevance: 0.35, authority: 0.20, recency: 0.15, diversity: 0.20, dedup: 0.10 },
};

export const PASS_THRESHOLD = 7.5;

const FRESH_WINDOW_DAYS: Record<WebTab, number> = { web: 1825, news: 30, discussions: 365 };

function yearOrDateMs(s: string | undefined): number | null {
  if (!s) return null;
  const t = Date.parse(s);
  if (!Number.isNaN(t)) return t;
  const m = s.match(/(\d{4})/);
  return m ? Date.parse(`${m[1]}-01-01`) : null;
}

function authorityScore(top: WebEvalItem[]): number {
  if (top.length === 0) return 0;
  const credible = top.filter((r) => r.trustTier && r.trustTier !== "other").length;
  return (credible / top.length) * 10;
}

function recencyScore(top: WebEvalItem[], tab: WebTab, now: number): number {
  if (top.length === 0) return 0;
  const windowMs = FRESH_WINDOW_DAYS[tab] * 24 * 3600 * 1000;
  const inWindow = top.filter((r) => {
    const ms = yearOrDateMs(r.publishedAt);
    return ms !== null && now - ms <= windowMs;
  }).length;
  return (inWindow / top.length) * 10;
}

function diversityScore(top: WebEvalItem[]): number {
  if (top.length === 0) return 0;
  const domains = top.map((r) => (r.domain ?? canonicalUrl(r.url).split("/")[0]));
  const unique = new Set(domains).size;
  return (unique / top.length) * 10;
}

function dedupScore(top: WebEvalItem[]): number {
  if (top.length === 0) return 10;
  const seen = new Set<string>();
  let dupes = 0;
  for (const r of top) {
    const key = canonicalUrl(r.url);
    if (seen.has(key)) dupes++;
    else seen.add(key);
  }
  return (1 - dupes / top.length) * 10;
}

export function scoreTab(items: WebEvalItem[], q: WebBenchmarkQuery, now: number): TabScore {
  const top = items.slice(0, 10);
  const recall = recallAtK(items, q.mustHaves, 10) ?? 0;
  const dimensions: Record<DimensionKey, number> = {
    relevance: recall * 10,
    authority: authorityScore(top),
    recency: recencyScore(top, q.tab, now),
    diversity: diversityScore(top),
    dedup: dedupScore(top),
  };
  const w = TAB_WEIGHTS[q.tab];
  const composite =
    Math.round(
      (dimensions.relevance * w.relevance +
        dimensions.authority * w.authority +
        dimensions.recency * w.recency +
        dimensions.diversity * w.diversity +
        dimensions.dedup * w.dedup) * 10,
    ) / 10;
  const details = [
    `recall@10=${(recall * 100).toFixed(0)}% (${q.mustHaves.length} must-haves)`,
    `authority=${dimensions.authority.toFixed(1)} recency=${dimensions.recency.toFixed(1)} diversity=${dimensions.diversity.toFixed(1)} dedup=${dimensions.dedup.toFixed(1)}`,
  ];
  return { dimensions, composite, pass: composite >= PASS_THRESHOLD, details };
}
