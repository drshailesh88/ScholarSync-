/**
 * Anesthesiology Icon Library
 * Comprehensive SVG icons for anesthesiology and perioperative medicine
 *
 * Categories:
 * - Airway (upper airway anatomy, devices, equipment)
 * - Monitoring (anesthesia machine, monitors, waveforms)
 * - Vascular Access (IV, central lines, arterial lines)
 * - Anesthetic Agents (IV, inhalational, muscle relaxants, reversal)
 * - Regional Anesthesia (spinal, epidural, nerve blocks)
 * - Pain Management (PCA, epidural pump, pain scales)
 * - Complications/Emergencies (malignant hyperthermia, anaphylaxis)
 */

import type { IconDefinition } from './index';

export const anesthesiologyIcons: IconDefinition[] = [
  // ===========================================================================
  // AIRWAY - ANATOMY
  // ===========================================================================
  {
    id: 'anes-upper-airway',
    name: 'Upper Airway Anatomy',
    domain: 'medicine',
    category: 'airway',
    tags: ['upper airway', 'anatomy', 'nasopharynx', 'oropharynx', 'hypopharynx'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24c4 0 8 4 8 8v12c0 8-4 16-12 24l-8 8-8-8c-8-8-12-16-12-24V16c0-4 4-8 8-8z" fill="currentColor" opacity="0.1"/>
      <path d="M32 8v48"/>
      <ellipse cx="32" cy="16" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
      <path d="M24 24h16" stroke-dasharray="2 2"/>
      <path d="M26 32h12"/>
      <ellipse cx="32" cy="44" rx="6" ry="8"/>
      <text x="8" y="18" font-size="4" fill="currentColor" stroke="none">Naso</text>
      <text x="8" y="28" font-size="4" fill="currentColor" stroke="none">Oro</text>
      <text x="8" y="46" font-size="4" fill="currentColor" stroke="none">Hypo</text>
    </svg>`
  },
  {
    id: 'anes-larynx',
    name: 'Larynx',
    domain: 'medicine',
    category: 'airway',
    tags: ['larynx', 'epiglottis', 'glottis', 'cartilage', 'airway anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c0 8 8 12 12 12s12-4 12-12" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="28" rx="16" ry="8"/>
      <path d="M16 28v20c0 8 8 12 16 12s16-4 16-12V28"/>
      <path d="M24 32v8"/>
      <path d="M40 32v8"/>
      <ellipse cx="32" cy="44" rx="8" ry="4" stroke-dasharray="2 2"/>
      <text x="28" y="14" font-size="4" fill="currentColor" stroke="none">Epi</text>
      <text x="22" y="48" font-size="4" fill="currentColor" stroke="none">Glottis</text>
    </svg>`
  },
  {
    id: 'anes-vocal-cords',
    name: 'Vocal Cords',
    domain: 'medicine',
    category: 'airway',
    tags: ['vocal cords', 'glottis', 'arytenoids', 'abduction', 'adduction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <path d="M16 28c8 4 24 4 32 0"/>
      <path d="M20 32l12 8 12-8"/>
      <path d="M20 32l12-4 12 4"/>
      <ellipse cx="32" cy="36" rx="8" ry="4" fill="currentColor" opacity="0.3"/>
      <circle cx="20" cy="44" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="44" cy="44" r="4" fill="currentColor" opacity="0.2"/>
      <text x="26" y="24" font-size="4" fill="currentColor" stroke="none">Anterior</text>
      <text x="12" y="50" font-size="3" fill="currentColor" stroke="none">Aryt</text>
      <text x="42" y="50" font-size="3" fill="currentColor" stroke="none">Aryt</text>
    </svg>`
  },
  {
    id: 'anes-ett',
    name: 'Endotracheal Tube',
    domain: 'medicine',
    category: 'airway',
    tags: ['ETT', 'endotracheal tube', 'intubation', 'cuff', 'airway device'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 4h8v40c0 4 4 8 4 12v4H24v-4c0-4 4-8 4-12V4z" fill="currentColor" opacity="0.1"/>
      <path d="M28 4h8v40"/>
      <ellipse cx="32" cy="50" rx="12" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="50" rx="12" ry="6"/>
      <path d="M24 48v8h16v-8"/>
      <path d="M20 50l-8 4v4h4"/>
      <circle cx="12" cy="58" r="3"/>
      <text x="4" y="52" font-size="4" fill="currentColor" stroke="none">Cuff</text>
      <text x="34" y="10" font-size="4" fill="currentColor" stroke="none">7.5</text>
    </svg>`
  },
  {
    id: 'anes-lma',
    name: 'Laryngeal Mask Airway',
    domain: 'medicine',
    category: 'airway',
    tags: ['LMA', 'laryngeal mask', 'supraglottic', 'airway device', 'i-gel'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 4h8v24"/>
      <ellipse cx="32" cy="40" rx="16" ry="12" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="40" rx="16" ry="12"/>
      <ellipse cx="32" cy="40" rx="10" ry="6"/>
      <ellipse cx="32" cy="40" rx="4" ry="2" fill="currentColor"/>
      <path d="M20 28l-8-4"/>
      <circle cx="12" cy="22" r="3"/>
      <text x="4" y="16" font-size="4" fill="currentColor" stroke="none">Pilot</text>
      <text x="24" y="56" font-size="5" fill="currentColor" stroke="none">LMA</text>
    </svg>`
  },
  {
    id: 'anes-video-laryngoscope',
    name: 'Video Laryngoscope',
    domain: 'medicine',
    category: 'airway',
    tags: ['video laryngoscope', 'GlideScope', 'C-MAC', 'McGrath', 'difficult airway'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 8h20v16H12z" fill="currentColor" opacity="0.2"/>
      <rect x="12" y="8" width="20" height="16" rx="2"/>
      <rect x="16" y="12" width="12" height="8" fill="currentColor" opacity="0.3"/>
      <path d="M22 24v8"/>
      <path d="M22 32c0 8-8 20-8 28"/>
      <path d="M14 60c4-8 8-16 8-28"/>
      <circle cx="14" cy="58" r="3" fill="currentColor" opacity="0.5"/>
      <path d="M36 16h16" stroke-dasharray="4 2"/>
      <text x="38" y="14" font-size="4" fill="currentColor" stroke="none">Screen</text>
    </svg>`
  },
  {
    id: 'anes-bougie',
    name: 'Bougie/Introducer',
    domain: 'medicine',
    category: 'airway',
    tags: ['bougie', 'introducer', 'Eschmann', 'gum elastic', 'difficult airway'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8c24 4 40 20 48 48" stroke-width="3"/>
      <path d="M56 56c-2-4-4-4-6-2"/>
      <circle cx="8" cy="8" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M4 4l8 8"/>
      <text x="24" y="28" font-size="4" fill="currentColor" stroke="none">60cm</text>
      <text x="40" y="44" font-size="4" fill="currentColor" stroke="none">Coude</text>
      <text x="48" y="58" font-size="3" fill="currentColor" stroke="none">tip</text>
    </svg>`
  },
  {
    id: 'anes-cricothyrotomy',
    name: 'Cricothyrotomy Kit',
    domain: 'medicine',
    category: 'airway',
    tags: ['cricothyrotomy', 'surgical airway', 'CICO', 'emergency', 'scalpel'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="16" ry="8"/>
      <ellipse cx="32" cy="44" rx="16" ry="8"/>
      <rect x="24" y="28" width="16" height="8" fill="currentColor" opacity="0.3"/>
      <path d="M24 32h16"/>
      <path d="M32 28v8" stroke="#DC143C" stroke-width="2"/>
      <path d="M44 8l8-4v8l-8 4z" fill="currentColor"/>
      <text x="6" y="22" font-size="4" fill="currentColor" stroke="none">Thyroid</text>
      <text x="6" y="46" font-size="4" fill="currentColor" stroke="none">Cricoid</text>
      <text x="18" y="36" font-size="3" fill="currentColor" stroke="none">CTM</text>
    </svg>`
  },
  {
    id: 'anes-oropharyngeal',
    name: 'Oropharyngeal Airway',
    domain: 'medicine',
    category: 'airway',
    tags: ['OPA', 'oropharyngeal', 'Guedel', 'oral airway', 'basic airway'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24c2 0 4 2 4 4v8c0 4-4 8-8 12-4 4-8 20-8 28H32c0-8-4-24-8-28-4-4-8-8-8-12v-8c0-2 2-4 4-4z" fill="currentColor" opacity="0.1"/>
      <path d="M20 8h24c2 0 4 2 4 4v8c0 4-4 8-8 12-4 4-8 20-8 28"/>
      <path d="M32 60c0-8-4-24-8-28-4-4-8-8-8-12v-8c0-2 2-4 4-4"/>
      <path d="M20 12h24"/>
      <text x="8" y="40" font-size="4" fill="currentColor" stroke="none">OPA</text>
    </svg>`
  },
  {
    id: 'anes-nasopharyngeal',
    name: 'Nasopharyngeal Airway',
    domain: 'medicine',
    category: 'airway',
    tags: ['NPA', 'nasopharyngeal', 'nasal trumpet', 'basic airway'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="10" rx="10" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="10" rx="10" ry="6"/>
      <path d="M28 16v40c0 2 2 4 4 4s4-2 4-4V16"/>
      <path d="M28 32c-2 4-2 8 0 12"/>
      <path d="M36 32c2 4 2 8 0 12"/>
      <text x="8" y="10" font-size="4" fill="currentColor" stroke="none">Flange</text>
      <text x="40" y="40" font-size="4" fill="currentColor" stroke="none">NPA</text>
    </svg>`
  },
  {
    id: 'anes-mallampati-1',
    name: 'Mallampati Class I',
    domain: 'medicine',
    category: 'airway',
    tags: ['Mallampati', 'class 1', 'airway assessment', 'uvula', 'pillars'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="28"/>
      <path d="M16 20h32" stroke-dasharray="2 2"/>
      <ellipse cx="32" cy="48" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <path d="M28 24v8"/>
      <path d="M36 24v8"/>
      <ellipse cx="32" cy="36" rx="4" ry="8"/>
      <path d="M20 28c4 8 4 16 0 24"/>
      <path d="M44 28c-4 8-4 16 0 24"/>
      <text x="26" y="60" font-size="6" fill="currentColor" stroke="none">I</text>
    </svg>`
  },
  {
    id: 'anes-mallampati-2',
    name: 'Mallampati Class II',
    domain: 'medicine',
    category: 'airway',
    tags: ['Mallampati', 'class 2', 'airway assessment', 'uvula partial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="28"/>
      <path d="M16 20h32" stroke-dasharray="2 2"/>
      <ellipse cx="32" cy="48" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <path d="M28 24v8"/>
      <path d="M36 24v8"/>
      <ellipse cx="32" cy="34" rx="4" ry="6"/>
      <path d="M20 28c4 8 4 16 0 24"/>
      <path d="M44 28c-4 8-4 16 0 24"/>
      <path d="M28 36h8" fill="currentColor" opacity="0.3"/>
      <text x="24" y="60" font-size="6" fill="currentColor" stroke="none">II</text>
    </svg>`
  },
  {
    id: 'anes-mallampati-3',
    name: 'Mallampati Class III',
    domain: 'medicine',
    category: 'airway',
    tags: ['Mallampati', 'class 3', 'airway assessment', 'soft palate only'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="28"/>
      <path d="M16 20h32" stroke-dasharray="2 2"/>
      <ellipse cx="32" cy="48" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <rect x="20" y="28" width="24" height="12" fill="currentColor" opacity="0.3"/>
      <path d="M20 28h24"/>
      <path d="M20 40c4 4 20 4 24 0"/>
      <text x="20" y="60" font-size="6" fill="currentColor" stroke="none">III</text>
    </svg>`
  },
  {
    id: 'anes-mallampati-4',
    name: 'Mallampati Class IV',
    domain: 'medicine',
    category: 'airway',
    tags: ['Mallampati', 'class 4', 'airway assessment', 'hard palate only', 'difficult'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="28"/>
      <path d="M16 20h32" stroke-dasharray="2 2"/>
      <rect x="16" y="24" width="32" height="20" fill="currentColor" opacity="0.4"/>
      <ellipse cx="32" cy="48" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <path d="M16 24h32"/>
      <path d="M16 44c8 4 24 4 32 0"/>
      <text x="18" y="60" font-size="6" fill="currentColor" stroke="none">IV</text>
    </svg>`
  },
  {
    id: 'anes-fiberoptic-scope',
    name: 'Fiberoptic Bronchoscope',
    domain: 'medicine',
    category: 'airway',
    tags: ['fiberoptic', 'bronchoscope', 'awake intubation', 'flexible scope', 'difficult airway'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="20" height="28" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="20" height="28" rx="4"/>
      <circle cx="18" cy="18" r="6"/>
      <rect x="14" y="28" width="8" height="4"/>
      <path d="M18 36c0 12 20 16 28 20"/>
      <circle cx="46" cy="56" r="4"/>
      <circle cx="46" cy="56" r="2" fill="currentColor"/>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">FOB</text>
    </svg>`
  },

  // ===========================================================================
  // MONITORING
  // ===========================================================================
  {
    id: 'anes-machine',
    name: 'Anesthesia Machine',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['anesthesia machine', 'workstation', 'vaporizer', 'ventilator', 'bellows'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="52" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="4" width="48" height="52" rx="4"/>
      <rect x="12" y="8" width="24" height="16" rx="2" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="16" r="4"/>
      <rect x="40" y="8" width="12" height="24" rx="2"/>
      <ellipse cx="46" cy="20" rx="4" ry="8" fill="currentColor" opacity="0.3"/>
      <rect x="12" y="28" width="32" height="8" rx="2"/>
      <circle cx="16" cy="32" r="2" fill="#00FF00"/>
      <circle cx="24" cy="32" r="2" fill="#FFFF00"/>
      <circle cx="32" cy="32" r="2" fill="#0000FF"/>
      <rect x="12" y="40" width="40" height="12" rx="2"/>
      <path d="M16 46h32"/>
    </svg>`
  },
  {
    id: 'anes-monitor-ecg',
    name: 'ECG Monitor',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['ECG', 'electrocardiogram', 'heart rate', 'rhythm', 'monitor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="12" width="48" height="40" rx="4"/>
      <path d="M12 36h8l4-12 6 24 4-16 4 8 6-4h12" stroke="#00FF00" stroke-width="2"/>
      <text x="12" y="24" font-size="8" fill="#00FF00" stroke="none">72</text>
      <text x="36" y="24" font-size="4" fill="currentColor" stroke="none">bpm</text>
    </svg>`
  },
  {
    id: 'anes-monitor-spo2',
    name: 'SpO2 Monitor',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['SpO2', 'pulse oximetry', 'oxygen saturation', 'pleth', 'monitor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="12" width="48" height="40" rx="4"/>
      <path d="M12 40c4-4 8 4 12 0s8-8 12 0 8 4 12 0" stroke="#00BFFF" stroke-width="2"/>
      <text x="12" y="28" font-size="10" fill="#00BFFF" stroke="none">98</text>
      <text x="40" y="28" font-size="4" fill="currentColor" stroke="none">%</text>
    </svg>`
  },
  {
    id: 'anes-monitor-etco2',
    name: 'EtCO2 Monitor',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['EtCO2', 'capnography', 'end-tidal CO2', 'waveform', 'monitor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="12" width="48" height="40" rx="4"/>
      <path d="M12 44h8v-16h8v16h8v-16h8v16h8" stroke="#FFFF00" stroke-width="2"/>
      <text x="12" y="24" font-size="8" fill="#FFFF00" stroke="none">35</text>
      <text x="36" y="24" font-size="4" fill="currentColor" stroke="none">mmHg</text>
    </svg>`
  },
  {
    id: 'anes-monitor-ibp',
    name: 'Invasive BP Monitor',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['IBP', 'invasive blood pressure', 'arterial line', 'waveform', 'monitor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="12" width="48" height="40" rx="4"/>
      <path d="M12 36l4-8 2 4 2-12 2 8 4-4 2 8 4-8 2 4 4-4 4 8 4-4" stroke="#FF0000" stroke-width="2"/>
      <text x="12" y="24" font-size="6" fill="#FF0000" stroke="none">120/80</text>
      <text x="44" y="48" font-size="4" fill="currentColor" stroke="none">(93)</text>
    </svg>`
  },
  {
    id: 'anes-monitor-cvp',
    name: 'CVP Monitor',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['CVP', 'central venous pressure', 'waveform', 'right atrial', 'monitor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="12" width="48" height="40" rx="4"/>
      <path d="M12 38l6-4 2 6 4-2 2 4 6-4 2 6 4-2 2 4 6-4" stroke="#0000FF" stroke-width="2"/>
      <text x="12" y="24" font-size="8" fill="#0000FF" stroke="none">8</text>
      <text x="28" y="24" font-size="4" fill="currentColor" stroke="none">mmHg</text>
      <text x="14" y="48" font-size="3" fill="currentColor" stroke="none">a c v</text>
    </svg>`
  },
  {
    id: 'anes-monitor-bis',
    name: 'BIS Monitor',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['BIS', 'bispectral index', 'depth of anesthesia', 'brain', 'monitor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="12" width="48" height="40" rx="4"/>
      <text x="16" y="36" font-size="16" fill="#9370DB" stroke="none">45</text>
      <rect x="40" y="20" width="12" height="24" rx="2"/>
      <rect x="42" y="32" width="8" height="10" fill="#228B22"/>
      <text x="12" y="48" font-size="4" fill="currentColor" stroke="none">General</text>
    </svg>`
  },
  {
    id: 'anes-ventilator-modes',
    name: 'Ventilator Modes',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['ventilator', 'modes', 'VCV', 'PCV', 'PSV', 'SIMV'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <path d="M12 24h8v-8h8v8h8v-8h8v8" stroke="#00FF00"/>
      <text x="14" y="20" font-size="4" fill="currentColor" stroke="none">VCV</text>
      <path d="M12 40c4-8 8-8 8 0s8 0 8 0 4-8 8-8 8 8 8 0" stroke="#00BFFF"/>
      <text x="14" y="48" font-size="4" fill="currentColor" stroke="none">PCV</text>
    </svg>`
  },
  {
    id: 'anes-capnography-waveform',
    name: 'Capnography Waveform',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['capnography', 'waveform', 'EtCO2', 'phases', 'ABCD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="56" height="48" rx="2"/>
      <path d="M8 48h8v-24h16v0h8v24h8" stroke="#FFFF00" stroke-width="2"/>
      <text x="10" y="54" font-size="3" fill="currentColor" stroke="none">I</text>
      <text x="18" y="54" font-size="3" fill="currentColor" stroke="none">II</text>
      <text x="28" y="54" font-size="3" fill="currentColor" stroke="none">III</text>
      <text x="38" y="54" font-size="3" fill="currentColor" stroke="none">0</text>
      <text x="8" y="16" font-size="4" fill="currentColor" stroke="none">EtCO2</text>
    </svg>`
  },
  {
    id: 'anes-pressure-waveform',
    name: 'Pressure Waveforms',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['pressure', 'waveform', 'arterial', 'venous', 'PA catheter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="56" height="48" rx="2"/>
      <path d="M8 24l4-8 2 4 2-10 2 6 4-4 2 8 4-8 2 4 4-4 4 8 4-4 4 8" stroke="#FF0000" stroke-width="1.5"/>
      <path d="M8 44l6-4 2 6 4-2 2 4 6-4 2 6 4-2 2 4 6-4 4 4" stroke="#0000FF" stroke-width="1.5"/>
      <text x="8" y="14" font-size="3" fill="#FF0000" stroke="none">Art</text>
      <text x="8" y="36" font-size="3" fill="#0000FF" stroke="none">CVP</text>
    </svg>`
  },
  {
    id: 'anes-tof-monitor',
    name: 'Train of Four Monitor',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['TOF', 'train of four', 'neuromuscular', 'blockade', 'twitch'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="12" width="48" height="40" rx="4"/>
      <rect x="14" y="28" width="8" height="20" fill="#00FF00" opacity="0.7"/>
      <rect x="24" y="32" width="8" height="16" fill="#00FF00" opacity="0.5"/>
      <rect x="34" y="38" width="8" height="10" fill="#00FF00" opacity="0.3"/>
      <rect x="44" y="44" width="8" height="4" fill="#00FF00" opacity="0.1"/>
      <text x="12" y="22" font-size="5" fill="currentColor" stroke="none">TOF 4/4</text>
    </svg>`
  },
  {
    id: 'anes-temperature-monitor',
    name: 'Temperature Monitor',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['temperature', 'core temp', 'hypothermia', 'hyperthermia', 'monitor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="12" width="48" height="40" rx="4"/>
      <rect x="16" y="20" width="8" height="28" rx="4"/>
      <circle cx="20" cy="44" r="6" fill="#FF6347"/>
      <rect x="18" y="28" width="4" height="16" fill="#FF6347"/>
      <text x="32" y="36" font-size="10" fill="#FF6347" stroke="none">36.5</text>
      <text x="50" y="40" font-size="4" fill="currentColor" stroke="none">C</text>
    </svg>`
  },

  // ===========================================================================
  // VASCULAR ACCESS
  // ===========================================================================
  {
    id: 'anes-peripheral-iv',
    name: 'Peripheral IV',
    domain: 'medicine',
    category: 'vascular-access',
    tags: ['peripheral IV', 'cannula', 'angiocath', 'PIV', 'gauge'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h20"/>
      <path d="M28 28v8l24-4v-4l-24 4v-4z" fill="currentColor" opacity="0.2"/>
      <path d="M28 28v8l24-4v-4z"/>
      <path d="M52 28l8-4"/>
      <circle cx="16" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <text x="8" y="48" font-size="4" fill="currentColor" stroke="none">18G</text>
      <text x="32" y="48" font-size="4" fill="currentColor" stroke="none">20G</text>
      <circle cx="32" cy="52" r="2" fill="#00FF00"/>
      <circle cx="40" cy="52" r="2" fill="#FFC0CB"/>
    </svg>`
  },
  {
    id: 'anes-central-line-ij',
    name: 'Internal Jugular Central Line',
    domain: 'medicine',
    category: 'vascular-access',
    tags: ['central line', 'IJ', 'internal jugular', 'CVC', 'triple lumen'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="20" ry="12" fill="currentColor" opacity="0.1"/>
      <path d="M32 4v8"/>
      <ellipse cx="32" cy="16" rx="4" ry="2"/>
      <path d="M32 18v28"/>
      <path d="M28 46l4 10 4-10" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="12" r="3"/>
      <circle cx="40" cy="12" r="3"/>
      <path d="M28 8l-4-4"/>
      <path d="M36 8l4-4"/>
      <text x="6" y="16" font-size="4" fill="currentColor" stroke="none">SCM</text>
      <text x="28" y="60" font-size="3" fill="currentColor" stroke="none">SVC</text>
    </svg>`
  },
  {
    id: 'anes-central-line-subclavian',
    name: 'Subclavian Central Line',
    domain: 'medicine',
    category: 'vascular-access',
    tags: ['central line', 'subclavian', 'CVC', 'infraclavicular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 20h48" stroke-width="3"/>
      <path d="M12 16c4 0 8 4 8 8"/>
      <path d="M52 16c-4 0-8 4-8 8"/>
      <path d="M24 28c0 8 4 24 8 28"/>
      <circle cx="20" cy="24" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M16 28l-4 4"/>
      <text x="4" y="20" font-size="4" fill="currentColor" stroke="none">Clav</text>
      <text x="28" y="60" font-size="3" fill="currentColor" stroke="none">SVC</text>
    </svg>`
  },
  {
    id: 'anes-central-line-femoral',
    name: 'Femoral Central Line',
    domain: 'medicine',
    category: 'vascular-access',
    tags: ['central line', 'femoral', 'CVC', 'groin', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24c4 0 8 4 8 8v40H12V16c0-4 4-8 8-8z" fill="currentColor" opacity="0.1"/>
      <path d="M12 24h40"/>
      <circle cx="24" cy="32" r="4" fill="#FF0000" opacity="0.5"/>
      <circle cx="36" cy="32" r="4" fill="#0000FF" opacity="0.5"/>
      <ellipse cx="44" cy="32" rx="3" ry="2" fill="currentColor" opacity="0.3"/>
      <path d="M36 36v20"/>
      <text x="20" y="44" font-size="3" fill="currentColor" stroke="none">A</text>
      <text x="34" y="44" font-size="3" fill="currentColor" stroke="none">V</text>
      <text x="40" y="44" font-size="3" fill="currentColor" stroke="none">N</text>
    </svg>`
  },
  {
    id: 'anes-arterial-line',
    name: 'Arterial Line',
    domain: 'medicine',
    category: 'vascular-access',
    tags: ['arterial line', 'A-line', 'radial', 'IBP', 'waveform'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h24" stroke="#FF0000" stroke-width="2"/>
      <path d="M32 28v8l20-4v-4z" fill="#FF0000" opacity="0.3"/>
      <path d="M32 28v8l20-4v-4z" stroke="#FF0000"/>
      <circle cx="56" cy="28" r="4"/>
      <path d="M56 32v8"/>
      <rect x="48" y="40" width="16" height="16" rx="2"/>
      <path d="M52 48l4-4 4 4 4-4" stroke="#FF0000"/>
      <text x="8" y="48" font-size="4" fill="currentColor" stroke="none">Radial</text>
    </svg>`
  },
  {
    id: 'anes-picc',
    name: 'PICC Line',
    domain: 'medicine',
    category: 'vascular-access',
    tags: ['PICC', 'peripherally inserted', 'central catheter', 'arm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c8 0 16-4 24-8s16-8 24-8" fill="currentColor" opacity="0.1"/>
      <path d="M8 32c8 0 16-4 24-8s16-8 24-8"/>
      <circle cx="8" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M4 28l-2-4"/>
      <path d="M4 36l-2 4"/>
      <ellipse cx="56" cy="16" rx="4" ry="2"/>
      <text x="4" y="48" font-size="4" fill="currentColor" stroke="none">Basilic</text>
      <text x="44" y="10" font-size="4" fill="currentColor" stroke="none">SVC</text>
    </svg>`
  },
  {
    id: 'anes-io-access',
    name: 'Intraosseous Access',
    domain: 'medicine',
    category: 'vascular-access',
    tags: ['IO', 'intraosseous', 'EZ-IO', 'emergency', 'tibial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24v48H20z" fill="currentColor" opacity="0.1"/>
      <path d="M20 8h24"/>
      <path d="M20 56h24"/>
      <path d="M24 12v40"/>
      <path d="M40 12v40"/>
      <path d="M32 4v20" stroke-width="2"/>
      <rect x="28" y="4" width="8" height="8" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="28" r="4" fill="#FF0000" opacity="0.5"/>
      <text x="8" y="32" font-size="4" fill="currentColor" stroke="none">Tibia</text>
    </svg>`
  },
  {
    id: 'anes-ultrasound-vascular',
    name: 'Ultrasound-Guided Access',
    domain: 'medicine',
    category: 'vascular-access',
    tags: ['ultrasound', 'US-guided', 'vascular access', 'real-time'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="32" height="24" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="32" height="24" rx="2"/>
      <circle cx="24" cy="20" r="8" stroke="#0000FF"/>
      <circle cx="32" cy="20" r="4" stroke="#FF0000"/>
      <path d="M44 32l8 24" stroke-width="2"/>
      <path d="M44 32l-4 4"/>
      <path d="M48 40l-4 4"/>
      <text x="12" y="40" font-size="4" fill="currentColor" stroke="none">IJ vein</text>
      <text x="12" y="48" font-size="4" fill="currentColor" stroke="none">Carotid</text>
    </svg>`
  },
  {
    id: 'anes-transducer',
    name: 'Pressure Transducer',
    domain: 'medicine',
    category: 'vascular-access',
    tags: ['transducer', 'pressure', 'zeroing', 'leveling', 'arterial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="16" width="24" height="32" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="20" y="16" width="24" height="32" rx="4"/>
      <circle cx="32" cy="32" r="8"/>
      <path d="M32 24v16"/>
      <path d="M24 32h16"/>
      <path d="M8 32h12"/>
      <path d="M44 32h12"/>
      <circle cx="8" cy="32" r="3"/>
      <circle cx="56" cy="32" r="3"/>
      <text x="22" y="56" font-size="4" fill="currentColor" stroke="none">Phlebostatic</text>
    </svg>`
  },
  {
    id: 'anes-pa-catheter',
    name: 'PA Catheter',
    domain: 'medicine',
    category: 'vascular-access',
    tags: ['PA catheter', 'Swan-Ganz', 'pulmonary artery', 'wedge', 'thermodilution'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56c8-16 16-32 24-40s16-8 24-8"/>
      <circle cx="56" cy="8" r="4" fill="#FFA500"/>
      <ellipse cx="48" cy="12" rx="6" ry="4" stroke-dasharray="2 2"/>
      <path d="M4 52l4-4"/>
      <path d="M4 56l4 4"/>
      <circle cx="16" cy="48" r="2" fill="#FF0000"/>
      <circle cx="24" cy="40" r="2" fill="#FFFF00"/>
      <circle cx="32" cy="28" r="2" fill="#0000FF"/>
      <text x="36" y="56" font-size="4" fill="currentColor" stroke="none">RA-RV-PA</text>
    </svg>`
  },

  // ===========================================================================
  // ANESTHETIC AGENTS
  // ===========================================================================
  {
    id: 'anes-propofol',
    name: 'Propofol',
    domain: 'medicine',
    category: 'anesthetic-agents',
    tags: ['propofol', 'Diprivan', 'IV induction', 'TIVA', 'hypnotic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="48" rx="4" fill="#FFFAFA"/>
      <rect x="16" y="8" width="32" height="48" rx="4"/>
      <rect x="20" y="16" width="24" height="32" fill="currentColor" opacity="0.2"/>
      <path d="M24 12h16"/>
      <text x="20" y="36" font-size="6" fill="currentColor" stroke="none">Propofol</text>
      <text x="24" y="44" font-size="4" fill="currentColor" stroke="none">10mg/ml</text>
    </svg>`
  },
  {
    id: 'anes-ketamine',
    name: 'Ketamine',
    domain: 'medicine',
    category: 'anesthetic-agents',
    tags: ['ketamine', 'dissociative', 'IV induction', 'analgesic', 'NMDA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="40" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="20" y="8" width="24" height="40" rx="2"/>
      <path d="M28 4v8"/>
      <path d="M36 4v8"/>
      <rect x="24" y="16" width="16" height="24" fill="#90EE90" opacity="0.5"/>
      <text x="22" y="32" font-size="5" fill="currentColor" stroke="none">Ketamine</text>
      <text x="24" y="54" font-size="4" fill="currentColor" stroke="none">50mg/ml</text>
    </svg>`
  },
  {
    id: 'anes-etomidate',
    name: 'Etomidate',
    domain: 'medicine',
    category: 'anesthetic-agents',
    tags: ['etomidate', 'IV induction', 'hemodynamic stability', 'RSI'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="40" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="20" y="8" width="24" height="40" rx="2"/>
      <path d="M28 4v8"/>
      <path d="M36 4v8"/>
      <rect x="24" y="16" width="16" height="24" fill="#ADD8E6" opacity="0.5"/>
      <text x="20" y="32" font-size="5" fill="currentColor" stroke="none">Etomidate</text>
      <text x="26" y="54" font-size="4" fill="currentColor" stroke="none">2mg/ml</text>
    </svg>`
  },
  {
    id: 'anes-sevoflurane',
    name: 'Sevoflurane',
    domain: 'medicine',
    category: 'anesthetic-agents',
    tags: ['sevoflurane', 'volatile', 'inhalational', 'MAC', 'vaporizer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 16h24v36c0 4-4 8-12 8s-12-4-12-8V16z" fill="#FFFF00" opacity="0.3"/>
      <path d="M20 16h24v36c0 4-4 8-12 8s-12-4-12-8V16z"/>
      <rect x="20" y="8" width="24" height="8" rx="2"/>
      <path d="M32 4v4"/>
      <text x="18" y="36" font-size="5" fill="currentColor" stroke="none">Sevoflurane</text>
      <text x="24" y="48" font-size="4" fill="currentColor" stroke="none">MAC 2%</text>
    </svg>`
  },
  {
    id: 'anes-desflurane',
    name: 'Desflurane',
    domain: 'medicine',
    category: 'anesthetic-agents',
    tags: ['desflurane', 'volatile', 'inhalational', 'MAC', 'heated vaporizer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 16h24v36c0 4-4 8-12 8s-12-4-12-8V16z" fill="#0000FF" opacity="0.2"/>
      <path d="M20 16h24v36c0 4-4 8-12 8s-12-4-12-8V16z"/>
      <rect x="20" y="8" width="24" height="8" rx="2"/>
      <path d="M32 4v4"/>
      <text x="18" y="36" font-size="5" fill="currentColor" stroke="none">Desflurane</text>
      <text x="24" y="48" font-size="4" fill="currentColor" stroke="none">MAC 6%</text>
    </svg>`
  },
  {
    id: 'anes-isoflurane',
    name: 'Isoflurane',
    domain: 'medicine',
    category: 'anesthetic-agents',
    tags: ['isoflurane', 'volatile', 'inhalational', 'MAC', 'vaporizer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 16h24v36c0 4-4 8-12 8s-12-4-12-8V16z" fill="#800080" opacity="0.2"/>
      <path d="M20 16h24v36c0 4-4 8-12 8s-12-4-12-8V16z"/>
      <rect x="20" y="8" width="24" height="8" rx="2"/>
      <path d="M32 4v4"/>
      <text x="20" y="36" font-size="5" fill="currentColor" stroke="none">Isoflurane</text>
      <text x="22" y="48" font-size="4" fill="currentColor" stroke="none">MAC 1.2%</text>
    </svg>`
  },
  {
    id: 'anes-succinylcholine',
    name: 'Succinylcholine',
    domain: 'medicine',
    category: 'anesthetic-agents',
    tags: ['succinylcholine', 'sux', 'depolarizing', 'muscle relaxant', 'RSI'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="12" width="24" height="40" rx="2" fill="#FF6347" opacity="0.3"/>
      <rect x="20" y="12" width="24" height="40" rx="2"/>
      <path d="M28 8v8"/>
      <path d="M36 8v8"/>
      <text x="28" y="28" font-size="4" fill="currentColor" stroke="none">SUX</text>
      <text x="22" y="40" font-size="3" fill="currentColor" stroke="none">20mg/ml</text>
      <text x="24" y="48" font-size="3" fill="currentColor" stroke="none">1-2mg/kg</text>
    </svg>`
  },
  {
    id: 'anes-rocuronium',
    name: 'Rocuronium',
    domain: 'medicine',
    category: 'anesthetic-agents',
    tags: ['rocuronium', 'non-depolarizing', 'muscle relaxant', 'NMBA', 'aminosteroid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="12" width="24" height="40" rx="2" fill="#FFA500" opacity="0.3"/>
      <rect x="20" y="12" width="24" height="40" rx="2"/>
      <path d="M28 8v8"/>
      <path d="M36 8v8"/>
      <text x="26" y="28" font-size="4" fill="currentColor" stroke="none">ROC</text>
      <text x="22" y="40" font-size="3" fill="currentColor" stroke="none">10mg/ml</text>
      <text x="22" y="48" font-size="3" fill="currentColor" stroke="none">0.6-1.2mg/kg</text>
    </svg>`
  },
  {
    id: 'anes-fentanyl',
    name: 'Fentanyl',
    domain: 'medicine',
    category: 'anesthetic-agents',
    tags: ['fentanyl', 'opioid', 'analgesic', 'synthetic', 'potent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="32" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="24" y="8" width="16" height="32" rx="2"/>
      <path d="M32 4v4"/>
      <rect x="28" y="16" width="8" height="16" fill="#C0C0C0" opacity="0.5"/>
      <text x="22" y="48" font-size="5" fill="currentColor" stroke="none">Fentanyl</text>
      <text x="22" y="56" font-size="4" fill="currentColor" stroke="none">50mcg/ml</text>
    </svg>`
  },
  {
    id: 'anes-morphine',
    name: 'Morphine',
    domain: 'medicine',
    category: 'anesthetic-agents',
    tags: ['morphine', 'opioid', 'analgesic', 'natural', 'pain'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="32" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="24" y="8" width="16" height="32" rx="2"/>
      <path d="M32 4v4"/>
      <rect x="28" y="16" width="8" height="16" fill="#E6E6FA" opacity="0.5"/>
      <text x="20" y="48" font-size="5" fill="currentColor" stroke="none">Morphine</text>
      <text x="24" y="56" font-size="4" fill="currentColor" stroke="none">10mg/ml</text>
    </svg>`
  },
  {
    id: 'anes-lidocaine',
    name: 'Lidocaine',
    domain: 'medicine',
    category: 'anesthetic-agents',
    tags: ['lidocaine', 'local anesthetic', 'amide', 'nerve block', 'epidural'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="40" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="20" y="8" width="24" height="40" rx="2"/>
      <path d="M28 4v8"/>
      <path d="M36 4v8"/>
      <rect x="24" y="16" width="16" height="24" fill="#ADD8E6" opacity="0.5"/>
      <text x="22" y="32" font-size="5" fill="currentColor" stroke="none">Lidocaine</text>
      <text x="28" y="54" font-size="4" fill="currentColor" stroke="none">1-2%</text>
    </svg>`
  },
  {
    id: 'anes-bupivacaine',
    name: 'Bupivacaine',
    domain: 'medicine',
    category: 'anesthetic-agents',
    tags: ['bupivacaine', 'local anesthetic', 'amide', 'spinal', 'epidural', 'long-acting'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="40" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="20" y="8" width="24" height="40" rx="2"/>
      <path d="M28 4v8"/>
      <path d="M36 4v8"/>
      <rect x="24" y="16" width="16" height="24" fill="#FFD700" opacity="0.3"/>
      <text x="18" y="32" font-size="4" fill="currentColor" stroke="none">Bupivacaine</text>
      <text x="24" y="54" font-size="4" fill="currentColor" stroke="none">0.25-0.5%</text>
    </svg>`
  },
  {
    id: 'anes-neostigmine',
    name: 'Neostigmine',
    domain: 'medicine',
    category: 'anesthetic-agents',
    tags: ['neostigmine', 'reversal', 'anticholinesterase', 'NMBA reversal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="12" width="16" height="36" rx="2" fill="#90EE90" opacity="0.3"/>
      <rect x="24" y="12" width="16" height="36" rx="2"/>
      <path d="M32 8v4"/>
      <text x="18" y="32" font-size="4" fill="currentColor" stroke="none">Neostigmine</text>
      <text x="22" y="40" font-size="3" fill="currentColor" stroke="none">+Glyco</text>
      <path d="M18 52l28-8" stroke="#00FF00" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'anes-sugammadex',
    name: 'Sugammadex',
    domain: 'medicine',
    category: 'anesthetic-agents',
    tags: ['sugammadex', 'Bridion', 'reversal', 'rocuronium', 'selective'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="40" rx="2" fill="#FF69B4" opacity="0.3"/>
      <rect x="20" y="8" width="24" height="40" rx="2"/>
      <path d="M28 4v8"/>
      <path d="M36 4v8"/>
      <circle cx="32" cy="32" r="10"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <text x="18" y="56" font-size="4" fill="currentColor" stroke="none">Sugammadex</text>
    </svg>`
  },

  // ===========================================================================
  // REGIONAL ANESTHESIA
  // ===========================================================================
  {
    id: 'anes-spinal-needle',
    name: 'Spinal Needle',
    domain: 'medicine',
    category: 'regional-anesthesia',
    tags: ['spinal', 'needle', 'Whitacre', 'Sprotte', 'pencil-point', 'Quincke'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h36"/>
      <path d="M44 32l12-4v8z" fill="currentColor"/>
      <rect x="4" y="28" width="8" height="8" rx="1"/>
      <path d="M44 28v8" stroke-dasharray="2 2"/>
      <text x="14" y="46" font-size="4" fill="currentColor" stroke="none">25G Whitacre</text>
      <text x="14" y="54" font-size="4" fill="currentColor" stroke="none">Pencil-point</text>
    </svg>`
  },
  {
    id: 'anes-epidural-catheter',
    name: 'Epidural Catheter',
    domain: 'medicine',
    category: 'regional-anesthesia',
    tags: ['epidural', 'catheter', 'Tuohy', 'lumbar', 'thoracic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28h28" stroke-width="3"/>
      <path d="M36 28l8-4v8z" fill="currentColor"/>
      <path d="M44 28c8 4 12 8 12 16" stroke-width="2" stroke="#0000FF"/>
      <circle cx="56" cy="48" r="4" fill="#0000FF" opacity="0.3"/>
      <rect x="4" y="24" width="8" height="8" rx="1"/>
      <text x="8" y="44" font-size="4" fill="currentColor" stroke="none">Tuohy 18G</text>
      <text x="8" y="52" font-size="4" fill="currentColor" stroke="none">+ Catheter</text>
    </svg>`
  },
  {
    id: 'anes-nerve-block-needle',
    name: 'Nerve Block Needle',
    domain: 'medicine',
    category: 'regional-anesthesia',
    tags: ['nerve block', 'needle', 'insulated', 'stimulating', 'echogenic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h40"/>
      <path d="M48 28l8 4-8 4z" fill="currentColor"/>
      <rect x="4" y="28" width="8" height="8" rx="1"/>
      <path d="M16 28v8" stroke-dasharray="2 2"/>
      <path d="M24 28v8" stroke-dasharray="2 2"/>
      <path d="M32 28v8" stroke-dasharray="2 2"/>
      <path d="M40 28v8" stroke-dasharray="2 2"/>
      <text x="8" y="48" font-size="4" fill="currentColor" stroke="none">Echogenic</text>
    </svg>`
  },
  {
    id: 'anes-ultrasound-regional',
    name: 'Ultrasound-Guided Block',
    domain: 'medicine',
    category: 'regional-anesthesia',
    tags: ['ultrasound', 'US-guided', 'regional', 'nerve block', 'real-time'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="32" height="24" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="32" height="24" rx="2"/>
      <ellipse cx="24" cy="20" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="20" r="4" fill="#FFFF00"/>
      <path d="M44 32l8 20" stroke-width="2"/>
      <circle cx="30" cy="18" r="2" fill="#00FF00"/>
      <text x="10" y="40" font-size="4" fill="currentColor" stroke="none">Nerve</text>
      <text x="10" y="48" font-size="4" fill="currentColor" stroke="none">LA spread</text>
    </svg>`
  },
  {
    id: 'anes-dermatomes',
    name: 'Dermatome Map',
    domain: 'medicine',
    category: 'regional-anesthesia',
    tags: ['dermatomes', 'sensory', 'spinal levels', 'block assessment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="8" ry="8"/>
      <path d="M24 20v24"/>
      <path d="M40 20v24"/>
      <path d="M24 44l-8 16"/>
      <path d="M40 44l8 16"/>
      <path d="M8 32l16 4"/>
      <path d="M56 32l-16 4"/>
      <path d="M24 24h16" stroke="#FF0000"/>
      <path d="M24 32h16" stroke="#FFA500"/>
      <path d="M24 40h16" stroke="#FFFF00"/>
      <text x="48" y="26" font-size="3" fill="currentColor" stroke="none">T4</text>
      <text x="48" y="34" font-size="3" fill="currentColor" stroke="none">T10</text>
      <text x="48" y="42" font-size="3" fill="currentColor" stroke="none">L1</text>
    </svg>`
  },
  {
    id: 'anes-brachial-plexus',
    name: 'Brachial Plexus',
    domain: 'medicine',
    category: 'regional-anesthesia',
    tags: ['brachial plexus', 'interscalene', 'supraclavicular', 'infraclavicular', 'axillary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8v8"/>
      <path d="M16 8v8"/>
      <path d="M24 8v8"/>
      <path d="M32 8v8"/>
      <path d="M40 8v8"/>
      <path d="M8 16l16 8"/>
      <path d="M16 16l12 8"/>
      <path d="M24 16l8 8"/>
      <path d="M32 16l4 8"/>
      <path d="M40 16l-4 8"/>
      <path d="M24 24l-8 16"/>
      <path d="M32 24v16"/>
      <path d="M36 24l8 16"/>
      <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="24" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="36" cy="24" r="3" fill="currentColor" opacity="0.3"/>
      <text x="4" y="6" font-size="3" fill="currentColor" stroke="none">C5-T1</text>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">Trunks</text>
      <text x="28" y="56" font-size="3" fill="currentColor" stroke="none">Cords</text>
    </svg>`
  },
  {
    id: 'anes-lumbar-plexus',
    name: 'Lumbar Plexus',
    domain: 'medicine',
    category: 'regional-anesthesia',
    tags: ['lumbar plexus', 'psoas', 'femoral', 'obturator', 'lateral femoral cutaneous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="4" width="24" height="24" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M20 8h24"/>
      <path d="M20 16h24"/>
      <path d="M20 24h24"/>
      <path d="M24 28l-8 28"/>
      <path d="M32 28v28"/>
      <path d="M40 28l8 28"/>
      <circle cx="32" cy="16" r="6" fill="#FFA500" opacity="0.3"/>
      <text x="4" y="12" font-size="3" fill="currentColor" stroke="none">L1-L4</text>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">LFC Fem Obt</text>
    </svg>`
  },
  {
    id: 'anes-spinal-anatomy',
    name: 'Spinal Anatomy',
    domain: 'medicine',
    category: 'regional-anesthesia',
    tags: ['spinal', 'anatomy', 'epidural space', 'dura', 'CSF', 'ligaments'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="48" rx="2" fill="currentColor" opacity="0.05"/>
      <path d="M24 8v48"/>
      <path d="M40 8v48"/>
      <ellipse cx="32" cy="32" rx="6" ry="16" fill="#ADD8E6" opacity="0.3"/>
      <path d="M28 16h8" stroke-dasharray="2 2"/>
      <path d="M28 24h8"/>
      <path d="M28 40h8"/>
      <path d="M28 48h8" stroke-dasharray="2 2"/>
      <text x="44" y="18" font-size="3" fill="currentColor" stroke="none">Skin</text>
      <text x="44" y="26" font-size="3" fill="currentColor" stroke="none">Lig flav</text>
      <text x="44" y="34" font-size="3" fill="currentColor" stroke="none">Epidural</text>
      <text x="44" y="42" font-size="3" fill="currentColor" stroke="none">Dura</text>
      <text x="44" y="50" font-size="3" fill="currentColor" stroke="none">CSF</text>
    </svg>`
  },
  {
    id: 'anes-nerve-stimulator',
    name: 'Nerve Stimulator',
    domain: 'medicine',
    category: 'regional-anesthesia',
    tags: ['nerve stimulator', 'PNS', 'peripheral', 'motor response', 'mA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <rect x="20" y="16" width="24" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <text x="24" y="26" font-size="6" fill="currentColor" stroke="none">0.5</text>
      <text x="40" y="26" font-size="4" fill="currentColor" stroke="none">mA</text>
      <circle cx="24" cy="40" r="4"/>
      <circle cx="40" cy="40" r="4"/>
      <path d="M28 40h8"/>
      <text x="22" y="52" font-size="4" fill="currentColor" stroke="none">+ -</text>
    </svg>`
  },
  {
    id: 'anes-tap-block',
    name: 'TAP Block',
    domain: 'medicine',
    category: 'regional-anesthesia',
    tags: ['TAP', 'transversus abdominis plane', 'abdominal', 'nerve block'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4" fill="currentColor" opacity="0.1"/>
      <path d="M8 24h48"/>
      <path d="M8 32h48"/>
      <path d="M8 40h48"/>
      <ellipse cx="40" cy="36" rx="8" ry="4" fill="#00FF00" opacity="0.3"/>
      <path d="M52 20l-12 16" stroke-width="2"/>
      <text x="10" y="22" font-size="3" fill="currentColor" stroke="none">EO</text>
      <text x="10" y="30" font-size="3" fill="currentColor" stroke="none">IO</text>
      <text x="10" y="38" font-size="3" fill="currentColor" stroke="none">TA</text>
      <text x="10" y="46" font-size="3" fill="currentColor" stroke="none">Peritoneum</text>
    </svg>`
  },
  {
    id: 'anes-femoral-block',
    name: 'Femoral Nerve Block',
    domain: 'medicine',
    category: 'regional-anesthesia',
    tags: ['femoral', 'nerve block', 'anterior thigh', 'knee', 'saphenous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16h48"/>
      <circle cx="24" cy="28" r="6" fill="#FF0000" opacity="0.3"/>
      <circle cx="36" cy="28" r="8" fill="#0000FF" opacity="0.3"/>
      <circle cx="48" cy="28" r="4" fill="#FFFF00"/>
      <path d="M48 32v24"/>
      <ellipse cx="48" cy="32" rx="6" ry="4" fill="#00FF00" opacity="0.3"/>
      <path d="M56 20l-8 8" stroke-width="2"/>
      <text x="8" y="12" font-size="3" fill="currentColor" stroke="none">Inguinal lig</text>
      <text x="18" y="40" font-size="3" fill="currentColor" stroke="none">A</text>
      <text x="32" y="40" font-size="3" fill="currentColor" stroke="none">V</text>
      <text x="44" y="40" font-size="3" fill="currentColor" stroke="none">N</text>
    </svg>`
  },
  {
    id: 'anes-sciatic-block',
    name: 'Sciatic Nerve Block',
    domain: 'medicine',
    category: 'regional-anesthesia',
    tags: ['sciatic', 'nerve block', 'popliteal', 'posterior thigh', 'foot'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="20" ry="12" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="20" r="6" fill="#FFFF00"/>
      <path d="M32 26v20"/>
      <path d="M32 46l-8 12"/>
      <path d="M32 46l8 12"/>
      <ellipse cx="32" cy="32" rx="8" ry="4" fill="#00FF00" opacity="0.3"/>
      <path d="M48 16l-10 4" stroke-width="2"/>
      <text x="8" y="12" font-size="3" fill="currentColor" stroke="none">Gluteal</text>
      <text x="16" y="60" font-size="3" fill="currentColor" stroke="none">Tibial</text>
      <text x="36" y="60" font-size="3" fill="currentColor" stroke="none">Peroneal</text>
    </svg>`
  },

  // ===========================================================================
  // PAIN MANAGEMENT
  // ===========================================================================
  {
    id: 'anes-pain-scale-numeric',
    name: 'Numeric Pain Scale',
    domain: 'medicine',
    category: 'pain-management',
    tags: ['pain scale', 'NRS', 'numeric rating', '0-10', 'assessment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="56" height="16" rx="2"/>
      <line x1="10" y1="24" x2="10" y2="40"/>
      <line x1="15" y1="24" x2="15" y2="40"/>
      <line x1="20" y1="24" x2="20" y2="40"/>
      <line x1="25" y1="24" x2="25" y2="40"/>
      <line x1="30" y1="24" x2="30" y2="40"/>
      <line x1="35" y1="24" x2="35" y2="40"/>
      <line x1="40" y1="24" x2="40" y2="40"/>
      <line x1="45" y1="24" x2="45" y2="40"/>
      <line x1="50" y1="24" x2="50" y2="40"/>
      <line x1="55" y1="24" x2="55" y2="40"/>
      <rect x="4" y="24" width="20" height="16" fill="#00FF00" opacity="0.3"/>
      <rect x="24" y="24" width="16" height="16" fill="#FFFF00" opacity="0.3"/>
      <rect x="40" y="24" width="20" height="16" fill="#FF0000" opacity="0.3"/>
      <text x="6" y="48" font-size="4" fill="currentColor" stroke="none">0</text>
      <text x="28" y="48" font-size="4" fill="currentColor" stroke="none">5</text>
      <text x="52" y="48" font-size="4" fill="currentColor" stroke="none">10</text>
    </svg>`
  },
  {
    id: 'anes-pain-scale-faces',
    name: 'Faces Pain Scale',
    domain: 'medicine',
    category: 'pain-management',
    tags: ['pain scale', 'faces', 'Wong-Baker', 'pediatric', 'assessment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="24" r="8" fill="#00FF00" opacity="0.3"/>
      <circle cx="32" cy="24" r="8" fill="#FFFF00" opacity="0.3"/>
      <circle cx="52" cy="24" r="8" fill="#FF0000" opacity="0.3"/>
      <circle cx="10" cy="22" r="1" fill="currentColor"/>
      <circle cx="14" cy="22" r="1" fill="currentColor"/>
      <path d="M9 27c2 2 4 2 6 0"/>
      <circle cx="30" cy="22" r="1" fill="currentColor"/>
      <circle cx="34" cy="22" r="1" fill="currentColor"/>
      <path d="M29 27h6"/>
      <circle cx="50" cy="22" r="1" fill="currentColor"/>
      <circle cx="54" cy="22" r="1" fill="currentColor"/>
      <path d="M49 28c2-2 4-2 6 0"/>
      <text x="10" y="44" font-size="4" fill="currentColor" stroke="none">0</text>
      <text x="30" y="44" font-size="4" fill="currentColor" stroke="none">5</text>
      <text x="48" y="44" font-size="4" fill="currentColor" stroke="none">10</text>
    </svg>`
  },
  {
    id: 'anes-pca-pump',
    name: 'PCA Pump',
    domain: 'medicine',
    category: 'pain-management',
    tags: ['PCA', 'patient-controlled analgesia', 'pump', 'opioid', 'bolus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="4" width="40" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="12" y="4" width="40" height="48" rx="4"/>
      <rect x="16" y="8" width="32" height="16" rx="2" fill="currentColor" opacity="0.2"/>
      <text x="20" y="18" font-size="5" fill="currentColor" stroke="none">1mg/h</text>
      <rect x="20" y="28" width="24" height="8" rx="2"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <circle cx="32" cy="44" r="6"/>
      <text x="28" y="46" font-size="4" fill="currentColor" stroke="none">PCA</text>
      <path d="M32 52v8"/>
    </svg>`
  },
  {
    id: 'anes-epidural-pump',
    name: 'Epidural Pump',
    domain: 'medicine',
    category: 'pain-management',
    tags: ['epidural', 'pump', 'PCEA', 'infusion', 'labor analgesia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="4" width="40" height="48" rx="4" fill="#ADD8E6" opacity="0.2"/>
      <rect x="12" y="4" width="40" height="48" rx="4"/>
      <rect x="16" y="8" width="32" height="16" rx="2" fill="currentColor" opacity="0.2"/>
      <text x="18" y="18" font-size="4" fill="currentColor" stroke="none">8ml/h</text>
      <path d="M16 28h32"/>
      <rect x="20" y="32" width="24" height="12" rx="2"/>
      <text x="24" y="42" font-size="4" fill="currentColor" stroke="none">PCEA</text>
      <path d="M32 52v8"/>
      <path d="M28 56h8"/>
    </svg>`
  },
  {
    id: 'anes-multimodal-analgesia',
    name: 'Multimodal Analgesia',
    domain: 'medicine',
    category: 'pain-management',
    tags: ['multimodal', 'analgesia', 'opioid-sparing', 'ERAS', 'combination'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="16" fill="currentColor" opacity="0.1"/>
      <path d="M32 8v12"/>
      <path d="M32 44v12"/>
      <path d="M8 32h12"/>
      <path d="M44 32h12"/>
      <path d="M17 17l8 8"/>
      <path d="M39 39l8 8"/>
      <path d="M17 47l8-8"/>
      <path d="M39 25l8-8"/>
      <circle cx="32" cy="32" r="8" fill="#00FF00" opacity="0.3"/>
      <text x="4" y="10" font-size="3" fill="currentColor" stroke="none">NSAID</text>
      <text x="44" y="10" font-size="3" fill="currentColor" stroke="none">Para</text>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">LA</text>
      <text x="48" y="58" font-size="3" fill="currentColor" stroke="none">Opioid</text>
    </svg>`
  },
  {
    id: 'anes-intrathecal-pump',
    name: 'Intrathecal Pump',
    domain: 'medicine',
    category: 'pain-management',
    tags: ['intrathecal', 'pump', 'implantable', 'chronic pain', 'morphine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="36" r="20" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="36" r="20"/>
      <circle cx="32" cy="36" r="12"/>
      <circle cx="32" cy="36" r="4" fill="currentColor"/>
      <path d="M32 16v-8"/>
      <path d="M32 8c8 0 16-4 24-4"/>
      <rect x="52" y="2" width="8" height="8" rx="1"/>
      <text x="18" y="60" font-size="4" fill="currentColor" stroke="none">IT Pump</text>
    </svg>`
  },
  {
    id: 'anes-who-ladder',
    name: 'WHO Pain Ladder',
    domain: 'medicine',
    category: 'pain-management',
    tags: ['WHO', 'pain ladder', 'analgesic', 'steps', 'cancer pain'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56h16v-16H8z" fill="#00FF00" opacity="0.3"/>
      <path d="M24 40h16v-16H24z" fill="#FFFF00" opacity="0.3"/>
      <path d="M40 24h16v-16H40z" fill="#FF0000" opacity="0.3"/>
      <path d="M8 56h16v-16H8z"/>
      <path d="M24 40h16v-16H24z"/>
      <path d="M40 24h16v-16H40z"/>
      <text x="10" y="50" font-size="3" fill="currentColor" stroke="none">Non-op</text>
      <text x="26" y="34" font-size="3" fill="currentColor" stroke="none">Weak op</text>
      <text x="42" y="18" font-size="3" fill="currentColor" stroke="none">Strong</text>
      <text x="10" y="10" font-size="4" fill="currentColor" stroke="none">Step 1 2 3</text>
    </svg>`
  },
  {
    id: 'anes-tens-unit',
    name: 'TENS Unit',
    domain: 'medicine',
    category: 'pain-management',
    tags: ['TENS', 'transcutaneous', 'electrical', 'nerve stimulation', 'non-pharmacologic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="40" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="16" y="8" width="32" height="40" rx="4"/>
      <rect x="24" y="16" width="16" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <circle cx="28" cy="36" r="4"/>
      <circle cx="36" cy="36" r="4"/>
      <path d="M24 52l-8 8"/>
      <path d="M40 52l8 8"/>
      <ellipse cx="16" cy="60" rx="4" ry="2" fill="currentColor" opacity="0.3"/>
      <ellipse cx="48" cy="60" rx="4" ry="2" fill="currentColor" opacity="0.3"/>
    </svg>`
  },

  // ===========================================================================
  // COMPLICATIONS/EMERGENCIES
  // ===========================================================================
  {
    id: 'anes-malignant-hyperthermia',
    name: 'Malignant Hyperthermia',
    domain: 'medicine',
    category: 'complications',
    tags: ['malignant hyperthermia', 'MH', 'dantrolene', 'hypermetabolic', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="#FF0000" opacity="0.2"/>
      <circle cx="32" cy="32" r="24"/>
      <path d="M32 12l4 8-4 4-4-4z" fill="#FF0000"/>
      <path d="M24 24v16" stroke="#FF0000" stroke-width="2"/>
      <path d="M40 24v16" stroke="#FF0000" stroke-width="2"/>
      <path d="M28 44h8" stroke="#FF0000" stroke-width="2"/>
      <text x="22" y="56" font-size="4" fill="#FF0000" stroke="none">MH ALERT</text>
      <path d="M16 20l-4-4"/>
      <path d="M48 20l4-4"/>
      <text x="4" y="14" font-size="3" fill="currentColor" stroke="none">T</text>
      <text x="52" y="14" font-size="3" fill="currentColor" stroke="none">CO2</text>
    </svg>`
  },
  {
    id: 'anes-anaphylaxis',
    name: 'Anaphylaxis',
    domain: 'medicine',
    category: 'complications',
    tags: ['anaphylaxis', 'allergic', 'epinephrine', 'hypotension', 'bronchospasm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-12 4-20 16-20 28 0 8 8 16 20 20 12-4 20-12 20-20 0-12-8-24-20-28z" fill="#FF6347" opacity="0.3"/>
      <path d="M32 8c-12 4-20 16-20 28 0 8 8 16 20 20 12-4 20-12 20-20 0-12-8-24-20-28z"/>
      <path d="M28 24c-4 4-4 8 0 12"/>
      <path d="M36 24c4 4 4 8 0 12"/>
      <path d="M24 40c4 4 12 4 16 0"/>
      <circle cx="20" cy="20" r="3" fill="#FF0000"/>
      <circle cx="44" cy="20" r="3" fill="#FF0000"/>
      <circle cx="16" cy="36" r="2" fill="#FF0000"/>
      <circle cx="48" cy="36" r="2" fill="#FF0000"/>
      <text x="20" y="56" font-size="4" fill="currentColor" stroke="none">Epi 0.3mg</text>
    </svg>`
  },
  {
    id: 'anes-difficult-airway-algorithm',
    name: 'Difficult Airway Algorithm',
    domain: 'medicine',
    category: 'complications',
    tags: ['difficult airway', 'algorithm', 'CICO', 'failed intubation', 'ASA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="4" width="24" height="12" rx="2" fill="#FFFF00" opacity="0.3"/>
      <rect x="20" y="4" width="24" height="12" rx="2"/>
      <text x="26" y="12" font-size="4" fill="currentColor" stroke="none">Assess</text>
      <path d="M32 16v4"/>
      <rect x="8" y="20" width="20" height="10" rx="2"/>
      <rect x="36" y="20" width="20" height="10" rx="2"/>
      <text x="12" y="28" font-size="3" fill="currentColor" stroke="none">Awake</text>
      <text x="40" y="28" font-size="3" fill="currentColor" stroke="none">Asleep</text>
      <path d="M18 30v4"/>
      <path d="M46 30v4"/>
      <rect x="4" y="34" width="24" height="10" rx="2" fill="#00FF00" opacity="0.3"/>
      <rect x="36" y="34" width="24" height="10" rx="2" fill="#FFA500" opacity="0.3"/>
      <text x="10" y="42" font-size="3" fill="currentColor" stroke="none">FOB</text>
      <text x="40" y="42" font-size="3" fill="currentColor" stroke="none">VL/SGA</text>
      <rect x="20" y="48" width="24" height="10" rx="2" fill="#FF0000" opacity="0.3"/>
      <text x="24" y="56" font-size="3" fill="currentColor" stroke="none">CICO-Surg</text>
    </svg>`
  },
  {
    id: 'anes-awareness',
    name: 'Awareness Under Anesthesia',
    domain: 'medicine',
    category: 'complications',
    tags: ['awareness', 'intraoperative', 'recall', 'BIS', 'PTSD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="16"/>
      <circle cx="26" cy="20" r="3"/>
      <circle cx="38" cy="20" r="3"/>
      <circle cx="26" cy="20" r="1" fill="currentColor"/>
      <circle cx="38" cy="20" r="1" fill="currentColor"/>
      <path d="M24 30c4 4 12 4 16 0"/>
      <path d="M16 44h32"/>
      <path d="M20 48l4-4 4 4 4-4 4 4 4-4 4 4"/>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Awareness</text>
      <path d="M8 16l-4-8"/>
      <path d="M56 16l4-8"/>
    </svg>`
  },
  {
    id: 'anes-aspiration',
    name: 'Pulmonary Aspiration',
    domain: 'medicine',
    category: 'complications',
    tags: ['aspiration', 'Mendelson', 'pneumonitis', 'regurgitation', 'NPO'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="16" ry="12" fill="currentColor" opacity="0.1"/>
      <path d="M16 20c0-8 8-12 16-12s16 4 16 12"/>
      <path d="M24 20v24"/>
      <path d="M40 20v24"/>
      <path d="M24 44c4 8 12 8 16 0"/>
      <path d="M28 28l-4 8" stroke="#FF0000" stroke-width="2"/>
      <path d="M32 24l-2 12" stroke="#FF0000" stroke-width="2"/>
      <path d="M36 28l4 8" stroke="#FF0000" stroke-width="2"/>
      <circle cx="24" cy="36" r="2" fill="#FF0000" opacity="0.5"/>
      <circle cx="40" cy="36" r="2" fill="#FF0000" opacity="0.5"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Aspiration</text>
    </svg>`
  },
  {
    id: 'anes-local-anesthetic-toxicity',
    name: 'Local Anesthetic Toxicity',
    domain: 'medicine',
    category: 'complications',
    tags: ['LAST', 'local anesthetic', 'toxicity', 'lipid emulsion', 'seizure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="16" fill="#800080" opacity="0.2"/>
      <circle cx="32" cy="24" r="16"/>
      <path d="M24 20v8" stroke-width="2"/>
      <path d="M40 20v8" stroke-width="2"/>
      <path d="M26 32h12"/>
      <path d="M8 44h8l4-8 4 16 4-12 4 8 4-4 4 4h8"/>
      <rect x="24" y="50" width="16" height="10" rx="2" fill="#FFFF00" opacity="0.5"/>
      <text x="26" y="58" font-size="4" fill="currentColor" stroke="none">Lipid</text>
      <text x="20" y="10" font-size="4" fill="currentColor" stroke="none">LAST</text>
    </svg>`
  },

  // ===========================================================================
  // EQUIPMENT
  // ===========================================================================
  {
    id: 'anes-anesthesia-machine',
    name: 'Anesthesia Machine',
    domain: 'medicine',
    category: 'equipment',
    tags: ['anesthesia machine', 'workstation', 'vaporizer', 'ventilator', 'gas delivery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="40" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="16" width="48" height="40" rx="2"/>
      <rect x="12" y="20" width="16" height="12" rx="1"/>
      <rect x="32" y="20" width="20" height="8" rx="1" fill="currentColor" opacity="0.2"/>
      <circle cx="36" cy="36" r="6"/>
      <circle cx="50" cy="36" r="4"/>
      <path d="M12 44h20"/>
      <path d="M12 48h16"/>
      <rect x="44" y="44" width="8" height="8" rx="1"/>
      <path d="M20 8v8"/>
      <path d="M44 8v8"/>
      <circle cx="20" cy="6" r="3" fill="#228B22"/>
      <circle cx="44" cy="6" r="3" fill="#4169E1"/>
      <text x="14" y="62" font-size="3" fill="currentColor" stroke="none">Anesthesia Machine</text>
    </svg>`
  },
  {
    id: 'anes-ventilator',
    name: 'Mechanical Ventilator',
    domain: 'medicine',
    category: 'equipment',
    tags: ['ventilator', 'mechanical ventilation', 'respiratory', 'ICU', 'PEEP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="3" fill="currentColor" opacity="0.1"/>
      <rect x="12" y="8" width="40" height="48" rx="3"/>
      <rect x="16" y="12" width="32" height="20" rx="2" fill="currentColor" opacity="0.2"/>
      <path d="M20 22l4-6 4 8 4-4 4 6 4-8 4 4"/>
      <rect x="16" y="36" width="10" height="6" rx="1"/>
      <rect x="28" y="36" width="10" height="6" rx="1"/>
      <rect x="40" y="36" width="10" height="6" rx="1"/>
      <circle cx="21" cy="48" r="4"/>
      <circle cx="33" cy="48" r="4"/>
      <circle cx="45" cy="48" r="4"/>
      <path d="M32 56v4"/>
      <text x="20" y="62" font-size="4" fill="currentColor" stroke="none">Ventilator</text>
    </svg>`
  },
  {
    id: 'anes-infusion-pump',
    name: 'Infusion Pump',
    domain: 'medicine',
    category: 'equipment',
    tags: ['infusion pump', 'IV pump', 'syringe pump', 'TCI', 'drug delivery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="48" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="16" y="8" width="32" height="48" rx="2"/>
      <rect x="20" y="12" width="24" height="12" rx="1" fill="currentColor" opacity="0.3"/>
      <path d="M24 16h16"/>
      <path d="M24 20h12"/>
      <rect x="20" y="28" width="24" height="4" rx="1"/>
      <path d="M8 30h8"/>
      <path d="M48 30h8"/>
      <circle cx="26" cy="40" r="4"/>
      <circle cx="38" cy="40" r="4"/>
      <rect x="24" y="48" width="16" height="4" rx="1" fill="#228B22"/>
      <text x="18" y="60" font-size="3" fill="currentColor" stroke="none">Infusion Pump</text>
    </svg>`
  },
  {
    id: 'anes-warming-device',
    name: 'Patient Warming Device',
    domain: 'medicine',
    category: 'equipment',
    tags: ['warming', 'Bair Hugger', 'forced air', 'hypothermia prevention', 'temperature'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="20" height="32" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="24" width="20" height="32" rx="2"/>
      <circle cx="18" cy="32" r="4"/>
      <rect x="14" y="40" width="8" height="4" rx="1"/>
      <rect x="14" y="48" width="8" height="4" rx="1"/>
      <path d="M28 36h8"/>
      <path d="M36 36c8 0 16 4 16 12v8H36V36z" fill="#FFA07A" opacity="0.3"/>
      <path d="M36 36c8 0 16 4 16 12v8H36V36z"/>
      <path d="M40 44c2-2 4-2 6 0s4 2 6 0"/>
      <path d="M40 50c2-2 4-2 6 0s4 2 6 0"/>
      <text x="8" y="16" font-size="4" fill="currentColor" stroke="none">Warming</text>
      <text x="6" y="62" font-size="3" fill="#FFA07A" stroke="none">37.0C</text>
    </svg>`
  },
  {
    id: 'anes-defibrillator',
    name: 'Defibrillator',
    domain: 'medicine',
    category: 'equipment',
    tags: ['defibrillator', 'cardioversion', 'AED', 'shock', 'cardiac arrest'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="36" rx="3" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="12" width="48" height="36" rx="3"/>
      <rect x="12" y="16" width="28" height="16" rx="2" fill="currentColor" opacity="0.2"/>
      <path d="M16 28l4-8 4 12 4-8 4 8 4-4" stroke="#00FF00"/>
      <circle cx="48" cy="24" r="4" fill="#DC143C"/>
      <rect x="44" y="36" width="8" height="8" rx="1" fill="#FF4500"/>
      <path d="M12 40h20"/>
      <text x="14" y="46" font-size="3" fill="currentColor" stroke="none">200J</text>
      <path d="M24 52l-8-4v8z" fill="currentColor"/>
      <path d="M40 52l8-4v8z" fill="currentColor"/>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">Defibrillator</text>
    </svg>`
  },
  {
    id: 'anes-ultrasound-machine',
    name: 'Ultrasound Machine',
    domain: 'medicine',
    category: 'equipment',
    tags: ['ultrasound', 'sonography', 'nerve block', 'vascular access', 'POCUS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="32" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="12" y="8" width="40" height="32" rx="2"/>
      <rect x="16" y="12" width="32" height="24" rx="1" fill="#000033"/>
      <ellipse cx="32" cy="24" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <path d="M24 24c4-2 12-2 16 0" stroke="#4682B4"/>
      <circle cx="32" cy="22" r="2" fill="#FFD700"/>
      <path d="M28 44h8"/>
      <rect x="28" y="44" width="8" height="16" rx="2" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="58" rx="6" ry="2"/>
      <text x="20" y="62" font-size="4" fill="currentColor" stroke="none">US</text>
    </svg>`
  },
  {
    id: 'anes-suction',
    name: 'Suction Apparatus',
    domain: 'medicine',
    category: 'equipment',
    tags: ['suction', 'Yankauer', 'airway clearance', 'aspiration', 'secretions'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="32" width="20" height="24" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="32" width="20" height="24" rx="2"/>
      <circle cx="18" cy="44" r="6"/>
      <path d="M12 52h12"/>
      <path d="M28 40h8"/>
      <path d="M36 40c0-16 8-24 16-32"/>
      <path d="M48 8l4 4"/>
      <path d="M48 8l-4 4"/>
      <ellipse cx="52" cy="8" rx="3" ry="6" fill="currentColor" opacity="0.2"/>
      <text x="10" y="62" font-size="4" fill="currentColor" stroke="none">Suction</text>
    </svg>`
  },
  {
    id: 'anes-fiber-optic-scope',
    name: 'Fiber Optic Bronchoscope',
    domain: 'medicine',
    category: 'equipment',
    tags: ['fiber optic', 'bronchoscope', 'FOB', 'awake intubation', 'difficult airway'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="16" height="24" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="16" height="24" rx="2"/>
      <rect x="10" y="10" width="12" height="8" rx="1" fill="currentColor" opacity="0.3"/>
      <circle cx="16" cy="24" r="3"/>
      <path d="M16 32v4c0 8 8 16 8 20"/>
      <path d="M24 56c2 2 4 4 4 4"/>
      <circle cx="26" cy="58" r="2" fill="#00FF00"/>
      <path d="M24 24h8"/>
      <circle cx="36" cy="24" r="4"/>
      <path d="M34 20v-4"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Fiberoptic</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL MONITORING
  // ===========================================================================
  {
    id: 'anes-bis-monitor',
    name: 'BIS Monitor',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['BIS', 'bispectral index', 'depth of anesthesia', 'awareness', 'sedation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="16" width="48" height="32" rx="2"/>
      <text x="16" y="36" font-size="16" font-weight="bold" fill="#FF69B4" stroke="none">45</text>
      <path d="M40 24l2 4 2-8 2 12 2-6 2 2"/>
      <rect x="40" y="36" width="12" height="4" fill="#228B22"/>
      <path d="M16 44h32"/>
      <text x="16" y="42" font-size="4" fill="currentColor" stroke="none">BIS</text>
      <ellipse cx="32" cy="8" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
      <path d="M24 8h16"/>
      <circle cx="24" cy="8" r="2" fill="currentColor"/>
      <circle cx="32" cy="8" r="2" fill="currentColor"/>
      <circle cx="40" cy="8" r="2" fill="currentColor"/>
      <text x="14" y="56" font-size="3" fill="currentColor" stroke="none">Depth Monitor</text>
    </svg>`
  },
  {
    id: 'anes-tof-monitor',
    name: 'TOF Monitor',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['TOF', 'train of four', 'neuromuscular', 'paralysis', 'muscle relaxant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="32" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="48" height="32" rx="2"/>
      <rect x="14" y="16" width="8" height="16" fill="#20B2AA"/>
      <rect x="24" y="20" width="8" height="12" fill="#20B2AA" opacity="0.8"/>
      <rect x="34" y="24" width="8" height="8" fill="#20B2AA" opacity="0.6"/>
      <rect x="44" y="28" width="8" height="4" fill="#20B2AA" opacity="0.4"/>
      <path d="M18 36v4"/>
      <path d="M28 36v4"/>
      <path d="M38 36v4"/>
      <path d="M48 36v4"/>
      <text x="14" y="48" font-size="5" fill="currentColor" stroke="none">TOF: 4/4</text>
      <path d="M12 52h40"/>
      <circle cx="20" cy="56" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="44" cy="56" r="4" fill="currentColor" opacity="0.2"/>
      <text x="18" y="58" font-size="3" fill="currentColor" stroke="none">+</text>
      <text x="42" y="58" font-size="3" fill="currentColor" stroke="none">-</text>
    </svg>`
  },
  {
    id: 'anes-cardiac-output-monitor',
    name: 'Cardiac Output Monitor',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['cardiac output', 'CO', 'hemodynamic', 'SVV', 'PPV', 'FloTrac'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <path d="M32 12c-8 0-12 8-12 16s4 16 12 16 12-8 12-16-4-16-12-16z" fill="#DC143C" opacity="0.2"/>
      <path d="M32 12c-8 0-12 8-12 16s4 16 12 16 12-8 12-16-4-16-12-16z"/>
      <path d="M20 28h8l2-4 4 8 4-8 2 4h8" stroke="#DC143C"/>
      <text x="12" y="52" font-size="4" fill="currentColor" stroke="none">CO: 5.2 L/min</text>
      <text x="12" y="58" font-size="3" fill="currentColor" stroke="none">SVV: 12%</text>
      <text x="36" y="58" font-size="3" fill="currentColor" stroke="none">CI: 2.8</text>
    </svg>`
  },
  {
    id: 'anes-temperature-probe',
    name: 'Temperature Probe',
    domain: 'medicine',
    category: 'monitoring',
    tags: ['temperature', 'core temp', 'esophageal', 'nasopharyngeal', 'hypothermia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="40" rx="8" fill="currentColor" opacity="0.1"/>
      <rect x="24" y="8" width="16" height="40" rx="8"/>
      <rect x="28" y="20" width="8" height="24" rx="4" fill="#DC143C" opacity="0.7"/>
      <circle cx="32" cy="40" r="4" fill="#DC143C"/>
      <path d="M28 12h8"/>
      <path d="M30 16h4"/>
      <path d="M30 24h4"/>
      <path d="M30 28h4"/>
      <path d="M30 32h4"/>
      <text x="42" y="24" font-size="4" fill="currentColor" stroke="none">36</text>
      <text x="42" y="32" font-size="4" fill="currentColor" stroke="none">37</text>
      <text x="42" y="40" font-size="4" fill="currentColor" stroke="none">38</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">36.8C</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL COMPLICATIONS
  // ===========================================================================
  {
    id: 'anes-bronchospasm',
    name: 'Bronchospasm',
    domain: 'medicine',
    category: 'complications',
    tags: ['bronchospasm', 'wheezing', 'airway', 'asthma', 'reactive airway'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v12"/>
      <path d="M32 20c-8 0-16 8-20 24"/>
      <path d="M32 20c8 0 16 8 20 24"/>
      <path d="M12 44c4-4 8-8 20-8s16 4 20 8" fill="currentColor" opacity="0.1"/>
      <path d="M20 28c2 1 4 0 6-1s4-1 6 0" stroke="#FF4500"/>
      <path d="M32 28c2 1 4 0 6-1s4-1 6 0" stroke="#FF4500"/>
      <path d="M16 36c2 1 4 0 6-1s4-1 6 0" stroke="#FF4500"/>
      <path d="M36 36c2 1 4 0 6-1s4-1 6 0" stroke="#FF4500"/>
      <circle cx="24" cy="52" r="4" fill="#DC143C" opacity="0.3"/>
      <circle cx="40" cy="52" r="4" fill="#DC143C" opacity="0.3"/>
      <text x="10" y="62" font-size="4" fill="currentColor" stroke="none">Bronchospasm</text>
    </svg>`
  },
  {
    id: 'anes-pdph',
    name: 'Post-Dural Puncture Headache',
    domain: 'medicine',
    category: 'complications',
    tags: ['PDPH', 'dural puncture', 'headache', 'spinal', 'epidural', 'blood patch'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="16" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="24" r="16"/>
      <circle cx="26" cy="20" r="2"/>
      <circle cx="38" cy="20" r="2"/>
      <path d="M26 30c2 2 10 2 12 0"/>
      <path d="M8 20l8-4"/>
      <path d="M8 24l8 0"/>
      <path d="M8 28l8 4"/>
      <path d="M56 20l-8-4"/>
      <path d="M56 24l-8 0"/>
      <path d="M56 28l-8 4"/>
      <path d="M24 44v8"/>
      <path d="M40 44v8"/>
      <path d="M24 52h16"/>
      <ellipse cx="32" cy="54" rx="6" ry="2" fill="#ADD8E6"/>
      <text x="20" y="62" font-size="3" fill="currentColor" stroke="none">PDPH</text>
    </svg>`
  },
  {
    id: 'anes-pneumothorax',
    name: 'Pneumothorax',
    domain: 'medicine',
    category: 'complications',
    tags: ['pneumothorax', 'tension', 'chest tube', 'hypoxia', 'central line'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="12" ry="20" fill="currentColor" opacity="0.2"/>
      <ellipse cx="24" cy="32" rx="12" ry="20"/>
      <ellipse cx="44" cy="32" rx="8" ry="16" fill="none" stroke-dasharray="4 2"/>
      <path d="M38 20c4 4 8 8 8 12s-4 8-8 12" stroke="#FF0000" stroke-width="2"/>
      <path d="M20 24c-2 4-2 12 0 16"/>
      <circle cx="56" cy="24" r="2" fill="currentColor"/>
      <circle cx="56" cy="32" r="2" fill="currentColor"/>
      <circle cx="56" cy="40" r="2" fill="currentColor"/>
      <text x="50" y="24" font-size="4" fill="currentColor" stroke="none">Air</text>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">Pneumothorax</text>
    </svg>`
  },
  {
    id: 'anes-high-spinal',
    name: 'High Spinal Block',
    domain: 'medicine',
    category: 'complications',
    tags: ['high spinal', 'total spinal', 'respiratory arrest', 'hypotension', 'neuraxial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="8" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="8" ry="24"/>
      <path d="M32 8v48"/>
      <path d="M28 12h8"/>
      <path d="M28 20h8"/>
      <path d="M28 28h8"/>
      <path d="M28 36h8"/>
      <path d="M28 44h8"/>
      <path d="M28 52h8"/>
      <rect x="12" y="8" width="8" height="24" fill="#7B68EE" opacity="0.5"/>
      <rect x="44" y="8" width="8" height="24" fill="#7B68EE" opacity="0.5"/>
      <path d="M8 32h8" stroke="#DC143C" stroke-width="2"/>
      <path d="M48 32h8" stroke="#DC143C" stroke-width="2"/>
      <text x="14" y="44" font-size="3" fill="currentColor" stroke="none">T4</text>
      <text x="10" y="60" font-size="3" fill="currentColor" stroke="none">High Spinal</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL REGIONAL ANESTHESIA
  // ===========================================================================
  {
    id: 'anes-tap-block',
    name: 'TAP Block',
    domain: 'medicine',
    category: 'regional-anesthesia',
    tags: ['TAP', 'transversus abdominis', 'abdominal wall', 'nerve block', 'ultrasound'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="32" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="12" y="20" width="40" height="32" rx="2"/>
      <path d="M12 28h40"/>
      <path d="M12 36h40"/>
      <path d="M12 44h40"/>
      <text x="4" y="26" font-size="3" fill="currentColor" stroke="none">EO</text>
      <text x="4" y="34" font-size="3" fill="currentColor" stroke="none">IO</text>
      <text x="4" y="42" font-size="3" fill="currentColor" stroke="none">TA</text>
      <ellipse cx="36" cy="40" rx="8" ry="4" fill="#7B68EE" opacity="0.5"/>
      <path d="M44 12l-8 20" stroke="#C0C0C0" stroke-width="2"/>
      <circle cx="44" cy="10" r="3" fill="currentColor" opacity="0.3"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">TAP Block</text>
    </svg>`
  },
  {
    id: 'anes-adductor-canal',
    name: 'Adductor Canal Block',
    domain: 'medicine',
    category: 'regional-anesthesia',
    tags: ['adductor canal', 'saphenous', 'femoral', 'knee surgery', 'nerve block'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="16" ry="24"/>
      <circle cx="32" cy="24" r="4" fill="#DC143C" opacity="0.3"/>
      <path d="M32 28v16" stroke="#FFD700" stroke-width="2"/>
      <ellipse cx="24" cy="32" rx="4" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="40" cy="32" rx="4" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="36" rx="6" ry="2" fill="#7B68EE" opacity="0.5"/>
      <path d="M48 20l-12 16" stroke="#C0C0C0" stroke-width="2"/>
      <circle cx="50" cy="18" r="3" fill="currentColor" opacity="0.3"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Adductor Canal</text>
    </svg>`
  },
  {
    id: 'anes-erector-spinae',
    name: 'Erector Spinae Block',
    domain: 'medicine',
    category: 'regional-anesthesia',
    tags: ['ESP', 'erector spinae', 'paravertebral', 'thoracic', 'nerve block'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v48"/>
      <rect x="24" y="12" width="16" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="24" width="16" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="36" width="16" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <ellipse cx="16" cy="16" rx="4" ry="12" fill="currentColor" opacity="0.3"/>
      <ellipse cx="48" cy="16" rx="4" ry="12" fill="currentColor" opacity="0.3"/>
      <ellipse cx="16" cy="28" rx="4" ry="12" fill="currentColor" opacity="0.3"/>
      <ellipse cx="48" cy="28" rx="4" ry="12" fill="currentColor" opacity="0.3"/>
      <ellipse cx="44" cy="20" rx="8" ry="4" fill="#7B68EE" opacity="0.5"/>
      <path d="M56 8l-12 12" stroke="#C0C0C0" stroke-width="2"/>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">ESP Block</text>
    </svg>`
  },
  {
    id: 'anes-pecs-block',
    name: 'PECS Block',
    domain: 'medicine',
    category: 'regional-anesthesia',
    tags: ['PECS', 'pectoral', 'breast surgery', 'chest wall', 'nerve block'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c8-4 24-4 32 0"/>
      <path d="M16 16c0 16 4 32 16 40"/>
      <path d="M48 16c0 16-4 32-16 40"/>
      <path d="M20 24c6-2 18-2 24 0"/>
      <path d="M24 32c4-1 12-1 16 0"/>
      <ellipse cx="24" cy="28" rx="8" ry="4" fill="currentColor" opacity="0.3"/>
      <ellipse cx="40" cy="28" rx="8" ry="4" fill="currentColor" opacity="0.3"/>
      <ellipse cx="36" cy="24" rx="6" ry="2" fill="#7B68EE" opacity="0.5"/>
      <ellipse cx="36" cy="32" rx="6" ry="2" fill="#7B68EE" opacity="0.5"/>
      <path d="M56 12l-16 12" stroke="#C0C0C0" stroke-width="2"/>
      <circle cx="58" cy="10" r="3" fill="currentColor" opacity="0.3"/>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">PECS Block</text>
    </svg>`
  }
];

export default anesthesiologyIcons;
