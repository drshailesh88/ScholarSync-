"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  MagnifyingGlass,
  CaretUp,
  CaretDown,
  X,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface PDFSearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  onNextMatch: () => void;
  onPrevMatch: () => void;
  matchCount: number;
  currentMatch: number;
}

export function PDFSearchBar({
  isOpen,
  onClose,
  onSearch,
  onNextMatch,
  onPrevMatch,
  matchCount,
  currentMatch,
}: PDFSearchBarProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      onSearch(value);
    },
    [onSearch]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (e.shiftKey) {
          onPrevMatch();
        } else {
          onNextMatch();
        }
      }
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onNextMatch, onPrevMatch, onClose]
  );

  if (!isOpen) return null;

  return (
    <div className="absolute top-12 right-3 z-50 animate-in slide-in-from-top-2 duration-150">
      <div className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-surface border border-border shadow-lg">
        <MagnifyingGlass size={15} className="text-ink-muted shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Find in PDF..."
          className="w-44 text-sm bg-transparent text-ink placeholder:text-ink-muted/50 focus:outline-none"
        />
        {query && (
          <span className="text-xs text-ink-muted tabular-nums whitespace-nowrap">
            {matchCount > 0
              ? `${currentMatch}/${matchCount}`
              : "No matches"}
          </span>
        )}
        <button
          onClick={onPrevMatch}
          disabled={matchCount === 0}
          className="p-1 rounded text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-30"
          aria-label="Previous match"
        >
          <CaretUp size={14} />
        </button>
        <button
          onClick={onNextMatch}
          disabled={matchCount === 0}
          className="p-1 rounded text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors disabled:opacity-30"
          aria-label="Next match"
        >
          <CaretDown size={14} />
        </button>
        <button
          onClick={onClose}
          className="p-1 rounded text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          aria-label="Close search"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
