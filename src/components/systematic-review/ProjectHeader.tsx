"use client";

import { CheckCircle, Circle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { ReviewStage } from "@/stores/systematic-review-store";

const STAGES: { key: ReviewStage; label: string }[] = [
  { key: "search_strategy", label: "Search" },
  { key: "screening", label: "Screening" },
  { key: "full_text_screening", label: "Full-Text" },
  { key: "data_extraction", label: "Extraction" },
  { key: "risk_of_bias", label: "RoB" },
  { key: "meta_analysis", label: "Meta-Analysis" },
  { key: "reporting", label: "Reporting" },
];

interface ProjectHeaderProps {
  title: string;
  currentStage: ReviewStage;
  paperCount: number;
}

export function ProjectHeader({
  title,
  currentStage,
  paperCount,
}: ProjectHeaderProps) {
  const currentIndex = STAGES.findIndex((s) => s.key === currentStage);

  return (
    <div className="px-6 py-4 border-b border-border">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-xl font-semibold text-ink">{title}</h1>
          <p className="text-sm text-ink-muted mt-0.5">
            PRISMA 2020-compliant systematic review
            {paperCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-brand/10 text-brand rounded text-xs font-medium">
                {paperCount} papers
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Progress stepper */}
      <div className="flex items-center gap-1">
        {/* empty state: renders nothing when no data */}
        {STAGES.map((stage, i) => {
          const isCompleted = i < currentIndex;
          const isCurrent = i === currentIndex;
          return (
            <div key={stage.key} className="flex items-center">
              <div
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
                  isCompleted && "bg-emerald-500/10 text-emerald-600",
                  isCurrent && "bg-brand/10 text-brand",
                  !isCompleted && !isCurrent && "bg-surface-raised text-ink-muted"
                )}
              >
                {isCompleted ? (
                  <CheckCircle weight="fill" size={14} />
                ) : (
                  <Circle
                    weight={isCurrent ? "fill" : "regular"}
                    size={14}
                  />
                )}
                {stage.label}
              </div>
              {i < STAGES.length - 1 && (
                <div
                  className={cn(
                    "w-4 h-px mx-0.5",
                    i < currentIndex ? "bg-emerald-500/40" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
