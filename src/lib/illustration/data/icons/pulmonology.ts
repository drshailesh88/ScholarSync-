/**
 * Pulmonology Icon Library
 * Comprehensive SVG icons for pulmonary medicine
 *
 * Categories:
 * - Lung Anatomy (12 icons)
 * - Airways (10 icons)
 * - Pathology - Obstructive (12 icons)
 * - Pathology - Restrictive (10 icons)
 * - Pathology - Infectious (10 icons)
 * - Pathology - Vascular (8 icons)
 * - Pathology - Malignancy (6 icons)
 * - Equipment (12 icons)
 * - Procedures (10 icons)
 * - Sleep Medicine (6 icons)
 *
 * Total: 96 icons
 */

import type { IconDefinition } from './index';

export const pulmonologyIcons: IconDefinition[] = [
  // ===========================================================================
  // LUNG ANATOMY (12 icons)
  // ===========================================================================
  {
    id: 'pulm-lungs-bilateral',
    name: 'Lungs Bilateral',
    domain: 'medicine',
    category: 'lung-anatomy',
    tags: ['lungs', 'bilateral', 'anatomy', 'respiratory', 'thorax', 'chest'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v20"/>
      <path d="M28 12h8"/>
      <path d="M32 28c-8 0-18 4-20 20-1 8 4 12 10 12 8 0 10-6 10-10"/>
      <path d="M32 28c8 0 18 4 20 20 1 8-4 12-10 12-8 0-10-6-10-10"/>
      <ellipse cx="18" cy="40" rx="6" ry="8" fill="currentColor" opacity="0.1"/>
      <ellipse cx="46" cy="40" rx="6" ry="8" fill="currentColor" opacity="0.1"/>
    </svg>`
  },
  {
    id: 'pulm-rul',
    name: 'Right Upper Lobe',
    domain: 'medicine',
    category: 'lung-anatomy',
    tags: ['RUL', 'right upper lobe', 'lobe', 'anatomy', 'lung'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 12c12 0 20 4 24 8"/>
      <path d="M16 12c-4 4-6 12-4 20h28"/>
      <path d="M40 20v12"/>
      <path fill="currentColor" opacity="0.3" d="M16 12c12 0 20 4 24 8v12H12c-2-8 0-16 4-20z"/>
      <text x="22" y="26" font-size="8" fill="currentColor" stroke="none">RUL</text>
    </svg>`
  },
  {
    id: 'pulm-rml',
    name: 'Right Middle Lobe',
    domain: 'medicine',
    category: 'lung-anatomy',
    tags: ['RML', 'right middle lobe', 'lobe', 'anatomy', 'lung'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 24h28v12H8c0-6 2-10 4-12z"/>
      <path fill="currentColor" opacity="0.3" d="M12 24h28v12H8c0-6 2-10 4-12z"/>
      <text x="18" y="34" font-size="8" fill="currentColor" stroke="none">RML</text>
      <path d="M40 24v12" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'pulm-rll',
    name: 'Right Lower Lobe',
    domain: 'medicine',
    category: 'lung-anatomy',
    tags: ['RLL', 'right lower lobe', 'lobe', 'anatomy', 'lung'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 36h32c2 8-2 16-10 20H16c-8-4-10-12-8-20z"/>
      <path fill="currentColor" opacity="0.3" d="M8 36h32c2 8-2 16-10 20H16c-8-4-10-12-8-20z"/>
      <text x="18" y="50" font-size="8" fill="currentColor" stroke="none">RLL</text>
    </svg>`
  },
  {
    id: 'pulm-lul',
    name: 'Left Upper Lobe',
    domain: 'medicine',
    category: 'lung-anatomy',
    tags: ['LUL', 'left upper lobe', 'lobe', 'anatomy', 'lung', 'lingula'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M48 12c-12 0-20 4-24 8"/>
      <path d="M48 12c4 4 6 16 4 28H24"/>
      <path d="M24 20v20"/>
      <path fill="currentColor" opacity="0.3" d="M48 12c-12 0-20 4-24 8v20h28c2-12 0-24-4-28z"/>
      <text x="30" y="32" font-size="8" fill="currentColor" stroke="none">LUL</text>
    </svg>`
  },
  {
    id: 'pulm-lll',
    name: 'Left Lower Lobe',
    domain: 'medicine',
    category: 'lung-anatomy',
    tags: ['LLL', 'left lower lobe', 'lobe', 'anatomy', 'lung'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 36h28c2 8-2 16-10 20H30c-8-4-8-12-6-20z"/>
      <path fill="currentColor" opacity="0.3" d="M24 36h28c2 8-2 16-10 20H30c-8-4-8-12-6-20z"/>
      <text x="32" y="50" font-size="8" fill="currentColor" stroke="none">LLL</text>
    </svg>`
  },
  {
    id: 'pulm-bronchial-tree',
    name: 'Bronchial Tree',
    domain: 'medicine',
    category: 'lung-anatomy',
    tags: ['bronchial', 'tree', 'airways', 'bronchi', 'branching'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v12" stroke-width="3"/>
      <path d="M32 16l-16 12" stroke-width="2.5"/>
      <path d="M32 16l16 12" stroke-width="2.5"/>
      <path d="M16 28l-8 8"/>
      <path d="M16 28l8 10"/>
      <path d="M48 28l8 8"/>
      <path d="M48 28l-8 10"/>
      <path d="M8 36l-4 6"/>
      <path d="M8 36l4 8"/>
      <path d="M24 38l-4 8"/>
      <path d="M24 38l4 8"/>
      <path d="M40 38l-4 8"/>
      <path d="M40 38l4 8"/>
      <path d="M56 36l4 6"/>
      <path d="M56 36l-4 8"/>
    </svg>`
  },
  {
    id: 'pulm-alveoli',
    name: 'Alveoli',
    domain: 'medicine',
    category: 'lung-anatomy',
    tags: ['alveoli', 'alveolus', 'gas exchange', 'respiratory unit', 'acinus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v16"/>
      <circle cx="20" cy="28" r="8" fill="currentColor" opacity="0.1"/>
      <circle cx="44" cy="28" r="8" fill="currentColor" opacity="0.1"/>
      <circle cx="14" cy="42" r="8" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="38" r="8" fill="currentColor" opacity="0.1"/>
      <circle cx="50" cy="42" r="8" fill="currentColor" opacity="0.1"/>
      <circle cx="24" cy="54" r="6" fill="currentColor" opacity="0.1"/>
      <circle cx="40" cy="54" r="6" fill="currentColor" opacity="0.1"/>
      <circle cx="20" cy="28" r="8"/>
      <circle cx="44" cy="28" r="8"/>
      <circle cx="14" cy="42" r="8"/>
      <circle cx="32" cy="38" r="8"/>
      <circle cx="50" cy="42" r="8"/>
      <circle cx="24" cy="54" r="6"/>
      <circle cx="40" cy="54" r="6"/>
    </svg>`
  },
  {
    id: 'pulm-diaphragm',
    name: 'Diaphragm',
    domain: 'medicine',
    category: 'lung-anatomy',
    tags: ['diaphragm', 'muscle', 'breathing', 'respiration', 'dome'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 40c8-16 24-20 28-20s20 4 28 20" stroke-width="2"/>
      <path d="M4 40c8-16 24-20 28-20s20 4 28 20" fill="currentColor" opacity="0.2"/>
      <path d="M20 32v-16"/>
      <path d="M44 32v-16"/>
      <ellipse cx="20" cy="22" rx="8" ry="10"/>
      <ellipse cx="44" cy="22" rx="8" ry="10"/>
      <path d="M32 28v12" stroke-dasharray="2 2"/>
      <text x="26" y="56" font-size="6" fill="currentColor" stroke="none">Diaphragm</text>
    </svg>`
  },
  {
    id: 'pulm-pleura',
    name: 'Pleura',
    domain: 'medicine',
    category: 'lung-anatomy',
    tags: ['pleura', 'visceral', 'parietal', 'pleural space', 'membrane'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 16c-4 8-4 24 0 32 4 4 16 8 20 8s16-4 20-8c4-8 4-24 0-32-4-4-16-8-20-8s-16 4-20 8z"/>
      <path d="M16 18c-3 6-3 22 0 28 3 3 13 7 16 7s13-4 16-7c3-6 3-22 0-28-3-3-13-7-16-7s-13 4-16 7z" stroke-dasharray="3 2"/>
      <path d="M8 32h4"/>
      <path d="M52 32h4"/>
      <text x="4" y="58" font-size="5" fill="currentColor" stroke="none">Parietal</text>
      <text x="40" y="58" font-size="5" fill="currentColor" stroke="none">Visceral</text>
    </svg>`
  },
  {
    id: 'pulm-hilum',
    name: 'Hilum',
    domain: 'medicine',
    category: 'lung-anatomy',
    tags: ['hilum', 'hilar', 'root', 'vessels', 'bronchus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="12" ry="16" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="12" ry="16"/>
      <path d="M32 8v8" stroke-width="2"/>
      <path d="M26 20l-10 16" stroke="red"/>
      <path d="M38 20l10 16" stroke="blue"/>
      <path d="M32 48v8"/>
      <circle cx="32" cy="28" r="3"/>
      <text x="8" y="40" font-size="5" fill="red" stroke="none">PA</text>
      <text x="50" y="40" font-size="5" fill="blue" stroke="none">PV</text>
      <text x="24" y="60" font-size="5" fill="currentColor" stroke="none">Hilum</text>
    </svg>`
  },
  {
    id: 'pulm-mediastinum',
    name: 'Mediastinum',
    domain: 'medicine',
    category: 'lung-anatomy',
    tags: ['mediastinum', 'middle', 'compartment', 'thorax', 'central'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="48" rx="4" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="8" width="16" height="48" rx="4"/>
      <path d="M8 16c6 4 12 8 16 8"/>
      <path d="M8 48c6-4 12-8 16-8"/>
      <path d="M56 16c-6 4-12 8-16 8"/>
      <path d="M56 48c-6-4-12-8-16-8"/>
      <ellipse cx="32" cy="20" rx="4" ry="3"/>
      <path d="M32 24v8"/>
      <ellipse cx="32" cy="38" rx="6" ry="4"/>
      <line x1="28" y1="48" x2="28" y2="54" stroke-dasharray="2 2"/>
      <line x1="36" y1="48" x2="36" y2="54" stroke-dasharray="2 2"/>
    </svg>`
  },

  // ===========================================================================
  // AIRWAYS (10 icons)
  // ===========================================================================
  {
    id: 'pulm-trachea',
    name: 'Trachea',
    domain: 'medicine',
    category: 'airways',
    tags: ['trachea', 'windpipe', 'airway', 'cartilage', 'rings'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v48H24z"/>
      <path d="M24 14h16"/>
      <path d="M24 22h16"/>
      <path d="M24 30h16"/>
      <path d="M24 38h16"/>
      <path d="M24 46h16"/>
      <ellipse cx="32" cy="8" rx="8" ry="3"/>
      <path d="M24 56l-8 4"/>
      <path d="M40 56l8 4"/>
      <text x="44" y="32" font-size="5" fill="currentColor" stroke="none">C-rings</text>
    </svg>`
  },
  {
    id: 'pulm-carina',
    name: 'Carina',
    domain: 'medicine',
    category: 'airways',
    tags: ['carina', 'bifurcation', 'trachea', 'bronchi', 'split'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v20" stroke-width="3"/>
      <path d="M32 28l-20 24" stroke-width="2.5"/>
      <path d="M32 28l20 24" stroke-width="2.5"/>
      <circle cx="32" cy="28" r="4" fill="currentColor"/>
      <text x="20" y="24" font-size="6" fill="currentColor" stroke="none">Carina</text>
      <text x="4" y="56" font-size="5" fill="currentColor" stroke="none">L</text>
      <text x="54" y="56" font-size="5" fill="currentColor" stroke="none">R</text>
    </svg>`
  },
  {
    id: 'pulm-mainstem-bronchi',
    name: 'Mainstem Bronchi',
    domain: 'medicine',
    category: 'airways',
    tags: ['mainstem', 'bronchi', 'left', 'right', 'main bronchus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v16" stroke-width="3"/>
      <path d="M32 20l-20 16" stroke-width="2.5"/>
      <path d="M32 20l16 10" stroke-width="2.5"/>
      <path d="M12 36l-4 12"/>
      <path d="M12 36l8 8"/>
      <path d="M48 30l8 12"/>
      <path d="M48 30l-6 10"/>
      <text x="2" y="32" font-size="5" fill="currentColor" stroke="none">LMB</text>
      <text x="50" y="26" font-size="5" fill="currentColor" stroke="none">RMB</text>
      <path d="M28 16c-2 0-4 1-4 2" stroke-dasharray="1 1"/>
      <path d="M36 16c2 0 4 1 4 2" stroke-dasharray="1 1"/>
    </svg>`
  },
  {
    id: 'pulm-bronchioles',
    name: 'Bronchioles',
    domain: 'medicine',
    category: 'airways',
    tags: ['bronchioles', 'small airways', 'conducting', 'airways'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v12" stroke-width="2"/>
      <path d="M32 20l-12 8"/>
      <path d="M32 20l12 8"/>
      <path d="M20 28l-8 6"/>
      <path d="M20 28l4 8"/>
      <path d="M44 28l8 6"/>
      <path d="M44 28l-4 8"/>
      <path d="M12 34l-4 4"/>
      <path d="M12 34l2 6"/>
      <path d="M24 36l-2 6"/>
      <path d="M24 36l4 6"/>
      <path d="M40 36l-4 6"/>
      <path d="M40 36l2 6"/>
      <path d="M52 34l4 4"/>
      <path d="M52 34l-2 6"/>
      <circle cx="8" cy="42" r="3" fill="currentColor" opacity="0.2"/>
      <circle cx="16" cy="46" r="3" fill="currentColor" opacity="0.2"/>
      <circle cx="26" cy="48" r="3" fill="currentColor" opacity="0.2"/>
      <circle cx="38" cy="48" r="3" fill="currentColor" opacity="0.2"/>
      <circle cx="48" cy="46" r="3" fill="currentColor" opacity="0.2"/>
      <circle cx="56" cy="42" r="3" fill="currentColor" opacity="0.2"/>
    </svg>`
  },
  {
    id: 'pulm-terminal-bronchiole',
    name: 'Terminal Bronchiole',
    domain: 'medicine',
    category: 'airways',
    tags: ['terminal', 'bronchiole', 'conducting', 'airway', 'end'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v20"/>
      <path d="M32 28l-8 8"/>
      <path d="M32 28l8 8"/>
      <circle cx="24" cy="42" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="40" cy="42" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="18" cy="52" r="5" fill="currentColor" opacity="0.2"/>
      <circle cx="30" cy="52" r="5" fill="currentColor" opacity="0.2"/>
      <circle cx="34" cy="52" r="5" fill="currentColor" opacity="0.2"/>
      <circle cx="46" cy="52" r="5" fill="currentColor" opacity="0.2"/>
      <path d="M24 36l-6 10"/>
      <path d="M24 36l6 10"/>
      <path d="M40 36l-6 10"/>
      <path d="M40 36l6 10"/>
      <text x="6" y="24" font-size="5" fill="currentColor" stroke="none">Terminal</text>
    </svg>`
  },
  {
    id: 'pulm-respiratory-bronchiole',
    name: 'Respiratory Bronchiole',
    domain: 'medicine',
    category: 'airways',
    tags: ['respiratory', 'bronchiole', 'gas exchange', 'transitional'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v16"/>
      <circle cx="26" cy="24" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="38" cy="24" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M32 20l-10 12"/>
      <path d="M32 20l10 12"/>
      <circle cx="18" cy="36" r="5" fill="currentColor" opacity="0.3"/>
      <circle cx="46" cy="36" r="5" fill="currentColor" opacity="0.3"/>
      <path d="M22 32l-8 12"/>
      <path d="M42 32l8 12"/>
      <circle cx="12" cy="48" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="52" cy="48" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="26" cy="44" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="38" cy="44" r="4" fill="currentColor" opacity="0.3"/>
      <text x="18" y="60" font-size="5" fill="currentColor" stroke="none">Resp. Bronchiole</text>
    </svg>`
  },
  {
    id: 'pulm-surfactant',
    name: 'Surfactant',
    domain: 'medicine',
    category: 'airways',
    tags: ['surfactant', 'type II', 'pneumocyte', 'surface tension', 'DPPC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M16 24c4 1 8 1 12 0"/>
      <path d="M36 24c4 1 8 1 12 0"/>
      <path d="M14 32c4 1 10 1 14 0"/>
      <path d="M36 32c4 1 10 1 14 0"/>
      <path d="M16 40c4 1 8 1 12 0"/>
      <path d="M36 40c4 1 8 1 12 0"/>
      <circle cx="20" cy="20" r="2" fill="currentColor"/>
      <circle cx="44" cy="20" r="2" fill="currentColor"/>
      <circle cx="20" cy="44" r="2" fill="currentColor"/>
      <circle cx="44" cy="44" r="2" fill="currentColor"/>
      <text x="12" y="58" font-size="5" fill="currentColor" stroke="none">Surfactant Layer</text>
    </svg>`
  },
  {
    id: 'pulm-cilia',
    name: 'Cilia',
    domain: 'medicine',
    category: 'airways',
    tags: ['cilia', 'mucociliary', 'clearance', 'epithelium', 'pseudostratified'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="40" width="48" height="16" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="40" width="48" height="16" rx="2"/>
      <path d="M12 40c0-8 1-12 2-16"/>
      <path d="M18 40c0-8 1-14 3-18"/>
      <path d="M24 40c0-8 1-12 2-16"/>
      <path d="M30 40c0-8 1-14 3-18"/>
      <path d="M36 40c0-8 1-12 2-16"/>
      <path d="M42 40c0-8 1-14 3-18"/>
      <path d="M48 40c0-8 1-12 2-16"/>
      <ellipse cx="32" cy="16" rx="24" ry="4" fill="currentColor" opacity="0.3"/>
      <text x="20" y="12" font-size="5" fill="currentColor" stroke="none">Mucus</text>
      <circle cx="16" cy="48" r="3"/>
      <circle cx="32" cy="48" r="3"/>
      <circle cx="48" cy="48" r="3"/>
    </svg>`
  },
  {
    id: 'pulm-goblet-cell',
    name: 'Goblet Cell',
    domain: 'medicine',
    category: 'airways',
    tags: ['goblet', 'cell', 'mucus', 'secretion', 'epithelium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 56h16v-8c0-4 8-8 8-24 0-12-8-16-16-16s-16 4-16 16c0 16 8 20 8 24v8z"/>
      <ellipse cx="32" cy="24" rx="10" ry="8" fill="currentColor" opacity="0.3"/>
      <circle cx="28" cy="22" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="36" cy="22" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="28" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="16" r="3"/>
      <path d="M32 8v-4"/>
      <text x="18" y="62" font-size="5" fill="currentColor" stroke="none">Goblet Cell</text>
    </svg>`
  },
  {
    id: 'pulm-airway-smooth-muscle',
    name: 'Airway Smooth Muscle',
    domain: 'medicine',
    category: 'airways',
    tags: ['smooth muscle', 'bronchoconstriction', 'bronchodilation', 'airway'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="12"/>
      <ellipse cx="32" cy="32" rx="12" ry="6" fill="currentColor" opacity="0.2"/>
      <path d="M16 26c4 1 8 1 12 0"/>
      <path d="M36 26c4 1 8 1 12 0"/>
      <path d="M16 38c4-1 8-1 12 0"/>
      <path d="M36 38c4-1 8-1 12 0"/>
      <path d="M8 20l8 6"/>
      <path d="M8 44l8-6"/>
      <path d="M56 20l-8 6"/>
      <path d="M56 44l-8-6"/>
      <text x="10" y="58" font-size="5" fill="currentColor" stroke="none">Smooth Muscle</text>
    </svg>`
  },

  // ===========================================================================
  // PATHOLOGY - OBSTRUCTIVE (12 icons)
  // ===========================================================================
  {
    id: 'pulm-copd',
    name: 'COPD',
    domain: 'medicine',
    category: 'obstructive',
    tags: ['COPD', 'chronic', 'obstructive', 'pulmonary', 'disease', 'smoking'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v12"/>
      <path d="M32 20c-12 0-22 8-22 24 0 8 6 12 12 12 6 0 10-4 10-8"/>
      <path d="M32 20c12 0 22 8 22 24 0 8-6 12-12 12-6 0-10-4-10-8"/>
      <circle cx="16" cy="36" r="6" stroke-dasharray="2 2"/>
      <circle cx="24" cy="44" r="5" stroke-dasharray="2 2"/>
      <circle cx="48" cy="36" r="6" stroke-dasharray="2 2"/>
      <circle cx="40" cy="44" r="5" stroke-dasharray="2 2"/>
      <text x="22" y="60" font-size="6" fill="currentColor" stroke="none">COPD</text>
    </svg>`
  },
  {
    id: 'pulm-emphysema',
    name: 'Emphysema',
    domain: 'medicine',
    category: 'obstructive',
    tags: ['emphysema', 'destruction', 'alveolar', 'air trapping', 'hyperinflation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="20" r="12" stroke-dasharray="3 2"/>
      <circle cx="44" cy="20" r="12" stroke-dasharray="3 2"/>
      <circle cx="16" cy="40" r="10" stroke-dasharray="3 2"/>
      <circle cx="48" cy="40" r="10" stroke-dasharray="3 2"/>
      <circle cx="32" cy="50" r="8" stroke-dasharray="3 2"/>
      <path d="M28 12l8 0" stroke-dasharray="1 1"/>
      <path d="M20 32l24 0" stroke-dasharray="1 1"/>
      <text x="10" y="60" font-size="5" fill="currentColor" stroke="none">Alveolar Destruction</text>
    </svg>`
  },
  {
    id: 'pulm-chronic-bronchitis',
    name: 'Chronic Bronchitis',
    domain: 'medicine',
    category: 'obstructive',
    tags: ['chronic bronchitis', 'mucus', 'hypersecretion', 'cough', 'sputum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v16" stroke-width="2"/>
      <path d="M32 20l-16 12" stroke-width="2"/>
      <path d="M32 20l16 12" stroke-width="2"/>
      <ellipse cx="20" cy="28" rx="8" ry="4" fill="currentColor" opacity="0.4"/>
      <ellipse cx="44" cy="28" rx="8" ry="4" fill="currentColor" opacity="0.4"/>
      <ellipse cx="16" cy="40" rx="10" ry="4" fill="currentColor" opacity="0.4"/>
      <ellipse cx="48" cy="40" rx="10" ry="4" fill="currentColor" opacity="0.4"/>
      <path d="M28 10h8" stroke-width="3" fill="currentColor" opacity="0.4"/>
      <text x="10" y="58" font-size="5" fill="currentColor" stroke="none">Mucus Hypersecretion</text>
    </svg>`
  },
  {
    id: 'pulm-asthma',
    name: 'Asthma',
    domain: 'medicine',
    category: 'obstructive',
    tags: ['asthma', 'bronchospasm', 'reversible', 'wheezing', 'inflammation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <ellipse cx="32" cy="32" rx="6" ry="16" fill="currentColor" opacity="0.2"/>
      <path d="M18 20c4 1 8 1 12 0" stroke="red"/>
      <path d="M34 20c4 1 8 1 12 0" stroke="red"/>
      <path d="M18 44c4-1 8-1 12 0" stroke="red"/>
      <path d="M34 44c4-1 8-1 12 0" stroke="red"/>
      <circle cx="16" cy="28" r="2" fill="currentColor"/>
      <circle cx="48" cy="28" r="2" fill="currentColor"/>
      <circle cx="16" cy="36" r="2" fill="currentColor"/>
      <circle cx="48" cy="36" r="2" fill="currentColor"/>
      <text x="18" y="60" font-size="5" fill="currentColor" stroke="none">Bronchospasm</text>
    </svg>`
  },
  {
    id: 'pulm-bronchiectasis',
    name: 'Bronchiectasis',
    domain: 'medicine',
    category: 'obstructive',
    tags: ['bronchiectasis', 'dilation', 'permanent', 'airways', 'infection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v12"/>
      <path d="M32 16c-4 4-8 12-10 24"/>
      <path d="M32 16c4 4 8 12 10 24"/>
      <ellipse cx="20" cy="36" rx="8" ry="4"/>
      <ellipse cx="44" cy="36" rx="8" ry="4"/>
      <ellipse cx="18" cy="48" rx="10" ry="5"/>
      <ellipse cx="46" cy="48" rx="10" ry="5"/>
      <path d="M22 40l-4 8" fill="currentColor" opacity="0.3"/>
      <path d="M42 40l4 8" fill="currentColor" opacity="0.3"/>
      <text x="8" y="60" font-size="5" fill="currentColor" stroke="none">Dilated Airways</text>
    </svg>`
  },
  {
    id: 'pulm-mucus-plugging',
    name: 'Mucus Plugging',
    domain: 'medicine',
    category: 'obstructive',
    tags: ['mucus', 'plug', 'obstruction', 'airway', 'secretions'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v16" stroke-width="2"/>
      <path d="M32 20l-16 16"/>
      <path d="M32 20l16 16"/>
      <ellipse cx="20" cy="32" rx="6" ry="3" fill="currentColor" opacity="0.6"/>
      <ellipse cx="44" cy="32" rx="6" ry="3" fill="currentColor" opacity="0.6"/>
      <ellipse cx="32" cy="14" rx="4" ry="2" fill="currentColor" opacity="0.6"/>
      <circle cx="16" cy="42" r="6"/>
      <circle cx="48" cy="42" r="6"/>
      <text x="22" y="58" font-size="6" fill="currentColor" stroke="none">Plug</text>
    </svg>`
  },
  {
    id: 'pulm-air-trapping',
    name: 'Air Trapping',
    domain: 'medicine',
    category: 'obstructive',
    tags: ['air trapping', 'hyperinflation', 'expiratory', 'obstruction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 12c-8 8-8 32 0 40"/>
      <path d="M48 12c8 8 8 32 0 40"/>
      <path d="M16 52c8 4 24 4 32 0"/>
      <path d="M16 12c8-4 24-4 32 0"/>
      <circle cx="24" cy="28" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="40" cy="28" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="44" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="40" cy="44" r="6" fill="currentColor" opacity="0.2"/>
      <path d="M28 20l-4-4"/>
      <path d="M36 20l4-4"/>
      <path d="M24 36l0-4"/>
      <path d="M40 36l0-4"/>
      <text x="16" y="60" font-size="5" fill="currentColor" stroke="none">Air Trapped</text>
    </svg>`
  },
  {
    id: 'pulm-bullae',
    name: 'Bullae',
    domain: 'medicine',
    category: 'obstructive',
    tags: ['bullae', 'bulla', 'bleb', 'emphysematous', 'air space'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-12 8-12 40 0 48"/>
      <path d="M44 8c12 8 12 40 0 48"/>
      <path d="M20 56c8 4 16 4 24 0"/>
      <path d="M20 8c8-4 16-4 24 0"/>
      <circle cx="28" cy="24" r="12" stroke-dasharray="3 2"/>
      <circle cx="40" cy="40" r="10" stroke-dasharray="3 2"/>
      <circle cx="20" cy="44" r="6" stroke-dasharray="3 2"/>
      <text x="22" y="26" font-size="6" fill="currentColor" stroke="none">Bulla</text>
    </svg>`
  },
  {
    id: 'pulm-asthma-attack',
    name: 'Asthma Attack',
    domain: 'medicine',
    category: 'obstructive',
    tags: ['asthma', 'attack', 'acute', 'exacerbation', 'severe'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="28"/>
      <ellipse cx="32" cy="32" rx="4" ry="20" fill="currentColor" opacity="0.3"/>
      <path d="M14 18c6 2 12 2 18 0" stroke="red" stroke-width="2"/>
      <path d="M32 18c6 2 12 2 18 0" stroke="red" stroke-width="2"/>
      <path d="M14 46c6-2 12-2 18 0" stroke="red" stroke-width="2"/>
      <path d="M32 46c6-2 12-2 18 0" stroke="red" stroke-width="2"/>
      <circle cx="10" cy="28" r="3" fill="red"/>
      <circle cx="54" cy="28" r="3" fill="red"/>
      <circle cx="10" cy="36" r="3" fill="red"/>
      <circle cx="54" cy="36" r="3" fill="red"/>
      <text x="18" y="60" font-size="5" fill="currentColor" stroke="none">Acute Attack</text>
    </svg>`
  },
  {
    id: 'pulm-expiratory-wheeze',
    name: 'Expiratory Wheeze',
    domain: 'medicine',
    category: 'obstructive',
    tags: ['wheeze', 'expiratory', 'obstruction', 'sound', 'auscultation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="32" rx="12" ry="20"/>
      <ellipse cx="20" cy="32" rx="4" ry="14" fill="currentColor" opacity="0.2"/>
      <path d="M36 16c4 1 8 2 12 1"/>
      <path d="M36 24c6 2 12 2 18 0"/>
      <path d="M36 32c4-1 8-2 12-1"/>
      <path d="M36 40c6 2 12 2 18 0"/>
      <path d="M36 48c4 1 8 2 12 1"/>
      <path d="M32 28l4-8"/>
      <path d="M32 36l4 8"/>
      <text x="38" y="58" font-size="5" fill="currentColor" stroke="none">Wheeze</text>
    </svg>`
  },
  {
    id: 'pulm-fev1-fvc',
    name: 'FEV1/FVC Ratio',
    domain: 'medicine',
    category: 'obstructive',
    tags: ['FEV1', 'FVC', 'ratio', 'spirometry', 'obstruction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56h48"/>
      <path d="M8 8v48"/>
      <path d="M12 52c4-20 8-32 16-38 8-6 20-6 28-2" stroke="blue" stroke-width="2"/>
      <path d="M12 52c2-8 4-16 8-22 4-6 12-12 20-14" stroke="red" stroke-width="2" stroke-dasharray="3 2"/>
      <line x1="28" y1="14" x2="28" y2="52" stroke-dasharray="2 2"/>
      <text x="4" y="32" font-size="5" fill="currentColor" stroke="none">Vol</text>
      <text x="26" y="62" font-size="5" fill="currentColor" stroke="none">1s</text>
      <text x="44" y="8" font-size="5" fill="blue" stroke="none">Normal</text>
      <text x="36" y="30" font-size="5" fill="red" stroke="none">Obstr</text>
    </svg>`
  },
  {
    id: 'pulm-peak-flow',
    name: 'Peak Flow',
    domain: 'medicine',
    category: 'obstructive',
    tags: ['peak flow', 'PEF', 'meter', 'monitoring', 'asthma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="4"/>
      <rect x="20" y="24" width="24" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M22 36h20"/>
      <path d="M22 32h16"/>
      <path d="M22 28h12"/>
      <rect x="12" y="32" width="4" height="8" rx="1"/>
      <path d="M8 36h4"/>
      <rect x="28" y="44" width="8" height="12" rx="2"/>
      <text x="20" y="18" font-size="5" fill="currentColor" stroke="none">Peak Flow</text>
      <text x="24" y="52" font-size="4" fill="currentColor" stroke="none">L/min</text>
    </svg>`
  },

  // ===========================================================================
  // PATHOLOGY - RESTRICTIVE (10 icons)
  // ===========================================================================
  {
    id: 'pulm-pulmonary-fibrosis',
    name: 'Pulmonary Fibrosis',
    domain: 'medicine',
    category: 'restrictive',
    tags: ['fibrosis', 'IPF', 'restrictive', 'scarring', 'interstitial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 12c-10 8-12 28-4 40"/>
      <path d="M44 12c10 8 12 28 4 40"/>
      <path d="M16 52c8 4 24 4 32 0"/>
      <path d="M12 24l8 4"/>
      <path d="M16 32l10 2"/>
      <path d="M14 40l12 0"/>
      <path d="M52 24l-8 4"/>
      <path d="M48 32l-10 2"/>
      <path d="M50 40l-12 0"/>
      <path d="M24 28l4 4"/>
      <path d="M40 28l-4 4"/>
      <path d="M28 44l8 0"/>
      <text x="8" y="60" font-size="5" fill="currentColor" stroke="none">Fibrotic Changes</text>
    </svg>`
  },
  {
    id: 'pulm-ild',
    name: 'Interstitial Lung Disease',
    domain: 'medicine',
    category: 'restrictive',
    tags: ['ILD', 'interstitial', 'lung disease', 'diffuse', 'parenchymal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-12 8-14 36-4 48"/>
      <path d="M44 8c12 8 14 36 4 48"/>
      <circle cx="20" cy="24" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="20" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="24" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="16" cy="36" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="28" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="40" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="48" cy="36" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="24" cy="44" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="36" cy="44" r="4" fill="currentColor" opacity="0.3"/>
      <text x="24" y="58" font-size="6" fill="currentColor" stroke="none">ILD</text>
    </svg>`
  },
  {
    id: 'pulm-sarcoidosis',
    name: 'Sarcoidosis',
    domain: 'medicine',
    category: 'restrictive',
    tags: ['sarcoidosis', 'granuloma', 'hilar', 'lymphadenopathy', 'non-caseating'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 12c-10 6-12 28-4 40"/>
      <path d="M44 12c10 6 12 28 4 40"/>
      <circle cx="32" cy="20" r="8" fill="currentColor" opacity="0.4"/>
      <circle cx="24" cy="28" r="6" fill="currentColor" opacity="0.4"/>
      <circle cx="40" cy="28" r="6" fill="currentColor" opacity="0.4"/>
      <circle cx="20" cy="40" r="5"/>
      <circle cx="32" cy="38" r="5"/>
      <circle cx="44" cy="40" r="5"/>
      <text x="10" y="58" font-size="5" fill="currentColor" stroke="none">Granulomas</text>
    </svg>`
  },
  {
    id: 'pulm-pneumoconiosis',
    name: 'Pneumoconiosis',
    domain: 'medicine',
    category: 'restrictive',
    tags: ['pneumoconiosis', 'occupational', 'dust', 'silicosis', 'asbestosis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-12 8-14 36-4 48"/>
      <path d="M44 8c12 8 14 36 4 48"/>
      <circle cx="18" cy="24" r="3" fill="currentColor"/>
      <circle cx="28" cy="20" r="2" fill="currentColor"/>
      <circle cx="36" cy="22" r="2" fill="currentColor"/>
      <circle cx="46" cy="26" r="3" fill="currentColor"/>
      <circle cx="14" cy="36" r="2" fill="currentColor"/>
      <circle cx="24" cy="34" r="3" fill="currentColor"/>
      <circle cx="34" cy="32" r="2" fill="currentColor"/>
      <circle cx="44" cy="36" r="2" fill="currentColor"/>
      <circle cx="50" cy="40" r="3" fill="currentColor"/>
      <circle cx="20" cy="46" r="2" fill="currentColor"/>
      <circle cx="32" cy="44" r="3" fill="currentColor"/>
      <circle cx="44" cy="48" r="2" fill="currentColor"/>
      <text x="16" y="60" font-size="5" fill="currentColor" stroke="none">Dust Deposits</text>
    </svg>`
  },
  {
    id: 'pulm-pleural-effusion',
    name: 'Pleural Effusion',
    domain: 'medicine',
    category: 'restrictive',
    tags: ['pleural', 'effusion', 'fluid', 'exudate', 'transudate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8c-8 8-8 36 0 48"/>
      <path d="M48 8c8 8 8 36 0 48"/>
      <path d="M16 56c8 4 24 4 32 0"/>
      <path d="M8 40c8 1 16 1 24 0" fill="currentColor" opacity="0.3"/>
      <path d="M8 40c0 10 4 16 8 16 4 0 8 2 16 0v-16c-8 1-16 1-24 0z" fill="currentColor" opacity="0.3"/>
      <path d="M8 40c8 1 16 1 24 0"/>
      <text x="10" y="52" font-size="5" fill="currentColor" stroke="none">Fluid</text>
      <path d="M40 16c4 4 8 16 8 24"/>
      <path d="M40 16c-4 4-8 12-8 20"/>
    </svg>`
  },
  {
    id: 'pulm-pneumothorax',
    name: 'Pneumothorax',
    domain: 'medicine',
    category: 'restrictive',
    tags: ['pneumothorax', 'collapsed', 'lung', 'air', 'pleural space'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8c-8 8-8 40 0 48"/>
      <path d="M48 8c8 8 8 40 0 48"/>
      <path d="M16 56c8 4 24 4 32 0"/>
      <path d="M40 20c-4 6-6 20-2 32"/>
      <path d="M40 20c4 4 8 16 8 24"/>
      <path d="M38 52c4 2 8 2 10 0"/>
      <path d="M20 16c-4 6-6 24-4 36"/>
      <path d="M20 16c4 4 10 16 10 24"/>
      <path d="M16 52c4 2 10 2 14 0"/>
      <text x="24" y="36" font-size="6" fill="currentColor" stroke="none">Air</text>
      <circle cx="32" cy="28" r="2"/>
      <circle cx="36" cy="32" r="1"/>
      <circle cx="28" cy="34" r="1"/>
    </svg>`
  },
  {
    id: 'pulm-atelectasis',
    name: 'Atelectasis',
    domain: 'medicine',
    category: 'restrictive',
    tags: ['atelectasis', 'collapse', 'lung', 'lobe', 'segment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-12 8-14 36-4 48"/>
      <path d="M44 8c12 8 14 36 4 48"/>
      <path d="M32 8v12"/>
      <path d="M32 20l-12 8"/>
      <path d="M32 20l12 8"/>
      <path d="M20 28l-8 16" fill="currentColor" opacity="0.5"/>
      <path d="M12 44c4 4 12 4 16 0"/>
      <path d="M20 28c-2 8-6 12-8 16h16c-4-4-6-8-8-16z" fill="currentColor" opacity="0.5"/>
      <text x="10" y="40" font-size="5" fill="currentColor" stroke="none">Collapsed</text>
      <circle cx="44" cy="36" r="8"/>
      <circle cx="44" cy="48" r="6"/>
    </svg>`
  },
  {
    id: 'pulm-tension-pneumo',
    name: 'Tension Pneumothorax',
    domain: 'medicine',
    category: 'restrictive',
    tags: ['tension', 'pneumothorax', 'emergency', 'mediastinal shift', 'collapsed'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 8c-8 8-8 40 0 48"/>
      <path d="M52 8c6 8 6 40 0 48"/>
      <path d="M12 56c10 4 30 4 40 0"/>
      <path d="M16 20c-2 8-2 20 0 28"/>
      <path d="M16 20c2 4 4 16 4 20"/>
      <path d="M16 48c2 2 4 2 4 0"/>
      <rect x="28" y="16" width="8" height="32" rx="2" fill="currentColor" opacity="0.3"/>
      <path d="M32 12l4 4"/>
      <path d="M32 12l-4 4"/>
      <text x="36" y="34" font-size="8" fill="currentColor" stroke="none">!</text>
      <circle cx="44" cy="28" r="2"/>
      <circle cx="48" cy="32" r="1"/>
      <circle cx="46" cy="38" r="2"/>
      <text x="36" y="58" font-size="5" fill="currentColor" stroke="none">Tension</text>
    </svg>`
  },
  {
    id: 'pulm-uip-pattern',
    name: 'UIP Pattern',
    domain: 'medicine',
    category: 'restrictive',
    tags: ['UIP', 'usual interstitial pneumonia', 'honeycombing', 'basal', 'IPF'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8c-10 8-12 36-4 48"/>
      <path d="M48 8c10 8 12 36 4 48"/>
      <circle cx="14" cy="44" r="4" stroke-dasharray="2 1"/>
      <circle cx="22" cy="48" r="3" stroke-dasharray="2 1"/>
      <circle cx="30" cy="46" r="4" stroke-dasharray="2 1"/>
      <circle cx="38" cy="48" r="3" stroke-dasharray="2 1"/>
      <circle cx="46" cy="44" r="4" stroke-dasharray="2 1"/>
      <circle cx="18" cy="38" r="3" stroke-dasharray="2 1"/>
      <circle cx="34" cy="38" r="3" stroke-dasharray="2 1"/>
      <circle cx="50" cy="38" r="3" stroke-dasharray="2 1"/>
      <text x="12" y="60" font-size="5" fill="currentColor" stroke="none">Honeycombing</text>
    </svg>`
  },
  {
    id: 'pulm-nsip-pattern',
    name: 'NSIP Pattern',
    domain: 'medicine',
    category: 'restrictive',
    tags: ['NSIP', 'nonspecific interstitial pneumonia', 'ground glass', 'reticular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8c-10 8-12 36-4 48"/>
      <path d="M48 8c10 8 12 36 4 48"/>
      <rect x="14" y="24" width="36" height="24" rx="4" fill="currentColor" opacity="0.2"/>
      <path d="M16 28h32"/>
      <path d="M16 34h32"/>
      <path d="M16 40h32"/>
      <path d="M20 24v24"/>
      <path d="M28 24v24"/>
      <path d="M36 24v24"/>
      <path d="M44 24v24"/>
      <text x="22" y="58" font-size="6" fill="currentColor" stroke="none">NSIP</text>
    </svg>`
  },

  // ===========================================================================
  // PATHOLOGY - INFECTIOUS (10 icons)
  // ===========================================================================
  {
    id: 'pulm-pneumonia-lobar',
    name: 'Lobar Pneumonia',
    domain: 'medicine',
    category: 'infectious',
    tags: ['pneumonia', 'lobar', 'consolidation', 'bacterial', 'infection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-12 8-14 36-4 48"/>
      <path d="M44 8c12 8 14 36 4 48"/>
      <path d="M32 8v12"/>
      <path d="M32 20l-12 8"/>
      <path d="M32 20l12 8"/>
      <path d="M10 24h16c4 0 6 4 6 8v16c0 4-2 8-6 8H10" fill="currentColor" opacity="0.5"/>
      <text x="12" y="44" font-size="5" fill="currentColor" stroke="none">RUL</text>
      <circle cx="44" cy="36" r="6"/>
      <circle cx="46" cy="48" r="5"/>
    </svg>`
  },
  {
    id: 'pulm-pneumonia-broncho',
    name: 'Bronchopneumonia',
    domain: 'medicine',
    category: 'infectious',
    tags: ['bronchopneumonia', 'patchy', 'multifocal', 'lobular', 'infection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-12 8-14 36-4 48"/>
      <path d="M44 8c12 8 14 36 4 48"/>
      <path d="M32 8v12"/>
      <circle cx="18" cy="28" r="5" fill="currentColor" opacity="0.5"/>
      <circle cx="28" cy="36" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="20" cy="46" r="5" fill="currentColor" opacity="0.5"/>
      <circle cx="44" cy="24" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="38" cy="34" r="5" fill="currentColor" opacity="0.5"/>
      <circle cx="48" cy="42" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="40" cy="50" r="4" fill="currentColor" opacity="0.5"/>
      <text x="14" y="60" font-size="5" fill="currentColor" stroke="none">Patchy Infiltrates</text>
    </svg>`
  },
  {
    id: 'pulm-pneumonia-interstitial',
    name: 'Interstitial Pneumonia',
    domain: 'medicine',
    category: 'infectious',
    tags: ['interstitial', 'pneumonia', 'viral', 'atypical', 'ground glass'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-12 8-14 36-4 48"/>
      <path d="M44 8c12 8 14 36 4 48"/>
      <rect x="12" y="20" width="40" height="32" rx="4" fill="currentColor" opacity="0.15"/>
      <path d="M16 24l4 4-4 4"/>
      <path d="M24 24l-4 4 4 4"/>
      <path d="M40 24l4 4-4 4"/>
      <path d="M48 24l-4 4 4 4"/>
      <path d="M16 36l4 4-4 4"/>
      <path d="M24 36l-4 4 4 4"/>
      <path d="M40 36l4 4-4 4"/>
      <path d="M48 36l-4 4 4 4"/>
      <text x="16" y="58" font-size="5" fill="currentColor" stroke="none">Interstitial</text>
    </svg>`
  },
  {
    id: 'pulm-tuberculosis',
    name: 'Tuberculosis',
    domain: 'medicine',
    category: 'infectious',
    tags: ['TB', 'tuberculosis', 'cavitary', 'mycobacterium', 'apical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-12 8-14 36-4 48"/>
      <path d="M44 8c12 8 14 36 4 48"/>
      <circle cx="24" cy="20" r="8"/>
      <circle cx="24" cy="20" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="40" cy="24" r="6"/>
      <circle cx="40" cy="24" r="3" fill="currentColor" opacity="0.3"/>
      <path d="M16 32l8 4"/>
      <path d="M20 40l4 4"/>
      <circle cx="44" cy="40" r="5" fill="currentColor" opacity="0.2"/>
      <text x="12" y="56" font-size="5" fill="currentColor" stroke="none">Cavitary TB</text>
    </svg>`
  },
  {
    id: 'pulm-lung-abscess',
    name: 'Lung Abscess',
    domain: 'medicine',
    category: 'infectious',
    tags: ['abscess', 'lung', 'cavity', 'air-fluid', 'aspiration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-12 8-14 36-4 48"/>
      <path d="M44 8c12 8 14 36 4 48"/>
      <circle cx="32" cy="32" r="14"/>
      <path d="M18 32h28"/>
      <path d="M18 32c0 8 6 14 14 14s14-6 14-14" fill="currentColor" opacity="0.4"/>
      <circle cx="24" cy="38" r="2"/>
      <circle cx="32" cy="40" r="2"/>
      <circle cx="40" cy="38" r="2"/>
      <text x="20" y="58" font-size="5" fill="currentColor" stroke="none">Air-Fluid</text>
    </svg>`
  },
  {
    id: 'pulm-empyema',
    name: 'Empyema',
    domain: 'medicine',
    category: 'infectious',
    tags: ['empyema', 'pleural', 'pus', 'infection', 'complicated'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8c-8 8-8 40 0 48"/>
      <path d="M48 8c8 8 8 40 0 48"/>
      <path d="M8 32c8 2 16 2 24 0" fill="currentColor" opacity="0.5"/>
      <path d="M8 32c0 16 4 24 8 24 4 0 8 2 16 0v-24c-8 2-16 2-24 0z" fill="currentColor" opacity="0.5"/>
      <path d="M8 32c8 2 16 2 24 0"/>
      <circle cx="16" cy="42" r="2" fill="currentColor"/>
      <circle cx="24" cy="46" r="2" fill="currentColor"/>
      <circle cx="20" cy="50" r="2" fill="currentColor"/>
      <path d="M36 16c4 6 8 20 8 28"/>
      <path d="M36 16c-2 6-4 16-4 24"/>
      <text x="8" y="38" font-size="5" fill="currentColor" stroke="none">Pus</text>
    </svg>`
  },
  {
    id: 'pulm-covid-pattern',
    name: 'COVID-19 Pattern',
    domain: 'medicine',
    category: 'infectious',
    tags: ['COVID', 'coronavirus', 'SARS-CoV-2', 'ground glass', 'bilateral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-12 8-14 36-4 48"/>
      <path d="M44 8c12 8 14 36 4 48"/>
      <ellipse cx="20" cy="32" rx="10" ry="16" fill="currentColor" opacity="0.2"/>
      <ellipse cx="44" cy="32" rx="10" ry="16" fill="currentColor" opacity="0.2"/>
      <ellipse cx="16" cy="44" rx="8" ry="10" fill="currentColor" opacity="0.3"/>
      <ellipse cx="48" cy="44" rx="8" ry="10" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="6" r="4"/>
      <path d="M28 4l-2-2"/>
      <path d="M36 4l2-2"/>
      <path d="M32 2v-2"/>
      <text x="14" y="60" font-size="5" fill="currentColor" stroke="none">Bilateral GGO</text>
    </svg>`
  },
  {
    id: 'pulm-aspergillosis',
    name: 'Aspergillosis',
    domain: 'medicine',
    category: 'infectious',
    tags: ['aspergillosis', 'fungal', 'aspergilloma', 'halo sign', 'invasive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-12 8-14 36-4 48"/>
      <path d="M44 8c12 8 14 36 4 48"/>
      <circle cx="28" cy="28" r="12"/>
      <circle cx="28" cy="28" r="8" fill="currentColor" opacity="0.5"/>
      <ellipse cx="28" cy="28" rx="4" ry="6" fill="currentColor"/>
      <path d="M28 18l0 4"/>
      <path d="M28 32l0 4"/>
      <path d="M20 28l4 0"/>
      <path d="M32 28l4 0"/>
      <circle cx="46" cy="40" r="6"/>
      <circle cx="46" cy="40" r="3" fill="currentColor" opacity="0.3"/>
      <text x="14" y="58" font-size="5" fill="currentColor" stroke="none">Fungal Ball</text>
    </svg>`
  },
  {
    id: 'pulm-pneumocystis',
    name: 'PCP Pneumonia',
    domain: 'medicine',
    category: 'infectious',
    tags: ['PCP', 'pneumocystis', 'jirovecii', 'immunocompromised', 'AIDS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-12 8-14 36-4 48"/>
      <path d="M44 8c12 8 14 36 4 48"/>
      <ellipse cx="32" cy="32" rx="20" ry="20" fill="currentColor" opacity="0.15"/>
      <circle cx="20" cy="24" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="20" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="44" cy="24" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="16" cy="36" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="28" cy="40" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="40" cy="36" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="48" cy="40" r="4" fill="currentColor" opacity="0.2"/>
      <text x="22" y="58" font-size="6" fill="currentColor" stroke="none">PCP</text>
    </svg>`
  },
  {
    id: 'pulm-miliary-tb',
    name: 'Miliary TB',
    domain: 'medicine',
    category: 'infectious',
    tags: ['miliary', 'TB', 'tuberculosis', 'disseminated', 'hematogenous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-12 8-14 36-4 48"/>
      <path d="M44 8c12 8 14 36 4 48"/>
      <circle cx="16" cy="20" r="2" fill="currentColor"/>
      <circle cx="24" cy="16" r="2" fill="currentColor"/>
      <circle cx="32" cy="18" r="2" fill="currentColor"/>
      <circle cx="40" cy="16" r="2" fill="currentColor"/>
      <circle cx="48" cy="20" r="2" fill="currentColor"/>
      <circle cx="12" cy="28" r="2" fill="currentColor"/>
      <circle cx="20" cy="26" r="2" fill="currentColor"/>
      <circle cx="28" cy="28" r="2" fill="currentColor"/>
      <circle cx="36" cy="26" r="2" fill="currentColor"/>
      <circle cx="44" cy="28" r="2" fill="currentColor"/>
      <circle cx="52" cy="30" r="2" fill="currentColor"/>
      <circle cx="16" cy="36" r="2" fill="currentColor"/>
      <circle cx="24" cy="38" r="2" fill="currentColor"/>
      <circle cx="32" cy="36" r="2" fill="currentColor"/>
      <circle cx="40" cy="38" r="2" fill="currentColor"/>
      <circle cx="48" cy="36" r="2" fill="currentColor"/>
      <circle cx="20" cy="46" r="2" fill="currentColor"/>
      <circle cx="32" cy="48" r="2" fill="currentColor"/>
      <circle cx="44" cy="46" r="2" fill="currentColor"/>
      <text x="16" y="60" font-size="5" fill="currentColor" stroke="none">Miliary Pattern</text>
    </svg>`
  },

  // ===========================================================================
  // PATHOLOGY - VASCULAR (8 icons)
  // ===========================================================================
  {
    id: 'pulm-pe',
    name: 'Pulmonary Embolism',
    domain: 'medicine',
    category: 'vascular',
    tags: ['PE', 'pulmonary embolism', 'clot', 'thrombus', 'DVT'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v12" stroke-width="2"/>
      <path d="M32 20l-16 16" stroke-width="2"/>
      <path d="M32 20l16 16" stroke-width="2"/>
      <ellipse cx="22" cy="30" rx="6" ry="4" fill="red" opacity="0.7"/>
      <ellipse cx="44" cy="32" rx="5" ry="3" fill="red" opacity="0.7"/>
      <path d="M8 36c4 8 8 16 12 20"/>
      <path d="M56 36c-4 8-8 16-12 20"/>
      <circle cx="18" cy="44" r="6"/>
      <circle cx="46" cy="44" r="6"/>
      <text x="24" y="60" font-size="6" fill="currentColor" stroke="none">PE</text>
    </svg>`
  },
  {
    id: 'pulm-pulmonary-htn',
    name: 'Pulmonary Hypertension',
    domain: 'medicine',
    category: 'vascular',
    tags: ['pulmonary hypertension', 'PAH', 'PH', 'pressure', 'RV'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v16" stroke-width="3"/>
      <path d="M32 24l-20 20" stroke-width="2.5"/>
      <path d="M32 24l20 20" stroke-width="2.5"/>
      <circle cx="32" cy="8" r="4" fill="currentColor"/>
      <path d="M28 4l4-2 4 2"/>
      <path d="M12 44l-4 8"/>
      <path d="M12 44l8 4"/>
      <path d="M52 44l4 8"/>
      <path d="M52 44l-8 4"/>
      <text x="4" y="20" font-size="5" fill="currentColor" stroke="none">High</text>
      <text x="4" y="26" font-size="5" fill="currentColor" stroke="none">Pressure</text>
    </svg>`
  },
  {
    id: 'pulm-pulmonary-edema',
    name: 'Pulmonary Edema',
    domain: 'medicine',
    category: 'vascular',
    tags: ['pulmonary edema', 'cardiogenic', 'fluid', 'CHF', 'congestion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-12 8-14 36-4 48"/>
      <path d="M44 8c12 8 14 36 4 48"/>
      <ellipse cx="32" cy="40" rx="20" ry="14" fill="currentColor" opacity="0.3"/>
      <path d="M16 32c0-2 2-4 4-4s4 2 4 4"/>
      <path d="M28 28c0-2 2-4 4-4s4 2 4 4"/>
      <path d="M40 32c0-2 2-4 4-4s4 2 4 4"/>
      <path d="M20 40c0-2 2-4 4-4s4 2 4 4"/>
      <path d="M36 40c0-2 2-4 4-4s4 2 4 4"/>
      <path d="M28 48c0-2 2-4 4-4s4 2 4 4"/>
      <text x="16" y="60" font-size="5" fill="currentColor" stroke="none">Fluid Overload</text>
    </svg>`
  },
  {
    id: 'pulm-ards',
    name: 'ARDS',
    domain: 'medicine',
    category: 'vascular',
    tags: ['ARDS', 'acute respiratory distress', 'syndrome', 'diffuse', 'bilateral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-12 8-14 36-4 48"/>
      <path d="M44 8c12 8 14 36 4 48"/>
      <rect x="10" y="16" width="44" height="36" rx="4" fill="currentColor" opacity="0.4"/>
      <path d="M16 24h32"/>
      <path d="M16 32h32"/>
      <path d="M16 40h32"/>
      <path d="M24 16v36"/>
      <path d="M40 16v36"/>
      <text x="20" y="58" font-size="6" fill="currentColor" stroke="none">ARDS</text>
    </svg>`
  },
  {
    id: 'pulm-vq-mismatch',
    name: 'V/Q Mismatch',
    domain: 'medicine',
    category: 'vascular',
    tags: ['V/Q', 'ventilation', 'perfusion', 'mismatch', 'shunt', 'dead space'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="20" height="40" rx="4"/>
      <rect x="36" y="12" width="20" height="40" rx="4"/>
      <text x="12" y="28" font-size="8" fill="currentColor" stroke="none">V</text>
      <text x="40" y="28" font-size="8" fill="currentColor" stroke="none">Q</text>
      <path d="M14 36h8" stroke="blue"/>
      <path d="M14 40h6" stroke="blue"/>
      <path d="M14 44h4" stroke="blue"/>
      <path d="M42 36h8" stroke="red"/>
      <path d="M42 40h4" stroke="red"/>
      <path d="M42 44h2" stroke="red"/>
      <text x="10" y="58" font-size="5" fill="currentColor" stroke="none">High V</text>
      <text x="38" y="58" font-size="5" fill="currentColor" stroke="none">Low Q</text>
    </svg>`
  },
  {
    id: 'pulm-pulmonary-infarct',
    name: 'Pulmonary Infarct',
    domain: 'medicine',
    category: 'vascular',
    tags: ['infarct', 'pulmonary', 'Hampton hump', 'wedge', 'PE complication'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8c-8 8-8 40 0 48"/>
      <path d="M48 8c8 8 8 40 0 48"/>
      <path d="M48 40l-16 0c-4 0-8 4-8 12h24c4-4 4-8 0-12z" fill="currentColor" opacity="0.5"/>
      <path d="M48 40l-16 0c-4 0-8 4-8 12h24c4-4 4-8 0-12z"/>
      <path d="M20 20c4 4 10 12 12 16"/>
      <path d="M20 20c-4 8-6 20-4 32"/>
      <text x="28" y="58" font-size="5" fill="currentColor" stroke="none">Hampton</text>
    </svg>`
  },
  {
    id: 'pulm-saddle-pe',
    name: 'Saddle PE',
    domain: 'medicine',
    category: 'vascular',
    tags: ['saddle', 'PE', 'pulmonary embolism', 'massive', 'bifurcation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v16" stroke-width="3"/>
      <path d="M32 20l-20 20" stroke-width="2.5"/>
      <path d="M32 20l20 20" stroke-width="2.5"/>
      <ellipse cx="32" cy="22" rx="12" ry="6" fill="red" opacity="0.7"/>
      <path d="M20 22c-4 1-8 1-12 0"/>
      <path d="M44 22c4 1 8 1 12 0"/>
      <circle cx="16" cy="44" r="6"/>
      <circle cx="48" cy="44" r="6"/>
      <text x="16" y="60" font-size="5" fill="currentColor" stroke="none">Saddle Clot</text>
    </svg>`
  },
  {
    id: 'pulm-chronic-pe',
    name: 'Chronic PE / CTEPH',
    domain: 'medicine',
    category: 'vascular',
    tags: ['CTEPH', 'chronic', 'thromboembolic', 'pulmonary hypertension', 'organized'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v12" stroke-width="2"/>
      <path d="M32 16l-18 18" stroke-width="2"/>
      <path d="M32 16l18 18" stroke-width="2"/>
      <path d="M20 28l-8 8"/>
      <path d="M44 28l8 8"/>
      <ellipse cx="18" cy="30" rx="4" ry="2" fill="currentColor" opacity="0.7"/>
      <ellipse cx="46" cy="30" rx="4" ry="2" fill="currentColor" opacity="0.7"/>
      <path d="M14 34l-6 6" stroke-dasharray="2 2"/>
      <path d="M50 34l6 6" stroke-dasharray="2 2"/>
      <circle cx="16" cy="44" r="5"/>
      <circle cx="48" cy="44" r="5"/>
      <path d="M12 44h8"/>
      <path d="M44 44h8"/>
      <text x="16" y="58" font-size="5" fill="currentColor" stroke="none">CTEPH</text>
    </svg>`
  },

  // ===========================================================================
  // PATHOLOGY - MALIGNANCY (6 icons)
  // ===========================================================================
  {
    id: 'pulm-nsclc',
    name: 'NSCLC',
    domain: 'medicine',
    category: 'malignancy',
    tags: ['NSCLC', 'non-small cell', 'lung cancer', 'adenocarcinoma', 'squamous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-12 8-14 36-4 48"/>
      <path d="M44 8c12 8 14 36 4 48"/>
      <circle cx="36" cy="28" r="12" fill="currentColor" opacity="0.4"/>
      <circle cx="36" cy="28" r="12"/>
      <path d="M28 24l4 4"/>
      <path d="M32 24l-4 4"/>
      <path d="M40 24l4 4"/>
      <path d="M44 24l-4 4"/>
      <path d="M32 32l4 4"/>
      <path d="M36 32l-4 4"/>
      <path d="M40 32l4 4"/>
      <path d="M44 32l-4 4"/>
      <text x="16" y="56" font-size="5" fill="currentColor" stroke="none">NSCLC</text>
    </svg>`
  },
  {
    id: 'pulm-sclc',
    name: 'SCLC',
    domain: 'medicine',
    category: 'malignancy',
    tags: ['SCLC', 'small cell', 'lung cancer', 'oat cell', 'neuroendocrine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-12 8-14 36-4 48"/>
      <path d="M44 8c12 8 14 36 4 48"/>
      <ellipse cx="32" cy="24" rx="16" ry="12" fill="currentColor" opacity="0.4"/>
      <ellipse cx="32" cy="24" rx="16" ry="12"/>
      <circle cx="24" cy="20" r="2" fill="currentColor"/>
      <circle cx="32" cy="18" r="2" fill="currentColor"/>
      <circle cx="40" cy="20" r="2" fill="currentColor"/>
      <circle cx="28" cy="26" r="2" fill="currentColor"/>
      <circle cx="36" cy="26" r="2" fill="currentColor"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <ellipse cx="28" cy="40" rx="6" ry="4" fill="currentColor" opacity="0.3"/>
      <ellipse cx="42" cy="42" rx="6" ry="4" fill="currentColor" opacity="0.3"/>
      <text x="18" y="56" font-size="5" fill="currentColor" stroke="none">SCLC + LN</text>
    </svg>`
  },
  {
    id: 'pulm-lung-nodule',
    name: 'Lung Nodule',
    domain: 'medicine',
    category: 'malignancy',
    tags: ['nodule', 'lung', 'SPN', 'solitary', 'incidental'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-12 8-14 36-4 48"/>
      <path d="M44 8c12 8 14 36 4 48"/>
      <circle cx="38" cy="32" r="8" fill="currentColor" opacity="0.5"/>
      <circle cx="38" cy="32" r="8"/>
      <path d="M42 28l4-8"/>
      <path d="M50 20l4 0"/>
      <path d="M50 20l0-4"/>
      <circle cx="20" cy="36" r="6"/>
      <circle cx="24" cy="48" r="5"/>
      <text x="8" y="56" font-size="5" fill="currentColor" stroke="none">SPN</text>
    </svg>`
  },
  {
    id: 'pulm-lung-mass',
    name: 'Lung Mass',
    domain: 'medicine',
    category: 'malignancy',
    tags: ['mass', 'lung', 'tumor', 'large', 'cancer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-12 8-14 36-4 48"/>
      <path d="M44 8c12 8 14 36 4 48"/>
      <ellipse cx="32" cy="32" rx="16" ry="14" fill="currentColor" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="16" ry="14"/>
      <path d="M24 28c4 1 12 1 16 0"/>
      <path d="M24 36c4 1 12 1 16 0"/>
      <path d="M28 24v16"/>
      <path d="M36 24v16"/>
      <text x="20" y="56" font-size="5" fill="currentColor" stroke="none">Mass >3cm</text>
    </svg>`
  },
  {
    id: 'pulm-lymphadenopathy',
    name: 'Mediastinal Lymphadenopathy',
    domain: 'medicine',
    category: 'malignancy',
    tags: ['lymphadenopathy', 'mediastinal', 'hilar', 'nodes', 'staging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="48" rx="4"/>
      <ellipse cx="32" cy="16" rx="8" ry="5" fill="currentColor" opacity="0.5"/>
      <ellipse cx="32" cy="28" rx="10" ry="6" fill="currentColor" opacity="0.5"/>
      <ellipse cx="32" cy="42" rx="8" ry="5" fill="currentColor" opacity="0.5"/>
      <ellipse cx="20" cy="24" rx="6" ry="4" fill="currentColor" opacity="0.5"/>
      <ellipse cx="44" cy="24" rx="6" ry="4" fill="currentColor" opacity="0.5"/>
      <text x="6" y="58" font-size="5" fill="currentColor" stroke="none">Lymphadenopathy</text>
    </svg>`
  },
  {
    id: 'pulm-lung-staging',
    name: 'Lung Cancer Staging',
    domain: 'medicine',
    category: 'malignancy',
    tags: ['staging', 'TNM', 'lung cancer', 'stage', 'metastasis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-10 6-12 28-4 40"/>
      <path d="M44 8c10 6 12 28 4 40"/>
      <circle cx="24" cy="24" r="6" fill="currentColor" opacity="0.5"/>
      <text x="21" y="27" font-size="6" fill="currentColor" stroke="none">T</text>
      <ellipse cx="32" cy="12" rx="6" ry="4" fill="currentColor" opacity="0.5"/>
      <text x="29" y="15" font-size="6" fill="currentColor" stroke="none">N</text>
      <circle cx="48" cy="52" r="6" fill="currentColor" opacity="0.5"/>
      <text x="44" y="55" font-size="6" fill="currentColor" stroke="none">M</text>
      <path d="M28 20l4-6"/>
      <path d="M30 28l12 20" stroke-dasharray="2 2"/>
      <rect x="8" y="44" width="24" height="12" rx="2"/>
      <text x="12" y="53" font-size="6" fill="currentColor" stroke="none">TNM</text>
    </svg>`
  },

  // ===========================================================================
  // EQUIPMENT (12 icons)
  // ===========================================================================
  {
    id: 'pulm-chest-xray',
    name: 'Chest X-Ray',
    domain: 'medicine',
    category: 'equipment',
    tags: ['CXR', 'chest x-ray', 'radiograph', 'PA', 'lateral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <rect x="12" y="12" width="40" height="40" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M24 20c-6 4-8 18-4 28"/>
      <path d="M40 20c6 4 8 18 4 28"/>
      <path d="M20 48c6 2 18 2 24 0"/>
      <ellipse cx="32" cy="28" rx="6" ry="8"/>
      <path d="M32 20v-4"/>
      <path d="M28 16h8"/>
      <path d="M24 36l4 4"/>
      <path d="M40 36l-4 4"/>
    </svg>`
  },
  {
    id: 'pulm-ct-chest',
    name: 'CT Chest',
    domain: 'medicine',
    category: 'equipment',
    tags: ['CT', 'computed tomography', 'chest', 'scan', 'HRCT'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="18" fill="currentColor" opacity="0.1"/>
      <ellipse cx="22" cy="32" rx="8" ry="12"/>
      <ellipse cx="42" cy="32" rx="8" ry="12"/>
      <rect x="28" y="20" width="8" height="24" rx="2"/>
      <path d="M20 20l-8-8"/>
      <path d="M44 20l8-8"/>
      <path d="M20 44l-8 8"/>
      <path d="M44 44l8 8"/>
      <text x="22" y="58" font-size="5" fill="currentColor" stroke="none">Axial CT</text>
    </svg>`
  },
  {
    id: 'pulm-spirometer',
    name: 'Spirometer',
    domain: 'medicine',
    category: 'equipment',
    tags: ['spirometer', 'PFT', 'pulmonary function', 'spirometry', 'FEV1'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="32" rx="4"/>
      <rect x="24" y="12" width="16" height="20" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M26 28c2-4 4-8 8-10 4-2 6 2 6 6"/>
      <rect x="16" y="40" width="32" height="16" rx="4"/>
      <ellipse cx="32" cy="48" rx="10" ry="4"/>
      <path d="M32 40v-4"/>
      <text x="12" y="62" font-size="5" fill="currentColor" stroke="none">Spirometer</text>
    </svg>`
  },
  {
    id: 'pulm-bronchoscope',
    name: 'Bronchoscope',
    domain: 'medicine',
    category: 'equipment',
    tags: ['bronchoscope', 'bronchoscopy', 'flexible', 'scope', 'airway'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="16" height="24" rx="4"/>
      <circle cx="16" cy="16" r="4"/>
      <rect x="12" y="24" width="8" height="4"/>
      <path d="M16 32c0 8 4 16 16 24"/>
      <path d="M32 56l8 4"/>
      <circle cx="44" cy="58" r="4"/>
      <path d="M42 56l-2-4"/>
      <circle cx="16" cy="16" r="2" fill="currentColor"/>
      <text x="28" y="44" font-size="5" fill="currentColor" stroke="none">Scope</text>
    </svg>`
  },
  {
    id: 'pulm-ventilator',
    name: 'Mechanical Ventilator',
    domain: 'medicine',
    category: 'equipment',
    tags: ['ventilator', 'mechanical', 'ventilation', 'ICU', 'respiratory support'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="40" rx="4"/>
      <rect x="16" y="12" width="24" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M20 24c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/>
      <circle cx="20" cy="36" r="4"/>
      <circle cx="32" cy="36" r="4"/>
      <circle cx="44" cy="36" r="4"/>
      <path d="M32 48v8"/>
      <path d="M28 52h8"/>
      <path d="M32 56l-8 4"/>
      <path d="M32 56l8 4"/>
    </svg>`
  },
  {
    id: 'pulm-bipap-cpap',
    name: 'BiPAP/CPAP',
    domain: 'medicine',
    category: 'equipment',
    tags: ['BiPAP', 'CPAP', 'NIV', 'non-invasive', 'ventilation', 'sleep apnea'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="32" width="24" height="20" rx="4"/>
      <rect x="12" y="36" width="16" height="8" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M14 42h12"/>
      <path d="M32 42c8 0 12-8 16-8"/>
      <ellipse cx="52" cy="28" rx="8" ry="12"/>
      <ellipse cx="52" cy="28" rx="4" ry="8" fill="currentColor" opacity="0.2"/>
      <path d="M44 22l-4-8"/>
      <path d="M60 22l4-8"/>
      <text x="12" y="58" font-size="5" fill="currentColor" stroke="none">BiPAP</text>
    </svg>`
  },
  {
    id: 'pulm-chest-tube',
    name: 'Chest Tube',
    domain: 'medicine',
    category: 'equipment',
    tags: ['chest tube', 'thoracostomy', 'drainage', 'pleural', 'pigtail'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-8 8-8 36 0 44"/>
      <path d="M44 8c8 8 8 36 0 44"/>
      <path d="M20 52c6 4 18 4 24 0"/>
      <path d="M40 24l12-4"/>
      <path d="M52 20l4 12"/>
      <path d="M56 32c0 8-4 16-8 20"/>
      <rect x="44" y="52" width="12" height="8" rx="2"/>
      <path d="M46 56h8"/>
      <circle cx="40" cy="24" r="4" fill="currentColor" opacity="0.3"/>
      <text x="8" y="40" font-size="5" fill="currentColor" stroke="none">Tube</text>
    </svg>`
  },
  {
    id: 'pulm-oxygen-delivery',
    name: 'Oxygen Delivery',
    domain: 'medicine',
    category: 'equipment',
    tags: ['oxygen', 'nasal cannula', 'mask', 'delivery', 'O2'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="12"/>
      <path d="M24 24c2 4 6 8 8 8s6-4 8-8"/>
      <ellipse cx="28" cy="18" rx="2" ry="3"/>
      <ellipse cx="36" cy="18" rx="2" ry="3"/>
      <path d="M20 20l-8 4"/>
      <path d="M44 20l8 4"/>
      <path d="M12 24c-4 4-4 12 0 16"/>
      <path d="M52 24c4 4 4 12 0 16"/>
      <rect x="8" y="44" width="12" height="16" rx="2"/>
      <rect x="44" y="44" width="12" height="16" rx="2"/>
      <path d="M14 48v8"/>
      <path d="M50 48v8"/>
      <text x="20" y="58" font-size="5" fill="currentColor" stroke="none">O2</text>
    </svg>`
  },
  {
    id: 'pulm-mdi-inhaler',
    name: 'MDI Inhaler',
    domain: 'medicine',
    category: 'equipment',
    tags: ['MDI', 'metered dose', 'inhaler', 'bronchodilator', 'asthma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="32" rx="4"/>
      <rect x="20" y="40" width="24" height="16" rx="4"/>
      <path d="M32 8v-4"/>
      <circle cx="32" cy="20" r="4"/>
      <path d="M28 28h8"/>
      <path d="M28 32h8"/>
      <ellipse cx="32" cy="48" rx="8" ry="4"/>
      <path d="M24 48h16"/>
      <text x="18" y="62" font-size="5" fill="currentColor" stroke="none">Inhaler</text>
    </svg>`
  },
  {
    id: 'pulm-dpi-inhaler',
    name: 'DPI Inhaler',
    domain: 'medicine',
    category: 'equipment',
    tags: ['DPI', 'dry powder', 'inhaler', 'diskus', 'turbuhaler'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="8"/>
      <ellipse cx="32" cy="32" rx="20" ry="8" fill="currentColor" opacity="0.1"/>
      <path d="M12 32c0 8 8 16 20 16s20-8 20-16"/>
      <path d="M32 24v-12"/>
      <ellipse cx="32" cy="12" rx="6" ry="4"/>
      <path d="M26 12h12"/>
      <circle cx="32" cy="40" r="4"/>
      <path d="M20 36l-4 8"/>
      <path d="M44 36l4 8"/>
      <text x="20" y="58" font-size="5" fill="currentColor" stroke="none">Diskus</text>
    </svg>`
  },
  {
    id: 'pulm-nebulizer',
    name: 'Nebulizer',
    domain: 'medicine',
    category: 'equipment',
    tags: ['nebulizer', 'aerosol', 'treatment', 'breathing', 'medication'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 40c-4 0-8-4-8-8v-8c0-4 4-8 8-8h24c4 0 8 4 8 8v8c0 4-4 8-8 8"/>
      <rect x="24" y="40" width="16" height="16" rx="4"/>
      <path d="M32 24v-12"/>
      <path d="M28 16c-2-4-2-8 0-12"/>
      <path d="M32 16c0-4 0-8 2-12"/>
      <path d="M36 16c2-4 2-8 0-12"/>
      <ellipse cx="32" cy="48" rx="4" ry="2"/>
      <path d="M16 32h4"/>
      <path d="M44 32h4"/>
    </svg>`
  },
  {
    id: 'pulm-pulse-oximeter',
    name: 'Pulse Oximeter',
    domain: 'medicine',
    category: 'equipment',
    tags: ['pulse oximeter', 'SpO2', 'oxygen saturation', 'monitoring', 'finger'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="8"/>
      <rect x="20" y="24" width="16" height="12" rx="2" fill="currentColor" opacity="0.1"/>
      <text x="22" y="34" font-size="8" fill="currentColor" stroke="none">98</text>
      <text x="38" y="32" font-size="6" fill="currentColor" stroke="none">%</text>
      <path d="M32 44v8"/>
      <ellipse cx="32" cy="54" rx="12" ry="6"/>
      <path d="M24 52c2-2 6-2 8 0"/>
      <path d="M32 52c2-2 6-2 8 0"/>
    </svg>`
  },

  // ===========================================================================
  // PROCEDURES (10 icons)
  // ===========================================================================
  {
    id: 'pulm-intubation',
    name: 'Endotracheal Intubation',
    domain: 'medicine',
    category: 'procedures',
    tags: ['intubation', 'ETT', 'endotracheal', 'tube', 'airway management'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-4 0-8 2-8 6v12"/>
      <path d="M32 8c4 0 8 2 8 6v12"/>
      <rect x="24" y="26" width="16" height="8" rx="2"/>
      <path d="M28 34v20"/>
      <path d="M36 34v20"/>
      <ellipse cx="32" cy="56" rx="6" ry="4"/>
      <path d="M40 14h12"/>
      <circle cx="56" cy="14" r="4"/>
      <text x="10" y="20" font-size="5" fill="currentColor" stroke="none">ETT</text>
    </svg>`
  },
  {
    id: 'pulm-thoracentesis',
    name: 'Thoracentesis',
    domain: 'medicine',
    category: 'procedures',
    tags: ['thoracentesis', 'pleural tap', 'needle', 'drainage', 'effusion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8c-8 8-8 40 0 48"/>
      <path d="M48 8c8 8 8 40 0 48"/>
      <path d="M8 36c0 12 4 20 8 20h16v-20c-8 2-16 2-24 0z" fill="currentColor" opacity="0.3"/>
      <path d="M8 36c8 2 16 2 24 0"/>
      <rect x="36" y="20" width="4" height="24" rx="1"/>
      <path d="M38 20l0-8"/>
      <rect x="34" y="8" width="8" height="6" rx="1"/>
      <path d="M38 44l4 8"/>
      <circle cx="44" cy="54" r="4"/>
      <text x="44" y="36" font-size="5" fill="currentColor" stroke="none">Tap</text>
    </svg>`
  },
  {
    id: 'pulm-tracheostomy',
    name: 'Tracheostomy',
    domain: 'medicine',
    category: 'procedures',
    tags: ['tracheostomy', 'trach', 'surgical airway', 'stoma', 'tube'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v24H24z"/>
      <path d="M24 14h16"/>
      <path d="M24 20h16"/>
      <ellipse cx="32" cy="8" rx="8" ry="3"/>
      <path d="M24 32l-8 8"/>
      <path d="M40 32l8 8"/>
      <ellipse cx="32" cy="32" rx="8" ry="4" fill="currentColor" opacity="0.3"/>
      <path d="M24 32c0 4 4 8 8 8s8-4 8-8"/>
      <rect x="28" y="40" width="8" height="16" rx="2"/>
      <ellipse cx="32" cy="56" rx="6" ry="4"/>
      <text x="44" y="36" font-size="5" fill="currentColor" stroke="none">Trach</text>
    </svg>`
  },
  {
    id: 'pulm-needle-decompression',
    name: 'Needle Decompression',
    domain: 'medicine',
    category: 'procedures',
    tags: ['needle decompression', 'tension pneumothorax', 'emergency', 'chest'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8c-8 8-8 40 0 48"/>
      <path d="M48 8c8 8 8 40 0 48"/>
      <path d="M16 20c-2 8-2 20 0 28"/>
      <path d="M16 20c4 4 8 16 8 20"/>
      <rect x="36" y="8" width="4" height="20" rx="1"/>
      <path d="M38 28l0 8"/>
      <rect x="34" y="4" width="8" height="6" rx="1"/>
      <circle cx="32" cy="36" r="2"/>
      <circle cx="36" cy="40" r="1"/>
      <circle cx="28" cy="42" r="2"/>
      <text x="8" y="40" font-size="5" fill="currentColor" stroke="none">Air</text>
      <text x="44" y="20" font-size="5" fill="currentColor" stroke="none">14G</text>
    </svg>`
  },
  {
    id: 'pulm-pleurodesis',
    name: 'Pleurodesis',
    domain: 'medicine',
    category: 'procedures',
    tags: ['pleurodesis', 'talc', 'chemical', 'recurrent effusion', 'pneumothorax'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8c-8 8-8 40 0 48"/>
      <path d="M48 8c8 8 8 40 0 48"/>
      <path d="M12 20c4 4 8 4 12 0"/>
      <path d="M12 28c4 4 8 4 12 0"/>
      <path d="M12 36c4 4 8 4 12 0"/>
      <path d="M12 44c4 4 8 4 12 0"/>
      <path d="M40 16c4 6 8 20 8 28"/>
      <path d="M40 16c-2 6-4 16-4 24"/>
      <circle cx="14" cy="24" r="2" fill="currentColor"/>
      <circle cx="20" cy="32" r="2" fill="currentColor"/>
      <circle cx="14" cy="40" r="2" fill="currentColor"/>
      <text x="36" y="58" font-size="5" fill="currentColor" stroke="none">Talc</text>
    </svg>`
  },
  {
    id: 'pulm-bal',
    name: 'Bronchoalveolar Lavage',
    domain: 'medicine',
    category: 'procedures',
    tags: ['BAL', 'bronchoalveolar lavage', 'wash', 'sample', 'bronchoscopy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v16"/>
      <path d="M32 24l-16 16"/>
      <path d="M32 24l16 16"/>
      <circle cx="20" cy="44" r="8" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="44" r="8" fill="currentColor" opacity="0.3"/>
      <path d="M28 12l-8-4"/>
      <path d="M20 8v8"/>
      <path d="M16 12h8"/>
      <circle cx="20" cy="44" r="4"/>
      <circle cx="44" cy="44" r="4"/>
      <text x="18" y="58" font-size="5" fill="currentColor" stroke="none">BAL</text>
    </svg>`
  },
  {
    id: 'pulm-endobronchial-biopsy',
    name: 'Endobronchial Biopsy',
    domain: 'medicine',
    category: 'procedures',
    tags: ['biopsy', 'endobronchial', 'forceps', 'tissue', 'bronchoscopy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v20" stroke-width="2"/>
      <path d="M32 28l-16 16" stroke-width="1.5"/>
      <path d="M32 28l16 16" stroke-width="1.5"/>
      <path d="M32 8l8-4"/>
      <path d="M40 4l4 4"/>
      <path d="M40 4l4-2"/>
      <path d="M44 8l4-2"/>
      <circle cx="20" cy="40" r="6"/>
      <path d="M17 37l6 6"/>
      <path d="M23 37l-6 6"/>
      <circle cx="44" cy="48" r="6"/>
      <text x="12" y="56" font-size="5" fill="currentColor" stroke="none">Bx</text>
    </svg>`
  },
  {
    id: 'pulm-ebus',
    name: 'EBUS',
    domain: 'medicine',
    category: 'procedures',
    tags: ['EBUS', 'endobronchial ultrasound', 'lymph node', 'biopsy', 'staging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v16" stroke-width="2"/>
      <circle cx="32" cy="28" r="6"/>
      <path d="M38 28c4 1 8 2 12 1"/>
      <path d="M38 32c6 2 12 3 16 2"/>
      <path d="M38 24c4-1 8-2 12-1"/>
      <ellipse cx="32" cy="44" rx="12" ry="8" fill="currentColor" opacity="0.3"/>
      <ellipse cx="32" cy="44" rx="12" ry="8"/>
      <path d="M24 44h16" stroke-dasharray="2 2"/>
      <text x="4" y="34" font-size="5" fill="currentColor" stroke="none">EBUS</text>
      <text x="32" y="50" font-size="4" fill="currentColor" stroke="none">LN</text>
    </svg>`
  },
  {
    id: 'pulm-oxygen-titration',
    name: 'Oxygen Titration',
    domain: 'medicine',
    category: 'procedures',
    tags: ['oxygen', 'titration', 'weaning', 'FiO2', 'SpO2 target'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="20" height="32" rx="4"/>
      <rect x="16" y="20" width="12" height="8" rx="2" fill="currentColor" opacity="0.1"/>
      <text x="18" y="27" font-size="6" fill="currentColor" stroke="none">O2</text>
      <circle cx="22" cy="36" r="4"/>
      <path d="M18 40l8 4"/>
      <path d="M22 40v6"/>
      <rect x="36" y="24" width="16" height="24" rx="4"/>
      <path d="M40 32h8"/>
      <path d="M40 36h6"/>
      <path d="M40 40h4"/>
      <path d="M32 36h4"/>
      <text x="38" y="54" font-size="5" fill="currentColor" stroke="none">L/min</text>
    </svg>`
  },
  {
    id: 'pulm-prone-positioning',
    name: 'Prone Positioning',
    domain: 'medicine',
    category: 'procedures',
    tags: ['prone', 'positioning', 'ARDS', 'oxygenation', 'ICU'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="28" width="48" height="20" rx="4" fill="currentColor" opacity="0.1"/>
      <ellipse cx="20" cy="24" rx="8" ry="6"/>
      <path d="M16 30c-2 4-2 8 0 12"/>
      <path d="M24 30c2 4 2 8 0 12"/>
      <ellipse cx="44" cy="24" rx="8" ry="6"/>
      <path d="M40 30c-2 4-2 8 0 12"/>
      <path d="M48 30c2 4 2 8 0 12"/>
      <path d="M28 38h8"/>
      <path d="M32 34v8"/>
      <circle cx="20" cy="52" r="4"/>
      <circle cx="44" cy="52" r="4"/>
      <text x="22" y="22" font-size="4" fill="currentColor" stroke="none">Prone</text>
    </svg>`
  },

  // ===========================================================================
  // SLEEP MEDICINE (6 icons)
  // ===========================================================================
  {
    id: 'pulm-osa',
    name: 'Obstructive Sleep Apnea',
    domain: 'medicine',
    category: 'sleep-medicine',
    tags: ['OSA', 'obstructive', 'sleep apnea', 'snoring', 'AHI'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="16" ry="12"/>
      <path d="M24 20c2 4 6 6 8 6s6-2 8-6"/>
      <ellipse cx="26" cy="18" rx="2" ry="3"/>
      <ellipse cx="38" cy="18" rx="2" ry="3"/>
      <path d="M16 24l-8 4"/>
      <path d="M48 24l8 4"/>
      <path d="M28 32c2 8 4 16 4 24"/>
      <path d="M36 32c-2 8-4 16-4 24"/>
      <ellipse cx="32" cy="40" rx="4" ry="2" fill="currentColor" opacity="0.5"/>
      <path d="M28 40c-4 1-8 1-12 0"/>
      <path d="M36 40c4 1 8 1 12 0"/>
      <text x="4" y="48" font-size="5" fill="currentColor" stroke="none">Zzz</text>
    </svg>`
  },
  {
    id: 'pulm-central-apnea',
    name: 'Central Sleep Apnea',
    domain: 'medicine',
    category: 'sleep-medicine',
    tags: ['CSA', 'central', 'sleep apnea', 'Cheyne-Stokes', 'heart failure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="12"/>
      <ellipse cx="28" cy="22" rx="2" ry="3"/>
      <ellipse cx="36" cy="22" rx="2" ry="3"/>
      <path d="M28 28c2 2 4 2 8 0"/>
      <path d="M32 36v20"/>
      <ellipse cx="32" cy="44" rx="8" ry="4"/>
      <path d="M8 52c4-4 8-8 12-8 4 0 4 8 8 8s4-8 8-8c4 0 8 4 12 8"/>
      <text x="28" y="62" font-size="5" fill="currentColor" stroke="none">CSA</text>
    </svg>`
  },
  {
    id: 'pulm-polysomnography',
    name: 'Polysomnography',
    domain: 'medicine',
    category: 'sleep-medicine',
    tags: ['PSG', 'polysomnography', 'sleep study', 'EEG', 'monitoring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="12"/>
      <ellipse cx="28" cy="18" rx="2" ry="2"/>
      <ellipse cx="36" cy="18" rx="2" ry="2"/>
      <path d="M28 24c2 2 4 2 8 0"/>
      <path d="M20 12l-8-4"/>
      <path d="M44 12l8-4"/>
      <path d="M32 8v-4"/>
      <circle cx="12" cy="8" r="2" fill="currentColor"/>
      <circle cx="52" cy="8" r="2" fill="currentColor"/>
      <circle cx="32" cy="4" r="2" fill="currentColor"/>
      <rect x="8" y="40" width="48" height="16" rx="4"/>
      <path d="M12 48c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0 4-2 6 0 4 2 6 0"/>
      <text x="16" y="38" font-size="5" fill="currentColor" stroke="none">Sleep Study</text>
    </svg>`
  },
  {
    id: 'pulm-ahi',
    name: 'AHI Index',
    domain: 'medicine',
    category: 'sleep-medicine',
    tags: ['AHI', 'apnea hypopnea index', 'severity', 'score', 'sleep'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <rect x="12" y="12" width="40" height="28" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M16 32c4-4 8-8 12-4 4 4 4 8 8 4 4-4 8 0 12 4"/>
      <path d="M20 44h6" stroke-width="2"/>
      <path d="M28 44h8" stroke-width="2"/>
      <path d="M38 44h8" stroke-width="2"/>
      <text x="20" y="52" font-size="4" fill="currentColor" stroke="none">5</text>
      <text x="30" y="52" font-size="4" fill="currentColor" stroke="none">15</text>
      <text x="40" y="52" font-size="4" fill="currentColor" stroke="none">30</text>
      <text x="24" y="28" font-size="8" fill="currentColor" stroke="none">AHI</text>
    </svg>`
  },
  {
    id: 'pulm-hypoxemia-sleep',
    name: 'Nocturnal Hypoxemia',
    domain: 'medicine',
    category: 'sleep-medicine',
    tags: ['nocturnal', 'hypoxemia', 'desaturation', 'oxygen', 'sleep'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <path d="M12 40c4-2 8-12 12-8 4 4 4 8 8 4 4-4 8-12 12-4 4 8 4 8 8 8"/>
      <path d="M12 36h44" stroke-dasharray="2 2"/>
      <text x="10" y="32" font-size="5" fill="red" stroke="none">88%</text>
      <path d="M8 12l8-8"/>
      <circle cx="20" cy="8" r="4"/>
      <path d="M48 12l8-8"/>
      <circle cx="52" cy="8" r="4"/>
      <text x="22" y="58" font-size="5" fill="currentColor" stroke="none">SpO2</text>
    </svg>`
  },
  {
    id: 'pulm-home-oxygen',
    name: 'Home Oxygen Therapy',
    domain: 'medicine',
    category: 'sleep-medicine',
    tags: ['home oxygen', 'LTOT', 'long term', 'therapy', 'portable'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="16" ry="20"/>
      <ellipse cx="32" cy="36" rx="12" ry="16" fill="currentColor" opacity="0.1"/>
      <path d="M32 16v-8"/>
      <rect x="28" y="4" width="8" height="6" rx="2"/>
      <circle cx="32" cy="28" r="4"/>
      <text x="28" y="32" font-size="6" fill="currentColor" stroke="none">O2</text>
      <path d="M32 56v4"/>
      <path d="M24 60h16"/>
      <path d="M48 32l8-4"/>
      <path d="M56 28l4 8"/>
      <text x="52" y="44" font-size="4" fill="currentColor" stroke="none">L/min</text>
    </svg>`
  },
];

export default pulmonologyIcons;
