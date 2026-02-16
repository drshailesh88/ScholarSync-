/**
 * POST /api/research/evidence-table
 *
 * Batch extraction for evidence table columns across multiple papers.
 * Returns extraction results for each paper.
 */

import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { getSmallModel, isAIConfigured } from "@/lib/ai/models";
import { buildColumnExtractionPrompt, parseExtractionResponse } from "@/lib/research/extraction";

interface ExtractionPaper {
  id: string;
  title: string;
  abstract: string;
}

interface ExtractionColumn {
  id: string;
  name: string;
  extractionInstructions: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { papers, columns } = body as {
      papers: ExtractionPaper[];
      columns: ExtractionColumn[];
    };

    if (!papers?.length || !columns?.length) {
      return NextResponse.json(
        { error: "Missing required fields: papers, columns" },
        { status: 400 }
      );
    }

    if (!isAIConfigured()) {
      return NextResponse.json(
        { error: "AI not configured" },
        { status: 503 }
      );
    }

    // Process papers in batches of 3 concurrent
    const BATCH_SIZE = 3;
    const results: Record<
      string,
      Record<string, { value: string; sourceQuote: string; confidence: string }>
    > = {};

    for (let i = 0; i < papers.length; i += BATCH_SIZE) {
      const batch = papers.slice(i, i + BATCH_SIZE);
      const batchPromises = batch.map(async (paper) => {
        try {
          const { system, user } = buildColumnExtractionPrompt(
            paper.title,
            paper.abstract,
            columns.map((c) => ({
              name: c.name,
              extractionInstructions: c.extractionInstructions,
            }))
          );

          const { text } = await generateText({
            model: getSmallModel(),
            system,
            prompt: user,
            temperature: 0.2,
          });

          const parsed = parseExtractionResponse(text);
          const cells: Record<
            string,
            { value: string; sourceQuote: string; confidence: string }
          > = {};

          if (parsed?.extractions) {
            for (const extraction of parsed.extractions) {
              const col = columns.find((c) => c.name === extraction.column);
              if (col) {
                cells[col.id] = {
                  value: extraction.value || "Not stated",
                  sourceQuote: extraction.sourceQuote || "",
                  confidence: extraction.confidence || "medium",
                };
              }
            }
          }

          // Fill in missing columns
          for (const col of columns) {
            if (!cells[col.id]) {
              cells[col.id] = {
                value: "Not stated",
                sourceQuote: "",
                confidence: "low",
              };
            }
          }

          return { paperId: paper.id, cells };
        } catch (error) {
          console.error(`Extraction failed for paper ${paper.id}:`, error);
          const fallbackCells: Record<
            string,
            { value: string; sourceQuote: string; confidence: string }
          > = {};
          for (const col of columns) {
            fallbackCells[col.id] = {
              value: "Extraction failed",
              sourceQuote: "",
              confidence: "low",
            };
          }
          return { paperId: paper.id, cells: fallbackCells };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      for (const { paperId, cells } of batchResults) {
        results[paperId] = cells;
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Evidence table extraction error:", error);
    return NextResponse.json(
      { error: "Extraction failed" },
      { status: 500 }
    );
  }
}
