/**
 * computer.ts
 * Computer Engineering diagram templates for FINNISH
 *
 * Contains comprehensive templates for computer engineering including:
 * - Processor and CPU design
 * - Memory systems
 * - Computer architecture
 * - Embedded systems
 * - Digital logic design
 * - Network architecture
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// PROCESSOR DESIGN
// =============================================================================

/**
 * CPU Architecture template
 */
export const cpuArchitecture: DiagramTemplate = {
  id: 'comp-cpu-architecture',
  name: 'CPU Architecture Diagram',
  description: 'Central processing unit internal architecture',
  domain: 'engineering',
  promptTemplate: `Create a CPU architecture diagram:
- Architecture type: {{architectureType}}
- Instruction set: {{instructionSet}}
- Pipeline stages: {{pipelineStages}}
- Execution units: {{executionUnits}}
- Register file: {{registerFile}}
- Cache hierarchy: {{cacheHierarchy}}
- Branch prediction: {{branchPrediction}}
{{#additionalNotes}}Performance notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'architectureType',
    'instructionSet',
    'pipelineStages',
    'executionUnits',
    'registerFile',
    'cacheHierarchy',
    'branchPrediction',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Frontend["Frontend"]
        IF["Instruction\\nFetch"]
        ID["Instruction\\nDecode"]
        BP["Branch\\nPredictor"]
    end
    subgraph Backend["Execution"]
        RN["Register\\nRename"]
        IS["Issue"]
        ALU["ALU"]
        FPU["FPU"]
        LSU["Load/Store"]
    end
    subgraph Memory["Memory"]
        L1["L1 Cache"]
        L2["L2 Cache"]
    end
    IF --> ID --> RN --> IS
    IS --> ALU & FPU & LSU
    LSU --> L1 --> L2
    BP --> IF
    style IF fill:#3b82f6,color:#fff
    style ALU fill:#10b981,color:#fff`,
};

/**
 * Pipeline Design template
 */
export const pipelineDesign: DiagramTemplate = {
  id: 'comp-pipeline',
  name: 'Pipeline Design Diagram',
  description: 'CPU instruction pipeline stages and hazards',
  domain: 'engineering',
  promptTemplate: `Create a pipeline design diagram:
- Number of stages: {{numStages}}
- Stage functions: {{stageFunctions}}
- Data hazards: {{dataHazards}}
- Control hazards: {{controlHazards}}
- Forwarding paths: {{forwarding}}
- Stall conditions: {{stallConditions}}
- Pipeline registers: {{pipelineRegisters}}
{{#additionalNotes}}Hazard handling: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'numStages',
    'stageFunctions',
    'dataHazards',
    'controlHazards',
    'forwarding',
    'stallConditions',
    'pipelineRegisters',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Pipeline["5-Stage Pipeline"]
        IF["IF\\nFetch"]
        ID["ID\\nDecode"]
        EX["EX\\nExecute"]
        MEM["MEM\\nMemory"]
        WB["WB\\nWriteback"]
    end
    subgraph Hazards["Hazard Handling"]
        FW["Forwarding\\nUnit"]
        HD["Hazard\\nDetection"]
    end
    IF --> ID --> EX --> MEM --> WB
    EX --> FW --> EX
    MEM --> FW
    HD --> IF
    style EX fill:#dc2626,color:#fff
    style FW fill:#10b981,color:#fff`,
};

/**
 * Multi-core Processor template
 */
export const multicoreProcessor: DiagramTemplate = {
  id: 'comp-multicore',
  name: 'Multi-core Processor Design',
  description: 'Multi-core CPU with shared and private caches',
  domain: 'engineering',
  promptTemplate: `Create a multi-core processor design diagram:
- Number of cores: {{numCores}}
- Core architecture: {{coreArchitecture}}
- Private caches: {{privateCaches}}
- Shared cache: {{sharedCache}}
- Interconnect: {{interconnect}}
- Cache coherence: {{cacheCoherence}}
- Memory controller: {{memoryController}}
{{#additionalNotes}}Design considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'numCores',
    'coreArchitecture',
    'privateCaches',
    'sharedCache',
    'interconnect',
    'cacheCoherence',
    'memoryController',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Cores["Processing Cores"]
        C0["Core 0\\nL1 I/D"]
        C1["Core 1\\nL1 I/D"]
        C2["Core 2\\nL1 I/D"]
        C3["Core 3\\nL1 I/D"]
    end
    subgraph Shared["Shared Resources"]
        L2["L2 Cache"]
        L3["L3 Cache\\n(Shared)"]
        MC["Memory\\nController"]
    end
    C0 & C1 --> L2
    C2 & C3 --> L2
    L2 --> L3 --> MC
    style L3 fill:#3b82f6,color:#fff
    style MC fill:#10b981,color:#fff`,
};

// =============================================================================
// MEMORY SYSTEMS
// =============================================================================

/**
 * Memory Hierarchy template
 */
