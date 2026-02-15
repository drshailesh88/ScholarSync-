import { NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

interface PdfExtractionResult {
  text: string;
  pages: number;
  info: {
    title?: string;
    author?: string;
  };
}

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    // --- Authentication ---
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // --- Rate limiting ---
    const rateLimitResponse = await checkRateLimit(userId, "extract-pdf", RATE_LIMITS.ai);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // --- File validation ---
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
        { error: "No PDF file provided. Include a 'file' field in the form data." },
        { status: 400 }
      );
    }

    if (!file.type.includes("pdf") && !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Uploaded file must be a PDF" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `File size exceeds the 20MB limit. Uploaded file is ${(file.size / (1024 * 1024)).toFixed(1)}MB.`,
        },
        { status: 413 }
      );
    }

    // --- PDF extraction ---
    const arrayBuffer = await file.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);

    const parser = new PDFParse({ data });

    const [textResult, infoResult] = await Promise.all([
      parser.getText(),
      parser.getInfo(),
    ]);

    const result: PdfExtractionResult = {
      text: textResult.text,
      pages: textResult.total,
      info: {
        title: infoResult.info?.Title || undefined,
        author: infoResult.info?.Author || undefined,
      },
    };

    await parser.destroy();

    return NextResponse.json(result);
  } catch (error) {
    log.error("PDF extraction error", error, { endpoint: "extract-pdf" });

    return NextResponse.json(
      { error: "Failed to extract text from PDF" },
      { status: 500 }
    );
  }
}
