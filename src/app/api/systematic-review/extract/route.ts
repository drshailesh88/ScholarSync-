/**
 * POST /api/systematic-review/extract
 * GET  /api/systematic-review/extract?projectId=123
 *
 * AI-powered structured data extraction from papers.
 * User defines schema → AI extracts from all included papers.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import {
  extractDataFromPaper,
  extractDataFromPaperWithChunks,
  batchExtractData,
  batchExtractDataWithChunks,
  getExtractionTable,
  getPaperChunks,
  type ExtractionField,
} from "@/lib/systematic-review";

const fieldSchema = z.object({
  field: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(["text", "number", "boolean", "select"]),
});

const extractSingleSchema = z.object({
  mode: z.literal("single"),
  schema: z.array(fieldSchema).min(1).max(50),
  title: z.string().min(1),
  textContent: z.string().min(50).max(100000),
});

// New: single paper extraction using full-text chunks for source linking
const extractSingleFulltextSchema = z.object({
  mode: z.literal("single-fulltext"),
  schema: z.array(fieldSchema).min(1).max(50),
  title: z.string().min(1),
  paperId: z.number().int().positive(),
});

const extractBatchSchema = z.object({
  mode: z.literal("batch"),
  projectId: z.number().int().positive(),
  matrixName: z.string().min(1).default("Data Extraction"),
  schema: z.array(fieldSchema).min(1).max(50),
  papers: z
    .array(
      z.object({
        paperId: z.number().int().positive(),
        title: z.string().min(1),
        textContent: z.string().min(50).max(100000),
      })
    )
    .min(1)
    .max(50),
});

// New: batch extraction using full-text chunks
const extractBatchFulltextSchema = z.object({
  mode: z.literal("batch-fulltext"),
  projectId: z.number().int().positive(),
  matrixName: z.string().min(1).default("Data Extraction"),
  schema: z.array(fieldSchema).min(1).max(50),
  papers: z
    .array(
      z.object({
        paperId: z.number().int().positive(),
        title: z.string().min(1),
      })
    )
    .min(1)
    .max(50),
});

const requestSchema = z.discriminatedUnion("mode", [
  extractSingleSchema,
  extractSingleFulltextSchema,
  extractBatchSchema,
  extractBatchFulltextSchema,
]);

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    const userId = await getCurrentUserId();
    const rateLimitResponse = await checkRateLimit(
      userId,
      "systematic-review",
      RATE_LIMITS.ai
    );
    if (rateLimitResponse) return rateLimitResponse;

    const body = await req.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (data.mode === "single") {
      const results = await extractDataFromPaper(
        data.schema as ExtractionField[],
        data.title,
        data.textContent
      );
      return NextResponse.json({ extractions: results });
    }

    if (data.mode === "single-fulltext") {
      const { extractions, chunks } = await extractDataFromPaperWithChunks(
        data.schema as ExtractionField[],
        data.title,
        data.paperId
      );
      return NextResponse.json({ extractions, chunks });
    }

    if (data.mode === "batch-fulltext") {
      const results = await batchExtractDataWithChunks(
        data.projectId,
        data.matrixName,
        data.schema as ExtractionField[],
        data.papers
      );

      return NextResponse.json({
        papers: results,
        summary: {
          totalPapers: results.length,
          totalExtractions: results.reduce(
            (sum, p) => sum + p.extractions.length,
            0
          ),
        },
      });
    }

    // Batch mode (legacy — abstract-only)
    const results = await batchExtractData(
      data.projectId,
      data.matrixName,
      data.schema as ExtractionField[],
      data.papers
    );

    return NextResponse.json({
      papers: results,
      summary: {
        totalPapers: results.length,
        totalExtractions: results.reduce(
          (sum, p) => sum + p.extractions.length,
          0
        ),
      },
    });
  } catch (error) {
    log.error("Data extraction error", error);
    return NextResponse.json(
      { error: "Data extraction failed" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await getCurrentUserId();

    const { searchParams } = new URL(req.url);
    const projectId = parseInt(searchParams.get("projectId") || "0", 10);
    const paperId = parseInt(searchParams.get("paperId") || "0", 10);

    // If paperId is provided, return chunks for that paper
    if (paperId) {
      const chunks = await getPaperChunks(paperId);
      return NextResponse.json({ chunks });
    }

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

    const table = await getExtractionTable(projectId);
    if (!table) {
      return NextResponse.json(
        { error: "No extraction data found" },
        { status: 404 }
      );
    }

    return NextResponse.json(table);
  } catch {
    return NextResponse.json(
      { error: "Failed to get extraction table" },
      { status: 500 }
    );
  }
}
