/**
 * IconPicker Component
 *
 * Main component for browsing and selecting icons from unified icon libraries.
 * Features search, category filtering, grid display, preview, and recent icons.
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { IconSearch } from './IconSearch';
import { IconGrid } from './IconGrid';
import { IconPreview } from './IconPreview';
// Note: IconPicker.css was removed - using inline styles instead
import {
  searchAllIcons,
  getTotalIconCount,
  iconLibraries,
  healthIconsList,
  scienceIconsList,
  iconParkList,
  scienceBrandsList,
  type UnifiedIconResult,
} from '@/lib/illustration/lib/icons';
import {
  generateIconFromQuery,
  isAIGenerationAvailable,
  type GenerationResult,
} from '@/lib/illustration/lib/icons/generateIcon';
import { createSimpleIconSvg } from '@/lib/illustration/lib/icons';

// =============================================================================
// TYPES
// =============================================================================

export interface IconPickerProps {
  /** Callback when an icon is selected */
  onSelectIcon: (icon: UnifiedIconResult, svgContent: string) => void;
  /** Initial category to display */
  initialCategory?: string;
  /** Whether the picker is visible */
  isOpen?: boolean;
  /** Callback when picker is closed */
  onClose?: () => void;
  /** Custom width */
  width?: number | string;
  /** Custom class name */
  className?: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const RECENT_ICONS_KEY = 'finnish-recent-icons';
const MAX_RECENT_ICONS = 20;

