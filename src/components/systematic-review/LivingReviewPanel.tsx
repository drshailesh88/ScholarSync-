"use client";

import { useState, useEffect, useCallback } from "react";
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
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function LivingReviewPanel({ projectId }: LivingReviewPanelProps) {
  const [alerts, setAlerts] = useState<SearchAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [checkingId, setCheckingId] = useState<number | null>(null);
  const [lastCheckResult, setLastCheckResult] = useState<CheckResult | null>(
    null
  );

  // New alert form
  const [showForm, setShowForm] = useState(false);
  const [newSearchString, setNewSearchString] = useState("");
  const [newFrequency, setNewFrequency] = useState<
    "daily" | "weekly" | "monthly"
  >("weekly");

  const { reviewConfig } = useSystematicReviewStore();

  // Load alerts
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
      // Silent
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadAlerts();
  }, [loadAlerts]);

  // Pre-fill search string from review config
  useEffect(() => {
    if (reviewConfig?.searchStrategy && !newSearchString) {
      const strategy = reviewConfig.searchStrategy as { pubmedQuery?: string };
      if (strategy.pubmedQuery) {
        setNewSearchString(strategy.pubmedQuery);
      }
    }
  }, [reviewConfig, newSearchString]);

  // Create alert
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
      // Silent
    } finally {
      setIsCreating(false);
    }
  };

  // Update alert action
  const updateAlert = async (
    alertId: number,
    action: "pause" | "resume" | "check_now",
    frequency?: string
  ) => {
    if (action === "check_now") setCheckingId(alertId);

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
      // Silent
    } finally {
      setCheckingId(null);
    }
  };

  // Delete alert
  const handleDelete = async (alertId: number) => {
    try {
      await fetch(
        `/api/systematic-review/alerts?alertId=${alertId}`,
        { method: "DELETE" }
      );
      await loadAlerts();
    } catch {
      // Silent
    }
  };

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
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
            <Bell weight="duotone" className="text-brand" />
            Living Review
          </h2>
          <p className="text-sm text-ink-muted mt-1">
            Set up automatic search alerts to keep your review current.
            New papers are auto-imported and screened against your criteria.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-brand text-white rounded-md text-sm font-medium hover:bg-brand/90 transition-colors"
        >
          <Plus weight="bold" size={14} />
          New Alert
        </button>
      </div>

      {/* Last check result */}
      {lastCheckResult && (
        <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
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
        </div>
      )}

      {/* Create form */}
      {showForm && (
        <div className="p-4 bg-surface border border-border rounded-lg space-y-3">
          <div>
            <label className="text-xs text-ink-muted font-medium block mb-1">
              Search Query
            </label>
            <textarea
              value={newSearchString}
              onChange={(e) => setNewSearchString(e.target.value)}
              placeholder="Enter PubMed search query..."
              className="w-full h-20 px-3 py-2 bg-surface-alt border border-border rounded text-sm text-ink placeholder:text-ink-faint resize-none focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>

          <div className="flex items-end gap-4">
            <div>
              <label className="text-xs text-ink-muted font-medium block mb-1">
                Check Frequency
              </label>
              <div className="flex gap-1">
                {(["daily", "weekly", "monthly"] as const).map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setNewFrequency(freq)}
                    className={cn(
                      "px-3 py-1 rounded text-xs font-medium capitalize transition-colors",
                      newFrequency === freq
                        ? "bg-brand text-white"
                        : "bg-surface text-ink-muted hover:text-ink border border-border"
                    )}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setShowForm(false)}
                className="px-3 py-1.5 text-sm text-ink-muted hover:text-ink transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createAlert}
                disabled={isCreating || !newSearchString.trim()}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-brand text-white rounded-md text-sm font-medium hover:bg-brand/90 disabled:opacity-50 transition-colors"
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
        </div>
      )}

      {/* Alerts list */}
      {alerts.length === 0 ? (
        <div className="text-center py-12 text-ink-muted">
          <BellSlash weight="duotone" size={32} className="mx-auto mb-2" />
          <p className="text-sm">
            No search alerts yet. Create one to automatically check for new
            papers.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 bg-surface border border-border rounded-lg"
            >
              <div className="flex items-start gap-3">
                {/* Status indicator */}
                <div
                  className={cn(
                    "mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0",
                    alert.status === "active"
                      ? "bg-green-500"
                      : alert.status === "paused"
                        ? "bg-amber-500"
                        : "bg-gray-400"
                  )}
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-ink font-mono break-all line-clamp-2">
                    {alert.searchString}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-ink-muted">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {alert.frequency}
                    </span>
                    <span>
                      {alert.totalChecks} check
                      {alert.totalChecks !== 1 ? "s" : ""}
                    </span>
                    <span className="font-medium text-brand">
                      {alert.newPapersFound} new papers found
                    </span>
                    {alert.lastChecked && (
                      <span>
                        Last:{" "}
                        {new Date(alert.lastChecked).toLocaleDateString()}
                      </span>
                    )}
                    {alert.nextCheck && alert.status === "active" && (
                      <span>
                        Next:{" "}
                        {new Date(alert.nextCheck).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  {/* Check now */}
                  <button
                    onClick={() => updateAlert(alert.id, "check_now")}
                    disabled={checkingId === alert.id}
                    className="p-1.5 rounded hover:bg-surface-alt text-ink-muted hover:text-brand transition-colors"
                    title="Check now"
                  >
                    {checkingId === alert.id ? (
                      <CircleNotch
                        weight="bold"
                        className="animate-spin"
                        size={16}
                      />
                    ) : (
                      <Lightning weight="bold" size={16} />
                    )}
                  </button>

                  {/* Pause/Resume */}
                  {alert.status === "active" ? (
                    <button
                      onClick={() => updateAlert(alert.id, "pause")}
                      className="p-1.5 rounded hover:bg-surface-alt text-ink-muted hover:text-amber-600 transition-colors"
                      title="Pause"
                    >
                      <Pause weight="bold" size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => updateAlert(alert.id, "resume")}
                      className="p-1.5 rounded hover:bg-surface-alt text-ink-muted hover:text-green-600 transition-colors"
                      title="Resume"
                    >
                      <Play weight="bold" size={16} />
                    </button>
                  )}

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(alert.id)}
                    className="p-1.5 rounded hover:bg-surface-alt text-ink-muted hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <Trash weight="bold" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      <div className="text-xs text-ink-faint p-3 bg-surface-alt rounded-lg border border-border">
        <strong>How it works:</strong> Alerts automatically re-run your PubMed
        search at the selected frequency. New papers since the last check are
        imported into your project and auto-screened against your existing
        inclusion/exclusion criteria. You can also manually trigger a check at
        any time.
      </div>
    </div>
  );
}
