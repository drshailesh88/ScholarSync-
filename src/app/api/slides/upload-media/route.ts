import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

// ---------------------------------------------------------------------------
// Media upload for slide blocks — stores to R2 or local filesystem
// ---------------------------------------------------------------------------

const LOCAL_MEDIA_DIR = path.join(process.cwd(), ".data", "media");
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/ogg",
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "audio/aac",
  "audio/flac",
  "audio/mp4",
  "audio/webm",
];

function isWorkers(): boolean {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("cloudflare:workers");
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateLimitResponse = await checkRateLimit(userId, "presentations", RATE_LIMITS.ai);
    if (rateLimitResponse) return rateLimitResponse;

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type: ${file.type}. Allowed: ${ALLOWED_TYPES.join(", ")}` },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 },
      );
    }

    const ext = file.name.split(".").pop() ?? "mp4";
    const mediaId = crypto.randomUUID();
    const key = `slides/media/${mediaId}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    if (isWorkers()) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { env } = require("cloudflare:workers");
      await env.STORAGE.put(key, buffer, {
        httpMetadata: {
          contentType: file.type,
          cacheControl: "public, max-age=31536000",
        },
      });

      const url = `/api/slides/upload-media?key=${encodeURIComponent(key)}`;
      return NextResponse.json({ url, key, mimeType: file.type });
    }

    // Local filesystem fallback
    if (!existsSync(LOCAL_MEDIA_DIR)) {
      await mkdir(LOCAL_MEDIA_DIR, { recursive: true });
    }
    const localPath = path.join(LOCAL_MEDIA_DIR, `${mediaId}.${ext}`);
    await writeFile(localPath, buffer);

    const url = `/api/slides/upload-media?key=${encodeURIComponent(key)}`;
    log.info("Media uploaded", { key, size: file.size, type: file.type });

    return NextResponse.json({ url, key, mimeType: file.type });
  } catch (error) {
    log.error("Media upload error", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

// GET — stream a stored media file back to the browser
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  if (isWorkers()) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { env } = require("cloudflare:workers");
    const obj = await env.STORAGE.get(key);
    if (!obj) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const ab = await obj.arrayBuffer();
    const ext = key.split(".").pop() ?? "mp4";
    const contentType = mimeFromExt(ext);
    return new NextResponse(ab, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000",
      },
    });
  }

  // Local filesystem
  const filename = key.replace("slides/media/", "");
  const localPath = path.join(LOCAL_MEDIA_DIR, filename);
  if (!existsSync(localPath)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const buffer = await readFile(localPath);
  const ext = filename.split(".").pop() ?? "mp4";
  const contentType = mimeFromExt(ext);
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000",
    },
  });
}

function mimeFromExt(ext: string): string {
  const map: Record<string, string> = {
    mp4: "video/mp4",
    webm: "video/webm",
    mov: "video/quicktime",
    ogg: "video/ogg",
    mp3: "audio/mpeg",
    wav: "audio/wav",
    aac: "audio/aac",
    flac: "audio/flac",
    m4a: "audio/mp4",
  };
  return map[ext.toLowerCase()] ?? "application/octet-stream";
}
