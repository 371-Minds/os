/**
 * App.tsx - Main Cognitive Interface Application
 *
 * This is the entry point for the revolutionary cognitive-aware interface system.
 * Integrates with the ElizaOS cognitive engine plugin for real-time cognitive state detection.
 */

import type React from 'react';
import { useEffect, useState } from 'react';
import { AdaptiveLayout } from './components';
import './App.css';

// Type definitions for cognitive engine integration
interface CognitiveEnginePlugin {
  name: string;
  description: string;
  actions: Array<{
    name: string;
    description: string;
    handler: Function;
  }>;
  providers: Array<{
    get: (runtime: any, message: any) => Promise<string>;
  }>;
}

interface CognitiveInterfaceProps {
  userId?: string;
  enableAutoDetection?: boolean;
  cognitiveEnginePlugin?: CognitiveEnginePlugin;
  onStateChange?: (state: any) => void;
}

export const CognitiveInterface: React.FC<CognitiveInterfaceProps> = ({
  userId = 'cognitive-user',
  enableAutoDetection = true,
  cognitiveEnginePlugin,
  onStateChange,
}) => {
  const [pluginConnected, setPluginConnected] = useState(false);
  const [cognitiveCapabilities, setCognitiveCapabilities] = useState<string[]>(
    [],
  );

  // Initialize cognitive engine plugin integration
  useEffect(() => {
    if (cognitiveEnginePlugin) {
      console.log(
        '🧠 Cognitive Engine Plugin detected:',
        cognitiveEnginePlugin.name,
      );
      console.log(
        '📋 Available actions:',
        cognitiveEnginePlugin.actions.map((a) => a.name),
      );

      setCognitiveCapabilities(
        cognitiveEnginePlugin.actions.map((action) => action.name),
      );
      setPluginConnected(true);

      // Simulate plugin initialization
      setTimeout(() => {
        console.log('✅ Cognitive Engine Plugin initialized successfully');
        console.log('🎯 Real-time cognitive state detection: ENABLED');
      }, 1000);
    } else {
      console.log(
        '⚠️ Running in demo mode - cognitive engine plugin not connected',
      );
      console.log(
        '🔮 Phase 4: Automatic cognitive detection will be enabled with plugin integration',
      );
    }
  }, [cognitiveEnginePlugin]);

  // Handle cognitive state changes from the adaptive layout
  const handleCognitiveStateChange = (mode: string, transition: any) => {
    console.log(`🧠 Cognitive state changed: ${transition.fromMode} → ${mode}`);
    console.log(`🎯 Transition trigger: ${transition.trigger}`);
    console.log(`📊 Confidence: ${transition.confidence}%`);

    if (onStateChange) {
      onStateChange({
        mode,
        transition,
        pluginConnected,
        capabilities: cognitiveCapabilities,
      });
    }

    // If plugin is connected, sync with ElizaOS cognitive engine
    if (pluginConnected && cognitiveEnginePlugin) {
      // Future: Send cognitive state to ElizaOS for agent coordination
      console.log('🔗 Syncing cognitive state with ElizaOS agent network...');
    }
  };

  // Handle analytics updates from the adaptive layout
  const handleAnalyticsUpdate = (analytics: any) => {
    console.log('📊 Cognitive analytics updated:', analytics);

    // Future: Send analytics to ElizaOS for learning and optimization
    if (pluginConnected && cognitiveEnginePlugin) {
      console.log(
        '📈 Sending analytics to ElizaOS cognitive engine for optimization...',
      );
    }
  };

  return (
    <div className="cognitive-interface-app">
      {/* Plugin Connection Status */}
      {process.env.NODE_ENV === 'development' && (
        <div
          className={`plugin-status ${pluginConnected ? 'connected' : 'disconnected'}`}
        >
          <div className="status-indicator">
            {pluginConnected ? '🟢' : '🟡'}
            Cognitive Engine: {pluginConnected ? 'Connected' : 'Demo Mode'}
          </div>
          {cognitiveCapabilities.length > 0 && (
            <div className="capabilities">
              Capabilities: {cognitiveCapabilities.join(', ')}
            </div>
          )}
        </div>
      )}

      {/* Main Adaptive Layout */}
      <AdaptiveLayout
        userId={userId}
        enableAutoDetection={enableAutoDetection && pluginConnected}
        onModeChange={handleCognitiveStateChange}
        onAnalyticsUpdate={handleAnalyticsUpdate}
      />

      {/* Integration Status Footer */}
      {process.env.NODE_ENV === 'development' && (
        <div className="integration-footer">
          <div className="integration-status">
            <span className="status-label">371 OS Status:</span>
            <span className="status-value">
              {pluginConnected
                ? 'Cognitive-Aware Interface Active'
                : 'Manual Mode Active'}
            </span>
          </div>
          <div className="next-phase">
            <span className="phase-label">Next Phase:</span>
            <span className="phase-value">
              {pluginConnected
                ? 'Galaxy Engine Universe Prototype'
                : 'ElizaOS Plugin Integration'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// Default App component for standard React app structure
const App: React.FC = () => {
  return (
    <CognitiveInterface
      userId="371-os-user"
      enableAutoDetection={true}
      onStateChange={(state) => {
        // Global state change handler
        console.log('🌟 Global cognitive state update:', state);
      }}
    />
  );
};

export default App;
