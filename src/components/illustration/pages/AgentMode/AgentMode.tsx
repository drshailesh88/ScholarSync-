"use client";
/**
 * AgentMode Component
 *
 * Main Agent Mode layout with:
 * - Left sidebar with template gallery
 * - Center chat area with messages
 * - Right preview pane showing generated diagram
 * - Bottom prompt input bar
 *
 * Uses Zustand stores for state management
 * Responsive layout
 */

import React, { useState, useCallback, useRef } from 'react';
import { useAgentStore } from '@/stores/illustration/useAgentStore';
import { TemplateGallery } from './TemplateGallery';
import { ChatHistory } from './ChatHistory';
import { PromptInput } from './PromptInput';
import { DiagramPreview } from './DiagramPreview';

// Sample diagram generators (simulating AI responses)
const generateConsortDiagram = (): string => `<svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
  <style>
    .box { fill: #f8f9fa; stroke: #333; stroke-width: 2; }
    .text { font-family: Arial, sans-serif; font-size: 12px; text-anchor: middle; }
    .arrow { stroke: #333; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
  </style>
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
  </defs>
  <rect class="box" x="200" y="20" width="200" height="50" rx="5"/>
  <text class="text" x="300" y="50">Assessed for eligibility (n=500)</text>
  <line class="arrow" x1="300" y1="70" x2="300" y2="100"/>
  <rect class="box" x="420" y="75" width="150" height="60" rx="5"/>
  <text class="text" x="495" y="100">Excluded (n=100)</text>
  <text class="text" x="495" y="120" font-size="10">Not meeting criteria: 80</text>
  <line x1="400" y1="85" x2="420" y2="85" stroke="#333" stroke-width="2"/>
  <rect class="box" x="200" y="100" width="200" height="50" rx="5"/>
  <text class="text" x="300" y="130">Randomized (n=400)</text>
  <line class="arrow" x1="250" y1="150" x2="150" y2="200"/>
  <line class="arrow" x1="350" y1="150" x2="450" y2="200"/>
  <rect class="box" x="50" y="200" width="180" height="60" rx="5"/>
  <text class="text" x="140" y="225">Allocated to Treatment</text>
  <text class="text" x="140" y="245">(n=200)</text>
  <rect class="box" x="370" y="200" width="180" height="60" rx="5"/>
  <text class="text" x="460" y="225">Allocated to Control</text>
  <text class="text" x="460" y="245">(n=200)</text>
  <line class="arrow" x1="140" y1="260" x2="140" y2="300"/>
  <line class="arrow" x1="460" y1="260" x2="460" y2="300"/>
  <rect class="box" x="50" y="300" width="180" height="60" rx="5"/>
  <text class="text" x="140" y="325">Lost to follow-up</text>
  <text class="text" x="140" y="345">(n=10)</text>
  <rect class="box" x="370" y="300" width="180" height="60" rx="5"/>
  <text class="text" x="460" y="325">Lost to follow-up</text>
  <text class="text" x="460" y="345">(n=15)</text>
  <line class="arrow" x1="140" y1="360" x2="140" y2="400"/>
  <line class="arrow" x1="460" y1="360" x2="460" y2="400"/>
  <rect class="box" x="50" y="400" width="180" height="60" rx="5"/>
  <text class="text" x="140" y="425">Analyzed</text>
  <text class="text" x="140" y="445">(n=190)</text>
  <rect class="box" x="370" y="400" width="180" height="60" rx="5"/>
  <text class="text" x="460" y="425">Analyzed</text>
  <text class="text" x="460" y="445">(n=185)</text>
</svg>`;

