import crypto from "node:crypto";
import path from "node:path";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";

const LOCAL_IMAGE_DIR = path.join(process.cwd(), ".data", "images");

export interface StoredSlideAsset {
  key: string;
  url: string;
}

function isWorkers(): boolean {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("cloudflare:workers");
    return true;
  } catch {
    return false;
  }
}

export async function storeImportedSlideAsset(
  data: Uint8Array,
  extension: string,
  mimeType: string
): Promise<StoredSlideAsset> {
  const safeExtension = extension.replace(/[^a-z0-9]/gi, "").toLowerCase() || "png";
  const imageId = crypto.randomUUID();
  const key = `slides/images/${imageId}.${safeExtension}`;
  const buffer = Buffer.from(data);

  if (isWorkers()) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { env } = require("cloudflare:workers");
    await env.STORAGE.put(key, buffer, {
      httpMetadata: {
        contentType: mimeType,
        cacheControl: "public, max-age=31536000",
      },
    });
  } else {
    if (!existsSync(LOCAL_IMAGE_DIR)) {
      await mkdir(LOCAL_IMAGE_DIR, { recursive: true });
    }
    const localPath = path.join(LOCAL_IMAGE_DIR, `${imageId}.${safeExtension}`);
    await writeFile(localPath, buffer);
  }

  return {
    key,
    url: `/api/slides/upload-image?key=${encodeURIComponent(key)}`,
  };
}
