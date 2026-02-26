"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  ShieldCheck,
  CircleNotch,
  Warning,
  Lightning,
  ArrowsClockwise,
  ChartBar,
  Export,
  CaretDown,
  CaretRight,
  CheckCircle,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import { RoB2Panel } from "./RoB2Panel";
import { ROBINSIPanel } from "./ROBINSIPanel";
import { QUADAS2Panel } from "./QUADAS2Panel";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface UnifiedRoBPanelProps {
  projectId: number;
}

type RoBTool = "rob2" | "robins_i" | "quadas2";
type ToolFilter = "all" | RoBTool;
type StudyType =
  | "rct"
  | "observational"
  | "diagnostic"
  | "cohort"
  | "case_control"
  | "cross_sectional"
  | "unknown";

interface ImportedPaper {
  ppId: number;
  paperId: number;
  title: string;
  authors: unknown;
  year: number | null;
  abstract: string | null;
  screeningDecision: string | null;
  studyType?: string | null;
}

interface PaperToolAssignment {
  paperId: number;
  detectedType: StudyType;
  assignedTool: RoBTool;
  overridden: boolean;
}

interface ToolSummaryResult {
  paperId: number;
  overallJudgment: string;
  tool: RoBTool;
  domainCount: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TOOL_META: Record<RoBTool, { label: string; shortLabel: string; color: string }> = {
  rob2: {
    label: "RoB 2 (RCTs)",
    shortLabel: "RoB 2",
    color: "bg-blue-500",
  },
  robins_i: {
    label: "ROBINS-I (Observational)",
    shortLabel: "ROBINS-I",
    color: "bg-purple-500",
  },
  quadas2: {
    label: "QUADAS-2 (Diagnostic)",
    shortLabel: "QUADAS-2",
    color: "bg-teal-500",
  },
};

const JUDGMENT_COLORS: Record<string, string> = {
  low: "bg-emerald-500",
  Low: "bg-emerald-500",
  some_concerns: "bg-amber-500",
  "Some concerns": "bg-amber-500",
  Moderate: "bg-yellow-400",
  Unclear: "bg-amber-500",
  high: "bg-red-500",
  High: "bg-red-500",
  Serious: "bg-orange-500",
  Critical: "bg-red-600",
  "No information": "bg-gray-400",
};

const JUDGMENT_DISPLAY: Record<string, string> = {
  low: "Low",
  Low: "Low",
  some_concerns: "Some concerns",
  "Some concerns": "Some concerns",
  Moderate: "Moderate",
  Unclear: "Unclear",
  high: "High",
  High: "High",
  Serious: "Serious",
  Critical: "Critical",
  "No information": "No info",
};

const STUDY_TYPE_LABELS: Record<StudyType, string> = {
  rct: "Randomized Controlled Trial",
  observational: "Observational",
  diagnostic: "Diagnostic Accuracy",
  cohort: "Cohort",
  case_control: "Case-Control",
  cross_sectional: "Cross-Sectional",
  unknown: "Unknown",
};

// ---------------------------------------------------------------------------
// Auto-detection heuristic
// ---------------------------------------------------------------------------

function detectStudyType(paper: ImportedPaper): StudyType {
  // Check explicit study_type field first
  if (paper.studyType) {
    const st = paper.studyType.toLowerCase();
    if (st.includes("rct") || st.includes("randomized") || st.includes("randomised"))
      return "rct";
    if (st.includes("diagnostic") || st.includes("accuracy") || st.includes("quadas"))
      return "diagnostic";
    if (st.includes("cohort")) return "cohort";
    if (st.includes("case-control") || st.includes("case control")) return "case_control";
    if (st.includes("cross-sectional") || st.includes("cross sectional"))
      return "cross_sectional";
    if (
      st.includes("observational") ||
      st.includes("non-randomized") ||
      st.includes("non-randomised")
    )
      return "observational";
  }

  // Heuristic from title + abstract
  const text = `${paper.title} ${paper.abstract || ""}`.toLowerCase();

  if (
    text.includes("randomized controlled") ||
    text.includes("randomised controlled") ||
    text.includes("rct") ||
    text.includes("randomly assigned") ||
    text.includes("randomly allocated")
  )
    return "rct";

  if (
    text.includes("diagnostic accuracy") ||
    text.includes("sensitivity and specificity") ||
    text.includes("receiver operating") ||
    text.includes("area under the curve") ||
    text.includes("index test") ||
    text.includes("reference standard")
  )
    return "diagnostic";

  if (text.includes("cohort study") || text.includes("prospective cohort") || text.includes("retrospective cohort"))
    return "cohort";

  if (text.includes("case-control") || text.includes("case control"))
    return "case_control";

  if (text.includes("cross-sectional") || text.includes("cross sectional"))
    return "cross_sectional";

  if (
    text.includes("observational") ||
    text.includes("non-randomized") ||
    text.includes("non-randomised") ||
    text.includes("quasi-experimental")
  )
    return "observational";

  return "unknown";
}

function suggestTool(studyType: StudyType): RoBTool {
  switch (studyType) {
    case "rct":
      return "rob2";
    case "diagnostic":
      return "quadas2";
    case "observational":
    case "cohort":
    case "case_control":
    case "cross_sectional":
      return "robins_i";
    case "unknown":
    default:
      return "rob2"; // Default to RoB 2
  }
}

// ---------------------------------------------------------------------------
// Sub-view type
// ---------------------------------------------------------------------------

type SubView = "dashboard" | "rob2" | "robins_i" | "quadas2";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function UnifiedRoBPanel({ projectId }: UnifiedRoBPanelProps) {
  const [papers, setPapers] = useState<ImportedPaper[]>([]);
  const [assignments, setAssignments] = useState<Map<number, PaperToolAssignment>>(
    new Map()
  );
  const [toolFilter, setToolFilter] = useState<ToolFilter>("all");
  const [subView, setSubView] = useState<SubView>("dashboard");
  const [isLoadingPapers, setIsLoadingPapers] = useState(false);
  const [isAutoAssigning, setIsAutoAssigning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedPaperId, setExpandedPaperId] = useState<number | null>(null);

  // Assessment summaries from each tool
  const [rob2Results, setRob2Results] = useState<ToolSummaryResult[]>([]);
  const [robinsIResults, setRobinsIResults] = useState<ToolSummaryResult[]>([]);
  const [quadas2Results, setQuadas2Results] = useState<ToolSummaryResult[]>([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  // -------------------------------------------------------------------------
  // Data loading
  // -------------------------------------------------------------------------

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

  const loadAllResults = useCallback(async () => {
    setIsLoadingResults(true);
    try {
      const [rob2Res, robinsIRes, quadas2Res] = await Promise.allSettled([
        fetch(`/api/systematic-review/rob2?projectId=${projectId}`).then((r) =>
          r.ok ? r.json() : []
        ),
        fetch(`/api/systematic-review/robins-i?projectId=${projectId}`).then(
          (r) => (r.ok ? r.json() : [])
        ),
        fetch(`/api/systematic-review/quadas2?projectId=${projectId}`).then(
          (r) => (r.ok ? r.json() : [])
        ),
      ]);

      const mapResults = (
        data: unknown,
        tool: RoBTool
      ): ToolSummaryResult[] => {
        const arr = Array.isArray(data)
          ? data
          : (data as Record<string, unknown>)?.summary ?? [];
        return (arr as Array<Record<string, unknown>>).map((r) => ({
          paperId: r.paperId as number,
          overallJudgment:
            (r.overallJudgment as string) || (r.overallRoB as string) || "unknown",
          tool,
          domainCount: Array.isArray(r.domains)
            ? (r.domains as unknown[]).length
            : 0,
        }));
      };

      setRob2Results(
        rob2Res.status === "fulfilled" ? mapResults(rob2Res.value, "rob2") : []
      );
      setRobinsIResults(
        robinsIRes.status === "fulfilled"
          ? mapResults(robinsIRes.value, "robins_i")
          : []
      );
      setQuadas2Results(
        quadas2Res.status === "fulfilled"
          ? mapResults(quadas2Res.value, "quadas2")
          : []
      );
    } catch {
      // Non-critical — individual panels will show their own errors
    } finally {
      setIsLoadingResults(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadPapers();
    loadAllResults();
  }, [loadPapers, loadAllResults]);

  // -------------------------------------------------------------------------
  // Auto-assign tools
  // -------------------------------------------------------------------------

  const autoAssignTools = useCallback(() => {
    setIsAutoAssigning(true);
    const newAssignments = new Map<number, PaperToolAssignment>();

    for (const paper of papers) {
      const existing = assignments.get(paper.paperId);
      // Don't overwrite manual overrides
      if (existing?.overridden) {
        newAssignments.set(paper.paperId, existing);
        continue;
      }

      const detectedType = detectStudyType(paper);
      const assignedTool = suggestTool(detectedType);
      newAssignments.set(paper.paperId, {
        paperId: paper.paperId,
        detectedType,
        assignedTool,
        overridden: false,
      });
    }

    setAssignments(newAssignments);
    setIsAutoAssigning(false);
  }, [papers, assignments]);

  // Auto-assign on first paper load
  useEffect(() => {
    if (papers.length > 0 && assignments.size === 0) {
      autoAssignTools();
    }
  }, [papers]); // eslint-disable-line react-hooks/exhaustive-deps

  // -------------------------------------------------------------------------
  // Computed values
  // -------------------------------------------------------------------------

  const allResults = useMemo(
    () => [...rob2Results, ...robinsIResults, ...quadas2Results],
    [rob2Results, robinsIResults, quadas2Results]
  );

  const assessedPaperIds = useMemo(
    () => new Set(allResults.map((r) => r.paperId)),
    [allResults]
  );

  const toolDistribution = useMemo(() => {
    const counts: Record<RoBTool, number> = { rob2: 0, robins_i: 0, quadas2: 0 };
    for (const a of assignments.values()) {
      counts[a.assignedTool]++;
    }
    return counts;
  }, [assignments]);

  const totalAssigned = toolDistribution.rob2 + toolDistribution.robins_i + toolDistribution.quadas2;

  const filteredPapers = useMemo(() => {
    if (toolFilter === "all") return papers;
    return papers.filter((p) => {
      const assignment = assignments.get(p.paperId);
      return assignment?.assignedTool === toolFilter;
    });
  }, [papers, assignments, toolFilter]);

  // Summary bar chart data for robvis-style charts
  const robvisSummary = useMemo(() => {
    const toolResults: Record<RoBTool, ToolSummaryResult[]> = {
      rob2: rob2Results,
      robins_i: robinsIResults,
      quadas2: quadas2Results,
    };

    const summaries: Array<{
      tool: RoBTool;
      label: string;
      judgments: Record<string, number>;
      total: number;
    }> = [];

    for (const tool of ["rob2", "robins_i", "quadas2"] as RoBTool[]) {
      const results = toolResults[tool];
      if (results.length === 0) continue;

      const judgments: Record<string, number> = {};
      for (const r of results) {
        const j = normalizeJudgment(r.overallJudgment);
        judgments[j] = (judgments[j] || 0) + 1;
      }

      summaries.push({
        tool,
        label: TOOL_META[tool].shortLabel,
        judgments,
        total: results.length,
      });
    }

    return summaries;
  }, [rob2Results, robinsIResults, quadas2Results]);

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------

  const handleToolOverride = (paperId: number, tool: RoBTool) => {
    setAssignments((prev) => {
      const next = new Map(prev);
      const existing = next.get(paperId);
      next.set(paperId, {
        paperId,
        detectedType: existing?.detectedType ?? "unknown",
        assignedTool: tool,
        overridden: true,
      });
      return next;
    });
  };

  const exportCSV = useCallback(() => {
    const rows: string[] = [
      "Paper ID,Title,Year,Detected Study Type,Assigned Tool,Assessment Status,Overall Judgment",
    ];

    for (const paper of papers) {
      const assignment = assignments.get(paper.paperId);
      const result = allResults.find((r) => r.paperId === paper.paperId);

      rows.push(
        [
          paper.paperId,
          `"${(paper.title || "").replace(/"/g, '""')}"`,
          paper.year ?? "",
          assignment ? STUDY_TYPE_LABELS[assignment.detectedType] : "",
          assignment ? TOOL_META[assignment.assignedTool].shortLabel : "",
          result ? "Assessed" : "Not assessed",
          result ? (JUDGMENT_DISPLAY[result.overallJudgment] || result.overallJudgment) : "",
        ].join(",")
      );
    }

    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rob-summary-project-${projectId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [papers, assignments, allResults, projectId]);

  // -------------------------------------------------------------------------
  // Loading / error states
  // -------------------------------------------------------------------------

  const isLoading = isLoadingPapers || isLoadingResults;

  // -------------------------------------------------------------------------
  // If sub-view is an individual tool, render that panel
  // -------------------------------------------------------------------------

  if (subView !== "dashboard") {
    return (
      <div className="space-y-4">
        <button
          onClick={() => {
            setSubView("dashboard");
            // Refresh results when returning to dashboard
            loadAllResults();
          }}
          className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-brand transition-colors"
        >
          <CaretRight size={14} className="rotate-180" />
          Back to Unified Dashboard
        </button>

        {subView === "rob2" && <RoB2Panel projectId={projectId} />}
        {subView === "robins_i" && <ROBINSIPanel projectId={projectId} />}
        {subView === "quadas2" && <QUADAS2Panel projectId={projectId} />}
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Dashboard Render
  // -------------------------------------------------------------------------

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <GlassPanel className="p-6">
        <h2 className="text-lg font-semibold text-ink mb-2 flex items-center gap-2">
          <ShieldCheck weight="duotone" className="text-brand" size={24} />
          Unified Risk of Bias Dashboard
        </h2>
        <p className="text-sm text-ink-muted mb-6">
          Automatically detects study designs and assigns the appropriate RoB
          assessment tool. Supports RoB 2 (RCTs), ROBINS-I (observational), and
          QUADAS-2 (diagnostic accuracy).
        </p>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-surface-raised rounded-lg border border-border p-3 text-center">
            <div className="text-2xl font-bold text-ink">{papers.length}</div>
            <div className="text-xs text-ink-muted">Included Papers</div>
          </div>
          <div className="bg-surface-raised rounded-lg border border-border p-3 text-center">
            <div className="text-2xl font-bold text-emerald-500">
              {assessedPaperIds.size}
            </div>
            <div className="text-xs text-ink-muted">Assessed</div>
          </div>
          <div className="bg-surface-raised rounded-lg border border-border p-3 text-center">
            <div className="text-2xl font-bold text-amber-500">
              {papers.length - assessedPaperIds.size}
            </div>
            <div className="text-xs text-ink-muted">Remaining</div>
          </div>
          <div className="bg-surface-raised rounded-lg border border-border p-3 text-center">
            <div className="text-2xl font-bold text-ink">
              {totalAssigned > 0
                ? Math.round((assessedPaperIds.size / totalAssigned) * 100)
                : 0}
              %
            </div>
            <div className="text-xs text-ink-muted">Completion</div>
          </div>
        </div>

        {/* Tool Distribution (mini pie chart via colored bars) */}
        {totalAssigned > 0 && (
          <div className="mb-6">
            <div className="text-xs text-ink-muted font-medium mb-2">
              Tool Assignment Distribution
            </div>
            <div className="flex h-3 rounded-full overflow-hidden bg-surface-raised border border-border">
              {(["rob2", "robins_i", "quadas2"] as RoBTool[]).map((tool) => {
                const count = toolDistribution[tool];
                if (count === 0) return null;
                const pct = (count / totalAssigned) * 100;
                return (
                  <div
                    key={tool}
                    className={cn(TOOL_META[tool].color, "transition-all")}
                    style={{ width: `${pct}%` }}
                    title={`${TOOL_META[tool].shortLabel}: ${count} papers (${Math.round(pct)}%)`}
                  />
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-2">
              {(["rob2", "robins_i", "quadas2"] as RoBTool[]).map((tool) => (
                <span key={tool} className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                  <span className={cn("w-2.5 h-2.5 rounded-full", TOOL_META[tool].color)} />
                  {TOOL_META[tool].shortLabel}: {toolDistribution[tool]}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={autoAssignTools}
            disabled={isLoading || isAutoAssigning || papers.length === 0}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
              "bg-brand text-white hover:bg-brand/90",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isAutoAssigning ? (
              <CircleNotch className="animate-spin" size={16} />
            ) : (
              <Lightning weight="fill" size={16} />
            )}
            Auto-Assign Tools
          </button>

          <button
            onClick={exportCSV}
            disabled={allResults.length === 0}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
              "bg-surface-raised border border-border text-ink hover:bg-surface-raised/80",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <Export size={16} />
            Export CSV
          </button>

          <button
            onClick={() => {
              loadPapers();
              loadAllResults();
            }}
            disabled={isLoading}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-ink-muted",
              "hover:bg-surface-raised transition-colors",
              "disabled:opacity-50"
            )}
          >
            <ArrowsClockwise className={cn(isLoading && "animate-spin")} size={16} />
            Refresh
          </button>
        </div>
      </GlassPanel>

      {/* Error State */}
      {error && (
        <GlassPanel className="p-4 border-red-500/30">
          <div className="flex items-start gap-2">
            <Warning weight="fill" className="text-red-500 shrink-0 mt-0.5" size={18} />
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
      {isLoading && papers.length === 0 && (
        <GlassPanel className="p-8">
          <div className="flex flex-col items-center justify-center gap-3 text-ink-muted">
            <CircleNotch className="animate-spin" size={28} />
            <p className="text-sm">Loading papers and assessments...</p>
          </div>
        </GlassPanel>
      )}

      {/* Tool Selector Tabs */}
      {papers.length > 0 && (
        <GlassPanel className="p-6">
          <div className="flex items-center gap-2 mb-4">
            {(
              [
                { key: "all", label: "All Papers" },
                { key: "rob2", label: `RoB 2 (${toolDistribution.rob2})` },
                { key: "robins_i", label: `ROBINS-I (${toolDistribution.robins_i})` },
                { key: "quadas2", label: `QUADAS-2 (${toolDistribution.quadas2})` },
              ] as Array<{ key: ToolFilter; label: string }>
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setToolFilter(tab.key)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  toolFilter === tab.key
                    ? "bg-brand text-white"
                    : "bg-surface-raised border border-border text-ink-muted hover:text-ink"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Open Individual Tool Panels */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-ink-muted">Open tool panel:</span>
            {(["rob2", "robins_i", "quadas2"] as RoBTool[]).map((tool) => (
              <button
                key={tool}
                onClick={() => setSubView(tool)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors",
                  "border border-border bg-surface-raised hover:bg-surface-raised/80 text-ink"
                )}
              >
                {tool === "rob2" && <ShieldCheck size={14} />}
                {tool === "robins_i" && <ShieldCheck size={14} />}
                {tool === "quadas2" && <MagnifyingGlass size={14} />}
                {TOOL_META[tool].shortLabel}
              </button>
            ))}
          </div>

          {/* Per-paper table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-2 text-ink-muted font-medium w-8" />
                  <th className="text-left py-2 pr-4 text-ink-muted font-medium">
                    Paper
                  </th>
                  <th className="text-left py-2 px-3 text-ink-muted font-medium">
                    Study Type
                  </th>
                  <th className="text-left py-2 px-3 text-ink-muted font-medium">
                    Assigned Tool
                  </th>
                  <th className="text-center py-2 px-3 text-ink-muted font-medium">
                    Status
                  </th>
                  <th className="text-center py-2 px-3 text-ink-muted font-medium">
                    Overall Judgment
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPapers.map((paper) => {
                  const assignment = assignments.get(paper.paperId);
                  const result = allResults.find(
                    (r) => r.paperId === paper.paperId
                  );
                  const isExpanded = expandedPaperId === paper.paperId;
                  const year = paper.year ? ` (${paper.year})` : "";
                  const shortTitle =
                    paper.title.length > 55
                      ? paper.title.slice(0, 52) + "..."
                      : paper.title;

                  return (
                    <tr
                      key={paper.paperId}
                      className={cn(
                        "border-b border-border/50 transition-colors",
                        isExpanded
                          ? "bg-surface-raised/50"
                          : "hover:bg-surface-raised/30"
                      )}
                    >
                      <td className="py-2 pr-1">
                        <button
                          onClick={() =>
                            setExpandedPaperId(isExpanded ? null : paper.paperId)
                          }
                          className="text-ink-muted hover:text-ink"
                        >
                          {isExpanded ? (
                            <CaretDown size={14} />
                          ) : (
                            <CaretRight size={14} />
                          )}
                        </button>
                      </td>
                      <td className="py-2 pr-4 text-ink max-w-xs">
                        <span title={paper.title}>
                          {shortTitle}
                          {year}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <span className="text-xs text-ink-muted">
                          {assignment
                            ? STUDY_TYPE_LABELS[assignment.detectedType]
                            : "..."}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <select
                          value={assignment?.assignedTool ?? "rob2"}
                          onChange={(e) =>
                            handleToolOverride(
                              paper.paperId,
                              e.target.value as RoBTool
                            )
                          }
                          className={cn(
                            "text-xs rounded border border-border bg-surface px-2 py-1 text-ink",
                            assignment?.overridden && "ring-1 ring-amber-400/50"
                          )}
                        >
                          <option value="rob2">RoB 2</option>
                          <option value="robins_i">ROBINS-I</option>
                          <option value="quadas2">QUADAS-2</option>
                        </select>
                        {assignment?.overridden && (
                          <span className="ml-1.5 text-[10px] text-amber-500 font-medium">
                            overridden
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-center">
                        {result ? (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-500">
                            <CheckCircle weight="fill" size={14} />
                            Done
                          </span>
                        ) : (
                          <span className="text-xs text-ink-muted/60">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-center">
                        {result ? (
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded text-xs font-medium text-white",
                              JUDGMENT_COLORS[result.overallJudgment] ||
                                "bg-gray-400"
                            )}
                          >
                            {JUDGMENT_DISPLAY[result.overallJudgment] ||
                              result.overallJudgment}
                          </span>
                        ) : (
                          <span className="text-xs text-ink-muted/40">--</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filteredPapers.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-sm text-ink-muted"
                    >
                      {papers.length === 0
                        ? "No included papers found. Import and screen papers first."
                        : "No papers match this filter."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassPanel>
      )}

      {/* Robvis-style Summary Bar Charts */}
      {robvisSummary.length > 0 && (
        <GlassPanel className="p-6">
          <h3 className="text-sm font-semibold text-ink mb-1 flex items-center gap-2">
            <ChartBar weight="duotone" className="text-brand" size={18} />
            Risk of Bias Summary (robvis-style)
          </h3>
          <p className="text-xs text-ink-muted mb-4">
            Horizontal stacked bars showing the proportion of each overall
            judgment per tool.
          </p>

          <div className="space-y-4">
            {robvisSummary.map((summary) => (
              <div key={summary.tool}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-ink">
                    {summary.label}
                  </span>
                  <span className="text-[10px] text-ink-muted">
                    {summary.total} paper{summary.total !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex h-6 rounded overflow-hidden bg-surface-raised border border-border">
                  {ROBVIS_JUDGMENT_ORDER.map((j) => {
                    const count = summary.judgments[j] || 0;
                    if (count === 0) return null;
                    const pct = (count / summary.total) * 100;
                    return (
                      <div
                        key={j}
                        className={cn(
                          ROBVIS_BAR_COLORS[j] || "bg-gray-400",
                          "flex items-center justify-center text-white text-[10px] font-medium transition-all"
                        )}
                        style={{ width: `${pct}%` }}
                        title={`${ROBVIS_LABELS[j] || j}: ${count} (${Math.round(pct)}%)`}
                      >
                        {pct > 12 ? `${Math.round(pct)}%` : ""}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Legend for robvis */}
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            {ROBVIS_JUDGMENT_ORDER.map((j) => (
              <span
                key={j}
                className="inline-flex items-center gap-1.5 text-xs text-ink-muted"
              >
                <span
                  className={cn(
                    "w-3 h-3 rounded",
                    ROBVIS_BAR_COLORS[j] || "bg-gray-400"
                  )}
                />
                {ROBVIS_LABELS[j] || j}
              </span>
            ))}
          </div>
        </GlassPanel>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Robvis constants
// ---------------------------------------------------------------------------

const ROBVIS_JUDGMENT_ORDER = [
  "low",
  "some_concerns",
  "moderate",
  "serious",
  "high",
  "critical",
  "unclear",
  "no_info",
];

const ROBVIS_BAR_COLORS: Record<string, string> = {
  low: "bg-emerald-500",
  some_concerns: "bg-amber-500",
  moderate: "bg-yellow-400",
  serious: "bg-orange-500",
  high: "bg-red-500",
  critical: "bg-red-700",
  unclear: "bg-amber-400",
  no_info: "bg-gray-400",
};

const ROBVIS_LABELS: Record<string, string> = {
  low: "Low",
  some_concerns: "Some concerns",
  moderate: "Moderate",
  serious: "Serious",
  high: "High",
  critical: "Critical",
  unclear: "Unclear",
  no_info: "No information",
};

function normalizeJudgment(j: string): string {
  const lower = j.toLowerCase().trim();
  if (lower === "low") return "low";
  if (lower === "some concerns" || lower === "some_concerns") return "some_concerns";
  if (lower === "moderate") return "moderate";
  if (lower === "serious") return "serious";
  if (lower === "high") return "high";
  if (lower === "critical") return "critical";
  if (lower === "unclear") return "unclear";
  if (lower === "no information" || lower === "no_information") return "no_info";
  return lower;
}
