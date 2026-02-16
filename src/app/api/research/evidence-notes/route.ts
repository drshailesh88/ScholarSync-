import { NextRequest, NextResponse } from "next/server";

/**
 * CRUD API for evidence notes created from PDF reading.
 * Evidence notes are tagged with target sections for structured writing.
 *
 * Note: Currently uses placeholder responses until database integration.
 * The Drizzle schema (pdf-annotations.ts) is ready for migration.
 */

// GET — fetch evidence notes for a project, optionally filtered by paper
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");
  const paperId = searchParams.get("paperId");
  const targetSection = searchParams.get("targetSection");

  if (!projectId) {
    return NextResponse.json(
      { error: "projectId is required" },
      { status: 400 }
    );
  }

  // TODO: Query from database using Drizzle
  // let query = db.select().from(evidenceNotes)
  //   .where(eq(evidenceNotes.project_id, projectId));
  // if (paperId) query = query.where(eq(evidenceNotes.paper_id, paperId));
  // if (targetSection) query = query.where(eq(evidenceNotes.target_section, targetSection));

  return NextResponse.json({ notes: [] });
}

// POST — create a new evidence note
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      projectId,
      paperId,
      pageNumber,
      startOffset,
      endOffset,
      quotedText,
      userNote,
      targetSection,
      color,
    } = body;

    if (!paperId || !pageNumber || !quotedText || !targetSection) {
      return NextResponse.json(
        {
          error:
            "paperId, pageNumber, quotedText, and targetSection are required",
        },
        { status: 400 }
      );
    }

    // TODO: Insert into database using Drizzle
    // await db.insert(evidenceNotes).values({ ... });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Create evidence note error:", error);
    return NextResponse.json(
      { error: "Failed to create evidence note" },
      { status: 500 }
    );
  }
}

// DELETE — remove an evidence note
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Note id is required" },
      { status: 400 }
    );
  }

  // TODO: Delete from database using Drizzle
  // await db.delete(evidenceNotes).where(eq(evidenceNotes.id, id));

  return NextResponse.json({ success: true });
}
