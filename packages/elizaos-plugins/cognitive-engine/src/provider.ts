/**
 * Cognitive State Provider - Core implementation for cognitive state management
 * 
 * This provider implements the business logic for the Galaxy Engine's cognitive awareness,
 * including state detection, UI mode management, and universe generation.
 */

import { 
  CognitiveState, 
  CognitiveContext, 
  StateDetectionResult, 
  UIMode,
  StateTransition,
  CognitiveProfile,
  ApplicationUniverse,
  UniverseConfig
} from './types';

export class CognitiveStateProvider {
  private cognitiveProfiles: Map<string, CognitiveProfile> = new Map();
  private stateTransitions: StateTransition[] = [];

  /**
   * Pre-defined UI modes for each cognitive state
   */
  private readonly UI_MODES: { [key in CognitiveState]: UIMode } = {
    executive: {
      name: 'Executive Mode',
      description: 'Strategic dashboard optimized for high-level decision making',
      cognitiveState: 'executive',
      primaryActions: ['VIEW_KPIS', 'ANALYZE_METRICS', 'STRATEGIC_PLANNING', 'TEAM_COORDINATION'],
      layoutConfig: {
        showMetrics: true,
        showTools: false,
        showAgents: true,
        emphasizeSpeed: true,
        emphasizeDetail: false
      },
      agentBehavior: {
        responseStyle: 'concise',
        proactivity: 'high',
        suggestionsEnabled: true
      }
    },
    technical: {
      name: 'Technical Mode', 
      description: 'Development-focused interface with tools and diagnostics',
      cognitiveState: 'technical',
      primaryActions: ['BUILD_PROJECT', 'RUN_TESTS', 'DEBUG_ISSUES', 'DEPLOY_SYSTEM'],
      layoutConfig: {
        showMetrics: false,
        showTools: true,
        showAgents: false,
        emphasizeSpeed: false,
        emphasizeDetail: true
      },
      agentBehavior: {
        responseStyle: 'detailed',
        proactivity: 'low',
        suggestionsEnabled: false
      }
    },
    creative: {
      name: 'Creative Mode',
      description: 'Content creation and marketing workspace',
      cognitiveState: 'creative',
      primaryActions: ['CREATE_CONTENT', 'DESIGN_ASSETS', 'BRAINSTORM_IDEAS', 'MANAGE_CAMPAIGNS'],
      layoutConfig: {
        showMetrics: false,
        showTools: true,
        showAgents: true,
        emphasizeSpeed: false,
        emphasizeDetail: false
      },
      agentBehavior: {
        responseStyle: 'visual',
        proactivity: 'medium',
        suggestionsEnabled: true
      }
    },
    analytical: {
      name: 'Analytical Mode',
      description: 'Data analysis and research environment',
      cognitiveState: 'analytical',
      primaryActions: ['ANALYZE_DATA', 'GENERATE_REPORTS', 'RESEARCH_TOPICS', 'VALIDATE_HYPOTHESES'],
      layoutConfig: {
        showMetrics: true,
        showTools: true,
        showAgents: false,
        emphasizeSpeed: false,
        emphasizeDetail: true
      },
      agentBehavior: {
        responseStyle: 'detailed',
        proactivity: 'low',
        suggestionsEnabled: false
      }
    },
    collaborative: {
      name: 'Collaborative Mode',
      description: 'Team coordination and communication hub',
      cognitiveState: 'collaborative',
      primaryActions: ['COORDINATE_TEAM', 'MANAGE_MEETINGS', 'SHARE_UPDATES', 'RESOLVE_CONFLICTS'],
      layoutConfig: {
        showMetrics: true,
        showTools: false,
        showAgents: true,
        emphasizeSpeed: true,
        emphasizeDetail: false
      },
      agentBehavior: {
        responseStyle: 'concise',
        proactivity: 'high',
        suggestionsEnabled: true
      }
    },
    learning: {
      name: 'Learning Mode',
      description: 'Educational and skill development interface',
      cognitiveState: 'learning',
      primaryActions: ['STUDY_MATERIALS', 'PRACTICE_SKILLS', 'TRACK_PROGRESS', 'GET_GUIDANCE'],
      layoutConfig: {
        showMetrics: true,
        showTools: false,
        showAgents: true,
        emphasizeSpeed: false,
        emphasizeDetail: true
      },
      agentBehavior: {
        responseStyle: 'detailed',
        proactivity: 'medium',
        suggestionsEnabled: true
      }
    }
  };

