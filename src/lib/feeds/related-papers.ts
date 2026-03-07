import { logger } from "@/lib/logger";
import { searchPubMed } from "@/lib/search/sources/pubmed";
import { getRecommendationsForPaper } from "@/lib/search/sources/s2-recommendations";
import {
  getSemanticScholarPaper,
  searchSemanticScholar,
} from "@/lib/search/sources/semantic-scholar";
import type { EvidenceLevel, UnifiedSearchResult } from "@/types/search";

export interface RelatedPaper {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  pmid?: string;
  s2Id?: string;
  abstract?: string;
  source: "semantic_scholar" | "pubmed";
  citationCount: number;
  influentialCitationCount?: number;
  referenceCount?: number;
  publicationTypes: string[];
  fieldsOfStudy?: string[];
  studyType?: string;
  evidenceLevel?: EvidenceLevel;
  isOpenAccess: boolean;
  openAccessPdfUrl?: string | null;
}

export interface RelatedPapersResult {
  papers: RelatedPaper[];
  source: "s2_recommendations" | "s2_search" | "pubmed_search";
  query: string;
}

interface FeedArticleIdentifier {
  title: string;
  doi: string | null;
  pubmedId: string | null;
}

const DEFAULT_MAX_RESULTS = 5;

function normalizeValue(value: string | null | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

function normalizeTitle(value: string | null | undefined): string {
  return normalizeValue(value).replace(/\s+/g, " ");
}

function isSamePaper(
  article: FeedArticleIdentifier,
  candidate: Pick<UnifiedSearchResult, "doi" | "pmid" | "title">
): boolean {
  const articleDoi = normalizeValue(article.doi);
  const articlePmid = normalizeValue(article.pubmedId);

  if (articleDoi && normalizeValue(candidate.doi) === articleDoi) return true;
  if (articlePmid && normalizeValue(candidate.pmid) === articlePmid) return true;

  const articleTitle = normalizeTitle(article.title);
  return !!articleTitle && normalizeTitle(candidate.title) === articleTitle;
}

function toRelatedPaper(
  result: UnifiedSearchResult,
  source: RelatedPaper["source"]
): RelatedPaper {
  return {
    title: result.title,
    authors: result.authors ?? [],
    journal: result.journal ?? "",
    year: result.year ?? 0,
    doi: result.doi,
    pmid: result.pmid,
    s2Id: result.s2Id,
    abstract: result.abstract,
    source,
    citationCount: result.citationCount ?? 0,
    influentialCitationCount: result.influentialCitationCount,
    referenceCount: result.referenceCount,
    publicationTypes: result.publicationTypes ?? [],
    fieldsOfStudy: result.fieldsOfStudy ?? [],
    studyType: result.studyType,
    evidenceLevel: result.evidenceLevel,
    isOpenAccess: result.isOpenAccess ?? false,
    openAccessPdfUrl: result.openAccessPdfUrl ?? null,
  };
}

function filterAndMapResults(
  article: FeedArticleIdentifier,
  results: UnifiedSearchResult[],
  source: RelatedPaper["source"],
  limit: number
): RelatedPaper[] {
  return results
    .filter((result) => !isSamePaper(article, result))
    .slice(0, limit)
    .map((result) => toRelatedPaper(result, source));
}

async function resolvePaperForRecommendations(article: FeedArticleIdentifier) {
  if (article.doi) {
    const byDoi = await getSemanticScholarPaper(`DOI:${article.doi}`);
    if (byDoi?.s2Id) {
      return { paper: byDoi, query: article.doi };
    }

    const doiSearch = await searchSemanticScholar(article.doi, { limit: 1 });
    if (doiSearch.results[0]?.s2Id) {
      return { paper: doiSearch.results[0], query: article.doi };
    }
  }

  if (article.pubmedId) {
    const byPmid = await getSemanticScholarPaper(`PMID:${article.pubmedId}`);
    if (byPmid?.s2Id) {
      return { paper: byPmid, query: article.pubmedId };
    }
  }

  return null;
}

export async function findRelatedPapers(
  article: FeedArticleIdentifier,
  limit: number = DEFAULT_MAX_RESULTS
): Promise<RelatedPapersResult> {
  const log = logger.withRequestId();
  const safeLimit = Math.max(1, limit);
  const titleQuery = article.title.slice(0, 100);

  try {
    const resolved = await resolvePaperForRecommendations(article);

    if (resolved?.paper.s2Id) {
      log.info("RelatedPapers: fetching Semantic Scholar recommendations", {
        s2Id: resolved.paper.s2Id,
      });

      const recommendations = await getRecommendationsForPaper(
        resolved.paper.s2Id,
        safeLimit + 1
      );
      const papers = filterAndMapResults(
        article,
        recommendations,
        "semantic_scholar",
        safeLimit
      );

      if (papers.length > 0) {
        return {
          papers,
          source: "s2_recommendations",
          query: resolved.query,
        };
      }
    }
  } catch (error) {
    log.warn("RelatedPapers: recommendation lookup failed", {
      error: error instanceof Error ? error.message : String(error),
      doi: article.doi,
      pubmedId: article.pubmedId,
    });
  }

  try {
    log.info("RelatedPapers: falling back to Semantic Scholar title search", {
      query: titleQuery,
    });

    const titleResults = await searchSemanticScholar(titleQuery, {
      limit: safeLimit + 1,
    });
    const papers = filterAndMapResults(
      article,
      titleResults.results,
      "semantic_scholar",
      safeLimit
    );

    if (papers.length > 0) {
      return {
        papers,
        source: "s2_search",
        query: titleQuery,
      };
    }
  } catch (error) {
    log.warn("RelatedPapers: title search failed", {
      error: error instanceof Error ? error.message : String(error),
      query: titleQuery,
    });
  }

  try {
    log.info("RelatedPapers: falling back to PubMed", { query: titleQuery });

    const pubmedResults = await searchPubMed(titleQuery, {
      maxResults: safeLimit + 1,
    });
    const papers = filterAndMapResults(
      article,
      pubmedResults.results,
      "pubmed",
      safeLimit
    );

    return {
      papers,
      source: "pubmed_search",
      query: titleQuery,
    };
  } catch (error) {
    log.warn("RelatedPapers: PubMed fallback failed", {
      error: error instanceof Error ? error.message : String(error),
      query: titleQuery,
    });
  }

  return {
    papers: [],
    source: "pubmed_search",
    query: titleQuery || article.title,
  };
}
