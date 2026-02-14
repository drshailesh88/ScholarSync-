import { NextResponse } from "next/server";

const DOCLING_URL = process.env.DOCLING_SERVICE_URL || "http://localhost:8001";
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB for Docling (vs 20MB for pdf-parse)

interface DoclingParseResult {
  markdown: string;
  tables: Array<{
    index: number;
    data: Record<string, unknown>[];
    columns: string[];
    rows: number;
    caption: string | null;
  }>;
  sections: Array<{
    text: string;
    type: string;
    label: string;
  }>;
  metadata: {
    page_count: number | null;
    title: string | null;
  };
}

interface DoclingChunkResult {
  chunks: Array<{
    chunk_index: number;
    text: string;
    section_type: string;
    word_count: number;
  }>;
  total_chunks: number;
  sections_detected: string[];
}

export async function POST(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url);
    const mode = url.searchParams.get("mode") || "parse"; // "parse" or "chunk"

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Content-Type must be multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No PDF file provided" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Max ${MAX_FILE_SIZE / (1024 * 1024)}MB.` },
        { status: 413 }
      );
    }

    // Forward to Docling service
    const doclingForm = new FormData();
    doclingForm.append("file", file);

    const endpoint = mode === "chunk" ? "/chunk" : "/parse";

    const response = await fetch(`${DOCLING_URL}${endpoint}`, {
      method: "POST",
      body: doclingForm,
      signal: AbortSignal.timeout(120_000), // 2 minute timeout for large PDFs
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Docling service error" }));
      console.error("Docling service error:", error);

      // Return error — caller can fall back to basic extraction
      return NextResponse.json(
        {
          error: "Advanced PDF extraction failed",
          detail: (error as { detail?: string }).detail || "Docling service unavailable",
          fallback: true, // Signal that caller should try /api/extract-pdf instead
        },
        { status: 502 }
      );
    }

    const result: DoclingParseResult | DoclingChunkResult = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Advanced PDF extraction error:", error);

    const isTimeout = error instanceof DOMException && error.name === "TimeoutError";
    const isConnectionRefused =
      error instanceof TypeError && String(error.message).includes("fetch failed");

    if (isTimeout) {
      return NextResponse.json(
        { error: "PDF extraction timed out", fallback: true },
        { status: 504 }
      );
    }

    if (isConnectionRefused) {
      return NextResponse.json(
        {
          error: "Docling service not running",
          detail: `Could not connect to ${DOCLING_URL}. Start with: cd services/docling && pip install -r requirements.txt && uvicorn app:app --port 8001`,
          fallback: true,
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to extract PDF" },
      { status: 500 }
    );
  }
}
