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
  Users,
  Handshake,
  EyeSlash,
  Eye,
  GitBranch,
  CheckSquare,
  FileText,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import { useSystematicReviewStore } from "@/stores/systematic-review-store";
import {
  ScreeningPDFViewer,
  type ScreeningPaper,
} from "@/components/systematic-review/ScreeningPDFViewer";

interface ScreeningPanelProps {
  projectId: number;
}

type FilterMode = "all" | "unscreened" | "conflicts" | "uncertain";
type ViewMode = "queue" | "conflicts";

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
  reviewerScreened: boolean | null;
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

interface ReviewerProgress {
  total: number;
  screened: number;
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

interface ReviewerDecision {
  reviewerId: string;
  decision: string;
  reason: string | null;
}

interface MultiReviewerConflict {
  paperId: number;
  paperTitle: string;
  decisions: ReviewerDecision[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function DecisionBadge({ decision, icon }: { decision: string; icon?: React.ReactNode }) {
  return (
    <span
      className={cn(
        "flex items-center gap-1 px-2 py-0.5 text-xs rounded font-medium",
        decision === "include"
          ? "bg-emerald-500/10 text-emerald-600"
          : decision === "exclude"
            ? "bg-red-500/10 text-red-600"
            : "bg-amber-500/10 text-amber-600"
      )}
    >
      {icon}
      {decision}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function ScreeningPanel({ projectId }: ScreeningPanelProps) {
  const { criteria, setCriteria } = useSystematicReviewStore();

  // Queue state
  const [queue, setQueue] = useState<QueuePaper[]>([]);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [reviewerProgress, setReviewerProgress] = useState<ReviewerProgress | null>(null);
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

  // PDF screening viewer state
  const [pdfViewerPaper, setPdfViewerPaper] = useState<ScreeningPaper | null>(
    null
  );

  // Conflict resolution state
  const [viewMode, setViewMode] = useState<ViewMode>("queue");
  const [conflicts, setConflicts] = useState<MultiReviewerConflict[]>([]);
  const [isLoadingConflicts, setIsLoadingConflicts] = useState(false);
  const [resolvingPaperId, setResolvingPaperId] = useState<number | null>(null);

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
        setReviewerProgress(data.reviewerProgress ?? null);
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

  // Load multi-reviewer conflicts
  const loadConflicts = useCallback(async () => {
    setIsLoadingConflicts(true);
    try {
      const res = await fetch(
        `/api/systematic-review/screening-queue?projectId=${projectId}&mode=conflicts`
      );
      if (res.ok) {
        const data = await res.json();
        setConflicts(data.conflicts ?? []);
      }
    } catch {
      setError("Failed to load conflicts. Please try again.");
    } finally {
      setIsLoadingConflicts(false);
    }
  }, [projectId]);

  // Switch to conflict view
  const openConflictView = useCallback(() => {
    setViewMode("conflicts");
    loadConflicts();
  }, [loadConflicts]);

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
          if (data.reviewerProgress) setReviewerProgress(data.reviewerProgress);

          // Update local queue
          setQueue((prev) =>
            prev.map((p) =>
              p.paperId === paperId
                ? { ...p, screeningDecision: decision, reviewerScreened: true }
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

  // Resolve a conflict
  const handleResolve = useCallback(
    async (paperId: number, resolution: "include" | "exclude" | "maybe", reason?: string) => {
      setResolvingPaperId(paperId);
      try {
        const res = await fetch("/api/systematic-review/screening-queue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId,
            paperId,
            resolution,
            reason,
            action: "resolve",
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setProgress(data.progress ?? null);
          // Remove resolved conflict from the list
          setConflicts((prev) => prev.filter((c) => c.paperId !== paperId));
        } else {
          setError("Failed to resolve conflict. Please try again.");
        }
      } catch {
        setError("Failed to resolve conflict. Please try again.");
      } finally {
        setResolvingPaperId(null);
      }
    },
    [projectId]
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

  // Fetch unblinded results
  const fetchUnblindedResults = useCallback(async () => {
    setIsUnblinding(true);
    try {
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
        setReviewerProgress(data.reviewerProgress ?? null);
      }
      setBlindedMode(false);
    } catch {
      setError("Failed to unblind results. Please try again.");
    } finally {
      setIsUnblinding(false);
    }
  }, [projectId, filter]);

  // Open PDF screening viewer for a paper
  const openPdfViewer = useCallback(
    (paper: QueuePaper) => {
      setPdfViewerPaper({
        paperId: paper.paperId,
        ppId: paper.ppId,
        title: paper.title,
        authors: paper.authors,
        journal: paper.journal,
        year: paper.year,
        abstract: paper.abstract,
        doi: paper.doi,
        pmid: paper.pmid,
        pdfUrl: null, // will be resolved by API based on paperId
        pdfStoragePath: null,
        screeningDecision: paper.screeningDecision,
        screeningReason: paper.screeningReason,
        aiDecision: paper.aiDecision,
        aiReason: paper.aiReason,
      });

      // Fetch PDF path for the paper
      fetch(
        `/api/systematic-review/paper-pdf?paperId=${paper.paperId}&projectId=${projectId}`
      )
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) {
            setPdfViewerPaper((prev) =>
              prev
                ? {
                    ...prev,
                    pdfUrl: data.pdfUrl ?? null,
                    pdfStoragePath: data.pdfStoragePath ?? null,
                  }
                : null
            );
          }
        })
        .catch(() => {
          /* PDF path fetch is best-effort */
        });
    },
    [projectId]
  );

  // Handle decision from PDF viewer (wraps handleDecision + closes viewer)
  const handlePdfViewerDecision = useCallback(
    (paperId: number, decision: "include" | "exclude" | "maybe", reason?: string) => {
      handleDecision(paperId, decision);
      // If there is a reason, we store it via the screening reason field
      if (reason) {
        fetch("/api/systematic-review/screening-queue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId,
            paperId,
            decision,
            reason,
          }),
        }).catch(() => {
          /* best-effort reason save */
        });
      }
      // Update the viewer paper state to reflect the new decision
      setPdfViewerPaper((prev) =>
        prev ? { ...prev, screeningDecision: decision, screeningReason: reason ?? prev.screeningReason } : null
      );
    },
    [handleDecision, projectId]
  );