export const memoryHierarchy: DiagramTemplate = {
  id: 'comp-memory-hierarchy',
  name: 'Memory Hierarchy Diagram',
  description: 'Computer memory hierarchy from registers to storage',
  domain: 'engineering',
  promptTemplate: `Create a memory hierarchy diagram:
- Register file: {{registerFile}}
- L1 cache: {{l1Cache}}
- L2 cache: {{l2Cache}}
- L3 cache: {{l3Cache}}
- Main memory: {{mainMemory}}
- Storage: {{storage}}
- Access latencies: {{latencies}}
{{#additionalNotes}}Performance characteristics: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'registerFile',
    'l1Cache',
    'l2Cache',
    'l3Cache',
    'mainMemory',
    'storage',
    'latencies',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Fast["Fast (Small)"]
        REG["Registers\\n1 cycle"]
        L1["L1 Cache\\n4 cycles"]
    end
    subgraph Medium["Medium"]
        L2["L2 Cache\\n12 cycles"]
        L3["L3 Cache\\n40 cycles"]
    end
    subgraph Slow["Slow (Large)"]
        RAM["DRAM\\n100+ cycles"]
        SSD["SSD\\n10μs"]
    end
    REG --> L1 --> L2 --> L3 --> RAM --> SSD
    style REG fill:#dc2626,color:#fff
    style L1 fill:#f59e0b,color:#fff
    style RAM fill:#3b82f6,color:#fff`,
};

/**
 * Cache Design template
 */
export const cacheDesign: DiagramTemplate = {
  id: 'comp-cache-design',
  name: 'Cache Design Diagram',
  description: 'Cache memory organization and associativity',
  domain: 'engineering',
  promptTemplate: `Create a cache design diagram:
- Cache size: {{cacheSize}}
- Line size: {{lineSize}}
- Associativity: {{associativity}}
- Replacement policy: {{replacementPolicy}}
- Write policy: {{writePolicy}}
- Tag structure: {{tagStructure}}
- Indexing scheme: {{indexing}}
{{#additionalNotes}}Cache organization: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'cacheSize',
    'lineSize',
    'associativity',
    'replacementPolicy',
    'writePolicy',
    'tagStructure',
    'indexing',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Address["Address Bits"]
        TG["Tag"]
        IX["Index"]
        OF["Offset"]
    end
    subgraph Cache["4-way Set Associative"]
        S0["Set 0"]
        S1["Set 1"]
        SN["Set N"]
    end
    subgraph Way["Each Set"]
        W0["Way 0"]
        W1["Way 1"]
        W2["Way 2"]
        W3["Way 3"]
    end
    IX --> S0 & S1 & SN
    S0 --> W0 & W1 & W2 & W3
    TG --> W0
    style S0 fill:#3b82f6,color:#fff
    style TG fill:#10b981,color:#fff`,
};

/**
 * Virtual Memory System template
 */
export const virtualMemorySystem: DiagramTemplate = {
  id: 'comp-virtual-memory',
  name: 'Virtual Memory System',
  description: 'Virtual memory address translation and page tables',
  domain: 'engineering',
  promptTemplate: `Create a virtual memory system diagram:
- Page size: {{pageSize}}
- Address space: {{addressSpace}}
- Page table structure: {{pageTableStructure}}
- TLB organization: {{tlbOrganization}}
- Page replacement: {{pageReplacement}}
- Protection bits: {{protectionBits}}
- Hardware support: {{hardwareSupport}}
{{#additionalNotes}}Memory management: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pageSize',
    'addressSpace',
    'pageTableStructure',
    'tlbOrganization',
    'pageReplacement',
    'protectionBits',
    'hardwareSupport',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph VA["Virtual Address"]
        VPN["Virtual Page\\nNumber"]
        PO["Page\\nOffset"]
    end
    subgraph Translation["Translation"]
        TLB["TLB"]
        PT["Page\\nTable"]
    end
    subgraph PA["Physical Address"]
        PPN["Physical Page\\nNumber"]
        PO2["Page\\nOffset"]
    end
    VPN --> TLB
    TLB -->|"Hit"| PPN
    TLB -->|"Miss"| PT --> PPN
    PO --> PO2
    style TLB fill:#10b981,color:#fff
    style PT fill:#3b82f6,color:#fff`,
};

// =============================================================================
// COMPUTER ARCHITECTURE
// =============================================================================

/**
 * System Bus Architecture template
 */
export const systemBusArchitecture: DiagramTemplate = {
  id: 'comp-system-bus',
  name: 'System Bus Architecture',
  description: 'Computer system bus interconnection',
  domain: 'engineering',
  promptTemplate: `Create a system bus architecture diagram:
- Bus type: {{busType}}
- Bus width: {{busWidth}}
- Clock frequency: {{clockFrequency}}
- Arbitration: {{arbitration}}
- Connected devices: {{connectedDevices}}
- Protocol: {{protocol}}
- Bandwidth: {{bandwidth}}
{{#additionalNotes}}Bus specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'busType',
    'busWidth',
    'clockFrequency',
    'arbitration',
    'connectedDevices',
    'protocol',
    'bandwidth',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Devices["System Devices"]
        CPU["CPU"]
        MEM["Memory\\nController"]
        GPU["Graphics"]
        IO["I/O Hub"]
    end
    subgraph Bus["System Bus"]
        FB["Front Bus\\n64-bit"]
        PCI["PCIe\\nx16"]
    end
    CPU --> FB --> MEM
    CPU --> PCI --> GPU
    FB --> IO
    style FB fill:#3b82f6,color:#fff
    style PCI fill:#10b981,color:#fff`,
};

