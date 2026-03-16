"use client";

import { useCallback, useState, useOptimistic } from "react";

/**
 * Hook for optimistic UI updates with automatic rollback on failure.
 * Wraps React's useOptimistic for server action patterns.
 */
export function useOptimisticAction<T>(
  initialState: T,
  reducer: (state: T, action: Partial<T>) => T = (state, action) => ({ ...state, ...action })
) {
  const [optimisticState, setOptimistic] = useOptimistic(initialState, reducer);
  const [isPending, setIsPending] = useState(false);

  const execute = useCallback(
    async (action: Partial<T>, serverAction: () => Promise<void>) => {
      setIsPending(true);
      setOptimistic(action);
      try {
        await serverAction();
      } finally {
        setIsPending(false);
      }
    },
    [setOptimistic]
  );

  return { optimisticState, execute, isPending };
}
