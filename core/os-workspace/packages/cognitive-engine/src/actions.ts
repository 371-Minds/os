/**
 * Cognitive Engine Actions - Core actions for cognitive state management
 *
 * These actions enable agents to understand, detect, and manage user cognitive states,
 * forming the foundation of the Galaxy Engine's adaptive interface system.
 */

import type {
  Action,
  HandlerCallback,
  IAgentRuntime,
  Memory,
} from '@elizaos/core';
import { CognitiveStateProvider } from './provider';
import type {
  CognitiveContext,
  CognitiveState,
  StateDetectionResult,
  StateTransition,
  UIMode,
} from './types';

/**
 * Action: Set Cognitive Mode
 *
 * Manually sets the user's cognitive state and updates the UI accordingly.
 * This is the foundational action for Phase 1 manual mode switching.
 */
export const setCognitiveModeAction: Action = {
  name: 'SET_COGNITIVE_MODE',
  similes: [
    'SWITCH_UI_MODE',
    'CHANGE_COGNITIVE_STATE',
    'SET_USER_MODE',
    'ACTIVATE_MODE',
  ],
  description:
    'Manually sets the cognitive state and adapts the UI to match user context',
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    return true; // Basic validation - mode switching is always allowed
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state?: any,
    options: any = {},
    callback?: HandlerCallback,
  ): Promise<void> => {
    try {
      const provider = new CognitiveStateProvider();
      const targetState = options?.state as CognitiveState;
      const userId = options?.userId || 'default';

      if (!targetState) {
        if (callback) {
          callback({
            text: 'Please specify a cognitive state: executive, technical, creative, analytical, collaborative, or learning',
            content: {
              error: 'Missing required state parameter',
              availableStates: [
                'executive',
                'technical',
                'creative',
                'analytical',
                'collaborative',
                'learning',
              ],
            },
          });
        }
        return;
      }

      // Execute the state transition
      const transition: StateTransition = await provider.setCognitiveMode(
        userId,
        targetState,
        {
          trigger: 'manual',
          context: options?.context || {},
        },
      );

      // Get the UI mode configuration for this state
      const uiMode: UIMode = await provider.getUIModeForState(targetState);

      if (callback) {
        callback({
          text: `Cognitive mode switched to ${targetState}. Interface adapting to your ${targetState} workflow.`,
          content: {
            transition,
            uiMode,
            adaptations: {
              interface: uiMode.layoutConfig,
              agentBehavior: uiMode.agentBehavior,
              primaryActions: uiMode.primaryActions,
            },
            message: `Now optimized for ${targetState} operations. Your agents will adapt their communication style and the interface will prioritize relevant tools.`,
          },
        });
      }
    } catch (error) {
      console.error('Failed to set cognitive mode:', error);
      if (callback) {
        callback({
          text: `Failed to switch cognitive mode: ${(error as Error).message}`,
          content: { error: (error as Error).message },
        });
      }
    }
  },
};

/**
 * Action: Detect Cognitive State
 *
 * Analyzes user behavior and context to detect their current cognitive state.
 * Foundation for future automatic mode switching in Phase 4.
 */
export const detectCognitiveStateAction: Action = {
  name: 'DETECT_COGNITIVE_STATE',
  similes: [
    'ANALYZE_USER_STATE',
    'IDENTIFY_COGNITIVE_MODE',
    'READ_USER_CONTEXT',
    'ASSESS_COGNITIVE_STATE',
  ],
  description:
    'Analyzes user behavior patterns to detect current cognitive state',
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    return true;
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state?: any,
    options: any = {},
    callback?: HandlerCallback,
  ): Promise<void> => {
    try {
      const provider = new CognitiveStateProvider();
      const context: CognitiveContext = options?.context || {
        recentActions: [],
        timeOfDay: new Date().getHours(),
        dayOfWeek: new Date().getDay(),
        sessionDuration: 0,
        focusLevel: 'medium',
        multitasking: false,
      };

      const detection: StateDetectionResult =
        await provider.detectCognitiveState(context);

      if (callback) {
        callback({
          text: `Detected cognitive state: ${detection.detectedState} (${Math.round(detection.confidence * 100)}% confidence)`,
          content: {
            detection,
            analysis: {
              primaryState: detection.detectedState,
              confidence: detection.confidence,
              reasoning: detection.reasoning,
              alternatives: detection.alternativeStates,
              suggestedMode: detection.suggestedMode,
            },
            recommendations: {
              shouldSwitch: detection.confidence > 0.8,
              message:
                detection.confidence > 0.8
                  ? `High confidence detection. Consider switching to ${detection.suggestedMode} mode.`
                  : `Multiple possible states detected. Manual mode selection recommended.`,
            },
          },
        });
      }
    } catch (error) {
      console.error('Failed to detect cognitive state:', error);
      if (callback) {
        callback({
          text: `Failed to detect cognitive state: ${(error as Error).message}`,
          content: { error: (error as Error).message },
        });
      }
    }
  },
};

