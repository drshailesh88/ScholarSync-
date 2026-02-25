"use server";

import { db } from "@/lib/db";
import { searchQueries } from "@/lib/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";

export async function saveSearchQuery(data: {
  originalQuery: string;
  queryType?: string;
  source?: string;
  augmentedQueries?: Record<string, string>;
  filtersApplied?: Record<string, unknown>;
  resultCount: number;
  parentQueryId?: number;
}): Promise<number> {
  const userId = await getCurrentUserId();

  const [row] = await db
    .insert(searchQueries)
    .values({
      user_id: userId,
      original_query: data.originalQuery,
      query_type: (data.queryType || "user") as "user" | "agent_generated" | "agent_augmented" | "snowball" | "deep_research",
      source: (data.source || "all") as "pubmed" | "semantic_scholar" | "openalex" | "arxiv" | "all" | "internal",
      augmented_queries: data.augmentedQueries || null,
      filters_applied: data.filtersApplied || null,
      result_count: data.resultCount,
      parent_query_id: data.parentQueryId || null,
    })
    .returning();

  return row.id;
}

/**
 * Fetch the 5 most recent distinct user-initiated search queries.
 * De-duplicates by original_query text (case-insensitive) so repeated
 * searches don't flood the list.
 */
export async function getRecentSearches(): Promise<
  { query: string; resultCount: number; searchedAt: string }[]
> {
  const userId = await getCurrentUserId();

  const rows = await db
    .selectDistinctOn([sql`lower(${searchQueries.original_query})`], {
      query: searchQueries.original_query,
      resultCount: searchQueries.result_count,
      searchedAt: searchQueries.created_at,
    })
    .from(searchQueries)
    .where(eq(searchQueries.user_id, userId))
    .orderBy(sql`lower(${searchQueries.original_query})`, desc(searchQueries.created_at))
    .limit(20);

  // selectDistinctOn orders by the distinct column first, so we re-sort by
  // recency and take the top 5
  return rows
    .sort((a, b) => {
      const da = a.searchedAt ? new Date(a.searchedAt).getTime() : 0;
      const db_ = b.searchedAt ? new Date(b.searchedAt).getTime() : 0;
      return db_ - da;
    })
    .slice(0, 5)
    .map((r) => ({
      query: r.query,
      resultCount: r.resultCount ?? 0,
      searchedAt: r.searchedAt?.toISOString() ?? "",
    }));
}