const generateForestPlot = (): string => `<svg viewBox="0 0 700 350" xmlns="http://www.w3.org/2000/svg">
  <style>
    .label { font-family: Arial, sans-serif; font-size: 11px; }
    .header { font-family: Arial, sans-serif; font-size: 12px; font-weight: bold; }
    .line { stroke: #333; stroke-width: 1; }
    .ci-line { stroke: #333; stroke-width: 2; }
    .point { fill: #333; }
    .diamond { fill: #0066cc; }
    .null-line { stroke: #999; stroke-width: 1; stroke-dasharray: 4,4; }
  </style>
  <text class="header" x="20" y="30">Study</text>
  <text class="header" x="150" y="30">Year</text>
  <text class="header" x="550" y="30">OR (95% CI)</text>
  <text class="header" x="650" y="30">Weight</text>
  <line class="null-line" x1="350" y1="50" x2="350" y2="280"/>
  <line class="line" x1="220" y1="290" x2="480" y2="290"/>
  <text class="label" x="220" y="305" text-anchor="middle">0.1</text>
  <text class="label" x="350" y="305" text-anchor="middle">1.0</text>
  <text class="label" x="480" y="305" text-anchor="middle">10</text>
  <text class="label" x="20" y="75">Smith et al.</text>
  <text class="label" x="150" y="75">2019</text>
  <line class="ci-line" x1="280" y1="70" x2="380" y2="70"/>
  <rect class="point" x="320" y="65" width="10" height="10"/>
  <text class="label" x="550" y="75">0.85 (0.62-1.15)</text>
  <text class="label" x="650" y="75">22.4%</text>
  <text class="label" x="20" y="115">Johnson et al.</text>
  <text class="label" x="150" y="115">2020</text>
  <line class="ci-line" x1="300" y1="110" x2="420" y2="110"/>
  <rect class="point" x="355" y="105" width="12" height="12"/>
  <text class="label" x="550" y="115">1.02 (0.78-1.34)</text>
  <text class="label" x="650" y="115">25.1%</text>
  <text class="label" x="20" y="155">Williams et al.</text>
  <text class="label" x="150" y="155">2021</text>
  <line class="ci-line" x1="260" y1="150" x2="340" y2="150"/>
  <rect class="point" x="295" y="145" width="8" height="8"/>
  <text class="label" x="550" y="155">0.72 (0.55-0.94)</text>
  <text class="label" x="650" y="155">18.3%</text>
  <line class="line" x1="20" y1="260" x2="680" y2="260"/>
  <text class="header" x="20" y="278">Overall</text>
  <polygon class="diamond" points="330,275 350,265 370,275 350,285"/>
  <text class="header" x="550" y="278">0.89 (0.78-1.02)</text>
  <text class="header" x="650" y="278">100%</text>
  <text class="label" x="280" y="325" text-anchor="middle">Favors Treatment</text>
  <text class="label" x="420" y="325" text-anchor="middle">Favors Control</text>
</svg>`;

const generatePathwayDiagram = (): string => `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <style>
    .node { fill: #e3f2fd; stroke: #1976d2; stroke-width: 2; }
    .receptor { fill: #fff3e0; stroke: #f57c00; stroke-width: 2; }
    .enzyme { fill: #e8f5e9; stroke: #388e3c; stroke-width: 2; }
    .tf { fill: #fce4ec; stroke: #c2185b; stroke-width: 2; }
    .text { font-family: Arial, sans-serif; font-size: 11px; text-anchor: middle; }
    .arrow { stroke: #333; stroke-width: 2; fill: none; marker-end: url(#arrowhead2); }
  </style>
  <defs>
    <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
  </defs>
  <text x="300" y="25" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">MAPK/ERK Signaling Pathway</text>
  <ellipse class="receptor" cx="300" cy="70" rx="60" ry="25"/>
  <text class="text" x="300" y="75">Growth Factor Receptor</text>
  <path class="arrow" d="M300,95 L300,120"/>
  <ellipse class="node" cx="300" cy="150" rx="40" ry="20"/>
  <text class="text" x="300" y="155">RAS</text>
  <path class="arrow" d="M300,170 L300,200"/>
  <rect class="enzyme" x="260" y="210" width="80" height="35" rx="5"/>
  <text class="text" x="300" y="232">RAF</text>
  <path class="arrow" d="M300,245 L300,275"/>
  <rect class="enzyme" x="260" y="285" width="80" height="35" rx="5"/>
  <text class="text" x="300" y="307">MEK1/2</text>
  <path class="arrow" d="M300,320 L300,350"/>
  <rect class="enzyme" x="260" y="355" width="80" height="35" rx="5"/>
  <text class="text" x="300" y="377">ERK1/2</text>
</svg>`;

