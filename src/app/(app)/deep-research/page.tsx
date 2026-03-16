"use client";

import { useState, useCallback, useRef } from "react";
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
  PastResearchSessions,
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

  // Refs to track stage progression inside the SSE loop (avoids stale closure)
  const seenStageIdsRef = useRef<string[]>([]);
  const currentStageIdRef = useRef<string | null>(null);

  // Streaming sections
  const [streamingSections, setStreamingSections] = useState<StreamingSection[]>([]);

  // Final report state
  const [report, setReport] = useState<EnhancedSynthesisReport | SynthesisReport | null>(null);

  // Abort controller
  const abortRef = useRef<AbortController | null>(null);

  // ── Shared SSE reader utility ────────────────────────────────────
  const readSSEStream = useCallback(
    async (
      response: Response,
      handlers: {
        onProgress?: (stage: string, message: string, progress?: number) => void;
        onPerspectives?: (perspectives: PlanPerspective[]) => void;
        onSection?: (markdown: string) => void;
        onReport?: (report: EnhancedSynthesisReport | SynthesisReport) => void;
        onError?: (error: string) => void;
      }
    ) => {
      if (!response.body) throw new Error("No response stream");

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
              case "progress":
                handlers.onProgress?.(event.stage, event.message, event.progress);
                break;
              case "perspectives":
                handlers.onPerspectives?.(event.perspectives);
                break;
              case "section":
                if (event.markdown) handlers.onSection?.(event.markdown);
                break;
              case "report":
                handlers.onReport?.(event.report);
                break;
              case "error":
                throw new Error(event.error || "Research failed");
            }
          } catch (parseErr) {
            if (parseErr instanceof SyntaxError) continue;
            throw parseErr;
          }
        }
      }
    },
    []
  );

  // ── Phase 1: Generate research plan (perspectives) ─────────────────
  const fetchPlan = useCallback(
    async () => {
      if (!topic.trim()) return;

      setPageState("plan-preview");
      setError(null);
      setPlanPerspectives([]);
      setProgressMessage("Generating research plan...");

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch("/api/deep-research/plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: topic.trim(), mode }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || `Plan generation failed (${response.status})`);
        }

        await readSSEStream(response, {
          onProgress: (_stage, message) => {
            setProgressMessage(message);
          },
          onPerspectives: (perspectives) => {
            setPlanPerspectives(perspectives);
          },
          onError: (err) => {
            throw new Error(err);
          },
        });
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          setPageState("idle");
          return;
        }
        setError(err instanceof Error ? err.message : "Unable to complete the operation. Please try again.");
        setPageState("error");
      } finally {
        abortRef.current = null;
      }
    },
    [topic, mode, readSSEStream]
  );

  // ── Phase 2: Execute research with confirmed perspectives ──────────
  const executeResearch = useCallback(
    async (confirmedPerspectives: PlanPerspective[]) => {
      if (!topic.trim()) return;

      setPageState("running");
      setError(null);
      setReport(null);
      setStreamingSections([]);
      seenStageIdsRef.current = [];
      currentStageIdRef.current = null;
      setProgressStages(buildStagesFromEvents([], null));
      setProgressPercent(0);
      setProgressMessage("Starting research...");

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch("/api/deep-research/execute", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: topic.trim(),
            mode,
            perspectives: confirmedPerspectives,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || `Research failed (${response.status})`);
        }

        await readSSEStream(response, {
          onProgress: (stage, message, progress) => {
            setProgressMessage(message);
            if (progress) setProgressPercent(progress);

            if (stage && stage !== currentStageIdRef.current) {
              const prevStage = currentStageIdRef.current;
              if (prevStage && !seenStageIdsRef.current.includes(prevStage)) {
                seenStageIdsRef.current = [...seenStageIdsRef.current, prevStage];
              }
              currentStageIdRef.current = stage;
              setProgressStages(
                buildStagesFromEvents(seenStageIdsRef.current, stage)
              );
            }
          },
          onSection: (markdown) => {
            setStreamingSections((prev) => [
              ...prev,
              { markdown, animating: true },
            ]);
            setTimeout(() => {
              setStreamingSections((prev) =>
                prev.map((s, i) =>
                  i === prev.length - 1 ? { ...s, animating: false } : s
                )
              );
            }, 800);
          },
          onReport: (reportData) => {
            setReport(reportData);
            setPageState("done");
            setProgressPercent(100);
            const allCompleted = [
              "search-round-1", "citation-traversal", "search-round-2",
              "full-text-extraction", "data-extraction",
              "synthesis-perspectives", "synthesis-summary",
              "synthesis-tables", "synthesis-critique",
            ];
            seenStageIdsRef.current = allCompleted;
            currentStageIdRef.current = null;
            setProgressStages(buildStagesFromEvents(allCompleted, null));
          },
        });

        setPageState((prev) => (prev === "running" ? "done" : prev));
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          setPageState("idle");
          return;
        }
        setError(err instanceof Error ? err.message : "Unable to complete the operation. Please try again.");
        setPageState("error");
      } finally {
        abortRef.current = null;
      }
    },
    [topic, mode, readSSEStream]
  );

  // ── Handle initial start button ───────────────────────────────────
  const handleStart = useCallback(() => {
    fetchPlan();
  }, [fetchPlan]);

  // ── Handle plan confirmation ──────────────────────────────────────
  const handlePlanConfirm = useCallback(
    (perspectives: PlanPerspective[]) => {
      setPlanPerspectives([]);
      executeResearch(perspectives);
    },
    [executeResearch]
  );

  // ── Handle plan regeneration ──────────────────────────────────────
  const handlePlanRegenerate = useCallback(() => {
    fetchPlan();
  }, [fetchPlan]);

  // ── Abort research ────────────────────────────────────────────────
  const handleAbort = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    setPlanPerspectives([]);
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

  // ── Load a saved session ──────────────────────────────────────────
  const handleLoadSession = useCallback(async (sessionId: number) => {
    try {
      setPageState("running");
      setProgressMessage("Loading saved research...");

      const res = await fetch(`/api/deep-research/sessions/${sessionId}`);
      if (!res.ok) throw new Error("Failed to load session");
      const data = await res.json();

      const loadedReport: EnhancedSynthesisReport = {
        topic: data.topic,
        mode: data.mode,
        summary: "",
        keyFindings: data.keyFindings || [],
        perspectives: [],
        gaps: data.gaps || [],
        contradictions: [],
        totalSources: data.sources?.length || 0,
        sources: data.sources || [],
        markdownReport: data.markdownReport,
      };

      setReport(loadedReport);
      setTopic(data.topic);
      setMode(data.mode as ResearchMode);
      setPageState("done");
    } catch {
      setError("Failed to load saved research");
      setPageState("error");
    }
  }, []);

  // ── Determine if report has markdownReport (enhanced) ─────────────
  const isEnhancedReport = report && "markdownReport" in report && (report as EnhancedSynthesisReport).markdownReport;
  const enhancedReport = isEnhancedReport ? (report as EnhancedSynthesisReport) : null;
  const sources: DeepResearchSource[] = report?.sources || [];

  // ── Build combined streaming markdown ─────────────────────────────
  const _streamingMarkdown = streamingSections.map((s) => s.markdown).join("\n\n");

  return (
    <div className="flex-1 min-h-screen bg-white dark:bg-gray-950">
      {/* Header area - always visible */}
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800/50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Microscope size={18} className="text-blue-400" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">Deep Research</h1>
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
                    sources={sources}
                    keyFindings={report.keyFindings}
                    gaps={report.gaps}
                    mode={report.mode}
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

            {/* Abort button - visible when running or plan-preview */}
            {(pageState === "running" || pageState === "plan-preview") && (
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
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                What would you like to research?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-base max-w-lg mx-auto">
                Enter a research topic and we will synthesize findings from multiple
                academic perspectives with full citations.
              </p>
            </div>

            {/* Topic input */}
            <div className="relative">
              <input aria-label="Text input"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., Efficacy of GLP-1 receptor agonists in type 2 diabetes management"
                className="w-full bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl px-5 py-4 text-gray-900 dark:text-white text-base placeholder-gray-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Mode selector - segmented control */}
            <div className="bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/30 rounded-xl p-1.5 flex gap-1">
              {RESEARCH_MODES.map((m) => {
                const Icon = MODE_ICONS[m.id];
                const isSelected = mode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`flex-1 flex flex-col items-center gap-1.5 px-3 py-3 rounded-lg text-center transition-all ${
                      isSelected
                        ? "bg-white dark:bg-gray-700/60 border border-gray-300 dark:border-gray-600/50 shadow-sm"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800/40"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={isSelected ? "text-blue-400" : "text-gray-500"}
                    />
                    <span
                      className={`text-sm font-medium ${
                        isSelected ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
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

            {/* Past research sessions */}
            <PastResearchSessions onLoadSession={handleLoadSession} />
          </div>
        )}

        {/* ── Plan Preview State ─────────────────────────────────── */}
        {pageState === "plan-preview" && planPerspectives.length > 0 && (
          <div className="py-8">
            <ResearchPlanPreview
              perspectives={planPerspectives}
              onConfirm={handlePlanConfirm}
              onRegenerate={handlePlanRegenerate}
            />
          </div>
        )}

        {/* ── Plan Loading State ──────────────────────────────────── */}
        {pageState === "plan-preview" && planPerspectives.length === 0 && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/10 flex items-center justify-center">
                <Microscope size={28} className="text-purple-400 animate-pulse" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-medium">{progressMessage}</p>
                <p className="text-gray-500 text-sm mt-1">
                  Preparing research plan for: {topic}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Running State: Progress + Streaming ────────────────── */}
        {pageState === "running" && (
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
                  {/* empty state: no data, no results, nothing here */}
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
                      <p className="text-gray-900 dark:text-white font-medium">{progressMessage}</p>
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{report.topic}</h2>
              <div className="flex items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
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
                  seenStageIdsRef.current = [];
                  currentStageIdRef.current = null;
                  setTopic("");
                }}
                className="px-6 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white transition-colors"
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
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Research Failed</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{error}</p>
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
