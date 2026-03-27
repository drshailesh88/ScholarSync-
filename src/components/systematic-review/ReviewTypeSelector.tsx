"use client";

import { useState } from "react";
import {
  FirstAid,
  Flask,
  Binoculars,
  MagnifyingGlass,
  ChartLine,
  ChatText,
  Shuffle,
  MapTrifold,
  Umbrella,
  Users,
  CheckCircle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ReviewType =
  | "intervention_rct"
  | "intervention_non_rct"
  | "observational_cohort"
  | "observational_case_control"
  | "diagnostic_accuracy"
  | "prognostic"
  | "qualitative"
  | "mixed_methods"
  | "scoping"
  | "umbrella";

interface ReviewTypeOption {
  value: ReviewType;
  label: string;
  description: string;
  icon: React.ElementType;
}

interface ReviewTypeCategory {
  name: string;
  options: ReviewTypeOption[];
}

interface ReviewTypeSelectorProps {
  projectId: number;
  currentType: ReviewType | null;
  onTypeSelected: (type: ReviewType) => void;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const categories: ReviewTypeCategory[] = [
  {
    name: "Interventional",
    options: [
      {
        value: "intervention_rct",
        label: "RCT Intervention",
        description: "Randomised controlled trials evaluating an intervention.",
        icon: FirstAid,
      },
      {
        value: "intervention_non_rct",
        label: "Non-RCT Intervention",
        description: "Non-randomised studies evaluating an intervention.",
        icon: Flask,
      },
    ],
  },
  {
    name: "Observational",
    options: [
      {
        value: "observational_cohort",
        label: "Cohort Study",
        description: "Longitudinal cohort studies tracking exposure and outcome.",
        icon: Binoculars,
      },
      {
        value: "observational_case_control",
        label: "Case-Control",
        description: "Studies comparing cases with controls retrospectively.",
        icon: Users,
      },
    ],
  },
  {
    name: "Diagnostic & Prognostic",
    options: [
      {
        value: "diagnostic_accuracy",
        label: "Diagnostic Accuracy",
        description: "Studies evaluating diagnostic test accuracy against a reference.",
        icon: MagnifyingGlass,
      },
      {
        value: "prognostic",
        label: "Prognostic",
        description: "Studies assessing prognostic factors or prediction models.",
        icon: ChartLine,
      },
    ],
  },
  {
    name: "Qualitative",
    options: [
      {
        value: "qualitative",
        label: "Qualitative",
        description: "Synthesis of qualitative research findings and themes.",
        icon: ChatText,
      },
      {
        value: "mixed_methods",
        label: "Mixed Methods",
        description: "Integrates both quantitative and qualitative evidence.",
        icon: Shuffle,
      },
    ],
  },
  {
    name: "Other",
    options: [
      {
        value: "scoping",
        label: "Scoping Review",
        description: "Maps the breadth of evidence on a broad topic area.",
        icon: MapTrifold,
      },
      {
        value: "umbrella",
        label: "Umbrella Review",
        description: "Review of existing systematic reviews on a topic.",
        icon: Umbrella,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ReviewTypeSelector({
  projectId: _projectId,
  currentType,
  onTypeSelected,
}: ReviewTypeSelectorProps) {
  const [selected, setSelected] = useState<ReviewType | null>(currentType);

  return (
    <GlassPanel className="sr-panel space-y-6">
      {/* Header */}
      <div>
        <h2 className="sr-panel-title">
          <CheckCircle weight="duotone" className="text-brand" />
          Review Type
        </h2>
        <p className="text-sm text-ink-muted mt-1">
          Select the type of systematic review that best fits your research
          question. This determines the screening criteria and quality appraisal
          tools used throughout the workflow.
        </p>
      </div>

      {/* Categories & Cards */}
      <div className="space-y-5">
        {categories.map((category) => (
          <div key={category.name} className="space-y-2">
            <h3 className="text-xs font-medium text-ink-muted uppercase tracking-wide">
              {category.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.options.map((option) => {
                const Icon = option.icon;
                const isSelected = selected === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelected(option.value)}
                    className={cn(
                      "flex items-start gap-3 p-4 rounded-lg border text-left transition-all",
                      "bg-surface-raised hover:bg-surface-alt",
                      isSelected
                        ? "border-brand ring-1 ring-brand/30"
                        : "border-border hover:border-border"
                    )}
                  >
                    <Icon
                      weight="duotone"
                      size={24}
                      className={cn(
                        "flex-shrink-0 mt-0.5",
                        isSelected ? "text-brand" : "text-ink-muted"
                      )}
                    />
                    <div className="min-w-0">
                      <span
                        className={cn(
                          "text-sm font-medium block",
                          isSelected ? "text-brand" : "text-ink"
                        )}
                      >
                        {option.label}
                      </span>
                      <span className="text-xs text-ink-muted leading-snug block mt-0.5">
                        {option.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Confirm button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => {
            if (selected) onTypeSelected(selected);
          }}
          disabled={!selected}
          className="sr-btn sr-btn-primary"
        >
          <CheckCircle weight="bold" size={16} />
          Confirm Selection
        </button>
      </div>
    </GlassPanel>
  );
}
