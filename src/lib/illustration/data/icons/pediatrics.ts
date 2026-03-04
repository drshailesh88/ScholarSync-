/**
 * Pediatrics Icon Library
 * Comprehensive SVG icons for pediatric medicine
 *
 * Categories:
 * - Growth/Development (12 icons)
 * - Newborn (12 icons)
 * - Infectious Disease (12 icons)
 * - Respiratory (10 icons)
 * - GI/Nutrition (10 icons)
 * - Cardiac (8 icons)
 * - Vaccination (8 icons)
 * - Equipment (13 icons)
 * - Congenital/Misc (10 icons)
 * - Procedures (8 icons)
 * - Emergencies (8 icons)
 * - Neonatal Conditions (6 icons)
 * - Developmental Conditions (6 icons)
 * - Infant Conditions (5 icons)
 *
 * Total: 128 icons (COMPLETE checkpoint)
 */

import type { IconDefinition } from './index';

export const pediatricsIcons: IconDefinition[] = [
  // ===========================================================================
  // GROWTH & DEVELOPMENT (12 icons)
  // ===========================================================================
  {
    id: 'peds-growth-chart',
    name: 'Growth Chart',
    domain: 'medicine',
    category: 'growth-development',
    tags: ['growth', 'chart', 'percentile', 'height', 'weight', 'CDC', 'WHO'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <line x1="16" y1="48" x2="16" y2="16"/>
      <line x1="16" y1="48" x2="48" y2="48"/>
      <path d="M16 44c8-4 16-12 24-20 4-4 6-8 8-8" stroke="#22c55e" stroke-width="2"/>
      <path d="M16 40c8-2 16-8 24-14 4-3 6-6 8-6" stroke="#3b82f6" stroke-width="2"/>
      <path d="M16 36c8-1 16-4 24-8 4-2 6-4 8-4" stroke="#f59e0b" stroke-width="2"/>
      <text x="20" y="60" font-size="4" fill="currentColor" stroke="none">Age</text>
      <text x="6" y="32" font-size="4" fill="currentColor" stroke="none" transform="rotate(-90 10 32)">Height</text>
    </svg>`
  },
  {
    id: 'peds-developmental-milestones',
    name: 'Developmental Milestones',
    domain: 'medicine',
    category: 'growth-development',
    tags: ['development', 'milestones', 'motor', 'cognitive', 'language', 'social'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="8"/>
      <path d="M32 24v16"/>
      <path d="M24 32h16"/>
      <circle cx="16" cy="44" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="52" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="48" cy="44" r="6" fill="currentColor" opacity="0.2"/>
      <text x="13" y="46" font-size="5" fill="currentColor" stroke="none">M</text>
      <text x="29" y="54" font-size="5" fill="currentColor" stroke="none">L</text>
      <text x="45" y="46" font-size="5" fill="currentColor" stroke="none">S</text>
    </svg>`
  },
  {
    id: 'peds-infant',
    name: 'Infant',
    domain: 'medicine',
    category: 'growth-development',
    tags: ['infant', 'baby', 'neonate', 'newborn', '0-12 months'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="14" ry="12"/>
      <circle cx="26" cy="22" r="2" fill="currentColor"/>
      <circle cx="38" cy="22" r="2" fill="currentColor"/>
      <path d="M28 28c2 2 6 2 8 0"/>
      <ellipse cx="32" cy="46" rx="16" ry="12" fill="currentColor" opacity="0.1"/>
      <path d="M16 46c0 8 8 12 16 12s16-4 16-12"/>
      <path d="M20 42l-4-6"/>
      <path d="M44 42l4-6"/>
    </svg>`
  },
  {
    id: 'peds-toddler',
    name: 'Toddler',
    domain: 'medicine',
    category: 'growth-development',
    tags: ['toddler', 'child', '1-3 years', 'walking', 'development'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="14" r="8"/>
      <circle cx="29" cy="13" r="1.5" fill="currentColor"/>
      <circle cx="35" cy="13" r="1.5" fill="currentColor"/>
      <path d="M30 17c1 1 3 1 4 0"/>
      <path d="M32 22v14"/>
      <path d="M24 28h16"/>
      <path d="M26 36l-4 16"/>
      <path d="M38 36l4 16"/>
      <circle cx="22" cy="54" r="3"/>
      <circle cx="42" cy="54" r="3"/>
    </svg>`
  },
  {
    id: 'peds-child',
    name: 'Child',
    domain: 'medicine',
    category: 'growth-development',
    tags: ['child', 'pediatric', 'school age', '4-12 years'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8"/>
      <circle cx="29" cy="11" r="1.5" fill="currentColor"/>
      <circle cx="35" cy="11" r="1.5" fill="currentColor"/>
      <path d="M30 15c1 1 3 1 4 0"/>
      <path d="M32 20v18"/>
      <path d="M22 26h20"/>
      <path d="M28 38l-6 18"/>
      <path d="M36 38l6 18"/>
      <path d="M22 26l-6 8"/>
      <path d="M42 26l6 8"/>
    </svg>`
  },
  {
    id: 'peds-adolescent',
    name: 'Adolescent',
    domain: 'medicine',
    category: 'growth-development',
    tags: ['adolescent', 'teenager', 'teen', 'puberty', '13-18 years'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="10" r="7"/>
      <circle cx="29" cy="9" r="1.5" fill="currentColor"/>
      <circle cx="35" cy="9" r="1.5" fill="currentColor"/>
      <path d="M32 17v22"/>
      <path d="M20 24h24"/>
      <path d="M28 39l-6 20"/>
      <path d="M36 39l6 20"/>
      <path d="M20 24l-8 12"/>
      <path d="M44 24l8 12"/>
      <rect x="26" y="20" width="12" height="16" rx="1" fill="currentColor" opacity="0.1"/>
    </svg>`
  },
  {
    id: 'peds-fontanelles',
    name: 'Fontanelles',
    domain: 'medicine',
    category: 'growth-development',
    tags: ['fontanelle', 'anterior', 'posterior', 'soft spot', 'skull', 'sutures'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <path d="M32 12v40" stroke-dasharray="4 2"/>
      <path d="M8 32h48" stroke-dasharray="4 2"/>
      <path d="M32 18l-8 6 8 6 8-6z" fill="#3b82f6" opacity="0.3" stroke="#3b82f6"/>
      <circle cx="32" cy="48" r="4" fill="#22c55e" opacity="0.3" stroke="#22c55e"/>
      <text x="38" y="22" font-size="4" fill="currentColor" stroke="none">Anterior</text>
      <text x="38" y="50" font-size="4" fill="currentColor" stroke="none">Posterior</text>
    </svg>`
  },
  {
    id: 'peds-moro-reflex',
    name: 'Moro Reflex',
    domain: 'medicine',
    category: 'growth-development',
    tags: ['Moro', 'reflex', 'startle', 'primitive', 'newborn', 'neurological'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="10" ry="8"/>
      <circle cx="28" cy="19" r="1.5" fill="currentColor"/>
      <circle cx="36" cy="19" r="1.5" fill="currentColor"/>
      <ellipse cx="32" cy="42" rx="12" ry="14"/>
      <path d="M20 42l-12-8" stroke-width="2"/>
      <path d="M44 42l12-8" stroke-width="2"/>
      <path d="M8 34l-4-2 4-2"/>
      <path d="M56 34l4-2-4-2"/>
      <path d="M26 56l-2 6"/>
      <path d="M38 56l2 6"/>
    </svg>`
  },
  {
    id: 'peds-rooting-reflex',
    name: 'Rooting Reflex',
    domain: 'medicine',
    category: 'growth-development',
    tags: ['rooting', 'reflex', 'feeding', 'primitive', 'newborn', 'oral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="14" ry="12"/>
      <circle cx="26" cy="26" r="2" fill="currentColor"/>
      <circle cx="38" cy="26" r="2" fill="currentColor"/>
      <ellipse cx="32" cy="34" rx="4" ry="3"/>
      <path d="M12 24l-4 4" stroke="#f59e0b" stroke-width="2"/>
      <path d="M8 28l4 1"/>
      <path d="M18 28c-2 1-4 2-4 4" stroke="#f59e0b"/>
      <path d="M24 38c2 2 6 2 8 0"/>
      <text x="4" y="40" font-size="4" fill="currentColor" stroke="none">Touch</text>
    </svg>`
  },
  {
    id: 'peds-grasp-reflex',
    name: 'Grasp Reflex',
    domain: 'medicine',
    category: 'growth-development',
    tags: ['grasp', 'reflex', 'palmar', 'plantar', 'primitive', 'newborn'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32c0-8 6-16 16-16"/>
      <path d="M32 16c2 0 4 2 4 4v24c0 2-2 4-4 4"/>
      <path d="M16 32c0 8 6 16 16 16"/>
      <path d="M24 26c-2 2-2 4 0 6"/>
      <path d="M28 24c-2 2-2 6 0 8"/>
      <path d="M20 30c-1 1-1 3 0 4"/>
      <circle cx="44" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <path d="M40 32h8"/>
      <text x="40" y="48" font-size="4" fill="currentColor" stroke="none">Finger</text>
    </svg>`
  },
  {
    id: 'peds-tonic-neck-reflex',
    name: 'Tonic Neck Reflex',
    domain: 'medicine',
    category: 'growth-development',
    tags: ['tonic neck', 'ATNR', 'fencing', 'reflex', 'primitive', 'asymmetric'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="42" cy="16" rx="10" ry="8"/>
      <circle cx="44" cy="14" r="2" fill="currentColor"/>
      <ellipse cx="32" cy="38" rx="14" ry="16"/>
      <path d="M18 38l-12 4" stroke-width="2"/>
      <path d="M46 38l10-8" stroke-width="2"/>
      <path d="M56 30l4-2"/>
      <path d="M6 44l-2 2"/>
      <path d="M26 54l-2 6"/>
      <path d="M38 54l2 6"/>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Flexed</text>
    </svg>`
  },
  {
    id: 'peds-babinski-reflex',
    name: 'Babinski Reflex',
    domain: 'medicine',
    category: 'growth-development',
    tags: ['Babinski', 'plantar', 'reflex', 'neurological', 'toe', 'fanning'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-4 8-8 24-8 36 0 8 8 12 16 12h8c8 0 16-4 16-12 0-12-4-28-8-36"/>
      <path d="M20 8c4 4 16 4 20 0" fill="currentColor" opacity="0.1"/>
      <path d="M16 44l24-4" stroke-dasharray="3 2"/>
      <path d="M24 16l-4-8"/>
      <path d="M30 14l-1-8"/>
      <path d="M36 14l1-8"/>
      <path d="M42 16l4-8"/>
      <path d="M8 52l6-4" stroke="#f59e0b" stroke-width="2"/>
      <text x="4" y="60" font-size="4" fill="currentColor" stroke="none">Stroke</text>
    </svg>`
  },

  // ===========================================================================
  // NEWBORN (12 icons)
  // ===========================================================================
  {
    id: 'peds-apgar-heart',
    name: 'APGAR Heart Rate',
    domain: 'medicine',
    category: 'newborn',
    tags: ['APGAR', 'heart rate', 'newborn', 'assessment', 'pulse'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 16c-8-8-20-4-20 8 0 16 20 28 20 28s20-12 20-28c0-12-12-16-20-8z" fill="currentColor" opacity="0.2"/>
      <path d="M32 16c-8-8-20-4-20 8 0 16 20 28 20 28s20-12 20-28c0-12-12-16-20-8z"/>
      <text x="24" y="36" font-size="10" fill="currentColor" stroke="none" font-weight="bold">A</text>
      <text x="8" y="60" font-size="5" fill="currentColor" stroke="none">0: Absent</text>
      <text x="32" y="60" font-size="5" fill="currentColor" stroke="none">2: >100</text>
    </svg>`
  },
  {
    id: 'peds-apgar-respiration',
    name: 'APGAR Respiration',
    domain: 'medicine',
    category: 'newborn',
    tags: ['APGAR', 'respiration', 'breathing', 'newborn', 'assessment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="16" ry="20"/>
      <path d="M24 24c4 4 12 4 16 0"/>
      <path d="M24 32h16"/>
      <path d="M24 40c4-4 12-4 16 0"/>
      <path d="M16 32h-8"/>
      <path d="M48 32h8"/>
      <text x="8" y="58" font-size="5" fill="currentColor" stroke="none">0: None</text>
      <text x="32" y="58" font-size="5" fill="currentColor" stroke="none">2: Crying</text>
    </svg>`
  },
  {
    id: 'peds-apgar-tone',
    name: 'APGAR Muscle Tone',
    domain: 'medicine',
    category: 'newborn',
    tags: ['APGAR', 'tone', 'muscle', 'newborn', 'assessment', 'activity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="14" r="8"/>
      <path d="M32 22v16"/>
      <path d="M20 28l-8 12" stroke-width="2"/>
      <path d="M44 28l8 12" stroke-width="2"/>
      <path d="M28 38l-4 18" stroke-width="2"/>
      <path d="M36 38l4 18" stroke-width="2"/>
      <path d="M12 40l-4 4"/>
      <path d="M52 40l4 4"/>
      <text x="8" y="60" font-size="5" fill="currentColor" stroke="none">0: Limp</text>
      <text x="32" y="60" font-size="5" fill="currentColor" stroke="none">2: Active</text>
    </svg>`
  },
  {
    id: 'peds-apgar-reflex',
    name: 'APGAR Reflex Irritability',
    domain: 'medicine',
    category: 'newborn',
    tags: ['APGAR', 'reflex', 'grimace', 'newborn', 'assessment', 'response'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="16"/>
      <circle cx="26" cy="24" r="2" fill="currentColor"/>
      <circle cx="38" cy="24" r="2" fill="currentColor"/>
      <path d="M26 34c3 4 9 4 12 0"/>
      <path d="M22 18l-4-6"/>
      <path d="M42 18l4-6"/>
      <path d="M14 16l-6-4"/>
      <path d="M50 16l6-4"/>
      <text x="8" y="56" font-size="5" fill="currentColor" stroke="none">0: None</text>
      <text x="30" y="56" font-size="5" fill="currentColor" stroke="none">2: Cry/Cough</text>
    </svg>`
  },
  {
    id: 'peds-apgar-color',
    name: 'APGAR Color',
    domain: 'medicine',
    category: 'newborn',
    tags: ['APGAR', 'color', 'appearance', 'newborn', 'cyanosis', 'pink'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8"/>
      <path d="M32 20v14"/>
      <ellipse cx="32" cy="42" rx="12" ry="14"/>
      <path d="M20 42l-8-4" stroke-width="2"/>
      <path d="M44 42l8-4" stroke-width="2"/>
      <circle cx="12" cy="38" r="4" fill="#93c5fd"/>
      <circle cx="52" cy="38" r="4" fill="#93c5fd"/>
      <circle cx="32" cy="42" r="6" fill="#fca5a5"/>
      <text x="6" y="58" font-size="5" fill="currentColor" stroke="none">0: Blue</text>
      <text x="30" y="58" font-size="5" fill="currentColor" stroke="none">2: Pink</text>
    </svg>`
  },
  {
    id: 'peds-umbilical-cord',
    name: 'Umbilical Cord',
    domain: 'medicine',
    category: 'newborn',
    tags: ['umbilical', 'cord', 'newborn', 'stump', 'vessels', 'arteries', 'vein'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="16" ry="8"/>
      <path d="M16 16c0 20 8 32 16 40"/>
      <path d="M48 16c0 20-8 32-16 40"/>
      <circle cx="26" cy="16" r="3" fill="#dc2626"/>
      <circle cx="38" cy="16" r="3" fill="#dc2626"/>
      <circle cx="32" cy="12" r="4" fill="#3b82f6"/>
      <path d="M32 56v4"/>
      <text x="16" y="20" font-size="3" fill="currentColor" stroke="none">UA</text>
      <text x="40" y="20" font-size="3" fill="currentColor" stroke="none">UA</text>
      <text x="28" y="10" font-size="3" fill="currentColor" stroke="none">UV</text>
    </svg>`
  },
  {
    id: 'peds-jaundice',
    name: 'Neonatal Jaundice',
    domain: 'medicine',
    category: 'newborn',
    tags: ['jaundice', 'bilirubin', 'hyperbilirubinemia', 'newborn', 'yellow', 'kernicterus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="14" ry="12" fill="#fef08a"/>
      <circle cx="26" cy="22" r="2" fill="currentColor"/>
      <circle cx="38" cy="22" r="2" fill="currentColor"/>
      <path d="M28 30c2 2 6 2 8 0"/>
      <ellipse cx="32" cy="48" rx="16" ry="12" fill="#fef08a" opacity="0.6"/>
      <path d="M16 48c0 8 8 12 16 12s16-4 16-12"/>
      <text x="8" y="60" font-size="5" fill="#ca8a04" stroke="none">Bilirubin</text>
    </svg>`
  },
  {
    id: 'peds-respiratory-distress',
    name: 'Respiratory Distress Syndrome',
    domain: 'medicine',
    category: 'newborn',
    tags: ['RDS', 'respiratory distress', 'surfactant', 'premature', 'grunting', 'retractions'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="12" ry="16"/>
      <ellipse cx="40" cy="32" rx="12" ry="16"/>
      <path d="M24 20c-4 4-4 20 0 24" stroke-dasharray="2 2"/>
      <path d="M40 20c4 4 4 20 0 24" stroke-dasharray="2 2"/>
      <path d="M32 16v32" stroke-width="2"/>
      <path d="M20 52l-4 4"/>
      <path d="M28 52l-2 4"/>
      <path d="M36 52l2 4"/>
      <path d="M44 52l4 4"/>
      <circle cx="32" cy="8" r="4" fill="#dc2626" opacity="0.3"/>
      <text x="12" y="60" font-size="4" fill="currentColor" stroke="none">Retractions</text>
    </svg>`
  },
  {
    id: 'peds-congenital-anomaly',
    name: 'Congenital Anomaly Assessment',
    domain: 'medicine',
    category: 'newborn',
    tags: ['congenital', 'anomaly', 'birth defect', 'assessment', 'screening'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="16" stroke-dasharray="4 2"/>
      <circle cx="32" cy="32" r="8"/>
      <path d="M32 8v8"/>
      <path d="M32 48v8"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <circle cx="32" cy="32" r="4" fill="#f59e0b"/>
      <text x="38" y="36" font-size="5" fill="currentColor" stroke="none">?</text>
    </svg>`
  },
  {
    id: 'peds-nicu-incubator',
    name: 'NICU Incubator',
    domain: 'medicine',
    category: 'newborn',
    tags: ['NICU', 'incubator', 'isolette', 'premature', 'warmer', 'thermoregulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="28" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="20" width="48" height="28" rx="4"/>
      <rect x="12" y="24" width="40" height="20" rx="2"/>
      <ellipse cx="32" cy="36" rx="12" ry="6" fill="currentColor" opacity="0.2"/>
      <circle cx="26" cy="35" r="1" fill="currentColor"/>
      <circle cx="38" cy="35" r="1" fill="currentColor"/>
      <rect x="16" y="48" width="8" height="8"/>
      <rect x="40" y="48" width="8" height="8"/>
      <circle cx="52" cy="28" r="2" fill="#22c55e"/>
      <line x1="12" y1="12" x2="12" y2="20"/>
      <line x1="52" y1="12" x2="52" y2="20"/>
    </svg>`
  },
  {
    id: 'peds-phototherapy',
    name: 'Phototherapy',
    domain: 'medicine',
    category: 'newborn',
    tags: ['phototherapy', 'blue light', 'jaundice', 'bilirubin', 'treatment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="8" rx="2" fill="#3b82f6" opacity="0.3"/>
      <line x1="20" y1="16" x2="20" y2="32" stroke="#3b82f6" stroke-dasharray="2 2"/>
      <line x1="32" y1="16" x2="32" y2="32" stroke="#3b82f6" stroke-dasharray="2 2"/>
      <line x1="44" y1="16" x2="44" y2="32" stroke="#3b82f6" stroke-dasharray="2 2"/>
      <ellipse cx="32" cy="44" rx="16" ry="10" fill="#fef08a"/>
      <circle cx="32" cy="42" r="4"/>
      <rect x="8" y="54" width="48" height="4" rx="1"/>
      <path d="M24 36c2-2 6-2 8 0"/>
    </svg>`
  },
  {
    id: 'peds-heel-prick',
    name: 'Newborn Screening Heel Prick',
    domain: 'medicine',
    category: 'newborn',
    tags: ['heel prick', 'newborn screening', 'PKU', 'metabolic', 'blood spot'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-8 16-12 32-8 44 2 6 8 8 16 8h8c8 0 14-2 16-8 4-12 0-28-8-44"/>
      <ellipse cx="32" cy="48" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <circle cx="28" cy="50" r="3" fill="#dc2626"/>
      <circle cx="36" cy="48" r="3" fill="#dc2626"/>
      <path d="M40 20l8-8"/>
      <path d="M48 12l-2-4"/>
      <path d="M48 12l4-2"/>
      <text x="44" y="8" font-size="4" fill="currentColor" stroke="none">Prick</text>
    </svg>`
  },

  // ===========================================================================
  // INFECTIOUS DISEASE (12 icons)
  // ===========================================================================
  {
    id: 'peds-measles',
    name: 'Measles Rash',
    domain: 'medicine',
    category: 'infectious-disease',
    tags: ['measles', 'rubeola', 'morbilliform', 'rash', 'exanthem', 'Koplik'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="12"/>
      <circle cx="28" cy="18" r="2" fill="currentColor"/>
      <circle cx="36" cy="18" r="2" fill="currentColor"/>
      <path d="M28 24c2 2 6 2 8 0"/>
      <path d="M32 32v20"/>
      <circle cx="24" cy="38" r="2" fill="#dc2626"/>
      <circle cx="32" cy="42" r="2" fill="#dc2626"/>
      <circle cx="40" cy="38" r="2" fill="#dc2626"/>
      <circle cx="28" cy="48" r="2" fill="#dc2626"/>
      <circle cx="36" cy="50" r="2" fill="#dc2626"/>
      <circle cx="20" cy="44" r="1.5" fill="#dc2626"/>
      <circle cx="44" cy="46" r="1.5" fill="#dc2626"/>
    </svg>`
  },
  {
    id: 'peds-varicella',
    name: 'Varicella (Chickenpox)',
    domain: 'medicine',
    category: 'infectious-disease',
    tags: ['varicella', 'chickenpox', 'vesicles', 'rash', 'VZV', 'pruritic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="20" cy="24" rx="4" ry="5" fill="#fef08a" stroke="#dc2626"/>
      <ellipse cx="36" cy="20" rx="3" ry="4" fill="#fef08a" stroke="#dc2626"/>
      <ellipse cx="44" cy="32" rx="4" ry="5" fill="#fef08a" stroke="#dc2626"/>
      <circle cx="28" cy="36" r="3" fill="#dc2626" opacity="0.5"/>
      <circle cx="40" cy="44" r="2" fill="#dc2626"/>
      <circle cx="24" cy="48" r="2.5" stroke="#dc2626"/>
      <ellipse cx="16" cy="40" rx="3" ry="4" fill="#fef08a" stroke="#dc2626"/>
      <text x="8" y="60" font-size="4" fill="currentColor" stroke="none">Vesicles</text>
    </svg>`
  },
  {
    id: 'peds-roseola',
    name: 'Roseola',
    domain: 'medicine',
    category: 'infectious-disease',
    tags: ['roseola', 'HHV-6', 'exanthem subitum', 'fever', 'rash', 'sixth disease'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="18" r="10"/>
      <circle cx="28" cy="16" r="1.5" fill="currentColor"/>
      <circle cx="36" cy="16" r="1.5" fill="currentColor"/>
      <path d="M29 22c2 1 4 1 6 0"/>
      <path d="M32 28v8"/>
      <ellipse cx="32" cy="46" rx="14" ry="12" fill="#fca5a5" opacity="0.4"/>
      <circle cx="26" cy="42" r="2" fill="#fca5a5"/>
      <circle cx="38" cy="44" r="2" fill="#fca5a5"/>
      <circle cx="32" cy="50" r="2" fill="#fca5a5"/>
      <path d="M8 12l4 4"/>
      <path d="M12 12l-4 4"/>
      <text x="4" y="20" font-size="4" fill="#dc2626" stroke="none">Fever</text>
    </svg>`
  },
  {
    id: 'peds-rsv',
    name: 'RSV Infection',
    domain: 'medicine',
    category: 'infectious-disease',
    tags: ['RSV', 'respiratory syncytial virus', 'bronchiolitis', 'wheezing', 'infant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="16"/>
      <path d="M24 28c2-2 6-2 8 0"/>
      <path d="M32 28c2-2 6-2 8 0"/>
      <ellipse cx="32" cy="36" rx="8" ry="6" fill="#93c5fd" opacity="0.5"/>
      <path d="M28 36h8"/>
      <path d="M16 24l-8-8"/>
      <path d="M8 24l-4-4"/>
      <path d="M48 24l8-8"/>
      <path d="M56 24l4-4"/>
      <text x="12" y="56" font-size="5" fill="currentColor" stroke="none">RSV</text>
    </svg>`
  },
  {
    id: 'peds-croup',
    name: 'Croup (Laryngotracheobronchitis)',
    domain: 'medicine',
    category: 'infectious-disease',
    tags: ['croup', 'stridor', 'barking cough', 'parainfluenza', 'steeple sign'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v12c0 4-4 8-8 8s-8-4-8-8z"/>
      <path d="M28 28c-4 4-8 16-8 28"/>
      <path d="M36 28c4 4 8 16 8 28"/>
      <path d="M28 20l-4-4"/>
      <path d="M36 20l4-4"/>
      <ellipse cx="32" cy="18" rx="4" ry="2" fill="#dc2626" opacity="0.3"/>
      <text x="8" y="20" font-size="4" fill="currentColor" stroke="none">Narrowing</text>
      <path d="M12 40c4 1 8 2 12 1"/>
      <path d="M40 40c4-1 8-2 12-1"/>
    </svg>`
  },
  {
    id: 'peds-bronchiolitis',
    name: 'Bronchiolitis',
    domain: 'medicine',
    category: 'infectious-disease',
    tags: ['bronchiolitis', 'wheezing', 'RSV', 'infant', 'respiratory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v16"/>
      <path d="M32 24l-12 8c-4 4-8 12-8 20"/>
      <path d="M32 24l12 8c4 4 8 12 8 20"/>
      <circle cx="16" cy="44" r="4" fill="#fca5a5"/>
      <circle cx="24" cy="48" r="3" fill="#fca5a5"/>
      <circle cx="40" cy="48" r="3" fill="#fca5a5"/>
      <circle cx="48" cy="44" r="4" fill="#fca5a5"/>
      <path d="M20 44l8-4" stroke-dasharray="2 2"/>
      <path d="M44 44l-8-4" stroke-dasharray="2 2"/>
      <text x="8" y="60" font-size="4" fill="currentColor" stroke="none">Inflammation</text>
    </svg>`
  },
  {
    id: 'peds-otitis-media',
    name: 'Otitis Media',
    domain: 'medicine',
    category: 'infectious-disease',
    tags: ['otitis media', 'ear infection', 'AOM', 'tympanic membrane', 'effusion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <circle cx="32" cy="32" r="12" fill="#dc2626" opacity="0.2"/>
      <circle cx="32" cy="32" r="12"/>
      <path d="M26 28c4 4 8 4 12 0" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="36" r="2" fill="#fef08a"/>
      <path d="M12 32l-8-4"/>
      <path d="M4 28l8-4"/>
      <text x="20" y="56" font-size="4" fill="currentColor" stroke="none">Bulging TM</text>
    </svg>`
  },
  {
    id: 'peds-meningitis-signs',
    name: 'Meningitis Signs',
    domain: 'medicine',
    category: 'infectious-disease',
    tags: ['meningitis', 'Kernig', 'Brudzinski', 'nuchal rigidity', 'petechiae'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="14" r="10"/>
      <path d="M32 24v8" stroke-width="3"/>
      <path d="M28 32h8"/>
      <path d="M24 40l-8 16"/>
      <path d="M40 40l8 16"/>
      <path d="M16 56l4-4"/>
      <path d="M48 56l-4-4"/>
      <circle cx="36" cy="28" r="1.5" fill="#7c3aed"/>
      <circle cx="40" cy="32" r="1" fill="#7c3aed"/>
      <circle cx="28" cy="36" r="1.5" fill="#7c3aed"/>
      <text x="4" y="20" font-size="4" fill="currentColor" stroke="none">Stiff Neck</text>
    </svg>`
  },
  {
    id: 'peds-hand-foot-mouth',
    name: 'Hand Foot Mouth Disease',
    domain: 'medicine',
    category: 'infectious-disease',
    tags: ['HFMD', 'coxsackie', 'vesicles', 'oral ulcers', 'enterovirus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-8 6-12 12-12h4c4 0 8 6 8 12s-4 12-8 12h-4c-6 0-12-4-12-12z"/>
      <circle cx="16" cy="28" r="2" fill="#dc2626"/>
      <circle cx="24" cy="32" r="2" fill="#dc2626"/>
      <circle cx="18" cy="36" r="1.5" fill="#dc2626"/>
      <path d="M40 48c0-6 4-10 8-10s8 6 8 12c0 4-4 8-8 8s-8-4-8-10z"/>
      <circle cx="48" cy="50" r="2" fill="#dc2626"/>
      <circle cx="52" cy="54" r="1.5" fill="#dc2626"/>
      <ellipse cx="48" cy="16" rx="8" ry="6"/>
      <circle cx="46" cy="14" r="1" fill="currentColor"/>
      <circle cx="50" cy="14" r="1" fill="currentColor"/>
      <ellipse cx="48" cy="18" rx="3" ry="2" fill="#dc2626" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'peds-scarlet-fever',
    name: 'Scarlet Fever',
    domain: 'medicine',
    category: 'infectious-disease',
    tags: ['scarlet fever', 'strep', 'sandpaper rash', 'strawberry tongue', 'GAS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="18" r="10"/>
      <circle cx="28" cy="16" r="1.5" fill="currentColor"/>
      <circle cx="36" cy="16" r="1.5" fill="currentColor"/>
      <ellipse cx="32" cy="22" rx="4" ry="2" fill="#dc2626"/>
      <path d="M32 28v8"/>
      <ellipse cx="32" cy="46" rx="14" ry="12" fill="#fca5a5" opacity="0.5"/>
      <path d="M20 42l2 2 2-2 2 2 2-2" stroke="#dc2626"/>
      <path d="M36 46l2 2 2-2 2 2 2-2" stroke="#dc2626"/>
      <path d="M24 50l2 2 2-2 2 2" stroke="#dc2626"/>
      <text x="8" y="60" font-size="4" fill="currentColor" stroke="none">Sandpaper</text>
    </svg>`
  },
  {
    id: 'peds-fifth-disease',
    name: 'Fifth Disease (Erythema Infectiosum)',
    domain: 'medicine',
    category: 'infectious-disease',
    tags: ['fifth disease', 'parvovirus B19', 'slapped cheek', 'erythema infectiosum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="16"/>
      <circle cx="26" cy="24" r="2" fill="currentColor"/>
      <circle cx="38" cy="24" r="2" fill="currentColor"/>
      <path d="M28 34c2 2 6 2 8 0"/>
      <ellipse cx="18" cy="30" rx="6" ry="5" fill="#dc2626" opacity="0.4"/>
      <ellipse cx="46" cy="30" rx="6" ry="5" fill="#dc2626" opacity="0.4"/>
      <path d="M32 44v12"/>
      <text x="6" y="56" font-size="4" fill="currentColor" stroke="none">Slapped Cheek</text>
    </svg>`
  },
  {
    id: 'peds-pertussis',
    name: 'Pertussis (Whooping Cough)',
    domain: 'medicine',
    category: 'infectious-disease',
    tags: ['pertussis', 'whooping cough', 'bordetella', 'paroxysmal', 'cough'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="12"/>
      <circle cx="28" cy="18" r="2" fill="currentColor"/>
      <circle cx="36" cy="18" r="2" fill="currentColor"/>
      <ellipse cx="32" cy="26" rx="6" ry="4"/>
      <path d="M44 12l8-4"/>
      <path d="M48 16l6-2"/>
      <path d="M46 20l6 0"/>
      <path d="M32 32v8"/>
      <ellipse cx="32" cy="48" rx="12" ry="10"/>
      <path d="M24 44c4 1 8 1 12 0"/>
      <text x="8" y="60" font-size="4" fill="currentColor" stroke="none">Whoop!</text>
    </svg>`
  },

  // ===========================================================================
  // RESPIRATORY (10 icons)
  // ===========================================================================
  {
    id: 'peds-pediatric-airway',
    name: 'Pediatric Airway Anatomy',
    domain: 'medicine',
    category: 'respiratory',
    tags: ['airway', 'pediatric', 'anatomy', 'larynx', 'funnel', 'cricoid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16"/>
      <path d="M20 8c0 8 4 12 4 20"/>
      <path d="M44 8c0 8-4 12-4 20"/>
      <ellipse cx="32" cy="28" rx="8" ry="4" fill="#fca5a5" opacity="0.3"/>
      <path d="M24 28c-2 4-4 12-4 28"/>
      <path d="M40 28c2 4 4 12 4 28"/>
      <path d="M28 32l8 0"/>
      <text x="44" y="24" font-size="4" fill="currentColor" stroke="none">Narrow</text>
      <text x="44" y="32" font-size="4" fill="currentColor" stroke="none">Cricoid</text>
      <path d="M46 26l-6 2"/>
    </svg>`
  },
  {
    id: 'peds-steeple-sign',
    name: 'Steeple Sign (Croup)',
    domain: 'medicine',
    category: 'respiratory',
    tags: ['steeple sign', 'croup', 'subglottic', 'narrowing', 'X-ray'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <path d="M32 16v8"/>
      <path d="M28 24l4 8 4-8"/>
      <path d="M24 32c0 16 4 20 8 20s8-4 8-20"/>
      <line x1="20" y1="28" x2="26" y2="28" stroke-dasharray="2 2"/>
      <line x1="38" y1="28" x2="44" y2="28" stroke-dasharray="2 2"/>
      <text x="44" y="32" font-size="4" fill="currentColor" stroke="none">Steeple</text>
      <path d="M42 34l-6-2"/>
    </svg>`
  },
  {
    id: 'peds-asthma-child',
    name: 'Pediatric Asthma',
    domain: 'medicine',
    category: 'respiratory',
    tags: ['asthma', 'pediatric', 'wheezing', 'bronchospasm', 'inhaler'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="12" ry="18"/>
      <ellipse cx="40" cy="32" rx="12" ry="18"/>
      <path d="M24 18c-4 4-6 12-6 14s2 10 6 14"/>
      <path d="M40 18c4 4 6 12 6 14s-2 10-6 14"/>
      <path d="M32 8v10"/>
      <circle cx="20" cy="28" r="3" fill="#fca5a5"/>
      <circle cx="44" cy="36" r="3" fill="#fca5a5"/>
      <path d="M18 32c2-1 4 0 4 0" stroke-width="2"/>
      <path d="M42 32c2-1 4 0 4 0" stroke-width="2"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Bronchospasm</text>
    </svg>`
  },
  {
    id: 'peds-foreign-body-aspiration',
    name: 'Foreign Body Aspiration',
    domain: 'medicine',
    category: 'respiratory',
    tags: ['foreign body', 'aspiration', 'choking', 'airway obstruction', 'peanut'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v16"/>
      <path d="M24 24l-12 16"/>
      <path d="M40 24l12 16"/>
      <ellipse cx="16" cy="48" rx="8" ry="10"/>
      <ellipse cx="48" cy="48" rx="8" ry="10"/>
      <circle cx="28" cy="20" r="4" fill="#f59e0b"/>
      <text x="32" y="22" font-size="4" fill="currentColor" stroke="none">FB</text>
      <path d="M32 28l-4 4"/>
      <path d="M28 32l-8 8"/>
      <path d="M4" y="60" font-size="4" fill="currentColor" stroke="none">Right main</path>
    </svg>`
  },
  {
    id: 'peds-epiglottitis',
    name: 'Epiglottitis (Thumb Sign)',
    domain: 'medicine',
    category: 'respiratory',
    tags: ['epiglottitis', 'thumb sign', 'supraglottitis', 'airway emergency', 'H. flu'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <path d="M32 12v8"/>
      <ellipse cx="32" cy="28" rx="8" ry="12" fill="#dc2626" opacity="0.3"/>
      <path d="M28 24c0 8 2 12 4 16"/>
      <path d="M36 24c0 8-2 12-4 16"/>
      <path d="M32 40v12"/>
      <text x="42" y="28" font-size="4" fill="currentColor" stroke="none">Thumb</text>
      <text x="42" y="34" font-size="4" fill="currentColor" stroke="none">sign</text>
      <path d="M40 30l-4 0"/>
    </svg>`
  },
  {
    id: 'peds-pneumonia-child',
    name: 'Pediatric Pneumonia',
    domain: 'medicine',
    category: 'respiratory',
    tags: ['pneumonia', 'pediatric', 'consolidation', 'respiratory infection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="34" rx="14" ry="18"/>
      <ellipse cx="40" cy="34" rx="14" ry="18"/>
      <path d="M32 8v12"/>
      <ellipse cx="20" cy="40" rx="8" ry="10" fill="#fef08a" opacity="0.5"/>
      <circle cx="18" cy="38" r="2" fill="#f59e0b"/>
      <circle cx="22" cy="42" r="2" fill="#f59e0b"/>
      <circle cx="20" cy="46" r="1.5" fill="#f59e0b"/>
      <text x="6" y="58" font-size="4" fill="currentColor" stroke="none">Consolidation</text>
    </svg>`
  },
  {
    id: 'peds-respiratory-retractions',
    name: 'Respiratory Retractions',
    domain: 'medicine',
    category: 'respiratory',
    tags: ['retractions', 'respiratory distress', 'accessory muscles', 'subcostal', 'intercostal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <path d="M16 24h32" stroke-dasharray="3 2"/>
      <path d="M14 32h36" stroke-dasharray="3 2"/>
      <path d="M16 40h32" stroke-dasharray="3 2"/>
      <path d="M32 12v-4"/>
      <path d="M20 20c4-4 8-4 12 0" stroke="#dc2626" stroke-width="2"/>
      <path d="M32 20c4-4 8-4 12 0" stroke="#dc2626" stroke-width="2"/>
      <path d="M28 28c-2-4 0-4 4-4s6 0 4 4" stroke="#dc2626"/>
      <text x="6" y="56" font-size="4" fill="currentColor" stroke="none">Suprasternal</text>
      <text x="40" y="56" font-size="4" fill="currentColor" stroke="none">Subcostal</text>
    </svg>`
  },
  {
    id: 'peds-nebulizer',
    name: 'Nebulizer Treatment',
    domain: 'medicine',
    category: 'respiratory',
    tags: ['nebulizer', 'aerosol', 'bronchodilator', 'albuterol', 'treatment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="44" rx="16" ry="12"/>
      <path d="M20 44l-4-20h32l-4 20"/>
      <ellipse cx="32" cy="24" rx="12" ry="4"/>
      <circle cx="28" cy="24" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="36" cy="24" r="2" fill="currentColor" opacity="0.3"/>
      <path d="M32 20v-8"/>
      <path d="M28 12h8"/>
      <circle cx="32" cy="8" r="4"/>
      <path d="M24 32l-4 4" stroke-dasharray="2 2" stroke="#3b82f6"/>
      <path d="M40 32l4 4" stroke-dasharray="2 2" stroke="#3b82f6"/>
      <path d="M32 28v4" stroke-dasharray="2 2" stroke="#3b82f6"/>
    </svg>`
  },
  {
    id: 'peds-pulse-oximetry',
    name: 'Pediatric Pulse Oximetry',
    domain: 'medicine',
    category: 'respiratory',
    tags: ['pulse oximetry', 'SpO2', 'oxygen saturation', 'monitoring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="32" rx="4"/>
      <rect x="16" y="24" width="32" height="20" rx="2" fill="currentColor" opacity="0.1"/>
      <text x="20" y="38" font-size="10" fill="#22c55e" stroke="none" font-weight="bold">98</text>
      <text x="42" y="38" font-size="6" fill="#22c55e" stroke="none">%</text>
      <path d="M8 44h4"/>
      <path d="M52 44h4"/>
      <circle cx="8" cy="44" r="4" fill="#dc2626" opacity="0.3"/>
      <path d="M20 12c0-4 8-4 8 0v8h-8z"/>
      <path d="M36 12c0-4 8-4 8 0v8h-8z"/>
    </svg>`
  },
  {
    id: 'peds-oxygen-therapy',
    name: 'Pediatric Oxygen Therapy',
    domain: 'medicine',
    category: 'respiratory',
    tags: ['oxygen', 'nasal cannula', 'mask', 'high flow', 'therapy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="12"/>
      <circle cx="28" cy="22" r="2" fill="currentColor"/>
      <circle cx="36" cy="22" r="2" fill="currentColor"/>
      <path d="M28 28c2 2 6 2 8 0"/>
      <path d="M8 28h12"/>
      <path d="M44 28h12"/>
      <circle cx="32" cy="28" r="2" fill="#3b82f6"/>
      <path d="M32 30v6" stroke="#3b82f6" stroke-dasharray="2 2"/>
      <rect x="8" y="44" width="16" height="16" rx="2"/>
      <text x="12" y="56" font-size="6" fill="currentColor" stroke="none">O2</text>
      <path d="M24 52h8" stroke="#3b82f6"/>
    </svg>`
  },

  // ===========================================================================
  // GI & NUTRITION (10 icons)
  // ===========================================================================
  {
    id: 'peds-breastfeeding',
    name: 'Breastfeeding',
    domain: 'medicine',
    category: 'gi-nutrition',
    tags: ['breastfeeding', 'lactation', 'nursing', 'infant nutrition', 'latch'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="16" r="8"/>
      <path d="M24 24v12"/>
      <ellipse cx="32" cy="36" rx="12" ry="8"/>
      <circle cx="40" cy="44" r="8"/>
      <circle cx="38" cy="42" r="1.5" fill="currentColor"/>
      <circle cx="42" cy="42" r="1.5" fill="currentColor"/>
      <path d="M36 32c4-2 8-2 12 0"/>
      <path d="M24 36l8-4"/>
      <circle cx="28" cy="34" r="3" fill="currentColor" opacity="0.2"/>
    </svg>`
  },
  {
    id: 'peds-bottle-feeding',
    name: 'Bottle Feeding',
    domain: 'medicine',
    category: 'gi-nutrition',
    tags: ['bottle', 'formula', 'feeding', 'infant nutrition'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16l4 8H20z"/>
      <rect x="20" y="16" width="24" height="8" rx="2"/>
      <path d="M20 24c-4 4-4 8-4 16v12c0 2 2 4 4 4h24c2 0 4-2 4-4V40c0-8 0-12-4-16"/>
      <ellipse cx="32" cy="44" rx="12" ry="8" fill="#fef08a" opacity="0.5"/>
      <line x1="24" y1="32" x2="40" y2="32"/>
      <line x1="24" y1="38" x2="40" y2="38"/>
      <line x1="24" y1="44" x2="40" y2="44"/>
      <text x="28" y="52" font-size="5" fill="currentColor" stroke="none">mL</text>
    </svg>`
  },
  {
    id: 'peds-failure-to-thrive',
    name: 'Failure to Thrive',
    domain: 'medicine',
    category: 'gi-nutrition',
    tags: ['failure to thrive', 'FTT', 'growth failure', 'malnutrition', 'weight'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="14" r="8"/>
      <circle cx="29" cy="13" r="1.5" fill="currentColor"/>
      <circle cx="35" cy="13" r="1.5" fill="currentColor"/>
      <path d="M30 17c1 1 3 1 4 0"/>
      <path d="M32 22v16" stroke-dasharray="3 2"/>
      <path d="M26 28l-4 16"/>
      <path d="M38 28l4 16"/>
      <path d="M28 38l-2 16"/>
      <path d="M36 38l2 16"/>
      <path d="M8 56l8-8"/>
      <path d="M16 56V40"/>
      <path d="M16 48h-4"/>
      <text x="4" y="40" font-size="4" fill="#dc2626" stroke="none">↓ Wt</text>
    </svg>`
  },
  {
    id: 'peds-pyloric-stenosis',
    name: 'Pyloric Stenosis',
    domain: 'medicine',
    category: 'gi-nutrition',
    tags: ['pyloric stenosis', 'projectile vomiting', 'olive sign', 'hypertrophy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 20c0 12 8 20 16 28 8-8 16-16 16-28 0-8-8-12-16-12s-16 4-16 12z"/>
      <ellipse cx="44" cy="32" rx="8" ry="4" fill="#dc2626" opacity="0.3"/>
      <ellipse cx="44" cy="32" rx="8" ry="4"/>
      <path d="M52 32h8"/>
      <path d="M20 16l-8-8" stroke="#f59e0b"/>
      <path d="M12 16l-4-4" stroke="#f59e0b"/>
      <path d="M16 12l-6-2" stroke="#f59e0b"/>
      <text x="4" y="20" font-size="4" fill="currentColor" stroke="none">Vomit</text>
      <text x="48" y="44" font-size="4" fill="currentColor" stroke="none">Olive</text>
    </svg>`
  },
  {
    id: 'peds-intussusception',
    name: 'Intussusception',
    domain: 'medicine',
    category: 'gi-nutrition',
    tags: ['intussusception', 'currant jelly', 'target sign', 'bowel obstruction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-8 8-16 24-16"/>
      <path d="M32 16c8 0 16 4 16 16"/>
      <ellipse cx="40" cy="36" rx="12" ry="16"/>
      <ellipse cx="40" cy="36" rx="8" ry="12" fill="currentColor" opacity="0.2"/>
      <ellipse cx="40" cy="36" rx="4" ry="8"/>
      <path d="M48 48c4 4 8 8 8 8"/>
      <circle cx="56" cy="56" r="4" fill="#dc2626" opacity="0.5"/>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Target sign</text>
    </svg>`
  },
  {
    id: 'peds-appendicitis-child',
    name: 'Pediatric Appendicitis',
    domain: 'medicine',
    category: 'gi-nutrition',
    tags: ['appendicitis', 'RLQ pain', 'peritonitis', 'McBurney point'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <path d="M44 44c4 4 8 8 8 8"/>
      <ellipse cx="52" cy="52" rx="6" ry="4" fill="#dc2626" opacity="0.3"/>
      <circle cx="52" cy="52" r="4" stroke="#dc2626" stroke-width="2"/>
      <path d="M12 32h8"/>
      <path d="M44 32h8"/>
      <path d="M32 12v8"/>
      <path d="M32 44v8"/>
      <circle cx="44" cy="44" r="3" fill="#dc2626"/>
      <text x="36" y="42" font-size="4" fill="currentColor" stroke="none">RLQ</text>
    </svg>`
  },
  {
    id: 'peds-dehydration-assessment',
    name: 'Dehydration Assessment',
    domain: 'medicine',
    category: 'gi-nutrition',
    tags: ['dehydration', 'assessment', 'skin turgor', 'capillary refill', 'tears'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="12"/>
      <circle cx="28" cy="18" r="2"/>
      <circle cx="36" cy="18" r="2"/>
      <path d="M28 26h8"/>
      <path d="M20 28l-4-4"/>
      <path d="M44 28l4-4"/>
      <path d="M28 36h8"/>
      <path d="M32 36v-4"/>
      <ellipse cx="16" cy="48" rx="8" ry="4"/>
      <path d="M16 44v8"/>
      <ellipse cx="48" cy="48" rx="8" ry="4"/>
      <path d="M48 44v8"/>
      <text x="10" y="60" font-size="4" fill="currentColor" stroke="none">Skin</text>
      <text x="42" y="60" font-size="4" fill="currentColor" stroke="none">Cap R</text>
    </svg>`
  },
  {
    id: 'peds-gastroenteritis',
    name: 'Gastroenteritis',
    domain: 'medicine',
    category: 'gi-nutrition',
    tags: ['gastroenteritis', 'diarrhea', 'vomiting', 'rotavirus', 'norovirus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="20"/>
      <path d="M20 24c4 1 8 1 12 0"/>
      <path d="M32 24c4 1 8 1 12 0"/>
      <path d="M24 32c4 2 8 2 16 0"/>
      <path d="M20 40c4-1 8-1 12 0"/>
      <path d="M32 40c4-1 8-1 12 0"/>
      <path d="M16 16l-8-8"/>
      <path d="M8 16l-4-4"/>
      <path d="M48 48l8 8"/>
      <path d="M52 56l4 4"/>
      <text x="4" y="20" font-size="4" fill="currentColor" stroke="none">Vomit</text>
      <text x="48" y="52" font-size="4" fill="currentColor" stroke="none">Diarrhea</text>
    </svg>`
  },
  {
    id: 'peds-gerd-infant',
    name: 'Infant GERD',
    domain: 'medicine',
    category: 'gi-nutrition',
    tags: ['GERD', 'reflux', 'spitting up', 'regurgitation', 'infant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="16" ry="16"/>
      <path d="M32 8v16" stroke-width="2"/>
      <path d="M24 24l8-8 8 8"/>
      <path d="M24 20l8-8 8 8"/>
      <ellipse cx="32" cy="32" rx="8" ry="4" fill="#fef08a" opacity="0.5"/>
      <path d="M28 40c2 2 6 2 8 0"/>
      <path d="M24 48c4 1 8 1 12 0"/>
      <text x="8" y="16" font-size="4" fill="#f59e0b" stroke="none">Reflux</text>
    </svg>`
  },
  {
    id: 'peds-oral-rehydration',
    name: 'Oral Rehydration Therapy',
    domain: 'medicine',
    category: 'gi-nutrition',
    tags: ['ORT', 'oral rehydration', 'electrolytes', 'dehydration treatment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="16" width="24" height="40" rx="4"/>
      <ellipse cx="32" cy="44" rx="10" ry="8" fill="#3b82f6" opacity="0.3"/>
      <path d="M24 32h16" stroke-dasharray="2 2"/>
      <path d="M24 40h16" stroke-dasharray="2 2"/>
      <circle cx="32" cy="8" r="4"/>
      <path d="M28 8h8"/>
      <text x="26" y="50" font-size="5" fill="currentColor" stroke="none">ORS</text>
      <path d="M48 32l8-4"/>
      <path d="M56 28v8"/>
    </svg>`
  },

  // ===========================================================================
  // CARDIAC (8 icons)
  // ===========================================================================
  {
    id: 'peds-vsd',
    name: 'Ventricular Septal Defect',
    domain: 'medicine',
    category: 'cardiac',
    tags: ['VSD', 'ventricular septal defect', 'congenital heart', 'murmur', 'shunt'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-12 0-20 10-20 22 0 14 20 26 20 26s20-12 20-26c0-12-8-22-20-22z"/>
      <path d="M32 8v48"/>
      <path d="M12 30h40"/>
      <circle cx="32" cy="40" r="4" fill="#dc2626"/>
      <path d="M28 40l8 0" stroke="#dc2626" stroke-width="2"/>
      <path d="M36 38l4 2-4 2" stroke="#3b82f6"/>
      <text x="22" y="22" font-size="5" fill="currentColor" stroke="none">RA</text>
      <text x="38" y="22" font-size="5" fill="currentColor" stroke="none">LA</text>
    </svg>`
  },
  {
    id: 'peds-asd',
    name: 'Atrial Septal Defect',
    domain: 'medicine',
    category: 'cardiac',
    tags: ['ASD', 'atrial septal defect', 'congenital heart', 'shunt', 'secundum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-12 0-20 10-20 22 0 14 20 26 20 26s20-12 20-26c0-12-8-22-20-22z"/>
      <path d="M32 8v48"/>
      <path d="M12 30h40"/>
      <circle cx="32" cy="20" r="4" fill="#dc2626"/>
      <path d="M28 20l8 0" stroke="#dc2626" stroke-width="2"/>
      <path d="M36 18l4 2-4 2" stroke="#3b82f6"/>
      <text x="22" y="44" font-size="5" fill="currentColor" stroke="none">RV</text>
      <text x="38" y="44" font-size="5" fill="currentColor" stroke="none">LV</text>
    </svg>`
  },
  {
    id: 'peds-tof',
    name: 'Tetralogy of Fallot',
    domain: 'medicine',
    category: 'cardiac',
    tags: ['ToF', 'tetralogy of Fallot', 'cyanotic', 'boot-shaped', 'tet spells'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-12 0-20 10-20 22 0 14 20 26 20 26s20-12 20-26c0-12-8-22-20-22z"/>
      <path d="M32 8v48"/>
      <path d="M12 30h40"/>
      <circle cx="32" cy="38" r="3" fill="#dc2626"/>
      <ellipse cx="20" cy="36" rx="6" ry="10" fill="#3b82f6" opacity="0.3"/>
      <path d="M48 12l4-4"/>
      <path d="M52 8l-4 4" stroke-width="2" stroke="#dc2626"/>
      <path d="M24 8l8 8"/>
      <text x="44" y="20" font-size="4" fill="currentColor" stroke="none">PS</text>
      <text x="6" y="40" font-size="4" fill="currentColor" stroke="none">RVH</text>
    </svg>`
  },
  {
    id: 'peds-pda',
    name: 'Patent Ductus Arteriosus',
    domain: 'medicine',
    category: 'cardiac',
    tags: ['PDA', 'patent ductus', 'ductus arteriosus', 'continuous murmur'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-12 0-20 10-20 22 0 14 20 26 20 26s20-12 20-26c0-12-8-22-20-22z"/>
      <path d="M20 16c0-4 4-8 8-8h8" stroke-width="2"/>
      <path d="M36 8c4 0 8 4 8 8v4"/>
      <path d="M44 20l8-4" stroke-width="2" stroke="#dc2626"/>
      <path d="M52 16l-4 4"/>
      <ellipse cx="48" cy="12" rx="4" ry="3" fill="#dc2626" opacity="0.3"/>
      <text x="52" y="12" font-size="4" fill="currentColor" stroke="none">PDA</text>
      <text x="20" y="48" font-size="4" fill="currentColor" stroke="none">Ao</text>
      <text x="36" y="48" font-size="4" fill="currentColor" stroke="none">PA</text>
    </svg>`
  },
  {
    id: 'peds-coarctation',
    name: 'Coarctation of Aorta',
    domain: 'medicine',
    category: 'cardiac',
    tags: ['coarctation', 'aorta', 'BP differential', 'rib notching'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 40c0-16 8-32 16-32s16 16 16 32"/>
      <path d="M32 8l8 8h8"/>
      <ellipse cx="36" cy="24" rx="2" ry="8" fill="#dc2626" opacity="0.5"/>
      <path d="M34 16v16" stroke="#dc2626" stroke-width="2"/>
      <path d="M16 40c0 8 8 16 16 16s16-8 16-16"/>
      <path d="M48 16l8-4"/>
      <text x="50" y="16" font-size="4" fill="currentColor" stroke="none">Narrow</text>
      <text x="8" y="32" font-size="4" fill="currentColor" stroke="none">↑BP</text>
      <text x="8" y="52" font-size="4" fill="currentColor" stroke="none">↓BP</text>
    </svg>`
  },
  {
    id: 'peds-murmur-evaluation',
    name: 'Heart Murmur Evaluation',
    domain: 'medicine',
    category: 'cardiac',
    tags: ['murmur', 'auscultation', 'innocent', 'pathologic', 'Still'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12c-8-8-20-4-20 8 0 14 20 24 20 24s20-10 20-24c0-12-12-16-20-8z"/>
      <path d="M20 24c4 1 8 1 12 0" stroke="#22c55e"/>
      <path d="M32 24c4 1 8 1 12 0" stroke="#22c55e"/>
      <circle cx="32" cy="32" r="8"/>
      <path d="M28 30l2 2 2-2 2 2 2-2"/>
      <path d="M28 34l2 2 2-2 2 2 2-2"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Grade I-VI</text>
    </svg>`
  },
  {
    id: 'peds-cyanotic-acyanotic',
    name: 'Cyanotic vs Acyanotic',
    domain: 'medicine',
    category: 'cardiac',
    tags: ['cyanotic', 'acyanotic', 'CHD classification', 'blue baby'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 12c-6-6-14-2-14 6 0 10 14 18 14 18s14-8 14-18c0-8-8-12-14-6z" fill="#3b82f6" opacity="0.3"/>
      <path d="M20 12c-6-6-14-2-14 6 0 10 14 18 14 18s14-8 14-18c0-8-8-12-14-6z"/>
      <path d="M44 12c-6-6-14-2-14 6 0 10 14 18 14 18s14-8 14-18c0-8-8-12-14-6z" fill="#fca5a5" opacity="0.3"/>
      <path d="M44 12c-6-6-14-2-14 6 0 10 14 18 14 18s14-8 14-18c0-8-8-12-14-6z"/>
      <text x="12" y="50" font-size="4" fill="#3b82f6" stroke="none">Cyanotic</text>
      <text x="34" y="50" font-size="4" fill="#dc2626" stroke="none">Acyanotic</text>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">ToF, TGA</text>
      <text x="36" y="58" font-size="3" fill="currentColor" stroke="none">VSD, ASD</text>
    </svg>`
  },
  {
    id: 'peds-transposition',
    name: 'Transposition of Great Arteries',
    domain: 'medicine',
    category: 'cardiac',
    tags: ['TGA', 'transposition', 'd-TGA', 'cyanotic', 'egg on string'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 16c-10 0-18 8-18 18 0 12 18 22 18 22s18-10 18-22c0-10-8-18-18-18z"/>
      <path d="M24 16V8c0-2 2-4 4-4" stroke="#dc2626" stroke-width="2"/>
      <path d="M28 4h8"/>
      <path d="M40 16V8c0-2-2-4-4-4" stroke="#3b82f6" stroke-width="2"/>
      <text x="18" y="8" font-size="4" fill="#dc2626" stroke="none">Ao</text>
      <text x="40" y="8" font-size="4" fill="#3b82f6" stroke="none">PA</text>
      <path d="M24 24l-4 4 4 4" stroke="#dc2626"/>
      <path d="M40 24l4 4-4 4" stroke="#3b82f6"/>
      <text x="16" y="50" font-size="4" fill="currentColor" stroke="none">Parallel</text>
    </svg>`
  },

  // ===========================================================================
  // VACCINATION (8 icons)
  // ===========================================================================
  {
    id: 'peds-vaccine-schedule',
    name: 'Vaccine Schedule',
    domain: 'medicine',
    category: 'vaccination',
    tags: ['vaccine', 'schedule', 'immunization', 'CDC', 'AAP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <line x1="8" y1="20" x2="56" y2="20"/>
      <line x1="20" y1="8" x2="20" y2="56"/>
      <circle cx="28" cy="28" r="3" fill="#22c55e"/>
      <circle cx="40" cy="28" r="3" fill="#22c55e"/>
      <circle cx="28" cy="40" r="3" fill="#22c55e"/>
      <circle cx="40" cy="40" r="3" fill="#3b82f6"/>
      <circle cx="52" cy="28" r="3" fill="#f59e0b"/>
      <text x="10" y="16" font-size="4" fill="currentColor" stroke="none">Age</text>
      <text x="26" y="16" font-size="3" fill="currentColor" stroke="none">2m 4m 6m</text>
    </svg>`
  },
  {
    id: 'peds-injection-site-thigh',
    name: 'IM Injection Site - Thigh',
    domain: 'medicine',
    category: 'vaccination',
    tags: ['injection', 'IM', 'thigh', 'vastus lateralis', 'infant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16c4 0 8 8 8 20v28H16V28c0-12 4-20 8-20z"/>
      <ellipse cx="32" cy="28" rx="8" ry="6" fill="#22c55e" opacity="0.3"/>
      <circle cx="32" cy="28" r="2" fill="#22c55e"/>
      <path d="M40 20l12-8"/>
      <path d="M52 12l-2 8h-8"/>
      <line x1="20" y1="20" x2="20" y2="40" stroke-dasharray="2 2"/>
      <line x1="44" y1="20" x2="44" y2="40" stroke-dasharray="2 2"/>
      <text x="12" y="56" font-size="4" fill="currentColor" stroke="none">Vastus Lat</text>
    </svg>`
  },
  {
    id: 'peds-injection-site-deltoid',
    name: 'IM Injection Site - Deltoid',
    domain: 'medicine',
    category: 'vaccination',
    tags: ['injection', 'IM', 'deltoid', 'arm', 'older child'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-8 0-12 8-12 20v28h24V28c0-12-4-20-12-20z"/>
      <ellipse cx="20" cy="20" rx="10" ry="8"/>
      <ellipse cx="20" cy="24" rx="6" ry="4" fill="#22c55e" opacity="0.3"/>
      <circle cx="20" cy="24" r="2" fill="#22c55e"/>
      <path d="M36 16l8-8"/>
      <path d="M44 8l-2 8h-6"/>
      <line x1="8" y1="32" x2="32" y2="32" stroke-dasharray="2 2"/>
      <text x="36" y="32" font-size="4" fill="currentColor" stroke="none">Deltoid</text>
    </svg>`
  },
  {
    id: 'peds-dtap-vaccine',
    name: 'DTaP Vaccine',
    domain: 'medicine',
    category: 'vaccination',
    tags: ['DTaP', 'diphtheria', 'tetanus', 'pertussis', 'vaccine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="36" rx="4"/>
      <ellipse cx="32" cy="36" rx="6" ry="4" fill="#3b82f6" opacity="0.3"/>
      <path d="M32 44v12"/>
      <path d="M28 56h8"/>
      <path d="M30 56l2 4 2-4"/>
      <text x="26" y="28" font-size="6" fill="currentColor" stroke="none" font-weight="bold">D</text>
      <text x="28" y="20" font-size="4" fill="currentColor" stroke="none">T</text>
      <text x="34" y="20" font-size="4" fill="currentColor" stroke="none">aP</text>
    </svg>`
  },
  {
    id: 'peds-mmr-vaccine',
    name: 'MMR Vaccine',
    domain: 'medicine',
    category: 'vaccination',
    tags: ['MMR', 'measles', 'mumps', 'rubella', 'vaccine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="36" rx="4"/>
      <ellipse cx="32" cy="36" rx="6" ry="4" fill="#dc2626" opacity="0.3"/>
      <path d="M32 44v12"/>
      <path d="M28 56h8"/>
      <path d="M30 56l2 4 2-4"/>
      <circle cx="28" cy="20" r="3" fill="#dc2626" opacity="0.5"/>
      <circle cx="36" cy="20" r="3" fill="#f59e0b" opacity="0.5"/>
      <circle cx="32" cy="28" r="3" fill="#ec4899" opacity="0.5"/>
      <text x="20" y="52" font-size="5" fill="currentColor" stroke="none">MMR</text>
    </svg>`
  },
  {
    id: 'peds-ipv-vaccine',
    name: 'IPV Vaccine (Polio)',
    domain: 'medicine',
    category: 'vaccination',
    tags: ['IPV', 'polio', 'inactivated', 'vaccine', 'Salk'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="36" rx="4"/>
      <ellipse cx="32" cy="36" rx="6" ry="4" fill="#22c55e" opacity="0.3"/>
      <path d="M32 44v12"/>
      <path d="M28 56h8"/>
      <path d="M30 56l2 4 2-4"/>
      <circle cx="32" cy="20" r="6"/>
      <circle cx="32" cy="20" r="3" fill="#22c55e"/>
      <text x="22" y="52" font-size="5" fill="currentColor" stroke="none">IPV</text>
    </svg>`
  },
  {
    id: 'peds-vaccine-reaction',
    name: 'Vaccine Adverse Reaction',
    domain: 'medicine',
    category: 'vaccination',
    tags: ['adverse reaction', 'vaccine', 'fever', 'redness', 'swelling'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12" fill="#dc2626" opacity="0.3"/>
      <circle cx="32" cy="32" r="4" fill="#dc2626"/>
      <path d="M32 12v-4"/>
      <path d="M32 56v-4"/>
      <path d="M12 32h-4"/>
      <path d="M56 32h-4"/>
      <path d="M18 18l-3-3"/>
      <path d="M46 46l3 3"/>
      <path d="M18 46l-3 3"/>
      <path d="M46 18l3-3"/>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">Local Rxn</text>
    </svg>`
  },
  {
    id: 'peds-hib-vaccine',
    name: 'Hib Vaccine',
    domain: 'medicine',
    category: 'vaccination',
    tags: ['Hib', 'Haemophilus', 'influenzae', 'vaccine', 'meningitis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="36" rx="4"/>
      <ellipse cx="32" cy="36" rx="6" ry="4" fill="#8b5cf6" opacity="0.3"/>
      <path d="M32 44v12"/>
      <path d="M28 56h8"/>
      <path d="M30 56l2 4 2-4"/>
      <ellipse cx="32" cy="20" rx="6" ry="4"/>
      <ellipse cx="32" cy="24" rx="6" ry="4"/>
      <text x="22" y="52" font-size="5" fill="currentColor" stroke="none">Hib</text>
    </svg>`
  },

  // ===========================================================================
  // EQUIPMENT (13 icons)
  // ===========================================================================
  {
    id: 'peds-stethoscope',
    name: 'Pediatric Stethoscope',
    domain: 'medicine',
    category: 'equipment',
    tags: ['stethoscope', 'auscultation', 'pediatric', 'small diaphragm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="48" r="12"/>
      <circle cx="32" cy="48" r="6" fill="currentColor" opacity="0.2"/>
      <path d="M24 40c-8-8-8-24 0-32"/>
      <path d="M40 40c8-8 8-24 0-32"/>
      <circle cx="24" cy="8" r="4"/>
      <circle cx="40" cy="8" r="4"/>
      <text x="4" y="48" font-size="4" fill="currentColor" stroke="none">Small</text>
    </svg>`
  },
  {
    id: 'peds-otoscope',
    name: 'Otoscope',
    domain: 'medicine',
    category: 'equipment',
    tags: ['otoscope', 'ear exam', 'tympanic membrane', 'pneumatic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="24" width="24" height="32" rx="4"/>
      <path d="M28 24v-8c0-4 4-8 4-8s4 4 4 8v8"/>
      <circle cx="32" cy="12" r="4" fill="currentColor" opacity="0.3"/>
      <ellipse cx="32" cy="40" rx="8" ry="6" fill="#fef08a" opacity="0.3"/>
      <circle cx="32" cy="40" r="3"/>
      <path d="M44 36h8"/>
      <circle cx="54" cy="36" r="4"/>
    </svg>`
  },
  {
    id: 'peds-growth-chart-paper',
    name: 'Growth Chart Paper',
    domain: 'medicine',
    category: 'equipment',
    tags: ['growth chart', 'percentile', 'CDC', 'WHO', 'plotting'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="2"/>
      <line x1="16" y1="12" x2="16" y2="52"/>
      <line x1="16" y1="52" x2="52" y2="52"/>
      <path d="M16 44c8-2 16-8 24-16 4-4 8-8 12-8" stroke="#22c55e"/>
      <path d="M16 38c8-1 16-6 24-10 4-2 8-6 12-6" stroke="#3b82f6"/>
      <path d="M16 32c8-1 16-4 24-6 4-1 8-3 12-3" stroke="#f59e0b"/>
      <circle cx="40" cy="28" r="2" fill="#dc2626"/>
      <text x="36" y="16" font-size="4" fill="currentColor" stroke="none">97%</text>
      <text x="36" y="22" font-size="4" fill="currentColor" stroke="none">50%</text>
    </svg>`
  },
  {
    id: 'peds-dosing-calculator',
    name: 'Pediatric Dosing Calculator',
    domain: 'medicine',
    category: 'equipment',
    tags: ['dosing', 'calculator', 'mg/kg', 'weight-based', 'medication'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <rect x="16" y="12" width="32" height="12" rx="2" fill="#22c55e" opacity="0.3"/>
      <text x="20" y="22" font-size="6" fill="currentColor" stroke="none">mg/kg</text>
      <rect x="16" y="28" width="8" height="8" rx="1"/>
      <rect x="28" y="28" width="8" height="8" rx="1"/>
      <rect x="40" y="28" width="8" height="8" rx="1"/>
      <rect x="16" y="40" width="8" height="8" rx="1"/>
      <rect x="28" y="40" width="8" height="8" rx="1"/>
      <rect x="40" y="40" width="8" height="8" rx="1"/>
      <text x="18" y="35" font-size="5" fill="currentColor" stroke="none">7</text>
      <text x="30" y="35" font-size="5" fill="currentColor" stroke="none">8</text>
      <text x="42" y="35" font-size="5" fill="currentColor" stroke="none">9</text>
    </svg>`
  },
  {
    id: 'peds-weight-scale',
    name: 'Infant Weight Scale',
    domain: 'medicine',
    category: 'equipment',
    tags: ['weight', 'scale', 'infant', 'measurement', 'growth'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="24" ry="12"/>
      <path d="M8 28c0 8 10 16 24 16s24-8 24-16"/>
      <rect x="20" y="44" width="24" height="12" rx="2"/>
      <rect x="24" y="48" width="16" height="4" rx="1" fill="currentColor" opacity="0.2"/>
      <text x="26" y="52" font-size="5" fill="currentColor" stroke="none">kg</text>
      <ellipse cx="32" cy="24" rx="12" ry="6" fill="currentColor" opacity="0.1"/>
    </svg>`
  },
  {
    id: 'peds-car-seat',
    name: 'Car Seat Safety',
    domain: 'medicine',
    category: 'equipment',
    tags: ['car seat', 'safety', 'transport', 'rear-facing', 'child safety'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 56h32c4 0 8-4 8-8V24c0-8-8-16-16-16H24c-8 0-16 8-16 16v24c0 4 4 8 8 8z"/>
      <path d="M16 20c0-4 4-8 8-8h16c4 0 8 4 8 8"/>
      <ellipse cx="32" cy="36" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <path d="M24 32v16"/>
      <path d="M40 32v16"/>
      <circle cx="32" cy="28" r="4"/>
      <path d="M28 28c0-2 2-4 4-4s4 2 4 4"/>
      <text x="12" y="62" font-size="4" fill="currentColor" stroke="none">Rear-facing</text>
    </svg>`
  },
  {
    id: 'peds-length-board',
    name: 'Infant Length Board',
    domain: 'medicine',
    category: 'equipment',
    tags: ['length', 'height', 'measurement', 'infantometer', 'growth'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="16" rx="2"/>
      <rect x="8" y="24" width="8" height="16"/>
      <rect x="48" y="24" width="8" height="16"/>
      <line x1="16" y1="32" x2="48" y2="32"/>
      <line x1="20" y1="28" x2="20" y2="36"/>
      <line x1="28" y1="28" x2="28" y2="36"/>
      <line x1="36" y1="28" x2="36" y2="36"/>
      <line x1="44" y1="28" x2="44" y2="36"/>
      <ellipse cx="32" cy="32" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
      <text x="24" y="48" font-size="5" fill="currentColor" stroke="none">cm</text>
    </svg>`
  },
  {
    id: 'peds-bp-cuff',
    name: 'Pediatric BP Cuff',
    domain: 'medicine',
    category: 'equipment',
    tags: ['blood pressure', 'cuff', 'pediatric', 'sphygmomanometer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="32" height="24" rx="4"/>
      <path d="M8 32h32"/>
      <rect x="44" y="24" width="12" height="16" rx="2"/>
      <circle cx="50" cy="32" r="4" fill="currentColor" opacity="0.2"/>
      <text x="48" y="34" font-size="4" fill="currentColor" stroke="none">0</text>
      <path d="M40 28h4"/>
      <path d="M40 36h4"/>
      <text x="12" y="30" font-size="4" fill="currentColor" stroke="none">Small</text>
      <text x="12" y="38" font-size="4" fill="currentColor" stroke="none">Cuff</text>
    </svg>`
  },
  {
    id: 'peds-thermometer',
    name: 'Pediatric Thermometer',
    domain: 'medicine',
    category: 'equipment',
    tags: ['thermometer', 'temperature', 'fever', 'rectal', 'tympanic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8h8c2 0 4 2 4 4v32c0 6-4 12-8 12s-8-6-8-12V12c0-2 2-4 4-4z"/>
      <circle cx="32" cy="48" r="6" fill="#dc2626" opacity="0.5"/>
      <path d="M32 20v24" stroke="#dc2626" stroke-width="3"/>
      <line x1="36" y1="24" x2="40" y2="24"/>
      <line x1="36" y1="32" x2="40" y2="32"/>
      <line x1="36" y1="40" x2="40" y2="40"/>
      <text x="42" y="26" font-size="4" fill="currentColor" stroke="none">°C</text>
    </svg>`
  },
  {
    id: 'peds-iv-setup',
    name: 'Pediatric IV Setup',
    domain: 'medicine',
    category: 'equipment',
    tags: ['IV', 'intravenous', 'fluid', 'access', 'burette'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="4" width="16" height="24" rx="2"/>
      <ellipse cx="32" cy="20" rx="6" ry="4" fill="#3b82f6" opacity="0.3"/>
      <rect x="28" y="28" width="8" height="16" rx="1"/>
      <path d="M32 44v12"/>
      <circle cx="32" cy="58" r="2"/>
      <line x1="20" y1="12" x2="24" y2="12"/>
      <line x1="40" y1="12" x2="44" y2="12"/>
      <text x="30" y="38" font-size="4" fill="currentColor" stroke="none">mL</text>
      <text x="46" y="16" font-size="4" fill="currentColor" stroke="none">Burette</text>
    </svg>`
  },
  {
    id: 'peds-feeding-tube',
    name: 'NG/OG Tube',
    domain: 'medicine',
    category: 'equipment',
    tags: ['NG tube', 'OG tube', 'feeding', 'nasogastric', 'orogastric'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="10"/>
      <circle cx="28" cy="14" r="2" fill="currentColor"/>
      <circle cx="36" cy="14" r="2" fill="currentColor"/>
      <path d="M32 20c-4 0-4 4 0 4"/>
      <path d="M28 8c-4-4-12 0-12 8v32c0 4 4 8 8 8"/>
      <path d="M24 56h16" stroke-width="2"/>
      <ellipse cx="32" cy="48" rx="8" ry="6"/>
      <path d="M28 48h8"/>
      <text x="44" y="20" font-size="4" fill="currentColor" stroke="none">NG</text>
    </svg>`
  },
  {
    id: 'peds-suction',
    name: 'Bulb Suction',
    domain: 'medicine',
    category: 'equipment',
    tags: ['suction', 'bulb', 'nasal', 'secretions', 'airway'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="16" ry="20"/>
      <path d="M28 16c0-4 2-8 4-8s4 4 4 8"/>
      <path d="M28 16h8"/>
      <circle cx="32" cy="36" r="8" fill="currentColor" opacity="0.2"/>
      <path d="M24 36c4 1 8 1 12 0"/>
      <path d="M12 20l-4-4"/>
      <path d="M52 20l4-4"/>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">Squeeze</text>
    </svg>`
  },
  {
    id: 'peds-spacer',
    name: 'MDI Spacer/Chamber',
    domain: 'medicine',
    category: 'equipment',
    tags: ['spacer', 'chamber', 'MDI', 'inhaler', 'asthma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="32" rx="12" ry="16"/>
      <rect x="32" y="24" width="24" height="16" rx="2"/>
      <path d="M8 32h4"/>
      <ellipse cx="12" cy="32" rx="4" ry="6" fill="currentColor" opacity="0.2"/>
      <rect x="56" y="20" width="4" height="24" rx="1"/>
      <rect x="60" y="28" width="4" height="8"/>
      <circle cx="20" cy="32" r="4" fill="#3b82f6" opacity="0.3"/>
      <path d="M24 32h8" stroke-dasharray="2 2" stroke="#3b82f6"/>
      <text x="36" y="46" font-size="4" fill="currentColor" stroke="none">Chamber</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL ICONS FOR 90%+ COMPLETENESS (10 more icons)
  // ===========================================================================
  {
    id: 'peds-cleft-lip-palate',
    name: 'Cleft Lip/Palate',
    domain: 'medicine',
    category: 'congenital',
    tags: ['cleft', 'lip', 'palate', 'congenital', 'craniofacial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="18" ry="16"/>
      <circle cx="26" cy="24" r="3" fill="currentColor"/>
      <circle cx="38" cy="24" r="3" fill="currentColor"/>
      <path d="M24 36c0 4 4 6 8 6s8-2 8-6" stroke-width="2"/>
      <path d="M32 32v6" stroke="#ef4444" stroke-width="2"/>
      <path d="M28 36l-2-4" stroke="#ef4444"/>
      <path d="M36 36l2-4" stroke="#ef4444"/>
      <ellipse cx="32" cy="52" rx="10" ry="6"/>
      <path d="M32 46v-4"/>
    </svg>`
  },
  {
    id: 'peds-kawasaki',
    name: 'Kawasaki Disease',
    domain: 'medicine',
    category: 'infectious',
    tags: ['kawasaki', 'fever', 'rash', 'conjunctivitis', 'coronary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="14"/>
      <ellipse cx="26" cy="22" rx="3" ry="2" fill="#ef4444" opacity="0.5"/>
      <ellipse cx="38" cy="22" rx="3" ry="2" fill="#ef4444" opacity="0.5"/>
      <circle cx="26" cy="22" r="1.5" fill="currentColor"/>
      <circle cx="38" cy="22" r="1.5" fill="currentColor"/>
      <path d="M26 30h12" stroke="#ef4444" stroke-width="3"/>
      <circle cx="32" cy="50" r="8"/>
      <path d="M28 50c2 1 6 1 8 0" stroke="#ef4444"/>
      <circle cx="28" cy="50" r="2" fill="#ef4444" opacity="0.3"/>
      <circle cx="36" cy="50" r="2" fill="#ef4444" opacity="0.3"/>
      <text x="6" y="20" font-size="4" fill="#ef4444" stroke="none">5d fever</text>
    </svg>`
  },
  {
    id: 'peds-hand-foot-mouth',
    name: 'Hand-Foot-Mouth Disease',
    domain: 'medicine',
    category: 'infectious',
    tags: ['HFMD', 'coxsackie', 'viral', 'vesicles', 'enterovirus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 24c0-8 6-12 12-12h8c6 0 12 4 12 12v4c0 4-4 8-8 8h-16c-4 0-8-4-8-8z"/>
      <circle cx="24" cy="26" r="2" fill="#f97316" opacity="0.7"/>
      <circle cx="32" cy="28" r="2" fill="#f97316" opacity="0.7"/>
      <circle cx="40" cy="26" r="2" fill="#f97316" opacity="0.7"/>
      <path d="M12 44c0 0 4 8 8 8s8-8 8-8"/>
      <circle cx="16" cy="48" r="2" fill="#f97316" opacity="0.7"/>
      <circle cx="24" cy="50" r="2" fill="#f97316" opacity="0.7"/>
      <path d="M36 44c0 0 4 8 8 8s8-8 8-8"/>
      <circle cx="40" cy="48" r="2" fill="#f97316" opacity="0.7"/>
      <circle cx="48" cy="50" r="2" fill="#f97316" opacity="0.7"/>
    </svg>`
  },
  {
    id: 'peds-intussusception',
    name: 'Intussusception',
    domain: 'medicine',
    category: 'gi',
    tags: ['intussusception', 'bowel', 'obstruction', 'target sign', 'currant jelly'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 20c0 0 8 4 16 4s16-4 16-4"/>
      <path d="M16 20v24c0 4 8 8 16 8s16-4 16-8V20"/>
      <ellipse cx="32" cy="32" rx="12" ry="8" stroke-width="2"/>
      <ellipse cx="32" cy="32" rx="8" ry="5" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="4" ry="3" fill="#ef4444" opacity="0.4"/>
      <path d="M24 32h-8" stroke-dasharray="2 2"/>
      <path d="M40 32h8" stroke-dasharray="2 2"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Target Sign</text>
    </svg>`
  },
  {
    id: 'peds-pyloric-stenosis',
    name: 'Pyloric Stenosis',
    domain: 'medicine',
    category: 'gi',
    tags: ['pyloric', 'stenosis', 'projectile vomiting', 'olive', 'hypertrophy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="28" rx="16" ry="12"/>
      <ellipse cx="24" cy="28" rx="8" ry="6" fill="#fcd34d" opacity="0.3"/>
      <ellipse cx="44" cy="32" rx="8" ry="4" stroke-width="3" fill="#ef4444" opacity="0.3"/>
      <path d="M52 32h8"/>
      <path d="M56 28v8"/>
      <path d="M8 28c-4-8 0-16 8-20"/>
      <path d="M12 12l-4-4"/>
      <path d="M8 16l-4 0"/>
      <text x="40" y="22" font-size="4" fill="currentColor" stroke="none">Olive</text>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Projectile</text>
    </svg>`
  },
  {
    id: 'peds-foreign-body-airway',
    name: 'Foreign Body Aspiration',
    domain: 'medicine',
    category: 'emergency',
    tags: ['foreign body', 'choking', 'aspiration', 'airway', 'heimlich'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v12c0 4-4 8-8 8s-8-4-8-8V8"/>
      <ellipse cx="32" cy="12" rx="6" ry="3" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="20" r="4" fill="#ef4444"/>
      <path d="M32 28v8"/>
      <path d="M24 36l16 0"/>
      <path d="M20 36v20c0 4 8 4 12 4s12 0 12-4V36"/>
      <path d="M28 40v12"/>
      <path d="M36 40v12"/>
      <text x="44" y="22" font-size="4" fill="#ef4444" stroke="none">FB</text>
    </svg>`
  },
  {
    id: 'peds-febrile-seizure',
    name: 'Febrile Seizure',
    domain: 'medicine',
    category: 'emergency',
    tags: ['seizure', 'febrile', 'convulsion', 'fever', 'neurologic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="12"/>
      <circle cx="28" cy="18" r="2" fill="currentColor"/>
      <circle cx="36" cy="18" r="2" fill="currentColor"/>
      <path d="M28 24c2 2 6 2 8 0"/>
      <path d="M20 8l4 4" stroke="#f59e0b"/>
      <path d="M44 8l-4 4" stroke="#f59e0b"/>
      <path d="M32 2v6" stroke="#f59e0b"/>
      <path d="M32 32v8"/>
      <path d="M26 40c-6 1-10 8-8 14"/>
      <path d="M38 40c6 1 10 8 8 14"/>
      <path d="M18 56l8-4 8 4 8-4 8 4" stroke="#8b5cf6" stroke-width="2"/>
      <text x="4" y="20" font-size="4" fill="#ef4444" stroke="none">38C+</text>
    </svg>`
  },
  {
    id: 'peds-nicu-incubator',
    name: 'NICU Incubator',
    domain: 'medicine',
    category: 'nicu',
    tags: ['incubator', 'NICU', 'premature', 'isolette', 'temperature'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="28" rx="4"/>
      <rect x="12" y="24" width="40" height="20" rx="2" fill="#ddd6fe" opacity="0.3"/>
      <ellipse cx="32" cy="34" rx="12" ry="6"/>
      <circle cx="28" cy="33" r="1" fill="currentColor"/>
      <circle cx="36" cy="33" r="1" fill="currentColor"/>
      <circle cx="16" cy="12" r="4"/>
      <text x="14" y="14" font-size="4" fill="currentColor" stroke="none">T</text>
      <circle cx="32" cy="12" r="4"/>
      <text x="30" y="14" font-size="4" fill="currentColor" stroke="none">H</text>
      <rect x="12" y="48" width="8" height="8"/>
      <rect x="44" y="48" width="8" height="8"/>
      <circle cx="56" cy="28" r="3"/>
      <circle cx="56" cy="40" r="3"/>
    </svg>`
  },
  {
    id: 'peds-phototherapy',
    name: 'Phototherapy Unit',
    domain: 'medicine',
    category: 'nicu',
    tags: ['phototherapy', 'bilirubin', 'jaundice', 'blue light', 'bili lights'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="12" rx="2"/>
      <rect x="12" y="12" width="8" height="4" fill="#3b82f6" opacity="0.7"/>
      <rect x="22" y="12" width="8" height="4" fill="#3b82f6" opacity="0.7"/>
      <rect x="32" y="12" width="8" height="4" fill="#3b82f6" opacity="0.7"/>
      <rect x="42" y="12" width="8" height="4" fill="#3b82f6" opacity="0.7"/>
      <path d="M16 20l-4 20" stroke="#3b82f6" stroke-dasharray="2 2"/>
      <path d="M32 20v20" stroke="#3b82f6" stroke-dasharray="2 2"/>
      <path d="M48 20l4 20" stroke="#3b82f6" stroke-dasharray="2 2"/>
      <ellipse cx="32" cy="48" rx="16" ry="8"/>
      <circle cx="28" cy="47" r="1.5" fill="currentColor"/>
      <circle cx="36" cy="47" r="1.5" fill="currentColor"/>
      <ellipse cx="32" cy="48" rx="6" ry="3" fill="#fcd34d" opacity="0.3"/>
      <text x="4" y="60" font-size="4" fill="#3b82f6" stroke="none">450nm</text>
    </svg>`
  },
  {
    id: 'peds-oxyhood',
    name: 'Oxygen Hood',
    domain: 'medicine',
    category: 'nicu',
    tags: ['oxygen', 'hood', 'oxyhood', 'respiratory', 'FiO2'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 28c0-12 8-20 16-20s16 8 16 20"/>
      <path d="M16 28v20c0 4 8 8 16 8s16-4 16-8V28"/>
      <ellipse cx="32" cy="28" rx="16" ry="8" fill="#93c5fd" opacity="0.2"/>
      <circle cx="32" cy="36" r="8"/>
      <circle cx="29" cy="35" r="2" fill="currentColor"/>
      <circle cx="35" cy="35" r="2" fill="currentColor"/>
      <path d="M30 40c1 1 3 1 4 0"/>
      <path d="M48 20c8 0 8 8 8 8v8"/>
      <ellipse cx="56" cy="40" rx="4" ry="6"/>
      <text x="52" y="42" font-size="4" fill="currentColor" stroke="none">O2</text>
    </svg>`
  },

  // ===========================================================================
  // PROCEDURES (8 icons)
  // ===========================================================================
  {
    id: 'peds-lumbar-puncture',
    name: 'Pediatric Lumbar Puncture',
    domain: 'medicine',
    category: 'procedures',
    tags: ['lumbar puncture', 'LP', 'spinal tap', 'CSF', 'meningitis', 'lateral decubitus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="10" ry="8"/>
      <path d="M22 20c0 8-4 16-4 24"/>
      <path d="M42 20c0 8 4 16 4 24"/>
      <ellipse cx="32" cy="40" rx="14" ry="12" fill="currentColor" opacity="0.1"/>
      <path d="M32 28v24"/>
      <path d="M28 32h8" stroke-dasharray="2 2"/>
      <path d="M28 36h8" stroke-dasharray="2 2"/>
      <path d="M28 40h8" stroke-dasharray="2 2"/>
      <path d="M52 36l-12 4" stroke="#3b82f6" stroke-width="2"/>
      <circle cx="40" cy="40" r="3" fill="#3b82f6"/>
      <text x="48" y="32" font-size="4" fill="currentColor" stroke="none">L3-L4</text>
    </svg>`
  },
  {
    id: 'peds-iv-access',
    name: 'Pediatric IV Access',
    domain: 'medicine',
    category: 'procedures',
    tags: ['IV', 'intravenous', 'access', 'catheter', 'butterfly', 'scalp vein'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 28c0-8 6-16 16-16s16 8 16 16"/>
      <ellipse cx="32" cy="28" rx="16" ry="8"/>
      <path d="M24 24l-4-8"/>
      <path d="M40 24l4-8"/>
      <circle cx="28" cy="20" r="2" fill="#3b82f6"/>
      <path d="M28 22v4" stroke="#3b82f6"/>
      <path d="M12 32c0 8 8 16 8 24"/>
      <path d="M52 32c0 8-8 16-8 24"/>
      <ellipse cx="32" cy="48" rx="12" ry="8"/>
      <path d="M24 48l-8 4"/>
      <circle cx="16" cy="52" r="3" fill="#3b82f6"/>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Scalp/Hand</text>
    </svg>`
  },
  {
    id: 'peds-io-access',
    name: 'Intraosseous Access',
    domain: 'medicine',
    category: 'procedures',
    tags: ['IO', 'intraosseous', 'access', 'emergency', 'tibial', 'resuscitation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="12" ry="8"/>
      <path d="M20 12c0 16-4 32-4 44"/>
      <path d="M44 12c0 16 4 32 4 44"/>
      <ellipse cx="32" cy="12" rx="6" ry="4" fill="currentColor" opacity="0.2"/>
      <path d="M32 8v48" stroke-dasharray="4 2"/>
      <circle cx="32" cy="20" r="4" fill="#dc2626" opacity="0.3"/>
      <path d="M48 16l8-8"/>
      <path d="M56 8v8h-8"/>
      <path d="M52 12l-12 8" stroke="#dc2626" stroke-width="2"/>
      <text x="4" y="28" font-size="4" fill="currentColor" stroke="none">Prox Tibia</text>
    </svg>`
  },
  {
    id: 'peds-endotracheal-intubation',
    name: 'Pediatric Intubation',
    domain: 'medicine',
    category: 'procedures',
    tags: ['intubation', 'ETT', 'endotracheal', 'airway', 'uncuffed'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="12" ry="10"/>
      <circle cx="28" cy="14" r="2" fill="currentColor"/>
      <circle cx="36" cy="14" r="2" fill="currentColor"/>
      <ellipse cx="32" cy="22" rx="4" ry="2"/>
      <path d="M32 24v32" stroke-width="3" stroke="#3b82f6"/>
      <ellipse cx="32" cy="28" rx="3" ry="2" fill="#3b82f6" opacity="0.3"/>
      <path d="M32 56h16"/>
      <path d="M48 52v8"/>
      <text x="8" y="48" font-size="4" fill="currentColor" stroke="none">ETT</text>
      <text x="8" y="54" font-size="3" fill="currentColor" stroke="none">Age/4+4</text>
    </svg>`
  },
  {
    id: 'peds-umbilical-catheter',
    name: 'Umbilical Catheter',
    domain: 'medicine',
    category: 'procedures',
    tags: ['UVC', 'UAC', 'umbilical', 'catheter', 'newborn', 'access'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <ellipse cx="32" cy="32" rx="8" ry="6" fill="currentColor" opacity="0.2"/>
      <circle cx="28" cy="30" r="2" fill="#dc2626"/>
      <circle cx="36" cy="30" r="2" fill="#dc2626"/>
      <circle cx="32" cy="36" r="3" fill="#3b82f6"/>
      <path d="M32 36v20" stroke="#3b82f6" stroke-width="2"/>
      <path d="M28 30l-8 8" stroke="#dc2626"/>
      <path d="M36 30l8 8" stroke="#dc2626"/>
      <text x="8" y="20" font-size="4" fill="#dc2626" stroke="none">UA</text>
      <text x="44" y="20" font-size="4" fill="#3b82f6" stroke="none">UV</text>
    </svg>`
  },
  {
    id: 'peds-circumcision',
    name: 'Circumcision',
    domain: 'medicine',
    category: 'procedures',
    tags: ['circumcision', 'newborn', 'procedure', 'foreskin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="4"/>
      <ellipse cx="32" cy="32" rx="10" ry="12"/>
      <path d="M26 24c4 1 8 1 12 0"/>
      <ellipse cx="32" cy="32" rx="6" ry="8" stroke-dasharray="3 2"/>
      <path d="M56 24l-8 8"/>
      <path d="M56 24h-8v8"/>
      <text x="10" y="56" font-size="4" fill="currentColor" stroke="none">Plastibell</text>
    </svg>`
  },
  {
    id: 'peds-suprapubic-aspiration',
    name: 'Suprapubic Aspiration',
    domain: 'medicine',
    category: 'procedures',
    tags: ['SPA', 'suprapubic', 'urine', 'aspiration', 'bladder', 'UTI'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="16" ry="12"/>
      <ellipse cx="32" cy="40" rx="10" ry="8" fill="#fef08a" opacity="0.4"/>
      <path d="M32 8v16" stroke="#3b82f6" stroke-width="2"/>
      <path d="M28 8h8"/>
      <circle cx="32" cy="32" r="2" fill="#3b82f6"/>
      <path d="M24 56h16"/>
      <path d="M32 48v8"/>
      <text x="8" y="20" font-size="4" fill="currentColor" stroke="none">Bladder</text>
      <text x="40" y="56" font-size="4" fill="currentColor" stroke="none">SPA</text>
    </svg>`
  },
  {
    id: 'peds-sedation',
    name: 'Procedural Sedation',
    domain: 'medicine',
    category: 'procedures',
    tags: ['sedation', 'procedural', 'ketamine', 'propofol', 'monitoring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="12"/>
      <path d="M26 18h4"/>
      <path d="M34 18h4"/>
      <path d="M28 24c2 1 6 1 8 0"/>
      <path d="M44 12l8-4"/>
      <path d="M52 8v8"/>
      <text x="54" y="14" font-size="4" fill="currentColor" stroke="none">Zzz</text>
      <ellipse cx="32" cy="44" rx="14" ry="12"/>
      <path d="M24 44l16 0"/>
      <path d="M32 36v16"/>
      <circle cx="48" cy="48" r="6"/>
      <path d="M46 46l4 4"/>
      <path d="M50 46l-4 4"/>
    </svg>`
  },

  // ===========================================================================
  // EMERGENCIES (8 icons)
  // ===========================================================================
  {
    id: 'peds-poisoning',
    name: 'Poisoning/Toxic Ingestion',
    domain: 'medicine',
    category: 'emergency',
    tags: ['poisoning', 'toxic', 'ingestion', 'overdose', 'poison control'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16l4 12H20z"/>
      <rect x="16" y="20" width="32" height="36" rx="4"/>
      <ellipse cx="32" cy="44" rx="10" ry="8" fill="#22c55e" opacity="0.4"/>
      <path d="M24 28h16"/>
      <path d="M24 36h16"/>
      <circle cx="32" cy="28" r="8"/>
      <path d="M28 26l8 4"/>
      <path d="M28 30l8-4"/>
      <text x="8" y="60" font-size="5" fill="#dc2626" stroke="none">TOXIC</text>
    </svg>`
  },
  {
    id: 'peds-pals',
    name: 'PALS Resuscitation',
    domain: 'medicine',
    category: 'emergency',
    tags: ['PALS', 'resuscitation', 'CPR', 'pediatric', 'cardiac arrest'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="10"/>
      <circle cx="29" cy="14" r="2" fill="currentColor"/>
      <circle cx="35" cy="14" r="2" fill="currentColor"/>
      <path d="M32 26v16"/>
      <ellipse cx="32" cy="36" rx="12" ry="8" fill="currentColor" opacity="0.1"/>
      <path d="M8 36l8-8 4 4 8-8 4 4 8-8 4 4 8-8" stroke="#dc2626" stroke-width="2"/>
      <path d="M24 42l-4 16"/>
      <path d="M40 42l4 16"/>
      <text x="8" y="60" font-size="5" fill="currentColor" stroke="none">30:2</text>
    </svg>`
  },
  {
    id: 'peds-anaphylaxis',
    name: 'Pediatric Anaphylaxis',
    domain: 'medicine',
    category: 'emergency',
    tags: ['anaphylaxis', 'allergic', 'epinephrine', 'EpiPen', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="12" fill="#fca5a5" opacity="0.4"/>
      <circle cx="32" cy="20" r="12"/>
      <ellipse cx="28" cy="18" rx="3" ry="2"/>
      <ellipse cx="36" cy="18" rx="3" ry="2"/>
      <ellipse cx="32" cy="26" rx="5" ry="3" fill="#dc2626" opacity="0.5"/>
      <path d="M32 32v8"/>
      <path d="M24 40c-4 1-8 4-8 8"/>
      <path d="M40 40c4 1 8 4 8 8"/>
      <rect x="12" y="48" width="8" height="12" rx="2" fill="#22c55e"/>
      <path d="M16 56v4"/>
      <text x="4" y="62" font-size="4" fill="currentColor" stroke="none">Epi</text>
    </svg>`
  },
  {
    id: 'peds-status-epilepticus',
    name: 'Status Epilepticus',
    domain: 'medicine',
    category: 'emergency',
    tags: ['seizure', 'status epilepticus', 'convulsion', 'benzodiazepine', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="18" r="12"/>
      <path d="M26 16l2-4 2 4 2-4 2 4" stroke="#8b5cf6" stroke-width="2"/>
      <path d="M32 30v8"/>
      <path d="M24 38l-8 16"/>
      <path d="M40 38l8 16"/>
      <path d="M16 54l4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4" stroke="#8b5cf6" stroke-width="2"/>
      <path d="M8 20l4-4"/>
      <path d="M4 20l4-4"/>
      <text x="44" y="16" font-size="4" fill="#dc2626" stroke="none">>5min</text>
    </svg>`
  },
  {
    id: 'peds-drowning',
    name: 'Near Drowning',
    domain: 'medicine',
    category: 'emergency',
    tags: ['drowning', 'submersion', 'water', 'hypoxia', 'aspiration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 40c4-4 8-4 12 0s8 4 12 0 8-4 12 0 8 4 12 0" stroke="#3b82f6" stroke-width="2"/>
      <path d="M8 48c4-4 8-4 12 0s8 4 12 0 8-4 12 0 8 4 12 0" stroke="#3b82f6"/>
      <path d="M8 56c4-4 8-4 12 0s8 4 12 0 8-4 12 0 8 4 12 0" stroke="#3b82f6" opacity="0.5"/>
      <circle cx="32" cy="20" r="10"/>
      <circle cx="29" cy="18" r="2" fill="currentColor"/>
      <circle cx="35" cy="18" r="2" fill="currentColor"/>
      <ellipse cx="32" cy="24" rx="4" ry="2"/>
      <path d="M32 30v8"/>
      <path d="M24 34h16"/>
    </svg>`
  },
  {
    id: 'peds-burns',
    name: 'Pediatric Burns',
    domain: 'medicine',
    category: 'emergency',
    tags: ['burns', 'scald', 'thermal', 'TBSA', 'fluid resuscitation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="14" r="8"/>
      <path d="M32 22v14"/>
      <path d="M24 28l-8 8"/>
      <path d="M40 28l8 8"/>
      <path d="M28 36l-4 20"/>
      <path d="M36 36l4 20"/>
      <ellipse cx="32" cy="32" rx="6" ry="4" fill="#dc2626" opacity="0.4"/>
      <ellipse cx="24" cy="44" rx="4" ry="6" fill="#f97316" opacity="0.4"/>
      <ellipse cx="40" cy="48" rx="3" ry="5" fill="#f97316" opacity="0.4"/>
      <text x="44" y="20" font-size="4" fill="currentColor" stroke="none">%TBSA</text>
    </svg>`
  },
  {
    id: 'peds-child-abuse',
    name: 'Child Abuse Screening',
    domain: 'medicine',
    category: 'emergency',
    tags: ['abuse', 'NAT', 'non-accidental trauma', 'bruising', 'fracture', 'safeguarding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="10"/>
      <circle cx="29" cy="14" r="2" fill="currentColor"/>
      <circle cx="35" cy="14" r="2" fill="currentColor"/>
      <path d="M29 20c2 1 4 1 6 0"/>
      <ellipse cx="24" cy="12" rx="3" ry="2" fill="#7c3aed" opacity="0.5"/>
      <path d="M32 26v12"/>
      <path d="M24 32l-8 8"/>
      <path d="M40 32l8 8"/>
      <path d="M28 38l-4 16"/>
      <path d="M36 38l4 16"/>
      <ellipse cx="20" cy="50" rx="4" ry="3" fill="#7c3aed" opacity="0.5"/>
      <ellipse cx="42" cy="44" rx="3" ry="4" fill="#7c3aed" opacity="0.5"/>
      <text x="44" y="60" font-size="4" fill="#dc2626" stroke="none">TEN-4</text>
    </svg>`
  },
  {
    id: 'peds-lead-poisoning',
    name: 'Lead Poisoning',
    domain: 'medicine',
    category: 'emergency',
    tags: ['lead', 'poisoning', 'plumbism', 'screening', 'chelation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="18" r="12"/>
      <circle cx="28" cy="16" r="2" fill="currentColor"/>
      <circle cx="36" cy="16" r="2" fill="currentColor"/>
      <path d="M28 22c2 1 6 1 8 0"/>
      <path d="M32 30v14"/>
      <path d="M24 36l-8 12"/>
      <path d="M40 36l8 12"/>
      <path d="M28 44l-4 12"/>
      <path d="M36 44l4 12"/>
      <rect x="8" y="48" width="12" height="8" rx="1" fill="#6b7280"/>
      <text x="10" y="54" font-size="5" fill="white" stroke="none">Pb</text>
      <path d="M8 12l-4 4"/>
      <path d="M4 12l4 4"/>
    </svg>`
  },

  // ===========================================================================
  // NEONATAL CONDITIONS (6 icons)
  // ===========================================================================
  {
    id: 'peds-prematurity',
    name: 'Premature Infant',
    domain: 'medicine',
    category: 'neonatal',
    tags: ['premature', 'preterm', 'VLBW', 'ELBW', 'gestational age'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="12" ry="10"/>
      <circle cx="28" cy="26" r="2" fill="currentColor"/>
      <circle cx="36" cy="26" r="2" fill="currentColor"/>
      <path d="M30 32c1 1 3 1 4 0"/>
      <ellipse cx="32" cy="46" rx="10" ry="8" fill="currentColor" opacity="0.1"/>
      <path d="M22 46l-6-4"/>
      <path d="M42 46l6-4"/>
      <path d="M26 54l-2 6"/>
      <path d="M38 54l2 6"/>
      <text x="8" y="12" font-size="4" fill="currentColor" stroke="none"><28wk</text>
      <text x="8" y="18" font-size="4" fill="currentColor" stroke="none"><1500g</text>
      <path d="M48 12h8"/>
      <path d="M52 8v8"/>
    </svg>`
  },
  {
    id: 'peds-nec',
    name: 'Necrotizing Enterocolitis',
    domain: 'medicine',
    category: 'neonatal',
    tags: ['NEC', 'necrotizing enterocolitis', 'premature', 'feeding intolerance', 'pneumatosis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <path d="M20 20c4 4 8 8 8 16s-4 12-4 16"/>
      <path d="M44 20c-4 4-8 8-8 16s4 12 4 16"/>
      <circle cx="24" cy="28" r="3" fill="#dc2626" opacity="0.5"/>
      <circle cx="36" cy="36" r="4" fill="#dc2626" opacity="0.5"/>
      <circle cx="28" cy="44" r="2" fill="#dc2626" opacity="0.5"/>
      <circle cx="40" cy="28" r="2"/>
      <circle cx="20" cy="36" r="1.5"/>
      <text x="6" y="56" font-size="4" fill="currentColor" stroke="none">Pneumatosis</text>
    </svg>`
  },
  {
    id: 'peds-rop',
    name: 'Retinopathy of Prematurity',
    domain: 'medicine',
    category: 'neonatal',
    tags: ['ROP', 'retinopathy', 'premature', 'ophthalmology', 'screening'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="12" ry="14"/>
      <ellipse cx="40" cy="32" rx="12" ry="14"/>
      <circle cx="24" cy="32" r="6"/>
      <circle cx="40" cy="32" r="6"/>
      <circle cx="24" cy="32" r="3" fill="currentColor"/>
      <circle cx="40" cy="32" r="3" fill="currentColor"/>
      <path d="M18 26c-2-2-4-4-6-4"/>
      <path d="M30 26c2-2 4-2 6-2"/>
      <path d="M34 26c-2-2-4-2-6-2"/>
      <path d="M46 26c2-2 4-4 6-4"/>
      <ellipse cx="24" cy="32" rx="10" ry="12" stroke-dasharray="2 2" stroke="#dc2626"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Zone I-III</text>
    </svg>`
  },
  {
    id: 'peds-hypoglycemia',
    name: 'Neonatal Hypoglycemia',
    domain: 'medicine',
    category: 'neonatal',
    tags: ['hypoglycemia', 'glucose', 'newborn', 'jitteriness', 'feeding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="12" ry="10"/>
      <circle cx="28" cy="22" r="2" fill="currentColor"/>
      <circle cx="36" cy="22" r="2" fill="currentColor"/>
      <path d="M28 28c2 1 6 1 8 0"/>
      <path d="M20 24c-4-2-8-2-12 0"/>
      <path d="M44 24c4-2 8-2 12 0"/>
      <ellipse cx="32" cy="44" rx="10" ry="8"/>
      <rect x="8" y="48" width="16" height="8" rx="2" fill="#fef08a"/>
      <text x="10" y="54" font-size="5" fill="currentColor" stroke="none">40</text>
      <path d="M16 40l-4-4"/>
      <text x="40" y="58" font-size="4" fill="#dc2626" stroke="none"><40mg/dL</text>
    </svg>`
  },
  {
    id: 'peds-birth-asphyxia',
    name: 'Birth Asphyxia',
    domain: 'medicine',
    category: 'neonatal',
    tags: ['asphyxia', 'HIE', 'hypoxic ischemic', 'encephalopathy', 'cooling'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="14" ry="12"/>
      <circle cx="28" cy="22" r="2"/>
      <circle cx="36" cy="22" r="2"/>
      <path d="M28 28h8"/>
      <ellipse cx="32" cy="46" rx="12" ry="10" fill="#93c5fd" opacity="0.3"/>
      <path d="M20 46l-6-4"/>
      <path d="M44 46l6-4"/>
      <path d="M26 56l-2 4"/>
      <path d="M38 56l2 4"/>
      <path d="M8 16l4-4-4-4" stroke="#3b82f6"/>
      <path d="M56 16l-4-4 4-4" stroke="#3b82f6"/>
      <text x="12" y="60" font-size="4" fill="#3b82f6" stroke="none">Cooling</text>
    </svg>`
  },
  {
    id: 'peds-brachial-plexus',
    name: 'Brachial Plexus Injury',
    domain: 'medicine',
    category: 'neonatal',
    tags: ['Erb palsy', 'brachial plexus', 'birth injury', 'shoulder dystocia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="14" r="8"/>
      <circle cx="29" cy="13" r="1.5" fill="currentColor"/>
      <circle cx="35" cy="13" r="1.5" fill="currentColor"/>
      <path d="M30 17c1 1 3 1 4 0"/>
      <path d="M32 22v14"/>
      <path d="M20 26l-8 12" stroke-width="2"/>
      <path d="M44 26l8 12" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 2"/>
      <circle cx="12" cy="38" r="4"/>
      <path d="M52 38l4 4"/>
      <path d="M52 38l4-4"/>
      <path d="M28 36l-4 16"/>
      <path d="M36 36l4 16"/>
      <text x="40" y="56" font-size="4" fill="#dc2626" stroke="none">Erb</text>
    </svg>`
  },

  // ===========================================================================
  // DEVELOPMENTAL CONDITIONS (6 icons)
  // ===========================================================================
  {
    id: 'peds-hip-dysplasia',
    name: 'Developmental Hip Dysplasia',
    domain: 'medicine',
    category: 'developmental',
    tags: ['DDH', 'hip dysplasia', 'Barlow', 'Ortolani', 'Pavlik harness'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="20" ry="12"/>
      <circle cx="20" cy="32" r="8"/>
      <circle cx="44" cy="32" r="8" fill="#dc2626" opacity="0.2"/>
      <circle cx="20" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M20 40v16"/>
      <path d="M44 40c0 4 2 12 6 16" stroke="#dc2626"/>
      <ellipse cx="20" cy="56" rx="4" ry="2"/>
      <ellipse cx="50" cy="56" rx="4" ry="2"/>
      <text x="4" y="48" font-size="4" fill="currentColor" stroke="none">Normal</text>
      <text x="44" y="48" font-size="4" fill="#dc2626" stroke="none">DDH</text>
    </svg>`
  },
  {
    id: 'peds-torticollis',
    name: 'Congenital Torticollis',
    domain: 'medicine',
    category: 'developmental',
    tags: ['torticollis', 'SCM', 'sternocleidomastoid', 'head tilt', 'wry neck'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="20" rx="12" ry="10" transform="rotate(-15 24 20)"/>
      <circle cx="20" cy="18" r="2" fill="currentColor"/>
      <circle cx="26" cy="16" r="2" fill="currentColor"/>
      <path d="M21 24c2 1 4 1 6 0"/>
      <path d="M28 28l8 24" stroke-width="3"/>
      <ellipse cx="36" cy="52" rx="10" ry="8"/>
      <path d="M20 28l-4 8" stroke="#dc2626" stroke-width="2"/>
      <ellipse cx="16" cy="36" rx="4" ry="2" fill="#dc2626" opacity="0.3"/>
      <text x="4" y="40" font-size="4" fill="#dc2626" stroke="none">SCM</text>
      <text x="4" y="46" font-size="4" fill="#dc2626" stroke="none">mass</text>
    </svg>`
  },
  {
    id: 'peds-plagiocephaly',
    name: 'Plagiocephaly',
    domain: 'medicine',
    category: 'developmental',
    tags: ['plagiocephaly', 'flat head', 'positional', 'craniosynostosis', 'helmet'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="18" ry="14"/>
      <path d="M14 28c0 4 4 12 18 12s18-8 18-12" fill="currentColor" opacity="0.1"/>
      <circle cx="26" cy="26" r="2" fill="currentColor"/>
      <circle cx="38" cy="26" r="2" fill="currentColor"/>
      <path d="M28 32c2 1 6 1 8 0"/>
      <ellipse cx="48" cy="24" rx="6" ry="10" fill="#fca5a5" opacity="0.3"/>
      <path d="M8 28l-4-4"/>
      <path d="M4 28l4-4"/>
      <text x="4" y="48" font-size="4" fill="currentColor" stroke="none">Flat</text>
      <text x="48" y="48" font-size="4" fill="currentColor" stroke="none">Bulge</text>
    </svg>`
  },
  {
    id: 'peds-clubfoot',
    name: 'Clubfoot (Talipes)',
    domain: 'medicine',
    category: 'developmental',
    tags: ['clubfoot', 'talipes', 'equinovarus', 'Ponseti', 'casting'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-4 12-8 28-8 40 0 8 8 8 12 8"/>
      <path d="M44 8c4 12 8 28 8 40 0 8-8 8-12 8"/>
      <ellipse cx="24" cy="56" rx="10" ry="4"/>
      <path d="M14 56c0 4 4 4 10 4"/>
      <ellipse cx="44" cy="48" rx="8" ry="6" transform="rotate(30 44 48)"/>
      <path d="M36 52c4 1 8 0 12-2" stroke="#dc2626"/>
      <path d="M48 42l8 4"/>
      <path d="M48 50l8-4"/>
      <text x="4" y="24" font-size="4" fill="currentColor" stroke="none">Normal</text>
      <text x="40" y="24" font-size="4" fill="#dc2626" stroke="none">CTEV</text>
    </svg>`
  },
  {
    id: 'peds-autism-spectrum',
    name: 'Autism Spectrum Disorder',
    domain: 'medicine',
    category: 'developmental',
    tags: ['autism', 'ASD', 'developmental', 'communication', 'social', 'screening'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="14"/>
      <circle cx="28" cy="22" r="2"/>
      <circle cx="36" cy="22" r="2"/>
      <path d="M28 30h8"/>
      <path d="M20 12l-4-4"/>
      <path d="M44 12l4-4"/>
      <path d="M32 38v8"/>
      <path d="M24 42l-8 4"/>
      <path d="M40 42l8 4"/>
      <circle cx="16" cy="46" r="4" fill="#8b5cf6" opacity="0.3"/>
      <circle cx="48" cy="46" r="4" fill="#8b5cf6" opacity="0.3"/>
      <circle cx="32" cy="54" r="4" fill="#8b5cf6" opacity="0.3"/>
      <text x="8" y="60" font-size="4" fill="currentColor" stroke="none">Social</text>
      <text x="40" y="60" font-size="4" fill="currentColor" stroke="none">Comm</text>
    </svg>`
  },
  {
    id: 'peds-adhd',
    name: 'ADHD',
    domain: 'medicine',
    category: 'developmental',
    tags: ['ADHD', 'attention', 'hyperactivity', 'impulsivity', 'Vanderbilt'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="12"/>
      <circle cx="28" cy="18" r="2" fill="currentColor"/>
      <circle cx="36" cy="18" r="2" fill="currentColor"/>
      <path d="M28 24c2 2 6 2 8 0"/>
      <path d="M8 8l8 4"/>
      <path d="M56 8l-8 4"/>
      <path d="M8 16l8-4"/>
      <path d="M56 16l-8-4"/>
      <path d="M32 32v8"/>
      <path d="M20 36l-12 8"/>
      <path d="M44 36l12 8"/>
      <path d="M24 44l-8 12"/>
      <path d="M40 44l8 12"/>
      <path d="M16 56l4-4 4 4"/>
      <path d="M40 56l4-4 4 4"/>
    </svg>`
  },

  // ===========================================================================
  // COMMON INFANT CONDITIONS (5 icons)
  // ===========================================================================
  {
    id: 'peds-colic',
    name: 'Infantile Colic',
    domain: 'medicine',
    category: 'infant-conditions',
    tags: ['colic', 'crying', 'fussiness', 'rule of 3s', 'Wessel criteria'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="14" ry="12"/>
      <ellipse cx="28" cy="26" rx="3" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="36" cy="26" rx="3" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="34" rx="6" ry="4"/>
      <path d="M12 16l-4-4"/>
      <path d="M52 16l4-4"/>
      <path d="M8 20l-4 0"/>
      <path d="M56 20l4 0"/>
      <ellipse cx="32" cy="50" rx="10" ry="8"/>
      <path d="M26 48c4 1 8 1 12 0"/>
      <path d="M26 52c4 1 8 1 12 0"/>
      <text x="8" y="60" font-size="4" fill="currentColor" stroke="none">3hr/3d/3wk</text>
    </svg>`
  },
  {
    id: 'peds-teething',
    name: 'Teething',
    domain: 'medicine',
    category: 'infant-conditions',
    tags: ['teething', 'eruption', 'primary teeth', 'drooling', 'fussiness'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="14" ry="12"/>
      <circle cx="28" cy="26" r="2" fill="currentColor"/>
      <circle cx="36" cy="26" r="2" fill="currentColor"/>
      <path d="M26 34c4 2 8 2 12 0"/>
      <rect x="28" y="32" width="3" height="6" rx="1" fill="white" stroke="currentColor"/>
      <rect x="33" y="34" width="3" height="4" rx="1" fill="white" stroke="currentColor"/>
      <path d="M20 36l-4 8" stroke="#3b82f6"/>
      <path d="M44 36l4 8" stroke="#3b82f6"/>
      <ellipse cx="16" cy="44" rx="2" ry="3" fill="#3b82f6" opacity="0.3"/>
      <ellipse cx="48" cy="44" rx="2" ry="3" fill="#3b82f6" opacity="0.3"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">6-12mo</text>
    </svg>`
  },
  {
    id: 'peds-diaper-dermatitis',
    name: 'Diaper Dermatitis',
    domain: 'medicine',
    category: 'infant-conditions',
    tags: ['diaper rash', 'dermatitis', 'candida', 'irritant', 'barrier cream'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c0-4 8-8 16-8s16 4 16 8"/>
      <path d="M16 16v24c0 8 8 16 16 16s16-8 16-16V16"/>
      <ellipse cx="32" cy="36" rx="12" ry="10" fill="#fca5a5" opacity="0.4"/>
      <circle cx="26" cy="32" r="2" fill="#dc2626"/>
      <circle cx="38" cy="34" r="2" fill="#dc2626"/>
      <circle cx="32" cy="40" r="2" fill="#dc2626"/>
      <circle cx="28" cy="42" r="1.5" fill="#dc2626"/>
      <circle cx="36" cy="38" r="1.5" fill="#dc2626"/>
      <path d="M20 16l-4-8"/>
      <path d="M44 16l4-8"/>
    </svg>`
  },
  {
    id: 'peds-cradle-cap',
    name: 'Cradle Cap',
    domain: 'medicine',
    category: 'infant-conditions',
    tags: ['cradle cap', 'seborrheic dermatitis', 'scalp', 'scales', 'infant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="18" ry="16"/>
      <path d="M14 32c0-12 8-20 18-20s18 8 18 20"/>
      <ellipse cx="32" cy="20" rx="12" ry="8" fill="#fef08a" opacity="0.5"/>
      <path d="M24 16c2-2 6-2 8 0" stroke="#f59e0b"/>
      <path d="M32 16c2-2 6-2 8 0" stroke="#f59e0b"/>
      <path d="M20 20c2-1 4-1 6 0" stroke="#f59e0b"/>
      <path d="M38 20c2-1 4-1 6 0" stroke="#f59e0b"/>
      <circle cx="26" cy="32" r="3" fill="currentColor"/>
      <circle cx="38" cy="32" r="3" fill="currentColor"/>
      <path d="M28 40c2 2 6 2 8 0"/>
    </svg>`
  },
  {
    id: 'peds-umbilical-granuloma',
    name: 'Umbilical Granuloma',
    domain: 'medicine',
    category: 'infant-conditions',
    tags: ['umbilical', 'granuloma', 'silver nitrate', 'cord', 'stump'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <circle cx="32" cy="32" r="8"/>
      <circle cx="32" cy="32" r="4" fill="#dc2626"/>
      <path d="M32 24v-8"/>
      <path d="M28 16h8"/>
      <path d="M24 32c-2 1-4 2-4 4"/>
      <path d="M40 32c2 1 4 2 4 4"/>
      <ellipse cx="20" cy="36" rx="2" ry="3" fill="#fef08a" opacity="0.5"/>
      <ellipse cx="44" cy="36" rx="2" ry="3" fill="#fef08a" opacity="0.5"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">AgNO3</text>
    </svg>`
  }
];

export default pediatricsIcons;
