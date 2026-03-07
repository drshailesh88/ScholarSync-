export interface BoundsRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface DragSelection {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export function toBoundsRect(selection: DragSelection): BoundsRect {
  return {
    left: Math.min(selection.startX, selection.currentX),
    top: Math.min(selection.startY, selection.currentY),
    right: Math.max(selection.startX, selection.currentX),
    bottom: Math.max(selection.startY, selection.currentY),
  };
}

export function rectsIntersect(a: BoundsRect, b: BoundsRect): boolean {
  return a.left <= b.right && a.right >= b.left && a.top <= b.bottom && a.bottom >= b.top;
}
