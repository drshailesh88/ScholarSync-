"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Funnel,
  Plus,
  Trash,
  CheckCircle,
  XCircle,
  Warning,
  CircleNotch,
  Lightning,
  ArrowsClockwise,
  Robot,
  User,
  Handshake,
  EyeSlash,
  Eye,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import { useSystematicReviewStore } from "@/stores/systematic-review-store";

interface ScreeningPanelProps {
  projectId: number;
}

type FilterMode = "all" | "unscreened" | "conflicts" | "uncertain";

interface QueuePaper {
  ppId: number;
  paperId: number;
  title: string;
  authors: unknown;
  journal: string | null;
  year: number | null;
  abstract: string | null;
  doi: string | null;
  pmid: string | null;
  citationCount: number | null;
  studyType: string | null;
  evidenceLevel: string | null;
  priority: number | null;
  screeningDecision: string | null;
  screeningReason: string | null;
  aiDecision: string | null;
  aiReason: string | null;
}

interface Progress {
  total: number;
  screened: number;
  unscreened: number;
  included: number;
  excluded: number;
  maybe: number;
  progress: number;
}

interface Agreement {
  totalPapers: number;
  agreements: number;
  disagreements: number;
  kappa: number;
  interpretation: string;
}

interface UnblindedResult {
  paperId: number;
  paperTitle: string;
  aiDecision: string | null;
  humanDecision: string | null;
  isConflict: boolean;
  conflictType: string;
}

interface UnblindedSummary {
  total: number;
  withBothDecisions: number;
  agreements: number;
  conflicts: number;
}

interface UnblindedData {
  results: UnblindedResult[];
  summary: UnblindedSummary;
}

