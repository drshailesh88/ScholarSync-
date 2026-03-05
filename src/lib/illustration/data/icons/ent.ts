/**
 * ENT (Otolaryngology) Icon Library
 * Comprehensive SVG icons for ear, nose, and throat medicine
 *
 * Categories:
 * - Ear Anatomy (outer ear, canal, tympanic membrane, ossicles, cochlea, vestibular)
 * - Nose/Sinus (nasal cavity, septum, turbinates, paranasal sinuses, olfactory)
 * - Throat/Larynx (pharynx, larynx, vocal cords, epiglottis, tonsils)
 * - Ear Pathology (otitis, hearing loss, vertigo, Meniere's)
 * - Nose Pathology (sinusitis, polyps, epistaxis, rhinitis)
 * - Throat Pathology (pharyngitis, laryngitis, cancer, sleep apnea)
 * - Equipment (otoscope, audiometer, endoscope, hearing aids)
 */

import type { IconDefinition } from './index';

export const entIcons: IconDefinition[] = [
  // ===========================================================================
  // EAR ANATOMY (12 icons)
  // ===========================================================================
  {
    id: 'ent-outer-ear',
    name: 'Outer Ear (Pinna)',
    domain: 'medicine',
    category: 'ear-anatomy',
    tags: ['pinna', 'auricle', 'outer ear', 'helix', 'lobule', 'external ear'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M40 8c12 4 16 16 14 28-2 12-10 20-18 22-6 2-12-2-12-8 0-4 4-6 6-4 2 2 1 4 3 4 4 0 8-8 8-16 0-6-4-10-8-10-6 0-10 6-10 14"/>
      <path d="M28 30c-2 1-4 4-4 8"/>
      <path d="M36 16c4 2 6 6 6 12"/>
      <text x="8" y="58" font-size="5" fill="currentColor" stroke="none">Pinna</text>
    </svg>`
  },
  {
    id: 'ent-ear-canal',
    name: 'External Auditory Canal',
    domain: 'medicine',
    category: 'ear-anatomy',
    tags: ['ear canal', 'EAC', 'auditory canal', 'external', 'meatus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28h16c4 0 8 2 8 8s-4 8-8 8H8"/>
      <path d="M32 36h24"/>
      <ellipse cx="56" cy="36" rx="2" ry="6"/>
      <path d="M12 32h8" stroke-dasharray="2 2"/>
      <path d="M12 40h8" stroke-dasharray="2 2"/>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Canal</text>
      <text x="42" y="56" font-size="4" fill="currentColor" stroke="none">TM</text>
    </svg>`
  },
  {
    id: 'ent-tympanic-membrane',
    name: 'Tympanic Membrane',
    domain: 'medicine',
    category: 'ear-anatomy',
    tags: ['eardrum', 'TM', 'tympanic membrane', 'umbo', 'pars tensa', 'pars flaccida'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <path d="M20 16c6 1 10 3 12 8"/>
      <path d="M32 24v16"/>
      <circle cx="32" cy="40" r="2" fill="currentColor"/>
      <path d="M32 40l10-14" stroke-dasharray="3 2"/>
      <path d="M16 24c0-4 6-6 12-6"/>
      <text x="34" y="44" font-size="4" fill="currentColor" stroke="none">Umbo</text>
      <text x="20" y="12" font-size="4" fill="currentColor" stroke="none">Handle</text>
    </svg>`
  },
  {
    id: 'ent-malleus',
    name: 'Malleus (Hammer)',
    domain: 'medicine',
    category: 'ear-anatomy',
    tags: ['malleus', 'hammer', 'ossicle', 'manubrium', 'handle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="14" rx="10" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="14" rx="10" ry="6"/>
      <path d="M32 20v32" stroke-width="3"/>
      <path d="M28 52h8" stroke-width="2"/>
      <circle cx="32" cy="52" r="4" fill="currentColor" opacity="0.3"/>
      <text x="44" y="16" font-size="4" fill="currentColor" stroke="none">Head</text>
      <text x="36" y="38" font-size="4" fill="currentColor" stroke="none">Handle</text>
    </svg>`
  },
  {
    id: 'ent-incus',
    name: 'Incus (Anvil)',
    domain: 'medicine',
    category: 'ear-anatomy',
    tags: ['incus', 'anvil', 'ossicle', 'body', 'long process'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="28" cy="20" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="28" cy="20" rx="12" ry="8"/>
      <path d="M36 26l12 24" stroke-width="3"/>
      <path d="M20 26l-4 8"/>
      <circle cx="48" cy="50" r="3" fill="currentColor"/>
      <text x="8" y="38" font-size="4" fill="currentColor" stroke="none">Short</text>
      <text x="48" y="40" font-size="4" fill="currentColor" stroke="none">Long</text>
    </svg>`
  },
  {
    id: 'ent-stapes',
    name: 'Stapes (Stirrup)',
    domain: 'medicine',
    category: 'ear-anatomy',
    tags: ['stapes', 'stirrup', 'ossicle', 'footplate', 'oval window'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="12" r="6"/>
      <path d="M28 18l-8 24"/>
      <path d="M36 18l8 24"/>
      <ellipse cx="32" cy="48" rx="16" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="48" rx="16" ry="6"/>
      <path d="M20 42v6"/>
      <path d="M44 42v6"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Footplate</text>
    </svg>`
  },
  {
    id: 'ent-ossicles-chain',
    name: 'Ossicular Chain',
    domain: 'medicine',
    category: 'ear-anatomy',
    tags: ['ossicles', 'chain', 'malleus', 'incus', 'stapes', 'middle ear'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="12" cy="20" rx="6" ry="4" fill="currentColor" opacity="0.2"/>
      <path d="M12 24v20" stroke-width="2"/>
      <ellipse cx="28" cy="18" rx="8" ry="5" fill="currentColor" opacity="0.2"/>
      <path d="M34 22l10 16" stroke-width="2"/>
      <circle cx="50" cy="32" r="4"/>
      <path d="M48 36l-6 12"/>
      <path d="M52 36l6 12"/>
      <ellipse cx="50" cy="52" rx="10" ry="4" fill="currentColor" opacity="0.2"/>
      <text x="6" y="50" font-size="4" fill="currentColor" stroke="none">M</text>
      <text x="26" y="30" font-size="4" fill="currentColor" stroke="none">I</text>
      <text x="48" y="60" font-size="4" fill="currentColor" stroke="none">S</text>
    </svg>`
  },
  {
    id: 'ent-cochlea',
    name: 'Cochlea',
    domain: 'medicine',
    category: 'ear-anatomy',
    tags: ['cochlea', 'inner ear', 'hearing', 'hair cells', 'organ of Corti', 'spiral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 56c-16 0-24-12-24-24 0-10 6-18 14-22"/>
      <path d="M32 48c-10 0-16-8-16-16 0-6 4-12 10-14"/>
      <path d="M32 40c-6 0-10-4-10-10 0-4 3-8 8-9"/>
      <path d="M32 32c-2 0-4-2-4-4s2-4 4-4"/>
      <circle cx="32" cy="28" r="2" fill="currentColor"/>
      <path d="M40 12l8-4"/>
      <text x="44" y="10" font-size="5" fill="currentColor" stroke="none">Apex</text>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Base</text>
    </svg>`
  },
  {
    id: 'ent-vestibular-system',
    name: 'Vestibular System',
    domain: 'medicine',
    category: 'ear-anatomy',
    tags: ['vestibular', 'semicircular canals', 'balance', 'utricle', 'saccule', 'labyrinth'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="44" rx="10" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="44" rx="10" ry="8"/>
      <path d="M32 36c0-16 12-24 12-24"/>
      <path d="M24 36c-12-8-8-24-8-24"/>
      <path d="M40 40c16 0 16-16 16-16"/>
      <circle cx="44" cy="12" r="3"/>
      <circle cx="16" cy="12" r="3"/>
      <circle cx="56" cy="24" r="3"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">SCCs</text>
    </svg>`
  },
  {
    id: 'ent-eustachian-tube',
    name: 'Eustachian Tube',
    domain: 'medicine',
    category: 'ear-anatomy',
    tags: ['eustachian', 'auditory tube', 'pharyngotympanic', 'middle ear', 'nasopharynx'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="16" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="4" y="24" width="16" height="16" rx="2"/>
      <path d="M20 32h28c4 0 8 4 8 8v12"/>
      <path d="M20 28l12-4"/>
      <path d="M20 36l12 4"/>
      <ellipse cx="56" cy="56" rx="4" ry="4"/>
      <text x="4" y="20" font-size="4" fill="currentColor" stroke="none">Middle Ear</text>
      <text x="44" y="60" font-size="4" fill="currentColor" stroke="none">NP</text>
    </svg>`
  },
  {
    id: 'ent-mastoid',
    name: 'Mastoid Process',
    domain: 'medicine',
    category: 'ear-anatomy',
    tags: ['mastoid', 'temporal bone', 'air cells', 'mastoiditis', 'pneumatization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24c8 0 12 8 12 20 0 16-8 28-24 28-12 0-20-12-20-28 0-12 4-20 8-20z" fill="currentColor" opacity="0.1"/>
      <path d="M20 8h24c8 0 12 8 12 20 0 16-8 28-24 28-12 0-20-12-20-28 0-12 4-20 8-20z"/>
      <circle cx="28" cy="24" r="3" stroke-dasharray="2 1"/>
      <circle cx="40" cy="24" r="3" stroke-dasharray="2 1"/>
      <circle cx="34" cy="36" r="4" stroke-dasharray="2 1"/>
      <circle cx="26" cy="44" r="2" stroke-dasharray="2 1"/>
      <circle cx="42" cy="42" r="2" stroke-dasharray="2 1"/>
      <text x="8" y="60" font-size="4" fill="currentColor" stroke="none">Air Cells</text>
    </svg>`
  },
  {
    id: 'ent-inner-ear',
    name: 'Inner Ear Complete',
    domain: 'medicine',
    category: 'ear-anatomy',
    tags: ['inner ear', 'labyrinth', 'cochlea', 'vestibular', 'semicircular canals'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 48c-8 0-10-6-10-12s4-12 10-16"/>
      <path d="M16 44c-4 0-6-4-6-8s2-8 6-10"/>
      <path d="M16 40c-2 0-3-2-3-4s1-4 3-5"/>
      <circle cx="16" cy="35" r="1" fill="currentColor"/>
      <ellipse cx="40" cy="44" rx="8" ry="6"/>
      <path d="M32 38c0-12 8-20 8-20"/>
      <path d="M48 38c8-4 8-16 8-16"/>
      <path d="M36 40c-8-8-4-20-4-20"/>
      <path d="M24 36h8"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Cochlea</text>
      <text x="36" y="58" font-size="4" fill="currentColor" stroke="none">Vestibule</text>
    </svg>`
  },

  // ===========================================================================
  // NOSE/SINUS ANATOMY (10 icons)
  // ===========================================================================
  {
    id: 'ent-nasal-cavity',
    name: 'Nasal Cavity',
    domain: 'medicine',
    category: 'nose-anatomy',
    tags: ['nasal cavity', 'nasal passage', 'airway', 'nares', 'choana'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 56V20c0-8 8-12 20-12s20 4 20 12v36" fill="currentColor" opacity="0.1"/>
      <path d="M12 56V20c0-8 8-12 20-12s20 4 20 12v36"/>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <path d="M16 24h12"/>
      <path d="M36 24h12"/>
      <path d="M16 36h12"/>
      <path d="M36 36h12"/>
      <path d="M16 48h12"/>
      <path d="M36 48h12"/>
      <text x="16" y="20" font-size="4" fill="currentColor" stroke="none">L</text>
      <text x="42" y="20" font-size="4" fill="currentColor" stroke="none">R</text>
    </svg>`
  },
  {
    id: 'ent-nasal-septum',
    name: 'Nasal Septum',
    domain: 'medicine',
    category: 'nose-anatomy',
    tags: ['septum', 'nasal septum', 'cartilage', 'vomer', 'perpendicular plate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="8" width="8" height="48" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="28" y="8" width="8" height="48" rx="1"/>
      <path d="M28 32h-16"/>
      <path d="M36 32h16"/>
      <path d="M28 20c-8 0-12 4-12 12s4 12 12 12"/>
      <path d="M36 20c8 0 12 4 12 12s-4 12-12 12"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Septum</text>
    </svg>`
  },
  {
    id: 'ent-turbinates',
    name: 'Turbinates (Conchae)',
    domain: 'medicine',
    category: 'nose-anatomy',
    tags: ['turbinates', 'conchae', 'inferior', 'middle', 'superior', 'nasal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 12h48v44H8z" fill="currentColor" opacity="0.05"/>
      <line x1="32" y1="12" x2="32" y2="56"/>
      <path d="M12 20c8 4 14 4 18 0" fill="currentColor" opacity="0.2"/>
      <path d="M12 20c8 4 14 4 18 0"/>
      <path d="M12 34c10 6 16 6 18 0" fill="currentColor" opacity="0.2"/>
      <path d="M12 34c10 6 16 6 18 0"/>
      <path d="M12 48c12 4 18 4 18 0" fill="currentColor" opacity="0.2"/>
      <path d="M12 48c12 4 18 4 18 0"/>
      <text x="36" y="24" font-size="3" fill="currentColor" stroke="none">Superior</text>
      <text x="36" y="38" font-size="3" fill="currentColor" stroke="none">Middle</text>
      <text x="36" y="52" font-size="3" fill="currentColor" stroke="none">Inferior</text>
    </svg>`
  },
  {
    id: 'ent-frontal-sinus',
    name: 'Frontal Sinus',
    domain: 'medicine',
    category: 'nose-anatomy',
    tags: ['frontal sinus', 'paranasal', 'sinus', 'forehead', 'drainage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8h48v24c0 4-8 8-24 8S8 36 8 32V8z" fill="currentColor" opacity="0.1"/>
      <path d="M8 8h48v24c0 4-8 8-24 8S8 36 8 32V8z"/>
      <line x1="32" y1="8" x2="32" y2="40"/>
      <path d="M24 40v16"/>
      <path d="M40 40v16"/>
      <circle cx="24" cy="24" r="4" stroke-dasharray="2 2"/>
      <circle cx="40" cy="24" r="4" stroke-dasharray="2 2"/>
      <text x="20" y="60" font-size="4" fill="currentColor" stroke="none">Frontal Sinuses</text>
    </svg>`
  },
  {
    id: 'ent-maxillary-sinus',
    name: 'Maxillary Sinus',
    domain: 'medicine',
    category: 'nose-anatomy',
    tags: ['maxillary sinus', 'antrum', 'paranasal', 'sinus', 'cheek'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 20c0-6 10-12 24-12s24 6 24 12v24c0 8-10 12-24 12S8 52 8 44V20z" fill="currentColor" opacity="0.1"/>
      <path d="M8 20c0-6 10-12 24-12s24 6 24 12v24c0 8-10 12-24 12S8 52 8 44V20z"/>
      <ellipse cx="20" cy="36" rx="8" ry="12" stroke-dasharray="3 2"/>
      <ellipse cx="44" cy="36" rx="8" ry="12" stroke-dasharray="3 2"/>
      <path d="M20 24l4-8"/>
      <path d="M44 24l-4-8"/>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">L</text>
      <text x="48" y="58" font-size="4" fill="currentColor" stroke="none">R</text>
    </svg>`
  },
  {
    id: 'ent-ethmoid-sinus',
    name: 'Ethmoid Sinus',
    domain: 'medicine',
    category: 'nose-anatomy',
    tags: ['ethmoid sinus', 'ethmoid air cells', 'paranasal', 'lamina papyracea'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="16" height="32" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="36" y="16" width="16" height="32" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="12" y="16" width="16" height="32" rx="2"/>
      <rect x="36" y="16" width="16" height="32" rx="2"/>
      <circle cx="20" cy="24" r="3" stroke-dasharray="2 1"/>
      <circle cx="20" cy="34" r="3" stroke-dasharray="2 1"/>
      <circle cx="20" cy="44" r="2" stroke-dasharray="2 1"/>
      <circle cx="44" cy="24" r="3" stroke-dasharray="2 1"/>
      <circle cx="44" cy="34" r="3" stroke-dasharray="2 1"/>
      <circle cx="44" cy="44" r="2" stroke-dasharray="2 1"/>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Ethmoid Cells</text>
    </svg>`
  },
  {
    id: 'ent-sphenoid-sinus',
    name: 'Sphenoid Sinus',
    domain: 'medicine',
    category: 'nose-anatomy',
    tags: ['sphenoid sinus', 'paranasal', 'skull base', 'sella', 'pituitary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="16"/>
      <line x1="32" y1="16" x2="32" y2="48"/>
      <path d="M32 16c0-4 4-8 8-8"/>
      <ellipse cx="40" cy="8" rx="6" ry="4"/>
      <circle cx="20" cy="32" r="6" stroke-dasharray="3 2"/>
      <circle cx="44" cy="32" r="6" stroke-dasharray="3 2"/>
      <text x="36" y="12" font-size="3" fill="currentColor" stroke="none">Pituitary</text>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Sphenoid</text>
    </svg>`
  },
  {
    id: 'ent-paranasal-sinuses',
    name: 'Paranasal Sinuses Overview',
    domain: 'medicine',
    category: 'nose-anatomy',
    tags: ['paranasal sinuses', 'frontal', 'maxillary', 'ethmoid', 'sphenoid', 'overview'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="16" ry="6" fill="#4169E1" opacity="0.3"/>
      <ellipse cx="32" cy="12" rx="16" ry="6"/>
      <ellipse cx="18" cy="36" rx="10" ry="12" fill="#22c55e" opacity="0.3"/>
      <ellipse cx="18" cy="36" rx="10" ry="12"/>
      <ellipse cx="46" cy="36" rx="10" ry="12" fill="#22c55e" opacity="0.3"/>
      <ellipse cx="46" cy="36" rx="10" ry="12"/>
      <rect x="28" y="24" width="8" height="16" rx="1" fill="#f59e0b" opacity="0.3"/>
      <rect x="28" y="24" width="8" height="16" rx="1"/>
      <ellipse cx="32" cy="52" rx="10" ry="4" fill="#ef4444" opacity="0.3"/>
      <ellipse cx="32" cy="52" rx="10" ry="4"/>
      <text x="26" y="14" font-size="3" fill="currentColor" stroke="none">F</text>
      <text x="14" y="38" font-size="3" fill="currentColor" stroke="none">M</text>
      <text x="42" y="38" font-size="3" fill="currentColor" stroke="none">M</text>
      <text x="30" y="34" font-size="3" fill="currentColor" stroke="none">E</text>
      <text x="28" y="54" font-size="3" fill="currentColor" stroke="none">S</text>
    </svg>`
  },
  {
    id: 'ent-olfactory-region',
    name: 'Olfactory Region',
    domain: 'medicine',
    category: 'nose-anatomy',
    tags: ['olfactory', 'smell', 'olfactory epithelium', 'cribriform plate', 'olfactory bulb'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="20" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="16" rx="20" ry="8"/>
      <path d="M20 24v32"/>
      <path d="M44 24v32"/>
      <path d="M32 24v20"/>
      <path d="M32 16l-8-8"/>
      <path d="M32 16l8-8"/>
      <circle cx="24" cy="8" r="3" fill="currentColor" opacity="0.4"/>
      <circle cx="40" cy="8" r="3" fill="currentColor" opacity="0.4"/>
      <path d="M24 24c2 2 4 2 8 0"/>
      <path d="M32 24c2 2 4 2 8 0"/>
      <text x="8" y="12" font-size="3" fill="currentColor" stroke="none">Olf. Bulb</text>
      <text x="8" y="28" font-size="3" fill="currentColor" stroke="none">Epithelium</text>
    </svg>`
  },
  {
    id: 'ent-nasal-valve',
    name: 'Nasal Valve',
    domain: 'medicine',
    category: 'nose-anatomy',
    tags: ['nasal valve', 'internal valve', 'external valve', 'airway', 'obstruction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 56V32c0-12 8-24 16-24s16 12 16 24v24"/>
      <path d="M20 40l8-8 8 8" stroke-dasharray="3 2"/>
      <path d="M24 32l4-6 4 6" stroke-width="2"/>
      <ellipse cx="32" cy="24" rx="6" ry="4" fill="currentColor" opacity="0.2"/>
      <text x="40" y="28" font-size="3" fill="currentColor" stroke="none">Internal</text>
      <text x="40" y="44" font-size="3" fill="currentColor" stroke="none">External</text>
      <path d="M36 24l8 0"/>
      <path d="M36 40l8 0"/>
    </svg>`
  },

  // ===========================================================================
  // THROAT/LARYNX ANATOMY (10 icons)
  // ===========================================================================
  {
    id: 'ent-pharynx',
    name: 'Pharynx',
    domain: 'medicine',
    category: 'throat-anatomy',
    tags: ['pharynx', 'nasopharynx', 'oropharynx', 'hypopharynx', 'throat'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8h32v48c0 4-8 4-16 4s-16 0-16-4V8z" fill="currentColor" opacity="0.1"/>
      <path d="M16 8h32v48c0 4-8 4-16 4s-16 0-16-4V8z"/>
      <line x1="16" y1="20" x2="48" y2="20" stroke-dasharray="4 2"/>
      <line x1="16" y1="36" x2="48" y2="36" stroke-dasharray="4 2"/>
      <text x="20" y="16" font-size="4" fill="currentColor" stroke="none">Naso</text>
      <text x="20" y="30" font-size="4" fill="currentColor" stroke="none">Oro</text>
      <text x="20" y="46" font-size="4" fill="currentColor" stroke="none">Hypo</text>
    </svg>`
  },
  {
    id: 'ent-larynx',
    name: 'Larynx',
    domain: 'medicine',
    category: 'throat-anatomy',
    tags: ['larynx', 'voice box', 'glottis', 'supraglottis', 'subglottis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8l12 8 12-8v16l-12 8-12-8V8z" fill="currentColor" opacity="0.1"/>
      <path d="M20 8l12 8 12-8"/>
      <path d="M20 8v16l12 8 12-8V8"/>
      <ellipse cx="32" cy="40" rx="14" ry="8" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="40" rx="14" ry="8"/>
      <path d="M26 40c0-2 3-4 6-4s6 2 6 4"/>
      <path d="M18 48v8c0 4 6 4 14 4s14 0 14-4v-8"/>
      <text x="38" y="16" font-size="3" fill="currentColor" stroke="none">Epiglottis</text>
      <text x="38" y="42" font-size="3" fill="currentColor" stroke="none">Glottis</text>
    </svg>`
  },
  {
    id: 'ent-vocal-cords',
    name: 'Vocal Cords',
    domain: 'medicine',
    category: 'throat-anatomy',
    tags: ['vocal cords', 'vocal folds', 'true cords', 'false cords', 'arytenoids'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <path d="M14 28c12 8 24 8 36 0" fill="currentColor" opacity="0.2"/>
      <path d="M14 28c12 8 24 8 36 0"/>
      <path d="M14 36c12-8 24-8 36 0" fill="currentColor" opacity="0.2"/>
      <path d="M14 36c12-8 24-8 36 0"/>
      <ellipse cx="32" cy="32" rx="8" ry="3" fill="currentColor" opacity="0.05"/>
      <circle cx="20" cy="44" r="3"/>
      <circle cx="44" cy="44" r="3"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Arytenoids</text>
    </svg>`
  },
  {
    id: 'ent-epiglottis',
    name: 'Epiglottis',
    domain: 'medicine',
    category: 'throat-anatomy',
    tags: ['epiglottis', 'swallowing', 'airway protection', 'larynx'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-12 0-20 12-20 28 0 8 4 12 8 12h24c4 0 8-4 8-12 0-16-8-28-20-28z" fill="currentColor" opacity="0.2"/>
      <path d="M32 8c-12 0-20 12-20 28 0 8 4 12 8 12h24c4 0 8-4 8-12 0-16-8-28-20-28z"/>
      <path d="M24 48v8"/>
      <path d="M40 48v8"/>
      <line x1="16" y1="56" x2="48" y2="56"/>
      <path d="M32 20v16" stroke-dasharray="2 2"/>
      <text x="34" y="34" font-size="4" fill="currentColor" stroke="none">Epiglottis</text>
    </svg>`
  },
  {
    id: 'ent-tonsils',
    name: 'Palatine Tonsils',
    domain: 'medicine',
    category: 'throat-anatomy',
    tags: ['tonsils', 'palatine', 'tonsillar', 'crypts', 'Waldeyer ring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8h48v48H8z" fill="currentColor" opacity="0.05"/>
      <ellipse cx="18" cy="32" rx="10" ry="16" fill="#ef4444" opacity="0.3"/>
      <ellipse cx="18" cy="32" rx="10" ry="16"/>
      <ellipse cx="46" cy="32" rx="10" ry="16" fill="#ef4444" opacity="0.3"/>
      <ellipse cx="46" cy="32" rx="10" ry="16"/>
      <path d="M28 20c4 4 4 20 0 24"/>
      <path d="M36 20c-4 4-4 20 0 24"/>
      <ellipse cx="32" cy="56" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">L</text>
      <text x="48" y="58" font-size="4" fill="currentColor" stroke="none">R</text>
    </svg>`
  },
  {
    id: 'ent-adenoids',
    name: 'Adenoids',
    domain: 'medicine',
    category: 'throat-anatomy',
    tags: ['adenoids', 'pharyngeal tonsil', 'nasopharynx', 'lymphoid', 'Waldeyer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 12h40v16c0 8-8 12-20 12s-20-4-20-12V12z" fill="currentColor" opacity="0.1"/>
      <path d="M12 12h40v16c0 8-8 12-20 12s-20-4-20-12V12z"/>
      <ellipse cx="32" cy="22" rx="14" ry="8" fill="#ef4444" opacity="0.3"/>
      <ellipse cx="32" cy="22" rx="14" ry="8"/>
      <path d="M24 40v16"/>
      <path d="M40 40v16"/>
      <circle cx="24" cy="22" r="2" stroke-dasharray="1 1"/>
      <circle cx="32" cy="22" r="2" stroke-dasharray="1 1"/>
      <circle cx="40" cy="22" r="2" stroke-dasharray="1 1"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Adenoid</text>
    </svg>`
  },
  {
    id: 'ent-salivary-glands',
    name: 'Salivary Glands',
    domain: 'medicine',
    category: 'throat-anatomy',
    tags: ['salivary', 'parotid', 'submandibular', 'sublingual', 'glands'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="20" rx="10" ry="12" fill="#f59e0b" opacity="0.3"/>
      <ellipse cx="16" cy="20" rx="10" ry="12"/>
      <ellipse cx="48" cy="20" rx="10" ry="12" fill="#f59e0b" opacity="0.3"/>
      <ellipse cx="48" cy="20" rx="10" ry="12"/>
      <ellipse cx="24" cy="44" rx="8" ry="6" fill="#22c55e" opacity="0.3"/>
      <ellipse cx="24" cy="44" rx="8" ry="6"/>
      <ellipse cx="40" cy="44" rx="8" ry="6" fill="#22c55e" opacity="0.3"/>
      <ellipse cx="40" cy="44" rx="8" ry="6"/>
      <ellipse cx="32" cy="56" rx="6" ry="4" fill="#3b82f6" opacity="0.3"/>
      <ellipse cx="32" cy="56" rx="6" ry="4"/>
      <text x="10" y="36" font-size="3" fill="currentColor" stroke="none">Parotid</text>
      <text x="16" y="54" font-size="3" fill="currentColor" stroke="none">Submand</text>
    </svg>`
  },
  {
    id: 'ent-thyroid-location',
    name: 'Thyroid Location',
    domain: 'medicine',
    category: 'throat-anatomy',
    tags: ['thyroid', 'gland', 'neck', 'trachea', 'isthmus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v48H24z" fill="currentColor" opacity="0.1"/>
      <path d="M24 8h16"/>
      <path d="M24 8v48"/>
      <path d="M40 8v48"/>
      <path d="M8 24c8 8 12 24 12 32"/>
      <path d="M56 24c-8 8-12 24-12 32"/>
      <path d="M8 24c0-8 8-12 16-12"/>
      <path d="M56 24c0-8-8-12-16-12"/>
      <ellipse cx="16" cy="36" rx="8" ry="16" fill="#ef4444" opacity="0.3"/>
      <ellipse cx="48" cy="36" rx="8" ry="16" fill="#ef4444" opacity="0.3"/>
      <rect x="24" y="32" width="16" height="8" fill="#ef4444" opacity="0.3"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Thyroid</text>
    </svg>`
  },
  {
    id: 'ent-hyoid-bone',
    name: 'Hyoid Bone',
    domain: 'medicine',
    category: 'throat-anatomy',
    tags: ['hyoid', 'bone', 'neck', 'larynx', 'swallowing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 28c0-8 8-12 16-12s16 4 16 12" stroke-width="2"/>
      <path d="M16 28l-8 12" stroke-width="2"/>
      <path d="M48 28l8 12" stroke-width="2"/>
      <rect x="24" y="24" width="16" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="24" width="16" height="8" rx="2"/>
      <path d="M32 32v24"/>
      <path d="M24 48h16"/>
      <text x="8" y="44" font-size="3" fill="currentColor" stroke="none">Horn</text>
      <text x="24" y="60" font-size="4" fill="currentColor" stroke="none">Trachea</text>
    </svg>`
  },
  {
    id: 'ent-cricoid-cartilage',
    name: 'Cricoid Cartilage',
    domain: 'medicine',
    category: 'throat-anatomy',
    tags: ['cricoid', 'cartilage', 'larynx', 'ring', 'airway'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <ellipse cx="32" cy="32" rx="12" ry="10"/>
      <path d="M32 16v-8" stroke-width="2"/>
      <path d="M28 8h8"/>
      <path d="M32 48v8" stroke-width="2"/>
      <path d="M28 56h8"/>
      <rect x="24" y="12" width="16" height="8" rx="1" fill="currentColor" opacity="0.2"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Cricoid Ring</text>
    </svg>`
  },

  // ===========================================================================
  // EAR PATHOLOGY (10 icons)
  // ===========================================================================
  {
    id: 'ent-otitis-media',
    name: 'Otitis Media',
    domain: 'medicine',
    category: 'ear-pathology',
    tags: ['otitis media', 'middle ear infection', 'AOM', 'effusion', 'OME'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24" fill="#ef4444" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <path d="M20 20c4 1 8 2 12 6"/>
      <circle cx="32" cy="42" r="3" fill="#ef4444"/>
      <path d="M22 44c4 1 12 1 20 0"/>
      <path d="M18 36h28" stroke="#f59e0b" stroke-width="2" stroke-dasharray="2 2"/>
      <circle cx="28" cy="50" r="2" fill="#f59e0b"/>
      <circle cx="36" cy="48" r="2" fill="#f59e0b"/>
      <text x="8" y="58" font-size="4" fill="#ef4444" stroke="none">Infected</text>
    </svg>`
  },
  {
    id: 'ent-otitis-externa',
    name: 'Otitis Externa',
    domain: 'medicine',
    category: 'ear-pathology',
    tags: ['otitis externa', 'swimmers ear', 'ear canal infection', 'external'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28h20c4 0 8 3 8 8s-4 8-8 8H8"/>
      <path d="M36 36h20"/>
      <ellipse cx="56" cy="36" rx="2" ry="6"/>
      <path d="M12 32h12" stroke="#ef4444" stroke-width="3" opacity="0.5"/>
      <path d="M12 40h12" stroke="#ef4444" stroke-width="3" opacity="0.5"/>
      <circle cx="20" cy="36" r="2" fill="#ef4444"/>
      <circle cx="28" cy="34" r="1" fill="#ef4444"/>
      <circle cx="26" cy="38" r="1" fill="#ef4444"/>
      <text x="4" y="56" font-size="4" fill="#ef4444" stroke="none">Inflamed Canal</text>
    </svg>`
  },
  {
    id: 'ent-cholesteatoma',
    name: 'Cholesteatoma',
    domain: 'medicine',
    category: 'ear-pathology',
    tags: ['cholesteatoma', 'keratoma', 'middle ear', 'erosive', 'retraction pocket'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <path d="M24 16c4 1 8 4 10 10"/>
      <ellipse cx="36" cy="40" rx="12" ry="10" fill="#8b5cf6" opacity="0.3"/>
      <ellipse cx="36" cy="40" rx="12" ry="10"/>
      <path d="M30 36c4 1 8 2 10 6"/>
      <circle cx="38" cy="42" r="4" fill="#8b5cf6" opacity="0.5"/>
      <path d="M48 32l8-4"/>
      <text x="52" y="30" font-size="3" fill="currentColor" stroke="none">Mass</text>
      <text x="4" y="58" font-size="4" fill="#8b5cf6" stroke="none">Cholesteatoma</text>
    </svg>`
  },
  {
    id: 'ent-conductive-hearing-loss',
    name: 'Conductive Hearing Loss',
    domain: 'medicine',
    category: 'ear-pathology',
    tags: ['conductive', 'hearing loss', 'CHL', 'middle ear', 'ossicles'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h16"/>
      <ellipse cx="28" cy="32" rx="4" ry="8"/>
      <path d="M32 32h8" stroke="#ef4444" stroke-width="2"/>
      <path d="M36 28l4 4-4 4" stroke="#ef4444" stroke-width="2"/>
      <circle cx="48" cy="32" r="8"/>
      <path d="M40 32c0-4 4-8 8-8" stroke-dasharray="2 2"/>
      <path d="M36 24l4 4" stroke="#ef4444"/>
      <path d="M36 40l4-4" stroke="#ef4444"/>
      <text x="4" y="20" font-size="4" fill="currentColor" stroke="none">Outer</text>
      <text x="40" y="20" font-size="4" fill="currentColor" stroke="none">Inner</text>
      <text x="28" y="56" font-size="4" fill="#ef4444" stroke="none">Block</text>
    </svg>`
  },
  {
    id: 'ent-sensorineural-hearing-loss',
    name: 'Sensorineural Hearing Loss',
    domain: 'medicine',
    category: 'ear-pathology',
    tags: ['sensorineural', 'hearing loss', 'SNHL', 'cochlea', 'nerve'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h16"/>
      <ellipse cx="28" cy="32" rx="4" ry="8"/>
      <path d="M32 32h8"/>
      <path d="M48 44c-8 0-12-4-12-12s4-12 8-14"/>
      <path d="M48 40c-4 0-8-2-8-8s2-8 6-9"/>
      <circle cx="48" cy="32" r="4" fill="#ef4444" opacity="0.5"/>
      <path d="M52 32l8 0" stroke="#ef4444" stroke-width="2"/>
      <path d="M56 28l4 4-4 4" stroke="#ef4444"/>
      <path d="M56 24l4 4" stroke="#ef4444"/>
      <path d="M56 40l4-4" stroke="#ef4444"/>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Sound OK</text>
      <text x="36" y="56" font-size="4" fill="#ef4444" stroke="none">Cochlea</text>
    </svg>`
  },
  {
    id: 'ent-vertigo',
    name: 'Vertigo',
    domain: 'medicine',
    category: 'ear-pathology',
    tags: ['vertigo', 'dizziness', 'spinning', 'vestibular', 'BPPV'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M32 12a20 20 0 0 1 14 6" stroke-dasharray="4 2"/>
      <path d="M52 32a20 20 0 0 1-6 14" stroke-dasharray="4 2"/>
      <path d="M32 52a20 20 0 0 1-14-6" stroke-dasharray="4 2"/>
      <path d="M12 32a20 20 0 0 1 6-14" stroke-dasharray="4 2"/>
      <path d="M32 24c4 0 8 4 8 8s-4 8-8 8-8-4-8-8"/>
      <path d="M28 28l8 8"/>
      <path d="M36 28l-8 8"/>
      <path d="M44 20l4-4"/>
      <path d="M48 16l-2 6 6-2"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Spinning</text>
    </svg>`
  },
  {
    id: 'ent-menieres-disease',
    name: "Meniere's Disease",
    domain: 'medicine',
    category: 'ear-pathology',
    tags: ['Meniere', 'endolymphatic hydrops', 'vertigo', 'tinnitus', 'hearing loss'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 48c-8 0-12-6-12-16s4-16 12-20"/>
      <path d="M24 44c-4 0-8-4-8-12s4-12 8-14"/>
      <path d="M24 40c-2 0-4-2-4-8s2-8 4-9"/>
      <ellipse cx="40" cy="36" rx="12" ry="16" fill="#3b82f6" opacity="0.3"/>
      <ellipse cx="40" cy="36" rx="12" ry="16"/>
      <path d="M36 28c2 0 4 2 4 8s-2 8-4 8"/>
      <circle cx="40" cy="36" r="4" fill="#3b82f6"/>
      <path d="M52 20l4 0"/>
      <path d="M52 28l6 0"/>
      <path d="M52 36l4 0"/>
      <text x="4" y="58" font-size="4" fill="#3b82f6" stroke="none">Hydrops</text>
    </svg>`
  },
  {
    id: 'ent-tinnitus',
    name: 'Tinnitus',
    domain: 'medicine',
    category: 'ear-pathology',
    tags: ['tinnitus', 'ringing', 'ear noise', 'hearing', 'perception'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M40 8c10 4 14 14 12 24-2 10-8 18-16 20"/>
      <path d="M28 26c-2 1-4 4-4 8"/>
      <path d="M36 16c4 2 6 6 6 12"/>
      <path d="M16 32c0-2 2-4 4-4"/>
      <path d="M8 28c4-2 8 0 8 4"/>
      <path d="M6 36c2 0 4 2 4 4"/>
      <path d="M12 40l-4 4"/>
      <path d="M8 24l-4-2"/>
      <path d="M4 32l-2 0"/>
      <circle cx="20" cy="32" r="2" fill="currentColor"/>
      <text x="20" y="56" font-size="4" fill="currentColor" stroke="none">Ringing</text>
    </svg>`
  },
  {
    id: 'ent-perforated-tm',
    name: 'Perforated Tympanic Membrane',
    domain: 'medicine',
    category: 'ear-pathology',
    tags: ['perforation', 'TM', 'eardrum', 'rupture', 'trauma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <path d="M20 16c6 1 10 3 12 8"/>
      <path d="M32 24v8"/>
      <ellipse cx="32" cy="42" rx="8" ry="6" fill="#ef4444" opacity="0.3"/>
      <path d="M24 42c4-4 12-4 16 0" stroke="#ef4444"/>
      <path d="M24 42c4 4 12 4 16 0" stroke="#ef4444"/>
      <path d="M28 40l8 4"/>
      <path d="M28 44l8-4"/>
      <text x="8" y="58" font-size="4" fill="#ef4444" stroke="none">Perforation</text>
    </svg>`
  },
  {
    id: 'ent-acoustic-neuroma',
    name: 'Acoustic Neuroma',
    domain: 'medicine',
    category: 'ear-pathology',
    tags: ['acoustic neuroma', 'vestibular schwannoma', 'CPA tumor', 'CN VIII'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 48c-6 0-8-6-8-16s4-16 10-20"/>
      <path d="M16 42c-3 0-6-4-6-10s3-10 6-12"/>
      <circle cx="16" cy="32" r="2" fill="currentColor"/>
      <path d="M18 32h12"/>
      <ellipse cx="42" cy="32" rx="14" ry="18" fill="#8b5cf6" opacity="0.3"/>
      <ellipse cx="42" cy="32" rx="14" ry="18"/>
      <circle cx="42" cy="32" r="6" fill="#8b5cf6"/>
      <path d="M48 20l8-4"/>
      <text x="52" y="18" font-size="4" fill="currentColor" stroke="none">Tumor</text>
      <text x="4" y="58" font-size="4" fill="#8b5cf6" stroke="none">CN VIII</text>
    </svg>`
  },

  // ===========================================================================
  // NOSE PATHOLOGY (8 icons)
  // ===========================================================================
  {
    id: 'ent-sinusitis',
    name: 'Sinusitis',
    domain: 'medicine',
    category: 'nose-pathology',
    tags: ['sinusitis', 'sinus infection', 'rhinosinusitis', 'congestion', 'inflammation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="16" ry="6"/>
      <ellipse cx="18" cy="36" rx="10" ry="12" fill="#ef4444" opacity="0.3"/>
      <ellipse cx="18" cy="36" rx="10" ry="12"/>
      <ellipse cx="46" cy="36" rx="10" ry="12" fill="#ef4444" opacity="0.3"/>
      <ellipse cx="46" cy="36" rx="10" ry="12"/>
      <path d="M18 30c0 4 1 8 0 12" stroke="#f59e0b" stroke-width="2"/>
      <path d="M46 30c0 4 1 8 0 12" stroke="#f59e0b" stroke-width="2"/>
      <circle cx="18" cy="40" r="3" fill="#f59e0b"/>
      <circle cx="46" cy="40" r="3" fill="#f59e0b"/>
      <text x="8" y="58" font-size="4" fill="#ef4444" stroke="none">Infected</text>
    </svg>`
  },
  {
    id: 'ent-nasal-polyps',
    name: 'Nasal Polyps',
    domain: 'medicine',
    category: 'nose-pathology',
    tags: ['nasal polyps', 'polyposis', 'obstruction', 'chronic', 'bilateral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 56V20c0-8 8-12 20-12s20 4 20 12v36"/>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <ellipse cx="22" cy="28" rx="6" ry="8" fill="#8b5cf6" opacity="0.4"/>
      <ellipse cx="22" cy="28" rx="6" ry="8"/>
      <ellipse cx="24" cy="44" rx="4" ry="6" fill="#8b5cf6" opacity="0.4"/>
      <ellipse cx="24" cy="44" rx="4" ry="6"/>
      <ellipse cx="42" cy="32" rx="5" ry="7" fill="#8b5cf6" opacity="0.4"/>
      <ellipse cx="42" cy="32" rx="5" ry="7"/>
      <text x="8" y="58" font-size="4" fill="#8b5cf6" stroke="none">Polyps</text>
    </svg>`
  },
  {
    id: 'ent-deviated-septum',
    name: 'Deviated Septum',
    domain: 'medicine',
    category: 'nose-pathology',
    tags: ['deviated septum', 'septal deviation', 'obstruction', 'DNS', 'nasal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 56V20c0-8 8-12 20-12s20 4 20 12v36"/>
      <path d="M32 8c-4 16 4 32-2 48" stroke-width="2"/>
      <path d="M18 24c4 1 8 1 8 0"/>
      <path d="M38 24c4-1 8-1 10 0"/>
      <path d="M16 40c4 2 10 2 10 0"/>
      <path d="M38 38c6 0 10 1 12 0"/>
      <path d="M36 28l8 0" stroke="#ef4444" stroke-dasharray="2 2"/>
      <text x="42" y="32" font-size="3" fill="#ef4444" stroke="none">Narrow</text>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Deviated</text>
    </svg>`
  },
  {
    id: 'ent-epistaxis',
    name: 'Epistaxis (Nosebleed)',
    domain: 'medicine',
    category: 'nose-pathology',
    tags: ['epistaxis', 'nosebleed', 'hemorrhage', 'anterior', 'posterior', 'Kiesselbach'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v32c0 8-4 16-8 16s-8-8-8-16V8z" fill="currentColor" opacity="0.1"/>
      <path d="M24 8h16v32c0 8-4 16-8 16s-8-8-8-16V8z"/>
      <line x1="32" y1="8" x2="32" y2="44"/>
      <circle cx="30" cy="20" r="3" fill="#ef4444"/>
      <path d="M30 23v24" stroke="#ef4444" stroke-width="2"/>
      <path d="M28 32c-2 4-4 8-4 16" stroke="#ef4444"/>
      <path d="M32 36c2 4 4 8 4 16" stroke="#ef4444"/>
      <ellipse cx="28" cy="52" rx="4" ry="2" fill="#ef4444"/>
      <text x="38" y="22" font-size="3" fill="#ef4444" stroke="none">Little's Area</text>
    </svg>`
  },
  {
    id: 'ent-allergic-rhinitis',
    name: 'Allergic Rhinitis',
    domain: 'medicine',
    category: 'nose-pathology',
    tags: ['allergic rhinitis', 'hay fever', 'allergy', 'sneezing', 'rhinorrhea'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 16h16v28c0 6-4 12-8 12s-8-6-8-12V16z"/>
      <path d="M20 24c-4-4-8-8-12-8"/>
      <path d="M44 24c4-4 8-8 12-8"/>
      <path d="M18 32c-6 0-10-2-12-4"/>
      <path d="M46 32c6 0 10-2 12-4"/>
      <circle cx="8" cy="16" r="2" fill="#f59e0b"/>
      <circle cx="56" cy="16" r="2" fill="#f59e0b"/>
      <circle cx="6" cy="28" r="2" fill="#f59e0b"/>
      <circle cx="58" cy="28" r="2" fill="#f59e0b"/>
      <path d="M28 28c0 4 2 8 4 8s4-4 4-8" stroke="#3b82f6"/>
      <text x="8" y="58" font-size="4" fill="#f59e0b" stroke="none">Allergens</text>
    </svg>`
  },
  {
    id: 'ent-anosmia',
    name: 'Anosmia',
    domain: 'medicine',
    category: 'nose-pathology',
    tags: ['anosmia', 'smell loss', 'olfactory', 'hyposmia', 'dysosmia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 20h16v28c0 6-4 10-8 10s-8-4-8-10V20z"/>
      <ellipse cx="32" cy="12" rx="12" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="12" rx="12" ry="4"/>
      <path d="M24 12l-8-4"/>
      <path d="M40 12l8-4"/>
      <circle cx="16" cy="8" r="2" stroke-dasharray="2 1"/>
      <circle cx="48" cy="8" r="2" stroke-dasharray="2 1"/>
      <path d="M20 12l4 8" stroke="#ef4444" stroke-width="2"/>
      <path d="M24 12l-4 8" stroke="#ef4444" stroke-width="2"/>
      <path d="M40 12l4 8" stroke="#ef4444" stroke-width="2"/>
      <path d="M44 12l-4 8" stroke="#ef4444" stroke-width="2"/>
      <text x="8" y="58" font-size="4" fill="#ef4444" stroke="none">No Smell</text>
    </svg>`
  },
  {
    id: 'ent-nasal-fracture',
    name: 'Nasal Fracture',
    domain: 'medicine',
    category: 'nose-pathology',
    tags: ['nasal fracture', 'broken nose', 'trauma', 'septum', 'bone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v40c0 4-4 8-8 8s-8-4-8-8V8z" fill="currentColor" opacity="0.1"/>
      <path d="M24 8h16"/>
      <path d="M24 8v20l-4 4v16c0 4 6 8 12 8"/>
      <path d="M40 8v40c0 4-4 8-8 8"/>
      <path d="M20 32l8-4 4 6 8-6" stroke="#ef4444" stroke-width="2"/>
      <path d="M28 24l-4 4" stroke="#ef4444"/>
      <path d="M32 20l4 8" stroke="#ef4444"/>
      <circle cx="18" cy="36" r="3" fill="#8b5cf6" opacity="0.5"/>
      <circle cx="44" cy="32" r="4" fill="#8b5cf6" opacity="0.5"/>
      <text x="8" y="58" font-size="4" fill="#ef4444" stroke="none">Fracture</text>
    </svg>`
  },
  {
    id: 'ent-nasal-obstruction',
    name: 'Nasal Obstruction',
    domain: 'medicine',
    category: 'nose-pathology',
    tags: ['nasal obstruction', 'congestion', 'blocked nose', 'airway', 'turbinate hypertrophy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 56V20c0-8 8-12 20-12s20 4 20 12v36"/>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <path d="M14 24c8 6 14 8 16 0" fill="#ef4444" opacity="0.3"/>
      <path d="M14 24c8 6 14 8 16 0"/>
      <path d="M14 40c10 8 16 10 16 0" fill="#ef4444" opacity="0.3"/>
      <path d="M14 40c10 8 16 10 16 0"/>
      <path d="M16 16l4 4-4 4" stroke="#ef4444"/>
      <path d="M18 20h-10" stroke="#ef4444" stroke-dasharray="2 2"/>
      <text x="34" y="34" font-size="3" fill="currentColor" stroke="none">Airflow</text>
      <text x="34" y="40" font-size="3" fill="#22c55e" stroke="none">OK</text>
    </svg>`
  },

  // ===========================================================================
  // THROAT PATHOLOGY (10 icons)
  // ===========================================================================
  {
    id: 'ent-pharyngitis',
    name: 'Pharyngitis',
    domain: 'medicine',
    category: 'throat-pathology',
    tags: ['pharyngitis', 'sore throat', 'strep', 'viral', 'throat infection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8h32v48c0 4-8 4-16 4s-16 0-16-4V8z" fill="#ef4444" opacity="0.2"/>
      <path d="M16 8h32v48c0 4-8 4-16 4s-16 0-16-4V8z"/>
      <ellipse cx="24" cy="28" rx="6" ry="10" fill="#ef4444" opacity="0.4"/>
      <ellipse cx="40" cy="28" rx="6" ry="10" fill="#ef4444" opacity="0.4"/>
      <circle cx="24" cy="26" r="2" fill="#f59e0b"/>
      <circle cx="40" cy="26" r="2" fill="#f59e0b"/>
      <circle cx="24" cy="32" r="2" fill="#f59e0b"/>
      <circle cx="40" cy="32" r="2" fill="#f59e0b"/>
      <path d="M28 44c4 4 4 8 4 8"/>
      <path d="M36 44c-4 4-4 8-4 8"/>
      <text x="12" y="58" font-size="4" fill="#ef4444" stroke="none">Inflamed</text>
    </svg>`
  },
  {
    id: 'ent-tonsillitis',
    name: 'Tonsillitis',
    domain: 'medicine',
    category: 'throat-pathology',
    tags: ['tonsillitis', 'tonsil infection', 'strep', 'exudate', 'peritonsillar'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8h48v48H8z" fill="currentColor" opacity="0.05"/>
      <ellipse cx="16" cy="32" rx="10" ry="18" fill="#ef4444" opacity="0.4"/>
      <ellipse cx="16" cy="32" rx="10" ry="18"/>
      <ellipse cx="48" cy="32" rx="10" ry="18" fill="#ef4444" opacity="0.4"/>
      <ellipse cx="48" cy="32" rx="10" ry="18"/>
      <circle cx="14" cy="26" r="2" fill="#f59e0b"/>
      <circle cx="18" cy="34" r="2" fill="#f59e0b"/>
      <circle cx="14" cy="40" r="2" fill="#f59e0b"/>
      <circle cx="46" cy="28" r="2" fill="#f59e0b"/>
      <circle cx="50" cy="36" r="2" fill="#f59e0b"/>
      <path d="M26 24c4 4 4 16 0 20"/>
      <path d="M38 24c-4 4-4 16 0 20"/>
      <text x="20" y="58" font-size="4" fill="#ef4444" stroke="none">Exudate</text>
    </svg>`
  },
  {
    id: 'ent-laryngitis',
    name: 'Laryngitis',
    domain: 'medicine',
    category: 'throat-pathology',
    tags: ['laryngitis', 'voice loss', 'hoarseness', 'vocal cord inflammation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="#ef4444" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <path d="M12 28c14 8 28 8 40 0" fill="#ef4444" opacity="0.4"/>
      <path d="M12 28c14 8 28 8 40 0" stroke="#ef4444"/>
      <path d="M12 36c14-8 28-8 40 0" fill="#ef4444" opacity="0.4"/>
      <path d="M12 36c14-8 28-8 40 0" stroke="#ef4444"/>
      <ellipse cx="32" cy="32" rx="6" ry="2" fill="currentColor" opacity="0.1"/>
      <path d="M48 16l8-4"/>
      <path d="M52 12l4 1"/>
      <path d="M52 12l1-4"/>
      <text x="8" y="58" font-size="4" fill="#ef4444" stroke="none">Swollen Cords</text>
    </svg>`
  },
  {
    id: 'ent-vocal-cord-nodules',
    name: 'Vocal Cord Nodules',
    domain: 'medicine',
    category: 'throat-pathology',
    tags: ['vocal nodules', 'singer nodules', 'voice abuse', 'bilateral', 'hoarseness'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <path d="M12 28c14 6 28 6 40 0"/>
      <path d="M12 36c14-6 28-6 40 0"/>
      <ellipse cx="32" cy="32" rx="8" ry="3"/>
      <circle cx="28" cy="30" r="4" fill="#f59e0b"/>
      <circle cx="36" cy="34" r="4" fill="#f59e0b"/>
      <path d="M28 30l8 4" stroke-dasharray="2 2"/>
      <text x="40" y="20" font-size="4" fill="currentColor" stroke="none">Nodules</text>
      <text x="8" y="58" font-size="4" fill="#f59e0b" stroke="none">Bilateral</text>
    </svg>`
  },
  {
    id: 'ent-head-neck-cancer',
    name: 'Head & Neck Cancer',
    domain: 'medicine',
    category: 'throat-pathology',
    tags: ['head neck cancer', 'SCC', 'laryngeal', 'pharyngeal', 'HPV', 'malignancy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8h32v48c0 4-8 4-16 4s-16 0-16-4V8z" fill="currentColor" opacity="0.1"/>
      <path d="M16 8h32v48c0 4-8 4-16 4s-16 0-16-4V8z"/>
      <ellipse cx="36" cy="32" rx="12" ry="14" fill="#8b5cf6" opacity="0.4"/>
      <ellipse cx="36" cy="32" rx="12" ry="14"/>
      <path d="M32 24c4 1 8 4 8 8"/>
      <path d="M32 40c4-1 8-4 8-8"/>
      <circle cx="36" cy="32" r="4" fill="#8b5cf6"/>
      <path d="M24 48c4-4 12-4 16 0"/>
      <text x="4" y="58" font-size="4" fill="#8b5cf6" stroke="none">Tumor</text>
    </svg>`
  },
  {
    id: 'ent-sleep-apnea',
    name: 'Sleep Apnea (OSA)',
    domain: 'medicine',
    category: 'throat-pathology',
    tags: ['sleep apnea', 'OSA', 'obstruction', 'snoring', 'CPAP', 'hypopnea'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 12h32v20c0 8-8 12-16 12s-16-4-16-12V12z" fill="currentColor" opacity="0.1"/>
      <path d="M16 12h32"/>
      <path d="M16 12v20c0 8 8 12 16 12"/>
      <path d="M48 12v20c0 8-8 12-16 12"/>
      <ellipse cx="32" cy="28" rx="8" ry="6" fill="#ef4444" opacity="0.4"/>
      <path d="M24 28c4 4 12 4 16 0"/>
      <path d="M28 24c2 2 4 2 8 0"/>
      <path d="M32 44v8"/>
      <path d="M24 52h16"/>
      <path d="M16 20c-4-2-8-4-8 0s4 4 8 4" stroke="#3b82f6"/>
      <path d="M48 20c4-2 8-4 8 0s-4 4-8 4" stroke="#3b82f6"/>
      <text x="4" y="58" font-size="4" fill="#ef4444" stroke="none">Collapsed</text>
    </svg>`
  },
  {
    id: 'ent-dysphagia',
    name: 'Dysphagia',
    domain: 'medicine',
    category: 'throat-pathology',
    tags: ['dysphagia', 'swallowing difficulty', 'oropharyngeal', 'esophageal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v48H24z" fill="currentColor" opacity="0.1"/>
      <path d="M24 8h16"/>
      <path d="M24 8v48"/>
      <path d="M40 8v48"/>
      <circle cx="32" cy="20" r="4" fill="#3b82f6"/>
      <path d="M32 24v8" stroke="#3b82f6" stroke-dasharray="2 2"/>
      <path d="M28 36h8" stroke="#ef4444" stroke-width="3"/>
      <circle cx="32" cy="36" r="4" fill="#3b82f6"/>
      <path d="M28 28l-4 4 4 4" stroke="#ef4444"/>
      <path d="M36 28l4 4-4 4" stroke="#ef4444"/>
      <text x="4" y="40" font-size="4" fill="#ef4444" stroke="none">Block</text>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Dysphagia</text>
    </svg>`
  },
  {
    id: 'ent-epiglottitis',
    name: 'Epiglottitis',
    domain: 'medicine',
    category: 'throat-pathology',
    tags: ['epiglottitis', 'supraglottitis', 'airway emergency', 'stridor', 'Hib'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-16 0-24 16-24 32 0 8 4 12 8 12h32c4 0 8-4 8-12 0-16-8-32-24-32z" fill="#ef4444" opacity="0.3"/>
      <path d="M32 8c-16 0-24 16-24 32 0 8 4 12 8 12h32c4 0 8-4 8-12 0-16-8-32-24-32z"/>
      <path d="M24 52v4"/>
      <path d="M40 52v4"/>
      <path d="M20 32c4 1 8 1 12 0" stroke="#ef4444" stroke-width="2"/>
      <path d="M32 32c4 1 8 1 12 0" stroke="#ef4444" stroke-width="2"/>
      <circle cx="32" cy="24" r="6" fill="#ef4444"/>
      <text x="4" y="28" font-size="3" fill="#ef4444" stroke="none">Swollen!</text>
      <text x="8" y="62" font-size="4" fill="#ef4444" stroke="none">Emergency</text>
    </svg>`
  },
  {
    id: 'ent-peritonsillar-abscess',
    name: 'Peritonsillar Abscess',
    domain: 'medicine',
    category: 'throat-pathology',
    tags: ['peritonsillar abscess', 'quinsy', 'PTA', 'tonsil', 'trismus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8h48v48H8z" fill="currentColor" opacity="0.05"/>
      <ellipse cx="20" cy="32" rx="12" ry="18" fill="#ef4444" opacity="0.3"/>
      <ellipse cx="20" cy="32" rx="12" ry="18"/>
      <ellipse cx="48" cy="32" rx="8" ry="14"/>
      <circle cx="16" cy="28" r="6" fill="#f59e0b"/>
      <circle cx="16" cy="28" r="3" fill="#ef4444"/>
      <path d="M32 20c2 4 4 12 2 24"/>
      <path d="M40 24c-2 4-4 8-2 16"/>
      <path d="M8 28l8 4" stroke="#ef4444"/>
      <text x="4" y="42" font-size="3" fill="#ef4444" stroke="none">Abscess</text>
      <text x="38" y="58" font-size="4" fill="currentColor" stroke="none">Deviation</text>
    </svg>`
  },
  {
    id: 'ent-vocal-cord-paralysis',
    name: 'Vocal Cord Paralysis',
    domain: 'medicine',
    category: 'throat-pathology',
    tags: ['vocal cord paralysis', 'VCP', 'recurrent laryngeal', 'unilateral', 'bilateral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <path d="M12 30c14 4 28 4 40 0"/>
      <path d="M12 34c8-2 12-2 16 0" stroke="#22c55e" stroke-width="2"/>
      <path d="M36 34c8-2 12-2 16 0" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
      <ellipse cx="32" cy="32" rx="10" ry="4" fill="currentColor" opacity="0.1"/>
      <circle cx="20" cy="44" r="3"/>
      <circle cx="44" cy="44" r="3" stroke="#ef4444"/>
      <path d="M44 44l4-4" stroke="#ef4444"/>
      <path d="M44 44l4 4" stroke="#ef4444"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">L=OK</text>
      <text x="36" y="58" font-size="4" fill="#ef4444" stroke="none">R=Paralyzed</text>
    </svg>`
  },

  // ===========================================================================
  // EQUIPMENT (10 icons)
  // ===========================================================================
  {
    id: 'ent-otoscope',
    name: 'Otoscope',
    domain: 'medicine',
    category: 'ent-equipment',
    tags: ['otoscope', 'ear exam', 'speculum', 'diagnostic', 'pneumatic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="24" width="24" height="32" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="20" y="24" width="24" height="32" rx="4"/>
      <path d="M28 24v-8c0-2 2-4 4-4s4 2 4 4v8"/>
      <ellipse cx="32" cy="10" rx="6" ry="4"/>
      <circle cx="32" cy="40" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="40" r="8"/>
      <circle cx="32" cy="40" r="4"/>
      <path d="M32 8l0-4"/>
      <line x1="24" y1="52" x2="40" y2="52"/>
    </svg>`
  },
  {
    id: 'ent-audiometer',
    name: 'Audiometer',
    domain: 'medicine',
    category: 'ent-equipment',
    tags: ['audiometer', 'hearing test', 'audiometry', 'pure tone', 'decibels'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <rect x="14" y="22" width="20" height="12" rx="1"/>
      <path d="M18 28h4l2-4 2 8 2-6 2 4h4"/>
      <circle cx="44" cy="28" r="6"/>
      <circle cx="44" cy="28" r="3"/>
      <rect x="14" y="38" width="6" height="6" rx="1"/>
      <rect x="24" y="38" width="6" height="6" rx="1"/>
      <rect x="34" y="38" width="6" height="6" rx="1"/>
      <path d="M24 52c0 4 4 8 8 8s8-4 8-8"/>
    </svg>`
  },
  {
    id: 'ent-tuning-fork',
    name: 'Tuning Fork',
    domain: 'medicine',
    category: 'ent-equipment',
    tags: ['tuning fork', 'Weber', 'Rinne', 'hearing test', '512Hz', '256Hz'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8v24c0 4 4 8 8 8s8-4 8-8V8"/>
      <line x1="24" y1="8" x2="24" y2="4"/>
      <line x1="40" y1="8" x2="40" y2="4"/>
      <rect x="28" y="36" width="8" height="24" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="28" y="36" width="8" height="24" rx="2"/>
      <path d="M20 16l-4 0"/>
      <path d="M20 24l-6 0"/>
      <path d="M44 16l4 0"/>
      <path d="M44 24l6 0"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">512 Hz</text>
    </svg>`
  },
  {
    id: 'ent-nasal-endoscope',
    name: 'Nasal Endoscope',
    domain: 'medicine',
    category: 'ent-equipment',
    tags: ['nasal endoscope', 'rhinoscopy', 'sinuscopy', 'rigid', 'flexible'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h40c4 0 8-4 8-8V16"/>
      <circle cx="8" cy="32" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="8" cy="32" r="4"/>
      <circle cx="56" cy="12" r="4"/>
      <rect x="20" y="28" width="12" height="8" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="20" y="28" width="12" height="8" rx="2"/>
      <path d="M32 32h4"/>
      <line x1="8" y1="44" x2="8" y2="52"/>
      <path d="M4 52h8"/>
      <text x="40" y="44" font-size="4" fill="currentColor" stroke="none">0/30/70</text>
    </svg>`
  },
  {
    id: 'ent-laryngoscope',
    name: 'Laryngoscope',
    domain: 'medicine',
    category: 'ent-equipment',
    tags: ['laryngoscope', 'direct', 'indirect', 'mirror', 'flexible', 'intubation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="40" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="24" y="8" width="16" height="40" rx="4"/>
      <path d="M28 48v8h8v-8"/>
      <path d="M40 16c8 0 12 4 12 12v8c0 4-2 8-6 8"/>
      <path d="M46 44l4 8"/>
      <circle cx="32" cy="20" r="4" fill="currentColor" opacity="0.2"/>
      <line x1="28" y1="32" x2="36" y2="32"/>
      <line x1="28" y1="38" x2="36" y2="38"/>
      <circle cx="50" cy="52" r="3"/>
    </svg>`
  },
  {
    id: 'ent-hearing-aids',
    name: 'Hearing Aids',
    domain: 'medicine',
    category: 'ent-equipment',
    tags: ['hearing aid', 'BTE', 'ITE', 'CIC', 'amplification', 'assistive device'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 12c8 4 12 12 12 20 0 10-6 20-12 24"/>
      <ellipse cx="16" cy="24" rx="8" ry="12" fill="currentColor" opacity="0.2"/>
      <ellipse cx="16" cy="24" rx="8" ry="12"/>
      <path d="M24 28c0 8-4 16-8 20"/>
      <circle cx="16" cy="52" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="16" cy="52" r="4"/>
      <path d="M40 16l8-4"/>
      <path d="M48 24l8 0"/>
      <path d="M40 32l8 4"/>
      <circle cx="32" cy="24" r="2"/>
      <circle cx="32" cy="32" r="2"/>
      <text x="40" y="44" font-size="4" fill="currentColor" stroke="none">Sound</text>
    </svg>`
  },
  {
    id: 'ent-cochlear-implant',
    name: 'Cochlear Implant',
    domain: 'medicine',
    category: 'ent-equipment',
    tags: ['cochlear implant', 'CI', 'bionic ear', 'electrode', 'processor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="20" rx="12" ry="14" fill="currentColor" opacity="0.1"/>
      <ellipse cx="20" cy="20" rx="12" ry="14"/>
      <circle cx="20" cy="20" r="6" fill="currentColor" opacity="0.2"/>
      <path d="M32 20h12"/>
      <circle cx="48" cy="20" r="4" fill="#3b82f6" opacity="0.3"/>
      <circle cx="48" cy="20" r="4"/>
      <path d="M48 24v8c0 8-8 16-16 20"/>
      <path d="M32 52c-4 1-8 2-8 4"/>
      <circle cx="24" cy="58" r="2" fill="#3b82f6"/>
      <circle cx="28" cy="56" r="1" fill="#3b82f6"/>
      <circle cx="32" cy="54" r="1" fill="#3b82f6"/>
      <text x="40" y="40" font-size="3" fill="currentColor" stroke="none">Electrode</text>
    </svg>`
  },
  {
    id: 'ent-cpap-machine',
    name: 'CPAP Machine',
    domain: 'medicine',
    category: 'ent-equipment',
    tags: ['CPAP', 'BiPAP', 'sleep apnea', 'positive airway pressure', 'mask'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="32" width="28" height="24" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="32" width="28" height="24" rx="4"/>
      <rect x="12" y="36" width="12" height="8" rx="1"/>
      <path d="M16 40h4"/>
      <circle cx="30" cy="44" r="4"/>
      <path d="M36 40c8-8 16-16 20-16"/>
      <ellipse cx="56" cy="20" rx="4" ry="8"/>
      <path d="M52 16c-2-2-4-4-4-8"/>
      <path d="M60 16c2-2 4-4 4-8"/>
      <path d="M36 48l4 4"/>
      <text x="12" y="54" font-size="4" fill="currentColor" stroke="none">CPAP</text>
    </svg>`
  },
  {
    id: 'ent-tympanometer',
    name: 'Tympanometer',
    domain: 'medicine',
    category: 'ent-equipment',
    tags: ['tympanometry', 'impedance', 'middle ear', 'pressure', 'compliance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="32" height="40" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="12" width="32" height="40" rx="4"/>
      <rect x="14" y="18" width="20" height="16" rx="1"/>
      <path d="M18 26l4-6 4 8 4-4 4 6"/>
      <rect x="14" y="38" width="8" height="8" rx="1"/>
      <rect x="26" y="38" width="8" height="8" rx="1"/>
      <path d="M40 24h16"/>
      <ellipse cx="56" cy="24" rx="2" ry="4"/>
      <path d="M40 32h8"/>
      <circle cx="52" cy="32" r="2"/>
    </svg>`
  },
  {
    id: 'ent-microscope',
    name: 'ENT Microscope',
    domain: 'medicine',
    category: 'ent-equipment',
    tags: ['microscope', 'operating', 'surgical', 'ear surgery', 'magnification'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="48" width="16" height="8" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="24" y="48" width="16" height="8" rx="2"/>
      <path d="M32 48v-8"/>
      <rect x="20" y="32" width="24" height="8" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="20" y="32" width="24" height="8" rx="2"/>
      <path d="M32 32v-8"/>
      <circle cx="32" cy="18" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="18" r="8"/>
      <circle cx="32" cy="18" r="4"/>
      <path d="M24 12l-8-4"/>
      <path d="M40 12l8-4"/>
      <circle cx="16" cy="8" r="3"/>
      <circle cx="48" cy="8" r="3"/>
    </svg>`
  },

  // ===========================================================================
  // SURGICAL PROCEDURES (12 icons)
  // ===========================================================================
  {
    id: 'ent-fess-procedure',
    name: 'FESS (Functional Endoscopic Sinus Surgery)',
    domain: 'medicine',
    category: 'ent-procedures',
    tags: ['FESS', 'sinus surgery', 'endoscopic', 'sinusotomy', 'polypectomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="20" ry="8" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="16" rx="20" ry="8"/>
      <ellipse cx="20" cy="36" rx="10" ry="14" fill="#22c55e" opacity="0.2"/>
      <ellipse cx="20" cy="36" rx="10" ry="14"/>
      <ellipse cx="44" cy="36" rx="10" ry="14"/>
      <path d="M8 32h12" stroke="#3b82f6" stroke-width="2"/>
      <circle cx="4" cy="32" r="2" fill="#3b82f6"/>
      <path d="M20 28l0-8" stroke="#22c55e" stroke-width="2"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">FESS</text>
    </svg>`
  },
  {
    id: 'ent-septoplasty',
    name: 'Septoplasty',
    domain: 'medicine',
    category: 'ent-procedures',
    tags: ['septoplasty', 'deviated septum', 'nasal surgery', 'SMR'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 56V20c0-8 8-12 20-12s20 4 20 12v36"/>
      <path d="M32 8c-4 16 4 32-2 48" stroke="#ef4444" stroke-dasharray="3 2"/>
      <path d="M32 8v48" stroke="#22c55e" stroke-width="2"/>
      <path d="M24 28l-8 4 8 4" stroke="#3b82f6"/>
      <path d="M40 28l8 4-8 4" stroke="#3b82f6"/>
      <text x="8" y="58" font-size="4" fill="#22c55e" stroke="none">Corrected</text>
    </svg>`
  },
  {
    id: 'ent-stapedectomy',
    name: 'Stapedectomy',
    domain: 'medicine',
    category: 'ent-procedures',
    tags: ['stapedectomy', 'otosclerosis', 'stapes surgery', 'prosthesis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <path d="M24 20l8 12"/>
      <circle cx="32" cy="12" r="4" stroke-dasharray="2 2"/>
      <path d="M28 32l-6 16"/>
      <path d="M36 32l6 16"/>
      <ellipse cx="32" cy="52" rx="10" ry="4" stroke-dasharray="2 2"/>
      <rect x="28" y="28" width="8" height="20" rx="1" fill="#3b82f6" opacity="0.3"/>
      <text x="40" y="40" font-size="3" fill="#3b82f6" stroke="none">Prosthesis</text>
    </svg>`
  },
  {
    id: 'ent-tonsillectomy',
    name: 'Tonsillectomy',
    domain: 'medicine',
    category: 'ent-procedures',
    tags: ['tonsillectomy', 'adenoidectomy', 'T&A', 'tonsil removal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8h48v48H8z" fill="currentColor" opacity="0.05"/>
      <ellipse cx="16" cy="32" rx="8" ry="14" stroke-dasharray="3 2"/>
      <ellipse cx="48" cy="32" rx="8" ry="14" stroke-dasharray="3 2"/>
      <path d="M24 20c4 4 4 20 0 24"/>
      <path d="M40 20c-4 4-4 20 0 24"/>
      <ellipse cx="32" cy="52" rx="8" ry="4"/>
      <path d="M8 32l8 0" stroke="#ef4444" stroke-width="2"/>
      <path d="M48 32l8 0" stroke="#ef4444" stroke-width="2"/>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Removed</text>
    </svg>`
  },
  {
    id: 'ent-myringotomy',
    name: 'Myringotomy & Tubes',
    domain: 'medicine',
    category: 'ent-procedures',
    tags: ['myringotomy', 'PE tubes', 'tympanostomy', 'grommets', 'ventilation tubes'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <path d="M20 16c6 1 10 3 12 8"/>
      <circle cx="32" cy="40" r="2" fill="currentColor"/>
      <ellipse cx="28" cy="44" rx="6" ry="3" fill="#3b82f6" opacity="0.3"/>
      <ellipse cx="28" cy="44" rx="6" ry="3"/>
      <circle cx="28" cy="44" r="2" fill="#3b82f6"/>
      <path d="M22 44h12"/>
      <text x="36" y="48" font-size="3" fill="#3b82f6" stroke="none">PE Tube</text>
    </svg>`
  },
  {
    id: 'ent-mastoidectomy',
    name: 'Mastoidectomy',
    domain: 'medicine',
    category: 'ent-procedures',
    tags: ['mastoidectomy', 'canal wall up', 'canal wall down', 'mastoid surgery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24c8 0 12 8 12 20 0 16-8 28-24 28-12 0-20-12-20-28 0-12 4-20 8-20z" fill="currentColor" opacity="0.1"/>
      <path d="M20 8h24c8 0 12 8 12 20 0 16-8 28-24 28-12 0-20-12-20-28 0-12 4-20 8-20z"/>
      <path d="M24 20c8 4 16 4 24 0" stroke="#ef4444" stroke-width="2"/>
      <ellipse cx="36" cy="36" rx="12" ry="16" fill="#22c55e" opacity="0.2" stroke-dasharray="3 2"/>
      <circle cx="28" cy="44" r="2" stroke-dasharray="2 1"/>
      <circle cx="40" cy="40" r="2" stroke-dasharray="2 1"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Cavity</text>
    </svg>`
  },
  {
    id: 'ent-parotidectomy',
    name: 'Parotidectomy',
    domain: 'medicine',
    category: 'ent-procedures',
    tags: ['parotidectomy', 'parotid gland', 'facial nerve', 'superficial', 'total'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="18" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="28" rx="18" ry="20"/>
      <ellipse cx="32" cy="28" rx="10" ry="12" fill="#f59e0b" opacity="0.3" stroke-dasharray="3 2"/>
      <path d="M32 16v24" stroke="#ef4444" stroke-width="2"/>
      <path d="M22 24l20 8" stroke="#ef4444"/>
      <path d="M22 32l20-8" stroke="#ef4444"/>
      <path d="M32 48v8"/>
      <text x="38" y="20" font-size="3" fill="#ef4444" stroke="none">CN VII</text>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Parotid</text>
    </svg>`
  },
  {
    id: 'ent-thyroidectomy',
    name: 'Thyroidectomy',
    domain: 'medicine',
    category: 'ent-procedures',
    tags: ['thyroidectomy', 'thyroid surgery', 'lobectomy', 'total thyroidectomy', 'RLN'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v48H24z" fill="currentColor" opacity="0.1"/>
      <path d="M24 8h16"/>
      <path d="M24 8v48"/>
      <path d="M40 8v48"/>
      <ellipse cx="16" cy="32" rx="8" ry="16" fill="#ef4444" opacity="0.3" stroke-dasharray="3 2"/>
      <ellipse cx="48" cy="32" rx="8" ry="16" fill="#ef4444" opacity="0.3" stroke-dasharray="3 2"/>
      <rect x="24" y="28" width="16" height="8" fill="#ef4444" opacity="0.3" stroke-dasharray="3 2"/>
      <path d="M8 40l8-8" stroke="#f59e0b" stroke-width="2"/>
      <path d="M56 40l-8-8" stroke="#f59e0b" stroke-width="2"/>
      <text x="4" y="58" font-size="3" fill="#f59e0b" stroke="none">RLN</text>
    </svg>`
  },
  {
    id: 'ent-laryngectomy',
    name: 'Laryngectomy',
    domain: 'medicine',
    category: 'ent-procedures',
    tags: ['laryngectomy', 'total laryngectomy', 'partial laryngectomy', 'voice box removal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8l12 8 12-8" stroke-dasharray="3 2"/>
      <ellipse cx="32" cy="32" rx="16" ry="12" stroke-dasharray="3 2"/>
      <path d="M16 44v12c0 4 8 4 16 4s16 0 16-4v-12"/>
      <circle cx="32" cy="52" r="6" fill="#ef4444" opacity="0.3"/>
      <circle cx="32" cy="52" r="6"/>
      <path d="M26 52h12"/>
      <text x="38" y="54" font-size="3" fill="currentColor" stroke="none">Stoma</text>
      <text x="8" y="24" font-size="4" fill="currentColor" stroke="none">Removed</text>
    </svg>`
  },
  {
    id: 'ent-neck-dissection',
    name: 'Neck Dissection',
    domain: 'medicine',
    category: 'ent-procedures',
    tags: ['neck dissection', 'radical', 'modified radical', 'selective', 'lymph nodes'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="28" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="28"/>
      <circle cx="24" cy="16" r="4" fill="#ef4444" opacity="0.4"/>
      <circle cx="40" cy="16" r="4" fill="#ef4444" opacity="0.4"/>
      <circle cx="20" cy="28" r="4" fill="#ef4444" opacity="0.4"/>
      <circle cx="44" cy="28" r="4" fill="#ef4444" opacity="0.4"/>
      <circle cx="18" cy="42" r="4" fill="#ef4444" opacity="0.4"/>
      <circle cx="46" cy="42" r="4" fill="#ef4444" opacity="0.4"/>
      <path d="M32 4v56"/>
      <path d="M24 16l-4 12-4 14"/>
      <path d="M40 16l4 12 4 14"/>
      <text x="8" y="58" font-size="4" fill="#ef4444" stroke="none">Levels I-V</text>
    </svg>`
  },
  {
    id: 'ent-rhinoplasty',
    name: 'Rhinoplasty',
    domain: 'medicine',
    category: 'ent-procedures',
    tags: ['rhinoplasty', 'nose job', 'nasal reconstruction', 'cosmetic', 'functional'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-6 0-10 8-10 20 0 8 2 16 4 20h12c2-4 4-12 4-20 0-12-4-20-10-20z" fill="currentColor" opacity="0.1" stroke-dasharray="3 2"/>
      <path d="M32 8c-4 0-8 8-8 20 0 8 2 16 4 20h8c2-4 4-12 4-20 0-12-4-20-8-20z"/>
      <ellipse cx="26" cy="52" rx="4" ry="3"/>
      <ellipse cx="38" cy="52" rx="4" ry="3"/>
      <path d="M28 28l-4 8 4 8" stroke="#3b82f6"/>
      <path d="M36 28l4 8-4 8" stroke="#3b82f6"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Reshape</text>
    </svg>`
  },
  {
    id: 'ent-uvulopalatopharyngoplasty',
    name: 'UPPP (Uvulopalatopharyngoplasty)',
    domain: 'medicine',
    category: 'ent-procedures',
    tags: ['UPPP', 'uvulopalatopharyngoplasty', 'sleep apnea surgery', 'palate surgery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8h48v24c0 8-8 16-24 16s-24-8-24-16V8z" fill="currentColor" opacity="0.1"/>
      <path d="M8 8h48v24c0 8-8 16-24 16s-24-8-24-16V8z"/>
      <ellipse cx="20" cy="24" rx="6" ry="10" stroke-dasharray="3 2"/>
      <ellipse cx="44" cy="24" rx="6" ry="10" stroke-dasharray="3 2"/>
      <path d="M32 24v12" stroke-dasharray="3 2"/>
      <ellipse cx="32" cy="40" rx="4" ry="6" stroke-dasharray="3 2"/>
      <path d="M16 40c8 8 24 8 32 0" stroke="#22c55e" stroke-width="2"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Airway Open</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL DIAGNOSTIC ICONS (8 icons)
  // ===========================================================================
  {
    id: 'ent-weber-test',
    name: 'Weber Test',
    domain: 'medicine',
    category: 'ent-diagnostic',
    tags: ['Weber test', 'tuning fork', 'hearing test', 'lateralization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="16" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="24" r="16"/>
      <path d="M28 8v-4"/>
      <path d="M36 8v-4"/>
      <path d="M28 4h8"/>
      <rect x="30" y="40" width="4" height="16" rx="1"/>
      <path d="M24 20l4 4-4 4" stroke="#22c55e" stroke-width="2"/>
      <path d="M40 20l-4 4 4 4" stroke="#ef4444" stroke-width="2"/>
      <circle cx="32" cy="24" r="4" fill="currentColor"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Midline</text>
    </svg>`
  },
  {
    id: 'ent-rinne-test',
    name: 'Rinne Test',
    domain: 'medicine',
    category: 'ent-diagnostic',
    tags: ['Rinne test', 'tuning fork', 'air conduction', 'bone conduction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M40 12c8 4 12 12 10 24-2 10-8 18-14 20"/>
      <path d="M32 20c-2 1-4 4-4 8"/>
      <path d="M24 8v16"/>
      <path d="M20 8h8"/>
      <path d="M20 24h8"/>
      <rect x="20" y="24" width="8" height="20" rx="1" fill="currentColor" opacity="0.2"/>
      <path d="M12 32h8" stroke="#3b82f6" stroke-width="2"/>
      <text x="4" y="36" font-size="3" fill="#3b82f6" stroke="none">BC</text>
      <path d="M36 24l8 4-8 4" stroke="#22c55e" stroke-width="2"/>
      <text x="44" y="32" font-size="3" fill="#22c55e" stroke="none">AC</text>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">AC>BC Normal</text>
    </svg>`
  },
  {
    id: 'ent-dix-hallpike',
    name: 'Dix-Hallpike Test',
    domain: 'medicine',
    category: 'ent-diagnostic',
    tags: ['Dix-Hallpike', 'BPPV', 'vertigo', 'nystagmus', 'positional'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="12" ry="10" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="24" rx="12" ry="10"/>
      <circle cx="28" cy="22" r="3"/>
      <circle cx="36" cy="22" r="3"/>
      <path d="M28 30c2 2 6 2 8 0"/>
      <path d="M32 34v8"/>
      <path d="M24 42h16v12H24z" fill="currentColor" opacity="0.1"/>
      <path d="M20 34l-8 8" stroke-width="2"/>
      <path d="M44 34l8 8" stroke-width="2"/>
      <path d="M12 42l4-4"/>
      <path d="M52 42l-4-4"/>
      <path d="M24 20l-4-4" stroke="#ef4444"/>
      <path d="M28 18l4-6" stroke="#ef4444"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Head Hanging</text>
    </svg>`
  },
  {
    id: 'ent-epley-maneuver',
    name: 'Epley Maneuver',
    domain: 'medicine',
    category: 'ent-diagnostic',
    tags: ['Epley maneuver', 'CRP', 'BPPV treatment', 'canalith repositioning'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="16" cy="16" r="6"/>
      <path d="M22 16h8"/>
      <circle cx="36" cy="12" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="36" cy="12" r="6"/>
      <path d="M42 12l6 8"/>
      <circle cx="52" cy="24" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="52" cy="24" r="6"/>
      <path d="M52 30v8"/>
      <circle cx="52" cy="44" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="52" cy="44" r="6"/>
      <path d="M46 44l-8 6"/>
      <circle cx="32" cy="52" r="6" fill="#22c55e" opacity="0.3"/>
      <circle cx="32" cy="52" r="6"/>
      <text x="12" y="32" font-size="3" fill="currentColor" stroke="none">1</text>
      <text x="36" y="24" font-size="3" fill="currentColor" stroke="none">2</text>
      <text x="56" y="32" font-size="3" fill="currentColor" stroke="none">3</text>
      <text x="56" y="52" font-size="3" fill="currentColor" stroke="none">4</text>
      <text x="20" y="56" font-size="3" fill="#22c55e" stroke="none">5</text>
    </svg>`
  },
  {
    id: 'ent-flexible-laryngoscopy',
    name: 'Flexible Laryngoscopy',
    domain: 'medicine',
    category: 'ent-diagnostic',
    tags: ['flexible laryngoscopy', 'nasolaryngoscopy', 'FNL', 'vocal cord exam'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8c0-2 4-4 8-4s8 2 8 4v16"/>
      <ellipse cx="32" cy="24" rx="8" ry="4"/>
      <path d="M24 24v16c0 4 4 8 8 8s8-4 8-8v-16"/>
      <ellipse cx="32" cy="40" rx="6" ry="3" fill="currentColor" opacity="0.2"/>
      <path d="M8 8c4 0 8 4 8 12v12" stroke="#3b82f6" stroke-width="2"/>
      <circle cx="8" cy="8" r="3" fill="#3b82f6"/>
      <circle cx="16" cy="32" r="2" fill="#3b82f6"/>
      <path d="M18 32l8 8"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">View Cords</text>
    </svg>`
  },
  {
    id: 'ent-stroboscopy',
    name: 'Stroboscopy',
    domain: 'medicine',
    category: 'ent-diagnostic',
    tags: ['stroboscopy', 'videostroboscopy', 'vocal cord vibration', 'mucosal wave'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <path d="M12 30c14 6 28 6 40 0"/>
      <path d="M12 34c14-6 28-6 40 0"/>
      <path d="M16 30c4 2 8 2 12 0" stroke="#f59e0b" stroke-width="2"/>
      <path d="M36 30c4 2 8 2 12 0" stroke="#f59e0b" stroke-width="2"/>
      <circle cx="32" cy="12" r="4" fill="#ffeb3b"/>
      <path d="M28 12l-4-4"/>
      <path d="M36 12l4-4"/>
      <path d="M32 8v-4"/>
      <text x="8" y="58" font-size="4" fill="#f59e0b" stroke="none">Mucosal Wave</text>
    </svg>`
  },
  {
    id: 'ent-ct-temporal-bone',
    name: 'CT Temporal Bone',
    domain: 'medicine',
    category: 'ent-diagnostic',
    tags: ['CT temporal bone', 'imaging', 'HRCT', 'cholesteatoma', 'mastoid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <ellipse cx="32" cy="32" rx="16" ry="20" fill="currentColor" opacity="0.2"/>
      <path d="M24 24c-4 0-8 4-8 8s4 8 8 8"/>
      <circle cx="28" cy="32" r="3" fill="currentColor"/>
      <ellipse cx="38" cy="28" rx="6" ry="4" stroke-dasharray="2 2"/>
      <path d="M38 32v8"/>
      <circle cx="38" cy="44" r="2"/>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Axial View</text>
    </svg>`
  },
  {
    id: 'ent-mri-iac',
    name: 'MRI IAC (Internal Auditory Canal)',
    domain: 'medicine',
    category: 'ent-diagnostic',
    tags: ['MRI IAC', 'acoustic neuroma', 'vestibular schwannoma', 'CPA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="#1a1a2e" opacity="0.8"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <ellipse cx="32" cy="32" rx="18" ry="20" fill="#2d2d44"/>
      <path d="M20 32h8" stroke="#ffffff" stroke-width="2"/>
      <path d="M36 32h8" stroke="#ffffff" stroke-width="2"/>
      <circle cx="32" cy="32" r="8" fill="#ffffff" opacity="0.3"/>
      <circle cx="40" cy="28" r="4" fill="#ffffff"/>
      <text x="44" y="24" font-size="3" fill="#ef4444" stroke="none">Tumor</text>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">T2 CISS</text>
    </svg>`
  },

  // ===========================================================================
  // TREATMENT & THERAPEUTIC ICONS (5 icons)
  // ===========================================================================
  {
    id: 'ent-nasal-spray',
    name: 'Nasal Spray',
    domain: 'medicine',
    category: 'ent-treatment',
    tags: ['nasal spray', 'intranasal', 'corticosteroid', 'decongestant', 'saline'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="20" width="24" height="36" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="20" y="20" width="24" height="36" rx="4"/>
      <path d="M28 20v-8c0-2 2-4 4-4s4 2 4 4v8"/>
      <ellipse cx="32" cy="10" rx="6" ry="3"/>
      <path d="M32 7v-3"/>
      <path d="M28 4l4-2 4 2"/>
      <path d="M24 32h16"/>
      <path d="M24 40h16"/>
      <path d="M24 48h16"/>
      <circle cx="44" cy="8" r="2" fill="#3b82f6"/>
      <path d="M44 10v4" stroke="#3b82f6"/>
    </svg>`
  },
  {
    id: 'ent-ear-drops',
    name: 'Ear Drops',
    domain: 'medicine',
    category: 'ent-treatment',
    tags: ['ear drops', 'otic drops', 'antibiotic', 'cerumenolytic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 16c0-4 4-8 8-8s8 4 8 8v32c0 4-4 8-8 8s-8-4-8-8V16z" fill="currentColor" opacity="0.1"/>
      <path d="M24 16c0-4 4-8 8-8s8 4 8 8v32c0 4-4 8-8 8s-8-4-8-8V16z"/>
      <ellipse cx="32" cy="8" rx="4" ry="2"/>
      <path d="M28 8v-4"/>
      <path d="M36 8v-4"/>
      <ellipse cx="32" cy="4" rx="6" ry="2"/>
      <path d="M28 28h8"/>
      <path d="M28 36h8"/>
      <circle cx="32" cy="52" r="3" fill="#3b82f6"/>
      <path d="M32 49v-4" stroke="#3b82f6"/>
    </svg>`
  },
  {
    id: 'ent-voice-therapy',
    name: 'Voice Therapy',
    domain: 'medicine',
    category: 'ent-treatment',
    tags: ['voice therapy', 'speech therapy', 'vocal hygiene', 'rehabilitation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="12" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="20" r="12"/>
      <circle cx="28" cy="18" r="2"/>
      <circle cx="36" cy="18" r="2"/>
      <path d="M28 24c2 2 6 2 8 0"/>
      <path d="M32 32v8"/>
      <path d="M24 40h16"/>
      <path d="M40 20c4-4 8-4 12-2"/>
      <path d="M52 18c2 1 4 3 4 6"/>
      <path d="M44 20c2-2 4-2 6-1"/>
      <path d="M50 19c1 0 2 1 2 3"/>
      <path d="M48 20c1-1 2-1 3 0"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Vocal Training</text>
    </svg>`
  },
  {
    id: 'ent-vestibular-rehab',
    name: 'Vestibular Rehabilitation',
    domain: 'medicine',
    category: 'ent-treatment',
    tags: ['vestibular rehab', 'VRT', 'balance therapy', 'gaze stabilization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="4"/>
      <path d="M32 12v8"/>
      <path d="M32 44v8"/>
      <path d="M12 32h8"/>
      <path d="M44 32h8"/>
      <path d="M18 18l6 6"/>
      <path d="M40 40l6 6"/>
      <path d="M18 46l6-6"/>
      <path d="M40 24l6-6"/>
      <circle cx="32" cy="32" r="2" fill="#22c55e"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Gaze Target</text>
    </svg>`
  },
  {
    id: 'ent-allergy-testing',
    name: 'Allergy Testing',
    domain: 'medicine',
    category: 'ent-treatment',
    tags: ['allergy testing', 'skin prick', 'immunotherapy', 'allergen'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <circle cx="24" cy="20" r="4"/>
      <circle cx="40" cy="20" r="4" fill="#ef4444" opacity="0.5"/>
      <circle cx="24" cy="36" r="4" fill="#ef4444" opacity="0.3"/>
      <circle cx="40" cy="36" r="4"/>
      <circle cx="24" cy="48" r="4" fill="#ef4444"/>
      <circle cx="40" cy="48" r="4"/>
      <text x="16" y="16" font-size="3" fill="currentColor" stroke="none">A</text>
      <text x="32" y="16" font-size="3" fill="currentColor" stroke="none">B</text>
      <text x="16" y="32" font-size="3" fill="currentColor" stroke="none">C</text>
      <text x="32" y="32" font-size="3" fill="currentColor" stroke="none">D</text>
      <text x="16" y="56" font-size="3" fill="#ef4444" stroke="none">+</text>
    </svg>`
  }
];

export default entIcons;
