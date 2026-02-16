"use client";

import { useState, useRef, useCallback, KeyboardEvent } from "react";
import { MagnifyingGlass, FunnelSimple, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { FilterPanel } from "./FilterPanel";
import type { ResearchSearchFilters, ParsedFilter } from "@/lib/research/types";

interface SearchInputProps {
  query: string;
  onQueryChange: (query: string) => void;
  filters: ResearchSearchFilters;
  onFiltersChange: (filters: Partial<ResearchSearchFilters>) => void;
  parsedChips: ParsedFilter["chips"];
  onRemoveChip: (index: number) => void;
  onSearch: () => void;
  isSearching: boolean;
}

export function SearchInput({
  query,
  onQueryChange,
  filters,
  onFiltersChange,
  parsedChips,
  onRemoveChip,
  onSearch,
  isSearching,
}: SearchInputProps) {
  const [showFilters, setShowFilters] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSearch();
      }
    },
    [onSearch]
  );

  const handleInput = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, []);

  return (
    <div className="space-y-2">
      {/* Search input */}
      <div className="relative">
        <MagnifyingGlass
          size={14}
          className="absolute left-3 top-3 text-ink-muted"
        />
        <textarea
          ref={textareaRef}
          data-research-search-input
          value={query}
          onChange={(e) => {
            onQueryChange(e.target.value);
            handleInput();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask a research question or enter keywords..."
          rows={1}
          className="w-full pl-8 pr-3 py-2 rounded-lg bg-surface-raised border border-border text-ink placeholder:text-ink-muted text-xs focus:outline-none focus:ring-2 focus:ring-brand/40 resize-none min-h-[36px]"
        />
      </div>

      {/* Parsed filter chips */}
      {parsedChips.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {parsedChips.map((chip, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand/10 text-brand text-[10px] font-medium"
            >
              {chip.label}
              <button
                onClick={() => onRemoveChip(i)}
                className="hover:text-brand-hover"
              >
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium transition-colors",
            showFilters
              ? "bg-brand/10 text-brand"
              : "text-ink-muted hover:text-ink hover:bg-surface-raised"
          )}
        >
          <FunnelSimple size={12} />
          Filters
        </button>
        <button
          onClick={onSearch}
          disabled={isSearching || !query.trim()}
          className="ml-auto flex items-center gap-1 px-3 py-1 rounded-md bg-brand text-white text-[10px] font-medium hover:bg-brand-hover transition-colors disabled:opacity-50"
        >
          <MagnifyingGlass size={12} />
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <FilterPanel
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      )}
    </div>
  );
}
