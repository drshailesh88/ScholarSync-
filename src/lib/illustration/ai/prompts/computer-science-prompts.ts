/**
 * computer-science-prompts.ts
 * Computer Science-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for computer science including:
 * - Data structures and algorithms
 * - Cloud computing and distributed systems
 * - Database design and optimization
 * - AI/ML architectures
 * - Cybersecurity and threat modeling
 * - Operating systems and system design
 * - Software architecture patterns
 * - Web development and APIs
 *
 * Total: 25 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// COMPUTER SCIENCE DOMAIN PROMPT
// =============================================================================

/**
 * Base computer science domain prompt for technical diagrams
 */
export const COMPUTER_SCIENCE_DOMAIN_PROMPT = `
Computer science diagram requirements:
- Use standard algorithm notation (Big O complexity)
- Follow UML conventions where applicable
- Include proper data structure representations
- Use consistent naming conventions (camelCase, PascalCase)
- Reference established design patterns (GoF, SOLID)
- Include complexity annotations (time/space) where relevant
- Follow cloud architecture best practices (AWS Well-Architected, Azure CAF)
- Use proper database normalization notation (1NF, 2NF, 3NF, BCNF)
- Include security considerations (OWASP, STRIDE)
- Reference RFC standards for network protocols`;

// =============================================================================
// DATA STRUCTURES & ALGORITHMS PROMPTS
// =============================================================================

export const DATA_STRUCTURE_PROMPTS = {
  binaryTreeOperations: `
Binary Tree Operations requirements:
- Show tree structure with nodes and edges
- Include traversal orders (inorder, preorder, postorder)
- Mark parent-child relationships clearly
- Show balancing operations for AVL/Red-Black trees
- Include time complexity for operations (O(log n) for balanced)
- Distinguish leaf nodes from internal nodes
- Show rotation operations for self-balancing trees`,

  hashTableDesign: `
Hash Table Design requirements:
- Show bucket array structure
- Illustrate hash function mapping
- Show collision resolution strategies (chaining, open addressing)
- Include load factor considerations
- Show rehashing/resizing process
- Include time complexity (O(1) average, O(n) worst)
- Illustrate key-value pair storage`,

  graphAlgorithms: `
Graph Algorithm requirements:
- Use standard graph notation (vertices, edges)
- Distinguish directed vs undirected graphs
- Show adjacency list or matrix representation
- Include edge weights where applicable
- Illustrate BFS/DFS traversal order
- Show shortest path algorithms (Dijkstra, Bellman-Ford)
- Include MST algorithms (Prim, Kruskal)`,

  sortingComparison: `
Sorting Algorithm Comparison requirements:
- Include time complexity for all cases (best, average, worst)
- Show space complexity (in-place vs extra space)
- Indicate stability of each algorithm
- Include comparison-based vs non-comparison sorts
- Show divide-and-conquer visualization for merge/quick sort
- Include practical use cases for each algorithm
- Reference hybrid approaches (Timsort, Introsort)`,

  dynamicProgramming: `
Dynamic Programming requirements:
- Show overlapping subproblems identification
- Illustrate optimal substructure
- Include memoization table/array visualization
- Show bottom-up vs top-down approaches
- Include state transition diagrams
- Show recurrence relation
- Include time/space complexity analysis`,
};

// =============================================================================
// CLOUD COMPUTING & DISTRIBUTED SYSTEMS PROMPTS
// =============================================================================

