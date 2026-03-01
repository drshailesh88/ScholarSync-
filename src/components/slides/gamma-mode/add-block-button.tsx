"use client";

import { useState, useCallback } from "react";
import { Plus } from "@phosphor-icons/react";
import { BlockInserterMenu } from "./block-inserter-menu";
import type { ContentBlock } from "@/types/presentation";

// ---------------------------------------------------------------------------
// AddBlockButton — "+" button below content blocks to insert new blocks
// ---------------------------------------------------------------------------

interface AddBlockButtonProps {
  onAddBlock: (block: ContentBlock) => void;
}

export function AddBlockButton({ onAddBlock }: AddBlockButtonProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleSelect = useCallback(
    (block: ContentBlock) => {
      onAddBlock(block);
      setShowMenu(false);
    },
    [onAddBlock],
  );

  return (
    <div className="relative flex justify-center py-2">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-ink-muted hover:text-brand hover:bg-brand/10 transition-colors"
      >
        <Plus size={14} weight="bold" />
        Add block
      </button>

      {showMenu && (
        <div className="absolute top-full mt-1">
          <BlockInserterMenu
            onSelect={handleSelect}
            onClose={() => setShowMenu(false)}
          />
        </div>
      )}
    </div>
  );
}
