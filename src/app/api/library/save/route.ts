import { NextRequest, NextResponse } from "next/server";
import { saveWebSource } from "@/lib/actions/web-sources";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await saveWebSource(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save" },
      { status: 500 }
    );
  }
}
