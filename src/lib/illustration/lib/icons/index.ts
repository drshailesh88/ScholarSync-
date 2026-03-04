/**
 * Icons Module
 *
 * Unified icon library providing access to multiple icon sets:
 * - @tabler/icons-react: 4,000+ general purpose icons (MIT)
 * - healthicons-react: Medical and healthcare icons (CC0)
 * - @scienceicons/react: Open science platform icons (MIT)
 * - @icon-park/react: 2,400+ high-quality icons by ByteDance (Apache 2.0)
 * - simple-icons: Brand logos for science tools (CC0)
 *
 * @see https://tabler.io/icons
 * @see https://healthicons.org/
 * @see https://github.com/continuous-foundation/scienceicons
 * @see https://iconpark.oceanengine.com/
 * @see https://simpleicons.org/
 */

// Import commonly used icons from Tabler
import {
  // Drawing tools
  IconPencil,
  IconBrush,
  IconEraser,
  IconHighlight,
  IconPalette,
  IconColorPicker,

  // Shape tools
  IconSquare,
  IconCircle,
  IconTriangle,
  IconLine,
  IconPolygon,
  IconStar,

  // Transform tools
  IconRotate,
  IconFlipHorizontal,
  IconFlipVertical,
  IconResize,
  IconArrowsMove,
  IconCrop,

  // Layer tools
  IconStack,
  IconStackPush,
  IconStackPop,
  IconLayersSubtract,
  IconLayersUnion,

  // Alignment tools
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconBoxAlignTop,
  IconLayoutAlignMiddle,
  IconBoxAlignBottom,
  IconLayoutDistributeHorizontal,

  // Text tools
  IconTypography,
  IconBold,
  IconItalic,
  IconUnderline,
  IconSubscript,
  IconSuperscript,

  // File operations
  IconDownload,
  IconUpload,
  IconFileExport,
  IconFileImport,
  IconPrinter,
  IconShare,

  // Edit operations
  IconCopy,
  IconCut,
  IconClipboard,
  IconArrowBack,
  IconArrowForward,
  IconTrash,

  // View controls
  IconZoomIn,
  IconZoomOut,
  IconZoomReset,
  IconMaximize,
  IconGridDots,
  IconRuler,

  // Scientific icons
  IconAtom,
  IconDna,
  IconMicroscope,
  IconFlask,
  IconTestPipe,
  IconVirus,
  IconCell,
  IconHeart,
  IconBrain,
  IconLungs,
  IconBone,

  // Math/Physics
  IconMath,
  IconMathFunction,
  IconVariable,
  IconSum,
  IconInfinity,
  IconWaveSine,

  // Arrows and connectors
  IconArrowRight,
  IconArrowLeft,
  IconArrowUp,
  IconArrowDown,
  IconArrowsExchange,
  IconArrowBigRight,

  // UI elements
  IconMenu,
  IconSettings,
  IconHelp,
  IconInfoCircle,
  IconAlertCircle,
  IconCheck,
  IconX,
  IconPlus,
  IconMinus,
} from '@tabler/icons-react';
import type { Icon } from '@tabler/icons-react';

// TODO: Create icon picker component
// - Searchable icon grid
// - Category filtering
// - Recent icons section
// - Custom icon upload

// TODO: Implement custom scientific icon set
// - Biological structures (cells, organelles, molecules)
// - Chemical structures and bonds
// - Physical symbols and diagrams
// - Medical anatomy icons
// - Engineering symbols

// TODO: Add icon customization
// - Color picker for icons
// - Size adjustment
// - Stroke width control
// - Fill/outline toggle

// TODO: Create icon to SVG path converter
// - Extract paths from icon components
// - Convert to editable vector shapes
// - Maintain icon proportions

// TODO: Implement icon library management
// - Save favorite icons
// - Create custom icon collections
// - Import icon packs
// - Export icon collections

/**
 * Icon categories for organization
 */
