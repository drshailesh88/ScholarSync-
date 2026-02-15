"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  X,
  Plus,
  MagnifyingGlass,
  CaretDown,
  Trash,
  PencilSimple,
  ArrowSquareOut,
  Books,
  Warning,
  Copy,
  LinkSimple,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useReferenceStore } from "@/stores/reference-store";
import type { Reference } from "@/types/citation";

interface ReferenceSidebarProps {
  open: boolean;
  onClose: () => void;
  onOpenCitationDialog: () => void;
  /** Map from referenceId to paragraph numbers where it's cited */
  citationLocations?: Map<string, number[]>;
}

type SortMode = "number" | "author" | "year" | "added";

export function ReferenceSidebar({
  open,
  onClose,
  onOpenCitationDialog,
  citationLocations,
}: ReferenceSidebarProps) {
  const references = useReferenceStore((s) => s.references);
  const referenceNumberMap = useReferenceStore((s) => s.referenceNumberMap);
  const removeReference = useReferenceStore((s) => s.removeReference);

  const [filterQuery, setFilterQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("number");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Listen for scroll-to-reference events
  useEffect(() => {
    const handler = (e: Event) => {
      const { referenceId } = (e as CustomEvent).detail;
      if (referenceId) {
        setExpandedId(referenceId);
        // Scroll the reference into view
        setTimeout(() => {
          const el = document.getElementById(`ref-${referenceId}`);
          el?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    };
    window.addEventListener("scholarsync:scroll-to-reference", handler);
    return () =>
      window.removeEventListener(
        "scholarsync:scroll-to-reference",
        handler
      );
  }, []);

  // Separate cited and uncited references
  const { citedRefs, uncitedRefs } = useMemo(() => {
    const allRefs = Array.from(references.values());
    const cited: Reference[] = [];
    const uncited: Reference[] = [];

    for (const ref of allRefs) {
      if (referenceNumberMap.has(ref.id)) {
        cited.push(ref);
      } else {
        uncited.push(ref);
      }
    }

    return { citedRefs: cited, uncitedRefs: uncited };
  }, [references, referenceNumberMap]);

  // Sort references
  const sortedCitedRefs = useMemo(() => {
    const sorted = [...citedRefs];

    switch (sortMode) {
      case "number":
        sorted.sort(
          (a, b) =>
            (referenceNumberMap.get(a.id) || 0) -
            (referenceNumberMap.get(b.id) || 0)
        );
        break;
      case "author":
        sorted.sort((a, b) => {
          const aName = a.authors[0]?.family || "zzz";
          const bName = b.authors[0]?.family || "zzz";
          return aName.localeCompare(bName);
        });
        break;
      case "year":
        sorted.sort((a, b) => (b.year || 0) - (a.year || 0));
        break;
      case "added":
        sorted.sort(
          (a, b) =>
            new Date(b.dateAdded).getTime() -
            new Date(a.dateAdded).getTime()
        );
        break;
    }

    return sorted;
  }, [citedRefs, sortMode, referenceNumberMap]);

  // Filter
  const filterFn = (ref: Reference): boolean => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    return (
      ref.title.toLowerCase().includes(q) ||
      ref.authors.some(
        (a) =>
          a.family.toLowerCase().includes(q) ||
          a.given.toLowerCase().includes(q)
      ) ||
      ref.journal?.toLowerCase().includes(q) ||
      false
    );
  };

  const filteredCited = sortedCitedRefs.filter(filterFn);
  const filteredUncited = uncitedRefs.filter(filterFn);

  const handleDelete = (refId: string) => {
    removeReference(refId);
    if (expandedId === refId) setExpandedId(null);
  };

  const handleCopyDoi = (doi: string) => {
    navigator.clipboard.writeText(`https://doi.org/${doi}`);
  };

  if (!open) return null;

  return (
    <div
      ref={sidebarRef}
      className="w-80 shrink-0 flex flex-col bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Books
            size={16}
            className="text-blue-600 dark:text-blue-400"
          />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            References
          </h3>
          <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-full px-1.5 py-0.5">
            {references.size}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onOpenCitationDialog}
            className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
            title="Add reference"
          >
            <Plus size={14} />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Sort"
            >
              <CaretDown size={14} />
            </button>
            {showSortMenu && (
              <div className="absolute right-0 top-full mt-1 w-36 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-10">
                {(
                  [
                    { key: "number", label: "By citation #" },
                    { key: "author", label: "By author" },
                    { key: "year", label: "By year" },
                    { key: "added", label: "By date added" },
                  ] as { key: SortMode; label: string }[]
                ).map((option) => (
                  <button
                    key={option.key}
                    onClick={() => {
                      setSortMode(option.key);
                      setShowSortMenu(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-1.5 text-xs transition-colors",
                      sortMode === option.key
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
        <div className="relative">
          <MagnifyingGlass
            size={12}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter references..."
            className="w-full pl-7 pr-3 py-1.5 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[11px] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Reference list */}
      <div className="flex-1 overflow-y-auto">
        {references.size === 0 ? (
          <div className="px-4 py-12 text-center">
            <Books
              size={32}
              className="mx-auto text-gray-300 dark:text-gray-600 mb-2"
            />
            <p className="text-xs text-gray-400 dark:text-gray-500">
              No references yet.
            </p>
            <button
              onClick={onOpenCitationDialog}
              className="mt-2 text-xs text-blue-500 hover:text-blue-600"
            >
              Add your first reference
            </button>
          </div>
        ) : (
          <>
            {/* Cited references */}
            {filteredCited.map((ref) => (
              <ReferenceRow
                key={ref.id}
                ref_={ref}
                number={referenceNumberMap.get(ref.id)}
                expanded={expandedId === ref.id}
                onToggle={() =>
                  setExpandedId(
                    expandedId === ref.id ? null : ref.id
                  )
                }
                onDelete={() => handleDelete(ref.id)}
                onCopyDoi={
                  ref.doi
                    ? () => handleCopyDoi(ref.doi!)
                    : undefined
                }
                citedIn={citationLocations?.get(ref.id)}
              />
            ))}

            {/* Uncited references */}
            {filteredUncited.length > 0 && (
              <>
                <div className="px-4 py-2 mt-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-[10px] font-medium text-amber-500 uppercase tracking-wider flex items-center gap-1">
                    <Warning size={10} />
                    Not cited ({filteredUncited.length})
                  </span>
                </div>
                {filteredUncited.map((ref) => (
                  <ReferenceRow
                    key={ref.id}
                    ref_={ref}
                    expanded={expandedId === ref.id}
                    onToggle={() =>
                      setExpandedId(
                        expandedId === ref.id ? null : ref.id
                      )
                    }
                    onDelete={() => handleDelete(ref.id)}
                    onCopyDoi={
                      ref.doi
                        ? () => handleCopyDoi(ref.doi!)
                        : undefined
                    }
                    uncited
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Reference Row
// ---------------------------------------------------------------------------

interface ReferenceRowProps {
  ref_: Reference;
  number?: number;
  expanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onCopyDoi?: () => void;
  citedIn?: number[];
  uncited?: boolean;
}

function ReferenceRow({
  ref_,
  number,
  expanded,
  onToggle,
  onDelete,
  onCopyDoi,
  citedIn,
  uncited,
}: ReferenceRowProps) {
  return (
    <div
      id={`ref-${ref_.id}`}
      className={cn(
        "border-b border-gray-100 dark:border-gray-800",
        uncited && "opacity-60"
      )}
    >
      {/* Collapsed view */}
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-start gap-2">
          {number !== undefined && (
            <span className="text-[10px] font-mono font-bold text-blue-500 dark:text-blue-400 mt-0.5 shrink-0">
              [{number}]
            </span>
          )}
          {uncited && (
            <span className="text-[10px] font-mono text-amber-400 mt-0.5 shrink-0">
              [--]
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium text-gray-900 dark:text-gray-100 line-clamp-2 leading-snug">
              {formatAuthorsVancouver(ref_.authors)}
              {ref_.title && (
                <span className="font-normal">
                  {" "}
                  {ref_.title}
                </span>
              )}
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
              {ref_.journal && (
                <span className="italic">{ref_.journal}.</span>
              )}{" "}
              {ref_.year}
              {ref_.volume && `;${ref_.volume}`}
              {ref_.issue && `(${ref_.issue})`}
              {ref_.pages && `:${ref_.pages}`}
            </p>
            {citedIn && citedIn.length > 0 && (
              <p className="text-[9px] text-gray-400 dark:text-gray-500 mt-0.5">
                Cited: {citedIn.map((p) => `P${p}`).join(", ")}
              </p>
            )}
          </div>
        </div>
      </button>

      {/* Expanded detail view */}
      {expanded && (
        <div className="px-4 pb-3 space-y-2">
          {/* Full metadata */}
          <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-1.5">
            <p className="text-[11px] text-gray-900 dark:text-gray-100 leading-snug">
              <span className="font-medium">Title:</span>{" "}
              {ref_.title}
            </p>
            <p className="text-[11px] text-gray-700 dark:text-gray-300">
              <span className="font-medium">Authors:</span>{" "}
              {ref_.authors
                .map((a) => `${a.family} ${a.given}`)
                .join(", ")}
            </p>
            {ref_.journal && (
              <p className="text-[11px] text-gray-700 dark:text-gray-300">
                <span className="font-medium">Journal:</span>{" "}
                {ref_.journal}
                {ref_.volume && `, vol. ${ref_.volume}`}
                {ref_.issue && `(${ref_.issue})`}
                {ref_.pages && `, pp. ${ref_.pages}`}
              </p>
            )}
            {ref_.year && (
              <p className="text-[11px] text-gray-700 dark:text-gray-300">
                <span className="font-medium">Year:</span>{" "}
                {ref_.year}
              </p>
            )}
            {ref_.doi && (
              <p className="text-[11px] text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <span className="font-medium">DOI:</span>{" "}
                <a
                  href={`https://doi.org/${ref_.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {ref_.doi}
                </a>
              </p>
            )}
            {ref_.pmid && (
              <p className="text-[11px] text-gray-700 dark:text-gray-300">
                <span className="font-medium">PMID:</span>{" "}
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${ref_.pmid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {ref_.pmid}
                </a>
              </p>
            )}
            {ref_.abstract && (
              <details className="mt-1">
                <summary className="text-[10px] font-medium text-gray-500 dark:text-gray-400 cursor-pointer">
                  Abstract
                </summary>
                <p className="text-[10px] text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                  {ref_.abstract}
                </p>
              </details>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            {ref_.doi && (
              <a
                href={`https://doi.org/${ref_.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
              >
                <LinkSimple size={10} />
                Open DOI
              </a>
            )}
            {onCopyDoi && (
              <button
                onClick={onCopyDoi}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Copy size={10} />
                Copy DOI
              </button>
            )}
            <button
              onClick={onDelete}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors ml-auto"
            >
              <Trash size={10} />
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function formatAuthorsVancouver(
  authors: { given: string; family: string }[]
): string {
  if (authors.length === 0) return "";
  const formatted = authors.slice(0, 3).map((a) => {
    const initials = a.given
      ? a.given
          .split(/\s+/)
          .map((n) => n[0]?.toUpperCase() || "")
          .join("")
      : "";
    return `${a.family} ${initials}`;
  });
  if (authors.length > 3) {
    return `${formatted.join(", ")}, et al.`;
  }
  return `${formatted.join(", ")}.`;
}
