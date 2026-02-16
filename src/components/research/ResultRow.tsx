"use client";

import { Plus, BookOpen, ArrowSquareOut } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { VerificationBadge } from "./VerificationBadge";
import { STUDY_TYPE_LABELS, STUDY_TYPE_COLORS } from "@/lib/research/types";
import type { PaperResult, StudyType } from "@/lib/research/types";

interface ResultRowProps {
  paper: PaperResult;
  isSelected: boolean;
  onToggleSelect: () => void;
  onViewDetail: () => void;
  onInsertCitation: () => void;
  onAddToLibrary: () => void;
}

export function ResultRow({
  paper,
  isSelected,
  onToggleSelect,
  onViewDetail,
  onInsertCitation,
  onAddToLibrary,
}: ResultRowProps) {
  const studyType = (paper.studyTypeEnum || paper.studyType || "other") as StudyType;
  const typeLabel = STUDY_TYPE_LABELS[studyType] || studyType;
  const typeColor = STUDY_TYPE_COLORS[studyType] || STUDY_TYPE_COLORS.other;

  const firstAuthor = paper.authors?.[0] || "Unknown";
  const authorDisplay =
    paper.authors && paper.authors.length > 2
      ? `${firstAuthor} et al.`
      : paper.authors?.join(", ") || "Unknown";

  return (
    <div
      className={cn(
        "group px-3 py-2 border-b border-border-subtle hover:bg-surface-raised/50 transition-colors cursor-pointer",
        isSelected && "bg-brand/5"
      )}
    >
      <div className="flex items-start gap-2">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="mt-1 shrink-0 rounded border-border"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Main content */}
        <div className="flex-1 min-w-0" onClick={onViewDetail}>
          {/* Title */}
          <p className="text-xs font-medium text-ink leading-tight line-clamp-2">
            {paper.title}
          </p>

          {/* Authors + Journal */}
          <p className="text-[10px] text-ink-muted mt-0.5 truncate">
            {authorDisplay} — {paper.journal || "Unknown Journal"}
          </p>

          {/* Badges row */}
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            {/* Year */}
            <span className="text-[10px] text-ink-muted font-medium">
              {paper.year || "N/A"}
            </span>

            {/* Study type */}
            <span
              className={cn(
                "px-1.5 py-0 rounded text-[10px] font-medium",
                typeColor
              )}
            >
              {typeLabel}
            </span>

            {/* Citation count */}
            {paper.citationCount > 0 && (
              <span className="text-[10px] text-ink-muted">
                {paper.citationCount} cited
              </span>
            )}

            {/* Open access badge */}
            {paper.isOpenAccess && (
              <span className="text-[10px] text-amber-500">OA</span>
            )}

            {/* Verification badge */}
            <VerificationBadge
              status={paper.verificationStatus}
              compact
            />

            {/* Source tag */}
            <span className="text-[9px] text-ink-muted/60 uppercase">
              {paper.source === "both"
                ? "PM+SS"
                : paper.source === "pubmed"
                ? "PM"
                : "SS"}
            </span>

            {/* PMID */}
            {paper.pmid && (
              <span className="text-[9px] text-ink-muted/60">
                PMID: {paper.pmid}
              </span>
            )}
          </div>
        </div>

        {/* Action buttons (visible on hover) */}
        <div className="flex flex-col gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInsertCitation();
            }}
            title="Insert citation"
            className="p-1 rounded hover:bg-brand/10 text-ink-muted hover:text-brand transition-colors"
          >
            <Plus size={12} weight="bold" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToLibrary();
            }}
            title={paper.inLibrary ? "In library" : "Add to library"}
            className={cn(
              "p-1 rounded transition-colors",
              paper.inLibrary
                ? "text-brand bg-brand/10"
                : "text-ink-muted hover:text-brand hover:bg-brand/10"
            )}
          >
            <BookOpen size={12} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetail();
            }}
            title="View details"
            className="p-1 rounded hover:bg-surface-raised text-ink-muted hover:text-ink transition-colors"
          >
            <ArrowSquareOut size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
