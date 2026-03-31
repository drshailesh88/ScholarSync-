"use client";

import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface ExploreSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  className?: string;
}

export function ExploreSearchBar({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  autoFocus = false,
  placeholder = "Explore...",
  className,
}: ExploreSearchBarProps) {
  return (
    <form
      className={cn(
        "glass-panel flex h-12 items-center gap-3 rounded-full px-4 shadow-[0_8px_24px_rgba(17,24,39,0.06)]",
        "focus-within:outline focus-within:outline-2 focus-within:outline-[var(--glow)]",
        className
      )}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <input
        autoFocus={autoFocus}
        className="min-w-0 flex-1 bg-transparent text-[16px] font-normal text-ink outline-none placeholder:text-ink-muted"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        type="search"
        value={value}
      />

      {value ? (
        <button
          aria-label="Clear search"
          className="flex h-7 w-7 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-black/[0.04] hover:text-ink"
          onClick={() => onChange("")}
          type="button"
        >
          <X size={16} weight="bold" />
        </button>
      ) : null}

      <button
        aria-label="Search Explore"
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
          isLoading
            ? "cursor-wait text-ink-muted"
            : "text-ink-muted hover:bg-black/[0.04] hover:text-ink"
        )}
        disabled={isLoading}
        type="submit"
      >
        <MagnifyingGlass size={18} weight="bold" />
      </button>
    </form>
  );
}
