"use server";

/**
 * Unified Library Service — getLibrarySources, getLibrarySourceById, moveLibrarySourceState
 *
 * Dispatches to the correct underlying table (userReferences+papers or webSources)
 * based on the composite libraryId format. Returns normalized LibrarySource objects.
 */

import { db } from "@/lib/db";
import {
  papers,
  userReferences,
  webSources,
  projectPapers,
  projectWebSources,
  projects,
} from "@/lib/db/schema";
import {
  eq,
  and,
  desc,
  asc,
  isNull,
  ilike,
  or,
  sql,
  inArray,
} from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { revalidatePath } from "next/cache";

import type {
  LibrarySource,
  LibrarySourceFilters,
  WorkflowState,
} from "./types";
import { parseLibraryId } from "./types";
import { adaptPaper, adaptWebSource } from "./adapter";
import type { PaperRow, WebSourceRow } from "./adapter";

// ── getLibrarySources ───────────────────────────────────────────

/**
 * Fetch a unified list of library sources (papers + web sources).
 * Supports filtering by sourceType, workflowState, readStatus, search, project.
 */
export async function getLibrarySources(
  filters: LibrarySourceFilters = {}
): Promise<LibrarySource[]> {
  const userId = await getCurrentUserId();

  const wantPapers = !filters.sourceType || filters.sourceType === "paper";
  const wantWeb = !filters.sourceType || filters.sourceType === "web";

  const results: LibrarySource[] = [];

  if (wantPapers) {
    const paperResults = await fetchPapers(userId, filters);
    results.push(...paperResults);
  }

  if (wantWeb) {
    const webResults = await fetchWebSources(userId, filters);
    results.push(...webResults);
  }

  // Sort the combined results, then apply offset + limit
  const sorted = sortResults(results, filters.sortBy ?? "date_added", filters.sortDir ?? "desc");
  const start = filters.offset ?? 0;
  const end = start + (filters.limit ?? 50);
  return sorted.slice(start, end);
}

// ── getLibrarySourceById ────────────────────────────────────────

/**
 * Fetch a single library source by its composite libraryId.
 * @throws if not found or not owned by current user
 */
export async function getLibrarySourceById(
  libraryId: string
): Promise<LibrarySource> {
  const userId = await getCurrentUserId();
  const { type, id } = parseLibraryId(libraryId);

  if (type === "paper") {
    const rows = await db
      .select({ ref: userReferences, paper: papers })
      .from(userReferences)
      .innerJoin(papers, eq(userReferences.paperId, papers.id))
      .where(
        and(
          eq(papers.id, id),
          eq(userReferences.userId, userId),
          isNull(userReferences.deletedAt)
        )
      )
      .limit(1);

    if (rows.length === 0) {
      throw new Error(`Library source not found: ${libraryId}`);
    }

    const projectIds = await getProjectIdsForPaper(id, userId);
    return adaptPaper({ ...rows[0], projectIds } as PaperRow);
  } else {
    const rows = await db
      .select()
      .from(webSources)
      .where(
        and(
          eq(webSources.id, id),
          eq(webSources.user_id, userId),
          isNull(webSources.deleted_at)
        )
      )
      .limit(1);

    if (rows.length === 0) {
      throw new Error(`Library source not found: ${libraryId}`);
    }

    const projectIds = await getProjectIdsForWebSource(id, userId);
    return adaptWebSource({ ...rows[0], projectIds } as WebSourceRow);
  }
}

// ── moveLibrarySourceState ──────────────────────────────────────

/**
 * Move a library source to a new workflow state.
 * Dispatches to the correct table based on the libraryId prefix.
 */
export async function moveLibrarySourceState(
  libraryId: string,
  newState: WorkflowState
): Promise<void> {
  const userId = await getCurrentUserId();
  const { type, id } = parseLibraryId(libraryId);

  if (type === "paper") {
    await db
      .update(userReferences)
      .set({ workflowState: newState })
      .where(
        and(
          eq(userReferences.paperId, id),
          eq(userReferences.userId, userId),
          isNull(userReferences.deletedAt)
        )
      );
  } else {
    await db
      .update(webSources)
      .set({ workflow_state: newState })
      .where(
        and(
          eq(webSources.id, id),
          eq(webSources.user_id, userId),
          isNull(webSources.deleted_at)
        )
      );
  }

  revalidatePath("/library");
}

// ── updateReadingProgress ──────────────────────────────────────

/**
 * Update reading progress (0-100) and read_status for a library source.
 * Dispatches to the correct table based on libraryId prefix.
 */
