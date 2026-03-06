"use client";

import { createElement, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import {
  ContextMenu,
  type ContextMenuItem,
} from "@/components/slides/shared/context-menu";

interface ContextMenuPosition {
  x: number;
  y: number;
}

interface ContextMenuPortalProps {
  items: ContextMenuItem[];
}

export function useContextMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<ContextMenuPosition>({ x: 0, y: 0 });

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setPosition({ x: event.clientX, y: event.clientY });
    setIsOpen(true);
  }, []);

  const ContextMenuPortal = useCallback(
    ({ items }: ContextMenuPortalProps) => {
      if (!isOpen || typeof document === "undefined") return null;

      return createPortal(
        createElement(ContextMenu, {
          isOpen,
          position,
          items,
          onClose: closeMenu,
        }),
        document.body
      );
    },
    [closeMenu, isOpen, position]
  );

  return {
    isOpen,
    position,
    openMenu,
    closeMenu,
    ContextMenuPortal,
  };
}
