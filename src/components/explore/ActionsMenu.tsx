"use client";

import { useEffect, useRef, useState } from "react";
import {
  FloppyDisk,
  ArrowSquareOut,
  MagnifyingGlass,
  ProhibitInset,
  Link as LinkIcon,
  DotsThreeVertical,
} from "@phosphor-icons/react";
export interface ActionsMenuCallbacks {
  onSave?: () => void;
  onOpenOriginal?: () => void;
  onMoreFromSource?: () => void;
  onCopyLink?: () => void;
  onBlock?: () => void;
}

interface MenuItem {
  label: string;
  shortcut: string | null;
  icon: React.ReactNode;
  action: keyof ActionsMenuCallbacks;
  danger?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  {
    label: "Save to Library",
    shortcut: "S",
    icon: <FloppyDisk size={16} />,
    action: "onSave",
  },
  {
    label: "Open Original",
    shortcut: "O",
    icon: <ArrowSquareOut size={16} />,
    action: "onOpenOriginal",
  },
  {
    label: "More from this source",
    shortcut: null,
    icon: <MagnifyingGlass size={16} />,
    action: "onMoreFromSource",
  },
  {
    label: "Copy Link",
    shortcut: null,
    icon: <LinkIcon size={16} />,
    action: "onCopyLink",
  },
  {
    label: "Block this source",
    shortcut: "B",
    icon: <ProhibitInset size={16} />,
    action: "onBlock",
    danger: true,
  },
];

export function ActionsMenu({
  isSaved,
  callbacks,
}: {
  isSaved: boolean;
  callbacks: ActionsMenuCallbacks;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleItemClick = (item: MenuItem) => {
    const cb = callbacks[item.action];
    if (cb) cb();
    setOpen(false);
  };

  // Filter out save if already saved
  const items = MENU_ITEMS.filter((item) => {
    if (item.action === "onSave" && isSaved) return false;
    return true;
  });

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="More actions"
        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-black/[0.04] hover:text-ink"
        data-testid="actions-menu-trigger"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <DotsThreeVertical size={18} weight="bold" />
      </button>

      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full z-50 mt-1 w-56 rounded-xl border border-[var(--border)] bg-[var(--background)] py-1 shadow-lg"
          data-testid="actions-menu-dropdown"
          role="menu"
        >
          {items.map((item) => {
            // Add separator before dangerous actions
            const showSeparator = item.action === "onBlock";

            return (
              <div key={item.action}>
                {showSeparator && (
                  <div className="my-1 border-t border-[var(--border)]" />
                )}
                <button
                  className={`flex w-full items-center gap-3 px-3 py-2 text-[13px] transition-colors ${
                    item.danger
                      ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      : "text-ink hover:bg-black/[0.04]"
                  }`}
                  onClick={() => handleItemClick(item)}
                  role="menuitem"
                  type="button"
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.shortcut && (
                    <kbd className="rounded bg-black/[0.06] px-1.5 py-0.5 text-[10px] font-mono text-ink-muted dark:bg-white/[0.08]">
                      {item.shortcut}
                    </kbd>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
