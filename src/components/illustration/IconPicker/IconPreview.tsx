/**
 * IconPreview Component
 *
 * Shows a larger preview of the hovered/selected icon with details.
 * Displays icon name, library source, keywords, license, and collection management.
 * Supports color tinting and favorite toggling.
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import type { UnifiedIconResult } from '@/lib/illustration/lib/icons';
import { createSimpleIconSvg } from '@/lib/illustration/lib/icons';
import {
  isFavorite,
  toggleFavorite,
  getCollectionsContainingIcon,
  addToCollection,
  getCollections,
  type IconCollection,
} from '@/lib/illustration/lib/icons/iconStorage';

// =============================================================================
// TYPES
// =============================================================================

export interface IconPreviewProps {
  /** The icon to preview */
  icon: UnifiedIconResult | null;
  /** Callback when copy SVG is clicked */
  onCopySvg?: (svg: string) => void;
  /** Callback when insert is clicked */
  onInsert?: (icon: UnifiedIconResult) => void;
  /** Callback when favorite is toggled */
  onFavoriteToggle?: (iconId: string) => void;
  /** Custom class name */
  className?: string;
}

// =============================================================================
// LIBRARY COLORS
// =============================================================================

const libraryColors: Record<string, string> = {
  tabler: '#3b82f6',
  health: '#ef4444',
  science: '#22c55e',
  iconpark: '#8b5cf6',
  simple: '#f59e0b',
  bioicons: '#10b981',
  'bioicons-full': '#059669',
  scidraw: '#0891b2',
};

const libraryNames: Record<string, string> = {
  tabler: 'Tabler Icons',
  health: 'Health Icons',
  science: 'Science Icons',
  iconpark: 'Icon Park',
  simple: 'Simple Icons',
  bioicons: 'Bioicons',
  'bioicons-full': 'Bioicons Full',
  scidraw: 'SciDraw',
  'ai-generated': 'AI Generated',
};

const libraryLicenses: Record<string, string> = {
  tabler: 'MIT',
  health: 'CC0',
  science: 'MIT',
  iconpark: 'Apache 2.0',
  simple: 'CC0',
  bioicons: 'CC0/MIT/CC-BY',
  'bioicons-full': 'CC0/MIT/CC-BY/CC-BY-SA',
  scidraw: 'CC-BY',
  'ai-generated': 'Generated',
};

// =============================================================================
// COMPONENT
// =============================================================================

