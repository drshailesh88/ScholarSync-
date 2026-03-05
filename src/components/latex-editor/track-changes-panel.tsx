/**
 * Track Changes Panel Component
 *
 * Displays a list of all pending track changes with Accept/Reject buttons
 * Shows in the sidebar alongside Files, Figures, and Comments
 */

"use client";

import { useState } from "react";
import { type TrackChange } from "@/types/track-changes";
import { cn } from "@/lib/utils";
import {
  Check,
  X,
  CheckCircle,
  XCircle,
  CaretDown,
  CaretRight,
} from "@phosphor-icons/react";

interface TrackChangesPanelProps {
  _fileId: string;
  changes: TrackChange[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
}

export function TrackChangesPanel({
  _fileId,
  changes,
  onAccept,
  onReject,
  onAcceptAll,
  onRejectAll,
}: TrackChangesPanelProps) {
  const [expandedChanges, setExpandedChanges] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "rejected">("pending");

  const pendingChanges = changes.filter((c) => c.status === "pending");
  const filteredChanges = changes.filter((c) => {
    if (filter === "all") return true;
    return c.status === filter;
  });

  const toggleExpand = (id: string) => {
    setExpandedChanges((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const formatChangePreview = (change: TrackChange) => {
    if (change.type === "insert" && change.insertedText) {
      const preview = change.insertedText.slice(0, 50);
      return (
        <span className="text-emerald-700 dark:text-emerald-400">
          + &ldquo;{preview}&rdquo;
          {change.insertedText.length > 50 && "..."}
        </span>
      );
    } else if (change.type === "delete" && change.deletedText) {
      const preview = change.deletedText.slice(0, 50);
      return (
        <span className="text-red-700 dark:text-red-400 line-through">
          -&ldquo;{preview}&rdquo;
          {change.deletedText.length > 50 && "..."}
        </span>
      );
    } else if (change.type === "replace") {
      return (
        <span className="text-amber-700 dark:text-amber-400">
          Replace at position {change.from}
        </span>
      );
    }
    return null;
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border-subtle">
        <h3 className="text-xs font-semibold text-ink">Changes</h3>
        <div className="flex items-center gap-1">
          {pendingChanges.length > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] font-medium bg-brand text-white rounded-full">
              {pendingChanges.length}
            </span>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex border-b border-border-subtle overflow-x-auto">
        {(["all", "pending", "accepted", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "flex-1 px-2 py-1.5 text-[10px] font-medium capitalize transition-colors whitespace-nowrap",
              filter === f
                ? "text-brand border-b-2 border-brand -mb-px bg-brand/5"
                : "text-ink-muted hover:text-ink"
            )}
          >
            {f}
            {f === "pending" && pendingChanges.length > 0 && (
              <span className="ml-1 text-[9px] opacity-70">({pendingChanges.length})</span>
            )}
          </button>
        ))}
      </div>

      {/* Bulk actions */}
      {pendingChanges.length > 0 && filter === "pending" && (
        <div className="flex items-center gap-1 px-2 py-1.5 border-b border-border-subtle bg-surface/50">
          <button
            onClick={onAcceptAll}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-[10px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
          >
            <Check size={12} weight="bold" />
            Accept All
          </button>
          <button
            onClick={onRejectAll}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-[10px] font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <X size={12} weight="bold" />
            Reject All
          </button>
        </div>
      )}

      {/* Changes list */}
      <div className="flex-1 overflow-y-auto">
        {filteredChanges.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <div className="w-12 h-12 rounded-full bg-surface-raised flex items-center justify-center mb-2">
              <CheckCircle size={20} className="text-ink-muted" />
            </div>
            <p className="text-xs text-ink-muted">
              {filter === "pending" ? "No pending changes" : `No ${filter} changes`}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border-subtle">
            {filteredChanges.map((change) => (
              <div
                key={change.id}
                className={cn(
                  "group transition-colors",
                  change.status === "pending" && "hover:bg-surface-raised/50"
                )}
              >
                <div
                  className="flex items-start gap-2 px-3 py-2 cursor-pointer"
                  onClick={() => toggleExpand(change.id)}
                >
                  <button className="mt-0.5 text-ink-muted hover:text-ink transition-colors">
                    {expandedChanges.has(change.id) ? (
                      <CaretDown size={12} />
                    ) : (
                      <CaretRight size={12} />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: change.author.color }}
                      />
                      <span className="text-[11px] font-medium text-ink">
                        {change.author.name}
                      </span>
                      <span className="text-[10px] text-ink-muted">
                        {formatTimestamp(change.timestamp)}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono truncate">
                      {formatChangePreview(change)}
                    </div>

                    {change.status !== "pending" && (
                      <div className="mt-1 flex items-center gap-1">
                        {change.status === "accepted" ? (
                          <>
                            <CheckCircle size={10} className="text-emerald-500" />
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                              Accepted
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle size={10} className="text-red-500" />
                            <span className="text-[10px] text-red-600 dark:text-red-400">
                              Rejected
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {change.status === "pending" && (
                    <div
                      className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => onAccept(change.id)}
                        className="p-1 rounded text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                        title="Accept change"
                      >
                        <Check size={14} weight="bold" />
                      </button>
                      <button
                        onClick={() => onReject(change.id)}
                        className="p-1 rounded text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Reject change"
                      >
                        <X size={14} weight="bold" />
                      </button>
                    </div>
                  )}
                </div>

                {expandedChanges.has(change.id) && (
                  <div className="px-3 pb-2 pl-7">
                    <div className="text-[10px] text-ink-muted space-y-1">
                      <div>
                        <span className="font-medium">Type:</span>{" "}
                        <span className="capitalize">{change.type}</span>
                      </div>
                      <div>
                        <span className="font-medium">Position:</span> {change.from} - {change.to}
                      </div>
                      {change.insertedText && (
                        <div>
                          <span className="font-medium">Inserted:</span>
                          <div className="mt-1 p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded text-[10px] font-mono whitespace-pre-wrap break-all max-h-32 overflow-y-auto">
                            {change.insertedText}
                          </div>
                        </div>
                      )}
                      {change.deletedText && (
                        <div>
                          <span className="font-medium">Deleted:</span>
                          <div className="mt-1 p-2 bg-red-50 dark:bg-red-900/20 rounded text-[10px] font-mono whitespace-pre-wrap break-all max-h-32 overflow-y-auto line-through">
                            {change.deletedText}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
