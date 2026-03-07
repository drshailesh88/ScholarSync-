"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type RefObject,
} from "react";
import { MagnifyingGlass, Sparkle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { getBlocksByCategory } from "@/components/slides/blocks";
import { SHAPE_TYPE_OPTIONS, SHAPE_CATEGORIES, getShapesByCategory, renderShapeSvgPrimitive, isLineShape } from "@/components/slides/blocks/shape-utils";
import { getBlockIcon } from "./block-icons";
import type { ContentBlock } from "@/types/presentation";

type CategoryKey = "content" | "media" | "academic";

const CATEGORY_ORDER: CategoryKey[] = ["content", "media", "academic"];
const CATEGORY_LABELS: Record<CategoryKey, string> = {
  content: "Content",
  media: "Media",
  academic: "Academic",
};

const VISUALIZABLE_TYPES: Record<string, string> = {
  diagram: "flowchart",
  infographic: "process_flow",
  chart: "bar",
};

interface InsertMenuProps {
  isOpen: boolean;
  anchorRef: RefObject<HTMLElement | null>;
  onInsert: (type: ContentBlock["type"], dataOverride?: Record<string, unknown>) => void;
  onClose: () => void;
  onVisualize?: (preferredType: string) => void;
  align?: "start" | "center";
}
export function InsertMenu({
  isOpen,
  anchorRef,
  onInsert,
  onClose,
  onVisualize,
  align = "start",
}: InsertMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [shapeSubmenuOpen, setShapeSubmenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 });

  const groups = useMemo(() => getBlocksByCategory(), []);
  const normalizedSearch = search.trim().toLowerCase();

  const itemsByCategory = useMemo(() => {
    const categories = CATEGORY_ORDER.map((category) => {
      const allItems = groups[category] ?? [];
      const filteredItems = allItems.filter(({ type, entry }) => {
        if (entry.label.toLowerCase().includes(normalizedSearch)) return true;
        if (type !== "shape") return normalizedSearch.length === 0;

        return SHAPE_TYPE_OPTIONS.some((shape) => {
          const normalizedLabel = shape.label.toLowerCase();
          return (
            normalizedLabel.includes(normalizedSearch) ||
            shape.type.includes(normalizedSearch)
          );
        });
      });

      return { category, filteredItems };
    });

    // Compute running indices without mutation
    const offsets = categories.reduce<number[]>(
      (acc, _cat, i) => {
        acc.push(i === 0 ? 0 : acc[i - 1] + categories[i - 1].filteredItems.length);
        return acc;
      },
      []
    );

    return categories.map(({ category, filteredItems }, catIndex) => {
      const offset = offsets[catIndex];
      const items = filteredItems.map(({ type, entry }, i) => ({
        category,
        type,
        label: entry.label,
        iconName: entry.iconName,
        index: offset + i,
      }));

      return {
        category,
        label: CATEGORY_LABELS[category],
        items,
      };
    });
  }, [groups, normalizedSearch]);

  const flattenedItems = useMemo(
    () => itemsByCategory.flatMap((category) => category.items),
    [itemsByCategory]
  );

  // Reset state when menu opens (React render-time state adjustment)
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setSearch("");
      setActiveIndex(0);
      setShapeSubmenuOpen(false);
    }
  }

  // Clamp activeIndex when items change (render-time adjustment)
  const [prevItemCount, setPrevItemCount] = useState(flattenedItems.length);
  if (flattenedItems.length !== prevItemCount) {
    setPrevItemCount(flattenedItems.length);
    if (isOpen) {
      if (flattenedItems.length === 0) setActiveIndex(-1);
      else if (activeIndex >= flattenedItems.length) setActiveIndex(flattenedItems.length - 1);
      else if (activeIndex < 0) setActiveIndex(0);
    }
  }

  // Focus input on open
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Scroll active item into view
  useEffect(() => {
    if (!isOpen) return;
    const activeItem = itemRefs.current[activeIndex];
    if (activeItem && typeof activeItem.scrollIntoView === "function") {
      activeItem.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, isOpen]);

  // Sync shape submenu with active item
  const [prevActiveForSubmenu, setPrevActiveForSubmenu] = useState(activeIndex);
  if (activeIndex !== prevActiveForSubmenu) {
    setPrevActiveForSubmenu(activeIndex);
    if (isOpen) {
      const active = flattenedItems[activeIndex];
      setShapeSubmenuOpen(active?.type === "shape");
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const anchor = anchorRef.current;
      if (!anchor) return;

      const rect = anchor.getBoundingClientRect();
      const left = align === "center" ? rect.left + rect.width / 2 : rect.left;
      setMenuPosition({
        left,
        top: rect.bottom + 6,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [align, anchorRef, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuRef.current?.contains(target)) return;
      if (anchorRef.current?.contains(target)) return;
      onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [anchorRef, isOpen, onClose]);

  if (!isOpen) return null;

  const selectItem = (type: ContentBlock["type"], dataOverride?: Record<string, unknown>) => {
    if (dataOverride === undefined) {
      onInsert(type);
    } else {
      onInsert(type, dataOverride);
    }
    onClose();
  };

  const handleKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (flattenedItems.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % flattenedItems.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) =>
        current <= 0 ? flattenedItems.length - 1 : current - 1
      );
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const selected = flattenedItems[activeIndex];
      if (selected) {
        if (selected.type === "shape" && !shapeSubmenuOpen) {
          setShapeSubmenuOpen(true);
          return;
        }
        if (selected.type === "shape") {
          selectItem("shape", { shapeType: "rectangle" });
          return;
        }
        selectItem(selected.type);
      }
    }
  };

  return (
    <div
      ref={menuRef}
      data-testid="insert-menu"
      role="menu"
      className={cn(
        "fixed z-[1000] w-[280px] max-h-[400px] overflow-hidden rounded-xl border border-border bg-surface shadow-xl",
        align === "center" ? "-translate-x-1/2" : ""
      )}
      style={{ left: menuPosition.left, top: menuPosition.top }}
      onKeyDown={handleKeyDown}
    >
      <div className="border-b border-border px-3 py-2">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-raised px-2 py-1.5">
          <MagnifyingGlass size={14} className="shrink-0 text-ink-muted" />
          <input
            ref={inputRef}
            data-testid="insert-menu-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search blocks..."
            className="w-full bg-transparent text-xs text-ink outline-none placeholder:text-ink-muted/60"
          />
        </div>
      </div>

      <div className="max-h-[344px] overflow-y-auto p-1.5">
        {itemsByCategory.map(({ category, label, items }) => (
          <section key={category} data-testid={`insert-menu-section-${category}`}>
            <h4 className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
              {label}
            </h4>
            {items.map((item) => {
              const Icon = getBlockIcon(item.iconName);
              const isActive = item.index === activeIndex;
              const isShapeItem = item.type === "shape";

              return (
                <div key={item.type}>
                  <button
                    ref={(node) => {
                      itemRefs.current[item.index] = node;
                    }}
                    type="button"
                    role="menuitem"
                    data-testid="insert-menu-item"
                    data-type={item.type}
                    data-category={item.category}
                    aria-current={isActive || undefined}
                    onMouseEnter={() => {
                      setActiveIndex(item.index);
                      setShapeSubmenuOpen(isShapeItem);
                    }}
                    onClick={() => {
                      if (isShapeItem) {
                        setActiveIndex(item.index);
                        setShapeSubmenuOpen((current) => !current);
                        return;
                      }
                      selectItem(item.type);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors",
                      isActive
                        ? "bg-brand/10 text-brand"
                        : "text-ink hover:bg-surface-raised"
                    )}
                  >
                    <Icon size={14} className={isActive ? "text-brand" : "text-ink-muted"} />
                    <span>{item.label}</span>
                  </button>

                  {isShapeItem && shapeSubmenuOpen && isActive && (
                    <div
                      data-testid="insert-menu-shape-submenu"
                      className="mx-2 my-1 max-h-[200px] overflow-y-auto rounded-lg border border-border bg-surface-raised p-1.5"
                    >
                      {SHAPE_CATEGORIES.map((cat) => {
                        const shapes = getShapesByCategory()[cat];
                        if (shapes.length === 0) return null;
                        return (
                          <div key={cat} className="mb-1.5 last:mb-0">
                            <h5 className="px-1 pb-0.5 text-[9px] font-semibold uppercase tracking-wider text-ink-muted/70">
                              {cat}
                            </h5>
                            <div className="grid grid-cols-4 gap-1">
                              {shapes.map((shape) => (
                                <button
                                  key={shape.type}
                                  type="button"
                                  data-testid="insert-menu-shape-item"
                                  data-shape-type={shape.type}
                                  title={shape.label}
                                  onClick={() => selectItem("shape", { shapeType: shape.type })}
                                  className="flex h-8 items-center justify-center rounded border border-border bg-surface text-ink-muted transition-colors hover:border-brand hover:text-brand"
                                >
                                  <svg className="h-5 w-5" viewBox="0 0 100 100" aria-hidden="true">
                                    {renderShapeSvgPrimitive(shape.type, {
                                      fill: isLineShape(shape.type) ? "none" : "currentColor",
                                      stroke: "currentColor",
                                      strokeWidth: isLineShape(shape.type) ? 10 : 6,
                                    })}
                                  </svg>
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        ))}

        {flattenedItems.length === 0 && (
          <p className="py-3 text-center text-xs text-ink-muted">
            No blocks found
          </p>
        )}
      </div>
    </div>
  );
}
