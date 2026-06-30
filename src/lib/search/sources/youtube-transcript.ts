import { createCircuitBreaker } from "@/lib/http/circuit-breaker";
import { resilientFetch } from "@/lib/http/resilient-fetch";

const breaker = createCircuitBreaker({ service: "Supadata", failureThreshold: 5 });

const ENDPOINT = "https://api.supadata.ai/v1/youtube/transcript";

export interface YouTubeTranscript {
  text: string;
  lang: string;
  availableLangs: string[];
}

interface SupadataResponse {
  content?: string;
  lang?: string;
  availableLangs?: string[];
  error?: string;
  message?: string;
}

export type TranscriptResult =
  | { ok: true; transcript: YouTubeTranscript }
  | { ok: false; reason: "missing_config" | "no_transcript" | "error"; message: string };

/**
 * Fetch a YouTube transcript via Supadata's OpenAI-style endpoint. `text=true`
 * returns the plain transcript string ({@link SupadataResponse.content}). A video
 * with no caption track is a normal outcome (`no_transcript`), not a server fault,
 * so the circuit breaker isn't tripped for it — only genuine fetch failures count.
 */
export async function fetchYouTubeTranscript(videoId: string): Promise<TranscriptResult> {
  const key = process.env.SUPADATA_API_KEY;
  if (!key) {
    return { ok: false, reason: "missing_config", message: "SUPADATA_API_KEY not set" };
  }
  if (!breaker.canRequest()) {
    return { ok: false, reason: "error", message: "Circuit breaker open — recent Supadata failures" };
  }

  const url = new URL(ENDPOINT);
  url.searchParams.set("videoId", videoId);
  url.searchParams.set("text", "true");

  try {
    const res = await resilientFetch(
      url.toString(),
      { headers: { "x-api-key": key, Accept: "application/json" } },
      { service: "Supadata", timeout: 30000, baseDelay: 800, maxRetries: 1 }
    );
    const data = (await res.json()) as SupadataResponse;

    const text = (data.content ?? "").trim();
    if (!text) {
      breaker.onSuccess(); // reachable API, just no captions for this video
      return {
        ok: false,
        reason: "no_transcript",
        message: data.error || data.message || "No transcript available for this video",
      };
    }

    breaker.onSuccess();
    return {
      ok: true,
      transcript: {
        text,
        lang: data.lang ?? "en",
        availableLangs: data.availableLangs ?? [],
      },
    };
  } catch (error) {
    breaker.onFailure();
    console.error("[Supadata] transcript fetch failed:", error);
    return {
      ok: false,
      reason: "error",
      message: error instanceof Error ? error.message : "transcript fetch failed",
    };
  }
}
