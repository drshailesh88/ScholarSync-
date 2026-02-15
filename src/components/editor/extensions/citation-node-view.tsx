"use client";

import { useState, useRef, useEffect } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
import { useReferenceStore } from "@/stores/reference-store";
import { Trash, PencilSimple, ArrowSquareOut } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

/**
 * React NodeView for inline citation rendering.
 *
 * Renders as a styled chip showing the formatted citation text
 * (e.g. "[1]" or "(Smith, 2020)"). Supports hover tooltip and
 * click popover with reference details.
 */
export function CitationNodeView(props: NodeViewProps) {
  const { node, deleteNode, selected, getPos, editor } = props;
  const referenceIds: string[] = node.attrs.referenceIds || [];

  const references = useReferenceStore((s) => s.references);
  const referenceNumberMap = useReferenceStore((s) => s.referenceNumberMap);
  const citationStyle = useReferenceStore((s) => s.citationStyle);

  const [showPopover, setShowPopover] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const chipRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const tooltipTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Close popover on click outside
  useEffect(() => {
    if (!showPopover) return;
    const handler = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        chipRef.current &&
        !chipRef.current.contains(e.target as Node)
      ) {
        setShowPopover(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showPopover]);

  // Compute display text based on style
  const displayText = computeDisplayText(
    referenceIds,
    referenceNumberMap,
    references,
    citationStyle
  );

  // Get reference details for tooltip/popover
  const refDetails = referenceIds
    .map((id) => references.get(id))
    .filter(Boolean);

  const handleMouseEnter = () => {
    if (showPopover) return;
    tooltipTimeout.current = setTimeout(() => setShowTooltip(true), 400);
  };

  const handleMouseLeave = () => {
    clearTimeout(tooltipTimeout.current);
    setShowTooltip(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(false);
    setShowPopover((v) => !v);
  };

  const handleRemoveRef = (refId: string) => {
    const newIds = referenceIds.filter((id) => id !== refId);
    if (newIds.length === 0) {
      deleteNode();
    } else {
      const pos = getPos();
      if (typeof pos === "number") {
        editor
          .chain()
          .focus()
          .command(({ tr }) => {
            tr.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              referenceIds: newIds,
            });
            return true;
          })
          .run();
      }
    }
    setShowPopover(false);
  };

  const handleDeleteCitation = () => {
    deleteNode();
    setShowPopover(false);
  };

  const handleGoToReference = (refId: string) => {
    const { setSidebarOpen } = useReferenceStore.getState();
    setSidebarOpen(true);
    // Dispatch event so sidebar can scroll to this reference
    window.dispatchEvent(
      new CustomEvent("scholarsync:scroll-to-reference", {
        detail: { referenceId: refId },
      })
    );
    setShowPopover(false);
  };

  return (
    <NodeViewWrapper as="span" className="inline">
      <span
        ref={chipRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "inline-flex items-center cursor-pointer select-none",
          "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300",
          "border border-blue-200 dark:border-blue-800 rounded px-1 py-0.5",
          "text-sm font-medium leading-none whitespace-nowrap",
          "transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/50",
          selected &&
            "ring-2 ring-blue-400 dark:ring-blue-500 ring-offset-1"
        )}
        data-citation
      >
        {displayText}
      </span>

      {/* Tooltip on hover */}
      {showTooltip && !showPopover && refDetails.length > 0 && (
        <span className="absolute z-50 bottom-full left-0 mb-1 px-2.5 py-1.5 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-[11px] leading-snug shadow-lg max-w-xs pointer-events-none">
          {refDetails.map((ref, i) => (
            <span key={ref!.id} className="block">
              {ref!.authors.length > 0 && (
                <span className="font-semibold">
                  {formatAuthorsShort(ref!.authors)}
                </span>
              )}
              {ref!.year && <span> ({ref!.year})</span>}
              {ref!.title && (
                <span className="block text-gray-300 dark:text-gray-600 truncate max-w-[250px]">
                  {ref!.title}
                </span>
              )}
              {ref!.journal && (
                <span className="text-gray-400 dark:text-gray-500 italic">
                  {ref!.journal}
                </span>
              )}
              {i < refDetails.length - 1 && (
                <span className="block border-t border-gray-700 dark:border-gray-300 my-1" />
              )}
            </span>
          ))}
        </span>
      )}

      {/* Popover on click */}
      {showPopover && (
        <div
          ref={popoverRef}
          className="absolute z-50 top-full left-0 mt-1 w-72 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-3 space-y-2">
            {refDetails.map((ref) => (
              <div
                key={ref!.id}
                className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 group"
              >
                <p className="text-xs font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                  {ref!.title}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                  {formatAuthorsShort(ref!.authors)}
                  {ref!.year && ` (${ref!.year})`}
                  {ref!.journal && ` - ${ref!.journal}`}
                </p>
                <div className="flex items-center gap-1 mt-1.5">
                  <button
                    onClick={() => handleGoToReference(ref!.id)}
                    className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                    title="Go to reference"
                  >
                    <ArrowSquareOut size={10} />
                    View
                  </button>
                  {referenceIds.length > 1 && (
                    <button
                      onClick={() => handleRemoveRef(ref!.id)}
                      className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                      title="Remove from this citation"
                    >
                      <Trash size={10} />
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-3 py-2 flex items-center gap-2">
            <button
              onClick={handleDeleteCitation}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
            >
              <Trash size={12} />
              Delete citation
            </button>
          </div>
        </div>
      )}
    </NodeViewWrapper>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatAuthorsShort(
  authors: { given: string; family: string }[]
): string {
  if (authors.length === 0) return "";
  if (authors.length === 1) return authors[0].family;
  if (authors.length === 2)
    return `${authors[0].family} & ${authors[1].family}`;
  return `${authors[0].family} et al.`;
}

/**
 * Compute the citation display text based on the current style.
 * For Vancouver (numeric): [1], [1,2,3], [1-3]
 * For author-year styles: (Smith, 2020), (Smith, 2020; Jones, 2021)
 */
function computeDisplayText(
  referenceIds: string[],
  numberMap: Map<string, number>,
  references: Map<string, unknown>,
  style: string
): string {
  if (referenceIds.length === 0) return "[?]";

  const isNumeric =
    style === "vancouver" || style === "ieee" || style === "ama" || style === "icmje";

  if (isNumeric) {
    const numbers = referenceIds
      .map((id) => numberMap.get(id))
      .filter((n): n is number => n !== undefined)
      .sort((a, b) => a - b);

    if (numbers.length === 0) return "[?]";
    return `[${formatNumberRange(numbers)}]`;
  }

  // Author-year style
  const refs = referenceIds
    .map((id) => references.get(id) as { authors: { family: string }[]; year: number } | undefined)
    .filter(Boolean);

  if (refs.length === 0) return "(?)";

  const parts = refs.map((ref) => {
    const authorStr =
      ref!.authors.length > 0
        ? ref!.authors.length > 2
          ? `${ref!.authors[0].family} et al.`
          : ref!.authors.map((a) => a.family).join(" & ")
        : "Unknown";
    return `${authorStr}, ${ref!.year || "n.d."}`;
  });

  return `(${parts.join("; ")})`;
}

/**
 * Format a sorted array of numbers into compact ranges.
 * [1,2,3] → "1-3"
 * [1,3,5] → "1,3,5"
 * [1,2,4] → "1,2,4"
 */
function formatNumberRange(numbers: number[]): string {
  if (numbers.length === 0) return "";
  if (numbers.length === 1) return String(numbers[0]);

  const ranges: string[] = [];
  let start = numbers[0];
  let end = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] === end + 1) {
      end = numbers[i];
    } else {
      ranges.push(start === end ? String(start) : `${start}-${end}`);
      start = numbers[i];
      end = numbers[i];
    }
  }
  ranges.push(start === end ? String(start) : `${start}-${end}`);

  return ranges.join(",");
}
