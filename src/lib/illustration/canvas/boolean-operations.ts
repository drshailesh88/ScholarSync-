import { Canvas as FabricCanvas, FabricObject, Path as FabricPath } from 'fabric';
import paper from 'paper';
import {
  initializePaperScope,
  intersectPaths,
  subtractPaths,
  unitePaths,
} from '@/lib/illustration/lib/paper';
import {
  extractFabricPathStyle,
  fabricToSvgPath,
  paperToFabricPath,
} from './pathfinder-bridge';

export type PathfinderOperation = 'unite' | 'subtract' | 'intersect' | 'exclude';

const EMPTY_RESULT_MESSAGE = 'Operation produced no result';
const MIN_SELECTION_COUNT = 2;
const EPSILON = 1e-3;

let pathfinderScope: paper.PaperScope | null = null;

interface MockCanvasContext {
  canvas: unknown;
  save: () => void;
  restore: () => void;
  beginPath: () => void;
  closePath: () => void;
  moveTo: (x: number, y: number) => void;
  lineTo: (x: number, y: number) => void;
  bezierCurveTo: (
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    x: number,
    y: number
  ) => void;
  quadraticCurveTo: (cpx: number, cpy: number, x: number, y: number) => void;
  arc: (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    counterclockwise?: boolean
  ) => void;
  rect: (x: number, y: number, width: number, height: number) => void;
  clearRect: (x: number, y: number, width: number, height: number) => void;
  fill: () => void;
  stroke: () => void;
  clip: () => void;
  translate: (x: number, y: number) => void;
  rotate: (angle: number) => void;
  scale: (x: number, y: number) => void;
  transform: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ) => void;
  setTransform: (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ) => void;
  drawImage: (...args: unknown[]) => void;
  fillText: (text: string, x: number, y: number) => void;
  strokeText: (text: string, x: number, y: number) => void;
  measureText: (text: string) => { width: number };
  createLinearGradient: (...args: number[]) => { addColorStop: (offset: number, color: string) => void };
  createRadialGradient: (...args: number[]) => { addColorStop: (offset: number, color: string) => void };
  createPattern: (...args: unknown[]) => object;
  setLineDash: (segments: number[]) => void;
  getLineDash: () => number[];
  lineWidth: number;
  lineCap: CanvasLineCap;
  lineJoin: CanvasLineJoin;
  miterLimit: number;
  globalAlpha: number;
  globalCompositeOperation: GlobalCompositeOperation;
  strokeStyle: string;
  fillStyle: string;
  font: string;
  textAlign: CanvasTextAlign;
  textBaseline: CanvasTextBaseline;
}

function createMockPaperCanvas(): HTMLCanvasElement {
  const context: MockCanvasContext = {
    canvas: null,
    save: () => {},
    restore: () => {},
    beginPath: () => {},
    closePath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    bezierCurveTo: () => {},
    quadraticCurveTo: () => {},
    arc: () => {},
    rect: () => {},
    clearRect: () => {},
    fill: () => {},
    stroke: () => {},
    clip: () => {},
    translate: () => {},
    rotate: () => {},
    scale: () => {},
    transform: () => {},
    setTransform: () => {},
    drawImage: () => {},
    fillText: () => {},
    strokeText: () => {},
    measureText: () => ({ width: 0 }),
    createLinearGradient: () => ({ addColorStop: () => {} }),
    createRadialGradient: () => ({ addColorStop: () => {} }),
    createPattern: () => ({}),
    setLineDash: () => {},
    getLineDash: () => [],
    lineWidth: 1,
    lineCap: 'butt',
    lineJoin: 'miter',
    miterLimit: 10,
    globalAlpha: 1,
    globalCompositeOperation: 'source-over',
    strokeStyle: '#000000',
    fillStyle: '#000000',
    font: '10px sans-serif',
    textAlign: 'left',
    textBaseline: 'alphabetic',
  };

  const canvas = {
    width: 1024,
    height: 1024,
    getContext: () => context,
  } as unknown as HTMLCanvasElement;

  context.canvas = canvas;
  return canvas;
}

function resolvePaperCanvas(): HTMLCanvasElement {
  if (typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    return canvas;
  }

  return createMockPaperCanvas();
}

export function initializePathfinderPaperScope(canvas?: HTMLCanvasElement): paper.PaperScope {
  if (canvas) {
    pathfinderScope = initializePaperScope(canvas);
    return pathfinderScope;
  }

  if (!pathfinderScope) {
    pathfinderScope = initializePaperScope(resolvePaperCanvas());
  }

  return pathfinderScope;
}

function ensurePathfinderScope(): paper.PaperScope {
  return initializePathfinderPaperScope();
}

function ensureMinimumSelection(objects: FabricObject[]): void {
  if (objects.length < MIN_SELECTION_COUNT) {
    throw new Error('Select at least 2 objects to run pathfinder operations');
  }
}

