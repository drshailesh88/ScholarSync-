"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Scroll,
  MagnifyingGlass,
  Funnel,
  ShieldCheck,
  ChartBar,
  Article,
  CaretDown,
  Check,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { WorkflowTab, ReviewStage } from "@/stores/systematic-review-store";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

// ---------------------------------------------------------------------------
// Phase definitions — maps the 19 tabs into 6 cognitive phases
// ---------------------------------------------------------------------------

export interface Phase {
  key: string;
  label: string;
  icon: PhosphorIcon;
  tabs: WorkflowTab[];
}

const PHASES: Phase[] = [
  {
    key: "setup",
    label: "Setup",
    icon: Scroll,
    tabs: ["protocol", "prospero"],
  },
  {
    key: "search",
    label: "Search",
    icon: MagnifyingGlass,
    tabs: ["strategy", "import", "snowball"],
  },
  {
    key: "screen",
    label: "Screen",
    icon: Funnel,
    tabs: ["screening", "prisma"],
  },
  {
    key: "assess",
    label: "Assess",
    icon: ShieldCheck,
    tabs: ["rob", "rob2", "extraction"],
  },
  {
    key: "analyze",
    label: "Analyze",
    icon: ChartBar,
    tabs: ["meta_analysis", "nma", "grade", "cerqual", "gap_map"],
  },
  {
    key: "report",
    label: "Report",
    icon: Article,
    tabs: ["manuscript", "export", "audit", "living"],
  },
];

// ---------------------------------------------------------------------------
// Map review stages to phases for completion tracking
// ---------------------------------------------------------------------------

const STAGE_TO_PHASE_INDEX: Record<ReviewStage, number> = {
  search_strategy: 1,
  screening: 2,
  full_text_screening: 2,
  data_extraction: 3,
  risk_of_bias: 3,
  meta_analysis: 4,
  reporting: 5,
};

// ---------------------------------------------------------------------------
// Tab labels — human-friendly names for sub-tabs
// ---------------------------------------------------------------------------

const TAB_LABELS: Record<WorkflowTab, string> = {
  protocol: "Protocol",
  prospero: "PROSPERO",
  strategy: "Search Strategy",
  import: "Import Papers",
  snowball: "Snowballing",
  screening: "AI Screening",
  prisma: "PRISMA Flow",
  rob: "Risk of Bias",
  rob2: "RoB 2.0",
  extraction: "Data Extraction",
  meta_analysis: "Meta-Analysis",
  nma: "Network MA",
  grade: "GRADE",
  cerqual: "CERQual",
  gap_map: "Evidence Gap Map",
  manuscript: "Manuscript",
  export: "Export",
  audit: "Audit Trail",
  living: "Living Review",
};

// ---------------------------------------------------------------------------
// PhaseNavigation component
// ---------------------------------------------------------------------------

interface PhaseNavigationProps {
  activeTab: WorkflowTab;
  visibleTabs: Set<string>;
  reviewStage: ReviewStage;
  onTabChange: (tab: WorkflowTab) => void;
}

export function PhaseNavigation({
  activeTab,
  visibleTabs,
  reviewStage,
  onTabChange,
}: PhaseNavigationProps) {
  // Determine which phase is active based on the current tab
  const activePhaseKey = useMemo(() => {
    for (const phase of PHASES) {
      if (phase.tabs.includes(activeTab)) {
        return phase.key;
      }
    }
    return PHASES[0].key;
  }, [activeTab]);

  // Track which phase is expanded (only one at a time)
  const [expandedPhase, setExpandedPhase] = useState<string>(activePhaseKey);

  // Keep expanded phase in sync when active tab changes
  useEffect(() => {
    setExpandedPhase(activePhaseKey);
  }, [activePhaseKey]);

  // Current phase index for completion indicators
  const currentStagePhaseIndex = STAGE_TO_PHASE_INDEX[reviewStage] ?? 0;

  // Filter phases to only show those with at least one visible tab
  const visiblePhases = useMemo(() => {
    return PHASES.map((phase) => ({
      ...phase,
      tabs: phase.tabs.filter((tab) => visibleTabs.has(tab)),
    })).filter((phase) => phase.tabs.length > 0);
  }, [visibleTabs]);

  return (
    <nav className="flex flex-col gap-0.5" role="navigation" aria-label="Review phases">
      {visiblePhases.map((phase) => {
        const isActive = phase.key === activePhaseKey;
        const isExpanded = phase.key === expandedPhase;
        const phaseIndex = PHASES.findIndex((p) => p.key === phase.key);
        const isCompleted = phaseIndex < currentStagePhaseIndex;
        const isCurrent = phaseIndex === currentStagePhaseIndex;
        const Icon = phase.icon;

        return (
          <div key={phase.key} className="flex flex-col">
            {/* Phase header */}
            <button
              onClick={() => {
                if (isExpanded) {
                  // Clicking expanded phase — no-op (keep it open)
                  return;
                }
                setExpandedPhase(phase.key);
                // Auto-navigate to the first tab in the phase
                onTabChange(phase.tabs[0]);
              }}
              className={cn(
                "group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium",
                "transition-all duration-200",
                isActive
                  ? "bg-brand/10 text-brand"
                  : "text-ink-muted hover:text-ink hover:bg-surface-raised/50"
              )}
              aria-expanded={isExpanded}
              aria-current={isActive ? "step" : undefined}
            >
              {/* Completion / current indicator */}
              <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                {isCompleted ? (
                  <span className="w-5 h-5 rounded-full bg-[#0a6847] flex items-center justify-center">
                    <Check size={12} weight="bold" className="text-white" />
                  </span>
                ) : (
                  <Icon
                    size={18}
                    weight={isActive ? "fill" : "regular"}
                    className={cn(
                      "transition-colors duration-200",
                      isActive ? "text-brand" : "text-ink-muted group-hover:text-ink"
                    )}
                  />
                )}
              </span>

              {/* Phase label */}
              <span className="flex-1 text-left">{phase.label}</span>

              {/* Current stage dot */}
              {isCurrent && !isCompleted && (
                <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
              )}

              {/* Expand indicator */}
              <CaretDown
                size={14}
                weight="bold"
                className={cn(
                  "flex-shrink-0 transition-transform duration-200 text-ink-muted",
                  isExpanded && "rotate-180"
                )}
              />
            </button>

            {/* Sub-tabs — shown when phase is expanded */}
            <div
              className={cn(
                "overflow-hidden transition-all duration-200",
                isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="flex flex-col gap-0.5 pl-8 pr-2 py-1">
                {phase.tabs.map((tab) => {
                  const isTabActive = tab === activeTab;
                  return (
                    <button
                      key={tab}
                      onClick={() => onTabChange(tab)}
                      className={cn(
                        "text-left px-3 py-1.5 rounded-md text-sm",
                        "transition-all duration-200",
                        isTabActive
                          ? "bg-brand/10 text-brand font-medium"
                          : "text-ink-muted hover:text-ink hover:bg-surface-raised/50"
                      )}
                    >
                      {TAB_LABELS[tab] ?? tab}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}

// Export phases for testing and other components
export { PHASES, TAB_LABELS };
