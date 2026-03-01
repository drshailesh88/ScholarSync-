"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlideRendererV2 as SlideRenderer } from "@/components/slides/shared/slide-renderer-v2";
import { PresenterControls } from "./presenter-controls";
import type { ContentBlock, ThemeConfig, SlideLayout } from "@/types/presentation";
import { PRESET_THEMES } from "@/types/presentation";
import { cn } from "@/lib/utils";
import {
  X,
  Clock,
  Pause,
  Play,
  SpeakerHigh,
  Check,
} from "@phosphor-icons/react";
import { SpotlightBlockWrapper } from "@/components/slides/gamma-mode/spotlight-wrapper";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PresenterSlide {
  id: number;
  title: string | null;
  subtitle: string | null;
  layout: string;
  contentBlocks: ContentBlock[];
  speakerNotes: string | null;
}

interface PresenterModeProps {
  slides: PresenterSlide[];
  themeKey: string;
  themeConfig?: ThemeConfig;
  startIndex?: number;
  transition?: "none" | "fade" | "slide" | "zoom";
  showPresenterView?: boolean;
  onExit: () => void;
  onSlideUpdate?: (
    slideId: number,
    changes: {
      title?: string;
      subtitle?: string;
      contentBlocks?: ContentBlock[];
    }
  ) => void;
}

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const slideVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4 },
  },
  slide: {
    initial: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    animate: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
  zoom: {
    initial: { scale: 0.85, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.1, opacity: 0 },
    transition: { duration: 0.35 },
  },
  none: {
    initial: {},
    animate: {},
    exit: {},
    transition: { duration: 0 },
  },
};

// ---------------------------------------------------------------------------
// Timer Hook
// ---------------------------------------------------------------------------

