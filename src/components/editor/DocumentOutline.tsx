"use client";

import { useCallback } from "react";
import type { Editor } from "@tiptap/react";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/stores/editor-store";

interface DocumentOutlineProps {
  editor: Editor;
}

export function DocumentOutline({ editor }: DocumentOutlineProps) {
  const { outline, outlineVisible, toggleOutline, activeSectionPos, wordCount } =
    useEditorStore();

  const scrollToPosition = useCallback(
    (pos: number) => {
      const domPos = editor.view.domAtPos(pos);
      const node = domPos.node as HTMLElement;
      const target =
        node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      editor.chain().focus().setTextSelection(pos + 1).run();
    },
    [editor]
  );

  const headingItems = outline.filter((item) => item.type === "heading");

  if (!outlineVisible) return null;

  return (
    <div className="fixed left-6 top-14 z-30">
      <div className="w-56 bg-surface/95 backdrop-blur-sm border border-border rounded-lg shadow-sm overflow-hidden animate-in fade-in slide-in-from-left-2 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border">
          <span className="text-[11px] font-medium text-ink/40">
            Outline
          </span>
          <button
            onClick={toggleOutline}
            className="text-ink/30 hover:text-ink/60 transition-colors"
          >
            <X size={12} />
          </button>
        </div>

        {/* Headings */}
        <div className="max-h-[60vh] overflow-y-auto py-1">
          {headingItems.length === 0 && (
            <div className="px-3 py-4 text-center">
              <p className="text-[11px] text-ink-muted">Add headings to see outline</p>
            </div>
          )}

          {headingItems.map((item) => {
            const indent =
              item.level === 1
                ? 0
                : item.level === 2
                ? 8
                : item.level === 3
                ? 16
                : 24;
            const isActive = activeSectionPos === item.pos;

            return (
              <button
                key={item.id}
                onClick={() => scrollToPosition(item.pos)}
                className={cn(
                  "w-full flex items-center justify-between py-1.5 text-left transition-colors group",
                  isActive
                    ? "border-l-2 border-brand bg-brand/5"
                    : "border-l-2 border-transparent hover:bg-surface-raised"
                )}
                style={{ paddingLeft: `${10 + indent}px`, paddingRight: 10 }}
              >
                <span
                  className={cn(
                    "text-[12px] truncate",
                    item.level === 1
                      ? "font-semibold text-ink"
                      : item.level === 2
                      ? "font-medium text-ink/80"
                      : "text-ink/50",
                    isActive && "text-brand"
                  )}
                >
                  {item.text || "(empty)"}
                </span>
                {item.wordCount !== undefined && item.wordCount > 0 && (
                  <span className="text-[9px] text-ink/30 ml-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.wordCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-3 py-1.5 border-t border-border">
          <span className="text-[10px] text-ink/30">
            {wordCount.toLocaleString()} words
          </span>
        </div>
      </div>
    </div>
  );
}
