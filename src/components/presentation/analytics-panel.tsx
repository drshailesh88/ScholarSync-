"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Eye,
  Users,
  Clock,
  CheckCircle,
  CircleNotch,
  Warning,
  X,
} from "@phosphor-icons/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";

interface SlideHeatmapEntry {
  slideId: string;
  slideIndex: number;
  avgDurationMs: number;
  viewCount: number;
}

interface RecentView {
  fingerprint: string;
  startedAt: string;
  duration: number;
  slidesViewed: number;
}

interface ViewsOverTime {
  date: string;
  count: number;
}

interface DeckStats {
  totalViews: number;
  uniqueViewers: number;
  avgDurationMs: number;
  completionRate: number;
  slideHeatmap: SlideHeatmapEntry[];
  recentViews: RecentView[];
  viewsOverTime: ViewsOverTime[];
}

interface AnalyticsPanelProps {
  deckId: number;
  onClose: () => void;
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const secs = Math.round(ms / 1000);
  if (secs < 60) return `${secs}s`;
  const mins = Math.floor(secs / 60);
  const remainSecs = secs % 60;
  return `${mins}m ${remainSecs}s`;
}

function getEngagementColor(avgMs: number): string {
  if (avgMs < 5000) return "#EF4444"; // red — skipped
  if (avgMs < 15000) return "#F59E0B"; // amber — moderate
  if (avgMs < 30000) return "#3B82F6"; // blue — good
  return "#10B981"; // green — high engagement
}

function getEngagementLabel(avgMs: number): {
  label: string;
  color: string;
} | null {
  if (avgMs < 5000) return { label: "Skipped", color: "bg-red-500/10 text-red-500" };
  if (avgMs > 30000)
    return { label: "High Engagement", color: "bg-emerald-500/10 text-emerald-500" };
  return null;
}

