/**
 * Antihypertensives Icon Library
 * Comprehensive SVG icons for antihypertensive medication drug classes
 *
 * Categories:
 * - ACE Inhibitors
 * - ARBs (Angiotensin Receptor Blockers)
 * - Beta Blockers
 * - Calcium Channel Blockers
 * - Diuretics
 * - Other Antihypertensives
 */

import type { IconDefinition } from './index';

export const antihypertensivesIcons: IconDefinition[] = [
  // ===========================================================================
  // ACE INHIBITORS
  // ===========================================================================
  {
    id: 'htn-acei-mechanism',
    name: 'ACE Inhibitor Mechanism',
    domain: 'medicine',
    category: 'antihypertensives-acei',
    tags: ['ACE inhibitor', 'mechanism', 'angiotensin', 'bradykinin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="24" rx="4" fill="#2196F3" opacity="0.2"/>
      <rect x="12" y="20" width="40" height="24" rx="4"/>
      <text x="16" y="36" font-size="6" fill="currentColor" stroke="none">ACE</text>
      <path d="M38 26l8 0" stroke-width="2"/>
      <path d="M42 22l4 4-4 4"/>
      <path d="M38 38l8 0" stroke="#F44336" stroke-width="3"/>
      <text x="10" y="56" font-size="4" fill="currentColor" stroke="none">ACE Inhibition</text>
    </svg>`
  },
  {
    id: 'htn-lisinopril',
    name: 'Lisinopril',
    domain: 'medicine',
    category: 'antihypertensives-acei',
    tags: ['lisinopril', 'prinivil', 'zestril', 'ACE inhibitor', 'HF'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#2196F3" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="22" y="38" font-size="6" fill="currentColor" stroke="none">LIS</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Lisinopril</text>
    </svg>`
  },
  {
    id: 'htn-enalapril',
    name: 'Enalapril',
    domain: 'medicine',
    category: 'antihypertensives-acei',
    tags: ['enalapril', 'vasotec', 'ACE inhibitor', 'IV available'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="6" fill="#3F51B5" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="6"/>
      <text x="20" y="38" font-size="6" fill="currentColor" stroke="none">ENA</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Enalapril</text>
    </svg>`
  },
  {
    id: 'htn-ramipril',
    name: 'Ramipril',
    domain: 'medicine',
    category: 'antihypertensives-acei',
    tags: ['ramipril', 'altace', 'ACE inhibitor', 'cardioprotective'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#673AB7" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <text x="20" y="36" font-size="6" fill="currentColor" stroke="none">RAM</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Ramipril</text>
    </svg>`
  },

  // ===========================================================================
  // ARBs
  // ===========================================================================
  {
    id: 'htn-arb-mechanism',
    name: 'ARB Mechanism',
    domain: 'medicine',
    category: 'antihypertensives-arbs',
    tags: ['ARB', 'mechanism', 'angiotensin receptor', 'AT1'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="14" fill="#FF9800" opacity="0.2"/>
      <circle cx="32" cy="28" r="14"/>
      <rect x="20" y="42" width="24" height="10" rx="2" fill="#FF9800" opacity="0.4"/>
      <path d="M32 42v-8"/>
      <text x="24" y="32" font-size="5" fill="currentColor" stroke="none">AT1</text>
      <path d="M24 24l16 8" stroke="#F44336" stroke-width="2"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">ARB Block</text>
    </svg>`
  },
  {
    id: 'htn-losartan',
    name: 'Losartan (Cozaar)',
    domain: 'medicine',
    category: 'antihypertensives-arbs',
    tags: ['losartan', 'cozaar', 'ARB', 'uricosuric'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#FF9800" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="20" y="38" font-size="6" fill="currentColor" stroke="none">LOS</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Cozaar</text>
    </svg>`
  },
  {
    id: 'htn-valsartan',
    name: 'Valsartan (Diovan)',
    domain: 'medicine',
    category: 'antihypertensives-arbs',
    tags: ['valsartan', 'diovan', 'ARB', 'HF'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="4" fill="#E65100" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="4"/>
      <text x="20" y="38" font-size="6" fill="currentColor" stroke="none">VAL</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Diovan</text>
    </svg>`
  },
  {
    id: 'htn-olmesartan',
    name: 'Olmesartan (Benicar)',
    domain: 'medicine',
    category: 'antihypertensives-arbs',
    tags: ['olmesartan', 'benicar', 'ARB', 'potent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l20 12v16l-20 12-20-12V24z" fill="#FF5722" opacity="0.3"/>
      <path d="M32 12l20 12v16l-20 12-20-12V24z"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">OLM</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Benicar</text>
    </svg>`
  },

  // ===========================================================================
  // BETA BLOCKERS
  // ===========================================================================
  {
    id: 'htn-bb-mechanism',
    name: 'Beta Blocker Mechanism',
    domain: 'medicine',
    category: 'antihypertensives-betablockers',
    tags: ['beta blocker', 'mechanism', 'B1', 'B2', 'adrenergic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="28" r="10" fill="#4CAF50" opacity="0.3"/>
      <circle cx="40" cy="28" r="10" fill="#4CAF50" opacity="0.3"/>
      <circle cx="24" cy="28" r="10"/>
      <circle cx="40" cy="28" r="10"/>
      <text x="18" y="32" font-size="5" fill="currentColor" stroke="none">B1</text>
      <text x="34" y="32" font-size="5" fill="currentColor" stroke="none">B2</text>
      <path d="M18 38l12 8"/>
      <path d="M46 38l-12 8"/>
      <circle cx="32" cy="48" r="6" fill="#F44336" opacity="0.5"/>
      <text x="12" y="60" font-size="4" fill="currentColor" stroke="none">Beta Blockade</text>
    </svg>`
  },
  {
    id: 'htn-metoprolol',
    name: 'Metoprolol',
    domain: 'medicine',
    category: 'antihypertensives-betablockers',
    tags: ['metoprolol', 'lopressor', 'toprol', 'beta-1 selective', 'HF'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#4CAF50" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">MET</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Metoprolol</text>
    </svg>`
  },
  {
    id: 'htn-carvedilol',
    name: 'Carvedilol (Coreg)',
    domain: 'medicine',
    category: 'antihypertensives-betablockers',
    tags: ['carvedilol', 'coreg', 'nonselective', 'alpha block', 'HF'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="6" fill="#388E3C" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="6"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">CAR</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Coreg</text>
    </svg>`
  },
  {
    id: 'htn-atenolol',
    name: 'Atenolol',
    domain: 'medicine',
    category: 'antihypertensives-betablockers',
    tags: ['atenolol', 'tenormin', 'beta-1 selective', 'once daily'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#81C784" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <text x="20" y="36" font-size="5" fill="currentColor" stroke="none">ATE</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Atenolol</text>
    </svg>`
  },
  {
    id: 'htn-propranolol',
    name: 'Propranolol',
    domain: 'medicine',
    category: 'antihypertensives-betablockers',
    tags: ['propranolol', 'inderal', 'nonselective', 'migraine', 'essential tremor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="16" width="36" height="32" rx="4" fill="#2E7D32" opacity="0.3"/>
      <rect x="14" y="16" width="36" height="32" rx="4"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">PRO</text>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Propranolol</text>
    </svg>`
  },

  // ===========================================================================
  // CALCIUM CHANNEL BLOCKERS
  // ===========================================================================
  {
    id: 'htn-ccb-mechanism',
    name: 'CCB Mechanism',
    domain: 'medicine',
    category: 'antihypertensives-ccbs',
    tags: ['CCB', 'calcium channel', 'L-type', 'mechanism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="4" fill="#E91E63" opacity="0.2"/>
      <rect x="12" y="16" width="40" height="32" rx="4"/>
      <path d="M24 24v16" stroke-width="3"/>
      <path d="M32 24v16" stroke-width="3"/>
      <path d="M40 24v16" stroke-width="3"/>
      <circle cx="28" cy="32" r="3" fill="#E91E63"/>
      <circle cx="36" cy="36" r="3" fill="#E91E63"/>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Ca2+ Channel Block</text>
    </svg>`
  },
  {
    id: 'htn-amlodipine',
    name: 'Amlodipine (Norvasc)',
    domain: 'medicine',
    category: 'antihypertensives-ccbs',
    tags: ['amlodipine', 'norvasc', 'DHP CCB', 'long-acting', 'edema'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#E91E63" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">AML</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Amlodipine</text>
    </svg>`
  },
  {
    id: 'htn-nifedipine',
    name: 'Nifedipine',
    domain: 'medicine',
    category: 'antihypertensives-ccbs',
    tags: ['nifedipine', 'procardia', 'DHP CCB', 'reflex tachy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="4" fill="#F06292" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="4"/>
      <text x="22" y="38" font-size="5" fill="currentColor" stroke="none">NIF</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Nifedipine</text>
    </svg>`
  },
  {
    id: 'htn-diltiazem',
    name: 'Diltiazem (Cardizem)',
    domain: 'medicine',
    category: 'antihypertensives-ccbs',
    tags: ['diltiazem', 'cardizem', 'non-DHP CCB', 'rate control', 'AFib'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#9C27B0" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <text x="22" y="36" font-size="5" fill="currentColor" stroke="none">DIL</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Cardizem</text>
    </svg>`
  },
  {
    id: 'htn-verapamil',
    name: 'Verapamil',
    domain: 'medicine',
    category: 'antihypertensives-ccbs',
    tags: ['verapamil', 'calan', 'non-DHP CCB', 'rate control', 'constipation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l20 12v16l-20 12-20-12V24z" fill="#7B1FA2" opacity="0.3"/>
      <path d="M32 12l20 12v16l-20 12-20-12V24z"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">VER</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Verapamil</text>
    </svg>`
  },

  // ===========================================================================
  // DIURETICS
  // ===========================================================================
  {
    id: 'htn-diuretic-mechanism',
    name: 'Diuretic Sites of Action',
    domain: 'medicine',
    category: 'antihypertensives-diuretics',
    tags: ['diuretic', 'nephron', 'mechanism', 'sites'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c0 12 8 16 16 16s16 4 16 16" stroke-width="3"/>
      <circle cx="22" cy="22" r="4" fill="#2196F3" opacity="0.5"/>
      <circle cx="32" cy="32" r="4" fill="#4CAF50" opacity="0.5"/>
      <circle cx="42" cy="42" r="4" fill="#FF9800" opacity="0.5"/>
      <text x="28" y="22" font-size="3" fill="currentColor" stroke="none">Loop</text>
      <text x="38" y="34" font-size="3" fill="currentColor" stroke="none">Thiaz</text>
      <text x="48" y="46" font-size="3" fill="currentColor" stroke="none">K+</text>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">Nephron Sites</text>
    </svg>`
  },
  {
    id: 'htn-furosemide',
    name: 'Furosemide (Lasix)',
    domain: 'medicine',
    category: 'antihypertensives-diuretics',
    tags: ['furosemide', 'lasix', 'loop diuretic', 'edema', 'HF'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#2196F3" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">FUR</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Lasix</text>
    </svg>`
  },
  {
    id: 'htn-hctz',
    name: 'Hydrochlorothiazide',
    domain: 'medicine',
    category: 'antihypertensives-diuretics',
    tags: ['HCTZ', 'thiazide', 'diuretic', 'first-line HTN'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="6" fill="#4CAF50" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="6"/>
      <text x="16" y="38" font-size="5" fill="currentColor" stroke="none">HCTZ</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">HCTZ</text>
    </svg>`
  },
  {
    id: 'htn-chlorthalidone',
    name: 'Chlorthalidone',
    domain: 'medicine',
    category: 'antihypertensives-diuretics',
    tags: ['chlorthalidone', 'thiazide-like', 'long-acting', 'potent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#8BC34A" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <text x="20" y="36" font-size="5" fill="currentColor" stroke="none">CTD</text>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">Chlorthalidone</text>
    </svg>`
  },
  {
    id: 'htn-spironolactone',
    name: 'Spironolactone',
    domain: 'medicine',
    category: 'antihypertensives-diuretics',
    tags: ['spironolactone', 'aldactone', 'K-sparing', 'MRA', 'HF'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#FF9800" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="22" y="38" font-size="5" fill="currentColor" stroke="none">SPI</text>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Spironolactone</text>
    </svg>`
  },

  // ===========================================================================
  // OTHER ANTIHYPERTENSIVES
  // ===========================================================================
  {
    id: 'htn-hydralazine',
    name: 'Hydralazine',
    domain: 'medicine',
    category: 'antihypertensives-other',
    tags: ['hydralazine', 'vasodilator', 'HF', 'pregnancy safe'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c8-16 16-16 20 0s12 16 20 0" stroke-width="3"/>
      <circle cx="32" cy="32" r="12" fill="#FF5722" opacity="0.2"/>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Hydralazine</text>
    </svg>`
  },
  {
    id: 'htn-clonidine',
    name: 'Clonidine',
    domain: 'medicine',
    category: 'antihypertensives-other',
    tags: ['clonidine', 'catapres', 'alpha-2 agonist', 'central', 'ADHD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="4" fill="#607D8B" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="4"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">CLO</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Clonidine</text>
    </svg>`
  },
  {
    id: 'htn-minoxidil',
    name: 'Minoxidil',
    domain: 'medicine',
    category: 'antihypertensives-other',
    tags: ['minoxidil', 'vasodilator', 'resistant HTN', 'hair growth'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#795548" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">MIN</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Minoxidil</text>
    </svg>`
  },
];

export default antihypertensivesIcons;
