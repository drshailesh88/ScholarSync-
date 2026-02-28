/**
 * /api/systematic-review/protocol
 *
 * POST — Generate protocol from project data
 * GET  — Export protocol in various formats
 * PUT  — Save PROSPERO ID to config
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects, systematicReviewConfig } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  generateProtocol,
  loadProjectDataForProtocol,
  exportProtocolText,
  exportProtocolHTML,
  type ProtocolInput,
} from "@/lib/systematic-review/protocol-builder";
import { verifyProjectAccess } from "@/lib/systematic-review/collaboration";

// ---------------------------------------------------------------------------
// POST — Generate protocol
// ---------------------------------------------------------------------------

const generateSchema = z.object({
  projectId: z.number().int().positive(),
  additionalContext: z.string().max(5000).optional(),
});

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const parsed = generateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId, additionalContext } = parsed.data;

    // Verify project access (owner or collaborator)
    const access = await verifyProjectAccess(projectId, userId);
    if (!access.allowed) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Load project data
    const [project] = await db
      .select({ id: projects.id, title: projects.title })
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1);

    const input: ProtocolInput = await loadProjectDataForProtocol(projectId);
    input.projectTitle = project?.title ?? "";
    if (additionalContext) input.additionalContext = additionalContext;

    // Generate protocol
    const protocol = await generateProtocol(input);

    return NextResponse.json({ protocol });
  } catch (error) {
    console.error("Protocol generation error", error);
    return NextResponse.json(
      { error: "Failed to generate protocol" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// GET — Export protocol
// ---------------------------------------------------------------------------

export async function GET(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(req.url);
    const projectId = parseInt(searchParams.get("projectId") || "0", 10);
    const format = searchParams.get("format") || "json";
    const protocolJson = searchParams.get("protocol");

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

    // Verify project access (owner or collaborator)
    const access = await verifyProjectAccess(projectId, userId);
    if (!access.allowed) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    if (!protocolJson) {
      return NextResponse.json(
        { error: "protocol data required" },
        { status: 400 }
      );
    }

    const protocol = JSON.parse(decodeURIComponent(protocolJson));

    switch (format) {
      case "text": {
        const text = exportProtocolText(protocol);
        return new Response(text, {
          headers: {
            "Content-Type": "text/plain",
            "Content-Disposition":
              "attachment; filename=protocol.txt",
          },
        });
      }
      case "html": {
        const html = exportProtocolHTML(protocol);
        return new Response(html, {
          headers: {
            "Content-Type": "text/html",
            "Content-Disposition":
              "attachment; filename=protocol.html",
          },
        });
      }
      default:
        return NextResponse.json({ protocol });
    }
  } catch (error) {
    console.error("Protocol export error", error);
    return NextResponse.json(
      { error: "Failed to export protocol" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// PUT — Save PROSPERO ID
// ---------------------------------------------------------------------------

const prosperoSchema = z.object({
  projectId: z.number().int().positive(),
  prosperoId: z.string().max(50),
});

export async function PUT(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const parsed = prosperoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId, prosperoId } = parsed.data;

    // Verify project access (owner or collaborator)
    const access = await verifyProjectAccess(projectId, userId);
    if (!access.allowed) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    await db
      .update(systematicReviewConfig)
      .set({
        protocolRegistration: prosperoId,
        updatedAt: new Date(),
      })
      .where(eq(systematicReviewConfig.projectId, projectId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PROSPERO ID save error", error);
    return NextResponse.json(
      { error: "Failed to save PROSPERO ID" },
      { status: 500 }
    );
  }
}
