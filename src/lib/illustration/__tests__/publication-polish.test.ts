/**
 * Publication Polish Post-Processor Tests
 *
 * Tests for the publication-quality SVG post-processing pipeline.
 */

import { describe, it, expect } from 'vitest';
import { PublicationPolishProcessor, polishSvg } from '../ai/post-processing/publication-polish';
import { getJournalPreset, JOURNAL_PRESETS } from '../ai/post-processing/journal-presets';

describe('PublicationPolishProcessor', () => {
  // =========================================================================
  // Font Size Tests
  // =========================================================================

  describe('enforceMinFontSize', () => {
    it('should set minimum font size to 8pt for small fonts', () => {
      const processor = new PublicationPolishProcessor({ minFontSize: 8 });
      const svg = '<svg xmlns="http://www.w3.org/2000/svg"><text font-size="4pt">Small</text></svg>';
      const result = processor.polish(svg);
      expect(result).toContain('font-size="8pt"');
      expect(result).not.toContain('font-size="4pt"');
    });

    it('should not modify fonts already at or above minimum size', () => {
      const processor = new PublicationPolishProcessor({ minFontSize: 8 });
      const svg = '<svg xmlns="http://www.w3.org/2000/svg"><text font-size="12pt">Large</text></svg>';
      const result = processor.polish(svg);
      expect(result).toContain('font-size="12pt"');
    });

    it('should handle px font sizes and convert threshold correctly', () => {
      const processor = new PublicationPolishProcessor({ minFontSize: 8 });
      // 6px = 4.5pt which is below 8pt minimum
      const svg = '<svg xmlns="http://www.w3.org/2000/svg"><text font-size="6px">Small</text></svg>';
      const result = processor.polish(svg);
      // Should be replaced with 8pt equivalent in px (8/0.75 = 10.666...)
      expect(result).not.toContain('font-size="6px"');
    });

    it('should handle font-size in style attributes', () => {
      const processor = new PublicationPolishProcessor({ minFontSize: 8 });
      const svg = '<svg xmlns="http://www.w3.org/2000/svg"><text style="font-size: 4pt; fill: red">Test</text></svg>';
      const result = processor.polish(svg);
      expect(result).toContain('font-size: 8pt');
      expect(result).not.toContain('font-size: 4pt');
    });
  });

  // =========================================================================
  // Font Normalization Tests
  // =========================================================================

  describe('normalizeFonts', () => {
    it('should normalize non-standard fonts to Arial', () => {
      const processor = new PublicationPolishProcessor();
      const svg = '<svg xmlns="http://www.w3.org/2000/svg"><text font-family="Roboto, sans-serif">Hello</text></svg>';
      const result = processor.polish(svg);
      expect(result).toContain('font-family="Arial, Helvetica, sans-serif"');
      expect(result).not.toContain('Roboto');
    });

    it('should preserve Times/Georgia serif fonts', () => {
      const processor = new PublicationPolishProcessor();
      const svg = '<svg xmlns="http://www.w3.org/2000/svg"><text font-family="Times New Roman, serif">Serif</text></svg>';
      const result = processor.polish(svg);
      expect(result).toContain('Times New Roman');
    });

    it('should normalize system fonts in style attributes', () => {
      const processor = new PublicationPolishProcessor();
      const svg = '<svg xmlns="http://www.w3.org/2000/svg"><text style="font-family: system-ui">UI</text></svg>';
      const result = processor.polish(svg);
      expect(result).toContain('font-family: Arial, Helvetica, sans-serif');
    });
  });

  // =========================================================================
  // ViewBox Tests
  // =========================================================================

  describe('ensureViewBox', () => {
    it('should add viewBox to SVG without one', () => {
      const processor = new PublicationPolishProcessor();
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100" height="100"/></svg>';
      const result = processor.polish(svg);
      expect(result).toContain('viewBox="0 0 800 600"');
    });

    it('should not modify SVG that already has viewBox', () => {
      const processor = new PublicationPolishProcessor();
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="100" height="100"/></svg>';
      const result = processor.polish(svg);
      expect(result).toContain('viewBox="0 0 400 300"');
      // Should not have a second viewBox
      const viewBoxCount = (result.match(/viewBox/g) || []).length;
      expect(viewBoxCount).toBe(1);
    });

    it('should use default dimensions if width/height not specified', () => {
      const processor = new PublicationPolishProcessor();
      const svg = '<svg xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100"/></svg>';
      const result = processor.polish(svg);
      expect(result).toContain('viewBox="0 0 800 600"');
    });
  });

  // =========================================================================
  // Empty Group Removal Tests
  // =========================================================================

  describe('removeEmptyGroups', () => {
    it('should remove empty groups', () => {
      const processor = new PublicationPolishProcessor();
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g id="empty"></g><rect width="50" height="50"/></svg>';
      const result = processor.polish(svg);
      expect(result).not.toContain('<g id="empty"></g>');
      expect(result).toContain('<rect');
    });

    it('should remove nested empty groups', () => {
      const processor = new PublicationPolishProcessor();
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g><g></g></g><rect width="50" height="50"/></svg>';
      const result = processor.polish(svg);
      expect(result).not.toContain('<g>');
      expect(result).toContain('<rect');
    });

    it('should not remove groups with content', () => {
      const processor = new PublicationPolishProcessor();
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g id="content"><rect width="50" height="50"/></g></svg>';
      const result = processor.polish(svg);
      expect(result).toContain('<g id="content">');
      expect(result).toContain('<rect');
    });
  });

  // =========================================================================
  // Journal Preset Tests
  // =========================================================================

  describe('journal presets', () => {
    it('Nature preset should constrain width to 89mm', () => {
      const preset = getJournalPreset('nature');
      expect(preset).toBeDefined();
      expect(preset!.maxWidthMm).toBe(89);
      expect(preset!.name).toBe('Nature');
    });

    it('NEJM preset should be grayscale-friendly', () => {
      const preset = getJournalPreset('nejm');
      expect(preset).toBeDefined();
      expect(preset!.grayscaleFriendly).toBe(true);
    });

    it('should apply Nature preset width constraint during polish', () => {
      const preset = getJournalPreset('nature')!;
      const processor = new PublicationPolishProcessor({ journalPreset: preset });
      // SVG wider than 89mm (89 * 3.7795 = ~336px)
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600"/></svg>';
      const result = processor.polish(svg);
      expect(result).toContain('width="89mm"');
    });

    it('all presets should have required fields', () => {
      for (const [key, preset] of Object.entries(JOURNAL_PRESETS)) {
        expect(preset.id).toBe(key);
        expect(preset.name).toBeTruthy();
        expect(preset.maxWidthMm).toBeGreaterThan(0);
        expect(preset.exportDpi).toBeGreaterThanOrEqual(300);
      }
    });
  });

  // =========================================================================
  // Content Preservation Tests
  // =========================================================================

  describe('content preservation', () => {
    it('should preserve text content and paths', () => {
      const processor = new PublicationPolishProcessor();
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
        <text x="100" y="200" font-family="Roboto" font-size="12pt">Important Label</text>
        <path d="M 10 10 L 100 100 Z" stroke="black" stroke-width="2"/>
        <circle cx="50" cy="50" r="30" fill="#3B4992"/>
      </svg>`;
      const result = processor.polish(svg);
      expect(result).toContain('Important Label');
      expect(result).toContain('d="M 10 10 L 100 100 Z"');
      expect(result).toContain('<circle');
      expect(result).toContain('r="30"');
    });

    it('should preserve element attributes other than font/stroke', () => {
      const processor = new PublicationPolishProcessor();
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <rect x="10" y="20" width="50" height="30" rx="5" fill="#ff0000" opacity="0.8"/>
      </svg>`;
      const result = processor.polish(svg);
      expect(result).toContain('x="10"');
      expect(result).toContain('y="20"');
      expect(result).toContain('width="50"');
      expect(result).toContain('height="30"');
      expect(result).toContain('rx="5"');
      expect(result).toContain('opacity="0.8"');
    });
  });

  // =========================================================================
  // Stroke Width Tests
  // =========================================================================

  describe('enforceMinStrokeWidth', () => {
    it('should enforce minimum stroke width of 0.5pt', () => {
      const processor = new PublicationPolishProcessor({ minStrokeWidth: 0.5 });
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><line stroke-width="0.1pt" x1="0" y1="0" x2="100" y2="100"/></svg>';
      const result = processor.polish(svg);
      expect(result).toContain('stroke-width="0.5pt"');
      expect(result).not.toContain('stroke-width="0.1pt"');
    });
  });

  // =========================================================================
  // Anti-aliasing Tests
  // =========================================================================

  describe('anti-aliasing', () => {
    it('should add anti-aliasing hints when enabled', () => {
      const processor = new PublicationPolishProcessor({ antiAlias: true });
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="50" height="50"/></svg>';
      const result = processor.polish(svg);
      expect(result).toContain('shape-rendering="geometricPrecision"');
      expect(result).toContain('text-rendering="geometricPrecision"');
    });

    it('should not add anti-aliasing when disabled', () => {
      const processor = new PublicationPolishProcessor({ antiAlias: false });
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="50" height="50"/></svg>';
      const result = processor.polish(svg);
      expect(result).not.toContain('shape-rendering');
    });
  });

  // =========================================================================
  // Convenience Function Tests
  // =========================================================================

  describe('polishSvg convenience function', () => {
    it('should work with default options', () => {
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><text font-family="Verdana" font-size="4pt">Test</text></svg>';
      const result = polishSvg(svg);
      expect(result).toContain('Arial');
      expect(result).toContain('font-size="8pt"');
      expect(result).toContain('viewBox');
    });

    it('should handle empty SVG gracefully', () => {
      expect(polishSvg('')).toBe('');
      expect(polishSvg('  ')).toBe('  ');
    });
  });

  // =========================================================================
  // Color Palette Tests
  // =========================================================================

  describe('color palette', () => {
    it('should apply custom color palette', () => {
      const processor = new PublicationPolishProcessor({
        colorPalette: ['#FF0000', '#00FF00'],
      });
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="#3B4992" width="50" height="50"/><rect fill="#EE0000" width="50" height="50"/></svg>';
      const result = processor.polish(svg);
      expect(result).toContain('fill="#FF0000"');
      expect(result).toContain('fill="#00FF00"');
    });

    it('should not replace white or black fills', () => {
      const processor = new PublicationPolishProcessor({
        colorPalette: ['#FF0000'],
      });
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="#ffffff" width="50" height="50"/><rect fill="#000000" width="50" height="50"/></svg>';
      const result = processor.polish(svg);
      expect(result).toContain('fill="#ffffff"');
      expect(result).toContain('fill="#000000"');
    });
  });

  // =========================================================================
  // Redundant Element Removal Tests
  // =========================================================================

  describe('removeRedundantElements', () => {
    it('should remove empty text elements', () => {
      const processor = new PublicationPolishProcessor();
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="10" y="20"> </text><text x="30" y="40">Keep me</text></svg>';
      const result = processor.polish(svg);
      expect(result).not.toMatch(/<text[^>]*>\s*<\/text>/);
      expect(result).toContain('Keep me');
    });

    it('should remove empty defs', () => {
      const processor = new PublicationPolishProcessor();
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs></defs><rect width="50" height="50"/></svg>';
      const result = processor.polish(svg);
      expect(result).not.toContain('<defs></defs>');
      expect(result).toContain('<rect');
    });
  });
});
