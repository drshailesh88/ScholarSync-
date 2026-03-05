/**
 * Psychotropics Icon Library
 * Comprehensive SVG icons for psychiatric medication drug classes
 *
 * Categories:
 * - Antidepressants (SSRIs, SNRIs, TCAs, MAOIs, atypicals)
 * - Antipsychotics (typical, atypical)
 * - Anxiolytics (benzodiazepines, buspirone)
 * - Mood Stabilizers (lithium, anticonvulsants)
 * - Stimulants (ADHD medications)
 */

import type { IconDefinition } from './index';

export const psychotropicsIcons: IconDefinition[] = [
  // ===========================================================================
  // ANTIDEPRESSANTS - SSRIs
  // ===========================================================================
  {
    id: 'psych-ssri-mechanism',
    name: 'SSRI Mechanism',
    domain: 'medicine',
    category: 'psychotropics-ssris',
    tags: ['SSRI', 'serotonin', 'reuptake inhibitor', 'mechanism', 'antidepressant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="16" rx="4" fill="#2196F3" opacity="0.2"/>
      <rect x="8" y="24" width="48" height="16" rx="4"/>
      <circle cx="20" cy="32" r="4" fill="#2196F3"/>
      <circle cx="32" cy="32" r="4" fill="#2196F3"/>
      <circle cx="44" cy="32" r="4" fill="#2196F3"/>
      <path d="M20 32l-8 -12"/>
      <path d="M32 32v-12"/>
      <path d="M44 32l8 -12"/>
      <path d="M36 20l-8 0" stroke-width="2" stroke="#F44336"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Serotonin Reuptake Block</text>
    </svg>`
  },
  {
    id: 'psych-sertraline',
    name: 'Sertraline (Zoloft)',
    domain: 'medicine',
    category: 'psychotropics-ssris',
    tags: ['sertraline', 'zoloft', 'SSRI', 'depression', 'anxiety', 'OCD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#2196F3" opacity="0.3"/>
      <circle cx="32" cy="32" r="20"/>
      <text x="16" y="38" font-size="8" fill="currentColor" stroke="none">SERT</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Zoloft</text>
    </svg>`
  },
  {
    id: 'psych-fluoxetine',
    name: 'Fluoxetine (Prozac)',
    domain: 'medicine',
    category: 'psychotropics-ssris',
    tags: ['fluoxetine', 'prozac', 'SSRI', 'depression', 'long half-life'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="6" fill="#4CAF50" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="6"/>
      <text x="20" y="38" font-size="7" fill="currentColor" stroke="none">FLX</text>
      <text x="20" y="56" font-size="4" fill="currentColor" stroke="none">Prozac</text>
    </svg>`
  },
  {
    id: 'psych-escitalopram',
    name: 'Escitalopram (Lexapro)',
    domain: 'medicine',
    category: 'psychotropics-ssris',
    tags: ['escitalopram', 'lexapro', 'SSRI', 'depression', 'GAD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="#9C27B0" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <text x="20" y="36" font-size="7" fill="currentColor" stroke="none">ESC</text>
      <text x="18" y="56" font-size="4" fill="currentColor" stroke="none">Lexapro</text>
    </svg>`
  },
  {
    id: 'psych-paroxetine',
    name: 'Paroxetine (Paxil)',
    domain: 'medicine',
    category: 'psychotropics-ssris',
    tags: ['paroxetine', 'paxil', 'SSRI', 'anxiety', 'discontinuation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l20 12v16l-20 12-20-12V24z" fill="#FF9800" opacity="0.3"/>
      <path d="M32 12l20 12v16l-20 12-20-12V24z"/>
      <text x="22" y="36" font-size="7" fill="currentColor" stroke="none">PAR</text>
      <text x="24" y="58" font-size="4" fill="currentColor" stroke="none">Paxil</text>
    </svg>`
  },

  // ===========================================================================
  // ANTIDEPRESSANTS - SNRIs
  // ===========================================================================
  {
    id: 'psych-snri-mechanism',
    name: 'SNRI Mechanism',
    domain: 'medicine',
    category: 'psychotropics-snris',
    tags: ['SNRI', 'serotonin', 'norepinephrine', 'dual action', 'mechanism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="22" height="12" rx="3" fill="#2196F3" opacity="0.3"/>
      <rect x="34" y="20" width="22" height="12" rx="3" fill="#F44336" opacity="0.3"/>
      <rect x="8" y="20" width="22" height="12" rx="3"/>
      <rect x="34" y="20" width="22" height="12" rx="3"/>
      <text x="12" y="30" font-size="5" fill="currentColor" stroke="none">5-HT</text>
      <text x="40" y="30" font-size="5" fill="currentColor" stroke="none">NE</text>
      <path d="M19 36v8"/>
      <path d="M45 36v8"/>
      <rect x="14" y="44" width="36" height="10" rx="2" fill="#9C27B0" opacity="0.3"/>
      <text x="24" y="52" font-size="5" fill="currentColor" stroke="none">SNRI</text>
    </svg>`
  },
  {
    id: 'psych-venlafaxine',
    name: 'Venlafaxine (Effexor)',
    domain: 'medicine',
    category: 'psychotropics-snris',
    tags: ['venlafaxine', 'effexor', 'SNRI', 'depression', 'anxiety', 'pain'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#E91E63" opacity="0.3"/>
      <circle cx="32" cy="32" r="20"/>
      <text x="18" y="38" font-size="7" fill="currentColor" stroke="none">VEN</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Effexor</text>
    </svg>`
  },
  {
    id: 'psych-duloxetine',
    name: 'Duloxetine (Cymbalta)',
    domain: 'medicine',
    category: 'psychotropics-snris',
    tags: ['duloxetine', 'cymbalta', 'SNRI', 'depression', 'neuropathy', 'fibromyalgia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="8" fill="#673AB7" opacity="0.3"/>
      <rect x="12" y="16" width="40" height="32" rx="8"/>
      <text x="18" y="38" font-size="7" fill="currentColor" stroke="none">DLX</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Cymbalta</text>
    </svg>`
  },

  // ===========================================================================
  // ANTIDEPRESSANTS - ATYPICAL
  // ===========================================================================
  {
    id: 'psych-bupropion',
    name: 'Bupropion (Wellbutrin)',
    domain: 'medicine',
    category: 'psychotropics-atypical',
    tags: ['bupropion', 'wellbutrin', 'NDRI', 'smoking cessation', 'activating'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 20l16 8 16-8v24l-16 8-16-8z" fill="#FF5722" opacity="0.3"/>
      <path d="M16 20l16 8 16-8v24l-16 8-16-8z"/>
      <text x="20" y="38" font-size="6" fill="currentColor" stroke="none">BUP</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Wellbutrin</text>
    </svg>`
  },
  {
    id: 'psych-mirtazapine',
    name: 'Mirtazapine (Remeron)',
    domain: 'medicine',
    category: 'psychotropics-atypical',
    tags: ['mirtazapine', 'remeron', 'NaSSA', 'sleep', 'appetite', 'sedating'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#795548" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <path d="M24 36c4-8 12-8 16 0"/>
      <circle cx="26" cy="28" r="2" fill="currentColor"/>
      <circle cx="38" cy="28" r="2" fill="currentColor"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Remeron</text>
    </svg>`
  },
  {
    id: 'psych-trazodone',
    name: 'Trazodone',
    domain: 'medicine',
    category: 'psychotropics-atypical',
    tags: ['trazodone', 'sleep', 'serotonin modulator', 'low-dose hypnotic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="22" ry="14" fill="#3F51B5" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="22" ry="14"/>
      <path d="M22 32c0-6 10-6 10 0s10 6 10 0"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Trazodone</text>
    </svg>`
  },

  // ===========================================================================
  // ANTIPSYCHOTICS - ATYPICAL
  // ===========================================================================
  {
    id: 'psych-atypical-ap',
    name: 'Atypical Antipsychotic Mechanism',
    domain: 'medicine',
    category: 'psychotropics-antipsychotics',
    tags: ['atypical', 'antipsychotic', 'dopamine', 'serotonin', 'D2', '5HT2A'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="28" r="12" fill="#9C27B0" opacity="0.3"/>
      <circle cx="40" cy="28" r="12" fill="#FF9800" opacity="0.3"/>
      <circle cx="24" cy="28" r="12"/>
      <circle cx="40" cy="28" r="12"/>
      <text x="18" y="32" font-size="5" fill="currentColor" stroke="none">D2</text>
      <text x="31" y="32" font-size="4" fill="currentColor" stroke="none">5HT2A</text>
      <path d="M24 40l-8 12"/>
      <path d="M40 40l8 12"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Atypical AP</text>
    </svg>`
  },
  {
    id: 'psych-risperidone',
    name: 'Risperidone (Risperdal)',
    domain: 'medicine',
    category: 'psychotropics-antipsychotics',
    tags: ['risperidone', 'risperdal', 'atypical', 'schizophrenia', 'prolactin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="16" width="36" height="32" rx="4" fill="#9C27B0" opacity="0.3"/>
      <rect x="14" y="16" width="36" height="32" rx="4"/>
      <text x="20" y="38" font-size="7" fill="currentColor" stroke="none">RIS</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Risperdal</text>
    </svg>`
  },
  {
    id: 'psych-olanzapine',
    name: 'Olanzapine (Zyprexa)',
    domain: 'medicine',
    category: 'psychotropics-antipsychotics',
    tags: ['olanzapine', 'zyprexa', 'atypical', 'bipolar', 'weight gain', 'metabolic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#FF9800" opacity="0.3"/>
      <circle cx="32" cy="32" r="20"/>
      <text x="18" y="38" font-size="7" fill="currentColor" stroke="none">OLZ</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Zyprexa</text>
    </svg>`
  },
  {
    id: 'psych-quetiapine',
    name: 'Quetiapine (Seroquel)',
    domain: 'medicine',
    category: 'psychotropics-antipsychotics',
    tags: ['quetiapine', 'seroquel', 'atypical', 'bipolar', 'sleep', 'sedating'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l20 12v16l-20 12-20-12V24z" fill="#3F51B5" opacity="0.3"/>
      <path d="M32 12l20 12v16l-20 12-20-12V24z"/>
      <text x="20" y="36" font-size="6" fill="currentColor" stroke="none">QTP</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Seroquel</text>
    </svg>`
  },
  {
    id: 'psych-aripiprazole',
    name: 'Aripiprazole (Abilify)',
    domain: 'medicine',
    category: 'psychotropics-antipsychotics',
    tags: ['aripiprazole', 'abilify', 'partial agonist', 'augmentation', 'akathisia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="22" ry="16" fill="#00BCD4" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="22" ry="16"/>
      <text x="20" y="36" font-size="6" fill="currentColor" stroke="none">ARP</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Abilify</text>
    </svg>`
  },

  // ===========================================================================
  // ANXIOLYTICS - BENZODIAZEPINES
  // ===========================================================================
  {
    id: 'psych-benzo-mechanism',
    name: 'Benzodiazepine Mechanism',
    domain: 'medicine',
    category: 'psychotropics-anxiolytics',
    tags: ['benzodiazepine', 'GABA', 'receptor', 'chloride', 'mechanism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="24" rx="4" fill="#4CAF50" opacity="0.2"/>
      <rect x="12" y="20" width="40" height="24" rx="4"/>
      <circle cx="24" cy="32" r="6" fill="#4CAF50" opacity="0.5"/>
      <circle cx="40" cy="32" r="6" fill="#2196F3" opacity="0.5"/>
      <path d="M30 32h4"/>
      <text x="20" y="32" font-size="4" fill="currentColor" stroke="none">GABA</text>
      <text x="36" y="32" font-size="4" fill="currentColor" stroke="none">BZ</text>
      <text x="20" y="56" font-size="4" fill="currentColor" stroke="none">GABA-A</text>
    </svg>`
  },
  {
    id: 'psych-lorazepam',
    name: 'Lorazepam (Ativan)',
    domain: 'medicine',
    category: 'psychotropics-anxiolytics',
    tags: ['lorazepam', 'ativan', 'benzodiazepine', 'anxiety', 'seizures', 'short-acting'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="6" fill="#4CAF50" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="6"/>
      <text x="18" y="38" font-size="7" fill="currentColor" stroke="none">LOR</text>
      <text x="22" y="56" font-size="4" fill="currentColor" stroke="none">Ativan</text>
    </svg>`
  },
  {
    id: 'psych-alprazolam',
    name: 'Alprazolam (Xanax)',
    domain: 'medicine',
    category: 'psychotropics-anxiolytics',
    tags: ['alprazolam', 'xanax', 'benzodiazepine', 'panic', 'high potency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16h32v32h-32z" fill="#E91E63" opacity="0.3"/>
      <path d="M16 16h32v32h-32z"/>
      <path d="M24 24l16 16"/>
      <path d="M40 24l-16 16"/>
      <text x="24" y="56" font-size="4" fill="currentColor" stroke="none">Xanax</text>
    </svg>`
  },
  {
    id: 'psych-clonazepam',
    name: 'Clonazepam (Klonopin)',
    domain: 'medicine',
    category: 'psychotropics-anxiolytics',
    tags: ['clonazepam', 'klonopin', 'benzodiazepine', 'seizures', 'long-acting'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#9C27B0" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="18" y="38" font-size="6" fill="currentColor" stroke="none">CLN</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Klonopin</text>
    </svg>`
  },

  // ===========================================================================
  // MOOD STABILIZERS
  // ===========================================================================
  {
    id: 'psych-lithium',
    name: 'Lithium',
    domain: 'medicine',
    category: 'psychotropics-mood-stabilizers',
    tags: ['lithium', 'bipolar', 'mania', 'mood stabilizer', 'narrow therapeutic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#607D8B" opacity="0.3"/>
      <circle cx="32" cy="32" r="20"/>
      <text x="22" y="40" font-size="12" fill="currentColor" stroke="none">Li</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Lithium</text>
    </svg>`
  },
  {
    id: 'psych-valproate',
    name: 'Valproate (Depakote)',
    domain: 'medicine',
    category: 'psychotropics-mood-stabilizers',
    tags: ['valproate', 'depakote', 'mood stabilizer', 'seizures', 'teratogenic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="4" fill="#FF5722" opacity="0.3"/>
      <rect x="12" y="16" width="40" height="32" rx="4"/>
      <text x="18" y="38" font-size="7" fill="currentColor" stroke="none">VPA</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Depakote</text>
    </svg>`
  },
  {
    id: 'psych-lamotrigine',
    name: 'Lamotrigine (Lamictal)',
    domain: 'medicine',
    category: 'psychotropics-mood-stabilizers',
    tags: ['lamotrigine', 'lamictal', 'bipolar depression', 'SJS risk', 'slow titration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 10l22 14v16l-22 14-22-14V24z" fill="#00BCD4" opacity="0.3"/>
      <path d="M32 10l22 14v16l-22 14-22-14V24z"/>
      <text x="18" y="36" font-size="6" fill="currentColor" stroke="none">LTG</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Lamictal</text>
    </svg>`
  },

  // ===========================================================================
  // STIMULANTS
  // ===========================================================================
  {
    id: 'psych-methylphenidate',
    name: 'Methylphenidate (Ritalin)',
    domain: 'medicine',
    category: 'psychotropics-stimulants',
    tags: ['methylphenidate', 'ritalin', 'concerta', 'ADHD', 'stimulant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32l16-20 16 20-16 20z" fill="#F44336" opacity="0.3"/>
      <path d="M16 32l16-20 16 20-16 20z"/>
      <text x="22" y="36" font-size="6" fill="currentColor" stroke="none">MPH</text>
      <text x="22" y="58" font-size="4" fill="currentColor" stroke="none">Ritalin</text>
    </svg>`
  },
  {
    id: 'psych-amphetamine',
    name: 'Amphetamine (Adderall)',
    domain: 'medicine',
    category: 'psychotropics-stimulants',
    tags: ['amphetamine', 'adderall', 'vyvanse', 'ADHD', 'stimulant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#FF9800" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <path d="M24 32h16" stroke-width="2"/>
      <path d="M32 24v16" stroke-width="2"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Adderall</text>
    </svg>`
  },
  {
    id: 'psych-atomoxetine',
    name: 'Atomoxetine (Strattera)',
    domain: 'medicine',
    category: 'psychotropics-stimulants',
    tags: ['atomoxetine', 'strattera', 'ADHD', 'non-stimulant', 'NRI'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="8" fill="#673AB7" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="8"/>
      <text x="18" y="38" font-size="6" fill="currentColor" stroke="none">ATX</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Strattera</text>
    </svg>`
  },
];

export default psychotropicsIcons;
