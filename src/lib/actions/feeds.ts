"use server";

import { db } from "@/lib/db";
import * as dbSchema from "@/lib/db/schema";
import {
  feedSources,
  userFeedSubscriptions,
  feedArticles,
  userArticleStatus,
  papers,
} from "@/lib/db/schema";
import { eq, and, desc, sql, inArray } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { discoverFeeds, validateFeedUrl } from "@/lib/feeds/feed-discovery";
import { createPubMedSearchFeed } from "@/lib/feeds/pubmed-feed";
import {
  JOURNAL_FEEDS,
  FEED_CATEGORIES,
  FEED_SPECIALTIES,
} from "@/data/journal-feeds";
import type { FeedSubscription, FeedArticleWithStatus } from "@/types/feed";

// =====================================================================
// 1. getSubscriptions
// =====================================================================

/**
 * Get the current user's feed subscriptions with unread counts.
 */
export async function getSubscriptions(): Promise<{
  subscriptions: FeedSubscription[];
  totalUnread: number;
}> {
  const userId = await getCurrentUserId();

  const rows = await db
    .select({
      sub: userFeedSubscriptions,
      source: feedSources,
    })
    .from(userFeedSubscriptions)
    .innerJoin(feedSources, eq(userFeedSubscriptions.feedSourceId, feedSources.id))
    .where(eq(userFeedSubscriptions.userId, userId))
    .orderBy(
      sql`${userFeedSubscriptions.folder} ASC NULLS LAST`,
      desc(feedSources.title)
    );

  let totalUnread = 0;
  const subscriptions: FeedSubscription[] = [];

  for (const row of rows) {
    const [unreadRow] = await db
      .select({ count: sql<number>`count(*)` })
      .from(feedArticles)
      .where(
        and(
          eq(feedArticles.feedSourceId, row.source.id),
          sql`NOT EXISTS (
            SELECT 1 FROM user_article_status uas
            WHERE uas.article_id = ${feedArticles.id}
            AND uas.user_id = ${userId}
            AND uas.is_read = true
          )`
        )
      );

    const unreadCount = Number(unreadRow?.count ?? 0);
    totalUnread += unreadCount;

    subscriptions.push({
      id: row.sub.id,
      feedSourceId: row.sub.feedSourceId,
      folder: row.sub.folder,
      displayName: row.sub.displayName,
      isMuted: row.sub.isMuted ?? false,
      notifyOnNew: row.sub.notifyOnNew ?? false,
      addedAt: row.sub.addedAt!,
      feedSource: {
        id: row.source.id,
        title: row.source.title,
        description: row.source.description,
        feedUrl: row.source.feedUrl,
        siteUrl: row.source.siteUrl,
        faviconUrl: row.source.faviconUrl,
        feedType: (row.source.feedType as FeedSubscription["feedSource"]["feedType"]) ?? "rss",
        status: (row.source.status as FeedSubscription["feedSource"]["status"]) ?? "active",
        category: row.source.category,
        specialty: row.source.specialty,
        publisher: row.source.publisher,
        issn: row.source.issn,
        isCurated: row.source.isCurated ?? false,
        articleCount: row.source.articleCount ?? 0,
        lastFetchedAt: row.source.lastFetchedAt,
        lastSuccessAt: row.source.lastSuccessAt,
        consecutiveFailures: row.source.consecutiveFailures ?? 0,
        createdAt: row.source.createdAt!,
        updatedAt: row.source.updatedAt!,
      },
      unreadCount,
    });
  }

  return { subscriptions, totalUnread };
}

// =====================================================================
// 2. subscribeFeed
// =====================================================================

/**
 * Subscribe the current user to a feed by URL.
 */
