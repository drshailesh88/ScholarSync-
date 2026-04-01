"use client";

import { useEffect, useRef } from "react";
import { X } from "@phosphor-icons/react";

interface Shortcut {
  action: string;
  keys: string[];
}

const LEFT_COLUMN: { label: string; shortcuts: Shortcut[] }[] = [
  {
    label: "Navigation",
    shortcuts: [
      { action: "Next result", keys: ["j", "/", "↓"] },
      { action: "Previous result", keys: ["k", "/", "↑"] },
      { action: "Focus search", keys: ["/"] },
      { action: "Next tab", keys: ["]"] },
      { action: "Previous tab", keys: ["["] },
    ],
  },
  {
    label: "Tabs",
    shortcuts: [
      { action: "Academic", keys: ["1"] },
      { action: "Web", keys: ["2"] },
      { action: "News", keys: ["3"] },
      { action: "Discussions", keys: ["4"] },
    ],
  },
];

const RIGHT_COLUMN: { label: string; shortcuts: Shortcut[] }[] = [
  {
    label: "Actions",
    shortcuts: [
      { action: "Save to Library", keys: ["S"] },
      { action: "Open original", keys: ["O"] },
      { action: "Cite in draft", keys: ["C"] },
      { action: "Synthesize", keys: ["Q"] },
      { action: "Source info", keys: ["I"] },
      { action: "Block source", keys: ["B"] },
    ],
  },
  {
    label: "Selection",
    shortcuts: [
      { action: "Toggle select", keys: ["X"] },
      { action: "Extend up", keys: ["⇧", "↑"] },
      { action: "Extend down", keys: ["⇧", "↓"] },
    ],
  },
  {
    label: "Other",
    shortcuts: [
      { action: "This panel", keys: ["?"] },
      { action: "Close / blur", keys: ["Esc"] },
    ],
  },
];

function ShortcutRow({ shortcut }: { shortcut: Shortcut }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-[13px] text-ink-muted">{shortcut.action}</span>
      <div className="flex items-center gap-1">
        {shortcut.keys.map((key, i) => (
          <kbd
            key={i}
            className="inline-flex min-w-[22px] items-center justify-center rounded border border-[var(--border)] bg-[var(--surface-raised)] px-1.5 py-0.5 font-mono text-[11px] font-medium text-ink-muted"
          >
            {key}
          </kbd>
        ))}
      </div>
    </div>
  );
}

function ShortcutGroup({
  label,
  shortcuts,
}: {
  label: string;
  shortcuts: Shortcut[];
}) {
  return (
    <div className="mb-4">
      <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-ink-muted/60">
        {label}
      </h3>
      {shortcuts.map((s) => (
        <ShortcutRow key={s.action} shortcut={s} />
      ))}
    </div>
  );
}

interface ExploreShortcutsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExploreShortcutsOverlay({
  isOpen,
  onClose,
}: ExploreShortcutsOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-end justify-center overflow-y-auto bg-black/30 backdrop-blur-[2px] md:items-center">
      <div
        ref={panelRef}
        className="w-full max-w-[560px] rounded-t-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] md:rounded-2xl"
        role="dialog"
        aria-label="Keyboard shortcuts"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-ink">
            Keyboard Shortcuts
          </h2>
          <button
            aria-label="Close shortcuts"
            className="flex h-7 w-7 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-black/[0.04] hover:text-ink"
            onClick={onClose}
            type="button"
          >
            <X size={14} weight="bold" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            {LEFT_COLUMN.map((group) => (
              <ShortcutGroup
                key={group.label}
                label={group.label}
                shortcuts={group.shortcuts}
              />
            ))}
          </div>
          <div>
            {RIGHT_COLUMN.map((group) => (
              <ShortcutGroup
                key={group.label}
                label={group.label}
                shortcuts={group.shortcuts}
              />
            ))}
          </div>
        </div>

        <p className="mt-2 text-center text-[11px] text-ink-muted/50">
          Press <kbd className="rounded border border-[var(--border)] px-1 font-mono text-[10px]">?</kbd> or <kbd className="rounded border border-[var(--border)] px-1 font-mono text-[10px]">Esc</kbd> to close
        </p>
      </div>
    </div>
  );
}
