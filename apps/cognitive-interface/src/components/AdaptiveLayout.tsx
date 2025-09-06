/**
 * AdaptiveLayout.tsx - Main Adaptive Layout for Cognitive Interface
 * 
 * This is the revolutionary core component that orchestrates the entire
 * cognitive-aware interface system. It dynamically switches between cognitive
 * modes based on user state and provides seamless transitions.
 * 
 * Part of the Galaxy Engine - World's first cognitive-aware interface system.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ExecutiveMode } from './ExecutiveMode';
import { TechnicalMode } from './TechnicalMode';
import { CreativeMode } from './CreativeMode';
import { CognitiveModeSwither } from './CognitiveModeSwither';
import './AdaptiveLayout.css';

interface CognitiveState {
  mode: 'executive' | 'technical' | 'creative' | 'analytical' | 'collaborative' | 'learning';
  confidence: number;
  context: {
    activeApps: string[];
    timeOfDay: string;
    workPattern: string;
    lastActions: string[];
  };
  transitions: CognitiveTransition[];
}

interface CognitiveTransition {
  id: string;
  fromMode: string;
  toMode: string;
  trigger: 'manual' | 'automatic' | 'shortcut';
  timestamp: Date;
  confidence: number;
  context?: any;
}

interface SessionAnalytics {
  totalTransitions: number;
  averageSessionDuration: number;
  mostUsedMode: string;
  productivityScore: number;
  cognitivePatterns: string[];
}

interface AdaptiveLayoutProps {
  userId?: string;
  initialMode?: CognitiveState['mode'];
  enableAutoDetection?: boolean;
  onModeChange?: (mode: CognitiveState['mode'], transition: CognitiveTransition) => void;
  onAnalyticsUpdate?: (analytics: SessionAnalytics) => void;
}

export const AdaptiveLayout: React.FC<AdaptiveLayoutProps> = ({
  userId = 'cognitive-user',
  initialMode = 'executive',
  enableAutoDetection = false,
  onModeChange,
  onAnalyticsUpdate
}: AdaptiveLayoutProps) => {
  const [cognitiveState, setCognitiveState] = useState<CognitiveState>({
    mode: initialMode,
    confidence: 95,
    context: {
      activeApps: ['cognitive-interface'],
      timeOfDay: new Date().getHours() < 12 ? 'morning' : 
                 new Date().getHours() < 17 ? 'afternoon' : 'evening',
      workPattern: 'focused',
      lastActions: ['system-startup']
    },
    transitions: []
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sessionStartTime] = useState(new Date());
  const [sessionAnalytics, setSessionAnalytics] = useState<SessionAnalytics>({
    totalTransitions: 0,
    averageSessionDuration: 0,
    mostUsedMode: initialMode,
    productivityScore: 85,
    cognitivePatterns: ['executive-start', 'technical-deep-work']
  });

  const [autoDetectionEnabled, setAutoDetectionEnabled] = useState(enableAutoDetection);
  const [modeHistory, setModeHistory] = useState<Array<{ mode: string; duration: number; timestamp: Date }>>([
    { mode: initialMode, duration: 0, timestamp: new Date() }
  ]);

  // Cognitive Engine Integration - Simulated for Phase 3
  const detectCognitiveState = useCallback(() => {
    // Simulate cognitive state detection based on context
    const context = cognitiveState.context;
    const currentHour = new Date().getHours();
    
    let suggestedMode: CognitiveState['mode'] = cognitiveState.mode;
    let confidence = 75;

    // Time-based patterns
    if (currentHour >= 9 && currentHour <= 11) {
      suggestedMode = 'executive';
      confidence += 10;
    } else if (currentHour >= 13 && currentHour <= 17) {
      suggestedMode = 'technical';
      confidence += 15;
    } else if (currentHour >= 19 && currentHour <= 21) {
      suggestedMode = 'creative';
      confidence += 12;
    }

    // Activity pattern analysis
    if (context.lastActions.some((action: string) => action.includes('code') || action.includes('debug'))) {
      suggestedMode = 'technical';
      confidence += 20;
    } else if (context.lastActions.some((action: string) => action.includes('design') || action.includes('content'))) {
      suggestedMode = 'creative';
      confidence += 18;
    } else if (context.lastActions.some((action: string) => action.includes('meeting') || action.includes('strategy'))) {
      suggestedMode = 'executive';
      confidence += 15;
    }

    return { suggestedMode, confidence: Math.min(confidence, 95) };
  }, [cognitiveState.context]);

  // Handle cognitive mode transitions
  const handleModeTransition = useCallback((
    newMode: CognitiveState['mode'],
    trigger: CognitiveTransition['trigger'] = 'manual'
  ) => {
    if (newMode === cognitiveState.mode || isTransitioning) return;

    setIsTransitioning(true);

    const transition: CognitiveTransition = {
      id: `transition-${Date.now()}`,
      fromMode: cognitiveState.mode,
      toMode: newMode,
      trigger,
      timestamp: new Date(),
      confidence: cognitiveState.confidence,
      context: { ...cognitiveState.context }
    };

    // Update mode history
    const currentTime = new Date();
    const lastEntry = modeHistory[modeHistory.length - 1];
    if (lastEntry) {
      const duration = currentTime.getTime() - lastEntry.timestamp.getTime();
      setModeHistory((prev: typeof modeHistory) => [
        ...prev.slice(0, -1),
        { ...lastEntry, duration },
        { mode: newMode, duration: 0, timestamp: currentTime }
      ]);
    }

    // Update cognitive state
    setTimeout(() => {
      setCognitiveState((prev: CognitiveState) => ({
        ...prev,
        mode: newMode,
        confidence: trigger === 'automatic' ? 90 : 95,
        transitions: [...prev.transitions, transition].slice(-10), // Keep last 10 transitions
        context: {
          ...prev.context,
          lastActions: [`mode-switch-${newMode}`, ...prev.context.lastActions].slice(0, 5)
        }
      }));

      // Update session analytics
      setSessionAnalytics((prev: SessionAnalytics) => {
        const updatedAnalytics = {
          ...prev,
          totalTransitions: prev.totalTransitions + 1,
          averageSessionDuration: (currentTime.getTime() - sessionStartTime.getTime()) / (1000 * 60),
          mostUsedMode: calculateMostUsedMode(modeHistory),
          productivityScore: calculateProductivityScore(modeHistory, cognitiveState.transitions),
          cognitivePatterns: updateCognitivePatterns(prev.cognitivePatterns, transition)
        };
        
        if (onAnalyticsUpdate) {
          onAnalyticsUpdate(updatedAnalytics);
        }
        
        return updatedAnalytics;
      });

      if (onModeChange) {
        onModeChange(newMode, transition);
      }

      setIsTransitioning(false);
    }, 300); // Smooth transition delay
  }, [cognitiveState, isTransitioning, modeHistory, sessionStartTime, onModeChange, onAnalyticsUpdate]);

  // Calculate most used mode
  const calculateMostUsedMode = (history: typeof modeHistory): string => {
    const modeCounts = history.reduce((acc: Record<string, number>, entry: typeof modeHistory[0]) => {
      acc[entry.mode] = (acc[entry.mode] || 0) + entry.duration;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(modeCounts).reduce((a: [string, number], b: [string, number]) => 
      ((modeCounts[a[0]] || 0) as number) > ((modeCounts[b[0]] || 0) as number) ? a : b
    )[0] as string;
  };

  // Calculate productivity score based on transitions and patterns
  const calculateProductivityScore = (
    history: typeof modeHistory, 
    transitions: CognitiveTransition[]
  ): number => {
    const baseScore = 70;
    let adjustments = 0;

    // Reward focused sessions (longer durations in single mode)
    const avgDuration = history.reduce((sum: number, entry: typeof modeHistory[0]) => sum + entry.duration, 0) / history.length;
    if (avgDuration > 30 * 60 * 1000) adjustments += 15; // 30+ minutes
    
    // Penalize excessive transitions
    const transitionRate = transitions.length / (history.length || 1);
    if (transitionRate > 0.5) adjustments -= 10;
    
    // Reward appropriate mode usage patterns
    const technicalSessions = history.filter((h: typeof modeHistory[0]) => h.mode === 'technical' && h.duration > 20 * 60 * 1000);
    if (technicalSessions.length > 0) adjustments += 10;
    
    return Math.min(Math.max(baseScore + adjustments, 0), 100);
  };

  // Update cognitive patterns
  const updateCognitivePatterns = (
    currentPatterns: string[], 
    transition: CognitiveTransition
  ): string[] => {
    const newPattern = `${transition.fromMode}-to-${transition.toMode}`;
    const updatedPatterns = [newPattern, ...currentPatterns.filter(p => p !== newPattern)];
    return updatedPatterns.slice(0, 5); // Keep top 5 patterns
  };

  // Keyboard shortcuts for mode switching
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only trigger if Ctrl+Shift is held
      if (!event.ctrlKey || !event.shiftKey) return;

      const keyModeMap: Record<string, CognitiveState['mode']> = {
        'E': 'executive',
        'T': 'technical', 
        'C': 'creative',
        'A': 'analytical',
        'O': 'collaborative',
        'L': 'learning'
      };

      const mode = keyModeMap[event.key.toUpperCase()];
      if (mode) {
        event.preventDefault();
        handleModeTransition(mode, 'shortcut');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleModeTransition]);

  // Automatic cognitive state detection
  useEffect(() => {
    if (!autoDetectionEnabled) return;

    const detectionInterval = setInterval(() => {
      const { suggestedMode, confidence } = detectCognitiveState();
      
      // Only auto-switch if confidence is high and mode is different
      if (confidence > 85 && suggestedMode !== cognitiveState.mode) {
        console.log(`Auto-detected cognitive state: ${suggestedMode} (${confidence}% confidence)`);
        handleModeTransition(suggestedMode, 'automatic');
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(detectionInterval);
  }, [autoDetectionEnabled, detectCognitiveState, cognitiveState.mode, handleModeTransition]);

  // Update context periodically
  useEffect(() => {
    const contextInterval = setInterval(() => {
      setCognitiveState((prev: CognitiveState) => ({
        ...prev,
        context: {
          ...prev.context,
          timeOfDay: new Date().getHours() < 12 ? 'morning' : 
                     new Date().getHours() < 17 ? 'afternoon' : 'evening'
        }
      }));
    }, 60000); // Update every minute

    return () => clearInterval(contextInterval);
  }, []);

  // Render current cognitive mode
  const renderCurrentMode = () => {
    const commonProps = {
      userId,
      onModeSwitch: (mode: string) => handleModeTransition(mode as CognitiveState['mode'])
    };

    switch (cognitiveState.mode) {
      case 'executive':
        return <ExecutiveMode {...commonProps} />;
      case 'technical':
        return <TechnicalMode {...commonProps} />;
      case 'creative':
        return <CreativeMode {...commonProps} />;
      case 'analytical':
        return (
          <div className="mode-placeholder analytical">
            <h2>🔬 Analytical Mode</h2>
            <p>Data analysis and research interface coming in Phase 4</p>
          </div>
        );
      case 'collaborative':
        return (
          <div className="mode-placeholder collaborative">
            <h2>🤝 Collaborative Mode</h2>
            <p>Team coordination and communication interface coming in Phase 4</p>
          </div>
        );
      case 'learning':
        return (
          <div className="mode-placeholder learning">
            <h2>🎓 Learning Mode</h2>
            <p>Educational and skill development interface coming in Phase 4</p>
          </div>
        );
      default:
        return <ExecutiveMode {...commonProps} />;
    }
  };

  return (
    <div className={`adaptive-layout ${cognitiveState.mode}`} data-cognitive-mode={cognitiveState.mode}>
      {/* Cognitive Mode Switcher */}
      <CognitiveModeSwither
        currentMode={cognitiveState.mode}
        onModeChange={(mode: string, transition: any) => handleModeTransition(mode as CognitiveState['mode'], transition?.trigger || 'manual')}
        showDetectionInsights={true}
        enableShortcuts={true}
      />

      {/* Transition Overlay */}
      {isTransitioning && (
        <div className="transition-overlay">
          <div className="transition-content">
            <div className="transition-spinner"></div>
            <p>Adapting to {cognitiveState.mode} mode...</p>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className={`content-area ${isTransitioning ? 'transitioning' : ''}`}>
        {renderCurrentMode()}
      </main>

      {/* Session Analytics (Hidden Debug Panel) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-analytics">
          <h4>🧠 Cognitive Analytics</h4>
          <div className="analytics-grid">
            <div className="analytics-item">
              <label>Total Transitions:</label>
              <span>{sessionAnalytics.totalTransitions}</span>
            </div>
            <div className="analytics-item">
              <label>Session Duration:</label>
              <span>{Math.round(sessionAnalytics.averageSessionDuration)} min</span>
            </div>
            <div className="analytics-item">
              <label>Most Used Mode:</label>
              <span>{sessionAnalytics.mostUsedMode}</span>
            </div>
            <div className="analytics-item">
              <label>Productivity Score:</label>
              <span>{sessionAnalytics.productivityScore}/100</span>
            </div>
            <div className="analytics-item">
              <label>Auto Detection:</label>
              <span>{autoDetectionEnabled ? 'ON' : 'OFF'}</span>
            </div>
            <div className="analytics-item">
              <label>Confidence:</label>
              <span>{cognitiveState.confidence}%</span>
            </div>
          </div>
          <div className="patterns-list">
            <strong>Patterns:</strong>
            {sessionAnalytics.cognitivePatterns.map((pattern: string, index: number) => (
              <span key={index} className="pattern-tag">{pattern}</span>
            ))}
          </div>
        </div>
      )}

      {/* Cognitive State Indicator */}
      <div className="cognitive-state-indicator">
        <div className="state-pulse" style={{ 
          background: cognitiveState.mode === 'executive' ? '#3b82f6' :
                     cognitiveState.mode === 'technical' ? '#7c3aed' :
                     cognitiveState.mode === 'creative' ? '#ec4899' : '#10b981'
        }}></div>
      </div>
    </div>
  );
};

export default AdaptiveLayout;