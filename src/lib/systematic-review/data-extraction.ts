/**
 * AI-Powered Data Extraction Pipeline
 *
 * Replicates Scholara/Silvi's extraction approach:
 * - User defines extraction schema (columns + descriptions)
 * - AI extracts values from paper text
 * - Every extraction linked to source quote
 * - Results populate a structured data table
 */

import { generateObject } from "ai";
import { getModel } from "@/lib/ai/models";
import { getDataExtractionPrompt } from "@/lib/ai/prompts/systematic-review";
import { db } from "@/lib/db";
import {
  comparisonMatrices,
  matrixColumns,
  matrixCells,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ExtractionField {
  field: string;
  description: string;
  type: "text" | "number" | "boolean" | "select";
}

export interface ExtractionResult {
  field: string;
  value: string | null;
  sourceQuote: string;
  confidence: number;
}

export interface PaperExtraction {
  paperId: number;
  title: string;
  extractions: ExtractionResult[];
}

// ---------------------------------------------------------------------------
// Schema for AI output
// ---------------------------------------------------------------------------

const extractionOutputSchema = z.object({
  extractions: z.array(
    z.object({
      field: z.string(),
      value: z.string().nullable(),
      sourceQuote: z.string(),
      confidence: z.number().min(0).max(1),
    })
  ),
});

// ---------------------------------------------------------------------------
// Extract data from a single paper
// ---------------------------------------------------------------------------

export async function extractDataFromPaper(
  schema: ExtractionField[],
  title: string,
  textContent: string
): Promise<ExtractionResult[]> {
  const prompt = getDataExtractionPrompt(schema, title, textContent);

  const { object } = await generateObject({
    model: getModel(),
    schema: extractionOutputSchema,
    prompt,
  });

  return object.extractions;
}

// ---------------------------------------------------------------------------
// Create or get extraction matrix for a project
// ---------------------------------------------------------------------------

export async function getOrCreateMatrix(
  projectId: number,
  name: string,
  schema: ExtractionField[]
): Promise<number> {
  // Check if matrix exists
  const existing = await db
    .select()
    .from(comparisonMatrices)
    .where(eq(comparisonMatrices.projectId, projectId))
    .limit(1);

  let matrixId: number;

  if (existing.length > 0) {
    matrixId = existing[0].id;
  } else {
    const [created] = await db
      .insert(comparisonMatrices)
      .values({ projectId, name })
      .returning({ id: comparisonMatrices.id });
    matrixId = created.id;

    // Create columns from schema
    for (let i = 0; i < schema.length; i++) {
      await db.insert(matrixColumns).values({
        matrixId,
        name: schema[i].field,
        sortOrder: i,
        columnType: schema[i].type,
      });
    }
  }

  return matrixId;
}

// ---------------------------------------------------------------------------
// Save extraction results to matrix
// ---------------------------------------------------------------------------

export async function saveExtractionToMatrix(
  matrixId: number,
  paperId: number,
  results: ExtractionResult[]
) {
  // Get columns for this matrix
  const columns = await db
    .select()
    .from(matrixColumns)
    .where(eq(matrixColumns.matrixId, matrixId));

  const columnMap = new Map(columns.map((c: typeof columns[number]) => [c.name, c.id]));

  for (const result of results) {
    const columnId = columnMap.get(result.field);
    if (!columnId || result.value === null) continue;

    await db
      .insert(matrixCells)
      .values({
        matrixId,
        columnId,
        paperId,
        value: result.value,
        source: "ai_extracted",
      })
      .onConflictDoUpdate({
        target: [matrixCells.matrixId, matrixCells.columnId, matrixCells.paperId],
        set: {
          value: result.value,
          source: "ai_extracted",
        },
      });
  }
}

// ---------------------------------------------------------------------------
// Batch extract data from multiple papers
// ---------------------------------------------------------------------------

export async function batchExtractData(
  projectId: number,
  matrixName: string,
  schema: ExtractionField[],
  papers: Array<{
    paperId: number;
    title: string;
    textContent: string;
  }>,
  onProgress?: (completed: number, total: number) => void
): Promise<PaperExtraction[]> {
  const matrixId = await getOrCreateMatrix(projectId, matrixName, schema);
  const results: PaperExtraction[] = [];

  for (let i = 0; i < papers.length; i++) {
    const paper = papers[i];
    const extractions = await extractDataFromPaper(
      schema,
      paper.title,
      paper.textContent
    );

    await saveExtractionToMatrix(matrixId, paper.paperId, extractions);

    results.push({
      paperId: paper.paperId,
      title: paper.title,
      extractions,
    });

    onProgress?.(i + 1, papers.length);
  }

  return results;
}

// ---------------------------------------------------------------------------
// Get extraction table for a project
// ---------------------------------------------------------------------------

export async function getExtractionTable(projectId: number) {
  const matrices = await db
    .select()
    .from(comparisonMatrices)
    .where(eq(comparisonMatrices.projectId, projectId));

  if (matrices.length === 0) return null;

  const matrix = matrices[0];

  const columns = await db
    .select()
    .from(matrixColumns)
    .where(eq(matrixColumns.matrixId, matrix.id));

  const cells = await db
    .select()
    .from(matrixCells)
    .where(eq(matrixCells.matrixId, matrix.id));

  // Group cells by paper
  const cellsByPaper = new Map<number, Map<number, string>>();
  for (const cell of cells) {
    if (!cellsByPaper.has(cell.paperId)) {
      cellsByPaper.set(cell.paperId, new Map());
    }
    cellsByPaper.get(cell.paperId)!.set(cell.columnId, cell.value ?? "");
  }

  return {
    matrixId: matrix.id,
    name: matrix.name,
    columns: columns.map((c: typeof columns[number]) => ({
      id: c.id,
      name: c.name,
      type: c.columnType,
      sortOrder: c.sortOrder,
    })),
    rows: Array.from(cellsByPaper.entries()).map(([paperId, cells]) => ({
      paperId,
      values: columns.map((col: typeof columns[number]) => ({
        columnId: col.id,
        columnName: col.name,
        value: cells.get(col.id) ?? null,
      })),
    })),
  };
}
