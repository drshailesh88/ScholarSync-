/**
 * /api/systematic-review/snowball
 *
 * POST — Run citation snowballing from seed papers
 * GET  — Retrieve snowball sessions and citation network
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import {
  runSnowballing,
  getSnowballSessions,
  getProjectCitationNetwork,
} from "@/lib/systematic-review/snowballing";

// ---------------------------------------------------------------------------
// POST — Run snowballing
// ---------------------------------------------------------------------------

const snowballSchema = z.object({
  projectId: z.number().int().positive(),
  seedPaperIds: z.array(z.number().int().positive()).min(1).max(20),
  direction: z.enum(["forward", "backward", "both"]).default("both"),
  depth: z.number().int().min(1).max(2).default(1),
});

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const parsed = snowballSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId, seedPaperIds, direction, depth } = parsed.data;

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

    const result = await runSnowballing(
      projectId,
      seedPaperIds,
      direction,
      depth
    );

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Snowball error", error);
    return NextResponse.json(
      { error: "Failed to run snowballing" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// GET — Retrieve sessions and citation network
// ---------------------------------------------------------------------------

export async function GET(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(req.url);
    const projectId = parseInt(searchParams.get("projectId") || "0", 10);

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

    // Verify ownership
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

    const [sessions, network] = await Promise.all([
      getSnowballSessions(projectId),
      getProjectCitationNetwork(projectId),
    ]);

    return NextResponse.json({ sessions, network });
  } catch (error) {
    console.error("Snowball fetch error", error);
    return NextResponse.json(
      { error: "Failed to fetch snowball data" },
      { status: 500 }
    );
  }
}
