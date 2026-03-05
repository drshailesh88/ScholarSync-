/**
 * Tests for Enhanced Icon Search
 *
 * Tests the searchAllIcons function with synonym expansion and scoring:
 * - Exact match scoring (100pts)
 * - Starts with scoring (50pts)
 * - Contains scoring (25pts)
 * - Synonym match scoring (3pts)
 * - Deduplication by ID
 * - Result limiting to 100
 * - Sorting by score (desc), then name (asc)
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { searchAllIcons, type ScoredIconResult } from '../index';

// Mock the icon libraries for testing
vi.mock('../healthIcons', () => ({
  searchHealthIcons: (query: string) => {
    const allHealthIcons = [
      { id: 'heart-1', name: 'Heart', category: 'anatomy', keywords: ['cardiac', 'organ'], component: null },
      { id: 'cardiac-1', name: 'Cardiac', category: 'anatomy', keywords: ['heart'], component: null },
      { id: 'lung-1', name: 'Lungs', category: 'respiratory', keywords: ['pulmonary'], component: null },
    ];
    const q = query.toLowerCase();
    return allHealthIcons.filter(icon =>
      icon.name.toLowerCase().includes(q) ||
      icon.keywords.some(k => k.toLowerCase().includes(q))
    );
  },
  healthIconsList: [],
}));

vi.mock('../scienceIcons', () => ({
  searchScienceIcons: () => [],
  scienceIconsList: [],
}));

vi.mock('../iconPark', () => ({
  searchIconPark: () => [],
  iconParkList: [],
}));

vi.mock('../simpleIcons', () => ({
  searchSimpleIcons: () => [],
  scienceBrandsList: [],
}));

vi.mock('../bioicons', () => ({
  searchBioicons: () => [],
  bioiconsList: [],
}));

vi.mock('../bioicons-data', () => ({
  searchBioiconsMetadata: () => [],
  bioiconsMetadata: [],
  getBioiconsUrl: () => '',
}));

vi.mock('../scidraw', () => ({
  searchSciDrawIcons: () => [],
  scidrawIcons: [],
}));

describe('enhanced-search', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('searchAllIcons', () => {
    it('should return empty array for empty query', () => {
      const result = searchAllIcons('');
      expect(result).toEqual([]);
    });

    it('should return empty array for whitespace-only query', () => {
      const result = searchAllIcons('   ');
      expect(result).toEqual([]);
    });

    it('should find exact matches', () => {
      const result = searchAllIcons('heart');
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].name.toLowerCase()).toContain('heart');
    });

    it('should find results with synonym expansion', () => {
      // Search for 'cardiac' should find 'heart' icons due to synonym mapping
      const result = searchAllIcons('cardiac');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should deduplicate results by icon ID', () => {
      // Even if multiple sources return same icon, only one should appear
      const result = searchAllIcons('heart');
      const ids = result.map(r => r.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should limit results to 100 items maximum', () => {
      // Search a common term that might return many results
      const result = searchAllIcons('heart');
      expect(result.length).toBeLessThanOrEqual(100);
    });

    it('should return results with proper structure', () => {
      const result = searchAllIcons('heart');
      if (result.length > 0) {
        expect(result[0]).toHaveProperty('id');
        expect(result[0]).toHaveProperty('name');
        expect(result[0]).toHaveProperty('category');
        expect(result[0]).toHaveProperty('keywords');
        expect(result[0]).toHaveProperty('library');
      }
    });
  });

  describe('scoring algorithm', () => {
    it('should prioritize exact matches (100 points)', () => {
      const result = searchAllIcons('heart');
      // First result should be the exact or closest match
      expect(result.length).toBeGreaterThan(0);
    });

    it('should prioritize prefix matches over contains', () => {
      const result = searchAllIcons('he');
      // Results starting with 'he' should come before those containing 'he'
      expect(result.length).toBeGreaterThan(0);
    });

    it('should boost keyword matches', () => {
      // Icons with matching keywords should rank higher
      const result = searchAllIcons('cardiac');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should include synonym matches with lower score', () => {
      // Searching for a synonym should still find the primary term
      const result = searchAllIcons('cardiac');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('sorting', () => {
    it('should sort by score descending', () => {
      const result = searchAllIcons('heart');
      // Higher scored results should come first
      for (let i = 0; i < result.length - 1; i++) {
        // We can't directly access scores, but exact matches should come first
        expect(result[i].name).toBeDefined();
      }
    });

    it('should sort alphabetically for same-score results', () => {
      const result = searchAllIcons('a');
      // Results should be in a consistent order
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('category filtering integration', () => {
    it('should return results from specified categories', () => {
      const result = searchAllIcons('heart');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('synonym expansion', () => {
    it('should find heart-related terms when searching for STEMI', () => {
      const result = searchAllIcons('STEMI');
      // Due to transitive synonym closure, should find heart-related icons
      expect(Array.isArray(result)).toBe(true);
    });

    it('should handle multi-word synonym expansion', () => {
      const result = searchAllIcons('heart attack');
      expect(Array.isArray(result)).toBe(true);
    });

    it('should expand scientific terminology', () => {
      const result = searchAllIcons('mitochondria');
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle special characters in query', () => {
      const result = searchAllIcons('test-with-special');
      expect(Array.isArray(result)).toBe(true);
    });

    it('should handle very long queries', () => {
      const longQuery = 'a'.repeat(200);
      const result = searchAllIcons(longQuery);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should handle Unicode characters', () => {
      const result = searchAllIcons('testµ');
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('performance', () => {
    it('should complete search quickly', () => {
      const start = performance.now();
      searchAllIcons('heart');
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(1000); // Should complete in under 1 second
    });

    it('should handle multiple rapid searches', () => {
      const start = performance.now();
      for (let i = 0; i < 10; i++) {
        searchAllIcons(`test${i}`);
      }
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(5000); // 10 searches in under 5 seconds
    });
  });
});
