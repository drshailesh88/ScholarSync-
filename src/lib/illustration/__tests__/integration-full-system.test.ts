// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

// Canvas 2D mock is applied globally via vitest setupFiles (canvas-mock-setup.ts)
import {
  Ellipse,
  Path as FabricPath,
  Polygon,
  Rect,
  Shadow,
  Textbox,
  type Canvas as FabricCanvas,
  type FabricObject,
  type TSimplePathData,
} from 'fabric';
import { SVGExporter } from '@/lib/illustration/export/SVGExporter';
import { PNGExporter } from '@/lib/illustration/export/PNGExporter';
import { createDefaultGradientState, createFabricGradient } from '@/lib/illustration/gradient/gradient-utils';
import { applyDocumentSettingsToCanvas } from '@/lib/illustration/document-settings';
import { booleanUnite, initializePathfinderPaperScope } from '@/lib/illustration/canvas/boolean-operations';
import { makeClippingMask, releaseClippingMask } from '@/lib/illustration/canvas/clipping-mask';
import { generatePolygonPoints, generateStarPoints } from '@/lib/illustration/canvas/shape-generators';
import {
  addPoint,
  createFreehandState,
  defaultFreehandSettings,
  finalizeFreehandStroke,
} from '@/lib/illustration/canvas/freehand-canvas';
import { convertObjectToRough, defaultRoughSettings } from '@/lib/illustration/canvas/rough-canvas';
import { moveAnchorPoint } from '@/lib/illustration/canvas/path-editing';
import { importSVGToCanvas } from '@/lib/illustration/canvas/svg-import';
import { distributeH } from '@/lib/illustration/canvas/align-operations';
import { sampleObjectFillColor } from '@/lib/illustration/canvas/eyedropper-utils';
import { toggleObjectFlip } from '@/components/illustration/PropertiesPanel';
import { getRulerScreenPosition } from '@/components/illustration/Rulers';
import { searchIcons } from '@/lib/illustration/data/icons';
import { DirectSelectTool } from '@/lib/illustration/editor/tools/DirectSelectTool';
import { MeasureTool } from '@/lib/illustration/editor/tools/MeasureTool';
import { useEditorStore } from '@/stores/illustration/editorStore';

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

function createMockPaperCanvasElement(): HTMLCanvasElement {
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
    width: 2048,
    height: 2048,
    getContext: () => context,
  } as unknown as HTMLCanvasElement;

  context.canvas = canvas;
  return canvas;
}

type SerializedFill =
  | string
  | {
      type: 'linear' | 'radial';
      coords: Record<string, number | undefined>;
      colorStops: Array<{ offset: number; color: string; opacity?: number }>;
    }
  | null;

interface SerializedObjectState {
  type: string;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  rx?: number;
  ry?: number;
  path?: TSimplePathData;
  text?: string;
  fontFamily?: string;
  fontWeight?: string | number;
  fontSize?: number;
  fill?: SerializedFill;
}

function serializeFill(fill: unknown): SerializedFill {
  if (typeof fill === 'string') {
    return fill;
  }

  if (!fill || typeof fill !== 'object') {
    return null;
  }

  const candidate = fill as {
    type?: unknown;
    coords?: unknown;
    colorStops?: unknown;
  };

  if ((candidate.type === 'linear' || candidate.type === 'radial') && candidate.coords && Array.isArray(candidate.colorStops)) {
    return {
      type: candidate.type,
      coords: { ...(candidate.coords as Record<string, number | undefined>) },
      colorStops: candidate.colorStops.map((stop) => ({
        offset: Number((stop as { offset: number }).offset),
        color: String((stop as { color: string }).color),
        opacity: (stop as { opacity?: number }).opacity,
      })),
    };
  }

  return null;
}

