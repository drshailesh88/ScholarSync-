/**
 * Polymer Chemistry Icon Library
 * Comprehensive SVG icons for polymer chemistry
 *
 * Categories:
 * - Monomers and Building Blocks
 * - Polymerization Mechanisms (addition, condensation, living)
 * - Polymer Structures (linear, branched, cross-linked)
 * - Properties and Characterization
 */

import type { IconDefinition } from './index';

export const polymerIcons: IconDefinition[] = [
  // ===========================================================================
  // MONOMERS AND BUILDING BLOCKS
  // ===========================================================================
  {
    id: 'polymer-ethylene',
    name: 'Ethylene Monomer',
    domain: 'chemistry',
    category: 'monomers',
    tags: ['ethylene', 'monomer', 'vinyl', 'alkene', 'polyethylene'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="6" fill="currentColor"/>
      <circle cx="40" cy="32" r="6" fill="currentColor"/>
      <line x1="30" y1="30" x2="34" y2="30" stroke="white" stroke-width="2"/>
      <line x1="30" y1="34" x2="34" y2="34" stroke="white" stroke-width="2"/>
      <line x1="18" y1="28" x2="12" y2="24"/>
      <line x1="18" y1="36" x2="12" y2="40"/>
      <line x1="46" y1="28" x2="52" y2="24"/>
      <line x1="46" y1="36" x2="52" y2="40"/>
      <text x="8" y="22" font-size="5" fill="currentColor" stroke="none">H</text>
      <text x="8" y="46" font-size="5" fill="currentColor" stroke="none">H</text>
      <text x="50" y="22" font-size="5" fill="currentColor" stroke="none">H</text>
      <text x="50" y="46" font-size="5" fill="currentColor" stroke="none">H</text>
      <text x="18" y="58" font-size="5" fill="currentColor" stroke="none">Ethylene</text>
    </svg>`
  },
  {
    id: 'polymer-styrene',
    name: 'Styrene Monomer',
    domain: 'chemistry',
    category: 'monomers',
    tags: ['styrene', 'vinyl benzene', 'polystyrene', 'aromatic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="5" fill="currentColor"/>
      <circle cx="32" cy="32" r="5" fill="currentColor"/>
      <line x1="25" y1="30" x2="27" y2="30" stroke="white"/>
      <line x1="25" y1="34" x2="27" y2="34" stroke="white"/>
      <polygon points="48,24 56,28 56,36 48,40 40,36 40,28" fill="none"/>
      <circle cx="48" cy="32" r="6" stroke-dasharray="2 1"/>
      <line x1="37" y1="32" x2="40" y2="32"/>
      <text x="18" y="56" font-size="5" fill="currentColor" stroke="none">Styrene</text>
    </svg>`
  },
  {
    id: 'polymer-vinyl-chloride',
    name: 'Vinyl Chloride',
    domain: 'chemistry',
    category: 'monomers',
    tags: ['vinyl chloride', 'PVC', 'chlorinated', 'monomer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="6" fill="currentColor"/>
      <circle cx="40" cy="32" r="6" fill="currentColor"/>
      <line x1="30" y1="30" x2="34" y2="30" stroke="white" stroke-width="2"/>
      <line x1="30" y1="34" x2="34" y2="34" stroke="white" stroke-width="2"/>
      <line x1="18" y1="28" x2="12" y2="24"/>
      <line x1="18" y1="36" x2="12" y2="40"/>
      <line x1="46" y1="28" x2="52" y2="24"/>
      <circle cx="52" cy="36" r="4" fill="green"/>
      <text x="8" y="22" font-size="5" fill="currentColor" stroke="none">H</text>
      <text x="8" y="46" font-size="5" fill="currentColor" stroke="none">H</text>
      <text x="50" y="22" font-size="5" fill="currentColor" stroke="none">H</text>
      <text x="50" y="40" font-size="5" fill="green" stroke="none">Cl</text>
      <text x="12" y="58" font-size="5" fill="currentColor" stroke="none">Vinyl Chloride</text>
    </svg>`
  },
  {
    id: 'polymer-acrylate',
    name: 'Acrylate Monomer',
    domain: 'chemistry',
    category: 'monomers',
    tags: ['acrylate', 'acrylic', 'ester', 'methyl methacrylate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="32" r="5" fill="currentColor"/>
      <circle cx="28" cy="32" r="5" fill="currentColor"/>
      <line x1="21" y1="30" x2="23" y2="30" stroke="white"/>
      <line x1="21" y1="34" x2="23" y2="34" stroke="white"/>
      <circle cx="40" cy="32" r="4" fill="currentColor"/>
      <line x1="40" y1="24" x2="40" y2="20" stroke="red"/>
      <line x1="44" y1="24" x2="44" y2="20" stroke="red"/>
      <text x="38" y="18" font-size="5" fill="red" stroke="none">O</text>
      <line x1="44" y1="32" x2="52" y2="32" stroke="red"/>
      <text x="52" y="35" font-size="5" fill="red" stroke="none">O</text>
      <line x1="56" y1="32" x2="60" y2="32"/>
      <text x="58" y="28" font-size="4" fill="currentColor" stroke="none">R</text>
      <text x="16" y="56" font-size="5" fill="currentColor" stroke="none">Acrylate</text>
    </svg>`
  },
  {
    id: 'polymer-diol',
    name: 'Diol Monomer',
    domain: 'chemistry',
    category: 'monomers',
    tags: ['diol', 'glycol', 'ethylene glycol', 'condensation', 'polyester'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="32" r="5" fill="red"/>
      <text x="8" y="35" font-size="5" fill="white" stroke="none">O</text>
      <line x1="8" y1="28" x2="4" y2="24"/>
      <text x="2" y="22" font-size="4" fill="currentColor" stroke="none">H</text>
      <line x1="17" y1="32" x2="24" y2="32"/>
      <circle cx="28" cy="32" r="4" fill="currentColor"/>
      <line x1="32" y1="32" x2="36" y2="32"/>
      <circle cx="40" cy="32" r="4" fill="currentColor"/>
      <line x1="44" y1="32" x2="48" y2="32"/>
      <circle cx="52" cy="32" r="5" fill="red"/>
      <text x="48" y="35" font-size="5" fill="white" stroke="none">O</text>
      <line x1="56" y1="28" x2="60" y2="24"/>
      <text x="58" y="22" font-size="4" fill="currentColor" stroke="none">H</text>
      <text x="8" y="50" font-size="5" fill="currentColor" stroke="none">HO-CH2-CH2-OH</text>
    </svg>`
  },

  // ===========================================================================
  // POLYMERIZATION MECHANISMS
  // ===========================================================================
  {
    id: 'polymer-addition',
    name: 'Addition Polymerization',
    domain: 'chemistry',
    category: 'polymerization',
    tags: ['addition', 'chain growth', 'radical', 'vinyl'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <text x="4" y="16" font-size="5" fill="currentColor" stroke="none">n</text>
      <rect x="10" y="8" width="16" height="16" rx="2" fill="blue" opacity="0.2"/>
      <line x1="14" y1="14" x2="14" y2="18" stroke="blue"/>
      <line x1="18" y1="14" x2="18" y2="18" stroke="blue"/>
      <path d="M30 16 L40 16" marker-end="url(#arrow)"/>
      <rect x="44" y="8" width="8" height="16" rx="1" fill="green" opacity="0.3"/>
      <rect x="52" y="8" width="8" height="16" rx="1" fill="green" opacity="0.3"/>
      <text x="50" y="8" font-size="4" fill="currentColor" stroke="none">n</text>
      <text x="8" y="36" font-size="5" fill="blue" stroke="none">Monomer</text>
      <text x="44" y="36" font-size="5" fill="green" stroke="none">Polymer</text>
      <text x="8" y="48" font-size="4" fill="currentColor" stroke="none">Chain-growth</text>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">mechanism</text>
    </svg>`
  },
  {
    id: 'polymer-condensation',
    name: 'Condensation Polymerization',
    domain: 'chemistry',
    category: 'polymerization',
    tags: ['condensation', 'step growth', 'polyester', 'polyamide'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="12" width="12" height="12" rx="1" fill="blue" opacity="0.3"/>
      <text x="6" y="20" font-size="5" fill="currentColor" stroke="none">A</text>
      <text x="16" y="14" font-size="5" fill="currentColor" stroke="none">+</text>
      <rect x="22" y="12" width="12" height="12" rx="1" fill="red" opacity="0.3"/>
      <text x="24" y="20" font-size="5" fill="currentColor" stroke="none">B</text>
      <path d="M38 18 L48 18" marker-end="url(#arrow)"/>
      <rect x="52" y="12" width="8" height="12" rx="1" fill="purple" opacity="0.3"/>
      <text x="26" y="36" font-size="4" fill="currentColor" stroke="none">+ H2O</text>
      <circle cx="36" cy="36" r="4" fill="blue" opacity="0.3"/>
      <text x="8" y="50" font-size="4" fill="currentColor" stroke="none">Step-growth with</text>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">small molecule loss</text>
    </svg>`
  },
  {
    id: 'polymer-radical',
    name: 'Radical Polymerization',
    domain: 'chemistry',
    category: 'polymerization',
    tags: ['radical', 'free radical', 'initiation', 'propagation', 'termination'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <text x="4" y="14" font-size="5" fill="currentColor" stroke="none">Init:</text>
      <rect x="24" y="6" width="12" height="10" rx="1" fill="orange" opacity="0.3"/>
      <text x="27" y="14" font-size="5" fill="currentColor" stroke="none">I</text>
      <path d="M40 11 L48 11"/>
      <text x="50" y="14" font-size="5" fill="red" stroke="none">R.</text>
      <text x="4" y="30" font-size="5" fill="currentColor" stroke="none">Prop:</text>
      <text x="24" y="30" font-size="5" fill="red" stroke="none">R.</text>
      <text x="32" y="30" font-size="5" fill="currentColor" stroke="none">+ M</text>
      <path d="M48 26 L54 26"/>
      <text x="56" y="30" font-size="5" fill="red" stroke="none">RM.</text>
      <text x="4" y="46" font-size="5" fill="currentColor" stroke="none">Term:</text>
      <text x="24" y="46" font-size="5" fill="red" stroke="none">R.</text>
      <text x="32" y="46" font-size="5" fill="currentColor" stroke="none">+</text>
      <text x="38" y="46" font-size="5" fill="red" stroke="none">R.</text>
      <path d="M48 42 L54 42"/>
      <text x="56" y="46" font-size="5" fill="currentColor" stroke="none">R-R</text>
    </svg>`
  },
  {
    id: 'polymer-living',
    name: 'Living Polymerization',
    domain: 'chemistry',
    category: 'polymerization',
    tags: ['living', 'anionic', 'ATRP', 'RAFT', 'controlled'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="16" width="12" height="20" rx="2" fill="blue" opacity="0.3"/>
      <circle cx="16" cy="26" r="4" fill="red"/>
      <text x="14" y="28" font-size="4" fill="white" stroke="none">*</text>
      <path d="M24 26 L32 26" marker-end="url(#arrow)"/>
      <text x="26" y="22" font-size="4" fill="currentColor" stroke="none">+M</text>
      <rect x="36" y="12" width="20" height="28" rx="2" fill="blue" opacity="0.3"/>
      <circle cx="56" cy="26" r="4" fill="red"/>
      <text x="54" y="28" font-size="4" fill="white" stroke="none">*</text>
      <text x="4" y="48" font-size="4" fill="currentColor" stroke="none">No termination</text>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Narrow PDI</text>
    </svg>`
  },
  {
    id: 'polymer-copolymer',
    name: 'Copolymerization',
    domain: 'chemistry',
    category: 'polymerization',
    tags: ['copolymer', 'random', 'block', 'alternating', 'graft'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <text x="4" y="12" font-size="4" fill="currentColor" stroke="none">Random:</text>
      <rect x="28" y="6" width="6" height="8" fill="blue"/>
      <rect x="34" y="6" width="6" height="8" fill="red"/>
      <rect x="40" y="6" width="6" height="8" fill="blue"/>
      <rect x="46" y="6" width="6" height="8" fill="blue"/>
      <rect x="52" y="6" width="6" height="8" fill="red"/>
      <text x="4" y="26" font-size="4" fill="currentColor" stroke="none">Block:</text>
      <rect x="28" y="20" width="6" height="8" fill="blue"/>
      <rect x="34" y="20" width="6" height="8" fill="blue"/>
      <rect x="40" y="20" width="6" height="8" fill="blue"/>
      <rect x="46" y="20" width="6" height="8" fill="red"/>
      <rect x="52" y="20" width="6" height="8" fill="red"/>
      <text x="4" y="40" font-size="4" fill="currentColor" stroke="none">Alternating:</text>
      <rect x="28" y="34" width="6" height="8" fill="blue"/>
      <rect x="34" y="34" width="6" height="8" fill="red"/>
      <rect x="40" y="34" width="6" height="8" fill="blue"/>
      <rect x="46" y="34" width="6" height="8" fill="red"/>
      <rect x="52" y="34" width="6" height="8" fill="blue"/>
      <text x="4" y="54" font-size="4" fill="currentColor" stroke="none">Graft:</text>
      <rect x="28" y="48" width="30" height="6" fill="blue"/>
      <rect x="36" y="42" width="4" height="6" fill="red"/>
      <rect x="48" y="42" width="4" height="6" fill="red"/>
    </svg>`
  },

  // ===========================================================================
  // POLYMER STRUCTURES
  // ===========================================================================
  {
    id: 'polymer-linear',
    name: 'Linear Polymer',
    domain: 'chemistry',
    category: 'structures',
    tags: ['linear', 'thermoplastic', 'chain', 'unbranched'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32 L60 32" stroke="blue" stroke-width="3"/>
      <circle cx="8" cy="32" r="3" fill="blue"/>
      <circle cx="20" cy="32" r="3" fill="blue"/>
      <circle cx="32" cy="32" r="3" fill="blue"/>
      <circle cx="44" cy="32" r="3" fill="blue"/>
      <circle cx="56" cy="32" r="3" fill="blue"/>
      <text x="18" y="50" font-size="6" fill="currentColor" stroke="none">Linear Chain</text>
    </svg>`
  },
  {
    id: 'polymer-branched',
    name: 'Branched Polymer',
    domain: 'chemistry',
    category: 'structures',
    tags: ['branched', 'LDPE', 'side chains', 'irregular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32 L60 32" stroke="blue" stroke-width="3"/>
      <path d="M20 32 L20 16" stroke="blue" stroke-width="2"/>
      <path d="M36 32 L44 20" stroke="blue" stroke-width="2"/>
      <path d="M36 32 L28 44" stroke="blue" stroke-width="2"/>
      <path d="M52 32 L52 48" stroke="blue" stroke-width="2"/>
      <circle cx="20" cy="16" r="2" fill="blue"/>
      <circle cx="44" cy="20" r="2" fill="blue"/>
      <circle cx="28" cy="44" r="2" fill="blue"/>
      <circle cx="52" cy="48" r="2" fill="blue"/>
      <text x="14" y="58" font-size="6" fill="currentColor" stroke="none">Branched Chain</text>
    </svg>`
  },
  {
    id: 'polymer-crosslinked',
    name: 'Cross-linked Polymer',
    domain: 'chemistry',
    category: 'structures',
    tags: ['crosslinked', 'thermoset', 'network', 'vulcanized'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 16 L60 16" stroke="blue" stroke-width="2"/>
      <path d="M4 32 L60 32" stroke="blue" stroke-width="2"/>
      <path d="M4 48 L60 48" stroke="blue" stroke-width="2"/>
      <path d="M16 16 L16 32" stroke="red" stroke-width="2"/>
      <path d="M32 32 L32 48" stroke="red" stroke-width="2"/>
      <path d="M48 16 L48 32" stroke="red" stroke-width="2"/>
      <path d="M24 32 L24 48" stroke="red" stroke-width="2"/>
      <path d="M40 16 L40 32" stroke="red" stroke-width="2"/>
      <circle cx="16" cy="16" r="2" fill="blue"/>
      <circle cx="16" cy="32" r="2" fill="blue"/>
      <circle cx="32" cy="32" r="2" fill="blue"/>
      <circle cx="32" cy="48" r="2" fill="blue"/>
      <text x="12" y="60" font-size="5" fill="currentColor" stroke="none">Cross-linked</text>
    </svg>`
  },
  {
    id: 'polymer-dendrimer',
    name: 'Dendrimer',
    domain: 'chemistry',
    category: 'structures',
    tags: ['dendrimer', 'hyperbranched', 'generation', 'monodisperse'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="6" fill="red"/>
      <line x1="32" y1="26" x2="32" y2="12"/>
      <line x1="26" y1="32" x2="12" y2="32"/>
      <line x1="38" y1="32" x2="52" y2="32"/>
      <line x1="32" y1="38" x2="32" y2="52"/>
      <circle cx="32" cy="12" r="3" fill="blue"/>
      <circle cx="12" cy="32" r="3" fill="blue"/>
      <circle cx="52" cy="32" r="3" fill="blue"/>
      <circle cx="32" cy="52" r="3" fill="blue"/>
      <line x1="32" y1="9" x2="26" y2="4"/>
      <line x1="32" y1="9" x2="38" y2="4"/>
      <line x1="9" y1="32" x2="4" y2="26"/>
      <line x1="9" y1="32" x2="4" y2="38"/>
      <circle cx="26" cy="4" r="2" fill="green"/>
      <circle cx="38" cy="4" r="2" fill="green"/>
      <text x="18" y="62" font-size="5" fill="currentColor" stroke="none">Dendrimer</text>
    </svg>`
  },
  {
    id: 'polymer-star',
    name: 'Star Polymer',
    domain: 'chemistry',
    category: 'structures',
    tags: ['star', 'arm', 'core', 'radial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="red"/>
      <line x1="32" y1="24" x2="32" y2="4" stroke="blue" stroke-width="2"/>
      <line x1="40" y1="32" x2="60" y2="32" stroke="blue" stroke-width="2"/>
      <line x1="32" y1="40" x2="32" y2="60" stroke="blue" stroke-width="2"/>
      <line x1="24" y1="32" x2="4" y2="32" stroke="blue" stroke-width="2"/>
      <line x1="38" y1="26" x2="52" y2="12" stroke="blue" stroke-width="2"/>
      <line x1="26" y1="38" x2="12" y2="52" stroke="blue" stroke-width="2"/>
      <circle cx="32" cy="4" r="2" fill="blue"/>
      <circle cx="60" cy="32" r="2" fill="blue"/>
      <circle cx="32" cy="60" r="2" fill="blue"/>
      <circle cx="4" cy="32" r="2" fill="blue"/>
      <text x="16" y="62" font-size="5" fill="currentColor" stroke="none">Star Polymer</text>
    </svg>`
  },

  // ===========================================================================
  // PROPERTIES AND CHARACTERIZATION
  // ===========================================================================
  {
    id: 'polymer-molecular-weight',
    name: 'Molecular Weight Distribution',
    domain: 'chemistry',
    category: 'properties',
    tags: ['molecular weight', 'PDI', 'Mn', 'Mw', 'distribution'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="52" x2="56" y2="52"/>
      <line x1="8" y1="52" x2="8" y2="8"/>
      <path d="M12 48 C20 44, 28 16, 36 16 C44 16, 52 44, 56 48" stroke="blue" stroke-width="2" fill="none"/>
      <line x1="28" y1="16" x2="28" y2="52" stroke-dasharray="2 2" stroke="green"/>
      <line x1="36" y1="16" x2="36" y2="52" stroke-dasharray="2 2" stroke="red"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">f(M)</text>
      <text x="48" y="62" font-size="5" fill="currentColor" stroke="none">M</text>
      <text x="24" y="60" font-size="4" fill="green" stroke="none">Mn</text>
      <text x="34" y="60" font-size="4" fill="red" stroke="none">Mw</text>
    </svg>`
  },
  {
    id: 'polymer-glass-transition',
    name: 'Glass Transition',
    domain: 'chemistry',
    category: 'properties',
    tags: ['Tg', 'glass transition', 'thermal', 'amorphous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="52" x2="56" y2="52"/>
      <line x1="8" y1="52" x2="8" y2="8"/>
      <path d="M12 44 L24 40 L32 24 L52 16" stroke="blue" stroke-width="2"/>
      <circle cx="28" cy="32" r="3" fill="red"/>
      <line x1="28" y1="35" x2="28" y2="52" stroke-dasharray="2 2"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">V</text>
      <text x="48" y="62" font-size="5" fill="currentColor" stroke="none">T</text>
      <text x="24" y="60" font-size="5" fill="red" stroke="none">Tg</text>
      <text x="12" y="48" font-size="4" fill="currentColor" stroke="none">Glass</text>
      <text x="40" y="20" font-size="4" fill="currentColor" stroke="none">Rubber</text>
    </svg>`
  },
  {
    id: 'polymer-crystallinity',
    name: 'Crystallinity',
    domain: 'chemistry',
    category: 'properties',
    tags: ['crystalline', 'amorphous', 'semicrystalline', 'lamellae'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="24" height="24" rx="2"/>
      <path d="M8 12 L8 28" stroke="blue"/>
      <path d="M12 12 L12 28" stroke="blue"/>
      <path d="M16 12 L16 28" stroke="blue"/>
      <path d="M20 12 L20 28" stroke="blue"/>
      <path d="M24 12 L24 28" stroke="blue"/>
      <text x="8" y="40" font-size="4" fill="currentColor" stroke="none">Crystalline</text>
      <rect x="36" y="8" width="24" height="24" rx="2"/>
      <path d="M40 14 C46 18, 50 22, 56 26" stroke="blue"/>
      <path d="M40 20 C44 16, 52 24, 56 20" stroke="blue"/>
      <path d="M40 26 C48 22, 44 30, 56 28" stroke="blue"/>
      <text x="38" y="40" font-size="4" fill="currentColor" stroke="none">Amorphous</text>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Ordered chains</text>
      <text x="36" y="56" font-size="4" fill="currentColor" stroke="none">Random coils</text>
    </svg>`
  },
  {
    id: 'polymer-viscosity',
    name: 'Intrinsic Viscosity',
    domain: 'chemistry',
    category: 'properties',
    tags: ['viscosity', 'intrinsic', 'Mark-Houwink', 'solution'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="52" x2="56" y2="52"/>
      <line x1="8" y1="52" x2="8" y2="8"/>
      <path d="M12 48 L24 40 L36 28 L52 12" stroke="blue" stroke-width="2"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">[η]</text>
      <text x="48" y="62" font-size="5" fill="currentColor" stroke="none">M</text>
      <text x="20" y="24" font-size="4" fill="currentColor" stroke="none">[η] = KMa</text>
      <text x="44" y="20" font-size="4" fill="currentColor" stroke="none">slope=a</text>
    </svg>`
  },
  {
    id: 'polymer-tensile',
    name: 'Stress-Strain Curve',
    domain: 'chemistry',
    category: 'properties',
    tags: ['tensile', 'stress', 'strain', 'mechanical', 'Young modulus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="52" x2="56" y2="52"/>
      <line x1="8" y1="52" x2="8" y2="8"/>
      <path d="M12 48 L20 32 L28 28 L36 30 L44 32 L52 36" stroke="blue" stroke-width="2"/>
      <circle cx="20" cy="32" r="2" fill="red"/>
      <circle cx="52" cy="36" r="2" fill="green"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">σ</text>
      <text x="52" y="62" font-size="5" fill="currentColor" stroke="none">ε</text>
      <text x="18" y="28" font-size="4" fill="red" stroke="none">Yield</text>
      <text x="46" y="32" font-size="4" fill="green" stroke="none">Break</text>
    </svg>`
  },
  {
    id: 'polymer-gpc',
    name: 'GPC/SEC Analysis',
    domain: 'chemistry',
    category: 'properties',
    tags: ['GPC', 'SEC', 'size exclusion', 'chromatography', 'analysis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="12" height="40" rx="2"/>
      <circle cx="14" cy="16" r="3" fill="gray"/>
      <circle cx="14" cy="28" r="3" fill="gray"/>
      <circle cx="14" cy="40" r="3" fill="gray"/>
      <circle cx="14" cy="20" r="1" fill="blue"/>
      <circle cx="14" cy="34" r="2" fill="green"/>
      <path d="M24 24 L32 24" marker-end="url(#arrow)"/>
      <line x1="36" y1="52" x2="56" y2="52"/>
      <line x1="36" y1="52" x2="36" y2="16"/>
      <path d="M40 48 C44 40, 48 24, 52 20" stroke="blue" stroke-width="2"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Column</text>
      <text x="40" y="14" font-size="4" fill="currentColor" stroke="none">Small</text>
      <text x="52" y="46" font-size="4" fill="currentColor" stroke="none">Large</text>
    </svg>`
  },
];

export default polymerIcons;
