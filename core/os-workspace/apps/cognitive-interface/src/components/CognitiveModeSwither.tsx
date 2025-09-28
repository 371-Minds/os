/**
 * CognitiveModeSwither.tsx - Manual Cognitive State Transition Component
 *
 * This component enables manual switching between cognitive modes (Executive, Technical, Creative)
 * and serves as the foundation for automatic cognitive state detection in Phase 4.
 *
 * Part of the revolutionary Galaxy Engine cognitive-aware interface system.
 */

import type React from 'react';
import { useEffect, useState } from 'react';
import './CognitiveModeSwither.css';

interface CognitiveState {
  id:
    | 'executive'
    | 'technical'
    | 'creative'
    | 'analytical'
    | 'collaborative'
    | 'learning';
  name: string;
  description: string;
  icon: string;
  color: string;
  shortcut: string;
  optimizedFor: string[];
}

interface ModeTransition {
  fromState: string;
  toState: string;
  timestamp: Date;
  trigger: 'manual' | 'automatic' | 'shortcut';
  confidence?: number;
}

interface CognitiveModeSwithcerProps {
  currentMode: string;
  onModeChange: (mode: string, transition: ModeTransition) => void;
  onStateDetection?: (context: any) => void;
  showDetectionInsights?: boolean;
  enableShortcuts?: boolean;
}

