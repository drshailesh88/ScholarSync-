/**
 * GET /api/feeds/opml/export
 *
 * Export the user's feed subscriptions as an OPML 2.0 file.
 */
import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { userFeedSubscriptions, feedSources } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { generateOpml, type OpmlOutline } from "@/lib/feeds/opml";

export async function GET() {
  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Get user's subscriptions with feed source details
    const subs = await db
      .select({
        folder: userFeedSubscriptions.folder,
        displayName: userFeedSubscriptions.displayName,
        title: feedSources.title,
        feedUrl: feedSources.feedUrl,
        siteUrl: feedSources.siteUrl,
      })
      .from(userFeedSubscriptions)
      .innerJoin(feedSources, eq(userFeedSubscriptions.feedSourceId, feedSources.id))
      .where(eq(userFeedSubscriptions.userId, userId));

    const outlines: OpmlOutline[] = subs.map((s) => ({
      title: s.displayName || s.title,
      feedUrl: s.feedUrl,
      siteUrl: s.siteUrl || "",
      folder: s.folder || undefined,
    }));

    const xml = generateOpml(outlines);

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Content-Disposition": 'attachment; filename="scholarsync-feeds.opml"',
      },
    });
  } catch (error) {
    console.error("OPML export error:", error);
    return NextResponse.json({ error: "Failed to export feeds" }, { status: 500 });
  }
}
