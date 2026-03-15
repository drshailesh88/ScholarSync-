"use client";

import { useState, useRef, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DotsSixVertical,
  DotsThree,
  Plus,
  Copy,
  Trash,
} from "@phosphor-icons/react";
import { useSlidesStore } from "@/stores/slides-store";

// ---------------------------------------------------------------------------
// Sortable Card Item
// ---------------------------------------------------------------------------

function SortableCardItem({
  slideId,
  index,
  title,
  isActive,
  onSelect,
  onDuplicate,
  onDelete,
  isOnly,
}: {
  slideId: number;
  index: number;
  title: string;
  isActive: boolean;
  onSelect: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  isOnly: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: slideId });

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const truncated =
    title.length > 20 ? title.slice(0, 20) + "\u2026" : title || "Untitled";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group relative flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs cursor-pointer
        transition-colors select-none
        ${isDragging ? "opacity-50 z-50" : ""}
        ${
          isActive
            ? "bg-brand/10 text-brand font-medium"
            : "text-ink hover:bg-surface-raised"
        }
      `}
      onClick={onSelect}
    >
      {/* Drag handle */}
      <button
        className="shrink-0 cursor-grab active:cursor-grabbing text-ink-faint hover:text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity"
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
      >
        <DotsSixVertical size={14} weight="bold" />
      </button>

      {/* Card number */}
      <span className="shrink-0 w-4 text-center text-ink-faint text-[10px] font-medium">
        {index + 1}
      </span>

      {/* Title */}
      <span className="flex-1 truncate">{truncated}</span>

      {/* Menu trigger */}
      <div className="relative shrink-0" ref={menuRef}>
        <button
          className="p-0.5 rounded hover:bg-surface-raised opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((v) => !v);
          }}
        >
          <DotsThree size={14} weight="bold" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full mt-1 z-50 w-36 rounded-lg border border-border bg-surface shadow-lg py-1">
            <button
              className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-ink hover:bg-surface-raised transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
                setMenuOpen(false);
              }}
            >
              <Copy size={14} />
              Duplicate
            </button>
            <button
              className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-red-500 hover:bg-surface-raised transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={isOnly}
              onClick={(e) => {
                e.stopPropagation();
                if (!isOnly) {
                  onDelete();
                  setMenuOpen(false);
                }
              }}
            >
              <Trash size={14} />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Insert-between "+" button
// ---------------------------------------------------------------------------

function InsertButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-center py-0.5 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity">
      <button
        className="p-0.5 rounded-full hover:bg-brand/10 text-ink-faint hover:text-brand transition-colors"
        onClick={onClick}
        title="Insert card"
      >
        <Plus size={12} weight="bold" />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CardOutlineSidebar
// ---------------------------------------------------------------------------

export function CardOutlineSidebar() {
  const slides = useSlidesStore((s) => s.slides);
  const activeSlideId = useSlidesStore((s) => s.activeSlideId);
  const setActiveSlide = useSlidesStore((s) => s.setActiveSlide);
  const addSlide = useSlidesStore((s) => s.addSlide);
  const deleteSlide = useSlidesStore((s) => s.deleteSlide);
  const duplicateSlide = useSlidesStore((s) => s.duplicateSlide);
  const reorderSlides = useSlidesStore((s) => s.reorderSlides);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const sortedSlides = [...slides].sort((a, b) => a.sortOrder - b.sortOrder);
  const slideIds = sortedSlides.map((s) => s.id);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = slideIds.indexOf(active.id as number);
    const newIndex = slideIds.indexOf(over.id as number);
    if (oldIndex === -1 || newIndex === -1) return;

    const newIds = [...slideIds];
    const [removed] = newIds.splice(oldIndex, 1);
    newIds.splice(newIndex, 0, removed);
    reorderSlides(newIds);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-3 pt-3 pb-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
          Outline
        </span>
      </div>

      {/* Sortable list */}
      <div className="flex-1 overflow-y-auto px-1">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={slideIds}
            strategy={verticalListSortingStrategy}
          >
            {/* empty state: no data, no results, nothing here */}
            {sortedSlides.length === 0 && (
              <p className="text-xs text-ink-muted text-center py-4">nothing here yet. get started by adding a card.</p>
            )}
            {sortedSlides.map((slide, idx) => (
              <div key={slide.id}>
                {idx > 0 && (
                  <InsertButton
                    onClick={() => addSlide(sortedSlides[idx - 1].id)}
                  />
                )}
                <SortableCardItem
                  slideId={slide.id}
                  index={idx}
                  title={slide.title}
                  isActive={slide.id === activeSlideId}
                  onSelect={() => setActiveSlide(slide.id)}
                  onDuplicate={() => duplicateSlide(slide.id)}
                  onDelete={() => deleteSlide(slide.id)}
                  isOnly={slides.length <= 1}
                />
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {/* Add card button */}
      <div className="p-2 border-t border-border">
        <button
          className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg text-xs text-ink-muted hover:text-brand hover:bg-brand/10 transition-colors"
          onClick={() =>
            addSlide(
              sortedSlides.length > 0
                ? sortedSlides[sortedSlides.length - 1].id
                : undefined
            )
          }
        >
          <Plus size={14} weight="bold" />
          Add card
        </button>
      </div>
    </div>
  );
}
