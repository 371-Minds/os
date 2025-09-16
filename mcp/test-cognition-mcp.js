const fs = require('fs');

// Read the MCP configuration
const mcpConfig = JSON.parse(fs.readFileSync('./cognition-layer-mcp.json', 'utf8'));

console.log('MCP Configuration:');
console.log(JSON.stringify(mcpConfig, null, 2));

// Check if the cognition server is properly configured
if (mcpConfig.mcpServers && mcpConfig.mcpServers.cognition) {
  const cognitionConfig = mcpConfig.mcpServers.cognition;
  console.log('\nCognition MCP Server Configuration:');
  console.log('- Command:', cognitionConfig.command);
  console.log('- Args:', cognitionConfig.args);
  console.log('- Environment URL:', cognitionConfig.env?.MCP_SERVER_URL);
  
  // Validate the URL
  const url = cognitionConfig.env?.MCP_SERVER_URL;
  if (url) {
    try {
      new URL(url);
      console.log('- URL is valid');
    } catch (e) {
      console.log('- URL is invalid:', e.message);
    }
  }
} else {
  console.log('Error: Cognition MCP server not found in configuration');
}