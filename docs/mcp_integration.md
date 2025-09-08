# MCP Integration Documentation

## 🎯 Overview

This document provides cross-references to the Model Context Protocol (MCP) integration documentation within the 371OS project.

## 📚 Documentation References

### 1. **Universal MCP Architecture**
The core architecture documentation for the 371OS Universal MCP system:

- **Location**: [371-os/docs/architecture/universal_mcp_architecture.md](../371-os/docs/architecture/universal_mcp_architecture.md)
- **Description**: Comprehensive guide to the cross-platform MCP architecture that enables agent coordination across all operating systems

### 2. **Wavebox Integration (Windows-Compatible)**
Platform-specific implementation guide for integrating Wavebox with 371OS on Windows:

- **Location**: [AB/sessions/abideas/wavebox-universal-mcp-windows.md](../AB/sessions/abideas/wavebox-universal-mcp-windows.md)
- **Description**: Detailed implementation guide for Windows-compatible Wavebox automation and integration

### 3. **Platform-Specific MCP Servers**
Implementation guides for various MCP servers:

- **GitHub MCP**: [371-os/src/minds371/mcp_servers/github-mcp.md](../371-os/src/minds371/mcp_servers/github-mcp.md)
- **Custom Agent MCP**: [371-os/src/minds371/mcp_servers/custom_agent_mcp.md](../371-os/src/minds371/mcp_servers/custom_agent_mcp.md)
- **Local File MCP**: [371-os/src/minds371/mcp_servers/local_file_mcp.md](../371-os/src/minds371/mcp_servers/local_file_mcp.md)
- **Memory MCP**: [371-os/src/minds371/mcp_servers/memory_mcp.md](../371-os/src/minds371/mcp_servers/memory_mcp.md)

## 🏗️ Implementation Guidelines

### Cross-Platform Development Standards
All MCP implementations must follow the cross-platform development standards defined in:
- [Universal MCP Architecture](../371-os/docs/architecture/universal_mcp_architecture.md)

### Windows-Specific Considerations
For Windows implementations, refer to:
- [Wavebox Integration (Windows-Compatible)](../AB/sessions/abideas/wavebox-universal-mcp-windows.md)

## 🔄 Integration Patterns

### Universal MCP Router
The central component that routes requests between agents and MCP servers is documented in:
- [Universal MCP Architecture](../371-os/docs/architecture/universal_mcp_architecture.md)

### Platform-Specific Adapters
Each MCP server serves as a platform-specific adapter that abstracts platform differences:
- Cross-platform APIs are preferred over platform-specific automation
- PowerShell scripts for Windows should handle ExecutionPolicy properly
- URL schemes and extension APIs provide cross-platform automation capabilities

## 🛠️ Development Resources

### Creating New MCP Servers
Follow the standard MCP server structure documented in:
- [Universal MCP Architecture](../371-os/docs/architecture/universal_mcp_architecture.md)

### Testing Cross-Platform Compatibility
Ensure all MCP implementations are tested on:
- Windows
- macOS
- Linux

### Documentation Standards
All MCP servers must include:
- Platform compatibility notes
- Setup and configuration instructions
- Usage examples
- Troubleshooting guide
- Cross-platform considerations

## 📞 Support

For questions about MCP integration, refer to the specific documentation files or consult:
- [371OS Main Documentation](../README.md)
- [Implementation Guide](../IMPLEMENTATION_GUIDE.md)