/**
 * I/O System Architecture template
 */
export const ioSystemArchitecture: DiagramTemplate = {
  id: 'comp-io-system',
  name: 'I/O System Architecture',
  description: 'Input/Output system organization',
  domain: 'engineering',
  promptTemplate: `Create an I/O system architecture diagram:
- I/O bus types: {{ioBusTypes}}
- Controllers: {{controllers}}
- DMA system: {{dmaSystem}}
- Interrupt handling: {{interruptHandling}}
- Peripheral interfaces: {{peripherals}}
- Driver organization: {{driverOrganization}}
- Performance: {{performance}}
{{#additionalNotes}}I/O specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ioBusTypes',
    'controllers',
    'dmaSystem',
    'interruptHandling',
    'peripherals',
    'driverOrganization',
    'performance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph CPU["Processor"]
        CORE["CPU Core"]
        INT["Interrupt\\nController"]
    end
    subgraph IO["I/O Subsystem"]
        DMA["DMA\\nController"]
        PCIE["PCIe\\nController"]
        USB["USB\\nController"]
    end
    subgraph Devices["Devices"]
        NIC["Network"]
        SSD["Storage"]
        PER["Peripherals"]
    end
    CORE --> DMA --> PCIE --> NIC & SSD
    CORE --> USB --> PER
    INT --> CORE
    style DMA fill:#10b981,color:#fff
    style PCIE fill:#3b82f6,color:#fff`,
};

/**
 * GPU Architecture template
 */
export const gpuArchitecture: DiagramTemplate = {
  id: 'comp-gpu-architecture',
  name: 'GPU Architecture Diagram',
  description: 'Graphics processing unit architecture',
  domain: 'engineering',
  promptTemplate: `Create a GPU architecture diagram:
- Architecture generation: {{architecture}}
- Streaming multiprocessors: {{streamingMultiprocessors}}
- CUDA/shader cores: {{shaderCores}}
- Memory system: {{memorySystem}}
- Texture units: {{textureUnits}}
- Raster operations: {{rasterOps}}
- Display interface: {{displayInterface}}
{{#additionalNotes}}Compute capabilities: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'architecture',
    'streamingMultiprocessors',
    'shaderCores',
    'memorySystem',
    'textureUnits',
    'rasterOps',
    'displayInterface',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph GPU["GPU Chip"]
        GPC["Graphics Processing\\nCluster"]
        SM["Streaming\\nMultiprocessors"]
        TPC["Texture\\nProcessing"]
    end
    subgraph Memory["Memory System"]
        L2["L2 Cache"]
        MC["Memory\\nController"]
        GDDR["GDDR6\\nMemory"]
    end
    subgraph Output["Output"]
        ROP["Raster\\nOperations"]
        DISP["Display\\nEngine"]
    end
    GPC --> SM --> TPC
    TPC --> L2 --> MC --> GDDR
    TPC --> ROP --> DISP
    style SM fill:#10b981,color:#fff
    style GDDR fill:#3b82f6,color:#fff`,
};

// =============================================================================
// EMBEDDED SYSTEMS
// =============================================================================

/**
 * Microcontroller System template
 */
export const microcontrollerSystem: DiagramTemplate = {
  id: 'comp-microcontroller',
  name: 'Microcontroller System Design',
  description: 'Embedded microcontroller system architecture',
  domain: 'engineering',
  promptTemplate: `Create a microcontroller system design diagram:
- MCU family: {{mcuFamily}}
- CPU core: {{cpuCore}}
- Memory map: {{memoryMap}}
- Peripherals: {{peripherals}}
- Clock system: {{clockSystem}}
- Power management: {{powerManagement}}
- Debug interface: {{debugInterface}}
{{#additionalNotes}}Application requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'mcuFamily',
    'cpuCore',
    'memoryMap',
    'peripherals',
    'clockSystem',
    'powerManagement',
    'debugInterface',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph MCU["Microcontroller"]
        CPU["ARM\\nCortex-M4"]
        FL["Flash\\n256KB"]
        RAM["SRAM\\n64KB"]
    end
    subgraph Peripherals["Peripherals"]
        TIM["Timers"]
        ADC["ADC"]
        UART["UART/SPI/I2C"]
        GPIO["GPIO"]
    end
    subgraph System["System"]
        CLK["Clock\\nSystem"]
        PWR["Power\\nManagement"]
        DBG["Debug\\n(JTAG/SWD)"]
    end
    CPU --> FL & RAM
    CPU --> TIM & ADC & UART & GPIO
    CLK --> CPU
    PWR --> MCU
    DBG --> CPU
    style CPU fill:#10b981,color:#fff
    style FL fill:#3b82f6,color:#fff`,
};

/**
 * FPGA System Design template
 */
