/**
 * Dermatology Icon Library
 * Comprehensive SVG icons for dermatologic medicine
 *
 * Categories:
 * - Skin Anatomy (epidermis, dermis, subcutis, appendages)
 * - Lesion Morphology (primary and secondary lesions)
 * - Inflammatory Conditions (eczema, psoriasis, acne, rosacea)
 * - Infectious Diseases (fungal, bacterial, viral)
 * - Skin Cancers & Precancers
 * - Diagnostic Equipment
 * - Procedures & Treatments
 * - Wound Healing & Grafts
 *
 * Total: 95 icons
 */

import type { IconDefinition } from './index';

export const dermatologyIcons: IconDefinition[] = [
  // ===========================================================================
  // SKIN ANATOMY - Layers & Structures
  // ===========================================================================
  {
    id: 'derm-skin-layers',
    name: 'Skin Layers Cross-Section',
    domain: 'medicine',
    category: 'skin-anatomy',
    tags: ['skin', 'layers', 'epidermis', 'dermis', 'subcutis', 'anatomy', 'cross-section'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="56" height="8" fill="currentColor" opacity="0.3"/>
      <rect x="4" y="16" width="56" height="20" fill="currentColor" opacity="0.2"/>
      <rect x="4" y="36" width="56" height="20" fill="currentColor" opacity="0.1"/>
      <line x1="4" y1="16" x2="60" y2="16"/>
      <line x1="4" y1="36" x2="60" y2="36"/>
      <text x="6" y="14" font-size="4" fill="currentColor" stroke="none">Epidermis</text>
      <text x="6" y="28" font-size="4" fill="currentColor" stroke="none">Dermis</text>
      <text x="6" y="48" font-size="4" fill="currentColor" stroke="none">Subcutis</text>
    </svg>`
  },
  {
    id: 'derm-epidermis',
    name: 'Epidermis Structure',
    domain: 'medicine',
    category: 'skin-anatomy',
    tags: ['epidermis', 'stratum', 'keratinocytes', 'outer layer', 'skin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="6" rx="1" fill="currentColor" opacity="0.4"/>
      <rect x="8" y="16" width="48" height="8" rx="1" fill="currentColor" opacity="0.3"/>
      <rect x="8" y="26" width="48" height="8" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="36" width="48" height="8" rx="1" fill="currentColor" opacity="0.15"/>
      <rect x="8" y="46" width="48" height="10" rx="1" fill="currentColor" opacity="0.1"/>
      <text x="10" y="12" font-size="3" fill="currentColor" stroke="none">Corneum</text>
      <text x="10" y="21" font-size="3" fill="currentColor" stroke="none">Granulosum</text>
      <text x="10" y="31" font-size="3" fill="currentColor" stroke="none">Spinosum</text>
      <text x="10" y="41" font-size="3" fill="currentColor" stroke="none">Basale</text>
    </svg>`
  },
  {
    id: 'derm-dermis',
    name: 'Dermis Structure',
    domain: 'medicine',
    category: 'skin-anatomy',
    tags: ['dermis', 'collagen', 'elastin', 'fibroblasts', 'connective tissue'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2" fill="currentColor" opacity="0.15"/>
      <path d="M12 20c8-4 16 4 24 0s12 4 20 0" stroke-dasharray="2 1"/>
      <path d="M12 32c8-4 16 4 24 0s12 4 20 0" stroke-dasharray="2 1"/>
      <path d="M12 44c8-4 16 4 24 0s12 4 20 0" stroke-dasharray="2 1"/>
      <circle cx="20" cy="26" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="40" cy="38" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="30" cy="48" r="2" fill="currentColor" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'derm-subcutis',
    name: 'Subcutaneous Tissue',
    domain: 'medicine',
    category: 'skin-anatomy',
    tags: ['subcutis', 'hypodermis', 'adipose', 'fat', 'subcutaneous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2" fill="currentColor" opacity="0.1"/>
      <circle cx="20" cy="20" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="36" cy="18" r="5" fill="currentColor" opacity="0.2"/>
      <circle cx="48" cy="24" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="16" cy="34" r="5" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="48" cy="38" r="5" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="48" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="42" cy="50" r="5" fill="currentColor" opacity="0.2"/>
    </svg>`
  },
  {
    id: 'derm-hair-follicle',
    name: 'Hair Follicle',
    domain: 'medicine',
    category: 'skin-anatomy',
    tags: ['hair', 'follicle', 'bulb', 'papilla', 'shaft', 'appendage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v20"/>
      <path d="M28 24h8v8c0 16-2 24-4 28-2-4-4-12-4-28v-8z" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="56" rx="6" ry="4" fill="currentColor" opacity="0.3"/>
      <path d="M26 36c-4 2-6 4-6 8"/>
      <path d="M38 36c4 2 6 4 6 8"/>
      <circle cx="32" cy="54" r="2" fill="currentColor" opacity="0.5"/>
      <text x="8" y="44" font-size="4" fill="currentColor" stroke="none">Bulb</text>
    </svg>`
  },
  {
    id: 'derm-sebaceous-gland',
    name: 'Sebaceous Gland',
    domain: 'medicine',
    category: 'skin-anatomy',
    tags: ['sebaceous', 'gland', 'sebum', 'oil', 'pilosebaceous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v16"/>
      <ellipse cx="22" cy="32" rx="10" ry="8" fill="currentColor" opacity="0.25"/>
      <ellipse cx="42" cy="32" rx="10" ry="8" fill="currentColor" opacity="0.25"/>
      <path d="M22 24c-2 2-2 6 0 8"/>
      <path d="M42 24c2 2 2 6 0 8"/>
      <path d="M28 28l4-4"/>
      <path d="M36 28l-4-4"/>
      <circle cx="18" cy="32" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="26" cy="34" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="38" cy="34" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="46" cy="32" r="2" fill="currentColor" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'derm-sweat-gland-eccrine',
    name: 'Eccrine Sweat Gland',
    domain: 'medicine',
    category: 'skin-anatomy',
    tags: ['sweat', 'eccrine', 'gland', 'thermoregulation', 'perspiration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v12"/>
      <path d="M32 20c0 4-8 8-8 16s4 12 4 16"/>
      <path d="M28 52c4 4 8 0 8-4s-4-8-4-16c0-8 8-12 8-16"/>
      <ellipse cx="28" cy="50" rx="4" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="36" cy="48" rx="4" ry="6" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="6" r="2" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'derm-sweat-gland-apocrine',
    name: 'Apocrine Sweat Gland',
    domain: 'medicine',
    category: 'skin-anatomy',
    tags: ['sweat', 'apocrine', 'gland', 'axilla', 'odor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v8"/>
      <path d="M32 16c-4 4-8 8-8 16"/>
      <ellipse cx="24" cy="40" rx="8" ry="12" fill="currentColor" opacity="0.2"/>
      <ellipse cx="40" cy="42" rx="8" ry="10" fill="currentColor" opacity="0.2"/>
      <path d="M24 28c4 4 8 8 16 8"/>
      <circle cx="20" cy="44" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="28" cy="38" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="36" cy="46" r="2" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'derm-melanocyte',
    name: 'Melanocyte',
    domain: 'medicine',
    category: 'skin-anatomy',
    tags: ['melanocyte', 'melanin', 'pigment', 'UV protection', 'dendrites'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="10" fill="currentColor" opacity="0.3"/>
      <path d="M22 28l-8-4"/>
      <path d="M22 36l-10 6"/>
      <path d="M42 28l8-4"/>
      <path d="M42 36l10 6"/>
      <path d="M28 22l-2-10"/>
      <path d="M36 22l2-10"/>
      <path d="M28 42l-4 12"/>
      <path d="M36 42l4 12"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'derm-keratinocyte',
    name: 'Keratinocyte',
    domain: 'medicine',
    category: 'skin-anatomy',
    tags: ['keratinocyte', 'keratin', 'epidermis', 'barrier', 'cell'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,8 52,24 52,44 32,56 12,44 12,24" fill="currentColor" opacity="0.2"/>
      <polygon points="32,8 52,24 52,44 32,56 12,44 12,24"/>
      <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.3"/>
      <path d="M26 26c4-2 8-2 12 0"/>
      <path d="M26 38c4 2 8 2 12 0"/>
    </svg>`
  },

  // ===========================================================================
  // PRIMARY LESION MORPHOLOGY
  // ===========================================================================
  {
    id: 'derm-macule',
    name: 'Macule',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['macule', 'flat', 'lesion', '<1cm', 'color change', 'primary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="16" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="12" ry="3" fill="currentColor" opacity="0.4"/>
      <line x1="8" y1="32" x2="20" y2="32" stroke-dasharray="2 2"/>
      <line x1="44" y1="32" x2="56" y2="32" stroke-dasharray="2 2"/>
      <text x="24" y="50" font-size="5" fill="currentColor" stroke="none">Flat</text>
    </svg>`
  },
  {
    id: 'derm-patch',
    name: 'Patch',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['patch', 'flat', 'lesion', '>1cm', 'color change', 'primary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="56" height="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="4" fill="currentColor" opacity="0.4"/>
      <line x1="4" y1="32" x2="8" y2="32" stroke-dasharray="2 2"/>
      <line x1="56" y1="32" x2="60" y2="32" stroke-dasharray="2 2"/>
      <text x="20" y="52" font-size="5" fill="currentColor" stroke="none">Flat >1cm</text>
    </svg>`
  },
  {
    id: 'derm-papule',
    name: 'Papule',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['papule', 'raised', 'solid', '<1cm', 'elevated', 'primary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="44" x2="56" y2="44"/>
      <ellipse cx="32" cy="36" rx="10" ry="12" fill="currentColor" opacity="0.3"/>
      <path d="M22 44c0-8 4-16 10-18"/>
      <path d="M42 44c0-8-4-16-10-18"/>
      <text x="22" y="56" font-size="5" fill="currentColor" stroke="none">Raised</text>
    </svg>`
  },
  {
    id: 'derm-plaque',
    name: 'Plaque',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['plaque', 'raised', 'flat-topped', '>1cm', 'elevated', 'primary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="44" x2="60" y2="44"/>
      <rect x="12" y="28" width="40" height="16" rx="4" fill="currentColor" opacity="0.3"/>
      <path d="M12 44v-12c0-2 2-4 4-4h32c2 0 4 2 4 4v12"/>
      <text x="16" y="56" font-size="5" fill="currentColor" stroke="none">Flat-topped</text>
    </svg>`
  },
  {
    id: 'derm-nodule',
    name: 'Nodule',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['nodule', 'raised', 'solid', 'deep', '>1cm', 'primary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="36" x2="56" y2="36"/>
      <circle cx="32" cy="36" r="16" fill="currentColor" opacity="0.25"/>
      <path d="M16 36c0-12 8-20 16-20s16 8 16 20"/>
      <line x1="32" y1="36" x2="32" y2="52" stroke-dasharray="2 2"/>
      <text x="22" y="58" font-size="5" fill="currentColor" stroke="none">Deep</text>
    </svg>`
  },
  {
    id: 'derm-tumor',
    name: 'Tumor',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['tumor', 'large', 'nodule', '>2cm', 'mass', 'primary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="40" x2="60" y2="40"/>
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="currentColor" opacity="0.25"/>
      <path d="M8 40c0-16 10-28 24-28s24 12 24 28"/>
      <text x="20" y="56" font-size="5" fill="currentColor" stroke="none">>2cm</text>
    </svg>`
  },
  {
    id: 'derm-vesicle',
    name: 'Vesicle',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['vesicle', 'blister', 'fluid', '<1cm', 'clear', 'primary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="44" x2="56" y2="44"/>
      <ellipse cx="32" cy="32" rx="12" ry="14" fill="currentColor" opacity="0.15"/>
      <ellipse cx="32" cy="32" rx="12" ry="14"/>
      <ellipse cx="32" cy="36" rx="8" ry="6" fill="currentColor" opacity="0.1"/>
      <path d="M28 28l-2-4"/>
      <text x="18" y="56" font-size="5" fill="currentColor" stroke="none">Fluid-filled</text>
    </svg>`
  },
  {
    id: 'derm-bulla',
    name: 'Bulla',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['bulla', 'blister', 'fluid', '>1cm', 'large', 'primary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="44" x2="60" y2="44"/>
      <ellipse cx="32" cy="28" rx="22" ry="18" fill="currentColor" opacity="0.15"/>
      <ellipse cx="32" cy="28" rx="22" ry="18"/>
      <ellipse cx="32" cy="34" rx="14" ry="8" fill="currentColor" opacity="0.1"/>
      <path d="M24 22l-4-6"/>
      <text x="16" y="56" font-size="5" fill="currentColor" stroke="none">Large blister</text>
    </svg>`
  },
  {
    id: 'derm-pustule',
    name: 'Pustule',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['pustule', 'pus', 'purulent', 'infected', 'primary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="44" x2="56" y2="44"/>
      <ellipse cx="32" cy="32" rx="12" ry="14" fill="currentColor" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="12" ry="14"/>
      <ellipse cx="32" cy="28" rx="6" ry="4" fill="currentColor" opacity="0.5"/>
      <text x="18" y="56" font-size="5" fill="currentColor" stroke="none">Pus-filled</text>
    </svg>`
  },
  {
    id: 'derm-wheal',
    name: 'Wheal (Hive)',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['wheal', 'hive', 'urticaria', 'transient', 'edema', 'primary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="44" x2="60" y2="44"/>
      <ellipse cx="32" cy="36" rx="20" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="36" rx="20" ry="10"/>
      <path d="M20 36c4-4 8-4 12-2s8 2 12-2" stroke-dasharray="2 2"/>
      <text x="16" y="56" font-size="5" fill="currentColor" stroke="none">Transient</text>
    </svg>`
  },
  {
    id: 'derm-cyst',
    name: 'Cyst',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['cyst', 'sac', 'encapsulated', 'fluid', 'primary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="36" x2="56" y2="36"/>
      <circle cx="32" cy="36" r="18" fill="currentColor" opacity="0.15"/>
      <circle cx="32" cy="36" r="18"/>
      <circle cx="32" cy="36" r="12" fill="currentColor" opacity="0.1" stroke-dasharray="2 2"/>
      <text x="16" y="58" font-size="5" fill="currentColor" stroke="none">Encapsulated</text>
    </svg>`
  },
  {
    id: 'derm-comedone',
    name: 'Comedone',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['comedone', 'blackhead', 'whitehead', 'acne', 'plugged follicle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="28" x2="56" y2="28"/>
      <path d="M26 28v-4c0-2 2-4 6-4s6 2 6 4v4"/>
      <ellipse cx="32" cy="40" rx="8" ry="12" fill="currentColor" opacity="0.25"/>
      <circle cx="32" cy="24" r="3" fill="currentColor" opacity="0.6"/>
      <text x="14" y="58" font-size="5" fill="currentColor" stroke="none">Plugged pore</text>
    </svg>`
  },

  // ===========================================================================
  // SECONDARY LESION MORPHOLOGY
  // ===========================================================================
  {
    id: 'derm-scale',
    name: 'Scale',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['scale', 'flaking', 'keratin', 'desquamation', 'secondary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="40" x2="56" y2="40"/>
      <path d="M16 40c0-2 4-4 8-4s8-4 8-4s4 4 8 4s8 2 8 4"/>
      <path d="M20 36l-4-4"/>
      <path d="M32 32l-2-6"/>
      <path d="M44 36l4-4"/>
      <path d="M26 38l2-8"/>
      <path d="M38 38l-2-8"/>
    </svg>`
  },
  {
    id: 'derm-crust',
    name: 'Crust (Scab)',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['crust', 'scab', 'dried exudate', 'secondary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="40" x2="56" y2="40"/>
      <path d="M16 40c2-8 8-12 16-12s14 4 16 12" fill="currentColor" opacity="0.4"/>
      <path d="M18 34c4-2 8-2 12 0"/>
      <path d="M34 32c4-2 8-2 12 0"/>
      <path d="M24 38c2-2 6-2 8 0"/>
    </svg>`
  },
  {
    id: 'derm-erosion',
    name: 'Erosion',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['erosion', 'superficial', 'epidermal loss', 'secondary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="28" width="48" height="8" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="36" width="48" height="16" fill="currentColor" opacity="0.15"/>
      <path d="M20 28v8c0 4 6 4 12 4s12 0 12-4v-8"/>
      <line x1="20" y1="28" x2="44" y2="28" stroke-dasharray="2 2"/>
      <text x="10" y="56" font-size="4" fill="currentColor" stroke="none">Superficial</text>
    </svg>`
  },
  {
    id: 'derm-ulcer',
    name: 'Ulcer',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['ulcer', 'deep', 'dermal loss', 'wound', 'secondary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="8" fill="currentColor" opacity="0.3"/>
      <rect x="8" y="24" width="48" height="16" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="40" width="48" height="12" fill="currentColor" opacity="0.1"/>
      <path d="M18 16v24c0 4 6 8 14 8s14-4 14-8v-24"/>
      <ellipse cx="32" cy="40" rx="10" ry="4" fill="currentColor" opacity="0.15"/>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Deep</text>
    </svg>`
  },
  {
    id: 'derm-fissure',
    name: 'Fissure',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['fissure', 'crack', 'linear', 'split', 'secondary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" fill="currentColor" opacity="0.15"/>
      <path d="M32 16v32" stroke-width="2"/>
      <path d="M28 20l4 4l-4 4l4 4l-4 4l4 4l-4 4l4 4"/>
      <path d="M36 20l-4 4l4 4l-4 4l4 4l-4 4l4 4l-4 4"/>
    </svg>`
  },
  {
    id: 'derm-excoriation',
    name: 'Excoriation',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['excoriation', 'scratch', 'abrasion', 'secondary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="16" fill="currentColor" opacity="0.15"/>
      <path d="M16 28l8 8"/>
      <path d="M24 26l8 10"/>
      <path d="M32 28l8 8"/>
      <path d="M40 26l8 10"/>
      <path d="M20 32l6 4"/>
      <path d="M36 32l6 4"/>
    </svg>`
  },
  {
    id: 'derm-lichenification',
    name: 'Lichenification',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['lichenification', 'thickened', 'chronic rubbing', 'secondary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="24" width="40" height="20" rx="4" fill="currentColor" opacity="0.25"/>
      <line x1="16" y1="28" x2="48" y2="28"/>
      <line x1="16" y1="32" x2="48" y2="32"/>
      <line x1="16" y1="36" x2="48" y2="36"/>
      <line x1="16" y1="40" x2="48" y2="40"/>
      <line x1="20" y1="24" x2="20" y2="44"/>
      <line x1="28" y1="24" x2="28" y2="44"/>
      <line x1="36" y1="24" x2="36" y2="44"/>
      <line x1="44" y1="24" x2="44" y2="44"/>
    </svg>`
  },
  {
    id: 'derm-atrophy',
    name: 'Atrophy',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['atrophy', 'thinning', 'depression', 'secondary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="20" y2="32"/>
      <line x1="44" y1="32" x2="56" y2="32"/>
      <path d="M20 32c4 8 8 12 12 12s8-4 12-12" fill="currentColor" opacity="0.1"/>
      <path d="M20 32c4 8 8 12 12 12s8-4 12-12"/>
      <line x1="32" y1="32" x2="32" y2="44" stroke-dasharray="2 2"/>
      <text x="18" y="56" font-size="4" fill="currentColor" stroke="none">Depressed</text>
    </svg>`
  },
  {
    id: 'derm-scar',
    name: 'Scar',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['scar', 'cicatrix', 'fibrosis', 'healing', 'secondary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="56" y2="32"/>
      <path d="M24 24c4 4 8 4 12 4" stroke-width="2"/>
      <path d="M28 28c2 2 4 2 8 0" stroke-width="2"/>
      <path d="M24 36c4-2 8-2 12 2"/>
      <path d="M26 40c2-2 6-2 10 0"/>
      <rect x="22" y="28" width="20" height="10" fill="currentColor" opacity="0.15"/>
    </svg>`
  },
  {
    id: 'derm-keloid',
    name: 'Keloid',
    domain: 'medicine',
    category: 'lesion-morphology',
    tags: ['keloid', 'hypertrophic', 'overgrown scar', 'secondary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="44" x2="56" y2="44"/>
      <ellipse cx="32" cy="32" rx="18" ry="14" fill="currentColor" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="18" ry="14"/>
      <path d="M20 32c8-4 16-4 24 0"/>
      <path d="M24 36c4-2 8-2 12 0"/>
      <text x="14" y="56" font-size="4" fill="currentColor" stroke="none">Raised beyond</text>
    </svg>`
  },

  // ===========================================================================
  // INFLAMMATORY CONDITIONS
  // ===========================================================================
  {
    id: 'derm-eczema',
    name: 'Eczema (Atopic Dermatitis)',
    domain: 'medicine',
    category: 'inflammatory',
    tags: ['eczema', 'atopic dermatitis', 'inflammation', 'itchy', 'dry'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="22" ry="18" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="22" ry="18"/>
      <path d="M16 28c4 2 8 0 12 2s8-2 12 0"/>
      <path d="M18 36c4-2 8 2 12 0s8 2 10 0"/>
      <circle cx="24" cy="32" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="38" cy="30" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="32" cy="38" r="2" fill="currentColor" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'derm-psoriasis-plaque',
    name: 'Psoriasis Plaque',
    domain: 'medicine',
    category: 'inflammatory',
    tags: ['psoriasis', 'plaque', 'silvery scale', 'erythema', 'autoimmune'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="28" rx="6" fill="currentColor" opacity="0.35"/>
      <rect x="12" y="20" width="40" height="28" rx="6"/>
      <path d="M16 26h32"/>
      <path d="M18 32h28"/>
      <path d="M16 38h32"/>
      <path d="M20 44h24"/>
      <text x="16" y="56" font-size="3" fill="currentColor" stroke="none">Silvery scale</text>
    </svg>`
  },
  {
    id: 'derm-acne-vulgaris',
    name: 'Acne Vulgaris',
    domain: 'medicine',
    category: 'inflammatory',
    tags: ['acne', 'comedone', 'papule', 'pustule', 'inflammatory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="20" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="16" r="3"/>
      <circle cx="48" cy="22" r="5" fill="currentColor" opacity="0.3"/>
      <circle cx="24" cy="36" r="4" fill="currentColor" opacity="0.4"/>
      <circle cx="20" cy="36" r="2" fill="currentColor"/>
      <circle cx="44" cy="32" r="3"/>
      <circle cx="36" cy="44" r="5" fill="currentColor" opacity="0.35"/>
      <circle cx="36" cy="44" r="2" fill="currentColor" opacity="0.6"/>
      <circle cx="52" cy="44" r="3" fill="currentColor" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'derm-rosacea',
    name: 'Rosacea',
    domain: 'medicine',
    category: 'inflammatory',
    tags: ['rosacea', 'flushing', 'telangiectasia', 'papulopustular', 'facial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="20" ry="16" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.3"/>
      <path d="M24 28c2-4 4-4 8-4s6 2 8 4"/>
      <path d="M20 36l4 2"/>
      <path d="M44 36l-4 2"/>
      <line x1="28" y1="32" x2="26" y2="36"/>
      <line x1="36" y1="32" x2="38" y2="36"/>
      <line x1="32" y1="34" x2="32" y2="40"/>
      <circle cx="28" cy="40" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="36" cy="42" r="2" fill="currentColor" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'derm-contact-dermatitis',
    name: 'Contact Dermatitis',
    domain: 'medicine',
    category: 'inflammatory',
    tags: ['contact', 'dermatitis', 'allergic', 'irritant', 'vesicular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 24c8-4 16 4 24-2s12 6 16 2v24c-4-4-8 2-16-2s-16 6-24 2z" fill="currentColor" opacity="0.2"/>
      <circle cx="20" cy="32" r="4" fill="currentColor" opacity="0.15"/>
      <circle cx="32" cy="28" r="3" fill="currentColor" opacity="0.15"/>
      <circle cx="44" cy="34" r="5" fill="currentColor" opacity="0.15"/>
      <circle cx="28" cy="40" r="3" fill="currentColor" opacity="0.15"/>
      <path d="M16 20l4 4"/>
      <path d="M48 22l-4 4"/>
    </svg>`
  },
  {
    id: 'derm-seborrheic-dermatitis',
    name: 'Seborrheic Dermatitis',
    domain: 'medicine',
    category: 'inflammatory',
    tags: ['seborrheic', 'dermatitis', 'greasy scale', 'scalp', 'nasolabial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="currentColor" opacity="0.2"/>
      <path d="M16 28c4 2 8-2 12 0s8 2 12 0s8-2 8 2"/>
      <path d="M18 36c4-2 8 2 12 0s8-2 12 2"/>
      <ellipse cx="32" cy="32" rx="8" ry="6" fill="currentColor" opacity="0.25"/>
    </svg>`
  },
  {
    id: 'derm-lichen-planus',
    name: 'Lichen Planus',
    domain: 'medicine',
    category: 'inflammatory',
    tags: ['lichen planus', 'purple', 'polygonal', 'pruritic', 'Wickham striae'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="16,28 24,20 36,22 44,28 40,40 28,44 18,38" fill="currentColor" opacity="0.35"/>
      <polygon points="16,28 24,20 36,22 44,28 40,40 28,44 18,38"/>
      <line x1="20" y1="28" x2="36" y2="26"/>
      <line x1="22" y1="34" x2="38" y2="32"/>
      <line x1="24" y1="40" x2="36" y2="38"/>
      <text x="12" y="56" font-size="3" fill="currentColor" stroke="none">Wickham striae</text>
    </svg>`
  },
  {
    id: 'derm-urticaria',
    name: 'Urticaria (Hives)',
    domain: 'medicine',
    category: 'inflammatory',
    tags: ['urticaria', 'hives', 'wheal', 'allergic', 'histamine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="24" rx="12" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="44" cy="20" rx="10" ry="5" fill="currentColor" opacity="0.2"/>
      <ellipse cx="28" cy="40" rx="14" ry="7" fill="currentColor" opacity="0.2"/>
      <ellipse cx="48" cy="44" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="20" cy="24" rx="12" ry="6"/>
      <ellipse cx="44" cy="20" rx="10" ry="5"/>
      <ellipse cx="28" cy="40" rx="14" ry="7"/>
      <ellipse cx="48" cy="44" rx="8" ry="4"/>
    </svg>`
  },

  // ===========================================================================
  // INFECTIOUS DISEASES
  // ===========================================================================
  {
    id: 'derm-tinea-corporis',
    name: 'Tinea Corporis (Ringworm)',
    domain: 'medicine',
    category: 'infectious',
    tags: ['tinea', 'ringworm', 'fungal', 'dermatophyte', 'annular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="14" stroke-dasharray="4 2"/>
      <path d="M16 24c4 2 6-2 8 0"/>
      <path d="M40 24c4-2 6 2 8 0"/>
      <path d="M18 40c2-2 4 2 6 0"/>
      <path d="M40 42c2 2 4-2 6 0"/>
      <text x="16" y="56" font-size="4" fill="currentColor" stroke="none">Central clearing</text>
    </svg>`
  },
  {
    id: 'derm-tinea-pedis',
    name: 'Tinea Pedis (Athlete Foot)',
    domain: 'medicine',
    category: 'infectious',
    tags: ['tinea pedis', 'athlete foot', 'fungal', 'interdigital', 'maceration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="16" ry="12" fill="currentColor" opacity="0.2"/>
      <ellipse cx="18" cy="20" rx="4" ry="8"/>
      <ellipse cx="26" cy="16" rx="4" ry="10"/>
      <ellipse cx="34" cy="16" rx="4" ry="10"/>
      <ellipse cx="42" cy="18" rx="4" ry="8"/>
      <ellipse cx="48" cy="24" rx="3" ry="6"/>
      <path d="M22 24c0 4-4 8-4 16"/>
      <path d="M30 22c0 4 0 8-2 14"/>
      <path d="M38 22c0 4 0 8 2 14"/>
    </svg>`
  },
  {
    id: 'derm-onychomycosis',
    name: 'Onychomycosis',
    domain: 'medicine',
    category: 'infectious',
    tags: ['onychomycosis', 'nail fungus', 'tinea unguium', 'dystrophic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="12" width="32" height="44" rx="8" fill="currentColor" opacity="0.15"/>
      <rect x="16" y="12" width="32" height="44" rx="8"/>
      <path d="M20 48c4-8 8-16 12-20s8-4 12 4" fill="currentColor" opacity="0.3"/>
      <path d="M22 52c2-4 4-8 6-10"/>
      <path d="M36 44c2-4 4-4 6 0"/>
      <path d="M28 40l4-8"/>
    </svg>`
  },
  {
    id: 'derm-impetigo',
    name: 'Impetigo',
    domain: 'medicine',
    category: 'infectious',
    tags: ['impetigo', 'bacterial', 'staph', 'strep', 'honey-crust'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="18" ry="14" fill="currentColor" opacity="0.3"/>
      <path d="M18 28c4-4 12-2 16-4s8 2 12 4"/>
      <path d="M20 36c4 2 8-2 12 0s8 2 12 0"/>
      <circle cx="24" cy="32" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="38" cy="30" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="38" r="3" fill="currentColor" opacity="0.5"/>
      <text x="10" y="54" font-size="3" fill="currentColor" stroke="none">Honey-colored crust</text>
    </svg>`
  },
  {
    id: 'derm-cellulitis',
    name: 'Cellulitis',
    domain: 'medicine',
    category: 'infectious',
    tags: ['cellulitis', 'bacterial', 'erythema', 'warmth', 'swelling'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="currentColor" opacity="0.25"/>
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <path d="M12 32c8-8 16 0 24-4s12 8 16 4" stroke-dasharray="2 2"/>
      <path d="M16 40c6 4 12-2 16 2s10-2 16 0"/>
      <circle cx="28" cy="28" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="38" cy="34" r="2" fill="currentColor" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'derm-herpes-simplex',
    name: 'Herpes Simplex',
    domain: 'medicine',
    category: 'infectious',
    tags: ['herpes', 'HSV', 'vesicle', 'cold sore', 'viral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="12" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="28" r="4" fill="currentColor" opacity="0.15"/>
      <circle cx="34" cy="26" r="3" fill="currentColor" opacity="0.15"/>
      <circle cx="40" cy="32" r="4" fill="currentColor" opacity="0.15"/>
      <circle cx="28" cy="36" r="3" fill="currentColor" opacity="0.15"/>
      <circle cx="36" cy="38" r="4" fill="currentColor" opacity="0.15"/>
      <circle cx="24" cy="28" r="4"/>
      <circle cx="34" cy="26" r="3"/>
      <circle cx="40" cy="32" r="4"/>
      <circle cx="28" cy="36" r="3"/>
      <circle cx="36" cy="38" r="4"/>
    </svg>`
  },
  {
    id: 'derm-herpes-zoster',
    name: 'Herpes Zoster (Shingles)',
    domain: 'medicine',
    category: 'infectious',
    tags: ['herpes zoster', 'shingles', 'VZV', 'dermatomal', 'vesicles'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c16-8 32-8 48 0" fill="currentColor" opacity="0.15"/>
      <line x1="8" y1="24" x2="56" y2="24" stroke-dasharray="4 2"/>
      <line x1="8" y1="40" x2="56" y2="40" stroke-dasharray="4 2"/>
      <circle cx="16" cy="32" r="3" fill="currentColor" opacity="0.2"/>
      <circle cx="26" cy="30" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="38" cy="28" r="3" fill="currentColor" opacity="0.2"/>
      <circle cx="48" cy="32" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="34" r="3" fill="currentColor" opacity="0.2"/>
      <text x="12" y="52" font-size="4" fill="currentColor" stroke="none">Dermatomal</text>
    </svg>`
  },
  {
    id: 'derm-verruca',
    name: 'Verruca (Wart)',
    domain: 'medicine',
    category: 'infectious',
    tags: ['verruca', 'wart', 'HPV', 'papilloma', 'viral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="44" x2="56" y2="44"/>
      <path d="M20 44c0-4 2-8 4-12c2-4 4-8 8-10c4 2 6 6 8 10c2 4 4 8 4 12" fill="currentColor" opacity="0.3"/>
      <path d="M24 32c2 0 4-4 8-4s6 4 8 4"/>
      <path d="M26 36c2-2 4-2 6-2s4 2 6 2"/>
      <circle cx="28" cy="28" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="36" cy="30" r="2" fill="currentColor" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'derm-molluscum',
    name: 'Molluscum Contagiosum',
    domain: 'medicine',
    category: 'infectious',
    tags: ['molluscum', 'poxvirus', 'umbilicated', 'papule', 'viral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="24" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="44" cy="28" r="7" fill="currentColor" opacity="0.2"/>
      <circle cx="28" cy="44" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="20" cy="24" r="6"/>
      <circle cx="44" cy="28" r="7"/>
      <circle cx="28" cy="44" r="8"/>
      <circle cx="20" cy="24" r="2"/>
      <circle cx="44" cy="28" r="2"/>
      <circle cx="28" cy="44" r="2"/>
      <text x="40" y="52" font-size="4" fill="currentColor" stroke="none">Umbilicated</text>
    </svg>`
  },
  {
    id: 'derm-scabies',
    name: 'Scabies',
    domain: 'medicine',
    category: 'infectious',
    tags: ['scabies', 'mite', 'burrow', 'pruritus', 'infestation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 28c8 4 16-4 24 2s12-4 16 2" stroke-dasharray="4 2"/>
      <path d="M16 40c6-2 12 4 16-2s10 4 14 0" stroke-dasharray="4 2"/>
      <circle cx="16" cy="32" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="36" cy="28" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="24" cy="44" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="48" cy="36" r="3" fill="currentColor" opacity="0.3"/>
      <ellipse cx="32" cy="20" rx="4" ry="2"/>
      <text x="16" y="56" font-size="4" fill="currentColor" stroke="none">Burrows</text>
    </svg>`
  },

  // ===========================================================================
  // SKIN CANCERS & PRECANCERS
  // ===========================================================================
  {
    id: 'derm-melanoma',
    name: 'Melanoma',
    domain: 'medicine',
    category: 'skin-cancer',
    tags: ['melanoma', 'malignant', 'pigmented', 'ABCDE', 'nevus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 28c4-8 12-12 20-8s12 8 12 16s-4 12-12 14s-16-2-20-10s-4-8 0-12z" fill="currentColor" opacity="0.5"/>
      <path d="M16 28c4-8 12-12 20-8s12 8 12 16s-4 12-12 14s-16-2-20-10s-4-8 0-12z"/>
      <circle cx="28" cy="32" r="3" fill="currentColor" opacity="0.7"/>
      <circle cx="38" cy="36" r="4" fill="currentColor" opacity="0.6"/>
      <circle cx="32" cy="42" r="2" fill="currentColor" opacity="0.8"/>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">Irregular borders, color variation</text>
    </svg>`
  },
  {
    id: 'derm-basal-cell-carcinoma',
    name: 'Basal Cell Carcinoma',
    domain: 'medicine',
    category: 'skin-cancer',
    tags: ['BCC', 'basal cell', 'pearly', 'telangiectasia', 'rodent ulcer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="14" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="16" ry="14"/>
      <path d="M20 28c4-2 8 2 12 0s8-2 12 2"/>
      <ellipse cx="32" cy="34" rx="8" ry="6" fill="currentColor" opacity="0.15"/>
      <line x1="22" y1="32" x2="18" y2="28"/>
      <line x1="28" y1="28" x2="26" y2="24"/>
      <line x1="36" y1="28" x2="38" y2="24"/>
      <line x1="42" y1="32" x2="46" y2="28"/>
      <text x="8" y="54" font-size="3" fill="currentColor" stroke="none">Pearly, telangiectasia</text>
    </svg>`
  },
  {
    id: 'derm-squamous-cell-carcinoma',
    name: 'Squamous Cell Carcinoma',
    domain: 'medicine',
    category: 'skin-cancer',
    tags: ['SCC', 'squamous cell', 'keratotic', 'indurated', 'malignant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 36c0-8 6-16 16-16s16 8 16 16c0 4-4 12-16 12s-16-8-16-12z" fill="currentColor" opacity="0.3"/>
      <path d="M16 36c0-8 6-16 16-16s16 8 16 16c0 4-4 12-16 12s-16-8-16-12z"/>
      <path d="M24 28c4-4 8-2 12-4" fill="currentColor" opacity="0.5"/>
      <path d="M20 36c4 2 8-2 12 0s8 2 12 0"/>
      <ellipse cx="32" cy="32" rx="6" ry="4" fill="currentColor" opacity="0.4"/>
      <text x="10" y="56" font-size="3" fill="currentColor" stroke="none">Indurated, keratotic</text>
    </svg>`
  },
  {
    id: 'derm-actinic-keratosis',
    name: 'Actinic Keratosis',
    domain: 'medicine',
    category: 'skin-cancer',
    tags: ['actinic keratosis', 'solar keratosis', 'precancer', 'rough', 'scaly'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="14" ry="10" fill="currentColor" opacity="0.25"/>
      <ellipse cx="32" cy="36" rx="14" ry="10"/>
      <path d="M22 32l4-4"/>
      <path d="M30 30l2-4"/>
      <path d="M38 32l4-6"/>
      <path d="M26 38l-2 4"/>
      <path d="M36 40l2 4"/>
      <text x="12" y="54" font-size="4" fill="currentColor" stroke="none">Sandpaper feel</text>
    </svg>`
  },
  {
    id: 'derm-dysplastic-nevus',
    name: 'Dysplastic Nevus',
    domain: 'medicine',
    category: 'skin-cancer',
    tags: ['dysplastic', 'atypical', 'nevus', 'mole', 'precursor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="18" ry="14" fill="currentColor" opacity="0.3"/>
      <path d="M14 32c2-6 8-12 18-12s16 6 18 12c-2 6-8 10-18 10s-16-4-18-10z"/>
      <ellipse cx="32" cy="32" rx="10" ry="8" fill="currentColor" opacity="0.4"/>
      <path d="M22 32c4-2 8 2 12 0s6-2 8 2" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'derm-keratoacanthoma',
    name: 'Keratoacanthoma',
    domain: 'medicine',
    category: 'skin-cancer',
    tags: ['keratoacanthoma', 'crater', 'keratin plug', 'rapid growth'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="44" x2="56" y2="44"/>
      <path d="M16 44c0-8 4-16 8-20c4 4 8 4 8 4s4 0 8-4c4 4 8 12 8 20" fill="currentColor" opacity="0.25"/>
      <ellipse cx="32" cy="28" rx="6" ry="8" fill="currentColor" opacity="0.5"/>
      <path d="M26 20c2-2 4-2 6-2s4 0 6 2"/>
      <text x="14" y="56" font-size="4" fill="currentColor" stroke="none">Keratin plug</text>
    </svg>`
  },

  // ===========================================================================
  // DIAGNOSTIC EQUIPMENT
  // ===========================================================================
  {
    id: 'derm-dermatoscope',
    name: 'Dermatoscope',
    domain: 'medicine',
    category: 'equipment',
    tags: ['dermatoscope', 'dermoscopy', 'magnification', 'pigmented lesion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="36" rx="4" fill="currentColor" opacity="0.15"/>
      <rect x="24" y="8" width="16" height="36" rx="4"/>
      <circle cx="32" cy="48" r="10"/>
      <circle cx="32" cy="48" r="6" fill="currentColor" opacity="0.2"/>
      <line x1="28" y1="16" x2="36" y2="16"/>
      <line x1="28" y1="22" x2="36" y2="22"/>
      <circle cx="32" cy="32" r="3"/>
    </svg>`
  },
  {
    id: 'derm-wood-lamp',
    name: 'Wood Lamp (UV Light)',
    domain: 'medicine',
    category: 'equipment',
    tags: ['Wood lamp', 'UV light', 'fluorescence', 'tinea', 'vitiligo'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="20" y="8" width="24" height="12" rx="2"/>
      <rect x="24" y="20" width="16" height="6" rx="1"/>
      <path d="M24 26l-8 20"/>
      <path d="M40 26l8 20"/>
      <path d="M28 26v24"/>
      <path d="M36 26v24"/>
      <ellipse cx="32" cy="54" rx="16" ry="4" fill="currentColor" opacity="0.15"/>
    </svg>`
  },
  {
    id: 'derm-patch-test',
    name: 'Patch Test Panel',
    domain: 'medicine',
    category: 'equipment',
    tags: ['patch test', 'allergy', 'contact dermatitis', 'allergen'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="12" width="48" height="40" rx="2"/>
      <circle cx="20" cy="24" r="4"/>
      <circle cx="32" cy="24" r="4"/>
      <circle cx="44" cy="24" r="4"/>
      <circle cx="20" cy="36" r="4"/>
      <circle cx="32" cy="36" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="36" r="4"/>
      <circle cx="20" cy="48" r="4"/>
      <circle cx="32" cy="48" r="4"/>
      <circle cx="44" cy="48" r="4" fill="currentColor" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'derm-skin-biopsy-punch',
    name: 'Punch Biopsy Tool',
    domain: 'medicine',
    category: 'equipment',
    tags: ['punch biopsy', 'biopsy tool', 'cylindrical', 'diagnostic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="26" y="8" width="12" height="28" rx="2" fill="currentColor" opacity="0.15"/>
      <rect x="26" y="8" width="12" height="28" rx="2"/>
      <circle cx="32" cy="44" r="8"/>
      <circle cx="32" cy="44" r="4" fill="currentColor" opacity="0.3"/>
      <line x1="28" y1="16" x2="36" y2="16"/>
      <line x1="28" y1="24" x2="36" y2="24"/>
      <path d="M28 52l-4 4"/>
      <path d="M36 52l4 4"/>
    </svg>`
  },
  {
    id: 'derm-magnifying-glass',
    name: 'Magnifying Glass',
    domain: 'medicine',
    category: 'equipment',
    tags: ['magnifying', 'examination', 'inspection', 'visual'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="28" cy="28" r="16" fill="currentColor" opacity="0.1"/>
      <circle cx="28" cy="28" r="16"/>
      <line x1="40" y1="40" x2="56" y2="56" stroke-width="3"/>
      <path d="M20 24c2-4 6-6 10-6"/>
    </svg>`
  },
  {
    id: 'derm-cryotherapy-gun',
    name: 'Cryotherapy Device',
    domain: 'medicine',
    category: 'equipment',
    tags: ['cryotherapy', 'liquid nitrogen', 'freezing', 'treatment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="24" height="24" rx="4" fill="currentColor" opacity="0.15"/>
      <rect x="12" y="20" width="24" height="24" rx="4"/>
      <path d="M36 28h12l4 8h-16"/>
      <path d="M52 36l4 8"/>
      <circle cx="24" cy="32" r="6"/>
      <path d="M24 26v12"/>
      <path d="M18 32h12"/>
      <path d="M20 28l8 8"/>
      <path d="M28 28l-8 8"/>
    </svg>`
  },

  // ===========================================================================
  // PROCEDURES & TREATMENTS
  // ===========================================================================
  {
    id: 'derm-excision',
    name: 'Surgical Excision',
    domain: 'medicine',
    category: 'procedures',
    tags: ['excision', 'surgery', 'removal', 'ellipse', 'margins'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="10" fill="currentColor" opacity="0.15"/>
      <ellipse cx="32" cy="32" rx="20" ry="10"/>
      <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.35"/>
      <path d="M12 32l-4-8"/>
      <path d="M12 32l-4 8"/>
      <path d="M52 32l4-8"/>
      <path d="M52 32l4 8"/>
      <line x1="32" y1="22" x2="32" y2="10" stroke-dasharray="2 2"/>
      <line x1="32" y1="42" x2="32" y2="54" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'derm-shave-biopsy',
    name: 'Shave Biopsy',
    domain: 'medicine',
    category: 'procedures',
    tags: ['shave', 'biopsy', 'tangential', 'superficial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="36" x2="56" y2="36"/>
      <ellipse cx="32" cy="32" rx="12" ry="8" fill="currentColor" opacity="0.3"/>
      <path d="M16 30h32" stroke-width="2"/>
      <path d="M12 24l8 6"/>
      <path d="M52 24l-8 6"/>
      <path d="M24 32c4-2 8-2 12 0" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'derm-curettage',
    name: 'Curettage',
    domain: 'medicine',
    category: 'procedures',
    tags: ['curettage', 'curette', 'scraping', 'ED&C'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="44" x2="56" y2="44"/>
      <ellipse cx="32" cy="40" rx="10" ry="8" fill="currentColor" opacity="0.25"/>
      <path d="M24 8c-4 0-8 4-8 8l16 24"/>
      <path d="M40 8c4 0 8 4 8 8l-16 24"/>
      <ellipse cx="32" cy="16" rx="8" ry="4"/>
      <path d="M28 36c2-2 4-2 8 0"/>
    </svg>`
  },
  {
    id: 'derm-electrosurgery',
    name: 'Electrosurgery',
    domain: 'medicine',
    category: 'procedures',
    tags: ['electrosurgery', 'electrodesiccation', 'cautery', 'fulguration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="24" rx="2" fill="currentColor" opacity="0.15"/>
      <rect x="24" y="8" width="16" height="24" rx="2"/>
      <path d="M32 32v12"/>
      <path d="M28 44l4 8l4-8"/>
      <circle cx="32" cy="56" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M28 16h8"/>
      <path d="M28 24h8"/>
      <path d="M26 52l-4 4"/>
      <path d="M38 52l4 4"/>
    </svg>`
  },
  {
    id: 'derm-laser-therapy',
    name: 'Laser Therapy',
    domain: 'medicine',
    category: 'procedures',
    tags: ['laser', 'ablative', 'non-ablative', 'phototherapy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="16" rx="2" fill="currentColor" opacity="0.15"/>
      <rect x="20" y="8" width="24" height="16" rx="2"/>
      <path d="M32 24v8"/>
      <path d="M26 32h12"/>
      <path d="M28 32l4 20"/>
      <path d="M36 32l-4 20"/>
      <circle cx="32" cy="54" r="4" fill="currentColor" opacity="0.25"/>
      <path d="M28 36l-8 8" stroke-dasharray="2 2"/>
      <path d="M36 36l8 8" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'derm-mohs-surgery',
    name: 'Mohs Micrographic Surgery',
    domain: 'medicine',
    category: 'procedures',
    tags: ['Mohs', 'micrographic', 'margin control', 'skin cancer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="14" stroke-dasharray="4 2"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.35"/>
      <line x1="32" y1="12" x2="32" y2="8"/>
      <line x1="32" y1="56" x2="32" y2="52"/>
      <line x1="12" y1="32" x2="8" y2="32"/>
      <line x1="56" y1="32" x2="52" y2="32"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Stage mapping</text>
    </svg>`
  },
  {
    id: 'derm-phototherapy',
    name: 'Phototherapy (UVB)',
    domain: 'medicine',
    category: 'procedures',
    tags: ['phototherapy', 'UVB', 'narrowband', 'psoriasis', 'vitiligo'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="16" y="8" width="32" height="48" rx="4"/>
      <line x1="24" y1="16" x2="24" y2="48"/>
      <line x1="32" y1="16" x2="32" y2="48"/>
      <line x1="40" y1="16" x2="40" y2="48"/>
      <path d="M20 12h24"/>
      <path d="M20 52h24"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.2" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'derm-intralesional-injection',
    name: 'Intralesional Injection',
    domain: 'medicine',
    category: 'procedures',
    tags: ['intralesional', 'injection', 'steroid', 'triamcinolone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="44" rx="16" ry="10" fill="currentColor" opacity="0.25"/>
      <ellipse cx="32" cy="44" rx="16" ry="10"/>
      <rect x="28" y="8" width="8" height="24" rx="1"/>
      <line x1="32" y1="32" x2="32" y2="44"/>
      <path d="M30 12h4"/>
      <path d="M30 18h4"/>
      <path d="M30 24h4"/>
      <circle cx="32" cy="44" r="3" fill="currentColor" opacity="0.4"/>
    </svg>`
  },

  // ===========================================================================
  // WOUND HEALING & GRAFTS
  // ===========================================================================
  {
    id: 'derm-wound-healing-phases',
    name: 'Wound Healing Phases',
    domain: 'medicine',
    category: 'wound-healing',
    tags: ['wound', 'healing', 'phases', 'inflammation', 'proliferation', 'remodeling'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="12" height="32" rx="2" fill="currentColor" opacity="0.4"/>
      <rect x="24" y="12" width="12" height="36" rx="2" fill="currentColor" opacity="0.3"/>
      <rect x="40" y="8" width="12" height="40" rx="2" fill="currentColor" opacity="0.2"/>
      <path d="M14 52v4"/>
      <path d="M30 52v4"/>
      <path d="M46 52v4"/>
      <text x="9" y="60" font-size="3" fill="currentColor" stroke="none">Infl</text>
      <text x="24" y="60" font-size="3" fill="currentColor" stroke="none">Prolif</text>
      <text x="40" y="60" font-size="3" fill="currentColor" stroke="none">Remod</text>
    </svg>`
  },
  {
    id: 'derm-skin-graft-stsg',
    name: 'Split-Thickness Skin Graft',
    domain: 'medicine',
    category: 'wound-healing',
    tags: ['skin graft', 'STSG', 'split thickness', 'donor', 'recipient'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="20" height="24" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="8" width="20" height="24" rx="2"/>
      <rect x="8" y="8" width="20" height="8" fill="currentColor" opacity="0.3"/>
      <path d="M32 20l8 0"/>
      <path d="M36 16l4 4l-4 4"/>
      <rect x="44" y="28" width="16" height="16" rx="2" fill="currentColor" opacity="0.15"/>
      <rect x="44" y="28" width="16" height="8" fill="currentColor" opacity="0.3"/>
      <text x="10" y="50" font-size="4" fill="currentColor" stroke="none">Donor</text>
      <text x="44" y="50" font-size="4" fill="currentColor" stroke="none">Recipient</text>
    </svg>`
  },
  {
    id: 'derm-skin-graft-ftsg',
    name: 'Full-Thickness Skin Graft',
    domain: 'medicine',
    category: 'wound-healing',
    tags: ['skin graft', 'FTSG', 'full thickness', 'dermis', 'epidermis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="20" height="28" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="8" width="20" height="28" rx="2"/>
      <rect x="8" y="8" width="20" height="8" fill="currentColor" opacity="0.35"/>
      <rect x="8" y="16" width="20" height="12" fill="currentColor" opacity="0.25"/>
      <path d="M32 22l8 0"/>
      <path d="M36 18l4 4l-4 4"/>
      <rect x="44" y="24" width="16" height="20" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="44" y="24" width="16" height="8" fill="currentColor" opacity="0.35"/>
      <rect x="44" y="32" width="16" height="12" fill="currentColor" opacity="0.25"/>
      <text x="10" y="52" font-size="4" fill="currentColor" stroke="none">Full</text>
    </svg>`
  },
  {
    id: 'derm-flap',
    name: 'Skin Flap',
    domain: 'medicine',
    category: 'wound-healing',
    tags: ['flap', 'rotation', 'advancement', 'transposition', 'pedicle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="40" cy="24" r="12" fill="currentColor" opacity="0.15"/>
      <circle cx="40" cy="24" r="12"/>
      <path d="M28 24c-8 0-12 4-12 12v8h24l-6-12" fill="currentColor" opacity="0.25"/>
      <path d="M28 24c-8 0-12 4-12 12v8h24"/>
      <path d="M34 32l-6 12"/>
      <path d="M40 12l0-4"/>
      <path d="M28 24l-4-4"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Rotation</text>
    </svg>`
  },
  {
    id: 'derm-wound-dressing',
    name: 'Wound Dressing',
    domain: 'medicine',
    category: 'wound-healing',
    tags: ['dressing', 'bandage', 'wound care', 'occlusive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" rx="4" fill="currentColor" opacity="0.15"/>
      <rect x="8" y="20" width="48" height="24" rx="4"/>
      <rect x="20" y="28" width="24" height="8" rx="2" fill="currentColor" opacity="0.3"/>
      <line x1="8" y1="32" x2="20" y2="32"/>
      <line x1="44" y1="32" x2="56" y2="32"/>
      <path d="M4 28l4 4l-4 4"/>
      <path d="M60 28l-4 4l4 4"/>
    </svg>`
  },
  {
    id: 'derm-suture',
    name: 'Suture/Stitch',
    domain: 'medicine',
    category: 'wound-healing',
    tags: ['suture', 'stitch', 'closure', 'wound', 'repair'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="32" y1="8" x2="32" y2="56"/>
      <path d="M20 16c4 4 8 4 12 0"/>
      <path d="M32 16c4 4 8 4 12 0"/>
      <path d="M20 28c4 4 8 4 12 0"/>
      <path d="M32 28c4 4 8 4 12 0"/>
      <path d="M20 40c4 4 8 4 12 0"/>
      <path d="M32 40c4 4 8 4 12 0"/>
      <path d="M20 52c4 4 8 4 12 0"/>
      <path d="M32 52c4 4 8 4 12 0"/>
    </svg>`
  },
  {
    id: 'derm-scar-treatment',
    name: 'Scar Treatment',
    domain: 'medicine',
    category: 'wound-healing',
    tags: ['scar', 'treatment', 'silicone', 'pressure', 'laser'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="24" width="32" height="16" rx="4" fill="currentColor" opacity="0.2"/>
      <line x1="20" y1="32" x2="28" y2="32"/>
      <line x1="36" y1="32" x2="44" y2="32"/>
      <path d="M28 28l4 8l4-8"/>
      <path d="M12 32l-4 0"/>
      <path d="M52 32l4 0"/>
      <path d="M8 28l0 8"/>
      <path d="M56 28l0 8"/>
      <text x="16" y="52" font-size="4" fill="currentColor" stroke="none">Pressure</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL SPECIALIZED ICONS
  // ===========================================================================
  {
    id: 'derm-dermis-injection-depth',
    name: 'Injection Depth Diagram',
    domain: 'medicine',
    category: 'procedures',
    tags: ['injection', 'depth', 'intradermal', 'subcutaneous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="8" fill="currentColor" opacity="0.3"/>
      <rect x="8" y="16" width="48" height="16" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="32" width="48" height="24" fill="currentColor" opacity="0.1"/>
      <line x1="8" y1="16" x2="56" y2="16"/>
      <line x1="8" y1="32" x2="56" y2="32"/>
      <path d="M24 4l0 8"/>
      <path d="M40 4l0 20"/>
      <circle cx="24" cy="12" r="2" fill="currentColor"/>
      <circle cx="40" cy="24" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'derm-abcde-melanoma',
    name: 'ABCDE Melanoma Criteria',
    domain: 'medicine',
    category: 'skin-cancer',
    tags: ['ABCDE', 'melanoma', 'asymmetry', 'border', 'color', 'diameter', 'evolution'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 20c-4 4-6 12-2 18s12 8 20 4s12-12 8-20s-16-12-26-2z" fill="currentColor" opacity="0.3"/>
      <circle cx="28" cy="30" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="38" cy="34" r="3" fill="currentColor" opacity="0.6"/>
      <circle cx="32" cy="40" r="2" fill="currentColor" opacity="0.7"/>
      <text x="8" y="56" font-size="5" fill="currentColor" stroke="none">A B C D E</text>
    </svg>`
  },
  {
    id: 'derm-fitzpatrick-scale',
    name: 'Fitzpatrick Skin Type Scale',
    domain: 'medicine',
    category: 'general',
    tags: ['Fitzpatrick', 'skin type', 'phototype', 'pigmentation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="8" height="32" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="18" y="16" width="8" height="32" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="28" y="16" width="8" height="32" rx="2" fill="currentColor" opacity="0.35"/>
      <rect x="38" y="16" width="8" height="32" rx="2" fill="currentColor" opacity="0.5"/>
      <rect x="48" y="16" width="8" height="32" rx="2" fill="currentColor" opacity="0.7"/>
      <text x="10" y="56" font-size="4" fill="currentColor" stroke="none">I</text>
      <text x="20" y="56" font-size="4" fill="currentColor" stroke="none">II</text>
      <text x="29" y="56" font-size="4" fill="currentColor" stroke="none">III</text>
      <text x="39" y="56" font-size="4" fill="currentColor" stroke="none">IV</text>
      <text x="49" y="56" font-size="4" fill="currentColor" stroke="none">V</text>
    </svg>`
  },
  {
    id: 'derm-skin-examination',
    name: 'Full Skin Examination',
    domain: 'medicine',
    category: 'general',
    tags: ['skin exam', 'total body', 'screening', 'inspection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="8" ry="10"/>
      <path d="M24 26v20"/>
      <path d="M40 26v20"/>
      <path d="M24 30l-8 12"/>
      <path d="M40 30l8 12"/>
      <path d="M24 46l-4 12"/>
      <path d="M40 46l4 12"/>
      <circle cx="20" cy="36" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="36" cy="40" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="28" cy="50" r="2" fill="currentColor" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'derm-topical-application',
    name: 'Topical Medication Application',
    domain: 'medicine',
    category: 'treatment',
    tags: ['topical', 'cream', 'ointment', 'application', 'medication'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="32" rx="4" fill="currentColor" opacity="0.15"/>
      <rect x="20" y="8" width="24" height="32" rx="4"/>
      <rect x="24" y="8" width="16" height="8" rx="2" fill="currentColor" opacity="0.25"/>
      <ellipse cx="32" cy="52" rx="16" ry="6" fill="currentColor" opacity="0.2"/>
      <path d="M32 40c-4 4-8 6-8 12"/>
      <path d="M32 40c4 4 8 6 8 12"/>
      <path d="M28 24h8"/>
      <path d="M28 32h8"/>
    </svg>`
  },
];

export default dermatologyIcons;
