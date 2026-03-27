"use client";

import { useState, useEffect, useCallback, Fragment } from "react";
import {
  Scales,
  Certificate,
  CircleNotch,
  FloppyDisk,
  Export,
  Plus,
  Trash,
  CaretDown,
  CaretRight,
  Warning,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  type CERQualComponent,
  type CERQualConcern,
  type CERQualConfidence,
  type CERQualComponentAssessment,
  type CERQualFindingAssessment,
  CERQUAL_COMPONENT_LABELS,
  CERQUAL_CONCERN_LABELS,
  CERQUAL_CONFIDENCE_LABELS,
  inferDowngradeLevels,
  computeCERQualConfidence,
  generateConfidenceIndicator,
  exportCERQualSoQFTable,
} from "@/lib/systematic-review/cerqual-assessment";

interface CERQualPanelProps {
  projectId: number;
}

const COMPONENTS: CERQualComponent[] = [
  "methodological_limitations",
  "coherence",
  "adequacy",
  "relevance",
];

const CONCERNS: CERQualConcern[] = [
  "no concerns",
  "minor",
  "moderate",
  "serious",
];

const CONFIDENCE_COLORS: Record<CERQualConfidence, string> = {
  high: "bg-emerald-500 text-white",
  moderate: "bg-amber-500 text-white",
  low: "bg-orange-500 text-white",
  "very low": "bg-red-500 text-white",
};

const CONCERN_COLORS: Record<CERQualConcern, string> = {
  "no concerns": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  minor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  moderate: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  serious: "bg-red-500/10 text-red-600 border-red-500/20",
};

/** Map concern level to the traffic light CSS modifier */
const CONCERN_TRAFFIC_LIGHT: Record<CERQualConcern, string> = {
  "no concerns": "sr-traffic-light--green",
  minor: "sr-traffic-light--amber",
  moderate: "sr-traffic-light--orange",
  serious: "sr-traffic-light--red",
};

function makeEmptyComponents(): CERQualComponentAssessment[] {
  return COMPONENTS.map((component) => ({
    component,
    concern: "no concerns" as CERQualConcern,
    explanation: "",
    downgradeLevels: 0,
  }));
}

/** Traffic light dot indicator for a domain concern level */
function TrafficLight({
  concern,
  title,
}: {
  concern: CERQualConcern;
  title?: string;
}) {
  return (
    <span
      className={cn("sr-traffic-light", CONCERN_TRAFFIC_LIGHT[concern])}
      title={title || CERQUAL_CONCERN_LABELS[concern]}
      role="img"
      aria-label={CERQUAL_CONCERN_LABELS[concern]}
    />
  );
}

