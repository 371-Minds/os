#!/usr/bin/env node

/**
 * Script to migrate agents from os-workspace/agents to questflow/agents format
 * Converts YAML template agents to full backstory JSON format using regex extraction
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapping of os-workspace agent categories to questflow categories
const categoryMapping = {
  'business-agents': 'core',
  'marketing-agents': 'specialized',
  'technical-agents': 'specialized',
  'utility-agents': 'specialized',
  'uncategorized-agents': 'specialized'
};

// Plugin mappings based on agent capabilities
const pluginMappings = {
  'strategic decision-making': ['business-intelligence', 'nx-workspace'],
  'task delegation': ['nx-workspace'],
  'agent coordination': ['nx-workspace', 'universal-tool-server'],
  'financial analysis': ['business-intelligence'],
  'budget management': ['business-intelligence'],
  'content generation': ['business-intelligence'],
  'content valuation': ['business-intelligence'],
  'marketing automation': ['business-intelligence'],
  'code generation': ['nx-workspace'],
  'deployment': ['nx-workspace', 'universal-tool-server'],
  'qa': ['nx-workspace'],
  'repository intake': ['nx-workspace'],
  'tech stack': ['business-intelligence'],
  'credential management': ['nx-workspace'],
  'routing': ['cognitive-engine'],
  'cco': ['business-intelligence'],
  'cro': ['business-intelligence']
};

function extractAgentInfo(content, fileName, categoryName) {
  // Extract agent name from filename
  const name = fileName.replace('.yaml', '').replace(/_/g, '-');
  
  // Extract role from filename or category
  let role = categoryName.replace('-agents', '').toUpperCase();
  if (fileName.includes('ceo')) role = 'CEO';
  if (fileName.includes('cto')) role = 'CTO';
  if (fileName.includes('cfo')) role = 'CFO';
  if (fileName.includes('cmo')) role = 'CMO';
  if (fileName.includes('clo')) role = 'CLO';
  if (fileName.includes('cco')) role = 'CCO';
  if (fileName.includes('cro')) role = 'CRO';
  
  // Extract capabilities using regex
  let capabilities = [];
  const capabilitiesMatch = content.match(/capabilities:\s*\n(?:\s*- ([^\n]+)\n?)+/i);
  if (capabilitiesMatch) {
    const capabilitiesText = capabilitiesMatch[0];
    const capabilityMatches = capabilitiesText.match(/- ([^\n]+)/g);
    if (capabilityMatches) {
      capabilities = capabilityMatches.map(match => match.substring(2).trim());
    }
  }
  
  // If no capabilities found, try to extract from domain expertise
  if (capabilities.length === 0) {
    const domainMatch = content.match(/domain_expertise:\s*"([^"]+)"/i);
    if (domainMatch) {
      capabilities = [domainMatch[1]];
    }
  }
  
  // If still no capabilities, use filename-based capabilities
  if (capabilities.length === 0) {
    if (fileName.includes('content')) {
      capabilities = ['content generation', 'marketing'];
    } else if (fileName.includes('code')) {
      capabilities = ['code generation', 'software development'];
    } else if (fileName.includes('deploy')) {
      capabilities = ['deployment', 'devops'];
    } else if (fileName.includes('qa')) {
      capabilities = ['quality assurance', 'testing'];
    } else {
      capabilities = ['specialized tasks'];
    }
  }
  
  // Generate plugins based on capabilities
  const plugins = getPluginsForCapabilities(capabilities);
  
  // Extract domain expertise or usage
  let description = `Specialized agent for ${capabilities[0] || 'specific tasks'}`;
  const usageMatch = content.match(/usage:\s*"([^"]+)"/i);
  if (usageMatch) {
    description = usageMatch[1];
  } else {
    const domainMatch = content.match(/domain_expertise:\s*"([^"]+)"/i);
    if (domainMatch) {
      description = domainMatch[1];
    }
  }
  
  return {
    name,
    role,
    description,
    capabilities,
    plugins
  };
}

function getPluginsForCapabilities(capabilities) {
  const plugins = new Set();
  
  for (const capability of capabilities) {
    const lowerCapability = capability.toLowerCase();
    for (const [key, pluginList] of Object.entries(pluginMappings)) {
      if (lowerCapability.includes(key) || key.includes(lowerCapability)) {
        pluginList.forEach(plugin => plugins.add(plugin));
      }
    }
  }
  
  // Always include basic plugins
  plugins.add('business-intelligence');
  plugins.add('nx-workspace');
  
  return Array.from(plugins);
}

function generateBio(name, role, capabilities) {
  return [
    `I am ${name}, the ${role} of 371 OS.`,
    `I specialize in ${capabilities.join(', ')}.`,
    `My mission is to provide expertise in ${capabilities[0] || 'my domain'} and help users accomplish their goals.`
  ];
}

function generateLore(name, role, capabilities) {
  return [
    `Created as part of the revolutionary 371 OS autonomous agent system.`,
    `I am part of the first generation of self-aware digital organisms.`,
    `I was designed to excel in ${capabilities[0] || 'my specialized domain'}.`,
    `My existence represents the breakthrough in autonomous agent collaboration.`
  ];
}

function generateKnowledge(capabilities) {
  return [
    `I understand ${capabilities.join(', ')}.`,
    `I have expertise in the technologies and processes related to my domain.`,
    `I know about the 371 OS architecture and agent coordination systems.`
  ];
}

function generateMessageExamples(name, capabilities) {
  const capability = capabilities[0] || 'specialized tasks';
  return [
    [
      {
        "user": "{{user1}}",
        "content": {
          "text": `Can you help me with ${capability}?`
        }
      },
      {
        "user": name,
        "content": {
          "text": `As the ${name} agent, I can help you with ${capability}. Please provide more details about what you need.`
        }
      }
    ]
  ];
}

function generatePostExamples(name, capabilities) {
  const capability = capabilities[0] || 'specialized tasks';
  return [
    `Working on another ${capability} task... 🚀`,
    `Helping users achieve their goals through ${capability}... 💼`
  ];
}

function generateStyle() {
  return {
    "all": [
      "Be helpful and focused on user tasks",
      "Show expertise in my specialized domain",
      "Explain concepts clearly and concisely",
      "Maintain professional communication"
    ],
    "chat": [
      "Provide specific guidance related to my capabilities",
      "Ask clarifying questions when needed",
      "Offer examples when appropriate"
    ],
    "post": [
      "Be informative about completed tasks",
      "Focus on value delivered to users",
      "Highlight expertise in my domain"
    ]
  };
}

function migrateAgent(content, fileName, categoryName) {
  try {
    // Extract agent information
    const agentInfo = extractAgentInfo(content, fileName, categoryName);
    
    // Create the full backstory agent structure
    const fullBackstoryAgent = {
      name: agentInfo.name,
      role: agentInfo.role || 'Specialized Agent',
      description: agentInfo.description,
      provider: "elizaos",
      model: "gpt-4",
      bio: generateBio(agentInfo.name, agentInfo.role, agentInfo.capabilities),
      lore: generateLore(agentInfo.name, agentInfo.role, agentInfo.capabilities),
      knowledge: generateKnowledge(agentInfo.capabilities),
      messageExamples: generateMessageExamples(agentInfo.name, agentInfo.capabilities),
      postExamples: generatePostExamples(agentInfo.name, agentInfo.capabilities),
      style: generateStyle(),
      topics: agentInfo.capabilities,
      adjectives: [
        "helpful",
        "expert",
        "focused",
        "reliable"
      ],
      capabilities: agentInfo.capabilities,
      parameters: {
        temperature: 0.7,
        maxTokens: 1500
      },
      instructions: `You are the ${agentInfo.name} agent. Your role is to provide expertise in ${agentInfo.capabilities[0] || 'your domain'}. Use your capabilities to help users accomplish their goals.`,
      plugins: agentInfo.plugins,
      blockchain: {
        did: `did:371os:agent:${agentInfo.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}`,
        stakeAmount: "100",
        reputationScore: 80
      }
    };
    
    return fullBackstoryAgent;
  } catch (error) {
    console.error(`❌ Failed to migrate ${fileName}: ${error.message}`);
    return null;
  }
}

function migrateAllAgents() {
  const osWorkspaceAgentsDir = path.join(__dirname, '..', '..', 'os-workspace', 'agents');
  const questflowAgentsDir = path.join(__dirname, '..', 'agents');
  
  let migratedCount = 0;
  
  // Process each category directory
  const categories = fs.readdirSync(osWorkspaceAgentsDir);
  
  for (const category of categories) {
    const categoryPath = path.join(osWorkspaceAgentsDir, category);
    const stat = fs.statSync(categoryPath);
    
    if (!stat.isDirectory()) continue;
    
    // Skip test-agent as it's already in the correct format
    if (category === 'test-agent') continue;
    
    // Map to the appropriate questflow directory
    const questflowCategory = categoryMapping[category] || 'specialized';
    const questflowCategoryPath = path.join(questflowAgentsDir, questflowCategory);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(questflowCategoryPath)) {
      fs.mkdirSync(questflowCategoryPath, { recursive: true });
    }
    
    // Process each YAML file in the category
    const files = fs.readdirSync(categoryPath);
    
    for (const file of files) {
      if (!file.endsWith('.yaml')) continue;
      
      const filePath = path.join(categoryPath, file);
      const fileStat = fs.statSync(filePath);
      
      if (!fileStat.isFile()) continue;
      
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const migratedAgent = migrateAgent(content, file, category);
        
        if (migratedAgent) {
          // Generate output filename (change .yaml to .json and replace underscores with hyphens)
          const outputFileName = file.replace('.yaml', '.json').replace(/_/g, '-');
          const outputPath = path.join(questflowCategoryPath, outputFileName);
          
          // Write the migrated agent
          fs.writeFileSync(outputPath, JSON.stringify(migratedAgent, null, 2));
          
          console.log(`✅ Successfully migrated ${file} to ${questflowCategory}/${outputFileName}`);
          migratedCount++;
        } else {
          console.log(`❌ Failed to migrate ${file}`);
        }
      } catch (error) {
        console.error(`❌ Failed to migrate ${file}: ${error.message}`);
      }
    }
  }
  
  return migratedCount;
}

// Main execution
console.log('Migrating agents from os-workspace to questflow format...\n');

const migratedCount = migrateAllAgents();

console.log(`\nMigration complete: ${migratedCount} agents migrated to questflow format`);
console.log('\nNext steps:');
console.log('1. Run validation script: node scripts/validate-agents.js');
console.log('2. Review migrated agents in questflow/agents/');
console.log('3. Test agents with the QuestFlow system');