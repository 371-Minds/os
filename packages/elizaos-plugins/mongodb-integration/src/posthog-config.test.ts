/**
 * PostHogConfig Test
 *
 * Test to verify PostHog configuration service is working
 */

import { 
  getPostHogConfig, 
  validatePostHogConfig, 
  getValidatedPostHogConfig 
} from './posthog-config';

// Mock environment variables
const originalEnv = process.env;

// Simple test function without Jest
async function testPostHogConfig() {
  console.log('🧪 Testing PostHog Configuration Service...');
  
  try {
    // Save original environment
    const originalEnv = { ...process.env };
    
    // Test 1: Default configuration
    console.log('\\n📝 Test 1: Default configuration');
    const defaultConfig = getPostHogConfig();
    console.log('   Configuration:', JSON.stringify(defaultConfig, null, 2));
    
    // Test 2: Configuration from environment variables
    console.log('\\n📝 Test 2: Configuration from environment variables');
    process.env.POSTHOG_ENABLE = 'true';
    process.env.POSTHOG_API_KEY = 'test-api-key';
    process.env.POSTHOG_HOST = 'https://custom.posthog.com';
    process.env.POSTHOG_FLUSH_AT = '10';
    process.env.POSTHOG_FLUSH_INTERVAL = '5000';
    
    const envConfig = getPostHogConfig();
    console.log('   Configuration:', JSON.stringify(envConfig, null, 2));
    
    // Test 3: Disabled configuration
    console.log('\\n📝 Test 3: Disabled configuration');
    process.env.POSTHOG_ENABLE = 'false';
    const disabledConfig = getPostHogConfig();
    console.log('   Configuration:', JSON.stringify(disabledConfig, null, 2));
    
    // Test 4: Validation
    console.log('\\n📝 Test 4: Configuration validation');
    const validConfig = {
      apiKey: 'test-key',
      enable: true,
    };
    
    const isValid = validatePostHogConfig(validConfig);
    console.log('   Valid configuration:', isValid ? '✅ PASS' : '❌ FAIL');
    
    const invalidConfig = {
      apiKey: '',
      enable: true,
    };
    
    const isInvalid = validatePostHogConfig(invalidConfig);
    console.log('   Invalid configuration:', !isInvalid ? '✅ PASS' : '❌ FAIL');
    
    const disabledValidConfig = {
      apiKey: '',
      enable: false,
    };
    
    const isDisabledValid = validatePostHogConfig(disabledValidConfig);
    console.log('   Disabled configuration:', isDisabledValid ? '✅ PASS' : '❌ FAIL');
    
    // Test 5: Validated configuration
    console.log('\\n📝 Test 5: Validated configuration');
    process.env.POSTHOG_ENABLE = 'true';
    process.env.POSTHOG_API_KEY = 'test-api-key';
    const validatedConfig = getValidatedPostHogConfig();
    console.log('   Validated configuration:', validatedConfig ? '✅ PASS' : '❌ FAIL');
    
    // Test 6: Invalid validated configuration
    console.log('\\n📝 Test 6: Invalid validated configuration');
    process.env.POSTHOG_ENABLE = 'true';
    delete process.env.POSTHOG_API_KEY; // Remove API key
    const invalidValidatedConfig = getValidatedPostHogConfig();
    console.log('   Invalid validated configuration:', !invalidValidatedConfig ? '✅ PASS' : '❌ FAIL');
    
    // Restore original environment
    process.env = originalEnv;
    
    console.log('\\n🎉 All PostHog configuration tests completed!');
    return true;
  } catch (error) {
    console.error('❌ PostHog configuration test failed:', error);
    return false;
  }
}

// Run the test
if (require.main === module) {
  testPostHogConfig().then(success => {
    if (!success) {
      process.exit(1);
    }
  });
}

export default testPostHogConfig;