  // Keyboard shortcuts (only active in queue view)
  useEffect(() => {
    if (viewMode !== "queue") return;

    function handleKeyDown(e: KeyboardEvent) {
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
  }, [queue, activeIndex, handleDecision, viewMode]);

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

  const _activePaper = queue[activeIndex];

  return (
    <div className="space-y-6 max-w-5xl">
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">&#x2715;</button>
        </div>
      )}

      {/* Overall Progress Bar */}
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

      {/* Reviewer-specific Progress */}
      {reviewerProgress && reviewerProgress.total > 0 && (
        <GlassPanel className="p-3 bg-gradient-to-r from-brand/5 to-indigo-500/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User weight="duotone" className="text-brand" size={16} />
              <span className="text-sm font-medium text-ink">Your Progress</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-ink-muted">
                <strong className="text-ink">{reviewerProgress.screened}</strong>
                {" / "}
                <strong className="text-ink">{reviewerProgress.total}</strong>
                {" screened"}
              </span>
              <span
                className={cn(
                  "px-2 py-0.5 rounded text-xs font-medium",
                  reviewerProgress.progress === 100
                    ? "bg-emerald-500/10 text-emerald-600"
                    : reviewerProgress.progress >= 50
                      ? "bg-brand/10 text-brand"
                      : "bg-surface-raised text-ink-muted"
                )}
              >
                {reviewerProgress.progress}%
              </span>
            </div>
          </div>
          {/* Mini progress bar */}
          <div className="mt-2 h-1 bg-surface-raised rounded-full overflow-hidden">
            <div
              className="h-full bg-brand rounded-full transition-all"
              style={{ width: `${reviewerProgress.progress}%` }}
            />
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
                Inter-Rater Agreement
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

      {/* Unblinded Conflict Summary (AI vs Human) */}
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
              <div className="text-xs font-medium text-ink-muted mb-1">Conflicting Papers (AI vs Human):</div>
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
                      <DecisionBadge decision={r.aiDecision ?? ""} icon={<Robot size={10} />} />
                      <DecisionBadge decision={r.humanDecision ?? ""} icon={<User size={10} />} />
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

      {/* View Mode Tabs + Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {/* View mode tabs */}
          <button
            onClick={() => setViewMode("queue")}
            className={cn(
              "px-3 py-1.5 rounded text-sm transition-colors flex items-center gap-1.5",
              viewMode === "queue"
                ? "bg-brand/10 text-brand font-medium"
                : "text-ink-muted hover:text-ink hover:bg-surface-raised"
            )}
          >
            <Funnel size={14} />
            Queue
          </button>
          <button
            onClick={openConflictView}
            className={cn(
              "px-3 py-1.5 rounded text-sm transition-colors flex items-center gap-1.5",
              viewMode === "conflicts"
                ? "bg-red-500/10 text-red-600 font-medium"
                : "text-ink-muted hover:text-ink hover:bg-surface-raised"
            )}
          >
            <GitBranch size={14} />
            View Conflicts
            {conflicts.length > 0 && viewMode === "conflicts" && (
              <span className="px-1.5 py-0.5 bg-red-500/20 text-red-600 rounded text-xs font-bold">
                {conflicts.length}
              </span>
            )}
          </button>

          <div className="w-px h-5 bg-border mx-1" />

          {/* Filter tabs (only in queue view) */}
          {viewMode === "queue" &&
            (
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
          {/* Blinded Mode Toggle (queue view only) */}
          {viewMode === "queue" && (
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
          )}

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

          {/* AI Batch Screen (queue view only) */}
          {viewMode === "queue" && (
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
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* CONFLICT RESOLUTION VIEW */}
      {/* ------------------------------------------------------------------ */}
      {viewMode === "conflicts" && (
        <div className="space-y-4">
          {isLoadingConflicts && (
            <div className="flex items-center justify-center py-12">
              <CircleNotch weight="bold" className="animate-spin text-brand" size={24} />
            </div>
          )}

          {!isLoadingConflicts && conflicts.length === 0 && (
            <GlassPanel className="p-8 text-center">
              <CheckSquare weight="duotone" className="text-emerald-500 mb-3 mx-auto" size={40} />
              <h3 className="text-sm font-semibold text-ink mb-1">No Conflicts Found</h3>
              <p className="text-xs text-ink-muted">
                All reviewers are in agreement, or fewer than two reviewers have
                screened the same paper.
              </p>
            </GlassPanel>
          )}

          {!isLoadingConflicts && conflicts.length > 0 && (
            <>
              <div className="flex items-center gap-2 text-sm text-ink-muted">
                <GitBranch weight="duotone" className="text-red-500" size={16} />
                <span>
                  <strong className="text-ink">{conflicts.length}</strong> paper
                  {conflicts.length !== 1 ? "s" : ""} with reviewer disagreements
                </span>
              </div>

              {/* Conflict table */}
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-surface-raised border-b border-border">
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-ink-muted">
                        Paper
                      </th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-ink-muted">
                        Reviewer Decisions
                      </th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-ink-muted">
                        Resolve
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {conflicts.map((conflict, idx) => (
                      <ConflictRow
                        key={conflict.paperId}
                        conflict={conflict}
                        isResolving={resolvingPaperId === conflict.paperId}
                        onResolve={handleResolve}
                        isEven={idx % 2 === 0}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* QUEUE VIEW */}
      {/* ------------------------------------------------------------------ */}
      {viewMode === "queue" && (
        <>
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
                        {/* Reviewer-screened indicator */}
                        {paper.reviewerScreened === true && (
                          <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-600 rounded flex items-center gap-0.5">
                            <User size={10} />
                            Your decision recorded
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Decision badges */}
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      {!blindedMode && paper.aiDecision && (
                        <DecisionBadge
                          decision={paper.aiDecision}
                          icon={<Robot size={12} />}
                        />
                      )}
                      {paper.screeningDecision && (
                        <DecisionBadge
                          decision={paper.screeningDecision}
                          icon={<User size={12} />}
                        />
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

                        {/* Links + PDF viewer */}
                        <div className="flex items-center gap-2 ml-auto text-xs">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openPdfViewer(paper);
                            }}
                            className="px-2 py-1 text-brand bg-brand/10 hover:bg-brand/20 rounded font-medium flex items-center gap-1 transition-colors"
                          >
                            <FileText weight="bold" size={12} />
                            Full Text
                          </button>
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
        </>
      )}

      {/* PDF Screening Viewer (full-screen overlay) */}
      {pdfViewerPaper && (
        <ScreeningPDFViewer
          paper={pdfViewerPaper}
          projectId={projectId}
          onDecision={handlePdfViewerDecision}
          onClose={() => setPdfViewerPaper(null)}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ConflictRow — individual conflict resolution row
// ---------------------------------------------------------------------------

interface ConflictRowProps {
  conflict: MultiReviewerConflict;
  isResolving: boolean;
  onResolve: (
    paperId: number,
    resolution: "include" | "exclude" | "maybe",
    reason?: string
  ) => Promise<void>;
  isEven: boolean;
}

function ConflictRow({ conflict, isResolving, onResolve, isEven }: ConflictRowProps) {
  const [showReasonInput, setShowReasonInput] = useState(false);
  const [pendingResolution, setPendingResolution] = useState<"include" | "exclude" | "maybe" | null>(null);
  const [reason, setReason] = useState("");

  const initiateResolve = (resolution: "include" | "exclude" | "maybe") => {
    setPendingResolution(resolution);
    setShowReasonInput(true);
  };

  const confirmResolve = async () => {
    if (!pendingResolution) return;
    await onResolve(conflict.paperId, pendingResolution, reason || undefined);
    setShowReasonInput(false);
    setPendingResolution(null);
    setReason("");
  };

  const cancelResolve = () => {
    setShowReasonInput(false);
    setPendingResolution(null);
    setReason("");
  };

  // Truncate reviewer ID for display (show last 6 chars or use R1, R2, etc.)
  const formatReviewer = (reviewerId: string, index: number) => {
    if (reviewerId.startsWith("resolver:")) return "Arbiter";
    return `Reviewer ${index + 1}`;
  };

  return (
    <>
      <tr className={cn("border-b border-border/50", isEven ? "bg-transparent" : "bg-surface-raised/30")}>
        <td className="px-4 py-3">
          <div className="text-sm font-medium text-ink leading-snug line-clamp-2 max-w-xs">
            {conflict.paperTitle}
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            {conflict.decisions.map((d, idx) => (
              <div key={d.reviewerId} className="flex items-center gap-1">
                <span className="text-xs text-ink-muted">{formatReviewer(d.reviewerId, idx)}:</span>
                <DecisionBadge
                  decision={d.decision}
                  icon={<Users size={10} />}
                />
              </div>
            ))}
          </div>
        </td>
        <td className="px-4 py-3 text-right">
          {isResolving ? (
            <CircleNotch weight="bold" className="animate-spin text-brand ml-auto" size={16} />
          ) : !showReasonInput ? (
            <div className="flex items-center justify-end gap-1">
              <button
                onClick={() => initiateResolve("include")}
                className="px-2 py-1 text-xs rounded border border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10 transition-colors flex items-center gap-0.5"
              >
                <CheckCircle weight="bold" size={12} />
                Include
              </button>
              <button
                onClick={() => initiateResolve("exclude")}
                className="px-2 py-1 text-xs rounded border border-red-500/30 text-red-600 hover:bg-red-500/10 transition-colors flex items-center gap-0.5"
              >
                <XCircle weight="bold" size={12} />
                Exclude
              </button>
              <button
                onClick={() => initiateResolve("maybe")}
                className="px-2 py-1 text-xs rounded border border-amber-500/30 text-amber-600 hover:bg-amber-500/10 transition-colors flex items-center gap-0.5"
              >
                <Warning weight="bold" size={12} />
                Maybe
              </button>
            </div>
          ) : null}
        </td>
      </tr>
      {/* Reason input row */}
      {showReasonInput && (
        <tr className={cn("border-b border-border", isEven ? "bg-transparent" : "bg-surface-raised/30")}>
          <td colSpan={3} className="px-4 pb-3">
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-ink-muted shrink-0">
                Resolving as{" "}
                <strong
                  className={cn(
                    pendingResolution === "include"
                      ? "text-emerald-600"
                      : pendingResolution === "exclude"
                        ? "text-red-600"
                        : "text-amber-600"
                  )}
                >
                  {pendingResolution}
                </strong>
                {" — "}
                Add reason (optional):
              </span>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") confirmResolve();
                  if (e.key === "Escape") cancelResolve();
                }}
                placeholder="e.g., Meets primary outcome criteria"
                className="flex-1 px-2 py-1 text-xs bg-surface-raised border border-border rounded outline-none focus:ring-1 focus:ring-brand/40"
                autoFocus
              />
              <button
                onClick={confirmResolve}
                className="px-2 py-1 text-xs bg-brand text-white rounded hover:bg-brand/90"
              >
                Confirm
              </button>
              <button
                onClick={cancelResolve}
                className="px-2 py-1 text-xs text-ink-muted hover:text-ink rounded hover:bg-surface-raised"
              >
                Cancel
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
