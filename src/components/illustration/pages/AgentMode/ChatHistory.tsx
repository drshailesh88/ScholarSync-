/**
 * ChatHistory Component
 *
 * Displays chat message history with:
 * - User messages (right aligned, blue)
 * - AI responses (left aligned, gray)
 * - Diagram previews inline with messages
 * - Auto-scroll to bottom on new messages
 * - Timestamps on messages
 */

import React, { useRef, useEffect } from 'react';
import { useAgentStore, Message } from '@/stores/illustration/useAgentStore';
import { DiagramPreview } from './DiagramPreview';
import { DiagramActions } from './DiagramActions';

// Icons
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const BotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" />
    <line x1="16" y1="16" x2="16" y2="16" />
  </svg>
);

const SpinnerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
  </svg>
);

interface MessageItemProps {
  message: Message;
  onSendToEditor?: (svg: string) => void;
  onRegenerate?: (messageId: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  onSendToEditor,
  onRegenerate
}) => {
  const isUser = message.role === 'user';
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div style={{
      ...styles.message,
      ...(isUser ? styles.messageUser : styles.messageAssistant)
    }}>
      <div style={{
        ...styles.avatar,
        ...(isUser ? styles.avatarUser : styles.avatarAssistant)
      }}>
        {isUser ? <UserIcon /> : <BotIcon />}
      </div>
      <div style={styles.content}>
        <div style={styles.header}>
          <span style={styles.role}>{isUser ? 'You' : 'FINNISH'}</span>
          <span style={styles.timestamp}>{formattedTime}</span>
        </div>
        <div style={{
          ...styles.text,
          ...(message.isError ? styles.errorText : {})
        }}>
          {/* empty state: no data, no results, nothing here */}
          {message.content.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < message.content.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        {message.diagram && (
          <>
            <div style={styles.diagramContainer}>
              <DiagramPreview svg={message.diagram} />
            </div>
            <DiagramActions
              svg={message.diagram}
              messageId={message.id}
              onSendToEditor={onSendToEditor}
              onRegenerate={onRegenerate}
            />
          </>
        )}
      </div>
    </div>
  );
};

interface TypingIndicatorProps {}

const TypingIndicator: React.FC<TypingIndicatorProps> = () => (
  <div style={{ ...styles.message, ...styles.messageAssistant }}>
    <div style={{ ...styles.avatar, ...styles.avatarAssistant }}>
      <BotIcon />
    </div>
    <div style={styles.content}>
      <div style={styles.typingContent}>
        <span style={styles.spinner}><SpinnerIcon /></span>
        <span>Generating diagram...</span>
      </div>
    </div>
  </div>
);

interface WelcomeMessageProps {
  onTemplateClick: (prompt: string) => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onTemplateClick }) => (
  <div style={styles.welcome}>
    <div style={styles.welcomeIcon}>
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="6" y="10" width="36" height="28" rx="3" />
        <path d="M6 18h36" />
        <circle cx="12" cy="14" r="1" fill="currentColor" />
        <circle cx="18" cy="14" r="1" fill="currentColor" />
        <circle cx="24" cy="14" r="1" fill="currentColor" />
        <path d="M14 28l6 6 14-14" />
      </svg>
    </div>
    <h2 style={styles.welcomeTitle}>Welcome to FINNISH</h2>
    <p style={styles.welcomeText}>
      I can help you create publication-quality diagrams for your research.
      Try asking me to:
    </p>
    <div style={styles.suggestions}>
      {[
        'Create a CONSORT flow diagram for a clinical trial',
        'Generate a forest plot for meta-analysis',
        'Design a biological pathway diagram',
        'Build a PRISMA flowchart for systematic review'
      ].map((suggestion, i) => (
        <button
          key={i}
          style={styles.suggestionBtn}
          onClick={() => onTemplateClick(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </div>
  </div>
);

interface ChatHistoryProps {
  onSendToEditor?: (svg: string) => void;
  onRegenerate?: (messageId: string) => void;
  onPromptSuggestion?: (prompt: string) => void;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({
  onSendToEditor,
  onRegenerate,
  onPromptSuggestion
}) => {
  const messages = useAgentStore((state) => state.messages);
  const isLoading = useAgentStore((state) => state.isLoading);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const showWelcome = messages.length === 0 && !isLoading;

  return (
    <div ref={containerRef} style={styles.container}>
      {showWelcome ? (
        <WelcomeMessage onTemplateClick={onPromptSuggestion || (() => {})} />
      ) : (
        <>
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              onSendToEditor={onSendToEditor}
              onRegenerate={onRegenerate}
            />
          ))}
          {isLoading && <TypingIndicator />}
        </>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
    paddingBottom: 'var(--spacing-md)'
  },
  message: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    padding: 'var(--spacing-md)',
    borderRadius: '8px'
  },
  messageUser: {
    background: 'var(--bg-tertiary)'
  },
  messageAssistant: {
    background: 'var(--bg-secondary)'
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  avatarUser: {
    background: 'var(--accent-primary)',
    color: 'white'
  },
  avatarAssistant: {
    background: 'var(--accent-success)',
    color: 'white'
  },
  content: {
    flex: 1,
    minWidth: 0
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    marginBottom: 'var(--spacing-xs)'
  },
  role: {
    fontWeight: 600,
    fontSize: 'var(--font-size-sm)',
    color: 'var(--text-primary)'
  },
  timestamp: {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--text-muted)'
  },
  text: {
    lineHeight: 1.6,
    color: 'var(--text-primary)'
  },
  errorText: {
    color: 'var(--accent-danger)'
  },
  diagramContainer: {
    marginTop: 'var(--spacing-md)'
  },
  typingContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    color: 'var(--text-secondary)'
  },
  spinner: {
    width: '20px',
    height: '20px',
    display: 'inline-flex'
  },
  welcome: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-xl)',
    textAlign: 'center',
    flex: 1
  },
  welcomeIcon: {
    width: '64px',
    height: '64px',
    marginBottom: 'var(--spacing-lg)',
    color: 'var(--accent-primary)',
    opacity: 0.8
  },
  welcomeTitle: {
    fontSize: '24px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: 'var(--spacing-sm)'
  },
  welcomeText: {
    fontSize: 'var(--font-size-md)',
    color: 'var(--text-secondary)',
    marginBottom: 'var(--spacing-lg)',
    maxWidth: '400px'
  },
  suggestions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-sm)',
    width: '100%',
    maxWidth: '500px'
  },
  suggestionBtn: {
    padding: 'var(--spacing-sm) var(--spacing-md)',
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-size-sm)',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  }
};

// Add CSS keyframes for spinner (SSR-safe)
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .chat-suggestion-btn:hover {
      background: var(--bg-hover);
      border-color: var(--accent-primary);
    }
  `;
  document.head.appendChild(styleSheet);
}

export default ChatHistory;
