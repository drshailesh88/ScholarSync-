"use client";

import { useCallback } from "react";
import {
  MagnifyingGlass,
  CircleNotch,
  ArrowRight,
} from "@phosphor-icons/react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { useSystematicReviewStore } from "@/stores/systematic-review-store";

interface SearchStrategyPanelProps {
  projectId: number;
}

export function SearchStrategyPanel({ projectId }: SearchStrategyPanelProps) {
  const {
    pico,
    setPICO,
    generatedStrategy: strategy,
    setGeneratedStrategy,
    setActiveTab,
  } = useSystematicReviewStore();

  const loading = useSystematicReviewStore(
    (s) => s.reviewConfig === null && s.projectId !== null
  );

  const generateStrategy = useCallback(async () => {
    if (!pico.population || !pico.intervention || !pico.outcome) return;

    // Optimistic: mark generating
    setGeneratedStrategy(null);

    try {
      const res = await fetch("/api/systematic-review/search-strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pico),
      });
      if (!res.ok) throw new Error("Failed to generate strategy");
      const data = await res.json();
      setGeneratedStrategy(data);

      // Persist strategy to project config
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
      // Error handled by UI state
    }
  }, [pico, projectId, setGeneratedStrategy]);

  return (
    <div className="space-y-6 max-w-4xl">
      <GlassPanel className="p-6">
        <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <MagnifyingGlass weight="duotone" className="text-brand" />
          PICO Framework
        </h2>
        <p className="text-sm text-ink-muted mb-4">
          Define your research question using the PICO framework. The AI will
          generate a comprehensive PubMed search strategy with MeSH terms and
          Boolean operators.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(
            [
              ["population", "Population", "e.g., Adults with type 2 diabetes"],
              ["intervention", "Intervention", "e.g., Metformin monotherapy"],
              ["comparison", "Comparison", "e.g., Sulfonylurea monotherapy"],
              ["outcome", "Outcome", "e.g., HbA1c reduction at 12 months"],
            ] as const
          ).map(([key, label, placeholder]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-ink mb-1">
                {label}{" "}
                {key !== "comparison" && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <input
                type="text"
                value={pico[key]}
                onChange={(e) =>
                  setPICO({ ...pico, [key]: e.target.value })
                }
                placeholder={placeholder}
                className="w-full px-3 py-2 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 focus:border-brand outline-none"
              />
            </div>
          ))}
        </div>

        <button
          onClick={generateStrategy}
          disabled={
            loading || !pico.population || !pico.intervention || !pico.outcome
          }
          className="mt-4 px-4 py-2 bg-brand text-white rounded text-sm font-medium hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <CircleNotch weight="bold" className="animate-spin" size={16} />
          ) : (
            <MagnifyingGlass weight="bold" size={16} />
          )}
          Generate Search Strategy
        </button>
      </GlassPanel>

      {strategy && (
        <GlassPanel className="p-6">
          <h3 className="text-lg font-semibold text-ink mb-4">
            Generated Search Strategy
          </h3>

          {strategy.estimatedResults !== undefined && (
            <div className="mb-4 px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded text-sm text-blue-700">
              Estimated PubMed results:{" "}
              <strong>{strategy.estimatedResults.toLocaleString()}</strong>
            </div>
          )}

          {/* PICO Blocks */}
          <div className="space-y-3 mb-6">
            {strategy.blocks.map((block, i) => (
              <div key={i} className="border border-border rounded p-3">
                <div className="text-sm font-medium text-ink capitalize mb-2">
                  {block.picoElement}
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {block.meshTerms.map((term, j) => (
                    <span
                      key={j}
                      className="px-2 py-0.5 bg-emerald-500/10 text-emerald-700 text-xs rounded"
                    >
                      {term} [MeSH]
                    </span>
                  ))}
                  {block.freeTextTerms.map((term, j) => (
                    <span
                      key={j}
                      className="px-2 py-0.5 bg-sky-500/10 text-sky-700 text-xs rounded"
                    >
                      {term}
                    </span>
                  ))}
                </div>
                <code className="block text-xs text-ink-muted bg-surface-raised p-2 rounded overflow-x-auto">
                  {block.booleanBlock}
                </code>
              </div>
            ))}
          </div>

          {/* Full Search String */}
          <div>
            <div className="text-sm font-medium text-ink mb-2">
              Complete PubMed Search String
            </div>
            <div className="relative">
              <pre className="text-xs text-ink bg-surface-raised p-3 rounded border border-border overflow-x-auto whitespace-pre-wrap">
                {strategy.fullSearchString}
              </pre>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(strategy.fullSearchString)
                }
                className="absolute top-2 right-2 px-2 py-1 text-xs bg-brand/10 text-brand rounded hover:bg-brand/20"
              >
                Copy
              </button>
            </div>
          </div>

          {strategy.suggestedFilters.length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-medium text-ink mb-1">
                Suggested Filters
              </div>
              <div className="flex flex-wrap gap-1">
                {strategy.suggestedFilters.map((filter, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-amber-500/10 text-amber-700 text-xs rounded"
                  >
                    {filter}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA to import papers */}
          <div className="mt-6 pt-4 border-t border-border">
            <button
              onClick={() => setActiveTab("import")}
              className="px-4 py-2 bg-brand text-white rounded text-sm font-medium hover:bg-brand/90 flex items-center gap-2"
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
