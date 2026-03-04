/**
 * IconPreview Component
 *
 * Shows a larger preview of the hovered/selected icon with details.
 * Displays icon name, library source, keywords, and copy SVG button.
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import type { UnifiedIconResult } from '../../lib/icons';
import { createSimpleIconSvg } from '../../lib/icons';

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
};

const libraryNames: Record<string, string> = {
  tabler: 'Tabler Icons',
  health: 'Health Icons',
  science: 'Science Icons',
  iconpark: 'Icon Park',
  simple: 'Simple Icons',
};

// =============================================================================
// COMPONENT
// =============================================================================

export const IconPreview: React.FC<IconPreviewProps> = ({
  icon,
  onCopySvg,
  onInsert,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [svgContent, setSvgContent] = useState<string>('');
  const iconContainerRef = useRef<HTMLDivElement>(null);

  // Extract SVG content when icon changes
  useEffect(() => {
    if (!icon) {
      setSvgContent('');
      return;
    }

    // For simple icons, generate SVG from slug
    if (icon.library === 'simple' && icon.slug) {
      const svg = createSimpleIconSvg(icon.slug, 48);
      setSvgContent(svg || '');
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
            clone.setAttribute('width', '48');
            clone.setAttribute('height', '48');
            setSvgContent(clone.outerHTML);
          }
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [icon]);

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

  return (
    <div className={`icon-preview ${className}`}>
      {/* Icon Display */}
      <div className="icon-preview-icon" ref={iconContainerRef}>
        {IconComponent ? (
          <IconComponent size={48} />
        ) : icon.library === 'simple' && icon.slug ? (
          <div
            dangerouslySetInnerHTML={{
              __html: createSimpleIconSvg(icon.slug, 48, `#${icon.hex || '000'}`) || '',
            }}
          />
        ) : null}
      </div>

      {/* Details */}
      <div className="icon-preview-details">
        <div className="icon-preview-header">
          <h4 className="icon-preview-name">{icon.name}</h4>
          <span
            className="icon-preview-library"
            style={{
              backgroundColor: `${libraryColor}20`,
              color: libraryColor,
            }}
          >
            {libraryNames[icon.library] || icon.library}
          </span>
        </div>

        <span className="icon-preview-category">{icon.category}</span>

        {icon.keywords.length > 0 && (
          <div className="icon-preview-keywords">
            {icon.keywords.slice(0, 5).map((keyword) => (
              <span key={keyword} className="icon-preview-keyword">
                {keyword}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="icon-preview-actions">
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
    </div>
  );
};

export default IconPreview;
