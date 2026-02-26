"use client";

import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import type { ProgressStage } from "./types";
import { STAGE_LABELS } from "./types";

interface ProgressStepperProps {
  stages: ProgressStage[];
  currentMessage?: string;
  progress?: number;
}

export function ProgressStepper({ stages, currentMessage, progress }: ProgressStepperProps) {
  return (
    <div className="w-full max-w-xs print:hidden">
      <div className="sticky top-24">
        {/* Progress bar */}
        {typeof progress === "number" && progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Stage timeline */}
        <div className="space-y-0.5">
          {stages.map((stage, idx) => {
            const label = STAGE_LABELS[stage.id] || stage.label;
            const isActive = stage.status === "active";
            const isCompleted = stage.status === "completed";
            const isError = stage.status === "error";

            return (
              <div key={stage.id}>
                <div className="flex items-start gap-3 relative">
                  {/* Connector line */}
                  {idx < stages.length - 1 && (
                    <div
                      className={`absolute left-[11px] top-6 w-px ${
                        isActive && currentMessage ? "h-12" : "h-6"
                      } ${
                        isCompleted ? "bg-blue-500/50" : "bg-gray-300 dark:bg-gray-700/50"
                      }`}
                    />
                  )}

                  {/* Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    {isCompleted ? (
                      <CheckCircle2 size={16} className="text-blue-400" />
                    ) : isActive ? (
                      <Loader2 size={16} className="text-blue-400 animate-spin" />
                    ) : isError ? (
                      <Circle size={16} className="text-red-400" />
                    ) : (
                      <Circle size={16} className="text-gray-600" />
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-xs leading-relaxed py-1 ${
                      isActive
                        ? "text-blue-400 font-medium"
                        : isCompleted
                          ? "text-gray-500 dark:text-gray-400"
                          : isError
                            ? "text-red-400"
                            : "text-gray-400 dark:text-gray-600"
                    }`}
                  >
                    {label}
                  </span>
                </div>

                {/* Inline current message below active stage */}
                {isActive && currentMessage && (
                  <div className="ml-[28px] mt-0.5 mb-1">
                    <p className="text-[10px] text-gray-500 leading-snug truncate max-w-[200px]">
                      {currentMessage}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Helper to build stages from SSE events ──────────────────────────
export function buildStagesFromEvents(
  seenStages: string[],
  currentStage: string | null
): ProgressStage[] {
  const allStageIds = [
    "search-round-1",
    "citation-traversal",
    "search-round-2",
    "full-text-extraction",
    "data-extraction",
    "synthesis-perspectives",
    "synthesis-summary",
    "synthesis-tables",
    "synthesis-critique",
  ];

  return allStageIds.map((id) => {
    let status: ProgressStage["status"] = "pending";

    if (id === currentStage) {
      status = "active";
    } else if (seenStages.includes(id)) {
      status = "completed";
    }

    return {
      id,
      label: STAGE_LABELS[id] || id,
      status,
    };
  });
}
