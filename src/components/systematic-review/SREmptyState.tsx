"use client";

import type { Icon } from "@phosphor-icons/react";
import {
  FlowArrow,
  Upload,
  Funnel,
  Table,
  ChartBar,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Reusable SR Empty State — Sprint 4
// ---------------------------------------------------------------------------

interface SREmptyStateProps {
  icon: Icon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  tip?: string;
  className?: string;
}

export function SREmptyState({
  icon: IconComponent,
  title,
  description,
  actionLabel,
  onAction,
  tip,
  className,
}: SREmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 px-6 text-center",
        className
      )}
    >
      {/* Icon container */}
      <div className="w-14 h-14 rounded-2xl bg-brand/8 flex items-center justify-center mb-5">
        <IconComponent size={28} weight="duotone" className="text-brand" />
      </div>

      {/* Serif title */}
      <h2
        className="text-lg font-semibold text-ink mb-2"
        style={{ fontFamily: "var(--font-serif-family)" }}
      >
        {title}
      </h2>

      {/* Description */}
      <p className="text-sm text-ink-muted max-w-md mb-6 leading-relaxed">
        {description}
      </p>

      {/* CTA button */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors shadow-sm"
        >
          {actionLabel}
        </button>
      )}

      {/* Optional tip */}
      {tip && (
        <p className="mt-6 text-xs text-ink-muted/70 max-w-sm italic">
          {tip}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pre-built variants for the SR workflow
// ---------------------------------------------------------------------------

/** Hub — no projects yet */
export function HubEmptyState({ onCreateReview }: { onCreateReview: () => void }) {
  return (
    <SREmptyState
      icon={FlowArrow}
      title="No systematic reviews yet"
      description="Create your first PRISMA 2020-compliant systematic review. Our AI will guide you from search strategy through meta-analysis."
      actionLabel="Start Your First Review"
      onAction={onCreateReview}
      tip="Tip: Choose the review type that matches your study design for the best-fit tools and checklists."
    />
  );
}

/** Import — no papers imported */
export function ImportEmptyState({ onScrollToImport }: { onScrollToImport?: () => void }) {
  return (
    <SREmptyState
      icon={Upload}
      title="No references imported"
      description="Import references from PubMed, Embase, or other databases. We support RIS, BibTeX, and NBIB formats."
      actionLabel={onScrollToImport ? "Import References" : undefined}
      onAction={onScrollToImport}
      tip="Tip: Export search results from PubMed or Scopus as .ris files for the fastest import."
    />
  );
}

/** Screening — nothing to screen */
export function ScreeningEmptyState({ onGoToImport }: { onGoToImport?: () => void }) {
  return (
    <SREmptyState
      icon={Funnel}
      title="No papers to screen"
      description="Import references first, then return here to screen titles and abstracts against your inclusion criteria."
      actionLabel={onGoToImport ? "Import Papers" : undefined}
      onAction={onGoToImport}
      tip="Tip: Use Speed Mode to screen papers with keyboard shortcuts — press I to include, E to exclude."
    />
  );
}

/** Data Extraction — nothing extracted yet */
export function ExtractionEmptyState({ onGoToScreening }: { onGoToScreening?: () => void }) {
  return (
    <SREmptyState
      icon={Table}
      title="No data extracted yet"
      description="Screen and include papers first. Then return here to extract structured data from each included study."
      actionLabel={onGoToScreening ? "Go to Screening" : undefined}
      onAction={onGoToScreening}
      tip="Tip: Define your extraction schema before starting — it keeps data consistent across studies."
    />
  );
}

/** Meta-Analysis — no data to analyze */
export function MetaAnalysisEmptyState({ onGoToExtraction }: { onGoToExtraction?: () => void }) {
  return (
    <SREmptyState
      icon={ChartBar}
      title="No analysis data yet"
      description="Extract effect sizes and standard errors from your included studies, then run your first meta-analysis here."
      actionLabel={onGoToExtraction ? "Go to Data Extraction" : undefined}
      onAction={onGoToExtraction}
      tip="Tip: You need at least two studies with comparable effect measures to run a meta-analysis."
    />
  );
}