export const iconCategories = {
  drawing: {
    name: 'Drawing Tools',
    icons: [IconPencil, IconBrush, IconEraser, IconHighlight, IconPalette, IconColorPicker],
  },
  shapes: {
    name: 'Shapes',
    icons: [IconSquare, IconCircle, IconTriangle, IconLine, IconPolygon, IconStar],
  },
  transform: {
    name: 'Transform',
    icons: [IconRotate, IconFlipHorizontal, IconFlipVertical, IconResize, IconArrowsMove, IconCrop],
  },
  layers: {
    name: 'Layers',
    icons: [IconStack, IconStackPush, IconStackPop, IconLayersSubtract, IconLayersUnion],
  },
  alignment: {
    name: 'Alignment',
    icons: [IconAlignLeft, IconAlignCenter, IconAlignRight, IconBoxAlignTop, IconLayoutAlignMiddle, IconBoxAlignBottom, IconLayoutDistributeHorizontal],
  },
  text: {
    name: 'Text',
    icons: [IconTypography, IconBold, IconItalic, IconUnderline, IconSubscript, IconSuperscript],
  },
  file: {
    name: 'File',
    icons: [IconDownload, IconUpload, IconFileExport, IconFileImport, IconPrinter, IconShare],
  },
  edit: {
    name: 'Edit',
    icons: [IconCopy, IconCut, IconClipboard, IconArrowBack, IconArrowForward, IconTrash],
  },
  view: {
    name: 'View',
    icons: [IconZoomIn, IconZoomOut, IconZoomReset, IconMaximize, IconGridDots, IconRuler],
  },
  science: {
    name: 'Science',
    icons: [IconAtom, IconDna, IconMicroscope, IconFlask, IconTestPipe, IconVirus, IconCell],
  },
  medical: {
    name: 'Medical',
    icons: [IconHeart, IconBrain, IconLungs, IconBone],
  },
  math: {
    name: 'Math & Physics',
    icons: [IconMath, IconMathFunction, IconVariable, IconSum, IconInfinity, IconWaveSine],
  },
  arrows: {
    name: 'Arrows',
    icons: [IconArrowRight, IconArrowLeft, IconArrowUp, IconArrowDown, IconArrowsExchange, IconArrowBigRight],
  },
  ui: {
    name: 'UI',
    icons: [IconMenu, IconSettings, IconHelp, IconInfoCircle, IconAlertCircle, IconCheck, IconX, IconPlus, IconMinus],
  },
};

/**
 * Default icon props for consistent styling
 */
export const defaultIconProps = {
  size: 24,
  stroke: 1.5,
  color: 'currentColor',
};

/**
 * Get icon by name (for dynamic icon rendering)
 */
export function getIconByName(name: string): Icon | null {
  const allIcons: Record<string, Icon> = {
    // Drawing tools
    pencil: IconPencil,
    brush: IconBrush,
    eraser: IconEraser,
    highlight: IconHighlight,
    palette: IconPalette,
    colorPicker: IconColorPicker,
    // Shapes
    square: IconSquare,
    circle: IconCircle,
    triangle: IconTriangle,
    line: IconLine,
    polygon: IconPolygon,
    star: IconStar,
    // Add more as needed...
  };

  return allIcons[name] || null;
}

// Re-export all icons for direct use
export {
  // Drawing tools
  IconPencil,
  IconBrush,
  IconEraser,
  IconHighlight,
  IconPalette,
  IconColorPicker,
  // Shape tools
  IconSquare,
  IconCircle,
  IconTriangle,
  IconLine,
  IconPolygon,
  IconStar,
  // Transform tools
  IconRotate,
  IconFlipHorizontal,
  IconFlipVertical,
  IconResize,
  IconArrowsMove,
  IconCrop,
  // Layer tools
  IconStack,
  IconStackPush,
  IconStackPop,
  IconLayersSubtract,
  IconLayersUnion,
  // Alignment tools
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconBoxAlignTop,
  IconLayoutAlignMiddle,
  IconBoxAlignBottom,
  IconLayoutDistributeHorizontal,
  // Text tools
  IconTypography,
  IconBold,
  IconItalic,
  IconUnderline,
  IconSubscript,
  IconSuperscript,
  // File operations
  IconDownload,
  IconUpload,
  IconFileExport,
  IconFileImport,
  IconPrinter,
  IconShare,
  // Edit operations
  IconCopy,
  IconCut,
  IconClipboard,
  IconArrowBack,
  IconArrowForward,
  IconTrash,
  // View controls
  IconZoomIn,
  IconZoomOut,
  IconZoomReset,
  IconMaximize,
  IconGridDots,
  IconRuler,
  // Scientific icons
  IconAtom,
  IconDna,
  IconMicroscope,
  IconFlask,
  IconTestPipe,
  IconVirus,
  IconCell,
  IconHeart,
  IconBrain,
  IconLungs,
  IconBone,
  // Math/Physics
  IconMath,
  IconMathFunction,
  IconVariable,
  IconSum,
  IconInfinity,
  IconWaveSine,
  // Arrows and connectors
  IconArrowRight,
  IconArrowLeft,
  IconArrowUp,
  IconArrowDown,
  IconArrowsExchange,
  IconArrowBigRight,
  // UI elements
  IconMenu,
  IconSettings,
  IconHelp,
  IconInfoCircle,
  IconAlertCircle,
  IconCheck,
  IconX,
  IconPlus,
  IconMinus,
};