export const CognitiveModeSwither: React.FC<CognitiveModeSwithcerProps> = ({
  currentMode = 'executive',
  onModeChange,
  onStateDetection,
  showDetectionInsights = true,
  enableShortcuts = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [recentTransitions, setRecentTransitions] = useState<ModeTransition[]>(
    [],
  );
  const [detectionContext, setDetectionContext] = useState<any>(null);
  const [autoDetectionEnabled, setAutoDetectionEnabled] = useState(false);

  const cognitiveStates: CognitiveState[] = [
    {
      id: 'executive',
      name: 'Executive Mode',
      description: 'Strategic decision-making and high-level oversight',
      icon: '👔',
      color: '#3b82f6',
      shortcut: 'Ctrl+E',
      optimizedFor: [
        'KPIs',
        'Strategy',
        'Team Coordination',
        'Decision Making',
      ],
    },
    {
      id: 'technical',
      name: 'Technical Mode',
      description: 'Development, debugging, and system operations',
      icon: '⚡',
      color: '#7c3aed',
      shortcut: 'Ctrl+T',
      optimizedFor: [
        'Code Development',
        'System Monitoring',
        'Debugging',
        'Architecture',
      ],
    },
    {
      id: 'creative',
      name: 'Creative Mode',
      description: 'Content creation, marketing, and design work',
      icon: '🎨',
      color: '#ec4899',
      shortcut: 'Ctrl+C',
      optimizedFor: ['Content Creation', 'Marketing', 'Design', 'Ideation'],
    },
    {
      id: 'analytical',
      name: 'Analytical Mode',
      description: 'Data analysis, research, and investigation',
      icon: '📊',
      color: '#f59e0b',
      shortcut: 'Ctrl+A',
      optimizedFor: ['Data Analysis', 'Research', 'Reports', 'Investigation'],
    },
    {
      id: 'collaborative',
      name: 'Collaborative Mode',
      description: 'Team coordination and communication',
      icon: '👥',
      color: '#10b981',
      shortcut: 'Ctrl+L',
      optimizedFor: ['Team Work', 'Communication', 'Meetings', 'Coordination'],
    },
    {
      id: 'learning',
      name: 'Learning Mode',
      description: 'Education, skill development, and knowledge acquisition',
      icon: '📚',
      color: '#6366f1',
      shortcut: 'Ctrl+Shift+L',
      optimizedFor: [
        'Learning',
        'Documentation',
        'Skill Building',
        'Knowledge',
      ],
    },
  ];

  const getCurrentState = (): CognitiveState => {
    return (
      cognitiveStates.find((state) => state.id === currentMode) ||
      cognitiveStates[0]
    );
  };

  const handleModeSwitch = (
    newMode: string,
    trigger: 'manual' | 'shortcut' = 'manual',
  ) => {
    const transition: ModeTransition = {
      fromState: currentMode,
      toState: newMode,
      timestamp: new Date(),
      trigger,
      confidence: trigger === 'manual' ? 1.0 : undefined,
    };

    // Update recent transitions
    setRecentTransitions((prev) => [transition, ...prev.slice(0, 4)]);

    // Call parent handler
    onModeChange(newMode, transition);

    // Collapse switcher after selection
    setIsExpanded(false);

    // Show feedback
    showTransitionFeedback(getCurrentState().name, newMode);
  };

  const showTransitionFeedback = (fromMode: string, toMode: string) => {
    const newState = cognitiveStates.find((s) => s.id === toMode);
    if (newState) {
      // Create a temporary notification
      const notification = document.createElement('div');
      notification.className = 'mode-transition-notification';
      notification.innerHTML = `
        <div class="notification-content">
          <span class="mode-icon">${newState.icon}</span>
          <div class="mode-info">
            <div class="mode-name">Switched to ${newState.name}</div>
            <div class="mode-desc">${newState.description}</div>
          </div>
        </div>
      `;
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(15, 23, 42, 0.95);
        border: 1px solid ${newState.color}40;
        border-left: 4px solid ${newState.color};
        border-radius: 8px;
        padding: 16px;
        color: white;
        backdrop-filter: blur(10px);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      `;

      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  };

  const handleKeyboardShortcut = (event: KeyboardEvent) => {
    if (!enableShortcuts) return;

    const shortcutMappings: { [key: string]: string } = {
      'Control+KeyE': 'executive',
      'Control+KeyT': 'technical',
      'Control+KeyC': 'creative',
      'Control+KeyA': 'analytical',
      'Control+KeyL': 'collaborative',
      'Control+Shift+KeyL': 'learning',
    };

    const shortcutKey = `${event.ctrlKey ? 'Control+' : ''}${event.shiftKey ? 'Shift+' : ''}${event.code}`;
    const targetMode = shortcutMappings[shortcutKey];

    if (targetMode && targetMode !== currentMode) {
      event.preventDefault();
      handleModeSwitch(targetMode, 'shortcut');
    }
  };

  const simulateContextDetection = () => {
    // Simulate cognitive context detection for demonstration
    const currentTime = new Date().getHours();
    const mockContext = {
      timeOfDay: currentTime,
      recentActions: ['BUILD_PROJECT', 'RUN_TESTS', 'DEBUG_ISSUES'],
      focusLevel: 'high',
      multitasking: false,
      sessionDuration: Math.floor(Math.random() * 120) + 30, // 30-150 minutes
      workType: 'development',
    };

    setDetectionContext(mockContext);

    if (onStateDetection) {
      onStateDetection(mockContext);
    }

    // Mock automatic state suggestion
    let suggestedState = 'executive';
    let confidence = 0.7;

    if (
      currentTime >= 14 &&
      currentTime <= 17 &&
      mockContext.recentActions.some((a) => a.includes('BUILD'))
    ) {
      suggestedState = 'technical';
      confidence = 0.9;
    } else if (mockContext.recentActions.some((a) => a.includes('CREATE'))) {
      suggestedState = 'creative';
      confidence = 0.8;
    }

    return { suggestedState, confidence };
  };

  const formatTransitionTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours}h ago`;
  };

  useEffect(() => {
    if (enableShortcuts) {
      document.addEventListener('keydown', handleKeyboardShortcut);
      return () =>
        document.removeEventListener('keydown', handleKeyboardShortcut);
    }
  }, [enableShortcuts, currentMode]);

  // Add animation styles to document head
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .mode-icon {
        font-size: 24px;
      }
      .mode-info .mode-name {
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 4px;
      }
      .mode-info .mode-desc {
        font-size: 12px;
        opacity: 0.8;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const currentState = getCurrentState();

  return (
    <div className="cognitive-mode-switcher">
      {/* Current Mode Display */}
      <div
        className={`current-mode ${isExpanded ? 'expanded' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ borderLeftColor: currentState.color }}
      >
        <div className="mode-indicator">
          <span className="mode-icon">{currentState.icon}</span>
          <div className="mode-info">
            <div className="mode-name">{currentState.name}</div>
            <div className="mode-desc">{currentState.description}</div>
          </div>
        </div>
        <div className="mode-controls">
          <button className="expand-btn" aria-label="Toggle mode switcher">
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {/* Expanded Mode Options */}
      {isExpanded && (
        <div className="mode-options">
          <div className="options-header">
            <h3>Switch Cognitive Mode</h3>
            <div className="auto-detection-toggle">
              <label>
                <input
                  type="checkbox"
                  checked={autoDetectionEnabled}
                  onChange={(e) => setAutoDetectionEnabled(e.target.checked)}
                />
                Auto-detection (Phase 4)
              </label>
            </div>
          </div>

          <div className="modes-grid">
            {cognitiveStates.map((state) => (
              <div
                key={state.id}
                className={`mode-option ${state.id === currentMode ? 'active' : ''}`}
                onClick={() => handleModeSwitch(state.id)}
                style={{ '--mode-color': state.color } as React.CSSProperties}
              >
                <div className="option-header">
                  <span className="option-icon">{state.icon}</span>
                  <div className="option-info">
                    <div className="option-name">{state.name}</div>
                    <div className="option-shortcut">{state.shortcut}</div>
                  </div>
                  {state.id === currentMode && (
                    <div className="active-indicator">●</div>
                  )}
                </div>
                <div className="option-description">{state.description}</div>
                <div className="optimized-for">
                  <div className="optimization-label">Optimized for:</div>
                  <div className="optimization-tags">
                    {state.optimizedFor.slice(0, 2).map((item, index) => (
                      <span key={index} className="optimization-tag">
                        {item}
                      </span>
                    ))}
                    {state.optimizedFor.length > 2 && (
                      <span className="more-tag">
                        +{state.optimizedFor.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showDetectionInsights && (
            <div className="detection-section">
              <div className="section-header">
                <h4>Cognitive Detection (Demo)</h4>
                <button
                  className="detect-btn"
                  onClick={simulateContextDetection}
                >
                  Analyze Current Context
                </button>
              </div>

              {detectionContext && (
                <div className="detection-results">
                  <div className="context-info">
                    <div className="context-item">
                      <span className="context-label">Time:</span>
                      <span className="context-value">
                        {detectionContext.timeOfDay}:00
                      </span>
                    </div>
                    <div className="context-item">
                      <span className="context-label">Focus:</span>
                      <span className="context-value">
                        {detectionContext.focusLevel}
                      </span>
                    </div>
                    <div className="context-item">
                      <span className="context-label">Session:</span>
                      <span className="context-value">
                        {detectionContext.sessionDuration}m
                      </span>
                    </div>
                  </div>

                  <div className="detection-suggestion">
                    <div className="suggestion-text">
                      AI suggests: <strong>Technical Mode</strong> (90%
                      confidence)
                    </div>
                    <button
                      className="apply-suggestion"
                      onClick={() => handleModeSwitch('technical', 'manual')}
                    >
                      Apply Suggestion
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {recentTransitions.length > 0 && (
            <div className="recent-transitions">
              <h4>Recent Transitions</h4>
              <div className="transitions-list">
                {recentTransitions.map((transition, index) => {
                  const fromState = cognitiveStates.find(
                    (s) => s.id === transition.fromState,
                  );
                  const toState = cognitiveStates.find(
                    (s) => s.id === transition.toState,
                  );

                  return (
                    <div key={index} className="transition-item">
                      <div className="transition-flow">
                        <span className="from-state">
                          {fromState?.icon} {fromState?.name}
                        </span>
                        <span className="transition-arrow">→</span>
                        <span className="to-state">
                          {toState?.icon} {toState?.name}
                        </span>
                      </div>
                      <div className="transition-meta">
                        <span className="transition-time">
                          {formatTransitionTime(transition.timestamp)}
                        </span>
                        <span
                          className={`transition-trigger ${transition.trigger}`}
                        >
                          {transition.trigger}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CognitiveModeSwither;