function serializeObject(object: FabricObject): SerializedObjectState {
  const base: SerializedObjectState = {
    type: object.type,
    left: object.left,
    top: object.top,
    width: object.width,
    height: object.height,
    fill: serializeFill(object.fill),
  };

  if (object.type === 'rect') {
    const rect = object as Rect;
    return {
      ...base,
      rx: rect.rx,
      ry: rect.ry,
    };
  }

  if (object.type === 'ellipse') {
    const ellipse = object as Ellipse;
    return {
      ...base,
      rx: ellipse.rx,
      ry: ellipse.ry,
    };
  }

  if (object.type === 'path') {
    const path = object as FabricPath;
    return {
      ...base,
      path: JSON.parse(JSON.stringify(path.path)) as TSimplePathData,
    };
  }

  if (object.type === 'text' || object.type === 'i-text' || object.type === 'textbox') {
    const text = object as Textbox;
    return {
      ...base,
      text: text.text,
      fontFamily: text.fontFamily,
      fontWeight: text.fontWeight,
      fontSize: text.fontSize,
    };
  }

  return base;
}

function hydrateObject(serialized: SerializedObjectState): FabricObject {
  const safeFill = typeof serialized.fill === 'string' ? serialized.fill : '#cccccc';

  if (serialized.type === 'ellipse') {
    return new Ellipse({
      left: serialized.left,
      top: serialized.top,
      rx: serialized.rx ?? 20,
      ry: serialized.ry ?? 20,
      fill: safeFill,
    });
  }

  if (serialized.type === 'path') {
    return new FabricPath(serialized.path ?? [['M', 0, 0], ['L', 10, 10], ['Z']], {
      left: serialized.left,
      top: serialized.top,
      fill: safeFill,
    });
  }

  if (serialized.type === 'text' || serialized.type === 'i-text' || serialized.type === 'textbox') {
    return new Textbox(serialized.text ?? '', {
      left: serialized.left,
      top: serialized.top,
      fontFamily: serialized.fontFamily,
      fontWeight: serialized.fontWeight,
      fontSize: serialized.fontSize,
      fill: typeof serialized.fill === 'string' ? serialized.fill : '#000000',
    });
  }

  return new Rect({
    left: serialized.left,
    top: serialized.top,
    width: serialized.width ?? 10,
    height: serialized.height ?? 10,
    rx: serialized.rx,
    ry: serialized.ry,
    fill: safeFill,
  });
}

function writeUint32BE(bytes: Uint8Array, offset: number, value: number): void {
  bytes[offset] = (value >>> 24) & 0xff;
  bytes[offset + 1] = (value >>> 16) & 0xff;
  bytes[offset + 2] = (value >>> 8) & 0xff;
  bytes[offset + 3] = value & 0xff;
}

function buildMockPng(width: number, height: number): Uint8Array {
  const bytes = new Uint8Array(45);
  // PNG signature
  bytes.set([137, 80, 78, 71, 13, 10, 26, 10], 0);
  // IHDR chunk length = 13
  writeUint32BE(bytes, 8, 13);
  // IHDR
  bytes.set([73, 72, 68, 82], 12);
  writeUint32BE(bytes, 16, width >>> 0);
  writeUint32BE(bytes, 20, height >>> 0);
  bytes[24] = 8; // bit depth
  bytes[25] = 6; // color type RGBA
  bytes[26] = 0; // compression
  bytes[27] = 0; // filter
  bytes[28] = 0; // interlace
  // fake IHDR CRC
  writeUint32BE(bytes, 29, 0);
  // IEND chunk
  writeUint32BE(bytes, 33, 0);
  bytes.set([73, 69, 78, 68], 37);
  writeUint32BE(bytes, 41, 0);
  return bytes;
}

async function readBlobAsBytes(blob: unknown): Promise<Uint8Array> {
  const isBlobLike =
    !!blob &&
    typeof blob === 'object' &&
    typeof (blob as { size?: unknown }).size === 'number' &&
    typeof (blob as { type?: unknown }).type === 'string';

  if (isBlobLike && typeof FileReader !== 'undefined') {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onerror = () => reject(new Error('Failed to read blob bytes'));
      reader.onload = () => {
        const result = reader.result;
        if (!(result instanceof ArrayBuffer)) {
          reject(new Error('Unexpected blob byte result'));
          return;
        }
        resolve(new Uint8Array(result));
      };
      reader.readAsArrayBuffer(blob as Blob);
    });
  }

  if (blob && typeof blob === 'object' && typeof (blob as { arrayBuffer?: () => Promise<ArrayBuffer> }).arrayBuffer === 'function') {
    return new Uint8Array(await (blob as { arrayBuffer: () => Promise<ArrayBuffer> }).arrayBuffer());
  }

  if (blob && typeof blob === 'object' && typeof (blob as { text?: () => Promise<string> }).text === 'function') {
    const text = await (blob as { text: () => Promise<string> }).text();
    return new TextEncoder().encode(text);
  }

  const response = new Response(blob as BodyInit);
  return new Uint8Array(await response.arrayBuffer());
}

