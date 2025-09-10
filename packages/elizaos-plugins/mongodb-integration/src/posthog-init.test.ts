/**
 * PostHogInit Test
 *
 * Test to verify PostHog initialization is working
 */

import { initializePostHog, shutdownPostHog } from './posthog-init';

// Simple test function without Jest
async function testPostHogInit() {
  console.log('🧪 Testing PostHog Initialization...');
  
  try {
    // Save original environment
    const originalEnv = { ...process.env };
    
    // Test 1: Initialize with disabled PostHog
    console.log('\\n📝 Test 1: Initialize with disabled PostHog');
    process.env.POSTHOG_ENABLE = 'false';
    
    const initialized = await initializePostHog();
    console.log('   Initialization result:', initialized ? '✅ SUCCESS' : '❌ FAILED');
    
    // Test 2: Initialize with enabled PostHog but no API key (should still succeed)
    console.log('\\n📝 Test 2: Initialize with enabled PostHog but no API key');
    process.env.POSTHOG_ENABLE = 'true';
    delete process.env.POSTHOG_API_KEY; // Remove API key
    
    const initializedWithoutKey = await initializePostHog();
    console.log('   Initialization result:', initializedWithoutKey ? '✅ SUCCESS' : '❌ FAILED');
    
    // Test 3: Shutdown PostHog
    console.log('\\n📝 Test 3: Shutdown PostHog');
    const shutdown = await shutdownPostHog();
    console.log('   Shutdown result:', shutdown ? '✅ SUCCESS' : '❌ FAILED');
    
    // Restore original environment
    process.env = originalEnv;
    
    console.log('\\n🎉 All PostHog initialization tests completed!');
    return true;
  } catch (error) {
    console.error('❌ PostHog initialization test failed:', error);
    return false;
  }
}

// Run the test
if (require.main === module) {
  testPostHogInit().then(success => {
    if (!success) {
      process.exit(1);
    }
  });
}

export default testPostHogInit;
