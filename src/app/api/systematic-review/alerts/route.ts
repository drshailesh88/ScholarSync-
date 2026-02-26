/**
 * /api/systematic-review/alerts
 *
 * POST   — Create a new search alert
 * GET    — List alerts for a project
 * PUT    — Update alert (pause/resume/change frequency)
 * DELETE — Delete an alert
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import {
  createSearchAlert,
  getProjectAlerts,
  updateAlertFrequency,
  pauseAlert,
  resumeAlert,
  deleteAlert,
  checkAlertForNewPapers,
} from "@/lib/systematic-review/living-review";

// ---------------------------------------------------------------------------
// POST — Create alert
// ---------------------------------------------------------------------------

const createSchema = z.object({
  projectId: z.number().int().positive(),
  searchString: z.string().min(3).max(2000),
  frequency: z.enum(["daily", "weekly", "monthly"]).default("weekly"),
});

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const parsed = createSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId, searchString, frequency } = parsed.data;

    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, projectId), eq(projects.user_id, userId)))
      .limit(1);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const alert = await createSearchAlert({ projectId, searchString, frequency });
    return NextResponse.json({ alert });
  } catch (error) {
    console.error("Create alert error", error);
    return NextResponse.json(
      { error: "Failed to create alert" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// GET — List alerts
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

    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, projectId), eq(projects.user_id, userId)))
      .limit(1);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const alerts = await getProjectAlerts(projectId);
    return NextResponse.json({ alerts });
  } catch (error) {
    console.error("Get alerts error", error);
    return NextResponse.json(
      { error: "Failed to fetch alerts" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// PUT — Update alert
// ---------------------------------------------------------------------------

const updateSchema = z.object({
  alertId: z.number().int().positive(),
  action: z.enum(["pause", "resume", "update_frequency", "check_now"]),
  frequency: z.enum(["daily", "weekly", "monthly"]).optional(),
});

export async function PUT(req: Request) {
  try {
    await getCurrentUserId();
    const body = await req.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { alertId, action, frequency } = parsed.data;

    switch (action) {
      case "pause":
        await pauseAlert(alertId);
        return NextResponse.json({ success: true });

      case "resume":
        await resumeAlert(alertId);
        return NextResponse.json({ success: true });

      case "update_frequency":
        if (!frequency) {
          return NextResponse.json(
            { error: "frequency required for update_frequency" },
            { status: 400 }
          );
        }
        await updateAlertFrequency(alertId, frequency);
        return NextResponse.json({ success: true });

      case "check_now":
        const result = await checkAlertForNewPapers(alertId);
        return NextResponse.json({ result });

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Update alert error", error);
    return NextResponse.json(
      { error: "Failed to update alert" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// DELETE — Delete alert
// ---------------------------------------------------------------------------

export async function DELETE(req: Request) {
  try {
    await getCurrentUserId();
    const { searchParams } = new URL(req.url);
    const alertId = parseInt(searchParams.get("alertId") || "0", 10);

    if (!alertId) {
      return NextResponse.json(
        { error: "alertId is required" },
        { status: 400 }
      );
    }

    await deleteAlert(alertId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete alert error", error);
    return NextResponse.json(
      { error: "Failed to delete alert" },
      { status: 500 }
    );
  }
}
