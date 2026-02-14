"use server";

import { db } from "@/lib/db";
import { searchQueries } from "@/lib/db/schema";
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
