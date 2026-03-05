/**
 * Microbiology Icon Library
 * Comprehensive SVG icons for microbiology
 *
 * Categories:
 * - Bacteria (morphology, structure, types, pathogenic)
 * - Viruses (structure, types, infection cycles)
 * - Fungi (types, structure, pathogenic)
 * - Parasites (protozoa, helminths, ectoparasites)
 * - Laboratory (microscopes, techniques, culture)
 * - Molecular Methods (PCR, ELISA, sequencing)
 * - Antimicrobial Resistance
 * - Sterilization & Disinfection
 * - Immunology (antibodies, antigens)
 *
 * Total: 95 icons
 */

import type { IconDefinition } from './index';

export const microbiologyIcons: IconDefinition[] = [
  // ===========================================================================
  // BACTERIA - MORPHOLOGY
  // ===========================================================================
  {
    id: 'micro-bacteria-coccus',
    name: 'Coccus Bacteria',
    domain: 'biology',
    category: 'bacteria',
    tags: ['coccus', 'spherical', 'bacteria', 'Staphylococcus', 'Streptococcus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="8" fill="#9B59B6" opacity="0.4"/>
      <circle cx="32" cy="16" r="8" fill="#9B59B6" opacity="0.4"/>
      <circle cx="48" cy="16" r="8" fill="#9B59B6" opacity="0.4"/>
      <circle cx="24" cy="32" r="8" fill="#9B59B6" opacity="0.4"/>
      <circle cx="40" cy="32" r="8" fill="#9B59B6" opacity="0.4"/>
      <circle cx="16" cy="48" r="8" fill="#9B59B6" opacity="0.4"/>
      <circle cx="32" cy="48" r="8" fill="#9B59B6" opacity="0.4"/>
      <circle cx="48" cy="48" r="8" fill="#9B59B6" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'micro-bacteria-bacillus',
    name: 'Bacillus Bacteria',
    domain: 'biology',
    category: 'bacteria',
    tags: ['bacillus', 'rod-shaped', 'bacteria', 'E. coli', 'Salmonella'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="20" height="8" rx="4" fill="#27AE60" opacity="0.4"/>
      <rect x="36" y="12" width="20" height="8" rx="4" fill="#27AE60" opacity="0.4"/>
      <rect x="12" y="28" width="20" height="8" rx="4" fill="#27AE60" opacity="0.4"/>
      <rect x="40" y="32" width="18" height="8" rx="4" fill="#27AE60" opacity="0.4"/>
      <rect x="8" y="48" width="22" height="8" rx="4" fill="#27AE60" opacity="0.4"/>
      <rect x="36" y="48" width="20" height="8" rx="4" fill="#27AE60" opacity="0.4"/>
      <path d="M4 12c-2-4 0-8 4-4"/>
      <path d="M60 16c2-4 0-8-4-4"/>
    </svg>`
  },
  {
    id: 'micro-bacteria-spirillum',
    name: 'Spirillum Bacteria',
    domain: 'biology',
    category: 'bacteria',
    tags: ['spirillum', 'spiral', 'bacteria', 'Spirochete', 'helical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c4-12 8 12 12 0s8 12 12 0 8 12 12 0 8 12 12 0" stroke="#E74C3C" stroke-width="3"/>
      <path d="M8 48c4-8 8 8 12 0s8 8 12 0 8 8 12 0 8 8 12 0" stroke="#E74C3C" stroke-width="2" opacity="0.6"/>
      <path d="M12 16c4-8 8 8 12 0s8 8 12 0 8 8 12 0" stroke="#E74C3C" stroke-width="2" opacity="0.6"/>
    </svg>`
  },
  {
    id: 'micro-bacteria-vibrio',
    name: 'Vibrio Bacteria',
    domain: 'biology',
    category: 'bacteria',
    tags: ['vibrio', 'comma-shaped', 'bacteria', 'cholera', 'curved'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c8 0 12 8 8 16" stroke="#3498DB" stroke-width="4" stroke-linecap="round"/>
      <path d="M40 12c8 0 12 8 8 16" stroke="#3498DB" stroke-width="4" stroke-linecap="round"/>
      <path d="M24 36c8 0 12 8 8 16" stroke="#3498DB" stroke-width="4" stroke-linecap="round"/>
      <path d="M48 40c8 0 12 8 8 16" stroke="#3498DB" stroke-width="4" stroke-linecap="round"/>
      <path d="M16 16c-4-8-4-12 0-12"/>
      <path d="M40 12c-4-8-4-12 0-12"/>
    </svg>`
  },
  {
    id: 'micro-bacteria-diplococcus',
    name: 'Diplococcus',
    domain: 'biology',
    category: 'bacteria',
    tags: ['diplococcus', 'paired cocci', 'Neisseria', 'pneumococcus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="20" r="10" fill="#9B59B6" opacity="0.4"/>
      <circle cx="36" cy="20" r="10" fill="#9B59B6" opacity="0.4"/>
      <circle cx="20" cy="44" r="10" fill="#9B59B6" opacity="0.4"/>
      <circle cx="36" cy="44" r="10" fill="#9B59B6" opacity="0.4"/>
      <line x1="30" y1="16" x2="26" y2="16" stroke-width="2"/>
      <line x1="30" y1="40" x2="26" y2="40" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'micro-bacteria-streptococcus',
    name: 'Streptococcus Chain',
    domain: 'biology',
    category: 'bacteria',
    tags: ['streptococcus', 'chain', 'cocci', 'strep throat', 'group A'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="32" r="6" fill="#9B59B6" opacity="0.5"/>
      <circle cx="20" cy="32" r="6" fill="#9B59B6" opacity="0.5"/>
      <circle cx="32" cy="32" r="6" fill="#9B59B6" opacity="0.5"/>
      <circle cx="44" cy="32" r="6" fill="#9B59B6" opacity="0.5"/>
      <circle cx="56" cy="32" r="6" fill="#9B59B6" opacity="0.5"/>
      <circle cx="14" cy="16" r="5" fill="#9B59B6" opacity="0.3"/>
      <circle cx="26" cy="16" r="5" fill="#9B59B6" opacity="0.3"/>
      <circle cx="38" cy="16" r="5" fill="#9B59B6" opacity="0.3"/>
      <circle cx="50" cy="16" r="5" fill="#9B59B6" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'micro-bacteria-staphylococcus',
    name: 'Staphylococcus Cluster',
    domain: 'biology',
    category: 'bacteria',
    tags: ['staphylococcus', 'cluster', 'grape-like', 'MRSA', 'staph'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="#F39C12" opacity="0.5"/>
      <circle cx="20" cy="24" r="7" fill="#F39C12" opacity="0.5"/>
      <circle cx="44" cy="24" r="7" fill="#F39C12" opacity="0.5"/>
      <circle cx="24" cy="40" r="6" fill="#F39C12" opacity="0.5"/>
      <circle cx="40" cy="40" r="6" fill="#F39C12" opacity="0.5"/>
      <circle cx="16" cy="36" r="5" fill="#F39C12" opacity="0.5"/>
      <circle cx="48" cy="36" r="5" fill="#F39C12" opacity="0.5"/>
      <circle cx="32" cy="48" r="5" fill="#F39C12" opacity="0.5"/>
      <circle cx="32" cy="16" r="5" fill="#F39C12" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'micro-bacteria-structure',
    name: 'Bacterial Cell Structure',
    domain: 'biology',
    category: 'bacteria',
    tags: ['bacterial cell', 'structure', 'flagella', 'pili', 'capsule', 'cell wall'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16" fill="#9B59B6" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="24" ry="16"/>
      <ellipse cx="32" cy="32" rx="20" ry="12" stroke-dasharray="2 2"/>
      <circle cx="24" cy="28" r="4" fill="#E74C3C" opacity="0.5"/>
      <ellipse cx="40" cy="34" rx="6" ry="4" fill="#3498DB" opacity="0.5"/>
      <path d="M8 32c-8 0-8-8 0-8"/>
      <path d="M56 32c8 0 8 8 0 8"/>
      <path d="M56 28c6-4 6-8 2-8"/>
      <path d="M56 36c6 4 6 8 2 8"/>
    </svg>`
  },

  // ===========================================================================
  // BACTERIA - STAINING
  // ===========================================================================
  {
    id: 'micro-gram-stain',
    name: 'Gram Stain',
    domain: 'biology',
    category: 'bacteria',
    tags: ['Gram stain', 'Gram positive', 'Gram negative', 'staining', 'differential'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="24" height="48" rx="2"/>
      <rect x="36" y="8" width="24" height="48" rx="2"/>
      <circle cx="12" cy="24" r="4" fill="#9B59B6"/>
      <circle cx="20" cy="32" r="4" fill="#9B59B6"/>
      <circle cx="14" cy="40" r="4" fill="#9B59B6"/>
      <ellipse cx="44" cy="24" rx="6" ry="3" fill="#E74C3C"/>
      <ellipse cx="52" cy="32" rx="6" ry="3" fill="#E74C3C"/>
      <ellipse cx="46" cy="42" rx="6" ry="3" fill="#E74C3C"/>
      <text x="6" y="60" font-size="4" fill="currentColor" stroke="none">Gram+</text>
      <text x="38" y="60" font-size="4" fill="currentColor" stroke="none">Gram-</text>
    </svg>`
  },
  {
    id: 'micro-acid-fast-stain',
    name: 'Acid-Fast Stain',
    domain: 'biology',
    category: 'bacteria',
    tags: ['acid-fast', 'Ziehl-Neelsen', 'mycobacteria', 'TB', 'tuberculosis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <rect x="12" y="12" width="40" height="40" fill="#90CAF9" opacity="0.3"/>
      <rect x="16" y="20" width="12" height="3" rx="1.5" fill="#E74C3C"/>
      <rect x="24" y="28" width="14" height="3" rx="1.5" fill="#E74C3C"/>
      <rect x="20" y="36" width="10" height="3" rx="1.5" fill="#E74C3C"/>
      <rect x="36" y="24" width="12" height="3" rx="1.5" fill="#E74C3C"/>
      <rect x="32" y="40" width="14" height="3" rx="1.5" fill="#E74C3C"/>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">AFB Positive</text>
    </svg>`
  },
  {
    id: 'micro-india-ink-stain',
    name: 'India Ink Stain',
    domain: 'biology',
    category: 'bacteria',
    tags: ['India ink', 'capsule stain', 'Cryptococcus', 'negative stain'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2" fill="#1a1a1a" opacity="0.8"/>
      <circle cx="24" cy="28" r="10" fill="#ffffff" opacity="0.9"/>
      <circle cx="24" cy="28" r="6" fill="#E8D5B7"/>
      <circle cx="44" cy="40" r="8" fill="#ffffff" opacity="0.9"/>
      <circle cx="44" cy="40" r="5" fill="#E8D5B7"/>
      <text x="14" y="58" font-size="4" fill="#ffffff" stroke="none">Capsule</text>
    </svg>`
  },
  {
    id: 'micro-endospore-stain',
    name: 'Endospore Stain',
    domain: 'biology',
    category: 'bacteria',
    tags: ['endospore', 'Schaeffer-Fulton', 'Clostridium', 'Bacillus', 'spore'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <rect x="12" y="24" width="20" height="8" rx="4" fill="#E74C3C" opacity="0.6"/>
      <ellipse cx="24" cy="28" rx="4" ry="3" fill="#27AE60"/>
      <rect x="32" y="32" width="20" height="8" rx="4" fill="#E74C3C" opacity="0.6"/>
      <ellipse cx="48" cy="36" rx="4" ry="3" fill="#27AE60"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Green=Spore</text>
    </svg>`
  },

  // ===========================================================================
  // BACTERIA - PATHOGENIC TYPES
  // ===========================================================================
  {
    id: 'micro-ecoli',
    name: 'Escherichia coli',
    domain: 'biology',
    category: 'bacteria',
    tags: ['E. coli', 'enterobacteria', 'fecal coliform', 'UTI'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="10" fill="#27AE60" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="20" ry="10"/>
      <path d="M12 32c-6 2-8-2-6-4"/>
      <path d="M10 28c-6-2-6-6-2-6"/>
      <path d="M52 32c6 2 8-2 6-4"/>
      <path d="M54 28c6-2 6-6 2-6"/>
      <ellipse cx="26" cy="32" rx="4" ry="3" fill="#E74C3C" opacity="0.5"/>
      <text x="16" y="54" font-size="5" fill="currentColor" stroke="none">E. coli</text>
    </svg>`
  },
  {
    id: 'micro-salmonella',
    name: 'Salmonella',
    domain: 'biology',
    category: 'bacteria',
    tags: ['Salmonella', 'typhoid', 'food poisoning', 'enterobacteria'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="18" ry="10" fill="#F39C12" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="18" ry="10"/>
      <path d="M14 32c-4-8-8-4-8 0s4 8 8 4"/>
      <path d="M50 32c4-8 8-4 8 0s-4 8-8 4"/>
      <circle cx="24" cy="30" r="2" fill="#E74C3C"/>
      <circle cx="40" cy="30" r="2" fill="#E74C3C"/>
      <text x="10" y="54" font-size="5" fill="currentColor" stroke="none">Salmonella</text>
    </svg>`
  },
  {
    id: 'micro-pseudomonas',
    name: 'Pseudomonas aeruginosa',
    domain: 'biology',
    category: 'bacteria',
    tags: ['Pseudomonas', 'opportunistic', 'nosocomial', 'biofilm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="12" fill="#2ECC71" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="20" ry="12"/>
      <path d="M52 32c8-12 4-20 0-16s-4 12 0 16"/>
      <circle cx="28" cy="30" r="3" fill="#3498DB" opacity="0.5"/>
      <text x="8" y="54" font-size="4" fill="currentColor" stroke="none">P. aeruginosa</text>
    </svg>`
  },
  {
    id: 'micro-mycobacterium',
    name: 'Mycobacterium tuberculosis',
    domain: 'biology',
    category: 'bacteria',
    tags: ['Mycobacterium', 'TB', 'tuberculosis', 'acid-fast', 'MTB'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="16" height="4" rx="2" fill="#E74C3C" opacity="0.6"/>
      <rect x="20" y="24" width="18" height="4" rx="2" fill="#E74C3C" opacity="0.6"/>
      <rect x="16" y="32" width="14" height="4" rx="2" fill="#E74C3C" opacity="0.6"/>
      <rect x="32" y="28" width="16" height="4" rx="2" fill="#E74C3C" opacity="0.6"/>
      <rect x="36" y="38" width="14" height="4" rx="2" fill="#E74C3C" opacity="0.6"/>
      <rect x="24" y="44" width="18" height="4" rx="2" fill="#E74C3C" opacity="0.6"/>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">M. tuberculosis</text>
    </svg>`
  },
  {
    id: 'micro-clostridium',
    name: 'Clostridium',
    domain: 'biology',
    category: 'bacteria',
    tags: ['Clostridium', 'anaerobe', 'C. diff', 'botulism', 'tetanus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="12" height="24" rx="6" fill="#9B59B6" opacity="0.4"/>
      <rect x="16" y="20" width="12" height="24" rx="6"/>
      <ellipse cx="22" cy="38" rx="4" ry="6" fill="#27AE60"/>
      <rect x="36" y="16" width="12" height="28" rx="6" fill="#9B59B6" opacity="0.4"/>
      <rect x="36" y="16" width="12" height="28" rx="6"/>
      <ellipse cx="42" cy="36" rx="4" ry="6" fill="#27AE60"/>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Clostridium</text>
    </svg>`
  },
  {
    id: 'micro-helicobacter',
    name: 'Helicobacter pylori',
    domain: 'biology',
    category: 'bacteria',
    tags: ['Helicobacter', 'H. pylori', 'stomach ulcer', 'gastric'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32c4-8 8 8 12 0s8 8 12 0s8 8 8 0" stroke="#E74C3C" stroke-width="4"/>
      <path d="M8 32c-4 4-8 0-4-4"/>
      <path d="M8 32c-4-4-8 0-4 4"/>
      <path d="M48 32c4 4 8 0 4-4"/>
      <path d="M48 32c4-4 8 0 4 4"/>
      <text x="12" y="54" font-size="5" fill="currentColor" stroke="none">H. pylori</text>
    </svg>`
  },

  // ===========================================================================
  // VIRUSES
  // ===========================================================================
  {
    id: 'micro-virus-icosahedral',
    name: 'Icosahedral Virus',
    domain: 'biology',
    category: 'viruses',
    tags: ['icosahedral', 'virus', 'capsid', 'adenovirus', 'poliovirus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,4 56,20 56,44 32,60 8,44 8,20" fill="#E74C3C" opacity="0.3"/>
      <polygon points="32,4 56,20 56,44 32,60 8,44 8,20"/>
      <line x1="32" y1="4" x2="32" y2="60"/>
      <line x1="8" y1="20" x2="56" y2="44"/>
      <line x1="56" y1="20" x2="8" y2="44"/>
      <circle cx="32" cy="32" r="8" fill="#9B59B6" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'micro-virus-helical',
    name: 'Helical Virus',
    domain: 'biology',
    category: 'viruses',
    tags: ['helical', 'virus', 'TMV', 'tobacco mosaic', 'RNA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="4" width="24" height="56" rx="4" fill="#27AE60" opacity="0.3"/>
      <path d="M20 12c12 4 12-4 24 0"/>
      <path d="M20 20c12 4 12-4 24 0"/>
      <path d="M20 28c12 4 12-4 24 0"/>
      <path d="M20 36c12 4 12-4 24 0"/>
      <path d="M20 44c12 4 12-4 24 0"/>
      <path d="M20 52c12 4 12-4 24 0"/>
      <line x1="32" y1="4" x2="32" y2="60" stroke="#E74C3C" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'micro-virus-envelope',
    name: 'Enveloped Virus',
    domain: 'biology',
    category: 'viruses',
    tags: ['enveloped', 'virus', 'influenza', 'HIV', 'membrane'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="#F39C12" opacity="0.2"/>
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="16" fill="#9B59B6" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
      <path d="M8 32l-4-4v8z"/>
      <path d="M56 32l4-4v8z"/>
      <path d="M32 8l-4-4h8z"/>
      <path d="M32 56l-4 4h8z"/>
      <path d="M12 16l-4-2 2-4"/>
      <path d="M52 16l4-2-2-4"/>
      <path d="M12 48l-4 2 2 4"/>
      <path d="M52 48l4 2-2 4"/>
    </svg>`
  },
  {
    id: 'micro-bacteriophage',
    name: 'Bacteriophage',
    domain: 'biology',
    category: 'viruses',
    tags: ['bacteriophage', 'phage', 'T4', 'lytic', 'lysogenic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,4 44,16 44,28 32,36 20,28 20,16" fill="#3498DB" opacity="0.3"/>
      <polygon points="32,4 44,16 44,28 32,36 20,28 20,16"/>
      <rect x="28" y="36" width="8" height="12"/>
      <path d="M28 48l-8 12"/>
      <path d="M36 48l8 12"/>
      <path d="M32 48v12"/>
      <line x1="20" y1="60" x2="44" y2="60"/>
    </svg>`
  },
  {
    id: 'micro-coronavirus',
    name: 'Coronavirus',
    domain: 'biology',
    category: 'viruses',
    tags: ['coronavirus', 'spike protein', 'COVID', 'SARS', 'RNA virus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#E74C3C" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
      <g fill="#E74C3C">
        <circle cx="32" cy="8" r="4"/>
        <circle cx="32" cy="56" r="4"/>
        <circle cx="8" cy="32" r="4"/>
        <circle cx="56" cy="32" r="4"/>
        <circle cx="14" cy="14" r="4"/>
        <circle cx="50" cy="14" r="4"/>
        <circle cx="14" cy="50" r="4"/>
        <circle cx="50" cy="50" r="4"/>
      </g>
      <path d="M32 16v-4"/>
      <path d="M32 52v-4"/>
      <path d="M16 32h-4"/>
      <path d="M52 32h-4"/>
    </svg>`
  },
  {
    id: 'micro-virus-replication',
    name: 'Viral Replication Cycle',
    domain: 'biology',
    category: 'viruses',
    tags: ['replication', 'lytic cycle', 'attachment', 'assembly', 'release'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" stroke-dasharray="4 2"/>
      <polygon points="8,32 16,28 16,36" fill="#E74C3C" opacity="0.5"/>
      <circle cx="32" cy="8" r="4" fill="#F39C12" opacity="0.5"/>
      <path d="M52 24c-4-4-4 4-8 0" stroke="#9B59B6"/>
      <polygon points="56,32 48,28 48,36" fill="#27AE60" opacity="0.5"/>
      <circle cx="32" cy="56" r="4" fill="#3498DB" opacity="0.5"/>
      <path d="M28 56l-8 4"/>
      <path d="M36 56l8 4"/>
    </svg>`
  },
  {
    id: 'micro-hiv',
    name: 'HIV Virus',
    domain: 'biology',
    category: 'viruses',
    tags: ['HIV', 'AIDS', 'retrovirus', 'reverse transcriptase', 'CD4'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#E74C3C" opacity="0.2"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="14" fill="#9B59B6" opacity="0.3"/>
      <circle cx="32" cy="32" r="14"/>
      <path d="M32 12l-3-6h6z" fill="#E74C3C"/>
      <path d="M32 52l-3 6h6z" fill="#E74C3C"/>
      <path d="M12 32l-6-3v6z" fill="#E74C3C"/>
      <path d="M52 32l6-3v6z" fill="#E74C3C"/>
      <ellipse cx="32" cy="32" rx="4" ry="6" fill="#F39C12" opacity="0.5"/>
      <text x="20" y="60" font-size="5" fill="currentColor" stroke="none">HIV</text>
    </svg>`
  },
  {
    id: 'micro-influenza',
    name: 'Influenza Virus',
    domain: 'biology',
    category: 'viruses',
    tags: ['influenza', 'flu', 'hemagglutinin', 'neuraminidase', 'RNA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#3498DB" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <path d="M32 14v-6" stroke-width="2"/>
      <path d="M32 56v-6" stroke-width="2"/>
      <path d="M14 32h-6" stroke-width="2"/>
      <path d="M56 32h-6" stroke-width="2"/>
      <path d="M18 18l-4-4"/>
      <path d="M46 18l4-4"/>
      <path d="M18 46l-4 4"/>
      <path d="M46 46l4 4"/>
      <circle cx="32" cy="6" r="2" fill="#E74C3C"/>
      <circle cx="32" cy="58" r="2" fill="#E74C3C"/>
      <circle cx="6" cy="32" r="2" fill="#27AE60"/>
      <circle cx="58" cy="32" r="2" fill="#27AE60"/>
    </svg>`
  },
  {
    id: 'micro-hepatitis',
    name: 'Hepatitis Virus',
    domain: 'biology',
    category: 'viruses',
    tags: ['hepatitis', 'HBV', 'HCV', 'liver', 'viral hepatitis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#F39C12" opacity="0.3"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12" stroke-dasharray="3 2"/>
      <circle cx="32" cy="32" r="6" fill="#E74C3C" opacity="0.5"/>
      <path d="M32 12l2-4h-4z"/>
      <path d="M32 52l2 4h-4z"/>
      <path d="M12 32l-4 2v-4z"/>
      <path d="M52 32l4 2v-4z"/>
      <text x="16" y="60" font-size="5" fill="currentColor" stroke="none">Hepatitis</text>
    </svg>`
  },
  {
    id: 'micro-herpes',
    name: 'Herpes Simplex Virus',
    domain: 'biology',
    category: 'viruses',
    tags: ['herpes', 'HSV', 'DNA virus', 'latent infection', 'cold sore'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22" fill="#9B59B6" opacity="0.2"/>
      <circle cx="32" cy="32" r="22"/>
      <polygon points="32,14 44,24 44,40 32,50 20,40 20,24" fill="#E74C3C" opacity="0.3"/>
      <polygon points="32,14 44,24 44,40 32,50 20,40 20,24"/>
      <circle cx="32" cy="32" r="6" fill="#3498DB" opacity="0.5"/>
      <text x="18" y="60" font-size="5" fill="currentColor" stroke="none">HSV</text>
    </svg>`
  },

  // ===========================================================================
  // FUNGI
  // ===========================================================================
  {
    id: 'micro-yeast',
    name: 'Yeast Cell',
    domain: 'biology',
    category: 'fungi',
    tags: ['yeast', 'Saccharomyces', 'budding', 'unicellular', 'fungi'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="16" ry="20" fill="#F39C12" opacity="0.3"/>
      <ellipse cx="24" cy="32" rx="16" ry="20"/>
      <circle cx="24" cy="24" r="6" fill="#9B59B6" opacity="0.5"/>
      <ellipse cx="24" cy="36" rx="4" ry="6" fill="#E74C3C" opacity="0.3"/>
      <ellipse cx="48" cy="24" rx="8" ry="10" fill="#F39C12" opacity="0.3"/>
      <ellipse cx="48" cy="24" rx="8" ry="10"/>
      <path d="M40 28c4 4 4 0 4 0"/>
    </svg>`
  },
  {
    id: 'micro-mold-hyphae',
    name: 'Fungal Hyphae',
    domain: 'biology',
    category: 'fungi',
    tags: ['hyphae', 'mycelium', 'mold', 'filamentous', 'septate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56c8-16 8-32 24-32" stroke-width="2"/>
      <path d="M32 24c8 0 16 8 24 8" stroke-width="2"/>
      <path d="M32 24c0-8 8-16 16-16" stroke-width="2"/>
      <path d="M24 40c-8 0-16-8-16-16" stroke-width="2"/>
      <path d="M32 24c-8 8-8 24-8 32" stroke-width="2"/>
      <line x1="20" y1="36" x2="20" y2="52" stroke-dasharray="2 2"/>
      <line x1="32" y1="16" x2="40" y2="8" stroke-dasharray="2 2"/>
      <circle cx="8" cy="56" r="3" fill="#27AE60"/>
      <circle cx="48" cy="8" r="3" fill="#27AE60"/>
    </svg>`
  },
  {
    id: 'micro-mushroom',
    name: 'Mushroom Structure',
    domain: 'biology',
    category: 'fungi',
    tags: ['mushroom', 'basidiomycete', 'fruiting body', 'cap', 'gills'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-16 16-24 24-24s24 8 24 24" fill="#E74C3C" opacity="0.3"/>
      <path d="M8 32c0-16 16-24 24-24s24 8 24 24"/>
      <path d="M8 32c8 8 40 8 48 0"/>
      <rect x="26" y="32" width="12" height="20" fill="#F39C12" opacity="0.3"/>
      <rect x="26" y="32" width="12" height="20"/>
      <path d="M24 52c-8 4-8 8 0 8h16c8 0 8-4 0-8"/>
      <line x1="16" y1="32" x2="16" y2="36"/>
      <line x1="24" y1="32" x2="24" y2="38"/>
      <line x1="40" y1="32" x2="40" y2="38"/>
      <line x1="48" y1="32" x2="48" y2="36"/>
    </svg>`
  },
  {
    id: 'micro-spore',
    name: 'Fungal Spores',
    domain: 'biology',
    category: 'fungi',
    tags: ['spore', 'conidium', 'sporangium', 'reproduction', 'dispersal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 56v-40"/>
      <circle cx="32" cy="12" r="8" fill="#9B59B6" opacity="0.4"/>
      <circle cx="24" cy="8" r="3" fill="#27AE60"/>
      <circle cx="32" cy="4" r="3" fill="#27AE60"/>
      <circle cx="40" cy="8" r="3" fill="#27AE60"/>
      <circle cx="28" cy="14" r="3" fill="#27AE60"/>
      <circle cx="36" cy="14" r="3" fill="#27AE60"/>
      <path d="M20 20l-8 8" stroke-dasharray="2 2"/>
      <path d="M44 20l8 8" stroke-dasharray="2 2"/>
      <circle cx="10" cy="30" r="2" fill="#27AE60" opacity="0.5"/>
      <circle cx="54" cy="30" r="2" fill="#27AE60" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'micro-candida',
    name: 'Candida albicans',
    domain: 'biology',
    category: 'fungi',
    tags: ['Candida', 'yeast', 'thrush', 'opportunistic', 'dimorphic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="28" rx="10" ry="12" fill="#F39C12" opacity="0.4"/>
      <ellipse cx="20" cy="28" rx="10" ry="12"/>
      <ellipse cx="36" cy="24" rx="6" ry="8" fill="#F39C12" opacity="0.4"/>
      <ellipse cx="36" cy="24" rx="6" ry="8"/>
      <path d="M42 24c8-2 12 4 16 8" stroke-width="2"/>
      <path d="M20 40c0 8 4 12 4 16" stroke-width="2"/>
      <text x="10" y="60" font-size="4" fill="currentColor" stroke="none">C. albicans</text>
    </svg>`
  },
  {
    id: 'micro-aspergillus',
    name: 'Aspergillus',
    domain: 'biology',
    category: 'fungi',
    tags: ['Aspergillus', 'conidiophore', 'aspergillosis', 'mold'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 56v-32" stroke-width="2"/>
      <circle cx="32" cy="20" r="8" fill="#27AE60" opacity="0.3"/>
      <circle cx="32" cy="12" r="2" fill="#27AE60"/>
      <circle cx="26" cy="16" r="2" fill="#27AE60"/>
      <circle cx="38" cy="16" r="2" fill="#27AE60"/>
      <circle cx="24" cy="22" r="2" fill="#27AE60"/>
      <circle cx="40" cy="22" r="2" fill="#27AE60"/>
      <circle cx="28" cy="26" r="2" fill="#27AE60"/>
      <circle cx="36" cy="26" r="2" fill="#27AE60"/>
      <ellipse cx="32" cy="22" rx="4" ry="3" fill="#9B59B6" opacity="0.5"/>
      <text x="10" y="60" font-size="5" fill="currentColor" stroke="none">Aspergillus</text>
    </svg>`
  },

  // ===========================================================================
  // PARASITES
  // ===========================================================================
  {
    id: 'micro-protozoa-amoeba',
    name: 'Amoeba',
    domain: 'biology',
    category: 'parasites',
    tags: ['amoeba', 'protozoa', 'pseudopod', 'Entamoeba', 'dysentery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32c-4-8 0-16 8-16s12 4 16 0 8 4 8 12-4 16-12 20-16 0-20-4-4-8 0-12z" fill="#9B59B6" opacity="0.3"/>
      <path d="M16 32c-4-8 0-16 8-16s12 4 16 0 8 4 8 12-4 16-12 20-16 0-20-4-4-8 0-12z"/>
      <circle cx="28" cy="28" r="6" fill="#3498DB" opacity="0.5"/>
      <circle cx="40" cy="36" r="3" fill="#E74C3C" opacity="0.5"/>
      <text x="18" y="58" font-size="5" fill="currentColor" stroke="none">Amoeba</text>
    </svg>`
  },
  {
    id: 'micro-protozoa-giardia',
    name: 'Giardia lamblia',
    domain: 'biology',
    category: 'parasites',
    tags: ['Giardia', 'protozoa', 'flagellate', 'giardiasis', 'trophozoite'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="20" fill="#27AE60" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="16" ry="20"/>
      <circle cx="26" cy="24" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="38" cy="24" r="4" fill="#3498DB" opacity="0.5"/>
      <path d="M24 20c-4-8-4-12 0-12"/>
      <path d="M40 20c4-8 4-12 0-12"/>
      <path d="M20 40c-4 8-4 12 0 12"/>
      <path d="M44 40c4 8 4 12 0 12"/>
      <line x1="32" y1="16" x2="32" y2="48" stroke-dasharray="2 2"/>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">Giardia</text>
    </svg>`
  },
  {
    id: 'micro-protozoa-plasmodium',
    name: 'Plasmodium (Malaria)',
    domain: 'biology',
    category: 'parasites',
    tags: ['Plasmodium', 'malaria', 'protozoa', 'RBC', 'sporozoite'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22" fill="#E74C3C" opacity="0.2"/>
      <circle cx="32" cy="32" r="22"/>
      <path d="M20 32c0-8 8-12 12-12s8 4 8 12-4 12-8 12-12-4-12-12z" fill="#9B59B6" opacity="0.4"/>
      <circle cx="26" cy="28" r="4" fill="#3498DB" opacity="0.6"/>
      <circle cx="36" cy="36" r="3" fill="#F39C12" opacity="0.6"/>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">Plasmodium</text>
    </svg>`
  },
  {
    id: 'micro-helminth-roundworm',
    name: 'Roundworm (Nematode)',
    domain: 'biology',
    category: 'parasites',
    tags: ['roundworm', 'nematode', 'Ascaris', 'helminth', 'intestinal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 16c8 8 8 24 8 32s8 8 16 0 8-24 8-32" stroke="#E8D5B7" stroke-width="6" stroke-linecap="round"/>
      <path d="M12 16c8 8 8 24 8 32s8 8 16 0 8-24 8-32" fill="none"/>
      <circle cx="12" cy="14" r="3" fill="#E74C3C" opacity="0.5"/>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">Roundworm</text>
    </svg>`
  },
  {
    id: 'micro-helminth-tapeworm',
    name: 'Tapeworm (Cestode)',
    domain: 'biology',
    category: 'parasites',
    tags: ['tapeworm', 'cestode', 'Taenia', 'proglottid', 'scolex'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="8" fill="#E8D5B7" opacity="0.6"/>
      <circle cx="16" cy="16" r="8"/>
      <circle cx="16" cy="12" r="2" fill="#333"/>
      <circle cx="16" cy="12" r="1" fill="#E74C3C"/>
      <rect x="20" y="12" width="8" height="10" rx="2" fill="#E8D5B7" opacity="0.6"/>
      <rect x="26" y="12" width="8" height="10" rx="2" fill="#E8D5B7" opacity="0.6"/>
      <rect x="32" y="12" width="10" height="12" rx="2" fill="#E8D5B7" opacity="0.6"/>
      <rect x="40" y="12" width="12" height="14" rx="2" fill="#E8D5B7" opacity="0.6"/>
      <path d="M52 24c4 8 4 16 0 24"/>
      <text x="14" y="54" font-size="4" fill="currentColor" stroke="none">Tapeworm</text>
    </svg>`
  },
  {
    id: 'micro-helminth-fluke',
    name: 'Liver Fluke (Trematode)',
    domain: 'biology',
    category: 'parasites',
    tags: ['fluke', 'trematode', 'liver fluke', 'Fasciola', 'flatworm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24" fill="#8B7355" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <circle cx="32" cy="14" r="4" fill="#E74C3C" opacity="0.5"/>
      <circle cx="32" cy="26" r="3" fill="#E74C3C" opacity="0.5"/>
      <ellipse cx="32" cy="42" rx="8" ry="6" fill="#9B59B6" opacity="0.3"/>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">Liver Fluke</text>
    </svg>`
  },

  // ===========================================================================
  // LABORATORY TECHNIQUES
  // ===========================================================================
  {
    id: 'micro-microscope',
    name: 'Light Microscope',
    domain: 'biology',
    category: 'laboratory',
    tags: ['microscope', 'optical', 'magnification', 'lens', 'specimen'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="52" width="24" height="8" rx="2"/>
      <rect x="24" y="44" width="16" height="8"/>
      <path d="M32 44v-8"/>
      <rect x="26" y="32" width="12" height="4" fill="currentColor" opacity="0.2"/>
      <path d="M32 32v-16"/>
      <circle cx="32" cy="12" r="6"/>
      <path d="M24 24l-8 8"/>
      <path d="M40 24l8 8"/>
      <circle cx="32" cy="36" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'micro-electron-microscope',
    name: 'Electron Microscope',
    domain: 'biology',
    category: 'laboratory',
    tags: ['electron microscope', 'TEM', 'SEM', 'ultrastructure', 'magnification'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="16" y="8" width="32" height="48" rx="4"/>
      <circle cx="32" cy="20" r="8"/>
      <rect x="26" y="32" width="12" height="8" rx="1"/>
      <path d="M32 40v8"/>
      <rect x="24" y="48" width="16" height="4" rx="1"/>
      <path d="M32 12v-4"/>
      <circle cx="32" cy="20" r="4" fill="#3498DB" opacity="0.3"/>
      <text x="8" y="62" font-size="4" fill="currentColor" stroke="none">EM</text>
    </svg>`
  },
  {
    id: 'micro-petri-dish',
    name: 'Petri Dish Culture',
    domain: 'biology',
    category: 'laboratory',
    tags: ['petri dish', 'culture', 'agar', 'colony', 'growth'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="12" fill="#F39C12" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="28" ry="12"/>
      <ellipse cx="32" cy="28" rx="28" ry="12"/>
      <circle cx="16" cy="30" r="4" fill="#27AE60" opacity="0.6"/>
      <circle cx="28" cy="26" r="3" fill="#9B59B6" opacity="0.6"/>
      <circle cx="40" cy="32" r="5" fill="#E74C3C" opacity="0.6"/>
      <circle cx="48" cy="26" r="3" fill="#27AE60" opacity="0.6"/>
      <circle cx="24" cy="34" r="2" fill="#3498DB" opacity="0.6"/>
    </svg>`
  },
  {
    id: 'micro-streak-plate',
    name: 'Streak Plate Method',
    domain: 'biology',
    category: 'laboratory',
    tags: ['streak plate', 'isolation', 'pure culture', 'technique', 'quadrant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28"/>
      <line x1="32" y1="4" x2="32" y2="60"/>
      <line x1="4" y1="32" x2="60" y2="32"/>
      <path d="M8 12c4 4 8-4 12 0s8-4 12 0" stroke="#27AE60"/>
      <path d="M40 8c0 4 4 8 0 12s4 8 0 12" stroke="#9B59B6"/>
      <path d="M56 40c-4 4-8-4-12 0s-8-4-12 0" stroke="#E74C3C"/>
      <circle cx="12" cy="48" r="2" fill="#3498DB"/>
      <circle cx="20" cy="44" r="2" fill="#3498DB"/>
      <circle cx="16" cy="52" r="2" fill="#3498DB"/>
    </svg>`
  },
  {
    id: 'micro-staining',
    name: 'Microscopy Staining',
    domain: 'biology',
    category: 'laboratory',
    tags: ['staining', 'dye', 'microscopy', 'visualization', 'contrast'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="48" rx="2"/>
      <rect x="20" y="12" width="24" height="40" fill="#9B59B6" opacity="0.2"/>
      <circle cx="28" cy="24" r="4" fill="#9B59B6"/>
      <circle cx="36" cy="32" r="3" fill="#9B59B6"/>
      <ellipse cx="32" cy="44" rx="6" ry="3" fill="#9B59B6"/>
      <path d="M8 20l8-4"/>
      <path d="M8 32l8-4"/>
      <path d="M8 44l8-4"/>
    </svg>`
  },
  {
    id: 'micro-autoclave',
    name: 'Autoclave Sterilization',
    domain: 'biology',
    category: 'laboratory',
    tags: ['autoclave', 'sterilization', 'pressure', 'steam', 'sterile'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="40" rx="4"/>
      <rect x="12" y="20" width="40" height="32" rx="2" fill="currentColor" opacity="0.1"/>
      <circle cx="20" cy="8" r="4"/>
      <circle cx="32" cy="8" r="4"/>
      <circle cx="44" cy="8" r="4"/>
      <path d="M20 36c2-4 2 4 4 0s2 4 4 0" stroke="#E74C3C"/>
      <path d="M36 36c2-4 2 4 4 0s2 4 4 0" stroke="#E74C3C"/>
      <rect x="24" y="44" width="16" height="4"/>
    </svg>`
  },
  {
    id: 'micro-antibiotic-test',
    name: 'Antibiotic Sensitivity Test',
    domain: 'biology',
    category: 'laboratory',
    tags: ['antibiotic', 'sensitivity', 'disc diffusion', 'Kirby-Bauer', 'zone of inhibition'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#F39C12" opacity="0.1"/>
      <circle cx="32" cy="32" r="28"/>
      <circle cx="20" cy="20" r="4" fill="#FFFFFF" stroke="#333"/>
      <circle cx="20" cy="20" r="8" stroke-dasharray="2 2"/>
      <circle cx="44" cy="20" r="4" fill="#FFFFFF" stroke="#333"/>
      <circle cx="44" cy="20" r="12" stroke-dasharray="2 2"/>
      <circle cx="20" cy="44" r="4" fill="#FFFFFF" stroke="#333"/>
      <circle cx="20" cy="44" r="6" stroke-dasharray="2 2"/>
      <circle cx="44" cy="44" r="4" fill="#FFFFFF" stroke="#333"/>
    </svg>`
  },
  {
    id: 'micro-biosafety-cabinet',
    name: 'Biosafety Cabinet',
    domain: 'biology',
    category: 'laboratory',
    tags: ['biosafety cabinet', 'BSC', 'laminar flow', 'sterile', 'containment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="56" height="48" rx="2"/>
      <rect x="8" y="12" width="48" height="32" fill="#90CAF9" opacity="0.2"/>
      <rect x="8" y="12" width="48" height="32"/>
      <rect x="8" y="44" width="48" height="8"/>
      <path d="M16 16v24" stroke-dasharray="4 2" stroke="#3498DB"/>
      <path d="M32 16v24" stroke-dasharray="4 2" stroke="#3498DB"/>
      <path d="M48 16v24" stroke-dasharray="4 2" stroke="#3498DB"/>
      <rect x="20" y="48" width="8" height="4" fill="#27AE60"/>
      <rect x="36" y="48" width="8" height="4" fill="#E74C3C"/>
    </svg>`
  },
  {
    id: 'micro-incubator',
    name: 'Incubator',
    domain: 'biology',
    category: 'laboratory',
    tags: ['incubator', 'culture', 'temperature', 'CO2', 'growth'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <rect x="12" y="16" width="40" height="36" fill="#FEE2E2" opacity="0.3"/>
      <line x1="12" y1="24" x2="52" y2="24"/>
      <line x1="12" y1="36" x2="52" y2="36"/>
      <line x1="12" y1="48" x2="52" y2="48"/>
      <rect x="16" y="10" width="12" height="4" rx="1" fill="#333"/>
      <text x="18" y="13" font-size="3" fill="#fff" stroke="none">37C</text>
      <circle cx="44" cy="12" r="2" fill="#27AE60"/>
    </svg>`
  },

  // ===========================================================================
  // MOLECULAR METHODS
  // ===========================================================================
  {
    id: 'micro-pcr-tube',
    name: 'PCR Tube',
    domain: 'biology',
    category: 'molecular',
    tags: ['PCR', 'tube', 'amplification', 'thermal cycler', 'DNA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24v8c0 4-4 8-4 16v24c0 4-4 4-8 4s-8 0-8-4V32c0-8-4-12-4-16V8z"/>
      <path d="M20 8h24" stroke-width="2"/>
      <rect x="24" y="36" width="16" height="20" fill="#3498DB" opacity="0.3"/>
      <path d="M28 44c2-2 4 2 6 0"/>
      <path d="M28 48c2-2 4 2 6 0"/>
    </svg>`
  },
  {
    id: 'micro-pcr-machine',
    name: 'PCR Thermal Cycler',
    domain: 'biology',
    category: 'molecular',
    tags: ['PCR', 'thermal cycler', 'amplification', 'qPCR', 'real-time'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="40" rx="4"/>
      <rect x="12" y="8" width="40" height="12" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="12" y="8" width="40" height="12" rx="2"/>
      <circle cx="20" cy="14" r="2" fill="#27AE60"/>
      <circle cx="28" cy="14" r="2" fill="#F39C12"/>
      <rect x="34" y="11" width="14" height="6" rx="1" fill="#333"/>
      <text x="36" y="16" font-size="4" fill="#0f0" stroke="none">95C</text>
      <g fill="#3498DB" opacity="0.5">
        <rect x="16" y="32" width="4" height="8" rx="1"/>
        <rect x="22" y="32" width="4" height="8" rx="1"/>
        <rect x="28" y="32" width="4" height="8" rx="1"/>
        <rect x="34" y="32" width="4" height="8" rx="1"/>
        <rect x="40" y="32" width="4" height="8" rx="1"/>
      </g>
    </svg>`
  },
  {
    id: 'micro-gel-electrophoresis',
    name: 'Gel Electrophoresis',
    domain: 'biology',
    category: 'molecular',
    tags: ['electrophoresis', 'gel', 'DNA', 'agarose', 'bands'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <rect x="12" y="12" width="40" height="40" fill="#90CAF9" opacity="0.3"/>
      <line x1="16" y1="16" x2="48" y2="16" stroke-width="2"/>
      <rect x="18" y="24" width="4" height="2" fill="#E74C3C"/>
      <rect x="18" y="32" width="4" height="2" fill="#E74C3C"/>
      <rect x="18" y="44" width="4" height="2" fill="#E74C3C"/>
      <rect x="26" y="28" width="4" height="2" fill="#E74C3C"/>
      <rect x="26" y="40" width="4" height="2" fill="#E74C3C"/>
      <rect x="34" y="26" width="4" height="2" fill="#E74C3C"/>
      <rect x="34" y="34" width="4" height="2" fill="#E74C3C"/>
      <rect x="42" y="30" width="4" height="2" fill="#E74C3C"/>
      <rect x="42" y="42" width="4" height="2" fill="#E74C3C"/>
      <text x="10" y="60" font-size="3" fill="currentColor" stroke="none">- Cathode</text>
      <text x="36" y="60" font-size="3" fill="currentColor" stroke="none">+ Anode</text>
    </svg>`
  },
  {
    id: 'micro-elisa-plate',
    name: 'ELISA Plate',
    domain: 'biology',
    category: 'molecular',
    tags: ['ELISA', 'immunoassay', '96-well', 'antibody', 'detection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="12" width="56" height="40" rx="2"/>
      <g fill="none" stroke="currentColor">
        ${Array.from({length: 6}, (_, row) =>
          Array.from({length: 8}, (_, col) =>
            `<circle cx="${12 + col * 6}" cy="${20 + row * 5}" r="2"/>`
          ).join('')
        ).join('')}
      </g>
      <circle cx="12" cy="20" r="2" fill="#F39C12"/>
      <circle cx="18" cy="20" r="2" fill="#F39C12"/>
      <circle cx="24" cy="20" r="2" fill="#E67E22"/>
      <circle cx="30" cy="20" r="2" fill="#E74C3C"/>
      <circle cx="36" cy="20" r="2" fill="#C0392B"/>
    </svg>`
  },
  {
    id: 'micro-western-blot',
    name: 'Western Blot',
    domain: 'biology',
    category: 'molecular',
    tags: ['Western blot', 'immunoblot', 'protein', 'antibody', 'detection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <rect x="12" y="12" width="40" height="40" fill="#f5f5f5"/>
      <rect x="16" y="16" width="6" height="2" fill="#333"/>
      <rect x="16" y="24" width="6" height="3" fill="#333"/>
      <rect x="16" y="36" width="6" height="2" fill="#333"/>
      <rect x="26" y="20" width="6" height="4" fill="#333"/>
      <rect x="26" y="32" width="6" height="3" fill="#333"/>
      <rect x="36" y="22" width="6" height="5" fill="#333"/>
      <rect x="36" y="38" width="6" height="2" fill="#333"/>
      <rect x="46" y="18" width="4" height="3" fill="#333"/>
      <rect x="46" y="34" width="4" height="4" fill="#333"/>
      <text x="14" y="56" font-size="3" fill="currentColor" stroke="none">MW</text>
    </svg>`
  },
  {
    id: 'micro-sequencing',
    name: 'DNA Sequencing',
    domain: 'biology',
    category: 'molecular',
    tags: ['sequencing', 'Sanger', 'NGS', 'DNA', 'chromatogram'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="56" height="48" rx="2"/>
      <path d="M12 40c2-20 4 10 6-10s4 20 6 0 4 15 6-5" stroke="#27AE60" stroke-width="1.5"/>
      <path d="M14 40c2-15 4 12 6-8s4 18 6-2" stroke="#E74C3C" stroke-width="1.5"/>
      <path d="M16 40c2-12 4 8 6-6s4 14 6 0" stroke="#3498DB" stroke-width="1.5"/>
      <path d="M18 40c2-8 4 6 6-4s4 10 6 2" stroke="#F39C12" stroke-width="1.5"/>
      <text x="12" y="52" font-size="4" fill="#27AE60" stroke="none">A</text>
      <text x="22" y="52" font-size="4" fill="#E74C3C" stroke="none">T</text>
      <text x="32" y="52" font-size="4" fill="#3498DB" stroke="none">C</text>
      <text x="42" y="52" font-size="4" fill="#F39C12" stroke="none">G</text>
    </svg>`
  },
  {
    id: 'micro-flow-cytometry',
    name: 'Flow Cytometry',
    domain: 'biology',
    category: 'molecular',
    tags: ['flow cytometry', 'FACS', 'cell sorting', 'fluorescence', 'analysis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8v48h48"/>
      <circle cx="20" cy="36" r="2" fill="#27AE60"/>
      <circle cx="24" cy="32" r="2" fill="#27AE60"/>
      <circle cx="22" cy="28" r="2" fill="#27AE60"/>
      <circle cx="28" cy="34" r="2" fill="#27AE60"/>
      <circle cx="36" cy="20" r="2" fill="#E74C3C"/>
      <circle cx="40" cy="16" r="2" fill="#E74C3C"/>
      <circle cx="44" cy="18" r="2" fill="#E74C3C"/>
      <circle cx="42" cy="24" r="2" fill="#E74C3C"/>
      <line x1="16" y1="44" x2="48" y2="12" stroke-dasharray="4 2"/>
      <text x="14" y="60" font-size="3" fill="currentColor" stroke="none">FSC</text>
      <text x="2" y="32" font-size="3" fill="currentColor" stroke="none">SSC</text>
    </svg>`
  },

  // ===========================================================================
  // ANTIMICROBIAL RESISTANCE
  // ===========================================================================
  {
    id: 'micro-beta-lactamase',
    name: 'Beta-Lactamase',
    domain: 'biology',
    category: 'resistance',
    tags: ['beta-lactamase', 'resistance', 'enzyme', 'penicillinase', 'ESBL'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#E74C3C" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
      <path d="M20 32h8l4-8 4 16 4-8h8"/>
      <path d="M16 24l-8-8"/>
      <path d="M48 24l8-8"/>
      <circle cx="8" cy="16" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="56" cy="16" r="4" fill="#3498DB" opacity="0.5"/>
      <path d="M8 16l4 4" stroke="#E74C3C" stroke-width="2"/>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">Beta-lactamase</text>
    </svg>`
  },
  {
    id: 'micro-mrsa',
    name: 'MRSA',
    domain: 'biology',
    category: 'resistance',
    tags: ['MRSA', 'methicillin resistant', 'Staphylococcus', 'superbug'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="16" fill="#F39C12" opacity="0.4"/>
      <circle cx="32" cy="28" r="16"/>
      <circle cx="28" cy="24" r="4" fill="#F39C12" opacity="0.6"/>
      <circle cx="38" cy="30" r="3" fill="#F39C12" opacity="0.6"/>
      <path d="M16 28h-8" stroke="#E74C3C" stroke-width="2"/>
      <path d="M12 24l-4 4 4 4" stroke="#E74C3C" stroke-width="2"/>
      <line x1="4" y1="20" x2="12" y2="36" stroke="#E74C3C" stroke-width="2"/>
      <text x="16" y="56" font-size="6" fill="#E74C3C" stroke="none">MRSA</text>
    </svg>`
  },
  {
    id: 'micro-efflux-pump',
    name: 'Efflux Pump',
    domain: 'biology',
    category: 'resistance',
    tags: ['efflux pump', 'resistance', 'multidrug', 'MDR', 'transporter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4" fill="#9B59B6" opacity="0.2"/>
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <rect x="24" y="12" width="16" height="40" fill="#3498DB" opacity="0.3"/>
      <rect x="24" y="12" width="16" height="40"/>
      <circle cx="32" cy="24" r="4" fill="#E74C3C"/>
      <path d="M32 28v16"/>
      <path d="M28 40l4 6 4-6"/>
      <circle cx="32" cy="52" r="3" fill="#E74C3C" opacity="0.5"/>
      <text x="12" y="60" font-size="4" fill="currentColor" stroke="none">Efflux Pump</text>
    </svg>`
  },
  {
    id: 'micro-biofilm',
    name: 'Biofilm Structure',
    domain: 'biology',
    category: 'resistance',
    tags: ['biofilm', 'matrix', 'EPS', 'community', 'resistance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="48" width="56" height="8" fill="#8B7355" opacity="0.5"/>
      <rect x="4" y="48" width="56" height="8"/>
      <path d="M8 48c0-8 8-8 8-16s8-8 8-16" fill="#90CAF9" opacity="0.3"/>
      <path d="M24 48c0-12 8-12 8-20s8-8 8-12" fill="#90CAF9" opacity="0.3"/>
      <path d="M44 48c0-8 4-8 4-12s4-4 4-8" fill="#90CAF9" opacity="0.3"/>
      <circle cx="16" cy="36" r="3" fill="#27AE60"/>
      <circle cx="24" cy="28" r="3" fill="#27AE60"/>
      <circle cx="32" cy="32" r="3" fill="#27AE60"/>
      <circle cx="40" cy="24" r="3" fill="#27AE60"/>
      <circle cx="48" cy="36" r="3" fill="#27AE60"/>
      <circle cx="20" cy="42" r="2" fill="#27AE60"/>
      <circle cx="36" cy="40" r="2" fill="#27AE60"/>
    </svg>`
  },
  {
    id: 'micro-plasmid-resistance',
    name: 'Resistance Plasmid',
    domain: 'biology',
    category: 'resistance',
    tags: ['plasmid', 'resistance gene', 'horizontal transfer', 'R-plasmid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#3498DB" opacity="0.2"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12" stroke-dasharray="4 2"/>
      <rect x="26" y="18" width="12" height="4" rx="1" fill="#E74C3C"/>
      <rect x="40" y="28" width="4" height="10" rx="1" fill="#27AE60"/>
      <rect x="26" y="42" width="10" height="4" rx="1" fill="#F39C12"/>
      <rect x="18" y="30" width="4" height="8" rx="1" fill="#9B59B6"/>
      <text x="10" y="60" font-size="4" fill="currentColor" stroke="none">R-Plasmid</text>
    </svg>`
  },

  // ===========================================================================
  // STERILIZATION & DISINFECTION
  // ===========================================================================
  {
    id: 'micro-uv-sterilization',
    name: 'UV Sterilization',
    domain: 'biology',
    category: 'sterilization',
    tags: ['UV', 'sterilization', 'ultraviolet', 'disinfection', 'germicidal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="8" rx="2" fill="#9B59B6" opacity="0.5"/>
      <rect x="16" y="8" width="32" height="8" rx="2"/>
      <path d="M24 16l-4 32" stroke="#9B59B6" stroke-dasharray="2 2"/>
      <path d="M32 16v32" stroke="#9B59B6" stroke-dasharray="2 2"/>
      <path d="M40 16l4 32" stroke="#9B59B6" stroke-dasharray="2 2"/>
      <circle cx="20" cy="52" r="3" fill="#E74C3C" opacity="0.3"/>
      <path d="M18 50l4 4M22 50l-4 4" stroke="#E74C3C"/>
      <circle cx="32" cy="52" r="3" fill="#E74C3C" opacity="0.3"/>
      <path d="M30 50l4 4M34 50l-4 4" stroke="#E74C3C"/>
      <circle cx="44" cy="52" r="3" fill="#E74C3C" opacity="0.3"/>
      <path d="M42 50l4 4M46 50l-4 4" stroke="#E74C3C"/>
    </svg>`
  },
  {
    id: 'micro-filtration',
    name: 'Membrane Filtration',
    domain: 'biology',
    category: 'sterilization',
    tags: ['filtration', 'membrane', '0.22um', 'sterile', 'filter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8v20h32V8"/>
      <line x1="16" y1="28" x2="48" y2="28" stroke-width="2"/>
      <circle cx="20" cy="18" r="2" fill="#E74C3C"/>
      <circle cx="28" cy="14" r="2" fill="#E74C3C"/>
      <circle cx="36" cy="20" r="2" fill="#E74C3C"/>
      <circle cx="44" cy="16" r="2" fill="#E74C3C"/>
      <path d="M16 28v28h32V28"/>
      <path d="M24 36v12" stroke="#3498DB"/>
      <path d="M32 34v16" stroke="#3498DB"/>
      <path d="M40 38v10" stroke="#3498DB"/>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">0.22um filter</text>
    </svg>`
  },
  {
    id: 'micro-chemical-disinfectant',
    name: 'Chemical Disinfectant',
    domain: 'biology',
    category: 'sterilization',
    tags: ['disinfectant', 'chemical', 'bleach', 'ethanol', 'antiseptic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v12l8 8v24c0 4-4 8-16 8s-16-4-16-8V28l8-8V8z"/>
      <path d="M24 8h16" stroke-width="2"/>
      <rect x="20" y="32" width="24" height="20" fill="#27AE60" opacity="0.3"/>
      <path d="M28 36l4 4 8-8" stroke="#27AE60" stroke-width="2"/>
      <circle cx="44" cy="20" r="3" fill="#E74C3C" opacity="0.3"/>
      <path d="M42 18l4 4M46 18l-4 4" stroke="#E74C3C"/>
    </svg>`
  },

  // ===========================================================================
  // IMMUNOLOGY
  // ===========================================================================
  {
    id: 'micro-antibody',
    name: 'Antibody (IgG)',
    domain: 'biology',
    category: 'immunology',
    tags: ['antibody', 'immunoglobulin', 'IgG', 'immune', 'Y-shaped'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 56v-24"/>
      <path d="M32 32l-16-16"/>
      <path d="M32 32l16-16"/>
      <circle cx="16" cy="16" r="8" fill="#3498DB" opacity="0.4"/>
      <circle cx="16" cy="16" r="8"/>
      <circle cx="48" cy="16" r="8" fill="#3498DB" opacity="0.4"/>
      <circle cx="48" cy="16" r="8"/>
      <path d="M12 12l8 8"/>
      <path d="M44 12l8 8"/>
      <circle cx="32" cy="56" r="4" fill="#9B59B6" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'micro-antigen',
    name: 'Antigen',
    domain: 'biology',
    category: 'immunology',
    tags: ['antigen', 'epitope', 'immunogen', 'foreign', 'recognition'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#E74C3C" opacity="0.3"/>
      <circle cx="32" cy="32" r="20"/>
      <path d="M32 12l-4-6h8z" fill="#F39C12"/>
      <path d="M12 32l-6-4v8z" fill="#F39C12"/>
      <path d="M52 32l6-4v8z" fill="#F39C12"/>
      <path d="M32 52l-4 6h8z" fill="#F39C12"/>
      <path d="M18 18l-4-4h8z" fill="#F39C12"/>
      <path d="M46 18l4-4h-8z" fill="#F39C12"/>
      <text x="18" y="36" font-size="5" fill="currentColor" stroke="none">Epitopes</text>
    </svg>`
  },
  {
    id: 'micro-complement',
    name: 'Complement System',
    domain: 'biology',
    category: 'immunology',
    tags: ['complement', 'MAC', 'innate immunity', 'opsonization', 'lysis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#E74C3C" opacity="0.2"/>
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="8" fill="#9B59B6" opacity="0.3"/>
      <path d="M24 16c-4 4-8 8-8 16"/>
      <path d="M40 16c4 4 8 8 8 16"/>
      <path d="M24 48c-4-4-8-8-8-16"/>
      <path d="M40 48c4-4 8-8 8-16"/>
      <circle cx="16" cy="16" r="3" fill="#3498DB"/>
      <circle cx="48" cy="16" r="3" fill="#3498DB"/>
      <circle cx="16" cy="48" r="3" fill="#3498DB"/>
      <circle cx="48" cy="48" r="3" fill="#3498DB"/>
      <text x="18" y="60" font-size="4" fill="currentColor" stroke="none">MAC</text>
    </svg>`
  },
  {
    id: 'micro-phagocytosis',
    name: 'Phagocytosis',
    domain: 'biology',
    category: 'immunology',
    tags: ['phagocytosis', 'macrophage', 'neutrophil', 'engulf', 'innate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-12 12-20 24-20s20 8 20 20-8 20-20 20-24-8-24-20z" fill="#3498DB" opacity="0.3"/>
      <path d="M12 32c0-12 12-20 24-20s20 8 20 20-8 20-20 20-24-8-24-20z"/>
      <circle cx="32" cy="28" r="10" fill="#9B59B6" opacity="0.5"/>
      <path d="M12 32c4-8 12-8 12-4"/>
      <circle cx="24" cy="24" r="2" fill="#E74C3C"/>
      <circle cx="40" cy="28" r="2" fill="#E74C3C"/>
      <circle cx="32" cy="36" r="2" fill="#E74C3C"/>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Phagocytosis</text>
    </svg>`
  },
  {
    id: 'micro-vaccine',
    name: 'Vaccine Vial',
    domain: 'biology',
    category: 'immunology',
    tags: ['vaccine', 'immunization', 'vial', 'injection', 'prevention'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 4h16v8l4 4v36c0 4-4 8-12 8s-12-4-12-8V16l4-4V4z"/>
      <path d="M24 4h16" stroke-width="2"/>
      <path d="M24 12h16"/>
      <rect x="20" y="24" width="24" height="28" fill="#27AE60" opacity="0.3"/>
      <circle cx="32" cy="38" r="6" fill="#27AE60" opacity="0.5"/>
      <path d="M29 38l3 3 6-6" stroke="#fff" stroke-width="2"/>
      <text x="20" y="62" font-size="5" fill="currentColor" stroke="none">Vaccine</text>
    </svg>`
  },

  // ===========================================================================
  // CELL CULTURE
  // ===========================================================================
  {
    id: 'micro-cell-culture-flask',
    name: 'Cell Culture Flask',
    domain: 'biology',
    category: 'cell-culture',
    tags: ['cell culture', 'flask', 'T75', 'adherent', 'tissue culture'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 4h32l4 8v44c0 4-4 4-8 4H20c-4 0-8 0-8-4V12l4-8z"/>
      <path d="M16 4h32" stroke-width="2"/>
      <rect x="12" y="36" width="40" height="16" fill="#FFCDD2" opacity="0.5"/>
      <line x1="16" y1="40" x2="48" y2="40" stroke-dasharray="2 2"/>
      <line x1="16" y1="44" x2="48" y2="44" stroke-dasharray="2 2"/>
      <line x1="16" y1="48" x2="48" y2="48" stroke-dasharray="2 2"/>
      <text x="20" y="30" font-size="5" fill="currentColor" stroke="none">T75</text>
    </svg>`
  },
  {
    id: 'micro-centrifuge',
    name: 'Centrifuge',
    domain: 'biology',
    category: 'cell-culture',
    tags: ['centrifuge', 'spin', 'separation', 'pellet', 'supernatant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="16" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="4" fill="#333"/>
      <path d="M32 16l-4-8h8z" fill="#3498DB"/>
      <path d="M32 48l-4 8h8z" fill="#3498DB"/>
      <path d="M16 32l-8-4v8z" fill="#3498DB"/>
      <path d="M48 32l8-4v8z" fill="#3498DB"/>
      <path d="M20 20l-4-4 4-4" fill="#3498DB"/>
      <path d="M44 44l4 4-4 4" fill="#3498DB"/>
    </svg>`
  },
  {
    id: 'micro-hemocytometer',
    name: 'Hemocytometer',
    domain: 'biology',
    category: 'cell-culture',
    tags: ['hemocytometer', 'cell counting', 'Neubauer', 'counting chamber'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="56" height="24" rx="2"/>
      <rect x="20" y="24" width="24" height="16" fill="#90CAF9" opacity="0.3"/>
      <line x1="24" y1="24" x2="24" y2="40"/>
      <line x1="32" y1="24" x2="32" y2="40"/>
      <line x1="40" y1="24" x2="40" y2="40"/>
      <line x1="20" y1="28" x2="44" y2="28"/>
      <line x1="20" y1="32" x2="44" y2="32"/>
      <line x1="20" y1="36" x2="44" y2="36"/>
      <circle cx="26" cy="30" r="1" fill="#E74C3C"/>
      <circle cx="34" cy="34" r="1" fill="#E74C3C"/>
      <circle cx="38" cy="30" r="1" fill="#E74C3C"/>
    </svg>`
  },

  // ===========================================================================
  // QUORUM SENSING & BIOFILM
  // ===========================================================================
  {
    id: 'micro-quorum-sensing',
    name: 'Quorum Sensing',
    domain: 'biology',
    category: 'signaling',
    tags: ['quorum sensing', 'autoinducer', 'cell-cell communication', 'AHL'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="10" fill="#27AE60" opacity="0.4"/>
      <circle cx="20" cy="32" r="10"/>
      <circle cx="44" cy="32" r="10" fill="#27AE60" opacity="0.4"/>
      <circle cx="44" cy="32" r="10"/>
      <circle cx="28" cy="28" r="2" fill="#F39C12"/>
      <circle cx="32" cy="32" r="2" fill="#F39C12"/>
      <circle cx="36" cy="28" r="2" fill="#F39C12"/>
      <circle cx="30" cy="36" r="2" fill="#F39C12"/>
      <circle cx="34" cy="36" r="2" fill="#F39C12"/>
      <path d="M24 24c4-8 12-8 16 0" stroke-dasharray="2 2"/>
      <path d="M24 40c4 8 12 8 16 0" stroke-dasharray="2 2"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Quorum Sensing</text>
    </svg>`
  },
  {
    id: 'micro-sporulation',
    name: 'Bacterial Sporulation',
    domain: 'biology',
    category: 'bacteria',
    tags: ['sporulation', 'endospore', 'dormant', 'survival', 'germination'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="32" rx="10" ry="6" fill="#9B59B6" opacity="0.4"/>
      <ellipse cx="16" cy="32" rx="10" ry="6"/>
      <text x="6" y="44" font-size="3" fill="currentColor" stroke="none">Vegetative</text>
      <path d="M28 32l6 0"/>
      <path d="M32 28l4 4-4 4"/>
      <ellipse cx="48" cy="32" rx="10" ry="6" fill="#9B59B6" opacity="0.4"/>
      <ellipse cx="48" cy="32" rx="10" ry="6"/>
      <ellipse cx="48" cy="32" rx="4" ry="3" fill="#27AE60"/>
      <text x="42" y="44" font-size="3" fill="currentColor" stroke="none">Spore</text>
    </svg>`
  },
  {
    id: 'micro-horizontal-transfer',
    name: 'Horizontal Gene Transfer',
    domain: 'biology',
    category: 'bacteria',
    tags: ['horizontal transfer', 'conjugation', 'transformation', 'transduction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="24" rx="10" ry="8" fill="#27AE60" opacity="0.4"/>
      <ellipse cx="16" cy="24" rx="10" ry="8"/>
      <circle cx="16" cy="24" r="3" fill="#E74C3C"/>
      <ellipse cx="48" cy="24" rx="10" ry="8" fill="#3498DB" opacity="0.4"/>
      <ellipse cx="48" cy="24" rx="10" ry="8"/>
      <path d="M26 24h12"/>
      <path d="M34 20l4 4-4 4"/>
      <circle cx="48" cy="24" r="3" fill="#E74C3C" opacity="0.5"/>
      <ellipse cx="16" cy="48" rx="10" ry="8" fill="#27AE60" opacity="0.4"/>
      <ellipse cx="16" cy="48" rx="10" ry="8"/>
      <ellipse cx="48" cy="48" rx="10" ry="8" fill="#3498DB" opacity="0.4"/>
      <ellipse cx="48" cy="48" rx="10" ry="8"/>
      <circle cx="48" cy="48" r="3" fill="#E74C3C"/>
      <text x="18" y="60" font-size="3" fill="currentColor" stroke="none">Conjugation</text>
    </svg>`
  },
];

export default microbiologyIcons;