// Re-export from other icon libraries (selective to avoid conflicts)
export {
  // Health Icons exports
  healthIconsList,
  healthIconCategories,
  searchHealthIcons,
  getHealthIconsByCategory,
  type HealthIconMeta,
} from './healthIcons';

export {
  // Science Icons exports
  scienceIconsList,
  scienceIconCategories,
  searchScienceIcons,
  getScienceIconsByCategory,
  type ScienceIconMeta,
  ArxivIcon,
  JupyterIcon,
  OrcidIcon,
  OpenAccessIcon,
  GithubIcon as ScienceGithubIcon,
  CcIcon,
  CcByIcon,
} from './scienceIcons';

export {
  // Icon Park exports
  iconParkList,
  iconParkCategories,
  searchIconPark,
  getIconParkByCategory,
  type IconParkMeta,
  IconParkBrain,
  IconParkCell,
  IconParkFlask,
  IconParkExperiment,
  IconParkMicroscope,
  IconParkHeart,
  IconParkLung,
  IconParkEarth,
  IconParkRadiation,
} from './iconPark';

export {
  // Simple Icons exports
  scienceBrandsList,
  simpleIconCategories,
  searchSimpleIcons,
  getSimpleIconsByCategory,
  getSimpleIcon,
  createSimpleIconSvg,
  getSimpleIconPath,
  type SimpleIconMeta,
  type SimpleIconData,
} from './simpleIcons';

export {
  // Bioicons exports (simple inline icons)
  bioiconsList,
  bioiconCategories,
  searchBioicons,
  getBioiconsByCategory,
  getBioiconById,
  bioiconToSvg,
  getBioiconCount,
  getBioiconCountsByCategory,
  type BioiconMeta,
} from './bioicons';

export {
  // Bioicons Full Library (1500+ icons loaded on-demand)
  bioiconsMetadata,
  bioiconCategories as bioiconsFullCategories,
  searchBioiconsMetadata,
  getBioiconsMetadataByCategory,
  getBioiconsUrl,
  getBioiconsMetadataCount,
  getBioiconsCountsByCategory,
  type BioiconEntry,
  type BioiconCategory,
} from './bioicons-data';

export {
  // SciDraw exports
  scidrawIcons,
  searchSciDrawIcons,
  getIconsByCategory as getSciDrawIconsByCategory,
  getCategories as getSciDrawCategories,
  getIconCount as getSciDrawIconCount,
  getIconById as getSciDrawIconById,
  toSvgString as scidrawToSvg,
  type SciDrawIcon,
} from './scidraw';

export {
  // AI Icon Generation exports
  generateIconFromQuery,
  isAIGenerationAvailable,
  clearIconCache,
  getCacheSize,
  type GenerationResult,
  type GenerationOptions,
} from './generateIcon';

export {
  // Icon Storage exports
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
} from './iconStorage';

// Import search functions from each library for unified search
import { searchHealthIcons, healthIconsList } from './healthIcons';
import { searchScienceIcons, scienceIconsList } from './scienceIcons';
import { searchIconPark, iconParkList } from './iconPark';
import { searchSimpleIcons, scienceBrandsList } from './simpleIcons';
import { searchBioicons, bioiconsList } from './bioicons';
import { searchBioiconsMetadata, bioiconsMetadata, getBioiconsUrl } from './bioicons-data';
import { searchSciDrawIcons, scidrawIcons } from './scidraw';
import { expandWithSynonyms } from '@/lib/illustration/data/icon-synonyms';

