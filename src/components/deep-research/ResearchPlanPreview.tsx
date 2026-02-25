"use client";

import { useState, useCallback } from "react";
import {
  Play,
  RefreshCw,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import type { PlanPerspective } from "./types";

interface ResearchPlanPreviewProps {
  perspectives: PlanPerspective[];
  onConfirm: (perspectives: PlanPerspective[]) => void;
  onRegenerate: () => void;
  isRegenerating?: boolean;
}

export function ResearchPlanPreview({
  perspectives: initialPerspectives,
  onConfirm,
  onRegenerate,
  isRegenerating = false,
}: ResearchPlanPreviewProps) {
  const [perspectives, setPerspectives] = useState<PlanPerspective[]>(initialPerspectives);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const updatePerspectiveName = useCallback((index: number, name: string) => {
    setPerspectives((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], name };
      return next;
    });
  }, []);

  const updateQuery = useCallback((pIdx: number, qIdx: number, value: string) => {
    setPerspectives((prev) => {
      const next = [...prev];
      const queries = [...next[pIdx].queries];
      queries[qIdx] = value;
      next[pIdx] = { ...next[pIdx], queries };
      return next;
    });
  }, []);

  const addQuery = useCallback((pIdx: number) => {
    setPerspectives((prev) => {
      const next = [...prev];
      next[pIdx] = { ...next[pIdx], queries: [...next[pIdx].queries, ""] };
      return next;
    });
  }, []);

  const removeQuery = useCallback((pIdx: number, qIdx: number) => {
    setPerspectives((prev) => {
      const next = [...prev];
      const queries = next[pIdx].queries.filter((_, i) => i !== qIdx);
      next[pIdx] = { ...next[pIdx], queries };
      return next;
    });
  }, []);

  const toggleExpanded = useCallback((index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Sparkles size={16} className="text-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Research Plan</h3>
              <p className="text-gray-400 text-xs">
                Review and customize the research perspectives before starting
              </p>
            </div>
          </div>
          <button
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 hover:text-white transition-colors disabled:opacity-50"
          >
            <RefreshCw size={12} className={isRegenerating ? "animate-spin" : ""} />
            Regenerate
          </button>
        </div>

        {/* Perspectives list */}
        <div className="divide-y divide-gray-700/30">
          {perspectives.map((perspective, pIdx) => (
            <div key={pIdx} className="px-6 py-3">
              {/* Perspective header */}
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold flex items-center justify-center">
                  {pIdx + 1}
                </span>
                <input
                  type="text"
                  value={perspective.name}
                  onChange={(e) => updatePerspectiveName(pIdx, e.target.value)}
                  className="flex-1 bg-transparent text-white text-sm font-medium border-none outline-none focus:ring-0 placeholder-gray-500"
                  placeholder="Perspective name..."
                />
                <button
                  onClick={() => toggleExpanded(pIdx)}
                  className="p-1 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {expandedIndex === pIdx ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              </div>

              {/* Expanded queries */}
              {expandedIndex === pIdx && (
                <div className="mt-3 ml-9 space-y-2">
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
                    Search Queries
                  </p>
                  {perspective.queries.map((query, qIdx) => (
                    <div key={qIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => updateQuery(pIdx, qIdx, e.target.value)}
                        className="flex-1 bg-gray-900/50 border border-gray-700/50 rounded-lg px-3 py-1.5 text-gray-300 text-xs outline-none focus:border-blue-500/50 transition-colors placeholder-gray-600"
                        placeholder="Search query..."
                      />
                      {perspective.queries.length > 1 && (
                        <button
                          onClick={() => removeQuery(pIdx, qIdx)}
                          className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addQuery(pIdx)}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-400 transition-colors mt-1"
                  >
                    <Plus size={12} />
                    Add query
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer with confirm button */}
        <div className="px-6 py-4 border-t border-gray-700/50 flex justify-end">
          <button
            onClick={() => onConfirm(perspectives)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            <Play size={14} />
            Confirm &amp; Start Research
          </button>
        </div>
      </div>
    </div>
  );
}
