"use client";

import { useState, useEffect, useRef, useCallback, type RefObject } from "react";
import { updateReadingProgress } from "@/lib/library/service";

interface UseReadingProgressOptions {
  libraryId: string;
  scrollRef: RefObject<HTMLDivElement | null>;
  initialProgress: number;
  debounceMs?: number;
}

/**
 * Track reading progress via scroll position.
 * Debounced writes (15s) + flush on blur/route change.
 */
export function useReadingProgress({
  libraryId,
  scrollRef,
  initialProgress,
  debounceMs = 15_000,
}: UseReadingProgressOptions) {
  const [progress, setProgress] = useState(initialProgress);
  const pendingRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flush = useCallback(async () => {
    if (pendingRef.current != null && pendingRef.current !== initialProgress) {
      const value = pendingRef.current;
      pendingRef.current = null;
      try {
        await updateReadingProgress(libraryId, value);
      } catch {
        // Silently fail — progress is non-critical
      }
    }
  }, [libraryId, initialProgress]);

  const scheduleFlush = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(flush, debounceMs);
  }, [flush, debounceMs]);

  // Scroll handler
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function handleScroll() {
      if (!el) return;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll <= 0) return;

      const pct = Math.round((scrollTop / maxScroll) * 100);
      const clamped = Math.max(0, Math.min(100, pct));

      // Only track forward progress
      setProgress((prev) => {
        const next = Math.max(prev, clamped);
        if (next !== prev) {
          pendingRef.current = next;
          scheduleFlush();
        }
        return next;
      });
    }

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [scrollRef, scheduleFlush]);

  // Flush on blur and beforeunload
  useEffect(() => {
    window.addEventListener("blur", flush);
    window.addEventListener("beforeunload", flush);
    return () => {
      window.removeEventListener("blur", flush);
      window.removeEventListener("beforeunload", flush);
      flush(); // Flush on unmount (route change)
    };
  }, [flush]);

  return { progress };
}
