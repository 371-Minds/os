# Reference Tools MCP

<cite>
**Referenced Files in This Document**   
- [ref-tools-mcp.md](file://371-os\src\minds371\mcp_servers\ref-tools-mcp.md) - *Updated in recent commit*
- [universal_mcp_architecture.md](file://371-os\docs\architecture\universal_mcp_architecture.md) - *Added comprehensive Universal MCP documentation*
- [types.ts](file://packages\elizaos-plugins\universal-tool-server\src\types.ts) - *Updated with blockchain registry types*
- [blockchain-registry.ts](file://packages\elizaos-plugins\universal-tool-server\src\blockchain-registry.ts) - *Added in recent implementation*
- [actions.ts](file://packages\elizaos-plugins\universal-tool-server\src\actions.ts) - *Updated with discovery functionality*
</cite>

## Update Summary
**Changes Made**   
- Updated Introduction to reflect Universal MCP Architecture
- Added new section on Blockchain Coordination and Agent Discovery
- Enhanced Integration with Universal Tool Server section with discovery patterns
- Updated Security and Authentication Model with blockchain-based trust
- Added Tool Provenance and Economic Coordination details
- Refreshed Agent Utilization Examples with discovery patterns

## Table of Contents
1. [Introduction](#introduction)
2. [Configuration and Setup](#configuration-and-setup)
3. [Key Features](#key-features)
4. [Integration with Universal Tool Server](#integration-with-universal-tool-server)
5. [Blockchain Coordination and Agent Discovery](#blockchain-coordination-and-agent-discovery)
6. [Security and Authentication Model](#security-and-authentication-model)
7. [Tool Registration and Capability Management](#tool-registration-and-capability-management)
8. [Request and Response Patterns](#request-and-response-patterns)
9. [Agent Utilization Examples](#agent-utilization-examples)
10. [Extending the Reference Tools Ecosystem](#extending-the-reference-tools-ecosystem)

## Introduction

The Reference Tools MCP (Model Context Protocol) server enables autonomous agents within the 371 OS ecosystem to securely access and utilize shared reference tools, libraries, and utility functions through standardized invocation interfaces. This implementation serves as a centralized gateway for agents to retrieve up-to-date documentation, code examples, and technical specifications from thousands of public and private sources. The server operates as part of the broader Universal MCP architecture, which functions as the nervous system connecting various components of the agent network.

The Reference Tools MCP eliminates hallucinations by providing agents with verified, current information while reducing token usage through intelligent content filtering. It supports both public documentation access and secure private repository integration, making it a strategic asset for agent management and knowledge consistency across the platform. The integration with blockchain-based coordination enables decentralized discovery and trust verification of reference tools.

**Section sources**
- [ref-tools-mcp.md](file://371-os\src\minds371\mcp_servers\ref-tools-mcp.md#L0-L31)
- [universal_mcp_architecture.md](file://371-os\docs\architecture\universal_mcp_architecture.md#L0-L50)

## Configuration and Setup

The Reference Tools MCP is configured using a standard MCP server definition format that specifies the execution command, arguments, and environment variables required for operation. The configuration follows the Model Context Protocol specification, enabling interoperability with the ElizaOS agent framework.

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

This configuration defines an STDIO-based server that executes the `ref-tools-mcp` package via npx. The server requires an API key to authenticate requests to protected documentation sources. Agents integrate with this server by including the MCP plugin in their configuration and registering the server endpoint in their settings. The setup process aligns with the standard MCP integration pattern used across the ecosystem, ensuring consistency in tool access patterns.

**Section sources**
- [ref-tools-mcp.md](file://371-os\src\minds371\mcp_servers\ref-tools-mcp.md#L0-L31)

## Key Features

The Reference Tools MCP provides several advanced capabilities that enhance agent performance and reliability:

**Smart Documentation Chunking**: Returns only relevant tokens and content segments instead of entire documentation pages, optimizing token usage and response relevance.

**Code Tab Awareness**: Loads all code examples from documentation sites, not just curl commands, enabling agents to access implementation details across multiple programming languages and frameworks.

**Deep Link Generation**: Provides specific page locations and anchors for verification, allowing agents to cite precise sources and enabling users to validate information.

**Fast Performance**: Maintains a P95 latency of 1.7 seconds, ensuring responsive interactions even during complex research tasks.

**Comprehensive Coverage**: Accesses thousands of technical documentation sites and public GitHub repositories, creating a broad knowledge base for agent queries.

These features collectively address common limitations in AI agent systems, particularly hallucination risks and inefficient token consumption during research operations.

**Section sources**
- [ref-tools-mcp.md](file://371-os\src\minds371\mcp_servers\ref-tools-mcp.md#L5-L15)

## Integration with Universal Tool Server

The Reference Tools MCP integrates with the Universal Tool Server (UTS) architecture, which represents the next generation of tool access beyond traditional MCP limitations. This integration enables enhanced capabilities through blockchain-based registry and reputation tracking.

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

The UTS architecture addresses MCP's stateful nature and scalability limitations by implementing a decentralized model for tool discovery and execution. The Reference Tools MCP registers its capabilities in the blockchain registry, allowing agents to discover and verify tools through cryptographic proofs. This integration enables cross-platform operation across browser extensions, IDE plugins, and messaging platforms with consistent security policies.

**Diagram sources**
- [types.ts](file://packages\elizaos-plugins\universal-tool-server\src\types.ts#L10-L30)

**Section sources**
- [types.ts](file://packages\elizaos-plugins\universal-tool-server\src\types.ts#L0-L63)
- [universal_mcp_architecture.md](file://371-os\docs\architecture\universal_mcp_architecture.md#L100-L150)

## Blockchain Coordination and Agent Discovery

The Reference Tools MCP leverages blockchain-based coordination for decentralized agent discovery and trust verification. The Universal MCP Router enables agents to discover reference tools through the blockchain registry using capability-based search criteria.

```typescript
export const discoverUniversalToolsAction: Action = {
  name: 'DISCOVER_UNIVERSAL_TOOLS',
  description: 'Discover tools from blockchain-based Universal Tool Server registry',
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    options: any,
    callback?: HandlerCallback
  ): Promise<boolean> => {
    try {
      const registryProvider = new BlockchainRegistryProvider();
      
      const searchCriteria = {
        capabilities: message.content.requirements,
        minReputation: options.minReputation || 0.7,
        maxCost: options.maxCost || 1.0,
        preferredProviders: options.preferredProviders || [],
        excludedProviders: options.excludedProviders || []
      };
      
      const availableTools = await registryProvider.discoverTools(searchCriteria);
      
      // Rank by reputation, cost, and availability
      const rankedTools = availableTools.sort((a, b) => {
        const scoreA = (a.reputation.overall * 0.4) + 
                      ((1 - a.economicTerms.basePrice) * 0.3) +
                      (a.deploymentInfo.platforms.length * 0.3);
        const scoreB = (b.reputation.overall * 0.4) + 
                      ((1 - b.economicTerms.basePrice) * 0.3) +
                      (b.deploymentInfo.platforms.length * 0.3);
        return scoreB - scoreA;
      });
      
      if (callback) {
        callback({
          text: `Discovered ${rankedTools.length} compatible tools from decentralized registry`,
          content: {
            tools: rankedTools.slice(0, 10),
            searchCriteria,
            totalFound: rankedTools.length,
            recommendation: rankedTools[0] ? {
              agentId: rankedTools[0].agentId,
              reputation: rankedTools[0].reputation.overall,
              estimatedCost: rankedTools[0].economicTerms.basePrice,
              platforms: rankedTools[0].deploymentInfo.platforms.map(p => p.platform)
            } : null
          }
        });
      }
      
      return true;
    } catch (error) {
      console.error('Failed to discover universal tools:', error);
      return false;
    }
  }
};
```

This discovery mechanism enables agents to find the most suitable reference tools based on reputation scores, economic terms, and platform compatibility. The blockchain registry maintains verifiable credentials and reputation history for all registered tools, ensuring trust and accountability in the ecosystem.

**Section sources**
- [blockchain-registry.ts](file://packages\elizaos-plugins\universal-tool-server\src\blockchain-registry.ts#L101-L139)
- [actions.ts](file://packages\elizaos-plugins\universal-tool-server\src\actions.ts#L91-L132)
- [universal_mcp_architecture.md](file://371-os\docs\architecture\universal_mcp_architecture.md#L200-L240)

## Security and Authentication Model

The Reference Tools MCP implements a multi-layered security model that ensures safe and authorized access to documentation resources. The system follows the principle of least privilege, where agents receive only the permissions necessary for their designated tasks.

Authentication is managed through API keys stored in environment variables, preventing credential leakage in configuration files. The security model includes input sanitization to prevent injection attacks and sandboxed execution to isolate tool operations from the core agent environment.

For enterprise deployments, the system supports integration with the blockchain-based agent registry, where each agent's capabilities and permissions are cryptographically verified. This approach enables privilege escalation controls based on verifiable credentials and reputation scores, ensuring that only trusted agents can access sensitive documentation repositories. The cryptographic identity system supports zero-knowledge proofs and delegated OAuth for flexible authentication methods.

**Section sources**
- [ref-tools-mcp.md](file://371-os\src\minds371\mcp_servers\ref-tools-mcp.md#L0-L31)
- [types.ts](file://packages\elizaos-plugins\universal-tool-server\src\types.ts#L35-L63)
- [universal_mcp_architecture.md](file://371-os\docs\architecture\universal_mcp_architecture.md#L150-L180)

## Tool Registration and Capability Management

The Reference Tools MCP follows a structured approach to tool registration and capability management, allowing for dynamic discovery and version control of available utilities. Each tool is registered with a descriptive schema that includes input parameters, output formats, and cost models.

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

This registration pattern enables dependency resolution by mapping tool requirements to available implementations. The system maintains version histories and compatibility matrices, ensuring that agents can access appropriate tool versions based on their configuration and security requirements. The blockchain registry stores verifiable credentials and deployment information for each registered tool.

**Section sources**
- [universal_mcp_architecture.md](file://371-os\docs\architecture\universal_mcp_architecture.md#L50-L100)
- [types.ts](file://packages\elizaos-plugins\universal-tool-server\src\types.ts#L65-L100)

## Request and Response Patterns

The Reference Tools MCP follows standardized request and response patterns that ensure consistency across different agent implementations. When an agent requires documentation or reference material, it sends a structured tool call containing parameters, authentication credentials, and contextual information.

The server processes these requests through a routing logic that validates parameters, checks permissions, and selects the appropriate data source. Response handling includes provenance tracking, cost calculation, and error recovery mechanisms. Successful responses contain the requested information along with metadata about the source and retrieval process.

This pattern enables reliable integration with various agent types, from financial analysis agents requiring compliance documentation to technical agents needing API specifications. The structured format also facilitates logging and auditing of tool usage across the agent network.

**Section sources**
- [types.ts](file://packages\elizaos-plugins\universal-tool-server\src\types.ts#L10-L30)
- [universal_mcp_architecture.md](file://371-os\docs\architecture\universal_mcp_architecture.md#L180-L200)

## Agent Utilization Examples

Multiple agent types leverage the Reference Tools MCP for specialized operations:

**Financial Agent**: Uses the server to retrieve up-to-date regulatory compliance requirements and financial reporting standards when generating audit reports or compliance documentation. The agent discovers tools through the blockchain registry, prioritizing those with high reputation scores in financial compliance.

**Credential Warehouse Agent**: Accesses technical specifications and security protocols to validate credential formats and encryption standards across different systems. The agent uses capability-based discovery to find tools with verifiable credentials in security domains.

**Technical Agents**: Retrieve API documentation, code examples, and architecture patterns when generating implementation code or troubleshooting integration issues. The discovery process considers platform compatibility and economic terms.

**Business Agents**: Access market research data, industry standards, and competitive analysis materials to support strategic decision-making processes. The agent leverages the decentralized registry to find trusted sources with proven expertise.

These use cases demonstrate how the Reference Tools MCP serves as a foundational utility that enhances the accuracy and reliability of various agent functions across the ecosystem.

**Section sources**
- [ref-tools-mcp.md](file://371-os\src\minds371\mcp_servers\ref-tools-mcp.md#L5-L15)
- [types.ts](file://packages\elizaos-plugins\universal-tool-server\src\types.ts#L35-L63)
- [blockchain-registry.ts](file://packages\elizaos-plugins\universal-tool-server\src\blockchain-registry.ts#L101-L139)

## Extending the Reference Tools Ecosystem

The Reference Tools MCP architecture supports extension through custom utility development and integration with private documentation repositories. Developers can create new tools by implementing the MCP server interface and registering them in the configuration.

To extend the ecosystem, developers can:
1. Create custom tool implementations for specialized documentation sources
2. Integrate with private knowledge bases using secure authentication
3. Develop domain-specific parsers for proprietary documentation formats
4. Implement caching strategies to improve performance for frequently accessed content
5. Register tools in the blockchain registry with verifiable credentials and reputation metrics

The Universal Tool Server integration provides a framework for publishing and discovering these custom utilities through the blockchain registry, enabling a decentralized marketplace of reference tools that can be securely accessed by authorized agents.

**Section sources**
- [universal_mcp_architecture.md](file://371-os\docs\architecture\universal_mcp_architecture.md#L200-L240)
- [types.ts](file://packages\elizaos-plugins\universal-tool-server\src\types.ts#L0-L63)
- [blockchain-registry.ts](file://packages\elizaos-plugins\universal-tool-server\src\blockchain-registry.ts#L101-L139)