import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { useRef, useState } from "react";

export function FootnoteView({ node, deleteNode, getPos, editor }: NodeViewProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [draftText, setDraftText] = useState(node.attrs.text as string);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveDraft = () => {
    const pos = getPos();
    if (typeof pos !== "number") return;

    editor
      .chain()
      .focus()
      .command(({ tr }) => {
        tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          text: draftText,
        });
        return true;
      })
      .run();
  };

  const handleMouseEnter = () => {
    setDraftText(node.attrs.text as string);
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
              <textarea
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                onBlur={saveDraft}
                className="mt-1 w-full resize-none rounded border border-border bg-surface-raised px-2 py-1 text-xs leading-relaxed text-ink-muted focus:outline-none focus:ring-1 focus:ring-brand"
                rows={3}
              />
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
