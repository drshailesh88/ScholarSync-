"use client";

import { useState, useCallback } from "react";
import {
  MagnifyingGlass,
  CaretDown,
  CaretRight,
  CircleNotch,
  CheckCircle,
  Warning,
  Lightning,
  Seal,
  ArrowsClockwise,
  ListChecks,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import {
  PRESS_ELEMENTS,
  PRESS_ASSESSMENT_LABELS,
  PRESS_OVERALL_LABELS,
  type PRESSElement,
  type PRESSValidation,
} from "@/lib/systematic-review/press-validation";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PRESSChecklistPanelProps {
  projectId: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ASSESSMENT_COLORS: Record<PRESSElement["assessment"], string> = {
  no_revision: "bg-emerald-500 text-white",
  minor_revision: "bg-amber-500 text-white",
  major_revision: "bg-red-500 text-white",
};

const ASSESSMENT_BORDER: Record<PRESSElement["assessment"], string> = {
  no_revision: "border-emerald-500/30",
  minor_revision: "border-amber-500/30",
  major_revision: "border-red-500/30",
};

const ASSESSMENT_DOT: Record<PRESSElement["assessment"], string> = {
  no_revision: "bg-emerald-500",
  minor_revision: "bg-amber-500",
  major_revision: "bg-red-500",
};

const OVERALL_COLORS: Record<PRESSValidation["overallAssessment"], string> = {
  approved: "bg-emerald-500 text-white",
  minor_revisions: "bg-amber-500 text-white",
  major_revisions: "bg-red-500 text-white",
};

const OVERALL_BORDER: Record<PRESSValidation["overallAssessment"], string> = {
  approved: "border-emerald-500/40",
  minor_revisions: "border-amber-500/40",
  major_revisions: "border-red-500/40",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PRESSChecklistPanel({ projectId }: PRESSChecklistPanelProps) {
  const [validation, setValidation] = useState<PRESSValidation | null>(null);
  const [expandedElement, setExpandedElement] = useState<number | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // -------------------------------------------------------------------------
  // Validate search strategy
  // -------------------------------------------------------------------------

  const runValidation = useCallback(async () => {
    setIsValidating(true);
    setError(null);

    try {
      const res = await fetch("/api/systematic-review/press", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "PRESS validation failed");
      }

      const data: PRESSValidation = await res.json();
      setValidation(data);
      // Expand any elements with revisions required by default
      const firstIssue = data.elements.find(
        (e) => e.assessment !== "no_revision"
      );
      if (firstIssue) setExpandedElement(firstIssue.element);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Validation failed");
    } finally {
      setIsValidating(false);
    }
  }, [projectId]);

  const resetValidation = useCallback(() => {
    setValidation(null);
    setExpandedElement(null);
    setError(null);
  }, []);

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  const assessmentCount = validation
    ? {
        no_revision: validation.elements.filter(
          (e) => e.assessment === "no_revision"
        ).length,
        minor_revision: validation.elements.filter(
          (e) => e.assessment === "minor_revision"
        ).length,
        major_revision: validation.elements.filter(
          (e) => e.assessment === "major_revision"
        ).length,
      }
    : null;

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <GlassPanel className="p-6">
        <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <ListChecks weight="duotone" className="text-brand" size={24} />
          PRESS 2015 Search Strategy Peer Review
        </h2>
        <p className="text-sm text-ink-muted mb-5">
          The PRESS 2015 checklist provides a validated framework for peer
          reviewing electronic search strategies used in systematic reviews. It
          evaluates 6 elements: research question translation, Boolean
          operators, subject headings, text word searching, spelling/syntax, and
          limits/filters.
        </p>

        {/* PRESS Elements Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
          {PRESS_ELEMENTS.map((el) => (
            <div
              key={el.element}
              className="flex items-start gap-2 p-2 bg-surface-raised rounded border border-border"
            >
              <span className="shrink-0 w-5 h-5 rounded-full bg-brand/10 text-brand text-xs font-bold flex items-center justify-center mt-0.5">
                {el.element}
              </span>
              <span className="text-xs text-ink leading-snug">{el.name}</span>
            </div>
          ))}
        </div>

        {/* Assessment Legend */}
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <span className="text-xs text-ink-muted">Assessment key:</span>
          {(
            [
              "no_revision",
              "minor_revision",
              "major_revision",
            ] as PRESSElement["assessment"][]
          ).map((level) => (
            <span key={level} className="inline-flex items-center gap-1.5">
              <span
                className={cn(
                  "w-2.5 h-2.5 rounded-full",
                  ASSESSMENT_DOT[level]
                )}
              />
              <span className="text-xs text-ink-muted">
                {PRESS_ASSESSMENT_LABELS[level]}
              </span>
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={runValidation}
            disabled={isValidating}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
              "bg-brand text-white hover:bg-brand/90",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isValidating ? (
              <CircleNotch className="animate-spin" size={16} />
            ) : (
              <Lightning weight="fill" size={16} />
            )}
            {isValidating ? "Validating..." : "Validate Search Strategy"}
          </button>

          {validation && (
            <button
              onClick={resetValidation}
              disabled={isValidating}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-ink-muted",
                "hover:bg-surface-raised transition-colors",
                "disabled:opacity-50"
              )}
            >
              <ArrowsClockwise size={16} />
              Re-validate
            </button>
          )}
        </div>
      </GlassPanel>

      {/* Error State */}
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

      {/* Loading State */}
      {isValidating && (
        <GlassPanel className="p-10">
          <div className="flex flex-col items-center justify-center gap-3 text-ink-muted">
            <CircleNotch className="animate-spin text-brand" size={32} />
            <p className="text-sm font-medium text-ink">
              Running PRESS peer review...
            </p>
            <p className="text-xs text-ink-muted/70 text-center max-w-xs">
              The AI is evaluating your search strategy against all 6 PRESS 2015
              elements. This may take up to 30 seconds.
            </p>
          </div>
        </GlassPanel>
      )}

      {/* Empty State */}
      {!isValidating && !validation && !error && (
        <GlassPanel className="p-10">
          <div className="flex flex-col items-center justify-center gap-3 text-ink-muted">
            <MagnifyingGlass
              weight="duotone"
              size={44}
              className="opacity-40"
            />
            <p className="text-sm font-medium">
              No validation run yet
            </p>
            <p className="text-xs text-ink-muted/70 text-center max-w-xs">
              Click &quot;Validate Search Strategy&quot; to run an AI-powered PRESS 2015
              peer review on this project&apos;s search strategy.
            </p>
          </div>
        </GlassPanel>
      )}

      {/* Results */}
      {!isValidating && validation && (
        <>
          {/* Overall Assessment Banner */}
          <GlassPanel
            className={cn(
              "p-5 border",
              OVERALL_BORDER[validation.overallAssessment]
            )}
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 mt-0.5">
                {validation.overallAssessment === "approved" ? (
                  <CheckCircle
                    weight="duotone"
                    className="text-emerald-500"
                    size={28}
                  />
                ) : validation.overallAssessment === "minor_revisions" ? (
                  <Warning
                    weight="duotone"
                    className="text-amber-500"
                    size={28}
                  />
                ) : (
                  <Warning
                    weight="duotone"
                    className="text-red-500"
                    size={28}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="text-sm font-semibold text-ink">
                    Overall Assessment
                  </span>
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded text-xs font-bold",
                      OVERALL_COLORS[validation.overallAssessment]
                    )}
                  >
                    {PRESS_OVERALL_LABELS[validation.overallAssessment]}
                  </span>
                  {assessmentCount && (
                    <div className="flex items-center gap-2 ml-auto">
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        {assessmentCount.no_revision}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        {assessmentCount.minor_revision}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        {assessmentCount.major_revision}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {validation.summary}
                </p>
                <p className="text-xs text-ink-muted/60 mt-2">
                  Assessed{" "}
                  <Seal
                    weight="fill"
                    className="inline text-brand/60"
                    size={11}
                  />{" "}
                  {formatDate(validation.assessedAt)}
                </p>
              </div>
            </div>
          </GlassPanel>

          {/* PRESS Element Cards */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-ink px-1">
              Element-by-Element Review
            </h3>

            {validation.elements.map((el) => {
              const isExpanded = expandedElement === el.element;
              const meta = PRESS_ELEMENTS.find((m) => m.element === el.element);

              return (
                <GlassPanel
                  key={el.element}
                  className={cn(
                    "border overflow-hidden transition-colors",
                    ASSESSMENT_BORDER[el.assessment]
                  )}
                >
                  {/* Element header — always visible */}
                  <button
                    onClick={() =>
                      setExpandedElement(isExpanded ? null : el.element)
                    }
                    className="w-full text-left p-4 flex items-start gap-3 hover:bg-surface-raised/30 transition-colors"
                  >
                    {/* Element number badge */}
                    <span
                      className={cn(
                        "shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center mt-0.5",
                        ASSESSMENT_COLORS[el.assessment]
                      )}
                    >
                      {el.element}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-ink">
                          {el.name}
                        </span>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold",
                            ASSESSMENT_COLORS[el.assessment]
                          )}
                        >
                          {PRESS_ASSESSMENT_LABELS[el.assessment]}
                        </span>
                        {el.suggestions.length > 0 && (
                          <span className="text-[10px] text-ink-muted ml-auto">
                            {el.suggestions.length} suggestion
                            {el.suggestions.length !== 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                      {!isExpanded && (
                        <p className="text-xs text-ink-muted mt-1 line-clamp-1">
                          {el.feedback}
                        </p>
                      )}
                    </div>

                    <span className="shrink-0 text-ink-muted mt-1">
                      {isExpanded ? (
                        <CaretDown size={14} />
                      ) : (
                        <CaretRight size={14} />
                      )}
                    </span>
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-border/30 pt-3 space-y-4">
                      {/* Description of what this element checks */}
                      <div>
                        <p className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide mb-1">
                          What this element checks
                        </p>
                        <p className="text-xs text-ink-muted leading-relaxed">
                          {meta?.description}
                        </p>
                      </div>

                      {/* AI Feedback */}
                      <div>
                        <p className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide mb-1">
                          Reviewer Feedback
                        </p>
                        <p className="text-sm text-ink leading-relaxed">
                          {el.feedback}
                        </p>
                      </div>

                      {/* Suggestions */}
                      {el.suggestions.length > 0 && (
                        <div>
                          <p className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide mb-2">
                            Suggested Improvements
                          </p>
                          <ul className="space-y-1.5">
                            {el.suggestions.map((suggestion, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-sm text-ink"
                              >
                                <span
                                  className={cn(
                                    "shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full",
                                    ASSESSMENT_DOT[el.assessment]
                                  )}
                                />
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {el.assessment === "no_revision" && (
                        <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                          <CheckCircle weight="fill" size={14} />
                          This element meets PRESS 2015 standards. No changes
                          required.
                        </div>
                      )}
                    </div>
                  )}
                </GlassPanel>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
