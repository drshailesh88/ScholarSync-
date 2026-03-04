import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// GET /api/illustration/icons
// Serves individual icon SVGs from R2 or local .data directory
// ---------------------------------------------------------------------------

const LOCAL_ICONS_DIR = path.join(process.cwd(), ".data", "icons", "bioicons");

/**
 * Check if running in Cloudflare Workers
 */
function isWorkers(): boolean {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("cloudflare:workers");
    return true;
  } catch {
    return false;
  }
}

/**
 * Get R2 bucket binding (only in Workers)
 */
function getBucket() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { env } = require("cloudflare:workers");
  return env.STORAGE;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json(
      { error: "Missing 'name' parameter" },
      { status: 400 }
    );
  }

  // Security: Only allow .svg files with safe names
  if (!name.endsWith(".svg") || name.includes("..") || name.includes("/")) {
    return NextResponse.json(
      { error: "Invalid icon name" },
      { status: 400 }
    );
  }

  const key = `icons/bioicons/${name}`;

  try {
    if (isWorkers()) {
      // Production: Serve from R2
      const bucket = getBucket();
      const object = await bucket.get(key);

      if (!object) {
        return NextResponse.json(
          { error: "Icon not found" },
          { status: 404 }
        );
      }

      const svg = await object.text();
      return new NextResponse(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } else {
      // Development: Serve from local .data directory
      const localPath = path.join(LOCAL_ICONS_DIR, name);

      if (!existsSync(localPath)) {
        return NextResponse.json(
          { error: "Icon not found (run upload script first)" },
          { status: 404 }
        );
      }

      const svg = await readFile(localPath, "utf-8");
      return new NextResponse(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  } catch (error) {
    console.error("Icon serve error:", error);
    return NextResponse.json(
      { error: "Failed to serve icon" },
      { status: 500 }
    );
  }
}
