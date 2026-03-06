import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { getCuratedFeeds } from "@/lib/actions/feeds";

// GET — Browse curated journals
export async function GET(req: NextRequest) {
  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    void userId;

    const { searchParams } = new URL(req.url);

    const filters: {
      category?: string;
      specialty?: string;
      search?: string;
    } = {};

    const category = searchParams.get("category");
    if (category) filters.category = category;

    const specialty = searchParams.get("specialty");
    if (specialty) filters.specialty = specialty;

    const search = searchParams.get("search");
    if (search) filters.search = search;

    const result = await getCuratedFeeds(filters);
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/feeds/discover error", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
