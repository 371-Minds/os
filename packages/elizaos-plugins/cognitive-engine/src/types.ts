/**
 * Cognitive Engine Types - Core type definitions for cognitive state management
 * 
 * These types define the foundation of the Galaxy Engine's cognitive awareness system
 */

/**
 * Core cognitive states that users can exist in
 * Each state requires different interface optimizations and agent behaviors
 */
export type CognitiveState = 
  | 'executive'     // Strategic thinking, high-level decisions, KPIs
  | 'technical'     // Development work, debugging, system operations  
  | 'creative'      // Content creation, design, marketing
  | 'analytical'    // Data analysis, research, investigation
  | 'collaborative' // Team coordination, communication, management
  | 'learning';     // Education, documentation, skill development

/**
 * Cognitive context information that influences state detection
 */
export interface CognitiveContext {
  currentTask?: string;
  recentActions: string[];
  timeOfDay: number;
  dayOfWeek: number;
  sessionDuration: number;
  focusLevel: 'high' | 'medium' | 'low';
  multitasking: boolean;
  mood?: 'energetic' | 'focused' | 'tired' | 'stressed' | 'creative';
}

/**
 * UI mode configuration for each cognitive state
 */
export interface UIMode {
  name: string;
  description: string;
  cognitiveState: CognitiveState;
  primaryActions: string[];
  layoutConfig: {
    showMetrics: boolean;
    showTools: boolean;
    showAgents: boolean;
    emphasizeSpeed: boolean;
    emphasizeDetail: boolean;
  };
  agentBehavior: {
    responseStyle: 'concise' | 'detailed' | 'visual';
    proactivity: 'high' | 'medium' | 'low';
    suggestionsEnabled: boolean;
  };
}

/**
 * Cognitive state transition definition
 */
export interface StateTransition {
  fromState: CognitiveState;
  toState: CognitiveState;
  trigger: 'manual' | 'automatic' | 'scheduled';
  confidence: number; // 0-1 confidence score for automatic transitions
  context: CognitiveContext;
  timestamp: number;
}

/**
 * User cognitive profile - learned patterns and preferences
 */
export interface CognitiveProfile {
  userId: string;
  preferredStates: CognitiveState[];
  statePatterns: {
    [state in CognitiveState]?: {
      typicalDuration: number;
      commonTriggers: string[];
      timePreferences: number[]; // hours of day
      transitionPatterns: CognitiveState[];
    };
  };
  customModes: UIMode[];
  learningEnabled: boolean;
  lastUpdated: number;
}

/**
 * Cognitive state detection result
 */
export interface StateDetectionResult {
  detectedState: CognitiveState;
  confidence: number;
  reasoning: string[];
  suggestedMode: string;
  alternativeStates: Array<{
    state: CognitiveState;
    confidence: number;
  }>;
}

/**
 * Galaxy Engine universe configuration
 */
export interface UniverseConfig {
  name: string;
  description: string;
  targetAudience: string;
  dataIngestion: {
    sources: string[];
    processors: string[];
  };
  visualization: {
    theme: string;
    planetTypes: string[];
    connectionTypes: string[];
  };
  interactions: {
    actions: string[];
    modals: string[];
  };
}

/**
 * Application universe instance
 */
export interface ApplicationUniverse {
  id: string;
  name: string;
  config: UniverseConfig;
  userState: {
    cognitiveProfile: CognitiveProfile;
    currentMode: string;
    sessionData: any;
  };
  generated: boolean;
  lastUpdated: number;
}