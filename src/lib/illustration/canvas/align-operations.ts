import { FabricObject } from 'fabric';

export type AlignmentObjectId = string | number;

export interface AlignmentPosition {
  id: AlignmentObjectId;
  left: number;
  top: number;
}

interface RectLike {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface ObjectMetrics {
  id: AlignmentObjectId;
  left: number;
  top: number;
  bounds: RectLike;
  right: number;
  bottom: number;
  centerX: number;
  centerY: number;
}

interface IdentifiableObject {
  id?: unknown;
  get?: (key: string) => unknown;
}

function readObjectId(object: FabricObject, index: number): AlignmentObjectId {
  const identifiable = object as unknown as IdentifiableObject;
  const fromGetter = identifiable.get?.('id');
  if (typeof fromGetter === 'string' || typeof fromGetter === 'number') {
    return fromGetter;
  }

  if (typeof identifiable.id === 'string' || typeof identifiable.id === 'number') {
    return identifiable.id;
  }

  return `object-${index}`;
}

function getMetrics(object: FabricObject, index: number): ObjectMetrics {
  const bounds = object.getBoundingRect();
  const objectLeft = typeof object.left === 'number' ? object.left : bounds.left;
  const objectTop = typeof object.top === 'number' ? object.top : bounds.top;

  return {
    id: readObjectId(object, index),
    left: objectLeft,
    top: objectTop,
    bounds: {
      left: bounds.left,
      top: bounds.top,
      width: bounds.width,
      height: bounds.height,
    },
    right: bounds.left + bounds.width,
    bottom: bounds.top + bounds.height,
    centerX: bounds.left + bounds.width / 2,
    centerY: bounds.top + bounds.height / 2,
  };
}

function basePositions(objects: FabricObject[]): AlignmentPosition[] {
  return objects.map((object, index) => {
    const metrics = getMetrics(object, index);
    return {
      id: metrics.id,
      left: metrics.left,
      top: metrics.top,
    };
  });
}

export function alignLeft(objects: FabricObject[]): AlignmentPosition[] {
  if (objects.length < 2) return basePositions(objects);

  const metrics = objects.map(getMetrics);
  const targetLeft = Math.min(...metrics.map((item) => item.bounds.left));

  return metrics.map((item) => ({
    id: item.id,
    left: item.left + (targetLeft - item.bounds.left),
    top: item.top,
  }));
}

export function alignCenterH(objects: FabricObject[]): AlignmentPosition[] {
  if (objects.length < 2) return basePositions(objects);

  const metrics = objects.map(getMetrics);
  const targetCenter = metrics.reduce((sum, item) => sum + item.centerX, 0) / metrics.length;

  return metrics.map((item) => ({
    id: item.id,
    left: item.left + (targetCenter - item.centerX),
    top: item.top,
  }));
}

export function alignRight(objects: FabricObject[]): AlignmentPosition[] {
  if (objects.length < 2) return basePositions(objects);

  const metrics = objects.map(getMetrics);
  const targetRight = Math.max(...metrics.map((item) => item.right));

  return metrics.map((item) => ({
    id: item.id,
    left: item.left + (targetRight - item.right),
    top: item.top,
  }));
}

export function alignTop(objects: FabricObject[]): AlignmentPosition[] {
  if (objects.length < 2) return basePositions(objects);

  const metrics = objects.map(getMetrics);
  const targetTop = Math.min(...metrics.map((item) => item.bounds.top));

  return metrics.map((item) => ({
    id: item.id,
    left: item.left,
    top: item.top + (targetTop - item.bounds.top),
  }));
}

export function alignCenterV(objects: FabricObject[]): AlignmentPosition[] {
  if (objects.length < 2) return basePositions(objects);

  const metrics = objects.map(getMetrics);
  const targetCenter = metrics.reduce((sum, item) => sum + item.centerY, 0) / metrics.length;

  return metrics.map((item) => ({
    id: item.id,
    left: item.left,
    top: item.top + (targetCenter - item.centerY),
  }));
}

export function alignBottom(objects: FabricObject[]): AlignmentPosition[] {
  if (objects.length < 2) return basePositions(objects);

  const metrics = objects.map(getMetrics);
  const targetBottom = Math.max(...metrics.map((item) => item.bottom));

  return metrics.map((item) => ({
    id: item.id,
    left: item.left,
    top: item.top + (targetBottom - item.bottom),
  }));
}

export function distributeH(objects: FabricObject[]): AlignmentPosition[] {
  if (objects.length < 3) return basePositions(objects);

  const metrics = objects.map(getMetrics);
  const sorted = [...metrics].sort((a, b) => a.bounds.left - b.bounds.left);
  const totalWidth = sorted.reduce((sum, item) => sum + item.bounds.width, 0);
  const span = sorted[sorted.length - 1].right - sorted[0].bounds.left;
  const gap = (span - totalWidth) / (sorted.length - 1);

  const nextById = new Map<AlignmentObjectId, AlignmentPosition>();
  let cursor = sorted[0].bounds.left;

  sorted.forEach((item, index) => {
    if (index > 0) {
      const previous = sorted[index - 1];
      cursor += previous.bounds.width + gap;
    }

    nextById.set(item.id, {
      id: item.id,
      left: item.left + (cursor - item.bounds.left),
      top: item.top,
    });
  });

  return metrics.map((item) => nextById.get(item.id) ?? { id: item.id, left: item.left, top: item.top });
}

export function distributeV(objects: FabricObject[]): AlignmentPosition[] {
  if (objects.length < 3) return basePositions(objects);

  const metrics = objects.map(getMetrics);
  const sorted = [...metrics].sort((a, b) => a.bounds.top - b.bounds.top);
  const totalHeight = sorted.reduce((sum, item) => sum + item.bounds.height, 0);
  const span = sorted[sorted.length - 1].bottom - sorted[0].bounds.top;
  const gap = (span - totalHeight) / (sorted.length - 1);

  const nextById = new Map<AlignmentObjectId, AlignmentPosition>();
  let cursor = sorted[0].bounds.top;

  sorted.forEach((item, index) => {
    if (index > 0) {
      const previous = sorted[index - 1];
      cursor += previous.bounds.height + gap;
    }

    nextById.set(item.id, {
      id: item.id,
      left: item.left,
      top: item.top + (cursor - item.bounds.top),
    });
  });

  return metrics.map((item) => nextById.get(item.id) ?? { id: item.id, left: item.left, top: item.top });
}
