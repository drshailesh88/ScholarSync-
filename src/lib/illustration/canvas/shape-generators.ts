export interface Point {
  x: number;
  y: number;
}

const FULL_CIRCLE = Math.PI * 2;
const START_ANGLE = -Math.PI / 2;

export function generatePolygonPoints(
  cx: number,
  cy: number,
  radius: number,
  sides: number
): Point[] {
  const safeSides = Math.max(3, Math.round(sides));
  const safeRadius = Math.max(0, radius);
  const step = FULL_CIRCLE / safeSides;

  return Array.from({ length: safeSides }, (_, index) => {
    const angle = START_ANGLE + index * step;
    return {
      x: cx + safeRadius * Math.cos(angle),
      y: cy + safeRadius * Math.sin(angle),
    };
  });
}

export function generateStarPoints(
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  points: number
): Point[] {
  const safePoints = Math.max(3, Math.round(points));
  const safeOuterRadius = Math.max(0, outerRadius);
  const safeInnerRadius = Math.max(0, innerRadius);
  const step = Math.PI / safePoints;

  return Array.from({ length: safePoints * 2 }, (_, index) => {
    const angle = START_ANGLE + index * step;
    const radius = index % 2 === 0 ? safeOuterRadius : safeInnerRadius;

    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });
}
