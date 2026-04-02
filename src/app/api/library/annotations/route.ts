import { NextRequest, NextResponse } from "next/server";
import {
  getAnnotations,
  createHighlight,
  createSourceNote,
  updateAnnotation,
  deleteAnnotation,
} from "@/lib/library/annotations";

function isInvalidLibraryId(error: unknown): boolean {
  return error instanceof Error && error.message.startsWith("Invalid libraryId");
}

function isNotFound(error: unknown): boolean {
  return error instanceof Error && error.message.includes("not found");
}

export async function GET(req: NextRequest) {
  try {
    const libraryId = req.nextUrl.searchParams.get("libraryId");
    if (!libraryId) {
      return NextResponse.json({ error: "libraryId is required" }, { status: 400 });
    }
    const annotations = await getAnnotations(libraryId);
    return NextResponse.json(annotations);
  } catch (error) {
    if (isInvalidLibraryId(error)) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch annotations" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, ...rest } = body;

    if (type === "highlight") {
      const annotation = await createHighlight(rest);
      return NextResponse.json(annotation, { status: 201 });
    } else if (type === "note") {
      const annotation = await createSourceNote(rest);
      return NextResponse.json(annotation, { status: 201 });
    }

    return NextResponse.json({ error: "Invalid type. Use 'highlight' or 'note'." }, { status: 400 });
  } catch (error) {
    if (isInvalidLibraryId(error)) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create annotation" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    if (typeof body.id !== "number" || !Number.isFinite(body.id)) {
      return NextResponse.json({ error: "id is required and must be a number" }, { status: 400 });
    }
    const annotation = await updateAnnotation(body);
    return NextResponse.json(annotation);
  } catch (error) {
    if (isNotFound(error)) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update annotation" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id || !/^\d+$/.test(id)) {
      return NextResponse.json({ error: "id is required and must be a numeric integer" }, { status: 400 });
    }
    await deleteAnnotation(parseInt(id, 10));
    return NextResponse.json({ success: true });
  } catch (error) {
    if (isNotFound(error)) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete annotation" },
      { status: 500 }
    );
  }
}