export const IconPreview: React.FC<IconPreviewProps> = ({
  icon,
  onCopySvg,
  onInsert,
  onFavoriteToggle,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [svgContent, setSvgContent] = useState<string>('');
  const [tintedSvgContent, setTintedSvgContent] = useState<string>('');
  const [iconColor, setIconColor] = useState<string>('#000000');
  const [isFav, setIsFav] = useState(false);
  const [showCollectionMenu, setShowCollectionMenu] = useState(false);
  const [collections, setCollections] = useState<IconCollection[]>([]);
  const [iconCollections, setIconCollections] = useState<IconCollection[]>([]);
  const iconContainerRef = useRef<HTMLDivElement>(null);

  // Update favorite state when icon changes
  useEffect(() => {
    if (icon) {
      setIsFav(isFavorite(icon.id));
      setIconCollections(getCollectionsContainingIcon(icon.id));
    }
  }, [icon]);

  // Extract SVG content when icon changes
  useEffect(() => {
    if (!icon) {
      setSvgContent('');
      setTintedSvgContent('');
      return;
    }

    // For icons with inline SVG
    if (icon.svg) {
      setSvgContent(icon.svg);
      applyTint(icon.svg, iconColor);
      return;
    }

    // For simple icons, generate SVG from slug
    if (icon.library === 'simple' && icon.slug) {
      const svg = createSimpleIconSvg(icon.slug, 128);
      setSvgContent(svg || '');
      if (svg) applyTint(svg, iconColor);
      return;
    }

    // For React component icons, render and extract SVG
    if (icon.component && iconContainerRef.current) {
      // Wait for render, then extract SVG
      const timer = setTimeout(() => {
        if (iconContainerRef.current) {
          const svgEl = iconContainerRef.current.querySelector('svg');
          if (svgEl) {
            // Clone and clean up the SVG
            const clone = svgEl.cloneNode(true) as SVGElement;
            clone.setAttribute('width', '128');
            clone.setAttribute('height', '128');
            const svg = clone.outerHTML;
            setSvgContent(svg);
            applyTint(svg, iconColor);
          }
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [icon, iconColor]);

  /**
   * Apply color tint to SVG by replacing currentColor
   */
  function applyTint(svg: string, color: string): void {
    let tinted = svg.replace(/currentColor/g, color);
    // Also replace fill and stroke attributes
    tinted = tinted.replace(/\s+fill="[^"]*"/g, ` fill="${color}"`);
    tinted = tinted.replace(/\s+stroke="[^"]*"/g, ` stroke="${color}"`);
    setTintedSvgContent(tinted);
  }

  /**
   * Handle color change
   */
  const handleColorChange = useCallback((color: string) => {
    setIconColor(color);
    if (svgContent) {
      applyTint(svgContent, color);
    }
  }, [svgContent]);

  /**
   * Handle favorite toggle
   */
  const handleFavoriteToggle = useCallback(() => {
    if (!icon) return;

    const newState = toggleFavorite(icon.id);
    setIsFav(newState);
    onFavoriteToggle?.(icon.id);
  }, [icon, onFavoriteToggle]);

  /**
   * Refresh collections list
   */
  const refreshCollections = useCallback(() => {
    setCollections(getCollections());
    if (icon) {
      setIconCollections(getCollectionsContainingIcon(icon.id));
    }
  }, [icon]);

  /**
   * Open collection menu
   */
  const handleOpenCollectionMenu = useCallback(() => {
    refreshCollections();
    setShowCollectionMenu(true);
  }, [refreshCollections]);

  /**
   * Add icon to collection
   */
  const handleAddToCollection = useCallback((collectionId: string) => {
    if (!icon) return;

    addToCollection(collectionId, icon.id);
    refreshCollections();
    setShowCollectionMenu(false);
  }, [icon, refreshCollections]);

  /**
   * Remove icon from collection
   */
  const handleRemoveFromCollection = useCallback((collectionId: string) => {
    if (!icon) return;

    const { removeFromCollection: remove } = require('@/lib/illustration/lib/icons/iconStorage');
    remove(collectionId, icon.id);
    refreshCollections();
  }, [icon, refreshCollections]);

  // Handle copy SVG
  const handleCopySvg = useCallback(async () => {
    if (!svgContent) return;

    try {
      await navigator.clipboard.writeText(svgContent);
      setCopied(true);
      onCopySvg?.(svgContent);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy SVG:', err);
    }
  }, [svgContent, onCopySvg]);

  // Handle insert
  const handleInsert = useCallback(() => {
    if (icon) {
      onInsert?.(icon);
    }
  }, [icon, onInsert]);

  // Empty state
  if (!icon) {
    return (
      <div className={`icon-preview empty ${className}`}>
        <div className="icon-preview-empty-content">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="icon-preview-empty-icon"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <p className="icon-preview-empty-text">Hover over an icon to preview</p>
        </div>
      </div>
    );
  }

  const IconComponent = icon.component;
  const libraryColor = libraryColors[icon.library] || '#6b7280';
  const license = icon.license || libraryLicenses[icon.library] || 'Unknown';

  // Common colors for tinting
  const commonColors = [
    '#000000', '#374151', '#6b7280', '#ef4444', '#f97316',
    '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#14b8a6',
    '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7',
    '#ec4899',
  ];

  return (
    <div className={`icon-preview ${className}`}>
      {/* Icon Display with larger preview */}
      <div className="icon-preview-icon" ref={iconContainerRef}>
        {tintedSvgContent ? (
          <div
            dangerouslySetInnerHTML={{ __html: tintedSvgContent }}
            className="icon-preview-svg-large"
          />
        ) : IconComponent ? (
          <IconComponent size={128} color={iconColor} />
        ) : icon.library === 'simple' && icon.slug ? (
          <div
            dangerouslySetInnerHTML={{
              __html: createSimpleIconSvg(icon.slug, 128, iconColor) || '',
            }}
          />
        ) : null}
      </div>

      {/* Color Tinting */}
      <div className="icon-preview-colors">
        <span className="icon-preview-color-label">Color:</span>
        {commonColors.map((color) => (
          <button
            key={color}
            className={`icon-preview-color-swatch ${iconColor === color ? 'active' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorChange(color)}
            title={color}
          />
        ))}
        <input
          type="color"
          value={iconColor}
          onChange={(e) => handleColorChange(e.target.value)}
          className="icon-preview-color-picker"
          title="Custom color"
        />
      </div>

      {/* Details */}
      <div className="icon-preview-details">
        <div className="icon-preview-header">
          <h4 className="icon-preview-name">{icon.name}</h4>
          <button
            className={`icon-preview-favorite ${isFav ? 'active' : ''}`}
            onClick={handleFavoriteToggle}
            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        <div className="icon-preview-meta">
          <span
            className="icon-preview-library"
            style={{
              backgroundColor: `${libraryColor}20`,
              color: libraryColor,
            }}
          >
            {libraryNames[icon.library] || icon.library}
          </span>
          <span className="icon-preview-category">{icon.category}</span>
          <span className="icon-preview-license">{license}</span>
        </div>

        {icon.keywords.length > 0 && (
          <div className="icon-preview-keywords">
            {icon.keywords.slice(0, 8).map((keyword) => (
              <span key={keyword} className="icon-preview-keyword">
                {keyword}
              </span>
            ))}
            {icon.keywords.length > 8 && (
              <span className="icon-preview-keyword-more">+{icon.keywords.length - 8}</span>
            )}
          </div>
        )}

        {/* Collections */}
        {iconCollections.length > 0 && (
          <div className="icon-preview-collections">
            <span className="icon-preview-collections-label">In:</span>
            {iconCollections.map((collection) => (
              <span
                key={collection.id}
                className="icon-preview-collection-tag"
                style={{ backgroundColor: `${collection.color}20`, color: collection.color }}
              >
                {collection.name}
                <button
                  className="icon-preview-collection-remove"
                  onClick={() => handleRemoveFromCollection(collection.id)}
                  title="Remove from collection"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="icon-preview-actions">
          <button
            onClick={handleOpenCollectionMenu}
            className="icon-preview-btn icon-preview-btn-secondary"
            title="Add to collection"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add to Collection
          </button>

          <button
            onClick={handleCopySvg}
            className="icon-preview-btn icon-preview-btn-secondary"
            disabled={!svgContent}
            title="Copy SVG to clipboard"
          >
            {copied ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy SVG
              </>
            )}
          </button>

          <button
            onClick={handleInsert}
            className="icon-preview-btn icon-preview-btn-primary"
            title="Insert icon on canvas"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Insert
          </button>
        </div>
      </div>

      {/* Collection Menu */}
      {showCollectionMenu && (
        <div className="icon-preview-collection-menu-overlay" onClick={() => setShowCollectionMenu(false)}>
          <div className="icon-preview-collection-menu" onClick={(e) => e.stopPropagation()}>
            <div className="icon-preview-collection-menu-header">
              <h5>Add to Collection</h5>
              <button onClick={() => setShowCollectionMenu(false)}>×</button>
            </div>
            {collections.length === 0 ? (
              <div className="icon-preview-collection-menu-empty">
                <p>No collections yet.</p>
                <button
                  onClick={() => {
                    const name = prompt('Enter collection name:');
                    if (name) {
                      const { createCollection } = require('@/lib/illustration/lib/icons/iconStorage');
                      const id = createCollection(name);
                      handleAddToCollection(id);
                    }
                  }}
                  className="icon-preview-collection-menu-create"
                >
                  + Create Collection
                </button>
              </div>
            ) : (
              <div className="icon-preview-collection-menu-list">
                {collections.map((collection) => (
                  <button
                    key={collection.id}
                    className="icon-preview-collection-menu-item"
                    onClick={() => handleAddToCollection(collection.id)}
                  >
                    <span
                      className="icon-preview-collection-menu-dot"
                      style={{ backgroundColor: collection.color }}
                    />
                    {collection.name}
                  </button>
                ))}
                <button
                  onClick={() => {
                    const name = prompt('Enter collection name:');
                    if (name) {
                      const { createCollection } = require('@/lib/illustration/lib/icons/iconStorage');
                      const id = createCollection(name);
                      handleAddToCollection(id);
                    }
                  }}
                  className="icon-preview-collection-menu-new"
                >
                  + New Collection
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconPreview;
