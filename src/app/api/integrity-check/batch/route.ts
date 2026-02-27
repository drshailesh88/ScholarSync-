import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { isAIConfigured } from "@/lib/ai/models";
import { logger } from "@/lib/logger";
import { db } from "@/lib/db";
import { integrityBatches, integrityChecks } from "@/lib/db/schema/editor";
import { eq } from "drizzle-orm";
import { runIntegrityCheck } from "@/lib/integrity";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES_PRO = 30;
const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const PROCESS_TIMEOUT = 60000; // 60 seconds per file

async function extractTextFromPDF(buffer: ArrayBuffer): Promise<string> {
  const mod = await import("pdf-parse");
  const pdfParse = (mod as { default?: typeof mod } & typeof mod).default ?? mod;
  const data = await (pdfParse as unknown as (buf: Buffer) => Promise<{ text: string }>)(Buffer.from(buffer));
  return data.text;
}

async function extractTextFromDOCX(buffer: ArrayBuffer): Promise<string> {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({
    buffer: Buffer.from(buffer),
  });
  return result.value;
}

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return new Response(
        JSON.stringify({ error: "Not authenticated" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const rateLimitResponse = await checkRateLimit(
      userId,
      "integrity-batch",
      RATE_LIMITS.analysis
    );
    if (rateLimitResponse) return rateLimitResponse;

    if (!isAIConfigured()) {
      return new Response(
        JSON.stringify({ error: "AI service is not configured." }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    const formData = await req.formData();
    const batchName =
      (formData.get("name") as string) ??
      `Batch ${new Date().toLocaleDateString()}`;
    const files: File[] = [];

    for (const [key, value] of formData.entries()) {
      if (key === "files" && value instanceof File) {
        files.push(value);
      }
    }

    if (files.length === 0) {
      return new Response(
        JSON.stringify({ error: "No files uploaded" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate file count
    const maxFiles = MAX_FILES_PRO; // TODO: check user plan
    if (files.length > maxFiles) {
      return new Response(
        JSON.stringify({
          error: `Maximum ${maxFiles} files per batch`,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate individual files
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return new Response(
          JSON.stringify({
            error: `File "${file.name}" exceeds 5MB limit`,
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      if (file.size === 0) {
        return new Response(
          JSON.stringify({
            error: `File "${file.name}" is empty`,
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        const ext = file.name.split(".").pop()?.toLowerCase();
        if (ext !== "pdf" && ext !== "docx") {
          return new Response(
            JSON.stringify({
              error: `File "${file.name}" is not a supported format (PDF or DOCX only)`,
            }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }
      }
    }

    // Create batch record
    const [batch] = await db
      .insert(integrityBatches)
      .values({
        userId,
        name: batchName,
        fileCount: files.length,
        completedCount: 0,
        status: "processing",
      })
      .returning();

    // Process files sequentially (to avoid API rate limits)
    // This runs in the request context — for v1, we process inline.
    // In production, this would be moved to a background job queue.
    processFilesInBackground(batch.id, files, userId, log).catch((err) => {
      log.error("Batch processing failed", err);
    });

    return new Response(
      JSON.stringify({
        batchId: batch.id,
        fileCount: files.length,
        status: "processing",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    log.error("Batch upload failed", error);
    return new Response(
      JSON.stringify({ error: "Failed to process batch upload" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

async function processFilesInBackground(
  batchId: number,
  files: File[],
  userId: string,
  log: ReturnType<typeof logger.withRequestId>
) {
  let completedCount = 0;

  for (const file of files) {
    try {
      const buffer = await file.arrayBuffer();
      const ext = file.name.split(".").pop()?.toLowerCase();

      // Extract text with timeout
      let text: string;
      try {
        const extractPromise =
          ext === "pdf"
            ? extractTextFromPDF(buffer)
            : extractTextFromDOCX(buffer);

        text = await Promise.race([
          extractPromise,
          new Promise<string>((_, reject) =>
            setTimeout(
              () => reject(new Error("Text extraction timed out")),
              PROCESS_TIMEOUT
            )
          ),
        ]);
      } catch (extractErr) {
        // Save as failed
        await db.insert(integrityChecks).values({
          userId,
          batchId,
          fileName: file.name,
          contentChecked: "",
          wordCount: 0,
          status: "failed",
          errorMessage:
            extractErr instanceof Error
              ? extractErr.message
              : "Could not extract text from this file (may be scanned/image-based)",
        });
        completedCount++;
        await db
          .update(integrityBatches)
          .set({ completedCount })
          .where(eq(integrityBatches.id, batchId));
        continue;
      }

      // Check for empty text (scanned PDFs)
      if (!text || text.trim().length < 50) {
        await db.insert(integrityChecks).values({
          userId,
          batchId,
          fileName: file.name,
          contentChecked: text || "",
          wordCount: 0,
          status: "failed",
          errorMessage:
            "Could not extract text from this file (may be scanned/image-based)",
        });
        completedCount++;
        await db
          .update(integrityBatches)
          .set({ completedCount })
          .where(eq(integrityBatches.id, batchId));
        continue;
      }

      // Run integrity check with timeout
      try {
        const result = await Promise.race([
          runIntegrityCheck(
            { text, plan: "pro", userId, mode: "full" },
          ),
          new Promise<never>((_, reject) =>
            setTimeout(
              () => reject(new Error("Integrity check timed out")),
              PROCESS_TIMEOUT
            )
          ),
        ]);

        await db.insert(integrityChecks).values({
          userId,
          batchId,
          fileName: file.name,
          contentChecked: text,
          wordCount: text.split(/\s+/).filter(Boolean).length,
          plagiarismScore: result.plagiarism?.similarityScore,
          plagiarismMatches: result.plagiarism?.matches,
          plagiarismEngine: result.plagiarism?.engine,
          aiScore: result.aiDetection.aiScore,
          aiDetectionDetails: result.aiDetection.paragraphs,
          aiDetectionEngine: result.aiDetection.engine,
          citationAuditResults: result.citationAudit,
          flaggedPassages: result.aiDetection.paragraphs
            .filter((p) => p.humanProbability < 40)
            .map((p) => ({
              text: p.excerpt,
              aiProbability: 100 - p.humanProbability,
            })),
          fullResult: result,
          status: "completed",
        });
      } catch (checkErr) {
        await db.insert(integrityChecks).values({
          userId,
          batchId,
          fileName: file.name,
          contentChecked: text,
          wordCount: text.split(/\s+/).filter(Boolean).length,
          status: "failed",
          errorMessage:
            checkErr instanceof Error
              ? checkErr.message
              : "Integrity check failed",
        });
      }

      completedCount++;
      await db
        .update(integrityBatches)
        .set({ completedCount })
        .where(eq(integrityBatches.id, batchId));
    } catch (fileErr) {
      log.error(`Failed to process file ${file.name}`, fileErr);
      completedCount++;
      await db
        .update(integrityBatches)
        .set({ completedCount })
        .where(eq(integrityBatches.id, batchId));
    }
  }

  // Mark batch as completed
  await db
    .update(integrityBatches)
    .set({ status: "completed", completedCount })
    .where(eq(integrityBatches.id, batchId));

  log.info("Batch processing completed", { batchId, completedCount });
}

// GET: Fetch batch status
export async function GET(req: Request) {
  const log = logger.withRequestId();

  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return new Response(
        JSON.stringify({ error: "Not authenticated" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const url = new URL(req.url);
    const batchIdStr = url.searchParams.get("id");

    if (!batchIdStr) {
      return new Response(
        JSON.stringify({ error: "Batch ID required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const batchId = parseInt(batchIdStr, 10);
    if (isNaN(batchId)) {
      return new Response(
        JSON.stringify({ error: "Invalid batch ID" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const [batch] = await db
      .select()
      .from(integrityBatches)
      .where(eq(integrityBatches.id, batchId))
      .limit(1);

    if (!batch || batch.userId !== userId) {
      return new Response(
        JSON.stringify({ error: "Batch not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const checks = await db
      .select({
        id: integrityChecks.id,
        fileName: integrityChecks.fileName,
        wordCount: integrityChecks.wordCount,
        aiScore: integrityChecks.aiScore,
        plagiarismScore: integrityChecks.plagiarismScore,
        status: integrityChecks.status,
        errorMessage: integrityChecks.errorMessage,
        fullResult: integrityChecks.fullResult,
        createdAt: integrityChecks.createdAt,
      })
      .from(integrityChecks)
      .where(eq(integrityChecks.batchId, batchId));

    return new Response(
      JSON.stringify({
        batch: {
          id: batch.id,
          name: batch.name,
          fileCount: batch.fileCount,
          completedCount: batch.completedCount,
          status: batch.status,
          createdAt: batch.createdAt,
        },
        checks,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    log.error("Batch status fetch failed", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch batch status" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