const CATEGORIES = [
  { id: 'all', name: 'All', color: '#6b7280' },
  { id: 'medical', name: 'Medical', color: '#ef4444' },
  { id: 'science', name: 'Science', color: '#22c55e' },
  { id: 'general', name: 'General', color: '#3b82f6' },
  { id: 'brands', name: 'Brands', color: '#f59e0b' },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getRecentIcons(): string[] {
  try {
    const stored = localStorage.getItem(RECENT_ICONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function addRecentIcon(iconId: string): void {
  try {
    const recent = getRecentIcons().filter((id) => id !== iconId);
    recent.unshift(iconId);
    localStorage.setItem(
      RECENT_ICONS_KEY,
      JSON.stringify(recent.slice(0, MAX_RECENT_ICONS))
    );
  } catch {
    // Ignore localStorage errors
  }
}

function getAllIcons(): UnifiedIconResult[] {
  const all: UnifiedIconResult[] = [];

  // Add health icons
  for (const icon of healthIconsList) {
    all.push({
      id: `health-${icon.id}`,
      name: icon.name,
      category: icon.category,
      keywords: icon.keywords,
      library: 'health',
      component: icon.component,
    });
  }

  // Add science icons
  for (const icon of scienceIconsList) {
    all.push({
      id: `science-${icon.id}`,
      name: icon.name,
      category: icon.category,
      keywords: icon.keywords,
      library: 'science',
      component: icon.component,
    });
  }

  // Add Icon Park icons
  for (const icon of iconParkList) {
    all.push({
      id: `iconpark-${icon.id}`,
      name: icon.name,
      category: icon.category,
      keywords: icon.keywords,
      library: 'iconpark',
      component: icon.component,
    });
  }

  // Add simple icons (brands)
  for (const icon of scienceBrandsList) {
    all.push({
      id: `simple-${icon.id}`,
      name: icon.name,
      category: icon.category,
      keywords: icon.keywords,
      library: 'simple',
      slug: icon.slug,
      hex: icon.hex,
    });
  }

  return all;
}

function filterIconsByCategory(icons: UnifiedIconResult[], category: string): UnifiedIconResult[] {
  if (category === 'all') return icons;

  return icons.filter((icon) => {
    switch (category) {
      case 'medical':
        return icon.library === 'health' ||
          ['anatomy', 'equipment', 'diagnostics', 'conditions', 'services', 'biology'].includes(icon.category);
      case 'science':
        return icon.library === 'science' || icon.library === 'iconpark' ||
          ['laboratory', 'data', 'physics', 'chemistry', 'astronomy', 'math', 'nature', 'technology'].includes(icon.category);
      case 'general':
        return icon.library === 'iconpark' &&
          !['biology', 'laboratory'].includes(icon.category);
      case 'brands':
        return icon.library === 'simple';
      default:
        return true;
    }
  });
}

async function extractSvgContent(icon: UnifiedIconResult): Promise<string> {
  // For AI-generated icons with inline SVG
  if (icon.svg) {
    return icon.svg;
  }

  // For simple icons, generate SVG directly
  if (icon.library === 'simple' && icon.slug) {
    return createSimpleIconSvg(icon.slug, 64, 'currentColor') || '';
  }

  // For component-based icons, we need to render and extract
  if (icon.component) {
    const React = await import('react');
    const ReactDOMServer = await import('react-dom/server');
    const element = React.createElement(icon.component, { size: 64 });
    return ReactDOMServer.renderToStaticMarkup(element);
  }

  return '';
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const IconPicker: React.FC<IconPickerProps> = ({
  onSelectIcon,
  initialCategory = 'all',
  isOpen = true,
  onClose,
  width = 400,
  className = '',
}) => {
  // State
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredIcon, setHoveredIcon] = useState<UnifiedIconResult | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<UnifiedIconResult | null>(null);
  const [showRecent, setShowRecent] = useState(false);
  const [recentIconIds, setRecentIconIds] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Load recent icons on mount
  useEffect(() => {
    setRecentIconIds(getRecentIcons());
  }, []);

  // Get all icons
  const allIcons = useMemo(() => getAllIcons(), []);

  // Get icon counts
  const iconCounts = useMemo(() => getTotalIconCount(), []);

  // Filter and search icons
  const displayedIcons = useMemo(() => {
    // Show recent icons
    if (showRecent) {
      return recentIconIds
        .map((id) => allIcons.find((icon) => icon.id === id))
        .filter((icon): icon is UnifiedIconResult => icon !== undefined);
    }

    // Search mode
    if (searchQuery.trim()) {
      return searchAllIcons(searchQuery);
    }

    // Category filter
    return filterIconsByCategory(allIcons, selectedCategory);
  }, [allIcons, searchQuery, selectedCategory, showRecent, recentIconIds]);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setShowRecent(false);
  }, []);

  // Handle category change
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setShowRecent(false);
    setSelectedIcon(null);
  }, []);

  // Handle icon click
  const handleIconClick = useCallback((icon: UnifiedIconResult) => {
    setSelectedIcon(icon);
  }, []);

  // Handle icon hover
  const handleIconHover = useCallback((icon: UnifiedIconResult | null) => {
    setHoveredIcon(icon);
  }, []);

  // Handle insert
  const handleInsert = useCallback(async (icon: UnifiedIconResult) => {
    try {
      const svgContent = await extractSvgContent(icon);
      addRecentIcon(icon.id);
      setRecentIconIds(getRecentIcons());
      onSelectIcon(icon, svgContent);
    } catch (error) {
      console.error('Failed to extract SVG:', error);
    }
  }, [onSelectIcon]);

  // Handle copy SVG
  const handleCopySvg = useCallback((_svg: string) => {
    // SVG copied to clipboard - could show toast notification
  }, []);

  // Toggle recent icons
  const handleToggleRecent = useCallback(() => {
    setShowRecent(!showRecent);
    setSearchQuery('');
  }, [showRecent]);

  // Handle AI icon generation
  const handleAIGenerate = useCallback(async () => {
    if (!searchQuery.trim() || !isAIGenerationAvailable()) {
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const result: GenerationResult = await generateIconFromQuery(searchQuery, {
        size: 64,
        style: 'outline',
      });

      if (!result.svg) {
        setGenerationError('Failed to generate icon. Please try again.');
        return;
      }

      // Create a synthetic icon result for the generated icon
      const generatedIcon: UnifiedIconResult = {
        id: `ai-generated-${Date.now()}`,
        name: searchQuery,
        category: 'ai-generated',
        keywords: [searchQuery.toLowerCase()],
        library: 'tabler', // Use tabler as placeholder for generated icons
        svg: result.svg,
      };

      // Select and insert the generated icon
      setSelectedIcon(generatedIcon);
      await handleInsert(generatedIcon);
    } catch (error) {
      console.error('AI generation failed:', error);
      setGenerationError(error instanceof Error ? error.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  }, [searchQuery, handleInsert]);

  // Check if should show AI generation button
  const showAIGenerateButton =
    searchQuery.trim() &&
    displayedIcons.length === 0 &&
    isAIGenerationAvailable();

  if (!isOpen) return null;

  const previewIcon = hoveredIcon || selectedIcon;

  return (
    <div
      className={`icon-picker ${className}`}
      style={{ width: typeof width === 'number' ? `${width}px` : width }}
    >
      {/* Header */}
      <div className="icon-picker-header">
        <div className="icon-picker-title-row">
          <h3 className="icon-picker-title">Icon Library</h3>
          <span className="icon-picker-count">{iconCounts.total} icons</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="icon-picker-close"
            title="Close"
            aria-label="Close icon picker"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Search */}
      <div className="icon-picker-search-wrapper">
        <IconSearch
          onSearch={handleSearch}
          resultCount={searchQuery ? displayedIcons.length : undefined}
          placeholder="Search all icons..."
          debounceMs={200}
        />
      </div>

      {/* Quick Access */}
      <div className="icon-picker-quick-access">
        <button
          onClick={handleToggleRecent}
          className={`icon-picker-quick-btn ${showRecent ? 'active' : ''}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Recent ({recentIconIds.length})
        </button>
      </div>

      {/* Category Tabs */}
      {!searchQuery && !showRecent && (
        <div className="icon-picker-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`icon-picker-tab ${selectedCategory === cat.id ? 'active' : ''}`}
              style={{ '--tab-color': cat.color } as React.CSSProperties}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Library Info */}
      {!searchQuery && !showRecent && (
        <div className="icon-picker-library-info">
          {Object.entries(iconLibraries).map(([key, lib]) => (
            <span
              key={key}
              className="icon-picker-library-badge"
              title={lib.description}
            >
              {lib.name}: {iconCounts.byLibrary[key] || 0}
            </span>
          ))}
        </div>
      )}

      {/* Icon Grid */}
      <div className="icon-picker-grid-wrapper">
        <IconGrid
          icons={displayedIcons}
          onIconClick={handleIconClick}
          onIconHover={handleIconHover}
          selectedIconId={selectedIcon?.id}
          columns={5}
          iconSize={64}
          showNames={true}
          emptyMessage={
            showRecent
              ? 'No recent icons. Select an icon to add it here.'
              : searchQuery
              ? `No icons matching "${searchQuery}"`
              : 'No icons in this category'
          }
          emptyAction={
            showAIGenerateButton
              ? {
                  label: isGenerating
                    ? 'Generating...'
                    : 'Generate AI Icon',
                  onClick: handleAIGenerate,
                  disabled: isGenerating,
                }
              : undefined
          }
          error={generationError}
        />
      </div>

      {/* Preview Panel */}
      <div className="icon-picker-preview-wrapper">
        <IconPreview
          icon={previewIcon}
          onCopySvg={handleCopySvg}
          onInsert={handleInsert}
        />
      </div>

      {/* Help Text */}
      <div className="icon-picker-help">
        Click to select, then Insert to add to canvas
      </div>
    </div>
  );
};

export default IconPicker;