async function readBlobAsText(blob: unknown): Promise<string> {
  const isBlobLike =
    !!blob &&
    typeof blob === 'object' &&
    typeof (blob as { size?: unknown }).size === 'number' &&
    typeof (blob as { type?: unknown }).type === 'string';

  if (isBlobLike && typeof FileReader !== 'undefined') {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onerror = () => reject(new Error('Failed to read blob text'));
      reader.onload = () => {
        const result = reader.result;
        if (typeof result !== 'string') {
          reject(new Error('Unexpected blob text result'));
          return;
        }
        resolve(result);
      };
      reader.readAsText(blob as Blob);
    });
  }

  if (blob && typeof blob === 'object' && typeof (blob as { text?: () => Promise<string> }).text === 'function') {
    return (blob as { text: () => Promise<string> }).text();
  }

  const response = new Response(blob as BodyInit);
  return response.text();
}

async function readPngDimensions(blob: unknown): Promise<{ width: number; height: number }> {
  const bytes = await readBlobAsBytes(blob);
  if (bytes.length < 24) {
    throw new Error('Invalid PNG blob');
  }

  const width = ((bytes[16] << 24) | (bytes[17] << 16) | (bytes[18] << 8) | bytes[19]) >>> 0;
  const height = ((bytes[20] << 24) | (bytes[21] << 16) | (bytes[22] << 8) | bytes[23]) >>> 0;

  return { width, height };
}

class IntegrationCanvasMock {
  private objects: FabricObject[] = [];
  private activeObjects: FabricObject[] = [];
  private width: number;
  private height: number;
  public backgroundColor: unknown = '#ffffff';
  public selection = true;
  public defaultCursor = 'default';
  public hoverCursor = 'move';
  private zoom = 1;

  constructor(width = 800, height = 600, initialObjects: FabricObject[] = []) {
    this.width = width;
    this.height = height;
    this.add(...initialObjects);
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  setDimensions(dimensions: { width: number; height: number }): void {
    this.width = dimensions.width;
    this.height = dimensions.height;
  }

  setZoom(zoom: number): void {
    this.zoom = zoom;
  }

  getZoom(): number {
    return this.zoom;
  }

  getObjects(): FabricObject[] {
    return this.objects;
  }

  forEachObject(callback: (object: FabricObject) => void): void {
    this.objects.forEach(callback);
  }

  add(...objects: FabricObject[]): number {
    objects.forEach((object) => {
      if (!this.objects.includes(object)) {
        this.objects.push(object);
      }
      (object as FabricObject & { canvas?: unknown }).canvas = this as unknown as FabricCanvas;
      object.setCoords();
    });
    return this.objects.length;
  }

  insertAt(index: number, ...objects: FabricObject[]): number {
    const safeIndex = Math.max(0, Math.min(index, this.objects.length));
    this.objects.splice(safeIndex, 0, ...objects);
    objects.forEach((object) => {
      (object as FabricObject & { canvas?: unknown }).canvas = this as unknown as FabricCanvas;
      object.setCoords();
    });
    return this.objects.length;
  }

  remove(...objects: FabricObject[]): FabricObject[] {
    objects.forEach((object) => {
      const index = this.objects.indexOf(object);
      if (index >= 0) {
        this.objects.splice(index, 1);
      }
      this.activeObjects = this.activeObjects.filter((activeObject) => activeObject !== object);
      (object as FabricObject & { canvas?: unknown }).canvas = undefined;
    });
    return objects;
  }

  setActiveObjects(objects: FabricObject[]): void {
    this.activeObjects = [...objects];
  }

  getActiveObjects(): FabricObject[] {
    return this.activeObjects;
  }

  setActiveObject(object: FabricObject): this {
    this.activeObjects = [object];
    return this;
  }

  discardActiveObject(): this {
    this.activeObjects = [];
    return this;
  }

  requestRenderAll(): void {
    // Simulate render traversal cost
    for (const object of this.objects) {
      object.getBoundingRect();
    }
  }

  renderAll(): void {
    this.requestRenderAll();
  }

  getPointer(event: MouseEvent): { x: number; y: number } {
    return {
      x: event.clientX ?? 0,
      y: event.clientY ?? 0,
    };
  }

  toJSON(): { width: number; height: number; backgroundColor: unknown; objects: SerializedObjectState[] } {
    return {
      width: this.width,
      height: this.height,
      backgroundColor: this.backgroundColor,
      objects: this.objects.map(serializeObject),
    };
  }

  async loadFromJSON(json: {
    width?: number;
    height?: number;
    backgroundColor?: unknown;
    objects?: SerializedObjectState[];
  }): Promise<void> {
    this.width = json.width ?? this.width;
    this.height = json.height ?? this.height;
    this.backgroundColor = json.backgroundColor ?? this.backgroundColor;
    this.objects = (json.objects ?? []).map((serialized) => hydrateObject(serialized));
    this.activeObjects = [];
    this.objects.forEach((object) => {
      (object as FabricObject & { canvas?: unknown }).canvas = this as unknown as FabricCanvas;
      object.setCoords();
    });
  }

  toSVG(): string {
    const body = this.objects
      .map((object, index) => `<g data-object-index="${index}">${object.toSVG()}</g>`)
      .join('\n');

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}" viewBox="0 0 ${this.width} ${this.height}">\n${body}\n</svg>`;
  }

