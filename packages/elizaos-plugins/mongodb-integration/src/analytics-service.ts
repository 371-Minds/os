/**
 * AnalyticsService.ts - Behavior Tracking for 371 OS
 *
 * Provides comprehensive user behavior tracking and analytics storage
 * for the cognitive-aware interface system.
 */

import { type Collection, type Db, MongoClient } from 'mongodb';
import { mongodb371 } from './mongodb-service';
import { type PostHogEvent, posthogService } from './posthog-service';
import { initializePostHog } from './posthog-init';

export interface UserInteraction {
  id: string;
  userId: string;
  sessionId: string;
  timestamp: Date;
  interactionType:
    | 'click'
    | 'hover'
    | 'scroll'
    | 'keypress'
    | 'navigation'
    | 'mode_switch'
    | 'component_interaction';
  component: string;
  page: string;
  coordinates?: { x: number; y: number };
  duration?: number;
  metadata?: Record<string, any>;
}

export interface SessionAnalytics {
  sessionId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  totalInteractions: number;
  modeTransitions: number;
  mostUsedMode: string;
  productivityScore: number;
  cognitivePatterns: string[];
  interactionHeatmap?: Record<string, number>;
}

export interface CognitiveStateData {
  userId: string;
  timestamp: Date;
  cognitiveMode: 'executive' | 'technical' | 'creative' | 'adaptive';
  confidence: number;
  context: string;
  triggers: string[];
  metadata?: Record<string, any>;
}

export interface UserBehaviorPattern {
  userId: string;
  patternId: string;
  patternName: string;
  frequency: number;
  lastObserved: Date;
  confidence: number;
  associatedModes: string[];
  triggers: string[];
}

class AnalyticsService {
  private db: Db | null = null;
  private interactionsCollection: Collection<UserInteraction> | null = null;
  private sessionsCollection: Collection<SessionAnalytics> | null = null;
  private cognitiveStatesCollection: Collection<CognitiveStateData> | null =
    null;
  private patternsCollection: Collection<UserBehaviorPattern> | null = null;

  async initialize(): Promise<boolean> {
    try {
      // Connect to MongoDB
      const connected = await mongodb371.connect(false);
      if (!connected) {
        console.error('Failed to connect to MongoDB for analytics service');
        return false;
      }

      this.db = mongodb371.getDatabase();
      if (!this.db) {
        console.error('Database not available');
        return false;
      }

      // Initialize collections
      this.interactionsCollection = this.db.collection('user_interactions');
      this.sessionsCollection = this.db.collection('session_analytics');
      this.cognitiveStatesCollection = this.db.collection('cognitive_states');
      this.patternsCollection = this.db.collection('behavior_patterns');

      // Create indexes for performance
      await this.createIndexes();

      // Initialize PostHog service
      await initializePostHog();
      
      console.log('Analytics service initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize analytics service:', error);
      return false;
    }
  }

  private async createIndexes(): Promise<void> {
    if (
      !this.interactionsCollection ||
      !this.sessionsCollection ||
      !this.cognitiveStatesCollection ||
      !this.patternsCollection
    ) {
      throw new Error('Collections not initialized');
    }

    try {
      // User interactions indexes
      await this.interactionsCollection.createIndex({ userId: 1 });
      await this.interactionsCollection.createIndex({ sessionId: 1 });
      await this.interactionsCollection.createIndex({ timestamp: 1 });
      await this.interactionsCollection.createIndex({ interactionType: 1 });
      await this.interactionsCollection.createIndex({ component: 1 });
      await this.interactionsCollection.createIndex({ page: 1 });

      // Session analytics indexes
      await this.sessionsCollection.createIndex(
        { sessionId: 1 },
        { unique: true },
      );
      await this.sessionsCollection.createIndex({ userId: 1 });
      await this.sessionsCollection.createIndex({ startTime: 1 });
      await this.sessionsCollection.createIndex({ mostUsedMode: 1 });

      // Cognitive states indexes
      await this.cognitiveStatesCollection.createIndex({ userId: 1 });
      await this.cognitiveStatesCollection.createIndex({ timestamp: 1 });
      await this.cognitiveStatesCollection.createIndex({ cognitiveMode: 1 });

      // Behavior patterns indexes
      await this.patternsCollection.createIndex({ userId: 1 });
      await this.patternsCollection.createIndex(
        { patternId: 1 },
        { unique: true },
      );
      await this.patternsCollection.createIndex({ lastObserved: 1 });
      await this.patternsCollection.createIndex({ frequency: 1 });

      console.log('Analytics indexes created successfully');
    } catch (error) {
      console.error('Failed to create analytics indexes:', error);
    }
  }

