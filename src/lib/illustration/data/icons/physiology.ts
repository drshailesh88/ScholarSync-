/**
 * Physiology Icon Library
 * Comprehensive SVG icons for physiological sciences
 *
 * Categories:
 * - Cardiac Physiology (action potentials, ECG waves, cardiac cycle)
 * - Respiratory Physiology (gas exchange, ventilation, lung volumes)
 * - Renal Physiology (nephron function, filtration, reabsorption)
 * - Neurophysiology (nerve conduction, synaptic transmission, reflexes)
 * - Muscle Physiology (contraction, sliding filament, motor units)
 * - Endocrine Physiology (hormone feedback loops, receptors)
 * - GI Physiology (digestion, absorption, motility)
 * - Metabolic Processes (ATP, glycolysis, Krebs cycle)
 * - Fluid/Electrolyte Balance
 * - Acid-Base Regulation
 * - Thermoregulation
 */

import type { IconDefinition } from './index';

export const physiologyIcons: IconDefinition[] = [
  // ===========================================================================
  // CARDIAC PHYSIOLOGY
  // ===========================================================================
  {
    id: 'physio-action-potential',
    name: 'Action Potential',
    domain: 'biology',
    category: 'cardiac-physiology',
    tags: ['action potential', 'depolarization', 'repolarization', 'membrane potential', 'voltage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 40h8l2-32 4 48 4-28 4 20 4-8h30"/>
      <path d="M4 32h56" stroke-dasharray="2 2" opacity="0.5"/>
      <text x="2" y="28" font-size="4" fill="currentColor" stroke="none">0</text>
      <text x="2" y="12" font-size="4" fill="currentColor" stroke="none">+</text>
      <text x="2" y="44" font-size="4" fill="currentColor" stroke="none">-</text>
      <text x="56" y="60" font-size="4" fill="currentColor" stroke="none">t</text>
    </svg>`
  },
  {
    id: 'physio-cardiac-action-potential',
    name: 'Cardiac Action Potential',
    domain: 'biology',
    category: 'cardiac-physiology',
    tags: ['cardiac', 'action potential', 'phases', 'plateau', 'ventricular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 48l8-40v8h20l8 8 8 24h12"/>
      <text x="8" y="16" font-size="3" fill="currentColor" stroke="none">0</text>
      <text x="18" y="20" font-size="3" fill="currentColor" stroke="none">1</text>
      <text x="28" y="22" font-size="3" fill="currentColor" stroke="none">2</text>
      <text x="42" y="36" font-size="3" fill="currentColor" stroke="none">3</text>
      <text x="52" y="50" font-size="3" fill="currentColor" stroke="none">4</text>
      <path d="M4 44h56" stroke-dasharray="2 2" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'physio-ecg-pqrst',
    name: 'ECG PQRST Wave',
    domain: 'biology',
    category: 'cardiac-physiology',
    tags: ['ECG', 'EKG', 'PQRST', 'wave', 'electrocardiogram', 'P wave', 'QRS', 'T wave'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 36h8c2-4 4-4 6 0l2-24 4 32 2-8h4c2-6 4-6 6 0h26"/>
      <text x="14" y="28" font-size="4" fill="currentColor" stroke="none">P</text>
      <text x="22" y="10" font-size="4" fill="currentColor" stroke="none">R</text>
      <text x="28" y="48" font-size="4" fill="currentColor" stroke="none">S</text>
      <text x="38" y="28" font-size="4" fill="currentColor" stroke="none">T</text>
      <path d="M18 54h8" stroke-width="2"/>
      <text x="18" y="60" font-size="3" fill="currentColor" stroke="none">PR</text>
      <path d="M26 54h8" stroke-width="2"/>
      <text x="26" y="60" font-size="3" fill="currentColor" stroke="none">QRS</text>
    </svg>`
  },
  {
    id: 'physio-cardiac-cycle',
    name: 'Cardiac Cycle',
    domain: 'biology',
    category: 'cardiac-physiology',
    tags: ['cardiac cycle', 'systole', 'diastole', 'wiggers', 'pressure-volume'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <path d="M32 8v48" stroke-dasharray="2 2"/>
      <path d="M8 32h48" stroke-dasharray="2 2"/>
      <path d="M32 8a24 24 0 0 1 0 48" fill="currentColor" opacity="0.2"/>
      <text x="18" y="28" font-size="4" fill="currentColor" stroke="none">Dia</text>
      <text x="38" y="28" font-size="4" fill="currentColor" stroke="none">Sys</text>
      <text x="18" y="40" font-size="4" fill="currentColor" stroke="none">Fill</text>
      <text x="38" y="40" font-size="4" fill="currentColor" stroke="none">Eject</text>
    </svg>`
  },
  {
    id: 'physio-pv-loop',
    name: 'Pressure-Volume Loop',
    domain: 'biology',
    category: 'cardiac-physiology',
    tags: ['PV loop', 'pressure', 'volume', 'ventricular', 'ESPVR', 'EDPVR'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56V8"/>
      <path d="M8 56h48"/>
      <path d="M16 48c0-20 8-32 20-32h8v16h-8c-8 0-12 8-12 16z" fill="currentColor" opacity="0.2"/>
      <path d="M16 48c0-20 8-32 20-32h8v16h-8c-8 0-12 8-12 16z"/>
      <text x="4" y="10" font-size="3" fill="currentColor" stroke="none">P</text>
      <text x="52" y="60" font-size="3" fill="currentColor" stroke="none">V</text>
      <circle cx="16" cy="48" r="2" fill="currentColor"/>
      <circle cx="36" cy="16" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'physio-starling-curve',
    name: 'Frank-Starling Curve',
    domain: 'biology',
    category: 'cardiac-physiology',
    tags: ['Frank-Starling', 'cardiac output', 'preload', 'venous return', 'performance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56V8"/>
      <path d="M8 56h48"/>
      <path d="M12 52c8-16 20-32 40-36"/>
      <path d="M12 52c8-8 20-16 40-12" stroke-dasharray="4 2"/>
      <text x="2" y="12" font-size="3" fill="currentColor" stroke="none">CO</text>
      <text x="46" y="60" font-size="3" fill="currentColor" stroke="none">EDV</text>
      <circle cx="36" cy="24" r="2" fill="currentColor"/>
      <path d="M36 24l8-4"/>
      <text x="44" y="22" font-size="3" fill="currentColor" stroke="none">Normal</text>
    </svg>`
  },
  {
    id: 'physio-wiggers-diagram',
    name: 'Wiggers Diagram',
    domain: 'biology',
    category: 'cardiac-physiology',
    tags: ['Wiggers', 'cardiac cycle', 'pressure', 'ECG', 'heart sounds'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="2" fill="none"/>
      <path d="M8 16c4-4 8-4 12 0l2-8 4 12 2-4h28"/>
      <path d="M8 32c8-4 16-8 24 4s16 4 24-4"/>
      <path d="M8 48h8l4-4 4 8 4-4h28"/>
      <text x="2" y="18" font-size="3" fill="currentColor" stroke="none">ECG</text>
      <text x="2" y="34" font-size="3" fill="currentColor" stroke="none">P</text>
      <text x="2" y="50" font-size="3" fill="currentColor" stroke="none">S</text>
    </svg>`
  },
  {
    id: 'physio-cardiac-output',
    name: 'Cardiac Output',
    domain: 'biology',
    category: 'cardiac-physiology',
    tags: ['cardiac output', 'CO', 'stroke volume', 'heart rate', 'SV', 'HR'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-12 0-20 10-20 22 0 14 20 26 20 26s20-12 20-26c0-12-8-22-20-22z"/>
      <path d="M32 20v24"/>
      <path d="M24 32h16"/>
      <circle cx="32" cy="44" r="4" fill="currentColor" opacity="0.3"/>
      <text x="8" y="60" font-size="4" fill="currentColor" stroke="none">CO=SV×HR</text>
    </svg>`
  },
  {
    id: 'physio-contractility',
    name: 'Myocardial Contractility',
    domain: 'biology',
    category: 'cardiac-physiology',
    tags: ['contractility', 'inotropy', 'positive', 'negative', 'myocardial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2"/>
      <path d="M16 32h8l4-8 4 16 4-8h12"/>
      <path d="M16 24v16"/>
      <path d="M48 24v16"/>
      <path d="M24 24l-4 4"/>
      <path d="M40 24l4 4"/>
      <text x="24" y="58" font-size="4" fill="currentColor" stroke="none">Force</text>
    </svg>`
  },
  {
    id: 'physio-baroreceptor-reflex',
    name: 'Baroreceptor Reflex',
    domain: 'biology',
    category: 'cardiac-physiology',
    tags: ['baroreceptor', 'reflex', 'blood pressure', 'carotid', 'aortic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8"/>
      <path d="M24 16l-8 12"/>
      <path d="M40 16l8 12"/>
      <rect x="12" y="28" width="12" height="8" rx="1"/>
      <rect x="40" y="28" width="12" height="8" rx="1"/>
      <path d="M18 36v8"/>
      <path d="M46 36v8"/>
      <ellipse cx="32" cy="52" rx="16" ry="8"/>
      <path d="M18 44c4 4 12 8 28 0"/>
      <text x="28" y="14" font-size="4" fill="currentColor" stroke="none">CNS</text>
    </svg>`
  },

  // ===========================================================================
  // RESPIRATORY PHYSIOLOGY
  // ===========================================================================
  {
    id: 'physio-gas-exchange',
    name: 'Gas Exchange',
    domain: 'biology',
    category: 'respiratory-physiology',
    tags: ['gas exchange', 'O2', 'CO2', 'alveoli', 'diffusion', 'respiration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="16"/>
      <path d="M40 24c8 0 16 4 16 8s-8 8-16 8"/>
      <path d="M28 24l-8 8 8 8" stroke="red"/>
      <path d="M36 24l8 8-8 8" stroke="blue"/>
      <text x="10" y="34" font-size="5" fill="red" stroke="none">O₂</text>
      <text x="46" y="34" font-size="5" fill="blue" stroke="none">CO₂</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Alveolus</text>
      <text x="40" y="58" font-size="4" fill="currentColor" stroke="none">Capillary</text>
    </svg>`
  },
  {
    id: 'physio-lung-volumes',
    name: 'Lung Volumes',
    domain: 'biology',
    category: 'respiratory-physiology',
    tags: ['lung volumes', 'spirometry', 'tidal volume', 'vital capacity', 'residual volume'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56V8"/>
      <path d="M8 56h48"/>
      <path d="M12 40c4-4 8 4 12 0s8 4 12 0 8 4 12 0"/>
      <path d="M12 48h48" stroke-dasharray="2 2"/>
      <path d="M12 32h48" stroke-dasharray="2 2"/>
      <path d="M12 16h48" stroke-dasharray="2 2"/>
      <text x="52" y="50" font-size="3" fill="currentColor" stroke="none">RV</text>
      <text x="52" y="42" font-size="3" fill="currentColor" stroke="none">ERV</text>
      <text x="52" y="34" font-size="3" fill="currentColor" stroke="none">TV</text>
      <text x="52" y="18" font-size="3" fill="currentColor" stroke="none">IRV</text>
    </svg>`
  },
  {
    id: 'physio-ventilation-perfusion',
    name: 'V/Q Ratio',
    domain: 'biology',
    category: 'respiratory-physiology',
    tags: ['V/Q', 'ventilation', 'perfusion', 'ratio', 'mismatch', 'shunt'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56V8"/>
      <path d="M8 56h48"/>
      <path d="M12 48c8-8 20-16 36-8" stroke="blue"/>
      <path d="M12 48c8-32 20-36 36-40" stroke="red"/>
      <text x="12" y="60" font-size="3" fill="currentColor" stroke="none">Base</text>
      <text x="44" y="60" font-size="3" fill="currentColor" stroke="none">Apex</text>
      <text x="4" y="12" font-size="3" fill="currentColor" stroke="none">V,Q</text>
      <circle cx="44" cy="16" r="4" fill="red" opacity="0.3"/>
      <text x="50" y="18" font-size="3" fill="currentColor" stroke="none">V</text>
      <circle cx="44" cy="32" r="4" fill="blue" opacity="0.3"/>
      <text x="50" y="34" font-size="3" fill="currentColor" stroke="none">Q</text>
    </svg>`
  },
  {
    id: 'physio-oxygen-dissociation',
    name: 'Oxygen-Hemoglobin Curve',
    domain: 'biology',
    category: 'respiratory-physiology',
    tags: ['oxygen', 'hemoglobin', 'dissociation', 'saturation', 'sigmoid', 'Bohr effect'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56V8"/>
      <path d="M8 56h48"/>
      <path d="M12 52c4-8 12-28 24-36 8-4 16-4 20 0"/>
      <path d="M12 52c8-8 16-28 28-36 8-4 16-2 16 4" stroke-dasharray="4 2"/>
      <text x="2" y="12" font-size="3" fill="currentColor" stroke="none">%</text>
      <text x="50" y="60" font-size="3" fill="currentColor" stroke="none">PO₂</text>
      <circle cx="36" cy="24" r="2" fill="currentColor"/>
      <text x="38" y="22" font-size="3" fill="currentColor" stroke="none">P50</text>
    </svg>`
  },
  {
    id: 'physio-respiratory-compliance',
    name: 'Lung Compliance',
    domain: 'biology',
    category: 'respiratory-physiology',
    tags: ['compliance', 'elasticity', 'lung', 'chest wall', 'pressure-volume'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56V8"/>
      <path d="M8 56h48"/>
      <path d="M12 52c8-8 16-24 40-36"/>
      <path d="M12 52c16-4 28-20 40-28" stroke-dasharray="4 2"/>
      <text x="2" y="12" font-size="3" fill="currentColor" stroke="none">V</text>
      <text x="50" y="60" font-size="3" fill="currentColor" stroke="none">P</text>
      <text x="40" y="16" font-size="3" fill="currentColor" stroke="none">↑C</text>
      <text x="48" y="28" font-size="3" fill="currentColor" stroke="none">↓C</text>
    </svg>`
  },
  {
    id: 'physio-surfactant',
    name: 'Pulmonary Surfactant',
    domain: 'biology',
    category: 'respiratory-physiology',
    tags: ['surfactant', 'surface tension', 'alveoli', 'laplace', 'type II'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="16" stroke-dasharray="2 2"/>
      <path d="M16 32c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0 4-2 6 0" fill="currentColor" opacity="0.3"/>
      <circle cx="20" cy="28" r="2" fill="currentColor"/>
      <circle cx="28" cy="30" r="2" fill="currentColor"/>
      <circle cx="36" cy="30" r="2" fill="currentColor"/>
      <circle cx="44" cy="28" r="2" fill="currentColor"/>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Surfactant</text>
    </svg>`
  },
  {
    id: 'physio-respiratory-centers',
    name: 'Respiratory Control Centers',
    domain: 'biology',
    category: 'respiratory-physiology',
    tags: ['respiratory centers', 'medulla', 'pons', 'chemoreceptors', 'breathing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="16" ry="10"/>
      <rect x="20" y="26" width="24" height="12" rx="2"/>
      <rect x="16" y="38" width="32" height="14" rx="2"/>
      <path d="M32 52v8"/>
      <path d="M24 60l8-4 8 4"/>
      <text x="26" y="18" font-size="3" fill="currentColor" stroke="none">Pons</text>
      <text x="22" y="34" font-size="3" fill="currentColor" stroke="none">Medulla</text>
      <text x="22" y="48" font-size="3" fill="currentColor" stroke="none">Spinal</text>
    </svg>`
  },
  {
    id: 'physio-co2-transport',
    name: 'CO2 Transport',
    domain: 'biology',
    category: 'respiratory-physiology',
    tags: ['CO2', 'bicarbonate', 'chloride shift', 'carbonic anhydrase', 'transport'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16" fill="currentColor" opacity="0.1"/>
      <path d="M12 24l8 8-8 8"/>
      <path d="M52 24l-8 8 8 8"/>
      <text x="18" y="28" font-size="4" fill="currentColor" stroke="none">CO₂</text>
      <text x="32" y="34" font-size="3" fill="currentColor" stroke="none">HCO₃⁻</text>
      <text x="40" y="28" font-size="4" fill="currentColor" stroke="none">Cl⁻</text>
      <path d="M28 40l8-4 8 4"/>
      <text x="28" y="52" font-size="3" fill="currentColor" stroke="none">RBC</text>
    </svg>`
  },

  // ===========================================================================
  // RENAL PHYSIOLOGY
  // ===========================================================================
  {
    id: 'physio-nephron-function',
    name: 'Nephron Function',
    domain: 'biology',
    category: 'renal-physiology',
    tags: ['nephron', 'filtration', 'reabsorption', 'secretion', 'tubule'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="10"/>
      <path d="M26 16c8 0 12 8 12 16s-4 16-12 16"/>
      <path d="M26 48c-8 0-12-8-6-12 6-4 12 4 18 0s6-16-6-16"/>
      <path d="M38 20v36"/>
      <circle cx="16" cy="16" r="4" fill="currentColor" opacity="0.3"/>
      <text x="8" y="54" font-size="3" fill="currentColor" stroke="none">Filter</text>
      <text x="28" y="54" font-size="3" fill="currentColor" stroke="none">Reab</text>
      <text x="46" y="54" font-size="3" fill="currentColor" stroke="none">Secr</text>
    </svg>`
  },
  {
    id: 'physio-gfr',
    name: 'Glomerular Filtration Rate',
    domain: 'biology',
    category: 'renal-physiology',
    tags: ['GFR', 'glomerular', 'filtration', 'creatinine', 'clearance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="16"/>
      <path d="M24 40l-8 16"/>
      <path d="M40 40l8 16"/>
      <path d="M20 24c0-4 4-8 12-8s12 4 12 8"/>
      <path d="M32 32v8"/>
      <circle cx="32" cy="24" r="8" fill="currentColor" opacity="0.2"/>
      <path d="M24 20l-4-4"/>
      <path d="M40 20l4-4"/>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">GFR=125mL/min</text>
    </svg>`
  },
  {
    id: 'physio-tubular-reabsorption',
    name: 'Tubular Reabsorption',
    domain: 'biology',
    category: 'renal-physiology',
    tags: ['reabsorption', 'tubular', 'sodium', 'glucose', 'proximal tubule'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="20" height="32" rx="4"/>
      <rect x="36" y="16" width="20" height="32" rx="4"/>
      <path d="M28 24l8 0" stroke="blue"/>
      <path d="M28 32l8 0" stroke="green"/>
      <path d="M28 40l8 0" stroke="orange"/>
      <text x="10" y="26" font-size="3" fill="currentColor" stroke="none">Na⁺</text>
      <text x="10" y="34" font-size="3" fill="currentColor" stroke="none">Glu</text>
      <text x="10" y="42" font-size="3" fill="currentColor" stroke="none">H₂O</text>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Tubule</text>
      <text x="36" y="58" font-size="3" fill="currentColor" stroke="none">Blood</text>
    </svg>`
  },
  {
    id: 'physio-countercurrent',
    name: 'Countercurrent Mechanism',
    domain: 'biology',
    category: 'renal-physiology',
    tags: ['countercurrent', 'loop of Henle', 'concentration', 'multiplier', 'medulla'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8v32c0 8 8 16 16 16"/>
      <path d="M36 56V24c0-8 8-16 16-16"/>
      <path d="M20 8l-4 4"/>
      <path d="M52 8l4 4"/>
      <path d="M24 24l4 0"/>
      <path d="M32 32l4 0"/>
      <path d="M40 40l4 0"/>
      <text x="8" y="20" font-size="3" fill="currentColor" stroke="none">300</text>
      <text x="8" y="44" font-size="3" fill="currentColor" stroke="none">600</text>
      <text x="48" y="20" font-size="3" fill="currentColor" stroke="none">300</text>
      <text x="48" y="44" font-size="3" fill="currentColor" stroke="none">600</text>
      <text x="24" y="62" font-size="3" fill="currentColor" stroke="none">1200</text>
    </svg>`
  },
  {
    id: 'physio-renin-angiotensin',
    name: 'Renin-Angiotensin-Aldosterone',
    domain: 'biology',
    category: 'renal-physiology',
    tags: ['RAAS', 'renin', 'angiotensin', 'aldosterone', 'blood pressure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="8"/>
      <circle cx="48" cy="16" r="8"/>
      <circle cx="16" cy="48" r="8"/>
      <circle cx="48" cy="48" r="8"/>
      <path d="M24 16h16"/>
      <path d="M16 24v16"/>
      <path d="M48 24v16"/>
      <path d="M24 48h16"/>
      <text x="10" y="18" font-size="3" fill="currentColor" stroke="none">Renin</text>
      <text x="42" y="18" font-size="3" fill="currentColor" stroke="none">AngI</text>
      <text x="42" y="50" font-size="3" fill="currentColor" stroke="none">AngII</text>
      <text x="10" y="50" font-size="3" fill="currentColor" stroke="none">Aldo</text>
    </svg>`
  },
  {
    id: 'physio-adh-mechanism',
    name: 'ADH Mechanism',
    domain: 'biology',
    category: 'renal-physiology',
    tags: ['ADH', 'vasopressin', 'aquaporins', 'water reabsorption', 'collecting duct'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="12" ry="6"/>
      <path d="M32 18v8"/>
      <rect x="16" y="26" width="32" height="28" rx="2"/>
      <circle cx="24" cy="36" r="3"/>
      <circle cx="32" cy="40" r="3"/>
      <circle cx="40" cy="36" r="3"/>
      <path d="M24 42l0 8"/>
      <path d="M32 46l0 4"/>
      <path d="M40 42l0 8"/>
      <text x="24" y="14" font-size="3" fill="currentColor" stroke="none">ADH</text>
      <text x="50" y="40" font-size="3" fill="currentColor" stroke="none">AQP2</text>
      <text x="10" y="60" font-size="3" fill="currentColor" stroke="none">H₂O reabsorption</text>
    </svg>`
  },
  {
    id: 'physio-clearance',
    name: 'Renal Clearance',
    domain: 'biology',
    category: 'renal-physiology',
    tags: ['clearance', 'renal', 'creatinine', 'inulin', 'excretion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="20" ry="12"/>
      <path d="M20 32v20c0 4 4 8 12 8s12-4 12-8V32"/>
      <path d="M12 20l8 8"/>
      <path d="M52 20l-8 8"/>
      <path d="M28 40h8"/>
      <path d="M32 36v8"/>
      <text x="8" y="60" font-size="4" fill="currentColor" stroke="none">C=(U×V)/P</text>
    </svg>`
  },

  // ===========================================================================
  // NEUROPHYSIOLOGY
  // ===========================================================================
  {
    id: 'physio-nerve-conduction',
    name: 'Nerve Conduction',
    domain: 'biology',
    category: 'neurophysiology',
    tags: ['nerve', 'conduction', 'saltatory', 'myelin', 'nodes of Ranvier'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32h56"/>
      <ellipse cx="16" cy="32" rx="8" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="36" cy="32" rx="8" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="56" cy="32" rx="4" ry="6" fill="currentColor" opacity="0.2"/>
      <path d="M8 24c2 0 4-2 4-4"/>
      <path d="M28 24c2 0 4-2 4-4"/>
      <path d="M48 24c2 0 4-2 4-4"/>
      <path d="M8 20l16 0" stroke="red" stroke-dasharray="2 1"/>
      <path d="M28 20l16 0" stroke="red" stroke-dasharray="2 1"/>
      <text x="20" y="48" font-size="3" fill="currentColor" stroke="none">Saltatory conduction</text>
    </svg>`
  },
  {
    id: 'physio-synaptic-transmission',
    name: 'Synaptic Transmission',
    domain: 'biology',
    category: 'neurophysiology',
    tags: ['synapse', 'neurotransmitter', 'vesicle', 'receptor', 'postsynaptic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="24" height="20" rx="4"/>
      <rect x="8" y="36" width="24" height="20" rx="4"/>
      <circle cx="16" cy="18" r="3" fill="currentColor"/>
      <circle cx="24" cy="18" r="3" fill="currentColor"/>
      <circle cx="20" cy="24" r="3" fill="currentColor"/>
      <path d="M16 28v8"/>
      <path d="M20 28v8"/>
      <path d="M24 28v8"/>
      <ellipse cx="16" cy="42" rx="2" ry="3"/>
      <ellipse cx="20" cy="42" rx="2" ry="3"/>
      <ellipse cx="24" cy="42" rx="2" ry="3"/>
      <text x="36" y="16" font-size="3" fill="currentColor" stroke="none">Presynaptic</text>
      <text x="36" y="32" font-size="3" fill="currentColor" stroke="none">Cleft</text>
      <text x="36" y="48" font-size="3" fill="currentColor" stroke="none">Postsynaptic</text>
    </svg>`
  },
  {
    id: 'physio-reflex-arc',
    name: 'Reflex Arc',
    domain: 'biology',
    category: 'neurophysiology',
    tags: ['reflex', 'arc', 'sensory', 'motor', 'interneuron', 'spinal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="12"/>
      <path d="M8 56c0-16 8-24 16-32"/>
      <path d="M56 56c0-16-8-24-16-32"/>
      <circle cx="8" cy="56" r="4"/>
      <circle cx="56" cy="56" r="4"/>
      <path d="M4 52l4 4"/>
      <path d="M52 52l8 8"/>
      <text x="26" y="18" font-size="3" fill="currentColor" stroke="none">CNS</text>
      <text x="4" y="46" font-size="3" fill="currentColor" stroke="none">S</text>
      <text x="54" y="46" font-size="3" fill="currentColor" stroke="none">M</text>
    </svg>`
  },
  {
    id: 'physio-membrane-potential',
    name: 'Resting Membrane Potential',
    domain: 'biology',
    category: 'neurophysiology',
    tags: ['resting potential', 'membrane', 'Na', 'K', 'ion channels'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <line x1="8" y1="32" x2="56" y2="32" stroke-width="2"/>
      <circle cx="20" cy="16" r="4"/>
      <circle cx="36" cy="16" r="4"/>
      <circle cx="20" cy="48" r="4"/>
      <circle cx="36" cy="48" r="4"/>
      <path d="M20 20v4"/>
      <path d="M36 20v4"/>
      <path d="M20 40v4"/>
      <path d="M36 40v4"/>
      <text x="16" y="18" font-size="4" fill="currentColor" stroke="none">Na⁺</text>
      <text x="32" y="18" font-size="4" fill="currentColor" stroke="none">K⁺</text>
      <text x="48" y="20" font-size="3" fill="currentColor" stroke="none">+</text>
      <text x="48" y="48" font-size="3" fill="currentColor" stroke="none">-</text>
    </svg>`
  },
  {
    id: 'physio-ion-channels',
    name: 'Voltage-Gated Ion Channels',
    domain: 'biology',
    category: 'neurophysiology',
    tags: ['ion channel', 'voltage-gated', 'sodium', 'potassium', 'gating'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="48" rx="4"/>
      <path d="M24 20h16"/>
      <path d="M24 44h16"/>
      <circle cx="32" cy="32" r="6"/>
      <path d="M28 32h8"/>
      <path d="M32 28v8"/>
      <text x="8" y="16" font-size="3" fill="currentColor" stroke="none">Out</text>
      <text x="8" y="52" font-size="3" fill="currentColor" stroke="none">In</text>
      <text x="48" y="32" font-size="3" fill="currentColor" stroke="none">Gate</text>
      <path d="M32 8v-4"/>
      <path d="M32 56v4"/>
    </svg>`
  },
  {
    id: 'physio-neuromuscular-junction',
    name: 'Neuromuscular Junction',
    domain: 'biology',
    category: 'neurophysiology',
    tags: ['NMJ', 'neuromuscular', 'acetylcholine', 'motor endplate', 'muscle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h24"/>
      <circle cx="36" cy="24" r="8"/>
      <rect x="32" y="36" width="24" height="20" rx="2" fill="currentColor" opacity="0.2"/>
      <circle cx="34" cy="22" r="2" fill="currentColor"/>
      <circle cx="38" cy="26" r="2" fill="currentColor"/>
      <path d="M34 28v8"/>
      <path d="M38 28v8"/>
      <path d="M42 28v8"/>
      <rect x="32" y="38" width="4" height="4"/>
      <rect x="38" y="38" width="4" height="4"/>
      <rect x="44" y="38" width="4" height="4"/>
      <text x="8" y="20" font-size="3" fill="currentColor" stroke="none">Motor</text>
      <text x="48" y="52" font-size="3" fill="currentColor" stroke="none">Muscle</text>
    </svg>`
  },
  {
    id: 'physio-epsp-ipsp',
    name: 'EPSP and IPSP',
    domain: 'biology',
    category: 'neurophysiology',
    tags: ['EPSP', 'IPSP', 'excitatory', 'inhibitory', 'postsynaptic potential'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56V8"/>
      <path d="M8 32h48"/>
      <path d="M12 32c4-12 8-12 12 0" stroke="green"/>
      <path d="M28 32c4 12 8 12 12 0" stroke="red"/>
      <path d="M44 32c2-8 4-8 8-4 2 2 2 4 0 4" stroke="blue"/>
      <text x="14" y="18" font-size="3" fill="currentColor" stroke="none">EPSP</text>
      <text x="30" y="48" font-size="3" fill="currentColor" stroke="none">IPSP</text>
      <text x="46" y="22" font-size="3" fill="currentColor" stroke="none">AP</text>
      <path d="M8 24h48" stroke-dasharray="2 2" opacity="0.5"/>
      <text x="52" y="26" font-size="3" fill="currentColor" stroke="none">Thr</text>
    </svg>`
  },

  // ===========================================================================
  // MUSCLE PHYSIOLOGY
  // ===========================================================================
  {
    id: 'physio-sliding-filament',
    name: 'Sliding Filament Model',
    domain: 'biology',
    category: 'muscle-physiology',
    tags: ['sliding filament', 'actin', 'myosin', 'sarcomere', 'contraction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="16" x2="8" y2="48" stroke-width="2"/>
      <line x1="56" y1="16" x2="56" y2="48" stroke-width="2"/>
      <path d="M8 24h20"/>
      <path d="M8 40h20"/>
      <path d="M36 24h20"/>
      <path d="M36 40h20"/>
      <path d="M24 20v24" stroke-width="3" stroke="blue"/>
      <path d="M40 20v24" stroke-width="3" stroke="blue"/>
      <path d="M28 28h8" stroke-width="2" stroke="red"/>
      <path d="M28 36h8" stroke-width="2" stroke="red"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Z</text>
      <text x="54" y="58" font-size="3" fill="currentColor" stroke="none">Z</text>
      <text x="28" y="12" font-size="3" fill="currentColor" stroke="none">Sarcomere</text>
    </svg>`
  },
  {
    id: 'physio-excitation-contraction',
    name: 'Excitation-Contraction Coupling',
    domain: 'biology',
    category: 'muscle-physiology',
    tags: ['excitation-contraction', 'coupling', 'calcium', 'troponin', 'T-tubule'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="12" rx="2"/>
      <path d="M20 20v12"/>
      <path d="M44 20v12"/>
      <ellipse cx="32" cy="40" rx="20" ry="8"/>
      <path d="M16 40c4-4 8 4 12 0s8 4 16 0"/>
      <circle cx="20" cy="32" r="2" fill="currentColor"/>
      <circle cx="28" cy="32" r="2" fill="currentColor"/>
      <circle cx="36" cy="32" r="2" fill="currentColor"/>
      <circle cx="44" cy="32" r="2" fill="currentColor"/>
      <text x="24" y="14" font-size="3" fill="currentColor" stroke="none">Sarcolemma</text>
      <text x="14" y="26" font-size="3" fill="currentColor" stroke="none">T-tubule</text>
      <text x="26" y="56" font-size="3" fill="currentColor" stroke="none">SR Ca²⁺</text>
    </svg>`
  },
  {
    id: 'physio-motor-unit',
    name: 'Motor Unit',
    domain: 'biology',
    category: 'muscle-physiology',
    tags: ['motor unit', 'motor neuron', 'muscle fibers', 'recruitment', 'innervation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8"/>
      <path d="M32 20v12"/>
      <path d="M32 32l-16 16"/>
      <path d="M32 32v24"/>
      <path d="M32 32l16 16"/>
      <ellipse cx="16" cy="52" rx="6" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="56" rx="6" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="48" cy="52" rx="6" ry="4" fill="currentColor" opacity="0.2"/>
      <text x="24" y="14" font-size="3" fill="currentColor" stroke="none">MN</text>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Fiber</text>
    </svg>`
  },
  {
    id: 'physio-length-tension',
    name: 'Length-Tension Relationship',
    domain: 'biology',
    category: 'muscle-physiology',
    tags: ['length-tension', 'sarcomere', 'optimal length', 'force', 'contraction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56V8"/>
      <path d="M8 56h48"/>
      <path d="M12 52c8-16 12-36 20-36s12 20 20 36"/>
      <circle cx="32" cy="16" r="2" fill="currentColor"/>
      <path d="M32 16v8" stroke-dasharray="2 2"/>
      <text x="2" y="12" font-size="3" fill="currentColor" stroke="none">T</text>
      <text x="50" y="60" font-size="3" fill="currentColor" stroke="none">L</text>
      <text x="34" y="12" font-size="3" fill="currentColor" stroke="none">L₀</text>
    </svg>`
  },
  {
    id: 'physio-muscle-twitch',
    name: 'Muscle Twitch',
    domain: 'biology',
    category: 'muscle-physiology',
    tags: ['twitch', 'tetanus', 'summation', 'muscle contraction', 'force'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56V8"/>
      <path d="M8 56h48"/>
      <path d="M12 52c2-8 4-12 8-12s4 4 4 12"/>
      <path d="M28 52c2-16 4-20 8-20s4 8 4 20"/>
      <path d="M44 52c2-32 4-36 8-36v36"/>
      <text x="12" y="60" font-size="3" fill="currentColor" stroke="none">Twitch</text>
      <text x="30" y="60" font-size="3" fill="currentColor" stroke="none">Sum</text>
      <text x="46" y="60" font-size="3" fill="currentColor" stroke="none">Tet</text>
    </svg>`
  },
  {
    id: 'physio-cross-bridge-cycle',
    name: 'Cross-Bridge Cycle',
    domain: 'biology',
    category: 'muscle-physiology',
    tags: ['cross-bridge', 'myosin', 'ATP', 'power stroke', 'ADP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <path d="M32 8v8"/>
      <path d="M32 48v8"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <path d="M32 8l4 8"/>
      <path d="M56 32l-8 4"/>
      <path d="M32 56l-4-8"/>
      <path d="M8 32l8-4"/>
      <text x="24" y="14" font-size="3" fill="currentColor" stroke="none">Attach</text>
      <text x="44" y="28" font-size="3" fill="currentColor" stroke="none">Power</text>
      <text x="24" y="54" font-size="3" fill="currentColor" stroke="none">Release</text>
      <text x="4" y="28" font-size="3" fill="currentColor" stroke="none">Reset</text>
    </svg>`
  },

  // ===========================================================================
  // ENDOCRINE PHYSIOLOGY
  // ===========================================================================
  {
    id: 'physio-negative-feedback',
    name: 'Negative Feedback Loop',
    domain: 'biology',
    category: 'endocrine-physiology',
    tags: ['negative feedback', 'hormone', 'homeostasis', 'regulation', 'inhibition'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8"/>
      <circle cx="32" cy="32" r="8"/>
      <circle cx="32" cy="52" r="8"/>
      <path d="M32 20v4"/>
      <path d="M32 40v4"/>
      <path d="M24 52c-8-8-8-24 0-40" stroke-dasharray="4 2"/>
      <text x="36" y="14" font-size="4" fill="currentColor" stroke="none">Hypo</text>
      <text x="36" y="34" font-size="4" fill="currentColor" stroke="none">Pit</text>
      <text x="36" y="54" font-size="4" fill="currentColor" stroke="none">Gland</text>
      <text x="8" y="32" font-size="3" fill="currentColor" stroke="none">(-)</text>
    </svg>`
  },
  {
    id: 'physio-hormone-receptor',
    name: 'Hormone-Receptor Binding',
    domain: 'biology',
    category: 'endocrine-physiology',
    tags: ['receptor', 'hormone', 'binding', 'signal transduction', 'ligand'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="24" width="32" height="4" fill="currentColor" opacity="0.3"/>
      <path d="M24 24V12"/>
      <path d="M40 24V12"/>
      <circle cx="24" cy="8" r="4" fill="currentColor"/>
      <circle cx="40" cy="8" r="4"/>
      <path d="M24 28v12"/>
      <path d="M40 28v12"/>
      <path d="M24 44l8 8 8-8"/>
      <text x="4" y="10" font-size="3" fill="currentColor" stroke="none">Hormone</text>
      <text x="4" y="28" font-size="3" fill="currentColor" stroke="none">Membrane</text>
      <text x="4" y="48" font-size="3" fill="currentColor" stroke="none">Signal</text>
    </svg>`
  },
  {
    id: 'physio-second-messenger',
    name: 'Second Messenger System',
    domain: 'biology',
    category: 'endocrine-physiology',
    tags: ['second messenger', 'cAMP', 'IP3', 'signal transduction', 'G protein'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="8" r="6"/>
      <rect x="8" y="16" width="16" height="4"/>
      <ellipse cx="16" cy="28" rx="8" ry="4"/>
      <path d="M16 32v8"/>
      <circle cx="16" cy="44" r="4" fill="currentColor" opacity="0.5"/>
      <path d="M20 44l8 0"/>
      <circle cx="32" cy="44" r="4"/>
      <path d="M36 44l8 0"/>
      <circle cx="48" cy="44" r="4"/>
      <path d="M48 48v8"/>
      <text x="10" y="10" font-size="3" fill="currentColor" stroke="none">H</text>
      <text x="10" y="30" font-size="3" fill="currentColor" stroke="none">G</text>
      <text x="10" y="46" font-size="3" fill="currentColor" stroke="none">AC</text>
      <text x="26" y="46" font-size="3" fill="currentColor" stroke="none">cAMP</text>
      <text x="42" y="46" font-size="3" fill="currentColor" stroke="none">PKA</text>
    </svg>`
  },
  {
    id: 'physio-hpa-axis',
    name: 'HPA Axis',
    domain: 'biology',
    category: 'endocrine-physiology',
    tags: ['HPA', 'hypothalamus', 'pituitary', 'adrenal', 'cortisol', 'stress'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="10" rx="12" ry="6"/>
      <ellipse cx="32" cy="28" rx="8" ry="6"/>
      <path d="M24 44l8 12 8-12z" fill="currentColor" opacity="0.2"/>
      <path d="M24 44l8 12 8-12z"/>
      <path d="M32 16v6"/>
      <path d="M32 34v6"/>
      <path d="M20 56c-4-16 0-32 4-44" stroke-dasharray="3 2"/>
      <text x="38" y="12" font-size="3" fill="currentColor" stroke="none">CRH</text>
      <text x="38" y="30" font-size="3" fill="currentColor" stroke="none">ACTH</text>
      <text x="38" y="52" font-size="3" fill="currentColor" stroke="none">Cortisol</text>
    </svg>`
  },
  {
    id: 'physio-thyroid-axis',
    name: 'HPT Axis',
    domain: 'biology',
    category: 'endocrine-physiology',
    tags: ['HPT', 'thyroid', 'TSH', 'T3', 'T4', 'TRH'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="10" rx="12" ry="6"/>
      <ellipse cx="32" cy="26" rx="8" ry="5"/>
      <path d="M20 40c4 4 8 8 12 8s8-4 12-8c0 8-4 16-12 16s-12-8-12-16z"/>
      <path d="M32 16v4"/>
      <path d="M32 31v5"/>
      <path d="M18 56c-2-16 4-32 6-44" stroke-dasharray="3 2"/>
      <text x="38" y="12" font-size="3" fill="currentColor" stroke="none">TRH</text>
      <text x="38" y="28" font-size="3" fill="currentColor" stroke="none">TSH</text>
      <text x="38" y="48" font-size="3" fill="currentColor" stroke="none">T3/T4</text>
    </svg>`
  },
  {
    id: 'physio-insulin-glucose',
    name: 'Insulin-Glucose Regulation',
    domain: 'biology',
    category: 'endocrine-physiology',
    tags: ['insulin', 'glucose', 'pancreas', 'beta cell', 'GLUT4'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="16" ry="8"/>
      <circle cx="16" cy="44" r="12"/>
      <circle cx="48" cy="44" r="12"/>
      <path d="M24 24l-4 8"/>
      <path d="M40 24l4 8"/>
      <path d="M28 44h8"/>
      <circle cx="16" cy="44" r="4" fill="currentColor" opacity="0.3"/>
      <rect x="44" y="40" width="8" height="8" fill="currentColor" opacity="0.3"/>
      <text x="24" y="18" font-size="3" fill="currentColor" stroke="none">Pancreas</text>
      <text x="6" y="46" font-size="3" fill="currentColor" stroke="none">Insulin</text>
      <text x="42" y="46" font-size="3" fill="currentColor" stroke="none">Glucose</text>
    </svg>`
  },

  // ===========================================================================
  // GI PHYSIOLOGY
  // ===========================================================================
  {
    id: 'physio-digestion',
    name: 'Digestive Process',
    domain: 'biology',
    category: 'gi-physiology',
    tags: ['digestion', 'enzymes', 'breakdown', 'carbohydrate', 'protein', 'fat'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <path d="M8 20h48"/>
      <path d="M8 36h48"/>
      <rect x="12" y="12" width="8" height="4" fill="currentColor"/>
      <rect x="24" y="12" width="8" height="4" fill="blue"/>
      <rect x="36" y="12" width="8" height="4" fill="green"/>
      <circle cx="16" cy="28" r="3" fill="currentColor"/>
      <circle cx="28" cy="28" r="3" fill="blue"/>
      <circle cx="40" cy="28" r="3" fill="green"/>
      <circle cx="16" cy="44" r="2" fill="currentColor"/>
      <circle cx="20" cy="44" r="2" fill="currentColor"/>
      <circle cx="28" cy="44" r="2" fill="blue"/>
      <circle cx="32" cy="44" r="2" fill="blue"/>
      <circle cx="40" cy="44" r="2" fill="green"/>
      <text x="48" y="16" font-size="3" fill="currentColor" stroke="none">CHO</text>
      <text x="48" y="30" font-size="3" fill="currentColor" stroke="none">Pro</text>
      <text x="48" y="46" font-size="3" fill="currentColor" stroke="none">Fat</text>
    </svg>`
  },
  {
    id: 'physio-intestinal-absorption',
    name: 'Intestinal Absorption',
    domain: 'biology',
    category: 'gi-physiology',
    tags: ['absorption', 'intestine', 'villi', 'enterocyte', 'nutrients'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8c8 8 8 16 0 24s0 16 8 24"/>
      <path d="M24 8c8 8 8 16 0 24s0 16 8 24"/>
      <path d="M40 8c8 8 8 16 0 24s0 16 8 24"/>
      <path d="M56 8c8 8 8 16 0 24s0 16 8 24"/>
      <path d="M12 32l8 8"/>
      <path d="M28 32l8 8"/>
      <path d="M44 32l8 8"/>
      <circle cx="20" cy="40" r="2" fill="currentColor"/>
      <circle cx="36" cy="40" r="2" fill="currentColor"/>
      <circle cx="52" cy="40" r="2" fill="currentColor"/>
      <text x="16" y="60" font-size="3" fill="currentColor" stroke="none">Villi → Blood</text>
    </svg>`
  },
  {
    id: 'physio-gi-motility',
    name: 'GI Motility',
    domain: 'biology',
    category: 'gi-physiology',
    tags: ['motility', 'peristalsis', 'smooth muscle', 'segmentation', 'GI tract'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c8-8 8 8 16 0s8 8 16 0 8 8 16 0"/>
      <path d="M8 24v16"/>
      <path d="M56 24v16"/>
      <path d="M24 24v16" stroke-width="3"/>
      <path d="M40 24v16" stroke-width="1"/>
      <path d="M16 32l8 0"/>
      <path d="M32 32l8 0"/>
      <path d="M48 32l8 0"/>
      <circle cx="20" cy="32" r="3" fill="currentColor"/>
      <text x="16" y="52" font-size="3" fill="currentColor" stroke="none">Peristalsis</text>
    </svg>`
  },
  {
    id: 'physio-gastric-secretion',
    name: 'Gastric Secretion',
    domain: 'biology',
    category: 'gi-physiology',
    tags: ['gastric', 'secretion', 'HCl', 'parietal cell', 'proton pump'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <path d="M16 24c4 0 8-4 8-8"/>
      <path d="M48 24c-4 0-8-4-8-8"/>
      <path d="M32 52v8"/>
      <circle cx="20" cy="32" r="4"/>
      <circle cx="32" cy="36" r="4"/>
      <circle cx="44" cy="32" r="4"/>
      <path d="M20 28v-8"/>
      <path d="M32 32v-8"/>
      <path d="M44 28v-8"/>
      <text x="16" y="20" font-size="3" fill="currentColor" stroke="none">H⁺</text>
      <text x="28" y="24" font-size="3" fill="currentColor" stroke="none">H⁺</text>
      <text x="40" y="20" font-size="3" fill="currentColor" stroke="none">H⁺</text>
      <text x="14" y="58" font-size="3" fill="currentColor" stroke="none">Parietal cells</text>
    </svg>`
  },
  {
    id: 'physio-bile-secretion',
    name: 'Bile Secretion',
    domain: 'biology',
    category: 'gi-physiology',
    tags: ['bile', 'liver', 'gallbladder', 'emulsification', 'fat digestion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8c24 0 40 8 48 24-8 16-24 24-48 24z" fill="currentColor" opacity="0.1"/>
      <path d="M8 8c24 0 40 8 48 24-8 16-24 24-48 24z"/>
      <ellipse cx="44" cy="40" rx="8" ry="12" fill="green" opacity="0.2"/>
      <ellipse cx="44" cy="40" rx="8" ry="12"/>
      <path d="M44 52v8"/>
      <path d="M40 60h8"/>
      <circle cx="16" cy="32" r="4" fill="green" opacity="0.3"/>
      <circle cx="28" cy="32" r="4" fill="green" opacity="0.3"/>
      <text x="12" y="52" font-size="3" fill="currentColor" stroke="none">Liver</text>
      <text x="38" y="42" font-size="3" fill="currentColor" stroke="none">GB</text>
    </svg>`
  },

  // ===========================================================================
  // METABOLIC PROCESSES
  // ===========================================================================
  {
    id: 'physio-atp-synthesis',
    name: 'ATP Synthesis',
    domain: 'biology',
    category: 'metabolism',
    tags: ['ATP', 'synthesis', 'mitochondria', 'oxidative phosphorylation', 'energy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16"/>
      <ellipse cx="32" cy="32" rx="16" ry="10" fill="currentColor" opacity="0.1"/>
      <circle cx="20" cy="28" r="4"/>
      <circle cx="32" cy="28" r="4"/>
      <circle cx="44" cy="28" r="4"/>
      <path d="M24 28h4"/>
      <path d="M36 28h4"/>
      <path d="M32 36v8"/>
      <circle cx="32" cy="48" r="4" fill="currentColor"/>
      <text x="16" y="30" font-size="3" fill="currentColor" stroke="none">ADP</text>
      <text x="38" y="30" font-size="3" fill="currentColor" stroke="none">Pi</text>
      <text x="28" y="50" font-size="3" fill="currentColor" stroke="none">ATP</text>
    </svg>`
  },
  {
    id: 'physio-glycolysis',
    name: 'Glycolysis',
    domain: 'biology',
    category: 'metabolism',
    tags: ['glycolysis', 'glucose', 'pyruvate', 'ATP', 'cytoplasm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="8" r="6"/>
      <path d="M32 14v8"/>
      <rect x="24" y="22" width="16" height="8" rx="2"/>
      <path d="M32 30v8"/>
      <circle cx="24" cy="44" r="4"/>
      <circle cx="40" cy="44" r="4"/>
      <path d="M32 38l-4 2"/>
      <path d="M32 38l4 2"/>
      <text x="26" y="10" font-size="3" fill="currentColor" stroke="none">Glc</text>
      <text x="26" y="28" font-size="3" fill="currentColor" stroke="none">F-1,6-BP</text>
      <text x="18" y="46" font-size="3" fill="currentColor" stroke="none">Pyr</text>
      <text x="34" y="46" font-size="3" fill="currentColor" stroke="none">Pyr</text>
      <text x="44" y="28" font-size="3" fill="currentColor" stroke="none">2ATP</text>
    </svg>`
  },
  {
    id: 'physio-krebs-cycle',
    name: 'Krebs Cycle',
    domain: 'biology',
    category: 'metabolism',
    tags: ['Krebs', 'citric acid', 'TCA', 'cycle', 'mitochondria', 'NADH'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="12" r="4"/>
      <circle cx="52" cy="32" r="4"/>
      <circle cx="32" cy="52" r="4"/>
      <circle cx="12" cy="32" r="4"/>
      <path d="M32 16c8 4 12 8 16 12"/>
      <path d="M48 36c-4 8-8 12-12 16"/>
      <path d="M28 48c-8-4-12-8-16-12"/>
      <path d="M16 28c4-8 8-12 12-16"/>
      <text x="28" y="10" font-size="3" fill="currentColor" stroke="none">AcCoA</text>
      <text x="52" y="30" font-size="3" fill="currentColor" stroke="none">Cit</text>
      <text x="26" y="56" font-size="3" fill="currentColor" stroke="none">OAA</text>
      <text x="2" y="34" font-size="3" fill="currentColor" stroke="none">αKG</text>
    </svg>`
  },
  {
    id: 'physio-electron-transport',
    name: 'Electron Transport Chain',
    domain: 'biology',
    category: 'metabolism',
    tags: ['ETC', 'electron transport', 'complexes', 'proton gradient', 'oxidation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="56" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="28" width="8" height="8" rx="1" fill="blue" opacity="0.5"/>
      <rect x="20" y="28" width="8" height="8" rx="1" fill="green" opacity="0.5"/>
      <rect x="32" y="28" width="8" height="8" rx="1" fill="orange" opacity="0.5"/>
      <rect x="44" y="28" width="8" height="8" rx="1" fill="red" opacity="0.5"/>
      <path d="M12 24v-8"/>
      <path d="M24 24v-8"/>
      <path d="M36 24v-8"/>
      <path d="M12 40v8"/>
      <path d="M48 36l8 8"/>
      <text x="6" y="34" font-size="3" fill="currentColor" stroke="none">I</text>
      <text x="20" y="34" font-size="3" fill="currentColor" stroke="none">II</text>
      <text x="32" y="34" font-size="3" fill="currentColor" stroke="none">III</text>
      <text x="44" y="34" font-size="3" fill="currentColor" stroke="none">IV</text>
      <text x="52" y="50" font-size="3" fill="currentColor" stroke="none">O₂</text>
    </svg>`
  },
  {
    id: 'physio-beta-oxidation',
    name: 'Beta Oxidation',
    domain: 'biology',
    category: 'metabolism',
    tags: ['beta oxidation', 'fatty acid', 'acetyl-CoA', 'lipid metabolism', 'FAD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16h48"/>
      <path d="M8 16l4 4 4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4 4-4"/>
      <path d="M32 24v8"/>
      <rect x="24" y="32" width="16" height="8" rx="2"/>
      <path d="M32 40v8"/>
      <circle cx="24" cy="52" r="4"/>
      <circle cx="40" cy="52" r="4"/>
      <text x="18" y="54" font-size="3" fill="currentColor" stroke="none">AcCoA</text>
      <text x="44" y="54" font-size="3" fill="currentColor" stroke="none">FADH₂</text>
      <text x="8" y="12" font-size="3" fill="currentColor" stroke="none">Fatty acid</text>
    </svg>`
  },
  {
    id: 'physio-gluconeogenesis',
    name: 'Gluconeogenesis',
    domain: 'biology',
    category: 'metabolism',
    tags: ['gluconeogenesis', 'glucose', 'liver', 'fasting', 'lactate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="52" r="4"/>
      <circle cx="32" cy="52" r="4"/>
      <circle cx="48" cy="52" r="4"/>
      <path d="M16 48v-8"/>
      <path d="M32 48v-8"/>
      <path d="M48 48v-8"/>
      <rect x="8" y="32" width="48" height="8" rx="2"/>
      <path d="M32 32v-8"/>
      <circle cx="32" cy="16" r="8"/>
      <text x="10" y="58" font-size="3" fill="currentColor" stroke="none">Lac</text>
      <text x="26" y="58" font-size="3" fill="currentColor" stroke="none">Ala</text>
      <text x="42" y="58" font-size="3" fill="currentColor" stroke="none">Gly</text>
      <text x="24" y="38" font-size="3" fill="currentColor" stroke="none">Liver</text>
      <text x="26" y="18" font-size="3" fill="currentColor" stroke="none">Glc</text>
    </svg>`
  },

  // ===========================================================================
  // FLUID & ELECTROLYTE BALANCE
  // ===========================================================================
  {
    id: 'physio-fluid-compartments',
    name: 'Body Fluid Compartments',
    domain: 'biology',
    category: 'fluid-balance',
    tags: ['fluid', 'compartments', 'ICF', 'ECF', 'plasma', 'interstitial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="56" height="48" rx="4"/>
      <rect x="8" y="12" width="28" height="40" rx="2" fill="blue" opacity="0.3"/>
      <rect x="40" y="12" width="16" height="40" rx="2" fill="green" opacity="0.3"/>
      <rect x="44" y="16" width="8" height="16" fill="red" opacity="0.3"/>
      <text x="14" y="34" font-size="4" fill="currentColor" stroke="none">ICF</text>
      <text x="14" y="42" font-size="3" fill="currentColor" stroke="none">40%</text>
      <text x="42" y="50" font-size="3" fill="currentColor" stroke="none">ISF</text>
      <text x="42" y="58" font-size="3" fill="currentColor" stroke="none">15%</text>
      <text x="44" y="26" font-size="3" fill="currentColor" stroke="none">PV</text>
      <text x="44" y="34" font-size="3" fill="currentColor" stroke="none">5%</text>
    </svg>`
  },
  {
    id: 'physio-starling-forces',
    name: 'Starling Forces',
    domain: 'biology',
    category: 'fluid-balance',
    tags: ['Starling', 'capillary', 'hydrostatic', 'oncotic', 'filtration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" rx="4" fill="currentColor" opacity="0.1"/>
      <path d="M8 32h48"/>
      <path d="M16 28l0-8"/>
      <path d="M24 28l0-8"/>
      <path d="M40 36l0 8"/>
      <path d="M48 36l0 8"/>
      <circle cx="16" cy="16" r="2" fill="currentColor"/>
      <circle cx="24" cy="16" r="2" fill="currentColor"/>
      <circle cx="40" cy="48" r="2" fill="currentColor"/>
      <circle cx="48" cy="48" r="2" fill="currentColor"/>
      <text x="8" y="12" font-size="3" fill="currentColor" stroke="none">Pc</text>
      <text x="20" y="12" font-size="3" fill="currentColor" stroke="none">πi</text>
      <text x="36" y="56" font-size="3" fill="currentColor" stroke="none">Pi</text>
      <text x="46" y="56" font-size="3" fill="currentColor" stroke="none">πc</text>
      <text x="12" y="60" font-size="3" fill="currentColor" stroke="none">Art</text>
      <text x="44" y="60" font-size="3" fill="currentColor" stroke="none">Ven</text>
    </svg>`
  },
  {
    id: 'physio-sodium-balance',
    name: 'Sodium Balance',
    domain: 'biology',
    category: 'fluid-balance',
    tags: ['sodium', 'Na', 'balance', 'aldosterone', 'kidney'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M12 32h8"/>
      <path d="M44 32h8"/>
      <path d="M32 12v8"/>
      <path d="M32 44v8"/>
      <text x="4" y="34" font-size="4" fill="currentColor" stroke="none">In</text>
      <text x="52" y="34" font-size="4" fill="currentColor" stroke="none">Out</text>
      <text x="26" y="34" font-size="5" fill="currentColor" stroke="none">Na⁺</text>
      <text x="26" y="8" font-size="3" fill="currentColor" stroke="none">Diet</text>
      <text x="24" y="60" font-size="3" fill="currentColor" stroke="none">Kidney</text>
    </svg>`
  },
  {
    id: 'physio-potassium-balance',
    name: 'Potassium Balance',
    domain: 'biology',
    category: 'fluid-balance',
    tags: ['potassium', 'K', 'balance', 'aldosterone', 'insulin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="20" height="32" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="36" y="16" width="20" height="32" rx="2"/>
      <path d="M28 24l8 0"/>
      <path d="M28 40l8 0"/>
      <path d="M32 32l4-4"/>
      <path d="M32 32l4 4"/>
      <text x="12" y="34" font-size="4" fill="currentColor" stroke="none">ICF</text>
      <text x="12" y="42" font-size="3" fill="currentColor" stroke="none">98%</text>
      <text x="40" y="34" font-size="4" fill="currentColor" stroke="none">ECF</text>
      <text x="42" y="42" font-size="3" fill="currentColor" stroke="none">2%</text>
      <text x="24" y="58" font-size="4" fill="currentColor" stroke="none">K⁺</text>
    </svg>`
  },
  {
    id: 'physio-osmolality',
    name: 'Plasma Osmolality',
    domain: 'biology',
    category: 'fluid-balance',
    tags: ['osmolality', 'tonicity', 'ADH', 'thirst', 'water balance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <circle cx="20" cy="32" r="4" fill="currentColor"/>
      <circle cx="32" cy="32" r="4" fill="blue"/>
      <circle cx="44" cy="32" r="4" fill="green"/>
      <text x="16" y="34" font-size="3" fill="currentColor" stroke="none">Na</text>
      <text x="28" y="34" font-size="3" fill="currentColor" stroke="none">Glu</text>
      <text x="40" y="34" font-size="3" fill="currentColor" stroke="none">BUN</text>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">2Na + Glu/18 + BUN/2.8</text>
      <text x="22" y="12" font-size="4" fill="currentColor" stroke="none">~285-295</text>
    </svg>`
  },

  // ===========================================================================
  // ACID-BASE REGULATION
  // ===========================================================================
  {
    id: 'physio-acid-base-diagram',
    name: 'Acid-Base Diagram',
    domain: 'biology',
    category: 'acid-base',
    tags: ['acid-base', 'pH', 'PCO2', 'bicarbonate', 'diagram'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56V8"/>
      <path d="M8 56h48"/>
      <path d="M12 48c8-8 16-24 40-32"/>
      <rect x="20" y="24" width="16" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <text x="2" y="12" font-size="3" fill="currentColor" stroke="none">pH</text>
      <text x="48" y="60" font-size="3" fill="currentColor" stroke="none">PCO₂</text>
      <text x="22" y="32" font-size="3" fill="currentColor" stroke="none">Normal</text>
      <text x="12" y="20" font-size="3" fill="currentColor" stroke="none">Alk</text>
      <text x="44" y="48" font-size="3" fill="currentColor" stroke="none">Acid</text>
    </svg>`
  },
  {
    id: 'physio-henderson-hasselbalch',
    name: 'Henderson-Hasselbalch',
    domain: 'biology',
    category: 'acid-base',
    tags: ['Henderson-Hasselbalch', 'pH', 'bicarbonate', 'equation', 'buffer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="16" width="56" height="32" rx="4"/>
      <text x="12" y="36" font-size="5" fill="currentColor" stroke="none">pH = 6.1 + log</text>
      <path d="M44 24v20"/>
      <text x="46" y="30" font-size="4" fill="currentColor" stroke="none">[HCO₃⁻]</text>
      <text x="46" y="42" font-size="4" fill="currentColor" stroke="none">0.03×PCO₂</text>
      <text x="16" y="56" font-size="3" fill="currentColor" stroke="none">Kidney</text>
      <text x="40" y="56" font-size="3" fill="currentColor" stroke="none">Lung</text>
    </svg>`
  },
  {
    id: 'physio-respiratory-compensation',
    name: 'Respiratory Compensation',
    domain: 'biology',
    category: 'acid-base',
    tags: ['respiratory', 'compensation', 'hyperventilation', 'hypoventilation', 'CO2'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="16" ry="12"/>
      <path d="M24 32l-8 24"/>
      <path d="M40 32l8 24"/>
      <path d="M32 32v24"/>
      <path d="M16 20l-8-4"/>
      <path d="M48 20l8-4"/>
      <path d="M16 20l-8 4"/>
      <path d="M48 20l8 4"/>
      <text x="4" y="12" font-size="3" fill="currentColor" stroke="none">↓CO₂</text>
      <text x="4" y="28" font-size="3" fill="currentColor" stroke="none">↑CO₂</text>
      <text x="20" y="60" font-size="3" fill="currentColor" stroke="none">pH Control</text>
    </svg>`
  },
  {
    id: 'physio-renal-compensation',
    name: 'Renal Compensation',
    domain: 'biology',
    category: 'acid-base',
    tags: ['renal', 'compensation', 'bicarbonate', 'H+ secretion', 'kidney'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-8 8-12 24-4 40"/>
      <path d="M44 8c8 8 12 24 4 40"/>
      <path d="M20 8c8 4 16 4 24 0"/>
      <path d="M16 48c8 8 24 8 32 0"/>
      <path d="M24 24l8 4-8 4"/>
      <path d="M40 24l-8 4 8 4"/>
      <circle cx="32" cy="36" r="4" fill="currentColor" opacity="0.3"/>
      <text x="8" y="28" font-size="3" fill="currentColor" stroke="none">HCO₃⁻</text>
      <text x="44" y="28" font-size="3" fill="currentColor" stroke="none">H⁺</text>
      <text x="22" y="60" font-size="3" fill="currentColor" stroke="none">Nephron</text>
    </svg>`
  },
  {
    id: 'physio-buffer-systems',
    name: 'Buffer Systems',
    domain: 'biology',
    category: 'acid-base',
    tags: ['buffer', 'bicarbonate', 'phosphate', 'protein', 'hemoglobin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="20" r="8"/>
      <circle cx="48" cy="20" r="8"/>
      <circle cx="16" cy="48" r="8"/>
      <circle cx="48" cy="48" r="8"/>
      <path d="M24 20h16"/>
      <path d="M24 48h16"/>
      <path d="M16 28v12"/>
      <path d="M48 28v12"/>
      <text x="8" y="22" font-size="3" fill="currentColor" stroke="none">HCO₃⁻</text>
      <text x="42" y="22" font-size="3" fill="currentColor" stroke="none">PO₄³⁻</text>
      <text x="10" y="50" font-size="3" fill="currentColor" stroke="none">Prot</text>
      <text x="44" y="50" font-size="3" fill="currentColor" stroke="none">Hb</text>
    </svg>`
  },

  // ===========================================================================
  // THERMOREGULATION
  // ===========================================================================
  {
    id: 'physio-temperature-regulation',
    name: 'Temperature Regulation',
    domain: 'biology',
    category: 'thermoregulation',
    tags: ['temperature', 'thermoregulation', 'hypothalamus', 'fever', 'homeostasis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="16" ry="8"/>
      <path d="M16 20v32"/>
      <path d="M48 20v32"/>
      <path d="M16 52c8 8 24 8 32 0"/>
      <path d="M24 28l-8 8"/>
      <path d="M40 28l8 8"/>
      <circle cx="32" cy="36" r="8" fill="currentColor" opacity="0.3"/>
      <text x="24" y="14" font-size="3" fill="currentColor" stroke="none">Hypo</text>
      <text x="26" y="38" font-size="3" fill="currentColor" stroke="none">37°C</text>
      <text x="4" y="36" font-size="3" fill="currentColor" stroke="none">Cold</text>
      <text x="50" y="36" font-size="3" fill="currentColor" stroke="none">Hot</text>
    </svg>`
  },
  {
    id: 'physio-heat-loss',
    name: 'Heat Loss Mechanisms',
    domain: 'biology',
    category: 'thermoregulation',
    tags: ['heat loss', 'radiation', 'convection', 'conduction', 'evaporation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="20"/>
      <path d="M12 24l-8-8" stroke="red"/>
      <path d="M12 32l-8 0" stroke="orange"/>
      <path d="M12 40l-8 8" stroke="blue"/>
      <path d="M32 8l0-4" stroke="purple"/>
      <path d="M28 8l-4-4" stroke="purple"/>
      <path d="M36 8l4-4" stroke="purple"/>
      <text x="0" y="14" font-size="3" fill="currentColor" stroke="none">Rad</text>
      <text x="0" y="30" font-size="3" fill="currentColor" stroke="none">Conv</text>
      <text x="0" y="52" font-size="3" fill="currentColor" stroke="none">Cond</text>
      <text x="30" y="4" font-size="3" fill="currentColor" stroke="none">Evap</text>
    </svg>`
  },
  {
    id: 'physio-shivering',
    name: 'Shivering Thermogenesis',
    domain: 'biology',
    category: 'thermoregulation',
    tags: ['shivering', 'thermogenesis', 'muscle', 'cold', 'heat production'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 16c4 4 4 8 0 12s0 8 4 12 0 8-4 12"/>
      <path d="M32 16c4 4 4 8 0 12s0 8 4 12 0 8-4 12"/>
      <path d="M44 16c4 4 4 8 0 12s0 8 4 12 0 8-4 12"/>
      <path d="M8 32h4"/>
      <path d="M52 32h4"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Muscle contractions</text>
      <text x="24" y="8" font-size="4" fill="currentColor" stroke="none">Heat ↑</text>
    </svg>`
  },
  {
    id: 'physio-sweating',
    name: 'Sweating',
    domain: 'biology',
    category: 'thermoregulation',
    tags: ['sweating', 'sweat gland', 'evaporative cooling', 'eccrine', 'heat loss'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <path d="M16 16c0 8-4 16-4 24"/>
      <path d="M32 16c0 8-4 16-4 24"/>
      <path d="M48 16c0 8-4 16-4 24"/>
      <ellipse cx="12" cy="44" rx="4" ry="6" fill="blue" opacity="0.3"/>
      <ellipse cx="28" cy="44" rx="4" ry="6" fill="blue" opacity="0.3"/>
      <ellipse cx="44" cy="44" rx="4" ry="6" fill="blue" opacity="0.3"/>
      <path d="M12 50v8"/>
      <path d="M28 50v8"/>
      <path d="M44 50v8"/>
      <text x="20" y="62" font-size="3" fill="currentColor" stroke="none">Evaporation</text>
    </svg>`
  },
  {
    id: 'physio-vasodilation',
    name: 'Cutaneous Vasodilation',
    domain: 'biology',
    category: 'thermoregulation',
    tags: ['vasodilation', 'cutaneous', 'blood flow', 'heat dissipation', 'skin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="12" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M16 20v16c0 8 4 12 8 12"/>
      <path d="M32 20v16c0 8 4 12 8 12"/>
      <path d="M48 20v16c0 8 4 12 8 12"/>
      <ellipse cx="16" cy="36" rx="6" ry="4" fill="red" opacity="0.3"/>
      <ellipse cx="32" cy="36" rx="6" ry="4" fill="red" opacity="0.3"/>
      <ellipse cx="48" cy="36" rx="6" ry="4" fill="red" opacity="0.3"/>
      <text x="16" y="14" font-size="3" fill="currentColor" stroke="none">Skin surface</text>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Dilated vessels → Heat loss</text>
    </svg>`
  },
  {
    id: 'physio-fever',
    name: 'Fever Response',
    domain: 'biology',
    category: 'thermoregulation',
    tags: ['fever', 'pyrogen', 'set point', 'interleukin', 'prostaglandin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56V8"/>
      <path d="M8 56h48"/>
      <path d="M12 40h16"/>
      <path d="M28 40v-16"/>
      <path d="M28 24h20"/>
      <path d="M48 24v16"/>
      <path d="M48 40h8"/>
      <text x="2" y="12" font-size="3" fill="currentColor" stroke="none">T°</text>
      <text x="50" y="60" font-size="3" fill="currentColor" stroke="none">Time</text>
      <text x="16" y="36" font-size="3" fill="currentColor" stroke="none">37°</text>
      <text x="32" y="20" font-size="3" fill="currentColor" stroke="none">39°</text>
      <text x="28" y="52" font-size="3" fill="currentColor" stroke="none">Pyrogen</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL PHYSIOLOGY ICONS
  // ===========================================================================
  {
    id: 'physio-cell-signaling',
    name: 'Cell Signaling Cascade',
    domain: 'biology',
    category: 'cell-physiology',
    tags: ['signaling', 'cascade', 'kinase', 'phosphorylation', 'pathway'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="8" r="6"/>
      <path d="M32 14v6"/>
      <circle cx="32" cy="26" r="6"/>
      <path d="M32 32v6"/>
      <circle cx="32" cy="44" r="6"/>
      <path d="M32 50v6"/>
      <circle cx="32" cy="62" r="2" fill="currentColor"/>
      <path d="M38 8l8 0"/>
      <path d="M38 26l8 0"/>
      <path d="M38 44l8 0"/>
      <text x="48" y="10" font-size="3" fill="currentColor" stroke="none">Signal</text>
      <text x="48" y="28" font-size="3" fill="currentColor" stroke="none">Kinase</text>
      <text x="48" y="46" font-size="3" fill="currentColor" stroke="none">Effector</text>
    </svg>`
  },
  {
    id: 'physio-homeostasis',
    name: 'Homeostasis',
    domain: 'biology',
    category: 'general-physiology',
    tags: ['homeostasis', 'balance', 'set point', 'feedback', 'regulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <path d="M32 8v8"/>
      <path d="M32 48v8"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <path d="M32 24c-8 0-12 8-8 12s8-4 8-12"/>
      <text x="28" y="34" font-size="4" fill="currentColor" stroke="none">Set</text>
      <text x="14" y="58" font-size="3" fill="currentColor" stroke="none">Balance</text>
    </svg>`
  },
  {
    id: 'physio-receptor-types',
    name: 'Receptor Types',
    domain: 'biology',
    category: 'general-physiology',
    tags: ['receptor', 'ionotropic', 'metabotropic', 'nuclear', 'GPCR'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="16" height="16" rx="2"/>
      <circle cx="12" cy="32" r="4"/>
      <rect x="24" y="24" width="16" height="16" rx="2"/>
      <path d="M28 28c4 0 8 4 8 8"/>
      <rect x="44" y="24" width="16" height="16" rx="2"/>
      <circle cx="52" cy="32" r="6"/>
      <text x="6" y="50" font-size="3" fill="currentColor" stroke="none">Ion</text>
      <text x="24" y="50" font-size="3" fill="currentColor" stroke="none">GPCR</text>
      <text x="46" y="50" font-size="3" fill="currentColor" stroke="none">Nuc</text>
      <text x="16" y="12" font-size="4" fill="currentColor" stroke="none">Receptor Types</text>
    </svg>`
  },
  {
    id: 'physio-membrane-transport',
    name: 'Membrane Transport',
    domain: 'biology',
    category: 'cell-physiology',
    tags: ['transport', 'membrane', 'passive', 'active', 'facilitated'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="56" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M12 20v-8"/>
      <path d="M12 44v8"/>
      <rect x="24" y="20" width="8" height="24" rx="2"/>
      <path d="M28 28v8"/>
      <circle cx="48" cy="20" r="4"/>
      <circle cx="48" cy="44" r="4"/>
      <path d="M48 24v16" stroke-width="2"/>
      <text x="6" y="12" font-size="3" fill="currentColor" stroke="none">Diff</text>
      <text x="22" y="12" font-size="3" fill="currentColor" stroke="none">Facil</text>
      <text x="42" y="12" font-size="3" fill="currentColor" stroke="none">Active</text>
    </svg>`
  },
  {
    id: 'physio-blood-pressure',
    name: 'Blood Pressure Regulation',
    domain: 'biology',
    category: 'cardiovascular-physiology',
    tags: ['blood pressure', 'MAP', 'cardiac output', 'SVR', 'regulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <text x="20" y="36" font-size="5" fill="currentColor" stroke="none">MAP</text>
      <path d="M32 12v-8"/>
      <path d="M12 32h-8"/>
      <path d="M52 32h8"/>
      <circle cx="32" cy="4" r="2" fill="currentColor"/>
      <circle cx="4" cy="32" r="2" fill="currentColor"/>
      <circle cx="60" cy="32" r="2" fill="currentColor"/>
      <text x="26" y="4" font-size="3" fill="currentColor" stroke="none">CO</text>
      <text x="0" y="28" font-size="3" fill="currentColor" stroke="none">SVR</text>
      <text x="56" y="28" font-size="3" fill="currentColor" stroke="none">Vol</text>
    </svg>`
  },
  {
    id: 'physio-autonomic-nervous',
    name: 'Autonomic Nervous System',
    domain: 'biology',
    category: 'neurophysiology',
    tags: ['autonomic', 'sympathetic', 'parasympathetic', 'fight flight', 'rest digest'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="20" ry="8"/>
      <path d="M16 20l-8 32"/>
      <path d="M48 20l8 32"/>
      <circle cx="8" cy="52" r="4" fill="red" opacity="0.3"/>
      <circle cx="56" cy="52" r="4" fill="blue" opacity="0.3"/>
      <path d="M32 20v24"/>
      <ellipse cx="32" cy="52" rx="8" ry="4"/>
      <text x="26" y="14" font-size="3" fill="currentColor" stroke="none">CNS</text>
      <text x="2" y="60" font-size="3" fill="currentColor" stroke="none">Sym</text>
      <text x="48" y="60" font-size="3" fill="currentColor" stroke="none">Para</text>
    </svg>`
  },
  {
    id: 'physio-oxygen-delivery',
    name: 'Oxygen Delivery',
    domain: 'biology',
    category: 'respiratory-physiology',
    tags: ['oxygen delivery', 'DO2', 'hemoglobin', 'cardiac output', 'saturation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="20" r="8" fill="red" opacity="0.3"/>
      <circle cx="32" cy="20" r="8"/>
      <circle cx="48" cy="20" r="8"/>
      <path d="M16 28l0 8"/>
      <path d="M32 28l0 8"/>
      <path d="M48 28l0 8"/>
      <rect x="8" y="40" width="48" height="16" rx="4"/>
      <text x="10" y="22" font-size="3" fill="currentColor" stroke="none">Hb</text>
      <text x="26" y="22" font-size="3" fill="currentColor" stroke="none">SaO₂</text>
      <text x="44" y="22" font-size="3" fill="currentColor" stroke="none">CO</text>
      <text x="20" y="52" font-size="4" fill="currentColor" stroke="none">DO₂</text>
    </svg>`
  },
  {
    id: 'physio-fick-principle',
    name: 'Fick Principle',
    domain: 'biology',
    category: 'cardiovascular-physiology',
    tags: ['Fick', 'cardiac output', 'oxygen consumption', 'VO2', 'AV difference'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="10"/>
      <path d="M22 24l-8 16"/>
      <path d="M42 24l8 16"/>
      <rect x="8" y="40" width="48" height="16" rx="4"/>
      <path d="M14 44l0 8"/>
      <path d="M50 44l0 8"/>
      <text x="24" y="18" font-size="3" fill="currentColor" stroke="none">VO₂</text>
      <text x="8" y="38" font-size="3" fill="currentColor" stroke="none">Art</text>
      <text x="48" y="38" font-size="3" fill="currentColor" stroke="none">Ven</text>
      <text x="22" y="52" font-size="3" fill="currentColor" stroke="none">CO=VO₂/(CaO₂-CvO₂)</text>
    </svg>`
  },
  {
    id: 'physio-nernst-equation',
    name: 'Nernst Equation',
    domain: 'biology',
    category: 'neurophysiology',
    tags: ['Nernst', 'equilibrium potential', 'ion', 'membrane potential', 'equation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="16" width="56" height="32" rx="4"/>
      <text x="8" y="36" font-size="5" fill="currentColor" stroke="none">E = RT/zF × ln([out]/[in])</text>
      <text x="16" y="56" font-size="4" fill="currentColor" stroke="none">Equilibrium Potential</text>
    </svg>`
  },
  {
    id: 'physio-goldman-equation',
    name: 'Goldman Equation',
    domain: 'biology',
    category: 'neurophysiology',
    tags: ['Goldman', 'resting potential', 'permeability', 'membrane potential'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="12" width="56" height="40" rx="4"/>
      <text x="8" y="28" font-size="4" fill="currentColor" stroke="none">Vm = 61 × log</text>
      <path d="M8 36h48"/>
      <text x="12" y="34" font-size="3" fill="currentColor" stroke="none">PK[K]o + PNa[Na]o + PCl[Cl]i</text>
      <text x="12" y="48" font-size="3" fill="currentColor" stroke="none">PK[K]i + PNa[Na]i + PCl[Cl]o</text>
    </svg>`
  },
  {
    id: 'physio-ventilation-equation',
    name: 'Alveolar Ventilation Equation',
    domain: 'biology',
    category: 'respiratory-physiology',
    tags: ['ventilation', 'alveolar', 'dead space', 'tidal volume', 'respiratory rate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="16" width="56" height="32" rx="4"/>
      <text x="8" y="32" font-size="4" fill="currentColor" stroke="none">VA = (VT - VD) × RR</text>
      <text x="8" y="44" font-size="3" fill="currentColor" stroke="none">Alveolar = (Tidal - Dead) × Rate</text>
    </svg>`
  },
  {
    id: 'physio-laplace-law',
    name: 'Laplace Law',
    domain: 'biology',
    category: 'cardiovascular-physiology',
    tags: ['Laplace', 'wall tension', 'pressure', 'radius', 'ventricle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="16"/>
      <path d="M32 12v-8"/>
      <path d="M32 44v8"/>
      <path d="M16 28h-8"/>
      <path d="M48 28h8"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">T = P × r / 2h</text>
      <text x="28" y="30" font-size="4" fill="currentColor" stroke="none">P</text>
    </svg>`
  },
  {
    id: 'physio-poiseuille-law',
    name: 'Poiseuille Law',
    domain: 'biology',
    category: 'cardiovascular-physiology',
    tags: ['Poiseuille', 'blood flow', 'resistance', 'viscosity', 'radius'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="16" rx="8"/>
      <path d="M4 28h8"/>
      <path d="M52 28h8"/>
      <path d="M16 28h32" stroke-width="2"/>
      <text x="8" y="48" font-size="3" fill="currentColor" stroke="none">Q = ΔP × π × r⁴ / 8ηL</text>
      <text x="12" y="58" font-size="3" fill="currentColor" stroke="none">Flow ∝ Radius⁴</text>
    </svg>`
  },
  {
    id: 'physio-alveolar-gas-equation',
    name: 'Alveolar Gas Equation',
    domain: 'biology',
    category: 'respiratory-physiology',
    tags: ['alveolar gas', 'PAO2', 'FiO2', 'PaCO2', 'respiratory quotient'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="12" width="56" height="40" rx="4"/>
      <text x="8" y="28" font-size="4" fill="currentColor" stroke="none">PAO₂ = FiO₂(Patm-47)</text>
      <text x="16" y="40" font-size="4" fill="currentColor" stroke="none">- PaCO₂/RQ</text>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">~100 mmHg at sea level</text>
    </svg>`
  },
  {
    id: 'physio-henderson-hasselbalch',
    name: 'Henderson-Hasselbalch Equation',
    domain: 'biology',
    category: 'acid-base',
    tags: ['Henderson-Hasselbalch', 'pH', 'bicarbonate', 'pKa', 'buffer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="16" width="56" height="32" rx="4"/>
      <text x="8" y="32" font-size="4" fill="currentColor" stroke="none">pH = 6.1 + log</text>
      <path d="M40 24v16"/>
      <text x="42" y="30" font-size="3" fill="currentColor" stroke="none">[HCO₃⁻]</text>
      <text x="42" y="42" font-size="3" fill="currentColor" stroke="none">0.03×PCO₂</text>
    </svg>`
  },
  {
    id: 'physio-winters-formula',
    name: 'Winters Formula',
    domain: 'biology',
    category: 'acid-base',
    tags: ['Winters', 'metabolic acidosis', 'compensation', 'PCO2', 'expected'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="16" width="56" height="32" rx="4"/>
      <text x="8" y="32" font-size="4" fill="currentColor" stroke="none">PCO₂ = 1.5×[HCO₃⁻]+8±2</text>
      <text x="8" y="48" font-size="3" fill="currentColor" stroke="none">Expected compensation</text>
    </svg>`
  },
  {
    id: 'physio-anion-gap',
    name: 'Anion Gap',
    domain: 'biology',
    category: 'acid-base',
    tags: ['anion gap', 'metabolic acidosis', 'sodium', 'chloride', 'bicarbonate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="16" width="56" height="32" rx="4"/>
      <text x="8" y="32" font-size="4" fill="currentColor" stroke="none">AG = Na⁺ - (Cl⁻ + HCO₃⁻)</text>
      <text x="12" y="48" font-size="4" fill="currentColor" stroke="none">Normal: 8-12 mEq/L</text>
    </svg>`
  },
  {
    id: 'physio-osmolality-calculation',
    name: 'Serum Osmolality',
    domain: 'biology',
    category: 'fluid-balance',
    tags: ['osmolality', 'serum', 'sodium', 'glucose', 'BUN'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="12" width="56" height="40" rx="4"/>
      <text x="8" y="28" font-size="3" fill="currentColor" stroke="none">Osm = 2×Na + Glu/18 + BUN/2.8</text>
      <text x="12" y="42" font-size="4" fill="currentColor" stroke="none">Normal: 285-295</text>
      <text x="18" y="54" font-size="3" fill="currentColor" stroke="none">mOsm/kg</text>
    </svg>`
  },
  {
    id: 'physio-gfr-calculation',
    name: 'GFR Calculation',
    domain: 'biology',
    category: 'renal-physiology',
    tags: ['GFR', 'creatinine clearance', 'Cockcroft-Gault', 'kidney function'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="12" width="56" height="40" rx="4"/>
      <text x="8" y="26" font-size="3" fill="currentColor" stroke="none">CrCl = (140-age)×wt</text>
      <path d="M8 32h48"/>
      <text x="12" y="44" font-size="3" fill="currentColor" stroke="none">72 × Cr (×0.85 if female)</text>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Cockcroft-Gault</text>
    </svg>`
  },
  {
    id: 'physio-fena-calculation',
    name: 'Fractional Excretion of Sodium',
    domain: 'biology',
    category: 'renal-physiology',
    tags: ['FeNa', 'sodium', 'fractional excretion', 'prerenal', 'ATN'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="12" width="56" height="40" rx="4"/>
      <text x="8" y="26" font-size="3" fill="currentColor" stroke="none">FeNa = (UNa × PCr)</text>
      <path d="M8 32h48"/>
      <text x="14" y="44" font-size="3" fill="currentColor" stroke="none">(PNa × UCr) × 100</text>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none"><1% prerenal, >2% ATN</text>
    </svg>`
  },
  {
    id: 'physio-cardiac-index',
    name: 'Cardiac Index',
    domain: 'biology',
    category: 'cardiovascular-physiology',
    tags: ['cardiac index', 'CO', 'BSA', 'body surface area', 'cardiac output'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="16" width="56" height="32" rx="4"/>
      <text x="8" y="28" font-size="4" fill="currentColor" stroke="none">CI = CO / BSA</text>
      <text x="8" y="44" font-size="4" fill="currentColor" stroke="none">Normal: 2.5-4.0 L/min/m²</text>
    </svg>`
  },
  {
    id: 'physio-svr-calculation',
    name: 'Systemic Vascular Resistance',
    domain: 'biology',
    category: 'cardiovascular-physiology',
    tags: ['SVR', 'vascular resistance', 'MAP', 'CVP', 'cardiac output'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="12" width="56" height="40" rx="4"/>
      <text x="8" y="26" font-size="3" fill="currentColor" stroke="none">SVR = (MAP - CVP)</text>
      <path d="M8 32h48"/>
      <text x="20" y="44" font-size="3" fill="currentColor" stroke="none">CO × 80</text>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Normal: 800-1200 dyn·s/cm⁵</text>
    </svg>`
  },
];

export default physiologyIcons;