/**
 * Unified icon result from any library
 */
export interface UnifiedIconResult {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  library: 'tabler' | 'health' | 'science' | 'iconpark' | 'simple' | 'bioicons' | 'bioicons-full' | 'scidraw';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: React.ComponentType<any>;
  slug?: string; // For simple-icons
  hex?: string;  // For simple-icons brand color
  svg?: string;  // For bioicons/scidraw (inline SVG)
  viewBox?: string; // For bioicons/scidraw
  license?: string; // For bioicons/scidraw
  file?: string; // For bioicons-full (on-demand loading)
  url?: string; // For bioicons-full (URL to load SVG)
}

/**
 * Enhanced icon search with synonym expansion and scoring
 *
 * Scoring algorithm:
 * - Exact match on name: 100 points
 * - Starts with query: 50 points
 * - Contains query: 25 points
 * - Contains synonym term: 3 points per synonym match
 *
 * Results are deduplicated by ID, limited to 100, and sorted by score (desc), then name (asc).
 */
export interface ScoredIconResult extends UnifiedIconResult {
  score: number;
}

export function searchAllIcons(query: string): UnifiedIconResult[] {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    // Return empty result for empty query (could also return recent/popular)
    return [];
  }

  // Expand query with synonyms for fuzzy matching
  const expandedTerms = expandWithSynonyms(normalizedQuery);

  // Collect all library search results
  const allResults: UnifiedIconResult[] = [];

  // Search Health Icons
  const healthResults = searchHealthIcons(normalizedQuery);
  for (const icon of healthResults) {
    allResults.push({
      id: `health-${icon.id}`,
      name: icon.name,
      category: icon.category,
      keywords: icon.keywords,
      library: 'health',
      component: icon.component,
    });
  }

  // Search Science Icons
  const scienceResults = searchScienceIcons(normalizedQuery);
  for (const icon of scienceResults) {
    allResults.push({
      id: `science-${icon.id}`,
      name: icon.name,
      category: icon.category,
      keywords: icon.keywords,
      library: 'science',
      component: icon.component,
    });
  }

  // Search Icon Park
  const iconParkResults = searchIconPark(normalizedQuery);
  for (const icon of iconParkResults) {
    allResults.push({
      id: `iconpark-${icon.id}`,
      name: icon.name,
      category: icon.category,
      keywords: icon.keywords,
      library: 'iconpark',
      component: icon.component,
    });
  }

  // Search Simple Icons (brands)
  const simpleResults = searchSimpleIcons(normalizedQuery);
  for (const icon of simpleResults) {
    allResults.push({
      id: `simple-${icon.id}`,
      name: icon.name,
      category: icon.category,
      keywords: icon.keywords,
      library: 'simple',
      slug: icon.slug,
      hex: icon.hex,
    });
  }

  // Search Bioicons (simple inline icons)
  const bioiconsResults = searchBioicons(normalizedQuery);
  for (const icon of bioiconsResults) {
    allResults.push({
      id: `bioicons-${icon.id}`,
      name: icon.name,
      category: icon.category,
      keywords: icon.keywords,
      library: 'bioicons',
      svg: icon.svg,
      viewBox: icon.viewBox,
      license: icon.license,
    });
  }

  // Search Bioicons Full Library (1500+ icons, loaded on-demand)
  const bioiconsFullResults = searchBioiconsMetadata(normalizedQuery);
  for (const icon of bioiconsFullResults) {
    allResults.push({
      id: `bioicons-full-${icon.id}`,
      name: icon.name,
      category: icon.category,
      keywords: icon.keywords,
      library: 'bioicons-full',
      license: icon.license,
      file: icon.file,
      url: getBioiconsUrl(icon),
    });
  }

  // Search SciDraw
  const scidrawResults = searchSciDrawIcons(normalizedQuery);
  for (const icon of scidrawResults) {
    allResults.push({
      id: `scidraw-${icon.id}`,
      name: icon.name,
      category: icon.category,
      keywords: icon.keywords,
      library: 'scidraw',
      svg: icon.svg,
      viewBox: icon.viewBox,
      license: icon.license,
    });
  }

  // Score, deduplicate, limit, and sort results
  const scoredResults = new Map<string, ScoredIconResult>();

  for (const result of allResults) {
    // Skip if already have this ID (deduplication)
    if (scoredResults.has(result.id)) {
      continue;
    }

    let score = 0;
    const nameLower = result.name.toLowerCase();
    const categoryLower = result.category.toLowerCase();
    const keywordsLower = result.keywords.map(k => k.toLowerCase());

    // Exact match on name: 100 points
    if (nameLower === normalizedQuery) {
      score += 100;
    }
    // Starts with query: 50 points
    else if (nameLower.startsWith(normalizedQuery)) {
      score += 50;
    }
    // Contains query: 25 points
    else if (nameLower.includes(normalizedQuery)) {
      score += 25;
    }

    // Check category match
    if (categoryLower.includes(normalizedQuery)) {
      score += 20;
    }

    // Check keyword matches
    for (const keyword of keywordsLower) {
      if (keyword === normalizedQuery) {
        score += 30;
      } else if (keyword.startsWith(normalizedQuery)) {
        score += 15;
      } else if (keyword.includes(normalizedQuery)) {
        score += 10;
      }
    }

    // Synonym matches: 3 points per matching synonym term
    for (const synonym of expandedTerms) {
      if (synonym !== normalizedQuery) {
        if (nameLower.includes(synonym) || categoryLower.includes(synonym)) {
          score += 3;
        }
        // Check keywords for synonym matches
        for (const keyword of keywordsLower) {
          if (keyword.includes(synonym)) {
            score += 3;
            break; // Only count once per keyword
          }
        }
      }
    }

    scoredResults.set(result.id, { ...result, score });
  }

  // Convert to array, sort by score (desc), then name (asc), limit to 100
  const sortedResults = Array.from(scoredResults.values())
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score; // Higher score first
      }
      return a.name.localeCompare(b.name); // Alphabetical tie-break
    })
    .slice(0, 100);

  // Return without score property (cast back to base type)
  return sortedResults.map(({ score: _score, ...rest }) => rest);
}

