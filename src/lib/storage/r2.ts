import { readFile, writeFile, mkdir, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// R2 storage module — drop-in replacement for gcs.ts
//
// In Cloudflare Workers runtime, objects are accessed via the R2 bucket
// binding (env.STORAGE). Outside Workers (local dev / Node), we fall back
// to the filesystem under .data/.
// ---------------------------------------------------------------------------

// Minimal R2 type declarations — the full types come from @cloudflare/workers-types
// at deploy time, but we don't want that devDependency in the Next.js project.
interface R2ObjectBody {
  arrayBuffer(): Promise<ArrayBuffer>;
}
interface R2Object {
  key: string;
  size: number;
}
interface R2PutOptions {
  httpMetadata?: { contentType?: string; cacheControl?: string };
}
interface R2Bucket {
  put(key: string, value: ArrayBuffer | ArrayBufferView | string | ReadableStream | null, options?: R2PutOptions): Promise<R2Object>;
  get(key: string): Promise<R2ObjectBody | null>;
  head(key: string): Promise<R2Object | null>;
  delete(key: string | string[]): Promise<void>;
}

const LOCAL_PDF_DIR = path.join(process.cwd(), ".data", "pdfs");
const LOCAL_RECORDING_DIR = path.join(process.cwd(), ".data", "recordings");
const LOCAL_AUDIO_OVERVIEW_DIR = path.join(
  process.cwd(),
  ".data",
  "audio-overviews"
);

/** True when running inside Cloudflare Workers (the `cloudflare:workers` module exists). */
function isWorkers(): boolean {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("cloudflare:workers");
    return true;
  } catch {
    return false;
  }
}

/** Return the R2Bucket binding. Only valid inside Workers. */
function getBucket(): R2Bucket {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { env } = require("cloudflare:workers");
  return env.STORAGE;
}

// ---------------------------------------------------------------------------
// PDF helpers — same signatures as the old gcs.ts
// ---------------------------------------------------------------------------

/**
 * Upload a PDF buffer to R2 (or local filesystem in dev).
 * @returns The object key (e.g. "papers/123.pdf")
 */
export async function uploadPdf(
  paperId: number,
  buffer: Buffer,
): Promise<string> {
  const key = `papers/${paperId}.pdf`;

  if (!isWorkers()) {
    if (!existsSync(LOCAL_PDF_DIR))
      await mkdir(LOCAL_PDF_DIR, { recursive: true });
    await writeFile(path.join(LOCAL_PDF_DIR, `${paperId}.pdf`), buffer);
    return key;
  }

  await getBucket().put(key, buffer, {
    httpMetadata: {
      contentType: "application/pdf",
      cacheControl: "private, max-age=3600",
    },
  });
  return key;
}

/**
 * Download a PDF from R2 as a Buffer.
 * Returns null if the object does not exist.
 */
export async function downloadPdf(paperId: number): Promise<Buffer | null> {
  if (!isWorkers()) {
    const filePath = path.join(LOCAL_PDF_DIR, `${paperId}.pdf`);
    if (!existsSync(filePath)) return null;
    try {
      return await readFile(filePath);
    } catch {
      return null;
    }
  }

  const key = `papers/${paperId}.pdf`;
  try {
    const obj = await getBucket().get(key);
    if (!obj) return null;
    const ab = await obj.arrayBuffer();
    return Buffer.from(ab);
  } catch {
    return null;
  }
}

/**
 * Generate a signed URL for direct browser access.
 *
 * R2 Workers bindings don't support presigned URLs (those require the S3-
 * compatible API + credentials). Returning null causes callers to fall through
 * to streaming the object through our own API route, which is simpler and
 * avoids credential management entirely.
 */
export async function getSignedPdfUrl(
  _paperId: number,
  _expiresInMinutes: number = 60,
): Promise<string | null> {
  return null;
}

/**
 * Check if a PDF exists in R2.
 */
export async function pdfExists(paperId: number): Promise<boolean> {
  if (!isWorkers()) {
    return existsSync(path.join(LOCAL_PDF_DIR, `${paperId}.pdf`));
  }

  const key = `papers/${paperId}.pdf`;
  try {
    const head = await getBucket().head(key);
    return head !== null;
  } catch {
    return false;
  }
}

/**
 * Delete a PDF from R2.
 */
export async function deletePdf(paperId: number): Promise<void> {
  if (!isWorkers()) {
    try {
      await unlink(path.join(LOCAL_PDF_DIR, `${paperId}.pdf`));
    } catch {
      // Ignore — file may not exist
    }
    return;
  }

  try {
    await getBucket().delete(`papers/${paperId}.pdf`);
  } catch {
    // Ignore deletion errors
  }
}

