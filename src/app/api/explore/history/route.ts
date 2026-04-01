import { NextRequest, NextResponse } from "next/server";
import {
  getExploreSearchHistory,
  deleteExploreSearchHistory,
  clearAllExploreSearchHistory,
} from "@/lib/actions/explore-search-history";

export async function GET(req: NextRequest) {
  try {
    const limit = Number(req.nextUrl.searchParams.get("limit") ?? "20");
    const entries = await getExploreSearchHistory(limit);
    return NextResponse.json(entries);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load history" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id, clearAll } = await req.json();
    if (clearAll) {
      await clearAllExploreSearchHistory();
    } else if (id !== undefined) {
      await deleteExploreSearchHistory(Number(id));
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete" },
      { status: 500 }
    );
  }
}
