/**
 * Canvas 2D context mock for jsdom environments (CI/headless).
 * Must be loaded via vitest `setupFiles` so it runs before any module
 * (paper.js, fabric) tries to create a 2D canvas context on import.
 */

if (typeof globalThis !== 'undefined') {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
}

const stubGradient = { addColorStop: () => {} };

const mockContext = {
  save: () => {},
  restore: () => {},
  beginPath: () => {},
  closePath: () => {},
  moveTo: () => {},
  lineTo: () => {},
  bezierCurveTo: () => {},
  quadraticCurveTo: () => {},
  arc: () => {},
  arcTo: () => {},
  ellipse: () => {},
  rect: () => {},
  fillRect: () => {},
  strokeRect: () => {},
  clearRect: () => {},
  fill: () => {},
  stroke: () => {},
  clip: () => {},
  translate: () => {},
  rotate: () => {},
  scale: () => {},
  transform: () => {},
  setTransform: () => {},
  resetTransform: () => {},
  drawImage: () => {},
  fillText: () => {},
  strokeText: () => {},
  measureText: () => ({
    width: 0,
    actualBoundingBoxAscent: 0,
    actualBoundingBoxDescent: 0,
    fontBoundingBoxAscent: 0,
    fontBoundingBoxDescent: 0,
  }),
  createLinearGradient: () => stubGradient,
  createRadialGradient: () => stubGradient,
  createPattern: () => ({}),
  createImageData: (w: number, h: number) => ({
    data: new Uint8ClampedArray(w * h * 4),
    width: w,
    height: h,
  }),
  getImageData: (_x: number, _y: number, w: number, h: number) => ({
    data: new Uint8ClampedArray(w * h * 4),
    width: w,
    height: h,
  }),
  putImageData: () => {},
  setLineDash: () => {},
  getLineDash: () => [],
  isPointInPath: () => false,
  isPointInStroke: () => false,
  lineWidth: 1,
  lineCap: 'butt',
  lineJoin: 'miter',
  miterLimit: 10,
  lineDashOffset: 0,
  globalAlpha: 1,
  globalCompositeOperation: 'source-over',
  strokeStyle: '#000000',
  fillStyle: '#000000',
  shadowBlur: 0,
  shadowColor: 'rgba(0, 0, 0, 0)',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  font: '10px sans-serif',
  textAlign: 'left',
  textBaseline: 'alphabetic',
  direction: 'ltr',
  imageSmoothingEnabled: true,
};

if (typeof HTMLCanvasElement !== 'undefined') {
  const orig = HTMLCanvasElement.prototype.getContext;
  // @ts-expect-error -- simplified mock override
  HTMLCanvasElement.prototype.getContext = function (
    contextId: string,
    ...args: unknown[]
  ) {
    if (contextId === '2d') {
      return { ...mockContext, canvas: this };
    }
    return orig.call(this, contextId, ...args);
  };
}
