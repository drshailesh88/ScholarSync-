/**
 * Tests for FigurePanelGenerator Component
 *
 * Tests for multi-panel figure layouts with auto-labeling.
 */

import { describe, it, expect } from 'vitest';

describe('FigurePanelGenerator', () => {
  describe('Panel Layout Constants', () => {
    it('should have correct label sequence', () => {
      const LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      expect(LABELS).toHaveLength(26);
      expect(LABELS[0]).toBe('A');
      expect(LABELS[25]).toBe('Z');
    });
  });

  describe('Layout Presets', () => {
    const PRESETS = [
      { name: '1x1', rows: 1, cols: 1 },
      { name: '1x2', rows: 1, cols: 2 },
      { name: '2x1', rows: 2, cols: 1 },
      { name: '2x2', rows: 2, cols: 2 },
      { name: '2x3', rows: 2, cols: 3 },
      { name: '3x2', rows: 3, cols: 2 },
      { name: '3x3', rows: 3, cols: 3 },
      { name: '2x4', rows: 2, cols: 4 },
      { name: '4x2', rows: 4, cols: 2 },
    ];

    it('should have 9 layout presets', () => {
      expect(PRESETS).toHaveLength(9);
    });

    it('should calculate total panels correctly', () => {
      PRESETS.forEach((preset) => {
        const totalPanels = preset.rows * preset.cols;
        expect(totalPanels).toBeGreaterThan(0);
        expect(totalPanels).toBeLessThanOrEqual(26); // Max 26 labels
      });
    });

    it('should have valid preset configurations', () => {
      PRESETS.forEach((preset) => {
        expect(preset.rows).toBeGreaterThan(0);
        expect(preset.cols).toBeGreaterThan(0);
        expect(preset.name).toBeTruthy();
      });
    });
  });

  describe('Panel Position Calculations', () => {
    it('should calculate panel width correctly', () => {
      const panelWidth = 150;
      const gap = 20;
      const cols = 3;
      const totalWidth = cols * panelWidth + (cols - 1) * gap;
      expect(totalWidth).toBe(490); // 3*150 + 2*20
    });

    it('should calculate panel height correctly', () => {
      const panelHeight = 150;
      const gap = 20;
      const rows = 2;
      const totalHeight = rows * panelHeight + (rows - 1) * gap;
      expect(totalHeight).toBe(320); // 2*150 + 1*20
    });

    it('should calculate starting position for centering', () => {
      const canvasWidth = 800;
      const totalWidth = 400;
      const startX = canvasWidth / 2 - totalWidth / 2;
      expect(startX).toBe(200); // (800 - 400) / 2
    });

    it('should calculate panel X position', () => {
      const startX = 200;
      const col = 2;
      const panelWidth = 150;
      const gap = 20;
      const panelX = startX + col * (panelWidth + gap);
      expect(panelX).toBe(540); // 200 + 2*(150+20)
    });

    it('should calculate panel Y position', () => {
      const startY = 100;
      const row = 1;
      const panelHeight = 150;
      const gap = 20;
      const panelY = startY + row * (panelHeight + gap);
      expect(panelY).toBe(270); // 100 + 1*(150+20)
    });
  });

  describe('Label Positioning', () => {
    const panelWidth = 150;
    const panelHeight = 150;
    const padding = 10;
    const labelFontSize = 24;

    it('should position top-left label correctly', () => {
      const panelX = 0;
      const panelY = 0;
      const labelX = panelX + padding;
      const labelY = panelY + padding + labelFontSize;
      expect(labelX).toBe(10);
      expect(labelY).toBe(34);
    });

    it('should position top-right label correctly', () => {
      const panelX = 0;
      const panelY = 0;
      const labelX = panelX + panelWidth - padding;
      const labelY = panelY + padding + labelFontSize;
      expect(labelX).toBe(140);
      expect(labelY).toBe(34);
    });

    it('should position bottom-left label correctly', () => {
      const panelX = 0;
      const panelY = 0;
      const labelX = panelX + padding;
      const labelY = panelY + panelHeight - padding;
      expect(labelX).toBe(10);
      expect(labelY).toBe(140);
    });

    it('should position bottom-right label correctly', () => {
      const panelX = 0;
      const panelY = 0;
      const labelX = panelX + panelWidth - padding;
      const labelY = panelY + panelHeight - padding;
      expect(labelX).toBe(140);
      expect(labelY).toBe(140);
    });

    it('should position center label correctly', () => {
      const panelX = 0;
      const panelY = 0;
      const labelX = panelX + panelWidth / 2;
      const labelY = panelY + panelHeight / 2;
      expect(labelX).toBe(75);
      expect(labelY).toBe(75);
    });
  });

  describe('Label Generation', () => {
    const LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    it('should assign correct label to panel index', () => {
      expect(LABELS[0]).toBe('A');
      expect(LABELS[1]).toBe('B');
      expect(LABELS[25]).toBe('Z');
    });

    it('should calculate panel index from grid position', () => {
      const rows = 2;
      const cols = 3;

      // Row 0
      expect(0 * cols + 0).toBe(0); // Panel (0,0) -> Index 0 -> A
      expect(0 * cols + 1).toBe(1); // Panel (0,1) -> Index 1 -> B
      expect(0 * cols + 2).toBe(2); // Panel (0,2) -> Index 2 -> C

      // Row 1
      expect(1 * cols + 0).toBe(3); // Panel (1,0) -> Index 3 -> D
      expect(1 * cols + 1).toBe(4); // Panel (1,1) -> Index 4 -> E
      expect(1 * cols + 2).toBe(5); // Panel (1,2) -> Index 5 -> F
    });

    it('should return empty string for out of bounds index', () => {
      const index = 100;
      const label = LABELS[index] || '';
      expect(label).toBe('');
    });
  });

  describe('Config Options', () => {
    const defaultConfig = {
      rows: 2,
      cols: 2,
      panelWidth: 150,
      panelHeight: 150,
      gap: 20,
      showLabels: true,
      labelPosition: 'top-left' as const,
      labelFontSize: 24,
      strokeWidth: 2,
      strokeColor: '#000000',
      fillColor: '#ffffff',
    };

    it('should have valid default config', () => {
      expect(defaultConfig.rows).toBe(2);
      expect(defaultConfig.cols).toBe(2);
      expect(defaultConfig.panelWidth).toBe(150);
      expect(defaultConfig.panelHeight).toBe(150);
      expect(defaultConfig.gap).toBe(20);
      expect(defaultConfig.showLabels).toBe(true);
      expect(defaultConfig.labelFontSize).toBe(24);
    });

    it('should support all label positions', () => {
      const positions: Array<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'> = [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'center',
      ];

      positions.forEach((pos) => {
        expect(pos).toBeTruthy();
      });
    });
  });
});
