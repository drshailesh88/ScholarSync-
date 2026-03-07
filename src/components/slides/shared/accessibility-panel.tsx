"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ArrowRight,
  CaretDown,
  CaretRight,
  CheckCircle,
  Info,
  Warning,
  XCircle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useSlidesStore } from "@/stores/slides-store";
import {
  checkAccessibility,
  calculateAccessibilityScore,
  type A11yIssue,
} from "@/lib/presentation/accessibility-checker";
import { suggestAccessibleColor } from "@/lib/presentation/color-contrast";

// ---------------------------------------------------------------------------
// Severity helpers
// ---------------------------------------------------------------------------

const SEVERITY_ORDER: A11yIssue["severity"][] = ["error", "warning", "info"];

const SEVERITY_META: Record<
  A11yIssue["severity"],
  { label: string; icon: typeof XCircle; color: string; bg: string }
> = {
  error: {
    label: "Errors",
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  warning: {
    label: "Warnings",
    icon: Warning,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  info: {
    label: "Info",
    icon: Info,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
};

// ---------------------------------------------------------------------------
// Score ring
// ---------------------------------------------------------------------------

function ScoreRing({ score }: { score: number }) {
  const r = 28;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 80 ? "text-green-500" : score >= 50 ? "text-yellow-500" : "text-red-500";

  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 64 64">
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          strokeWidth="5"
          className="stroke-border"
        />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`stroke-current ${color}`}
        />
      </svg>
      <span className={cn("absolute text-lg font-bold", color)}>{score}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Issue card
// ---------------------------------------------------------------------------

function IssueCard({
  issue,
  slideTitle,
  onNavigate,
  onFix,
}: {
  issue: A11yIssue;
  slideTitle: string;
  onNavigate: () => void;
  onFix?: () => void;
}) {
  const meta = SEVERITY_META[issue.severity];
  const Icon = meta.icon;

  return (
    <div className="rounded-lg border border-border bg-surface p-2.5 space-y-1.5">
      <div className="flex items-start gap-2">
        <Icon size={14} weight="fill" className={cn("mt-0.5 shrink-0", meta.color)} />
        <div className="flex-1 min-w-0">
          <button
            onClick={onNavigate}
            className="text-[11px] font-medium text-brand hover:underline truncate block max-w-full text-left"
          >
            Slide {issue.slideIndex + 1}: {slideTitle || "(untitled)"}
          </button>
          <p className="text-xs text-ink mt-0.5">{issue.message}</p>
          <p className="text-[11px] text-ink-muted mt-0.5">{issue.suggestion}</p>
        </div>
      </div>
      {onFix && (
        <button
          onClick={onFix}
          className="flex items-center gap-1 text-[11px] font-medium text-brand hover:text-brand/80 transition-colors"
        >
          <ArrowRight size={10} />
          Fix
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Severity section
// ---------------------------------------------------------------------------

function SeveritySection({
  severity,
  issues,
  slides,
  onNavigate,
  onFix,
}: {
  severity: A11yIssue["severity"];
  issues: A11yIssue[];
  slides: { id: number; title: string }[];
  onNavigate: (slideId: number) => void;
  onFix: (issue: A11yIssue) => void;
}) {
  const [open, setOpen] = useState(severity === "error");
  const meta = SEVERITY_META[severity];
  const Icon = meta.icon;

  if (issues.length === 0) return null;

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full px-1 py-1 text-xs font-medium hover:bg-surface-raised rounded-md transition-colors"
      >
        {open ? <CaretDown size={12} /> : <CaretRight size={12} />}
        <Icon size={12} weight="fill" className={meta.color} />
        <span>
          {meta.label} ({issues.length})
        </span>
      </button>
      {open && (
        <div className="space-y-1.5 mt-1 ml-1">
          {issues.map((issue, i) => {
            const slide = slides.find((s) => s.id === issue.slideId);
            const canAutoFix = [
              "missing-alt-text",
              "missing-slide-title",
              "low-contrast-text",
              "low-contrast-primary",
              "empty-slide",
            ].includes(issue.ruleId);

            return (
              <IssueCard
                key={`${issue.ruleId}-${issue.slideId}-${issue.blockIndex ?? "s"}-${i}`}
                issue={issue}
                slideTitle={slide?.title ?? ""}
                onNavigate={() => onNavigate(issue.slideId)}
                onFix={canAutoFix ? () => onFix(issue) : undefined}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main panel
// ---------------------------------------------------------------------------

export function AccessibilityPanel() {
  const slides = useSlidesStore((s) => s.slides);
  const themeConfig = useSlidesStore((s) => s.themeConfig);
  const setActiveSlide = useSlidesStore((s) => s.setActiveSlide);
  const setRightPanel = useSlidesStore((s) => s.setRightPanel);
  const updateSlide = useSlidesStore((s) => s.updateSlide);
  const setTheme = useSlidesStore((s) => s.setTheme);
  const themeKey = useSlidesStore((s) => s.themeKey);
  const selectBlock = useSlidesStore((s) => s.selectBlock);

  const [runId, setRunId] = useState(0);

  const issues = useMemo(
    () => checkAccessibility(slides, themeConfig),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [slides, themeConfig, runId],
  );

  const score = useMemo(() => calculateAccessibilityScore(issues), [issues]);

  const grouped = useMemo(() => {
    const map: Record<A11yIssue["severity"], A11yIssue[]> = {
      error: [],
      warning: [],
      info: [],
    };
    for (const issue of issues) {
      map[issue.severity].push(issue);
    }
    return map;
  }, [issues]);

  const slideMeta = useMemo(
    () => slides.map((s) => ({ id: s.id, title: s.title })),
    [slides],
  );

  const handleNavigate = useCallback(
    (slideId: number) => {
      setActiveSlide(slideId);
    },
    [setActiveSlide],
  );

  const handleFix = useCallback(
    (issue: A11yIssue) => {
      switch (issue.ruleId) {
        case "missing-alt-text": {
          setActiveSlide(issue.slideId);
          if (issue.blockIndex !== undefined) {
            selectBlock(issue.blockIndex);
          }
          setRightPanel("properties");
          break;
        }
        case "missing-slide-title": {
          setActiveSlide(issue.slideId);
          break;
        }
        case "low-contrast-text": {
          const newTextColor = suggestAccessibleColor(
            themeConfig.textColor,
            themeConfig.backgroundColor,
          );
          setTheme(themeKey, { ...themeConfig, textColor: newTextColor });
          break;
        }
        case "low-contrast-primary": {
          const newPrimaryColor = suggestAccessibleColor(
            themeConfig.primaryColor,
            themeConfig.backgroundColor,
          );
          setTheme(themeKey, { ...themeConfig, primaryColor: newPrimaryColor });
          break;
        }
        case "empty-slide": {
          const slide = slides.find((s) => s.id === issue.slideId);
          if (slide) {
            // Add a default text block
            updateSlide(slide.id, {
              contentBlocks: [
                { type: "text", data: { text: "Click to add content", style: "body" } },
              ],
            });
          }
          break;
        }
      }
    },
    [
      setActiveSlide,
      selectBlock,
      setRightPanel,
      themeConfig,
      themeKey,
      setTheme,
      slides,
      updateSlide,
    ],
  );

  return (
    <aside className="w-80 shrink-0 border-l border-border bg-surface flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-ink">Accessibility</h3>
          <button
            onClick={() => setRunId((n) => n + 1)}
            className="text-[11px] font-medium text-brand hover:text-brand/80 transition-colors px-2 py-1 rounded-md hover:bg-brand/5"
          >
            Re-check
          </button>
        </div>

        {/* Score + summary */}
        <div className="flex items-center gap-4">
          <ScoreRing score={score} />
          <div className="space-y-1 text-xs">
            {SEVERITY_ORDER.map((sev) => {
              const meta = SEVERITY_META[sev];
              const count = grouped[sev].length;
              const Icon = meta.icon;
              return (
                <div key={sev} className="flex items-center gap-1.5">
                  <Icon size={12} weight="fill" className={meta.color} />
                  <span className="text-ink-muted">
                    {count} {meta.label.toLowerCase()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {issues.length === 0 && (
          <div className="flex items-center gap-2 text-xs text-green-600">
            <CheckCircle size={14} weight="fill" />
            No accessibility issues found!
          </div>
        )}
      </div>

      {/* Issues list */}
      <div className="p-3 space-y-3 flex-1">
        {SEVERITY_ORDER.map((sev) => (
          <SeveritySection
            key={sev}
            severity={sev}
            issues={grouped[sev]}
            slides={slideMeta}
            onNavigate={handleNavigate}
            onFix={handleFix}
          />
        ))}
      </div>
    </aside>
  );
}