function useTimer() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(true);
  const startRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  // Initialize start time on mount
  useEffect(() => {
    startRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (!running) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const tick = () => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

  const toggle = useCallback(() => {
    if (running) {
      pausedAtRef.current = Date.now();
      setRunning(false);
    } else {
      // Adjust start time so elapsed stays continuous
      startRef.current += Date.now() - pausedAtRef.current;
      setRunning(true);
    }
  }, [running]);

  return { elapsed, running, toggle };
}

// ---------------------------------------------------------------------------
// Touch / Swipe Hook
// ---------------------------------------------------------------------------

function useSwipe(onLeft: () => void, onRight: () => void) {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      // Only trigger if horizontal swipe is dominant and > 50px
      if (absDx > 50 && absDx > absDy * 1.5) {
        if (dx < 0) onLeft(); // swipe left = next
        else onRight(); // swipe right = previous
      }
      touchStartRef.current = null;
    },
    [onLeft, onRight]
  );

  return { onTouchStart, onTouchEnd };
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function PresenterMode({
  slides,
  themeKey,
  themeConfig,
  startIndex = 0,
  transition = "fade",
  showPresenterView = false,
  onExit,
  onSlideUpdate,
}: PresenterModeProps) {
  const theme = themeConfig ?? PRESET_THEMES[themeKey] ?? PRESET_THEMES.modern;
  const totalSlides = slides.length;

  // State
  const [currentIndex, setCurrentIndex] = useState(
    Math.max(0, Math.min(startIndex, totalSlides - 1))
  );
  const [direction, setDirection] = useState(1);
  const [showGrid, setShowGrid] = useState(false);
  const [showNotes, setShowNotes] = useState(showPresenterView);
  const [spotlightActive, setSpotlightActive] = useState(false);
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editSubtitle, setEditSubtitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const slideContentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);

  const timer = useTimer();

  // Quick-edit helpers
  const enterEditMode = useCallback(() => {
    const slide = slides[currentIndex];
    if (!slide) return;
    setEditTitle(slide.title ?? "");
    setEditSubtitle(slide.subtitle ?? "");
    // Find the first text or bullets block for inline editing
    const firstTextBlock = slide.contentBlocks.find(
      (b) => b.type === "text" || b.type === "bullets"
    );
    if (firstTextBlock) {
      if (firstTextBlock.type === "text") {
        setEditContent(firstTextBlock.data.text);
      } else if (firstTextBlock.type === "bullets") {
        setEditContent(firstTextBlock.data.items.join("\n"));
      }
    } else {
      setEditContent("");
    }
    setEditMode(true);
  }, [slides, currentIndex]);

  const commitEdit = useCallback(() => {
    const slide = slides[currentIndex];
    if (!slide || !onSlideUpdate) {
      setEditMode(false);
      return;
    }
    const updatedBlocks = slide.contentBlocks.map((block) => {
      // Update the first text/bullets block we find
      if (block.type === "text") {
        return { ...block, data: { ...block.data, text: editContent } };
      }
      if (block.type === "bullets") {
        return {
          ...block,
          data: {
            ...block.data,
            items: editContent.split("\n").filter((l) => l.length > 0),
          },
        };
      }
      return block;
    });
    onSlideUpdate(slide.id, {
      title: editTitle || undefined,
      subtitle: editSubtitle || undefined,
      contentBlocks: updatedBlocks as ContentBlock[],
    });
    setEditMode(false);
  }, [slides, currentIndex, editTitle, editSubtitle, editContent, onSlideUpdate]);

  // Navigation
  const goToSlide = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, totalSlides - 1));
      setDirection(clamped >= currentIndex ? 1 : -1);
      setCurrentIndex(clamped);
      setShowGrid(false);
    },
    [currentIndex, totalSlides]
  );

  const goNext = useCallback(() => {
    if (currentIndex < totalSlides - 1) {
      setDirection(1);
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, totalSlides]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  // BroadcastChannel: sync slide index to audience windows
  const channelRef = useRef<BroadcastChannel | null>(null);
  useEffect(() => {
    const channel = new BroadcastChannel("presenter-slide-sync");
    channelRef.current = channel;

    // When audience window connects, send it all slide data
    channel.onmessage = (e) => {
      if (e.data?.type === "audience-ready") {
        channel.postMessage({
          type: "init",
          slides: slides.map((s) => ({
            title: s.title ?? "",
            subtitle: s.subtitle ?? "",
            layout: s.layout,
            contentBlocks: s.contentBlocks,
          })),
          themeKey,
          themeConfig: theme,
        });
        // Also send current slide index
        channel.postMessage({ type: "slide", index: currentIndex });
      }
    };

    return () => {
      channel.close();
    };
  }, [slides, themeKey, theme, currentIndex]);

  // Broadcast current slide whenever it changes
  useEffect(() => {
    channelRef.current?.postMessage({ type: "slide", index: currentIndex });
  }, [currentIndex]);

  const openAudienceWindow = useCallback(() => {
    const url = new URL(window.location.href);
    url.pathname = "/presentation/audience";
    window.open(
      url.toString(),
      "audience-view",
      "width=1280,height=720,menubar=no,toolbar=no"
    );
  }, []);

  // Auto-scroll speaker notes when slide changes
  useEffect(() => {
    notesRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex]);

  // Track scroll position and overflow state for the slide content
  useEffect(() => {
    const el = slideContentRef.current;
    if (!el) return;

    const checkOverflow = () => {
      const isOverflowing = el.scrollHeight > el.clientHeight + 2;
      setHasOverflow(isOverflowing);
      if (isOverflowing) {
        const maxScroll = el.scrollHeight - el.clientHeight;
        setScrollProgress(maxScroll > 0 ? el.scrollTop / maxScroll : 0);
      } else {
        setScrollProgress(0);
      }
    };

    const onScroll = () => {
      const maxScroll = el.scrollHeight - el.clientHeight;
      setScrollProgress(maxScroll > 0 ? el.scrollTop / maxScroll : 0);
    };

    checkOverflow();
    el.addEventListener("scroll", onScroll, { passive: true });

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [currentIndex]);

  // Reset slide content scroll on slide change
  useEffect(() => {
    slideContentRef.current?.scrollTo({ top: 0 });
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't capture if an input is focused
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goPrev();
          break;
        case "ArrowUp":
          e.preventDefault();
          slideContentRef.current?.scrollBy({ top: -200, behavior: "smooth" });
          break;
        case "ArrowDown":
          e.preventDefault();
          slideContentRef.current?.scrollBy({ top: 200, behavior: "smooth" });
          break;
        case "Escape":
          e.preventDefault();
          if (editMode) {
            setEditMode(false);
          } else if (showGrid) {
            setShowGrid(false);
          } else {
            // Exit fullscreen first, then exit presenter mode
            if (document.fullscreenElement) {
              document.exitFullscreen().catch(() => {});
            }
            onExit();
          }
          break;
        case "e":
        case "E":
          if (!spotlightActive && !editMode) {
            e.preventDefault();
            enterEditMode();
          }
          break;
        case "g":
        case "G":
          e.preventDefault();
          setShowGrid((v) => !v);
          break;
        case "n":
        case "N":
          e.preventDefault();
          setShowNotes((v) => !v);
          break;
        case "s":
        case "S":
          e.preventDefault();
          setSpotlightActive((v) => !v);
          setSpotlightIndex(0);
          break;
        case "Home":
          e.preventDefault();
          goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
        case "d":
        case "D":
          e.preventDefault();
          openAudienceWindow();
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, goToSlide, onExit, showGrid, editMode, spotlightActive, enterEditMode, totalSlides, openAudienceWindow]);

  // Touch support
  const swipeHandlers = useSwipe(goNext, goPrev);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      containerRef.current?.requestFullscreen?.().catch(() => {});
    }
  }, []);

  // Current slide data
  const currentSlide = slides[currentIndex];
  const nextSlide = currentIndex < totalSlides - 1 ? slides[currentIndex + 1] : null;

  // Variant for current transition
  const variant = slideVariants[transition];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col select-none"
      {...swipeHandlers}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Main slide area                                                    */}
      {/* ------------------------------------------------------------------ */}
      <div
        className={cn(
          "relative flex-1 flex items-center justify-center overflow-hidden",
          showNotes ? "h-[65vh]" : "h-full"
        )}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={
              typeof variant.initial === "function"
                ? (variant.initial as (d: number) => object)(direction)
                : variant.initial
            }
            animate={variant.animate}
            exit={
              typeof variant.exit === "function"
                ? (variant.exit as (d: number) => object)(direction)
                : variant.exit
            }
            transition={variant.transition}
            className="w-full h-full flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-[calc(100vh*16/9)] aspect-video rounded-lg overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/5">
              <div
                ref={slideContentRef}
                className="absolute inset-0 overflow-y-auto scrollbar-none"
              >
                <SlideRenderer
                  title={currentSlide?.title}
                  subtitle={currentSlide?.subtitle}
                  layout={currentSlide?.layout as SlideLayout}
                  contentBlocks={currentSlide?.contentBlocks ?? []}
                  themeKey={themeKey}
                  themeConfig={themeConfig}
                  showSlideNumber
                  slideNumber={currentIndex + 1}
                  scale={1.5}
                />
              </div>
              {/* Scroll indicator — visible when content overflows */}
              {hasOverflow && (
                <div className="absolute right-1 top-2 bottom-2 w-1 z-20 pointer-events-none">
                  <div className="relative h-full w-full rounded-full bg-white/10">
                    <motion.div
                      className="absolute w-full rounded-full bg-white/40"
                      style={{ height: "20%" }}
                      initial={false}
                      animate={{ top: `${scrollProgress * 80}%` }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  </div>
                </div>
              )}
              {/* Spotlight overlay — dims blocks based on spotlight index */}
              {spotlightActive && (currentSlide?.contentBlocks?.length ?? 0) > 0 && (
                <div className="absolute inset-0 z-10 pointer-events-none">
                  {/* Semi-transparent overlay with cutout effect */}
                  <div className="absolute inset-0 bg-black/50 transition-opacity duration-300" />
                  {/* Spotlight indicator badge */}
                  <div className="absolute top-2 right-2 pointer-events-auto flex items-center gap-1.5 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full ring-1 ring-amber-400/30">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[10px] font-medium text-amber-300">
                      Spotlight {spotlightIndex + 1}/{currentSlide?.contentBlocks?.length ?? 0}
                    </span>
                  </div>
                  {/* Block highlight zones — positioned over the content area */}
                  <div className="absolute inset-0 flex flex-col pointer-events-auto">
                    {(currentSlide?.contentBlocks ?? []).map((_, idx) => (
                      <SpotlightBlockWrapper
                        key={idx}
                        blockIndex={idx}
                        spotlightIndex={spotlightIndex}
                        isActive={spotlightActive}
                        onClick={() => setSpotlightIndex(idx)}
                      >
                        <div
                          className="flex-1 min-h-[2rem] cursor-pointer"
                          style={{ flex: 1 }}
                        />
                      </SpotlightBlockWrapper>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Quick-edit overlay */}
        <AnimatePresence>
          {editMode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute inset-x-0 bottom-0 z-50 p-4"
            >
              <div className="mx-auto max-w-2xl rounded-2xl bg-black/80 backdrop-blur-xl ring-1 ring-white/15 p-5 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                    Quick Edit &mdash; Slide {currentIndex + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditMode(false)}
                      className="px-3 py-1.5 text-xs rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={commitEdit}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-400 transition-colors"
                    >
                      <Check weight="bold" className="w-3.5 h-3.5" />
                      Done
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Title */}
                  <div>
                    <label className="block text-[10px] font-medium text-white/40 uppercase tracking-wider mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                      placeholder="Slide title..."
                    />
                  </div>

                  {/* Subtitle */}
                  <div>
                    <label className="block text-[10px] font-medium text-white/40 uppercase tracking-wider mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={editSubtitle}
                      onChange={(e) => setEditSubtitle(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                      placeholder="Slide subtitle..."
                    />
                  </div>

                  {/* Content (first text/bullets block) */}
                  {slides[currentIndex]?.contentBlocks.some(
                    (b) => b.type === "text" || b.type === "bullets"
                  ) && (
                    <div>
                      <label className="block text-[10px] font-medium text-white/40 uppercase tracking-wider mb-1">
                        Content
                      </label>
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none"
                        placeholder="Content text (one bullet per line for bullet lists)..."
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Presenter notes panel (bottom)                                     */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="h-[35vh] border-t border-white/10 bg-[#0a0a0f] flex"
          >
            {/* Speaker Notes */}
            <div className="flex-1 p-5 overflow-hidden flex flex-col min-w-0">
              <div className="flex items-center gap-2 mb-3 shrink-0">
                <SpeakerHigh weight="bold" className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  Speaker Notes
                </span>
              </div>
              <div
                ref={notesRef}
                className="flex-1 overflow-y-auto text-sm text-white/80 leading-relaxed pr-2 scrollbar-thin scrollbar-thumb-white/10"
              >
                {currentSlide?.speakerNotes ? (
                  <p className="whitespace-pre-wrap">{currentSlide.speakerNotes}</p>
                ) : (
                  <p className="text-white/30 italic">No speaker notes for this slide.</p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="w-px bg-white/10 my-4" />

            {/* Next slide preview + timer */}
            <div className="w-80 shrink-0 p-5 flex flex-col gap-4">
              {/* Timer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock weight="bold" className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Elapsed
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-mono text-white/90 tabular-nums">
                    {formatTime(timer.elapsed)}
                  </span>
                  <button
                    onClick={timer.toggle}
                    className="p-1 rounded hover:bg-white/10 transition-colors"
                    aria-label={timer.running ? "Pause timer" : "Resume timer"}
                  >
                    {timer.running ? (
                      <Pause weight="bold" className="w-3.5 h-3.5 text-white/60" />
                    ) : (
                      <Play weight="bold" className="w-3.5 h-3.5 text-white/60" />
                    )}
                  </button>
                </div>
              </div>

              {/* Slide counter */}
              <div className="text-xs text-white/50 text-center">
                Slide{" "}
                <span className="text-white/90 font-semibold">{currentIndex + 1}</span>
                {" / "}
                <span className="text-white/90">{totalSlides}</span>
              </div>

              {/* Next slide preview */}
              <div className="flex-1 flex flex-col min-h-0">
                <span className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                  Up Next
                </span>
                {nextSlide ? (
                  <div className="flex-1 rounded-md overflow-hidden ring-1 ring-white/10 bg-black/40">
                    <SlideRenderer
                      title={nextSlide.title}
                      subtitle={nextSlide.subtitle}
                      layout={nextSlide.layout as SlideLayout}
                      contentBlocks={nextSlide.contentBlocks}
                      themeKey={themeKey}
                      themeConfig={themeConfig}
                      scale={0.5}
                    />
                  </div>
                ) : (
                  <div className="flex-1 rounded-md bg-white/5 flex items-center justify-center">
                    <span className="text-xs text-white/30 italic">End of presentation</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------------ */}
      {/* Card progress bar                                                  */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative shrink-0">
        {/* Card position label */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-t-md bg-black/60 backdrop-blur-sm">
          <span className="text-[10px] font-medium text-white/60 tabular-nums">
            Card{" "}
            <span className="text-white/90 font-semibold">{currentIndex + 1}</span>
            {" of "}
            <span className="text-white/90">{totalSlides}</span>
          </span>
        </div>
        <div className="h-[3px] bg-white/5">
          <motion.div
            className="h-full rounded-r-full"
            style={{
              background: `linear-gradient(90deg, ${theme.primaryColor}, ${theme.accentColor})`,
            }}
            initial={false}
            animate={{
              width: `${((currentIndex + 1) / totalSlides) * 100}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Slide Grid Overlay                                                 */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {showGrid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md overflow-y-auto p-8"
          >
            {/* Close button */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white/80 text-lg font-semibold">
                All Slides
              </h2>
              <button
                onClick={() => setShowGrid(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                aria-label="Close grid"
              >
                <X weight="bold" className="w-5 h-5" />
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={cn(
                    "group relative rounded-lg overflow-hidden transition-all duration-200",
                    "ring-2 hover:ring-4",
                    idx === currentIndex
                      ? "ring-blue-500 shadow-lg shadow-blue-500/20 scale-[1.02]"
                      : "ring-white/10 hover:ring-white/30"
                  )}
                >
                  <div className="aspect-video">
                    <SlideRenderer
                      title={slide.title}
                      subtitle={slide.subtitle}
                      layout={slide.layout as SlideLayout}
                      contentBlocks={slide.contentBlocks}
                      themeKey={themeKey}
                      themeConfig={themeConfig}
                      scale={0.4}
                    />
                  </div>
                  {/* Slide number badge */}
                  <div
                    className={cn(
                      "absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded text-[10px] font-bold",
                      idx === currentIndex
                        ? "bg-blue-500 text-white"
                        : "bg-black/70 text-white/70 group-hover:bg-black/90"
                    )}
                  >
                    {idx + 1}
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------------ */}
      {/* Floating Controls                                                  */}
      {/* ------------------------------------------------------------------ */}
      <PresenterControls
        currentSlide={currentIndex + 1}
        totalSlides={totalSlides}
        elapsedSeconds={timer.elapsed}
        isTimerRunning={timer.running}
        showNotes={showNotes}
        spotlightActive={spotlightActive}
        editActive={editMode}
        onPrevious={goPrev}
        onNext={goNext}
        onToggleTimer={timer.toggle}
        onToggleNotes={() => setShowNotes((v) => !v)}
        onToggleGrid={() => setShowGrid((v) => !v)}
        onToggleFullscreen={toggleFullscreen}
        onToggleEdit={() => {
          if (editMode) {
            commitEdit();
          } else {
            enterEditMode();
          }
        }}
        onToggleSpotlight={() => {
          setSpotlightActive((v) => !v);
          setSpotlightIndex(0);
        }}
        onOpenAudienceWindow={openAudienceWindow}
        onExit={() => {
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          }
          onExit();
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
