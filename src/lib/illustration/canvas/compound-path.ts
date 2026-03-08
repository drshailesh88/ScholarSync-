import { Canvas as FabricCanvas, FabricObject, Path as FabricPath } from 'fabric';

const COMPOUND_PATH_KEY = '__scholarSyncCompoundPath';
const COMPOUND_PATH_SOURCES_KEY = '__scholarSyncCompoundPathSources';

interface CompoundPathObject extends FabricPath {
  [COMPOUND_PATH_KEY]?: boolean;
  [COMPOUND_PATH_SOURCES_KEY]?: SerializedPathSource[];
}

interface SerializedPathSource {
  path: string;
  left: number;
  top: number;
  scaleX: number;
  scaleY: number;
  angle: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export interface CompoundPathOperationResult {
  success: boolean;
  compoundPath?: FabricPath;
  releasedPaths?: FabricObject[];
  reason?: string;
}

function getSelectedObjects(
  canvas: FabricCanvas,
  selectedObjects?: FabricObject[]
): FabricObject[] {
  if (selectedObjects && selectedObjects.length > 0) {
    return [...selectedObjects];
  }
  return canvas.getActiveObjects() as FabricObject[];
}

function sortByZOrder(canvas: FabricCanvas, objects: FabricObject[]): FabricObject[] {
  const stack = canvas.getObjects();
  return [...objects].sort((a, b) => stack.indexOf(a) - stack.indexOf(b));
}

function resolveInsertIndex(canvas: FabricCanvas, objects: FabricObject[]): number {
  const stack = canvas.getObjects();
  const indices = objects
    .map((object) => stack.indexOf(object))
    .filter((index) => index >= 0);

  if (indices.length === 0) {
    return stack.length;
  }

  return Math.min(...indices);
}

function objectToPathData(object: FabricObject): string | null {
  if (object instanceof FabricPath) {
    return (object as FabricPath & { toSVG: () => string }).toSVG();
  }
  const svg = object.toSVG();
  const dMatch = svg.match(/\bd="([^"]+)"/);
  return dMatch ? dMatch[1] : null;
}

function serializePathSource(object: FabricObject): SerializedPathSource {
  return {
    path: objectToPathData(object) ?? '',
    left: object.left ?? 0,
    top: object.top ?? 0,
    scaleX: object.scaleX ?? 1,
    scaleY: object.scaleY ?? 1,
    angle: object.angle ?? 0,
    fill: typeof object.fill === 'string' ? object.fill : '#000000',
    stroke: typeof object.stroke === 'string' ? object.stroke : '',
    strokeWidth: object.strokeWidth ?? 1,
  };
}

function collectPathSegments(objects: FabricObject[]): string {
  const segments: string[] = [];

  for (const object of objects) {
    if (object instanceof FabricPath && object.path) {
      const pathCommands = object.path
        .map((cmd: (string | number)[]) => cmd.join(' '))
        .join(' ');
      segments.push(pathCommands);
    } else {
      const svg = object.toSVG();
      const dMatch = svg.match(/\bd="([^"]+)"/);
      if (dMatch) {
        segments.push(dMatch[1]);
      }
    }
  }

  return segments.join(' ');
}

export function isCompoundPath(object: FabricObject | null | undefined): object is FabricPath {
  if (!object) {
    return false;
  }

  const compound = object as CompoundPathObject;
  return compound[COMPOUND_PATH_KEY] === true;
}

export function makeCompoundPath(
  canvas: FabricCanvas,
  selectedObjects?: FabricObject[]
): CompoundPathOperationResult {
  const selection = sortByZOrder(canvas, getSelectedObjects(canvas, selectedObjects));
  if (selection.length < 2) {
    return { success: false, reason: 'Select at least 2 paths to create a compound path' };
  }

  const insertionIndex = resolveInsertIndex(canvas, selection);
  const sources = selection.map(serializePathSource);
  const combinedD = collectPathSegments(selection);

  if (!combinedD) {
    return { success: false, reason: 'Could not extract path data from selected objects' };
  }

  const firstObject = selection[0];
  const compoundPath = new FabricPath(combinedD, {
    left: firstObject.left ?? 0,
    top: firstObject.top ?? 0,
    fill: typeof firstObject.fill === 'string' ? firstObject.fill : '#000000',
    stroke: typeof firstObject.stroke === 'string' ? firstObject.stroke : '',
    strokeWidth: firstObject.strokeWidth ?? 1,
    fillRule: 'evenodd',
  });

  const compoundPathWithMeta = compoundPath as CompoundPathObject;
  compoundPathWithMeta[COMPOUND_PATH_KEY] = true;
  compoundPathWithMeta[COMPOUND_PATH_SOURCES_KEY] = sources;

  canvas.discardActiveObject();
  selection.forEach((object) => canvas.remove(object));

  canvas.insertAt(insertionIndex, compoundPath);
  canvas.setActiveObject(compoundPath);
  canvas.requestRenderAll();

  return {
    success: true,
    compoundPath,
  };
}

export function releaseCompoundPath(
  canvas: FabricCanvas,
  targetObject?: FabricObject | null
): CompoundPathOperationResult {
  const selectedObject = targetObject ?? ((canvas.getActiveObjects()[0] as FabricObject | undefined) ?? null);
  if (!selectedObject) {
    return { success: false, reason: 'Select a compound path to release' };
  }

  if (!isCompoundPath(selectedObject)) {
    return { success: false, reason: 'Selected object is not a compound path' };
  }

  const compound = selectedObject as CompoundPathObject;
  const sources = compound[COMPOUND_PATH_SOURCES_KEY];

  if (!sources || sources.length === 0) {
    return { success: false, reason: 'Compound path has no source path data' };
  }

  const stack = canvas.getObjects();
  const objectIndex = stack.indexOf(selectedObject);
  const insertionIndex = objectIndex >= 0 ? objectIndex : stack.length;

  canvas.discardActiveObject();
  canvas.remove(selectedObject);

  const releasedPaths: FabricObject[] = [];

  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    const path = new FabricPath(source.path || 'M 0 0', {
      left: source.left,
      top: source.top,
      scaleX: source.scaleX,
      scaleY: source.scaleY,
      angle: source.angle,
      fill: source.fill,
      stroke: source.stroke,
      strokeWidth: source.strokeWidth,
    });
    path.setCoords();
    canvas.insertAt(insertionIndex + i, path);
    releasedPaths.push(path);
  }

  if (releasedPaths.length > 0) {
    canvas.setActiveObject(releasedPaths[0]);
  }

  canvas.requestRenderAll();

  return {
    success: true,
    releasedPaths,
  };
}
