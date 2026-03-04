/**
 * Ecology Icon Library
 * Comprehensive SVG icons for ecology and environmental biology
 *
 * Categories:
 * - Ecosystems (terrestrial, aquatic, biomes)
 * - Food Webs (trophic levels, energy flow)
 * - Populations (dynamics, interactions)
 * - Biodiversity (species, conservation)
 */

import type { IconDefinition } from './index';

export const ecologyIcons: IconDefinition[] = [
  // ===========================================================================
  // ECOSYSTEMS & BIOMES
  // ===========================================================================
  {
    id: 'eco-ecosystem',
    name: 'Ecosystem Overview',
    domain: 'biology',
    category: 'ecosystems',
    tags: ['ecosystem', 'biotic', 'abiotic', 'community', 'environment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#87CEEB" opacity="0.2"/>
      <path d="M8 40c8-4 16-4 24 0s16 4 24 0" fill="#228B22" opacity="0.3"/>
      <circle cx="24" cy="20" r="6" fill="#FFD700" opacity="0.6"/>
      <path d="M16 36l4-8 4 8"/>
      <path d="M20 36v8"/>
      <path d="M36 34l6-10 6 10"/>
      <path d="M42 34v10"/>
      <circle cx="50" cy="28" r="3" fill="#8B4513"/>
      <path d="M12 52c4-2 8-2 12 0"/>
    </svg>`
  },
  {
    id: 'eco-forest',
    name: 'Forest Ecosystem',
    domain: 'biology',
    category: 'ecosystems',
    tags: ['forest', 'temperate', 'trees', 'woodland', 'biome'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="52" width="56" height="8" fill="#8B4513" opacity="0.4"/>
      <path d="M12 52l8-20 8 20z" fill="#228B22" opacity="0.6"/>
      <path d="M12 40l8-16 8 16z" fill="#228B22" opacity="0.8"/>
      <path d="M32 52l10-24 10 24z" fill="#228B22" opacity="0.6"/>
      <path d="M32 36l10-20 10 20z" fill="#228B22" opacity="0.8"/>
      <rect x="18" y="44" width="4" height="8" fill="#8B4513"/>
      <rect x="40" y="40" width="4" height="12" fill="#8B4513"/>
      <path d="M4 52h56"/>
    </svg>`
  },
  {
    id: 'eco-aquatic',
    name: 'Aquatic Ecosystem',
    domain: 'biology',
    category: 'ecosystems',
    tags: ['aquatic', 'marine', 'freshwater', 'ocean', 'lake'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="4" fill="#4169E1" opacity="0.2"/>
      <path d="M8 20c8 4 16-4 24 0s16-4 24 0" stroke="#4169E1"/>
      <path d="M8 32c8 4 16-4 24 0s16-4 24 0" stroke="#4169E1"/>
      <path d="M8 44c8 4 16-4 24 0s16-4 24 0" stroke="#4169E1"/>
      <ellipse cx="20" cy="28" rx="6" ry="3"/>
      <path d="M26 28l4-2v4z"/>
      <ellipse cx="44" cy="40" rx="8" ry="4"/>
      <path d="M52 40l6-3v6z"/>
      <circle cx="12" cy="48" r="2" fill="#228B22"/>
      <path d="M12 46v-4"/>
    </svg>`
  },
  {
    id: 'eco-desert',
    name: 'Desert Ecosystem',
    domain: 'biology',
    category: 'ecosystems',
    tags: ['desert', 'arid', 'cactus', 'xerophyte', 'biome'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="44" width="56" height="16" fill="#DEB887" opacity="0.4"/>
      <circle cx="52" cy="12" r="8" fill="#FFD700" opacity="0.6"/>
      <path d="M20 44v-20" stroke-width="3"/>
      <path d="M20 32h-6v-8" stroke-width="2"/>
      <path d="M20 28h6v-6" stroke-width="2"/>
      <path d="M40 44v-12" stroke-width="2"/>
      <path d="M40 36h-4v-6" stroke-width="2"/>
      <path d="M8 48c4-2 8-2 12 0"/>
      <circle cx="52" cy="40" r="3"/>
    </svg>`
  },
  {
    id: 'eco-wetland',
    name: 'Wetland Ecosystem',
    domain: 'biology',
    category: 'ecosystems',
    tags: ['wetland', 'marsh', 'swamp', 'bog', 'estuary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 40c12 4 24-4 36 0s12 4 24 0" fill="#4169E1" opacity="0.2"/>
      <path d="M4 48c12 4 24-4 36 0s12 4 24 0" fill="#4169E1" opacity="0.3"/>
      <path d="M12 40v-16"/>
      <path d="M12 28c-4-4-4-8 0-8s4 4 0 8"/>
      <path d="M28 40v-20"/>
      <path d="M28 24c-4-4-4-8 0-8s4 4 0 8"/>
      <path d="M44 40v-14"/>
      <path d="M44 30c-4-4-4-8 0-8s4 4 0 8"/>
      <ellipse cx="52" cy="36" rx="4" ry="2"/>
      <path d="M20 52c2-4 4-4 6 0"/>
    </svg>`
  },

  // ===========================================================================
  // FOOD WEBS & ENERGY FLOW
  // ===========================================================================
  {
    id: 'eco-food-chain',
    name: 'Food Chain',
    domain: 'biology',
    category: 'food-webs',
    tags: ['food chain', 'trophic level', 'producer', 'consumer', 'decomposer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="32" r="6" fill="#228B22" opacity="0.5"/>
      <text x="4" y="46" font-size="4" fill="currentColor" stroke="none">Plant</text>
      <path d="M14 32h8"/>
      <path d="M22 28l4 4-4 4"/>
      <ellipse cx="32" cy="32" rx="4" ry="6" fill="#8B4513" opacity="0.5"/>
      <text x="24" y="46" font-size="4" fill="currentColor" stroke="none">Herbivore</text>
      <path d="M38 32h8"/>
      <path d="M46 28l4 4-4 4"/>
      <ellipse cx="56" cy="32" rx="4" ry="6" fill="#FF6347" opacity="0.5"/>
      <text x="46" y="46" font-size="4" fill="currentColor" stroke="none">Carnivore</text>
    </svg>`
  },
  {
    id: 'eco-food-web',
    name: 'Food Web',
    domain: 'biology',
    category: 'food-webs',
    tags: ['food web', 'interconnected', 'trophic', 'network', 'feeding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="8" r="6" fill="#FF6347" opacity="0.5"/>
      <circle cx="16" cy="28" r="5" fill="#FFA500" opacity="0.5"/>
      <circle cx="48" cy="28" r="5" fill="#FFA500" opacity="0.5"/>
      <circle cx="8" cy="52" r="4" fill="#228B22" opacity="0.5"/>
      <circle cx="24" cy="52" r="4" fill="#228B22" opacity="0.5"/>
      <circle cx="40" cy="52" r="4" fill="#228B22" opacity="0.5"/>
      <circle cx="56" cy="52" r="4" fill="#228B22" opacity="0.5"/>
      <path d="M32 14l-14 10"/>
      <path d="M32 14l14 10"/>
      <path d="M16 33l-6 15"/>
      <path d="M16 33l6 15"/>
      <path d="M48 33l-6 15"/>
      <path d="M48 33l6 15"/>
      <path d="M16 33l22 15" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'eco-energy-pyramid',
    name: 'Energy Pyramid',
    domain: 'biology',
    category: 'food-webs',
    tags: ['energy pyramid', 'trophic', 'biomass', '10% rule', 'ecological pyramid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4l-4 12h8z" fill="#FF6347" opacity="0.5"/>
      <path d="M28 16l-6 12h20l-6-12z" fill="#FFA500" opacity="0.5"/>
      <path d="M22 28l-8 12h36l-8-12z" fill="#FFD700" opacity="0.5"/>
      <path d="M14 40l-10 16h56l-10-16z" fill="#228B22" opacity="0.5"/>
      <text x="28" y="12" font-size="3" fill="currentColor" stroke="none">T4</text>
      <text x="26" y="24" font-size="3" fill="currentColor" stroke="none">T3</text>
      <text x="26" y="36" font-size="3" fill="currentColor" stroke="none">T2</text>
      <text x="26" y="52" font-size="3" fill="currentColor" stroke="none">T1</text>
    </svg>`
  },
  {
    id: 'eco-carbon-cycle',
    name: 'Carbon Cycle',
    domain: 'biology',
    category: 'food-webs',
    tags: ['carbon cycle', 'CO2', 'photosynthesis', 'respiration', 'decomposition'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" stroke-dasharray="4 2"/>
      <text x="26" y="12" font-size="5" fill="currentColor" stroke="none">CO₂</text>
      <path d="M16 40l4-12 4 12"/>
      <path d="M20 40v8"/>
      <ellipse cx="44" cy="44" rx="6" ry="4"/>
      <path d="M24 20c4-2 8-2 12 0"/>
      <path d="M30 18l6 2-4 4"/>
      <path d="M44 36c-4 2-8 2-12 0"/>
      <path d="M38 38l-6-2 4-4"/>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Photosynthesis</text>
      <text x="36" y="56" font-size="3" fill="currentColor" stroke="none">Respiration</text>
    </svg>`
  },
  {
    id: 'eco-nitrogen-cycle',
    name: 'Nitrogen Cycle',
    domain: 'biology',
    category: 'food-webs',
    tags: ['nitrogen cycle', 'N2', 'fixation', 'nitrification', 'denitrification'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" stroke-dasharray="4 2"/>
      <text x="26" y="12" font-size="5" fill="currentColor" stroke="none">N₂</text>
      <rect x="4" y="48" width="56" height="8" fill="#8B4513" opacity="0.3"/>
      <circle cx="16" cy="32" r="6" fill="#228B22" opacity="0.4"/>
      <circle cx="48" cy="32" r="6" fill="#4ECDC4" opacity="0.4"/>
      <path d="M32 16v8"/>
      <path d="M28 24l4-4 4 4"/>
      <path d="M22 32h4"/>
      <path d="M38 32h4"/>
      <path d="M32 48v-8"/>
      <text x="8" y="44" font-size="3" fill="currentColor" stroke="none">NH₄⁺</text>
      <text x="44" y="44" font-size="3" fill="currentColor" stroke="none">NO₃⁻</text>
    </svg>`
  },

  // ===========================================================================
  // POPULATIONS & INTERACTIONS
  // ===========================================================================
  {
    id: 'eco-population-growth',
    name: 'Population Growth Curve',
    domain: 'biology',
    category: 'populations',
    tags: ['population growth', 'exponential', 'logistic', 'carrying capacity', 'S-curve'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="56" x2="56" y2="56"/>
      <line x1="8" y1="56" x2="8" y2="8"/>
      <path d="M8 52c8-2 16-4 24-20s12-16 20-16" stroke="#4ECDC4" stroke-width="2"/>
      <line x1="8" y1="16" x2="56" y2="16" stroke-dasharray="4 2" stroke="#FF6B6B"/>
      <text x="36" y="12" font-size="4" fill="currentColor" stroke="none">K</text>
      <text x="28" y="62" font-size="4" fill="currentColor" stroke="none">Time</text>
      <text x="2" y="32" font-size="3" fill="currentColor" stroke="none">N</text>
    </svg>`
  },
  {
    id: 'eco-predator-prey',
    name: 'Predator-Prey Dynamics',
    domain: 'biology',
    category: 'populations',
    tags: ['predator', 'prey', 'Lotka-Volterra', 'oscillation', 'dynamics'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="52" x2="56" y2="52"/>
      <line x1="8" y1="52" x2="8" y2="8"/>
      <path d="M8 40c4-12 8 4 12-8s8 4 12-8 8 4 12-8 8 4 12-8" stroke="#228B22" stroke-width="2"/>
      <path d="M8 44c4-8 8 8 12-4s8 8 12-4 8 8 12-4 8 8 12-4" stroke="#FF6347" stroke-width="2"/>
      <circle cx="48" cy="12" r="3" fill="#228B22" opacity="0.5"/>
      <text x="52" y="14" font-size="3" fill="currentColor" stroke="none">Prey</text>
      <circle cx="48" cy="20" r="3" fill="#FF6347" opacity="0.5"/>
      <text x="52" y="22" font-size="3" fill="currentColor" stroke="none">Predator</text>
    </svg>`
  },
  {
    id: 'eco-competition',
    name: 'Competition',
    domain: 'biology',
    category: 'populations',
    tags: ['competition', 'interspecific', 'intraspecific', 'niche', 'exclusion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="18" ry="20" fill="#FF6B6B" opacity="0.3"/>
      <ellipse cx="40" cy="32" rx="18" ry="20" fill="#4ECDC4" opacity="0.3"/>
      <path d="M32 12v40" stroke-dasharray="2 2"/>
      <text x="10" y="32" font-size="4" fill="currentColor" stroke="none">Sp.A</text>
      <text x="44" y="32" font-size="4" fill="currentColor" stroke="none">Sp.B</text>
      <text x="22" y="56" font-size="3" fill="currentColor" stroke="none">Overlap</text>
    </svg>`
  },
  {
    id: 'eco-symbiosis',
    name: 'Symbiosis Types',
    domain: 'biology',
    category: 'populations',
    tags: ['symbiosis', 'mutualism', 'commensalism', 'parasitism', 'interaction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="8" fill="#228B22" opacity="0.5"/>
      <circle cx="24" cy="16" r="8" fill="#4ECDC4" opacity="0.5"/>
      <text x="8" y="32" font-size="3" fill="currentColor" stroke="none">Mutualism +/+</text>
      <circle cx="16" cy="44" r="8" fill="#FFA500" opacity="0.5"/>
      <circle cx="24" cy="44" r="4" fill="#FFD700" opacity="0.5"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Commensalism +/0</text>
      <circle cx="48" cy="16" r="8" fill="#FF6347" opacity="0.5"/>
      <circle cx="48" cy="16" r="4" fill="#8B0000" opacity="0.5"/>
      <text x="38" y="32" font-size="3" fill="currentColor" stroke="none">Parasitism +/-</text>
    </svg>`
  },
  {
    id: 'eco-succession',
    name: 'Ecological Succession',
    domain: 'biology',
    category: 'populations',
    tags: ['succession', 'primary', 'secondary', 'pioneer', 'climax'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="48" width="56" height="8" fill="#8B4513" opacity="0.3"/>
      <circle cx="10" cy="44" r="4" fill="#90EE90" opacity="0.5"/>
      <path d="M22 48v-8"/>
      <path d="M22 44c-2-4 0-8 0-8"/>
      <path d="M22 44c2-4 0-8 0-8"/>
      <path d="M34 48v-16"/>
      <path d="M30 40l4-8 4 8z" fill="#228B22" opacity="0.6"/>
      <path d="M50 48v-24"/>
      <path d="M44 36l6-12 6 12z" fill="#228B22" opacity="0.8"/>
      <path d="M44 44l6-8 6 8z" fill="#006400" opacity="0.6"/>
      <path d="M4 56h56" stroke-dasharray="4 2"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Pioneer</text>
      <text x="44" y="62" font-size="3" fill="currentColor" stroke="none">Climax</text>
    </svg>`
  },

  // ===========================================================================
  // BIODIVERSITY & CONSERVATION
  // ===========================================================================
  {
    id: 'eco-biodiversity',
    name: 'Biodiversity',
    domain: 'biology',
    category: 'biodiversity',
    tags: ['biodiversity', 'species richness', 'diversity', 'variety', 'genetic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" stroke-dasharray="4 2"/>
      <circle cx="20" cy="20" r="6" fill="#FF6B6B" opacity="0.5"/>
      <circle cx="44" cy="20" r="6" fill="#4ECDC4" opacity="0.5"/>
      <circle cx="16" cy="40" r="5" fill="#FFD700" opacity="0.5"/>
      <circle cx="32" cy="48" r="5" fill="#228B22" opacity="0.5"/>
      <circle cx="48" cy="40" r="5" fill="#9B59B6" opacity="0.5"/>
      <circle cx="32" cy="32" r="4" fill="#FF6347" opacity="0.5"/>
      <path d="M20 26l8 4"/>
      <path d="M44 26l-8 4"/>
      <path d="M16 45l12 0"/>
      <path d="M48 45l-12 0"/>
    </svg>`
  },
  {
    id: 'eco-endangered',
    name: 'Endangered Species',
    domain: 'biology',
    category: 'biodiversity',
    tags: ['endangered', 'threatened', 'extinction', 'IUCN', 'conservation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4l-28 52h56z" fill="#FF6B6B" opacity="0.2"/>
      <path d="M32 4l-28 52h56z"/>
      <text x="28" y="44" font-size="16" fill="#FF6B6B" stroke="none">!</text>
      <ellipse cx="32" cy="28" rx="8" ry="6"/>
      <circle cx="28" cy="26" r="2" fill="currentColor"/>
      <circle cx="36" cy="26" r="2" fill="currentColor"/>
      <text x="12" y="62" font-size="4" fill="currentColor" stroke="none">Endangered Status</text>
    </svg>`
  },
  {
    id: 'eco-habitat-loss',
    name: 'Habitat Loss',
    domain: 'biology',
    category: 'biodiversity',
    tags: ['habitat loss', 'fragmentation', 'deforestation', 'urbanization', 'threat'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="24" height="24" fill="#228B22" opacity="0.5"/>
      <rect x="36" y="4" width="24" height="24" fill="#228B22" opacity="0.3"/>
      <rect x="4" y="36" width="24" height="24" fill="#228B22" opacity="0.3"/>
      <rect x="36" y="36" width="24" height="24" fill="#808080" opacity="0.5"/>
      <path d="M28 4v56" stroke="#FF6B6B" stroke-width="2"/>
      <path d="M4 28h56" stroke="#FF6B6B" stroke-width="2"/>
      <rect x="40" y="40" width="8" height="12" fill="#808080"/>
      <rect x="52" y="44" width="6" height="8" fill="#808080"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Fragmented habitat</text>
    </svg>`
  },
  {
    id: 'eco-invasive-species',
    name: 'Invasive Species',
    domain: 'biology',
    category: 'biodiversity',
    tags: ['invasive', 'non-native', 'introduced', 'alien species', 'pest'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28"/>
      <circle cx="20" cy="24" r="6" fill="#228B22" opacity="0.5"/>
      <circle cx="44" cy="24" r="6" fill="#228B22" opacity="0.5"/>
      <circle cx="28" cy="44" r="6" fill="#228B22" opacity="0.5"/>
      <circle cx="32" cy="32" r="8" fill="#FF6B6B" opacity="0.6"/>
      <path d="M24 32h16" stroke="#FF6B6B" stroke-width="2"/>
      <path d="M32 24v16" stroke="#FF6B6B" stroke-width="2"/>
      <path d="M40 40l8 8" stroke="#FF6B6B"/>
      <path d="M44 44l4-4 4 4-4 4z" fill="#FF6B6B"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Native displaced</text>
    </svg>`
  },
  {
    id: 'eco-conservation',
    name: 'Conservation',
    domain: 'biology',
    category: 'biodiversity',
    tags: ['conservation', 'protection', 'preserve', 'wildlife', 'management'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="36" r="24" fill="#228B22" opacity="0.2"/>
      <path d="M32 12c-8 0-16 8-16 20 0 14 16 24 16 24s16-10 16-24c0-12-8-20-16-20z" fill="#228B22" opacity="0.4"/>
      <path d="M32 12v48"/>
      <path d="M20 28c8 4 16 4 24 0"/>
      <path d="M18 40c8 4 20 4 28 0"/>
      <circle cx="32" cy="8" r="4" fill="#FFD700" opacity="0.6"/>
      <text x="16" y="62" font-size="4" fill="currentColor" stroke="none">Protected Area</text>
    </svg>`
  },
  {
    id: 'eco-species-area',
    name: 'Species-Area Relationship',
    domain: 'biology',
    category: 'biodiversity',
    tags: ['species-area', 'island biogeography', 'diversity', 'curve', 'relationship'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="56" x2="56" y2="56"/>
      <line x1="8" y1="56" x2="8" y2="8"/>
      <path d="M8 52c12-8 24-20 44-36" stroke="#4ECDC4" stroke-width="2"/>
      <text x="28" y="62" font-size="4" fill="currentColor" stroke="none">Area</text>
      <text x="2" y="32" font-size="3" fill="currentColor" stroke="none">S</text>
      <text x="48" y="12" font-size="4" fill="currentColor" stroke="none">S = cA^z</text>
    </svg>`
  },
  {
    id: 'eco-keystone',
    name: 'Keystone Species',
    domain: 'biology',
    category: 'biodiversity',
    tags: ['keystone', 'species', 'ecosystem engineer', 'critical', 'trophic cascade'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 56l28-48 28 48z"/>
      <circle cx="32" cy="24" r="8" fill="#FFD700" opacity="0.6"/>
      <text x="26" y="28" font-size="6" fill="currentColor" stroke="none">K</text>
      <circle cx="16" cy="44" r="5" fill="#4ECDC4" opacity="0.5"/>
      <circle cx="32" cy="44" r="5" fill="#4ECDC4" opacity="0.5"/>
      <circle cx="48" cy="44" r="5" fill="#4ECDC4" opacity="0.5"/>
      <path d="M32 32v6"/>
      <path d="M24 32l-6 8"/>
      <path d="M40 32l6 8"/>
    </svg>`
  },
];

export default ecologyIcons;
