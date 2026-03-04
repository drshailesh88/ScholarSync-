/**
 * Icon Storage Module
 *
 * Manages user preferences for icons including favorites, recent icons,
 * and custom collections using localStorage with schema versioning.
 */

// =============================================================================
// TYPES
// =============================================================================

export interface IconCollection {
  id: string;
  name: string;
  iconIds: string[];
  createdAt: number;
  updatedAt: number;
  color?: string; // For visual distinction
}

export interface StorageSchema {
  version: number;
  favorites: string[];
  recents: string[];
  collections: IconCollection[];
}

// =============================================================================
// CONSTANTS
// =============================================================================

const STORAGE_KEY = 'finnish-icon-storage';
const SCHEMA_VERSION = 1;
const MAX_RECENT_ICONS = 50;
const MAX_FAVORITES = 200;

// Collection colors for visual distinction
const COLLECTION_COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#f59e0b', // amber
  '#eab308', // yellow
  '#84cc16', // lime
  '#22c55e', // green
  '#10b981', // emerald
  '#14b8a6', // teal
  '#06b6d4', // cyan
  '#0ea5e9', // sky
  '#3b82f6', // blue
  '#6366f1', // indigo
  '#8b5cf6', // violet
  '#a855f7', // purple
  '#d946ef', // fuchsia
  '#ec4899', // pink,
];

// =============================================================================
// STORAGE HELPERS
// =============================================================================

/**
 * Get storage data with default values
 */
function getStorageData(): StorageSchema {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return getEmptyStorage();
    }

    const data: StorageSchema = JSON.parse(stored);

    // Handle version migrations
    if (data.version < SCHEMA_VERSION) {
      return migrateStorage(data);
    }

    return data;
  } catch (error) {
    console.warn('Failed to read icon storage:', error);
    return getEmptyStorage();
  }
}

/**
 * Get empty storage object
 */
function getEmptyStorage(): StorageSchema {
  return {
    version: SCHEMA_VERSION,
    favorites: [],
    recents: [],
    collections: [],
  };
}

/**
 * Migrate storage data to current schema version
 */
function migrateStorage(oldData: StorageSchema): StorageSchema {
  // Version 0 to 1: Add collections field
  if (oldData.version === 0) {
    return {
      version: SCHEMA_VERSION,
      favorites: oldData.favorites || [],
      recents: oldData.recents || [],
      collections: [],
    };
  }

  return getEmptyStorage();
}

/**
 * Save storage data
 */
function setStorageData(data: StorageSchema): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save icon storage:', error);
  }
}

/**
 * Generate a unique collection ID
 */
