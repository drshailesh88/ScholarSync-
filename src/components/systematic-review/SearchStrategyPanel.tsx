"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import {
  MagnifyingGlass,
  CircleNotch,
  ArrowRight,
  Copy,
  Check,
  Sparkle,
} from "@phosphor-icons/react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { PRESSChecklistPanel } from "./PRESSChecklistPanel";
import {
  useSystematicReviewStore,
  type PICOInput,
  type SearchStrategy,
} from "@/stores/systematic-review-store";

interface SearchStrategyPanelProps {
  projectId: number;
}

const PICO_FIELDS = [
  ["population", "Population", "e.g., Adults with type 2 diabetes"],
  ["intervention", "Intervention", "e.g., Metformin monotherapy"],
  ["comparison", "Comparison", "e.g., Sulfonylurea monotherapy"],
  ["outcome", "Outcome", "e.g., HbA1c reduction at 12 months"],
] as const;

const MESH_LIBRARY: Record<keyof PICOInput, string[]> = {
  population: [
    "Diabetes Mellitus, Type 2",
    "Adults",
    "Aged",
    "Obesity",
    "Hypertension",
    "Cardiovascular Diseases",
  ],
  intervention: [
    "Metformin",
    "Hypoglycemic Agents",
    "Exercise Therapy",
    "Diet Therapy",
    "Insulin",
    "Drug Therapy, Combination",
  ],
  comparison: [
    "Placebos",
    "Standard of Care",
    "Sulfonylurea Compounds",
    "Insulin",
    "Usual Care",
    "Watchful Waiting",
  ],
  outcome: [
    "Hemoglobin A, Glycosylated",
    "Treatment Outcome",
    "Mortality",
    "Quality of Life",
    "Hospitalization",
    "Blood Glucose",
  ],
};

type MeshSelections = Record<keyof PICOInput, string[]>;

function emptyMeshSelections(): MeshSelections {
  return {
    population: [],
    intervention: [],
    comparison: [],
    outcome: [],
  };
}

function parseTerms(value: string): string[] {
  return value
    .split(/[,\n;]/)
    .map((term) => term.trim())
    .filter(Boolean);
}

function buildBooleanBlock(meshTerms: string[], freeTextTerms: string[]): string {
  const parts = [
    ...meshTerms.map((term) => `"${term}"[MeSH Terms]`),
    ...freeTextTerms.map((term) => `"${term}"[Title/Abstract]`),
  ];

  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];

  return `(${parts.join(" OR ")})`;
}

function hydrateMeshSelections(strategy: SearchStrategy | null): MeshSelections {
  const next = emptyMeshSelections();
  strategy?.blocks.forEach((block) => {
    const key = block.picoElement.toLowerCase() as keyof PICOInput;
    if (key in next) {
      next[key] = block.meshTerms;
    }
  });
  return next;
}

