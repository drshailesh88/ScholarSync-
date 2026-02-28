/**
 * /api/systematic-review/collaborators
 *
 * Manages project collaborators for the systematic review feature.
 * Only the project owner can call these endpoints.
 *
 * GET    ?projectId=<n>  — List all collaborators
 * POST                   — Invite a collaborator  { projectId, email, role }
 * PUT                    — Update a collaborator's role { projectId, userId, role }
 * DELETE                 — Remove a collaborator  { projectId, userId }
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import {
  inviteCollaborator,
  getProjectCollaborators,
  removeCollaborator,
  updateCollaboratorRole,
} from "@/lib/systematic-review/collaboration";
import { auditLog } from "@/lib/security/audit-log";

// ---------------------------------------------------------------------------
// Shared ownership guard — only the project owner may manage collaborators
// ---------------------------------------------------------------------------

async function verifyOwnership(
  projectId: number,
  userId: string
): Promise<boolean> {
  const [project] = await db
    .select({ id: projects.id })
    .from(projects)
    .where(and(eq(projects.id, projectId), eq(projects.user_id, userId)))
    .limit(1);

  return !!project;
}

// ---------------------------------------------------------------------------
// GET — List collaborators
// ---------------------------------------------------------------------------

export async function GET(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(req.url);
    const projectId = parseInt(searchParams.get("projectId") || "0", 10);

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

    const isOwner = await verifyOwnership(projectId, userId);
    if (!isOwner) {
      return NextResponse.json(
        { error: "Project not found or access denied" },
        { status: 404 }
      );
    }

    const collaborators = await getProjectCollaborators(projectId);
    return NextResponse.json({ collaborators });
  } catch (error) {
    console.error("GET /collaborators error", error);
    return NextResponse.json(
      { error: "Failed to get collaborators" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// POST — Invite a collaborator
// ---------------------------------------------------------------------------

const VALID_ROLES = ["reviewer", "extractor", "statistician", "viewer"] as const;

const inviteSchema = z.object({
  projectId: z.number().int().positive(),
  email: z.string().email(),
  role: z.enum(VALID_ROLES).default("reviewer"),
});

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const parsed = inviteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId, email, role } = parsed.data;

    const isOwner = await verifyOwnership(projectId, userId);
    if (!isOwner) {
      return NextResponse.json(
        { error: "Project not found or access denied" },
        { status: 404 }
      );
    }

    const collaborator = await inviteCollaborator(projectId, email, role);

    auditLog({
      action: "collaborator.added",
      userId,
      resourceType: "project",
      resourceId: projectId,
      metadata: { email, role },
    });

    return NextResponse.json({ collaborator }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Invitation processed")) {
      return NextResponse.json({ message: error.message }, { status: 200 });
    }
    console.error("POST /collaborators error", error);
    return NextResponse.json(
      { error: "Failed to invite collaborator" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// PUT — Update collaborator role
// ---------------------------------------------------------------------------

const updateRoleSchema = z.object({
  projectId: z.number().int().positive(),
  userId: z.string().min(1),
  role: z.enum(VALID_ROLES),
});

export async function PUT(req: Request) {
  try {
    const ownerId = await getCurrentUserId();
    const body = await req.json();
    const parsed = updateRoleSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId, userId, role } = parsed.data;

    const isOwner = await verifyOwnership(projectId, ownerId);
    if (!isOwner) {
      return NextResponse.json(
        { error: "Project not found or access denied" },
        { status: 404 }
      );
    }

    // Prevent owner from changing their own role via this endpoint
    if (userId === ownerId) {
      return NextResponse.json(
        { error: "Cannot change the owner's role" },
        { status: 400 }
      );
    }

    const collaborator = await updateCollaboratorRole(projectId, userId, role);
    return NextResponse.json({ collaborator });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Collaborator not found")) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    console.error("PUT /collaborators error", error);
    return NextResponse.json(
      { error: "Failed to update collaborator role" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// DELETE — Remove a collaborator
// ---------------------------------------------------------------------------

const removeSchema = z.object({
  projectId: z.number().int().positive(),
  userId: z.string().min(1),
});

export async function DELETE(req: Request) {
  try {
    const ownerId = await getCurrentUserId();
    const body = await req.json();
    const parsed = removeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId, userId } = parsed.data;

    const isOwner = await verifyOwnership(projectId, ownerId);
    if (!isOwner) {
      return NextResponse.json(
        { error: "Project not found or access denied" },
        { status: 404 }
      );
    }

    // Prevent the owner from removing themselves
    if (userId === ownerId) {
      return NextResponse.json(
        { error: "Cannot remove the project owner" },
        { status: 400 }
      );
    }

    const removed = await removeCollaborator(projectId, userId);
    if (!removed) {
      return NextResponse.json(
        { error: "Collaborator not found" },
        { status: 404 }
      );
    }

    auditLog({
      action: "collaborator.removed",
      userId: ownerId,
      resourceType: "project",
      resourceId: projectId,
      metadata: { removedUserId: userId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /collaborators error", error);
    return NextResponse.json(
      { error: "Failed to remove collaborator" },
      { status: 500 }
    );
  }
}
