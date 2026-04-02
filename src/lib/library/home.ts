"use server";

/**
 * Library Home Aggregator — returns sections for the momentum-oriented home screen.
 *
 * Sections:
 *   Primary (always): Continue Reading, Active Project, Needs Review, Recently Saved
 *   Secondary (behavior-gated): Ready to Cite, Recently Highlighted, Sent to Notebook
 */

import { db } from "@/lib/db";
import {
  papers,
  userReferences,
  webSources,
  users,
  libraryAnnotations,
} from "@/lib/db/schema";
import { eq, and, desc, isNull, sql } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { adaptPaper, adaptWebSource } from "./adapter";
import type { PaperRow, WebSourceRow } from "./adapter";
import type { LibrarySource } from "./types";
import type { LibraryCounts } from "@/components/library/LibrarySidebar";

// ── Home sections ──────────────────────────────────────────────

export interface LibraryHomeData {
  continueReading: LibrarySource[];
  activeProject: LibrarySource[];
  needsReview: LibrarySource[];
  recentlySaved: LibrarySource[];
  // Secondary (may be empty)
  readyToCite: LibrarySource[];
  recentlyHighlighted: LibrarySource[];
  sentToNotebook: LibrarySource[];
}

export async function getLibraryHome(): Promise<LibraryHomeData> {
  const userId = await getCurrentUserId();

  const [continueReading, activeProject, needsReview, recentlySaved, readyToCite, recentlyHighlighted] =
    await Promise.all([
      getContinueReading(userId),
      getActiveProject(userId),
      getNeedsReview(userId),
      getRecentlySaved(userId),
      getReadyToCite(userId),
      getRecentlyHighlighted(userId),
    ]);

  return {
    continueReading,
    activeProject,
    needsReview,
    recentlySaved,
    readyToCite,
    recentlyHighlighted,
    sentToNotebook: [], // Phase 16 (citation handoff) will populate this
  };
}

// ── Counts for sidebar ─────────────────────────────────────────

export async function getLibraryCounts(): Promise<LibraryCounts> {
  const userId = await getCurrentUserId();

  // Papers counts by workflow state
  const paperCounts = await db
    .select({
      state: userReferences.workflowState,
      count: sql<number>`count(*)::int`,
    })
    .from(userReferences)
    .where(and(eq(userReferences.userId, userId), isNull(userReferences.deletedAt)))
    .groupBy(userReferences.workflowState);

  // Web source counts by workflow state
  const webCounts = await db
    .select({
      state: webSources.workflow_state,
      count: sql<number>`count(*)::int`,
    })
    .from(webSources)
    .where(and(eq(webSources.user_id, userId), isNull(webSources.deleted_at)))
    .groupBy(webSources.workflow_state);

  // Trash counts (soft-deleted)
  const [paperTrash] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(userReferences)
    .where(and(eq(userReferences.userId, userId), sql`${userReferences.deletedAt} IS NOT NULL`));

  const [webTrash] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(webSources)
    .where(and(eq(webSources.user_id, userId), sql`${webSources.deleted_at} IS NOT NULL`));

  const counts: LibraryCounts = { inbox: 0, core: 0, background: 0, archived: 0, all: 0, trash: 0 };

  for (const row of paperCounts) {
    const state = (row.state ?? "inbox") as keyof Omit<LibraryCounts, "all" | "trash">;
    if (state in counts) {
      counts[state] += row.count;
      counts.all += row.count;
    }
  }

  for (const row of webCounts) {
    const state = (row.state ?? "inbox") as keyof Omit<LibraryCounts, "all" | "trash">;
    if (state in counts) {
      counts[state] += row.count;
      counts.all += row.count;
    }
  }

  counts.trash = (paperTrash?.count ?? 0) + (webTrash?.count ?? 0);

  return counts;
}

// ── Efficient count for pagination ─────────────────────────────

