"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  X,
  Pause,
  Play,
  GridFour,
  ArrowsOut,
  SpeakerHigh,
  Clock,
} from "@phosphor-icons/react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PresenterControlsProps {
  currentSlide: number;
  totalSlides: number;
  elapsedSeconds: number;
  isTimerRunning: boolean;
  showNotes: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onToggleTimer: () => void;
  onToggleNotes: () => void;
  onToggleGrid: () => void;
  onToggleFullscreen: () => void;
  onExit: () => void;
}

// ---------------------------------------------------------------------------
// Auto-hide Hook
// ---------------------------------------------------------------------------

function useAutoHide(delayMs = 3000) {
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const resetTimer = useCallback(() => {
    setVisible(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(false), delayMs);
  }, [delayMs]);

  useEffect(() => {
    const onMove = () => resetTimer();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchstart", onMove);

    // Start initial auto-hide timer
    timeoutRef.current = setTimeout(() => setVisible(false), delayMs);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onMove);
      clearTimeout(timeoutRef.current);
    };
  }, [resetTimer, delayMs]);

  return visible;
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function PresenterControls({
  currentSlide,
  totalSlides,
  elapsedSeconds,
  isTimerRunning,
  showNotes,
  onPrevious,
  onNext,
  onToggleTimer,
  onToggleNotes,
  onToggleGrid,
  onToggleFullscreen,
  onExit,
}: PresenterControlsProps) {
  const visible = useAutoHide(3000);

  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[10000]"
        >
          <div className="flex items-center gap-1 px-3 py-2 bg-black/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/40 ring-1 ring-white/10">
            {/* Previous */}
            <ControlButton
              onClick={onPrevious}
              disabled={currentSlide <= 1}
              tooltip="Previous (Left)"
              aria-label="Previous slide"
            >
              <ArrowLeft weight="bold" className="w-4 h-4" />
            </ControlButton>

            {/* Slide Counter */}
            <div className="px-3 py-1 min-w-[72px] text-center">
              <span className="text-sm font-semibold text-white tabular-nums">
                {currentSlide}
              </span>
              <span className="text-sm text-white/40 mx-1">/</span>
              <span className="text-sm text-white/60 tabular-nums">
                {totalSlides}
              </span>
            </div>

            {/* Next */}
            <ControlButton
              onClick={onNext}
              disabled={currentSlide >= totalSlides}
              tooltip="Next (Right / Space)"
              aria-label="Next slide"
            >
              <ArrowRight weight="bold" className="w-4 h-4" />
            </ControlButton>

            {/* Divider */}
            <Divider />

            {/* Timer */}
            <div className="flex items-center gap-1.5 px-2">
              <Clock weight="bold" className="w-3.5 h-3.5 text-white/50" />
              <span className="text-xs font-mono text-white/70 tabular-nums min-w-[40px]">
                {formatTime(elapsedSeconds)}
              </span>
              <ControlButton
                onClick={onToggleTimer}
                size="sm"
                tooltip={isTimerRunning ? "Pause Timer" : "Resume Timer"}
                aria-label={isTimerRunning ? "Pause timer" : "Resume timer"}
              >
                {isTimerRunning ? (
                  <Pause weight="bold" className="w-3 h-3" />
                ) : (
                  <Play weight="bold" className="w-3 h-3" />
                )}
              </ControlButton>
            </div>

            {/* Divider */}
            <Divider />

            {/* Speaker Notes Toggle */}
            <ControlButton
              onClick={onToggleNotes}
              active={showNotes}
              tooltip="Speaker Notes (N)"
              aria-label="Toggle speaker notes"
            >
              <SpeakerHigh weight="bold" className="w-4 h-4" />
            </ControlButton>

            {/* Grid Toggle */}
            <ControlButton
              onClick={onToggleGrid}
              tooltip="Slide Grid (G)"
              aria-label="Toggle slide grid"
            >
              <GridFour weight="bold" className="w-4 h-4" />
            </ControlButton>

            {/* Fullscreen Toggle */}
            <ControlButton
              onClick={onToggleFullscreen}
              tooltip="Fullscreen"
              aria-label="Toggle fullscreen"
            >
              <ArrowsOut weight="bold" className="w-4 h-4" />
            </ControlButton>

            {/* Divider */}
            <Divider />

            {/* Exit */}
            <ControlButton
              onClick={onExit}
              variant="danger"
              tooltip="Exit (Esc)"
              aria-label="Exit presenter mode"
            >
              <X weight="bold" className="w-4 h-4" />
            </ControlButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface ControlButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
  variant?: "default" | "danger";
  size?: "sm" | "md";
  tooltip?: string;
}

function ControlButton({
  children,
  active = false,
  variant = "default",
  size = "md",
  tooltip,
  disabled,
  className,
  ...props
}: ControlButtonProps) {
  return (
    <button
      title={tooltip}
      disabled={disabled}
      className={cn(
        "relative rounded-xl transition-all duration-150 flex items-center justify-center",
        size === "md" ? "w-9 h-9" : "w-6 h-6",
        variant === "default" && [
          "text-white/70 hover:text-white hover:bg-white/10",
          active && "text-blue-400 bg-blue-400/15 hover:bg-blue-400/20",
        ],
        variant === "danger" && "text-red-400/80 hover:text-red-400 hover:bg-red-400/15",
        disabled && "opacity-30 pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-white/10 mx-1" />;
}
