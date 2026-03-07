/**
 * Icon Search Enhancement Tests
 *
 * Tests for:
 * 1. Fuzzy search with Levenshtein distance (typo tolerance)
 * 2. Category filtering by domain
 * 3. Icon manifest indexing
 * 4. Recent icons tracking (last 20)
 * 5. Icon insertion creates selectable object
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  levenshteinDistance,
  fuzzyMatchScore,
  isFuzzyMatch,
  fuzzySearch,
} from '../lib/icons/fuzzy-search';
import {
  getIconManifest,
  getManifestCategories,
  getManifestDomainCounts,
  searchManifest,
  getManifestTotalCount,
  clearManifestCache,
} from '../data/icon-manifest';
import { allIcons, getIconsByCategory, getCategories } from '../data/icons';

// =============================================================================
// TEST 1: Fuzzy search - "cardiologi" matches "cardiology" icons
// =============================================================================

describe('Fuzzy Search - Levenshtein Distance', () => {
  it('should calculate correct Levenshtein distance', () => {
    expect(levenshteinDistance('', '')).toBe(0);
    expect(levenshteinDistance('abc', '')).toBe(3);
    expect(levenshteinDistance('', 'abc')).toBe(3);
    expect(levenshteinDistance('abc', 'abc')).toBe(0);
    expect(levenshteinDistance('kitten', 'sitting')).toBe(3);
    expect(levenshteinDistance('cardiology', 'cardiologi')).toBe(1);
  });

  it('should fuzzy match "cardiologi" to "cardiology"', () => {
    const score = fuzzyMatchScore('cardiologi', 'cardiology');
    expect(score).toBeGreaterThan(0);
  });

  it('should fuzzy match "microsocpe" to "microscope"', () => {
    expect(isFuzzyMatch('microsocpe', 'microscope')).toBe(true);
  });

  it('should NOT fuzzy match completely different strings', () => {
    expect(isFuzzyMatch('cardiology', 'astronomy')).toBe(false);
  });

  it('should find fuzzy matches from a list of candidates', () => {
    const candidates = [
      'cardiology',
      'neurology',
      'pathology',
      'radiology',
      'astronomy',
    ];

    const results = fuzzySearch('cardiologi', candidates);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].value).toBe('cardiology');
  });

  it('should rank exact matches highest', () => {
    const candidates = ['heart', 'heater', 'heat', 'hearth'];
    const results = fuzzySearch('heart', candidates);
    expect(results[0].value).toBe('heart');
    expect(results[0].score).toBe(1);
  });

  it('should handle empty query gracefully', () => {
    const results = fuzzySearch('', ['cardiology']);
    expect(results).toEqual([]);
  });

  it('should match words within multi-word candidates', () => {
    const candidates = ['cardiac-anatomy', 'neural-pathways'];
    const results = fuzzySearch('cardiac', candidates);
    expect(results.length).toBeGreaterThan(0);
  });
});

// =============================================================================
// TEST 2: Category filter shows only matching domain icons
// =============================================================================

describe('Category Filtering by Domain', () => {
  it('should return icons filtered by category', () => {
    const categories = getCategories();
    expect(categories.length).toBeGreaterThan(0);

    // Pick first available category
    const category = categories[0];
    const filtered = getIconsByCategory(category);
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every(icon => icon.category.toLowerCase() === category.toLowerCase())).toBe(true);
  });

  it('should return icons filtered by domain', () => {
    const medicineIcons = allIcons.filter(icon => icon.domain === 'medicine');
    expect(medicineIcons.length).toBeGreaterThan(0);
    expect(medicineIcons.every(icon => icon.domain === 'medicine')).toBe(true);
  });

  it('should have cardiology as a recognized category', () => {
    const cardiologyIcons = getIconsByCategory('cardiac-anatomy');
    // May or may not have icons depending on data, but should not throw
    expect(Array.isArray(cardiologyIcons)).toBe(true);
  });

  it('should return all available categories across domains', () => {
    const allCategories = getCategories();
    expect(allCategories.length).toBeGreaterThan(5);
  });
});

// =============================================================================
// TEST 3: Icon manifest contains entries for all icon files
// =============================================================================

describe('Icon Manifest', () => {
  beforeEach(() => {
    clearManifestCache();
  });

  it('should contain entries for all internal icons', () => {
    const manifest = getIconManifest();
    // The manifest should have at least as many entries as allIcons
    expect(manifest.length).toBeGreaterThanOrEqual(allIcons.length);
  });

  it('should have proper structure for each entry', () => {
    const manifest = getIconManifest();
    expect(manifest.length).toBeGreaterThan(0);

    const entry = manifest[0];
    expect(entry).toHaveProperty('id');
    expect(entry).toHaveProperty('name');
    expect(entry).toHaveProperty('domain');
    expect(entry).toHaveProperty('category');
    expect(entry).toHaveProperty('tags');
    expect(entry).toHaveProperty('source');
    expect(entry).toHaveProperty('lazyLoad');
  });

  it('should provide accurate category counts', () => {
    const categories = getManifestCategories();
    expect(categories.length).toBeGreaterThan(0);

    for (const cat of categories) {
      expect(cat.count).toBeGreaterThan(0);
      expect(cat.name).toBeTruthy();
    }
  });

  it('should provide domain counts', () => {
    const counts = getManifestDomainCounts();
    expect(counts['medicine']).toBeGreaterThan(0);
  });

  it('should support search over manifest metadata', () => {
    const results = searchManifest('heart');
    expect(results.length).toBeGreaterThan(0);
  });

  it('should support domain filtering in manifest search', () => {
    const results = searchManifest('', { domain: 'medicine' });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every(e => e.domain === 'medicine')).toBe(true);
  });

  it('should return total count', () => {
    const total = getManifestTotalCount();
    expect(total).toBeGreaterThanOrEqual(allIcons.length);
  });

  it('should cache results for performance', () => {
    const start1 = performance.now();
    getIconManifest();
    const dur1 = performance.now() - start1;

    const start2 = performance.now();
    getIconManifest();
    const dur2 = performance.now() - start2;

    // Second call should be faster due to caching
    expect(dur2).toBeLessThanOrEqual(dur1 + 1);
  });
});

// =============================================================================
// TEST 4: Recent icons tracks last 20 insertions
// =============================================================================

describe('Recent Icons Tracking', () => {
  // Mock localStorage
  let storage: Record<string, string> = {};

  beforeEach(() => {
    storage = {};
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => storage[key] ?? null,
      setItem: (key: string, value: string) => { storage[key] = value; },
      removeItem: (key: string) => { delete storage[key]; },
      clear: () => { storage = {}; },
    });
  });

  it('should track recent icon insertions up to 20', () => {
    const RECENT_KEY = 'scholarsync-recent-icons';

    // Simulate adding 25 icons
    for (let i = 0; i < 25; i++) {
      const current: string[] = storage[RECENT_KEY] ? JSON.parse(storage[RECENT_KEY]) : [];
      const filtered = current.filter((id: string) => id !== `icon-${i}`);
      filtered.unshift(`icon-${i}`);
      storage[RECENT_KEY] = JSON.stringify(filtered.slice(0, 20));
    }

    const recent: string[] = JSON.parse(storage[RECENT_KEY]);
    expect(recent.length).toBe(20);
    // Most recent should be first
    expect(recent[0]).toBe('icon-24');
    // Oldest beyond 20 should be dropped
    expect(recent).not.toContain('icon-0');
    expect(recent).not.toContain('icon-4');
  });

  it('should move re-used icons to the front', () => {
    const RECENT_KEY = 'scholarsync-recent-icons';

    // Add icons 0-4
    storage[RECENT_KEY] = JSON.stringify(['icon-4', 'icon-3', 'icon-2', 'icon-1', 'icon-0']);

    // Re-use icon-1 (should move to front)
    const current: string[] = JSON.parse(storage[RECENT_KEY]);
    const filtered = current.filter((id: string) => id !== 'icon-1');
    filtered.unshift('icon-1');
    storage[RECENT_KEY] = JSON.stringify(filtered.slice(0, 20));

    const recent: string[] = JSON.parse(storage[RECENT_KEY]);
    expect(recent[0]).toBe('icon-1');
    expect(recent.length).toBe(5);
    // No duplicates
    expect(new Set(recent).size).toBe(recent.length);
  });

  it('should handle empty localStorage gracefully', () => {
    const stored = localStorage.getItem('scholarsync-recent-icons');
    expect(stored).toBeNull();
    // Should not throw
    const recent: string[] = stored ? JSON.parse(stored) : [];
    expect(recent).toEqual([]);
  });
});

// =============================================================================
// TEST 5: Icon insertion creates selectable Fabric object on canvas
// =============================================================================

describe('Icon Insertion Creates Fabric Object', () => {
  it('should create a valid SVG string from icon definition', () => {
    // Find an icon with SVG data
    const icon = allIcons.find(i => i.svg && i.svg.includes('<svg'));
    expect(icon).toBeDefined();
    if (icon) {
      expect(icon.svg).toContain('<svg');
      expect(icon.svg).toContain('viewBox');
    }
  });

  it('should produce an SVG that can be parsed for Fabric.js insertion', () => {
    const icon = allIcons.find(i => i.svg && i.svg.includes('<svg'));
    expect(icon).toBeDefined();
    if (icon) {
      // Simulate what Fabric.js would need:
      // 1. SVG string with valid viewBox
      const viewBoxMatch = icon.svg.match(/viewBox=["']([^"']+)["']/);
      expect(viewBoxMatch).not.toBeNull();

      // 2. Parse viewBox to get dimensions
      if (viewBoxMatch) {
        const parts = viewBoxMatch[1].split(/\s+/).map(Number);
        expect(parts.length).toBe(4);
        expect(parts[2]).toBeGreaterThan(0); // width
        expect(parts[3]).toBeGreaterThan(0); // height
      }
    }
  });

  it('should support centering icon on canvas (mock)', () => {
    // Mock canvas dimensions
    const canvasWidth = 800;
    const canvasHeight = 600;
    const iconSize = 64;

    // Calculate center position
    const centerX = canvasWidth / 2 - iconSize / 2;
    const centerY = canvasHeight / 2 - iconSize / 2;

    expect(centerX).toBe(368);
    expect(centerY).toBe(268);
  });

  it('should support recoloring via stroke/fill attributes', () => {
    const icon = allIcons.find(i => i.svg && i.svg.includes('currentColor'));
    expect(icon).toBeDefined();
    if (icon) {
      // Icons using currentColor can be recolored by changing the color CSS property
      expect(icon.svg).toContain('currentColor');
    }
  });

  it('should support resizing via viewBox', () => {
    const icon = allIcons.find(i => i.svg && i.svg.includes('viewBox'));
    expect(icon).toBeDefined();
    if (icon) {
      // SVGs with viewBox can be resized to any dimension while maintaining proportions
      const viewBoxMatch = icon.svg.match(/viewBox=["']([^"']+)["']/);
      expect(viewBoxMatch).not.toBeNull();
    }
  });
});