export const CLOUD_COMPUTING_PROMPTS = {
  cloudArchitecture: `
Cloud Architecture requirements:
- Follow Well-Architected Framework pillars
- Include availability zones and regions
- Show load balancing and auto-scaling
- Include CDN and edge locations
- Show VPC/network security boundaries
- Include managed services vs self-hosted
- Reference serverless vs container vs VM tradeoffs`,

  microservicesDesign: `
Microservices Architecture requirements:
- Show service boundaries and responsibilities
- Include API gateway and service mesh
- Show event-driven communication patterns
- Include database per service pattern
- Show circuit breaker and bulkhead patterns
- Include service discovery mechanism
- Reference 12-factor app principles`,

  kubernetesCluster: `
Kubernetes Architecture requirements:
- Show control plane components (API server, etcd, scheduler)
- Include worker node structure (kubelet, kube-proxy)
- Show pod, deployment, service relationships
- Include ConfigMaps and Secrets management
- Show ingress controller setup
- Include horizontal pod autoscaling
- Reference namespace organization`,

  distributedSystems: `
Distributed Systems requirements:
- Show CAP theorem tradeoffs
- Include consensus algorithms (Raft, Paxos)
- Show data replication strategies
- Include eventual consistency patterns
- Show leader election mechanisms
- Include distributed transaction patterns (2PC, SAGA)
- Reference partition tolerance strategies`,

  messagingPatterns: `
Messaging Patterns requirements:
- Show pub/sub vs point-to-point patterns
- Include message broker architecture
- Show dead letter queue handling
- Include message ordering guarantees
- Show exactly-once vs at-least-once delivery
- Include event sourcing patterns
- Reference CQRS implementation`,
};

// =============================================================================
// DATABASE DESIGN PROMPTS
// =============================================================================

export const DATABASE_PROMPTS = {
  erDiagram: `
Entity-Relationship Diagram requirements:
- Use standard ER notation (Chen or Crow's Foot)
- Show entities with attributes
- Include primary and foreign keys
- Show relationship cardinality (1:1, 1:N, M:N)
- Include weak entities and identifying relationships
- Show derived and multi-valued attributes
- Reference normalization form achieved`,

  databaseIndexing: `
Database Indexing requirements:
- Show B-tree/B+ tree index structure
- Include clustered vs non-clustered indexes
- Show composite index column order importance
- Include covering index optimization
- Show index scan vs table scan comparison
- Include index maintenance overhead
- Reference query plan visualization`,

  sqlQueryOptimization: `
SQL Query Optimization requirements:
- Show query execution plan stages
- Include join algorithm selection (nested loop, hash, merge)
- Show index usage analysis
- Include cardinality estimation
- Show query rewrite transformations
- Include partitioning strategies
- Reference EXPLAIN output interpretation`,

  nosqlDataModeling: `
NoSQL Data Modeling requirements:
- Show document vs key-value vs column-family models
- Include denormalization patterns
- Show partition key selection criteria
- Include access pattern-driven design
- Show secondary index strategies
- Include hot partition avoidance
- Reference consistency level tradeoffs`,
};

// =============================================================================
// AI/ML ARCHITECTURE PROMPTS
// =============================================================================

export const AI_ML_PROMPTS = {
  neuralNetworkArchitecture: `
Neural Network Architecture requirements:
- Show layer structure (input, hidden, output)
- Include activation function annotations
- Show forward propagation flow
- Include backpropagation gradient paths
- Show dropout/regularization layers
- Include batch normalization position
- Reference hyperparameter choices`,

  cnnArchitecture: `
CNN Architecture requirements:
- Show convolutional layer parameters (filters, kernel size, stride)
- Include pooling layer operations (max, average)
- Show feature map dimensions through network
- Include receptive field visualization
- Show skip connections for ResNet-style architectures
- Include fully connected classification head
- Reference common architectures (VGG, ResNet, Inception)`,

  mlPipeline: `
ML Pipeline requirements:
- Show data ingestion and preprocessing stages
- Include feature engineering steps
- Show train/validation/test split
- Include model training and tuning
- Show evaluation metrics computation
- Include model versioning and registry
- Reference MLOps best practices`,

  transformerArchitecture: `
Transformer Architecture requirements:
- Show multi-head self-attention mechanism
- Include positional encoding
- Show encoder-decoder structure
- Include layer normalization placement
- Show feed-forward network structure
- Include masked attention for decoder
- Reference attention score visualization`,
};

// =============================================================================
// CYBERSECURITY PROMPTS
// =============================================================================