export const fpgaSystemDesign: DiagramTemplate = {
  id: 'comp-fpga-system',
  name: 'FPGA System Design',
  description: 'Field-programmable gate array system architecture',
  domain: 'engineering',
  promptTemplate: `Create an FPGA system design diagram:
- FPGA family: {{fpgaFamily}}
- Logic elements: {{logicElements}}
- Block RAM: {{blockRam}}
- DSP blocks: {{dspBlocks}}
- I/O banks: {{ioBanks}}
- Clocking: {{clocking}}
- IP cores: {{ipCores}}
{{#additionalNotes}}Design specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'fpgaFamily',
    'logicElements',
    'blockRam',
    'dspBlocks',
    'ioBanks',
    'clocking',
    'ipCores',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph FPGA["FPGA Fabric"]
        LE["Logic\\nElements"]
        BRAM["Block\\nRAM"]
        DSP["DSP\\nBlocks"]
    end
    subgraph IP["IP Cores"]
        CPU["Soft\\nProcessor"]
        ETH["Ethernet\\nMAC"]
        DDR["DDR\\nController"]
    end
    subgraph IO["I/O"]
        GTX["High-Speed\\nTransceivers"]
        GPIO["General\\nI/O"]
    end
    LE --> CPU
    BRAM --> CPU
    DSP --> CPU
    CPU --> ETH --> GTX
    CPU --> DDR --> GPIO
    style LE fill:#10b981,color:#fff
    style CPU fill:#3b82f6,color:#fff`,
};

/**
 * Real-Time System template
 */
export const realTimeSystem: DiagramTemplate = {
  id: 'comp-realtime-system',
  name: 'Real-Time System Design',
  description: 'Real-time embedded system architecture',
  domain: 'engineering',
  promptTemplate: `Create a real-time system design diagram:
- RTOS: {{rtos}}
- Task scheduling: {{taskScheduling}}
- Priority levels: {{priorityLevels}}
- Interrupt handling: {{interruptHandling}}
- Inter-task communication: {{interTaskComm}}
- Timing constraints: {{timingConstraints}}
- Watchdog: {{watchdog}}
{{#additionalNotes}}Real-time requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'rtos',
    'taskScheduling',
    'priorityLevels',
    'interruptHandling',
    'interTaskComm',
    'timingConstraints',
    'watchdog',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph RTOS["RTOS Kernel"]
        SC["Scheduler"]
        TM["Timer\\nService"]
        SY["Sync\\nPrimitives"]
    end
    subgraph Tasks["Application Tasks"]
        T1["High Priority\\nControl Loop"]
        T2["Medium Priority\\nComm Task"]
        T3["Low Priority\\nLogging"]
    end
    subgraph HW["Hardware"]
        INT["Interrupt\\nHandler"]
        WD["Watchdog"]
    end
    SC --> T1 & T2 & T3
    TM --> SC
    INT --> SC
    T1 --> SY --> T2
    WD --> SC
    style SC fill:#10b981,color:#fff
    style T1 fill:#dc2626,color:#fff`,
};

// =============================================================================
// DIGITAL LOGIC DESIGN
// =============================================================================

/**
 * Digital System Design template
 */
export const digitalSystemDesign: DiagramTemplate = {
  id: 'comp-digital-system',
  name: 'Digital System Design',
  description: 'Digital system with datapath and control',
  domain: 'engineering',
  promptTemplate: `Create a digital system design diagram:
- System function: {{systemFunction}}
- Datapath components: {{datapathComponents}}
- Control unit: {{controlUnit}}
- State machine: {{stateMachine}}
- Timing: {{timing}}
- Interface signals: {{interfaceSignals}}
- Clock domains: {{clockDomains}}
{{#additionalNotes}}Design specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'systemFunction',
    'datapathComponents',
    'controlUnit',
    'stateMachine',
    'timing',
    'interfaceSignals',
    'clockDomains',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Control["Control Unit"]
        FSM["State\\nMachine"]
        DEC["Decoder"]
    end
    subgraph Datapath["Datapath"]
        REG["Registers"]
        ALU["ALU"]
        MUX["Multiplexers"]
    end
    subgraph IO["I/O"]
        IN["Input"]
        OUT["Output"]
    end
    IN --> REG
    FSM --> DEC --> MUX
    REG --> ALU --> REG
    MUX --> ALU
    REG --> OUT
    style FSM fill:#10b981,color:#fff
    style ALU fill:#3b82f6,color:#fff`,
};

/**
 * State Machine Design template
 */
export const stateMachineDesign: DiagramTemplate = {
  id: 'comp-state-machine',
  name: 'State Machine Design',
  description: 'Finite state machine design and implementation',
  domain: 'engineering',
  promptTemplate: `Create a state machine design diagram:
- Machine type: {{machineType}}
- States: {{states}}
- Inputs: {{inputs}}
- Outputs: {{outputs}}
- State transitions: {{stateTransitions}}
- Reset behavior: {{resetBehavior}}
- Encoding: {{encoding}}
{{#additionalNotes}}Implementation notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'machineType',
    'states',
    'inputs',
    'outputs',
    'stateTransitions',
    'resetBehavior',
    'encoding',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    IDLE["IDLE"] -->|"start"| FETCH["FETCH"]
    FETCH -->|"ready"| DECODE["DECODE"]
    DECODE -->|"op=add"| EXECUTE["EXECUTE"]
    DECODE -->|"op=load"| MEMORY["MEMORY"]
    EXECUTE -->|"done"| IDLE
    MEMORY -->|"done"| IDLE
    style IDLE fill:#10b981,color:#fff
    style EXECUTE fill:#3b82f6,color:#fff
    style MEMORY fill:#f59e0b,color:#fff`,
};

