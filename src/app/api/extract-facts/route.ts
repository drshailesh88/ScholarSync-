import { NextResponse } from "next/server";
import { extractPaperFacts, batchExtractFacts } from "@/lib/actions/extraction";
import { getCurrentUserId } from "@/lib/auth";

export async function POST(req: Request): Promise<Response> {
  try {
    await getCurrentUserId();

    const body = await req.json();
    const { paperId, paperIds, projectId } = body as {
      paperId?: number;
      paperIds?: number[];
      projectId?: number;
    };

    // Batch mode
    if (paperIds && Array.isArray(paperIds)) {
      const result = await batchExtractFacts(paperIds, projectId);
      return NextResponse.json(result);
    }

    // Single paper mode
    if (!paperId || typeof paperId !== "number") {
      return NextResponse.json(
        { error: "paperId (number) is required" },
        { status: 400 }
      );
    }

    const result = await extractPaperFacts(paperId, projectId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Fact extraction error:", error);
    return NextResponse.json(
      {
        error: "Extraction failed",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