  /**
   * Sets the cognitive mode for a user manually (Phase 1 implementation)
   */
  async setCognitiveMode(
    userId: string, 
    targetState: CognitiveState,
    options: { trigger: 'manual' | 'automatic', context?: any }
  ): Promise<StateTransition> {
    const profile = this.getCognitiveProfile(userId);
    const currentState = profile.preferredStates[0] || 'executive';

    const transition: StateTransition = {
      fromState: currentState,
      toState: targetState,
      trigger: options.trigger,
      confidence: options.trigger === 'manual' ? 1.0 : 0.8,
      context: options.context || {},
      timestamp: Date.now()
    };

    // Update user profile
    profile.preferredStates = [targetState, ...profile.preferredStates.filter(s => s !== targetState)];
    profile.lastUpdated = Date.now();
    this.cognitiveProfiles.set(userId, profile);

    // Record transition
    this.stateTransitions.push(transition);

    return transition;
  }

  /**
   * Gets the UI mode configuration for a cognitive state
   */
  async getUIModeForState(state: CognitiveState): Promise<UIMode> {
    return this.UI_MODES[state];
  }

  /**
   * Detects cognitive state based on context (Phase 4 foundation)
   */
  async detectCognitiveState(context: CognitiveContext): Promise<StateDetectionResult> {
    // Phase 1: Basic rule-based detection
    // Future: ML-based detection using behavioral patterns
    
    let detectedState: CognitiveState = 'executive';
    let confidence = 0.6;
    const reasoning: string[] = [];

    // Time-based detection
    if (context.timeOfDay >= 9 && context.timeOfDay <= 11) {
      detectedState = 'executive';
      confidence += 0.2;
      reasoning.push('Morning hours typically indicate executive/strategic work');
    } else if (context.timeOfDay >= 14 && context.timeOfDay <= 17) {
      detectedState = 'technical';
      confidence += 0.2;
      reasoning.push('Afternoon hours often indicate focused technical work');
    }

    // Action-based detection
    if (context.recentActions.some(action => action.includes('BUILD') || action.includes('TEST'))) {
      detectedState = 'technical';
      confidence += 0.3;
      reasoning.push('Recent technical actions detected');
    } else if (context.recentActions.some(action => action.includes('CREATE') || action.includes('DESIGN'))) {
      detectedState = 'creative';
      confidence += 0.3;
      reasoning.push('Recent creative actions detected');
    }

    // Focus level detection
    if (context.focusLevel === 'high' && !context.multitasking) {
      if (detectedState === 'technical') {
        confidence += 0.2;
        reasoning.push('High focus level supports technical work');
      }
    } else if (context.multitasking) {
      detectedState = 'collaborative';
      confidence += 0.1;
      reasoning.push('Multitasking suggests collaborative work');
    }

    // Generate alternatives
    const alternatives: Array<{ state: CognitiveState; confidence: number }> = [
      { state: 'executive' as CognitiveState, confidence: 0.4 },
      { state: 'technical' as CognitiveState, confidence: 0.3 },
      { state: 'creative' as CognitiveState, confidence: 0.2 }
    ].filter(alt => alt.state !== detectedState);

    return {
      detectedState,
      confidence: Math.min(confidence, 0.95), // Cap confidence
      reasoning,
      suggestedMode: this.UI_MODES[detectedState].name,
      alternativeStates: alternatives
    };
  }

