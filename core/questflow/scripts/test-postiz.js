#!/usr/bin/env bun

// Test script for Postiz integration
import fs from 'fs';
import path from 'path';
import { QuestFlowOrchestrator } from '../src/orchestrator.js';
import { CSuiteCoordinator } from '../src/agents/csuite.js';

async function testPostizIntegration() {
  try {
    console.log('Testing Postiz integration with QuestFlow...\n');

    // Load configuration
    const configPath = path.resolve('./config/default.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    // Check if Postiz is configured
    if (!config.integration || !config.integration.postiz || !config.integration.postiz.apiKey) {
      console.log('⚠️  Postiz API key not configured. Please add your API key to config/default.json');
      console.log('Example configuration:');
      console.log(`
  "integration": {
    "postiz": {
      "apiKey": "YOUR_POSTIZ_API_KEY",
      "baseUrl": "https://api.postiz.com/v1"
    }
  }
      `);
      return;
    }

    // Initialize components
    const orchestrator = new QuestFlowOrchestrator(config);
    const csuite = new CSuiteCoordinator(config);

    console.log('1. Testing social media accounts retrieval...');
    const accountsResult = await orchestrator.getSocialMediaAccounts();
    console.log('Accounts result:', JSON.stringify(accountsResult, null, 2));

    console.log('\n2. Testing post creation...');
    const postResult = await orchestrator.createSocialMediaPost(
      'Hello from QuestFlow! This is a test post demonstrating the Postiz integration. 🚀 #AI #Automation',
      ['twitter', 'linkedin']
    );
    console.log('Post creation result:', JSON.stringify(postResult, null, 2));

    console.log('\n3. Testing post scheduling...');
    const scheduleResult = await orchestrator.scheduleSocialMediaPost(
      'Scheduled post from QuestFlow! This will be published later. 📅 #Schedule #Automation',
      ['twitter', 'facebook'],
      new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Schedule for tomorrow
    );
    console.log('Post scheduling result:', JSON.stringify(scheduleResult, null, 2));

    console.log('\n4. Testing posts listing...');
    const postsResult = await orchestrator.listSocialMediaPosts(5, 0);
    console.log('Posts listing result:', JSON.stringify(postsResult, null, 2));

    console.log('\n✅ Postiz integration tests completed successfully!');
  } catch (error) {
    console.error('❌ Error during Postiz integration test:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run the test
testPostizIntegration();