export function AnalyticsPanel({ deckId, onClose }: AnalyticsPanelProps) {
  const [stats, setStats] = useState<DeckStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadStats = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/analytics/deck-stats?deckId=${deckId}`);
      if (!res.ok) throw new Error("Failed to load analytics");
      const data = await res.json();
      setStats(data);
    } catch {
      setError("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  }, [deckId]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-ink">Viewer Analytics</h3>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-surface-raised text-ink-muted transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <CircleNotch size={20} className="animate-spin text-brand" />
            <span className="ml-2 text-sm text-ink-muted">Loading analytics...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-500 text-xs">
            <Warning size={14} />
            {error}
          </div>
        )}

        {stats && !loading && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard
                icon={<Eye size={16} />}
                label="Total Views"
                value={String(stats.totalViews)}
                color="text-blue-500"
              />
              <SummaryCard
                icon={<Users size={16} />}
                label="Unique Viewers"
                value={String(stats.uniqueViewers)}
                color="text-purple-500"
              />
              <SummaryCard
                icon={<Clock size={16} />}
                label="Avg Duration"
                value={formatDuration(stats.avgDurationMs)}
                color="text-amber-500"
              />
              <SummaryCard
                icon={<CheckCircle size={16} />}
                label="Completion"
                value={`${stats.completionRate}%`}
                color="text-emerald-500"
              />
            </div>

            {/* Slide Heatmap */}
            {stats.slideHeatmap.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-ink mb-2">
                  Slide Engagement Heatmap
                </h4>
                <div className="bg-surface-raised rounded-lg p-3">
                  <ResponsiveContainer width="100%" height={Math.max(120, stats.slideHeatmap.length * 32)}>
                    <BarChart
                      data={stats.slideHeatmap.map((s) => ({
                        name: `Slide ${s.slideIndex + 1}`,
                        duration: Math.round(s.avgDurationMs / 1000),
                        avgMs: s.avgDurationMs,
                      }))}
                      layout="vertical"
                      margin={{ top: 0, right: 8, left: 8, bottom: 0 }}
                    >
                      <XAxis
                        type="number"
                        tick={{ fontSize: 10, fill: "var(--ink-muted)" }}
                        tickFormatter={(v) => `${v}s`}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 10, fill: "var(--ink-muted)" }}
                        width={56}
                      />
                      <Tooltip
                        formatter={(value) => [`${value ?? 0}s`, "Avg Time"]}
                        contentStyle={{
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          borderRadius: 8,
                          fontSize: 11,
                        }}
                      />
                      <Bar dataKey="duration" radius={[0, 4, 4, 0]} maxBarSize={20}>
                        {stats.slideHeatmap.map((entry, idx) => (
                          <Cell
                            key={idx}
                            fill={getEngagementColor(entry.avgDurationMs)}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>

                  {/* Engagement labels */}
                  <div className="mt-2 space-y-1">
                    {stats.slideHeatmap.map((s) => {
                      const badge = getEngagementLabel(s.avgDurationMs);
                      if (!badge) return null;
                      return (
                        <div
                          key={s.slideId}
                          className="flex items-center justify-between text-[10px]"
                        >
                          <span className="text-ink-muted">
                            Slide {s.slideIndex + 1}
                          </span>
                          <span
                            className={cn(
                              "px-1.5 py-0.5 rounded-full font-medium",
                              badge.color
                            )}
                          >
                            {badge.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Views Over Time */}
            {stats.viewsOverTime.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-ink mb-2">
                  Views Over Time
                </h4>
                <div className="bg-surface-raised rounded-lg p-3">
                  <ResponsiveContainer width="100%" height={140}>
                    <LineChart
                      data={stats.viewsOverTime}
                      margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                      />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 9, fill: "var(--ink-muted)" }}
                        tickFormatter={(d) => {
                          const date = new Date(d);
                          return `${date.getMonth() + 1}/${date.getDate()}`;
                        }}
                      />
                      <YAxis
                        tick={{ fontSize: 9, fill: "var(--ink-muted)" }}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          borderRadius: 8,
                          fontSize: 11,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#3B82F6" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Recent Viewers */}
            {stats.recentViews.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-ink mb-2">
                  Recent Viewers
                </h4>
                <div className="bg-surface-raised rounded-lg overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border text-ink-muted">
                        <th className="text-left p-2 font-medium">Viewer</th>
                        <th className="text-left p-2 font-medium">When</th>
                        <th className="text-right p-2 font-medium">Duration</th>
                        <th className="text-right p-2 font-medium">Slides</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* empty state: no data, no results, nothing here – get started */}
                      {stats.recentViews.length === 0 && (
                        <tr><td colSpan={4} className="p-4 text-center text-ink-muted text-xs">No data available. Share your presentation to see viewer analytics.</td></tr>
                      )}
                      {stats.recentViews.slice(0, 10).map((v, i) => (
                        <tr
                          key={i}
                          className="border-b border-border/50 last:border-0"
                        >
                          <td className="p-2 text-ink-muted font-mono text-[10px]">
                            {v.fingerprint}
                          </td>
                          <td className="p-2 text-ink-muted">
                            {new Date(v.startedAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="p-2 text-right text-ink">
                            {formatDuration(v.duration)}
                          </td>
                          <td className="p-2 text-right text-ink">
                            {v.slidesViewed}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Empty state */}
            {stats.totalViews === 0 && (
              <div className="text-center py-8">
                <Eye size={32} className="mx-auto text-ink-muted/30 mb-2" />
                <p className="text-sm text-ink-muted">No views yet</p>
                <p className="text-xs text-ink-muted/70 mt-1">
                  Share your presentation to start tracking viewer engagement
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Summary Card sub-component
// ---------------------------------------------------------------------------

function SummaryCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-surface-raised rounded-lg p-3">
      <div className={cn("mb-1", color)}>{icon}</div>
      <div className="text-lg font-bold text-ink">{value}</div>
      <div className="text-[10px] text-ink-muted">{label}</div>
    </div>
  );
}
