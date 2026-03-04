/**
 * Analgesics Icon Library
 * Comprehensive SVG icons for pain medication drug classes
 *
 * Categories:
 * - NSAIDs (Non-steroidal anti-inflammatory drugs)
 * - Opioids
 * - Local Anesthetics
 * - Adjuvant Analgesics
 * - Acetaminophen
 */

import type { IconDefinition } from './index';

export const analgesicsIcons: IconDefinition[] = [
  // ===========================================================================
  // NSAIDs
  // ===========================================================================
  {
    id: 'analg-nsaid-mechanism',
    name: 'NSAID Mechanism (COX Inhibition)',
    domain: 'medicine',
    category: 'analgesics-nsaids',
    tags: ['NSAID', 'COX', 'prostaglandin', 'anti-inflammatory', 'mechanism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#FF5722" opacity="0.2"/>
      <circle cx="32" cy="32" r="20"/>
      <path d="M24 24l16 16" stroke-width="3" stroke="#FF5722"/>
      <path d="M40 24l-16 16" stroke-width="3" stroke="#FF5722"/>
      <text x="18" y="56" font-size="4" fill="currentColor" stroke="none">COX Block</text>
    </svg>`
  },
  {
    id: 'analg-ibuprofen',
    name: 'Ibuprofen',
    domain: 'medicine',
    category: 'analgesics-nsaids',
    tags: ['ibuprofen', 'advil', 'motrin', 'NSAID', 'OTC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="6" fill="#2196F3" opacity="0.3"/>
      <rect x="16" y="20" width="32" height="24" rx="6"/>
      <text x="22" y="36" font-size="8" fill="currentColor" stroke="none">IBU</text>
      <text x="18" y="54" font-size="4" fill="currentColor" stroke="none">Ibuprofen</text>
    </svg>`
  },
  {
    id: 'analg-naproxen',
    name: 'Naproxen',
    domain: 'medicine',
    category: 'analgesics-nsaids',
    tags: ['naproxen', 'aleve', 'naprosyn', 'NSAID', 'long-acting'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="22" ry="14" fill="#4CAF50" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="22" ry="14"/>
      <text x="18" y="36" font-size="8" fill="currentColor" stroke="none">NAP</text>
      <text x="18" y="54" font-size="4" fill="currentColor" stroke="none">Naproxen</text>
    </svg>`
  },
  {
    id: 'analg-ketorolac',
    name: 'Ketorolac (Toradol)',
    domain: 'medicine',
    category: 'analgesics-nsaids',
    tags: ['ketorolac', 'toradol', 'NSAID', 'IV', 'potent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l18 10v20l-18 10-18-10V22z" fill="#E91E63" opacity="0.3"/>
      <path d="M32 12l18 10v20l-18 10-18-10V22z"/>
      <circle cx="32" cy="32" r="8" fill="#E91E63" opacity="0.5"/>
      <text x="24" y="36" font-size="6" fill="currentColor" stroke="none">KT</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Toradol</text>
    </svg>`
  },
  {
    id: 'analg-celecoxib',
    name: 'Celecoxib (COX-2 Selective)',
    domain: 'medicine',
    category: 'analgesics-nsaids',
    tags: ['celecoxib', 'celebrex', 'COX-2', 'selective', 'arthritis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="14" fill="#9C27B0" opacity="0.2"/>
      <circle cx="40" cy="32" r="14" fill="#9C27B0" opacity="0.4"/>
      <circle cx="24" cy="32" r="14"/>
      <circle cx="40" cy="32" r="14"/>
      <text x="18" y="36" font-size="6" fill="currentColor" stroke="none">1</text>
      <text x="36" y="36" font-size="6" fill="currentColor" stroke="none">2</text>
      <path d="M34 32l-4 0" stroke-width="2"/>
      <text x="18" y="56" font-size="4" fill="currentColor" stroke="none">COX-2 Select</text>
    </svg>`
  },

  // ===========================================================================
  // OPIOIDS
  // ===========================================================================
  {
    id: 'analg-opioid-receptor',
    name: 'Opioid Receptor (Mu)',
    domain: 'medicine',
    category: 'analgesics-opioids',
    tags: ['opioid', 'mu receptor', 'mechanism', 'analgesia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="24" rx="4" fill="#FF9800" opacity="0.2"/>
      <rect x="12" y="20" width="40" height="24" rx="4"/>
      <path d="M24 28c0 8 8 8 8 0"/>
      <path d="M32 28c0 8 8 8 8 0"/>
      <circle cx="28" cy="24" r="3" fill="#FF9800"/>
      <text x="26" y="54" font-size="5" fill="currentColor" stroke="none">Mu</text>
    </svg>`
  },
  {
    id: 'analg-morphine',
    name: 'Morphine',
    domain: 'medicine',
    category: 'analgesics-opioids',
    tags: ['morphine', 'opioid', 'gold standard', 'IV', 'PO'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#673AB7" opacity="0.3"/>
      <circle cx="32" cy="32" r="20"/>
      <path d="M24 26c4-4 12-4 16 0"/>
      <path d="M24 38c4 4 12 4 16 0"/>
      <circle cx="26" cy="32" r="3" fill="#673AB7"/>
      <circle cx="38" cy="32" r="3" fill="#673AB7"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Morphine</text>
    </svg>`
  },
  {
    id: 'analg-fentanyl',
    name: 'Fentanyl',
    domain: 'medicine',
    category: 'analgesics-opioids',
    tags: ['fentanyl', 'opioid', 'potent', 'patch', 'IV'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16l16 8 16-8v32l-16 8-16-8z" fill="#F44336" opacity="0.3"/>
      <path d="M16 16l16 8 16-8v32l-16 8-16-8z"/>
      <circle cx="32" cy="32" r="8" fill="#F44336" opacity="0.5"/>
      <text x="28" y="36" font-size="6" fill="currentColor" stroke="none">F</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Fentanyl</text>
    </svg>`
  },
  {
    id: 'analg-hydromorphone',
    name: 'Hydromorphone (Dilaudid)',
    domain: 'medicine',
    category: 'analgesics-opioids',
    tags: ['hydromorphone', 'dilaudid', 'opioid', 'potent', 'PCA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l20 12v16l-20 12-20-12V24z" fill="#3F51B5" opacity="0.3"/>
      <path d="M32 12l20 12v16l-20 12-20-12V24z"/>
      <text x="22" y="36" font-size="7" fill="currentColor" stroke="none">HM</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Dilaudid</text>
    </svg>`
  },
  {
    id: 'analg-oxycodone',
    name: 'Oxycodone',
    domain: 'medicine',
    category: 'analgesics-opioids',
    tags: ['oxycodone', 'percocet', 'opioid', 'oral', 'controlled'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="8" fill="#00BCD4" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="8"/>
      <line x1="22" y1="32" x2="42" y2="32" stroke-width="2"/>
      <text x="18" y="56" font-size="4" fill="currentColor" stroke="none">Oxycodone</text>
    </svg>`
  },
  {
    id: 'analg-tramadol',
    name: 'Tramadol',
    domain: 'medicine',
    category: 'analgesics-opioids',
    tags: ['tramadol', 'ultram', 'weak opioid', 'SNRI', 'seizure risk'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#FFEB3B" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <path d="M24 28l8 8 8-8"/>
      <path d="M24 36l8-8 8 8"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Tramadol</text>
    </svg>`
  },
  {
    id: 'analg-methadone',
    name: 'Methadone',
    domain: 'medicine',
    category: 'analgesics-opioids',
    tags: ['methadone', 'opioid', 'long-acting', 'MAT', 'pain'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="4" fill="#795548" opacity="0.3"/>
      <rect x="12" y="12" width="40" height="40" rx="4"/>
      <path d="M20 32h24" stroke-width="2"/>
      <path d="M32 20v24" stroke-width="2"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Methadone</text>
    </svg>`
  },
  {
    id: 'analg-buprenorphine',
    name: 'Buprenorphine',
    domain: 'medicine',
    category: 'analgesics-opioids',
    tags: ['buprenorphine', 'suboxone', 'partial agonist', 'MAT', 'ceiling'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 44l16-32 16 32z" fill="#4CAF50" opacity="0.3"/>
      <path d="M16 44l16-32 16 32z"/>
      <line x1="16" y1="44" x2="48" y2="44"/>
      <text x="26" y="40" font-size="5" fill="currentColor" stroke="none">B</text>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">Buprenorphine</text>
    </svg>`
  },
  {
    id: 'analg-naloxone',
    name: 'Naloxone (Narcan)',
    domain: 'medicine',
    category: 'analgesics-opioids',
    tags: ['naloxone', 'narcan', 'reversal', 'antagonist', 'overdose'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#F44336" opacity="0.2"/>
      <circle cx="32" cy="32" r="20"/>
      <path d="M22 22l20 20" stroke-width="3" stroke="#F44336"/>
      <path d="M42 22l-20 20" stroke-width="3" stroke="#F44336"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Narcan</text>
    </svg>`
  },

  // ===========================================================================
  // LOCAL ANESTHETICS
  // ===========================================================================
  {
    id: 'analg-lidocaine',
    name: 'Lidocaine',
    domain: 'medicine',
    category: 'analgesics-local',
    tags: ['lidocaine', 'local anesthetic', 'amide', 'nerve block'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 20h32v24l-16 12-16-12z" fill="#9C27B0" opacity="0.3"/>
      <path d="M16 20h32v24l-16 12-16-12z"/>
      <text x="20" y="38" font-size="7" fill="currentColor" stroke="none">LIDO</text>
    </svg>`
  },
  {
    id: 'analg-bupivacaine',
    name: 'Bupivacaine',
    domain: 'medicine',
    category: 'analgesics-local',
    tags: ['bupivacaine', 'marcaine', 'long-acting', 'epidural', 'spinal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="4" fill="#3F51B5" opacity="0.3"/>
      <rect x="12" y="16" width="40" height="32" rx="4"/>
      <path d="M20 32c4-8 8-8 12 0s8 8 12 0"/>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Bupivacaine</text>
    </svg>`
  },
  {
    id: 'analg-ropivacaine',
    name: 'Ropivacaine',
    domain: 'medicine',
    category: 'analgesics-local',
    tags: ['ropivacaine', 'naropin', 'long-acting', 'less motor block'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="#00BCD4" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <text x="20" y="36" font-size="7" fill="currentColor" stroke="none">ROP</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Ropivacaine</text>
    </svg>`
  },

  // ===========================================================================
  // ADJUVANT ANALGESICS
  // ===========================================================================
  {
    id: 'analg-acetaminophen',
    name: 'Acetaminophen (Tylenol)',
    domain: 'medicine',
    category: 'analgesics-adjuvants',
    tags: ['acetaminophen', 'tylenol', 'paracetamol', 'antipyretic', 'hepatotoxic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#2196F3" opacity="0.3"/>
      <circle cx="32" cy="32" r="20"/>
      <text x="18" y="38" font-size="8" fill="currentColor" stroke="none">APAP</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Tylenol</text>
    </svg>`
  },
  {
    id: 'analg-gabapentin',
    name: 'Gabapentin',
    domain: 'medicine',
    category: 'analgesics-adjuvants',
    tags: ['gabapentin', 'neurontin', 'neuropathic pain', 'anticonvulsant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32l10-16h20l10 16-10 16H22z" fill="#FF9800" opacity="0.3"/>
      <path d="M12 32l10-16h20l10 16-10 16H22z"/>
      <text x="22" y="36" font-size="6" fill="currentColor" stroke="none">GAB</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Gabapentin</text>
    </svg>`
  },
  {
    id: 'analg-pregabalin',
    name: 'Pregabalin (Lyrica)',
    domain: 'medicine',
    category: 'analgesics-adjuvants',
    tags: ['pregabalin', 'lyrica', 'neuropathic pain', 'fibromyalgia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="6" fill="#E91E63" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="6"/>
      <text x="20" y="38" font-size="7" fill="currentColor" stroke="none">PGB</text>
      <text x="22" y="56" font-size="4" fill="currentColor" stroke="none">Lyrica</text>
    </svg>`
  },
  {
    id: 'analg-duloxetine',
    name: 'Duloxetine (Cymbalta)',
    domain: 'medicine',
    category: 'analgesics-adjuvants',
    tags: ['duloxetine', 'cymbalta', 'SNRI', 'neuropathic pain', 'depression'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#673AB7" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <path d="M24 26l8 12 8-12"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Cymbalta</text>
    </svg>`
  },
  {
    id: 'analg-ketamine',
    name: 'Ketamine',
    domain: 'medicine',
    category: 'analgesics-adjuvants',
    tags: ['ketamine', 'NMDA', 'dissociative', 'low-dose', 'chronic pain'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l18 12v16l-18 12-18-12V24z" fill="#00BCD4" opacity="0.3"/>
      <path d="M32 12l18 12v16l-18 12-18-12V24z"/>
      <text x="26" y="38" font-size="8" fill="currentColor" stroke="none">K</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Ketamine</text>
    </svg>`
  },
];

export default analgesicsIcons;
