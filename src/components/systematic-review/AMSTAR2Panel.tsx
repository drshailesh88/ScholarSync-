"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ClipboardText,
  CircleNotch,
  Warning,
  CheckCircle,
  XCircle,
  MinusCircle,
  Star,
  ArrowsClockwise,
  Lightning,
  CaretDown,
  CaretRight,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";

// ---------------------------------------------------------------------------
// Types (mirrors server types)
// ---------------------------------------------------------------------------

type AMSTAR2Rating = "yes" | "partial_yes" | "no";
type OverallConfidence = "high" | "moderate" | "low" | "critically_low";

interface AMSTAR2Item {
  itemNumber: number;
  domain: string;
  question: string;
  isCritical: boolean;
}

interface AMSTAR2ItemResult {
  item: AMSTAR2Item;
  rating: AMSTAR2Rating;
  rationale: string;
  suggestion: string;
}

interface AMSTAR2Assessment {
  items: AMSTAR2ItemResult[];
  overallConfidence: OverallConfidence;
  criticalWeaknesses: number[];
  nonCriticalWeaknesses: number[];
  assessedAt: string;
}

interface AMSTAR2PanelProps {
  projectId: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const RATING_CONFIG: Record<
  AMSTAR2Rating,
  {
    label: string;
    icon: typeof CheckCircle;
    badgeClass: string;
    rowClass: string;
  }
> = {
  yes: {
    label: "Yes",
    icon: CheckCircle,
    badgeClass: "bg-emerald-500 text-white",
    rowClass: "border-l-2 border-emerald-500/40",
  },
  partial_yes: {
    label: "Partial Yes",
    icon: MinusCircle,
    badgeClass: "bg-amber-500 text-white",
    rowClass: "border-l-2 border-amber-500/40",
  },
  no: {
    label: "No",
    icon: XCircle,
    badgeClass: "bg-red-500 text-white",
    rowClass: "border-l-2 border-red-500/40",
  },
};

const CONFIDENCE_CONFIG: Record<
  OverallConfidence,
  { label: string; badgeClass: string; description: string }
> = {
  high: {
    label: "High",
    badgeClass: "bg-emerald-500 text-white",
    description: "No critical weaknesses and at most 1 non-critical weakness.",
  },
  moderate: {
    label: "Moderate",
    badgeClass: "bg-blue-500 text-white",
    description: "No critical weaknesses but more than 1 non-critical weakness.",
  },
  low: {
    label: "Low",
    badgeClass: "bg-amber-500 text-white",
    description: "1 critical domain weakness.",
  },
  critically_low: {
    label: "Critically Low",
    badgeClass: "bg-red-500 text-white",
    description: "More than 1 critical domain weakness.",
  },
};

// ---------------------------------------------------------------------------
// Sub-component: Item Row
// ---------------------------------------------------------------------------

function ItemRow({ result }: { result: AMSTAR2ItemResult }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = RATING_CONFIG[result.rating];
  const Icon = cfg.icon;

  return (
    <div
      className={cn(
        "rounded-lg bg-surface-raised/40 mb-2 overflow-hidden",
        cfg.rowClass
      )}
    >
      <button
        className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-surface-raised/60 transition-colors"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        {/* Item number + critical star */}
        <div className="shrink-0 flex flex-col items-center gap-0.5 mt-0.5">
          <span className="text-[11px] font-bold text-ink-muted w-6 text-center">
            {result.item.itemNumber}
          </span>
          {result.item.isCritical && (
            <Star
              weight="fill"
              size={10}
              className="text-amber-400"
              aria-label="Critical domain"
            />
          )}
        </div>

        {/* Question text */}
        <span className="flex-1 text-sm text-ink leading-snug">
          {result.item.question}
        </span>

        {/* Rating badge */}
        <div className="shrink-0 flex items-center gap-2 ml-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold",
              cfg.badgeClass
            )}
          >
            <Icon weight="bold" size={11} />
            {cfg.label}
          </span>
          {expanded ? (
            <CaretDown size={13} className="text-ink-muted" />
          ) : (
            <CaretRight size={13} className="text-ink-muted" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-1 space-y-3 border-t border-border/30">
          {/* Domain tag */}
          <span className="inline-block text-[10px] font-medium text-ink-muted bg-surface-raised px-2 py-0.5 rounded-full">
            {result.item.domain}
            {result.item.isCritical && " · Critical domain"}
          </span>

          {/* Rationale */}
          <div>
            <p className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide mb-1">
              Rationale
            </p>
            <p className="text-sm text-ink leading-relaxed">
              {result.rationale}
            </p>
          </div>

          {/* Suggestion (only when not fully met) */}
          {result.rating !== "yes" && result.suggestion && (
            <div className="rounded-md bg-amber-500/10 border border-amber-500/20 px-3 py-2">
              <p className="text-[11px] font-semibold text-amber-400 uppercase tracking-wide mb-1">
                Suggestion
              </p>
              <p className="text-sm text-ink leading-relaxed">
                {result.suggestion}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Panel Component
// ---------------------------------------------------------------------------

export function AMSTAR2Panel({ projectId }: AMSTAR2PanelProps) {
  const [assessment, setAssessment] = useState<AMSTAR2Assessment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // -------------------------------------------------------------------------
  // Load stored assessment on mount
  // -------------------------------------------------------------------------

  const loadAssessment = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/systematic-review/amstar2?projectId=${projectId}`
      );
      if (res.status === 404) {
        // No assessment yet — that's fine
        setAssessment(null);
        return;
      }
      if (!res.ok) throw new Error("Failed to load AMSTAR 2 assessment");
      const data = await res.json();
      setAssessment(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load assessment"
      );
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadAssessment();
  }, [loadAssessment]);

  // -------------------------------------------------------------------------
  // Run new assessment
  // -------------------------------------------------------------------------

  const runAssessment = useCallback(async () => {
    setIsRunning(true);
    setError(null);
    try {
      const res = await fetch("/api/systematic-review/amstar2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "AMSTAR 2 assessment failed");
      }
      const data = await res.json();
      setAssessment(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Assessment failed");
    } finally {
      setIsRunning(false);
    }
  }, [projectId]);

  // -------------------------------------------------------------------------
  // Derived data
  // -------------------------------------------------------------------------

  const yesCount = assessment?.items.filter((i) => i.rating === "yes").length ?? 0;
  const partialCount =
    assessment?.items.filter((i) => i.rating === "partial_yes").length ?? 0;
  const noCount = assessment?.items.filter((i) => i.rating === "no").length ?? 0;
  const totalItems = 16;

  const confidenceCfg = assessment
    ? CONFIDENCE_CONFIG[assessment.overallConfidence]
    : null;

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <GlassPanel className="p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-lg font-semibold text-ink mb-1 flex items-center gap-2">
              <ClipboardText weight="duotone" className="text-brand" size={24} />
              AMSTAR 2 Self-Assessment
            </h2>
            <p className="text-sm text-ink-muted max-w-2xl">
              A MeaSurement Tool to Assess systematic Reviews — 16-item
              pre-submission quality checklist (Shea et al., BMJ 2017). Items
              marked with{" "}
              <Star weight="fill" size={11} className="text-amber-400 inline" />{" "}
              are{" "}
              <strong className="text-ink font-medium">critical domains</strong>{" "}
              that determine the overall confidence rating.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={loadAssessment}
              disabled={isLoading || isRunning}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-ink-muted",
                "hover:bg-surface-raised transition-colors",
                "disabled:opacity-50"
              )}
              title="Reload stored assessment"
            >
              <ArrowsClockwise
                className={cn(isLoading && "animate-spin")}
                size={16}
              />
              Refresh
            </button>

            <button
              onClick={runAssessment}
              disabled={isRunning || isLoading}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                "bg-brand text-white hover:bg-brand/90",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isRunning ? (
                <CircleNotch className="animate-spin" size={16} />
              ) : (
                <Lightning weight="fill" size={16} />
              )}
              {assessment ? "Re-run Self-Assessment" : "Run Self-Assessment"}
            </button>
          </div>
        </div>

        {/* Running status message */}
        {isRunning && (
          <div className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
            <CircleNotch className="animate-spin shrink-0" size={16} />
            <span>
              Analysing your project against all 16 AMSTAR 2 criteria — this
              may take 20–40 seconds&hellip;
            </span>
          </div>
        )}
      </GlassPanel>

      {/* Error */}
      {error && (
        <GlassPanel className="p-4 border-red-500/30">
          <div className="flex items-start gap-2">
            <Warning
              weight="fill"
              className="text-red-500 shrink-0 mt-0.5"
              size={18}
            />
            <div>
              <p className="text-sm text-red-400">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-xs text-ink-muted hover:text-ink mt-1"
              >
                Dismiss
              </button>
            </div>
          </div>
        </GlassPanel>
      )}

      {/* Loading skeleton */}
      {isLoading && !assessment && (
        <GlassPanel className="p-8">
          <div className="flex flex-col items-center justify-center gap-3 text-ink-muted">
            <CircleNotch className="animate-spin" size={28} />
            <p className="text-sm">Loading assessment&hellip;</p>
          </div>
        </GlassPanel>
      )}

      {/* Empty state */}
      {!isLoading && !isRunning && !assessment && (
        <GlassPanel className="p-8">
          <div className="flex flex-col items-center justify-center gap-3 text-ink-muted">
            <ClipboardText weight="duotone" size={40} className="opacity-40" />
            <p className="text-sm">No AMSTAR 2 assessment yet.</p>
            <p className="text-xs text-ink-muted/70 text-center max-w-sm">
              Click &ldquo;Run Self-Assessment&rdquo; above to have the AI
              evaluate your project against all 16 AMSTAR 2 criteria before
              journal submission.
            </p>
          </div>
        </GlassPanel>
      )}

      {/* Results */}
      {assessment && (
        <>
          {/* Overall confidence + summary stats */}
          <GlassPanel className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              {/* Confidence badge */}
              <div className="flex flex-col items-start gap-1">
                <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
                  Overall Confidence
                </span>
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-bold",
                    confidenceCfg?.badgeClass
                  )}
                >
                  {confidenceCfg?.label}
                </span>
                <p className="text-xs text-ink-muted mt-0.5 max-w-xs">
                  {confidenceCfg?.description}
                </p>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-16 bg-border" />

              {/* Item score breakdown */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-500">
                    {yesCount}
                  </div>
                  <div className="text-xs text-ink-muted">Yes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-500">
                    {partialCount}
                  </div>
                  <div className="text-xs text-ink-muted">Partial</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">
                    {noCount}
                  </div>
                  <div className="text-xs text-ink-muted">No</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-ink">
                    {yesCount + partialCount}/{totalItems}
                  </div>
                  <div className="text-xs text-ink-muted">Met</div>
                </div>
              </div>

              {/* Divider */}
              {assessment.criticalWeaknesses.length > 0 && (
                <div className="hidden sm:block w-px h-16 bg-border" />
              )}

              {/* Critical weaknesses summary */}
              {assessment.criticalWeaknesses.length > 0 && (
                <div>
                  <span className="text-xs font-semibold text-red-400 uppercase tracking-wide">
                    Critical Weaknesses
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {assessment.criticalWeaknesses.map((n) => (
                      <span
                        key={n}
                        className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-red-500/15 border border-red-500/30 text-xs font-medium text-red-400"
                      >
                        <Star weight="fill" size={9} />
                        Item {n}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Assessed at */}
            <p className="mt-4 text-[11px] text-ink-muted/60">
              Assessed{" "}
              {new Date(assessment.assessedAt).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </GlassPanel>

          {/* Critical weaknesses remediation list */}
          {assessment.criticalWeaknesses.length > 0 && (
            <GlassPanel className="p-5 border-red-500/20">
              <h3 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
                <Warning weight="fill" size={16} />
                Critical Weaknesses — Action Required
              </h3>
              <p className="text-xs text-ink-muted mb-4">
                The following critical domains were rated &ldquo;No&rdquo;.
                Addressing these is essential before submission, as they
                determine the overall confidence rating.
              </p>
              <div className="space-y-3">
                {assessment.criticalWeaknesses.map((itemNum) => {
                  const result = assessment.items.find(
                    (r) => r.item.itemNumber === itemNum
                  );
                  if (!result) return null;
                  return (
                    <div
                      key={itemNum}
                      className="rounded-md border border-red-500/20 bg-red-500/5 px-4 py-3"
                    >
                      <div className="flex items-start gap-2">
                        <span className="shrink-0 inline-flex items-center gap-0.5 mt-0.5 px-1.5 py-0.5 rounded bg-red-500/20 text-[10px] font-bold text-red-400">
                          <Star weight="fill" size={9} />
                          {itemNum}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-ink">
                            {result.item.domain}
                          </p>
                          <p className="text-xs text-ink-muted mt-0.5">
                            {result.item.question}
                          </p>
                          {result.suggestion && (
                            <p className="text-xs text-amber-400 mt-2 leading-relaxed">
                              <strong>Fix:</strong> {result.suggestion}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassPanel>
          )}

          {/* Full 16-item checklist */}
          <GlassPanel className="p-6">
            <h3 className="text-sm font-semibold text-ink mb-1 flex items-center gap-2">
              <ClipboardText weight="duotone" size={18} className="text-brand" />
              All 16 AMSTAR 2 Items
            </h3>
            <p className="text-xs text-ink-muted mb-4">
              Click any item to expand its rationale and improvement
              suggestions. Items with{" "}
              <Star weight="fill" size={10} className="text-amber-400 inline" />{" "}
              are critical domains.
            </p>

            {/* Legend */}
            <div className="flex items-center gap-4 mb-4">
              {(["yes", "partial_yes", "no"] as AMSTAR2Rating[]).map((r) => {
                const cfg = RATING_CONFIG[r];
                const Icon = cfg.icon;
                return (
                  <span
                    key={r}
                    className="inline-flex items-center gap-1.5 text-xs text-ink-muted"
                  >
                    <span
                      className={cn(
                        "inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[11px] font-semibold",
                        cfg.badgeClass
                      )}
                    >
                      <Icon weight="bold" size={11} />
                      {cfg.label}
                    </span>
                  </span>
                );
              })}
            </div>

            <div>
              {assessment.items.map((result) => (
                <ItemRow key={result.item.itemNumber} result={result} />
              ))}
            </div>
          </GlassPanel>
        </>
      )}
    </div>
  );
}
