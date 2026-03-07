const DEFAULT_GRID_SIZE_PERCENT = 5;
const GRID_LINE_DECIMAL_PLACES = 4;

function roundPercent(value: number): number {
  return Number(value.toFixed(GRID_LINE_DECIMAL_PLACES));
}

export function normalizeGridSize(gridSize: number): number {
  if (!Number.isFinite(gridSize) || gridSize <= 0) {
    return DEFAULT_GRID_SIZE_PERCENT;
  }
  return Math.min(Math.max(gridSize, 1), 100);
}

export function getGridLinePositions(gridSize: number): number[] {
  const normalized = normalizeGridSize(gridSize);
  const lineCount = Math.floor(100 / normalized);
  const positions: number[] = [];

  for (let index = 1; index <= lineCount; index += 1) {
    positions.push(roundPercent(index * normalized));
  }

  return positions;
}

export function isMajorGridLine(position: number): boolean {
  const epsilon = 0.0001;
  return [25, 50, 75].some((mark) => Math.abs(position - mark) <= epsilon);
}

export function snapPercentToGrid(value: number, gridSize: number): number {
  const normalized = normalizeGridSize(gridSize);
  return roundPercent(Math.round(value / normalized) * normalized);
}
