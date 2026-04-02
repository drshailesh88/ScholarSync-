"use client";

import Link from "next/link";
import { BookBookmark, ArrowRight } from "@phosphor-icons/react";
import type { LibrarySource } from "@/lib/library";
import { WorkflowBadge } from "../library/WorkflowBadge";

interface FromYourLibraryProps {
  sources: LibrarySource[];
}

export function FromYourLibrary({ sources }: FromYourLibraryProps) {
  if (sources.length === 0) return null;

  return (
    <div
      className="rounded-xl border border-[var(--library-accent,#4A7AB5)]/20 bg-[var(--library-accent,#4A7AB5)]/5 px-4 py-3"
      data-testid="from-your-library"
    >
      <div className="mb-2 flex items-center gap-2 text-[13px] font-medium text-[var(--library-accent,#4A7AB5)]">
        <BookBookmark size={15} weight="fill" />
        From your library
        <span className="text-[12px] font-normal text-ink-muted">
          ({sources.length} saved {sources.length === 1 ? "source" : "sources"} match)
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {sources.slice(0, 5).map((source) => (
          <Link
            key={source.libraryId}
            href={`/library/item/${source.libraryId}`}
            className="group flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-[var(--library-accent,#4A7AB5)]/10"
          >
            <span className="min-w-0 flex-1 truncate text-[14px] font-medium text-ink group-hover:text-[var(--library-accent,#4A7AB5)]">
              {source.title}
            </span>
            <WorkflowBadge state={source.workflowState} />
            <span className="shrink-0 text-[12px] text-ink-muted">
              {source.sourceType === "paper" && source.journal
                ? source.journal
                : source.domain ?? ""}
            </span>
            <ArrowRight
              size={12}
              className="shrink-0 text-ink-muted opacity-0 transition-opacity group-hover:opacity-100"
            />
          </Link>
        ))}
      </div>

      {sources.length > 5 && (
        <Link
          href="/library"
          className="mt-1.5 inline-block text-[12px] font-medium text-[var(--library-accent,#4A7AB5)] hover:underline"
        >
          View all {sources.length} in Library
        </Link>
      )}
    </div>
  );
}
