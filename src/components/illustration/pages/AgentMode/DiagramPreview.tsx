/**
 * DiagramPreview Component
 *
 * SVG preview component with:
 * - Safe SVG rendering
 * - Zoom controls (+/- buttons)
 * - Fit to view button
 * - Loading skeleton during generation
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAgentStore } from '@/stores/illustration/useAgentStore';

// Icons
const ZoomInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const ZoomOutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const FitIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 3H5a2 2 0 0 0-2 2v3" />
    <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
    <path d="M3 16v3a2 2 0 0 0 2 2h3" />
    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
);

interface LoadingSkeletonProps {}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = () => (
  <div style={styles.skeleton}>
    <div style={styles.skeletonRect} />
    <div style={{ ...styles.skeletonRect, width: '60%', marginTop: '12px' }} />
    <div style={{ ...styles.skeletonRect, width: '80%', marginTop: '12px' }} />
    <div style={styles.skeletonCircle} />
  </div>
);

interface DiagramPreviewProps {
  svg?: string;
  showControls?: boolean;
}

export const DiagramPreview: React.FC<DiagramPreviewProps> = ({
  svg,
  showControls = true
}) => {
  const [zoom, setZoom] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isLoading = useAgentStore((state) => state.isLoading);

  // Sanitize SVG content to prevent XSS
  const sanitizeSvg = useCallback((svgString: string): string => {
    // Remove potentially dangerous elements and attributes
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgElement = doc.querySelector('svg');

    if (!svgElement) return '';

    // Remove script tags and event handlers
    const scripts = svgElement.querySelectorAll('script');
    scripts.forEach(s => s.remove());

    // Remove event handler attributes
    const allElements = svgElement.querySelectorAll('*');
    allElements.forEach(el => {
      Array.from(el.attributes).forEach(attr => {
        if (attr.name.startsWith('on')) {
          el.removeAttribute(attr.name);
        }
      });
    });

    return svgElement.outerHTML;
  }, []);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 400));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 25));
  };

  const handleFitToView = () => {
    setZoom(100);
  };

  // Handle wheel zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -10 : 10;
        setZoom(prev => Math.max(25, Math.min(400, prev + delta)));
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  if (!svg && !isLoading) {
    return (
      <div style={styles.empty}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={styles.emptyIcon}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
        <p style={styles.emptyText}>No diagram generated yet</p>
      </div>
    );
  }

  if (isLoading && !svg) {
    return (
      <div style={styles.container}>
        <LoadingSkeleton />
      </div>
    );
  }

  const sanitizedSvg = svg ? sanitizeSvg(svg) : '';

  return (
    <div style={styles.wrapper}>
      <div
        ref={containerRef}
        style={styles.container}
      >
        <div
          ref={contentRef}
          style={{
            ...styles.content,
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'center center'
          }}
          dangerouslySetInnerHTML={{ __html: sanitizedSvg }}
        />
      </div>
      {showControls && (
        <div style={styles.controls}>
          <button
            onClick={handleZoomOut}
            style={styles.controlBtn}
            title="Zoom out"
            disabled={zoom <= 25}
          >
            <ZoomOutIcon />
          </button>
          <span style={styles.zoomLabel}>{zoom}%</span>
          <button
            onClick={handleZoomIn}
            style={styles.controlBtn}
            title="Zoom in"
            disabled={zoom >= 400}
          >
            <ZoomInIcon />
          </button>
          <div style={styles.separator} />
          <button
            onClick={handleFitToView}
            style={styles.controlBtn}
            title="Fit to view"
          >
            <FitIcon />
          </button>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-sm)'
  },
  container: {
    background: '#ffffff',
    borderRadius: '8px',
    padding: 'var(--spacing-md)',
    overflow: 'auto',
    minHeight: '200px',
    maxHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    transition: 'transform 0.2s ease',
    maxWidth: '100%'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-xs)',
    padding: 'var(--spacing-xs)',
    background: 'var(--bg-tertiary)',
    borderRadius: '6px'
  },
  controlBtn: {
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    borderRadius: '4px',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  zoomLabel: {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--text-secondary)',
    minWidth: '40px',
    textAlign: 'center'
  },
  separator: {
    width: '1px',
    height: '20px',
    background: 'var(--border-color)',
    margin: '0 var(--spacing-xs)'
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-xl)',
    background: 'var(--bg-tertiary)',
    borderRadius: '8px',
    minHeight: '200px'
  },
  emptyIcon: {
    width: '48px',
    height: '48px',
    color: 'var(--text-muted)',
    marginBottom: 'var(--spacing-md)',
    opacity: 0.5
  },
  emptyText: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--text-muted)'
  },
  skeleton: {
    width: '100%',
    padding: 'var(--spacing-lg)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--spacing-sm)'
  },
  skeletonRect: {
    width: '100%',
    height: '20px',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: '4px'
  },
  skeletonCircle: {
    width: '60px',
    height: '60px',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: '50%',
    marginTop: '16px'
  }
};

// Add shimmer animation (SSR-safe)
if (typeof window !== 'undefined') {
  const shimmerStyle = document.createElement('style');
  shimmerStyle.textContent = `
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `;
  document.head.appendChild(shimmerStyle);
}

export default DiagramPreview;
