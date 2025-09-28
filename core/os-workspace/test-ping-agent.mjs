#!/usr/bin/env node

/**
 * Test runner for the Ping Agent
 */

import PingAgent, { PingAgentConfig } from './dist/apps/utility-agents/ping-agent/index.js';

async function testPingAgent() {
  const agent = new PingAgent();
  
  try {
    // Initialize with embedded config and execution context
    const context = {
      agent_id: PingAgentConfig.agent_id,
      execution_id: `exec-${Date.now()}`,
      start_time: new Date(),
      command_args: process.argv.slice(2),
      environment: process.env,
      working_directory: process.cwd()
    };
    
    await agent.initialize(PingAgentConfig, context);
    
    // Execute with command line arguments
    const result = await agent.execute(process.argv.slice(2));
    
    // Output results
    if (result.output) {
      console.log(result.output);
    }
    
    if (result.error) {
      console.error(result.error);
    }
    
    // Shutdown gracefully
    await agent.shutdown();
    
    // Exit with appropriate code
    process.exit(result.exit_code);
    
  } catch (error) {
    console.error('❌ Agent execution failed:', error);
    await agent.shutdown();
    process.exit(1);
  }
}

// Execute if called directly
testPingAgent().catch(console.error);