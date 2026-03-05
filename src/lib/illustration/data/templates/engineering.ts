/**
 * engineering.ts
 * Engineering diagram templates for FINNISH
 *
 * Contains templates for system design, software architecture,
 * and technical documentation diagrams.
 */

import type { DiagramTemplate } from './index';

/**
 * Block Diagram template
 */
export const blockDiagram: DiagramTemplate = {
  id: 'eng-block-diagram',
  name: 'Block Diagram',
  description:
    'System block diagram showing functional components and signal flow',
  domain: 'engineering',
  promptTemplate: `Create a block diagram:
- System name: {{systemName}}
- Input signals: {{inputs}}
- Output signals: {{outputs}}
- Processing blocks: {{processingBlocks}}
- Feedback loops: {{feedbackLoops}}
- Control signals: {{controlSignals}}
- Signal types: {{signalTypes}}
- Interfaces: {{interfaces}}
- Subsystem boundaries: {{subsystems}}`,
  placeholders: [
    'systemName',
    'inputs',
    'outputs',
    'processingBlocks',
    'feedbackLoops',
    'controlSignals',
    'signalTypes',
    'interfaces',
    'subsystems',
  ],
  mermaidExample: `flowchart LR
    subgraph input["Input Stage"]
        sensor["Sensor<br/>Input"]
        adc["ADC"]
    end

    subgraph processing["Processing"]
        filter["Digital<br/>Filter"]
        controller["PID<br/>Controller"]
    end

    subgraph output["Output Stage"]
        dac["DAC"]
        actuator["Actuator"]
    end

    subgraph feedback["Feedback"]
        fb_sensor["Feedback<br/>Sensor"]
    end

    sensor -->|"Analog"| adc
    adc -->|"Digital"| filter
    filter --> controller
    controller -->|"Control Signal"| dac
    dac -->|"Analog"| actuator
    actuator -->|"Physical"| fb_sensor
    fb_sensor -->|"Feedback"| controller

    classDef input fill:#dbeafe,stroke:#2563eb
    classDef process fill:#fef3c7,stroke:#d97706
    classDef output fill:#dcfce7,stroke:#16a34a
    classDef feedback fill:#f3e8ff,stroke:#9333ea

    class sensor,adc input
    class filter,controller process
    class dac,actuator output
    class fb_sensor feedback`,
};

/**
 * State Machine template
 */
export const stateMachine: DiagramTemplate = {
  id: 'eng-state-machine',
  name: 'State Machine',
  description:
    'Finite state machine diagram showing states, transitions, and events',
  domain: 'engineering',
  promptTemplate: `Create a state machine diagram:
- System/component name: {{systemName}}
- Initial state: {{initialState}}
- Final/accepting states: {{finalStates}}
- All states: {{states}}
- Transitions: {{transitions}}
- Events/triggers: {{events}}
- Guards/conditions: {{guards}}
- Actions: {{actions}}
- State entry/exit actions: {{entryExitActions}}`,
  placeholders: [
    'systemName',
    'initialState',
    'finalStates',
    'states',
    'transitions',
    'events',
    'guards',
    'actions',
    'entryExitActions',
  ],
  mermaidExample: `stateDiagram-v2
    [*] --> Idle

    Idle --> Processing : start / initBuffer()
    Processing --> Waiting : dataReady / sendData()
    Waiting --> Processing : ack / processNext()
    Waiting --> Error : timeout / logError()
    Processing --> Complete : done / cleanup()
    Error --> Idle : reset / clearError()
    Complete --> Idle : restart
    Complete --> [*] : shutdown

    state Processing {
        [*] --> Reading
        Reading --> Validating : readComplete
        Validating --> Transforming : valid
        Validating --> Reading : invalid
        Transforming --> [*] : transformed
    }`,
};

/**
 * Flowchart template
 */
export const flowchart: DiagramTemplate = {
  id: 'eng-flowchart',
  name: 'Flowchart',
  description:
    'Process flowchart showing steps, decisions, and control flow',
  domain: 'engineering',
  promptTemplate: `Create a flowchart:
- Process name: {{processName}}
- Start condition: {{startCondition}}
- Process steps: {{processSteps}}
- Decision points: {{decisionPoints}}
- Parallel processes: {{parallelProcesses}}
- Loop structures: {{loops}}
- End conditions: {{endConditions}}
- Error handling: {{errorHandling}}
- Swimlanes (if applicable): {{swimlanes}}`,
  placeholders: [
    'processName',
    'startCondition',
    'processSteps',
    'decisionPoints',
    'parallelProcesses',
    'loops',
    'endConditions',
    'errorHandling',
    'swimlanes',
  ],
  mermaidExample: `flowchart TB
    start(["Start"])

    input["Receive Input"]
    validate{"Valid Input?"}

    process1["Process Data"]
    process2["Transform Data"]

    check{"Quality Check<br/>Passed?"}

    output["Generate Output"]
    error["Log Error"]
    retry{"Retry?"}

    finish(["End"])

    start --> input
    input --> validate
    validate -->|Yes| process1
    validate -->|No| error
    process1 --> process2
    process2 --> check
    check -->|Yes| output
    check -->|No| error
    error --> retry
    retry -->|Yes| input
    retry -->|No| finish
    output --> finish

    classDef start fill:#dcfce7,stroke:#16a34a
    classDef process fill:#dbeafe,stroke:#2563eb
    classDef decision fill:#fef3c7,stroke:#d97706
    classDef error fill:#fee2e2,stroke:#dc2626

    class start,finish start
    class input,process1,process2,output process
    class validate,check,retry decision
    class error error`,
};

/**
 * Network Topology template
 */
