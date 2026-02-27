"use client";

import { useState } from "react";
import { Warning, WarningCircle, Wrench, CircleNotch } from "@phosphor-icons/react";

export interface CompilationDiagnostic {
  line: number | null;
  message: string;
  severity: "error" | "warning";
}

interface ErrorGutterPanelProps {
  diagnostics: CompilationDiagnostic[];
  onGoToLine?: (line: number) => void;
  onFixError?: (diagnostic: CompilationDiagnostic) => void;
}

export function ErrorGutterPanel({ diagnostics, onGoToLine, onFixError }: ErrorGutterPanelProps) {
  const [fixingIndex, setFixingIndex] = useState<number | null>(null);

  if (diagnostics.length === 0) return null;

  const errors = diagnostics.filter((d) => d.severity === "error");
  const warnings = diagnostics.filter((d) => d.severity === "warning");

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
      <div className="max-h-32 overflow-y-auto border-t border-border-subtle">
        {diagnostics.map((d, i) => (
          <div
            key={i}
            className="flex items-start gap-2 px-4 py-1.5 text-[11px] hover:bg-surface-raised/50 transition-colors group"
          >
            {d.severity === "error" ? (
              <WarningCircle size={12} className="text-red-400 shrink-0 mt-0.5" />
            ) : (
              <Warning size={12} className="text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              {d.line != null && (
                <button
                  onClick={() => onGoToLine?.(d.line!)}
                  className="text-brand hover:underline font-mono mr-1"
                >
                  L{d.line}
                </button>
              )}
              <span className="text-ink-muted">{d.message}</span>
            </div>
            {d.severity === "error" && onFixError && (
              <button
                onClick={() => {
                  setFixingIndex(i);
                  onFixError(d);
                  setTimeout(() => setFixingIndex(null), 3000);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 rounded text-ink-muted hover:text-brand hover:bg-brand/10 transition-all shrink-0"
                title="AI fix"
              >
                {fixingIndex === i ? (
                  <CircleNotch size={12} className="animate-spin" />
                ) : (
                  <Wrench size={12} />
                )}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
