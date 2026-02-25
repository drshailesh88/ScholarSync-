"use client";

import { useState, useRef, useCallback } from "react";
import {
  MagnifyingGlass,
  Sparkle,
  CircleNotch,
  ArrowRight,
  BookOpen,
  Warning,
  CheckCircle,
  Brain,
  TreeStructure,
  FileText,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import type {
  ResearchMode,
  ResearchProgress,
  SynthesisReport,
} from "@/lib/deep-research/types";
import { RESEARCH_MODES } from "@/lib/deep-research/types";

type ResearchState = "idle" | "running" | "done" | "error";

const STAGE_ICONS: Record<string, React.ReactNode> = {
  initialization: <CircleNotch size={16} className="animate-spin" />,
  "perspective-generation": <Brain size={16} />,
  research: <MagnifyingGlass size={16} />,
  deduplication: <TreeStructure size={16} />,
  synthesis: <FileText size={16} />,
  complete: <CheckCircle size={16} />,
  error: <Warning size={16} />,
};

export default function DeepResearchPage() {
  const [topic, setTopic] = useState("");
  const [mode, setMode] = useState<ResearchMode>("standard");
  const [state, setState] = useState<ResearchState>("idle");
  const [progress, setProgress] = useState<ResearchProgress | null>(null);
  const [report, setReport] = useState<SynthesisReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progressLog, setProgressLog] = useState<ResearchProgress[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  const startResearch = useCallback(async () => {
    if (!topic.trim() || state === "running") return;

    setState("running");
    setError(null);
    setReport(null);
    setProgressLog([]);
    setProgress(null);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/deep-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), mode }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.error || `Request failed (${response.status})`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        let currentEvent = "";
        for (const line of lines) {
          if (line.startsWith("event: ")) {
            currentEvent = line.slice(7).trim();
          } else if (line.startsWith("data: ") && currentEvent) {
            try {
              const data = JSON.parse(line.slice(6));
              if (currentEvent === "progress") {
                setProgress(data as ResearchProgress);
                setProgressLog((prev) => [...prev, data as ResearchProgress]);
              } else if (currentEvent === "report") {
                setReport(data as SynthesisReport);
              } else if (currentEvent === "error") {
                throw new Error(data.message);
              }
            } catch (e) {
              if (e instanceof Error && e.message !== "Unexpected end of JSON input") {
                throw e;
              }
            }
            currentEvent = "";
          }
        }
      }

      setState("done");
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        setState("idle");
      } else {
        setError(err instanceof Error ? err.message : "Research failed");
        setState("error");
      }
    }
  }, [topic, mode, state]);

  const handleStop = () => {
    abortRef.current?.abort();
    setState("idle");
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-semibold text-ink mb-2">
          Deep Research
        </h1>
        <p className="text-sm text-ink-muted">
          AI-powered multi-perspective literature synthesis. Enter a research
          question and get a comprehensive report with citations.
        </p>
      </div>

      {/* Input Section */}
      <GlassPanel className="p-6 mb-6">
        {/* Topic input */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-ink-muted mb-1.5">
            Research Question
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                startResearch();
              }
            }}
            placeholder="e.g., What is the efficacy of CRISPR-based gene therapy for sickle cell disease?"
            rows={2}
            disabled={state === "running"}
            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-ink placeholder:text-ink-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 resize-none transition-all"
          />
        </div>

        {/* Mode selector */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-ink-muted mb-1.5">
            Research Depth
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(Object.entries(RESEARCH_MODES) as [ResearchMode, typeof RESEARCH_MODES.quick][]).map(
              ([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setMode(key)}
                  disabled={state === "running"}
                  className={cn(
                    "px-3 py-2 rounded-xl border text-xs font-medium transition-all text-left",
                    mode === key
                      ? "bg-brand/10 text-brand border-brand/30"
                      : "bg-surface-raised text-ink-muted border-border hover:text-ink"
                  )}
                >
                  <div>{cfg.label}</div>
                  <div className="text-[10px] mt-0.5 opacity-70">
                    ~{cfg.estimatedMinutes} min · {cfg.maxSources} papers
                  </div>
                </button>
              )
            )}
          </div>
        </div>

        {/* Start / Stop button */}
        {state === "running" ? (
          <button
            onClick={handleStop}
            className="w-full py-3 rounded-xl bg-red-500/10 text-red-500 text-sm font-medium hover:bg-red-500/20 transition-colors"
          >
            Stop Research
          </button>
        ) : (
          <button
            onClick={startResearch}
            disabled={!topic.trim()}
            className="w-full py-3 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Sparkle size={16} weight="fill" />
            Start Deep Research
          </button>
        )}
      </GlassPanel>

      {/* Progress Section */}
      {state === "running" && progress && (
        <GlassPanel className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <CircleNotch size={20} className="animate-spin text-brand" />
            <span className="text-sm font-medium text-ink">
              {progress.message}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-surface-raised mb-4">
            <div
              className="h-full rounded-full bg-brand transition-all duration-500"
              style={{ width: `${progress.progress}%` }}
            />
          </div>

          {/* Stats */}
          <div className="flex gap-4 text-xs text-ink-muted">
            {progress.perspectivesGenerated != null && (
              <span>{progress.perspectivesGenerated} perspectives</span>
            )}
            {progress.nodesExplored != null && (
              <span>{progress.nodesExplored} queries explored</span>
            )}
            {progress.sourcesFound != null && (
              <span>{progress.sourcesFound} papers found</span>
            )}
          </div>

          {/* Progress log */}
          <div className="mt-4 max-h-32 overflow-y-auto space-y-1">
            {progressLog.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[11px] text-ink-muted"
              >
                {STAGE_ICONS[p.stage] || <ArrowRight size={12} />}
                <span>{p.message}</span>
              </div>
            ))}
          </div>
        </GlassPanel>
      )}

      {/* Error */}
      {state === "error" && error && (
        <GlassPanel className="p-6 mb-6 border-red-500/20">
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <Warning size={18} />
            <span>{error}</span>
          </div>
        </GlassPanel>
      )}

      {/* Report */}
      {report && state === "done" && (
        <div className="space-y-6">
          {/* Summary */}
          <GlassPanel className="p-6">
            <h2 className="text-lg font-serif font-semibold text-ink mb-3">
              Research Summary
            </h2>
            <p className="text-sm text-ink leading-relaxed">
              {report.summary}
            </p>
            <div className="flex gap-3 mt-4 text-xs text-ink-muted">
              <span>{report.totalSources} sources analyzed</span>
              <span>·</span>
              <span>{report.perspectives.length} perspectives</span>
              <span>·</span>
              <span>{report.keyFindings.length} key findings</span>
            </div>
          </GlassPanel>

          {/* Key Findings */}
          {report.keyFindings.length > 0 && (
            <GlassPanel className="p-6">
              <h2 className="text-lg font-serif font-semibold text-ink mb-3">
                Key Findings
              </h2>
              <ul className="space-y-2">
                {report.keyFindings.map((finding, i) => (
                  <li key={i} className="flex gap-2 text-sm text-ink">
                    <CheckCircle
                      size={16}
                      className="text-emerald-500 shrink-0 mt-0.5"
                    />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </GlassPanel>
          )}

          {/* Perspectives */}
          {report.perspectives.length > 0 && (
            <GlassPanel className="p-6">
              <h2 className="text-lg font-serif font-semibold text-ink mb-3">
                Perspectives
              </h2>
              <div className="space-y-4">
                {report.perspectives.map((p, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-surface-raised/50"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Brain size={14} className="text-brand" />
                      <h3 className="text-sm font-medium text-ink">
                        {p.name}
                      </h3>
                      <span className="text-[10px] text-ink-muted">
                        ({p.sourceCount} sources)
                      </span>
                    </div>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      {p.findings}
                    </p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          )}

          {/* Gaps & Contradictions */}
          {(report.gaps.length > 0 || report.contradictions.length > 0) && (
            <GlassPanel className="p-6">
              {report.gaps.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-lg font-serif font-semibold text-ink mb-3">
                    Research Gaps
                  </h2>
                  <ul className="space-y-1">
                    {report.gaps.map((gap, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm text-amber-600"
                      >
                        <Warning size={14} className="shrink-0 mt-0.5" />
                        <span className="text-ink-muted">{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {report.contradictions.length > 0 && (
                <div>
                  <h2 className="text-lg font-serif font-semibold text-ink mb-3">
                    Contradictions
                  </h2>
                  <ul className="space-y-1">
                    {report.contradictions.map((c, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm text-red-500"
                      >
                        <Warning size={14} className="shrink-0 mt-0.5" />
                        <span className="text-ink-muted">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </GlassPanel>
          )}

          {/* Sources */}
          <GlassPanel className="p-6">
            <h2 className="text-lg font-serif font-semibold text-ink mb-3">
              Sources ({report.sources.length})
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {report.sources.slice(0, 50).map((s, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-surface-raised/30 text-xs"
                >
                  <p className="font-medium text-ink leading-snug">
                    {s.doi ? (
                      <a
                        href={`https://doi.org/${s.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-brand transition-colors"
                      >
                        {s.title}
                      </a>
                    ) : (
                      s.title
                    )}
                  </p>
                  <p className="text-ink-muted mt-0.5">
                    {s.authors.slice(0, 3).join(", ")}
                    {s.authors.length > 3 && " et al."} · {s.journal} ·{" "}
                    {s.year}
                    {s.citationCount ? ` · ${s.citationCount} citations` : ""}
                  </p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      )}

      {/* Empty state */}
      {state === "idle" && !report && (
        <GlassPanel className="p-12 text-center">
          <BookOpen size={48} className="mx-auto text-ink-muted/30 mb-4" />
          <p className="text-sm text-ink-muted">
            Enter a research question above to begin. Deep Research will search
            across PubMed, Semantic Scholar, and OpenAlex, then synthesize
            findings into a structured report.
          </p>
        </GlassPanel>
      )}
    </div>
  );
}