export async function subscribeFeed(feedUrl: string): Promise<{
  subscription: { id: number; feedSourceId: number };
  feedSource: { id: number; title: string };
  isNewSource: boolean;
}> {
  const userId = await getCurrentUserId();

  const trimmed = feedUrl.trim();
  if (!trimmed) {
    throw new Error("Invalid feed URL: URL is required");
  }

  // Validate the feed
  const validated = await validateFeedUrl(trimmed);

  // Check if feedSource already exists
  let isNewSource = false;
  const [existing] = await db
    .select({ id: feedSources.id, title: feedSources.title })
    .from(feedSources)
    .where(eq(feedSources.feedUrl, trimmed));

  let sourceId: number;
  let sourceTitle: string;

  if (existing) {
    sourceId = existing.id;
    sourceTitle = existing.title;
  } else {
    isNewSource = true;
    const [newSource] = await db
      .insert(feedSources)
      .values({
        title: validated.title,
        description: validated.description,
        feedUrl: trimmed,
        siteUrl: validated.siteUrl,
        feedType: validated.feedType,
        status: "active",
      })
      .returning({ id: feedSources.id, title: feedSources.title });
    sourceId = newSource.id;
    sourceTitle = newSource.title;
  }

  // Check if already subscribed
  const [existingSub] = await db
    .select({ id: userFeedSubscriptions.id })
    .from(userFeedSubscriptions)
    .where(
      and(
        eq(userFeedSubscriptions.userId, userId),
        eq(userFeedSubscriptions.feedSourceId, sourceId)
      )
    );

  if (existingSub) {
    throw new Error("Already subscribed");
  }

  // Create subscription
  const [sub] = await db
    .insert(userFeedSubscriptions)
    .values({
      userId,
      feedSourceId: sourceId,
    })
    .returning({ id: userFeedSubscriptions.id, feedSourceId: userFeedSubscriptions.feedSourceId });

  return {
    subscription: { id: sub.id, feedSourceId: sub.feedSourceId },
    feedSource: { id: sourceId, title: sourceTitle },
    isNewSource,
  };
}

// =====================================================================
// 3. subscribePubMedSearch
// =====================================================================

/**
 * Create a PubMed search feed and subscribe the user to it.
 */
export async function subscribePubMedSearch(query: string): Promise<{
  subscription: { id: number; feedSourceId: number };
  feedSource: { id: number; title: string };
  totalResults: number;
}> {
  const userId = await getCurrentUserId();

  const trimmed = query.trim();
  if (!trimmed) {
    throw new Error("PubMed search query is required");
  }

  const pubmedResult = await createPubMedSearchFeed(trimmed);

  // Check if feedSource already exists
  const [existing] = await db
    .select({ id: feedSources.id, title: feedSources.title })
    .from(feedSources)
    .where(eq(feedSources.feedUrl, pubmedResult.feedUrl));

  let sourceId: number;
  let sourceTitle: string;

  if (existing) {
    sourceId = existing.id;
    sourceTitle = existing.title;
  } else {
    const [newSource] = await db
      .insert(feedSources)
      .values({
        title: pubmedResult.title,
        feedUrl: pubmedResult.feedUrl,
        feedType: "pubmed_search",
        status: "active",
      })
      .returning({ id: feedSources.id, title: feedSources.title });
    sourceId = newSource.id;
    sourceTitle = newSource.title;
  }

  // Check if already subscribed
  const [existingSub] = await db
    .select({ id: userFeedSubscriptions.id })
    .from(userFeedSubscriptions)
    .where(
      and(
        eq(userFeedSubscriptions.userId, userId),
        eq(userFeedSubscriptions.feedSourceId, sourceId)
      )
    );

  if (existingSub) {
    throw new Error("Already subscribed");
  }

  const [sub] = await db
    .insert(userFeedSubscriptions)
    .values({
      userId,
      feedSourceId: sourceId,
    })
    .returning({ id: userFeedSubscriptions.id, feedSourceId: userFeedSubscriptions.feedSourceId });

  return {
    subscription: { id: sub.id, feedSourceId: sub.feedSourceId },
    feedSource: { id: sourceId, title: sourceTitle },
    totalResults: pubmedResult.totalResults,
  };
}

// =====================================================================
// 4. unsubscribeFeed
// =====================================================================

/**
 * Unsubscribe the current user from a feed.
 */
export async function unsubscribeFeed(subscriptionId: number): Promise<void> {
  const userId = await getCurrentUserId();

  const result = await db
    .delete(userFeedSubscriptions)
    .where(
      and(
        eq(userFeedSubscriptions.id, subscriptionId),
        eq(userFeedSubscriptions.userId, userId)
      )
    )
    .returning({ id: userFeedSubscriptions.id });

  if (result.length === 0) {
    throw new Error("Subscription not found");
  }
}

// =====================================================================
// 5. updateSubscription
// =====================================================================

/**
 * Update a subscription's folder, display name, mute, or notify settings.
 */
