import type { BlockPosition } from "@/types/presentation";

export interface AlignmentGuide {
  axis: "horizontal" | "vertical";
  position: number;
  type: "edge" | "center" | "canvas";
}

export interface SpacingGuide {
  axis: "horizontal" | "vertical";
  position: number;
  start: number;
  end: number;
  gap: number;
}

interface BlockMetrics {
  left: number;
  right: number;
  top: number;
  bottom: number;
  centerX: number;
  centerY: number;
}

const DEFAULT_SNAP_THRESHOLD = 1.5;

function round(value: number): number {
  return Number(value.toFixed(4));
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function toMetrics(position: BlockPosition): BlockMetrics {
  return {
    left: position.x,
    right: position.x + position.width,
    top: position.y,
    bottom: position.y + position.height,
    centerX: position.x + position.width / 2,
    centerY: position.y + position.height / 2,
  };
}

function dedupeGuides(guides: AlignmentGuide[]): AlignmentGuide[] {
  const map = new Map<string, AlignmentGuide>();
  for (const guide of guides) {
    const key = `${guide.axis}:${round(guide.position)}:${guide.type}`;
    if (!map.has(key)) {
      map.set(key, { ...guide, position: round(guide.position) });
    }
  }
  return [...map.values()];
}

function collectGuideCandidates(
  otherBlocks: BlockPosition[]
): { vertical: AlignmentGuide[]; horizontal: AlignmentGuide[] } {
  const vertical: AlignmentGuide[] = [
    { axis: "vertical", position: 0, type: "canvas" },
    { axis: "vertical", position: 50, type: "canvas" },
    { axis: "vertical", position: 100, type: "canvas" },
  ];
  const horizontal: AlignmentGuide[] = [
    { axis: "horizontal", position: 0, type: "canvas" },
    { axis: "horizontal", position: 50, type: "canvas" },
    { axis: "horizontal", position: 100, type: "canvas" },
  ];

  for (const block of otherBlocks) {
    const metrics = toMetrics(block);
    vertical.push(
      { axis: "vertical", position: metrics.left, type: "edge" },
      { axis: "vertical", position: metrics.right, type: "edge" },
      { axis: "vertical", position: metrics.centerX, type: "center" }
    );
    horizontal.push(
      { axis: "horizontal", position: metrics.top, type: "edge" },
      { axis: "horizontal", position: metrics.bottom, type: "edge" },
      { axis: "horizontal", position: metrics.centerY, type: "center" }
    );
  }

  return {
    vertical: dedupeGuides(vertical),
    horizontal: dedupeGuides(horizontal),
  };
}

interface SnapMatch {
  distance: number;
  delta: number;
  guide: AlignmentGuide;
}

function findNearestSnap(
  metricValues: number[],
  candidates: AlignmentGuide[],
  threshold: number
): SnapMatch | null {
  let best: SnapMatch | null = null;

  for (const metric of metricValues) {
    for (const candidate of candidates) {
      const distance = Math.abs(metric - candidate.position);
      if (distance > threshold) continue;
      const delta = candidate.position - metric;

      if (!best) {
        best = { distance, delta, guide: candidate };
        continue;
      }

      if (distance < best.distance) {
        best = { distance, delta, guide: candidate };
        continue;
      }

      if (
        distance === best.distance &&
        candidate.type === "canvas" &&
        best.guide.type !== "canvas"
      ) {
        best = { distance, delta, guide: candidate };
      }
    }
  }

  return best;
}

function collectActiveGuides(
  metricValues: number[],
  candidates: AlignmentGuide[],
  threshold: number
): AlignmentGuide[] {
  const active: AlignmentGuide[] = [];
  for (const candidate of candidates) {
    const isNear = metricValues.some((metric) => Math.abs(metric - candidate.position) <= threshold);
    if (isNear) active.push(candidate);
  }
  return active;
}

export function computeAlignmentGuides(
  movingBlock: BlockPosition,
  otherBlocks: BlockPosition[],
  _canvasWidth: number,
  _canvasHeight: number,
  snapThreshold: number = DEFAULT_SNAP_THRESHOLD
): { guides: AlignmentGuide[]; snappedPosition: BlockPosition } {
  const thresholdX = snapThreshold;
  const thresholdY = snapThreshold;

  const candidates = collectGuideCandidates(otherBlocks);
  const metrics = toMetrics(movingBlock);

  const verticalMetrics = [metrics.left, metrics.centerX, metrics.right];
  const horizontalMetrics = [metrics.top, metrics.centerY, metrics.bottom];

  const activeVertical = collectActiveGuides(verticalMetrics, candidates.vertical, thresholdX);
  const activeHorizontal = collectActiveGuides(horizontalMetrics, candidates.horizontal, thresholdY);

  const snapX = findNearestSnap(verticalMetrics, candidates.vertical, thresholdX);
  const snapY = findNearestSnap(horizontalMetrics, candidates.horizontal, thresholdY);

  let nextX = movingBlock.x;
  let nextY = movingBlock.y;

  if (snapX) {
    nextX += snapX.delta;
  }

  if (snapY) {
    nextY += snapY.delta;
  }

  const clampedPosition: BlockPosition = {
    x: round(clamp(nextX, 0, 100 - movingBlock.width)),
    y: round(clamp(nextY, 0, 100 - movingBlock.height)),
    width: round(movingBlock.width),
    height: round(movingBlock.height),
  };

  const guides = dedupeGuides([
    ...activeVertical,
    ...activeHorizontal,
    ...(snapX ? [snapX.guide] : []),
    ...(snapY ? [snapY.guide] : []),
  ]);

  return {
    guides,
    snappedPosition: clampedPosition,
  };
}

function dedupeSpacingGuides(guides: SpacingGuide[]): SpacingGuide[] {
  const map = new Map<string, SpacingGuide>();
  for (const guide of guides) {
    const key = `${guide.axis}:${round(guide.position)}:${round(guide.start)}:${round(guide.end)}`;
    if (!map.has(key)) {
      map.set(key, {
        ...guide,
        position: round(guide.position),
        start: round(guide.start),
        end: round(guide.end),
        gap: round(guide.gap),
      });
    }
  }
  return [...map.values()];
}

function collectEqualSpacingForRows(
  blocks: BlockPosition[],
  threshold: number
): SpacingGuide[] {
  const rowTolerance = Math.max(1, threshold * 2);
  const guides: SpacingGuide[] = [];
  const metrics = blocks.map((block) => ({ metrics: toMetrics(block) }));

  const visited = new Set<string>();

  for (const pivot of metrics) {
    const row = metrics
      .filter((entry) => Math.abs(entry.metrics.centerY - pivot.metrics.centerY) <= rowTolerance)
      .sort((a, b) => a.metrics.left - b.metrics.left);

    if (row.length < 3) continue;

    const rowKey = row
      .map((entry) => `${round(entry.metrics.left)}:${round(entry.metrics.top)}`)
      .join("|");
    if (visited.has(rowKey)) continue;
    visited.add(rowKey);

    const gaps = row
      .slice(1)
      .map((entry, index) => entry.metrics.left - row[index].metrics.right);

    if (gaps.length < 2 || gaps.some((gap) => gap <= 0)) continue;

    const maxGap = Math.max(...gaps);
    const minGap = Math.min(...gaps);
    if (Math.abs(maxGap - minGap) > threshold) continue;

    const lineY = row.reduce((sum, entry) => sum + entry.metrics.centerY, 0) / row.length;

    for (let i = 0; i < row.length - 1; i += 1) {
      const start = row[i]?.metrics.right;
      const end = row[i + 1]?.metrics.left;
      if (start === undefined || end === undefined || end <= start) continue;

      guides.push({
        axis: "horizontal",
        position: lineY,
        start,
        end,
        gap: end - start,
      });
    }
  }

  return guides;
}

function collectEqualSpacingForColumns(
  blocks: BlockPosition[],
  threshold: number
): SpacingGuide[] {
  const columnTolerance = Math.max(1, threshold * 2);
  const guides: SpacingGuide[] = [];
  const metrics = blocks.map((block) => ({ metrics: toMetrics(block) }));

  const visited = new Set<string>();

  for (const pivot of metrics) {
    const column = metrics
      .filter((entry) => Math.abs(entry.metrics.centerX - pivot.metrics.centerX) <= columnTolerance)
      .sort((a, b) => a.metrics.top - b.metrics.top);

    if (column.length < 3) continue;

    const columnKey = column
      .map((entry) => `${round(entry.metrics.left)}:${round(entry.metrics.top)}`)
      .join("|");
    if (visited.has(columnKey)) continue;
    visited.add(columnKey);

    const gaps = column
      .slice(1)
      .map((entry, index) => entry.metrics.top - column[index].metrics.bottom);

    if (gaps.length < 2 || gaps.some((gap) => gap <= 0)) continue;

    const maxGap = Math.max(...gaps);
    const minGap = Math.min(...gaps);
    if (Math.abs(maxGap - minGap) > threshold) continue;

    const lineX = column.reduce((sum, entry) => sum + entry.metrics.centerX, 0) / column.length;

    for (let i = 0; i < column.length - 1; i += 1) {
      const start = column[i]?.metrics.bottom;
      const end = column[i + 1]?.metrics.top;
      if (start === undefined || end === undefined || end <= start) continue;

      guides.push({
        axis: "vertical",
        position: lineX,
        start,
        end,
        gap: end - start,
      });
    }
  }

  return guides;
}

export function computeEqualSpacingGuides(
  movingBlock: BlockPosition,
  otherBlocks: BlockPosition[],
  snapThreshold: number = DEFAULT_SNAP_THRESHOLD
): SpacingGuide[] {
  const blocks = [movingBlock, ...otherBlocks];
  if (blocks.length < 3) return [];

  const rowGuides = collectEqualSpacingForRows(blocks, snapThreshold);
  const columnGuides = collectEqualSpacingForColumns(blocks, snapThreshold);

  return dedupeSpacingGuides([...rowGuides, ...columnGuides]);
}
