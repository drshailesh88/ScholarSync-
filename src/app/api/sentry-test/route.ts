import { NextResponse } from "next/server";

// Test route — remove after verifying Sentry works
// Visit /api/sentry-test to trigger a server-side error
export function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  throw new Error("Sentry test: server-side error from API route");
}