export const networkTopology: DiagramTemplate = {
  id: 'eng-network-topology',
  name: 'Network Topology',
  description:
    'Network diagram showing nodes, connections, and infrastructure',
  domain: 'engineering',
  promptTemplate: `Create a network topology diagram:
- Network type: {{networkType}}
- Topology style: {{topologyStyle}}
- Nodes/devices: {{nodes}}
- Connections: {{connections}}
- Subnets: {{subnets}}
- IP addressing: {{ipAddressing}}
- Protocols: {{protocols}}
- Security zones: {{securityZones}}
- Bandwidth/capacity: {{bandwidth}}
- Redundancy: {{redundancy}}`,
  placeholders: [
    'networkType',
    'topologyStyle',
    'nodes',
    'connections',
    'subnets',
    'ipAddressing',
    'protocols',
    'securityZones',
    'bandwidth',
    'redundancy',
  ],
  mermaidExample: `flowchart TB
    subgraph internet["Internet"]
        cloud["Cloud<br/>Services"]
    end

    subgraph dmz["DMZ (10.0.1.0/24)"]
        fw1["Firewall"]
        lb["Load<br/>Balancer"]
        web1["Web Server 1"]
        web2["Web Server 2"]
    end

    subgraph internal["Internal Network (10.0.2.0/24)"]
        fw2["Internal<br/>Firewall"]
        app1["App Server 1"]
        app2["App Server 2"]
    end

    subgraph data["Data Tier (10.0.3.0/24)"]
        db1["Primary DB"]
        db2["Replica DB"]
    end

    cloud --> fw1
    fw1 --> lb
    lb --> web1
    lb --> web2
    web1 --> fw2
    web2 --> fw2
    fw2 --> app1
    fw2 --> app2
    app1 --> db1
    app2 --> db1
    db1 -.->|"replication"| db2

    classDef internet fill:#f3e8ff,stroke:#9333ea
    classDef dmz fill:#fef3c7,stroke:#d97706
    classDef internal fill:#dbeafe,stroke:#2563eb
    classDef data fill:#dcfce7,stroke:#16a34a

    class cloud internet
    class fw1,lb,web1,web2 dmz
    class fw2,app1,app2 internal
    class db1,db2 data`,
};

/**
 * Data Flow Diagram template
 */
export const dataFlowDiagram: DiagramTemplate = {
  id: 'eng-data-flow',
  name: 'Data Flow Diagram',
  description:
    'DFD showing data movement between processes, stores, and external entities',
  domain: 'engineering',
  promptTemplate: `Create a data flow diagram:
- System name: {{systemName}}
- DFD level: {{dfdLevel}}
- External entities: {{externalEntities}}
- Processes: {{processes}}
- Data stores: {{dataStores}}
- Data flows: {{dataFlows}}
- Data transformations: {{transformations}}
- Security boundaries: {{securityBoundaries}}`,
  placeholders: [
    'systemName',
    'dfdLevel',
    'externalEntities',
    'processes',
    'dataStores',
    'dataFlows',
    'transformations',
    'securityBoundaries',
  ],
  mermaidExample: `flowchart LR
    subgraph external["External Entities"]
        customer["Customer"]
        supplier["Supplier"]
    end

    subgraph processes["Processes"]
        p1(["1.0<br/>Process<br/>Order"])
        p2(["2.0<br/>Manage<br/>Inventory"])
        p3(["3.0<br/>Generate<br/>Reports"])
    end

    subgraph stores["Data Stores"]
        d1[("D1: Orders")]
        d2[("D2: Inventory")]
        d3[("D3: Customers")]
    end

    customer -->|"Order Request"| p1
    p1 -->|"Order Confirmation"| customer
    p1 -->|"Order Data"| d1
    p1 -->|"Inventory Query"| p2
    p2 -->|"Stock Level"| p1
    p2 <-->|"Inventory Data"| d2
    supplier -->|"Supply Info"| p2
    p2 -->|"Reorder Request"| supplier
    d1 -->|"Order History"| p3
    d2 -->|"Stock Data"| p3
    d3 -->|"Customer Data"| p3
    p3 -->|"Reports"| customer

    classDef external fill:#f3e8ff,stroke:#9333ea
    classDef process fill:#dbeafe,stroke:#2563eb
    classDef store fill:#dcfce7,stroke:#16a34a

    class customer,supplier external
    class p1,p2,p3 process
    class d1,d2,d3 store`,
};

/**
 * UML Class Diagram template
 */
export const umlClassDiagram: DiagramTemplate = {
  id: 'eng-uml-class',
  name: 'UML Class Diagram',
  description:
    'UML class diagram showing classes, attributes, methods, and relationships',
  domain: 'engineering',
  promptTemplate: `Create a UML class diagram:
- System/module name: {{systemName}}
- Classes: {{classes}}
- Attributes for each class: {{attributes}}
- Methods for each class: {{methods}}
- Inheritance relationships: {{inheritance}}
- Associations: {{associations}}
- Aggregation/composition: {{aggregation}}
- Interfaces: {{interfaces}}
- Abstract classes: {{abstractClasses}}
- Visibility modifiers: {{visibility}}`,
  placeholders: [
    'systemName',
    'classes',
    'attributes',
    'methods',
    'inheritance',
    'associations',
    'aggregation',
    'interfaces',
    'abstractClasses',
    'visibility',
  ],
  mermaidExample: `classDiagram
    class Animal {
        <<abstract>>
        -String name
        -int age
        +getName() String
        +getAge() int
        +makeSound()* void
    }

    class Dog {
        -String breed
        +fetch() void
        +makeSound() void
    }

    class Cat {
        -boolean isIndoor
        +scratch() void
        +makeSound() void
    }

    class Owner {
        -String name
        -List~Animal~ pets
        +addPet(Animal) void
        +feedAll() void
    }

    class Veterinarian {
        -String specialty
        +examine(Animal) Report
        +vaccinate(Animal) void
    }

    Animal <|-- Dog : extends
    Animal <|-- Cat : extends
    Owner "1" --> "*" Animal : owns
    Veterinarian --> Animal : treats`,
};

/**
 * Control System Diagram template
 */
