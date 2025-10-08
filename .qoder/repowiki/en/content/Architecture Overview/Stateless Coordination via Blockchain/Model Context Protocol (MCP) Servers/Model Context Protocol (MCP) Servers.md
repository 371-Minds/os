# Model Context Protocol (MCP) Servers

<cite>
**Referenced Files in This Document**   
- [custom_agent_mcp.md](file://371-os/src/minds371/mcp_servers/custom_agent_mcp.md)
- [memory_mcp.md](file://371-os/src/minds371/mcp_servers/memory_mcp.md)
- [local_file_mcp.md](file://371-os/src/minds371/mcp_servers/local_file_mcp.md)
- [ref-tools-mcp.md](file://371-os/src/minds371/mcp_servers/ref-tools-mcp.md)
- [agent-coordinator-extension.js](file://371-os/src/minds371/platforms/typingmind/extensions/agent-coordinator-extension.js)
- [shared_memory.js](file://371-os/src/minds371/platforms/typingmind/extensions/shared_memory.js)
- [agent_dynamic_context.js](file://371-os/src/minds371/platforms/typingmind/extensions/agent_dynamic_context.js)
- [MCP Setup Guide.md](file://elizaos/Guides/MCP Setup Guide.md)
- [types.ts](file://packages/elizaos-plugins/universal-tool-server/src/types.ts)
- [371-minds-next-gen-guide.md](file://371-os/src/minds371/371OS_launch/371-minds-next-gen-guide.md)
- [universal_mcp_architecture.md](file://371-os/docs/architecture/universal_mcp_architecture.md) - *Updated in recent commit*
</cite>

## Update Summary
- Added comprehensive overview of Universal MCP Architecture with blockchain integration
- Updated MCP server types section to reflect cross-platform compatibility requirements
- Enhanced security model with Zero-Trust Architecture details
- Added Universal MCP Router implementation details
- Updated integration section with new routing patterns
- Revised performance optimization guidelines for cross-platform consistency

## Table of Contents
1. [Introduction](#introduction)
2. [MCP Server Types](#mcp-server-types)
3. [Request-Response Patterns](#request-response-patterns)
4. [Authentication and Security Model](#authentication-and-security-model)
5. [Data Serialization Formats](#data-serialization-formats)
6. [Integration with Adaptive LLM Router and C-Suite Agents](#integration-with-adaptive-llm-router-and-c-suite-agents)
7. [Usage Examples](#usage-examples)
8. [Troubleshooting Guide](#troubleshooting-guide)

## Introduction
The Model Context Protocol (MCP) servers in 371OS enable secure, stateless context sharing between autonomous agents through standardized message formats and access controls. MCP serves as the nervous system connecting various components of the 371OS ecosystem, allowing agents to coordinate tasks, share ephemeral context, exchange files, and integrate reference tools. This documentation details the four primary MCP server types: custom_agent_mcp for specialized agent interactions, memory_mcp for ephemeral context storage, local_file_mcp for file-based context exchange, and ref-tools-mcp for reference tool integration. The protocol facilitates secure communication channels and context data exchange without requiring persistent connections, supporting the Adaptive LLM Router and C-Suite agents in making context-aware decisions.

The Universal MCP Architecture introduces a revolutionary cross-platform, blockchain-coordinated framework that enhances agent coordination and tool integration. This architecture ensures platform-agnostic operation across Windows, macOS, and Linux while maintaining statelessness through blockchain-based registry coordination.

**Updated** Added Universal MCP Architecture context and cross-platform requirements

**Section sources**
- [universal_mcp_architecture.md](file://371-os/docs/architecture/universal_mcp_architecture.md) - *Updated in recent commit*

## MCP Server Types

### custom_agent_mcp
The custom_agent_mcp server enables specialized interactions between autonomous agents, particularly for agent coordination tasks. Implemented in JavaScript, this server uses the Model Context Protocol SDK to create a server instance that can handle specific agent coordination tools.

```javascript
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
```

This server allows agents to coordinate multiple TypingMind agents by specifying a list of agents and a task to be performed. The input schema defines the required parameters, ensuring proper validation before execution.

**Section sources**
- [custom_agent_mcp.md](file://371-os/src/minds371/mcp_servers/custom_agent_mcp.md)

### memory_mcp
The memory_mcp server provides ephemeral context storage for agents, enabling temporary data sharing without persistent storage requirements. This server is configured through a JSON configuration that specifies the command and arguments for launching the server.

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

The memory server uses the @modelcontextprotocol/server-memory package, which is launched via npx with the -y flag to automatically install the package if not present. This configuration enables agents to store and retrieve temporary context data during their operations.

**Section sources**
- [memory_mcp.md](file://371-os/src/minds371/mcp_servers/memory_mcp.md)

### local_file_mcp
The local_file_mcp server facilitates file-based context exchange between agents by providing access to specified directories on the local filesystem. This server is configured with environment variables that define the allowed directories for file access.

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"],
      "env": {
        "ALLOWED_DIRECTORIES": "C:\\Users,D:\\,E:\\,F:\\,G:\\,H:\\,J:\\"
      }
    }
  }
}
```

The configuration specifies multiple drive letters (C through J) as allowed directories, providing broad access to the local filesystem while maintaining security through explicit directory whitelisting. This enables agents to read, write, and exchange files within these designated areas.

**Section sources**
- [local_file_mcp.md](file://371-os/src/minds371/mcp_servers/local_file_mcp.md)

### ref-tools-mcp
The ref-tools-mcp server integrates reference tools for agents, providing access to documentation, code examples, and other reference materials. This server is configured with an API key for authentication and offers several strategic advantages for agent management.

```json
{
  "mcpServers": {
    "ref-tools": {
      "command": "npx",
      "args": ["ref-tools-mcp"],
      "env": {
        "REF_API_KEY": "your-api-key"
      }
    }
  }
}
```

**Key Features:**
- Smart Documentation Chunking: Returns only relevant tokens instead of entire pages
- Code Tab Awareness: Loads all code examples, not just curl commands
- Deep Link Generation: Provides specific page locations for verification
- Fast Performance: P95 latency of 1.7 seconds
- Comprehensive Coverage: Thousands of sites and public GitHub repositories

**Strategic Value for Agent Management:**
- Eliminates hallucinations by providing up-to-date documentation
- Reduces token usage through intelligent content filtering
- Supports both public and private documentation access

**Section sources**
- [ref-tools-mcp.md](file://371-os/src/minds371/mcp_servers/ref-tools-mcp.md)

## Request-Response Patterns

### STDIO Communication Pattern
The STDIO communication pattern is used for local MCP servers that run as separate processes and communicate through standard input and output streams. This pattern is commonly used for tools like web search and local file access.

```typescript
export const character: Character = {
  name: 'WebSearchAgent',
  plugins: [
    '@elizaos/plugin-sql',
    '@elizaos/plugin-openrouter',
    '@elizaos/plugin-openai',
    '@elizaos/plugin-mcp',
    '@elizaos/plugin-bootstrap',
  ],
  settings: {
    mcp: {
      servers: {
        firecrawl: {
          type: 'stdio',
          command: 'npx',
          args: ['-y', 'firecrawl-mcp'],
          env: {
            FIRECRAWL_API_KEY: process.env.FIRECRAWL_API_KEY || '',
          },
        },
      },
    },
  },
  system: 'You are a helpful assistant with web search capabilities.',
};
```

In this pattern, the agent process spawns a child process for the MCP server and communicates with it through stdin and stdout. The communication is typically JSON-based, with requests and responses following a standardized format.

### SSE Communication Pattern
The Server-Sent Events (SSE) pattern is used for remote API connections, allowing the server to push updates to the client over HTTP. This pattern is suitable for real-time data access and API interactions.

```typescript
export const character: Character = {
  name: 'APIAgent',
  plugins: ['@elizaos/plugin-sql', '@elizaos/plugin-mcp', '@elizaos/plugin-bootstrap'],
  settings: {
    mcp: {
      servers: {
        myApiServer: {
          type: 'sse',
          url: 'https://your-api-server.com/sse',
        },
      },
    },
  },
  system: 'You are a helpful assistant with API access capabilities.',
};
```

The SSE pattern enables the server to send continuous updates to the agent, making it ideal for streaming data, real-time notifications, and long-running operations.

### HTTP/REST Communication Pattern
The HTTP/REST pattern is used for stateless communication with remote servers, following REST principles for resource manipulation. This pattern is used in the MCP integration layer for connecting to various services.

```typescript
export const mcpServerConfig = {
  status_network: {
    type: 'http',
    url: 'https://status-network-l2.api.endpoint',
    capabilities: ['community_query', 'governance', 'token_operations']
  },
};
```

This pattern uses standard HTTP methods (GET, POST, PUT, DELETE) to interact with resources, providing a familiar and widely-supported interface for agent communication.

**Section sources**
- [MCP Setup Guide.md](file://elizaos/Guides/MCP Setup Guide.md)
- [371-minds-next-gen-guide.md](file://371-os/src/minds371/371OS_launch/371-minds-next-gen-guide.md)

## Authentication and Security Model

### Authentication Mechanisms
The MCP system implements multiple authentication mechanisms to ensure secure communication between agents and servers. The Universal Tool Server architecture provides out-of-the-box authentication support with granular permissions.

```typescript
export interface AgentAuthentication {
  method: 'delegated-oauth' | 'cryptographic-identity' | 'zero-knowledge-proof';
  credentials?: DelegatedCredentials;
  identity?: CryptographicIdentity;
  proof?: ZKProof;
}
```

The authentication model supports three primary methods:
- **Delegated OAuth**: Uses token-based authentication with delegated permissions
- **Cryptographic Identity**: Uses public-key cryptography for identity verification
- **Zero-Knowledge Proof**: Enables authentication without revealing sensitive information

Each method provides different security characteristics and use cases, allowing agents to choose the appropriate authentication mechanism based on their requirements.

### Access Control and Permissions
The MCP system implements granular access controls, allowing permissions to be specified per tool. This creates a more secure and manageable access control system where users can define specific permissions for different capabilities.

```typescript
export interface Permission {
  resource: string;
  actions: string[];
  conditions?: Record<string, any>;
}
```

Access policies can be defined at multiple levels:
- **Server-level**: Controls which agents can connect to a specific MCP server
- **Tool-level**: Defines what actions an agent can perform with specific tools
- **Resource-level**: Specifies access to particular resources or data

This hierarchical approach to access control ensures that agents only have the minimum permissions necessary to perform their tasks, following the principle of least privilege.

### Security Considerations
The MCP system addresses several security challenges inherent in agent communication:

**Complex Authentication Flows:** The system simplifies authentication by providing standardized patterns that make "AI agent login just like regular human login," reducing friction for both technical and non-technical users.

**Stateless Architecture:** Unlike traditional stateful connections, MCP treats each tool call as an independent HTTP request, similar to REST APIs. This eliminates server state management complexity and enhances security by reducing the attack surface.

**Environment Variable Protection:** Sensitive credentials like API keys are managed through environment variables rather than being hardcoded in configuration files, reducing the risk of accidental exposure.

**Zero-Trust Architecture:** All MCP interactions follow zero-trust principles with cryptographic verification and no hardcoded credentials. Authentication occurs through a Secretless Broker system that manages credentials securely.

**Section sources**
- [types.ts](file://packages/elizaos-plugins/universal-tool-server/src/types.ts)
- [371-minds-next-gen-guide.md](file://371-os/src/minds371/371OS_launch/371-minds-next-gen-guide.md)
- [universal_mcp_architecture.md](file://371-os/docs/architecture/universal_mcp_architecture.md) - *Updated in recent commit*

## Data Serialization Formats

### JSON Schema for Data Validation
The MCP system uses JSON Schema for defining and validating the structure of data exchanged between agents and servers. This ensures data integrity and consistency across the system.

```typescript
export interface UniversalToolCall {
  id: string;
  tool: string;
  parameters: Record<string, any>;
  authentication: AgentAuthentication;
  context?: AgentContext;
}

export interface UniversalToolResponse {
  id: string;
  success: boolean;
  result?: any;
  error?: string;
  cost?: number;
  provenance: ToolProvenance;
}
```

The UniversalToolCall interface defines the structure of requests sent from agents to MCP servers, including:
- **id**: Unique identifier for the tool call
- **tool**: Name of the tool to be executed
- **parameters**: Input parameters for the tool
- **authentication**: Authentication credentials
- **context**: Optional contextual information

The UniversalToolResponse interface defines the structure of responses from MCP servers, including:
- **id**: Correlation identifier matching the request
- **success**: Boolean indicating success or failure
- **result**: Result data if successful
- **error**: Error message if unsuccessful
- **cost**: Resource cost of the operation
- **provenance**: Information about the execution context

### Context Serialization
The MCP system serializes agent context using structured JSON objects that capture relevant information for decision-making.

```typescript
export interface AgentContext {
  userId?: string;
  sessionId?: string;
  platform: string;
  capabilities: string[];
  preferences: UserPreferences;
  budget?: BudgetConstraints;
}
```

Context serialization includes:
- **User and Session Information**: Identifiers for the user and current session
- **Platform Context**: Information about the execution environment
- **Capabilities**: Available tools and functions
- **Preferences**: User-specific settings and preferences
- **Budget Constraints**: Resource limitations for the operation

This structured approach to context serialization enables agents to share relevant information while maintaining data consistency and integrity.

**Section sources**
- [types.ts](file://packages/elizaos-plugins/universal-tool-server/src/types.ts)

## Integration with Adaptive LLM Router and C-Suite Agents

### MCP Integration Layer
The MCP architecture serves as the nervous system connecting all components of the 371OS ecosystem, including the Adaptive LLM Router and C-Suite agents. This integration layer enables context-aware decision making by providing access to various services and data sources.

```typescript
// MCP Server Registry
export const mcpServerConfig = {
  pieces_cognition: {
    type: 'stdio',
    command: 'pieces-mcp-server',
    capabilities: ['memory_query', 'pattern_analysis', 'context_extraction']
  },
  status_network: {
    type: 'http',
    url: 'https://status-network-l2.api.endpoint',
    capabilities: ['community_query', 'governance', 'token_operations']
  },
  github_prompts: {
    type: 'stdio', 
    command: 'github-mcp',
    args: ['--repo', 'your-username/bizbuilderprompts'],
    capabilities: ['prompt_retrieval', 'template_management']
  }
};
```

The integration layer connects to three primary services:
- **Pieces Cognition**: Provides access to personal memory and cognitive patterns
- **Status Network**: Enables community governance and token operations
- **GitHub Prompts**: Facilitates prompt retrieval and template management

### Universal MCP Router
The Universal MCP Router provides centralized routing for all MCP server requests, enabling cross-platform agent coordination and blockchain-based trust verification.

```typescript
// packages/elizaos-plugins/universal-mcp-router/src/router.ts
import { Plugin } from '@elizaos/core';

export class UniversalMCPRouter {
  private mcpServers: Map<string, Plugin> = new Map();
  
  registerMCPServer(name: string, server: Plugin): void {
    this.mcpServers.set(name, server);
  }
  
  async routeRequest(serverName: string, action: string, params: any): Promise<any> {
    const server = this.mcpServers.get(serverName);
    if (!server) {
      throw new Error(`MCP Server ${serverName} not found`);
    }
    
    // Route to appropriate action handler
    // Implementation details...
  }
}
```

The router enables:
- **Cross-platform compatibility**: All MCP servers must be platform-agnostic
- **Stateless design**: All state managed through blockchain registry
- **Blockchain coordination**: Agent discovery through decentralized registry
- **Cryptographic verification**: Trust established through cryptographic signatures

**Updated** Added Universal MCP Router implementation details

**Section sources**
- [universal_mcp_architecture.md](file://371-os/docs/architecture/universal_mcp_architecture.md) - *Updated in recent commit*

### Agent Coordination Extension
The agent-coordinator-extension.js file implements an extension for TypingMind to coordinate with Electron agents, enabling seamless communication between different agent platforms.

```javascript
// agent-coordinator-extension.js
(function() {
  'use strict';

  // Extension for TypingMind to coordinate with Electron agents
  class ElectronBridge {
    constructor() {
      this.electronChannel = null;
      this.initializeBridge();
    }

    initializeBridge() {
      // Check if running in Electron context
      if (window.electronAPI) {
        this.electronChannel = window.electronAPI;
        this.setupEventListeners();
      } else {
        // Fallback to WebSocket communication
        this.initializeWebSocketBridge();
      }
    }

    initializeWebSocketBridge() {
      const ws = new WebSocket('ws://localhost:8080/agent-bridge');
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleElectronMessage(data);
      };

      this.electronChannel = {
        send: (message) => ws.send(JSON.stringify(message)),
        on: (event, callback) => {
          ws.addEventListener('message', (msg) => {
            const data = JSON.parse(msg.data);
            if (data.type === event) {
              callback(data.payload);
            }
          });
        }
      };
    }

    setupEventListeners() {
      this.electronChannel.on('agent-task', (task) => {
        this.executeAgentTask(task);
      });

      this.electronChannel.on('context-update', (context) => {
        this.updateAgentContext(context);
      });
    }
```

This extension provides a bridge between TypingMind and Electron agents, supporting both direct Electron API communication and WebSocket fallback for environments where Electron is not available.

### Shared Memory Implementation
The shared_memory.js file implements a context API endpoint for cross-agent memory sharing, enabling agents to access shared context from a memory store.

```javascript
// Context API endpoint for cross-agent memory
app.get('/agent-context', (req, res) => {
  const { agentId, chatId } = req.query;
  
  // Retrieve shared context from memory store
  const sharedContext = memoryStore.getSharedContext({
    agentId,
    chatId,
    includeHistory: true,
    maxTokens: 1000
  });
  
  res.json({
    context: sharedContext,
    timestamp: Date.now(),
    source: 'electron-agent-manager'
  });
});
```

This implementation allows agents to retrieve shared context by specifying their agent ID and chat ID, with options to include conversation history and limit the token count.

### Dynamic Context Configuration
The agent_dynamic_context.js file defines dynamic context configuration for agent coordination, specifying how agents should connect to context endpoints.

```javascript
// Dynamic context configuration for agent coordination
const agentContextConfig = {
  contextName: "Agent Coordination Context",
  httpMethod: "GET",
  endpointURL: "http://localhost:3001/agent-context",
  headers: {
    "Authorization": "Bearer ${ELECTRON_BRIDGE_TOKEN}",
    "Content-Type": "application/json"
  },
  cachePolicy: {
    enabled: true,
    duration: 30 // seconds
  },
  variables: {
    agentId: "{characterID}",
    chatId: "{chatID}",
    lastMessage: "{lastUserMessage}"
  }
};
```

This configuration includes:
- **Endpoint URL**: Location of the context service
- **Authentication**: Bearer token for secure access
- **Cache Policy**: Caching strategy to improve performance
- **Variables**: Dynamic values that are substituted at runtime

**Section sources**
- [agent-coordinator-extension.js](file://371-os/src/minds371/platforms/typingmind/extensions/agent-coordinator-extension.js)
- [shared_memory.js](file://371-os/src/minds371/platforms/typingmind/extensions/shared_memory.js)
- [agent_dynamic_context.js](file://371-os/src/minds371/platforms/typingmind/extensions/agent_dynamic_context.js)

## Usage Examples

### Web Search with Firecrawl
This example demonstrates how to configure an agent with web search capabilities using the Firecrawl MCP server.

```typescript
export const character: Character = {
  name: 'WebSearchAgent',
  plugins: [
    '@elizaos/plugin-sql',
    '@elizaos/plugin-openrouter',
    '@elizaos/plugin-openai',
    '@elizaos/plugin-mcp',
    '@elizaos/plugin-bootstrap',
  ],
  settings: {
    mcp: {
      servers: {
        firecrawl: {
          type: 'stdio',
          command: 'npx',
          args: ['-y', 'firecrawl-mcp'],
          env: {
            FIRECRAWL_API_KEY: process.env.FIRECRAWL_API_KEY || '',
          },
        },
      },
    },
  },
  system: 'You are a helpful assistant with web search capabilities.',
};
```

**Usage:**
```
User: "Search for the latest AI news"
Agent: *searches the web and provides current information*

User: "What's on example.com?"
Agent: *scrapes and summarizes the website content*
```

### Remote API Integration
This example shows how to connect an agent to a remote API server using the SSE protocol.

```typescript
export const character: Character = {
  name: 'APIAgent',
  plugins: ['@elizaos/plugin-sql', '@elizaos/plugin-mcp', '@elizaos/plugin-bootstrap'],
  settings: {
    mcp: {
      servers: {
        myApiServer: {
          type: 'sse',
          url: 'https://your-api-server.com/sse',
        },
      },
    },
  },
  system: 'You are a helpful assistant with API access capabilities.',
};
```

**Usage:**
```
User: "Get the latest data from the API"
Agent: *fetches and returns real-time data*

User: "Execute the custom tool"
Agent: *runs the tool provided by the SSE server*
```

### Complete Configuration with Multiple Servers
This example demonstrates a complete character configuration with both STDIO and SSE server types.

```typescript
import { type Character } from '@elizaos/core';

export const character: Character = {
  name: 'Eliza',
  plugins: [
    '@elizaos/plugin-sql',
    ...(process.env.ANTHROPIC_API_KEY ? ['@elizaos/plugin-anthropic'] : []),
    ...(process.env.OPENAI_API_KEY ? ['@elizaos/plugin-openai'] : []),
    '@elizaos/plugin-bootstrap',
    '@elizaos/plugin-mcp',
  ],
  settings: {
    mcp: {
      servers: {
        // STDIO server example - runs locally
        firecrawl: {
          type: 'stdio',
          command: 'npx',
          args: ['-y', 'firecrawl-mcp'],
          env: {},
        },
        // SSE server example - connects to remote API
        customApi: {
          type: 'sse',
          url: 'https://your-api.com/sse',
        },
      },
    },
  },
  system: 'You are a helpful assistant with access to web search and API tools.',
  bio: [
    'Can search the web for information',
    'Can connect to external APIs',
    'Provides helpful responses',
  ],
};
```

## Troubleshooting Guide

### Server Connection Issues
**Symptoms:** Agent cannot connect to MCP server, tools are not available.

**Solutions:**
- Verify that the command/URL in the server configuration is correct
- Ensure the MCP server process is running and accessible
- Check that the `@elizaos/plugin-mcp` is included in the agent's plugins array
- Verify network connectivity and firewall settings
- Check server logs for error messages

### Permission Errors
**Symptoms:** Agent receives permission denied errors when attempting to use tools.

**Solutions:**
- For STDIO servers, ensure the command can be executed with current user permissions
- Verify that environment variables containing API keys are properly set
- Check that the agent has the necessary permissions in the access control policies
- Validate authentication credentials and tokens

### Configuration Problems
**Symptoms:** Server fails to start or tools are not recognized.

**Solutions:**
- Validate JSON syntax in configuration files
- Ensure all required fields are present in the server configuration
- Verify that package names and commands are correct
- Check that dependencies are properly installed
- Review environment variable names and values

### Performance Issues
**Symptoms:** Slow response times or timeouts when using MCP servers.

**Solutions:**
- Implement caching where appropriate, as shown in the agent_dynamic_context.js configuration
- Optimize network connectivity between agent and server
- Monitor server resource usage and scale as needed
- Consider using local servers (STDIO) instead of remote ones (SSE/HTTP) for frequently used tools
- Implement timeout handling in agent code
- Use the Universal MCP Router for efficient request routing and load balancing

**Section sources**
- [MCP Setup Guide.md](file://elizaos/Guides/MCP Setup Guide.md)
- [universal_mcp_architecture.md](file://371-os/docs/architecture/universal_mcp_architecture.md) - *Updated in recent commit*