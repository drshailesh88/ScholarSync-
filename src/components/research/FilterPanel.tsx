"use client";

import type { ResearchSearchFilters, StudyType } from "@/lib/research/types";

interface FilterPanelProps {
  filters: ResearchSearchFilters;
  onFiltersChange: (filters: Partial<ResearchSearchFilters>) => void;
}

const STUDY_TYPE_OPTIONS: { value: StudyType; label: string }[] = [
  { value: "rct", label: "RCT" },
  { value: "systematic_review", label: "Systematic Review" },
  { value: "meta_analysis", label: "Meta-Analysis" },
  { value: "cohort", label: "Cohort" },
  { value: "case_control", label: "Case-Control" },
  { value: "clinical_trial", label: "Clinical Trial" },
  { value: "case_report", label: "Case Report" },
  { value: "guideline", label: "Guideline" },
];

export function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const toggleStudyType = (type: StudyType) => {
    const current = filters.studyTypes;
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    onFiltersChange({ studyTypes: updated });
  };

  return (
    <div className="p-3 rounded-lg bg-surface-raised border border-border-subtle space-y-3">
      {/* Date range */}
      <div>
        <label className="text-[10px] font-medium text-ink-muted uppercase tracking-wider block mb-1">
          Date Range
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={filters.dateFrom}
            onChange={(e) =>
              onFiltersChange({ dateFrom: parseInt(e.target.value) || 2000 })
            }
            min={1900}
            max={new Date().getFullYear()}
            className="w-20 px-2 py-1 rounded bg-surface border border-border text-ink text-xs focus:outline-none focus:ring-1 focus:ring-brand/40"
          />
          <span className="text-xs text-ink-muted">to</span>
          <input
            type="number"
            value={filters.dateTo}
            onChange={(e) =>
              onFiltersChange({ dateTo: parseInt(e.target.value) || new Date().getFullYear() })
            }
            min={1900}
            max={new Date().getFullYear()}
            className="w-20 px-2 py-1 rounded bg-surface border border-border text-ink text-xs focus:outline-none focus:ring-1 focus:ring-brand/40"
          />
        </div>
      </div>

      {/* Study types */}
      <div>
        <label className="text-[10px] font-medium text-ink-muted uppercase tracking-wider block mb-1">
          Study Type
        </label>
        <div className="flex flex-wrap gap-1">
          {STUDY_TYPE_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => toggleStudyType(value)}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                filters.studyTypes.includes(value)
                  ? "bg-brand/15 text-brand border border-brand/30"
                  : "bg-surface border border-border text-ink-muted hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Full text only */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="fullTextOnly"
          checked={filters.fullTextOnly}
          onChange={(e) => onFiltersChange({ fullTextOnly: e.target.checked })}
          className="rounded border-border"
        />
        <label htmlFor="fullTextOnly" className="text-xs text-ink-muted">
          Full text available only
        </label>
      </div>

      {/* Source databases */}
      <div>
        <label className="text-[10px] font-medium text-ink-muted uppercase tracking-wider block mb-1">
          Sources
        </label>
        <div className="flex gap-2">
          <label className="flex items-center gap-1 text-xs text-ink-muted">
            <input
              type="checkbox"
              checked={filters.sources.includes("pubmed")}
              onChange={(e) => {
                const sources = e.target.checked
                  ? [...new Set([...filters.sources, "pubmed" as const])]
                  : filters.sources.filter((s) => s !== "pubmed");
                onFiltersChange({ sources: sources.length > 0 ? sources : ["pubmed"] });
              }}
              className="rounded border-border"
            />
            PubMed
          </label>
          <label className="flex items-center gap-1 text-xs text-ink-muted">
            <input
              type="checkbox"
              checked={filters.sources.includes("semantic_scholar")}
              onChange={(e) => {
                const sources = e.target.checked
                  ? [...new Set([...filters.sources, "semantic_scholar" as const])]
                  : filters.sources.filter((s) => s !== "semantic_scholar");
                onFiltersChange({ sources: sources.length > 0 ? sources : ["pubmed"] });
              }}
              className="rounded border-border"
            />
            Semantic Scholar
          </label>
        </div>
      </div>
    </div>
  );
}
