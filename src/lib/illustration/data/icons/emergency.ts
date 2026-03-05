/**
 * Emergency Medicine Icon Library
 * Comprehensive SVG icons for emergency medicine and critical care
 *
 * Categories:
 * - Trauma (15 icons)
 * - Resuscitation (12 icons)
 * - Toxicology (12 icons)
 * - Environmental (10 icons)
 * - Shock States (10 icons)
 * - Procedures (15 icons)
 * - Monitoring (10 icons)
 * - Triage & Flow (16 icons)
 */

import type { IconDefinition } from './index';

export const emergencyIcons: IconDefinition[] = [
  // ===========================================================================
  // TRAUMA (15 icons)
  // ===========================================================================
  {
    id: 'em-trauma-patient',
    name: 'Trauma Patient',
    domain: 'medicine',
    category: 'trauma',
    tags: ['trauma', 'patient', 'injury', 'polytrauma', 'MVC', 'accident'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8"/>
      <path d="M32 20v24"/>
      <path d="M20 28h24"/>
      <path d="M32 44l-10 16"/>
      <path d="M32 44l10 16"/>
      <path d="M24 8l-4-4" stroke="red"/>
      <path d="M40 8l4-4" stroke="red"/>
      <circle cx="20" cy="4" r="2" fill="red" stroke="red"/>
      <text x="44" y="36" font-size="6" fill="currentColor" stroke="none">!</text>
    </svg>`
  },
  {
    id: 'em-cspine',
    name: 'C-Spine Immobilization',
    domain: 'medicine',
    category: 'trauma',
    tags: ['cervical', 'spine', 'c-spine', 'collar', 'immobilization', 'neck'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="10"/>
      <rect x="18" y="26" width="28" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <path d="M18 30h28"/>
      <path d="M18 34h28"/>
      <path d="M32 38v18"/>
      <path d="M26 26v-4"/>
      <path d="M38 26v-4"/>
      <text x="26" y="56" font-size="5" fill="currentColor" stroke="none">C-spine</text>
    </svg>`
  },
  {
    id: 'em-airway-management',
    name: 'Airway Management',
    domain: 'medicine',
    category: 'trauma',
    tags: ['airway', 'management', 'intubation', 'breathing', 'ABC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="14" rx="12" ry="8"/>
      <path d="M26 20c0 4 2 8 6 12"/>
      <path d="M38 20c0 4-2 8-6 12"/>
      <path d="M32 32v20"/>
      <path d="M28 40h8"/>
      <path d="M26 48h12"/>
      <circle cx="32" cy="14" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M20 10l-6-4"/>
      <path d="M44 10l6-4"/>
    </svg>`
  },
  {
    id: 'em-tension-pneumothorax',
    name: 'Tension Pneumothorax',
    domain: 'medicine',
    category: 'trauma',
    tags: ['tension', 'pneumothorax', 'chest', 'lung', 'collapsed', 'needle decompression'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c0-4 8-8 16-8s16 4 16 8v32c0 4-8 8-16 8s-16-4-16-8V16z"/>
      <path d="M32 8v48" stroke-dasharray="2 2"/>
      <path d="M20 20c4 4 4 20 0 24" fill="currentColor" opacity="0.2"/>
      <path d="M44 16v32" stroke="red"/>
      <circle cx="44" cy="24" r="3" fill="none" stroke="red"/>
      <path d="M48 20l4-4" stroke="red"/>
      <text x="18" y="36" font-size="5" fill="currentColor" stroke="none">Air</text>
    </svg>`
  },
  {
    id: 'em-hemothorax',
    name: 'Hemothorax',
    domain: 'medicine',
    category: 'trauma',
    tags: ['hemothorax', 'blood', 'chest', 'thoracic', 'bleeding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c0-4 8-8 16-8s16 4 16 8v32c0 4-8 8-16 8s-16-4-16-8V16z"/>
      <path d="M32 8v48" stroke-dasharray="2 2"/>
      <path d="M18 40h12v12c-6 0-12-4-12-8v-4z" fill="red" opacity="0.4"/>
      <path d="M22 20c2 4 2 12 0 16"/>
      <path d="M42 20c-2 4-2 12 0 16"/>
      <text x="20" y="50" font-size="4" fill="red" stroke="none">Blood</text>
    </svg>`
  },
  {
    id: 'em-flail-chest',
    name: 'Flail Chest',
    domain: 'medicine',
    category: 'trauma',
    tags: ['flail', 'chest', 'ribs', 'fracture', 'paradoxical', 'breathing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <path d="M16 20h12" stroke-dasharray="3 2"/>
      <path d="M16 28h14" stroke-dasharray="3 2"/>
      <path d="M16 36h14" stroke-dasharray="3 2"/>
      <path d="M36 20h12"/>
      <path d="M34 28h14"/>
      <path d="M34 36h14"/>
      <rect x="20" y="22" width="8" height="12" rx="1" fill="red" opacity="0.3" stroke="red"/>
      <path d="M24 18v-6"/>
      <path d="M24 40v6"/>
      <text x="38" y="50" font-size="5" fill="currentColor" stroke="none">Flail</text>
    </svg>`
  },
  {
    id: 'em-pelvic-fracture',
    name: 'Pelvic Fracture',
    domain: 'medicine',
    category: 'trauma',
    tags: ['pelvis', 'fracture', 'pelvic', 'binder', 'hemorrhage', 'unstable'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 20c4-4 12-6 20-6s16 2 20 6"/>
      <path d="M12 20c-2 8 2 20 8 24"/>
      <path d="M52 20c2 8-2 20-8 24"/>
      <path d="M20 44l4 12"/>
      <path d="M44 44l-4 12"/>
      <circle cx="32" cy="36" r="8"/>
      <path d="M28 24l-4 8" stroke="red" stroke-width="2"/>
      <path d="M36 24l4 8" stroke="red" stroke-width="2"/>
      <rect x="8" y="30" width="48" height="6" rx="1" fill="currentColor" opacity="0.2"/>
    </svg>`
  },
  {
    id: 'em-hemorrhage-control',
    name: 'Hemorrhage Control',
    domain: 'medicine',
    category: 'trauma',
    tags: ['hemorrhage', 'bleeding', 'control', 'pressure', 'hemostasis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 12v40"/>
      <path d="M40 12v40"/>
      <path d="M20 28h24" stroke="red" stroke-width="3"/>
      <path d="M18 24l4 4-4 4"/>
      <path d="M46 24l-4 4 4 4"/>
      <circle cx="32" cy="28" r="6" fill="red" opacity="0.3"/>
      <path d="M28 20c-2-4 0-8 4-8s6 4 4 8" fill="red" opacity="0.5"/>
      <text x="22" y="58" font-size="5" fill="currentColor" stroke="none">Pressure</text>
    </svg>`
  },
  {
    id: 'em-tourniquet',
    name: 'Tourniquet',
    domain: 'medicine',
    category: 'trauma',
    tags: ['tourniquet', 'TQ', 'limb', 'hemorrhage', 'extremity', 'CAT'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v48"/>
      <ellipse cx="32" cy="24" rx="12" ry="4"/>
      <rect x="20" y="20" width="24" height="8" rx="1" fill="red" opacity="0.3" stroke="red"/>
      <path d="M32 20v-4"/>
      <path d="M28 16h8"/>
      <circle cx="32" cy="12" r="2" fill="currentColor"/>
      <path d="M26 36c3 2 9 2 12 0"/>
      <path d="M24 44c4 2 12 2 16 0"/>
      <text x="46" y="26" font-size="5" fill="red" stroke="none">TQ</text>
    </svg>`
  },
  {
    id: 'em-fast-exam',
    name: 'FAST Exam Zones',
    domain: 'medicine',
    category: 'trauma',
    tags: ['FAST', 'ultrasound', 'focused', 'assessment', 'sonography', 'trauma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="18" ry="24"/>
      <circle cx="32" cy="16" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="20" cy="28" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="28" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="48" r="4" fill="currentColor" opacity="0.3"/>
      <text x="28" y="18" font-size="4" fill="currentColor" stroke="none">1</text>
      <text x="16" y="30" font-size="4" fill="currentColor" stroke="none">2</text>
      <text x="40" y="30" font-size="4" fill="currentColor" stroke="none">3</text>
      <text x="28" y="50" font-size="4" fill="currentColor" stroke="none">4</text>
    </svg>`
  },
  {
    id: 'em-spinal-board',
    name: 'Spinal Board',
    domain: 'medicine',
    category: 'trauma',
    tags: ['spine', 'board', 'backboard', 'immobilization', 'transport'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" rx="2" fill="currentColor" opacity="0.1"/>
      <circle cx="24" cy="28" r="4"/>
      <path d="M24 32v8"/>
      <path d="M20 36h8"/>
      <path d="M12 24h8"/>
      <path d="M12 40h8"/>
      <path d="M44 24h8"/>
      <path d="M44 40h8"/>
      <rect x="18" y="26" width="12" height="4" rx="1" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'em-wound-packing',
    name: 'Wound Packing',
    domain: 'medicine',
    category: 'trauma',
    tags: ['wound', 'packing', 'gauze', 'hemorrhage', 'junctional'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="12" fill="red" opacity="0.2"/>
      <path d="M20 28c4-2 8-2 12 0s8 2 12 0"/>
      <path d="M20 32c4-2 8-2 12 0s8 2 12 0"/>
      <path d="M20 36c4-2 8-2 12 0s8 2 12 0"/>
      <rect x="24" y="12" width="16" height="8" rx="1"/>
      <path d="M28 16h8" stroke-dasharray="2 1"/>
      <path d="M32 20v8"/>
    </svg>`
  },
  {
    id: 'em-splint',
    name: 'Splint',
    domain: 'medicine',
    category: 'trauma',
    tags: ['splint', 'fracture', 'immobilization', 'extremity', 'bone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8v48"/>
      <path d="M44 8v48"/>
      <rect x="16" y="16" width="32" height="8" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="16" y="32" width="32" height="8" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="16" y="48" width="32" height="8" rx="1" fill="currentColor" opacity="0.2"/>
      <path d="M32 12v44" stroke-dasharray="4 2"/>
      <path d="M28 28l8-4" stroke="red"/>
    </svg>`
  },
  {
    id: 'em-trauma-shears',
    name: 'Trauma Shears',
    domain: 'medicine',
    category: 'trauma',
    tags: ['shears', 'scissors', 'trauma', 'clothing', 'exposure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="48" r="6"/>
      <circle cx="44" cy="48" r="6"/>
      <path d="M24 44l16-32"/>
      <path d="M40 44L24 12"/>
      <circle cx="32" cy="28" r="3"/>
      <path d="M20 48h4"/>
      <path d="M40 48h4"/>
    </svg>`
  },
  {
    id: 'em-massive-transfusion',
    name: 'Massive Transfusion',
    domain: 'medicine',
    category: 'trauma',
    tags: ['transfusion', 'blood', 'MTP', 'massive', 'protocol', 'products'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="14" height="24" rx="2" fill="red" opacity="0.3"/>
      <rect x="34" y="8" width="14" height="24" rx="2" fill="yellow" opacity="0.3"/>
      <rect x="25" y="36" width="14" height="20" rx="2" fill="currentColor" opacity="0.2"/>
      <path d="M23 32v4"/>
      <path d="M41 32v4l-9 4"/>
      <text x="19" y="22" font-size="5" fill="red" stroke="none">RBC</text>
      <text x="36" y="22" font-size="5" fill="currentColor" stroke="none">FFP</text>
      <text x="28" y="50" font-size="5" fill="currentColor" stroke="none">Plt</text>
    </svg>`
  },

  // ===========================================================================
  // RESUSCITATION (12 icons)
  // ===========================================================================
  {
    id: 'em-cpr',
    name: 'CPR',
    domain: 'medicine',
    category: 'resuscitation',
    tags: ['CPR', 'compressions', 'chest', 'cardiac', 'arrest', 'BLS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="44" rx="20" ry="8"/>
      <circle cx="32" cy="44" r="6" fill="red" opacity="0.3"/>
      <path d="M32 20v16" stroke-width="2"/>
      <path d="M24 28l8 8 8-8"/>
      <path d="M26 12h12"/>
      <path d="M32 4v8"/>
      <text x="20" y="60" font-size="5" fill="currentColor" stroke="none">100-120/min</text>
    </svg>`
  },
  {
    id: 'em-defibrillator',
    name: 'Defibrillator',
    domain: 'medicine',
    category: 'resuscitation',
    tags: ['defibrillator', 'AED', 'shock', 'VF', 'pVT', 'cardioversion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="4"/>
      <rect x="18" y="22" width="28" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M22 30h6l2-4 4 8 2-4h6" stroke="red"/>
      <circle cx="24" cy="42" r="3" fill="red"/>
      <circle cx="40" cy="42" r="3" fill="red"/>
      <path d="M8 28l4 8"/>
      <path d="M56 28l-4 8"/>
    </svg>`
  },
  {
    id: 'em-ett',
    name: 'Endotracheal Tube',
    domain: 'medicine',
    category: 'resuscitation',
    tags: ['ETT', 'endotracheal', 'tube', 'intubation', 'airway', 'definitive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8c0 0-4 8-4 16s2 12 2 20c0 4 2 8 2 12"/>
      <path d="M40 8c0 0 4 8 4 16s-2 12-2 20c0 4-2 8-2 12"/>
      <path d="M24 8h16"/>
      <ellipse cx="32" cy="56" rx="8" ry="4" fill="currentColor" opacity="0.3"/>
      <rect x="28" y="4" width="8" height="6" rx="1"/>
      <path d="M20 36h24" stroke-dasharray="2 2"/>
      <text x="44" y="20" font-size="5" fill="currentColor" stroke="none">ETT</text>
    </svg>`
  },
  {
    id: 'em-lma',
    name: 'Laryngeal Mask Airway',
    domain: 'medicine',
    category: 'resuscitation',
    tags: ['LMA', 'laryngeal', 'mask', 'airway', 'supraglottic', 'iGel'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v24"/>
      <ellipse cx="32" cy="44" rx="16" ry="12"/>
      <ellipse cx="32" cy="44" rx="10" ry="6" fill="currentColor" opacity="0.3"/>
      <rect x="28" y="4" width="8" height="6" rx="1"/>
      <path d="M24 36c4 4 12 4 16 0"/>
      <text x="44" y="20" font-size="5" fill="currentColor" stroke="none">LMA</text>
    </svg>`
  },
  {
    id: 'em-bvm',
    name: 'Bag Valve Mask',
    domain: 'medicine',
    category: 'resuscitation',
    tags: ['BVM', 'bag', 'valve', 'mask', 'ambu', 'ventilation', 'manual'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="16" ry="12" fill="currentColor" opacity="0.2"/>
      <path d="M40 32h8"/>
      <path d="M48 24v16"/>
      <ellipse cx="56" cy="32" rx="4" ry="8"/>
      <path d="M8 32h8"/>
      <circle cx="8" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M20 24c4-2 8-2 8 0"/>
      <path d="M20 40c4 2 8 2 8 0"/>
    </svg>`
  },
  {
    id: 'em-io-access',
    name: 'IO Access',
    domain: 'medicine',
    category: 'resuscitation',
    tags: ['IO', 'intraosseous', 'access', 'vascular', 'EZ-IO', 'bone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="48" rx="16" ry="8"/>
      <path d="M20 48c0-16 6-32 12-32s12 16 12 32"/>
      <rect x="28" y="8" width="8" height="16" rx="1" fill="currentColor" opacity="0.2"/>
      <path d="M32 24v16" stroke-width="2"/>
      <circle cx="32" cy="44" r="3" fill="red" opacity="0.5"/>
      <text x="44" y="32" font-size="5" fill="currentColor" stroke="none">IO</text>
    </svg>`
  },
  {
    id: 'em-central-line',
    name: 'Central Line',
    domain: 'medicine',
    category: 'resuscitation',
    tags: ['central', 'line', 'CVC', 'venous', 'catheter', 'access'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="8"/>
      <path d="M32 24v8"/>
      <path d="M28 32c-8 4-12 12-12 20"/>
      <path d="M36 32c8 4 12 12 12 20"/>
      <path d="M40 20l8 4" stroke="red" stroke-width="2"/>
      <circle cx="52" cy="26" r="4" fill="red" opacity="0.3"/>
      <path d="M52 26h4"/>
      <path d="M52 26v-4"/>
      <path d="M52 26v4"/>
    </svg>`
  },
  {
    id: 'em-crash-cart',
    name: 'Crash Cart',
    domain: 'medicine',
    category: 'resuscitation',
    tags: ['crash', 'cart', 'code', 'emergency', 'equipment', 'supplies'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="40" rx="2"/>
      <path d="M12 18h40"/>
      <path d="M12 28h40"/>
      <path d="M12 38h40"/>
      <circle cx="20" cy="54" r="4"/>
      <circle cx="44" cy="54" r="4"/>
      <path d="M16 48v-2"/>
      <path d="M48 48v-2"/>
      <path d="M28 12h8" stroke="red" stroke-width="2"/>
      <path d="M32 8v8" stroke="red" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'em-code-team',
    name: 'Code Team',
    domain: 'medicine',
    category: 'resuscitation',
    tags: ['code', 'team', 'resuscitation', 'ACLS', 'response', 'blue'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="red" opacity="0.3"/>
      <circle cx="16" cy="20" r="6"/>
      <circle cx="48" cy="20" r="6"/>
      <circle cx="16" cy="48" r="6"/>
      <circle cx="48" cy="48" r="6"/>
      <path d="M22 24l6 4"/>
      <path d="M42 24l-6 4"/>
      <path d="M22 44l6-4"/>
      <path d="M42 44l-6-4"/>
      <text x="28" y="35" font-size="6" fill="red" stroke="none">!</text>
    </svg>`
  },
  {
    id: 'em-rosc',
    name: 'ROSC',
    domain: 'medicine',
    category: 'resuscitation',
    tags: ['ROSC', 'return', 'spontaneous', 'circulation', 'pulse', 'recovery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h8l4-8 4 16 4-12 4 8 4-4h20" stroke="green" stroke-width="2"/>
      <path d="M32 8c-10 0-18 6-18 14 0 10 18 18 18 18s18-8 18-18c0-8-8-14-18-14z" fill="red" opacity="0.2"/>
      <path d="M32 16v8"/>
      <path d="M28 20h8"/>
      <text x="44" y="56" font-size="5" fill="green" stroke="none">ROSC</text>
    </svg>`
  },
  {
    id: 'em-epinephrine',
    name: 'Epinephrine',
    domain: 'medicine',
    category: 'resuscitation',
    tags: ['epinephrine', 'adrenaline', 'code', 'ACLS', 'vasopressor', 'drug'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="16" width="24" height="40" rx="4"/>
      <rect x="24" y="20" width="16" height="32" rx="2" fill="currentColor" opacity="0.2"/>
      <path d="M28 8h8v8h-8z"/>
      <path d="M32 4v4"/>
      <text x="26" y="38" font-size="6" fill="currentColor" stroke="none">Epi</text>
      <text x="22" y="48" font-size="4" fill="currentColor" stroke="none">1mg</text>
    </svg>`
  },
  {
    id: 'em-pacing',
    name: 'Transcutaneous Pacing',
    domain: 'medicine',
    category: 'resuscitation',
    tags: ['pacing', 'transcutaneous', 'TCP', 'bradycardia', 'capture', 'electrical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="2"/>
      <path d="M24 32h4l2-4 4 8 2-4h4" stroke="green"/>
      <circle cx="20" cy="52" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="52" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M20 48v-4"/>
      <path d="M44 48v-4"/>
      <path d="M32 8v12"/>
      <path d="M28 12h8"/>
    </svg>`
  },

  // ===========================================================================
  // TOXICOLOGY (12 icons)
  // ===========================================================================
  {
    id: 'em-anticholinergic',
    name: 'Anticholinergic Toxidrome',
    domain: 'medicine',
    category: 'toxicology',
    tags: ['anticholinergic', 'toxidrome', 'dry', 'tachycardia', 'delirium', 'mydriasis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="16"/>
      <circle cx="26" cy="22" r="6"/>
      <circle cx="38" cy="22" r="6"/>
      <circle cx="26" cy="22" r="4" fill="currentColor"/>
      <circle cx="38" cy="22" r="4" fill="currentColor"/>
      <path d="M28 34c2 2 6 2 8 0"/>
      <path d="M20 44l-4 8"/>
      <path d="M44 44l4 8"/>
      <path d="M16 12l-4-4"/>
      <path d="M48 12l4-4"/>
      <text x="18" y="60" font-size="4" fill="currentColor" stroke="none">Dry/Hot</text>
    </svg>`
  },
  {
    id: 'em-cholinergic',
    name: 'Cholinergic Toxidrome',
    domain: 'medicine',
    category: 'toxicology',
    tags: ['cholinergic', 'toxidrome', 'SLUDGE', 'organophosphate', 'miosis', 'wet'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="16"/>
      <circle cx="26" cy="22" r="6"/>
      <circle cx="38" cy="22" r="6"/>
      <circle cx="26" cy="22" r="2" fill="currentColor"/>
      <circle cx="38" cy="22" r="2" fill="currentColor"/>
      <path d="M28 34c2 2 6 2 8 0"/>
      <path d="M18 16c-2-2-4 0-4 2" fill="blue" opacity="0.3"/>
      <path d="M46 16c2-2 4 0 4 2" fill="blue" opacity="0.3"/>
      <path d="M28 40c2 4 6 4 8 0" fill="blue" opacity="0.3"/>
      <text x="14" y="56" font-size="4" fill="currentColor" stroke="none">SLUDGE</text>
    </svg>`
  },
  {
    id: 'em-sympathomimetic',
    name: 'Sympathomimetic Toxidrome',
    domain: 'medicine',
    category: 'toxicology',
    tags: ['sympathomimetic', 'toxidrome', 'cocaine', 'amphetamine', 'hypertension', 'agitation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="16"/>
      <circle cx="26" cy="22" r="6"/>
      <circle cx="38" cy="22" r="6"/>
      <circle cx="26" cy="22" r="4" fill="currentColor"/>
      <circle cx="38" cy="22" r="4" fill="currentColor"/>
      <path d="M26 34h12"/>
      <path d="M16 8l4 4"/>
      <path d="M48 8l-4 4"/>
      <path d="M8 20l4 2"/>
      <path d="M56 20l-4 2"/>
      <path d="M32 44v8" stroke="red" stroke-width="2"/>
      <path d="M28 48h8" stroke="red" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'em-opioid-toxidrome',
    name: 'Opioid Toxidrome',
    domain: 'medicine',
    category: 'toxicology',
    tags: ['opioid', 'toxidrome', 'miosis', 'respiratory', 'depression', 'naloxone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="16"/>
      <circle cx="26" cy="22" r="6"/>
      <circle cx="38" cy="22" r="6"/>
      <circle cx="26" cy="22" r="1.5" fill="currentColor"/>
      <circle cx="38" cy="22" r="1.5" fill="currentColor"/>
      <path d="M26 34c3 4 9 4 12 0"/>
      <path d="M32 44v8"/>
      <path d="M28 48h8"/>
      <path d="M26 52h12"/>
      <text x="44" y="56" font-size="4" fill="currentColor" stroke="none">RR</text>
      <path d="M48 52l4 4" stroke="red"/>
    </svg>`
  },
  {
    id: 'em-sedative-toxidrome',
    name: 'Sedative Toxidrome',
    domain: 'medicine',
    category: 'toxicology',
    tags: ['sedative', 'toxidrome', 'benzodiazepine', 'barbiturate', 'CNS', 'depression'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="16"/>
      <path d="M24 26c2-2 4-2 4 0"/>
      <path d="M36 26c2-2 4-2 4 0"/>
      <path d="M28 36c2 2 6 2 8 0"/>
      <path d="M48 12l-8 4"/>
      <path d="M50 16l-8 4"/>
      <path d="M52 20l-8 4"/>
      <text x="20" y="56" font-size="5" fill="currentColor" stroke="none">Zzz...</text>
    </svg>`
  },
  {
    id: 'em-antidotes',
    name: 'Antidotes',
    domain: 'medicine',
    category: 'toxicology',
    tags: ['antidote', 'reversal', 'treatment', 'toxicology', 'specific'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="36" rx="4"/>
      <path d="M24 20v-8c0-2 4-4 8-4s8 2 8 4v8"/>
      <path d="M28 32h8" stroke="green" stroke-width="2"/>
      <path d="M32 28v8" stroke="green" stroke-width="2"/>
      <circle cx="32" cy="44" r="6" fill="green" opacity="0.2"/>
      <text x="26" y="48" font-size="5" fill="green" stroke="none">Rx</text>
    </svg>`
  },
  {
    id: 'em-decontamination',
    name: 'Decontamination',
    domain: 'medicine',
    category: 'toxicology',
    tags: ['decontamination', 'wash', 'hazmat', 'chemical', 'exposure', 'skin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="8"/>
      <path d="M32 24v16"/>
      <path d="M24 32h16"/>
      <path d="M32 40l-8 16"/>
      <path d="M32 40l8 16"/>
      <path d="M12 8c4 8 4 16 0 24" stroke="blue" opacity="0.5"/>
      <path d="M52 8c-4 8-4 16 0 24" stroke="blue" opacity="0.5"/>
      <path d="M20 4c2 4 2 8 0 12" stroke="blue" opacity="0.5"/>
      <path d="M44 4c-2 4-2 8 0 12" stroke="blue" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'em-activated-charcoal',
    name: 'Activated Charcoal',
    domain: 'medicine',
    category: 'toxicology',
    tags: ['charcoal', 'activated', 'GI', 'decontamination', 'adsorption', 'oral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 16h24l4 8v24c0 4-4 8-8 8H24c-4 0-8-4-8-8V24l4-8z"/>
      <ellipse cx="32" cy="16" rx="12" ry="4"/>
      <ellipse cx="32" cy="36" rx="10" ry="12" fill="currentColor" opacity="0.7"/>
      <path d="M24 32c4-2 12-2 16 0" stroke="white"/>
      <path d="M24 40c4-2 12-2 16 0" stroke="white"/>
      <text x="22" y="58" font-size="4" fill="currentColor" stroke="none">Charcoal</text>
    </svg>`
  },
  {
    id: 'em-dialysis',
    name: 'Dialysis',
    domain: 'medicine',
    category: 'toxicology',
    tags: ['dialysis', 'hemodialysis', 'toxin', 'removal', 'renal', 'clearance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="20" height="32" rx="4"/>
      <rect x="36" y="16" width="20" height="32" rx="4"/>
      <path d="M28 24h8"/>
      <path d="M28 40h8"/>
      <path d="M18 24v16" stroke="red" stroke-width="2"/>
      <path d="M46 24v16" stroke="blue" stroke-width="2"/>
      <path d="M32 20l-2 4 4 0-2 4"/>
      <path d="M32 36l-2 4 4 0-2 4"/>
    </svg>`
  },
  {
    id: 'em-naloxone',
    name: 'Naloxone',
    domain: 'medicine',
    category: 'toxicology',
    tags: ['naloxone', 'narcan', 'opioid', 'reversal', 'antagonist', 'overdose'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="48" rx="4"/>
      <rect x="28" y="12" width="8" height="40" rx="2" fill="currentColor" opacity="0.2"/>
      <path d="M32 4v4"/>
      <circle cx="32" cy="4" r="2"/>
      <text x="26" y="36" font-size="5" fill="currentColor" stroke="none">NAL</text>
      <path d="M20 32l-4 0"/>
      <path d="M48 32l-4 0"/>
      <path d="M16 28l-4 4 4 4"/>
    </svg>`
  },
  {
    id: 'em-flumazenil',
    name: 'Flumazenil',
    domain: 'medicine',
    category: 'toxicology',
    tags: ['flumazenil', 'benzodiazepine', 'reversal', 'antagonist', 'romazicon'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="12" width="24" height="40" rx="4"/>
      <rect x="24" y="16" width="16" height="32" rx="2" fill="yellow" opacity="0.3"/>
      <path d="M28 8h8v4h-8z"/>
      <text x="26" y="36" font-size="5" fill="currentColor" stroke="none">FLU</text>
      <path d="M32 48v4"/>
      <circle cx="32" cy="54" r="2"/>
    </svg>`
  },
  {
    id: 'em-n-acetylcysteine',
    name: 'N-Acetylcysteine',
    domain: 'medicine',
    category: 'toxicology',
    tags: ['NAC', 'acetylcysteine', 'acetaminophen', 'tylenol', 'overdose', 'antidote'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="24" width="32" height="28" rx="2"/>
      <path d="M20 24v-8c0-4 12-8 24-4v12"/>
      <ellipse cx="32" cy="24" rx="16" ry="4"/>
      <path d="M24 36h16"/>
      <path d="M24 44h16"/>
      <text x="24" y="40" font-size="5" fill="currentColor" stroke="none">NAC</text>
      <circle cx="44" cy="12" r="4" fill="currentColor" opacity="0.3"/>
    </svg>`
  },

  // ===========================================================================
  // ENVIRONMENTAL (10 icons)
  // ===========================================================================
  {
    id: 'em-hypothermia',
    name: 'Hypothermia',
    domain: 'medicine',
    category: 'environmental',
    tags: ['hypothermia', 'cold', 'temperature', 'rewarming', 'exposure', 'frostbite'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="26" y="8" width="12" height="48" rx="6"/>
      <circle cx="32" cy="48" r="8" fill="blue" opacity="0.3"/>
      <path d="M32 16v24"/>
      <path d="M28 20h8"/>
      <path d="M28 28h8"/>
      <path d="M28 36h8"/>
      <path d="M16 16l4 4"/>
      <path d="M16 24h6"/>
      <path d="M48 16l-4 4"/>
      <path d="M48 24h-6"/>
      <text x="42" y="52" font-size="5" fill="blue" stroke="none">32C</text>
    </svg>`
  },
  {
    id: 'em-hyperthermia',
    name: 'Hyperthermia',
    domain: 'medicine',
    category: 'environmental',
    tags: ['hyperthermia', 'heat', 'stroke', 'temperature', 'cooling', 'fever'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="26" y="8" width="12" height="48" rx="6"/>
      <circle cx="32" cy="48" r="8" fill="red" opacity="0.3"/>
      <path d="M32 16v24" stroke="red"/>
      <path d="M28 20h8"/>
      <path d="M28 28h8"/>
      <path d="M28 36h8"/>
      <path d="M16 12l8-4" stroke="orange"/>
      <path d="M48 12l-8-4" stroke="orange"/>
      <path d="M12 24l6 2" stroke="orange"/>
      <path d="M52 24l-6 2" stroke="orange"/>
      <text x="42" y="52" font-size="5" fill="red" stroke="none">41C</text>
    </svg>`
  },
  {
    id: 'em-drowning',
    name: 'Drowning',
    domain: 'medicine',
    category: 'environmental',
    tags: ['drowning', 'submersion', 'water', 'aspiration', 'hypoxia', 'near-drowning'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 36c4-4 8-4 12 0s8 4 12 0 8-4 12 0 8 4 12 0" stroke="blue"/>
      <path d="M8 44c4-4 8-4 12 0s8 4 12 0 8-4 12 0 8 4 12 0" stroke="blue"/>
      <path d="M8 52c4-4 8-4 12 0s8 4 12 0 8-4 12 0 8 4 12 0" stroke="blue"/>
      <circle cx="32" cy="20" r="8"/>
      <path d="M28 18c0-2 2-4 4-4s4 2 4 4"/>
      <circle cx="28" cy="18" r="1" fill="currentColor"/>
      <circle cx="36" cy="18" r="1" fill="currentColor"/>
      <path d="M29 24c1.5 1 4.5 1 6 0"/>
    </svg>`
  },
  {
    id: 'em-electrical-injury',
    name: 'Electrical Injury',
    domain: 'medicine',
    category: 'environmental',
    tags: ['electrical', 'shock', 'electrocution', 'burn', 'lightning', 'voltage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M36 4L24 28h12L24 60l28-36H36L48 4H36z" fill="yellow" opacity="0.3" stroke="orange" stroke-width="2"/>
      <circle cx="16" cy="20" r="4" fill="red" opacity="0.5"/>
      <circle cx="48" cy="44" r="4" fill="red" opacity="0.5"/>
      <text x="4" y="24" font-size="4" fill="currentColor" stroke="none">Entry</text>
      <text x="44" y="56" font-size="4" fill="currentColor" stroke="none">Exit</text>
    </svg>`
  },
  {
    id: 'em-burns',
    name: 'Burns',
    domain: 'medicine',
    category: 'environmental',
    tags: ['burn', 'thermal', 'scald', 'TBSA', 'degree', 'eschar'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-8 8-16 16-16 28 0 10 8 20 16 20s16-10 16-20c0-12-8-20-16-28z"/>
      <path d="M32 16c-4 4-8 10-8 18 0 6 4 12 8 12s8-6 8-12c0-8-4-14-8-18z" fill="red" opacity="0.3"/>
      <path d="M32 24c-2 2-4 6-4 10 0 4 2 6 4 6s4-2 4-6c0-4-2-8-4-10z" fill="orange" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'em-frostbite',
    name: 'Frostbite',
    domain: 'medicine',
    category: 'environmental',
    tags: ['frostbite', 'cold', 'injury', 'tissue', 'freezing', 'extremity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v48"/>
      <path d="M20 20l24 24"/>
      <path d="M44 20L20 44"/>
      <path d="M16 32h32"/>
      <circle cx="32" cy="32" r="6" fill="blue" opacity="0.3"/>
      <path d="M32 8l-3 6h6l-3-6z" fill="white"/>
      <path d="M32 56l-3-6h6l-3 6z" fill="white"/>
      <path d="M8 32l6-3v6l-6-3z" fill="white"/>
      <path d="M56 32l-6-3v6l6-3z" fill="white"/>
    </svg>`
  },
  {
    id: 'em-altitude-sickness',
    name: 'Altitude Sickness',
    domain: 'medicine',
    category: 'environmental',
    tags: ['altitude', 'mountain', 'HACE', 'HAPE', 'hypoxia', 'sickness'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56l24-48 24 48H8z"/>
      <path d="M20 56l12-24 12 24" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="20" r="6"/>
      <path d="M28 18h8"/>
      <path d="M28 22h8"/>
      <path d="M16 40h8"/>
      <path d="M40 40h8"/>
      <text x="28" y="50" font-size="5" fill="currentColor" stroke="none">O2</text>
    </svg>`
  },
  {
    id: 'em-envenomation',
    name: 'Envenomation',
    domain: 'medicine',
    category: 'environmental',
    tags: ['envenomation', 'snake', 'bite', 'venom', 'antivenom', 'toxin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 48c0-16 8-32 16-40 8 8 16 24 16 40"/>
      <ellipse cx="32" cy="20" rx="8" ry="6"/>
      <circle cx="28" cy="18" r="2" fill="currentColor"/>
      <circle cx="36" cy="18" r="2" fill="currentColor"/>
      <path d="M30 24l2 4 2-4"/>
      <path d="M24 36c4 4 12 4 16 0" stroke="red"/>
      <circle cx="32" cy="40" r="3" fill="red" opacity="0.5"/>
      <path d="M28 44l-4 8"/>
      <path d="M36 44l4 8"/>
    </svg>`
  },
  {
    id: 'em-decompression',
    name: 'Decompression Sickness',
    domain: 'medicine',
    category: 'environmental',
    tags: ['decompression', 'bends', 'diving', 'hyperbaric', 'nitrogen', 'DCS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="16"/>
      <circle cx="20" cy="24" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="40" cy="20" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="24" cy="40" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="36" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="28" r="2" fill="currentColor" opacity="0.3"/>
      <path d="M32 8v-4"/>
      <path d="M32 60v-4"/>
    </svg>`
  },
  {
    id: 'em-carbon-monoxide',
    name: 'Carbon Monoxide Poisoning',
    domain: 'medicine',
    category: 'environmental',
    tags: ['carbon monoxide', 'CO', 'poisoning', 'inhalation', 'hyperbaric', 'smoke'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <text x="20" y="38" font-size="14" fill="currentColor" stroke="none">CO</text>
      <path d="M16 16l-4-4" stroke="red"/>
      <path d="M48 16l4-4" stroke="red"/>
      <path d="M32 8v-4" stroke="red"/>
      <circle cx="32" cy="32" r="24" stroke="red" stroke-dasharray="4 4"/>
    </svg>`
  },

  // ===========================================================================
  // SHOCK STATES (10 icons)
  // ===========================================================================
  {
    id: 'em-hypovolemic-shock',
    name: 'Hypovolemic Shock',
    domain: 'medicine',
    category: 'shock',
    tags: ['hypovolemic', 'shock', 'hemorrhage', 'volume', 'fluid', 'loss'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-8 8-16 16-16 28 0 10 8 20 16 20s16-10 16-20c0-12-8-20-16-28z"/>
      <path d="M32 28v20" stroke-dasharray="4 4"/>
      <path d="M24 36h16" stroke-dasharray="4 4"/>
      <path d="M28 44l8-8"/>
      <path d="M36 44l-8-8"/>
      <text x="20" y="60" font-size="5" fill="currentColor" stroke="none">Vol</text>
      <path d="M44 56l4 4"/>
    </svg>`
  },
  {
    id: 'em-cardiogenic-shock',
    name: 'Cardiogenic Shock',
    domain: 'medicine',
    category: 'shock',
    tags: ['cardiogenic', 'shock', 'pump', 'failure', 'MI', 'heart'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12c-10 0-18 6-18 14 0 10 18 18 18 18s18-8 18-18c0-8-8-14-18-14z"/>
      <path d="M24 24l6 6-6 6"/>
      <path d="M40 24l-6 6 6 6"/>
      <path d="M32 22v12"/>
      <path d="M28 28h8"/>
      <path d="M32 48v8"/>
      <path d="M28 52h8" stroke="red"/>
      <text x="40" y="56" font-size="5" fill="red" stroke="none">CO</text>
    </svg>`
  },
  {
    id: 'em-distributive-shock',
    name: 'Distributive Shock',
    domain: 'medicine',
    category: 'shock',
    tags: ['distributive', 'shock', 'vasodilation', 'sepsis', 'anaphylaxis', 'neurogenic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="red" opacity="0.3"/>
      <path d="M32 24v-12"/>
      <path d="M32 40v12"/>
      <path d="M24 32h-12"/>
      <path d="M40 32h12"/>
      <path d="M26 26l-8-8"/>
      <path d="M38 26l8-8"/>
      <path d="M26 38l-8 8"/>
      <path d="M38 38l8 8"/>
      <path d="M16 16l-4-4" stroke="red"/>
      <path d="M48 16l4-4" stroke="red"/>
      <path d="M16 48l-4 4" stroke="red"/>
      <path d="M48 48l4 4" stroke="red"/>
    </svg>`
  },
  {
    id: 'em-obstructive-shock',
    name: 'Obstructive Shock',
    domain: 'medicine',
    category: 'shock',
    tags: ['obstructive', 'shock', 'PE', 'tamponade', 'tension', 'pneumothorax'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12c-10 0-18 6-18 14 0 10 18 18 18 18s18-8 18-18c0-8-8-14-18-14z"/>
      <rect x="24" y="22" width="16" height="12" rx="2" fill="currentColor" opacity="0.4"/>
      <path d="M32 20v-8"/>
      <path d="M28 14h8"/>
      <path d="M32 48v8"/>
      <path d="M28 56h8"/>
      <text x="26" y="31" font-size="6" fill="currentColor" stroke="none">X</text>
    </svg>`
  },
  {
    id: 'em-septic-shock',
    name: 'Septic Shock',
    domain: 'medicine',
    category: 'shock',
    tags: ['septic', 'shock', 'sepsis', 'infection', 'vasopressors', 'SIRS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16"/>
      <circle cx="24" cy="28" r="3" fill="red" opacity="0.5"/>
      <circle cx="40" cy="28" r="3" fill="red" opacity="0.5"/>
      <circle cx="28" cy="40" r="3" fill="red" opacity="0.5"/>
      <circle cx="36" cy="36" r="3" fill="red" opacity="0.5"/>
      <path d="M16 16l-4-4"/>
      <path d="M48 16l4-4"/>
      <path d="M32 8v-4"/>
      <rect x="26" y="52" width="12" height="8" rx="1" fill="currentColor" opacity="0.2"/>
      <text x="28" y="59" font-size="4" fill="currentColor" stroke="none">Abx</text>
    </svg>`
  },
  {
    id: 'em-anaphylaxis',
    name: 'Anaphylaxis',
    domain: 'medicine',
    category: 'shock',
    tags: ['anaphylaxis', 'allergic', 'reaction', 'epinephrine', 'angioedema', 'shock'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="16"/>
      <path d="M24 22c0-2 2-4 4-4"/>
      <path d="M36 22c0-2 2-4 4-4"/>
      <ellipse cx="32" cy="30" rx="8" ry="4" fill="red" opacity="0.3"/>
      <path d="M20 44c0-4 4-8 12-8s12 4 12 8"/>
      <path d="M20 44c-4 4-4 12 0 16"/>
      <path d="M44 44c4 4 4 12 0 16"/>
      <circle cx="12" cy="32" r="4" fill="red" opacity="0.3"/>
      <circle cx="52" cy="32" r="4" fill="red" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'em-neurogenic-shock',
    name: 'Neurogenic Shock',
    domain: 'medicine',
    category: 'shock',
    tags: ['neurogenic', 'shock', 'spinal', 'cord', 'injury', 'bradycardia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="12" ry="8"/>
      <path d="M32 24v32"/>
      <path d="M28 28h8"/>
      <path d="M26 36h12"/>
      <path d="M24 44h16"/>
      <path d="M32 56l-8 4"/>
      <path d="M32 56l8 4"/>
      <path d="M28 32l-8 4" stroke="red" stroke-dasharray="2 2"/>
      <path d="M36 40l8 4" stroke="red" stroke-dasharray="2 2"/>
      <circle cx="32" cy="36" r="3" fill="red" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'em-shock-index',
    name: 'Shock Index',
    domain: 'medicine',
    category: 'shock',
    tags: ['shock', 'index', 'HR', 'SBP', 'ratio', 'assessment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="4"/>
      <path d="M20 32h24"/>
      <text x="24" y="28" font-size="8" fill="currentColor" stroke="none">HR</text>
      <text x="22" y="44" font-size="8" fill="currentColor" stroke="none">SBP</text>
      <text x="44" y="20" font-size="6" fill="red" stroke="none">>1</text>
      <path d="M48 16l4-4" stroke="red"/>
    </svg>`
  },
  {
    id: 'em-vasopressors',
    name: 'Vasopressors',
    domain: 'medicine',
    category: 'shock',
    tags: ['vasopressor', 'norepinephrine', 'levophed', 'pressors', 'MAP', 'support'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="32" rx="2"/>
      <path d="M32 40v16"/>
      <circle cx="32" cy="56" r="4"/>
      <path d="M28 16h8"/>
      <path d="M28 24h8"/>
      <path d="M28 32h8"/>
      <path d="M16 24l8-4"/>
      <path d="M48 24l-8-4"/>
      <path d="M16 28l8 4"/>
      <path d="M48 28l-8 4"/>
      <text x="28" y="22" font-size="4" fill="red" stroke="none">NE</text>
    </svg>`
  },
  {
    id: 'em-fluid-resuscitation',
    name: 'Fluid Resuscitation',
    domain: 'medicine',
    category: 'shock',
    tags: ['fluid', 'resuscitation', 'crystalloid', 'bolus', 'IV', 'volume'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="36" rx="4"/>
      <ellipse cx="32" cy="8" rx="12" ry="4"/>
      <path d="M24 20h16" fill="blue" opacity="0.2"/>
      <rect x="24" y="20" width="16" height="20" fill="blue" opacity="0.2"/>
      <path d="M32 44v12"/>
      <path d="M28 52h8"/>
      <path d="M32 56v4"/>
      <text x="26" y="34" font-size="5" fill="currentColor" stroke="none">NS</text>
    </svg>`
  },

  // ===========================================================================
  // PROCEDURES (15 icons)
  // ===========================================================================
  {
    id: 'em-intubation',
    name: 'Intubation',
    domain: 'medicine',
    category: 'procedures',
    tags: ['intubation', 'laryngoscopy', 'airway', 'ETT', 'RSI', 'definitive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 16c0-4 8-8 12-8"/>
      <path d="M32 8c4 4 4 12 4 20"/>
      <path d="M36 28v24"/>
      <path d="M32 52h8"/>
      <path d="M16 20h12" stroke-width="3"/>
      <path d="M16 20c-4 4-4 12 0 16l12-4"/>
      <circle cx="32" cy="20" r="4" fill="currentColor" opacity="0.3"/>
      <text x="42" y="24" font-size="5" fill="currentColor" stroke="none">ETT</text>
    </svg>`
  },
  {
    id: 'em-cricothyrotomy',
    name: 'Cricothyrotomy',
    domain: 'medicine',
    category: 'procedures',
    tags: ['cricothyrotomy', 'cric', 'surgical', 'airway', 'emergency', 'CICO'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="12" ry="6"/>
      <path d="M20 20v8c0 2 4 4 12 4s12-2 12-4v-8"/>
      <ellipse cx="32" cy="40" rx="10" ry="4"/>
      <path d="M22 40v12c0 2 4 4 10 4s10-2 10-4v-12"/>
      <path d="M32 32v8" stroke="red" stroke-width="2"/>
      <path d="M28 36h8" stroke="red" stroke-width="2"/>
      <circle cx="32" cy="36" r="4" fill="red" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'em-chest-tube',
    name: 'Chest Tube',
    domain: 'medicine',
    category: 'procedures',
    tags: ['chest', 'tube', 'thoracostomy', 'pneumothorax', 'hemothorax', 'drainage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="20" ry="16"/>
      <path d="M44 20l8 8"/>
      <path d="M52 28v24"/>
      <rect x="44" y="52" width="16" height="8" rx="2"/>
      <path d="M48 56h8"/>
      <circle cx="44" cy="24" r="3" fill="red" opacity="0.5"/>
      <path d="M20 24c2 4 2 8 0 12"/>
      <path d="M28 20c2 6 2 16 0 20"/>
    </svg>`
  },
  {
    id: 'em-thoracotomy',
    name: 'ED Thoracotomy',
    domain: 'medicine',
    category: 'procedures',
    tags: ['thoracotomy', 'resuscitative', 'EDT', 'trauma', 'chest', 'open'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <path d="M12 24c8-4 32-4 40 0" stroke="red" stroke-width="2"/>
      <path d="M12 40c8 4 32 4 40 0" stroke="red" stroke-width="2"/>
      <path d="M32 24v16" stroke-dasharray="2 2"/>
      <path d="M20 32h24" stroke-dasharray="2 2"/>
      <circle cx="32" cy="32" r="6" fill="red" opacity="0.3"/>
      <path d="M26 32c3-2 9-2 12 0"/>
    </svg>`
  },
  {
    id: 'em-central-line-ij',
    name: 'IJ Central Line',
    domain: 'medicine',
    category: 'procedures',
    tags: ['central', 'line', 'IJ', 'internal', 'jugular', 'CVC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="10"/>
      <path d="M24 24c-4 8-4 20 0 28"/>
      <path d="M40 24c4 8 4 20 0 28"/>
      <path d="M36 22c6 1 10 4 14 2" stroke="blue" stroke-width="2"/>
      <circle cx="50" cy="20" r="4" fill="blue" opacity="0.3"/>
      <path d="M42 28l6-4"/>
      <text x="8" y="36" font-size="5" fill="currentColor" stroke="none">IJ</text>
    </svg>`
  },
  {
    id: 'em-central-line-sc',
    name: 'Subclavian Central Line',
    domain: 'medicine',
    category: 'procedures',
    tags: ['central', 'line', 'subclavian', 'SC', 'CVC', 'infraclavicular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h48"/>
      <ellipse cx="32" cy="40" rx="16" ry="12"/>
      <path d="M16 24c8 4 24 4 32 0"/>
      <path d="M20 28l-8 8" stroke="blue" stroke-width="2"/>
      <circle cx="10" cy="38" r="4" fill="blue" opacity="0.3"/>
      <circle cx="32" cy="40" r="6" fill="red" opacity="0.2"/>
      <text x="24" y="56" font-size="5" fill="currentColor" stroke="none">SC</text>
    </svg>`
  },
  {
    id: 'em-central-line-fem',
    name: 'Femoral Central Line',
    domain: 'medicine',
    category: 'procedures',
    tags: ['central', 'line', 'femoral', 'groin', 'CVC', 'access'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c4 8 4 24 4 40"/>
      <path d="M44 8c-4 8-4 24-4 40"/>
      <path d="M24 48h16"/>
      <ellipse cx="32" cy="12" rx="12" ry="4"/>
      <circle cx="28" cy="24" r="4" fill="red" opacity="0.3"/>
      <circle cx="36" cy="24" r="4" fill="blue" opacity="0.3"/>
      <path d="M36 28v12" stroke="blue" stroke-width="2"/>
      <text x="40" y="44" font-size="5" fill="currentColor" stroke="none">Fem</text>
    </svg>`
  },
  {
    id: 'em-arterial-line',
    name: 'Arterial Line',
    domain: 'medicine',
    category: 'procedures',
    tags: ['arterial', 'line', 'A-line', 'radial', 'monitoring', 'BP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32c8 0 16-8 32-8"/>
      <path d="M16 32c8 0 16 8 32 8"/>
      <circle cx="16" cy="32" r="6"/>
      <path d="M32 24v16" stroke="red" stroke-width="2"/>
      <circle cx="32" cy="24" r="3" fill="red" opacity="0.5"/>
      <path d="M48 20v24"/>
      <path d="M44 28h8"/>
      <path d="M44 36h8"/>
      <text x="50" y="32" font-size="4" fill="currentColor" stroke="none">BP</text>
    </svg>`
  },
  {
    id: 'em-lumbar-puncture',
    name: 'Lumbar Puncture',
    domain: 'medicine',
    category: 'procedures',
    tags: ['lumbar', 'puncture', 'LP', 'spinal', 'tap', 'CSF', 'meningitis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8c0 16 4 32 8 48"/>
      <path d="M40 8c0 16-4 32-8 48"/>
      <path d="M28 20h8"/>
      <path d="M26 32h12"/>
      <path d="M28 44h8"/>
      <path d="M44 36l-12 4" stroke="blue" stroke-width="2"/>
      <circle cx="46" cy="34" r="4" fill="blue" opacity="0.3"/>
      <rect x="42" y="28" width="8" height="12" rx="1"/>
      <text x="8" y="36" font-size="5" fill="currentColor" stroke="none">L4</text>
    </svg>`
  },
  {
    id: 'em-joint-aspiration',
    name: 'Joint Aspiration',
    domain: 'medicine',
    category: 'procedures',
    tags: ['joint', 'aspiration', 'arthrocentesis', 'knee', 'effusion', 'synovial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <circle cx="32" cy="32" r="10" fill="yellow" opacity="0.3"/>
      <path d="M48 20l-12 12" stroke-width="2"/>
      <rect x="46" y="12" width="6" height="12" rx="1"/>
      <path d="M49 12v-4"/>
      <path d="M36 32l-8 8" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'em-laceration-repair',
    name: 'Laceration Repair',
    domain: 'medicine',
    category: 'procedures',
    tags: ['laceration', 'repair', 'suture', 'wound', 'closure', 'stitches'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32c8-8 24-8 32 0" stroke="red" stroke-width="2"/>
      <path d="M20 28l8 8"/>
      <path d="M28 28l8 8"/>
      <path d="M36 28l8 8"/>
      <path d="M24 24v-4c0-4 4-8 8-8"/>
      <path d="M40 24v-4c0-4-4-8-8-8"/>
      <path d="M32 20v24"/>
      <path d="M28 44h8"/>
    </svg>`
  },
  {
    id: 'em-fracture-reduction',
    name: 'Fracture Reduction',
    domain: 'medicine',
    category: 'procedures',
    tags: ['fracture', 'reduction', 'bone', 'manipulation', 'alignment', 'splint'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8v20"/>
      <path d="M24 36v20"/>
      <path d="M24 28l8-4-8-4" stroke="red"/>
      <path d="M24 36l8 4-8 4" stroke="red"/>
      <path d="M40 8v20"/>
      <path d="M40 36v20"/>
      <path d="M16 24l8 8-8 8"/>
      <path d="M48 24l-8 8 8 8"/>
    </svg>`
  },
  {
    id: 'em-wound-irrigation',
    name: 'Wound Irrigation',
    domain: 'medicine',
    category: 'procedures',
    tags: ['wound', 'irrigation', 'cleaning', 'debridement', 'saline', 'infection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="24" rx="2"/>
      <path d="M32 32v8"/>
      <path d="M28 40l4 8 4-8"/>
      <ellipse cx="32" cy="52" rx="12" ry="6" fill="red" opacity="0.2"/>
      <path d="M24 48c4 4 12 4 16 0"/>
      <path d="M28 16c2-2 6-2 8 0" stroke="blue"/>
      <path d="M28 24c2-2 6-2 8 0" stroke="blue"/>
    </svg>`
  },
  {
    id: 'em-paracentesis',
    name: 'Paracentesis',
    domain: 'medicine',
    category: 'procedures',
    tags: ['paracentesis', 'ascites', 'abdominal', 'tap', 'fluid', 'drainage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="20" ry="16"/>
      <ellipse cx="32" cy="36" rx="14" ry="10" fill="yellow" opacity="0.3"/>
      <circle cx="32" cy="16" r="4"/>
      <path d="M24 24l-8 20" stroke-width="2"/>
      <rect x="8" y="44" width="8" height="12" rx="1"/>
      <path d="M16 50h8" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'em-pericardiocentesis',
    name: 'Pericardiocentesis',
    domain: 'medicine',
    category: 'procedures',
    tags: ['pericardiocentesis', 'tamponade', 'pericardial', 'effusion', 'drainage', 'cardiac'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12c-12 0-20 8-20 16 0 12 20 24 20 24s20-12 20-24c0-8-8-16-20-16z"/>
      <path d="M32 16c-8 0-14 6-14 12 0 8 14 18 14 18s14-10 14-18c0-6-6-12-14-12z" fill="yellow" opacity="0.3"/>
      <path d="M20 52l12-16" stroke="blue" stroke-width="2"/>
      <rect x="12" y="52" width="8" height="8" rx="1"/>
      <circle cx="32" cy="32" r="4" fill="red" opacity="0.3"/>
    </svg>`
  },

  // ===========================================================================
  // MONITORING (10 icons)
  // ===========================================================================
  {
    id: 'em-cardiac-monitor',
    name: 'Cardiac Monitor',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['cardiac', 'monitor', 'ECG', 'telemetry', 'rhythm', 'heart'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="4"/>
      <rect x="12" y="16" width="40" height="24" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M16 28h8l2-6 4 12 2-6h8l2-4 4 8 2-4h8" stroke="green"/>
      <circle cx="20" cy="46" r="3"/>
      <circle cx="32" cy="46" r="3"/>
      <circle cx="44" cy="46" r="3"/>
    </svg>`
  },
  {
    id: 'em-pulse-ox',
    name: 'Pulse Oximeter',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['pulse', 'oximeter', 'SpO2', 'oxygen', 'saturation', 'finger'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 32c0-8 8-16 12-24 4 8 12 16 12 24 0 12-8 24-12 24s-12-12-12-24z"/>
      <rect x="24" y="28" width="16" height="12" rx="2" fill="currentColor" opacity="0.1"/>
      <text x="26" y="38" font-size="8" fill="currentColor" stroke="none">98</text>
      <path d="M32 8v-4"/>
      <circle cx="32" cy="4" r="2" fill="red"/>
      <text x="42" y="36" font-size="5" fill="currentColor" stroke="none">%</text>
    </svg>`
  },
  {
    id: 'em-capnography',
    name: 'Capnography',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['capnography', 'ETCO2', 'CO2', 'waveform', 'ventilation', 'end-tidal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <path d="M16 40h4v-16h8v16h4v-16h8v16h4" stroke="yellow"/>
      <text x="40" y="28" font-size="6" fill="currentColor" stroke="none">35</text>
      <path d="M16 52h32"/>
      <circle cx="32" cy="56" r="2"/>
    </svg>`
  },
  {
    id: 'em-arterial-waveform',
    name: 'Arterial Line Waveform',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['arterial', 'waveform', 'A-line', 'pressure', 'dicrotic', 'notch'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="4"/>
      <path d="M16 36l4-16 2 4 2-4 4 16 4-4 4 4 4-8 4 4 4-4 4 8" stroke="red"/>
      <text x="12" y="22" font-size="5" fill="currentColor" stroke="none">120</text>
      <text x="12" y="46" font-size="5" fill="currentColor" stroke="none">80</text>
      <path d="M12 24h4"/>
      <path d="M12 40h4"/>
    </svg>`
  },
  {
    id: 'em-cvp-monitor',
    name: 'CVP Monitor',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['CVP', 'central', 'venous', 'pressure', 'monitoring', 'fluid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <path d="M20 20h24"/>
      <path d="M20 32h24"/>
      <path d="M20 44h24"/>
      <path d="M32 16v36" stroke="blue"/>
      <circle cx="32" cy="36" r="4" fill="blue" opacity="0.3"/>
      <text x="36" y="28" font-size="6" fill="currentColor" stroke="none">8</text>
      <text x="44" y="28" font-size="4" fill="currentColor" stroke="none">mmHg</text>
    </svg>`
  },
  {
    id: 'em-icp-monitor',
    name: 'ICP Monitor',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['ICP', 'intracranial', 'pressure', 'brain', 'monitoring', 'bolt'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="20"/>
      <path d="M20 20c6 6 18 6 24 0"/>
      <path d="M32 8v-4"/>
      <rect x="28" y="4" width="8" height="8" rx="1" fill="currentColor" opacity="0.3"/>
      <path d="M32 12v8" stroke-width="2"/>
      <rect x="20" y="52" width="24" height="8" rx="2"/>
      <text x="24" y="59" font-size="6" fill="currentColor" stroke="none">15</text>
    </svg>`
  },
  {
    id: 'em-temperature-probe',
    name: 'Temperature Probe',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['temperature', 'probe', 'fever', 'hypothermia', 'core', 'monitoring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="26" y="8" width="12" height="40" rx="6"/>
      <circle cx="32" cy="44" r="6" fill="red" opacity="0.3"/>
      <path d="M32 20v18"/>
      <path d="M38 16h4"/>
      <path d="M38 24h4"/>
      <path d="M38 32h4"/>
      <rect x="20" y="52" width="24" height="8" rx="2"/>
      <text x="24" y="59" font-size="6" fill="currentColor" stroke="none">37.2</text>
    </svg>`
  },
  {
    id: 'em-bp-cuff',
    name: 'Blood Pressure Cuff',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['blood', 'pressure', 'cuff', 'NIBP', 'sphygmomanometer', 'BP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="24" rx="4"/>
      <path d="M12 28h40"/>
      <path d="M12 36h40"/>
      <rect x="20" y="48" width="24" height="12" rx="2"/>
      <text x="24" y="57" font-size="5" fill="currentColor" stroke="none">120</text>
      <text x="24" y="62" font-size="4" fill="currentColor" stroke="none">/80</text>
      <path d="M32 44v4"/>
    </svg>`
  },
  {
    id: 'em-glucose-monitor',
    name: 'Glucose Monitor',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['glucose', 'blood', 'sugar', 'diabetes', 'POC', 'fingerstick'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="12" width="32" height="40" rx="4"/>
      <rect x="20" y="16" width="24" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <text x="24" y="30" font-size="10" fill="currentColor" stroke="none">126</text>
      <path d="M24 40h16"/>
      <path d="M32 44v4"/>
      <circle cx="32" cy="48" r="2"/>
      <path d="M32 8v4" stroke="red"/>
    </svg>`
  },
  {
    id: 'em-ventilator',
    name: 'Ventilator',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['ventilator', 'mechanical', 'ventilation', 'breathing', 'machine', 'respiratory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <rect x="16" y="12" width="32" height="20" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M20 22h6l2-6 4 12 2-6h6" stroke="green"/>
      <circle cx="24" cy="44" r="4"/>
      <circle cx="40" cy="44" r="4"/>
      <path d="M28 44h8"/>
      <path d="M32 36v-4"/>
      <text x="18" y="18" font-size="4" fill="currentColor" stroke="none">Vt 500</text>
    </svg>`
  },

  // ===========================================================================
  // TRIAGE & FLOW (16 icons)
  // ===========================================================================
  {
    id: 'em-esi-1',
    name: 'ESI Level 1 - Resuscitation',
    domain: 'medicine',
    category: 'triage',
    tags: ['ESI', 'triage', 'level 1', 'resuscitation', 'critical', 'immediate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="red" opacity="0.3"/>
      <text x="24" y="40" font-size="20" fill="red" stroke="none">1</text>
      <path d="M32 8v-4" stroke="red"/>
      <path d="M32 60v-4" stroke="red"/>
      <path d="M8 32h4" stroke="red"/>
      <path d="M56 32h-4" stroke="red"/>
    </svg>`
  },
  {
    id: 'em-esi-2',
    name: 'ESI Level 2 - Emergent',
    domain: 'medicine',
    category: 'triage',
    tags: ['ESI', 'triage', 'level 2', 'emergent', 'high risk', 'urgent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="orange" opacity="0.3"/>
      <text x="24" y="40" font-size="20" fill="orange" stroke="none">2</text>
    </svg>`
  },
  {
    id: 'em-esi-3',
    name: 'ESI Level 3 - Urgent',
    domain: 'medicine',
    category: 'triage',
    tags: ['ESI', 'triage', 'level 3', 'urgent', 'resources', 'moderate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="yellow" opacity="0.3"/>
      <text x="24" y="40" font-size="20" fill="currentColor" stroke="none">3</text>
    </svg>`
  },
  {
    id: 'em-esi-4',
    name: 'ESI Level 4 - Less Urgent',
    domain: 'medicine',
    category: 'triage',
    tags: ['ESI', 'triage', 'level 4', 'less urgent', 'one resource'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="green" opacity="0.3"/>
      <text x="24" y="40" font-size="20" fill="green" stroke="none">4</text>
    </svg>`
  },
  {
    id: 'em-esi-5',
    name: 'ESI Level 5 - Non-Urgent',
    domain: 'medicine',
    category: 'triage',
    tags: ['ESI', 'triage', 'level 5', 'non-urgent', 'no resources'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="blue" opacity="0.3"/>
      <text x="24" y="40" font-size="20" fill="blue" stroke="none">5</text>
    </svg>`
  },
  {
    id: 'em-ambulance',
    name: 'Ambulance',
    domain: 'medicine',
    category: 'triage',
    tags: ['ambulance', 'EMS', 'transport', 'emergency', 'vehicle', 'paramedic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" rx="2"/>
      <path d="M8 32h12"/>
      <path d="M44 20v-8h8l4 8"/>
      <circle cx="20" cy="48" r="4"/>
      <circle cx="48" cy="48" r="4"/>
      <path d="M24 48h20"/>
      <path d="M26 28h8" stroke="red" stroke-width="2"/>
      <path d="M30 24v8" stroke="red" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'em-ed-layout',
    name: 'ED Layout',
    domain: 'medicine',
    category: 'triage',
    tags: ['ED', 'layout', 'emergency', 'department', 'floor', 'plan'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <path d="M8 24h48"/>
      <path d="M8 40h48"/>
      <path d="M24" y="8" width="1" height="56"/>
      <path d="M40 8v56"/>
      <text x="12" y="18" font-size="5" fill="currentColor" stroke="none">Triage</text>
      <text x="28" y="18" font-size="5" fill="currentColor" stroke="none">Resus</text>
      <text x="12" y="34" font-size="4" fill="currentColor" stroke="none">Acute</text>
      <text x="44" y="50" font-size="4" fill="currentColor" stroke="none">Fast</text>
    </svg>`
  },
  {
    id: 'em-resuscitation-bay',
    name: 'Resuscitation Bay',
    domain: 'medicine',
    category: 'triage',
    tags: ['resuscitation', 'bay', 'trauma', 'critical', 'room', 'resus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2" fill="red" opacity="0.1"/>
      <rect x="16" y="24" width="32" height="16" rx="1"/>
      <circle cx="32" cy="32" r="4" fill="red" opacity="0.3"/>
      <path d="M16" y="8" width="1" height="8"/>
      <path d="M48 8v8"/>
      <path d="M20 52h24"/>
      <text x="22" y="60" font-size="5" fill="red" stroke="none">RESUS</text>
    </svg>`
  },
  {
    id: 'em-isolation-room',
    name: 'Isolation Room',
    domain: 'medicine',
    category: 'triage',
    tags: ['isolation', 'room', 'airborne', 'droplet', 'contact', 'precautions'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="2"/>
      <rect x="20" y="20" width="24" height="24" rx="1" fill="yellow" opacity="0.2"/>
      <path d="M32 8v4"/>
      <path d="M32 52v4"/>
      <path d="M8 32h4"/>
      <path d="M52 32h4"/>
      <circle cx="32" cy="32" r="6"/>
      <path d="M28 32h8"/>
      <path d="M32 28v8"/>
    </svg>`
  },
  {
    id: 'em-decon-area',
    name: 'Decontamination Area',
    domain: 'medicine',
    category: 'triage',
    tags: ['decontamination', 'hazmat', 'chemical', 'area', 'shower', 'wash'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="2"/>
      <path d="M32 16v8"/>
      <path d="M24 24c4 4 12 4 16 0" stroke="blue"/>
      <path d="M20 32c6 6 18 6 24 0" stroke="blue"/>
      <path d="M16 40c8 8 24 8 32 0" stroke="blue"/>
      <circle cx="32" cy="16" r="4" fill="blue" opacity="0.3"/>
      <text x="18" y="54" font-size="5" fill="currentColor" stroke="none">DECON</text>
    </svg>`
  },
  {
    id: 'em-pediatric-area',
    name: 'Pediatric Area',
    domain: 'medicine',
    category: 'triage',
    tags: ['pediatric', 'peds', 'children', 'area', 'kids', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="4" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="24" r="8"/>
      <path d="M32 32v12"/>
      <path d="M24 38h16"/>
      <path d="M28 44l-4 8"/>
      <path d="M36 44l4 8"/>
      <path d="M28 22h8"/>
      <circle cx="28" cy="22" r="1" fill="currentColor"/>
      <circle cx="36" cy="22" r="1" fill="currentColor"/>
      <path d="M30 26c1 1 3 1 4 0"/>
    </svg>`
  },
  {
    id: 'em-trauma-bay',
    name: 'Trauma Bay',
    domain: 'medicine',
    category: 'triage',
    tags: ['trauma', 'bay', 'room', 'activation', 'alert', 'critical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2" fill="orange" opacity="0.2"/>
      <rect x="16" y="24" width="32" height="16" rx="1"/>
      <path d="M24 24v16"/>
      <path d="M40 24v16"/>
      <path d="M32 24v16"/>
      <circle cx="16" cy="12" r="4" fill="orange"/>
      <circle cx="48" cy="12" r="4" fill="orange"/>
      <text x="18" y="58" font-size="5" fill="orange" stroke="none">TRAUMA</text>
    </svg>`
  },
  {
    id: 'em-waiting-room',
    name: 'Waiting Room',
    domain: 'medicine',
    category: 'triage',
    tags: ['waiting', 'room', 'lobby', 'patients', 'area', 'queue'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="28" width="16" height="12" rx="1"/>
      <rect x="28" y="28" width="16" height="12" rx="1"/>
      <rect x="48" y="28" width="8" height="12" rx="1"/>
      <circle cx="16" cy="20" r="4"/>
      <circle cx="36" cy="20" r="4"/>
      <circle cx="52" cy="20" r="4"/>
      <path d="M8 44h48"/>
      <path d="M16 48v8"/>
      <path d="M48 48v8"/>
    </svg>`
  },
  {
    id: 'em-fast-track',
    name: 'Fast Track',
    domain: 'medicine',
    category: 'triage',
    tags: ['fast', 'track', 'minor', 'care', 'urgent', 'low acuity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h32l12-12"/>
      <path d="M40 32l12 12"/>
      <path d="M40 20l12 12-12 12"/>
      <circle cx="16" cy="32" r="4" fill="green" opacity="0.3"/>
      <circle cx="28" cy="32" r="4" fill="green" opacity="0.3"/>
      <text x="12" y="52" font-size="5" fill="green" stroke="none">FAST TRACK</text>
    </svg>`
  },
  {
    id: 'em-helicopter',
    name: 'Helicopter/Air Transport',
    domain: 'medicine',
    category: 'triage',
    tags: ['helicopter', 'air', 'transport', 'medevac', 'flight', 'transfer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="16" ry="8"/>
      <path d="M16 36c-4 0-8 4-8 8h8"/>
      <path d="M48 36c4 0 8 4 8 8h-8"/>
      <path d="M32 28v-12"/>
      <path d="M16 16h32"/>
      <path d="M32 16v-4"/>
      <path d="M28 44l-4 8"/>
      <path d="M36 44l4 8"/>
      <path d="M24 52h16"/>
      <path d="M28 32h8" stroke="red"/>
      <path d="M32 28v8" stroke="red"/>
    </svg>`
  },
  {
    id: 'em-bed-management',
    name: 'Bed Management',
    domain: 'medicine',
    category: 'triage',
    tags: ['bed', 'management', 'capacity', 'flow', 'admission', 'boarding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="20" height="16" rx="2" fill="green" opacity="0.3"/>
      <rect x="36" y="24" width="20" height="16" rx="2" fill="red" opacity="0.3"/>
      <rect x="8" y="44" width="20" height="12" rx="1"/>
      <rect x="36" y="44" width="20" height="12" rx="1"/>
      <path d="M18 28v8"/>
      <circle cx="18" cy="22" r="3"/>
      <path d="M46 28v8"/>
      <circle cx="46" cy="22" r="3"/>
      <text x="12" y="10" font-size="4" fill="currentColor" stroke="none">Available</text>
      <text x="40" y="10" font-size="4" fill="currentColor" stroke="none">Occupied</text>
    </svg>`
  },

  // ===========================================================================
  // STROKE & NEUROLOGICAL EMERGENCIES (8 icons)
  // ===========================================================================
  {
    id: 'em-stroke-alert',
    name: 'Stroke Alert',
    domain: 'medicine',
    category: 'neuro-emergency',
    tags: ['stroke', 'alert', 'CVA', 'brain', 'thrombolysis', 'code'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="20"/>
      <path d="M22 24c4 4 16 4 20 0"/>
      <path d="M22 32c4-4 16-4 20 0"/>
      <path d="M32 48v8"/>
      <path d="M28 52h8"/>
      <path d="M40 20l8-8" stroke="red" stroke-width="2"/>
      <circle cx="50" cy="10" r="4" fill="red" opacity="0.5"/>
      <text x="46" y="14" font-size="5" fill="white" stroke="none">!</text>
    </svg>`
  },
  {
    id: 'em-tpa',
    name: 'tPA/Thrombolysis',
    domain: 'medicine',
    category: 'neuro-emergency',
    tags: ['tPA', 'thrombolysis', 'alteplase', 'stroke', 'clot', 'lysis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="40" rx="4"/>
      <rect x="24" y="12" width="16" height="32" rx="2" fill="red" opacity="0.3"/>
      <path d="M32 44v12"/>
      <path d="M28 52h8"/>
      <text x="26" y="32" font-size="6" fill="currentColor" stroke="none">tPA</text>
      <path d="M28 20c2 2 6 2 8 0"/>
      <path d="M28 24c2 2 6 2 8 0"/>
    </svg>`
  },
  {
    id: 'em-nih-stroke-scale',
    name: 'NIH Stroke Scale',
    domain: 'medicine',
    category: 'neuro-emergency',
    tags: ['NIHSS', 'stroke', 'scale', 'assessment', 'severity', 'score'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="2"/>
      <path d="M20 20h24"/>
      <path d="M20 28h24"/>
      <path d="M20 36h24"/>
      <path d="M20 44h16"/>
      <circle cx="16" cy="20" r="2" fill="currentColor"/>
      <circle cx="16" cy="28" r="2" fill="currentColor"/>
      <circle cx="16" cy="36" r="2" fill="currentColor"/>
      <circle cx="16" cy="44" r="2" fill="currentColor"/>
      <text x="40" y="52" font-size="8" fill="currentColor" stroke="none">12</text>
    </svg>`
  },
  {
    id: 'em-seizure',
    name: 'Seizure',
    domain: 'medicine',
    category: 'neuro-emergency',
    tags: ['seizure', 'epilepsy', 'convulsion', 'status', 'epilepticus', 'neuro'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="12"/>
      <path d="M24 18l4 4-4 4"/>
      <path d="M40 18l-4 4 4 4"/>
      <path d="M32 32v8"/>
      <path d="M28 40h8"/>
      <path d="M20 48l8-4 8 4 8-4"/>
      <path d="M20 54l8-4 8 4 8-4"/>
      <path d="M8 16l8-4 4 8" stroke="yellow"/>
      <path d="M56 16l-8-4-4 8" stroke="yellow"/>
    </svg>`
  },
  {
    id: 'em-brain-herniation',
    name: 'Brain Herniation',
    domain: 'medicine',
    category: 'neuro-emergency',
    tags: ['herniation', 'brain', 'ICP', 'uncal', 'tentorial', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="18"/>
      <path d="M20 20c6 4 18 4 24 0"/>
      <path d="M20 28c6-4 18-4 24 0"/>
      <path d="M32 42v12"/>
      <path d="M28 48h8"/>
      <path d="M32 36c4 4 4 8 4 12" fill="red" opacity="0.3"/>
      <circle cx="28" cy="22" r="2" fill="currentColor"/>
      <circle cx="36" cy="22" r="4"/>
      <circle cx="36" cy="22" r="1" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'em-ct-head',
    name: 'CT Head',
    domain: 'medicine',
    category: 'neuro-emergency',
    tags: ['CT', 'head', 'brain', 'imaging', 'scan', 'hemorrhage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="14"/>
      <path d="M24 28c4 4 12 4 16 0"/>
      <path d="M24 36c4-4 12-4 16 0"/>
      <circle cx="40" cy="28" r="4" fill="red" opacity="0.5"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <path d="M32 8v8"/>
      <path d="M32 48v8"/>
    </svg>`
  },
  {
    id: 'em-lumbar-drain',
    name: 'Lumbar Drain',
    domain: 'medicine',
    category: 'neuro-emergency',
    tags: ['lumbar', 'drain', 'CSF', 'pressure', 'hydrocephalus', 'EVD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="16" ry="12"/>
      <path d="M32 32v20"/>
      <path d="M24 24c4 4 12 4 16 0"/>
      <path d="M44 36h8v16h-8"/>
      <rect x="44" y="44" width="8" height="8" fill="yellow" opacity="0.3"/>
      <path d="M32 40l12-4"/>
      <text x="46" y="42" font-size="4" fill="currentColor" stroke="none">CSF</text>
    </svg>`
  },
  {
    id: 'em-spinal-cord-injury',
    name: 'Spinal Cord Injury',
    domain: 'medicine',
    category: 'neuro-emergency',
    tags: ['spinal', 'cord', 'injury', 'SCI', 'paralysis', 'trauma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="10" ry="6"/>
      <path d="M32 18v36"/>
      <path d="M28 24h8"/>
      <path d="M26 32h12"/>
      <path d="M24 40h16"/>
      <path d="M32 54l-8 6"/>
      <path d="M32 54l8 6"/>
      <circle cx="32" cy="36" r="4" fill="red" opacity="0.5"/>
      <path d="M28 36h8" stroke="red" stroke-width="2"/>
    </svg>`
  },

  // ===========================================================================
  // ABDOMINAL EMERGENCIES (6 icons)
  // ===========================================================================
  {
    id: 'em-appendicitis',
    name: 'Appendicitis',
    domain: 'medicine',
    category: 'abdominal-emergency',
    tags: ['appendicitis', 'appendix', 'RLQ', 'acute', 'abdomen', 'surgical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <path d="M32 16v32" stroke-dasharray="2 2"/>
      <path d="M12 32h40" stroke-dasharray="2 2"/>
      <path d="M40 40c4 4 8 8 8 12" stroke="red" stroke-width="2"/>
      <circle cx="48" cy="52" r="4" fill="red" opacity="0.5"/>
      <text x="42" y="60" font-size="4" fill="red" stroke="none">RLQ</text>
    </svg>`
  },
  {
    id: 'em-aaa',
    name: 'AAA Rupture',
    domain: 'medicine',
    category: 'abdominal-emergency',
    tags: ['AAA', 'aortic', 'aneurysm', 'rupture', 'abdominal', 'vascular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v16"/>
      <ellipse cx="32" cy="36" rx="12" ry="16" fill="red" opacity="0.3"/>
      <path d="M32 52v8"/>
      <path d="M24 56l-4 4"/>
      <path d="M40 56l4 4"/>
      <path d="M20 32c-4 4-4 12 0 16" stroke="red"/>
      <path d="M44 32c4 4 4 12 0 16" stroke="red"/>
      <circle cx="40" cy="40" r="3" fill="red"/>
    </svg>`
  },
  {
    id: 'em-gi-bleed',
    name: 'GI Bleeding',
    domain: 'medicine',
    category: 'abdominal-emergency',
    tags: ['GI', 'bleeding', 'hematemesis', 'melena', 'hemorrhage', 'upper', 'lower'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 12c0 8 8 16 12 24s12 16 12 24"/>
      <path d="M44 12c0 8-8 16-12 24s-12 16-12 24"/>
      <circle cx="32" cy="28" r="6" fill="red" opacity="0.5"/>
      <circle cx="28" cy="44" r="4" fill="red" opacity="0.5"/>
      <circle cx="36" cy="52" r="3" fill="red" opacity="0.5"/>
      <path d="M28 20l4 8-4 8" stroke="red"/>
    </svg>`
  },
  {
    id: 'em-bowel-obstruction',
    name: 'Bowel Obstruction',
    domain: 'medicine',
    category: 'abdominal-emergency',
    tags: ['bowel', 'obstruction', 'SBO', 'ileus', 'vomiting', 'distension'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c4 4 8 0 12 4s8 0 12-4 8 0 8 4"/>
      <path d="M16 28c4 4 8 0 12 4s8 0 12-4 8 0 8 4"/>
      <path d="M16 40c4 4 8 0 12 4s8 0 12-4"/>
      <rect x="40" y="36" width="4" height="12" fill="currentColor" opacity="0.5"/>
      <path d="M16 52h32"/>
      <ellipse cx="24" cy="22" rx="6" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="24" cy="34" rx="8" ry="4" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'em-peritonitis',
    name: 'Peritonitis',
    domain: 'medicine',
    category: 'abdominal-emergency',
    tags: ['peritonitis', 'peritoneal', 'sepsis', 'acute', 'abdomen', 'rigid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="18" fill="red" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="20" ry="18"/>
      <circle cx="24" cy="24" r="2" fill="red"/>
      <circle cx="40" cy="24" r="2" fill="red"/>
      <circle cx="28" cy="36" r="2" fill="red"/>
      <circle cx="36" cy="40" r="2" fill="red"/>
      <circle cx="32" cy="28" r="2" fill="red"/>
      <text x="22" y="56" font-size="5" fill="red" stroke="none">Guarding</text>
    </svg>`
  },
  {
    id: 'em-ectopic',
    name: 'Ectopic Pregnancy',
    domain: 'medicine',
    category: 'abdominal-emergency',
    tags: ['ectopic', 'pregnancy', 'tubal', 'rupture', 'hemorrhage', 'OB'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="16" ry="12"/>
      <path d="M16 36c-8-4-8-16 0-20"/>
      <path d="M48 36c8-4 8-16 0-20"/>
      <circle cx="12" cy="24" r="6" fill="red" opacity="0.3"/>
      <circle cx="12" cy="24" r="3"/>
      <path d="M6 28c-2 4 0 8 4 8" stroke="red"/>
      <text x="24" y="56" font-size="5" fill="currentColor" stroke="none">Ectopic</text>
    </svg>`
  },

  // ===========================================================================
  // PEDIATRIC EMERGENCIES (6 icons)
  // ===========================================================================
  {
    id: 'em-broselow-tape',
    name: 'Broselow Tape',
    domain: 'medicine',
    category: 'pediatric-emergency',
    tags: ['broselow', 'tape', 'pediatric', 'weight', 'dosing', 'length'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="16" rx="2"/>
      <rect x="8" y="24" width="8" height="16" fill="gray" opacity="0.3"/>
      <rect x="16" y="24" width="8" height="16" fill="pink" opacity="0.3"/>
      <rect x="24" y="24" width="8" height="16" fill="red" opacity="0.3"/>
      <rect x="32" y="24" width="8" height="16" fill="purple" opacity="0.3"/>
      <rect x="40" y="24" width="8" height="16" fill="yellow" opacity="0.3"/>
      <rect x="48" y="24" width="8" height="16" fill="white" opacity="0.3"/>
      <text x="10" y="34" font-size="4" fill="currentColor" stroke="none">3kg</text>
      <text x="26" y="34" font-size="4" fill="currentColor" stroke="none">10</text>
      <text x="42" y="34" font-size="4" fill="currentColor" stroke="none">20</text>
      <path d="M8 44h48"/>
    </svg>`
  },
  {
    id: 'em-peds-code',
    name: 'Pediatric Code',
    domain: 'medicine',
    category: 'pediatric-emergency',
    tags: ['pediatric', 'code', 'PALS', 'arrest', 'resuscitation', 'child'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="10"/>
      <path d="M32 26v16"/>
      <path d="M24 32h16"/>
      <path d="M28 42l-6 14"/>
      <path d="M36 42l6 14"/>
      <path d="M28 14h8" stroke="red"/>
      <path d="M32 10v8" stroke="red"/>
      <circle cx="28" cy="14" r="1" fill="currentColor"/>
      <circle cx="36" cy="14" r="1" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'em-croup',
    name: 'Croup',
    domain: 'medicine',
    category: 'pediatric-emergency',
    tags: ['croup', 'stridor', 'barking', 'cough', 'laryngotracheitis', 'pediatric'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="10"/>
      <path d="M28 14h8"/>
      <circle cx="28" cy="14" r="1" fill="currentColor"/>
      <circle cx="36" cy="14" r="1" fill="currentColor"/>
      <path d="M28 20c2 2 6 2 8 0"/>
      <path d="M32 26v8"/>
      <path d="M28 30h8"/>
      <ellipse cx="32" cy="32" rx="4" ry="2" fill="red" opacity="0.3"/>
      <path d="M20 40c4-4 8-4 12 0s8 4 12 0"/>
      <path d="M20 48c4-4 8-4 12 0s8 4 12 0"/>
      <text x="44" y="28" font-size="5" fill="currentColor" stroke="none">Stridor</text>
    </svg>`
  },
  {
    id: 'em-epiglottitis',
    name: 'Epiglottitis',
    domain: 'medicine',
    category: 'pediatric-emergency',
    tags: ['epiglottitis', 'airway', 'drooling', 'tripod', 'stridor', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="10"/>
      <path d="M28 14h8"/>
      <path d="M28 20c2 2 6 2 8 0"/>
      <path d="M32 26v8"/>
      <ellipse cx="32" cy="30" rx="6" ry="4" fill="red" opacity="0.5"/>
      <path d="M32 34v12"/>
      <path d="M24 36h16"/>
      <path d="M28 46l-6 12"/>
      <path d="M36 46l6 12"/>
      <path d="M30 26l-6 8" stroke="blue" opacity="0.5"/>
      <text x="8" y="38" font-size="4" fill="blue" stroke="none">Drool</text>
    </svg>`
  },
  {
    id: 'em-febrile-seizure',
    name: 'Febrile Seizure',
    domain: 'medicine',
    category: 'pediatric-emergency',
    tags: ['febrile', 'seizure', 'fever', 'pediatric', 'convulsion', 'simple'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="10" fill="red" opacity="0.2"/>
      <path d="M28 14h8"/>
      <circle cx="28" cy="14" r="1" fill="currentColor"/>
      <circle cx="36" cy="14" r="1" fill="currentColor"/>
      <path d="M32 26v16"/>
      <path d="M24 32h16"/>
      <path d="M28 42l-4 12"/>
      <path d="M36 42l4 12"/>
      <path d="M44 12l-4 4 4 4" stroke="red"/>
      <path d="M48 8l-4 4 4 4" stroke="red"/>
      <text x="20" y="60" font-size="4" fill="currentColor" stroke="none">39.5C</text>
    </svg>`
  },
  {
    id: 'em-neonatal-resus',
    name: 'Neonatal Resuscitation',
    domain: 'medicine',
    category: 'pediatric-emergency',
    tags: ['neonatal', 'resuscitation', 'NRP', 'newborn', 'delivery', 'APGAR'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="12"/>
      <circle cx="32" cy="24" r="8"/>
      <path d="M28 22h8"/>
      <circle cx="28" cy="22" r="1" fill="currentColor"/>
      <circle cx="36" cy="22" r="1" fill="currentColor"/>
      <path d="M30 26c1 1 3 1 4 0"/>
      <path d="M24 32h16"/>
      <path d="M32 32v8"/>
      <path d="M28 40l-4 8"/>
      <path d="M36 40l4 8"/>
      <path d="M16 20l-4-4" stroke="blue"/>
      <ellipse cx="10" cy="14" rx="4" ry="2" fill="blue" opacity="0.3"/>
    </svg>`
  },

  // ===========================================================================
  // ACLS RHYTHMS (5 icons)
  // ===========================================================================
  {
    id: 'em-vfib',
    name: 'Ventricular Fibrillation',
    domain: 'medicine',
    category: 'acls-rhythm',
    tags: ['VF', 'ventricular', 'fibrillation', 'shockable', 'arrest', 'rhythm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2"/>
      <path d="M12 32c2-4 2-8 4-4s2 8 4 4 2-8 4-4 2 8 4 4 2-8 4-4 2 8 4 4 2-8 4-4 2 8 4 4 2-8 4-4" stroke="red"/>
      <text x="12" y="14" font-size="6" fill="red" stroke="none">VF</text>
      <circle cx="52" cy="12" r="4" fill="red"/>
      <path d="M50 10l4 4"/>
      <path d="M54 10l-4 4"/>
    </svg>`
  },
  {
    id: 'em-vtach',
    name: 'Ventricular Tachycardia',
    domain: 'medicine',
    category: 'acls-rhythm',
    tags: ['VT', 'ventricular', 'tachycardia', 'wide', 'complex', 'rhythm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2"/>
      <path d="M12 32l2-8 4 16 4-16 4 16 4-16 4 16 4-16 4 16 4-16 2 8" stroke="orange"/>
      <text x="12" y="14" font-size="6" fill="orange" stroke="none">VT</text>
      <text x="44" y="54" font-size="5" fill="currentColor" stroke="none">200bpm</text>
    </svg>`
  },
  {
    id: 'em-asystole',
    name: 'Asystole',
    domain: 'medicine',
    category: 'acls-rhythm',
    tags: ['asystole', 'flatline', 'non-shockable', 'arrest', 'rhythm', 'PEA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2"/>
      <path d="M12 32h40" stroke="green"/>
      <text x="12" y="14" font-size="5" fill="currentColor" stroke="none">Asystole</text>
      <path d="M32 40v8"/>
      <path d="M28 44h8"/>
    </svg>`
  },
  {
    id: 'em-pea',
    name: 'PEA',
    domain: 'medicine',
    category: 'acls-rhythm',
    tags: ['PEA', 'pulseless', 'electrical', 'activity', 'non-shockable', 'rhythm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2"/>
      <path d="M12 32h6l2-6 4 12 2-6h6l2-4 4 8 2-4h12" stroke="green"/>
      <text x="12" y="14" font-size="6" fill="currentColor" stroke="none">PEA</text>
      <path d="M32 52l-4 4h8l-4-4z" fill="red" opacity="0.5"/>
      <text x="26" y="60" font-size="4" fill="red" stroke="none">No Pulse</text>
    </svg>`
  },
  {
    id: 'em-sinus-brady',
    name: 'Symptomatic Bradycardia',
    domain: 'medicine',
    category: 'acls-rhythm',
    tags: ['bradycardia', 'sinus', 'slow', 'symptomatic', 'atropine', 'pacing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2"/>
      <path d="M12 32h8l2-6 4 12 2-6h24" stroke="blue"/>
      <text x="12" y="14" font-size="5" fill="blue" stroke="none">Brady</text>
      <text x="40" y="54" font-size="5" fill="currentColor" stroke="none">35bpm</text>
      <circle cx="48" cy="12" r="4"/>
      <path d="M46 12h4"/>
    </svg>`
  },
];

export default emergencyIcons;