// =============================================================================
// NETWORK ARCHITECTURE
// =============================================================================

/**
 * Network-on-Chip template
 */
export const networkOnChip: DiagramTemplate = {
  id: 'comp-noc',
  name: 'Network-on-Chip Design',
  description: 'On-chip interconnection network architecture',
  domain: 'engineering',
  promptTemplate: `Create a Network-on-Chip design diagram:
- Topology: {{topology}}
- Router architecture: {{routerArchitecture}}
- Routing algorithm: {{routingAlgorithm}}
- Flow control: {{flowControl}}
- Virtual channels: {{virtualChannels}}
- Nodes: {{nodes}}
- Performance: {{performance}}
{{#additionalNotes}}NoC specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'topology',
    'routerArchitecture',
    'routingAlgorithm',
    'flowControl',
    'virtualChannels',
    'nodes',
    'performance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Mesh["2D Mesh NoC"]
        R00["Router\\n(0,0)"]
        R01["Router\\n(0,1)"]
        R10["Router\\n(1,0)"]
        R11["Router\\n(1,1)"]
    end
    subgraph Cores["Processing Elements"]
        C0["Core 0"]
        C1["Core 1"]
        C2["Core 2"]
        C3["Core 3"]
    end
    R00 --- R01
    R00 --- R10
    R01 --- R11
    R10 --- R11
    C0 --> R00
    C1 --> R01
    C2 --> R10
    C3 --> R11
    style R00 fill:#10b981,color:#fff
    style R11 fill:#10b981,color:#fff`,
};

/**
 * Network Interface Card template
 */
export const networkInterfaceCard: DiagramTemplate = {
  id: 'comp-nic',
  name: 'Network Interface Card Design',
  description: 'Network adapter hardware architecture',
  domain: 'engineering',
  promptTemplate: `Create a network interface card design diagram:
- Interface standard: {{interfaceStandard}}
- MAC controller: {{macController}}
- PHY: {{phy}}
- DMA engine: {{dmaEngine}}
- Packet buffers: {{packetBuffers}}
- Offload engines: {{offloadEngines}}
- Host interface: {{hostInterface}}
{{#additionalNotes}}Performance specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'interfaceStandard',
    'macController',
    'phy',
    'dmaEngine',
    'packetBuffers',
    'offloadEngines',
    'hostInterface',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Host["Host Interface"]
        PCIE["PCIe\\nController"]
        DMA["DMA\\nEngine"]
    end
    subgraph NIC["NIC Core"]
        BUF["Packet\\nBuffers"]
        MAC["MAC\\nController"]
        OFF["Offload\\n(TSO/RSS)"]
    end
    subgraph Network["Network"]
        PHY["PHY\\n10GbE"]
        CON["Connector"]
    end
    PCIE --> DMA --> BUF
    BUF --> MAC --> PHY --> CON
    OFF --> MAC
    style MAC fill:#10b981,color:#fff
    style PHY fill:#3b82f6,color:#fff`,
};

// =============================================================================
// SECURITY
// =============================================================================

/**
 * Hardware Security Module template
 */
export const hardwareSecurityModule: DiagramTemplate = {
  id: 'comp-hsm',
  name: 'Hardware Security Module',
  description: 'Cryptographic hardware security architecture',
  domain: 'engineering',
  promptTemplate: `Create a hardware security module design diagram:
- Crypto engines: {{cryptoEngines}}
- Key storage: {{keyStorage}}
- Random number generator: {{rng}}
- Tamper protection: {{tamperProtection}}
- Secure boot: {{secureBoot}}
- Interface: {{interface}}
- Certification: {{certification}}
{{#additionalNotes}}Security requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'cryptoEngines',
    'keyStorage',
    'rng',
    'tamperProtection',
    'secureBoot',
    'interface',
    'certification',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph HSM["HSM Module"]
        CPU["Secure\\nProcessor"]
        AES["AES\\nEngine"]
        RSA["RSA\\nEngine"]
        RNG["TRNG"]
    end
    subgraph Keys["Key Management"]
        KS["Key\\nStorage"]
        KW["Key\\nWrapping"]
    end
    subgraph Protection["Security"]
        TP["Tamper\\nDetection"]
        SB["Secure\\nBoot"]
    end
    CPU --> AES & RSA
    RNG --> CPU
    CPU --> KS --> KW
    TP --> CPU
    SB --> CPU
    style CPU fill:#dc2626,color:#fff
    style KS fill:#10b981,color:#fff`,
};

// =============================================================================
// SOFTWARE & CLOUD ARCHITECTURE
// =============================================================================

/**
 * Cloud Architecture template
 */
