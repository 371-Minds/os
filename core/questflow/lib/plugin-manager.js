/**
 * ElizaOS Plugin Manager for QuestFlow-371OS Integration
 * 
 * This library provides functions for managing ElizaOS plugins within the 371OS ecosystem.
 */

const fs = require('fs');
const path = require('path');

/**
 * Load an ElizaOS plugin from the 371OS packages directory
 * @param {string} pluginName - Name of the plugin to load
 * @param {string} pluginsPath - Path to the 371OS packages directory
 * @returns {Object|null} - Plugin object or null if not found
 */
function loadPlugin(pluginName, pluginsPath = '../os-workspace/packages') {
  try {
    const pluginPath = path.join(pluginsPath, pluginName);
    if (!fs.existsSync(pluginPath)) {
      return null;
    }
    
    // Try to load the plugin's index file
    const indexPath = path.join(pluginPath, 'src', 'index.ts');
    const indexJsPath = path.join(pluginPath, 'src', 'index.js');
    
    if (fs.existsSync(indexPath)) {
      // For TypeScript plugins, we would need to compile them first
      // In a real implementation, we would use the compiled version
      console.log(`Found TypeScript plugin: ${pluginName}`);
      return {
        name: pluginName,
        path: pluginPath,
        type: 'typescript',
        loaded: true
      };
    } else if (fs.existsSync(indexJsPath)) {
      // For JavaScript plugins, we can load directly
      const plugin = require(indexJsPath);
      return {
        name: pluginName,
        path: pluginPath,
        type: 'javascript',
        plugin: plugin,
        loaded: true
      };
    } else {
      // Try package.json main entry
      const packagePath = path.join(pluginPath, 'package.json');
      if (fs.existsSync(packagePath)) {
        const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        const mainFile = pkg.main || 'index.js';
        const mainPath = path.join(pluginPath, mainFile);
        
        if (fs.existsSync(mainPath)) {
          const plugin = require(mainPath);
          return {
            name: pluginName,
            path: pluginPath,
            type: 'package',
            main: mainFile,
            plugin: plugin,
            loaded: true
          };
        }
      }
    }
    
    return {
      name: pluginName,
      path: pluginPath,
      type: 'unknown',
      loaded: false
    };
  } catch (error) {
    console.error(`Error loading plugin ${pluginName}:`, error);
    return null;
  }
}

/**
 * List all available ElizaOS plugins in the 371OS workspace
 * @param {string} pluginsPath - Path to the 371OS packages directory
 * @returns {Array} - List of available plugins
 */
function listAvailablePlugins(pluginsPath = '../os-workspace/packages') {
  const plugins = [];
  
  try {
    if (!fs.existsSync(pluginsPath)) {
      return plugins;
    }
    
    const items = fs.readdirSync(pluginsPath);
    
    for (const item of items) {
      const itemPath = path.join(pluginsPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        // Check if it's a plugin directory (has package.json or src directory)
        const packagePath = path.join(itemPath, 'package.json');
        const srcPath = path.join(itemPath, 'src');
        
        if (fs.existsSync(packagePath) || fs.existsSync(srcPath)) {
          plugins.push({
            name: item,
            path: itemPath
          });
        }
      }
    }
  } catch (error) {
    console.error('Error listing plugins:', error);
  }
  
  return plugins;
}

/**
 * Execute a plugin action
 * @param {Object} plugin - Loaded plugin object
 * @param {string} actionName - Name of the action to execute
 * @param {Object} parameters - Parameters for the action
 * @returns {Object} - Result of the action execution
 */
function executePluginAction(plugin, actionName, parameters = {}) {
  try {
    if (!plugin || !plugin.plugin) {
      throw new Error(`Plugin ${plugin ? plugin.name : 'unknown'} not loaded`);
    }
    
    // In a real implementation, we would check if the action exists
    // and execute it with the provided parameters
    console.log(`Executing action ${actionName} on plugin ${plugin.name}`);
    
    // Simulate action execution
    return {
      success: true,
      action: actionName,
      plugin: plugin.name,
      parameters: parameters,
      result: `Action ${actionName} executed successfully on ${plugin.name}`
    };
  } catch (error) {
    console.error(`Error executing plugin action:`, error);
    return {
      success: false,
      action: actionName,
      plugin: plugin ? plugin.name : 'unknown',
      error: error.message
    };
  }
}

module.exports = {
  loadPlugin,
  listAvailablePlugins,
  executePluginAction
};