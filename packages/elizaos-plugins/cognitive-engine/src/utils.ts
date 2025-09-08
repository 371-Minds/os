/**
 * Cognitive Engine Utilities - Helper functions for cognitive state management
 *
 * These utilities support the Galaxy Engine's cognitive awareness capabilities
 * with pattern recognition, state validation, and universe generation helpers.
 */

import type { CognitiveContext, CognitiveState, UIMode } from './types';

/**
 * Validates if a string is a valid cognitive state
 */
export function isValidCognitiveState(state: string): state is CognitiveState {
  const validStates: CognitiveState[] = [
    'executive',
    'technical',
    'creative',
    'analytical',
    'collaborative',
    'learning',
  ];
  return validStates.includes(state as CognitiveState);
}

/**
 * Gets the default cognitive state for a given time of day
 */
export function getDefaultStateForTime(hour: number): CognitiveState {
  if (hour >= 9 && hour <= 11) return 'executive'; // Morning strategic time
  if (hour >= 11 && hour <= 13) return 'collaborative'; // Pre-lunch collaboration
  if (hour >= 14 && hour <= 16) return 'technical'; // Afternoon deep work
  if (hour >= 16 && hour <= 18) return 'creative'; // Creative evening hours
  if (hour >= 19 && hour <= 21) return 'learning'; // Evening learning time
  return 'executive'; // Default fallback
}

/**
 * Calculates cognitive load score based on context
 */
export function calculateCognitiveLoad(context: CognitiveContext): number {
  let load = 0;

  // Session duration impact
  if (context.sessionDuration > 120) load += 0.3; // 2+ hours
  if (context.sessionDuration > 240) load += 0.2; // 4+ hours

  // Multitasking penalty
  if (context.multitasking) load += 0.4;

  // Focus level adjustment
  switch (context.focusLevel) {
    case 'low':
      load += 0.3;
      break;
    case 'medium':
      load += 0.1;
      break;
    case 'high':
      load -= 0.1;
      break;
  }

  // Recent actions complexity
  const complexActions = context.recentActions.filter(
    (action) =>
      action.includes('DEBUG') ||
      action.includes('ANALYZE') ||
      action.includes('COMPLEX'),
  );
  load += complexActions.length * 0.1;

  return Math.min(Math.max(load, 0), 1); // Clamp between 0-1
}

/**
 * Generates cognitive state recommendations based on patterns
 */
export function generateStateRecommendations(
  currentState: CognitiveState,
  context: CognitiveContext,
  cognitiveLoad: number,
): Array<{ state: CognitiveState; reason: string; confidence: number }> {
  const recommendations: Array<{
    state: CognitiveState;
    reason: string;
    confidence: number;
  }> = [];

  // High cognitive load recommendations
  if (cognitiveLoad > 0.7) {
    if (currentState === 'technical' || currentState === 'analytical') {
      recommendations.push({
        state: 'creative',
        reason:
          'High cognitive load detected - creative work may provide mental refreshment',
        confidence: 0.8,
      });
    }
  }

  // Time-based recommendations
  const hour = context.timeOfDay;
  if (hour >= 9 && hour <= 11 && currentState !== 'executive') {
    recommendations.push({
      state: 'executive',
      reason: 'Morning hours are optimal for strategic decision-making',
      confidence: 0.7,
    });
  }

  // Focus level recommendations
  if (context.focusLevel === 'high' && currentState !== 'technical') {
    recommendations.push({
      state: 'technical',
      reason: 'High focus level is ideal for technical deep work',
      confidence: 0.8,
    });
  }

  return recommendations.sort((a, b) => b.confidence - a.confidence);
}

/**
 * Formats cognitive context for display
 */
export function formatCognitiveContext(context: CognitiveContext): string {
  const parts: string[] = [];

  parts.push(`Focus: ${context.focusLevel}`);
  parts.push(`Session: ${Math.round(context.sessionDuration / 60)}h`);

  if (context.multitasking) parts.push('Multitasking');
  if (context.mood) parts.push(`Mood: ${context.mood}`);
  if (context.recentActions.length > 0) {
    parts.push(
      `Last: ${context.recentActions[context.recentActions.length - 1]}`,
    );
  }

  return parts.join(' | ');
}

