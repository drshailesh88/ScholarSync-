import { NextResponse } from "next/server";
import { searchClinicalTrials } from "@/lib/search/sources/clinical-trials";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const perPage = parseInt(searchParams.get("perPage") || "20", 10);
  const page = parseInt(searchParams.get("page") || "0", 10);
  const yearStart = searchParams.get("yearStart")
    ? parseInt(searchParams.get("yearStart")!, 10)
    : undefined;
  const yearEnd = searchParams.get("yearEnd")
    ? parseInt(searchParams.get("yearEnd")!, 10)
    : undefined;
  const status = (searchParams.get("status") as "recruiting" | "completed" | "any") || undefined;
  const phase = searchParams.get("phase") || undefined;

  if (!q) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  try {
    const data = await searchClinicalTrials(q, {
      limit: perPage,
      offset: page * perPage,
      yearStart,
      yearEnd,
      status,
      phase,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("ClinicalTrials.gov search error:", error);
    return NextResponse.json(
      { error: "ClinicalTrials.gov search failed" },
      { status: 500 }
    );
  }
}
