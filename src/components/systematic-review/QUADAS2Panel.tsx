"use client";

import { useState, useEffect, useCallback, Fragment } from "react";
import {
  MagnifyingGlass,
  CaretDown,
  CaretRight,
  CircleNotch,
  CheckCircle,
  Warning,
  Lightning,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface QUADAS2PanelProps {
  projectId: number;
}

interface QUADAS2DomainRow {
  domain: string;
  domainName: string;
  hasApplicability: boolean;
  riskOfBias: string | null;
  applicabilityConcern: string | null;
  rationale: string | null;
}

interface QUADAS2Result {
  paperId: number;
  domains: QUADAS2DomainRow[];
  overallRoB: string;
  overallApplicability: string;
}

interface ImportedPaper {
  ppId: number;
  paperId: number;
  title: string;
  authors: unknown;
  year: number | null;
  abstract: string | null;
  screeningDecision: string | null;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DOMAIN_LABELS: Record<string, string> = {
  patient_selection: "Patient Selection",
  index_test: "Index Test",
  reference_standard: "Reference Standard",
  flow_timing: "Flow & Timing",
};

/** Maps DB judgment values to display colors */
const JUDGMENT_COLORS: Record<string, string> = {
  low: "bg-emerald-500 text-white",
  some_concerns: "bg-amber-500 text-white",
  high: "bg-red-500 text-white",
  Low: "bg-emerald-500 text-white",
  Unclear: "bg-amber-500 text-white",
  High: "bg-red-500 text-white",
};

const JUDGMENT_LABELS: Record<string, string> = {
  low: "Low",
  some_concerns: "Unclear",
  high: "High",
};

const DOMAIN_ORDER = [
  "patient_selection",
  "index_test",
  "reference_standard",
  "flow_timing",
];

/** Flow & Timing has no applicability concern */
const NO_APPLICABILITY_DOMAIN = "flow_timing";

function judgmentSymbol(judgment: string | null): string {
  if (!judgment) return "—";
  const j = judgment.toLowerCase();
  if (j === "low") return "+";
  if (j === "high") return "-";
  return "?"; // some_concerns / Unclear
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function QUADAS2Panel({ projectId }: QUADAS2PanelProps) {
  const [results, setResults] = useState<QUADAS2Result[]>([]);
  const [papers, setPapers] = useState<ImportedPaper[]>([]);
  const [selectedPaperId, setSelectedPaperId] = useState<number | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [isLoadingPapers, setIsLoadingPapers] = useState(false);
  const [isAssessing, setIsAssessing] = useState(false);
  const [isAssessingAll, setIsAssessingAll] = useState(false);
  const [assessingPaperId, setAssessingPaperId] = useState<number | null>(null);

  const [error, setError] = useState<string | null>(null);

  // -------------------------------------------------------------------------
  // Data loading
  // -------------------------------------------------------------------------

  const loadSummary = useCallback(async () => {
    setIsLoadingSummary(true);
    try {
      const res = await fetch(
        `/api/systematic-review/quadas2?projectId=${projectId}`
      );
      if (!res.ok) throw new Error("Failed to load QUADAS-2 assessments");
      const data = await res.json();
      setResults(Array.isArray(data) ? data : data.summary ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load assessments"
      );
    } finally {
      setIsLoadingSummary(false);
    }
  }, [projectId]);

  const loadPapers = useCallback(async () => {
    setIsLoadingPapers(true);
    try {
      const res = await fetch(
        `/api/systematic-review/import?projectId=${projectId}`
      );
      if (!res.ok) throw new Error("Failed to load papers");
      const data = await res.json();
      const allPapers: ImportedPaper[] = data.papers ?? [];
      const included = allPapers.filter(
        (p) =>
          p.screeningDecision === "include" ||
          p.screeningDecision === "included"
      );
      setPapers(included.length > 0 ? included : allPapers);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load papers");
    } finally {
      setIsLoadingPapers(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadSummary();
    loadPapers();
  }, [loadSummary, loadPapers]);

  // -------------------------------------------------------------------------
  // Assessment actions
  // -------------------------------------------------------------------------

  const assessPaper = useCallback(
    async (paper: ImportedPaper) => {
      setIsAssessing(true);
      setAssessingPaperId(paper.paperId);
      setError(null);

      try {
        const textContent = paper.abstract || "";
        if (textContent.length < 100) {
          throw new Error(
            `Paper "${paper.title}" has insufficient text (abstract < 100 chars). Full text is needed for QUADAS-2 assessment.`
          );
        }

        const res = await fetch("/api/systematic-review/quadas2", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId,
            paperId: paper.paperId,
            title: paper.title,
            textContent,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Assessment failed");
        }

        await loadSummary();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Assessment failed");
      } finally {
        setIsAssessing(false);
        setAssessingPaperId(null);
      }
    },
    [projectId, loadSummary]
  );

  const assessAllIncluded = useCallback(async () => {
    setIsAssessingAll(true);
    setError(null);

    const alreadyAssessed = new Set(results.map((r) => r.paperId));
    const toAssess = papers.filter((p) => !alreadyAssessed.has(p.paperId));

    if (toAssess.length === 0) {
      setError("All included papers have already been assessed.");
      setIsAssessingAll(false);
      return;
    }

    for (const paper of toAssess) {
      try {
        setAssessingPaperId(paper.paperId);
        const textContent = paper.abstract || "";
        if (textContent.length < 100) continue;

        const res = await fetch("/api/systematic-review/quadas2", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId,
            paperId: paper.paperId,
            title: paper.title,
            textContent,
          }),
        });

        if (res.ok) {
          await loadSummary();
        }
      } catch {
        // Continue to next paper on error
      }
    }

    setAssessingPaperId(null);
    setIsAssessingAll(false);
    await loadSummary();
  }, [papers, results, projectId, loadSummary]);

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------

  const getPaperTitle = (paperId: number): string => {
    const paper = papers.find((p) => p.paperId === paperId);
    if (paper) {
      const year = paper.year ? ` (${paper.year})` : "";
      return `${paper.title}${year}`;
    }
    return `Paper #${paperId}`;
  };

  const alreadyAssessedIds = new Set(results.map((r) => r.paperId));
  const unassessedPapers = papers.filter(
    (p) => !alreadyAssessedIds.has(p.paperId)
  );
  const isLoading = isLoadingSummary || isLoadingPapers;

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <GlassPanel className="p-6">
        <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <MagnifyingGlass weight="duotone" className="text-brand" size={24} />
          QUADAS-2 Quality Assessment
        </h2>
        <p className="text-sm text-ink-muted mb-4">
          QUADAS-2 (Quality Assessment of Diagnostic Accuracy Studies) — evaluates
          4 domains for both Risk of Bias and Applicability Concerns. The Flow &
          Timing domain has no applicability concern. Judgments: Low / High / Unclear.
        </p>

        {/* Domain legend */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {DOMAIN_ORDER.map((d) => (
            <div
              key={d}
              className="text-center p-2 bg-surface-raised rounded border border-border"
            >
              <div className="text-xs font-medium text-ink">
                {DOMAIN_LABELS[d]}
              </div>
              {d === NO_APPLICABILITY_DOMAIN && (
                <div className="text-[10px] text-ink-muted/70 mt-0.5">
                  RoB only
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Judgment legend */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs text-ink-muted">Judgments:</span>
          <span className="inline-flex items-center gap-1.5 text-xs">
            <span className="w-4 h-4 rounded-full bg-emerald-500 inline-flex items-center justify-center text-white text-[10px] font-bold">
              +
            </span>
            Low
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs">
            <span className="w-4 h-4 rounded-full bg-amber-500 inline-flex items-center justify-center text-white text-[10px] font-bold">
              ?
            </span>
            Unclear
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs">
            <span className="w-4 h-4 rounded-full bg-red-500 inline-flex items-center justify-center text-white text-[10px] font-bold">
              -
            </span>
            High
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted/60">
            <span className="w-4 h-4 rounded border border-border/50 bg-surface inline-flex items-center justify-center text-[10px]">
              —
            </span>
            N/A (no applicability)
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={selectedPaperId ?? ""}
            onChange={(e) =>
              setSelectedPaperId(e.target.value ? Number(e.target.value) : null)
            }
            disabled={isLoading || isAssessing || isAssessingAll}
            className="text-sm rounded-md border border-border bg-surface px-3 py-1.5 text-ink disabled:opacity-50"
          >
            <option value="">Select a paper...</option>
            {papers.map((p) => {
              const assessed = alreadyAssessedIds.has(p.paperId);
              const shortTitle =
                p.title.length > 60 ? p.title.slice(0, 57) + "..." : p.title;
              return (
                <option key={p.paperId} value={p.paperId}>
                  {assessed ? "[Done] " : ""}
                  {shortTitle}
                  {p.year ? ` (${p.year})` : ""}
                </option>
              );
            })}
          </select>

          <button
            onClick={() => {
              const paper = papers.find((p) => p.paperId === selectedPaperId);
              if (paper) assessPaper(paper);
            }}
            disabled={
              !selectedPaperId || isAssessing || isAssessingAll || isLoading
            }
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
              "bg-brand text-white hover:bg-brand/90",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isAssessing && assessingPaperId === selectedPaperId ? (
              <CircleNotch className="animate-spin" size={16} />
            ) : (
              <Lightning weight="fill" size={16} />
            )}
            Run QUADAS-2 Assessment
          </button>

          <button
            onClick={assessAllIncluded}
            disabled={
              isAssessing ||
              isAssessingAll ||
              isLoading ||
              unassessedPapers.length === 0
            }
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
              "bg-surface-raised border border-border text-ink hover:bg-surface-raised/80",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isAssessingAll ? (
              <CircleNotch className="animate-spin" size={16} />
            ) : (
              <MagnifyingGlass weight="duotone" size={16} />
            )}
            {isAssessingAll
              ? `Assessing (${
                  assessingPaperId
                    ? getPaperTitle(assessingPaperId).slice(0, 20) + "..."
                    : "..."
                })`
              : `Assess All Included (${unassessedPapers.length})`}
          </button>

          <button
            onClick={() => {
              loadSummary();
              loadPapers();
            }}
            disabled={isLoading}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-ink-muted",
              "hover:bg-surface-raised transition-colors",
              "disabled:opacity-50"
            )}
          >
            <ArrowsClockwise
              className={cn(isLoading && "animate-spin")}
              size={16}
            />
            Refresh
          </button>
        </div>
      </GlassPanel>

      {/* Error state */}
      {error && (
        <GlassPanel className="p-4 border-red-500/30">
          <div className="flex items-start gap-2">
            <Warning
              weight="fill"
              className="text-red-500 shrink-0 mt-0.5"
              size={18}
            />
            <div>
              <p className="text-sm text-red-400">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-xs text-ink-muted hover:text-ink mt-1"
              >
                Dismiss
              </button>
            </div>
          </div>
        </GlassPanel>
      )}

      {/* Loading state */}
      {isLoading && results.length === 0 && (
        <GlassPanel className="p-8">
          <div className="flex flex-col items-center justify-center gap-3 text-ink-muted">
            <CircleNotch className="animate-spin" size={28} />
            <p className="text-sm">Loading QUADAS-2 assessments...</p>
          </div>
        </GlassPanel>
      )}

      {/* Empty state */}
      {!isLoading && results.length === 0 && (
        <GlassPanel className="p-8">
          <div className="flex flex-col items-center justify-center gap-3 text-ink-muted">
            <MagnifyingGlass
              weight="duotone"
              size={40}
              className="opacity-40"
            />
            <p className="text-sm">No QUADAS-2 assessments yet.</p>
            <p className="text-xs text-ink-muted/70">
              {papers.length > 0
                ? 'Select a paper above or click "Assess All Included" to begin.'
                : "Import and screen papers first, then return here to assess diagnostic study quality."}
            </p>
          </div>
        </GlassPanel>
      )}

      {/* Traffic-light table */}
      {results.length > 0 && (
        <GlassPanel className="p-6">
          <h3 className="text-sm font-semibold text-ink mb-1 flex items-center gap-2">
            <CheckCircle weight="duotone" className="text-emerald-500" size={18} />
            QUADAS-2 Summary
          </h3>
          <p className="text-xs text-ink-muted mb-4">
            {results.length} paper{results.length !== 1 ? "s" : ""} assessed.
            Each domain shows two rows: Risk of Bias (RoB) and Applicability
            Concern (App). Click a row to expand domain details.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 text-ink-muted font-medium w-8" />
                  <th className="text-left py-2 pr-4 text-ink-muted font-medium">
                    Study
                  </th>
                  {DOMAIN_ORDER.map((d) => (
                    <th
                      key={d}
                      colSpan={d === NO_APPLICABILITY_DOMAIN ? 1 : 2}
                      className="text-center py-2 px-2 text-ink-muted font-medium border-l border-border/30"
                    >
                      {DOMAIN_LABELS[d]}
                    </th>
                  ))}
                  <th
                    colSpan={2}
                    className="text-center py-2 px-2 text-ink-muted font-medium border-l border-border/30"
                  >
                    Overall
                  </th>
                </tr>
                {/* Sub-header: RoB / App labels per domain */}
                <tr className="border-b border-border/50">
                  <th />
                  <th />
                  {DOMAIN_ORDER.map((d) =>
                    d === NO_APPLICABILITY_DOMAIN ? (
                      <th
                        key={`${d}-rob`}
                        className="text-center py-1 px-2 text-[10px] text-ink-muted/60 font-normal border-l border-border/30"
                      >
                        RoB
                      </th>
                    ) : (
                      <Fragment key={d}>
                        <th className="text-center py-1 px-2 text-[10px] text-ink-muted/60 font-normal border-l border-border/30">
                          RoB
                        </th>
                        <th className="text-center py-1 px-2 text-[10px] text-ink-muted/60 font-normal">
                          App
                        </th>
                      </Fragment>
                    )
                  )}
                  <th className="text-center py-1 px-2 text-[10px] text-ink-muted/60 font-normal border-l border-border/30">
                    RoB
                  </th>
                  <th className="text-center py-1 px-2 text-[10px] text-ink-muted/60 font-normal">
                    App
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => {
                  const isExpanded = expandedRow === r.paperId;

                  // Build a domain map for quick lookup
                  const domainMap = new Map(
                    r.domains.map((d) => [d.domain, d])
                  );

                  return (
                    <Fragment key={r.paperId}>
                      <tr
                        className={cn(
                          "border-b border-border/50 cursor-pointer transition-colors",
                          isExpanded
                            ? "bg-surface-raised/50"
                            : "hover:bg-surface-raised/30"
                        )}
                        onClick={() =>
                          setExpandedRow(isExpanded ? null : r.paperId)
                        }
                      >
                        <td className="py-2 pr-1 text-ink-muted">
                          {isExpanded ? (
                            <CaretDown size={14} />
                          ) : (
                            <CaretRight size={14} />
                          )}
                        </td>
                        <td className="py-2 pr-4 text-ink max-w-xs truncate">
                          {getPaperTitle(r.paperId)}
                        </td>

                        {/* Per-domain traffic light cells */}
                        {DOMAIN_ORDER.map((d) => {
                          const domainData = domainMap.get(d);
                          const robJudgment = domainData?.riskOfBias ?? null;
                          const appJudgment =
                            domainData?.applicabilityConcern ?? null;

                          if (d === NO_APPLICABILITY_DOMAIN) {
                            return (
                              <td
                                key={`${d}-rob`}
                                className="text-center py-2 px-2 border-l border-border/20"
                              >
                                <JudgmentBadge judgment={robJudgment} />
                              </td>
                            );
                          }
                          return (
                            <Fragment key={d}>
                              <td className="text-center py-2 px-2 border-l border-border/20">
                                <JudgmentBadge judgment={robJudgment} />
                              </td>
                              <td className="text-center py-2 px-2">
                                <JudgmentBadge judgment={appJudgment} />
                              </td>
                            </Fragment>
                          );
                        })}

                        {/* Overall columns */}
                        <td className="text-center py-2 px-2 border-l border-border/20">
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded text-xs font-medium",
                              JUDGMENT_COLORS[r.overallRoB] ||
                                "bg-gray-200 text-gray-500"
                            )}
                          >
                            {JUDGMENT_LABELS[r.overallRoB] || r.overallRoB}
                          </span>
                        </td>
                        <td className="text-center py-2 px-2">
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded text-xs font-medium",
                              JUDGMENT_COLORS[r.overallApplicability] ||
                                "bg-gray-200 text-gray-500"
                            )}
                          >
                            {JUDGMENT_LABELS[r.overallApplicability] ||
                              r.overallApplicability}
                          </span>
                        </td>
                      </tr>

                      {/* Expanded domain details */}
                      {isExpanded && (
                        <tr>
                          <td
                            colSpan={
                              // caret + study + (4 domains * 2 cols - 1 for flow_timing) + 2 overall
                              2 + DOMAIN_ORDER.length * 2 - 1 + 2
                            }
                            className="p-0"
                          >
                            <div className="bg-surface-raised/30 border-b border-border/50 px-6 py-4 space-y-4">
                              {DOMAIN_ORDER.map((domainKey) => {
                                const domainData = domainMap.get(domainKey);
                                if (!domainData) return null;
                                const hasApp =
                                  domainKey !== NO_APPLICABILITY_DOMAIN;

                                return (
                                  <div key={domainKey} className="space-y-1.5">
                                    <div className="text-xs font-semibold text-ink">
                                      {DOMAIN_LABELS[domainKey]}
                                    </div>

                                    {/* Risk of Bias row */}
                                    <div className="flex items-start gap-2 pl-2">
                                      <span
                                        className={cn(
                                          "shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold",
                                          JUDGMENT_COLORS[
                                            domainData.riskOfBias ?? ""
                                          ] || "bg-gray-200 text-gray-500"
                                        )}
                                      >
                                        {judgmentSymbol(domainData.riskOfBias)}
                                      </span>
                                      <div className="min-w-0">
                                        <span className="text-xs text-ink-muted font-medium">
                                          Risk of Bias:{" "}
                                        </span>
                                        <span
                                          className={cn(
                                            "text-[10px] px-1.5 py-0.5 rounded font-medium",
                                            JUDGMENT_COLORS[
                                              domainData.riskOfBias ?? ""
                                            ] || "bg-gray-200 text-gray-500"
                                          )}
                                        >
                                          {JUDGMENT_LABELS[
                                            domainData.riskOfBias ?? ""
                                          ] || domainData.riskOfBias}
                                        </span>
                                        {domainData.rationale && (
                                          <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                                            {domainData.rationale}
                                          </p>
                                        )}
                                      </div>
                                    </div>

                                    {/* Applicability Concern row (only for applicable domains) */}
                                    {hasApp && (
                                      <div className="flex items-start gap-2 pl-2">
                                        <span
                                          className={cn(
                                            "shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold",
                                            JUDGMENT_COLORS[
                                              domainData.applicabilityConcern ??
                                                ""
                                            ] || "bg-gray-200 text-gray-500"
                                          )}
                                        >
                                          {judgmentSymbol(
                                            domainData.applicabilityConcern
                                          )}
                                        </span>
                                        <div className="min-w-0">
                                          <span className="text-xs text-ink-muted font-medium">
                                            Applicability Concern:{" "}
                                          </span>
                                          <span
                                            className={cn(
                                              "text-[10px] px-1.5 py-0.5 rounded font-medium",
                                              JUDGMENT_COLORS[
                                                domainData.applicabilityConcern ??
                                                  ""
                                              ] || "bg-gray-200 text-gray-500"
                                            )}
                                          >
                                            {JUDGMENT_LABELS[
                                              domainData.applicabilityConcern ??
                                                ""
                                            ] || domainData.applicabilityConcern}
                                          </span>
                                        </div>
                                      </div>
                                    )}

                                    {/* N/A note for Flow & Timing */}
                                    {!hasApp && (
                                      <div className="pl-7 text-[10px] text-ink-muted/50">
                                        Applicability concern not applicable for
                                        this domain.
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassPanel>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Small helper sub-component for a traffic-light badge
// ---------------------------------------------------------------------------

function JudgmentBadge({ judgment }: { judgment: string | null }) {
  if (!judgment) {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold bg-surface border border-border/40 text-ink-muted/50">
        —
      </span>
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold",
        JUDGMENT_COLORS[judgment] || "bg-gray-200 text-gray-500"
      )}
      title={JUDGMENT_LABELS[judgment] || judgment}
    >
      {judgmentSymbol(judgment)}
    </span>
  );
}