export async function updateSubscription(
  subscriptionId: number,
  updates: {
    folder?: string | null;
    displayName?: string | null;
    isMuted?: boolean;
    notifyOnNew?: boolean;
  }
): Promise<void> {
  const userId = await getCurrentUserId();

  const result = await db
    .update(userFeedSubscriptions)
    .set(updates)
    .where(
      and(
        eq(userFeedSubscriptions.id, subscriptionId),
        eq(userFeedSubscriptions.userId, userId)
      )
    )
    .returning({ id: userFeedSubscriptions.id });

  if (result.length === 0) {
    throw new Error("Subscription not found");
  }
}

// =====================================================================
// 6. getArticles
// =====================================================================

/**
 * Get paginated feed articles for the current user.
 */
export async function getArticles(filters: {
  feedSourceId?: number;
  folder?: string;
  isRead?: boolean;
  isStarred?: boolean;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  journal?: string;
  sortBy?: "newest" | "oldest" | "relevance" | "published" | "added" | "title";
  sortDir?: "asc" | "desc";
  doi?: string;
  pmid?: string;
  page?: number;
  perPage?: number;
}): Promise<{
  articles: FeedArticleWithStatus[];
  total: number;
  hasMore: boolean;
}> {
  const userId = await getCurrentUserId();
  const page = filters.page ?? 0;
  const perPage = Math.min(filters.perPage ?? 30, 100);

  // Get user's subscribed feed source IDs
  let subscribedQuery = db
    .select({ feedSourceId: userFeedSubscriptions.feedSourceId })
    .from(userFeedSubscriptions)
    .where(eq(userFeedSubscriptions.userId, userId));

  if (filters.folder !== undefined) {
    subscribedQuery = db
      .select({ feedSourceId: userFeedSubscriptions.feedSourceId })
      .from(userFeedSubscriptions)
      .where(
        and(
          eq(userFeedSubscriptions.userId, userId),
          filters.folder === null
            ? sql`${userFeedSubscriptions.folder} IS NULL`
            : eq(userFeedSubscriptions.folder, filters.folder)
        )
      );
  }

  const subscribedRows = await subscribedQuery;
  const subscribedIds = subscribedRows.map((r) => r.feedSourceId);

  if (subscribedIds.length === 0) {
    return { articles: [], total: 0, hasMore: false };
  }

  // Build WHERE conditions
  const conditions = [inArray(feedArticles.feedSourceId, subscribedIds)];

  if (filters.feedSourceId !== undefined) {
    conditions.push(eq(feedArticles.feedSourceId, filters.feedSourceId));
  }

  // For read/starred filters, we need to query with the join
  let readCondition = sql`1=1`;
  if (filters.isRead === false) {
    readCondition = sql`(uas.is_read IS NULL OR uas.is_read = false)`;
  } else if (filters.isRead === true) {
    readCondition = sql`uas.is_read = true`;
  }

  let starredCondition = sql`1=1`;
  if (filters.isStarred === true) {
    starredCondition = sql`uas.is_starred = true`;
  }

  const normalizedSortBy =
    filters.sortBy === "oldest"
      ? "oldest"
      : filters.sortBy === "relevance" || filters.sortBy === "title"
        ? "relevance"
        : filters.sortBy === "added"
          ? "added"
          : filters.sortDir === "asc"
            ? "oldest"
            : "newest";

  const orderClause =
    normalizedSortBy === "relevance" && filters.search
      ? sql`
          CASE
            WHEN LOWER(fa.title) = LOWER(${filters.search}) THEN 0
            WHEN LOWER(fa.title) LIKE LOWER(${`${filters.search}%`}) THEN 1
            WHEN LOWER(fa.title) LIKE LOWER(${`%${filters.search}%`}) THEN 2
            ELSE 3
          END ASC,
          fa.published_at DESC NULLS LAST,
          fa.created_at DESC
        `
      : normalizedSortBy === "added"
        ? filters.sortDir === "asc"
          ? sql`fa.created_at ASC`
          : sql`fa.created_at DESC`
        : normalizedSortBy === "oldest"
          ? sql`fa.published_at ASC NULLS LAST, fa.created_at ASC`
          : sql`fa.published_at DESC NULLS LAST, fa.created_at DESC`;

  // Use raw SQL for the complex query with filters
  const articlesResult = await db.execute(sql`
    SELECT
      fa.id, fa.feed_source_id, fa.guid, fa.title, fa.authors,
      fa.abstract_snippet, fa.link, fa.doi, fa.pubmed_id,
      fa.published_at, fa.image_url, fa.content_html,
      fa.journal, fa.volume, fa.issue, fa.created_at,
      COALESCE(uas.is_read, false) as is_read,
      COALESCE(uas.is_starred, false) as is_starred,
      COALESCE(uas.is_saved_to_library, false) as is_saved_to_library,
      uas.saved_paper_id,
      fs.title as feed_source_title,
      fs.favicon_url as feed_source_favicon_url,
      fs.site_url as feed_source_site_url
    FROM feed_articles fa
    INNER JOIN feed_sources fs ON fs.id = fa.feed_source_id
    LEFT JOIN user_article_status uas
      ON uas.article_id = fa.id AND uas.user_id = ${userId}
    WHERE fa.feed_source_id IN (${sql.join(subscribedIds.map(id => sql`${id}`), sql`, `)})
      ${filters.feedSourceId !== undefined ? sql`AND fa.feed_source_id = ${filters.feedSourceId}` : sql``}
      ${filters.search ? sql`AND (fa.title ILIKE ${`%${filters.search}%`} OR fa.abstract_snippet ILIKE ${`%${filters.search}%`} OR fa.journal ILIKE ${`%${filters.search}%`} OR fa.authors ILIKE ${`%${filters.search}%`})` : sql``}
      ${filters.dateFrom ? sql`AND fa.published_at >= ${new Date(filters.dateFrom)}` : sql``}
      ${filters.dateTo ? sql`AND fa.published_at < ${(() => { const d = new Date(filters.dateTo!); d.setDate(d.getDate() + 1); return d; })()}` : sql``}
      ${filters.journal ? sql`AND fa.journal = ${filters.journal}` : sql``}
      ${filters.doi ? sql`AND fa.doi = ${filters.doi}` : sql``}
      ${filters.pmid ? sql`AND fa.pubmed_id = ${filters.pmid}` : sql``}
      AND ${readCondition}
      AND ${starredCondition}
    ORDER BY ${orderClause}
    LIMIT ${perPage}
    OFFSET ${page * perPage}
  `);

  // Count query
  const countResult = await db.execute(sql`
    SELECT count(*) as total
    FROM feed_articles fa
    LEFT JOIN user_article_status uas
      ON uas.article_id = fa.id AND uas.user_id = ${userId}
    WHERE fa.feed_source_id IN (${sql.join(subscribedIds.map(id => sql`${id}`), sql`, `)})
      ${filters.feedSourceId !== undefined ? sql`AND fa.feed_source_id = ${filters.feedSourceId}` : sql``}
      ${filters.search ? sql`AND (fa.title ILIKE ${`%${filters.search}%`} OR fa.abstract_snippet ILIKE ${`%${filters.search}%`} OR fa.journal ILIKE ${`%${filters.search}%`} OR fa.authors ILIKE ${`%${filters.search}%`})` : sql``}
      ${filters.dateFrom ? sql`AND fa.published_at >= ${new Date(filters.dateFrom)}` : sql``}
      ${filters.dateTo ? sql`AND fa.published_at < ${(() => { const d = new Date(filters.dateTo!); d.setDate(d.getDate() + 1); return d; })()}` : sql``}
      ${filters.journal ? sql`AND fa.journal = ${filters.journal}` : sql``}
      ${filters.doi ? sql`AND fa.doi = ${filters.doi}` : sql``}
      ${filters.pmid ? sql`AND fa.pubmed_id = ${filters.pmid}` : sql``}
      AND ${readCondition}
      AND ${starredCondition}
  `);

  const total = Number((countResult as unknown as Array<{ total: number }>)[0]?.total ?? 0);

  const articles: FeedArticleWithStatus[] = (articlesResult as unknown as Array<Record<string, unknown>>).map((row) => ({
    id: row.id as number,
    feedSourceId: row.feed_source_id as number,
    guid: row.guid as string,
    title: row.title as string,
    authors: (row.authors as string) ?? null,
    abstractSnippet: (row.abstract_snippet as string) ?? null,
    link: (row.link as string) ?? null,
    doi: (row.doi as string) ?? null,
    pubmedId: (row.pubmed_id as string) ?? null,
    publishedAt: row.published_at ? new Date(row.published_at as string) : null,
    imageUrl: (row.image_url as string) ?? null,
    contentHtml: (row.content_html as string) ?? null,
    journal: (row.journal as string) ?? null,
    volume: (row.volume as string) ?? null,
    issue: (row.issue as string) ?? null,
    createdAt: new Date(row.created_at as string),
    isRead: Boolean(row.is_read),
    isStarred: Boolean(row.is_starred),
    isSavedToLibrary: Boolean(row.is_saved_to_library),
    savedPaperId: (row.saved_paper_id as number) ?? null,
    feedSourceTitle: row.feed_source_title as string,
    feedSourceFaviconUrl: (row.feed_source_favicon_url as string) ?? null,
    feedSourceSiteUrl: (row.feed_source_site_url as string) ?? null,
  }));

  return {
    articles,
    total,
    hasMore: (page + 1) * perPage < total,
  };
}

