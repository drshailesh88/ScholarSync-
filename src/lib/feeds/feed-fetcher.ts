import { db } from "@/lib/db";
import { feedSources, feedArticles } from "@/lib/db/schema";
import { eq, and, sql, isNull, or } from "drizzle-orm";
import { resilientFetch } from "@/lib/http/resilient-fetch";
import { parseFeed } from "./feed-parser";
import { logger } from "@/lib/logger";

// ── Types ───────────────────────────────────────────────────────────

export interface FetchFeedResult {
  feedSourceId: number;
  newArticles: number;
  error: string | null;
}

export interface FetchBatchResult {
  feedsProcessed: number;
  totalNewArticles: number;
  errors: { feedId: number; feedTitle: string; error: string }[];
}

// ── Constants ───────────────────────────────────────────────────────

const MAX_CONSECUTIVE_FAILURES = 10;
const MAX_ARTICLE_AGE_DAYS = 90;
const DEFAULT_BATCH_SIZE = 50;

// ── Public API ──────────────────────────────────────────────────────

export async function fetchAndStoreFeed(feedSourceId: number): Promise<FetchFeedResult> {
  const log = logger.withRequestId();

  try {
    // 1. Get the feed source from the database
    const [source] = await db.select().from(feedSources).where(eq(feedSources.id, feedSourceId));
    if (!source) {
      return { feedSourceId, newArticles: 0, error: "Feed source not found" };
    }

    log.info("Fetching feed", { feedId: feedSourceId, title: source.title, url: source.feedUrl });

    // 2. Fetch the feed
    const response = await resilientFetch(
      source.feedUrl,
      { headers: { Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml" } },
      { service: `RSS:${source.title}`, timeout: 30000, maxRetries: 2 }
    );

    // 3. Read response body as text
    const xml = await response.text();
    if (!xml.trim()) {
      throw new Error("Empty response body");
    }

    // 4. Parse the feed
    const parsed = parseFeed(xml);

    // 5. Filter out articles older than MAX_ARTICLE_AGE_DAYS
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - MAX_ARTICLE_AGE_DAYS);

    const recentArticles = parsed.articles.filter((article) => {
      if (!article.publishedAt) return true;
      return article.publishedAt >= cutoffDate;
    });

    // 6. Insert new articles
    let newArticles = 0;
    for (const article of recentArticles) {
      try {
        await db.insert(feedArticles)
          .values({
            feedSourceId,
            guid: article.guid,
            title: article.title,
            authors: article.authors,
            abstractSnippet: article.abstractSnippet,
            link: article.link,
            doi: article.doi,
            pubmedId: article.pubmedId,
            publishedAt: article.publishedAt,
            imageUrl: article.imageUrl,
            contentHtml: article.contentHtml,
            journal: article.journal || parsed.title,
            volume: article.volume,
            issue: article.issue,
          })
          .onConflictDoNothing();

        newArticles++;
      } catch (insertErr) {
        log.warn("Failed to insert article", {
          feedId: feedSourceId,
          guid: article.guid,
          error: insertErr instanceof Error ? insertErr.message : String(insertErr),
        });
      }
    }

    // 7. Update feed source metadata on SUCCESS
    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(feedArticles)
      .where(eq(feedArticles.feedSourceId, feedSourceId));

    const now = new Date();
    await db.update(feedSources)
      .set({
        lastFetchedAt: now,
        lastSuccessAt: now,
        consecutiveFailures: 0,
        lastError: null,
        articleCount: Number(countResult?.count || 0),
        status: "active",
        updatedAt: now,
      })
      .where(eq(feedSources.id, feedSourceId));

    log.info("Feed fetched successfully", {
      feedId: feedSourceId,
      title: source.title,
      newArticles,
      totalArticles: countResult?.count || 0,
    });

    return { feedSourceId, newArticles, error: null };

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    log.error("Feed fetch failed", err, { feedId: feedSourceId });

    try {
      const [source] = await db.select({
        consecutiveFailures: feedSources.consecutiveFailures,
      }).from(feedSources).where(eq(feedSources.id, feedSourceId));

      const failures = (source?.consecutiveFailures || 0) + 1;
      const is410 = errorMessage.includes("410");
      const newStatus = is410 ? "dead" as const : failures >= MAX_CONSECUTIVE_FAILURES ? "error" as const : undefined;

      await db.update(feedSources)
        .set({
          lastFetchedAt: new Date(),
          consecutiveFailures: failures,
          lastError: errorMessage.slice(0, 500),
          updatedAt: new Date(),
          ...(newStatus ? { status: newStatus } : {}),
        })
        .where(eq(feedSources.id, feedSourceId));
    } catch (dbErr) {
      log.error("Failed to record feed error in database", dbErr);
    }

    return { feedSourceId, newArticles: 0, error: errorMessage };
  }
}

export async function fetchDueFeeds(batchSize: number = DEFAULT_BATCH_SIZE): Promise<FetchBatchResult> {
  const log = logger.withRequestId();
  log.info("Starting feed fetch batch", { batchSize });

  const dueSources = await db.select({
    id: feedSources.id,
    title: feedSources.title,
  })
    .from(feedSources)
    .where(
      and(
        eq(feedSources.status, "active"),
        or(
          isNull(feedSources.lastFetchedAt),
          sql`${feedSources.lastFetchedAt} < NOW() - (${feedSources.fetchIntervalMinutes} || ' minutes')::interval`
        )
      )
    )
    .orderBy(sql`${feedSources.lastFetchedAt} ASC NULLS FIRST`)
    .limit(batchSize);

  log.info("Found due feeds", { count: dueSources.length });

  let totalNewArticles = 0;
  const errors: FetchBatchResult["errors"] = [];

  for (const source of dueSources) {
    const result = await fetchAndStoreFeed(source.id);
    totalNewArticles += result.newArticles;

    if (result.error) {
      errors.push({
        feedId: source.id,
        feedTitle: source.title,
        error: result.error,
      });
    }
  }

  log.info("Feed fetch batch complete", {
    feedsProcessed: dueSources.length,
    totalNewArticles,
    errorCount: errors.length,
  });

  return {
    feedsProcessed: dueSources.length,
    totalNewArticles,
    errors,
  };
}
