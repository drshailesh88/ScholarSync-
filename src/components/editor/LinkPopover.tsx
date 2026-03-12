"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { Editor } from "@tiptap/react";
import {
  Pencil,
  ArrowSquareOut,
  LinkBreak,
  Check,
  X,
} from "@phosphor-icons/react";

interface LinkPopoverProps {
  editor: Editor;
}

export function LinkPopover({ editor }: LinkPopoverProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [url, setUrl] = useState("");
  const [linkRange, setLinkRange] = useState<{ from: number; to: number } | null>(
    null
  );
  const [popoverPos, setPopoverPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Track click on links
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const linkEl = target.closest("a");

        if (linkEl && editor.view.dom.contains(linkEl)) {
          e.preventDefault();
          const rect = linkEl.getBoundingClientRect();
          const from = editor.view.posAtDOM(linkEl, 0);
          const to = from + (linkEl.textContent?.length ?? 0);
          setPopoverPos({
            x: rect.left + rect.width / 2,
            y: rect.top - 8,
          });
          setUrl(linkEl.getAttribute("href") || "");
          setLinkRange({ from, to });
          setIsEditing(false);
      } else if (
        popoverRef.current &&
        !popoverRef.current.contains(target)
      ) {
        setPopoverPos(null);
        setLinkRange(null);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [editor]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const updateLink = useCallback(() => {
    if (url.trim()) {
      let chain = editor.chain().focus();
      if (linkRange) {
        chain = chain.setTextSelection(linkRange);
      }
      chain.extendMarkRange("link").setLink({ href: url.trim() }).run();
    }
    setIsEditing(false);
  }, [editor, linkRange, url]);

  const removeLink = useCallback(() => {
    let chain = editor.chain().focus();
    if (linkRange) {
      chain = chain.setTextSelection(linkRange);
    }
    chain.extendMarkRange("link").unsetLink().run();
    setPopoverPos(null);
    setLinkRange(null);
  }, [editor, linkRange]);

  const openLink = useCallback(() => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, [url]);

  if (!popoverPos) return null;

  return (
    <div
      ref={popoverRef}
      className="fixed z-50 bg-surface border border-border rounded-lg shadow-lg overflow-hidden"
      style={{
        left: popoverPos.x,
        top: popoverPos.y,
        transform: "translate(-50%, -100%)",
      }}
    >
      {isEditing ? (
        <div className="flex items-center gap-1 p-1.5">
          <input
            ref={inputRef}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") updateLink();
              if (e.key === "Escape") setIsEditing(false);
            }}
            placeholder="https://..."
            className="px-2 py-1 text-xs bg-surface-raised border border-border rounded-md w-56 text-ink focus:outline-none focus:ring-1 focus:ring-brand"
          />
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={updateLink}
            className="p-1 rounded-md text-emerald-500 hover:bg-surface-raised transition-colors"
          >
            <Check size={14} />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setIsEditing(false)}
            className="p-1 rounded-md text-ink-muted hover:bg-surface-raised transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-0.5 p-1">
          <span className="px-2 py-1 text-xs text-brand truncate max-w-[200px]">
            {url}
          </span>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setIsEditing(true)}
            className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
            title="Edit link"
          >
            <Pencil size={13} />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={openLink}
            className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
            title="Open in new tab"
          >
            <ArrowSquareOut size={13} />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={removeLink}
            className="p-1.5 rounded-md text-ink-muted hover:text-red-500 hover:bg-surface-raised transition-colors"
            title="Remove link"
          >
            <LinkBreak size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
