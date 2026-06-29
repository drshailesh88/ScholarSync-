// eval/web-search/quality.ts
import { getTrustTier } from "@/lib/search/trust-tier";
import { normalizeDomain } from "@/lib/search/domain-utils";
import { rerankResults } from "@/lib/search/rerank";
import type { UnifiedSearchResult } from "@/types/search";
import type { WebEvalItem } from "./metrics";
import type { CommonRow } from "./types";

export function toEvalItems(results: UnifiedSearchResult[]): WebEvalItem[] {
  return results.map((r) => {
    const domain = r.domain ?? (r.url ? normalizeDomain(r.url) ?? undefined : undefined);
    const tier = r.trustTier ?? getTrustTier(domain ?? r.url);
    return {
      title: r.title,
      url: r.url ?? "",
      domain: domain ?? undefined,
      publishedAt: r.publishedAt ?? (r.year ? String(r.year) : undefined),
      trustTier: tier,
      abstract: r.abstract,
    };
  });
}

/** Render results into the blinding-safe common row shape the council packet uses. */
export function toPacketRows(results: UnifiedSearchResult[]): CommonRow[] {
  return results.slice(0, 10).map((r) => {
    const domain = r.domain ?? (r.url ? normalizeDomain(r.url) ?? null : null);
    return {
      title: r.title ?? "",
      url: r.url ?? "",
      domain: domain ?? null,
      publishedDate: r.publishedAt ?? (r.year ? String(r.year) : null),
      snippet: r.abstract ?? null,
    };
  });
}

/** Trust-annotate + self-hosted web rerank (fail-open). Mirrors the production non-academic path. */
export async function applyQualityLayer(
  query: string,
  results: UnifiedSearchResult[],
): Promise<UnifiedSearchResult[]> {
  const annotated = results.map((r) => {
    const domain = r.domain ?? (r.url ? normalizeDomain(r.url) ?? undefined : undefined);
    return { ...r, domain, trustTier: r.trustTier ?? getTrustTier(domain ?? r.url) };
  });
  try {
    return await rerankResults(query, annotated, undefined, { domain: "web" });
  } catch {
    return annotated; // fail-open: trust-annotated results, original order
  }
}
