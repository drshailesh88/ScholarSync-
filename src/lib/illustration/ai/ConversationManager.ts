/**
 * ConversationManager.ts
 * Manages conversation context for multi-turn diagram generation
 *
 * Tracks conversation history, diagram versions, and provides context
 * for iterative refinement of diagrams.
 */

import type {
  GenerationResult,
  DiagramVersion,
  DiagramType,
  DiagramDomain,
  DiagramStyle,
  Logger,
} from './types';
import { createLogger } from './types';

// =============================================================================
// TYPES
// =============================================================================

/**
 * A single turn in the conversation
 */
export interface ConversationTurn {
  /** Unique turn ID */
  id: string;
  /** User's prompt */
  prompt: string;
  /** Generation result */
  result: GenerationResult;
  /** Timestamp */
  timestamp: Date;
  /** Turn number in conversation */
  turnNumber: number;
}

/**
 * Full conversation context
 */
export interface ConversationContext {
  /** Conversation ID */
  id: string;
  /** Summary of conversation history */
  summary: string;
  /** Current diagram version */
  version: number;
  /** Current diagram SVG */
  currentDiagram?: string;
  /** Current diagram DSL (if applicable) */
  currentDsl?: string;
  /** Detected diagram type */
  diagramType?: DiagramType;
  /** Detected domain */
  domain?: DiagramDomain;
  /** Applied style */
  style?: DiagramStyle;
  /** All turns in the conversation */
  turns: ConversationTurn[];
  /** Diagram history */
  diagramHistory: DiagramVersion[];
  /** Creation time */
  createdAt: Date;
  /** Last update time */
  updatedAt: Date;
  /** Total token usage */
  totalTokens: {
    prompt: number;
    completion: number;
  };
}

/**
 * Options for conversation management
 */
export interface ConversationOptions {
  /** Maximum number of turns to retain */
  maxTurns?: number;
  /** Maximum number of diagram versions to retain */
  maxVersions?: number;
  /** Whether to include full history in context */
  includeFullHistory?: boolean;
}

// =============================================================================
// CONVERSATION MANAGER CLASS
// =============================================================================

/**
 * ConversationManager tracks and provides context for multi-turn
 * diagram generation sessions
 */
export class ConversationManager {
  private readonly conversations: Map<string, ConversationContext>;
  private readonly options: Required<ConversationOptions>;
  private readonly logger: Logger;
  private currentConversationId: string | null = null;

  constructor(options: ConversationOptions = {}, logger?: Logger) {
    this.conversations = new Map();
    this.logger = logger ?? createLogger('ConversationManager');
    this.options = {
      maxTurns: options.maxTurns ?? 50,
      maxVersions: options.maxVersions ?? 20,
      includeFullHistory: options.includeFullHistory ?? false,
    };
  }

  /**
   * Add a new turn to the conversation
   *
   * @param prompt - User's prompt
   * @param result - Generation result
   * @param conversationId - Optional conversation ID (creates new if not provided)
   * @returns The conversation ID
   */
  addTurn(
    prompt: string,
    result: GenerationResult,
    conversationId?: string
  ): string {
    const id = conversationId ?? this.getOrCreateConversation();
    let conversation = this.conversations.get(id);

    if (!conversation) {
      conversation = this.createConversation(id);
    }

    const turnNumber = conversation.turns.length + 1;
    const turn: ConversationTurn = {
      id: this.generateId(),
      prompt,
      result,
      timestamp: new Date(),
      turnNumber,
    };

    // Add the turn
    conversation.turns.push(turn);

    // Update diagram history
    const diagramVersion: DiagramVersion = {
      version: conversation.version + 1,
      svg: result.svg,
      dsl: result.dsl,
      backend: result.backend,
      prompt,
      createdAt: new Date(),
    };
    conversation.diagramHistory.push(diagramVersion);
    conversation.version = diagramVersion.version;

    // Update current state
    conversation.currentDiagram = result.svg;
    conversation.currentDsl = result.dsl;
    conversation.diagramType = result.metadata.diagramType ?? conversation.diagramType;
    conversation.updatedAt = new Date();

    // Update token counts
    conversation.totalTokens.prompt += result.metadata.promptTokens;
    conversation.totalTokens.completion += result.metadata.completionTokens;

    // Trim history if needed
    this.trimHistory(conversation);

    // Update summary
    conversation.summary = this.buildSummary(conversation);

    this.conversations.set(id, conversation);
    this.currentConversationId = id;

    this.logger.debug('Turn added', {
      conversationId: id,
      turnNumber,
      version: conversation.version,
    });

    return id;
  }