// =====================================================================
// 7. markArticleRead
// =====================================================================

/**
 * Mark an article as read for the current user. Idempotent.
 */
export async function markArticleRead(articleId: number): Promise<void> {
  const userId = await getCurrentUserId();

  await db
    .insert(userArticleStatus)
    .values({ userId, articleId, isRead: true, readAt: new Date() })
    .onConflictDoUpdate({
      target: [userArticleStatus.userId, userArticleStatus.articleId],
      set: { isRead: true, readAt: new Date() },
    });
}

// =====================================================================
// 8. toggleArticleStar
// =====================================================================

/**
 * Toggle the starred status of an article for the current user.
 */
export async function toggleArticleStar(articleId: number): Promise<{ isStarred: boolean }> {
  const userId = await getCurrentUserId();

  // Check if row exists
  const [existing] = await db
    .select({ isStarred: userArticleStatus.isStarred })
    .from(userArticleStatus)
    .where(
      and(
        eq(userArticleStatus.userId, userId),
        eq(userArticleStatus.articleId, articleId)
      )
    );

  if (existing) {
    const newStarred = !existing.isStarred;
    await db
      .update(userArticleStatus)
      .set({
        isStarred: newStarred,
        starredAt: newStarred ? new Date() : null,
      })
      .where(
        and(
          eq(userArticleStatus.userId, userId),
          eq(userArticleStatus.articleId, articleId)
        )
      );
    return { isStarred: newStarred };
  }

  // Insert new row with starred = true
  await db.insert(userArticleStatus).values({
    userId,
    articleId,
    isStarred: true,
    starredAt: new Date(),
  });

  return { isStarred: true };
}

