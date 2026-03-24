"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Warning,
  Lightning,
  ClipboardText,
  FloppyDisk,
  CheckCircle,
  XCircle,
  Copy,
  CircleNotch,
  CaretDown,
  CaretRight,
} from "@phosphor-icons/react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";
import { useSystematicReviewStore } from "@/stores/systematic-review-store";

// ---------------------------------------------------------------------------
// Deviation categories
// ---------------------------------------------------------------------------

interface DeviationCategory {
  id: string;
  label: string;
  description: string;
  justification_prompt: string;
}

const DEVIATION_CATEGORIES: DeviationCategory[] = [
  {
    id: "single_reviewer",
    label: "Single reviewer screening",
    description:
      "Only one reviewer screened titles/abstracts (instead of dual independent screening)",
    justification_prompt:
      "Why was single reviewer screening acceptable for this review?",
  },
  {
    id: "limited_databases",
    label: "Limited database search",
    description: "Fewer than 3 databases were searched",
    justification_prompt:
      "Which databases were searched and why were others excluded?",
  },
  {
    id: "no_grey_literature",
    label: "No grey literature search",
    description:
      "Grey literature and unpublished studies were not searched",
    justification_prompt:
      "Why was grey literature search omitted?",
  },
  {
    id: "skipped_rob",
    label: "No quality/risk of bias assessment",
    description:
      "Risk of bias or quality assessment was not performed",
    justification_prompt:
      "Why was quality assessment omitted and how does this affect conclusions?",
  },
  {
    id: "skipped_grade",
    label: "No certainty of evidence assessment",
    description:
      "GRADE or equivalent certainty assessment was not performed",
    justification_prompt: "Why was certainty assessment omitted?",
  },
  {
    id: "narrative_only",
    label: "Narrative synthesis only",
    description:
      "No quantitative synthesis (meta-analysis) was performed",
    justification_prompt:
      "Why was quantitative synthesis not feasible or appropriate?",
  },
  {
    id: "time_limited",
    label: "Shortened timeline",
    description: "Review was completed in a shortened timeframe",
    justification_prompt:
      "What was the timeline and what drove the urgency?",
  },
  {
    id: "language_restricted",
    label: "Language restrictions",
    description: "Search was restricted to specific languages",
    justification_prompt:
      "Which languages were included and why were others excluded?",
  },
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Deviation {
  id: string;
  active: boolean;
  justification: string;
}

interface DeviationTrackerProps {
  projectId: number;
  isRapid: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DeviationTracker({ projectId, isRapid }: DeviationTrackerProps) {
  const { reviewConfig } = useSystematicReviewStore();

  const [deviations, setDeviations] = useState<Deviation[]>(() =>
    DEVIATION_CATEGORIES.map((c) => ({
      id: c.id,
      active: false,
      justification: "",
    }))
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load saved deviations from config settings
  useEffect(() => {
    const saved = reviewConfig?.settings?.deviations as Deviation[] | undefined;
    if (saved && Array.isArray(saved)) {
      setDeviations((prev) =>
        prev.map((d) => {
          const match = saved.find((s) => s.id === d.id);
          return match
            ? { ...d, active: match.active, justification: match.justification }
            : d;
        })
      );
    }
  }, [reviewConfig?.settings?.deviations]);

  const toggleDeviation = useCallback((id: string) => {
    setDeviations((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, active: !d.active } : d
      )
    );
    setSaveSuccess(false);
  }, []);

  const updateJustification = useCallback((id: string, justification: string) => {
    setDeviations((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, justification } : d
      )
    );
    setSaveSuccess(false);
  }, []);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const currentSettings = reviewConfig?.settings ?? {};
      const res = await fetch("/api/systematic-review/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          settings: {
            ...currentSettings,
            deviations,
          },
        }),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch {
      // Save failed silently
    } finally {
      setIsSaving(false);
    }
  }, [projectId, deviations, reviewConfig?.settings]);

  const activeDeviations = deviations.filter((d) => d.active);

  const generateReport = useCallback(() => {
    if (activeDeviations.length === 0) return "";

    const lines = [
      "This rapid review deviated from standard systematic review methodology in the following ways:\n",
    ];

    activeDeviations.forEach((d, i) => {
      const category = DEVIATION_CATEGORIES.find((c) => c.id === d.id);
      if (!category) return;
      lines.push(
        `${i + 1}. ${category.label}: ${category.description}.${
          d.justification ? ` ${d.justification}` : ""
        }`
      );
    });

    lines.push(
      "\nThese deviations should be considered when interpreting the findings of this review."
    );

    return lines.join("\n");
  }, [activeDeviations]);

  const handleCopyReport = useCallback(async () => {
    const report = generateReport();
    if (!report) return;
    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available
    }
  }, [generateReport]);

  // Not in rapid mode — show info banner
  if (!isRapid) {
    return (
      <GlassPanel className="p-6">
        <div className="flex items-center gap-3 text-ink-muted">
          <Lightning weight="duotone" size={20} className="text-ink-muted shrink-0" />
          <p className="text-sm">
            This review is not in rapid mode. Enable rapid mode in project
            settings to track methodological deviations.
          </p>
        </div>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightning weight="duotone" size={22} className="text-brand" />
          <h3 className="text-base font-semibold text-ink">
            Rapid Review Deviations
          </h3>
          {activeDeviations.length > 0 && (
            <span className="text-xs bg-brand/10 text-brand px-2 py-0.5 rounded-full font-medium">
              {activeDeviations.length} active
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={cn(
              "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors",
              saveSuccess
                ? "bg-emerald-500/10 text-emerald-600"
                : "bg-brand/10 text-brand hover:bg-brand/20"
            )}
          >
            {isSaving ? (
              <CircleNotch weight="bold" size={14} className="animate-spin" />
            ) : saveSuccess ? (
              <CheckCircle weight="duotone" size={14} />
            ) : (
              <FloppyDisk weight="duotone" size={14} />
            )}
            {isSaving ? "Saving..." : saveSuccess ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      <p className="text-xs text-ink-muted">
        Track methodological shortcuts taken in this rapid review. Each deviation
        will be documented in the limitations section of your manuscript.
      </p>

      {/* Deviation checklist */}
      <div className="space-y-3">
        {DEVIATION_CATEGORIES.map((category) => {
          const deviation = deviations.find((d) => d.id === category.id);
          const isActive = deviation?.active ?? false;

          return (
            <div
              key={category.id}
              className={cn(
                "border rounded-xl p-4 transition-colors",
                isActive
                  ? "border-brand/30 bg-brand/5"
                  : "border-border bg-surface-raised/50"
              )}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleDeviation(category.id)}
                  className="mt-0.5 shrink-0"
                >
                  {isActive ? (
                    <CheckCircle
                      weight="duotone"
                      size={20}
                      className="text-brand"
                    />
                  ) : (
                    <XCircle
                      weight="duotone"
                      size={20}
                      className="text-ink-muted/40"
                    />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Warning
                      weight="duotone"
                      size={14}
                      className={cn(
                        isActive ? "text-amber-500" : "text-ink-muted/40"
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isActive ? "text-ink" : "text-ink-muted"
                      )}
                    >
                      {category.label}
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted mt-0.5 ml-5">
                    {category.description}
                  </p>

                  {isActive && (
                    <div className="mt-3 ml-5">
                      <label className="text-xs font-medium text-ink-muted block mb-1.5">
                        {category.justification_prompt}
                      </label>
                      <textarea
                        value={deviation?.justification ?? ""}
                        onChange={(e) =>
                          updateJustification(category.id, e.target.value)
                        }
                        placeholder="Enter justification..."
                        rows={2}
                        className="w-full text-sm bg-surface-raised border border-border rounded-lg px-3 py-2 text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-1 focus:ring-brand resize-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report section */}
      {activeDeviations.length > 0 && (
        <div className="border-t border-border pt-5 space-y-3">
          <button
            onClick={() => setShowReport(!showReport)}
            className="flex items-center gap-2 text-sm font-medium text-ink hover:text-brand transition-colors"
          >
            <ClipboardText weight="duotone" size={18} />
            Generate Deviation Report
            {showReport ? (
              <CaretDown weight="bold" size={12} />
            ) : (
              <CaretRight weight="bold" size={12} />
            )}
          </button>

          {showReport && (
            <div className="space-y-3">
              <div className="bg-surface-raised border border-border rounded-xl p-4">
                <pre className="text-xs text-ink whitespace-pre-wrap font-sans leading-relaxed">
                  {generateReport()}
                </pre>
              </div>

              <button
                onClick={handleCopyReport}
                className={cn(
                  "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors",
                  copied
                    ? "bg-emerald-500/10 text-emerald-600"
                    : "bg-brand/10 text-brand hover:bg-brand/20"
                )}
              >
                {copied ? (
                  <CheckCircle weight="duotone" size={14} />
                ) : (
                  <Copy weight="duotone" size={14} />
                )}
                {copied ? "Copied to clipboard" : "Copy to clipboard"}
              </button>
            </div>
          )}
        </div>
      )}
    </GlassPanel>
  );
}
