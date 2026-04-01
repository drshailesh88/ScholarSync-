"use server";

import { and, desc, eq, sql } from "drizzle-orm";

import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { exploreSearchHistory } from "@/lib/db/schema";

const MAX_HISTORY_PER_USER = 100;

export interface ExploreHistoryRecord {
  id: number;
  query: string;
  activeTab: string;
  scopeId: number | null;
  createdAt: Date | null;
}

function toRecord(
  row: typeof exploreSearchHistory.$inferSelect
): ExploreHistoryRecord {
  return {
    id: row.id,
    query: row.query,
    activeTab: row.active_tab ?? "academic",
    scopeId: row.scope_id,
    createdAt: row.created_at,
  };
}

export async function addExploreSearchHistory(input: {
  query: string;
  activeTab?: string;
  scopeId?: number | null;
}): Promise<ExploreHistoryRecord> {
  const userId = await getCurrentUserId();
  const query = input.query.trim();

  if (!query) {
    throw new Error("Search query is required");
  }

  // Deduplicate: if the exact same query+tab is the most recent entry, skip
  const [latest] = await db
    .select()
    .from(exploreSearchHistory)
    .where(eq(exploreSearchHistory.user_id, userId))
    .orderBy(desc(exploreSearchHistory.created_at))
    .limit(1);

  if (
    latest &&
    latest.query === query &&
    latest.active_tab === (input.activeTab ?? "academic")
  ) {
    return toRecord(latest);
  }

  // Insert new entry
  const [row] = await db
    .insert(exploreSearchHistory)
    .values({
      user_id: userId,
      query,
      active_tab:
        (input.activeTab as
          | "academic"
          | "web"
          | "news"
          | "discussions") ?? "academic",
      scope_id: input.scopeId ?? null,
    })
    .returning();

  // FIFO: delete oldest entries beyond the limit
  const [countRow] = await db
    .select({ count: sql<number>`count(*)` })
    .from(exploreSearchHistory)
    .where(eq(exploreSearchHistory.user_id, userId));

  const count = Number(countRow?.count ?? 0);
  if (count > MAX_HISTORY_PER_USER) {
    const excess = count - MAX_HISTORY_PER_USER;
    await db.execute(sql`
      DELETE FROM explore_search_history
      WHERE id IN (
        SELECT id FROM explore_search_history
        WHERE user_id = ${userId}
        ORDER BY created_at ASC
        LIMIT ${excess}
      )
    `);
  }

  return toRecord(row);
}

export async function getExploreSearchHistory(
  limit = 20
): Promise<ExploreHistoryRecord[]> {
  const userId = await getCurrentUserId();

  const rows = await db
    .select()
    .from(exploreSearchHistory)
    .where(eq(exploreSearchHistory.user_id, userId))
    .orderBy(desc(exploreSearchHistory.created_at))
    .limit(Math.min(limit, MAX_HISTORY_PER_USER));

  return rows.map(toRecord);
}

export async function deleteExploreSearchHistory(
  entryId: number
): Promise<{ success: true }> {
  const userId = await getCurrentUserId();

  await db
    .delete(exploreSearchHistory)
    .where(
      and(
        eq(exploreSearchHistory.id, entryId),
        eq(exploreSearchHistory.user_id, userId)
      )
    );

  return { success: true };
}

export async function clearAllExploreSearchHistory(): Promise<{
  success: true;
}> {
  const userId = await getCurrentUserId();

  await db
    .delete(exploreSearchHistory)
    .where(eq(exploreSearchHistory.user_id, userId));

  return { success: true };
}
