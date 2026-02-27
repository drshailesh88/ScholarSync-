"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowsOutSimple,
  ArrowsInSimple,
} from "@phosphor-icons/react";
import { SlideRenderer } from "./slide-renderer";
import { PRESET_THEMES } from "@/types/presentation";
import type { ContentBlock, ThemeConfig, SlideLayout } from "@/types/presentation";
import { AnimatePresence, motion } from "framer-motion";

interface SlideData {
  id: number;
  sortOrder: number;
  layout: string | null;
  title: string | null;
  subtitle: string | null;
  contentBlocks: unknown;
  speakerNotes: string | null;
}

interface SharedPresentationViewerProps {
  title: string;
  slides: SlideData[];
  theme: string | null;
  themeConfig: unknown;
}

export function SharedPresentationViewer({
  title,
  slides,
  theme,
  themeConfig,
}: SharedPresentationViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [direction, setDirection] = useState(0);

  const themeKey = theme ?? "modern";
  const resolvedTheme = (themeConfig as ThemeConfig | undefined) ??
    PRESET_THEMES[themeKey] ??
    PRESET_THEMES.modern;

  const totalSlides = slides.length;
  const currentSlide = slides[currentIndex];

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

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
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
  }, [goNext, goPrev, toggleFullscreen]);

  // Listen for fullscreen changes (e.g. Escape key in browser)
  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  if (!currentSlide) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-ink-muted">This presentation has no slides.</p>
      </div>
    );
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col">
      {/* Slide area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        <div className="relative w-full max-w-5xl aspect-video">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl"
            >
              <SlideRenderer
                title={currentSlide.title}
                subtitle={currentSlide.subtitle}
                layout={(currentSlide.layout ?? "title_content") as SlideLayout}
                contentBlocks={
                  (currentSlide.contentBlocks as ContentBlock[]) ?? []
                }
                themeKey={themeKey}
                themeConfig={resolvedTheme}
                className="w-full h-full"
                showSlideNumber
                slideNumber={currentIndex + 1}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 flex items-center justify-between px-6 py-3 bg-[#0f172a] border-t border-white/8">
        <div className="text-xs text-[#94a3b8] truncate max-w-[200px]">
          {title}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ArrowLeft size={18} />
          </button>

          <span className="text-sm text-[#94a3b8] tabular-nums min-w-[60px] text-center">
            {currentIndex + 1} / {totalSlides}
          </span>

          <button
            onClick={goNext}
            disabled={currentIndex === totalSlides - 1}
            className="p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ArrowRight size={18} />
          </button>

          <div className="w-px h-5 bg-white/10 mx-1" />

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

        <div className="text-xs text-[#94a3b8] opacity-50">
          ScholarSync
        </div>
      </div>
    </div>
  );
}
