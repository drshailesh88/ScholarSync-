/**
 * Find Related Papers Module
 *
 * Given a feed article, finds related papers using Semantic Scholar
 * recommendations (by DOI → S2 ID → recommendations) with PubMed
 * fallback when S2 can't resolve the paper.
 */

import { getSemanticScholarPaper } from "@/lib/search/sources/semantic-scholar";
import { getRecommendationsForPaper } from "@/lib/search/sources/s2-recommendations";
import { searchPubMed } from "@/lib/search/sources/pubmed";
import { logger } from "@/lib/logger";
import type { UnifiedSearchResult } from "@/types/search";

// ── Types ───────────────────────────────────────────────────────────

export interface RelatedPapersResult {
  /** The papers found */
  papers: UnifiedSearchResult[];
  /** How they were found */
  source: "semantic_scholar" | "pubmed_fallback";
  /** Human-readable message about the source */
  sourceMessage: string;
}

// ── Public API ──────────────────────────────────────────────────────

/**
 * Find papers related to a feed article.
 *
 * Strategy:
 * 1. If DOI exists → resolve to S2 ID via getSemanticScholarPaper("DOI:xxx")
 * 2. If S2 ID obtained → get recommendations via getRecommendationsForPaper
 * 3. If no DOI or DOI fails, try PMID → S2 ID
 * 4. If S2 fails completely → fall back to PubMed title search
 *
 * NEVER throws. Returns empty results array on total failure.
 */
export async function findRelatedPapers(
  article: { title: string; doi: string | null; pubmedId: string | null },
  limit: number = 8
): Promise<RelatedPapersResult> {
  const log = logger.withRequestId();

  // ── Strategy 1: S2 Recommendations via DOI ─────────────────────

  if (article.doi) {
    try {
      log.info("FindRelated: resolving DOI to S2 ID", { doi: article.doi });
      const paper = await getSemanticScholarPaper(`DOI:${article.doi}`);

      if (paper?.s2Id) {
        const recs = await getRecommendationsForPaper(paper.s2Id, limit, paper.title);

        if (recs.length > 0) {
          log.info("FindRelated: S2 recommendations found", { count: recs.length });
          return {
            papers: recs,
            source: "semantic_scholar",
            sourceMessage: `Found ${recs.length} related papers via Semantic Scholar`,
          };
        }
      }
    } catch (err) {
      log.warn("FindRelated: S2 pipeline failed, falling back", {
        doi: article.doi,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  // ── Strategy 2: S2 via PMID ────────────────────────────────────

  if (article.pubmedId) {
    try {
      log.info("FindRelated: trying S2 via PMID", { pmid: article.pubmedId });
      const paper = await getSemanticScholarPaper(`PMID:${article.pubmedId}`);

      if (paper?.s2Id) {
        const recs = await getRecommendationsForPaper(paper.s2Id, limit, paper.title);

        if (recs.length > 0) {
          log.info("FindRelated: S2 recs via PMID found", { count: recs.length });
          return {
            papers: recs,
            source: "semantic_scholar",
            sourceMessage: `Found ${recs.length} related papers via Semantic Scholar`,
          };
        }
      }
    } catch (err) {
      log.warn("FindRelated: S2 PMID lookup failed", {
        pmid: article.pubmedId,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  // ── Strategy 3: PubMed title search (fallback) ─────────────────

  try {
    log.info("FindRelated: falling back to PubMed title search");
    const searchTerms = article.title.slice(0, 100);
    const { results } = await searchPubMed(searchTerms, { maxResults: limit });

    // Filter out the article itself
    const filtered = results.filter((r) => {
      if (article.doi && r.doi === article.doi) return false;
      if (article.pubmedId && r.pmid === article.pubmedId) return false;
      return true;
    });

    return {
      papers: filtered,
      source: "pubmed_fallback",
      sourceMessage: filtered.length > 0
        ? `Found ${filtered.length} related papers via PubMed search`
        : "No related papers found",
    };
  } catch (err) {
    log.warn("FindRelated: PubMed fallback also failed", {
      error: err instanceof Error ? err.message : String(err),
    });
  }

  // ── Total failure ──────────────────────────────────────────────

  return {
    papers: [],
    source: "pubmed_fallback",
    sourceMessage: "Could not find related papers — search services may be temporarily unavailable",
  };
}
