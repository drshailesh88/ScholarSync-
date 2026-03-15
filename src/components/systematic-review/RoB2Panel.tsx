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

interface RoB2PanelProps {
  projectId: number;
}

interface RoB2Domain {
  domain: string;
  judgment: string;
  supportText: string | null;
}

interface RoB2Result {
  paperId: number;
  domains: RoB2Domain[];
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

const ROB2_DOMAIN_LABELS: Record<string, string> = {
  D1: "Randomization",
  D2: "Deviations",
  D3: "Missing data",
  D4: "Measurement",
  D5: "Selection",
};

const JUDGMENT_COLORS: Record<string, string> = {
  low: "bg-emerald-500 text-white",
  some_concerns: "bg-amber-500 text-white",
  high: "bg-red-500 text-white",
  Low: "bg-emerald-500 text-white",
  "Some concerns": "bg-amber-500 text-white",
  High: "bg-red-500 text-white",
};

const JUDGMENT_LABELS: Record<string, string> = {
  low: "Low",
  some_concerns: "Some concerns",
  high: "High",
  Low: "Low",
  "Some concerns": "Some concerns",
  High: "High",
};

function judgmentSymbol(judgment: string): string {
  const j = judgment.toLowerCase();
  if (j === "low") return "+";
  if (j === "high") return "-";
  return "?";
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function RoB2Panel({ projectId }: RoB2PanelProps) {
  const [results, setResults] = useState<RoB2Result[]>([]);
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
        `/api/systematic-review/rob2?projectId=${projectId}`
      );
      if (!res.ok) throw new Error("Failed to load RoB 2 assessments");
      const data = await res.json();
      // API returns array directly
      setResults(Array.isArray(data) ? data : data.summary ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load assessments");
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
      // Filter to only included papers (screening decision = "include")
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
            `Paper "${paper.title}" has insufficient text (abstract < 100 chars). Full text is needed for RoB 2 assessment.`
          );
        }

        const res = await fetch("/api/systematic-review/rob2", {
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

        // Reload summary to pick up new result
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
        if (textContent.length < 100) continue; // Skip papers without enough text

        const res = await fetch("/api/systematic-review/rob2", {
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

  const includedPapers = papers;
  const alreadyAssessedIds = new Set(results.map((r) => r.paperId));
  const unassessedPapers = includedPapers.filter(
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
          <ShieldCheck weight="duotone" className="text-brand" size={24} />
          RoB 2 Risk of Bias Assessment
        </h2>
        <p className="text-sm text-ink-muted mb-4">
          Cochrane RoB 2 tool — evaluates 5 domains with signaling questions.
          AI answers each question with supporting text from the paper.
          Generates per-domain and overall Low / Some Concerns / High judgments.
        </p>

        {/* RoB 2 Domains Legend */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {Object.entries(ROB2_DOMAIN_LABELS).map(([id, name]) => (
            <div
              key={id}
              className="text-center p-2 bg-surface-raised rounded border border-border"
            >
              <div className="text-xs font-medium text-ink">{id}</div>
              <div className="text-xs text-ink-muted">{name}</div>
            </div>
          ))}
        </div>

        {/* Judgment Legend */}
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
            Some Concerns
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs">
            <span className="w-4 h-4 rounded-full bg-red-500 inline-flex items-center justify-center text-white text-[10px] font-bold">
              -
            </span>
            High
          </span>
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
            {includedPapers.map((p) => {
              const assessed = alreadyAssessedIds.has(p.paperId);
              const shortTitle =
                p.title.length > 60
                  ? p.title.slice(0, 57) + "..."
                  : p.title;
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
              const paper = includedPapers.find(
                (p) => p.paperId === selectedPaperId
              );
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
            Run RoB 2 Assessment
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
              ? `Assessing (${assessingPaperId ? getPaperTitle(assessingPaperId).slice(0, 20) + "..." : "..."})`
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
            <p className="text-sm">Loading assessments...</p>
          </div>
        </GlassPanel>
      )}

      {/* Empty State */}
      {!isLoading && results.length === 0 && (
        <GlassPanel className="p-8">
          <div className="flex flex-col items-center justify-center gap-3 text-ink-muted">
            <ShieldCheck weight="duotone" size={40} className="opacity-40" />
            <p className="text-sm">No RoB 2 assessments yet.</p>
            <p className="text-xs text-ink-muted/70">
              {papers.length > 0
                ? "Select a paper above or click \"Assess All Included\" to begin."
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
            Risk of Bias Summary
          </h3>
          <p className="text-xs text-ink-muted mb-4">
            {results.length} paper{results.length !== 1 ? "s" : ""} assessed.
            Click a row to expand domain details.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 text-ink-muted font-medium w-8" />
                  <th className="text-left py-2 pr-4 text-ink-muted font-medium">
                    Study
                  </th>
                  {Object.keys(ROB2_DOMAIN_LABELS).map((d) => (
                    <th
                      key={d}
                      className="text-center py-2 px-2 text-ink-muted font-medium"
                    >
                      {d}
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
                        {Object.keys(ROB2_DOMAIN_LABELS).map((d) => {
                          const domain = r.domains.find(
                            (dom) => dom.domain === d
                          );
                          const judgment = domain?.judgment || "—";
                          return (
                            <td key={d} className="text-center py-2 px-2">
                              <span
                                className={cn(
                                  "inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold",
                                  JUDGMENT_COLORS[judgment] ||
                                    "bg-gray-200 text-gray-500"
                                )}
                                title={
                                  JUDGMENT_LABELS[judgment] || judgment
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
                              "px-2.5 py-1 rounded text-xs font-medium",
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
                            colSpan={
                              Object.keys(ROB2_DOMAIN_LABELS).length + 3
                            }
                            className="p-0"
                          >
                            <div className="bg-surface-raised/30 border-b border-border/50 px-6 py-4 space-y-3">
                              {r.domains.map((domain) => (
                                <div
                                  key={domain.domain}
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
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-semibold text-ink">
                                        {domain.domain}
                                        {ROB2_DOMAIN_LABELS[domain.domain]
                                          ? ` — ${ROB2_DOMAIN_LABELS[domain.domain]}`
                                          : ""}
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
                                    {domain.supportText && (
                                      <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                                        {domain.supportText}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
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
