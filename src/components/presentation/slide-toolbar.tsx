"use client";

import { useState } from "react";
import { Export, PencilSimple, Eye, FilePdf, Presentation, Robot, Target, LinkSimple, ChartBar, ChatCircle, ClockCounterClockwise, VideoCamera, ShareNetwork } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { SocialExportModal } from "./social-export-modal";
import type { SlideData } from "@/lib/presentation/social-export";

interface SlideToolbarProps {
  isEditing: boolean;
  exporting: boolean;
  onToggleEdit: () => void;
  onExportPptx: () => void;
  onExportPdf?: () => void;
  onPresenterMode?: () => void;
  onToggleAgentPanel?: () => void;
  onToggleDefensePrep?: () => void;
  onShare?: () => void;
  onToggleAnalytics?: () => void;
  onToggleComments?: () => void;
  onToggleVersionHistory?: () => void;
  onToggleRecordings?: () => void;
  showAgentPanel?: boolean;
  showDefensePrep?: boolean;
  showAnalytics?: boolean;
  showComments?: boolean;
  showVersionHistory?: boolean;
  unresolvedCommentCount?: number;
  // Social export props
  socialSlides?: SlideData[];
  socialThemeKey?: string;
  deckTitle?: string;
}

export function SlideToolbar({
  isEditing,
  exporting,
  onToggleEdit,
  onExportPptx,
  onExportPdf,
  onPresenterMode,
  onToggleAgentPanel,
  onToggleDefensePrep,
  onShare,
  onToggleAnalytics,
  onToggleComments,
  onToggleVersionHistory,
  onToggleRecordings,
  showAgentPanel,
  showDefensePrep,
  showAnalytics,
  showComments,
  showVersionHistory,
  unresolvedCommentCount,
  socialSlides,
  socialThemeKey = "modern",
  deckTitle = "Presentation",
}: SlideToolbarProps) {
  const [showSocialExport, setShowSocialExport] = useState(false);

  return (
    <>
    <div className="flex items-center gap-2 px-4 py-2 border-b border-border-subtle">
      <button
        onClick={onToggleEdit}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
          isEditing
            ? "bg-brand/10 text-brand"
            : "text-ink-muted hover:text-ink hover:bg-surface-raised"
        )}
      >
        {isEditing ? <PencilSimple size={14} /> : <Eye size={14} />}
        {isEditing ? "Editing" : "Preview"}
      </button>

      {onToggleAgentPanel && (
        <button
          onClick={onToggleAgentPanel}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
            showAgentPanel
              ? "bg-brand/10 text-brand"
              : "text-ink-muted hover:text-ink hover:bg-surface-raised"
          )}
        >
          <Robot size={14} />
          AI Agent
        </button>
      )}

      {onToggleDefensePrep && (
        <button
          onClick={onToggleDefensePrep}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
            showDefensePrep
              ? "bg-purple-500/10 text-purple-500"
              : "text-ink-muted hover:text-ink hover:bg-surface-raised"
          )}
        >
          <Target size={14} />
          Defense Prep
        </button>
      )}

      {onToggleAnalytics && (
        <button
          onClick={onToggleAnalytics}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
            showAnalytics
              ? "bg-blue-500/10 text-blue-500"
              : "text-ink-muted hover:text-ink hover:bg-surface-raised"
          )}
        >
          <ChartBar size={14} />
          Analytics
        </button>
      )}

      {onToggleComments && (
        <button
          onClick={onToggleComments}
          className={cn(
            "relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
            showComments
              ? "bg-amber-500/10 text-amber-500"
              : "text-ink-muted hover:text-ink hover:bg-surface-raised"
          )}
        >
          <ChatCircle size={14} />
          Comments
          {(unresolvedCommentCount ?? 0) > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[16px] h-4 flex items-center justify-center px-1 rounded-full text-[9px] font-bold bg-amber-500 text-white">
              {unresolvedCommentCount}
            </span>
          )}
        </button>
      )}

      {onToggleVersionHistory && (
        <button
          onClick={onToggleVersionHistory}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
            showVersionHistory
              ? "bg-teal-500/10 text-teal-600"
              : "text-ink-muted hover:text-ink hover:bg-surface-raised"
          )}
        >
          <ClockCounterClockwise size={14} />
          History
        </button>
      )}

      {onToggleRecordings && (
        <button
          onClick={onToggleRecordings}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
        >
          <VideoCamera size={14} />
          Recordings
        </button>
      )}

      <div className="flex-1" />

      {socialSlides && socialSlides.length > 0 && (
        <button
          onClick={() => setShowSocialExport(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
        >
          <ShareNetwork size={14} />
          Social Export
        </button>
      )}

      {onShare && (
        <button
          onClick={onShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
        >
          <LinkSimple size={14} />
          Share
        </button>
      )}

      {onPresenterMode && (
        <button
          onClick={onPresenterMode}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
        >
          <Presentation size={14} />
          Present
        </button>
      )}

      {onExportPdf && (
        <button
          onClick={onExportPdf}
          disabled={exporting}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FilePdf size={14} />
          PDF
        </button>
      )}

      <button
        onClick={onExportPptx}
        disabled={exporting}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border transition-colors",
          exporting
            ? "text-ink-muted opacity-50 cursor-not-allowed"
            : "text-ink-muted hover:text-ink hover:bg-surface-raised"
        )}
      >
        <Export size={14} />
        {exporting ? "Exporting..." : "Export PPTX"}
      </button>
    </div>

    {showSocialExport && socialSlides && socialSlides.length > 0 && (
      <SocialExportModal
        slides={socialSlides}
        themeKey={socialThemeKey}
        deckTitle={deckTitle}
        onClose={() => setShowSocialExport(false)}
      />
    )}
  </>
  );
}
