"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Funnel,
  Table,
  ShieldCheck,
  DownloadSimple,
  ChartBar,
  ArrowsClockwise,
  Robot,
  User,
  CaretDown,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AuditLogEntry {
  id: number;
  userId: string;
  action: string;
  entityType: string;
  entityId: number | null;
  details: unknown;
  aiInvolved: boolean;
  createdAt: string | null;
}

interface AuditSummary {
  totalEvents: number;
  aiAssistedEvents: number;
  humanOnlyEvents: number;
  eventsByAction: Record<string, number>;
}

interface AuditResponse {
  entries: AuditLogEntry[];
  summary: AuditSummary;
  pagination: {
    limit: number;
    offset: number;
    returned: number;
  };
}

interface AuditTrailPanelProps {
  projectId: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ACTION_LABELS: Record<string, string> = {
  screen: "Screening",
  extract: "Data Extraction",
  rob2_assess: "RoB 2 Assessment",
  resolve_conflict: "Conflict Resolution",
  import: "Import",
  export: "Export",
  config_change: "Config Change",
  meta_analysis: "Meta-Analysis",
  grade_assess: "GRADE Assessment",
};

const ACTION_OPTIONS = [
  { value: "", label: "All Actions" },
  { value: "screen", label: "Screening" },
  { value: "extract", label: "Data Extraction" },
  { value: "rob2_assess", label: "RoB 2 Assessment" },
  { value: "resolve_conflict", label: "Conflict Resolution" },
  { value: "import", label: "Import" },
  { value: "export", label: "Export" },
  { value: "config_change", label: "Config Change" },
  { value: "meta_analysis", label: "Meta-Analysis" },
  { value: "grade_assess", label: "GRADE Assessment" },
];

const PAGE_SIZE = 25;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function ActionIcon({
  action,
  className,
}: {
  action: string;
  className?: string;
}) {
  const cls = cn("h-4 w-4 shrink-0", className);
  switch (action) {
    case "screen":
      return <Funnel className={cls} />;
    case "extract":
      return <Table className={cls} />;
    case "rob2_assess":
      return <ShieldCheck className={cls} />;
    case "import":
      return <DownloadSimple className={cls} />;
    case "meta_analysis":
      return <ChartBar className={cls} />;
    default:
      return <ArrowsClockwise className={cls} />;
  }
}

function formatTimestamp(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// ---------------------------------------------------------------------------
// SummaryCard
// ---------------------------------------------------------------------------

function SummaryCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: number;
  sub?: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-xs text-white/50">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-white/40">{sub}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// AuditTrailPanel
// ---------------------------------------------------------------------------

export function AuditTrailPanel({ projectId }: AuditTrailPanelProps) {
  const [data, setData] = useState<AuditResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionFilter, setActionFilter] = useState("");
  const [offset, setOffset] = useState(0);
  const [exporting, setExporting] = useState(false);

  // ---- Fetch ---------------------------------------------------------------

  const fetchLog = useCallback(
    async (currentOffset: number, currentAction: string) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          projectId: String(projectId),
          limit: String(PAGE_SIZE),
          offset: String(currentOffset),
        });
        if (currentAction) params.set("action", currentAction);

