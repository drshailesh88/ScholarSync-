/**
 * Project Collaborators — Collaboration module for systematic review projects.
 *
 * Provides invite/role/access functions that sit between the raw DB layer
 * and the API routes.  All write operations are intentionally narrow:
 *  - Only the project owner can invite, remove, or update roles.
 *  - canAccessProject / verifyProjectAccess are the shared guards used
 *    by API routes that need to allow collaborators as well as owners.
 */

import { db } from "@/lib/db";
import {
  projects,
  users,
  projectCollaborators,
} from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CollaboratorRole =
  | "owner"
  | "reviewer"
  | "extractor"
  | "statistician"
  | "viewer";

export interface CollaboratorRecord {
  id: number;
  projectId: number;
  userId: string;
  email: string;
  role: string;
  invitedAt: Date | null;
  acceptedAt: Date | null;
}

export interface ProjectAccessResult {
  allowed: boolean;
  role: string | null;
}

// ---------------------------------------------------------------------------
// inviteCollaborator
// ---------------------------------------------------------------------------

/**
 * Invite a user to collaborate on a project by email.
 *
 * Looks up the user record in the `users` table by email address.
 * Inserts (or silently skips on conflict via `onConflictDoNothing`) a row
 * into `project_collaborators`.
 *
 * @returns The newly created (or existing) collaborator record.
 * @throws If no user with the given email exists.
 */
export async function inviteCollaborator(
  projectId: number,
  email: string,
  role: string = "reviewer"
): Promise<CollaboratorRecord> {
  // Look up the user by email
  const [user] = await db
    .select({ id: users.id, email: users.email })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    throw new Error(`No user found with email: ${email}`);
  }

  // Insert — if the (projectId, userId) pair already exists the unique index
  // will prevent a duplicate; we re-fetch instead.
  const [existing] = await db
    .select()
    .from(projectCollaborators)
    .where(
      and(
        eq(projectCollaborators.projectId, projectId),
        eq(projectCollaborators.userId, user.id)
      )
    )
    .limit(1);

  if (existing) {
    return existing as CollaboratorRecord;
  }

  const [inserted] = await db
    .insert(projectCollaborators)
    .values({
      projectId,
      userId: user.id,
      email: user.email,
      role,
    })
    .returning();

  return inserted as CollaboratorRecord;
}

// ---------------------------------------------------------------------------
// getProjectCollaborators
// ---------------------------------------------------------------------------

/**
 * Return all collaborator rows for a given project, ordered by invite time.
 */
export async function getProjectCollaborators(
  projectId: number
): Promise<CollaboratorRecord[]> {
  const rows = await db
    .select()
    .from(projectCollaborators)
    .where(eq(projectCollaborators.projectId, projectId));

  return rows as CollaboratorRecord[];
}

// ---------------------------------------------------------------------------
// removeCollaborator
// ---------------------------------------------------------------------------

/**
 * Remove a collaborator from a project.
 *
 * @returns true if a row was deleted, false if the collaborator was not found.
 */
export async function removeCollaborator(
  projectId: number,
  userId: string
): Promise<boolean> {
  const deleted = await db
    .delete(projectCollaborators)
    .where(
      and(
        eq(projectCollaborators.projectId, projectId),
        eq(projectCollaborators.userId, userId)
      )
    )
    .returning({ id: projectCollaborators.id });

  return deleted.length > 0;
}

// ---------------------------------------------------------------------------
// updateCollaboratorRole
// ---------------------------------------------------------------------------

/**
 * Change the role of an existing collaborator.
 *
 * @returns The updated record.
 * @throws If the collaborator does not exist.
 */
export async function updateCollaboratorRole(
  projectId: number,
  userId: string,
  newRole: string
): Promise<CollaboratorRecord> {
  const [updated] = await db
    .update(projectCollaborators)
    .set({ role: newRole })
    .where(
      and(
        eq(projectCollaborators.projectId, projectId),
        eq(projectCollaborators.userId, userId)
      )
    )
    .returning();

  if (!updated) {
    throw new Error(
      `Collaborator not found for project ${projectId} / user ${userId}`
    );
  }

  return updated as CollaboratorRecord;
}

// ---------------------------------------------------------------------------
// canAccessProject
// ---------------------------------------------------------------------------

/**
 * Fast boolean check — true if the user is the project owner OR a collaborator.
 */
export async function canAccessProject(
  projectId: number,
  userId: string
): Promise<boolean> {
  const { allowed } = await verifyProjectAccess(projectId, userId);
  return allowed;
}

// ---------------------------------------------------------------------------
// getProjectRole
// ---------------------------------------------------------------------------

/**
 * Return the role string for the given user, or null if they have no access.
 * Returns "owner" for the project owner.
 */
export async function getProjectRole(
  projectId: number,
  userId: string
): Promise<string | null> {
  const { role } = await verifyProjectAccess(projectId, userId);
  return role;
}

// ---------------------------------------------------------------------------
// verifyProjectAccess  (shared guard)
// ---------------------------------------------------------------------------

/**
 * Unified access check used by API route handlers.
 *
 * Checks ownership first (cheap single-index lookup on projects.user_id),
 * then falls back to the collaborators table.
 *
 * @returns { allowed: true, role: "owner" | collaboratorRole }
 *          or { allowed: false, role: null }
 */
export async function verifyProjectAccess(
  projectId: number,
  userId: string
): Promise<ProjectAccessResult> {
  // 1. Check if the user is the owner
  const [project] = await db
    .select({ id: projects.id })
    .from(projects)
    .where(and(eq(projects.id, projectId), eq(projects.user_id, userId)))
    .limit(1);

  if (project) {
    return { allowed: true, role: "owner" };
  }

  // 2. Check if the user is a collaborator
  const [collab] = await db
    .select({ role: projectCollaborators.role })
    .from(projectCollaborators)
    .where(
      and(
        eq(projectCollaborators.projectId, projectId),
        eq(projectCollaborators.userId, userId)
      )
    )
    .limit(1);

  if (collab) {
    return { allowed: true, role: collab.role };
  }

  return { allowed: false, role: null };
}
