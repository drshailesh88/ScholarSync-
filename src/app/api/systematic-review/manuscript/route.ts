/**
 * /api/systematic-review/manuscript
 *
 * POST — Generate a manuscript section (introduction, methods, results, discussion, abstract)
 * GET  — Export full manuscript draft as markdown
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import {
  generateManuscriptSection,
  exportManuscriptDraft,
  type ManuscriptSection,
  type ManuscriptSectionOutput,
} from "@/lib/systematic-review/manuscript-generator";
import { verifyProjectAccess } from "@/lib/systematic-review/collaboration";

// ---------------------------------------------------------------------------
// POST — Generate a manuscript section
// ---------------------------------------------------------------------------

const generateSchema = z.object({
  projectId: z.number().int().positive(),
  section: z.enum([
    "introduction",
    "methods",
    "results",
    "discussion",
    "abstract",
  ]),
  customInstructions: z.string().max(5000).optional(),
  existingSections: z
    .record(z.string(), z.string())
    .optional(),
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

    const { projectId, section, customInstructions, existingSections } =
      parsed.data;

    // Verify project access (owner or collaborator)
    const access = await verifyProjectAccess(projectId, userId);
    if (!access.allowed) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    const result = await generateManuscriptSection(
      projectId,
      section as ManuscriptSection,
      { customInstructions, existingSections }
    );

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Manuscript generation error", error);
    return NextResponse.json(
      { error: "Failed to generate manuscript section" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// GET — Export full manuscript draft as markdown
// ---------------------------------------------------------------------------

export async function GET(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(req.url);
    const projectId = parseInt(searchParams.get("projectId") || "0", 10);
    const format = searchParams.get("format") || "markdown";
    const sectionsJson = searchParams.get("sections");

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

    // Verify project access (owner or collaborator)
    const accessCheck = await verifyProjectAccess(projectId, userId);
    if (!accessCheck.allowed) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    if (!sectionsJson) {
      return NextResponse.json(
        { error: "sections data required" },
        { status: 400 }
      );
    }

    const sections: ManuscriptSectionOutput[] = JSON.parse(
      decodeURIComponent(sectionsJson)
    );

    if (format === "markdown") {
      const markdown = exportManuscriptDraft(sections);
      return new Response(markdown, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Content-Disposition":
            "attachment; filename=manuscript-draft.md",
        },
      });
    }

    // Default: return JSON
    return NextResponse.json({
      markdown: exportManuscriptDraft(sections),
    });
  } catch (error) {
    console.error("Manuscript export error", error);
    return NextResponse.json(
      { error: "Failed to export manuscript" },
      { status: 500 }
    );
  }
}