export function SearchStrategyPanel({ projectId }: SearchStrategyPanelProps) {
  const {
    pico,
    setPICO,
    generatedStrategy: strategy,
    setGeneratedStrategy,
    setActiveTab,
  } = useSystematicReviewStore();

  const [error, setError] = useState<string | null>(null);
  const [meshSelections, setMeshSelections] = useState<MeshSelections>(
    emptyMeshSelections
  );
  const [copied, setCopied] = useState(false);

  const loading = useSystematicReviewStore(
    (s) => s.reviewConfig === null && s.projectId !== null
  );

  useEffect(() => {
    if (strategy) {
      setMeshSelections(hydrateMeshSelections(strategy));
    }
  }, [strategy]);

  const previewBlocks = useMemo(() => {
    return PICO_FIELDS.map(([key, label]) => {
      const freeTextTerms = parseTerms(pico[key]);
      const meshTerms = meshSelections[key];
      return {
        key,
        label,
        meshTerms,
        freeTextTerms,
        booleanBlock: buildBooleanBlock(meshTerms, freeTextTerms),
      };
    }).filter((block) => block.booleanBlock);
  }, [meshSelections, pico]);

  const previewSearchString = useMemo(() => {
    if (previewBlocks.length === 0) return "";
    return previewBlocks.map((block) => block.booleanBlock).join("\nAND\n");
  }, [previewBlocks]);

  const addMeshTerm = useCallback((field: keyof PICOInput, term: string) => {
    setMeshSelections((current) => {
      if (current[field].includes(term)) return current;
      return {
        ...current,
        [field]: [...current[field], term],
      };
    });
  }, []);

  const removeMeshTerm = useCallback((field: keyof PICOInput, term: string) => {
    setMeshSelections((current) => ({
      ...current,
      [field]: current[field].filter((item) => item !== term),
    }));
  }, []);

  const generateStrategy = useCallback(async () => {
    if (!pico.population || !pico.intervention || !pico.outcome) return;

    setGeneratedStrategy(null);
    setError(null);

    try {
      const res = await fetch("/api/systematic-review/search-strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pico),
      });
      if (!res.ok) throw new Error("Failed to generate strategy");
      const data = await res.json();
      setGeneratedStrategy(data);
      setMeshSelections(hydrateMeshSelections(data));

      await fetch("/api/systematic-review/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          pico,
          searchStrategy: data,
        }),
      });
    } catch {
      setError("Failed to generate search strategy. Please try again.");
    }
  }, [pico, projectId, setGeneratedStrategy]);

  const copyPreview = useCallback(async () => {
    if (!previewSearchString) return;
    await navigator.clipboard.writeText(previewSearchString);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }, [previewSearchString]);

  return (
    <div className="sr-content space-y-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
        <GlassPanel className="sr-panel">
          <h2 className="sr-panel-title">
            <MagnifyingGlass weight="duotone" className="text-brand" />
            Search Strategy Builder
          </h2>
          <p className="mb-5 text-sm text-ink-muted">
            Build PICO blocks on the left, refine with MeSH suggestions, and
            preview the Boolean logic in real time before generating the final
            PubMed strategy.
          </p>

          <div className="space-y-4">
            {PICO_FIELDS.map(([key, label, placeholder]) => {
              const fieldValue = pico[key];
              const fieldTerms = parseTerms(fieldValue);
              const suggestions = MESH_LIBRARY[key].filter((term) => {
                const query = fieldValue.trim().toLowerCase();
                if (!query) return true;
                return term.toLowerCase().includes(query);
              }).slice(0, 5);

              return (
                <div
                  key={key}
                  className="rounded-[1.35rem] border border-border/70 bg-surface-raised/45 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <label className="text-sm font-semibold text-ink">
                      {label}{" "}
                      {key !== "comparison" && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                      PICO block
                    </span>
                  </div>

                  <input
                    aria-label={`${label} field`}
                    type="text"
                    value={fieldValue}
                    onChange={(e) => setPICO({ ...pico, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="mt-3 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
                  />

                  <div className="mt-3">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
                      Selected MeSH terms
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {meshSelections[key].length === 0 ? (
                        <span className="rounded-full border border-dashed border-border px-3 py-1 text-xs text-ink-muted">
                          No MeSH terms selected yet
                        </span>
                      ) : (
                        meshSelections[key].map((term) => (
                          <button
                            key={term}
                            onClick={() => removeMeshTerm(key, term)}
                            className="rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-500/20"
                          >
                            {term} [MeSH] &#x2715;
                          </button>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
                      MeSH autocomplete
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {suggestions.map((term) => (
                        <button
                          key={term}
                          onClick={() => addMeshTerm(key, term)}
                          disabled={meshSelections[key].includes(term)}
                          className="rounded-full border border-border bg-white px-3 py-1 text-xs text-ink transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-45"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {fieldTerms.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
                        Free-text terms
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {fieldTerms.map((term) => (
                          <span
                            key={term}
                            className="rounded-full bg-sky-500/12 px-3 py-1 text-xs font-medium text-sky-700"
                          >
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {error && (
            <div className="mt-4 flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-300"
              >
                &#x2715;
              </button>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={generateStrategy}
              disabled={
                loading || !pico.population || !pico.intervention || !pico.outcome
              }
              className="sr-btn sr-btn-primary"
            >
              {loading ? (
                <CircleNotch weight="bold" className="animate-spin" size={16} />
              ) : (
                <Sparkle weight="bold" size={16} />
              )}
              Generate Search Strategy
            </button>
          </div>
        </GlassPanel>

        <GlassPanel className="sr-panel">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="sr-panel-title">
                <Sparkle size={18} className="text-brand" />
                Live Preview
              </h3>
              <p className="mb-4 text-sm text-ink-muted">
                Review the Boolean logic assembled from your PICO blocks and
                selected MeSH terms.
              </p>
            </div>

            <button
              onClick={copyPreview}
              disabled={!previewSearchString}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-ink transition-colors hover:bg-surface-raised disabled:cursor-not-allowed disabled:opacity-45"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="space-y-4">
            {previewBlocks.length === 0 ? (
              <div className="rounded-[1.35rem] border border-dashed border-border px-5 py-10 text-center text-sm text-ink-muted">
                Start entering PICO concepts to build a live Boolean preview.
              </div>
            ) : (
              previewBlocks.map((block) => (
                <div
                  key={block.key}
                  className="rounded-[1.35rem] border border-border/70 bg-surface-raised/45 p-4"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-ink">
                      {block.label}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                      {block.meshTerms.length} MeSH / {block.freeTextTerms.length} text
                    </span>
                  </div>
                  <code className="block whitespace-pre-wrap rounded-xl border border-border bg-white px-3 py-3 text-xs leading-6 text-ink">
                    {block.booleanBlock}
                  </code>
                </div>
              ))
            )}

            <div className="rounded-[1.35rem] border border-border/70 bg-warm-muted/35 p-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-ink">
                  Complete Boolean preview
                </span>
                <span className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                  Real-time
                </span>
              </div>
              <pre className="min-h-[180px] whitespace-pre-wrap rounded-xl border border-border bg-white px-3 py-3 text-xs leading-6 text-ink">
                {previewSearchString || "No search string yet."}
              </pre>
            </div>

            {strategy && (
              <div className="rounded-[1.35rem] border border-border/70 bg-surface-raised/45 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-ink">
                    AI-generated strategy
                  </span>
                  {strategy.estimatedResults !== undefined && (
                    <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                      {strategy.estimatedResults.toLocaleString()} estimated
                      results
                    </span>
                  )}
                </div>
                <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-border bg-white px-3 py-3 text-xs leading-6 text-ink">
                  {strategy.fullSearchString}
                </pre>

                {strategy.suggestedFilters.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {strategy.suggestedFilters.map((filter) => (
                      <span
                        key={filter}
                        className="rounded-full bg-amber-500/12 px-3 py-1 text-xs font-medium text-amber-700"
                      >
                        {filter}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </GlassPanel>
      </div>

      {strategy && (
        <GlassPanel className="sr-panel">
          <h3 className="sr-panel-title">PRESS Review</h3>
          <PRESSChecklistPanel projectId={projectId} />

          <div className="mt-6 border-t border-border pt-4">
            <button
              onClick={() => setActiveTab("import")}
              className="sr-btn sr-btn-primary"
            >
              Import Papers Using This Strategy
              <ArrowRight weight="bold" size={16} />
            </button>
          </div>
        </GlassPanel>
      )}
    </div>
  );
}
