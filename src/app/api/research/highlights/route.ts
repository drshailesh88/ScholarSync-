import { NextRequest, NextResponse } from "next/server";

/**
 * CRUD API for PDF highlights and annotations.
 * Handles create, read, update, and delete operations.
 *
 * Note: Currently uses in-memory placeholder until database integration.
 * The Drizzle schema (pdf-annotations.ts) is ready for migration.
 */

// GET — fetch highlights for a paper within a project
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const paperId = searchParams.get("paperId");
  const projectId = searchParams.get("projectId");

  if (!paperId || !projectId) {
    return NextResponse.json(
      { error: "paperId and projectId are required" },
      { status: 400 }
    );
  }

  // TODO: Query from database using Drizzle
  // const results = await db.select().from(pdfHighlights)
  //   .where(and(eq(pdfHighlights.paper_id, paperId), eq(pdfHighlights.project_id, projectId)));

  return NextResponse.json({ highlights: [] });
}

// POST — create a new highlight
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      projectId,
      paperId,
      pageNumber,
      rects,
      selectedText,
      startOffset,
      endOffset,
      color,
      note,
      targetSection,
    } = body;

    if (!paperId || !pageNumber || !selectedText) {
      return NextResponse.json(
        { error: "paperId, pageNumber, and selectedText are required" },
        { status: 400 }
      );
    }

    // TODO: Insert into database using Drizzle
    // await db.insert(pdfHighlights).values({ ... });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Create highlight error:", error);
    return NextResponse.json(
      { error: "Failed to create highlight" },
      { status: 500 }
    );
  }
}

// PATCH — update an existing highlight
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, note, color, targetSection } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Highlight id is required" },
        { status: 400 }
      );
    }

    // TODO: Update in database using Drizzle
    // await db.update(pdfHighlights).set({ note, color, target_section: targetSection, updated_at: new Date() })
    //   .where(eq(pdfHighlights.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update highlight error:", error);
    return NextResponse.json(
      { error: "Failed to update highlight" },
      { status: 500 }
    );
  }
}

// DELETE — remove a highlight
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Highlight id is required" },
      { status: 400 }
    );
  }

  // TODO: Delete from database using Drizzle
  // await db.delete(pdfHighlights).where(eq(pdfHighlights.id, id));

  return NextResponse.json({ success: true });
}
