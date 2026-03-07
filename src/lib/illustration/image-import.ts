import { FabricImage, type Canvas as FabricCanvas } from 'fabric';

export interface CanvasLike {
  width?: number;
  height?: number;
  getWidth?: () => number;
  getHeight?: () => number;
  add: (object: ImportedImageLike) => void;
  setActiveObject: (object: ImportedImageLike) => void;
  requestRenderAll?: () => void;
  renderAll?: () => void;
  fire?: (eventName: string, payload?: unknown) => void;
}

export interface ImportedImageLike {
  width?: number;
  scaleToWidth?: (value: number) => void;
  scale?: (value: number) => void;
  set: (props: {
    originX?: 'left' | 'center' | 'right';
    originY?: 'top' | 'center' | 'bottom';
    left?: number;
    top?: number;
  }) => void;
}

export interface PlaceImageOptions {
  maxCanvasWidthRatio?: number;
}

export type FabricImageLoader = (url: string) => Promise<ImportedImageLike>;

const SUPPORTED_IMAGE_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/svg+xml',
]);

const SUPPORTED_IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.svg'];

function getCanvasDimension(
  canvas: Pick<CanvasLike, 'width' | 'height' | 'getWidth' | 'getHeight'>,
  key: 'width' | 'height'
): number {
  if (key === 'width' && typeof canvas.getWidth === 'function') {
    return canvas.getWidth();
  }

  if (key === 'height' && typeof canvas.getHeight === 'function') {
    return canvas.getHeight();
  }

  const fallback = key === 'width' ? 800 : 600;
  const rawValue = canvas[key];

  return typeof rawValue === 'number' && Number.isFinite(rawValue) && rawValue > 0
    ? rawValue
    : fallback;
}

export function isSupportedImageFile(file: Pick<File, 'type' | 'name'>): boolean {
  if (SUPPORTED_IMAGE_TYPES.has(file.type)) {
    return true;
  }

  const lowerName = file.name.toLowerCase();
  return SUPPORTED_IMAGE_EXTENSIONS.some((extension) => lowerName.endsWith(extension));
}

export function readImageFileAsDataUrl(file: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result === 'string') {
        resolve(result);
        return;
      }

      reject(new Error('Failed to read image file as data URL.'));
    };

    reader.onerror = () => {
      reject(new Error('Failed to read image file.'));
    };

    reader.readAsDataURL(file);
  });
}

export function scaleImageToCanvasWidth(
  image: Pick<ImportedImageLike, 'width' | 'scaleToWidth' | 'scale'>,
  canvasWidth: number,
  maxCanvasWidthRatio = 0.5
): number {
  const sourceWidth = typeof image.width === 'number' ? image.width : 0;
  const maxWidth = canvasWidth * maxCanvasWidthRatio;

  if (sourceWidth <= 0 || sourceWidth <= maxWidth) {
    return sourceWidth;
  }

  if (typeof image.scaleToWidth === 'function') {
    image.scaleToWidth(maxWidth);
    return maxWidth;
  }

  if (typeof image.scale === 'function') {
    image.scale(maxWidth / sourceWidth);
    return maxWidth;
  }

  return sourceWidth;
}

export function centerImageOnCanvas(
  image: Pick<ImportedImageLike, 'set'>,
  canvasWidth: number,
  canvasHeight: number
): void {
  image.set({
    originX: 'center',
    originY: 'center',
    left: canvasWidth / 2,
    top: canvasHeight / 2,
  });
}

export function placeImageOnCanvas(
  canvas: CanvasLike,
  image: ImportedImageLike,
  options: PlaceImageOptions = {}
): ImportedImageLike {
  const canvasWidth = getCanvasDimension(canvas, 'width');
  const canvasHeight = getCanvasDimension(canvas, 'height');

  scaleImageToCanvasWidth(image, canvasWidth, options.maxCanvasWidthRatio ?? 0.5);
  centerImageOnCanvas(image, canvasWidth, canvasHeight);

  canvas.add(image);
  canvas.setActiveObject(image);

  if (typeof canvas.requestRenderAll === 'function') {
    canvas.requestRenderAll();
  } else if (typeof canvas.renderAll === 'function') {
    canvas.renderAll();
  }

  if (typeof canvas.fire === 'function') {
    canvas.fire('object:modified', { target: image });
  }

  return image;
}

export async function importImageToCanvas(
  canvas: FabricCanvas | CanvasLike,
  dataUrl: string,
  options: PlaceImageOptions = {},
  loader: FabricImageLoader = (url: string) => FabricImage.fromURL(url)
): Promise<ImportedImageLike> {
  const image = await loader(dataUrl);
  return placeImageOnCanvas(canvas as CanvasLike, image, options);
}
