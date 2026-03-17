import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { getArticleJournals } from "@/lib/actions/feeds";

function validateJournalsRequest(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  if ([...searchParams.keys()].length > 0) {
    return NextResponse.json(
      { error: "This endpoint does not accept query parameters" },
      { status: 400 }
    );
  }

  return null;
}

export async function GET(req: Request) {
  try {
    const validationError = validateJournalsRequest(req);
    if (validationError) {
      return validationError;
    }

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