export const controlSystemDiagram: DiagramTemplate = {
  id: 'eng-control-system',
  name: 'Control System Diagram',
  description:
    'Feedback control system diagram showing controllers, sensors, and plant dynamics',
  domain: 'engineering',
  promptTemplate: `Create a control system diagram:
- System name: {{systemName}}
- Controller type: {{controllerType}}
- Plant/Process: {{plant}}
- Setpoint input: {{setpoint}}
- Feedback sensors: {{sensors}}
- Disturbances: {{disturbances}}
- Control signal path: {{controlPath}}
- Transfer functions: {{transferFunctions}}`,
  placeholders: [
    'systemName',
    'controllerType',
    'plant',
    'setpoint',
    'sensors',
    'disturbances',
    'controlPath',
    'transferFunctions',
  ],
  mermaidExample: `flowchart LR
    subgraph Input["Reference Input"]
        R["Setpoint<br/>r(t)"]
    end

    subgraph Controller["Controller"]
        SUM((" + "))
        PID["PID<br/>Controller"]
    end

    subgraph Plant["Plant"]
        ACT["Actuator"]
        PROC["Process<br/>G(s)"]
    end

    subgraph Output["Output"]
        Y["Output<br/>y(t)"]
    end

    subgraph Feedback["Feedback"]
        SENS["Sensor<br/>H(s)"]
    end

    R --> SUM
    SUM -->|"e(t)"| PID
    PID -->|"u(t)"| ACT
    ACT --> PROC
    PROC --> Y
    Y --> SENS
    SENS -->|"-"| SUM

    classDef input fill:#dbeafe,stroke:#2563eb
    classDef controller fill:#fef3c7,stroke:#d97706
    classDef plant fill:#dcfce7,stroke:#16a34a
    classDef feedback fill:#f3e8ff,stroke:#9333ea

    class R input
    class SUM,PID controller
    class ACT,PROC plant
    class SENS feedback`,
};

/**
 * P&ID (Piping and Instrumentation Diagram) template
 */
export const pidDiagram: DiagramTemplate = {
  id: 'eng-pid-diagram',
  name: 'P&ID Diagram',
  description:
    'Piping and instrumentation diagram for process engineering',
  domain: 'engineering',
  promptTemplate: `Create a P&ID diagram:
- Process name: {{processName}}
- Equipment list: {{equipment}}
- Piping connections: {{piping}}
- Instruments: {{instruments}}
- Control valves: {{controlValves}}
- Safety devices: {{safetyDevices}}
- Process streams: {{streams}}
- Operating conditions: {{conditions}}`,
  placeholders: [
    'processName',
    'equipment',
    'piping',
    'instruments',
    'controlValves',
    'safetyDevices',
    'streams',
    'conditions',
  ],
  mermaidExample: `flowchart TB
    subgraph Feed["Feed System"]
        T101["T-101<br/>Feed Tank"]
        P101["P-101<br/>Feed Pump"]
    end

    subgraph Process["Process Unit"]
        HX101["HX-101<br/>Preheater"]
        R101["R-101<br/>Reactor"]
        HX102["HX-102<br/>Cooler"]
    end

    subgraph Separation["Separation"]
        V101["V-101<br/>Flash Drum"]
        T102["T-102<br/>Product Tank"]
    end

    subgraph Instruments["Instrumentation"]
        FIC["FIC-101"]
        TIC["TIC-101"]
        PIC["PIC-101"]
        LIC["LIC-101"]
    end

    T101 --> P101
    P101 -->|"FIC-101"| HX101
    HX101 --> R101
    R101 -->|"TIC-101"| HX102
    HX102 -->|"PIC-101"| V101
    V101 -->|"LIC-101"| T102

    classDef tank fill:#dbeafe,stroke:#2563eb
    classDef pump fill:#dcfce7,stroke:#16a34a
    classDef hx fill:#fef3c7,stroke:#d97706
    classDef reactor fill:#fee2e2,stroke:#dc2626

    class T101,T102 tank
    class P101 pump
    class HX101,HX102 hx
    class R101 reactor`,
};

/**
 * Manufacturing Process Flow template
 */
export const manufacturingProcessFlow: DiagramTemplate = {
  id: 'eng-manufacturing-flow',
  name: 'Manufacturing Process Flow',
  description:
    'Manufacturing process flow diagram showing production steps and quality checkpoints',
  domain: 'engineering',
  promptTemplate: `Create a manufacturing process flow:
- Product name: {{productName}}
- Raw materials: {{rawMaterials}}
- Process steps: {{processSteps}}
- Quality checkpoints: {{qcCheckpoints}}
- Equipment used: {{equipment}}
- Cycle times: {{cycleTimes}}
- Rework loops: {{reworkLoops}}
- Output specifications: {{outputSpecs}}`,
  placeholders: [
    'productName',
    'rawMaterials',
    'processSteps',
    'qcCheckpoints',
    'equipment',
    'cycleTimes',
    'reworkLoops',
    'outputSpecs',
  ],
  mermaidExample: `flowchart TB
    subgraph Receiving["Incoming"]
        RAW["Raw Materials<br/>Receiving"]
        IQC["Incoming QC"]
    end

    subgraph Machining["Machining"]
        CNC["CNC Milling"]
        TURN["Turning"]
        GRIND["Grinding"]
    end

    subgraph Assembly["Assembly"]
        SUB["Sub-Assembly"]
        FINAL["Final Assembly"]
    end

    subgraph QC["Quality Control"]
        CMM["CMM Inspection"]
        TEST["Functional Test"]
    end

    subgraph Output["Output"]
        PACK["Packaging"]
        SHIP["Shipping"]
    end

    RAW --> IQC
    IQC -->|Pass| CNC
    IQC -->|Fail| RAW
    CNC --> TURN --> GRIND
    GRIND --> CMM
    CMM -->|Pass| SUB
    CMM -->|Fail| CNC
    SUB --> FINAL
    FINAL --> TEST
    TEST -->|Pass| PACK --> SHIP
    TEST -->|Fail| SUB

    classDef receive fill:#dbeafe,stroke:#2563eb
    classDef machine fill:#fef3c7,stroke:#d97706
    classDef qc fill:#dcfce7,stroke:#16a34a
    classDef fail fill:#fee2e2,stroke:#dc2626`,
};

