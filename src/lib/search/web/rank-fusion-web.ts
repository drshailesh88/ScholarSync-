/**
 * Reciprocal-rank fusion for the non-academic federation, keyed on canonical
 * URL rather than the academic isSamePaper() (which keys on DOI/PMID/title+year
 * and silently fails to collapse URL-only web rows — their identifiers are
 * absent and year is frequently 0). This is the cheap canonical-URL shim the
 * design calls for; the academic dedup.ts is left untouched.
 */
import type { UnifiedSearchResult } from "@/types/search";
import { canonicalUrl } from "./canonical-url";

export interface WebSourceList {
  source: string;
  results: UnifiedSearchResult[];
}

function fusionKey(r: UnifiedSearchResult): string {
  if (r.url) return canonicalUrl(r.url);
  return `title:${r.title.toLowerCase().replace(/\s+/g, " ").trim()}`;
}

/** Fill gaps on the kept row from a duplicate without overwriting present data. */
function mergeWebRows(
  primary: UnifiedSearchResult,
  secondary: UnifiedSearchResult,
  source: string
): UnifiedSearchResult {
  return {
    ...primary,
    abstract: primary.abstract || secondary.abstract,
    publishedAt: primary.publishedAt || secondary.publishedAt,
    year: primary.year || secondary.year,
    platform: primary.platform || secondary.platform,
    community: primary.community || secondary.community,
    engagement: primary.engagement || secondary.engagement,
    sourceLabel: primary.sourceLabel || secondary.sourceLabel,
    trustTier: primary.trustTier ?? secondary.trustTier,
    sources: primary.sources.includes(source)
      ? primary.sources
      : [...primary.sources, source],
  };
}

export function reciprocalRankFusionWeb(
  lists: WebSourceList[],
  k = 60
): UnifiedSearchResult[] {
  const merged: UnifiedSearchResult[] = [];
  const scores: number[] = [];
  const keyToIdx = new Map<string, number>();

  for (const { source, results } of lists) {
    for (let rank = 0; rank < results.length; rank++) {
      const row = results[rank];
      const key = fusionKey(row);
      const contribution = 1 / (k + rank + 1);
      const existingIdx = keyToIdx.get(key);

      if (existingIdx !== undefined) {
        scores[existingIdx] += contribution;
        merged[existingIdx] = mergeWebRows(merged[existingIdx], row, source);
      } else {
        keyToIdx.set(key, merged.length);
        merged.push({
          ...row,
          sources: row.sources.includes(source) ? [...row.sources] : [...row.sources, source],
        });
        scores.push(contribution);
      }
    }
  }

  return merged
    .map((result, i) => ({ result, score: scores[i] }))
    .sort((a, b) => b.score - a.score)
    .map(({ result, score }) => ({ ...result, rrfScore: score }));
}