export function CERQualPanel({ projectId }: CERQualPanelProps) {
  const [assessments, setAssessments] = useState<CERQualFindingAssessment[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [findingId, setFindingId] = useState("");
  const [findingStatement, setFindingStatement] = useState("");
  const [contributingStudies, setContributingStudies] = useState(0);
  const [components, setComponents] = useState<CERQualComponentAssessment[]>(
    makeEmptyComponents()
  );
  const [explanation, setExplanation] = useState("");

  const computedConfidence = computeCERQualConfidence(components);
  const confidenceIndicator = generateConfidenceIndicator(computedConfidence);

  const loadAssessments = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/systematic-review/cerqual?projectId=${projectId}`
      );
      if (!res.ok) throw new Error("Failed to load CERQual assessments");
      const data = await res.json();
      const rows = Array.isArray(data) ? data : [];
      setAssessments(
        rows.map((row: Record<string, unknown>) => ({
          findingId: row.finding_id as string,
          findingStatement: row.finding_statement as string,
          contributingStudies: row.contributing_studies as number,
          components: row.components as CERQualComponentAssessment[],
          overallConfidence: row.overall_confidence as CERQualConfidence,
          explanation: (row.explanation as string) || "",
        }))
      );
    } catch {
      setError("Failed to load assessments");
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadAssessments();
  }, [loadAssessments]);

  const updateComponent = (
    index: number,
    field: "concern" | "explanation",
    value: string
  ) => {
    setComponents((prev) => {
      const next = [...prev];
      if (field === "concern") {
        const concern = value as CERQualConcern;
        next[index] = {
          ...next[index],
          concern,
          downgradeLevels: inferDowngradeLevels(concern),
        };
      } else {
        next[index] = { ...next[index], explanation: value };
      }
      return next;
    });
  };

  const resetForm = () => {
    setFindingId("");
    setFindingStatement("");
    setContributingStudies(0);
    setComponents(makeEmptyComponents());
    setExplanation("");
  };

  const handleSave = async () => {
    const id = findingId.trim() || `F${Date.now()}`;
    if (!findingStatement.trim()) {
      setError("Finding statement is required.");
      return;
    }

    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/systematic-review/cerqual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          findingId: id,
          findingStatement: findingStatement.trim(),
          contributingStudies,
          components,
          explanation: explanation.trim(),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to save assessment");
      }

      setSuccessMessage("Assessment saved successfully.");
      resetForm();
      setShowForm(false);
      await loadAssessments();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    if (assessments.length === 0) return;
    const csv = exportCERQualSoQFTable(assessments);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cerqual-soqf-${projectId}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 sr-content max-w-5xl">
      {/* ── Header Panel ── */}
      <div className="sr-panel">
        <div className="space-y-4">
          <h2 className="sr-panel-title">
            <Scales weight="duotone" className="text-brand" size={24} />
            GRADE-CERQual Assessment
          </h2>
          <p className="text-sm text-ink-muted">
            CERQual provides a transparent framework for assessing confidence in
            findings from qualitative evidence syntheses. Each finding is
            assessed across 4 components: Methodological Limitations, Coherence,
            Adequacy of Data, and Relevance.
          </p>

          {/* Domain legend with traffic lights */}
          <div className="grid grid-cols-4 gap-2">
            {COMPONENTS.map((comp) => (
              <div
                key={comp}
                className="flex items-center gap-2 p-2 bg-surface-raised rounded border border-border"
              >
                <TrafficLight concern="no concerns" />
                <span className="text-xs font-medium text-ink">
                  {CERQUAL_COMPONENT_LABELS[comp]}
                </span>
              </div>
            ))}
          </div>

          {/* Confidence level legend */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-ink-muted">Confidence levels:</span>
            {(
              ["high", "moderate", "low", "very low"] as CERQualConfidence[]
            ).map((level) => (
              <span
                key={level}
                className="inline-flex items-center gap-1.5 text-xs"
              >
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded text-[10px] font-bold",
                    CONFIDENCE_COLORS[level]
                  )}
                >
                  {CERQUAL_CONFIDENCE_LABELS[level]}
                </span>
              </span>
            ))}
          </div>

          {/* Traffic light legend */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-ink-muted">Domain concerns:</span>
            {CONCERNS.map((concern) => (
              <span
                key={concern}
                className="inline-flex items-center gap-1.5 text-xs text-ink-muted"
              >
                <TrafficLight concern={concern} />
                {CERQUAL_CONCERN_LABELS[concern]}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={() => setShowForm(!showForm)}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                "bg-brand text-white hover:bg-brand/90"
              )}
            >
              <Plus weight="bold" size={16} />
              {showForm ? "Cancel" : "Add Finding"}
            </button>

            {assessments.length > 0 && (
              <button
                onClick={handleExport}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                  "bg-surface-raised border border-border text-ink hover:bg-surface-raised/80"
                )}
              >
                <Export weight="bold" size={16} />
                Export SoQF CSV
              </button>
            )}

            <button
              onClick={loadAssessments}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-ink-muted hover:bg-surface-raised transition-colors"
            >
              <ArrowsClockwise
                className={cn(isLoading && "animate-spin")}
                size={16}
              />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* ── Error state ── */}
      {error && (
        <div className="sr-panel" style={{ borderColor: "rgba(239,68,68,0.3)" }}>
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
        </div>
      )}

      {/* ── Success message ── */}
      {successMessage && (
        <div
          className="sr-panel"
          style={{ borderColor: "rgba(16,185,129,0.3)" }}
        >
          <p className="text-sm text-emerald-500">{successMessage}</p>
        </div>
      )}

      {/* ── New Finding Form ── */}
      {showForm && (
        <div className="sr-panel">
          <div className="sr-content">
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <Plus weight="duotone" className="text-brand" size={18} />
              New Finding Assessment
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1">
                  Finding ID
                </label>
                <input
                  aria-label="Finding ID"
                  type="text"
                  value={findingId}
                  onChange={(e) => setFindingId(e.target.value)}
                  placeholder="Auto-generated if empty"
                  className="w-full text-sm rounded-md border border-border bg-surface px-3 py-1.5 text-ink placeholder:text-ink-muted/50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1">
                  Contributing Studies
                </label>
                <input
                  aria-label="Contributing studies count"
                  type="number"
                  min={0}
                  value={contributingStudies}
                  onChange={(e) =>
                    setContributingStudies(parseInt(e.target.value, 10) || 0)
                  }
                  className="w-full text-sm rounded-md border border-border bg-surface px-3 py-1.5 text-ink"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1">
                Finding Statement
              </label>
              <textarea
                aria-label="Finding statement"
                rows={3}
                value={findingStatement}
                onChange={(e) => setFindingStatement(e.target.value)}
                placeholder="Describe the qualitative finding..."
                className="w-full text-sm rounded-md border border-border bg-surface px-3 py-2 text-ink placeholder:text-ink-muted/50 resize-none"
              />
            </div>

            {/* Domain assessment cards */}
            <div className="space-y-4">
              {components.map((comp, index) => (
                <div
                  key={comp.component}
                  className="p-4 rounded-lg bg-surface-raised border border-border"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <TrafficLight concern={comp.concern} />
                      <span className="text-sm font-medium text-ink">
                        {CERQUAL_COMPONENT_LABELS[comp.component]}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full font-medium border",
                        comp.downgradeLevels === 0
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                          : comp.downgradeLevels === 1
                            ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                            : "bg-red-500/10 text-red-600 border-red-500/20"
                      )}
                    >
                      {comp.downgradeLevels === 0
                        ? "No downgrade"
                        : `-${comp.downgradeLevels} level${comp.downgradeLevels > 1 ? "s" : ""}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    {CONCERNS.map((concern) => (
                      <label
                        key={concern}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs cursor-pointer border transition-colors",
                          comp.concern === concern
                            ? CONCERN_COLORS[concern]
                            : "border-border text-ink-muted hover:bg-surface-raised/80"
                        )}
                      >
                        <input
                          type="radio"
                          name={`concern-${comp.component}`}
                          value={concern}
                          checked={comp.concern === concern}
                          onChange={() =>
                            updateComponent(index, "concern", concern)
                          }
                          className="sr-only"
                        />
                        <TrafficLight concern={concern} />
                        {CERQUAL_CONCERN_LABELS[concern]}
                      </label>
                    ))}
                  </div>

                  <textarea
                    aria-label={`Explanation for ${CERQUAL_COMPONENT_LABELS[comp.component]}`}
                    rows={2}
                    value={comp.explanation}
                    onChange={(e) =>
                      updateComponent(index, "explanation", e.target.value)
                    }
                    placeholder={`Explain the assessment for ${CERQUAL_COMPONENT_LABELS[comp.component].toLowerCase()}...`}
                    className="w-full text-sm rounded-md border border-border bg-surface px-3 py-2 text-ink placeholder:text-ink-muted/50 resize-none"
                  />
                </div>
              ))}
            </div>

            {/* Supporting text: overall explanation */}
            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1">
                Overall Explanation (optional)
              </label>
              <textarea
                aria-label="Overall explanation"
                rows={2}
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Summarize the overall confidence assessment..."
                className="w-full text-sm rounded-md border border-border bg-surface px-3 py-2 text-ink placeholder:text-ink-muted/50 resize-none"
              />
            </div>

            {/* Auto-calculated overall confidence + actions */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center gap-2">
                <Certificate
                  weight="duotone"
                  className="text-brand"
                  size={18}
                />
                <span className="text-sm font-medium text-ink">
                  Overall Confidence:
                </span>
                <span
                  className={cn(
                    "px-2.5 py-1 rounded text-xs font-bold",
                    CONFIDENCE_COLORS[computedConfidence]
                  )}
                >
                  {confidenceIndicator}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-ink-muted hover:bg-surface-raised transition-colors"
                >
                  <Trash weight="duotone" size={16} />
                  Discard
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving || !findingStatement.trim()}
                  className={cn(
                    "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                    "bg-brand text-white hover:bg-brand/90",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {isSaving ? (
                    <CircleNotch className="animate-spin" size={16} />
                  ) : (
                    <FloppyDisk weight="duotone" size={16} />
                  )}
                  Save Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Loading state ── */}
      {isLoading && assessments.length === 0 && (
        <div className="sr-panel">
          <div className="flex flex-col items-center justify-center gap-3 text-ink-muted py-4">
            <CircleNotch className="animate-spin" size={28} />
            <p className="text-sm">Loading assessments...</p>
          </div>
        </div>
      )}

      {/* ── Empty state ── */}
      {!isLoading && assessments.length === 0 && !showForm && (
        <div className="sr-panel">
          <div className="flex flex-col items-center justify-center gap-3 text-ink-muted py-4">
            <Scales weight="duotone" size={40} className="opacity-40" />
            <p className="text-sm">No CERQual assessments yet.</p>
            <p className="text-xs text-ink-muted/70">
              Click &ldquo;Add Finding&rdquo; above to assess confidence in a
              qualitative review finding.
            </p>
          </div>
        </div>
      )}

      {/* ── Findings list (SoQF Table) with traffic lights ── */}
      {assessments.length > 0 && (
        <div className="sr-panel">
          <div className="sr-content">
            <div>
              <h3 className="text-sm font-semibold text-ink mb-1 flex items-center gap-2">
                <Certificate
                  weight="duotone"
                  className="text-emerald-500"
                  size={18}
                />
                Summary of Qualitative Findings (SoQF)
              </h3>
              <p className="text-xs text-ink-muted">
                {assessments.length} finding
                {assessments.length !== 1 ? "s" : ""} assessed. Click a row to
                expand component details.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-ink-muted font-medium w-8" />
                    <th className="text-left py-2 pr-4 text-ink-muted font-medium">
                      Finding
                    </th>
                    <th className="text-center py-2 px-2 text-ink-muted font-medium">
                      Studies
                    </th>
                    {COMPONENTS.map((comp) => (
                      <th
                        key={comp}
                        className="text-center py-2 px-2 text-ink-muted font-medium"
                        title={CERQUAL_COMPONENT_LABELS[comp]}
                      >
                        {CERQUAL_COMPONENT_LABELS[comp].split(" ")[0]}
                      </th>
                    ))}
                    <th className="text-center py-2 px-2 text-ink-muted font-medium">
                      Confidence
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {assessments.map((a) => {
                    const isExpanded = expandedRow === a.findingId;
                    const componentMap = new Map(
                      a.components.map((c) => [c.component, c])
                    );
                    return (
                      <Fragment key={a.findingId}>
                        <tr
                          className={cn(
                            "border-b border-border/50 cursor-pointer transition-colors",
                            isExpanded
                              ? "bg-surface-raised/50"
                              : "hover:bg-surface-raised/30"
                          )}
                          onClick={() =>
                            setExpandedRow(isExpanded ? null : a.findingId)
                          }
                        >
                          <td className="py-2 pr-1 text-ink-muted">
                            {isExpanded ? (
                              <CaretDown size={14} />
                            ) : (
                              <CaretRight size={14} />
                            )}
                          </td>
                          <td className="py-2 pr-4 text-ink max-w-xs">
                            <div className="font-medium text-xs text-ink-muted mb-0.5">
                              {a.findingId}
                            </div>
                            <div className="truncate">
                              {a.findingStatement}
                            </div>
                          </td>
                          <td className="text-center py-2 px-2 text-ink-muted">
                            {a.contributingStudies}
                          </td>
                          {COMPONENTS.map((comp) => {
                            const c = componentMap.get(comp);
                            const concern = c?.concern || "no concerns";
                            return (
                              <td
                                key={comp}
                                className="text-center py-2 px-2"
                              >
                                <div className="flex items-center justify-center gap-1.5">
                                  <TrafficLight
                                    concern={concern as CERQualConcern}
                                    title={`${CERQUAL_COMPONENT_LABELS[comp]}: ${CERQUAL_CONCERN_LABELS[concern as CERQualConcern]}`}
                                  />
                                  <span
                                    className={cn(
                                      "text-[10px] font-medium",
                                      concern === "no concerns"
                                        ? "text-emerald-600"
                                        : concern === "minor"
                                          ? "text-amber-600"
                                          : concern === "moderate"
                                            ? "text-orange-600"
                                            : "text-red-600"
                                    )}
                                  >
                                    {concern === "no concerns"
                                      ? "None"
                                      : concern.charAt(0).toUpperCase() +
                                        concern.slice(1)}
                                  </span>
                                </div>
                              </td>
                            );
                          })}
                          <td className="text-center py-2 px-2">
                            <span
                              className={cn(
                                "px-2.5 py-1 rounded text-xs font-medium",
                                CONFIDENCE_COLORS[a.overallConfidence]
                              )}
                            >
                              {generateConfidenceIndicator(
                                a.overallConfidence
                              )}
                            </span>
                          </td>
                        </tr>

                        {/* Expanded row: domain details with traffic lights + supporting text */}
                        {isExpanded && (
                          <tr>
                            <td
                              colSpan={COMPONENTS.length + 4}
                              className="p-0"
                            >
                              <div className="bg-surface-raised/30 border-b border-border/50 px-6 py-4 space-y-3">
                                {a.components.map((comp) => (
                                  <div
                                    key={comp.component}
                                    className="flex items-start gap-3"
                                  >
                                    <TrafficLight concern={comp.concern} />
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold text-ink">
                                          {
                                            CERQUAL_COMPONENT_LABELS[
                                              comp.component
                                            ]
                                          }
                                        </span>
                                        <span
                                          className={cn(
                                            "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border",
                                            CONCERN_COLORS[comp.concern]
                                          )}
                                        >
                                          {comp.concern === "no concerns"
                                            ? "No concerns"
                                            : comp.concern
                                                .charAt(0)
                                                .toUpperCase() +
                                              comp.concern.slice(1) +
                                              " concerns"}
                                        </span>
                                        {comp.downgradeLevels > 0 && (
                                          <span className="text-[10px] text-ink-muted">
                                            (-{comp.downgradeLevels}{" "}
                                            {comp.downgradeLevels === 1
                                              ? "level"
                                              : "levels"}
                                            )
                                          </span>
                                        )}
                                      </div>
                                      {comp.explanation && (
                                        <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                                          {comp.explanation}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                ))}

                                {a.explanation && (
                                  <div className="mt-3 pt-3 border-t border-border/30">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-xs font-semibold text-ink">
                                        Overall Rationale
                                      </span>
                                      <span
                                        className={cn(
                                          "text-[10px] px-1.5 py-0.5 rounded font-medium",
                                          CONFIDENCE_COLORS[
                                            a.overallConfidence
                                          ]
                                        )}
                                      >
                                        {
                                          CERQUAL_CONFIDENCE_LABELS[
                                            a.overallConfidence
                                          ]
                                        }
                                      </span>
                                    </div>
                                    <p className="text-xs text-ink-muted leading-relaxed">
                                      {a.explanation}
                                    </p>
                                  </div>
                                )}
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
          </div>
        </div>
      )}
    </div>
  );
}
