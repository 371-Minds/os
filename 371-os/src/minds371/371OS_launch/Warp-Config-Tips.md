# Warp Configuration Optimization Tips & Tricks

## .warpindexingignore Configuration

Create `.warpindexingignore` in your project root to optimize codebase indexing:

```gitignore
# Large dependencies that don't need AI context
node_modules/
.next/
dist/
build/
.vscode/
.git/

# Generated files
*.log
*.cache
coverage/
.nyc_output/

# Large data files
*.csv
*.json.bak
*.sqlite
*.db

# Sensitive files (never index)
.env*
*.key
*.pem
secrets/

# Akash-specific files to exclude
*.lease
deployment-logs/
provider-cache/

# ElizaOS generated files
character-cache/
conversation-logs/
agent-memory/

# Large prompt files (index selectively)
prompts/archive/
templates/old-versions/

# Include specific files despite patterns
!important-config.json
!critical-prompts/
```

## Warp Agent Training Optimization

### Context Hierarchy (Most Important First)
1. **Active Rules** - Your 371 OS development guidelines
2. **Current Project Context** - The specific app you're working on
3. **Warp Drive Workflows** - Your saved deployment scripts
4. **Codebase Context** - Relevant code from indexed repositories
5. **General Documentation** - Framework docs and references

### Agent Memory Management
```bash
# Clear agent memory when context becomes stale
warp-agent clear-memory @akash --older-than 7d
warp-agent clear-memory @eliza --conversations-only

# Optimize context windows
warp-agent optimize @github --focus deployment-scripts
warp-agent optimize @status --focus community-management
```

## SSH Configuration for Multi-Environment Development

### SSH Config for Akash Providers
```bash
# ~/.ssh/config additions for 371 OS

# Akash provider connections
Host akash-provider-*
    User akash
    Port 22
    IdentityFile ~/.ssh/akash_deployment_key
    StrictHostKeyChecking no
    UserKnownHostsFile=/dev/null

# GitHub deployment keys
Host github-371minds
    HostName github.com
    User git
    IdentityFile ~/.ssh/371minds_deploy_key

# Status.app development server
Host status-dev
    HostName dev.status.app
    User status-dev
    Port 2222
    IdentityFile ~/.ssh/status_dev_key
```

### SSH Agent Setup for Warp
```bash
# Add to your shell configuration
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/akash_deployment_key
ssh-add ~/.ssh/371minds_deploy_key
ssh-add ~/.ssh/status_dev_key

# Auto-load in Warp
echo 'eval "$(ssh-agent -s)" && ssh-add -A' >> ~/.warprc
```

## MCP Server Configurations

### GitHub MCP Server Setup
```typescript
// mcp-servers/github-371minds.ts
import { McpServer } from '@modelcontextprotocol/sdk/server';

export const github371MindsServer = new McpServer({
  name: "github-371minds",
  version: "1.0.0"
}, {
  capabilities: {
    resources: {},
    tools: {},
    prompts: {}
  }
});

// Repository management tools
github371MindsServer.tool("sync-prompts", {
  description: "Sync prompts from bizbuilderprompts repository",
  inputSchema: {
    type: "object",
    properties: {
      branch: { type: "string", default: "main" },
      category: { type: "string" }
    }
  }
}, async (args) => {
  // Implementation for syncing GitHub prompts
  return await syncPromptsFromGitHub(args.branch, args.category);
});

// Workflow template management
github371MindsServer.tool("update-workflow", {
  description: "Update workflow template in repository", 
  inputSchema: {
    type: "object",
    properties: {
      name: { type: "string" },
      content: { type: "string" },
      app: { type: "string" }
    },
    required: ["name", "content"]
  }
}, async (args) => {
  return await updateWorkflowTemplate(args);
});
```

### Status.app MCP Server (Non-DeFi)
```typescript
// mcp-servers/status-community.ts
export const statusCommunityServer = new McpServer({
  name: "status-community",
  version: "1.0.0"
});

// Community management (no financial features)
statusCommunityServer.tool("create-community", {
  description: "Create new community space on Status network",
  inputSchema: {
    type: "object", 
    properties: {
      name: { type: "string" },
      description: { type: "string" },
      type: { type: "string", enum: ["public", "private"] },
      enableTokens: { type: "boolean", default: false } // Always false for non-DeFi
    }
  }
}, async (args) => {
  // Ensure no DeFi features are enabled
  if (args.enableTokens) {
    throw new Error("Token features not supported in non-DeFi communities");
  }
  return await createCommunitySpace({
    ...args,
    features: ["messaging", "channels", "moderation"], // No financial features
    economicModel: null // Explicitly no economic model
  });
});
```

## Performance Optimization Tips

### Warp Terminal Performance
```bash
# Optimize terminal performance for large projects
# Settings > Performance
export WARP_TERMINAL_BUFFER_SIZE=100000
export WARP_AGENT_TIMEOUT=30
export WARP_CODEBASE_INDEX_LIMIT=50MB

# Selective indexing for 371 OS projects
echo "apps/*/node_modules" >> .warpindexingignore
echo "deployments/*/logs" >> .warpindexingignore
echo "agents/*/conversation-history" >> .warpindexingignore
```

