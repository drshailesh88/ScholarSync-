/**
 * Geology Icon Library
 * Comprehensive SVG icons for geological sciences
 *
 * Categories:
 * - Rocks & Minerals (igneous, sedimentary, metamorphic, crystals)
 * - Tectonic Processes (plates, faults, volcanoes, earthquakes)
 * - Stratigraphy (layers, formations, unconformities)
 * - Paleontology (fossils, specimens, dating)
 * - Field Equipment (tools, instruments, sampling)
 */

import type { IconDefinition } from './index';

export const geologyIcons: IconDefinition[] = [
  // ===========================================================================
  // ROCKS & MINERALS
  // ===========================================================================
  {
    id: 'geo-igneous-rock',
    name: 'Igneous Rock',
    domain: 'physics',
    category: 'rocks-minerals',
    tags: ['igneous', 'volcanic', 'magma', 'granite', 'basalt', 'crystalline'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 48l8-16 6 8 10-20 8 12 8-8v24H12z" fill="currentColor" opacity="0.2"/>
      <path d="M12 48l8-16 6 8 10-20 8 12 8-8v24H12z"/>
      <circle cx="24" cy="40" r="2" fill="currentColor"/>
      <circle cx="36" cy="36" r="3" fill="currentColor"/>
      <circle cx="44" cy="42" r="2" fill="currentColor"/>
      <circle cx="28" cy="44" r="1.5" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'geo-sedimentary-rock',
    name: 'Sedimentary Rock',
    domain: 'physics',
    category: 'rocks-minerals',
    tags: ['sedimentary', 'layers', 'sandstone', 'limestone', 'shale', 'strata'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="4"/>
      <line x1="8" y1="20" x2="56" y2="20"/>
      <line x1="8" y1="28" x2="56" y2="28"/>
      <line x1="8" y1="36" x2="56" y2="36"/>
      <line x1="8" y1="44" x2="56" y2="44"/>
      <path d="M16 16h8" stroke-dasharray="2 1"/>
      <path d="M40 24h12" stroke-dasharray="2 1"/>
      <path d="M12 32h6" stroke-dasharray="2 1"/>
      <path d="M32 40h10" stroke-dasharray="2 1"/>
    </svg>`
  },
  {
    id: 'geo-metamorphic-rock',
    name: 'Metamorphic Rock',
    domain: 'physics',
    category: 'rocks-minerals',
    tags: ['metamorphic', 'foliated', 'marble', 'slate', 'schist', 'gneiss'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <path d="M10 28c8 4 16 4 24 0s16-4 22 2"/>
      <path d="M12 36c6 4 14 4 20 0s14-4 20 2"/>
      <path d="M14 44c8 2 16 0 22-4"/>
      <path d="M18 20c6 2 14 2 20-2"/>
    </svg>`
  },
  {
    id: 'geo-crystal',
    name: 'Crystal Structure',
    domain: 'physics',
    category: 'rocks-minerals',
    tags: ['crystal', 'quartz', 'mineral', 'facets', 'gem', 'crystallography'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4l12 16v24l-12 16-12-16V20L32 4z" fill="currentColor" opacity="0.15"/>
      <path d="M32 4l12 16v24l-12 16-12-16V20L32 4z"/>
      <path d="M20 20l12 4 12-4"/>
      <path d="M20 44l12-4 12 4"/>
      <line x1="32" y1="24" x2="32" y2="40"/>
      <path d="M32 4l-12 16"/>
      <path d="M32 4l12 16"/>
    </svg>`
  },
  {
    id: 'geo-mineral-vein',
    name: 'Mineral Vein',
    domain: 'physics',
    category: 'rocks-minerals',
    tags: ['vein', 'ore', 'deposit', 'mineralization', 'hydrothermal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <path d="M12 20c8-4 12 8 20 6s10-8 18-4" stroke-width="3" fill="none"/>
      <path d="M16 36c6 4 10-6 16-4s8 8 16 4" stroke-width="2"/>
      <circle cx="24" cy="18" r="2" fill="currentColor"/>
      <circle cx="40" cy="22" r="2" fill="currentColor"/>
      <circle cx="32" cy="34" r="2" fill="currentColor"/>
    </svg>`
  },

  // ===========================================================================
  // TECTONIC PROCESSES
  // ===========================================================================
  {
    id: 'geo-tectonic-plate',
    name: 'Tectonic Plate',
    domain: 'physics',
    category: 'tectonics',
    tags: ['plate', 'tectonics', 'lithosphere', 'boundary', 'crust'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h48" stroke-width="2"/>
      <path d="M4 24h56" stroke-dasharray="4 2"/>
      <path d="M4 40h56" stroke-dasharray="4 2"/>
      <path d="M12 24v16" fill="none"/>
      <path d="M52 24v16" fill="none"/>
      <path d="M28 20l4 4 4-4"/>
      <path d="M28 44l4-4 4 4"/>
      <text x="16" y="30" font-size="6" fill="currentColor" stroke="none">←</text>
      <text x="44" y="30" font-size="6" fill="currentColor" stroke="none">→</text>
    </svg>`
  },
  {
    id: 'geo-fault-line',
    name: 'Fault Line',
    domain: 'physics',
    category: 'tectonics',
    tags: ['fault', 'fracture', 'displacement', 'normal', 'reverse', 'strike-slip'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 20h20l8 24h20"/>
      <path d="M8 28h18l8 24h22"/>
      <path d="M8 36h16l8 24"/>
      <path d="M28 8v16"/>
      <path d="M36 40v16"/>
      <path d="M24 12l4 8 4-4"/>
      <path d="M32 48l4 8 4-4"/>
    </svg>`
  },
  {
    id: 'geo-volcano',
    name: 'Volcano',
    domain: 'physics',
    category: 'tectonics',
    tags: ['volcano', 'eruption', 'magma', 'lava', 'volcanic', 'cone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56l20-36 4 8 4-8 20 36H8z" fill="currentColor" opacity="0.2"/>
      <path d="M8 56l20-36 4 8 4-8 20 36H8z"/>
      <path d="M28 20c-2-6 2-12 4-16 2 4 6 10 4 16"/>
      <path d="M26 10c-4-2-6-6-4-8"/>
      <path d="M38 10c4-2 6-6 4-8"/>
      <ellipse cx="32" cy="8" rx="6" ry="4" fill="currentColor" opacity="0.4"/>
      <path d="M24 40l-4 16"/>
      <path d="M40 40l4 16"/>
    </svg>`
  },
  {
    id: 'geo-earthquake',
    name: 'Earthquake Waves',
    domain: 'physics',
    category: 'tectonics',
    tags: ['earthquake', 'seismic', 'waves', 'tremor', 'epicenter', 'focus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="40" r="4" fill="currentColor"/>
      <circle cx="32" cy="40" r="10" stroke-dasharray="3 2"/>
      <circle cx="32" cy="40" r="18" stroke-dasharray="4 3"/>
      <circle cx="32" cy="40" r="26" stroke-dasharray="5 4"/>
      <path d="M8 20l6-8 4 12 6-16 6 20 6-14 4 10 6-12 6 8"/>
      <line x1="32" y1="40" x2="32" y2="54"/>
      <text x="28" y="60" font-size="5" fill="currentColor" stroke="none">Focus</text>
    </svg>`
  },
  {
    id: 'geo-subduction-zone',
    name: 'Subduction Zone',
    domain: 'physics',
    category: 'tectonics',
    tags: ['subduction', 'convergent', 'boundary', 'trench', 'oceanic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 28h24c4 0 6 4 8 12l12 16"/>
      <path d="M60 28H40"/>
      <rect x="4" y="20" width="24" height="8" fill="currentColor" opacity="0.3"/>
      <rect x="40" y="20" width="20" height="8" fill="currentColor" opacity="0.2"/>
      <path d="M28 28l4 4"/>
      <path d="M32 32l4 4"/>
      <path d="M36 36l4 4"/>
      <path d="M12 16l2-4 2 4"/>
      <path d="M50 16l2-4 2 4"/>
    </svg>`
  },

  // ===========================================================================
  // STRATIGRAPHY
  // ===========================================================================
  {
    id: 'geo-strata',
    name: 'Stratigraphic Layers',
    domain: 'physics',
    category: 'stratigraphy',
    tags: ['strata', 'layers', 'beds', 'formation', 'stratigraphic', 'sequence'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <path d="M8 16h48" fill="none"/>
      <path d="M8 26h48" fill="none"/>
      <path d="M8 38h48" fill="none"/>
      <path d="M8 48h48" fill="none"/>
      <text x="12" y="14" font-size="4" fill="currentColor" stroke="none">Q</text>
      <text x="12" y="23" font-size="4" fill="currentColor" stroke="none">T</text>
      <text x="12" y="35" font-size="4" fill="currentColor" stroke="none">K</text>
      <text x="12" y="46" font-size="4" fill="currentColor" stroke="none">J</text>
      <text x="12" y="54" font-size="4" fill="currentColor" stroke="none">Tr</text>
    </svg>`
  },
  {
    id: 'geo-unconformity',
    name: 'Unconformity',
    domain: 'physics',
    category: 'stratigraphy',
    tags: ['unconformity', 'erosion', 'gap', 'angular', 'disconformity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16h48"/>
      <path d="M8 24h48"/>
      <path d="M8 32c8-2 16 4 24 4s16-6 24-4" stroke-width="2"/>
      <path d="M8 40l12-8 12 4 12-4 12 8"/>
      <path d="M8 48l12-8 12 4 12-4 12 8"/>
      <path d="M8 56l12-8 12 4 12-4 12 8"/>
    </svg>`
  },
  {
    id: 'geo-fold',
    name: 'Geological Fold',
    domain: 'physics',
    category: 'stratigraphy',
    tags: ['fold', 'anticline', 'syncline', 'deformation', 'compression'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 40c8-24 16-24 24 0s16 24 24 0"/>
      <path d="M4 48c8-24 16-24 24 0s16 24 24 0"/>
      <path d="M4 32c8-24 16-24 24 0s16 24 24 0"/>
      <line x1="16" y1="16" x2="16" y2="24" stroke-dasharray="2 2"/>
      <line x1="48" y1="40" x2="48" y2="48" stroke-dasharray="2 2"/>
      <text x="12" y="14" font-size="5" fill="currentColor" stroke="none">A</text>
      <text x="44" y="54" font-size="5" fill="currentColor" stroke="none">S</text>
    </svg>`
  },
  {
    id: 'geo-cross-section',
    name: 'Geological Cross Section',
    domain: 'physics',
    category: 'stratigraphy',
    tags: ['cross-section', 'profile', 'structure', 'subsurface'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 16l12-4 16 8 16-8 12 4"/>
      <path d="M4 16v40h56V16"/>
      <path d="M4 28h56"/>
      <path d="M4 40c12-4 20 4 28 0s16 4 24 0"/>
      <path d="M20 16v12"/>
      <path d="M44 16v12"/>
      <circle cx="32" cy="48" r="4" fill="currentColor" opacity="0.3"/>
      <text x="28" y="50" font-size="4" fill="currentColor" stroke="none">Ore</text>
    </svg>`
  },

  // ===========================================================================
  // PALEONTOLOGY
  // ===========================================================================
  {
    id: 'geo-fossil-shell',
    name: 'Fossil Shell',
    domain: 'physics',
    category: 'paleontology',
    tags: ['fossil', 'ammonite', 'shell', 'invertebrate', 'specimen'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <path d="M32 8c0 24-16 24-16 24"/>
      <path d="M32 14c0 18-12 18-12 18"/>
      <path d="M32 20c0 12-8 12-8 12"/>
      <path d="M32 26c0 6-4 6-4 6"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'geo-fossil-bone',
    name: 'Fossil Bone',
    domain: 'physics',
    category: 'paleontology',
    tags: ['fossil', 'bone', 'dinosaur', 'vertebrate', 'skeleton'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 24c-4 0-8 4-8 8s4 8 8 8c2 0 4-1 6-3"/>
      <path d="M52 24c4 0 8 4 8 8s-4 8-8 8c-2 0-4-1-6-3"/>
      <rect x="18" y="26" width="28" height="12" rx="6"/>
      <circle cx="12" cy="20" r="4"/>
      <circle cx="12" cy="44" r="4"/>
      <circle cx="52" cy="20" r="4"/>
      <circle cx="52" cy="44" r="4"/>
    </svg>`
  },
  {
    id: 'geo-trilobite',
    name: 'Trilobite',
    domain: 'physics',
    category: 'paleontology',
    tags: ['trilobite', 'fossil', 'arthropod', 'paleozoic', 'index fossil'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="24"/>
      <path d="M16 16h32"/>
      <path d="M18 24h28"/>
      <path d="M18 32h28"/>
      <path d="M18 40h28"/>
      <path d="M20 48h24"/>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <circle cx="26" cy="12" r="2"/>
      <circle cx="38" cy="12" r="2"/>
    </svg>`
  },

  // ===========================================================================
  // FIELD EQUIPMENT
  // ===========================================================================
  {
    id: 'geo-rock-hammer',
    name: 'Rock Hammer',
    domain: 'physics',
    category: 'field-equipment',
    tags: ['hammer', 'pick', 'tool', 'field', 'geologist'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="24" width="8" height="32" rx="1"/>
      <path d="M20 8h24l4 8-4 8H20l-4-8 4-8z" fill="currentColor" opacity="0.2"/>
      <path d="M20 8h24l4 8-4 8H20l-4-8 4-8z"/>
      <path d="M44 16h12l4-4v8l-4-4"/>
      <line x1="24" y1="16" x2="40" y2="16"/>
    </svg>`
  },
  {
    id: 'geo-hand-lens',
    name: 'Hand Lens',
    domain: 'physics',
    category: 'field-equipment',
    tags: ['loupe', 'magnifier', 'lens', 'examination', 'field'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="28" cy="28" r="16"/>
      <circle cx="28" cy="28" r="12" fill="currentColor" opacity="0.1"/>
      <line x1="40" y1="40" x2="56" y2="56" stroke-width="6" stroke-linecap="round"/>
      <line x1="40" y1="40" x2="56" y2="56" stroke-width="3" stroke-linecap="round" stroke="white"/>
    </svg>`
  },
  {
    id: 'geo-compass-clinometer',
    name: 'Compass Clinometer',
    domain: 'physics',
    category: 'field-equipment',
    tags: ['compass', 'clinometer', 'brunton', 'strike', 'dip', 'orientation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <circle cx="32" cy="32" r="12"/>
      <path d="M32 20v4"/>
      <path d="M32 40v4"/>
      <path d="M20 32h4"/>
      <path d="M40 32h4"/>
      <path d="M32 32l-4-8" fill="currentColor"/>
      <path d="M32 32l4 8"/>
      <text x="28" y="22" font-size="4" fill="currentColor" stroke="none">N</text>
    </svg>`
  },
  {
    id: 'geo-core-sample',
    name: 'Core Sample',
    domain: 'physics',
    category: 'field-equipment',
    tags: ['core', 'drill', 'sample', 'borehole', 'cylinder'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="12" ry="4"/>
      <path d="M20 12v40c0 2.2 5.4 4 12 4s12-1.8 12-4V12"/>
      <ellipse cx="32" cy="52" rx="12" ry="4"/>
      <line x1="20" y1="20" x2="44" y2="20"/>
      <line x1="20" y1="28" x2="44" y2="28"/>
      <line x1="20" y1="36" x2="44" y2="36"/>
      <line x1="20" y1="44" x2="44" y2="44"/>
    </svg>`
  },
  {
    id: 'geo-seismograph',
    name: 'Seismograph',
    domain: 'physics',
    category: 'field-equipment',
    tags: ['seismograph', 'seismic', 'instrument', 'recording', 'waves'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <path d="M12 32h8l2-8 4 16 4-20 4 24 4-16 4 8 2-4h10"/>
      <line x1="12" y1="48" x2="52" y2="48"/>
      <circle cx="16" cy="16" r="4"/>
      <line x1="16" y1="20" x2="16" y2="48"/>
    </svg>`
  },
  {
    id: 'geo-thin-section',
    name: 'Thin Section',
    domain: 'physics',
    category: 'field-equipment',
    tags: ['thin section', 'petrography', 'microscope', 'slide', 'polarized'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" rx="2"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="8"/>
      <path d="M28 28l8 8"/>
      <path d="M36 28l-8 8"/>
      <rect x="12" y="24" width="8" height="16" fill="currentColor" opacity="0.1"/>
    </svg>`
  },
];

export default geologyIcons;