export const cloudArchitecture: DiagramTemplate = {
  id: 'comp-cloud-architecture',
  name: 'Cloud Architecture Diagram',
  description: 'Cloud infrastructure and services architecture',
  domain: 'engineering',
  promptTemplate: `Create a cloud architecture diagram:
- Cloud provider: {{cloudProvider}}
- Compute services: {{computeServices}}
- Storage solutions: {{storageServices}}
- Database services: {{databaseServices}}
- Networking: {{networking}}
- Security layers: {{securityLayers}}
- Monitoring: {{monitoring}}
{{#additionalNotes}}Design considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'cloudProvider',
    'computeServices',
    'storageServices',
    'databaseServices',
    'networking',
    'securityLayers',
    'monitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Users["Users"]
        WEB["Web Clients"]
        MOB["Mobile Apps"]
    end
    subgraph Edge["Edge Layer"]
        CDN["CDN"]
        WAF["WAF"]
        LB["Load Balancer"]
    end
    subgraph Compute["Compute"]
        K8S["Kubernetes\\nCluster"]
        LAMBDA["Lambda\\nFunctions"]
    end
    subgraph Data["Data Layer"]
        RDS["RDS\\nPostgreSQL"]
        REDIS["ElastiCache\\nRedis"]
        S3["S3\\nStorage"]
    end
    WEB & MOB --> CDN --> WAF --> LB
    LB --> K8S & LAMBDA
    K8S --> RDS & REDIS
    LAMBDA --> S3
    style K8S fill:#3b82f6,color:#fff
    style RDS fill:#10b981,color:#fff`,
};

/**
 * Microservices Architecture template
 */
export const microservicesArchitecture: DiagramTemplate = {
  id: 'comp-microservices',
  name: 'Microservices Architecture',
  description: 'Distributed microservices system design',
  domain: 'engineering',
  promptTemplate: `Create a microservices architecture diagram:
- Services: {{services}}
- API Gateway: {{apiGateway}}
- Service mesh: {{serviceMesh}}
- Message broker: {{messageBroker}}
- Database per service: {{databases}}
- Service discovery: {{serviceDiscovery}}
- Monitoring stack: {{monitoring}}
{{#additionalNotes}}Architecture patterns: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'services',
    'apiGateway',
    'serviceMesh',
    'messageBroker',
    'databases',
    'serviceDiscovery',
    'monitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Gateway["API Gateway"]
        GW["Kong/Nginx"]
    end
    subgraph Services["Microservices"]
        AUTH["Auth\\nService"]
        USER["User\\nService"]
        ORDER["Order\\nService"]
        PAY["Payment\\nService"]
    end
    subgraph Data["Data Stores"]
        DB1["Users DB"]
        DB2["Orders DB"]
        CACHE["Redis"]
    end
    subgraph Messaging["Event Bus"]
        KAFKA["Kafka"]
    end
    GW --> AUTH & USER & ORDER & PAY
    AUTH --> CACHE
    USER --> DB1
    ORDER --> DB2 & KAFKA
    PAY --> KAFKA
    style GW fill:#3b82f6,color:#fff
    style KAFKA fill:#f59e0b,color:#fff`,
};

/**
 * Database Schema Design template
 */
