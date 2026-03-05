/**
 * anatomy.ts
 * Comprehensive Anatomy Icon Library for FINNISH
 *
 * Categories:
 * - Skeletal System (bones, joints, skull, spine, limbs)
 * - Muscular System (major muscle groups, tendons, ligaments)
 * - Cardiovascular System (heart, vessels, circulation)
 * - Nervous System (brain regions, nerves, spinal cord)
 * - Respiratory System (lungs, airways, diaphragm)
 * - Digestive System (GI tract organs)
 * - Urinary System (kidneys, bladder, ureters)
 * - Reproductive System (male/female anatomy)
 * - Endocrine Glands
 * - Lymphatic System
 * - Integumentary System (skin layers)
 *
 * Total: 110+ icons
 */

import type { IconDefinition } from './index';

export const anatomyIcons: IconDefinition[] = [
  // ===========================================================================
  // SKELETAL SYSTEM - AXIAL SKELETON
  // ===========================================================================
  {
    id: 'anat-skull-anterior',
    name: 'Skull Anterior View',
    domain: 'biology',
    category: 'skeletal-axial',
    tags: ['skull', 'cranium', 'frontal', 'maxilla', 'mandible', 'orbits'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="20" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="28" rx="20" ry="24"/>
      <ellipse cx="24" cy="24" rx="5" ry="4"/>
      <ellipse cx="40" cy="24" rx="5" ry="4"/>
      <path d="M32 28v8"/>
      <ellipse cx="32" cy="32" rx="3" ry="4"/>
      <path d="M24 44h16c2 0 4-2 4-4v-2H20v2c0 2 2 4 4 4z"/>
      <path d="M24 42v2M28 42v2M32 42v2M36 42v2M40 42v2"/>
    </svg>`
  },
  {
    id: 'anat-skull-lateral',
    name: 'Skull Lateral View',
    domain: 'biology',
    category: 'skeletal-axial',
    tags: ['skull', 'temporal', 'parietal', 'occipital', 'sphenoid', 'lateral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32c0-16 8-24 20-24s16 8 16 20c0 8-4 16-12 18v6c0 2-2 4-6 4H22c-2 0-4-2-4-4v-8c-2-4-2-8-2-12z" fill="currentColor" opacity="0.1"/>
      <path d="M16 32c0-16 8-24 20-24s16 8 16 20c0 8-4 16-12 18v6c0 2-2 4-6 4H22c-2 0-4-2-4-4v-8c-2-4-2-8-2-12z"/>
      <ellipse cx="24" cy="28" rx="4" ry="3"/>
      <path d="M22 40h10"/>
      <path d="M24 52v4"/>
      <circle cx="44" cy="36" r="2"/>
    </svg>`
  },
  {
    id: 'anat-vertebral-column',
    name: 'Vertebral Column',
    domain: 'biology',
    category: 'skeletal-axial',
    tags: ['spine', 'vertebrae', 'cervical', 'thoracic', 'lumbar', 'sacral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="4" width="8" height="4" rx="1" fill="currentColor" opacity="0.3"/>
      <rect x="28" y="9" width="8" height="4" rx="1" fill="currentColor" opacity="0.3"/>
      <rect x="26" y="14" width="12" height="5" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="26" y="20" width="12" height="5" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="26" y="26" width="12" height="5" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="32" width="16" height="6" rx="1" fill="currentColor" opacity="0.15"/>
      <rect x="24" y="39" width="16" height="6" rx="1" fill="currentColor" opacity="0.15"/>
      <rect x="24" y="46" width="16" height="6" rx="1" fill="currentColor" opacity="0.15"/>
      <path d="M26 53l6 8 6-8z" fill="currentColor" opacity="0.1"/>
      <path d="M28 4h8M28 9h8M26 14h12M26 20h12M26 26h12M24 32h16M24 39h16M24 46h16"/>
      <text x="44" y="8" font-size="3" fill="currentColor" stroke="none">C</text>
      <text x="44" y="24" font-size="3" fill="currentColor" stroke="none">T</text>
      <text x="44" y="44" font-size="3" fill="currentColor" stroke="none">L</text>
    </svg>`
  },
  {
    id: 'anat-cervical-vertebra',
    name: 'Cervical Vertebra',
    domain: 'biology',
    category: 'skeletal-axial',
    tags: ['cervical', 'C1-C7', 'atlas', 'axis', 'vertebra', 'neck'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="36" rx="12" ry="8"/>
      <circle cx="32" cy="36" r="4"/>
      <path d="M20 32l-8-8"/>
      <path d="M44 32l8-8"/>
      <path d="M32 28v-12"/>
      <circle cx="32" cy="12" r="4" fill="currentColor" opacity="0.1"/>
      <text x="4" y="20" font-size="4" fill="currentColor" stroke="none">TP</text>
      <text x="50" y="20" font-size="4" fill="currentColor" stroke="none">TP</text>
      <text x="36" y="10" font-size="4" fill="currentColor" stroke="none">SP</text>
    </svg>`
  },
  {
    id: 'anat-thoracic-vertebra',
    name: 'Thoracic Vertebra',
    domain: 'biology',
    category: 'skeletal-axial',
    tags: ['thoracic', 'T1-T12', 'vertebra', 'rib articulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="14" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="40" rx="14" ry="10"/>
      <circle cx="32" cy="40" r="5"/>
      <path d="M18 36l-4-8"/>
      <path d="M46 36l4-8"/>
      <path d="M32 30v-20"/>
      <circle cx="32" cy="8" r="3" fill="currentColor" opacity="0.1"/>
      <circle cx="18" cy="40" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="46" cy="40" r="2" fill="currentColor" opacity="0.3"/>
      <text x="2" y="58" font-size="4" fill="currentColor" stroke="none">Costal facets</text>
    </svg>`
  },
  {
    id: 'anat-lumbar-vertebra',
    name: 'Lumbar Vertebra',
    domain: 'biology',
    category: 'skeletal-axial',
    tags: ['lumbar', 'L1-L5', 'vertebra', 'lower back'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="18" ry="12" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="40" rx="18" ry="12"/>
      <circle cx="32" cy="40" r="6"/>
      <path d="M14 36l-6-4"/>
      <path d="M50 36l6-4"/>
      <path d="M32 28v-16"/>
      <rect x="28" y="8" width="8" height="6" rx="1" fill="currentColor" opacity="0.1"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Large body</text>
    </svg>`
  },
  {
    id: 'anat-sacrum',
    name: 'Sacrum and Coccyx',
    domain: 'biology',
    category: 'skeletal-axial',
    tags: ['sacrum', 'coccyx', 'tailbone', 'fused vertebrae', 'sacral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8h32l-4 32h-24l-4-32z" fill="currentColor" opacity="0.15"/>
      <path d="M16 8h32l-4 32h-24l-4-32z"/>
      <path d="M20 8h24"/>
      <path d="M18 16h28"/>
      <path d="M16 24h32"/>
      <path d="M14 32h36"/>
      <circle cx="22" cy="16" r="2"/>
      <circle cx="42" cy="16" r="2"/>
      <circle cx="24" cy="24" r="2"/>
      <circle cx="40" cy="24" r="2"/>
      <path d="M28 40l4 16 4-16" fill="currentColor" opacity="0.1"/>
      <path d="M28 40l4 16 4-16"/>
      <text x="44" y="24" font-size="3" fill="currentColor" stroke="none">Foramina</text>
    </svg>`
  },
  {
    id: 'anat-ribcage',
    name: 'Ribcage',
    domain: 'biology',
    category: 'skeletal-axial',
    tags: ['ribs', 'thorax', 'sternum', 'costal', 'chest'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="4" width="8" height="32" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="28" y="4" width="8" height="32" rx="2"/>
      <path d="M28 8c-12 2-16 8-16 12"/>
      <path d="M36 8c12 2 16 8 16 12"/>
      <path d="M28 14c-14 2-18 10-18 14"/>
      <path d="M36 14c14 2 18 10 18 14"/>
      <path d="M28 20c-16 2-20 12-20 16"/>
      <path d="M36 20c16 2 20 12 20 16"/>
      <path d="M28 26c-14 4-18 14-16 18"/>
      <path d="M36 26c14 4 18 14 16 18"/>
      <path d="M28 32c-10 4-14 12-12 16"/>
      <path d="M36 32c10 4 14 12 12 16"/>
    </svg>`
  },
  {
    id: 'anat-sternum',
    name: 'Sternum',
    domain: 'biology',
    category: 'skeletal-axial',
    tags: ['sternum', 'breastbone', 'manubrium', 'body', 'xiphoid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16l2 8h-20l2-8z" fill="currentColor" opacity="0.3"/>
      <path d="M26 16h12v32h-12z" fill="currentColor" opacity="0.2"/>
      <path d="M30 48l2 8 2-8" fill="currentColor" opacity="0.1"/>
      <path d="M24 8h16l2 8h-20l2-8z"/>
      <path d="M26 16h12v32h-12z"/>
      <path d="M30 48l2 8 2-8"/>
      <text x="40" y="12" font-size="3" fill="currentColor" stroke="none">Manubrium</text>
      <text x="40" y="32" font-size="3" fill="currentColor" stroke="none">Body</text>
      <text x="40" y="52" font-size="3" fill="currentColor" stroke="none">Xiphoid</text>
    </svg>`
  },
  // ===========================================================================
  // SKELETAL SYSTEM - APPENDICULAR SKELETON
  // ===========================================================================
  {
    id: 'anat-clavicle',
    name: 'Clavicle',
    domain: 'biology',
    category: 'skeletal-appendicular',
    tags: ['clavicle', 'collarbone', 'shoulder girdle', 'acromial', 'sternal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c8-8 16-4 24-4s16-4 24 4" stroke-width="3" fill="currentColor" opacity="0.2"/>
      <path d="M8 32c8-8 16-4 24-4s16-4 24 4" stroke-width="2"/>
      <circle cx="8" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="56" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <text x="4" y="48" font-size="4" fill="currentColor" stroke="none">Sternal end</text>
      <text x="36" y="48" font-size="4" fill="currentColor" stroke="none">Acromial end</text>
    </svg>`
  },
  {
    id: 'anat-scapula',
    name: 'Scapula',
    domain: 'biology',
    category: 'skeletal-appendicular',
    tags: ['scapula', 'shoulder blade', 'acromion', 'glenoid', 'spine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8l24 0l4 16l-8 32l-24 0l4-48z" fill="currentColor" opacity="0.15"/>
      <path d="M20 8l24 0l4 16l-8 32l-24 0l4-48z"/>
      <path d="M20 24h28"/>
      <circle cx="48" cy="20" r="4" fill="currentColor" opacity="0.2"/>
      <path d="M52 16l8-8"/>
      <text x="4" y="20" font-size="3" fill="currentColor" stroke="none">Spine</text>
      <text x="52" y="6" font-size="3" fill="currentColor" stroke="none">Acromion</text>
      <text x="50" y="28" font-size="3" fill="currentColor" stroke="none">Glenoid</text>
    </svg>`
  },
  {
    id: 'anat-humerus',
    name: 'Humerus',
    domain: 'biology',
    category: 'skeletal-appendicular',
    tags: ['humerus', 'upper arm', 'arm bone', 'head', 'epicondyles'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="10" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="10" r="6"/>
      <path d="M28 16v32" stroke-width="3"/>
      <path d="M36 16v32" stroke-width="3"/>
      <ellipse cx="32" cy="54" rx="10" ry="6" fill="currentColor" opacity="0.15"/>
      <ellipse cx="32" cy="54" rx="10" ry="6"/>
      <circle cx="24" cy="54" r="2" fill="currentColor"/>
      <circle cx="40" cy="54" r="2" fill="currentColor"/>
      <text x="40" y="10" font-size="3" fill="currentColor" stroke="none">Head</text>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Epicondyles</text>
    </svg>`
  },
  {
    id: 'anat-radius-ulna',
    name: 'Radius and Ulna',
    domain: 'biology',
    category: 'skeletal-appendicular',
    tags: ['radius', 'ulna', 'forearm', 'radial', 'ulnar', 'pronation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c0 0 4 4 4 8v32c0 4-2 8-2 8" stroke-width="2.5" fill="none"/>
      <path d="M44 8c0 0-4 4-4 8v32c0 4 2 8 2 8" stroke-width="2.5" fill="none"/>
      <circle cx="20" cy="8" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="44" cy="8" r="4" fill="currentColor" opacity="0.3"/>
      <ellipse cx="22" cy="56" rx="4" ry="3" fill="currentColor" opacity="0.2"/>
      <ellipse cx="42" cy="56" rx="3" ry="4" fill="currentColor" opacity="0.3"/>
      <text x="4" y="32" font-size="4" fill="currentColor" stroke="none">Ulna</text>
      <text x="48" y="32" font-size="4" fill="currentColor" stroke="none">Radius</text>
    </svg>`
  },
  {
    id: 'anat-hand-bones',
    name: 'Hand Bones',
    domain: 'biology',
    category: 'skeletal-appendicular',
    tags: ['hand', 'carpals', 'metacarpals', 'phalanges', 'wrist'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="4" width="32" height="12" rx="4" fill="currentColor" opacity="0.2"/>
      <rect x="16" y="4" width="32" height="12" rx="4"/>
      <rect x="18" y="18" width="6" height="14" rx="1"/>
      <rect x="26" y="18" width="6" height="16" rx="1"/>
      <rect x="34" y="18" width="6" height="16" rx="1"/>
      <rect x="42" y="18" width="6" height="12" rx="1"/>
      <rect x="18" y="34" width="6" height="8" rx="1"/>
      <rect x="26" y="36" width="6" height="10" rx="1"/>
      <rect x="34" y="36" width="6" height="10" rx="1"/>
      <rect x="42" y="32" width="6" height="8" rx="1"/>
      <rect x="18" y="44" width="6" height="6" rx="1"/>
      <rect x="26" y="48" width="6" height="8" rx="1"/>
      <rect x="34" y="48" width="6" height="8" rx="1"/>
      <rect x="42" y="42" width="6" height="6" rx="1"/>
      <path d="M10 20l-4 8v10"/>
    </svg>`
  },
  {
    id: 'anat-pelvis',
    name: 'Pelvis',
    domain: 'biology',
    category: 'skeletal-appendicular',
    tags: ['pelvis', 'hip bone', 'ilium', 'ischium', 'pubis', 'acetabulum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16c4-8 12-8 24-8s20 0 24 8l-4 24c-4 8-12 12-20 12s-16-4-20-12l-4-24z" fill="currentColor" opacity="0.1"/>
      <path d="M8 16c4-8 12-8 24-8s20 0 24 8l-4 24c-4 8-12 12-20 12s-16-4-20-12l-4-24z"/>
      <circle cx="18" cy="32" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="46" cy="32" r="6" fill="currentColor" opacity="0.2"/>
      <path d="M26 48h12"/>
      <ellipse cx="32" cy="20" rx="8" ry="4" fill="currentColor" opacity="0.1"/>
      <text x="14" y="44" font-size="3" fill="currentColor" stroke="none">Acetabulum</text>
    </svg>`
  },
  {
    id: 'anat-femur',
    name: 'Femur',
    domain: 'biology',
    category: 'skeletal-appendicular',
    tags: ['femur', 'thigh bone', 'head', 'neck', 'condyles', 'trochanter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="10" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="10" r="6"/>
      <path d="M28 14l4 4"/>
      <path d="M28 18v28" stroke-width="4"/>
      <path d="M36 18v28" stroke-width="4"/>
      <ellipse cx="32" cy="54" rx="12" ry="8" fill="currentColor" opacity="0.15"/>
      <ellipse cx="32" cy="54" rx="12" ry="8"/>
      <circle cx="24" cy="54" r="4" fill="currentColor" opacity="0.1"/>
      <circle cx="40" cy="54" r="4" fill="currentColor" opacity="0.1"/>
      <text x="32" y="10" font-size="3" fill="currentColor" stroke="none">Head</text>
      <text x="40" y="18" font-size="3" fill="currentColor" stroke="none">Trochanter</text>
    </svg>`
  },
  {
    id: 'anat-tibia-fibula',
    name: 'Tibia and Fibula',
    domain: 'biology',
    category: 'skeletal-appendicular',
    tags: ['tibia', 'fibula', 'leg bones', 'shin', 'malleolus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="10" rx="10" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="24" cy="10" rx="10" ry="6"/>
      <path d="M20 16v36" stroke-width="4"/>
      <path d="M28 16v36" stroke-width="4"/>
      <circle cx="44" cy="10" r="3" fill="currentColor" opacity="0.2"/>
      <path d="M44 13v39" stroke-width="1.5"/>
      <ellipse cx="24" cy="56" rx="8" ry="4" fill="currentColor" opacity="0.15"/>
      <circle cx="20" cy="58" r="3" fill="currentColor" opacity="0.2"/>
      <circle cx="44" cy="56" r="3" fill="currentColor" opacity="0.2"/>
      <text x="4" y="34" font-size="4" fill="currentColor" stroke="none">Tibia</text>
      <text x="48" y="34" font-size="4" fill="currentColor" stroke="none">Fibula</text>
    </svg>`
  },
  {
    id: 'anat-foot-bones',
    name: 'Foot Bones',
    domain: 'biology',
    category: 'skeletal-appendicular',
    tags: ['foot', 'tarsals', 'metatarsals', 'phalanges', 'calcaneus', 'talus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="32" rx="10" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="16" cy="32" rx="10" ry="8"/>
      <rect x="26" y="24" width="14" height="16" rx="4" fill="currentColor" opacity="0.15"/>
      <rect x="26" y="24" width="14" height="16" rx="4"/>
      <rect x="42" y="20" width="8" height="6" rx="1"/>
      <rect x="42" y="28" width="8" height="6" rx="1"/>
      <rect x="42" y="36" width="8" height="6" rx="1"/>
      <rect x="42" y="44" width="8" height="6" rx="1"/>
      <rect x="52" y="20" width="6" height="4" rx="1"/>
      <rect x="52" y="28" width="6" height="4" rx="1"/>
      <rect x="52" y="36" width="6" height="4" rx="1"/>
      <rect x="52" y="44" width="6" height="4" rx="1"/>
      <text x="8" y="48" font-size="3" fill="currentColor" stroke="none">Calcaneus</text>
    </svg>`
  },
  {
    id: 'anat-patella',
    name: 'Patella',
    domain: 'biology',
    category: 'skeletal-appendicular',
    tags: ['patella', 'kneecap', 'sesamoid', 'knee'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="20" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="16" ry="20"/>
      <path d="M24 24c4-2 12-2 16 0"/>
      <ellipse cx="32" cy="36" rx="8" ry="10" fill="currentColor" opacity="0.1"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Anterior view</text>
    </svg>`
  },
  // ===========================================================================
  // JOINTS
  // ===========================================================================
  {
    id: 'anat-synovial-joint',
    name: 'Synovial Joint',
    domain: 'biology',
    category: 'joints',
    tags: ['synovial', 'joint', 'cartilage', 'capsule', 'synovial fluid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="16" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="16" rx="16" ry="10"/>
      <path d="M18 22c0 4 6 8 14 8s14-4 14-8" fill="#87CEEB" opacity="0.3"/>
      <ellipse cx="32" cy="48" rx="16" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="48" rx="16" ry="10"/>
      <path d="M18 42c0-4 6-8 14-8s14 4 14 8" fill="#87CEEB" opacity="0.3"/>
      <path d="M16 22v20" stroke-dasharray="2 2"/>
      <path d="M48 22v20" stroke-dasharray="2 2"/>
      <text x="4" y="34" font-size="3" fill="currentColor" stroke="none">Capsule</text>
    </svg>`
  },
  {
    id: 'anat-knee-joint',
    name: 'Knee Joint',
    domain: 'biology',
    category: 'joints',
    tags: ['knee', 'ACL', 'PCL', 'meniscus', 'cruciate', 'collateral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="14" rx="18" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="14" rx="18" ry="10"/>
      <ellipse cx="32" cy="50" rx="14" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="50" rx="14" ry="8"/>
      <path d="M20 28c8 4 16 4 24 0" fill="#708090" opacity="0.5"/>
      <path d="M28 24l8 16" stroke="#DC143C" stroke-width="2"/>
      <path d="M36 24l-8 16" stroke="#4169E1" stroke-width="2"/>
      <ellipse cx="32" cy="32" rx="10" ry="4" fill="currentColor" opacity="0.1"/>
      <text x="4" y="30" font-size="3" fill="currentColor" stroke="none">Meniscus</text>
      <text x="40" y="24" font-size="2" fill="#DC143C" stroke="none">ACL</text>
      <text x="40" y="38" font-size="2" fill="#4169E1" stroke="none">PCL</text>
    </svg>`
  },
  {
    id: 'anat-hip-joint',
    name: 'Hip Joint',
    domain: 'biology',
    category: 'joints',
    tags: ['hip', 'acetabulum', 'femoral head', 'labrum', 'ball and socket'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 20c4-12 20-12 24-12v48c-4 0-20 0-24-12v-24z" fill="currentColor" opacity="0.15"/>
      <path d="M8 20c4-12 20-12 24-12v48c-4 0-20 0-24-12v-24z"/>
      <circle cx="32" cy="32" r="12" fill="currentColor" opacity="0.25"/>
      <circle cx="32" cy="32" r="12"/>
      <path d="M44 32l12 20" stroke-width="3"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.1"/>
      <text x="36" y="16" font-size="3" fill="currentColor" stroke="none">Acetabulum</text>
      <text x="48" y="40" font-size="3" fill="currentColor" stroke="none">Femur</text>
    </svg>`
  },
  {
    id: 'anat-shoulder-joint',
    name: 'Shoulder Joint',
    domain: 'biology',
    category: 'joints',
    tags: ['shoulder', 'glenohumeral', 'rotator cuff', 'labrum', 'glenoid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h20c4 0 8 4 8 8s-4 8-8 8H8" fill="currentColor" opacity="0.15"/>
      <path d="M8 24h20c4 0 8 4 8 8s-4 8-8 8H8"/>
      <circle cx="32" cy="32" r="10" fill="currentColor" opacity="0.25"/>
      <circle cx="32" cy="32" r="10"/>
      <path d="M42 32l14 24" stroke-width="3"/>
      <path d="M20 16l4 8M24 16l0 8M28 16l-4 8" stroke-width="1"/>
      <text x="4" y="48" font-size="3" fill="currentColor" stroke="none">Glenoid</text>
      <text x="48" y="44" font-size="3" fill="currentColor" stroke="none">Humerus</text>
    </svg>`
  },
  // ===========================================================================
  // MUSCULAR SYSTEM
  // ===========================================================================
  {
    id: 'anat-muscle-fiber',
    name: 'Muscle Fiber Structure',
    domain: 'biology',
    category: 'muscular',
    tags: ['muscle', 'fiber', 'myofibril', 'sarcomere', 'actin', 'myosin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="56" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="4" y="24" width="56" height="16" rx="2"/>
      <path d="M12 28v8M20 28v8M28 28v8M36 28v8M44 28v8M52 28v8"/>
      <path d="M8 32h8M24 32h8M40 32h8" stroke="#DC143C" stroke-width="2"/>
      <path d="M16 32h4M32 32h4M48 32h4" stroke="#4169E1" stroke-width="2"/>
      <text x="4" y="50" font-size="3" fill="currentColor" stroke="none">Z-line</text>
      <text x="24" y="50" font-size="3" fill="currentColor" stroke="none">Sarcomere</text>
      <text x="4" y="58" font-size="2" fill="#DC143C" stroke="none">Actin</text>
      <text x="20" y="58" font-size="2" fill="#4169E1" stroke="none">Myosin</text>
    </svg>`
  },
  {
    id: 'anat-biceps',
    name: 'Biceps Brachii',
    domain: 'biology',
    category: 'muscular',
    tags: ['biceps', 'arm', 'flexor', 'elbow', 'upper arm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="24" fill="#CD5C5C" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="16" ry="24"/>
      <path d="M24 8c-4-4-8-4-12 0"/>
      <path d="M40 8c4-4 8-4 12 0"/>
      <path d="M32 56v4"/>
      <text x="4" y="6" font-size="3" fill="currentColor" stroke="none">Short head</text>
      <text x="40" y="6" font-size="3" fill="currentColor" stroke="none">Long head</text>
      <text x="20" y="62" font-size="3" fill="currentColor" stroke="none">Insertion</text>
    </svg>`
  },
  {
    id: 'anat-quadriceps',
    name: 'Quadriceps',
    domain: 'biology',
    category: 'muscular',
    tags: ['quadriceps', 'thigh', 'rectus femoris', 'vastus', 'knee extensor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="32" rx="8" ry="24" fill="#CD5C5C" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="8" ry="26" fill="#BC8F8F" opacity="0.3"/>
      <ellipse cx="44" cy="32" rx="8" ry="24" fill="#CD5C5C" opacity="0.3"/>
      <ellipse cx="20" cy="32" rx="8" ry="24"/>
      <ellipse cx="32" cy="32" rx="8" ry="26"/>
      <ellipse cx="44" cy="32" rx="8" ry="24"/>
      <path d="M20 56l12 4 12-4"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">VL</text>
      <text x="28" y="62" font-size="3" fill="currentColor" stroke="none">RF</text>
      <text x="52" y="62" font-size="3" fill="currentColor" stroke="none">VM</text>
    </svg>`
  },
  {
    id: 'anat-hamstrings',
    name: 'Hamstrings',
    domain: 'biology',
    category: 'muscular',
    tags: ['hamstrings', 'thigh', 'biceps femoris', 'semitendinosus', 'semimembranosus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="32" rx="8" ry="22" fill="#CD5C5C" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="6" ry="22" fill="#BC8F8F" opacity="0.3"/>
      <ellipse cx="44" cy="32" rx="8" ry="22" fill="#CD5C5C" opacity="0.3"/>
      <ellipse cx="20" cy="32" rx="8" ry="22"/>
      <ellipse cx="32" cy="32" rx="6" ry="22"/>
      <ellipse cx="44" cy="32" rx="8" ry="22"/>
      <path d="M32 8v-4"/>
      <path d="M16 54l-4 6"/>
      <path d="M48 54l4 6"/>
      <text x="4" y="62" font-size="2" fill="currentColor" stroke="none">Semimem.</text>
      <text x="26" y="62" font-size="2" fill="currentColor" stroke="none">Semiten.</text>
      <text x="48" y="62" font-size="2" fill="currentColor" stroke="none">Biceps F.</text>
    </svg>`
  },
  {
    id: 'anat-deltoid',
    name: 'Deltoid Muscle',
    domain: 'biology',
    category: 'muscular',
    tags: ['deltoid', 'shoulder', 'anterior', 'middle', 'posterior'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l-20 12v20l20 12 20-12V20L32 8z" fill="#CD5C5C" opacity="0.3"/>
      <path d="M32 8l-20 12v20l20 12 20-12V20L32 8z"/>
      <path d="M32 8v44"/>
      <path d="M12 20l20 32"/>
      <path d="M52 20l-20 32"/>
      <text x="4" y="28" font-size="3" fill="currentColor" stroke="none">Ant</text>
      <text x="28" y="20" font-size="3" fill="currentColor" stroke="none">Mid</text>
      <text x="48" y="28" font-size="3" fill="currentColor" stroke="none">Post</text>
    </svg>`
  },
  {
    id: 'anat-pectoralis',
    name: 'Pectoralis Major',
    domain: 'biology',
    category: 'muscular',
    tags: ['pectoralis', 'chest', 'pecs', 'clavicular', 'sternal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 12c8-4 16-4 24-4s16 0 24 4l-8 36c-4 8-12 8-16 8s-12 0-16-8l-8-36z" fill="#CD5C5C" opacity="0.3"/>
      <path d="M8 12c8-4 16-4 24-4s16 0 24 4l-8 36c-4 8-12 8-16 8s-12 0-16-8l-8-36z"/>
      <path d="M32 8v44"/>
      <path d="M8 12l24 12"/>
      <path d="M56 12l-24 12"/>
      <text x="12" y="28" font-size="3" fill="currentColor" stroke="none">Clavicular</text>
      <text x="12" y="42" font-size="3" fill="currentColor" stroke="none">Sternal</text>
    </svg>`
  },
  {
    id: 'anat-gastrocnemius',
    name: 'Gastrocnemius',
    domain: 'biology',
    category: 'muscular',
    tags: ['gastrocnemius', 'calf', 'triceps surae', 'plantarflexion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="24" rx="10" ry="16" fill="#CD5C5C" opacity="0.3"/>
      <ellipse cx="40" cy="24" rx="10" ry="16" fill="#CD5C5C" opacity="0.3"/>
      <ellipse cx="24" cy="24" rx="10" ry="16"/>
      <ellipse cx="40" cy="24" rx="10" ry="16"/>
      <path d="M24 40l8 4 8-4"/>
      <path d="M32 44v12" stroke-width="3" fill="#F5DEB3"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Medial head</text>
      <text x="36" y="58" font-size="3" fill="currentColor" stroke="none">Lateral head</text>
      <text x="36" y="52" font-size="3" fill="currentColor" stroke="none">Achilles</text>
    </svg>`
  },
  {
    id: 'anat-tendon',
    name: 'Tendon Structure',
    domain: 'biology',
    category: 'muscular',
    tags: ['tendon', 'collagen', 'muscle attachment', 'connective tissue'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="32" rx="12" ry="20" fill="#CD5C5C" opacity="0.3"/>
      <ellipse cx="16" cy="32" rx="12" ry="20"/>
      <path d="M28 24h28" stroke-width="4" stroke="#F5DEB3"/>
      <path d="M28 32h28" stroke-width="4" stroke="#F5DEB3"/>
      <path d="M28 40h28" stroke-width="4" stroke="#F5DEB3"/>
      <rect x="52" y="20" width="8" height="24" fill="currentColor" opacity="0.2"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Muscle</text>
      <text x="32" y="58" font-size="3" fill="currentColor" stroke="none">Tendon</text>
      <text x="50" y="58" font-size="3" fill="currentColor" stroke="none">Bone</text>
    </svg>`
  },
  {
    id: 'anat-ligament',
    name: 'Ligament',
    domain: 'biology',
    category: 'muscular',
    tags: ['ligament', 'bone to bone', 'connective tissue', 'joint stability'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="16" height="24" rx="4" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="20" width="16" height="24" rx="4"/>
      <rect x="40" y="20" width="16" height="24" rx="4" fill="currentColor" opacity="0.2"/>
      <rect x="40" y="20" width="16" height="24" rx="4"/>
      <path d="M24 28c4-2 8-2 16 0" stroke="#DAA520" stroke-width="3"/>
      <path d="M24 36c4-2 8-2 16 0" stroke="#DAA520" stroke-width="3"/>
      <text x="12" y="58" font-size="3" fill="currentColor" stroke="none">Bone</text>
      <text x="28" y="58" font-size="3" fill="#DAA520" stroke="none">Ligament</text>
      <text x="44" y="58" font-size="3" fill="currentColor" stroke="none">Bone</text>
    </svg>`
  },
  // ===========================================================================
  // CARDIOVASCULAR SYSTEM
  // ===========================================================================
  {
    id: 'anat-heart-external',
    name: 'Heart External View',
    domain: 'biology',
    category: 'cardiovascular',
    tags: ['heart', 'external', 'coronary arteries', 'apex', 'base'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 56c-16-8-24-20-24-32 0-8 6-16 14-16 6 0 10 4 10 8 0-4 4-8 10-8 8 0 14 8 14 16 0 12-8 24-24 32z" fill="#DC143C" opacity="0.2"/>
      <path d="M32 56c-16-8-24-20-24-32 0-8 6-16 14-16 6 0 10 4 10 8 0-4 4-8 10-8 8 0 14 8 14 16 0 12-8 24-24 32z"/>
      <path d="M20 16c4 8 4 16 8 24" stroke="#FFA500" stroke-width="2"/>
      <path d="M44 16c-4 8-4 16-8 24" stroke="#FFA500" stroke-width="2"/>
      <text x="4" y="60" font-size="3" fill="currentColor" stroke="none">Coronary arteries</text>
    </svg>`
  },
  {
    id: 'anat-heart-chambers',
    name: 'Heart Four Chambers',
    domain: 'biology',
    category: 'cardiovascular',
    tags: ['heart', 'chambers', 'atria', 'ventricles', 'valves'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="28" fill="#DC143C" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="28"/>
      <path d="M32 4v56"/>
      <path d="M8 28h48"/>
      <rect x="10" y="8" width="20" height="18" fill="#4169E1" opacity="0.3"/>
      <rect x="34" y="8" width="20" height="18" fill="#DC143C" opacity="0.3"/>
      <rect x="10" y="30" width="20" height="26" fill="#4169E1" opacity="0.2"/>
      <rect x="34" y="30" width="20" height="26" fill="#DC143C" opacity="0.2"/>
      <text x="14" y="20" font-size="3" fill="currentColor" stroke="none">RA</text>
      <text x="40" y="20" font-size="3" fill="currentColor" stroke="none">LA</text>
      <text x="14" y="46" font-size="3" fill="currentColor" stroke="none">RV</text>
      <text x="40" y="46" font-size="3" fill="currentColor" stroke="none">LV</text>
    </svg>`
  },
  {
    id: 'anat-aorta',
    name: 'Aorta',
    domain: 'biology',
    category: 'cardiovascular',
    tags: ['aorta', 'ascending', 'arch', 'descending', 'thoracic', 'abdominal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 56V32c0-8 4-16 4-20s4-8 12-8c8 0 12 8 12 16v36" fill="#DC143C" opacity="0.2" stroke-width="3"/>
      <path d="M24 56V32c0-8 4-16 4-20s4-8 12-8c8 0 12 8 12 16v36" stroke-width="2"/>
      <path d="M28 12l-12-4"/>
      <path d="M36 8l0-4"/>
      <path d="M44 12l12-4"/>
      <text x="4" y="12" font-size="3" fill="currentColor" stroke="none">Brachioceph.</text>
      <text x="32" y="6" font-size="3" fill="currentColor" stroke="none">L. Carotid</text>
      <text x="48" y="12" font-size="3" fill="currentColor" stroke="none">L. Subcl.</text>
    </svg>`
  },
  {
    id: 'anat-vena-cava',
    name: 'Vena Cava',
    domain: 'biology',
    category: 'cardiovascular',
    tags: ['vena cava', 'SVC', 'IVC', 'venous return', 'great veins'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 4v20c0 4 4 8 8 8s8-4 8-8V4" stroke="#4169E1" stroke-width="3"/>
      <ellipse cx="32" cy="32" rx="8" ry="4" fill="#4169E1" opacity="0.2"/>
      <path d="M24 60v-20c0-4 4-8 8-8s8 4 8 8v20" stroke="#4169E1" stroke-width="3"/>
      <text x="4" y="12" font-size="4" fill="currentColor" stroke="none">SVC</text>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">IVC</text>
      <text x="44" y="32" font-size="3" fill="currentColor" stroke="none">RA</text>
    </svg>`
  },
  {
    id: 'anat-artery-structure',
    name: 'Artery Cross Section',
    domain: 'biology',
    category: 'cardiovascular',
    tags: ['artery', 'tunica', 'intima', 'media', 'adventitia', 'layers'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="18" fill="#CD5C5C" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <circle cx="32" cy="32" r="12" fill="#FFB6C1" opacity="0.3"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="6" fill="#DC143C" opacity="0.3"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Adventitia | Media | Intima | Lumen</text>
    </svg>`
  },
  {
    id: 'anat-capillary-bed',
    name: 'Capillary Bed',
    domain: 'biology',
    category: 'cardiovascular',
    tags: ['capillary', 'gas exchange', 'arteriole', 'venule', 'microcirculation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h8" stroke="#DC143C" stroke-width="3"/>
      <path d="M16 32c4-8 8-12 16-12s12 4 16 12" stroke="#DC143C" stroke-width="1"/>
      <path d="M16 32c4 8 8 12 16 12s12-4 16-12" stroke="#4169E1" stroke-width="1"/>
      <path d="M48 32h8" stroke="#4169E1" stroke-width="3"/>
      <circle cx="24" cy="24" r="2" fill="#DC143C" opacity="0.5"/>
      <circle cx="32" cy="20" r="2" fill="#DC143C" opacity="0.5"/>
      <circle cx="40" cy="24" r="2" fill="#4169E1" opacity="0.5"/>
      <circle cx="24" cy="40" r="2" fill="#4169E1" opacity="0.5"/>
      <circle cx="32" cy="44" r="2" fill="#4169E1" opacity="0.5"/>
      <circle cx="40" cy="40" r="2" fill="#4169E1" opacity="0.5"/>
      <text x="4" y="28" font-size="3" fill="#DC143C" stroke="none">Art.</text>
      <text x="50" y="28" font-size="3" fill="#4169E1" stroke="none">Ven.</text>
    </svg>`
  },
  // ===========================================================================
  // NERVOUS SYSTEM
  // ===========================================================================
  {
    id: 'anat-brain-lateral',
    name: 'Brain Lateral View',
    domain: 'biology',
    category: 'nervous',
    tags: ['brain', 'cerebrum', 'frontal', 'parietal', 'temporal', 'occipital'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-16 12-24 28-24s20 8 20 24c0 12-8 20-20 24H20c-8-4-12-12-12-24z" fill="currentColor" opacity="0.15"/>
      <path d="M8 32c0-16 12-24 28-24s20 8 20 24c0 12-8 20-20 24H20c-8-4-12-12-12-24z"/>
      <path d="M28 8c-4 16-4 32 0 48"/>
      <path d="M44 16c-8 8-8 24 0 32"/>
      <ellipse cx="20" cy="52" rx="8" ry="6" fill="currentColor" opacity="0.2"/>
      <path d="M12 56l-4 4"/>
      <text x="16" y="28" font-size="3" fill="currentColor" stroke="none">Frontal</text>
      <text x="36" y="20" font-size="3" fill="currentColor" stroke="none">Parietal</text>
      <text x="48" y="36" font-size="3" fill="currentColor" stroke="none">Occipital</text>
      <text x="20" y="44" font-size="3" fill="currentColor" stroke="none">Temporal</text>
    </svg>`
  },
  {
    id: 'anat-brain-midsagittal',
    name: 'Brain Midsagittal',
    domain: 'biology',
    category: 'nervous',
    tags: ['brain', 'midsagittal', 'corpus callosum', 'thalamus', 'brainstem'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28c0-14 12-20 24-20s20 6 20 20c0 10-8 20-20 24c-8 4-16-2-20-8c-4-4-4-10-4-16z" fill="currentColor" opacity="0.15"/>
      <path d="M8 28c0-14 12-20 24-20s20 6 20 20c0 10-8 20-20 24c-8 4-16-2-20-8c-4-4-4-10-4-16z"/>
      <path d="M16 28c8-2 24-2 32 0" stroke-width="2"/>
      <ellipse cx="32" cy="32" rx="6" ry="4" fill="currentColor" opacity="0.3"/>
      <ellipse cx="28" cy="48" rx="8" ry="6" fill="currentColor" opacity="0.2"/>
      <path d="M20 54l-4 6" stroke-width="2"/>
      <text x="20" y="24" font-size="3" fill="currentColor" stroke="none">Corpus callosum</text>
      <text x="36" y="34" font-size="3" fill="currentColor" stroke="none">Thalamus</text>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Brainstem</text>
    </svg>`
  },
  {
    id: 'anat-spinal-cord',
    name: 'Spinal Cord Cross Section',
    domain: 'biology',
    category: 'nervous',
    tags: ['spinal cord', 'gray matter', 'white matter', 'dorsal', 'ventral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <path d="M32 16c-4 4-8 4-12 8c4 0 8 4 12 8c4-4 8-8 12-8c-4-4-8-4-12-8z" fill="#808080" opacity="0.4"/>
      <path d="M32 48c-4-4-8-4-12-8c4 0 8-4 12-8c4 4 8 8 12 8c-4 4-8 4-12 8z" fill="#808080" opacity="0.4"/>
      <path d="M8 28l-4-4"/>
      <path d="M56 28l4-4"/>
      <path d="M8 36l-4 4"/>
      <path d="M56 36l4 4"/>
      <text x="28" y="8" font-size="3" fill="currentColor" stroke="none">Dorsal</text>
      <text x="26" y="60" font-size="3" fill="currentColor" stroke="none">Ventral</text>
    </svg>`
  },
  {
    id: 'anat-neuron',
    name: 'Neuron',
    domain: 'biology',
    category: 'nervous',
    tags: ['neuron', 'axon', 'dendrite', 'cell body', 'synapse', 'myelin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="16" cy="32" r="8"/>
      <path d="M4 24l8 8-8 8"/>
      <path d="M4 28l8 4"/>
      <path d="M4 36l8-4"/>
      <path d="M24 32h32"/>
      <ellipse cx="32" cy="32" rx="4" ry="2" fill="#FFD700" opacity="0.5"/>
      <ellipse cx="42" cy="32" rx="4" ry="2" fill="#FFD700" opacity="0.5"/>
      <ellipse cx="52" cy="32" rx="4" ry="2" fill="#FFD700" opacity="0.5"/>
      <path d="M56 28l4-4M56 32l6 0M56 36l4 4"/>
      <text x="4" y="50" font-size="3" fill="currentColor" stroke="none">Dendrites</text>
      <text x="12" y="44" font-size="3" fill="currentColor" stroke="none">Soma</text>
      <text x="36" y="44" font-size="3" fill="currentColor" stroke="none">Myelin</text>
    </svg>`
  },
  {
    id: 'anat-peripheral-nerve',
    name: 'Peripheral Nerve',
    domain: 'biology',
    category: 'nervous',
    tags: ['peripheral nerve', 'fascicle', 'epineurium', 'perineurium', 'endoneurium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <circle cx="24" cy="24" r="6" fill="#FFD700" opacity="0.3"/>
      <circle cx="40" cy="24" r="6" fill="#FFD700" opacity="0.3"/>
      <circle cx="24" cy="40" r="6" fill="#FFD700" opacity="0.3"/>
      <circle cx="40" cy="40" r="6" fill="#FFD700" opacity="0.3"/>
      <circle cx="32" cy="32" r="4" fill="#FFD700" opacity="0.3"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Fascicles in epineurium</text>
    </svg>`
  },
  // ===========================================================================
  // RESPIRATORY SYSTEM
  // ===========================================================================
  {
    id: 'anat-lungs',
    name: 'Lungs',
    domain: 'biology',
    category: 'respiratory',
    tags: ['lungs', 'lobes', 'bronchi', 'trachea', 'pulmonary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v16"/>
      <path d="M32 20l-12 8v20c0 4 4 8 12 8"/>
      <path d="M32 20l12 8v20c0 4-4 8-12 8"/>
      <ellipse cx="20" cy="36" rx="12" ry="18" fill="currentColor" opacity="0.15"/>
      <ellipse cx="44" cy="36" rx="12" ry="18" fill="currentColor" opacity="0.15"/>
      <ellipse cx="20" cy="36" rx="12" ry="18"/>
      <ellipse cx="44" cy="36" rx="12" ry="18"/>
      <path d="M12 32h16"/>
      <path d="M12 44h16"/>
      <path d="M36 36h16"/>
      <text x="14" y="28" font-size="3" fill="currentColor" stroke="none">UL</text>
      <text x="14" y="40" font-size="3" fill="currentColor" stroke="none">ML</text>
      <text x="14" y="52" font-size="3" fill="currentColor" stroke="none">LL</text>
    </svg>`
  },
  {
    id: 'anat-alveoli',
    name: 'Alveoli',
    domain: 'biology',
    category: 'respiratory',
    tags: ['alveoli', 'gas exchange', 'type I', 'type II', 'surfactant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v12"/>
      <circle cx="20" cy="28" r="10" fill="currentColor" opacity="0.1"/>
      <circle cx="44" cy="28" r="10" fill="currentColor" opacity="0.1"/>
      <circle cx="20" cy="48" r="10" fill="currentColor" opacity="0.1"/>
      <circle cx="44" cy="48" r="10" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="38" r="10" fill="currentColor" opacity="0.1"/>
      <circle cx="20" cy="28" r="10"/>
      <circle cx="44" cy="28" r="10"/>
      <circle cx="20" cy="48" r="10"/>
      <circle cx="44" cy="48" r="10"/>
      <circle cx="32" cy="38" r="10"/>
      <path d="M32 16l-12 12M32 16l12 12"/>
      <text x="4" y="60" font-size="3" fill="currentColor" stroke="none">Alveolar sacs</text>
    </svg>`
  },
  {
    id: 'anat-diaphragm',
    name: 'Diaphragm',
    domain: 'biology',
    category: 'respiratory',
    tags: ['diaphragm', 'respiratory muscle', 'dome', 'central tendon', 'crura'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32c8-16 24-16 28-16s20 0 28 16c0 8-8 16-28 16S4 40 4 32z" fill="#CD5C5C" opacity="0.2"/>
      <path d="M4 32c8-16 24-16 28-16s20 0 28 16c0 8-8 16-28 16S4 40 4 32z"/>
      <ellipse cx="32" cy="32" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="28" r="3" fill="currentColor" opacity="0.1"/>
      <circle cx="40" cy="28" r="2" fill="currentColor" opacity="0.1"/>
      <text x="26" y="36" font-size="3" fill="currentColor" stroke="none">Central</text>
      <text x="26" y="42" font-size="3" fill="currentColor" stroke="none">tendon</text>
      <text x="14" y="28" font-size="3" fill="currentColor" stroke="none">IVC</text>
      <text x="44" y="28" font-size="3" fill="currentColor" stroke="none">Aorta</text>
    </svg>`
  },
  {
    id: 'anat-larynx',
    name: 'Larynx',
    domain: 'biology',
    category: 'respiratory',
    tags: ['larynx', 'voice box', 'vocal cords', 'epiglottis', 'thyroid cartilage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16l4 16h-24l4-16z" fill="currentColor" opacity="0.15"/>
      <path d="M24 8h16l4 16h-24l4-16z"/>
      <path d="M20 8c-4-4-4-4 0-4h24c4 0 4 0 0 4"/>
      <ellipse cx="32" cy="16" rx="6" ry="2" fill="currentColor" opacity="0.2"/>
      <path d="M20 24h24v32c0 4-8 4-12 4s-12 0-12-4V24z" fill="currentColor" opacity="0.1"/>
      <path d="M20 24h24v32c0 4-8 4-12 4s-12 0-12-4V24z"/>
      <text x="4" y="6" font-size="3" fill="currentColor" stroke="none">Epiglottis</text>
      <text x="40" y="16" font-size="3" fill="currentColor" stroke="none">Vocal cords</text>
      <text x="40" y="40" font-size="3" fill="currentColor" stroke="none">Trachea</text>
    </svg>`
  },
  // ===========================================================================
  // DIGESTIVE SYSTEM
  // ===========================================================================
  {
    id: 'anat-gi-tract-overview',
    name: 'GI Tract Overview',
    domain: 'biology',
    category: 'digestive',
    tags: ['GI tract', 'digestive system', 'alimentary canal', 'overview'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="8" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
      <path d="M32 12v4"/>
      <ellipse cx="32" cy="20" rx="10" ry="6" fill="currentColor" opacity="0.15"/>
      <path d="M32 26c-4 4-8 8-8 12s4 8 8 8"/>
      <path d="M32 46c4 0 8-4 8-8s-4-8-8-8"/>
      <path d="M32 46v8"/>
      <rect x="26" y="54" width="12" height="6" fill="currentColor" opacity="0.1"/>
      <text x="4" y="10" font-size="3" fill="currentColor" stroke="none">Mouth</text>
      <text x="44" y="22" font-size="3" fill="currentColor" stroke="none">Stomach</text>
      <text x="44" y="38" font-size="3" fill="currentColor" stroke="none">Small int.</text>
      <text x="44" y="58" font-size="3" fill="currentColor" stroke="none">Large int.</text>
    </svg>`
  },
  {
    id: 'anat-stomach',
    name: 'Stomach',
    domain: 'biology',
    category: 'digestive',
    tags: ['stomach', 'fundus', 'body', 'antrum', 'pylorus', 'cardia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-8 0-12 8-12 16s4 24 16 28c8 4 20 0 24-8s4-24-4-32c-4-4-8-4-12-4h-12z" fill="currentColor" opacity="0.15"/>
      <path d="M20 8c-8 0-12 8-12 16s4 24 16 28c8 4 20 0 24-8s4-24-4-32c-4-4-8-4-12-4h-12z"/>
      <path d="M20 8l-4-4"/>
      <path d="M48 44l8 4"/>
      <text x="12" y="20" font-size="3" fill="currentColor" stroke="none">Fundus</text>
      <text x="20" y="34" font-size="3" fill="currentColor" stroke="none">Body</text>
      <text x="36" y="44" font-size="3" fill="currentColor" stroke="none">Antrum</text>
      <text x="48" y="52" font-size="3" fill="currentColor" stroke="none">Pylorus</text>
    </svg>`
  },
  {
    id: 'anat-small-intestine',
    name: 'Small Intestine',
    domain: 'biology',
    category: 'digestive',
    tags: ['small intestine', 'duodenum', 'jejunum', 'ileum', 'villi'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8c8 0 12 8 12 8s-4 8-12 8" fill="currentColor" opacity="0.2"/>
      <path d="M8 8c8 0 12 8 12 8s-4 8-12 8"/>
      <path d="M8 24c12 0 20 8 20 8s-8 8-20 8" fill="currentColor" opacity="0.15"/>
      <path d="M8 24c12 0 20 8 20 8s-8 8-20 8"/>
      <path d="M8 40c16 0 28 8 28 8s-12 8-28 8" fill="currentColor" opacity="0.1"/>
      <path d="M8 40c16 0 28 8 28 8s-12 8-28 8"/>
      <text x="40" y="16" font-size="4" fill="currentColor" stroke="none">Duodenum</text>
      <text x="40" y="32" font-size="4" fill="currentColor" stroke="none">Jejunum</text>
      <text x="40" y="48" font-size="4" fill="currentColor" stroke="none">Ileum</text>
    </svg>`
  },
  {
    id: 'anat-large-intestine',
    name: 'Large Intestine',
    domain: 'biology',
    category: 'digestive',
    tags: ['large intestine', 'colon', 'cecum', 'ascending', 'transverse', 'descending'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 48c0 8 4 12 12 12h24c8 0 8-8 8-12V20c0-8-4-12-8-12H28c-8 0-12 4-12 8" fill="currentColor" opacity="0.1"/>
      <path d="M12 48c0 8 4 12 12 12h24c8 0 8-8 8-12V20c0-8-4-12-8-12H28c-8 0-12 4-12 8"/>
      <circle cx="12" cy="48" r="6" fill="currentColor" opacity="0.2"/>
      <path d="M12 54l-4 6"/>
      <text x="4" y="44" font-size="3" fill="currentColor" stroke="none">Cecum</text>
      <text x="48" y="36" font-size="3" fill="currentColor" stroke="none">Asc.</text>
      <text x="28" y="12" font-size="3" fill="currentColor" stroke="none">Trans.</text>
      <text x="4" y="28" font-size="3" fill="currentColor" stroke="none">Desc.</text>
    </svg>`
  },
  {
    id: 'anat-liver',
    name: 'Liver',
    domain: 'biology',
    category: 'digestive',
    tags: ['liver', 'hepatic', 'lobes', 'portal', 'bile'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24c0-8 8-16 24-16s24 8 24 16c0 16-8 32-24 32S8 40 8 24z" fill="#8B4513" opacity="0.2"/>
      <path d="M8 24c0-8 8-16 24-16s24 8 24 16c0 16-8 32-24 32S8 40 8 24z"/>
      <path d="M32 8v48"/>
      <ellipse cx="28" cy="40" rx="4" ry="6" fill="#22C55E" opacity="0.3"/>
      <text x="12" y="28" font-size="4" fill="currentColor" stroke="none">Left lobe</text>
      <text x="36" y="28" font-size="4" fill="currentColor" stroke="none">Right lobe</text>
      <text x="32" y="44" font-size="3" fill="currentColor" stroke="none">GB</text>
    </svg>`
  },
  {
    id: 'anat-pancreas',
    name: 'Pancreas',
    domain: 'biology',
    category: 'digestive',
    tags: ['pancreas', 'head', 'body', 'tail', 'islets', 'exocrine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-8 8-12 16-12h24c8 0 8 8 8 12s0 12-8 12H24c-8 0-16-4-16-12z" fill="#FFD700" opacity="0.2"/>
      <path d="M8 32c0-8 8-12 16-12h24c8 0 8 8 8 12s0 12-8 12H24c-8 0-16-4-16-12z"/>
      <circle cx="16" cy="32" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="32" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="48" cy="32" r="2" fill="currentColor" opacity="0.3"/>
      <text x="12" y="52" font-size="4" fill="currentColor" stroke="none">Head</text>
      <text x="28" y="52" font-size="4" fill="currentColor" stroke="none">Body</text>
      <text x="44" y="52" font-size="4" fill="currentColor" stroke="none">Tail</text>
    </svg>`
  },
  // ===========================================================================
  // URINARY SYSTEM
  // ===========================================================================
  {
    id: 'anat-urinary-system',
    name: 'Urinary System Overview',
    domain: 'biology',
    category: 'urinary',
    tags: ['urinary system', 'kidneys', 'ureters', 'bladder', 'urethra'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="16" rx="8" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="44" cy="16" rx="8" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="20" cy="16" rx="8" ry="10"/>
      <ellipse cx="44" cy="16" rx="8" ry="10"/>
      <path d="M20 26v16"/>
      <path d="M44 26v16"/>
      <ellipse cx="32" cy="48" rx="12" ry="8" fill="currentColor" opacity="0.15"/>
      <ellipse cx="32" cy="48" rx="12" ry="8"/>
      <path d="M32 56v4"/>
      <text x="4" y="18" font-size="3" fill="currentColor" stroke="none">Kidney</text>
      <text x="24" y="36" font-size="3" fill="currentColor" stroke="none">Ureter</text>
      <text x="46" y="48" font-size="3" fill="currentColor" stroke="none">Bladder</text>
    </svg>`
  },
  {
    id: 'anat-kidney-anatomy',
    name: 'Kidney Internal Anatomy',
    domain: 'biology',
    category: 'urinary',
    tags: ['kidney', 'cortex', 'medulla', 'pelvis', 'nephron', 'renal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32c0-16 8-24 16-24s16 8 16 24-8 24-16 24-16-8-16-24z" fill="currentColor" opacity="0.15"/>
      <path d="M16 32c0-16 8-24 16-24s16 8 16 24-8 24-16 24-16-8-16-24z"/>
      <path d="M24 20v24" stroke-dasharray="2 2"/>
      <ellipse cx="36" cy="32" rx="8" ry="12" fill="currentColor" opacity="0.2"/>
      <path d="M44 32h12"/>
      <text x="4" y="24" font-size="3" fill="currentColor" stroke="none">Cortex</text>
      <text x="4" y="40" font-size="3" fill="currentColor" stroke="none">Medulla</text>
      <text x="30" y="34" font-size="3" fill="currentColor" stroke="none">Pelvis</text>
    </svg>`
  },
  // ===========================================================================
  // REPRODUCTIVE SYSTEM
  // ===========================================================================
  {
    id: 'anat-male-repro',
    name: 'Male Reproductive System',
    domain: 'biology',
    category: 'reproductive',
    tags: ['male', 'reproductive', 'testes', 'prostate', 'seminal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="24" rx="8" ry="4"/>
      <path d="M32 28v8"/>
      <ellipse cx="32" cy="40" rx="6" ry="4" fill="currentColor" opacity="0.15"/>
      <path d="M32 44v8"/>
      <ellipse cx="24" cy="56" rx="6" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="40" cy="56" rx="6" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="24" cy="56" rx="6" ry="4"/>
      <ellipse cx="40" cy="56" rx="6" ry="4"/>
      <text x="44" y="24" font-size="3" fill="currentColor" stroke="none">Seminal V.</text>
      <text x="44" y="40" font-size="3" fill="currentColor" stroke="none">Prostate</text>
      <text x="44" y="56" font-size="3" fill="currentColor" stroke="none">Testes</text>
    </svg>`
  },
  {
    id: 'anat-female-repro',
    name: 'Female Reproductive System',
    domain: 'biology',
    category: 'reproductive',
    tags: ['female', 'reproductive', 'uterus', 'ovaries', 'fallopian'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 16c-8 0-12 8-12 8l12-4 8 4 8-4 12 4s-4-8-12-8" fill="currentColor" opacity="0.1"/>
      <ellipse cx="12" cy="24" rx="6" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="52" cy="24" rx="6" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="12" cy="24" rx="6" ry="4"/>
      <ellipse cx="52" cy="24" rx="6" ry="4"/>
      <path d="M18 24c4-4 10-4 14 0s10 4 14 0"/>
      <path d="M24 28c0 8 4 20 8 24 4-4 8-16 8-24" fill="currentColor" opacity="0.15"/>
      <path d="M24 28c0 8 4 20 8 24 4-4 8-16 8-24"/>
      <text x="4" y="16" font-size="3" fill="currentColor" stroke="none">Ovary</text>
      <text x="24" y="12" font-size="3" fill="currentColor" stroke="none">Fallopian tube</text>
      <text x="36" y="40" font-size="3" fill="currentColor" stroke="none">Uterus</text>
    </svg>`
  },
  // ===========================================================================
  // ENDOCRINE SYSTEM
  // ===========================================================================
  {
    id: 'anat-endocrine-overview',
    name: 'Endocrine System Overview',
    domain: 'biology',
    category: 'endocrine',
    tags: ['endocrine', 'glands', 'hormones', 'pituitary', 'thyroid', 'adrenal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="8" r="4" fill="currentColor" opacity="0.3"/>
      <ellipse cx="32" cy="18" rx="8" ry="3" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="26" rx="3" ry="2" fill="currentColor" opacity="0.2"/>
      <ellipse cx="20" cy="36" rx="4" ry="3" fill="currentColor" opacity="0.2"/>
      <ellipse cx="44" cy="36" rx="4" ry="3" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="44" rx="6" ry="3" fill="currentColor" opacity="0.2"/>
      <ellipse cx="24" cy="56" rx="4" ry="3" fill="currentColor" opacity="0.2"/>
      <ellipse cx="40" cy="56" rx="4" ry="3" fill="currentColor" opacity="0.2"/>
      <text x="40" y="10" font-size="3" fill="currentColor" stroke="none">Pituitary</text>
      <text x="44" y="20" font-size="3" fill="currentColor" stroke="none">Thyroid</text>
      <text x="4" y="38" font-size="3" fill="currentColor" stroke="none">Adrenal</text>
      <text x="44" y="46" font-size="3" fill="currentColor" stroke="none">Pancreas</text>
      <text x="46" y="58" font-size="3" fill="currentColor" stroke="none">Gonads</text>
    </svg>`
  },
  {
    id: 'anat-pituitary',
    name: 'Pituitary Gland',
    domain: 'biology',
    category: 'endocrine',
    tags: ['pituitary', 'hypophysis', 'anterior', 'posterior', 'master gland'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="16" ry="12" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="40" rx="16" ry="12"/>
      <path d="M32 28v-20"/>
      <path d="M28 8l4-4 4 4"/>
      <path d="M32 28v12"/>
      <path d="M16 40h32" stroke-dasharray="2 2"/>
      <text x="18" y="44" font-size="3" fill="currentColor" stroke="none">Anterior</text>
      <text x="36" y="44" font-size="3" fill="currentColor" stroke="none">Posterior</text>
      <text x="36" y="16" font-size="3" fill="currentColor" stroke="none">Infundibulum</text>
    </svg>`
  },
  {
    id: 'anat-thyroid',
    name: 'Thyroid Gland',
    domain: 'biology',
    category: 'endocrine',
    tags: ['thyroid', 'T3', 'T4', 'isthmus', 'parathyroid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="32" rx="12" ry="16" fill="currentColor" opacity="0.2"/>
      <ellipse cx="44" cy="32" rx="12" ry="16" fill="currentColor" opacity="0.2"/>
      <ellipse cx="20" cy="32" rx="12" ry="16"/>
      <ellipse cx="44" cy="32" rx="12" ry="16"/>
      <path d="M28 32h8" stroke-width="3"/>
      <circle cx="20" cy="24" r="2" fill="#FFD700"/>
      <circle cx="20" cy="40" r="2" fill="#FFD700"/>
      <circle cx="44" cy="24" r="2" fill="#FFD700"/>
      <circle cx="44" cy="40" r="2" fill="#FFD700"/>
      <text x="26" y="52" font-size="3" fill="currentColor" stroke="none">Isthmus</text>
      <text x="4" y="58" font-size="3" fill="#FFD700" stroke="none">Parathyroids</text>
    </svg>`
  },
  {
    id: 'anat-adrenal',
    name: 'Adrenal Gland',
    domain: 'biology',
    category: 'endocrine',
    tags: ['adrenal', 'cortex', 'medulla', 'cortisol', 'aldosterone', 'epinephrine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 24c0-8 8-16 16-16s16 8 16 16l-4 24H20l-4-24z" fill="currentColor" opacity="0.2"/>
      <path d="M16 24c0-8 8-16 16-16s16 8 16 16l-4 24H20l-4-24z"/>
      <path d="M24 24c0-4 4-8 8-8s8 4 8 8l-2 12H26l-2-12z" fill="#FFA500" opacity="0.3"/>
      <ellipse cx="32" cy="56" rx="12" ry="4" fill="currentColor" opacity="0.15"/>
      <text x="4" y="32" font-size="3" fill="currentColor" stroke="none">Cortex</text>
      <text x="36" y="28" font-size="3" fill="currentColor" stroke="none">Medulla</text>
      <text x="40" y="56" font-size="3" fill="currentColor" stroke="none">Kidney</text>
    </svg>`
  },
  // ===========================================================================
  // LYMPHATIC SYSTEM
  // ===========================================================================
  {
    id: 'anat-lymphatic-overview',
    name: 'Lymphatic System Overview',
    domain: 'biology',
    category: 'lymphatic',
    tags: ['lymphatic', 'lymph nodes', 'spleen', 'thymus', 'vessels'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="8" rx="6" ry="4" fill="#90EE90" opacity="0.3"/>
      <ellipse cx="32" cy="8" rx="6" ry="4"/>
      <circle cx="16" cy="20" r="3" fill="#90EE90" opacity="0.3"/>
      <circle cx="48" cy="20" r="3" fill="#90EE90" opacity="0.3"/>
      <ellipse cx="16" cy="40" rx="8" ry="6" fill="#90EE90" opacity="0.3"/>
      <ellipse cx="16" cy="40" rx="8" ry="6"/>
      <circle cx="24" cy="56" r="3" fill="#90EE90" opacity="0.3"/>
      <circle cx="40" cy="56" r="3" fill="#90EE90" opacity="0.3"/>
      <path d="M32 12v44" stroke="#90EE90" stroke-dasharray="2 2"/>
      <text x="40" y="10" font-size="3" fill="currentColor" stroke="none">Thymus</text>
      <text x="4" y="20" font-size="3" fill="currentColor" stroke="none">Nodes</text>
      <text x="24" y="42" font-size="3" fill="currentColor" stroke="none">Spleen</text>
    </svg>`
  },
  {
    id: 'anat-lymph-node',
    name: 'Lymph Node Structure',
    domain: 'biology',
    category: 'lymphatic',
    tags: ['lymph node', 'cortex', 'medulla', 'afferent', 'efferent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24" fill="#90EE90" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <ellipse cx="32" cy="32" rx="12" ry="16" fill="currentColor" opacity="0.15"/>
      <circle cx="24" cy="20" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="40" cy="20" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="44" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="40" cy="44" r="4" fill="currentColor" opacity="0.2"/>
      <path d="M12 20l-8-8M12 44l-8 8M52 20l8-8M52 44l8 8"/>
      <path d="M32 56l0 4"/>
      <text x="4" y="10" font-size="3" fill="currentColor" stroke="none">Afferent</text>
      <text x="36" y="60" font-size="3" fill="currentColor" stroke="none">Efferent</text>
    </svg>`
  },
  {
    id: 'anat-spleen',
    name: 'Spleen',
    domain: 'biology',
    category: 'lymphatic',
    tags: ['spleen', 'red pulp', 'white pulp', 'splenic', 'lymphoid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32c0-12 8-24 20-24s20 12 20 24-8 24-20 24-20-12-20-24z" fill="#8B0000" opacity="0.2"/>
      <path d="M16 32c0-12 8-24 20-24s20 12 20 24-8 24-20 24-20-12-20-24z"/>
      <circle cx="28" cy="24" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="40" cy="28" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="40" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M20 32l-12 0"/>
      <text x="4" y="28" font-size="3" fill="currentColor" stroke="none">Splenic a.</text>
      <text x="44" y="48" font-size="3" fill="currentColor" stroke="none">White pulp</text>
    </svg>`
  },
  // ===========================================================================
  // INTEGUMENTARY SYSTEM
  // ===========================================================================
  {
    id: 'anat-skin-layers',
    name: 'Skin Layers',
    domain: 'biology',
    category: 'integumentary',
    tags: ['skin', 'epidermis', 'dermis', 'hypodermis', 'layers'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="12" fill="#DEB887" opacity="0.4"/>
      <rect x="4" y="16" width="56" height="20" fill="#FFDAB9" opacity="0.4"/>
      <rect x="4" y="36" width="56" height="24" fill="#FFE4B5" opacity="0.3"/>
      <path d="M4 4h56v56H4z"/>
      <path d="M4 16h56"/>
      <path d="M4 36h56"/>
      <path d="M20 8v4M32 8v4M44 8v4" stroke-width="1"/>
      <ellipse cx="16" cy="26" rx="3" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="40" cy="26" rx="3" ry="4" fill="currentColor" opacity="0.2"/>
      <circle cx="28" cy="48" r="6" fill="#FFD700" opacity="0.3"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Epidermis | Dermis | Hypodermis</text>
    </svg>`
  },
  {
    id: 'anat-hair-follicle',
    name: 'Hair Follicle',
    domain: 'biology',
    category: 'integumentary',
    tags: ['hair', 'follicle', 'shaft', 'bulb', 'sebaceous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="56" height="8" fill="#DEB887" opacity="0.3"/>
      <path d="M4 8h56"/>
      <path d="M4 16h56"/>
      <path d="M32 4v12" stroke-width="2"/>
      <path d="M28 16v24c0 8 4 16 4 20 0-4 4-12 4-20v-24" fill="#A0522D" opacity="0.3"/>
      <path d="M28 16v24c0 8 4 16 4 20 0-4 4-12 4-20v-24"/>
      <ellipse cx="32" cy="60" rx="6" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="42" cy="24" rx="4" ry="6" fill="#FFD700" opacity="0.3"/>
      <text x="46" y="26" font-size="3" fill="currentColor" stroke="none">Sebaceous</text>
      <text x="36" y="60" font-size="3" fill="currentColor" stroke="none">Bulb</text>
    </svg>`
  },
  // ===========================================================================
  // ANATOMICAL PLANES AND DIRECTIONS
  // ===========================================================================
  {
    id: 'anat-body-planes',
    name: 'Anatomical Planes',
    domain: 'biology',
    category: 'orientation',
    tags: ['planes', 'sagittal', 'coronal', 'transverse', 'anatomical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="8" ry="8" fill="currentColor" opacity="0.1"/>
      <rect x="24" y="20" width="16" height="24" fill="currentColor" opacity="0.1"/>
      <path d="M24 44l-4 16M40 44l4 16"/>
      <path d="M20 28l-8 8M44 28l8 8"/>
      <path d="M32 4v56" stroke="#DC143C" stroke-dasharray="3 2"/>
      <path d="M4 32h56" stroke="#4169E1" stroke-dasharray="3 2"/>
      <path d="M16 16l32 32" stroke="#22C55E" stroke-dasharray="3 2"/>
      <text x="36" y="10" font-size="3" fill="#DC143C" stroke="none">Sagittal</text>
      <text x="48" y="30" font-size="3" fill="#4169E1" stroke="none">Transverse</text>
      <text x="44" y="52" font-size="3" fill="#22C55E" stroke="none">Coronal</text>
    </svg>`
  },
  {
    id: 'anat-directional-terms',
    name: 'Directional Terms',
    domain: 'biology',
    category: 'orientation',
    tags: ['directional', 'superior', 'inferior', 'anterior', 'posterior', 'medial', 'lateral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="16" ry="20"/>
      <path d="M32 4v8M32 52v8"/>
      <path d="M4 32h8M52 32h8"/>
      <path d="M32 8l-4 4h8l-4-4z" fill="currentColor"/>
      <path d="M32 56l-4-4h8l-4 4z" fill="currentColor"/>
      <path d="M8 32l4-4v8l-4-4z" fill="currentColor"/>
      <path d="M56 32l-4-4v8l4-4z" fill="currentColor"/>
      <text x="26" y="6" font-size="3" fill="currentColor" stroke="none">Superior</text>
      <text x="26" y="62" font-size="3" fill="currentColor" stroke="none">Inferior</text>
      <text x="2" y="28" font-size="3" fill="currentColor" stroke="none">L</text>
      <text x="56" y="28" font-size="3" fill="currentColor" stroke="none">R</text>
    </svg>`
  },
  // ===========================================================================
  // SPECIAL SENSES
  // ===========================================================================
  {
    id: 'anat-eye-anatomy',
    name: 'Eye Anatomy',
    domain: 'biology',
    category: 'special-senses',
    tags: ['eye', 'cornea', 'lens', 'retina', 'optic nerve', 'vision'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="24"/>
      <path d="M8 32c4-8 12-8 16 0" fill="currentColor" opacity="0.2"/>
      <ellipse cx="20" cy="32" rx="8" ry="12" fill="#87CEEB" opacity="0.3"/>
      <circle cx="16" cy="32" r="4" fill="currentColor"/>
      <path d="M56 32h8" stroke-width="3"/>
      <text x="36" y="24" font-size="3" fill="currentColor" stroke="none">Vitreous</text>
      <text x="4" y="48" font-size="3" fill="currentColor" stroke="none">Cornea Lens</text>
      <text x="52" y="28" font-size="3" fill="currentColor" stroke="none">Optic n.</text>
    </svg>`
  },
  {
    id: 'anat-ear-anatomy',
    name: 'Ear Anatomy',
    domain: 'biology',
    category: 'special-senses',
    tags: ['ear', 'cochlea', 'vestibular', 'ossicles', 'tympanic', 'hearing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32c0-12 8-20 16-20v40c-8 0-16-8-16-20z" fill="currentColor" opacity="0.1"/>
      <path d="M4 32c0-12 8-20 16-20v40c-8 0-16-8-16-20z"/>
      <ellipse cx="24" cy="32" rx="2" ry="8" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="28" r="2" fill="currentColor"/>
      <circle cx="36" cy="32" r="2" fill="currentColor"/>
      <circle cx="32" cy="36" r="2" fill="currentColor"/>
      <path d="M44 28c8 0 12 4 12 8s-4 8-8 8" fill="currentColor" opacity="0.1"/>
      <circle cx="52" cy="40" r="6" fill="currentColor" opacity="0.15"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Outer</text>
      <text x="20" y="58" font-size="3" fill="currentColor" stroke="none">Middle</text>
      <text x="44" y="58" font-size="3" fill="currentColor" stroke="none">Inner</text>
    </svg>`
  },
  // ===========================================================================
  // HISTOLOGY & TISSUE TYPES
  // ===========================================================================
  {
    id: 'anat-epithelial-simple',
    name: 'Simple Epithelium',
    domain: 'biology',
    category: 'histology',
    tags: ['epithelium', 'simple', 'squamous', 'cuboidal', 'columnar', 'tissue'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="28" width="56" height="8" fill="currentColor" opacity="0.15"/>
      <rect x="4" y="28" width="56" height="8"/>
      <rect x="4" y="36" width="56" height="4" fill="#CD853F" opacity="0.3"/>
      <circle cx="12" cy="32" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="24" cy="32" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="36" cy="32" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="48" cy="32" r="2" fill="currentColor" opacity="0.5"/>
      <text x="4" y="24" font-size="3" fill="currentColor" stroke="none">Simple squamous</text>
      <text x="4" y="48" font-size="3" fill="currentColor" stroke="none">Basement membrane</text>
    </svg>`
  },
  {
    id: 'anat-epithelial-stratified',
    name: 'Stratified Epithelium',
    domain: 'biology',
    category: 'histology',
    tags: ['epithelium', 'stratified', 'layers', 'keratinized', 'tissue'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="56" height="6" fill="currentColor" opacity="0.1"/>
      <rect x="4" y="14" width="56" height="8" fill="currentColor" opacity="0.15"/>
      <rect x="4" y="22" width="56" height="10" fill="currentColor" opacity="0.2"/>
      <rect x="4" y="32" width="56" height="12" fill="currentColor" opacity="0.25"/>
      <rect x="4" y="44" width="56" height="4" fill="#CD853F" opacity="0.3"/>
      <path d="M4 8h56M4 14h56M4 22h56M4 32h56M4 44h56M4 48h56"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Stratified squamous</text>
    </svg>`
  },
  {
    id: 'anat-connective-tissue',
    name: 'Connective Tissue',
    domain: 'biology',
    category: 'histology',
    tags: ['connective', 'tissue', 'collagen', 'fibroblast', 'matrix'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" fill="currentColor" opacity="0.05"/>
      <path d="M8 8c16 4 32 4 48 0" stroke="#DAA520" stroke-width="1"/>
      <path d="M8 20c16 4 32 4 48 0" stroke="#DAA520" stroke-width="1"/>
      <path d="M8 32c16 4 32 4 48 0" stroke="#DAA520" stroke-width="1"/>
      <path d="M8 44c16 4 32 4 48 0" stroke="#DAA520" stroke-width="1"/>
      <path d="M8 56c16 4 32 4 48 0" stroke="#DAA520" stroke-width="1"/>
      <ellipse cx="20" cy="16" rx="4" ry="2" fill="currentColor" opacity="0.3"/>
      <ellipse cx="44" cy="28" rx="4" ry="2" fill="currentColor" opacity="0.3"/>
      <ellipse cx="28" cy="40" rx="4" ry="2" fill="currentColor" opacity="0.3"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Collagen fibers + Fibroblasts</text>
    </svg>`
  },
  {
    id: 'anat-adipose-tissue',
    name: 'Adipose Tissue',
    domain: 'biology',
    category: 'histology',
    tags: ['adipose', 'fat', 'adipocytes', 'lipid', 'tissue'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="10" fill="#FFFACD" opacity="0.4"/>
      <circle cx="40" cy="16" r="10" fill="#FFFACD" opacity="0.4"/>
      <circle cx="28" cy="32" r="10" fill="#FFFACD" opacity="0.4"/>
      <circle cx="52" cy="32" r="8" fill="#FFFACD" opacity="0.4"/>
      <circle cx="16" cy="48" r="10" fill="#FFFACD" opacity="0.4"/>
      <circle cx="44" cy="48" r="10" fill="#FFFACD" opacity="0.4"/>
      <circle cx="16" cy="16" r="10"/>
      <circle cx="40" cy="16" r="10"/>
      <circle cx="28" cy="32" r="10"/>
      <circle cx="52" cy="32" r="8"/>
      <circle cx="16" cy="48" r="10"/>
      <circle cx="44" cy="48" r="10"/>
      <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="40" cy="16" r="2" fill="currentColor" opacity="0.5"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Adipocytes (fat cells)</text>
    </svg>`
  },
  {
    id: 'anat-cartilage-hyaline',
    name: 'Hyaline Cartilage',
    domain: 'biology',
    category: 'histology',
    tags: ['cartilage', 'hyaline', 'chondrocytes', 'lacunae', 'matrix'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" fill="#B0E0E6" opacity="0.3"/>
      <ellipse cx="16" cy="20" rx="4" ry="6" fill="currentColor" opacity="0.3"/>
      <ellipse cx="40" cy="16" rx="4" ry="6" fill="currentColor" opacity="0.3"/>
      <ellipse cx="28" cy="36" rx="4" ry="6" fill="currentColor" opacity="0.3"/>
      <ellipse cx="52" cy="32" rx="4" ry="6" fill="currentColor" opacity="0.3"/>
      <ellipse cx="16" cy="52" rx="4" ry="6" fill="currentColor" opacity="0.3"/>
      <ellipse cx="44" cy="48" rx="4" ry="6" fill="currentColor" opacity="0.3"/>
      <circle cx="16" cy="20" r="2" fill="currentColor"/>
      <circle cx="40" cy="16" r="2" fill="currentColor"/>
      <circle cx="28" cy="36" r="2" fill="currentColor"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Chondrocytes in lacunae</text>
    </svg>`
  },
  {
    id: 'anat-bone-compact',
    name: 'Compact Bone Histology',
    domain: 'biology',
    category: 'histology',
    tags: ['bone', 'compact', 'osteon', 'haversian', 'osteocytes'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="18" fill="currentColor" opacity="0.15"/>
      <circle cx="32" cy="32" r="18"/>
      <circle cx="32" cy="32" r="12" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.25"/>
      <circle cx="32" cy="32" r="6"/>
      <circle cx="32" cy="32" r="3" fill="#DC143C" opacity="0.4"/>
      <circle cx="20" cy="32" r="1" fill="currentColor"/>
      <circle cx="26" cy="32" r="1" fill="currentColor"/>
      <circle cx="38" cy="32" r="1" fill="currentColor"/>
      <circle cx="44" cy="32" r="1" fill="currentColor"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Osteon (Haversian system)</text>
    </svg>`
  },
  {
    id: 'anat-blood-smear',
    name: 'Blood Smear',
    domain: 'biology',
    category: 'histology',
    tags: ['blood', 'smear', 'RBC', 'WBC', 'platelets', 'cells'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="12" cy="16" rx="4" ry="3" fill="#CD5C5C" opacity="0.5"/>
      <ellipse cx="28" cy="12" rx="4" ry="3" fill="#CD5C5C" opacity="0.5"/>
      <ellipse cx="44" cy="20" rx="4" ry="3" fill="#CD5C5C" opacity="0.5"/>
      <ellipse cx="20" cy="32" rx="4" ry="3" fill="#CD5C5C" opacity="0.5"/>
      <ellipse cx="48" cy="36" rx="4" ry="3" fill="#CD5C5C" opacity="0.5"/>
      <ellipse cx="12" cy="48" rx="4" ry="3" fill="#CD5C5C" opacity="0.5"/>
      <ellipse cx="36" cy="52" rx="4" ry="3" fill="#CD5C5C" opacity="0.5"/>
      <ellipse cx="52" cy="48" rx="4" ry="3" fill="#CD5C5C" opacity="0.5"/>
      <circle cx="36" cy="32" r="6" fill="#E6E6FA" opacity="0.6"/>
      <circle cx="36" cy="32" r="6"/>
      <circle cx="36" cy="32" r="3" fill="#9370DB" opacity="0.5"/>
      <circle cx="56" cy="24" r="1" fill="#DDA0DD"/>
      <circle cx="8" cy="36" r="1" fill="#DDA0DD"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">RBCs + WBC + Platelets</text>
    </svg>`
  },
  {
    id: 'anat-smooth-muscle-histo',
    name: 'Smooth Muscle Histology',
    domain: 'biology',
    category: 'histology',
    tags: ['smooth muscle', 'histology', 'visceral', 'spindle', 'cells'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="12" rx="12" ry="4" fill="#DB7093" opacity="0.3"/>
      <ellipse cx="40" cy="20" rx="12" ry="4" fill="#DB7093" opacity="0.3"/>
      <ellipse cx="20" cy="28" rx="12" ry="4" fill="#DB7093" opacity="0.3"/>
      <ellipse cx="44" cy="36" rx="12" ry="4" fill="#DB7093" opacity="0.3"/>
      <ellipse cx="16" cy="44" rx="12" ry="4" fill="#DB7093" opacity="0.3"/>
      <ellipse cx="40" cy="52" rx="12" ry="4" fill="#DB7093" opacity="0.3"/>
      <ellipse cx="16" cy="12" rx="12" ry="4"/>
      <ellipse cx="40" cy="20" rx="12" ry="4"/>
      <ellipse cx="20" cy="28" rx="12" ry="4"/>
      <ellipse cx="44" cy="36" rx="12" ry="4"/>
      <ellipse cx="16" cy="44" rx="12" ry="4"/>
      <ellipse cx="40" cy="52" rx="12" ry="4"/>
      <circle cx="16" cy="12" r="2" fill="currentColor"/>
      <circle cx="40" cy="20" r="2" fill="currentColor"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Spindle-shaped cells</text>
    </svg>`
  },
  // ===========================================================================
  // EMBRYOLOGY & DEVELOPMENTAL ANATOMY
  // ===========================================================================
  {
    id: 'anat-germ-layers',
    name: 'Germ Layers',
    domain: 'biology',
    category: 'embryology',
    tags: ['germ layers', 'ectoderm', 'mesoderm', 'endoderm', 'gastrulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="currentColor" opacity="0.05"/>
      <path d="M8 28h48" stroke="#4169E1" stroke-width="3"/>
      <path d="M8 36h48" stroke="#22C55E" stroke-width="3"/>
      <path d="M8 44h48" stroke="#FFA500" stroke-width="3"/>
      <text x="52" y="30" font-size="3" fill="#4169E1" stroke="none">Ecto</text>
      <text x="52" y="38" font-size="3" fill="#22C55E" stroke="none">Meso</text>
      <text x="52" y="46" font-size="3" fill="#FFA500" stroke="none">Endo</text>
      <text x="4" y="20" font-size="3" fill="currentColor" stroke="none">Neural, Skin</text>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Muscle, Bone | GI, Lungs</text>
    </svg>`
  },
  {
    id: 'anat-blastocyst',
    name: 'Blastocyst',
    domain: 'biology',
    category: 'embryology',
    tags: ['blastocyst', 'embryo', 'inner cell mass', 'trophoblast', 'development'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="24"/>
      <circle cx="40" cy="24" r="10" fill="currentColor" opacity="0.3"/>
      <circle cx="40" cy="24" r="10"/>
      <circle cx="36" cy="22" r="3" fill="currentColor"/>
      <circle cx="44" cy="22" r="3" fill="currentColor"/>
      <circle cx="40" cy="28" r="3" fill="currentColor"/>
      <ellipse cx="32" cy="40" rx="16" ry="6" fill="currentColor" opacity="0.1"/>
      <text x="4" y="24" font-size="3" fill="currentColor" stroke="none">Trophoblast</text>
      <text x="46" y="18" font-size="3" fill="currentColor" stroke="none">ICM</text>
      <text x="26" y="52" font-size="3" fill="currentColor" stroke="none">Blastocoel</text>
    </svg>`
  },
  {
    id: 'anat-neural-tube',
    name: 'Neural Tube Formation',
    domain: 'biology',
    category: 'embryology',
    tags: ['neural tube', 'neurulation', 'neural fold', 'somite', 'development'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 40c0 0 8-24 24-24s24 24 24 24" fill="currentColor" opacity="0.15"/>
      <path d="M8 40c0 0 8-24 24-24s24 24 24 24"/>
      <path d="M20 32c0 0 4-12 12-12s12 12 12 12" fill="#87CEEB" opacity="0.3"/>
      <path d="M20 32c0 0 4-12 12-12s12 12 12 12"/>
      <circle cx="32" cy="24" r="4" fill="currentColor" opacity="0.2"/>
      <path d="M8 44h48" stroke-width="2"/>
      <rect x="12" cy="48" width="6" height="4" fill="currentColor" opacity="0.2"/>
      <rect x="22" cy="48" width="6" height="4" fill="currentColor" opacity="0.2"/>
      <rect x="32" cy="48" width="6" height="4" fill="currentColor" opacity="0.2"/>
      <rect x="42" cy="48" width="6" height="4" fill="currentColor" opacity="0.2"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Neural folds → Neural tube | Somites</text>
    </svg>`
  },
  {
    id: 'anat-pharyngeal-arches',
    name: 'Pharyngeal Arches',
    domain: 'biology',
    category: 'embryology',
    tags: ['pharyngeal', 'branchial', 'arches', 'embryo', 'head development'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="24" rx="16" ry="16" fill="currentColor" opacity="0.15"/>
      <ellipse cx="24" cy="24" rx="16" ry="16"/>
      <path d="M40 20c4 0 8 4 8 8s-4 8-4 12" fill="currentColor" opacity="0.2" stroke-width="2"/>
      <path d="M44 24c4 0 8 4 8 8s-4 8-4 12" fill="currentColor" opacity="0.15" stroke-width="2"/>
      <path d="M48 28c4 0 8 4 8 8s-4 8-4 12" fill="currentColor" opacity="0.1" stroke-width="2"/>
      <path d="M40 20c4 0 8 4 8 8s-4 8-4 12"/>
      <path d="M44 24c4 0 8 4 8 8s-4 8-4 12"/>
      <path d="M48 28c4 0 8 4 8 8s-4 8-4 12"/>
      <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.3"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Arches 1-4 → Face, neck structures</text>
    </svg>`
  },
  {
    id: 'anat-heart-development',
    name: 'Heart Development',
    domain: 'biology',
    category: 'embryology',
    tags: ['heart', 'cardiac', 'development', 'looping', 'septation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0 0 4-16 12-16s12 8 12 16" fill="#DC143C" opacity="0.2"/>
      <path d="M8 32c0 0 4-16 12-16s12 8 12 16"/>
      <path d="M20 44c0 4 4 8 8 8s8-4 8-8" fill="#DC143C" opacity="0.2"/>
      <path d="M20 44c0 4 4 8 8 8s8-4 8-8"/>
      <path d="M8 32c0 8 4 12 12 12"/>
      <path d="M32 32c0 8-4 12-12 12"/>
      <path d="M44 20h12l4 12-4 12h-12" fill="#DC143C" opacity="0.15"/>
      <path d="M44 20h12l4 12-4 12h-12"/>
      <path d="M48 20v24"/>
      <text x="4" y="10" font-size="3" fill="currentColor" stroke="none">Tube → Loop</text>
      <text x="44" y="10" font-size="3" fill="currentColor" stroke="none">4 chambers</text>
    </svg>`
  },
  // ===========================================================================
  // REGIONAL ANATOMY - HEAD AND NECK
  // ===========================================================================
  {
    id: 'anat-cranial-fossae',
    name: 'Cranial Fossae',
    domain: 'biology',
    category: 'regional-head',
    tags: ['cranial', 'fossae', 'anterior', 'middle', 'posterior', 'skull base'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="28" ry="24"/>
      <path d="M4 24h56" stroke-dasharray="2 2"/>
      <path d="M4 40h56" stroke-dasharray="2 2"/>
      <ellipse cx="32" cy="16" rx="12" ry="6" fill="#87CEEB" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="8" fill="#98FB98" opacity="0.3"/>
      <ellipse cx="32" cy="48" rx="16" ry="8" fill="#DDA0DD" opacity="0.3"/>
      <text x="26" y="18" font-size="3" fill="currentColor" stroke="none">Anterior</text>
      <text x="28" y="34" font-size="3" fill="currentColor" stroke="none">Middle</text>
      <text x="26" y="50" font-size="3" fill="currentColor" stroke="none">Posterior</text>
    </svg>`
  },
  {
    id: 'anat-facial-muscles',
    name: 'Facial Muscles',
    domain: 'biology',
    category: 'regional-head',
    tags: ['facial', 'muscles', 'expression', 'orbicularis', 'frontalis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="20" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="28" rx="20" ry="24"/>
      <path d="M16 12h32" stroke="#CD5C5C" stroke-width="2"/>
      <ellipse cx="24" cy="24" rx="4" ry="3" fill="#CD5C5C" opacity="0.3"/>
      <ellipse cx="40" cy="24" rx="4" ry="3" fill="#CD5C5C" opacity="0.3"/>
      <ellipse cx="32" cy="40" rx="8" ry="4" fill="#CD5C5C" opacity="0.3"/>
      <path d="M20 32c4 4 20 4 24 0" stroke="#CD5C5C"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Frontalis, Orbicularis, Zygomaticus</text>
    </svg>`
  },
  {
    id: 'anat-neck-triangles',
    name: 'Neck Triangles',
    domain: 'biology',
    category: 'regional-head',
    tags: ['neck', 'triangles', 'anterior', 'posterior', 'sternocleidomastoid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" fill="currentColor" opacity="0.05"/>
      <path d="M32 8l-24 48h24z" fill="#87CEEB" opacity="0.3"/>
      <path d="M32 8l24 48h-24z" fill="#98FB98" opacity="0.3"/>
      <path d="M8 56l24-48 24 48"/>
      <path d="M32 8v48"/>
      <circle cx="24" cy="32" r="2" fill="currentColor"/>
      <circle cx="40" cy="32" r="2" fill="currentColor"/>
      <text x="12" y="44" font-size="3" fill="currentColor" stroke="none">Ant</text>
      <text x="44" y="44" font-size="3" fill="currentColor" stroke="none">Post</text>
      <text x="20" y="62" font-size="3" fill="currentColor" stroke="none">SCM divides triangles</text>
    </svg>`
  },
  {
    id: 'anat-orbit-anatomy',
    name: 'Orbit Anatomy',
    domain: 'biology',
    category: 'regional-head',
    tags: ['orbit', 'eye socket', 'extraocular', 'muscles', 'nerves'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-16 12-24 24-24s24 8 24 24-12 24-24 24-24-8-24-24z" fill="currentColor" opacity="0.1"/>
      <path d="M8 32c0-16 12-24 24-24s24 8 24 24-12 24-24 24-24-8-24-24z"/>
      <circle cx="32" cy="32" r="12" fill="#87CEEB" opacity="0.3"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <path d="M32 8v12M32 44v12M8 32h12M44 32h12"/>
      <path d="M16 16l8 8M48 16l-8 8M16 48l8-8M48 48l-8-8"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Globe + Extraocular muscles</text>
    </svg>`
  },
  // ===========================================================================
  // REGIONAL ANATOMY - THORAX AND ABDOMEN
  // ===========================================================================
  {
    id: 'anat-mediastinum',
    name: 'Mediastinum',
    domain: 'biology',
    category: 'regional-thorax',
    tags: ['mediastinum', 'superior', 'inferior', 'thorax', 'compartments'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" fill="currentColor" opacity="0.05"/>
      <rect x="8" y="8" width="48" height="48"/>
      <path d="M8 24h48" stroke-dasharray="2 2"/>
      <rect x="20" y="8" width="24" height="16" fill="#87CEEB" opacity="0.3"/>
      <rect x="16" y="24" width="12" height="32" fill="#98FB98" opacity="0.3"/>
      <rect x="28" y="24" width="8" height="32" fill="#DDA0DD" opacity="0.3"/>
      <rect x="36" y="24" width="12" height="32" fill="#FFB6C1" opacity="0.3"/>
      <text x="26" y="18" font-size="3" fill="currentColor" stroke="none">Superior</text>
      <text x="18" y="42" font-size="3" fill="currentColor" stroke="none">Ant</text>
      <text x="30" y="42" font-size="3" fill="currentColor" stroke="none">Mid</text>
      <text x="38" y="42" font-size="3" fill="currentColor" stroke="none">Post</text>
    </svg>`
  },
  {
    id: 'anat-abdominal-regions',
    name: 'Abdominal Regions',
    domain: 'biology',
    category: 'regional-abdomen',
    tags: ['abdomen', 'regions', 'nine', 'quadrants', 'surface anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="48" height="48"/>
      <path d="M24 8v48M40 8v48M8 24h48M8 40h48"/>
      <text x="12" y="18" font-size="3" fill="currentColor" stroke="none">RH</text>
      <text x="30" y="18" font-size="3" fill="currentColor" stroke="none">Epi</text>
      <text x="44" y="18" font-size="3" fill="currentColor" stroke="none">LH</text>
      <text x="12" y="34" font-size="3" fill="currentColor" stroke="none">RL</text>
      <text x="28" y="34" font-size="3" fill="currentColor" stroke="none">Umb</text>
      <text x="44" y="34" font-size="3" fill="currentColor" stroke="none">LL</text>
      <text x="12" y="50" font-size="3" fill="currentColor" stroke="none">RI</text>
      <text x="28" y="50" font-size="3" fill="currentColor" stroke="none">Hyp</text>
      <text x="44" y="50" font-size="3" fill="currentColor" stroke="none">LI</text>
    </svg>`
  },
  {
    id: 'anat-retroperitoneum',
    name: 'Retroperitoneum',
    domain: 'biology',
    category: 'regional-abdomen',
    tags: ['retroperitoneum', 'kidneys', 'adrenals', 'aorta', 'IVC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" fill="currentColor" opacity="0.05"/>
      <path d="M8 20h48"/>
      <ellipse cx="20" cy="32" rx="6" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="44" cy="32" rx="6" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="20" cy="32" rx="6" ry="10"/>
      <ellipse cx="44" cy="32" rx="6" ry="10"/>
      <ellipse cx="20" cy="20" rx="4" ry="2" fill="#F0E68C" opacity="0.4"/>
      <ellipse cx="44" cy="20" rx="4" ry="2" fill="#F0E68C" opacity="0.4"/>
      <path d="M32 8v48" stroke="#DC143C" stroke-width="2"/>
      <path d="M36 8v48" stroke="#4169E1" stroke-width="2"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Kidneys, Adrenals, Great vessels</text>
    </svg>`
  },
  // ===========================================================================
  // REGIONAL ANATOMY - LIMBS
  // ===========================================================================
  {
    id: 'anat-brachial-plexus',
    name: 'Brachial Plexus',
    domain: 'biology',
    category: 'regional-limbs',
    tags: ['brachial plexus', 'C5-T1', 'roots', 'trunks', 'cords', 'nerves'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8h8M8 16h8M8 24h8M8 32h8M8 40h8" stroke="#FFD700" stroke-width="2"/>
      <path d="M16 8l8 8M16 16l8 0M16 24l8-8"/>
      <path d="M16 32l8-8M16 40l8-8"/>
      <circle cx="24" cy="16" r="3" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="32" r="3" fill="currentColor" opacity="0.2"/>
      <path d="M27 16l8 8M27 24l8 8M27 32l8 0"/>
      <circle cx="38" cy="24" r="4" fill="currentColor" opacity="0.15"/>
      <circle cx="38" cy="32" r="4" fill="currentColor" opacity="0.15"/>
      <circle cx="38" cy="40" r="4" fill="currentColor" opacity="0.15"/>
      <path d="M42 24l12 0M42 32l12 0M42 40l12 0"/>
      <text x="4" y="8" font-size="3" fill="currentColor" stroke="none">C5</text>
      <text x="4" y="44" font-size="3" fill="currentColor" stroke="none">T1</text>
      <text x="48" y="62" font-size="3" fill="currentColor" stroke="none">Nerves</text>
    </svg>`
  },
  {
    id: 'anat-arm-compartments',
    name: 'Arm Compartments',
    domain: 'biology',
    category: 'regional-limbs',
    tags: ['arm', 'compartments', 'anterior', 'posterior', 'muscles'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <path d="M12 32h40"/>
      <ellipse cx="32" cy="20" rx="12" ry="8" fill="#CD5C5C" opacity="0.3"/>
      <ellipse cx="32" cy="44" rx="12" ry="8" fill="#BC8F8F" opacity="0.3"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="32" r="2" fill="#DC143C" opacity="0.5"/>
      <circle cx="40" cy="32" r="2" fill="#4169E1" opacity="0.5"/>
      <text x="26" y="22" font-size="3" fill="currentColor" stroke="none">Flexors</text>
      <text x="24" y="46" font-size="3" fill="currentColor" stroke="none">Extensors</text>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Humerus + vessels</text>
    </svg>`
  },
  {
    id: 'anat-leg-compartments',
    name: 'Leg Compartments',
    domain: 'biology',
    category: 'regional-limbs',
    tags: ['leg', 'compartments', 'anterior', 'lateral', 'posterior', 'muscles'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <path d="M32 12v40"/>
      <path d="M16 24l32 16"/>
      <ellipse cx="24" cy="20" rx="8" ry="6" fill="#CD5C5C" opacity="0.3"/>
      <ellipse cx="44" cy="24" rx="6" ry="8" fill="#BC8F8F" opacity="0.3"/>
      <ellipse cx="32" cy="44" rx="12" ry="6" fill="#DB7093" opacity="0.3"/>
      <circle cx="32" cy="32" r="3" fill="currentColor" opacity="0.2"/>
      <circle cx="40" cy="32" r="2" fill="currentColor" opacity="0.15"/>
      <text x="18" y="20" font-size="3" fill="currentColor" stroke="none">Ant</text>
      <text x="42" y="26" font-size="3" fill="currentColor" stroke="none">Lat</text>
      <text x="26" y="46" font-size="3" fill="currentColor" stroke="none">Post</text>
    </svg>`
  },
  {
    id: 'anat-carpal-tunnel',
    name: 'Carpal Tunnel',
    domain: 'biology',
    category: 'regional-limbs',
    tags: ['carpal tunnel', 'wrist', 'median nerve', 'flexor tendons'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-8 8-16 24-16s24 8 24 16" fill="currentColor" opacity="0.15"/>
      <path d="M8 32c0-8 8-16 24-16s24 8 24 16"/>
      <path d="M8 32h48" stroke-width="2"/>
      <ellipse cx="20" cy="28" rx="3" ry="4" fill="#F5DEB3" opacity="0.4"/>
      <ellipse cx="28" cy="26" rx="3" ry="4" fill="#F5DEB3" opacity="0.4"/>
      <ellipse cx="36" cy="26" rx="3" ry="4" fill="#F5DEB3" opacity="0.4"/>
      <ellipse cx="44" cy="28" rx="3" ry="4" fill="#F5DEB3" opacity="0.4"/>
      <circle cx="32" cy="24" r="4" fill="#FFD700" opacity="0.4"/>
      <text x="4" y="48" font-size="3" fill="currentColor" stroke="none">Flexor retinaculum</text>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Tendons + Median n.</text>
    </svg>`
  },
  // ===========================================================================
  // SURFACE ANATOMY & LANDMARKS
  // ===========================================================================
  {
    id: 'anat-surface-heart',
    name: 'Surface Anatomy Heart',
    domain: 'biology',
    category: 'surface-anatomy',
    tags: ['surface', 'heart', 'landmarks', 'apex', 'borders', 'auscultation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" fill="currentColor" opacity="0.05"/>
      <path d="M16 20c8-4 24-4 32 0" stroke-dasharray="2 2"/>
      <path d="M20 16l8 32"/>
      <path d="M40 16l-4 32"/>
      <circle cx="28" cy="20" r="3" fill="#DC143C" opacity="0.4"/>
      <circle cx="36" cy="20" r="3" fill="#DC143C" opacity="0.4"/>
      <circle cx="20" cy="28" r="3" fill="#DC143C" opacity="0.4"/>
      <circle cx="28" cy="44" r="3" fill="#DC143C" opacity="0.4"/>
      <text x="4" y="20" font-size="3" fill="currentColor" stroke="none">A P</text>
      <text x="4" y="32" font-size="3" fill="currentColor" stroke="none">T</text>
      <text x="32" y="48" font-size="3" fill="currentColor" stroke="none">M</text>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">APTM auscultation points</text>
    </svg>`
  },
  {
    id: 'anat-dermatomes',
    name: 'Dermatomes',
    domain: 'biology',
    category: 'surface-anatomy',
    tags: ['dermatomes', 'sensory', 'spinal', 'levels', 'distribution'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="8" ry="8" fill="currentColor" opacity="0.1"/>
      <rect x="24" y="20" width="16" height="20" fill="currentColor" opacity="0.1"/>
      <path d="M24 40l-8 20M40 40l8 20"/>
      <path d="M20 28l-12 8M44 28l12 8"/>
      <path d="M8 28h12" stroke="#87CEEB" stroke-width="2"/>
      <path d="M8 32h12" stroke="#98FB98" stroke-width="2"/>
      <path d="M8 36h12" stroke="#DDA0DD" stroke-width="2"/>
      <path d="M12 44h8" stroke="#FFB6C1" stroke-width="2"/>
      <path d="M12 52h8" stroke="#FFD700" stroke-width="2"/>
      <text x="44" y="30" font-size="3" fill="currentColor" stroke="none">C5-T1</text>
      <text x="44" y="42" font-size="3" fill="currentColor" stroke="none">T2-12</text>
      <text x="44" y="56" font-size="3" fill="currentColor" stroke="none">L1-S5</text>
    </svg>`
  },
  {
    id: 'anat-myotomes',
    name: 'Myotomes',
    domain: 'biology',
    category: 'surface-anatomy',
    tags: ['myotomes', 'motor', 'spinal', 'levels', 'testing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="8" ry="8" fill="currentColor" opacity="0.1"/>
      <rect x="24" y="20" width="16" height="20" fill="currentColor" opacity="0.1"/>
      <path d="M24 40l-8 20M40 40l8 20"/>
      <path d="M20 28l-12 8M44 28l12 8"/>
      <ellipse cx="12" cy="32" rx="4" ry="6" fill="#CD5C5C" opacity="0.3"/>
      <ellipse cx="52" cy="32" rx="4" ry="6" fill="#CD5C5C" opacity="0.3"/>
      <ellipse cx="20" cy="52" rx="4" ry="8" fill="#CD5C5C" opacity="0.3"/>
      <ellipse cx="44" cy="52" rx="4" ry="8" fill="#CD5C5C" opacity="0.3"/>
      <text x="4" y="24" font-size="3" fill="currentColor" stroke="none">C5 shoulder</text>
      <text x="4" y="40" font-size="3" fill="currentColor" stroke="none">C6 elbow</text>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">L3 knee ext</text>
    </svg>`
  }
];

export default anatomyIcons;
