import type { TSimplePathData } from 'fabric';

export interface PathPoint {
  x: number;
  y: number;
}

export interface EditableAnchor {
  index: number;
  x: number;
  y: number;
  handleIn: PathPoint | null;
  handleOut: PathPoint | null;
  smooth: boolean;
}

export interface ParsedPathAnchors {
  anchors: EditableAnchor[];
  closed: boolean;
}

export interface SegmentHit {
  segmentIndex: number;
  startAnchorIndex: number;
  endAnchorIndex: number;
  t: number;
  distance: number;
  point: PathPoint;
  kind: 'line' | 'cubic';
}

export type BezierHandle = 'in' | 'out';

const DEFAULT_HANDLE_LENGTH = 24;
const SMOOTH_EPSILON = 1e-6;

type Command = TSimplePathData[number];

interface Segment {
  segmentIndex: number;
  startAnchorIndex: number;
  endAnchorIndex: number;
  start: PathPoint;
  c1: PathPoint;
  c2: PathPoint;
  end: PathPoint;
  kind: 'line' | 'cubic';
}

function clonePathData(pathData: TSimplePathData): TSimplePathData {
  return pathData.map((command) => [...command]) as TSimplePathData;
}

function toPoint(x: number, y: number): PathPoint {
  return { x, y };
}

function add(a: PathPoint, b: PathPoint): PathPoint {
  return { x: a.x + b.x, y: a.y + b.y };
}

function subtract(a: PathPoint, b: PathPoint): PathPoint {
  return { x: a.x - b.x, y: a.y - b.y };
}

function scale(point: PathPoint, value: number): PathPoint {
  return { x: point.x * value, y: point.y * value };
}

function lerp(a: PathPoint, b: PathPoint, t: number): PathPoint {
  const clamped = clamp01(t);
  return {
    x: a.x + (b.x - a.x) * clamped,
    y: a.y + (b.y - a.y) * clamped,
  };
}

function distance(a: PathPoint, b: PathPoint): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function mirrorAroundAnchor(anchor: PathPoint, handle: PathPoint): PathPoint {
  return {
    x: 2 * anchor.x - handle.x,
    y: 2 * anchor.y - handle.y,
  };
}

function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

function isHandleMirrored(anchor: PathPoint, handleIn: PathPoint, handleOut: PathPoint): boolean {
  const vxIn = handleIn.x - anchor.x;
  const vyIn = handleIn.y - anchor.y;
  const vxOut = handleOut.x - anchor.x;
  const vyOut = handleOut.y - anchor.y;

  return Math.abs(vxIn + vxOut) <= SMOOTH_EPSILON && Math.abs(vyIn + vyOut) <= SMOOTH_EPSILON;
}

function ensureAnchorIndex(anchors: EditableAnchor[], index: number): EditableAnchor | null {
  if (!Number.isInteger(index) || index < 0 || index >= anchors.length) {
    return null;
  }
  return anchors[index];
}

function normalizeAnchorIndexes(indexes: number[]): number[] {
  return [...new Set(indexes.filter((index) => Number.isInteger(index) && index >= 0))].sort((a, b) => a - b);
}

function anchorPoint(anchor: EditableAnchor): PathPoint {
  return toPoint(anchor.x, anchor.y);
}

