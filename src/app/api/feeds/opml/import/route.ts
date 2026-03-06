/**
 * POST /api/feeds/opml/import
 *
 * Import feed subscriptions from an OPML file.
 * Accepts the OPML XML as the request body (Content-Type: application/xml or text/xml).
 * Also accepts JSON: { opml: "<xml string>" }.
 */
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { parseOpml } from "@/lib/feeds/opml";
import { subscribeFeed, updateSubscription } from "@/lib/actions/feeds";

export async function POST(req: NextRequest) {
  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const rateLimitResponse = await checkRateLimit(userId, "feeds", RATE_LIMITS.feeds);
    if (rateLimitResponse) return rateLimitResponse;

    // Read OPML from body (support both XML and JSON payloads)
    let opmlXml: string;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("xml") || contentType.includes("opml")) {
      opmlXml = await req.text();
    } else {
      // JSON body: { opml: "<xml>" }
      const body = await req.json();
      opmlXml = body.opml;
    }

    if (!opmlXml) {
      return NextResponse.json({ error: "No OPML data provided" }, { status: 400 });
    }

    // Parse OPML
    let parsed;
    try {
      parsed = parseOpml(opmlXml);
    } catch (err) {
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "Failed to parse OPML" },
        { status: 400 }
      );
    }

    if (parsed.feeds.length === 0) {
      return NextResponse.json({ error: "No feeds found in OPML file" }, { status: 400 });
    }

    // Subscribe to each feed
    let imported = 0;
    let skipped = 0;
    const errors: Array<{ feedUrl: string; title: string; error: string }> = [];

    for (const feed of parsed.feeds) {
      try {
        const result = await subscribeFeed(feed.feedUrl);

        // Set folder if present in OPML
        if (feed.folder && result.subscription?.id) {
          try {
            await updateSubscription(result.subscription.id, { folder: feed.folder });
          } catch {
            // Non-critical: folder assignment failed, feed is still subscribed
          }
        }

        imported++;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        if (message.includes("Already subscribed")) {
          skipped++;
        } else {
          errors.push({
            feedUrl: feed.feedUrl,
            title: feed.title,
            error: message,
          });
        }
      }
    }

    return NextResponse.json({
      opmlTitle: parsed.title,
      totalFeeds: parsed.feeds.length,
      imported,
      skipped,
      failed: errors.length,
      errors: errors.slice(0, 20),
    });
  } catch (error) {
    console.error("OPML import error:", error);
    return NextResponse.json({ error: "Failed to import feeds" }, { status: 500 });
  }
}
