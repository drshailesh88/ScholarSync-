import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

// ---------------------------------------------------------------------------
// Image upload for slide blocks — stores to R2 or local filesystem
// ---------------------------------------------------------------------------

const LOCAL_IMAGE_DIR = path.join(process.cwd(), ".data", "images");
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp", "image/svg+xml"];

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
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop() ?? "png";
    const imageId = crypto.randomUUID();
    const key = `slides/images/${imageId}.${ext}`;
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

      // Return the R2 public URL or API streaming URL
      const url = `/api/slides/upload-image?key=${encodeURIComponent(key)}`;
      return NextResponse.json({ url, key });
    }

    // Local filesystem fallback
    if (!existsSync(LOCAL_IMAGE_DIR)) {
      await mkdir(LOCAL_IMAGE_DIR, { recursive: true });
    }
    const localPath = path.join(LOCAL_IMAGE_DIR, `${imageId}.${ext}`);
    await writeFile(localPath, buffer);

    const url = `/api/slides/upload-image?key=${encodeURIComponent(key)}`;
    log.info("Image uploaded", { key, size: file.size });

    return NextResponse.json({ url, key });
  } catch (error) {
    log.error("Image upload error", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

// GET — stream a stored image back to the browser
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
    const ext = key.split(".").pop() ?? "png";
    const contentType = ext === "svg" ? "image/svg+xml" : `image/${ext}`;
    return new NextResponse(ab, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000",
      },
    });
  }

  // Local filesystem
  const filename = key.replace("slides/images/", "");
  const localPath = path.join(LOCAL_IMAGE_DIR, filename);
  if (!existsSync(localPath)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const buffer = await readFile(localPath);
  const ext = filename.split(".").pop() ?? "png";
  const contentType = ext === "svg" ? "image/svg+xml" : `image/${ext}`;
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000",
    },
  });
}
