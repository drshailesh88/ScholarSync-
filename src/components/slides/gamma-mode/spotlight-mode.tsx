"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUp, ArrowDown, Flashlight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { ContentBlock, ThemeConfig } from "@/types/presentation";
import { SpotlightBlockWrapper } from "./spotlight-wrapper";

// ---------------------------------------------------------------------------
// SpotlightOverlay — progressive reveal overlay for presenter mode.
// Highlights one content block at a time while dimming the rest.
// ---------------------------------------------------------------------------

interface SpotlightOverlayProps {
  contentBlocks: ContentBlock[];
  theme: ThemeConfig;
  isActive: boolean;
  onClose: () => void;
  /** Render function for each content block */
  renderBlock: (block: ContentBlock, index: number) => React.ReactNode;
}

export function SpotlightOverlay({
  contentBlocks,
  theme,
  isActive,
  onClose,
  renderBlock,
}: SpotlightOverlayProps) {
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const totalBlocks = contentBlocks.length;

  // Keyboard navigation: ArrowUp/ArrowDown to move spotlight
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isActive) return;
      // Don't capture if an input is focused
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          e.stopPropagation();
          setSpotlightIndex((prev) => Math.min(prev + 1, totalBlocks - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          e.stopPropagation();
          setSpotlightIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Escape":
          e.preventDefault();
          e.stopPropagation();
          onClose();
          break;
      }
    },
    [isActive, totalBlocks, onClose]
  );

  useEffect(() => {
    if (!isActive) return;
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () =>
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [isActive, handleKeyDown]);

  if (!isActive || totalBlocks === 0) return null;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-40"
        >
          {/* Spotlight indicator bar */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-full ring-1 ring-white/20">
            <Flashlight weight="fill" className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-medium text-white/80">
              Spotlight {spotlightIndex + 1} / {totalBlocks}
            </span>

            <div className="w-px h-3 bg-white/20 mx-1" />

            <button
              onClick={() =>
                setSpotlightIndex((prev) => Math.max(prev - 1, 0))
              }
              disabled={spotlightIndex <= 0}
              className={cn(
                "p-0.5 rounded transition-colors",
                spotlightIndex <= 0
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-white/10 text-white/70 hover:text-white"
              )}
              aria-label="Previous block"
            >
              <ArrowUp weight="bold" className="w-3 h-3" />
            </button>

            <button
              onClick={() =>
                setSpotlightIndex((prev) =>
                  Math.min(prev + 1, totalBlocks - 1)
                )
              }
              disabled={spotlightIndex >= totalBlocks - 1}
              className={cn(
                "p-0.5 rounded transition-colors",
                spotlightIndex >= totalBlocks - 1
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-white/10 text-white/70 hover:text-white"
              )}
              aria-label="Next block"
            >
              <ArrowDown weight="bold" className="w-3 h-3" />
            </button>

            <div className="w-px h-3 bg-white/20 mx-1" />

            <button
              onClick={onClose}
              className="p-0.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              aria-label="Exit spotlight mode"
            >
              <X weight="bold" className="w-3 h-3" />
            </button>
          </div>

          {/* Block progress dots */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1.5">
            {contentBlocks.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSpotlightIndex(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  idx === spotlightIndex
                    ? "scale-125"
                    : idx < spotlightIndex
                      ? "bg-white/30 hover:bg-white/50"
                      : "bg-white/10 hover:bg-white/30"
                )}
                style={
                  idx === spotlightIndex
                    ? { backgroundColor: theme.accentColor ?? "#3B82F6" }
                    : undefined
                }
                aria-label={`Go to block ${idx + 1}`}
              />
            ))}
          </div>

          {/* Content blocks with spotlight wrappers */}
          <div className="flex flex-col gap-2 p-4 h-full overflow-y-auto">
            {contentBlocks.map((block, idx) => (
              <SpotlightBlockWrapper
                key={idx}
                blockIndex={idx}
                spotlightIndex={spotlightIndex}
                isActive={isActive}
                onClick={() => setSpotlightIndex(idx)}
              >
                {renderBlock(block, idx)}
              </SpotlightBlockWrapper>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