        const res = await fetch(
          `/api/systematic-review/audit?${params.toString()}`
        );
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error ?? "Failed to load audit log");
        }
        const json: AuditResponse = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    },
    [projectId]
  );

  useEffect(() => {
    fetchLog(offset, actionFilter);
  }, [fetchLog, offset, actionFilter]);

  // Reset to page 0 whenever the filter changes
  const handleActionChange = (value: string) => {
    setActionFilter(value);
    setOffset(0);
  };

  // ---- CSV Export ----------------------------------------------------------

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams({
        projectId: String(projectId),
        format: "csv",
      });
      const res = await fetch(
        `/api/systematic-review/audit?${params.toString()}`
      );
      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audit-log-project-${projectId}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed");
    } finally {
      setExporting(false);
    }
  };

  // ---- Render --------------------------------------------------------------

  const summary = data?.summary;
  const entries = data?.entries ?? [];
  const hasMore = entries.length === PAGE_SIZE;
  const hasPrev = offset > 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Audit Trail</h2>
          <p className="mt-0.5 text-sm text-white/50">
            RAISE 2025 — transparent AI usage disclosure
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          disabled={exporting || loading}
          className={cn(
            "flex items-center gap-2 rounded-lg border border-white/10 bg-white/5",
            "px-3 py-2 text-sm text-white/80 transition hover:bg-white/10",
            "disabled:cursor-not-allowed disabled:opacity-40"
          )}
        >
          <DownloadSimple className="h-4 w-4" />
          {exporting ? "Exporting…" : "Export CSV"}
        </button>
      </div>

      {/* Summary stats */}
      {summary && (
        <div className="grid grid-cols-3 gap-3">
          <SummaryCard label="Total Events" value={summary.totalEvents} />
          <SummaryCard
            label="AI-Assisted"
            value={summary.aiAssistedEvents}
            sub={
              summary.totalEvents > 0
                ? `${Math.round((summary.aiAssistedEvents / summary.totalEvents) * 100)}% of all events`
                : undefined
            }
          />
          <SummaryCard
            label="Human Only"
            value={summary.humanOnlyEvents}
            sub={
              summary.totalEvents > 0
                ? `${Math.round((summary.humanOnlyEvents / summary.totalEvents) * 100)}% of all events`
                : undefined
            }
          />
        </div>
      )}

      {/* Action breakdown */}
      {summary && Object.keys(summary.eventsByAction).length > 0 && (
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/50">
            Events by Action
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(summary.eventsByAction).map(([action, count]) => (
              <button
                key={action}
                onClick={() =>
                  handleActionChange(actionFilter === action ? "" : action)
                }
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition",
                  actionFilter === action
                    ? "bg-violet-500/30 text-violet-200 ring-1 ring-violet-400/40"
                    : "bg-white/10 text-white/70 hover:bg-white/15"
                )}
              >
                <ActionIcon action={action} />
                {ACTION_LABELS[action] ?? action}
                <span className="ml-0.5 font-semibold">{count}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filter bar */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <select aria-label="Select option"
            value={actionFilter}
            onChange={(e) => handleActionChange(e.target.value)}
            className={cn(
              "appearance-none rounded-lg border border-white/10 bg-white/5",
              "py-2 pl-3 pr-8 text-sm text-white/80 focus:outline-none focus:ring-1",
              "focus:ring-violet-500/50"
            )}
          >
            {ACTION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-gray-900">
                {opt.label}
              </option>
            ))}
          </select>
          <CaretDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-white/40" />
        </div>

        <button
          onClick={() => fetchLog(offset, actionFilter)}
          disabled={loading}
          className={cn(
            "flex items-center gap-2 rounded-lg border border-white/10 bg-white/5",
            "px-3 py-2 text-sm text-white/80 transition hover:bg-white/10",
            "disabled:opacity-40"
          )}
        >
          <ArrowsClockwise
            className={cn("h-4 w-4", loading && "animate-spin")}
          />
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Event list */}
      <div className="flex flex-col gap-1">
        {loading && entries.length === 0 && (
          <div className="py-12 text-center text-sm text-white/40">
            <ArrowsClockwise className="mx-auto mb-2 h-6 w-6 animate-spin" />
            Loading audit log…
          </div>
        )}

        {!loading && entries.length === 0 && (
          <div className="py-12 text-center text-sm text-white/40">
            No audit events found.
          </div>
        )}

        {entries.map((entry) => (
          <AuditEntry key={entry.id} entry={entry} />
        ))}
      </div>

      {/* Pagination */}
      {(hasPrev || hasMore) && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
            disabled={!hasPrev || loading}
            className={cn(
              "rounded-lg border border-white/10 bg-white/5 px-3 py-2",
              "text-sm text-white/70 transition hover:bg-white/10",
              "disabled:cursor-not-allowed disabled:opacity-30"
            )}
          >
            Previous
          </button>
          <span className="text-xs text-white/40">
            Showing {offset + 1}–{offset + entries.length}
          </span>
          <button
            onClick={() => setOffset(offset + PAGE_SIZE)}
            disabled={!hasMore || loading}
            className={cn(
              "rounded-lg border border-white/10 bg-white/5 px-3 py-2",
              "text-sm text-white/70 transition hover:bg-white/10",
              "disabled:cursor-not-allowed disabled:opacity-30"
            )}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// AuditEntry row
// ---------------------------------------------------------------------------

function AuditEntry({ entry }: { entry: AuditLogEntry }) {
  const [expanded, setExpanded] = useState(false);
  const hasDetails =
    entry.details != null &&
    typeof entry.details === "object" &&
    Object.keys(entry.details as Record<string, unknown>).length > 0;

  return (
    <div
      className={cn(
        "rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3",
        "transition hover:bg-white/[0.06]"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Action icon */}
        <div
          className={cn(
            "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
            entry.aiInvolved
              ? "bg-violet-500/20 text-violet-300"
              : "bg-white/10 text-white/50"
          )}
        >
          <ActionIcon action={entry.action} className="h-3.5 w-3.5" />
        </div>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-white">
              {ACTION_LABELS[entry.action] ?? entry.action}
            </span>

            {/* Entity badge */}
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white/60">
              {entry.entityType}
              {entry.entityId != null ? ` #${entry.entityId}` : ""}
            </span>

            {/* AI badge */}
            {entry.aiInvolved ? (
              <span className="flex items-center gap-1 rounded bg-violet-500/20 px-1.5 py-0.5 text-xs text-violet-300">
                <Robot className="h-3 w-3" />
                AI-assisted
              </span>
            ) : (
              <span className="flex items-center gap-1 rounded bg-white/10 px-1.5 py-0.5 text-xs text-white/50">
                <User className="h-3 w-3" />
                Human
              </span>
            )}
          </div>

          <div className="mt-1 flex items-center gap-3 text-xs text-white/40">
            <span className="font-mono">{entry.userId}</span>
            <span>·</span>
            <span>{formatTimestamp(entry.createdAt)}</span>
          </div>

          {/* Expandable details */}
          {hasDetails && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-2 flex items-center gap-1 text-xs text-violet-400/70 hover:text-violet-300"
            >
              <CaretDown
                className={cn(
                  "h-3 w-3 transition-transform",
                  expanded && "rotate-180"
                )}
              />
              {expanded ? "Hide" : "Show"} details
            </button>
          )}

          {expanded && hasDetails && (
            <pre className="mt-2 overflow-auto rounded bg-black/30 p-3 text-xs text-white/60">
              {JSON.stringify(entry.details, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
