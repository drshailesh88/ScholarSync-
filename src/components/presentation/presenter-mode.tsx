"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SlideRendererV2 as SlideRenderer } from "@/components/slides/shared/slide-renderer-v2";
import type {
  ContentBlock,
  SlideLayout,
  SlideMaster,
  ThemeConfig,
} from "@/types/presentation";
import { PRESET_THEMES } from "@/types/presentation";
import { getMaxRevealOrder } from "@/lib/presentation/block-animations";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Monitor,
  Moon,
  Sun,
  Pause,
  Play,
  ArrowsOut,
  X,
} from "@phosphor-icons/react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SlideTransition = "none" | "fade" | "slide" | "zoom";
type NotesFontSize = "small" | "medium" | "large";
type ScreenMode = "normal" | "black" | "white";

interface PresenterSlide {
  id: number;
  title: string | null;
  subtitle: string | null;
  layout: string;
  masterId?: string;
  contentBlocks: ContentBlock[];
  speakerNotes: string | null;
  transition?: SlideTransition;
  hidden?: boolean;
}

interface PresenterModeProps {
  slides: PresenterSlide[];
  masters?: SlideMaster[];
  themeKey: string;
  themeConfig?: ThemeConfig;
  startIndex?: number;
  transition?: SlideTransition;
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
    transition: { duration: 0.3 },
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
    transition: { type: "spring" as const, stiffness: 300, damping: 32 },
  },
  zoom: {
    initial: { scale: 0.92, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.07, opacity: 0 },
    transition: { duration: 0.28 },
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
  const startRef = useRef<number>(Date.now());
  const pausedAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;

    const update = () => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    };

    update();
    const intervalId = window.setInterval(update, 250);
    return () => window.clearInterval(intervalId);
  }, [running]);

  const toggle = useCallback(() => {
    if (running) {
      pausedAtRef.current = Date.now();
      setRunning(false);
      return;
    }

    if (pausedAtRef.current !== null) {
      startRef.current += Date.now() - pausedAtRef.current;
      pausedAtRef.current = null;
    }
    setRunning(true);
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

      if (absDx > 50 && absDx > absDy * 1.5) {
        if (dx < 0) onLeft();
        else onRight();
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
  masters = [],
  themeKey,
  themeConfig,
  startIndex = 0,
  transition = "fade",
  onExit,
}: PresenterModeProps) {
  const theme = themeConfig ?? PRESET_THEMES[themeKey] ?? PRESET_THEMES.modern;

  const visibleSlides = useMemo(
    () => slides.filter((slide) => !slide.hidden),
    [slides]
  );

  const totalSlides = visibleSlides.length;

  const [currentIndex, setCurrentIndex] = useState(
    Math.max(0, Math.min(startIndex, Math.max(totalSlides - 1, 0)))
  );
  const [direction, setDirection] = useState(1);
  const [showPresenterPanel, setShowPresenterPanel] = useState(true);
  const [notesFontSize, setNotesFontSize] = useState<NotesFontSize>("medium");
  const [screenMode, setScreenMode] = useState<ScreenMode>("normal");
  const [jumpValue, setJumpValue] = useState("");
  const [revealedOrder, setRevealedOrder] = useState(0);
  const [activeRevealOrder, setActiveRevealOrder] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const jumpBufferRef = useRef("");
  const jumpBufferTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentIndexRef = useRef(currentIndex);
  const channelRef = useRef<BroadcastChannel | null>(null);

  const timer = useTimer();

  const maxRevealOrder = useMemo(() => {
    const slide = visibleSlides[currentIndex];
    if (!slide) return 0;
    return getMaxRevealOrder(slide.contentBlocks);
  }, [currentIndex, visibleSlides]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    setRevealedOrder(0);
    setActiveRevealOrder(null);
  }, [currentIndex]);

  useEffect(() => {
    setCurrentIndex((prev) => Math.max(0, Math.min(prev, Math.max(totalSlides - 1, 0))));
  }, [totalSlides]);

  const goToSlide = useCallback(
    (index: number) => {
      if (totalSlides === 0) return;
      const clamped = Math.max(0, Math.min(index, totalSlides - 1));
      setDirection(clamped >= currentIndexRef.current ? 1 : -1);
      setActiveRevealOrder(null);
      setCurrentIndex(clamped);
    },
    [totalSlides]
  );

  const goNext = useCallback(() => {
    if (maxRevealOrder > 0 && revealedOrder < maxRevealOrder) {
      const nextOrder = revealedOrder + 1;
      setRevealedOrder(nextOrder);
      setActiveRevealOrder(nextOrder);
      return;
    }

    setActiveRevealOrder(null);
    setCurrentIndex((prev) => {
      if (prev >= totalSlides - 1) return prev;
      setDirection(1);
      return prev + 1;
    });
  }, [maxRevealOrder, revealedOrder, totalSlides]);

  const goPrev = useCallback(() => {
    setActiveRevealOrder(null);
    setCurrentIndex((prev) => {
      if (prev <= 0) return prev;
      setDirection(-1);
      return prev - 1;
    });
  }, []);

  const resetJumpBuffer = useCallback(() => {
    jumpBufferRef.current = "";
    setJumpValue("");
    if (jumpBufferTimeoutRef.current) {
      clearTimeout(jumpBufferTimeoutRef.current);
      jumpBufferTimeoutRef.current = null;
    }
  }, []);

  const bumpJumpBufferTimeout = useCallback(() => {
    if (jumpBufferTimeoutRef.current) {
      clearTimeout(jumpBufferTimeoutRef.current);
    }
    jumpBufferTimeoutRef.current = setTimeout(() => {
      jumpBufferRef.current = "";
      setJumpValue("");
      jumpBufferTimeoutRef.current = null;
    }, 1500);
  }, []);

  const jumpToSlideNumber = useCallback(
    (rawValue: string) => {
      const parsed = Number.parseInt(rawValue.trim(), 10);
      if (!Number.isFinite(parsed) || parsed < 1) return;
      goToSlide(parsed - 1);
      resetJumpBuffer();
    },
    [goToSlide, resetJumpBuffer]
  );

  const openAudienceWindow = useCallback(() => {
    const url = new URL(window.location.href);
    url.pathname = "/presentation/audience";
    window.open(
      url.toString(),
      "audience-view",
      "width=1280,height=720,menubar=no,toolbar=no"
    );
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      containerRef.current?.requestFullscreen?.().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const channel = new BroadcastChannel("presenter-slide-sync");
    channelRef.current = channel;

    channel.onmessage = (e) => {
      if (e.data?.type !== "audience-ready") return;

      channel.postMessage({
        type: "init",
        slides: visibleSlides.map((slide) => ({
          title: slide.title ?? "",
          subtitle: slide.subtitle ?? "",
          layout: slide.layout,
          masterId: slide.masterId,
          contentBlocks: slide.contentBlocks,
          transition: slide.transition,
        })),
        masters,
        themeKey,
        themeConfig: theme,
        screenMode,
      });

      channel.postMessage({ type: "slide", index: currentIndexRef.current });
    };

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, [visibleSlides, masters, themeKey, theme, screenMode]);

  useEffect(() => {
    channelRef.current?.postMessage({ type: "slide", index: currentIndex });
  }, [currentIndex]);

  useEffect(() => {
    channelRef.current?.postMessage({ type: "screen-mode", mode: screenMode });
  }, [screenMode]);

  useEffect(() => {
    const notesElement = notesRef.current;
    if (!notesElement) return;

    if (typeof notesElement.scrollTo === "function") {
      notesElement.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      notesElement.scrollTop = 0;
    }
  }, [currentIndex]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const editable =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (editable && e.key !== "Escape") {
        return;
      }

      if (!e.ctrlKey && !e.metaKey && !e.altKey && /^\d$/.test(e.key)) {
        e.preventDefault();
        jumpBufferRef.current += e.key;
        setJumpValue(jumpBufferRef.current);
        bumpJumpBufferTimeout();
        return;
      }

      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          goNext();
          break;

        case "Enter":
          e.preventDefault();
          if (jumpBufferRef.current) {
            jumpToSlideNumber(jumpBufferRef.current);
          } else {
            goNext();
          }
          break;

        case "ArrowLeft":
          e.preventDefault();
          goPrev();
          break;

        case "Backspace":
          e.preventDefault();
          if (jumpBufferRef.current.length > 0) {
            jumpBufferRef.current = jumpBufferRef.current.slice(0, -1);
            setJumpValue(jumpBufferRef.current);
            if (jumpBufferRef.current.length === 0) {
              if (jumpBufferTimeoutRef.current) {
                clearTimeout(jumpBufferTimeoutRef.current);
                jumpBufferTimeoutRef.current = null;
              }
            } else {
              bumpJumpBufferTimeout();
            }
          } else {
            goPrev();
          }
          break;

        case "Escape":
          e.preventDefault();
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          }
          onExit();
          break;

        case "Home":
          e.preventDefault();
          goToSlide(0);
          break;

        case "End":
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;

        case "b":
        case "B":
          e.preventDefault();
          setScreenMode((mode) => (mode === "black" ? "normal" : "black"));
          break;

        case "w":
        case "W":
          e.preventDefault();
          setScreenMode((mode) => (mode === "white" ? "normal" : "white"));
          break;

        case "n":
        case "N":
          e.preventDefault();
          setShowPresenterPanel((v) => !v);
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    bumpJumpBufferTimeout,
    goNext,
    goPrev,
    goToSlide,
    jumpToSlideNumber,
    onExit,
    totalSlides,
  ]);

  useEffect(() => {
    return () => {
      if (jumpBufferTimeoutRef.current) {
        clearTimeout(jumpBufferTimeoutRef.current);
      }
    };
  }, []);

  const swipeHandlers = useSwipe(goNext, goPrev);

  const currentSlide = visibleSlides[currentIndex] ?? null;
  const nextSlide = currentIndex < totalSlides - 1 ? visibleSlides[currentIndex + 1] : null;
  const currentSlideNumber = totalSlides > 0 ? currentIndex + 1 : 0;
  const clickProgressTotal = maxRevealOrder > 0 ? maxRevealOrder : 1;
  const clickProgressCurrent = maxRevealOrder > 0
    ? Math.min(revealedOrder + 1, clickProgressTotal)
    : 1;
  const revealSequenceComplete = maxRevealOrder > 0 && revealedOrder >= maxRevealOrder;

  const currentTransition = currentSlide?.transition ?? transition;
  const variant = slideVariants[currentTransition];

  const notesFontSizeClass =
    notesFontSize === "small"
      ? "text-sm"
      : notesFontSize === "large"
        ? "text-lg"
        : "text-base";

  if (totalSlides === 0 || !currentSlide) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
        <div className="text-center text-white/70">
          <p className="text-lg font-medium">No visible slides to present.</p>
          <button
            onClick={onExit}
            className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            Exit Presentation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black text-white select-none"
      {...swipeHandlers}
    >
      <div className="flex h-full">
        <section
          className={cn(
            "relative h-full overflow-hidden transition-all duration-200",
            showPresenterPanel ? "w-[70%]" : "w-full"
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
              className="h-full w-full p-4"
            >
              <div
                data-testid="current-slide-panel"
                className="relative h-full w-full rounded-xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10"
                onClick={goNext}
              >
                <div className="absolute inset-0 overflow-y-auto">
                  <SlideRenderer
                    title={currentSlide.title}
                    subtitle={currentSlide.subtitle}
                    layout={currentSlide.layout as SlideLayout}
                    masterId={currentSlide.masterId}
                    masters={masters}
                    contentBlocks={currentSlide.contentBlocks}
                    themeKey={themeKey}
                    themeConfig={themeConfig}
                    showSlideNumber
                    slideNumber={currentSlideNumber}
                    scale={1.4}
                    animateBlocks
                    revealOrder={revealedOrder}
                    activeRevealOrder={activeRevealOrder}
                    hideUnrevealedAnimated={maxRevealOrder > 0}
                  />
                </div>

                {screenMode !== "normal" && (
                  <div
                    data-testid={
                      screenMode === "black"
                        ? "presenter-black-screen"
                        : "presenter-white-screen"
                    }
                    className={cn(
                      "absolute inset-0 z-20 flex items-center justify-center text-sm font-semibold uppercase tracking-[0.2em]",
                      screenMode === "black" ? "bg-black text-white/50" : "bg-white text-black/50"
                    )}
                  >
                    {screenMode === "black" ? "Black Screen" : "White Screen"}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
            <button
              onClick={() => setShowPresenterPanel((v) => !v)}
              className="px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black/85 text-xs font-medium transition-colors"
            >
              {showPresenterPanel ? "Hide Panel (N)" : "Show Panel (N)"}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-black/70 hover:bg-black/85 transition-colors"
              aria-label="Toggle fullscreen"
              title="Fullscreen"
            >
              <ArrowsOut className="w-4 h-4" weight="bold" />
            </button>
            <button
              onClick={onExit}
              className="p-2 rounded-lg bg-black/70 hover:bg-red-600/80 transition-colors"
              aria-label="Exit presentation"
              title="Exit"
            >
              <X className="w-4 h-4" weight="bold" />
            </button>
          </div>
        </section>

        {showPresenterPanel && (
          <aside className="w-[30%] min-w-[320px] border-l border-white/10 bg-[#090b12] flex flex-col">
            <div className="px-4 py-3 border-b border-white/10">
              <div className="flex items-center justify-between gap-2">
                <div data-testid="slide-counter" className="text-sm text-white/85 font-medium">
                  Slide <span className="font-semibold">{currentSlideNumber}</span>
                  <span className="text-white/40"> / </span>
                  <span className="text-white/70">{totalSlides}</span>
                </div>
                <button
                  onClick={openAudienceWindow}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-xs transition-colors"
                >
                  <Monitor className="w-3.5 h-3.5" weight="bold" />
                  Audience
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-xs text-white/60 uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" weight="bold" />
                  Timer
                </div>
                <div className="flex items-center gap-2">
                  <span data-testid="presenter-timer" className="font-mono tabular-nums text-base text-white/90">
                    {formatTime(timer.elapsed)}
                  </span>
                  <button
                    onClick={timer.toggle}
                    className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label={timer.running ? "Pause timer" : "Resume timer"}
                  >
                    {timer.running ? (
                      <Pause className="w-3.5 h-3.5" weight="bold" />
                    ) : (
                      <Play className="w-3.5 h-3.5" weight="bold" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => setScreenMode((mode) => (mode === "black" ? "normal" : "black"))}
                  className={cn(
                    "px-2.5 py-1.5 rounded-md text-xs transition-colors",
                    screenMode === "black"
                      ? "bg-white text-black"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  )}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Moon className="w-3.5 h-3.5" weight="bold" />
                    Black (B)
                  </span>
                </button>
                <button
                  onClick={() => setScreenMode((mode) => (mode === "white" ? "normal" : "white"))}
                  className={cn(
                    "px-2.5 py-1.5 rounded-md text-xs transition-colors",
                    screenMode === "white"
                      ? "bg-white text-black"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  )}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5" weight="bold" />
                    White (W)
                  </span>
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 flex flex-col border-b border-white/10">
              <div className="px-4 pt-4 pb-2 flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    Speaker Notes
                  </h2>
                  <p data-testid="presenter-animation-progress" className="mt-1 text-[11px] text-white/45">
                    Click {clickProgressCurrent} of {clickProgressTotal}
                    {revealSequenceComplete ? " • Next click advances slide" : ""}
                  </p>
                </div>
                <div className="inline-flex items-center rounded-md border border-white/10 overflow-hidden text-xs">
                  <button
                    onClick={() => setNotesFontSize("small")}
                    className={cn(
                      "px-2 py-1 transition-colors",
                      notesFontSize === "small"
                        ? "bg-white text-black"
                        : "bg-white/5 hover:bg-white/10"
                    )}
                  >
                    S
                  </button>
                  <button
                    onClick={() => setNotesFontSize("medium")}
                    className={cn(
                      "px-2 py-1 transition-colors",
                      notesFontSize === "medium"
                        ? "bg-white text-black"
                        : "bg-white/5 hover:bg-white/10"
                    )}
                  >
                    M
                  </button>
                  <button
                    onClick={() => setNotesFontSize("large")}
                    className={cn(
                      "px-2 py-1 transition-colors",
                      notesFontSize === "large"
                        ? "bg-white text-black"
                        : "bg-white/5 hover:bg-white/10"
                    )}
                  >
                    L
                  </button>
                </div>
              </div>

              <div
                ref={notesRef}
                data-testid="presenter-notes"
                className={cn(
                  "px-4 pb-4 flex-1 overflow-y-auto leading-relaxed text-white/85",
                  notesFontSizeClass
                )}
              >
                {currentSlide.speakerNotes?.trim() ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => <p className="mb-3">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-1">{children}</ol>,
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="underline text-blue-300 hover:text-blue-200"
                        >
                          {children}
                        </a>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-white">{children}</strong>
                      ),
                      em: ({ children }) => <em className="italic text-white/95">{children}</em>,
                    }}
                  >
                    {currentSlide.speakerNotes}
                  </ReactMarkdown>
                ) : (
                  <p className="text-white/40 italic">No speaker notes for this slide.</p>
                )}
              </div>
            </div>

            <div className="px-4 py-3 border-b border-white/10">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                Next Slide
              </h3>
              <div data-testid="next-slide-preview" className="space-y-2">
                {nextSlide ? (
                  <>
                    <p className="text-sm text-white/80 truncate">
                      {nextSlide.title || `Slide ${currentSlideNumber + 1}`}
                    </p>
                    <div className="aspect-video rounded-md overflow-hidden ring-1 ring-white/15 bg-black/40">
                      <SlideRenderer
                        title={nextSlide.title}
                        subtitle={nextSlide.subtitle}
                        layout={nextSlide.layout as SlideLayout}
                        masterId={nextSlide.masterId}
                        masters={masters}
                        contentBlocks={nextSlide.contentBlocks}
                        themeKey={themeKey}
                        themeConfig={themeConfig}
                        scale={0.42}
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-white/40 italic">End of presentation</p>
                )}
              </div>
            </div>

            <div className="px-4 py-4 space-y-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={goPrev}
                  disabled={currentIndex <= 0}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" weight="bold" />
                  Prev
                </button>
                <button
                  onClick={goNext}
                  disabled={
                    currentIndex >= totalSlides - 1 &&
                    (maxRevealOrder === 0 || revealedOrder >= maxRevealOrder)
                  }
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ArrowRight className="w-4 h-4" weight="bold" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  jumpToSlideNumber(jumpValue);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={jumpValue}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "");
                    setJumpValue(digits);
                    jumpBufferRef.current = digits;
                    if (digits) bumpJumpBufferTimeout();
                  }}
                  placeholder="Slide #"
                  aria-label="Jump to slide"
                  className="flex-1 rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                />
                <button
                  type="submit"
                  className="rounded-md px-3 py-2 text-sm bg-blue-600 hover:bg-blue-500 transition-colors"
                >
                  Jump
                </button>
              </form>

              <p className="text-[11px] text-white/40">
                Keys: Right/Space/Enter next, Left/Backspace prev, Home/End, digits + Enter jump, B black, W white.
              </p>
            </div>
          </aside>
        )}
      </div>
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
