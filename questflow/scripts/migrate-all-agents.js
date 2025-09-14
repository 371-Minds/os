#!/usr/bin/env node

/**
 * Script to migrate all simple QuestFlow agents to full backstory format
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function isFullBackstoryAgent(agent) {
  const fullBackstoryRequiredFields = [
    'name', 'role', 'description', 'provider', 'model', 'bio', 'lore', 
    'knowledge', 'messageExamples', 'postExamples', 'style', 'topics', 
    'adjectives', 'capabilities', 'parameters', 'instructions', 'plugins', 'blockchain'
  ];
  
  return fullBackstoryRequiredFields.every(field => field in agent);
}

function migrateAgent(simpleAgent, agentName) {
  // Default plugins list - in a real scenario, you might want to infer these from capabilities
  let defaultPlugins = ["business-intelligence", "nx-workspace"];
  
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
  
  return fullBackstoryAgent;
}

function migrateAllAgents(agentsDir) {
  let migratedCount = 0;
  
  function walkDir(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        walkDir(itemPath);
      } else if (stat.isFile() && item.endsWith('.json')) {
        try {
          const content = fs.readFileSync(itemPath, 'utf8');
          const agent = JSON.parse(content);
          
          // Skip if already a full backstory agent
          if (isFullBackstoryAgent(agent)) {
            console.log(`⏭️  ${agent.name}: Already full backstory format, skipping`);
            continue;
          }
          
          // Migrate the agent
          const migratedAgent = migrateAgent(agent, agent.name);
          
          // Write the migrated agent
          fs.writeFileSync(itemPath, JSON.stringify(migratedAgent, null, 2));
          
          console.log(`✅ ${agent.name}: Successfully migrated to full backstory format`);
          migratedCount++;
        } catch (error) {
          console.error(`❌ Error processing ${item}: ${error.message}`);
        }
      }
    }
  }
  
  walkDir(agentsDir);
  return migratedCount;
}

// Main execution
console.log('Migrating all simple QuestFlow agents to full backstory format...\n');

const agentsDir = path.join(__dirname, '..', 'agents');
const migratedCount = migrateAllAgents(agentsDir);

console.log(`\nMigration complete: ${migratedCount} agents migrated to full backstory format`);