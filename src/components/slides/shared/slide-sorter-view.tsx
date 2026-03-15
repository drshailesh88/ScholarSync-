"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X, GridFour } from "@phosphor-icons/react";
import { useSlidesStore } from "@/stores/slides-store";
import { SlideThumbnail } from "./slide-thumbnail";

function SortableGridItem({
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
      className={`${isDragging ? "opacity-50 z-50" : ""}`}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}

export function SlideSorterView({ onClose }: { onClose: () => void }) {
  const slides = useSlidesStore((s) => s.slides);
  const masters = useSlidesStore((s) => s.masters);
  const activeSlideId = useSlidesStore((s) => s.activeSlideId);
  const themeKey = useSlidesStore((s) => s.themeKey);
  const themeConfig = useSlidesStore((s) => s.themeConfig);
  const institutionKit = useSlidesStore((s) => s.institutionKit);
  const setActiveSlide = useSlidesStore((s) => s.setActiveSlide);
  const reorderSlides = useSlidesStore((s) => s.reorderSlides);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
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
    <div className="fixed inset-0 z-50 bg-surface/95 backdrop-blur-sm overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 border-b border-border bg-surface/90 backdrop-blur-md">
        <div className="flex items-center gap-2 text-ink">
          <GridFour size={18} />
          <span className="text-sm font-medium">Slide Sorter</span>
          <span className="text-xs text-ink-muted">
            ({slides.length} slides — drag to reorder)
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          aria-label="Close slide sorter"
        >
          <X size={18} />
        </button>
      </div>

      {/* Grid */}
      <div className="p-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={slideIds} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {sortedSlides.length === 0 && (
                <p className="col-span-full text-xs text-ink-muted text-center py-8">Nothing here yet. Add slides to get started.</p>
              )}
              {sortedSlides.map((slide, index) => (
                <SortableGridItem key={slide.id} slideId={slide.id}>
                  <div className="cursor-grab active:cursor-grabbing">
                    <SlideThumbnail
                      title={slide.title}
                      subtitle={slide.subtitle}
                      layout={slide.layout}
                      masterId={slide.masterId}
                      masters={masters}
                      contentBlocks={slide.contentBlocks}
                      cardBackground={slide.cardBackground}
                      themeKey={themeKey}
                      themeConfig={themeConfig}
                      institutionKit={institutionKit}
                      isActive={slide.id === activeSlideId}
                      slideNumber={index + 1}
                      onClick={() => {
                        setActiveSlide(slide.id);
                        onClose();
                      }}
                    />
                  </div>
                </SortableGridItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
