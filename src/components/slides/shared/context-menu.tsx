"use client";

import { useEffect, useRef, useState } from "react";
import { CaretRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export interface ContextMenuItem {
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  danger?: boolean;
  disabled?: boolean;
  divider?: boolean;
  submenuContent?: React.ReactNode | ((onClose: () => void) => React.ReactNode);
}

interface ContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  items: ContextMenuItem[];
  onClose: () => void;
}

export function ContextMenu({ isOpen, position, items, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState(position);

  useEffect(() => {
    if (!isOpen) return;

    setIsVisible(false);

    const frame = window.requestAnimationFrame(() => {
      const menu = menuRef.current;
      if (!menu) return;

      const margin = 8;
      const maxX = window.innerWidth - menu.offsetWidth - margin;
      const maxY = window.innerHeight - menu.offsetHeight - margin;

      setMenuPosition({
        x: Math.max(margin, Math.min(position.x, maxX)),
        y: Math.max(margin, Math.min(position.y, maxY)),
      });
      setIsVisible(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isOpen, position]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const handleScroll = () => {
      onClose();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen, onClose]);

  if (!isOpen || items.length === 0) return null;

  return (
    <div
      ref={menuRef}
      data-testid="context-menu"
      role="menu"
      className={cn(
        "fixed z-[1000] min-w-[180px] rounded-xl border border-border bg-surface px-1 py-1 text-xs shadow-lg",
        "origin-top-left transition duration-100 ease-out",
        isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
      )}
      style={{ left: menuPosition.x, top: menuPosition.y }}
    >
      {items.map((item, index) => {
        if (item.divider) {
          return <div key={`divider-${item.label}-${index}`} className="my-1 h-px bg-border" />;
        }

        return (
          <div key={`${item.label}-${index}`} className="group/submenu relative">
            <button
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={(event) => {
                if (item.disabled || item.submenuContent) return;
                item.onClick?.(event);
                onClose();
              }}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left",
                item.disabled
                  ? "cursor-not-allowed text-ink-muted/60"
                  : item.danger
                    ? "text-red-500 hover:bg-surface-raised"
                    : "text-ink hover:bg-surface-raised"
              )}
            >
              {item.icon ? <span className="shrink-0 text-[13px]">{item.icon}</span> : null}
              <span className="flex-1 truncate">{item.label}</span>
              {item.shortcut ? (
                <span className="shrink-0 text-[10px] uppercase tracking-wide text-ink-muted">
                  {item.shortcut}
                </span>
              ) : null}
              {item.submenuContent ? (
                <CaretRight size={11} className="shrink-0 text-ink-muted" />
              ) : null}
            </button>
            {item.submenuContent ? (
              <div
                className={cn(
                  "pointer-events-none invisible absolute left-full top-0 z-[1001] ml-1",
                  "translate-x-1 opacity-0 transition-all duration-100",
                  "group-hover/submenu:pointer-events-auto group-hover/submenu:visible group-hover/submenu:translate-x-0 group-hover/submenu:opacity-100"
                )}
              >
                <div className="rounded-xl border border-border bg-surface p-1 shadow-lg">
                  {typeof item.submenuContent === "function"
                    ? item.submenuContent(onClose)
                    : item.submenuContent}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
