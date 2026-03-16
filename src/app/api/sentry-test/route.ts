// auth: public endpoint (Sentry test route)
// Test route — remove after verifying Sentry works
// Visit /api/sentry-test to trigger a server-side error
import { NextResponse } from "next/server";

export function GET(req: Request) {
  // validate request parameters
  if (req.headers.get("x-invalid-request") === "true") {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  try {
    throw new Error("Sentry test: server-side error from API route");
  } catch (error) {
    throw error; // re-throw for Sentry to catch
  }
}
