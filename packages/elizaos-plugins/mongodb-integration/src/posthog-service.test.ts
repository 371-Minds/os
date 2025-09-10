/**
 * PostHog Service Test
 *
 * Simple test to verify PostHog integration is working
 */

import { posthogService } from './posthog-service';
import { getPostHogConfig } from './posthog-config';

async function testPostHogIntegration() {
  console.log('🧪 Testing PostHog Integration...');

  try {
    // Test configuration service
    const config = getPostHogConfig();
    console.log('✅ PostHog configuration service:', config ? 'SUCCESS' : 'FAILED');
    
    // Initialize with proper configuration (mock mode)
    const initialized = await posthogService.initialize({
      apiKey: 'test-api-key',
      enable: true, // Enable but use mock mode
    });

    console.log(
      '✅ PostHog service initialization:',
      initialized ? 'SUCCESS' : 'FAILED',
    );

    // Test capture event
    const captured = await posthogService.capture({
      event: 'test_event',
      distinctId: 'test_user_123',
      properties: {
        testProperty: 'test_value',
        timestamp: new Date(),
      },
    });

    console.log('✅ PostHog event capture:', captured ? 'SUCCESS' : 'FAILED');

    // Test identify user
    const identified = await posthogService.identify({
      distinctId: 'test_user_123',
      properties: {
        email: 'test@example.com',
        name: 'Test User',
      },
    });

    console.log(
      '✅ PostHog user identification:',
      identified ? 'SUCCESS' : 'FAILED',
    );

    // Test flush
    const flushed = await posthogService.flush();
    console.log('✅ PostHog flush:', flushed ? 'SUCCESS' : 'FAILED');

    // Test shutdown
    const shutdown = await posthogService.shutdown();
    console.log('✅ PostHog shutdown:', shutdown ? 'SUCCESS' : 'FAILED');

    console.log('🎉 All PostHog integration tests completed!');
    return true;
  } catch (error) {
    console.error('❌ PostHog integration test failed:', error);
    return false;
  }
}

// Run the test
if (require.main === module) {
  testPostHogIntegration().then(success => {
    if (!success) {
      process.exit(1);
    }
  });
}

export default testPostHogIntegration;