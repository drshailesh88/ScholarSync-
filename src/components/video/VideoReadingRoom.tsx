"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, FileText, ListTree, Quote, Sparkles, AlertCircle } from "lucide-react";

interface Segment {
  text: string;
  offset: number;
  duration: number;
}
interface Chapter {
  title: string;
  summary: string;
  timestamp: number;
}
interface Concept {
  term: string;
  definition: string;
  timestamp: number;
}
interface QuoteItem {
  quote: string;
  timestamp: number;
}
interface Notes {
  tldr: string;
  chapters: Chapter[];
  concepts: Concept[];
  quotes: QuoteItem[];
}
interface SummaryOk {
  lang: string;
  availableLangs: string[];
  transcript: string;
  segments: Segment[];
  notes: Notes;
}

type Phase =
  | { status: "loading" }
  | { status: "error"; kind: string; message: string }
  | { status: "ready"; data: SummaryOk };

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/** A monospace timestamp chip — the atomic unit. Click seeks the video. */
function Stamp({ s, onSeek }: { s: number; onSeek: (s: number) => void }) {
  return (
    <button
      onClick={() => onSeek(s)}
      className="shrink-0 font-mono text-[11px] leading-none text-accent hover:underline tabular-nums"
      aria-label={`Jump to ${fmt(s)}`}
    >
      {fmt(s)}
    </button>
  );
}

function SectionLabel({ icon: Icon, children }: { icon: typeof FileText; children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted">
      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
      {children}
    </div>
  );
}

export function VideoReadingRoom({ videoId, title }: { videoId: string; title?: string }) {
  const [phase, setPhase] = useState<Phase>({ status: "loading" });
  const playerRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/youtube/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoId }),
        });
        const json = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          setPhase({ status: "error", kind: json.error ?? "error", message: json.message ?? "Couldn't load this video" });
          return;
        }
        setPhase({ status: "ready", data: json as SummaryOk });
      } catch {
        if (!cancelled) setPhase({ status: "error", kind: "network", message: "Network error — check your connection" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [videoId]);

  const seek = useCallback((seconds: number) => {
    playerRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "seekTo", args: [seconds, true] }),
      "*"
    );
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  const player = (
    <div className="aspect-video w-full overflow-hidden rounded-lg border border-line bg-black">
      <iframe
        ref={playerRef}
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
        title={title ?? "Video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );

  return (
    <div className="mx-auto h-full max-w-[1400px] px-4 py-6 lg:px-6">
      {title && <h1 className="mb-5 font-serif text-2xl font-semibold text-ink">{title}</h1>}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.35fr)_minmax(0,0.9fr)]">
        {/* Left — Video + Transcript */}
        <div className="flex min-w-0 flex-col gap-4">
          {player}
          <div className="rounded-lg border border-line bg-paper">
            <div className="border-b border-line2 px-4 py-3">
              <SectionLabel icon={FileText}>Transcript</SectionLabel>
            </div>
            <div className="max-h-[520px] overflow-y-auto px-4 py-3">
              {phase.status === "loading" && <SkeletonLines n={10} />}
              {phase.status === "ready" &&
                phase.data.segments.map((seg, i) => (
                  <div key={i} className="mb-2 flex gap-2.5 text-[13px] leading-relaxed">
                    <Stamp s={Math.floor(seg.offset / 1000)} onSeek={seek} />
                    <span className="text-ink3">{seg.text}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Center — Notes */}
        <div className="min-w-0">
          {phase.status === "loading" && <NotesSkeleton />}
          {phase.status === "error" && <ErrorState kind={phase.kind} message={phase.message} />}
          {phase.status === "ready" && <NotesPane notes={phase.data.notes} onSeek={seek} />}
        </div>

        {/* Right — Studio (modes, on-demand) */}
        <div className="min-w-0">
          <div className="rounded-lg border border-line bg-rail p-4">
            <SectionLabel icon={Sparkles}>Studio</SectionLabel>
            <div className="space-y-2">
              {["Chat with this video", "Flashcards", "Quiz", "Study guide"].map((m) => (
                <button
                  key={m}
                  disabled
                  className="flex w-full items-center justify-between rounded-md border border-line bg-paper px-3 py-2.5 text-left text-[13px] text-ink hover:border-accentln disabled:cursor-not-allowed disabled:opacity-55"
                >
                  {m}
                  <span className="font-mono text-[10px] uppercase tracking-wide text-muted">soon</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotesPane({ notes, onSeek }: { notes: Notes; onSeek: (s: number) => void }) {
  return (
    <div className="rounded-lg border border-line bg-paper p-5">
      <p className="mb-6 font-serif text-[15px] leading-relaxed text-ink2">{notes.tldr}</p>

      {notes.chapters.length > 0 && (
        <section className="mb-6">
          <SectionLabel icon={ListTree}>Outline</SectionLabel>
          <ul className="space-y-2.5">
            {notes.chapters.map((c, i) => (
              <li key={i} className="flex gap-3">
                <Stamp s={c.timestamp} onSeek={onSeek} />
                <div className="min-w-0">
                  <div className="text-[13.5px] font-medium text-ink">{c.title}</div>
                  <div className="text-[12.5px] leading-snug text-muted">{c.summary}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {notes.concepts.length > 0 && (
        <section className="mb-6">
          <SectionLabel icon={FileText}>Key concepts</SectionLabel>
          <ul className="space-y-2.5">
            {notes.concepts.map((c, i) => (
              <li key={i} className="flex gap-3">
                <Stamp s={c.timestamp} onSeek={onSeek} />
                <div className="min-w-0 text-[13px] leading-snug">
                  <span className="font-medium text-ink">{c.term}</span>
                  <span className="text-ink3"> — {c.definition}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {notes.quotes.length > 0 && (
        <section>
          <SectionLabel icon={Quote}>Notable quotes</SectionLabel>
          <ul className="space-y-3">
            {notes.quotes.map((q, i) => (
              <li key={i} className="flex gap-3">
                <Stamp s={q.timestamp} onSeek={onSeek} />
                <blockquote className="border-l-2 border-accentln pl-3 text-[13px] italic leading-snug text-ink2">
                  {q.quote}
                </blockquote>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function SkeletonLines({ n }: { n: number }) {
  return (
    <div className="animate-pulse space-y-2.5">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="h-3 rounded bg-line2" style={{ width: `${70 + ((i * 7) % 30)}%` }} />
      ))}
    </div>
  );
}

function NotesSkeleton() {
  return (
    <div className="rounded-lg border border-line bg-paper p-5">
      <div className="mb-6 flex items-center gap-2 text-[13px] text-muted">
        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} />
        Distilling notes…
      </div>
      <SkeletonLines n={12} />
    </div>
  );
}

function ErrorState({ kind, message }: { kind: string; message: string }) {
  const isNoTranscript = kind === "no_transcript";
  return (
    <div className="rounded-lg border border-line bg-paper p-8 text-center">
      <AlertCircle className="mx-auto mb-3 h-6 w-6 text-exc" strokeWidth={1.5} />
      <p className="text-[14px] font-medium text-ink">
        {isNoTranscript ? "This video has no captions" : "Couldn't build the notes"}
      </p>
      <p className="mt-1 text-[12.5px] text-muted">{message}</p>
    </div>
  );
}
