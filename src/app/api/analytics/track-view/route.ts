import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { presentationViews } from "@/lib/db/schema";

/**
 * POST /api/analytics/track-view
 * Public endpoint (no auth) — called from shared presentation pages.
 * Accepts view session data and inserts into presentation_views.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      deckId,
      shareToken,
      slideTimings,
      totalDurationMs,
      slidesViewed,
      totalSlides,
      completed,
      userAgent,
    } = body;

    if (!deckId || typeof deckId !== "number") {
      return NextResponse.json({ error: "deckId is required" }, { status: 400 });
    }

    // Generate a privacy-respecting fingerprint from IP + User-Agent
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
    const ua = userAgent || req.headers.get("user-agent") || "";
    const fingerprintSource = `${ip}::${ua}`;

    // Use SubtleCrypto to hash the fingerprint
    const encoder = new TextEncoder();
    const data = encoder.encode(fingerprintSource);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const viewerFingerprint = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    await db.insert(presentationViews).values({
      deckId,
      shareToken: shareToken ?? null,
      viewerFingerprint,
      userAgent: ua.slice(0, 500),
      slideTimings: slideTimings ?? [],
      totalDurationMs: totalDurationMs ?? 0,
      slidesViewed: slidesViewed ?? 0,
      totalSlides: totalSlides ?? 0,
      completed: completed ?? false,
      startedAt: new Date(),
      endedAt: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[track-view] Error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
