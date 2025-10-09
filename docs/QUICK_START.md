# Quick Start Guide - 371-OS Agents

## 🚀 Immediate Setup

### Prerequisites
- **Bun runtime** (50x faster than npm)
- **Windows PowerShell** with ExecutionPolicy Bypass
- **Git configured** with user.name and user.email

### 1-Minute Quick Start
```bash
# Clone and enter workspace
cd f:/os-main/core/os-workspace

# Lightning-fast dependency installation
bun install

# Start Chief of Staff agent (MCP coordination hub)
bun nx serve chief-of-staff-agent
```

## 🎯 Use Case Workflows

### Code Development
```bash
# Start CTO agent for technical architecture
bun nx serve cto-agent

# Start development environment with hot reloading
bun run start:dev

# Build affected projects only (massive time savings)
bun nx affected --target=build
```

### Documentation & Knowledge Management
```bash
# Start documentation MCP server
node core/mcp/documentation-mcp-server.js

# Access knowledge through Chief of Staff
bun nx serve chief-of-staff-agent

# Generate and format documentation
bunx @biomejs/biome format --write .
```

### Creative Development
```bash
# Start cognitive interface with adaptive UI
bun nx serve cognitive-interface

# Enable cognitive state detection
bun nx serve cognitive-engine

# Creative mode coordination
bun nx serve chief-of-staff-agent --mode=creative
```

### Prompts & Agent Management
```bash
# Start agent factory for dynamic creation
bun nx serve agent-factory

# Manage agent definitions (stored in YAML)
# Location: libs/prompts/agent-definitions/

# Test agent startup
bun run start:test-agent
```

### Cleanup & Refactoring (371 Minds Repos)
```bash
# Start CTO agent for code analysis
bun nx serve cto-agent

# Run comprehensive linting with Biome
bunx @biomejs/biome check --write .

# Analyze affected dependencies
bun nx graph --affected
```

## 🤖 Agent Quick Reference

| Agent | Command | Primary Role |
|-------|---------|--------------|
| **Chief of Staff** | `bun nx serve chief-of-staff-agent` | MCP coordination hub |
| **CEO Mimi** | `bun nx serve ceo-agent` | Strategic decisions |
| **CTO Zara** | `bun nx serve cto-agent` | Technical architecture |
| **CFO Maya** | `bun nx serve cfo-agent` | Financial optimization |
| **Cognitive Interface** | `bun nx serve cognitive-interface` | Adaptive UI system |

## 🔗 MCP Integration Points

### Chief of Staff as Coordination Hub
- **Endpoint**: `mcp://chief-of-staff`
- **External Clients**: Genspark, Perplexity, Comet Browser, Abacus.ai
- **High-level Cognition Access**: Real-time cognitive state coordination

### Quick MCP Server Status
```bash
# Check MCP server health
node core/mcp/test-mcp-connection.js

# Restart MCP servers
powershell -ExecutionPolicy Bypass -File core/mcp/restart-mcp-servers.ps1
```

## ⚡ Performance Shortcuts

```bash
# Instant system health check
node AB/scripts/quick-status.js

# Fast dependency recovery (if issues)
powershell -ExecutionPolicy Bypass -File AB/scripts/bun-install.ps1

# Deploy to Akash (97.6% cost reduction)
bun run deploy:akash
```

## 🆘 Troubleshooting Quick Fixes

| Issue | Solution |
|-------|----------|
| npm hanging | Use `bun install` instead |
| Build failures | Run `bun nx affected --target=build` |
| MCP connection | Check `core/mcp/test-mcp-connection.js` |
| Agent startup | Verify brain files in `libs/prompts/agent-definitions/` |

---

**💡 Pro Tip**: Always start with `bun nx serve chief-of-staff-agent` for coordinated access to all system capabilities!