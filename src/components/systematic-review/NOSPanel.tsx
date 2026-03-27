"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Star,
  CaretDown,
  CaretRight,
  CircleNotch,
  CheckCircle,
  FloppyDisk,
  Export,
  Scales,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import {
  getNOSItems,
  scoreNOSAssessment,
  exportNOSSummaryCSV,
  generateStarDisplay,
} from "@/lib/systematic-review/newcastle-ottawa";
import type {
  NOSStudyDesign,
  NOSItemResult,
  NOSAssessment,
  NOSQualityRating,
} from "@/lib/systematic-review/newcastle-ottawa";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NOSPanelProps {
  projectId: number;
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

// Per-paper form state: which option is selected for each NOS item
type ItemSelections = Record<string, number>; // itemId -> selected option index

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const QUALITY_BADGE: Record<NOSQualityRating, string> = {
  good: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  fair: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  poor: "bg-red-500/20 text-red-400 border-red-500/30",
};

const QUALITY_LABEL: Record<NOSQualityRating, string> = {
  good: "Good",
  fair: "Fair",
  poor: "Poor",
};

function paperLabel(p: ImportedPaper): string {
  const authorStr =
    Array.isArray(p.authors) && p.authors.length > 0
      ? String(p.authors[0])
      : "";
  const yearStr = p.year ? ` (${p.year})` : "";
  if (authorStr) return `${authorStr}${yearStr}`;
  return p.title?.slice(0, 60) || `Paper #${p.paperId}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function NOSPanel({ projectId }: NOSPanelProps) {
  const [studyDesign, setStudyDesign] = useState<NOSStudyDesign>("cohort");
  const [papers, setPapers] = useState<ImportedPaper[]>([]);
  const [assessments, setAssessments] = useState<Record<string, NOSAssessment>>(
    {}
  );
  const [formState, setFormState] = useState<Record<string, ItemSelections>>(
    {}
  );
  const [rationales, setRationales] = useState<Record<string, string>>({});
  const [expandedPaper, setExpandedPaper] = useState<number | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, string[]>>({});
  const [savingPaper, setSavingPaper] = useState<number | null>(null);
  const [loadingPapers, setLoadingPapers] = useState(false);
  const [loadingAssessments, setLoadingAssessments] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // -------------------------------------------------------------------------
  // Data fetching
  // -------------------------------------------------------------------------

  const fetchPapers = useCallback(async () => {
    setLoadingPapers(true);
    try {
      const res = await fetch(
        `/api/systematic-review/import?projectId=${projectId}`
      );
      if (!res.ok) throw new Error("Failed to load papers");
      const data: ImportedPaper[] = await res.json();
      setPapers(data.filter((p) => p.screeningDecision === "include"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load papers");
    } finally {
      setLoadingPapers(false);
    }
  }, [projectId]);

  const fetchAssessments = useCallback(async () => {
    setLoadingAssessments(true);
    try {
      const res = await fetch(
        `/api/systematic-review/nos?projectId=${projectId}`
      );
      if (!res.ok) throw new Error("Failed to load assessments");
      const data: NOSAssessment[] = await res.json();
      const map: Record<string, NOSAssessment> = {};
      const forms: Record<string, ItemSelections> = {};
      const rats: Record<string, string> = {};

      for (const a of data) {
        map[a.paperId] = a;
        rats[a.paperId] = a.overallRationale || "";

        // Rebuild form state from saved items
        const selections: ItemSelections = {};
        const items = getNOSItems(a.studyDesign);
        for (const savedItem of a.items) {
          const nosItem = items.find((i) => i.id === savedItem.itemId);
          if (nosItem) {
            const optIdx = nosItem.options.findIndex(
              (o) => o.label === savedItem.selectedOption
            );
            if (optIdx >= 0) selections[savedItem.itemId] = optIdx;
          }
        }
        forms[a.paperId] = selections;
      }

      setAssessments(map);
      setFormState((prev) => ({ ...prev, ...forms }));
      setRationales((prev) => ({ ...prev, ...rats }));
    } catch {
      // Silently ignore — assessments may not exist yet
    } finally {
      setLoadingAssessments(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchPapers();
    fetchAssessments();
  }, [fetchPapers, fetchAssessments]);

  // -------------------------------------------------------------------------
  // Form helpers
  // -------------------------------------------------------------------------

  const nosItems = getNOSItems(studyDesign);

  function setSelection(paperId: number, itemId: string, optionIdx: number) {
    setFormState((prev) => ({
      ...prev,
      [String(paperId)]: {
        ...(prev[String(paperId)] || {}),
        [itemId]: optionIdx,
      },
    }));
  }

  function buildItemResults(paperId: number): NOSItemResult[] {
    const selections = formState[String(paperId)] || {};
    return nosItems
      .filter((item) => selections[item.id] !== undefined)
      .map((item) => {
        const optIdx = selections[item.id];
        const option = item.options[optIdx];
        return {
          itemId: item.id,
          category: item.category,
          question: item.question,
          selectedOption: option.label,
          starsAwarded: option.stars,
          maxStars: item.maxStars,
          rationale: "",
        };
      });
  }

  function computeLiveScore(paperId: number): NOSAssessment | null {
    const itemResults = buildItemResults(paperId);
    if (itemResults.length === 0) return null;
    return scoreNOSAssessment(
      String(paperId),
      studyDesign,
      itemResults,
      rationales[String(paperId)] || ""
    );
  }

  // -------------------------------------------------------------------------
  // Save
  // -------------------------------------------------------------------------

  async function saveAssessment(paperId: number) {
    const itemResults = buildItemResults(paperId);
    if (itemResults.length === 0) return;

    const assessment = scoreNOSAssessment(
      String(paperId),
      studyDesign,
      itemResults,
      rationales[String(paperId)] || ""
    );

    setSavingPaper(paperId);
    setError(null);
    try {
      const res = await fetch("/api/systematic-review/nos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, assessment }),
      });
      if (!res.ok) throw new Error("Failed to save assessment");
      setAssessments((prev) => ({ ...prev, [String(paperId)]: assessment }));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save assessment"
      );
    } finally {
      setSavingPaper(null);
    }
  }

  // -------------------------------------------------------------------------
  // CSV export
  // -------------------------------------------------------------------------

  function handleExportCSV() {
    const allAssessments = Object.values(assessments);
    if (allAssessments.length === 0) return;
    const csv = exportNOSSummaryCSV(allAssessments);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nos-summary-project-${projectId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // -------------------------------------------------------------------------
  // Render helpers
  // -------------------------------------------------------------------------

  const assessedPapers = papers.filter((p) => assessments[String(p.paperId)]);
  const isLoading = loadingPapers || loadingAssessments;

  // Group NOS items by category for display
  function groupByCategory() {
    const groups: { category: string; label: string; items: typeof nosItems }[] =
      [];
    const seen = new Set<string>();
    for (const item of nosItems) {
      if (!seen.has(item.category)) {
        seen.add(item.category);
        const label =
          item.category === "selection"
            ? "Selection"
            : item.category === "comparability"
              ? "Comparability"
              : item.category === "outcome"
                ? "Outcome"
                : "Exposure";
        groups.push({
          category: item.category,
          label,
          items: nosItems.filter((i) => i.category === item.category),
        });
      }
    }
    return groups;
  }

  function categorySummary(
    category: string,
    liveScore: NOSAssessment | null,
    savedAssessment?: NOSAssessment
  ) {
    const source = liveScore ?? savedAssessment;
    if (!source) return { score: 0, max: 0 };

    if (category === "selection") return source.categoryScores.selection;
    if (category === "comparability") return source.categoryScores.comparability;
    return source.categoryScores.outcomeOrExposure;
  }

  function categoryIndicator(score: number, max: number): string {
    if (max === 0) return "⚪";
    const ratio = score / max;
    if (ratio >= 0.75) return "🟢";
    if (ratio >= 0.4) return "🟡";
    return "🔴";
  }

  function toggleCategory(paperId: number, category: string) {
    setExpandedCategories((prev) => {
      const key = String(paperId);
      const current = new Set(prev[key] ?? []);
      if (current.has(category)) current.delete(category);
      else current.add(category);
      return { ...prev, [key]: Array.from(current) };
    });
  }

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <GlassPanel className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Scales weight="duotone" className="h-6 w-6 text-brand" />
          <div>
            <h2 className="sr-panel-title mb-0">
              Newcastle-Ottawa Scale
            </h2>
            <p className="text-sm text-ink-muted">
              Quality assessment for non-randomized studies (cohort &amp;
              case-control). Rate each domain to assign stars.
            </p>
          </div>
        </div>

        {assessedPapers.length > 0 && (
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 rounded-lg bg-surface-raised px-3 py-1.5 text-sm font-medium text-ink hover:bg-surface-raised/80 border border-border transition-colors"
          >
            <Export weight="bold" className="h-4 w-4" />
            Export CSV
          </button>
        )}
      </div>

      {/* Study design toggle */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-ink-muted">
          Study design:
        </span>
        <div className="flex rounded-lg border border-border overflow-hidden">
          <button
            onClick={() => setStudyDesign("cohort")}
            className={cn(
              "px-4 py-1.5 text-sm font-medium transition-colors",
              studyDesign === "cohort"
                ? "bg-brand text-white"
                : "bg-surface-raised text-ink-muted hover:text-ink"
            )}
          >
            Cohort
          </button>
          <button
            onClick={() => setStudyDesign("case-control")}
            className={cn(
              "px-4 py-1.5 text-sm font-medium transition-colors",
              studyDesign === "case-control"
                ? "bg-brand text-white"
                : "bg-surface-raised text-ink-muted hover:text-ink"
            )}
          >
            Case-Control
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Summary table */}
      {assessedPapers.length > 0 && (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-raised text-ink-muted border-b border-border">
                <th className="text-left px-4 py-2 font-medium">Paper</th>
                <th className="text-center px-3 py-2 font-medium">
                  Selection
                </th>
                <th className="text-center px-3 py-2 font-medium">
                  Comparability
                </th>
                <th className="text-center px-3 py-2 font-medium">
                  {studyDesign === "cohort" ? "Outcome" : "Exposure"}
                </th>
                <th className="text-center px-3 py-2 font-medium">Stars</th>
                <th className="text-center px-3 py-2 font-medium">Quality</th>
              </tr>
            </thead>
            <tbody>
              {assessedPapers.map((p) => {
                const a = assessments[String(p.paperId)];
                if (!a) return null;
                return (
                  <tr
                    key={p.paperId}
                    className="border-b border-border/50 hover:bg-surface-raised/40 transition-colors"
                  >
                    <td className="px-4 py-2 text-ink truncate max-w-[200px]">
                      {paperLabel(p)}
                    </td>
                    <td className="text-center px-3 py-2 text-ink">
                      {a.categoryScores.selection.score}/
                      {a.categoryScores.selection.max}
                    </td>
                    <td className="text-center px-3 py-2 text-ink">
                      {a.categoryScores.comparability.score}/
                      {a.categoryScores.comparability.max}
                    </td>
                    <td className="text-center px-3 py-2 text-ink">
                      {a.categoryScores.outcomeOrExposure.score}/
                      {a.categoryScores.outcomeOrExposure.max}
                    </td>
                    <td className="text-center px-3 py-2 text-ink font-mono text-xs">
                      {generateStarDisplay(a)}
                    </td>
                    <td className="text-center px-3 py-2">
                      <span
                        className={cn(
                          "inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                          QUALITY_BADGE[a.qualityRating]
                        )}
                      >
                        {QUALITY_LABEL[a.qualityRating]}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-8 text-ink-muted">
          <CircleNotch className="h-5 w-5 animate-spin" />
          <span className="text-sm">Loading...</span>
        </div>
      )}

      {/* Paper list */}
      {!isLoading && papers.length === 0 && (
        <div className="text-center py-8 text-ink-muted text-sm">
          No included papers found. Import and screen papers first.
        </div>
      )}

      {!isLoading && papers.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-ink-muted">
            Included papers ({papers.length})
          </h3>
          <div className="space-y-1">
            {papers.map((paper) => {
              const isExpanded = expandedPaper === paper.paperId;
              const savedAssessment = assessments[String(paper.paperId)];
              const liveScore = computeLiveScore(paper.paperId);
              const selections = formState[String(paper.paperId)] || {};
              const completedItems = Object.keys(selections).length;
              const isSaving = savingPaper === paper.paperId;

              return (
                <div
                  key={paper.paperId}
                  className="rounded-xl border border-border overflow-hidden"
                >
                  {/* Paper row header */}
                  <button
                    onClick={() =>
                      setExpandedPaper(isExpanded ? null : paper.paperId)
                    }
                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-surface-raised/40 transition-colors"
                  >
                    {isExpanded ? (
                      <CaretDown
                        weight="bold"
                        className="h-4 w-4 text-ink-muted shrink-0"
                      />
                    ) : (
                      <CaretRight
                        weight="bold"
                        className="h-4 w-4 text-ink-muted shrink-0"
                      />
                    )}
                    <span className="text-sm text-ink truncate flex-1">
                      {paperLabel(paper)}
                    </span>
                    {savedAssessment && (
                      <div className="flex items-center gap-2 shrink-0">
                        <CheckCircle
                          weight="fill"
                          className="h-4 w-4 text-emerald-400"
                        />
                        <span className="font-mono text-xs text-ink-muted">
                          {generateStarDisplay(savedAssessment)}
                        </span>
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-xs font-semibold",
                            QUALITY_BADGE[savedAssessment.qualityRating]
                          )}
                        >
                          {QUALITY_LABEL[savedAssessment.qualityRating]}
                        </span>
                      </div>
                    )}
                    {!savedAssessment && completedItems > 0 && (
                      <span className="text-xs text-ink-muted shrink-0">
                        {completedItems}/{nosItems.length} items
                      </span>
                    )}
                  </button>

                  {/* Expanded assessment form */}
                  {isExpanded && (
                    <div className="border-t border-border bg-surface-raised/20 px-4 py-4 space-y-5">
                      {/* Live score bar */}
                      {liveScore && (
                        <div className="flex items-center gap-4 rounded-lg bg-surface-raised px-4 py-2 border border-border">
                          <div className="flex items-center gap-1.5 text-sm text-ink">
                            <Star weight="fill" className="h-4 w-4 text-amber-400" />
                            <span className="font-mono">
                              {generateStarDisplay(liveScore)}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-ink-muted">
                            <span>
                              Selection: {liveScore.categoryScores.selection.score}/
                              {liveScore.categoryScores.selection.max}
                            </span>
                            <span>
                              Comparability:{" "}
                              {liveScore.categoryScores.comparability.score}/
                              {liveScore.categoryScores.comparability.max}
                            </span>
                            <span>
                              {studyDesign === "cohort" ? "Outcome" : "Exposure"}:{" "}
                              {liveScore.categoryScores.outcomeOrExposure.score}/
                              {liveScore.categoryScores.outcomeOrExposure.max}
                            </span>
                          </div>
                          <span
                            className={cn(
                              "ml-auto rounded-full border px-2 py-0.5 text-xs font-semibold",
                              QUALITY_BADGE[liveScore.qualityRating]
                            )}
                          >
                            {QUALITY_LABEL[liveScore.qualityRating]}
                          </span>
                        </div>
                      )}

                      {/* NOS items grouped by category */}
                      {groupByCategory().map((group) => (
                        <div
                          key={group.category}
                          className="overflow-hidden rounded-xl border border-border"
                        >
                          {(() => {
                            const summary = categorySummary(
                              group.category,
                              liveScore,
                              savedAssessment
                            );
                            const isCategoryExpanded = (
                              expandedCategories[String(paper.paperId)] ?? []
                            ).includes(group.category);

                            return (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    toggleCategory(paper.paperId, group.category)
                                  }
                                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-raised/40"
                                >
                                  {isCategoryExpanded ? (
                                    <CaretDown
                                      weight="bold"
                                      className="h-4 w-4 shrink-0 text-ink-muted"
                                    />
                                  ) : (
                                    <CaretRight
                                      weight="bold"
                                      className="h-4 w-4 shrink-0 text-ink-muted"
                                    />
                                  )}
                                  <span className="text-lg leading-none">
                                    {categoryIndicator(summary.score, summary.max)}
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <h4 className="text-sm font-semibold text-ink">
                                      {group.label}
                                    </h4>
                                    <p className="mt-1 text-xs text-ink-muted">
                                      Supporting detail: {summary.score}/{summary.max} stars awarded across {group.items.length} criteria.
                                    </p>
                                  </div>
                                  <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-xs font-semibold text-ink">
                                    {summary.score}/{summary.max}
                                  </span>
                                </button>

                                {isCategoryExpanded && (
                                  <div className="space-y-3 border-t border-border bg-surface-raised/20 px-4 py-4">
                                    {group.items.map((item) => {
                                      const selectedIdx = selections[item.id];
                                      return (
                                        <div key={item.id} className="space-y-1.5 pl-2">
                                          <p className="text-sm text-ink">
                                            <span className="font-medium text-brand">
                                              {item.id}.
                                            </span>{" "}
                                            {item.question}
                                            <span className="ml-1 text-xs text-ink-muted">
                                              (max {item.maxStars}{" "}
                                              {"★".repeat(item.maxStars)})
                                            </span>
                                          </p>
                                          <div className="space-y-1 pl-4">
                                            {item.options.map((option, optIdx) => (
                                              <label
                                                key={optIdx}
                                                className={cn(
                                                  "flex items-start gap-2 rounded-lg px-3 py-1.5 cursor-pointer text-sm transition-colors",
                                                  selectedIdx === optIdx
                                                    ? "bg-brand/10 border border-brand/30"
                                                    : "hover:bg-surface-raised/60 border border-transparent"
                                                )}
                                              >
                                                <input
                                                  type="radio"
                                                  name={`nos-${paper.paperId}-${item.id}`}
                                                  checked={selectedIdx === optIdx}
                                                  onChange={() =>
                                                    setSelection(
                                                      paper.paperId,
                                                      item.id,
                                                      optIdx
                                                    )
                                                  }
                                                  className="mt-0.5 accent-brand"
                                                />
                                                <span className="text-ink flex-1">
                                                  {option.label}
                                                </span>
                                                <span
                                                  className={cn(
                                                    "shrink-0 text-xs font-mono",
                                                    option.stars > 0
                                                      ? "text-amber-400"
                                                      : "text-ink-muted"
                                                  )}
                                                >
                                                  {"★".repeat(option.stars)}
                                                  {option.stars === 0 && "No star"}
                                                </span>
                                              </label>
                                            ))}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      ))}

                      {/* Rationale */}
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-ink-muted">
                          Overall rationale (optional)
                        </label>
                        <textarea
                          value={rationales[String(paper.paperId)] || ""}
                          onChange={(e) =>
                            setRationales((prev) => ({
                              ...prev,
                              [String(paper.paperId)]: e.target.value,
                            }))
                          }
                          rows={2}
                          placeholder="Notes on the overall quality assessment..."
                          className="w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-1 focus:ring-brand resize-y"
                        />
                      </div>

                      {/* Save button */}
                      <div className="flex justify-end">
                        <button
                          onClick={() => saveAssessment(paper.paperId)}
                          disabled={completedItems === 0 || isSaving}
                          className={cn(
                            "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                            completedItems === 0
                              ? "bg-surface-raised text-ink-muted cursor-not-allowed border border-border"
                              : "bg-brand text-white hover:bg-brand/90"
                          )}
                        >
                          {isSaving ? (
                            <CircleNotch className="h-4 w-4 animate-spin" />
                          ) : (
                            <FloppyDisk weight="bold" className="h-4 w-4" />
                          )}
                          {isSaving ? "Saving..." : "Save Assessment"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </GlassPanel>
  );
}