  toDataURL(options?: { multiplier?: number }): string {
    const multiplier = options?.multiplier ?? 1;
    const width = Math.max(1, Math.round(this.width * multiplier));
    const height = Math.max(1, Math.round(this.height * multiplier));
    const bytes = buildMockPng(width, height);
    return `data:image/png;base64,${Buffer.from(bytes).toString('base64')}`;
  }
}

function asFabricCanvas(canvas: IntegrationCanvasMock): FabricCanvas {
  return canvas as unknown as FabricCanvas;
}

class AlignMockObject {
  constructor(
    public id: string,
    public left: number,
    public top: number,
    public width: number,
    public height: number
  ) {}

  get(key: string): string {
    return key === 'id' ? this.id : '';
  }

  getBoundingRect() {
    return {
      left: this.left,
      top: this.top,
      width: this.width,
      height: this.height,
    };
  }
}

beforeEach(() => {
  initializePathfinderPaperScope(createMockPaperCanvasElement());
});

afterEach(() => {
  const store = useEditorStore.getState();
  store.setCanvas(null);
  store.clearHistory();
});

describe('full system integration workflows', () => {
  it('a) rect + gradient + drop shadow exports SVG with gradient defs and filter', async () => {
    const canvas = new IntegrationCanvasMock(640, 480);
    const rect = new Rect({ left: 80, top: 90, width: 220, height: 140 });

    const gradientState = createDefaultGradientState('linear', '#ef4444');
    gradientState.stops = [
      { id: 'start', offset: 0, color: '#ef4444' },
      { id: 'end', offset: 1, color: '#3b82f6' },
    ];

    rect.set('fill', createFabricGradient(gradientState, { width: 220, height: 140 }));
    rect.set(
      'shadow',
      new Shadow({
        color: 'rgba(0,0,0,0.35)',
        blur: 18,
        offsetX: 10,
        offsetY: 12,
      })
    );

    canvas.add(rect);

    const result = await new SVGExporter().export(asFabricCanvas(canvas), {
      optimize: false,
      preserveViewBox: true,
      minify: false,
    });

    const svg = await readBlobAsText(result.blob);
    expect(svg).toContain('<linearGradient');
    expect(svg).toContain('<filter');
  });

  it('b) boolean unite produces one path and undo restores two ellipses', async () => {
    const ellipseA = new Ellipse({ left: 80, top: 140, rx: 70, ry: 45, fill: '#22c55e' });
    const ellipseB = new Ellipse({ left: 140, top: 140, rx: 70, ry: 45, fill: '#10b981' });
    const canvas = new IntegrationCanvasMock(800, 500, [ellipseA, ellipseB]);

    const store = useEditorStore.getState();
    store.setCanvas(asFabricCanvas(canvas));
    store.clearHistory();
    store.pushHistory(JSON.stringify(canvas.toJSON()));

    const united = booleanUnite([ellipseA, ellipseB]);
    canvas.remove(ellipseA, ellipseB);
    canvas.add(united);

    expect(canvas.getObjects()).toHaveLength(1);
    expect(canvas.getObjects()[0]?.type).toBe('path');

    await store.undo();

    const restoredTypes = canvas.getObjects().map((object) => object.type).sort();
    expect(restoredTypes).toEqual(['ellipse', 'ellipse']);
  });

  it('c) polygon flip horizontal then align to canvas center keeps centered position', () => {
    const canvas = new IntegrationCanvasMock(1000, 600);
    const points = generatePolygonPoints(0, 0, 60, 6);
    const polygon = new Polygon(points, { left: 80, top: 120, fill: '#f59e0b' });

    toggleObjectFlip(polygon as unknown as Parameters<typeof toggleObjectFlip>[0], 'horizontal');
    canvas.add(polygon);

    const bounds = polygon.getBoundingRect();
    polygon.set({ left: canvas.getWidth() / 2 - bounds.width / 2 });
    polygon.setCoords();

    const centeredBounds = polygon.getBoundingRect();
    const centerX = centeredBounds.left + centeredBounds.width / 2;

    expect(polygon.flipX).toBe(true);
    expect(centerX).toBeCloseTo(canvas.getWidth() / 2, 5);
  });

  it('d) text "Hello" keeps Georgia bold 24px with gradient fill', () => {
    const text = new Textbox('Hello', {
      left: 100,
      top: 70,
      fontFamily: 'Arial',
      fontWeight: 'normal',
      fontSize: 16,
      fill: '#000000',
    });

    text.set({
      fontFamily: 'Georgia',
      fontWeight: 'bold',
      fontSize: 24,
    });

    const gradientState = createDefaultGradientState('linear', '#0ea5e9');
    gradientState.stops = [
      { id: 'start', offset: 0, color: '#0ea5e9' },
      { id: 'end', offset: 1, color: '#14b8a6' },
    ];

    text.set('fill', createFabricGradient(gradientState, { width: 280, height: 50 }));

    expect(text.fontFamily).toBe('Georgia');
    expect(text.fontWeight).toBe('bold');
    expect(text.fontSize).toBe(24);
    expect((text.fill as { type?: string } | null)?.type).toBe('linear');
  });

  it('e) clipping mask group can be moved and released to restore both objects', async () => {
    const rect = new Rect({ left: 120, top: 140, width: 220, height: 160, fill: '#60a5fa' });
    const ellipse = new Ellipse({ left: 180, top: 170, rx: 80, ry: 55, fill: '#111111' });
    const canvas = new IntegrationCanvasMock(900, 600, [rect, ellipse]);

    canvas.setActiveObjects([rect, ellipse]);
    const masked = await makeClippingMask(asFabricCanvas(canvas));
    expect(masked.success).toBe(true);

    masked.group?.set({ left: (masked.group.left ?? 0) + 35, top: (masked.group.top ?? 0) + 22 });
    masked.group?.setCoords();

    canvas.setActiveObject(masked.group as FabricObject);
    const released = await releaseClippingMask(asFabricCanvas(canvas));
    expect(released.success).toBe(true);

    const objectTypes = canvas.getObjects().map((object) => object.type).sort();
    expect(objectTypes).toEqual(['ellipse', 'rect']);
  });

  it('f) agent-generated diagram opens in editor, moves object, and exports', async () => {
    const agentSvg = [
      '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120">',
      '<rect x="10" y="10" width="80" height="40" fill="#94a3b8" />',
      '<path d="M 10 70 L 80 70 L 80 100 Z" fill="#38bdf8" />',
      '</svg>',
    ].join('');
    const imported = await importSVGToCanvas(agentSvg);
    const movableObject = imported.objects[0];

    expect(imported.objects.length).toBeGreaterThanOrEqual(2);
    expect(movableObject).toBeTruthy();
    if (!movableObject) {
      throw new Error('Imported object not found');
    }

    movableObject.set({
      left: (movableObject.left ?? 0) + 30,
      top: (movableObject.top ?? 0) + 15,
    });
    movableObject.setCoords();

    const canvas = new IntegrationCanvasMock(300, 200, imported.objects);
    const result = await new SVGExporter().export(asFabricCanvas(canvas), { optimize: false, minify: false });
    const exported = await readBlobAsText(result.blob);

    expect(exported).toContain('<rect');
    expect(exported).toContain('<path');
    expect(exported).toContain('data-object-index=');
  });

  it('g) 1920x1080 canvas exports PNG with matching dimensions', async () => {
    const canvas = new IntegrationCanvasMock(640, 360);

    applyDocumentSettingsToCanvas(canvas, {
      width: 1920,
      height: 1080,
      backgroundColor: '#ffffff',
    });

    canvas.add(new Rect({ left: 120, top: 110, width: 300, height: 180, fill: '#8b5cf6' }));
    canvas.add(new Ellipse({ left: 700, top: 260, rx: 110, ry: 70, fill: '#22c55e' }));

    const png = await new PNGExporter().export(asFabricCanvas(canvas), {
      dpi: 72,
      quality: 90,
      transparent: false,
    });

    const dimensions = await readPngDimensions(png.blob);
    expect(dimensions.width).toBe(1920);
    expect(dimensions.height).toBe(1080);
  });

  it('h) distributing 5 rects horizontally results in equal spacing', () => {
    const objects = [
      new AlignMockObject('a', 0, 50, 40, 30),
      new AlignMockObject('b', 120, 50, 40, 30),
      new AlignMockObject('c', 260, 50, 40, 30),
      new AlignMockObject('d', 410, 50, 40, 30),
      new AlignMockObject('e', 600, 50, 40, 30),
    ];

    const positions = distributeH(objects as unknown as FabricObject[]);
    const byId = Object.fromEntries(positions.map((position) => [String(position.id), position]));

    const gapAB = byId.b.left - (byId.a.left + 40);
    const gapBC = byId.c.left - (byId.b.left + 40);
    const gapCD = byId.d.left - (byId.c.left + 40);
    const gapDE = byId.e.left - (byId.d.left + 40);

    expect(gapAB).toBeCloseTo(gapBC, 6);
    expect(gapBC).toBeCloseTo(gapCD, 6);
    expect(gapCD).toBeCloseTo(gapDE, 6);
  });

  it('i) eyedropper samples a reasonable color from a gradient-filled object', () => {
    const rect = new Rect({ left: 0, top: 0, width: 100, height: 100 });
    const gradientState = createDefaultGradientState('linear', '#ff0000');
    gradientState.stops = [
      { id: 'start', offset: 0, color: '#ff0000' },
      { id: 'end', offset: 1, color: '#0000ff' },
    ];

    rect.set('fill', createFabricGradient(gradientState, { width: 100, height: 100 }));

    const sampled = sampleObjectFillColor(rect, { x: 50, y: 50 });
    expect(sampled).toMatch(/^#[0-9a-f]{6}$/i);
    expect(sampled).not.toBe('#ff0000');
    expect(sampled).not.toBe('#0000ff');
  });

  it('j) star tool with 5 points creates 10 vertices', () => {
    const points = generateStarPoints(0, 0, 70, 35, 5);

    expect(points).toHaveLength(10);
  });

  it('k) freehand stroke produces a Fabric Path', () => {
    const state = createFreehandState();
    addPoint(state, 10, 10, 0.4);
    addPoint(state, 40, 20, 0.5);
    addPoint(state, 70, 35, 0.6);
    addPoint(state, 100, 40, 0.7);

    const path = finalizeFreehandStroke(state, defaultFreehandSettings);

    expect(path).toBeInstanceOf(FabricPath);
    expect(path?.type).toBe('path');
    expect(path?.path?.length ?? 0).toBeGreaterThan(0);
  });

  it('l) rough.js toggle converts a rect into a sketchier path with extra points', () => {
    const rect = new Rect({
      left: 50,
      top: 60,
      width: 140,
      height: 90,
      fill: '#fde68a',
      stroke: '#92400e',
      strokeWidth: 2,
    });

    const roughPath = convertObjectToRough(rect, {
      ...defaultRoughSettings,
      seed: 7,
    });

    expect(roughPath).toBeInstanceOf(FabricPath);
    expect(roughPath?.type).toBe('path');
    expect(roughPath?.path?.length ?? 0).toBeGreaterThan(12);
  });

  it('m) ruler zoom sync doubles tick positions at 2x zoom', () => {
    expect(getRulerScreenPosition(10, 2, 0)).toBe(20);
    expect(getRulerScreenPosition(50, 2, 0)).toBe(100);
    expect(getRulerScreenPosition(100, 2, 12)).toBe(212);
  });

  it('n) direct select chooses a path and moving an anchor updates it', () => {
    const path = new FabricPath('M 10 10 L 80 10 L 80 80 Z', {
      left: 20,
      top: 30,
      fill: '#94a3b8',
    });
    const canvas = new IntegrationCanvasMock(320, 200, [path]);
    let selectedPath: FabricPath | null = null;

    const tool = new DirectSelectTool({
      onPathSelected: (nextPath) => {
        selectedPath = nextPath;
      },
    });

    tool.activate(asFabricCanvas(canvas));
    tool.onMouseDown?.({
      e: new MouseEvent('mousedown', { clientX: 80, clientY: 40 }),
      target: path,
      pointer: { x: 80, y: 40 },
    });

    expect(selectedPath).toBe(path);
    const movedPath = moveAnchorPoint(path.path as TSimplePathData, 1, { x: 120, y: 10 });
    path.set('path', movedPath);
    path.setCoords();

    expect(JSON.stringify(path.path)).toContain('120');
  });

  it('o) measure tool does not create permanent objects on the canvas', () => {
    const rect = new Rect({ left: 30, top: 40, width: 120, height: 60, fill: '#60a5fa' });
    const canvas = new IntegrationCanvasMock(400, 300, [rect]);
    const tool = new MeasureTool();
    const initialCount = canvas.getObjects().length;

    tool.activate(asFabricCanvas(canvas));
    tool.onMouseDown?.({
      e: new MouseEvent('mousedown', { clientX: 10, clientY: 15 }),
      pointer: { x: 10, y: 15 },
    });
    tool.onMouseMove?.({
      e: new MouseEvent('mousemove', { clientX: 110, clientY: 85 }),
      pointer: { x: 110, y: 85 },
    });
    tool.onMouseUp?.({
      e: new MouseEvent('mouseup', { clientX: 110, clientY: 85 }),
      pointer: { x: 110, y: 85 },
    });

    expect(tool.getMeasurement()?.distance ?? 0).toBeGreaterThan(0);
    expect(canvas.getObjects()).toHaveLength(initialCount);
  });
});

describe('editor performance and export fidelity', () => {
  it('performance: render 200 objects under 100ms, undo 50 history states under 200ms, and search icons under 500ms', async () => {
    const canvas = new IntegrationCanvasMock(1920, 1080);

    for (let index = 0; index < 200; index += 1) {
      const x = (index % 20) * 90;
      const y = Math.floor(index / 20) * 60;

      switch (index % 4) {
        case 0:
          canvas.add(new Rect({ left: x, top: y, width: 70, height: 36, fill: '#60a5fa' }));
          break;
        case 1:
          canvas.add(new Ellipse({ left: x, top: y, rx: 35, ry: 18, fill: '#34d399' }));
          break;
        case 2:
          canvas.add(
            new FabricPath('M 0 0 L 20 0 L 10 20 Z', {
              left: x,
              top: y,
              fill: '#f59e0b',
            })
          );
          break;
        default:
          canvas.add(new Textbox(`T${index}`, { left: x, top: y, fontSize: 12, fill: '#111827' }));
          break;
      }
    }

    const renderStart = performance.now();
    canvas.requestRenderAll();
    const renderMs = performance.now() - renderStart;

    expect(renderMs).toBeLessThan(100);

    const store = useEditorStore.getState();
    store.setCanvas(asFabricCanvas(canvas));
    store.clearHistory();

    for (let i = 0; i < 50; i += 1) {
      canvas.add(new Rect({ left: i * 4, top: i * 3, width: 20, height: 12, fill: '#a855f7' }));
      store.pushHistory(JSON.stringify(canvas.toJSON()));
    }

    const undoStart = performance.now();
    await store.undo();
    const undoMs = performance.now() - undoStart;
    const iconSearchStart = performance.now();
    const iconResults = searchIcons('cell', { limit: 5000 });
    const iconSearchMs = performance.now() - iconSearchStart;
    console.info(
      `[integration-perf] renderMs=${renderMs.toFixed(2)} undoMs=${undoMs.toFixed(2)} iconSearchMs=${iconSearchMs.toFixed(2)}`
    );

    expect(undoMs).toBeLessThan(200);
    expect(iconResults.length).toBeGreaterThan(0);
    expect(iconSearchMs).toBeLessThan(500);
  });

  it('export fidelity: complex SVG has no grid lines, valid gradients, clipPath, text attrs, and matching object count', async () => {
    const canvas = new IntegrationCanvasMock(1200, 800);

    const makeGradientRect = (left: number, top: number, color: string): Rect => {
      const rect = new Rect({ left, top, width: 180, height: 120 });
      const state = createDefaultGradientState('linear', color);
      state.stops = [
        { id: 'start', offset: 0, color },
        { id: 'end', offset: 1, color: '#1d4ed8' },
      ];
      rect.set('fill', createFabricGradient(state, { width: 180, height: 120 }));
      rect.set(
        'shadow',
        new Shadow({
          color: 'rgba(0,0,0,0.25)',
          blur: 12,
          offsetX: 4,
          offsetY: 6,
        })
      );
      return rect;
    };

    const objects: FabricObject[] = [
      makeGradientRect(40, 40, '#ef4444'),
      makeGradientRect(260, 40, '#22c55e'),
      makeGradientRect(480, 40, '#0ea5e9'),
      new Rect({ left: 60, top: 220, width: 120, height: 90, fill: '#f97316' }),
      new Rect({ left: 220, top: 220, width: 120, height: 90, fill: '#a855f7' }),
      new Ellipse({ left: 420, top: 230, rx: 65, ry: 40, fill: '#14b8a6' }),
      new Ellipse({ left: 610, top: 230, rx: 65, ry: 40, fill: '#f43f5e' }),
      new FabricPath('M 0 0 L 90 0 L 45 70 Z', { left: 790, top: 220, fill: '#eab308' }),
      new FabricPath('M 0 0 L 120 20 L 70 70 Z', { left: 930, top: 220, fill: '#3b82f6' }),
      new Rect({ left: 930, top: 60, width: 140, height: 90, fill: '#fb7185' }),
      new Ellipse({ left: 960, top: 380, rx: 55, ry: 35, fill: '#2dd4bf' }),
      new Rect({ left: 120, top: 560, width: 160, height: 80, fill: '#c084fc' }),
      new Rect({ left: 340, top: 560, width: 160, height: 80, fill: '#facc15' }),
      new Ellipse({ left: 580, top: 560, rx: 70, ry: 40, fill: '#818cf8' }),
      new Textbox('Fidelity Check', {
        left: 60,
        top: 380,
        fontFamily: 'Georgia',
        fontWeight: 'bold',
        fontSize: 24,
        fill: '#111827',
      }),
      new Textbox('Masked region', {
        left: 310,
        top: 390,
        fontFamily: 'Georgia',
        fontSize: 20,
        fill: '#111827',
      }),
      new Textbox('Gradient + clips + text', {
        left: 760,
        top: 520,
        fontFamily: 'Georgia',
        fontSize: 18,
        fill: '#111827',
      }),
    ];

    canvas.add(...objects);

    const clipTarget = new Rect({ left: 560, top: 360, width: 260, height: 180, fill: '#38bdf8' });
    const clipShape = new Ellipse({ left: 650, top: 420, rx: 90, ry: 70, fill: '#000000' });
    canvas.add(clipTarget, clipShape);
    canvas.setActiveObjects([clipTarget, clipShape]);

    const clipped = await makeClippingMask(asFabricCanvas(canvas));
    expect(clipped.success).toBe(true);

    const exporter = new SVGExporter();
    const result = await exporter.export(asFabricCanvas(canvas), {
      optimize: false,
      preserveViewBox: true,
      minify: false,
    });

    const svg = await readBlobAsText(result.blob);
    const objectCount = canvas.getObjects().length;
    const exportedObjectCount = (svg.match(/data-object-index=/g) ?? []).length;

    expect(svg).not.toMatch(/grid-line|grid-overlay|data-grid/gi);
    expect(svg).toContain('<linearGradient');
    expect(svg).toContain('<stop');
    expect(svg).toContain('<clipPath');
    expect(svg).toContain('font-family="Georgia"');
    expect(svg).toContain('font-size="24"');
    expect(exportedObjectCount).toBe(objectCount);
  });
});
