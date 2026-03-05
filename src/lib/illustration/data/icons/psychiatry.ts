/**
 * Psychiatry Icon Library
 * Comprehensive SVG icons for psychiatry and mental health
 *
 * COMPLETE CHECKPOINT: 98 icons (target: 90+)
 *
 * Categories:
 * - Brain/Neurotransmitters (10): prefrontal cortex, limbic system, serotonin, dopamine, norepinephrine, GABA, glutamate, synapse, receptor, brain overview
 * - Mood Disorders (10): flat affect, crying, elevated mood, bipolar cycle, rapid cycling, seasonal, suicidal warning, hopelessness, anhedonia, mood spectrum
 * - Anxiety Disorders (8): anxiety cloud, panic attack, phobia, OCD intrusive, OCD compulsion, PTSD, hypervigilance, avoidance
 * - Psychotic Disorders (8): auditory/visual hallucinations, delusion, disorganized thought, negative symptoms, catatonia, paranoia, reality testing
 * - Substance Use (8): addiction cycle, withdrawal, tolerance, intoxication, alcohol, opioids, stimulants, cannabis
 * - Therapy/Treatment (18): psychotherapy, CBT, DBT, antidepressant, antipsychotic, mood stabilizer, ECT, TMS, medication, therapeutic alliance, group therapy, family therapy, EMDR, mindfulness, exposure therapy, motivational interviewing, benzodiazepine, stimulant med, ketamine
 * - Assessment (8): MSE appearance, MSE behavior, PHQ-9, GAD-7, MMSE, safety assessment, risk factors, interview
 * - Neurodevelopmental (5): ADHD brain, attention deficit, hyperactivity, autism spectrum, executive function
 * - Crisis & Emergency (4): crisis intervention, psych hold, de-escalation, restraint
 * - Child & Adolescent (4): child development, play therapy, school refusal, separation anxiety
 * - Cognitive & Dementia (3): cognitive decline, delirium, memory loss
 * - Forensic & Legal (3): competency evaluation, insanity defense, malingering
 * - Other (9): sleep disorders, eating disorders, personality clusters, dissociation, somatization, psychomotor agitation, psychomotor retardation, anosognosia
 */

import type { IconDefinition } from './index';

