import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import { db } from "@/lib/db";
import { presentationRecordings } from "@/lib/db/schema";
import { getCurrentUserId } from "@/lib/auth";
import { eq, and, desc } from "drizzle-orm";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// GCS / local storage setup (mirrors gcs.ts pattern)
// ---------------------------------------------------------------------------

const USE_LOCAL_STORAGE = process.env.USE_LOCAL_STORAGE === "true";
const LOCAL_STORAGE_DIR = path.join(process.cwd(), ".data", "recordings");
const BUCKET_NAME = process.env.GCS_BUCKET_NAME || "scholarsync-pdfs";

const storage = USE_LOCAL_STORAGE
  ? null
  : new Storage({ projectId: process.env.GCS_PROJECT_ID });
const bucket = USE_LOCAL_STORAGE ? null : storage!.bucket(BUCKET_NAME);

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
    const gcsPath = `recordings/${deckId}/${recordingId}.webm`;
    const buffer = Buffer.from(await videoFile.arrayBuffer());

    // Upload
    if (USE_LOCAL_STORAGE) {
      const dir = path.join(LOCAL_STORAGE_DIR, deckId);
      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
      }
      await writeFile(path.join(dir, `${recordingId}.webm`), buffer);
    } else {
      const file = bucket!.file(gcsPath);
      await file.save(buffer, {
        contentType: "video/webm",
        resumable: true,
        metadata: {
          cacheControl: "private, max-age=3600",
        },
      });
    }

    // Build storage URL
    let storageUrl: string;
    if (USE_LOCAL_STORAGE) {
      storageUrl = `/api/recordings/upload?stream=${deckId}/${recordingId}.webm`;
    } else {
      // Generate a signed URL valid for 7 days
      const file = bucket!.file(gcsPath);
      const [signedUrl] = await file.getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      });
      storageUrl = signedUrl;
    }

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
        storagePath: gcsPath,
        durationMs: durationMs ? parseInt(durationMs, 10) : null,
        fileSizeBytes: buffer.length,
        slideMarkers: slideMarkers as Record<string, unknown>,
      })
      .returning();

    return NextResponse.json({ recording }, { status: 201 });
  } catch (err) {
    console.error("[recordings/upload] Error:", err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// GET — List recordings for a deck (or stream a local file)
// ---------------------------------------------------------------------------

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Stream local file (dev only)
  const streamPath = searchParams.get("stream");
  if (streamPath && USE_LOCAL_STORAGE) {
    const filePath = path.join(LOCAL_STORAGE_DIR, streamPath);
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const { readFile } = await import("node:fs/promises");
    const buffer = await readFile(filePath);
    return new NextResponse(buffer, {
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

    // Delete from storage
    if (USE_LOCAL_STORAGE) {
      const filePath = path.join(
        LOCAL_STORAGE_DIR,
        recording.storagePath.replace("recordings/", "")
      );
      try {
        const { unlink } = await import("node:fs/promises");
        await unlink(filePath);
      } catch {
        // ignore
      }
    } else {
      try {
        const file = bucket!.file(recording.storagePath);
        await file.delete({ ignoreNotFound: true });
      } catch {
        // ignore
      }
    }

    // Delete from DB
    await db
      .delete(presentationRecordings)
      .where(eq(presentationRecordings.id, recordingId));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[recordings/upload] DELETE error:", err);
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}
