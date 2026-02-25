"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Search,
  Zap,
  Layers,
  Database,
  AlertCircle,
  Microscope,
  StopCircle,
} from "lucide-react";
import {
  ResearchDocument,
  LegacyReportView,
  ExportButtons,
  ResearchPlanPreview,
  ProgressStepper,
  buildStagesFromEvents,
  SaveToLibraryButton,
  RESEARCH_MODES,
} from "@/components/deep-research";
import type {
  ResearchMode,
  EnhancedSynthesisReport,
  SynthesisReport,
  PlanPerspective,
  DeepResearchSource,
  ProgressStage,
} from "@/components/deep-research";

// ── Mode icon mapping ───────────────────────────────────────────────
const MODE_ICONS: Record<ResearchMode, typeof Zap> = {
  quick: Zap,
  standard: Search,
  deep: Layers,
  exhaustive: Database,
};

// ── Page state types ────────────────────────────────────────────────
type PageState = "idle" | "plan-preview" | "running" | "done" | "error";

// ── Streaming section type ──────────────────────────────────────────
interface StreamingSection {
  markdown: string;
  animating: boolean;
}

export default function DeepResearchPage() {
  // Input state
  const [topic, setTopic] = useState("");
  const [mode, setMode] = useState<ResearchMode>("standard");

  // Page flow state
  const [pageState, setPageState] = useState<PageState>("idle");
  const [error, setError] = useState<string | null>(null);

  // Research plan state
  const [planPerspectives, setPlanPerspectives] = useState<PlanPerspective[]>([]);

  // Progress state
  const [progressStages, setProgressStages] = useState<ProgressStage[]>([]);
  const [progressMessage, setProgressMessage] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);
  const [seenStageIds, setSeenStageIds] = useState<string[]>([]);
  const [currentStageId, setCurrentStageId] = useState<string | null>(null);

  // Streaming sections
  const [streamingSections, setStreamingSections] = useState<StreamingSection[]>([]);

  // Final report state
  const [report, setReport] = useState<EnhancedSynthesisReport | SynthesisReport | null>(null);

  // Abort controller
  const abortRef = useRef<AbortController | null>(null);

  // Update progress stages whenever seen/current changes
  useEffect(() => {
    if (pageState === "running") {
      setProgressStages(buildStagesFromEvents(seenStageIds, currentStageId));
    }
  }, [seenStageIds, currentStageId, pageState]);

  // ── Start research (direct or after plan confirm) ─────────────────
  const startResearch = useCallback(
    async (confirmedPerspectives?: PlanPerspective[]) => {
      if (!topic.trim()) return;

      setPageState("running");
      setError(null);
      setReport(null);
      setStreamingSections([]);
      setSeenStageIds([]);
      setCurrentStageId(null);
      setProgressPercent(0);
      setProgressMessage("Initializing research...");

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const body: Record<string, unknown> = { topic: topic.trim(), mode };
        if (confirmedPerspectives) {
          body.perspectives = confirmedPerspectives;
        }

        const response = await fetch("/api/deep-research", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: controller.signal,
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || `Research failed (${response.status})`);
        }

        if (!response.body) {
          throw new Error("No response stream");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const dataStr = line.slice(6).trim();
            if (!dataStr || dataStr === "[DONE]") continue;

            try {
              const event = JSON.parse(dataStr);

              switch (event.type) {
                case "progress": {
                  const stage = event.stage as string;
                  const message = event.message as string;
                  const progress = event.progress as number;

                  setProgressMessage(message);
                  if (progress) setProgressPercent(progress);

                  if (stage && stage !== currentStageId) {
                    setSeenStageIds((prev) => {
                      if (currentStageId && !prev.includes(currentStageId)) {
                        return [...prev, currentStageId];
                      }
                      return prev;
                    });
                    setCurrentStageId(stage);
                  }
                  break;
                }

                case "perspectives": {
                  // Got perspectives from backend — show plan preview
                  const perspectives = event.perspectives as PlanPerspective[];
                  if (perspectives && perspectives.length > 0 && !confirmedPerspectives) {
                    setPlanPerspectives(perspectives);
                    // Note: we stay in running state since we already started
                    // The plan preview is only shown on the first phase (before confirmedPerspectives)
                  }
                  break;
                }

                case "section": {
                  // Streaming section of markdown
                  const markdown = event.markdown as string;
                  if (markdown) {
                    setStreamingSections((prev) => [
                      ...prev,
                      { markdown, animating: true },
                    ]);
                    // Mark as not animating after delay
                    setTimeout(() => {
                      setStreamingSections((prev) =>
                        prev.map((s, i) =>
                          i === prev.length - 1 ? { ...s, animating: false } : s
                        )
                      );
                    }, 800);
                  }
                  break;
                }

                case "report": {
                  setReport(event.report);
                  setPageState("done");
                  setProgressPercent(100);
                  // Mark all remaining stages as completed
                  setSeenStageIds((prev) => {
                    const all = [
                      "search-round-1", "citation-traversal", "search-round-2",
                      "data-extraction", "synthesis-perspectives", "synthesis-summary",
                      "synthesis-tables", "synthesis-critique",
                    ];
                    return all.filter((id) => prev.includes(id) || id === currentStageId || true);
                  });
                  setCurrentStageId(null);
                  break;
                }

                case "error": {
                  throw new Error(event.error || "Research failed");
                }
              }
            } catch (parseErr) {
              // Skip malformed JSON lines
              if (parseErr instanceof SyntaxError) continue;
              throw parseErr;
            }
          }
        }

        // If no report event was received but stream ended, check if we got sections
        if (pageState !== "done" && streamingSections.length > 0) {
          setPageState("done");
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          setPageState("idle");
          return;
        }
        setError(err instanceof Error ? err.message : "An error occurred");
        setPageState("error");
      } finally {
        abortRef.current = null;
      }
    },
    [topic, mode, currentStageId, pageState, streamingSections.length]
  );

  // ── Handle initial start button ───────────────────────────────────
  const handleStart = useCallback(() => {
    startResearch();
  }, [startResearch]);

  // ── Handle plan confirmation ──────────────────────────────────────
  const handlePlanConfirm = useCallback(
    (perspectives: PlanPerspective[]) => {
      setPlanPerspectives([]);
      startResearch(perspectives);
    },
    [startResearch]
  );

  // ── Handle plan regeneration ──────────────────────────────────────
  const handlePlanRegenerate = useCallback(() => {
    // Re-trigger the research to get new perspectives
    startResearch();
  }, [startResearch]);

  // ── Abort research ────────────────────────────────────────────────
  const handleAbort = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    setPageState("idle");
  }, []);

  // ── Handle key press ──────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey && topic.trim() && pageState === "idle") {
        e.preventDefault();
        handleStart();
      }
    },
    [topic, pageState, handleStart]
  );

  // ── Determine if report has markdownReport (enhanced) ─────────────
  const isEnhancedReport = report && "markdownReport" in report && (report as EnhancedSynthesisReport).markdownReport;
  const enhancedReport = isEnhancedReport ? (report as EnhancedSynthesisReport) : null;
  const sources: DeepResearchSource[] = report?.sources || [];

  // ── Build combined streaming markdown ─────────────────────────────
  const streamingMarkdown = streamingSections.map((s) => s.markdown).join("\n\n");

  return (
    <div className="flex-1 min-h-screen bg-gray-950">
      {/* Header area - always visible */}
      <div className="sticky top-0 z-20 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Microscope size={18} className="text-blue-400" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Deep Research</h1>
                <p className="text-xs text-gray-500">Multi-perspective literature synthesis</p>
              </div>
            </div>

            {/* Export & Save buttons - visible when done */}
            {pageState === "done" && report && (
              <div className="flex items-center gap-3">
                {enhancedReport?.markdownReport && (
                  <ExportButtons
                    markdownReport={enhancedReport.markdownReport}
                    topic={report.topic}
                  />
                )}
                <SaveToLibraryButton
                  topic={report.topic}
                  mode={report.mode}
                  markdownReport={enhancedReport?.markdownReport || ""}
                  sources={sources}
                  keyFindings={report.keyFindings}
                  gaps={report.gaps}
                  isComplete={pageState === "done"}
                />
              </div>
            )}

            {/* Abort button - visible when running */}
            {pageState === "running" && (
              <button
                onClick={handleAbort}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors"
              >
                <StopCircle size={16} />
                Stop
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Idle State: Input form ──────────────────────────────── */}
        {pageState === "idle" && (
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Hero text */}
            <div className="text-center space-y-3 pt-12">
              <h2 className="text-3xl font-bold text-white">
                What would you like to research?
              </h2>
              <p className="text-gray-400 text-base max-w-lg mx-auto">
                Enter a research topic and we will synthesize findings from multiple
                academic perspectives with full citations.
              </p>
            </div>

            {/* Topic input */}
            <div className="relative">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., Efficacy of GLP-1 receptor agonists in type 2 diabetes management"
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-5 py-4 text-white text-base placeholder-gray-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Mode selector - segmented control */}
            <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-1.5 flex gap-1">
              {RESEARCH_MODES.map((m) => {
                const Icon = MODE_ICONS[m.id];
                const isSelected = mode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`flex-1 flex flex-col items-center gap-1.5 px-3 py-3 rounded-lg text-center transition-all ${
                      isSelected
                        ? "bg-gray-700/60 border border-gray-600/50 shadow-sm"
                        : "hover:bg-gray-800/40"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={isSelected ? "text-blue-400" : "text-gray-500"}
                    />
                    <span
                      className={`text-sm font-medium ${
                        isSelected ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {m.label}
                    </span>
                    <span className="text-[10px] text-gray-500">{m.estimatedTime}</span>
                  </button>
                );
              })}
            </div>

            {/* Start button */}
            <button
              onClick={handleStart}
              disabled={!topic.trim()}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-base rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Search size={18} />
              Start Deep Research
            </button>
          </div>
        )}

        {/* ── Plan Preview State ─────────────────────────────────── */}
        {pageState === "running" && planPerspectives.length > 0 && (
          <div className="py-8">
            <ResearchPlanPreview
              perspectives={planPerspectives}
              onConfirm={handlePlanConfirm}
              onRegenerate={handlePlanRegenerate}
            />
          </div>
        )}

        {/* ── Running State: Progress + Streaming ────────────────── */}
        {pageState === "running" && planPerspectives.length === 0 && (
          <div className="flex gap-8">
            {/* Progress stepper on the left */}
            <ProgressStepper
              stages={progressStages}
              currentMessage={progressMessage}
              progress={progressPercent}
            />

            {/* Streaming content on the right */}
            <div className="flex-1 min-w-0">
              {streamingSections.length > 0 ? (
                <div className="max-w-4xl mx-auto space-y-6">
                  {streamingSections.map((section, idx) => (
                    <div
                      key={idx}
                      className={`transition-all duration-700 ${
                        section.animating
                          ? "opacity-0 translate-y-4"
                          : "opacity-100 translate-y-0"
                      }`}
                    >
                      <ResearchDocument
                        markdownReport={section.markdown}
                        sources={sources}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Microscope size={28} className="text-blue-400 animate-pulse" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{progressMessage}</p>
                      <p className="text-gray-500 text-sm mt-1">
                        Researching: {topic}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Done State: Full Report ────────────────────────────── */}
        {pageState === "done" && report && (
          <div>
            {/* Topic & mode header */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">{report.topic}</h2>
              <div className="flex items-center justify-center gap-3 text-sm text-gray-400">
                <span className="capitalize">{report.mode} mode</span>
                <span>&middot;</span>
                <span>{report.totalSources} sources analyzed</span>
              </div>
            </div>

            {/* Render enhanced markdown report or legacy card view */}
            {enhancedReport?.markdownReport ? (
              <ResearchDocument
                markdownReport={enhancedReport.markdownReport}
                sources={sources}
              />
            ) : (
              <LegacyReportView report={report as SynthesisReport} />
            )}

            {/* New research button */}
            <div className="max-w-4xl mx-auto mt-12 text-center print:hidden">
              <button
                onClick={() => {
                  setPageState("idle");
                  setReport(null);
                  setStreamingSections([]);
                  setProgressStages([]);
                  setTopic("");
                }}
                className="px-6 py-2.5 text-sm font-medium text-gray-300 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-700/50 hover:text-white transition-colors"
              >
                Start New Research
              </button>
            </div>
          </div>
        )}

        {/* ── Error State ────────────────────────────────────────── */}
        {pageState === "error" && (
          <div className="max-w-lg mx-auto text-center space-y-4 pt-20">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertCircle size={28} className="text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Research Failed</h3>
            <p className="text-gray-400 text-sm">{error}</p>
            <button
              onClick={() => {
                setPageState("idle");
                setError(null);
              }}
              className="px-6 py-2.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
