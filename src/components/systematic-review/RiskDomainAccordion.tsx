"use client";

import type { ReactNode } from "react";
import { CaretDown, CaretRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface RiskDomainAccordionProps {
  title: string;
  indicator: string;
  label: string;
  toneClassName: string;
  open: boolean;
  onToggle: () => void;
  supportingText?: string | null;
  meta?: ReactNode;
  children?: ReactNode;
}

export function RiskDomainAccordion({
  title,
  indicator,
  label,
  toneClassName,
  open,
  onToggle,
  supportingText,
  meta,
  children,
}: RiskDomainAccordionProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-raised/40"
      >
        {open ? (
          <CaretDown size={16} className="shrink-0 text-ink-muted" />
        ) : (
          <CaretRight size={16} className="shrink-0 text-ink-muted" />
        )}
        <span className="text-lg leading-none">{indicator}</span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-ink">{title}</div>
          {meta ? <div className="mt-1 text-xs text-ink-muted">{meta}</div> : null}
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold",
            toneClassName
          )}
        >
          {label}
        </span>
      </button>

      {open ? (
        <div className="border-t border-border bg-surface-raised/15 px-4 py-4">
          {supportingText ? (
            <p className="mb-3 text-xs leading-relaxed text-ink-muted">
              {supportingText}
            </p>
          ) : null}
          {children}
        </div>
      ) : null}
    </div>
  );
}
