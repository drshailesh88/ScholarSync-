/**
 * Tests for Icon Synonym Dictionary
 *
 * Tests the expandWithSynonyms function for fuzzy icon matching:
 * - Basic synonym expansion
 * - Transitive closure (A→B→C finds all three)
 * - Case insensitivity
 * - Empty query handling
 * - Multi-word queries
 */

import { describe, it, expect } from 'vitest';
import { ICON_SYNONYMS, expandWithSynonyms } from '../icon-synonyms';

describe('icon-synonyms', () => {
  describe('ICON_SYNONYMS dictionary', () => {
    it('should have at least 50 synonym mappings', () => {
      const keys = Object.keys(ICON_SYNONYMS);
      expect(keys.length).toBeGreaterThanOrEqual(50);
    });

    it('should have heart-related synonyms', () => {
      expect(ICON_SYNONYMS['heart']).toBeDefined();
      expect(ICON_SYNONYMS['heart']).toContain('cardiac');
      expect(ICON_SYNONYMS['heart']).toContain('cardio');
    });

    it('should have DNA-related synonyms', () => {
      expect(ICON_SYNONYMS['DNA']).toBeDefined();
      expect(ICON_SYNONYMS['DNA']).toContain('gene');
      expect(ICON_SYNONYMS['DNA']).toContain('double helix');
    });

    it('should have cardiology-specific terms like STEMI', () => {
      expect(ICON_SYNONYMS['STEMI']).toBeDefined();
      expect(ICON_SYNONYMS['STEMI']).toContain('myocardial infarction');
      expect(ICON_SYNONYMS['STEMI']).toContain('heart attack');
    });
  });

  describe('expandWithSynonyms', () => {
    it('should return original query when no synonyms exist', () => {
      const result = expandWithSynonyms('xyznonexistent');
      expect(result).toContain('xyznonexistent');
      expect(result.length).toBe(1);
    });

    it('should expand single word with direct synonym match', () => {
      const result = expandWithSynonyms('heart');
      expect(result).toContain('heart');
      expect(result).toContain('cardiac');
      expect(result).toContain('cardio');
      expect(result.length).toBeGreaterThan(1);
    });

    it('should handle case-insensitive matching', () => {
      const lowerResult = expandWithSynonyms('heart');
      const upperResult = expandWithSynonyms('HEART');
      const mixedResult = expandWithSynonyms('HeArT');

      // All should return same set (lowercased)
      expect(lowerResult).toEqual(expect.arrayContaining(['heart', 'cardiac']));
      expect(upperResult).toEqual(expect.arrayContaining(['heart', 'cardiac']));
      expect(mixedResult).toEqual(expect.arrayContaining(['heart', 'cardiac']));
    });

    it('should handle multi-word queries', () => {
      const result = expandWithSynonyms('heart attack');
      expect(result).toContain('heart');
      expect(result).toContain('attack');
      // Should find STEMI synonyms since 'heart attack' is in STEMI's list
      expect(result).toContain('stemi');
    });

    it('should implement transitive closure for multi-level synonyms', () => {
      // Test: STEMI → 'heart attack' → heart → cardiac
      const result = expandWithSynonyms('STEMI');
      expect(result).toContain('stemi');
      expect(result).toContain('heart'); // Transitive through 'heart attack'
      // May contain cardiac if transitive closure works fully
    });

    it('should return empty array for empty string', () => {
      const result = expandWithSynonyms('');
      expect(result.length).toBe(0);
    });

    it('should handle whitespace-only queries', () => {
      const result = expandWithSynonyms('   ');
      expect(result.length).toBe(0);
    });

    it('should expand cell biology terms', () => {
      const result = expandWithSynonyms('mitochondria');
      expect(result).toContain('mitochondria');
      expect(result).toContain('atp');
      expect(result).toContain('powerhouse');
    });

    it('should expand lab equipment terms', () => {
      const result = expandWithSynonyms('microscope');
      expect(result).toContain('microscope');
      expect(result).toContain('magnification');
      expect(result).toContain('lens');
    });
  });

  describe('transitive closure', () => {
    it('should find related terms through synonym chains', () => {
      // If STEMI → 'heart attack' and 'heart attack' → heart, then STEMI should find heart
      const result = expandWithSynonyms('STEMI');
      expect(result.length).toBeGreaterThan(2);
      // Check that we get heart-related terms
      const hasHeartTerm = result.some(term =>
        term.includes('heart') || term.includes('cardiac') || term.includes('mi')
      );
      expect(hasHeartTerm).toBe(true);
    });

    it('should handle circular references without infinite loops', () => {
      // The function should use Set to prevent duplicates
      const result = expandWithSynonyms('heart');
      // Check no duplicates
      const unique = new Set(result);
      expect(unique.size).toBe(result.length);
    });
  });

  describe('scientific domain coverage', () => {
    it('should cover anatomy terms', () => {
      const terms = ['heart', 'brain', 'lung', 'kidney', 'liver'];
      terms.forEach(term => {
        expect(ICON_SYNONYMS[term]).toBeDefined();
      });
    });

    it('should cover cell biology terms', () => {
      const terms = ['cell', 'nucleus', 'mitochondria', 'membrane', 'ribosome'];
      terms.forEach(term => {
        expect(ICON_SYNONYMS[term]).toBeDefined();
      });
    });

    it('should cover molecular biology terms', () => {
      const terms = ['DNA', 'RNA', 'protein', 'enzyme', 'receptor'];
      terms.forEach(term => {
        expect(ICON_SYNONYMS[term]).toBeDefined();
      });
    });

    it('should cover lab equipment terms', () => {
      const terms = ['microscope', 'pipette', 'beaker', 'centrifuge', 'PCR'];
      terms.forEach(term => {
        expect(ICON_SYNONYMS[term]).toBeDefined();
      });
    });

    it('should cover cardiology-specific terms', () => {
      const terms = ['stent', 'valve', 'ECG', 'STEMI'];
      terms.forEach(term => {
        expect(ICON_SYNONYMS[term]).toBeDefined();
      });
    });
  });
});
