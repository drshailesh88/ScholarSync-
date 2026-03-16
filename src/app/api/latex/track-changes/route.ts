/**
 * Track Changes API Routes
 *
 * GET    /api/latex/track-changes?fileId=xxx  - Get all track changes for a file
 * POST   /api/latex/track-changes              - Create a new track change
 * PATCH  /api/latex/track-changes              - Update track change (accept/reject)
 * DELETE /api/latex/track-changes?id=xxx       - Delete a track change
 */

import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { latexTrackChanges } from "@/lib/db/schema/editor";
import { eq } from "drizzle-orm";

/**
 * GET /api/latex/track-changes?fileId=xxx
 * Get all track changes for a specific LaTeX file
 */
export async function GET(req: NextRequest) {
  try {
    await getCurrentUserId();

    const searchParams = req.nextUrl.searchParams;
    const fileId = searchParams.get("fileId");

    if (!fileId) {
      return NextResponse.json({ error: "fileId is required" }, { status: 400 });
    }

    const changes = await db
      .select()
      .from(latexTrackChanges)
      .where(eq(latexTrackChanges.latexFileId, fileId))
      .orderBy(latexTrackChanges.createdAt);

    return NextResponse.json({ changes });
  } catch (error) {
    console.error("Error fetching track changes:", error);
    return NextResponse.json(
      { error: "Failed to fetch track changes" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/latex/track-changes
 * Create a new track change
 */
export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();

    const body = await req.json();
    const {
      fileId,
      type,
      fromPos,
      toPos,
      insertedText,
      deletedText,
      authorName,
    } = body;

    // Validate required fields
    if (!fileId || !type || fromPos === undefined || toPos === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: fileId, type, fromPos, toPos" },
        { status: 400 }
      );
    }

    if (type !== "insert" && type !== "delete" && type !== "replace") {
      return NextResponse.json(
        { error: "Invalid change type. Must be insert, delete, or replace" },
        { status: 400 }
      );
    }

    // Create the track change
    const [newChange] = await db
      .insert(latexTrackChanges)
      .values({
        latexFileId: fileId,
        type,
        fromPos,
        toPos,
        insertedText: insertedText ?? null,
        deletedText: deletedText ?? null,
        authorId: userId,
        authorName: authorName ?? "Anonymous",
        status: "pending",
      })
      .returning();

    return NextResponse.json({ change: newChange }, { status: 201 });
  } catch (error) {
    console.error("Error creating track change:", error);
    return NextResponse.json(
      { error: "Failed to create track change" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/latex/track-changes
 * Update a track change (accept/reject)
 */
export async function PATCH(req: NextRequest) {
  try {
    await getCurrentUserId();

    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing required fields: id, status" },
        { status: 400 }
      );
    }

    if (status !== "accepted" && status !== "rejected") {
      return NextResponse.json(
        { error: "Invalid status. Must be accepted or rejected" },
        { status: 400 }
      );
    }

    // Update the track change
    const [updatedChange] = await db
      .update(latexTrackChanges)
      .set({ status })
      .where(eq(latexTrackChanges.id, id))
      .returning();

    if (!updatedChange) {
      return NextResponse.json(
        { error: "Track change not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ change: updatedChange });
  } catch (error) {
    console.error("Error updating track change:", error);
    return NextResponse.json(
      { error: "Failed to update track change" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/latex/track-changes?id=xxx
 * Delete a track change
 */
export async function DELETE(req: NextRequest) {
  try {
    await getCurrentUserId();

    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing required parameter: id" },
        { status: 400 }
      );
    }

    // Delete the track change
    const [deletedChange] = await db
      .delete(latexTrackChanges)
      .where(eq(latexTrackChanges.id, id))
      .returning();

    if (!deletedChange) {
      return NextResponse.json(
        { error: "Track change not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting track change:", error);
    return NextResponse.json(
      { error: "Failed to delete track change" },
      { status: 500 }
    );
  }
}
