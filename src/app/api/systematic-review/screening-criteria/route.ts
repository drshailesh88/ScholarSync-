/**
 * /api/systematic-review/screening-criteria
 *
 * GET  — Load saved screening criteria for a project
 * POST — Replace all screening criteria for a project (delete-then-insert)
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { screeningCriteria } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// ---------------------------------------------------------------------------
// GET /api/systematic-review/screening-criteria?projectId=123
// ---------------------------------------------------------------------------
export async function GET(req: Request) {
  try {
    await getCurrentUserId();

    const { searchParams } = new URL(req.url);
    const projectId = parseInt(searchParams.get("projectId") || "0", 10);

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

    const rows = await db
      .select()
      .from(screeningCriteria)
      .where(eq(screeningCriteria.projectId, projectId));

    const criteria = rows.map((r) => ({
      type: r.criterionType as "inclusion" | "exclusion",
      description: r.description,
      category: r.category ?? undefined,
    }));

    return NextResponse.json({ criteria });
  } catch {
    return NextResponse.json(
      { error: "Failed to load screening criteria" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// POST /api/systematic-review/screening-criteria
// ---------------------------------------------------------------------------

const criterionSchema = z.object({
  type: z.enum(["inclusion", "exclusion"]),
  description: z.string().min(1),
  category: z.string().optional(),
});

const postBodySchema = z.object({
  projectId: z.number().int().positive(),
  criteria: z.array(criterionSchema),
});

export async function POST(req: Request) {
  try {
    await getCurrentUserId();

    const body = await req.json();
    const parsed = postBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId, criteria } = parsed.data;

    // Delete-then-insert inside a transaction
    await db.transaction(async (tx) => {
      await tx
        .delete(screeningCriteria)
        .where(eq(screeningCriteria.projectId, projectId));

      if (criteria.length > 0) {
        await tx.insert(screeningCriteria).values(
          criteria.map((c) => ({
            projectId,
            criterionType: c.type as "inclusion" | "exclusion",
            description: c.description,
            category: c.category ?? null,
          }))
        );
      }
    });

    return NextResponse.json({ success: true, count: criteria.length });
  } catch {
    return NextResponse.json(
      { error: "Failed to save screening criteria" },
      { status: 500 }
    );
  }
}