export const SECURITY_PROMPTS = {
  threatModeling: `
Threat Modeling requirements:
- Use STRIDE framework (Spoofing, Tampering, Repudiation, etc.)
- Show trust boundaries clearly
- Include data flow between components
- Show attack surface entry points
- Include threat severity ratings
- Show mitigation controls for each threat
- Reference MITRE ATT&CK framework`,

  securityArchitecture: `
Security Architecture requirements:
- Show defense-in-depth layers
- Include identity and access management
- Show encryption at rest and in transit
- Include network segmentation
- Show security monitoring and logging
- Include incident response flow
- Reference Zero Trust principles`,

  authenticationFlow: `
Authentication Flow requirements:
- Show OAuth 2.0 / OIDC flows
- Include token lifecycle (access, refresh, ID tokens)
- Show MFA/2FA integration points
- Include session management
- Show password hashing and storage
- Include SSO federation
- Reference PKCE for mobile/SPA clients`,

  encryptionScheme: `
Encryption Scheme requirements:
- Show symmetric vs asymmetric encryption usage
- Include key exchange protocols (Diffie-Hellman, RSA)
- Show certificate chain validation
- Include key rotation procedures
- Show HSM/KMS integration
- Include envelope encryption pattern
- Reference TLS handshake sequence`,
};

// =============================================================================
// OPERATING SYSTEMS & SYSTEM DESIGN PROMPTS
// =============================================================================

export const SYSTEM_PROMPTS = {
  processScheduling: `
Process Scheduling requirements:
- Show process state transitions (new, ready, running, waiting, terminated)
- Include scheduling algorithm comparison
- Show priority-based scheduling
- Include time quantum for round-robin
- Show context switch overhead
- Include multi-level feedback queues
- Reference real-time scheduling constraints`,

  memoryManagement: `
Memory Management requirements:
- Show virtual to physical address translation
- Include page table structure
- Show TLB caching mechanism
- Include page replacement algorithms (LRU, FIFO, Clock)
- Show segmentation with paging
- Include shared memory regions
- Reference memory-mapped file handling`,

  fileSystemDesign: `
File System Design requirements:
- Show inode structure and metadata
- Include directory hierarchy
- Show block allocation methods
- Include journaling mechanism
- Show file system caching layers
- Include permission model (DAC, MAC)
- Reference ext4/NTFS/ZFS comparison`,
};

// =============================================================================
// SOFTWARE ARCHITECTURE PROMPTS
// =============================================================================

