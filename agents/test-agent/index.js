// 371 OS Test Agent - ElizaOS Integration Test
import { AgentRuntime, ModelType } from '@elizaos/core';
import fs from 'fs';
import path from 'path';

// Import our custom plugins
// import { NxWorkspacePlugin } from '../../packages/elizaos-plugins/nx-workspace/src/index.js';
// import { CognitiveEnginePlugin } from '../../packages/elizaos-plugins/cognitive-engine/src/index.js';

console.log('🚀 Starting 371 OS Test Agent...');

async function startTestAgent() {
  try {
    // Load character configuration
    const characterPath = path.join(process.cwd(), 'agents', 'test-agent', 'character.json');
    let character;
    
    if (fs.existsSync(characterPath)) {
      const characterData = JSON.parse(fs.readFileSync(characterPath, 'utf8'));
      character = characterData;
      console.log('✅ Loaded character configuration for:', character.name);
    } else {
      console.log('⚠️ Character file not found, using minimal character');
      character = {
        name: 'TestAgent',
        bio: ['371 OS Test Agent for revolutionary AI development'],
        lore: [],
        messageExamples: [],
        postExamples: [],
        topics: ['testing', 'ai', 'agents'],
        style: {
          all: ['helpful', 'technical', 'brief']
        }
      };
    }

    // Configure the runtime
    const runtime = new AgentRuntime({
      // Basic configuration
      character,
      modelProvider: 'ollama', // Using local model for testing
      
      // Plugin configuration (commented out until we fix the plugins)
      // plugins: [
      //   NxWorkspacePlugin,
      //   CognitiveEnginePlugin
      // ],
      
      // Environment configuration
      env: {
        NODE_ENV: process.env.NODE_ENV || 'development',
        ELIZAOS_LOG_LEVEL: process.env.ELIZAOS_LOG_LEVEL || 'debug'
      }
    });

    console.log('✅ AgentRuntime created successfully');
    console.log('📋 Agent Configuration:');
    console.log(`   Name: ${character.name}`);
    console.log(`   Model Provider: ollama`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
    
    // Test basic agent functionality
    console.log('🧪 Testing basic agent functionality...');
    
    // Simulate a simple interaction
    const testMessage = {
      userId: 'test-user',
      content: {
        text: 'Hello, can you analyze the workspace?'
      }
    };

    console.log('📨 Test message:', testMessage.content.text);
    
    // For now, just log that we would process this
    console.log('✅ Agent is ready to process messages');
    console.log('🎯 Next steps:');
    console.log('   1. Install actual model provider (Ollama/OpenAI)');
    console.log('   2. Enable Nx workspace plugin integration');
    console.log('   3. Enable Cognitive Engine plugin integration');
    console.log('   4. Test self-awareness capabilities');
    console.log('   5. Test cognitive state transitions');
    console.log('   6. Validate blockchain coordination features');

    // Keep the process alive for testing
    console.log('🔄 Agent running... Press Ctrl+C to stop');
    
    // Heartbeat to show the agent is alive
    setInterval(() => {
      console.log(`💓 Agent heartbeat: ${new Date().toISOString()}`);
    }, 30000);

  } catch (error) {
    console.error('❌ Failed to start test agent:', error);
    console.error('📋 Error details:', error.message);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

// Start the agent
startTestAgent().catch((error) => {
  console.error('💥 Fatal error starting agent:', error);
  process.exit(1);
});