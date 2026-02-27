/**
 * POST /api/research/extract
 *
 * AI extraction of structured data from a paper's abstract/full text.
 * Used for both paper detail summaries and evidence table column extraction.
 */

import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { getSmallModel, isAIConfigured, traceGeneration } from "@/lib/ai/models";
import {
  buildExtractionPrompt,
  buildColumnExtractionPrompt,
  parseExtractionResponse,
} from "@/lib/research/extraction";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    const rateLimitResponse = await checkRateLimit(userId, "research", RATE_LIMITS.ai);
    if (rateLimitResponse) return rateLimitResponse;

    const body = await req.json();
    const { mode } = body;

    if (!isAIConfigured()) {
      return NextResponse.json(
        { error: "AI not configured. Set an API key." },
        { status: 503 }
      );
    }

    if (mode === "columns") {
      // Evidence table column extraction
      const { title, abstractText, columns } = body;
      if (!title || !abstractText || !columns) {
        return NextResponse.json(
          { error: "Missing required fields: title, abstractText, columns" },
          { status: 400 }
        );
      }

      const { system, user } = buildColumnExtractionPrompt(
        title,
        abstractText,
        columns
      );

      const colTrace = traceGeneration({ tier: "small", modelId: "claude-haiku-4-5-20251001", feature: "research-extract-columns", userId });
      const { text, usage: colUsage } = await generateText({
        model: getSmallModel(),
        system,
        prompt: user,
        temperature: 0.2,
      });
      colTrace.end(colUsage);

      const parsed = parseExtractionResponse(text);
      return NextResponse.json({ extraction: parsed });
    } else {
      // Paper detail extraction (PICO + summary)
      const { title, abstractText, fullText, userQuery } = body;
      if (!title || !abstractText || !userQuery) {
        return NextResponse.json(
          { error: "Missing required fields: title, abstractText, userQuery" },
          { status: 400 }
        );
      }

      const { system, user } = buildExtractionPrompt({
        title,
        abstractText,
        fullText,
        userQuery,
      });

      const detailTrace = traceGeneration({ tier: "small", modelId: "claude-haiku-4-5-20251001", feature: "research-extract-detail", userId });
      const { text, usage: detailUsage } = await generateText({
        model: getSmallModel(),
        system,
        prompt: user,
        temperature: 0.2,
      });
      detailTrace.end(detailUsage);

      const parsed = parseExtractionResponse(text);
      return NextResponse.json({ extraction: parsed });
    }
  } catch (error) {
    console.error("Extraction error:", error);
    return NextResponse.json(
      { error: "Extraction failed" },
      { status: 500 }
    );
  }
}