/**
 * Calculates state transition compatibility score
 */
export function calculateTransitionCompatibility(
  fromState: CognitiveState,
  toState: CognitiveState,
): number {
  // Define state compatibility matrix
  const compatibility: Record<
    CognitiveState,
    Record<CognitiveState, number>
  > = {
    executive: {
      executive: 1.0,
      technical: 0.6,
      creative: 0.7,
      analytical: 0.8,
      collaborative: 0.9,
      learning: 0.5,
    },
    technical: {
      executive: 0.5,
      technical: 1.0,
      creative: 0.4,
      analytical: 0.8,
      collaborative: 0.3,
      learning: 0.6,
    },
    creative: {
      executive: 0.6,
      technical: 0.4,
      creative: 1.0,
      analytical: 0.5,
      collaborative: 0.7,
      learning: 0.8,
    },
    analytical: {
      executive: 0.7,
      technical: 0.8,
      creative: 0.5,
      analytical: 1.0,
      collaborative: 0.6,
      learning: 0.9,
    },
    collaborative: {
      executive: 0.8,
      technical: 0.3,
      creative: 0.7,
      analytical: 0.6,
      collaborative: 1.0,
      learning: 0.5,
    },
    learning: {
      executive: 0.4,
      technical: 0.6,
      creative: 0.8,
      analytical: 0.9,
      collaborative: 0.5,
      learning: 1.0,
    },
  };

  return compatibility[fromState]?.[toState] || 0.5;
}

/**
 * Generates universe configuration based on user type and preferences
 */
export function generateUniverseConfig(
  userType: string,
  preferences: any,
  industry?: string,
): any {
  const baseConfigs = {
    reader: {
      theme: 'knowledge-galaxy',
      primaryElements: ['books', 'authors', 'themes'],
      interactions: ['explore', 'connect', 'discover'],
    },
    executive: {
      theme: 'business-solar-system',
      primaryElements: ['departments', 'metrics', 'goals'],
      interactions: ['monitor', 'decide', 'coordinate'],
    },
    creator: {
      theme: 'creative-cosmos',
      primaryElements: ['content', 'campaigns', 'audience'],
      interactions: ['create', 'publish', 'engage'],
    },
    developer: {
      theme: 'code-constellation',
      primaryElements: ['projects', 'services', 'dependencies'],
      interactions: ['build', 'deploy', 'monitor'],
    },
  };

  const config =
    baseConfigs[userType as keyof typeof baseConfigs] || baseConfigs.executive;

  // Customize based on industry
  if (industry) {
    config.theme = `${industry}-${config.theme}`;
  }

  // Apply user preferences
  if (preferences.darkMode) config.theme += '-dark';
  if (preferences.minimalMode)
    config.interactions = config.interactions.slice(0, 2);

  return config;
}

/**
 * Validates UI mode configuration
 */
export function validateUIMode(mode: UIMode): boolean {
  const required = [
    'name',
    'description',
    'cognitiveState',
    'primaryActions',
    'layoutConfig',
  ];
  return required.every((field) => mode[field as keyof UIMode] !== undefined);
}

/**
 * Creates a cognitive state transition summary
 */
export function createTransitionSummary(
  fromState: CognitiveState,
  toState: CognitiveState,
  confidence: number,
  reasoning: string[],
): string {
  const compatibility = calculateTransitionCompatibility(fromState, toState);
  const confidenceText =
    confidence > 0.8 ? 'High' : confidence > 0.6 ? 'Medium' : 'Low';

  let summary = `Transition: ${fromState} → ${toState}\n`;
  summary += `Confidence: ${confidenceText} (${Math.round(confidence * 100)}%)\n`;
  summary += `Compatibility: ${Math.round(compatibility * 100)}%\n`;

  if (reasoning.length > 0) {
    summary += `Reasoning:\n${reasoning.map((r) => `• ${r}`).join('\n')}`;
  }

  return summary;
}
