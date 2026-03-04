/**
 * Botany Icon Library
 * Comprehensive SVG icons for botany and plant biology
 *
 * Categories:
 * - Plant Cells (structure, organelles)
 * - Photosynthesis (light reactions, Calvin cycle)
 * - Plant Anatomy (roots, stems, leaves, flowers)
 * - Plant Reproduction (seeds, pollination, fruits)
 */

import type { IconDefinition } from './index';

export const botanyIcons: IconDefinition[] = [
  // ===========================================================================
  // PLANT CELLS
  // ===========================================================================
  {
    id: 'bot-plant-cell',
    name: 'Plant Cell Structure',
    domain: 'biology',
    category: 'plant-cells',
    tags: ['plant cell', 'cell wall', 'chloroplast', 'vacuole', 'organelles'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="56" height="48" rx="4" fill="#90EE90" opacity="0.2"/>
      <rect x="4" y="8" width="56" height="48" rx="4"/>
      <rect x="8" y="12" width="48" height="40" rx="2" stroke-dasharray="2 2"/>
      <ellipse cx="32" cy="32" rx="16" ry="12" fill="#87CEEB" opacity="0.4"/>
      <circle cx="32" cy="32" r="6" fill="#9B59B6" opacity="0.5"/>
      <ellipse cx="16" cy="20" rx="4" ry="2" fill="#27AE60"/>
      <ellipse cx="48" cy="24" rx="4" ry="2" fill="#27AE60"/>
      <ellipse cx="20" cy="44" rx="4" ry="2" fill="#27AE60"/>
      <text x="28" y="58" font-size="3" fill="currentColor" stroke="none">Nucleus</text>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Vacuole</text>
    </svg>`
  },
  {
    id: 'bot-chloroplast',
    name: 'Chloroplast',
    domain: 'biology',
    category: 'plant-cells',
    tags: ['chloroplast', 'thylakoid', 'stroma', 'grana', 'photosynthesis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="16" fill="#27AE60" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="28" ry="16"/>
      <ellipse cx="32" cy="32" rx="24" ry="12" stroke-dasharray="2 2"/>
      <g fill="#228B22" opacity="0.6">
        <ellipse cx="16" cy="32" rx="4" ry="6"/>
        <ellipse cx="26" cy="32" rx="4" ry="6"/>
        <ellipse cx="36" cy="32" rx="4" ry="6"/>
        <ellipse cx="46" cy="32" rx="4" ry="6"/>
      </g>
      <path d="M16 26v12"/>
      <path d="M26 26v12"/>
      <path d="M36 26v12"/>
      <path d="M46 26v12"/>
      <text x="20" y="56" font-size="4" fill="currentColor" stroke="none">Grana stacks</text>
    </svg>`
  },
  {
    id: 'bot-cell-wall',
    name: 'Cell Wall Structure',
    domain: 'biology',
    category: 'plant-cells',
    tags: ['cell wall', 'cellulose', 'pectin', 'lignin', 'primary wall', 'secondary wall'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" fill="#8B4513" opacity="0.2"/>
      <rect x="8" y="8" width="48" height="48" fill="#D2691E" opacity="0.2"/>
      <rect x="12" y="12" width="40" height="40" fill="#F4A460" opacity="0.2"/>
      <rect x="16" y="16" width="32" height="32" fill="#90EE90" opacity="0.2"/>
      <path d="M8 16h48" stroke-dasharray="4 2"/>
      <path d="M8 32h48"/>
      <path d="M8 48h48" stroke-dasharray="4 2"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Secondary</text>
      <text x="28" y="62" font-size="3" fill="currentColor" stroke="none">Primary</text>
      <text x="48" y="62" font-size="3" fill="currentColor" stroke="none">Plasma</text>
    </svg>`
  },
  {
    id: 'bot-vacuole',
    name: 'Central Vacuole',
    domain: 'biology',
    category: 'plant-cells',
    tags: ['vacuole', 'tonoplast', 'turgor', 'storage', 'cell sap'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="4"/>
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="#87CEEB" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <circle cx="20" cy="24" r="2" fill="#9B59B6" opacity="0.6"/>
      <circle cx="40" cy="36" r="3" fill="#E74C3C" opacity="0.6"/>
      <circle cx="28" cy="42" r="2" fill="#F39C12" opacity="0.6"/>
      <text x="24" y="34" font-size="4" fill="currentColor" stroke="none">H₂O</text>
      <circle cx="52" cy="12" r="4" fill="#9B59B6" opacity="0.4"/>
      <text x="44" y="22" font-size="3" fill="currentColor" stroke="none">Nucleus</text>
    </svg>`
  },
  {
    id: 'bot-plasmodesmata',
    name: 'Plasmodesmata',
    domain: 'biology',
    category: 'plant-cells',
    tags: ['plasmodesmata', 'cell communication', 'symplast', 'transport'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="24" height="56" fill="#90EE90" opacity="0.2"/>
      <rect x="36" y="4" width="24" height="56" fill="#90EE90" opacity="0.2"/>
      <rect x="28" y="4" width="8" height="56" fill="#8B4513" opacity="0.3"/>
      <circle cx="32" cy="16" r="3" fill="#87CEEB"/>
      <circle cx="32" cy="32" r="3" fill="#87CEEB"/>
      <circle cx="32" cy="48" r="3" fill="#87CEEB"/>
      <path d="M16 16h8"/>
      <path d="M40 16h8"/>
      <path d="M16 32h8"/>
      <path d="M40 32h8"/>
      <text x="28" y="62" font-size="3" fill="currentColor" stroke="none">Wall</text>
    </svg>`
  },

  // ===========================================================================
  // PHOTOSYNTHESIS
  // ===========================================================================
  {
    id: 'bot-photosynthesis',
    name: 'Photosynthesis Overview',
    domain: 'biology',
    category: 'photosynthesis',
    tags: ['photosynthesis', 'light reaction', 'Calvin cycle', 'glucose', 'oxygen'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="16" r="8" fill="#FFD700" opacity="0.6"/>
      <path d="M20 16h12"/>
      <path d="M32 16l-4-4v8z"/>
      <ellipse cx="44" cy="16" rx="12" ry="8" fill="#27AE60" opacity="0.4"/>
      <text x="38" y="20" font-size="4" fill="currentColor" stroke="none">Leaf</text>
      <text x="4" y="32" font-size="4" fill="currentColor" stroke="none">6CO₂ + 6H₂O</text>
      <path d="M32 36v8"/>
      <path d="M28 44l4 4 4-4"/>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">C₆H₁₂O₆ + 6O₂</text>
      <text x="8" y="12" font-size="3" fill="currentColor" stroke="none">Light</text>
    </svg>`
  },
  {
    id: 'bot-light-reactions',
    name: 'Light Reactions',
    domain: 'biology',
    category: 'photosynthesis',
    tags: ['light reactions', 'thylakoid', 'photosystem', 'electron transport', 'ATP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="56" height="16" fill="#27AE60" opacity="0.3"/>
      <circle cx="16" cy="32" r="6" fill="#9B59B6" opacity="0.5"/>
      <text x="12" y="34" font-size="4" fill="currentColor" stroke="none">II</text>
      <circle cx="48" cy="32" r="6" fill="#3498DB" opacity="0.5"/>
      <text x="45" y="34" font-size="4" fill="currentColor" stroke="none">I</text>
      <path d="M22 32h20" stroke="#E74C3C"/>
      <path d="M32 28l4 4-4 4" stroke="#E74C3C"/>
      <circle cx="8" cy="12" r="4" fill="#FFD700"/>
      <path d="M8 16v8"/>
      <circle cx="56" cy="12" r="4" fill="#FFD700"/>
      <path d="M56 16v8"/>
      <text x="4" y="52" font-size="3" fill="currentColor" stroke="none">H₂O split</text>
      <text x="32" y="52" font-size="3" fill="currentColor" stroke="none">ATP + NADPH</text>
    </svg>`
  },
  {
    id: 'bot-calvin-cycle',
    name: 'Calvin Cycle',
    domain: 'biology',
    category: 'photosynthesis',
    tags: ['Calvin cycle', 'carbon fixation', 'RuBisCO', 'G3P', 'dark reactions'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" stroke-dasharray="4 2"/>
      <circle cx="32" cy="8" r="6" fill="#E74C3C" opacity="0.4"/>
      <text x="26" y="12" font-size="4" fill="currentColor" stroke="none">CO₂</text>
      <circle cx="52" cy="24" r="6" fill="#F39C12" opacity="0.4"/>
      <text x="46" y="28" font-size="4" fill="currentColor" stroke="none">3PG</text>
      <circle cx="52" cy="44" r="6" fill="#27AE60" opacity="0.4"/>
      <text x="46" y="48" font-size="4" fill="currentColor" stroke="none">G3P</text>
      <circle cx="12" cy="32" r="6" fill="#3498DB" opacity="0.4"/>
      <text x="6" y="36" font-size="4" fill="currentColor" stroke="none">RuBP</text>
      <path d="M38 10l10 10"/>
      <path d="M52 30v8"/>
      <path d="M46 48l-28-12"/>
      <path d="M18 32l8-20"/>
    </svg>`
  },
  {
    id: 'bot-leaf-cross-section',
    name: 'Leaf Cross Section',
    domain: 'biology',
    category: 'photosynthesis',
    tags: ['leaf', 'mesophyll', 'stomata', 'palisade', 'spongy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="8" fill="#228B22" opacity="0.4"/>
      <text x="16" y="10" font-size="3" fill="currentColor" stroke="none">Upper epidermis</text>
      <rect x="4" y="12" width="56" height="16" fill="#27AE60" opacity="0.3"/>
      <line x1="12" y1="12" x2="12" y2="28"/>
      <line x1="24" y1="12" x2="24" y2="28"/>
      <line x1="36" y1="12" x2="36" y2="28"/>
      <line x1="48" y1="12" x2="48" y2="28"/>
      <text x="16" y="24" font-size="3" fill="currentColor" stroke="none">Palisade</text>
      <rect x="4" y="28" width="56" height="20" fill="#90EE90" opacity="0.3"/>
      <circle cx="16" cy="36" r="4" fill="#27AE60" opacity="0.5"/>
      <circle cx="32" cy="40" r="4" fill="#27AE60" opacity="0.5"/>
      <circle cx="48" cy="36" r="4" fill="#27AE60" opacity="0.5"/>
      <text x="16" y="50" font-size="3" fill="currentColor" stroke="none">Spongy mesophyll</text>
      <rect x="4" y="48" width="56" height="8" fill="#228B22" opacity="0.4"/>
      <ellipse cx="32" cy="52" rx="4" ry="2"/>
      <text x="38" y="54" font-size="3" fill="currentColor" stroke="none">Stomata</text>
    </svg>`
  },
  {
    id: 'bot-stomata',
    name: 'Stomata',
    domain: 'biology',
    category: 'photosynthesis',
    tags: ['stomata', 'guard cells', 'gas exchange', 'transpiration', 'pore'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" fill="#90EE90" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="20" ry="8"/>
      <path d="M12 32c8-8 16-8 20 0" fill="#27AE60" opacity="0.5"/>
      <path d="M52 32c-8-8-16-8-20 0" fill="#27AE60" opacity="0.5"/>
      <path d="M12 32c8 8 16 8 20 0" fill="#27AE60" opacity="0.5"/>
      <path d="M52 32c-8 8-16 8-20 0" fill="#27AE60" opacity="0.5"/>
      <ellipse cx="32" cy="32" rx="8" ry="4" fill="#87CEEB" opacity="0.4"/>
      <path d="M32 20v-8" stroke-dasharray="2 2"/>
      <text x="36" y="16" font-size="3" fill="currentColor" stroke="none">CO₂ in</text>
      <path d="M32 44v8" stroke-dasharray="2 2"/>
      <text x="36" y="56" font-size="3" fill="currentColor" stroke="none">O₂ out</text>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Guard cells</text>
    </svg>`
  },

  // ===========================================================================
  // PLANT ANATOMY
  // ===========================================================================
  {
    id: 'bot-root-structure',
    name: 'Root Structure',
    domain: 'biology',
    category: 'anatomy',
    tags: ['root', 'xylem', 'phloem', 'cortex', 'epidermis', 'root hair'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v56" stroke-width="8" stroke="#D2691E" opacity="0.4"/>
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="12" fill="#F4A460" opacity="0.3"/>
      <circle cx="32" cy="32" r="8" fill="#8B4513" opacity="0.3"/>
      <circle cx="32" cy="32" r="4" fill="#3498DB" opacity="0.5"/>
      <path d="M16 24l-8-4"/>
      <path d="M16 32l-8 0"/>
      <path d="M16 40l-8 4"/>
      <path d="M48 24l8-4"/>
      <path d="M48 32l8 0"/>
      <path d="M48 40l8 4"/>
      <text x="4" y="52" font-size="3" fill="currentColor" stroke="none">Root hairs</text>
      <text x="36" y="36" font-size="3" fill="currentColor" stroke="none">Xylem</text>
    </svg>`
  },
  {
    id: 'bot-stem-cross-section',
    name: 'Stem Cross Section',
    domain: 'biology',
    category: 'anatomy',
    tags: ['stem', 'vascular bundle', 'xylem', 'phloem', 'cortex', 'pith'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#90EE90" opacity="0.2"/>
      <circle cx="32" cy="32" r="28"/>
      <circle cx="32" cy="32" r="20" stroke-dasharray="2 2"/>
      <circle cx="32" cy="32" r="12" fill="#F5F5DC" opacity="0.3"/>
      <circle cx="20" cy="20" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="44" cy="20" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="20" cy="44" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="44" cy="44" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="32" cy="14" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="32" cy="50" r="4" fill="#3498DB" opacity="0.5"/>
      <text x="24" y="62" font-size="3" fill="currentColor" stroke="none">Vascular bundles</text>
    </svg>`
  },
  {
    id: 'bot-xylem-phloem',
    name: 'Xylem and Phloem',
    domain: 'biology',
    category: 'anatomy',
    tags: ['xylem', 'phloem', 'vascular tissue', 'transport', 'sap'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="24" height="56" fill="#3498DB" opacity="0.2"/>
      <rect x="36" y="4" width="24" height="56" fill="#27AE60" opacity="0.2"/>
      <path d="M16 4v56" stroke-width="4" stroke="#3498DB"/>
      <path d="M48 4v56" stroke-width="4" stroke="#27AE60"/>
      <path d="M16 8l-4-4v8z" fill="#3498DB"/>
      <path d="M16 24l-4-4v8z" fill="#3498DB"/>
      <path d="M16 40l-4-4v8z" fill="#3498DB"/>
      <path d="M48 16l-4 4v-8z" fill="#27AE60"/>
      <path d="M48 32l-4 4v-8z" fill="#27AE60"/>
      <path d="M48 48l-4 4v-8z" fill="#27AE60"/>
      <text x="8" y="62" font-size="4" fill="currentColor" stroke="none">Xylem</text>
      <text x="40" y="62" font-size="4" fill="currentColor" stroke="none">Phloem</text>
      <text x="4" y="20" font-size="3" fill="currentColor" stroke="none">H₂O up</text>
      <text x="40" y="36" font-size="3" fill="currentColor" stroke="none">Sugar</text>
    </svg>`
  },
  {
    id: 'bot-leaf-venation',
    name: 'Leaf Venation',
    domain: 'biology',
    category: 'anatomy',
    tags: ['venation', 'parallel', 'reticulate', 'monocot', 'dicot'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="32" rx="12" ry="20" fill="#27AE60" opacity="0.3"/>
      <path d="M16 12v40"/>
      <path d="M8 32h16"/>
      <path d="M10 20l12 8"/>
      <path d="M10 44l12-8"/>
      <text x="4" y="60" font-size="3" fill="currentColor" stroke="none">Reticulate</text>
      <text x="6" y="8" font-size="3" fill="currentColor" stroke="none">(Dicot)</text>
      <ellipse cx="48" cy="32" rx="12" ry="20" fill="#27AE60" opacity="0.3"/>
      <path d="M40 12v40"/>
      <path d="M44 12v40"/>
      <path d="M48 12v40"/>
      <path d="M52 12v40"/>
      <path d="M56 12v40"/>
      <text x="36" y="60" font-size="3" fill="currentColor" stroke="none">Parallel</text>
      <text x="38" y="8" font-size="3" fill="currentColor" stroke="none">(Monocot)</text>
    </svg>`
  },

  // ===========================================================================
  // PLANT REPRODUCTION
  // ===========================================================================
  {
    id: 'bot-flower-structure',
    name: 'Flower Structure',
    domain: 'biology',
    category: 'reproduction',
    tags: ['flower', 'sepal', 'petal', 'stamen', 'pistil', 'carpel'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="6" ry="12" fill="#FF69B4" opacity="0.4"/>
      <ellipse cx="20" cy="24" rx="6" ry="12" fill="#FF69B4" opacity="0.4" transform="rotate(-45 20 24)"/>
      <ellipse cx="44" cy="24" rx="6" ry="12" fill="#FF69B4" opacity="0.4" transform="rotate(45 44 24)"/>
      <ellipse cx="16" cy="36" rx="6" ry="12" fill="#FF69B4" opacity="0.4" transform="rotate(-90 16 36)"/>
      <ellipse cx="48" cy="36" rx="6" ry="12" fill="#FF69B4" opacity="0.4" transform="rotate(90 48 36)"/>
      <circle cx="32" cy="32" r="8" fill="#F1C40F" opacity="0.6"/>
      <path d="M32 32v-16" stroke="#27AE60" stroke-width="2"/>
      <circle cx="32" cy="14" r="2" fill="#27AE60"/>
      <path d="M28 28v-12"/>
      <path d="M36 28v-12"/>
      <circle cx="28" cy="14" r="2" fill="#F39C12"/>
      <circle cx="36" cy="14" r="2" fill="#F39C12"/>
      <path d="M32 40v16" stroke="#228B22" stroke-width="2"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Pistil Stamen Petal</text>
    </svg>`
  },
  {
    id: 'bot-pollination',
    name: 'Pollination',
    domain: 'biology',
    category: 'reproduction',
    tags: ['pollination', 'pollen', 'bee', 'wind', 'cross-pollination'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="40" rx="8" ry="16" fill="#FF69B4" opacity="0.3"/>
      <circle cx="16" cy="36" r="4" fill="#F1C40F"/>
      <path d="M16 32v-8"/>
      <circle cx="16" cy="22" r="2" fill="#F39C12"/>
      <ellipse cx="48" cy="40" rx="8" ry="16" fill="#FF69B4" opacity="0.3"/>
      <circle cx="48" cy="36" r="4" fill="#F1C40F"/>
      <path d="M48 32v-8"/>
      <circle cx="48" cy="22" r="2" fill="#27AE60"/>
      <ellipse cx="32" cy="16" rx="6" ry="4" fill="#F1C40F" opacity="0.6"/>
      <path d="M26 16l-4 8" stroke="#F39C12" stroke-dasharray="2 2"/>
      <path d="M38 16l4 8" stroke="#F39C12" stroke-dasharray="2 2"/>
      <circle cx="32" cy="16" r="2" fill="#333"/>
      <path d="M28 12l-4-4"/>
      <path d="M36 12l4-4"/>
      <text x="28" y="10" font-size="3" fill="currentColor" stroke="none">Bee</text>
      <circle cx="20" cy="28" r="1" fill="#F39C12"/>
      <circle cx="44" cy="28" r="1" fill="#F39C12"/>
    </svg>`
  },
  {
    id: 'bot-seed-structure',
    name: 'Seed Structure',
    domain: 'biology',
    category: 'reproduction',
    tags: ['seed', 'embryo', 'cotyledon', 'endosperm', 'seed coat'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16" fill="#8B4513" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="24" ry="16"/>
      <ellipse cx="32" cy="32" rx="20" ry="12" fill="#F4D03F" opacity="0.4"/>
      <path d="M20 32c8-8 16-8 24 0" fill="#27AE60" opacity="0.5"/>
      <path d="M32 24v-8"/>
      <circle cx="32" cy="14" r="2" fill="#27AE60"/>
      <path d="M32 40v8"/>
      <text x="48" y="20" font-size="3" fill="currentColor" stroke="none">Seed coat</text>
      <text x="44" y="36" font-size="3" fill="currentColor" stroke="none">Cotyledon</text>
      <text x="4" y="48" font-size="3" fill="currentColor" stroke="none">Endosperm</text>
    </svg>`
  },
  {
    id: 'bot-germination',
    name: 'Seed Germination',
    domain: 'biology',
    category: 'reproduction',
    tags: ['germination', 'seedling', 'radicle', 'plumule', 'growth'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="40" width="56" height="20" fill="#8B4513" opacity="0.3"/>
      <ellipse cx="12" cy="44" rx="6" ry="4" fill="#F4D03F" opacity="0.6"/>
      <ellipse cx="28" cy="40" rx="6" ry="4" fill="#F4D03F" opacity="0.6"/>
      <path d="M28 36v-8"/>
      <path d="M28 44v8" stroke="#8B4513"/>
      <ellipse cx="48" cy="32" rx="6" ry="4" fill="#F4D03F" opacity="0.6"/>
      <path d="M48 28v-16" stroke="#27AE60" stroke-width="2"/>
      <path d="M44 16c4-4 8-4 8 0"/>
      <path d="M48 36v16" stroke="#8B4513" stroke-width="2"/>
      <path d="M44 52l-4 4"/>
      <path d="M52 52l4 4"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Dormant</text>
      <text x="22" y="62" font-size="3" fill="currentColor" stroke="none">Early</text>
      <text x="42" y="62" font-size="3" fill="currentColor" stroke="none">Seedling</text>
    </svg>`
  },
  {
    id: 'bot-fruit-types',
    name: 'Fruit Types',
    domain: 'biology',
    category: 'reproduction',
    tags: ['fruit', 'simple', 'aggregate', 'multiple', 'seed dispersal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="20" r="8" fill="#E74C3C" opacity="0.5"/>
      <text x="4" y="36" font-size="3" fill="currentColor" stroke="none">Simple</text>
      <text x="4" y="42" font-size="3" fill="currentColor" stroke="none">(Cherry)</text>
      <g transform="translate(32, 16)">
        <circle cx="0" cy="0" r="4" fill="#E74C3C" opacity="0.5"/>
        <circle cx="6" cy="4" r="4" fill="#E74C3C" opacity="0.5"/>
        <circle cx="-6" cy="4" r="4" fill="#E74C3C" opacity="0.5"/>
        <circle cx="0" cy="8" r="4" fill="#E74C3C" opacity="0.5"/>
      </g>
      <text x="22" y="36" font-size="3" fill="currentColor" stroke="none">Aggregate</text>
      <text x="22" y="42" font-size="3" fill="currentColor" stroke="none">(Raspberry)</text>
      <ellipse cx="52" cy="20" rx="8" ry="10" fill="#F1C40F" opacity="0.5"/>
      <path d="M52 10v-4"/>
      <text x="42" y="36" font-size="3" fill="currentColor" stroke="none">Multiple</text>
      <text x="42" y="42" font-size="3" fill="currentColor" stroke="none">(Pineapple)</text>
    </svg>`
  },
  {
    id: 'bot-plant-hormones',
    name: 'Plant Hormones',
    domain: 'biology',
    category: 'reproduction',
    tags: ['hormone', 'auxin', 'gibberellin', 'cytokinin', 'ethylene', 'growth'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 56v-40" stroke="#27AE60" stroke-width="2"/>
      <path d="M12 24c4-8 8-8 8 0"/>
      <circle cx="16" cy="12" r="4" fill="#F39C12" opacity="0.6"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Auxin</text>
      <path d="M36 56v-32" stroke="#27AE60" stroke-width="3"/>
      <path d="M30 32c6-12 12-12 12 0"/>
      <text x="28" y="62" font-size="3" fill="currentColor" stroke="none">Gibberellin</text>
      <path d="M52 56v-24" stroke="#27AE60" stroke-width="2"/>
      <circle cx="52" cy="28" r="3" fill="#9B59B6" opacity="0.6"/>
      <circle cx="48" cy="36" r="3" fill="#9B59B6" opacity="0.6"/>
      <circle cx="56" cy="36" r="3" fill="#9B59B6" opacity="0.6"/>
      <text x="44" y="62" font-size="3" fill="currentColor" stroke="none">Cytokinin</text>
    </svg>`
  },
];

export default botanyIcons;
