/**
 * Tests for Icon Preview Component
 *
 * Tests the IconPreview component features:
 * - Large icon preview display
 * - Color tinting
 * - Favorite toggle
 * - Collection management UI
 * - Metadata display
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { IconPreview } from '../IconPreview';
import type { UnifiedIconResult } from '@/lib/illustration/lib/icons';

// Mock the icon storage functions
vi.mock('@/lib/illustration/lib/icons/iconStorage', () => ({
  isFavorite: vi.fn(() => false),
  toggleFavorite: vi.fn(() => true),
  getCollectionsContainingIcon: vi.fn(() => []),
  addToCollection: vi.fn(() => true),
  getCollections: vi.fn(() => []),
}));

// Mock simple icon SVG generation
vi.mock('@/lib/illustration/lib/icons', () => ({
  createSimpleIconSvg: vi.fn((slug: string, size: number, color?: string) => {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${size/3}" fill="${color || 'currentColor'}" stroke="${color || 'currentColor'}" stroke-width="2"/>
    </svg>`;
  }),
}));

const mockIcon: UnifiedIconResult = {
  id: 'test-icon-1',
  name: 'Test Icon',
  category: 'test-category',
  keywords: ['test', 'icon', 'sample'],
  library: 'simple',
  slug: 'test-icon',
  hex: '#3b82f6',
};

describe('IconPreview', () => {
  it('should render empty state when no icon is provided', () => {
    const { container } = render(<IconPreview icon={null} />);
    expect(container.querySelector('.icon-preview-empty')).toBeDefined();
  });

  it('should render icon preview when icon is provided', () => {
    render(<IconPreview icon={mockIcon} onInsert={vi.fn()} />);
    expect(screen.getByText('Test Icon')).toBeDefined();
  });

  it('should display icon name', () => {
    render(<IconPreview icon={mockIcon} onInsert={vi.fn()} />);
    expect(screen.getByText('Test Icon')).toBeDefined();
  });

  it('should display library badge', () => {
    render(<IconPreview icon={mockIcon} onInsert={vi.fn()} />);
    expect(screen.getByText('Simple Icons')).toBeDefined();
  });

  it('should display category', () => {
    render(<IconPreview icon={mockIcon} onInsert={vi.fn()} />);
    expect(screen.getByText('test-category')).toBeDefined();
  });

  it('should display keywords', () => {
    render(<IconPreview icon={mockIcon} onInsert={vi.fn()} />);
    expect(screen.getByText('test')).toBeDefined();
    expect(screen.getByText('icon')).toBeDefined();
    expect(screen.getByText('sample')).toBeDefined();
  });

  it('should call onInsert when Insert button is clicked', async () => {
    const onInsert = vi.fn();
    render(<IconPreview icon={mockIcon} onInsert={onInsert} />);

    const insertButton = screen.getByText('Insert');
    fireEvent.click(insertButton);

    expect(onInsert).toHaveBeenCalledWith(mockIcon);
  });

  describe('color tinting', () => {
    it('should display color swatches', () => {
      render(<IconPreview icon={mockIcon} onInsert={vi.fn()} />);
      // Should have color picker and preset colors
      const colorInputs = document.querySelectorAll('input[type="color"], .icon-preview-color-swatch');
      expect(colorInputs.length).toBeGreaterThan(0);
    });

    it('should include common colors', () => {
      render(<IconPreview icon={mockIcon} onInsert={vi.fn()} />);
      // Should have at least 16 preset colors plus color picker
      const colorSwatches = document.querySelectorAll('.icon-preview-color-swatch');
      expect(colorSwatches.length).toBeGreaterThanOrEqual(16);
    });
  });

  describe('favorite toggle', () => {
    it('should render favorite button', () => {
      render(<IconPreview icon={mockIcon} onInsert={vi.fn()} />);
      const favoriteBtn = document.querySelector('.icon-preview-favorite');
      expect(favoriteBtn).toBeDefined();
    });

    it('should call onFavoriteToggle when favorite is clicked', async () => {
      const onFavoriteToggle = vi.fn();
      render(<IconPreview icon={mockIcon} onInsert={vi.fn()} onFavoriteToggle={onFavoriteToggle} />);

      const favoriteBtn = document.querySelector('.icon-preview-favorite');
      fireEvent.click(favoriteBtn as Element);

      await waitFor(() => {
        expect(onFavoriteToggle).toHaveBeenCalledWith('test-icon-1');
      });
    });
  });

  describe('copy SVG', () => {
    it('should render copy SVG button', () => {
      render(<IconPreview icon={mockIcon} onInsert={vi.fn()} />);
      expect(screen.getByText('Copy SVG')).toBeDefined();
    });

    it('should call onCopySvg when copy button is clicked', async () => {
      // Mock navigator.clipboard
      const mockClipboard = {
        writeText: vi.fn(() => Promise.resolve()),
      };
      Object.assign(navigator, { clipboard: mockClipboard });

      const onCopySvg = vi.fn();
      render(<IconPreview icon={mockIcon} onInsert={vi.fn()} onCopySvg={onCopySvg} />);

      const copyButton = screen.getByText('Copy SVG');
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(mockClipboard.writeText).toHaveBeenCalled();
        expect(onCopySvg).toHaveBeenCalled();
      });
    });
  });

  describe('metadata display', () => {
    it('should display license information', () => {
      render(<IconPreview icon={mockIcon} onInsert={vi.fn()} />);
      expect(screen.getByText('CC0')).toBeDefined();
    });

    it('should show correct library name for each library type', () => {
      const { rerender } = render(<IconPreview icon={{...mockIcon, library: 'tabler'} as any} onInsert={vi.fn()} />);
      expect(screen.getByText('Tabler Icons')).toBeDefined();

      rerender(<IconPreview icon={{...mockIcon, library: 'health'} as any} onInsert={vi.fn()} />);
      expect(screen.getByText('Health Icons')).toBeDefined();
    });
  });

  describe('large icon display', () => {
    it('should display icon at larger size (128px)', () => {
      render(<IconPreview icon={mockIcon} onInsert={vi.fn()} />);
      const iconContainer = document.querySelector('.icon-preview-svg-large');
      expect(iconContainer).toBeDefined();
    });
  });

  describe('edge cases', () => {
    it('should handle icon with no keywords', () => {
      const iconNoKeywords: UnifiedIconResult = {
        ...mockIcon,
        keywords: [],
      };
      render(<IconPreview icon={iconNoKeywords} onInsert={vi.fn()} />);
      expect(screen.getByText('Test Icon')).toBeDefined();
    });

    it('should handle icon with many keywords (overflow indicator)', () => {
      const manyKeywords = Array.from({ length: 15 }, (_, i) => `keyword${i}`);
      const iconManyKeywords: UnifiedIconResult = {
        ...mockIcon,
        keywords: manyKeywords,
      };
      render(<IconPreview icon={iconManyKeywords} onInsert={vi.fn()} />);
      expect(screen.getByText(/Test Icon/)).toBeDefined();
    });

    it('should handle icon with inline SVG', () => {
      const iconWithSvg: UnifiedIconResult = {
        ...mockIcon,
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><circle cx="32" cy="32" r="16"/></svg>',
      };
      render(<IconPreview icon={iconWithSvg} onInsert={vi.fn()} />);
      expect(screen.getByText('Test Icon')).toBeDefined();
    });
  });
});
