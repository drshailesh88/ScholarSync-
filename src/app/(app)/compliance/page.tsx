"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, PenNib, DownloadSimple, Sparkle, MagnifyingGlass, CircleNotch, CaretDown, FileText } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { CircularGauge } from "@/components/ui/circular-gauge";
import { ProgressBar } from "@/components/ui/progress-bar";
import {
  getActiveDocumentForAnalysis,
  listProjectsForAnalysis,
  type DocumentForAnalysis,
} from "@/lib/actions/analysis";

interface ParagraphAnalysis {
  paragraphIndex: number;
  humanProbability: number;
  flags: string[];
  suggestion?: string;
}

interface PlagiarismIndicator {
  excerpt: string;
  concern: string;
  severity: "low" | "medium" | "high";
}

interface CopyleaksSource {
  url: string;
  title: string;
  matchPercentage: number;
  matchedText: string;
}

interface CopyleaksResult {
  scanId: string;
  status: "completed" | "pending" | "error";
  score: number;
  sources: CopyleaksSource[];
}

interface IntegrityResult {
  humanScore: number;
  aiScore: number;
  overallRisk: "low" | "medium" | "high";
  paragraphAnalysis: ParagraphAnalysis[];
  plagiarismIndicators: PlagiarismIndicator[];
  writingQuality: {
    passiveVoiceCount: number;
    averageSentenceLength: number;
    readabilityGrade: number;
    suggestions: string[];
  };
}

type SourceMode = "document" | "paste";

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
  const [result, setResult] = useState<IntegrityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  // Copyleaks plagiarism scan state
  const [copyleaksScanId, setCopyleaksScanId] = useState<string | null>(null);
  const [copyleaksResult, setCopyleaksResult] = useState<CopyleaksResult | null>(null);
  const [copyleaksLoading, setCopyleaksLoading] = useState(false);
  const [copyleaksAvailable, setCopyleaksAvailable] = useState<boolean | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
  }, []);

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

    try {
      const res = await fetch("/api/integrity-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, mode: "full" }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Check failed" }));
        setError(data.error || "Integrity check failed");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch {
      setError("Failed to connect. Check your API key.");
    } finally {
      setLoading(false);
    }
  }, [inputText]);

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
        </div>
        <div className="flex items-center gap-3">
          {!result && (
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
          )}
          {result && (
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-ink text-sm font-medium hover:bg-surface-raised transition-colors">
              <DownloadSimple size={16} />
              Download Report
            </button>
          )}
        </div>
      </div>

      {!result ? (
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
      ) : (
        /* Results Mode */
        <div className="flex gap-6 flex-1 overflow-hidden">
          {/* Text with Highlights */}
          <div className="flex-1 overflow-y-auto">
            <div className="glass-panel rounded-2xl p-8">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => { setResult(null); setParagraphs([]); setCopyleaksResult(null); setCopyleaksScanId(null); setCopyleaksAvailable(null); }}
                  className="text-xs text-brand hover:text-brand-hover font-medium"
                >
                  &larr; Check New Text
                </button>
                {activeDoc && (
                  <span className="text-xs text-ink-muted">
                    {activeDoc.documentTitle}
                  </span>
                )}
              </div>
              <div className="font-serif text-ink leading-relaxed space-y-4">
                {paragraphs.map((p, i) => {
                  const analysis = result.paragraphAnalysis.find((a) => a.paragraphIndex === i);
                  const prob = analysis ? 100 - analysis.humanProbability : 0;
                  return (
                    <p
                      key={i}
                      className={cn(
                        "rounded-lg px-3 py-2",
                        prob > 60 && "bg-orange-500/10 border-l-2 border-orange-500",
                        prob > 30 && prob <= 60 && "bg-amber-500/5 border-l-2 border-amber-300",
                        prob <= 30 && "border-l-2 border-emerald-400"
                      )}
                    >
                      {p}
                      {analysis?.flags && analysis.flags.length > 0 && (
                        <span className="block mt-1 text-[10px] text-ink-muted">
                          Flags: {analysis.flags.join(", ")}
                        </span>
                      )}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Report Panel */}
          <aside className="w-96 shrink-0 glass-panel rounded-2xl p-5 flex flex-col overflow-y-auto">
            {/* AI Detection */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-ink mb-4">AI Content Detection</h3>
              <div className="flex flex-col items-center mb-4">
                <CircularGauge
                  value={result.humanScore}
                  label={result.overallRisk === "low" ? "Low Risk" : result.overallRisk === "medium" ? "Moderate Risk" : "High Risk"}
                  size={110}
                />
              </div>
              <div className="flex justify-between text-xs text-ink-muted mb-4 px-2">
                <span>Human: {result.humanScore}%</span>
                <span>AI: {result.aiScore}%</span>
              </div>

              <div className="space-y-3">
                {result.paragraphAnalysis.map((p) => (
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
                      <button className="mt-2 text-xs font-medium text-brand hover:text-brand-hover transition-colors">
                        Humanize Text
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Plagiarism */}
            <div className="border-t border-border-subtle pt-6 mb-6">
              <h3 className="text-sm font-semibold text-ink mb-4">Plagiarism Indicators</h3>
              {result.plagiarismIndicators.length === 0 ? (
                <p className="text-xs text-emerald-500">No plagiarism concerns detected.</p>
              ) : (
                <div className="space-y-3">
                  {result.plagiarismIndicators.map((match, i) => (
                    <div key={i} className="p-3 rounded-lg bg-surface-raised">
                      <div className="flex items-center justify-between mb-1">
                        <span className={cn(
                          "text-xs font-medium",
                          match.severity === "high" ? "text-red-500" : match.severity === "medium" ? "text-amber-500" : "text-ink"
                        )}>
                          {match.severity.toUpperCase()} risk
                        </span>
                      </div>
                      <p className="text-xs text-ink-muted italic mb-1">&ldquo;{match.excerpt}&rdquo;</p>
                      <p className="text-[10px] text-ink-muted mb-2">{match.concern}</p>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-brand bg-brand/10 hover:bg-brand/20 transition-colors">
                          <BookOpen size={12} />
                          Add Citation
                        </button>
                        <button className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-ink-muted bg-surface-raised hover:text-ink transition-colors">
                          <PenNib size={12} />
                          Paraphrase
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Copyleaks Plagiarism Scan */}
            <div className="border-t border-border-subtle pt-6 mb-6">
              <h3 className="text-sm font-semibold text-ink mb-4">Source Matching</h3>
              {copyleaksAvailable === false ? (
                <p className="text-xs text-ink-muted">
                  Configure Copyleaks API keys for source matching
                </p>
              ) : copyleaksResult?.status === "completed" ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-ink">
                      Plagiarism Score
                    </span>
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
                      {copyleaksResult.sources.map((src, i) => (
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
                  Run Plagiarism Scan
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
                  <p className="text-lg font-semibold text-ink">{result.writingQuality.averageSentenceLength}</p>
                  <p className="text-[10px] text-ink-muted">Avg Words/Sentence</p>
                </div>
                <div className="col-span-2 p-3 rounded-lg bg-surface-raised text-center">
                  <p className="text-lg font-semibold text-ink">Grade {result.writingQuality.readabilityGrade}</p>
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
      )}
    </div>
  );
}
