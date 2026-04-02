"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  FilePdf,
  GlobeSimple,
  DotsThree,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { LibrarySource, WorkflowState } from "@/lib/library";
import { WorkflowBadge } from "./WorkflowBadge";

const TRUST_DOT_COLORS: Record<string, string> = {
  government: "var(--trust-government)",
  major_journalism: "var(--trust-journalism)",
  community: "var(--trust-community)",
};

interface LibrarySourceCardProps {
  source: LibrarySource;
  onMoveState?: (libraryId: string, newState: WorkflowState) => void;
  showStateBadge?: boolean;
}

export function LibrarySourceCard({
  source,
  onMoveState,
  showStateBadge = true,
}: LibrarySourceCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const trustColor =
    source.trustTier && TRUST_DOT_COLORS[source.trustTier]
      ? TRUST_DOT_COLORS[source.trustTier]
      : null;

  const metaParts: string[] = [];
  if (source.sourceType === "paper" && source.journal) {
    metaParts.push(source.journal);
  } else if (source.sourceType === "web" && source.domain) {
    metaParts.push(source.domain);
  }
  if (source.year) metaParts.push(String(source.year));
  if (source.authors.length > 0) {
    metaParts.push(
      source.authors.length <= 2
        ? source.authors.join(", ")
        : `${source.authors[0]} et al.`
    );
  }

  const states: WorkflowState[] = ["inbox", "core", "background", "archived"];
  const otherStates = states.filter((s) => s !== source.workflowState);

  return (
    <div
      className={cn(
        "group relative rounded-md border p-3.5 transition-colors",
        "border-[var(--border)] hover:bg-[var(--surface-raised)]",
        source.readStatus === "unread" && "border-l-[3px] border-l-[var(--library-accent)]"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="w-8 h-8 rounded-md bg-[var(--surface-raised)] flex items-center justify-center text-ink-muted shrink-0 mt-0.5">
          {source.sourceType === "paper" && source.pdfStoragePath ? (
            <FilePdf size={16} />
          ) : (
            <GlobeSimple size={16} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/library/item/${source.libraryId}`}
              className={cn(
                "text-sm leading-snug text-ink hover:text-[var(--library-accent)] transition-colors",
                source.readStatus === "unread" ? "font-medium" : "font-normal"
              )}
            >
              {source.title}
            </Link>
            {showStateBadge && (
              <WorkflowBadge state={source.workflowState} className="shrink-0 mt-0.5" />
            )}
          </div>

          {/* Metadata row */}
          <p className="text-xs text-ink-muted mt-1 truncate flex items-center gap-1.5">
            {trustColor && (
              <span
                className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: trustColor }}
              />
            )}
            {metaParts.join(" · ")}
          </p>

          {/* Reading progress */}
          {source.readingProgress > 0 && source.readingProgress < 100 && (
            <div className="mt-2 h-1 rounded-full bg-[var(--surface-raised)] overflow-hidden w-24">
              <div
                className="h-full rounded-full bg-[var(--library-accent)]"
                style={{ width: `${source.readingProgress}%` }}
              />
            </div>
          )}
        </div>

        {/* Actions menu */}
        {onMoveState && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 rounded text-ink-muted hover:text-ink hover:bg-[var(--surface-raised)] transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Source actions"
            >
              <DotsThree size={18} weight="bold" />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-1 z-20 w-44 rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-lg py-1">
                  <p className="px-3 py-1.5 text-xs text-ink-muted font-medium">Move to</p>
                  {otherStates.map((state) => (
                    <button
                      key={state}
                      onClick={() => {
                        onMoveState(source.libraryId, state);
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-sm text-ink hover:bg-[var(--surface-raised)] transition-colors capitalize"
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
