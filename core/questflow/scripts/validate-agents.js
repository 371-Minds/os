#!/usr/bin/env node

/**
 * Script to validate QuestFlow agents with full backstories
 * Checks for required fields and proper JSON formatting
 */

import fs from 'fs';
import path from 'path';

// Required fields for agents with full backstories
const fullBackstoryRequiredFields = [
  'name',
  'role',
  'description',
  'provider',
  'model',
  'bio',
  'lore',
  'knowledge',
  'messageExamples',
  'postExamples',
  'style',
  'topics',
  'adjectives',
  'capabilities',
  'parameters',
  'instructions',
  'plugins',
  'blockchain'
];

// Required fields for simple agents
const simpleRequiredFields = [
  'name',
  'description',
  'provider',
  'model',
  'capabilities',
  'parameters',
  'instructions'
];

// Required fields in blockchain section
const requiredBlockchainFields = [
  'did',
  'stakeAmount',
  'reputationScore'
];

// Required fields in style section
const requiredStyleFields = [
  'all',
  'chat',
  'post'
];

function isFullBackstoryAgent(agent) {
  // Check if agent has the key fields that indicate a full backstory agent
  return fullBackstoryRequiredFields.every(field => field in agent);
}

function validateFullBackstoryAgent(agent, agentName) {
  const errors = [];
  
  // Check for required top-level fields
  for (const field of fullBackstoryRequiredFields) {
    if (!(field in agent)) {
      errors.push(`Missing required field: ${field}`);
    }
  }
  
  // Check for required blockchain fields
  if (agent.blockchain) {
    for (const field of requiredBlockchainFields) {
      if (!(field in agent.blockchain)) {
        errors.push(`Missing required blockchain field: ${field}`);
      }
    }
  }
  
  // Check for required style fields
  if (agent.style) {
    for (const field of requiredStyleFields) {
      if (!(field in agent.style)) {
        errors.push(`Missing required style field: ${field}`);
      }
    }
  }
  
  // Check for non-empty arrays
  const arrayFields = ['bio', 'lore', 'knowledge', 'postExamples', 'topics', 'adjectives', 'capabilities', 'plugins'];
  for (const field of arrayFields) {
    if (agent[field] && (!Array.isArray(agent[field]) || agent[field].length === 0)) {
      errors.push(`Field ${field} should be a non-empty array`);
    }
  }
  
  // Check for non-empty strings
  const stringFields = ['name', 'role', 'description', 'provider', 'model', 'instructions'];
  for (const field of stringFields) {
    if (agent[field] && (typeof agent[field] !== 'string' || agent[field].trim() === '')) {
      errors.push(`Field ${field} should be a non-empty string`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    agentName,
    type: 'full-backstory'
  };
}

function validateSimpleAgent(agent, agentName) {
  const errors = [];
  
  // Check for required fields
  for (const field of simpleRequiredFields) {
    if (!(field in agent)) {
      errors.push(`Missing required field: ${field}`);
    }
  }
  
  // Check for non-empty arrays
  const arrayFields = ['capabilities'];
  for (const field of arrayFields) {
    if (agent[field] && (!Array.isArray(agent[field]) || agent[field].length === 0)) {
      errors.push(`Field ${field} should be a non-empty array`);
    }
  }
  
  // Check for non-empty strings
  const stringFields = ['name', 'description', 'provider', 'model', 'instructions'];
  for (const field of stringFields) {
    if (agent[field] && (typeof agent[field] !== 'string' || agent[field].trim() === '')) {
      errors.push(`Field ${field} should be a non-empty string`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    agentName,
    type: 'simple'
  };
}

function validateAgent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const agent = JSON.parse(content);
    
    const agentName = agent.name || path.basename(filePath);
    
    // Determine agent type and validate accordingly
    if (isFullBackstoryAgent(agent)) {
      return validateFullBackstoryAgent(agent, agentName);
    } else {
      return validateSimpleAgent(agent, agentName);
    }
  } catch (error) {
    return {
      valid: false,
      errors: [`Invalid JSON: ${error.message}`],
      agentName: path.basename(filePath),
      type: 'invalid'
    };
  }
}

function validateAllAgents(agentsDir) {
  const results = [];
  
  function walkDir(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        walkDir(itemPath);
      } else if (stat.isFile() && item.endsWith('.json') && !item.includes('migrated')) {
        const result = validateAgent(itemPath);
        results.push(result);
      }
    }
  }
  
  walkDir(agentsDir);
  return results;
}

// Main execution
console.log('Validating QuestFlow agents...\n');

const agentsDir = path.join(process.cwd(), 'agents');
const results = validateAllAgents(agentsDir);

let validCount = 0;
let invalidCount = 0;
let fullBackstoryCount = 0;
let simpleCount = 0;

for (const result of results) {
  if (result.valid) {
    console.log(`✅ ${result.agentName}: Valid (${result.type})`);
    validCount++;
    if (result.type === 'full-backstory') {
      fullBackstoryCount++;
    } else if (result.type === 'simple') {
      simpleCount++;
    }
  } else {
    console.log(`❌ ${result.agentName}: Invalid (${result.type})`);
    console.log(`   Errors: ${result.errors.join(', ')}`);
    invalidCount++;
  }
}

console.log(`\nValidation complete:`);
console.log(`  ${validCount} valid agents (${fullBackstoryCount} full-backstory, ${simpleCount} simple)`);
console.log(`  ${invalidCount} invalid agents`);

if (invalidCount > 0) {
  process.exit(1);
} else {
  console.log('All agents are valid!');
  process.exit(0);
}