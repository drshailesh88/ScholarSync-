import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { embedPaperChunks } from "@/lib/actions/embeddings";

const embedRequestSchema = z.object({
  paperId: z.number().int().positive(),
});

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();

    const rateLimitResponse = await checkRateLimit(userId, "embed", RATE_LIMITS.embed);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await req.json();
    const parsed = embedRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: parsed.error.issues },
        { status: 400 },
      );
    }

    const { paperId } = parsed.data;

    const result = await embedPaperChunks(paperId);
    return NextResponse.json(result);
  } catch (error) {
    logger.error("Embedding error", error);
    return NextResponse.json(
      { error: "Failed to embed paper" },
      { status: 500 },
    );
  }
}
