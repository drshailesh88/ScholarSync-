import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { presentationRecordings } from "@/lib/db/schema";
import { getCurrentUserId } from "@/lib/auth";
import { eq, and, desc } from "drizzle-orm";
import {
  uploadRecording,
  downloadRecording,
  deleteRecording,
} from "@/lib/storage/r2";

// ---------------------------------------------------------------------------
// POST — Upload a recording
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    const formData = await req.formData();

    const videoFile = formData.get("video") as File | null;
    const deckId = formData.get("deckId") as string | null;
    const durationMs = formData.get("durationMs") as string | null;
    const slideMarkersRaw = formData.get("slideMarkers") as string | null;

    if (!videoFile || !deckId) {
      return NextResponse.json(
        { error: "Missing video or deckId" },
        { status: 400 }
      );
    }

    const recordingId = crypto.randomUUID();
    const buffer = Buffer.from(await videoFile.arrayBuffer());

    // Upload to R2 (or local filesystem in dev)
    const storagePath = await uploadRecording(deckId, recordingId, buffer);

    // Build a URL the frontend can use to play the recording.
    // In both Workers and local dev, we serve through our own API route.
    const storageUrl = `/api/recordings/upload?stream=${deckId}/${recordingId}.webm`;

    // Parse slide markers
    let slideMarkers = null;
    if (slideMarkersRaw) {
      try {
        slideMarkers = JSON.parse(slideMarkersRaw);
      } catch {
        // ignore invalid JSON
      }
    }

    // Save to DB
    const [recording] = await db
      .insert(presentationRecordings)
      .values({
        id: recordingId,
        deckId: parseInt(deckId, 10),
        userId,
        storageUrl,
        storagePath,
        durationMs: durationMs ? parseInt(durationMs, 10) : null,
        fileSizeBytes: buffer.length,
        slideMarkers: slideMarkers as Record<string, unknown>,
      })
      .returning();

    return NextResponse.json({ recording }, { status: 201 });
  } catch (err) {
    console.error("[recordings/upload] Error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// GET — List recordings for a deck (or stream a stored file)
// ---------------------------------------------------------------------------

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Stream a stored file (works in both local dev and Workers)
  const streamPath = searchParams.get("stream");
  if (streamPath) {
    const storagePath = `recordings/${streamPath}`;
    const buffer = await downloadRecording(storagePath);
    if (!buffer) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "video/webm",
        "Content-Length": String(buffer.length),
      },
    });
  }

  // List recordings
  const deckId = searchParams.get("deckId");
  if (!deckId) {
    return NextResponse.json(
      { error: "Missing deckId" },
      { status: 400 }
    );
  }

  try {
    const userId = await getCurrentUserId();
    const recordings = await db
      .select()
      .from(presentationRecordings)
      .where(
        and(
          eq(presentationRecordings.deckId, parseInt(deckId, 10)),
          eq(presentationRecordings.userId, userId)
        )
      )
      .orderBy(desc(presentationRecordings.createdAt));

    return NextResponse.json({ recordings });
  } catch (err) {
    console.error("[recordings/upload] GET error:", err);
    return NextResponse.json(
      { error: "Failed to list recordings" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// DELETE — Delete a recording
// ---------------------------------------------------------------------------

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const recordingId = searchParams.get("id");

  if (!recordingId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const userId = await getCurrentUserId();

    // Get the recording to find storage path
    const [recording] = await db
      .select()
      .from(presentationRecordings)
      .where(
        and(
          eq(presentationRecordings.id, recordingId),
          eq(presentationRecordings.userId, userId)
        )
      );

    if (!recording) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Delete from R2 / local filesystem
    await deleteRecording(recording.storagePath);

    // Delete from DB
    await db
      .delete(presentationRecordings)
      .where(eq(presentationRecordings.id, recordingId));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[recordings/upload] DELETE error:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
