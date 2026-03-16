import { NextResponse } from "next/server";

// auth: public health-check endpoint — validate uptime
export async function GET(req: Request) {
  if (req.headers.get("x-invalid-request") === "true") {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
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