export function ScreeningPanel({ projectId }: ScreeningPanelProps) {
  const { criteria, setCriteria } = useSystematicReviewStore();

  const [queue, setQueue] = useState<QueuePaper[]>([]);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [agreement, setAgreement] = useState<Agreement | null>(null);
  const [filter, setFilter] = useState<FilterMode>("unscreened");
  const [isLoading, setIsLoading] = useState(false);
  const [isScreeningAI, setIsScreeningAI] = useState(false);
  const [isRecomputing, setIsRecomputing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedPaper, setExpandedPaper] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [blindedMode, setBlindedMode] = useState(false);
  const [unblindedData, setUnblindedData] = useState<UnblindedData | null>(null);
  const [isUnblinding, setIsUnblinding] = useState(false);

  // Load screening queue
  const loadQueue = useCallback(async () => {
    setIsLoading(true);
    try {
      const blindedParam = blindedMode ? "&blinded=true" : "";
      const res = await fetch(
        `/api/systematic-review/screening-queue?projectId=${projectId}&filter=${filter}${blindedParam}`
      );
      if (res.ok) {
        const data = await res.json();
        setQueue(data.queue ?? []);
        setProgress(data.progress ?? null);
        setAgreement(data.agreement ?? null);
      }
    } catch {
      setError("Failed to load screening queue. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [projectId, filter, blindedMode]);

  useEffect(() => {
    loadQueue();
  }, [loadQueue]);

  // Record screening decision
  const handleDecision = useCallback(
    async (paperId: number, decision: "include" | "exclude" | "maybe") => {
      try {
        const res = await fetch("/api/systematic-review/screening-queue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId, paperId, decision }),
        });

        if (res.ok) {
          const data = await res.json();
          setProgress(data.progress);

          // Update local queue
          setQueue((prev) =>
            prev.map((p) =>
              p.paperId === paperId
                ? { ...p, screeningDecision: decision }
                : p
            )
          );

          // Auto-advance to next unscreened paper
          if (filter === "unscreened") {
            setQueue((prev) => prev.filter((p) => p.paperId !== paperId));
          }
        }
      } catch {
        setError("Failed to record screening decision. Please try again.");
      }
    },
    [projectId, filter]
  );

  // Run AI batch screening
  const runAIScreening = useCallback(async () => {
    const unscreened = queue.filter((p) => !p.screeningDecision && p.abstract);
    if (unscreened.length === 0) return;

    setIsScreeningAI(true);
    try {
      const res = await fetch("/api/systematic-review/screen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "batch",
          projectId,
          papers: unscreened.slice(0, 50).map((p) => ({
            paperId: p.paperId,
            title: p.title,
            abstract: p.abstract || "",
          })),
        }),
      });

      if (res.ok) {
        await loadQueue();
      }
    } catch {
      setError("Failed to run AI screening. Please try again.");
    } finally {
      setIsScreeningAI(false);
    }
  }, [projectId, queue, loadQueue]);

  // Recompute priorities (active learning)
  const recomputePriorities = useCallback(async () => {
    setIsRecomputing(true);
    try {
      await fetch("/api/systematic-review/screening-queue", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });
      await loadQueue();
    } catch {
      setError("Failed to recompute priorities. Please try again.");
    } finally {
      setIsRecomputing(false);
    }
  }, [projectId, loadQueue]);

  // Fetch unblinded results (reveals AI decisions + conflicts)
  const fetchUnblindedResults = useCallback(async () => {
    setIsUnblinding(true);
    try {
      // Fetch unblinded summary and the full queue simultaneously
      const [unblindRes, queueRes] = await Promise.all([
        fetch(`/api/systematic-review/screening-queue?projectId=${projectId}&mode=unblind`),
        fetch(`/api/systematic-review/screening-queue?projectId=${projectId}&filter=${filter}&blinded=false`),
      ]);
      if (unblindRes.ok) {
        const data: UnblindedData = await unblindRes.json();
        setUnblindedData(data);
      }
      if (queueRes.ok) {
        const data = await queueRes.json();
        setQueue(data.queue ?? []);
        setProgress(data.progress ?? null);
        setAgreement(data.agreement ?? null);
      }
      setBlindedMode(false);
    } catch {
      setError("Failed to unblind results. Please try again.");
    } finally {
      setIsUnblinding(false);
    }
  }, [projectId, filter]);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't capture when in input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      )
        return;

      const currentPaper = queue[activeIndex];
      if (!currentPaper) return;

      switch (e.key.toLowerCase()) {
        case "i":
          handleDecision(currentPaper.paperId, "include");
          break;
        case "e":
          handleDecision(currentPaper.paperId, "exclude");
          break;
        case "u":
          handleDecision(currentPaper.paperId, "maybe");
          break;
        case "arrowdown":
        case "j":
          e.preventDefault();
          setActiveIndex((prev) => Math.min(prev + 1, queue.length - 1));
          break;
        case "arrowup":
        case "k":
          e.preventDefault();
          setActiveIndex((prev) => Math.max(prev - 1, 0));
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [queue, activeIndex, handleDecision]);

  // Criteria management
  const addCriterion = () => {
    setCriteria([...criteria, { type: "inclusion", description: "" }]);
  };

  const removeCriterion = (index: number) => {
    setCriteria(criteria.filter((_, i) => i !== index));
  };

  const updateCriterion = (
    index: number,
    field: "type" | "description",
    value: string
  ) => {
    setCriteria(
      criteria.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  };

  const activePaper = queue[activeIndex];

  return (
    <div className="space-y-6 max-w-5xl">
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">&#x2715;</button>
        </div>
      )}

      {/* Progress Bar */}
      {progress && progress.total > 0 && (
        <GlassPanel className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-ink">
              Screening Progress
            </h3>
            <span className="text-sm text-ink-muted">
              {progress.screened} / {progress.total} ({progress.progress}%)
            </span>
          </div>
          <div className="h-2 bg-surface-raised rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-brand rounded-full transition-all"
              style={{ width: `${progress.progress}%` }}
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="text-lg font-bold text-ink">
                {progress.unscreened}
              </div>
              <div className="text-xs text-ink-muted">Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-emerald-600">
                {progress.included}
              </div>
              <div className="text-xs text-emerald-600">Included</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">
                {progress.excluded}
              </div>
              <div className="text-xs text-red-600">Excluded</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-amber-600">
                {progress.maybe}
              </div>
              <div className="text-xs text-amber-600">Uncertain</div>
            </div>
          </div>
        </GlassPanel>
      )}

      {/* Inter-rater Agreement */}
      {agreement && agreement.totalPapers > 0 && (
        <GlassPanel className="p-4 bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Handshake weight="duotone" className="text-brand" size={20} />
              <span className="text-sm font-semibold text-ink">
                AI-Human Agreement
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-ink-muted">
                Cohen&apos;s &kappa; ={" "}
                <strong className="text-ink">{agreement.kappa}</strong>
              </span>
              <span
                className={cn(
                  "px-2 py-0.5 rounded text-xs font-medium",
                  agreement.kappa >= 0.61
                    ? "bg-emerald-500/10 text-emerald-600"
                    : agreement.kappa >= 0.41
                      ? "bg-amber-500/10 text-amber-600"
                      : "bg-red-500/10 text-red-600"
                )}
              >
                {agreement.interpretation}
              </span>
              <span className="text-xs text-ink-muted">
                ({agreement.agreements}/{agreement.totalPapers} agree)
              </span>
            </div>
          </div>
        </GlassPanel>
      )}

      {/* Blinded Mode Banner */}
      {blindedMode && (
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-amber-600">
            <EyeSlash weight="duotone" size={18} />
            <span>Blinded mode active — AI decisions are hidden to prevent anchoring bias</span>
          </div>
          <button
            onClick={fetchUnblindedResults}
            disabled={isUnblinding}
            className="px-3 py-1.5 text-sm font-medium text-amber-700 bg-amber-500/20 hover:bg-amber-500/30 rounded flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            {isUnblinding ? (
              <CircleNotch weight="bold" className="animate-spin" size={14} />
            ) : (
              <Eye weight="bold" size={14} />
            )}
            Unblind &amp; Show Conflicts
          </button>
        </div>
      )}

      {/* Unblinded Conflict Summary */}
      {unblindedData && !blindedMode && (
        <GlassPanel className="p-4 border-amber-500/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Eye weight="duotone" className="text-brand" size={20} />
              <span className="text-sm font-semibold text-ink">
                Unblinded Results
              </span>
            </div>
            <button
              onClick={() => setUnblindedData(null)}
              className="text-xs text-ink-muted hover:text-ink"
            >
              Dismiss
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-3">
            <div className="text-center">
              <div className="text-lg font-bold text-ink">
                {unblindedData.summary.total}
              </div>
              <div className="text-xs text-ink-muted">Total Papers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-ink">
                {unblindedData.summary.withBothDecisions}
              </div>
              <div className="text-xs text-ink-muted">Both Decided</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-emerald-600">
                {unblindedData.summary.agreements}
              </div>
              <div className="text-xs text-emerald-600">Agreements</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">
                {unblindedData.summary.conflicts}
              </div>
              <div className="text-xs text-red-600">Conflicts</div>
            </div>
          </div>
          {unblindedData.summary.conflicts > 0 && (
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              <div className="text-xs font-medium text-ink-muted mb-1">Conflicting Papers:</div>
              {unblindedData.results
                .filter((r) => r.isConflict)
                .map((r) => (
                  <div
                    key={r.paperId}
                    className="flex items-center justify-between px-3 py-2 bg-red-500/5 border border-red-500/20 rounded text-xs"
                  >
                    <span className="text-ink truncate flex-1 mr-3">
                      {r.paperTitle}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={cn(
                          "flex items-center gap-1 px-1.5 py-0.5 rounded",
                          r.aiDecision === "include"
                            ? "bg-emerald-500/10 text-emerald-600"
                            : r.aiDecision === "exclude"
                              ? "bg-red-500/10 text-red-600"
                              : "bg-amber-500/10 text-amber-600"
                        )}
                      >
                        <Robot size={10} />
                        {r.aiDecision}
                      </span>
                      <span
                        className={cn(
                          "flex items-center gap-1 px-1.5 py-0.5 rounded",
                          r.humanDecision === "include"
                            ? "bg-emerald-500/10 text-emerald-600"
                            : r.humanDecision === "exclude"
                              ? "bg-red-500/10 text-red-600"
                              : "bg-amber-500/10 text-amber-600"
                        )}
                      >
                        <User size={10} />
                        {r.humanDecision}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </GlassPanel>
      )}

      {/* Criteria Setup */}
      <GlassPanel className="p-6">
        <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <Funnel weight="duotone" className="text-brand" />
          Screening Criteria
        </h2>
        <p className="text-sm text-ink-muted mb-4">
          Define your inclusion and exclusion criteria. Three independent AI
          agents will evaluate each paper using majority consensus voting.
        </p>

        <div className="space-y-3">
          {criteria.map((criterion, i) => (
            <div key={i} className="flex items-start gap-2">
              <select
                value={criterion.type}
                onChange={(e) => updateCriterion(i, "type", e.target.value)}
                className="px-2 py-2 bg-surface-raised border border-border rounded text-sm text-ink"
              >
                <option value="inclusion">Inclusion</option>
                <option value="exclusion">Exclusion</option>
              </select>
              <input
                type="text"
                value={criterion.description}
                onChange={(e) =>
                  updateCriterion(i, "description", e.target.value)
                }
                placeholder="e.g., Randomized controlled trials only"
                className="flex-1 px-3 py-2 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 outline-none"
              />
              {criteria.length > 1 && (
                <button
                  onClick={() => removeCriterion(i)}
                  className="p-2 text-ink-muted hover:text-red-500"
                >
                  <Trash size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addCriterion}
          className="mt-3 px-3 py-1.5 text-sm text-brand hover:bg-brand/10 rounded flex items-center gap-1"
        >
          <Plus size={14} /> Add Criterion
        </button>
      </GlassPanel>

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Filter tabs */}
          {(
            [
              ["unscreened", "Unscreened"],
              ["all", "All"],
              ["conflicts", "Conflicts"],
              ["uncertain", "Uncertain"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setFilter(key);
                setActiveIndex(0);
              }}
              className={cn(
                "px-3 py-1.5 rounded text-sm transition-colors",
                filter === key
                  ? "bg-brand/10 text-brand font-medium"
                  : "text-ink-muted hover:text-ink hover:bg-surface-raised"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Blinded Mode Toggle */}
          <button
            onClick={() => {
              setBlindedMode((prev) => !prev);
              setUnblindedData(null);
            }}
            className={cn(
              "px-3 py-1.5 text-sm rounded flex items-center gap-1.5 transition-colors border",
              blindedMode
                ? "border-amber-500/40 bg-amber-500/10 text-amber-600 font-medium"
                : "border-border text-ink-muted hover:text-ink hover:bg-surface-raised"
            )}
            title={blindedMode ? "Blinded mode is ON — AI decisions are hidden" : "Enable blinded mode to hide AI decisions"}
          >
            {blindedMode ? (
              <EyeSlash weight="bold" size={14} />
            ) : (
              <Eye weight="bold" size={14} />
            )}
            {blindedMode ? "Blinded" : "Blind Mode"}
          </button>

          <div className="w-px h-5 bg-border" />

          {/* Recompute priorities */}
          <button
            onClick={recomputePriorities}
            disabled={isRecomputing}
            className="px-3 py-1.5 text-sm text-ink-muted hover:text-brand hover:bg-brand/10 rounded flex items-center gap-1 disabled:opacity-50"
            title="Recompute paper priorities using active learning"
          >
            {isRecomputing ? (
              <CircleNotch weight="bold" className="animate-spin" size={14} />
            ) : (
              <ArrowsClockwise weight="bold" size={14} />
            )}
            Reprioritize
          </button>

          {/* AI Batch Screen */}
          <button
            onClick={runAIScreening}
            disabled={
              isScreeningAI ||
              queue.filter((p) => !p.screeningDecision).length === 0
            }
            className="px-4 py-2 bg-brand text-white rounded text-sm font-medium hover:bg-brand/90 disabled:opacity-50 flex items-center gap-2"
          >
            {isScreeningAI ? (
              <CircleNotch weight="bold" className="animate-spin" size={16} />
            ) : (
              <Lightning weight="fill" size={16} />
            )}
            {isScreeningAI ? "Screening..." : "AI Screen All"}
          </button>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <CircleNotch
            weight="bold"
            className="animate-spin text-brand"
            size={24}
          />
        </div>
      )}

      {/* Empty state */}
      {!isLoading && queue.length === 0 && (
        <GlassPanel className="p-8 text-center">
          <Funnel weight="duotone" className="text-ink-muted mb-3 mx-auto" size={40} />
          <h3 className="text-sm font-semibold text-ink mb-1">
            {filter === "unscreened"
              ? "All papers screened!"
              : `No ${filter} papers`}
          </h3>
          <p className="text-xs text-ink-muted">
            {filter === "unscreened"
              ? "Import more papers or review conflicts."
              : "Try a different filter."}
          </p>
        </GlassPanel>
      )}

      {/* Paper Queue */}
      {!isLoading && queue.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-ink-muted">
              {queue.length} paper{queue.length !== 1 ? "s" : ""} &middot;
              Keyboard: <kbd className="px-1 bg-surface-raised rounded">I</kbd>
              =Include{" "}
              <kbd className="px-1 bg-surface-raised rounded">E</kbd>=Exclude{" "}
              <kbd className="px-1 bg-surface-raised rounded">U</kbd>=Uncertain{" "}
              <kbd className="px-1 bg-surface-raised rounded">J/K</kbd>=Navigate
            </span>
          </div>

          {queue.map((paper, idx) => (
            <div
              key={paper.ppId}
              className={cn(
                "border rounded-lg p-4 transition-all cursor-pointer",
                idx === activeIndex
                  ? "border-brand/40 bg-brand/5 ring-1 ring-brand/20"
                  : "border-border hover:border-brand/20",
                paper.screeningDecision === "include" &&
                  "border-emerald-500/30 bg-emerald-500/5",
                paper.screeningDecision === "exclude" &&
                  "border-red-500/30 bg-red-500/5",
                paper.screeningDecision === "maybe" &&
                  "border-amber-500/30 bg-amber-500/5"
              )}
              onClick={() => setActiveIndex(idx)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div
                    className="text-sm font-medium text-ink mb-1 cursor-pointer hover:text-brand"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedPaper(
                        expandedPaper === paper.paperId
                          ? null
                          : paper.paperId
                      );
                    }}
                  >
                    {paper.title}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-muted">
                    {paper.journal && <span>{paper.journal}</span>}
                    {paper.year && <span>({paper.year})</span>}
                    {paper.citationCount != null && paper.citationCount > 0 && (
                      <span>{paper.citationCount} cites</span>
                    )}
                    {paper.studyType && (
                      <span className="px-1.5 py-0.5 bg-surface-raised rounded">
                        {paper.studyType}
                      </span>
                    )}
                    {paper.priority != null && paper.priority > 0 && (
                      <span className="px-1.5 py-0.5 bg-brand/10 text-brand rounded">
                        Priority: {Math.round(paper.priority * 100)}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Decision badges */}
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  {!blindedMode && paper.aiDecision && (
                    <span
                      className={cn(
                        "flex items-center gap-1 px-2 py-0.5 text-xs rounded",
                        paper.aiDecision === "include"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : paper.aiDecision === "exclude"
                            ? "bg-red-500/10 text-red-600"
                            : "bg-amber-500/10 text-amber-600"
                      )}
                    >
                      <Robot size={12} />
                      {paper.aiDecision}
                    </span>
                  )}
                  {paper.screeningDecision && (
                    <span
                      className={cn(
                        "flex items-center gap-1 px-2 py-0.5 text-xs rounded font-medium",
                        paper.screeningDecision === "include"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : paper.screeningDecision === "exclude"
                            ? "bg-red-500/10 text-red-600"
                            : "bg-amber-500/10 text-amber-600"
                      )}
                    >
                      <User size={12} />
                      {paper.screeningDecision}
                    </span>
                  )}
                </div>
              </div>

              {/* Expanded: abstract + AI reasoning + decision buttons */}
              {(expandedPaper === paper.paperId || idx === activeIndex) && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  {/* Abstract */}
                  {paper.abstract && (
                    <p className="text-xs text-ink-muted mb-3 leading-relaxed line-clamp-6">
                      {paper.abstract}
                    </p>
                  )}

                  {/* AI reasoning (hidden in blinded mode) */}
                  {!blindedMode && paper.aiReason && (
                    <div className="mb-3 px-3 py-2 bg-surface-raised rounded text-xs">
                      <span className="font-medium text-ink">
                        AI reasoning:{" "}
                      </span>
                      <span className="text-ink-muted">{paper.aiReason}</span>
                    </div>
                  )}

                  {/* Quick decision buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDecision(paper.paperId, "include");
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1 transition-colors",
                        paper.screeningDecision === "include"
                          ? "bg-emerald-500 text-white"
                          : "border border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10"
                      )}
                    >
                      <CheckCircle weight="bold" size={14} />
                      Include
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDecision(paper.paperId, "exclude");
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1 transition-colors",
                        paper.screeningDecision === "exclude"
                          ? "bg-red-500 text-white"
                          : "border border-red-500/30 text-red-600 hover:bg-red-500/10"
                      )}
                    >
                      <XCircle weight="bold" size={14} />
                      Exclude
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDecision(paper.paperId, "maybe");
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1 transition-colors",
                        paper.screeningDecision === "maybe"
                          ? "bg-amber-500 text-white"
                          : "border border-amber-500/30 text-amber-600 hover:bg-amber-500/10"
                      )}
                    >
                      <Warning weight="bold" size={14} />
                      Uncertain
                    </button>

                    {/* Links */}
                    <div className="flex items-center gap-2 ml-auto text-xs">
                      {paper.doi && (
                        <a
                          href={`https://doi.org/${paper.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          DOI
                        </a>
                      )}
                      {paper.pmid && (
                        <a
                          href={`https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          PubMed
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
