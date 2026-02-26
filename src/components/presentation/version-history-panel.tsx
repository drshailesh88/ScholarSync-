"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ClockCounterClockwise,
  FloppyDisk,
  ArrowCounterClockwise,
  GitDiff,
  Trash,
  CircleNotch,
  Warning,
  Check,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  saveVersion,
  getVersions,
  getVersionSnapshot,
  restoreVersion,
  deleteVersion,
} from "@/lib/actions/versions";
import type { VersionRecord, VersionSnapshot } from "@/lib/actions/versions";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface VersionHistoryPanelProps {
  deckId: number;
  onDeckRestored: () => void;
  onCompareVersions: (snapshotA: VersionSnapshot, snapshotB: VersionSnapshot, labelA: string, labelB: string) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function VersionHistoryPanel({
  deckId,
  onDeckRestored,
  onCompareVersions,
}: VersionHistoryPanelProps) {
  const [versions, setVersions] = useState<VersionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [restoring, setRestoring] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [confirmRestore, setConfirmRestore] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [comparing, setComparing] = useState(false);
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null);

  const loadVersions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getVersions(deckId);
      setVersions(data);
    } catch (err) {
      setError("Failed to load versions");
    } finally {
      setLoading(false);
    }
  }, [deckId]);

  useEffect(() => {
    loadVersions();
  }, [loadVersions]);

  // Clear success messages after 3 seconds
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  async function handleSaveVersion() {
    setSaving(true);
    setError("");
    try {
      await saveVersion(deckId, "Manual save");
      setSuccessMsg("Version saved");
      await loadVersions();
    } catch (err) {
      setError("Failed to save version");
    } finally {
      setSaving(false);
    }
  }

  async function handleRestore(versionId: string) {
    if (confirmRestore !== versionId) {
      setConfirmRestore(versionId);
      return;
    }
    setRestoring(versionId);
    setError("");
    setConfirmRestore(null);
    try {
      await restoreVersion(deckId, versionId);
      setSuccessMsg("Version restored");
      onDeckRestored();
      await loadVersions();
    } catch (err) {
      setError("Failed to restore version");
    } finally {
      setRestoring(null);
    }
  }

  async function handleDelete(versionId: string) {
    if (confirmDelete !== versionId) {
      setConfirmDelete(versionId);
      return;
    }
    setConfirmDelete(null);
    setError("");
    try {
      await deleteVersion(versionId);
      setSuccessMsg("Version deleted");
      setSelectedForCompare((prev) => prev.filter((id) => id !== versionId));
      await loadVersions();
    } catch (err) {
      setError("Failed to delete version");
    }
  }

  function toggleCompareSelect(versionId: string) {
    setSelectedForCompare((prev) => {
      if (prev.includes(versionId)) {
        return prev.filter((id) => id !== versionId);
      }
      if (prev.length >= 2) {
        return [prev[1], versionId];
      }
      return [...prev, versionId];
    });
  }

  async function handleCompare() {
    if (selectedForCompare.length !== 2) return;
    setComparing(true);
    setError("");
    try {
      const [snapshotA, snapshotB] = await Promise.all([
        getVersionSnapshot(selectedForCompare[0]),
        getVersionSnapshot(selectedForCompare[1]),
      ]);
      const vA = versions.find((v) => v.id === selectedForCompare[0]);
      const vB = versions.find((v) => v.id === selectedForCompare[1]);
      const labelA = vA ? `v${vA.versionNumber}${vA.label ? ` - ${vA.label}` : ""}` : "Version A";
      const labelB = vB ? `v${vB.versionNumber}${vB.label ? ` - ${vB.label}` : ""}` : "Version B";
      onCompareVersions(snapshotA, snapshotB, labelA, labelB);
    } catch (err) {
      setError("Failed to load version snapshots for comparison");
    } finally {
      setComparing(false);
    }
  }

  function formatTime(date: Date) {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <div className="flex items-center gap-2">
          <ClockCounterClockwise size={16} className="text-brand" />
          <span className="text-xs font-medium text-ink">Version History</span>
        </div>
        <span className="text-[10px] text-ink-muted">
          {versions.length} version{versions.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Save Current Version */}
      <div className="px-3 py-2 border-b border-border">
        <button
          onClick={handleSaveVersion}
          disabled={saving}
          className={cn(
            "w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
            saving
              ? "bg-surface text-ink-muted cursor-not-allowed"
              : "bg-brand text-white hover:bg-brand/90"
          )}
        >
          {saving ? (
            <CircleNotch size={14} className="animate-spin" />
          ) : (
            <FloppyDisk size={14} />
          )}
          {saving ? "Saving..." : "Save Current Version"}
        </button>
      </div>

      {/* Compare Controls */}
      {selectedForCompare.length > 0 && (
        <div className="px-3 py-2 border-b border-border bg-surface-raised/50">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-ink-muted">
              {selectedForCompare.length}/2 selected for comparison
            </span>
            {selectedForCompare.length === 2 && (
              <button
                onClick={handleCompare}
                disabled={comparing}
                className="flex items-center gap-1 text-[10px] font-medium text-brand hover:text-brand/80 transition-colors"
              >
                {comparing ? (
                  <CircleNotch size={10} className="animate-spin" />
                ) : (
                  <GitDiff size={10} />
                )}
                Compare
              </button>
            )}
          </div>
        </div>
      )}

      {/* Success / Error messages */}
      {successMsg && (
        <div className="px-3 py-1.5 bg-green-500/10 border-b border-green-500/20">
          <p className="text-[10px] text-green-600 flex items-center gap-1">
            <Check size={10} weight="bold" /> {successMsg}
          </p>
        </div>
      )}
      {error && (
        <div className="px-3 py-1.5 bg-red-500/10 border-b border-red-500/20">
          <p className="text-[10px] text-red-500 flex items-center gap-1">
            <Warning size={10} /> {error}
          </p>
        </div>
      )}

      {/* Version List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <CircleNotch size={20} className="text-ink-muted animate-spin" />
          </div>
        ) : versions.length === 0 ? (
          <div className="text-center py-8 px-3">
            <ClockCounterClockwise
              size={32}
              className="mx-auto text-ink-muted/40 mb-2"
            />
            <p className="text-xs text-ink-muted">No versions saved yet.</p>
            <p className="text-[10px] text-ink-muted/60 mt-1">
              Versions are auto-saved before AI edits, or save one manually
              above.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {versions.map((version) => {
              const isSelected = selectedForCompare.includes(version.id);
              const isExpanded = expandedVersion === version.id;

              return (
                <div
                  key={version.id}
                  className={cn(
                    "px-3 py-2.5 transition-colors",
                    isSelected && "bg-brand/5"
                  )}
                >
                  {/* Version header row */}
                  <div className="flex items-start gap-2">
                    {/* Compare checkbox */}
                    <button
                      onClick={() => toggleCompareSelect(version.id)}
                      className={cn(
                        "mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors",
                        isSelected
                          ? "bg-brand border-brand text-white"
                          : "border-border hover:border-brand/40"
                      )}
                    >
                      {isSelected && <Check size={10} weight="bold" />}
                    </button>

                    {/* Version info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-ink">
                          v{version.versionNumber}
                        </span>
                        {version.label && (
                          <span className="text-[10px] text-ink-muted truncate">
                            {version.label}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-ink-muted/70 mt-0.5">
                        {formatTime(version.createdAt)}
                      </p>
                    </div>

                    {/* Expand toggle */}
                    <button
                      onClick={() =>
                        setExpandedVersion(
                          isExpanded ? null : version.id
                        )
                      }
                      className="p-0.5 text-ink-muted hover:text-ink transition-colors"
                    >
                      {isExpanded ? (
                        <CaretUp size={12} />
                      ) : (
                        <CaretDown size={12} />
                      )}
                    </button>
                  </div>

                  {/* Expanded actions */}
                  {isExpanded && (
                    <div className="mt-2 ml-6 space-y-1.5">
                      {version.changeSummary && (
                        <p className="text-[10px] text-ink-muted leading-relaxed">
                          {version.changeSummary}
                        </p>
                      )}

                      <div className="flex items-center gap-2">
                        {/* Restore button */}
                        <button
                          onClick={() => handleRestore(version.id)}
                          disabled={restoring === version.id}
                          className={cn(
                            "flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-colors",
                            confirmRestore === version.id
                              ? "bg-amber-500/10 text-amber-600 border border-amber-500/30"
                              : restoring === version.id
                                ? "bg-surface text-ink-muted cursor-not-allowed"
                                : "bg-surface hover:bg-surface-raised text-ink-muted hover:text-ink border border-border"
                          )}
                        >
                          {restoring === version.id ? (
                            <CircleNotch size={10} className="animate-spin" />
                          ) : (
                            <ArrowCounterClockwise size={10} />
                          )}
                          {confirmRestore === version.id
                            ? "Confirm restore?"
                            : "Restore"}
                        </button>

                        {/* Delete button */}
                        <button
                          onClick={() => handleDelete(version.id)}
                          className={cn(
                            "flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-colors",
                            confirmDelete === version.id
                              ? "bg-red-500/10 text-red-500 border border-red-500/30"
                              : "text-ink-muted/60 hover:text-red-500"
                          )}
                        >
                          <Trash size={10} />
                          {confirmDelete === version.id
                            ? "Confirm delete?"
                            : "Delete"}
                        </button>
                      </div>

                      {/* Cancel confirmation */}
                      {(confirmRestore === version.id ||
                        confirmDelete === version.id) && (
                        <button
                          onClick={() => {
                            setConfirmRestore(null);
                            setConfirmDelete(null);
                          }}
                          className="text-[10px] text-ink-muted hover:text-ink transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
