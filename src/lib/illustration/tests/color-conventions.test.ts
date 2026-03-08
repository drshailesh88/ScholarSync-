import { describe, expect, it } from 'vitest';
import {
  ColorConventionManager,
  formatFigureLabel,
  createScaleBar,
  simulateColorBlind,
  COLOR_BLIND_MATRICES,
  hexToRgb,
} from '@/lib/illustration/canvas/color-conventions';

describe('ColorConventionManager', () => {
  const manager = new ColorConventionManager();

  // Test 1: "artery" maps to red (#E74C3C)
  it('"artery" maps to red (#E74C3C)', () => {
    expect(manager.getColor('artery')).toBe('#E74C3C');
  });

  // Test 2: "vein" maps to blue (#3498DB)
  it('"vein" maps to blue (#3498DB)', () => {
    expect(manager.getColor('vein')).toBe('#3498DB');
  });

  // Test 3: Figure label "Fig. 1" inserts correctly formatted text
  it('Figure label "Fig. 1" inserts correctly formatted text', () => {
    const label = formatFigureLabel({ style: 'fig-dot', number: 1 });
    expect(label).toBe('Fig. 1');
  });

  // Test 4: Scale bar creates line + text group with correct dimensions
  it('scale bar creates descriptor with correct dimensions', () => {
    const bar = createScaleBar({
      lengthValue: 100,
      unit: 'μm',
      barWidthPx: 200,
      barHeightPx: 6,
    });
    expect(bar.label).toBe('100 μm');
    expect(bar.widthPx).toBe(200);
    expect(bar.heightPx).toBe(6);
  });

  // Test 5: Color-blind simulation applies correct filter matrix
  it('color-blind simulation applies correct filter matrix for protanopia', () => {
    const result = simulateColorBlind('#E74C3C', 'protanopia');
    // Protanopia matrix transforms red → different color
    const rgb = hexToRgb(result);
    expect(rgb).not.toBeNull();
    // The simulated color should differ from the original red
    expect(result).not.toBe('#E74C3C');
    // Verify the matrix exists and has 20 values
    expect(COLOR_BLIND_MATRICES.protanopia.matrix).toHaveLength(20);
  });

  // Test 6: Apply conventions to diagram with "artery" text label changes fill to red
  it('apply conventions to objects with "artery" text label returns red', () => {
    const objects = [
      { id: 'obj1', text: 'Left artery', fill: '#000000' },
      { id: 'obj2', text: 'Some random text', fill: '#FFFFFF' },
      { id: 'obj3', text: 'Pulmonary vein', fill: '#000000' },
    ];

    const results = manager.applyToCanvasObjects(objects);

    // Should match "artery" in first object
    const arteryResult = results.find(r => r.objectId === 'obj1');
    expect(arteryResult).toBeDefined();
    expect(arteryResult!.appliedColor).toBe('#E74C3C');
    expect(arteryResult!.previousColor).toBe('#000000');

    // Should match "vein" in third object
    const veinResult = results.find(r => r.objectId === 'obj3');
    expect(veinResult).toBeDefined();
    expect(veinResult!.appliedColor).toBe('#3498DB');

    // Second object should not have a match
    const noMatch = results.find(r => r.objectId === 'obj2');
    expect(noMatch).toBeUndefined();
  });

  // Additional tests for completeness
  it('detects aliases correctly (e.g., "oxygenated" maps to artery red)', () => {
    expect(manager.getColor('oxygenated')).toBe('#E74C3C');
    expect(manager.getColor('deoxygenated')).toBe('#3498DB');
  });

  it('nerve maps to yellow (#F39C12)', () => {
    expect(manager.getColor('nerve')).toBe('#F39C12');
  });

  it('DNA maps to blue (#2980B9) and RNA maps to green (#27AE60)', () => {
    expect(manager.getColor('dna')).toBe('#2980B9');
    expect(manager.getColor('rna')).toBe('#27AE60');
  });

  it('cell membrane maps to orange (#E67E22)', () => {
    expect(manager.getColor('cell membrane')).toBe('#E67E22');
  });

  it('returns null for unknown terms', () => {
    expect(manager.getColor('quantum flux')).toBeNull();
  });

  it('case-insensitive matching works', () => {
    expect(manager.getColor('ARTERY')).toBe('#E74C3C');
    expect(manager.getColor('Vein')).toBe('#3498DB');
  });

  it('Figure label styles produce correct formats', () => {
    expect(formatFigureLabel({ style: 'figure-space', number: 2 })).toBe('Figure 2');
    expect(formatFigureLabel({ style: 'fig-dot', number: 1, panel: 'A' })).toBe('Fig. 1A');
    expect(formatFigureLabel({ style: 'letter-paren', number: 1, panel: 'A' })).toBe('(a)');
    expect(formatFigureLabel({ style: 'letter-plain', number: 1, panel: 'B' })).toBe('B');
  });

  it('scale bar uses default height when not specified', () => {
    const bar = createScaleBar({ lengthValue: 50, unit: 'nm', barWidthPx: 100 });
    expect(bar.heightPx).toBe(4);
  });

  it('detectTerms finds multiple terms in text', () => {
    const matches = manager.detectTerms('The artery connects to the vein through capillaries');
    expect(matches.length).toBe(2);
    expect(matches.map(m => m.convention.term)).toContain('artery');
    expect(matches.map(m => m.convention.term)).toContain('vein');
  });
});
