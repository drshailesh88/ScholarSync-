"use client";

import { useEffect } from "react";
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
import { Plus, DotsSixVertical } from "@phosphor-icons/react";
import { useSlidesStore } from "@/stores/slides-store";
import { SlideThumbnail } from "../shared/slide-thumbnail";

// ---------------------------------------------------------------------------
// Sortable Thumbnail Wrapper
// ---------------------------------------------------------------------------

function SortableThumbnail({
  slideId,
  children,
}: {
  slideId: number;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: slideId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isDragging ? "opacity-50 z-50" : ""}`}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing p-0.5"
      >
        <DotsSixVertical size={10} className="text-ink-muted" weight="bold" />
      </div>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SlideFilmstrip — vertical filmstrip with drag-to-reorder
// ---------------------------------------------------------------------------

export function SlideFilmstrip() {
  const slides = useSlidesStore((s) => s.slides);
  const activeSlideId = useSlidesStore((s) => s.activeSlideId);
  const themeKey = useSlidesStore((s) => s.themeKey);
  const themeConfig = useSlidesStore((s) => s.themeConfig);
  const setActiveSlide = useSlidesStore((s) => s.setActiveSlide);
  const addSlide = useSlidesStore((s) => s.addSlide);
  const deleteSlide = useSlidesStore((s) => s.deleteSlide);
  const reorderSlides = useSlidesStore((s) => s.reorderSlides);
  const copySlide = useSlidesStore((s) => s.copySlide);
  const pasteSlide = useSlidesStore((s) => s.pasteSlide);

  // Ctrl+C / Ctrl+V for copy-paste slides
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;

      // Don't intercept when typing in an input/textarea
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;

      if (e.key === "c" && activeSlideId) {
        copySlide(activeSlideId);
      } else if (e.key === "v") {
        e.preventDefault();
        pasteSlide();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlideId, copySlide, pasteSlide]);

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
    <div className="w-48 shrink-0 flex flex-col border-r border-border bg-surface">
      {/* Slide list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={slideIds}
            strategy={verticalListSortingStrategy}
          >
            {sortedSlides.map((slide, index) => (
              <SortableThumbnail key={slide.id} slideId={slide.id}>
                <SlideThumbnail
                  title={slide.title}
                  subtitle={slide.subtitle}
                  layout={slide.layout}
                  contentBlocks={slide.contentBlocks}
                  themeKey={themeKey}
                  themeConfig={themeConfig}
                  isActive={slide.id === activeSlideId}
                  slideNumber={index + 1}
                  onClick={() => setActiveSlide(slide.id)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    if (slides.length > 1 && confirm("Delete this slide?")) {
                      deleteSlide(slide.id);
                    }
                  }}
                />
              </SortableThumbnail>
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {/* Add slide button */}
      <div className="p-2 border-t border-border">
        <button
          onClick={() => addSlide(activeSlideId ?? undefined)}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-border text-xs text-ink-muted hover:text-brand hover:border-brand/40 transition-colors"
        >
          <Plus size={12} />
          Add Slide
        </button>
      </div>
    </div>
  );
}