// ---------------------------------------------------------------------------
// Recording helpers (used by the recordings upload route)
// ---------------------------------------------------------------------------

/**
 * Upload a recording buffer to R2 (or local filesystem in dev).
 * @returns The object key (e.g. "recordings/<deckId>/<uuid>.webm")
 */
export async function uploadRecording(
  deckId: string,
  recordingId: string,
  buffer: Buffer,
): Promise<string> {
  const key = `recordings/${deckId}/${recordingId}.webm`;

  if (!isWorkers()) {
    const dir = path.join(LOCAL_RECORDING_DIR, deckId);
    if (!existsSync(dir)) await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, `${recordingId}.webm`), buffer);
    return key;
  }

  await getBucket().put(key, buffer, {
    httpMetadata: {
      contentType: "video/webm",
      cacheControl: "private, max-age=3600",
    },
  });
  return key;
}

/**
 * Download a recording from R2 as a Buffer.
 * @param storagePath — the full key, e.g. "recordings/42/abc-def.webm"
 */
export async function downloadRecording(
  storagePath: string,
): Promise<Buffer | null> {
  if (!isWorkers()) {
    const filePath = path.join(
      LOCAL_RECORDING_DIR,
      storagePath.replace("recordings/", ""),
    );
    if (!existsSync(filePath)) return null;
    try {
      return await readFile(filePath);
    } catch {
      return null;
    }
  }

  try {
    const obj = await getBucket().get(storagePath);
    if (!obj) return null;
    const ab = await obj.arrayBuffer();
    return Buffer.from(ab);
  } catch {
    return null;
  }
}

/**
 * Delete a recording from R2.
 * @param storagePath — the full key, e.g. "recordings/42/abc-def.webm"
 */
export async function deleteRecording(storagePath: string): Promise<void> {
  if (!isWorkers()) {
    const filePath = path.join(
      LOCAL_RECORDING_DIR,
      storagePath.replace("recordings/", ""),
    );
    try {
      await unlink(filePath);
    } catch {
      // Ignore
    }
    return;
  }

  try {
    await getBucket().delete(storagePath);
  } catch {
    // Ignore deletion errors
  }
}

// ---------------------------------------------------------------------------
// Audio Overview helpers
// ---------------------------------------------------------------------------

/**
 * Upload an audio overview to R2 (or local filesystem in dev).
 * @returns The storage key (e.g. "audio-overviews/42/abc.mp3")
 */
export async function uploadAudioOverview(
  conversationId: number,
  audioId: string,
  buffer: Buffer,
  extension: string = "mp3",
): Promise<string> {
  const key = `audio-overviews/${conversationId}/${audioId}.${extension}`;

  if (!isWorkers()) {
    const dir = path.join(LOCAL_AUDIO_OVERVIEW_DIR, String(conversationId));
    if (!existsSync(dir)) await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, `${audioId}.${extension}`), buffer);
    return key;
  }

  const mimeTypes: Record<string, string> = {
    mp3: "audio/mpeg",
    wav: "audio/wav",
    opus: "audio/opus",
  };

  await getBucket().put(key, buffer, {
    httpMetadata: {
      contentType: mimeTypes[extension] || "audio/mpeg",
      cacheControl: "private, max-age=86400",
    },
  });
  return key;
}

/**
 * Download an audio overview from R2 as a Buffer.
 * @param storagePath - the full key, e.g. "audio-overviews/42/abc.mp3"
 */
export async function downloadAudioOverview(
  storagePath: string,
): Promise<Buffer | null> {
  if (!isWorkers()) {
    const filePath = path.join(
      LOCAL_AUDIO_OVERVIEW_DIR,
      storagePath.replace("audio-overviews/", ""),
    );
    if (!existsSync(filePath)) return null;
    try {
      return await readFile(filePath);
    } catch {
      return null;
    }
  }

  try {
    const obj = await getBucket().get(storagePath);
    if (!obj) return null;
    const ab = await obj.arrayBuffer();
    return Buffer.from(ab);
  } catch {
    return null;
  }
}

/**
 * Delete an audio overview from R2.
 * @param storagePath - the full key, e.g. "audio-overviews/42/abc.mp3"
 */
export async function deleteAudioOverview(storagePath: string): Promise<void> {
  if (!isWorkers()) {
    const filePath = path.join(
      LOCAL_AUDIO_OVERVIEW_DIR,
      storagePath.replace("audio-overviews/", ""),
    );
    try {
      await unlink(filePath);
    } catch {
      // Ignore
    }
    return;
  }

  try {
    await getBucket().delete(storagePath);
  } catch {
    // Ignore deletion errors
  }
}

