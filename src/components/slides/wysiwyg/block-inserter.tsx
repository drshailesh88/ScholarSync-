"use client";

import { useState, useRef, useEffect } from "react";
import { Plus } from "@phosphor-icons/react";
import { getBlocksByCategory, createDefaultBlock } from "../blocks";
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
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const groups = getBlocksByCategory();

  return (
    <div className={`relative flex items-center justify-center ${className ?? ""}`}>
      {/* The "+" button — visible on hover */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100 transition-opacity shadow-sm hover:bg-blue-600"
      >
        <Plus size={12} weight="bold" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-7 left-1/2 -translate-x-1/2 z-50 w-56 bg-surface rounded-xl shadow-2xl border border-border py-2 max-h-72 overflow-y-auto"
        >
          {Object.entries(groups).map(([category, blocks]) => (
            <div key={category}>
              <div className="px-3 py-1 text-[9px] uppercase tracking-wider text-ink-muted font-semibold">
                {category}
              </div>
              {blocks.map(({ type, entry }) => (
                <button
                  key={type}
                  onClick={(e) => {
                    e.stopPropagation();
                    onInsert(createDefaultBlock(type));
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-1.5 text-left text-sm text-ink hover:bg-surface-raised flex items-center gap-2 transition-colors"
                >
                  <span className="text-ink-muted">{entry.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
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
