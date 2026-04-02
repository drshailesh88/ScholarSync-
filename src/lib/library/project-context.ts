"use server";

/**
 * Project context management for Library.
 * Handles last_active_project_id persistence and retrieval.
 */

import { db } from "@/lib/db";
import { users, projects } from "@/lib/db/schema";
import { eq, and, isNull, desc } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export interface LibraryProject {
  id: number;
  title: string;
  status: string;
}

/**
 * Get the user's last active project ID.
 * Returns null if no project is set.
 */
export async function getLastActiveProjectId(): Promise<number | null> {
  const userId = await getCurrentUserId();

  const [user] = await db
    .select({ lastActiveProjectId: users.last_active_project_id })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return user?.lastActiveProjectId ?? null;
}

/**
 * Set the user's last active project ID.
 * Pass null to clear (return to "All Library").
 * Validates that the user owns the project before setting.
 */
export async function setLastActiveProjectId(
  projectId: number | null
): Promise<void> {
  const userId = await getCurrentUserId();

  // Verify ownership if setting a project (null = clear, always allowed)
  if (projectId !== null) {
    const [project] = await db
      .select({ id: projects.id })
      .from(projects)
      .where(
        and(
          eq(projects.id, projectId),
          eq(projects.user_id, userId),
          isNull(projects.deleted_at)
        )
      )
      .limit(1);

    if (!project) {
      throw new Error(`Project not found or not owned by user: ${projectId}`);
    }
  }

  await db
    .update(users)
    .set({ last_active_project_id: projectId })
    .where(eq(users.id, userId));

  revalidatePath("/library");
}

/**
 * Get all projects for the current user (for project switcher dropdown).
 * Returns lightweight project objects sorted by most recently updated.
 */
export async function getLibraryProjects(): Promise<LibraryProject[]> {
  const userId = await getCurrentUserId();

  const rows = await db
    .select({
      id: projects.id,
      title: projects.title,
      status: projects.status,
    })
    .from(projects)
    .where(
      and(
        eq(projects.user_id, userId),
        isNull(projects.deleted_at)
      )
    )
    .orderBy(desc(projects.updated_at));

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    status: r.status ?? "planning",
  }));
}