export const databaseSchema: DiagramTemplate = {
  id: 'comp-database-schema',
  name: 'Database Schema Design',
  description: 'Relational database entity-relationship diagram',
  domain: 'engineering',
  promptTemplate: `Create a database schema diagram:
- Database type: {{databaseType}}
- Main entities: {{entities}}
- Relationships: {{relationships}}
- Primary keys: {{primaryKeys}}
- Foreign keys: {{foreignKeys}}
- Indexes: {{indexes}}
- Constraints: {{constraints}}
{{#additionalNotes}}Normalization notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'databaseType',
    'entities',
    'relationships',
    'primaryKeys',
    'foreignKeys',
    'indexes',
    'constraints',
    'additionalNotes',
  ],
  mermaidExample: `erDiagram
    USERS {
        int id PK
        string email UK
        string password_hash
        datetime created_at
    }
    ORDERS {
        int id PK
        int user_id FK
        decimal total
        string status
        datetime created_at
    }
    ORDER_ITEMS {
        int id PK
        int order_id FK
        int product_id FK
        int quantity
        decimal price
    }
    PRODUCTS {
        int id PK
        string name
        decimal price
        int stock
    }
    USERS ||--o{ ORDERS : places
    ORDERS ||--|{ ORDER_ITEMS : contains
    PRODUCTS ||--o{ ORDER_ITEMS : "included in"`,
};

/**
 * Neural Network Architecture template
 */
export const neuralNetworkArchitecture: DiagramTemplate = {
  id: 'comp-neural-network',
  name: 'Neural Network Architecture',
  description: 'Deep learning neural network structure',
  domain: 'engineering',
  promptTemplate: `Create a neural network architecture diagram:
- Network type: {{networkType}}
- Input layer: {{inputLayer}}
- Hidden layers: {{hiddenLayers}}
- Output layer: {{outputLayer}}
- Activation functions: {{activations}}
- Regularization: {{regularization}}
- Training details: {{training}}
{{#additionalNotes}}Model notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'networkType',
    'inputLayer',
    'hiddenLayers',
    'outputLayer',
    'activations',
    'regularization',
    'training',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Input["Input Layer"]
        I1["x1"]
        I2["x2"]
        I3["x3"]
    end
    subgraph H1["Hidden 1 (ReLU)"]
        H1N1["n1"]
        H1N2["n2"]
        H1N3["n3"]
        H1N4["n4"]
    end
    subgraph H2["Hidden 2 (ReLU)"]
        H2N1["n1"]
        H2N2["n2"]
        H2N3["n3"]
    end
    subgraph Output["Output (Softmax)"]
        O1["Class A"]
        O2["Class B"]
    end
    I1 & I2 & I3 --> H1N1 & H1N2 & H1N3 & H1N4
    H1N1 & H1N2 & H1N3 & H1N4 --> H2N1 & H2N2 & H2N3
    H2N1 & H2N2 & H2N3 --> O1 & O2
    style H1 fill:#3b82f6,color:#fff
    style H2 fill:#10b981,color:#fff`,
};

/**
 * CI/CD Pipeline template
 */
export const cicdPipeline: DiagramTemplate = {
  id: 'comp-cicd-pipeline',
  name: 'CI/CD Pipeline Design',
  description: 'Continuous integration and deployment workflow',
  domain: 'engineering',
  promptTemplate: `Create a CI/CD pipeline diagram:
- Source control: {{sourceControl}}
- Build stage: {{buildStage}}
- Test stages: {{testStages}}
- Security scans: {{securityScans}}
- Deployment stages: {{deploymentStages}}
- Environments: {{environments}}
- Rollback strategy: {{rollback}}
{{#additionalNotes}}Pipeline notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sourceControl',
    'buildStage',
    'testStages',
    'securityScans',
    'deploymentStages',
    'environments',
    'rollback',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Source["Source"]
        GIT["Git Push"]
    end
    subgraph Build["Build"]
        COMPILE["Compile"]
        DOCKER["Docker\\nBuild"]
    end
    subgraph Test["Testing"]
        UNIT["Unit\\nTests"]
        INT["Integration\\nTests"]
        SEC["Security\\nScan"]
    end
    subgraph Deploy["Deploy"]
        DEV["Dev"]
        STG["Staging"]
        PROD["Production"]
    end
    GIT --> COMPILE --> DOCKER
    DOCKER --> UNIT --> INT --> SEC
    SEC --> DEV --> STG --> PROD
    style GIT fill:#6b7280,color:#fff
    style PROD fill:#dc2626,color:#fff`,
};

/**
 * Operating System Architecture template
 */
export const osArchitecture: DiagramTemplate = {
  id: 'comp-os-architecture',
  name: 'Operating System Architecture',
  description: 'OS kernel and system architecture',
  domain: 'engineering',
  promptTemplate: `Create an operating system architecture diagram:
- OS type: {{osType}}
- Kernel architecture: {{kernelArchitecture}}
- Process management: {{processManagement}}
- Memory management: {{memoryManagement}}
- File system: {{fileSystem}}
- Device drivers: {{deviceDrivers}}
- System calls: {{systemCalls}}
{{#additionalNotes}}Design notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'osType',
    'kernelArchitecture',
    'processManagement',
    'memoryManagement',
    'fileSystem',
    'deviceDrivers',
    'systemCalls',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph User["User Space"]
        APP["Applications"]
        LIB["System Libraries"]
    end
    subgraph Kernel["Kernel Space"]
        SC["System Call\\nInterface"]
        PM["Process\\nManager"]
        MM["Memory\\nManager"]
        VFS["Virtual\\nFile System"]
        NET["Network\\nStack"]
        DD["Device\\nDrivers"]
    end
    subgraph HW["Hardware"]
        CPU["CPU"]
        MEM["Memory"]
        DISK["Storage"]
        NIC["Network"]
    end
    APP --> LIB --> SC
    SC --> PM & MM & VFS & NET
    VFS --> DD
    NET --> DD
    DD --> CPU & MEM & DISK & NIC
    style Kernel fill:#3b82f6,color:#fff
    style HW fill:#6b7280,color:#fff`,
};

/**
 * Algorithm Complexity Analysis template
 */
export const algorithmComplexity: DiagramTemplate = {
  id: 'comp-algorithm-complexity',
  name: 'Algorithm Complexity Analysis',
  description: 'Big O notation and complexity comparison',
  domain: 'engineering',
  promptTemplate: `Create an algorithm complexity analysis diagram:
- Algorithm name: {{algorithmName}}
- Time complexity: {{timeComplexity}}
- Space complexity: {{spaceComplexity}}
- Best case: {{bestCase}}
- Average case: {{averageCase}}
- Worst case: {{worstCase}}
- Comparison algorithms: {{comparisonAlgorithms}}
{{#additionalNotes}}Analysis notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'algorithmName',
    'timeComplexity',
    'spaceComplexity',
    'bestCase',
    'averageCase',
    'worstCase',
    'comparisonAlgorithms',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Complexity["Time Complexity"]
        O1["O(1)\\nConstant"]
        OLOGN["O(log n)\\nLogarithmic"]
        ON["O(n)\\nLinear"]
        ONLOGN["O(n log n)\\nLinearithmic"]
        ON2["O(n²)\\nQuadratic"]
    end
    subgraph Examples["Algorithm Examples"]
        E1["Array Access"]
        E2["Binary Search"]
        E3["Linear Search"]
        E4["Merge Sort"]
        E5["Bubble Sort"]
    end
    O1 --- E1
    OLOGN --- E2
    ON --- E3
    ONLOGN --- E4
    ON2 --- E5
    style O1 fill:#10b981,color:#fff
    style ON2 fill:#dc2626,color:#fff`,
};

/**
 * Data Flow Diagram template
 */
export const dataFlowDiagram: DiagramTemplate = {
  id: 'comp-data-flow',
  name: 'Data Flow Diagram',
  description: 'System data flow and process visualization',
  domain: 'engineering',
  promptTemplate: `Create a data flow diagram:
- System name: {{systemName}}
- External entities: {{externalEntities}}
- Processes: {{processes}}
- Data stores: {{dataStores}}
- Data flows: {{dataFlows}}
- Level of detail: {{levelOfDetail}}
- Security boundaries: {{securityBoundaries}}
{{#additionalNotes}}DFD notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'systemName',
    'externalEntities',
    'processes',
    'dataStores',
    'dataFlows',
    'levelOfDetail',
    'securityBoundaries',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph External["External Entities"]
        CUST["Customer"]
        BANK["Bank"]
    end
    subgraph System["E-Commerce System"]
        P1["1.0\\nProcess\\nOrder"]
        P2["2.0\\nValidate\\nPayment"]
        P3["3.0\\nUpdate\\nInventory"]
    end
    subgraph Stores["Data Stores"]
        D1[("Orders\\nDB")]
        D2[("Products\\nDB")]
    end
    CUST -->|"Order Details"| P1
    P1 -->|"Payment Request"| P2
    P2 -->|"Auth Request"| BANK
    BANK -->|"Auth Response"| P2
    P1 -->|"Order Data"| D1
    P1 -->|"Update Stock"| P3
    P3 -->|"Stock Update"| D2
    style P1 fill:#3b82f6,color:#fff
    style P2 fill:#10b981,color:#fff`,
};

/**
 * Cybersecurity Threat Model template
 */
export const threatModel: DiagramTemplate = {
  id: 'comp-threat-model',
  name: 'Cybersecurity Threat Model',
  description: 'Security threat modeling and attack surface analysis',
  domain: 'engineering',
  promptTemplate: `Create a cybersecurity threat model diagram:
- System components: {{systemComponents}}
- Trust boundaries: {{trustBoundaries}}
- Entry points: {{entryPoints}}
- Threats (STRIDE): {{threats}}
- Mitigations: {{mitigations}}
- Risk levels: {{riskLevels}}
- Data sensitivity: {{dataSensitivity}}
{{#additionalNotes}}Security notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'systemComponents',
    'trustBoundaries',
    'entryPoints',
    'threats',
    'mitigations',
    'riskLevels',
    'dataSensitivity',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph External["Untrusted Zone"]
        ATK["Attacker"]
        USER["User"]
    end
    subgraph DMZ["DMZ"]
        WAF["WAF"]
        LB["Load Balancer"]
    end
    subgraph Internal["Trusted Zone"]
        APP["Application\\nServer"]
        DB["Database"]
    end
    ATK -->|"1. SQL Injection"| WAF
    USER -->|"HTTPS"| WAF
    WAF -->|"Filtered"| LB
    LB --> APP
    APP -->|"Encrypted"| DB
    style ATK fill:#dc2626,color:#fff
    style WAF fill:#f59e0b,color:#fff
    style DB fill:#10b981,color:#fff`,
};

/**
 * UML Class Diagram template
 */
export const umlClassDiagram: DiagramTemplate = {
  id: 'comp-uml-class',
  name: 'UML Class Diagram',
  description: 'Object-oriented class relationships',
  domain: 'engineering',
  promptTemplate: `Create a UML class diagram:
- Classes: {{classes}}
- Attributes: {{attributes}}
- Methods: {{methods}}
- Inheritance: {{inheritance}}
- Associations: {{associations}}
- Composition/Aggregation: {{composition}}
- Interfaces: {{interfaces}}
{{#additionalNotes}}Design patterns: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'classes',
    'attributes',
    'methods',
    'inheritance',
    'associations',
    'composition',
    'interfaces',
    'additionalNotes',
  ],
  mermaidExample: `classDiagram
    class Animal {
        +String name
        +int age
        +makeSound() void
        +move() void
    }
    class Dog {
        +String breed
        +bark() void
        +fetch() void
    }
    class Cat {
        +boolean indoor
        +meow() void
        +climb() void
    }
    class Owner {
        +String name
        +List~Animal~ pets
        +feed(Animal) void
    }
    Animal <|-- Dog
    Animal <|-- Cat
    Owner "1" --> "*" Animal : owns`,
};

// =============================================================================
// Export all templates
// =============================================================================

export const computerTemplates: DiagramTemplate[] = [
  // Processor Design
  cpuArchitecture,
  pipelineDesign,
  multicoreProcessor,
  // Memory Systems
  memoryHierarchy,
  cacheDesign,
  virtualMemorySystem,
  // Computer Architecture
  systemBusArchitecture,
  ioSystemArchitecture,
  gpuArchitecture,
  // Embedded Systems
  microcontrollerSystem,
  fpgaSystemDesign,
  realTimeSystem,
  // Digital Logic Design
  digitalSystemDesign,
  stateMachineDesign,
  // Network Architecture
  networkOnChip,
  networkInterfaceCard,
  // Security
  hardwareSecurityModule,
  // Software & Cloud Architecture
  cloudArchitecture,
  microservicesArchitecture,
  databaseSchema,
  neuralNetworkArchitecture,
  cicdPipeline,
  osArchitecture,
  algorithmComplexity,
  dataFlowDiagram,
  threatModel,
  umlClassDiagram,
];
