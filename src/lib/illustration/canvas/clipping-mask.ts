import { Canvas as FabricCanvas, FabricObject, Group, util } from 'fabric';

const CLIPPING_MASK_GROUP_KEY = '__scholarSyncClippingMaskGroup';
const CLIPPING_MASK_SOURCE_KEY = '__scholarSyncClippingMaskSource';
const PREVIOUS_CLIP_PATH_KEY = '__scholarSyncPreviousClipPath';

interface ClippingMaskGroup extends Group {
  [CLIPPING_MASK_GROUP_KEY]?: boolean;
  [CLIPPING_MASK_SOURCE_KEY]?: FabricObject | null;
}

interface ClippingMaskTarget extends FabricObject {
  [PREVIOUS_CLIP_PATH_KEY]?: FabricObject | null;
}

export interface ClippingMaskOperationResult {
  success: boolean;
  group?: Group;
  releasedObjects?: FabricObject[];
  clipShape?: FabricObject;
  reason?: string;
}

async function cloneFabricObject(object: FabricObject): Promise<FabricObject> {
  return object.clone() as Promise<FabricObject>;
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

async function createClipForTarget(
  clipSource: FabricObject,
  targetObject: FabricObject
): Promise<FabricObject> {
  const clipClone = await cloneFabricObject(clipSource);
  util.sendObjectToPlane(
    clipClone,
    clipSource.group?.calcTransformMatrix(),
    targetObject.calcTransformMatrix()
  );
  return clipClone;
}

async function cloneCurrentClipPath(object: FabricObject): Promise<FabricObject | null> {
  if (!object.clipPath) {
    return null;
  }
  return cloneFabricObject(object.clipPath as FabricObject);
}

export function isClippingMaskGroup(object: FabricObject | null | undefined): object is Group {
  if (!object || object.type !== 'group') {
    return false;
  }

  const clippingGroup = object as ClippingMaskGroup;
  if (clippingGroup[CLIPPING_MASK_GROUP_KEY] === true) {
    return true;
  }

  const groupObjects = (object as Group).getObjects();
  return groupObjects.length > 0 && groupObjects.every((item) => Boolean(item.clipPath));
}

export async function makeClippingMask(
  canvas: FabricCanvas,
  selectedObjects?: FabricObject[]
): Promise<ClippingMaskOperationResult> {
  const selection = sortByZOrder(canvas, getSelectedObjects(canvas, selectedObjects));
  if (selection.length < 2) {
    return { success: false, reason: 'Select at least 2 objects to create a clipping mask' };
  }

  const clipSource = selection[selection.length - 1];
  const clipTargets = selection.slice(0, -1);
  const clipSourceForRelease = await cloneFabricObject(clipSource);

  for (const targetObject of clipTargets) {
    const target = targetObject as ClippingMaskTarget;
    target[PREVIOUS_CLIP_PATH_KEY] = await cloneCurrentClipPath(targetObject);

    const clipClone = await createClipForTarget(clipSource, targetObject);
    if (targetObject.clipPath) {
      const existingClipPath = targetObject.clipPath as FabricObject;
      targetObject.set('clipPath', util.mergeClipPaths(existingClipPath, clipClone));
    } else {
      targetObject.set('clipPath', clipClone);
    }
    targetObject.setCoords();
  }

  const insertionIndex = resolveInsertIndex(canvas, clipTargets);

  canvas.discardActiveObject();
  canvas.remove(clipSource);
  clipTargets.forEach((object) => canvas.remove(object));

  const clippingGroup = new Group(clipTargets);
  const clippingGroupWithMeta = clippingGroup as ClippingMaskGroup;
  clippingGroupWithMeta[CLIPPING_MASK_GROUP_KEY] = true;
  clippingGroupWithMeta[CLIPPING_MASK_SOURCE_KEY] = clipSourceForRelease;

  canvas.insertAt(insertionIndex, clippingGroup);
  canvas.setActiveObject(clippingGroup);
  canvas.requestRenderAll();

  return {
    success: true,
    group: clippingGroup,
  };
}

async function resolveClipShapeForRelease(group: Group): Promise<FabricObject | null> {
  const clippingGroup = group as ClippingMaskGroup;
  if (clippingGroup[CLIPPING_MASK_SOURCE_KEY]) {
    return cloneFabricObject(clippingGroup[CLIPPING_MASK_SOURCE_KEY] as FabricObject);
  }

  const clippedObject = group.getObjects().find((object) => Boolean(object.clipPath));
  if (!clippedObject || !clippedObject.clipPath) {
    return null;
  }

  const clipShape = await cloneFabricObject(clippedObject.clipPath as FabricObject);
  util.sendObjectToPlane(clipShape, clippedObject.calcTransformMatrix(), undefined);
  return clipShape;
}

export async function releaseClippingMask(
  canvas: FabricCanvas,
  targetObject?: FabricObject | null
): Promise<ClippingMaskOperationResult> {
  const selectedObject = targetObject ?? ((canvas.getActiveObjects()[0] as FabricObject | undefined) ?? null);
  if (!selectedObject || selectedObject.type !== 'group') {
    return { success: false, reason: 'Select a clipped group to release clipping mask' };
  }

  if (!isClippingMaskGroup(selectedObject)) {
    return { success: false, reason: 'Selected group is not a clipping mask' };
  }

  const clippingGroup = selectedObject as Group;
  const clippingObjects = clippingGroup.getObjects();
  if (clippingObjects.length === 0) {
    return { success: false, reason: 'Clipping group has no objects' };
  }

  const clipShape = await resolveClipShapeForRelease(clippingGroup);
  const stack = canvas.getObjects();
  const groupIndex = stack.indexOf(clippingGroup);
  const insertionIndex = groupIndex >= 0 ? groupIndex : stack.length;

  canvas.discardActiveObject();
  canvas.remove(clippingGroup);

  const releasedObjects = clippingGroup.removeAll() as FabricObject[];

  releasedObjects.forEach((object) => {
    const target = object as ClippingMaskTarget;
    if (target[PREVIOUS_CLIP_PATH_KEY] !== undefined) {
      const previousClipPath = target[PREVIOUS_CLIP_PATH_KEY];
      object.set('clipPath', previousClipPath ?? undefined);
      delete target[PREVIOUS_CLIP_PATH_KEY];
    } else {
      object.set('clipPath', undefined);
    }
    object.setCoords();
  });

  releasedObjects.forEach((object, index) => {
    canvas.insertAt(insertionIndex + index, object);
  });

  if (clipShape) {
    clipShape.setCoords();
    canvas.insertAt(insertionIndex + releasedObjects.length, clipShape);
  }

  const preferredActiveObject = clipShape ?? releasedObjects[0];
  if (preferredActiveObject) {
    canvas.setActiveObject(preferredActiveObject);
  }

  canvas.requestRenderAll();

  return {
    success: true,
    releasedObjects,
    clipShape: clipShape ?? undefined,
  };
}