// =====================================================================
// 9. saveArticleNote
// =====================================================================

/**
 * Save a note on an article for the current user.
 * Passing empty or whitespace-only notes clears the note.
 */
export async function saveArticleNote(articleId: number, notes: string | null): Promise<void> {
  const userId = await getCurrentUserId();
  const trimmed = notes?.trim() || null;

  await db
    .insert(userArticleStatus)
    .values({
      userId,
      articleId,
      notes: trimmed,
    })
    .onConflictDoUpdate({
      target: [userArticleStatus.userId, userArticleStatus.articleId],
      set: { notes: trimmed },
    });
}

// =====================================================================
// 10. getArticleNote
// =====================================================================

/**
 * Get the saved note for an article for the current user.
 */
export async function getArticleNote(articleId: number): Promise<string | null> {
  const userId = await getCurrentUserId();

  const [row] = await db
    .select({ notes: userArticleStatus.notes })
    .from(userArticleStatus)
    .where(
      and(
        eq(userArticleStatus.userId, userId),
        eq(userArticleStatus.articleId, articleId)
      )
    );

  return row?.notes ?? null;
}

// =====================================================================
// 11. saveArticleToLibrary
// =====================================================================

/**
 * Save a feed article to the user's Library (papers table).
 */
export async function saveArticleToLibrary(articleId: number): Promise<{
  paperId: number;
  isNew: boolean;
}> {
  const userId = await getCurrentUserId();

  // Fetch the article
  const [article] = await db
    .select()
    .from(feedArticles)
    .where(eq(feedArticles.id, articleId));

  if (!article) {
    throw new Error("Article not found");
  }

  let paperId: number;
  let isNew = false;

  // Check for existing paper by DOI
  if (article.doi) {
    const [existing] = await db
      .select({ id: papers.id })
      .from(papers)
      .where(eq(papers.doi, article.doi));

    if (existing) {
      paperId = existing.id;
    } else {
      isNew = true;
      paperId = await insertPaperFromArticle(article);
    }
  } else {
    isNew = true;
    paperId = await insertPaperFromArticle(article);
  }

  // Update userArticleStatus
  await db
    .insert(userArticleStatus)
    .values({
      userId,
      articleId,
      isSavedToLibrary: true,
      savedPaperId: paperId,
    })
    .onConflictDoUpdate({
      target: [userArticleStatus.userId, userArticleStatus.articleId],
      set: { isSavedToLibrary: true, savedPaperId: paperId },
    });

  return { paperId, isNew };
}

