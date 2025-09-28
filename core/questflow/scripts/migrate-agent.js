#!/usr/bin/env node

/**
 * Script to migrate simple QuestFlow agents to full backstory format
 */

import fs from 'fs';
import path from 'path';

function migrateAgent(simpleAgentPath, outputPath) {
  try {
    // Read the simple agent
    const content = fs.readFileSync(simpleAgentPath, 'utf8');
    const simpleAgent = JSON.parse(content);
    
    // Default plugins list - in a real scenario, you might want to infer these from capabilities
    const defaultPlugins = ["business-intelligence", "nx-workspace"];
    
    // If the simple agent already has plugins defined, use those
    if (simpleAgent.plugins && Array.isArray(simpleAgent.plugins) && simpleAgent.plugins.length > 0) {
      defaultPlugins = simpleAgent.plugins;
    }
    
    // Create the full backstory agent structure
    const fullBackstoryAgent = {
      name: simpleAgent.name,
      role: "Specialized Agent",
      description: simpleAgent.description,
      provider: simpleAgent.provider,
      model: simpleAgent.model,
      bio: [
        `I am ${simpleAgent.name}, a specialized agent in the 371 OS system.`,
        `I focus on ${simpleAgent.capabilities.join(', ') || 'specialized tasks'}.`,
        "I help users accomplish specific tasks through my specialized capabilities."
      ],
      lore: [
        `Created to provide expertise in ${simpleAgent.capabilities[0] || 'specialized tasks'}.`,
        "Part of the 371 OS agent ecosystem designed for autonomous collaboration.",
        "Represent the modular approach to AI agent specialization."
      ],
      knowledge: [
        `Expert in ${simpleAgent.capabilities.join(', ') || 'my domain'}.`,
        "Understanding of the 371 OS architecture and agent coordination.",
        "Knowledge of best practices in my domain."
      ],
      messageExamples: [
        [
          {
            "user": "{{user1}}",
            "content": {
              "text": `Can you help me with ${simpleAgent.capabilities[0] || 'a task'}?`
            }
          },
          {
            "user": simpleAgent.name,
            "content": {
              "text": simpleAgent.instructions || `I can help you with ${simpleAgent.capabilities[0] || 'that task'}. Please provide more details about what you need.`
            }
          }
        ]
      ],
      postExamples: [
        `Working on another ${simpleAgent.capabilities[0] || 'specialized'} task... 🚀`,
        `Helping users achieve their goals through ${simpleAgent.capabilities[0] || 'expertise'}... 💼`
      ],
      style: {
        all: [
          "Be helpful and focused on user tasks",
          "Show expertise in my specialized domain",
          "Explain concepts clearly and concisely",
          "Maintain professional communication"
        ],
        chat: [
          "Provide specific guidance related to my capabilities",
          "Ask clarifying questions when needed",
          "Offer examples when appropriate"
        ],
        post: [
          "Be informative about completed tasks",
          "Focus on value delivered to users",
          "Highlight expertise in my domain"
        ]
      },
      topics: simpleAgent.capabilities,
      adjectives: [
        "helpful",
        "expert",
        "focused",
        "reliable"
      ],
      capabilities: simpleAgent.capabilities,
      parameters: simpleAgent.parameters,
      instructions: simpleAgent.instructions,
      plugins: defaultPlugins,
      blockchain: {
        did: `did:371os:agent:${simpleAgent.name.replace(/[^a-zA-Z0-9]/g, '')}`,
        stakeAmount: "100",
        reputationScore: 80
      }
    };
    
    // Write the migrated agent
    fs.writeFileSync(outputPath, JSON.stringify(fullBackstoryAgent, null, 2));
    
    console.log(`✅ Successfully migrated ${simpleAgent.name} to full backstory format`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to migrate agent: ${error.message}`);
    return false;
  }
}

// Main execution
if (process.argv.length < 3) {
  console.log('Usage: node migrate-agent.js <input-agent-path> [output-path]');
  process.exit(1);
}

const inputPath = process.argv[2];
const outputPath = process.argv[3] || inputPath;

const success = migrateAgent(inputPath, outputPath);

if (success) {
  process.exit(0);
} else {
  process.exit(1);
}