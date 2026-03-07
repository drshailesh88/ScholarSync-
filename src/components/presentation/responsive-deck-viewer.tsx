"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowsOutSimple,
  ArrowsInSimple,
  ShareNetwork,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  SlideRendererV2,
  computeScaleFactor,
  SLIDE_REF_WIDTH,
  SLIDE_REF_HEIGHT,
} from "@/components/slides/shared/slide-renderer-v2";
import { cn } from "@/lib/utils";
import type {
  ContentBlock,
  SlideLayout,
  ThemeConfig,
} from "@/types/presentation";
import { PRESET_THEMES } from "@/types/presentation";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SlideData {
  id: number;
  sortOrder: number;
  layout: string | null;
  title: string | null;
  subtitle: string | null;
  contentBlocks: unknown;
  speakerNotes: string | null;
}

export interface ResponsiveDeckViewerProps {
  title: string;
  slides: SlideData[];
  theme: string | null;
  themeConfig: unknown;
}

// ---------------------------------------------------------------------------
// Swipe / gesture detection
// ---------------------------------------------------------------------------

/** Minimum horizontal distance (px) to register a swipe */
const SWIPE_THRESHOLD = 50;
/** Maximum time (ms) for a gesture to count as a swipe */
const SWIPE_MAX_TIME = 500;
/** Maximum movement (px) to count as a tap */
const TAP_THRESHOLD = 10;
/** Time (ms) before auto-hiding controls on mobile */
const CONTROLS_HIDE_DELAY = 3000;

export type SwipeResult = "left" | "right" | "tap" | null;

/**
 * Determine swipe direction from touch delta and duration.
 * Exported for unit testing.
 */
