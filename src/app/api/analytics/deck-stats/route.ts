import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { presentationViews, slideDecks } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";

interface SlideTimingEntry {
  slideId: string;
  slideIndex: number;
  durationMs: number;
}

interface SlideHeatmapEntry {
  slideId: string;
  slideIndex: number;
  avgDurationMs: number;
  viewCount: number;
}

/**
 * GET /api/analytics/deck-stats?deckId=123
 * Auth required — deck owner only.
 * Returns aggregated analytics for a presentation deck.
 */
export async function GET(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const url = new URL(req.url);
    const deckId = Number(url.searchParams.get("deckId"));

    if (!deckId || isNaN(deckId)) {
      return NextResponse.json({ error: "deckId is required" }, { status: 400 });
    }

    // Verify ownership
    const [deck] = await db
      .select({ userId: slideDecks.userId })
      .from(slideDecks)
      .where(eq(slideDecks.id, deckId))
      .limit(1);

    if (!deck || deck.userId !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Fetch all views for this deck
    const views = await db
      .select({
        viewerFingerprint: presentationViews.viewerFingerprint,
        totalDurationMs: presentationViews.totalDurationMs,
        completed: presentationViews.completed,
        slideTimings: presentationViews.slideTimings,
        startedAt: presentationViews.startedAt,
        slidesViewed: presentationViews.slidesViewed,
      })
      .from(presentationViews)
      .where(eq(presentationViews.deckId, deckId))
      .orderBy(desc(presentationViews.startedAt));

    const totalViews = views.length;

    // Unique viewers by fingerprint
    const uniqueFingerprints = new Set(
      views.map((v) => v.viewerFingerprint).filter(Boolean)
    );
    const uniqueViewers = uniqueFingerprints.size || (totalViews > 0 ? 1 : 0);

    // Average duration
    const durations = views
      .map((v) => v.totalDurationMs)
      .filter((d): d is number => d != null && d > 0);
    const avgDurationMs =
      durations.length > 0
        ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
        : 0;

    // Completion rate
    const completedCount = views.filter((v) => v.completed).length;
    const completionRate =
      totalViews > 0 ? Math.round((completedCount / totalViews) * 100) : 0;

    // Slide heatmap — aggregate timings across all views
    const slideMap = new Map<
      string,
      { slideId: string; slideIndex: number; totalMs: number; count: number }
    >();

    for (const view of views) {
      const timings = (view.slideTimings ?? []) as SlideTimingEntry[];
      for (const t of timings) {
        const key = t.slideId ?? `idx-${t.slideIndex}`;
        const existing = slideMap.get(key);
        if (existing) {
          existing.totalMs += t.durationMs ?? 0;
          existing.count += 1;
        } else {
          slideMap.set(key, {
            slideId: key,
            slideIndex: t.slideIndex ?? 0,
            totalMs: t.durationMs ?? 0,
            count: 1,
          });
        }
      }
    }

    const slideHeatmap: SlideHeatmapEntry[] = Array.from(slideMap.values())
      .sort((a, b) => a.slideIndex - b.slideIndex)
      .map((s) => ({
        slideId: s.slideId,
        slideIndex: s.slideIndex,
        avgDurationMs: Math.round(s.totalMs / s.count),
        viewCount: s.count,
      }));

    // Recent views (last 50)
    const recentViews = views.slice(0, 50).map((v) => ({
      fingerprint: (v.viewerFingerprint ?? "").slice(0, 8) + "...",
      startedAt: v.startedAt,
      duration: v.totalDurationMs ?? 0,
      slidesViewed: v.slidesViewed ?? 0,
    }));

    // Views over time (daily counts, last 30 days)
    const dayMap = new Map<string, number>();
    for (const v of views) {
      const date = v.startedAt
        ? new Date(v.startedAt).toISOString().slice(0, 10)
        : null;
      if (date) {
        dayMap.set(date, (dayMap.get(date) ?? 0) + 1);
      }
    }

    const viewsOverTime = Array.from(dayMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-30)
      .map(([date, count]) => ({ date, count }));

    return NextResponse.json({
      totalViews,
      uniqueViewers,
      avgDurationMs,
      completionRate,
      slideHeatmap,
      recentViews,
      viewsOverTime,
    });
  } catch (err) {
    console.error("[deck-stats] Error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