async function insertPaperFromArticle(article: typeof feedArticles.$inferSelect): Promise<number> {
  // Parse authors string to JSON array
  const authorsArray = article.authors
    ? article.authors.split(",").map((a) => a.trim()).filter(Boolean)
    : [];

  const [newPaper] = await db
    .insert(papers)
    .values({
      title: article.title,
      abstract: article.abstractSnippet,
      doi: article.doi || undefined,
      pubmed_id: article.pubmedId || undefined,
      journal: article.journal,
      volume: article.volume,
      issue: article.issue,
      publication_date: article.publishedAt?.toISOString().split("T")[0],
      authors: authorsArray,
      source: "feed",
    })
    .returning({ id: papers.id });

  return newPaper.id;
}

// =====================================================================
// 12. markAllRead
// =====================================================================

/**
 * Mark all articles as read for the current user.
 */
export async function markAllRead(feedSourceId?: number): Promise<{ markedCount: number }> {
  const userId = await getCurrentUserId();

  // Get subscribed feed source IDs
  const subscribedRows = await db
    .select({ feedSourceId: userFeedSubscriptions.feedSourceId })
    .from(userFeedSubscriptions)
    .where(eq(userFeedSubscriptions.userId, userId));

  const subscribedIds = subscribedRows.map((r) => r.feedSourceId);
  if (subscribedIds.length === 0) {
    return { markedCount: 0 };
  }

  // Filter to specific feed if requested
  const targetIds = feedSourceId !== undefined
    ? subscribedIds.filter((id) => id === feedSourceId)
    : subscribedIds;

  if (targetIds.length === 0) {
    return { markedCount: 0 };
  }

  const result = await db.execute(sql`
    INSERT INTO user_article_status (user_id, article_id, is_read, read_at)
    SELECT ${userId}, fa.id, true, NOW()
    FROM feed_articles fa
    WHERE fa.feed_source_id IN (${sql.join(targetIds.map(id => sql`${id}`), sql`, `)})
      AND NOT EXISTS (
        SELECT 1 FROM user_article_status uas
        WHERE uas.article_id = fa.id
        AND uas.user_id = ${userId}
        AND uas.is_read = true
      )
    ON CONFLICT (user_id, article_id)
    DO UPDATE SET is_read = true, read_at = NOW()
  `);

  const markedCount = typeof result === "object" && result !== null && "rowCount" in result
    ? Number((result as { rowCount: number }).rowCount)
    : 0;

  return { markedCount };
}

// =====================================================================
// 13. getCuratedFeeds
// =====================================================================

/**
 * Get curated journal feeds for the "Browse Journals" UI.
 */
