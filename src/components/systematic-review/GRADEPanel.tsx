"use client";

import { useState, useEffect, useCallback, Fragment, useMemo } from "react";
import {
  Certificate,
  CaretDown,
  CaretRight,
  CircleNotch,
  CheckCircle,
  Warning,
  Lightning,
  ArrowsClockwise,
  DownloadSimple,
  Table,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface GRADEPanelProps {
  projectId: number;
}

type GRADEDomainRating = "no_concern" | "serious" | "very_serious";
type GRADEOverallCertainty = "high" | "moderate" | "low" | "very_low";

interface GRADEDomainResult {
  domain: string;
  rating: GRADEDomainRating;
  rationale: string;
  downgradeBy: number;
}

interface GRADEAssessmentResult {
  outcome: string;
  analysisId: number | null;
  domains: GRADEDomainResult[];
  overallCertainty: GRADEOverallCertainty;
  overallRationale: string;
  effectEstimate: string | null;
  numberOfStudies: number;
  totalParticipants: number | null;
  assessedAt: string;
}

interface MetaAnalysisRecord {
  id: number;
  analysisName: string | null;
  outcomeMeasure: string | null;
  effectModel: string | null;
  pooledEffect: number | null;
  pooledCiLower: number | null;
  pooledCiUpper: number | null;
  heterogeneityI2: number | null;
}

interface DraftGRADEDomain {
  rating: GRADEDomainRating;
  rationale: string;
}

type DraftGRADEProfile = Record<(typeof GRADE_DOMAINS)[number], DraftGRADEDomain>;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const GRADE_DOMAIN_LABELS: Record<string, string> = {
  risk_of_bias: "Risk of Bias",
  inconsistency: "Inconsistency",
  indirectness: "Indirectness",
  imprecision: "Imprecision",
  publication_bias: "Publication Bias",
};

const GRADE_DOMAINS = [
  "risk_of_bias",
  "inconsistency",
  "indirectness",
  "imprecision",
  "publication_bias",
] as const;

const RATING_COLORS: Record<string, string> = {
  no_concern: "bg-emerald-500 text-white",
  serious: "bg-amber-500 text-white",
  very_serious: "bg-red-500 text-white",
};

const RATING_LABELS: Record<string, string> = {
  no_concern: "Not serious",
  serious: "Serious",
  very_serious: "Very serious",
};

const CERTAINTY_COLORS: Record<string, string> = {
  high: "bg-emerald-500 text-white",
  moderate: "bg-blue-500 text-white",
  low: "bg-amber-500 text-white",
  very_low: "bg-red-500 text-white",
};

const CERTAINTY_LABELS: Record<string, string> = {
  high: "High",
  moderate: "Moderate",
  low: "Low",
  very_low: "Very Low",
};

function ratingSymbol(rating: string): string {
  if (rating === "no_concern") return "\u2713";
  if (rating === "serious") return "\u2193";
  return "\u2193\u2193";
}

function createEmptyDraftProfile(): DraftGRADEProfile {
  return GRADE_DOMAINS.reduce((acc, domain) => {
    acc[domain] = {
      rating: "no_concern",
      rationale: "",
    };
    return acc;
  }, {} as DraftGRADEProfile);
}

function buildDraftProfile(
  assessment?: GRADEAssessmentResult | null
): DraftGRADEProfile {
  const draft = createEmptyDraftProfile();

  assessment?.domains.forEach((domain) => {
    if (domain.domain in draft) {
      draft[domain.domain as keyof DraftGRADEProfile] = {
        rating: domain.rating,
        rationale: domain.rationale,
      };
    }
  });

  return draft;
}

function computeDowngradeBy(rating: GRADEDomainRating): number {
  if (rating === "serious") return 1;
  if (rating === "very_serious") return 2;
  return 0;
}

function computeOverallCertainty(
  domains: Pick<GRADEDomainResult, "rating">[]
): GRADEOverallCertainty {
  const downgrades = domains.reduce(
    (total, domain) => total + computeDowngradeBy(domain.rating),
    0
  );

  if (downgrades <= 0) return "high";
  if (downgrades === 1) return "moderate";
  if (downgrades === 2) return "low";
  return "very_low";
}

function summarizeDraftRationale(profile: DraftGRADEProfile): string {
  const flaggedDomains = GRADE_DOMAINS.filter(
    (domain) => profile[domain].rating !== "no_concern"
  );

  if (flaggedDomains.length === 0) {
    return "No serious concerns identified across the five GRADE domains.";
  }

  return flaggedDomains
    .map((domain) => {
      const details = profile[domain];
      const domainLabel = GRADE_DOMAIN_LABELS[domain];
      const severity = RATING_LABELS[details.rating].toLowerCase();
      const rationale = details.rationale.trim();
      return rationale
        ? `${domainLabel}: ${severity} concern. ${rationale}`
        : `${domainLabel}: ${severity} concern.`;
    })
    .join(" ");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function GRADEPanel({ projectId }: GRADEPanelProps) {
  const [assessments, setAssessments] = useState<GRADEAssessmentResult[]>([]);
  const [metaAnalyses, setMetaAnalyses] = useState<MetaAnalysisRecord[]>([]);
  const [selectedOutcome, setSelectedOutcome] = useState("");
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<number | null>(
    null
  );
  const [draftProfile, setDraftProfile] = useState<DraftGRADEProfile>(
    createEmptyDraftProfile
  );
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const [isLoadingAssessments, setIsLoadingAssessments] = useState(false);
  const [isLoadingMeta, setIsLoadingMeta] = useState(false);
  const [isAssessing, setIsAssessing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // -------------------------------------------------------------------------
  // Data loading
  // -------------------------------------------------------------------------

  const loadAssessments = useCallback(async () => {
    setIsLoadingAssessments(true);
    try {
      const res = await fetch(
        `/api/systematic-review/grade?projectId=${projectId}`
      );
      if (!res.ok) throw new Error("Failed to load GRADE assessments");
      const data = await res.json();
      setAssessments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load assessments"
      );
    } finally {
      setIsLoadingAssessments(false);
    }
  }, [projectId]);

  const loadMetaAnalyses = useCallback(async () => {
    setIsLoadingMeta(true);
    try {
      const res = await fetch(
        `/api/systematic-review/meta-analysis?projectId=${projectId}`
      );
      if (!res.ok) throw new Error("Failed to load meta-analysis results");
      const data = await res.json();
      const results: MetaAnalysisRecord[] = Array.isArray(data)
        ? data
        : data.results ?? [];
      setMetaAnalyses(results);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load meta-analyses"
      );
    } finally {
      setIsLoadingMeta(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadAssessments();
    loadMetaAnalyses();
  }, [loadAssessments, loadMetaAnalyses]);

  // -------------------------------------------------------------------------
  // Actions
  // -------------------------------------------------------------------------

  const runAssessment = useCallback(async () => {
    if (!selectedOutcome.trim()) {
      setError("Please enter or select an outcome to assess.");
      return;
    }

    setIsAssessing(true);
    setError(null);

    try {
      const res = await fetch("/api/systematic-review/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          outcome: selectedOutcome.trim(),
          ...(selectedAnalysisId ? { analysisId: selectedAnalysisId } : {}),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "GRADE assessment failed");
      }

      await loadAssessments();
      setSelectedOutcome("");
      setSelectedAnalysisId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Assessment failed");
    } finally {
      setIsAssessing(false);
    }
  }, [projectId, selectedOutcome, selectedAnalysisId, loadAssessments]);

  const exportCSV = useCallback(async () => {
    setIsExporting(true);
    try {
      const res = await fetch(
        `/api/systematic-review/grade?projectId=${projectId}&format=csv`
      );
      if (!res.ok) throw new Error("Export failed");
      const csv = await res.text();

      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `grade-summary-${projectId}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed");
    } finally {
      setIsExporting(false);
    }
  }, [projectId]);

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------

  const isLoading = isLoadingAssessments || isLoadingMeta;

  // Build outcome options from meta-analyses
  const outcomeOptions = metaAnalyses
    .filter((ma) => ma.outcomeMeasure || ma.analysisName)
    .map((ma) => ({
      id: ma.id,
      label: ma.outcomeMeasure || ma.analysisName || `Analysis #${ma.id}`,
    }));

  const alreadyAssessedOutcomes = new Set(
    assessments.map((a) => a.outcome.toLowerCase())
  );

  const selectedExistingAssessment = useMemo(
    () =>
      assessments.find(
        (assessment) =>
          assessment.outcome.toLowerCase() === selectedOutcome.trim().toLowerCase()
      ) ?? null,
    [assessments, selectedOutcome]
  );

  useEffect(() => {
    setDraftProfile(buildDraftProfile(selectedExistingAssessment));
  }, [selectedExistingAssessment]);

  const draftCertainty = useMemo(
    () =>
      computeOverallCertainty(
        GRADE_DOMAINS.map((domain) => ({
          rating: draftProfile[domain].rating,
        }))
      ),
    [draftProfile]
  );

  const draftRationale = useMemo(
    () => summarizeDraftRationale(draftProfile),
    [draftProfile]
  );

  const handleDraftRatingChange = useCallback(
    (domain: (typeof GRADE_DOMAINS)[number], rating: GRADEDomainRating) => {
      setDraftProfile((current) => ({
        ...current,
        [domain]: {
          ...current[domain],
          rating,
        },
      }));
    },
    []
  );

  const handleDraftRationaleChange = useCallback(
    (domain: (typeof GRADE_DOMAINS)[number], rationale: string) => {
      setDraftProfile((current) => ({
        ...current,
        [domain]: {
          ...current[domain],
          rationale,
        },
      }));
    },
    []
  );

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="space-y-6 sr-content max-w-5xl">
      {/* Header */}
      <GlassPanel className="sr-panel">
        <h2 className="sr-panel-title">
          <Certificate weight="duotone" className="text-brand" size={24} />
          GRADE Certainty of Evidence
        </h2>
        <p className="text-sm text-ink-muted mb-4">
          The GRADE framework rates the certainty of evidence across 5 domains:
          risk of bias, inconsistency, indirectness, imprecision, and
          publication bias. Evidence starts at High for RCTs and is downgraded
          based on domain concerns.
        </p>

        {/* GRADE Domains Legend */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {GRADE_DOMAINS.map((domain) => (
            <div
              key={domain}
              className="text-center p-2 bg-surface-raised rounded border border-border"
            >
              <div className="text-xs font-medium text-ink">
                {GRADE_DOMAIN_LABELS[domain]}
              </div>
            </div>
          ))}
        </div>

        {/* Certainty Legend */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs text-ink-muted">Certainty levels:</span>
          {(
            ["high", "moderate", "low", "very_low"] as const
          ).map((level) => (
            <span
              key={level}
              className="inline-flex items-center gap-1.5 text-xs"
            >
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded text-[10px] font-bold",
                  CERTAINTY_COLORS[level]
                )}
              >
                {CERTAINTY_LABELS[level]}
              </span>
            </span>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.95fr)]">
          <div className="space-y-4">
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.9fr)]">
              {outcomeOptions.length > 0 ? (
                <label className="space-y-1.5">
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
                    Meta-analysis outcome
                  </span>
                  <select
                    aria-label="Select outcome"
                    value={selectedAnalysisId ?? ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val) {
                        const id = Number(val);
                        setSelectedAnalysisId(id);
                        const opt = outcomeOptions.find((o) => o.id === id);
                        if (opt) setSelectedOutcome(opt.label);
                      } else {
                        setSelectedAnalysisId(null);
                        setSelectedOutcome("");
                      }
                    }}
                    disabled={isLoading || isAssessing}
                    className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-ink disabled:opacity-50"
                  >
                    <option value="">Select an outcome...</option>
                    {outcomeOptions.map((opt) => {
                      const assessed = alreadyAssessedOutcomes.has(
                        opt.label.toLowerCase()
                      );
                      return (
                        <option key={opt.id} value={opt.id}>
                          {assessed ? "[Done] " : ""}
                          {opt.label}
                        </option>
                      );
                    })}
                  </select>
                </label>
              ) : null}

              <label className="space-y-1.5">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
                  Outcome label
                </span>
                <input
                  aria-label="Outcome label"
                  type="text"
                  value={selectedOutcome}
                  onChange={(e) => {
                    setSelectedOutcome(e.target.value);
                    setSelectedAnalysisId(null);
                  }}
                  placeholder="Enter an outcome name..."
                  disabled={isLoading || isAssessing}
                  className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-muted/50 disabled:opacity-50"
                />
              </label>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-border/70 bg-surface shadow-[0_18px_50px_rgba(95,76,56,0.06)]">
              <div className="flex items-center justify-between border-b border-border/70 bg-warm-muted/45 px-5 py-4">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <Table size={18} className="text-brand" />
                    Evidence profile
                  </h3>
                  <p className="mt-1 text-xs text-ink-muted">
                    Rate each GRADE domain and capture supporting text before
                    running the assessment.
                  </p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]",
                    CERTAINTY_COLORS[draftCertainty]
                  )}
                >
                  {CERTAINTY_LABELS[draftCertainty]}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-surface-raised/55">
                    <tr className="border-b border-border/70">
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                        Domain
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                        Rating
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                        Supporting text
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {GRADE_DOMAINS.map((domain) => (
                      <tr
                        key={domain}
                        className="border-b border-border/50 align-top last:border-b-0"
                      >
                        <td className="px-5 py-4">
                          <div className="font-medium text-ink">
                            {GRADE_DOMAIN_LABELS[domain]}
                          </div>
                          <div className="mt-1 text-xs text-ink-muted">
                            {computeDowngradeBy(draftProfile[domain].rating) > 0
                              ? `Downgrade: ${computeDowngradeBy(
                                  draftProfile[domain].rating
                                )} ${
                                  computeDowngradeBy(
                                    draftProfile[domain].rating
                                  ) === 1
                                    ? "level"
                                    : "levels"
                                }`
                              : "No downgrade"}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <select
                            aria-label={`${GRADE_DOMAIN_LABELS[domain]} rating`}
                            value={draftProfile[domain].rating}
                            onChange={(e) =>
                              handleDraftRatingChange(
                                domain,
                                e.target.value as GRADEDomainRating
                              )
                            }
                            className="w-full min-w-[160px] rounded-xl border border-border bg-white px-3 py-2 text-sm text-ink"
                          >
                            {(Object.keys(RATING_LABELS) as GRADEDomainRating[]).map(
                              (rating) => (
                                <option key={rating} value={rating}>
                                  {RATING_LABELS[rating]}
                                </option>
                              )
                            )}
                          </select>
                        </td>
                        <td className="px-5 py-4">
                          <textarea
                            aria-label={`${GRADE_DOMAIN_LABELS[domain]} supporting text`}
                            value={draftProfile[domain].rationale}
                            onChange={(e) =>
                              handleDraftRationaleChange(domain, e.target.value)
                            }
                            rows={2}
                            placeholder="Add why this domain is or is not a concern..."
                            className="w-full rounded-xl border border-border bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-muted/50"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.5rem] border border-border/70 bg-surface px-5 py-5 shadow-[0_18px_50px_rgba(95,76,56,0.06)]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
                Overall certainty
              </p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]",
                    CERTAINTY_COLORS[draftCertainty]
                  )}
                >
                  {CERTAINTY_LABELS[draftCertainty]}
                </span>
                <span className="text-xs text-ink-muted">
                  Auto-calculated from domain downgrades
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-ink-muted">
                {draftRationale}
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-border/70 bg-surface px-5 py-5 shadow-[0_18px_50px_rgba(95,76,56,0.06)]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
                Assessment actions
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={runAssessment}
                  disabled={!selectedOutcome.trim() || isAssessing || isLoading}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                    "bg-brand text-white hover:bg-brand/90",
                    "disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                >
                  {isAssessing ? (
                    <CircleNotch className="animate-spin" size={16} />
                  ) : (
                    <Lightning weight="fill" size={16} />
                  )}
                  Assess Certainty
                </button>

                {assessments.length > 0 && (
                  <button
                    onClick={exportCSV}
                    disabled={isExporting}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border border-border bg-surface-raised px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-raised/80",
                      "disabled:cursor-not-allowed disabled:opacity-50"
                    )}
                  >
                    {isExporting ? (
                      <CircleNotch className="animate-spin" size={16} />
                    ) : (
                      <DownloadSimple weight="bold" size={16} />
                    )}
                    Export CSV
                  </button>
                )}

                <button
                  onClick={() => {
                    loadAssessments();
                    loadMetaAnalyses();
                  }}
                  disabled={isLoading}
                  className={cn(
                    "flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-surface-raised",
                    "disabled:opacity-50"
                  )}
                >
                  <ArrowsClockwise
                    className={cn(isLoading && "animate-spin")}
                    size={16}
                  />
                  Refresh
                </button>
              </div>
              <p className="mt-4 text-xs leading-5 text-ink-muted">
                The editor above is a live evidence-profile worksheet. Running
                the assessment still uses the saved project evidence and outcome
                selection, then writes a new summary of findings row below.
              </p>
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Error State */}
      {error && (
        <GlassPanel className="sr-panel border-red-500/30 p-4">
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
      {isLoading && assessments.length === 0 && (
        <GlassPanel className="sr-panel p-8">
          <div className="flex flex-col items-center justify-center gap-3 text-ink-muted">
            <CircleNotch className="animate-spin" size={28} />
            <p className="text-sm">Loading assessments...</p>
          </div>
        </GlassPanel>
      )}

      {/* Empty State */}
      {!isLoading && assessments.length === 0 && (
        <GlassPanel className="sr-panel p-8">
          <div className="flex flex-col items-center justify-center gap-3 text-ink-muted">
            <Certificate weight="duotone" size={40} className="opacity-40" />
            <p className="text-sm">No GRADE assessments yet.</p>
            <p className="text-xs text-ink-muted/70">
              {metaAnalyses.length > 0
                ? 'Select an outcome above or type one in, then click "Assess Certainty" to begin.'
                : "Run a meta-analysis first, then return here to assess the certainty of evidence."}
            </p>
          </div>
        </GlassPanel>
      )}

      {/* Summary of Findings Table */}
      {assessments.length > 0 && (
        <GlassPanel className="sr-panel p-6">
          <h3 className="sr-panel-title mb-1 text-sm">
            <CheckCircle
              weight="duotone"
              className="text-emerald-500"
              size={18}
            />
            Summary of Findings
          </h3>
          <p className="text-xs text-ink-muted mb-4">
            {assessments.length} outcome{assessments.length !== 1 ? "s" : ""}{" "}
            assessed. Click a row to expand domain rationale.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 text-ink-muted font-medium w-8" />
                  <th className="text-left py-2 pr-4 text-ink-muted font-medium">
                    Outcome
                  </th>
                  <th className="text-center py-2 px-2 text-ink-muted font-medium">
                    Studies
                  </th>
                  {GRADE_DOMAINS.map((d) => (
                    <th
                      key={d}
                      className="text-center py-2 px-2 text-ink-muted font-medium"
                      title={GRADE_DOMAIN_LABELS[d]}
                    >
                      {GRADE_DOMAIN_LABELS[d].split(" ")[0]}
                    </th>
                  ))}
                  <th className="text-center py-2 px-2 text-ink-muted font-medium">
                    Certainty
                  </th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((a) => {
                  const isExpanded = expandedRow === a.outcome;
                  const domainMap = new Map(
                    a.domains.map((d) => [d.domain, d])
                  );
                  const computedCertainty = computeOverallCertainty(a.domains);
                  return (
                    <Fragment key={a.outcome}>
                      <tr
                        className={cn(
                          "border-b border-border/50 cursor-pointer transition-colors",
                          isExpanded
                            ? "bg-surface-raised/50"
                            : "hover:bg-surface-raised/30"
                        )}
                        onClick={() =>
                          setExpandedRow(isExpanded ? null : a.outcome)
                        }
                      >
                        <td className="py-2 pr-1 text-ink-muted">
                          {isExpanded ? (
                            <CaretDown size={14} />
                          ) : (
                            <CaretRight size={14} />
                          )}
                        </td>
                        <td className="py-2 pr-4 text-ink max-w-xs truncate">
                          <div>{a.outcome}</div>
                          {a.effectEstimate && (
                            <div className="text-xs text-ink-muted">
                              {a.effectEstimate}
                            </div>
                          )}
                        </td>
                        <td className="text-center py-2 px-2 text-ink-muted">
                          {a.numberOfStudies}
                          {a.totalParticipants
                            ? ` (n=${a.totalParticipants})`
                            : ""}
                        </td>
                        {GRADE_DOMAINS.map((d) => {
                          const domain = domainMap.get(d);
                          const rating = domain?.rating || "—";
                          return (
                            <td key={d} className="text-center py-2 px-2">
                              <span
                                className={cn(
                                  "inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold",
                                  RATING_COLORS[rating] ||
                                    "bg-gray-200 text-gray-500"
                                )}
                                title={RATING_LABELS[rating] || rating}
                              >
                                {rating === "—" ? "—" : ratingSymbol(rating)}
                              </span>
                            </td>
                          );
                        })}
                        <td className="text-center py-2 px-2">
                          <span
                            className={cn(
                              "px-2.5 py-1 rounded text-xs font-medium",
                              CERTAINTY_COLORS[computedCertainty] ||
                                "bg-gray-200 text-gray-500"
                            )}
                          >
                            {CERTAINTY_LABELS[computedCertainty] ||
                              computedCertainty}
                          </span>
                        </td>
                      </tr>

                      {/* Expanded domain details */}
                      {isExpanded && (
                        <tr>
                          <td
                            colSpan={GRADE_DOMAINS.length + 4}
                            className="p-0"
                          >
                            <div className="bg-surface-raised/30 border-b border-border/50 px-6 py-4 space-y-3">
                              {a.domains.map((domain) => (
                                <div
                                  key={domain.domain}
                                  className="flex items-start gap-3"
                                >
                                  <span
                                    className={cn(
                                      "shrink-0 mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold",
                                      RATING_COLORS[domain.rating] ||
                                        "bg-gray-200 text-gray-500"
                                    )}
                                  >
                                    {ratingSymbol(domain.rating)}
                                  </span>
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-semibold text-ink">
                                        {GRADE_DOMAIN_LABELS[domain.domain] ||
                                          domain.domain}
                                      </span>
                                      <span
                                        className={cn(
                                          "text-[10px] px-1.5 py-0.5 rounded font-medium",
                                          RATING_COLORS[domain.rating] ||
                                            "bg-gray-200 text-gray-500"
                                        )}
                                      >
                                        {RATING_LABELS[domain.rating] ||
                                          domain.rating}
                                      </span>
                                      {domain.downgradeBy > 0 && (
                                        <span className="text-[10px] text-ink-muted">
                                          (-{domain.downgradeBy}{" "}
                                          {domain.downgradeBy === 1
                                            ? "level"
                                            : "levels"}
                                          )
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                                      {domain.rationale}
                                    </p>
                                  </div>
                                </div>
                              ))}

                              {/* Overall rationale */}
                              <div className="mt-3 pt-3 border-t border-border/30">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-semibold text-ink">
                                    Overall Rationale
                                  </span>
                                  <span
                                    className={cn(
                                      "text-[10px] px-1.5 py-0.5 rounded font-medium",
                                      CERTAINTY_COLORS[computedCertainty] ||
                                        "bg-gray-200 text-gray-500"
                                    )}
                                  >
                                    {CERTAINTY_LABELS[computedCertainty]}
                                  </span>
                                </div>
                                <p className="text-xs text-ink-muted leading-relaxed">
                                  {a.overallRationale}
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassPanel>
      )}
    </div>
  );
}
