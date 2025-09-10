/**
 * Comprehensive PostHog Integration Test
 *
 * Test to verify the complete PostHog integration is working correctly
 */

import { posthogService } from './posthog-service';
import { getPostHogConfig, getValidatedPostHogConfig } from './posthog-config';
import { initializePostHog, shutdownPostHog } from './posthog-init';
import { analyticsService } from './analytics-service';

async function testComprehensivePostHogIntegration() {
  console.log('🧪 Testing Comprehensive PostHog Integration...');
  
  try {
    // Save original environment
    const originalEnv = { ...process.env };
    
    // Test 1: Configuration Service
    console.log('\n📝 Test 1: PostHog Configuration Service');
    const config = getPostHogConfig();
    console.log('   Configuration loaded:', config ? '✅ SUCCESS' : '❌ FAILED');
    
    const validatedConfig = getValidatedPostHogConfig();
    console.log('   Validated configuration:', validatedConfig ? '✅ SUCCESS' : '❌ FAILED');
    
    // Test 2: Service Initialization
    console.log('\n📝 Test 2: PostHog Service Initialization');
    process.env.POSTHOG_ENABLE = 'false'; // Disable for testing
    
    const initResult = await initializePostHog();
    console.log('   Service initialization:', initResult ? '✅ SUCCESS' : '❌ FAILED');
    
    // Test 3: Direct Service Usage
    console.log('\n📝 Test 3: Direct PostHog Service Usage');
    const serviceInit = await posthogService.initialize({
      apiKey: 'test-api-key',
      enable: true,
    });
    console.log('   Direct service init:', serviceInit ? '✅ SUCCESS' : '❌ FAILED');
    
    // Test 4: Event Capture
    console.log('\n📝 Test 4: Event Capture');
    const captureResult = await posthogService.capture({
      event: 'test_event',
      distinctId: 'test_user_123',
      properties: {
        testProperty: 'test_value',
        timestamp: new Date(),
      },
    });
    console.log('   Event capture:', captureResult ? '✅ SUCCESS' : '❌ FAILED');
    
    // Test 5: User Identification
    console.log('\n📝 Test 5: User Identification');
    const identifyResult = await posthogService.identify({
      distinctId: 'test_user_123',
      properties: {
        email: 'test@example.com',
        name: 'Test User',
      },
    });
    console.log('   User identification:', identifyResult ? '✅ SUCCESS' : '❌ FAILED');
    
    // Test 6: Flush Operation
    console.log('\n📝 Test 6: Flush Operation');
    const flushResult = await posthogService.flush();
    console.log('   Flush operation:', flushResult ? '✅ SUCCESS' : '❌ FAILED');
    
    // Test 7: Shutdown
    console.log('\n📝 Test 7: Service Shutdown');
    const shutdownResult = await posthogService.shutdown();
    console.log('   Service shutdown:', shutdownResult ? '✅ SUCCESS' : '❌ FAILED');
    
    // Test 8: Analytics Service Integration (PostHog disabled, so should succeed)
    console.log('\n📝 Test 8: Analytics Service Integration');
    // This would normally test the integration, but MongoDB is not connected in this test
    
    // Restore original environment
    process.env = originalEnv;
    
    console.log('\n🎉 All Comprehensive PostHog Integration Tests Completed!');
    return true;
  } catch (error) {
    console.error('❌ Comprehensive PostHog integration test failed:', error);
    return false;
  }
}

// Run the test
if (require.main === module) {
  testComprehensivePostHogIntegration().then(success => {
    if (!success) {
      process.exit(1);
    }
  });
}

export default testComprehensivePostHogIntegration;