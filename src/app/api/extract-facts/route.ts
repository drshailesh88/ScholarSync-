import { NextResponse } from "next/server";
import { z } from "zod";
import { extractPaperFacts, batchExtractFacts } from "@/lib/actions/extraction";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const extractFactsSchema = z.object({
  paperId: z.number().optional(),
  paperIds: z.array(z.number()).max(50).optional(),
  projectId: z.number().optional(),
});

export async function POST(req: Request): Promise<Response> {
  try {
    const userId = await getCurrentUserId();

    const rateLimitResponse = await checkRateLimit(
      userId,
      "extract-facts",
      RATE_LIMITS.ai
    );
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await req.json();
    const parsed = extractFactsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const { paperId, paperIds, projectId } = parsed.data;

    // Batch mode
    if (paperIds && paperIds.length > 0) {
      const result = await batchExtractFacts(paperIds, projectId);
      return NextResponse.json(result);
    }

    // Single paper mode
    if (!paperId) {
      return NextResponse.json(
        { error: "paperId (number) is required" },
        { status: 400 }
      );
    }

    const result = await extractPaperFacts(paperId, projectId);
    return NextResponse.json(result);
  } catch (error) {
    logger.error("Fact extraction error:", error);
    return NextResponse.json(
      { error: "Extraction failed" },
      { status: 500 }
    );
  }
}
