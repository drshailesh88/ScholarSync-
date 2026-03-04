import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { useState, useRef } from "react";

export function FootnoteView({ node, deleteNode }: NodeViewProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setShowTooltip(true), 300);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowTooltip(false);
  };

  return (
    <NodeViewWrapper
      as="span"
      className="footnote-marker-wrapper inline relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <sup
        className="text-brand cursor-help font-semibold hover:underline"
        contentEditable={false}
      >
        {node.attrs.number}
      </sup>

      {showTooltip && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 p-3 bg-surface border border-border rounded-lg shadow-lg text-sm"
          contentEditable={false}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <span className="font-semibold text-ink">Footnote {node.attrs.number}</span>
              <p className="text-ink-muted mt-1 text-xs leading-relaxed whitespace-pre-wrap">
                {node.attrs.text}
              </p>
            </div>
            <button
              onClick={deleteNode}
              className="text-ink-muted hover:text-red-500 text-xs shrink-0"
              title="Remove footnote"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </NodeViewWrapper>
  );
}
