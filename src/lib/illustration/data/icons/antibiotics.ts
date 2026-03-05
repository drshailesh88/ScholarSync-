/**
 * Antibiotics Icon Library
 * Comprehensive SVG icons for antibiotic drug classes
 *
 * Categories:
 * - Penicillins (beta-lactams)
 * - Cephalosporins (generations 1-4)
 * - Macrolides
 * - Quinolones/Fluoroquinolones
 * - Aminoglycosides
 * - Tetracyclines
 * - Sulfonamides
 * - Glycopeptides
 */

import type { IconDefinition } from './index';

export const antibioticsIcons: IconDefinition[] = [
  // ===========================================================================
  // PENICILLINS (BETA-LACTAMS)
  // ===========================================================================
  {
    id: 'abx-penicillin-core',
    name: 'Penicillin Core Structure',
    domain: 'medicine',
    category: 'antibiotics-penicillins',
    tags: ['penicillin', 'beta-lactam', 'ring', 'amoxicillin', 'ampicillin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 32l8-12h8l8 12-8 12h-8z" fill="currentColor" opacity="0.2"/>
      <path d="M20 32l8-12h8l8 12-8 12h-8z"/>
      <circle cx="32" cy="24" r="6" fill="#FFD700" opacity="0.5"/>
      <path d="M28 24l4 4 4-4"/>
      <text x="22" y="50" font-size="5" fill="currentColor" stroke="none">Beta-lactam</text>
      <path d="M12 28h6"/>
      <path d="M46 28h6"/>
    </svg>`
  },
  {
    id: 'abx-amoxicillin',
    name: 'Amoxicillin',
    domain: 'medicine',
    category: 'antibiotics-penicillins',
    tags: ['amoxicillin', 'penicillin', 'augmentin', 'oral', 'broad-spectrum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="16" ry="12" fill="#FF6B6B" opacity="0.3"/>
      <ellipse cx="32" cy="28" rx="16" ry="12"/>
      <path d="M24 28c0-4 4-8 8-8s8 4 8 8"/>
      <rect x="26" y="40" width="12" height="16" rx="2" fill="#FF6B6B" opacity="0.5"/>
      <line x1="32" y1="44" x2="32" y2="52"/>
      <text x="10" y="60" font-size="4" fill="currentColor" stroke="none">Amoxicillin</text>
    </svg>`
  },
  {
    id: 'abx-ampicillin',
    name: 'Ampicillin',
    domain: 'medicine',
    category: 'antibiotics-penicillins',
    tags: ['ampicillin', 'penicillin', 'IV', 'meningitis', 'listeria'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="4" fill="#4ECDC4" opacity="0.3"/>
      <rect x="16" y="16" width="32" height="32" rx="4"/>
      <path d="M24 32h16"/>
      <path d="M32 24v16"/>
      <circle cx="32" cy="32" r="6" fill="#4ECDC4" opacity="0.5"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Ampicillin</text>
    </svg>`
  },
  {
    id: 'abx-piperacillin',
    name: 'Piperacillin-Tazobactam',
    domain: 'medicine',
    category: 'antibiotics-penicillins',
    tags: ['piperacillin', 'tazobactam', 'zosyn', 'pseudomonas', 'broad-spectrum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="18" height="24" rx="3" fill="#9B59B6" opacity="0.3"/>
      <rect x="34" y="20" width="18" height="24" rx="3" fill="#3498DB" opacity="0.3"/>
      <rect x="12" y="20" width="18" height="24" rx="3"/>
      <rect x="34" y="20" width="18" height="24" rx="3"/>
      <path d="M30 32h4"/>
      <text x="14" y="34" font-size="4" fill="currentColor" stroke="none">PIP</text>
      <text x="36" y="34" font-size="4" fill="currentColor" stroke="none">TAZ</text>
      <text x="18" y="56" font-size="4" fill="currentColor" stroke="none">Zosyn</text>
    </svg>`
  },
  {
    id: 'abx-nafcillin',
    name: 'Nafcillin',
    domain: 'medicine',
    category: 'antibiotics-penicillins',
    tags: ['nafcillin', 'antistaphylococcal', 'MSSA', 'penicillinase-resistant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 20l16-8 16 8v24l-16 8-16-8z" fill="#E74C3C" opacity="0.2"/>
      <path d="M16 20l16-8 16 8v24l-16 8-16-8z"/>
      <path d="M32 12v40"/>
      <circle cx="32" cy="32" r="8" fill="#E74C3C" opacity="0.4"/>
      <text x="24" y="34" font-size="5" fill="currentColor" stroke="none">Na</text>
    </svg>`
  },

  // ===========================================================================
  // CEPHALOSPORINS
  // ===========================================================================
  {
    id: 'abx-cephalosporin-gen1',
    name: 'First Generation Cephalosporin',
    domain: 'medicine',
    category: 'antibiotics-cephalosporins',
    tags: ['cefazolin', 'cephalexin', 'first generation', 'gram positive', 'keflex'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#2ECC71" opacity="0.2"/>
      <circle cx="32" cy="32" r="20"/>
      <text x="24" y="36" font-size="12" fill="currentColor" stroke="none">1G</text>
      <path d="M32 12v6"/>
      <path d="M32 46v6"/>
      <path d="M12 32h6"/>
      <path d="M46 32h6"/>
    </svg>`
  },
  {
    id: 'abx-cephalosporin-gen2',
    name: 'Second Generation Cephalosporin',
    domain: 'medicine',
    category: 'antibiotics-cephalosporins',
    tags: ['cefuroxime', 'cefoxitin', 'second generation', 'anaerobes'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#3498DB" opacity="0.2"/>
      <circle cx="32" cy="32" r="20"/>
      <text x="24" y="36" font-size="12" fill="currentColor" stroke="none">2G</text>
      <path d="M20 20l24 24"/>
      <path d="M44 20l-24 24"/>
    </svg>`
  },
  {
    id: 'abx-cephalosporin-gen3',
    name: 'Third Generation Cephalosporin',
    domain: 'medicine',
    category: 'antibiotics-cephalosporins',
    tags: ['ceftriaxone', 'cefotaxime', 'ceftazidime', 'third generation', 'meningitis', 'gram negative'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#9B59B6" opacity="0.2"/>
      <circle cx="32" cy="32" r="20"/>
      <text x="24" y="36" font-size="12" fill="currentColor" stroke="none">3G</text>
      <path d="M32 12c10 10 10 30 0 40"/>
      <path d="M32 12c-10 10-10 30 0 40"/>
    </svg>`
  },
  {
    id: 'abx-cephalosporin-gen4',
    name: 'Fourth Generation Cephalosporin',
    domain: 'medicine',
    category: 'antibiotics-cephalosporins',
    tags: ['cefepime', 'fourth generation', 'pseudomonas', 'broad-spectrum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#E74C3C" opacity="0.2"/>
      <circle cx="32" cy="32" r="20"/>
      <text x="24" y="36" font-size="12" fill="currentColor" stroke="none">4G</text>
      <circle cx="32" cy="32" r="10"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'abx-ceftriaxone',
    name: 'Ceftriaxone',
    domain: 'medicine',
    category: 'antibiotics-cephalosporins',
    tags: ['ceftriaxone', 'rocephin', 'meningitis', 'gonorrhea', 'once daily'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l20 12v24l-20 12-20-12V20z" fill="#F39C12" opacity="0.3"/>
      <path d="M32 8l20 12v24l-20 12-20-12V20z"/>
      <circle cx="32" cy="32" r="8" fill="#F39C12" opacity="0.5"/>
      <text x="24" y="36" font-size="6" fill="currentColor" stroke="none">CTX</text>
    </svg>`
  },

  // ===========================================================================
  // MACROLIDES
  // ===========================================================================
  {
    id: 'abx-azithromycin',
    name: 'Azithromycin',
    domain: 'medicine',
    category: 'antibiotics-macrolides',
    tags: ['azithromycin', 'zithromax', 'zpak', 'atypical', 'macrolide'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-11 9-20 20-20s20 9 20 20-9 20-20 20" fill="#1ABC9C" opacity="0.2"/>
      <path d="M12 32c0-11 9-20 20-20s20 9 20 20-9 20-20 20"/>
      <path d="M32 52v6"/>
      <circle cx="32" cy="32" r="8" fill="#1ABC9C" opacity="0.4"/>
      <text x="26" y="36" font-size="6" fill="currentColor" stroke="none">AZ</text>
      <text x="18" y="60" font-size="4" fill="currentColor" stroke="none">Z-Pack</text>
    </svg>`
  },
  {
    id: 'abx-erythromycin',
    name: 'Erythromycin',
    domain: 'medicine',
    category: 'antibiotics-macrolides',
    tags: ['erythromycin', 'macrolide', 'penicillin allergy', 'prokinetic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="#E91E63" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <path d="M20 32h24"/>
      <path d="M32 20v24"/>
      <text x="22" y="56" font-size="4" fill="currentColor" stroke="none">Erythro</text>
    </svg>`
  },
  {
    id: 'abx-clarithromycin',
    name: 'Clarithromycin',
    domain: 'medicine',
    category: 'antibiotics-macrolides',
    tags: ['clarithromycin', 'biaxin', 'H pylori', 'macrolide', 'respiratory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16h32v32h-32z" fill="#FF9800" opacity="0.2"/>
      <path d="M16 16h32v32h-32z"/>
      <circle cx="32" cy="32" r="10" fill="#FF9800" opacity="0.4"/>
      <text x="24" y="36" font-size="6" fill="currentColor" stroke="none">CL</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Biaxin</text>
    </svg>`
  },

  // ===========================================================================
  // QUINOLONES/FLUOROQUINOLONES
  // ===========================================================================
  {
    id: 'abx-ciprofloxacin',
    name: 'Ciprofloxacin',
    domain: 'medicine',
    category: 'antibiotics-quinolones',
    tags: ['ciprofloxacin', 'cipro', 'fluoroquinolone', 'UTI', 'anthrax'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32l12-20h24l12 20-12 20H20z" fill="#00BCD4" opacity="0.2"/>
      <path d="M8 32l12-20h24l12 20-12 20H20z"/>
      <circle cx="32" cy="32" r="8" fill="#00BCD4" opacity="0.5"/>
      <text x="22" y="36" font-size="5" fill="currentColor" stroke="none">CIP</text>
    </svg>`
  },
  {
    id: 'abx-levofloxacin',
    name: 'Levofloxacin',
    domain: 'medicine',
    category: 'antibiotics-quinolones',
    tags: ['levofloxacin', 'levaquin', 'fluoroquinolone', 'respiratory', 'pneumonia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l22 14v20l-22 14-22-14V22z" fill="#673AB7" opacity="0.2"/>
      <path d="M32 8l22 14v20l-22 14-22-14V22z"/>
      <path d="M32 22v20"/>
      <path d="M22 32h20"/>
      <text x="22" y="58" font-size="4" fill="currentColor" stroke="none">Levaquin</text>
    </svg>`
  },
  {
    id: 'abx-moxifloxacin',
    name: 'Moxifloxacin',
    domain: 'medicine',
    category: 'antibiotics-quinolones',
    tags: ['moxifloxacin', 'avelox', 'fluoroquinolone', 'respiratory', 'anaerobes'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22" fill="#795548" opacity="0.2"/>
      <circle cx="32" cy="32" r="22"/>
      <path d="M20 32l8-8 8 8-8 8z" fill="#795548" opacity="0.4"/>
      <text x="22" y="54" font-size="4" fill="currentColor" stroke="none">Avelox</text>
    </svg>`
  },

  // ===========================================================================
  // AMINOGLYCOSIDES
  // ===========================================================================
  {
    id: 'abx-gentamicin',
    name: 'Gentamicin',
    domain: 'medicine',
    category: 'antibiotics-aminoglycosides',
    tags: ['gentamicin', 'aminoglycoside', 'gram negative', 'synergy', 'nephrotoxic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="8" fill="#607D8B" opacity="0.2"/>
      <rect x="12" y="12" width="40" height="40" rx="8"/>
      <circle cx="24" cy="24" r="4" fill="#607D8B"/>
      <circle cx="40" cy="24" r="4" fill="#607D8B"/>
      <circle cx="32" cy="40" r="4" fill="#607D8B"/>
      <path d="M24 24l8 16"/>
      <path d="M40 24l-8 16"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Gentamicin</text>
    </svg>`
  },
  {
    id: 'abx-tobramycin',
    name: 'Tobramycin',
    domain: 'medicine',
    category: 'antibiotics-aminoglycosides',
    tags: ['tobramycin', 'aminoglycoside', 'pseudomonas', 'CF', 'inhaled'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="22" ry="18" fill="#009688" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="22" ry="18"/>
      <circle cx="22" cy="28" r="4" fill="#009688"/>
      <circle cx="42" cy="28" r="4" fill="#009688"/>
      <circle cx="32" cy="38" r="4" fill="#009688"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Tobramycin</text>
    </svg>`
  },
  {
    id: 'abx-amikacin',
    name: 'Amikacin',
    domain: 'medicine',
    category: 'antibiotics-aminoglycosides',
    tags: ['amikacin', 'aminoglycoside', 'resistant organisms', 'TB'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l20 14v20l-20 14-20-14V22z" fill="#FF5722" opacity="0.2"/>
      <path d="M32 8l20 14v20l-20 14-20-14V22z"/>
      <circle cx="32" cy="22" r="4" fill="#FF5722"/>
      <circle cx="22" cy="38" r="4" fill="#FF5722"/>
      <circle cx="42" cy="38" r="4" fill="#FF5722"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Amikacin</text>
    </svg>`
  },

  // ===========================================================================
  // OTHER ANTIBIOTICS
  // ===========================================================================
  {
    id: 'abx-vancomycin',
    name: 'Vancomycin',
    domain: 'medicine',
    category: 'antibiotics-glycopeptides',
    tags: ['vancomycin', 'glycopeptide', 'MRSA', 'C diff', 'trough level'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 12h32v40H16z" fill="#E91E63" opacity="0.2"/>
      <path d="M16 12h32v40H16z"/>
      <path d="M24 20h16v8H24z" fill="#E91E63" opacity="0.4"/>
      <path d="M24 36h16v8H24z" fill="#E91E63" opacity="0.4"/>
      <text x="26" y="28" font-size="5" fill="currentColor" stroke="none">V</text>
      <text x="26" y="44" font-size="5" fill="currentColor" stroke="none">V</text>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">Vancomycin</text>
    </svg>`
  },
  {
    id: 'abx-doxycycline',
    name: 'Doxycycline',
    domain: 'medicine',
    category: 'antibiotics-tetracyclines',
    tags: ['doxycycline', 'tetracycline', 'atypical', 'tick-borne', 'acne'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="4" fill="#FFC107" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="4"/>
      <line x1="22" y1="26" x2="42" y2="26"/>
      <line x1="22" y1="32" x2="42" y2="32"/>
      <line x1="22" y1="38" x2="42" y2="38"/>
      <text x="18" y="56" font-size="4" fill="currentColor" stroke="none">Doxycycline</text>
    </svg>`
  },
  {
    id: 'abx-metronidazole',
    name: 'Metronidazole',
    domain: 'medicine',
    category: 'antibiotics-nitroimidazoles',
    tags: ['metronidazole', 'flagyl', 'anaerobes', 'C diff', 'trichomoniasis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#9C27B0" opacity="0.2"/>
      <circle cx="32" cy="32" r="20"/>
      <path d="M24 24l16 16"/>
      <path d="M40 24l-16 16"/>
      <circle cx="32" cy="32" r="6" fill="#9C27B0" opacity="0.5"/>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Flagyl</text>
    </svg>`
  },
  {
    id: 'abx-trimethoprim-sulfa',
    name: 'TMP-SMX (Bactrim)',
    domain: 'medicine',
    category: 'antibiotics-sulfonamides',
    tags: ['bactrim', 'TMP-SMX', 'sulfa', 'UTI', 'PCP prophylaxis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="10" y="22" width="20" height="20" rx="3" fill="#4CAF50" opacity="0.3"/>
      <rect x="34" y="22" width="20" height="20" rx="3" fill="#2196F3" opacity="0.3"/>
      <rect x="10" y="22" width="20" height="20" rx="3"/>
      <rect x="34" y="22" width="20" height="20" rx="3"/>
      <text x="13" y="36" font-size="5" fill="currentColor" stroke="none">TMP</text>
      <text x="37" y="36" font-size="5" fill="currentColor" stroke="none">SMX</text>
      <text x="18" y="56" font-size="4" fill="currentColor" stroke="none">Bactrim</text>
    </svg>`
  },
  {
    id: 'abx-linezolid',
    name: 'Linezolid',
    domain: 'medicine',
    category: 'antibiotics-oxazolidinones',
    tags: ['linezolid', 'zyvox', 'MRSA', 'VRE', 'oxazolidinone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 10l20 11v22l-20 11-20-11V21z" fill="#3F51B5" opacity="0.2"/>
      <path d="M32 10l20 11v22l-20 11-20-11V21z"/>
      <circle cx="32" cy="32" r="10" fill="#3F51B5" opacity="0.4"/>
      <text x="26" y="36" font-size="6" fill="currentColor" stroke="none">LZ</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Zyvox</text>
    </svg>`
  },
  {
    id: 'abx-daptomycin',
    name: 'Daptomycin',
    domain: 'medicine',
    category: 'antibiotics-lipopeptides',
    tags: ['daptomycin', 'cubicin', 'MRSA', 'VRE', 'bacteremia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22" fill="#F44336" opacity="0.2"/>
      <circle cx="32" cy="32" r="22"/>
      <circle cx="32" cy="32" r="14" fill="#F44336" opacity="0.3"/>
      <circle cx="32" cy="32" r="6" fill="#F44336" opacity="0.5"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Daptomycin</text>
    </svg>`
  },
];

export default antibioticsIcons;