/**
 * Get total icon count across all libraries
 */
export function getTotalIconCount(): { total: number; byLibrary: Record<string, number> } {
  return {
    total: healthIconsList.length + scienceIconsList.length + iconParkList.length + scienceBrandsList.length + bioiconsList.length + bioiconsMetadata.length + scidrawIcons.length,
    byLibrary: {
      health: healthIconsList.length,
      science: scienceIconsList.length,
      iconpark: iconParkList.length,
      simple: scienceBrandsList.length,
      bioicons: bioiconsList.length,
      'bioicons-full': bioiconsMetadata.length,
      scidraw: scidrawIcons.length,
    },
  };
}

/**
 * Get all available icon library info
 */
export const iconLibraries = {
  tabler: {
    name: 'Tabler Icons',
    description: '4,000+ general purpose icons',
    license: 'MIT',
    url: 'https://tabler.io/icons',
  },
  health: {
    name: 'Health Icons',
    description: 'Medical and healthcare icons',
    license: 'CC0',
    url: 'https://healthicons.org/',
  },
  science: {
    name: 'Science Icons',
    description: 'Open science platform icons',
    license: 'MIT',
    url: 'https://github.com/continuous-foundation/scienceicons',
  },
  iconpark: {
    name: 'Icon Park',
    description: '2,400+ high-quality icons by ByteDance',
    license: 'Apache 2.0',
    url: 'https://iconpark.oceanengine.com/',
  },
  simple: {
    name: 'Simple Icons',
    description: 'Brand logos for science tools',
    license: 'CC0',
    url: 'https://simpleicons.org/',
  },
  bioicons: {
    name: 'Bioicons (Simple)',
    description: '70+ scientific biology icons (inline SVG)',
    license: 'CC0/MIT/CC-BY',
    url: 'https://bioicons.com/',
  },
  'bioicons-full': {
    name: 'Bioicons Library',
    description: '1,548 high-quality scientific illustrations (on-demand loading)',
    license: 'CC0/MIT/CC-BY/CC-BY-SA',
    url: 'https://bioicons.com/',
  },
  scidraw: {
    name: 'SciDraw',
    description: '60+ scientific research illustrations (model organisms, neuroscience, lab equipment)',
    license: 'CC-BY',
    url: 'https://scidraw.io/',
  },
};