// ---------------------------------------------------------------------------
// LaTeX Image helpers (for figure uploads in LaTeX editor)
// ---------------------------------------------------------------------------

const LOCAL_LATEX_IMAGE_DIR = path.join(process.cwd(), ".data", "latex-images");

/** Supported image types for LaTeX figures */
export const LATEX_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg", "application/pdf"] as const;
export type LatexImageType = typeof LATEX_IMAGE_TYPES[number];

/** Metadata for a LaTeX image */
export interface LatexImage {
  id: string;
  projectId: string;
  filename: string;
  contentType: LatexImageType | "application/octet-stream";
  sizeBytes: number;
  storageKey: string;
  createdAt: Date;
}

/**
 * Upload an image for a LaTeX project.
 * @returns The storage key and image metadata
 */
export async function uploadLatexImage(
  projectId: string,
  filename: string,
  buffer: Buffer,
  contentType: LatexImageType,
): Promise<{ storageKey: string; id: string }> {
  const id = crypto.randomUUID();
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storageKey = `latex-images/${projectId}/${id}/${sanitizedFilename}`;

  if (!isWorkers()) {
    const dir = path.join(LOCAL_LATEX_IMAGE_DIR, projectId, id);
    if (!existsSync(dir)) await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, sanitizedFilename), buffer);
    return { storageKey, id };
  }

  await getBucket().put(storageKey, buffer, {
    httpMetadata: {
      contentType,
      cacheControl: "private, max-age=3600",
    },
  });
  return { storageKey, id };
}

/**
 * Download a LaTeX image from R2 as a Buffer.
 */
export async function downloadLatexImage(storageKey: string): Promise<Buffer | null> {
  if (!isWorkers()) {
    const filePath = path.join(LOCAL_LATEX_IMAGE_DIR, storageKey.replace("latex-images/", ""));
    if (!existsSync(filePath)) return null;
    try {
      return await readFile(filePath);
    } catch {
      return null;
    }
  }

  try {
    const obj = await getBucket().get(storageKey);
    if (!obj) return null;
    const ab = await obj.arrayBuffer();
    return Buffer.from(ab);
  } catch {
    return null;
  }
}

/**
 * Delete a LaTeX image from R2.
 */
export async function deleteLatexImage(storageKey: string): Promise<void> {
  if (!isWorkers()) {
    const filePath = path.join(LOCAL_LATEX_IMAGE_DIR, storageKey.replace("latex-images/", ""));
    try {
      // Delete the parent directory (id folder) to clean up fully
      const idDir = path.dirname(filePath);
      await unlink(filePath);
      // Try to remove empty directory
      try {
        await unlink(idDir);
      } catch {
        // Ignore if not empty
      }
    } catch {
      // Ignore
    }
    return;
  }

  try {
    await getBucket().delete(storageKey);
  } catch {
    // Ignore deletion errors
  }
}

/**
 * List all images for a LaTeX project.
 */
export async function listLatexImages(projectId: string): Promise<LatexImage[]> {
  if (!isWorkers()) {
    const projectDir = path.join(LOCAL_LATEX_IMAGE_DIR, projectId);
    if (!existsSync(projectDir)) return [];

    const { readdir, stat } = await import("node:fs/promises");
    const images: LatexImage[] = [];

    try {
      const idDirs = await readdir(projectDir);
      for (const idDir of idDirs) {
        const idPath = path.join(projectDir, idDir);
        const idStat = await stat(idPath);
        if (idStat.isDirectory()) {
          const files = await readdir(idPath);
          for (const file of files) {
            const filePath = path.join(idPath, file);
            const fileStat = await stat(filePath);
            const ext = path.extname(file).toLowerCase();
            const contentType =
              ext === ".pdf"
                ? "application/pdf"
                : ext === ".png"
                  ? "image/png"
                  : ext === ".jpg" || ext === ".jpeg"
                    ? "image/jpeg"
                    : "application/octet-stream";

            images.push({
              id: idDir,
              projectId,
              filename: file,
              contentType,
              sizeBytes: fileStat.size,
              storageKey: `latex-images/${projectId}/${idDir}/${file}`,
              createdAt: fileStat.birthtime,
            });
          }
        }
      }
    } catch {
      // Ignore errors
    }
    return images;
  }

  // R2 doesn't have a native list operation in the basic binding
  // This would require the S3-compatible API with credentials
  // For now, return empty - images will be tracked in DB instead
  return [];
}
