/**
 * Icon Manifest
 *
 * A lightweight metadata index of all icons across internal and external sources.
 * This file lists all icons with metadata (name, category, tags, domain) WITHOUT
 * embedding SVG data, enabling fast search and lazy loading of actual icon content.
 */

import { allIcons, type IconDomain } from './icons';
import { healthIconsFull } from './icons-external/health-icons-full';

// =============================================================================
// TYPES
// =============================================================================

export interface IconManifestEntry {
  id: string;
  name: string;
  domain: IconDomain | 'external';
  category: string;
  tags: string[];
  source: 'internal' | 'health-icons-full' | 'bioicons' | 'scidraw' | 'iconpark' | 'simple' | 'science';
  /** Whether SVG data is available inline or needs lazy loading */
  lazyLoad: boolean;
}

export interface IconCategoryInfo {
  name: string;
  domain: IconDomain | 'external';
  count: number;
}

// =============================================================================
// MANIFEST GENERATION
// =============================================================================

let _manifestCache: IconManifestEntry[] | null = null;
let _categoryCache: Map<string, IconCategoryInfo> | null = null;
let _domainCountCache: Map<string, number> | null = null;

/**
 * Build the icon manifest from all sources.
 * Cached after first call for performance.
 */
export function getIconManifest(): IconManifestEntry[] {
  if (_manifestCache) return _manifestCache;

  const manifest: IconManifestEntry[] = [];

  // Index all internal icons (from data/icons/)
  for (const icon of allIcons) {
    manifest.push({
      id: icon.id,
      name: icon.name,
      domain: icon.domain,
      category: icon.category,
      tags: icon.tags,
      source: 'internal',
      lazyLoad: false,
    });
  }

  // Index external health icons
  for (const icon of healthIconsFull) {
    manifest.push({
      id: `health-full-${icon.componentName}`,
      name: icon.displayName,
      domain: 'medicine' as IconDomain,
      category: icon.category || 'health',
      tags: icon.keywords,
      source: 'health-icons-full',
      lazyLoad: true,
    });
  }

  _manifestCache = manifest;
  return manifest;
}

/**
 * Get all unique categories with icon counts.
 */
export function getManifestCategories(): IconCategoryInfo[] {
  if (_categoryCache) return Array.from(_categoryCache.values());

  const manifest = getIconManifest();
  const categories = new Map<string, IconCategoryInfo>();

  for (const entry of manifest) {
    const key = entry.category.toLowerCase();
    const existing = categories.get(key);
    if (existing) {
      existing.count++;
    } else {
      categories.set(key, {
        name: entry.category,
        domain: entry.domain,
        count: 1,
      });
    }
  }

  _categoryCache = categories;
  return Array.from(categories.values()).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get icon counts per domain.
 */
export function getManifestDomainCounts(): Record<string, number> {
  if (_domainCountCache) return Object.fromEntries(_domainCountCache);

  const manifest = getIconManifest();
  const counts = new Map<string, number>();

  for (const entry of manifest) {
    const domain = entry.domain;
    counts.set(domain, (counts.get(domain) || 0) + 1);
  }

  _domainCountCache = counts;
  return Object.fromEntries(counts);
}

/**
 * Search the manifest by query (name, category, tags).
 * This is a lightweight search over metadata only - no SVG loading.
 */
export function searchManifest(query: string, options?: {
  domain?: IconDomain;
  category?: string;
  limit?: number;
}): IconManifestEntry[] {
  const q = query.toLowerCase().trim();
  const manifest = getIconManifest();

  let results = manifest;

  // Domain filter
  if (options?.domain) {
    results = results.filter(e => e.domain === options.domain);
  }

  // Category filter
  if (options?.category) {
    const cat = options.category.toLowerCase();
    results = results.filter(e => e.category.toLowerCase() === cat);
  }

  // Query filter
  if (q) {
    results = results.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  // Limit
  if (options?.limit) {
    results = results.slice(0, options.limit);
  }

  return results;
}

/**
 * Get the total count of all indexed icons.
 */
export function getManifestTotalCount(): number {
  return getIconManifest().length;
}

/**
 * Get icons filtered by domain from the manifest.
 */
export function getManifestByDomain(domain: IconDomain): IconManifestEntry[] {
  return getIconManifest().filter(e => e.domain === domain);
}

/**
 * Get icons filtered by category from the manifest.
 */
export function getManifestByCategory(category: string): IconManifestEntry[] {
  const cat = category.toLowerCase();
  return getIconManifest().filter(e => e.category.toLowerCase() === cat);
}

/**
 * Clear the manifest cache (useful for testing or after adding icons).
 */
export function clearManifestCache(): void {
  _manifestCache = null;
  _categoryCache = null;
  _domainCountCache = null;
}
