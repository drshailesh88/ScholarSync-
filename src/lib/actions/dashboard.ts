"use server";

import { db } from "@/lib/db";
import {
  projects,
  searchQueries,
  activityLog,
  userReferences,
  conversations,
} from "@/lib/db/schema";
import { eq, and, desc, isNull, sql, count } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { ensureUser } from "@/lib/actions/user";

export type DashboardProject = {
  id: number;
  title: string;
  status: string | null;
  project_type: string | null;
  updated_at: Date | null;
};

export type RecentSearch = {
  id: number;
  original_query: string;
  source: string | null;
  result_count: number | null;
  created_at: Date | null;
};

export type RecentActivity = {
  id: number;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  details: unknown;
  created_at: Date | null;
};

export type DashboardStats = {
  projectCount: number;
  paperCount: number;
  searchCount: number;
  conversationCount: number;
};

export type DashboardData = {
  recentProjects: DashboardProject[];
  stats: DashboardStats;
  recentSearches: RecentSearch[];
  recentActivity: RecentActivity[];
};

export async function getDashboardData(): Promise<DashboardData> {
  const userId = await getCurrentUserId();

  // Ensure user exists in the database
  await ensureUser();

  // Run all queries in parallel for performance
  const [
    recentProjectsResult,
    projectCountResult,
    paperCountResult,
    searchCountResult,
    conversationCountResult,
    recentSearchesResult,
    recentActivityResult,
  ] = await Promise.all([
    // Recent projects (top 4, non-deleted, ordered by last updated)
    db
      .select({
        id: projects.id,
        title: projects.title,
        status: projects.status,
        project_type: projects.project_type,
        updated_at: projects.updated_at,
      })
      .from(projects)
      .where(and(eq(projects.user_id, userId), isNull(projects.deleted_at)))
      .orderBy(desc(projects.updated_at))
      .limit(4),

    // Total project count
    db
      .select({ value: count() })
      .from(projects)
      .where(and(eq(projects.user_id, userId), isNull(projects.deleted_at))),

    // Total papers saved by user (from user_references)
    db
      .select({ value: count() })
      .from(userReferences)
      .where(
        and(
          eq(userReferences.userId, userId),
          isNull(userReferences.deletedAt)
        )
      ),

    // Total search queries by user
    db
      .select({ value: count() })
      .from(searchQueries)
      .where(eq(searchQueries.user_id, userId)),

    // Total conversations by user
    db
      .select({ value: count() })
      .from(conversations)
      .where(eq(conversations.user_id, userId)),

    // Recent searches (last 5)
    db
      .select({
        id: searchQueries.id,
        original_query: searchQueries.original_query,
        source: searchQueries.source,
        result_count: searchQueries.result_count,
        created_at: searchQueries.created_at,
      })
      .from(searchQueries)
      .where(eq(searchQueries.user_id, userId))
      .orderBy(desc(searchQueries.created_at))
      .limit(5),

    // Recent activity (last 8)
    db
      .select({
        id: activityLog.id,
        action: activityLog.action,
        entity_type: activityLog.entityType,
        entity_id: activityLog.entityId,
        details: activityLog.details,
        created_at: activityLog.createdAt,
      })
      .from(activityLog)
      .where(eq(activityLog.userId, userId))
      .orderBy(desc(activityLog.createdAt))
      .limit(8),
  ]);

  return {
    recentProjects: recentProjectsResult,
    stats: {
      projectCount: projectCountResult[0]?.value ?? 0,
      paperCount: paperCountResult[0]?.value ?? 0,
      searchCount: searchCountResult[0]?.value ?? 0,
      conversationCount: conversationCountResult[0]?.value ?? 0,
    },
    recentSearches: recentSearchesResult,
    recentActivity: recentActivityResult,
  };
}