/**
 * Electrical Schematic template
 */
export const electricalSchematic: DiagramTemplate = {
  id: 'eng-electrical-schematic',
  name: 'Electrical Schematic',
  description:
    'Electrical circuit schematic showing components and connections',
  domain: 'engineering',
  promptTemplate: `Create an electrical schematic:
- Circuit name: {{circuitName}}
- Power supply: {{powerSupply}}
- Components: {{components}}
- Connections: {{connections}}
- Ground references: {{grounds}}
- Signal paths: {{signalPaths}}
- Protection devices: {{protection}}
- Ratings and values: {{ratings}}`,
  placeholders: [
    'circuitName',
    'powerSupply',
    'components',
    'connections',
    'grounds',
    'signalPaths',
    'protection',
    'ratings',
  ],
  mermaidExample: `flowchart LR
    subgraph Power["Power Supply"]
        VCC["+24V DC"]
        GND["GND"]
    end

    subgraph Protection["Protection"]
        F1["F1<br/>Fuse 2A"]
    end

    subgraph Control["Control Circuit"]
        SW1["SW1<br/>Start"]
        SW2["SW2<br/>Stop"]
        K1["K1<br/>Relay"]
    end

    subgraph Load["Load"]
        M1["M1<br/>Motor"]
        LED1["LED1<br/>Status"]
    end

    VCC --> F1
    F1 --> SW1
    SW1 --> K1
    K1 --> M1
    K1 --> LED1
    M1 --> GND
    LED1 --> GND
    SW2 -.->|"NC"| K1

    classDef power fill:#fee2e2,stroke:#dc2626
    classDef control fill:#dbeafe,stroke:#2563eb
    classDef load fill:#dcfce7,stroke:#16a34a`,
};

/**
 * FMEA (Failure Mode and Effects Analysis) template
 */
export const fmeaDiagram: DiagramTemplate = {
  id: 'eng-fmea',
  name: 'FMEA Diagram',
  description:
    'Failure Mode and Effects Analysis diagram for risk assessment',
  domain: 'engineering',
  promptTemplate: `Create an FMEA diagram:
- System/Process: {{system}}
- Failure modes: {{failureModes}}
- Effects: {{effects}}
- Causes: {{causes}}
- Severity ratings: {{severity}}
- Occurrence ratings: {{occurrence}}
- Detection methods: {{detection}}
- Recommended actions: {{actions}}`,
  placeholders: [
    'system',
    'failureModes',
    'effects',
    'causes',
    'severity',
    'occurrence',
    'detection',
    'actions',
  ],
  mermaidExample: `flowchart TB
    subgraph Component["Component: Pump Seal"]
        FM1["Failure Mode:<br/>Seal Leak"]
    end

    subgraph Effects["Effects"]
        E1["Local: Fluid Loss"]
        E2["System: Pressure Drop"]
        E3["End: Process Shutdown"]
    end

    subgraph Causes["Potential Causes"]
        C1["Wear"]
        C2["Misalignment"]
        C3["Material Degradation"]
    end

    subgraph Controls["Current Controls"]
        D1["Visual Inspection"]
        D2["Pressure Monitoring"]
    end

    subgraph RPN["Risk Assessment"]
        S["Severity: 7"]
        O["Occurrence: 4"]
        D["Detection: 5"]
        RPN1["RPN: 140"]
    end

    FM1 --> E1 --> E2 --> E3
    C1 & C2 & C3 --> FM1
    FM1 --> D1 & D2
    S & O & D --> RPN1

    classDef high fill:#fee2e2,stroke:#dc2626
    classDef med fill:#fef3c7,stroke:#d97706
    classDef low fill:#dcfce7,stroke:#16a34a`,
};

/**
 * Value Stream Map template
 */
export const valueStreamMap: DiagramTemplate = {
  id: 'eng-value-stream',
  name: 'Value Stream Map',
  description:
    'Lean manufacturing value stream map showing material and information flow',
  domain: 'engineering',
  promptTemplate: `Create a value stream map:
- Product family: {{productFamily}}
- Customer demand: {{demand}}
- Process steps: {{processSteps}}
- Cycle times: {{cycleTimes}}
- Inventory levels: {{inventory}}
- Information flow: {{infoFlow}}
- Lead time: {{leadTime}}
- Value-added time: {{valueAdded}}`,
  placeholders: [
    'productFamily',
    'demand',
    'processSteps',
    'cycleTimes',
    'inventory',
    'infoFlow',
    'leadTime',
    'valueAdded',
  ],
  mermaidExample: `flowchart LR
    subgraph Supplier["Supplier"]
        SUP["Raw Material<br/>Supplier"]
    end

    subgraph Production["Production Flow"]
        P1["Stamping<br/>CT: 1s<br/>C/O: 1hr"]
        I1[/"Inventory<br/>4600 pcs"/]
        P2["Welding<br/>CT: 39s<br/>C/O: 10min"]
        I2[/"Inventory<br/>1100 pcs"/]
        P3["Assembly<br/>CT: 62s<br/>C/O: 0"]
    end

    subgraph Customer["Customer"]
        CUST["Customer<br/>18,400 pcs/mo"]
    end

    subgraph Info["Information Flow"]
        MRP["Production<br/>Control"]
    end

    SUP -->|"Weekly"| P1
    P1 --> I1 --> P2
    P2 --> I2 --> P3
    P3 -->|"Daily"| CUST

    MRP -.->|"Weekly Schedule"| SUP
    MRP -.->|"Daily Schedule"| P1 & P2 & P3
    CUST -.->|"Forecast"| MRP

    classDef process fill:#dbeafe,stroke:#2563eb
    classDef inventory fill:#fef3c7,stroke:#d97706`,
};

