# Universal MCP Architecture for 371OS

## 🎯 Overview

The Universal Model Context Protocol (MCP) Architecture is a revolutionary approach to agent coordination and tool integration in the 371OS ecosystem. Unlike traditional MCP implementations that are platform-specific, the Universal MCP provides a cross-platform, blockchain-coordinated framework for agent communication and tool access.

## 🏗️ Architecture Overview

```
371OS Agents → Universal MCP Router → Platform-Specific MCP Adapters
                                    ├── Wavebox MCP (Cross-platform)
                                    ├── GitHub MCP (Cross-platform)
                                    ├── Pieces MCP (Cross-platform)
                                    ├── Custom Agent MCP (Cross-platform)
                                    └── MongoDB MCP (Cross-platform)
```

## 🔧 Core Principles

### 1. **Cross-Platform Compatibility**
- All MCP servers must be platform-agnostic
- Windows-specific automation (like AppleScript) is prohibited
- Use cross-platform alternatives: PowerShell, URL schemes, Extension APIs

### 2. **Stateless Design**
- MCP servers are stateless by design
- All state is managed through the blockchain registry
- Session persistence is handled by the Universal Tool Server

### 3. **Blockchain Coordination**
- Agent discovery through decentralized registry
- Trust established through cryptographic verification
- Economic incentives through stake-based reputation system

## 📦 MCP Server Structure

All MCP servers in 371OS follow a standardized structure:

```
packages/elizaos-plugins/{mcp-name}/
├── src/
│   ├── plugin.ts          # Main plugin definition
│   ├── actions.ts         # Agent actions
│   ├── provider.ts        # Context provider
│   ├── evaluator.ts       # Quality assessment
│   ├── types.ts           # Type definitions
│   └── index.ts           # Exports
├── package.json           # Package configuration
├── project.json           # Nx workspace configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Documentation
```

## 🚀 Universal MCP Router

The central component that routes requests between agents and MCP servers:

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

## 🌐 Cross-Platform MCP Development Standards

### 1. **Platform Compatibility Requirements**
- ✅ Must work on Windows, macOS, and Linux
- ✅ No platform-specific automation (no AppleScript, no Windows-specific COM objects)
- ✅ Use cross-platform Node.js APIs
- ✅ PowerShell scripts must include ExecutionPolicy handling

### 2. **Windows-Specific Guidelines**
```powershell
# All PowerShell scripts must handle ExecutionPolicy
# Run with: PowerShell -ExecutionPolicy Bypass -File script.ps1

# Example cross-platform approach
param(
    [string]$Action,
    [string]$Parameter
)

switch ($Action) {
    "open" {
        # Use URL schemes instead of platform-specific automation
        Start-Process "app://open?param=$Parameter"
    }
}
```

### 3. **TypeScript Implementation Standards**
```typescript
// Follow 371OS TypeScript standards
import { Action, IAgentRuntime, Memory, State, ActionResult } from '@elizaos/core';

export const crossPlatformAction: Action = {
  name: 'CROSS_PLATFORM_ACTION',
  description: 'Example cross-platform MCP action',
  handler: async (runtime: IAgentRuntime, message: Memory, state?: State): Promise<ActionResult> => {
    // Implementation that works across all platforms
    return { success: true, data: {} };
  }
};
```

## 📚 Existing MCP Servers

### 1. **Wavebox MCP**
- **Cross-platform**: ✅ Windows, macOS, Linux
- **Features**: URL control, profile management, session handling
- **Automation**: PowerShell scripts, URL schemes
- **Documentation**: [wavebox-universal-mcp-windows.md](../../../AB/sessions/abideas/wavebox-universal-mcp-windows.md)

### 2. **GitHub MCP**
- **Cross-platform**: ✅ Windows, macOS, Linux
- **Features**: Repository management, issue tracking, code review
- **Automation**: GitHub API integration
- **Documentation**: [github-mcp.md](../../mcp_servers/github-mcp.md)

### 3. **Custom Agent MCP**
- **Cross-platform**: ✅ Windows, macOS, Linux
- **Features**: Custom agent communication, workflow coordination
- **Automation**: REST API, WebSocket connections
- **Documentation**: [custom_agent_mcp.md](../../mcp_servers/custom_agent_mcp.md)

### 4. **Local File MCP**
- **Cross-platform**: ✅ Windows, macOS, Linux
- **Features**: File system operations, document management
- **Automation**: Node.js fs module
- **Documentation**: [local_file_mcp.md](../../mcp_servers/local_file_mcp.md)

## 🔧 Implementation Guidelines

### 1. **Creating New MCP Servers**
1. Follow the standard MCP server structure
2. Ensure cross-platform compatibility
3. Implement proper error handling
4. Document platform-specific considerations
5. Test on all supported platforms

### 2. **Integration with 371OS Agents**
```typescript
// Example agent configuration with MCP integration
const agentConfig = {
  name: 'TestAgent',
  plugins: [
    WaveboxMCPPlugin,    // Cross-platform Wavebox integration
    GithubMCPPlugin,     // Cross-platform GitHub integration
    CustomAgentMCPPlugin // Custom agent coordination
  ]
};
```

### 3. **Error Handling and Fallbacks**
```typescript
// Robust error handling for cross-platform compatibility
try {
  // Attempt primary automation method
  await executePrimaryMethod();
} catch (error) {
  // Fallback to alternative method
  await executeFallbackMethod();
}
```

## 🛡️ Security Considerations

### 1. **Zero-Trust Architecture**
- No hardcoded credentials in MCP servers
- All authentication through Secretless Broker
- Cryptographic verification of all interactions

### 2. **Platform-Specific Security**
- **Windows**: Proper PowerShell execution policy handling
- **All Platforms**: Secure storage of sensitive data
- **Network**: Encrypted communication between components

## 📈 Performance Optimization

### 1. **Cross-Platform Performance**
- Minimize platform-specific operations
- Use asynchronous operations to prevent blocking
- Cache results where appropriate
- Optimize resource usage

### 2. **Scalability**
- Stateless design enables horizontal scaling
- Load balancing through Universal MCP Router
- Efficient resource utilization

## 📚 Documentation Standards

All MCP servers must include comprehensive documentation:
- Platform compatibility notes
- Setup and configuration instructions
- Usage examples
- Troubleshooting guide
- Cross-platform considerations

## 🔄 Future Enhancements

### 1. **Enhanced Cross-Platform Support**
- Additional platform-specific adapters
- Improved automation methods
- Better error handling and recovery

### 2. **Advanced Coordination Features**
- Machine learning-based routing
- Predictive automation
- Enhanced security protocols

## 📞 Support and Maintenance

### 1. **Cross-Platform Testing**
- Regular testing on all supported platforms
- Automated testing pipelines
- Community feedback integration

### 2. **Version Compatibility**
- Semantic versioning for all MCP servers
- Backward compatibility guarantees
- Clear migration paths

This Universal MCP Architecture ensures that 371OS can provide consistent, reliable agent coordination and tool integration across all platforms while maintaining the revolutionary cost optimization and blockchain-based trust model that makes 371OS unique.