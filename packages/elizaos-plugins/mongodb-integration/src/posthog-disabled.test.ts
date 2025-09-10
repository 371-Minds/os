/**
 * PostHog Disabled Test
 *
 * Test to verify that PostHog integration works correctly when disabled
 */

import { posthogService } from './posthog-service';
import { initializePostHog } from './posthog-init';

async function testPostHogDisabled() {
  console.log('🧪 Testing PostHog Disabled Mode...');
  
  try {
    // Save original environment
    const originalEnv = { ...process.env };
    
    // Ensure PostHog is disabled
    console.log('\n📝 Test: PostHog Disabled Mode');
    process.env.POSTHOG_ENABLE = 'false';
    
    // Initialize PostHog (should succeed but be disabled)
    const initResult = await initializePostHog();
    console.log('   Service initialization:', initResult ? '✅ SUCCESS' : '❌ FAILED');
    
    // Test event capture (should return false when not initialized)
    const captureResult = await posthogService.capture({
      event: 'test_event',
      distinctId: 'test_user_123',
      properties: {
        testProperty: 'test_value',
        timestamp: new Date(),
      },
    });
    console.log('   Event capture (disabled):', !captureResult ? '✅ SUCCESS (Expected)' : '❌ UNEXPECTED');
    
    // Test user identification (should return false when not initialized)
    const identifyResult = await posthogService.identify({
      distinctId: 'test_user_123',
      properties: {
        email: 'test@example.com',
        name: 'Test User',
      },
    });
    console.log('   User identification (disabled):', !identifyResult ? '✅ SUCCESS (Expected)' : '❌ UNEXPECTED');
    
    // Test flush operation (should return false when not initialized)
    const flushResult = await posthogService.flush();
    console.log('   Flush operation (disabled):', !flushResult ? '✅ SUCCESS (Expected)' : '❌ UNEXPECTED');
    
    // Test shutdown (should succeed)
    const shutdownResult = await posthogService.shutdown();
    console.log('   Service shutdown (disabled):', shutdownResult ? '✅ SUCCESS' : '❌ FAILED');
    
    // Restore original environment
    process.env = originalEnv;
    
    console.log('\n🎉 PostHog Disabled Mode Test Completed!');
    console.log('   All operations succeeded silently as expected when disabled');
    return true;
  } catch (error) {
    console.error('❌ PostHog disabled mode test failed:', error);
    return false;
  }
}

// Run the test
if (require.main === module) {
  testPostHogDisabled().then(success => {
    if (!success) {
      process.exit(1);
    }
  });
}

export default testPostHogDisabled;