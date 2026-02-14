import { NextResponse } from "next/server";
import { searchOpenAlex } from "@/lib/search/sources/openalex";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const yearStart = searchParams.get("yearStart")
    ? parseInt(searchParams.get("yearStart")!, 10)
    : undefined;
  const yearEnd = searchParams.get("yearEnd")
    ? parseInt(searchParams.get("yearEnd")!, 10)
    : undefined;
  const onlyOpenAccess = searchParams.get("openAccessOnly") === "true";

  if (!q) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  try {
    const data = await searchOpenAlex(q, {
      limit,
      page,
      yearStart,
      yearEnd,
      onlyOpenAccess,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("OpenAlex search error:", error);
    return NextResponse.json(
      { error: "OpenAlex search failed" },
      { status: 500 }
    );
  }
}
