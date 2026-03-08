/**
 * Tests for JournalPresets Component
 *
 * Tests for journal export presets with dimension validation.
 */

import { describe, it, expect } from 'vitest';
import {
  mmToPx,
  pxToMm,
  dpiScale,
  runPreflight,
  JOURNAL_PRESETS,
  type JournalPreset,
  type PreflightResult as _PreflightResult,
} from '../JournalPresets';

// Mock fabric object
function createMockObject(
  type: string,
  options: { fontSize?: number; strokeWidth?: number } = {}
) {
  return { type, ...options };
}

describe('JournalPresets utilities', () => {
  describe('mmToPx', () => {
    it('should convert millimeters to pixels at 300 DPI', () => {
      expect(mmToPx(89, 300)).toBe(1051); // Nature width
      expect(mmToPx(25.4, 300)).toBe(300); // 1 inch at 300 DPI
    });

    it('should convert millimeters to pixels at 600 DPI', () => {
      expect(mmToPx(100, 600)).toBe(2362);
      expect(mmToPx(25.4, 600)).toBe(600); // 1 inch at 600 DPI
    });

    it('should convert millimeters to pixels at 72 DPI (standard)', () => {
      expect(mmToPx(25.4, 72)).toBe(72); // 1 inch at 72 DPI
    });

    it('should handle decimal values correctly', () => {
      expect(mmToPx(12.7, 300)).toBe(150); // Half inch
    });
  });

  describe('pxToMm', () => {
    it('should convert pixels to millimeters at 300 DPI', () => {
      expect(pxToMm(1051, 300)).toBeCloseTo(89, 0);
      expect(pxToMm(300, 300)).toBeCloseTo(25.4, 1);
    });

    it('should convert pixels to millimeters at 600 DPI', () => {
      expect(pxToMm(2362, 600)).toBeCloseTo(100, 0);
    });

    it('should be inverse of mmToPx', () => {
      const originalMM = 89;
      const px = mmToPx(originalMM, 300);
      const backToMM = pxToMm(px, 300);
      expect(backToMM).toBeCloseTo(originalMM, 1);
    });
  });

  describe('dpiScale', () => {
    it('should return scale factor relative to 72 DPI', () => {
      expect(dpiScale(72)).toBe(1);
      expect(dpiScale(144)).toBe(2);
      expect(dpiScale(300)).toBeCloseTo(4.17, 1);
      expect(dpiScale(600)).toBeCloseTo(8.33, 1);
    });
  });

  describe('JOURNAL_PRESETS', () => {
    it('should have 10 journal presets', () => {
      expect(JOURNAL_PRESETS).toHaveLength(10);
    });

    it('should include required journals', () => {
      const ids = JOURNAL_PRESETS.map((p) => p.id);
      expect(ids).toContain('nature');
      expect(ids).toContain('science');
      expect(ids).toContain('cell');
      expect(ids).toContain('pnas');
      expect(ids).toContain('plos-one');
      expect(ids).toContain('ieee');
      expect(ids).toContain('acs-nano');
      expect(ids).toContain('rsc-adv');
      expect(ids).toContain('springer');
      expect(ids).toContain('elsevier');
    });

    it('should have valid preset data structure', () => {
      JOURNAL_PRESETS.forEach((preset) => {
        expect(preset.id).toBeTruthy();
        expect(preset.name).toBeTruthy();
        expect(preset.description).toBeTruthy();
        expect(preset.widthMM).toBeGreaterThan(0);
        expect(preset.heightMM).toBeGreaterThan(0);
        expect(preset.dpi).toBeGreaterThan(0);
        expect(preset.minFontPt).toBeGreaterThan(0);
        expect(preset.minLineWeightPx).toBeGreaterThan(0);
        expect(['RGB', 'CMYK', 'Grayscale']).toContain(preset.colorSpace);
      });
    });

    it('should have Nature preset with correct dimensions', () => {
      const nature = JOURNAL_PRESETS.find((p) => p.id === 'nature');
      expect(nature?.widthMM).toBe(89);
      expect(nature?.heightMM).toBe(247);
      expect(nature?.dpi).toBe(300);
    });

    it('should have IEEE preset with grayscale color space', () => {
      const ieee = JOURNAL_PRESETS.find((p) => p.id === 'ieee');
      expect(ieee?.colorSpace).toBe('Grayscale');
      expect(ieee?.dpi).toBe(600);
    });
  });

  describe('runPreflight', () => {
    const mockCanvas = {
      width: 1051, // 89mm at 300 DPI
      height: 1169, // 100mm at 300 DPI
    };

    it('should return valid result for correct dimensions', () => {
      const preset: JournalPreset = {
        id: 'test',
        name: 'Test',
        description: 'Test preset',
        widthMM: 89,
        heightMM: 247,
        dpi: 300,
        colorSpace: 'RGB',
        minFontPt: 6,
        minLineWeightPx: 0.5,
      };

      // Use canvas height that matches or exceeds the preset minimum
      const canvasHeight = mmToPx(preset.heightMM, preset.dpi);
      const result = runPreflight(mockCanvas.width, canvasHeight, preset, []);

      expect(result.valid).toBe(true);
      expect(result.issues.filter((i) => i.type === 'error')).toHaveLength(0);
    });

    it('should detect width mismatch', () => {
      const preset: JournalPreset = {
        id: 'test',
        name: 'Test',
        description: 'Test preset',
        widthMM: 100, // Different from canvas
        heightMM: 247,
        dpi: 300,
        colorSpace: 'RGB',
        minFontPt: 6,
        minLineWeightPx: 0.5,
      };

      const result = runPreflight(mockCanvas.width, mockCanvas.height, preset, []);

      expect(result.valid).toBe(false);
      expect(result.issues.some((i) => i.message.includes('Width'))).toBe(true);
    });

    it('should warn about small height', () => {
      const preset: JournalPreset = {
        id: 'test',
        name: 'Test',
        description: 'Test preset',
        widthMM: 89,
        heightMM: 300,
        dpi: 300,
        colorSpace: 'RGB',
        minFontPt: 6,
        minLineWeightPx: 0.5,
      };

      const result = runPreflight(mockCanvas.width, 100, preset, []); // Very small height

      expect(result.issues.some((i) => i.type === 'warning')).toBe(true);
    });

    it('should detect small font sizes', () => {
      const preset: JournalPreset = {
        id: 'test',
        name: 'Test',
        description: 'Test preset',
        widthMM: 89,
        heightMM: 247,
        dpi: 300,
        colorSpace: 'RGB',
        minFontPt: 10,
        minLineWeightPx: 0.5,
      };

      const objects = [
        createMockObject('i-text', { fontSize: 6 }), // Too small
        createMockObject('textbox', { fontSize: 12 }),
      ];

      const result = runPreflight(mockCanvas.width, mockCanvas.height, preset, objects);

      expect(result.issues.some((i) => i.message.includes('font'))).toBe(true);
    });

    it('should detect thin lines', () => {
      const preset: JournalPreset = {
        id: 'test',
        name: 'Test',
        description: 'Test preset',
        widthMM: 89,
        heightMM: 247,
        dpi: 300,
        colorSpace: 'RGB',
        minFontPt: 6,
        minLineWeightPx: 2,
      };

      const objects = [
        createMockObject('rect', { strokeWidth: 0.5 }), // Too thin
        createMockObject('path', { strokeWidth: 3 }),
      ];

      const result = runPreflight(mockCanvas.width, mockCanvas.height, preset, objects);

      expect(result.issues.some((i) => i.message.includes('line'))).toBe(true);
    });

    it('should include canvas dimensions in result', () => {
      const preset: JournalPreset = {
        id: 'test',
        name: 'Test',
        description: 'Test preset',
        widthMM: 89,
        heightMM: 247,
        dpi: 300,
        colorSpace: 'RGB',
        minFontPt: 6,
        minLineWeightPx: 0.5,
      };

      const result = runPreflight(mockCanvas.width, mockCanvas.height, preset, []);

      expect(result.canvasWidthPx).toBe(mockCanvas.width);
      expect(result.canvasHeightPx).toBe(mockCanvas.height);
      expect(result.canvasDPI).toBe(300);
      expect(result.canvasWidthMM).toBeCloseTo(89, 0);
    });

    it('should pass preflight for Nature journal with correct dimensions', () => {
      const nature = JOURNAL_PRESETS.find((p) => p.id === 'nature')!;
      const canvasWidth = mmToPx(nature.widthMM, nature.dpi);
      const canvasHeight = mmToPx(100, nature.dpi); // Arbitrary height

      const result = runPreflight(canvasWidth, canvasHeight, nature, []);

      // Height should not cause error, only width matters for error
      expect(result.issues.filter((i) => i.type === 'error')).toHaveLength(0);
    });
  });
});