export function detectSwipeDirection(
  dx: number,
  dy: number,
  dt: number
): SwipeResult {
  // Tap: short duration with minimal movement
  if (
    dt < 300 &&
    Math.abs(dx) < TAP_THRESHOLD &&
    Math.abs(dy) < TAP_THRESHOLD
  ) {
    return "tap";
  }

  // Horizontal swipe: enough distance, mostly horizontal, fast enough
  if (
    Math.abs(dx) > SWIPE_THRESHOLD &&
    Math.abs(dx) > Math.abs(dy) * 1.5 &&
    dt < SWIPE_MAX_TIME
  ) {
    return dx < 0 ? "left" : "right";
  }

  return null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ResponsiveDeckViewer({
  title,
  slides,
  theme,
  themeConfig,
}: ResponsiveDeckViewerProps) {
  const { isMobile, isDesktop } = useMediaQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [direction, setDirection] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const [scaleFactor, setScaleFactor] = useState(1);
  const touchRef = useRef({ startX: 0, startY: 0, startTime: 0 });

  // On non-mobile, controls are always visible regardless of state
  const controlsVisible = !isMobile || showControls;

  const themeKey = theme ?? "modern";
  const resolvedTheme =
    (themeConfig as ThemeConfig | undefined) ??
    PRESET_THEMES[themeKey] ??
    PRESET_THEMES.modern;

  const totalSlides = slides.length;
  const currentSlide = slides[currentIndex];

  // -- Navigation --------------------------------------------------------

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

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  // -- Fullscreen --------------------------------------------------------

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  // -- Share -------------------------------------------------------------

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  }, [title]);

  // -- Auto-hide controls on mobile -------------------------------------

  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    if (isMobile) {
      controlsTimerRef.current = setTimeout(
        () => setShowControls(false),
        CONTROLS_HIDE_DELAY
      );
    }
  }, [isMobile]);

  // Start auto-hide timer when entering mobile mode
  useEffect(() => {
    if (!isMobile) {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
        controlsTimerRef.current = null;
      }
      return;
    }

    controlsTimerRef.current = setTimeout(
      () => setShowControls(false),
      CONTROLS_HIDE_DELAY
    );

    return () => {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
        controlsTimerRef.current = null;
      }
    };
  }, [isMobile]);

  // -- Responsive scaling via ResizeObserver -----------------------------

  useEffect(() => {
    const el = slideContainerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width > 0) {
          setScaleFactor(computeScaleFactor(width));
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // -- Keyboard navigation -----------------------------------------------

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          goNext();
          resetControlsTimer();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goPrev();
          resetControlsTimer();
          break;
        case "Escape":
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
            setIsFullscreen(false);
          }
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, toggleFullscreen, resetControlsTimer]);

  // -- Fullscreen change listener ----------------------------------------

  useEffect(() => {
    function handleChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", handleChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  // -- Touch gesture handlers --------------------------------------------

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchRef.current = {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      startTime: Date.now(),
    };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchRef.current.startX;
      const dy = e.changedTouches[0].clientY - touchRef.current.startY;
      const dt = Date.now() - touchRef.current.startTime;

      const result = detectSwipeDirection(dx, dy, dt);

      switch (result) {
        case "tap":
          setShowControls((prev) => !prev);
          resetControlsTimer();
          break;
        case "left":
          goNext();
          resetControlsTimer();
          break;
        case "right":
          goPrev();
          resetControlsTimer();
          break;
      }
    },
    [goNext, goPrev, resetControlsTimer]
  );

  // -- Render ------------------------------------------------------------

  if (!currentSlide) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <p className="text-[#94a3b8]">This presentation has no slides.</p>
      </div>
    );
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const scaledHeight = SLIDE_REF_HEIGHT * scaleFactor;

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col">
      {/* Slide area */}
      <div
        className={cn(
          "flex-1 flex items-center justify-center overflow-hidden",
          isDesktop ? "p-8" : isMobile ? "p-2" : "p-4"
        )}
        onTouchStart={!isDesktop ? handleTouchStart : undefined}
        onTouchEnd={!isDesktop ? handleTouchEnd : undefined}
        style={!isDesktop ? { touchAction: "pinch-zoom" } : undefined}
      >
        <div
          ref={slideContainerRef}
          className={cn("relative w-full", isDesktop && "max-w-5xl")}
          style={{ height: scaledHeight, overflow: "hidden" }}
          data-testid="slide-container"
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: isMobile ? 0.2 : 0.3,
                ease: "easeInOut",
              }}
              className="absolute inset-0"
            >
              <div
                style={{
                  width: SLIDE_REF_WIDTH,
                  height: SLIDE_REF_HEIGHT,
                  transform: `scale(${scaleFactor})`,
                  transformOrigin: "top left",
                }}
              >
                <SlideRendererV2
                  title={currentSlide.title}
                  subtitle={currentSlide.subtitle}
                  layout={
                    (currentSlide.layout ?? "title_content") as SlideLayout
                  }
                  contentBlocks={
                    (currentSlide.contentBlocks as ContentBlock[]) ?? []
                  }
                  themeKey={themeKey}
                  themeConfig={resolvedTheme}
                  className="w-full h-full rounded-lg shadow-2xl"
                  showSlideNumber
                  slideNumber={currentIndex + 1}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation dots — mobile & tablet */}
      {!isDesktop && totalSlides > 1 && (
        <div
          className={cn(
            "flex justify-center gap-1.5 py-2 transition-opacity duration-200",
            !controlsVisible && "opacity-0 pointer-events-none"
          )}
          data-testid="navigation-dots"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              className={cn(
                "rounded-full transition-all",
                i === currentIndex
                  ? "w-2.5 h-2.5 bg-white"
                  : "w-2 h-2 bg-white/30 hover:bg-white/50"
              )}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              data-testid={`dot-${i}`}
            />
          ))}
        </div>
      )}

      {/* Bottom toolbar */}
      <div
        className={cn(
          "flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0f172a] border-t border-white/8",
          isMobile
            ? cn(
                "fixed bottom-0 left-0 right-0 z-50 transition-transform duration-200",
                !controlsVisible && "translate-y-full"
              )
            : "shrink-0"
        )}
        data-testid="toolbar"
      >
        <div className="text-xs text-[#94a3b8] truncate max-w-[100px] sm:max-w-[200px]">
          {title}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Prev/Next arrows — desktop & tablet only */}
          {!isMobile && (
            <button
              onClick={() => {
                goPrev();
                resetControlsTimer();
              }}
              disabled={currentIndex === 0}
              className="p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous slide"
            >
              <ArrowLeft size={18} />
            </button>
          )}

          <span
            className="text-sm text-[#94a3b8] tabular-nums min-w-[50px] sm:min-w-[60px] text-center"
            data-testid="slide-counter"
          >
            {currentIndex + 1} / {totalSlides}
          </span>

          {!isMobile && (
            <button
              onClick={() => {
                goNext();
                resetControlsTimer();
              }}
              disabled={currentIndex === totalSlides - 1}
              className="p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next slide"
            >
              <ArrowRight size={18} />
            </button>
          )}

          <div className="w-px h-5 bg-white/10 mx-0.5 sm:mx-1" />

          <button
            onClick={handleShare}
            className="p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Share presentation"
          >
            <ShareNetwork size={18} />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <ArrowsInSimple size={18} />
            ) : (
              <ArrowsOutSimple size={18} />
            )}
          </button>
        </div>

        {!isMobile && (
          <div className="text-xs text-[#94a3b8] opacity-50">ScholarSync</div>
        )}
      </div>

      {/* Spacer for fixed mobile toolbar */}
      {isMobile && <div className="h-12 shrink-0" />}
    </div>
  );
}
