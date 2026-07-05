import { generateText } from "ai";
import { getSmallModel } from "@/lib/ai/models";
import type { YouTubeTranscript } from "@/lib/search/sources/youtube-transcript";

/** Every note element carries a `timestamp` in SECONDS → seeks the video (the atomic unit). */
export interface NotesChapter {
  title: string;
  summary: string;
  timestamp: number;
}
export interface NotesConcept {
  term: string;
  definition: string;
  timestamp: number;
}
export interface NotesQuote {
  quote: string;
  timestamp: number;
}

export interface VideoStudyNotes {
  /** 2-4 sentence overview. */
  tldr: string;
  /** Timestamped outline — the spine of the notes. */
  chapters: NotesChapter[];
  /** Key concepts + definitions, each anchored to where it's introduced. */
  concepts: NotesConcept[];
  /** Notable quotes/claims worth citing. */
  quotes: NotesQuote[];
}

// ~56k chars of [sec]-marked transcript — covers ~1hr. Chunked summarization for longer
// content is the next increment; today the tail is dropped (never silently invented).
const MAX_TRANSCRIPT_CHARS = 56000;

const SYSTEM_PROMPT = `You turn a timestamped video/lecture transcript into STRUCTURED, downstream-ready notes for study and research. Be FAITHFUL to the transcript — never invent facts not present in it.

The transcript is prefixed with [seconds] markers, e.g. "[125] the speaker explains...". For EVERY item you output, include a "timestamp" = the integer SECONDS of the nearest preceding [marker] where that content appears. Timestamps are mandatory — they let the reader jump to the exact moment.

Respond with ONLY a JSON object:
{
  "tldr": "2-4 sentence overview of what the video covers",
  "chapters": [ { "title": "short section title", "summary": "1-2 sentence what this section covers", "timestamp": 0 } ],
  "concepts": [ { "term": "key term/concept", "definition": "concise definition AS EXPLAINED in the video", "timestamp": 0 } ],
  "quotes": [ { "quote": "a notable verbatim line or claim worth citing", "timestamp": 0 } ]
}

chapters: 4-8 covering the video in order. concepts: the key terms a viewer should know (as many as the video genuinely introduces). quotes: 2-6 genuinely notable lines. Output JSON only, no prose.`;

/** Format segments as "[sec] text" so the model can anchor every item to a real moment. */
function toTimestampedText(transcript: YouTubeTranscript): string {
  if (transcript.segments.length === 0) return transcript.text.slice(0, MAX_TRANSCRIPT_CHARS);
  let out = "";
  for (const s of transcript.segments) {
    const line = `[${Math.floor(s.offset / 1000)}] ${s.text}\n`;
    if (out.length + line.length > MAX_TRANSCRIPT_CHARS) break;
    out += line;
  }
  return out;
}

function toNumber(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

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
  const tldr = str(obj.tldr);
  if (!tldr) return null;

  const asArray = (v: unknown): Record<string, unknown>[] =>
    Array.isArray(v) ? v.filter((x): x is Record<string, unknown> => typeof x === "object" && x !== null) : [];

  const chapters: NotesChapter[] = asArray(obj.chapters)
    .map((c) => ({ title: str(c.title), summary: str(c.summary), timestamp: toNumber(c.timestamp) }))
    .filter((c) => c.title.length > 0);
  const concepts: NotesConcept[] = asArray(obj.concepts)
    .map((c) => ({ term: str(c.term), definition: str(c.definition), timestamp: toNumber(c.timestamp) }))
    .filter((c) => c.term.length > 0);
  const quotes: NotesQuote[] = asArray(obj.quotes)
    .map((q) => ({ quote: str(q.quote), timestamp: toNumber(q.timestamp) }))
    .filter((q) => q.quote.length > 0);

  return { tldr, chapters, concepts, quotes };
}

/**
 * Distill a timestamped transcript into rich, timestamped study/research notes. Returns
 * null when the model output can't be parsed; the caller decides how to surface it.
 */
export async function summarizeTranscript(
  transcript: YouTubeTranscript
): Promise<VideoStudyNotes | null> {
  const { text } = await generateText({
    model: getSmallModel(),
    system: SYSTEM_PROMPT,
    prompt: `Transcript:\n${toTimestampedText(transcript)}`,
    maxOutputTokens: 2000,
  });
  return parseStudyNotes(text);
}
