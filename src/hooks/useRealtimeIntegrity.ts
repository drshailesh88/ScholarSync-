/**
 * Hook for real-time AI detection scoring as the user types.
 * Debounces text changes and only fires when text is long enough
 * and has changed significantly since the last check.
 */

"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const DEBOUNCE_MS = 2000;
const MIN_TEXT_LENGTH = 100;
const MIN_CHANGE_LENGTH = 10;

interface RealtimeIntegrityState {
  score: number | null;
  loading: boolean;
  error: string | null;
}

export function useRealtimeIntegrity(
  text: string,
  enabled: boolean,
): RealtimeIntegrityState {
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lastCheckedTextRef = useRef<string>("");
  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkIntegrity = useCallback(async (textToCheck: string) => {
    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/integrity-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToCheck, mode: "ai_detection" }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Check failed (${res.status})`);
      }

      const result = await res.json();
      setScore(result.aiDetection?.humanScore ?? null);
      lastCheckedTextRef.current = textToCheck;
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        // Request was cancelled — not an error
        return;
      }
      setError(
        err instanceof Error ? err.message : "Integrity check failed",
      );
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    // Clear timer on every text change
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }

    if (!enabled || text.length < MIN_TEXT_LENGTH) {
      return;
    }

    // Check if text changed significantly from last checked text
    const diff = Math.abs(text.length - lastCheckedTextRef.current.length);
    const isFirstCheck = lastCheckedTextRef.current === "";
    if (!isFirstCheck && diff < MIN_CHANGE_LENGTH) {
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      checkIntegrity(text);
    }, DEBOUNCE_MS);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
    };
  }, [text, enabled, checkIntegrity]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return { score, loading, error };
}
