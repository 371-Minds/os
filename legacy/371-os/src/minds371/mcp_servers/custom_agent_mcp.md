// agent-manager-mcp.js
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');

const server = new Server(
  {
    name: 'agent-manager',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Agent coordination tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'coordinate_agents',
      description: 'Coordinate multiple TypingMind agents',
      inputSchema: {
        type: 'object',
        properties: {
          agents: { type: 'array', items: { type: 'string' } },
          task: { type: 'string' }
        }
      }
    }
  ]
}));
