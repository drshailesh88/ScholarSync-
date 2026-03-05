/**
 * Neurological Drugs Icon Library
 * Comprehensive SVG icons for neurological medication drug classes
 *
 * Categories:
 * - Anticonvulsants/Antiepileptics
 * - Parkinsonian Drugs
 * - Muscle Relaxants
 * - Multiple Sclerosis Drugs
 * - Migraine Medications
 * - Alzheimer's Drugs
 */

import type { IconDefinition } from './index';

export const neuroDrugsIcons: IconDefinition[] = [
  // ===========================================================================
  // ANTICONVULSANTS
  // ===========================================================================
  {
    id: 'neuro-seizure-mechanism',
    name: 'Anticonvulsant Mechanisms',
    domain: 'medicine',
    category: 'neuro-anticonvulsants',
    tags: ['anticonvulsant', 'seizure', 'sodium channel', 'GABA', 'mechanism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c4-16 8-16 12 0s8 16 12 0 8-16 12 0 8 16 12 0" stroke-width="2"/>
      <path d="M8 32h48" stroke="#F44336" stroke-width="2"/>
      <circle cx="20" cy="32" r="3" fill="#4CAF50"/>
      <circle cx="44" cy="32" r="3" fill="#2196F3"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Seizure Suppression</text>
    </svg>`
  },
  {
    id: 'neuro-levetiracetam',
    name: 'Levetiracetam (Keppra)',
    domain: 'medicine',
    category: 'neuro-anticonvulsants',
    tags: ['levetiracetam', 'keppra', 'anticonvulsant', 'SV2A', 'broad-spectrum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#2196F3" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">LEV</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Keppra</text>
    </svg>`
  },
  {
    id: 'neuro-phenytoin',
    name: 'Phenytoin (Dilantin)',
    domain: 'medicine',
    category: 'neuro-anticonvulsants',
    tags: ['phenytoin', 'dilantin', 'sodium channel', 'status epilepticus', 'levels'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="4" fill="#FF9800" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="4"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">PHT</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Dilantin</text>
    </svg>`
  },
  {
    id: 'neuro-carbamazepine',
    name: 'Carbamazepine (Tegretol)',
    domain: 'medicine',
    category: 'neuro-anticonvulsants',
    tags: ['carbamazepine', 'tegretol', 'sodium channel', 'trigeminal neuralgia', 'HLA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#F44336" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <text x="18" y="36" font-size="5" fill="currentColor" stroke="none">CBZ</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Tegretol</text>
    </svg>`
  },
  {
    id: 'neuro-valproic-acid',
    name: 'Valproic Acid',
    domain: 'medicine',
    category: 'neuro-anticonvulsants',
    tags: ['valproic acid', 'depakote', 'broad-spectrum', 'hepatotoxic', 'teratogenic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l20 12v16l-20 12-20-12V24z" fill="#9C27B0" opacity="0.3"/>
      <path d="M32 12l20 12v16l-20 12-20-12V24z"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">VPA</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Depakote</text>
    </svg>`
  },
  {
    id: 'neuro-lamotrigine',
    name: 'Lamotrigine (Lamictal)',
    domain: 'medicine',
    category: 'neuro-anticonvulsants',
    tags: ['lamotrigine', 'lamictal', 'sodium channel', 'bipolar', 'SJS risk'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#00BCD4" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">LTG</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Lamictal</text>
    </svg>`
  },
  {
    id: 'neuro-topiramate',
    name: 'Topiramate (Topamax)',
    domain: 'medicine',
    category: 'neuro-anticonvulsants',
    tags: ['topiramate', 'topamax', 'migraine', 'weight loss', 'cognitive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="8" fill="#4CAF50" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="8"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">TPM</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Topamax</text>
    </svg>`
  },

  // ===========================================================================
  // PARKINSONIAN DRUGS
  // ===========================================================================
  {
    id: 'neuro-dopamine-pathway',
    name: 'Dopamine Pathway',
    domain: 'medicine',
    category: 'neuro-parkinsonian',
    tags: ['dopamine', 'nigrostriatal', 'mechanism', 'Parkinson'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="20" r="8" fill="#673AB7" opacity="0.3"/>
      <circle cx="44" cy="44" r="8" fill="#673AB7" opacity="0.3"/>
      <circle cx="20" cy="20" r="8"/>
      <circle cx="44" cy="44" r="8"/>
      <path d="M26 26l12 12" stroke-width="3"/>
      <path d="M32 32l6 -6" stroke-width="2"/>
      <text x="10" y="56" font-size="4" fill="currentColor" stroke="none">Dopamine Pathway</text>
    </svg>`
  },
  {
    id: 'neuro-levodopa',
    name: 'Levodopa/Carbidopa (Sinemet)',
    domain: 'medicine',
    category: 'neuro-parkinsonian',
    tags: ['levodopa', 'carbidopa', 'sinemet', 'Parkinson', 'gold standard'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="10" y="20" width="20" height="24" rx="4" fill="#673AB7" opacity="0.3"/>
      <rect x="34" y="20" width="20" height="24" rx="4" fill="#9C27B0" opacity="0.3"/>
      <rect x="10" y="20" width="20" height="24" rx="4"/>
      <rect x="34" y="20" width="20" height="24" rx="4"/>
      <text x="14" y="36" font-size="4" fill="currentColor" stroke="none">LD</text>
      <text x="38" y="36" font-size="4" fill="currentColor" stroke="none">CD</text>
      <text x="16" y="56" font-size="4" fill="currentColor" stroke="none">Sinemet</text>
    </svg>`
  },
  {
    id: 'neuro-pramipexole',
    name: 'Pramipexole (Mirapex)',
    domain: 'medicine',
    category: 'neuro-parkinsonian',
    tags: ['pramipexole', 'mirapex', 'dopamine agonist', 'RLS', 'Parkinson'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#E91E63" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">PRA</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Mirapex</text>
    </svg>`
  },
  {
    id: 'neuro-ropinirole',
    name: 'Ropinirole (Requip)',
    domain: 'medicine',
    category: 'neuro-parkinsonian',
    tags: ['ropinirole', 'requip', 'dopamine agonist', 'RLS', 'Parkinson'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#FF5722" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <text x="20" y="36" font-size="5" fill="currentColor" stroke="none">ROP</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Requip</text>
    </svg>`
  },
  {
    id: 'neuro-selegiline',
    name: 'Selegiline (MAO-B Inhibitor)',
    domain: 'medicine',
    category: 'neuro-parkinsonian',
    tags: ['selegiline', 'eldepryl', 'MAO-B', 'neuroprotective', 'Parkinson'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="6" fill="#795548" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="6"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">SEL</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Selegiline</text>
    </svg>`
  },
  {
    id: 'neuro-amantadine',
    name: 'Amantadine',
    domain: 'medicine',
    category: 'neuro-parkinsonian',
    tags: ['amantadine', 'symmetrel', 'dyskinesia', 'NMDA', 'Parkinson'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l18 12v16l-18 12-18-12V24z" fill="#607D8B" opacity="0.3"/>
      <path d="M32 12l18 12v16l-18 12-18-12V24z"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">AMA</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Amantadine</text>
    </svg>`
  },

  // ===========================================================================
  // MUSCLE RELAXANTS
  // ===========================================================================
  {
    id: 'neuro-muscle-relaxant-mechanism',
    name: 'Muscle Relaxant Mechanism',
    domain: 'medicine',
    category: 'neuro-muscle-relaxants',
    tags: ['muscle relaxant', 'spasm', 'CNS', 'mechanism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 24c4-8 8 0 16 0s12 8 16 0" stroke-width="3"/>
      <path d="M16 40c4-8 8 0 16 0s12 8 16 0" stroke-width="3"/>
      <path d="M24 32l16 0" stroke="#F44336" stroke-width="2"/>
      <text x="10" y="56" font-size="4" fill="currentColor" stroke="none">Muscle Relaxation</text>
    </svg>`
  },
  {
    id: 'neuro-cyclobenzaprine',
    name: 'Cyclobenzaprine (Flexeril)',
    domain: 'medicine',
    category: 'neuro-muscle-relaxants',
    tags: ['cyclobenzaprine', 'flexeril', 'muscle relaxant', 'spasm', 'sedating'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#4CAF50" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">CYC</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Flexeril</text>
    </svg>`
  },
  {
    id: 'neuro-baclofen',
    name: 'Baclofen',
    domain: 'medicine',
    category: 'neuro-muscle-relaxants',
    tags: ['baclofen', 'lioresal', 'GABA-B', 'spasticity', 'intrathecal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="4" fill="#2196F3" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="4"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">BAC</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Baclofen</text>
    </svg>`
  },
  {
    id: 'neuro-tizanidine',
    name: 'Tizanidine (Zanaflex)',
    domain: 'medicine',
    category: 'neuro-muscle-relaxants',
    tags: ['tizanidine', 'zanaflex', 'alpha-2 agonist', 'spasticity', 'sedating'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#9C27B0" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <text x="22" y="36" font-size="5" fill="currentColor" stroke="none">TIZ</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Zanaflex</text>
    </svg>`
  },
  {
    id: 'neuro-methocarbamol',
    name: 'Methocarbamol (Robaxin)',
    domain: 'medicine',
    category: 'neuro-muscle-relaxants',
    tags: ['methocarbamol', 'robaxin', 'muscle relaxant', 'acute spasm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l18 12v16l-18 12-18-12V24z" fill="#FF9800" opacity="0.3"/>
      <path d="M32 12l18 12v16l-18 12-18-12V24z"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">MET</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Robaxin</text>
    </svg>`
  },

  // ===========================================================================
  // MIGRAINE MEDICATIONS
  // ===========================================================================
  {
    id: 'neuro-triptan',
    name: 'Sumatriptan (Imitrex)',
    domain: 'medicine',
    category: 'neuro-migraine',
    tags: ['sumatriptan', 'imitrex', 'triptan', 'migraine', '5-HT1B/1D'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#F44336" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <path d="M24 24l16 16"/>
      <path d="M40 24l-16 16"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Sumatriptan</text>
    </svg>`
  },
  {
    id: 'neuro-cgrp-inhibitor',
    name: 'CGRP Inhibitor (Aimovig)',
    domain: 'medicine',
    category: 'neuro-migraine',
    tags: ['erenumab', 'aimovig', 'CGRP', 'migraine prevention', 'monthly'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="6" fill="#E91E63" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="6"/>
      <text x="16" y="38" font-size="4" fill="currentColor" stroke="none">CGRP</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Aimovig</text>
    </svg>`
  },

  // ===========================================================================
  // ALZHEIMER'S DRUGS
  // ===========================================================================
  {
    id: 'neuro-donepezil',
    name: 'Donepezil (Aricept)',
    domain: 'medicine',
    category: 'neuro-dementia',
    tags: ['donepezil', 'aricept', 'cholinesterase inhibitor', 'Alzheimer', 'dementia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#3F51B5" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">DON</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Aricept</text>
    </svg>`
  },
  {
    id: 'neuro-memantine',
    name: 'Memantine (Namenda)',
    domain: 'medicine',
    category: 'neuro-dementia',
    tags: ['memantine', 'namenda', 'NMDA', 'Alzheimer', 'moderate-severe'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#00BCD4" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <text x="18" y="36" font-size="5" fill="currentColor" stroke="none">MEM</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Namenda</text>
    </svg>`
  },
];

export default neuroDrugsIcons;