/**
 * Cause and Effect (Ishikawa) Diagram template
 */
export const ishikawaDiagram: DiagramTemplate = {
  id: 'eng-ishikawa',
  name: 'Ishikawa Diagram',
  description:
    'Fishbone diagram for root cause analysis (6M methodology)',
  domain: 'engineering',
  promptTemplate: `Create an Ishikawa diagram:
- Problem statement: {{problem}}
- Man (People) factors: {{manFactors}}
- Machine factors: {{machineFactors}}
- Material factors: {{materialFactors}}
- Method factors: {{methodFactors}}
- Measurement factors: {{measurementFactors}}
- Environment factors: {{environmentFactors}}`,
  placeholders: [
    'problem',
    'manFactors',
    'machineFactors',
    'materialFactors',
    'methodFactors',
    'measurementFactors',
    'environmentFactors',
  ],
  mermaidExample: `flowchart LR
    subgraph Man["Man (People)"]
        M1["Training"]
        M2["Experience"]
        M3["Fatigue"]
    end

    subgraph Machine["Machine"]
        MC1["Calibration"]
        MC2["Maintenance"]
        MC3["Wear"]
    end

    subgraph Material["Material"]
        MT1["Quality"]
        MT2["Specification"]
        MT3["Storage"]
    end

    subgraph Method["Method"]
        MD1["Procedure"]
        MD2["Sequence"]
        MD3["Parameters"]
    end

    EFFECT["DEFECT:<br/>Out of Spec"]

    M1 & M2 & M3 --> EFFECT
    MC1 & MC2 & MC3 --> EFFECT
    MT1 & MT2 & MT3 --> EFFECT
    MD1 & MD2 & MD3 --> EFFECT

    classDef effect fill:#fee2e2,stroke:#dc2626
    classDef cause fill:#dbeafe,stroke:#2563eb

    class EFFECT effect`,
};

/**
 * Gantt Chart template
 */
export const ganttChartTemplate: DiagramTemplate = {
  id: 'eng-gantt-chart',
  name: 'Gantt Chart',
  description:
    'Project schedule Gantt chart showing tasks, durations, and dependencies',
  domain: 'engineering',
  promptTemplate: `Create a Gantt chart:
- Project name: {{projectName}}
- Tasks: {{tasks}}
- Start dates: {{startDates}}
- Durations: {{durations}}
- Dependencies: {{dependencies}}
- Milestones: {{milestones}}
- Resources: {{resources}}
- Critical path: {{criticalPath}}`,
  placeholders: [
    'projectName',
    'tasks',
    'startDates',
    'durations',
    'dependencies',
    'milestones',
    'resources',
    'criticalPath',
  ],
  mermaidExample: `gantt
    title Project Development Schedule
    dateFormat  YYYY-MM-DD

    section Design
    Requirements     :done,    req, 2024-01-01, 14d
    System Design    :done,    des, after req, 21d
    Detail Design    :active,  det, after des, 14d

    section Development
    Module A         :         modA, after det, 28d
    Module B         :         modB, after det, 21d
    Integration      :         int, after modA modB, 14d

    section Testing
    Unit Testing     :         ut, after modA, 14d
    System Testing   :         st, after int, 21d
    UAT              :         uat, after st, 14d

    section Deployment
    Deployment       :milestone, dep, after uat, 0d`,
};

/**
 * Entity Relationship Diagram template
 */
