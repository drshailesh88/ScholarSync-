import { Storage } from "@google-cloud/storage";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

// For local dev without GCS: fall back to filesystem
const USE_LOCAL_STORAGE = process.env.USE_LOCAL_STORAGE === "true";
const LOCAL_STORAGE_DIR = path.join(process.cwd(), ".data", "pdfs");

const storage = USE_LOCAL_STORAGE
  ? null
  : new Storage({
      projectId: process.env.GCS_PROJECT_ID,
    });

const BUCKET_NAME = process.env.GCS_BUCKET_NAME || "scholarsync-pdfs";
const bucket = USE_LOCAL_STORAGE ? null : storage!.bucket(BUCKET_NAME);

/**
 * Upload a PDF buffer to GCS.
 * @returns The GCS path (e.g., "papers/123.pdf")
 */
export async function uploadPdf(
  paperId: number,
  buffer: Buffer
): Promise<string> {
  const gcsPath = `papers/${paperId}.pdf`;

  if (USE_LOCAL_STORAGE) {
    if (!existsSync(LOCAL_STORAGE_DIR)) {
      await mkdir(LOCAL_STORAGE_DIR, { recursive: true });
    }
    await writeFile(path.join(LOCAL_STORAGE_DIR, `${paperId}.pdf`), buffer);
    return gcsPath;
  }

  const file = bucket!.file(gcsPath);

  await file.save(buffer, {
    contentType: "application/pdf",
    resumable: false, // PDFs are usually < 50MB, simpler without resumable
    metadata: {
      cacheControl: "private, max-age=3600",
    },
  });

  return gcsPath;
}

/**
 * Download a PDF from GCS as a Buffer.
 * Returns null if the file does not exist.
 */
export async function downloadPdf(paperId: number): Promise<Buffer | null> {
  if (USE_LOCAL_STORAGE) {
    const filePath = path.join(LOCAL_STORAGE_DIR, `${paperId}.pdf`);
    if (!existsSync(filePath)) return null;
    try {
      return await readFile(filePath);
    } catch {
      return null;
    }
  }

  const gcsPath = `papers/${paperId}.pdf`;
  const file = bucket!.file(gcsPath);

  try {
    const [exists] = await file.exists();
    if (!exists) return null;

    const [contents] = await file.download();
    return contents;
  } catch {
    return null;
  }
}

/**
 * Generate a signed URL for direct browser access.
 * Expires in 1 hour by default.
 */
export async function getSignedPdfUrl(
  paperId: number,
  expiresInMinutes: number = 60
): Promise<string | null> {
  if (USE_LOCAL_STORAGE) {
    // Local dev: no signed URL, return null to fall through to direct serving
    return null;
  }

  const gcsPath = `papers/${paperId}.pdf`;
  const file = bucket!.file(gcsPath);

  try {
    const [exists] = await file.exists();
    if (!exists) return null;

    const [url] = await file.getSignedUrl({
      version: "v4",
      action: "read",
      expires: Date.now() + expiresInMinutes * 60 * 1000,
      contentType: "application/pdf",
    });

    return url;
  } catch {
    return null;
  }
}

/**
 * Check if a PDF exists in GCS.
 */
export async function pdfExists(paperId: number): Promise<boolean> {
  if (USE_LOCAL_STORAGE) {
    return existsSync(path.join(LOCAL_STORAGE_DIR, `${paperId}.pdf`));
  }

  const gcsPath = `papers/${paperId}.pdf`;
  const file = bucket!.file(gcsPath);

  try {
    const [exists] = await file.exists();
    return exists;
  } catch {
    return false;
  }
}

/**
 * Delete a PDF from GCS.
 */
export async function deletePdf(paperId: number): Promise<void> {
  if (USE_LOCAL_STORAGE) {
    const filePath = path.join(LOCAL_STORAGE_DIR, `${paperId}.pdf`);
    try {
      const { unlink } = await import("node:fs/promises");
      await unlink(filePath);
    } catch {
      // Ignore deletion errors
    }
    return;
  }

  const gcsPath = `papers/${paperId}.pdf`;
  const file = bucket!.file(gcsPath);

  try {
    await file.delete({ ignoreNotFound: true });
  } catch {
    // Ignore deletion errors
  }
}
