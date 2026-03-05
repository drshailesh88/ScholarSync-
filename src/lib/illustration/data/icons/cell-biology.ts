/**
 * Cell Biology Icon Library
 * Comprehensive SVG icons for cell biology
 *
 * Categories:
 * - Cell Structure (organelles, membranes)
 * - Cell Division (mitosis, meiosis)
 * - Cellular Transport (diffusion, active transport)
 * - Cell Signaling (receptors, pathways)
 */

import type { IconDefinition } from './index';

export const cellbiologyIcons: IconDefinition[] = [
  // ===========================================================================
  // CELL STRUCTURE
  // ===========================================================================
  {
    id: 'cell-animal-cell',
    name: 'Animal Cell',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['animal cell', 'eukaryote', 'organelles', 'nucleus', 'cytoplasm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="24" fill="#FFE4E1" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="28" ry="24"/>
      <circle cx="32" cy="28" r="10" fill="#9B59B6" opacity="0.4"/>
      <circle cx="32" cy="26" r="3" fill="#9B59B6"/>
      <ellipse cx="16" cy="40" rx="6" ry="4" fill="#E74C3C" opacity="0.5"/>
      <ellipse cx="48" cy="36" rx="4" ry="6" fill="#27AE60" opacity="0.5"/>
      <circle cx="44" cy="20" r="4" fill="#F39C12" opacity="0.5"/>
      <path d="M20 20c4 4 8-4 12 0" stroke="#3498DB"/>
      <text x="28" y="58" font-size="3" fill="currentColor" stroke="none">Nucleus</text>
    </svg>`
  },
  {
    id: 'cell-nucleus',
    name: 'Nucleus Structure',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['nucleus', 'nuclear envelope', 'nucleolus', 'chromatin', 'nuclear pore'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="#9B59B6" opacity="0.2"/>
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="22" stroke-dasharray="2 2"/>
      <circle cx="32" cy="32" r="8" fill="#9B59B6" opacity="0.6"/>
      <path d="M20 24c8 4 8-4 16 0s8-4 12 0" stroke="#333" stroke-width="0.5"/>
      <path d="M16 36c8 4 8-4 16 0s8-4 16 0" stroke="#333" stroke-width="0.5"/>
      <circle cx="8" cy="32" r="2" fill="currentColor"/>
      <circle cx="56" cy="32" r="2" fill="currentColor"/>
      <circle cx="32" cy="8" r="2" fill="currentColor"/>
      <circle cx="32" cy="56" r="2" fill="currentColor"/>
      <text x="24" y="36" font-size="3" fill="currentColor" stroke="none">Nucleolus</text>
      <text x="4" y="44" font-size="3" fill="currentColor" stroke="none">Pore</text>
    </svg>`
  },
  {
    id: 'cell-mitochondria',
    name: 'Mitochondrion',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['mitochondria', 'cristae', 'matrix', 'ATP', 'respiration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="16" fill="#E74C3C" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="28" ry="16"/>
      <ellipse cx="32" cy="32" rx="24" ry="12" stroke-dasharray="2 2"/>
      <path d="M12 32c4-8 4 8 8 0s4 8 8 0s4 8 8 0s4 8 8 0s4 8 8 0"/>
      <path d="M12 28c0-4 4-4 4 0"/>
      <path d="M48 28c0-4 4-4 4 0"/>
      <circle cx="32" cy="32" r="4" fill="#F39C12" opacity="0.5"/>
      <text x="28" y="36" font-size="3" fill="currentColor" stroke="none">ATP</text>
      <text x="4" y="52" font-size="3" fill="currentColor" stroke="none">Cristae</text>
      <text x="40" y="52" font-size="3" fill="currentColor" stroke="none">Matrix</text>
    </svg>`
  },
  {
    id: 'cell-er',
    name: 'Endoplasmic Reticulum',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['ER', 'endoplasmic reticulum', 'rough ER', 'smooth ER', 'ribosomes'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16c8 8-8 8 0 16s-8 8 0 16s-8 8 0 16" stroke-width="2"/>
      <path d="M20 16c8 8-8 8 0 16s-8 8 0 16s-8 8 0 16" stroke-width="2"/>
      <circle cx="8" cy="16" r="2" fill="currentColor"/>
      <circle cx="8" cy="24" r="2" fill="currentColor"/>
      <circle cx="8" cy="32" r="2" fill="currentColor"/>
      <circle cx="8" cy="40" r="2" fill="currentColor"/>
      <circle cx="20" cy="20" r="2" fill="currentColor"/>
      <circle cx="20" cy="28" r="2" fill="currentColor"/>
      <circle cx="20" cy="36" r="2" fill="currentColor"/>
      <path d="M36 16c8 8-8 8 0 16s-8 8 0 16s-8 8 0 16" stroke-width="2"/>
      <path d="M48 16c8 8-8 8 0 16s-8 8 0 16s-8 8 0 16" stroke-width="2"/>
      <text x="4" y="62" font-size="4" fill="currentColor" stroke="none">Rough ER</text>
      <text x="36" y="62" font-size="4" fill="currentColor" stroke="none">Smooth ER</text>
    </svg>`
  },
  {
    id: 'cell-golgi',
    name: 'Golgi Apparatus',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['Golgi', 'cisternae', 'vesicle', 'secretion', 'modification'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16c16 4 32-4 48 0" stroke-width="2" fill="#F39C12" opacity="0.2"/>
      <path d="M10 24c14 4 28-4 44 0" stroke-width="2" fill="#F39C12" opacity="0.3"/>
      <path d="M12 32c12 4 24-4 40 0" stroke-width="2" fill="#F39C12" opacity="0.4"/>
      <path d="M14 40c10 4 20-4 36 0" stroke-width="2" fill="#F39C12" opacity="0.5"/>
      <path d="M16 48c8 4 16-4 32 0" stroke-width="2" fill="#F39C12" opacity="0.6"/>
      <circle cx="8" cy="32" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="56" cy="32" r="4" fill="#27AE60" opacity="0.5"/>
      <path d="M12 32h4" stroke-dasharray="2 2"/>
      <path d="M48 32h4" stroke-dasharray="2 2"/>
      <text x="4" y="60" font-size="3" fill="currentColor" stroke="none">Cis</text>
      <text x="48" y="60" font-size="3" fill="currentColor" stroke="none">Trans</text>
    </svg>`
  },
  {
    id: 'cell-lysosome',
    name: 'Lysosome',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['lysosome', 'digestive', 'enzymes', 'hydrolytic', 'autophagy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#9B59B6" opacity="0.3"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="24" cy="28" r="4" fill="#E74C3C" opacity="0.5"/>
      <circle cx="40" cy="28" r="3" fill="#F39C12" opacity="0.5"/>
      <circle cx="28" cy="40" r="3" fill="#3498DB" opacity="0.5"/>
      <circle cx="38" cy="38" r="4" fill="#27AE60" opacity="0.5"/>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">pH ~5</text>
      <text x="8" y="20" font-size="3" fill="currentColor" stroke="none">Hydrolases</text>
    </svg>`
  },
  {
    id: 'cell-membrane',
    name: 'Cell Membrane',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['cell membrane', 'phospholipid bilayer', 'fluid mosaic', 'proteins'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <g transform="translate(0,8)">
        <circle cx="8" cy="12" r="4" fill="#3498DB"/>
        <path d="M8 16v12"/>
        <path d="M6 16v12"/>
        <circle cx="20" cy="12" r="4" fill="#3498DB"/>
        <path d="M20 16v12"/>
        <path d="M18 16v12"/>
        <circle cx="32" cy="12" r="4" fill="#3498DB"/>
        <path d="M32 16v12"/>
        <path d="M30 16v12"/>
        <circle cx="44" cy="12" r="4" fill="#3498DB"/>
        <path d="M44 16v12"/>
        <path d="M42 16v12"/>
        <circle cx="56" cy="12" r="4" fill="#3498DB"/>
        <path d="M56 16v12"/>
        <path d="M54 16v12"/>
      </g>
      <g transform="translate(0,24)">
        <circle cx="8" cy="24" r="4" fill="#E74C3C"/>
        <path d="M8 12v12"/>
        <path d="M10 12v12"/>
        <circle cx="20" cy="24" r="4" fill="#E74C3C"/>
        <path d="M20 12v12"/>
        <path d="M22 12v12"/>
        <circle cx="32" cy="24" r="4" fill="#E74C3C"/>
        <path d="M32 12v12"/>
        <path d="M34 12v12"/>
        <circle cx="44" cy="24" r="4" fill="#E74C3C"/>
        <path d="M44 12v12"/>
        <path d="M46 12v12"/>
        <circle cx="56" cy="24" r="4" fill="#E74C3C"/>
        <path d="M56 12v12"/>
        <path d="M58 12v12"/>
      </g>
      <ellipse cx="32" cy="36" rx="8" ry="12" fill="#27AE60" opacity="0.5"/>
      <text x="20" y="62" font-size="3" fill="currentColor" stroke="none">Protein</text>
    </svg>`
  },
  {
    id: 'cell-cytoskeleton',
    name: 'Cytoskeleton',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['cytoskeleton', 'microtubules', 'actin', 'intermediate filaments'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="24"/>
      <path d="M16 16l32 32" stroke="#E74C3C" stroke-width="3"/>
      <path d="M48 16l-32 32" stroke="#E74C3C" stroke-width="3"/>
      <path d="M32 8v48" stroke="#E74C3C" stroke-width="3"/>
      <path d="M8 32h48" stroke="#E74C3C" stroke-width="3"/>
      <path d="M12 20c8 4 8-4 16 0s8-4 16 0s8-4 12 0" stroke="#3498DB"/>
      <path d="M12 44c8 4 8-4 16 0s8-4 16 0s8-4 12 0" stroke="#3498DB"/>
      <circle cx="32" cy="32" r="6" fill="#9B59B6" opacity="0.5"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Microtubules Actin Filaments</text>
    </svg>`
  },

  // ===========================================================================
  // CELL DIVISION
  // ===========================================================================
  {
    id: 'cell-mitosis',
    name: 'Mitosis Overview',
    domain: 'biology',
    category: 'cell-division',
    tags: ['mitosis', 'cell division', 'prophase', 'metaphase', 'anaphase', 'telophase'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="16" r="8" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="12" cy="16" r="4" fill="#9B59B6" opacity="0.5"/>
      <text x="4" y="30" font-size="3" fill="currentColor" stroke="none">Interphase</text>
      <ellipse cx="32" cy="16" rx="10" ry="8" fill="#FFE4E1" opacity="0.3"/>
      <path d="M24 16h16"/>
      <path d="M28 12l-4 4 4 4" stroke="#E74C3C"/>
      <path d="M36 12l4 4-4 4" stroke="#3498DB"/>
      <text x="24" y="30" font-size="3" fill="currentColor" stroke="none">Metaphase</text>
      <ellipse cx="52" cy="16" rx="10" ry="8" fill="#FFE4E1" opacity="0.3"/>
      <path d="M44 16l6-4"/>
      <path d="M60 16l-6-4"/>
      <path d="M44 16l6 4"/>
      <path d="M60 16l-6 4"/>
      <text x="44" y="30" font-size="3" fill="currentColor" stroke="none">Anaphase</text>
      <circle cx="22" cy="48" r="8" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="22" cy="48" r="4" fill="#9B59B6" opacity="0.5"/>
      <circle cx="42" cy="48" r="8" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="42" cy="48" r="4" fill="#9B59B6" opacity="0.5"/>
      <text x="20" y="62" font-size="3" fill="currentColor" stroke="none">2 Daughter cells</text>
    </svg>`
  },
  {
    id: 'cell-meiosis',
    name: 'Meiosis Overview',
    domain: 'biology',
    category: 'cell-division',
    tags: ['meiosis', 'reduction division', 'gametes', 'haploid', 'crossing over'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="8" r="6" fill="#FFE4E1" opacity="0.3"/>
      <text x="28" y="10" font-size="3" fill="currentColor" stroke="none">2n</text>
      <path d="M32 14v4"/>
      <circle cx="24" cy="26" r="6" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="40" cy="26" r="6" fill="#FFE4E1" opacity="0.3"/>
      <text x="20" y="28" font-size="3" fill="currentColor" stroke="none">2n</text>
      <text x="36" y="28" font-size="3" fill="currentColor" stroke="none">2n</text>
      <text x="48" y="28" font-size="3" fill="currentColor" stroke="none">Meiosis I</text>
      <path d="M24 32v4"/>
      <path d="M40 32v4"/>
      <circle cx="16" cy="44" r="5" fill="#87CEEB" opacity="0.3"/>
      <circle cx="32" cy="44" r="5" fill="#87CEEB" opacity="0.3"/>
      <circle cx="32" cy="44" r="5" fill="#87CEEB" opacity="0.3"/>
      <circle cx="48" cy="44" r="5" fill="#87CEEB" opacity="0.3"/>
      <text x="13" y="46" font-size="3" fill="currentColor" stroke="none">n</text>
      <text x="29" y="46" font-size="3" fill="currentColor" stroke="none">n</text>
      <text x="45" y="46" font-size="3" fill="currentColor" stroke="none">n</text>
      <text x="48" y="46" font-size="3" fill="currentColor" stroke="none">Meiosis II</text>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">4 Haploid gametes</text>
    </svg>`
  },
  {
    id: 'cell-cell-cycle',
    name: 'Cell Cycle',
    domain: 'biology',
    category: 'cell-division',
    tags: ['cell cycle', 'G1', 'S phase', 'G2', 'M phase', 'checkpoint'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <path d="M32 8a24 24 0 0 1 20.8 12" fill="none" stroke="#E74C3C" stroke-width="4"/>
      <path d="M52.8 20a24 24 0 0 1 0 24" fill="none" stroke="#F39C12" stroke-width="4"/>
      <path d="M52.8 44a24 24 0 0 1-20.8 12" fill="none" stroke="#27AE60" stroke-width="4"/>
      <path d="M32 56a24 24 0 0 1-20.8-12" fill="none" stroke="#3498DB" stroke-width="4"/>
      <path d="M11.2 44a24 24 0 0 1 0-24" fill="none" stroke="#9B59B6" stroke-width="4"/>
      <path d="M11.2 20a24 24 0 0 1 20.8-12" fill="none" stroke="#9B59B6" stroke-width="4"/>
      <text x="28" y="14" font-size="4" fill="currentColor" stroke="none">M</text>
      <text x="46" y="28" font-size="4" fill="currentColor" stroke="none">G1</text>
      <text x="46" y="44" font-size="4" fill="currentColor" stroke="none">S</text>
      <text x="28" y="54" font-size="4" fill="currentColor" stroke="none">G2</text>
      <text x="10" y="36" font-size="4" fill="currentColor" stroke="none">M</text>
    </svg>`
  },
  {
    id: 'cell-spindle',
    name: 'Mitotic Spindle',
    domain: 'biology',
    category: 'cell-division',
    tags: ['spindle', 'microtubules', 'centrosome', 'kinetochore', 'chromosome'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="32" r="4" fill="#F39C12" opacity="0.6"/>
      <circle cx="56" cy="32" r="4" fill="#F39C12" opacity="0.6"/>
      <path d="M12 32l16-8"/>
      <path d="M12 32l16 0"/>
      <path d="M12 32l16 8"/>
      <path d="M52 32l-16-8"/>
      <path d="M52 32l-16 0"/>
      <path d="M52 32l-16 8"/>
      <rect x="28" y="22" width="8" height="4" fill="#E74C3C" opacity="0.5"/>
      <rect x="28" y="30" width="8" height="4" fill="#3498DB" opacity="0.5"/>
      <rect x="28" y="38" width="8" height="4" fill="#27AE60" opacity="0.5"/>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Centrosome</text>
      <text x="24" y="56" font-size="3" fill="currentColor" stroke="none">Chromosomes</text>
    </svg>`
  },
  {
    id: 'cell-cytokinesis',
    name: 'Cytokinesis',
    domain: 'biology',
    category: 'cell-division',
    tags: ['cytokinesis', 'cleavage furrow', 'cell plate', 'division'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="20" fill="#FFE4E1" opacity="0.2"/>
      <path d="M32 12c0 8-8 12-8 20s8 12 8 20" fill="none"/>
      <path d="M32 12c0 8 8 12 8 20s-8 12-8 20" fill="none"/>
      <path d="M32 24v16" stroke="#E74C3C" stroke-width="2" stroke-dasharray="2 2"/>
      <circle cx="20" cy="32" r="6" fill="#9B59B6" opacity="0.4"/>
      <circle cx="44" cy="32" r="6" fill="#9B59B6" opacity="0.4"/>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">Cleavage furrow</text>
      <path d="M32 20l-4 4 4 4" stroke="#333"/>
      <path d="M32 20l4 4-4 4" stroke="#333"/>
    </svg>`
  },

  // ===========================================================================
  // CELLULAR TRANSPORT
  // ===========================================================================
  {
    id: 'cell-diffusion',
    name: 'Diffusion',
    domain: 'biology',
    category: 'transport',
    tags: ['diffusion', 'passive transport', 'concentration gradient', 'molecules'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="24" height="56" fill="#E74C3C" opacity="0.2"/>
      <rect x="36" y="4" width="24" height="56" fill="#E74C3C" opacity="0.05"/>
      <line x1="32" y1="4" x2="32" y2="60" stroke-dasharray="4 2"/>
      <circle cx="12" cy="16" r="3" fill="#E74C3C"/>
      <circle cx="20" cy="24" r="3" fill="#E74C3C"/>
      <circle cx="8" cy="32" r="3" fill="#E74C3C"/>
      <circle cx="16" cy="40" r="3" fill="#E74C3C"/>
      <circle cx="24" cy="48" r="3" fill="#E74C3C"/>
      <circle cx="44" cy="28" r="3" fill="#E74C3C" opacity="0.5"/>
      <circle cx="52" cy="40" r="3" fill="#E74C3C" opacity="0.5"/>
      <path d="M28 32l8 0" stroke="#E74C3C"/>
      <path d="M36 28l4 4-4 4" stroke="#E74C3C"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">High</text>
      <text x="44" y="62" font-size="3" fill="currentColor" stroke="none">Low</text>
    </svg>`
  },
  {
    id: 'cell-osmosis',
    name: 'Osmosis',
    domain: 'biology',
    category: 'transport',
    tags: ['osmosis', 'water', 'semipermeable', 'hypertonic', 'hypotonic', 'isotonic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="16" height="48" fill="#87CEEB" opacity="0.2"/>
      <rect x="24" y="8" width="16" height="48" fill="#87CEEB" opacity="0.4"/>
      <rect x="44" y="8" width="16" height="48" fill="#87CEEB" opacity="0.6"/>
      <circle cx="12" cy="32" r="8" fill="#FFE4E1"/>
      <circle cx="12" cy="32" r="6"/>
      <circle cx="32" cy="32" r="8" fill="#FFE4E1"/>
      <circle cx="52" cy="32" r="8" fill="#FFE4E1"/>
      <circle cx="52" cy="32" r="10"/>
      <path d="M4 24l4 0" stroke="#3498DB"/>
      <path d="M8 28l-4 4" stroke="#3498DB"/>
      <path d="M36 24l4 0" stroke="#3498DB"/>
      <path d="M36 28l4 0" stroke="#3498DB"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Hypertonic</text>
      <text x="24" y="62" font-size="3" fill="currentColor" stroke="none">Isotonic</text>
      <text x="44" y="62" font-size="3" fill="currentColor" stroke="none">Hypotonic</text>
    </svg>`
  },
  {
    id: 'cell-active-transport',
    name: 'Active Transport',
    domain: 'biology',
    category: 'transport',
    tags: ['active transport', 'ATP', 'pump', 'against gradient', 'Na-K pump'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="56" height="24"/>
      <ellipse cx="32" cy="32" rx="12" ry="16" fill="#27AE60" opacity="0.4"/>
      <circle cx="16" cy="16" r="4" fill="#E74C3C"/>
      <circle cx="24" cy="12" r="4" fill="#E74C3C"/>
      <path d="M20 20v8" stroke="#E74C3C"/>
      <path d="M16 28l4 4 4-4" stroke="#E74C3C"/>
      <circle cx="48" cy="48" r="4" fill="#3498DB"/>
      <circle cx="40" cy="52" r="4" fill="#3498DB"/>
      <path d="M44 44v-8" stroke="#3498DB"/>
      <path d="M40 36l4-4 4 4" stroke="#3498DB"/>
      <circle cx="32" cy="56" r="3" fill="#F39C12"/>
      <text x="28" y="60" font-size="4" fill="currentColor" stroke="none">ATP</text>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Na+ out</text>
      <text x="44" y="10" font-size="3" fill="currentColor" stroke="none">K+ in</text>
    </svg>`
  },
  {
    id: 'cell-endocytosis',
    name: 'Endocytosis',
    domain: 'biology',
    category: 'transport',
    tags: ['endocytosis', 'phagocytosis', 'pinocytosis', 'vesicle', 'uptake'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32c0-4 8-8 16-8h24c8 0 16 4 16 8"/>
      <path d="M20 24c0 8 8 16 12 16s12-8 12-16" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="32" cy="20" r="6" fill="#E74C3C" opacity="0.5"/>
      <path d="M4 32c0 4 8 8 16 8"/>
      <path d="M60 32c0 4-8 8-16 8"/>
      <path d="M20 40c0-4 8-8 12-8s12 4 12 8"/>
      <circle cx="32" cy="48" r="8" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="32" cy="48" r="4" fill="#E74C3C" opacity="0.5"/>
      <path d="M32 12v-4"/>
      <path d="M28 8l4 4 4-4"/>
      <text x="20" y="62" font-size="4" fill="currentColor" stroke="none">Vesicle forms</text>
    </svg>`
  },
  {
    id: 'cell-exocytosis',
    name: 'Exocytosis',
    domain: 'biology',
    category: 'transport',
    tags: ['exocytosis', 'secretion', 'vesicle', 'release', 'fusion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32c0 4 8 8 16 8h24c8 0 16-4 16-8"/>
      <circle cx="32" cy="48" r="8" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="32" cy="48" r="4" fill="#27AE60" opacity="0.5"/>
      <path d="M32 40v-8"/>
      <path d="M28 32l4-4 4 4"/>
      <path d="M24 32c0 4 4 8 8 8s8-4 8-8" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="32" cy="20" r="4" fill="#27AE60" opacity="0.5"/>
      <circle cx="24" cy="12" r="2" fill="#27AE60" opacity="0.5"/>
      <circle cx="40" cy="12" r="2" fill="#27AE60" opacity="0.5"/>
      <circle cx="32" cy="8" r="2" fill="#27AE60" opacity="0.5"/>
      <text x="16" y="62" font-size="4" fill="currentColor" stroke="none">Contents released</text>
    </svg>`
  },

  // ===========================================================================
  // CELL SIGNALING
  // ===========================================================================
  {
    id: 'cell-receptor',
    name: 'Cell Surface Receptor',
    domain: 'biology',
    category: 'signaling',
    tags: ['receptor', 'ligand', 'signal transduction', 'binding', 'membrane'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="28" width="56" height="8" fill="#3498DB" opacity="0.3"/>
      <path d="M32 28v-8c-4 0-8-4-8-8s4-8 8-8 8 4 8 8-4 8-8 8" fill="#27AE60" opacity="0.3"/>
      <circle cx="32" cy="8" r="4" fill="#E74C3C"/>
      <path d="M32 36v20" stroke-width="2"/>
      <path d="M24 44l8 4 8-4"/>
      <path d="M24 52l8 4 8-4"/>
      <circle cx="32" cy="56" r="3" fill="#F39C12"/>
      <text x="40" y="12" font-size="3" fill="currentColor" stroke="none">Ligand</text>
      <text x="40" y="24" font-size="3" fill="currentColor" stroke="none">Receptor</text>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Signal cascade</text>
    </svg>`
  },
  {
    id: 'cell-signal-cascade',
    name: 'Signal Transduction Cascade',
    domain: 'biology',
    category: 'signaling',
    tags: ['signal transduction', 'cascade', 'kinase', 'phosphorylation', 'pathway'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="8" r="6" fill="#E74C3C" opacity="0.5"/>
      <text x="28" y="12" font-size="4" fill="currentColor" stroke="none">L</text>
      <path d="M32 14v6"/>
      <rect x="24" y="20" width="16" height="8" fill="#27AE60" opacity="0.4"/>
      <text x="28" y="26" font-size="3" fill="currentColor" stroke="none">R</text>
      <path d="M32 28v4"/>
      <circle cx="32" cy="36" r="4" fill="#3498DB" opacity="0.5"/>
      <path d="M32 40v4"/>
      <circle cx="32" cy="48" r="4" fill="#9B59B6" opacity="0.5"/>
      <path d="M32 52v4"/>
      <rect x="24" y="56" width="16" height="6" fill="#F39C12" opacity="0.4"/>
      <text x="20" y="64" font-size="3" fill="currentColor" stroke="none">Gene expression</text>
      <text x="40" y="38" font-size="3" fill="currentColor" stroke="none">Kinase 1</text>
      <text x="40" y="50" font-size="3" fill="currentColor" stroke="none">Kinase 2</text>
    </svg>`
  },
  {
    id: 'cell-second-messenger',
    name: 'Second Messengers',
    domain: 'biology',
    category: 'signaling',
    tags: ['second messenger', 'cAMP', 'calcium', 'IP3', 'intracellular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="56" height="8" fill="#3498DB" opacity="0.3"/>
      <path d="M20 20v-8"/>
      <circle cx="20" cy="8" r="4" fill="#E74C3C"/>
      <ellipse cx="20" cy="24" rx="6" ry="4" fill="#27AE60" opacity="0.4"/>
      <path d="M20 28v8"/>
      <circle cx="20" cy="40" r="4" fill="#F39C12"/>
      <text x="28" y="42" font-size="3" fill="currentColor" stroke="none">cAMP</text>
      <circle cx="16" cy="52" r="2" fill="#F39C12" opacity="0.6"/>
      <circle cx="24" cy="52" r="2" fill="#F39C12" opacity="0.6"/>
      <circle cx="20" cy="56" r="2" fill="#F39C12" opacity="0.6"/>
      <ellipse cx="48" cy="24" rx="6" ry="4" fill="#9B59B6" opacity="0.4"/>
      <path d="M48 28v8"/>
      <circle cx="48" cy="40" r="4" fill="#87CEEB"/>
      <text x="52" y="42" font-size="3" fill="currentColor" stroke="none">Ca²⁺</text>
      <circle cx="44" cy="52" r="2" fill="#87CEEB" opacity="0.6"/>
      <circle cx="52" cy="52" r="2" fill="#87CEEB" opacity="0.6"/>
      <circle cx="48" cy="56" r="2" fill="#87CEEB" opacity="0.6"/>
    </svg>`
  },
  {
    id: 'cell-apoptosis',
    name: 'Apoptosis',
    domain: 'biology',
    category: 'signaling',
    tags: ['apoptosis', 'programmed cell death', 'caspase', 'fragmentation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="32" r="10" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="12" cy="32" r="4" fill="#9B59B6" opacity="0.5"/>
      <text x="4" y="52" font-size="3" fill="currentColor" stroke="none">Normal</text>
      <circle cx="36" cy="32" r="8" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="36" cy="32" r="3" fill="#9B59B6" opacity="0.5"/>
      <path d="M28 32c4-4 12-4 16 0"/>
      <path d="M28 32c4 4 12 4 16 0"/>
      <text x="28" y="52" font-size="3" fill="currentColor" stroke="none">Blebbing</text>
      <circle cx="52" cy="28" r="4" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="56" cy="36" r="3" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="48" cy="36" r="3" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="52" cy="40" r="2" fill="#FFE4E1" opacity="0.3"/>
      <text x="44" y="52" font-size="3" fill="currentColor" stroke="none">Apoptotic</text>
      <text x="48" y="58" font-size="3" fill="currentColor" stroke="none">bodies</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL ORGANELLES
  // ===========================================================================
  {
    id: 'cell-ribosome',
    name: 'Ribosome',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['ribosome', 'protein synthesis', 'translation', 'mRNA', 'tRNA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="16" ry="10" fill="#9B59B6" opacity="0.4"/>
      <ellipse cx="32" cy="24" rx="16" ry="10"/>
      <ellipse cx="32" cy="40" rx="20" ry="12" fill="#3498DB" opacity="0.4"/>
      <ellipse cx="32" cy="40" rx="20" ry="12"/>
      <path d="M16 32h32" stroke="#E74C3C" stroke-width="2"/>
      <text x="24" y="26" font-size="4" fill="currentColor" stroke="none">40S</text>
      <text x="24" y="44" font-size="4" fill="currentColor" stroke="none">60S</text>
    </svg>`
  },
  {
    id: 'cell-peroxisome',
    name: 'Peroxisome',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['peroxisome', 'oxidation', 'catalase', 'hydrogen peroxide', 'fatty acids'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22" fill="#27AE60" opacity="0.3"/>
      <circle cx="32" cy="32" r="22"/>
      <circle cx="32" cy="32" r="8" fill="#27AE60" opacity="0.6"/>
      <path d="M24 24l16 16" stroke="#333"/>
      <path d="M40 24l-16 16" stroke="#333"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">H2O2 breakdown</text>
    </svg>`
  },
  {
    id: 'cell-centriole',
    name: 'Centriole',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['centriole', 'centrosome', 'MTOC', 'microtubule', 'spindle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="8" ry="20" fill="#F39C12" opacity="0.3"/>
      <ellipse cx="24" cy="32" rx="8" ry="20"/>
      <ellipse cx="40" cy="32" rx="8" ry="20" fill="#F39C12" opacity="0.3" transform="rotate(90 40 32)"/>
      <ellipse cx="40" cy="32" rx="8" ry="20" transform="rotate(90 40 32)"/>
      <circle cx="24" cy="20" r="2" fill="currentColor"/>
      <circle cx="24" cy="32" r="2" fill="currentColor"/>
      <circle cx="24" cy="44" r="2" fill="currentColor"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <circle cx="48" cy="32" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'cell-vacuole',
    name: 'Vacuole',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['vacuole', 'storage', 'plant cell', 'turgor', 'tonoplast'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="26" ry="22" fill="#87CEEB" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="26" ry="22"/>
      <circle cx="20" cy="28" r="3" fill="#9B59B6" opacity="0.5"/>
      <circle cx="44" cy="36" r="2" fill="#E74C3C" opacity="0.5"/>
      <circle cx="32" cy="40" r="2" fill="#27AE60" opacity="0.5"/>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Central Vacuole</text>
    </svg>`
  },
  {
    id: 'cell-chloroplast',
    name: 'Chloroplast',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['chloroplast', 'photosynthesis', 'thylakoid', 'grana', 'stroma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="18" fill="#27AE60" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="28" ry="18"/>
      <ellipse cx="32" cy="32" rx="24" ry="14" stroke-dasharray="2 2"/>
      <rect x="16" y="26" width="6" height="12" rx="2" fill="#2ECC71"/>
      <rect x="26" y="26" width="6" height="12" rx="2" fill="#2ECC71"/>
      <rect x="36" y="26" width="6" height="12" rx="2" fill="#2ECC71"/>
      <path d="M19 26v-4h20v4" stroke="#2ECC71"/>
      <text x="48" y="36" font-size="3" fill="currentColor" stroke="none">Grana</text>
    </svg>`
  },
  {
    id: 'cell-plant-cell',
    name: 'Plant Cell',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['plant cell', 'cell wall', 'chloroplast', 'vacuole', 'plasmodesmata'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="4" fill="#90EE90" opacity="0.2"/>
      <rect x="4" y="4" width="56" height="56" rx="4" stroke-width="3"/>
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="#87CEEB" opacity="0.4"/>
      <circle cx="20" cy="24" r="4" fill="#9B59B6" opacity="0.5"/>
      <ellipse cx="48" cy="40" rx="6" ry="4" fill="#27AE60" opacity="0.6"/>
      <ellipse cx="16" cy="44" rx="5" ry="3" fill="#27AE60" opacity="0.6"/>
    </svg>`
  },

  // ===========================================================================
  // CELL MEMBRANE COMPONENTS
  // ===========================================================================
  {
    id: 'cell-ion-channel',
    name: 'Ion Channel',
    domain: 'biology',
    category: 'membrane',
    tags: ['ion channel', 'voltage gated', 'ligand gated', 'sodium', 'potassium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="56" height="24" fill="#3498DB" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="10" ry="16" fill="#27AE60" opacity="0.4"/>
      <path d="M28 16v32" stroke="#27AE60" stroke-width="2"/>
      <path d="M36 16v32" stroke="#27AE60" stroke-width="2"/>
      <circle cx="32" cy="12" r="3" fill="#E74C3C"/>
      <circle cx="32" cy="8" r="3" fill="#E74C3C"/>
      <path d="M32 52v4"/>
      <path d="M28 56l4 4 4-4"/>
      <text x="44" y="32" font-size="4" fill="currentColor" stroke="none">Na+</text>
    </svg>`
  },
  {
    id: 'cell-aquaporin',
    name: 'Aquaporin',
    domain: 'biology',
    category: 'membrane',
    tags: ['aquaporin', 'water channel', 'osmosis', 'membrane protein'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="56" height="24" fill="#3498DB" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="8" ry="14" fill="#87CEEB" opacity="0.4"/>
      <path d="M28 18v28"/>
      <path d="M36 18v28"/>
      <circle cx="32" cy="10" r="2" fill="#87CEEB"/>
      <circle cx="28" cy="14" r="2" fill="#87CEEB"/>
      <circle cx="36" cy="12" r="2" fill="#87CEEB"/>
      <circle cx="32" cy="54" r="2" fill="#87CEEB"/>
      <circle cx="28" cy="50" r="2" fill="#87CEEB"/>
      <text x="44" y="32" font-size="4" fill="currentColor" stroke="none">H2O</text>
    </svg>`
  },
  {
    id: 'cell-carrier-protein',
    name: 'Carrier Protein',
    domain: 'biology',
    category: 'membrane',
    tags: ['carrier protein', 'transporter', 'glucose', 'GLUT', 'facilitated'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="56" height="24" fill="#3498DB" opacity="0.2"/>
      <path d="M24 20c0 8 8 12 8 12s8-4 8-12" fill="#F39C12" opacity="0.4"/>
      <path d="M24 44c0-8 8-12 8-12s8 4 8 12" fill="#F39C12" opacity="0.4"/>
      <circle cx="32" cy="12" r="4" fill="#9B59B6"/>
      <path d="M32 16v4"/>
      <path d="M28 20l4 4 4-4"/>
      <circle cx="32" cy="52" r="4" fill="#9B59B6" opacity="0.5"/>
      <text x="44" y="16" font-size="4" fill="currentColor" stroke="none">Glucose</text>
    </svg>`
  },
  {
    id: 'cell-receptor-protein',
    name: 'Receptor Protein',
    domain: 'biology',
    category: 'membrane',
    tags: ['receptor', 'signal', 'hormone', 'neurotransmitter', 'binding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="56" height="16" fill="#3498DB" opacity="0.2"/>
      <path d="M28 24v-8c0-4 8-4 8 0v8" fill="#E74C3C" opacity="0.3"/>
      <circle cx="32" cy="12" r="4" fill="#27AE60"/>
      <path d="M28 40v16"/>
      <path d="M36 40v16"/>
      <circle cx="32" cy="60" r="3" fill="#F39C12"/>
      <text x="40" y="16" font-size="3" fill="currentColor" stroke="none">Ligand</text>
    </svg>`
  },
  {
    id: 'cell-cholesterol',
    name: 'Membrane Cholesterol',
    domain: 'biology',
    category: 'membrane',
    tags: ['cholesterol', 'membrane fluidity', 'lipid raft', 'steroid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="56" height="24" fill="#3498DB" opacity="0.2"/>
      <circle cx="16" cy="20" r="4" fill="#3498DB"/>
      <path d="M16 24v16"/>
      <circle cx="48" cy="44" r="4" fill="#E74C3C"/>
      <path d="M48 40v-16"/>
      <path d="M32 28l-4 8h8l-4 8" fill="#F39C12" opacity="0.6"/>
      <text x="24" y="58" font-size="3" fill="currentColor" stroke="none">Cholesterol</text>
    </svg>`
  },
  {
    id: 'cell-glycoprotein',
    name: 'Glycoprotein',
    domain: 'biology',
    category: 'membrane',
    tags: ['glycoprotein', 'glycocalyx', 'carbohydrate', 'cell recognition'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="28" width="56" height="16" fill="#3498DB" opacity="0.2"/>
      <rect x="28" y="28" width="8" height="20" fill="#9B59B6" opacity="0.4"/>
      <path d="M32 28v-4"/>
      <path d="M28 24h8"/>
      <circle cx="24" cy="20" r="3" fill="#F39C12"/>
      <circle cx="32" cy="16" r="3" fill="#E74C3C"/>
      <circle cx="40" cy="20" r="3" fill="#27AE60"/>
      <circle cx="28" cy="12" r="2" fill="#F39C12"/>
      <circle cx="36" cy="10" r="2" fill="#E74C3C"/>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">Glycocalyx</text>
    </svg>`
  },

  // ===========================================================================
  // CELL CYCLE PHASES
  // ===========================================================================
  {
    id: 'cell-prophase',
    name: 'Prophase',
    domain: 'biology',
    category: 'cell-division',
    tags: ['prophase', 'mitosis', 'chromosome condensation', 'nuclear envelope'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="#FFE4E1" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <circle cx="32" cy="32" r="12" stroke-dasharray="4 2" opacity="0.5"/>
      <path d="M24 28c4 0 4 8 8 8s4-8 8-8" stroke="#E74C3C" stroke-width="2"/>
      <path d="M24 36c4 0 4-8 8-8s4 8 8 8" stroke="#3498DB" stroke-width="2"/>
      <circle cx="16" cy="20" r="3" fill="#F39C12"/>
      <circle cx="48" cy="44" r="3" fill="#F39C12"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Prophase</text>
    </svg>`
  },
  {
    id: 'cell-metaphase',
    name: 'Metaphase',
    domain: 'biology',
    category: 'cell-division',
    tags: ['metaphase', 'mitosis', 'metaphase plate', 'spindle', 'alignment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="#FFE4E1" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <line x1="32" y1="12" x2="32" y2="52" stroke-dasharray="2 2"/>
      <rect x="28" y="20" width="8" height="6" fill="#E74C3C"/>
      <rect x="28" y="29" width="8" height="6" fill="#3498DB"/>
      <rect x="28" y="38" width="8" height="6" fill="#27AE60"/>
      <circle cx="8" cy="32" r="3" fill="#F39C12"/>
      <circle cx="56" cy="32" r="3" fill="#F39C12"/>
      <path d="M11 32h17"/>
      <path d="M36 32h17"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Metaphase</text>
    </svg>`
  },
  {
    id: 'cell-anaphase',
    name: 'Anaphase',
    domain: 'biology',
    category: 'cell-division',
    tags: ['anaphase', 'mitosis', 'sister chromatids', 'separation', 'spindle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="26" ry="18" fill="#FFE4E1" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="26" ry="18"/>
      <circle cx="6" cy="32" r="3" fill="#F39C12"/>
      <circle cx="58" cy="32" r="3" fill="#F39C12"/>
      <rect x="12" y="26" width="4" height="4" fill="#E74C3C"/>
      <rect x="12" y="32" width="4" height="4" fill="#3498DB"/>
      <rect x="12" y="38" width="4" height="4" fill="#27AE60"/>
      <rect x="48" y="26" width="4" height="4" fill="#E74C3C"/>
      <rect x="48" y="32" width="4" height="4" fill="#3498DB"/>
      <rect x="48" y="38" width="4" height="4" fill="#27AE60"/>
      <path d="M9 32h3"/>
      <path d="M52 32h3"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Anaphase</text>
    </svg>`
  },
  {
    id: 'cell-telophase',
    name: 'Telophase',
    domain: 'biology',
    category: 'cell-division',
    tags: ['telophase', 'mitosis', 'nuclear envelope', 'cleavage furrow'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12c-12 0-20 8-20 20s8 20 20 20" fill="#FFE4E1" opacity="0.3"/>
      <path d="M32 12c12 0 20 8 20 20s-8 20-20 20" fill="#FFE4E1" opacity="0.3"/>
      <path d="M32 12c-12 0-20 8-20 20s8 20 20 20"/>
      <path d="M32 12c12 0 20 8 20 20s-8 20-20 20"/>
      <path d="M32 20v24" stroke="#E74C3C" stroke-width="2" stroke-dasharray="2 2"/>
      <circle cx="20" cy="32" r="6" stroke-dasharray="2 2"/>
      <circle cx="44" cy="32" r="6" stroke-dasharray="2 2"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Telophase</text>
    </svg>`
  },
  {
    id: 'cell-g1-checkpoint',
    name: 'G1 Checkpoint',
    domain: 'biology',
    category: 'cell-division',
    tags: ['G1 checkpoint', 'restriction point', 'p53', 'Rb', 'cell cycle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" stroke-dasharray="4 2"/>
      <path d="M32 8v8"/>
      <circle cx="32" cy="20" r="4" fill="#E74C3C"/>
      <text x="40" y="22" font-size="4" fill="currentColor" stroke="none">STOP</text>
      <path d="M50 20a24 24 0 0 1 0 24" stroke="#27AE60" stroke-width="3"/>
      <text x="20" y="36" font-size="5" fill="currentColor" stroke="none">G1</text>
      <text x="12" y="58" font-size="3" fill="currentColor" stroke="none">Restriction Point</text>
    </svg>`
  },
  {
    id: 'cell-g2-checkpoint',
    name: 'G2 Checkpoint',
    domain: 'biology',
    category: 'cell-division',
    tags: ['G2 checkpoint', 'DNA damage', 'CDK1', 'cyclin B', 'cell cycle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" stroke-dasharray="4 2"/>
      <path d="M32 56v-8"/>
      <circle cx="32" cy="44" r="4" fill="#F39C12"/>
      <text x="40" y="46" font-size="4" fill="currentColor" stroke="none">CHECK</text>
      <path d="M14 44a24 24 0 0 1 0-24" stroke="#3498DB" stroke-width="3"/>
      <text x="20" y="36" font-size="5" fill="currentColor" stroke="none">G2</text>
      <text x="12" y="58" font-size="3" fill="currentColor" stroke="none">DNA Damage Check</text>
    </svg>`
  },

  // ===========================================================================
  // CELL DEATH MECHANISMS
  // ===========================================================================
  {
    id: 'cell-necrosis',
    name: 'Necrosis',
    domain: 'biology',
    category: 'cell-death',
    tags: ['necrosis', 'cell death', 'inflammation', 'lysis', 'trauma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#E74C3C" opacity="0.3"/>
      <path d="M12 32c8 0 8-8 16-8s8 8 16 8s8-8 8-8" stroke="#E74C3C"/>
      <path d="M12 32c8 0 8 8 16 8s8-8 16-8s8 8 8 8" stroke="#E74C3C"/>
      <circle cx="24" cy="28" r="3" fill="#333" opacity="0.5"/>
      <circle cx="40" cy="36" r="4" fill="#333" opacity="0.5"/>
      <circle cx="32" cy="44" r="2" fill="#333" opacity="0.5"/>
      <path d="M8 20l4 4"/>
      <path d="M12 16l4 4"/>
      <path d="M52 44l4 4"/>
      <path d="M56 40l4 4"/>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">Necrosis</text>
    </svg>`
  },
  {
    id: 'cell-autophagy',
    name: 'Autophagy',
    domain: 'biology',
    category: 'cell-death',
    tags: ['autophagy', 'self-eating', 'lysosome', 'autophagosome', 'recycling'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="20" r="8" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="20" cy="20" r="4" fill="#E74C3C" opacity="0.5"/>
      <path d="M28 20h8"/>
      <path d="M36 16l4 4-4 4"/>
      <circle cx="48" cy="20" r="10"/>
      <circle cx="48" cy="20" r="6" fill="#9B59B6" opacity="0.3"/>
      <circle cx="48" cy="20" r="3" fill="#E74C3C" opacity="0.5"/>
      <path d="M48 30v8"/>
      <path d="M44 38l4 4 4-4"/>
      <circle cx="48" cy="50" r="8" fill="#9B59B6" opacity="0.4"/>
      <circle cx="44" cy="48" r="2" fill="#27AE60"/>
      <circle cx="52" cy="52" r="2" fill="#27AE60"/>
      <text x="4" y="48" font-size="3" fill="currentColor" stroke="none">Autophagosome</text>
    </svg>`
  },
  {
    id: 'cell-caspase',
    name: 'Caspase Cascade',
    domain: 'biology',
    category: 'cell-death',
    tags: ['caspase', 'apoptosis', 'protease', 'cascade', 'executioner'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="10" r="6" fill="#E74C3C" opacity="0.5"/>
      <text x="26" y="14" font-size="5" fill="currentColor" stroke="none">8/9</text>
      <path d="M32 16v6"/>
      <path d="M28 22l4 4 4-4"/>
      <circle cx="32" cy="32" r="6" fill="#F39C12" opacity="0.5"/>
      <text x="28" y="36" font-size="5" fill="currentColor" stroke="none">3</text>
      <path d="M32 38v6"/>
      <path d="M28 44l4 4 4-4"/>
      <rect x="20" y="50" width="24" height="8" fill="#9B59B6" opacity="0.3"/>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Substrates</text>
    </svg>`
  },

  // ===========================================================================
  // CYTOSKELETON COMPONENTS
  // ===========================================================================
  {
    id: 'cell-actin-filament',
    name: 'Actin Filament',
    domain: 'biology',
    category: 'cytoskeleton',
    tags: ['actin', 'microfilament', 'F-actin', 'G-actin', 'polymerization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c4-4 8 4 12 0s8 4 12 0s8 4 12 0s8 4 12 0" stroke="#E74C3C" stroke-width="3"/>
      <path d="M8 36c4-4 8 4 12 0s8 4 12 0s8 4 12 0s8 4 12 0" stroke="#E74C3C" stroke-width="3"/>
      <circle cx="8" cy="32" r="3" fill="#E74C3C"/>
      <circle cx="8" cy="36" r="3" fill="#E74C3C"/>
      <text x="4" y="20" font-size="3" fill="currentColor" stroke="none">+ end</text>
      <text x="48" y="20" font-size="3" fill="currentColor" stroke="none">- end</text>
      <text x="16" y="52" font-size="4" fill="currentColor" stroke="none">Actin Filament (7nm)</text>
    </svg>`
  },
  {
    id: 'cell-microtubule',
    name: 'Microtubule',
    domain: 'biology',
    category: 'cytoskeleton',
    tags: ['microtubule', 'tubulin', 'alpha', 'beta', 'dynamic instability'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="12" cy="32" rx="4" ry="8" fill="#27AE60" opacity="0.3"/>
      <ellipse cx="12" cy="32" rx="4" ry="8"/>
      <rect x="12" y="24" width="44" height="16" fill="#27AE60" opacity="0.2"/>
      <path d="M12 24h44"/>
      <path d="M12 40h44"/>
      <ellipse cx="56" cy="32" rx="4" ry="8" fill="#27AE60" opacity="0.3"/>
      <circle cx="20" cy="28" r="2" fill="#3498DB"/>
      <circle cx="20" cy="36" r="2" fill="#9B59B6"/>
      <circle cx="28" cy="28" r="2" fill="#3498DB"/>
      <circle cx="28" cy="36" r="2" fill="#9B59B6"/>
      <text x="4" y="52" font-size="3" fill="currentColor" stroke="none">α-tubulin</text>
      <text x="36" y="52" font-size="3" fill="currentColor" stroke="none">β-tubulin</text>
    </svg>`
  },
  {
    id: 'cell-intermediate-filament',
    name: 'Intermediate Filament',
    domain: 'biology',
    category: 'cytoskeleton',
    tags: ['intermediate filament', 'keratin', 'vimentin', 'desmin', 'structural'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28c48 0 48 8 48 8" stroke="#9B59B6" stroke-width="2"/>
      <path d="M8 32c48 0 48 8 48 8" stroke="#9B59B6" stroke-width="2"/>
      <path d="M8 36c48 0 48 8 48 8" stroke="#9B59B6" stroke-width="2"/>
      <path d="M8 28c0 0 0 8 0 8" stroke="#9B59B6" stroke-width="4"/>
      <text x="8" y="52" font-size="3" fill="currentColor" stroke="none">Coiled-coil dimer</text>
      <text x="8" y="20" font-size="4" fill="currentColor" stroke="none">Intermediate Filament (10nm)</text>
    </svg>`
  },
  {
    id: 'cell-motor-protein',
    name: 'Motor Protein',
    domain: 'biology',
    category: 'cytoskeleton',
    tags: ['motor protein', 'kinesin', 'dynein', 'myosin', 'transport'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 44h48" stroke="#27AE60" stroke-width="4"/>
      <path d="M24 44v-12"/>
      <path d="M40 44v-12"/>
      <circle cx="24" cy="28" r="4" fill="#E74C3C"/>
      <circle cx="40" cy="28" r="4" fill="#E74C3C"/>
      <path d="M24 24v-8"/>
      <path d="M40 24v-8"/>
      <circle cx="32" cy="12" r="6" fill="#F39C12" opacity="0.5"/>
      <text x="28" y="16" font-size="4" fill="currentColor" stroke="none">V</text>
      <path d="M44 28l8-4"/>
      <path d="M52 24l4 4-4 4"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Kinesin</text>
    </svg>`
  },

  // ===========================================================================
  // CELL JUNCTIONS
  // ===========================================================================
  {
    id: 'cell-tight-junction',
    name: 'Tight Junction',
    domain: 'biology',
    category: 'junctions',
    tags: ['tight junction', 'zonula occludens', 'claudin', 'occludin', 'barrier'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="24" height="48" fill="#FFE4E1" opacity="0.3"/>
      <rect x="36" y="8" width="24" height="48" fill="#FFE4E1" opacity="0.3"/>
      <path d="M28 12h8"/>
      <path d="M28 20h8"/>
      <path d="M28 28h8"/>
      <path d="M28 36h8"/>
      <path d="M28 44h8"/>
      <path d="M28 52h8"/>
      <circle cx="32" cy="12" r="2" fill="#E74C3C"/>
      <circle cx="32" cy="28" r="2" fill="#E74C3C"/>
      <circle cx="32" cy="44" r="2" fill="#E74C3C"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Tight Junction</text>
    </svg>`
  },
  {
    id: 'cell-gap-junction',
    name: 'Gap Junction',
    domain: 'biology',
    category: 'junctions',
    tags: ['gap junction', 'connexin', 'connexon', 'communication', 'ions'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="20" height="48" fill="#FFE4E1" opacity="0.3"/>
      <rect x="40" y="8" width="20" height="48" fill="#FFE4E1" opacity="0.3"/>
      <circle cx="24" cy="24" r="6" fill="#27AE60" opacity="0.3"/>
      <circle cx="40" cy="24" r="6" fill="#27AE60" opacity="0.3"/>
      <path d="M30 24h4"/>
      <circle cx="24" cy="40" r="6" fill="#27AE60" opacity="0.3"/>
      <circle cx="40" cy="40" r="6" fill="#27AE60" opacity="0.3"/>
      <path d="M30 40h4"/>
      <circle cx="32" cy="24" r="2" fill="#3498DB"/>
      <circle cx="32" cy="40" r="2" fill="#3498DB"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Gap Junction</text>
    </svg>`
  },
  {
    id: 'cell-desmosome',
    name: 'Desmosome',
    domain: 'biology',
    category: 'junctions',
    tags: ['desmosome', 'cadherin', 'plaque', 'keratin', 'adhesion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="20" height="48" fill="#FFE4E1" opacity="0.3"/>
      <rect x="40" y="8" width="20" height="48" fill="#FFE4E1" opacity="0.3"/>
      <rect x="22" y="24" width="4" height="16" fill="#9B59B6" opacity="0.5"/>
      <rect x="38" y="24" width="4" height="16" fill="#9B59B6" opacity="0.5"/>
      <path d="M26 28h12"/>
      <path d="M26 32h12"/>
      <path d="M26 36h12"/>
      <path d="M12 24c4 4 4 16 0 16" stroke="#E74C3C"/>
      <path d="M52 24c-4 4-4 16 0 16" stroke="#E74C3C"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Desmosome</text>
    </svg>`
  },
  {
    id: 'cell-adherens-junction',
    name: 'Adherens Junction',
    domain: 'biology',
    category: 'junctions',
    tags: ['adherens junction', 'cadherin', 'catenin', 'actin', 'adhesion belt'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="20" height="48" fill="#FFE4E1" opacity="0.3"/>
      <rect x="40" y="8" width="20" height="48" fill="#FFE4E1" opacity="0.3"/>
      <path d="M24 24c4 4 4 16 0 16"/>
      <path d="M40 24c-4 4-4 16 0 16"/>
      <path d="M28 28h8"/>
      <path d="M28 36h8"/>
      <path d="M8 24c4 4 8 0 12 4" stroke="#3498DB" stroke-width="2"/>
      <path d="M8 40c4-4 8 0 12-4" stroke="#3498DB" stroke-width="2"/>
      <path d="M44 28c4 0 8-4 12-4" stroke="#3498DB" stroke-width="2"/>
      <path d="M44 36c4 0 8 4 12 4" stroke="#3498DB" stroke-width="2"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Adherens Junction</text>
    </svg>`
  },
  {
    id: 'cell-hemidesmosome',
    name: 'Hemidesmosome',
    domain: 'biology',
    category: 'junctions',
    tags: ['hemidesmosome', 'integrin', 'basement membrane', 'adhesion', 'ECM'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="24" fill="#FFE4E1" opacity="0.3"/>
      <rect x="8" y="8" width="48" height="24"/>
      <rect x="4" y="40" width="56" height="8" fill="#F39C12" opacity="0.3"/>
      <rect x="4" y="40" width="56" height="8"/>
      <rect x="28" y="28" width="8" height="16" fill="#9B59B6" opacity="0.5"/>
      <path d="M16 20c4 8 4 8 4 8" stroke="#E74C3C"/>
      <path d="M48 20c-4 8-4 8-4 8" stroke="#E74C3C"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Basement Membrane</text>
    </svg>`
  },

  // ===========================================================================
  // CELL TYPES
  // ===========================================================================
  {
    id: 'cell-epithelial',
    name: 'Epithelial Cell',
    domain: 'biology',
    category: 'cell-types',
    tags: ['epithelial', 'columnar', 'cuboidal', 'squamous', 'barrier'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="16" height="48" fill="#FFE4E1" opacity="0.3"/>
      <rect x="8" y="8" width="16" height="48"/>
      <rect x="24" y="8" width="16" height="48" fill="#FFE4E1" opacity="0.3"/>
      <rect x="24" y="8" width="16" height="48"/>
      <rect x="40" y="8" width="16" height="48" fill="#FFE4E1" opacity="0.3"/>
      <rect x="40" y="8" width="16" height="48"/>
      <circle cx="16" cy="24" r="4" fill="#9B59B6" opacity="0.5"/>
      <circle cx="32" cy="24" r="4" fill="#9B59B6" opacity="0.5"/>
      <circle cx="48" cy="24" r="4" fill="#9B59B6" opacity="0.5"/>
      <path d="M12 8v-4"/>
      <path d="M16 8v-4"/>
      <path d="M20 8v-4"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Columnar Epithelium</text>
    </svg>`
  },
  {
    id: 'cell-muscle',
    name: 'Muscle Cell',
    domain: 'biology',
    category: 'cell-types',
    tags: ['muscle', 'myocyte', 'sarcomere', 'striated', 'contraction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="56" height="24" rx="4" fill="#E74C3C" opacity="0.3"/>
      <rect x="4" y="20" width="56" height="24" rx="4"/>
      <path d="M12 20v24"/>
      <path d="M20 20v24"/>
      <path d="M28 20v24"/>
      <path d="M36 20v24"/>
      <path d="M44 20v24"/>
      <path d="M52 20v24"/>
      <rect x="12" y="28" width="8" height="8" fill="#9B59B6" opacity="0.5"/>
      <rect x="28" y="28" width="8" height="8" fill="#9B59B6" opacity="0.5"/>
      <rect x="44" y="28" width="8" height="8" fill="#9B59B6" opacity="0.5"/>
      <ellipse cx="8" cy="32" r="3" ry="8" fill="#9B59B6"/>
      <text x="16" y="52" font-size="3" fill="currentColor" stroke="none">Striated Muscle</text>
    </svg>`
  },
  {
    id: 'cell-neuron',
    name: 'Neuron',
    domain: 'biology',
    category: 'cell-types',
    tags: ['neuron', 'nerve cell', 'axon', 'dendrite', 'synapse'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="32" r="10" fill="#9B59B6" opacity="0.3"/>
      <circle cx="16" cy="32" r="10"/>
      <circle cx="16" cy="32" r="4" fill="#9B59B6"/>
      <path d="M26 32h28" stroke-width="2"/>
      <path d="M54 28v8"/>
      <path d="M58 30v4"/>
      <path d="M6 24l-4-8"/>
      <path d="M8 22l-8-4"/>
      <path d="M10 40l-8 8"/>
      <path d="M8 42l-4 8"/>
      <circle cx="40" cy="32" r="2" fill="#F39C12"/>
      <text x="20" y="58" font-size="3" fill="currentColor" stroke="none">Neuron</text>
    </svg>`
  },
  {
    id: 'cell-red-blood-cell',
    name: 'Red Blood Cell',
    domain: 'biology',
    category: 'cell-types',
    tags: ['RBC', 'erythrocyte', 'hemoglobin', 'oxygen', 'biconcave'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16" fill="#E74C3C" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="24" ry="16"/>
      <ellipse cx="32" cy="32" rx="12" ry="8" fill="#FFCCCB" opacity="0.6"/>
      <path d="M20 32c4-4 8 0 12 0s8 4 12 0"/>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">Erythrocyte</text>
    </svg>`
  },
  {
    id: 'cell-white-blood-cell',
    name: 'White Blood Cell',
    domain: 'biology',
    category: 'cell-types',
    tags: ['WBC', 'leukocyte', 'immune', 'neutrophil', 'lymphocyte'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#87CEEB" opacity="0.3"/>
      <circle cx="32" cy="32" r="20"/>
      <path d="M24 28c4 4 8-4 12 0s4 8 8 4" fill="#9B59B6" opacity="0.5"/>
      <path d="M20 36c4-4 8 4 12 0s8-4 12 0" fill="#9B59B6" opacity="0.5"/>
      <circle cx="24" cy="24" r="3" fill="#E74C3C" opacity="0.4"/>
      <circle cx="40" cy="40" r="3" fill="#E74C3C" opacity="0.4"/>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">Leukocyte</text>
    </svg>`
  },
  {
    id: 'cell-platelet',
    name: 'Platelet',
    domain: 'biology',
    category: 'cell-types',
    tags: ['platelet', 'thrombocyte', 'clotting', 'hemostasis', 'megakaryocyte'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="10" fill="#F39C12" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="16" ry="10"/>
      <circle cx="28" cy="30" r="2" fill="#9B59B6"/>
      <circle cx="36" cy="34" r="2" fill="#9B59B6"/>
      <circle cx="32" cy="28" r="1.5" fill="#E74C3C"/>
      <text x="16" y="54" font-size="3" fill="currentColor" stroke="none">Thrombocyte</text>
    </svg>`
  },
  {
    id: 'cell-stem-cell',
    name: 'Stem Cell',
    domain: 'biology',
    category: 'cell-types',
    tags: ['stem cell', 'pluripotent', 'differentiation', 'self-renewal', 'progenitor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="12" fill="#27AE60" opacity="0.3"/>
      <circle cx="32" cy="24" r="12"/>
      <circle cx="32" cy="24" r="4" fill="#27AE60"/>
      <path d="M32 36v4"/>
      <path d="M24 44l8 4 8-4"/>
      <circle cx="16" cy="52" r="6" fill="#E74C3C" opacity="0.3"/>
      <circle cx="32" cy="56" r="6" fill="#3498DB" opacity="0.3"/>
      <circle cx="48" cy="52" r="6" fill="#9B59B6" opacity="0.3"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Differentiation</text>
    </svg>`
  },

  // ===========================================================================
  // VESICULAR TRANSPORT
  // ===========================================================================
  {
    id: 'cell-clathrin-vesicle',
    name: 'Clathrin-Coated Vesicle',
    domain: 'biology',
    category: 'transport',
    tags: ['clathrin', 'vesicle', 'receptor-mediated', 'endocytosis', 'coat'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#F39C12" opacity="0.3"/>
      <polygon points="32,16 44,24 44,40 32,48 20,40 20,24" fill="none" stroke="#E74C3C"/>
      <path d="M32 16v32"/>
      <path d="M20 24l24 16"/>
      <path d="M44 24l-24 16"/>
      <circle cx="32" cy="32" r="8" fill="#3498DB" opacity="0.4"/>
      <text x="12" y="58" font-size="3" fill="currentColor" stroke="none">Clathrin Coat</text>
    </svg>`
  },
  {
    id: 'cell-copi-vesicle',
    name: 'COPI Vesicle',
    domain: 'biology',
    category: 'transport',
    tags: ['COPI', 'vesicle', 'retrograde', 'Golgi', 'ER'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="14" fill="#9B59B6" opacity="0.3"/>
      <circle cx="32" cy="32" r="14"/>
      <circle cx="24" cy="26" r="3" fill="#9B59B6"/>
      <circle cx="40" cy="26" r="3" fill="#9B59B6"/>
      <circle cx="32" cy="38" r="3" fill="#9B59B6"/>
      <circle cx="24" cy="38" r="3" fill="#9B59B6"/>
      <circle cx="40" cy="38" r="3" fill="#9B59B6"/>
      <path d="M48 32l8 0"/>
      <path d="M56 28l4 4-4 4"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">COPI (Retrograde)</text>
    </svg>`
  },
  {
    id: 'cell-copii-vesicle',
    name: 'COPII Vesicle',
    domain: 'biology',
    category: 'transport',
    tags: ['COPII', 'vesicle', 'anterograde', 'ER', 'Golgi'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="14" fill="#3498DB" opacity="0.3"/>
      <circle cx="32" cy="32" r="14"/>
      <rect x="26" y="26" width="4" height="4" fill="#3498DB"/>
      <rect x="34" y="26" width="4" height="4" fill="#3498DB"/>
      <rect x="26" y="34" width="4" height="4" fill="#3498DB"/>
      <rect x="34" y="34" width="4" height="4" fill="#3498DB"/>
      <path d="M48 32l8 0"/>
      <path d="M56 28l4 4-4 4"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">COPII (Anterograde)</text>
    </svg>`
  },
  {
    id: 'cell-snare-fusion',
    name: 'SNARE Complex',
    domain: 'biology',
    category: 'transport',
    tags: ['SNARE', 'fusion', 'v-SNARE', 't-SNARE', 'membrane fusion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="56" height="12" fill="#3498DB" opacity="0.3"/>
      <rect x="4" y="8" width="56" height="12"/>
      <circle cx="32" cy="40" r="12" fill="#F39C12" opacity="0.3"/>
      <circle cx="32" cy="40" r="12"/>
      <path d="M28 20v8c0 4 8 4 8 0v-8" stroke="#E74C3C" stroke-width="2"/>
      <path d="M24 28l8 4 8-4" stroke="#27AE60" stroke-width="2"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">SNARE Fusion</text>
    </svg>`
  },

  // ===========================================================================
  // SIGNALING PATHWAYS
  // ===========================================================================
  {
    id: 'cell-gpcr',
    name: 'G-Protein Coupled Receptor',
    domain: 'biology',
    category: 'signaling',
    tags: ['GPCR', 'G-protein', 'seven transmembrane', 'signal', 'receptor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="56" height="16" fill="#3498DB" opacity="0.2"/>
      <path d="M16 20v-8c4 0 4 8 8 0v8" fill="#27AE60" opacity="0.3"/>
      <path d="M24 20v16c4 8 4-8 8 0v-16" fill="#27AE60" opacity="0.3"/>
      <path d="M32 20v-8c4 0 4 8 8 0v8" fill="#27AE60" opacity="0.3"/>
      <path d="M40 20v16c4 8 4-8 8 0v-16" fill="#27AE60" opacity="0.3"/>
      <circle cx="24" cy="8" r="4" fill="#E74C3C"/>
      <ellipse cx="32" cy="48" rx="8" ry="4" fill="#F39C12" opacity="0.5"/>
      <text x="40" y="52" font-size="3" fill="currentColor" stroke="none">G-protein</text>
    </svg>`
  },
  {
    id: 'cell-rtk',
    name: 'Receptor Tyrosine Kinase',
    domain: 'biology',
    category: 'signaling',
    tags: ['RTK', 'tyrosine kinase', 'dimerization', 'phosphorylation', 'growth factor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="56" height="12" fill="#3498DB" opacity="0.2"/>
      <rect x="20" y="24" width="8" height="32" fill="#9B59B6" opacity="0.3"/>
      <rect x="36" y="24" width="8" height="32" fill="#9B59B6" opacity="0.3"/>
      <path d="M24 24v-8c0-4 8-4 8 0v8"/>
      <path d="M40 24v-8c0-4 8-4 8 0v8"/>
      <circle cx="28" cy="12" r="4" fill="#E74C3C"/>
      <circle cx="44" cy="12" r="4" fill="#E74C3C"/>
      <circle cx="24" cy="48" r="3" fill="#F39C12"/>
      <circle cx="40" cy="48" r="3" fill="#F39C12"/>
      <text x="48" y="52" font-size="3" fill="currentColor" stroke="none">P</text>
    </svg>`
  },
  {
    id: 'cell-mapk-pathway',
    name: 'MAPK Pathway',
    domain: 'biology',
    category: 'signaling',
    tags: ['MAPK', 'ERK', 'Ras', 'Raf', 'MEK', 'cascade'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="8" r="5" fill="#E74C3C" opacity="0.5"/>
      <text x="28" y="12" font-size="4" fill="currentColor" stroke="none">Ras</text>
      <path d="M32 13v5"/>
      <circle cx="32" cy="24" r="5" fill="#F39C12" opacity="0.5"/>
      <text x="28" y="28" font-size="4" fill="currentColor" stroke="none">Raf</text>
      <path d="M32 29v5"/>
      <circle cx="32" cy="40" r="5" fill="#27AE60" opacity="0.5"/>
      <text x="26" y="44" font-size="4" fill="currentColor" stroke="none">MEK</text>
      <path d="M32 45v5"/>
      <circle cx="32" cy="56" r="5" fill="#3498DB" opacity="0.5"/>
      <text x="26" y="60" font-size="4" fill="currentColor" stroke="none">ERK</text>
    </svg>`
  },
  {
    id: 'cell-pi3k-pathway',
    name: 'PI3K/Akt Pathway',
    domain: 'biology',
    category: 'signaling',
    tags: ['PI3K', 'Akt', 'mTOR', 'survival', 'growth'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="56" height="8" fill="#3498DB" opacity="0.2"/>
      <circle cx="32" cy="12" r="4" fill="#E74C3C"/>
      <path d="M32 16v6"/>
      <circle cx="32" cy="28" r="6" fill="#9B59B6" opacity="0.5"/>
      <text x="26" y="32" font-size="4" fill="currentColor" stroke="none">PI3K</text>
      <path d="M32 34v6"/>
      <circle cx="32" cy="46" r="6" fill="#27AE60" opacity="0.5"/>
      <text x="28" y="50" font-size="4" fill="currentColor" stroke="none">Akt</text>
      <path d="M38 46h8"/>
      <circle cx="52" cy="46" r="5" fill="#F39C12" opacity="0.5"/>
      <text x="44" y="50" font-size="3" fill="currentColor" stroke="none">mTOR</text>
    </svg>`
  },
  {
    id: 'cell-calcium-signaling',
    name: 'Calcium Signaling',
    domain: 'biology',
    category: 'signaling',
    tags: ['calcium', 'IP3', 'DAG', 'PKC', 'calmodulin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="56" height="12" fill="#3498DB" opacity="0.2"/>
      <ellipse cx="20" cy="44" rx="12" ry="8" fill="#F39C12" opacity="0.3"/>
      <ellipse cx="20" cy="44" rx="12" ry="8"/>
      <text x="16" y="48" font-size="4" fill="currentColor" stroke="none">ER</text>
      <circle cx="40" cy="40" r="3" fill="#87CEEB"/>
      <circle cx="48" cy="44" r="3" fill="#87CEEB"/>
      <circle cx="44" cy="50" r="3" fill="#87CEEB"/>
      <circle cx="52" cy="52" r="3" fill="#87CEEB"/>
      <path d="M32 44l4-4"/>
      <path d="M36 40l4 4"/>
      <text x="40" y="60" font-size="3" fill="currentColor" stroke="none">Ca2+</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL STRUCTURES
  // ===========================================================================
  {
    id: 'cell-centromere',
    name: 'Centromere',
    domain: 'biology',
    category: 'cell-division',
    tags: ['centromere', 'chromosome', 'kinetochore', 'sister chromatids'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8v48" stroke="#E74C3C" stroke-width="4"/>
      <path d="M28 8v48" stroke="#E74C3C" stroke-width="4"/>
      <path d="M36 8v48" stroke="#3498DB" stroke-width="4"/>
      <path d="M44 8v48" stroke="#3498DB" stroke-width="4"/>
      <ellipse cx="32" cy="32" rx="16" ry="6" fill="#9B59B6" opacity="0.5"/>
      <circle cx="32" cy="32" r="4" fill="#27AE60"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Centromere/Kinetochore</text>
    </svg>`
  },
  {
    id: 'cell-chromatin',
    name: 'Chromatin Structure',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['chromatin', 'nucleosome', 'histone', 'DNA', 'packaging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="20" r="6" fill="#F39C12" opacity="0.5"/>
      <circle cx="28" cy="20" r="6" fill="#F39C12" opacity="0.5"/>
      <circle cx="44" cy="20" r="6" fill="#F39C12" opacity="0.5"/>
      <circle cx="20" cy="36" r="6" fill="#F39C12" opacity="0.5"/>
      <circle cx="36" cy="36" r="6" fill="#F39C12" opacity="0.5"/>
      <circle cx="52" cy="36" r="6" fill="#F39C12" opacity="0.5"/>
      <path d="M6 20c0 4 6 4 6 0s6 0 6 4s6 4 6 0s6 0 6 4s6 4 6 0" stroke="#3498DB"/>
      <path d="M14 36c0-4 6-4 6 0s6 0 6-4s6-4 6 0s6 0 6-4s6-4 6 0" stroke="#3498DB"/>
      <text x="8" y="54" font-size="3" fill="currentColor" stroke="none">Nucleosomes</text>
    </svg>`
  },
  {
    id: 'cell-flagellum',
    name: 'Flagellum',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['flagellum', 'cilia', 'motility', '9+2', 'axoneme'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="32" rx="12" ry="20" fill="#FFE4E1" opacity="0.3"/>
      <ellipse cx="20" cy="32" rx="12" ry="20"/>
      <circle cx="20" cy="32" r="4" fill="#9B59B6" opacity="0.5"/>
      <path d="M32 32c8 8 8-8 16 0s8-8 12 0" stroke="#27AE60" stroke-width="3"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Basal body</text>
      <text x="36" y="58" font-size="3" fill="currentColor" stroke="none">Flagellum</text>
    </svg>`
  },
  {
    id: 'cell-nuclear-pore',
    name: 'Nuclear Pore Complex',
    domain: 'biology',
    category: 'cell-structure',
    tags: ['nuclear pore', 'NPC', 'nucleoporin', 'transport', 'import'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="56" height="16" fill="#9B59B6" opacity="0.2"/>
      <circle cx="32" cy="32" r="10" fill="#87CEEB" opacity="0.3"/>
      <circle cx="32" cy="32" r="10"/>
      <circle cx="32" cy="32" r="6" stroke-dasharray="2 2"/>
      <circle cx="24" cy="24" r="2" fill="#27AE60"/>
      <circle cx="40" cy="24" r="2" fill="#27AE60"/>
      <circle cx="24" cy="40" r="2" fill="#27AE60"/>
      <circle cx="40" cy="40" r="2" fill="#27AE60"/>
      <circle cx="32" cy="20" r="2" fill="#27AE60"/>
      <circle cx="32" cy="44" r="2" fill="#27AE60"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Nuclear Pore Complex</text>
    </svg>`
  },
  {
    id: 'cell-plasmodesmata',
    name: 'Plasmodesmata',
    domain: 'biology',
    category: 'junctions',
    tags: ['plasmodesmata', 'plant', 'cell wall', 'communication', 'symplast'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="20" height="56" fill="#90EE90" opacity="0.2"/>
      <rect x="40" y="4" width="20" height="56" fill="#90EE90" opacity="0.2"/>
      <rect x="24" y="4" width="16" height="56" fill="#8B4513" opacity="0.3"/>
      <circle cx="32" cy="16" r="4"/>
      <line x1="28" y1="16" x2="24" y2="16"/>
      <line x1="36" y1="16" x2="40" y2="16"/>
      <circle cx="32" cy="32" r="4"/>
      <line x1="28" y1="32" x2="24" y2="32"/>
      <line x1="36" y1="32" x2="40" y2="32"/>
      <circle cx="32" cy="48" r="4"/>
      <line x1="28" y1="48" x2="24" y2="48"/>
      <line x1="36" y1="48" x2="40" y2="48"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Plasmodesmata</text>
    </svg>`
  },

  // ===========================================================================
  // PROTEIN DEGRADATION
  // ===========================================================================
  {
    id: 'cell-ubiquitin',
    name: 'Ubiquitin Tag',
    domain: 'biology',
    category: 'protein-degradation',
    tags: ['ubiquitin', 'protein degradation', 'E1', 'E2', 'E3', 'polyubiquitin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="24" height="24" rx="4" fill="#3498DB" opacity="0.3"/>
      <rect x="8" y="20" width="24" height="24" rx="4"/>
      <text x="14" y="36" font-size="6" fill="currentColor" stroke="none">P</text>
      <circle cx="40" cy="24" r="6" fill="#F39C12" opacity="0.5"/>
      <circle cx="48" cy="20" r="6" fill="#F39C12" opacity="0.5"/>
      <circle cx="52" cy="28" r="6" fill="#F39C12" opacity="0.5"/>
      <circle cx="48" cy="36" r="6" fill="#F39C12" opacity="0.5"/>
      <path d="M32 32l8-8"/>
      <text x="36" y="56" font-size="4" fill="currentColor" stroke="none">Ub chain</text>
    </svg>`
  },
  {
    id: 'cell-proteasome',
    name: 'Proteasome',
    domain: 'biology',
    category: 'protein-degradation',
    tags: ['proteasome', '26S', 'protein degradation', 'ubiquitin', 'barrel'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="12" ry="6" fill="#9B59B6" opacity="0.3"/>
      <ellipse cx="32" cy="12" rx="12" ry="6"/>
      <rect x="20" y="12" width="24" height="32" fill="#E74C3C" opacity="0.2"/>
      <ellipse cx="32" cy="44" rx="12" ry="6" fill="#9B59B6" opacity="0.3"/>
      <ellipse cx="32" cy="44" rx="12" ry="6"/>
      <path d="M20 12v32"/>
      <path d="M44 12v32"/>
      <path d="M24 20h16"/>
      <path d="M24 28h16"/>
      <path d="M24 36h16"/>
      <circle cx="32" cy="6" r="3" fill="#F39C12"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">26S Proteasome</text>
    </svg>`
  },

  // ===========================================================================
  // DNA REPAIR
  // ===========================================================================
  {
    id: 'cell-dna-repair',
    name: 'DNA Repair',
    domain: 'biology',
    category: 'dna-processes',
    tags: ['DNA repair', 'double strand break', 'NHEJ', 'homologous recombination'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8c8 8 8-8 16 0s8 8 16 0" stroke="#3498DB" stroke-width="2"/>
      <path d="M8 16c8 8 8-8 16 0s8 8 16 0" stroke="#E74C3C" stroke-width="2"/>
      <path d="M40 8v16" stroke="#F39C12" stroke-width="2" stroke-dasharray="2 2"/>
      <path d="M8 36c8 8 8-8 16 0s8 8 16 0s8-8 16 0" stroke="#3498DB" stroke-width="2"/>
      <path d="M8 44c8 8 8-8 16 0s8 8 16 0s8-8 16 0" stroke="#E74C3C" stroke-width="2"/>
      <path d="M32 28v8"/>
      <path d="M28 32l4 4 4-4"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">DSB Repair</text>
    </svg>`
  },
  {
    id: 'cell-base-excision',
    name: 'Base Excision Repair',
    domain: 'biology',
    category: 'dna-processes',
    tags: ['BER', 'DNA glycosylase', 'AP endonuclease', 'DNA repair'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h48" stroke="#3498DB" stroke-width="3"/>
      <path d="M8 40h48" stroke="#E74C3C" stroke-width="3"/>
      <rect x="24" y="20" width="8" height="8" fill="#F39C12"/>
      <text x="26" y="30" font-size="4" fill="currentColor" stroke="none">X</text>
      <path d="M28 36v-4"/>
      <circle cx="28" cy="44" r="4" fill="#27AE60" opacity="0.5"/>
      <path d="M36 40l8-8"/>
      <path d="M44 32l4 4-4 4"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Base Excision</text>
    </svg>`
  },

  // ===========================================================================
  // ER STRESS & QUALITY CONTROL
  // ===========================================================================
  {
    id: 'cell-upr',
    name: 'Unfolded Protein Response',
    domain: 'biology',
    category: 'cell-stress',
    tags: ['UPR', 'ER stress', 'PERK', 'IRE1', 'ATF6', 'misfolded protein'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16" fill="#3498DB" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="24" ry="16"/>
      <path d="M20 28c4 4 8-4 12 0s8 4 12 0" stroke="#E74C3C" stroke-width="2"/>
      <path d="M20 36c4-4 8 4 12 0s8-4 12 0" stroke="#E74C3C" stroke-width="2"/>
      <circle cx="20" cy="20" r="3" fill="#F39C12"/>
      <circle cx="44" cy="20" r="3" fill="#F39C12"/>
      <circle cx="32" cy="12" r="3" fill="#F39C12"/>
      <text x="14" y="56" font-size="3" fill="currentColor" stroke="none">ER Stress - UPR</text>
    </svg>`
  },
  {
    id: 'cell-erad',
    name: 'ER-Associated Degradation',
    domain: 'biology',
    category: 'protein-degradation',
    tags: ['ERAD', 'ER', 'retrotranslocation', 'quality control', 'misfolded'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="24" rx="16" ry="12" fill="#3498DB" opacity="0.2"/>
      <ellipse cx="24" cy="24" rx="16" ry="12"/>
      <path d="M24 24c4 4 8-4 8 0" stroke="#E74C3C"/>
      <path d="M32 24h8"/>
      <path d="M40 20l4 4-4 4"/>
      <rect x="44" y="36" width="12" height="20" fill="#E74C3C" opacity="0.2"/>
      <path d="M48 28v8"/>
      <circle cx="50" cy="46" r="4" fill="#F39C12" opacity="0.5"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">ERAD Pathway</text>
    </svg>`
  },

  // ===========================================================================
  // TELOMERE & REPLICATION
  // ===========================================================================
  {
    id: 'cell-telomere',
    name: 'Telomere',
    domain: 'biology',
    category: 'dna-processes',
    tags: ['telomere', 'chromosome end', 'TTAGGG', 'shelterin', 'aging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="36" height="16" fill="#3498DB" opacity="0.2"/>
      <rect x="8" y="24" width="36" height="16" rx="2"/>
      <path d="M44 32c8 0 8-8 12-8" stroke="#E74C3C" stroke-width="2"/>
      <path d="M44 32c8 0 8 8 12 8" stroke="#E74C3C" stroke-width="2"/>
      <circle cx="56" cy="24" r="3" fill="#F39C12"/>
      <circle cx="56" cy="40" r="3" fill="#F39C12"/>
      <text x="16" y="36" font-size="4" fill="currentColor" stroke="none">Chr</text>
      <text x="12" y="56" font-size="3" fill="currentColor" stroke="none">Telomere Cap</text>
    </svg>`
  },
  {
    id: 'cell-telomerase',
    name: 'Telomerase',
    domain: 'biology',
    category: 'dna-processes',
    tags: ['telomerase', 'TERT', 'TERC', 'telomere extension', 'immortality'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h32" stroke="#3498DB" stroke-width="2"/>
      <path d="M8 32h32" stroke="#E74C3C" stroke-width="2"/>
      <ellipse cx="48" cy="28" rx="10" ry="12" fill="#27AE60" opacity="0.3"/>
      <ellipse cx="48" cy="28" rx="10" ry="12"/>
      <path d="M40 28h16" stroke="#F39C12" stroke-width="2"/>
      <path d="M48 40v8"/>
      <path d="M44 48l4 4 4-4"/>
      <text x="44" y="58" font-size="3" fill="currentColor" stroke="none">TERT</text>
      <text x="8" y="48" font-size="3" fill="currentColor" stroke="none">Telomerase</text>
    </svg>`
  },

  // ===========================================================================
  // CELL ADHESION & ECM
  // ===========================================================================
  {
    id: 'cell-integrin',
    name: 'Integrin Receptor',
    domain: 'biology',
    category: 'membrane',
    tags: ['integrin', 'cell adhesion', 'ECM', 'focal adhesion', 'alpha beta'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="56" height="12" fill="#3498DB" opacity="0.2"/>
      <path d="M24 20v-12c-4 0-8 4-8 8" fill="#27AE60" opacity="0.3"/>
      <path d="M40 20v-12c4 0 8 4 8 8" fill="#9B59B6" opacity="0.3"/>
      <rect x="4" y="48" width="56" height="8" fill="#F39C12" opacity="0.2"/>
      <path d="M32 32v16"/>
      <circle cx="32" cy="56" r="3" fill="#E74C3C"/>
      <text x="16" y="14" font-size="3" fill="currentColor" stroke="none">alpha</text>
      <text x="40" y="14" font-size="3" fill="currentColor" stroke="none">beta</text>
      <text x="20" y="62" font-size="3" fill="currentColor" stroke="none">ECM</text>
    </svg>`
  },
  {
    id: 'cell-focal-adhesion',
    name: 'Focal Adhesion',
    domain: 'biology',
    category: 'junctions',
    tags: ['focal adhesion', 'FAK', 'talin', 'vinculin', 'stress fiber'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="16" width="56" height="8" fill="#3498DB" opacity="0.2"/>
      <rect x="24" y="24" width="16" height="16" fill="#9B59B6" opacity="0.3"/>
      <rect x="24" y="24" width="16" height="16"/>
      <path d="M32 8v8"/>
      <path d="M24 40l-12 16" stroke="#E74C3C" stroke-width="2"/>
      <path d="M40 40l12 16" stroke="#E74C3C" stroke-width="2"/>
      <path d="M32 40v16" stroke="#E74C3C" stroke-width="2"/>
      <rect x="4" y="56" width="56" height="4" fill="#F39C12" opacity="0.3"/>
      <text x="26" y="34" font-size="3" fill="currentColor" stroke="none">FAK</text>
    </svg>`
  },
  {
    id: 'cell-ecm-collagen',
    name: 'Collagen Fiber',
    domain: 'biology',
    category: 'ecm',
    tags: ['collagen', 'ECM', 'triple helix', 'fibril', 'structural'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16c8 8 8-8 16 0s8 8 16 0s8-8 16 0" stroke="#E74C3C" stroke-width="2"/>
      <path d="M8 24c8 8 8-8 16 0s8 8 16 0s8-8 16 0" stroke="#F39C12" stroke-width="2"/>
      <path d="M8 32c8 8 8-8 16 0s8 8 16 0s8-8 16 0" stroke="#27AE60" stroke-width="2"/>
      <rect x="8" y="44" width="48" height="8" fill="#3498DB" opacity="0.2"/>
      <path d="M8 48h48" stroke-dasharray="4 4"/>
      <text x="16" y="60" font-size="3" fill="currentColor" stroke="none">Collagen Triple Helix</text>
    </svg>`
  },

  // ===========================================================================
  // RNA PROCESSING
  // ===========================================================================
  {
    id: 'cell-spliceosome',
    name: 'Spliceosome',
    domain: 'biology',
    category: 'rna-processing',
    tags: ['spliceosome', 'splicing', 'snRNP', 'intron', 'exon'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="28" width="16" height="8" fill="#3498DB"/>
      <rect x="44" y="28" width="16" height="8" fill="#3498DB"/>
      <path d="M20 32c8-16 16-16 24 0" stroke="#E74C3C" stroke-width="2" stroke-dasharray="2 2"/>
      <circle cx="32" cy="20" r="10" fill="#F39C12" opacity="0.3"/>
      <circle cx="32" cy="20" r="10"/>
      <text x="26" y="24" font-size="4" fill="currentColor" stroke="none">U2</text>
      <path d="M32 40v8"/>
      <path d="M28 48l4 4 4-4"/>
      <rect x="16" y="52" width="32" height="6" fill="#27AE60" opacity="0.5"/>
      <text x="8" y="32" font-size="3" fill="currentColor" stroke="none">E1</text>
      <text x="48" y="32" font-size="3" fill="currentColor" stroke="none">E2</text>
    </svg>`
  },
  {
    id: 'cell-mrna-export',
    name: 'mRNA Export',
    domain: 'biology',
    category: 'rna-processing',
    tags: ['mRNA export', 'nuclear pore', 'TREX', 'NXF1', 'nuclear transport'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="16" fill="#9B59B6" opacity="0.2"/>
      <circle cx="24" cy="32" r="16"/>
      <path d="M20 28c4 4 4-4 8 0" stroke="#27AE60" stroke-width="2"/>
      <circle cx="16" cy="32" r="3" fill="#F39C12"/>
      <rect x="36" y="28" width="4" height="8" fill="#3498DB"/>
      <path d="M40 32h16" stroke="#27AE60" stroke-width="2"/>
      <path d="M56 28l4 4-4 4"/>
      <circle cx="56" cy="32" r="3" fill="#F39C12"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">mRNA Export</text>
    </svg>`
  },
  {
    id: 'cell-ribosome-biogenesis',
    name: 'Ribosome Biogenesis',
    domain: 'biology',
    category: 'rna-processing',
    tags: ['ribosome biogenesis', 'nucleolus', 'rRNA', 'assembly', '40S', '60S'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="20" r="12" fill="#9B59B6" opacity="0.3"/>
      <circle cx="20" cy="20" r="12"/>
      <circle cx="20" cy="20" r="6" fill="#9B59B6"/>
      <path d="M32 20h8"/>
      <path d="M40 16l4 4-4 4"/>
      <ellipse cx="52" cy="16" rx="6" ry="4" fill="#3498DB" opacity="0.5"/>
      <ellipse cx="52" cy="24" rx="8" ry="5" fill="#E74C3C" opacity="0.5"/>
      <path d="M32 32l8 16"/>
      <ellipse cx="44" cy="52" rx="6" ry="4" fill="#3498DB" opacity="0.5"/>
      <ellipse cx="44" cy="56" rx="8" ry="5" fill="#E74C3C" opacity="0.5"/>
      <text x="46" y="12" font-size="3" fill="currentColor" stroke="none">40S</text>
      <text x="46" y="28" font-size="3" fill="currentColor" stroke="none">60S</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL SIGNALING
  // ===========================================================================
  {
    id: 'cell-wnt-pathway',
    name: 'Wnt Signaling',
    domain: 'biology',
    category: 'signaling',
    tags: ['Wnt', 'beta-catenin', 'Frizzled', 'LRP', 'development'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="56" height="8" fill="#3498DB" opacity="0.2"/>
      <circle cx="20" cy="12" r="5" fill="#E74C3C"/>
      <text x="16" y="16" font-size="4" fill="currentColor" stroke="none">W</text>
      <path d="M20 17v3"/>
      <ellipse cx="20" cy="24" rx="6" ry="4" fill="#27AE60" opacity="0.4"/>
      <path d="M20 28v8"/>
      <circle cx="20" cy="40" r="4" fill="#F39C12"/>
      <path d="M20 44v4"/>
      <rect x="12" y="52" width="16" height="6" fill="#9B59B6" opacity="0.3"/>
      <text x="14" y="58" font-size="3" fill="currentColor" stroke="none">Gene</text>
      <text x="36" y="40" font-size="3" fill="currentColor" stroke="none">beta-cat</text>
    </svg>`
  },
  {
    id: 'cell-notch-pathway',
    name: 'Notch Signaling',
    domain: 'biology',
    category: 'signaling',
    tags: ['Notch', 'Delta', 'NICD', 'lateral inhibition', 'development'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="24" height="32" fill="#FFE4E1" opacity="0.3"/>
      <rect x="36" y="4" width="24" height="32" fill="#87CEEB" opacity="0.3"/>
      <path d="M28 16v8c4 0 8 0 8-4v-4" fill="#E74C3C" opacity="0.3"/>
      <path d="M28 20h8"/>
      <circle cx="32" cy="20" r="3" fill="#F39C12"/>
      <path d="M32 36v8"/>
      <path d="M28 44l4 4 4-4"/>
      <rect x="24" y="52" width="16" height="6" fill="#9B59B6" opacity="0.3"/>
      <text x="12" y="24" font-size="3" fill="currentColor" stroke="none">Delta</text>
      <text x="40" y="24" font-size="3" fill="currentColor" stroke="none">Notch</text>
    </svg>`
  },
  {
    id: 'cell-tgfb-pathway',
    name: 'TGF-beta Signaling',
    domain: 'biology',
    category: 'signaling',
    tags: ['TGF-beta', 'SMAD', 'receptor', 'growth factor', 'differentiation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="56" height="8" fill="#3498DB" opacity="0.2"/>
      <circle cx="32" cy="12" r="5" fill="#27AE60"/>
      <text x="26" y="16" font-size="3" fill="currentColor" stroke="none">TGFb</text>
      <rect x="24" y="20" width="16" height="12" fill="#E74C3C" opacity="0.3"/>
      <path d="M32 32v8"/>
      <circle cx="28" cy="44" r="4" fill="#F39C12" opacity="0.5"/>
      <circle cx="36" cy="44" r="4" fill="#9B59B6" opacity="0.5"/>
      <path d="M32 48v4"/>
      <rect x="24" y="54" width="16" height="6" fill="#3498DB" opacity="0.3"/>
      <text x="24" y="44" font-size="3" fill="currentColor" stroke="none">R</text>
      <text x="32" y="44" font-size="3" fill="currentColor" stroke="none">S</text>
    </svg>`
  },

  // ===========================================================================
  // CELL DIFFERENTIATION
  // ===========================================================================
  {
    id: 'cell-ips-cell',
    name: 'Induced Pluripotent Stem Cell',
    domain: 'biology',
    category: 'cell-types',
    tags: ['iPSC', 'induced pluripotent', 'Yamanaka factors', 'reprogramming'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="20" height="20" fill="#E74C3C" opacity="0.3"/>
      <rect x="8" y="8" width="20" height="20"/>
      <text x="12" y="22" font-size="4" fill="currentColor" stroke="none">Fib</text>
      <path d="M28 18h8"/>
      <path d="M36 14l4 4-4 4"/>
      <circle cx="48" cy="18" r="10" fill="#27AE60" opacity="0.3"/>
      <circle cx="48" cy="18" r="10"/>
      <circle cx="48" cy="18" r="4" fill="#27AE60"/>
      <text x="4" y="48" font-size="3" fill="currentColor" stroke="none">Oct4 Sox2</text>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Klf4 cMyc</text>
      <text x="40" y="40" font-size="3" fill="currentColor" stroke="none">iPSC</text>
    </svg>`
  },
  {
    id: 'cell-lineage-commitment',
    name: 'Lineage Commitment',
    domain: 'biology',
    category: 'cell-types',
    tags: ['lineage', 'commitment', 'differentiation', 'transcription factors'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8" fill="#27AE60" opacity="0.3"/>
      <circle cx="32" cy="12" r="8"/>
      <path d="M24 20l-8 16"/>
      <path d="M32 20v16"/>
      <path d="M40 20l8 16"/>
      <circle cx="16" cy="44" r="6" fill="#E74C3C" opacity="0.3"/>
      <circle cx="32" cy="44" r="6" fill="#3498DB" opacity="0.3"/>
      <circle cx="48" cy="44" r="6" fill="#9B59B6" opacity="0.3"/>
      <text x="28" y="16" font-size="3" fill="currentColor" stroke="none">SC</text>
      <text x="12" y="46" font-size="3" fill="currentColor" stroke="none">M</text>
      <text x="28" y="46" font-size="3" fill="currentColor" stroke="none">N</text>
      <text x="44" y="46" font-size="3" fill="currentColor" stroke="none">E</text>
    </svg>`
  },
];

export default cellbiologyIcons;
