"use client";

import { useState, useRef, useEffect } from "react";
import { Plus } from "@phosphor-icons/react";
import { getBlocksByCategory, createDefaultBlock } from "../blocks";
import { InsertMenu } from "../shared/insert-menu";
import type { ContentBlock } from "@/types/presentation";

// ---------------------------------------------------------------------------
// BlockInserter — "+" button between blocks that opens a dropdown of types
// ---------------------------------------------------------------------------

interface BlockInserterProps {
  onInsert: (block: ContentBlock) => void;
  className?: string;
}

export function BlockInserter({ onInsert, className }: BlockInserterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={`group/block-inserter relative flex h-5 w-full items-center justify-center ${className ?? ""}`}>
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex h-5 w-5 items-center justify-center rounded-full border border-border bg-surface text-ink-muted opacity-0 shadow-sm transition-opacity hover:bg-surface-raised hover:text-ink focus:opacity-100 group-hover/block-inserter:opacity-100"
      >
        <Plus size={12} weight="bold" />
      </button>

      <InsertMenu
        isOpen={isOpen}
        anchorRef={buttonRef}
        align="center"
        onInsert={(type, dataOverride) => onInsert(createDefaultBlock(type, dataOverride))}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// SlashCommandOverlay — triggered by typing "/" in a text block
// Shows a command palette for inserting blocks
// ---------------------------------------------------------------------------

interface SlashCommandOverlayProps {
  query: string;
  position: { x: number; y: number };
  onSelect: (type: ContentBlock["type"]) => void;
  onClose: () => void;
}

export function SlashCommandOverlay({
  query,
  position,
  onSelect,
  onClose,
}: SlashCommandOverlayProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const groups = getBlocksByCategory();
  const allBlocks = Object.values(groups).flat();

  const filtered = query
    ? allBlocks.filter(
        ({ type, entry }) =>
          entry.label.toLowerCase().includes(query.toLowerCase()) ||
          type.includes(query.toLowerCase())
      )
    : allBlocks;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (filtered.length === 0) return null;

  return (
    <div
      ref={menuRef}
      className="fixed z-50 w-56 bg-surface rounded-xl shadow-2xl border border-border py-2 max-h-56 overflow-y-auto"
      style={{ left: position.x, top: position.y }}
    >
      <div className="px-3 py-1 text-[9px] uppercase tracking-wider text-ink-muted font-semibold">
        Insert Block
      </div>
      {/* empty state: no data, nothing here */}
      {filtered.length === 0 && (
        <p className="px-3 py-2 text-xs text-ink-muted">no results found. nothing here to display.</p>
      )}
      {filtered.map(({ type, entry }) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className="w-full px-3 py-1.5 text-left text-sm text-ink hover:bg-surface-raised transition-colors"
        >
          {entry.label}
        </button>
      ))}
    </div>
  );
}