const generateFlowchart = (): string => `<svg viewBox="0 0 500 450" xmlns="http://www.w3.org/2000/svg">
  <style>
    .box { fill: #e3f2fd; stroke: #1976d2; stroke-width: 2; }
    .decision { fill: #fff8e1; stroke: #f9a825; stroke-width: 2; }
    .terminal { fill: #e8f5e9; stroke: #388e3c; stroke-width: 2; }
    .text { font-family: Arial, sans-serif; font-size: 12px; text-anchor: middle; }
    .arrow { stroke: #333; stroke-width: 2; fill: none; marker-end: url(#arrowhead3); }
    .label { font-family: Arial, sans-serif; font-size: 10px; }
  </style>
  <defs>
    <marker id="arrowhead3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
  </defs>
  <ellipse class="terminal" cx="250" cy="35" rx="60" ry="25"/>
  <text class="text" x="250" y="40">Start</text>
  <line class="arrow" x1="250" y1="60" x2="250" y2="85"/>
  <rect class="box" x="150" y="90" width="200" height="45" rx="5"/>
  <text class="text" x="250" y="118">Collect Data</text>
  <line class="arrow" x1="250" y1="135" x2="250" y2="160"/>
  <polygon class="decision" points="250,165 350,210 250,255 150,210"/>
  <text class="text" x="250" y="215">Valid Data?</text>
  <line class="arrow" x1="250" y1="255" x2="250" y2="285"/>
  <text class="label" x="260" y="275">Yes</text>
  <rect class="box" x="150" y="290" width="200" height="45" rx="5"/>
  <text class="text" x="250" y="318">Analyze Results</text>
  <line class="arrow" x1="250" y1="335" x2="250" y2="360"/>
  <rect class="box" x="150" y="365" width="200" height="45" rx="5"/>
  <text class="text" x="250" y="393">Generate Report</text>
  <line class="arrow" x1="250" y1="410" x2="250" y2="435"/>
  <ellipse class="terminal" cx="250" cy="460" rx="60" ry="25"/>
  <text class="text" x="250" y="465">End</text>
</svg>`;

