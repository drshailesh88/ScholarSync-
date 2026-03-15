"use client";

import { useState, useEffect, useCallback, Fragment } from "react";
import {
  ShieldCheck,
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

interface ROBINSIPanelProps {
  projectId: number;
}

interface ROBINSIDomain {
  domain: string;
  judgment: string;
  rationale: string;
}

interface ROBINSIResult {
  paperId: number;
  domains: ROBINSIDomain[];
  overallJudgment: string;
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

const ROBINS_I_DOMAIN_LABELS: Record<string, string> = {
  robins_i_confounding: "Confounding",
  robins_i_selection: "Participant selection",
  robins_i_classification: "Intervention classification",
  robins_i_deviations: "Deviations from interventions",
  robins_i_missing_data: "Missing data",
  robins_i_measurement: "Outcome measurement",
  robins_i_reporting: "Reported result selection",
};

// Short column headers for the traffic-light table
const ROBINS_I_SHORT_LABELS: Record<string, string> = {
  robins_i_confounding: "Conf.",
  robins_i_selection: "Select.",
  robins_i_classification: "Class.",
  robins_i_deviations: "Dev.",
  robins_i_missing_data: "Miss.",
  robins_i_measurement: "Meas.",
  robins_i_reporting: "Report.",
};

const DOMAIN_ORDER = [
  "robins_i_confounding",
  "robins_i_selection",
  "robins_i_classification",
  "robins_i_deviations",
  "robins_i_missing_data",
  "robins_i_measurement",
  "robins_i_reporting",
];

// ROBINS-I uses a 5-level scale with distinct colours
const JUDGMENT_COLORS: Record<string, string> = {
  // Stored variants (decoded from DB)
  Low: "bg-emerald-500 text-white",
  Moderate: "bg-yellow-400 text-gray-900",
  Serious: "bg-orange-500 text-white",
  Critical: "bg-red-600 text-white",
  "No information": "bg-gray-400 text-white",
  // DB enum variants (fallback)
  low: "bg-emerald-500 text-white",
  some_concerns: "bg-yellow-400 text-gray-900",
  high: "bg-orange-500 text-white",
};

const JUDGMENT_LABELS: Record<string, string> = {
  Low: "Low",
  Moderate: "Moderate",
  Serious: "Serious",
  Critical: "Critical",
  "No information": "No information",
  low: "Low",
  some_concerns: "Moderate",
  high: "Serious",
};

function judgmentSymbol(judgment: string): string {
  switch (judgment) {
    case "Low":
    case "low":
      return "+";
    case "Moderate":
    case "some_concerns":
      return "~";
    case "Serious":
      return "!";
    case "Critical":
    case "high":
      return "-";
    case "No information":
      return "?";
    default:
      return "?";
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ROBINSIPanel({ projectId }: ROBINSIPanelProps) {
  const [results, setResults] = useState<ROBINSIResult[]>([]);
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
        `/api/systematic-review/robins-i?projectId=${projectId}`
      );
      if (!res.ok) throw new Error("Failed to load ROBINS-I assessments");
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
            `Paper "${paper.title}" has insufficient text (abstract < 100 chars). Full text is needed for ROBINS-I assessment.`
          );
        }

        const res = await fetch("/api/systematic-review/robins-i", {
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

        const res = await fetch("/api/systematic-review/robins-i", {
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
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <GlassPanel className="p-6">
        <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <ShieldCheck weight="duotone" className="text-brand" size={24} />
          ROBINS-I Risk of Bias Assessment
        </h2>
        <p className="text-sm text-ink-muted mb-4">
          Cochrane ROBINS-I tool — evaluates 7 domains for non-randomized
          studies of interventions. AI answers signaling questions with
          supporting text from the paper. Generates per-domain and overall Low
          / Moderate / Serious / Critical judgments.
        </p>

        {/* Domain Legend */}
        <div className="grid grid-cols-4 gap-2 mb-4 sm:grid-cols-7">
          {DOMAIN_ORDER.map((id) => (
            <div
              key={id}
              className="text-center p-2 bg-surface-raised rounded border border-border"
            >
              <div className="text-xs font-medium text-ink">
                {ROBINS_I_SHORT_LABELS[id]}
              </div>
              <div className="text-[10px] text-ink-muted leading-tight mt-0.5">
                {ROBINS_I_DOMAIN_LABELS[id]}
              </div>
            </div>
          ))}
        </div>

        {/* Judgment Legend */}
        <div className="flex items-center gap-3 flex-wrap mb-6">
          <span className="text-xs text-ink-muted">Judgments:</span>
          {[
            { label: "Low", color: "bg-emerald-500", symbol: "+" },
            { label: "Moderate", color: "bg-yellow-400", symbol: "~" },
            { label: "Serious", color: "bg-orange-500", symbol: "!" },
            { label: "Critical", color: "bg-red-600", symbol: "-" },
            { label: "No info", color: "bg-gray-400", symbol: "?" },
          ].map(({ label, color, symbol }) => (
            <span key={label} className="inline-flex items-center gap-1.5 text-xs">
              <span
                className={cn(
                  "w-4 h-4 rounded-full inline-flex items-center justify-center text-[10px] font-bold",
                  color,
                  label === "Moderate" ? "text-gray-900" : "text-white"
                )}
              >
                {symbol}
              </span>
              {label}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Paper Selector */}
          <select aria-label="Select option"
            value={selectedPaperId ?? ""}
            onChange={(e) =>
              setSelectedPaperId(e.target.value ? Number(e.target.value) : null)
            }
            disabled={isLoading || isAssessing || isAssessingAll}
            className="text-sm rounded-md border border-border bg-surface px-3 py-1.5 text-ink disabled:opacity-50"
          >
            <option value="">Select a paper...</option>
            {/* empty state: no data, no results, nothing here */}
            {papers.length === 0 && (
              <option value="" disabled>no results — nothing here to display</option>
            )}
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
            Run ROBINS-I Assessment
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
              <ShieldCheck weight="duotone" size={16} />
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

      {/* Error State */}
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

      {/* Loading State */}
      {isLoading && results.length === 0 && (
        <GlassPanel className="p-8">
          <div className="flex flex-col items-center justify-center gap-3 text-ink-muted">
            <CircleNotch className="animate-spin" size={28} />
            <p className="text-sm">Loading ROBINS-I assessments...</p>
          </div>
        </GlassPanel>
      )}

      {/* Empty State */}
      {!isLoading && results.length === 0 && (
        <GlassPanel className="p-8">
          <div className="flex flex-col items-center justify-center gap-3 text-ink-muted">
            <ShieldCheck weight="duotone" size={40} className="opacity-40" />
            <p className="text-sm">No ROBINS-I assessments yet.</p>
            <p className="text-xs text-ink-muted/70">
              {papers.length > 0
                ? 'Select a paper above or click "Assess All Included" to begin.'
                : "Import and screen papers first, then return here to assess risk of bias."}
            </p>
          </div>
        </GlassPanel>
      )}

      {/* Traffic Light Table */}
      {results.length > 0 && (
        <GlassPanel className="p-6">
          <h3 className="text-sm font-semibold text-ink mb-1 flex items-center gap-2">
            <CheckCircle weight="duotone" className="text-emerald-500" size={18} />
            ROBINS-I Summary — Non-randomized Studies
          </h3>
          <p className="text-xs text-ink-muted mb-4">
            {results.length} study{results.length !== 1 ? "s" : ""} assessed.
            Click a row to expand domain details and rationale.
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
                      className="text-center py-2 px-1 text-ink-muted font-medium text-xs"
                      title={ROBINS_I_DOMAIN_LABELS[d]}
                    >
                      {ROBINS_I_SHORT_LABELS[d]}
                    </th>
                  ))}
                  <th className="text-center py-2 px-2 text-ink-muted font-medium">
                    Overall
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => {
                  const isExpanded = expandedRow === r.paperId;
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
                        {DOMAIN_ORDER.map((d) => {
                          const domain = r.domains.find(
                            (dom) => dom.domain === d
                          );
                          const judgment = domain?.judgment || "—";
                          return (
                            <td key={d} className="text-center py-2 px-1">
                              <span
                                className={cn(
                                  "inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold",
                                  judgment === "—"
                                    ? "bg-gray-100 text-gray-400"
                                    : JUDGMENT_COLORS[judgment] ||
                                      "bg-gray-200 text-gray-500"
                                )}
                                title={
                                  ROBINS_I_DOMAIN_LABELS[d] +
                                  ": " +
                                  (JUDGMENT_LABELS[judgment] || judgment)
                                }
                              >
                                {judgment === "—"
                                  ? "—"
                                  : judgmentSymbol(judgment)}
                              </span>
                            </td>
                          );
                        })}
                        <td className="text-center py-2 px-2">
                          <span
                            className={cn(
                              "px-2 py-1 rounded text-xs font-medium",
                              JUDGMENT_COLORS[r.overallJudgment] ||
                                "bg-gray-200 text-gray-500"
                            )}
                          >
                            {JUDGMENT_LABELS[r.overallJudgment] ||
                              r.overallJudgment}
                          </span>
                        </td>
                      </tr>

                      {/* Expanded domain details */}
                      {isExpanded && (
                        <tr>
                          <td
                            colSpan={DOMAIN_ORDER.length + 3}
                            className="p-0"
                          >
                            <div className="bg-surface-raised/30 border-b border-border/50 px-6 py-4 space-y-3">
                              {DOMAIN_ORDER.map((domainKey) => {
                                const domain = r.domains.find(
                                  (d) => d.domain === domainKey
                                );
                                if (!domain) return null;
                                return (
                                  <div
                                    key={domainKey}
                                    className="flex items-start gap-3"
                                  >
                                    <span
                                      className={cn(
                                        "shrink-0 mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold",
                                        JUDGMENT_COLORS[domain.judgment] ||
                                          "bg-gray-200 text-gray-500"
                                      )}
                                    >
                                      {judgmentSymbol(domain.judgment)}
                                    </span>
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-xs font-semibold text-ink">
                                          {ROBINS_I_DOMAIN_LABELS[domainKey] ||
                                            domainKey}
                                        </span>
                                        <span
                                          className={cn(
                                            "text-[10px] px-1.5 py-0.5 rounded font-medium",
                                            JUDGMENT_COLORS[domain.judgment] ||
                                              "bg-gray-200 text-gray-500"
                                          )}
                                        >
                                          {JUDGMENT_LABELS[domain.judgment] ||
                                            domain.judgment}
                                        </span>
                                      </div>
                                      {domain.rationale && (
                                        <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                                          {domain.rationale}
                                        </p>
                                      )}
                                    </div>
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
