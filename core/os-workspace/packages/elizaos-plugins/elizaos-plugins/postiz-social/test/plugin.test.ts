/**
 * Postiz Plugin Tests
 * Basic validation tests for the plugin
 */

import { PostizPlugin, SocialPlatform } from '../src/index.js';
import type { PostizPluginConfig } from '../src/types.js';

/**
 * Mock Postiz API configuration for testing
 */
const mockConfig: PostizPluginConfig = {
  apiEndpoint: 'https://api.postiz.test',
  apiKey: 'test-api-key-123',
  enableSpatialInterface: true,
  enableCognitiveEngine: true,
  defaultPlatforms: [SocialPlatform.TWITTER, SocialPlatform.LINKEDIN],
  autoOptimize: true,
};

/**
 * Test plugin initialization
 */
async function testPluginInitialization() {
  console.log('Testing plugin initialization...');
  
  try {
    const plugin = new PostizPlugin(mockConfig);
    const info = plugin.getInfo();
    
    console.log('✓ Plugin initialized successfully');
    console.log('  Name:', info.name);
    console.log('  Version:', info.version);
    console.log('  Description:', info.description);
    
    return true;
  } catch (error) {
    console.error('✗ Plugin initialization failed:', error);
    return false;
  }
}

/**
 * Test agent creation
 */
async function testAgentCreation() {
  console.log('\nTesting agent creation...');
  
  try {
    const plugin = new PostizPlugin(mockConfig);
    
    const agent = plugin.createAgent('test-agent', {
      role: 'CMO',
      useAI: true,
      autoPublish: false,
    });
    
    console.log('✓ Agent created successfully');
    
    const allAgents = plugin.getAllAgents();
    console.log('  Total agents:', allAgents.size);
    console.log('  Agent IDs:', Array.from(allAgents.keys()));
    
    return true;
  } catch (error) {
    console.error('✗ Agent creation failed:', error);
    return false;
  }
}

/**
 * Test provider and actions
 */
async function testProviderAndActions() {
  console.log('\nTesting provider and actions...');
  
  try {
    const plugin = new PostizPlugin(mockConfig);
    const provider = plugin.getProvider();
    const actions = plugin.getActions();
    
    console.log('✓ Provider and actions initialized');
    console.log('  Provider type:', provider.constructor.name);
    console.log('  Actions type:', actions.constructor.name);
    
    return true;
  } catch (error) {
    console.error('✗ Provider/actions test failed:', error);
    return false;
  }
}

/**
 * Test type definitions
 */
async function testTypeDefinitions() {
  console.log('\nTesting type definitions...');
  
  try {
    const platforms = Object.values(SocialPlatform);
    console.log('✓ Type definitions loaded');
    console.log('  Available platforms:', platforms);
    
    return true;
  } catch (error) {
    console.error('✗ Type definitions test failed:', error);
    return false;
  }
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('='.repeat(60));
  console.log('Postiz Plugin Test Suite');
  console.log('='.repeat(60));
  
  const results = {
    initialization: await testPluginInitialization(),
    agentCreation: await testAgentCreation(),
    providerActions: await testProviderAndActions(),
    typeDefinitions: await testTypeDefinitions(),
  };
  
  console.log('\n' + '='.repeat(60));
  console.log('Test Results Summary');
  console.log('='.repeat(60));
  
  const total = Object.keys(results).length;
  const passed = Object.values(results).filter(r => r).length;
  const failed = total - passed;
  
  console.log(`Total Tests: ${total}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);
  
  if (failed === 0) {
    console.log('\n✓ All tests passed! 🎉');
  } else {
    console.log('\n✗ Some tests failed. Please review the errors above.');
  }
  
  console.log('='.repeat(60));
}

// Run tests
runTests().catch(console.error);
