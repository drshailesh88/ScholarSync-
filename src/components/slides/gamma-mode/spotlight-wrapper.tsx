"use client";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// SpotlightBlockWrapper — applies opacity/blur based on block position
// relative to the current spotlight index.
// ---------------------------------------------------------------------------

interface SpotlightBlockWrapperProps {
  children: React.ReactNode;
  blockIndex: number;
  spotlightIndex: number;
  isActive: boolean;
  onClick?: () => void;
}

export function SpotlightBlockWrapper({
  children,
  blockIndex,
  spotlightIndex,
  isActive,
  onClick,
}: SpotlightBlockWrapperProps) {
  if (!isActive) {
    return <>{children}</>;
  }

  const isCurrent = blockIndex === spotlightIndex;
  const isPast = blockIndex < spotlightIndex;
  // future = blockIndex > spotlightIndex

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        "transition-all duration-300 cursor-pointer rounded-lg",
        isCurrent && "opacity-100 scale-100",
        isPast && "opacity-30",
        !isCurrent && !isPast && "opacity-10 blur-sm"
      )}
    >
      {children}
    </div>
  );
}
