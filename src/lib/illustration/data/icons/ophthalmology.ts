/**
 * Ophthalmology Icon Library
 * Comprehensive SVG icons for eye anatomy, pathology, equipment, and procedures
 *
 * Categories:
 * - Eye Anatomy (cornea, iris, lens, retina, etc.)
 * - Anterior Segment (anterior chamber, trabecular meshwork, etc.)
 * - Posterior Segment (retinal layers, photoreceptors, etc.)
 * - Pathology - Anterior (cataract, glaucoma, corneal ulcer, etc.)
 * - Pathology - Posterior (diabetic retinopathy, AMD, retinal detachment, etc.)
 * - Equipment (slit lamp, ophthalmoscope, OCT, etc.)
 * - Procedures (cataract surgery, LASIK, intravitreal injection, etc.)
 */

import type { IconDefinition } from './index';

export const ophthalmologyIcons: IconDefinition[] = [
  // ===========================================================================
  // EYE ANATOMY (12 icons)
  // ===========================================================================
  {
    id: 'ophth-eye-cross-section',
    name: 'Eye Cross-Section',
    domain: 'medicine',
    category: 'eye-anatomy',
    tags: ['eye', 'anatomy', 'cross-section', 'globe', 'overview', 'sagittal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="26" ry="24"/>
      <ellipse cx="14" cy="32" rx="8" ry="12" fill="currentColor" opacity="0.1"/>
      <path d="M8 32c4-6 8-10 14-10s10 4 10 10-4 10-10 10-10-4-14-10z"/>
      <circle cx="18" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="18" cy="32" r="2" fill="currentColor"/>
      <ellipse cx="26" cy="32" rx="4" ry="6"/>
      <path d="M58 32h-24" stroke-dasharray="2 2"/>
      <circle cx="52" cy="32" r="4" fill="currentColor" opacity="0.2"/>
      <text x="48" y="24" font-size="4" fill="currentColor" stroke="none">Macula</text>
      <text x="2" y="24" font-size="4" fill="currentColor" stroke="none">Cornea</text>
    </svg>`
  },
  {
    id: 'ophth-cornea',
    name: 'Cornea',
    domain: 'medicine',
    category: 'eye-anatomy',
    tags: ['cornea', 'anterior', 'transparent', 'epithelium', 'stroma', 'endothelium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-16 8-24 20-24s20 8 20 24-8 24-20 24-20-8-20-24z"/>
      <path d="M16 32c0-12 6-20 16-20"/>
      <path d="M20 32c0-8 4-14 12-14"/>
      <path d="M24 32c0-4 2-8 8-8"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">Epithelium</text>
      <text x="8" y="22" font-size="4" fill="currentColor" stroke="none">Bowman's</text>
      <text x="12" y="30" font-size="4" fill="currentColor" stroke="none">Stroma</text>
      <text x="16" y="40" font-size="4" fill="currentColor" stroke="none">Descemet's</text>
      <text x="4" y="50" font-size="4" fill="currentColor" stroke="none">Endothelium</text>
    </svg>`
  },
  {
    id: 'ophth-iris',
    name: 'Iris',
    domain: 'medicine',
    category: 'eye-anatomy',
    tags: ['iris', 'pupil', 'sphincter', 'dilator', 'colored', 'anterior'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="8" fill="currentColor"/>
      <path d="M32 12v8"/>
      <path d="M32 44v8"/>
      <path d="M12 32h8"/>
      <path d="M44 32h8"/>
      <path d="M18 18l5 5"/>
      <path d="M41 41l5 5"/>
      <path d="M18 46l5-5"/>
      <path d="M41 23l5-5"/>
      <text x="28" y="58" font-size="4" fill="currentColor" stroke="none">Iris</text>
    </svg>`
  },
  {
    id: 'ophth-pupil',
    name: 'Pupil',
    domain: 'medicine',
    category: 'eye-anatomy',
    tags: ['pupil', 'aperture', 'light', 'sphincter', 'dilator', 'response'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="10" fill="currentColor"/>
      <path d="M32 8v6"/>
      <path d="M32 50v6"/>
      <path d="M8 32h6"/>
      <path d="M50 32h6"/>
      <path d="M15 15l4 4"/>
      <path d="M45 45l4 4"/>
      <path d="M15 49l4-4"/>
      <path d="M45 19l4-4"/>
      <circle cx="28" cy="28" r="2" fill="white" opacity="0.5"/>
      <text x="22" y="58" font-size="4" fill="currentColor" stroke="none">Pupil</text>
    </svg>`
  },
  {
    id: 'ophth-lens',
    name: 'Crystalline Lens',
    domain: 'medicine',
    category: 'eye-anatomy',
    tags: ['lens', 'crystalline', 'accommodation', 'zonules', 'capsule', 'nucleus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="16" ry="24"/>
      <ellipse cx="32" cy="32" rx="10" ry="16" stroke-dasharray="3 2"/>
      <ellipse cx="32" cy="32" rx="4" ry="8" fill="currentColor" opacity="0.3"/>
      <path d="M16 20l-8-8"/>
      <path d="M48 20l8-8"/>
      <path d="M16 44l-8 8"/>
      <path d="M48 44l8 8"/>
      <text x="4" y="10" font-size="4" fill="currentColor" stroke="none">Zonules</text>
      <text x="26" y="34" font-size="4" fill="currentColor" stroke="none">Nucleus</text>
    </svg>`
  },
  {
    id: 'ophth-retina',
    name: 'Retina',
    domain: 'medicine',
    category: 'eye-anatomy',
    tags: ['retina', 'neural', 'photoreceptors', 'layers', 'vision', 'posterior'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16c16 8 32 8 48 0v32c-16 8-32 8-48 0z" fill="currentColor" opacity="0.1"/>
      <path d="M8 16c16 8 32 8 48 0"/>
      <path d="M8 24c16 8 32 8 48 0" stroke-dasharray="2 2"/>
      <path d="M8 32c16 8 32 8 48 0" stroke-dasharray="2 2"/>
      <path d="M8 40c16 8 32 8 48 0" stroke-dasharray="2 2"/>
      <path d="M8 48c16 8 32 8 48 0"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.5"/>
      <text x="4" y="12" font-size="4" fill="currentColor" stroke="none">ILM</text>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">RPE</text>
      <text x="26" y="38" font-size="4" fill="currentColor" stroke="none">Fovea</text>
    </svg>`
  },
  {
    id: 'ophth-macula',
    name: 'Macula',
    domain: 'medicine',
    category: 'eye-anatomy',
    tags: ['macula', 'fovea', 'foveola', 'central vision', 'lutea', 'yellow spot'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="16" fill="#FFD700" opacity="0.3"/>
      <circle cx="32" cy="32" r="8" fill="#FFD700" opacity="0.5"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
      <text x="8" y="14" font-size="4" fill="currentColor" stroke="none">Perifovea</text>
      <text x="16" y="22" font-size="4" fill="currentColor" stroke="none">Parafovea</text>
      <text x="24" y="28" font-size="4" fill="currentColor" stroke="none">Fovea</text>
      <text x="24" y="40" font-size="4" fill="currentColor" stroke="none">Foveola</text>
    </svg>`
  },
  {
    id: 'ophth-optic-nerve',
    name: 'Optic Nerve',
    domain: 'medicine',
    category: 'eye-anatomy',
    tags: ['optic nerve', 'disc', 'cup', 'neuroretinal rim', 'blind spot', 'CN II'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="16"/>
      <circle cx="32" cy="28" r="6" fill="currentColor" opacity="0.3"/>
      <path d="M20 36c4 4 20 4 24 0"/>
      <path d="M26 44l-2 16"/>
      <path d="M38 44l2 16"/>
      <path d="M32 44v16"/>
      <path d="M24 56l16 4"/>
      <ellipse cx="32" cy="28" rx="12" ry="10" stroke-dasharray="3 2"/>
      <text x="8" y="14" font-size="4" fill="currentColor" stroke="none">Disc</text>
      <text x="28" y="30" font-size="4" fill="currentColor" stroke="none">Cup</text>
    </svg>`
  },
  {
    id: 'ophth-vitreous',
    name: 'Vitreous Humor',
    domain: 'medicine',
    category: 'eye-anatomy',
    tags: ['vitreous', 'humor', 'gel', 'hyaloid', 'floaters', 'posterior'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="22" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="22"/>
      <path d="M12 32c4-2 8-2 12 0s8 2 12 0 8-2 12 0" stroke-dasharray="4 2"/>
      <path d="M12 24c4 2 8 2 12 0s8-2 12 0 8 2 12 0" stroke-dasharray="4 2"/>
      <path d="M12 40c4 2 8 2 12 0s8-2 12 0 8 2 12 0" stroke-dasharray="4 2"/>
      <circle cx="20" cy="28" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="44" cy="36" r="1.5" fill="currentColor" opacity="0.4"/>
      <text x="22" y="58" font-size="4" fill="currentColor" stroke="none">Vitreous</text>
    </svg>`
  },
  {
    id: 'ophth-sclera',
    name: 'Sclera',
    domain: 'medicine',
    category: 'eye-anatomy',
    tags: ['sclera', 'white', 'coat', 'episclera', 'protective', 'outer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="24"/>
      <ellipse cx="32" cy="32" rx="24" ry="20" stroke-dasharray="3 2"/>
      <path d="M4 32c4-2 8-4 12-4"/>
      <path d="M48 28c4 0 8 2 12 4"/>
      <path d="M4 32c4 2 8 4 12 4"/>
      <path d="M48 36c4 0 8-2 12-4"/>
      <ellipse cx="14" cy="32" rx="6" ry="10" fill="currentColor" opacity="0.2"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">Sclera</text>
      <text x="38" y="14" font-size="4" fill="currentColor" stroke="none">Episclera</text>
    </svg>`
  },
  {
    id: 'ophth-choroid',
    name: 'Choroid',
    domain: 'medicine',
    category: 'eye-anatomy',
    tags: ['choroid', 'uvea', 'vascular', 'choriocapillaris', 'pigmented', 'layer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16c16 8 32 8 48 0v32c-16 8-32 8-48 0z"/>
      <path d="M8 20c16 6 32 6 48 0" fill="#8B4513" opacity="0.3"/>
      <path d="M8 24c16 6 32 6 48 0"/>
      <path d="M12 28c8 4 16 4 24 0s16-4 16 0" stroke="#DC143C" stroke-width="1"/>
      <path d="M12 32c8 4 16 4 24 0s16-4 16 0" stroke="#DC143C" stroke-width="1"/>
      <path d="M12 36c8 4 16 4 24 0s16-4 16 0" stroke="#DC143C" stroke-width="1"/>
      <text x="4" y="12" font-size="4" fill="currentColor" stroke="none">Bruch's</text>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Choroid</text>
    </svg>`
  },
  {
    id: 'ophth-conjunctiva',
    name: 'Conjunctiva',
    domain: 'medicine',
    category: 'eye-anatomy',
    tags: ['conjunctiva', 'bulbar', 'palpebral', 'fornix', 'mucous membrane', 'surface'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-16 16-24 24-24s24 8 24 24-16 24-24 24-24-8-24-24z"/>
      <path d="M4 20c4-4 8-6 12-6"/>
      <path d="M48 14c4 0 8 2 12 6"/>
      <path d="M4 44c4 4 8 6 12 6"/>
      <path d="M48 50c4 0 8-2 12-6"/>
      <ellipse cx="32" cy="32" rx="12" ry="16" fill="currentColor" opacity="0.2"/>
      <path d="M4 20v24" stroke-width="2"/>
      <path d="M60 20v24" stroke-width="2"/>
      <text x="2" y="34" font-size="4" fill="currentColor" stroke="none">Fornix</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Bulbar</text>
    </svg>`
  },

  // ===========================================================================
  // ANTERIOR SEGMENT (10 icons)
  // ===========================================================================
  {
    id: 'ophth-anterior-chamber',
    name: 'Anterior Chamber',
    domain: 'medicine',
    category: 'anterior-segment',
    tags: ['anterior chamber', 'aqueous', 'depth', 'angle', 'AC', 'humor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-20 12-24 24-24s24 4 24 24"/>
      <path d="M8 32c0 12 12 16 24 16s24-4 24-16"/>
      <path d="M16 32c0-12 8-16 16-16s16 4 16 16" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="40" rx="12" ry="6"/>
      <circle cx="32" cy="40" r="4" fill="currentColor"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <text x="4" y="20" font-size="4" fill="currentColor" stroke="none">Cornea</text>
      <text x="26" y="30" font-size="4" fill="currentColor" stroke="none">AC</text>
      <text x="28" y="54" font-size="4" fill="currentColor" stroke="none">Lens</text>
    </svg>`
  },
  {
    id: 'ophth-trabecular-meshwork',
    name: 'Trabecular Meshwork',
    domain: 'medicine',
    category: 'anterior-segment',
    tags: ['trabecular meshwork', 'TM', 'outflow', 'drainage', 'angle', 'aqueous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 48l24-40 24 40"/>
      <path d="M16 36h32" stroke-dasharray="4 2"/>
      <path d="M12 42h40" stroke-dasharray="3 2"/>
      <path d="M8 48h48"/>
      <circle cx="20" cy="38" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="28" cy="34" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="36" cy="36" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="40" r="2" fill="currentColor" opacity="0.3"/>
      <path d="M8 48c4 4 8 6 12 6"/>
      <path d="M56 48c-4 4-8 6-12 6"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">SC</text>
      <text x="26" y="26" font-size="4" fill="currentColor" stroke="none">TM</text>
    </svg>`
  },
  {
    id: 'ophth-schlemm-canal',
    name: "Schlemm's Canal",
    domain: 'medicine',
    category: 'anterior-segment',
    tags: ["Schlemm's canal", 'outflow', 'collector', 'drainage', 'aqueous', 'episcleral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="20" stroke-dasharray="4 2"/>
      <path d="M12 32c0-2 2-4 4-4h32c2 0 4 2 4 4s-2 4-4 4H16c-2 0-4-2-4-4z" fill="currentColor" opacity="0.2"/>
      <path d="M12 32c0-2 2-4 4-4h32c2 0 4 2 4 4"/>
      <path d="M8 28l4 4-4 4"/>
      <path d="M56 28l-4 4 4 4"/>
      <path d="M16 40l-8 8"/>
      <path d="M48 40l8 8"/>
      <text x="22" y="34" font-size="4" fill="currentColor" stroke="none">SC</text>
      <text x="4" y="54" font-size="4" fill="currentColor" stroke="none">Collector</text>
    </svg>`
  },
  {
    id: 'ophth-ciliary-body',
    name: 'Ciliary Body',
    domain: 'medicine',
    category: 'anterior-segment',
    tags: ['ciliary body', 'muscle', 'processes', 'accommodation', 'aqueous production', 'uvea'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-16 8-24 24-24"/>
      <path d="M8 32c0 16 8 24 24 24"/>
      <path d="M16 20l8 4"/>
      <path d="M14 26l10 2"/>
      <path d="M12 32l12 0"/>
      <path d="M14 38l10-2"/>
      <path d="M16 44l8-4"/>
      <path d="M24 24l8 8-8 8"/>
      <ellipse cx="40" cy="32" rx="8" ry="16" stroke-dasharray="3 2"/>
      <path d="M32 16l-8 8" fill="currentColor" opacity="0.3"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">Processes</text>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">CB</text>
    </svg>`
  },
  {
    id: 'ophth-lens-capsule',
    name: 'Lens Capsule',
    domain: 'medicine',
    category: 'anterior-segment',
    tags: ['lens capsule', 'anterior', 'posterior', 'basement membrane', 'elastic', 'capsular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <ellipse cx="32" cy="32" rx="16" ry="20" stroke-dasharray="3 2"/>
      <ellipse cx="32" cy="32" rx="8" ry="10" fill="currentColor" opacity="0.2"/>
      <path d="M12 32h8"/>
      <path d="M44 32h8"/>
      <path d="M32 8v8"/>
      <path d="M32 48v8"/>
      <text x="4" y="20" font-size="4" fill="currentColor" stroke="none">Anterior</text>
      <text x="4" y="48" font-size="4" fill="currentColor" stroke="none">Posterior</text>
      <text x="24" y="34" font-size="4" fill="currentColor" stroke="none">Nucleus</text>
    </svg>`
  },
  {
    id: 'ophth-zonules',
    name: 'Zonular Fibers',
    domain: 'medicine',
    category: 'anterior-segment',
    tags: ['zonules', 'Zinn', 'suspensory', 'ligament', 'fibers', 'accommodation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="10" ry="14"/>
      <path d="M8 16l14 12"/>
      <path d="M8 24l14 6"/>
      <path d="M8 32l14 0"/>
      <path d="M8 40l14-6"/>
      <path d="M8 48l14-12"/>
      <path d="M56 16l-14 12"/>
      <path d="M56 24l-14 6"/>
      <path d="M56 32l-14 0"/>
      <path d="M56 40l-14-6"/>
      <path d="M56 48l-14-12"/>
      <circle cx="8" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="56" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <text x="26" y="58" font-size="4" fill="currentColor" stroke="none">Lens</text>
      <text x="2" y="12" font-size="4" fill="currentColor" stroke="none">CB</text>
    </svg>`
  },
  {
    id: 'ophth-aqueous-flow',
    name: 'Aqueous Humor Flow',
    domain: 'medicine',
    category: 'anterior-segment',
    tags: ['aqueous', 'flow', 'production', 'outflow', 'circulation', 'IOP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-16 12-20 24-20s24 4 24 20"/>
      <path d="M8 32c0 12 12 16 24 16s24-4 24-16"/>
      <ellipse cx="32" cy="40" rx="12" ry="6"/>
      <path d="M8 24c4 4 8 4 12 0" stroke="#4169E1" stroke-width="1.5"/>
      <path d="M12 28l4 4" stroke="#4169E1"/>
      <path d="M16 32c8-2 16-2 24 0" stroke="#4169E1" stroke-dasharray="3 2"/>
      <path d="M8 32l4-4" stroke="#228B22"/>
      <path d="M52 32l4-4" stroke="#228B22"/>
      <text x="4" y="20" font-size="3" fill="#4169E1" stroke="none">Production</text>
      <text x="44" y="28" font-size="3" fill="#228B22" stroke="none">Outflow</text>
    </svg>`
  },
  {
    id: 'ophth-angle-anatomy',
    name: 'Iridocorneal Angle',
    domain: 'medicine',
    category: 'anterior-segment',
    tags: ['angle', 'iridocorneal', 'gonioscopy', 'trabecular', 'drainage', 'open'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8l48 48"/>
      <path d="M8 8c0 16 8 32 24 40"/>
      <path d="M16 24l8-4"/>
      <path d="M20 32l8-2"/>
      <path d="M24 40l8 0"/>
      <circle cx="40" cy="40" r="3" fill="currentColor" opacity="0.3"/>
      <path d="M8 8v12"/>
      <text x="4" y="24" font-size="4" fill="currentColor" stroke="none">Cornea</text>
      <text x="34" y="36" font-size="4" fill="currentColor" stroke="none">SC</text>
      <text x="34" y="52" font-size="4" fill="currentColor" stroke="none">Iris</text>
      <text x="16" y="44" font-size="4" fill="currentColor" stroke="none">TM</text>
    </svg>`
  },
  {
    id: 'ophth-iris-anatomy',
    name: 'Iris Cross-Section',
    domain: 'medicine',
    category: 'anterior-segment',
    tags: ['iris', 'stroma', 'sphincter', 'dilator', 'pigment', 'epithelium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" rx="4"/>
      <rect x="12" y="24" width="40" height="16" rx="2" fill="currentColor" opacity="0.2"/>
      <path d="M8 36h48" stroke-dasharray="3 2"/>
      <circle cx="20" cy="32" r="3" fill="currentColor"/>
      <circle cx="44" cy="32" r="3" fill="currentColor"/>
      <path d="M26 28h12"/>
      <path d="M26 36h12"/>
      <text x="4" y="16" font-size="4" fill="currentColor" stroke="none">Stroma</text>
      <text x="4" y="52" font-size="4" fill="currentColor" stroke="none">Dilator</text>
      <text x="26" y="52" font-size="4" fill="currentColor" stroke="none">Sphincter</text>
    </svg>`
  },
  {
    id: 'ophth-limbus',
    name: 'Limbus',
    domain: 'medicine',
    category: 'anterior-segment',
    tags: ['limbus', 'corneoscleral', 'junction', 'stem cells', 'transition', 'palisades'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="18" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="18" stroke-width="3"/>
      <circle cx="32" cy="32" r="12"/>
      <path d="M14 32h8"/>
      <path d="M42 32h8"/>
      <path d="M32 14v8"/>
      <path d="M32 42v8"/>
      <text x="4" y="20" font-size="4" fill="currentColor" stroke="none">Sclera</text>
      <text x="22" y="32" font-size="4" fill="currentColor" stroke="none">Limbus</text>
      <text x="24" y="44" font-size="4" fill="currentColor" stroke="none">Cornea</text>
    </svg>`
  },

  // ===========================================================================
  // POSTERIOR SEGMENT (10 icons)
  // ===========================================================================
  {
    id: 'ophth-retinal-layers',
    name: 'Retinal Layers',
    domain: 'medicine',
    category: 'posterior-segment',
    tags: ['retina', 'layers', 'histology', 'NFL', 'GCL', 'INL', 'ONL', 'photoreceptors'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="2"/>
      <path d="M8 12h48"/>
      <path d="M8 20h48"/>
      <path d="M8 28h48"/>
      <path d="M8 36h48"/>
      <path d="M8 44h48"/>
      <path d="M8 52h48"/>
      <text x="12" y="10" font-size="3" fill="currentColor" stroke="none">ILM</text>
      <text x="12" y="18" font-size="3" fill="currentColor" stroke="none">NFL</text>
      <text x="12" y="26" font-size="3" fill="currentColor" stroke="none">GCL</text>
      <text x="12" y="34" font-size="3" fill="currentColor" stroke="none">INL</text>
      <text x="12" y="42" font-size="3" fill="currentColor" stroke="none">ONL</text>
      <text x="12" y="50" font-size="3" fill="currentColor" stroke="none">PR</text>
      <text x="12" y="58" font-size="3" fill="currentColor" stroke="none">RPE</text>
    </svg>`
  },
  {
    id: 'ophth-photoreceptors-rods',
    name: 'Rod Photoreceptors',
    domain: 'medicine',
    category: 'posterior-segment',
    tags: ['rods', 'photoreceptors', 'scotopic', 'night vision', 'rhodopsin', 'peripheral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="8" width="8" height="24" rx="4" fill="currentColor" opacity="0.3"/>
      <rect x="28" y="8" width="8" height="24" rx="4" fill="currentColor" opacity="0.3"/>
      <rect x="42" y="8" width="8" height="24" rx="4" fill="currentColor" opacity="0.3"/>
      <path d="M18 32v8"/>
      <path d="M32 32v8"/>
      <path d="M46 32v8"/>
      <circle cx="18" cy="44" r="4"/>
      <circle cx="32" cy="44" r="4"/>
      <circle cx="46" cy="44" r="4"/>
      <path d="M18 48v8"/>
      <path d="M32 48v8"/>
      <path d="M46 48v8"/>
      <text x="4" y="20" font-size="4" fill="currentColor" stroke="none">OS</text>
      <text x="4" y="44" font-size="4" fill="currentColor" stroke="none">IS</text>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Synaptic</text>
    </svg>`
  },
  {
    id: 'ophth-photoreceptors-cones',
    name: 'Cone Photoreceptors',
    domain: 'medicine',
    category: 'posterior-segment',
    tags: ['cones', 'photoreceptors', 'photopic', 'color vision', 'fovea', 'central'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 8l4 20h-8z" fill="#DC143C" opacity="0.4"/>
      <path d="M28 8l4 20h-8z" fill="#228B22" opacity="0.4"/>
      <path d="M42 8l4 20h-8z" fill="#4169E1" opacity="0.4"/>
      <path d="M18 28v8"/>
      <path d="M32 28v8"/>
      <path d="M46 28v8"/>
      <ellipse cx="18" cy="42" rx="4" ry="6"/>
      <ellipse cx="32" cy="42" rx="4" ry="6"/>
      <ellipse cx="46" cy="42" rx="4" ry="6"/>
      <path d="M18 48v8"/>
      <path d="M32 48v8"/>
      <path d="M46 48v8"/>
      <text x="12" y="62" font-size="4" fill="#DC143C" stroke="none">L</text>
      <text x="28" y="62" font-size="4" fill="#228B22" stroke="none">M</text>
      <text x="44" y="62" font-size="4" fill="#4169E1" stroke="none">S</text>
    </svg>`
  },
  {
    id: 'ophth-rpe',
    name: 'Retinal Pigment Epithelium',
    domain: 'medicine',
    category: 'posterior-segment',
    tags: ['RPE', 'pigment epithelium', 'melanin', 'phagocytosis', 'blood-retina barrier'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="16" fill="currentColor" opacity="0.4"/>
      <rect x="8" y="24" width="48" height="16"/>
      <path d="M8 16h48"/>
      <path d="M12 16v8"/>
      <path d="M20 16v8"/>
      <path d="M28 16v8"/>
      <path d="M36 16v8"/>
      <path d="M44 16v8"/>
      <path d="M52 16v8"/>
      <path d="M8 40c16 4 32 4 48 0"/>
      <circle cx="16" cy="32" r="2" fill="currentColor"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <circle cx="48" cy="32" r="2" fill="currentColor"/>
      <text x="4" y="12" font-size="4" fill="currentColor" stroke="none">PR</text>
      <text x="4" y="52" font-size="4" fill="currentColor" stroke="none">Bruch's</text>
      <text x="24" y="34" font-size="4" fill="currentColor" stroke="none">RPE</text>
    </svg>`
  },
  {
    id: 'ophth-optic-disc',
    name: 'Optic Disc',
    domain: 'medicine',
    category: 'posterior-segment',
    tags: ['optic disc', 'optic nerve head', 'cup', 'rim', 'CDR', 'neuroretinal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#FFA500" opacity="0.3"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="8"/>
      <path d="M12 32c4-2 8-4 12-4"/>
      <path d="M40 28c4 0 8 2 12 4"/>
      <path d="M20 20l4 4"/>
      <path d="M40 20l-4 4"/>
      <text x="28" y="34" font-size="4" fill="currentColor" stroke="none">Cup</text>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Neuroretinal Rim</text>
    </svg>`
  },
  {
    id: 'ophth-fovea',
    name: 'Fovea',
    domain: 'medicine',
    category: 'posterior-segment',
    tags: ['fovea', 'foveal pit', 'foveola', 'central vision', 'cones', 'avascular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24c8 16 40 16 48 0"/>
      <path d="M8 40c8-16 40-16 48 0"/>
      <path d="M24 32c0-8 16-8 16 0s-16 8-16 0z" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <path d="M8 32h12"/>
      <path d="M44 32h12"/>
      <path d="M32 16v8"/>
      <path d="M32 40v8"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">INL</text>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Cones</text>
      <text x="24" y="58" font-size="4" fill="currentColor" stroke="none">FAZ</text>
    </svg>`
  },
  {
    id: 'ophth-retinal-vessels',
    name: 'Retinal Vessels',
    domain: 'medicine',
    category: 'posterior-segment',
    tags: ['retinal vessels', 'arteries', 'veins', 'vascular', 'arcade', 'circulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="32" r="8" fill="#FFA500" opacity="0.3"/>
      <circle cx="16" cy="32" r="8"/>
      <path d="M24 28c16-8 32-8 32 4" stroke="#DC143C" stroke-width="2"/>
      <path d="M24 36c16 8 32 8 32-4" stroke="#DC143C" stroke-width="2"/>
      <path d="M24 30c12-6 24-6 28 2" stroke="#4169E1" stroke-width="1.5"/>
      <path d="M24 34c12 6 24 6 28-2" stroke="#4169E1" stroke-width="1.5"/>
      <circle cx="48" cy="32" r="4" fill="currentColor" opacity="0.2"/>
      <text x="4" y="20" font-size="4" fill="currentColor" stroke="none">Disc</text>
      <text x="44" y="24" font-size="4" fill="currentColor" stroke="none">Macula</text>
    </svg>`
  },
  {
    id: 'ophth-ora-serrata',
    name: 'Ora Serrata',
    domain: 'medicine',
    category: 'posterior-segment',
    tags: ['ora serrata', 'peripheral', 'retina edge', 'pars plana', 'dentate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-16 8-24 24-24s24 8 24 24"/>
      <path d="M8 32c0 16 8 24 24 24s24-8 24-24"/>
      <path d="M12 24l4 4-4 4 4 4-4 4 4 4-4 4" fill="currentColor" opacity="0.2"/>
      <path d="M52 24l-4 4 4 4-4 4 4 4-4 4 4 4" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="12" stroke-dasharray="4 2"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Ora</text>
      <text x="22" y="34" font-size="4" fill="currentColor" stroke="none">Posterior</text>
    </svg>`
  },
  {
    id: 'ophth-vitreoretinal-interface',
    name: 'Vitreoretinal Interface',
    domain: 'medicine',
    category: 'posterior-segment',
    tags: ['vitreoretinal', 'interface', 'ILM', 'PVD', 'attachment', 'traction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 40c16-4 32-4 48 0"/>
      <path d="M8 44c16-4 32-4 48 0" stroke-width="2"/>
      <path d="M8 32c16 4 32 4 48 0" stroke-dasharray="4 2"/>
      <path d="M16 36v-8"/>
      <path d="M32 34v-10"/>
      <path d="M48 36v-8"/>
      <circle cx="16" cy="24" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="20" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="48" cy="24" r="2" fill="currentColor" opacity="0.3"/>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Retina</text>
      <text x="4" y="16" font-size="4" fill="currentColor" stroke="none">Vitreous</text>
    </svg>`
  },
  {
    id: 'ophth-bruchs-membrane',
    name: "Bruch's Membrane",
    domain: 'medicine',
    category: 'posterior-segment',
    tags: ["Bruch's membrane", 'basement membrane', 'drusen', 'AMD', 'barrier'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24c16 4 32 4 48 0"/>
      <path d="M8 32c16 4 32 4 48 0" stroke-width="2"/>
      <path d="M8 40c16 4 32 4 48 0"/>
      <circle cx="20" cy="32" r="3" fill="#FFD700" opacity="0.5"/>
      <circle cx="36" cy="32" r="2" fill="#FFD700" opacity="0.5"/>
      <circle cx="48" cy="32" r="4" fill="#FFD700" opacity="0.5"/>
      <text x="4" y="20" font-size="4" fill="currentColor" stroke="none">RPE</text>
      <text x="4" y="36" font-size="4" fill="currentColor" stroke="none">Bruch's</text>
      <text x="4" y="52" font-size="4" fill="currentColor" stroke="none">Choroid</text>
    </svg>`
  },

  // ===========================================================================
  // PATHOLOGY - ANTERIOR (10 icons)
  // ===========================================================================
  {
    id: 'ophth-cataract-nuclear',
    name: 'Nuclear Cataract',
    domain: 'medicine',
    category: 'pathology-anterior',
    tags: ['cataract', 'nuclear', 'sclerosis', 'lens opacity', 'brunescent', 'age-related'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <ellipse cx="32" cy="32" rx="14" ry="18" stroke-dasharray="3 2"/>
      <ellipse cx="32" cy="32" rx="8" ry="10" fill="#8B4513" opacity="0.6"/>
      <circle cx="32" cy="32" r="4" fill="#654321"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">Cortex</text>
      <text x="24" y="58" font-size="4" fill="currentColor" stroke="none">Nuclear</text>
      <text x="24" y="34" font-size="4" fill="currentColor" stroke="none">NS</text>
    </svg>`
  },
  {
    id: 'ophth-cataract-cortical',
    name: 'Cortical Cataract',
    domain: 'medicine',
    category: 'pathology-anterior',
    tags: ['cataract', 'cortical', 'spokes', 'wedge', 'opacity', 'peripheral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.1"/>
      <path d="M32 10l-4 14h8z" fill="white" opacity="0.7"/>
      <path d="M32 54l4-14h-8z" fill="white" opacity="0.7"/>
      <path d="M10 32l14 4v-8z" fill="white" opacity="0.7"/>
      <path d="M54 32l-14-4v8z" fill="white" opacity="0.7"/>
      <path d="M16 16l10 8-4 4z" fill="white" opacity="0.5"/>
      <path d="M48 48l-10-8 4-4z" fill="white" opacity="0.5"/>
      <text x="22" y="58" font-size="4" fill="currentColor" stroke="none">Cortical</text>
    </svg>`
  },
  {
    id: 'ophth-cataract-psc',
    name: 'Posterior Subcapsular Cataract',
    domain: 'medicine',
    category: 'pathology-anterior',
    tags: ['cataract', 'PSC', 'posterior subcapsular', 'steroid', 'glare', 'central'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <ellipse cx="32" cy="32" rx="16" ry="20" stroke-dasharray="3 2"/>
      <ellipse cx="32" cy="40" rx="12" ry="6" fill="white" opacity="0.7"/>
      <ellipse cx="32" cy="40" rx="12" ry="6"/>
      <path d="M20 40c4-2 8-2 12 0s8 2 12 0" stroke-dasharray="2 1"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">Anterior</text>
      <text x="24" y="58" font-size="4" fill="currentColor" stroke="none">PSC</text>
    </svg>`
  },
  {
    id: 'ophth-glaucoma-open',
    name: 'Open Angle Glaucoma',
    domain: 'medicine',
    category: 'pathology-anterior',
    tags: ['glaucoma', 'open angle', 'POAG', 'IOP', 'optic nerve', 'cupping'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 48l24-40 24 40"/>
      <path d="M8 48h48"/>
      <path d="M16 36h32" stroke-dasharray="3 2"/>
      <circle cx="32" cy="36" r="6" fill="#DC143C" opacity="0.3"/>
      <path d="M16 36l4 4"/>
      <path d="M48 36l-4 4"/>
      <path d="M32 8v8" stroke="#4169E1" stroke-dasharray="2 1"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Open Angle</text>
      <text x="32" y="58" font-size="4" fill="#DC143C" stroke="none">Blocked TM</text>
    </svg>`
  },
  {
    id: 'ophth-glaucoma-closed',
    name: 'Angle Closure Glaucoma',
    domain: 'medicine',
    category: 'pathology-anterior',
    tags: ['glaucoma', 'closed angle', 'acute', 'pupillary block', 'narrow angle', 'ACG'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 40l24-32 24 32"/>
      <path d="M8 40c8 8 40 8 48 0" fill="currentColor" opacity="0.3"/>
      <path d="M8 40h48"/>
      <path d="M24 24l8-8 8 8"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <path d="M12 40l4-8"/>
      <path d="M52 40l-4-8"/>
      <text x="4" y="56" font-size="4" fill="#DC143C" stroke="none">Closed Angle</text>
      <text x="24" y="20" font-size="4" fill="currentColor" stroke="none">Block</text>
    </svg>`
  },
  {
    id: 'ophth-corneal-ulcer',
    name: 'Corneal Ulcer',
    domain: 'medicine',
    category: 'pathology-anterior',
    tags: ['corneal ulcer', 'keratitis', 'infection', 'bacterial', 'infiltrate', 'hypopyon'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="24" ry="20"/>
      <ellipse cx="28" cy="24" rx="8" ry="6" fill="white" opacity="0.8"/>
      <ellipse cx="28" cy="24" rx="8" ry="6"/>
      <circle cx="28" cy="24" r="4" fill="#FFD700" opacity="0.6"/>
      <path d="M8 48c16-4 32-4 48 0" fill="white" opacity="0.6"/>
      <path d="M8 48c16-4 32-4 48 0"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">Infiltrate</text>
      <text x="22" y="58" font-size="4" fill="currentColor" stroke="none">Hypopyon</text>
    </svg>`
  },
  {
    id: 'ophth-uveitis',
    name: 'Anterior Uveitis',
    domain: 'medicine',
    category: 'pathology-anterior',
    tags: ['uveitis', 'iritis', 'anterior', 'inflammation', 'cells', 'flare', 'KPs'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="32" r="4"/>
      <circle cx="20" cy="28" r="1" fill="currentColor"/>
      <circle cx="24" cy="32" r="1" fill="currentColor"/>
      <circle cx="22" cy="36" r="1" fill="currentColor"/>
      <circle cx="40" cy="26" r="1" fill="currentColor"/>
      <circle cx="44" cy="32" r="1" fill="currentColor"/>
      <circle cx="42" cy="38" r="1" fill="currentColor"/>
      <path d="M16 44l4-4"/>
      <path d="M20 48l4-4"/>
      <path d="M24 44l4-4"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">Cells</text>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">KPs</text>
    </svg>`
  },
  {
    id: 'ophth-pterygium',
    name: 'Pterygium',
    domain: 'medicine',
    category: 'pathology-anterior',
    tags: ['pterygium', 'pinguecula', 'growth', 'nasal', 'conjunctival', 'UV damage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="18"/>
      <circle cx="32" cy="32" r="10"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <path d="M4 32l18 0c4 0 6-4 6-8" fill="currentColor" opacity="0.3"/>
      <path d="M4 32l18 0c4 0 6-4 6-8"/>
      <path d="M4 32c4-2 8-4 12-4"/>
      <path d="M4 32c4 2 8 4 12 4"/>
      <text x="4" y="20" font-size="4" fill="currentColor" stroke="none">Head</text>
      <text x="4" y="48" font-size="4" fill="currentColor" stroke="none">Body</text>
    </svg>`
  },
  {
    id: 'ophth-dry-eye',
    name: 'Dry Eye Disease',
    domain: 'medicine',
    category: 'pathology-anterior',
    tags: ['dry eye', 'DED', 'keratoconjunctivitis sicca', 'tear film', 'meibomian', 'MGD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16"/>
      <path d="M8 28c16 4 32 4 48 0" stroke-dasharray="4 4"/>
      <path d="M12 32c8 2 16 2 20 0"/>
      <path d="M36 32c8 2 12 2 16 0"/>
      <circle cx="20" cy="36" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="38" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="44" cy="36" r="2" fill="currentColor" opacity="0.5"/>
      <path d="M32 8l-4 12 4-4 4 4z" fill="#4169E1" opacity="0.3"/>
      <path d="M32 8l-4 12 4-4 4 4z"/>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Unstable Tear Film</text>
    </svg>`
  },
  {
    id: 'ophth-keratoconus',
    name: 'Keratoconus',
    domain: 'medicine',
    category: 'pathology-anterior',
    tags: ['keratoconus', 'ectasia', 'cone', 'thinning', 'irregular astigmatism', 'corneal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-12 8-20 24-20"/>
      <path d="M8 32c0 12 8 20 24 20"/>
      <path d="M32 12c8 0 16 4 20 12"/>
      <path d="M32 52c8 0 16-4 20-12"/>
      <path d="M52 24l8-8"/>
      <path d="M52 40l8 8"/>
      <ellipse cx="48" cy="32" rx="4" ry="8" fill="currentColor" opacity="0.2"/>
      <path d="M56 32h4"/>
      <text x="4" y="20" font-size="4" fill="currentColor" stroke="none">Normal</text>
      <text x="48" y="58" font-size="4" fill="currentColor" stroke="none">Cone</text>
    </svg>`
  },

  // ===========================================================================
  // PATHOLOGY - POSTERIOR (12 icons)
  // ===========================================================================
  {
    id: 'ophth-dr-mild-npdr',
    name: 'Mild NPDR',
    domain: 'medicine',
    category: 'pathology-posterior',
    tags: ['diabetic retinopathy', 'NPDR', 'mild', 'microaneurysms', 'diabetes', 'screening'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="16" cy="32" r="6" fill="#FFA500" opacity="0.3"/>
      <circle cx="48" cy="32" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="24" cy="24" r="1.5" fill="#DC143C"/>
      <circle cx="20" cy="28" r="1" fill="#DC143C"/>
      <circle cx="28" cy="20" r="1" fill="#DC143C"/>
      <circle cx="22" cy="36" r="1" fill="#DC143C"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">Disc</text>
      <text x="42" y="28" font-size="4" fill="currentColor" stroke="none">Macula</text>
      <text x="4" y="58" font-size="4" fill="#DC143C" stroke="none">Microaneurysms</text>
    </svg>`
  },
  {
    id: 'ophth-dr-moderate-npdr',
    name: 'Moderate NPDR',
    domain: 'medicine',
    category: 'pathology-posterior',
    tags: ['diabetic retinopathy', 'NPDR', 'moderate', 'hemorrhages', 'exudates', 'cotton wool'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="16" cy="32" r="6" fill="#FFA500" opacity="0.3"/>
      <circle cx="48" cy="32" r="3"/>
      <ellipse cx="24" cy="24" rx="4" ry="3" fill="#DC143C" opacity="0.6"/>
      <ellipse cx="36" cy="40" rx="3" ry="2" fill="#DC143C" opacity="0.6"/>
      <circle cx="40" cy="20" r="2" fill="white" opacity="0.8"/>
      <circle cx="28" cy="44" r="1.5" fill="#FFD700"/>
      <circle cx="36" cy="28" r="1" fill="#FFD700"/>
      <circle cx="20" cy="40" r="1" fill="#DC143C"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Hemorrhages + Exudates</text>
    </svg>`
  },
  {
    id: 'ophth-dr-severe-npdr',
    name: 'Severe NPDR',
    domain: 'medicine',
    category: 'pathology-posterior',
    tags: ['diabetic retinopathy', 'NPDR', 'severe', '4-2-1 rule', 'IRMA', 'venous beading'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="16" cy="32" r="6" fill="#FFA500" opacity="0.3"/>
      <path d="M22 32c8-4 16-4 24 0" stroke="#4169E1" stroke-width="2"/>
      <path d="M24 28c2 0 2-2 4-2s2 2 4 2 2-2 4-2" stroke="#4169E1"/>
      <ellipse cx="28" cy="20" rx="6" ry="4" fill="#DC143C" opacity="0.5"/>
      <ellipse cx="40" cy="44" rx="5" ry="3" fill="#DC143C" opacity="0.5"/>
      <ellipse cx="20" cy="44" rx="4" ry="3" fill="#DC143C" opacity="0.5"/>
      <ellipse cx="44" cy="24" rx="4" ry="3" fill="#DC143C" opacity="0.5"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">4-2-1 Rule</text>
    </svg>`
  },
  {
    id: 'ophth-dr-pdr',
    name: 'Proliferative DR',
    domain: 'medicine',
    category: 'pathology-posterior',
    tags: ['diabetic retinopathy', 'PDR', 'proliferative', 'NVD', 'NVE', 'neovascularization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="16" cy="32" r="6" fill="#FFA500" opacity="0.3"/>
      <path d="M16 26c-4-8 0-12 4-12s4 4 8 8" stroke="#DC143C" stroke-width="1.5"/>
      <path d="M22 32c-2-4 2-8 6-6s4 6 8 4" stroke="#DC143C" stroke-width="1.5"/>
      <path d="M36 24c4-4 8-2 8 2s-2 6 2 8" stroke="#DC143C" stroke-width="1.5"/>
      <ellipse cx="28" cy="44" rx="4" ry="2" fill="#8B0000"/>
      <text x="4" y="14" font-size="4" fill="#DC143C" stroke="none">NVD</text>
      <text x="44" y="20" font-size="4" fill="#DC143C" stroke="none">NVE</text>
      <text x="22" y="58" font-size="4" fill="currentColor" stroke="none">VH</text>
    </svg>`
  },
  {
    id: 'ophth-amd-dry',
    name: 'Dry AMD',
    domain: 'medicine',
    category: 'pathology-posterior',
    tags: ['AMD', 'dry', 'drusen', 'geographic atrophy', 'macular degeneration', 'RPE'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="12" fill="#FFD700" opacity="0.2"/>
      <circle cx="28" cy="28" r="3" fill="#FFD700"/>
      <circle cx="36" cy="30" r="2" fill="#FFD700"/>
      <circle cx="32" cy="36" r="2.5" fill="#FFD700"/>
      <circle cx="24" cy="34" r="2" fill="#FFD700"/>
      <circle cx="40" cy="34" r="1.5" fill="#FFD700"/>
      <circle cx="30" cy="24" r="1.5" fill="#FFD700"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">Drusen</text>
      <text x="22" y="58" font-size="4" fill="currentColor" stroke="none">Dry AMD</text>
    </svg>`
  },
  {
    id: 'ophth-amd-wet',
    name: 'Wet AMD',
    domain: 'medicine',
    category: 'pathology-posterior',
    tags: ['AMD', 'wet', 'CNV', 'exudative', 'choroidal neovascularization', 'anti-VEGF'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="12"/>
      <ellipse cx="32" cy="36" rx="8" ry="6" fill="#8B0000" opacity="0.5"/>
      <path d="M24 32c4-4 8-4 12 0s4 8 0 10-8-2-12-4" stroke="#DC143C" stroke-width="1.5"/>
      <path d="M28 28l4 8"/>
      <path d="M36 28l-4 8"/>
      <circle cx="28" cy="44" r="2" fill="#FFD700"/>
      <circle cx="36" cy="44" r="1.5" fill="#FFD700"/>
      <text x="4" y="14" font-size="4" fill="#DC143C" stroke="none">CNV</text>
      <text x="22" y="58" font-size="4" fill="currentColor" stroke="none">Wet AMD</text>
    </svg>`
  },
  {
    id: 'ophth-retinal-detachment',
    name: 'Retinal Detachment',
    domain: 'medicine',
    category: 'pathology-posterior',
    tags: ['retinal detachment', 'RD', 'rhegmatogenous', 'tear', 'PVD', 'macula off'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-16 10-24 24-24s24 8 24 24"/>
      <path d="M8 32c0 16 10 24 24 24s24-8 24-24"/>
      <path d="M8 24c12 4 24 8 36 4"/>
      <path d="M16 32c8 12 24 16 32 8" fill="currentColor" opacity="0.2"/>
      <path d="M16 32c8 12 24 16 32 8"/>
      <path d="M20 24l4 8 4-4"/>
      <circle cx="24" cy="24" r="2" fill="#DC143C"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">Attached</text>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Detached</text>
      <text x="18" y="20" font-size="4" fill="#DC143C" stroke="none">Tear</text>
    </svg>`
  },
  {
    id: 'ophth-macular-hole',
    name: 'Macular Hole',
    domain: 'medicine',
    category: 'pathology-posterior',
    tags: ['macular hole', 'full thickness', 'VMT', 'ILM', 'stage', 'idiopathic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28c16 8 32 8 48 0"/>
      <path d="M8 36c16-8 32-8 48 0"/>
      <circle cx="32" cy="32" r="6" fill="currentColor"/>
      <path d="M26 32c0-4 4-8 6-8"/>
      <path d="M38 32c0-4-4-8-6-8"/>
      <path d="M26 32c0 4 4 8 6 8"/>
      <path d="M38 32c0 4-4 8-6 8"/>
      <path d="M8 20c16 4 32 4 48 0" stroke-dasharray="3 2"/>
      <text x="4" y="16" font-size="4" fill="currentColor" stroke="none">ILM</text>
      <text x="22" y="58" font-size="4" fill="currentColor" stroke="none">Full Thickness</text>
    </svg>`
  },
  {
    id: 'ophth-crvo',
    name: 'Central Retinal Vein Occlusion',
    domain: 'medicine',
    category: 'pathology-posterior',
    tags: ['CRVO', 'vein occlusion', 'hemorrhage', 'cotton wool', 'macular edema', 'ischemic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="16" cy="32" r="6" fill="#FFA500" opacity="0.3"/>
      <path d="M22 28c8-4 16-4 24 0" stroke="#4169E1" stroke-width="3"/>
      <path d="M22 36c8 4 16 4 24 0" stroke="#4169E1" stroke-width="3"/>
      <ellipse cx="28" cy="20" rx="4" ry="2" fill="#DC143C"/>
      <ellipse cx="40" cy="24" rx="3" ry="2" fill="#DC143C"/>
      <ellipse cx="24" cy="44" rx="4" ry="2" fill="#DC143C"/>
      <ellipse cx="40" cy="40" rx="3" ry="2" fill="#DC143C"/>
      <circle cx="36" cy="16" r="2" fill="white"/>
      <circle cx="48" cy="36" r="1.5" fill="white"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Blood + Thunder</text>
    </svg>`
  },
  {
    id: 'ophth-brvo',
    name: 'Branch Retinal Vein Occlusion',
    domain: 'medicine',
    category: 'pathology-posterior',
    tags: ['BRVO', 'branch vein occlusion', 'sectoral', 'hemorrhage', 'macular edema'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="16" cy="32" r="6" fill="#FFA500" opacity="0.3"/>
      <path d="M22 28c12-4 20-4 28 0" stroke="#4169E1" stroke-width="1.5"/>
      <path d="M22 36c12 4 20 4 28 0" stroke="#4169E1" stroke-width="1.5"/>
      <path d="M22 28c8 4 12 8 16 4" stroke="#4169E1" stroke-width="3" fill="#DC143C" opacity="0.3"/>
      <ellipse cx="32" cy="24" rx="4" ry="2" fill="#DC143C"/>
      <ellipse cx="40" cy="28" rx="3" ry="2" fill="#DC143C"/>
      <ellipse cx="36" cy="20" rx="2" ry="1.5" fill="#DC143C"/>
      <text x="24" y="58" font-size="4" fill="currentColor" stroke="none">Sectoral</text>
    </svg>`
  },
  {
    id: 'ophth-papilledema',
    name: 'Papilledema',
    domain: 'medicine',
    category: 'pathology-posterior',
    tags: ['papilledema', 'disc edema', 'ICP', 'swelling', 'bilateral', 'Frisen'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="18" ry="16" fill="#FFA500" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="18" ry="16"/>
      <ellipse cx="32" cy="32" rx="14" ry="12" stroke-dasharray="3 2"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M14 32c4-2 6-4 8-4"/>
      <path d="M50 32c-4-2-6-4-8-4"/>
      <path d="M14 36c4 2 8 4 10 2"/>
      <path d="M50 36c-4 2-8 4-10 2"/>
      <text x="22" y="58" font-size="4" fill="currentColor" stroke="none">Swollen Disc</text>
    </svg>`
  },
  {
    id: 'ophth-csr',
    name: 'Central Serous Retinopathy',
    domain: 'medicine',
    category: 'pathology-posterior',
    tags: ['CSR', 'CSCR', 'central serous', 'PED', 'serous detachment', 'RPE leak'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <path d="M16 36c8-4 24-4 32 0"/>
      <path d="M20 28c8 8 16 8 24 0" fill="#4169E1" opacity="0.2"/>
      <path d="M20 28c8 8 16 8 24 0"/>
      <circle cx="32" cy="44" r="3" fill="#FFD700"/>
      <path d="M32 44l0-8" stroke="#4169E1" stroke-dasharray="2 1"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">SRF</text>
      <text x="26" y="58" font-size="4" fill="currentColor" stroke="none">PED</text>
    </svg>`
  },

  // ===========================================================================
  // EQUIPMENT (10 icons)
  // ===========================================================================
  {
    id: 'ophth-slit-lamp',
    name: 'Slit Lamp',
    domain: 'medicine',
    category: 'equipment',
    tags: ['slit lamp', 'biomicroscope', 'examination', 'anterior segment', 'illumination'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="40" width="40" height="16" rx="2"/>
      <rect x="20" y="8" width="24" height="32" rx="2"/>
      <circle cx="32" cy="24" r="8"/>
      <circle cx="32" cy="24" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M12 48h-4v8h4"/>
      <path d="M52 48h4v8h-4"/>
      <path d="M28 40v-8"/>
      <path d="M36 40v-8"/>
      <rect x="24" y="4" width="16" height="4"/>
      <text x="22" y="62" font-size="4" fill="currentColor" stroke="none">Slit Lamp</text>
    </svg>`
  },
  {
    id: 'ophth-ophthalmoscope',
    name: 'Direct Ophthalmoscope',
    domain: 'medicine',
    category: 'equipment',
    tags: ['ophthalmoscope', 'direct', 'fundoscopy', 'red reflex', 'examination'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="4" width="16" height="48" rx="4"/>
      <circle cx="32" cy="12" r="6"/>
      <circle cx="32" cy="12" r="3" fill="currentColor" opacity="0.3"/>
      <path d="M28 20h8"/>
      <path d="M28 26h8"/>
      <path d="M28 32h8"/>
      <rect x="26" y="40" width="12" height="8" rx="1"/>
      <path d="M32 52v8"/>
      <circle cx="32" cy="60" r="2"/>
      <text x="44" y="14" font-size="4" fill="currentColor" stroke="none">Light</text>
    </svg>`
  },
  {
    id: 'ophth-tonometer',
    name: 'Tonometer',
    domain: 'medicine',
    category: 'equipment',
    tags: ['tonometer', 'IOP', 'applanation', 'Goldmann', 'pressure', 'glaucoma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="40" rx="4"/>
      <circle cx="32" cy="52" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="52" r="6"/>
      <path d="M32 46v-30"/>
      <path d="M26 20h12"/>
      <path d="M28 28h8"/>
      <circle cx="32" cy="16" r="3"/>
      <text x="4" y="54" font-size="4" fill="currentColor" stroke="none">IOP</text>
      <text x="48" y="20" font-size="4" fill="currentColor" stroke="none">mmHg</text>
    </svg>`
  },
  {
    id: 'ophth-oct',
    name: 'OCT Machine',
    domain: 'medicine',
    category: 'equipment',
    tags: ['OCT', 'optical coherence tomography', 'imaging', 'retina', 'macula', 'RNFL'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="36" rx="4"/>
      <rect x="12" y="12" width="40" height="28" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M16 32c4-8 8-8 12 0s8 8 12 0 8-8 12 0"/>
      <rect x="20" y="48" width="24" height="12" rx="2"/>
      <path d="M32 44v4"/>
      <circle cx="28" cy="54" r="2"/>
      <circle cx="36" cy="54" r="2"/>
      <text x="26" y="24" font-size="5" fill="currentColor" stroke="none">OCT</text>
    </svg>`
  },
  {
    id: 'ophth-visual-field',
    name: 'Visual Field Analyzer',
    domain: 'medicine',
    category: 'equipment',
    tags: ['visual field', 'perimetry', 'Humphrey', 'glaucoma', 'VF', 'scotoma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-20 16-28 24-28s24 8 24 28-16 28-24 28-24-8-24-28z"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <circle cx="20" cy="24" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="24" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="20" cy="40" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="40" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="16" cy="32" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="48" cy="32" r="2" fill="currentColor" opacity="0.3"/>
      <path d="M32 8v8"/>
      <path d="M32 48v8"/>
      <text x="18" y="62" font-size="4" fill="currentColor" stroke="none">Visual Field</text>
    </svg>`
  },
  {
    id: 'ophth-fundus-camera',
    name: 'Fundus Camera',
    domain: 'medicine',
    category: 'equipment',
    tags: ['fundus camera', 'photography', 'retinal imaging', 'documentation', 'screening'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="4"/>
      <rect x="44" y="20" width="8" height="6" rx="1"/>
      <path d="M24 52v8h16v-8"/>
      <circle cx="28" cy="28" r="2" fill="white" opacity="0.5"/>
      <text x="18" y="14" font-size="4" fill="currentColor" stroke="none">Fundus Camera</text>
    </svg>`
  },
  {
    id: 'ophth-iol',
    name: 'Intraocular Lens',
    domain: 'medicine',
    category: 'equipment',
    tags: ['IOL', 'intraocular lens', 'implant', 'cataract', 'pseudophakia', 'artificial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="12" ry="16" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="12" ry="16"/>
      <path d="M20 32c-8-4-12 0-12 4"/>
      <path d="M44 32c8-4 12 0 12 4"/>
      <path d="M20 32c-8 4-12 0-12-4"/>
      <path d="M44 32c8 4 12 0 12-4"/>
      <ellipse cx="32" cy="32" rx="6" ry="10" stroke-dasharray="3 2"/>
      <text x="26" y="34" font-size="4" fill="currentColor" stroke="none">Optic</text>
      <text x="4" y="26" font-size="3" fill="currentColor" stroke="none">Haptic</text>
    </svg>`
  },
  {
    id: 'ophth-glasses',
    name: 'Spectacles',
    domain: 'medicine',
    category: 'equipment',
    tags: ['glasses', 'spectacles', 'refraction', 'correction', 'myopia', 'hyperopia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="18" cy="32" r="12"/>
      <circle cx="46" cy="32" r="12"/>
      <path d="M30 32h4"/>
      <path d="M6 32h0"/>
      <path d="M58 32h0"/>
      <path d="M6 28l-2-12"/>
      <path d="M58 28l2-12"/>
      <circle cx="18" cy="32" r="8" fill="currentColor" opacity="0.1"/>
      <circle cx="46" cy="32" r="8" fill="currentColor" opacity="0.1"/>
      <text x="12" y="54" font-size="4" fill="currentColor" stroke="none">OD</text>
      <text x="42" y="54" font-size="4" fill="currentColor" stroke="none">OS</text>
    </svg>`
  },
  {
    id: 'ophth-contact-lens',
    name: 'Contact Lens',
    domain: 'medicine',
    category: 'equipment',
    tags: ['contact lens', 'soft', 'RGP', 'correction', 'fitting', 'keratometry'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="8" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="8"/>
      <path d="M8 32c0-4 8-12 24-12s24 8 24 12"/>
      <ellipse cx="32" cy="28" rx="16" ry="4" stroke-dasharray="3 2"/>
      <path d="M16 32c0-2 6-6 16-6s16 4 16 6"/>
      <text x="20" y="50" font-size="4" fill="currentColor" stroke="none">Base Curve</text>
      <text x="22" y="58" font-size="4" fill="currentColor" stroke="none">Diameter</text>
    </svg>`
  },
  {
    id: 'ophth-phoropter',
    name: 'Phoropter',
    domain: 'medicine',
    category: 'equipment',
    tags: ['phoropter', 'refraction', 'refractor', 'manifest', 'lenses', 'prescription'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="32" r="10"/>
      <circle cx="48" cy="32" r="10"/>
      <path d="M26 32h12"/>
      <path d="M32 24v-16"/>
      <circle cx="32" cy="8" r="4"/>
      <circle cx="16" cy="32" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="48" cy="32" r="6" fill="currentColor" opacity="0.2"/>
      <path d="M6 32h0"/>
      <path d="M58 32h0"/>
      <path d="M16 22v-4"/>
      <path d="M48 22v-4"/>
      <text x="12" y="54" font-size="4" fill="currentColor" stroke="none">OD</text>
      <text x="42" y="54" font-size="4" fill="currentColor" stroke="none">OS</text>
    </svg>`
  },

  // ===========================================================================
  // PROCEDURES (6 icons)
  // ===========================================================================
  {
    id: 'ophth-cataract-surgery',
    name: 'Cataract Surgery',
    domain: 'medicine',
    category: 'procedures',
    tags: ['cataract surgery', 'phacoemulsification', 'IOL', 'capsulorhexis', 'extraction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <circle cx="32" cy="32" r="12" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="6" fill="#8B4513" opacity="0.5"/>
      <path d="M8 24l12 8"/>
      <path d="M8 24l-4-4"/>
      <circle cx="20" cy="32" r="2" fill="currentColor"/>
      <path d="M20 32l4-4 4 4" stroke-dasharray="2 1"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">Phaco Tip</text>
      <text x="32" y="58" font-size="4" fill="currentColor" stroke="none">Rhexis</text>
    </svg>`
  },
  {
    id: 'ophth-lasik',
    name: 'LASIK Surgery',
    domain: 'medicine',
    category: 'procedures',
    tags: ['LASIK', 'refractive', 'laser', 'flap', 'excimer', 'corneal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <path d="M12 28c8 4 32 4 40 0" stroke-dasharray="4 2"/>
      <path d="M16 28c0-4 12-8 24-4" fill="currentColor" opacity="0.1"/>
      <path d="M16 28l24-4"/>
      <path d="M32 8v12" stroke="#DC143C" stroke-width="2"/>
      <path d="M28 20l4-4 4 4" stroke="#DC143C"/>
      <circle cx="32" cy="32" r="8"/>
      <text x="4" y="14" font-size="4" fill="#DC143C" stroke="none">Laser</text>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Flap</text>
    </svg>`
  },
  {
    id: 'ophth-intravitreal-injection',
    name: 'Intravitreal Injection',
    domain: 'medicine',
    category: 'procedures',
    tags: ['intravitreal', 'injection', 'anti-VEGF', 'steroid', 'pars plana', 'IVT'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="22" ry="18"/>
      <ellipse cx="20" cy="36" rx="8" ry="10"/>
      <circle cx="20" cy="36" r="4" fill="currentColor"/>
      <path d="M4 16l20 16" stroke-width="2"/>
      <path d="M4 16l-2-8"/>
      <path d="M2 8h4"/>
      <rect x="2" y="8" width="4" height="12" rx="1"/>
      <circle cx="44" cy="36" r="4" fill="currentColor" opacity="0.3"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">3.5mm from Limbus</text>
    </svg>`
  },
  {
    id: 'ophth-trabeculectomy',
    name: 'Trabeculectomy',
    domain: 'medicine',
    category: 'procedures',
    tags: ['trabeculectomy', 'glaucoma', 'filtration', 'bleb', 'IOP lowering', 'surgery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="22" ry="18"/>
      <path d="M24 18c0-8 8-12 16-8" fill="currentColor" opacity="0.2"/>
      <path d="M24 18c0-8 8-12 16-8"/>
      <path d="M28 22l-4 8h8"/>
      <rect x="26" y="30" width="12" height="6" fill="currentColor" opacity="0.3"/>
      <path d="M26 36l6 4 6-4"/>
      <circle cx="32" cy="44" r="4" fill="currentColor"/>
      <path d="M24 18l4 4" stroke="#4169E1" stroke-dasharray="2 1"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">Bleb</text>
      <text x="40" y="36" font-size="4" fill="currentColor" stroke="none">Scleral Flap</text>
    </svg>`
  },
  {
    id: 'ophth-vitrectomy',
    name: 'Pars Plana Vitrectomy',
    domain: 'medicine',
    category: 'procedures',
    tags: ['vitrectomy', 'PPV', 'pars plana', 'posterior segment', 'retinal surgery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="22" ry="20"/>
      <ellipse cx="16" cy="32" rx="6" ry="8"/>
      <circle cx="16" cy="32" r="3" fill="currentColor"/>
      <path d="M4 20l8 8"/>
      <path d="M4 44l8-8"/>
      <path d="M60 20l-8 8"/>
      <circle cx="4" cy="20" r="2"/>
      <circle cx="4" cy="44" r="2"/>
      <circle cx="60" cy="20" r="2"/>
      <path d="M24 28c4-4 8-4 12 0" stroke-dasharray="2 1"/>
      <path d="M24 36c4 4 8 4 12 0" stroke-dasharray="2 1"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">3-Port PPV</text>
    </svg>`
  },
  {
    id: 'ophth-retinal-laser',
    name: 'Retinal Laser Photocoagulation',
    domain: 'medicine',
    category: 'procedures',
    tags: ['laser', 'PRP', 'photocoagulation', 'focal', 'diabetic', 'retinal tear'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="16" cy="32" r="6" fill="#FFA500" opacity="0.3"/>
      <circle cx="48" cy="32" r="4"/>
      <circle cx="24" cy="20" r="2" fill="#228B22"/>
      <circle cx="32" cy="16" r="2" fill="#228B22"/>
      <circle cx="40" cy="20" r="2" fill="#228B22"/>
      <circle cx="44" cy="28" r="2" fill="#228B22"/>
      <circle cx="24" cy="44" r="2" fill="#228B22"/>
      <circle cx="32" cy="48" r="2" fill="#228B22"/>
      <circle cx="40" cy="44" r="2" fill="#228B22"/>
      <circle cx="20" cy="40" r="2" fill="#228B22"/>
      <path d="M32 4l0 8" stroke="#228B22" stroke-width="2"/>
      <text x="18" y="62" font-size="4" fill="currentColor" stroke="none">PRP Burns</text>
    </svg>`
  },

  // ===========================================================================
  // REFRACTIVE CONDITIONS (4 icons)
  // ===========================================================================
  {
    id: 'ophth-myopia',
    name: 'Myopia (Nearsightedness)',
    domain: 'medicine',
    category: 'refractive',
    tags: ['myopia', 'nearsighted', 'short-sighted', 'elongated', 'minus lens', 'refractive error'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="20"/>
      <ellipse cx="12" cy="32" rx="6" ry="10"/>
      <path d="M8 20l48-8" stroke="#DC143C" stroke-width="1.5"/>
      <path d="M8 44l48 8" stroke="#DC143C" stroke-width="1.5"/>
      <circle cx="44" cy="32" r="3" fill="#DC143C" opacity="0.5"/>
      <path d="M18 32h20" stroke-dasharray="3 2"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">Light rays</text>
      <text x="36" y="28" font-size="4" fill="#DC143C" stroke="none">Focus</text>
      <text x="48" y="40" font-size="4" fill="currentColor" stroke="none">Retina</text>
    </svg>`
  },
  {
    id: 'ophth-hyperopia',
    name: 'Hyperopia (Farsightedness)',
    domain: 'medicine',
    category: 'refractive',
    tags: ['hyperopia', 'farsighted', 'long-sighted', 'plus lens', 'refractive error'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <ellipse cx="12" cy="32" rx="6" ry="10"/>
      <path d="M8 22l48 2" stroke="#DC143C" stroke-width="1.5"/>
      <path d="M8 42l48-2" stroke="#DC143C" stroke-width="1.5"/>
      <circle cx="64" cy="32" r="3" fill="#DC143C" opacity="0.5" stroke="none"/>
      <circle cx="56" cy="32" r="2" fill="currentColor" opacity="0.3"/>
      <path d="M18 32h38" stroke-dasharray="3 2"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">Light rays</text>
      <text x="48" y="24" font-size="4" fill="#DC143C" stroke="none">Focus behind</text>
    </svg>`
  },
  {
    id: 'ophth-astigmatism',
    name: 'Astigmatism',
    domain: 'medicine',
    category: 'refractive',
    tags: ['astigmatism', 'irregular', 'corneal', 'lenticular', 'cylinder', 'axis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <ellipse cx="14" cy="32" rx="8" ry="6"/>
      <path d="M8 24l36 4" stroke="#DC143C" stroke-width="1.5"/>
      <path d="M8 40l36-4" stroke="#4169E1" stroke-width="1.5"/>
      <circle cx="44" cy="28" r="2" fill="#DC143C" opacity="0.5"/>
      <circle cx="44" cy="36" r="2" fill="#4169E1" opacity="0.5"/>
      <path d="M22 32h32" stroke-dasharray="3 2"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">Vertical</text>
      <text x="4" y="54" font-size="4" fill="currentColor" stroke="none">Horizontal</text>
      <text x="40" y="24" font-size="3" fill="#DC143C" stroke="none">F1</text>
      <text x="40" y="44" font-size="3" fill="#4169E1" stroke="none">F2</text>
    </svg>`
  },
  {
    id: 'ophth-presbyopia',
    name: 'Presbyopia',
    domain: 'medicine',
    category: 'refractive',
    tags: ['presbyopia', 'aging', 'accommodation', 'near vision', 'reading glasses', 'bifocal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <ellipse cx="14" cy="32" rx="6" ry="10" stroke-dasharray="3 2"/>
      <ellipse cx="14" cy="32" rx="4" ry="6" fill="currentColor" opacity="0.2"/>
      <path d="M4 20l8 4"/>
      <path d="M4 44l8-4"/>
      <circle cx="20" cy="28" r="1" fill="currentColor" opacity="0.5"/>
      <path d="M8 28h12" stroke="#DC143C"/>
      <path d="M8 36h16" stroke="#4169E1"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">Near</text>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Far</text>
      <text x="24" y="24" font-size="3" fill="#DC143C" stroke="none">Lost</text>
      <text x="26" y="42" font-size="3" fill="#4169E1" stroke="none">OK</text>
      <text x="32" y="58" font-size="4" fill="currentColor" stroke="none">Stiff Lens</text>
    </svg>`
  },

  // ===========================================================================
  // EXTERNAL EYE STRUCTURES (6 icons)
  // ===========================================================================
  {
    id: 'ophth-eyelid',
    name: 'Eyelid Anatomy',
    domain: 'medicine',
    category: 'external-eye',
    tags: ['eyelid', 'tarsus', 'levator', 'orbicularis', 'Meibomian', 'blepharoptosis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c8-16 40-16 48 0"/>
      <path d="M8 32c8 16 40 16 48 0"/>
      <path d="M8 28c8-12 40-12 48 0" stroke-dasharray="3 2"/>
      <path d="M12 24l4 8"/>
      <path d="M20 20l2 12"/>
      <path d="M44 20l-2 12"/>
      <path d="M52 24l-4 8"/>
      <rect x="16" y="30" width="32" height="4" fill="currentColor" opacity="0.2"/>
      <path d="M16 38c8 4 24 4 32 0"/>
      <text x="4" y="16" font-size="4" fill="currentColor" stroke="none">Levator</text>
      <text x="22" y="34" font-size="4" fill="currentColor" stroke="none">Tarsus</text>
      <text x="22" y="54" font-size="4" fill="currentColor" stroke="none">Lashes</text>
    </svg>`
  },
  {
    id: 'ophth-lacrimal-system',
    name: 'Lacrimal System',
    domain: 'medicine',
    category: 'external-eye',
    tags: ['lacrimal', 'tear', 'gland', 'punctum', 'canaliculus', 'nasolacrimal duct'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="20" ry="14"/>
      <circle cx="32" cy="28" r="6" fill="currentColor"/>
      <ellipse cx="52" cy="16" rx="6" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="52" cy="16" rx="6" ry="4"/>
      <path d="M52 20l-8 6" stroke="#4169E1" stroke-dasharray="2 1"/>
      <circle cx="12" cy="24" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="12" cy="32" r="2" fill="currentColor" opacity="0.3"/>
      <path d="M12 24v8"/>
      <path d="M12 32l-4 24"/>
      <text x="46" y="12" font-size="3" fill="currentColor" stroke="none">Gland</text>
      <text x="4" y="22" font-size="3" fill="currentColor" stroke="none">Puncta</text>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">NLD</text>
    </svg>`
  },
  {
    id: 'ophth-extraocular-muscles',
    name: 'Extraocular Muscles',
    domain: 'medicine',
    category: 'external-eye',
    tags: ['EOM', 'extraocular', 'rectus', 'oblique', 'strabismus', 'diplopia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="14"/>
      <circle cx="32" cy="32" r="6" fill="currentColor"/>
      <path d="M32 18v-12" stroke-width="3"/>
      <path d="M32 46v12" stroke-width="3"/>
      <path d="M18 32h-12" stroke-width="3"/>
      <path d="M46 32h12" stroke-width="3"/>
      <path d="M22 22l-8-8" stroke-width="2"/>
      <path d="M42 42l8 8" stroke-width="2"/>
      <text x="28" y="10" font-size="3" fill="currentColor" stroke="none">SR</text>
      <text x="28" y="58" font-size="3" fill="currentColor" stroke="none">IR</text>
      <text x="2" y="34" font-size="3" fill="currentColor" stroke="none">MR</text>
      <text x="52" y="34" font-size="3" fill="currentColor" stroke="none">LR</text>
      <text x="8" y="18" font-size="3" fill="currentColor" stroke="none">SO</text>
      <text x="48" y="54" font-size="3" fill="currentColor" stroke="none">IO</text>
    </svg>`
  },
  {
    id: 'ophth-orbit',
    name: 'Orbital Anatomy',
    domain: 'medicine',
    category: 'external-eye',
    tags: ['orbit', 'orbital', 'bones', 'apex', 'annulus', 'fissure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 12c8-8 40-8 48 0v40c-8 8-40 8-48 0z"/>
      <ellipse cx="32" cy="32" rx="16" ry="14" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="16" ry="14"/>
      <circle cx="32" cy="32" r="8"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
      <path d="M8 12l8 8"/>
      <path d="M56 12l-8 8"/>
      <path d="M8 52l8-8"/>
      <path d="M56 52l-8-8"/>
      <text x="4" y="32" font-size="3" fill="currentColor" stroke="none">Wall</text>
      <text x="20" y="58" font-size="3" fill="currentColor" stroke="none">Orbital Floor</text>
    </svg>`
  },
  {
    id: 'ophth-blepharitis',
    name: 'Blepharitis',
    domain: 'medicine',
    category: 'external-eye',
    tags: ['blepharitis', 'lid margin', 'MGD', 'Meibomian', 'collarettes', 'inflammation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c8-12 40-12 48 0"/>
      <path d="M8 32c8 12 40 12 48 0"/>
      <circle cx="32" cy="32" r="8"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
      <path d="M8 32h8" stroke="#DC143C" stroke-width="2"/>
      <path d="M48 32h8" stroke="#DC143C" stroke-width="2"/>
      <circle cx="16" cy="38" r="1.5" fill="#FFD700"/>
      <circle cx="24" cy="40" r="1" fill="#FFD700"/>
      <circle cx="40" cy="40" r="1" fill="#FFD700"/>
      <circle cx="48" cy="38" r="1.5" fill="#FFD700"/>
      <path d="M12 44l4-4"/>
      <path d="M20 46l2-4"/>
      <path d="M42 46l-2-4"/>
      <path d="M52 44l-4-4"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Crusting + Debris</text>
    </svg>`
  },
  {
    id: 'ophth-chalazion',
    name: 'Chalazion/Hordeolum',
    domain: 'medicine',
    category: 'external-eye',
    tags: ['chalazion', 'hordeolum', 'stye', 'Meibomian', 'lid lesion', 'granuloma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28c8-12 40-12 48 0"/>
      <path d="M8 36c8 12 40 12 48 0"/>
      <ellipse cx="32" cy="32" rx="12" ry="8"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
      <ellipse cx="20" cy="24" rx="6" ry="4" fill="#DC143C" opacity="0.4"/>
      <ellipse cx="20" cy="24" rx="6" ry="4"/>
      <circle cx="20" cy="24" r="2" fill="#FFD700"/>
      <path d="M16 24h8" stroke="#DC143C" stroke-width="1"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">Swelling</text>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Chalazion</text>
    </svg>`
  },

  // ===========================================================================
  // OPTICAL CONCEPTS (4 icons)
  // ===========================================================================
  {
    id: 'ophth-light-refraction',
    name: 'Light Refraction',
    domain: 'medicine',
    category: 'optical',
    tags: ['refraction', 'light', 'lens', 'focal point', 'convergent', 'divergent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="6" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="24" cy="32" rx="6" ry="20"/>
      <path d="M4 20l14 12" stroke="#FFD700" stroke-width="2"/>
      <path d="M4 32l14 0" stroke="#FFD700" stroke-width="2"/>
      <path d="M4 44l14-12" stroke="#FFD700" stroke-width="2"/>
      <path d="M30 32l20 0" stroke="#FFD700" stroke-width="2"/>
      <path d="M30 32l20-8" stroke="#FFD700" stroke-width="1" stroke-dasharray="3 2"/>
      <path d="M30 32l20 8" stroke="#FFD700" stroke-width="1" stroke-dasharray="3 2"/>
      <circle cx="50" cy="32" r="3" fill="#FFD700"/>
      <text x="2" y="16" font-size="4" fill="currentColor" stroke="none">Light</text>
      <text x="46" y="28" font-size="3" fill="currentColor" stroke="none">Focus</text>
    </svg>`
  },
  {
    id: 'ophth-snellen-chart',
    name: 'Visual Acuity Chart',
    domain: 'medicine',
    category: 'optical',
    tags: ['Snellen', 'visual acuity', 'VA', 'chart', 'testing', '20/20'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="2"/>
      <text x="28" y="16" font-size="10" fill="currentColor" stroke="none" font-weight="bold">E</text>
      <text x="22" y="26" font-size="6" fill="currentColor" stroke="none">F P</text>
      <text x="18" y="34" font-size="5" fill="currentColor" stroke="none">T O Z</text>
      <text x="16" y="42" font-size="4" fill="currentColor" stroke="none">L P E D</text>
      <text x="14" y="48" font-size="3" fill="currentColor" stroke="none">P E C F D</text>
      <text x="12" y="54" font-size="2" fill="currentColor" stroke="none">E D F C Z P</text>
      <text x="46" y="16" font-size="3" fill="currentColor" stroke="none">20/200</text>
      <text x="46" y="26" font-size="3" fill="currentColor" stroke="none">20/100</text>
      <text x="46" y="34" font-size="3" fill="currentColor" stroke="none">20/70</text>
      <text x="46" y="42" font-size="3" fill="currentColor" stroke="none">20/40</text>
      <text x="46" y="48" font-size="3" fill="currentColor" stroke="none">20/30</text>
      <text x="46" y="54" font-size="3" fill="currentColor" stroke="none">20/20</text>
    </svg>`
  },
  {
    id: 'ophth-prism',
    name: 'Prism',
    domain: 'medicine',
    category: 'optical',
    tags: ['prism', 'deviation', 'diopter', 'strabismus', 'diplopia', 'Fresnel'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8l24 24-24 24z" fill="currentColor" opacity="0.1"/>
      <path d="M20 8l24 24-24 24z"/>
      <path d="M4 32h16" stroke="#FFD700" stroke-width="2"/>
      <path d="M44 32l16-8" stroke="#FFD700" stroke-width="2"/>
      <path d="M32 32l12 0" stroke="#FFD700" stroke-width="1" stroke-dasharray="2 1"/>
      <path d="M48 24l4-2"/>
      <path d="M52 22l2 4"/>
      <text x="4" y="28" font-size="4" fill="currentColor" stroke="none">In</text>
      <text x="52" y="20" font-size="4" fill="currentColor" stroke="none">Out</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Base</text>
      <text x="32" y="58" font-size="4" fill="currentColor" stroke="none">Apex</text>
    </svg>`
  },
  {
    id: 'ophth-accommodation',
    name: 'Accommodation',
    domain: 'medicine',
    category: 'optical',
    tags: ['accommodation', 'near focus', 'ciliary', 'zonules', 'lens thickening'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <text x="8" y="12" font-size="4" fill="currentColor" stroke="none">Distance</text>
      <ellipse cx="20" cy="24" rx="6" ry="10" stroke-dasharray="3 2"/>
      <path d="M8 20l6 4"/>
      <path d="M8 28l6-4"/>
      <path d="M26 24l10 0"/>
      <circle cx="40" cy="24" r="3" fill="currentColor" opacity="0.3"/>
      <text x="8" y="44" font-size="4" fill="currentColor" stroke="none">Near</text>
      <ellipse cx="20" cy="52" rx="8" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="20" cy="52" rx="8" ry="8"/>
      <path d="M8 48l4 4"/>
      <path d="M8 56l4-4"/>
      <path d="M28 52l8 0"/>
      <circle cx="40" cy="52" r="3" fill="currentColor" opacity="0.3"/>
      <text x="44" y="26" font-size="3" fill="currentColor" stroke="none">Thin</text>
      <text x="44" y="54" font-size="3" fill="currentColor" stroke="none">Thick</text>
    </svg>`
  },

  // ===========================================================================
  // TREATMENTS (4 icons)
  // ===========================================================================
  {
    id: 'ophth-eye-drops',
    name: 'Eye Drops',
    domain: 'medicine',
    category: 'treatments',
    tags: ['eye drops', 'topical', 'medication', 'instillation', 'glaucoma', 'antibiotic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 4h16v20l-4 4h-8l-4-4z" fill="currentColor" opacity="0.1"/>
      <path d="M24 4h16v20l-4 4h-8l-4-4z"/>
      <path d="M28 28v8l4 8 4-8v-8"/>
      <circle cx="32" cy="48" r="4" fill="#4169E1"/>
      <path d="M8 56c8-8 16-12 24-12"/>
      <path d="M8 56c8 8 40 8 48 0"/>
      <ellipse cx="32" cy="56" rx="16" ry="6"/>
      <circle cx="32" cy="56" r="6" fill="currentColor"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">Bottle</text>
      <text x="36" y="50" font-size="3" fill="#4169E1" stroke="none">Drop</text>
    </svg>`
  },
  {
    id: 'ophth-eye-patch',
    name: 'Eye Patch/Occlusion',
    domain: 'medicine',
    category: 'treatments',
    tags: ['patch', 'occlusion', 'amblyopia', 'patching', 'penalization', 'treatment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="currentColor" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <path d="M12 32c0-4 8-12 20-12"/>
      <path d="M12 32c0 4 8 12 20 12"/>
      <path d="M4 24l8 8"/>
      <path d="M4 40l8-8"/>
      <path d="M52 24l8-8"/>
      <path d="M52 40l8 8"/>
      <text x="22" y="34" font-size="5" fill="currentColor" stroke="none">PATCH</text>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Amblyopia Tx</text>
    </svg>`
  },
  {
    id: 'ophth-antiVEGF',
    name: 'Anti-VEGF Injection',
    domain: 'medicine',
    category: 'treatments',
    tags: ['anti-VEGF', 'Avastin', 'Lucentis', 'Eylea', 'injection', 'AMD', 'DME'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="8" height="24" rx="2"/>
      <path d="M8 32l4 4v16"/>
      <path d="M12 52l-4 4-4-4"/>
      <ellipse cx="40" cy="36" rx="18" ry="14"/>
      <circle cx="32" cy="36" r="6" fill="currentColor"/>
      <path d="M12 40l12 0" stroke="#DC143C" stroke-width="2"/>
      <circle cx="24" cy="40" r="2" fill="#DC143C"/>
      <path d="M50 28c-4 4-8 8-12 8" stroke="#4169E1" stroke-dasharray="2 1"/>
      <text x="4" y="6" font-size="3" fill="currentColor" stroke="none">Syringe</text>
      <text x="44" y="56" font-size="3" fill="currentColor" stroke="none">Pars Plana</text>
    </svg>`
  },
  {
    id: 'ophth-shield',
    name: 'Eye Shield',
    domain: 'medicine',
    category: 'treatments',
    tags: ['shield', 'protection', 'post-op', 'trauma', 'Fox shield', 'safety'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="currentColor" opacity="0.1"/>
      <circle cx="20" cy="28" r="2" fill="currentColor"/>
      <circle cx="28" cy="24" r="2" fill="currentColor"/>
      <circle cx="36" cy="24" r="2" fill="currentColor"/>
      <circle cx="44" cy="28" r="2" fill="currentColor"/>
      <circle cx="24" cy="36" r="2" fill="currentColor"/>
      <circle cx="32" cy="40" r="2" fill="currentColor"/>
      <circle cx="40" cy="36" r="2" fill="currentColor"/>
      <path d="M8 32h-4"/>
      <path d="M56 32h4"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Fox Shield</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL PATHOLOGY/EQUIPMENT (4 icons)
  // ===========================================================================
  {
    id: 'ophth-optic-neuritis',
    name: 'Optic Neuritis',
    domain: 'medicine',
    category: 'pathology-posterior',
    tags: ['optic neuritis', 'MS', 'demyelination', 'disc swelling', 'vision loss', 'pain'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="14" fill="#FFA500" opacity="0.4"/>
      <circle cx="32" cy="28" r="14"/>
      <circle cx="32" cy="28" r="6" fill="currentColor" opacity="0.3"/>
      <path d="M18 28c4 4 24 4 28 0"/>
      <path d="M24 44l-4 12"/>
      <path d="M40 44l4 12"/>
      <path d="M32 44v14"/>
      <path d="M28 52c8 4 8 4 8 0" stroke="#DC143C" stroke-width="2"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">Swollen</text>
      <text x="4" y="58" font-size="4" fill="#DC143C" stroke="none">Inflamed ON</text>
    </svg>`
  },
  {
    id: 'ophth-gonioscopy-lens',
    name: 'Gonioscopy Lens',
    domain: 'medicine',
    category: 'equipment',
    tags: ['gonioscopy', 'angle', 'Goldmann', 'Zeiss', 'Posner', 'iridocorneal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="20" ry="8" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="40" rx="20" ry="8"/>
      <path d="M12 40v-16c0-8 8-16 20-16s20 8 20 16v16"/>
      <path d="M16 32l8 8"/>
      <path d="M48 32l-8 8"/>
      <circle cx="32" cy="24" r="8"/>
      <circle cx="32" cy="24" r="4" fill="currentColor" opacity="0.3"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Gonio Lens</text>
      <text x="36" y="36" font-size="3" fill="currentColor" stroke="none">Mirror</text>
    </svg>`
  },
  {
    id: 'ophth-keratometer',
    name: 'Keratometer',
    domain: 'medicine',
    category: 'equipment',
    tags: ['keratometer', 'K readings', 'curvature', 'astigmatism', 'biometry', 'IOL calculation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="40" rx="4"/>
      <circle cx="32" cy="28" r="12"/>
      <circle cx="32" cy="28" r="8" fill="currentColor" opacity="0.1"/>
      <path d="M32 16v4"/>
      <path d="M32 36v4"/>
      <path d="M20 28h4"/>
      <path d="M40 28h4"/>
      <circle cx="28" cy="24" r="2" fill="#DC143C"/>
      <circle cx="36" cy="24" r="2" fill="#DC143C"/>
      <circle cx="28" cy="32" r="2" fill="#DC143C"/>
      <circle cx="36" cy="32" r="2" fill="#DC143C"/>
      <rect x="24" y="52" width="16" height="8" rx="2"/>
      <text x="12" y="62" font-size="3" fill="currentColor" stroke="none">K1</text>
      <text x="44" y="62" font-size="3" fill="currentColor" stroke="none">K2</text>
    </svg>`
  },
  {
    id: 'ophth-retinoscope',
    name: 'Retinoscope',
    domain: 'medicine',
    category: 'equipment',
    tags: ['retinoscope', 'retinoscopy', 'refraction', 'streak', 'objective', 'neutralization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="26" y="4" width="12" height="48" rx="4"/>
      <circle cx="32" cy="12" r="6"/>
      <circle cx="32" cy="12" r="3" fill="currentColor" opacity="0.3"/>
      <path d="M32 18v4"/>
      <rect x="28" y="24" width="8" height="8" rx="1"/>
      <path d="M28 36h8"/>
      <path d="M28 40h8"/>
      <path d="M28 44h8"/>
      <path d="M32 52v8"/>
      <path d="M28 58h8"/>
      <path d="M38 12l8 0" stroke="#FFD700" stroke-width="2"/>
      <path d="M38 12l6-4" stroke="#FFD700" stroke-dasharray="2 1"/>
      <path d="M38 12l6 4" stroke="#FFD700" stroke-dasharray="2 1"/>
      <text x="48" y="14" font-size="3" fill="currentColor" stroke="none">Light</text>
    </svg>`
  },
];

export default ophthalmologyIcons;
