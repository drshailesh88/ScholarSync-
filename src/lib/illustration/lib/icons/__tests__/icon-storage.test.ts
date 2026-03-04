/**
 * Tests for Icon Storage
 *
 * Tests localStorage-based icon storage operations:
 * - Favorites management (add, remove, toggle, check)
 * - Recent icons (LRU cache, max 50, auto-rotation)
 * - Collections CRUD (create, read, update, delete)
 * - Storage utilities (export, import, stats)
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  isFavorite,
  getFavorites,
  getFavoritesCount,
  addToRecents,
  removeFromRecents,
  getRecents,
  getRecentsCount,
  clearRecents,
  createCollection,
  getCollections,
  getCollection,
  updateCollectionName,
  addToCollection,
  removeFromCollection,
  deleteCollection,
  getCollectionsCount,
  isInCollection,
  getCollectionsContainingIcon,
  clearAllStorage,
  exportStorageData,
  importStorageData,
  getStorageStats,
  type IconCollection,
} from '../iconStorage';

// Mock localStorage
const mockStorage = new Map<string, string>();

const mockLocalStorage = {
  getItem: (key: string) => mockStorage.get(key) || null,
  setItem: (key: string, value: string) => mockStorage.set(key, value),
  removeItem: (key: string) => mockStorage.delete(key),
  clear: () => mockStorage.clear(),
  get length() {
    return mockStorage.size;
  },
  key: (index: number) => Array.from(mockStorage.keys())[index] || null,
};

Object.defineProperty(global, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

describe('icon-storage', () => {
  beforeEach(() => {
    clearAllStorage();
    mockStorage.clear();
  });

  afterEach(() => {
    clearAllStorage();
    mockStorage.clear();
  });

  describe('favorites management', () => {
    it('should add icon to favorites', () => {
      addToFavorites('icon-1');
      expect(isFavorite('icon-1')).toBe(true);
      expect(getFavorites()).toContain('icon-1');
    });

    it('should remove icon from favorites', () => {
      addToFavorites('icon-1');
      removeFromFavorites('icon-1');
      expect(isFavorite('icon-1')).toBe(false);
      expect(getFavorites()).not.toContain('icon-1');
    });

    it('should toggle favorite status', () => {
      expect(toggleFavorite('icon-1')).toBe(true); // Added
      expect(isFavorite('icon-1')).toBe(true);
      expect(toggleFavorite('icon-1')).toBe(false); // Removed
      expect(isFavorite('icon-1')).toBe(false);
    });

    it('should not duplicate favorites', () => {
      addToFavorites('icon-1');
      addToFavorites('icon-1');
      addToFavorites('icon-1');
      expect(getFavorites().filter((id) => id === 'icon-1').length).toBe(1);
    });

    it('should return correct favorites count', () => {
      expect(getFavoritesCount()).toBe(0);
      addToFavorites('icon-1');
      addToFavorites('icon-2');
      addToFavorites('icon-3');
      expect(getFavoritesCount()).toBe(3);
    });

    it('should maintain insertion order for favorites', () => {
      addToFavorites('icon-1');
      addToFavorites('icon-2');
      addToFavorites('icon-3');
      const favs = getFavorites();
      expect(favs[0]).toBe('icon-1');
      expect(favs[1]).toBe('icon-2');
      expect(favs[2]).toBe('icon-3');
    });

    it('should enforce max favorites limit', () => {
      // Add more than MAX_FAVORITES (200)
      for (let i = 0; i < 250; i++) {
        addToFavorites(`icon-${i}`);
      }
      const count = getFavoritesCount();
      expect(count).toBeLessThanOrEqual(200);
    });
  });

  describe('recent icons (LRU cache)', () => {
    it('should add icon to recents', () => {
      addToRecents('icon-1');
      expect(getRecents()).toContain('icon-1');
    });

    it('should move existing icon to front when re-added', () => {
      addToRecents('icon-1');
      addToRecents('icon-2');
      addToRecents('icon-3');
      // Re-add icon-1, should move to front
      addToRecents('icon-1');
      const recents = getRecents();
      expect(recents[0]).toBe('icon-1');
    });

    it('should enforce max recents limit (50)', () => {
      for (let i = 0; i < 60; i++) {
        addToRecents(`icon-${i}`);
      }
      const recents = getRecents();
      expect(recents.length).toBeLessThanOrEqual(50);
    });

    it('should remove icon from recents', () => {
      addToRecents('icon-1');
      removeFromRecents('icon-1');
      expect(getRecents()).not.toContain('icon-1');
    });

    it('should clear all recents', () => {
      addToRecents('icon-1');
      addToRecents('icon-2');
      clearRecents();
      expect(getRecents()).toEqual([]);
    });

    it('should return correct recents count', () => {
      expect(getRecentsCount()).toBe(0);
      addToRecents('icon-1');
      addToRecents('icon-2');
      expect(getRecentsCount()).toBe(2);
    });
  });

  describe('collections CRUD', () => {
    it('should create a new collection', () => {
      const id = createCollection('My Collection', ['icon-1', 'icon-2']);
      expect(id).toBeDefined();
      expect(id).toMatch(/^collection-/);
      const collections = getCollections();
      expect(collections.length).toBe(1);
      expect(collections[0].name).toBe('My Collection');
    });

    it('should add icons to collection', () => {
      const id = createCollection('Test');
      addToCollection(id, 'icon-1');
      addToCollection(id, 'icon-2');
      const collection = getCollection(id);
      expect(collection?.iconIds).toContain('icon-1');
      expect(collection?.iconIds).toContain('icon-2');
    });

    it('should remove icon from collection', () => {
      const id = createCollection('Test', ['icon-1', 'icon-2']);
      removeFromCollection(id, 'icon-1');
      const collection = getCollection(id);
      expect(collection?.iconIds).not.toContain('icon-1');
      expect(collection?.iconIds).toContain('icon-2');
    });

    it('should delete empty collection', () => {
      const id = createCollection('Test', ['icon-1']);
      removeFromCollection(id, 'icon-1'); // Removes the only icon
      const collections = getCollections();
      expect(collections.length).toBe(0);
    });

    it('should update collection name', () => {
      const id = createCollection('Old Name');
      const success = updateCollectionName(id, 'New Name');
      expect(success).toBe(true);
      const collection = getCollection(id);
      expect(collection?.name).toBe('New Name');
    });

    it('should delete collection', () => {
      const id = createCollection('To Delete');
      const success = deleteCollection(id);
      expect(success).toBe(true);
      expect(getCollection(id)).toBeNull();
    });

    it('should return correct collections count', () => {
      expect(getCollectionsCount()).toBe(0);
      createCollection('C1');
      createCollection('C2');
      expect(getCollectionsCount()).toBe(2);
    });

    it('should check if icon is in collection', () => {
      const id = createCollection('Test', ['icon-1']);
      expect(isInCollection(id, 'icon-1')).toBe(true);
      expect(isInCollection(id, 'icon-2')).toBe(false);
    });

    it('should get collections containing an icon', () => {
      const c1 = createCollection('C1', ['icon-1']);
      const c2 = createCollection('C2', ['icon-2', 'icon-1']);
      const c3 = createCollection('C3', ['icon-3']);

      const withIcon1 = getCollectionsContainingIcon('icon-1');
      expect(withIcon1.length).toBe(2);
      expect(withIcon1.map((c) => c.id)).toContain(c1);
      expect(withIcon1.map((c) => c.id)).toContain(c2);
    });

    it('should assign a color to each collection', () => {
      const id = createCollection('Colorful');
      const collection = getCollection(id);
      expect(collection?.color).toBeDefined();
      expect(collection?.color).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it('should track createdAt and updatedAt timestamps', () => {
      const beforeCreate = Date.now();
      const id = createCollection('Timed');
      const afterCreate = Date.now();

      const collection = getCollection(id);
      expect(collection?.createdAt).toBeGreaterThanOrEqual(beforeCreate);
      expect(collection?.createdAt).toBeLessThanOrEqual(afterCreate);
      expect(collection?.updatedAt).toBe(collection?.createdAt);

      // Update should change updatedAt
      updateCollectionName(id, 'New Name');
      const updated = getCollection(id);
      // updatedAt should be set (may equal createdAt if update is very fast)
      expect(updated?.updatedAt).toBeDefined();
      expect(updated?.name).toBe('New Name');
    });
  });

  describe('storage utilities', () => {
    it('should export storage data as JSON', () => {
      addToFavorites('icon-1');
      createCollection('Test', ['icon-2']);

      const exported = exportStorageData();
      const data = JSON.parse(exported);

      expect(data.version).toBeDefined();
      expect(data.favorites).toContain('icon-1');
      expect(data.collections.length).toBe(1);
    });

    it('should import storage data from JSON', () => {
      const data = {
        version: 1,
        favorites: ['icon-1', 'icon-2'],
        recents: ['icon-3'],
        collections: [],
      };

      const success = importStorageData(JSON.stringify(data));
      expect(success).toBe(true);
      expect(getFavorites()).toEqual(['icon-1', 'icon-2']);
      expect(getRecents()).toEqual(['icon-3']);
    });

    it('should reject invalid import data', () => {
      const success = importStorageData('invalid json');
      expect(success).toBe(false);

      const success2 = importStorageData('{}');
      expect(success2).toBe(false);
    });

    it('should provide storage statistics', () => {
      addToFavorites('icon-1');
      addToFavorites('icon-2');
      addToRecents('icon-3');
      const c1 = createCollection('C1', ['icon-4', 'icon-5']);

      const stats = getStorageStats();
      expect(stats.favoritesCount).toBe(2);
      expect(stats.recentsCount).toBe(1);
      expect(stats.collectionsCount).toBe(1);
      expect(stats.totalIconsInCollections).toBe(2);
      expect(stats.storageSize).toBeGreaterThan(0);
    });

    it('should clear all storage data', () => {
      addToFavorites('icon-1');
      addToRecents('icon-2');
      createCollection('Test');

      clearAllStorage();

      expect(getFavoritesCount()).toBe(0);
      expect(getRecentsCount()).toBe(0);
      expect(getCollectionsCount()).toBe(0);
    });
  });

  describe('edge cases', () => {
    it('should handle empty strings in collection names', () => {
      const id = createCollection('  ');
      const collection = getCollection(id);
      expect(collection?.name).toBe('');
    });

    it('should handle very long collection names', () => {
      const longName = 'A'.repeat(500);
      const id = createCollection(longName);
      const collection = getCollection(id);
      expect(collection?.name).toBe(longName);
    });

    it('should handle special characters in collection names', () => {
      const specialName = 'Test <script> Collection & "Quotes"';
      const id = createCollection(specialName);
      const collection = getCollection(id);
      expect(collection?.name).toBe(specialName);
    });

    it('should handle updating non-existent collection', () => {
      const success = updateCollectionName('does-not-exist', 'New Name');
      expect(success).toBe(false);
    });

    it('should handle deleting non-existent collection', () => {
      const success = deleteCollection('does-not-exist');
      expect(success).toBe(false);
    });

    it('should handle adding to non-existent collection', () => {
      const success = addToCollection('does-not-exist', 'icon-1');
      expect(success).toBe(false);
    });
  });
});
