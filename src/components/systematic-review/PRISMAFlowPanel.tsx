"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  FlowArrow,
  CircleNotch,
  FileSvg,
  FileImage,
  X,
  ArrowDown,
  ArrowRight,
  MagnifyingGlass,
  Funnel,
  CheckCircle,
  Database,
  FileText,
  ClipboardText,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { toPng } from "html-to-image";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PRISMAFlowData {
  identification: {
    databaseResults: number;
    registerResults: number;
    otherSources: number;
    totalIdentified: number;
    duplicatesRemoved: number;
    automationExcluded: number;
    otherReasonsRemoved: number;
  };
  screening: {
    recordsScreened: number;
    recordsExcluded: number;
    exclusionReasons: Record<string, number>;
  };
  eligibility: {
    reportsRetrieved: number;
    reportsNotRetrieved: number;
    reportsAssessed: number;
    reportsExcluded: number;
    exclusionReasons: Record<string, number>;
  };
  included: {
    studiesIncluded: number;
    reportsIncluded: number;
  };
}

interface PaperSummary {
  id: number;
  title: string;
  authors: string[];
  journal: string | null;
  year: number | null;
  doi: string | null;
  decision?: string;
  reason?: string;
}

interface PRISMAFlowPanelProps {
  projectId: number;
}

// Stage keys used for querying papers in each box
type FlowBoxKey =
  | "identified_databases"
  | "identified_registers"
  | "identified_other"
  | "duplicates_removed"
  | "automation_excluded"
  | "records_screened"
  | "records_excluded"
  | "reports_sought"
  | "reports_not_retrieved"
  | "reports_assessed"
  | "reports_excluded"
  | "studies_included"
  | "reports_included";

// ---------------------------------------------------------------------------
// Section colour bands (left gutter) matching PRISMA 2020 style
// ---------------------------------------------------------------------------