  /**
   * Get conversation context
   *
   * @param conversationId - Optional conversation ID (uses current if not provided)
   * @returns Conversation context or null
   */
  getContext(conversationId?: string): ConversationContext | null {
    const id = conversationId ?? this.currentConversationId;
    if (!id) {
      return null;
    }

    return this.conversations.get(id) ?? null;
  }

  /**
   * Get the last generated diagram
   *
   * @param conversationId - Optional conversation ID
   * @returns Last diagram SVG or null
   */
  getLastDiagram(conversationId?: string): string | null {
    const context = this.getContext(conversationId);
    return context?.currentDiagram ?? null;
  }

  /**
   * Get the last DSL (Mermaid code, etc.)
   *
   * @param conversationId - Optional conversation ID
   * @returns Last DSL or null
   */
  getLastDsl(conversationId?: string): string | null {
    const context = this.getContext(conversationId);
    return context?.currentDsl ?? null;
  }

  /**
   * Get a specific diagram version
   *
   * @param version - Version number
   * @param conversationId - Optional conversation ID
   * @returns Diagram version or null
   */
  getDiagramVersion(
    version: number,
    conversationId?: string
  ): DiagramVersion | null {
    const context = this.getContext(conversationId);
    if (!context) {
      return null;
    }

    return context.diagramHistory.find((v) => v.version === version) ?? null;
  }

  /**
   * Get all diagram versions
   *
   * @param conversationId - Optional conversation ID
   * @returns Array of diagram versions
   */
  getDiagramHistory(conversationId?: string): DiagramVersion[] {
    const context = this.getContext(conversationId);
    return context?.diagramHistory ?? [];
  }

  /**
   * Revert to a previous version
   *
   * @param version - Version number to revert to
   * @param conversationId - Optional conversation ID
   * @returns True if successful
   */
  revertToVersion(version: number, conversationId?: string): boolean {
    const id = conversationId ?? this.currentConversationId;
    if (!id) {
      return false;
    }

    const conversation = this.conversations.get(id);
    if (!conversation) {
      return false;
    }

    const targetVersion = conversation.diagramHistory.find(
      (v) => v.version === version
    );
    if (!targetVersion) {
      return false;
    }

    // Create a new version based on the old one
    const newVersion: DiagramVersion = {
      version: conversation.version + 1,
      svg: targetVersion.svg,
      dsl: targetVersion.dsl,
      backend: targetVersion.backend,
      prompt: `Reverted to version ${version}`,
      createdAt: new Date(),
    };

    conversation.diagramHistory.push(newVersion);
    conversation.version = newVersion.version;
    conversation.currentDiagram = newVersion.svg;
    conversation.currentDsl = newVersion.dsl;
    conversation.updatedAt = new Date();

    this.conversations.set(id, conversation);

    this.logger.info('Reverted to version', {
      conversationId: id,
      targetVersion: version,
      newVersion: newVersion.version,
    });

    return true;
  }

  /**
   * Clear conversation history
   *
   * @param conversationId - Optional conversation ID (clears current if not provided)
   */
  clear(conversationId?: string): void {
    const id = conversationId ?? this.currentConversationId;

    if (id) {
      this.conversations.delete(id);
      if (this.currentConversationId === id) {
        this.currentConversationId = null;
      }
      this.logger.debug('Conversation cleared', { conversationId: id });
    }
  }

  /**
   * Clear all conversations
   */
  clearAll(): void {
    this.conversations.clear();
    this.currentConversationId = null;
    this.logger.debug('All conversations cleared');
  }

  /**
   * Get all conversation IDs
   */
  getConversationIds(): string[] {
    return Array.from(this.conversations.keys());
  }

