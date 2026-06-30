import { NextResponse, type NextRequest } from "next/server";
import { isAIConfigured } from "@/lib/ai/models";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { createResultCache } from "@/lib/search/result-cache";
import { fetchYouTubeTranscript } from "@/lib/search/sources/youtube-transcript";
import { summarizeTranscript } from "@/lib/youtube/study-notes";

// Transcripts and their summaries are immutable per video → cache hard. First
// request pays the Supadata + LLM cost; everyone after (any user) is a cache hit.
const cache = createResultCache();
const SUMMARY_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

// YouTube IDs are 11 chars, but allow a tolerant range; reject anything else so a
// bad/oversized value never reaches Supadata.
const VIDEO_ID_RE = /^[A-Za-z0-9_-]{6,20}$/;

type SummaryPayload =
  | { error: "no_transcript" | "missing_config" | "summarize_failed" | "transcript_error"; message: string }
  | { lang: string; summary: string; keyPoints: string[]; topics: string[] };

export async function POST(req: NextRequest) {
  let userId: string;
  try {
    userId = await getCurrentUserId();
  } catch {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const limited = await checkRateLimit(userId, "youtube-summary", RATE_LIMITS.ai);
  if (limited) return limited;

  if (!isAIConfigured()) {
    return NextResponse.json({ error: "ai_not_configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const videoId = String((body as { videoId?: unknown })?.videoId ?? "");
  if (!VIDEO_ID_RE.test(videoId)) {
    return NextResponse.json({ error: "valid videoId required" }, { status: 400 });
  }

  try {
    const { value } = await cache.getOrCompute<SummaryPayload>(
      `yt-summary:${videoId}`,
      async () => {
        const t = await fetchYouTubeTranscript(videoId);
        if (!t.ok) {
          return {
            error: t.reason === "no_transcript" ? "no_transcript" : t.reason === "missing_config" ? "missing_config" : "transcript_error",
            message: t.message,
          };
        }
        const notes = await summarizeTranscript(t.transcript);
        if (!notes) {
          return { error: "summarize_failed", message: "Could not produce study notes from the transcript" };
        }
        return { lang: t.transcript.lang, ...notes };
      },
      { ttlSeconds: SUMMARY_TTL_SECONDS, shouldCache: (v) => !("error" in v) }
    );

    if ("error" in value) {
      const status =
        value.error === "no_transcript" ? 422 : value.error === "missing_config" ? 503 : 502;
      return NextResponse.json({ error: value.error, message: value.message }, { status });
    }
    return NextResponse.json({ videoId, ...value });
  } catch (error) {
    console.error("[youtube/summary] failed:", error);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
