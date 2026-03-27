"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Bell,
  BellSlash,
  Clock,
  CircleNotch,
  Plus,
  Trash,
  Play,
  Pause,
  Lightning,
  CheckCircle,
  CalendarDots,
  ClockCountdown,
  Sparkle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import { useSystematicReviewStore } from "@/stores/systematic-review-store";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SearchAlert {
  id: number;
  projectId: number;
  searchString: string;
  frequency: "daily" | "weekly" | "monthly";
  status: "active" | "paused" | "completed";
  lastChecked: string | null;
  nextCheck: string | null;
  newPapersFound: number;
  totalChecks: number;
  createdAt: string;
}

interface CheckResult {
  alertId: number;
  newPapersFound: number;
  autoScreened: number;
  included: number;
  excluded: number;
}

interface LivingReviewPanelProps {
  projectId: number;
}

interface TimelineEntry {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
  tone: "accent" | "success" | "muted";
}

function formatTimestamp(value: string | null): string {
  if (!value) return "Not scheduled";

  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function LivingReviewPanel({ projectId }: LivingReviewPanelProps) {
  const [alerts, setAlerts] = useState<SearchAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [checkingId, setCheckingId] = useState<number | null>(null);
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [updatingFrequencyId, setUpdatingFrequencyId] = useState<number | null>(
    null
  );
  const [lastCheckResult, setLastCheckResult] = useState<CheckResult | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // New alert form
  const [showForm, setShowForm] = useState(false);
  const [newSearchString, setNewSearchString] = useState("");
  const [newFrequency, setNewFrequency] = useState<
    "daily" | "weekly" | "monthly"
  >("weekly");

  const { reviewConfig } = useSystematicReviewStore();

  const loadAlerts = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/systematic-review/alerts?projectId=${projectId}`
      );
      if (res.ok) {
        const data = await res.json();
        setAlerts(data.alerts || []);
      }
    } catch {
      setError("Failed to load alerts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadAlerts();
  }, [loadAlerts]);

  useEffect(() => {
    if (reviewConfig?.searchStrategy && !newSearchString) {
      const strategy = reviewConfig.searchStrategy as { pubmedQuery?: string };
      if (strategy.pubmedQuery) {
        setNewSearchString(strategy.pubmedQuery);
      }
    }
  }, [reviewConfig, newSearchString]);

  const createAlert = async () => {
    if (!newSearchString.trim()) return;
    setIsCreating(true);

    try {
      const res = await fetch("/api/systematic-review/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          searchString: newSearchString,
          frequency: newFrequency,
        }),
      });

      if (res.ok) {
        setShowForm(false);
        setNewSearchString("");
        await loadAlerts();
      }
    } catch {
      setError("Failed to create alert. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const updateAlert = async (
    alertId: number,
    action: "pause" | "resume" | "update_frequency" | "check_now",
    frequency?: SearchAlert["frequency"]
  ) => {
    if (action === "check_now") setCheckingId(alertId);
    if (action === "update_frequency") setUpdatingFrequencyId(alertId);

    try {
      const res = await fetch("/api/systematic-review/alerts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alertId, action, frequency }),
      });

      if (res.ok) {
        const data = await res.json();
        if (action === "check_now" && data.result) {
          setLastCheckResult(data.result);
        }
        await loadAlerts();
      }
    } catch {
      setError("Failed to update alert. Please try again.");
    } finally {
      setCheckingId(null);
      setUpdatingFrequencyId(null);
    }
  };

  const runAllUpdates = async () => {
    const activeAlerts = alerts.filter((alert) => alert.status === "active");
    if (activeAlerts.length === 0) return;

    setIsRunningAll(true);
    setError(null);

    try {
      for (const alert of activeAlerts) {
        const res = await fetch("/api/systematic-review/alerts", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            alertId: alert.id,
            action: "check_now",
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to run update");
        }

        const data = await res.json();
        if (data.result) {
          setLastCheckResult(data.result);
        }
      }

      await loadAlerts();
    } catch {
      setError("Failed to run all updates. Please try again.");
    } finally {
      setIsRunningAll(false);
    }
  };

  const handleDelete = async (alertId: number) => {
    try {
      await fetch(`/api/systematic-review/alerts?alertId=${alertId}`, {
        method: "DELETE",
      });
      await loadAlerts();
    } catch {
      setError("Failed to delete alert. Please try again.");
    }
  };

  const activeAlerts = alerts.filter((alert) => alert.status === "active");
  const totalNewPapers = alerts.reduce(
    (sum, alert) => sum + alert.newPapersFound,
    0
  );
  const nextScheduledAlert = [...activeAlerts]
    .filter((alert) => alert.nextCheck)
    .sort(
      (a, b) =>
        new Date(a.nextCheck ?? 0).getTime() -
        new Date(b.nextCheck ?? 0).getTime()
    )[0];

  const timelineEntries = useMemo<TimelineEntry[]>(() => {
    return alerts
      .flatMap((alert) => {
        const entries: TimelineEntry[] = [
          {
            id: `${alert.id}-created`,
            title: "Alert created",
            detail: `${alert.frequency} monitoring started for this search strategy.`,
            timestamp: alert.createdAt,
            tone: "muted",
          },
        ];

        if (alert.lastChecked) {
          entries.push({
            id: `${alert.id}-checked`,
            title: "Update check completed",
            detail: `${alert.newPapersFound} new paper${
              alert.newPapersFound === 1 ? "" : "s"
            } found during the most recent run.`,
            timestamp: alert.lastChecked,
            tone: alert.newPapersFound > 0 ? "success" : "accent",
          });
        }

        if (alert.status === "active" && alert.nextCheck) {
          entries.push({
            id: `${alert.id}-next`,
            title: "Next scheduled update",
            detail: `${alert.frequency} check scheduled for alert #${alert.id}.`,
            timestamp: alert.nextCheck,
            tone: "accent",
          });
        }

        return entries;
      })
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 10);
  }, [alerts]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <CircleNotch
          weight="bold"
          className="animate-spin text-brand"
          size={24}
        />
      </div>
    );
  }

  return (
    <div className="sr-content space-y-6">
      {error && (
        <GlassPanel className="sr-panel flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-300"
          >
            &#x2715;
          </button>
        </GlassPanel>
      )}

      <GlassPanel className="sr-panel">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="sr-panel-title">
              <Bell weight="duotone" className="text-brand" />
              Living Review
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Track new evidence with scheduled alerts, rapid update runs, and a
              timeline of review activity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={runAllUpdates}
              disabled={isRunningAll || activeAlerts.length === 0}
              className="sr-btn sr-btn-primary"
            >
              {isRunningAll ? (
                <CircleNotch weight="bold" className="animate-spin" size={14} />
              ) : (
                <Lightning weight="bold" size={14} />
              )}
              Run Update Now
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="sr-btn sr-btn-secondary"
            >
              <Plus weight="bold" size={14} />
              New Alert
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.25rem] border border-border/70 bg-surface px-4 py-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
              Active alerts
            </p>
            <p className="mt-2 text-3xl font-semibold text-ink">
              {activeAlerts.length}
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              Monitoring queries on an active cadence.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-border/70 bg-surface px-4 py-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
              New papers found
            </p>
            <p className="mt-2 text-3xl font-semibold text-ink">
              {totalNewPapers}
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              Flagged by your living review checks so far.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-border/70 bg-surface px-4 py-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
              Next scheduled run
            </p>
            <p className="mt-2 text-lg font-semibold text-ink">
              {nextScheduledAlert?.nextCheck
                ? formatTimestamp(nextScheduledAlert.nextCheck)
                : "No active schedule"}
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              {nextScheduledAlert
                ? `Alert #${nextScheduledAlert.id} is next to refresh.`
                : "Resume or create an alert to restore automation."}
            </p>
          </div>
        </div>
      </GlassPanel>

      {lastCheckResult && (
        <GlassPanel className="sr-panel flex items-center gap-3 border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950/30">
          <CheckCircle weight="fill" className="text-green-600" size={20} />
          <div className="text-sm">
            <span className="font-medium text-green-700 dark:text-green-400">
              Check complete.
            </span>{" "}
            <span className="text-green-600 dark:text-green-500">
              {lastCheckResult.newPapersFound} new papers found,{" "}
              {lastCheckResult.autoScreened} auto-screened
              ({lastCheckResult.included} included,{" "}
              {lastCheckResult.excluded} excluded).
            </span>
          </div>
          <button
            onClick={() => setLastCheckResult(null)}
            className="ml-auto text-green-600 hover:text-green-800 text-xs"
          >
            Dismiss
          </button>
        </GlassPanel>
      )}

      {showForm && (
        <GlassPanel className="sr-panel space-y-4 p-5">
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-muted">
              Search Query
            </label>
            <textarea
              aria-label="Search query"
              value={newSearchString}
              onChange={(e) => setNewSearchString(e.target.value)}
              placeholder="Enter PubMed search query..."
              className="h-24 w-full resize-none rounded-xl border border-border bg-surface-alt px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-muted">
                Check Frequency
              </label>
              <div className="flex gap-1">
                {(["daily", "weekly", "monthly"] as const).map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setNewFrequency(freq)}
                    className={cn(
                      "rounded px-3 py-1 text-xs font-medium capitalize transition-colors",
                      newFrequency === freq
                        ? "bg-brand text-white"
                        : "border border-border bg-surface text-ink-muted hover:text-ink"
                    )}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>

            <div className="ml-auto flex gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-3 py-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
              >
                Cancel
              </button>
              <button
                onClick={createAlert}
                disabled={isCreating || !newSearchString.trim()}
                className="sr-btn sr-btn-primary"
              >
                {isCreating ? (
                  <CircleNotch
                    weight="bold"
                    className="animate-spin"
                    size={14}
                  />
                ) : (
                  <Bell weight="bold" size={14} />
                )}
                Create Alert
              </button>
            </div>
          </div>
        </GlassPanel>
      )}

      {alerts.length === 0 ? (
        <GlassPanel className="sr-panel py-12 text-center text-ink-muted">
          <BellSlash weight="duotone" size={32} className="mx-auto mb-2" />
          <p className="text-sm">
            No search alerts yet. Create one to automatically check for new
            papers.
          </p>
        </GlassPanel>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.85fr)]">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <GlassPanel
                key={alert.id}
                className="sr-panel overflow-hidden rounded-[1.5rem] p-0"
              >
                <div className="border-b border-border/60 bg-warm-muted/35 px-5 py-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
                            alert.status === "active"
                              ? "bg-emerald-500/15 text-emerald-700"
                              : alert.status === "paused"
                                ? "bg-amber-500/15 text-amber-700"
                                : "bg-slate-400/15 text-slate-700"
                          )}
                        >
                          {alert.status}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                          <Sparkle size={12} />
                          {alert.newPapersFound} new paper
                          {alert.newPapersFound === 1 ? "" : "s"}
                        </span>
                      </div>
                      <div className="mt-3 break-all font-mono text-sm text-ink">
                        {alert.searchString}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => updateAlert(alert.id, "check_now")}
                        disabled={checkingId === alert.id}
                        className="sr-btn sr-btn-primary"
                      >
                        {checkingId === alert.id ? (
                          <CircleNotch
                            weight="bold"
                            className="animate-spin"
                            size={14}
                          />
                        ) : (
                          <Lightning weight="bold" size={14} />
                        )}
                        Check Now
                      </button>

                      {alert.status === "active" ? (
                        <button
                          onClick={() => updateAlert(alert.id, "pause")}
                          className="sr-btn sr-btn-secondary"
                        >
                          <Pause weight="bold" size={14} />
                          Pause
                        </button>
                      ) : (
                        <button
                          onClick={() => updateAlert(alert.id, "resume")}
                          className="sr-btn sr-btn-secondary"
                        >
                          <Play weight="bold" size={14} />
                          Resume
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(alert.id)}
                        className="rounded-xl border border-border px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-red-50 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash weight="bold" size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 px-5 py-5 md:grid-cols-[minmax(0,1fr)_minmax(240px,0.8fr)]">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-border/60 bg-surface px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                        Last checked
                      </p>
                      <p className="mt-2 text-sm font-medium text-ink">
                        {formatTimestamp(alert.lastChecked)}
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-surface px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                        Next check
                      </p>
                      <p className="mt-2 text-sm font-medium text-ink">
                        {formatTimestamp(alert.nextCheck)}
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-surface px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                        Checks run
                      </p>
                      <p className="mt-2 text-sm font-medium text-ink">
                        {alert.totalChecks}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-surface-raised/40 px-4 py-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                      <ClockCountdown size={16} className="text-brand" />
                      Update schedule
                    </div>
                    <p className="mt-1 text-xs text-ink-muted">
                      Adjust how often this strategy is checked for new
                      citations.
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <select
                        aria-label={`Update frequency for alert ${alert.id}`}
                        value={alert.frequency}
                        onChange={(e) =>
                          updateAlert(
                            alert.id,
                            "update_frequency",
                            e.target.value as SearchAlert["frequency"]
                          )
                        }
                        disabled={updatingFrequencyId === alert.id}
                        className="w-full rounded-xl border border-border bg-white px-3 py-2 text-sm text-ink"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                      {updatingFrequencyId === alert.id && (
                        <CircleNotch
                          weight="bold"
                          className="animate-spin text-brand"
                          size={18}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </GlassPanel>
            ))}
          </div>

          <GlassPanel className="sr-panel h-fit">
            <h3 className="sr-panel-title text-sm">
              <CalendarDots size={18} className="text-brand" />
              Version History
            </h3>
            <p className="mb-4 text-xs text-ink-muted">
              Recent living-review events across alert creation, completed
              checks, and upcoming scheduled runs.
            </p>

            <div className="space-y-4">
              {timelineEntries.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-ink-muted">
                  No living-review events yet.
                </div>
              ) : (
                timelineEntries.map((entry) => (
                  <div key={entry.id} className="flex gap-3">
                    <div
                      className={cn(
                        "mt-1 h-2.5 w-2.5 rounded-full",
                        entry.tone === "success"
                          ? "bg-emerald-500"
                          : entry.tone === "accent"
                            ? "bg-brand"
                            : "bg-stone-400"
                      )}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ink">
                        {entry.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-ink-muted">
                        {entry.detail}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                        <Clock size={12} />
                        {formatTimestamp(entry.timestamp)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </GlassPanel>
        </div>
      )}

      <GlassPanel className="sr-panel bg-surface-alt p-3 text-xs text-ink-faint">
        <strong>How it works:</strong> Alerts automatically re-run your PubMed
        search at the selected frequency. New papers since the last check are
        imported into your project and auto-screened against your existing
        inclusion/exclusion criteria. You can also manually trigger a check at
        any time.
      </GlassPanel>
    </div>
  );
}
