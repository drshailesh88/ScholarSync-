// /api/cron/fetch-feeds
//
// Cron job — fetches all due RSS/Atom feeds and stores new articles.
// Schedule: every 15 minutes

import { NextResponse } from "next/server";
import { fetchDueFeeds } from "@/lib/feeds/feed-fetcher";

function validateCronRequest(req: Request) {
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
  const validationError = validateCronRequest(req);
  if (validationError) {
    return validationError;
  }

  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const results = await fetchDueFeeds();

    return NextResponse.json({
      feedsProcessed: results.feedsProcessed,
      totalNewArticles: results.totalNewArticles,
      errorCount: results.errors.length,
      errors: results.errors.map((e) => ({
        feedId: e.feedId,
        feedTitle: e.feedTitle,
        error: e.error.slice(0, 200),
      })),
    });
  } catch (error) {
    console.error("Cron fetch-feeds error", error);
    return NextResponse.json(
      { error: "Failed to fetch feeds" },
      { status: 500 }
    );
  }
}
