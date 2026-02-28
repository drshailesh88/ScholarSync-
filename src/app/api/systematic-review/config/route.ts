/**
 * /api/systematic-review/config
 *
 * GET  ?projectId=N  — Fetch SR config for a project
 * POST               — Create new SR config for a project
 * PUT                — Update existing SR config
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects, systematicReviewConfig } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { verifyProjectAccess } from "@/lib/systematic-review/collaboration";

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const createSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().max(2000).optional(),
  researchQuestion: z.string().max(2000).optional(),
  pico: z
    .object({
      population: z.string(),
      intervention: z.string(),
      comparison: z.string(),
      outcome: z.string(),
    })
    .optional(),
});

const updateSchema = z.object({
  projectId: z.number().int().positive(),
  pico: z
    .object({
      population: z.string(),
      intervention: z.string(),
      comparison: z.string(),
      outcome: z.string(),
    })
    .optional(),
  searchStrategy: z.any().optional(),
  searchDatabases: z.array(z.string()).optional(),
  protocolRegistration: z.string().optional(),
  reviewStage: z
    .enum([
      "search_strategy",
      "screening",
      "full_text_screening",
      "data_extraction",
      "risk_of_bias",
      "meta_analysis",
      "reporting",
    ])
    .optional(),
  settings: z.record(z.string(), z.unknown()).optional(),
});

// ---------------------------------------------------------------------------
// GET — Fetch config
// ---------------------------------------------------------------------------

export async function GET(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

    const pid = parseInt(projectId, 10);

    // Verify project access (owner or collaborator)
    const access = await verifyProjectAccess(pid, userId);
    if (!access.allowed) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Fetch project and config
    const [project] = await db
      .select({
        id: projects.id,
        title: projects.title,
        description: projects.description,
        research_question: projects.research_question,
        status: projects.status,
        created_at: projects.created_at,
      })
      .from(projects)
      .where(eq(projects.id, pid))
      .limit(1);

    // Fetch config
    const [config] = await db
      .select()
      .from(systematicReviewConfig)
      .where(eq(systematicReviewConfig.projectId, pid))
      .limit(1);

    return NextResponse.json({
      project: {
        id: project.id,
        title: project.title,
        description: project.description,
        researchQuestion: project.research_question,
        status: project.status,
        createdAt: project.created_at,
      },
      config: config ?? null,
    });
  } catch (error) {
    console.error("SR config fetch error", error);
    return NextResponse.json(
      { error: "Failed to fetch config" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// POST — Create new SR project + config
// ---------------------------------------------------------------------------

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

    const { title, description, researchQuestion, pico } = parsed.data;

    // Create the project
    const [project] = await db
      .insert(projects)
      .values({
        user_id: userId,
        title,
        description: description ?? null,
        research_question: researchQuestion ?? null,
        project_type: "systematic_review",
        status: "planning",
      })
      .returning();

    // Create the SR config
    const [config] = await db
      .insert(systematicReviewConfig)
      .values({
        projectId: project.id,
        pico: pico ?? null,
        searchDatabases: ["pubmed"],
        reviewStage: "search_strategy",
        settings: {},
      })
      .returning();

    return NextResponse.json({ project, config }, { status: 201 });
  } catch (error) {
    console.error("SR config create error", error);
    return NextResponse.json(
      { error: "Failed to create systematic review" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// PUT — Update SR config
// ---------------------------------------------------------------------------

export async function PUT(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId, ...updates } = parsed.data;

    // Verify project access (owner or collaborator)
    const accessResult = await verifyProjectAccess(projectId, userId);
    if (!accessResult.allowed) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Build update object (only include provided fields)
    const updateValues: Record<string, unknown> = { updatedAt: new Date() };
    if (updates.pico !== undefined) updateValues.pico = updates.pico;
    if (updates.searchStrategy !== undefined)
      updateValues.searchStrategy = updates.searchStrategy;
    if (updates.searchDatabases !== undefined)
      updateValues.searchDatabases = updates.searchDatabases;
    if (updates.protocolRegistration !== undefined)
      updateValues.protocolRegistration = updates.protocolRegistration;
    if (updates.reviewStage !== undefined)
      updateValues.reviewStage = updates.reviewStage;
    if (updates.settings !== undefined)
      updateValues.settings = updates.settings;

    const [config] = await db
      .update(systematicReviewConfig)
      .set(updateValues)
      .where(eq(systematicReviewConfig.projectId, projectId))
      .returning();

    return NextResponse.json({ config });
  } catch (error) {
    console.error("SR config update error", error);
    return NextResponse.json(
      { error: "Failed to update config" },
      { status: 500 }
    );
  }
}
