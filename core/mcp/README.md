# 371 OS Model Context Protocol (MCP) Configuration

*Comprehensive MCP server configuration for enhanced AI assistant capabilities and project documentation access.*

[![MCP](https://img.shields.io/badge/MCP-Model_Context_Protocol-blue.svg)](https://modelcontextprotocol.io/)
[![Servers](https://img.shields.io/badge/Servers-2_Active-green.svg)](./)
[![Documentation](https://img.shields.io/badge/Documentation-Integrated-purple.svg)](./documentation-mcp-server.js)

## 🌟 Overview

This directory contains Model Context Protocol server configurations that enhance AI assistant capabilities by providing real-time access to:

- **📚 Project Documentation**: Comprehensive searchable access to all 371 OS documentation
- **🧠 Cognitive State**: Real-time cognitive awareness and state management
- **🔍 Smart Search**: Intelligent document search with relevance scoring
- **📊 Metadata**: Rich document metadata and categorization

## 🚀 Available MCP Servers

### 1. Documentation MCP Server (Port 39301)

**Purpose**: Provides comprehensive access to project documentation through MCP

**Features**:
- 📋 **Document Index**: Complete catalog of all project documentation
- 🔍 **Smart Search**: Intelligent search across all documentation with relevance scoring
- 📄 **Document Retrieval**: Full content access with metadata
- 🏷️ **Categorization**: Documents organized by section and category
- ⚡ **Fast Access**: Cached content for rapid retrieval

**Endpoints**:
- `GET /health` - Health check and status
- `GET /model_context_protocol/2024-11-05/documentation` - Complete documentation index
- `GET /model_context_protocol/2024-11-05/search?q=<query>` - Search documentation
- `GET /model_context_protocol/2024-11-05/retrieve?path=<file_path>` - Retrieve specific document

### 2. Cognition Layer MCP Server (Port 39300)

**Purpose**: Provides real-time cognitive state awareness and management

**Features**:
- 🧠 **Cognitive Modes**: Executive, Technical, Creative mode transitions
- 📊 **State Monitoring**: Real-time cognitive load and focus metrics
- 🤖 **Agent Activity**: Active agent coordination and status
- 📡 **SSE Streaming**: Server-Sent Events for real-time updates

## 🛠️ Configuration Files

### Primary Configuration

#### [`qoder-mcp-config.json`](./qoder-mcp-config.json) - Complete MCP Setup
```json
{
  "mcpServers": {
    "documentation": {
      "command": "node",
      "args": ["f:/os-main/mcp/documentation-mcp-server.js"],
      "env": {
        "MCP_SERVER_URL": "http://localhost:39301/model_context_protocol/2024-11-05/documentation",
        "PROJECT_ROOT": "f:/os-main"
      }
    },
    "cognition": {
      "command": "node", 
      "args": ["f:/os-main/mcp/mock-cognition-server.js"],
      "env": {
        "MCP_SERVER_URL": "http://localhost:39300/model_context_protocol/2024-11-05/sse"
      }
    }
  }
}
```

#### [`cognition-layer-mcp.json`](./cognition-layer-mcp.json) - Legacy Cognition Only
```json
{
  "mcpServers": {
    "cognition": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-http"],
      "env": {
        "MCP_SERVER_URL": "http://localhost:39300/model_context_protocol/2024-11-05/sse"
      }
    }
  }
}
```

## ⚡ Quick Start

### 1. Start Documentation MCP Server
```bash
# Terminal 1: Start documentation server
node f:/os-main/mcp/documentation-mcp-server.js
```

### 2. Start Cognition MCP Server  
```bash
# Terminal 2: Start cognition server
node f:/os-main/mcp/mock-cognition-server.js
```

### 3. Test Both Servers
```bash
# Test documentation server
node f:/os-main/mcp/test-documentation-mcp.js

# Test cognition server
node f:/os-main/mcp/connect-cognition-mcp.js
```

### 4. Configure Qoder IDE
Use the [`qoder-mcp-config.json`](./qoder-mcp-config.json) configuration in your Qoder IDE MCP settings.

## 📋 Testing

### Documentation MCP Testing

#### Configuration Test
Verify the documentation server configuration:
```bash
node test-documentation-mcp.js
```

#### Manual Testing
Test individual endpoints:
```bash
# Health check
curl http://localhost:39301/health

# Get documentation index
curl http://localhost:39301/model_context_protocol/2024-11-05/documentation

# Search documentation
curl "http://localhost:39301/model_context_protocol/2024-11-05/search?q=agent"

# Retrieve specific document
curl "http://localhost:39301/model_context_protocol/2024-11-05/retrieve?path=README.md"
```
### Cognition MCP Testing

#### Configuration Test
Verify the cognition layer configuration:
```bash
node test-cognition-mcp.js
```

#### Connection Test  
Test real-time SSE connection:
```bash
node connect-cognition-mcp.js
```

#### Manual Testing
```bash
# Health check
curl http://localhost:39300/health

# SSE connection (real-time cognitive updates)
curl -s http://localhost:39300/model_context_protocol/2024-11-05/sse
```

## 📚 Usage Guide

### For AI Assistants (Qoder Integration)

The documentation MCP server provides structured access to project knowledge:

1. **Search Documentation**: Find relevant information across all project docs
2. **Retrieve Specific Files**: Get complete file content with metadata
3. **Browse by Category**: Explore documentation by section (core, agents, development, etc.)
4. **Relevance Scoring**: Results ranked by relevance to query

### For Developers

The cognition MCP server enables cognitive-aware development:

1. **Cognitive Mode Awareness**: Understand current cognitive state (Executive/Technical/Creative)
2. **Real-time Updates**: Get live cognitive state changes via SSE
3. **Agent Coordination**: Monitor active agent status and coordination
4. **Performance Metrics**: Track cognitive load and focus levels

## 🔧 Advanced Configuration

### Custom Documentation Sources

To add additional documentation sources, edit the `DOCUMENTATION_STRUCTURE` in [`documentation-mcp-server.js`](./documentation-mcp-server.js):

```javascript
const DOCUMENTATION_STRUCTURE = {
  'custom': {
    'path/to/custom-doc.md': {
      title: 'Custom Documentation',
      description: 'Custom project documentation',
      category: 'custom',
      priority: 2,
      lastModified: null
    }
  }
};
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|----------|
| `PROJECT_ROOT` | Root directory for documentation | Current directory |
| `MCP_SERVER_URL` | MCP server endpoint URL | Auto-generated |
| `DOCUMENTATION_CACHE_TTL` | Cache time-to-live (seconds) | 3600 |
| `MAX_SEARCH_RESULTS` | Maximum search results | 10 |

## 🚪 Requirements

### System Requirements
- Node.js 18+ 
- Port 39300 available (cognition server)
- Port 39301 available (documentation server)
- Access to f:/os-main directory structure

### File Dependencies
- All documentation files in project structure
- Mock cognition server implementation
- Test scripts and configuration files

## 🔍 Troubleshooting

### Documentation Server Issues

**Server won't start**:
```bash
# Check if port is in use
netstat -an | grep 39301

# Check file permissions
ls -la f:/os-main/mcp/documentation-mcp-server.js
```

**Documents not loading**:
```bash
# Verify file paths exist
ls -la f:/os-main/README.md
ls -la f:/os-main/questflow/agents/README.md

# Check console output for load errors
node f:/os-main/mcp/documentation-mcp-server.js
```

### Cognition Server Issues

**Connection failures**:
1. Verify the cognition layer service is running:
   ```bash
   curl http://localhost:39300/model_context_protocol/2024-11-05/sse
   ```

2. Check that no firewall is blocking the connection

3. Ensure the correct URL is being used in the configuration

**SSE stream issues**:
```bash
# Test with verbose output
curl -v http://localhost:39300/model_context_protocol/2024-11-05/sse

# Check server logs for errors
node f:/os-main/mcp/mock-cognition-server.js
```

### General MCP Issues

**Qoder IDE not detecting servers**:
1. Verify MCP configuration file path
2. Restart Qoder IDE after configuration changes
3. Check IDE console for MCP connection errors
4. Ensure both servers are running before starting IDE

## 📈 Performance Optimization

### Caching Strategy
- Documentation content is cached in memory on server start
- File modification times tracked for cache invalidation
- Search results computed on-demand with relevance scoring

### Scaling Considerations
- Documentation server can handle multiple concurrent connections
- Cognition server uses SSE for efficient real-time updates
- Both servers designed for low latency and high throughput

## 🔗 Integration Examples

### Qoder IDE Integration
```json
{
  "mcp": {
    "configFile": "f:/os-main/mcp/qoder-mcp-config.json",
    "autoStart": true,
    "timeout": 30000
  }
}
```

### Custom Client Integration
```javascript
// Example: Search documentation
fetch('http://localhost:39301/model_context_protocol/2024-11-05/search?q=deployment')
  .then(response => response.json())
  .then(data => {
    console.log(`Found ${data.totalResults} results:`);
    data.results.forEach(result => {
      console.log(`- ${result.title}: ${result.description}`);
    });
  });

// Example: Monitor cognitive state
const eventSource = new EventSource('http://localhost:39300/model_context_protocol/2024-11-05/sse');
eventSource.onmessage = (event) => {
  const cognitiveState = JSON.parse(event.data);
  console.log(`Cognitive mode: ${cognitiveState.mode}`);
  console.log(`Focus level: ${cognitiveState.focus_level}%`);
};
```

---

## 🎆 Success Metrics

Once configured properly, you should see:

- ✅ **Documentation Server**: Comprehensive searchable access to all project docs
- ✅ **Cognition Server**: Real-time cognitive state streaming
- ✅ **Qoder Integration**: Enhanced AI assistant capabilities
- ✅ **Search Functionality**: Intelligent document discovery
- ✅ **Performance**: Sub-100ms response times for most operations

**This MCP configuration transforms Qoder into a context-aware development assistant with full project knowledge!** 🤖✨