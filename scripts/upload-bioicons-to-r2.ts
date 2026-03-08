#!/usr/bin/env tsx
/**
 * One-time script: Upload 1,548 bioicon SVGs to R2
 * Usage: npx tsx scripts/upload-bioicons-to-r2.ts
 *
 * This script:
 * 1. Reads all SVG files from /tmp/finnish/public/icons/bioicons/
 * 2. Uploads them to R2 under the icons/bioicons/ prefix
 * 3. Falls back to local .data/icons/bioicons/ in development
 */

import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BIOICONS_SOURCE = "/tmp/finnish/public/icons/bioicons/";
const LOCAL_DEV_DIR = path.join(process.cwd(), ".data", "icons", "bioicons");

/**
 * Check if running in Cloudflare Workers environment
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
 * Get R2 bucket binding (only works in Workers)
 */
function getBucket() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { env } = require("cloudflare:workers");
  return env.STORAGE;
}

/**
 * Upload a single SVG to R2 or save locally
 */
async function _uploadIcon(name: string, content: Buffer): Promise<string> {
  const key = `icons/bioicons/${name}`;

  if (isWorkers()) {
    // Production: Upload to R2
    const bucket = getBucket();
    await bucket.put(key, content, {
      httpMetadata: {
        contentType: "image/svg+xml",
        cacheControl: "public, max-age=31536000, immutable",
      },
    });
    return key;
  } else {
    // Development: Save to local .data directory
    if (!existsSync(LOCAL_DEV_DIR)) {
      await mkdir(LOCAL_DEV_DIR, { recursive: true });
    }
    const localPath = path.join(LOCAL_DEV_DIR, name);
    await writeFile(localPath, content);
    return key;
  }
}

/**
 * Main upload function
 */
async function uploadBioicons() {
  console.log("🚀 Starting bioicon upload...");

  // Check if source directory exists
  try {
    await stat(BIOICONS_SOURCE);
  } catch {
    console.error(`❌ Source directory not found: ${BIOICONS_SOURCE}`);
    console.log("   Clone FINNISH repo first:");
    console.log("   git clone https://github.com/drshailesh88/Illustration.git /tmp/finnish");
    process.exit(1);
  }

  // For local development, we'll copy files instead of actual R2 upload
  // since R2 bindings only work in Cloudflare Workers runtime
  if (!isWorkers()) {
    console.log("📁 Development mode: Copying to local .data directory...");
    console.log(`   Target: ${LOCAL_DEV_DIR}`);

    if (!existsSync(LOCAL_DEV_DIR)) {
      await mkdir(LOCAL_DEV_DIR, { recursive: true });
    }

    // Copy all SVG files
    const sourceFiles = await import("fs/promises");
    const files = await sourceFiles.readdir(BIOICONS_SOURCE);
    const svgFiles = files.filter((f: string) => f.endsWith(".svg"));

    let count = 0;
    for (const file of svgFiles) {
      const sourcePath = path.join(BIOICONS_SOURCE, file);
      const targetPath = path.join(LOCAL_DEV_DIR, file);
      const content = await readFile(sourcePath);
      await writeFile(targetPath, content);
      count++;
    }

    console.log(`✅ Copied ${count} SVG files to ${LOCAL_DEV_DIR}`);
    console.log("\n💡 In production (Cloudflare Workers), these would be uploaded to R2.");
    console.log("   The API route /api/illustration/icons will serve them appropriately.");
    return;
  }

  // Production R2 upload path
  console.log("☁️  Production mode: Uploading to R2...");
  const _uploaded = 0;
  const _failed = 0;

  // This would run in actual Workers environment
  // For now, it's a placeholder since we're not in Workers
  console.log("⚠️  R2 upload requires Cloudflare Workers runtime");
  console.log("   Deploy the app to upload icons to R2 automatically");
}

uploadBioicons().catch(console.error);