function buildSegments(parsed: ParsedPathAnchors): Segment[] {
  const segments: Segment[] = [];
  const { anchors, closed } = parsed;

  if (anchors.length < 2) {
    return segments;
  }

  let segmentIndex = 0;

  for (let index = 0; index < anchors.length - 1; index += 1) {
    const startAnchor = anchors[index];
    const endAnchor = anchors[index + 1];
    const start = anchorPoint(startAnchor);
    const end = anchorPoint(endAnchor);
    const c1 = startAnchor.handleOut ?? start;
    const c2 = endAnchor.handleIn ?? end;
    const kind: Segment['kind'] = startAnchor.handleOut || endAnchor.handleIn ? 'cubic' : 'line';

    segments.push({
      segmentIndex,
      startAnchorIndex: index,
      endAnchorIndex: index + 1,
      start,
      c1,
      c2,
      end,
      kind,
    });

    segmentIndex += 1;
  }

  if (closed) {
    const startAnchor = anchors[anchors.length - 1];
    const endAnchor = anchors[0];
    const start = anchorPoint(startAnchor);
    const end = anchorPoint(endAnchor);
    const c1 = startAnchor.handleOut ?? start;
    const c2 = endAnchor.handleIn ?? end;
    const kind: Segment['kind'] = startAnchor.handleOut || endAnchor.handleIn ? 'cubic' : 'line';

    segments.push({
      segmentIndex,
      startAnchorIndex: anchors.length - 1,
      endAnchorIndex: 0,
      start,
      c1,
      c2,
      end,
      kind,
    });
  }

  return segments;
}

