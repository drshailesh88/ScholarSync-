"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChatCircle,
  FunnelSimple,
  CircleNotch,
  X,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  getComments,
  type CommentWithReplies,
  type CommentsBySlide,
} from "@/lib/actions/comments";
import { CommentThread } from "./comment-thread";

type FilterMode = "all" | "unresolved" | "resolved";

interface CommentsPanelProps {
  deckId: number;
  slides: { id: number; title?: string | null }[];
  currentUserId: string;
  activeSlideId: number | null;
  onClose: () => void;
  onNavigateToSlide: (slideId: number) => void;
  onUnresolvedCountChange?: (count: number) => void;
}

export function CommentsPanel({
  deckId,
  slides,
  currentUserId,
  activeSlideId,
  onClose,
  onNavigateToSlide,
  onUnresolvedCountChange,
}: CommentsPanelProps) {
  const [commentsBySlide, setCommentsBySlide] = useState<CommentsBySlide>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterMode>("all");

  const loadComments = useCallback(async () => {
    try {
      const data = await getComments(deckId);
      setCommentsBySlide(data);

      // Count unresolved
      let unresolvedCount = 0;
      for (const comments of Object.values(data)) {
        for (const c of comments) {
          if (!c.resolved) unresolvedCount++;
        }
      }
      onUnresolvedCountChange?.(unresolvedCount);
    } catch (err) {
      console.error("Failed to load comments:", err);
    } finally {
      setLoading(false);
    }
  }, [deckId, onUnresolvedCountChange]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  // Filter comments per slide
  function filterComments(comments: CommentWithReplies[]): CommentWithReplies[] {
    if (filter === "all") return comments;
    if (filter === "unresolved") return comments.filter((c) => !c.resolved);
    return comments.filter((c) => c.resolved);
  }

  // Slides that have comments
  const _slidesWithComments = slides.filter(
    (s) => commentsBySlide[String(s.id)]?.length > 0
  );

  // Count totals
  let totalUnresolved = 0;
  let totalAll = 0;
  for (const comments of Object.values(commentsBySlide)) {
    totalAll += comments.length;
    totalUnresolved += comments.filter((c) => !c.resolved).length;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-ink">Comments</h3>
          {totalUnresolved > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-500">
              {totalUnresolved} unresolved
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-surface-raised text-ink-muted transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-border/50">
        <FunnelSimple size={12} className="text-ink-muted mr-1" />
        {(["all", "unresolved", "resolved"] as FilterMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setFilter(mode)}
            className={cn(
              "px-2 py-1 rounded text-[10px] font-medium capitalize transition-colors",
              filter === mode
                ? "bg-brand/10 text-brand"
                : "text-ink-muted hover:bg-surface-raised"
            )}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <CircleNotch size={20} className="animate-spin text-brand" />
          </div>
        )}

        {!loading && totalAll === 0 && (
          <div className="text-center py-8">
            <ChatCircle size={32} className="mx-auto text-ink-muted/30 mb-2" />
            <p className="text-sm text-ink-muted">No comments yet</p>
            <p className="text-xs text-ink-muted/70 mt-1">
              Comments on slides will appear here
            </p>
          </div>
        )}

        {!loading &&
          slides.map((slide, idx) => {
            const slideComments = commentsBySlide[String(slide.id)] ?? [];
            const filtered = filterComments(slideComments);
            if (filtered.length === 0 && filter !== "all") return null;

            // For "all" filter, show slide section even if no comments (for the active slide)
            const showSection =
              filtered.length > 0 ||
              (filter === "all" && slide.id === activeSlideId);

            if (!showSection) return null;

            const slideUnresolved = slideComments.filter(
              (c) => !c.resolved
            ).length;

            return (
              <div key={slide.id}>
                {/* Slide header */}
                <button
                  onClick={() => onNavigateToSlide(slide.id)}
                  className={cn(
                    "flex items-center justify-between w-full text-left mb-2 px-2 py-1.5 rounded-lg transition-colors",
                    slide.id === activeSlideId
                      ? "bg-brand/5 text-brand"
                      : "hover:bg-surface-raised text-ink-muted"
                  )}
                >
                  <span className="text-xs font-medium">
                    Slide {idx + 1}
                    {slide.title ? `: ${slide.title}` : ""}
                  </span>
                  {slideUnresolved > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/15 text-amber-500">
                      {slideUnresolved}
                    </span>
                  )}
                </button>

                <CommentThread
                  slideId={slide.id}
                  deckId={deckId}
                  comments={filtered}
                  currentUserId={currentUserId}
                  onRefresh={loadComments}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helper: get comment counts for sidebar badges
// ---------------------------------------------------------------------------

export function useCommentCounts(deckId: number) {
  const [counts, setCounts] = useState<
    Map<number, { total: number; unresolved: number }>
  >(new Map());
  const [totalUnresolved, setTotalUnresolved] = useState(0);

  const refresh = useCallback(async () => {
    try {
      const data = await getComments(deckId);
      const newCounts = new Map<
        number,
        { total: number; unresolved: number }
      >();
      let unresolved = 0;

      for (const [slideId, comments] of Object.entries(data)) {
        const id = Number(slideId);
        const slideUnresolved = comments.filter((c) => !c.resolved).length;
        newCounts.set(id, {
          total: comments.length,
          unresolved: slideUnresolved,
        });
        unresolved += slideUnresolved;
      }

      setCounts(newCounts);
      setTotalUnresolved(unresolved);
    } catch {
      // Silently fail
    }
  }, [deckId]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    refresh();
  }, [refresh]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return { counts, totalUnresolved, refresh };
}
