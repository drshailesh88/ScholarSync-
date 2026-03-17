import { NextResponse } from "next/server";

function validateSentryTestRequest(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode");

  if (mode !== null && mode !== "throw") {
    return NextResponse.json(
      { error: "Query parameter 'mode' must be 'throw'" },
      { status: 400 }
    );
  }

  if (req.headers.get("x-invalid-request") === "true") {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  return null;
}

export function GET(req: Request) {
  const validationError = validateSentryTestRequest(req);
  if (validationError) {
    return validationError;
  }

  throw new Error("Sentry test: server-side error from API route");
}
