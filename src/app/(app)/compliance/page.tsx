"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, PenNib, DownloadSimple, Sparkle, MagnifyingGlass, CircleNotch, CaretDown, FileText, ClockCounterClockwise, SplitHorizontal, Lightning, Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { CircularGauge } from "@/components/ui/circular-gauge";
import { ProgressBar } from "@/components/ui/progress-bar";
import {
  getActiveDocumentForAnalysis,
  listProjectsForAnalysis,
  type DocumentForAnalysis,
} from "@/lib/actions/analysis";
import type { IntegrityCheckResult } from "@/lib/integrity/types";
import { DiffView } from "@/components/integrity/DiffView";
import { useRealtimeIntegrity } from "@/hooks/useRealtimeIntegrity";

type SourceMode = "document" | "paste";

interface CopyleaksSource {
  url: string;
  title: string;
  matchPercentage: number;
  matchedText?: string;
}

interface CopyleaksResult {
  status: "completed" | "error" | "pending" | string;
  score: number;
  sources: CopyleaksSource[];
}

export default function CompliancePage() {
  // Source mode
  const [sourceMode, setSourceMode] = useState<SourceMode>("document");

  // Document loading state
  const [docLoading, setDocLoading] = useState(true);
  const [activeDoc, setActiveDoc] = useState<DocumentForAnalysis | null>(null);
  const [projects, setProjects] = useState<{ id: number; title: string }[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const projectDropdownRef = useRef<HTMLDivElement>(null);

  // Text state
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<IntegrityCheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  // Copyleaks plagiarism scan state
  const [copyleaksScanId, setCopyleaksScanId] = useState<string | null>(null);
  const [copyleaksResult, setCopyleaksResult] = useState<CopyleaksResult | null>(null);
  const [copyleaksLoading, setCopyleaksLoading] = useState(false);
  const [copyleaksAvailable, setCopyleaksAvailable] = useState<boolean | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Feature states
  type ViewMode = "inline" | "split";
  type PageTab = "check" | "history";
  const [viewMode, setViewMode] = useState<ViewMode>("inline");
  const [pageTab, setPageTab] = useState<PageTab>("check");
  const [realtimeEnabled, setRealtimeEnabled] = useState(false);
  const [humanizeLoading, setHumanizeLoading] = useState<number | null>(null);
  const [humanizeResults, setHumanizeResults] = useState<Record<number, { rewritten: string; changes: string[] }>>({});
  const [paraphraseLoading, setParaphraseLoading] = useState<number | null>(null);
  const [paraphraseResults, setParaphraseResults] = useState<Record<number, { paraphrased: string; citationSuggestion: string }>>({});
  const [copiedCitation, setCopiedCitation] = useState<number | null>(null);
  const [history, setHistory] = useState<Array<{ id: number; createdAt: string; aiScore: number | null; plagiarismScore: number | null; wordCount: number | null; engine: string | null }>>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Realtime integrity check
  const realtimeResult = useRealtimeIntegrity(inputText, realtimeEnabled && !result);

  // Close project dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (projectDropdownRef.current && !projectDropdownRef.current.contains(e.target as Node)) {
        setProjectDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Clean up polling on unmount
  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  // Load projects list
  useEffect(() => {
    listProjectsForAnalysis()
      .then((p) => {
        setProjects(p);
        if (p.length > 0 && !selectedProjectId) {
          setSelectedProjectId(p[0].id);
        }
      })
      .catch(() => {});
  }, [selectedProjectId]);

  // Load active document when project changes
  useEffect(() => {
    if (sourceMode !== "document") return;

    setDocLoading(true);
    setError(null);

    getActiveDocumentForAnalysis(selectedProjectId)
      .then((doc) => {
        setActiveDoc(doc);
        if (doc) {
          setInputText(doc.plainText);
        } else {
          setInputText("");
        }
      })
      .catch(() => {
        setActiveDoc(null);
        setInputText("");
      })
      .finally(() => setDocLoading(false));
  }, [sourceMode, selectedProjectId]);

  // Poll for Copyleaks results when a scan is in progress
  useEffect(() => {
    if (!copyleaksScanId || copyleaksResult?.status === "completed") {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
      return;
    }

    const poll = async () => {
      try {
        const res = await fetch("/api/copyleaks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "results", scanId: copyleaksScanId }),
        });
        if (!res.ok) return;
        const data: CopyleaksResult = await res.json();
        setCopyleaksResult(data);
        if (data.status === "completed" || data.status === "error") {
          setCopyleaksLoading(false);
          if (pollRef.current) {
            clearInterval(pollRef.current);
            pollRef.current = null;
          }
        }
      } catch {
        // Silently continue polling
      }
    };

    // Poll immediately, then every 5 seconds
    poll();
    pollRef.current = setInterval(poll, 5000);

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [copyleaksScanId, copyleaksResult?.status]);

  const runCopyleaksScan = useCallback(async () => {
    setCopyleaksLoading(true);
    setCopyleaksResult(null);
    setCopyleaksScanId(null);

    try {
      const res = await fetch("/api/copyleaks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "scan", text: inputText }),
      });

      if (res.status === 503) {
        setCopyleaksAvailable(false);
        setCopyleaksLoading(false);
        return;
      }

      if (!res.ok) {
        setCopyleaksLoading(false);
        return;
      }

      const data = await res.json();
      setCopyleaksScanId(data.scanId);
      setCopyleaksAvailable(true);
    } catch {
      setCopyleaksLoading(false);
    }
  }, [inputText]);

  const runCheck = useCallback(async () => {
    if (!inputText.trim() || inputText.trim().length < 50) {
      setError("Please enter at least 50 characters of text to analyze.");
      return;
    }
    setLoading(true);
    setError(null);

    // Split into paragraphs for display
    const paras = inputText.split(/\n\n+/).filter((p) => p.trim().length > 0);
    setParagraphs(paras);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);

    try {
      const res = await fetch("/api/integrity-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, mode: "full" }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Check failed" }));
        setError(data.error || "Integrity check failed. Please try again.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("The check took too long. Please try again with shorter text.");
      } else {
        setError("Failed to connect to the analysis service. Please try again.");
      }
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  }, [inputText]);

  // Humanize a flagged paragraph
  const handleHumanize = useCallback(async (paragraphIndex: number, text: string) => {
    setHumanizeLoading(paragraphIndex);
    try {
      const res = await fetch("/api/integrity-check/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) return;
      const data = await res.json();
      setHumanizeResults((prev) => ({ ...prev, [paragraphIndex]: data }));
    } catch { /* silently fail */ } finally {
      setHumanizeLoading(null);
    }
  }, []);

  // Paraphrase a plagiarism match
  const handleParaphrase = useCallback(async (matchIndex: number, text: string, sourceTitle: string, sourceDoi?: string) => {
    setParaphraseLoading(matchIndex);
    try {
      const res = await fetch("/api/integrity-check/paraphrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, sourceTitle, sourceDoi }),
      });
      if (!res.ok) return;
      const data = await res.json();
      setParaphraseResults((prev) => ({ ...prev, [matchIndex]: data }));
    } catch { /* silently fail */ } finally {
      setParaphraseLoading(null);
    }
  }, []);

  // Download report
  const handleDownloadReport = useCallback(async () => {
    if (!result) return;
    try {
      const res = await fetch("/api/integrity-check/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result, text: inputText, documentTitle: activeDoc?.documentTitle }),
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `integrity-report-${new Date().toISOString().slice(0, 10)}.md`;
      a.click();
      URL.revokeObjectURL(url);
    } catch { /* silently fail */ }
  }, [result, inputText, activeDoc]);

  // Copy citation to clipboard
  const handleCopyCitation = useCallback((matchIndex: number, citation: string) => {
    navigator.clipboard.writeText(citation);
    setCopiedCitation(matchIndex);
    setTimeout(() => setCopiedCitation(null), 2000);
  }, []);

  // Load history
  const loadHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch("/api/integrity-check/history?limit=20");
      if (!res.ok) return;
      const data = await res.json();
      setHistory(data.checks ?? []);
    } catch { /* silently fail */ } finally {
      setHistoryLoading(false);
    }
  }, []);

  // Fetch history when switching to history tab
  useEffect(() => {
    if (pageTab === "history") loadHistory();
  }, [pageTab, loadHistory]);

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link href="/studio" className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-semibold text-ink">Integrity Check</h1>
          {/* Tab toggle: Check / History */}
          <div className="flex p-0.5 bg-surface-raised rounded-lg ml-3">
            <button
              onClick={() => setPageTab("check")}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                pageTab === "check" ? "bg-brand text-white" : "text-ink-muted hover:text-ink"
              )}
            >
              Check
            </button>
            <button
              onClick={() => setPageTab("history")}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                pageTab === "history" ? "bg-brand text-white" : "text-ink-muted hover:text-ink"
              )}
            >
              <ClockCounterClockwise size={13} />
              History
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!result && pageTab === "check" && (
            <>
              <div className="flex p-0.5 bg-surface-raised rounded-lg">
                <button
                  onClick={() => setSourceMode("document")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                    sourceMode === "document"
                      ? "bg-brand text-white"
                      : "text-ink-muted hover:text-ink"
                  )}
                >
                  <FileText size={14} />
                  From Document
                </button>
                <button
                  onClick={() => setSourceMode("paste")}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                    sourceMode === "paste"
                      ? "bg-brand text-white"
                      : "text-ink-muted hover:text-ink"
                  )}
                >
                  Paste Text
                </button>
              </div>
              {/* Realtime toggle (paste mode only) */}
              {sourceMode === "paste" && (
                <button
                  onClick={() => setRealtimeEnabled((v) => !v)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                    realtimeEnabled
                      ? "bg-brand/10 text-brand border-brand/30"
                      : "text-ink-muted border-border hover:text-ink"
                  )}
                >
                  <Lightning size={13} weight={realtimeEnabled ? "fill" : "regular"} />
                  Live
                  {realtimeResult.score !== null && realtimeEnabled && (
                    <span className={cn(
                      "ml-1 text-[10px] font-semibold",
                      realtimeResult.score > 60 ? "text-emerald-500" : realtimeResult.score > 40 ? "text-amber-500" : "text-orange-500"
                    )}>
                      {realtimeResult.score}%
                    </span>
                  )}
                  {realtimeResult.loading && (
                    <CircleNotch size={10} className="animate-spin ml-0.5" />
                  )}
                </button>
              )}
            </>
          )}
          {result && (
            <>
              {/* View toggle */}
              <div className="flex p-0.5 bg-surface-raised rounded-lg">
                <button
                  onClick={() => setViewMode("inline")}
                  className={cn("px-2.5 py-1.5 rounded-md text-xs font-medium transition-all", viewMode === "inline" ? "bg-brand text-white" : "text-ink-muted hover:text-ink")}
                >
                  Inline
                </button>
                <button
                  onClick={() => setViewMode("split")}
                  className={cn("flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all", viewMode === "split" ? "bg-brand text-white" : "text-ink-muted hover:text-ink")}
                >
                  <SplitHorizontal size={13} />
                  Split
                </button>
              </div>
              <button
                onClick={handleDownloadReport}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-ink text-sm font-medium hover:bg-surface-raised transition-colors"
              >
                <DownloadSimple size={16} />
                Download Report
              </button>
            </>
          )}
        </div>
      </div>

      {/* History Tab */}
      {pageTab === "history" && (
        <div className="flex-1 overflow-y-auto">
          <div className="glass-panel rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-ink mb-4">Check History</h2>
            {historyLoading ? (
              <div className="flex items-center justify-center py-12">
                <CircleNotch size={24} className="text-brand animate-spin" />
              </div>
            ) : history.length === 0 ? (
              <p className="text-xs text-ink-muted py-8 text-center">No integrity checks found. Run your first check to see history here.</p>
            ) : (
              <div className="space-y-2">
                {/* Sparkline trend */}
                {history.length >= 2 && (
                  <div className="mb-4 p-3 rounded-lg bg-surface-raised">
                    <p className="text-[10px] text-ink-muted mb-2">AI Score Trend (recent checks)</p>
                    <svg viewBox={`0 0 ${Math.max(history.length * 40, 200)} 60`} className="w-full h-12">
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-brand"
                        points={history.slice().reverse().map((h, i) => `${i * 40 + 20},${60 - (h.aiScore ?? 50) * 0.55}`).join(" ")}
                      />
                      {history.slice().reverse().map((h, i) => (
                        <circle key={i} cx={i * 40 + 20} cy={60 - (h.aiScore ?? 50) * 0.55} r="3" className="fill-brand" />
                      ))}
                    </svg>
                  </div>
                )}
                {history.map((h) => (
                  <div key={h.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-raised">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-ink-muted">{new Date(h.createdAt).toLocaleDateString()}</span>
                      <span className="text-xs text-ink">{h.wordCount ?? "?"} words</span>
                      {h.engine && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400">{h.engine}</span>}
                    </div>
                    <div className="flex items-center gap-4">
                      {h.aiScore !== null && (
                        <span className={cn("text-xs font-medium", (h.aiScore ?? 0) > 50 ? "text-orange-500" : "text-emerald-500")}>
                          AI: {h.aiScore}%
                        </span>
                      )}
                      {h.plagiarismScore !== null && (
                        <span className={cn("text-xs font-medium", (h.plagiarismScore ?? 0) > 15 ? "text-red-500" : "text-emerald-500")}>
                          Plag: {h.plagiarismScore}%
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Check Tab */}
      {pageTab === "check" && !result ? (
        /* Input Mode */
        <div className="flex-1 flex flex-col gap-4">
          {/* Project selector (document mode) */}
          {sourceMode === "document" && projects.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-ink-muted">Project:</span>
              <div ref={projectDropdownRef} className="relative">
                <button
                  onClick={() => setProjectDropdownOpen((v) => !v)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-ink bg-surface-raised border border-border hover:bg-surface-raised/80 transition-colors"
                >
                  <span className="truncate max-w-[200px]">{selectedProject?.title ?? "Select project"}</span>
                  <CaretDown size={12} />
                </button>
                {projectDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1 w-56 rounded-lg glass-panel border border-border shadow-lg z-50 py-1 max-h-60 overflow-y-auto">
                    {projects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSelectedProjectId(p.id);
                          setProjectDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 text-xs transition-colors",
                          p.id === selectedProjectId
                            ? "bg-brand/10 text-brand font-medium"
                            : "text-ink hover:bg-surface-raised"
                        )}
                      >
                        {p.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {activeDoc && (
                <span className="text-xs text-ink-muted">
                  Document: <span className="text-ink font-medium">{activeDoc.documentTitle}</span>
                </span>
              )}
            </div>
          )}

          {sourceMode === "document" && docLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <CircleNotch size={28} className="text-brand animate-spin" />
                <p className="text-sm text-ink-muted">Loading document...</p>
              </div>
            </div>
          ) : sourceMode === "document" && !activeDoc ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-center px-8">
                <FileText size={32} className="text-ink-muted" />
                <p className="text-sm text-ink-muted">No document found. Write something in the Studio first, or switch to paste mode.</p>
              </div>
            </div>
          ) : (
            <>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={sourceMode === "document"
                  ? "Document content loaded from your project..."
                  : "Paste your text here to check for AI-generated content, plagiarism indicators, and writing quality..."
                }
                className="flex-1 p-6 rounded-2xl glass-panel font-serif text-ink text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-brand/40"
                readOnly={sourceMode === "document"}
              />
              {error && (
                <p className="text-xs text-red-500 px-2">{error}</p>
              )}
              <div className="flex items-center justify-between">
                <p className="text-xs text-ink-muted">
                  {inputText.split(/\s+/).filter(Boolean).length} words
                  {activeDoc && sourceMode === "document" && (
                    <span className="ml-2 text-ink-muted/60">
                      from {activeDoc.documentTitle}
                    </span>
                  )}
                </p>
                <button
                  onClick={runCheck}
                  disabled={loading || inputText.trim().length < 50}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-50"
                >
                  <Sparkle size={16} />
                  {loading ? "Analyzing..." : "Run Integrity Check"}
                </button>
              </div>
            </>
          )}
        </div>
      ) : pageTab === "check" && result ? (
        /* Results Mode */
        <div className="flex gap-6 flex-1 overflow-hidden">
          {/* Text with Highlights / DiffView */}
          <div className="flex-1 overflow-y-auto">
            {viewMode === "split" ? (
              <DiffView paragraphs={paragraphs} result={result} />
            ) : (
              <div className="glass-panel rounded-2xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => { setResult(null); setParagraphs([]); setCopyleaksResult(null); setCopyleaksScanId(null); setCopyleaksAvailable(null); setHumanizeResults({}); setParaphraseResults({}); }}
                    className="text-xs text-brand hover:text-brand-hover font-medium"
                  >
                    &larr; Check New Text
                  </button>
                  <div className="flex items-center gap-2">
                    {result?.aiDetection.engine === "binoculars" && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-medium">
                        Binoculars
                      </span>
                    )}
                    {activeDoc && (
                      <span className="text-xs text-ink-muted">
                        {activeDoc.documentTitle}
                      </span>
                    )}
                  </div>
                </div>
                <div className="font-serif text-ink leading-relaxed space-y-4">
                  {paragraphs.map((p, i) => {
                    const analysis = result?.aiDetection.paragraphs.find((a) => a.paragraphIndex === i);
                    const aiProb = analysis ? 100 - analysis.humanProbability : 0;
                    return (
                      <div key={i}>
                        {/* Sentence-level highlighting */}
                        <div
                          className={cn(
                            "rounded-lg px-3 py-2",
                            aiProb > 60 && "bg-orange-500/10 border-l-2 border-orange-500",
                            aiProb > 30 && aiProb <= 60 && "bg-amber-500/5 border-l-2 border-amber-300",
                            aiProb <= 30 && "border-l-2 border-emerald-400"
                          )}
                        >
                          {analysis?.sentences && analysis.sentences.length > 0 ? (
                            <p>
                              {analysis.sentences.map((s, si) => (
                                <span
                                  key={si}
                                  className={cn(
                                    "rounded-sm",
                                    analysis.humanProbability < 30 && "bg-red-500/15",
                                    analysis.humanProbability >= 30 && analysis.humanProbability < 60 && "bg-amber-500/10"
                                  )}
                                  title={`Human probability: ${analysis.humanProbability}%`}
                                >
                                  {s.text}{" "}
                                </span>
                              ))}
                            </p>
                          ) : (
                            <p>{p}</p>
                          )}
                          {analysis?.flags && analysis.flags.length > 0 && (
                            <span className="block mt-1 text-[10px] text-ink-muted">
                              Flags: {analysis.flags.join(", ")}
                            </span>
                          )}
                        </div>
                        {/* Humanize result inline */}
                        {humanizeResults[i] && (
                          <div className="mt-2 ml-4 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                            <p className="text-[10px] font-medium text-emerald-500 mb-1">Humanized Version:</p>
                            <p className="text-xs text-ink leading-relaxed">{humanizeResults[i].rewritten}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {humanizeResults[i].changes.map((c, ci) => (
                                <span key={ci} className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">{c}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Report Panel */}
          <aside className="w-96 shrink-0 glass-panel rounded-2xl p-5 flex flex-col overflow-y-auto">
            {/* AI Detection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-ink">AI Content Detection</h3>
                <span className="text-[10px] text-ink-muted">
                  {result?.aiDetection.engine === "binoculars" ? "Binoculars + LLM" : "LLM Heuristic"}
                </span>
              </div>
              <div className="flex flex-col items-center mb-4">
                <CircularGauge
                  value={result?.aiDetection.humanScore}
                  label={result?.aiDetection.overallRisk === "low" ? "Low Risk" : result?.aiDetection.overallRisk === "medium" ? "Moderate Risk" : "High Risk"}
                  size={110}
                />
              </div>
              <div className="flex justify-between text-xs text-ink-muted mb-4 px-2">
                <span>Human: {result?.aiDetection.humanScore}%</span>
                <span>AI: {result?.aiDetection.aiScore}%</span>
              </div>

              <div className="space-y-3">
                {result?.aiDetection.paragraphs.map((p) => (
                  <div key={p.paragraphIndex} className="p-3 rounded-lg bg-surface-raised">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-ink">Paragraph {p.paragraphIndex + 1}</span>
                      <span className={cn(
                        "text-xs font-medium",
                        p.humanProbability < 40 ? "text-orange-500" : p.humanProbability < 70 ? "text-amber-500" : "text-emerald-500"
                      )}>
                        {p.humanProbability}% human
                      </span>
                    </div>
                    <ProgressBar
                      value={p.humanProbability}
                      max={100}
                      label=""
                      showText={false}
                      color={p.humanProbability < 40 ? "#f97316" : p.humanProbability < 70 ? "#eab308" : "#22c55e"}
                    />
                    {p.suggestion && (
                      <p className="mt-2 text-[10px] text-ink-muted">{p.suggestion}</p>
                    )}
                    {p.humanProbability < 40 && (
                      <button
                        onClick={() => handleHumanize(p.paragraphIndex, paragraphs[p.paragraphIndex] ?? "")}
                        disabled={humanizeLoading === p.paragraphIndex}
                        className="mt-2 text-xs font-medium text-brand hover:text-brand-hover transition-colors disabled:opacity-50"
                      >
                        {humanizeLoading === p.paragraphIndex ? (
                          <span className="flex items-center gap-1"><CircleNotch size={10} className="animate-spin" /> Humanizing...</span>
                        ) : humanizeResults[p.paragraphIndex] ? (
                          "✓ Humanized"
                        ) : (
                          "Humanize Text"
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Plagiarism — from built-in shingling engine */}
            <div className="border-t border-border-subtle pt-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-ink">Plagiarism Check</h3>
                {result?.plagiarism && (
                  <span className={cn(
                    "text-xs font-semibold",
                    result?.plagiarism.similarityScore > 30 ? "text-red-500" : result?.plagiarism.similarityScore > 15 ? "text-amber-500" : "text-emerald-500"
                  )}>
                    {result?.plagiarism.similarityScore}% similar
                  </span>
                )}
              </div>
              {!result?.plagiarism ? (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10">
                  <span className="text-[10px] text-amber-500">Upgrade to a paid plan for plagiarism scanning.</span>
                </div>
              ) : result?.plagiarism.matches.length === 0 ? (
                <p className="text-xs text-emerald-500">No plagiarism concerns detected across {result?.plagiarism.sourcesScanned} sources.</p>
              ) : (
                <div className="space-y-3">
                  <p className="text-[10px] text-ink-muted">
                    {result?.plagiarism.sourcesScanned} scholarly sources scanned
                  </p>
                  {result?.plagiarism.matches.map((match, i) => (
                    <div key={i} className="p-3 rounded-lg bg-surface-raised">
                      <div className="flex items-center justify-between mb-1">
                        <span className={cn(
                          "text-xs font-medium",
                          match.severity === "high" ? "text-red-500" : match.severity === "medium" ? "text-amber-500" : "text-emerald-500"
                        )}>
                          {(match.similarity * 100).toFixed(0)}% match
                        </span>
                        <span className={cn(
                          "text-[9px] px-1.5 py-0.5 rounded-full font-medium",
                          match.severity === "high" ? "bg-red-500/10 text-red-400" : match.severity === "medium" ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"
                        )}>
                          {match.severity}
                        </span>
                      </div>
                      <p className="text-xs text-ink-muted italic mb-1 line-clamp-2">&ldquo;{match.excerpt}&rdquo;</p>
                      <p className="text-[10px] text-ink truncate mb-2">
                        {match.source.title}
                        {match.source.year ? ` (${match.source.year})` : ""}
                      </p>
                      {match.source.doi && (
                        <a
                          href={`https://doi.org/${match.source.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[9px] text-brand hover:underline block mb-2"
                        >
                          DOI: {match.source.doi}
                        </a>
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const citation = `${match.source.title}${match.source.year ? ` (${match.source.year})` : ""}${match.source.doi ? `. DOI: ${match.source.doi}` : ""}`;
                            handleCopyCitation(i, citation);
                          }}
                          className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-brand bg-brand/10 hover:bg-brand/20 transition-colors"
                        >
                          {copiedCitation === i ? <Check size={12} /> : <BookOpen size={12} />}
                          {copiedCitation === i ? "Copied!" : "Add Citation"}
                        </button>
                        <button
                          onClick={() => handleParaphrase(i, match.excerpt, match.source.title, match.source.doi)}
                          disabled={paraphraseLoading === i}
                          className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-ink-muted bg-surface-raised hover:text-ink transition-colors disabled:opacity-50"
                        >
                          {paraphraseLoading === i ? <CircleNotch size={12} className="animate-spin" /> : <PenNib size={12} />}
                          {paraphraseLoading === i ? "Paraphrasing..." : "Paraphrase"}
                        </button>
                      </div>
                      {/* Paraphrase result inline */}
                      {paraphraseResults[i] && (
                        <div className="mt-2 p-2 rounded-lg bg-blue-500/5 border border-blue-500/20">
                          <p className="text-[10px] font-medium text-blue-400 mb-1">Paraphrased:</p>
                          <p className="text-xs text-ink leading-relaxed">{paraphraseResults[i].paraphrased}</p>
                          <p className="mt-1 text-[9px] text-ink-muted">Citation: {paraphraseResults[i].citationSuggestion}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Citation Audit */}
            {result?.citationAudit && (
              <div className="border-t border-border-subtle pt-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-ink">Citation Audit</h3>
                  <span className="text-xs text-ink-muted">
                    {result?.citationAudit.verifiedCitations}/{result?.citationAudit.totalCitations} verified
                  </span>
                </div>
                {result?.citationAudit.issues.length === 0 ? (
                  <p className="text-xs text-emerald-500">All citations verified successfully.</p>
                ) : (
                  <div className="space-y-2">
                    {result?.citationAudit.issues.slice(0, 8).map((issue, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-surface-raised">
                        <span className={cn(
                          "shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full",
                          issue.severity === "error" ? "bg-red-500" : issue.severity === "warning" ? "bg-amber-500" : "bg-blue-400"
                        )} />
                        <div>
                          <p className="text-[10px] text-ink">{issue.message}</p>
                          {issue.reference && (
                            <p className="text-[9px] text-ink-muted mt-0.5">Ref: {issue.reference}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Self-Plagiarism */}
            {result?.selfPlagiarism && result?.selfPlagiarism.matchedDocuments.length > 0 && (
              <div className="border-t border-border-subtle pt-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-ink">Self-Plagiarism</h3>
                  <span className={cn(
                    "text-xs font-semibold",
                    result?.selfPlagiarism.selfSimilarityScore > 30 ? "text-amber-500" : "text-emerald-500"
                  )}>
                    {result?.selfPlagiarism.selfSimilarityScore.toFixed(0)}% overlap
                  </span>
                </div>
                <div className="space-y-2">
                  {result?.selfPlagiarism.matchedDocuments.map((doc, i) => (
                    <div key={i} className="p-2 rounded-lg bg-surface-raised">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-ink-muted">{new Date(doc.checkedAt).toLocaleDateString()}</span>
                        <span className="text-xs font-medium text-amber-500">{(doc.similarity * 100).toFixed(0)}% similar</span>
                      </div>
                      <p className="text-[10px] text-ink-muted italic line-clamp-2">&ldquo;{doc.excerpt}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Copyleaks Source Matching (optional external scan) */}
            <div className="border-t border-border-subtle pt-6 mb-6">
              <h3 className="text-sm font-semibold text-ink mb-4">External Source Matching</h3>
              {copyleaksAvailable === false ? (
                <p className="text-xs text-ink-muted">
                  Configure Copyleaks API keys for additional source matching.
                </p>
              ) : copyleaksResult?.status === "completed" ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-ink">Score</span>
                    <span className={cn(
                      "text-xs font-semibold",
                      copyleaksResult.score > 30 ? "text-red-500" : copyleaksResult.score > 10 ? "text-amber-500" : "text-emerald-500"
                    )}>
                      {copyleaksResult.score}%
                    </span>
                  </div>
                  <ProgressBar
                    value={copyleaksResult.score}
                    max={100}
                    label=""
                    showText={false}
                    color={copyleaksResult.score > 30 ? "#ef4444" : copyleaksResult.score > 10 ? "#eab308" : "#22c55e"}
                  />
                  {copyleaksResult.sources.length === 0 ? (
                    <p className="text-xs text-emerald-500 mt-2">No matching sources found.</p>
                  ) : (
                    <div className="space-y-2 mt-3">
                      {copyleaksResult.sources.map((src: CopyleaksSource, i: number) => (
                        <div key={i} className="p-3 rounded-lg bg-surface-raised">
                          <div className="flex items-center justify-between mb-1">
                            <a
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-medium text-brand hover:text-brand-hover truncate max-w-[70%]"
                              title={src.title}
                            >
                              {src.title}
                            </a>
                            <span className={cn(
                              "text-xs font-medium shrink-0",
                              src.matchPercentage > 30 ? "text-red-500" : src.matchPercentage > 10 ? "text-amber-500" : "text-ink-muted"
                            )}>
                              {src.matchPercentage}% match
                            </span>
                          </div>
                          {src.matchedText && (
                            <p className="text-[10px] text-ink-muted italic mt-1 line-clamp-2">
                              &ldquo;{src.matchedText}&rdquo;
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : copyleaksLoading ? (
                <div className="flex items-center gap-2 text-xs text-ink-muted">
                  <div className="h-3 w-3 rounded-full border-2 border-brand border-t-transparent animate-spin" />
                  Scanning sources... This may take a minute.
                </div>
              ) : (
                <button
                  onClick={runCopyleaksScan}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-brand bg-brand/10 hover:bg-brand/20 transition-colors"
                >
                  <MagnifyingGlass size={14} />
                  Run External Scan
                </button>
              )}
            </div>

            {/* Writing Quality */}
            <div className="border-t border-border-subtle pt-6">
              <h3 className="text-sm font-semibold text-ink mb-4">Writing Quality</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-lg bg-surface-raised text-center">
                  <p className="text-lg font-semibold text-ink">{result.writingQuality.passiveVoiceCount}</p>
                  <p className="text-[10px] text-ink-muted">Passive Voice</p>
                </div>
                <div className="p-3 rounded-lg bg-surface-raised text-center">
                  <p className="text-lg font-semibold text-ink">{result.writingQuality.averageSentenceLength.toFixed(1)}</p>
                  <p className="text-[10px] text-ink-muted">Avg Words/Sentence</p>
                </div>
                <div className="col-span-2 p-3 rounded-lg bg-surface-raised text-center">
                  <p className="text-lg font-semibold text-ink">Grade {result.writingQuality.readabilityGrade.toFixed(1)}</p>
                  <p className="text-[10px] text-ink-muted">Readability Level</p>
                </div>
              </div>
              {result.writingQuality.suggestions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-ink-muted">Suggestions</p>
                  {result.writingQuality.suggestions.map((s, i) => (
                    <p key={i} className="text-xs text-ink-muted pl-3 border-l-2 border-brand/30">{s}</p>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
