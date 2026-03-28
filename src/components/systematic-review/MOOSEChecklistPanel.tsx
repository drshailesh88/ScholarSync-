"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ClipboardText,
  CaretDown,
  CaretRight,
  Download,
  FloppyDisk,
  CircleNotch,
  CheckCircle,
  WarningCircle,
  XCircle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import {
  MOOSE_ITEMS,
  MOOSE_SECTION_LABELS,
  MOOSE_RATING_LABELS,
  getMOOSESections,
  getMOOSEItemsBySection,
  assessMOOSE,
  exportMOOSEChecklistCSV,
} from "@/lib/systematic-review/moose-checklist";
import type {
  MOOSERating,
  MOOSEItemResult,
  MOOSEAssessment,
} from "@/lib/systematic-review/moose-checklist";

// ---------------------------------------------------------------------------
// Rating config
// ---------------------------------------------------------------------------

const RATING_OPTIONS: MOOSERating[] = ["Yes", "No", "Partial", "Not Applicable"];

const COMPLIANCE_CONFIG = {
  Complete: {
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    border: "border-emerald-500/30",
    icon: CheckCircle,
  },
  "Minor gaps": {
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    border: "border-amber-500/30",
    icon: WarningCircle,
  },
  "Major gaps": {
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-900/30",
    border: "border-red-500/30",
    icon: XCircle,
  },
} as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildDefaultItems(): MOOSEItemResult[] {
  return MOOSE_ITEMS.map((item) => ({
    itemNumber: item.number,
    rating: "Yes" as MOOSERating,
    pageOrSection: "",
    comment: "",
  }));
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface MOOSEChecklistPanelProps {
  projectId: number;
}

export function MOOSEChecklistPanel({ projectId }: MOOSEChecklistPanelProps) {
  const [items, setItems] = useState<MOOSEItemResult[]>(buildDefaultItems);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    new Set()
  );
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const sections = getMOOSESections();

  // ---------------------------------------------------------------------------
  // Computed assessment
  // ---------------------------------------------------------------------------

  let assessment: MOOSEAssessment | null = null;
  try {
    assessment = assessMOOSE(String(projectId), items);
  } catch {
    // incomplete items — will be null
  }

  const ratedCount = items.filter(
    (i) => i.pageOrSection !== "" || i.comment !== "" || i.rating !== "Yes"
  ).length;

  // ---------------------------------------------------------------------------
  // Load existing assessment on mount
  // ---------------------------------------------------------------------------

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `/api/systematic-review/moose?projectId=${projectId}`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.items) {
          // data.items may come from DB as JSONB
          const loaded: MOOSEItemResult[] =
            typeof data.items === "string"
              ? JSON.parse(data.items)
              : data.items;
          if (Array.isArray(loaded) && loaded.length === 35) {
            setItems(loaded);
          }
        }
      } catch {
        // silently fail — user starts fresh
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [projectId]);

  // ---------------------------------------------------------------------------
  // Save assessment
  // ---------------------------------------------------------------------------

  const save = useCallback(async () => {
    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/systematic-review/moose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, items }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Save failed");
      }

      setSuccessMsg("Assessment saved successfully.");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }, [projectId, items]);

  // ---------------------------------------------------------------------------
  // CSV export
  // ---------------------------------------------------------------------------

  const downloadCSV = useCallback(() => {
    if (!assessment) return;
    const csv = exportMOOSEChecklistCSV(assessment);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `moose-checklist-project-${projectId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [assessment, projectId]);

  // ---------------------------------------------------------------------------
  // Item update helpers
  // ---------------------------------------------------------------------------

  const updateItem = (itemNumber: number, patch: Partial<MOOSEItemResult>) => {
    setItems((prev) =>
      prev.map((i) => (i.itemNumber === itemNumber ? { ...i, ...patch } : i))
    );
  };

  const toggleSection = (section: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  // ---------------------------------------------------------------------------
  // Section completion stats
  // ---------------------------------------------------------------------------

  function sectionStats(section: string) {
    const sectionItems = getMOOSEItemsBySection(section);
    const sectionResults = items.filter((i) =>
      sectionItems.some((si) => si.number === i.itemNumber)
    );
    const completed = sectionResults.filter(
      (i) => i.rating === "Yes" || i.rating === "Not Applicable"
    ).length;
    return { completed, total: sectionItems.length };
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (loading) {
    return (
      <GlassPanel className="p-6 flex items-center justify-center gap-2 text-ink-muted">
        <CircleNotch weight="bold" className="animate-spin" size={20} />
        Loading MOOSE assessment...
      </GlassPanel>
    );
  }

  const complianceCfg = assessment
    ? COMPLIANCE_CONFIG[assessment.compliance]
    : null;
  const ComplianceIcon = complianceCfg?.icon ?? CheckCircle;
  const completionPct = assessment
    ? Math.round(assessment.completionRate * 100)
    : 0;

  return (
    <div className="sr-content space-y-6">
      {/* Header */}
      <div>
        <h2 className="sr-panel-title">
          <ClipboardText weight="duotone" className="text-brand" size={22} />
          MOOSE Reporting Checklist
        </h2>
        <p className="text-sm text-ink-muted mt-1">
          Meta-analysis Of Observational Studies in Epidemiology — 35 items
          across 6 sections (Stroup et al., JAMA 2000).
        </p>
      </div>

      {/* Overall compliance badge + progress */}
      {assessment && complianceCfg && (
        <GlassPanel className="p-5 space-y-4">
          {/* Compliance badge */}
          <div className="flex items-center justify-between">
            <div
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium",
                complianceCfg.bg,
                complianceCfg.color,
                complianceCfg.border
              )}
            >
              <ComplianceIcon weight="fill" size={16} />
              {assessment.compliance}
            </div>
            <span className="text-2xl font-bold text-ink">
              {completionPct}%
            </span>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex items-center justify-between text-xs text-ink-muted mb-1.5">
              <span>
                {assessment.completedCount} / {assessment.totalApplicable}{" "}
                applicable items fully reported
              </span>
              <span>{ratedCount} / 35 items rated</span>
            </div>
            <div className="w-full h-2.5 bg-surface-raised rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-300",
                  completionPct >= 80
                    ? "bg-emerald-500"
                    : completionPct >= 50
                      ? "bg-amber-500"
                      : "bg-red-500"
                )}
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>
        </GlassPanel>
      )}

      {/* Error / Success messages */}
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400 flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-300"
          >
            &#x2715;
          </button>
        </div>
      )}
      {successMsg && (
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-400">
          {successMsg}
        </div>
      )}

      {/* Sections */}
      <div className="space-y-4">
        {sections.length === 0 && (
          <p className="text-sm text-ink-muted">No results</p>
        )}
        {sections.map((section) => {
          const sectionLabel =
            MOOSE_SECTION_LABELS[section] ?? section;
          const sectionItemDefs = getMOOSEItemsBySection(section);
          const collapsed = collapsedSections.has(section);
          const stats = sectionStats(section);

          return (
            <GlassPanel key={section} className="overflow-hidden">
              {/* Section header */}
              <button
                onClick={() => toggleSection(section)}
                className="w-full flex items-center justify-between px-5 py-3 hover:bg-surface-raised/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {collapsed ? (
                    <CaretRight
                      weight="bold"
                      size={14}
                      className="text-ink-muted"
                    />
                  ) : (
                    <CaretDown
                      weight="bold"
                      size={14}
                      className="text-ink-muted"
                    />
                  )}
                  <h3 className="text-sm font-semibold text-ink">
                    {sectionLabel}
                  </h3>
                </div>
                <span className="text-xs text-ink-muted">
                  {stats.completed}/{stats.total} complete
                </span>
              </button>

              {/* Section items */}
              {!collapsed && (
                <div className="border-t border-border divide-y divide-border">
                  {sectionItemDefs.map((def) => {
                    const item = items.find(
                      (i) => i.itemNumber === def.number
                    )!;

                    return (
                      <div
                        key={def.number}
                        className="px-5 py-4 space-y-3"
                      >
                        {/* Item header */}
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand/10 text-brand text-xs font-bold flex items-center justify-center">
                            {def.number}
                          </span>
                          <p className="text-sm text-ink leading-relaxed pt-0.5">
                            {def.description}
                          </p>
                        </div>

                        {/* Rating radio buttons */}
                        <div className="flex flex-wrap gap-2 pl-10">
                          {RATING_OPTIONS.map((rating) => (
                            <label
                              key={rating}
                              className={cn(
                                "flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium cursor-pointer transition-colors",
                                item.rating === rating
                                  ? rating === "Yes"
                                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                    : rating === "No"
                                      ? "border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400"
                                      : rating === "Partial"
                                        ? "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                        : "border-border bg-surface-raised text-ink-muted"
                                  : "border-border hover:bg-surface-raised text-ink-muted"
                              )}
                            >
                              <input
                                type="radio"
                                name={`moose-item-${def.number}`}
                                value={rating}
                                checked={item.rating === rating}
                                onChange={() =>
                                  updateItem(def.number, { rating })
                                }
                                className="sr-only"
                              />
                              {MOOSE_RATING_LABELS[rating]}
                            </label>
                          ))}
                        </div>

                        {/* Page/section and comment inputs */}
                        <div className="grid grid-cols-2 gap-3 pl-10">
                          <input
                            type="text"
                            placeholder="Page / section reference"
                            value={item.pageOrSection}
                            onChange={(e) =>
                              updateItem(def.number, {
                                pageOrSection: e.target.value,
                              })
                            }
                            className="px-3 py-1.5 bg-surface-raised border border-border rounded-md text-xs text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/30"
                          />
                          <input
                            type="text"
                            placeholder="Comment (optional)"
                            value={item.comment}
                            onChange={(e) =>
                              updateItem(def.number, {
                                comment: e.target.value,
                              })
                            }
                            className="px-3 py-1.5 bg-surface-raised border border-border rounded-md text-xs text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/30"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </GlassPanel>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={downloadCSV}
          disabled={!assessment}
          className="sr-btn sr-btn-secondary"
        >
          <Download size={14} />
          Export CSV
        </button>
        <button
          onClick={save}
          disabled={saving}
          className="sr-btn sr-btn-primary"
        >
          {saving ? (
            <>
              <CircleNotch weight="bold" className="animate-spin" size={16} />
              Saving...
            </>
          ) : (
            <>
              <FloppyDisk weight="bold" size={16} />
              Save Assessment
            </>
          )}
        </button>
      </div>
    </div>
  );
}
