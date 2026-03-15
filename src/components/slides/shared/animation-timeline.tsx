"use client";

import { useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import type { ContentBlock, BlockAnimation } from "@/types/presentation";
import { CaretDown, CaretRight, Play } from "@phosphor-icons/react";
import {
  getAnimatedBlockEntries,
  getAnimationRunTimeSeconds,
} from "@/lib/presentation/block-animations";
import { cn } from "@/lib/utils";

const PIXELS_PER_SECOND = 80;
const ROW_HEIGHT_PX = 36;
const MIN_DURATION_SECONDS = 0.05;
const BAR_MIN_WIDTH_PX = 12;
const ORDER_COLUMN_WIDTH_PX = 64;

const BAR_COLORS = [
  "bg-sky-500/85",
  "bg-emerald-500/85",
  "bg-amber-500/85",
  "bg-fuchsia-500/85",
  "bg-cyan-500/85",
  "bg-lime-500/85",
  "bg-orange-500/85",
  "bg-blue-500/85",
] as const;

interface AnimationTimelineProps {
  blocks: ContentBlock[];
  selectedBlockIndex: number | null;
  previewRunning?: boolean;
  onSelectBlock: (blockIndex: number) => void;
  onUpdateAnimation: (blockIndex: number, patch: Partial<BlockAnimation>) => void;
  onPreview: () => void;
}

type DragMode = "move" | "resize-start" | "resize-end";

interface DragState {
  mode: DragMode;
  blockIndex: number;
  startClientX: number;
  startClientY: number;
  startDelay: number;
  startDuration: number;
  startOrder: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function roundSeconds(value: number): number {
  return Number(value.toFixed(2));
}

export function AnimationTimeline({
  blocks,
  selectedBlockIndex,
  previewRunning = false,
  onSelectBlock,
  onUpdateAnimation,
  onPreview,
}: AnimationTimelineProps) {
  const [collapsed, setCollapsed] = useState(false);
  const dragStateRef = useRef<DragState | null>(null);
  const movedDuringDragRef = useRef(false);

  const entries = useMemo(
    () => getAnimatedBlockEntries(blocks).sort((a, b) => a.order - b.order || a.blockIndex - b.blockIndex),
    [blocks],
  );

  const uniqueOrders = useMemo(
    () => [...new Set(entries.map((entry) => entry.order))].sort((a, b) => a - b),
    [entries],
  );

  const timelineEnd = useMemo(() => {
    /* empty state: no data, nothing here */
    if (entries.length === 0) return 2;
    const maxEnd = Math.max(...entries.map((entry) => entry.animation.delay + entry.animation.duration));
    return Math.max(2, Math.ceil(maxEnd + 0.5));
  }, [entries]);

  const timelineWidth = Math.max(timelineEnd * PIXELS_PER_SECOND, 420);

  const orderIndexByValue = useMemo(() => {
    const map = new Map<number, number>();
    uniqueOrders.forEach((order, index) => {
      map.set(order, index);
    });
    return map;
  }, [uniqueOrders]);

  const laneOffsetByBlock = useMemo(() => {
    const counters = new Map<number, number>();
    const laneMap = new Map<number, number>();
    for (const entry of entries) {
      const lane = counters.get(entry.order) ?? 0;
      laneMap.set(entry.blockIndex, lane);
      counters.set(entry.order, lane + 1);
    }
    return laneMap;
  }, [entries]);

  const rowCount = Math.max(uniqueOrders.length, 1);
  const bodyHeight = rowCount * ROW_HEIGHT_PX;

  const commitDrag = (event: MouseEvent) => {
    const drag = dragStateRef.current;
    if (!drag) return;

    const deltaX = event.clientX - drag.startClientX;
    const deltaY = event.clientY - drag.startClientY;
    const deltaSeconds = deltaX / PIXELS_PER_SECOND;

    if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
      movedDuringDragRef.current = true;
    }

    if (drag.mode === "move") {
      const nextDelay = roundSeconds(Math.max(0, drag.startDelay + deltaSeconds));
      const orderDelta = Math.round(deltaY / ROW_HEIGHT_PX);
      const nextOrder = Math.max(1, drag.startOrder + orderDelta);
      onUpdateAnimation(drag.blockIndex, {
        delay: nextDelay,
        order: nextOrder,
      });
      return;
    }

    if (drag.mode === "resize-start") {
      const maxDelay = drag.startDelay + drag.startDuration - MIN_DURATION_SECONDS;
      const nextDelay = clamp(drag.startDelay + deltaSeconds, 0, maxDelay);
      const nextDuration = drag.startDuration + (drag.startDelay - nextDelay);
      onUpdateAnimation(drag.blockIndex, {
        delay: roundSeconds(nextDelay),
        duration: roundSeconds(Math.max(nextDuration, MIN_DURATION_SECONDS)),
      });
      return;
    }

    const nextDuration = Math.max(MIN_DURATION_SECONDS, drag.startDuration + deltaSeconds);
    onUpdateAnimation(drag.blockIndex, {
      duration: roundSeconds(nextDuration),
    });
  };

  const startDrag = (
    e: ReactMouseEvent,
    blockIndex: number,
    animation: BlockAnimation,
    mode: DragMode,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    dragStateRef.current = {
      mode,
      blockIndex,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startDelay: animation.delay,
      startDuration: animation.duration,
      startOrder: Math.max(animation.order, 1),
    };
    movedDuringDragRef.current = false;

    const handleMouseMove = (event: MouseEvent) => {
      commitDrag(event);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      dragStateRef.current = null;

      setTimeout(() => {
        movedDuringDragRef.current = false;
      }, 0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <section className="mt-3 rounded-lg border border-border bg-surface shadow-sm">
      <header className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-muted hover:text-ink"
          aria-label={collapsed ? "Expand animation timeline" : "Collapse animation timeline"}
        >
          {collapsed ? <CaretRight className="h-3.5 w-3.5" weight="bold" /> : <CaretDown className="h-3.5 w-3.5" weight="bold" />}
          Animation Timeline
          <span className="text-[10px] normal-case tracking-normal text-ink-muted/80">
            {entries.length} block{entries.length === 1 ? "" : "s"}
          </span>
        </button>

        <button
          type="button"
          onClick={onPreview}
          disabled={previewRunning || entries.length === 0}
          className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-ink hover:border-brand/50 hover:text-brand disabled:cursor-not-allowed disabled:opacity-50"
          data-testid="animation-timeline-preview"
        >
          <Play className="h-3.5 w-3.5" weight="fill" />
          {previewRunning ? "Previewing..." : "Preview"}
        </button>
      </header>

      {!collapsed && (
        <div className="px-3 py-3">
          {entries.length === 0 ? (
            <p className="text-xs text-ink-muted">No block animations on this slide yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <div
                className="relative"
                style={{
                  minWidth: `${ORDER_COLUMN_WIDTH_PX + timelineWidth}px`,
                  height: `${bodyHeight + 26}px`,
                }}
                data-testid="animation-timeline-track"
              >
                <div className="absolute left-0 top-0 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                  Order
                </div>

                <div
                  className="absolute left-16 top-0 h-5"
                  style={{ width: `${timelineWidth}px` }}
                >
                  {Array.from({ length: timelineEnd + 1 }, (_, second) => (
                    <div
                      key={`tick-${second}`}
                      className="absolute top-0 text-[10px] text-ink-muted"
                      style={{ left: `${second * PIXELS_PER_SECOND}px` }}
                    >
                      <div className="h-2 w-px bg-border" />
                      <span>{second}s</span>
                    </div>
                  ))}
                </div>

                <div className="absolute left-0 top-6" style={{ width: `${ORDER_COLUMN_WIDTH_PX}px` }}>
                  {Array.from({ length: rowCount }, (_, rowIndex) => {
                    const orderValue = uniqueOrders[rowIndex] ?? rowIndex + 1;
                    return (
                      <div
                        key={`order-row-${orderValue}`}
                        className="flex h-9 items-center text-[11px] font-medium text-ink-muted"
                      >
                        {orderValue}
                      </div>
                    );
                  })}
                </div>

                <div
                  className="absolute left-16 top-6"
                  style={{ width: `${timelineWidth}px`, height: `${bodyHeight}px` }}
                >
                  {Array.from({ length: rowCount }, (_, rowIndex) => (
                    <div
                      key={`grid-row-${rowIndex}`}
                      className="absolute left-0 right-0 border-b border-dashed border-border/70"
                      style={{ top: `${(rowIndex + 1) * ROW_HEIGHT_PX - 1}px` }}
                    />
                  ))}

                  {entries.map((entry, index) => {
                    const rowIndex = orderIndexByValue.get(entry.order) ?? 0;
                    const laneIndex = laneOffsetByBlock.get(entry.blockIndex) ?? 0;
                    const left = Math.max(0, entry.animation.delay * PIXELS_PER_SECOND);
                    const width = Math.max(
                      BAR_MIN_WIDTH_PX,
                      entry.animation.duration * PIXELS_PER_SECOND,
                    );
                    const top = rowIndex * ROW_HEIGHT_PX + 6 + laneIndex * 3;
                    const colorClass = BAR_COLORS[index % BAR_COLORS.length];
                    const isSelected = selectedBlockIndex === entry.blockIndex;

                    return (
                      <button
                        key={`anim-bar-${entry.blockIndex}`}
                        type="button"
                        onClick={() => {
                          if (!movedDuringDragRef.current) {
                            onSelectBlock(entry.blockIndex);
                          }
                        }}
                        onMouseDown={(e) => startDrag(e, entry.blockIndex, entry.animation, "move")}
                        className={cn(
                          "absolute flex h-5 items-center rounded border border-black/10 px-1 text-[10px] font-medium text-white shadow-sm",
                          colorClass,
                          isSelected && "ring-2 ring-offset-1 ring-brand",
                        )}
                        style={{
                          left: `${left}px`,
                          top: `${top}px`,
                          width: `${width}px`,
                        }}
                        data-testid={`animation-timeline-bar-${entry.blockIndex}`}
                        aria-label={`Animation block ${entry.blockIndex + 1}`}
                      >
                        <span className="truncate">#{entry.blockIndex + 1}</span>

                        <span
                          className="absolute left-0 top-0 h-full w-1.5 cursor-ew-resize rounded-l bg-black/20"
                          onMouseDown={(e) => startDrag(e, entry.blockIndex, entry.animation, "resize-start")}
                        />
                        <span
                          className="absolute right-0 top-0 h-full w-1.5 cursor-ew-resize rounded-r bg-black/20"
                          onMouseDown={(e) => startDrag(e, entry.blockIndex, entry.animation, "resize-end")}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export function estimateTimelineTotalSeconds(blocks: ContentBlock[]): number {
  const entries = getAnimatedBlockEntries(blocks);
  if (entries.length === 0) return 0;
  return Math.max(...entries.map((entry) => getAnimationRunTimeSeconds(entry.animation)));
}
