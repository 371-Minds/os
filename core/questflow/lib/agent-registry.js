/**
 * 371OS Agent Registry Integration
 * 
 * This library provides functions for interacting with the 371OS agent registry,
 * including agent discovery, registration, and management.
 */

const fs = require('fs');
const path = require('path');

/**
 * Load agent configuration from the 371OS agents directory
 * @param {string} agentId - The ID of the agent to load
 * @param {string} agentsPath - Path to the 371OS agents directory
 * @returns {Object|null} - The agent configuration or null if not found
 */
function loadAgentConfig(agentId, agentsPath = '../os-workspace/agents') {
  try {
    // Try different agent category directories
    const categories = ['business-agents', 'technical-agents', 'marketing-agents', 'utility-agents', 'uncategorized-agents', 'test-agent'];
    
    for (const category of categories) {
      const agentPath = path.join(agentsPath, category, agentId, 'character.json');
      if (fs.existsSync(agentPath)) {
        const config = JSON.parse(fs.readFileSync(agentPath, 'utf8'));
        return {
          ...config,
          id: agentId,
          category: category
        };
      }
    }
    
    // If not found in categories, try direct path
    const directPath = path.join(agentsPath, agentId, 'character.json');
    if (fs.existsSync(directPath)) {
      const config = JSON.parse(fs.readFileSync(directPath, 'utf8'));
      return {
        ...config,
        id: agentId
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error loading agent config for ${agentId}:`, error);
    return null;
  }
}

/**
 * List all available agents in the 371OS workspace
 * @param {string} agentsPath - Path to the 371OS agents directory
 * @returns {Array} - List of available agents
 */
function listAvailableAgents(agentsPath = '../os-workspace/agents') {
  const agents = [];
  
  try {
    const categories = fs.readdirSync(agentsPath);
    
    for (const category of categories) {
      const categoryPath = path.join(agentsPath, category);
      const stat = fs.statSync(categoryPath);
      
      if (stat.isDirectory()) {
        const items = fs.readdirSync(categoryPath);
        for (const item of items) {
          const itemPath = path.join(categoryPath, item);
          const itemStat = fs.statSync(itemPath);
          
          if (itemStat.isDirectory()) {
            // Check if it's an agent directory (has character.json)
            const configPath = path.join(itemPath, 'character.json');
            if (fs.existsSync(configPath)) {
              agents.push({
                id: item,
                category: category,
                path: itemPath
              });
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error listing agents:', error);
  }
  
  return agents;
}

/**
 * Validate agent configuration against 371OS standards
 * @param {Object} agentConfig - The agent configuration to validate
 * @returns {Object} - Validation result
 */
function validateAgentConfig(agentConfig) {
  const result = {
    valid: true,
    errors: [],
    warnings: []
  };
  
  // Required fields
  const requiredFields = ['name', 'bio', 'lore', 'knowledge', 'messageExamples', 'postExamples', 'style'];
  for (const field of requiredFields) {
    if (!agentConfig[field]) {
      result.valid = false;
      result.errors.push(`Missing required field: ${field}`);
    }
  }
  
  // Check for ElizaOS compatibility
  if (agentConfig.plugins && !Array.isArray(agentConfig.plugins)) {
    result.warnings.push('Plugins should be an array');
  }
  
  return result;
}

module.exports = {
  loadAgentConfig,
  listAvailableAgents,
  validateAgentConfig
};