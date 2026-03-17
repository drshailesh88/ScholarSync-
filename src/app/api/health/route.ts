import { NextResponse } from "next/server";

function validateHealthRequest(req: Request) {
  const { searchParams } = new URL(req.url);
  const details = searchParams.get("details");

  if (details !== null && details !== "true" && details !== "false") {
    return NextResponse.json(
      { error: "Query parameter 'details' must be 'true' or 'false'" },
      { status: 400 }
    );
  }

  if (req.headers.get("x-invalid-request") === "true") {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  return null;
}

export async function GET(req: Request) {
  const validationError = validateHealthRequest(req);
  if (validationError) {
    return validationError;
  }

  try {
    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    );
  }
}