function generateCollectionId(): string {
  return `collection-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get a random collection color
 */
function getCollectionColor(): string {
  return COLLECTION_COLORS[Math.floor(Math.random() * COLLECTION_COLORS.length)];
}

// =============================================================================
// FAVORITES
// =============================================================================

/**
 * Add an icon to favorites
 */
export function addToFavorites(iconId: string): void {
  const data = getStorageData();

  if (!data.favorites.includes(iconId)) {
    data.favorites.push(iconId);
    // Enforce max limit (remove oldest)
    if (data.favorites.length > MAX_FAVORITES) {
      data.favorites = data.favorites.slice(-MAX_FAVORITES);
    }
    setStorageData(data);
  }
}

/**
 * Remove an icon from favorites
 */
export function removeFromFavorites(iconId: string): void {
  const data = getStorageData();
  data.favorites = data.favorites.filter((id) => id !== iconId);
  setStorageData(data);
}

/**
 * Check if an icon is in favorites
 */
export function isFavorite(iconId: string): boolean {
  const data = getStorageData();
  return data.favorites.includes(iconId);
}

/**
 * Toggle favorite status
 */
export function toggleFavorite(iconId: string): boolean {
  if (isFavorite(iconId)) {
    removeFromFavorites(iconId);
    return false;
  } else {
    addToFavorites(iconId);
    return true;
  }
}

/**
 * Get all favorite icon IDs
 */
export function getFavorites(): string[] {
  const data = getStorageData();
  return [...data.favorites];
}

/**
 * Get favorites count
 */
export function getFavoritesCount(): number {
  return getStorageData().favorites.length;
}

// =============================================================================
// RECENT ICONS (LRU Cache)
// =============================================================================

/**
 * Add an icon to recents (moves to front if already exists)
 */
export function addToRecents(iconId: string): void {
  const data = getStorageData();

  // Remove if already exists (to move to front)
  data.recents = data.recents.filter((id) => id !== iconId);

  // Add to front
  data.recents.unshift(iconId);

  // Enforce max limit
  if (data.recents.length > MAX_RECENT_ICONS) {
    data.recents = data.recents.slice(0, MAX_RECENT_ICONS);
  }

  setStorageData(data);
}

/**
 * Remove an icon from recents
 */
export function removeFromRecents(iconId: string): void {
  const data = getStorageData();
  data.recents = data.recents.filter((id) => id !== iconId);
  setStorageData(data);
}

/**
 * Get all recent icon IDs (most recent first)
 */
export function getRecents(): string[] {
  const data = getStorageData();
  return [...data.recents];
}

/**
 * Get recents count
 */
export function getRecentsCount(): number {
  return getStorageData().recents.length;
}

/**
 * Clear all recent icons
 */
export function clearRecents(): void {
  const data = getStorageData();
  data.recents = [];
  setStorageData(data);
}

// =============================================================================
// COLLECTIONS
// =============================================================================

/**
 * Create a new collection
 */
export function createCollection(name: string, iconIds: string[] = []): string {
  const data = getStorageData();

  const collection: IconCollection = {
    id: generateCollectionId(),
    name: name.trim(),
    iconIds: [...iconIds],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    color: getCollectionColor(),
  };

  data.collections.push(collection);
  setStorageData(data);

  return collection.id;
}

/**
 * Get all collections
 */
export function getCollections(): IconCollection[] {
  const data = getStorageData();
  return [...data.collections].sort((a, b) => b.updatedAt - a.updatedAt);
}

/**
 * Get a collection by ID
 */
export function getCollection(collectionId: string): IconCollection | null {
  const data = getStorageData();
  return data.collections.find((c) => c.id === collectionId) || null;
}

/**
 * Update collection name
 */
export function updateCollectionName(collectionId: string, newName: string): boolean {
  const data = getStorageData();
  const collection = data.collections.find((c) => c.id === collectionId);

  if (!collection) {
    return false;
  }

  collection.name = newName.trim();
  collection.updatedAt = Date.now();
  setStorageData(data);

  return true;
}

/**
 * Add an icon to a collection
 */
export function addToCollection(collectionId: string, iconId: string): boolean {
  const data = getStorageData();
  const collection = data.collections.find((c) => c.id === collectionId);

  if (!collection) {
    return false;
  }

  if (!collection.iconIds.includes(iconId)) {
    collection.iconIds.push(iconId);
    collection.updatedAt = Date.now();
    setStorageData(data);
  }

  return true;
}

/**
 * Remove an icon from a collection
 */
export function removeFromCollection(collectionId: string, iconId: string): boolean {
  const data = getStorageData();
  const collection = data.collections.find((c) => c.id === collectionId);

  if (!collection) {
    return false;
  }

  collection.iconIds = collection.iconIds.filter((id) => id !== iconId);
  collection.updatedAt = Date.now();

  // Delete collection if empty
  if (collection.iconIds.length === 0) {
    data.collections = data.collections.filter((c) => c.id !== collectionId);
  }

  setStorageData(data);

  return true;
}

/**
 * Delete a collection
 */
export function deleteCollection(collectionId: string): boolean {
  const data = getStorageData();
  const initialLength = data.collections.length;

  data.collections = data.collections.filter((c) => c.id !== collectionId);

  if (data.collections.length < initialLength) {
    setStorageData(data);
    return true;
  }

  return false;
}

/**
 * Get collection count
 */
export function getCollectionsCount(): number {
  return getStorageData().collections.length;
}

/**
 * Check if an icon is in a specific collection
 */
export function isInCollection(collectionId: string, iconId: string): boolean {
  const collection = getCollection(collectionId);
  return collection ? collection.iconIds.includes(iconId) : false;
}

/**
 * Get all collections containing an icon
 */
export function getCollectionsContainingIcon(iconId: string): IconCollection[] {
  const data = getStorageData();
  return data.collections.filter((c) => c.iconIds.includes(iconId));
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Clear all icon storage data
 */
export function clearAllStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Export storage data as JSON (for backup)
 */
export function exportStorageData(): string {
  const data = getStorageData();
  return JSON.stringify(data, null, 2);
}

/**
 * Import storage data from JSON (for restore)
 */
export function importStorageData(jsonString: string): boolean {
  try {
    const data: StorageSchema = JSON.parse(jsonString);

    // Validate basic structure
    if (!data.version || !Array.isArray(data.favorites) || !Array.isArray(data.recents)) {
      return false;
    }

    // Migrate to current version if needed
    const migratedData = data.version < SCHEMA_VERSION ? migrateStorage(data) : data;

    setStorageData(migratedData);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get storage statistics
 */
export function getStorageStats(): {
  favoritesCount: number;
  recentsCount: number;
  collectionsCount: number;
  totalIconsInCollections: number;
  storageSize: number;
} {
  const data = getStorageData();
  const totalIconsInCollections = data.collections.reduce(
    (sum, c) => sum + c.iconIds.length,
    0
  );

  return {
    favoritesCount: data.favorites.length,
    recentsCount: data.recents.length,
    collectionsCount: data.collections.length,
    totalIconsInCollections,
    storageSize: JSON.stringify(data).length,
  };
}
