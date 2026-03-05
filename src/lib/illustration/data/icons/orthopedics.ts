/**
 * Orthopedics Icon Library
 * Comprehensive SVG icons for orthopedic medicine
 *
 * Categories:
 * - Skeletal Anatomy (skeleton, skull, spine, pelvis, long bones, joints, hands, feet)
 * - Bone Structure (cortical, trabecular, periosteum, marrow, growth plate)
 * - Fractures (types, classification, healing stages)
 * - Joint Pathology (arthritis, tears, injuries)
 * - Spine (vertebrae, disc, pathology)
 * - Soft Tissue (muscle, tendon, ligament, cartilage)
 * - Equipment & Procedures (imaging, fixation, prosthetics)
 */

import type { IconDefinition } from './index';

export const orthopedicsIcons: IconDefinition[] = [
  // ===========================================================================
  // SKELETAL ANATOMY
  // ===========================================================================
  {
    id: 'ortho-skeleton-overview',
    name: 'Skeleton Overview',
    domain: 'medicine',
    category: 'skeletal-anatomy',
    tags: ['skeleton', 'full body', 'bones', 'anatomy', 'overview'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="10" r="6"/>
      <line x1="32" y1="16" x2="32" y2="36"/>
      <line x1="22" y1="22" x2="42" y2="22"/>
      <line x1="32" y1="36" x2="24" y2="56"/>
      <line x1="32" y1="36" x2="40" y2="56"/>
      <ellipse cx="32" cy="28" rx="8" ry="6" stroke-dasharray="2 2"/>
      <circle cx="32" cy="36" r="3" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'ortho-skull',
    name: 'Skull',
    domain: 'medicine',
    category: 'skeletal-anatomy',
    tags: ['skull', 'cranium', 'head', 'calvarium', 'mandible'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="26" rx="18" ry="20"/>
      <path d="M20 44c4 8 20 8 24 0"/>
      <circle cx="24" cy="24" r="4"/>
      <circle cx="40" cy="24" r="4"/>
      <path d="M28 34h8"/>
      <line x1="30" y1="32" x2="30" y2="36"/>
      <line x1="34" y1="32" x2="34" y2="36"/>
      <path d="M22 44v8c0 2 4 4 10 4s10-2 10-4v-8"/>
    </svg>`
  },
  {
    id: 'ortho-cervical-spine',
    name: 'Cervical Spine',
    domain: 'medicine',
    category: 'skeletal-anatomy',
    tags: ['cervical', 'spine', 'neck', 'C1-C7', 'vertebrae'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="10" rx="10" ry="4"/>
      <ellipse cx="32" cy="18" rx="9" ry="4"/>
      <ellipse cx="32" cy="26" rx="9" ry="4"/>
      <ellipse cx="32" cy="34" rx="10" ry="4"/>
      <ellipse cx="32" cy="42" rx="10" ry="4"/>
      <ellipse cx="32" cy="50" rx="11" ry="4"/>
      <ellipse cx="32" cy="58" rx="11" ry="4"/>
      <text x="46" y="12" font-size="4" fill="currentColor" stroke="none">C1</text>
      <text x="46" y="60" font-size="4" fill="currentColor" stroke="none">C7</text>
    </svg>`
  },
  {
    id: 'ortho-thoracic-spine',
    name: 'Thoracic Spine',
    domain: 'medicine',
    category: 'skeletal-anatomy',
    tags: ['thoracic', 'spine', 'T1-T12', 'vertebrae', 'ribs'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="8" width="8" height="48" rx="2"/>
      <path d="M28 12h-12c-4 0-6 4-6 8"/>
      <path d="M36 12h12c4 0 6 4 6 8"/>
      <path d="M28 24h-14c-4 0-6 4-6 8"/>
      <path d="M36 24h14c4 0 6 4 6 8"/>
      <path d="M28 36h-12c-4 0-6 4-6 8"/>
      <path d="M36 36h12c4 0 6 4 6 8"/>
      <text x="24" y="62" font-size="5" fill="currentColor" stroke="none">T1-T12</text>
    </svg>`
  },
  {
    id: 'ortho-lumbar-spine',
    name: 'Lumbar Spine',
    domain: 'medicine',
    category: 'skeletal-anatomy',
    tags: ['lumbar', 'spine', 'L1-L5', 'vertebrae', 'lower back'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="14" ry="6"/>
      <ellipse cx="32" cy="24" rx="15" ry="6"/>
      <ellipse cx="32" cy="36" rx="16" ry="6"/>
      <ellipse cx="32" cy="48" rx="16" ry="6"/>
      <path d="M32 6v48" stroke-dasharray="2 2"/>
      <text x="50" y="14" font-size="4" fill="currentColor" stroke="none">L1</text>
      <text x="50" y="50" font-size="4" fill="currentColor" stroke="none">L5</text>
    </svg>`
  },
  {
    id: 'ortho-pelvis',
    name: 'Pelvis',
    domain: 'medicine',
    category: 'skeletal-anatomy',
    tags: ['pelvis', 'hip', 'ilium', 'ischium', 'pubis', 'sacrum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 20c4-8 12-12 24-12s20 4 24 12"/>
      <path d="M8 20c0 16-4 28 8 32"/>
      <path d="M56 20c0 16 4 28-8 32"/>
      <path d="M16 52c4 4 12 4 16 0"/>
      <path d="M32 52c4 4 12 4 16 0"/>
      <circle cx="18" cy="36" r="6"/>
      <circle cx="46" cy="36" r="6"/>
      <path d="M28 8v16" stroke-dasharray="2 2"/>
      <path d="M36 8v16" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'ortho-femur',
    name: 'Femur',
    domain: 'medicine',
    category: 'skeletal-anatomy',
    tags: ['femur', 'thigh', 'long bone', 'hip', 'knee'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="12" r="6"/>
      <path d="M24 16l8 8"/>
      <path d="M32 24v28"/>
      <path d="M28 52c0 4-2 6-4 8"/>
      <path d="M36 52c0 4 2 6 4 8"/>
      <ellipse cx="32" cy="52" rx="6" ry="4"/>
      <text x="8" y="14" font-size="4" fill="currentColor" stroke="none">Head</text>
      <text x="38" y="36" font-size="4" fill="currentColor" stroke="none">Shaft</text>
    </svg>`
  },
  {
    id: 'ortho-tibia-fibula',
    name: 'Tibia and Fibula',
    domain: 'medicine',
    category: 'skeletal-anatomy',
    tags: ['tibia', 'fibula', 'leg', 'shin', 'lower leg'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="28" cy="10" rx="10" ry="4"/>
      <path d="M28 14v40"/>
      <ellipse cx="28" cy="54" rx="6" ry="3"/>
      <path d="M44 12v38"/>
      <circle cx="44" cy="10" r="3"/>
      <circle cx="44" cy="52" r="4"/>
      <text x="16" y="34" font-size="4" fill="currentColor" stroke="none">Tibia</text>
      <text x="48" y="34" font-size="4" fill="currentColor" stroke="none">Fibula</text>
    </svg>`
  },
  {
    id: 'ortho-humerus',
    name: 'Humerus',
    domain: 'medicine',
    category: 'skeletal-anatomy',
    tags: ['humerus', 'arm', 'upper arm', 'shoulder', 'elbow'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="6"/>
      <path d="M32 18v32"/>
      <path d="M26 50c-2 4-4 6-4 8"/>
      <path d="M38 50c2 4 4 6 4 8"/>
      <ellipse cx="32" cy="50" rx="8" ry="4"/>
      <path d="M26 14l-6-4"/>
      <path d="M38 14l6-4"/>
    </svg>`
  },
  {
    id: 'ortho-radius-ulna',
    name: 'Radius and Ulna',
    domain: 'medicine',
    category: 'skeletal-anatomy',
    tags: ['radius', 'ulna', 'forearm', 'elbow', 'wrist'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8c-2 2-4 4-4 8"/>
      <path d="M20 16v36"/>
      <ellipse cx="20" cy="54" rx="4" ry="2"/>
      <ellipse cx="40" cy="10" rx="4" ry="6"/>
      <path d="M40 16v34"/>
      <ellipse cx="40" cy="52" rx="6" ry="3"/>
      <text x="8" y="36" font-size="4" fill="currentColor" stroke="none">Radius</text>
      <text x="46" y="36" font-size="4" fill="currentColor" stroke="none">Ulna</text>
    </svg>`
  },
  {
    id: 'ortho-shoulder-joint',
    name: 'Shoulder Joint',
    domain: 'medicine',
    category: 'skeletal-anatomy',
    tags: ['shoulder', 'glenohumeral', 'joint', 'rotator cuff', 'scapula'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16c8-8 24-8 32 0"/>
      <ellipse cx="40" cy="24" rx="12" ry="8" fill="currentColor" opacity="0.1"/>
      <circle cx="40" cy="24" r="8"/>
      <path d="M40 32v24"/>
      <circle cx="40" cy="24" r="3" fill="currentColor"/>
      <path d="M12 16l16 16"/>
      <text x="4" y="32" font-size="4" fill="currentColor" stroke="none">Clavicle</text>
    </svg>`
  },
  {
    id: 'ortho-elbow-joint',
    name: 'Elbow Joint',
    domain: 'medicine',
    category: 'skeletal-anatomy',
    tags: ['elbow', 'joint', 'humeroulnar', 'olecranon', 'radial head'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v20"/>
      <ellipse cx="32" cy="32" rx="12" ry="6"/>
      <path d="M24 38v18"/>
      <path d="M40 38v18"/>
      <circle cx="40" cy="38" r="4"/>
      <path d="M32 26c-4 1-8 1-12-2"/>
      <text x="4" y="24" font-size="4" fill="currentColor" stroke="none">Humerus</text>
      <text x="46" y="42" font-size="4" fill="currentColor" stroke="none">Radial head</text>
    </svg>`
  },
  {
    id: 'ortho-knee-joint',
    name: 'Knee Joint',
    domain: 'medicine',
    category: 'skeletal-anatomy',
    tags: ['knee', 'joint', 'patella', 'meniscus', 'cruciate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v18"/>
      <ellipse cx="32" cy="30" rx="14" ry="8"/>
      <path d="M32 38v18"/>
      <ellipse cx="32" cy="32" rx="4" ry="2" fill="currentColor" opacity="0.3"/>
      <ellipse cx="26" cy="32" rx="3" ry="1" fill="currentColor" opacity="0.2"/>
      <ellipse cx="38" cy="32" rx="3" ry="1" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="26" rx="6" ry="4"/>
      <text x="4" y="28" font-size="4" fill="currentColor" stroke="none">Patella</text>
    </svg>`
  },
  {
    id: 'ortho-hand-bones',
    name: 'Hand Bones',
    domain: 'medicine',
    category: 'skeletal-anatomy',
    tags: ['hand', 'metacarpals', 'phalanges', 'carpals', 'fingers'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="44" width="24" height="12" rx="2"/>
      <path d="M24 44v-20"/>
      <path d="M24 24l-8-16"/>
      <path d="M30 44v-24"/>
      <path d="M30 20v-12"/>
      <path d="M36 44v-26"/>
      <path d="M36 18v-10"/>
      <path d="M42 44v-22"/>
      <path d="M42 22v-10"/>
      <circle cx="24" cy="28" r="2"/>
      <circle cx="30" cy="24" r="2"/>
      <circle cx="36" cy="22" r="2"/>
      <circle cx="42" cy="26" r="2"/>
    </svg>`
  },
  {
    id: 'ortho-foot-bones',
    name: 'Foot Bones',
    domain: 'medicine',
    category: 'skeletal-anatomy',
    tags: ['foot', 'metatarsals', 'phalanges', 'tarsals', 'toes', 'calcaneus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="40" rx="12" ry="8"/>
      <path d="M32 40h20"/>
      <path d="M52 36c4 2 6 4 6 8"/>
      <path d="M36 40v-16l4-8"/>
      <path d="M42 40v-18l2-6"/>
      <path d="M48 40v-16l2-6"/>
      <path d="M54 40v-12"/>
      <circle cx="40" cy="14" r="2"/>
      <circle cx="44" cy="14" r="2"/>
      <circle cx="50" cy="16" r="2"/>
      <text x="8" y="52" font-size="4" fill="currentColor" stroke="none">Calcaneus</text>
    </svg>`
  },

  // ===========================================================================
  // BONE STRUCTURE
  // ===========================================================================
  {
    id: 'ortho-cortical-bone',
    name: 'Cortical Bone',
    domain: 'medicine',
    category: 'bone-structure',
    tags: ['cortical', 'compact', 'dense', 'outer', 'haversian'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <rect x="20" y="16" width="24" height="32" rx="2" fill="currentColor" opacity="0.2"/>
      <circle cx="18" cy="20" r="2"/>
      <circle cx="18" cy="32" r="2"/>
      <circle cx="18" cy="44" r="2"/>
      <circle cx="46" cy="20" r="2"/>
      <circle cx="46" cy="32" r="2"/>
      <circle cx="46" cy="44" r="2"/>
      <text x="24" y="36" font-size="5" fill="currentColor" stroke="none">Dense</text>
    </svg>`
  },
  {
    id: 'ortho-trabecular-bone',
    name: 'Trabecular Bone',
    domain: 'medicine',
    category: 'bone-structure',
    tags: ['trabecular', 'cancellous', 'spongy', 'inner', 'trabeculae'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <path d="M20 16l8 8-4 8 8 4-4 8 8 8"/>
      <path d="M28 16l4 12 8-4 4 12-4 8"/>
      <path d="M40 16l-4 8 8 8-8 8 4 8"/>
      <circle cx="24" cy="24" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="36" cy="32" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="28" cy="44" r="2" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'ortho-periosteum',
    name: 'Periosteum',
    domain: 'medicine',
    category: 'bone-structure',
    tags: ['periosteum', 'membrane', 'outer layer', 'vascular', 'nerve'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="12" width="24" height="40" rx="2"/>
      <path d="M16 12c0-2 2-4 4-4h24c2 0 4 2 4 4v40c0 2-2 4-4 4H20c-2 0-4-2-4-4z" stroke-width="2" stroke="#DC143C"/>
      <path d="M12 20h4"/>
      <path d="M12 32h4"/>
      <path d="M12 44h4"/>
      <path d="M48 20h4"/>
      <path d="M48 32h4"/>
      <path d="M48 44h4"/>
      <text x="16" y="60" font-size="4" fill="#DC143C" stroke="none">Periosteum</text>
    </svg>`
  },
  {
    id: 'ortho-bone-marrow',
    name: 'Bone Marrow',
    domain: 'medicine',
    category: 'bone-structure',
    tags: ['marrow', 'medullary', 'red marrow', 'yellow marrow', 'hematopoietic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <ellipse cx="32" cy="32" rx="12" ry="16" fill="#DC143C" opacity="0.3"/>
      <circle cx="28" cy="28" r="2" fill="#DC143C"/>
      <circle cx="36" cy="30" r="2" fill="#DC143C"/>
      <circle cx="32" cy="36" r="2" fill="#DC143C"/>
      <circle cx="28" cy="38" r="1.5" fill="#DC143C"/>
      <circle cx="38" cy="34" r="1.5" fill="#DC143C"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Red marrow</text>
    </svg>`
  },
  {
    id: 'ortho-growth-plate',
    name: 'Growth Plate',
    domain: 'medicine',
    category: 'bone-structure',
    tags: ['physis', 'growth plate', 'epiphyseal', 'cartilage', 'pediatric'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="16" ry="8"/>
      <rect x="20" y="24" width="24" height="4" fill="#4169E1" opacity="0.5"/>
      <path d="M20 28v24"/>
      <path d="M44 28v24"/>
      <path d="M20 52c0 4 6 6 12 6s12-2 12-6"/>
      <text x="8" y="28" font-size="4" fill="#4169E1" stroke="none">Physis</text>
      <text x="8" y="18" font-size="4" fill="currentColor" stroke="none">Epiphysis</text>
      <text x="8" y="42" font-size="4" fill="currentColor" stroke="none">Metaphysis</text>
    </svg>`
  },
  {
    id: 'ortho-ossification',
    name: 'Ossification',
    domain: 'medicine',
    category: 'bone-structure',
    tags: ['ossification', 'bone formation', 'osteogenesis', 'mineralization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="12" height="24" rx="2" fill="#87CEEB" opacity="0.5"/>
      <rect x="26" y="24" width="12" height="24" rx="2" fill="#90EE90" opacity="0.5"/>
      <rect x="44" y="24" width="12" height="24" rx="2" fill="currentColor" opacity="0.3"/>
      <path d="M14 20l12 0"/>
      <path d="M32 20l12 0"/>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">Cartilage</text>
      <text x="26" y="56" font-size="3" fill="currentColor" stroke="none">Mixed</text>
      <text x="46" y="56" font-size="3" fill="currentColor" stroke="none">Bone</text>
    </svg>`
  },
  {
    id: 'ortho-bone-remodeling',
    name: 'Bone Remodeling',
    domain: 'medicine',
    category: 'bone-structure',
    tags: ['remodeling', 'osteoclast', 'osteoblast', 'turnover', 'repair'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="2"/>
      <path d="M24 20v-8l8 4-8 4"/>
      <path d="M40 44v8l-8-4 8-4"/>
      <circle cx="24" cy="28" r="3" fill="#DC143C" opacity="0.5"/>
      <circle cx="40" cy="36" r="3" fill="#4169E1" opacity="0.5"/>
      <text x="4" y="14" font-size="3" fill="#DC143C" stroke="none">Osteoclast</text>
      <text x="36" y="58" font-size="3" fill="#4169E1" stroke="none">Osteoblast</text>
    </svg>`
  },
  {
    id: 'ortho-haversian-system',
    name: 'Haversian System',
    domain: 'medicine',
    category: 'bone-structure',
    tags: ['haversian', 'osteon', 'canal', 'lamellae', 'concentric'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="18"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="6"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <line x1="32" y1="8" x2="32" y2="56" stroke-dasharray="2 2"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Osteon</text>
    </svg>`
  },
  {
    id: 'ortho-osteocyte',
    name: 'Osteocyte',
    domain: 'medicine',
    category: 'bone-structure',
    tags: ['osteocyte', 'bone cell', 'lacuna', 'canaliculi', 'mechanosensing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <path d="M20 32h-12"/>
      <path d="M44 32h12"/>
      <path d="M24 26l-8-8"/>
      <path d="M40 26l8-8"/>
      <path d="M24 38l-8 8"/>
      <path d="M40 38l8 8"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Canaliculi</text>
    </svg>`
  },
  {
    id: 'ortho-woven-bone',
    name: 'Woven Bone',
    domain: 'medicine',
    category: 'bone-structure',
    tags: ['woven', 'immature', 'callus', 'healing', 'rapid formation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="4"/>
      <path d="M16 20c8 4 16-4 24 0s8 8 8 8"/>
      <path d="M16 32c4 4 12-2 20 2s12 4 12 4"/>
      <path d="M16 44c6 2 14-4 22 0s10 2 10 2"/>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Disorganized</text>
    </svg>`
  },

  // ===========================================================================
  // FRACTURES
  // ===========================================================================
  {
    id: 'ortho-fx-transverse',
    name: 'Transverse Fracture',
    domain: 'medicine',
    category: 'fractures',
    tags: ['transverse', 'fracture', 'horizontal', 'perpendicular', 'direct'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8v22"/>
      <path d="M36 8v22"/>
      <path d="M28 34v22"/>
      <path d="M36 34v22"/>
      <path d="M24 30h16" stroke="#DC143C" stroke-width="2"/>
      <path d="M22 28l4 4"/>
      <path d="M38 28l4 4"/>
      <text x="8" y="58" font-size="5" fill="currentColor" stroke="none">Transverse</text>
    </svg>`
  },
  {
    id: 'ortho-fx-oblique',
    name: 'Oblique Fracture',
    domain: 'medicine',
    category: 'fractures',
    tags: ['oblique', 'fracture', 'angled', 'diagonal', 'shear'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8v18"/>
      <path d="M36 8v22"/>
      <path d="M28 38v18"/>
      <path d="M36 34v22"/>
      <path d="M24 26l16 8" stroke="#DC143C" stroke-width="2"/>
      <text x="12" y="58" font-size="5" fill="currentColor" stroke="none">Oblique</text>
    </svg>`
  },
  {
    id: 'ortho-fx-spiral',
    name: 'Spiral Fracture',
    domain: 'medicine',
    category: 'fractures',
    tags: ['spiral', 'fracture', 'torsion', 'rotational', 'twisting'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8v16"/>
      <path d="M36 8v12"/>
      <path d="M28 40v16"/>
      <path d="M36 44v12"/>
      <path d="M24 24c4 8 8 12 16 20" stroke="#DC143C" stroke-width="2"/>
      <path d="M22 28c2 4 6 8 10 12"/>
      <text x="14" y="58" font-size="5" fill="currentColor" stroke="none">Spiral</text>
    </svg>`
  },
  {
    id: 'ortho-fx-comminuted',
    name: 'Comminuted Fracture',
    domain: 'medicine',
    category: 'fractures',
    tags: ['comminuted', 'fracture', 'multiple fragments', 'shattered', 'complex'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8v16"/>
      <path d="M36 8v14"/>
      <path d="M28 44v12"/>
      <path d="M36 46v10"/>
      <polygon points="26,24 32,28 28,36 22,32" fill="currentColor" opacity="0.2" stroke="#DC143C"/>
      <polygon points="32,22 40,26 36,32 30,28" fill="currentColor" opacity="0.2" stroke="#DC143C"/>
      <polygon points="28,36 36,32 38,42 26,44" fill="currentColor" opacity="0.2" stroke="#DC143C"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Comminuted</text>
    </svg>`
  },
  {
    id: 'ortho-fx-greenstick',
    name: 'Greenstick Fracture',
    domain: 'medicine',
    category: 'fractures',
    tags: ['greenstick', 'fracture', 'pediatric', 'incomplete', 'bending'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8v48"/>
      <path d="M36 8v20"/>
      <path d="M36 28c4 4 6 8 4 12"/>
      <path d="M40 40c-2 4-4 8-4 16"/>
      <path d="M32 28l6 4" stroke="#DC143C" stroke-width="2"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Greenstick</text>
    </svg>`
  },
  {
    id: 'ortho-fx-pathologic',
    name: 'Pathologic Fracture',
    domain: 'medicine',
    category: 'fractures',
    tags: ['pathologic', 'fracture', 'tumor', 'metastasis', 'weakened bone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8v20"/>
      <path d="M36 8v18"/>
      <path d="M28 38v18"/>
      <path d="M36 40v16"/>
      <ellipse cx="32" cy="32" rx="10" ry="6" fill="#8B0000" opacity="0.4"/>
      <path d="M22 28l20 8" stroke="#DC143C" stroke-width="2"/>
      <text x="6" y="58" font-size="4" fill="currentColor" stroke="none">Pathologic</text>
    </svg>`
  },
  {
    id: 'ortho-fx-open',
    name: 'Open Fracture',
    domain: 'medicine',
    category: 'fractures',
    tags: ['open', 'compound', 'fracture', 'skin break', 'contamination'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8v20"/>
      <path d="M36 8v18"/>
      <path d="M28 40v16"/>
      <path d="M36 42v14"/>
      <path d="M32 28l8 -8" stroke-width="2"/>
      <path d="M24 32l20 8" stroke="#DC143C" stroke-width="2"/>
      <path d="M38 18c4-2 8-4 12-2" stroke="#DC143C"/>
      <circle cx="52" cy="14" r="2" fill="#DC143C"/>
      <text x="12" y="58" font-size="5" fill="currentColor" stroke="none">Open</text>
    </svg>`
  },
  {
    id: 'ortho-fx-closed',
    name: 'Closed Fracture',
    domain: 'medicine',
    category: 'fractures',
    tags: ['closed', 'simple', 'fracture', 'intact skin', 'non-compound'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="24" fill="currentColor" opacity="0.1"/>
      <path d="M28 8v22"/>
      <path d="M36 8v20"/>
      <path d="M28 36v20"/>
      <path d="M36 38v18"/>
      <path d="M24 30l16 6" stroke="#DC143C" stroke-width="2"/>
      <text x="12" y="58" font-size="5" fill="currentColor" stroke="none">Closed</text>
    </svg>`
  },
  {
    id: 'ortho-fx-displaced',
    name: 'Displaced Fracture',
    domain: 'medicine',
    category: 'fractures',
    tags: ['displaced', 'fracture', 'malaligned', 'shifted', 'angulated'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8v20"/>
      <path d="M36 8v18"/>
      <path d="M36 40v16"/>
      <path d="M44 42v14"/>
      <path d="M24 28l16 4" stroke="#DC143C" stroke-width="2"/>
      <path d="M32 36l16 4" stroke="#DC143C" stroke-width="2"/>
      <path d="M28 28l12 12" stroke-dasharray="3 2"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Displaced</text>
    </svg>`
  },
  {
    id: 'ortho-fx-angulated',
    name: 'Angulated Fracture',
    domain: 'medicine',
    category: 'fractures',
    tags: ['angulated', 'fracture', 'angular deformity', 'apex', 'malalignment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8v20"/>
      <path d="M36 8v18"/>
      <path d="M24 36l8 20"/>
      <path d="M32 38l8 18"/>
      <path d="M24 28l16 4" stroke="#DC143C" stroke-width="2"/>
      <path d="M20 36l8-4 16 6" stroke-dasharray="2 2"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Angulated</text>
    </svg>`
  },
  {
    id: 'ortho-fx-healing-stage1',
    name: 'Fracture Healing - Inflammation',
    domain: 'medicine',
    category: 'fractures',
    tags: ['healing', 'inflammation', 'hematoma', 'stage 1', 'acute'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8v20"/>
      <path d="M36 8v18"/>
      <path d="M28 38v18"/>
      <path d="M36 40v16"/>
      <ellipse cx="32" cy="32" rx="12" ry="8" fill="#DC143C" opacity="0.4"/>
      <path d="M20 30l24 4" stroke="#DC143C" stroke-width="2"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Inflammation</text>
    </svg>`
  },
  {
    id: 'ortho-fx-healing-stage2',
    name: 'Fracture Healing - Soft Callus',
    domain: 'medicine',
    category: 'fractures',
    tags: ['healing', 'soft callus', 'cartilage', 'stage 2', 'fibrous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8v18"/>
      <path d="M36 8v16"/>
      <path d="M28 42v14"/>
      <path d="M36 44v12"/>
      <ellipse cx="32" cy="32" rx="16" ry="10" fill="#87CEEB" opacity="0.4"/>
      <path d="M20 30l24 4" stroke-dasharray="3 2"/>
      <text x="6" y="58" font-size="4" fill="currentColor" stroke="none">Soft Callus</text>
    </svg>`
  },
  {
    id: 'ortho-fx-healing-stage3',
    name: 'Fracture Healing - Hard Callus',
    domain: 'medicine',
    category: 'fractures',
    tags: ['healing', 'hard callus', 'woven bone', 'stage 3', 'ossification'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8v16"/>
      <path d="M36 8v14"/>
      <path d="M28 44v12"/>
      <path d="M36 46v10"/>
      <ellipse cx="32" cy="32" rx="18" ry="12" fill="currentColor" opacity="0.2"/>
      <path d="M20 30l24 4"/>
      <text x="6" y="58" font-size="4" fill="currentColor" stroke="none">Hard Callus</text>
    </svg>`
  },
  {
    id: 'ortho-fx-healing-stage4',
    name: 'Fracture Healing - Remodeling',
    domain: 'medicine',
    category: 'fractures',
    tags: ['healing', 'remodeling', 'lamellar bone', 'stage 4', 'final'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8v48"/>
      <path d="M36 8v48"/>
      <ellipse cx="32" cy="32" rx="10" ry="6" fill="currentColor" opacity="0.1"/>
      <path d="M26 30h12" stroke-dasharray="2 2"/>
      <text x="6" y="58" font-size="4" fill="currentColor" stroke="none">Remodeled</text>
    </svg>`
  },
  {
    id: 'ortho-fx-nonunion',
    name: 'Nonunion',
    domain: 'medicine',
    category: 'fractures',
    tags: ['nonunion', 'pseudarthrosis', 'failed healing', 'ununited'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8v18"/>
      <path d="M36 8v16"/>
      <path d="M28 40v16"/>
      <path d="M36 42v14"/>
      <ellipse cx="32" cy="32" rx="8" ry="6" fill="#808080" opacity="0.4"/>
      <path d="M24 26c4 1 8 1 12 0"/>
      <path d="M24 38c4-1 8-1 12 0"/>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">Nonunion</text>
    </svg>`
  },

  // ===========================================================================
  // JOINT PATHOLOGY
  // ===========================================================================
  {
    id: 'ortho-osteoarthritis',
    name: 'Osteoarthritis',
    domain: 'medicine',
    category: 'joint-pathology',
    tags: ['osteoarthritis', 'OA', 'degenerative', 'cartilage loss', 'osteophytes'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="16" ry="8"/>
      <ellipse cx="32" cy="48" rx="16" ry="8"/>
      <path d="M16 16v32"/>
      <path d="M48 16v32"/>
      <path d="M20 24c8 1 16 1 24 0" stroke-dasharray="2 2"/>
      <path d="M12 20l4 4"/>
      <path d="M48 20l4 4"/>
      <path d="M12 44l4-4"/>
      <path d="M48 44l4-4"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Osteophytes</text>
    </svg>`
  },
  {
    id: 'ortho-rheumatoid-arthritis',
    name: 'Rheumatoid Arthritis',
    domain: 'medicine',
    category: 'joint-pathology',
    tags: ['rheumatoid', 'RA', 'inflammatory', 'synovitis', 'pannus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="14" ry="8"/>
      <ellipse cx="32" cy="48" rx="14" ry="8"/>
      <ellipse cx="32" cy="32" rx="18" ry="10" fill="#DC143C" opacity="0.3"/>
      <path d="M18 16v32"/>
      <path d="M46 16v32"/>
      <circle cx="24" cy="32" r="2" fill="#DC143C"/>
      <circle cx="32" cy="30" r="2" fill="#DC143C"/>
      <circle cx="40" cy="34" r="2" fill="#DC143C"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Synovitis</text>
    </svg>`
  },
  {
    id: 'ortho-joint-effusion',
    name: 'Joint Effusion',
    domain: 'medicine',
    category: 'joint-pathology',
    tags: ['effusion', 'fluid', 'swelling', 'synovial', 'inflammation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="14" rx="14" ry="8"/>
      <ellipse cx="32" cy="50" rx="14" ry="8"/>
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#4169E1" opacity="0.3"/>
      <path d="M18 14v36"/>
      <path d="M46 14v36"/>
      <path d="M24 28c4 4 12 4 16 0"/>
      <path d="M24 36c4-4 12-4 16 0"/>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">Effusion</text>
    </svg>`
  },
  {
    id: 'ortho-meniscus-tear',
    name: 'Meniscus Tear',
    domain: 'medicine',
    category: 'joint-pathology',
    tags: ['meniscus', 'tear', 'knee', 'cartilage', 'bucket handle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="12"/>
      <path d="M12 32c8 4 16 4 20 0"/>
      <path d="M32 32c4 4 12 4 20 0"/>
      <path d="M28 28l8 8" stroke="#DC143C" stroke-width="2"/>
      <path d="M28 36l4-4 4 4" stroke="#DC143C"/>
      <text x="6" y="54" font-size="4" fill="currentColor" stroke="none">Meniscus tear</text>
    </svg>`
  },
  {
    id: 'ortho-acl-injury',
    name: 'ACL Injury',
    domain: 'medicine',
    category: 'joint-pathology',
    tags: ['ACL', 'anterior cruciate', 'ligament', 'knee', 'rupture'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="16" ry="8"/>
      <ellipse cx="32" cy="48" rx="16" ry="8"/>
      <path d="M24 24l16 16" stroke="#228B22" stroke-width="2"/>
      <path d="M24 40l8-8" stroke="#DC143C" stroke-width="2"/>
      <path d="M36 28l4 4" stroke="#DC143C" stroke-width="2" stroke-dasharray="3 2"/>
      <circle cx="32" cy="32" r="3" fill="#DC143C" opacity="0.5"/>
      <text x="44" y="28" font-size="4" fill="currentColor" stroke="none">ACL</text>
      <text x="44" y="40" font-size="4" fill="currentColor" stroke="none">PCL</text>
    </svg>`
  },
  {
    id: 'ortho-mcl-injury',
    name: 'MCL Injury',
    domain: 'medicine',
    category: 'joint-pathology',
    tags: ['MCL', 'medial collateral', 'ligament', 'knee', 'sprain'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="16" ry="8"/>
      <ellipse cx="32" cy="48" rx="16" ry="8"/>
      <path d="M16 16v32" stroke="#228B22" stroke-width="2"/>
      <path d="M48 16v32" stroke="#228B22" stroke-width="2"/>
      <path d="M16 24v8" stroke="#DC143C" stroke-width="3"/>
      <circle cx="16" cy="32" r="4" fill="#DC143C" opacity="0.4"/>
      <text x="4" y="36" font-size="4" fill="currentColor" stroke="none">MCL</text>
    </svg>`
  },
  {
    id: 'ortho-rotator-cuff',
    name: 'Rotator Cuff Tear',
    domain: 'medicine',
    category: 'joint-pathology',
    tags: ['rotator cuff', 'shoulder', 'supraspinatus', 'tear', 'tendon'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="12"/>
      <path d="M44 28c8 0 12 4 12 8"/>
      <path d="M20 28c-8 0-12 4-12 8"/>
      <path d="M32 16c0-8 4-12 8-12"/>
      <path d="M32 40v16"/>
      <path d="M36 18l8-4" stroke="#DC143C" stroke-width="2" stroke-dasharray="3 2"/>
      <circle cx="44" cy="14" r="3" fill="#DC143C" opacity="0.4"/>
      <text x="48" y="18" font-size="4" fill="currentColor" stroke="none">Tear</text>
    </svg>`
  },
  {
    id: 'ortho-labral-tear',
    name: 'Labral Tear',
    domain: 'medicine',
    category: 'joint-pathology',
    tags: ['labrum', 'tear', 'shoulder', 'hip', 'SLAP', 'Bankart'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="20" stroke-dasharray="4 2"/>
      <path d="M44 20l8-8" stroke="#DC143C" stroke-width="2"/>
      <circle cx="48" cy="16" r="4" fill="#DC143C" opacity="0.4"/>
      <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.2"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Labral tear</text>
    </svg>`
  },
  {
    id: 'ortho-gout',
    name: 'Gout',
    domain: 'medicine',
    category: 'joint-pathology',
    tags: ['gout', 'uric acid', 'tophi', 'crystal', 'inflammatory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="#DC143C" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <polygon points="28,24 32,20 36,24 32,28" fill="#FFD700"/>
      <polygon points="24,34 28,30 32,34 28,38" fill="#FFD700"/>
      <polygon points="36,36 40,32 44,36 40,40" fill="#FFD700"/>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">Urate crystals</text>
    </svg>`
  },
  {
    id: 'ortho-bursitis',
    name: 'Bursitis',
    domain: 'medicine',
    category: 'joint-pathology',
    tags: ['bursitis', 'bursa', 'inflammation', 'swelling', 'olecranon'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v48"/>
      <ellipse cx="20" cy="32" rx="12" ry="16" fill="#DC143C" opacity="0.3"/>
      <ellipse cx="20" cy="32" rx="12" ry="16"/>
      <path d="M8 24c4 1 8 1 12 0"/>
      <path d="M8 40c4-1 8-1 12 0"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Bursitis</text>
    </svg>`
  },
  {
    id: 'ortho-dislocation',
    name: 'Joint Dislocation',
    domain: 'medicine',
    category: 'joint-pathology',
    tags: ['dislocation', 'luxation', 'displaced', 'unstable', 'subluxation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="20" rx="12" ry="8"/>
      <ellipse cx="40" cy="44" rx="12" ry="8"/>
      <path d="M24 28v8"/>
      <path d="M40 36v-8" stroke-dasharray="3 2"/>
      <path d="M28 28l8 4" stroke="#DC143C" stroke-width="2"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Dislocated</text>
    </svg>`
  },
  {
    id: 'ortho-cartilage-defect',
    name: 'Cartilage Defect',
    domain: 'medicine',
    category: 'joint-pathology',
    tags: ['cartilage', 'defect', 'chondral', 'osteochondral', 'lesion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="20" ry="8"/>
      <path d="M12 20v8c0 4 8 8 20 8s20-4 20-8v-8"/>
      <rect x="26" y="24" width="12" height="8" fill="#DC143C" opacity="0.4"/>
      <ellipse cx="32" cy="48" rx="20" ry="8"/>
      <path d="M12 40v8"/>
      <path d="M52 40v8"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Chondral defect</text>
    </svg>`
  },

  // ===========================================================================
  // SPINE
  // ===========================================================================
  {
    id: 'ortho-vertebra',
    name: 'Vertebra',
    domain: 'medicine',
    category: 'spine',
    tags: ['vertebra', 'body', 'pedicle', 'lamina', 'spinous process'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="16" ry="8"/>
      <path d="M24 32l-8-16"/>
      <path d="M40 32l8-16"/>
      <path d="M16 16l-8-8"/>
      <path d="M48 16l8-8"/>
      <path d="M32 32v-24"/>
      <circle cx="32" cy="36" r="4" fill="currentColor" opacity="0.2"/>
      <text x="26" y="60" font-size="4" fill="currentColor" stroke="none">Body</text>
    </svg>`
  },
  {
    id: 'ortho-disc',
    name: 'Intervertebral Disc',
    domain: 'medicine',
    category: 'spine',
    tags: ['disc', 'intervertebral', 'nucleus', 'annulus', 'IVD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="20" ry="8"/>
      <ellipse cx="32" cy="48" rx="20" ry="8"/>
      <ellipse cx="32" cy="32" rx="18" ry="10" fill="#4169E1" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="18" ry="10"/>
      <ellipse cx="32" cy="32" rx="8" ry="4" fill="#87CEEB"/>
      <text x="20" y="36" font-size="4" fill="currentColor" stroke="none">NP</text>
    </svg>`
  },
  {
    id: 'ortho-disc-herniation',
    name: 'Disc Herniation',
    domain: 'medicine',
    category: 'spine',
    tags: ['herniation', 'disc', 'bulge', 'protrusion', 'extrusion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="18" ry="8"/>
      <ellipse cx="32" cy="48" rx="18" ry="8"/>
      <ellipse cx="32" cy="32" rx="16" ry="8"/>
      <path d="M48 32c8 2 10 6 8 10" fill="#DC143C" opacity="0.4"/>
      <path d="M48 32c8 2 10 6 8 10" stroke="#DC143C" stroke-width="2"/>
      <path d="M52 38l4 4"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Herniation</text>
    </svg>`
  },
  {
    id: 'ortho-spinal-stenosis',
    name: 'Spinal Stenosis',
    domain: 'medicine',
    category: 'spine',
    tags: ['stenosis', 'narrowing', 'canal', 'central', 'foraminal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="20" ry="8"/>
      <ellipse cx="32" cy="48" rx="20" ry="8"/>
      <path d="M16 16v32"/>
      <path d="M48 16v32"/>
      <ellipse cx="32" cy="32" rx="6" ry="8" fill="#DC143C" opacity="0.3"/>
      <path d="M26 24v16"/>
      <path d="M38 24v16"/>
      <path d="M32 16v8" stroke="#FFD700" stroke-width="2"/>
      <path d="M32 40v8" stroke="#FFD700" stroke-width="2"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Stenosis</text>
    </svg>`
  },
  {
    id: 'ortho-spondylolisthesis',
    name: 'Spondylolisthesis',
    domain: 'medicine',
    category: 'spine',
    tags: ['spondylolisthesis', 'slippage', 'vertebra', 'anterolisthesis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="28" cy="20" rx="16" ry="6"/>
      <ellipse cx="36" cy="44" rx="16" ry="6"/>
      <path d="M12 20v8"/>
      <path d="M44 20v8l-4 8"/>
      <path d="M20 36v8"/>
      <path d="M52 36v8"/>
      <path d="M28 26l8 10" stroke="#DC143C" stroke-width="2" stroke-dasharray="3 2"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Spondylolisthesis</text>
    </svg>`
  },
  {
    id: 'ortho-scoliosis',
    name: 'Scoliosis',
    domain: 'medicine',
    category: 'spine',
    tags: ['scoliosis', 'curvature', 'lateral', 'spine', 'Cobb angle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-8 8-12 16-8 24s12 16 8 24" stroke-width="2"/>
      <ellipse cx="24" cy="20" rx="8" ry="4"/>
      <ellipse cx="38" cy="32" rx="8" ry="4"/>
      <ellipse cx="24" cy="44" rx="8" ry="4"/>
      <path d="M32 8v48" stroke-dasharray="3 2"/>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">Scoliosis</text>
    </svg>`
  },
  {
    id: 'ortho-kyphosis',
    name: 'Kyphosis',
    domain: 'medicine',
    category: 'spine',
    tags: ['kyphosis', 'curvature', 'thoracic', 'hunchback', 'Scheuermann'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8c-4 12-8 24 0 36 8 12 16 16 16 16" stroke-width="2"/>
      <ellipse cx="22" cy="16" rx="6" ry="4"/>
      <ellipse cx="18" cy="28" rx="6" ry="4"/>
      <ellipse cx="20" cy="40" rx="6" ry="4"/>
      <ellipse cx="28" cy="50" rx="6" ry="4"/>
      <text x="36" y="32" font-size="4" fill="currentColor" stroke="none">Kyphosis</text>
    </svg>`
  },
  {
    id: 'ortho-compression-fx',
    name: 'Vertebral Compression Fracture',
    domain: 'medicine',
    category: 'spine',
    tags: ['compression', 'fracture', 'vertebra', 'osteoporotic', 'wedge'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="16" ry="6"/>
      <path d="M16 12v8"/>
      <path d="M48 12v8"/>
      <path d="M20 20l24 0l-4 12l-16 0z" fill="currentColor" opacity="0.2"/>
      <path d="M20 20l-4 12"/>
      <path d="M44 20l4 12"/>
      <path d="M16 32h32" stroke="#DC143C" stroke-width="2"/>
      <ellipse cx="32" cy="52" rx="16" ry="6"/>
      <path d="M16 40v12"/>
      <path d="M48 40v12"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Compression Fx</text>
    </svg>`
  },
  {
    id: 'ortho-burst-fx',
    name: 'Burst Fracture',
    domain: 'medicine',
    category: 'spine',
    tags: ['burst', 'fracture', 'vertebra', 'unstable', 'retropulsion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="16" ry="6"/>
      <ellipse cx="32" cy="52" rx="16" ry="6"/>
      <path d="M24 20l-4 8 4 8-4 8"/>
      <path d="M40 20l4 8-4 8 4 8"/>
      <path d="M28 24l4 8-4 8 4 8"/>
      <path d="M36 24l-4 8 4 8-4 8"/>
      <circle cx="32" cy="32" r="4" fill="#DC143C" opacity="0.4"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Burst Fx</text>
    </svg>`
  },
  {
    id: 'ortho-cord-compression',
    name: 'Spinal Cord Compression',
    domain: 'medicine',
    category: 'spine',
    tags: ['cord', 'compression', 'myelopathy', 'neurologic', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="18" ry="6"/>
      <ellipse cx="32" cy="52" rx="18" ry="6"/>
      <path d="M14 12v40"/>
      <path d="M50 12v40"/>
      <path d="M32 8v12"/>
      <path d="M32 44v12" stroke="#FFD700" stroke-width="3"/>
      <ellipse cx="32" cy="32" rx="6" ry="8" fill="#DC143C" opacity="0.4"/>
      <path d="M26 28h12"/>
      <path d="M26 36h12"/>
      <text x="4" y="60" font-size="3" fill="currentColor" stroke="none">Cord compression</text>
    </svg>`
  },
  {
    id: 'ortho-facet-joint',
    name: 'Facet Joint',
    domain: 'medicine',
    category: 'spine',
    tags: ['facet', 'zygapophyseal', 'joint', 'arthropathy', 'posterior'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="44" rx="14" ry="6"/>
      <path d="M24 38l-8-20"/>
      <path d="M40 38l8-20"/>
      <ellipse cx="18" cy="24" rx="4" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="46" cy="24" rx="4" ry="6" fill="currentColor" opacity="0.2"/>
      <path d="M18 18v12"/>
      <path d="M46 18v12"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Facet joints</text>
    </svg>`
  },
  {
    id: 'ortho-nerve-root',
    name: 'Nerve Root',
    domain: 'medicine',
    category: 'spine',
    tags: ['nerve', 'root', 'radiculopathy', 'foramen', 'compression'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="16" ry="6"/>
      <ellipse cx="32" cy="48" rx="16" ry="6"/>
      <path d="M16 16v32"/>
      <path d="M48 16v32"/>
      <path d="M32 10v44" stroke="#FFD700" stroke-width="2"/>
      <path d="M32 28l-16 8" stroke="#FFD700" stroke-width="2"/>
      <path d="M32 28l16 8" stroke="#FFD700" stroke-width="2"/>
      <circle cx="20" cy="34" r="3" fill="#DC143C" opacity="0.4"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Nerve root</text>
    </svg>`
  },

  // ===========================================================================
  // SOFT TISSUE
  // ===========================================================================
  {
    id: 'ortho-muscle',
    name: 'Muscle',
    domain: 'medicine',
    category: 'soft-tissue',
    tags: ['muscle', 'skeletal', 'fiber', 'belly', 'origin insertion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16l8 4c8 4 16 4 24 0l8-4"/>
      <path d="M24 20c-4 12-4 24 0 32"/>
      <path d="M48 16c4 12 4 28 0 36"/>
      <path d="M16 48l8-4c8-4 16-4 24 0l8 4"/>
      <path d="M28 28h8" stroke-dasharray="2 2"/>
      <path d="M28 36h8" stroke-dasharray="2 2"/>
      <ellipse cx="36" cy="32" rx="8" ry="12" fill="currentColor" opacity="0.1"/>
    </svg>`
  },
  {
    id: 'ortho-tendon',
    name: 'Tendon',
    domain: 'medicine',
    category: 'soft-tissue',
    tags: ['tendon', 'collagen', 'attachment', 'enthesis', 'fibrous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="12" ry="6" fill="currentColor" opacity="0.2"/>
      <path d="M26 18v28"/>
      <path d="M38 18v28"/>
      <path d="M26 46l-6 10"/>
      <path d="M38 46l6 10"/>
      <rect x="16" y="52" width="32" height="8" rx="2"/>
      <path d="M28 28h8" stroke-dasharray="2 2"/>
      <path d="M28 38h8" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'ortho-ligament',
    name: 'Ligament',
    domain: 'medicine',
    category: 'soft-tissue',
    tags: ['ligament', 'collagen', 'joint', 'stability', 'bone to bone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="16" height="12" rx="2"/>
      <rect x="36" y="44" width="16" height="12" rx="2"/>
      <path d="M28 16c4 8 8 16 8 28" stroke-width="3"/>
      <path d="M22 20c4 6 6 14 8 22"/>
      <path d="M26 18c4 8 8 18 10 28"/>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">Ligament</text>
    </svg>`
  },
  {
    id: 'ortho-cartilage',
    name: 'Articular Cartilage',
    domain: 'medicine',
    category: 'soft-tissue',
    tags: ['cartilage', 'articular', 'hyaline', 'chondrocyte', 'smooth'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="20" rx="2"/>
      <rect x="12" y="28" width="40" height="8" rx="1" fill="#87CEEB" opacity="0.5"/>
      <rect x="12" y="28" width="40" height="8" rx="1"/>
      <rect x="12" y="36" width="40" height="20" rx="2"/>
      <path d="M20 30h8"/>
      <path d="M36 30h8"/>
      <path d="M20 34h24"/>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">Cartilage</text>
    </svg>`
  },
  {
    id: 'ortho-bursa',
    name: 'Bursa',
    domain: 'medicine',
    category: 'soft-tissue',
    tags: ['bursa', 'synovial', 'fluid', 'cushion', 'friction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="16" rx="2"/>
      <ellipse cx="32" cy="36" rx="16" ry="8" fill="#4169E1" opacity="0.3"/>
      <ellipse cx="32" cy="36" rx="16" ry="8"/>
      <rect x="8" y="44" width="48" height="16" rx="2"/>
      <text x="22" y="40" font-size="4" fill="currentColor" stroke="none">Bursa</text>
    </svg>`
  },
  {
    id: 'ortho-tendinitis',
    name: 'Tendinitis',
    domain: 'medicine',
    category: 'soft-tissue',
    tags: ['tendinitis', 'inflammation', 'tendon', 'overuse', 'pain'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="10" ry="6"/>
      <path d="M26 18v28"/>
      <path d="M38 18v28"/>
      <ellipse cx="32" cy="32" rx="10" ry="8" fill="#DC143C" opacity="0.4"/>
      <rect x="18" y="48" width="28" height="10" rx="2"/>
      <path d="M32 24v16" stroke="#DC143C" stroke-width="2" stroke-dasharray="3 2"/>
      <text x="10" y="62" font-size="4" fill="currentColor" stroke="none">Tendinitis</text>
    </svg>`
  },
  {
    id: 'ortho-fasciitis',
    name: 'Plantar Fasciitis',
    domain: 'medicine',
    category: 'soft-tissue',
    tags: ['fasciitis', 'plantar', 'heel', 'pain', 'fascia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="32" rx="10" ry="16"/>
      <path d="M26 32h30c4 0 6 4 4 8"/>
      <path d="M16 48c16 4 32 4 44 0"/>
      <path d="M26 32c12 2 24 4 30 4" stroke="#DC143C" stroke-width="2"/>
      <ellipse cx="32" cy="38" rx="6" ry="4" fill="#DC143C" opacity="0.4"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Plantar fasciitis</text>
    </svg>`
  },
  {
    id: 'ortho-muscle-strain',
    name: 'Muscle Strain',
    domain: 'medicine',
    category: 'soft-tissue',
    tags: ['strain', 'muscle', 'tear', 'pull', 'injury'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 12l8 4c8 4 16 4 24 0l8-4"/>
      <path d="M24 16c-4 12-4 28 0 36"/>
      <path d="M48 12c4 12 4 28 0 40"/>
      <path d="M16 52l8-4c8-4 16-4 24 0l8 4"/>
      <path d="M32 28l8 8" stroke="#DC143C" stroke-width="2"/>
      <path d="M36 28l-4 4 4 4" stroke="#DC143C"/>
      <ellipse cx="36" cy="32" rx="8" ry="6" fill="#DC143C" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'ortho-tendon-rupture',
    name: 'Tendon Rupture',
    domain: 'medicine',
    category: 'soft-tissue',
    tags: ['rupture', 'tendon', 'complete tear', 'Achilles', 'patellar'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="10" rx="10" ry="4"/>
      <path d="M26 14v12"/>
      <path d="M38 14v10"/>
      <path d="M26 26l-4 4" stroke="#DC143C" stroke-width="2"/>
      <path d="M38 24l4 4" stroke="#DC143C" stroke-width="2"/>
      <path d="M26 38v12"/>
      <path d="M38 40v10"/>
      <ellipse cx="32" cy="54" rx="10" ry="4"/>
      <path d="M22 30l4 4-4 4" stroke="#DC143C"/>
      <path d="M42 28l-4 4 4 4" stroke="#DC143C"/>
      <text x="10" y="62" font-size="4" fill="currentColor" stroke="none">Rupture</text>
    </svg>`
  },
  {
    id: 'ortho-synovium',
    name: 'Synovium',
    domain: 'medicine',
    category: 'soft-tissue',
    tags: ['synovium', 'synovial', 'membrane', 'joint lining', 'fluid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="18" ry="8"/>
      <ellipse cx="32" cy="48" rx="18" ry="8"/>
      <path d="M14 16v32" stroke="#DC143C"/>
      <path d="M50 16v32" stroke="#DC143C"/>
      <ellipse cx="32" cy="32" rx="14" ry="10" fill="#4169E1" opacity="0.2"/>
      <path d="M18 24c4 1 8 1 12 0"/>
      <path d="M34 24c4 1 8 1 12 0"/>
      <path d="M18 40c4-1 8-1 12 0"/>
      <path d="M34 40c4-1 8-1 12 0"/>
      <text x="10" y="60" font-size="4" fill="currentColor" stroke="none">Synovium</text>
    </svg>`
  },

  // ===========================================================================
  // EQUIPMENT & PROCEDURES
  // ===========================================================================
  {
    id: 'ortho-xray',
    name: 'X-Ray',
    domain: 'medicine',
    category: 'equipment',
    tags: ['xray', 'radiograph', 'imaging', 'plain film', 'radiation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <rect x="16" y="12" width="32" height="36" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M32 16v28"/>
      <path d="M24 24h16"/>
      <path d="M32 44l-6 8"/>
      <path d="M32 44l6 8"/>
      <text x="24" y="60" font-size="4" fill="currentColor" stroke="none">X-Ray</text>
    </svg>`
  },
  {
    id: 'ortho-mri-joint',
    name: 'MRI Joint',
    domain: 'medicine',
    category: 'equipment',
    tags: ['MRI', 'magnetic resonance', 'imaging', 'soft tissue', 'joint'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16"/>
      <ellipse cx="32" cy="32" rx="16" ry="10" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="8" ry="5" fill="#4169E1" opacity="0.3"/>
      <path d="M8 32h48"/>
      <path d="M32 16v32"/>
      <text x="22" y="58" font-size="4" fill="currentColor" stroke="none">MRI</text>
    </svg>`
  },
  {
    id: 'ortho-ct-scan',
    name: 'CT Scan',
    domain: 'medicine',
    category: 'equipment',
    tags: ['CT', 'computed tomography', 'imaging', 'cross-section', 'bone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="18" stroke-dasharray="4 2"/>
      <circle cx="32" cy="32" r="10" fill="currentColor" opacity="0.2"/>
      <path d="M32 8v48"/>
      <path d="M8 32h48"/>
      <text x="22" y="60" font-size="4" fill="currentColor" stroke="none">CT</text>
    </svg>`
  },
  {
    id: 'ortho-cast',
    name: 'Cast',
    domain: 'medicine',
    category: 'equipment',
    tags: ['cast', 'plaster', 'fiberglass', 'immobilization', 'fracture'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-4 0-8 4-8 8v32c0 4 4 8 8 8"/>
      <path d="M44 8c4 0 8 4 8 8v32c0 4-4 8-8 8"/>
      <path d="M20 8h24"/>
      <path d="M20 56h24"/>
      <rect x="16" y="12" width="32" height="40" rx="4" fill="currentColor" opacity="0.1"/>
      <path d="M24 20h16"/>
      <path d="M24 32h16"/>
      <path d="M24 44h16"/>
    </svg>`
  },
  {
    id: 'ortho-splint',
    name: 'Splint',
    domain: 'medicine',
    category: 'equipment',
    tags: ['splint', 'immobilization', 'temporary', 'support', 'padding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="48" rx="2"/>
      <rect x="20" y="16" width="8" height="32" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="36" y="16" width="8" height="32" rx="1" fill="currentColor" opacity="0.2"/>
      <path d="M16 24h32"/>
      <path d="M16 40h32"/>
      <text x="18" y="60" font-size="4" fill="currentColor" stroke="none">Splint</text>
    </svg>`
  },
  {
    id: 'ortho-external-fixator',
    name: 'External Fixator',
    domain: 'medicine',
    category: 'equipment',
    tags: ['external fixator', 'ex-fix', 'pins', 'frame', 'fracture'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="8" width="8" height="48" rx="2"/>
      <path d="M8 16h20"/>
      <path d="M36 16h20"/>
      <path d="M8 32h20"/>
      <path d="M36 32h20"/>
      <path d="M8 48h20"/>
      <path d="M36 48h20"/>
      <circle cx="8" cy="16" r="3"/>
      <circle cx="56" cy="16" r="3"/>
      <circle cx="8" cy="32" r="3"/>
      <circle cx="56" cy="32" r="3"/>
      <circle cx="8" cy="48" r="3"/>
      <circle cx="56" cy="48" r="3"/>
      <path d="M8 16v32" stroke-width="2"/>
      <path d="M56 16v32" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'ortho-plate-screws',
    name: 'Plate and Screws',
    domain: 'medicine',
    category: 'equipment',
    tags: ['plate', 'screws', 'ORIF', 'internal fixation', 'hardware'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="48" rx="2"/>
      <rect x="26" y="16" width="12" height="4" rx="1" fill="currentColor"/>
      <rect x="26" y="28" width="12" height="4" rx="1" fill="currentColor"/>
      <rect x="26" y="40" width="12" height="4" rx="1" fill="currentColor"/>
      <circle cx="32" cy="18" r="2"/>
      <circle cx="32" cy="30" r="2"/>
      <circle cx="32" cy="42" r="2"/>
      <path d="M32 16v-4"/>
      <path d="M32 28v-4"/>
      <path d="M32 40v-4"/>
      <path d="M32 44v8"/>
      <text x="44" y="32" font-size="4" fill="currentColor" stroke="none">Plate</text>
    </svg>`
  },
  {
    id: 'ortho-im-nail',
    name: 'Intramedullary Nail',
    domain: 'medicine',
    category: 'equipment',
    tags: ['IM nail', 'intramedullary', 'rod', 'internal fixation', 'femur'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8v48"/>
      <path d="M40 8v48"/>
      <rect x="28" y="12" width="8" height="40" rx="2" fill="currentColor" opacity="0.3"/>
      <path d="M20 16l8 4"/>
      <path d="M36 20l8-4"/>
      <path d="M20 44l8-4"/>
      <path d="M36 40l8 4"/>
      <circle cx="24" cy="16" r="2"/>
      <circle cx="40" cy="16" r="2"/>
      <circle cx="24" cy="44" r="2"/>
      <circle cx="40" cy="44" r="2"/>
      <text x="44" y="32" font-size="3" fill="currentColor" stroke="none">IM Nail</text>
    </svg>`
  },
  {
    id: 'ortho-hip-replacement',
    name: 'Total Hip Replacement',
    domain: 'medicine',
    category: 'equipment',
    tags: ['hip replacement', 'THA', 'arthroplasty', 'prosthesis', 'implant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="14" ry="8" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="16" r="6" fill="currentColor"/>
      <path d="M32 22v8"/>
      <path d="M26 30l6 26"/>
      <path d="M38 30l-6 26"/>
      <ellipse cx="32" cy="56" rx="4" ry="2"/>
      <path d="M24 28c4 1 12 1 16 0"/>
      <text x="44" y="20" font-size="3" fill="currentColor" stroke="none">THA</text>
    </svg>`
  },
  {
    id: 'ortho-knee-replacement',
    name: 'Total Knee Replacement',
    domain: 'medicine',
    category: 'equipment',
    tags: ['knee replacement', 'TKA', 'arthroplasty', 'prosthesis', 'implant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8v16"/>
      <path d="M36 8v16"/>
      <rect x="20" y="24" width="24" height="8" rx="2" fill="currentColor" opacity="0.3"/>
      <rect x="22" y="32" width="20" height="4" rx="1" fill="currentColor"/>
      <rect x="20" y="36" width="24" height="8" rx="2" fill="currentColor" opacity="0.3"/>
      <path d="M28 44v12"/>
      <path d="M36 44v12"/>
      <text x="44" y="32" font-size="3" fill="currentColor" stroke="none">TKA</text>
    </svg>`
  },
  {
    id: 'ortho-arthroscope',
    name: 'Arthroscope',
    domain: 'medicine',
    category: 'equipment',
    tags: ['arthroscope', 'arthroscopy', 'scope', 'minimally invasive', 'camera'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 12l40 40"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="3" fill="currentColor"/>
      <rect x="46" y="46" width="12" height="12" rx="2"/>
      <path d="M16 16l4 4"/>
      <path d="M24 24l4 4"/>
      <path d="M32 32l4 4"/>
      <path d="M40 40l4 4"/>
      <text x="4" y="60" font-size="3" fill="currentColor" stroke="none">Arthroscope</text>
    </svg>`
  },
  {
    id: 'ortho-bone-graft',
    name: 'Bone Graft',
    domain: 'medicine',
    category: 'equipment',
    tags: ['bone graft', 'autograft', 'allograft', 'fusion', 'substitute'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="20" rx="2"/>
      <rect x="24" y="36" width="16" height="20" rx="2"/>
      <path d="M20 28h24"/>
      <ellipse cx="32" cy="32" rx="8" ry="6" fill="#90EE90" opacity="0.5"/>
      <circle cx="28" cy="30" r="2" fill="currentColor"/>
      <circle cx="36" cy="34" r="2" fill="currentColor"/>
      <circle cx="32" cy="32" r="1.5" fill="currentColor"/>
      <text x="12" y="60" font-size="3" fill="currentColor" stroke="none">Bone Graft</text>
    </svg>`
  },
  {
    id: 'ortho-traction',
    name: 'Skeletal Traction',
    domain: 'medicine',
    category: 'equipment',
    tags: ['traction', 'skeletal', 'pin', 'weight', 'alignment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16h32"/>
      <path d="M32 16v8"/>
      <path d="M24 24h16"/>
      <path d="M24 24v24"/>
      <path d="M40 24v24"/>
      <circle cx="32" cy="32" r="4"/>
      <path d="M32 36v16"/>
      <rect x="26" y="52" width="12" height="8" rx="1" fill="currentColor" opacity="0.3"/>
      <text x="46" y="58" font-size="3" fill="currentColor" stroke="none">5kg</text>
    </svg>`
  },
  {
    id: 'ortho-dexa-scan',
    name: 'DEXA Scan',
    domain: 'medicine',
    category: 'equipment',
    tags: ['DEXA', 'bone density', 'osteoporosis', 'DXA', 'BMD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="28" width="48" height="24" rx="4"/>
      <path d="M16 40h32"/>
      <ellipse cx="32" cy="20" rx="12" ry="6"/>
      <path d="M24 26v6"/>
      <path d="M40 26v6"/>
      <path d="M32 14v-6"/>
      <path d="M28 10h8"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">DEXA</text>
    </svg>`
  },
  {
    id: 'ortho-ultrasound',
    name: 'Musculoskeletal Ultrasound',
    domain: 'medicine',
    category: 'equipment',
    tags: ['ultrasound', 'MSK', 'sonography', 'imaging', 'dynamic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="24" rx="4"/>
      <path d="M28 32v8"/>
      <path d="M36 32v8"/>
      <ellipse cx="32" cy="44" rx="12" ry="6"/>
      <path d="M24 50c4 4 12 4 16 0"/>
      <path d="M28 16c4 2 8 0 8 0" stroke-dasharray="2 2"/>
      <path d="M28 22c4 2 8 0 8 0" stroke-dasharray="2 2"/>
      <text x="44" y="20" font-size="3" fill="currentColor" stroke="none">US</text>
    </svg>`
  },
  {
    id: 'ortho-injection',
    name: 'Joint Injection',
    domain: 'medicine',
    category: 'equipment',
    tags: ['injection', 'steroid', 'corticosteroid', 'aspiration', 'hyaluronic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="8" width="8" height="24" rx="1"/>
      <path d="M30 8v-4h4v4"/>
      <path d="M32 32v8"/>
      <path d="M32 40l-2 4h4l-2-4" fill="currentColor"/>
      <ellipse cx="32" cy="52" rx="16" ry="8" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="52" rx="16" ry="8"/>
      <path d="M32 44v8" stroke="#4169E1" stroke-width="2"/>
    </svg>`
  },
];

export default orthopedicsIcons;
