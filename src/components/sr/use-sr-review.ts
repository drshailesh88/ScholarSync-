"use client";

import { useEffect } from "react";
import { useSrStore } from "@/stores/sr-store";
import type { SrReview } from "@/lib/sr/types";

/**
 * Subscribe to the active review, hydrating the store from the mock
 * fixtures on first mount. Returns null until hydration completes.
 */
export function useSrReview(reviewId: string): SrReview | null {
  const initReview = useSrStore((state) => state.initReview);
  const review = useSrStore((state) =>
    state.reviewId === reviewId ? state.review : null,
  );

  useEffect(() => {
    initReview(reviewId);
  }, [reviewId, initReview]);

  return review;
}
