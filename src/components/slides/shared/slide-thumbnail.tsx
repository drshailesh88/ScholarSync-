"use client";

import type { ContentBlock, SlideLayout, ThemeConfig } from "@/types/presentation";
import { SlideRendererV2 } from "./slide-renderer-v2";

interface SlideThumbnailProps {
  title?: string | null;
  subtitle?: string | null;
  layout?: SlideLayout | null;
  contentBlocks?: ContentBlock[];
  themeKey?: string;
  themeConfig?: ThemeConfig;
  isActive?: boolean;
  slideNumber?: number;
  commentCount?: number;
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
}

export function SlideThumbnail({
  title,
  subtitle,
  layout,
  contentBlocks = [],
  themeKey,
  themeConfig,
  isActive,
  slideNumber,
  commentCount,
  onClick,
  onContextMenu,
}: SlideThumbnailProps) {
  return (
    <button
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={`w-full text-left relative group transition-all rounded-lg overflow-hidden ${
        isActive
          ? "ring-2 ring-brand shadow-md"
          : "ring-1 ring-border hover:ring-brand/40"
      }`}
    >
      {/* Mini slide preview */}
      <div className="pointer-events-none">
        <SlideRendererV2
          title={title}
          subtitle={subtitle}
          layout={layout}
          contentBlocks={contentBlocks}
          themeKey={themeKey}
          themeConfig={themeConfig}
          scale={0.15}
        />
      </div>

      {/* Slide number overlay */}
      {slideNumber != null && (
        <div className="absolute top-1 left-1 text-[9px] font-medium text-ink-muted bg-surface/80 rounded px-1">
          {slideNumber}
        </div>
      )}

      {/* Comment badge */}
      {commentCount != null && commentCount > 0 && (
        <div className="absolute top-1 right-1 text-[8px] font-bold text-white bg-brand rounded-full w-4 h-4 flex items-center justify-center">
          {commentCount}
        </div>
      )}
    </button>
  );
}
