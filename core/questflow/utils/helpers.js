/**
 * Utility functions for QuestFlow
 */

const fs = require('fs');
const path = require('path');

/**
 * Validates if a given object is a valid agent configuration
 * @param {Object} agentConfig - The agent configuration to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validateAgentConfig(agentConfig) {
  if (!agentConfig || typeof agentConfig !== 'object') {
    return false;
  }
  
  const requiredFields = ['name', 'provider', 'model'];
  return requiredFields.every(field => field in agentConfig);
}

/**
 * Generates a unique ID for workflows and steps
 * @returns {string} - A unique ID
 */
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Loads configuration from the 371OS config directory
 * @param {string} configName - Name of the configuration file
 * @param {string} configPath - Path to the config directory
 * @returns {Object|null} - Configuration object or null if not found
 */
function load371OSConfig(configName, configPath = '../os-workspace') {
  try {
    const configFilePath = path.join(configPath, configName);
    if (fs.existsSync(configFilePath)) {
      return JSON.parse(fs.readFileSync(configFilePath, 'utf8'));}
    
    // Try with .json extension
    const jsonConfigPath = path.join(configPath, `${configName}.json`);
    if (fs.existsSync(jsonConfigPath)) {
      return JSON.parse(fs.readFileSync(jsonConfigPath, 'utf8'));
    }
    
    return null;
  } catch (error) {
    console.error(`Error loading 371OS config ${configName}:`, error);
    return null;
  }
}

/**
 * Gets the 371OS workspace root path
 * @returns {string} - Path to the 371OS workspace
 */
function get371OSWorkspacePath() {
  return path.resolve('../os-workspace');
}

module.exports = {
  validateAgentConfig,
  generateUniqueId,
  load371OSConfig,
  get371OSWorkspacePath
};