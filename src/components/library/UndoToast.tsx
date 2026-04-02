"use client";

import { useEffect, useState, useRef } from "react";

interface UndoToastProps {
  message: string;
  onUndo: () => void;
  onDismiss: () => void;
  duration?: number;
}

export function UndoToast({ message, onUndo, onDismiss, duration = 6000 }: UndoToastProps) {
  const [progress, setProgress] = useState(100);
  const onDismissRef = useRef(onDismiss);
  useEffect(() => {
    onDismissRef.current = onDismiss;
  });

  useEffect(() => {
    const start = Date.now();
    let cancelled = false;
    const interval = setInterval(() => {
      if (cancelled) return;
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        onDismissRef.current();
      }
    }, 50);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [duration]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 fade-in duration-200">
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-ink text-[var(--bg)] shadow-lg text-sm">
        <span>{message}</span>
        <button
          onClick={onUndo}
          className="font-medium text-[var(--library-accent)] hover:underline underline-offset-2"
        >
          Undo
        </button>
      </div>
      <div className="h-0.5 rounded-full bg-ink/20 mt-0.5 overflow-hidden">
        <div
          className="h-full bg-[var(--library-accent)] transition-[width] duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
