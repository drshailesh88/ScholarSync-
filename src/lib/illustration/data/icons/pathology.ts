/**
 * Pathology Icon Library
 * Comprehensive SVG icons for pathology and laboratory medicine
 *
 * Categories:
 * - Microscopy (equipment and techniques)
 * - Cell Pathology (cellular changes and adaptations)
 * - Inflammation (acute, chronic, healing)
 * - Neoplasia (tumor classification and features)
 * - Hematopathology (blood and bone marrow)
 * - Organ Pathology (specific organ diseases)
 * - Lab/Equipment (laboratory tools and processing)
 */

import type { IconDefinition } from './index';

export const pathologyIcons: IconDefinition[] = [
  // ===========================================================================
  // MICROSCOPY
  // ===========================================================================
  {
    id: 'path-microscope',
    name: 'Light Microscope',
    domain: 'medicine',
    category: 'microscopy',
    tags: ['microscope', 'light', 'optics', 'magnification', 'histology'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="8" ry="4"/>
      <path d="M32 16v8"/>
      <rect x="26" y="24" width="12" height="8" rx="1"/>
      <path d="M32 32v16"/>
      <rect x="20" y="44" width="24" height="4" rx="1"/>
      <path d="M16 56h32"/>
      <rect x="24" y="48" width="16" height="8" rx="1"/>
      <circle cx="32" cy="12" r="3" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'path-slide-glass',
    name: 'Glass Slide',
    domain: 'medicine',
    category: 'microscopy',
    tags: ['slide', 'glass', 'specimen', 'histology', 'microscopy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="16" rx="1"/>
      <rect x="22" y="28" width="20" height="8" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="30" width="16" height="4" fill="#E8B4B8" opacity="0.6"/>
      <line x1="12" y1="28" x2="12" y2="36"/>
      <text x="10" y="46" font-size="4" fill="currentColor" stroke="none">Label</text>
    </svg>`
  },
  {
    id: 'path-he-stain',
    name: 'H&E Staining',
    domain: 'medicine',
    category: 'microscopy',
    tags: ['H&E', 'hematoxylin', 'eosin', 'staining', 'routine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="24" rx="2"/>
      <circle cx="24" cy="32" r="6" fill="#4B0082" opacity="0.6"/>
      <circle cx="24" cy="32" r="3" fill="#4B0082"/>
      <ellipse cx="38" cy="32" rx="8" ry="6" fill="#FFB6C1" opacity="0.5"/>
      <text x="18" y="50" font-size="4" fill="#4B0082" stroke="none">Nuclei</text>
      <text x="34" y="50" font-size="4" fill="#DC143C" stroke="none">Cytoplasm</text>
    </svg>`
  },
  {
    id: 'path-ihc-stain',
    name: 'Immunohistochemistry',
    domain: 'medicine',
    category: 'microscopy',
    tags: ['IHC', 'immunohistochemistry', 'antibody', 'marker', 'DAB'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="24" rx="2"/>
      <circle cx="24" cy="32" r="4" fill="#8B4513"/>
      <circle cx="36" cy="28" r="3" fill="#8B4513"/>
      <circle cx="40" cy="36" r="4" fill="#8B4513"/>
      <circle cx="28" cy="36" r="2" fill="#8B4513"/>
      <path d="M16 16l4 4" stroke="#8B4513"/>
      <path d="M48 16l-4 4" stroke="#8B4513"/>
      <text x="20" y="52" font-size="4" fill="currentColor" stroke="none">DAB positive</text>
    </svg>`
  },
  {
    id: 'path-special-stain',
    name: 'Special Stains',
    domain: 'medicine',
    category: 'microscopy',
    tags: ['special stain', 'PAS', 'trichrome', 'silver', 'mucin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="16" height="12" rx="1"/>
      <rect x="8" y="16" width="16" height="12" fill="#FF00FF" opacity="0.3"/>
      <rect x="24" y="16" width="16" height="12" rx="1"/>
      <rect x="24" y="16" width="16" height="12" fill="#00BFFF" opacity="0.3"/>
      <rect x="40" y="16" width="16" height="12" rx="1"/>
      <rect x="40" y="16" width="16" height="12" fill="#228B22" opacity="0.3"/>
      <text x="10" y="38" font-size="4" fill="currentColor" stroke="none">PAS</text>
      <text x="24" y="38" font-size="4" fill="currentColor" stroke="none">Trichrome</text>
      <text x="44" y="38" font-size="4" fill="currentColor" stroke="none">GMS</text>
      <rect x="12" y="44" width="40" height="12" rx="2"/>
    </svg>`
  },
  {
    id: 'path-tissue-processing',
    name: 'Tissue Processing',
    domain: 'medicine',
    category: 'microscopy',
    tags: ['processing', 'fixation', 'embedding', 'paraffin', 'formalin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="28" width="12" height="20" rx="1"/>
      <rect x="8" y="32" width="12" height="16" fill="#FFD700" opacity="0.3"/>
      <path d="M20 38h8"/>
      <rect x="28" y="24" width="12" height="24" rx="1"/>
      <rect x="28" y="28" width="12" height="20" fill="#E0E0E0" opacity="0.5"/>
      <path d="M40 36h8"/>
      <rect x="48" y="32" width="8" height="16" rx="1"/>
      <rect x="48" y="32" width="8" height="16" fill="#D2B48C" opacity="0.4"/>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">Fix</text>
      <text x="28" y="56" font-size="3" fill="currentColor" stroke="none">Process</text>
      <text x="48" y="56" font-size="3" fill="currentColor" stroke="none">Embed</text>
    </svg>`
  },
  {
    id: 'path-frozen-section',
    name: 'Frozen Section',
    domain: 'medicine',
    category: 'microscopy',
    tags: ['frozen', 'cryostat', 'intraoperative', 'rapid', 'FS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="2"/>
      <rect x="20" y="24" width="24" height="16" rx="1" fill="#ADD8E6" opacity="0.5"/>
      <path d="M32 28v8"/>
      <path d="M28 32h8"/>
      <path d="M29 29l6 6"/>
      <path d="M35 29l-6 6"/>
      <circle cx="12" cy="32" r="4" fill="#87CEEB" opacity="0.4"/>
      <circle cx="52" cy="32" r="4" fill="#87CEEB" opacity="0.4"/>
      <text x="18" y="52" font-size="4" fill="currentColor" stroke="none">Cryostat</text>
    </svg>`
  },
  {
    id: 'path-coverslip',
    name: 'Coverslip',
    domain: 'medicine',
    category: 'microscopy',
    tags: ['coverslip', 'mounting', 'slide', 'preparation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="30" width="48" height="12" rx="1"/>
      <rect x="20" y="26" width="24" height="8" rx="1" fill="currentColor" opacity="0.1"/>
      <path d="M22 28h20"/>
      <path d="M22 32h20"/>
      <rect x="24" y="34" width="16" height="4" fill="#E8B4B8" opacity="0.4"/>
      <text x="8" y="50" font-size="4" fill="currentColor" stroke="none">Mounting medium</text>
    </svg>`
  },
  {
    id: 'path-oil-immersion',
    name: 'Oil Immersion Lens',
    domain: 'medicine',
    category: 'microscopy',
    tags: ['oil immersion', '100x', 'high power', 'resolution', 'objective'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="24" rx="2"/>
      <ellipse cx="32" cy="36" rx="10" ry="4" fill="#FFD700" opacity="0.4"/>
      <path d="M32 32v8"/>
      <rect x="12" y="44" width="40" height="8" rx="1"/>
      <ellipse cx="32" cy="40" rx="6" ry="2" fill="#FFD700" opacity="0.6"/>
      <text x="28" y="18" font-size="5" fill="currentColor" stroke="none">100x</text>
      <text x="24" y="58" font-size="4" fill="currentColor" stroke="none">Oil</text>
    </svg>`
  },
  {
    id: 'path-fluorescence',
    name: 'Fluorescence Microscopy',
    domain: 'medicine',
    category: 'microscopy',
    tags: ['fluorescence', 'IF', 'FISH', 'UV', 'emission'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="2" fill="#000033"/>
      <circle cx="26" cy="32" r="4" fill="#00FF00"/>
      <circle cx="38" cy="28" r="3" fill="#FF0000"/>
      <circle cx="36" cy="36" r="3" fill="#00FF00"/>
      <circle cx="28" cy="38" r="2" fill="#0000FF"/>
      <path d="M8 24l8 8"/>
      <path d="M8 32l8 0"/>
      <path d="M8 40l8-8"/>
      <text x="20" y="52" font-size="4" fill="#00FF00" stroke="none">FITC</text>
      <text x="36" y="52" font-size="4" fill="#FF0000" stroke="none">TRITC</text>
    </svg>`
  },

  // ===========================================================================
  // CELL PATHOLOGY
  // ===========================================================================
  {
    id: 'path-normal-cell',
    name: 'Normal Cell',
    domain: 'medicine',
    category: 'cell-pathology',
    tags: ['normal', 'cell', 'healthy', 'baseline', 'reference'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="#FFE4E1" opacity="0.5"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <ellipse cx="32" cy="32" rx="8" ry="6" fill="#4B0082" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="8" ry="6"/>
      <circle cx="34" cy="30" r="2" fill="#4B0082"/>
      <text x="20" y="56" font-size="4" fill="currentColor" stroke="none">Normal N:C ratio</text>
    </svg>`
  },
  {
    id: 'path-abnormal-cell',
    name: 'Abnormal Cell',
    domain: 'medicine',
    category: 'cell-pathology',
    tags: ['abnormal', 'cell', 'dysplastic', 'atypical', 'pathologic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-12 8-20 20-20s20 8 20 20-8 20-20 20-20-8-20-20z" fill="#FFE4E1" opacity="0.5"/>
      <path d="M12 32c0-12 8-20 20-20s20 8 20 20-8 20-20 20-20-8-20-20z"/>
      <ellipse cx="32" cy="30" rx="14" ry="12" fill="#4B0082" opacity="0.5"/>
      <ellipse cx="32" cy="30" rx="14" ry="12"/>
      <circle cx="28" cy="28" r="3" fill="#4B0082"/>
      <circle cx="36" cy="32" r="2" fill="#4B0082"/>
      <text x="10" y="58" font-size="4" fill="#DC143C" stroke="none">Increased N:C ratio</text>
    </svg>`
  },
  {
    id: 'path-coagulative-necrosis',
    name: 'Coagulative Necrosis',
    domain: 'medicine',
    category: 'cell-pathology',
    tags: ['coagulative', 'necrosis', 'ischemia', 'infarct', 'ghost cells'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="2" fill="#808080" opacity="0.3"/>
      <ellipse cx="24" cy="28" rx="6" ry="4" stroke-dasharray="2 2"/>
      <ellipse cx="40" cy="28" rx="6" ry="4" stroke-dasharray="2 2"/>
      <ellipse cx="24" cy="40" rx="6" ry="4" stroke-dasharray="2 2"/>
      <ellipse cx="40" cy="40" rx="6" ry="4" stroke-dasharray="2 2"/>
      <text x="12" y="56" font-size="4" fill="currentColor" stroke="none">Ghost cell outlines</text>
    </svg>`
  },
  {
    id: 'path-liquefactive-necrosis',
    name: 'Liquefactive Necrosis',
    domain: 'medicine',
    category: 'cell-pathology',
    tags: ['liquefactive', 'necrosis', 'abscess', 'CNS', 'enzymatic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <ellipse cx="32" cy="32" rx="16" ry="12" fill="#FFFF99" opacity="0.5"/>
      <path d="M20 28c4 2 8 4 12 4s8-2 12-4" stroke-dasharray="2 2"/>
      <path d="M20 36c4-2 8-4 12-4s8 2 12 4" stroke-dasharray="2 2"/>
      <text x="16" y="56" font-size="4" fill="currentColor" stroke="none">Liquefied center</text>
    </svg>`
  },
  {
    id: 'path-caseous-necrosis',
    name: 'Caseous Necrosis',
    domain: 'medicine',
    category: 'cell-pathology',
    tags: ['caseous', 'necrosis', 'TB', 'tuberculosis', 'granuloma', 'cheese-like'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="22" ry="18"/>
      <ellipse cx="32" cy="32" rx="14" ry="10" fill="#FFFACD" opacity="0.7"/>
      <ellipse cx="32" cy="32" rx="14" ry="10"/>
      <path d="M22 28c4 1 8 1 12 0" stroke="#DAA520"/>
      <path d="M24 34c4 1 8 1 12 0" stroke="#DAA520"/>
      <text x="12" y="56" font-size="4" fill="currentColor" stroke="none">Cheese-like center</text>
    </svg>`
  },
  {
    id: 'path-apoptosis',
    name: 'Apoptosis',
    domain: 'medicine',
    category: 'cell-pathology',
    tags: ['apoptosis', 'programmed death', 'shrinkage', 'fragmentation', 'bodies'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="32" r="8" fill="#FFE4E1" opacity="0.5"/>
      <circle cx="16" cy="32" r="8"/>
      <circle cx="16" cy="32" r="3" fill="#4B0082"/>
      <path d="M26 32l6 0"/>
      <ellipse cx="40" cy="28" rx="5" ry="4" fill="#4B0082" opacity="0.6"/>
      <ellipse cx="48" cy="36" rx="4" ry="3" fill="#4B0082" opacity="0.6"/>
      <ellipse cx="38" cy="38" rx="3" ry="2" fill="#4B0082" opacity="0.6"/>
      <ellipse cx="46" cy="28" rx="3" ry="2" fill="#4B0082" opacity="0.6"/>
      <text x="8" y="52" font-size="4" fill="currentColor" stroke="none">Cell</text>
      <text x="32" y="52" font-size="4" fill="currentColor" stroke="none">Apoptotic bodies</text>
    </svg>`
  },
  {
    id: 'path-atrophy',
    name: 'Atrophy',
    domain: 'medicine',
    category: 'cell-pathology',
    tags: ['atrophy', 'shrinkage', 'decreased size', 'disuse', 'denervation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="32" rx="12" ry="10" fill="#FFE4E1" opacity="0.5"/>
      <ellipse cx="20" cy="32" rx="12" ry="10"/>
      <ellipse cx="20" cy="32" rx="4" ry="3" fill="#4B0082"/>
      <path d="M34 32l4 0"/>
      <ellipse cx="48" cy="32" rx="6" ry="5" fill="#FFE4E1" opacity="0.5"/>
      <ellipse cx="48" cy="32" rx="6" ry="5"/>
      <ellipse cx="48" cy="32" rx="2" ry="1.5" fill="#4B0082"/>
      <text x="12" y="52" font-size="4" fill="currentColor" stroke="none">Normal</text>
      <text x="40" y="52" font-size="4" fill="currentColor" stroke="none">Atrophic</text>
    </svg>`
  },
  {
    id: 'path-hypertrophy',
    name: 'Hypertrophy',
    domain: 'medicine',
    category: 'cell-pathology',
    tags: ['hypertrophy', 'increased size', 'enlargement', 'cell growth'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="18" cy="32" rx="8" ry="6" fill="#FFE4E1" opacity="0.5"/>
      <ellipse cx="18" cy="32" rx="8" ry="6"/>
      <ellipse cx="18" cy="32" rx="3" ry="2" fill="#4B0082"/>
      <path d="M28 32l4 0"/>
      <ellipse cx="44" cy="32" rx="14" ry="12" fill="#FFE4E1" opacity="0.5"/>
      <ellipse cx="44" cy="32" rx="14" ry="12"/>
      <ellipse cx="44" cy="32" rx="5" ry="4" fill="#4B0082"/>
      <text x="10" y="52" font-size="4" fill="currentColor" stroke="none">Normal</text>
      <text x="34" y="52" font-size="4" fill="currentColor" stroke="none">Hypertrophic</text>
    </svg>`
  },
  {
    id: 'path-hyperplasia',
    name: 'Hyperplasia',
    domain: 'medicine',
    category: 'cell-pathology',
    tags: ['hyperplasia', 'increased number', 'proliferation', 'cell division'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="20" height="24" rx="2"/>
      <ellipse cx="14" cy="28" rx="4" ry="3" fill="#FFE4E1"/>
      <ellipse cx="22" cy="36" rx="4" ry="3" fill="#FFE4E1"/>
      <path d="M30 32l4 0"/>
      <rect x="36" y="16" width="20" height="32" rx="2"/>
      <ellipse cx="42" cy="24" rx="3" ry="2" fill="#FFE4E1"/>
      <ellipse cx="50" cy="24" rx="3" ry="2" fill="#FFE4E1"/>
      <ellipse cx="42" cy="32" rx="3" ry="2" fill="#FFE4E1"/>
      <ellipse cx="50" cy="32" rx="3" ry="2" fill="#FFE4E1"/>
      <ellipse cx="42" cy="40" rx="3" ry="2" fill="#FFE4E1"/>
      <ellipse cx="50" cy="40" rx="3" ry="2" fill="#FFE4E1"/>
      <text x="8" y="52" font-size="3" fill="currentColor" stroke="none">Normal</text>
      <text x="36" y="56" font-size="3" fill="currentColor" stroke="none">Hyperplasia</text>
    </svg>`
  },
  {
    id: 'path-metaplasia',
    name: 'Metaplasia',
    domain: 'medicine',
    category: 'cell-pathology',
    tags: ['metaplasia', 'transformation', 'Barrett', 'squamous', 'adaptive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="20" height="24" rx="2"/>
      <rect x="10" y="22" width="16" height="4" fill="#E8B4B8"/>
      <rect x="10" y="28" width="16" height="4" fill="#E8B4B8"/>
      <rect x="10" y="34" width="16" height="4" fill="#E8B4B8"/>
      <path d="M30 32l4 0"/>
      <rect x="36" y="20" width="20" height="24" rx="2"/>
      <path d="M38 24h16v18h-16z" fill="#87CEEB" opacity="0.3"/>
      <ellipse cx="42" cy="30" rx="3" ry="4"/>
      <ellipse cx="50" cy="30" rx="3" ry="4"/>
      <text x="8" y="52" font-size="3" fill="currentColor" stroke="none">Columnar</text>
      <text x="36" y="52" font-size="3" fill="currentColor" stroke="none">Squamous</text>
    </svg>`
  },
  {
    id: 'path-dysplasia',
    name: 'Dysplasia',
    domain: 'medicine',
    category: 'cell-pathology',
    tags: ['dysplasia', 'disordered growth', 'premalignant', 'CIN', 'atypia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="2"/>
      <ellipse cx="20" cy="24" rx="4" ry="5" fill="#4B0082" opacity="0.5"/>
      <ellipse cx="32" cy="26" rx="6" ry="7" fill="#4B0082" opacity="0.6"/>
      <ellipse cx="44" cy="24" rx="5" ry="6" fill="#4B0082" opacity="0.5"/>
      <ellipse cx="26" cy="38" rx="5" ry="4" fill="#4B0082" opacity="0.4"/>
      <ellipse cx="40" cy="40" rx="4" ry="3" fill="#4B0082" opacity="0.4"/>
      <text x="12" y="56" font-size="4" fill="#DC143C" stroke="none">Loss of polarity</text>
    </svg>`
  },
  {
    id: 'path-fat-necrosis',
    name: 'Fat Necrosis',
    domain: 'medicine',
    category: 'cell-pathology',
    tags: ['fat necrosis', 'saponification', 'adipose', 'trauma', 'pancreatitis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="28" r="8" fill="#FFFACD" opacity="0.6"/>
      <circle cx="20" cy="28" r="8"/>
      <circle cx="38" cy="32" r="10" fill="#FFFACD" opacity="0.6"/>
      <circle cx="38" cy="32" r="10"/>
      <circle cx="24" cy="44" r="6" fill="#FFFACD" opacity="0.6"/>
      <circle cx="24" cy="44" r="6"/>
      <path d="M34 28c-2 2-2 6 0 8" stroke="#8B4513"/>
      <path d="M42 28c-2 2-2 6 0 8" stroke="#8B4513"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Saponification</text>
    </svg>`
  },

  // ===========================================================================
  // INFLAMMATION
  // ===========================================================================
  {
    id: 'path-acute-inflammation',
    name: 'Acute Inflammation',
    domain: 'medicine',
    category: 'inflammation',
    tags: ['acute', 'inflammation', 'neutrophils', 'PMN', 'exudate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2" fill="#FFB6C1" opacity="0.3"/>
      <circle cx="20" cy="28" r="4" fill="#4169E1"/>
      <circle cx="32" cy="32" r="4" fill="#4169E1"/>
      <circle cx="28" cy="40" r="4" fill="#4169E1"/>
      <circle cx="44" cy="30" r="4" fill="#4169E1"/>
      <circle cx="40" cy="38" r="4" fill="#4169E1"/>
      <path d="M18 26l4 4"/>
      <path d="M22 26l-4 4"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Neutrophil infiltrate</text>
    </svg>`
  },
  {
    id: 'path-neutrophil',
    name: 'Neutrophil',
    domain: 'medicine',
    category: 'inflammation',
    tags: ['neutrophil', 'PMN', 'polymorphonuclear', 'granulocyte', 'acute'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#E8B4B8" opacity="0.4"/>
      <circle cx="32" cy="32" r="16"/>
      <path d="M24 28c2-2 4-2 6 0s4 2 6 0 4-2 6 0" fill="#4B0082" opacity="0.6"/>
      <path d="M24 32c2-2 4-2 6 0s4 2 6 0 4-2 6 0" fill="#4B0082" opacity="0.6"/>
      <path d="M24 36c2-2 4-2 6 0s4 2 6 0" fill="#4B0082" opacity="0.6"/>
      <text x="12" y="56" font-size="4" fill="currentColor" stroke="none">Multilobed nucleus</text>
    </svg>`
  },
  {
    id: 'path-edema',
    name: 'Edema',
    domain: 'medicine',
    category: 'inflammation',
    tags: ['edema', 'swelling', 'fluid', 'exudate', 'transudate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="2"/>
      <ellipse cx="24" cy="28" rx="6" ry="4" stroke-dasharray="2 2"/>
      <ellipse cx="40" cy="32" rx="6" ry="4" stroke-dasharray="2 2"/>
      <path d="M20 36c0 4 4 8 8 8" fill="#87CEEB" opacity="0.3"/>
      <path d="M36 40c0 4 4 4 8 0" fill="#87CEEB" opacity="0.3"/>
      <circle cx="22" cy="40" r="2" fill="#87CEEB"/>
      <circle cx="28" cy="44" r="1" fill="#87CEEB"/>
      <circle cx="42" cy="40" r="2" fill="#87CEEB"/>
      <text x="12" y="56" font-size="4" fill="currentColor" stroke="none">Tissue fluid</text>
    </svg>`
  },
  {
    id: 'path-chronic-inflammation',
    name: 'Chronic Inflammation',
    domain: 'medicine',
    category: 'inflammation',
    tags: ['chronic', 'inflammation', 'lymphocytes', 'macrophages', 'plasma cells'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2" fill="#E6E6FA" opacity="0.3"/>
      <circle cx="18" cy="28" r="3" fill="#4B0082"/>
      <circle cx="28" cy="24" r="3" fill="#4B0082"/>
      <circle cx="38" cy="28" r="3" fill="#4B0082"/>
      <circle cx="48" cy="26" r="3" fill="#4B0082"/>
      <circle cx="24" cy="36" r="4" fill="#D2691E" opacity="0.6"/>
      <circle cx="40" cy="38" r="4" fill="#D2691E" opacity="0.6"/>
      <circle cx="32" cy="42" r="3" fill="#4B0082"/>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">Lymphocytes + Macrophages</text>
    </svg>`
  },
  {
    id: 'path-lymphocyte',
    name: 'Lymphocyte',
    domain: 'medicine',
    category: 'inflammation',
    tags: ['lymphocyte', 'mononuclear', 'T cell', 'B cell', 'chronic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="12" fill="#E6E6FA" opacity="0.4"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="8" fill="#4B0082" opacity="0.7"/>
      <circle cx="34" cy="30" r="2" fill="#4B0082"/>
      <text x="10" y="54" font-size="4" fill="currentColor" stroke="none">Large nucleus, scant cytoplasm</text>
    </svg>`
  },
  {
    id: 'path-granuloma',
    name: 'Granuloma',
    domain: 'medicine',
    category: 'inflammation',
    tags: ['granuloma', 'epithelioid', 'giant cells', 'TB', 'sarcoid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22"/>
      <circle cx="32" cy="32" r="8" fill="#FFFACD" opacity="0.5"/>
      <ellipse cx="32" cy="20" rx="8" ry="4" fill="#FFB6C1" opacity="0.5"/>
      <ellipse cx="20" cy="32" rx="4" ry="8" fill="#FFB6C1" opacity="0.5"/>
      <ellipse cx="44" cy="32" rx="4" ry="8" fill="#FFB6C1" opacity="0.5"/>
      <ellipse cx="32" cy="44" rx="8" ry="4" fill="#FFB6C1" opacity="0.5"/>
      <circle cx="32" cy="32" r="4" fill="#4B0082" opacity="0.3"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Epithelioid cells surround</text>
    </svg>`
  },
  {
    id: 'path-giant-cell',
    name: 'Multinucleated Giant Cell',
    domain: 'medicine',
    category: 'inflammation',
    tags: ['giant cell', 'Langhans', 'foreign body', 'multinucleated', 'macrophage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="18" fill="#FFB6C1" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="24" ry="18"/>
      <circle cx="20" cy="24" r="4" fill="#4B0082" opacity="0.6"/>
      <circle cx="32" cy="22" r="4" fill="#4B0082" opacity="0.6"/>
      <circle cx="44" cy="24" r="4" fill="#4B0082" opacity="0.6"/>
      <circle cx="24" cy="34" r="4" fill="#4B0082" opacity="0.6"/>
      <circle cx="40" cy="34" r="4" fill="#4B0082" opacity="0.6"/>
      <circle cx="32" cy="40" r="4" fill="#4B0082" opacity="0.6"/>
      <text x="10" y="56" font-size="3" fill="currentColor" stroke="none">Multiple nuclei (Langhans type)</text>
    </svg>`
  },
  {
    id: 'path-wound-healing',
    name: 'Wound Healing',
    domain: 'medicine',
    category: 'inflammation',
    tags: ['wound', 'healing', 'granulation', 'repair', 'scar'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="8" fill="#FFB6C1" opacity="0.4"/>
      <path d="M8 28h48" stroke-width="2"/>
      <path d="M12 32v8c0 2 2 4 4 4h32c2 0 4-2 4-4v-8" fill="#FF6B6B" opacity="0.3"/>
      <line x1="20" y1="32" x2="20" y2="42" stroke="#DC143C"/>
      <line x1="32" y1="32" x2="32" y2="44" stroke="#DC143C"/>
      <line x1="44" y1="32" x2="44" y2="42" stroke="#DC143C"/>
      <text x="12" y="54" font-size="3" fill="currentColor" stroke="none">Granulation tissue</text>
    </svg>`
  },
  {
    id: 'path-fibrosis',
    name: 'Fibrosis',
    domain: 'medicine',
    category: 'inflammation',
    tags: ['fibrosis', 'scar', 'collagen', 'connective tissue', 'chronic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="2"/>
      <path d="M16 20c8 4 16-4 24 0s8 4 0 8-16-4-24 0" stroke="#1E90FF"/>
      <path d="M16 32c8 4 16-4 24 0s8 4 0 8-16-4-24 0" stroke="#1E90FF"/>
      <path d="M16 44c8 0 16 0 24 0" stroke="#1E90FF"/>
      <ellipse cx="24" cy="26" rx="2" ry="3" fill="#4169E1"/>
      <ellipse cx="40" cy="38" rx="2" ry="3" fill="#4169E1"/>
      <text x="12" y="56" font-size="4" fill="#1E90FF" stroke="none">Collagen fibers</text>
    </svg>`
  },
  {
    id: 'path-abscess',
    name: 'Abscess',
    domain: 'medicine',
    category: 'inflammation',
    tags: ['abscess', 'pus', 'neutrophils', 'necrosis', 'pyogenic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="18"/>
      <ellipse cx="32" cy="32" rx="14" ry="12" fill="#FFFF99" opacity="0.6"/>
      <circle cx="28" cy="30" r="2" fill="#4169E1"/>
      <circle cx="36" cy="28" r="2" fill="#4169E1"/>
      <circle cx="32" cy="36" r="2" fill="#4169E1"/>
      <circle cx="26" cy="34" r="1" fill="#4169E1"/>
      <circle cx="38" cy="34" r="1" fill="#4169E1"/>
      <path d="M18 24c4-2 8-2 12 0" stroke-dasharray="2 2"/>
      <text x="20" y="56" font-size="4" fill="currentColor" stroke="none">Pus (neutrophils)</text>
    </svg>`
  },

  // ===========================================================================
  // NEOPLASIA
  // ===========================================================================
  {
    id: 'path-benign-tumor',
    name: 'Benign Tumor',
    domain: 'medicine',
    category: 'neoplasia',
    tags: ['benign', 'tumor', 'encapsulated', 'well-differentiated', 'adenoma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" stroke-width="3"/>
      <circle cx="32" cy="32" r="16" fill="#90EE90" opacity="0.3"/>
      <ellipse cx="28" cy="28" rx="4" ry="3" fill="#4B0082" opacity="0.4"/>
      <ellipse cx="36" cy="28" rx="4" ry="3" fill="#4B0082" opacity="0.4"/>
      <ellipse cx="28" cy="36" rx="4" ry="3" fill="#4B0082" opacity="0.4"/>
      <ellipse cx="36" cy="36" rx="4" ry="3" fill="#4B0082" opacity="0.4"/>
      <text x="10" y="56" font-size="3" fill="currentColor" stroke="none">Encapsulated, uniform</text>
    </svg>`
  },
  {
    id: 'path-malignant-tumor',
    name: 'Malignant Tumor',
    domain: 'medicine',
    category: 'neoplasia',
    tags: ['malignant', 'cancer', 'invasion', 'pleomorphism', 'carcinoma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32c0-12 8-20 16-20s16 8 16 20c4 4 4 8-4 12-4 4-16 8-24 0-4-4-4-8-4-12z" fill="#DC143C" opacity="0.2"/>
      <path d="M16 32c0-12 8-20 16-20s16 8 16 20c4 4 4 8-4 12-4 4-16 8-24 0-4-4-4-8-4-12z"/>
      <ellipse cx="24" cy="26" rx="5" ry="6" fill="#4B0082" opacity="0.6"/>
      <ellipse cx="38" cy="30" rx="7" ry="5" fill="#4B0082" opacity="0.7"/>
      <ellipse cx="28" cy="38" rx="4" ry="5" fill="#4B0082" opacity="0.5"/>
      <path d="M48 44l8 8" stroke="#DC143C" stroke-width="2"/>
      <path d="M12 44l-8 8" stroke="#DC143C" stroke-width="2"/>
      <text x="8" y="58" font-size="3" fill="#DC143C" stroke="none">Irregular, invasive</text>
    </svg>`
  },
  {
    id: 'path-invasion',
    name: 'Tumor Invasion',
    domain: 'medicine',
    category: 'neoplasia',
    tags: ['invasion', 'infiltration', 'basement membrane', 'malignant', 'spread'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="20" fill="#E8B4B8" opacity="0.3"/>
      <line x1="8" y1="28" x2="56" y2="28" stroke-width="2" stroke="#8B4513"/>
      <rect x="8" y="28" width="48" height="28" fill="#D2B48C" opacity="0.2"/>
      <ellipse cx="24" cy="20" rx="6" ry="4" fill="#DC143C" opacity="0.5"/>
      <ellipse cx="40" cy="18" rx="6" ry="4" fill="#DC143C" opacity="0.5"/>
      <path d="M26 24v12" stroke="#DC143C" stroke-width="2"/>
      <ellipse cx="26" cy="40" rx="4" ry="4" fill="#DC143C" opacity="0.5"/>
      <text x="8" y="54" font-size="3" fill="currentColor" stroke="none">Basement membrane breach</text>
    </svg>`
  },
  {
    id: 'path-metastasis',
    name: 'Metastasis',
    domain: 'medicine',
    category: 'neoplasia',
    tags: ['metastasis', 'spread', 'distant', 'lymphatic', 'hematogenous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="8" fill="#DC143C" opacity="0.5"/>
      <circle cx="16" cy="16" r="8"/>
      <path d="M24 16h8" stroke-dasharray="2 2"/>
      <path d="M32 16c8 0 16 8 16 16" stroke="#DC143C"/>
      <path d="M32 16c4 8 4 16 0 24" stroke="#DC143C"/>
      <path d="M32 16c-4 8 4 24 16 24" stroke="#DC143C"/>
      <circle cx="48" cy="32" r="4" fill="#DC143C" opacity="0.5"/>
      <circle cx="32" cy="40" r="4" fill="#DC143C" opacity="0.5"/>
      <circle cx="48" cy="48" r="4" fill="#DC143C" opacity="0.5"/>
      <text x="4" y="32" font-size="3" fill="currentColor" stroke="none">Primary</text>
      <text x="40" y="58" font-size="3" fill="currentColor" stroke="none">Mets</text>
    </svg>`
  },
  {
    id: 'path-tumor-grading',
    name: 'Tumor Grading',
    domain: 'medicine',
    category: 'neoplasia',
    tags: ['grading', 'differentiation', 'grade', 'G1', 'G2', 'G3'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="16" height="24" rx="1"/>
      <ellipse cx="12" cy="28" rx="4" ry="3" fill="#90EE90" opacity="0.5"/>
      <ellipse cx="12" cy="38" rx="4" ry="3" fill="#90EE90" opacity="0.5"/>
      <rect x="24" y="20" width="16" height="24" rx="1"/>
      <ellipse cx="32" cy="28" rx="5" ry="4" fill="#FFD700" opacity="0.5"/>
      <ellipse cx="32" cy="38" rx="4" ry="3" fill="#FFD700" opacity="0.5"/>
      <rect x="44" y="20" width="16" height="24" rx="1"/>
      <ellipse cx="52" cy="26" rx="6" ry="5" fill="#DC143C" opacity="0.5"/>
      <ellipse cx="52" cy="38" rx="5" ry="4" fill="#DC143C" opacity="0.5"/>
      <text x="8" y="52" font-size="4" fill="#228B22" stroke="none">G1</text>
      <text x="28" y="52" font-size="4" fill="#DAA520" stroke="none">G2</text>
      <text x="48" y="52" font-size="4" fill="#DC143C" stroke="none">G3</text>
    </svg>`
  },
  {
    id: 'path-tnm-staging',
    name: 'TNM Staging',
    domain: 'medicine',
    category: 'neoplasia',
    tags: ['TNM', 'staging', 'tumor', 'node', 'metastasis', 'AJCC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="24" r="8" fill="#DC143C" opacity="0.4"/>
      <circle cx="16" cy="24" r="8"/>
      <text x="12" y="28" font-size="6" fill="currentColor" stroke="none">T</text>
      <ellipse cx="40" cy="24" rx="6" ry="8" fill="#4169E1" opacity="0.4"/>
      <ellipse cx="40" cy="24" rx="6" ry="8"/>
      <text x="36" y="28" font-size="6" fill="currentColor" stroke="none">N</text>
      <circle cx="32" cy="48" r="6" fill="#808080" opacity="0.4"/>
      <circle cx="32" cy="48" r="6"/>
      <text x="28" y="52" font-size="6" fill="currentColor" stroke="none">M</text>
      <path d="M24 24h10"/>
      <path d="M20 32l8 10"/>
      <path d="M36 32l-4 10"/>
    </svg>`
  },
  {
    id: 'path-carcinoma',
    name: 'Carcinoma',
    domain: 'medicine',
    category: 'neoplasia',
    tags: ['carcinoma', 'epithelial', 'adenocarcinoma', 'SCC', 'malignant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="2"/>
      <path d="M16 16h32v8H16z" fill="#E8B4B8" opacity="0.5"/>
      <path d="M20 24c0 8 4 16 12 20s16 4 16-4" fill="#DC143C" opacity="0.3"/>
      <ellipse cx="28" cy="36" rx="6" ry="8" fill="#4B0082" opacity="0.5"/>
      <ellipse cx="40" cy="32" rx="5" ry="6" fill="#4B0082" opacity="0.5"/>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Epithelial origin</text>
    </svg>`
  },
  {
    id: 'path-sarcoma',
    name: 'Sarcoma',
    domain: 'medicine',
    category: 'neoplasia',
    tags: ['sarcoma', 'mesenchymal', 'soft tissue', 'bone', 'connective'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-16 8-24 20-24s20 8 20 24-8 24-20 24-20-8-20-24z" fill="#FFB6C1" opacity="0.3"/>
      <path d="M12 32c0-16 8-24 20-24s20 8 20 24-8 24-20 24-20-8-20-24z"/>
      <path d="M20 20c4 4 8 16 4 24" stroke="#DC143C"/>
      <path d="M32 16c0 8 4 20 8 28" stroke="#DC143C"/>
      <path d="M44 20c-4 4-8 16-4 24" stroke="#DC143C"/>
      <ellipse cx="28" cy="32" rx="4" ry="6" fill="#4B0082" opacity="0.5"/>
      <ellipse cx="40" cy="36" rx="4" ry="5" fill="#4B0082" opacity="0.5"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Spindle cells</text>
    </svg>`
  },
  {
    id: 'path-lymphoma',
    name: 'Lymphoma',
    domain: 'medicine',
    category: 'neoplasia',
    tags: ['lymphoma', 'Hodgkin', 'NHL', 'lymphoid', 'B-cell', 'T-cell'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="22" ry="20"/>
      <circle cx="24" cy="24" r="6" fill="#4B0082" opacity="0.5"/>
      <circle cx="40" cy="24" r="6" fill="#4B0082" opacity="0.5"/>
      <circle cx="24" cy="40" r="6" fill="#4B0082" opacity="0.5"/>
      <circle cx="40" cy="40" r="6" fill="#4B0082" opacity="0.5"/>
      <circle cx="32" cy="32" r="4" fill="#4B0082" opacity="0.5"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Lymphoid cells</text>
    </svg>`
  },
  {
    id: 'path-mitosis',
    name: 'Mitotic Figure',
    domain: 'medicine',
    category: 'neoplasia',
    tags: ['mitosis', 'division', 'proliferation', 'mitotic count', 'Ki67'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="14" fill="#FFE4E1" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="16" ry="14"/>
      <line x1="32" y1="20" x2="32" y2="44" stroke="#4B0082" stroke-width="2"/>
      <path d="M24 26l8-6 8 6" stroke="#4B0082" stroke-width="1.5"/>
      <path d="M24 38l8 6 8-6" stroke="#4B0082" stroke-width="1.5"/>
      <circle cx="28" cy="28" r="2" fill="#4B0082"/>
      <circle cx="36" cy="28" r="2" fill="#4B0082"/>
      <circle cx="28" cy="36" r="2" fill="#4B0082"/>
      <circle cx="36" cy="36" r="2" fill="#4B0082"/>
      <text x="16" y="54" font-size="4" fill="currentColor" stroke="none">Metaphase</text>
    </svg>`
  },
  {
    id: 'path-pleomorphism',
    name: 'Pleomorphism',
    domain: 'medicine',
    category: 'neoplasia',
    tags: ['pleomorphism', 'variation', 'nuclear', 'atypia', 'high grade'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2" fill="#FFE4E1" opacity="0.3"/>
      <ellipse cx="18" cy="26" rx="4" ry="6" fill="#4B0082" opacity="0.6"/>
      <circle cx="32" cy="24" r="8" fill="#4B0082" opacity="0.7"/>
      <ellipse cx="48" cy="28" rx="6" ry="4" fill="#4B0082" opacity="0.5"/>
      <ellipse cx="22" cy="40" rx="5" ry="3" fill="#4B0082" opacity="0.5"/>
      <ellipse cx="40" cy="38" rx="3" ry="5" fill="#4B0082" opacity="0.6"/>
      <text x="8" y="56" font-size="3" fill="#DC143C" stroke="none">Variable size and shape</text>
    </svg>`
  },
  {
    id: 'path-necrosis-tumor',
    name: 'Tumor Necrosis',
    domain: 'medicine',
    category: 'neoplasia',
    tags: ['necrosis', 'tumor', 'central', 'ischemic', 'high grade'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#DC143C" opacity="0.2"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="10" fill="#808080" opacity="0.5"/>
      <path d="M26 28c4 1 8 1 12 0" stroke="#666"/>
      <path d="M26 34c4 1 8 1 12 0" stroke="#666"/>
      <ellipse cx="22" cy="26" rx="3" ry="4" fill="#4B0082" opacity="0.5"/>
      <ellipse cx="42" cy="26" rx="3" ry="4" fill="#4B0082" opacity="0.5"/>
      <ellipse cx="22" cy="38" rx="3" ry="4" fill="#4B0082" opacity="0.5"/>
      <ellipse cx="42" cy="38" rx="3" ry="4" fill="#4B0082" opacity="0.5"/>
      <text x="16" y="56" font-size="3" fill="currentColor" stroke="none">Central necrosis</text>
    </svg>`
  },

  // ===========================================================================
  // HEMATOPATHOLOGY
  // ===========================================================================
  {
    id: 'path-blood-smear',
    name: 'Blood Smear',
    domain: 'medicine',
    category: 'hematopathology',
    tags: ['blood', 'smear', 'PBS', 'peripheral', 'Wright stain'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="16" rx="1"/>
      <circle cx="16" cy="32" r="3" fill="#DC143C" opacity="0.6"/>
      <circle cx="24" cy="30" r="3" fill="#DC143C" opacity="0.6"/>
      <circle cx="32" cy="33" r="3" fill="#DC143C" opacity="0.6"/>
      <circle cx="40" cy="31" r="3" fill="#DC143C" opacity="0.6"/>
      <circle cx="48" cy="32" r="3" fill="#DC143C" opacity="0.6"/>
      <circle cx="28" cy="32" r="4" fill="#E6E6FA"/>
      <circle cx="28" cy="32" r="2" fill="#4B0082"/>
      <circle cx="44" cy="32" r="4" fill="#E6E6FA"/>
      <circle cx="44" cy="32" r="2" fill="#4B0082"/>
      <text x="18" y="48" font-size="4" fill="currentColor" stroke="none">RBCs + WBCs</text>
    </svg>`
  },
  {
    id: 'path-bone-marrow',
    name: 'Bone Marrow Biopsy',
    domain: 'medicine',
    category: 'hematopathology',
    tags: ['bone marrow', 'biopsy', 'trephine', 'aspirate', 'cellularity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="4" fill="#FFFACD" opacity="0.3"/>
      <rect x="8" y="12" width="48" height="40" rx="4"/>
      <ellipse cx="20" cy="24" rx="4" ry="3" fill="#DC143C" opacity="0.5"/>
      <ellipse cx="32" cy="22" rx="4" ry="3" fill="#DC143C" opacity="0.5"/>
      <ellipse cx="44" cy="26" rx="4" ry="3" fill="#DC143C" opacity="0.5"/>
      <circle cx="24" cy="34" r="3" fill="#4B0082" opacity="0.5"/>
      <circle cx="36" cy="32" r="3" fill="#4B0082" opacity="0.5"/>
      <circle cx="48" cy="36" r="3" fill="#4B0082" opacity="0.5"/>
      <ellipse cx="28" cy="44" rx="4" ry="3" fill="#DC143C" opacity="0.5"/>
      <ellipse cx="40" cy="42" rx="4" ry="3" fill="#DC143C" opacity="0.5"/>
      <path d="M12 16h40" stroke="#D2B48C"/>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">Hematopoietic cells</text>
    </svg>`
  },
  {
    id: 'path-lymph-node',
    name: 'Lymph Node Architecture',
    domain: 'medicine',
    category: 'hematopathology',
    tags: ['lymph node', 'follicle', 'cortex', 'paracortex', 'medulla'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <path d="M8 32c4-4 8-4 12 0" fill="#90EE90" opacity="0.3"/>
      <ellipse cx="16" cy="22" rx="6" ry="5" fill="#4169E1" opacity="0.4"/>
      <ellipse cx="32" cy="18" rx="6" ry="5" fill="#4169E1" opacity="0.4"/>
      <ellipse cx="48" cy="22" rx="6" ry="5" fill="#4169E1" opacity="0.4"/>
      <rect x="14" y="28" width="36" height="8" fill="#FFB6C1" opacity="0.3"/>
      <ellipse cx="32" cy="42" rx="12" ry="6" fill="#FFFACD" opacity="0.4"/>
      <text x="10" y="16" font-size="3" fill="currentColor" stroke="none">Follicle</text>
      <text x="38" y="34" font-size="3" fill="currentColor" stroke="none">Paracortex</text>
    </svg>`
  },
  {
    id: 'path-flow-cytometry',
    name: 'Flow Cytometry',
    domain: 'medicine',
    category: 'hematopathology',
    tags: ['flow cytometry', 'immunophenotype', 'CD markers', 'gating', 'FACS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <line x1="8" y1="32" x2="56" y2="32"/>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <circle cx="20" cy="20" r="2" fill="#DC143C"/>
      <circle cx="24" cy="18" r="2" fill="#DC143C"/>
      <circle cx="22" cy="24" r="2" fill="#DC143C"/>
      <circle cx="44" cy="44" r="2" fill="#4169E1"/>
      <circle cx="48" cy="40" r="2" fill="#4169E1"/>
      <circle cx="42" cy="48" r="2" fill="#4169E1"/>
      <circle cx="46" cy="46" r="2" fill="#4169E1"/>
      <text x="10" y="62" font-size="4" fill="currentColor" stroke="none">CD marker analysis</text>
    </svg>`
  },
  {
    id: 'path-rbc',
    name: 'Red Blood Cell',
    domain: 'medicine',
    category: 'hematopathology',
    tags: ['RBC', 'erythrocyte', 'red cell', 'biconcave', 'hemoglobin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="#DC143C" opacity="0.5"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <ellipse cx="32" cy="32" rx="8" ry="6" fill="#DC143C" opacity="0.8"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Biconcave disc 7-8um</text>
    </svg>`
  },
  {
    id: 'path-wbc',
    name: 'White Blood Cell',
    domain: 'medicine',
    category: 'hematopathology',
    tags: ['WBC', 'leukocyte', 'white cell', 'differential', 'immune'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#E6E6FA" opacity="0.4"/>
      <circle cx="32" cy="32" r="16"/>
      <path d="M24 28c2-2 4-2 6 0s4 2 6 0 4-2 6 0" fill="#4B0082" opacity="0.6"/>
      <path d="M24 34c2-2 4-2 6 0s4 2 6 0 4-2 6 0" fill="#4B0082" opacity="0.6"/>
      <circle cx="24" cy="40" r="2" fill="#87CEEB"/>
      <circle cx="32" cy="40" r="2" fill="#87CEEB"/>
      <circle cx="40" cy="40" r="2" fill="#87CEEB"/>
      <text x="16" y="56" font-size="4" fill="currentColor" stroke="none">Neutrophil</text>
    </svg>`
  },
  {
    id: 'path-platelet',
    name: 'Platelet',
    domain: 'medicine',
    category: 'hematopathology',
    tags: ['platelet', 'thrombocyte', 'clotting', 'megakaryocyte', 'hemostasis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="32" rx="6" ry="4" fill="#E6E6FA"/>
      <ellipse cx="20" cy="32" rx="6" ry="4"/>
      <ellipse cx="32" cy="28" rx="6" ry="4" fill="#E6E6FA"/>
      <ellipse cx="32" cy="28" rx="6" ry="4"/>
      <ellipse cx="44" cy="32" rx="6" ry="4" fill="#E6E6FA"/>
      <ellipse cx="44" cy="32" rx="6" ry="4"/>
      <ellipse cx="28" cy="38" rx="6" ry="4" fill="#E6E6FA"/>
      <ellipse cx="28" cy="38" rx="6" ry="4"/>
      <ellipse cx="40" cy="38" rx="6" ry="4" fill="#E6E6FA"/>
      <ellipse cx="40" cy="38" rx="6" ry="4"/>
      <text x="12" y="54" font-size="4" fill="currentColor" stroke="none">Platelets 2-4um</text>
    </svg>`
  },
  {
    id: 'path-megakaryocyte',
    name: 'Megakaryocyte',
    domain: 'medicine',
    category: 'hematopathology',
    tags: ['megakaryocyte', 'platelet precursor', 'bone marrow', 'polyploid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#E6E6FA" opacity="0.4"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="26" cy="28" r="4" fill="#4B0082" opacity="0.6"/>
      <circle cx="38" cy="28" r="4" fill="#4B0082" opacity="0.6"/>
      <circle cx="26" cy="38" r="4" fill="#4B0082" opacity="0.6"/>
      <circle cx="38" cy="38" r="4" fill="#4B0082" opacity="0.6"/>
      <circle cx="32" cy="32" r="3" fill="#4B0082" opacity="0.6"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Large, multilobed nucleus</text>
    </svg>`
  },
  {
    id: 'path-blast-cell',
    name: 'Blast Cell',
    domain: 'medicine',
    category: 'hematopathology',
    tags: ['blast', 'immature', 'leukemia', 'AML', 'ALL', 'precursor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#E6E6FA" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="12" fill="#4B0082" opacity="0.5"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="36" cy="28" r="4" fill="#FFFACD"/>
      <text x="8" y="56" font-size="3" fill="#DC143C" stroke="none">High N:C ratio, nucleolus</text>
    </svg>`
  },
  {
    id: 'path-reed-sternberg',
    name: 'Reed-Sternberg Cell',
    domain: 'medicine',
    category: 'hematopathology',
    tags: ['Reed-Sternberg', 'Hodgkin', 'owl eye', 'bilobed', 'lymphoma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#FFB6C1" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <circle cx="24" cy="32" r="8" fill="#4B0082" opacity="0.5"/>
      <circle cx="40" cy="32" r="8" fill="#4B0082" opacity="0.5"/>
      <circle cx="24" cy="32" r="3" fill="#FFFACD"/>
      <circle cx="40" cy="32" r="3" fill="#FFFACD"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Owl eye appearance</text>
    </svg>`
  },

  // ===========================================================================
  // ORGAN PATHOLOGY
  // ===========================================================================
  {
    id: 'path-liver-cirrhosis',
    name: 'Liver Cirrhosis',
    domain: 'medicine',
    category: 'organ-pathology',
    tags: ['cirrhosis', 'liver', 'fibrosis', 'nodules', 'regenerative'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 20c8-8 32-8 40 0s0 32-20 36-28-28-20-36z" fill="#8B4513" opacity="0.3"/>
      <path d="M12 20c8-8 32-8 40 0s0 32-20 36-28-28-20-36z"/>
      <circle cx="24" cy="28" r="6"/>
      <circle cx="38" cy="26" r="5"/>
      <circle cx="28" cy="40" r="7"/>
      <circle cx="44" cy="38" r="5"/>
      <path d="M18 34c4-2 8-2 12 0" stroke="#1E90FF"/>
      <path d="M34 44c4-2 8-2 12 0" stroke="#1E90FF"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Regenerative nodules</text>
    </svg>`
  },
  {
    id: 'path-hepatitis',
    name: 'Hepatitis',
    domain: 'medicine',
    category: 'organ-pathology',
    tags: ['hepatitis', 'liver', 'inflammation', 'viral', 'portal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 20c8-8 32-8 40 0s0 32-20 36-28-28-20-36z"/>
      <rect x="18" y="24" width="8" height="24" fill="#DC143C" opacity="0.3"/>
      <circle cx="22" cy="30" r="2" fill="#4B0082"/>
      <circle cx="22" cy="38" r="2" fill="#4B0082"/>
      <circle cx="22" cy="46" r="2" fill="#4B0082"/>
      <rect x="30" y="20" width="20" height="28" fill="#FFE4E1" opacity="0.3"/>
      <ellipse cx="36" cy="30" rx="4" ry="3"/>
      <ellipse cx="44" cy="34" rx="4" ry="3"/>
      <ellipse cx="38" cy="42" rx="4" ry="3"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Portal inflammation</text>
    </svg>`
  },
  {
    id: 'path-fatty-liver',
    name: 'Fatty Liver (Steatosis)',
    domain: 'medicine',
    category: 'organ-pathology',
    tags: ['steatosis', 'fatty liver', 'NAFLD', 'lipid', 'vacuoles'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 20c8-8 32-8 40 0s0 32-20 36-28-28-20-36z"/>
      <circle cx="20" cy="28" r="5" fill="#FFFACD" opacity="0.6"/>
      <circle cx="32" cy="24" r="6" fill="#FFFACD" opacity="0.6"/>
      <circle cx="44" cy="30" r="5" fill="#FFFACD" opacity="0.6"/>
      <circle cx="26" cy="38" r="5" fill="#FFFACD" opacity="0.6"/>
      <circle cx="40" cy="42" r="6" fill="#FFFACD" opacity="0.6"/>
      <circle cx="34" cy="50" r="4" fill="#FFFACD" opacity="0.6"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Lipid vacuoles</text>
    </svg>`
  },
  {
    id: 'path-glomerulonephritis',
    name: 'Glomerulonephritis',
    domain: 'medicine',
    category: 'organ-pathology',
    tags: ['glomerulonephritis', 'kidney', 'GN', 'glomerulus', 'nephritis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="22" ry="20"/>
      <circle cx="32" cy="32" r="12" fill="#DC143C" opacity="0.2"/>
      <path d="M24 28c4 2 8 2 12 0" stroke="#DC143C"/>
      <path d="M22 34c6 2 10 2 16 0" stroke="#DC143C"/>
      <path d="M24 40c4 2 8 2 12 0" stroke="#DC143C"/>
      <circle cx="20" cy="32" r="2" fill="#4B0082"/>
      <circle cx="44" cy="32" r="2" fill="#4B0082"/>
      <path d="M16 20l8 8"/>
      <path d="M48 20l-8 8"/>
      <path d="M32 52v4"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Hypercellular glomerulus</text>
    </svg>`
  },
  {
    id: 'path-tubular-injury',
    name: 'Acute Tubular Injury',
    domain: 'medicine',
    category: 'organ-pathology',
    tags: ['ATI', 'ATN', 'tubular', 'kidney', 'necrosis', 'ischemic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2"/>
      <path d="M12 20h40v8H12z" fill="#FFB6C1" opacity="0.4"/>
      <ellipse cx="18" cy="24" rx="4" ry="3" stroke-dasharray="2 2"/>
      <ellipse cx="32" cy="24" rx="4" ry="3" stroke-dasharray="2 2"/>
      <ellipse cx="46" cy="24" rx="4" ry="3" stroke-dasharray="2 2"/>
      <path d="M14 36h8c0 4 4 4 4 0h8c0 4 4 4 4 0h8"/>
      <ellipse cx="18" cy="40" rx="2" ry="1" fill="#4B0082"/>
      <ellipse cx="32" cy="40" rx="2" ry="1" fill="#4B0082"/>
      <ellipse cx="46" cy="40" rx="2" ry="1" fill="#4B0082"/>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">Tubular epithelial loss</text>
    </svg>`
  },
  {
    id: 'path-lung-pneumonia',
    name: 'Pneumonia',
    domain: 'medicine',
    category: 'organ-pathology',
    tags: ['pneumonia', 'lung', 'consolidation', 'infection', 'lobar'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c-8 16-4 32 4 40h24c8-8 12-24 4-40-8 0-24 0-32 0z"/>
      <rect x="20" y="24" width="16" height="24" fill="#FFD700" opacity="0.4"/>
      <circle cx="24" cy="30" r="2" fill="#4169E1"/>
      <circle cx="32" cy="28" r="2" fill="#4169E1"/>
      <circle cx="28" cy="36" r="2" fill="#4169E1"/>
      <circle cx="32" cy="42" r="2" fill="#4169E1"/>
      <path d="M40 20c4 8 4 24 0 36" stroke-dasharray="2 2"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Alveolar consolidation</text>
    </svg>`
  },
  {
    id: 'path-emphysema',
    name: 'Emphysema',
    domain: 'medicine',
    category: 'organ-pathology',
    tags: ['emphysema', 'lung', 'COPD', 'alveolar', 'destruction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c-8 16-4 32 4 40h24c8-8 12-24 4-40-8 0-24 0-32 0z"/>
      <circle cx="24" cy="28" r="8" fill="#ADD8E6" opacity="0.3"/>
      <circle cx="40" cy="28" r="8" fill="#ADD8E6" opacity="0.3"/>
      <circle cx="24" cy="44" r="8" fill="#ADD8E6" opacity="0.3"/>
      <circle cx="40" cy="44" r="8" fill="#ADD8E6" opacity="0.3"/>
      <circle cx="32" cy="36" r="6" fill="#ADD8E6" opacity="0.3"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Enlarged air spaces</text>
    </svg>`
  },
  {
    id: 'path-mi-heart',
    name: 'Myocardial Infarction',
    domain: 'medicine',
    category: 'organ-pathology',
    tags: ['MI', 'heart', 'infarct', 'coagulative necrosis', 'ischemia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z"/>
      <path d="M24 28c4 4 4 16 0 24h16c-4-8-4-20 0-24" fill="#808080" opacity="0.5"/>
      <line x1="26" y1="32" x2="38" y2="32" stroke="#666"/>
      <line x1="26" y1="38" x2="38" y2="38" stroke="#666"/>
      <line x1="26" y1="44" x2="38" y2="44" stroke="#666"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Coagulative necrosis</text>
    </svg>`
  },
  {
    id: 'path-atherosclerosis-vessel',
    name: 'Atherosclerosis',
    domain: 'medicine',
    category: 'organ-pathology',
    tags: ['atherosclerosis', 'plaque', 'artery', 'lipid', 'cholesterol'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <ellipse cx="32" cy="24" rx="12" ry="6" fill="#FFD700" opacity="0.5"/>
      <ellipse cx="32" cy="40" rx="12" ry="6" fill="#FFD700" opacity="0.5"/>
      <ellipse cx="32" cy="32" rx="8" ry="4" fill="#DC143C" opacity="0.3"/>
      <circle cx="28" cy="24" r="2" fill="#FFFACD"/>
      <circle cx="36" cy="24" r="2" fill="#FFFACD"/>
      <text x="12" y="58" font-size="3" fill="currentColor" stroke="none">Lipid-laden plaque</text>
    </svg>`
  },
  {
    id: 'path-thrombus-vessel',
    name: 'Vascular Thrombus',
    domain: 'medicine',
    category: 'organ-pathology',
    tags: ['thrombus', 'clot', 'vascular', 'DVT', 'arterial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" rx="12"/>
      <ellipse cx="32" cy="32" rx="14" ry="8" fill="#8B0000" opacity="0.6"/>
      <path d="M22 28c4 2 8 2 12 0" stroke="#DC143C"/>
      <path d="M24 34c4 2 8 2 12 0" stroke="#DC143C"/>
      <circle cx="24" cy="32" r="2" fill="#DC143C"/>
      <circle cx="32" cy="30" r="2" fill="#DC143C"/>
      <circle cx="40" cy="32" r="2" fill="#DC143C"/>
      <path d="M8 32h8" stroke-dasharray="2 2"/>
      <path d="M48 32h8" stroke-dasharray="2 2"/>
      <text x="16" y="52" font-size="3" fill="currentColor" stroke="none">Lines of Zahn</text>
    </svg>`
  },
  {
    id: 'path-fibroadenoma',
    name: 'Fibroadenoma',
    domain: 'medicine',
    category: 'organ-pathology',
    tags: ['fibroadenoma', 'breast', 'benign', 'biphasic', 'tumor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="18" stroke-width="3"/>
      <ellipse cx="32" cy="32" rx="18" ry="16" fill="#FFB6C1" opacity="0.3"/>
      <path d="M20 24c4 4 8 0 12 4s8 0 12-4" stroke="#1E90FF"/>
      <path d="M20 32c4 4 8 0 12 4s8 0 12-4" stroke="#1E90FF"/>
      <path d="M20 40c4 4 8 0 12 4s8 0 12-4" stroke="#1E90FF"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Biphasic: glands + stroma</text>
    </svg>`
  },
  {
    id: 'path-carcinoma-breast',
    name: 'Breast Carcinoma',
    domain: 'medicine',
    category: 'organ-pathology',
    tags: ['breast', 'carcinoma', 'ductal', 'lobular', 'invasive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32c0-12 8-20 16-20s16 8 16 20c4 4 4 8-4 12-4 4-16 8-24 0-4-4-4-8-4-12z" fill="#DC143C" opacity="0.2"/>
      <path d="M16 32c0-12 8-20 16-20s16 8 16 20c4 4 4 8-4 12-4 4-16 8-24 0-4-4-4-8-4-12z"/>
      <ellipse cx="28" cy="28" rx="6" ry="5" fill="#4B0082" opacity="0.5"/>
      <ellipse cx="38" cy="32" rx="5" ry="6" fill="#4B0082" opacity="0.6"/>
      <ellipse cx="30" cy="40" rx="5" ry="4" fill="#4B0082" opacity="0.5"/>
      <path d="M48 44l8 8" stroke="#DC143C" stroke-width="2"/>
      <path d="M12 44l-8 8" stroke="#DC143C" stroke-width="2"/>
      <text x="8" y="60" font-size="3" fill="#DC143C" stroke="none">Invasive, desmoplastic</text>
    </svg>`
  },

  // ===========================================================================
  // LAB EQUIPMENT
  // ===========================================================================
  {
    id: 'path-specimen-container',
    name: 'Specimen Container',
    domain: 'medicine',
    category: 'lab-equipment',
    tags: ['specimen', 'container', 'formalin', 'fixative', 'collection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="40" rx="2"/>
      <rect x="16" y="16" width="32" height="8" fill="#FFD700" opacity="0.4"/>
      <line x1="16" y1="24" x2="48" y2="24"/>
      <rect x="20" y="28" width="24" height="24" fill="#E0E0E0" opacity="0.3"/>
      <ellipse cx="32" cy="40" rx="8" ry="6" fill="#DC143C" opacity="0.3"/>
      <text x="20" y="12" font-size="4" fill="currentColor" stroke="none">10% Formalin</text>
    </svg>`
  },
  {
    id: 'path-grossing-station',
    name: 'Grossing Station',
    domain: 'medicine',
    category: 'lab-equipment',
    tags: ['grossing', 'dissection', 'specimen', 'cutting', 'examination'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="32" width="48" height="24" rx="2"/>
      <rect x="12" y="36" width="20" height="16" fill="#ADD8E6" opacity="0.3"/>
      <ellipse cx="22" cy="44" rx="6" ry="4" fill="#DC143C" opacity="0.3"/>
      <path d="M36 36l12 4"/>
      <rect x="44" y="36" width="8" height="2" fill="#808080"/>
      <circle cx="54" cy="16" r="8"/>
      <circle cx="54" cy="16" r="5" fill="#FFFACD" opacity="0.5"/>
      <path d="M54 24v8"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Grossing bench</text>
    </svg>`
  },
  {
    id: 'path-microtome',
    name: 'Microtome',
    domain: 'medicine',
    category: 'lab-equipment',
    tags: ['microtome', 'sectioning', 'cutting', 'blade', 'paraffin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="40" width="40" height="16" rx="2"/>
      <rect x="20" y="24" width="16" height="16" fill="#D2B48C" opacity="0.4"/>
      <rect x="20" y="24" width="16" height="16"/>
      <line x1="18" y1="40" x2="46" y2="40" stroke-width="2" stroke="#808080"/>
      <path d="M40 32l8-8"/>
      <circle cx="48" cy="24" r="4"/>
      <path d="M36 28h8"/>
      <text x="16" y="60" font-size="3" fill="currentColor" stroke="none">Rotary microtome</text>
    </svg>`
  },
  {
    id: 'path-ihc-stainer',
    name: 'IHC Stainer',
    domain: 'medicine',
    category: 'lab-equipment',
    tags: ['IHC', 'stainer', 'automated', 'immunohistochemistry', 'antibody'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="40" rx="4"/>
      <rect x="12" y="20" width="40" height="8" fill="#ADD8E6" opacity="0.3"/>
      <rect x="12" y="32" width="8" height="20" fill="#8B4513" opacity="0.3"/>
      <rect x="24" y="32" width="8" height="20" fill="#8B4513" opacity="0.3"/>
      <rect x="36" y="32" width="8" height="20" fill="#8B4513" opacity="0.3"/>
      <rect x="48" y="32" width="4" height="20" fill="#808080" opacity="0.3"/>
      <circle cx="52" cy="24" r="4" fill="#228B22"/>
      <text x="12" y="60" font-size="3" fill="currentColor" stroke="none">Automated stainer</text>
    </svg>`
  },
  {
    id: 'path-molecular-pathology',
    name: 'Molecular Pathology',
    domain: 'medicine',
    category: 'lab-equipment',
    tags: ['molecular', 'PCR', 'NGS', 'DNA', 'sequencing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8v48" stroke="#DC143C"/>
      <path d="M44 8v48" stroke="#4169E1"/>
      <path d="M20 12c8 4 16 4 24 0"/>
      <path d="M20 20c8 4 16 4 24 0"/>
      <path d="M20 28c8 4 16 4 24 0"/>
      <path d="M20 36c8 4 16 4 24 0"/>
      <path d="M20 44c8 4 16 4 24 0"/>
      <path d="M20 52c8 4 16 4 24 0"/>
      <circle cx="32" cy="16" r="2" fill="#228B22"/>
      <circle cx="32" cy="32" r="2" fill="#FFD700"/>
      <circle cx="32" cy="48" r="2" fill="#9932CC"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">DNA helix / NGS</text>
    </svg>`
  },
  {
    id: 'path-autopsy-table',
    name: 'Autopsy Table',
    domain: 'medicine',
    category: 'lab-equipment',
    tags: ['autopsy', 'table', 'post-mortem', 'examination', 'forensic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="8" rx="1" fill="#C0C0C0" opacity="0.5"/>
      <rect x="8" y="24" width="48" height="8" rx="1"/>
      <rect x="12" y="32" width="4" height="20"/>
      <rect x="48" y="32" width="4" height="20"/>
      <ellipse cx="20" cy="28" rx="4" ry="2" fill="#DC143C" opacity="0.2"/>
      <path d="M28 24v8"/>
      <path d="M36 24v8"/>
      <path d="M44 24v8"/>
      <circle cx="54" cy="20" r="4"/>
      <path d="M54 24v-8"/>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">Autopsy station</text>
    </svg>`
  },
  {
    id: 'path-tissue-cassette',
    name: 'Tissue Cassette',
    domain: 'medicine',
    category: 'lab-equipment',
    tags: ['cassette', 'tissue', 'processing', 'embedding', 'histology'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="24" rx="2"/>
      <rect x="16" y="24" width="32" height="16" fill="#E0E0E0" opacity="0.5"/>
      <line x1="16" y1="28" x2="48" y2="28"/>
      <line x1="16" y1="32" x2="48" y2="32"/>
      <line x1="16" y1="36" x2="48" y2="36"/>
      <ellipse cx="32" cy="32" rx="8" ry="4" fill="#DC143C" opacity="0.2"/>
      <rect x="20" y="44" width="24" height="6" fill="#87CEEB" opacity="0.4"/>
      <text x="24" y="50" font-size="4" fill="currentColor" stroke="none">ID</text>
    </svg>`
  },
  {
    id: 'path-paraffin-block',
    name: 'Paraffin Block',
    domain: 'medicine',
    category: 'lab-equipment',
    tags: ['paraffin', 'block', 'FFPE', 'embedding', 'wax'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="1" fill="#FFFACD" opacity="0.5"/>
      <rect x="16" y="20" width="32" height="24" rx="1"/>
      <ellipse cx="32" cy="32" rx="10" ry="6" fill="#DC143C" opacity="0.3"/>
      <rect x="20" y="44" width="24" height="8" fill="#4169E1" opacity="0.3"/>
      <text x="24" y="50" font-size="4" fill="currentColor" stroke="none">Label</text>
    </svg>`
  },
  {
    id: 'path-digital-scanner',
    name: 'Digital Slide Scanner',
    domain: 'medicine',
    category: 'lab-equipment',
    tags: ['scanner', 'digital', 'pathology', 'WSI', 'whole slide'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="32" rx="4"/>
      <rect x="12" y="24" width="24" height="16" fill="#000033"/>
      <rect x="16" y="28" width="16" height="8" fill="#E8B4B8" opacity="0.6"/>
      <path d="M40 28h8"/>
      <path d="M40 32h8"/>
      <path d="M40 36h8"/>
      <circle cx="52" cy="32" r="2" fill="#228B22"/>
      <rect x="14" y="44" width="36" height="4" fill="#808080" opacity="0.3"/>
      <text x="12" y="58" font-size="3" fill="currentColor" stroke="none">Digital pathology</text>
    </svg>`
  },

  // ===========================================================================
  // CYTOPATHOLOGY
  // ===========================================================================
  {
    id: 'path-pap-smear',
    name: 'Pap Smear',
    domain: 'medicine',
    category: 'cytopathology',
    tags: ['Pap smear', 'cervical', 'cytology', 'screening', 'Bethesda'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="16" rx="1"/>
      <ellipse cx="20" cy="32" rx="6" ry="5" fill="#FFB6C1" opacity="0.4"/>
      <ellipse cx="20" cy="32" rx="3" ry="2" fill="#4B0082"/>
      <ellipse cx="36" cy="30" rx="5" ry="4" fill="#FFB6C1" opacity="0.4"/>
      <ellipse cx="36" cy="30" rx="2" ry="1.5" fill="#4B0082"/>
      <ellipse cx="48" cy="34" rx="4" ry="3" fill="#FFB6C1" opacity="0.4"/>
      <ellipse cx="48" cy="34" rx="1.5" ry="1" fill="#4B0082"/>
      <text x="12" y="48" font-size="3" fill="currentColor" stroke="none">Squamous cells</text>
    </svg>`
  },
  {
    id: 'path-fna-cytology',
    name: 'Fine Needle Aspiration',
    domain: 'medicine',
    category: 'cytopathology',
    tags: ['FNA', 'fine needle', 'aspiration', 'cytology', 'biopsy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="16" ry="14" fill="#FFE4E1" opacity="0.4"/>
      <ellipse cx="32" cy="36" rx="16" ry="14"/>
      <path d="M32 8v16" stroke-width="2"/>
      <path d="M30 8h4"/>
      <path d="M28 24l4 4 4-4" fill="#E8B4B8" opacity="0.6"/>
      <circle cx="28" cy="36" r="3" fill="#4B0082" opacity="0.5"/>
      <circle cx="36" cy="38" r="3" fill="#4B0082" opacity="0.5"/>
      <circle cx="32" cy="44" r="2" fill="#4B0082" opacity="0.5"/>
      <text x="12" y="58" font-size="3" fill="currentColor" stroke="none">FNA biopsy</text>
    </svg>`
  },
  {
    id: 'path-urine-cytology',
    name: 'Urine Cytology',
    domain: 'medicine',
    category: 'cytopathology',
    tags: ['urine', 'cytology', 'bladder', 'urothelial', 'voided'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="12" width="24" height="40" rx="4"/>
      <rect x="24" y="28" width="16" height="20" fill="#FFFACD" opacity="0.4"/>
      <ellipse cx="28" cy="34" rx="2" ry="3" fill="#4B0082" opacity="0.6"/>
      <ellipse cx="36" cy="38" rx="3" ry="2" fill="#4B0082" opacity="0.5"/>
      <ellipse cx="32" cy="44" rx="2" ry="2" fill="#4B0082" opacity="0.5"/>
      <path d="M20 24h24"/>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">Urothelial cells</text>
    </svg>`
  },
  {
    id: 'path-effusion-cytology',
    name: 'Effusion Cytology',
    domain: 'medicine',
    category: 'cytopathology',
    tags: ['effusion', 'pleural', 'ascites', 'fluid', 'cytology'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="2" fill="#87CEEB" opacity="0.2"/>
      <rect x="16" y="16" width="32" height="32" rx="2"/>
      <circle cx="24" cy="28" r="4" fill="#4B0082" opacity="0.5"/>
      <circle cx="36" cy="26" r="3" fill="#4B0082" opacity="0.5"/>
      <circle cx="40" cy="36" r="4" fill="#4B0082" opacity="0.5"/>
      <circle cx="28" cy="40" r="3" fill="#4B0082" opacity="0.5"/>
      <ellipse cx="32" cy="32" r="2" fill="#DC143C" opacity="0.4"/>
      <text x="12" y="56" font-size="3" fill="currentColor" stroke="none">Fluid cytology</text>
    </svg>`
  },
  {
    id: 'path-thyroid-fna',
    name: 'Thyroid FNA',
    domain: 'medicine',
    category: 'cytopathology',
    tags: ['thyroid', 'FNA', 'Bethesda', 'nodule', 'follicular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 24c0-4 8-8 16-8s16 4 16 8c0 8-4 24-16 24s-16-16-16-24z" fill="#FFB6C1" opacity="0.3"/>
      <path d="M16 24c0-4 8-8 16-8s16 4 16 8c0 8-4 24-16 24s-16-16-16-24z"/>
      <circle cx="26" cy="28" r="4" fill="#4B0082" opacity="0.4"/>
      <circle cx="38" cy="28" r="4" fill="#4B0082" opacity="0.4"/>
      <circle cx="32" cy="36" r="3" fill="#4B0082" opacity="0.4"/>
      <path d="M32 8v8" stroke-width="2"/>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">Bethesda system</text>
    </svg>`
  },
  {
    id: 'path-koilocyte',
    name: 'Koilocyte',
    domain: 'medicine',
    category: 'cytopathology',
    tags: ['koilocyte', 'HPV', 'perinuclear halo', 'dysplasia', 'cervical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="18" ry="16" fill="#FFB6C1" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="18" ry="16"/>
      <ellipse cx="32" cy="32" rx="10" ry="8" fill="#FFFFFF" opacity="0.8"/>
      <ellipse cx="32" cy="32" rx="6" ry="5" fill="#4B0082" opacity="0.6"/>
      <ellipse cx="32" cy="32" rx="6" ry="5"/>
      <path d="M28 30c2 1 4 1 6 0" fill="#4B0082"/>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">Perinuclear halo (HPV)</text>
    </svg>`
  },

  // ===========================================================================
  // SURGICAL PATHOLOGY
  // ===========================================================================
  {
    id: 'path-margin-assessment',
    name: 'Margin Assessment',
    domain: 'medicine',
    category: 'surgical-pathology',
    tags: ['margin', 'resection', 'surgical', 'clearance', 'positive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="18"/>
      <ellipse cx="32" cy="32" rx="10" ry="8" fill="#DC143C" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="10" ry="8"/>
      <path d="M12 32h8" stroke="#228B22" stroke-width="2"/>
      <path d="M44 32h8" stroke="#228B22" stroke-width="2"/>
      <path d="M32 14v6" stroke="#228B22" stroke-width="2"/>
      <path d="M32 44v6" stroke="#228B22" stroke-width="2"/>
      <text x="8" y="58" font-size="3" fill="#228B22" stroke="none">Clear margins</text>
    </svg>`
  },
  {
    id: 'path-sentinel-node',
    name: 'Sentinel Lymph Node',
    domain: 'medicine',
    category: 'surgical-pathology',
    tags: ['sentinel', 'lymph node', 'biopsy', 'SLN', 'staging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="14"/>
      <ellipse cx="32" cy="32" rx="14" ry="12" fill="#4169E1" opacity="0.3"/>
      <path d="M16 32c-8 0-8 8 0 8" fill="#ADD8E6" opacity="0.4"/>
      <path d="M48 32c8 0 8 8 0 8" fill="#ADD8E6" opacity="0.4"/>
      <circle cx="28" cy="28" r="3" fill="#4B0082" opacity="0.4"/>
      <circle cx="36" cy="30" r="3" fill="#4B0082" opacity="0.4"/>
      <circle cx="32" cy="38" r="2" fill="#4B0082" opacity="0.4"/>
      <text x="8" y="56" font-size="3" fill="#4169E1" stroke="none">Blue dye localization</text>
    </svg>`
  },
  {
    id: 'path-frozen-intraop',
    name: 'Intraoperative Frozen',
    domain: 'medicine',
    category: 'surgical-pathology',
    tags: ['frozen section', 'intraoperative', 'rapid', 'diagnosis', 'FS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="24" rx="2" fill="#ADD8E6" opacity="0.3"/>
      <rect x="12" y="20" width="40" height="24" rx="2"/>
      <path d="M24 24v16"/>
      <path d="M32 24v16"/>
      <path d="M40 24v16"/>
      <path d="M20 28h24"/>
      <path d="M20 36h24"/>
      <circle cx="8" cy="32" r="3" fill="#87CEEB"/>
      <circle cx="56" cy="32" r="3" fill="#87CEEB"/>
      <text x="16" y="52" font-size="3" fill="currentColor" stroke="none">Rapid frozen section</text>
    </svg>`
  },
  {
    id: 'path-specimen-orientation',
    name: 'Specimen Orientation',
    domain: 'medicine',
    category: 'surgical-pathology',
    tags: ['orientation', 'specimen', 'marking', 'suture', 'surgical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="#FFE4E1" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <path d="M12 32l8-4v8z" fill="#DC143C"/>
      <path d="M52 32l-8-4v8z" fill="#4169E1"/>
      <circle cx="32" cy="16" r="4" fill="#228B22"/>
      <circle cx="32" cy="48" r="4" fill="#FFD700"/>
      <text x="8" y="10" font-size="3" fill="currentColor" stroke="none">Superior</text>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Inferior</text>
    </svg>`
  },
  {
    id: 'path-lymphovascular-invasion',
    name: 'Lymphovascular Invasion',
    domain: 'medicine',
    category: 'surgical-pathology',
    tags: ['LVI', 'lymphovascular', 'invasion', 'spread', 'prognostic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c8-8 16-8 24 0s16 8 24 0" fill="none"/>
      <path d="M8 28c8-8 16-8 24 0s16 8 24 0" fill="#ADD8E6" opacity="0.3"/>
      <path d="M8 36c8-8 16-8 24 0s16 8 24 0" fill="#ADD8E6" opacity="0.3"/>
      <ellipse cx="24" cy="32" rx="4" ry="3" fill="#DC143C" opacity="0.6"/>
      <ellipse cx="40" cy="32" rx="4" ry="3" fill="#DC143C" opacity="0.6"/>
      <ellipse cx="32" cy="32" rx="3" ry="2" fill="#DC143C" opacity="0.6"/>
      <text x="8" y="52" font-size="3" fill="#DC143C" stroke="none">Tumor in vessels</text>
    </svg>`
  },
  {
    id: 'path-perineural-invasion',
    name: 'Perineural Invasion',
    domain: 'medicine',
    category: 'surgical-pathology',
    tags: ['PNI', 'perineural', 'invasion', 'nerve', 'prognostic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h48" stroke-width="3" stroke="#FFD700"/>
      <ellipse cx="32" cy="32" rx="12" ry="8"/>
      <ellipse cx="32" cy="32" rx="10" ry="6" fill="#DC143C" opacity="0.4"/>
      <circle cx="28" cy="30" r="2" fill="#4B0082"/>
      <circle cx="36" cy="32" r="2" fill="#4B0082"/>
      <circle cx="32" cy="36" r="2" fill="#4B0082"/>
      <text x="8" y="48" font-size="3" fill="currentColor" stroke="none">Tumor around nerve</text>
    </svg>`
  },

  // ===========================================================================
  // AUTOPSY PATHOLOGY
  // ===========================================================================
  {
    id: 'path-autopsy-incision',
    name: 'Autopsy Incision',
    domain: 'medicine',
    category: 'autopsy',
    tags: ['autopsy', 'Y-incision', 'post-mortem', 'examination', 'forensic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="12" ry="10"/>
      <rect x="20" y="28" width="24" height="28" rx="2"/>
      <path d="M24 12l8 16 8-16" stroke="#DC143C" stroke-width="2"/>
      <path d="M32 28v24" stroke="#DC143C" stroke-width="2"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Y-incision</text>
    </svg>`
  },
  {
    id: 'path-organ-weights',
    name: 'Organ Weights',
    domain: 'medicine',
    category: 'autopsy',
    tags: ['organ', 'weight', 'autopsy', 'measurement', 'protocol'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="36" width="32" height="8" rx="1"/>
      <path d="M20 36v-8h24v8"/>
      <ellipse cx="32" cy="24" rx="8" ry="6" fill="#DC143C" opacity="0.4"/>
      <path d="M32 44v8"/>
      <path d="M24 52h16"/>
      <rect x="8" y="12" width="12" height="16" rx="1"/>
      <text x="10" y="24" font-size="4" fill="currentColor" stroke="none">g</text>
      <text x="48" y="24" font-size="4" fill="currentColor" stroke="none">350g</text>
    </svg>`
  },
  {
    id: 'path-post-mortem-changes',
    name: 'Post-mortem Changes',
    domain: 'medicine',
    category: 'autopsy',
    tags: ['post-mortem', 'livor', 'rigor', 'mortis', 'decomposition'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="24" rx="2"/>
      <rect x="12" y="32" width="40" height="12" rx="1" fill="#8B4513" opacity="0.4"/>
      <path d="M16 28h8"/>
      <path d="M28 28h8"/>
      <path d="M40 28h8"/>
      <circle cx="20" cy="28" r="2" fill="#E6E6FA"/>
      <circle cx="32" cy="28" r="2" fill="#E6E6FA"/>
      <circle cx="44" cy="28" r="2" fill="#E6E6FA"/>
      <text x="8" y="52" font-size="3" fill="currentColor" stroke="none">Livor mortis (hypostasis)</text>
    </svg>`
  },
  {
    id: 'path-cause-of-death',
    name: 'Cause of Death',
    domain: 'medicine',
    category: 'autopsy',
    tags: ['cause', 'death', 'manner', 'certificate', 'COD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="2"/>
      <line x1="12" y1="20" x2="52" y2="20"/>
      <text x="14" y="18" font-size="4" fill="currentColor" stroke="none">CAUSE OF DEATH</text>
      <line x1="12" y1="28" x2="52" y2="28"/>
      <text x="14" y="26" font-size="3" fill="currentColor" stroke="none">I(a) Immediate:</text>
      <line x1="12" y1="36" x2="52" y2="36"/>
      <text x="14" y="34" font-size="3" fill="currentColor" stroke="none">(b) Underlying:</text>
      <line x1="12" y1="44" x2="52" y2="44"/>
      <text x="14" y="42" font-size="3" fill="currentColor" stroke="none">II Contributing:</text>
    </svg>`
  },

  // ===========================================================================
  // MOLECULAR PATHOLOGY
  // ===========================================================================
  {
    id: 'path-fish-analysis',
    name: 'FISH Analysis',
    domain: 'medicine',
    category: 'molecular-pathology',
    tags: ['FISH', 'fluorescence', 'in situ', 'hybridization', 'HER2'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="2" fill="#000033"/>
      <circle cx="24" cy="28" r="6" stroke="#4B0082"/>
      <circle cx="22" cy="26" r="2" fill="#FF0000"/>
      <circle cx="26" cy="30" r="2" fill="#00FF00"/>
      <circle cx="40" cy="36" r="6" stroke="#4B0082"/>
      <circle cx="38" cy="34" r="2" fill="#FF0000"/>
      <circle cx="42" cy="38" r="2" fill="#00FF00"/>
      <circle cx="40" cy="34" r="2" fill="#FF0000"/>
      <circle cx="38" cy="38" r="2" fill="#00FF00"/>
      <text x="12" y="56" font-size="3" fill="#00FF00" stroke="none">FISH amplified</text>
    </svg>`
  },
  {
    id: 'path-pcr-gel',
    name: 'PCR Gel Electrophoresis',
    domain: 'medicine',
    category: 'molecular-pathology',
    tags: ['PCR', 'gel', 'electrophoresis', 'DNA', 'amplification'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="2" fill="#E0E0E0" opacity="0.3"/>
      <rect x="8" y="12" width="48" height="40" rx="2"/>
      <rect x="12" y="16" width="6" height="4" fill="#FF6600"/>
      <rect x="12" y="24" width="6" height="3" fill="#FF6600"/>
      <rect x="12" y="36" width="6" height="2" fill="#FF6600"/>
      <rect x="22" y="16" width="6" height="4" fill="#FF6600"/>
      <rect x="22" y="28" width="6" height="3" fill="#FF6600"/>
      <rect x="32" y="16" width="6" height="4" fill="#FF6600"/>
      <rect x="32" y="24" width="6" height="3" fill="#FF6600"/>
      <rect x="32" y="32" width="6" height="2" fill="#FF6600"/>
      <rect x="42" y="16" width="6" height="4" fill="#FF6600"/>
      <rect x="42" y="36" width="6" height="3" fill="#FF6600"/>
      <text x="10" y="56" font-size="3" fill="currentColor" stroke="none">DNA bands</text>
    </svg>`
  },
  {
    id: 'path-ngs-sequencing',
    name: 'NGS Sequencing',
    domain: 'medicine',
    category: 'molecular-pathology',
    tags: ['NGS', 'next-gen', 'sequencing', 'genomic', 'panel'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="2"/>
      <rect x="12" y="16" width="4" height="32" fill="#228B22"/>
      <rect x="18" y="20" width="4" height="28" fill="#DC143C"/>
      <rect x="24" y="18" width="4" height="30" fill="#4169E1"/>
      <rect x="30" y="22" width="4" height="26" fill="#FFD700"/>
      <rect x="36" y="16" width="4" height="32" fill="#228B22"/>
      <rect x="42" y="24" width="4" height="24" fill="#DC143C"/>
      <rect x="48" y="20" width="4" height="28" fill="#4169E1"/>
      <text x="12" y="58" font-size="3" fill="currentColor" stroke="none">Sequence reads</text>
    </svg>`
  },
  {
    id: 'path-mutation-analysis',
    name: 'Mutation Analysis',
    domain: 'medicine',
    category: 'molecular-pathology',
    tags: ['mutation', 'EGFR', 'KRAS', 'BRAF', 'targetable'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 16h40v32H12z" fill="#E0E0E0" opacity="0.2"/>
      <path d="M12 16h40v32H12z"/>
      <text x="16" y="28" font-size="5" fill="#228B22" stroke="none">A T G C</text>
      <text x="16" y="38" font-size="5" fill="#228B22" stroke="none">A</text>
      <text x="24" y="38" font-size="5" fill="#DC143C" stroke="none">C</text>
      <text x="32" y="38" font-size="5" fill="#228B22" stroke="none">G C</text>
      <path d="M24 40l4 8"/>
      <text x="24" y="54" font-size="3" fill="#DC143C" stroke="none">T>C mutation</text>
    </svg>`
  },

  // ===========================================================================
  // DIGITAL PATHOLOGY
  // ===========================================================================
  {
    id: 'path-wsi-viewer',
    name: 'WSI Viewer',
    domain: 'medicine',
    category: 'digital-pathology',
    tags: ['WSI', 'viewer', 'whole slide', 'digital', 'navigation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="36" rx="2"/>
      <rect x="12" y="16" width="40" height="28" fill="#E8B4B8" opacity="0.4"/>
      <rect x="28" y="28" width="12" height="8" stroke="#4169E1" stroke-width="2"/>
      <path d="M8 52h48"/>
      <circle cx="20" cy="56" r="3"/>
      <circle cx="32" cy="56" r="3"/>
      <circle cx="44" cy="56" r="3"/>
      <text x="16" y="24" font-size="3" fill="currentColor" stroke="none">Navigate</text>
    </svg>`
  },
  {
    id: 'path-annotation-tool',
    name: 'Digital Annotation',
    domain: 'medicine',
    category: 'digital-pathology',
    tags: ['annotation', 'digital', 'markup', 'ROI', 'measurement'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="2" fill="#E8B4B8" opacity="0.3"/>
      <rect x="12" y="16" width="40" height="32" rx="2"/>
      <ellipse cx="28" cy="32" rx="8" ry="6" stroke="#DC143C" stroke-width="2" fill="none"/>
      <path d="M40 24l8 8-8 8" stroke="#4169E1" stroke-width="2"/>
      <line x1="20" y1="44" x2="36" y2="44" stroke="#228B22" stroke-width="2"/>
      <text x="38" y="46" font-size="3" fill="#228B22" stroke="none">2mm</text>
    </svg>`
  },
  {
    id: 'path-ai-analysis',
    name: 'AI-Assisted Analysis',
    domain: 'medicine',
    category: 'digital-pathology',
    tags: ['AI', 'machine learning', 'analysis', 'algorithm', 'automated'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="2" fill="#E8B4B8" opacity="0.3"/>
      <rect x="12" y="16" width="40" height="32" rx="2"/>
      <circle cx="24" cy="28" r="4" fill="#228B22" opacity="0.5"/>
      <circle cx="36" cy="24" r="3" fill="#228B22" opacity="0.5"/>
      <circle cx="40" cy="36" r="5" fill="#DC143C" opacity="0.5"/>
      <circle cx="28" cy="40" r="3" fill="#228B22" opacity="0.5"/>
      <path d="M48 24l8-8"/>
      <path d="M52 16h8v8"/>
      <text x="50" y="14" font-size="3" fill="#4169E1" stroke="none">AI</text>
      <text x="16" y="54" font-size="3" fill="currentColor" stroke="none">Cell detection</text>
    </svg>`
  },

  // ===========================================================================
  // ELECTRON MICROSCOPY
  // ===========================================================================
  {
    id: 'path-electron-microscope',
    name: 'Electron Microscope',
    domain: 'medicine',
    category: 'electron-microscopy',
    tags: ['electron', 'microscope', 'EM', 'TEM', 'ultrastructure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="48" rx="4"/>
      <circle cx="32" cy="20" r="8" fill="#4B0082" opacity="0.3"/>
      <rect x="24" y="32" width="16" height="8" fill="#808080" opacity="0.3"/>
      <rect x="26" y="44" width="12" height="8" fill="#E0E0E0" opacity="0.5"/>
      <path d="M28 20h8"/>
      <path d="M32 16v8"/>
      <circle cx="32" cy="20" r="2" fill="#00FF00"/>
      <text x="16" y="62" font-size="3" fill="currentColor" stroke="none">TEM</text>
    </svg>`
  },
  {
    id: 'path-podocyte-em',
    name: 'Podocyte (EM)',
    domain: 'medicine',
    category: 'electron-microscopy',
    tags: ['podocyte', 'foot process', 'kidney', 'GBM', 'ultrastructure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="28" width="48" height="8" fill="#4169E1" opacity="0.3"/>
      <rect x="8" y="28" width="48" height="8"/>
      <path d="M12 28v-8c2-2 2-4 0-6"/>
      <path d="M20 28v-8c2-2 2-4 0-6"/>
      <path d="M28 28v-8c2-2 2-4 0-6"/>
      <path d="M36 28v-8c2-2 2-4 0-6"/>
      <path d="M44 28v-8c2-2 2-4 0-6"/>
      <path d="M52 28v-8c2-2 2-4 0-6"/>
      <path d="M16 36v8"/>
      <path d="M32 36v8"/>
      <path d="M48 36v8"/>
      <text x="8" y="52" font-size="3" fill="currentColor" stroke="none">Foot processes / GBM</text>
    </svg>`
  },
  {
    id: 'path-immune-complex-em',
    name: 'Immune Complex (EM)',
    domain: 'medicine',
    category: 'electron-microscopy',
    tags: ['immune complex', 'deposits', 'subepithelial', 'electron dense'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="28" width="48" height="8" fill="#4169E1" opacity="0.3"/>
      <rect x="8" y="28" width="48" height="8"/>
      <ellipse cx="20" cy="24" rx="4" ry="3" fill="#000000" opacity="0.6"/>
      <ellipse cx="36" cy="24" rx="5" ry="3" fill="#000000" opacity="0.6"/>
      <ellipse cx="50" cy="24" rx="3" ry="2" fill="#000000" opacity="0.6"/>
      <ellipse cx="28" cy="40" rx="4" ry="3" fill="#000000" opacity="0.4"/>
      <ellipse cx="44" cy="40" rx="3" ry="2" fill="#000000" opacity="0.4"/>
      <text x="8" y="52" font-size="3" fill="currentColor" stroke="none">Electron-dense deposits</text>
    </svg>`
  },
];

export default pathologyIcons;