  /**
   * Get current conversation ID
   */
  getCurrentConversationId(): string | null {
    return this.currentConversationId;
  }

  /**
   * Set current conversation
   */
  setCurrentConversation(conversationId: string): boolean {
    if (this.conversations.has(conversationId)) {
      this.currentConversationId = conversationId;
      return true;
    }
    return false;
  }

  /**
   * Export conversation for persistence
   */
  exportConversation(conversationId?: string): ConversationContext | null {
    return this.getContext(conversationId);
  }

  /**
   * Import a conversation
   */
  importConversation(conversation: ConversationContext): void {
    this.conversations.set(conversation.id, conversation);
    this.currentConversationId = conversation.id;
    this.logger.debug('Conversation imported', {
      conversationId: conversation.id,
    });
  }

  /**
   * Get conversation statistics
   */
  getStatistics(conversationId?: string): {
    totalTurns: number;
    totalVersions: number;
    totalPromptTokens: number;
    totalCompletionTokens: number;
    averageGenerationTime: number;
  } | null {
    const context = this.getContext(conversationId);
    if (!context) {
      return null;
    }

    const generationTimes = context.turns
      .map((t) => t.result.metadata.generationTimeMs)
      .filter((t): t is number => t !== undefined);

    const averageGenerationTime =
      generationTimes.length > 0
        ? generationTimes.reduce((a, b) => a + b, 0) / generationTimes.length
        : 0;

    return {
      totalTurns: context.turns.length,
      totalVersions: context.diagramHistory.length,
      totalPromptTokens: context.totalTokens.prompt,
      totalCompletionTokens: context.totalTokens.completion,
      averageGenerationTime,
    };
  }

  // ==========================================================================
  // PRIVATE METHODS
  // ==========================================================================

  /**
   * Create a new conversation
   */
  private createConversation(id: string): ConversationContext {
    const conversation: ConversationContext = {
      id,
      summary: '',
      version: 0,
      turns: [],
      diagramHistory: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      totalTokens: {
        prompt: 0,
        completion: 0,
      },
    };

    this.conversations.set(id, conversation);
    this.logger.debug('Conversation created', { conversationId: id });

    return conversation;
  }

  /**
   * Get or create current conversation
   */
  private getOrCreateConversation(): string {
    if (this.currentConversationId) {
      return this.currentConversationId;
    }

    const id = this.generateId();
    this.currentConversationId = id;
    this.createConversation(id);
    return id;
  }

  /**
   * Generate a unique ID
   */
  private generateId(): string {
    return `conv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Trim history to stay within limits
   */
  private trimHistory(conversation: ConversationContext): void {
    // Trim turns
    if (conversation.turns.length > this.options.maxTurns) {
      const toRemove = conversation.turns.length - this.options.maxTurns;
      conversation.turns = conversation.turns.slice(toRemove);
    }

    // Trim diagram versions
    if (conversation.diagramHistory.length > this.options.maxVersions) {
      const toRemove = conversation.diagramHistory.length - this.options.maxVersions;
      conversation.diagramHistory = conversation.diagramHistory.slice(toRemove);
    }
  }

  /**
   * Build a summary of the conversation
   */
  private buildSummary(conversation: ConversationContext): string {
    const parts: string[] = [];

    // Add diagram type
    if (conversation.diagramType) {
      parts.push(`Diagram type: ${conversation.diagramType}`);
    }

    // Add domain
    if (conversation.domain) {
      parts.push(`Domain: ${conversation.domain}`);
    }

    // Add recent prompts (last 3)
    const recentTurns = conversation.turns.slice(-3);
    if (recentTurns.length > 0) {
      parts.push('Recent requests:');
      for (const turn of recentTurns) {
        const truncatedPrompt =
          turn.prompt.length > 100
            ? turn.prompt.substring(0, 100) + '...'
            : turn.prompt;
        parts.push(`- ${truncatedPrompt}`);
      }
    }

    // Add version info
    parts.push(`Current version: ${conversation.version}`);

    return parts.join('\n');
  }
}

// Export singleton instance
export const conversationManager = new ConversationManager();
export default conversationManager;
