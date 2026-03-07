"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
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
  Plus,
  DotsSixVertical,
  CopySimple,
  Copy,
  Scissors,
  ClipboardText,
  ArrowLineUp,
  ArrowLineDown,
  EyeSlash,
  Trash,
  Selection,
  ImageSquare,
  Export,
} from "@phosphor-icons/react";
import { useSlidesStore } from "@/stores/slides-store";
import { cn } from "@/lib/utils";
import { useContextMenu } from "@/hooks/use-context-menu";
import { LAYOUT_OPTIONS } from "@/components/presentation/layout-picker";
import type { SlideLayout } from "@/types/presentation";
import type { ContextMenuItem } from "../shared/context-menu";
import { SlideThumbnail } from "../shared/slide-thumbnail";
import { SlideRendererV2 } from "../shared/slide-renderer-v2";
import { PresenceDotsSlot } from "../shared/collaboration-slots";
import {
  downloadBlob,
  exportSlideAsPNG,
  exportSlideAsSVG,
} from "@/lib/presentation/slide-image-export";

function sanitizeFilename(input: string): string {
  return input.replace(/[^a-zA-Z0-9_-]/g, "_");
}

function waitForNextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

function getPngScale(event?: React.MouseEvent<HTMLButtonElement>): 2 | 3 {
  return event?.shiftKey ? 3 : 2;
}

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
  const masters = useSlidesStore((s) => s.masters);
  const activeSlideId = useSlidesStore((s) => s.activeSlideId);
  const themeKey = useSlidesStore((s) => s.themeKey);
  const themeConfig = useSlidesStore((s) => s.themeConfig);
  const deckTitle = useSlidesStore((s) => s.title);
  const setActiveSlide = useSlidesStore((s) => s.setActiveSlide);
  const addSlide = useSlidesStore((s) => s.addSlide);
  const deleteSlide = useSlidesStore((s) => s.deleteSlide);
  const reorderSlides = useSlidesStore((s) => s.reorderSlides);
  const copySlide = useSlidesStore((s) => s.copySlide);
  const pasteSlide = useSlidesStore((s) => s.pasteSlide);
  const duplicateSlide = useSlidesStore((s) => s.duplicateSlide);
  const clipboardSlide = useSlidesStore((s) => s.clipboardSlide);
  const updateSlide = useSlidesStore((s) => s.updateSlide);
  const [contextSlideId, setContextSlideId] = useState<number | null>(null);
  const {
    openMenu,
    closeMenu,
    ContextMenuPortal,
  } = useContextMenu();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const sortedSlides = [...slides].sort((a, b) => a.sortOrder - b.sortOrder);
  const slideIds = sortedSlides.map((s) => s.id);
  const contextSlide = slides.find((s) => s.id === contextSlideId) ?? null;
  const standardLayouts = LAYOUT_OPTIONS.filter(
    (layout) => layout.group === "standard"
  );

  const exportSlideFromContextMenu = useCallback(
    async (
      format: "png" | "svg",
      event?: React.MouseEvent<HTMLButtonElement>,
    ) => {
      if (!contextSlide) return;
      const pngScale = getPngScale(event);

      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.pointerEvents = "none";
      container.style.opacity = "0";
      document.body.appendChild(container);

      const root = createRoot(container);

      try {
        root.render(
          <div data-slide-context-export="true" style={{ width: "1920px" }}>
            <SlideRendererV2
              title={contextSlide.title}
              subtitle={contextSlide.subtitle}
              layout={contextSlide.layout}
              masterId={contextSlide.masterId}
              masters={masters}
              contentBlocks={contextSlide.contentBlocks}
              themeKey={themeKey}
              themeConfig={themeConfig}
              cardBackground={contextSlide.cardBackground}
              showSlideNumber
              slideNumber={contextSlide.sortOrder + 1}
              className="w-full"
            />
          </div>
        );

        await waitForNextFrame();
        await waitForNextFrame();
        if (document.fonts?.ready) {
          await document.fonts.ready;
        }
        await new Promise((resolve) => setTimeout(resolve, 120));

        const slideElement = container.querySelector<HTMLElement>(
          '[data-slide-context-export="true"]',
        );
        if (!slideElement) {
          throw new Error("Failed to render slide for export");
        }

        const safeDeckTitle = sanitizeFilename(deckTitle || "Presentation");
        const safeSlideTitle = sanitizeFilename(
          contextSlide.title || `Slide_${contextSlide.sortOrder + 1}`,
        );
        const filenameBase = `${safeDeckTitle}_slide_${String(contextSlide.sortOrder + 1).padStart(2, "0")}_${safeSlideTitle}`;

        if (format === "svg") {
          const svgMarkup = await exportSlideAsSVG(slideElement);
          downloadBlob(
            new Blob([svgMarkup], { type: "image/svg+xml" }),
            `${filenameBase}.svg`,
          );
          return;
        }

        const pngBlob = await exportSlideAsPNG(slideElement, { scale: pngScale });
        downloadBlob(pngBlob, `${filenameBase}.png`);
      } catch (err) {
        console.error("Filmstrip slide image export failed:", err);
      } finally {
        root.unmount();
        container.remove();
      }
    },
    [contextSlide, deckTitle, masters, themeConfig, themeKey],
  );

  useEffect(() => {
    if (contextSlideId !== null && !slides.some((s) => s.id === contextSlideId)) {
      closeMenu();
      setContextSlideId(null);
    }
  }, [closeMenu, contextSlideId, slides]);

  const contextItems = useMemo<ContextMenuItem[]>(() => {
    if (!contextSlide) return [];

    return [
      {
        label: "New Slide",
        icon: <Plus size={13} />,
        onClick: () => {
          void addSlide(contextSlide.id);
        },
      },
      {
        label: "Duplicate Slide",
        icon: <CopySimple size={13} />,
        onClick: () => {
          void duplicateSlide(contextSlide.id);
        },
      },
      { label: "divider-main-1", divider: true },
      {
        label: "Copy Slide",
        icon: <Copy size={13} />,
        onClick: () => {
          copySlide(contextSlide.id);
        },
      },
      {
        label: "Cut Slide",
        icon: <Scissors size={13} />,
        disabled: slides.length <= 1,
        onClick: () => {
          copySlide(contextSlide.id);
          void deleteSlide(contextSlide.id);
        },
      },
      {
        label: "Paste Slide",
        icon: <ClipboardText size={13} />,
        disabled: clipboardSlide === null,
        onClick: () => {
          void pasteSlide();
        },
      },
      { label: "divider-main-2", divider: true },
      {
        label: "Move to Beginning",
        icon: <ArrowLineUp size={13} />,
        onClick: () => {
          const currentIndex = slideIds.indexOf(contextSlide.id);
          if (currentIndex <= 0) return;
          const nextIds = [...slideIds];
          const [moved] = nextIds.splice(currentIndex, 1);
          nextIds.unshift(moved);
          void reorderSlides(nextIds);
        },
      },
      {
        label: "Move to End",
        icon: <ArrowLineDown size={13} />,
        onClick: () => {
          const currentIndex = slideIds.indexOf(contextSlide.id);
          if (currentIndex === -1 || currentIndex === slideIds.length - 1) return;
          const nextIds = [...slideIds];
          const [moved] = nextIds.splice(currentIndex, 1);
          nextIds.push(moved);
          void reorderSlides(nextIds);
        },
      },
      { label: "divider-main-3", divider: true },
      {
        label: "Hide Slide",
        icon: <EyeSlash size={13} />,
        onClick: () => {
          updateSlide(contextSlide.id, { hidden: !contextSlide.hidden });
        },
      },
      {
        label: "Change Layout...",
        submenuContent: (onClose) => (
          <div className="grid grid-cols-3 gap-1.5 p-1 w-[240px]">
            {standardLayouts.map((layout) => (
              <button
                key={layout.key}
                type="button"
                onClick={() => {
                  updateSlide(contextSlide.id, { layout: layout.key as SlideLayout });
                  onClose();
                }}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center rounded-md border px-1 py-1",
                  "text-[9px] leading-tight transition-colors",
                  contextSlide.layout === layout.key
                    ? "border-brand bg-brand/5 text-brand"
                    : "border-border text-ink-muted hover:border-brand/40 hover:bg-surface-raised"
                )}
              >
                <span className="text-xs font-mono leading-none">{layout.icon}</span>
                <span className="mt-1 text-center">{layout.label}</span>
              </button>
            ))}
          </div>
        ),
      },
      {
        label: "Apply Master...",
        icon: <Selection size={13} />,
        submenuContent: (onClose) => (
          <div className="min-w-[220px] p-1 space-y-1">
            <button
              type="button"
              onClick={() => {
                updateSlide(contextSlide.id, { masterId: undefined });
                onClose();
              }}
              className={cn(
                "w-full rounded-md border px-2 py-1.5 text-left text-[11px] transition-colors",
                contextSlide.masterId
                  ? "border-border text-ink-muted hover:border-brand/40 hover:bg-surface-raised"
                  : "border-brand bg-brand/5 text-brand"
              )}
            >
              No Master
            </button>
            {masters.map((master) => (
              <button
                key={master.id}
                type="button"
                onClick={() => {
                  updateSlide(contextSlide.id, {
                    masterId: master.id,
                    layout: master.layout,
                  });
                  onClose();
                }}
                className={cn(
                  "w-full rounded-md border px-2 py-1.5 text-left text-[11px] transition-colors",
                  contextSlide.masterId === master.id
                    ? "border-brand bg-brand/5 text-brand"
                    : "border-border text-ink-muted hover:border-brand/40 hover:bg-surface-raised"
                )}
              >
                {master.name}
              </button>
            ))}
          </div>
        ),
      },
      { label: "divider-main-4", divider: true },
      {
        label: "Export as PNG HD (Shift+Click)",
        icon: <ImageSquare size={13} />,
        onClick: (event) => {
          void exportSlideFromContextMenu("png", event);
        },
      },
      {
        label: "Export as SVG",
        icon: <Export size={13} />,
        onClick: () => {
          void exportSlideFromContextMenu("svg");
        },
      },
      { label: "divider-main-5", divider: true },
      {
        label: "Delete Slide",
        icon: <Trash size={13} />,
        danger: true,
        disabled: slides.length <= 1,
        onClick: () => {
          void deleteSlide(contextSlide.id);
        },
      },
    ];
  }, [
    addSlide,
    clipboardSlide,
    contextSlide,
    copySlide,
    deleteSlide,
    duplicateSlide,
    pasteSlide,
    reorderSlides,
    slideIds,
    slides.length,
    standardLayouts,
    masters,
    exportSlideFromContextMenu,
    updateSlide,
  ]);

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
                <div
                  data-testid={`filmstrip-slide-${slide.id}`}
                  className={cn(
                    "relative transition-opacity",
                    slide.hidden ? "opacity-50" : "opacity-100"
                  )}
                >
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
                    isActive={slide.id === activeSlideId}
                    slideNumber={index + 1}
                    onClick={() => setActiveSlide(slide.id)}
                    onContextMenu={(e) => {
                      setContextSlideId(slide.id);
                      openMenu(e);
                    }}
                  />
                  {slide.hidden ? (
                    <div className="pointer-events-none absolute right-1 top-1 rounded-md bg-black/65 p-1 text-white">
                      <EyeSlash size={11} aria-label="Hidden slide" />
                    </div>
                  ) : null}
                  {/* Collaboration presence dots */}
                  <PresenceDotsSlot slideId={slide.id} />
                </div>
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
      <ContextMenuPortal items={contextItems} />
    </div>
  );
}