export async function updateReadingProgress(
  libraryId: string,
  progress: number
): Promise<void> {
  const userId = await getCurrentUserId();
  const { type, id } = parseLibraryId(libraryId);
  const clamped = Math.max(0, Math.min(100, Math.round(progress)));
  const readStatus = clamped >= 95 ? "read" : clamped > 0 ? "in_progress" : "unread";
  const now = new Date();

  if (type === "paper") {
    await db
      .update(userReferences)
      .set({
        readingProgress: clamped,
        readStatus,
        lastReadAt: now,
      })
      .where(
        and(
          eq(userReferences.paperId, id),
          eq(userReferences.userId, userId),
          isNull(userReferences.deletedAt)
        )
      );
  } else {
    await db
      .update(webSources)
      .set({
        reading_progress: clamped,
        read_status: readStatus,
        last_read_at: now,
      })
      .where(
        and(
          eq(webSources.id, id),
          eq(webSources.user_id, userId),
          isNull(webSources.deleted_at)
        )
      );
  }
}

// ── Internal query builders ─────────────────────────────────────

async function fetchPapers(
  userId: string,
  filters: LibrarySourceFilters
): Promise<LibrarySource[]> {
  const conditions = [
    eq(userReferences.userId, userId),
    isNull(userReferences.deletedAt),
  ];

  if (filters.workflowState) {
    conditions.push(eq(userReferences.workflowState, filters.workflowState));
  }

  if (filters.readStatus) {
    conditions.push(eq(userReferences.readStatus, filters.readStatus));
  }

  if (filters.search) {
    conditions.push(
      or(
        ilike(papers.title, `%${filters.search}%`),
        ilike(papers.journal, `%${filters.search}%`)
      )!
    );
  }

  if (filters.projectId) {
    const ppRows = await db
      .select({ paperId: projectPapers.paper_id })
      .from(projectPapers)
      .where(eq(projectPapers.project_id, filters.projectId));
    const ids = ppRows.map((r) => r.paperId);
    if (ids.length === 0) return [];
    conditions.push(inArray(userReferences.paperId, ids));
  }

  const rows = await db
    .select({ ref: userReferences, paper: papers })
    .from(userReferences)
    .innerJoin(papers, eq(userReferences.paperId, papers.id))
    .where(and(...conditions))
    .limit(perTableLimit(filters));

  return rows.map((row) => adaptPaper(row as PaperRow));
}

async function fetchWebSources(
  userId: string,
  filters: LibrarySourceFilters
): Promise<LibrarySource[]> {
  const conditions = [
    eq(webSources.user_id, userId),
    isNull(webSources.deleted_at),
  ];

  if (filters.workflowState) {
    conditions.push(eq(webSources.workflow_state, filters.workflowState));
  }

  if (filters.readStatus) {
    conditions.push(eq(webSources.read_status, filters.readStatus));
  }

  if (filters.search) {
    conditions.push(
      or(
        ilike(webSources.title, `%${filters.search}%`),
        ilike(webSources.domain, `%${filters.search}%`)
      )!
    );
  }

  if (filters.projectId) {
    const pwsRows = await db
      .select({ webSourceId: projectWebSources.web_source_id })
      .from(projectWebSources)
      .where(eq(projectWebSources.project_id, filters.projectId));
    const ids = pwsRows.map((r) => r.webSourceId);
    if (ids.length === 0) return [];
    conditions.push(inArray(webSources.id, ids));
  }

  const rows = await db
    .select()
    .from(webSources)
    .where(and(...conditions))
    .limit(perTableLimit(filters));

  return rows.map((row) => adaptWebSource(row as WebSourceRow));
}

// ── Helpers ─────────────────────────────────────────────────────

async function getProjectIdsForPaper(
  paperId: number,
  userId: string
): Promise<number[]> {
  const rows = await db
    .select({ projectId: projectPapers.project_id })
    .from(projectPapers)
    .innerJoin(projects, eq(projectPapers.project_id, projects.id))
    .where(
      and(
        eq(projectPapers.paper_id, paperId),
        eq(projects.user_id, userId)
      )
    );
  return rows.map((r) => r.projectId);
}

async function getProjectIdsForWebSource(
  webSourceId: number,
  userId: string
): Promise<number[]> {
  const rows = await db
    .select({ projectId: projectWebSources.project_id })
    .from(projectWebSources)
    .innerJoin(projects, eq(projectWebSources.project_id, projects.id))
    .where(
      and(
        eq(projectWebSources.web_source_id, webSourceId),
        eq(projects.user_id, userId)
      )
    );
  return rows.map((r) => r.projectId);
}

/** Per-table fetch limit: offset + limit to ensure enough rows for merge + slice */
function perTableLimit(filters: LibrarySourceFilters): number {
  return (filters.offset ?? 0) + (filters.limit ?? 50);
}

function sortResults(
  results: LibrarySource[],
  sortBy: string,
  sortDir: string
): LibrarySource[] {
  const dir = sortDir === "asc" ? 1 : -1;

  return results.sort((a, b) => {
    switch (sortBy) {
      case "title":
        return dir * a.title.localeCompare(b.title);
      case "year":
        return dir * ((a.year ?? 0) - (b.year ?? 0));
      case "date_added":
      default:
        return dir * (new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime());
    }
  });
}
