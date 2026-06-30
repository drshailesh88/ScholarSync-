"use client";

import { useState } from "react";
import { CircleNotch, FileText, CaretDown, CaretRight } from "@phosphor-icons/react";

/** Pull the 11-char video id out of a youtube.com/watch?v= or youtu.be/ URL. */
export function extractVideoId(url?: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
    if (u.hostname.replace(/^www\./, "").endsWith("youtube.com")) return u.searchParams.get("v");
  } catch {
    /* not a parseable URL */
  }
  return null;
}

interface TakeawaysData {
  lang: string;
  transcript: string;
  summary: string;
  keyPoints: string[];
  topics: string[];
}

type Status = "idle" | "loading" | "done" | "error";

export function VideoTakeaways({ url }: { url?: string }) {
  const videoId = extractVideoId(url);
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<TakeawaysData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [showTranscript, setShowTranscript] = useState(false);

  if (!videoId) return null;

  const run = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/youtube/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string };
        setErrorMsg(
          res.status === 422
            ? "No transcript is available for this video."
            : body.message || "Couldn't generate takeaways for this video."
        );
        setStatus("error");
        return;
      }
      setData((await res.json()) as TakeawaysData);
      setStatus("done");
    } catch {
      setErrorMsg("Couldn't generate takeaways for this video.");
      setStatus("error");
    }
  };

  if (status === "idle" || status === "error") {
    return (
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1.5 text-[13px] font-medium text-ink transition-colors hover:border-brand hover:text-brand"
          onClick={run}
          type="button"
        >
          <FileText size={15} weight="regular" />
          {status === "error" ? "Try again" : "Transcript & Key Takeaways"}
        </button>
        {status === "error" ? (
          <span className="text-[12px] text-ink-muted">{errorMsg}</span>
        ) : null}
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="mt-3 flex items-center gap-2 text-[13px] text-ink-muted">
        <CircleNotch className="animate-spin" size={15} weight="bold" />
        Distilling the transcript…
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-4">
      {data.keyPoints.length > 0 ? (
        <section>
          <h3 className="text-[12px] font-semibold uppercase tracking-wide text-ink-muted">Key takeaways</h3>
          <ul className="mt-2 space-y-1.5">
            {data.keyPoints.map((point, i) => (
              <li className="flex gap-2 text-[14px] leading-[1.5] text-ink" key={i}>
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {data.summary ? (
        <section className="mt-4">
          <h3 className="text-[12px] font-semibold uppercase tracking-wide text-ink-muted">Summary</h3>
          <p className="mt-1.5 text-[14px] leading-[1.55] text-ink-muted">{data.summary}</p>
        </section>
      ) : null}

      {data.topics.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {data.topics.map((topic, i) => (
            <span
              className="rounded-full bg-black/[0.04] px-2.5 py-0.5 text-[12px] text-ink-muted dark:bg-white/[0.06]"
              key={i}
            >
              {topic}
            </span>
          ))}
        </div>
      ) : null}

      <button
        className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-ink-muted transition-colors hover:text-ink"
        onClick={() => setShowTranscript((v) => !v)}
        type="button"
      >
        {showTranscript ? <CaretDown size={13} weight="bold" /> : <CaretRight size={13} weight="bold" />}
        {showTranscript ? "Hide transcript" : "View transcript"}
      </button>
      {showTranscript ? (
        <p className="mt-2 max-h-72 overflow-y-auto whitespace-pre-wrap rounded-lg bg-black/[0.02] p-3 text-[13px] leading-[1.6] text-ink-muted dark:bg-white/[0.03]">
          {data.transcript}
        </p>
      ) : null}
    </div>
  );
}
