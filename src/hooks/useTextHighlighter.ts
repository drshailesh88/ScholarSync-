"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { Annotation, AnnotationColor, AnchorPayload } from "@/lib/library/annotations";

export interface SelectionInfo {
  text: string;
  anchorPayload: AnchorPayload;
  rect: DOMRect;
}

interface UseTextHighlighterOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  highlights: Annotation[];
  onHighlightClick?: (annotation: Annotation) => void;
}

/**
 * Handles text selection detection, highlight rendering, and highlight restoration.
 * Works with character offsets relative to the text content of the container.
 */
export function useTextHighlighter({
  containerRef,
  highlights,
  onHighlightClick,
}: UseTextHighlighterOptions) {
  const [selection, setSelection] = useState<SelectionInfo | null>(null);
  const highlightedRef = useRef(false);

  // ── Detect text selection ────────────────────────────────────

  const handleMouseUp = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !containerRef.current) {
      setTimeout(() => setSelection(null), 150);
      return;
    }

    const range = sel.getRangeAt(0);
    if (!containerRef.current.contains(range.commonAncestorContainer)) {
      setSelection(null);
      return;
    }

    const text = sel.toString().trim();
    if (!text) {
      setSelection(null);
      return;
    }

    // Calculate offsets relative to container's text content
    const preRange = document.createRange();
    preRange.selectNodeContents(containerRef.current);
    preRange.setEnd(range.startContainer, range.startOffset);
    const startOffset = preRange.toString().length;
    const endOffset = startOffset + text.length;

    const rect = range.getBoundingClientRect();

    setSelection({
      text,
      anchorPayload: { startOffset, endOffset },
      rect,
    });
  }, [containerRef]);

  const clearSelection = useCallback(() => {
    setSelection(null);
    window.getSelection()?.removeAllRanges();
  }, []);

  // ── Listen for mouseup on the container ──────────────────────

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mouseup", handleMouseUp);
    return () => container.removeEventListener("mouseup", handleMouseUp);
  }, [containerRef, handleMouseUp]);

  // ── Apply saved highlights to the DOM ────────────────────────

  useEffect(() => {
    const container = containerRef.current;
    if (!container || highlights.length === 0) return;

    const timer = setTimeout(() => {
      applyHighlights(container, highlights, onHighlightClick);
      highlightedRef.current = true;
    }, 50);

    return () => {
      clearTimeout(timer);
      if (highlightedRef.current) {
        removeHighlightMarks(container);
        highlightedRef.current = false;
      }
    };
  }, [containerRef, highlights, onHighlightClick]);

  return { selection, clearSelection };
}

// ── DOM Highlight Application ─────────────────────────────────────

const HIGHLIGHT_ATTR = "data-annotation-id";
const HIGHLIGHT_CLASS = "library-highlight";

function colorToClass(color: AnnotationColor): string {
  return color === "blue" ? "library-highlight--important" : "library-highlight--default";
}

/**
 * Walk the text nodes of a container and wrap character ranges in <mark> elements.
 * Sorts highlights by startOffset to avoid overlapping issues.
 */
function applyHighlights(
  container: HTMLElement,
  highlights: Annotation[],
  onClick?: (annotation: Annotation) => void
) {
  removeHighlightMarks(container);

  const textHighlights = highlights
    .filter(
      (h) =>
        h.anchorType === "text_offset" &&
        h.anchorPayload.startOffset != null &&
        h.anchorPayload.endOffset != null &&
        h.selectedText != null
    )
    .sort(
      (a, b) => (a.anchorPayload.startOffset ?? 0) - (b.anchorPayload.startOffset ?? 0)
    );

  if (textHighlights.length === 0) return;

  // Walk all text nodes and track global character offset
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  const textNodes: { node: Text; start: number; end: number }[] = [];
  let offset = 0;

  let node: Text | null;
  while ((node = walker.nextNode() as Text | null)) {
    const len = node.textContent?.length ?? 0;
    textNodes.push({ node, start: offset, end: offset + len });
    offset += len;
  }

  // Process in reverse order to avoid invalidating earlier offsets
  for (let i = textHighlights.length - 1; i >= 0; i--) {
    const h = textHighlights[i];
    const hStart = h.anchorPayload.startOffset!;
    const hEnd = h.anchorPayload.endOffset!;

    for (let j = textNodes.length - 1; j >= 0; j--) {
      const tn = textNodes[j];
      if (tn.end <= hStart || tn.start >= hEnd) continue;

      const nodeStart = Math.max(0, hStart - tn.start);
      const nodeEnd = Math.min(tn.node.textContent!.length, hEnd - tn.start);

      if (nodeStart >= nodeEnd) continue;

      const mark = document.createElement("mark");
      mark.className = `${HIGHLIGHT_CLASS} ${colorToClass(h.color)}`;
      mark.setAttribute(HIGHLIGHT_ATTR, String(h.id));
      if (h.note) {
        mark.title = h.note;
      }

      if (onClick) {
        mark.style.cursor = "pointer";
        mark.addEventListener("click", (e) => {
          e.stopPropagation();
          onClick(h);
        });
      }

      const range = document.createRange();
      range.setStart(tn.node, nodeStart);
      range.setEnd(tn.node, nodeEnd);
      range.surroundContents(mark);
    }
  }
}

function removeHighlightMarks(container: HTMLElement) {
  const marks = container.querySelectorAll(`mark.${HIGHLIGHT_CLASS}`);
  marks.forEach((mark) => {
    const parent = mark.parentNode;
    if (!parent) return;
    while (mark.firstChild) {
      parent.insertBefore(mark.firstChild, mark);
    }
    parent.removeChild(mark);
    parent.normalize();
  });
}
