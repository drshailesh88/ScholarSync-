/**
 * Cardiology Icon Library
 * Comprehensive SVG icons for cardiovascular medicine
 *
 * Categories:
 * - Cardiac Anatomy (chambers, valves, vessels, conduction)
 * - Pathology (CAD, MI, arrhythmias, structural)
 * - Equipment & Devices (diagnostic, interventional, implantable)
 */

import type { IconDefinition } from './index';

export const cardiologyIcons: IconDefinition[] = [
  // ===========================================================================
  // CARDIAC CHAMBERS & STRUCTURES
  // ===========================================================================
  {
    id: 'cardio-heart-4chamber',
    name: 'Heart 4-Chamber View',
    domain: 'medicine',
    category: 'cardiac-anatomy',
    tags: ['heart', 'chambers', 'anatomy', 'echocardiogram', 'four chamber', 'apical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-12 0-20 10-20 22 0 14 20 26 20 26s20-12 20-26c0-12-8-22-20-22z"/>
      <path d="M32 8v48"/>
      <path d="M12 30h40"/>
      <text x="22" y="22" font-size="6" fill="currentColor" stroke="none">RA</text>
      <text x="38" y="22" font-size="6" fill="currentColor" stroke="none">LA</text>
      <text x="22" y="42" font-size="6" fill="currentColor" stroke="none">RV</text>
      <text x="38" y="42" font-size="6" fill="currentColor" stroke="none">LV</text>
    </svg>`
  },
  {
    id: 'cardio-right-atrium',
    name: 'Right Atrium',
    domain: 'medicine',
    category: 'cardiac-anatomy',
    tags: ['atrium', 'right', 'chamber', 'RA', 'tricuspid', 'vena cava'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 12c-4 0-8 4-8 10v20c0 6 4 10 8 10h12c2 0 4-2 4-4V16c0-2-2-4-4-4H16z"/>
      <path d="M8 16v-4c0-2 2-4 4-4h8" stroke-dasharray="2 2"/>
      <path d="M8 42v4c0 2 2 4 4 4h8" stroke-dasharray="2 2"/>
      <path d="M32 28l8 4-8 4"/>
      <circle cx="20" cy="32" r="3" fill="currentColor" opacity="0.3"/>
      <text x="36" y="20" font-size="5" fill="currentColor" stroke="none">SVC</text>
      <text x="36" y="50" font-size="5" fill="currentColor" stroke="none">IVC</text>
    </svg>`
  },
  {
    id: 'cardio-left-atrium',
    name: 'Left Atrium',
    domain: 'medicine',
    category: 'cardiac-anatomy',
    tags: ['atrium', 'left', 'chamber', 'LA', 'mitral', 'pulmonary veins'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="14"/>
      <path d="M20 18l-8-8"/>
      <path d="M44 18l8-8"/>
      <path d="M20 46l-8 8"/>
      <path d="M44 46l8 8"/>
      <path d="M32 46v10"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <text x="4" y="12" font-size="4" fill="currentColor" stroke="none">PV</text>
      <text x="50" y="12" font-size="4" fill="currentColor" stroke="none">PV</text>
    </svg>`
  },
  {
    id: 'cardio-right-ventricle',
    name: 'Right Ventricle',
    domain: 'medicine',
    category: 'cardiac-anatomy',
    tags: ['ventricle', 'right', 'chamber', 'RV', 'tricuspid', 'pulmonary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 8h20c2 0 4 2 4 4v40c0 4-6 8-12 8-8 0-16-6-16-14V12c0-2 2-4 4-4z"/>
      <path d="M12 8l-4-4"/>
      <path d="M36 12v-4c0-2 2-4 4-4"/>
      <path d="M16 20l8 4-8 4"/>
      <path d="M20 40c0 4 4 8 8 8"/>
      <line x1="16" y1="32" x2="28" y2="32" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'cardio-left-ventricle',
    name: 'Left Ventricle',
    domain: 'medicine',
    category: 'cardiac-anatomy',
    tags: ['ventricle', 'left', 'chamber', 'LV', 'mitral', 'aortic', 'apex'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24c2 0 4 2 4 4v32c0 8-8 16-16 16s-16-8-16-14V12c0-2 2-4 4-4z"/>
      <path d="M20 8l-4-4"/>
      <path d="M44 8l4-4"/>
      <ellipse cx="32" cy="44" rx="8" ry="6" fill="currentColor" opacity="0.2"/>
      <path d="M24 24c4 4 12 4 16 0"/>
      <line x1="32" y1="16" x2="32" y2="52" stroke-dasharray="3 2"/>
    </svg>`
  },
  {
    id: 'cardio-septum',
    name: 'Interventricular Septum',
    domain: 'medicine',
    category: 'cardiac-anatomy',
    tags: ['septum', 'interventricular', 'IVS', 'wall', 'septal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="26" y="8" width="12" height="48" rx="2" fill="currentColor" opacity="0.2"/>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <path d="M14 20c4 2 8 2 12 0"/>
      <path d="M38 20c4 2 8 2 12 0"/>
      <path d="M14 44c4 2 8 2 12 0"/>
      <path d="M38 44c4 2 8 2 12 0"/>
      <text x="8" y="32" font-size="5" fill="currentColor" stroke="none">RV</text>
      <text x="48" y="32" font-size="5" fill="currentColor" stroke="none">LV</text>
    </svg>`
  },

  // ===========================================================================
  // CARDIAC VALVES
  // ===========================================================================
  {
    id: 'cardio-mitral-valve',
    name: 'Mitral Valve',
    domain: 'medicine',
    category: 'cardiac-valves',
    tags: ['mitral', 'bicuspid', 'valve', 'left', 'AV valve', 'leaflets'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="20" ry="8"/>
      <path d="M12 24c0 4 8 12 20 12s20-8 20-12"/>
      <path d="M22 36l-6 16"/>
      <path d="M42 36l6 16"/>
      <path d="M32 36v20"/>
      <circle cx="16" cy="54" r="2"/>
      <circle cx="32" cy="56" r="2"/>
      <circle cx="48" cy="54" r="2"/>
      <text x="24" y="44" font-size="4" fill="currentColor" stroke="none">A1</text>
      <text x="36" y="44" font-size="4" fill="currentColor" stroke="none">P1</text>
    </svg>`
  },
  {
    id: 'cardio-tricuspid-valve',
    name: 'Tricuspid Valve',
    domain: 'medicine',
    category: 'cardiac-valves',
    tags: ['tricuspid', 'valve', 'right', 'AV valve', 'three leaflets'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="22" ry="8"/>
      <path d="M10 20c0 6 10 14 22 14s22-8 22-14"/>
      <path d="M18 34l-4 18"/>
      <path d="M32 34v22"/>
      <path d="M46 34l4 18"/>
      <circle cx="14" cy="54" r="2"/>
      <circle cx="32" cy="56" r="2"/>
      <circle cx="50" cy="54" r="2"/>
      <path d="M14 54c6-4 12-4 18 0"/>
      <path d="M32 56c6-4 12-4 18-2"/>
    </svg>`
  },
  {
    id: 'cardio-aortic-valve',
    name: 'Aortic Valve',
    domain: 'medicine',
    category: 'cardiac-valves',
    tags: ['aortic', 'semilunar', 'valve', 'cusps', 'left ventricular outflow'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22"/>
      <path d="M32 10c-8 8-8 16 0 22 8-6 8-14 0-22z" fill="currentColor" opacity="0.2"/>
      <path d="M14 42c4-10 12-12 18-10-2 8-10 14-18 10z" fill="currentColor" opacity="0.2"/>
      <path d="M50 42c-4-10-12-12-18-10 2 8 10 14 18 10z" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="6"/>
      <text x="28" y="18" font-size="4" fill="currentColor" stroke="none">R</text>
      <text x="16" y="44" font-size="4" fill="currentColor" stroke="none">L</text>
      <text x="44" y="44" font-size="4" fill="currentColor" stroke="none">N</text>
    </svg>`
  },
  {
    id: 'cardio-pulmonary-valve',
    name: 'Pulmonary Valve',
    domain: 'medicine',
    category: 'cardiac-valves',
    tags: ['pulmonary', 'pulmonic', 'semilunar', 'valve', 'RVOT'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M32 12c-6 6-6 14 0 20 6-6 6-14 0-20z"/>
      <path d="M16 40c4-8 10-10 16-8-2 6-8 12-16 8z"/>
      <path d="M48 40c-4-8-10-10-16-8 2 6 8 12 16 8z"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <path d="M32 4v8"/>
      <path d="M32 52v8"/>
    </svg>`
  },
  {
    id: 'cardio-valve-annulus',
    name: 'Valve Annulus',
    domain: 'medicine',
    category: 'cardiac-valves',
    tags: ['annulus', 'ring', 'fibrous', 'skeleton', 'valve support'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="12"/>
      <ellipse cx="32" cy="32" rx="20" ry="8" stroke-dasharray="4 2"/>
      <ellipse cx="32" cy="32" rx="16" ry="4" fill="currentColor" opacity="0.2"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <text x="24" y="52" font-size="5" fill="currentColor" stroke="none">Annulus</text>
    </svg>`
  },

  // ===========================================================================
  // CORONARY ARTERIES
  // ===========================================================================
  {
    id: 'cardio-lmca',
    name: 'Left Main Coronary Artery',
    domain: 'medicine',
    category: 'coronary',
    tags: ['LMCA', 'left main', 'coronary', 'artery', 'ostium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="6"/>
      <path d="M32 18v8" stroke-width="3"/>
      <path d="M32 26l-16 20" stroke-width="2.5"/>
      <path d="M32 26l12 24" stroke-width="2.5"/>
      <text x="4" y="50" font-size="5" fill="currentColor" stroke="none">LAD</text>
      <text x="46" y="54" font-size="5" fill="currentColor" stroke="none">LCx</text>
      <circle cx="32" cy="12" r="3" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'cardio-lad',
    name: 'Left Anterior Descending',
    domain: 'medicine',
    category: 'coronary',
    tags: ['LAD', 'anterior', 'descending', 'coronary', 'diagonal', 'septal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v48" stroke-width="2.5"/>
      <path d="M32 16l12 8"/>
      <path d="M32 24l-10 6"/>
      <path d="M32 32l12 8"/>
      <path d="M32 40l-10 6"/>
      <circle cx="32" cy="8" r="3" fill="currentColor"/>
      <text x="46" y="26" font-size="4" fill="currentColor" stroke="none">D1</text>
      <text x="8" y="32" font-size="4" fill="currentColor" stroke="none">S1</text>
      <text x="46" y="42" font-size="4" fill="currentColor" stroke="none">D2</text>
    </svg>`
  },
  {
    id: 'cardio-lcx',
    name: 'Left Circumflex',
    domain: 'medicine',
    category: 'coronary',
    tags: ['LCx', 'circumflex', 'coronary', 'obtuse marginal', 'OM'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 12c16 0 32 8 32 20s-8 20-16 24" stroke-width="2.5"/>
      <path d="M36 24l8 12"/>
      <path d="M44 36l6 8"/>
      <circle cx="16" cy="12" r="3" fill="currentColor"/>
      <text x="46" y="40" font-size="4" fill="currentColor" stroke="none">OM1</text>
      <text x="52" y="50" font-size="4" fill="currentColor" stroke="none">OM2</text>
    </svg>`
  },
  {
    id: 'cardio-rca',
    name: 'Right Coronary Artery',
    domain: 'medicine',
    category: 'coronary',
    tags: ['RCA', 'right', 'coronary', 'artery', 'marginal', 'PDA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M48 12c0 16-8 28-16 36s-16 8-16 8" stroke-width="2.5"/>
      <path d="M40 28l8 4"/>
      <path d="M32 40l-8 8"/>
      <circle cx="48" cy="12" r="3" fill="currentColor"/>
      <text x="50" y="34" font-size="4" fill="currentColor" stroke="none">AM</text>
      <text x="12" y="52" font-size="4" fill="currentColor" stroke="none">PDA</text>
    </svg>`
  },
  {
    id: 'cardio-coronary-anatomy',
    name: 'Coronary Anatomy Overview',
    domain: 'medicine',
    category: 'coronary',
    tags: ['coronary', 'anatomy', 'arteries', 'circulation', 'overview'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z" fill="currentColor" opacity="0.1"/>
      <path d="M28 14l-12 20-4 16" stroke="red" stroke-width="1.5"/>
      <path d="M28 14l8 24" stroke="red" stroke-width="1.5"/>
      <path d="M36 14c8 4 12 12 12 20" stroke="blue" stroke-width="1.5"/>
      <path d="M48 34l-8 14" stroke="blue"/>
      <circle cx="28" cy="14" r="2" fill="red"/>
      <circle cx="36" cy="14" r="2" fill="blue"/>
    </svg>`
  },

  // ===========================================================================
  // CONDUCTION SYSTEM
  // ===========================================================================
  {
    id: 'cardio-sa-node',
    name: 'SA Node',
    domain: 'medicine',
    category: 'conduction',
    tags: ['SA node', 'sinoatrial', 'pacemaker', 'sinus', 'automaticity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="12" ry="8" fill="currentColor" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="12" ry="8"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <path d="M32 40v16"/>
      <path d="M20 32h-12"/>
      <path d="M44 32h12"/>
      <path d="M8 32l4-4v8z" fill="currentColor"/>
      <path d="M56 32l-4-4v8z" fill="currentColor"/>
      <text x="20" y="56" font-size="5" fill="currentColor" stroke="none">SA Node</text>
    </svg>`
  },
  {
    id: 'cardio-av-node',
    name: 'AV Node',
    domain: 'medicine',
    category: 'conduction',
    tags: ['AV node', 'atrioventricular', 'conduction', 'delay', 'junction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v12"/>
      <ellipse cx="32" cy="28" rx="10" ry="6" fill="currentColor" opacity="0.3"/>
      <ellipse cx="32" cy="28" rx="10" ry="6"/>
      <path d="M32 34v8"/>
      <path d="M32 42l-8 14"/>
      <path d="M32 42l8 14"/>
      <circle cx="32" cy="28" r="3" fill="currentColor"/>
      <text x="18" y="60" font-size="4" fill="currentColor" stroke="none">LBB</text>
      <text x="40" y="60" font-size="4" fill="currentColor" stroke="none">RBB</text>
    </svg>`
  },
  {
    id: 'cardio-bundle-his',
    name: 'Bundle of His',
    domain: 'medicine',
    category: 'conduction',
    tags: ['bundle of His', 'AV bundle', 'conduction', 'common bundle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="6" fill="currentColor" opacity="0.3"/>
      <path d="M32 18v12" stroke-width="3"/>
      <path d="M32 30v6"/>
      <path d="M32 36l-14 20"/>
      <path d="M32 36l14 20"/>
      <text x="6" y="60" font-size="5" fill="currentColor" stroke="none">LBB</text>
      <text x="46" y="60" font-size="5" fill="currentColor" stroke="none">RBB</text>
      <text x="20" y="10" font-size="4" fill="currentColor" stroke="none">AV</text>
    </svg>`
  },
  {
    id: 'cardio-bundle-branches',
    name: 'Bundle Branches',
    domain: 'medicine',
    category: 'conduction',
    tags: ['bundle branch', 'LBB', 'RBB', 'fascicles', 'conduction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v16"/>
      <path d="M32 24l-16 32" stroke-width="2"/>
      <path d="M32 24l16 32" stroke-width="2"/>
      <path d="M20 44l-8 4"/>
      <path d="M22 50l-10 6"/>
      <circle cx="32" cy="8" r="3" fill="currentColor"/>
      <text x="4" y="50" font-size="4" fill="currentColor" stroke="none">LAF</text>
      <text x="4" y="60" font-size="4" fill="currentColor" stroke="none">LPF</text>
    </svg>`
  },
  {
    id: 'cardio-purkinje',
    name: 'Purkinje Fibers',
    domain: 'medicine',
    category: 'conduction',
    tags: ['Purkinje', 'fibers', 'conduction', 'ventricular', 'rapid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v20"/>
      <path d="M32 28c-12 4-20 16-20 28"/>
      <path d="M32 28c12 4 20 16 20 28"/>
      <path d="M16 40c-2 2-4 8-4 16"/>
      <path d="M48 40c2 2 4 8 4 16"/>
      <path d="M24 48c-2 4-4 8-4 8"/>
      <path d="M40 48c2 4 4 8 4 8"/>
      <circle cx="32" cy="8" r="3" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'cardio-conduction-system',
    name: 'Complete Conduction System',
    domain: 'medicine',
    category: 'conduction',
    tags: ['conduction', 'system', 'electrical', 'pathway', 'complete'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 6c-14 0-24 12-24 24 0 16 24 30 24 30s24-14 24-30c0-12-10-24-24-24z" fill="currentColor" opacity="0.1"/>
      <circle cx="44" cy="14" r="4" fill="#FFD700"/>
      <ellipse cx="32" cy="26" rx="4" ry="3" fill="#FFA500"/>
      <path d="M44 18l-8 5" stroke="#FFD700" stroke-width="2"/>
      <path d="M32 29v6" stroke="#FFA500" stroke-width="2"/>
      <path d="M32 35l-10 18" stroke="#90EE90" stroke-width="1.5"/>
      <path d="M32 35l10 18" stroke="#90EE90" stroke-width="1.5"/>
      <text x="50" y="16" font-size="4" fill="currentColor" stroke="none">SA</text>
      <text x="38" y="28" font-size="4" fill="currentColor" stroke="none">AV</text>
    </svg>`
  },

  // ===========================================================================
  // GREAT VESSELS
  // ===========================================================================
  {
    id: 'cardio-aorta',
    name: 'Aorta',
    domain: 'medicine',
    category: 'great-vessels',
    tags: ['aorta', 'ascending', 'arch', 'descending', 'great vessel'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 56v-20c0-16 8-24 8-28" stroke-width="3"/>
      <path d="M32 8c0 4 16 8 16 24v24" stroke-width="3"/>
      <path d="M28 16l-4-8"/>
      <path d="M36 12l4-8"/>
      <path d="M44 16l8-8"/>
      <circle cx="28" cy="52" r="2" fill="currentColor"/>
      <text x="16" y="10" font-size="4" fill="currentColor" stroke="none">LSA</text>
      <text x="34" y="6" font-size="4" fill="currentColor" stroke="none">LCA</text>
      <text x="52" y="10" font-size="4" fill="currentColor" stroke="none">IA</text>
    </svg>`
  },
  {
    id: 'cardio-pulmonary-trunk',
    name: 'Pulmonary Trunk',
    domain: 'medicine',
    category: 'great-vessels',
    tags: ['pulmonary', 'trunk', 'artery', 'bifurcation', 'great vessel'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 56v-24" stroke-width="3"/>
      <path d="M32 32l-20-20" stroke-width="2.5"/>
      <path d="M32 32l20-20" stroke-width="2.5"/>
      <circle cx="32" cy="56" r="3" fill="currentColor" opacity="0.3"/>
      <path d="M12 12l-4-8"/>
      <path d="M52 12l4-8"/>
      <text x="2" y="8" font-size="4" fill="currentColor" stroke="none">RPA</text>
      <text x="50" y="8" font-size="4" fill="currentColor" stroke="none">LPA</text>
    </svg>`
  },
  {
    id: 'cardio-vena-cava',
    name: 'Vena Cava',
    domain: 'medicine',
    category: 'great-vessels',
    tags: ['vena cava', 'SVC', 'IVC', 'superior', 'inferior', 'venous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v20" stroke-width="3" stroke="blue"/>
      <ellipse cx="32" cy="32" rx="8" ry="6" fill="currentColor" opacity="0.2"/>
      <path d="M32 38v22" stroke-width="3" stroke="blue"/>
      <path d="M24 10h16"/>
      <path d="M24 54h16"/>
      <text x="40" y="14" font-size="5" fill="currentColor" stroke="none">SVC</text>
      <text x="40" y="52" font-size="5" fill="currentColor" stroke="none">IVC</text>
      <text x="22" y="34" font-size="4" fill="currentColor" stroke="none">RA</text>
    </svg>`
  },
  {
    id: 'cardio-pulmonary-veins',
    name: 'Pulmonary Veins',
    domain: 'medicine',
    category: 'great-vessels',
    tags: ['pulmonary veins', 'RUPV', 'RLPV', 'LUPV', 'LLPV', 'oxygenated'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <path d="M20 40l-12-20"/>
      <path d="M24 36l-8-24"/>
      <path d="M44 40l12-20"/>
      <path d="M40 36l8-24"/>
      <text x="2" y="18" font-size="3" fill="currentColor" stroke="none">RUPV</text>
      <text x="10" y="10" font-size="3" fill="currentColor" stroke="none">RLPV</text>
      <text x="48" y="18" font-size="3" fill="currentColor" stroke="none">LUPV</text>
      <text x="48" y="10" font-size="3" fill="currentColor" stroke="none">LLPV</text>
      <text x="26" y="44" font-size="4" fill="currentColor" stroke="none">LA</text>
    </svg>`
  },

  // ===========================================================================
  // PATHOLOGY - CORONARY ARTERY DISEASE
  // ===========================================================================
  {
    id: 'cardio-atherosclerosis',
    name: 'Atherosclerotic Plaque',
    domain: 'medicine',
    category: 'pathology-cad',
    tags: ['atherosclerosis', 'plaque', 'stenosis', 'cholesterol', 'lipid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" rx="12"/>
      <ellipse cx="32" cy="24" rx="12" ry="4" fill="#FFA500" opacity="0.6"/>
      <ellipse cx="32" cy="40" rx="12" ry="4" fill="#FFA500" opacity="0.6"/>
      <path d="M20 32h24" stroke-width="2"/>
      <text x="8" y="14" font-size="4" fill="currentColor" stroke="none">Lumen</text>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Plaque</text>
    </svg>`
  },
  {
    id: 'cardio-stenosis-mild',
    name: 'Mild Stenosis (30-50%)',
    domain: 'medicine',
    category: 'pathology-cad',
    tags: ['stenosis', 'mild', 'narrowing', 'CAD', '30-50%'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h48v16H8z"/>
      <path d="M24 24v4c-4 2-4 6 0 8v4"/>
      <path d="M40 24v4c4 2 4 6 0 8v4"/>
      <rect x="24" y="28" width="16" height="8" fill="#90EE90" opacity="0.5"/>
      <text x="26" y="34" font-size="5" fill="currentColor" stroke="none">40%</text>
    </svg>`
  },
  {
    id: 'cardio-stenosis-moderate',
    name: 'Moderate Stenosis (50-70%)',
    domain: 'medicine',
    category: 'pathology-cad',
    tags: ['stenosis', 'moderate', 'narrowing', 'CAD', '50-70%'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h48v16H8z"/>
      <path d="M24 24v6c-6 2-6 4 0 6v4"/>
      <path d="M40 24v6c6 2 6 4 0 6v4"/>
      <rect x="24" y="30" width="16" height="4" fill="#FFD700" opacity="0.6"/>
      <text x="26" y="34" font-size="5" fill="currentColor" stroke="none">60%</text>
    </svg>`
  },
  {
    id: 'cardio-stenosis-severe',
    name: 'Severe Stenosis (70-99%)',
    domain: 'medicine',
    category: 'pathology-cad',
    tags: ['stenosis', 'severe', 'critical', 'narrowing', 'CAD', '70-99%'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h48v16H8z"/>
      <path d="M24 24v8c-8 1-8 2 0 3v5"/>
      <path d="M40 24v8c8 1 8 2 0 3v5"/>
      <line x1="24" y1="32" x2="40" y2="32" stroke="#DC143C" stroke-width="2"/>
      <text x="26" y="34" font-size="5" fill="#DC143C" stroke="none">90%</text>
    </svg>`
  },
  {
    id: 'cardio-total-occlusion',
    name: 'Total Occlusion (CTO)',
    domain: 'medicine',
    category: 'pathology-cad',
    tags: ['CTO', 'chronic total occlusion', 'blocked', '100%', 'occlusion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h48v16H8z"/>
      <rect x="26" y="24" width="12" height="16" fill="#8B0000" opacity="0.8"/>
      <line x1="26" y1="24" x2="38" y2="40" stroke="#DC143C" stroke-width="2"/>
      <line x1="38" y1="24" x2="26" y2="40" stroke="#DC143C" stroke-width="2"/>
      <text x="22" y="52" font-size="5" fill="currentColor" stroke="none">CTO 100%</text>
    </svg>`
  },
  {
    id: 'cardio-thrombus',
    name: 'Coronary Thrombus',
    domain: 'medicine',
    category: 'pathology-cad',
    tags: ['thrombus', 'clot', 'acute', 'coronary', 'ACS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28h48v8H8z"/>
      <ellipse cx="32" cy="32" rx="10" ry="6" fill="#8B0000"/>
      <circle cx="28" cy="30" r="2" fill="#DC143C"/>
      <circle cx="34" cy="34" r="2" fill="#DC143C"/>
      <circle cx="36" cy="30" r="1.5" fill="#DC143C"/>
      <path d="M22 32c-4 0-8 1-14 0"/>
      <path d="M42 32c4 0 8-1 14 0"/>
    </svg>`
  },
  {
    id: 'cardio-plaque-rupture',
    name: 'Plaque Rupture',
    domain: 'medicine',
    category: 'pathology-cad',
    tags: ['plaque rupture', 'vulnerable', 'TCFA', 'acute coronary', 'ACS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h48v16H8z"/>
      <ellipse cx="24" cy="36" rx="10" ry="4" fill="#FFA500" opacity="0.6"/>
      <path d="M28 32l8-4 4 8" stroke="#DC143C" stroke-width="2"/>
      <circle cx="40" cy="32" r="4" fill="#8B0000"/>
      <path d="M22 28c4-2 8-2 12 0" stroke-dasharray="2 1"/>
    </svg>`
  },

  // ===========================================================================
  // PATHOLOGY - MYOCARDIAL INFARCTION
  // ===========================================================================
  {
    id: 'cardio-stemi',
    name: 'STEMI',
    domain: 'medicine',
    category: 'pathology-mi',
    tags: ['STEMI', 'ST elevation', 'myocardial infarction', 'transmural', 'acute'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z"/>
      <path d="M20 36l8 8 12-20" fill="#DC143C" opacity="0.4"/>
      <path d="M4 32h8l4 8 8-16 8 16 4-8h8l4 8h8"/>
      <text x="4" y="56" font-size="5" fill="currentColor" stroke="none">ST↑</text>
    </svg>`
  },
  {
    id: 'cardio-nstemi',
    name: 'NSTEMI',
    domain: 'medicine',
    category: 'pathology-mi',
    tags: ['NSTEMI', 'non-ST elevation', 'myocardial infarction', 'subendocardial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z"/>
      <path d="M20 40c4-2 8-4 12-4s8 2 12 4" fill="#FFA500" opacity="0.4"/>
      <path d="M4 32h8l4 4 8-8 8 8 4-4h8l4-4h8"/>
      <text x="4" y="56" font-size="5" fill="currentColor" stroke="none">ST↓/T inv</text>
    </svg>`
  },
  {
    id: 'cardio-anterior-mi',
    name: 'Anterior MI Territory',
    domain: 'medicine',
    category: 'pathology-mi',
    tags: ['anterior', 'MI', 'LAD', 'territory', 'V1-V4'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z"/>
      <path d="M24 24c4 8 4 20-4 28l24 0c-8-8-8-20-4-28z" fill="#DC143C" opacity="0.5"/>
      <text x="26" y="44" font-size="6" fill="white" stroke="none">ANT</text>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">LAD territory</text>
    </svg>`
  },
  {
    id: 'cardio-inferior-mi',
    name: 'Inferior MI Territory',
    domain: 'medicine',
    category: 'pathology-mi',
    tags: ['inferior', 'MI', 'RCA', 'territory', 'II III aVF'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z"/>
      <path d="M20 50c4 4 8 6 12 6s8-2 12-6c-4-4-8-10-12-10s-8 6-12 10z" fill="#DC143C" opacity="0.5"/>
      <text x="26" y="52" font-size="6" fill="white" stroke="none">INF</text>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">RCA territory</text>
    </svg>`
  },
  {
    id: 'cardio-lateral-mi',
    name: 'Lateral MI Territory',
    domain: 'medicine',
    category: 'pathology-mi',
    tags: ['lateral', 'MI', 'LCx', 'territory', 'I aVL V5 V6'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z"/>
      <path d="M44 24c4 8 8 16 4 28l-8-8c2-6 2-14 4-20z" fill="#DC143C" opacity="0.5"/>
      <text x="38" y="40" font-size="5" fill="white" stroke="none">LAT</text>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">LCx territory</text>
    </svg>`
  },
  {
    id: 'cardio-scar-tissue',
    name: 'Myocardial Scar',
    domain: 'medicine',
    category: 'pathology-mi',
    tags: ['scar', 'fibrosis', 'chronic', 'Q wave', 'old MI'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z"/>
      <path d="M24 32c4 8 4 16 0 24h16c-4-8-4-16 0-24z" fill="#808080" opacity="0.6"/>
      <line x1="26" y1="36" x2="38" y2="36" stroke="#666"/>
      <line x1="26" y1="42" x2="38" y2="42" stroke="#666"/>
      <line x1="26" y1="48" x2="38" y2="48" stroke="#666"/>
    </svg>`
  },

  // ===========================================================================
  // PATHOLOGY - ARRHYTHMIAS
  // ===========================================================================
  {
    id: 'cardio-afib',
    name: 'Atrial Fibrillation',
    domain: 'medicine',
    category: 'pathology-arrhythmia',
    tags: ['AFib', 'atrial fibrillation', 'irregular', 'no P waves', 'AF'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32c2-2 4 2 6 0s2-4 4-2 2 4 4 2 4-4 6-2 2 6 4 4 4-6 6-4 4 4 6 2 4-2 6 0 4-4 6-2 4 6 6 4"/>
      <path d="M4 44h4l2 8 4-16 4 16 2-8h4" stroke-width="2"/>
      <text x="4" y="22" font-size="5" fill="currentColor" stroke="none">No P waves</text>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Irregular RR</text>
    </svg>`
  },
  {
    id: 'cardio-aflutter',
    name: 'Atrial Flutter',
    domain: 'medicine',
    category: 'pathology-arrhythmia',
    tags: ['flutter', 'atrial flutter', 'sawtooth', 'typical', 'CTI'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 28l6-8 6 8 6-8 6 8 6-8 6 8 6-8 6 8"/>
      <path d="M4 44h8l2 8 4-16 4 16 2-8h12l2 8 4-16"/>
      <text x="4" y="18" font-size="4" fill="currentColor" stroke="none">Sawtooth</text>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">~300 bpm / 2:1-4:1</text>
    </svg>`
  },
  {
    id: 'cardio-vtach',
    name: 'Ventricular Tachycardia',
    domain: 'medicine',
    category: 'pathology-arrhythmia',
    tags: ['VT', 'ventricular tachycardia', 'wide complex', 'monomorphic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32l4-20 6 40 6-40 6 40 6-40 6 40 6-40 6 40 4-20" stroke-width="2" stroke="#DC143C"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Wide QRS &gt;120ms</text>
    </svg>`
  },
  {
    id: 'cardio-vfib',
    name: 'Ventricular Fibrillation',
    domain: 'medicine',
    category: 'pathology-arrhythmia',
    tags: ['VF', 'ventricular fibrillation', 'cardiac arrest', 'chaotic', 'shockable'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32c2-8 3 6 5-4 2 10 4-6 6 8 2-12 4 4 6-8 2 14 5-10 7 6 2-8 3 12 5-4 2 6 4-8 6 4 2-10 4 6 6-2" stroke-width="2" stroke="#DC143C"/>
      <text x="4" y="56" font-size="5" fill="#DC143C" stroke="none">EMERGENCY</text>
    </svg>`
  },
  {
    id: 'cardio-av-block-3',
    name: 'Complete Heart Block',
    domain: 'medicine',
    category: 'pathology-arrhythmia',
    tags: ['CHB', 'complete heart block', '3rd degree', 'AV dissociation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 16l4 4 4-4 8 0 4 4 4-4 8 0 4 4 4-4 8 0 4 4" stroke="blue"/>
      <path d="M4 44h8l2 8 4-16 4 16 2-8h20l2 8 4-16" stroke="#228B22"/>
      <text x="4" y="34" font-size="4" fill="currentColor" stroke="none">P waves march through</text>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">No AV conduction</text>
    </svg>`
  },
  {
    id: 'cardio-wpw',
    name: 'WPW Syndrome',
    domain: 'medicine',
    category: 'pathology-arrhythmia',
    tags: ['WPW', 'Wolff-Parkinson-White', 'delta wave', 'accessory pathway', 'preexcitation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32h4l2 4 4-4 6 0 4 8-2 8 6-16 4 8 2-4h4l2 4 4-4 4 0 4 8"/>
      <path d="M12 36l4 0" stroke="#FFA500" stroke-width="3"/>
      <text x="8" y="52" font-size="4" fill="#FFA500" stroke="none">Delta wave</text>
      <text x="4" y="22" font-size="4" fill="currentColor" stroke="none">Short PR</text>
    </svg>`
  },

  // ===========================================================================
  // PATHOLOGY - STRUCTURAL
  // ===========================================================================
  {
    id: 'cardio-asd',
    name: 'Atrial Septal Defect',
    domain: 'medicine',
    category: 'pathology-structural',
    tags: ['ASD', 'atrial septal defect', 'congenital', 'shunt', 'secundum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z"/>
      <line x1="32" y1="8" x2="32" y2="30"/>
      <line x1="32" y1="38" x2="32" y2="60"/>
      <ellipse cx="32" cy="34" rx="4" ry="6" fill="#DC143C" opacity="0.5"/>
      <path d="M28 34l8 0" stroke="#DC143C" stroke-width="2"/>
      <text x="12" y="26" font-size="5" fill="currentColor" stroke="none">RA</text>
      <text x="44" y="26" font-size="5" fill="currentColor" stroke="none">LA</text>
    </svg>`
  },
  {
    id: 'cardio-vsd',
    name: 'Ventricular Septal Defect',
    domain: 'medicine',
    category: 'pathology-structural',
    tags: ['VSD', 'ventricular septal defect', 'congenital', 'shunt', 'membranous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z"/>
      <line x1="32" y1="8" x2="32" y2="36"/>
      <line x1="32" y1="48" x2="32" y2="60"/>
      <ellipse cx="32" cy="42" rx="4" ry="6" fill="#DC143C" opacity="0.5"/>
      <path d="M28 42l8 0" stroke="#DC143C" stroke-width="2"/>
      <text x="12" y="46" font-size="5" fill="currentColor" stroke="none">RV</text>
      <text x="44" y="46" font-size="5" fill="currentColor" stroke="none">LV</text>
    </svg>`
  },
  {
    id: 'cardio-hcm',
    name: 'Hypertrophic Cardiomyopathy',
    domain: 'medicine',
    category: 'pathology-structural',
    tags: ['HCM', 'hypertrophic', 'cardiomyopathy', 'HOCM', 'SAM', 'ASH'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z"/>
      <path d="M26 16v40" stroke-width="8"/>
      <path d="M38 16v40" stroke-width="2"/>
      <text x="8" y="36" font-size="4" fill="currentColor" stroke="none">ASH</text>
      <text x="42" y="36" font-size="4" fill="currentColor" stroke="none">LV</text>
    </svg>`
  },
  {
    id: 'cardio-dcm',
    name: 'Dilated Cardiomyopathy',
    domain: 'medicine',
    category: 'pathology-structural',
    tags: ['DCM', 'dilated', 'cardiomyopathy', 'enlarged', 'EF reduced'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4c-18 0-28 14-28 28 0 18 28 32 28 32s28-14 28-32c0-14-10-28-28-28z"/>
      <path d="M32 16c-8 0-16 8-16 16 0 10 16 20 16 20s16-10 16-20c0-8-8-16-16-16z" stroke-dasharray="4 2"/>
      <text x="20" y="38" font-size="4" fill="currentColor" stroke="none">Dilated</text>
    </svg>`
  },
  {
    id: 'cardio-aortic-stenosis',
    name: 'Aortic Stenosis',
    domain: 'medicine',
    category: 'pathology-structural',
    tags: ['AS', 'aortic stenosis', 'calcified', 'valve', 'gradient'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="48" rx="12"/>
      <ellipse cx="32" cy="24" rx="8" ry="4" fill="#808080"/>
      <path d="M28 24l8 0" stroke-width="2"/>
      <path d="M24 40l8-8 8 8" fill="currentColor" opacity="0.3"/>
      <text x="8" y="28" font-size="4" fill="currentColor" stroke="none">Calcified</text>
      <text x="8" y="48" font-size="4" fill="currentColor" stroke="none">LVH</text>
    </svg>`
  },
  {
    id: 'cardio-mitral-regurg',
    name: 'Mitral Regurgitation',
    domain: 'medicine',
    category: 'pathology-structural',
    tags: ['MR', 'mitral regurgitation', 'valve', 'leak', 'insufficiency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="16" ry="8"/>
      <path d="M16 24c4 4 12 12 16 12s12-8 16-12"/>
      <path d="M32 36v-24" stroke="#DC143C" stroke-width="2" stroke-dasharray="4 2"/>
      <path d="M28 16l4-4 4 4" stroke="#DC143C"/>
      <text x="8" y="48" font-size="4" fill="#DC143C" stroke="none">Regurgitant jet</text>
      <text x="40" y="20" font-size="5" fill="currentColor" stroke="none">LA</text>
    </svg>`
  },

  // ===========================================================================
  // DIAGNOSTIC EQUIPMENT
  // ===========================================================================
  {
    id: 'cardio-ecg-12lead',
    name: '12-Lead ECG',
    domain: 'medicine',
    category: 'equipment-diagnostic',
    tags: ['ECG', 'EKG', '12-lead', 'electrocardiogram', 'diagnostic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="36" rx="2"/>
      <path d="M12 28h8l2 4 4-8 4 8 2-4h8"/>
      <path d="M12 38h8l2 4 4-8 4 8 2-4h8"/>
      <rect x="44" y="20" width="8" height="6" rx="1"/>
      <line x1="12" y1="48" x2="52" y2="48"/>
      <circle cx="16" cy="12" r="2"/>
      <circle cx="48" cy="12" r="2"/>
    </svg>`
  },
  {
    id: 'cardio-holter',
    name: 'Holter Monitor',
    domain: 'medicine',
    category: 'equipment-diagnostic',
    tags: ['Holter', 'ambulatory', 'monitor', '24-hour', '48-hour'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="40" rx="4"/>
      <rect x="20" y="24" width="24" height="12" rx="1"/>
      <path d="M24 30h4l2 3 4-6 4 6 2-3h4"/>
      <circle cx="28" cy="48" r="4"/>
      <circle cx="40" cy="48" r="4"/>
      <path d="M20 8c0-2 2-4 4-4h16c2 0 4 2 4 4v12"/>
      <line x1="24" y1="8" x2="24" y2="16" stroke-dasharray="2 2"/>
      <line x1="40" y1="8" x2="40" y2="16" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'cardio-echo-probe',
    name: 'Echo Probe',
    domain: 'medicine',
    category: 'equipment-diagnostic',
    tags: ['echocardiogram', 'probe', 'transducer', 'TTE', 'ultrasound'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v12c0 4-4 8-8 8s-8-4-8-8V8z"/>
      <rect x="20" y="4" width="24" height="4" rx="1"/>
      <path d="M28 28v28c0 2 2 4 4 4s4-2 4-4V28"/>
      <ellipse cx="32" cy="20" rx="6" ry="4" fill="currentColor" opacity="0.3"/>
      <path d="M26 16c4-2 8-2 12 0"/>
    </svg>`
  },
  {
    id: 'cardio-tee-probe',
    name: 'TEE Probe',
    domain: 'medicine',
    category: 'equipment-diagnostic',
    tags: ['TEE', 'transesophageal', 'echo', 'probe', 'intracardiac'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="52" rx="8" ry="6"/>
      <path d="M28 46c-4-8-4-24 4-38"/>
      <path d="M36 46c4-8 4-24-4-38"/>
      <ellipse cx="32" cy="52" rx="4" ry="3" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="8" r="4"/>
    </svg>`
  },
  {
    id: 'cardio-cardiac-ct',
    name: 'Cardiac CT',
    domain: 'medicine',
    category: 'equipment-diagnostic',
    tags: ['cardiac CT', 'CCTA', 'coronary CTA', 'calcium score', 'imaging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <ellipse cx="32" cy="32" rx="16" ry="12" stroke-dasharray="4 2"/>
      <path d="M32 8c-14 0-24 10-24 20" stroke-width="4"/>
      <rect x="8" y="44" width="48" height="12" rx="2"/>
      <line x1="16" y1="50" x2="48" y2="50"/>
    </svg>`
  },
  {
    id: 'cardio-cardiac-mri',
    name: 'Cardiac MRI',
    domain: 'medicine',
    category: 'equipment-diagnostic',
    tags: ['cardiac MRI', 'CMR', 'imaging', 'LGE', 'T1 mapping'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="16" width="56" height="32" rx="16"/>
      <ellipse cx="32" cy="32" rx="12" ry="8"/>
      <rect x="16" y="48" width="32" height="8" rx="2"/>
      <path d="M28 28l4 4 4-8" stroke-width="2"/>
    </svg>`
  },

  // ===========================================================================
  // INTERVENTIONAL EQUIPMENT
  // ===========================================================================
  {
    id: 'cardio-stent',
    name: 'Coronary Stent',
    domain: 'medicine',
    category: 'equipment-interventional',
    tags: ['stent', 'DES', 'BMS', 'PCI', 'coronary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h48v16H8z" stroke-dasharray="4 2"/>
      <path d="M12 24v16M16 24v16M20 24v16M24 24v16M28 24v16M32 24v16M36 24v16M40 24v16M44 24v16M48 24v16M52 24v16"/>
      <path d="M12 28h40M12 36h40"/>
      <ellipse cx="32" cy="32" rx="20" ry="8" fill="currentColor" opacity="0.1"/>
    </svg>`
  },
  {
    id: 'cardio-balloon',
    name: 'Balloon Catheter',
    domain: 'medicine',
    category: 'equipment-interventional',
    tags: ['balloon', 'angioplasty', 'PTCA', 'dilation', 'catheter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="16" ry="10"/>
      <line x1="4" y1="32" x2="16" y2="32" stroke-width="2"/>
      <line x1="48" y1="32" x2="60" y2="32" stroke-width="2"/>
      <path d="M24 28l4 4 4-4"/>
      <path d="M24 36l4-4 4 4"/>
    </svg>`
  },
  {
    id: 'cardio-guidewire',
    name: 'Guidewire',
    domain: 'medicine',
    category: 'equipment-interventional',
    tags: ['guidewire', 'wire', 'catheter', 'PCI', 'crossing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32c8-4 16-8 24-8s16 4 28 8" stroke-width="1"/>
      <circle cx="56" cy="32" r="3"/>
      <path d="M52 28l4 4 4-4"/>
    </svg>`
  },
  {
    id: 'cardio-guiding-catheter',
    name: 'Guiding Catheter',
    domain: 'medicine',
    category: 'equipment-interventional',
    tags: ['guiding catheter', 'JL', 'JR', 'EBU', 'catheter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56V32c0-16 8-24 24-24" stroke-width="4"/>
      <path d="M32 8l8 8"/>
      <circle cx="32" cy="8" r="4"/>
      <rect x="4" y="52" width="12" height="8" rx="2"/>
    </svg>`
  },
  {
    id: 'cardio-ivus',
    name: 'IVUS Catheter',
    domain: 'medicine',
    category: 'equipment-interventional',
    tags: ['IVUS', 'intravascular ultrasound', 'imaging', 'catheter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="40" y2="32" stroke-width="3"/>
      <ellipse cx="48" cy="32" rx="8" ry="6"/>
      <path d="M44 28c2 2 2 6 0 8"/>
      <path d="M48 26c4 4 4 8 0 12"/>
      <path d="M52 24c6 6 6 10 0 16"/>
    </svg>`
  },
  {
    id: 'cardio-ffr-wire',
    name: 'FFR Pressure Wire',
    domain: 'medicine',
    category: 'equipment-interventional',
    tags: ['FFR', 'iFR', 'pressure wire', 'physiology', 'stenosis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32h48"/>
      <circle cx="56" cy="32" r="4"/>
      <rect x="52" y="28" width="8" height="8" rx="1"/>
      <path d="M20 24v16"/>
      <text x="16" y="20" font-size="4" fill="currentColor" stroke="none">Pd</text>
      <text x="16" y="48" font-size="4" fill="currentColor" stroke="none">Pa</text>
    </svg>`
  },

  // ===========================================================================
  // IMPLANTABLE DEVICES
  // ===========================================================================
  {
    id: 'cardio-pacemaker',
    name: 'Pacemaker',
    domain: 'medicine',
    category: 'equipment-implantable',
    tags: ['pacemaker', 'PPM', 'single chamber', 'dual chamber', 'implantable'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="16" ry="12" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="24" rx="16" ry="12"/>
      <path d="M28 36c-4 4-8 16-8 24"/>
      <path d="M36 36c4 4 8 16 8 24"/>
      <circle cx="20" cy="60" r="2" fill="currentColor"/>
      <circle cx="44" cy="60" r="2" fill="currentColor"/>
      <text x="26" y="28" font-size="6" fill="currentColor" stroke="none">PM</text>
    </svg>`
  },
  {
    id: 'cardio-icd',
    name: 'ICD',
    domain: 'medicine',
    category: 'equipment-implantable',
    tags: ['ICD', 'defibrillator', 'implantable', 'shock', 'VT VF'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="18" ry="14" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="24" rx="18" ry="14"/>
      <path d="M26 20l6 8-6 8" stroke-width="2" stroke="#DC143C"/>
      <path d="M38 20l-6 8 6 8" stroke-width="2" stroke="#DC143C"/>
      <path d="M32 38c0 8-4 18-4 22"/>
      <circle cx="28" cy="60" r="2" fill="currentColor"/>
      <text x="24" y="16" font-size="5" fill="currentColor" stroke="none">ICD</text>
    </svg>`
  },
  {
    id: 'cardio-crt',
    name: 'CRT Device',
    domain: 'medicine',
    category: 'equipment-implantable',
    tags: ['CRT', 'biventricular', 'resynchronization', 'heart failure', 'CRT-D CRT-P'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="18" ry="12" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="20" rx="18" ry="12"/>
      <path d="M24 32c-6 6-10 20-10 28"/>
      <path d="M32 32c0 8 0 20 0 28"/>
      <path d="M40 32c6 6 10 20 10 28"/>
      <circle cx="14" cy="60" r="2" fill="currentColor"/>
      <circle cx="32" cy="60" r="2" fill="currentColor"/>
      <circle cx="50" cy="60" r="2" fill="currentColor"/>
      <text x="22" y="22" font-size="5" fill="currentColor" stroke="none">CRT</text>
    </svg>`
  },
  {
    id: 'cardio-lvad',
    name: 'LVAD',
    domain: 'medicine',
    category: 'equipment-implantable',
    tags: ['LVAD', 'ventricular assist', 'mechanical support', 'heart failure', 'pump'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="16"/>
      <path d="M20 32h24"/>
      <path d="M32 20v24"/>
      <circle cx="32" cy="32" r="6"/>
      <path d="M48 32h12"/>
      <path d="M4 32h12"/>
      <path d="M56 28l4 4-4 4"/>
    </svg>`
  },
  {
    id: 'cardio-mechanical-valve',
    name: 'Mechanical Heart Valve',
    domain: 'medicine',
    category: 'equipment-implantable',
    tags: ['mechanical valve', 'prosthetic', 'bileaflet', 'anticoagulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <ellipse cx="32" cy="32" rx="20" ry="6"/>
      <rect x="24" y="20" width="4" height="24" rx="1" fill="currentColor"/>
      <rect x="36" y="20" width="4" height="24" rx="1" fill="currentColor"/>
      <circle cx="32" cy="32" r="8" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'cardio-bioprosthetic-valve',
    name: 'Bioprosthetic Valve',
    domain: 'medicine',
    category: 'equipment-implantable',
    tags: ['bioprosthetic', 'tissue valve', 'TAVR', 'SAVR', 'porcine bovine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M32 12c-6 8-6 16 0 20 6-4 6-12 0-20z" fill="currentColor" opacity="0.3"/>
      <path d="M16 40c2-8 8-12 16-8-2 8-8 12-16 8z" fill="currentColor" opacity="0.3"/>
      <path d="M48 40c-2-8-8-12-16-8 2 8 8 12 16 8z" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="32" r="4"/>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL CARDIAC ANATOMY - ITERATION 2
  // ===========================================================================
  {
    id: 'cardio-papillary-muscle',
    name: 'Papillary Muscles',
    domain: 'medicine',
    category: 'cardiac-anatomy',
    tags: ['papillary', 'muscle', 'chordae', 'mitral', 'tricuspid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="48" rx="8" ry="12" fill="currentColor" opacity="0.3"/>
      <ellipse cx="40" cy="48" rx="8" ry="12" fill="currentColor" opacity="0.3"/>
      <path d="M24 36l-8-20"/>
      <path d="M24 36l0-20"/>
      <path d="M24 36l8-20"/>
      <path d="M40 36l-8-20"/>
      <path d="M40 36l0-20"/>
      <path d="M40 36l8-20"/>
      <line x1="8" y1="16" x2="56" y2="16"/>
    </svg>`
  },
  {
    id: 'cardio-chordae-tendineae',
    name: 'Chordae Tendineae',
    domain: 'medicine',
    category: 'cardiac-anatomy',
    tags: ['chordae', 'tendineae', 'strings', 'valve', 'attachment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="20" ry="6"/>
      <path d="M16 16c2 8 4 16 8 28"/>
      <path d="M24 16c1 8 2 16 4 28"/>
      <path d="M32 16c0 8 0 16 0 28"/>
      <path d="M40 16c-1 8-2 16-4 28"/>
      <path d="M48 16c-2 8-4 16-8 28"/>
      <ellipse cx="32" cy="52" rx="12" ry="6" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'cardio-trabeculae',
    name: 'Trabeculae Carneae',
    domain: 'medicine',
    category: 'cardiac-anatomy',
    tags: ['trabeculae', 'carneae', 'muscle', 'ridges', 'ventricle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8v48c0 4 8 8 16 4s16-4 16-8V8"/>
      <path d="M20 20c4 1 8 1 12 0"/>
      <path d="M20 28c4 1 8 1 12 0"/>
      <path d="M20 36c4 1 8 1 12 0"/>
      <path d="M20 44c4 1 8 1 12 0"/>
      <path d="M36 24c4 1 8 1 8 0"/>
      <path d="M36 32c4 1 8 1 8 0"/>
      <path d="M36 40c4 1 8 1 8 0"/>
    </svg>`
  },
  {
    id: 'cardio-moderator-band',
    name: 'Moderator Band',
    domain: 'medicine',
    category: 'cardiac-anatomy',
    tags: ['moderator', 'band', 'septomarginal', 'trabecula', 'RV'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 8v44c0 6 8 8 16 8"/>
      <path d="M52 8v44c0 6-8 8-16 8"/>
      <path d="M12 40h40" stroke-width="3" fill="currentColor" opacity="0.3"/>
      <ellipse cx="20" cy="52" rx="6" ry="4"/>
      <path d="M20 40v8"/>
    </svg>`
  },
  {
    id: 'cardio-pericardium',
    name: 'Pericardium',
    domain: 'medicine',
    category: 'cardiac-anatomy',
    tags: ['pericardium', 'fibrous', 'serous', 'parietal', 'visceral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4c-18 0-28 14-28 28 0 18 28 32 28 32s28-14 28-32c0-14-10-28-28-28z"/>
      <path d="M32 10c-14 0-22 11-22 22 0 14 22 26 22 26s22-12 22-26c0-11-8-22-22-22z" stroke-dasharray="4 2"/>
      <path d="M32 16c-10 0-16 8-16 16 0 10 16 20 16 20s16-10 16-20c0-8-6-16-16-16z" fill="currentColor" opacity="0.2"/>
    </svg>`
  },
  {
    id: 'cardio-epicardium',
    name: 'Epicardium',
    domain: 'medicine',
    category: 'cardiac-anatomy',
    tags: ['epicardium', 'visceral', 'pericardium', 'outer', 'layer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z" fill="currentColor" opacity="0.2"/>
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z"/>
      <path d="M32 14c-10 0-18 9-18 18 0 12 18 22 18 22s18-10 18-22c0-9-8-18-18-18z"/>
    </svg>`
  },
  {
    id: 'cardio-myocardium',
    name: 'Myocardium',
    domain: 'medicine',
    category: 'cardiac-anatomy',
    tags: ['myocardium', 'muscle', 'cardiac', 'wall', 'layer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z"/>
      <path d="M32 16c-10 0-16 8-16 16 0 10 16 20 16 20s16-10 16-20c0-8-6-16-16-16z"/>
      <path d="M20 28h24" stroke-width="6" opacity="0.4"/>
      <path d="M22 36h20" stroke-width="6" opacity="0.4"/>
      <path d="M26 44h12" stroke-width="6" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'cardio-endocardium',
    name: 'Endocardium',
    domain: 'medicine',
    category: 'cardiac-anatomy',
    tags: ['endocardium', 'inner', 'lining', 'endothelium', 'layer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z"/>
      <path d="M32 20c-8 0-12 6-12 12 0 8 12 16 12 16s12-8 12-16c0-6-4-12-12-12z" fill="currentColor" opacity="0.3"/>
      <path d="M32 20c-8 0-12 6-12 12 0 8 12 16 12 16s12-8 12-16c0-6-4-12-12-12z"/>
    </svg>`
  },
  {
    id: 'cardio-coronary-sinus',
    name: 'Coronary Sinus',
    domain: 'medicine',
    category: 'cardiac-anatomy',
    tags: ['coronary', 'sinus', 'venous', 'drainage', 'great cardiac vein'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <path d="M12 32c8 4 16 8 28 0" stroke-width="3" stroke="blue"/>
      <path d="M40 32l8-12"/>
      <path d="M44 28l6-8"/>
      <circle cx="52" cy="32" r="4" fill="blue" opacity="0.3"/>
      <text x="8" y="50" font-size="5" fill="currentColor" stroke="none">CS</text>
    </svg>`
  },
  {
    id: 'cardio-cardiac-veins',
    name: 'Cardiac Veins',
    domain: 'medicine',
    category: 'cardiac-anatomy',
    tags: ['cardiac', 'veins', 'great', 'middle', 'small', 'venous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z" opacity="0.2"/>
      <path d="M20 48c-4-12-4-24 4-32" stroke="blue" stroke-width="2"/>
      <path d="M44 48c4-12 4-24-4-32" stroke="blue" stroke-width="2"/>
      <path d="M32 56c0-8 4-16 8-24" stroke="blue"/>
      <path d="M20 48h24" stroke="blue" stroke-width="2"/>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL PATHOLOGY - ITERATION 2
  // ===========================================================================
  {
    id: 'cardio-unstable-angina',
    name: 'Unstable Angina',
    domain: 'medicine',
    category: 'pathology-cad',
    tags: ['unstable', 'angina', 'ACS', 'rest pain', 'crescendo'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z"/>
      <path d="M24 28l16 0" stroke="#FFA500" stroke-width="2"/>
      <path d="M28 24l-4 4 4 4"/>
      <path d="M36 24l4 4-4 4"/>
      <text x="20" y="48" font-size="6" fill="#FFA500" stroke="none">UA</text>
    </svg>`
  },
  {
    id: 'cardio-stable-angina',
    name: 'Stable Angina',
    domain: 'medicine',
    category: 'pathology-cad',
    tags: ['stable', 'angina', 'exertional', 'predictable', 'chronic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z"/>
      <path d="M24 32h16" stroke="#228B22" stroke-width="2"/>
      <circle cx="32" cy="32" r="8" stroke="#228B22"/>
      <text x="20" y="52" font-size="6" fill="#228B22" stroke="none">SA</text>
    </svg>`
  },
  {
    id: 'cardio-myocarditis',
    name: 'Myocarditis',
    domain: 'medicine',
    category: 'pathology-structural',
    tags: ['myocarditis', 'inflammation', 'viral', 'cardiac', 'autoimmune'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z"/>
      <circle cx="24" cy="28" r="3" fill="#FF4500"/>
      <circle cx="36" cy="24" r="2" fill="#FF4500"/>
      <circle cx="40" cy="36" r="3" fill="#FF4500"/>
      <circle cx="28" cy="40" r="2" fill="#FF4500"/>
      <circle cx="32" cy="32" r="2" fill="#FF4500"/>
    </svg>`
  },
  {
    id: 'cardio-pericarditis',
    name: 'Pericarditis',
    domain: 'medicine',
    category: 'pathology-structural',
    tags: ['pericarditis', 'inflammation', 'friction rub', 'chest pain', 'ST elevation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4c-18 0-28 14-28 28 0 18 28 32 28 32s28-14 28-32c0-14-10-28-28-28z" stroke="#FF4500" stroke-width="3"/>
      <path d="M32 12c-12 0-20 10-20 20 0 12 20 24 20 24s20-12 20-24c0-10-8-20-20-20z"/>
      <path d="M8 28h8M48 28h8M8 36h8M48 36h8" stroke="#FF4500"/>
    </svg>`
  },
  {
    id: 'cardio-tamponade',
    name: 'Cardiac Tamponade',
    domain: 'medicine',
    category: 'pathology-structural',
    tags: ['tamponade', 'effusion', 'pericardial', 'emergency', 'Becks triad'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4c-18 0-28 14-28 28 0 18 28 32 28 32s28-14 28-32c0-14-10-28-28-28z"/>
      <path d="M32 4c-18 0-28 14-28 28 0 18 28 32 28 32s28-14 28-32c0-14-10-28-28-28z" fill="#DC143C" opacity="0.3"/>
      <path d="M32 16c-8 0-14 8-14 16 0 10 14 18 14 18s14-8 14-18c0-8-6-16-14-16z"/>
      <path d="M28 28l8 8M36 28l-8 8" stroke="#DC143C" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'cardio-pericardial-effusion',
    name: 'Pericardial Effusion',
    domain: 'medicine',
    category: 'pathology-structural',
    tags: ['effusion', 'pericardial', 'fluid', 'echo', 'swinging heart'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4c-18 0-28 14-28 28 0 18 28 32 28 32s28-14 28-32c0-14-10-28-28-28z"/>
      <path d="M32 16c-10 0-16 8-16 16 0 10 16 20 16 20s16-10 16-20c0-8-6-16-16-16z"/>
      <path d="M10 28c4 1 8 2 10 1" fill="#4169E1" opacity="0.4"/>
      <path d="M44 28c4-1 8-2 10-1" fill="#4169E1" opacity="0.4"/>
      <ellipse cx="32" cy="50" rx="16" ry="6" fill="#4169E1" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'cardio-endocarditis',
    name: 'Infective Endocarditis',
    domain: 'medicine',
    category: 'pathology-structural',
    tags: ['endocarditis', 'vegetation', 'infection', 'valve', 'Duke criteria'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="8"/>
      <path d="M20 32c4 4 8 8 12 8s8-4 12-8"/>
      <ellipse cx="28" cy="36" rx="6" ry="4" fill="#6B8E23"/>
      <ellipse cx="38" cy="34" rx="4" ry="3" fill="#6B8E23"/>
      <circle cx="24" cy="38" r="2" fill="#6B8E23"/>
    </svg>`
  },
  {
    id: 'cardio-heart-failure',
    name: 'Heart Failure',
    domain: 'medicine',
    category: 'pathology-structural',
    tags: ['heart failure', 'CHF', 'HFrEF', 'HFpEF', 'congestion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4c-18 0-28 14-28 28 0 18 28 32 28 32s28-14 28-32c0-14-10-28-28-28z"/>
      <path d="M20 36l6 4-6 4"/>
      <path d="M44 36l-6 4 6 4"/>
      <path d="M28 48v8"/>
      <path d="M36 48v8"/>
      <path d="M32 48v10"/>
      <text x="24" y="30" font-size="6" fill="#DC143C" stroke="none">HF</text>
    </svg>`
  },
  {
    id: 'cardio-lvh',
    name: 'Left Ventricular Hypertrophy',
    domain: 'medicine',
    category: 'pathology-structural',
    tags: ['LVH', 'hypertrophy', 'left ventricle', 'thickening', 'HTN'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z"/>
      <line x1="32" y1="8" x2="32" y2="60"/>
      <path d="M32 20h12c4 0 8 8 8 20 0 6-4 12-8 16" stroke-width="4"/>
      <text x="8" y="36" font-size="5" fill="currentColor" stroke="none">LVH</text>
    </svg>`
  },
  {
    id: 'cardio-rvh',
    name: 'Right Ventricular Hypertrophy',
    domain: 'medicine',
    category: 'pathology-structural',
    tags: ['RVH', 'hypertrophy', 'right ventricle', 'pulmonary HTN'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z"/>
      <line x1="32" y1="8" x2="32" y2="60"/>
      <path d="M32 20h-12c-4 0-8 8-8 20 0 6 4 12 8 16" stroke-width="4"/>
      <text x="36" y="36" font-size="5" fill="currentColor" stroke="none">RVH</text>
    </svg>`
  },
  {
    id: 'cardio-lbbb',
    name: 'Left Bundle Branch Block',
    domain: 'medicine',
    category: 'pathology-arrhythmia',
    tags: ['LBBB', 'bundle branch', 'block', 'wide QRS', 'conduction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v16"/>
      <path d="M32 24l-14 28" stroke-width="2"/>
      <path d="M32 24l14 28"/>
      <line x1="14" y1="40" x2="22" y2="40" stroke="#DC143C" stroke-width="3"/>
      <text x="4" y="58" font-size="5" fill="currentColor" stroke="none">LBBB</text>
    </svg>`
  },
  {
    id: 'cardio-rbbb',
    name: 'Right Bundle Branch Block',
    domain: 'medicine',
    category: 'pathology-arrhythmia',
    tags: ['RBBB', 'bundle branch', 'block', 'wide QRS', 'conduction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v16"/>
      <path d="M32 24l-14 28"/>
      <path d="M32 24l14 28" stroke-width="2"/>
      <line x1="42" y1="40" x2="50" y2="40" stroke="#DC143C" stroke-width="3"/>
      <text x="4" y="58" font-size="5" fill="currentColor" stroke="none">RBBB</text>
    </svg>`
  },
  {
    id: 'cardio-bifascicular',
    name: 'Bifascicular Block',
    domain: 'medicine',
    category: 'pathology-arrhythmia',
    tags: ['bifascicular', 'RBBB', 'LAF', 'LPF', 'block'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v12"/>
      <path d="M32 20l-14 16"/>
      <path d="M32 20l14 16"/>
      <path d="M18 36l-6 16"/>
      <path d="M18 36l6 16"/>
      <line x1="42" y1="32" x2="50" y2="32" stroke="#DC143C" stroke-width="2"/>
      <line x1="10" y1="44" x2="16" y2="44" stroke="#DC143C" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'cardio-av-block-1',
    name: 'First Degree AV Block',
    domain: 'medicine',
    category: 'pathology-arrhythmia',
    tags: ['1st degree', 'AV block', 'PR prolongation', 'conduction delay'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32h8l2 4 4-8 4 8 2-4h8"/>
      <path d="M32 32h8l2 4 4-8 4 8 2-4h8"/>
      <path d="M8 20l4 4"/>
      <path d="M36 20l4 4"/>
      <text x="4" y="50" font-size="5" fill="currentColor" stroke="none">PR &gt;200ms</text>
    </svg>`
  },
  {
    id: 'cardio-av-block-2-mobitz1',
    name: 'Second Degree AV Block Type I',
    domain: 'medicine',
    category: 'pathology-arrhythmia',
    tags: ['2nd degree', 'Mobitz I', 'Wenckebach', 'AV block', 'PR prolongation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 20l2 2M12 20l4 4M24 20l6 6M40 20" stroke="#4169E1"/>
      <path d="M4 36h6l1 3 2-6 2 6 1-3h4l1 3 2-6 2 6 1-3h4l1 3 2-6 2 6 1-3h6"/>
      <text x="4" y="54" font-size="4" fill="currentColor" stroke="none">Wenckebach</text>
    </svg>`
  },
  {
    id: 'cardio-av-block-2-mobitz2',
    name: 'Second Degree AV Block Type II',
    domain: 'medicine',
    category: 'pathology-arrhythmia',
    tags: ['2nd degree', 'Mobitz II', 'AV block', 'dropped beat', 'infranodal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 20l2 2M16 20l2 2M28 20M40 20l2 2M52 20l2 2" stroke="#4169E1"/>
      <path d="M4 36h8l1 3 2-6 2 6 1-3h8l1 3 2-6 2 6 1-3h16l1 3 2-6"/>
      <text x="4" y="54" font-size="4" fill="currentColor" stroke="none">Mobitz II</text>
    </svg>`
  },
  {
    id: 'cardio-sinus-bradycardia',
    name: 'Sinus Bradycardia',
    domain: 'medicine',
    category: 'pathology-arrhythmia',
    tags: ['bradycardia', 'sinus', 'slow', 'HR <60', 'rhythm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32h12l2 4 4-8 4 8 2-4h32"/>
      <path d="M10 24l2 2"/>
      <text x="4" y="50" font-size="6" fill="currentColor" stroke="none">&lt;60</text>
      <text x="36" y="50" font-size="5" fill="currentColor" stroke="none">bpm</text>
    </svg>`
  },
  {
    id: 'cardio-sinus-tachycardia',
    name: 'Sinus Tachycardia',
    domain: 'medicine',
    category: 'pathology-arrhythmia',
    tags: ['tachycardia', 'sinus', 'fast', 'HR >100', 'rhythm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32h4l1 3 2-6 2 6 1-3h4l1 3 2-6 2 6 1-3h4l1 3 2-6 2 6 1-3h4l1 3 2-6 2 6 1-3h8"/>
      <path d="M6 26l1 1M14 26l1 1M22 26l1 1M30 26l1 1M38 26l1 1M46 26l1 1"/>
      <text x="4" y="50" font-size="6" fill="currentColor" stroke="none">&gt;100</text>
      <text x="40" y="50" font-size="5" fill="currentColor" stroke="none">bpm</text>
    </svg>`
  },
  {
    id: 'cardio-svt',
    name: 'Supraventricular Tachycardia',
    domain: 'medicine',
    category: 'pathology-arrhythmia',
    tags: ['SVT', 'supraventricular', 'tachycardia', 'narrow complex', 'AVNRT'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32h2l1 4 2-8 2 8 1-4h2l1 4 2-8 2 8 1-4h2l1 4 2-8 2 8 1-4h2l1 4 2-8 2 8 1-4h2l1 4 2-8 2 8 1-4h4"/>
      <text x="4" y="50" font-size="5" fill="currentColor" stroke="none">SVT 150-250</text>
    </svg>`
  },
  {
    id: 'cardio-torsades',
    name: 'Torsades de Pointes',
    domain: 'medicine',
    category: 'pathology-arrhythmia',
    tags: ['torsades', 'polymorphic VT', 'long QT', 'twisting', 'magnesium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32c2-8 4-12 6-8 2 8 4 16 6 8 2-12 4-16 6-8 2 12 4 8 6 0 2-8 4-4 6 4 2 8 4 12 6 4 2-12 4-8 6 0 2 8 4 4 6 0" stroke="#DC143C" stroke-width="1.5"/>
      <text x="4" y="54" font-size="5" fill="#DC143C" stroke="none">TdP</text>
    </svg>`
  },
  {
    id: 'cardio-asystole',
    name: 'Asystole',
    domain: 'medicine',
    category: 'pathology-arrhythmia',
    tags: ['asystole', 'flatline', 'cardiac arrest', 'no rhythm', 'PEA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="32" x2="60" y2="32" stroke="#DC143C" stroke-width="2"/>
      <text x="12" y="50" font-size="8" fill="#DC143C" stroke="none">ASYSTOLE</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL EQUIPMENT - ITERATION 2
  // ===========================================================================
  {
    id: 'cardio-defibrillator',
    name: 'External Defibrillator',
    domain: 'medicine',
    category: 'equipment-diagnostic',
    tags: ['defibrillator', 'AED', 'shock', 'cardioversion', 'ACLS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="36" rx="4"/>
      <rect x="12" y="20" width="24" height="16" rx="2"/>
      <path d="M18 28l4 4 6-8"/>
      <rect x="40" y="20" width="12" height="8" rx="1" fill="currentColor" opacity="0.3"/>
      <rect x="40" y="32" width="12" height="8" rx="1"/>
      <path d="M8 44h20"/>
      <path d="M36 44h20"/>
    </svg>`
  },
  {
    id: 'cardio-stress-test',
    name: 'Stress Test (Treadmill)',
    domain: 'medicine',
    category: 'equipment-diagnostic',
    tags: ['stress test', 'treadmill', 'exercise', 'Bruce protocol', 'ischemia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="32" width="48" height="24" rx="2"/>
      <line x1="8" y1="40" x2="56" y2="40"/>
      <ellipse cx="20" cy="52" rx="6" ry="4"/>
      <ellipse cx="44" cy="52" rx="6" ry="4"/>
      <path d="M28 16c0-4 4-8 4-8s4 4 4 8"/>
      <circle cx="32" cy="12" r="4"/>
      <path d="M28 20v8"/>
      <path d="M36 20v8"/>
    </svg>`
  },
  {
    id: 'cardio-nuclear-scan',
    name: 'Nuclear Perfusion Scan',
    domain: 'medicine',
    category: 'equipment-diagnostic',
    tags: ['nuclear', 'SPECT', 'PET', 'perfusion', 'myocardial viability'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12" fill="currentColor" opacity="0.2"/>
      <path d="M32 20v-8"/>
      <path d="M32 52v-8"/>
      <path d="M20 32h-8"/>
      <path d="M52 32h-8"/>
      <circle cx="32" cy="32" r="4" fill="#00FF00" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'cardio-cath-lab',
    name: 'Cardiac Catheterization Lab',
    domain: 'medicine',
    category: 'equipment-diagnostic',
    tags: ['cath lab', 'angiography', 'fluoroscopy', 'interventional', 'PCI'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="32" width="32" height="24" rx="2"/>
      <ellipse cx="32" cy="32" rx="16" ry="8"/>
      <path d="M32 8v16"/>
      <circle cx="32" cy="8" r="4"/>
      <rect x="20" y="38" width="24" height="12" rx="1"/>
      <path d="M24 44h16"/>
    </svg>`
  },
  {
    id: 'cardio-ablation-catheter',
    name: 'Ablation Catheter',
    domain: 'medicine',
    category: 'equipment-interventional',
    tags: ['ablation', 'catheter', 'RF', 'cryoablation', 'EP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56c8-8 16-24 24-36"/>
      <ellipse cx="36" cy="16" rx="6" ry="8" transform="rotate(-30 36 16)"/>
      <path d="M40 12l8-4"/>
      <path d="M42 16l10 0"/>
      <path d="M40 20l8 4"/>
      <circle cx="36" cy="16" r="2" fill="#FF4500"/>
    </svg>`
  },
  {
    id: 'cardio-mapping-system',
    name: 'EP Mapping System',
    domain: 'medicine',
    category: 'equipment-interventional',
    tags: ['mapping', 'CARTO', 'EnSite', 'electrophysiology', '3D'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z"/>
      <circle cx="24" cy="28" r="2" fill="#FF0000"/>
      <circle cx="32" cy="24" r="2" fill="#FFA500"/>
      <circle cx="40" cy="28" r="2" fill="#FFFF00"/>
      <circle cx="28" cy="36" r="2" fill="#00FF00"/>
      <circle cx="36" cy="36" r="2" fill="#0000FF"/>
      <circle cx="32" cy="44" r="2" fill="#800080"/>
    </svg>`
  },
  {
    id: 'cardio-oct',
    name: 'OCT Catheter',
    domain: 'medicine',
    category: 'equipment-interventional',
    tags: ['OCT', 'optical coherence', 'tomography', 'imaging', 'plaque'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="40" y2="32" stroke-width="3"/>
      <circle cx="48" cy="32" r="8"/>
      <circle cx="48" cy="32" r="12" stroke-dasharray="2 2"/>
      <circle cx="48" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M48 24v-8"/>
      <path d="M48 40v8"/>
    </svg>`
  },
  {
    id: 'cardio-impella',
    name: 'Impella Device',
    domain: 'medicine',
    category: 'equipment-implantable',
    tags: ['Impella', 'mechanical support', 'LVAD', 'temporary', 'cardiogenic shock'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 56V36c0-8 4-16 12-24"/>
      <path d="M28 12l8 4-8 4"/>
      <ellipse cx="16" cy="40" rx="4" ry="8"/>
      <path d="M20 36h8"/>
      <path d="M20 44h8"/>
      <circle cx="32" cy="16" r="4"/>
    </svg>`
  },
  {
    id: 'cardio-ecmo',
    name: 'ECMO Circuit',
    domain: 'medicine',
    category: 'equipment-implantable',
    tags: ['ECMO', 'extracorporeal', 'membrane', 'oxygenation', 'support'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="20" r="8"/>
      <circle cx="44" cy="20" r="8"/>
      <rect x="24" y="36" width="16" height="20" rx="4"/>
      <path d="M20 28v8h8"/>
      <path d="M44 28v8h-8"/>
      <path d="M28 36v-4c0-2 2-4 4-4s4 2 4 4v4"/>
      <path d="M32 48l-4 8"/>
      <path d="M32 48l4 8"/>
    </svg>`
  },
  {
    id: 'cardio-watchman',
    name: 'LAA Occluder (Watchman)',
    domain: 'medicine',
    category: 'equipment-implantable',
    tags: ['Watchman', 'LAA', 'occluder', 'AFib', 'stroke prevention'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 16c-8 8-8 24 0 32"/>
      <ellipse cx="32" cy="32" rx="16" ry="20"/>
      <ellipse cx="32" cy="32" rx="10" ry="14" fill="currentColor" opacity="0.3"/>
      <path d="M22 24c4 1 8 1 12 0"/>
      <path d="M22 32c4 1 8 1 12 0"/>
      <path d="M22 40c4 1 8 1 12 0"/>
    </svg>`
  },
  {
    id: 'cardio-mitraclip',
    name: 'MitraClip',
    domain: 'medicine',
    category: 'equipment-implantable',
    tags: ['MitraClip', 'TEER', 'mitral', 'repair', 'percutaneous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v20"/>
      <path d="M24 28c-4 4-4 12 0 16"/>
      <path d="M40 28c4 4 4 12 0 16"/>
      <path d="M24 44h16"/>
      <ellipse cx="28" cy="36" rx="4" ry="8"/>
      <ellipse cx="36" cy="36" rx="4" ry="8"/>
      <path d="M28 44v8"/>
      <path d="M36 44v8"/>
    </svg>`
  },

  // ===========================================================================
  // CLINICAL SCORES & TOOLS - ITERATION 2
  // ===========================================================================
  {
    id: 'cardio-heart-score',
    name: 'HEART Score',
    domain: 'medicine',
    category: 'clinical-tools',
    tags: ['HEART', 'score', 'chest pain', 'risk', 'stratification'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <text x="16" y="20" font-size="5" fill="currentColor" stroke="none">H</text>
      <text x="16" y="28" font-size="5" fill="currentColor" stroke="none">E</text>
      <text x="16" y="36" font-size="5" fill="currentColor" stroke="none">A</text>
      <text x="16" y="44" font-size="5" fill="currentColor" stroke="none">R</text>
      <text x="16" y="52" font-size="5" fill="currentColor" stroke="none">T</text>
      <rect x="28" y="14" width="24" height="6" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="28" y="22" width="24" height="6" rx="1" fill="currentColor" opacity="0.3"/>
      <rect x="28" y="30" width="24" height="6" rx="1" fill="currentColor" opacity="0.4"/>
      <rect x="28" y="38" width="24" height="6" rx="1" fill="currentColor" opacity="0.5"/>
      <rect x="28" y="46" width="24" height="6" rx="1" fill="currentColor" opacity="0.6"/>
    </svg>`
  },
  {
    id: 'cardio-chadsvasc',
    name: 'CHA2DS2-VASc Score',
    domain: 'medicine',
    category: 'clinical-tools',
    tags: ['CHA2DS2-VASc', 'AFib', 'stroke', 'risk', 'anticoagulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <text x="12" y="24" font-size="8" fill="currentColor" stroke="none">CHA₂</text>
      <text x="12" y="40" font-size="8" fill="currentColor" stroke="none">DS₂</text>
      <text x="12" y="52" font-size="6" fill="currentColor" stroke="none">VASc</text>
      <circle cx="48" cy="32" r="10"/>
      <text x="44" y="36" font-size="8" fill="currentColor" stroke="none">?</text>
    </svg>`
  },
  {
    id: 'cardio-timi-score',
    name: 'TIMI Risk Score',
    domain: 'medicine',
    category: 'clinical-tools',
    tags: ['TIMI', 'score', 'ACS', 'NSTEMI', 'risk'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <text x="16" y="36" font-size="12" fill="currentColor" stroke="none">TIMI</text>
      <path d="M12 44h40"/>
      <text x="20" y="54" font-size="6" fill="currentColor" stroke="none">0-7</text>
    </svg>`
  },
  {
    id: 'cardio-grace-score',
    name: 'GRACE Score',
    domain: 'medicine',
    category: 'clinical-tools',
    tags: ['GRACE', 'score', 'ACS', 'mortality', 'risk'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <text x="12" y="36" font-size="10" fill="currentColor" stroke="none">GRACE</text>
      <path d="M12 44h40"/>
      <rect x="12" y="48" width="10" height="4" fill="#228B22"/>
      <rect x="24" y="48" width="10" height="4" fill="#FFA500"/>
      <rect x="36" y="48" width="14" height="4" fill="#DC143C"/>
    </svg>`
  },
  {
    id: 'cardio-hasbled',
    name: 'HAS-BLED Score',
    domain: 'medicine',
    category: 'clinical-tools',
    tags: ['HAS-BLED', 'bleeding', 'risk', 'anticoagulation', 'AFib'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <text x="12" y="28" font-size="7" fill="currentColor" stroke="none">HAS</text>
      <text x="12" y="44" font-size="7" fill="currentColor" stroke="none">BLED</text>
      <path d="M44 20c0 8-4 16-4 24" stroke="#DC143C" stroke-width="2"/>
      <ellipse cx="44" cy="46" rx="4" ry="6" fill="#DC143C" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'cardio-wellsscore-pe',
    name: 'Wells Score for PE',
    domain: 'medicine',
    category: 'clinical-tools',
    tags: ['Wells', 'PE', 'pulmonary embolism', 'probability', 'score'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <text x="14" y="32" font-size="8" fill="currentColor" stroke="none">Wells</text>
      <text x="20" y="46" font-size="6" fill="currentColor" stroke="none">PE</text>
      <path d="M44 20v28" stroke-width="2"/>
      <path d="M44 24h8"/>
      <path d="M44 32h6"/>
      <path d="M44 40h8"/>
    </svg>`
  },
  {
    id: 'cardio-rcri',
    name: 'RCRI Score',
    domain: 'medicine',
    category: 'clinical-tools',
    tags: ['RCRI', 'revised cardiac', 'risk index', 'preoperative', 'surgery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <text x="16" y="36" font-size="10" fill="currentColor" stroke="none">RCRI</text>
      <circle cx="16" cy="48" r="3"/>
      <circle cx="26" cy="48" r="3"/>
      <circle cx="36" cy="48" r="3"/>
      <circle cx="46" cy="48" r="3"/>
    </svg>`
  },
  {
    id: 'cardio-duke-criteria',
    name: 'Duke Criteria',
    domain: 'medicine',
    category: 'clinical-tools',
    tags: ['Duke', 'criteria', 'endocarditis', 'diagnosis', 'major minor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <text x="16" y="32" font-size="8" fill="currentColor" stroke="none">Duke</text>
      <path d="M12 38h40"/>
      <text x="14" y="48" font-size="5" fill="currentColor" stroke="none">Major</text>
      <text x="36" y="48" font-size="5" fill="currentColor" stroke="none">Minor</text>
    </svg>`
  },
  {
    id: 'cardio-killip-class',
    name: 'Killip Classification',
    domain: 'medicine',
    category: 'clinical-tools',
    tags: ['Killip', 'classification', 'MI', 'heart failure', 'prognosis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <text x="14" y="28" font-size="7" fill="currentColor" stroke="none">Killip</text>
      <rect x="14" y="34" width="8" height="16" fill="#228B22" opacity="0.5"/>
      <rect x="24" y="38" width="8" height="12" fill="#FFA500" opacity="0.5"/>
      <rect x="34" y="42" width="8" height="8" fill="#FF4500" opacity="0.5"/>
      <rect x="44" y="46" width="8" height="4" fill="#DC143C" opacity="0.5"/>
      <text x="14" y="54" font-size="4" fill="currentColor" stroke="none">I II III IV</text>
    </svg>`
  },
  {
    id: 'cardio-nyha-class',
    name: 'NYHA Classification',
    domain: 'medicine',
    category: 'clinical-tools',
    tags: ['NYHA', 'classification', 'heart failure', 'functional', 'class'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <text x="14" y="24" font-size="6" fill="currentColor" stroke="none">NYHA</text>
      <rect x="14" y="28" width="10" height="4" fill="#228B22"/>
      <text x="26" y="32" font-size="4" fill="currentColor" stroke="none">I</text>
      <rect x="14" y="34" width="10" height="4" fill="#90EE90"/>
      <text x="26" y="38" font-size="4" fill="currentColor" stroke="none">II</text>
      <rect x="14" y="40" width="10" height="4" fill="#FFA500"/>
      <text x="26" y="44" font-size="4" fill="currentColor" stroke="none">III</text>
      <rect x="14" y="46" width="10" height="4" fill="#DC143C"/>
      <text x="26" y="50" font-size="4" fill="currentColor" stroke="none">IV</text>
    </svg>`
  }
];

export default cardiologyIcons;
