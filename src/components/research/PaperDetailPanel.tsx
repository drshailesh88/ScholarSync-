"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  BookOpen,
  Copy,
  ArrowSquareOut,
  Sparkle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { VerificationBadge } from "./VerificationBadge";
import { STUDY_TYPE_LABELS, STUDY_TYPE_COLORS } from "@/lib/research/types";
import type { PaperDetail, StudyType, ExtractionField } from "@/lib/research/types";

interface PaperDetailPanelProps {
  detail: PaperDetail;
  onBack: () => void;
  onInsertCitation: () => void;
  onAddToLibrary: () => void;
}

function ExtractionFieldRow({
  label,
  field,
}: {
  label: string;
  field?: ExtractionField;
}) {
  const [showSource, setShowSource] = useState(false);

  if (!field || field.value === "Not stated") {
    return (
      <div className="flex items-start gap-2 py-1">
        <span className="text-[10px] font-medium text-ink-muted w-24 shrink-0">
          {label}
        </span>
        <span className="text-[10px] text-ink-muted italic">Not stated</span>
      </div>
    );
  }

  return (
    <div className="py-1">
      <div className="flex items-start gap-2">
        <span className="text-[10px] font-medium text-ink-muted w-24 shrink-0">
          {label}
        </span>
        <div className="flex-1">
          <span className="text-[10px] text-ink">{field.value}</span>
          {field.source && (
            <button
              onClick={() => setShowSource(!showSource)}
              className="ml-1 text-[9px] text-brand hover:text-brand-hover"
            >
              [{showSource ? "hide" : "src"}]
            </button>
          )}
        </div>
      </div>
      {showSource && field.source && (
        <div className="ml-26 mt-1 p-1.5 rounded bg-amber-500/5 border-l-2 border-amber-500/30">
          <p className="text-[9px] text-ink-muted italic leading-relaxed">
            &ldquo;{field.source}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}

export function PaperDetailPanel({
  detail,
  onBack,
  onInsertCitation,
  onAddToLibrary,
}: PaperDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<
    "summary" | "abstract" | "details"
  >("summary");

  const { paper, extraction, isExtracting } = detail;
  const studyType = (paper.studyTypeEnum || paper.studyType || "other") as StudyType;
  const typeLabel = STUDY_TYPE_LABELS[studyType] || studyType;
  const typeColor = STUDY_TYPE_COLORS[studyType] || STUDY_TYPE_COLORS.other;

  const authorDisplay =
    paper.authors && paper.authors.length > 5
      ? `${paper.authors.slice(0, 5).join(", ")} et al.`
      : paper.authors?.join(", ") || "Unknown";

  return (
    <div className="flex flex-col h-full">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 px-3 py-2 text-xs text-ink-muted hover:text-ink transition-colors border-b border-border-subtle"
      >
        <ArrowLeft size={12} />
        Back to results
      </button>

      {/* Paper header */}
      <div className="px-3 py-3 border-b border-border-subtle space-y-2">
        <h3 className="text-xs font-semibold text-ink leading-tight">
          {paper.title}
        </h3>
        <p className="text-[10px] text-ink-muted">{authorDisplay}</p>
        <p className="text-[10px] text-ink-muted">
          {paper.journal || "Unknown Journal"} &bull; {paper.year || "N/A"}
        </p>

        {/* Identifiers & badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {paper.pmid && (
            <span className="text-[9px] text-ink-muted">PMID: {paper.pmid}</span>
          )}
          {paper.doi && (
            <span className="text-[9px] text-ink-muted">DOI: {paper.doi}</span>
          )}
          <span className={cn("px-1.5 py-0 rounded text-[10px] font-medium", typeColor)}>
            {typeLabel}
          </span>
          {paper.citationCount > 0 && (
            <span className="text-[10px] text-ink-muted">
              Cited by: {paper.citationCount}
            </span>
          )}
          <VerificationBadge status={paper.verificationStatus} />
          {paper.isOpenAccess && (
            <span className="text-[10px] text-amber-500">Open Access</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 pt-1">
          <button
            onClick={onInsertCitation}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-brand text-white text-[10px] font-medium hover:bg-brand-hover transition-colors"
          >
            <Plus size={10} weight="bold" />
            Insert Citation
          </button>
          <button
            onClick={onAddToLibrary}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium transition-colors",
              paper.inLibrary
                ? "bg-brand/10 text-brand"
                : "bg-surface-raised text-ink-muted hover:text-ink"
            )}
          >
            <BookOpen size={10} />
            {paper.inLibrary ? "In Library" : "Add to Library"}
          </button>
          {paper.pmid && (
            <a
              href={`https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-surface-raised text-ink-muted hover:text-ink text-[10px] font-medium transition-colors"
            >
              <ArrowSquareOut size={10} />
              PubMed
            </a>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border-subtle">
        {(["summary", "abstract", "details"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-2 text-[10px] font-medium transition-colors capitalize",
              activeTab === tab
                ? "text-brand border-b-2 border-brand"
                : "text-ink-muted hover:text-ink"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        {activeTab === "summary" && (
          <div className="space-y-3">
            {/* AI Summary */}
            {isExtracting ? (
              <div className="space-y-2 animate-pulse">
                <div className="flex items-center gap-1.5">
                  <Sparkle size={12} className="text-brand animate-spin" />
                  <span className="text-[10px] text-brand">Extracting...</span>
                </div>
                <div className="h-2.5 bg-surface-raised rounded w-full" />
                <div className="h-2.5 bg-surface-raised rounded w-5/6" />
              </div>
            ) : extraction?.summary ? (
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkle size={12} className="text-brand" weight="fill" />
                  <span className="text-[10px] font-medium text-brand">
                    AI Summary
                  </span>
                </div>
                <p className="text-xs text-ink leading-relaxed">
                  {extraction.summary}
                </p>
                {extraction.summarySourceSentences?.length > 0 && (
                  <p className="text-[9px] text-ink-muted mt-1">
                    Based on abstract sentences
                  </p>
                )}
              </div>
            ) : null}

            {/* Extracted fields */}
            {extraction?.fields && (
              <div>
                <span className="text-[10px] font-medium text-ink-muted uppercase tracking-wider block mb-1">
                  Key Extracted Fields
                </span>
                <ExtractionFieldRow label="Population" field={extraction.fields.population} />
                <ExtractionFieldRow label="Intervention" field={extraction.fields.intervention} />
                <ExtractionFieldRow label="Comparator" field={extraction.fields.comparator} />
                <ExtractionFieldRow label="Outcome" field={extraction.fields.primaryOutcome} />
                <ExtractionFieldRow label="Effect Size" field={extraction.fields.effectSize} />
                <ExtractionFieldRow label="Sample Size" field={extraction.fields.sampleSize} />
                <ExtractionFieldRow label="Follow-up" field={extraction.fields.followUp} />
                <ExtractionFieldRow label="Design" field={extraction.fields.studyDesign} />
                <ExtractionFieldRow label="Limitations" field={extraction.fields.limitations} />
              </div>
            )}

            {/* No extraction yet and not extracting */}
            {!extraction && !isExtracting && (
              <p className="text-[10px] text-ink-muted text-center py-4">
                {paper.abstract
                  ? "Click to extract structured data from this paper."
                  : "No abstract available for extraction."}
              </p>
            )}
          </div>
        )}

        {activeTab === "abstract" && (
          <div>
            {paper.abstract ? (
              <p className="text-xs text-ink leading-relaxed whitespace-pre-wrap">
                {paper.abstract}
              </p>
            ) : (
              <p className="text-xs text-ink-muted text-center py-8">
                No abstract available
              </p>
            )}
          </div>
        )}

        {activeTab === "details" && (
          <div className="space-y-3">
            {/* All authors */}
            <div>
              <span className="text-[10px] font-medium text-ink-muted uppercase tracking-wider block mb-1">
                Authors
              </span>
              <p className="text-[10px] text-ink">
                {paper.authors?.join(", ") || "Unknown"}
              </p>
            </div>

            {/* Journal details */}
            <div>
              <span className="text-[10px] font-medium text-ink-muted uppercase tracking-wider block mb-1">
                Journal
              </span>
              <p className="text-[10px] text-ink">{paper.journal || "Unknown"}</p>
            </div>

            {/* Identifiers */}
            <div>
              <span className="text-[10px] font-medium text-ink-muted uppercase tracking-wider block mb-1">
                Identifiers
              </span>
              <div className="space-y-0.5 text-[10px] text-ink">
                {paper.pmid && <p>PMID: {paper.pmid}</p>}
                {paper.doi && <p>DOI: {paper.doi}</p>}
                {paper.s2Id && <p>Semantic Scholar: {paper.s2Id}</p>}
              </div>
            </div>

            {/* MeSH terms */}
            {paper.meshTerms && paper.meshTerms.length > 0 && (
              <div>
                <span className="text-[10px] font-medium text-ink-muted uppercase tracking-wider block mb-1">
                  MeSH Terms
                </span>
                <div className="flex flex-wrap gap-1">
                  {paper.meshTerms.map((term, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 text-[9px]"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Publication types */}
            {paper.publicationTypes && paper.publicationTypes.length > 0 && (
              <div>
                <span className="text-[10px] font-medium text-ink-muted uppercase tracking-wider block mb-1">
                  Publication Types
                </span>
                <div className="flex flex-wrap gap-1">
                  {paper.publicationTypes.map((pt, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 rounded bg-surface-raised text-ink-muted text-[9px]"
                    >
                      {pt}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
