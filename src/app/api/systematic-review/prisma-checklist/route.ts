/**
 * /api/systematic-review/prisma-checklist
 *
 * POST — Verify manuscript against PRISMA 2020 checklist (all 27 items)
 * GET  — Return the static checklist items (no verification)
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import {
  PRISMA_2020_ITEMS,
  verifyPRISMACompliance,
  exportChecklistCSV,
} from "@/lib/systematic-review/prisma-checklist";
import { verifyProjectAccess } from "@/lib/systematic-review/collaboration";

// ---------------------------------------------------------------------------
// POST — Verify manuscript against checklist
// ---------------------------------------------------------------------------

const verifySchema = z.object({
  projectId: z.number().int().positive(),
  manuscriptText: z.string().min(100).max(200000),
  exportFormat: z.enum(["json", "csv"]).default("json"),
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

    const { projectId, manuscriptText, exportFormat } = parsed.data;

    // Verify project access (owner or collaborator)
    const access = await verifyProjectAccess(projectId, userId);
    if (!access.allowed) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    const result = await verifyPRISMACompliance(manuscriptText);

    if (exportFormat === "csv") {
      const csv = exportChecklistCSV(result);
      return new Response(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition":
            "attachment; filename=prisma-2020-checklist.csv",
        },
      });
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("PRISMA checklist error", error);
    return NextResponse.json(
      { error: "Failed to verify PRISMA compliance" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// GET — Return static checklist items
// ---------------------------------------------------------------------------

export async function GET() {
  return NextResponse.json({ items: PRISMA_2020_ITEMS, totalItems: 27 });
}