/** Get total count of sources matching filters (without fetching all rows) */
export async function getLibrarySourceCount(
  workflowState?: "inbox" | "core" | "background" | "archived"
): Promise<number> {
  const userId = await getCurrentUserId();

  const paperConditions = [
    eq(userReferences.userId, userId),
    isNull(userReferences.deletedAt),
  ];
  const webConditions = [
    eq(webSources.user_id, userId),
    isNull(webSources.deleted_at),
  ];

  if (workflowState) {
    paperConditions.push(eq(userReferences.workflowState, workflowState));
    webConditions.push(eq(webSources.workflow_state, workflowState));
  }

  const [paperCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(userReferences)
    .where(and(...paperConditions));

  const [webCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(webSources)
    .where(and(...webConditions));

  return (paperCount?.count ?? 0) + (webCount?.count ?? 0);
}

// ── Internal section queries ───────────────────────────────────

/** Continue Reading: in-progress items with reading progress > 0, ordered by last_read_at desc */
async function getContinueReading(userId: string): Promise<LibrarySource[]> {
  const paperRows = await db
    .select({ ref: userReferences, paper: papers })
    .from(userReferences)
    .innerJoin(papers, eq(userReferences.paperId, papers.id))
    .where(
      and(
        eq(userReferences.userId, userId),
        isNull(userReferences.deletedAt),
        eq(userReferences.readStatus, "in_progress")
      )
    )
    .orderBy(desc(userReferences.lastReadAt))
    .limit(3);

  const webRows = await db
    .select()
    .from(webSources)
    .where(
      and(
        eq(webSources.user_id, userId),
        isNull(webSources.deleted_at),
        eq(webSources.read_status, "in_progress")
      )
    )
    .orderBy(desc(webSources.last_read_at))
    .limit(3);

  const results = [
    ...paperRows.map((r) => adaptPaper(r as PaperRow)),
    ...webRows.map((r) => adaptWebSource(r as WebSourceRow)),
  ];

  // Sort by lastReadAt desc and take top 3
  return results
    .sort((a, b) => {
      const aTime = a.lastReadAt ? new Date(a.lastReadAt).getTime() : 0;
      const bTime = b.lastReadAt ? new Date(b.lastReadAt).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 3);
}

/** Active Project: sources linked to user's last_active_project_id */
async function getActiveProject(userId: string): Promise<LibrarySource[]> {
  const [user] = await db
    .select({ lastActiveProjectId: users.last_active_project_id })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user?.lastActiveProjectId) return [];

  const { getLibrarySources } = await import("./service");
  return getLibrarySources({
    projectId: user.lastActiveProjectId,
    sortBy: "date_added",
    sortDir: "desc",
    limit: 4,
  });
}

/** Needs Review: unread items in inbox, newest first */
async function getNeedsReview(_userId: string): Promise<LibrarySource[]> {
  const { getLibrarySources } = await import("./service");
  return getLibrarySources({
    workflowState: "inbox",
    readStatus: "unread",
    sortBy: "date_added",
    sortDir: "desc",
    limit: 5,
  });
}

/** Recently Saved: all non-archived, newest first */
async function getRecentlySaved(_userId: string): Promise<LibrarySource[]> {
  const { getLibrarySources } = await import("./service");
  return getLibrarySources({
    sortBy: "date_added",
    sortDir: "desc",
    limit: 7,
  });
}

/** Ready to Cite: sources from consumed editor handoffs (payload.sources[].libraryId) */
async function getReadyToCite(userId: string): Promise<LibrarySource[]> {
  try {
    const { editorHandoffs } = await import("@/lib/db/schema");
    const handoffs = await db
      .select({ payload: editorHandoffs.payload })
      .from(editorHandoffs)
      .where(and(eq(editorHandoffs.userId, userId), eq(editorHandoffs.status, "consumed")))
      .orderBy(desc(editorHandoffs.createdAt))
      .limit(5);

    if (handoffs.length === 0) return [];

    // Extract unique libraryIds from handoff payloads
    const seen = new Set<string>();
    const libraryIds: string[] = [];
    for (const h of handoffs) {
      const sources = (h.payload as { sources: Array<{ libraryId: string }> })?.sources ?? [];
      for (const s of sources) {
        if (!seen.has(s.libraryId)) {
          seen.add(s.libraryId);
          libraryIds.push(s.libraryId);
        }
      }
    }

    const { getLibrarySourceById } = await import("./service");
    const results = await Promise.allSettled(
      libraryIds.slice(0, 5).map((id) => getLibrarySourceById(id))
    );
    return results
      .filter((r): r is PromiseFulfilledResult<LibrarySource> => r.status === "fulfilled")
      .map((r) => r.value);
  } catch {
    return [];
  }
}

/** Recently Highlighted: sources with recent annotations */
async function getRecentlyHighlighted(userId: string): Promise<LibrarySource[]> {
  try {
    const annotations = await db
      .select({
        sourceId: libraryAnnotations.source_id,
        sourceType: libraryAnnotations.source_type,
      })
      .from(libraryAnnotations)
      .where(eq(libraryAnnotations.user_id, userId))
      .orderBy(desc(libraryAnnotations.created_at))
      .limit(10);

    if (annotations.length === 0) return [];

    // Deduplicate by source
    const seen = new Set<string>();
    const unique = annotations.filter((a) => {
      const key = `${a.sourceType}_${a.sourceId}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const { getLibrarySourceById } = await import("./service");
    const results = await Promise.allSettled(
      unique.slice(0, 5).map((a) => getLibrarySourceById(`${a.sourceType}_${a.sourceId}`))
    );
    return results
      .filter((r): r is PromiseFulfilledResult<LibrarySource> => r.status === "fulfilled")
      .map((r) => r.value);
  } catch {
    return []; // library_annotations may not have data yet
  }
}