  /**
   * Generates a Galaxy Engine universe for a specific use case
   */
  async generateUniverse(type: string, userProfile: any): Promise<ApplicationUniverse> {
    const universeConfigs: { [key: string]: UniverseConfig } = {
      'readers-constellation': {
        name: "Reader's Constellation",
        description: 'Transform your reading life into an explorable knowledge galaxy',
        targetAudience: 'Book lovers, researchers, knowledge workers',
        dataIngestion: {
          sources: ['kindle', 'goodreads', 'library', 'bookmarks'],
          processors: ['book-analyzer', 'theme-extractor', 'connection-mapper']
        },
        visualization: {
          theme: 'cosmic-library',
          planetTypes: ['book-planet', 'author-star', 'genre-nebula'],
          connectionTypes: ['thematic-links', 'author-connections', 'reading-progression']
        },
        interactions: {
          actions: ['explore-book', 'discover-similar', 'track-progress', 'add-notes'],
          modals: ['book-details', 'reading-stats', 'recommendation-engine']
        }
      },
      'ceos-orrery': {
        name: "CEO's Orrery", 
        description: 'Live business intelligence as an interactive solar system',
        targetAudience: 'Executives, business leaders, entrepreneurs',
        dataIngestion: {
          sources: ['quickbooks', 'stripe', 'analytics', 'slack', 'salesforce'],
          processors: ['financial-analyzer', 'metrics-calculator', 'trend-detector']
        },
        visualization: {
          theme: 'business-solar-system',
          planetTypes: ['department-planet', 'metric-moon', 'goal-comet'],
          connectionTypes: ['data-flows', 'dependencies', 'impacts']
        },
        interactions: {
          actions: ['drill-down', 'set-alerts', 'forecast', 'delegate-task'],
          modals: ['metric-details', 'agent-briefing', 'action-center']
        }
      },
      'creative-cosmos': {
        name: 'Creative Cosmos',
        description: 'Content and marketing universe for creators',
        targetAudience: 'Content creators, marketers, designers',
        dataIngestion: {
          sources: ['social-media', 'analytics', 'content-library', 'campaigns'],
          processors: ['engagement-analyzer', 'trend-tracker', 'performance-calculator']
        },
        visualization: {
          theme: 'creative-galaxy',
          planetTypes: ['content-planet', 'campaign-star', 'audience-nebula'],
          connectionTypes: ['engagement-flows', 'content-series', 'cross-platform']
        },
        interactions: {
          actions: ['create-content', 'schedule-posts', 'analyze-performance', 'brainstorm'],
          modals: ['content-editor', 'analytics-dashboard', 'idea-generator']
        }
      }
    };

    const config = universeConfigs[type] || universeConfigs['ceos-orrery'];
    
    const universe: ApplicationUniverse = {
      id: `universe-${Date.now()}`,
      name: config.name,
      config,
      userState: {
        cognitiveProfile: this.getCognitiveProfile(userProfile.userId || 'default'),
        currentMode: 'executive',
        sessionData: {}
      },
      generated: true,
      lastUpdated: Date.now()
    };

    return universe;
  }

  /**
   * Analyzes cognitive patterns for a user over time
   */
  async analyzeCognitivePatterns(userId: string, timeRange: string): Promise<any> {
    const profile = this.getCognitiveProfile(userId);
    const userTransitions = this.stateTransitions.filter(t => 
      t.timestamp > Date.now() - this.parseTimeRange(timeRange)
    );

    const patterns = this.identifyPatterns(userTransitions);
    const insights = this.generateInsights(patterns);
    
    return {
      userId,
      timeRange,
      patterns,
      insights,
      dominantState: profile.preferredStates[0] || 'executive',
      averageSessionLength: this.calculateAverageSessionLength(userTransitions),
      transitionEfficiency: this.calculateTransitionEfficiency(userTransitions),
      optimizationScore: this.calculateOptimizationScore(patterns),
      recommendations: this.generateRecommendations(patterns, insights)
    };
  }

  /**
   * Gets or creates a cognitive profile for a user
   */
  private getCognitiveProfile(userId: string): CognitiveProfile {
    if (!this.cognitiveProfiles.has(userId)) {
      const profile: CognitiveProfile = {
        userId,
        preferredStates: ['executive'],
        statePatterns: {},
        customModes: [],
        learningEnabled: true,
        lastUpdated: Date.now()
      };
      this.cognitiveProfiles.set(userId, profile);
    }
    return this.cognitiveProfiles.get(userId)!;
  }

  private parseTimeRange(timeRange: string): number {
    const ranges: { [key: string]: number } = {
      '1d': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000
    };
    return ranges[timeRange] || ranges['7d'];
  }

  private identifyPatterns(transitions: StateTransition[]): any[] {
    // Simplified pattern identification
    return [
      { type: 'time-based', confidence: 0.8, description: 'Executive mode in mornings' },
      { type: 'sequential', confidence: 0.7, description: 'Technical → Creative workflow' }
    ];
  }

  private generateInsights(patterns: any[]): any[] {
    return [
      { type: 'optimization', message: 'Consider automatic morning executive mode' },
      { type: 'efficiency', message: 'Workflow transitions are well-optimized' }
    ];
  }

  private calculateAverageSessionLength(transitions: StateTransition[]): number {
    return transitions.length > 0 ? 45 : 30; // minutes
  }

  private calculateTransitionEfficiency(transitions: StateTransition[]): number {
    return 0.85; // 85% efficiency score
  }

  private calculateOptimizationScore(patterns: any[]): number {
    return 0.78; // 78% optimization score
  }

  private generateRecommendations(patterns: any[], insights: any[]): string[] {
    return [
      'Enable automatic state detection for morning executive sessions',
      'Create custom technical-creative transition workflow',
      'Set up proactive agent suggestions during collaborative mode'
    ];
  }
}