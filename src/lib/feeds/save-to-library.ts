/**
 * Save-to-Library Module
 *
 * Converts a feed article into a paper in the user's Library.
 * Handles DOI/PMID deduplication to avoid duplicate entries.
 */
import { db } from "@/lib/db";
import {
  feedArticles,
  userArticleStatus,
  papers,
  userReferences,
} from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { logger } from "@/lib/logger";

// ── Types ───────────────────────────────────────────────────────────

export interface SaveToLibraryResult {
  /** The paper ID in the papers table */
  paperId: number;
  /** Whether a new paper was created (false = linked to existing) */
  isNew: boolean;
}

// ── Public API ──────────────────────────────────────────────────────

/**
 * Save a feed article to the user's Library.
 *
 * Flow:
 * 1. Fetch the article from feedArticles table
 * 2. Check if paper already exists (DOI match, then PMID match)
 * 3. If exists -> link to it. If not -> create new paper with source="feed"
 * 4. Add to userReferences + update userArticleStatus
 *
 * @param userId - The authenticated user ID (from Clerk)
 * @param articleId - The feed article ID
 * @returns SaveToLibraryResult with paperId and isNew flag
 * @throws Error("Article not found") if articleId doesn't exist
 */
export async function saveFeedArticleToLibrary(
  userId: string,
  articleId: number
): Promise<SaveToLibraryResult> {
  const log = logger.withRequestId();

  // 1. Fetch the feed article
  const [article] = await db
    .select()
    .from(feedArticles)
    .where(eq(feedArticles.id, articleId));

  if (!article) {
    throw new Error("Article not found");
  }

  log.info("Saving feed article to library", {
    articleId,
    title: article.title,
    doi: article.doi,
    pubmedId: article.pubmedId,
  });

  // 2. Check if already saved (idempotency)
  const [existingStatus] = await db
    .select()
    .from(userArticleStatus)
    .where(
      and(
        eq(userArticleStatus.userId, userId),
        eq(userArticleStatus.articleId, articleId)
      )
    );

  if (existingStatus?.isSavedToLibrary && existingStatus?.savedPaperId) {
    log.info("Article already saved to library", {
      articleId,
      paperId: existingStatus.savedPaperId,
    });
    return { paperId: existingStatus.savedPaperId, isNew: false };
  }

  // 3. Dedup: check if paper already exists by DOI
  let paperId: number | null = null;
  let isNew = false;

  if (article.doi) {
    const [existing] = await db
      .select({ id: papers.id })
      .from(papers)
      .where(eq(papers.doi, article.doi));
    if (existing) {
      paperId = existing.id;
      log.info("Found existing paper by DOI", { doi: article.doi, paperId });
    }
  }

  // 4. Dedup: check by PMID if no DOI match
  if (!paperId && article.pubmedId) {
    const [existing] = await db
      .select({ id: papers.id })
      .from(papers)
      .where(eq(papers.pubmed_id, article.pubmedId));
    if (existing) {
      paperId = existing.id;
      log.info("Found existing paper by PMID", {
        pmid: article.pubmedId,
        paperId,
      });
    }
  }

  // 5. Create new paper if no existing match
  if (!paperId) {
    const authorsList = parseAuthorsToArray(article.authors);
    const year = article.publishedAt
      ? article.publishedAt.getFullYear()
      : null;

    const [newPaper] = await db
      .insert(papers)
      .values({
        title: article.title,
        authors: authorsList,
        abstract: article.abstractSnippet || undefined,
        journal: article.journal || undefined,
        doi: article.doi || undefined,
        pubmed_id: article.pubmedId || undefined,
        publication_date: article.publishedAt
          ? article.publishedAt.toISOString().split("T")[0]
          : undefined,
        year: year || undefined,
        volume: article.volume || undefined,
        issue: article.issue || undefined,
        source: "feed",
        citation_count: 0,
      })
      .returning();

    paperId = newPaper.id;
    isNew = true;
    log.info("Created new paper from feed article", {
      paperId,
      title: article.title,
    });
  }

  // 6. Add to user's library (userReferences)
  await db
    .insert(userReferences)
    .values({
      userId,
      paperId,
      collection: "All Papers",
      isFavorite: false,
    })
    .onConflictDoNothing();

  // 7. Update userArticleStatus
  await db
    .insert(userArticleStatus)
    .values({
      userId,
      articleId,
      isSavedToLibrary: true,
      savedPaperId: paperId,
      isRead: true,
      readAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [userArticleStatus.userId, userArticleStatus.articleId],
      set: {
        isSavedToLibrary: true,
        savedPaperId: paperId,
      },
    });

  log.info("Feed article saved to library", { articleId, paperId, isNew });

  return { paperId, isNew };
}

// ── Helpers ─────────────────────────────────────────────────────────

/**
 * Parse a comma-separated authors string into a JSON array.
 *
 * Input:  "Smith J, Jones K, Garcia-Lopez R"
 * Output: ["Smith J", "Jones K", "Garcia-Lopez R"]
 */
export function parseAuthorsToArray(
  authors: string | null | undefined
): string[] {
  if (!authors || !authors.trim()) return [];

  return authors
    .split(",")
    .map((a) => a.trim())
    .filter((a) => a.length > 0);
}