const SECTION_COLORS = {
  identification: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-600 dark:text-blue-400", accent: "#3b82f6" },
  screening: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-600 dark:text-amber-400", accent: "#f59e0b" },
  eligibility: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-600 dark:text-purple-400", accent: "#8b5cf6" },
  included: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-600 dark:text-green-400", accent: "#22c55e" },
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PRISMAFlowPanel({ projectId }: PRISMAFlowPanelProps) {
  const [flowData, setFlowData] = useState<PRISMAFlowData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Paper list drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("");
  const [drawerPapers, setDrawerPapers] = useState<PaperSummary[]>([]);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [drawerSearch, setDrawerSearch] = useState("");

  // Export
  const diagramRef = useRef<HTMLDivElement>(null);

  // -------------------------------------------------------------------------
  // Load flow data
  // -------------------------------------------------------------------------

  const loadFlow = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/systematic-review/prisma-flow?projectId=${projectId}`
      );
      if (!res.ok) throw new Error("Failed to load PRISMA flow");
      const data = await res.json();
      setFlowData(data.flowData);
    } catch {
      setError("Failed to generate PRISMA flow diagram. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  // Auto-load on mount
  useEffect(() => {
    loadFlow();
  }, [loadFlow]);

  // Real-time polling (every 30s when auto-refresh is on)
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(loadFlow, 30_000);
    return () => clearInterval(interval);
  }, [autoRefresh, loadFlow]);

  // -------------------------------------------------------------------------
  // Paper list drawer
  // -------------------------------------------------------------------------

  const openPaperDrawer = useCallback(
    async (boxKey: FlowBoxKey, title: string) => {
      setDrawerTitle(title);
      setDrawerOpen(true);
      setDrawerLoading(true);
      setDrawerSearch("");
      try {
        const res = await fetch(
          `/api/systematic-review/prisma-flow?projectId=${projectId}&papers=${boxKey}`
        );
        if (!res.ok) throw new Error("Failed to load papers");
        const data = await res.json();
        setDrawerPapers(data.papers ?? []);
      } catch {
        setDrawerPapers([]);
      } finally {
        setDrawerLoading(false);
      }
    },
    [projectId]
  );

  const filteredDrawerPapers = useMemo(() => {
    if (!drawerSearch.trim()) return drawerPapers;
    const q = drawerSearch.toLowerCase();
    return drawerPapers.filter(
      (p: PaperSummary) =>
        p.title.toLowerCase().includes(q) ||
        p.authors?.some((a: string) => a.toLowerCase().includes(q)) ||
        p.journal?.toLowerCase().includes(q)
    );
  }, [drawerPapers, drawerSearch]);

  // -------------------------------------------------------------------------
  // Export helpers
  // -------------------------------------------------------------------------

  const downloadSvg = useCallback(() => {
    if (!flowData) return;
    // Re-generate the SVG from the API for clean export
    fetch(`/api/systematic-review/prisma-flow?projectId=${projectId}&format=svg`)
      .then((res) => res.text())
      .then((svg) => {
        const blob = new Blob([svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "prisma-2020-flow-diagram.svg";
        a.click();
        URL.revokeObjectURL(url);
      });
  }, [flowData, projectId]);

  const downloadPng = useCallback(async () => {
    if (!diagramRef.current) return;
    try {
      const dataUrl = await toPng(diagramRef.current, {
        backgroundColor: "#ffffff",
        pixelRatio: 3,
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "prisma-2020-flow-diagram.png";
      a.click();
    } catch {
      setError("PNG export failed. Try SVG instead.");
    }
  }, []);

  // -------------------------------------------------------------------------
  // Computed values
  // -------------------------------------------------------------------------

  const afterDedup = flowData
    ? flowData.identification.totalIdentified - flowData.identification.duplicatesRemoved
    : 0;

  // -------------------------------------------------------------------------
  // Reusable flow box
  // -------------------------------------------------------------------------

  function FlowBox({
    label,
    count,
    icon: Icon,
    boxKey,
    variant = "default",
    reasons,
    className = "",
  }: {
    label: string;
    count: number;
    icon: React.ElementType;
    boxKey: FlowBoxKey;
    variant?: "default" | "excluded" | "highlight";
    reasons?: Record<string, number>;
    className?: string;
  }) {
    const variants = {
      default:
        "bg-white dark:bg-ink/5 border-border hover:border-brand/40 hover:shadow-md",
      excluded:
        "bg-red-50/50 dark:bg-red-500/5 border-red-200 dark:border-red-500/20 hover:border-red-400 hover:shadow-md",
      highlight:
        "bg-green-50 dark:bg-green-500/10 border-green-300 dark:border-green-500/30 hover:border-green-500 hover:shadow-md ring-1 ring-green-200 dark:ring-green-500/20",
    };

    return (
      <button
        onClick={() => openPaperDrawer(boxKey, label)}
        className={`group relative border rounded-xl px-4 py-3 text-left transition-all duration-200 cursor-pointer ${variants[variant]} ${className}`}
      >
        <div className="flex items-start gap-2">
          <Icon
            weight="duotone"
            size={18}
            className={
              variant === "excluded"
                ? "text-red-500 mt-0.5 shrink-0"
                : variant === "highlight"
                  ? "text-green-600 dark:text-green-400 mt-0.5 shrink-0"
                  : "text-ink-muted mt-0.5 shrink-0"
            }
          />
          <div className="min-w-0">
            <div className="text-xs font-medium text-ink-muted leading-tight">
              {label}
            </div>
            <div
              className={`text-lg font-bold tabular-nums ${
                variant === "highlight"
                  ? "text-green-700 dark:text-green-300"
                  : "text-ink"
              }`}
            >
              n = {count.toLocaleString()}
            </div>
            {reasons && Object.keys(reasons).length > 0 && (
              <div className="mt-1 space-y-0.5">
                {Object.entries(reasons)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([reason, n]) => (
                    <div
                      key={reason}
                      className="text-[10px] text-ink-muted leading-tight truncate"
                    >
                      {reason} (n={n})
                    </div>
                  ))}
                {Object.keys(reasons).length > 5 && (
                  <div className="text-[10px] text-ink-muted">
                    +{Object.keys(reasons).length - 5} more...
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-brand/[0.03] pointer-events-none" />
      </button>
    );
  }

  // Arrow component
  function DownArrow() {
    return (
      <div className="flex justify-center py-1">
        <ArrowDown weight="bold" size={18} className="text-ink-muted/50" />
      </div>
    );
  }

  function RightArrow() {
    return (
      <div className="flex items-center px-2">
        <ArrowRight weight="bold" size={18} className="text-ink-muted/50" />
      </div>
    );
  }

  // Section label
  function SectionLabel({
    title,
    section,
  }: {
    title: string;
    section: keyof typeof SECTION_COLORS;
  }) {
    const colors = SECTION_COLORS[section];
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colors.bg} ${colors.text} border ${colors.border}`}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: colors.accent }}
        />
        {title}
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="space-y-6 max-w-5xl relative sr-content">
      {/* Header */}
      <GlassPanel className="p-6 sr-panel">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-ink flex items-center gap-2 sr-panel-title">
              <FlowArrow weight="duotone" className="text-brand" />
              PRISMA 2020 Flow Diagram
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Auto-populated from your screening data. Click any box to view the
              papers. Updates in real-time as screening progresses.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {/* Auto-refresh toggle */}
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                autoRefresh
                  ? "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20"
                  : "bg-surface-raised text-ink-muted border border-border"
              }`}
              title={autoRefresh ? "Auto-refresh ON (30s)" : "Auto-refresh OFF"}
            >
              <ArrowsClockwise
                weight={autoRefresh ? "fill" : "regular"}
                size={14}
                className={autoRefresh ? "animate-spin-slow" : ""}
              />
              Live
            </button>

            {/* Refresh */}
            <button
              onClick={loadFlow}
              disabled={loading}
              className="px-3 py-1.5 bg-brand text-white rounded-lg text-xs font-medium hover:bg-brand/90 disabled:opacity-50 flex items-center gap-1.5 transition-colors"
            >
              {loading ? (
                <CircleNotch weight="bold" className="animate-spin" size={14} />
              ) : (
                <ArrowsClockwise weight="bold" size={14} />
              )}
              Refresh
            </button>

            {/* Export SVG */}
            {flowData && (
              <>
                <button
                  onClick={downloadSvg}
                  className="px-3 py-1.5 border border-border text-ink rounded-lg text-xs font-medium hover:bg-surface-raised flex items-center gap-1.5 transition-colors"
                >
                  <FileSvg size={14} />
                  SVG
                </button>
                <button
                  onClick={downloadPng}
                  className="px-3 py-1.5 border border-border text-ink rounded-lg text-xs font-medium hover:bg-surface-raised flex items-center gap-1.5 transition-colors"
                >
                  <FileImage size={14} />
                  PNG
                </button>
              </>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400 flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-300"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </GlassPanel>

      {/* Loading state */}
      {loading && !flowData && (
        <GlassPanel className="p-12 flex flex-col items-center justify-center gap-3">
          <CircleNotch weight="bold" size={32} className="animate-spin text-brand" />
          <p className="text-sm text-ink-muted">Computing flow data from screening decisions...</p>
        </GlassPanel>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* PRISMA 2020 Flow Diagram                                            */}
      {/* ------------------------------------------------------------------- */}
      {flowData && (
        <GlassPanel className="p-6 overflow-x-auto">
          <div ref={diagramRef} className="min-w-[700px] space-y-2">
            {/* ============================================================= */}
            {/* IDENTIFICATION                                                */}
            {/* ============================================================= */}
            <div className="space-y-2">
              <SectionLabel title="Identification" section="identification" />

              {/* Row 1: Sources */}
              <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
                <FlowBox
                  label="Records from databases/registers"
                  count={flowData.identification.databaseResults}
                  icon={Database}
                  boxKey="identified_databases"
                />
                <div />
                <FlowBox
                  label="Records from registers"
                  count={flowData.identification.registerResults}
                  icon={ClipboardText}
                  boxKey="identified_registers"
                />
                <div />
                <FlowBox
                  label="Records from other sources"
                  count={flowData.identification.otherSources}
                  icon={FileText}
                  boxKey="identified_other"
                />
              </div>

              {/* Arrow down */}
              <DownArrow />

              {/* Row 2: Dedup + automation */}
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                <FlowBox
                  label="Duplicate records removed"
                  count={flowData.identification.duplicatesRemoved}
                  icon={Funnel}
                  boxKey="duplicates_removed"
                  variant="excluded"
                />
                <RightArrow />
                <FlowBox
                  label="Records removed by automation tools"
                  count={flowData.identification.automationExcluded}
                  icon={Funnel}
                  boxKey="automation_excluded"
                  variant="excluded"
                />
              </div>

              <DownArrow />

              {/* After dedup total */}
              <div className="flex justify-center">
                <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl px-6 py-2 text-center">
                  <div className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    Records after deduplication
                  </div>
                  <div className="text-lg font-bold text-blue-700 dark:text-blue-300 tabular-nums">
                    n = {afterDedup.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <DownArrow />

            {/* ============================================================= */}
            {/* SCREENING                                                     */}
            {/* ============================================================= */}
            <div className="space-y-2">
              <SectionLabel title="Screening" section="screening" />

              <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2">
                <FlowBox
                  label="Records screened (title/abstract)"
                  count={flowData.screening.recordsScreened}
                  icon={MagnifyingGlass}
                  boxKey="records_screened"
                />
                <RightArrow />
                <FlowBox
                  label="Records excluded"
                  count={flowData.screening.recordsExcluded}
                  icon={X}
                  boxKey="records_excluded"
                  variant="excluded"
                  reasons={flowData.screening.exclusionReasons}
                />
              </div>
            </div>

            <DownArrow />

            {/* ============================================================= */}
            {/* ELIGIBILITY                                                   */}
            {/* ============================================================= */}
            <div className="space-y-2">
              <SectionLabel title="Eligibility" section="eligibility" />

              {/* Retrieval */}
              <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2">
                <FlowBox
                  label="Reports sought for retrieval"
                  count={flowData.eligibility.reportsRetrieved}
                  icon={FileText}
                  boxKey="reports_sought"
                />
                <RightArrow />
                <FlowBox
                  label="Reports not retrieved"
                  count={flowData.eligibility.reportsNotRetrieved}
                  icon={X}
                  boxKey="reports_not_retrieved"
                  variant="excluded"
                />
              </div>

              <DownArrow />

              {/* Assessment */}
              <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2">
                <FlowBox
                  label="Reports assessed for eligibility"
                  count={flowData.eligibility.reportsAssessed}
                  icon={ClipboardText}
                  boxKey="reports_assessed"
                />
                <RightArrow />
                <FlowBox
                  label="Reports excluded (full text)"
                  count={flowData.eligibility.reportsExcluded}
                  icon={X}
                  boxKey="reports_excluded"
                  variant="excluded"
                  reasons={flowData.eligibility.exclusionReasons}
                />
              </div>
            </div>

            <DownArrow />

            {/* ============================================================= */}
            {/* INCLUDED                                                      */}
            {/* ============================================================= */}
            <div className="space-y-2">
              <SectionLabel title="Included" section="included" />

              <div className="grid grid-cols-[1fr_1fr] gap-3">
                <FlowBox
                  label="Studies included in review"
                  count={flowData.included.studiesIncluded}
                  icon={CheckCircle}
                  boxKey="studies_included"
                  variant="highlight"
                />
                <FlowBox
                  label="Reports of included studies"
                  count={flowData.included.reportsIncluded}
                  icon={CheckCircle}
                  boxKey="reports_included"
                  variant="highlight"
                />
              </div>
            </div>

            {/* Watermark */}
            <div className="text-center pt-4">
              <p className="text-[10px] text-ink-muted/40">
                PRISMA 2020 flow diagram — Page et al. (2021). BMJ 2021;372:n71
              </p>
            </div>
          </div>
        </GlassPanel>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* Summary statistics                                                  */}
      {/* ------------------------------------------------------------------- */}
      {flowData && (
        <GlassPanel className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <StatCard
              label="Identified"
              value={flowData.identification.totalIdentified}
              color="blue"
            />
            <StatCard
              label="Screened"
              value={flowData.screening.recordsScreened}
              color="amber"
            />
            <StatCard
              label="Assessed"
              value={flowData.eligibility.reportsAssessed}
              color="purple"
            />
            <StatCard
              label="Included"
              value={flowData.included.studiesIncluded}
              color="green"
            />
          </div>
        </GlassPanel>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* Paper list drawer (slide-over)                                      */}
      {/* ------------------------------------------------------------------- */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer panel */}
          <div className="relative w-full max-w-lg bg-white dark:bg-[#1C1B1A] shadow-2xl border-l border-border flex flex-col animate-slide-in-right">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <h3 className="font-semibold text-ink text-sm">{drawerTitle}</h3>
                <p className="text-xs text-ink-muted mt-0.5">
                  {drawerLoading
                    ? "Loading..."
                    : `${filteredDrawerPapers.length} paper${filteredDrawerPapers.length !== 1 ? "s" : ""}`}
                </p>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg hover:bg-surface-raised transition-colors"
              >
                <X size={18} className="text-ink-muted" />
              </button>
            </div>

            {/* Search */}
            <div className="px-5 py-3 border-b border-border">
              <div className="relative">
                <MagnifyingGlass
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
                />
                <input
                  type="text"
                  placeholder="Filter papers..."
                  value={drawerSearch}
                  onChange={(e) => setDrawerSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-surface-raised border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/30 text-ink placeholder:text-ink-muted/50"
                />
              </div>
            </div>

            {/* Paper list */}
            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2">
              {drawerLoading ? (
                <div className="flex items-center justify-center py-12">
                  <CircleNotch
                    weight="bold"
                    size={24}
                    className="animate-spin text-brand"
                  />
                </div>
              ) : filteredDrawerPapers.length === 0 ? (
                <div className="text-center py-12 text-sm text-ink-muted">
                  No papers found.
                </div>
              ) : (
                filteredDrawerPapers.map((paper) => (
                  <div
                    key={paper.id}
                    className="border border-border rounded-lg p-3 hover:bg-surface-raised/50 transition-colors"
                  >
                    <h4 className="text-sm font-medium text-ink leading-snug line-clamp-2">
                      {paper.title}
                    </h4>
                    <div className="mt-1 text-xs text-ink-muted">
                      {paper.authors?.slice(0, 3).join(", ")}
                      {paper.authors && paper.authors.length > 3 && " et al."}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-ink-muted/70">
                      {paper.journal && <span>{paper.journal}</span>}
                      {paper.year && <span>({paper.year})</span>}
                      {paper.doi && (
                        <span className="font-mono text-[10px]">{paper.doi}</span>
                      )}
                    </div>
                    {paper.reason && (
                      <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-500/10 text-[10px] font-medium text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20">
                        Excluded: {paper.reason}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Keyframe animation for drawer */}
      <style>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.2s ease-out;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stat card sub-component
// ---------------------------------------------------------------------------

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "blue" | "amber" | "purple" | "green";
}) {
  const colorMap = {
    blue: "text-blue-600 dark:text-blue-400",
    amber: "text-amber-600 dark:text-amber-400",
    purple: "text-purple-600 dark:text-purple-400",
    green: "text-green-600 dark:text-green-400",
  };

  return (
    <div>
      <div className={`text-2xl font-bold tabular-nums ${colorMap[color]}`}>
        {value.toLocaleString()}
      </div>
      <div className="text-xs text-ink-muted">{label}</div>
    </div>
  );
}
