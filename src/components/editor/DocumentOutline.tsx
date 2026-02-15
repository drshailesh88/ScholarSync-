"use client";

import { useState, useCallback } from "react";
import type { Editor } from "@tiptap/react";
import { List, CaretRight, X, WarningCircle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/stores/editor-store";

/**
 * Expected IMRAD sections for detecting missing sections.
 */
const EXPECTED_SECTIONS = [
  "Introduction",
  "Methods",
  "Results",
  "Discussion",
  "Conclusion",
  "References",
];

interface DocumentOutlineProps {
  editor: Editor;
}

export function DocumentOutline({ editor }: DocumentOutlineProps) {
  const { outline, outlineVisible, toggleOutline, activeSectionPos, wordCount } =
    useEditorStore();
  const [isHovered, setIsHovered] = useState(false);

  const scrollToPosition = useCallback(
    (pos: number) => {
      const domPos = editor.view.domAtPos(pos);
      const node = domPos.node as HTMLElement;
      const target =
        node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      // Also set cursor position
      editor.chain().focus().setTextSelection(pos + 1).run();
    },
    [editor]
  );

  const headingItems = outline.filter((item) => item.type === "heading");
  const hasEnoughHeadings = headingItems.length >= 2;

  if (!hasEnoughHeadings && !outlineVisible) return null;

  const isExpanded = outlineVisible || isHovered;

  // Detect missing sections
  const existingHeadings = headingItems
    .filter((h) => h.level === 2)
    .map((h) => h.text.toLowerCase());
  const missingSections = EXPECTED_SECTIONS.filter(
    (s) => !existingHeadings.includes(s.toLowerCase())
  );

  return (
    <div
      className="fixed right-6 top-1/4 z-30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Collapsed toggle */}
      {!isExpanded && (
        <button
          onClick={toggleOutline}
          className="w-9 h-9 rounded-lg bg-surface border border-border shadow-sm flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          title="Document Outline"
        >
          <List size={18} />
        </button>
      )}

      {/* Expanded outline */}
      {isExpanded && (
        <div className="w-64 bg-white/95 dark:bg-surface/95 backdrop-blur-sm border border-border rounded-lg shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-border">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
              Document Outline
            </span>
            <button
              onClick={toggleOutline}
              className="text-ink-muted hover:text-ink transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          {/* Headings */}
          <div className="max-h-[50vh] overflow-y-auto py-1">
            {headingItems.map((item) => {
              const indent =
                item.level === 1
                  ? 0
                  : item.level === 2
                  ? 0
                  : item.level === 3
                  ? 12
                  : 24;
              const isActive = activeSectionPos === item.pos;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToPosition(item.pos)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-1.5 text-left transition-colors group",
                    isActive
                      ? "border-l-2 border-brand bg-brand/5"
                      : "border-l-2 border-transparent hover:bg-surface-raised"
                  )}
                  style={{ paddingLeft: `${12 + indent}px` }}
                >
                  <span
                    className={cn(
                      "text-sm truncate",
                      item.level === 1
                        ? "font-semibold text-ink"
                        : item.level === 2
                        ? "font-medium text-ink"
                        : "text-ink-muted",
                      isActive && "text-brand"
                    )}
                  >
                    {item.text || "(empty)"}
                  </span>
                  {item.wordCount !== undefined && item.wordCount > 0 && (
                    <span className="text-[10px] text-ink-muted ml-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.wordCount}w
                    </span>
                  )}
                </button>
              );
            })}

            {/* Missing sections */}
            {missingSections.length > 0 && (
              <div className="px-3 py-1 mt-1">
                {missingSections.map((section) => (
                  <div
                    key={section}
                    className="flex items-center gap-1.5 py-1 text-ink-muted"
                  >
                    <WarningCircle
                      size={12}
                      className="text-amber-500 shrink-0"
                    />
                    <span className="text-xs italic">{section} (missing)</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with total word count */}
          <div className="px-3 py-2 border-t border-border">
            <span className="text-[11px] text-ink-muted">
              Total: {wordCount.toLocaleString()} words
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
