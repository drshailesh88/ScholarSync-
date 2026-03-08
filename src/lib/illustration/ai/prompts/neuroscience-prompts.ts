/**
 * neuroscience-prompts.ts
 * Neuroscience Research-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for neuroscience research including:
 * - Neuroimaging (fMRI, PET, EEG, MEG)
 * - Electrophysiology and neural recording
 * - Optogenetics and chemogenetics
 * - Connectomics and neural circuits
 * - Behavioral paradigms
 * - Computational neuroscience
 * - Memory and plasticity
 * - Cognitive neuroscience
 *
 * Total: 22 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// NEUROSCIENCE RESEARCH DOMAIN PROMPT
// =============================================================================

/**
 * Base neuroscience research domain prompt for neural diagrams
 */
export const NEUROSCIENCE_DOMAIN_PROMPT = `
Neuroscience Research diagram requirements:
- Use standard neuroscience terminology and abbreviations
- Follow conventions for brain region nomenclature (e.g., BA, V1, M1)
- Include scale bars where appropriate (um, mm, ms, Hz)
- Use consistent color coding for excitatory (green) vs inhibitory (red) connections
- Show anatomical orientations correctly (dorsal, ventral, anterior, posterior)
- Include directional arrows for information flow
- Reference established atlases (Allen, Paxinos) for coordinates
- Use standard electrophysiology conventions (mV, Hz, ms)
- Color coding: Excitatory (green), Inhibitory (red), Modulatory (blue)
- Include statistical information where relevant (p-values, effect sizes)`;

// =============================================================================
// NEUROSCIENCE RESEARCH-SPECIFIC PROMPTS
// =============================================================================

