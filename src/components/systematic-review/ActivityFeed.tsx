"use client";

import { useState } from "react";
import {
  Lightning,
  CheckCircle,
  XCircle,
  Question,
  Table,
  ShieldCheck,
  ArrowFatUp,
  DownloadSimple,
  X,
  CaretRight,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { ActivityEntry } from "@/hooks/use-collaborative-review";

// ---------------------------------------------------------------------------
// ActivityFeed
// ---------------------------------------------------------------------------

interface ActivityFeedProps {
  entries: ActivityEntry[];
  className?: string;
}

/**
 * Real-time activity feed sidebar for a systematic review project.
 * Shows a log of collaborative events: screening decisions, extractions,
 * RoB 2 assessments, stage changes, and paper imports.
 */
export function ActivityFeed({ entries, className }: ActivityFeedProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Toggle button (collapsed state) */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className={cn(
            "fixed right-4 top-1/2 -translate-y-1/2 z-40",
            "flex items-center gap-1.5 px-2.5 py-2 rounded-l-xl",
            "bg-surface-raised/90 backdrop-blur-sm border border-border border-r-0",
            "text-ink-muted hover:text-brand transition-colors shadow-lg",
            "group"
          )}
          title="Open activity feed"
        >
          <Lightning size={16} weight="bold" />
          {entries.length > 0 && (
            <span className="absolute -top-1.5 -left-1.5 w-4 h-4 bg-brand text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {entries.length > 9 ? "9+" : entries.length}
            </span>
          )}
        </button>
      )}

      {/* Expanded sidebar */}
      {isExpanded && (
        <div
          className={cn(
            "fixed right-0 top-0 bottom-0 z-50 w-80",
            "flex flex-col",
            "bg-surface/95 backdrop-blur-md border-l border-border shadow-2xl",
            "animate-in slide-in-from-right duration-200",
            className
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Lightning size={16} weight="bold" className="text-brand" />
              <h3 className="text-sm font-semibold text-ink">Activity Feed</h3>
              {entries.length > 0 && (
                <span className="px-1.5 py-0.5 bg-brand/10 text-brand rounded text-[10px] font-medium">
                  {entries.length}
                </span>
              )}
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-md hover:bg-surface-raised text-ink-muted hover:text-ink transition-colors"
            >
              <X size={14} weight="bold" />
            </button>
          </div>

          {/* Feed entries */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
            {entries.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <Lightning
                  size={32}
                  weight="light"
                  className="text-ink-muted/40 mb-2"
                />
                <p className="text-xs text-ink-muted">
                  No activity yet. Actions by collaborators will appear here in
                  real time.
                </p>
              </div>
            ) : (
              entries.map((entry) => (
                <ActivityEntryRow key={entry.id} entry={entry} />
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// ActivityEntryRow
// ---------------------------------------------------------------------------

function ActivityEntryRow({ entry }: { entry: ActivityEntry }) {
  const { event, timestamp } = entry;
  const timeAgo = formatTimeAgo(timestamp);

  switch (event.type) {
    case "decision-made": {
      const DecisionIcon =
        event.decision === "include"
          ? CheckCircle
          : event.decision === "exclude"
            ? XCircle
            : Question;
      const decisionColor =
        event.decision === "include"
          ? "text-emerald-500"
          : event.decision === "exclude"
            ? "text-red-400"
            : "text-amber-400";

      return (
        <GlassPanel className="px-3 py-2.5 !rounded-xl">
          <div className="flex items-start gap-2">
            <DecisionIcon
              size={16}
              weight="fill"
              className={cn("mt-0.5 shrink-0", decisionColor)}
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-ink leading-relaxed">
                <span className="font-medium">{event.userName}</span>{" "}
                screened Paper #{event.paperId} as{" "}
                <span className={cn("font-semibold capitalize", decisionColor)}>
                  {event.decision}
                </span>
              </p>
              {event.paperTitle && (
                <p className="text-[10px] text-ink-muted mt-0.5 truncate">
                  {event.paperTitle}
                </p>
              )}
              <p className="text-[10px] text-ink-muted/60 mt-1">{timeAgo}</p>
            </div>
          </div>
        </GlassPanel>
      );
    }

    case "extraction-complete":
      return (
        <GlassPanel className="px-3 py-2.5 !rounded-xl">
          <div className="flex items-start gap-2">
            <Table
              size={16}
              weight="fill"
              className="mt-0.5 shrink-0 text-blue-400"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-ink leading-relaxed">
                <span className="font-medium">{event.userName}</span>{" "}
                completed data extraction for Paper #{event.paperId}
              </p>
              {event.paperTitle && (
                <p className="text-[10px] text-ink-muted mt-0.5 truncate">
                  {event.paperTitle}
                </p>
              )}
              <p className="text-[10px] text-ink-muted/60 mt-1">{timeAgo}</p>
            </div>
          </div>
        </GlassPanel>
      );

    case "rob2-assessed":
      return (
        <GlassPanel className="px-3 py-2.5 !rounded-xl">
          <div className="flex items-start gap-2">
            <ShieldCheck
              size={16}
              weight="fill"
              className="mt-0.5 shrink-0 text-purple-400"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-ink leading-relaxed">
                <span className="font-medium">{event.userName}</span>{" "}
                assessed RoB 2 for Paper #{event.paperId}
              </p>
              <p className="text-[10px] text-ink-muted mt-0.5">
                Overall risk:{" "}
                <span className="font-medium">{event.overallRisk}</span>
              </p>
              {event.paperTitle && (
                <p className="text-[10px] text-ink-muted mt-0.5 truncate">
                  {event.paperTitle}
                </p>
              )}
              <p className="text-[10px] text-ink-muted/60 mt-1">{timeAgo}</p>
            </div>
          </div>
        </GlassPanel>
      );

    case "stage-advanced":
      return (
        <GlassPanel className="px-3 py-2.5 !rounded-xl">
          <div className="flex items-start gap-2">
            <ArrowFatUp
              size={16}
              weight="fill"
              className="mt-0.5 shrink-0 text-brand"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-ink leading-relaxed">
                <span className="font-medium">{event.userName}</span>{" "}
                advanced the review stage
              </p>
              <p className="text-[10px] text-ink-muted mt-0.5 flex items-center gap-1">
                {event.fromStage}
                <CaretRight size={8} weight="bold" />
                <span className="font-medium text-brand">{event.toStage}</span>
              </p>
              <p className="text-[10px] text-ink-muted/60 mt-1">{timeAgo}</p>
            </div>
          </div>
        </GlassPanel>
      );

    case "papers-imported":
      return (
        <GlassPanel className="px-3 py-2.5 !rounded-xl">
          <div className="flex items-start gap-2">
            <DownloadSimple
              size={16}
              weight="fill"
              className="mt-0.5 shrink-0 text-teal-400"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-ink leading-relaxed">
                <span className="font-medium">{event.userName}</span>{" "}
                imported{" "}
                <span className="font-semibold">{event.count}</span> papers
                from {event.source}
              </p>
              <p className="text-[10px] text-ink-muted/60 mt-1">{timeAgo}</p>
            </div>
          </div>
        </GlassPanel>
      );

    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
