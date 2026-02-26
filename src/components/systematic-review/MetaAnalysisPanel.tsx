"use client";

import { useState, useCallback } from "react";
import {
  ChartBar,
  Plus,
  Trash,
  CircleNotch,
  Play,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import { ForestPlot } from "./ForestPlot";
import { FunnelPlot } from "./FunnelPlot";
import type {
  EffectType,
  ModelType,
  MetaAnalysisOutput,
} from "@/lib/systematic-review/meta-analysis";

interface MetaAnalysisPanelProps {
  projectId: number;
}

interface StudyInput {
  studyId: string;
  studyLabel: string;
  effect: string;
  se: string;
  ciLower: string;
  ciUpper: string;
}

const EFFECT_TYPES: { key: EffectType; label: string; description: string }[] = [
  { key: "OR", label: "Odds Ratio", description: "Binary outcomes, case-control" },
  { key: "RR", label: "Risk Ratio", description: "Binary outcomes, cohort/RCT" },
  { key: "SMD", label: "Std. Mean Diff", description: "Continuous, different scales" },
  { key: "MD", label: "Mean Difference", description: "Continuous, same scale" },
  { key: "RD", label: "Risk Difference", description: "Absolute risk difference" },
];

function createEmptyStudy(index: number): StudyInput {
  return {
    studyId: `study_${index}`,
    studyLabel: "",
    effect: "",
    se: "",
    ciLower: "",
    ciUpper: "",
  };
}

export function MetaAnalysisPanel({ projectId }: MetaAnalysisPanelProps) {
  const [effectType, setEffectType] = useState<EffectType>("OR");
  const [model, setModel] = useState<ModelType>("random");
  const [analysisName, setAnalysisName] = useState("Primary Analysis");
  const [outcomeMeasure, setOutcomeMeasure] = useState("");
  const [includeTrimFill, setIncludeTrimFill] = useState(false);
  const [studies, setStudies] = useState<StudyInput[]>([
    createEmptyStudy(1),
    createEmptyStudy(2),
    createEmptyStudy(3),
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<MetaAnalysisOutput | null>(null);
  const [trimFillResult, setTrimFillResult] = useState<{
    adjustedStudies: MetaAnalysisOutput["studies"];
    imputedCount: number;
    adjustedPooled: MetaAnalysisOutput["pooled"];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addStudy = () => {
    setStudies((prev) => [...prev, createEmptyStudy(prev.length + 1)]);
  };

  const removeStudy = (index: number) => {
    if (studies.length <= 2) return; // Minimum 2 studies
    setStudies((prev) => prev.filter((_, i) => i !== index));
  };

  const updateStudy = (index: number, field: keyof StudyInput, value: string) => {
    setStudies((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  // Auto-compute CI from effect ± 1.96*SE
  const autoComputeCI = (index: number) => {
    const study = studies[index];
    const effect = parseFloat(study.effect);
    const se = parseFloat(study.se);
    if (!isNaN(effect) && !isNaN(se) && se > 0) {
      const lower = effect - 1.96 * se;
      const upper = effect + 1.96 * se;
      setStudies((prev) =>
        prev.map((s, i) =>
          i === index
            ? { ...s, ciLower: lower.toFixed(4), ciUpper: upper.toFixed(4) }
            : s
        )
      );
    }
  };

  const runAnalysis = useCallback(async () => {
    setIsRunning(true);
    setError(null);
    setResult(null);
    setTrimFillResult(null);

    try {
      // Validate studies
      const validStudies = studies
        .filter((s) => s.studyLabel && s.effect && s.se)
        .map((s, i) => ({
          studyId: s.studyId || `study_${i + 1}`,
          studyLabel: s.studyLabel,
          effect: parseFloat(s.effect),
          se: parseFloat(s.se),
          ciLower: s.ciLower
            ? parseFloat(s.ciLower)
            : parseFloat(s.effect) - 1.96 * parseFloat(s.se),
          ciUpper: s.ciUpper
            ? parseFloat(s.ciUpper)
            : parseFloat(s.effect) + 1.96 * parseFloat(s.se),
        }));

      if (validStudies.length < 2) {
        setError("At least 2 complete studies are required");
        return;
      }

      const res = await fetch("/api/systematic-review/meta-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          analysisName,
          outcomeMeasure: outcomeMeasure || effectType,
          effectType,
          model,
          studies: validStudies,
          includeTrimAndFill: includeTrimFill,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }

      const data = await res.json();
      setResult(data.result);
      if (data.trimAndFill) {
        setTrimFillResult(data.trimAndFill);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsRunning(false);
    }
  }, [
    projectId,
    analysisName,
    outcomeMeasure,
    effectType,
    model,
    studies,
    includeTrimFill,
  ]);

  const isLogScale = effectType === "OR" || effectType === "RR";

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Configuration */}
      <GlassPanel className="p-6">
        <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <ChartBar weight="duotone" className="text-brand" />
          Meta-Analysis Configuration
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Analysis Name
            </label>
            <input
              type="text"
              value={analysisName}
              onChange={(e) => setAnalysisName(e.target.value)}
              className="w-full px-3 py-2 bg-surface-raised border border-border rounded text-sm text-ink focus:ring-2 focus:ring-brand/40 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Outcome Measure
            </label>
            <input
              type="text"
              value={outcomeMeasure}
              onChange={(e) => setOutcomeMeasure(e.target.value)}
              placeholder="e.g., HbA1c reduction at 12 months"
              className="w-full px-3 py-2 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 outline-none"
            />
          </div>
        </div>

        {/* Effect type selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-ink mb-2">
            Effect Measure
          </label>
          <div className="flex gap-2 flex-wrap">
            {EFFECT_TYPES.map((et) => (
              <button
                key={et.key}
                onClick={() => setEffectType(et.key)}
                className={cn(
                  "px-3 py-2 rounded text-sm border transition-colors",
                  effectType === et.key
                    ? "bg-brand/10 border-brand/30 text-brand font-medium"
                    : "bg-surface-raised border-border text-ink-muted hover:border-brand/20"
                )}
                title={et.description}
              >
                {et.label}
              </button>
            ))}
          </div>
        </div>

        {/* Model selector + options */}
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-ink">Model:</label>
            <button
              onClick={() => setModel("fixed")}
              className={cn(
                "px-3 py-1.5 rounded text-sm border transition-colors",
                model === "fixed"
                  ? "bg-brand/10 border-brand/30 text-brand font-medium"
                  : "bg-surface-raised border-border text-ink-muted"
              )}
            >
              Fixed
            </button>
            <button
              onClick={() => setModel("random")}
              className={cn(
                "px-3 py-1.5 rounded text-sm border transition-colors",
                model === "random"
                  ? "bg-brand/10 border-brand/30 text-brand font-medium"
                  : "bg-surface-raised border-border text-ink-muted"
              )}
            >
              Random
            </button>
          </div>
          <label className="flex items-center gap-2 text-sm text-ink-muted cursor-pointer">
            <input
              type="checkbox"
              checked={includeTrimFill}
              onChange={(e) => setIncludeTrimFill(e.target.checked)}
              className="rounded"
            />
            Include trim-and-fill analysis
          </label>
        </div>
      </GlassPanel>

      {/* Study Data Input */}
      <GlassPanel className="p-6">
        <h3 className="text-sm font-semibold text-ink mb-3">
          Study Data
          {isLogScale && (
            <span className="ml-2 text-xs text-ink-muted font-normal">
              (enter values on log scale for OR/RR)
            </span>
          )}
        </h3>

        <div className="space-y-2">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 text-xs font-medium text-ink-muted px-1">
            <div className="col-span-3">Study Label</div>
            <div className="col-span-2">
              Effect {isLogScale ? "(log)" : ""}
            </div>
            <div className="col-span-2">SE</div>
            <div className="col-span-2">95% CI Lower</div>
            <div className="col-span-2">95% CI Upper</div>
            <div className="col-span-1"></div>
          </div>

          {/* Study rows */}
          {studies.map((study, i) => (
            <div key={i} className="grid grid-cols-12 gap-2">
              <input
                type="text"
                value={study.studyLabel}
                onChange={(e) => updateStudy(i, "studyLabel", e.target.value)}
                placeholder={`Study ${i + 1}`}
                className="col-span-3 px-2 py-1.5 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 outline-none"
              />
              <input
                type="number"
                step="any"
                value={study.effect}
                onChange={(e) => updateStudy(i, "effect", e.target.value)}
                onBlur={() => autoComputeCI(i)}
                placeholder="0.00"
                className="col-span-2 px-2 py-1.5 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 outline-none"
              />
              <input
                type="number"
                step="any"
                value={study.se}
                onChange={(e) => updateStudy(i, "se", e.target.value)}
                onBlur={() => autoComputeCI(i)}
                placeholder="0.00"
                className="col-span-2 px-2 py-1.5 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 outline-none"
              />
              <input
                type="number"
                step="any"
                value={study.ciLower}
                onChange={(e) => updateStudy(i, "ciLower", e.target.value)}
                placeholder="auto"
                className="col-span-2 px-2 py-1.5 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 outline-none"
              />
              <input
                type="number"
                step="any"
                value={study.ciUpper}
                onChange={(e) => updateStudy(i, "ciUpper", e.target.value)}
                placeholder="auto"
                className="col-span-2 px-2 py-1.5 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 outline-none"
              />
              <div className="col-span-1 flex items-center">
                {studies.length > 2 && (
                  <button
                    onClick={() => removeStudy(i)}
                    className="p-1 text-ink-muted hover:text-red-500"
                  >
                    <Trash size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-3">
          <button
            onClick={addStudy}
            className="px-3 py-1.5 text-sm text-brand hover:bg-brand/10 rounded flex items-center gap-1"
          >
            <Plus size={14} /> Add Study
          </button>

          <button
            onClick={runAnalysis}
            disabled={isRunning}
            className="px-4 py-2 bg-brand text-white rounded text-sm font-medium hover:bg-brand/90 disabled:opacity-50 flex items-center gap-2"
          >
            {isRunning ? (
              <CircleNotch weight="bold" className="animate-spin" size={16} />
            ) : (
              <Play weight="fill" size={16} />
            )}
            {isRunning ? "Running..." : "Run Meta-Analysis"}
          </button>
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-500/5 border border-red-500/20 rounded text-sm text-red-600">
            {error}
          </div>
        )}
      </GlassPanel>

      {/* Results */}
      {result && (
        <>
          {/* Heterogeneity Stats Table */}
          <GlassPanel className="p-6">
            <h3 className="text-sm font-semibold text-ink mb-3">
              Results Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-surface-raised rounded">
                <div className="text-lg font-bold text-ink">
                  {result.studies.length}
                </div>
                <div className="text-xs text-ink-muted">Studies</div>
              </div>
              <div className="text-center p-3 bg-brand/5 rounded">
                <div className="text-lg font-bold text-brand">
                  {isLogScale
                    ? Math.exp(result.pooled.effect).toFixed(3)
                    : result.pooled.effect.toFixed(3)}
                </div>
                <div className="text-xs text-ink-muted">
                  Pooled {effectType}
                </div>
              </div>
              <div className="text-center p-3 bg-surface-raised rounded">
                <div className="text-lg font-bold text-ink">
                  {result.heterogeneity.I2.toFixed(1)}%
                </div>
                <div className="text-xs text-ink-muted">I²</div>
              </div>
              <div className="text-center p-3 bg-surface-raised rounded">
                <div className="text-lg font-bold text-ink">
                  {result.pooled.pValue < 0.001
                    ? "<0.001"
                    : result.pooled.pValue.toFixed(4)}
                </div>
                <div className="text-xs text-ink-muted">p-value</div>
              </div>
            </div>

            {/* Detailed stats */}
            <div className="text-xs text-ink-muted space-y-1">
              <div>
                Pooled {effectType} ({model}-effects):{" "}
                <strong className="text-ink">
                  {isLogScale
                    ? Math.exp(result.pooled.effect).toFixed(3)
                    : result.pooled.effect.toFixed(3)}
                </strong>{" "}
                (95% CI:{" "}
                {isLogScale
                  ? Math.exp(result.pooled.ciLower).toFixed(3)
                  : result.pooled.ciLower.toFixed(3)}{" "}
                to{" "}
                {isLogScale
                  ? Math.exp(result.pooled.ciUpper).toFixed(3)
                  : result.pooled.ciUpper.toFixed(3)}
                ), z = {result.pooled.zValue.toFixed(3)}, p ={" "}
                {result.pooled.pValue < 0.001
                  ? "<0.001"
                  : result.pooled.pValue.toFixed(4)}
              </div>
              <div>
                Heterogeneity: Q = {result.heterogeneity.Q.toFixed(2)} (df ={" "}
                {result.heterogeneity.df}, p ={" "}
                {result.heterogeneity.pValue < 0.001
                  ? "<0.001"
                  : result.heterogeneity.pValue.toFixed(3)}
                ), I² = {result.heterogeneity.I2.toFixed(1)}%, τ² ={" "}
                {result.heterogeneity.tau2.toFixed(4)}
              </div>
              {result.eggerTest && (
                <div>
                  Egger&apos;s test: intercept ={" "}
                  {result.eggerTest.intercept.toFixed(3)}, p ={" "}
                  {result.eggerTest.pValue < 0.001
                    ? "<0.001"
                    : result.eggerTest.pValue.toFixed(3)}
                  {result.eggerTest.pValue < 0.1 && (
                    <span className="text-amber-600 ml-1">
                      (potential publication bias)
                    </span>
                  )}
                </div>
              )}
            </div>
          </GlassPanel>

          {/* Forest Plot */}
          <GlassPanel className="p-6">
            <ForestPlot
              studies={result.studies}
              pooled={result.pooled}
              effectType={effectType}
              heterogeneity={result.heterogeneity}
              title={`Forest Plot — ${analysisName}`}
            />
          </GlassPanel>

          {/* Funnel Plot */}
          <GlassPanel className="p-6">
            <FunnelPlot
              studies={
                trimFillResult
                  ? trimFillResult.adjustedStudies.map((s) => ({
                      ...s,
                      isImputed: s.studyId.startsWith("imputed_"),
                    }))
                  : result.studies
              }
              pooledEffect={result.pooled.effect}
              effectType={effectType}
              eggerTest={result.eggerTest}
              title={`Funnel Plot — ${analysisName}${trimFillResult ? ` (${trimFillResult.imputedCount} imputed studies)` : ""}`}
            />
          </GlassPanel>

          {/* Trim-and-fill results */}
          {trimFillResult && trimFillResult.imputedCount > 0 && (
            <GlassPanel className="p-6 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
              <h3 className="text-sm font-semibold text-ink mb-2">
                Trim-and-Fill Adjusted Estimate
              </h3>
              <div className="text-xs text-ink-muted space-y-1">
                <div>
                  {trimFillResult.imputedCount} studies imputed to correct for
                  asymmetry
                </div>
                <div>
                  Adjusted pooled {effectType}:{" "}
                  <strong className="text-ink">
                    {isLogScale
                      ? Math.exp(trimFillResult.adjustedPooled.effect).toFixed(3)
                      : trimFillResult.adjustedPooled.effect.toFixed(3)}
                  </strong>{" "}
                  (95% CI:{" "}
                  {isLogScale
                    ? Math.exp(trimFillResult.adjustedPooled.ciLower).toFixed(3)
                    : trimFillResult.adjustedPooled.ciLower.toFixed(3)}{" "}
                  to{" "}
                  {isLogScale
                    ? Math.exp(trimFillResult.adjustedPooled.ciUpper).toFixed(3)
                    : trimFillResult.adjustedPooled.ciUpper.toFixed(3)}
                  )
                </div>
              </div>
            </GlassPanel>
          )}
        </>
      )}
    </div>
  );
}
