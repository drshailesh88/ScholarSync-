"use client";

import { useState, useMemo } from "react";
import { Warning, WarningCircle, Wrench, CircleNotch, Lightbulb, CaretDown, CaretRight, Check } from "@phosphor-icons/react";
import { enrichError, type EnrichedDiagnostic } from "./error-intelligence";

export interface CompilationDiagnostic {
  line: number | null;
  message: string;
  severity: "error" | "warning";
}

interface ErrorGutterPanelProps {
  diagnostics: CompilationDiagnostic[];
  documentContent?: string;
  onGoToLine?: (line: number) => void;
  onFixError?: (diagnostic: CompilationDiagnostic, context: { from: number; to: number; content: string }) => void;
}

export function ErrorGutterPanel({ diagnostics, documentContent = "", onGoToLine, onFixError }: ErrorGutterPanelProps) {
  const [fixingIndex, setFixingIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [fixedIndex, setFixedIndex] = useState<number | null>(null);

  // Enrich diagnostics with human-readable explanations
  const enriched = useMemo(
    () => diagnostics.map((d) => ({ ...d, enriched: enrichError(d.message) })),
    [diagnostics]
  );

  if (diagnostics.length === 0) return null;

  const errors = diagnostics.filter((d) => d.severity === "error");
  const warnings = diagnostics.filter((d) => d.severity === "warning");

  const categoryLabel = (cat: EnrichedDiagnostic["category"]) => {
    const labels: Record<string, string> = {
      syntax: "Syntax",
      package: "Package",
      math: "Math",
      reference: "Reference",
      font: "Font",
      file: "File",
      other: "General",
    };
    return labels[cat] ?? "General";
  };

  return (
    <div className="border-t border-border-subtle bg-surface/80">
      {/* Summary bar */}
      <div className="flex items-center gap-3 px-4 py-1.5 text-[10px]">
        {errors.length > 0 && (
          <span className="flex items-center gap-1 text-red-400 font-medium">
            <WarningCircle size={12} />
            {errors.length} error{errors.length > 1 ? "s" : ""}
          </span>
        )}
        {warnings.length > 0 && (
          <span className="flex items-center gap-1 text-amber-400 font-medium">
            <Warning size={12} />
            {warnings.length} warning{warnings.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Scrollable list */}
      <div className="max-h-48 overflow-y-auto border-t border-border-subtle">
        {enriched.map((d, i) => {
          const isExpanded = expandedIndex === i;
          const hasExplanation = d.enriched.explanation !== d.enriched.raw;
          const hasSuggestion = !!d.enriched.suggestion;

          return (
            <div key={i} className="border-b border-border-subtle/50 last:border-b-0">
              {/* Main error row */}
              <div
                className="flex items-start gap-2 px-4 py-1.5 text-[11px] hover:bg-surface-raised/50 transition-colors group cursor-pointer"
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
              >
                {d.severity === "error" ? (
                  <WarningCircle size={12} className="text-red-400 shrink-0 mt-0.5" />
                ) : (
                  <Warning size={12} className="text-amber-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    {d.line != null && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onGoToLine?.(d.line!);
                        }}
                        className="text-brand hover:underline font-mono shrink-0"
                      >
                        L{d.line}
                      </button>
                    )}
                    {hasExplanation && (
                      <span className="text-[8px] px-1 py-0.5 rounded bg-brand/10 text-brand font-medium shrink-0">
                        {categoryLabel(d.enriched.category)}
                      </span>
                    )}
                  </div>
                  {/* Show enriched explanation when available, raw message otherwise */}
                  <span className="text-ink-muted">
                    {hasExplanation ? d.enriched.explanation : d.message}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {d.severity === "error" && onFixError && d.line != null && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFixingIndex(i);
                        // Extract context: error line ± 5 lines
                        const lines = documentContent.split("\n");
                        const errorLineIdx = d.line! - 1; // 0-based
                        const contextStart = Math.max(0, errorLineIdx - 5);
                        const contextEnd = Math.min(lines.length, errorLineIdx + 6);
                        const context = lines.slice(contextStart, contextEnd).join("\n");

                        onFixError(d, {
                          from: contextStart + 1, // 1-based for consistency
                          to: contextEnd,
                          content: context
                        });

                        // Show success state after a delay
                        setTimeout(() => {
                          setFixingIndex(null);
                          setFixedIndex(i);
                          setTimeout(() => setFixedIndex(null), 2000);
                        }, 2000);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded text-ink-muted hover:text-brand hover:bg-brand/10 transition-all"
                      title="AI fix"
                    >
                      {fixingIndex === i ? (
                        <CircleNotch size={12} className="animate-spin" />
                      ) : fixedIndex === i ? (
                        <Check size={12} className="text-emerald-500" />
                      ) : (
                        <Wrench size={12} />
                      )}
                    </button>
                  )}
                  {(hasExplanation || hasSuggestion) && (
                    isExpanded ? (
                      <CaretDown size={10} className="text-ink-muted" />
                    ) : (
                      <CaretRight size={10} className="text-ink-muted" />
                    )
                  )}
                </div>
              </div>

              {/* Expanded detail panel */}
              {isExpanded && (hasExplanation || hasSuggestion) && (
                <div className="px-4 pb-2 ml-6 space-y-1.5">
                  {/* Show raw message when we replaced it with the explanation */}
                  {hasExplanation && (
                    <p className="text-[10px] text-ink-muted/60 font-mono break-all">
                      {d.message}
                    </p>
                  )}
                  {hasSuggestion && (
                    <div className="flex items-start gap-1.5 text-[10px] text-emerald-400">
                      <Lightbulb size={12} className="shrink-0 mt-0.5" />
                      <span>{d.enriched.suggestion}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
