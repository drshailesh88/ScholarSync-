"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Tabs } from "@/components/ui/tabs";
import { CircularGauge } from "@/components/ui/circular-gauge";
import { analyzeWriting, type WritingIssue, type WritingMetrics } from "@/lib/writing-analysis";

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

interface AnalysisResult {
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

export default function AnalysisPage() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("issues");

  // Client-side instant writing analysis (runs locally, no API calls)
  const [clientIssues, setClientIssues] = useState<WritingIssue[]>([]);
  const [clientMetrics, setClientMetrics] = useState<WritingMetrics | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!inputText.trim()) {
      setClientIssues([]);
      setClientMetrics(null);
      return;
    }

    debounceRef.current = setTimeout(() => {
      const { issues, metrics } = analyzeWriting(inputText);
      setClientIssues(issues);
      setClientMetrics(metrics);
    }, 500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [inputText]);

  const analysisTabs = [
    {
      key: "issues",
      label: "Issues",
      count: result ? result.writingQuality.suggestions.length : undefined,
    },
    { key: "metrics", label: "Detailed Metrics" },
  ];

  const runAnalysis = useCallback(async () => {
    if (!inputText.trim() || inputText.trim().length < 50) {
      setError("Please enter at least 50 characters of text to analyze.");
      return;
    }
    setLoading(true);
    setError(null);

    const paras = inputText.split(/\n\n+/).filter((p) => p.trim().length > 0);
    setParagraphs(paras);

    try {
      const res = await fetch("/api/integrity-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, mode: "full" }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Analysis failed" }));
        setError(data.error || "Writing analysis failed");
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

  const getReadabilityLabel = (grade: number): string => {
    if (grade >= 80) return "Excellent";
    if (grade >= 60) return "Good";
    if (grade >= 40) return "Needs Improvement";
    return "Poor";
  };

  const getParagraphBg = (humanProbability: number): string => {
    if (humanProbability < 40) return "bg-red-500/10 border-l-2 border-red-500";
    if (humanProbability <= 70) return "bg-yellow-500/10 border-l-2 border-yellow-400";
    return "bg-emerald-500/5 border-l-2 border-emerald-400";
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link href="/studio" className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-semibold text-ink">
            {result ? "Draft Analysis" : "Writing Analysis"}
          </h1>
        </div>
        {result && (
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs">
              <span className="w-3 h-3 rounded bg-red-500/30 border border-red-500" />
              Low Human (&lt;40%)
            </span>
            <span className="flex items-center gap-1.5 text-xs">
              <span className="w-3 h-3 rounded bg-yellow-500/30 border border-yellow-500" />
              Mixed (40-70%)
            </span>
            <span className="flex items-center gap-1.5 text-xs">
              <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500" />
              High Human (&gt;70%)
            </span>
          </div>
        )}
      </div>

      {!result ? (
        /* Input Mode */
        <div className="flex-1 flex flex-col gap-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your text here to analyze writing quality, detect AI-generated content, and get improvement suggestions..."
            className="flex-1 p-6 rounded-2xl glass-panel font-serif text-ink text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
          {/* Instant client-side metrics bar */}
          {clientMetrics && inputText.trim().length > 0 && (
            <div className="flex items-center gap-4 px-4 py-2.5 rounded-xl bg-surface-raised">
              <span className="text-xs text-ink-muted">
                <span className="font-medium text-ink">{clientMetrics.wordCount}</span> words
              </span>
              <span className="text-xs text-ink-muted">
                <span className="font-medium text-ink">{clientMetrics.sentenceCount}</span> sentences
              </span>
              <span className="text-xs text-ink-muted">
                Grade <span className="font-medium text-ink">{clientMetrics.fleschKincaidGrade}</span>
              </span>
              <span className="text-xs text-ink-muted">
                <span className="font-medium text-ink">{clientMetrics.passiveVoiceCount}</span> passive
              </span>
              <span className="text-xs text-ink-muted">
                {clientMetrics.readabilityLabel}
              </span>
              {clientIssues.length > 0 && (
                <span className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-600 text-xs font-medium">
                  {clientIssues.length} {clientIssues.length === 1 ? "issue" : "issues"}
                </span>
              )}
            </div>
          )}
          {error && (
            <p className="text-xs text-red-500 px-2">{error}</p>
          )}
          <div className="flex items-center justify-between">
            <p className="text-xs text-ink-muted">
              {inputText.split(/\s+/).filter(Boolean).length} words
            </p>
            <button
              onClick={runAnalysis}
              disabled={loading || inputText.trim().length < 50}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-50"
            >
              <Sparkle size={16} />
              {loading ? "Analyzing..." : "Analyze Writing"}
            </button>
          </div>
        </div>
      ) : (
        /* Results Mode */
        <div className="flex gap-6 flex-1 overflow-hidden">
          {/* Text with Paragraph Highlights */}
          <div className="flex-1 overflow-y-auto">
            <div className="glass-panel rounded-2xl p-8">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => {
                    setResult(null);
                    setParagraphs([]);
                    setActiveTab("issues");
                  }}
                  className="text-xs text-brand hover:text-brand-hover font-medium"
                >
                  ← Analyze New Text
                </button>
              </div>
              <div className="font-serif text-ink leading-relaxed space-y-4">
                {paragraphs.map((p, i) => {
                  const analysis = result.paragraphAnalysis.find(
                    (a) => a.paragraphIndex === i
                  );
                  const humanProb = analysis?.humanProbability ?? 100;
                  return (
                    <p
                      key={i}
                      className={cn("rounded-lg px-3 py-2", getParagraphBg(humanProb))}
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

          {/* Analysis Panel */}
          <aside className="w-96 shrink-0 glass-panel rounded-2xl p-5 flex flex-col overflow-hidden">
            <div className="flex flex-col items-center py-4 mb-4">
              <CircularGauge
                value={result.writingQuality.readabilityGrade}
                label={getReadabilityLabel(result.writingQuality.readabilityGrade)}
                size={120}
              />
            </div>

            <Tabs tabs={analysisTabs} activeTab={activeTab} onChange={setActiveTab} className="mb-4" />

            <div className="flex-1 overflow-y-auto">
              {activeTab === "issues" && (
                <div className="space-y-3">
                  {result.writingQuality.suggestions.length === 0 ? (
                    <p className="text-xs text-emerald-500 text-center py-4">
                      No issues detected. Your writing looks great!
                    </p>
                  ) : (
                    result.writingQuality.suggestions.map((suggestion, i) => (
                      <div key={i} className={cn("p-4 rounded-xl", "bg-purple-500/10")}>
                        <div className="flex items-center gap-2 mb-1">
                          <Sparkle size={14} className="text-purple-500" />
                          <span className="text-sm font-medium text-purple-500">
                            Suggestion {i + 1}
                          </span>
                        </div>
                        <p className="text-xs text-ink-muted">{suggestion}</p>
                      </div>
                    ))
                  )}

                  {/* Plagiarism Indicators */}
                  {result.plagiarismIndicators.length > 0 && (
                    <>
                      <div className="border-t border-border pt-3 mt-3">
                        <p className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-3">
                          Plagiarism Indicators
                        </p>
                      </div>
                      {result.plagiarismIndicators.map((indicator, i) => {
                        const severityColor =
                          indicator.severity === "high"
                            ? "text-red-500"
                            : indicator.severity === "medium"
                            ? "text-yellow-500"
                            : "text-ink-muted";
                        const severityBg =
                          indicator.severity === "high"
                            ? "bg-red-500/10"
                            : indicator.severity === "medium"
                            ? "bg-yellow-500/10"
                            : "bg-surface-raised";
                        return (
                          <div key={i} className={cn("p-4 rounded-xl", severityBg)}>
                            <div className="flex items-center gap-2 mb-1">
                              <Sparkle size={14} className={severityColor} />
                              <span className={cn("text-sm font-medium", severityColor)}>
                                {indicator.severity.toUpperCase()} Risk
                              </span>
                            </div>
                            <p className="text-xs text-ink-muted italic mb-1">
                              &ldquo;{indicator.excerpt}&rdquo;
                            </p>
                            <p className="text-xs text-ink-muted">{indicator.concern}</p>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              )}

              {activeTab === "metrics" && (
                <div className="space-y-5">
                  <div>
                    <h4 className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-3">
                      Readability
                    </h4>
                    <div className="space-y-3">
                      <MetricBar
                        label="Readability Grade"
                        value={result.writingQuality.readabilityGrade}
                        max={100}
                      />
                      <MetricBar
                        label="Avg Sentence Length"
                        value={result.writingQuality.averageSentenceLength}
                        max={40}
                        suffix=" words"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-3">
                      Writing Quality
                    </h4>
                    <div className="space-y-3">
                      <MetricBar
                        label="Passive Voice"
                        value={result.writingQuality.passiveVoiceCount}
                        max={Math.max(result.writingQuality.passiveVoiceCount, 10)}
                        suffix=" instances"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-3">
                      AI Detection
                    </h4>
                    <div className="space-y-2">
                      <ToneBadge
                        label="Human Score"
                        value={`${result.humanScore}%`}
                        color={result.humanScore >= 70 ? "emerald" : result.humanScore >= 40 ? "yellow" : "red"}
                      />
                      <ToneBadge
                        label="AI Score"
                        value={`${result.aiScore}%`}
                        color={result.aiScore <= 30 ? "emerald" : result.aiScore <= 60 ? "yellow" : "red"}
                      />
                      <ToneBadge
                        label="Overall Risk"
                        value={result.overallRisk.charAt(0).toUpperCase() + result.overallRisk.slice(1)}
                        color={result.overallRisk === "low" ? "emerald" : result.overallRisk === "medium" ? "yellow" : "red"}
                      />
                    </div>
                  </div>
                  {/* Per-paragraph breakdown */}
                  {result.paragraphAnalysis.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-3">
                        Paragraph Breakdown
                      </h4>
                      <div className="space-y-2">
                        {result.paragraphAnalysis.map((p) => (
                          <div key={p.paragraphIndex} className="flex items-center justify-between">
                            <span className="text-xs text-ink-muted">
                              Paragraph {p.paragraphIndex + 1}
                            </span>
                            <span
                              className={cn(
                                "px-2 py-0.5 rounded-full text-xs font-medium",
                                p.humanProbability < 40
                                  ? "bg-red-500/10 text-red-500"
                                  : p.humanProbability <= 70
                                  ? "bg-yellow-500/10 text-yellow-500"
                                  : "bg-emerald-500/10 text-emerald-500"
                              )}
                            >
                              {p.humanProbability}% human
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function MetricBar({ label, value, max, suffix }: { label: string; value: number; max: number; suffix?: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-ink-muted">{label}</span>
        <span className="text-ink font-medium">{value}{suffix}</span>
      </div>
      <div className="h-1.5 rounded-full bg-surface-raised overflow-hidden">
        <div
          className="h-full rounded-full bg-brand transition-all"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );
}

function ToneBadge({ label, value, color }: { label: string; value: string; color: string }) {
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-500/10 text-emerald-500",
    yellow: "bg-yellow-500/10 text-yellow-500",
    red: "bg-red-500/10 text-red-500",
  };
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-ink-muted">{label}</span>
      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", colorMap[color])}>{value}</span>
    </div>
  );
}