export const psychiatryIcons: IconDefinition[] = [
  // ===========================================================================
  // BRAIN/NEUROTRANSMITTERS
  // ===========================================================================
  {
    id: 'psych-brain-prefrontal',
    name: 'Prefrontal Cortex',
    domain: 'medicine',
    category: 'neuroscience',
    tags: ['prefrontal', 'cortex', 'PFC', 'executive function', 'frontal lobe', 'brain'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-16 0-24 12-24 24s8 24 24 24 24-12 24-24-8-24-24-24z" fill="currentColor" opacity="0.1"/>
      <path d="M12 28c4-8 12-14 20-14s16 6 20 14"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <path d="M16 20c8-4 16-4 24 0" fill="currentColor" opacity="0.4"/>
      <path d="M12 24c6-6 14-10 20-10s14 4 20 10"/>
      <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="40" cy="24" r="3" fill="currentColor" opacity="0.5"/>
      <text x="18" y="58" font-size="5" fill="currentColor" stroke="none">Prefrontal</text>
    </svg>`
  },
  {
    id: 'psych-brain-limbic',
    name: 'Limbic System',
    domain: 'medicine',
    category: 'neuroscience',
    tags: ['limbic', 'amygdala', 'hippocampus', 'emotion', 'memory', 'brain'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <ellipse cx="24" cy="32" rx="6" ry="8" fill="#FF6B6B" opacity="0.5"/>
      <ellipse cx="40" cy="32" rx="6" ry="8" fill="#4ECDC4" opacity="0.5"/>
      <path d="M18 32c-4 0-8 4-8 8"/>
      <path d="M46 32c4 0 8 4 8 8"/>
      <circle cx="24" cy="28" r="2" fill="currentColor"/>
      <circle cx="40" cy="28" r="2" fill="currentColor"/>
      <text x="16" y="44" font-size="4" fill="currentColor" stroke="none">Amyg</text>
      <text x="34" y="44" font-size="4" fill="currentColor" stroke="none">Hipp</text>
    </svg>`
  },
  {
    id: 'psych-serotonin',
    name: 'Serotonin',
    domain: 'medicine',
    category: 'neuroscience',
    tags: ['serotonin', '5-HT', 'neurotransmitter', 'mood', 'SSRI', 'depression'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="10" fill="#FFD93D" opacity="0.3"/>
      <circle cx="32" cy="32" r="10"/>
      <path d="M32 22v-10"/>
      <path d="M32 42v10"/>
      <path d="M22 32h-10"/>
      <path d="M42 32h10"/>
      <path d="M24 24l-6-6"/>
      <path d="M40 24l6-6"/>
      <path d="M24 40l-6 6"/>
      <path d="M40 40l6 6"/>
      <text x="20" y="36" font-size="6" fill="currentColor" stroke="none">5-HT</text>
    </svg>`
  },
  {
    id: 'psych-dopamine',
    name: 'Dopamine',
    domain: 'medicine',
    category: 'neuroscience',
    tags: ['dopamine', 'DA', 'neurotransmitter', 'reward', 'motivation', 'pleasure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="10" fill="#4ECDC4" opacity="0.3"/>
      <circle cx="32" cy="32" r="10"/>
      <path d="M32 22v-10"/>
      <path d="M42 32h10"/>
      <path d="M40 24l6-6"/>
      <path d="M40 40l6 6"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.4"/>
      <path d="M16 20l8 8"/>
      <path d="M16 44l8-8"/>
      <text x="22" y="36" font-size="6" fill="currentColor" stroke="none">DA</text>
    </svg>`
  },
  {
    id: 'psych-norepinephrine',
    name: 'Norepinephrine',
    domain: 'medicine',
    category: 'neuroscience',
    tags: ['norepinephrine', 'NE', 'noradrenaline', 'neurotransmitter', 'alertness', 'stress'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="10" fill="#FF6B6B" opacity="0.3"/>
      <circle cx="32" cy="32" r="10"/>
      <path d="M32 22v-12"/>
      <path d="M32 42v12"/>
      <path d="M22 32h-12"/>
      <path d="M42 32h12"/>
      <polygon points="32,8 28,16 36,16" fill="currentColor"/>
      <text x="24" y="36" font-size="6" fill="currentColor" stroke="none">NE</text>
    </svg>`
  },
  {
    id: 'psych-gaba',
    name: 'GABA',
    domain: 'medicine',
    category: 'neuroscience',
    tags: ['GABA', 'gamma-aminobutyric', 'inhibitory', 'neurotransmitter', 'anxiety', 'benzodiazepine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="10" fill="#9B59B6" opacity="0.3"/>
      <circle cx="32" cy="32" r="10"/>
      <path d="M24 32h-12" stroke-dasharray="3 2"/>
      <path d="M40 32h12" stroke-dasharray="3 2"/>
      <path d="M32 24v-12" stroke-dasharray="3 2"/>
      <path d="M32 40v12" stroke-dasharray="3 2"/>
      <circle cx="32" cy="32" r="5" fill="currentColor" opacity="0.2"/>
      <text x="18" y="36" font-size="6" fill="currentColor" stroke="none">GABA</text>
      <path d="M28 44l8 0"/>
    </svg>`
  },
  {
    id: 'psych-glutamate',
    name: 'Glutamate',
    domain: 'medicine',
    category: 'neuroscience',
    tags: ['glutamate', 'Glu', 'excitatory', 'neurotransmitter', 'NMDA', 'learning'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="10" fill="#E74C3C" opacity="0.3"/>
      <circle cx="32" cy="32" r="10"/>
      <path d="M22 32h-10"/>
      <path d="M42 32h10"/>
      <path d="M32 22v-10"/>
      <path d="M32 42v10"/>
      <polygon points="52,32 44,28 44,36" fill="currentColor"/>
      <polygon points="12,32 20,28 20,36" fill="currentColor"/>
      <text x="22" y="36" font-size="6" fill="currentColor" stroke="none">Glu</text>
    </svg>`
  },
  {
    id: 'psych-synapse',
    name: 'Synapse',
    domain: 'medicine',
    category: 'neuroscience',
    tags: ['synapse', 'synaptic cleft', 'neurotransmission', 'vesicle', 'receptor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h16" stroke-width="3"/>
      <path d="M40 32h16" stroke-width="3"/>
      <rect x="24" y="24" width="16" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <circle cx="28" cy="28" r="2" fill="#FFD93D"/>
      <circle cx="32" cy="26" r="2" fill="#4ECDC4"/>
      <circle cx="36" cy="28" r="2" fill="#FF6B6B"/>
      <circle cx="30" cy="32" r="1.5" fill="#FFD93D"/>
      <circle cx="34" cy="34" r="1.5" fill="#4ECDC4"/>
      <path d="M40 28c2-2 4-2 6 0"/>
      <path d="M40 32c2-2 4-2 6 0"/>
      <path d="M40 36c2-2 4-2 6 0"/>
      <text x="14" y="50" font-size="4" fill="currentColor" stroke="none">Pre</text>
      <text x="42" y="50" font-size="4" fill="currentColor" stroke="none">Post</text>
    </svg>`
  },
  {
    id: 'psych-receptor',
    name: 'Receptor',
    domain: 'medicine',
    category: 'neuroscience',
    tags: ['receptor', 'binding site', 'ligand', 'signal transduction', 'membrane'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="28" width="24" height="28" rx="4" fill="currentColor" opacity="0.2"/>
      <path d="M28 28v-12c0-4 8-4 8 0v12"/>
      <path d="M32 8c-4 0-4 4-4 8"/>
      <path d="M32 8c4 0 4 4 4 8"/>
      <circle cx="32" cy="10" r="4" fill="#FFD93D" opacity="0.8"/>
      <path d="M24 36h16"/>
      <path d="M24 44h16"/>
      <circle cx="32" cy="40" r="4" fill="currentColor" opacity="0.3"/>
      <text x="18" y="60" font-size="4" fill="currentColor" stroke="none">Receptor</text>
    </svg>`
  },
  {
    id: 'psych-brain-full',
    name: 'Brain Overview',
    domain: 'medicine',
    category: 'neuroscience',
    tags: ['brain', 'cerebrum', 'cortex', 'overview', 'anatomy', 'neurology'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-18 0-26 14-26 26s10 22 26 22 26-10 26-22-8-26-26-26z" fill="currentColor" opacity="0.1"/>
      <path d="M32 8c-18 0-26 14-26 26s10 22 26 22 26-10 26-22-8-26-26-26z"/>
      <path d="M16 24c8-4 24-4 32 0"/>
      <path d="M12 32c10-2 30-2 40 0"/>
      <path d="M16 40c8 4 24 4 32 0"/>
      <path d="M32 12v44"/>
      <ellipse cx="32" cy="50" rx="4" ry="3" fill="currentColor" opacity="0.3"/>
    </svg>`
  },

  // ===========================================================================
  // MOOD DISORDERS
  // ===========================================================================
  {
    id: 'psych-depression-flat',
    name: 'Flat Affect',
    domain: 'medicine',
    category: 'mood-disorders',
    tags: ['depression', 'flat affect', 'anhedonia', 'mood', 'blunted', 'MDD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="24"/>
      <circle cx="22" cy="26" r="3"/>
      <circle cx="42" cy="26" r="3"/>
      <line x1="20" y1="42" x2="44" y2="42"/>
      <path d="M16 18c0-2 4-4 8-4"/>
      <path d="M48 18c0-2-4-4-8-4"/>
      <circle cx="22" cy="26" r="1" fill="currentColor"/>
      <circle cx="42" cy="26" r="1" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'psych-depression-crying',
    name: 'Depressed Crying',
    domain: 'medicine',
    category: 'mood-disorders',
    tags: ['depression', 'crying', 'tearful', 'sadness', 'grief', 'mood'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="24"/>
      <path d="M18 26c2-2 6-2 8 0"/>
      <path d="M38 26c2-2 6-2 8 0"/>
      <path d="M24 44c4 4 12 4 16 0"/>
      <path d="M26 30v8" stroke="#4ECDC4" stroke-width="2"/>
      <path d="M38 30v8" stroke="#4ECDC4" stroke-width="2"/>
      <circle cx="26" cy="40" r="2" fill="#4ECDC4"/>
      <circle cx="38" cy="40" r="2" fill="#4ECDC4"/>
    </svg>`
  },
  {
    id: 'psych-mania-elevated',
    name: 'Elevated Mood',
    domain: 'medicine',
    category: 'mood-disorders',
    tags: ['mania', 'elevated', 'euphoria', 'bipolar', 'grandiosity', 'mood'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="#FFD93D" opacity="0.2"/>
      <circle cx="32" cy="32" r="24"/>
      <circle cx="22" cy="24" r="4"/>
      <circle cx="42" cy="24" r="4"/>
      <circle cx="22" cy="24" r="2" fill="currentColor"/>
      <circle cx="42" cy="24" r="2" fill="currentColor"/>
      <path d="M20 40c6 8 18 8 24 0"/>
      <path d="M32 8v-4"/>
      <path d="M18 12l-2-4"/>
      <path d="M46 12l2-4"/>
      <path d="M10 24l-4-2"/>
      <path d="M54 24l4-2"/>
    </svg>`
  },
  {
    id: 'psych-bipolar-cycle',
    name: 'Bipolar Cycle',
    domain: 'medicine',
    category: 'mood-disorders',
    tags: ['bipolar', 'cycle', 'mania', 'depression', 'mood swing', 'oscillation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h48" stroke-dasharray="2 2"/>
      <path d="M8 32c8-24 16-24 24 0s16 24 24 0" stroke-width="2"/>
      <circle cx="20" cy="12" r="4" fill="#FFD93D" opacity="0.5"/>
      <circle cx="44" cy="52" r="4" fill="#4169E1" opacity="0.5"/>
      <text x="16" y="10" font-size="4" fill="currentColor" stroke="none">Mania</text>
      <text x="36" y="60" font-size="4" fill="currentColor" stroke="none">Depression</text>
      <path d="M4 32l4-2v4z" fill="currentColor"/>
      <path d="M60 32l-4-2v4z" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'psych-bipolar-rapid',
    name: 'Rapid Cycling',
    domain: 'medicine',
    category: 'mood-disorders',
    tags: ['bipolar', 'rapid cycling', 'mood', 'instability', 'frequent episodes'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h48" stroke-dasharray="2 2"/>
      <path d="M8 32c4-16 8-16 12 0s8 16 12 0 8-16 12 0 8 16 12 0" stroke-width="2"/>
      <circle cx="14" cy="16" r="2" fill="#FFD93D"/>
      <circle cx="26" cy="48" r="2" fill="#4169E1"/>
      <circle cx="38" cy="16" r="2" fill="#FFD93D"/>
      <circle cx="50" cy="48" r="2" fill="#4169E1"/>
      <text x="22" y="60" font-size="4" fill="currentColor" stroke="none">Rapid</text>
    </svg>`
  },
  {
    id: 'psych-seasonal',
    name: 'Seasonal Pattern',
    domain: 'medicine',
    category: 'mood-disorders',
    tags: ['SAD', 'seasonal', 'winter', 'depression', 'light therapy', 'circadian'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="20" r="8" fill="#FFD93D" opacity="0.5"/>
      <circle cx="16" cy="20" r="8"/>
      <path d="M16 8v-4"/>
      <path d="M16 32v4"/>
      <path d="M4 20h-4"/>
      <path d="M28 20h4"/>
      <circle cx="48" cy="44" r="8" fill="#4169E1" opacity="0.3"/>
      <path d="M40 44h16"/>
      <path d="M42 38h12"/>
      <path d="M44 50h8"/>
      <path d="M28 32l8 8"/>
      <path d="M36 32l-8 8"/>
      <text x="6" y="58" font-size="4" fill="currentColor" stroke="none">Summer</text>
      <text x="40" y="58" font-size="4" fill="currentColor" stroke="none">Winter</text>
    </svg>`
  },
  {
    id: 'psych-suicidal-warning',
    name: 'Suicidal Ideation Warning',
    domain: 'medicine',
    category: 'mood-disorders',
    tags: ['suicide', 'warning', 'risk', 'safety', 'ideation', 'crisis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,4 4,56 60,56" fill="#FF6B6B" opacity="0.2"/>
      <polygon points="32,4 4,56 60,56"/>
      <line x1="32" y1="20" x2="32" y2="36" stroke-width="3"/>
      <circle cx="32" cy="46" r="3" fill="currentColor"/>
      <text x="14" y="62" font-size="4" fill="currentColor" stroke="none">WARNING</text>
    </svg>`
  },
  {
    id: 'psych-hopelessness',
    name: 'Hopelessness',
    domain: 'medicine',
    category: 'mood-disorders',
    tags: ['hopelessness', 'despair', 'depression', 'negative cognition', 'pessimism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.1"/>
      <path d="M16 48c8-8 24-8 32 0"/>
      <path d="M20 20l8 8"/>
      <path d="M28 20l-8 8"/>
      <path d="M36 20l8 8"/>
      <path d="M44 20l-8 8"/>
      <path d="M32 40v8"/>
      <path d="M24 44h16"/>
      <text x="12" y="60" font-size="4" fill="currentColor" stroke="none">Hopelessness</text>
    </svg>`
  },
  {
    id: 'psych-anhedonia',
    name: 'Anhedonia',
    domain: 'medicine',
    category: 'mood-disorders',
    tags: ['anhedonia', 'pleasure', 'interest', 'depression', 'reward', 'motivation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12c-12 0-20 8-20 16 0 10 20 20 20 20s20-10 20-20c0-8-8-16-20-16z" fill="currentColor" opacity="0.1"/>
      <path d="M32 12c-12 0-20 8-20 16 0 10 20 20 20 20s20-10 20-20c0-8-8-16-20-16z" stroke-dasharray="4 4"/>
      <line x1="16" y1="16" x2="48" y2="48"/>
      <line x1="48" y1="16" x2="16" y2="48"/>
      <text x="12" y="60" font-size="4" fill="currentColor" stroke="none">No pleasure</text>
    </svg>`
  },
  {
    id: 'psych-mood-spectrum',
    name: 'Mood Spectrum',
    domain: 'medicine',
    category: 'mood-disorders',
    tags: ['mood', 'spectrum', 'range', 'depression', 'mania', 'euthymia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="16" rx="8" fill="none"/>
      <rect x="8" y="24" width="16" height="16" rx="4" fill="#4169E1" opacity="0.5"/>
      <rect x="24" y="24" width="16" height="16" fill="#90EE90" opacity="0.5"/>
      <rect x="40" y="24" width="16" height="16" rx="4" fill="#FFD93D" opacity="0.5"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.5"/>
      <text x="8" y="48" font-size="4" fill="currentColor" stroke="none">Depressed</text>
      <text x="24" y="48" font-size="4" fill="currentColor" stroke="none">Normal</text>
      <text x="44" y="48" font-size="4" fill="currentColor" stroke="none">Manic</text>
    </svg>`
  },

  // ===========================================================================
  // ANXIETY DISORDERS
  // ===========================================================================
  {
    id: 'psych-anxiety-cloud',
    name: 'Anxiety Worry Cloud',
    domain: 'medicine',
    category: 'anxiety-disorders',
    tags: ['anxiety', 'worry', 'GAD', 'apprehension', 'nervousness', 'tension'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M48 40c6 0 10-4 10-10s-4-10-10-10c0-8-8-14-16-14s-16 6-16 14c-6 0-10 4-10 10s4 10 10 10z" fill="currentColor" opacity="0.2"/>
      <path d="M48 40c6 0 10-4 10-10s-4-10-10-10c0-8-8-14-16-14s-16 6-16 14c-6 0-10 4-10 10s4 10 10 10z"/>
      <path d="M24 48v8"/>
      <path d="M32 48v12"/>
      <path d="M40 48v8"/>
      <text x="24" y="32" font-size="6" fill="currentColor" stroke="none">???</text>
    </svg>`
  },
  {
    id: 'psych-panic-attack',
    name: 'Panic Attack',
    domain: 'medicine',
    category: 'anxiety-disorders',
    tags: ['panic', 'attack', 'fear', 'palpitations', 'shortness of breath', 'anxiety'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#FF6B6B" opacity="0.2"/>
      <circle cx="32" cy="32" r="20"/>
      <path d="M32 22c-8 0-12 6-12 12 0 8 12 14 12 14s12-6 12-14c0-6-4-12-12-12z" fill="#FF6B6B" opacity="0.5"/>
      <path d="M28 32l4-4 4 4 4-4"/>
      <circle cx="24" cy="28" r="2"/>
      <circle cx="40" cy="28" r="2"/>
      <path d="M26 40c2 2 8 2 12 0"/>
      <path d="M8 16l4 4"/>
      <path d="M56 16l-4 4"/>
      <path d="M8 48l4-4"/>
      <path d="M56 48l-4-4"/>
    </svg>`
  },
  {
    id: 'psych-phobia',
    name: 'Phobia',
    domain: 'medicine',
    category: 'anxiety-disorders',
    tags: ['phobia', 'fear', 'avoidance', 'specific phobia', 'social', 'anxiety'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="36" r="20"/>
      <circle cx="26" cy="32" r="3"/>
      <circle cx="38" cy="32" r="3"/>
      <circle cx="26" cy="32" r="1" fill="currentColor"/>
      <circle cx="38" cy="32" r="1" fill="currentColor"/>
      <ellipse cx="32" cy="44" rx="6" ry="4"/>
      <path d="M20 24l-4-8"/>
      <path d="M44 24l4-8"/>
      <polygon points="32,4 28,14 36,14" fill="#FF6B6B" opacity="0.5"/>
      <path d="M32 4l-4 10h8z"/>
      <text x="28" y="8" font-size="4" fill="currentColor" stroke="none">!</text>
    </svg>`
  },
  {
    id: 'psych-ocd-intrusive',
    name: 'OCD Intrusive Thoughts',
    domain: 'medicine',
    category: 'anxiety-disorders',
    tags: ['OCD', 'intrusive', 'thoughts', 'obsession', 'rumination', 'anxiety'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="36" r="18" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="36" r="18"/>
      <path d="M24 32c0-4 4-8 8-8s8 4 8 8"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M16 12l8 8"/>
      <path d="M24 12l-8 8"/>
      <path d="M40 12l8 8"/>
      <path d="M48 12l-8 8"/>
      <path d="M28 16h8"/>
      <path d="M32 12v8"/>
      <circle cx="26" cy="40" r="2"/>
      <circle cx="38" cy="40" r="2"/>
    </svg>`
  },
  {
    id: 'psych-ocd-compulsion',
    name: 'OCD Compulsions',
    domain: 'medicine',
    category: 'anxiety-disorders',
    tags: ['OCD', 'compulsion', 'ritual', 'repetitive', 'behavior', 'anxiety'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22"/>
      <path d="M32 10v12"/>
      <path d="M32 22l8 10"/>
      <path d="M20 42a12 12 0 0 0 24 0"/>
      <circle cx="20" cy="32" r="4"/>
      <circle cx="44" cy="32" r="4"/>
      <path d="M8 32c0-4 4-4 8-4"/>
      <path d="M48 32c4 0 8 0 8 4"/>
      <path d="M28 52l4 4 8-8"/>
      <text x="4" y="60" font-size="4" fill="currentColor" stroke="none">Repeat</text>
    </svg>`
  },
  {
    id: 'psych-ptsd',
    name: 'PTSD Trauma',
    domain: 'medicine',
    category: 'anxiety-disorders',
    tags: ['PTSD', 'trauma', 'flashback', 'stress', 'hypervigilance', 'avoidance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.1"/>
      <path d="M20 20l24 24"/>
      <path d="M44 20l-24 24"/>
      <circle cx="32" cy="32" r="10" stroke-dasharray="4 2"/>
      <path d="M32 22v4"/>
      <path d="M32 38v4"/>
      <path d="M22 32h4"/>
      <path d="M38 32h4"/>
      <path d="M8 8l8 8"/>
      <path d="M48 8l8 8"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Trauma</text>
    </svg>`
  },
  {
    id: 'psych-hypervigilance',
    name: 'Hypervigilance',
    domain: 'medicine',
    category: 'anxiety-disorders',
    tags: ['hypervigilance', 'alertness', 'PTSD', 'startle', 'scanning', 'anxiety'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="36" r="18"/>
      <circle cx="26" cy="32" r="5" fill="currentColor" opacity="0.2"/>
      <circle cx="38" cy="32" r="5" fill="currentColor" opacity="0.2"/>
      <circle cx="26" cy="32" r="3"/>
      <circle cx="38" cy="32" r="3"/>
      <circle cx="26" cy="32" r="1" fill="currentColor"/>
      <circle cx="38" cy="32" r="1" fill="currentColor"/>
      <path d="M20 24l-4-8"/>
      <path d="M44 24l4-8"/>
      <path d="M28 44c2 2 8 2 8 0"/>
      <path d="M8 20l4-4"/>
      <path d="M56 20l-4-4"/>
      <path d="M8 52l4 4"/>
      <path d="M56 52l-4 4"/>
    </svg>`
  },
  {
    id: 'psych-avoidance',
    name: 'Avoidance',
    domain: 'medicine',
    category: 'anxiety-disorders',
    tags: ['avoidance', 'escape', 'anxiety', 'fear', 'phobia', 'safety behavior'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="16" fill="#FF6B6B" opacity="0.2"/>
      <circle cx="24" cy="32" r="16"/>
      <line x1="12" y1="20" x2="36" y2="44" stroke-width="2"/>
      <line x1="36" y1="20" x2="12" y2="44" stroke-width="2"/>
      <path d="M44 28c4 0 8 4 8 8"/>
      <path d="M48 28l8-4"/>
      <path d="M48 28l4 8"/>
      <circle cx="52" cy="40" r="2" fill="currentColor"/>
      <text x="42" y="56" font-size="4" fill="currentColor" stroke="none">Escape</text>
    </svg>`
  },

  // ===========================================================================
  // PSYCHOTIC DISORDERS
  // ===========================================================================
  {
    id: 'psych-hallucination-auditory',
    name: 'Auditory Hallucination',
    domain: 'medicine',
    category: 'psychosis',
    tags: ['hallucination', 'auditory', 'voices', 'psychosis', 'schizophrenia', 'perception'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="36" r="16"/>
      <circle cx="26" cy="32" r="2"/>
      <circle cx="38" cy="32" r="2"/>
      <path d="M28 42c2 2 6 2 8 0"/>
      <path d="M8 20c-4 4-4 12 0 16"/>
      <path d="M12 24c-2 2-2 8 0 8"/>
      <path d="M56 20c4 4 4 12 0 16"/>
      <path d="M52 24c2 2 2 8 0 8"/>
      <text x="4" y="12" font-size="4" fill="currentColor" stroke="none">voices</text>
      <text x="44" y="12" font-size="4" fill="currentColor" stroke="none">voices</text>
      <path d="M8 16l4 4"/>
      <path d="M52 16l4-4"/>
    </svg>`
  },
  {
    id: 'psych-hallucination-visual',
    name: 'Visual Hallucination',
    domain: 'medicine',
    category: 'psychosis',
    tags: ['hallucination', 'visual', 'perception', 'psychosis', 'illusion', 'seeing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="16"/>
      <circle cx="32" cy="32" r="10"/>
      <circle cx="32" cy="32" r="5" fill="currentColor" opacity="0.5"/>
      <path d="M16 20c-4-4-8-4-12 0" stroke-dasharray="2 2"/>
      <path d="M48 20c4-4 8-4 12 0" stroke-dasharray="2 2"/>
      <path d="M16 44c-4 4-8 4-12 0" stroke-dasharray="2 2"/>
      <path d="M48 44c4 4 8 4 12 0" stroke-dasharray="2 2"/>
      <circle cx="12" cy="20" r="2" fill="#9B59B6" opacity="0.5"/>
      <circle cx="52" cy="44" r="2" fill="#9B59B6" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'psych-delusion',
    name: 'Delusion',
    domain: 'medicine',
    category: 'psychosis',
    tags: ['delusion', 'paranoid', 'belief', 'psychosis', 'fixed', 'false belief'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="22"/>
      <path d="M24 26c0-6 8-10 16-4"/>
      <path d="M40 26l4-8"/>
      <circle cx="44" cy="16" r="4"/>
      <circle cx="26" cy="36" r="3"/>
      <circle cx="38" cy="36" r="3"/>
      <path d="M30 46c2 0 4 0 4-2"/>
      <path d="M16 16l-4-4"/>
      <path d="M52 52l4 4"/>
      <text x="12" y="60" font-size="4" fill="currentColor" stroke="none">False belief</text>
    </svg>`
  },
  {
    id: 'psych-disorganized-thought',
    name: 'Disorganized Thought',
    domain: 'medicine',
    category: 'psychosis',
    tags: ['disorganized', 'thought disorder', 'tangential', 'loose associations', 'psychosis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.1"/>
      <path d="M16 16c8 4 12 16 4 24"/>
      <path d="M48 16c-8 4-4 20 4 20"/>
      <path d="M20 28c4-8 16-8 24 4"/>
      <path d="M12 40c8 4 24-8 32 4"/>
      <circle cx="16" cy="16" r="3"/>
      <circle cx="48" cy="16" r="3"/>
      <circle cx="20" cy="40" r="3"/>
      <circle cx="52" cy="44" r="3"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Jumbled</text>
    </svg>`
  },
  {
    id: 'psych-negative-symptoms',
    name: 'Negative Symptoms',
    domain: 'medicine',
    category: 'psychosis',
    tags: ['negative symptoms', 'avolition', 'alogia', 'flat affect', 'schizophrenia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22" fill="currentColor" opacity="0.05"/>
      <circle cx="32" cy="32" r="22" stroke-dasharray="4 4"/>
      <circle cx="26" cy="28" r="2"/>
      <circle cx="38" cy="28" r="2"/>
      <line x1="24" y1="40" x2="40" y2="40"/>
      <path d="M20 20l-8-4"/>
      <path d="M44 20l8-4"/>
      <path d="M32 48v8" stroke-dasharray="2 2"/>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">Withdrawal</text>
    </svg>`
  },
  {
    id: 'psych-catatonia',
    name: 'Catatonia',
    domain: 'medicine',
    category: 'psychosis',
    tags: ['catatonia', 'immobility', 'mutism', 'posturing', 'waxy flexibility'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="8"/>
      <line x1="32" y1="24" x2="32" y2="44"/>
      <line x1="32" y1="44" x2="24" y2="60"/>
      <line x1="32" y1="44" x2="40" y2="60"/>
      <line x1="32" y1="28" x2="20" y2="36"/>
      <line x1="32" y1="28" x2="44" y2="36"/>
      <circle cx="32" cy="16" r="4" stroke-dasharray="2 2"/>
      <path d="M12 28c0-4 4-4 8 0"/>
      <path d="M44 28c4-4 8 0 8 0"/>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">Immobile</text>
    </svg>`
  },
  {
    id: 'psych-paranoia',
    name: 'Paranoia',
    domain: 'medicine',
    category: 'psychosis',
    tags: ['paranoia', 'suspicion', 'persecution', 'mistrust', 'delusion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="36" r="16"/>
      <path d="M24 32c0-4 8-4 8 0"/>
      <path d="M32 32c0-4 8-4 8 0"/>
      <circle cx="28" cy="32" r="1" fill="currentColor"/>
      <circle cx="36" cy="32" r="1" fill="currentColor"/>
      <path d="M26 42c2 2 10 2 12 0"/>
      <ellipse cx="12" cy="24" rx="4" ry="6" fill="currentColor" opacity="0.3"/>
      <ellipse cx="52" cy="24" rx="4" ry="6" fill="currentColor" opacity="0.3"/>
      <ellipse cx="12" cy="48" rx="4" ry="6" fill="currentColor" opacity="0.3"/>
      <ellipse cx="52" cy="48" rx="4" ry="6" fill="currentColor" opacity="0.3"/>
      <text x="18" y="60" font-size="4" fill="currentColor" stroke="none">Watching</text>
    </svg>`
  },
  {
    id: 'psych-reality-testing',
    name: 'Reality Testing',
    domain: 'medicine',
    category: 'psychosis',
    tags: ['reality testing', 'insight', 'psychosis', 'perception', 'judgment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="20" height="32" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="36" y="16" width="20" height="32" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="16" width="20" height="32" rx="2"/>
      <rect x="36" y="16" width="20" height="32" rx="2"/>
      <circle cx="18" cy="32" r="6"/>
      <path d="M42 26l8 6-8 6"/>
      <path d="M48 26l-8 6 8 6" fill="currentColor" opacity="0.3"/>
      <text x="10" y="54" font-size="4" fill="currentColor" stroke="none">Real</text>
      <text x="38" y="54" font-size="4" fill="currentColor" stroke="none">Unreal</text>
      <path d="M28 32h8"/>
    </svg>`
  },

  // ===========================================================================
  // SUBSTANCE USE
  // ===========================================================================
  {
    id: 'psych-addiction-cycle',
    name: 'Addiction Cycle',
    domain: 'medicine',
    category: 'substance-use',
    tags: ['addiction', 'cycle', 'craving', 'use', 'withdrawal', 'relapse'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22" stroke-dasharray="4 2"/>
      <path d="M32 10l4 8-8 0z" fill="currentColor"/>
      <path d="M54 32l-8 4 0-8z" fill="currentColor"/>
      <path d="M32 54l-4-8 8 0z" fill="currentColor"/>
      <path d="M10 32l8-4 0 8z" fill="currentColor"/>
      <text x="26" y="10" font-size="4" fill="currentColor" stroke="none">Use</text>
      <text x="50" y="36" font-size="4" fill="currentColor" stroke="none">High</text>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">Withdrawal</text>
      <text x="2" y="36" font-size="4" fill="currentColor" stroke="none">Crave</text>
    </svg>`
  },
  {
    id: 'psych-withdrawal',
    name: 'Withdrawal',
    domain: 'medicine',
    category: 'substance-use',
    tags: ['withdrawal', 'detox', 'symptoms', 'dependence', 'substance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M24 28c2-4 6-4 8 0"/>
      <path d="M32 28c2-4 6-4 8 0"/>
      <path d="M24 40c4 6 12 6 16 0"/>
      <path d="M16 36l-4 4"/>
      <path d="M48 36l4 4"/>
      <path d="M16 28l-8-4"/>
      <path d="M48 28l8-4"/>
      <path d="M32 52v6"/>
      <path d="M28 56l8 0"/>
      <text x="12" y="12" font-size="4" fill="currentColor" stroke="none">Tremor</text>
    </svg>`
  },
  {
    id: 'psych-tolerance',
    name: 'Tolerance',
    domain: 'medicine',
    category: 'substance-use',
    tags: ['tolerance', 'escalation', 'dose', 'need more', 'substance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56l12-12 12 0 12-24 12 0"/>
      <circle cx="20" cy="44" r="3"/>
      <circle cx="32" cy="44" r="5" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="20" r="7" fill="currentColor" opacity="0.3"/>
      <path d="M48 8l8 0 0 8"/>
      <path d="M56 8l-8 8"/>
      <text x="12" y="60" font-size="4" fill="currentColor" stroke="none">Need more</text>
    </svg>`
  },
  {
    id: 'psych-intoxication',
    name: 'Intoxication',
    domain: 'medicine',
    category: 'substance-use',
    tags: ['intoxication', 'impaired', 'acute', 'effects', 'substance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="36" r="18"/>
      <path d="M24 32c0-2 2-4 4-4"/>
      <path d="M36 32c0-2 2-4 4-4"/>
      <circle cx="26" cy="34" r="2"/>
      <circle cx="38" cy="34" r="2"/>
      <path d="M26 44c4 4 8 4 12 0"/>
      <path d="M20 20c-4-4-4-8 0-8"/>
      <path d="M44 20c4-4 4-8 0-8"/>
      <path d="M30 8c0-4 4-4 4 0"/>
      <text x="18" y="60" font-size="4" fill="currentColor" stroke="none">Impaired</text>
    </svg>`
  },
  {
    id: 'psych-alcohol',
    name: 'Alcohol',
    domain: 'medicine',
    category: 'substance-use',
    tags: ['alcohol', 'drinking', 'ethanol', 'substance', 'AUD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24l-4 20c0 8-4 12-8 12s-8-4-8-12z"/>
      <path d="M32 40v16"/>
      <path d="M24 56h16"/>
      <path d="M20 20h24"/>
      <ellipse cx="32" cy="28" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
      <circle cx="28" cy="24" r="1"/>
      <circle cx="36" cy="26" r="1"/>
      <circle cx="32" cy="22" r="1"/>
    </svg>`
  },
  {
    id: 'psych-opioids',
    name: 'Opioids',
    domain: 'medicine',
    category: 'substance-use',
    tags: ['opioids', 'heroin', 'morphine', 'fentanyl', 'substance', 'OUD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="20" rx="12" ry="8"/>
      <path d="M20 20v24c0 8 24 8 24 0v-24"/>
      <ellipse cx="32" cy="44" rx="12" ry="8"/>
      <path d="M32 12v-8"/>
      <path d="M28 6h8"/>
      <line x1="26" y1="32" x2="38" y2="32"/>
      <line x1="26" y1="36" x2="38" y2="36"/>
    </svg>`
  },
  {
    id: 'psych-stimulants',
    name: 'Stimulants',
    domain: 'medicine',
    category: 'substance-use',
    tags: ['stimulants', 'cocaine', 'amphetamine', 'methamphetamine', 'substance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,8 56,56 8,56" fill="currentColor" opacity="0.1"/>
      <polygon points="32,8 56,56 8,56"/>
      <path d="M32 20v16"/>
      <path d="M24 28l16 0"/>
      <circle cx="32" cy="46" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M16 8l4 8"/>
      <path d="M48 8l-4 8"/>
      <path d="M8 20l8 4"/>
      <path d="M56 20l-8 4"/>
    </svg>`
  },
  {
    id: 'psych-cannabis',
    name: 'Cannabis',
    domain: 'medicine',
    category: 'substance-use',
    tags: ['cannabis', 'marijuana', 'THC', 'CBD', 'substance', 'CUD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 56v-24"/>
      <path d="M32 32c-8-4-16-12-16-20 8 4 14 12 16 20" fill="currentColor" opacity="0.2"/>
      <path d="M32 32c8-4 16-12 16-20-8 4-14 12-16 20" fill="currentColor" opacity="0.2"/>
      <path d="M32 32c-8-4-16-12-16-20 8 4 14 12 16 20"/>
      <path d="M32 32c8-4 16-12 16-20-8 4-14 12-16 20"/>
      <path d="M32 24c-4-8-4-16 0-20 4 4 4 12 0 20" fill="currentColor" opacity="0.2"/>
      <path d="M32 24c-4-8-4-16 0-20 4 4 4 12 0 20"/>
      <path d="M24 28l-8-4"/>
      <path d="M40 28l8-4"/>
    </svg>`
  },

  // ===========================================================================
  // THERAPY/TREATMENT
  // ===========================================================================
  {
    id: 'psych-psychotherapy',
    name: 'Psychotherapy',
    domain: 'medicine',
    category: 'treatment',
    tags: ['psychotherapy', 'therapy', 'counseling', 'talk therapy', 'treatment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="16" r="8"/>
      <circle cx="44" cy="16" r="8"/>
      <path d="M20 24v8"/>
      <path d="M44 24v8"/>
      <rect x="12" y="32" width="16" height="24" rx="2"/>
      <rect x="36" y="32" width="16" height="24" rx="2"/>
      <path d="M28 40h8"/>
      <path d="M32 36v8"/>
      <ellipse cx="20" cy="14" rx="3" ry="2" fill="currentColor" opacity="0.3"/>
      <ellipse cx="44" cy="14" rx="3" ry="2" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'psych-cbt',
    name: 'CBT',
    domain: 'medicine',
    category: 'treatment',
    tags: ['CBT', 'cognitive behavioral', 'therapy', 'thoughts', 'behavior'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="10" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="16" r="10"/>
      <text x="24" y="20" font-size="6" fill="currentColor" stroke="none">T</text>
      <circle cx="16" cy="48" r="10" fill="currentColor" opacity="0.1"/>
      <circle cx="16" cy="48" r="10"/>
      <text x="10" y="52" font-size="6" fill="currentColor" stroke="none">F</text>
      <circle cx="48" cy="48" r="10" fill="currentColor" opacity="0.1"/>
      <circle cx="48" cy="48" r="10"/>
      <text x="42" y="52" font-size="6" fill="currentColor" stroke="none">B</text>
      <path d="M26 24l-6 16"/>
      <path d="M38 24l6 16"/>
      <path d="M26 48h12"/>
    </svg>`
  },
  {
    id: 'psych-dbt',
    name: 'DBT',
    domain: 'medicine',
    category: 'treatment',
    tags: ['DBT', 'dialectical', 'therapy', 'mindfulness', 'emotion regulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22"/>
      <path d="M32 10v44"/>
      <circle cx="20" cy="32" r="8" fill="#4ECDC4" opacity="0.3"/>
      <circle cx="44" cy="32" r="8" fill="#FFD93D" opacity="0.3"/>
      <path d="M12 32c0-8 8-14 12-14"/>
      <path d="M52 32c0-8-8-14-12-14"/>
      <text x="14" y="36" font-size="5" fill="currentColor" stroke="none">A</text>
      <text x="40" y="36" font-size="5" fill="currentColor" stroke="none">C</text>
      <path d="M32 24l-4 8h8z" fill="currentColor" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'psych-antidepressant',
    name: 'Antidepressant',
    domain: 'medicine',
    category: 'treatment',
    tags: ['antidepressant', 'SSRI', 'SNRI', 'medication', 'depression'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="10" fill="#FFD93D" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="16" ry="10"/>
      <path d="M32 22v20"/>
      <path d="M16 32h32" stroke-dasharray="2 2"/>
      <path d="M24 28l16 8"/>
      <path d="M24 36l16-8"/>
      <text x="16" y="54" font-size="4" fill="currentColor" stroke="none">SSRI/SNRI</text>
    </svg>`
  },
  {
    id: 'psych-antipsychotic',
    name: 'Antipsychotic',
    domain: 'medicine',
    category: 'treatment',
    tags: ['antipsychotic', 'neuroleptic', 'medication', 'psychosis', 'dopamine blocker'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="4" fill="#9B59B6" opacity="0.3"/>
      <rect x="16" y="20" width="32" height="24" rx="4"/>
      <path d="M32 12v8"/>
      <path d="M32 44v8"/>
      <line x1="24" y1="28" x2="40" y2="28"/>
      <line x1="24" y1="32" x2="40" y2="32"/>
      <line x1="24" y1="36" x2="40" y2="36"/>
      <circle cx="32" cy="56" r="3"/>
      <text x="12" y="62" font-size="4" fill="currentColor" stroke="none">D2 Blocker</text>
    </svg>`
  },
  {
    id: 'psych-mood-stabilizer',
    name: 'Mood Stabilizer',
    domain: 'medicine',
    category: 'treatment',
    tags: ['mood stabilizer', 'lithium', 'valproate', 'medication', 'bipolar'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h48" stroke-dasharray="4 2"/>
      <path d="M8 32c8-16 16-16 24 0s16 16 24 0" fill="currentColor" opacity="0.1"/>
      <path d="M8 32c8-16 16-16 24 0s16 16 24 0" stroke-width="2"/>
      <rect x="28" y="28" width="8" height="8" fill="#90EE90"/>
      <rect x="28" y="28" width="8" height="8"/>
      <text x="22" y="54" font-size="4" fill="currentColor" stroke="none">Stable</text>
    </svg>`
  },
  {
    id: 'psych-ect',
    name: 'ECT',
    domain: 'medicine',
    category: 'treatment',
    tags: ['ECT', 'electroconvulsive', 'therapy', 'seizure', 'treatment resistant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18"/>
      <circle cx="14" cy="32" r="6" fill="#FFD93D" opacity="0.5"/>
      <circle cx="50" cy="32" r="6" fill="#FFD93D" opacity="0.5"/>
      <path d="M8 32h4"/>
      <path d="M52 32h4"/>
      <path d="M24 24l4 8-4 8 4 8"/>
      <path d="M32 24l4 8-4 8 4 8"/>
      <path d="M40 24l-4 8 4 8-4 8"/>
      <text x="22" y="58" font-size="4" fill="currentColor" stroke="none">ECT</text>
    </svg>`
  },
  {
    id: 'psych-tms',
    name: 'TMS',
    domain: 'medicine',
    category: 'treatment',
    tags: ['TMS', 'transcranial', 'magnetic', 'stimulation', 'neuromodulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="36" r="16"/>
      <path d="M16 20c4-8 16-12 24-8"/>
      <ellipse cx="32" cy="16" rx="8" ry="4" fill="#4ECDC4" opacity="0.3"/>
      <ellipse cx="32" cy="16" rx="8" ry="4"/>
      <path d="M28 20v8"/>
      <path d="M32 20v12"/>
      <path d="M36 20v8"/>
      <circle cx="28" cy="36" r="2"/>
      <circle cx="36" cy="36" r="2"/>
      <path d="M30 44c2 1 4 1 4 0"/>
      <text x="22" y="58" font-size="4" fill="currentColor" stroke="none">TMS</text>
    </svg>`
  },
  {
    id: 'psych-medication-pill',
    name: 'Psychiatric Medication',
    domain: 'medicine',
    category: 'treatment',
    tags: ['medication', 'pill', 'pharmacotherapy', 'prescription', 'drug'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="12" ry="20" fill="#4ECDC4" opacity="0.3"/>
      <ellipse cx="40" cy="32" rx="12" ry="20" fill="#FFD93D" opacity="0.3"/>
      <ellipse cx="24" cy="32" rx="12" ry="20"/>
      <ellipse cx="40" cy="32" rx="12" ry="20"/>
      <line x1="32" y1="12" x2="32" y2="52"/>
      <text x="20" y="36" font-size="6" fill="currentColor" stroke="none">Rx</text>
    </svg>`
  },
  {
    id: 'psych-therapeutic-alliance',
    name: 'Therapeutic Alliance',
    domain: 'medicine',
    category: 'treatment',
    tags: ['alliance', 'rapport', 'relationship', 'trust', 'therapy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="20" r="10"/>
      <circle cx="44" cy="20" r="10"/>
      <path d="M20 30c-8 4-12 16-12 24h24"/>
      <path d="M44 30c8 4 12 16 12 24h-24"/>
      <path d="M24 38c4 8 12 8 16 0" stroke-width="2"/>
      <circle cx="32" cy="46" r="6" fill="#FF6B6B" opacity="0.3"/>
      <path d="M32 44v4"/>
      <path d="M30 46h4"/>
    </svg>`
  },

  // ===========================================================================
  // ASSESSMENT
  // ===========================================================================
  {
    id: 'psych-mse-appearance',
    name: 'MSE Appearance',
    domain: 'medicine',
    category: 'assessment',
    tags: ['MSE', 'mental status', 'appearance', 'grooming', 'assessment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="12"/>
      <path d="M20 32v24c0 4 24 4 24 0v-24"/>
      <path d="M20 20c0-8 8-12 12-12s12 4 12 12"/>
      <circle cx="28" cy="18" r="2"/>
      <circle cx="36" cy="18" r="2"/>
      <path d="M28 24c2 2 6 2 8 0"/>
      <path d="M24 36h16"/>
      <path d="M24 44h16"/>
      <text x="8" y="60" font-size="4" fill="currentColor" stroke="none">Appearance</text>
    </svg>`
  },
  {
    id: 'psych-mse-behavior',
    name: 'MSE Behavior',
    domain: 'medicine',
    category: 'assessment',
    tags: ['MSE', 'mental status', 'behavior', 'psychomotor', 'assessment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8"/>
      <path d="M32 20v16"/>
      <path d="M32 36l-12 20"/>
      <path d="M32 36l12 20"/>
      <path d="M32 24l-16 8"/>
      <path d="M32 24l16 8"/>
      <path d="M8 28l8 4"/>
      <path d="M48 28l8 4"/>
      <circle cx="32" cy="12" r="4" fill="currentColor" opacity="0.3"/>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">Behavior</text>
    </svg>`
  },
  {
    id: 'psych-phq9',
    name: 'PHQ-9',
    domain: 'medicine',
    category: 'assessment',
    tags: ['PHQ-9', 'depression', 'screening', 'questionnaire', 'assessment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="12" y="8" width="40" height="48" rx="2"/>
      <line x1="20" y1="20" x2="44" y2="20"/>
      <line x1="20" y1="28" x2="44" y2="28"/>
      <line x1="20" y1="36" x2="44" y2="36"/>
      <line x1="20" y1="44" x2="36" y2="44"/>
      <circle cx="16" cy="20" r="2"/>
      <circle cx="16" cy="28" r="2"/>
      <circle cx="16" cy="36" r="2" fill="currentColor"/>
      <circle cx="16" cy="44" r="2"/>
      <text x="20" y="12" font-size="5" fill="currentColor" stroke="none">PHQ-9</text>
    </svg>`
  },
  {
    id: 'psych-gad7',
    name: 'GAD-7',
    domain: 'medicine',
    category: 'assessment',
    tags: ['GAD-7', 'anxiety', 'screening', 'questionnaire', 'assessment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="12" y="8" width="40" height="48" rx="2"/>
      <line x1="20" y1="20" x2="44" y2="20"/>
      <line x1="20" y1="28" x2="44" y2="28"/>
      <line x1="20" y1="36" x2="44" y2="36"/>
      <path d="M16 18l2 4 4-6"/>
      <path d="M16 26l2 4 4-6"/>
      <circle cx="16" cy="36" r="2"/>
      <text x="20" y="12" font-size="5" fill="currentColor" stroke="none">GAD-7</text>
      <text x="20" y="50" font-size="4" fill="currentColor" stroke="none">Score: __</text>
    </svg>`
  },
  {
    id: 'psych-mmse',
    name: 'MMSE',
    domain: 'medicine',
    category: 'assessment',
    tags: ['MMSE', 'cognitive', 'screening', 'dementia', 'assessment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="16" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="24" r="16"/>
      <text x="24" y="28" font-size="8" fill="currentColor" stroke="none">30</text>
      <path d="M16 44h32"/>
      <text x="16" y="52" font-size="4" fill="currentColor" stroke="none">Orientation</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Memory</text>
      <path d="M48 48l4 4"/>
      <path d="M52 48l-4 4"/>
    </svg>`
  },
  {
    id: 'psych-safety-assessment',
    name: 'Safety Assessment',
    domain: 'medicine',
    category: 'assessment',
    tags: ['safety', 'risk', 'suicidal', 'homicidal', 'assessment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l20 8v16c0 16-20 24-20 24s-20-8-20-24v-16z" fill="currentColor" opacity="0.1"/>
      <path d="M32 8l20 8v16c0 16-20 24-20 24s-20-8-20-24v-16z"/>
      <path d="M24 32l6 6 12-12" stroke-width="2"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Safety</text>
    </svg>`
  },
  {
    id: 'psych-risk-factors',
    name: 'Risk Factors',
    domain: 'medicine',
    category: 'assessment',
    tags: ['risk', 'factors', 'assessment', 'warning signs', 'protective'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <line x1="8" y1="32" x2="56" y2="32"/>
      <circle cx="20" cy="20" r="4" fill="#FF6B6B" opacity="0.5"/>
      <circle cx="32" cy="20" r="4" fill="#FF6B6B" opacity="0.5"/>
      <circle cx="44" cy="20" r="4" fill="#FF6B6B" opacity="0.5"/>
      <circle cx="20" cy="44" r="4" fill="#90EE90" opacity="0.5"/>
      <circle cx="32" cy="44" r="4" fill="#90EE90" opacity="0.5"/>
      <circle cx="44" cy="44" r="4" fill="#90EE90" opacity="0.5"/>
      <text x="12" y="28" font-size="4" fill="currentColor" stroke="none">Risk</text>
      <text x="12" y="56" font-size="4" fill="currentColor" stroke="none">Protective</text>
    </svg>`
  },
  {
    id: 'psych-interview',
    name: 'Psychiatric Interview',
    domain: 'medicine',
    category: 'assessment',
    tags: ['interview', 'history', 'assessment', 'clinical', 'psychiatric'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="16" r="8"/>
      <circle cx="44" cy="16" r="8"/>
      <rect x="12" y="28" width="16" height="20" rx="2"/>
      <rect x="36" y="28" width="16" height="20" rx="2"/>
      <path d="M28 36c4-4 8-4 8 0"/>
      <path d="M28 40h8"/>
      <rect x="8" y="52" width="48" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <line x1="16" y1="56" x2="48" y2="56"/>
    </svg>`
  },

  // ===========================================================================
  // OTHER
  // ===========================================================================
  {
    id: 'psych-sleep-disorder',
    name: 'Sleep Disorders',
    domain: 'medicine',
    category: 'other',
    tags: ['sleep', 'insomnia', 'disorder', 'circadian', 'hypersomnia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.1"/>
      <path d="M32 12c-12 0-20 8-20 20s8 20 20 20c-8 0-12-8-12-20s4-20 12-20z" fill="#4169E1" opacity="0.3"/>
      <path d="M32 12c-12 0-20 8-20 20s8 20 20 20c-8 0-12-8-12-20s4-20 12-20z"/>
      <path d="M44 16l4 0 0-4"/>
      <path d="M48 12c4 4 4 8 0 12"/>
      <path d="M52 20l4 0 0-4"/>
      <path d="M56 16c4 4 4 8 0 12"/>
      <text x="36" y="36" font-size="6" fill="currentColor" stroke="none">Zzz</text>
    </svg>`
  },
  {
    id: 'psych-eating-disorder',
    name: 'Eating Disorders',
    domain: 'medicine',
    category: 'other',
    tags: ['eating', 'anorexia', 'bulimia', 'binge', 'disorder', 'body image'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="16" ry="12" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="40" rx="16" ry="12"/>
      <path d="M32 28v-16"/>
      <circle cx="32" cy="8" r="4"/>
      <line x1="20" y1="36" x2="44" y2="36" stroke-dasharray="4 2"/>
      <line x1="24" y1="44" x2="40" y2="44" stroke-dasharray="4 2"/>
      <circle cx="28" cy="40" r="2"/>
      <circle cx="36" cy="40" r="2"/>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">ED</text>
    </svg>`
  },
  {
    id: 'psych-personality-clusters',
    name: 'Personality Clusters',
    domain: 'medicine',
    category: 'other',
    tags: ['personality', 'cluster', 'A', 'B', 'C', 'disorder', 'traits'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="10" fill="#FF6B6B" opacity="0.3"/>
      <circle cx="16" cy="44" r="10" fill="#FFD93D" opacity="0.3"/>
      <circle cx="48" cy="44" r="10" fill="#4ECDC4" opacity="0.3"/>
      <circle cx="32" cy="16" r="10"/>
      <circle cx="16" cy="44" r="10"/>
      <circle cx="48" cy="44" r="10"/>
      <text x="29" y="20" font-size="8" fill="currentColor" stroke="none">A</text>
      <text x="13" y="48" font-size="8" fill="currentColor" stroke="none">B</text>
      <text x="45" y="48" font-size="8" fill="currentColor" stroke="none">C</text>
      <path d="M26 24l-6 14"/>
      <path d="M38 24l6 14"/>
      <path d="M26 44h12"/>
    </svg>`
  },

  // ===========================================================================
  // ADHD & NEURODEVELOPMENTAL
  // ===========================================================================
  {
    id: 'psych-adhd-brain',
    name: 'ADHD Brain',
    domain: 'medicine',
    category: 'neurodevelopmental',
    tags: ['ADHD', 'attention', 'hyperactivity', 'impulsivity', 'executive function'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <circle cx="24" cy="28" r="4" fill="#FF6B6B" opacity="0.5"/>
      <circle cx="40" cy="28" r="4" fill="#FFD93D" opacity="0.5"/>
      <path d="M16 36c6 4 18 4 24 0"/>
      <path d="M28 16l2-4 2 4"/>
      <path d="M34 16l2-4 2 4"/>
      <path d="M22 20l-4-4"/>
      <path d="M42 20l4-4"/>
      <text x="18" y="56" font-size="4" fill="currentColor" stroke="none">ADHD</text>
    </svg>`
  },
  {
    id: 'psych-attention-deficit',
    name: 'Attention Deficit',
    domain: 'medicine',
    category: 'neurodevelopmental',
    tags: ['attention', 'deficit', 'focus', 'concentration', 'distraction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="8" stroke-dasharray="4 2"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M8 20l8 4"/>
      <path d="M56 20l-8 4"/>
      <path d="M8 44l8-4"/>
      <path d="M56 44l-8-4"/>
      <path d="M32 8v8"/>
      <path d="M32 48v8"/>
      <text x="18" y="60" font-size="4" fill="currentColor" stroke="none">Distracted</text>
    </svg>`
  },
  {
    id: 'psych-hyperactivity',
    name: 'Hyperactivity',
    domain: 'medicine',
    category: 'neurodevelopmental',
    tags: ['hyperactivity', 'restlessness', 'energy', 'motor', 'ADHD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="6"/>
      <path d="M32 18v8"/>
      <path d="M24 36l8-10 8 10"/>
      <path d="M20 44l12-8"/>
      <path d="M44 44l-12-8"/>
      <path d="M16 52l8-8"/>
      <path d="M48 52l-8-8"/>
      <path d="M8 16l4 4"/>
      <path d="M56 16l-4 4"/>
      <path d="M8 32l4-4"/>
      <path d="M56 32l-4-4"/>
      <circle cx="12" cy="24" r="2" fill="#FFD93D"/>
      <circle cx="52" cy="24" r="2" fill="#FFD93D"/>
    </svg>`
  },
  {
    id: 'psych-autism-spectrum',
    name: 'Autism Spectrum',
    domain: 'medicine',
    category: 'neurodevelopmental',
    tags: ['autism', 'ASD', 'spectrum', 'neurodevelopmental', 'social'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="8" fill="currentColor" opacity="0.05"/>
      <path d="M8 32h48" stroke="url(#spectrum)" stroke-width="6"/>
      <defs>
        <linearGradient id="spectrum" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FF6B6B"/>
          <stop offset="25%" stop-color="#FFD93D"/>
          <stop offset="50%" stop-color="#4ECDC4"/>
          <stop offset="75%" stop-color="#4169E1"/>
          <stop offset="100%" stop-color="#9B59B6"/>
        </linearGradient>
      </defs>
      <circle cx="20" cy="32" r="4"/>
      <circle cx="32" cy="32" r="4"/>
      <circle cx="44" cy="32" r="4"/>
      <text x="14" y="54" font-size="4" fill="currentColor" stroke="none">Spectrum</text>
    </svg>`
  },
  {
    id: 'psych-executive-function',
    name: 'Executive Function',
    domain: 'medicine',
    category: 'neurodevelopmental',
    tags: ['executive', 'function', 'planning', 'organization', 'working memory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="12" y="8" width="40" height="12" rx="2"/>
      <text x="22" y="17" font-size="5" fill="currentColor" stroke="none">PLAN</text>
      <rect x="8" y="28" width="16" height="12" rx="2"/>
      <rect x="28" y="28" width="16" height="12" rx="2"/>
      <rect x="48" y="28" width="8" height="12" rx="2"/>
      <path d="M24 20v8"/>
      <path d="M36 20v8"/>
      <path d="M52 20v8"/>
      <path d="M16 40v8"/>
      <path d="M36 40v8"/>
      <path d="M52 40v8"/>
      <circle cx="16" cy="52" r="4"/>
      <circle cx="36" cy="52" r="4"/>
      <circle cx="52" cy="52" r="4"/>
    </svg>`
  },

  // ===========================================================================
  // CRISIS & EMERGENCY
  // ===========================================================================
  {
    id: 'psych-crisis-intervention',
    name: 'Crisis Intervention',
    domain: 'medicine',
    category: 'crisis',
    tags: ['crisis', 'intervention', 'emergency', 'acute', 'stabilization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="#FF6B6B" opacity="0.2"/>
      <circle cx="32" cy="32" r="24"/>
      <path d="M32 16v16" stroke-width="3"/>
      <path d="M24 32h16" stroke-width="3"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.3"/>
      <path d="M8 8l8 8"/>
      <path d="M56 8l-8 8"/>
      <path d="M8 56l8-8"/>
      <path d="M56 56l-8-8"/>
    </svg>`
  },
  {
    id: 'psych-psych-hold',
    name: 'Psychiatric Hold',
    domain: 'medicine',
    category: 'crisis',
    tags: ['5150', 'hold', 'involuntary', 'commitment', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <path d="M20 16h24"/>
      <path d="M20 24h24"/>
      <path d="M20 32h12"/>
      <path d="M32 40c-8 0-12 8-12 8h24s-4-8-12-8z" fill="#FF6B6B" opacity="0.3"/>
      <circle cx="32" cy="36" r="4"/>
      <text x="26" y="52" font-size="4" fill="currentColor" stroke="none">72hr</text>
    </svg>`
  },
  {
    id: 'psych-deescalation',
    name: 'De-escalation',
    domain: 'medicine',
    category: 'crisis',
    tags: ['deescalation', 'calm', 'crisis', 'verbal', 'intervention'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 48l16-32 16 16 16-24" stroke-width="2"/>
      <circle cx="8" cy="48" r="4" fill="#FF6B6B"/>
      <circle cx="24" cy="16" r="4" fill="#FFA500"/>
      <circle cx="40" cy="32" r="4" fill="#FFD93D"/>
      <circle cx="56" cy="8" r="4" fill="#4ECDC4"/>
      <path d="M4 52l4-4"/>
      <path d="M20 12l4 4"/>
      <path d="M36 28l4 4"/>
      <path d="M52 4l4 4"/>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">De-escalate</text>
    </svg>`
  },
  {
    id: 'psych-restraint',
    name: 'Restraint',
    domain: 'medicine',
    category: 'crisis',
    tags: ['restraint', 'physical', 'chemical', 'safety', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="6"/>
      <rect x="20" y="20" width="24" height="36" rx="4"/>
      <path d="M20 28h-12"/>
      <path d="M44 28h12"/>
      <path d="M8 28c0-4 4-4 4 0"/>
      <path d="M52 28c0-4 4-4 4 0"/>
      <path d="M24 56h-8c-4 0-4-4 0-4"/>
      <path d="M40 56h8c4 0 4-4 0-4"/>
      <circle cx="28" cy="32" r="2"/>
      <circle cx="36" cy="32" r="2"/>
      <path d="M28 40h8"/>
    </svg>`
  },

  // ===========================================================================
  // THERAPY MODALITIES
  // ===========================================================================
  {
    id: 'psych-group-therapy',
    name: 'Group Therapy',
    domain: 'medicine',
    category: 'treatment',
    tags: ['group', 'therapy', 'support', 'peers', 'counseling'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="6"/>
      <circle cx="16" cy="28" r="6"/>
      <circle cx="48" cy="28" r="6"/>
      <circle cx="12" cy="48" r="6"/>
      <circle cx="32" cy="52" r="6"/>
      <circle cx="52" cy="48" r="6"/>
      <path d="M26 16l-6 8"/>
      <path d="M38 16l6 8"/>
      <path d="M16 34l-2 8"/>
      <path d="M26 48l-8-8"/>
      <path d="M38 48l8-8"/>
      <path d="M48 34l2 8"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.1"/>
    </svg>`
  },
  {
    id: 'psych-family-therapy',
    name: 'Family Therapy',
    domain: 'medicine',
    category: 'treatment',
    tags: ['family', 'therapy', 'systems', 'relationships', 'counseling'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="16" r="6"/>
      <circle cx="44" cy="16" r="6"/>
      <circle cx="32" cy="44" r="6"/>
      <circle cx="16" cy="52" r="4"/>
      <circle cx="48" cy="52" r="4"/>
      <path d="M20 22v8"/>
      <path d="M44 22v8"/>
      <path d="M32 38v-8"/>
      <path d="M24 30h16"/>
      <path d="M20 52h-4"/>
      <path d="M44 52h4"/>
      <path d="M26 48l-6 4"/>
      <path d="M38 48l6 4"/>
      <rect x="24" y="28" width="16" height="8" rx="2" fill="currentColor" opacity="0.1"/>
    </svg>`
  },
  {
    id: 'psych-emdr',
    name: 'EMDR',
    domain: 'medicine',
    category: 'treatment',
    tags: ['EMDR', 'eye movement', 'trauma', 'desensitization', 'reprocessing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="10" ry="8"/>
      <ellipse cx="40" cy="32" rx="10" ry="8"/>
      <circle cx="24" cy="32" r="4"/>
      <circle cx="40" cy="32" r="4"/>
      <circle cx="22" cy="32" r="2" fill="currentColor"/>
      <circle cx="42" cy="32" r="2" fill="currentColor"/>
      <path d="M12 32h-4"/>
      <path d="M56 32h-4"/>
      <path d="M8 32l48 0" stroke-dasharray="4 4" opacity="0.5"/>
      <path d="M24 20l16 0" stroke-width="2"/>
      <path d="M32 16v8"/>
      <text x="20" y="54" font-size="4" fill="currentColor" stroke="none">EMDR</text>
    </svg>`
  },
  {
    id: 'psych-mindfulness',
    name: 'Mindfulness',
    domain: 'medicine',
    category: 'treatment',
    tags: ['mindfulness', 'meditation', 'awareness', 'present', 'DBT'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.05"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12" stroke-dasharray="4 2"/>
      <circle cx="32" cy="32" r="4" fill="#4ECDC4" opacity="0.5"/>
      <path d="M32 12v8"/>
      <path d="M32 44v8"/>
      <path d="M12 32h8"/>
      <path d="M44 32h8"/>
      <path d="M18 18l6 6"/>
      <path d="M40 40l6 6"/>
      <path d="M46 18l-6 6"/>
      <path d="M18 46l6-6"/>
    </svg>`
  },
  {
    id: 'psych-exposure-therapy',
    name: 'Exposure Therapy',
    domain: 'medicine',
    category: 'treatment',
    tags: ['exposure', 'therapy', 'anxiety', 'phobia', 'habituation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56l12-16 12 8 12-24 12 16"/>
      <circle cx="8" cy="56" r="3" fill="#4169E1"/>
      <circle cx="20" cy="40" r="3" fill="#4ECDC4"/>
      <circle cx="32" cy="48" r="3" fill="#FFD93D"/>
      <circle cx="44" cy="24" r="3" fill="#FFA500"/>
      <circle cx="56" cy="40" r="3" fill="#228B22"/>
      <path d="M56 8l-4 4 4 4" stroke-width="2"/>
      <path d="M52 12h8"/>
      <text x="14" y="12" font-size="4" fill="currentColor" stroke="none">Exposure</text>
    </svg>`
  },
  {
    id: 'psych-motivational-interviewing',
    name: 'Motivational Interviewing',
    domain: 'medicine',
    category: 'treatment',
    tags: ['MI', 'motivational', 'interviewing', 'ambivalence', 'change'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="20" r="8"/>
      <circle cx="40" cy="20" r="8"/>
      <path d="M24 28v8"/>
      <path d="M40 28v8"/>
      <path d="M20 44l-8 12"/>
      <path d="M28 44l8 12"/>
      <path d="M36 44l-8 12"/>
      <path d="M44 44l8 12"/>
      <rect x="16" y="36" width="16" height="12" rx="2"/>
      <rect x="32" y="36" width="16" height="12" rx="2"/>
      <path d="M28 40h8"/>
      <path d="M32 38v4"/>
      <text x="20" y="60" font-size="4" fill="currentColor" stroke="none">MI</text>
    </svg>`
  },

  // ===========================================================================
  // CHILD & ADOLESCENT
  // ===========================================================================
  {
    id: 'psych-child-development',
    name: 'Child Development',
    domain: 'medicine',
    category: 'child-psych',
    tags: ['child', 'development', 'milestones', 'pediatric', 'growth'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="48" r="4"/>
      <circle cx="32" cy="36" r="5"/>
      <circle cx="48" cy="20" r="6"/>
      <path d="M16 44v-8"/>
      <path d="M32 31v-8"/>
      <path d="M48 14v-6"/>
      <path d="M12 52l-4 4"/>
      <path d="M20 52l4 4"/>
      <path d="M28 40l-4 4"/>
      <path d="M36 40l4 4"/>
      <path d="M44 24l-4 4"/>
      <path d="M52 24l4 4"/>
      <path d="M8 52h48" stroke-dasharray="2 2"/>
      <text x="12" y="62" font-size="4" fill="currentColor" stroke="none">Growth</text>
    </svg>`
  },
  {
    id: 'psych-play-therapy',
    name: 'Play Therapy',
    domain: 'medicine',
    category: 'child-psych',
    tags: ['play', 'therapy', 'child', 'toys', 'expression'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="28" width="20" height="20" rx="2" fill="#FFD93D" opacity="0.3"/>
      <rect x="8" y="28" width="20" height="20" rx="2"/>
      <circle cx="44" cy="38" r="10" fill="#4ECDC4" opacity="0.3"/>
      <circle cx="44" cy="38" r="10"/>
      <circle cx="32" cy="12" r="6"/>
      <path d="M32 18v6"/>
      <path d="M28 28l-8 8"/>
      <path d="M36 28l8 8"/>
      <path d="M16 36l4 4"/>
      <path d="M22 36l-4 4"/>
      <path d="M40 34l4 4"/>
      <path d="M48 34l-4 4"/>
    </svg>`
  },
  {
    id: 'psych-school-refusal',
    name: 'School Refusal',
    domain: 'medicine',
    category: 'child-psych',
    tags: ['school', 'refusal', 'anxiety', 'avoidance', 'child'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 28l20-16 20 16"/>
      <rect x="16" y="28" width="32" height="24" rx="2"/>
      <rect x="28" y="36" width="8" height="16"/>
      <rect x="20" y="32" width="6" height="6"/>
      <rect x="38" y="32" width="6" height="6"/>
      <path d="M32 12v-4"/>
      <path d="M28 8h8"/>
      <line x1="8" y1="56" x2="56" y2="8" stroke-width="3" stroke="#FF6B6B"/>
      <circle cx="32" cy="56" r="4"/>
      <path d="M32 52v-4"/>
    </svg>`
  },
  {
    id: 'psych-separation-anxiety',
    name: 'Separation Anxiety',
    domain: 'medicine',
    category: 'child-psych',
    tags: ['separation', 'anxiety', 'attachment', 'child', 'distress'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="24" r="8"/>
      <circle cx="44" cy="24" r="6"/>
      <path d="M20 32v8"/>
      <path d="M44 30v6"/>
      <rect x="12" y="40" width="16" height="16" rx="2"/>
      <rect x="38" y="36" width="12" height="12" rx="2"/>
      <path d="M28 44h10" stroke-dasharray="4 2"/>
      <circle cx="44" cy="22" r="1" fill="currentColor"/>
      <path d="M42 28c1 1 3 1 4 0"/>
      <path d="M48 36l8-8"/>
      <path d="M56 28l-4 4"/>
      <text x="8" y="62" font-size="4" fill="currentColor" stroke="none">Separation</text>
    </svg>`
  },

  // ===========================================================================
  // COGNITIVE & DEMENTIA
  // ===========================================================================
  {
    id: 'psych-cognitive-decline',
    name: 'Cognitive Decline',
    domain: 'medicine',
    category: 'cognitive',
    tags: ['cognitive', 'decline', 'dementia', 'memory', 'aging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16l12 8 12-4 12 12 12-8"/>
      <circle cx="8" cy="16" r="3" fill="#228B22"/>
      <circle cx="20" cy="24" r="3" fill="#4ECDC4"/>
      <circle cx="32" cy="20" r="3" fill="#FFD93D"/>
      <circle cx="44" cy="32" r="3" fill="#FFA500"/>
      <circle cx="56" cy="24" r="3" fill="#FF6B6B"/>
      <path d="M8 48l48 0" stroke-dasharray="2 2"/>
      <ellipse cx="32" cy="48" rx="20" ry="8" fill="currentColor" opacity="0.1"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Decline</text>
    </svg>`
  },
  {
    id: 'psych-delirium',
    name: 'Delirium',
    domain: 'medicine',
    category: 'cognitive',
    tags: ['delirium', 'confusion', 'acute', 'encephalopathy', 'fluctuating'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="26" cy="28" r="3"/>
      <circle cx="38" cy="28" r="3"/>
      <path d="M24 38c4 4 12 4 16 0"/>
      <path d="M16 16l8 4"/>
      <path d="M48 16l-8 4"/>
      <path d="M12 28l-4-4"/>
      <path d="M52 28l4-4"/>
      <path d="M8 20l4 0"/>
      <path d="M52 20l4 0"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Confused</text>
    </svg>`
  },
  {
    id: 'psych-memory-loss',
    name: 'Memory Loss',
    domain: 'medicine',
    category: 'cognitive',
    tags: ['memory', 'loss', 'amnesia', 'forgetfulness', 'cognitive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="20" ry="16" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="28" rx="20" ry="16"/>
      <rect x="20" y="20" width="8" height="8" rx="1" fill="currentColor" opacity="0.3"/>
      <rect x="32" y="20" width="8" height="8" rx="1" stroke-dasharray="2 2"/>
      <rect x="20" y="32" width="8" height="8" rx="1" stroke-dasharray="2 2"/>
      <rect x="32" y="32" width="8" height="8" rx="1"/>
      <path d="M44 24l8-8"/>
      <path d="M52 16l-4 4"/>
      <path d="M44 36l8 8"/>
      <path d="M52 44l-4-4"/>
      <text x="16" y="56" font-size="4" fill="currentColor" stroke="none">Memory</text>
    </svg>`
  },

  // ===========================================================================
  // FORENSIC & LEGAL
  // ===========================================================================
  {
    id: 'psych-competency-eval',
    name: 'Competency Evaluation',
    domain: 'medicine',
    category: 'forensic',
    tags: ['competency', 'evaluation', 'legal', 'forensic', 'court'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <circle cx="32" cy="24" r="8"/>
      <path d="M20 40h24"/>
      <path d="M20 48h16"/>
      <path d="M44 44l6 6"/>
      <path d="M50 44l-6 6"/>
      <path d="M28 22l2 4 6-6"/>
      <text x="18" y="18" font-size="4" fill="currentColor" stroke="none">Competent?</text>
    </svg>`
  },
  {
    id: 'psych-insanity-defense',
    name: 'Insanity Defense',
    domain: 'medicine',
    category: 'forensic',
    tags: ['insanity', 'defense', 'legal', 'forensic', 'not guilty'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <path d="M32 8v12"/>
      <path d="M20 20h24"/>
      <path d="M20 20v24l12 12 12-12v-24"/>
      <circle cx="32" cy="36" r="6"/>
      <path d="M29 34l3 4 4-6"/>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">NGRI</text>
    </svg>`
  },
  {
    id: 'psych-malingering',
    name: 'Malingering',
    domain: 'medicine',
    category: 'forensic',
    tags: ['malingering', 'feigning', 'fabrication', 'secondary gain', 'forensic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="16"/>
      <path d="M24 24c0-2 2-4 4-4"/>
      <path d="M36 24c0-2 2-4 4-4"/>
      <circle cx="26" cy="26" r="2"/>
      <circle cx="38" cy="26" r="2"/>
      <path d="M26 34c3 2 9 2 12 0"/>
      <rect x="20" y="48" width="24" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <text x="24" y="55" font-size="5" fill="currentColor" stroke="none">????</text>
      <path d="M16 16l-4-4"/>
      <path d="M48 16l4-4"/>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL MEDICATIONS
  // ===========================================================================
  {
    id: 'psych-benzodiazepine',
    name: 'Benzodiazepine',
    domain: 'medicine',
    category: 'treatment',
    tags: ['benzodiazepine', 'anxiolytic', 'GABA', 'medication', 'sedative'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="12" fill="#9B59B6" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="16" ry="12"/>
      <path d="M20 32c4-4 8-4 12 0s8 4 12 0"/>
      <circle cx="32" cy="24" r="4" fill="currentColor" opacity="0.3"/>
      <text x="20" y="36" font-size="5" fill="currentColor" stroke="none">GABA</text>
      <path d="M16 20l-4-4"/>
      <path d="M48 20l4-4"/>
      <text x="18" y="54" font-size="4" fill="currentColor" stroke="none">Benzo</text>
    </svg>`
  },
  {
    id: 'psych-stimulant-med',
    name: 'Stimulant Medication',
    domain: 'medicine',
    category: 'treatment',
    tags: ['stimulant', 'methylphenidate', 'amphetamine', 'ADHD', 'medication'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="10" fill="#FF6B6B" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="16" ry="10"/>
      <path d="M24 28l4 8-4 8"/>
      <path d="M32 28l4 8-4 8"/>
      <path d="M40 28l-4 8 4 8"/>
      <path d="M32 22v-10"/>
      <path d="M28 14l4-4 4 4"/>
      <text x="12" y="54" font-size="4" fill="currentColor" stroke="none">Stimulant</text>
    </svg>`
  },
  {
    id: 'psych-ketamine',
    name: 'Ketamine/Esketamine',
    domain: 'medicine',
    category: 'treatment',
    tags: ['ketamine', 'esketamine', 'NMDA', 'depression', 'treatment-resistant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l-16 24 16 24 16-24z" fill="currentColor" opacity="0.1"/>
      <path d="M32 8l-16 24 16 24 16-24z"/>
      <circle cx="32" cy="32" r="8" fill="#4ECDC4" opacity="0.5"/>
      <path d="M28 28l4 8 4-8"/>
      <path d="M24 32h16"/>
      <text x="24" y="48" font-size="4" fill="currentColor" stroke="none">NMDA</text>
      <path d="M8 32l8-4"/>
      <path d="M56 32l-8-4"/>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL SYMPTOMS
  // ===========================================================================
  {
    id: 'psych-dissociation',
    name: 'Dissociation',
    domain: 'medicine',
    category: 'other',
    tags: ['dissociation', 'depersonalization', 'derealization', 'detachment', 'trauma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="12" fill="currentColor" opacity="0.1"/>
      <circle cx="24" cy="32" r="12"/>
      <circle cx="40" cy="32" r="12" stroke-dasharray="4 2" opacity="0.5"/>
      <circle cx="20" cy="28" r="2"/>
      <circle cx="28" cy="28" r="2"/>
      <path d="M20 36c2 2 8 2 8 0"/>
      <circle cx="36" cy="28" r="2" opacity="0.3"/>
      <circle cx="44" cy="28" r="2" opacity="0.3"/>
      <path d="M36 36c2 2 8 2 8 0" opacity="0.3"/>
      <path d="M32 20v-8"/>
      <path d="M28 14l4-4 4 4"/>
    </svg>`
  },
  {
    id: 'psych-somatization',
    name: 'Somatization',
    domain: 'medicine',
    category: 'other',
    tags: ['somatization', 'somatic', 'physical', 'symptoms', 'psychosomatic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="16" r="8"/>
      <path d="M24 24v12"/>
      <path d="M16 40l8-4 8 4"/>
      <path d="M16 40l-4 16"/>
      <path d="M32 40l4 16"/>
      <ellipse cx="24" cy="32" rx="6" ry="4" fill="#FF6B6B" opacity="0.3"/>
      <ellipse cx="24" cy="44" rx="4" ry="3" fill="#FFD93D" opacity="0.3"/>
      <path d="M40 20c4-4 8-4 12 0"/>
      <path d="M44 16v8"/>
      <path d="M40 28h12"/>
      <path d="M48 24v8"/>
      <text x="36" y="44" font-size="4" fill="currentColor" stroke="none">Mind</text>
      <text x="36" y="52" font-size="4" fill="currentColor" stroke="none">Body</text>
    </svg>`
  },
  {
    id: 'psych-psychomotor-agitation',
    name: 'Psychomotor Agitation',
    domain: 'medicine',
    category: 'other',
    tags: ['agitation', 'psychomotor', 'restlessness', 'pacing', 'anxiety'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="6"/>
      <path d="M32 18v10"/>
      <path d="M24 28l8 8 8-8"/>
      <path d="M20 36l-8 20"/>
      <path d="M44 36l8 20"/>
      <path d="M28 36l4 20"/>
      <path d="M36 36l-4 20"/>
      <path d="M8 32l4-4"/>
      <path d="M8 40l4-4"/>
      <path d="M56 32l-4-4"/>
      <path d="M56 40l-4-4"/>
      <path d="M16 24l-4-4"/>
      <path d="M48 24l4-4"/>
    </svg>`
  },
  {
    id: 'psych-psychomotor-retardation',
    name: 'Psychomotor Retardation',
    domain: 'medicine',
    category: 'other',
    tags: ['retardation', 'psychomotor', 'slowing', 'bradykinesia', 'depression'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="6"/>
      <path d="M32 18v14"/>
      <path d="M24 32h16"/>
      <path d="M24 44l8-12"/>
      <path d="M40 44l-8-12"/>
      <path d="M20 56l4-12"/>
      <path d="M44 56l-4-12"/>
      <circle cx="32" cy="40" r="8" fill="currentColor" opacity="0.1" stroke="none"/>
      <path d="M16 20l-8 4" stroke-dasharray="4 2"/>
      <path d="M48 20l8 4" stroke-dasharray="4 2"/>
      <text x="16" y="62" font-size="4" fill="currentColor" stroke="none">Slowed</text>
    </svg>`
  },
  {
    id: 'psych-anosognosia',
    name: 'Anosognosia',
    domain: 'medicine',
    category: 'other',
    tags: ['anosognosia', 'insight', 'awareness', 'denial', 'illness'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="16"/>
      <circle cx="26" cy="24" r="3"/>
      <circle cx="38" cy="24" r="3"/>
      <path d="M26 34c3 2 9 2 12 0"/>
      <path d="M22 20l-4-4"/>
      <path d="M42 20l4-4"/>
      <rect x="16" y="48" width="32" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <text x="24" y="55" font-size="6" fill="currentColor" stroke="none">?!</text>
      <path d="M8 28h8" stroke-dasharray="2 2"/>
      <path d="M48 28h8" stroke-dasharray="2 2"/>
    </svg>`
  },
];

export default psychiatryIcons;