const generateGenericDiagram = (): string => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <style>
    .box { fill: #e3f2fd; stroke: #1976d2; stroke-width: 2; }
    .text { font-family: Arial, sans-serif; font-size: 12px; text-anchor: middle; }
    .arrow { stroke: #333; stroke-width: 2; fill: none; marker-end: url(#arrowhead4); }
  </style>
  <defs>
    <marker id="arrowhead4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
    </marker>
  </defs>
  <rect class="box" x="125" y="30" width="150" height="50" rx="5"/>
  <text class="text" x="200" y="60">Input</text>
  <line class="arrow" x1="200" y1="80" x2="200" y2="115"/>
  <rect class="box" x="125" y="120" width="150" height="50" rx="5"/>
  <text class="text" x="200" y="150">Process</text>
  <line class="arrow" x1="200" y1="170" x2="200" y2="205"/>
  <rect class="box" x="125" y="210" width="150" height="50" rx="5"/>
  <text class="text" x="200" y="240">Output</text>
</svg>`;

// Response generator based on prompt
const generateDiagramFromPrompt = (prompt: string): { text: string; diagram: string } => {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('consort') || lowerPrompt.includes('trial')) {
    return {
      text: "I've created a CONSORT flow diagram for your clinical trial. The diagram shows the enrollment, allocation, follow-up, and analysis phases. You can edit it further in the Editor mode.",
      diagram: generateConsortDiagram()
    };
  }

  if (lowerPrompt.includes('forest') || lowerPrompt.includes('meta')) {
    return {
      text: "Here's a forest plot showing effect sizes and confidence intervals. Each study is represented with its weight and the diamond shows the overall effect.",
      diagram: generateForestPlot()
    };
  }

  if (lowerPrompt.includes('pathway') || lowerPrompt.includes('signaling') || lowerPrompt.includes('mapk')) {
    return {
      text: "I've created a signaling pathway diagram. The nodes represent proteins/molecules and arrows show activation relationships.",
      diagram: generatePathwayDiagram()
    };
  }

  if (lowerPrompt.includes('flowchart') || lowerPrompt.includes('process') || lowerPrompt.includes('flow')) {
    return {
      text: "Here's a flowchart for your process. You can customize the steps and connections in the Editor.",
      diagram: generateFlowchart()
    };
  }

  return {
    text: "I've created a diagram based on your description. You can further customize it in the Editor mode, or provide more specific requirements.",
    diagram: generateGenericDiagram()
  };
};

interface AgentModeProps {
  onSendToEditor?: (svg: string) => void;
}

export const AgentMode: React.FC<AgentModeProps> = ({ onSendToEditor }) => {
  const [showPreviewPane, setShowPreviewPane] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const {
    addMessage,
    setLoading,
    currentDiagram,
    messages
  } = useAgentStore();

  // Handle sending a prompt
  const handleSendPrompt = useCallback(async (prompt: string) => {
    // Add user message
    addMessage({
      role: 'user',
      content: prompt
    });

    // Set loading state
    setLoading(true);
    abortControllerRef.current = new AbortController();

    try {
      // Simulate API delay
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, 1500);
        abortControllerRef.current?.signal.addEventListener('abort', () => {
          clearTimeout(timeout);
          reject(new Error('Generation cancelled'));
        });
      });

      // Generate response
      const response = generateDiagramFromPrompt(prompt);

      // Add assistant message with diagram
      addMessage({
        role: 'assistant',
        content: response.text,
        diagram: response.diagram
      });
    } catch (error) {
      if ((error as Error).message !== 'Generation cancelled') {
        addMessage({
          role: 'assistant',
          content: `Sorry, I encountered an error: ${(error as Error).message}. Please try again.`,
          isError: true
        });
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [addMessage, setLoading]);

  // Handle stop generation
  const handleStop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // Handle template selection
  const handleSelectTemplate = useCallback((prompt: string) => {
    handleSendPrompt(prompt);
  }, [handleSendPrompt]);

  // Handle send to editor
  const handleSendToEditor = useCallback((svg: string) => {
    if (onSendToEditor) {
      onSendToEditor(svg);
    }
  }, [onSendToEditor]);

  // Handle regenerate
  const handleRegenerate = useCallback((messageId: string) => {
    const msgIndex = messages.findIndex((m) => m.id === messageId);
    if (msgIndex > 0) {
      const userMessage = messages[msgIndex - 1];
      if (userMessage.role === 'user') {
        handleSendPrompt(userMessage.content);
      }
    }
  }, [messages, handleSendPrompt]);

  // Handle prompt suggestion from welcome screen
  const handlePromptSuggestion = useCallback((prompt: string) => {
    handleSendPrompt(prompt);
  }, [handleSendPrompt]);

  return (
    <div style={styles.container}>
      {/* Left Sidebar: Template Gallery */}
      <TemplateGallery onSelectTemplate={handleSelectTemplate} />

      {/* Main Chat Area */}
      <main style={styles.main}>
        <div style={styles.chatContainer}>
          <ChatHistory
            onSendToEditor={handleSendToEditor}
            onRegenerate={handleRegenerate}
            onPromptSuggestion={handlePromptSuggestion}
          />
          <PromptInput onSend={handleSendPrompt} onStop={handleStop} />
        </div>
      </main>

      {/* Right Preview Pane (optional) */}
      {showPreviewPane && currentDiagram && (
        <aside style={styles.previewPane}>
          <div style={styles.previewHeader}>
            <h3 style={styles.previewTitle}>Preview</h3>
            <button
              onClick={() => setShowPreviewPane(false)}
              style={styles.closeBtn}
              title="Close preview"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div style={styles.previewContent}>
            <DiagramPreview svg={currentDiagram} />
          </div>
        </aside>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
    background: 'var(--bg-primary)'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--bg-primary)',
    overflow: 'hidden'
  },
  chatContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '900px',
    margin: '0 auto',
    width: '100%',
    padding: 'var(--spacing-lg)',
    overflow: 'hidden'
  },
  previewPane: {
    width: '350px',
    background: 'var(--bg-secondary)',
    borderLeft: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  previewHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--spacing-md)',
    borderBottom: '1px solid var(--border-color)'
  },
  previewTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 500,
    color: 'var(--text-primary)',
    margin: 0
  },
  closeBtn: {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'all var(--transition-fast)'
  },
  previewContent: {
    flex: 1,
    padding: 'var(--spacing-md)',
    overflow: 'auto'
  }
};

// Add responsive styles
const responsiveStyles = document.createElement('style');
responsiveStyles.textContent = `
  @media (max-width: 1200px) {
    .agent-preview-pane {
      width: 300px;
    }
  }
  @media (max-width: 992px) {
    .agent-sidebar {
      display: none;
    }
    .agent-preview-pane {
      display: none;
    }
  }
  @media (max-width: 768px) {
    .agent-chat-container {
      padding: var(--spacing-md);
    }
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(responsiveStyles);
}

export default AgentMode;
