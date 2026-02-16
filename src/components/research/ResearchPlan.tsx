"use client";

import { useState } from "react";
import { MagnifyingGlass, PencilSimple, X, Lightbulb } from "@phosphor-icons/react";
import type { SearchPlan } from "@/lib/research/types";

interface ResearchPlanProps {
  plan: SearchPlan;
  isLoading: boolean;
  onRunSearch: () => void;
  onCancel: () => void;
  onUpdatePlan: (plan: SearchPlan) => void;
}

export function ResearchPlan({
  plan,
  isLoading,
  onRunSearch,
  onCancel,
  onUpdatePlan,
}: ResearchPlanProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuery, setEditedQuery] = useState(plan.pubmedQuery);

  if (isLoading) {
    return (
      <div className="mx-3 p-3 rounded-lg bg-surface-raised border border-border-subtle animate-pulse">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={14} className="text-brand" />
          <span className="text-xs font-medium text-ink">
            Generating search plan...
          </span>
        </div>
        <div className="space-y-2">
          <div className="h-2.5 bg-surface rounded w-full" />
          <div className="h-2.5 bg-surface rounded w-5/6" />
          <div className="h-2.5 bg-surface rounded w-4/6" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-3 p-3 rounded-lg bg-surface-raised border border-border-subtle space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb size={14} className="text-brand" weight="fill" />
          <span className="text-xs font-medium text-ink">Research Plan</span>
        </div>
        <button
          onClick={onCancel}
          className="text-ink-muted hover:text-ink"
        >
          <X size={12} />
        </button>
      </div>

      {/* Original question */}
      <div>
        <span className="text-[10px] font-medium text-ink-muted uppercase tracking-wider">
          Your question
        </span>
        <p className="text-xs text-ink mt-0.5 italic">
          &ldquo;{plan.originalQuery}&rdquo;
        </p>
      </div>

      {/* PubMed query */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-medium text-ink-muted uppercase tracking-wider">
            PubMed Query
          </span>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1 text-[10px] text-brand hover:text-brand-hover"
          >
            <PencilSimple size={10} />
            {isEditing ? "Done" : "Edit"}
          </button>
        </div>
        {isEditing ? (
          <textarea
            value={editedQuery}
            onChange={(e) => setEditedQuery(e.target.value)}
            onBlur={() => {
              if (editedQuery !== plan.pubmedQuery) {
                onUpdatePlan({ ...plan, pubmedQuery: editedQuery });
              }
            }}
            className="w-full p-2 rounded bg-surface border border-border text-[10px] text-ink font-mono focus:outline-none focus:ring-1 focus:ring-brand/40 resize-none"
            rows={4}
          />
        ) : (
          <div className="p-2 rounded bg-surface border border-border-subtle">
            <p className="text-[10px] text-ink font-mono leading-relaxed break-all">
              {plan.pubmedQuery}
            </p>
          </div>
        )}
      </div>

      {/* MeSH terms */}
      {plan.meshTerms.length > 0 && (
        <div>
          <span className="text-[10px] font-medium text-ink-muted uppercase tracking-wider">
            MeSH Terms
          </span>
          <div className="flex flex-wrap gap-1 mt-1">
            {plan.meshTerms.map((term, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 text-[10px] font-medium"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Filters applied */}
      <div>
        <span className="text-[10px] font-medium text-ink-muted uppercase tracking-wider">
          Filters
        </span>
        <div className="text-[10px] text-ink-muted mt-1 space-y-0.5">
          {plan.suggestedFilters?.dateFrom && (
            <p>
              Date: {plan.suggestedFilters.dateFrom}–
              {plan.suggestedFilters.dateTo || new Date().getFullYear()}
            </p>
          )}
          {plan.suggestedFilters?.studyTypes?.length ? (
            <p>Study types: {plan.suggestedFilters.studyTypes.join(", ")}</p>
          ) : null}
        </div>
      </div>

      {/* Estimated results */}
      <p className="text-[10px] text-ink-muted">
        Estimated results: {plan.estimatedResults}
      </p>

      {/* Rationale */}
      {plan.rationale && (
        <p className="text-[10px] text-ink-muted italic">
          {plan.rationale}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={onRunSearch}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-brand text-white text-xs font-medium hover:bg-brand-hover transition-colors"
        >
          <MagnifyingGlass size={12} />
          Run Search
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-1.5 rounded-md text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