export const NEUROSCIENCE_PROMPTS = {
  // Neuroimaging
  fmriStudyDesign: `
fMRI Study Design requirements:
- Show task design structure (block vs event-related)
- Include timing parameters (TR, TE, ISI, ITI)
- Illustrate stimulus presentation protocol
- Show expected BOLD response profile
- Include preprocessing pipeline steps
- Show statistical analysis approach (GLM, connectivity)
- Indicate regions of interest with coordinates
- Include power analysis and sample size considerations`,

  eegAnalysis: `
EEG Analysis requirements:
- Show electrode placement (10-20 system)
- Include frequency band definitions (delta, theta, alpha, beta, gamma)
- Illustrate time-frequency decomposition
- Show ERP components and latencies
- Include artifact rejection criteria
- Demonstrate source localization methods
- Show connectivity measures (coherence, phase-locking)
- Include statistical corrections for multiple comparisons`,

  petImaging: `
PET Imaging requirements:
- Show radiotracer kinetics and binding
- Include compartmental models
- Illustrate time-activity curves
- Show reference region selection
- Include binding potential calculations
- Demonstrate partial volume correction
- Show coregistration with MRI
- Include dosimetry and safety considerations`,

  // Electrophysiology
  singleUnitRecording: `
Single Unit Recording requirements:
- Show electrode configuration and placement
- Include spike waveform characteristics
- Illustrate spike sorting methodology
- Show firing rate calculations (PSTH, raster plots)
- Include receptive field mapping
- Demonstrate tuning curve analysis
- Show cross-correlation and connectivity
- Include noise and artifact rejection criteria`,

  patchClampProtocol: `
Patch Clamp Protocol requirements:
- Show recording configuration (whole-cell, cell-attached, etc.)
- Include voltage/current clamp protocols
- Illustrate I-V curves and conductance
- Show pharmacological manipulations
- Include access resistance monitoring
- Demonstrate synaptic current analysis
- Show plasticity protocols (LTP/LTD induction)
- Include quality control metrics`,

  lfpOscillations: `
LFP Oscillation Analysis requirements:
- Show frequency bands and their functions
- Include power spectral density analysis
- Illustrate phase-amplitude coupling
- Show coherence between regions
- Include spike-field coherence
- Demonstrate Granger causality
- Show cross-frequency coupling
- Include artifact and volume conduction considerations`,

  // Optogenetics & Chemogenetics
  optogeneticsExperiment: `
Optogenetics Experiment requirements:
- Show viral vector and promoter selection
- Include injection coordinates with atlas reference
- Illustrate expression timeline and verification
- Show optical hardware setup (laser, fiber, LED)
- Include stimulation parameters (power, frequency, duration)
- Demonstrate behavioral paradigm integration
- Show control conditions (eYFP, ChR2-expressing controls)
- Include histological verification protocol`,

  chemogeneticsDesign: `
Chemogenetics (DREADD) Design requirements:
- Show receptor type selection (hM3Dq, hM4Di, KORD)
- Include viral vector and targeting strategy
- Illustrate expression verification (IHC, ISH)
- Show ligand selection (CNO, DCZ, C21)
- Include dose-response relationships
- Demonstrate behavioral timeline
- Show control conditions and specificity
- Include off-target effect considerations`,

  // Connectomics
  structuralConnectome: `
Structural Connectome requirements:
- Show diffusion imaging acquisition parameters
- Include tractography algorithm selection
- Illustrate parcellation scheme and atlas
- Show connectivity matrix construction
- Include graph theory metrics
- Demonstrate hub and module detection
- Show comparison with functional connectivity
- Include quality control and reproducibility measures`,

  functionalConnectivity: `
Functional Connectivity requirements:
- Show resting-state acquisition parameters
- Include preprocessing pipeline (motion, denoising)
- Illustrate seed-based vs ICA approaches
- Show correlation/partial correlation methods
- Include dynamic connectivity analysis
- Demonstrate network identification
- Show clinical/behavioral correlations
- Include confound regression strategies`,

  circuitTracing: `
Neural Circuit Tracing requirements:
- Show tracer selection (anterograde, retrograde, transsynaptic)
- Include injection strategy and coordinates
- Illustrate expression/transport timeline
- Show imaging and quantification methods
- Include monosynaptic rabies methodology
- Demonstrate input-output mapping
- Show cell-type specific targeting
- Include control experiments and validation`,

  // Behavioral Paradigms
  learningMemoryTask: `
Learning and Memory Task requirements:
- Show task phases (acquisition, consolidation, retrieval)
- Include trial structure and timing
- Illustrate dependent measures (accuracy, latency)
- Show within-subject vs between-subject designs
- Include control conditions
- Demonstrate statistical analysis approach
- Show individual differences analysis
- Include power analysis and effect sizes`,

  decisionMakingTask: `
Decision Making Task requirements:
- Show choice options and reward contingencies
- Include trial timeline and events
- Illustrate psychometric functions
- Show drift-diffusion or accumulator models
- Include neural correlates mapping
- Demonstrate value and choice signals
- Show model comparison approach
- Include computational modeling framework`,

  attentionTask: `
Attention Task requirements:
- Show attentional manipulation (spatial, feature, object)
- Include cue validity and expectation
- Illustrate target detection paradigm
- Show reaction time and accuracy measures
- Include neural markers (N2pc, P3, alpha)
- Demonstrate load manipulation
- Show individual differences
- Include distractor and filtering conditions`,

  // Computational Neuroscience
  neuralEncodingModel: `
Neural Encoding Model requirements:
- Show stimulus-response relationship
- Include receptive field estimation
- Illustrate linear-nonlinear models
- Show spike train statistics
- Include information theoretic measures
- Demonstrate generalization and prediction
- Show comparison with neural data
- Include model selection criteria`,

  networkSimulation: `
Neural Network Simulation requirements:
- Show neuron model specifications
- Include connectivity architecture
- Illustrate parameter distributions
- Show input patterns and protocols
- Include emergence of dynamics
- Demonstrate stability analysis
- Show comparison with experimental data
- Include sensitivity and robustness analysis`,

  decodingAnalysis: `
Neural Decoding Analysis requirements:
- Show feature selection and extraction
- Include classifier selection (SVM, LDA, neural network)
- Illustrate cross-validation strategy
- Show decoding accuracy and information
- Include temporal dynamics of decoding
- Demonstrate generalization across conditions
- Show confusion matrices and errors
- Include null distribution and statistics`,

  // Memory and Plasticity
  plasticityMechanism: `
Synaptic Plasticity Mechanism requirements:
- Show induction protocol (timing, frequency)
- Include receptor and signaling pathways
- Illustrate early vs late phase mechanisms
- Show molecular cascades (CaMKII, CREB, BDNF)
- Include structural changes (spine dynamics)
- Demonstrate maintenance mechanisms
- Show behavioral correlates
- Include pharmacological interventions`,

  memoryConsolidation: `
Memory Consolidation requirements:
- Show encoding-consolidation-retrieval timeline
- Include hippocampal-cortical dialogue
- Illustrate sleep-dependent mechanisms
- Show replay and reactivation patterns
- Include systems consolidation model
- Demonstrate reconsolidation window
- Show molecular mechanisms
- Include interventional studies`,

  // Cognitive Neuroscience
  executiveFunction: `
Executive Function requirements:
- Show component processes (inhibition, shifting, updating)
- Include prefrontal circuit organization
- Illustrate task paradigms for each component
- Show neural correlates and timing
- Include individual differences
- Demonstrate development and aging
- Show clinical relevance
- Include computational models`,

  workingMemoryModel: `
Working Memory Model requirements:
- Show component structure (central executive, buffers)
- Include capacity limitations
- Illustrate maintenance mechanisms (sustained activity, oscillations)
- Show manipulation and updating
- Include prefrontal-parietal network
- Demonstrate load effects
- Show distraction and interference
- Include computational implementations`,

  socialCognition: `
Social Cognition requirements:
- Show theory of mind and mentalizing
- Include face and emotion processing
- Illustrate social learning and reward
- Show mirror neuron and simulation theories
- Include social network analysis
- Demonstrate developmental trajectory
- Show clinical populations
- Include cross-cultural considerations`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Neuroscience research-specific few-shot examples
 */
export const NEUROSCIENCE_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create an fMRI study design diagram with task timeline and analysis pipeline',
    output: `flowchart TB
    subgraph fMRI["fMRI Study Design"]
        subgraph Task["Task Design"]
            STIM[Stimulus] --> ISI[ISI 2-4s jittered]
            ISI --> RESP[Response Window]
            RESP --> ITI[ITI 6-12s]
            ITI --> STIM
        end

        subgraph Acquisition["Data Acquisition"]
            SCAN[3T Scanner] --> EPI[EPI: TR=2s, TE=30ms]
            EPI --> VOXEL[3mm isotropic]
            ANAT[T1-MPRAGE] --> REG[Registration]
        end

        subgraph Preprocessing["Preprocessing Pipeline"]
            RAW[Raw Data] --> MOTION[Motion Correction]
            MOTION --> SLICE[Slice Timing]
            SLICE --> NORM[MNI Normalization]
            NORM --> SMOOTH[6mm FWHM Smoothing]
            SMOOTH --> FILTER[High-pass Filter 128s]
        end

        subgraph Analysis["Statistical Analysis"]
            GLM[General Linear Model] --> BETA[Beta Estimates]
            BETA --> CONTRAST[Contrasts]
            CONTRAST --> STATS[t-statistics]
            STATS --> FWE[FWE p<0.05]
        end
    end

    style STIM fill:#27AE60
    style EPI fill:#3498DB
    style GLM fill:#9B59B6
    style FWE fill:#E74C3C`,
  },
  {
    prompt: 'Create an optogenetics experiment workflow from viral injection to behavioral testing',
    output: `flowchart TB
    subgraph Optogenetics["Optogenetics Experiment"]
        subgraph Virus["Viral Preparation"]
            AAV[AAV5-CaMKII-ChR2-eYFP] --> TITER[Titer: 10^12 vg/ml]
            TITER --> ALIQUOT[Aliquot & Store -80C]
        end

        subgraph Surgery["Stereotaxic Surgery"]
            COORD[Coordinates: AP-1.8, ML+1.5, DV-1.2] --> INJ[200nL injection]
            INJ --> SPEED[50nL/min]
            SPEED --> WAIT[5min diffusion]
            FIBER[Fiber Implant 200um] --> CEMENT[Dental cement]
        end

        subgraph Expression["Expression Period"]
            WEEK1[Week 1: Recovery] --> WEEK2[Week 2-3: Expression]
            WEEK2 --> WEEK4[Week 4: Testing]
        end

        subgraph Stimulation["Light Stimulation"]
            LASER[473nm Laser] --> POWER[5-10 mW at tip]
            POWER --> PARAMS[20Hz, 5ms pulses]
            PARAMS --> EPOCH[5s ON / 25s OFF]
        end

        subgraph Behavior["Behavioral Testing"]
            BASELINE[Baseline] --> OPTO[Opto-stimulation]
            OPTO --> CONTROL[eYFP Control]
            CONTROL --> STATS[Statistics]
        end

        subgraph Histology["Verification"]
            PERF[Perfusion] --> SECTION[50um sections]
            SECTION --> IMAGE[Confocal imaging]
            IMAGE --> VERIFY[Expression verification]
        end
    end

    style AAV fill:#27AE60
    style LASER fill:#3498DB
    style OPTO fill:#F39C12`,
  },
  {
    prompt: 'Create a connectomics analysis workflow showing structural and functional connectivity',
    output: `flowchart TB
    subgraph Connectomics["Brain Connectomics Analysis"]
        subgraph Acquisition["Data Acquisition"]
            DWI[DWI: 64 directions, b=1000] --> DWIPRE[Eddy + Topup]
            RSFMRI[rs-fMRI: 10min, TR=2s] --> RSPRE[ICA-AROMA]
            T1[T1-weighted] --> SEGMENT[FreeSurfer]
        end

        subgraph Parcellation["Brain Parcellation"]
            SEGMENT --> ATLAS[Desikan-Killiany 84 ROIs]
            ATLAS --> LABELS[Region Labels]
        end

        subgraph Structural["Structural Connectivity"]
            DWIPRE --> TRACT[Probabilistic Tractography]
            TRACT --> SIFT[SIFT2 filtering]
            SIFT --> SMAT[SC Matrix: Streamline counts]
        end

        subgraph Functional["Functional Connectivity"]
            RSPRE --> EXTRACT[ROI timeseries]
            EXTRACT --> CORR[Pearson Correlation]
            CORR --> FISHER[Fisher z-transform]
            FISHER --> FMAT[FC Matrix]
        end

        subgraph Network["Network Analysis"]
            SMAT --> GRAPH[Graph Theory Metrics]
            FMAT --> GRAPH
            GRAPH --> DEGREE[Degree Centrality]
            GRAPH --> CLUSTER[Clustering]
            GRAPH --> MODULE[Modularity]
            GRAPH --> HUBS[Hub Identification]
        end

        subgraph Compare["Structure-Function"]
            SMAT --> SCFC[SC-FC Correlation]
            FMAT --> SCFC
            SCFC --> COMM[Communication Models]
        end
    end

    style DWI fill:#3498DB
    style RSFMRI fill:#27AE60
    style GRAPH fill:#9B59B6`,
  },
  {
    prompt: 'Create a spike sorting and single unit analysis pipeline',
    output: `flowchart TB
    subgraph Ephys["Electrophysiology Analysis"]
        subgraph Recording["Data Acquisition"]
            PROBE[32-ch Silicon Probe] --> HS[Headstage 1x gain]
            HS --> AMP[Amplifier: 0.3-6000Hz]
            AMP --> ADC[30kHz sampling]
            ADC --> DATA[Binary file]
        end

        subgraph Preprocess["Preprocessing"]
            DATA --> CAR[Common Average Reference]
            CAR --> FILT[Bandpass 300-6000Hz]
            FILT --> DETECT[Threshold Detection -4.5 SD]
        end

        subgraph Sorting["Spike Sorting"]
            DETECT --> PCA[PCA: 3 components]
            PCA --> CLUSTER[Clustering: KlustaKwik]
            CLUSTER --> MANUAL[Manual Curation]
            MANUAL --> QUALITY[Quality Metrics]
        end

        subgraph Metrics["Unit Quality"]
            QUALITY --> ISI[ISI violations < 1%]
            QUALITY --> SNR[SNR > 4]
            QUALITY --> DRIFT[Amplitude stability]
            QUALITY --> WAVE[Waveform consistency]
        end

        subgraph Analysis["Neural Analysis"]
            MANUAL --> RASTER[Raster Plots]
            MANUAL --> PSTH[PSTH: 50ms bins]
            MANUAL --> TUNING[Tuning Curves]
            MANUAL --> XCORR[Cross-correlation]
            TUNING --> FIT[Model Fitting]
        end
    end

    style PROBE fill:#E74C3C
    style CLUSTER fill:#9B59B6
    style PSTH fill:#27AE60`,
  },
  {
    prompt: 'Create a behavioral paradigm diagram for a working memory task',
    output: `flowchart LR
    subgraph WM["Working Memory Task (Delayed Match-to-Sample)"]
        subgraph Trial["Trial Structure"]
            FIX[Fixation 500ms] --> SAMPLE[Sample Array 200ms]
            SAMPLE --> DELAY[Delay Period 1000ms]
            DELAY --> PROBE[Probe Array]
            PROBE --> RESP[Response 2000ms]
            RESP --> FEED[Feedback 500ms]
            FEED --> ITI[ITI 1000-1500ms]
        end

        subgraph Load["Memory Load"]
            SET1[Set Size 1] --> SET2[Set Size 2]
            SET2 --> SET4[Set Size 4]
            SET4 --> SET6[Set Size 6]
        end

        subgraph Measure["Dependent Variables"]
            ACC[Accuracy %]
            RT[Reaction Time ms]
            K[Cowan's K capacity]
            DPRIME[d-prime]
        end

        subgraph Neural["Neural Correlates"]
            CDA[CDA amplitude] --> LOAD_EFF[Load effect]
            ALPHA[Alpha suppression] --> LOAD_EFF
            PFC[dlPFC BOLD] --> LOAD_EFF
        end
    end

    style SAMPLE fill:#27AE60
    style DELAY fill:#F39C12
    style PROBE fill:#3498DB`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

const neurosciencePrompts = {
  NEUROSCIENCE_DOMAIN_PROMPT,
  NEUROSCIENCE_PROMPTS,
  NEUROSCIENCE_FEW_SHOT_EXAMPLES,
};

export default neurosciencePrompts;
