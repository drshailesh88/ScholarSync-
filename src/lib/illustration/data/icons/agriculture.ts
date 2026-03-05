/**
 * Agricultural Science Icon Library
 * Comprehensive SVG icons for agricultural sciences
 *
 * Categories:
 * - Crops & Plants (grains, vegetables, fruit trees)
 * - Irrigation & Water (systems, management, conservation)
 * - Soil Science (composition, health, management)
 * - Fertilizers & Nutrients (organic, synthetic, application)
 * - Pest Control (IPM, pesticides, biological control)
 */

import type { IconDefinition } from './index';

export const agricultureIcons: IconDefinition[] = [
  // ===========================================================================
  // CROPS & PLANTS
  // ===========================================================================
  {
    id: 'agri-wheat',
    name: 'Wheat',
    domain: 'biology',
    category: 'crops',
    tags: ['wheat', 'grain', 'cereal', 'crop', 'harvest'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 56V28"/>
      <path d="M24 56l8-12"/>
      <path d="M40 56l-8-12"/>
      <path d="M32 28c-4-4-4-12 0-16 4 4 4 12 0 16z" fill="currentColor" opacity="0.2"/>
      <path d="M32 28c-4-4-4-12 0-16 4 4 4 12 0 16z"/>
      <path d="M26 22c-4-2-6-8-4-12 4 2 6 8 4 12z"/>
      <path d="M38 22c4-2 6-8 4-12-4 2-6 8-4 12z"/>
      <path d="M24 32c-4-2-6-8-4-12 4 2 6 8 4 12z"/>
      <path d="M40 32c4-2 6-8 4-12-4 2-6 8-4 12z"/>
    </svg>`
  },
  {
    id: 'agri-corn',
    name: 'Corn/Maize',
    domain: 'biology',
    category: 'crops',
    tags: ['corn', 'maize', 'grain', 'cereal', 'crop'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 56V32"/>
      <path d="M24 56l8-12"/>
      <path d="M40 56l-8-12"/>
      <ellipse cx="32" cy="20" rx="8" ry="16" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="20" rx="8" ry="16"/>
      <path d="M24 12l-8-4"/>
      <path d="M24 20l-8-2"/>
      <path d="M40 12l8-4"/>
      <path d="M40 20l8-2"/>
      <line x1="28" y1="12" x2="36" y2="12"/>
      <line x1="28" y1="20" x2="36" y2="20"/>
      <line x1="28" y1="28" x2="36" y2="28"/>
    </svg>`
  },
  {
    id: 'agri-rice',
    name: 'Rice',
    domain: 'biology',
    category: 'crops',
    tags: ['rice', 'paddy', 'grain', 'cereal', 'crop'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 56V24"/>
      <path d="M32 24c-4-4 0-12 4-16"/>
      <ellipse cx="32" cy="16" rx="3" ry="6" fill="currentColor"/>
      <ellipse cx="26" cy="22" rx="2" ry="4" fill="currentColor" transform="rotate(-20 26 22)"/>
      <ellipse cx="38" cy="22" rx="2" ry="4" fill="currentColor" transform="rotate(20 38 22)"/>
      <ellipse cx="24" cy="30" rx="2" ry="4" fill="currentColor" transform="rotate(-30 24 30)"/>
      <ellipse cx="40" cy="30" rx="2" ry="4" fill="currentColor" transform="rotate(30 40 30)"/>
      <path d="M24 56h16"/>
    </svg>`
  },
  {
    id: 'agri-fruit-tree',
    name: 'Fruit Tree',
    domain: 'biology',
    category: 'crops',
    tags: ['fruit', 'tree', 'orchard', 'apple', 'harvest'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="40" width="8" height="16"/>
      <circle cx="32" cy="24" r="16" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="24" r="16"/>
      <circle cx="24" cy="20" r="3" fill="currentColor"/>
      <circle cx="36" cy="28" r="3" fill="currentColor"/>
      <circle cx="40" cy="18" r="3" fill="currentColor"/>
      <path d="M24 56h16"/>
    </svg>`
  },
  {
    id: 'agri-vegetables',
    name: 'Vegetables',
    domain: 'biology',
    category: 'crops',
    tags: ['vegetables', 'produce', 'garden', 'horticulture'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32c0-8 4-16 8-16s8 8 8 16-4 16-8 16-8-8-8-16z" fill="currentColor" opacity="0.2"/>
      <path d="M16 32c0-8 4-16 8-16s8 8 8 16-4 16-8 16-8-8-8-16z"/>
      <path d="M24 16v-8"/>
      <path d="M20 12l4-4 4 4"/>
      <circle cx="44" cy="40" r="12" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="40" r="12"/>
      <path d="M44 28v-8"/>
      <path d="M40 24l4-4 4 4"/>
    </svg>`
  },
  {
    id: 'agri-seedling',
    name: 'Seedling',
    domain: 'biology',
    category: 'crops',
    tags: ['seedling', 'sprout', 'germination', 'growth', 'plant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 56V32"/>
      <path d="M32 32c-8-4-12-12-8-20 8 4 12 12 8 20z" fill="currentColor" opacity="0.2"/>
      <path d="M32 32c-8-4-12-12-8-20 8 4 12 12 8 20z"/>
      <path d="M32 40c8-4 12-12 8-20-8 4-12 12-8 20z" fill="currentColor" opacity="0.2"/>
      <path d="M32 40c8-4 12-12 8-20-8 4-12 12-8 20z"/>
      <path d="M8 56h48"/>
    </svg>`
  },

  // ===========================================================================
  // IRRIGATION & WATER
  // ===========================================================================
  {
    id: 'agri-irrigation-sprinkler',
    name: 'Sprinkler Irrigation',
    domain: 'biology',
    category: 'irrigation',
    tags: ['sprinkler', 'irrigation', 'water', 'overhead', 'pivot'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 56V24"/>
      <circle cx="32" cy="20" r="4"/>
      <path d="M28 16l-12-8"/>
      <path d="M24 12l-8-4"/>
      <path d="M36 16l12-8"/>
      <path d="M40 12l8-4"/>
      <path d="M20 20l-8 4"/>
      <path d="M44 20l8 4"/>
      <path d="M24 56h16"/>
    </svg>`
  },
  {
    id: 'agri-drip-irrigation',
    name: 'Drip Irrigation',
    domain: 'biology',
    category: 'irrigation',
    tags: ['drip', 'irrigation', 'water', 'efficient', 'micro'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16h48"/>
      <path d="M16 16v8"/>
      <path d="M32 16v8"/>
      <path d="M48 16v8"/>
      <path d="M16 24l-2 8 4 0-2-8z" fill="currentColor"/>
      <path d="M32 24l-2 8 4 0-2-8z" fill="currentColor"/>
      <path d="M48 24l-2 8 4 0-2-8z" fill="currentColor"/>
      <path d="M8 48h48"/>
      <path d="M12 48v8"/>
      <path d="M24 48v8"/>
      <path d="M40 48v8"/>
      <path d="M52 48v8"/>
    </svg>`
  },
  {
    id: 'agri-water-pump',
    name: 'Water Pump',
    domain: 'biology',
    category: 'irrigation',
    tags: ['pump', 'water', 'well', 'groundwater', 'extraction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="24" width="24" height="20" rx="2"/>
      <circle cx="32" cy="34" r="6"/>
      <path d="M32 24v-16"/>
      <path d="M24 12h16"/>
      <path d="M32 44v12"/>
      <path d="M20 34h-12"/>
      <path d="M44 34h12"/>
      <path d="M16 30l-4 4 4 4"/>
      <path d="M48 30l4 4-4 4"/>
    </svg>`
  },
  {
    id: 'agri-reservoir',
    name: 'Water Reservoir',
    domain: 'biology',
    category: 'irrigation',
    tags: ['reservoir', 'storage', 'tank', 'water', 'supply'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h48v28c0 2-4 4-24 4S8 54 8 52V24z" fill="currentColor" opacity="0.2"/>
      <path d="M8 24h48v28c0 2-4 4-24 4S8 54 8 52V24z"/>
      <path d="M8 32c8 4 16-4 24 0s16-4 24 0"/>
      <path d="M8 40c8 4 16-4 24 0s16-4 24 0"/>
      <path d="M32 8v16"/>
      <path d="M28 12l4-4 4 4"/>
    </svg>`
  },

  // ===========================================================================
  // SOIL SCIENCE
  // ===========================================================================
  {
    id: 'agri-soil-layers',
    name: 'Soil Layers',
    domain: 'biology',
    category: 'soil',
    tags: ['soil', 'horizon', 'profile', 'layers', 'pedology'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <path d="M8 20h48"/>
      <path d="M8 32h48"/>
      <path d="M8 44h48"/>
      <text x="12" y="16" font-size="5" fill="currentColor" stroke="none">O</text>
      <text x="12" y="28" font-size="5" fill="currentColor" stroke="none">A</text>
      <text x="12" y="40" font-size="5" fill="currentColor" stroke="none">B</text>
      <text x="12" y="52" font-size="5" fill="currentColor" stroke="none">C</text>
      <circle cx="40" cy="26" r="2" fill="currentColor"/>
      <circle cx="48" cy="38" r="3" fill="currentColor"/>
      <circle cx="36" cy="50" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'agri-soil-testing',
    name: 'Soil Testing',
    domain: 'biology',
    category: 'soil',
    tags: ['soil test', 'analysis', 'pH', 'nutrients', 'sample'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16l4 24H20L24 8z" fill="currentColor" opacity="0.1"/>
      <path d="M24 8h16l4 24H20L24 8z"/>
      <rect x="16" y="32" width="32" height="24" rx="2"/>
      <path d="M24 40h16"/>
      <path d="M24 48h16"/>
      <circle cx="32" cy="20" r="4"/>
      <path d="M32 4v4"/>
    </svg>`
  },
  {
    id: 'agri-composting',
    name: 'Composting',
    domain: 'biology',
    category: 'soil',
    tags: ['compost', 'organic', 'decomposition', 'humus', 'recycling'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 28h40l4 24H8l4-24z" fill="currentColor" opacity="0.2"/>
      <path d="M12 28h40l4 24H8l4-24z"/>
      <path d="M20 12v16"/>
      <path d="M32 8v20"/>
      <path d="M44 12v16"/>
      <path d="M16 16l4-4 4 4"/>
      <path d="M28 12l4-4 4 4"/>
      <path d="M40 16l4-4 4 4"/>
      <circle cx="24" cy="40" r="2" fill="currentColor"/>
      <circle cx="36" cy="44" r="3" fill="currentColor"/>
      <circle cx="44" cy="38" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'agri-erosion',
    name: 'Soil Erosion',
    domain: 'biology',
    category: 'soil',
    tags: ['erosion', 'degradation', 'runoff', 'loss', 'conservation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24l16 8 16-8 16 8"/>
      <path d="M8 32l16 8 16-8 16 8"/>
      <path d="M8 40l16 8 16-8 16 8"/>
      <path d="M16 20v-12"/>
      <path d="M12 12l4-4 4 4"/>
      <path d="M48 32l8 16"/>
      <path d="M52 40l8 8"/>
      <circle cx="52" cy="52" r="2" fill="currentColor"/>
      <circle cx="56" cy="56" r="2" fill="currentColor"/>
    </svg>`
  },

  // ===========================================================================
  // FERTILIZERS & NUTRIENTS
  // ===========================================================================
  {
    id: 'agri-fertilizer',
    name: 'Fertilizer Application',
    domain: 'biology',
    category: 'fertilizers',
    tags: ['fertilizer', 'NPK', 'nutrients', 'application', 'granular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8h32l4 24H12L16 8z" fill="currentColor" opacity="0.2"/>
      <path d="M16 8h32l4 24H12L16 8z"/>
      <circle cx="24" cy="16" r="2" fill="currentColor"/>
      <circle cx="32" cy="20" r="2" fill="currentColor"/>
      <circle cx="40" cy="16" r="2" fill="currentColor"/>
      <path d="M20 32l-4 20"/>
      <path d="M32 32v24"/>
      <path d="M44 32l4 20"/>
      <circle cx="16" cy="54" r="2"/>
      <circle cx="32" cy="56" r="2"/>
      <circle cx="48" cy="54" r="2"/>
    </svg>`
  },
  {
    id: 'agri-nitrogen',
    name: 'Nitrogen Cycle',
    domain: 'biology',
    category: 'fertilizers',
    tags: ['nitrogen', 'N', 'fixation', 'cycle', 'nutrient'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" stroke-dasharray="4 2"/>
      <circle cx="32" cy="12" r="6"/>
      <circle cx="32" cy="52" r="6"/>
      <circle cx="12" cy="32" r="6"/>
      <circle cx="52" cy="32" r="6"/>
      <text x="28" y="15" font-size="6" fill="currentColor" stroke="none">N</text>
      <path d="M38 14l8 8"/>
      <path d="M46 22l-4 4"/>
      <path d="M26 50l-8-8"/>
      <path d="M18 42l4-4"/>
    </svg>`
  },
  {
    id: 'agri-organic-matter',
    name: 'Organic Matter',
    domain: 'biology',
    category: 'fertilizers',
    tags: ['organic', 'matter', 'humus', 'carbon', 'soil health'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="24" ry="12" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="40" rx="24" ry="12"/>
      <path d="M24 40v-24"/>
      <path d="M20 20l4-4 4 4"/>
      <path d="M40 40v-20"/>
      <path d="M36 24l4-4 4 4"/>
      <path d="M16 36c4 4 8 4 12 0"/>
      <path d="M36 36c4 4 8 4 12 0"/>
    </svg>`
  },

  // ===========================================================================
  // PEST CONTROL
  // ===========================================================================
  {
    id: 'agri-pest-insect',
    name: 'Pest Insect',
    domain: 'biology',
    category: 'pest-control',
    tags: ['pest', 'insect', 'bug', 'infestation', 'damage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="8" ry="6"/>
      <ellipse cx="32" cy="40" rx="12" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="40" rx="12" ry="10"/>
      <path d="M24 24l-8-8"/>
      <path d="M40 24l8-8"/>
      <path d="M20 32l-12 0"/>
      <path d="M44 32l12 0"/>
      <path d="M22 44l-8 8"/>
      <path d="M42 44l8 8"/>
      <circle cx="28" cy="22" r="2" fill="currentColor"/>
      <circle cx="36" cy="22" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'agri-pesticide-spray',
    name: 'Pesticide Spray',
    domain: 'biology',
    category: 'pest-control',
    tags: ['pesticide', 'spray', 'chemical', 'application', 'control'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="24" height="32" rx="4" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="24" width="24" height="32" rx="4"/>
      <path d="M20 24v-8c0-4 4-8 8-8h4"/>
      <path d="M32 8h16"/>
      <path d="M48 8l8 8-8 8"/>
      <path d="M56 16l-4-4 4-4"/>
      <path d="M48 20l4 4-4 4"/>
      <path d="M12 32h16"/>
      <path d="M12 40h16"/>
      <path d="M12 48h16"/>
    </svg>`
  },
  {
    id: 'agri-biological-control',
    name: 'Biological Control',
    domain: 'biology',
    category: 'pest-control',
    tags: ['biological', 'control', 'predator', 'natural', 'IPM'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="24" r="8"/>
      <circle cx="44" cy="40" r="12" fill="currentColor" opacity="0.2"/>
      <circle cx="44" cy="40" r="12"/>
      <path d="M28 24l8 8"/>
      <path d="M32 28l4 4-4 4"/>
      <path d="M16 20c-4-4-4-8 0-8"/>
      <path d="M24 20c4-4 4-8 0-8"/>
      <circle cx="18" cy="24" r="2" fill="currentColor"/>
      <circle cx="22" cy="24" r="2" fill="currentColor"/>
      <circle cx="42" cy="38" r="2" fill="currentColor"/>
      <circle cx="46" cy="38" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'agri-crop-rotation',
    name: 'Crop Rotation',
    domain: 'biology',
    category: 'pest-control',
    tags: ['rotation', 'crop', 'cycle', 'sustainable', 'management'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" stroke-dasharray="4 2"/>
      <circle cx="32" cy="16" r="6"/>
      <circle cx="48" cy="32" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="48" cy="32" r="6"/>
      <circle cx="32" cy="48" r="6"/>
      <circle cx="16" cy="32" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="16" cy="32" r="6"/>
      <path d="M38 18l6 6"/>
      <path d="M48 38l-6 6"/>
      <path d="M26 46l-6-6"/>
      <path d="M16 26l6-6"/>
    </svg>`
  },
  {
    id: 'agri-greenhouse',
    name: 'Greenhouse',
    domain: 'biology',
    category: 'crops',
    tags: ['greenhouse', 'controlled', 'environment', 'protected', 'cultivation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 36l24-28 24 28" fill="currentColor" opacity="0.1"/>
      <path d="M8 36l24-28 24 28"/>
      <rect x="8" y="36" width="48" height="20"/>
      <line x1="20" y1="36" x2="20" y2="56"/>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <line x1="44" y1="36" x2="44" y2="56"/>
      <path d="M20 20l12-12 12 12"/>
      <rect x="26" y="44" width="12" height="12"/>
    </svg>`
  },
  {
    id: 'agri-tractor',
    name: 'Tractor',
    domain: 'biology',
    category: 'equipment',
    tags: ['tractor', 'machinery', 'farm', 'equipment', 'mechanization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="44" r="8"/>
      <circle cx="16" cy="44" r="4"/>
      <circle cx="48" cy="40" r="12"/>
      <circle cx="48" cy="40" r="6"/>
      <rect x="20" y="24" width="20" height="16" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="20" y="24" width="20" height="16" rx="2"/>
      <path d="M40 28h8l4 12"/>
      <path d="M24 24v-8h12"/>
      <rect x="28" y="28" width="8" height="6"/>
    </svg>`
  },
];

export default agricultureIcons;