export const erDiagram: DiagramTemplate = {
  id: 'eng-er-diagram',
  name: 'Entity Relationship Diagram',
  description:
    'Database entity relationship diagram showing tables and relationships',
  domain: 'engineering',
  promptTemplate: `Create an ER diagram:
- Database name: {{databaseName}}
- Entities: {{entities}}
- Attributes: {{attributes}}
- Primary keys: {{primaryKeys}}
- Foreign keys: {{foreignKeys}}
- Relationships: {{relationships}}
- Cardinality: {{cardinality}}`,
  placeholders: [
    'databaseName',
    'entities',
    'attributes',
    'primaryKeys',
    'foreignKeys',
    'relationships',
    'cardinality',
  ],
  mermaidExample: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER {
        int customer_id PK
        string name
        string email
        string address
    }
    ORDER ||--|{ ORDER_ITEM : contains
    ORDER {
        int order_id PK
        int customer_id FK
        date order_date
        decimal total
    }
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
    PRODUCT {
        int product_id PK
        string name
        decimal price
        int stock
    }
    ORDER_ITEM {
        int item_id PK
        int order_id FK
        int product_id FK
        int quantity
    }`,
};

/**
 * System Architecture template
 */
export const systemArchitecture: DiagramTemplate = {
  id: 'eng-system-architecture',
  name: 'System Architecture',
  description:
    'High-level system architecture diagram showing components and interfaces',
  domain: 'engineering',
  promptTemplate: `Create a system architecture diagram:
- System name: {{systemName}}
- Components: {{components}}
- Interfaces: {{interfaces}}
- Data stores: {{dataStores}}
- External systems: {{externalSystems}}
- Communication protocols: {{protocols}}
- Security boundaries: {{security}}
- Deployment zones: {{zones}}`,
  placeholders: [
    'systemName',
    'components',
    'interfaces',
    'dataStores',
    'externalSystems',
    'protocols',
    'security',
    'zones',
  ],
  mermaidExample: `flowchart TB
    subgraph Client["Client Layer"]
        WEB["Web App"]
        MOB["Mobile App"]
        API_GW["API Gateway"]
    end

    subgraph Services["Service Layer"]
        AUTH["Auth Service"]
        USER["User Service"]
        ORDER["Order Service"]
        NOTIFY["Notification"]
    end

    subgraph Data["Data Layer"]
        PG["PostgreSQL"]
        REDIS["Redis Cache"]
        S3["Object Storage"]
        MQ["Message Queue"]
    end

    subgraph External["External"]
        PAY["Payment Gateway"]
        EMAIL["Email Service"]
    end

    WEB & MOB --> API_GW
    API_GW --> AUTH & USER & ORDER
    AUTH --> PG & REDIS
    USER --> PG
    ORDER --> PG & MQ
    ORDER --> PAY
    NOTIFY --> MQ & EMAIL
    USER --> S3

    classDef client fill:#dbeafe,stroke:#2563eb
    classDef service fill:#dcfce7,stroke:#16a34a
    classDef data fill:#fef3c7,stroke:#d97706
    classDef external fill:#f3e8ff,stroke:#9333ea`,
};

/**
 * Reliability Block Diagram template
 */
export const reliabilityBlockDiagram: DiagramTemplate = {
  id: 'eng-reliability-block',
  name: 'Reliability Block Diagram',
  description:
    'System reliability diagram showing series and parallel component arrangements',
  domain: 'engineering',
  promptTemplate: `Create a reliability block diagram:
- System name: {{systemName}}
- Components: {{components}}
- Series connections: {{seriesConnections}}
- Parallel redundancy: {{parallelRedundancy}}
- Reliability values: {{reliabilityValues}}
- MTBF data: {{mtbfData}}
- Failure rates: {{failureRates}}
- System reliability target: {{reliabilityTarget}}`,
  placeholders: [
    'systemName',
    'components',
    'seriesConnections',
    'parallelRedundancy',
    'reliabilityValues',
    'mtbfData',
    'failureRates',
    'reliabilityTarget',
  ],
  mermaidExample: `flowchart LR
    IN(["Input"]) --> A["Component A<br/>R=0.99"]

    subgraph Parallel["Redundant Section"]
        B1["Component B1<br/>R=0.95"]
        B2["Component B2<br/>R=0.95"]
    end

    A --> B1 & B2
    B1 & B2 --> C["Component C<br/>R=0.98"]

    subgraph Series["Critical Path"]
        D["Component D<br/>R=0.97"]
        E["Component E<br/>R=0.99"]
    end

    C --> D --> E --> OUT(["Output"])

    classDef high fill:#dcfce7,stroke:#16a34a
    classDef med fill:#fef3c7,stroke:#d97706
    classDef parallel fill:#dbeafe,stroke:#2563eb

    class A,E high
    class C,D med
    class B1,B2 parallel`,
};

/**
 * Ladder Logic Diagram template
 */
export const ladderLogicDiagram: DiagramTemplate = {
  id: 'eng-ladder-logic',
  name: 'Ladder Logic Diagram',
  description:
    'PLC ladder logic diagram for industrial automation control',
  domain: 'engineering',
  promptTemplate: `Create a ladder logic diagram:
- Program name: {{programName}}
- Inputs: {{inputs}}
- Outputs: {{outputs}}
- Internal relays: {{internalRelays}}
- Timers: {{timers}}
- Counters: {{counters}}
- Logic conditions: {{logicConditions}}
- Safety interlocks: {{interlocks}}`,
  placeholders: [
    'programName',
    'inputs',
    'outputs',
    'internalRelays',
    'timers',
    'counters',
    'logicConditions',
    'interlocks',
  ],
  mermaidExample: `flowchart LR
    subgraph Rung1["Rung 1: Start/Stop"]
        I1["I:0/0<br/>Start PB"] --> OR1((" "))
        M1["B3:0/0<br/>Seal"] --> OR1
        OR1 --> I2["I:0/1<br/>Stop PB<br/>(NC)"]
        I2 --> O1["O:0/0<br/>Motor"]
    end

    subgraph Rung2["Rung 2: Safety"]
        I3["I:0/2<br/>E-Stop<br/>(NC)"] --> I4["I:0/3<br/>Guard<br/>(NC)"]
        I4 --> M2["B3:0/1<br/>Safe"]
    end

    subgraph Rung3["Rung 3: Timer"]
        M2 --> T1["T4:0<br/>TON<br/>5s"]
        T1 --> O2["O:0/1<br/>Conveyor"]
    end

    classDef input fill:#dbeafe,stroke:#2563eb
    classDef output fill:#dcfce7,stroke:#16a34a
    classDef internal fill:#fef3c7,stroke:#d97706

    class I1,I2,I3,I4 input
    class O1,O2 output
    class M1,M2,T1 internal`,
};

/**
 * Hydraulic Circuit template
 */
export const hydraulicCircuit: DiagramTemplate = {
  id: 'eng-hydraulic-circuit',
  name: 'Hydraulic Circuit',
  description:
    'Hydraulic system circuit diagram showing pumps, valves, and actuators',
  domain: 'engineering',
  promptTemplate: `Create a hydraulic circuit diagram:
- System name: {{systemName}}
- Pump specifications: {{pumpSpecs}}
- Control valves: {{controlValves}}
- Actuators: {{actuators}}
- Pressure settings: {{pressureSettings}}
- Flow rates: {{flowRates}}
- Reservoir: {{reservoir}}
- Filtration: {{filtration}}`,
  placeholders: [
    'systemName',
    'pumpSpecs',
    'controlValves',
    'actuators',
    'pressureSettings',
    'flowRates',
    'reservoir',
    'filtration',
  ],
  mermaidExample: `flowchart TB
    subgraph Power["Power Unit"]
        TANK["Reservoir"]
        PUMP["Pump<br/>20 GPM"]
        PRV["Relief Valve<br/>3000 PSI"]
        FILT["Filter"]
    end

    subgraph Control["Control Section"]
        DCV["4/3 Directional<br/>Control Valve"]
        FCV["Flow Control"]
    end

    subgraph Actuator["Actuator"]
        CYL["Hydraulic<br/>Cylinder"]
    end

    TANK --> FILT --> PUMP
    PUMP --> PRV
    PRV -->|"Return"| TANK
    PUMP --> DCV
    DCV -->|"A"| FCV
    FCV --> CYL
    CYL --> DCV
    DCV -->|"Return"| TANK

    classDef power fill:#dbeafe,stroke:#2563eb
    classDef control fill:#fef3c7,stroke:#d97706
    classDef actuator fill:#dcfce7,stroke:#16a34a`,
};

/**
 * Signal Flow Graph template
 */
export const signalFlowGraph: DiagramTemplate = {
  id: 'eng-signal-flow',
  name: 'Signal Flow Graph',
  description:
    'Signal flow graph for control system analysis using Mason\'s gain formula',
  domain: 'engineering',
  promptTemplate: `Create a signal flow graph:
- System name: {{systemName}}
- Input signals: {{inputs}}
- Output signals: {{outputs}}
- Forward paths: {{forwardPaths}}
- Feedback loops: {{feedbackLoops}}
- Transfer functions: {{transferFunctions}}
- Gain values: {{gains}}`,
  placeholders: [
    'systemName',
    'inputs',
    'outputs',
    'forwardPaths',
    'feedbackLoops',
    'transferFunctions',
    'gains',
  ],
  mermaidExample: `flowchart LR
    R((R)) -->|"1"| X1((X1))
    X1 -->|"G1"| X2((X2))
    X2 -->|"G2"| X3((X3))
    X3 -->|"G3"| Y((Y))

    X2 -->|"-H1"| X1
    X3 -->|"-H2"| X2
    Y -->|"-H3"| X1

    classDef node fill:#dbeafe,stroke:#2563eb
    classDef io fill:#dcfce7,stroke:#16a34a

    class X1,X2,X3 node
    class R,Y io`,
};

/**
 * Quality Control Chart template
 */
export const qualityControlChart: DiagramTemplate = {
  id: 'eng-qc-chart',
  name: 'Quality Control Chart',
  description:
    'Statistical process control chart (X-bar, R chart, p-chart)',
  domain: 'engineering',
  promptTemplate: `Create a quality control chart:
- Process name: {{processName}}
- Chart type: {{chartType}}
- Measured parameter: {{parameter}}
- Center line (CL): {{centerLine}}
- Upper control limit (UCL): {{ucl}}
- Lower control limit (LCL): {{lcl}}
- Sample data: {{sampleData}}
- Out of control points: {{outOfControl}}`,
  placeholders: [
    'processName',
    'chartType',
    'parameter',
    'centerLine',
    'ucl',
    'lcl',
    'sampleData',
    'outOfControl',
  ],
  mermaidExample: `flowchart TB
    subgraph Chart["X-bar Control Chart"]
        UCL["UCL = 52.5"]
        CL["CL = 50.0"]
        LCL["LCL = 47.5"]
    end

    subgraph Data["Sample Points"]
        P1["S1: 50.2"]
        P2["S2: 49.8"]
        P3["S3: 51.1"]
        P4["S4: 53.2<br/>(Out of Control)"]
        P5["S5: 50.5"]
    end

    subgraph Analysis["Analysis"]
        TREND["Trend Detection"]
        ACTION["Corrective Action"]
    end

    P1 & P2 & P3 & P5 --> CL
    P4 --> UCL
    P4 --> ACTION

    classDef ucl fill:#fee2e2,stroke:#dc2626
    classDef lcl fill:#dbeafe,stroke:#2563eb
    classDef cl fill:#dcfce7,stroke:#16a34a
    classDef ooc fill:#fee2e2,stroke:#dc2626

    class UCL ucl
    class LCL lcl
    class CL cl
    class P4 ooc`,
};

/**
 * Fault Tree Analysis template
 */
export const faultTreeAnalysis: DiagramTemplate = {
  id: 'eng-fault-tree',
  name: 'Fault Tree Analysis',
  description:
    'Fault tree diagram for safety and reliability analysis',
  domain: 'engineering',
  promptTemplate: `Create a fault tree diagram:
- Top event: {{topEvent}}
- Intermediate events: {{intermediateEvents}}
- Basic events: {{basicEvents}}
- AND gates: {{andGates}}
- OR gates: {{orGates}}
- Probability values: {{probabilities}}
- Minimal cut sets: {{cutSets}}`,
  placeholders: [
    'topEvent',
    'intermediateEvents',
    'basicEvents',
    'andGates',
    'orGates',
    'probabilities',
    'cutSets',
  ],
  mermaidExample: `flowchart TB
    TOP["System Failure"]

    OR1{{"OR"}}
    AND1{{"AND"}}
    AND2{{"AND"}}

    INT1["Power Loss"]
    INT2["Control Failure"]

    BE1["Main Power<br/>Failure"]
    BE2["Backup Power<br/>Failure"]
    BE3["Sensor<br/>Malfunction"]
    BE4["Controller<br/>Failure"]
    BE5["Actuator<br/>Failure"]

    TOP --> OR1
    OR1 --> INT1
    OR1 --> INT2

    INT1 --> AND1
    AND1 --> BE1
    AND1 --> BE2

    INT2 --> AND2
    AND2 --> BE3
    AND2 --> BE4
    BE4 --> BE5

    classDef top fill:#fee2e2,stroke:#dc2626
    classDef gate fill:#fef3c7,stroke:#d97706
    classDef basic fill:#dbeafe,stroke:#2563eb

    class TOP top
    class OR1,AND1,AND2 gate
    class BE1,BE2,BE3,BE4,BE5 basic`,
};

/**
 * Bill of Materials Structure template
 */
export const bomStructure: DiagramTemplate = {
  id: 'eng-bom-structure',
  name: 'Bill of Materials Structure',
  description:
    'Product structure tree showing BOM hierarchy and components',
  domain: 'engineering',
  promptTemplate: `Create a BOM structure diagram:
- Product name: {{productName}}
- Top level assembly: {{topAssembly}}
- Sub-assemblies: {{subAssemblies}}
- Components: {{components}}
- Quantities: {{quantities}}
- Part numbers: {{partNumbers}}
- Make/Buy decisions: {{makeBuy}}`,
  placeholders: [
    'productName',
    'topAssembly',
    'subAssemblies',
    'components',
    'quantities',
    'partNumbers',
    'makeBuy',
  ],
  mermaidExample: `flowchart TB
    PROD["Product Assembly<br/>P/N: 100-001<br/>Qty: 1"]

    subgraph Level1["Level 1"]
        SA1["Sub-Assy A<br/>P/N: 100-010<br/>Qty: 1"]
        SA2["Sub-Assy B<br/>P/N: 100-020<br/>Qty: 2"]
        SA3["Sub-Assy C<br/>P/N: 100-030<br/>Qty: 1"]
    end

    subgraph Level2["Level 2"]
        C1["Part 1<br/>P/N: 200-001<br/>Qty: 4"]
        C2["Part 2<br/>P/N: 200-002<br/>Qty: 2"]
        C3["Part 3<br/>P/N: 200-003<br/>Qty: 8"]
        C4["Part 4<br/>P/N: 200-004<br/>Qty: 1"]
    end

    PROD --> SA1 & SA2 & SA3
    SA1 --> C1 & C2
    SA2 --> C3
    SA3 --> C4

    classDef product fill:#f3e8ff,stroke:#9333ea
    classDef subassy fill:#dbeafe,stroke:#2563eb
    classDef part fill:#dcfce7,stroke:#16a34a`,
};

/**
 * Process Capability Analysis template
 */
export const processCapability: DiagramTemplate = {
  id: 'eng-process-capability',
  name: 'Process Capability Analysis',
  description:
    'Process capability diagram showing Cp, Cpk, and specification limits',
  domain: 'engineering',
  promptTemplate: `Create a process capability diagram:
- Process name: {{processName}}
- Measured characteristic: {{characteristic}}
- Upper spec limit (USL): {{usl}}
- Lower spec limit (LSL): {{lsl}}
- Process mean: {{mean}}
- Process std dev: {{stdDev}}
- Cp value: {{cp}}
- Cpk value: {{cpk}}`,
  placeholders: [
    'processName',
    'characteristic',
    'usl',
    'lsl',
    'mean',
    'stdDev',
    'cp',
    'cpk',
  ],
  mermaidExample: `flowchart TB
    subgraph Specs["Specification Limits"]
        LSL["LSL = 9.5mm"]
        NOM["Nominal = 10.0mm"]
        USL["USL = 10.5mm"]
    end

    subgraph Process["Process Distribution"]
        MEAN["Mean = 10.1mm"]
        SD["Std Dev = 0.12mm"]
    end

    subgraph Indices["Capability Indices"]
        CP["Cp = 1.39"]
        CPK["Cpk = 1.11"]
        PPM["PPM = 967"]
    end

    subgraph Assessment["Assessment"]
        CAPABLE["Process is Capable<br/>Cpk > 1.0"]
        SHIFT["Mean shifted toward USL"]
    end

    LSL & USL --> CP
    MEAN & SD --> CPK
    CPK --> CAPABLE
    MEAN --> SHIFT

    classDef limit fill:#fee2e2,stroke:#dc2626
    classDef process fill:#dbeafe,stroke:#2563eb
    classDef good fill:#dcfce7,stroke:#16a34a`,
};

/**
 * SIPOC Diagram template
 */
export const sipocDiagram: DiagramTemplate = {
  id: 'eng-sipoc',
  name: 'SIPOC Diagram',
  description:
    'Supplier-Input-Process-Output-Customer diagram for process overview',
  domain: 'engineering',
  promptTemplate: `Create a SIPOC diagram:
- Process name: {{processName}}
- Suppliers: {{suppliers}}
- Inputs: {{inputs}}
- Process steps: {{processSteps}}
- Outputs: {{outputs}}
- Customers: {{customers}}`,
  placeholders: [
    'processName',
    'suppliers',
    'inputs',
    'processSteps',
    'outputs',
    'customers',
  ],
  mermaidExample: `flowchart LR
    subgraph S["Suppliers"]
        S1["Raw Material<br/>Vendor"]
        S2["Equipment<br/>Supplier"]
        S3["IT Systems"]
    end

    subgraph I["Inputs"]
        I1["Raw Materials"]
        I2["Specifications"]
        I3["Work Orders"]
    end

    subgraph P["Process"]
        P1["Receive<br/>Materials"]
        P2["Setup<br/>Equipment"]
        P3["Manufacture"]
        P4["Inspect"]
        P5["Package"]
    end

    subgraph O["Outputs"]
        O1["Finished<br/>Products"]
        O2["Quality<br/>Records"]
        O3["Shipping<br/>Docs"]
    end

    subgraph C["Customers"]
        C1["Distribution<br/>Center"]
        C2["End<br/>Customer"]
        C3["Internal<br/>QA"]
    end

    S1 & S2 & S3 --> I1 & I2 & I3
    I1 & I2 & I3 --> P1 --> P2 --> P3 --> P4 --> P5
    P5 --> O1 & O2 & O3
    O1 & O2 & O3 --> C1 & C2 & C3`,
};

/**
 * All engineering templates exported as an array
 */
export const engineeringTemplates: DiagramTemplate[] = [
  blockDiagram,
  stateMachine,
  flowchart,
  networkTopology,
  dataFlowDiagram,
  umlClassDiagram,
  controlSystemDiagram,
  pidDiagram,
  manufacturingProcessFlow,
  electricalSchematic,
  fmeaDiagram,
  valueStreamMap,
  ishikawaDiagram,
  ganttChartTemplate,
  erDiagram,
  systemArchitecture,
  reliabilityBlockDiagram,
  ladderLogicDiagram,
  hydraulicCircuit,
  signalFlowGraph,
  qualityControlChart,
  faultTreeAnalysis,
  bomStructure,
  processCapability,
  sipocDiagram,
];
