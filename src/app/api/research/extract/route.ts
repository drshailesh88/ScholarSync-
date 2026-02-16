/**
 * POST /api/research/extract
 *
 * AI extraction of structured data from a paper's abstract/full text.
 * Used for both paper detail summaries and evidence table column extraction.
 */

import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { getSmallModel, isAIConfigured } from "@/lib/ai/models";
import {
  buildExtractionPrompt,
  buildColumnExtractionPrompt,
  parseExtractionResponse,
} from "@/lib/research/extraction";

export async function POST(req: NextRequest) {
  try {
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

      const { text } = await generateText({
        model: getSmallModel(),
        system,
        prompt: user,
        temperature: 0.2,
      });

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

      const { text } = await generateText({
        model: getSmallModel(),
        system,
        prompt: user,
        temperature: 0.2,
      });

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
