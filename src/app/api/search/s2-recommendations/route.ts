import { NextResponse } from "next/server";
import {
  getRecommendationsForPaper,
  getRecommendationsFromList,
} from "@/lib/search/sources/s2-recommendations";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const paperId = searchParams.get("paperId");
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  if (!paperId) {
    return NextResponse.json(
      { error: "Query parameter 'paperId' is required" },
      { status: 400 }
    );
  }

  try {
    const results = await getRecommendationsForPaper(paperId, limit);
    return NextResponse.json({ results });
  } catch (error) {
    console.error("S2 recommendations error:", error);
    return NextResponse.json(
      { error: "S2 recommendations failed" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      positivePaperIds,
      negativePaperIds = [],
      limit = 10,
    }: {
      positivePaperIds: string[];
      negativePaperIds?: string[];
      limit?: number;
    } = body;

    if (!positivePaperIds || positivePaperIds.length === 0) {
      return NextResponse.json(
        { error: "positivePaperIds is required" },
        { status: 400 }
      );
    }

    const results = await getRecommendationsFromList(
      positivePaperIds,
      negativePaperIds,
      limit
    );
    return NextResponse.json({ results });
  } catch (error) {
    console.error("S2 recommendations error:", error);
    return NextResponse.json(
      { error: "S2 recommendations failed" },
      { status: 500 }
    );
  }
}
