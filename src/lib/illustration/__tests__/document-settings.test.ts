import { describe, expect, it, vi } from 'vitest';
import {
  applyDocumentSettingsToCanvas,
  getPresetDimensions,
  swapDimensions,
} from '@/lib/illustration/document-settings';
import { importImageToCanvas } from '@/lib/illustration/image-import';

describe('document settings and image import', () => {
  it('setting canvas to 1920x1080 updates canvas dimensions', () => {
    const setDimensions = vi.fn();
    const requestRenderAll = vi.fn();

    applyDocumentSettingsToCanvas(
      {
        setDimensions,
        requestRenderAll,
      },
      {
        width: 1920,
        height: 1080,
        backgroundColor: '#ffffff',
      }
    );

    expect(setDimensions).toHaveBeenCalledWith({ width: 1920, height: 1080 });
    expect(requestRenderAll).toHaveBeenCalledOnce();
  });

  it('preset A4 portrait sets correct dimensions', () => {
    const dimensions = getPresetDimensions('a4', 'portrait');
    expect(dimensions).toEqual({ width: 2480, height: 3508 });
  });

  it('toggling orientation swaps width and height', () => {
    const swapped = swapDimensions({ width: 1920, height: 1080 });
    expect(swapped).toEqual({ width: 1080, height: 1920 });
  });

  it('image import creates a FabricImage on canvas', async () => {
    class MockFabricImage {
      width = 300;
      scaleToWidth = vi.fn();
      set = vi.fn();
    }

    const image = new MockFabricImage();
    const canvas = {
      width: 1000,
      height: 800,
      add: vi.fn(),
      setActiveObject: vi.fn(),
      requestRenderAll: vi.fn(),
      fire: vi.fn(),
    };

    const placedImage = await importImageToCanvas(canvas, 'data:image/png;base64,abc', {}, async () => image);

    expect(placedImage).toBe(image);
    expect(canvas.add).toHaveBeenCalledWith(image);
    expect(canvas.setActiveObject).toHaveBeenCalledWith(image);
    expect(canvas.fire).toHaveBeenCalledWith('object:modified', { target: image });
    expect(canvas.add.mock.calls[0][0]).toBeInstanceOf(MockFabricImage);
  });

  it('imported image is scaled to not exceed 50% of canvas width', async () => {
    const image = {
      width: 2000,
      scaleToWidth: vi.fn(),
      set: vi.fn(),
    };

    const canvas = {
      width: 1000,
      height: 800,
      add: vi.fn(),
      setActiveObject: vi.fn(),
      requestRenderAll: vi.fn(),
      fire: vi.fn(),
    };

    await importImageToCanvas(canvas, 'data:image/png;base64,abc', {}, async () => image);

    expect(image.scaleToWidth).toHaveBeenCalledWith(500);
    expect(image.set).toHaveBeenCalledWith({
      originX: 'center',
      originY: 'center',
      left: 500,
      top: 400,
    });
  });
});
