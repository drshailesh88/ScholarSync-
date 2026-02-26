"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import {
  Plus,
  Minus,
  Play,
  DownloadSimple,
  CircleNotch,
  Table as TableIcon,
  Graph,
  TreeStructure,
  Warning,
  Trophy,
} from "@phosphor-icons/react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { NetworkPlot } from "@/components/systematic-review/NetworkPlot";
import { LeagueTable } from "@/components/systematic-review/LeagueTable";
import { NMAForestPlot } from "@/components/systematic-review/NMAForestPlot";
import type { NMAResult } from "@/lib/systematic-review/network-meta-analysis";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NMAPanelProps {
  projectId: number;
}

interface StudyRow {
  id: string;
  studyId: string;
  treatment1: string;
  treatment2: string;
  effect: string;
  se: string;
}

type ResultTab =
  | "league"
  | "network"
  | "forest"
  | "inconsistency"
  | "rankings";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createEmptyRow(): StudyRow {
  return {
    id: crypto.randomUUID(),
    studyId: "",
    treatment1: "",
    treatment2: "",
    effect: "",
    se: "",
  };
}

function exportLeagueTableCSV(result: NMAResult): void {
  const { treatments, leagueTable, leagueTableCI } = result;
  const k = treatments.length;

  const header = ["", ...treatments].join(",");
  const rows: string[] = [header];

  for (let i = 0; i < k; i++) {
    const cells = [treatments[i]];
    for (let j = 0; j < k; j++) {
      if (i === j) {
        cells.push(treatments[i]);
      } else {
        const e = leagueTable[i][j].toFixed(3);
        const ci = leagueTableCI[i][j];
        cells.push(`${e} (${ci.lower.toFixed(3)} to ${ci.upper.toFixed(3)})`);
      }
    }
    rows.push(cells.join(","));
  }

  const csv = rows.join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "nma-league-table.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// ---------------------------------------------------------------------------
// Result tab definitions
// ---------------------------------------------------------------------------

const RESULT_TABS: { key: ResultTab; label: string; icon: typeof TableIcon }[] =
  [
    { key: "league", label: "League Table", icon: TableIcon },
    { key: "network", label: "Network Plot", icon: Graph },
    { key: "forest", label: "Forest Plot", icon: TreeStructure },
    { key: "inconsistency", label: "Inconsistency", icon: Warning },
    { key: "rankings", label: "Rankings", icon: Trophy },
  ];

// ---------------------------------------------------------------------------
// NMAPanel Component
// ---------------------------------------------------------------------------

export function NMAPanel({ projectId }: NMAPanelProps) {
  // Study input state
  const [studies, setStudies] = useState<StudyRow[]>([
    createEmptyRow(),
    createEmptyRow(),
  ]);
  const [model, setModel] = useState<"fixed" | "random">("fixed");
  const [referenceTreatment, setReferenceTreatment] = useState<string>("");

  // Results state
  const [result, setResult] = useState<NMAResult | null>(null);
  const [activeResultTab, setActiveResultTab] = useState<ResultTab>("league");
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load saved results on mount
  useEffect(() => {
    loadSavedResults();
  }, [projectId]); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadSavedResults() {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/systematic-review/nma?projectId=${projectId}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.result) {
          setResult(data.result);
        }
        if (data.studies && Array.isArray(data.studies)) {
          setStudies(
            data.studies.map((s: Record<string, unknown>) => ({
              id: crypto.randomUUID(),
              studyId: String(s.studyId ?? ""),
              treatment1: String(s.treatment1 ?? ""),
              treatment2: String(s.treatment2 ?? ""),
              effect: String(s.effect ?? ""),
              se: String(s.se ?? ""),
            }))
          );
        }
      }
    } catch {
      // Non-critical — user can enter data manually
    } finally {
      setIsLoading(false);
    }
  }

  // Unique treatments across all study rows
  const allTreatments = useMemo(() => {
    const set = new Set<string>();
    for (const s of studies) {
      if (s.treatment1.trim()) set.add(s.treatment1.trim());
      if (s.treatment2.trim()) set.add(s.treatment2.trim());
    }
    return Array.from(set).sort();
  }, [studies]);

  // Study row handlers
  const addRow = useCallback(() => {
    setStudies((prev) => [...prev, createEmptyRow()]);
  }, []);

  const removeRow = useCallback((id: string) => {
    setStudies((prev) => {
      if (prev.length <= 2) return prev;
      return prev.filter((s) => s.id !== id);
    });
  }, []);

  const updateRow = useCallback(
    (id: string, field: keyof StudyRow, value: string) => {
      setStudies((prev) =>
        prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
      );
    },
    []
  );

  // Validate studies
  const validationErrors = useMemo(() => {
    const errors: string[] = [];
    const filledStudies = studies.filter(
      (s) =>
        s.studyId.trim() &&
        s.treatment1.trim() &&
        s.treatment2.trim() &&
        s.effect.trim() &&
        s.se.trim()
    );
    if (filledStudies.length < 2) {
      errors.push("At least 2 complete studies are required.");
    }
    for (const s of filledStudies) {
      if (s.treatment1.trim() === s.treatment2.trim()) {
        errors.push(`Study "${s.studyId}" compares a treatment to itself.`);
      }
      if (isNaN(parseFloat(s.effect))) {
        errors.push(`Study "${s.studyId}" has invalid effect value.`);
      }
      const se = parseFloat(s.se);
      if (isNaN(se) || se <= 0) {
        errors.push(`Study "${s.studyId}" has invalid SE (must be > 0).`);
      }
    }
    return errors;
  }, [studies]);

  // Run NMA
  async function handleRunNMA() {
    setError(null);
    setIsRunning(true);

    const filledStudies = studies
      .filter(
        (s) =>
          s.studyId.trim() &&
          s.treatment1.trim() &&
          s.treatment2.trim() &&
          s.effect.trim() &&
          s.se.trim()
      )
      .map((s) => ({
        studyId: s.studyId.trim(),
        treatment1: s.treatment1.trim(),
        treatment2: s.treatment2.trim(),
        effect: parseFloat(s.effect),
        se: parseFloat(s.se),
      }));

    try {
      const res = await fetch("/api/systematic-review/nma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          studies: filledStudies,
          model,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to run NMA");
        return;
      }

      setResult(data.result);
      setActiveResultTab("league");
    } catch {
      setError("Network error running NMA");
    } finally {
      setIsRunning(false);
    }
  }

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <CircleNotch weight="bold" className="animate-spin text-brand" size={28} />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1200px]">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-ink">
          Network Meta-Analysis
        </h2>
        <p className="text-sm text-ink/60 mt-1">
          Compare multiple treatments simultaneously using the graph-theoretical
          approach (Ruecker 2012). Enter pairwise study data below.
        </p>
      </div>

      {/* Study Input Table */}
      <GlassPanel>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-ink">Study Data</h3>
          <div className="flex items-center gap-2">
            {/* Model selector */}
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="text-ink/60">Model:</span>
              <button
                onClick={() => setModel("fixed")}
                className={`px-2 py-0.5 rounded text-[11px] transition ${
                  model === "fixed"
                    ? "bg-brand text-white"
                    : "bg-surface-2 text-ink/60 hover:text-ink"
                }`}
              >
                Fixed
              </button>
              <button
                onClick={() => setModel("random")}
                className={`px-2 py-0.5 rounded text-[11px] transition ${
                  model === "random"
                    ? "bg-brand text-white"
                    : "bg-surface-2 text-ink/60 hover:text-ink"
                }`}
              >
                Random
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] text-ink/50 uppercase tracking-wider">
                <th className="text-left pb-2 pr-2 w-[160px]">Study ID</th>
                <th className="text-left pb-2 pr-2 w-[160px]">Treatment 1</th>
                <th className="text-left pb-2 pr-2 w-[160px]">Treatment 2</th>
                <th className="text-left pb-2 pr-2 w-[100px]">
                  Effect (log)
                </th>
                <th className="text-left pb-2 pr-2 w-[100px]">SE</th>
                <th className="w-[40px]" />
              </tr>
            </thead>
            <tbody>
              {studies.map((study) => (
                <tr key={study.id} className="border-t border-ink/5">
                  <td className="py-1.5 pr-2">
                    <input
                      type="text"
                      value={study.studyId}
                      onChange={(e) =>
                        updateRow(study.id, "studyId", e.target.value)
                      }
                      placeholder="e.g., Smith 2020"
                      className="w-full bg-surface-2 border border-ink/10 rounded px-2 py-1 text-xs text-ink placeholder:text-ink/30"
                    />
                  </td>
                  <td className="py-1.5 pr-2">
                    <input
                      type="text"
                      value={study.treatment1}
                      onChange={(e) =>
                        updateRow(study.id, "treatment1", e.target.value)
                      }
                      placeholder="e.g., Drug A"
                      className="w-full bg-surface-2 border border-ink/10 rounded px-2 py-1 text-xs text-ink placeholder:text-ink/30"
                    />
                  </td>
                  <td className="py-1.5 pr-2">
                    <input
                      type="text"
                      value={study.treatment2}
                      onChange={(e) =>
                        updateRow(study.id, "treatment2", e.target.value)
                      }
                      placeholder="e.g., Placebo"
                      className="w-full bg-surface-2 border border-ink/10 rounded px-2 py-1 text-xs text-ink placeholder:text-ink/30"
                    />
                  </td>
                  <td className="py-1.5 pr-2">
                    <input
                      type="number"
                      step="any"
                      value={study.effect}
                      onChange={(e) =>
                        updateRow(study.id, "effect", e.target.value)
                      }
                      placeholder="0.00"
                      className="w-full bg-surface-2 border border-ink/10 rounded px-2 py-1 text-xs text-ink placeholder:text-ink/30"
                    />
                  </td>
                  <td className="py-1.5 pr-2">
                    <input
                      type="number"
                      step="any"
                      min="0.001"
                      value={study.se}
                      onChange={(e) =>
                        updateRow(study.id, "se", e.target.value)
                      }
                      placeholder="0.00"
                      className="w-full bg-surface-2 border border-ink/10 rounded px-2 py-1 text-xs text-ink placeholder:text-ink/30"
                    />
                  </td>
                  <td className="py-1.5 text-center">
                    <button
                      onClick={() => removeRow(study.id)}
                      disabled={studies.length <= 2}
                      className="text-ink/30 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition"
                      title="Remove study"
                    >
                      <Minus size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Actions row */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-ink/5">
          <button
            onClick={addRow}
            className="flex items-center gap-1 text-xs text-brand hover:text-brand/80 transition"
          >
            <Plus size={14} weight="bold" />
            Add Study
          </button>

          <div className="flex items-center gap-3">
            {validationErrors.length > 0 && (
              <span className="text-[10px] text-amber-500">
                {validationErrors[0]}
              </span>
            )}
            <button
              onClick={handleRunNMA}
              disabled={isRunning || validationErrors.length > 0}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-brand text-white text-xs font-medium hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isRunning ? (
                <CircleNotch size={14} weight="bold" className="animate-spin" />
              ) : (
                <Play size={14} weight="fill" />
              )}
              Run NMA
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-3 text-xs text-red-500 bg-red-500/5 rounded-md px-3 py-2">
            {error}
          </div>
        )}
      </GlassPanel>

      {/* Results */}
      {result && (
        <GlassPanel>
          {/* Result tabs */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              {RESULT_TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveResultTab(tab.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
                    activeResultTab === tab.key
                      ? "bg-brand/10 text-brand"
                      : "text-ink/50 hover:text-ink hover:bg-ink/5"
                  }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {activeResultTab === "league" && (
                <button
                  onClick={() => exportLeagueTableCSV(result)}
                  className="flex items-center gap-1 text-[11px] text-ink/50 hover:text-brand transition"
                >
                  <DownloadSimple size={13} />
                  Export CSV
                </button>
              )}
              <span className="text-[10px] text-ink/40">
                {result.model === "random"
                  ? `Random-effects | tau\u00B2 = ${result.tau2.toFixed(4)}`
                  : "Fixed-effect model"}
                {" | "}
                {result.treatments.length} treatments
              </span>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px]">
            {/* League Table */}
            {activeResultTab === "league" && (
              <LeagueTable result={result} title="NMA League Table" />
            )}

            {/* Network Plot */}
            {activeResultTab === "network" && (
              <NetworkPlot
                result={result}
                forceLayout={result.treatments.length > 5}
                title="Treatment Network"
              />
            )}

            {/* Forest Plot */}
            {activeResultTab === "forest" && (
              <div>
                {allTreatments.length > 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    <label className="text-[11px] text-ink/60 font-medium">
                      Reference:
                    </label>
                    <select
                      value={referenceTreatment || result.treatments[0]}
                      onChange={(e) => setReferenceTreatment(e.target.value)}
                      className="text-[11px] bg-surface-2 border border-ink/10 rounded px-2 py-1 text-ink"
                    >
                      {result.treatments.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <NMAForestPlot
                  result={result}
                  referenceTreatment={
                    referenceTreatment || result.treatments[0]
                  }
                  title="NMA Forest Plot"
                />
              </div>
            )}

            {/* Inconsistency */}
            {activeResultTab === "inconsistency" && (
              <div>
                <h4 className="text-sm font-semibold text-ink mb-3">
                  Node-Splitting Inconsistency Test
                </h4>
                {result.inconsistency.length === 0 ? (
                  <p className="text-sm text-ink/50">
                    No closed loops with both direct and indirect evidence were
                    found. Inconsistency testing requires at least one comparison
                    with both direct and indirect evidence paths.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-[11px] text-ink/50 uppercase tracking-wider border-b border-ink/10">
                          <th className="text-left pb-2 pr-4">Comparison</th>
                          <th className="text-right pb-2 pr-4">Direct</th>
                          <th className="text-right pb-2 pr-4">Indirect</th>
                          <th className="text-right pb-2 pr-4">Difference</th>
                          <th className="text-right pb-2 pr-4">P-value</th>
                          <th className="text-left pb-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.inconsistency.map((row, i) => {
                          const significant = row.pValue < 0.05;
                          return (
                            <tr
                              key={i}
                              className={`border-b border-ink/5 ${
                                significant ? "bg-amber-500/5" : ""
                              }`}
                            >
                              <td className="py-2 pr-4 text-xs font-medium">
                                {row.comparison}
                              </td>
                              <td className="py-2 pr-4 text-xs text-right tabular-nums">
                                {row.direct.toFixed(3)}
                              </td>
                              <td className="py-2 pr-4 text-xs text-right tabular-nums">
                                {row.indirect.toFixed(3)}
                              </td>
                              <td className="py-2 pr-4 text-xs text-right tabular-nums">
                                {row.diff.toFixed(3)}
                              </td>
                              <td
                                className={`py-2 pr-4 text-xs text-right tabular-nums font-medium ${
                                  significant
                                    ? "text-amber-600"
                                    : "text-ink/60"
                                }`}
                              >
                                {row.pValue.toFixed(4)}
                              </td>
                              <td className="py-2 text-xs">
                                {significant ? (
                                  <span className="inline-flex items-center gap-1 text-amber-600">
                                    <Warning size={12} weight="fill" />
                                    Inconsistent
                                  </span>
                                ) : (
                                  <span className="text-green-600">
                                    Consistent
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <p className="text-[10px] text-ink/40 mt-2">
                      Node-splitting approach (Dias et al. 2010). Comparisons
                      with p &lt; 0.05 indicate significant inconsistency
                      between direct and indirect evidence.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Rankings */}
            {activeResultTab === "rankings" && (
              <div>
                <h4 className="text-sm font-semibold text-ink mb-3">
                  Treatment Rankings (P-scores)
                </h4>
                <div className="space-y-1.5">
                  {result.pScores.map((ps, i) => {
                    const pct = Math.round(ps.score * 100);
                    return (
                      <div
                        key={ps.treatment}
                        className="flex items-center gap-3"
                      >
                        <span className="w-5 text-xs text-ink/40 text-right tabular-nums">
                          {i + 1}.
                        </span>
                        <span className="w-[180px] text-xs text-ink font-medium truncate">
                          {ps.treatment}
                        </span>
                        <div className="flex-1 h-5 bg-ink/5 rounded-full overflow-hidden relative">
                          <div
                            className="h-full bg-brand/60 rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-ink/80">
                            {ps.score.toFixed(3)}
                          </span>
                        </div>
                        <span className="w-[50px] text-[11px] text-ink/50 text-right tabular-nums">
                          {pct}%
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-ink/40 mt-4">
                  P-scores (Ruecker &amp; Schwarzer 2015): higher values
                  indicate a higher probability of being the best treatment. A
                  P-score of 1.0 means certainly best; 0.0 means certainly
                  worst.
                </p>
              </div>
            )}
          </div>
        </GlassPanel>
      )}
    </div>
  );
}
