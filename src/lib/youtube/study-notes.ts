import { generateText } from "ai";
import { getSmallModel } from "@/lib/ai/models";
import type { YouTubeTranscript } from "@/lib/search/sources/youtube-transcript";

export interface VideoStudyNotes {
  summary: string;
  keyPoints: string[];
  topics: string[];
}

// ~12k input tokens — covers a ~1hr lecture and bounds cost. Multi-hour content is
// truncated here (chunked summarization is a future enhancement).
const MAX_TRANSCRIPT_CHARS = 48000;

const SYSTEM_PROMPT = `You are a study assistant. From a video/lecture transcript, produce concise STUDY MATERIAL that is FAITHFUL to the transcript — never invent facts not present in it.

Respond with ONLY a JSON object:
{
  "summary": "3-5 sentence overview of what the video teaches",
  "keyPoints": ["concise takeaway", "..."],
  "topics": ["key concept or term covered", "..."]
}

keyPoints: 5-10 items. topics: the main concepts/terms a student should know.`;

/** Tolerant JSON parse: bare object, fenced, or the outermost {...}. */
export function parseStudyNotes(text: string): VideoStudyNotes | null {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1].trim() : trimmed;
  let raw: unknown;
  try {
    raw = JSON.parse(candidate);
  } catch {
    const start = candidate.indexOf("{");
    const end = candidate.lastIndexOf("}");
    if (start === -1 || end <= start) return null;
    try {
      raw = JSON.parse(candidate.slice(start, end + 1));
    } catch {
      return null;
    }
  }
  if (typeof raw !== "object" || raw === null) return null;
  const obj = raw as Record<string, unknown>;
  const summary = typeof obj.summary === "string" ? obj.summary.trim() : "";
  if (!summary) return null;
  const toStrings = (v: unknown): string[] =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && x.trim().length > 0) : [];
  return { summary, keyPoints: toStrings(obj.keyPoints), topics: toStrings(obj.topics) };
}

/**
 * Summarize a transcript into study notes with the small (cheap) model. Returns
 * null when the model output can't be parsed; the caller decides how to surface it.
 */
export async function summarizeTranscript(
  transcript: YouTubeTranscript
): Promise<VideoStudyNotes | null> {
  const { text } = await generateText({
    model: getSmallModel(),
    system: SYSTEM_PROMPT,
    prompt: `Transcript:\n${transcript.text.slice(0, MAX_TRANSCRIPT_CHARS)}`,
    maxOutputTokens: 1200,
  });
  return parseStudyNotes(text);
}
