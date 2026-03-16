"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSlidesStore } from "@/stores/slides-store";
import type { SlideState } from "@/stores/slides-store";
import {
  Sparkle,
  SpinnerGap,
  TextAa,
  ArrowsInSimple,
  ArrowsOutSimple,
  Quotes,
  Microphone,
  TextAlignLeft,
  Image,
  ArrowClockwise,
} from "@phosphor-icons/react";

// ---------------------------------------------------------------------------
// AI action definitions
// ---------------------------------------------------------------------------

interface SparkleAction {
  label: string;
  icon: React.ElementType;
  buildMessage: (slideId: number) => string;
}

const SPARKLE_ACTIONS: SparkleAction[] = [
  {
    label: "Improve writing",
    icon: TextAa,
    buildMessage: (id) =>
      `Improve the writing quality of slide ID ${id}. Make it more polished and professional.`,
  },
  {
    label: "Shorten",
    icon: ArrowsInSimple,
    buildMessage: (id) =>
      `Shorten and condense slide ID ${id}. Keep only the essential information.`,
  },
  {
    label: "Expand",
    icon: ArrowsOutSimple,
    buildMessage: (id) =>
      `Expand slide ID ${id} with more detail and supporting points.`,
  },
  {
    label: "Add citations",
    icon: Quotes,
    buildMessage: (id) =>
      `Add relevant academic citations and references to slide ID ${id}.`,
  },
  {
    label: "Add speaker notes",
    icon: Microphone,
    buildMessage: (id) =>
      `Generate detailed speaker notes for slide ID ${id} that help the presenter deliver this content effectively.`,
  },
  {
    label: "Simplify language",
    icon: TextAlignLeft,
    buildMessage: (id) =>
      `Simplify the language on slide ID ${id}. Make it easier to understand for a general audience.`,
  },
  {
    label: "Make more visual",
    icon: Image,
    buildMessage: (id) =>
      `Make slide ID ${id} more visual. Suggest images, charts, or diagrams to replace or supplement text.`,
  },
  {
    label: "Regenerate card",
    icon: ArrowClockwise,
    buildMessage: (id) =>
      `Completely regenerate the content of slide ID ${id}. Create fresh, improved content while keeping the same topic.`,
  },
];

// ---------------------------------------------------------------------------
// Chat API response type (matches gamma-agent-panel)
// ---------------------------------------------------------------------------

interface ChatApiResponse {
  summary?: string;
  modifiedSlides?: Array<{
    slideId: number;
    title?: string | null;
    layout?: string | null;
    contentBlocks?: unknown[];
    speakerNotes?: string | null;
  }>;
  error?: string;
}

// ---------------------------------------------------------------------------
// CardSparkleMenu
// ---------------------------------------------------------------------------

interface CardSparkleMenuProps {
  slideId: number;
}

export function CardSparkleMenu({ slideId }: CardSparkleMenuProps) {
  const deckId = useSlidesStore((s) => s.deckId);
  const slides = useSlidesStore((s) => s.slides);
  const audienceType = useSlidesStore((s) => s.audienceType);
  const updateSlide = useSlidesStore((s) => s.updateSlide);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // ---------------------------------------------------------------------------
  // Execute action
  // ---------------------------------------------------------------------------

  const executeAction = useCallback(
    async (action: SparkleAction) => {
      if (isLoading || !deckId) return;

      setOpen(false);
      setIsLoading(true);

      try {
        const res = await fetch("/api/slides/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            deckId,
            message: action.buildMessage(slideId),
            /* empty state: renders nothing when no data */
            slides: slides.map((s) => ({
              id: s.id,
              title: s.title,
              contentBlocks: s.contentBlocks,
              speakerNotes: s.speakerNotes,
            })),
            activeSlideId: slideId,
            audienceType,
          }),
        });

        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }

        const data: ChatApiResponse = await res.json();

        // Apply modified slides to the store
        if (data.modifiedSlides) {
          for (const mod of data.modifiedSlides) {
            const update: Partial<SlideState> = {};
            if (mod.title != null) update.title = mod.title;
            if (mod.contentBlocks != null)
              update.contentBlocks =
                mod.contentBlocks as SlideState["contentBlocks"];
            if (mod.speakerNotes != null)
              update.speakerNotes = mod.speakerNotes;
            if (mod.layout != null)
              update.layout = mod.layout as SlideState["layout"];
            updateSlide(mod.slideId, update);
          }
        }
      } catch {
        // Silently fail — the card returns to normal state
      } finally {
        setIsLoading(false);
      }
    },
    [deckId, slideId, slides, audienceType, isLoading, updateSlide],
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      {/* Sparkle button + dropdown container */}
      <div ref={menuRef} className="relative z-10">
        {/* Sparkle trigger button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (!isLoading) setOpen((prev) => !prev);
          }}
          disabled={isLoading}
          className={`
            flex items-center justify-center w-8 h-8 rounded-lg
            transition-all duration-150
            ${
              isLoading
                ? "bg-brand/20 cursor-wait"
                : open
                  ? "bg-brand text-white shadow-md"
                  : "bg-surface-raised/80 hover:bg-brand/10 hover:text-brand text-ink-muted backdrop-blur-sm border border-border/50 shadow-sm"
            }
          `}
          aria-label="AI card actions"
          aria-expanded={open}
        >
          {isLoading ? (
            <SpinnerGap size={16} className="animate-spin text-brand" />
          ) : (
            <Sparkle size={16} weight={open ? "fill" : "duotone"} />
          )}
        </button>

        {/* Dropdown menu */}
        {open && (
          <div
            className="absolute top-full right-0 mt-1 w-52 rounded-xl border border-border bg-surface shadow-xl z-50 py-1 animate-in fade-in slide-in-from-top-1 duration-150"
            role="menu"
          >
            <div className="px-3 py-1.5 border-b border-border">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                AI Actions
              </span>
            </div>
            {SPARKLE_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  type="button"
                  role="menuitem"
                  onClick={(e) => {
                    e.stopPropagation();
                    executeAction(action);
                  }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-ink hover:bg-surface-raised transition-colors text-left"
                >
                  <Icon
                    size={16}
                    weight="duotone"
                    className="text-ink-muted shrink-0"
                  />
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Full-card loading overlay — uses absolute inset-0 relative to the card wrapper */}
      {isLoading && (
        <div className="absolute inset-0 z-[5] flex items-center justify-center rounded-xl bg-surface/60 backdrop-blur-[2px] pointer-events-none">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border shadow-lg">
            <SpinnerGap size={16} className="animate-spin text-brand" />
            <span className="text-sm font-medium text-ink-muted">
              AI is working...
            </span>
          </div>
        </div>
      )}
    </>
  );
}
