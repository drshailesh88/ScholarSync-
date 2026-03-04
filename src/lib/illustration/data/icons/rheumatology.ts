/**
 * Rheumatology Icon Library
 * Comprehensive SVG icons for rheumatologic conditions and musculoskeletal medicine
 *
 * Categories:
 * - Joint Anatomy (synovial joint, cartilage, synovium, joint capsule, bursa, tendon sheath, ligaments)
 * - Inflammatory Arthritis (RA, psoriatic arthritis, gout, pseudogout, ankylosing spondylitis)
 * - Connective Tissue Diseases (lupus, scleroderma, dermatomyositis, Sjogren's, vasculitis)
 * - Osteoarthritis (OA changes, osteophytes, joint space narrowing, nodes)
 * - Autoantibodies & Labs (ANA, RF, anti-CCP, anti-dsDNA, complement, inflammatory markers)
 * - Imaging (X-ray, MRI, ultrasound, bone scan, erosions, enthesitis)
 * - Treatment (DMARDs, biologics, steroids, injections, physical therapy)
 */

import type { IconDefinition } from './index';

export const rheumatologyIcons: IconDefinition[] = [
  // ===========================================================================
  // JOINT ANATOMY
  // ===========================================================================
  {
    id: 'rheum-synovial-joint',
    name: 'Synovial Joint',
    domain: 'medicine',
    category: 'joint-anatomy',
    tags: ['synovial', 'joint', 'anatomy', 'diarthrodial', 'articular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="18" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="44" rx="18" ry="10" fill="currentColor" opacity="0.2"/>
      <path d="M14 20v24"/>
      <path d="M50 20v24"/>
      <ellipse cx="32" cy="32" rx="12" ry="4" fill="#FFE4B5" opacity="0.5"/>
      <path d="M20 28c8 4 16 4 24 0" stroke-dasharray="2 2"/>
      <path d="M20 36c8-4 16-4 24 0" stroke-dasharray="2 2"/>
      <text x="22" y="8" font-size="4" fill="currentColor" stroke="none">Bone</text>
      <text x="22" y="60" font-size="4" fill="currentColor" stroke="none">Bone</text>
    </svg>`
  },
  {
    id: 'rheum-cartilage',
    name: 'Articular Cartilage',
    domain: 'medicine',
    category: 'joint-anatomy',
    tags: ['cartilage', 'articular', 'hyaline', 'chondrocyte', 'matrix'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <path d="M12 20h40" stroke-dasharray="3 2"/>
      <path d="M12 32h40"/>
      <path d="M12 44h40" stroke-dasharray="3 2"/>
      <circle cx="24" cy="14" r="2" fill="#4169E1"/>
      <circle cx="36" cy="14" r="2" fill="#4169E1"/>
      <circle cx="20" cy="26" r="2" fill="#4169E1"/>
      <circle cx="32" cy="26" r="2" fill="#4169E1"/>
      <circle cx="44" cy="26" r="2" fill="#4169E1"/>
      <circle cx="24" cy="38" r="2" fill="#4169E1"/>
      <circle cx="40" cy="38" r="2" fill="#4169E1"/>
      <text x="4" y="14" font-size="3" fill="currentColor" stroke="none">SZ</text>
      <text x="4" y="26" font-size="3" fill="currentColor" stroke="none">MZ</text>
      <text x="4" y="44" font-size="3" fill="currentColor" stroke="none">DZ</text>
    </svg>`
  },
  {
    id: 'rheum-synovium',
    name: 'Synovial Membrane',
    domain: 'medicine',
    category: 'joint-anatomy',
    tags: ['synovium', 'synovial', 'membrane', 'lining', 'synoviocytes'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16c0 0 12-4 24-4s24 4 24 4v32c0 0-12 4-24 4s-24-4-24-4V16z" fill="#FFB6C1" opacity="0.3"/>
      <path d="M8 16c0 0 12-4 24-4s24 4 24 4"/>
      <path d="M8 48c0 0 12 4 24 4s24-4 24-4"/>
      <path d="M12 20c4-1 8-2 12-2s8 1 12 2 8 2 12 2 8-1 12-2" stroke-width="2"/>
      <path d="M12 44c4 1 8 2 12 2s8-1 12-2 8-2 12-2 8 1 12 2" stroke-width="2"/>
      <circle cx="20" cy="28" r="2" fill="currentColor"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <circle cx="44" cy="30" r="2" fill="currentColor"/>
      <text x="22" y="40" font-size="4" fill="currentColor" stroke="none">Synovial</text>
      <text x="26" y="46" font-size="4" fill="currentColor" stroke="none">Fluid</text>
    </svg>`
  },
  {
    id: 'rheum-joint-capsule',
    name: 'Joint Capsule',
    domain: 'medicine',
    category: 'joint-anatomy',
    tags: ['capsule', 'joint', 'fibrous', 'ligamentous', 'encapsulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="20" stroke-width="2"/>
      <ellipse cx="32" cy="32" rx="16" ry="12" fill="#FFE4B5" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="16" ry="12" stroke-dasharray="4 2"/>
      <ellipse cx="32" cy="16" rx="10" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="48" rx="10" ry="6" fill="currentColor" opacity="0.2"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Capsule</text>
    </svg>`
  },
  {
    id: 'rheum-bursa',
    name: 'Bursa',
    domain: 'medicine',
    category: 'joint-anatomy',
    tags: ['bursa', 'bursae', 'synovial', 'friction', 'cushion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="16" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="40" width="48" height="16" rx="2" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="20" ry="6" fill="#87CEEB" opacity="0.5"/>
      <ellipse cx="32" cy="32" rx="20" ry="6"/>
      <path d="M12 32h8" stroke-dasharray="2 1"/>
      <path d="M44 32h8" stroke-dasharray="2 1"/>
      <text x="6" y="16" font-size="4" fill="currentColor" stroke="none">Bone</text>
      <text x="22" y="36" font-size="4" fill="currentColor" stroke="none">Bursa</text>
      <text x="6" y="50" font-size="4" fill="currentColor" stroke="none">Tendon</text>
    </svg>`
  },
  {
    id: 'rheum-tendon-sheath',
    name: 'Tendon Sheath',
    domain: 'medicine',
    category: 'joint-anatomy',
    tags: ['tendon', 'sheath', 'tenosynovium', 'synovial', 'gliding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8v48" stroke-width="6" stroke="currentColor" opacity="0.3"/>
      <path d="M20 8v48" stroke-width="3"/>
      <ellipse cx="20" cy="20" rx="8" ry="4" fill="#FFB6C1" opacity="0.4"/>
      <ellipse cx="20" cy="32" rx="8" ry="4" fill="#FFB6C1" opacity="0.4"/>
      <ellipse cx="20" cy="44" rx="8" ry="4" fill="#FFB6C1" opacity="0.4"/>
      <path d="M28 20h16"/>
      <path d="M28 32h16"/>
      <path d="M28 44h16"/>
      <text x="32" y="22" font-size="4" fill="currentColor" stroke="none">Sheath</text>
      <text x="32" y="34" font-size="4" fill="currentColor" stroke="none">Tendon</text>
      <text x="32" y="46" font-size="4" fill="currentColor" stroke="none">Fluid</text>
    </svg>`
  },
  {
    id: 'rheum-ligaments',
    name: 'Ligaments',
    domain: 'medicine',
    category: 'joint-anatomy',
    tags: ['ligament', 'collagen', 'stabilization', 'attachment', 'fibrous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="14" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="52" rx="14" ry="8" fill="currentColor" opacity="0.2"/>
      <path d="M20 20c-4 8-4 16 0 24" stroke-width="3" stroke="#228B22"/>
      <path d="M44 20c4 8 4 16 0 24" stroke-width="3" stroke="#228B22"/>
      <path d="M28 18c0 10 0 18 0 28" stroke-width="2" stroke="#228B22"/>
      <path d="M36 18c0 10 0 18 0 28" stroke-width="2" stroke="#228B22"/>
      <text x="48" y="34" font-size="4" fill="currentColor" stroke="none">LCL</text>
      <text x="4" y="34" font-size="4" fill="currentColor" stroke="none">MCL</text>
    </svg>`
  },
  {
    id: 'rheum-meniscus',
    name: 'Meniscus',
    domain: 'medicine',
    category: 'joint-anatomy',
    tags: ['meniscus', 'fibrocartilage', 'knee', 'cushion', 'shock absorber'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="12" fill="currentColor" opacity="0.1"/>
      <path d="M8 32c6-4 16-6 24-6s18 2 24 6" stroke-width="2"/>
      <path d="M12 28c4 8 16 8 20 0" fill="#4169E1" opacity="0.3"/>
      <path d="M32 28c4 8 16 8 20 0" fill="#DC143C" opacity="0.3"/>
      <path d="M12 28c4 8 16 8 20 0"/>
      <path d="M32 28c4 8 16 8 20 0"/>
      <text x="16" y="42" font-size="4" fill="currentColor" stroke="none">Medial</text>
      <text x="38" y="42" font-size="4" fill="currentColor" stroke="none">Lateral</text>
    </svg>`
  },
  {
    id: 'rheum-enthesis',
    name: 'Enthesis',
    domain: 'medicine',
    category: 'joint-anatomy',
    tags: ['enthesis', 'insertion', 'attachment', 'tendon-bone', 'ligament-bone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="36" width="48" height="20" rx="4" fill="currentColor" opacity="0.2"/>
      <path d="M24 8v28" stroke-width="4" stroke="#228B22"/>
      <path d="M40 8v28" stroke-width="4" stroke="#228B22"/>
      <ellipse cx="24" cy="36" rx="6" ry="4" fill="#FFD700" opacity="0.5"/>
      <ellipse cx="40" cy="36" rx="6" ry="4" fill="#FFD700" opacity="0.5"/>
      <circle cx="24" cy="36" r="3" fill="#DC143C" opacity="0.3"/>
      <circle cx="40" cy="36" r="3" fill="#DC143C" opacity="0.3"/>
      <text x="14" y="52" font-size="4" fill="currentColor" stroke="none">Enthesis</text>
      <text x="32" y="52" font-size="4" fill="currentColor" stroke="none">Zone</text>
    </svg>`
  },
  {
    id: 'rheum-pannus',
    name: 'Pannus Formation',
    domain: 'medicine',
    category: 'joint-anatomy',
    tags: ['pannus', 'synovial', 'proliferation', 'erosion', 'inflammatory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="20" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="48" rx="20" ry="10" fill="currentColor" opacity="0.2"/>
      <path d="M16 24c0 8 4 12 8 14s12 2 16-2 8-10 8-14" fill="#DC143C" opacity="0.4"/>
      <path d="M16 24c0 8 4 12 8 14s12 2 16-2 8-10 8-14"/>
      <path d="M20 30c2 4 8 6 12 4" stroke="#DC143C" stroke-width="2"/>
      <path d="M32 28c4 4 8 2 10-2" stroke="#DC143C" stroke-width="2"/>
      <text x="22" y="42" font-size="4" fill="currentColor" stroke="none">Pannus</text>
    </svg>`
  },

  // ===========================================================================
  // INFLAMMATORY ARTHRITIS
  // ===========================================================================
  {
    id: 'rheum-ra-joint',
    name: 'Rheumatoid Arthritis Joint',
    domain: 'medicine',
    category: 'inflammatory-arthritis',
    tags: ['rheumatoid', 'arthritis', 'RA', 'synovitis', 'erosion', 'autoimmune'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="14" rx="16" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="50" rx="16" ry="8" fill="currentColor" opacity="0.2"/>
      <path d="M16 14v36"/>
      <path d="M48 14v36"/>
      <ellipse cx="32" cy="32" rx="14" ry="10" fill="#DC143C" opacity="0.3"/>
      <path d="M20 26c-2 4 0 8 4 10" stroke="#DC143C" stroke-width="2"/>
      <path d="M44 26c2 4 0 8-4 10" stroke="#DC143C" stroke-width="2"/>
      <circle cx="24" cy="20" r="2" fill="#DC143C"/>
      <circle cx="40" cy="20" r="2" fill="#DC143C"/>
      <circle cx="24" cy="44" r="2" fill="#DC143C"/>
      <circle cx="40" cy="44" r="2" fill="#DC143C"/>
      <text x="18" y="60" font-size="4" fill="currentColor" stroke="none">Erosions</text>
    </svg>`
  },
  {
    id: 'rheum-swan-neck',
    name: 'Swan Neck Deformity',
    domain: 'medicine',
    category: 'inflammatory-arthritis',
    tags: ['swan neck', 'deformity', 'PIP', 'DIP', 'rheumatoid', 'finger'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 48h12c2 0 4-2 4-4v-8c0-4 4-8 8-8h8c4 0 8-4 8-8v-4c0-2-2-4-4-4h-4" stroke-width="3" fill="currentColor" opacity="0.1"/>
      <circle cx="20" cy="44" r="4"/>
      <circle cx="32" cy="28" r="4"/>
      <circle cx="44" cy="20" r="4"/>
      <path d="M20 40v-8c0-2 2-4 4-4"/>
      <path d="M36 28h4c2 0 4-2 4-4v-4"/>
      <text x="4" y="12" font-size="4" fill="currentColor" stroke="none">Swan Neck</text>
      <text x="4" y="18" font-size="3" fill="currentColor" stroke="none">PIP hyper, DIP flex</text>
    </svg>`
  },
  {
    id: 'rheum-boutonniere',
    name: 'Boutonniere Deformity',
    domain: 'medicine',
    category: 'inflammatory-arthritis',
    tags: ['boutonniere', 'deformity', 'PIP', 'DIP', 'rheumatoid', 'finger'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h12c2 0 4 2 4 4v8c0 4 4 8 8 8h8c4 0 8-4 8-4l4-12" stroke-width="3" fill="currentColor" opacity="0.1"/>
      <circle cx="20" cy="32" r="4"/>
      <circle cx="32" cy="44" r="4"/>
      <circle cx="48" cy="36" r="4"/>
      <path d="M24 32c4 4 4 8 4 12"/>
      <path d="M36 44l8-4"/>
      <text x="4" y="12" font-size="4" fill="currentColor" stroke="none">Boutonniere</text>
      <text x="4" y="18" font-size="3" fill="currentColor" stroke="none">PIP flex, DIP hyper</text>
    </svg>`
  },
  {
    id: 'rheum-ulnar-deviation',
    name: 'Ulnar Deviation',
    domain: 'medicine',
    category: 'inflammatory-arthritis',
    tags: ['ulnar', 'deviation', 'drift', 'MCP', 'rheumatoid', 'hand'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="48" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <path d="M16 40l8-16 6 4" stroke-width="2"/>
      <path d="M20 38l10-20 6 4" stroke-width="2"/>
      <path d="M24 36l12-22 6 4" stroke-width="2"/>
      <path d="M28 36l12-24 6 4" stroke-width="2"/>
      <path d="M10 42l-4-8 4-2" stroke-width="2"/>
      <circle cx="24" cy="24" r="2" fill="#DC143C"/>
      <circle cx="30" cy="18" r="2" fill="#DC143C"/>
      <circle cx="36" cy="14" r="2" fill="#DC143C"/>
      <circle cx="40" cy="12" r="2" fill="#DC143C"/>
      <text x="36" y="54" font-size="4" fill="currentColor" stroke="none">Ulnar</text>
      <text x="36" y="60" font-size="4" fill="currentColor" stroke="none">Drift</text>
    </svg>`
  },
  {
    id: 'rheum-psoriatic-arthritis',
    name: 'Psoriatic Arthritis',
    domain: 'medicine',
    category: 'inflammatory-arthritis',
    tags: ['psoriatic', 'arthritis', 'PsA', 'dactylitis', 'enthesitis', 'psoriasis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 56v-40" stroke-width="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="28" rx="10" ry="18" fill="#DC143C" opacity="0.3"/>
      <path d="M32 56v-40" stroke-width="3"/>
      <circle cx="32" cy="16" r="4"/>
      <circle cx="32" cy="32" r="4"/>
      <circle cx="32" cy="48" r="4"/>
      <path d="M44 20c2 4 2 8 0 12" stroke="#DC143C" stroke-width="2"/>
      <path d="M20 20c-2 4-2 8 0 12" stroke="#DC143C" stroke-width="2"/>
      <text x="46" y="28" font-size="4" fill="currentColor" stroke="none">Dactylitis</text>
      <text x="2" y="12" font-size="3" fill="currentColor" stroke="none">Sausage</text>
      <text x="2" y="18" font-size="3" fill="currentColor" stroke="none">Digit</text>
    </svg>`
  },
  {
    id: 'rheum-gout-acute',
    name: 'Acute Gout',
    domain: 'medicine',
    category: 'inflammatory-arthritis',
    tags: ['gout', 'acute', 'monosodium urate', 'MSU', 'podagra', 'crystal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="20" ry="12" fill="#DC143C" opacity="0.4"/>
      <ellipse cx="32" cy="40" rx="20" ry="12"/>
      <path d="M32 20v-12"/>
      <path d="M24 24l-8-8"/>
      <path d="M40 24l8-8"/>
      <path d="M20 32l-8 0"/>
      <path d="M44 32l8 0"/>
      <ellipse cx="32" cy="40" rx="8" ry="4" fill="#FFD700"/>
      <path d="M28 38l2 4-2 4" stroke="#FFD700" stroke-width="2"/>
      <path d="M36 38l-2 4 2 4" stroke="#FFD700" stroke-width="2"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">1st MTP</text>
    </svg>`
  },
  {
    id: 'rheum-tophi',
    name: 'Tophaceous Gout',
    domain: 'medicine',
    category: 'inflammatory-arthritis',
    tags: ['tophi', 'tophus', 'gout', 'chronic', 'urate', 'deposit'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="48" rx="16" ry="8" fill="currentColor" opacity="0.2"/>
      <path d="M24 48l-4-24c0-4 2-8 6-10s10-2 14 0 6 6 6 10l-6 24" fill="currentColor" opacity="0.1"/>
      <path d="M24 48l-4-24c0-4 2-8 6-10s10-2 14 0 6 6 6 10l-6 24"/>
      <ellipse cx="28" cy="24" rx="6" ry="4" fill="#FFFACD"/>
      <ellipse cx="38" cy="32" rx="5" ry="3" fill="#FFFACD"/>
      <ellipse cx="26" cy="38" rx="4" ry="3" fill="#FFFACD"/>
      <text x="46" y="28" font-size="4" fill="currentColor" stroke="none">Tophi</text>
    </svg>`
  },
  {
    id: 'rheum-urate-crystals',
    name: 'Urate Crystals',
    domain: 'medicine',
    category: 'inflammatory-arthritis',
    tags: ['urate', 'crystals', 'MSU', 'gout', 'needle-shaped', 'birefringent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="24"/>
      <path d="M16 28l20 8" stroke="#FFD700" stroke-width="2"/>
      <path d="M20 40l16-10" stroke="#FFD700" stroke-width="2"/>
      <path d="M28 20l8 24" stroke="#FFD700" stroke-width="2"/>
      <path d="M36 18l6 20" stroke="#FFD700" stroke-width="2"/>
      <path d="M40 36l8-6" stroke="#FFD700" stroke-width="2"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Needle-shaped</text>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Neg birefringent</text>
    </svg>`
  },
  {
    id: 'rheum-pseudogout',
    name: 'Pseudogout (CPPD)',
    domain: 'medicine',
    category: 'inflammatory-arthritis',
    tags: ['pseudogout', 'CPPD', 'calcium pyrophosphate', 'chondrocalcinosis', 'crystal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="24"/>
      <rect x="20" y="24" width="8" height="4" fill="#87CEEB" transform="rotate(20 24 26)"/>
      <rect x="32" y="20" width="10" height="5" fill="#87CEEB" transform="rotate(-15 37 22)"/>
      <rect x="24" y="36" width="6" height="4" fill="#87CEEB" transform="rotate(45 27 38)"/>
      <rect x="36" y="32" width="8" height="4" fill="#87CEEB" transform="rotate(-30 40 34)"/>
      <rect x="28" y="44" width="6" height="3" fill="#87CEEB" transform="rotate(10 31 45)"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Rhomboid</text>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Pos birefringent</text>
    </svg>`
  },
  {
    id: 'rheum-ankylosing-spondylitis',
    name: 'Ankylosing Spondylitis',
    domain: 'medicine',
    category: 'inflammatory-arthritis',
    tags: ['ankylosing', 'spondylitis', 'AS', 'bamboo spine', 'sacroiliitis', 'HLA-B27'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="26" y="4" width="12" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="26" y="14" width="12" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="26" y="24" width="12" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="26" y="34" width="12" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="26" y="44" width="12" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <path d="M24 8c-4 0-4 8 0 8" stroke="#DC143C" stroke-width="2"/>
      <path d="M24 18c-4 0-4 8 0 8" stroke="#DC143C" stroke-width="2"/>
      <path d="M24 28c-4 0-4 8 0 8" stroke="#DC143C" stroke-width="2"/>
      <path d="M24 38c-4 0-4 8 0 8" stroke="#DC143C" stroke-width="2"/>
      <path d="M40 8c4 0 4 8 0 8" stroke="#DC143C" stroke-width="2"/>
      <path d="M40 18c4 0 4 8 0 8" stroke="#DC143C" stroke-width="2"/>
      <path d="M40 28c4 0 4 8 0 8" stroke="#DC143C" stroke-width="2"/>
      <path d="M40 38c4 0 4 8 0 8" stroke="#DC143C" stroke-width="2"/>
      <text x="4" y="32" font-size="3" fill="currentColor" stroke="none">Bamboo</text>
      <text x="46" y="32" font-size="3" fill="currentColor" stroke="none">Spine</text>
    </svg>`
  },
  {
    id: 'rheum-sacroiliitis',
    name: 'Sacroiliitis',
    domain: 'medicine',
    category: 'inflammatory-arthritis',
    tags: ['sacroiliitis', 'SI joint', 'sacroiliac', 'spondyloarthritis', 'inflammatory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v16" stroke-width="3"/>
      <ellipse cx="32" cy="36" rx="8" ry="12" fill="currentColor" opacity="0.2"/>
      <path d="M24 32c-8 4-12 12-10 20" stroke-width="2"/>
      <path d="M40 32c8 4 12 12 10 20" stroke-width="2"/>
      <path d="M26 36c-2 4-2 10 0 14" stroke="#DC143C" stroke-width="2"/>
      <path d="M38 36c2 4 2 10 0 14" stroke="#DC143C" stroke-width="2"/>
      <circle cx="26" cy="42" r="3" fill="#DC143C" opacity="0.4"/>
      <circle cx="38" cy="42" r="3" fill="#DC143C" opacity="0.4"/>
      <text x="18" y="60" font-size="4" fill="currentColor" stroke="none">SI Joints</text>
    </svg>`
  },
  {
    id: 'rheum-reactive-arthritis',
    name: 'Reactive Arthritis',
    domain: 'medicine',
    category: 'inflammatory-arthritis',
    tags: ['reactive', 'arthritis', 'Reiter', 'post-infectious', 'HLA-B27'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="16" r="8"/>
      <circle cx="20" cy="16" r="4" fill="#DC143C" opacity="0.4"/>
      <circle cx="44" cy="16" r="8"/>
      <circle cx="44" cy="16" r="4" fill="#DC143C" opacity="0.4"/>
      <ellipse cx="32" cy="36" rx="16" ry="8" fill="#DC143C" opacity="0.3"/>
      <ellipse cx="32" cy="36" rx="16" ry="8"/>
      <path d="M24 48v8"/>
      <path d="M40 48v8"/>
      <ellipse cx="24" cy="56" rx="4" ry="2" fill="#DC143C" opacity="0.3"/>
      <ellipse cx="40" cy="56" rx="4" ry="2" fill="#DC143C" opacity="0.3"/>
      <text x="12" y="6" font-size="3" fill="currentColor" stroke="none">Eyes</text>
      <text x="22" y="42" font-size="3" fill="currentColor" stroke="none">Urethra</text>
      <text x="22" y="62" font-size="3" fill="currentColor" stroke="none">Joints</text>
    </svg>`
  },

  // ===========================================================================
  // CONNECTIVE TISSUE DISEASES
  // ===========================================================================
  {
    id: 'rheum-lupus-butterfly',
    name: 'Lupus Butterfly Rash',
    domain: 'medicine',
    category: 'connective-tissue',
    tags: ['lupus', 'SLE', 'butterfly', 'malar', 'rash', 'photosensitive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <circle cx="24" cy="24" r="4"/>
      <circle cx="40" cy="24" r="4"/>
      <ellipse cx="32" cy="40" rx="4" ry="2"/>
      <path d="M12 32c8-4 12 4 20 0s12 4 20 0" fill="#DC143C" opacity="0.4"/>
      <path d="M12 32c8-4 12 4 20 0s12 4 20 0"/>
      <ellipse cx="20" cy="32" rx="6" ry="4" fill="#DC143C" opacity="0.3"/>
      <ellipse cx="44" cy="32" rx="6" ry="4" fill="#DC143C" opacity="0.3"/>
      <text x="14" y="56" font-size="4" fill="currentColor" stroke="none">Malar Rash</text>
    </svg>`
  },
  {
    id: 'rheum-lupus-multiorgan',
    name: 'Lupus Multi-Organ',
    domain: 'medicine',
    category: 'connective-tissue',
    tags: ['lupus', 'SLE', 'systemic', 'multi-organ', 'nephritis', 'serositis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8" fill="#DC143C" opacity="0.3"/>
      <path d="M28 24c-4 4-4 8 0 12 4 4 8 4 12 0s4-8 0-12" fill="#DC143C" opacity="0.3"/>
      <ellipse cx="20" cy="40" rx="6" ry="8" fill="#DC143C" opacity="0.3"/>
      <ellipse cx="44" cy="40" rx="6" ry="8" fill="#DC143C" opacity="0.3"/>
      <ellipse cx="32" cy="52" rx="8" ry="4" fill="#DC143C" opacity="0.3"/>
      <circle cx="32" cy="12" r="8"/>
      <path d="M28 24c-4 4-4 8 0 12 4 4 8 4 12 0s4-8 0-12"/>
      <ellipse cx="20" cy="40" rx="6" ry="8"/>
      <ellipse cx="44" cy="40" rx="6" ry="8"/>
      <ellipse cx="32" cy="52" rx="8" ry="4"/>
      <text x="46" y="14" font-size="3" fill="currentColor" stroke="none">CNS</text>
      <text x="46" y="32" font-size="3" fill="currentColor" stroke="none">Heart</text>
      <text x="52" y="42" font-size="3" fill="currentColor" stroke="none">Kidney</text>
      <text x="38" y="56" font-size="3" fill="currentColor" stroke="none">Joints</text>
    </svg>`
  },
  {
    id: 'rheum-scleroderma-hands',
    name: 'Scleroderma Sclerodactyly',
    domain: 'medicine',
    category: 'connective-tissue',
    tags: ['scleroderma', 'sclerodactyly', 'SSc', 'systemic sclerosis', 'skin tightening'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="52" rx="16" ry="8" fill="currentColor" opacity="0.2"/>
      <path d="M20 52v-28c0-2 1-4 3-4h2c2 0 3 2 3 4v20" stroke-width="2"/>
      <path d="M28 40v-20c0-2 1-4 3-4h2c2 0 3 2 3 4v20" stroke-width="2"/>
      <path d="M36 40v-20c0-2 1-4 3-4h2c2 0 3 2 3 4v28" stroke-width="2"/>
      <path d="M16 36l4 4" stroke-width="2"/>
      <ellipse cx="24" cy="20" rx="2" ry="3" fill="#87CEEB" opacity="0.5"/>
      <ellipse cx="32" cy="16" rx="2" ry="3" fill="#87CEEB" opacity="0.5"/>
      <ellipse cx="40" cy="18" rx="2" ry="3" fill="#87CEEB" opacity="0.5"/>
      <text x="4" y="16" font-size="3" fill="currentColor" stroke="none">Tapered</text>
      <text x="4" y="22" font-size="3" fill="currentColor" stroke="none">Fingers</text>
    </svg>`
  },
  {
    id: 'rheum-raynauds',
    name: "Raynaud's Phenomenon",
    domain: 'medicine',
    category: 'connective-tissue',
    tags: ['Raynaud', 'vasospasm', 'tricolor', 'cold', 'digital ischemia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 56v-24c0-2 2-4 4-4s4 2 4 4v16" stroke-width="3"/>
      <path d="M28 48v-24c0-2 2-4 4-4s4 2 4 4v24" stroke-width="3"/>
      <path d="M36 48v-24c0-2 2-4 4-4s4 2 4 4v24" stroke-width="3"/>
      <rect x="18" y="28" width="8" height="8" fill="white"/>
      <rect x="26" y="24" width="8" height="8" fill="white"/>
      <rect x="34" y="24" width="8" height="8" fill="white"/>
      <rect x="18" y="36" width="8" height="8" fill="#4169E1"/>
      <rect x="26" y="32" width="8" height="8" fill="#4169E1"/>
      <rect x="34" y="32" width="8" height="8" fill="#4169E1"/>
      <rect x="18" y="44" width="8" height="8" fill="#DC143C"/>
      <rect x="26" y="40" width="8" height="8" fill="#DC143C"/>
      <rect x="34" y="40" width="8" height="8" fill="#DC143C"/>
      <text x="46" y="34" font-size="3" fill="currentColor" stroke="none">White</text>
      <text x="46" y="42" font-size="3" fill="currentColor" stroke="none">Blue</text>
      <text x="46" y="50" font-size="3" fill="currentColor" stroke="none">Red</text>
    </svg>`
  },
  {
    id: 'rheum-dermatomyositis-heliotrope',
    name: 'Heliotrope Rash',
    domain: 'medicine',
    category: 'connective-tissue',
    tags: ['dermatomyositis', 'heliotrope', 'eyelid', 'rash', 'periorbital'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <ellipse cx="22" cy="28" rx="6" ry="3"/>
      <ellipse cx="42" cy="28" rx="6" ry="3"/>
      <circle cx="22" cy="28" r="2" fill="currentColor"/>
      <circle cx="42" cy="28" r="2" fill="currentColor"/>
      <ellipse cx="22" cy="24" rx="8" ry="4" fill="#9370DB" opacity="0.5"/>
      <ellipse cx="42" cy="24" rx="8" ry="4" fill="#9370DB" opacity="0.5"/>
      <path d="M28 40c2 2 6 2 8 0"/>
      <text x="10" y="56" font-size="4" fill="currentColor" stroke="none">Heliotrope</text>
    </svg>`
  },
  {
    id: 'rheum-gottrons-papules',
    name: "Gottron's Papules",
    domain: 'medicine',
    category: 'connective-tissue',
    tags: ['Gottron', 'papules', 'dermatomyositis', 'MCP', 'PIP', 'knuckles'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="52" rx="20" ry="8" fill="currentColor" opacity="0.2"/>
      <path d="M16 52v-20" stroke-width="3"/>
      <path d="M24 52v-24" stroke-width="3"/>
      <path d="M32 52v-28" stroke-width="3"/>
      <path d="M40 52v-24" stroke-width="3"/>
      <path d="M48 52v-20" stroke-width="3"/>
      <ellipse cx="16" cy="32" rx="3" ry="2" fill="#9370DB"/>
      <ellipse cx="24" cy="28" rx="3" ry="2" fill="#9370DB"/>
      <ellipse cx="32" cy="24" rx="3" ry="2" fill="#9370DB"/>
      <ellipse cx="40" cy="28" rx="3" ry="2" fill="#9370DB"/>
      <ellipse cx="48" cy="32" rx="3" ry="2" fill="#9370DB"/>
      <text x="4" y="16" font-size="4" fill="currentColor" stroke="none">Gottron's</text>
      <text x="4" y="22" font-size="4" fill="currentColor" stroke="none">Papules</text>
    </svg>`
  },
  {
    id: 'rheum-sjogrens',
    name: "Sjogren's Syndrome",
    domain: 'medicine',
    category: 'connective-tissue',
    tags: ['Sjogren', 'sicca', 'dry eyes', 'dry mouth', 'xerostomia', 'keratoconjunctivitis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="22" cy="24" rx="6" ry="4"/>
      <ellipse cx="42" cy="24" rx="6" ry="4"/>
      <circle cx="22" cy="24" r="2" fill="currentColor"/>
      <circle cx="42" cy="24" r="2" fill="currentColor"/>
      <path d="M18 28l-2 4" stroke-dasharray="2 2"/>
      <path d="M46 28l2 4" stroke-dasharray="2 2"/>
      <path d="M24 44c4 4 12 4 16 0"/>
      <path d="M26 48h12" stroke-dasharray="2 2"/>
      <ellipse cx="12" cy="36" rx="4" ry="6" fill="#FFB6C1" opacity="0.3"/>
      <ellipse cx="52" cy="36" rx="4" ry="6" fill="#FFB6C1" opacity="0.3"/>
      <text x="2" y="58" font-size="3" fill="currentColor" stroke="none">Dry eyes</text>
      <text x="38" y="58" font-size="3" fill="currentColor" stroke="none">Dry mouth</text>
    </svg>`
  },
  {
    id: 'rheum-vasculitis-small',
    name: 'Small Vessel Vasculitis',
    domain: 'medicine',
    category: 'connective-tissue',
    tags: ['vasculitis', 'small vessel', 'ANCA', 'purpura', 'palpable'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c12 0 12-16 24-16s12 16 24 16" stroke-width="2"/>
      <path d="M8 32c12 0 12 16 24 16s12-16 24-16" stroke-width="2"/>
      <circle cx="20" cy="28" r="3" fill="#DC143C" opacity="0.6"/>
      <circle cx="32" cy="20" r="4" fill="#DC143C" opacity="0.6"/>
      <circle cx="44" cy="28" r="3" fill="#DC143C" opacity="0.6"/>
      <circle cx="26" cy="40" r="3" fill="#DC143C" opacity="0.6"/>
      <circle cx="38" cy="44" r="4" fill="#DC143C" opacity="0.6"/>
      <path d="M18 28c-2 2-2 4 0 6" stroke="#DC143C" stroke-width="1"/>
      <path d="M42 28c2 2 2 4 0 6" stroke="#DC143C" stroke-width="1"/>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Purpura</text>
    </svg>`
  },
  {
    id: 'rheum-vasculitis-medium',
    name: 'Medium Vessel Vasculitis',
    domain: 'medicine',
    category: 'connective-tissue',
    tags: ['vasculitis', 'medium vessel', 'PAN', 'polyarteritis', 'nodosa'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h48" stroke-width="4"/>
      <ellipse cx="24" cy="32" rx="6" ry="8" fill="#DC143C" opacity="0.4"/>
      <ellipse cx="44" cy="32" rx="4" ry="6" fill="#DC143C" opacity="0.4"/>
      <path d="M20 24c-4 4-4 12 0 16" stroke="#DC143C" stroke-width="2"/>
      <path d="M28 24c4 4 4 12 0 16" stroke="#DC143C" stroke-width="2"/>
      <path d="M40 26c-2 3-2 9 0 12" stroke="#DC143C" stroke-width="2"/>
      <path d="M48 26c2 3 2 9 0 12" stroke="#DC143C" stroke-width="2"/>
      <circle cx="24" cy="32" r="2" fill="#FFD700"/>
      <circle cx="44" cy="32" r="2" fill="#FFD700"/>
      <text x="12" y="54" font-size="4" fill="currentColor" stroke="none">Aneurysms</text>
    </svg>`
  },
  {
    id: 'rheum-vasculitis-large',
    name: 'Large Vessel Vasculitis',
    domain: 'medicine',
    category: 'connective-tissue',
    tags: ['vasculitis', 'large vessel', 'GCA', 'Takayasu', 'temporal arteritis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 56V8" stroke-width="6"/>
      <path d="M32 20l-16 8"/>
      <path d="M32 20l16 8"/>
      <path d="M32 8l-8-4"/>
      <path d="M32 8l8-4"/>
      <path d="M32 8l0-4"/>
      <ellipse cx="32" cy="36" rx="8" ry="12" fill="#DC143C" opacity="0.3"/>
      <path d="M26 28c-4 8-4 16 0 20" stroke="#DC143C" stroke-width="2"/>
      <path d="M38 28c4 8 4 16 0 20" stroke="#DC143C" stroke-width="2"/>
      <text x="42" y="40" font-size="4" fill="currentColor" stroke="none">Stenosis</text>
    </svg>`
  },
  {
    id: 'rheum-mixed-ctd',
    name: 'Mixed Connective Tissue Disease',
    domain: 'medicine',
    category: 'connective-tissue',
    tags: ['MCTD', 'mixed', 'overlap', 'anti-U1RNP', 'connective tissue'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="24" r="14" fill="#DC143C" opacity="0.2"/>
      <circle cx="40" cy="24" r="14" fill="#4169E1" opacity="0.2"/>
      <circle cx="32" cy="40" r="14" fill="#228B22" opacity="0.2"/>
      <circle cx="24" cy="24" r="14"/>
      <circle cx="40" cy="24" r="14"/>
      <circle cx="32" cy="40" r="14"/>
      <text x="14" y="18" font-size="4" fill="currentColor" stroke="none">SLE</text>
      <text x="38" y="18" font-size="4" fill="currentColor" stroke="none">SSc</text>
      <text x="24" y="46" font-size="4" fill="currentColor" stroke="none">PM</text>
      <text x="26" y="30" font-size="3" fill="currentColor" stroke="none">MCTD</text>
    </svg>`
  },
  {
    id: 'rheum-antiphospholipid',
    name: 'Antiphospholipid Syndrome',
    domain: 'medicine',
    category: 'connective-tissue',
    tags: ['APS', 'antiphospholipid', 'thrombosis', 'pregnancy loss', 'lupus anticoagulant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c12 0 16-8 24-8s12 8 24 8" stroke-width="3"/>
      <path d="M8 32c12 0 16 8 24 8s12-8 24-8" stroke-width="3"/>
      <ellipse cx="32" cy="32" rx="8" ry="6" fill="#8B0000" opacity="0.6"/>
      <circle cx="28" cy="30" r="2" fill="#DC143C"/>
      <circle cx="36" cy="34" r="2" fill="#DC143C"/>
      <circle cx="32" cy="32" r="1" fill="#DC143C"/>
      <path d="M24 32c0-4 8-4 8 0s8 4 8 0" stroke="#8B0000" stroke-width="2"/>
      <text x="14" y="54" font-size="4" fill="currentColor" stroke="none">Thrombus</text>
    </svg>`
  },

  // ===========================================================================
  // OSTEOARTHRITIS
  // ===========================================================================
  {
    id: 'rheum-oa-joint',
    name: 'Osteoarthritis Joint',
    domain: 'medicine',
    category: 'osteoarthritis',
    tags: ['osteoarthritis', 'OA', 'degenerative', 'wear and tear', 'cartilage loss'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="18" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="48" rx="18" ry="10" fill="currentColor" opacity="0.2"/>
      <path d="M14 16v32"/>
      <path d="M50 16v32"/>
      <path d="M18 24c4 1 24 1 28 0" stroke-dasharray="3 3"/>
      <path d="M18 40c4-1 24-1 28 0" stroke-dasharray="3 3"/>
      <path d="M16 20l-4 4 4 4" fill="currentColor" opacity="0.3"/>
      <path d="M48 20l4 4-4 4" fill="currentColor" opacity="0.3"/>
      <path d="M16 36l-4 4 4 4" fill="currentColor" opacity="0.3"/>
      <path d="M48 36l4 4-4 4" fill="currentColor" opacity="0.3"/>
      <text x="20" y="34" font-size="4" fill="currentColor" stroke="none">Narrowed</text>
    </svg>`
  },
  {
    id: 'rheum-osteophytes',
    name: 'Osteophytes',
    domain: 'medicine',
    category: 'osteoarthritis',
    tags: ['osteophyte', 'bone spur', 'marginal', 'OA', 'degenerative'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="24" width="32" height="16" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="16" y="24" width="32" height="16" rx="2"/>
      <path d="M12 28l-4-4 2-4 4 2z" fill="currentColor" opacity="0.4"/>
      <path d="M12 36l-6 2 0-4 4-2z" fill="currentColor" opacity="0.4"/>
      <path d="M52 28l4-4-2-4-4 2z" fill="currentColor" opacity="0.4"/>
      <path d="M52 36l6 2 0-4-4-2z" fill="currentColor" opacity="0.4"/>
      <path d="M12 28l-4-4 2-4 4 2"/>
      <path d="M12 36l-6 2 0-4 4-2"/>
      <path d="M52 28l4-4-2-4-4 2"/>
      <path d="M52 36l6 2 0-4-4-2"/>
      <text x="14" y="54" font-size="4" fill="currentColor" stroke="none">Osteophytes</text>
    </svg>`
  },
  {
    id: 'rheum-joint-space-narrowing',
    name: 'Joint Space Narrowing',
    domain: 'medicine',
    category: 'osteoarthritis',
    tags: ['joint space', 'narrowing', 'cartilage loss', 'OA', 'degenerative'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="20" height="20" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="36" width="20" height="20" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="36" y="8" width="20" height="24" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="36" y="34" width="20" height="22" rx="2" fill="currentColor" opacity="0.2"/>
      <path d="M8 30h20" stroke="#228B22" stroke-width="2"/>
      <path d="M36 32h20" stroke="#DC143C" stroke-width="1"/>
      <text x="10" y="62" font-size="3" fill="#228B22" stroke="none">Normal</text>
      <text x="38" y="62" font-size="3" fill="#DC143C" stroke="none">Narrowed</text>
      <path d="M4 28v4"/>
      <path d="M32 31v2"/>
    </svg>`
  },
  {
    id: 'rheum-subchondral-sclerosis',
    name: 'Subchondral Sclerosis',
    domain: 'medicine',
    category: 'osteoarthritis',
    tags: ['subchondral', 'sclerosis', 'eburnation', 'bone', 'OA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <rect x="16" y="12" width="32" height="8" fill="currentColor" opacity="0.6"/>
      <path d="M16 12h32v8h-32z"/>
      <line x1="20" y1="16" x2="44" y2="16" stroke="white" stroke-dasharray="2 2"/>
      <circle cx="24" cy="32" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="40" cy="36" r="4" fill="currentColor" opacity="0.3"/>
      <text x="16" y="52" font-size="3" fill="currentColor" stroke="none">Sclerotic</text>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">Bone</text>
    </svg>`
  },
  {
    id: 'rheum-subchondral-cysts',
    name: 'Subchondral Cysts',
    domain: 'medicine',
    category: 'osteoarthritis',
    tags: ['subchondral', 'cysts', 'geodes', 'bone', 'OA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <path d="M12 20h40"/>
      <circle cx="24" cy="32" r="6" fill="white"/>
      <circle cx="24" cy="32" r="6"/>
      <circle cx="40" cy="28" r="4" fill="white"/>
      <circle cx="40" cy="28" r="4"/>
      <circle cx="36" cy="40" r="5" fill="white"/>
      <circle cx="36" cy="40" r="5"/>
      <text x="16" y="56" font-size="4" fill="currentColor" stroke="none">Cysts</text>
    </svg>`
  },
  {
    id: 'rheum-heberden-nodes',
    name: "Heberden's Nodes",
    domain: 'medicine',
    category: 'osteoarthritis',
    tags: ['Heberden', 'nodes', 'DIP', 'osteoarthritis', 'finger'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 56v-32c0-4 4-8 8-8h16c4 0 8 4 8 8v32" stroke-width="2" fill="currentColor" opacity="0.1"/>
      <circle cx="24" cy="20" r="4"/>
      <circle cx="40" cy="20" r="4"/>
      <ellipse cx="20" cy="20" rx="4" ry="6" fill="#FFD700" opacity="0.5"/>
      <ellipse cx="44" cy="20" rx="4" ry="6" fill="#FFD700" opacity="0.5"/>
      <path d="M16 20h-4"/>
      <path d="M48 20h4"/>
      <text x="14" y="40" font-size="4" fill="currentColor" stroke="none">DIP Nodes</text>
      <text x="6" y="10" font-size="3" fill="currentColor" stroke="none">Heberden's</text>
    </svg>`
  },
  {
    id: 'rheum-bouchard-nodes',
    name: "Bouchard's Nodes",
    domain: 'medicine',
    category: 'osteoarthritis',
    tags: ['Bouchard', 'nodes', 'PIP', 'osteoarthritis', 'finger'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 56v-40c0-4 4-8 8-8h16c4 0 8 4 8 8v40" stroke-width="2" fill="currentColor" opacity="0.1"/>
      <circle cx="24" cy="12" r="3"/>
      <circle cx="40" cy="12" r="3"/>
      <circle cx="24" cy="36" r="4"/>
      <circle cx="40" cy="36" r="4"/>
      <ellipse cx="20" cy="36" rx="4" ry="6" fill="#FFD700" opacity="0.5"/>
      <ellipse cx="44" cy="36" rx="4" ry="6" fill="#FFD700" opacity="0.5"/>
      <path d="M16 36h-4"/>
      <path d="M48 36h4"/>
      <text x="14" y="52" font-size="4" fill="currentColor" stroke="none">PIP Nodes</text>
      <text x="6" y="28" font-size="3" fill="currentColor" stroke="none">Bouchard's</text>
    </svg>`
  },
  {
    id: 'rheum-oa-knee',
    name: 'Knee Osteoarthritis',
    domain: 'medicine',
    category: 'osteoarthritis',
    tags: ['knee', 'osteoarthritis', 'OA', 'medial', 'lateral', 'compartment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="16" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="48" rx="14" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="18" ry="6" fill="#87CEEB" opacity="0.3"/>
      <path d="M14 16v32"/>
      <path d="M50 16v32"/>
      <path d="M20 30c4 2 20 2 24 0" stroke-dasharray="2 2"/>
      <path d="M20 34c4-2 20-2 24 0" stroke-dasharray="2 2"/>
      <path d="M14 24l-4 4 4 4" fill="currentColor" opacity="0.3"/>
      <path d="M50 24l4 4-4 4" fill="currentColor" opacity="0.3"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Medial</text>
      <text x="44" y="58" font-size="3" fill="currentColor" stroke="none">Lateral</text>
    </svg>`
  },

  // ===========================================================================
  // AUTOANTIBODIES & LABS
  // ===========================================================================
  {
    id: 'rheum-ana-homogeneous',
    name: 'ANA Homogeneous Pattern',
    domain: 'medicine',
    category: 'autoantibodies',
    tags: ['ANA', 'homogeneous', 'diffuse', 'nuclear', 'SLE', 'drug-induced'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12" fill="#90EE90" opacity="0.6"/>
      <circle cx="32" cy="32" r="12"/>
      <text x="14" y="56" font-size="4" fill="currentColor" stroke="none">Homogeneous</text>
    </svg>`
  },
  {
    id: 'rheum-ana-speckled',
    name: 'ANA Speckled Pattern',
    domain: 'medicine',
    category: 'autoantibodies',
    tags: ['ANA', 'speckled', 'nuclear', 'anti-Sm', 'anti-RNP', 'Sjogren'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="28" cy="28" r="2" fill="#90EE90"/>
      <circle cx="36" cy="28" r="2" fill="#90EE90"/>
      <circle cx="32" cy="32" r="2" fill="#90EE90"/>
      <circle cx="28" cy="36" r="2" fill="#90EE90"/>
      <circle cx="36" cy="36" r="2" fill="#90EE90"/>
      <circle cx="24" cy="32" r="1.5" fill="#90EE90"/>
      <circle cx="40" cy="32" r="1.5" fill="#90EE90"/>
      <text x="18" y="56" font-size="4" fill="currentColor" stroke="none">Speckled</text>
    </svg>`
  },
  {
    id: 'rheum-ana-nucleolar',
    name: 'ANA Nucleolar Pattern',
    domain: 'medicine',
    category: 'autoantibodies',
    tags: ['ANA', 'nucleolar', 'scleroderma', 'SSc', 'nuclear'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="26" cy="30" r="4" fill="#90EE90"/>
      <circle cx="38" cy="30" r="3" fill="#90EE90"/>
      <circle cx="32" cy="38" r="3" fill="#90EE90"/>
      <text x="18" y="56" font-size="4" fill="currentColor" stroke="none">Nucleolar</text>
    </svg>`
  },
  {
    id: 'rheum-ana-centromere',
    name: 'ANA Centromere Pattern',
    domain: 'medicine',
    category: 'autoantibodies',
    tags: ['ANA', 'centromere', 'limited', 'scleroderma', 'CREST'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="28" cy="26" r="1.5" fill="#90EE90"/>
      <circle cx="36" cy="26" r="1.5" fill="#90EE90"/>
      <circle cx="24" cy="32" r="1.5" fill="#90EE90"/>
      <circle cx="40" cy="32" r="1.5" fill="#90EE90"/>
      <circle cx="28" cy="38" r="1.5" fill="#90EE90"/>
      <circle cx="36" cy="38" r="1.5" fill="#90EE90"/>
      <circle cx="32" cy="22" r="1.5" fill="#90EE90"/>
      <circle cx="32" cy="42" r="1.5" fill="#90EE90"/>
      <text x="16" y="56" font-size="4" fill="currentColor" stroke="none">Centromere</text>
    </svg>`
  },
  {
    id: 'rheum-rheumatoid-factor',
    name: 'Rheumatoid Factor',
    domain: 'medicine',
    category: 'autoantibodies',
    tags: ['RF', 'rheumatoid factor', 'IgM', 'anti-IgG', 'RA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 32l12-16 12 16-12 16z" fill="#4169E1" opacity="0.3"/>
      <path d="M20 32l12-16 12 16-12 16z"/>
      <path d="M32 8v8"/>
      <path d="M32 48v8"/>
      <path d="M8 32h12"/>
      <path d="M44 32h12"/>
      <circle cx="32" cy="32" r="6" fill="#DC143C" opacity="0.3"/>
      <circle cx="32" cy="32" r="6"/>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">RF (IgM)</text>
      <text x="24" y="36" font-size="4" fill="currentColor" stroke="none">IgG</text>
    </svg>`
  },
  {
    id: 'rheum-anti-ccp',
    name: 'Anti-CCP Antibody',
    domain: 'medicine',
    category: 'autoantibodies',
    tags: ['anti-CCP', 'ACPA', 'citrullinated', 'peptide', 'RA', 'specific'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="20"/>
      <path d="M20 32c4-8 20-8 24 0" stroke-width="2"/>
      <path d="M20 32c4 8 20 8 24 0" stroke-width="2"/>
      <circle cx="24" cy="32" r="3" fill="#FFD700"/>
      <circle cx="32" cy="28" r="3" fill="#FFD700"/>
      <circle cx="40" cy="32" r="3" fill="#FFD700"/>
      <circle cx="32" cy="36" r="3" fill="#FFD700"/>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">Anti-CCP</text>
    </svg>`
  },
  {
    id: 'rheum-anti-dsdna',
    name: 'Anti-dsDNA Antibody',
    domain: 'medicine',
    category: 'autoantibodies',
    tags: ['anti-dsDNA', 'double-stranded', 'DNA', 'SLE', 'lupus', 'nephritis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8c4 8-4 16 0 24s-4 16 0 24" stroke-width="2" stroke="#4169E1"/>
      <path d="M40 8c-4 8 4 16 0 24s4 16 0 24" stroke-width="2" stroke="#DC143C"/>
      <path d="M24 12h16"/>
      <path d="M24 20h16"/>
      <path d="M24 28h16"/>
      <path d="M24 36h16"/>
      <path d="M24 44h16"/>
      <path d="M24 52h16"/>
      <circle cx="48" cy="32" r="8" fill="#FFD700" opacity="0.4"/>
      <path d="M44 28l8 8-8 8"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Anti-dsDNA</text>
    </svg>`
  },
  {
    id: 'rheum-complement',
    name: 'Complement Levels',
    domain: 'medicine',
    category: 'autoantibodies',
    tags: ['complement', 'C3', 'C4', 'CH50', 'consumption', 'activation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="16" height="40" rx="2"/>
      <rect x="8" y="32" width="16" height="24" rx="2" fill="#228B22" opacity="0.4"/>
      <rect x="28" y="16" width="16" height="40" rx="2"/>
      <rect x="28" y="40" width="16" height="16" rx="2" fill="#DC143C" opacity="0.4"/>
      <text x="12" y="12" font-size="4" fill="currentColor" stroke="none">C3</text>
      <text x="32" y="12" font-size="4" fill="currentColor" stroke="none">C4</text>
      <path d="M52 20l4 8-4 8"/>
      <text x="52" y="42" font-size="3" fill="currentColor" stroke="none">Low</text>
      <text x="52" y="50" font-size="3" fill="currentColor" stroke="none">in</text>
      <text x="52" y="58" font-size="3" fill="currentColor" stroke="none">SLE</text>
    </svg>`
  },

  // ===========================================================================
  // IMAGING
  // ===========================================================================
  {
    id: 'rheum-xray-joint',
    name: 'Joint X-ray',
    domain: 'medicine',
    category: 'imaging',
    tags: ['X-ray', 'radiograph', 'joint', 'imaging', 'diagnostic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <ellipse cx="32" cy="24" rx="14" ry="8" fill="white"/>
      <ellipse cx="32" cy="40" rx="14" ry="8" fill="white"/>
      <path d="M18 24v16"/>
      <path d="M46 24v16"/>
      <path d="M22 30h20" stroke-width="2"/>
      <path d="M22 34h20" stroke-width="2"/>
      <text x="4" y="62" font-size="4" fill="currentColor" stroke="none">X-ray</text>
    </svg>`
  },
  {
    id: 'rheum-mri-joint',
    name: 'MRI Joint',
    domain: 'medicine',
    category: 'imaging',
    tags: ['MRI', 'magnetic resonance', 'joint', 'synovitis', 'bone edema'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="#1a1a2e"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <ellipse cx="32" cy="24" rx="14" ry="8" fill="#808080"/>
      <ellipse cx="32" cy="40" rx="14" ry="8" fill="#808080"/>
      <ellipse cx="32" cy="32" rx="10" ry="4" fill="white"/>
      <circle cx="24" cy="24" r="4" fill="white" opacity="0.5"/>
      <text x="4" y="62" font-size="4" fill="currentColor" stroke="none">MRI</text>
    </svg>`
  },
  {
    id: 'rheum-ultrasound-synovitis',
    name: 'Ultrasound Synovitis',
    domain: 'medicine',
    category: 'imaging',
    tags: ['ultrasound', 'US', 'synovitis', 'power Doppler', 'joint'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="#000"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <path d="M16 24c8 0 8 8 16 8s8-8 16-8" stroke="#808080" stroke-width="2"/>
      <path d="M16 40c8 0 8-8 16-8s8 8 16 8" stroke="#808080" stroke-width="2"/>
      <ellipse cx="32" cy="32" rx="8" ry="4" fill="#FFD700" opacity="0.6"/>
      <circle cx="28" cy="30" r="2" fill="#DC143C"/>
      <circle cx="36" cy="34" r="2" fill="#DC143C"/>
      <circle cx="32" cy="32" r="1" fill="#DC143C"/>
      <text x="4" y="62" font-size="4" fill="currentColor" stroke="none">US Doppler</text>
    </svg>`
  },
  {
    id: 'rheum-bone-scan',
    name: 'Bone Scan',
    domain: 'medicine',
    category: 'imaging',
    tags: ['bone scan', 'scintigraphy', 'nuclear', 'technetium', 'uptake'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="4" fill="#1a1a2e"/>
      <path d="M32 12v8" stroke="#00ff00" stroke-width="2"/>
      <path d="M28 24h8" stroke="#00ff00" stroke-width="4"/>
      <path d="M32 28v12" stroke="#00ff00" stroke-width="2"/>
      <path d="M28 40l-4 16" stroke="#00ff00" stroke-width="2"/>
      <path d="M36 40l4 16" stroke="#00ff00" stroke-width="2"/>
      <circle cx="24" cy="28" r="4" fill="#ff0" opacity="0.8"/>
      <circle cx="40" cy="44" r="4" fill="#ff0" opacity="0.8"/>
      <text x="4" y="64" font-size="4" fill="currentColor" stroke="none">Bone Scan</text>
    </svg>`
  },
  {
    id: 'rheum-erosions',
    name: 'Bone Erosions',
    domain: 'medicine',
    category: 'imaging',
    tags: ['erosion', 'bone', 'marginal', 'RA', 'destructive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="16" height="48" rx="4" fill="currentColor" opacity="0.2"/>
      <rect x="36" y="8" width="16" height="48" rx="4" fill="currentColor" opacity="0.2"/>
      <path d="M12 24c4-4 8-4 8 0"/>
      <path d="M20 32c4-6 8-6 8 0"/>
      <path d="M12 40c6-4 8-4 8 0"/>
      <path d="M36 20c-4-4-8-4-8 0"/>
      <path d="M44 28c-4-6-8-6-8 0"/>
      <path d="M36 44c-6-4-8-4-8 0"/>
      <circle cx="16" cy="24" r="2" fill="#DC143C"/>
      <circle cx="24" cy="32" r="3" fill="#DC143C"/>
      <circle cx="40" cy="20" r="2" fill="#DC143C"/>
      <circle cx="40" cy="28" r="3" fill="#DC143C"/>
      <text x="16" y="62" font-size="4" fill="currentColor" stroke="none">Erosions</text>
    </svg>`
  },
  {
    id: 'rheum-enthesitis-imaging',
    name: 'Enthesitis Imaging',
    domain: 'medicine',
    category: 'imaging',
    tags: ['enthesitis', 'insertion', 'tendon', 'ultrasound', 'MRI'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="32" width="48" height="24" rx="4" fill="currentColor" opacity="0.2"/>
      <path d="M24 8v24" stroke-width="4"/>
      <path d="M40 8v24" stroke-width="4"/>
      <ellipse cx="24" cy="32" rx="6" ry="4" fill="#DC143C" opacity="0.4"/>
      <ellipse cx="40" cy="32" rx="6" ry="4" fill="#DC143C" opacity="0.4"/>
      <path d="M18 32c0-2 4-4 6-4" stroke="#DC143C" stroke-width="2"/>
      <path d="M30 32c0-2-4-4-6-4" stroke="#DC143C" stroke-width="2"/>
      <circle cx="24" cy="32" r="2" fill="#FFD700"/>
      <circle cx="40" cy="32" r="2" fill="#FFD700"/>
      <text x="12" y="60" font-size="4" fill="currentColor" stroke="none">Enthesitis</text>
    </svg>`
  },
  {
    id: 'rheum-dexa-scan',
    name: 'DEXA Bone Density',
    domain: 'medicine',
    category: 'imaging',
    tags: ['DEXA', 'DXA', 'bone density', 'osteoporosis', 'T-score'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <path d="M16 48l8-16 8 8 8-24 8 16"/>
      <path d="M12 32h40" stroke-dasharray="2 2"/>
      <path d="M12 24h40" stroke-dasharray="2 2" stroke="#228B22"/>
      <path d="M12 40h40" stroke-dasharray="2 2" stroke="#DC143C"/>
      <text x="50" y="26" font-size="3" fill="#228B22" stroke="none">-1</text>
      <text x="50" y="42" font-size="3" fill="#DC143C" stroke="none">-2.5</text>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">T-score</text>
    </svg>`
  },
  {
    id: 'rheum-ct-sacroiliac',
    name: 'CT Sacroiliac Joints',
    domain: 'medicine',
    category: 'imaging',
    tags: ['CT', 'sacroiliac', 'SI joint', 'computed tomography', 'spondyloarthritis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="white"/>
      <ellipse cx="32" cy="36" rx="8" ry="10" fill="currentColor" opacity="0.2"/>
      <path d="M24 28c-2 4-2 12 0 16" stroke-width="2"/>
      <path d="M40 28c2 4 2 12 0 16" stroke-width="2"/>
      <circle cx="24" cy="36" r="3" fill="#DC143C" opacity="0.4"/>
      <circle cx="40" cy="36" r="3" fill="#DC143C" opacity="0.4"/>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">CT SI Joints</text>
    </svg>`
  },
  {
    id: 'rheum-pet-scan',
    name: 'PET Scan Vasculitis',
    domain: 'medicine',
    category: 'imaging',
    tags: ['PET', 'FDG', 'vasculitis', 'inflammation', 'large vessel'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="#1a1a2e"/>
      <path d="M32 12v40" stroke="#808080" stroke-width="4"/>
      <path d="M32 20l-12 8" stroke="#808080" stroke-width="3"/>
      <path d="M32 20l12 8" stroke="#808080" stroke-width="3"/>
      <path d="M28 16c0 8 8 8 8 0" fill="#ff0" opacity="0.8"/>
      <path d="M24 28c0 12 16 12 16 0" fill="#ff0" opacity="0.6"/>
      <path d="M28 44c0 8 8 8 8 0" fill="#ff0" opacity="0.8"/>
      <text x="12" y="62" font-size="4" fill="currentColor" stroke="none">FDG-PET</text>
    </svg>`
  },
  {
    id: 'rheum-arthrocentesis',
    name: 'Arthrocentesis',
    domain: 'medicine',
    category: 'imaging',
    tags: ['arthrocentesis', 'joint aspiration', 'synovial fluid', 'diagnostic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="20" ry="12" fill="#FFD700" opacity="0.3"/>
      <ellipse cx="32" cy="40" rx="20" ry="12"/>
      <ellipse cx="32" cy="24" rx="14" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="56" rx="14" ry="6" fill="currentColor" opacity="0.2"/>
      <path d="M48 16l-12 20" stroke-width="2"/>
      <rect x="46" y="8" width="4" height="12" rx="1"/>
      <path d="M36 36l4-4"/>
      <circle cx="36" cy="40" r="2" fill="#FFD700"/>
      <text x="4" y="20" font-size="4" fill="currentColor" stroke="none">Aspiration</text>
    </svg>`
  },

  // ===========================================================================
  // TREATMENT
  // ===========================================================================
  {
    id: 'rheum-dmard',
    name: 'DMARDs',
    domain: 'medicine',
    category: 'treatment',
    tags: ['DMARD', 'disease-modifying', 'methotrexate', 'sulfasalazine', 'leflunomide'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="10" fill="#4169E1" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="10"/>
      <path d="M12 32c0 12 10 20 20 20s20-8 20-20"/>
      <path d="M20 28l24 8"/>
      <path d="M20 36l24-8"/>
      <text x="24" y="34" font-size="4" fill="currentColor" stroke="none">MTX</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">csDMARD</text>
    </svg>`
  },
  {
    id: 'rheum-tnf-inhibitor',
    name: 'TNF Inhibitor',
    domain: 'medicine',
    category: 'treatment',
    tags: ['TNF', 'biologic', 'adalimumab', 'etanercept', 'infliximab', 'anti-TNF'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v20" stroke-width="2"/>
      <path d="M24 16h16" stroke-width="2"/>
      <circle cx="32" cy="36" r="12" fill="#DC143C" opacity="0.3"/>
      <circle cx="32" cy="36" r="12"/>
      <text x="24" y="40" font-size="5" fill="currentColor" stroke="none">TNF</text>
      <path d="M20 48l-8 8"/>
      <path d="M44 48l8 8"/>
      <path d="M14 54l-2 4"/>
      <path d="M50 54l2 4"/>
      <line x1="16" y1="32" x2="24" y2="36" stroke="#4169E1" stroke-width="2"/>
      <text x="4" y="36" font-size="4" fill="#4169E1" stroke="none">Ab</text>
    </svg>`
  },
  {
    id: 'rheum-il6-inhibitor',
    name: 'IL-6 Inhibitor',
    domain: 'medicine',
    category: 'treatment',
    tags: ['IL-6', 'biologic', 'tocilizumab', 'sarilumab', 'interleukin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#FFA500" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
      <text x="22" y="36" font-size="5" fill="currentColor" stroke="none">IL-6</text>
      <path d="M16 24l-8-8"/>
      <path d="M48 24l8-8"/>
      <path d="M16 40l-8 8"/>
      <path d="M48 40l8 8"/>
      <circle cx="8" cy="16" r="4" fill="#4169E1" opacity="0.4"/>
      <circle cx="56" cy="16" r="4" fill="#4169E1" opacity="0.4"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Receptor Block</text>
    </svg>`
  },
  {
    id: 'rheum-jak-inhibitor',
    name: 'JAK Inhibitor',
    domain: 'medicine',
    category: 'treatment',
    tags: ['JAK', 'tofacitinib', 'baricitinib', 'upadacitinib', 'kinase'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="12" y="16" width="40" height="32" rx="4"/>
      <path d="M20 24v16" stroke-width="2"/>
      <path d="M28 24v16" stroke-width="2"/>
      <path d="M36 24v16" stroke-width="2"/>
      <path d="M44 24v16" stroke-width="2"/>
      <path d="M16 32h32" stroke-width="2" stroke="#DC143C"/>
      <circle cx="24" cy="32" r="3" fill="#DC143C"/>
      <circle cx="40" cy="32" r="3" fill="#DC143C"/>
      <text x="16" y="56" font-size="4" fill="currentColor" stroke="none">JAK 1/2/3</text>
    </svg>`
  },
  {
    id: 'rheum-b-cell-depletion',
    name: 'B-Cell Depletion',
    domain: 'medicine',
    category: 'treatment',
    tags: ['B-cell', 'rituximab', 'CD20', 'depletion', 'biologic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="24" r="8" fill="#4169E1" opacity="0.4"/>
      <circle cx="44" cy="24" r="8" fill="#4169E1" opacity="0.4"/>
      <circle cx="32" cy="40" r="8" fill="#4169E1" opacity="0.4"/>
      <circle cx="20" cy="24" r="8"/>
      <circle cx="44" cy="24" r="8"/>
      <circle cx="32" cy="40" r="8"/>
      <text x="17" y="28" font-size="5" fill="currentColor" stroke="none">B</text>
      <text x="41" y="28" font-size="5" fill="currentColor" stroke="none">B</text>
      <text x="29" y="44" font-size="5" fill="currentColor" stroke="none">B</text>
      <path d="M12 16l16 16" stroke="#DC143C" stroke-width="2"/>
      <path d="M28 16l-16 16" stroke="#DC143C" stroke-width="2"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Anti-CD20</text>
    </svg>`
  },
  {
    id: 'rheum-steroid-injection',
    name: 'Steroid Injection',
    domain: 'medicine',
    category: 'treatment',
    tags: ['steroid', 'injection', 'corticosteroid', 'intra-articular', 'triamcinolone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="20" ry="12" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="40" rx="20" ry="12"/>
      <ellipse cx="32" cy="28" rx="12" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="52" rx="12" ry="5" fill="currentColor" opacity="0.2"/>
      <rect x="44" y="8" width="6" height="20" rx="1" fill="#FFD700" opacity="0.6"/>
      <rect x="44" y="8" width="6" height="20" rx="1"/>
      <path d="M47 28l-8 8"/>
      <circle cx="39" cy="36" r="2" fill="#FFD700"/>
      <text x="4" y="20" font-size="4" fill="currentColor" stroke="none">Intra-</text>
      <text x="4" y="26" font-size="4" fill="currentColor" stroke="none">articular</text>
    </svg>`
  },
  {
    id: 'rheum-physical-therapy',
    name: 'Physical Therapy',
    domain: 'medicine',
    category: 'treatment',
    tags: ['physical therapy', 'PT', 'rehabilitation', 'exercise', 'ROM'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8"/>
      <path d="M32 20v16"/>
      <path d="M24 28h16"/>
      <path d="M24 36l-8 16"/>
      <path d="M40 36l8 16"/>
      <path d="M20 44c4-4 8-4 12 0" stroke="#228B22" stroke-width="2"/>
      <path d="M32 44c4-4 8-4 12 0" stroke="#228B22" stroke-width="2"/>
      <path d="M16 28l-4-8 4-4" stroke="#4169E1" stroke-width="2"/>
      <path d="M48 28l4-8-4-4" stroke="#4169E1" stroke-width="2"/>
      <text x="4" y="60" font-size="4" fill="currentColor" stroke="none">Rehabilitation</text>
    </svg>`
  },
  {
    id: 'rheum-nsaid',
    name: 'NSAIDs',
    domain: 'medicine',
    category: 'treatment',
    tags: ['NSAID', 'anti-inflammatory', 'ibuprofen', 'naproxen', 'COX'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="8" fill="#228B22" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="16" ry="8"/>
      <path d="M16 32c0 10 8 18 16 18s16-8 16-18"/>
      <path d="M24 28c4 4 12 4 16 0"/>
      <path d="M24 36c4-4 12-4 16 0"/>
      <text x="18" y="56" font-size="4" fill="currentColor" stroke="none">Anti-COX</text>
    </svg>`
  },
  {
    id: 'rheum-colchicine',
    name: 'Colchicine',
    domain: 'medicine',
    category: 'treatment',
    tags: ['colchicine', 'gout', 'prophylaxis', 'anti-inflammatory', 'microtubule'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#9370DB" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
      <path d="M32 16v32"/>
      <path d="M16 32h32"/>
      <path d="M22 22l20 20"/>
      <path d="M42 22l-20 20"/>
      <circle cx="32" cy="32" r="6" fill="white"/>
      <text x="12" y="56" font-size="4" fill="currentColor" stroke="none">Colchicine</text>
    </svg>`
  },
  {
    id: 'rheum-urate-lowering',
    name: 'Urate-Lowering Therapy',
    domain: 'medicine',
    category: 'treatment',
    tags: ['allopurinol', 'febuxostat', 'urate-lowering', 'XO inhibitor', 'gout'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="16" height="40" rx="2"/>
      <rect x="8" y="36" width="16" height="20" rx="2" fill="#228B22" opacity="0.4"/>
      <rect x="28" y="16" width="16" height="40" rx="2"/>
      <rect x="28" y="44" width="16" height="12" rx="2" fill="#228B22" opacity="0.4"/>
      <path d="M48 56l8-40"/>
      <path d="M48 56l4-2"/>
      <path d="M56 16l4 2"/>
      <text x="10" y="30" font-size="4" fill="currentColor" stroke="none">Pre</text>
      <text x="30" y="38" font-size="4" fill="currentColor" stroke="none">Post</text>
      <text x="50" y="36" font-size="3" fill="currentColor" stroke="none">UA</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL ICONS - INFLAMMATORY MARKERS
  // ===========================================================================
  {
    id: 'rheum-esr',
    name: 'ESR (Sed Rate)',
    domain: 'medicine',
    category: 'autoantibodies',
    tags: ['ESR', 'sed rate', 'erythrocyte', 'sedimentation', 'inflammation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="48" rx="2"/>
      <rect x="24" y="32" width="16" height="24" rx="2" fill="#DC143C" opacity="0.4"/>
      <path d="M20 32h24"/>
      <path d="M20 20h4"/>
      <path d="M40 20h4"/>
      <path d="M20 44h4"/>
      <path d="M40 44h4"/>
      <text x="8" y="34" font-size="4" fill="currentColor" stroke="none">mm</text>
      <text x="48" y="34" font-size="4" fill="currentColor" stroke="none">/hr</text>
      <text x="22" y="62" font-size="4" fill="currentColor" stroke="none">ESR</text>
    </svg>`
  },
  {
    id: 'rheum-crp',
    name: 'C-Reactive Protein',
    domain: 'medicine',
    category: 'autoantibodies',
    tags: ['CRP', 'C-reactive protein', 'acute phase', 'inflammation', 'marker'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="20"/>
      <path d="M32 12c-11 0-20 9-20 20" stroke="#DC143C" stroke-width="3"/>
      <circle cx="32" cy="32" r="8" fill="#DC143C" opacity="0.4"/>
      <path d="M28 28l8 8"/>
      <path d="M36 28l-8 8"/>
      <text x="22" y="56" font-size="5" fill="currentColor" stroke="none">CRP</text>
    </svg>`
  },

  // ===========================================================================
  // T-CELL TARGETED THERAPY
  // ===========================================================================
  {
    id: 'rheum-t-cell-costim',
    name: 'T-Cell Costimulation Blocker',
    domain: 'medicine',
    category: 'treatment',
    tags: ['T-cell', 'abatacept', 'CTLA4-Ig', 'costimulation', 'biologic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="12" fill="#228B22" opacity="0.3"/>
      <circle cx="24" cy="32" r="12"/>
      <circle cx="44" cy="32" r="8" fill="#4169E1" opacity="0.3"/>
      <circle cx="44" cy="32" r="8"/>
      <text x="20" y="36" font-size="5" fill="currentColor" stroke="none">T</text>
      <text x="38" y="36" font-size="4" fill="currentColor" stroke="none">APC</text>
      <path d="M36 28l-8-4" stroke="#DC143C" stroke-width="2"/>
      <path d="M36 36l-8 4" stroke="#DC143C" stroke-width="2"/>
      <circle cx="32" cy="24" r="3" fill="#DC143C"/>
      <circle cx="32" cy="40" r="3" fill="#DC143C"/>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Block</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL SPECIFIC CONDITIONS
  // ===========================================================================
  {
    id: 'rheum-fibromyalgia',
    name: 'Fibromyalgia Tender Points',
    domain: 'medicine',
    category: 'treatment',
    tags: ['fibromyalgia', 'tender points', 'chronic pain', 'widespread', 'fatigue'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="6"/>
      <path d="M32 18v20"/>
      <path d="M24 24h16"/>
      <path d="M24 38l-8 18"/>
      <path d="M40 38l8 18"/>
      <circle cx="24" cy="24" r="2" fill="#DC143C"/>
      <circle cx="40" cy="24" r="2" fill="#DC143C"/>
      <circle cx="20" cy="28" r="2" fill="#DC143C"/>
      <circle cx="44" cy="28" r="2" fill="#DC143C"/>
      <circle cx="24" cy="34" r="2" fill="#DC143C"/>
      <circle cx="40" cy="34" r="2" fill="#DC143C"/>
      <circle cx="18" cy="48" r="2" fill="#DC143C"/>
      <circle cx="46" cy="48" r="2" fill="#DC143C"/>
      <circle cx="20" cy="54" r="2" fill="#DC143C"/>
      <circle cx="44" cy="54" r="2" fill="#DC143C"/>
    </svg>`
  },

  // ===========================================================================
  // VASCULITIS
  // ===========================================================================
  {
    id: 'rheum-gca',
    name: 'Giant Cell Arteritis',
    domain: 'medicine',
    category: 'vasculitis',
    tags: ['GCA', 'giant cell', 'temporal arteritis', 'large vessel', 'polymyalgia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8"/>
      <path d="M16 16c-4 4-8 12-8 20"/>
      <path d="M48 16c4 4 8 12 8 20"/>
      <path d="M8 36c0 12 8 20 24 20s24-8 24-20" stroke="#DC143C" stroke-width="3"/>
      <path d="M24 8c-8 4-12 4-16 8"/>
      <path d="M40 8c8 4 12 4 16 8"/>
      <circle cx="12" cy="20" r="3" fill="#DC143C" opacity="0.5"/>
      <circle cx="52" cy="20" r="3" fill="#DC143C" opacity="0.5"/>
      <text x="16" y="62" font-size="4" fill="currentColor" stroke="none">Temporal A.</text>
    </svg>`
  },
  {
    id: 'rheum-takayasu',
    name: 'Takayasu Arteritis',
    domain: 'medicine',
    category: 'vasculitis',
    tags: ['Takayasu', 'pulseless', 'aortic arch', 'large vessel', 'stenosis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 56V24" stroke-width="6" stroke="#DC143C" opacity="0.3"/>
      <path d="M32 56V24" stroke-width="3"/>
      <path d="M32 24c0-8-12-16-20-16" stroke-width="3"/>
      <path d="M32 24c0-8 12-16 20-16" stroke-width="3"/>
      <path d="M24 16c-4-4-4-8 0-8" stroke-width="2"/>
      <path d="M40 16c4-4 4-8 0-8" stroke-width="2"/>
      <ellipse cx="20" cy="20" rx="6" ry="3" fill="#DC143C" opacity="0.5"/>
      <ellipse cx="44" cy="20" rx="6" ry="3" fill="#DC143C" opacity="0.5"/>
      <path d="M26 20l-6 4" stroke="#DC143C"/>
      <path d="M38 20l6 4" stroke="#DC143C"/>
      <text x="16" y="48" font-size="4" fill="currentColor" stroke="none">Aorta</text>
    </svg>`
  },
  {
    id: 'rheum-anca-vasculitis',
    name: 'ANCA-Associated Vasculitis',
    domain: 'medicine',
    category: 'vasculitis',
    tags: ['ANCA', 'GPA', 'MPA', 'EGPA', 'small vessel', 'granulomatosis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="20"/>
      <path d="M32 12v8" stroke-width="2"/>
      <path d="M32 44v8" stroke-width="2"/>
      <path d="M12 32h8" stroke-width="2"/>
      <path d="M44 32h8" stroke-width="2"/>
      <circle cx="32" cy="32" r="8" fill="#DC143C" opacity="0.4"/>
      <path d="M28 28l8 8" stroke="#DC143C" stroke-width="2"/>
      <path d="M36 28l-8 8" stroke="#DC143C" stroke-width="2"/>
      <circle cx="20" cy="20" r="3" fill="#FFD700"/>
      <circle cx="44" cy="20" r="3" fill="#FFD700"/>
      <circle cx="20" cy="44" r="3" fill="#FFD700"/>
      <circle cx="44" cy="44" r="3" fill="#FFD700"/>
      <text x="8" y="60" font-size="4" fill="currentColor" stroke="none">Sm. Vessel</text>
    </svg>`
  },
  {
    id: 'rheum-pan',
    name: 'Polyarteritis Nodosa',
    domain: 'medicine',
    category: 'vasculitis',
    tags: ['PAN', 'polyarteritis', 'medium vessel', 'aneurysm', 'nodular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h48" stroke-width="3"/>
      <ellipse cx="20" cy="32" rx="6" ry="8" fill="#DC143C" opacity="0.4"/>
      <ellipse cx="36" cy="32" rx="4" ry="6" fill="#DC143C" opacity="0.4"/>
      <ellipse cx="50" cy="32" rx="5" ry="7" fill="#DC143C" opacity="0.4"/>
      <ellipse cx="20" cy="32" rx="6" ry="8"/>
      <ellipse cx="36" cy="32" rx="4" ry="6"/>
      <ellipse cx="50" cy="32" rx="5" ry="7"/>
      <path d="M8 28h6"/>
      <path d="M8 36h6"/>
      <text x="10" y="52" font-size="4" fill="currentColor" stroke="none">Med. Vessel</text>
      <text x="30" y="52" font-size="4" fill="currentColor" stroke="none">Aneurysms</text>
    </svg>`
  },
  {
    id: 'rheum-behcet',
    name: 'Behcet Disease',
    domain: 'medicine',
    category: 'vasculitis',
    tags: ['Behcet', 'oral ulcer', 'genital ulcer', 'uveitis', 'pathergy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="8"/>
      <path d="M24 14h16" stroke="#DC143C" stroke-width="2"/>
      <ellipse cx="28" cy="14" rx="3" ry="2" fill="#DC143C"/>
      <circle cx="32" cy="16" r="2" fill="white"/>
      <circle cx="32" cy="44" r="12" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="44" rx="8" ry="6" fill="#DC143C" opacity="0.4"/>
      <circle cx="12" cy="32" r="4"/>
      <circle cx="12" cy="32" r="2" fill="#4169E1"/>
      <circle cx="52" cy="32" r="4"/>
      <circle cx="52" cy="32" r="2" fill="#4169E1"/>
      <text x="6" y="44" font-size="3" fill="currentColor" stroke="none">Eye</text>
      <text x="46" y="44" font-size="3" fill="currentColor" stroke="none">Eye</text>
    </svg>`
  },

  // ===========================================================================
  // CONNECTIVE TISSUE DISEASES (ADDITIONAL)
  // ===========================================================================
  {
    id: 'rheum-mctd',
    name: 'Mixed Connective Tissue Disease',
    domain: 'medicine',
    category: 'connective-tissue',
    tags: ['MCTD', 'mixed', 'overlap', 'anti-U1RNP', 'Raynaud'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="24" r="12" fill="#DC143C" opacity="0.3"/>
      <circle cx="40" cy="24" r="12" fill="#4169E1" opacity="0.3"/>
      <circle cx="32" cy="40" r="12" fill="#228B22" opacity="0.3"/>
      <circle cx="24" cy="24" r="12"/>
      <circle cx="40" cy="24" r="12"/>
      <circle cx="32" cy="40" r="12"/>
      <text x="18" y="20" font-size="4" fill="currentColor" stroke="none">SLE</text>
      <text x="36" y="20" font-size="4" fill="currentColor" stroke="none">SSc</text>
      <text x="24" y="44" font-size="4" fill="currentColor" stroke="none">PM/DM</text>
    </svg>`
  },
  {
    id: 'rheum-polymyositis',
    name: 'Polymyositis',
    domain: 'medicine',
    category: 'connective-tissue',
    tags: ['polymyositis', 'myositis', 'muscle weakness', 'CK elevation', 'inflammatory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="16" ry="24"/>
      <path d="M20 16c4 8 8 16 12 32" stroke-width="2" stroke="#DC143C"/>
      <path d="M44 16c-4 8-8 16-12 32" stroke-width="2" stroke="#DC143C"/>
      <path d="M24 24h16" stroke-dasharray="2 2"/>
      <path d="M22 32h20" stroke-dasharray="2 2"/>
      <path d="M24 40h16" stroke-dasharray="2 2"/>
      <circle cx="28" cy="28" r="2" fill="#DC143C"/>
      <circle cx="36" cy="36" r="2" fill="#DC143C"/>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">Muscle</text>
    </svg>`
  },
  {
    id: 'rheum-raynaud',
    name: 'Raynaud Phenomenon',
    domain: 'medicine',
    category: 'connective-tissue',
    tags: ['Raynaud', 'vasospasm', 'digital', 'cold sensitivity', 'triphasic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 56V32c0-4 2-8 2-12s-2-8-2-12"/>
      <path d="M28 56V24c0-4 2-8 2-12"/>
      <path d="M36 56V24c0-4-2-8-2-12"/>
      <path d="M44 56V32c0-4-2-8-2-12s2-8 2-12"/>
      <rect x="18" y="44" width="6" height="12" rx="2" fill="white"/>
      <rect x="26" y="44" width="6" height="12" rx="2" fill="#4169E1"/>
      <rect x="34" y="44" width="6" height="12" rx="2" fill="#DC143C"/>
      <rect x="42" y="44" width="6" height="12" rx="2" fill="currentColor" opacity="0.3"/>
      <text x="14" y="40" font-size="3" fill="currentColor" stroke="none">White</text>
      <text x="26" y="40" font-size="3" fill="currentColor" stroke="none">Blue</text>
      <text x="38" y="40" font-size="3" fill="currentColor" stroke="none">Red</text>
    </svg>`
  },
  {
    id: 'rheum-ctd-ild',
    name: 'CTD-Associated ILD',
    domain: 'medicine',
    category: 'connective-tissue',
    tags: ['ILD', 'interstitial lung disease', 'CTD', 'fibrosis', 'pulmonary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="14" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="40" cy="32" rx="14" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="24" cy="32" rx="14" ry="20"/>
      <ellipse cx="40" cy="32" rx="14" ry="20"/>
      <path d="M18 24c4 4 8 4 12 0" stroke="#DC143C" stroke-dasharray="2 2"/>
      <path d="M18 32c4 4 8 4 12 0" stroke="#DC143C" stroke-dasharray="2 2"/>
      <path d="M18 40c4 4 8 4 12 0" stroke="#DC143C" stroke-dasharray="2 2"/>
      <path d="M34 24c4 4 8 4 12 0" stroke="#DC143C" stroke-dasharray="2 2"/>
      <path d="M34 32c4 4 8 4 12 0" stroke="#DC143C" stroke-dasharray="2 2"/>
      <path d="M34 40c4 4 8 4 12 0" stroke="#DC143C" stroke-dasharray="2 2"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Fibrosis</text>
    </svg>`
  },
  {
    id: 'rheum-antisynthetase',
    name: 'Antisynthetase Syndrome',
    domain: 'medicine',
    category: 'connective-tissue',
    tags: ['antisynthetase', 'anti-Jo1', 'myositis', 'ILD', 'mechanic hands'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 40c0-8 4-16 8-24"/>
      <path d="M24 40c0-8 4-20 8-24"/>
      <path d="M32 40c0-8 4-20 8-24"/>
      <path d="M40 40c0-8 4-16 8-24"/>
      <path d="M48 40c0-8 0-12 4-16"/>
      <rect x="12" y="40" width="44" height="16" rx="4" fill="currentColor" opacity="0.2"/>
      <path d="M16 48h8" stroke-dasharray="3 2" stroke="#DC143C"/>
      <path d="M28 48h8" stroke-dasharray="3 2" stroke="#DC143C"/>
      <path d="M40 48h8" stroke-dasharray="3 2" stroke="#DC143C"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Mechanic Hands</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL AUTOANTIBODIES
  // ===========================================================================
  {
    id: 'rheum-anti-ro-ssa',
    name: 'Anti-Ro/SSA Antibody',
    domain: 'medicine',
    category: 'autoantibodies',
    tags: ['anti-Ro', 'SSA', 'Sjogren', 'neonatal lupus', 'photosensitivity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="10" fill="#FFD700" opacity="0.4"/>
      <text x="22" y="36" font-size="8" fill="currentColor" stroke="none">Ro</text>
      <path d="M12 32h8" stroke="#DC143C" stroke-width="2"/>
      <path d="M44 32h8" stroke="#DC143C" stroke-width="2"/>
      <path d="M32 12v8" stroke="#DC143C" stroke-width="2"/>
      <path d="M32 44v8" stroke="#DC143C" stroke-width="2"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">SSA</text>
    </svg>`
  },
  {
    id: 'rheum-anti-la-ssb',
    name: 'Anti-La/SSB Antibody',
    domain: 'medicine',
    category: 'autoantibodies',
    tags: ['anti-La', 'SSB', 'Sjogren', 'lupus', 'protective'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="10" fill="#87CEEB" opacity="0.4"/>
      <text x="24" y="36" font-size="8" fill="currentColor" stroke="none">La</text>
      <path d="M12 32h8" stroke="#4169E1" stroke-width="2"/>
      <path d="M44 32h8" stroke="#4169E1" stroke-width="2"/>
      <path d="M32 12v8" stroke="#4169E1" stroke-width="2"/>
      <path d="M32 44v8" stroke="#4169E1" stroke-width="2"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">SSB</text>
    </svg>`
  },
  {
    id: 'rheum-anti-jo1',
    name: 'Anti-Jo-1 Antibody',
    domain: 'medicine',
    category: 'autoantibodies',
    tags: ['anti-Jo1', 'tRNA synthetase', 'myositis', 'ILD', 'antisynthetase'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="12" y="12" width="40" height="40" rx="4"/>
      <path d="M20 20l24 24" stroke="#DC143C" stroke-width="2"/>
      <path d="M20 20v12" stroke-width="2"/>
      <path d="M20 20h12" stroke-width="2"/>
      <circle cx="32" cy="32" r="6" fill="#9370DB" opacity="0.4"/>
      <text x="26" y="36" font-size="6" fill="currentColor" stroke="none">J1</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">tRNA Syn</text>
    </svg>`
  },
  {
    id: 'rheum-anti-scl70',
    name: 'Anti-Scl-70 Antibody',
    domain: 'medicine',
    category: 'autoantibodies',
    tags: ['anti-Scl70', 'topoisomerase', 'scleroderma', 'diffuse SSc', 'ILD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="20"/>
      <path d="M20 24c8 0 16 8 24 8" stroke-width="2" stroke="#DC143C"/>
      <path d="M20 32c8 0 16 8 24 8" stroke-width="2" stroke="#DC143C"/>
      <path d="M20 40c8 0 16-8 24-8" stroke-width="2" stroke="#DC143C"/>
      <circle cx="32" cy="32" r="6" fill="#228B22" opacity="0.4"/>
      <text x="24" y="36" font-size="5" fill="currentColor" stroke="none">70</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Topo-1</text>
    </svg>`
  },
  {
    id: 'rheum-anca-pr3',
    name: 'PR3-ANCA (c-ANCA)',
    domain: 'medicine',
    category: 'autoantibodies',
    tags: ['PR3', 'c-ANCA', 'GPA', 'Wegener', 'cytoplasmic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12" fill="#228B22" opacity="0.3"/>
      <circle cx="32" cy="32" r="6" fill="#228B22" opacity="0.5"/>
      <text x="20" y="36" font-size="6" fill="currentColor" stroke="none">PR3</text>
      <path d="M12 20l4 4" stroke="#228B22" stroke-width="2"/>
      <path d="M52 20l-4 4" stroke="#228B22" stroke-width="2"/>
      <path d="M12 44l4-4" stroke="#228B22" stroke-width="2"/>
      <path d="M52 44l-4-4" stroke="#228B22" stroke-width="2"/>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Cytoplasmic</text>
    </svg>`
  },
  {
    id: 'rheum-anca-mpo',
    name: 'MPO-ANCA (p-ANCA)',
    domain: 'medicine',
    category: 'autoantibodies',
    tags: ['MPO', 'p-ANCA', 'MPA', 'EGPA', 'perinuclear'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="8" fill="#4169E1" opacity="0.4"/>
      <circle cx="32" cy="32" r="12" stroke="#4169E1" stroke-width="3" stroke-dasharray="4 2"/>
      <text x="18" y="36" font-size="5" fill="currentColor" stroke="none">MPO</text>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Perinuclear</text>
    </svg>`
  },

  // ===========================================================================
  // CRYSTAL ARTHROPATHIES (ADDITIONAL)
  // ===========================================================================
  {
    id: 'rheum-cppd',
    name: 'CPPD (Pseudogout)',
    domain: 'medicine',
    category: 'crystal-arthropathy',
    tags: ['CPPD', 'pseudogout', 'calcium pyrophosphate', 'chondrocalcinosis', 'crystal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="12" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="12"/>
      <rect x="20" y="28" width="8" height="4" fill="#87CEEB" opacity="0.6" transform="rotate(15 24 30)"/>
      <rect x="32" y="26" width="10" height="3" fill="#87CEEB" opacity="0.6" transform="rotate(-10 37 28)"/>
      <rect x="28" y="34" width="6" height="3" fill="#87CEEB" opacity="0.6" transform="rotate(25 31 36)"/>
      <rect x="40" y="30" width="8" height="4" fill="#87CEEB" opacity="0.6" transform="rotate(-5 44 32)"/>
      <text x="14" y="52" font-size="4" fill="currentColor" stroke="none">Rhomboid</text>
      <text x="38" y="52" font-size="4" fill="currentColor" stroke="none">+Biref</text>
    </svg>`
  },
  {
    id: 'rheum-tophi',
    name: 'Gouty Tophi',
    domain: 'medicine',
    category: 'crystal-arthropathy',
    tags: ['tophi', 'tophus', 'gout', 'urate deposit', 'chronic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="44" rx="20" ry="12" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="44" rx="20" ry="12"/>
      <circle cx="24" cy="24" r="10" fill="#FFD700" opacity="0.5"/>
      <circle cx="24" cy="24" r="10"/>
      <circle cx="44" cy="20" r="6" fill="#FFD700" opacity="0.5"/>
      <circle cx="44" cy="20" r="6"/>
      <circle cx="40" cy="32" r="4" fill="#FFD700" opacity="0.5"/>
      <circle cx="40" cy="32" r="4"/>
      <path d="M24 24c-2-2 2-4 4-2s-2 4-4 2" fill="white"/>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">Tophi</text>
    </svg>`
  },
  {
    id: 'rheum-crystal-analysis',
    name: 'Crystal Analysis',
    domain: 'medicine',
    category: 'crystal-arthropathy',
    tags: ['polarized', 'microscopy', 'synovial fluid', 'crystal', 'birefringence'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22" fill="currentColor" opacity="0.05"/>
      <circle cx="32" cy="32" r="22"/>
      <circle cx="32" cy="32" r="16"/>
      <path d="M20 28l8-4 8 4 8-4" stroke="#FFD700" stroke-width="2"/>
      <rect x="26" y="32" width="12" height="4" fill="#87CEEB" opacity="0.6"/>
      <path d="M16 40h32" stroke-dasharray="2 2"/>
      <circle cx="10" cy="32" r="4"/>
      <circle cx="54" cy="32" r="4"/>
      <path d="M10 28v8"/>
      <path d="M54 28v8"/>
      <text x="6" y="44" font-size="3" fill="currentColor" stroke="none">Pol</text>
      <text x="50" y="44" font-size="3" fill="currentColor" stroke="none">Pol</text>
    </svg>`
  },

  // ===========================================================================
  // SPONDYLOARTHROPATHY SPECIFICS
  // ===========================================================================
  {
    id: 'rheum-bamboo-spine',
    name: 'Bamboo Spine',
    domain: 'medicine',
    category: 'spondyloarthropathy',
    tags: ['bamboo spine', 'ankylosing spondylitis', 'syndesmophytes', 'fusion', 'AS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="4" width="16" height="10" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="16" width="16" height="10" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="28" width="16" height="10" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="40" width="16" height="10" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="52" width="16" height="10" rx="2" fill="currentColor" opacity="0.2"/>
      <path d="M20 4v58" stroke="#228B22" stroke-width="2"/>
      <path d="M44 4v58" stroke="#228B22" stroke-width="2"/>
      <path d="M20 14h4"/>
      <path d="M40 14h4"/>
      <path d="M20 26h4"/>
      <path d="M40 26h4"/>
      <path d="M20 38h4"/>
      <path d="M40 38h4"/>
      <path d="M20 50h4"/>
      <path d="M40 50h4"/>
      <text x="46" y="34" font-size="4" fill="currentColor" stroke="none">Fused</text>
    </svg>`
  },
  {
    id: 'rheum-dactylitis',
    name: 'Dactylitis (Sausage Digit)',
    domain: 'medicine',
    category: 'spondyloarthropathy',
    tags: ['dactylitis', 'sausage digit', 'PsA', 'SpA', 'tenosynovitis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 56V24c0-8 4-16 8-16"/>
      <path d="M28 56V12"/>
      <path d="M40 56V12"/>
      <path d="M52 56V24c0-8-4-16-8-16"/>
      <ellipse cx="28" cy="34" rx="8" ry="16" fill="#DC143C" opacity="0.3"/>
      <ellipse cx="28" cy="34" rx="8" ry="16"/>
      <path d="M20 34h4"/>
      <path d="M32 34h4"/>
      <text x="36" y="38" font-size="4" fill="currentColor" stroke="none">Swollen</text>
      <text x="8" y="62" font-size="4" fill="currentColor" stroke="none">Normal</text>
    </svg>`
  },
  {
    id: 'rheum-sacroiliitis',
    name: 'Sacroiliitis',
    domain: 'medicine',
    category: 'spondyloarthropathy',
    tags: ['sacroiliitis', 'SI joint', 'SpA', 'axial', 'MRI'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v16" stroke-width="3"/>
      <ellipse cx="32" cy="40" rx="24" ry="16" fill="currentColor" opacity="0.1"/>
      <path d="M16 32c-4 8-4 16 0 24"/>
      <path d="M48 32c4 8 4 16 0 24"/>
      <path d="M24 28c-4 12-4 20 0 28" stroke="#DC143C" stroke-width="2"/>
      <path d="M40 28c4 12 4 20 0 28" stroke="#DC143C" stroke-width="2"/>
      <ellipse cx="24" cy="40" rx="4" ry="8" fill="#DC143C" opacity="0.4"/>
      <ellipse cx="40" cy="40" rx="4" ry="8" fill="#DC143C" opacity="0.4"/>
      <text x="18" y="60" font-size="4" fill="currentColor" stroke="none">SI Joint</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL TREATMENT MODALITIES
  // ===========================================================================
  {
    id: 'rheum-plasmapheresis',
    name: 'Plasmapheresis',
    domain: 'medicine',
    category: 'treatment',
    tags: ['plasmapheresis', 'plasma exchange', 'PLEX', 'antibody removal', 'apheresis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="24" y="8" width="16" height="48" rx="4"/>
      <rect x="24" y="32" width="16" height="24" rx="4" fill="#DC143C" opacity="0.3"/>
      <rect x="24" y="8" width="16" height="24" rx="4" fill="#FFD700" opacity="0.3"/>
      <path d="M8 20h16"/>
      <path d="M8 44h16"/>
      <path d="M8 20v24" stroke-width="2" stroke="#DC143C"/>
      <circle cx="8" cy="32" r="4"/>
      <path d="M56 20h-16"/>
      <path d="M56 44h-16"/>
      <path d="M56 20v24" stroke-width="2" stroke="#4169E1"/>
      <circle cx="56" cy="32" r="4"/>
      <text x="26" y="22" font-size="4" fill="currentColor" stroke="none">Plasma</text>
      <text x="28" y="46" font-size="4" fill="currentColor" stroke="none">RBC</text>
    </svg>`
  },
  {
    id: 'rheum-ivig',
    name: 'IVIG Therapy',
    domain: 'medicine',
    category: 'treatment',
    tags: ['IVIG', 'immunoglobulin', 'IV', 'immune modulation', 'antibody'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="40" rx="4" fill="#FFD700" opacity="0.3"/>
      <rect x="20" y="8" width="24" height="40" rx="4"/>
      <path d="M32 48v12"/>
      <path d="M28 56h8"/>
      <circle cx="32" cy="60" r="2"/>
      <path d="M20 20h24" stroke-dasharray="4 2"/>
      <path d="M26 28h12"/>
      <path d="M32 24v8"/>
      <text x="24" y="42" font-size="5" fill="currentColor" stroke="none">IVIG</text>
      <text x="8" y="16" font-size="4" fill="currentColor" stroke="none">IgG</text>
    </svg>`
  },
  {
    id: 'rheum-hydroxychloroquine',
    name: 'Hydroxychloroquine',
    domain: 'medicine',
    category: 'treatment',
    tags: ['hydroxychloroquine', 'Plaquenil', 'HCQ', 'antimalarial', 'DMARD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="10" fill="#4169E1" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="16" ry="10"/>
      <path d="M16 32c0 12 8 20 16 20s16-8 16-20"/>
      <path d="M24 28c4 4 12 4 16 0"/>
      <path d="M24 36c4-4 12-4 16 0"/>
      <circle cx="32" cy="32" r="4" fill="white"/>
      <text x="28" y="35" font-size="5" fill="currentColor" stroke="none">H</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">HCQ</text>
    </svg>`
  },
  {
    id: 'rheum-il17-inhibitor',
    name: 'IL-17 Inhibitor',
    domain: 'medicine',
    category: 'treatment',
    tags: ['IL-17', 'secukinumab', 'ixekizumab', 'biologic', 'SpA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="12" fill="#9370DB" opacity="0.3"/>
      <circle cx="24" cy="32" r="12"/>
      <text x="14" y="36" font-size="6" fill="currentColor" stroke="none">17</text>
      <rect x="40" y="20" width="16" height="24" rx="4" fill="#DC143C" opacity="0.3"/>
      <rect x="40" y="20" width="16" height="24" rx="4"/>
      <path d="M36 28h4"/>
      <path d="M36 36h4"/>
      <path d="M44 28v8" stroke="#DC143C" stroke-width="2"/>
      <path d="M44 32h8" stroke="#DC143C" stroke-width="2"/>
      <text x="42" y="50" font-size="4" fill="currentColor" stroke="none">Block</text>
    </svg>`
  }
];

export default rheumatologyIcons;