function sortObjectsByZOrder(objects: FabricObject[]): FabricObject[] {
  const canvas = objects.find((object) => object.canvas)?.canvas;
  if (!canvas) {
    return [...objects];
  }

  const stack = canvas.getObjects();
  return [...objects].sort((a, b) => stack.indexOf(a) - stack.indexOf(b));
}

function toPaperPathItem(scope: paper.PaperScope, object: FabricObject): paper.PathItem {
  const pathData = fabricToSvgPath(object);
  const compoundPath = new scope.CompoundPath(pathData);
  return compoundPath;
}

function reducePathItems(
  items: paper.PathItem[],
  operation: (current: paper.PathItem, next: paper.PathItem) => paper.PathItem | null
): paper.PathItem | null {
  if (items.length === 0) {
    return null;
  }

  let current: paper.PathItem | null = items[0];

  for (let index = 1; index < items.length; index += 1) {
    if (!current) {
      return null;
    }

    current = operation(current, items[index]);
  }

  return current;
}

function hasEmptyBooleanResult(result: paper.PathItem | null): boolean {
  if (!result) {
    return true;
  }

  const pathData = result.pathData?.trim() ?? '';
  if (pathData.length === 0) {
    return true;
  }

  const area = Math.abs((result as paper.PathItem & { area?: number }).area ?? 0);
  const boundsArea = Math.abs(result.bounds.width * result.bounds.height);
  return area < EPSILON && boundsArea < EPSILON;
}

function withScope<T>(task: (scope: paper.PaperScope) => T): T {
  const scope = ensurePathfinderScope();

  try {
    return task(scope);
  } finally {
    scope.project.activeLayer.removeChildren();
  }
}

function buildResultPath(
  objects: FabricObject[],
  operation: PathfinderOperation
): FabricPath {
  ensureMinimumSelection(objects);

  const ordered = operation === 'subtract' ? sortObjectsByZOrder(objects) : [...objects];
  const styleSource = ordered[0];

  return withScope((scope) => {
    let result: paper.PathItem | null = null;

    if (operation === 'unite') {
      const items = ordered.map((object) => toPaperPathItem(scope, object));
      result = reducePathItems(items, unitePaths);
    }

    if (operation === 'subtract') {
      const items = ordered.map((object) => toPaperPathItem(scope, object));
      const base = items[0];
      const subtractors = items.slice(1);
      result = reducePathItems([base, ...subtractors], subtractPaths);
    }

    if (operation === 'intersect') {
      const items = ordered.map((object) => toPaperPathItem(scope, object));
      result = reducePathItems(items, intersectPaths);
    }

    if (operation === 'exclude') {
      const unionItems = ordered.map((object) => toPaperPathItem(scope, object));
      const intersectItems = ordered.map((object) => toPaperPathItem(scope, object));
      const unionResult = reducePathItems(unionItems, unitePaths);
      const intersectionResult = reducePathItems(intersectItems, intersectPaths);

      if (!unionResult) {
        result = null;
      } else if (hasEmptyBooleanResult(intersectionResult)) {
        result = unionResult;
      } else {
        result = subtractPaths(unionResult, intersectionResult!);
      }
    }

    if (hasEmptyBooleanResult(result)) {
      throw new Error(EMPTY_RESULT_MESSAGE);
    }

    return paperToFabricPath(result!, extractFabricPathStyle(styleSource));
  });
}

export function booleanUnite(objects: FabricObject[]): FabricPath {
  return buildResultPath(objects, 'unite');
}

export function booleanSubtract(objects: FabricObject[]): FabricPath {
  return buildResultPath(objects, 'subtract');
}

export function booleanIntersect(objects: FabricObject[]): FabricPath {
  return buildResultPath(objects, 'intersect');
}

export function booleanExclude(objects: FabricObject[]): FabricPath {
  return buildResultPath(objects, 'exclude');
}

export function applyBooleanOperationToCanvas(
  canvas: FabricCanvas,
  objects: FabricObject[],
  operation: PathfinderOperation
): FabricPath {
  ensureMinimumSelection(objects);

  const result =
    operation === 'unite'
      ? booleanUnite(objects)
      : operation === 'subtract'
      ? booleanSubtract(objects)
      : operation === 'intersect'
      ? booleanIntersect(objects)
      : booleanExclude(objects);

  canvas.discardActiveObject();
  objects.forEach((object) => canvas.remove(object));
  canvas.add(result);
  result.setCoords();
  canvas.setActiveObject(result);
  canvas.requestRenderAll();

  canvas.fire('selection:created', { selected: [result] });
  canvas.fire('object:modified', { target: result });

  return result;
}

export function isEmptyResultError(error: unknown): boolean {
  return error instanceof Error && error.message === EMPTY_RESULT_MESSAGE;
}