  // User Interaction Tracking
  async trackInteraction(
    interaction: Omit<UserInteraction, 'id' | 'timestamp'>,
  ): Promise<boolean> {
    if (!this.interactionsCollection) {
      console.error('Interactions collection not initialized');
      return false;
    }

    try {
      const interactionRecord: UserInteraction = {
        id: `interaction_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
        ...interaction,
      };

      await this.interactionsCollection.insertOne(interactionRecord);

      // Also track in PostHog
      const postHogEvent: PostHogEvent = {
        event: `interaction_${interaction.interactionType}`,
        distinctId: interaction.userId,
        properties: {
          sessionId: interaction.sessionId,
          component: interaction.component,
          page: interaction.page,
          coordinates: interaction.coordinates,
          duration: interaction.duration,
          metadata: interaction.metadata,
          timestamp: interactionRecord.timestamp,
        },
      };

      await posthogService.capture(postHogEvent);

      return true;
    } catch (error) {
      console.error('Failed to track interaction:', error);
      return false;
    }
  }

  async trackSessionStart(
    sessionData: Omit<SessionAnalytics, 'startTime' | 'totalInteractions'>,
  ): Promise<string> {
    if (!this.sessionsCollection) {
      console.error('Sessions collection not initialized');
      return '';
    }

    try {
      const sessionRecord: SessionAnalytics = {
        ...sessionData,
        startTime: new Date(),
        totalInteractions: 0,
        modeTransitions: 0,
        mostUsedMode: sessionData.mostUsedMode || 'executive',
        productivityScore: 0,
        cognitivePatterns: [],
      };

      const result = await this.sessionsCollection.insertOne(
        sessionRecord as any,
      );

      // Also track in PostHog
      const postHogEvent: PostHogEvent = {
        event: 'session_started',
        distinctId: sessionData.userId,
        properties: {
          sessionId: sessionRecord.sessionId,
          startTime: sessionRecord.startTime,
          mostUsedMode: sessionRecord.mostUsedMode,
          timestamp: sessionRecord.startTime,
        },
      };

      await posthogService.capture(postHogEvent);

      return sessionRecord.sessionId;
    } catch (error) {
      console.error('Failed to start session tracking:', error);
      return '';
    }
  }

  async updateSession(
    sessionId: string,
    updates: Partial<SessionAnalytics>,
  ): Promise<boolean> {
    if (!this.sessionsCollection) {
      console.error('Sessions collection not initialized');
      return false;
    }

    try {
      await this.sessionsCollection.updateOne({ sessionId }, { $set: updates });

      // Also track session update in PostHog if significant changes
      if (updates.endTime || updates.duration || updates.productivityScore) {
        const postHogEvent: PostHogEvent = {
          event: 'session_updated',
          distinctId: updates.userId || 'unknown',
          properties: {
            sessionId: sessionId,
            endTime: updates.endTime,
            duration: updates.duration,
            productivityScore: updates.productivityScore,
            modeTransitions: updates.modeTransitions,
            totalInteractions: updates.totalInteractions,
          },
        };

        await posthogService.capture(postHogEvent);
      }

      return true;
    } catch (error) {
      console.error('Failed to update session:', error);
      return false;
    }
  }

  async trackCognitiveState(
    state: Omit<CognitiveStateData, 'timestamp'>,
  ): Promise<boolean> {
    if (!this.cognitiveStatesCollection) {
      console.error('Cognitive states collection not initialized');
      return false;
    }

    try {
      const stateRecord: CognitiveStateData = {
        timestamp: new Date(),
        ...state,
      };

      await this.cognitiveStatesCollection.insertOne(stateRecord);

      // Also track in PostHog
      const postHogEvent: PostHogEvent = {
        event: 'cognitive_state_change',
        distinctId: state.userId,
        properties: {
          cognitiveMode: state.cognitiveMode,
          confidence: state.confidence,
          context: state.context,
          triggers: state.triggers,
          metadata: state.metadata,
          timestamp: stateRecord.timestamp,
        },
      };

      await posthogService.capture(postHogEvent);

      return true;
    } catch (error) {
      console.error('Failed to track cognitive state:', error);
      return false;
    }
  }

  // Analytics Queries
  async getUserInteractions(
    userId: string,
    limit = 100,
  ): Promise<UserInteraction[]> {
    if (!this.interactionsCollection) {
      console.error('Interactions collection not initialized');
      return [];
    }

    try {
      return await this.interactionsCollection
        .find({ userId })
        .sort({ timestamp: -1 })
        .limit(limit)
        .toArray();
    } catch (error) {
      console.error('Failed to get user interactions:', error);
      return [];
    }
  }

  async getSessionAnalytics(
    sessionId: string,
  ): Promise<SessionAnalytics | null> {
    if (!this.sessionsCollection) {
      console.error('Sessions collection not initialized');
      return null;
    }

    try {
      return await this.sessionsCollection.findOne({ sessionId });
    } catch (error) {
      console.error('Failed to get session analytics:', error);
      return null;
    }
  }

  async getCognitiveStateHistory(
    userId: string,
    limit = 50,
  ): Promise<CognitiveStateData[]> {
    if (!this.cognitiveStatesCollection) {
      console.error('Cognitive states collection not initialized');
      return [];
    }

    try {
      return await this.cognitiveStatesCollection
        .find({ userId })
        .sort({ timestamp: -1 })
        .limit(limit)
        .toArray();
    } catch (error) {
      console.error('Failed to get cognitive state history:', error);
      return [];
    }
  }

  // Pattern Recognition
  async identifyBehaviorPatterns(
    userId: string,
  ): Promise<UserBehaviorPattern[]> {
    if (!this.interactionsCollection || !this.patternsCollection) {
      console.error('Required collections not initialized');
      return [];
    }

    try {
      // This is a simplified pattern recognition implementation
      // In a real system, this would use ML algorithms
      const interactions = await this.getUserInteractions(userId, 1000);

      const patterns: UserBehaviorPattern[] = [];

      // Identify mode switching patterns
      const modeSwitches = interactions.filter(
        (i) => i.interactionType === 'mode_switch',
      );
      if (modeSwitches.length > 5) {
        patterns.push({
          userId,
          patternId: `mode_switch_${userId}`,
          patternName: 'Frequent Mode Switching',
          frequency: modeSwitches.length,
          lastObserved: new Date(),
          confidence: 0.85,
          associatedModes: [
            ...new Set(
              modeSwitches.map((i) => i.metadata?.toMode || 'unknown'),
            ),
          ],
          triggers: [
            ...new Set(
              modeSwitches.map((i) => i.metadata?.trigger || 'unknown'),
            ),
          ],
        });
      }

      // Identify component interaction patterns
      const componentInteractions = interactions.filter(
        (i) => i.interactionType === 'component_interaction',
      );
      const componentCounts: Record<string, number> = {};
      componentInteractions.forEach((i) => {
        componentCounts[i.component] = (componentCounts[i.component] || 0) + 1;
      });

      Object.entries(componentCounts).forEach(([component, count]) => {
        if (count > 10) {
          patterns.push({
            userId,
            patternId: `component_${component}_${userId}`,
            patternName: `Frequent ${component} Usage`,
            frequency: count,
            lastObserved: new Date(),
            confidence: Math.min(0.5 + count / 100, 0.95),
            associatedModes: [],
            triggers: [],
          });
        }
      });

      // Save patterns
      for (const pattern of patterns) {
        await this.patternsCollection.updateOne(
          { patternId: pattern.patternId },
          { $set: pattern },
          { upsert: true },
        );
      }

      return patterns;
    } catch (error) {
      console.error('Failed to identify behavior patterns:', error);
      return [];
    }
  }

  async getBehaviorPatterns(userId: string): Promise<UserBehaviorPattern[]> {
    if (!this.patternsCollection) {
      console.error('Patterns collection not initialized');
      return [];
    }

    try {
      return await this.patternsCollection
        .find({ userId })
        .sort({ lastObserved: -1 })
        .toArray();
    } catch (error) {
      console.error('Failed to get behavior patterns:', error);
      return [];
    }
  }

  // Cleanup
  async cleanupOldData(days = 30): Promise<number> {
    if (!this.interactionsCollection || !this.cognitiveStatesCollection) {
      console.error('Collections not initialized');
      return 0;
    }

    try {
      const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

      const deletedInteractions = await this.interactionsCollection.deleteMany({
        timestamp: { $lt: cutoffDate },
      });

      const deletedStates = await this.cognitiveStatesCollection.deleteMany({
        timestamp: { $lt: cutoffDate },
      });

      return deletedInteractions.deletedCount + deletedStates.deletedCount;
    } catch (error) {
      console.error('Failed to cleanup old data:', error);
      return 0;
    }
  }

  async disconnect(): Promise<void> {
    await mongodb371.disconnect();
    await posthogService.shutdown();
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();
export default AnalyticsService;