### Agent Response Optimization
```bash
# Configure agents for faster responses
warp-agent config @akash --response-time fast --accuracy balanced
warp-agent config @eliza --response-time medium --accuracy high
warp-agent config @github --response-time fast --accuracy medium
warp-agent config @status --response-time fast --accuracy balanced

# Set context limits for efficiency
warp-agent config @akash --max-context 4000
warp-agent config @eliza --max-context 8000  # Needs more for character development
warp-agent config @github --max-context 3000
warp-agent config @status --max-context 2000
```

## Environment-Specific Configurations

### Development Environment
```bash
# Development-specific environment variables
export DEVELOPMENT_MODE=true
export LOG_LEVEL=debug
export AKASH_NETWORK=testnet
export DISABLE_ANALYTICS=true
export FAST_DEPLOYMENT=true
```

### Production Environment  
```bash
# Production-specific environment variables
export DEVELOPMENT_MODE=false
export LOG_LEVEL=info
export AKASH_NETWORK=mainnet
export ENABLE_MONITORING=true
export BUDGET_ALERTS=true
export SECURITY_SCANNING=true
```

### Testing Environment
```bash
# Testing-specific configurations
export TESTING_MODE=true
export MOCK_PAYMENTS=true
export DISABLE_EXTERNAL_APIS=true
export USE_TEST_DATABASES=true
export AKASH_PROVIDER=local-testnet
```

## Troubleshooting Common Issues

### Agent Not Responding
```bash
# Check agent status
warp-agent status @akash
warp-agent logs @akash --tail 50

# Reset agent if needed
warp-agent restart @akash
warp-agent clear-cache @akash

# Re-train on updated context
warp-agent retrain @akash --context akash-docs --force
```

### Codebase Context Issues
```bash
# Force reindex of codebase
warp codebase reindex --force

# Check indexing status
warp codebase status

# Exclude problematic files
echo "problematic-file.js" >> .warpindexingignore
warp codebase reindex
```

### MCP Server Connection Issues
```bash
# Check MCP server status
warp mcp status github-371minds
warp mcp status status-community

# Restart MCP servers
warp mcp restart github-371minds
warp mcp logs status-community --tail 30

# Verify MCP server configuration
warp mcp test github-371minds --tool sync-prompts
```

### Budget and Cost Monitoring
```bash
# Real-time cost monitoring
warp-budget current-usage
warp-budget alerts --threshold 80

# Cost breakdown by service
warp-budget breakdown --period month
warp-budget top-spending --services

# Emergency cost controls
warp-budget emergency-stop --confirm
warp-budget switch-to-free-tier --services all
```

## Backup and Recovery

### Configuration Backup
```bash
# Backup Warp configuration
warp export-config --include-secrets ~/backups/warp-config-$(date +%Y%m%d).json

# Backup agent training data
warp-agent export @akash ~/backups/akash-agent-$(date +%Y%m%d).json
warp-agent export @eliza ~/backups/eliza-agent-$(date +%Y%m%d).json
warp-agent export @github ~/backups/github-agent-$(date +%Y%m%d).json
warp-agent export @status ~/backups/status-agent-$(date +%Y%m%d).json

# Backup Warp Drive contents
warp-drive export ~/backups/warp-drive-$(date +%Y%m%d).zip
```

### Disaster Recovery
```bash
# Restore from backup
warp import-config ~/backups/warp-config-latest.json
warp-agent import @akash ~/backups/akash-agent-latest.json

# Rebuild agent training if needed
warp-agent retrain @akash --docs akash-network --force
warp-agent retrain @eliza --docs elizaos-framework --force

# Restore Warp Drive
warp-drive import ~/backups/warp-drive-latest.zip --merge-conflicts auto
```

## Security Best Practices

### Secrets Management
```bash
# Never commit secrets to Git
echo "*.key" >> .gitignore
echo ".env*" >> .gitignore
echo "secrets/" >> .gitignore

# Use Warp environment variables for secrets
warp env set GITHUB_TOKEN "your_token_here" --encrypted
warp env set AKASH_WALLET_SEED "your_seed_phrase" --encrypted

# Rotate secrets regularly
warp env rotate GITHUB_TOKEN --generate-new --update-services
```

### Access Control
```bash
# Configure agent permissions carefully
warp-agent permissions @akash --allow deployment,scaling --deny deletion
warp-agent permissions @github --allow read,write --deny admin
warp-agent permissions @status --allow community-management --deny financial

# Regular security audits
warp security scan --agents all
warp security check-permissions --report
warp security update-policies --latest
```

This comprehensive configuration guide will ensure your Warp environment is optimized for maximum efficiency while maintaining security and cost-effectiveness for the 371 OS ecosystem.