export async function getCuratedFeeds(filters: {
  category?: string;
  specialty?: string;
  search?: string;
}): Promise<{
  feeds: Array<{
    title: string;
    feedUrl: string;
    siteUrl: string;
    publisher: string;
    category: string;
    specialty: string;
    description?: string;
    isSubscribed: boolean;
    isSuggested: boolean;
  }>;
  categories: string[];
  specialties: string[];
  suggestedFeeds: Array<{
    title: string;
    feedUrl: string;
    siteUrl: string;
    publisher: string;
    category: string;
    specialty: string;
    description?: string;
    isSubscribed: boolean;
    isSuggested: boolean;
  }>;
  pubmedSuggestion: {
    query: string;
    label: string;
  } | null;
}> {
  const userId = await getCurrentUserId();
  const search = filters.search?.trim() ?? "";
  const shouldSuggestPubMed = search.length >= 3;
  const shouldPersonalize =
    !search && !filters.category && !filters.specialty;
  const usersTable = dbSchema.users;

  // Get user's subscribed feed URLs
  const subscribedRows = await db
    .select({ feedUrl: feedSources.feedUrl })
    .from(userFeedSubscriptions)
    .innerJoin(feedSources, eq(userFeedSubscriptions.feedSourceId, feedSources.id))
    .where(eq(userFeedSubscriptions.userId, userId));

  const subscribedUrls = new Set(subscribedRows.map((r) => r.feedUrl));
  let userSpecialties = new Set<string>();

  if (shouldPersonalize && usersTable) {
    try {
      const [user] = await db
        .select({ specialty: usersTable.specialty })
        .from(usersTable)
        .where(eq(usersTable.id, userId));

      userSpecialties = new Set(
        (user?.specialty ?? "")
          .split(",")
          .map((value) => value.trim().toLowerCase())
          .filter(Boolean)
      );
    } catch {
      userSpecialties = new Set();
    }
  }

  // Filter JOURNAL_FEEDS
  let filtered = JOURNAL_FEEDS;

  if (filters.category) {
    filtered = filtered.filter((f) => f.category === filters.category);
  }

  if (filters.specialty) {
    filtered = filtered.filter((f) => f.specialty === filters.specialty);
  }

  if (search) {
    const normalizedSearch = search.toLowerCase();
    filtered = filtered.filter((f) => {
      const searchable =
        `${f.title} ${f.publisher} ${f.category} ${f.specialty} ${f.description || ""}`.toLowerCase();
      return searchable.includes(normalizedSearch);
    });
  }

  const feeds = filtered.map((f) => ({
    title: f.title,
    feedUrl: f.feedUrl,
    siteUrl: f.siteUrl,
    publisher: f.publisher,
    category: f.category,
    specialty: f.specialty,
    description: f.description,
    isSubscribed: subscribedUrls.has(f.feedUrl),
    isSuggested:
      shouldPersonalize &&
      (userSpecialties.has(f.specialty.toLowerCase()) ||
        userSpecialties.has(f.category.toLowerCase())),
  }));

  const orderedFeeds = shouldPersonalize
    ? [...feeds].sort((a, b) => {
        if (a.isSuggested === b.isSuggested) {
          return a.title.localeCompare(b.title);
        }

        return a.isSuggested ? -1 : 1;
      })
    : feeds;

  const suggestedFeeds = orderedFeeds.filter((feed) => feed.isSuggested);

  return {
    feeds: orderedFeeds,
    categories: [...FEED_CATEGORIES],
    specialties: [...FEED_SPECIALTIES],
    suggestedFeeds,
    pubmedSuggestion: shouldSuggestPubMed
      ? {
          query: search,
          label: `PubMed: ${search}`,
        }
      : null,
  };
}

// =====================================================================
// 14. getArticleJournals
// =====================================================================

/**
 * Get distinct journal names from the user's subscribed feed articles.
 * Used to populate the journal filter dropdown.
 */
export async function getArticleJournals(): Promise<string[]> {
  const userId = await getCurrentUserId();

  const subs = await db
    .select({ feedSourceId: userFeedSubscriptions.feedSourceId })
    .from(userFeedSubscriptions)
    .where(eq(userFeedSubscriptions.userId, userId));

  const feedSourceIds = subs.map((s) => s.feedSourceId);
  if (feedSourceIds.length === 0) return [];

  const rows = await db
    .selectDistinct({ journal: feedArticles.journal })
    .from(feedArticles)
    .where(
      and(
        inArray(feedArticles.feedSourceId, feedSourceIds),
        sql`${feedArticles.journal} IS NOT NULL`,
        sql`${feedArticles.journal} != ''`
      )
    )
    .orderBy(feedArticles.journal);

  return rows.map((r) => r.journal).filter((j): j is string => !!j);
}

// =====================================================================
// 15. detectFeedFromUrl
// =====================================================================

/**
 * Auto-detect RSS/Atom feeds from a website URL.
 */
export async function detectFeedFromUrl(url: string): Promise<
  Array<{
    feedUrl: string;
    title: string;
    feedType: "rss" | "atom";
  }>
> {
  const userId = await getCurrentUserId();
  // userId used only to ensure authenticated access
  void userId;

  return discoverFeeds(url);
}
