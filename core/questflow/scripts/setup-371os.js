#!/usr/bin/env node

/**
 * QuestFlow 371OS Integration Setup Script
 * 
 * This script sets up the integration between QuestFlow and 371OS,
 * including agent registry configuration and plugin connections.
 */

const fs = require('fs');
const path = require('path');
const { listAvailableAgents, loadAgentConfig } = require('../lib/agent-registry');
const { load371OSConfig, get371OSWorkspacePath } = require('../utils/helpers');

// Configuration
const CONFIG_FILE = '../config/default.json';
const AGENTS_OUTPUT_FILE = '../config/371os-agents.json';

/**
 * Setup 371OS integration
 */
async function setup371OSIntegration() {
  console.log('Setting up 371OS integration...');
  
  try {
    // 1. Verify 371OS workspace exists
    const workspacePath = get371OSWorkspacePath();
    if (!fs.existsSync(workspacePath)) {
      throw new Error(`371OS workspace not found at ${workspacePath}`);
    }
    
    console.log(`✓ Found 371OS workspace at ${workspacePath}`);
    
    // 2. List available agents
    console.log('Discovering available agents...');
    const agents = listAvailableAgents(path.join(workspacePath, 'agents'));
    console.log(`✓ Found ${agents.length} agents`);
    
    // 3. Load agent configurations
    console.log('Loading agent configurations...');
    const agentConfigs = [];
    
    for (const agent of agents.slice(0, 3)) { // Limit to first 3 for demo
      const config = loadAgentConfig(agent.id, path.join(workspacePath, 'agents'));
      if (config) {
        agentConfigs.push({
          id: agent.id,
          name: config.name,
          category: agent.category
        });
      }
    }
    
    console.log(`✓ Loaded configurations for ${agentConfigs.length} agents`);
    
    // 4. Save agent registry
    const agentRegistry = {
      timestamp: new Date().toISOString(),
      agents: agentConfigs,
      workspace: workspacePath
    };
    
    fs.writeFileSync(
      path.join(__dirname, AGENTS_OUTPUT_FILE),
      JSON.stringify(agentRegistry, null, 2)
    );
    
    console.log(`✓ Agent registry saved to ${AGENTS_OUTPUT_FILE}`);
    
    // 5. Load 371OS configuration
    console.log('Loading 371OS configuration...');
    const config = load371OSConfig('package.json', workspacePath);
    if (config) {
      console.log(`✓ Loaded 371OS configuration for ${config.name}`);
    } else {
      console.log('⚠ Warning: Could not load 371OS package.json');
    }
    
    console.log('\n🎉 371OS integration setup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Review the agent registry in config/371os-agents.json');
    console.log('2. Configure specific agents in agents/core/ and agents/specialized/');
    console.log('3. Create workflows that utilize the 371OS agents');
    console.log('4. Test integration with npm run test');
    
  } catch (error) {
    console.error('❌ Error setting up 371OS integration:', error.message);
    process.exit(1);
  }
}

// Run setup if called directly
if (require.main === module) {
  setup371OSIntegration().catch(console.error);
}

module.exports = { setup371OSIntegration };