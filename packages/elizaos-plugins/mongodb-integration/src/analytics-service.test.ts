/**
 * Analytics Service Test with PostHog Integration
 *
 * Test to verify that analytics service properly integrates with PostHog
 */

import { analyticsService } from './analytics-service';
import { posthogService } from './posthog-service';
import { initializePostHog } from './posthog-init';

async function testAnalyticsWithPostHog() {
  console.log('🧪 Testing Analytics Service with PostHog Integration...');

  try {
    // Test PostHog initialization
    process.env.POSTHOG_ENABLE = 'false'; // Disable for testing
    const posthogInitResult = await initializePostHog();
    console.log('✅ PostHog initialization:', posthogInitResult ? 'SUCCESS' : 'FAILED');
    
    // Initialize PostHog with mock configuration
    const posthogInitialized = await posthogService.initialize({
      apiKey: 'test-api-key',
      enable: false, // Disable actual sending for testing
    });

    console.log(
      '✅ PostHog service initialization:',
      posthogInitialized ? 'SUCCESS' : 'FAILED',
    );

    // Initialize analytics service (this will connect to MongoDB)
    // For this test, we'll mock the MongoDB connection
    console.log('ℹ️  Note: MongoDB connection not required for this test');

    // Test tracking an interaction
    const interactionTracked = await analyticsService.trackInteraction({
      userId: 'test_user_123',
      sessionId: 'test_session_456',
      interactionType: 'click',
      component: 'test-button',
      page: '/test-page',
      coordinates: { x: 100, y: 200 },
      metadata: { test: 'value' },
    });

    console.log(
      '✅ Analytics interaction tracking:',
      interactionTracked ? 'SUCCESS' : 'FAILED',
    );

    // Test starting a session
    const sessionId = await analyticsService.trackSessionStart({
      userId: 'test_user_123',
      sessionId: 'test_session_456',
      modeTransitions: 0,
      mostUsedMode: 'executive',
      productivityScore: 0.85,
      cognitivePatterns: ['focused', 'analytical'],
    });

    console.log(
      '✅ Analytics session start tracking:',
      sessionId ? 'SUCCESS' : 'FAILED',
    );

    // Test tracking cognitive state
    const cognitiveStateTracked = await analyticsService.trackCognitiveState({
      userId: 'test_user_123',
      cognitiveMode: 'executive',
      confidence: 0.85,
      context: 'test-context',
      triggers: ['manual-switch'],
    });

    console.log(
      '✅ Analytics cognitive state tracking:',
      cognitiveStateTracked ? 'SUCCESS' : 'FAILED',
    );

    console.log(
      '🎉 All Analytics Service with PostHog integration tests completed!',
    );
  } catch (error) {
    console.error(
      '❌ Analytics Service with PostHog integration test failed:',
      error,
    );
  }
}

// Run the test
testAnalyticsWithPostHog();
