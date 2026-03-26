import { NextResponse } from "next/server";
import { getHashtagSuggestions } from "@/lib/actions/hashtags";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || undefined;

    const hashtags = await getHashtagSuggestions(q);

    return NextResponse.json({ hashtags });
  } catch (error) {
    console.error("Hashtags API error:", error);
    return NextResponse.json({ hashtags: [] }, { status: 500 });
  }
}
