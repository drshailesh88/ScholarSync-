/**
 * Convert a feed article into PaperData for the citation formatter.
 */

import type { PaperData } from "@/lib/citations";
import type { FeedArticleWithStatus } from "@/types/feed";

/**
 * Parse a comma-separated authors string into a JSON array.
 */
function parseAuthors(authors: string | null | undefined): string[] {
  if (!authors || !authors.trim()) return [];
  return authors
    .split(",")
    .map((a) => a.trim())
    .filter((a) => a.length > 0);
}

/**
 * Convert a FeedArticleWithStatus into PaperData for citation formatting.
 */
export function articleToPaperData(article: FeedArticleWithStatus): PaperData {
  // Handle publishedAt being either a Date or an ISO string (from JSON serialization)
  let year: number | undefined;
  if (article.publishedAt) {
    const d =
      article.publishedAt instanceof Date
        ? article.publishedAt
        : new Date(article.publishedAt);
    if (!isNaN(d.getTime())) {
      year = d.getFullYear();
    }
  }

  return {
    title: article.title,
    authors: parseAuthors(article.authors),
    journal: article.journal ?? undefined,
    year,
    doi: article.doi ?? undefined,
    volume: article.volume ?? undefined,
    issue: article.issue ?? undefined,
  };
}