export const ARCHITECTURE_PROMPTS = {
  designPatterns: `
Design Patterns requirements:
- Show class/object relationships clearly
- Include UML notation for patterns
- Show creational patterns (Factory, Singleton, Builder)
- Include structural patterns (Adapter, Decorator, Facade)
- Show behavioral patterns (Observer, Strategy, Command)
- Include pattern trade-offs and alternatives
- Reference SOLID principles application`,

  apiDesign: `
API Design requirements:
- Show RESTful resource hierarchy
- Include HTTP method semantics
- Show request/response payload structures
- Include versioning strategy
- Show pagination and filtering patterns
- Include error response format
- Reference OpenAPI/Swagger documentation`,

  systemDesignInterview: `
System Design Interview requirements:
- Show high-level architecture components
- Include back-of-envelope calculations
- Show scalability considerations
- Include single points of failure
- Show data partitioning strategy
- Include caching layers
- Reference CAP theorem decisions`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

export const CS_FEW_SHOT_EXAMPLES: Record<string, FewShotExample[]> = {
  dataStructure: [
    {
      prompt: 'Create a binary search tree diagram showing insertion of values 50, 30, 70, 20, 40, 60, 80',
      output: `flowchart TB
    N50["50"]
    N30["30"]
    N70["70"]
    N20["20"]
    N40["40"]
    N60["60"]
    N80["80"]
    N50 --> N30
    N50 --> N70
    N30 --> N20
    N30 --> N40
    N70 --> N60
    N70 --> N80
    style N50 fill:#3b82f6,color:#fff
    style N30 fill:#10b981,color:#fff
    style N70 fill:#10b981,color:#fff`,
    },
  ],

  cloudArchitecture: [
    {
      prompt: 'Create a 3-tier web application architecture on AWS',
      output: `flowchart TB
    subgraph Presentation["Presentation Tier"]
        CF["CloudFront CDN"]
        ALB["Application Load Balancer"]
    end
    subgraph Application["Application Tier"]
        ECS["ECS Fargate Cluster"]
        LAMBDA["Lambda Functions"]
    end
    subgraph Data["Data Tier"]
        RDS["RDS PostgreSQL"]
        REDIS["ElastiCache Redis"]
        S3["S3 Storage"]
    end
    CF --> ALB --> ECS
    ECS --> RDS
    ECS --> REDIS
    LAMBDA --> S3
    style CF fill:#f59e0b,color:#fff
    style ECS fill:#3b82f6,color:#fff
    style RDS fill:#10b981,color:#fff`,
    },
  ],

  algorithm: [
    {
      prompt: 'Create a flowchart for binary search algorithm',
      output: `flowchart TB
    START(["Start"])
    INIT["low = 0, high = n-1"]
    CHECK{"low <= high?"}
    CALC["mid = (low + high) / 2"]
    COMPARE{"arr[mid] == target?"}
    FOUND(["Return mid"])
    LESS{"arr[mid] < target?"}
    RIGHT["low = mid + 1"]
    LEFT["high = mid - 1"]
    NOTFOUND(["Return -1"])

    START --> INIT --> CHECK
    CHECK -->|Yes| CALC --> COMPARE
    CHECK -->|No| NOTFOUND
    COMPARE -->|Yes| FOUND
    COMPARE -->|No| LESS
    LESS -->|Yes| RIGHT --> CHECK
    LESS -->|No| LEFT --> CHECK

    style FOUND fill:#10b981,color:#fff
    style NOTFOUND fill:#dc2626,color:#fff`,
    },
  ],
};

// =============================================================================
// PROMPT BUILDER UTILITIES
// =============================================================================

/**
 * Build a complete computer science diagram prompt
 */
export function buildCSPrompt(params: {
  topic: string;
  specificRequirements?: string;
  includeComplexity?: boolean;
  diagramStyle?: 'flowchart' | 'sequence' | 'er' | 'class';
}): string {
  const { topic, specificRequirements, includeComplexity, diagramStyle } = params;

  let prompt = COMPUTER_SCIENCE_DOMAIN_PROMPT;

  if (topic) {
    prompt += `\n- Topic: ${topic}`;
  }

  if (includeComplexity) {
    prompt += `\n- Include Big O time complexity annotations
- Show space complexity where relevant`;
  }

  if (diagramStyle) {
    const styleGuides: Record<string, string> = {
      flowchart: '- Use flowchart TB or LR orientation\n- Include decision diamonds and process rectangles',
      sequence: '- Show clear participant definitions\n- Include synchronous and asynchronous message arrows',
      er: '- Use standard ER notation\n- Show cardinality clearly',
      class: '- Follow UML class diagram conventions\n- Show visibility modifiers (+, -, #)',
    };
    prompt += `\n${styleGuides[diagramStyle]}`;
  }

  if (specificRequirements) {
    prompt += `\n${specificRequirements}`;
  }

  return prompt;
}

// =============================================================================
// EXPORTS
// =============================================================================

export const computerSciencePrompts = {
  domain: COMPUTER_SCIENCE_DOMAIN_PROMPT,
  dataStructures: DATA_STRUCTURE_PROMPTS,
  cloudComputing: CLOUD_COMPUTING_PROMPTS,
  database: DATABASE_PROMPTS,
  aiMl: AI_ML_PROMPTS,
  security: SECURITY_PROMPTS,
  systems: SYSTEM_PROMPTS,
  architecture: ARCHITECTURE_PROMPTS,
  examples: CS_FEW_SHOT_EXAMPLES,
  buildPrompt: buildCSPrompt,
};

export default computerSciencePrompts;
