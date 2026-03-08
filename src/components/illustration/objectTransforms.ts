export interface MutableFabricObjectLike {
  set: (keyOrValues: string | Record<string, unknown>, value?: unknown) => unknown;
}

export interface FlippableObjectLike extends MutableFabricObjectLike {
  flipX?: boolean;
  flipY?: boolean;
}

export function toggleObjectFlip(
  object: FlippableObjectLike,
  direction: 'horizontal' | 'vertical'
): void {
  if (direction === 'horizontal') {
    object.set({ flipX: !Boolean(object.flipX) });
    return;
  }

  object.set({ flipY: !Boolean(object.flipY) });
}
