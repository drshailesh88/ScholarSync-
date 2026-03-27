"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
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
  CalendarBlank,
  MagnifyingGlass,
  X,
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

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function formatTime(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function entriesToCSV(entries: AuditLogEntry[]): string {
  const header = "ID,User,Action,Entity Type,Entity ID,AI Involved,Timestamp,Details";
  const rows = entries.map((e) => {
    const details =
      e.details != null ? JSON.stringify(e.details).replace(/"/g, '""') : "";
    return [
      e.id,
      `"${e.userId}"`,
      `"${ACTION_LABELS[e.action] ?? e.action}"`,
      `"${e.entityType}"`,
      e.entityId ?? "",
      e.aiInvolved ? "Yes" : "No",
      e.createdAt ?? "",
      `"${details}"`,
    ].join(",");
  });
  return [header, ...rows].join("\n");
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
    <div className="sr-panel">
      <p className="sr-label text-xs text-white/50">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-white/40">{sub}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// DateRangeFilter
// ---------------------------------------------------------------------------

function DateRangeFilter({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  onClear,
}: {
  startDate: string;
  endDate: string;
  onStartChange: (v: string) => void;
  onEndChange: (v: string) => void;
  onClear: () => void;
}) {
  const hasRange = startDate || endDate;
  return (
    <div className="flex items-center gap-2">
      <CalendarBlank className="h-4 w-4 shrink-0 text-white/40" />
      <input
        type="date"
        value={startDate}
        onChange={(e) => onStartChange(e.target.value)}
        aria-label="Start date"
        className={cn(
          "rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-white/80",
          "focus:outline-none focus:ring-1 focus:ring-violet-500/50",
          "[color-scheme:dark]"
        )}
      />
      <span className="text-xs text-white/30">to</span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => onEndChange(e.target.value)}
        aria-label="End date"
        className={cn(
          "rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-white/80",
          "focus:outline-none focus:ring-1 focus:ring-violet-500/50",
          "[color-scheme:dark]"
        )}
      />
      {hasRange && (
        <button
          onClick={onClear}
          className="rounded p-1 text-white/40 hover:bg-white/10 hover:text-white/70"
          aria-label="Clear date range"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// TimelineConnector
// ---------------------------------------------------------------------------

function TimelineConnector({ isLast }: { isLast: boolean }) {
  return (
    <div className="flex w-7 shrink-0 flex-col items-center">
      <div className="h-2 w-px bg-white/10" />
      <div className="h-2.5 w-2.5 rounded-full border-2 border-white/20 bg-white/5" />
      {!isLast && <div className="w-px flex-1 bg-white/10" />}
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
  const [userFilter, setUserFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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

  const handleActionChange = (value: string) => {
    setActionFilter(value);
    setOffset(0);
  };

  // ---- Client-side filters (user + date range) -----------------------------

  const filteredEntries = useMemo(() => {
    let entries = data?.entries ?? [];

    if (userFilter) {
      const q = userFilter.toLowerCase();
      entries = entries.filter((e) => e.userId.toLowerCase().includes(q));
    }

    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      entries = entries.filter(
        (e) => e.createdAt && new Date(e.createdAt) >= start
      );
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      entries = entries.filter(
        (e) => e.createdAt && new Date(e.createdAt) <= end
      );
    }

    return entries;
  }, [data?.entries, userFilter, startDate, endDate]);

  // ---- Unique users for display --------------------------------------------

  const uniqueUsers = useMemo(() => {
    const users = new Set((data?.entries ?? []).map((e) => e.userId));
    return Array.from(users).sort();
  }, [data?.entries]);

  // ---- Group entries by date for timeline ----------------------------------

  const groupedByDate = useMemo(() => {
    const groups: Record<string, AuditLogEntry[]> = {};
    for (const entry of filteredEntries) {
      const dateKey = entry.createdAt
        ? new Date(entry.createdAt).toDateString()
        : "Unknown";
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(entry);
    }
    return groups;
  }, [filteredEntries]);

  // ---- CSV Export ----------------------------------------------------------

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      // Try server-side export first
      const params = new URLSearchParams({
        projectId: String(projectId),
        format: "csv",
      });
      const res = await fetch(
        `/api/systematic-review/audit?${params.toString()}`
      );

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `audit-log-project-${projectId}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        // Fallback: generate CSV client-side from current filtered data
        const csv = entriesToCSV(filteredEntries);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `audit-log-project-${projectId}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      // Client-side fallback on network error
      const csv = entriesToCSV(filteredEntries);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audit-log-project-${projectId}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  // ---- Render --------------------------------------------------------------

  const summary = data?.summary;
  const allEntries = data?.entries ?? [];
  const hasMore = allEntries.length === PAGE_SIZE;
  const hasPrev = offset > 0;
  const dateKeys = Object.keys(groupedByDate);

  return (
    <div className="sr-panel sr-content flex flex-col gap-6">
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

      {/* Action breakdown pills */}
      {summary && Object.keys(summary.eventsByAction).length > 0 && (
        <div className="sr-panel">
          <p className="sr-label mb-3">Events by Action</p>
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

      {/* Filter bar: action type + user + date range */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Action filter */}
        <div className="relative">
          <select
            aria-label="Filter by action type"
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

        {/* User filter */}
        <div className="relative">
          {uniqueUsers.length > 0 ? (
            <>
              <select
                aria-label="Filter by user"
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                className={cn(
                  "appearance-none rounded-lg border border-white/10 bg-white/5",
                  "py-2 pl-3 pr-8 text-sm text-white/80 focus:outline-none focus:ring-1",
                  "focus:ring-violet-500/50"
                )}
              >
                <option value="" className="bg-gray-900">
                  All Users
                </option>
                {uniqueUsers.map((u) => (
                  <option key={u} value={u} className="bg-gray-900">
                    {u}
                  </option>
                ))}
              </select>
              <CaretDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-white/40" />
            </>
          ) : (
            <div className="relative">
              <MagnifyingGlass className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Filter by user…"
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                aria-label="Filter by user"
                className={cn(
                  "rounded-lg border border-white/10 bg-white/5 py-2 pl-8 pr-3",
                  "text-sm text-white/80 placeholder:text-white/30",
                  "focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                )}
              />
            </div>
          )}
        </div>

        {/* Date range filter */}
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartChange={(v) => setStartDate(v)}
          onEndChange={(v) => setEndDate(v)}
          onClear={() => {
            setStartDate("");
            setEndDate("");
          }}
        />

        {/* Refresh */}
        <button
          onClick={() => fetchLog(offset, actionFilter)}
          disabled={loading}
          className={cn(
            "ml-auto flex items-center gap-2 rounded-lg border border-white/10 bg-white/5",
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

      {/* Active filters indicator */}
      {(userFilter || startDate || endDate) && (
        <div className="flex items-center gap-2 text-xs text-white/50">
          <span>
            Showing {filteredEntries.length} of {allEntries.length} entries
          </span>
          <button
            onClick={() => {
              setUserFilter("");
              setStartDate("");
              setEndDate("");
            }}
            className="text-violet-400/70 hover:text-violet-300"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Timeline view */}
      <div className="flex flex-col gap-0">
        {loading && allEntries.length === 0 && (
          <div className="py-12 text-center text-sm text-white/40">
            <ArrowsClockwise className="mx-auto mb-2 h-6 w-6 animate-spin" />
            Loading audit log…
          </div>
        )}

        {!loading && filteredEntries.length === 0 && (
          <div className="py-12 text-center text-sm text-white/40">
            No audit events found.
          </div>
        )}

        {dateKeys.map((dateKey) => {
          const dayEntries = groupedByDate[dateKey];
          return (
            <div key={dateKey} className="mb-4">
              {/* Date group header */}
              <div className="mb-2 flex items-center gap-2">
                <div className="h-px flex-1 bg-white/10" />
                <span className="sr-label shrink-0 px-2 text-xs text-white/40">
                  {dateKey === "Unknown"
                    ? "Unknown Date"
                    : formatDate(dayEntries[0].createdAt)}
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Timeline entries */}
              {dayEntries.map((entry, idx) => (
                <div key={entry.id} className="flex">
                  <TimelineConnector isLast={idx === dayEntries.length - 1} />
                  <div className="min-w-0 flex-1 pb-1">
                    <AuditEntry entry={entry} />
                  </div>
                </div>
              ))}
            </div>
          );
        })}
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
            Showing {offset + 1}–{offset + allEntries.length}
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
// AuditEntry row (timeline item)
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
        "sr-content rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3",
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

        {/* Main content: who, what, when, details */}
        <div className="min-w-0 flex-1">
          {/* What */}
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

          {/* Who + When */}
          <div className="mt-1 flex items-center gap-3 text-xs text-white/40">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" weight="bold" />
              <span className="font-mono">{entry.userId}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <CalendarBlank className="h-3 w-3" />
              {formatTimestamp(entry.createdAt)}
            </span>
          </div>

          {/* Expandable details for full context */}
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

        {/* Timestamp shorthand on right */}
        <span className="shrink-0 text-xs text-white/30">
          {formatTime(entry.createdAt)}
        </span>
      </div>
    </div>
  );
}
