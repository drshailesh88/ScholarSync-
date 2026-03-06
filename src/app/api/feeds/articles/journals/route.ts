import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { getArticleJournals } from "@/lib/actions/feeds";

export async function GET() {
  try {
    try {
      await getCurrentUserId();
    } catch {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const journals = await getArticleJournals();
    return NextResponse.json({ journals });
  } catch (error) {
    console.error("Get article journals error:", error);
    return NextResponse.json(
      { error: "Failed to get journals" },
      { status: 500 }
    );
  }
}
