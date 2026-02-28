/**
 * /api/systematic-review/prospero
 *
 * GET  — Return the 22 mandatory PROSPERO fields auto-populated from project data
 * POST — Export fields as plain text (download)
 */

import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import {
  generatePROSPEROFields,
  exportPROSPEROText,
  type PROSPEROField,
} from "@/lib/systematic-review/protocol-builder";
import { verifyProjectAccess } from "@/lib/systematic-review/collaboration";

// ---------------------------------------------------------------------------
// GET — Return auto-populated PROSPERO fields
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

    // Verify project access (owner or collaborator)
    const access = await verifyProjectAccess(projectId, userId);
    if (!access.allowed) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    const fields = await generatePROSPEROFields(projectId);
    return NextResponse.json({ fields });
  } catch (error) {
    console.error("PROSPERO fields error", error);
    return NextResponse.json(
      { error: "Failed to generate PROSPERO fields" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// POST — Export as plain text download
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const { projectId, fields } = body as {
      projectId: number;
      fields: PROSPEROField[];
    };

    if (!projectId || !Array.isArray(fields)) {
      return NextResponse.json(
        { error: "projectId and fields are required" },
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

    const text = exportPROSPEROText(fields);
    return new Response(text, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="prospero-registration-${projectId}.txt"`,
      },
    });
  } catch (error) {
    console.error("PROSPERO export error", error);
    return NextResponse.json(
      { error: "Failed to export PROSPERO fields" },
      { status: 500 }
    );
  }
}
