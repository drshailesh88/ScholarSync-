"use server";

import { db } from "@/lib/db";
import { users, projects, searchQueries } from "@/lib/db/schema";
import { eq, desc, count, sql } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";

export interface DashboardStats {
  totalProjects: number;
  totalSearches: number;
  tokensUsed: number;
  tokensLimit: number;
  plagiarismChecksUsed: number;
  exportsUsed: number;
  plan: string;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const userId = await getCurrentUserId();

  const [[user], [projectCount], [searchCount]] = await Promise.all([
    db.select().from(users).where(eq(users.id, userId)),
    db
      .select({ count: count() })
      .from(projects)
      .where(eq(projects.user_id, userId)),
    db
      .select({ count: count() })
      .from(searchQueries)
      .where(eq(searchQueries.user_id, userId)),
  ]);

  return {
    totalProjects: projectCount?.count ?? 0,
    totalSearches: searchCount?.count ?? 0,
    tokensUsed: user?.tokens_used_this_month ?? 0,
    tokensLimit: user?.tokens_limit ?? 10000,
    plagiarismChecksUsed: user?.plagiarism_checks_used ?? 0,
    exportsUsed: user?.exports_used_this_month ?? 0,
    plan: user?.plan ?? "free",
  };
}

export async function getRecentSearches(limit = 5) {
  const userId = await getCurrentUserId();
  return db
    .select({
      id: searchQueries.id,
      query: searchQueries.original_query,
      source: searchQueries.source,
      resultCount: searchQueries.result_count,
      createdAt: searchQueries.created_at,
    })
    .from(searchQueries)
    .where(eq(searchQueries.user_id, userId))
    .orderBy(desc(searchQueries.created_at))
    .limit(limit);
}
