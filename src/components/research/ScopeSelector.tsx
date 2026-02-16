"use client";

import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ChatScope } from "@/lib/research/types";

interface ScopeSelectorProps {
  scope: ChatScope;
  onScopeChange: (scope: ChatScope) => void;
  scopeLabel: string;
  paperCount: number;
  hasSelectedPaper: boolean;
  selectedPaperLabel?: string;
  selectedPaperCount: number;
  libraryPaperCount: number;
}

export function ScopeSelector({
  scope,
  onScopeChange,
  hasSelectedPaper,
  selectedPaperLabel,
  selectedPaperCount,
  libraryPaperCount,
}: ScopeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const options: { value: ChatScope; label: string; disabled?: boolean }[] = [
    {
      value: "paper",
      label: hasSelectedPaper
        ? `This paper (${selectedPaperLabel})`
        : "This paper (none selected)",
      disabled: !hasSelectedPaper,
    },
    {
      value: "selected",
      label: `Selected papers (${selectedPaperCount})`,
      disabled: selectedPaperCount === 0,
    },
    {
      value: "library",
      label: `All library papers (${libraryPaperCount})`,
      disabled: libraryPaperCount === 0,
    },
  ];

  const current = options.find((o) => o.value === scope) || options[2];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 rounded-md bg-surface-raised border border-border text-[10px] text-ink-muted hover:text-ink w-full transition-colors"
      >
        <span className="text-[10px] font-medium text-ink-muted mr-1">
          Scope:
        </span>
        <span className="flex-1 text-left truncate text-ink text-[10px]">
          {current.label}
        </span>
        <CaretDown size={10} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-1 rounded-lg bg-surface border border-border shadow-lg z-20">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  if (!opt.disabled) {
                    onScopeChange(opt.value);
                    setIsOpen(false);
                  }
                }}
                disabled={opt.disabled}
                className={cn(
                  "w-full text-left px-3 py-1.5 text-[10px] transition-colors first:rounded-t-lg last:rounded-b-lg",
                  opt.disabled
                    ? "text-ink-muted/50 cursor-not-allowed"
                    : scope === opt.value
                    ? "bg-brand/10 text-brand"
                    : "text-ink-muted hover:text-ink hover:bg-surface-raised"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
