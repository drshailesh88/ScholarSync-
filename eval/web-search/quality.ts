// eval/web-search/quality.ts
import { getTrustTier } from "@/lib/search/trust-tier";
import { normalizeDomain } from "@/lib/search/domain-utils";
import { rerankResults } from "@/lib/search/rerank";
import type { UnifiedSearchResult } from "@/types/search";
import type { WebEvalItem } from "./metrics";

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

/** Trust-annotate + Cohere rerank (fail-open). Mirrors the current production non-academic path. */
export async function applyQualityLayer(
  query: string,
  results: UnifiedSearchResult[],
): Promise<UnifiedSearchResult[]> {
  const annotated = results.map((r) => {
    const domain = r.domain ?? (r.url ? normalizeDomain(r.url) ?? undefined : undefined);
    return { ...r, domain, trustTier: r.trustTier ?? getTrustTier(domain ?? r.url) };
  });
  return rerankResults(query, annotated);
}