function projectPointToLine(point: PathPoint, start: PathPoint, end: PathPoint): { t: number; point: PathPoint; distance: number } {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lengthSquared = dx * dx + dy * dy;

  if (lengthSquared <= SMOOTH_EPSILON) {
    return {
      t: 0,
      point: start,
      distance: distance(point, start),
    };
  }

  const t = clamp01(((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSquared);
  const projection = {
    x: start.x + dx * t,
    y: start.y + dy * t,
  };

  return {
    t,
    point: projection,
    distance: distance(point, projection),
  };
}

function cubicPointAt(segment: Segment, t: number): PathPoint {
  const clamped = clamp01(t);
  const mt = 1 - clamped;
  const mt2 = mt * mt;
  const t2 = clamped * clamped;

  return {
    x:
      mt2 * mt * segment.start.x +
      3 * mt2 * clamped * segment.c1.x +
      3 * mt * t2 * segment.c2.x +
      t2 * clamped * segment.end.x,
    y:
      mt2 * mt * segment.start.y +
      3 * mt2 * clamped * segment.c1.y +
      3 * mt * t2 * segment.c2.y +
      t2 * clamped * segment.end.y,
  };
}

function nearestPointOnCubic(point: PathPoint, segment: Segment): { t: number; point: PathPoint; distance: number } {
  const sampleCount = 40;
  let bestT = 0;
  let bestPoint = segment.start;
  let bestDistance = distance(point, segment.start);

  for (let sample = 1; sample <= sampleCount; sample += 1) {
    const t = sample / sampleCount;
    const samplePoint = cubicPointAt(segment, t);
    const sampleDistance = distance(point, samplePoint);

    if (sampleDistance < bestDistance) {
      bestDistance = sampleDistance;
      bestT = t;
      bestPoint = samplePoint;
    }
  }

  let left = Math.max(0, bestT - 1 / sampleCount);
  let right = Math.min(1, bestT + 1 / sampleCount);

  for (let iteration = 0; iteration < 10; iteration += 1) {
    const m1 = left + (right - left) / 3;
    const m2 = right - (right - left) / 3;
    const p1 = cubicPointAt(segment, m1);
    const p2 = cubicPointAt(segment, m2);
    const d1 = distance(point, p1);
    const d2 = distance(point, p2);

    if (d1 <= d2) {
      right = m2;
      if (d1 < bestDistance) {
        bestDistance = d1;
        bestT = m1;
        bestPoint = p1;
      }
    } else {
      left = m1;
      if (d2 < bestDistance) {
        bestDistance = d2;
        bestT = m2;
        bestPoint = p2;
      }
    }
  }

  return {
    t: clamp01(bestT),
    point: bestPoint,
    distance: bestDistance,
  };
}

function splitCubicSegment(segment: Segment, t: number): {
  point: PathPoint;
  startHandleOut: PathPoint;
  newHandleIn: PathPoint;
  newHandleOut: PathPoint;
  endHandleIn: PathPoint;
} {
  const clamped = clamp01(t);
  const p0 = segment.start;
  const p1 = segment.c1;
  const p2 = segment.c2;
  const p3 = segment.end;

  const a = lerp(p0, p1, clamped);
  const b = lerp(p1, p2, clamped);
  const c = lerp(p2, p3, clamped);

  const d = lerp(a, b, clamped);
  const e = lerp(b, c, clamped);

  const point = lerp(d, e, clamped);

  return {
    point,
    startHandleOut: a,
    newHandleIn: d,
    newHandleOut: e,
    endHandleIn: c,
  };
}

export function parsePathAnchors(pathData: TSimplePathData): ParsedPathAnchors {
  const anchors: EditableAnchor[] = [];
  let closed = false;

  for (const rawCommand of pathData) {
    const command = String(rawCommand[0]).toUpperCase();

    if (command === 'M') {
      if (anchors.length > 0) {
        // Current direct-select implementation edits the first subpath.
        break;
      }

      anchors.push({
        index: 0,
        x: Number(rawCommand[1]),
        y: Number(rawCommand[2]),
        handleIn: null,
        handleOut: null,
        smooth: false,
      });
      continue;
    }

    if (anchors.length === 0) {
      continue;
    }

    const previous = anchors[anchors.length - 1];

    if (command === 'L') {
      anchors.push({
        index: anchors.length,
        x: Number(rawCommand[1]),
        y: Number(rawCommand[2]),
        handleIn: null,
        handleOut: null,
        smooth: false,
      });
      continue;
    }

    if (command === 'C') {
      const c1 = toPoint(Number(rawCommand[1]), Number(rawCommand[2]));
      const c2 = toPoint(Number(rawCommand[3]), Number(rawCommand[4]));
      previous.handleOut = c1;

      anchors.push({
        index: anchors.length,
        x: Number(rawCommand[5]),
        y: Number(rawCommand[6]),
        handleIn: c2,
        handleOut: null,
        smooth: false,
      });
      continue;
    }

    if (command === 'Q') {
      const anchor = toPoint(previous.x, previous.y);
      const control = toPoint(Number(rawCommand[1]), Number(rawCommand[2]));
      const end = toPoint(Number(rawCommand[3]), Number(rawCommand[4]));

      // Convert quadratic control to equivalent cubic controls.
      const c1 = add(anchor, scale(subtract(control, anchor), 2 / 3));
      const c2 = add(end, scale(subtract(control, end), 2 / 3));

      previous.handleOut = c1;

      anchors.push({
        index: anchors.length,
        x: end.x,
        y: end.y,
        handleIn: c2,
        handleOut: null,
        smooth: false,
      });
      continue;
    }

    if (command === 'Z') {
      closed = true;
    }
  }

  anchors.forEach((anchor, index) => {
    anchor.index = index;
    anchor.smooth = Boolean(anchor.handleIn && anchor.handleOut && isHandleMirrored(anchor, anchor.handleIn, anchor.handleOut));
  });

  return { anchors, closed };
}

export function serializePathAnchors(parsed: ParsedPathAnchors): TSimplePathData {
  const { anchors } = parsed;

  if (anchors.length === 0) {
    return [] as TSimplePathData;
  }

  const commands: Command[] = [['M', anchors[0].x, anchors[0].y]];

  for (let index = 1; index < anchors.length; index += 1) {
    const previous = anchors[index - 1];
    const current = anchors[index];

    if (previous.handleOut || current.handleIn) {
      const c1 = previous.handleOut ?? toPoint(previous.x, previous.y);
      const c2 = current.handleIn ?? toPoint(current.x, current.y);
      commands.push(['C', c1.x, c1.y, c2.x, c2.y, current.x, current.y]);
    } else {
      commands.push(['L', current.x, current.y]);
    }
  }

  if (parsed.closed && anchors.length > 2) {
    const last = anchors[anchors.length - 1];
    const first = anchors[0];

    if (last.handleOut || first.handleIn) {
      const c1 = last.handleOut ?? toPoint(last.x, last.y);
      const c2 = first.handleIn ?? toPoint(first.x, first.y);
      commands.push(['C', c1.x, c1.y, c2.x, c2.y, first.x, first.y]);
    }

    commands.push(['Z']);
  }

  return commands as TSimplePathData;
}

export function moveAnchorPoint(pathData: TSimplePathData, anchorIndex: number, point: PathPoint): TSimplePathData {
  const parsed = parsePathAnchors(pathData);
  const anchor = ensureAnchorIndex(parsed.anchors, anchorIndex);

  if (!anchor) {
    return clonePathData(pathData);
  }

  const delta = subtract(point, anchorPoint(anchor));

  anchor.x = point.x;
  anchor.y = point.y;

  if (anchor.handleIn) {
    anchor.handleIn = add(anchor.handleIn, delta);
  }

  if (anchor.handleOut) {
    anchor.handleOut = add(anchor.handleOut, delta);
  }

  return serializePathAnchors(parsed);
}

export function translateAnchorPoints(pathData: TSimplePathData, anchorIndexes: number[], delta: PathPoint): TSimplePathData {
  const parsed = parsePathAnchors(pathData);
  const indexes = normalizeAnchorIndexes(anchorIndexes);

  if (indexes.length === 0 || (Math.abs(delta.x) <= SMOOTH_EPSILON && Math.abs(delta.y) <= SMOOTH_EPSILON)) {
    return clonePathData(pathData);
  }

  for (const index of indexes) {
    const anchor = ensureAnchorIndex(parsed.anchors, index);
    if (!anchor) {
      continue;
    }

    anchor.x += delta.x;
    anchor.y += delta.y;

    if (anchor.handleIn) {
      anchor.handleIn = add(anchor.handleIn, delta);
    }

    if (anchor.handleOut) {
      anchor.handleOut = add(anchor.handleOut, delta);
    }
  }

  return serializePathAnchors(parsed);
}

export interface MoveBezierHandleOptions {
  mirrorOpposite?: boolean;
  breakMirror?: boolean;
}

export function moveBezierHandle(
  pathData: TSimplePathData,
  anchorIndex: number,
  handle: BezierHandle,
  point: PathPoint,
  options: MoveBezierHandleOptions = {}
): TSimplePathData {
  const parsed = parsePathAnchors(pathData);
  const anchor = ensureAnchorIndex(parsed.anchors, anchorIndex);

  if (!anchor) {
    return clonePathData(pathData);
  }

  const mirrorOpposite = options.mirrorOpposite ?? !options.breakMirror;

  if (handle === 'in') {
    anchor.handleIn = { ...point };

    if (mirrorOpposite) {
      anchor.handleOut = mirrorAroundAnchor(anchor, point);
    }
  } else {
    anchor.handleOut = { ...point };

    if (mirrorOpposite) {
      anchor.handleIn = mirrorAroundAnchor(anchor, point);
    }
  }

  return serializePathAnchors(parsed);
}

export function toggleAnchorSmooth(pathData: TSimplePathData, anchorIndex: number, enableSmooth: boolean): TSimplePathData {
  const parsed = parsePathAnchors(pathData);
  const anchor = ensureAnchorIndex(parsed.anchors, anchorIndex);

  if (!anchor || !enableSmooth) {
    return clonePathData(pathData);
  }

  if (!anchor.handleIn && !anchor.handleOut) {
    anchor.handleOut = {
      x: anchor.x + DEFAULT_HANDLE_LENGTH,
      y: anchor.y,
    };
    anchor.handleIn = {
      x: anchor.x - DEFAULT_HANDLE_LENGTH,
      y: anchor.y,
    };
  } else if (anchor.handleOut && !anchor.handleIn) {
    anchor.handleIn = mirrorAroundAnchor(anchor, anchor.handleOut);
  } else if (anchor.handleIn && !anchor.handleOut) {
    anchor.handleOut = mirrorAroundAnchor(anchor, anchor.handleIn);
  } else if (anchor.handleOut) {
    anchor.handleIn = mirrorAroundAnchor(anchor, anchor.handleOut);
  }

  return serializePathAnchors(parsed);
}

export function deleteAnchorPoints(pathData: TSimplePathData, anchorIndexes: number[]): TSimplePathData {
  const parsed = parsePathAnchors(pathData);
  const indexes = normalizeAnchorIndexes(anchorIndexes);

  if (indexes.length === 0) {
    return clonePathData(pathData);
  }

  const toDelete = new Set(indexes);
  const remaining = parsed.anchors.filter((anchor) => !toDelete.has(anchor.index));

  if (remaining.length < 2) {
    return clonePathData(pathData);
  }

  const next: ParsedPathAnchors = {
    anchors: remaining.map((anchor, index) => ({
      ...anchor,
      index,
      handleIn: anchor.handleIn ? { ...anchor.handleIn } : null,
      handleOut: anchor.handleOut ? { ...anchor.handleOut } : null,
    })),
    closed: parsed.closed && remaining.length > 2,
  };

  return serializePathAnchors(next);
}

export function addAnchorPointOnSegment(
  pathData: TSimplePathData,
  segmentIndex: number,
  t: number
): { pathData: TSimplePathData; anchorIndex: number } {
  const parsed = parsePathAnchors(pathData);
  const segments = buildSegments(parsed);
  const segment = segments.find((candidate) => candidate.segmentIndex === segmentIndex);

  if (!segment) {
    return {
      pathData: clonePathData(pathData),
      anchorIndex: -1,
    };
  }

  const startAnchor = parsed.anchors[segment.startAnchorIndex];
  const endAnchor = parsed.anchors[segment.endAnchorIndex];
  const insertionIndex = segment.endAnchorIndex === 0 && parsed.closed
    ? parsed.anchors.length
    : segment.endAnchorIndex;

  let newAnchor: EditableAnchor;

  if (segment.kind === 'line') {
    const point = lerp(segment.start, segment.end, t);
    newAnchor = {
      index: insertionIndex,
      x: point.x,
      y: point.y,
      handleIn: null,
      handleOut: null,
      smooth: false,
    };
  } else {
    const split = splitCubicSegment(segment, t);

    startAnchor.handleOut = split.startHandleOut;
    endAnchor.handleIn = split.endHandleIn;

    newAnchor = {
      index: insertionIndex,
      x: split.point.x,
      y: split.point.y,
      handleIn: split.newHandleIn,
      handleOut: split.newHandleOut,
      smooth: true,
    };
  }

  parsed.anchors.splice(insertionIndex, 0, newAnchor);
  parsed.anchors.forEach((anchor, index) => {
    anchor.index = index;
  });

  return {
    pathData: serializePathAnchors(parsed),
    anchorIndex: insertionIndex,
  };
}

export function findNearestPathSegment(pathData: TSimplePathData, point: PathPoint): SegmentHit | null {
  const parsed = parsePathAnchors(pathData);
  const segments = buildSegments(parsed);

  if (segments.length === 0) {
    return null;
  }

  let bestHit: SegmentHit | null = null;

  for (const segment of segments) {
    const nearest = segment.kind === 'line'
      ? projectPointToLine(point, segment.start, segment.end)
      : nearestPointOnCubic(point, segment);

    if (!bestHit || nearest.distance < bestHit.distance) {
      bestHit = {
        segmentIndex: segment.segmentIndex,
        startAnchorIndex: segment.startAnchorIndex,
        endAnchorIndex: segment.endAnchorIndex,
        t: nearest.t,
        distance: nearest.distance,
        point: nearest.point,
        kind: segment.kind,
      };
    }
  }

  return bestHit;
}
