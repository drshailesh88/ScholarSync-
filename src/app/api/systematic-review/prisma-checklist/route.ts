/**
 * /api/systematic-review/prisma-checklist
 *
 * POST — Verify manuscript against a PRISMA checklist variant (2020, S, NMA)
 * GET  — Return the static checklist items for a given variant
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import {
  PRISMA_2020_ITEMS,
  PRISMA_S_ITEMS,
  PRISMA_NMA_ITEMS,
  verifyPRISMACompliance,
  verifyPRISMASCompliance,
  verifyPRISMANMACompliance,
  exportChecklistCSV,
  exportPRISMASChecklistCSV,
  exportPRISMANMAChecklistCSV,
} from "@/lib/systematic-review/prisma-checklist";

// ---------------------------------------------------------------------------
// POST — Verify manuscript against checklist
// ---------------------------------------------------------------------------

const verifySchema = z.object({
  projectId: z.number().int().positive(),
  manuscriptText: z.string().min(100).max(200000),
  exportFormat: z.enum(["json", "csv"]).default("json"),
  variant: z.enum(["prisma2020", "prismaS", "prismaNMA"]).default("prisma2020"),
});

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const parsed = verifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId, manuscriptText, exportFormat, variant } = parsed.data;

    // Verify project ownership
    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, projectId), eq(projects.user_id, userId)))
      .limit(1);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    let result;
    switch (variant) {
      case "prismaS":
        result = await verifyPRISMASCompliance(manuscriptText);
        break;
      case "prismaNMA":
        result = await verifyPRISMANMACompliance(manuscriptText);
        break;
      default:
        result = await verifyPRISMACompliance(manuscriptText);
    }

    if (exportFormat === "csv") {
      let csv: string;
      let filename: string;
      switch (variant) {
        case "prismaS":
          csv = exportPRISMASChecklistCSV(result);
          filename = "prisma-s-checklist.csv";
          break;
        case "prismaNMA":
          csv = exportPRISMANMAChecklistCSV(result);
          filename = "prisma-nma-checklist.csv";
          break;
        default:
          csv = exportChecklistCSV(result);
          filename = "prisma-2020-checklist.csv";
      }
      return new Response(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename=${filename}`,
        },
      });
    }

    return NextResponse.json({ result });
  } catch {
    console.error("PRISMA checklist error");
    return NextResponse.json(
      { error: "Failed to verify PRISMA compliance" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// GET — Return static checklist items
// ---------------------------------------------------------------------------

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const variant = searchParams.get("variant") || "prisma2020";

  switch (variant) {
    case "prismaS":
      return NextResponse.json({ items: PRISMA_S_ITEMS, totalItems: PRISMA_S_ITEMS.length });
    case "prismaNMA":
      return NextResponse.json({ items: PRISMA_NMA_ITEMS, totalItems: PRISMA_NMA_ITEMS.length });
    default:
      return NextResponse.json({ items: PRISMA_2020_ITEMS, totalItems: 27 });
  }
}