/**
 * Action: Generate Universe
 *
 * Creates a new Galaxy Engine universe for a specific vertical or use case.
 * This action demonstrates the infinite scalability of the Galaxy Engine template.
 */
export const generateUniverseAction: Action = {
  name: 'GENERATE_UNIVERSE',
  similes: [
    'CREATE_GALAXY_UNIVERSE',
    'BUILD_UNIVERSE_TEMPLATE',
    'INSTANTIATE_GALAXY',
    'DEPLOY_UNIVERSE_FACTORY',
  ],
  description:
    'Generates a new Galaxy Engine universe for a specific vertical or use case',
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    return true;
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state?: any,
    options: any = {},
    callback?: HandlerCallback,
  ): Promise<void> => {
    try {
      const provider = new CognitiveStateProvider();
      const universeType = options?.type || 'generic';
      const userProfile = options?.profile || {};

      // Generate universe based on type and user profile
      const universe = await provider.generateUniverse(
        universeType,
        userProfile,
      );

      if (callback) {
        callback({
          text: `Generated ${universeType} universe: "${universe.name}". Your personalized cognitive environment is ready.`,
          content: {
            universe,
            capabilities: {
              adaptiveInterface: true,
              cognitiveAwareness: true,
              personalizedExperience: true,
              infiniteScalability: true,
            },
            examples: {
              readersConstellation:
                'Transform reading lists into explorable knowledge galaxies',
              ceosOrrery:
                'Live business intelligence as interactive solar system',
              creativeCosmos:
                'Content and marketing as evolving creative universe',
            },
            businessModel: {
              enterpriseSaaS: 'High-ticket B2B cognitive dashboards',
              consumerPlatform: 'Personalized discovery and productivity',
              platformLicensing: 'Universe Factory for other companies',
            },
          },
        });
      }
    } catch (error) {
      console.error('Failed to generate universe:', error);
      if (callback) {
        callback({
          text: `Failed to generate universe: ${(error as Error).message}`,
          content: { error: (error as Error).message },
        });
      }
    }
  },
};

/**
 * Action: Analyze Cognitive Patterns
 *
 * Analyzes user cognitive patterns over time to improve state detection
 * and provide insights for cognitive optimization.
 */
export const analyzeCognitivePatternsAction: Action = {
  name: 'ANALYZE_COGNITIVE_PATTERNS',
  similes: [
    'STUDY_USER_PATTERNS',
    'ANALYZE_COGNITIVE_BEHAVIOR',
    'REVIEW_STATE_TRANSITIONS',
    'OPTIMIZE_COGNITIVE_FLOW',
  ],
  description:
    'Analyzes cognitive patterns to optimize state detection and user experience',
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    return true;
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state?: any,
    options: any = {},
    callback?: HandlerCallback,
  ): Promise<void> => {
    try {
      const provider = new CognitiveStateProvider();
      const userId = options?.userId || 'default';
      const timeRange = options?.timeRange || '7d';

      const analysis = await provider.analyzeCognitivePatterns(
        userId,
        timeRange,
      );

      if (callback) {
        callback({
          text: `Cognitive pattern analysis complete. Identified ${analysis.patterns.length} distinct patterns with ${analysis.insights.length} optimization opportunities.`,
          content: {
            analysis,
            summary: {
              dominantState: analysis.dominantState,
              averageSessionLength: analysis.averageSessionLength,
              transitionEfficiency: analysis.transitionEfficiency,
              optimizationScore: analysis.optimizationScore,
            },
            recommendations: analysis.recommendations,
            nextSteps: [
              'Enable automatic state detection for high-confidence patterns',
              'Customize UI modes based on your specific workflow',
              'Set up cognitive state triggers for common scenarios',
            ],
          },
        });
      }
    } catch (error) {
      console.error('Failed to analyze cognitive patterns:', error);
      if (callback) {
        callback({
          text: `Failed to analyze patterns: ${(error as Error).message}`,
          content: { error: (error as Error).message },
        });
      }
    }
  },
};

// Export all actions for the plugin
export const CognitiveEngineActions = [
  setCognitiveModeAction,
  detectCognitiveStateAction,
  generateUniverseAction,
  analyzeCognitivePatternsAction,
];
