# AGENTS.md

## Project Overview

This project, `371-os`, is a comprehensive OS for running a network of AI agents. It is structured as an Nx monorepo. The core logic, agent implementations, and various services are organized into `apps` and `packages` within the `core/os-workspace` directory.

## Build & Test

The primary commands for building and testing the workspace are:

### Installing Dependencies
To install all dependencies from the root of the workspace:
```bash
bun install
```

### Building
To build a specific application or the entire workspace:
```bash
# Build a single application
bun nx build <app-name>

# Build all affected projects
bun nx affected --target=build
```

### Testing
To run tests for a specific application or for all affected projects:
```bash
# Run tests for a single application
bun nx test <app-name>

# Run all affected tests
bun nx affected --target=test
```


## Running in Development

To serve an application in development mode with live reloading, use the `serve` command:
```bash
bun nx serve <app-name>
```

## Key Conventions

- **Package Manager**: This project uses `bun` for package management. Always use `bun` instead of `npm` or `yarn`.
- **Monorepo Management**: All workspace operations should be run through the Nx CLI (`bun nx ...`).
- **Directory Structure**:
  - New applications are added to `core/os-workspace/apps/`.
  - New sharable libraries/packages are added to `core/os-workspace/packages/`.
- **Branching**: All new features and bugfixes should be developed on separate feature branches before being merged into `main`.

## Workspace Structure

```
core/os-workspace/
├── apps/                    # Application packages
│   ├── agent-factory/       # Agent creation and management
│   ├── c-suite-agent-runner/ # C-Suite coordination system
│   ├── ceo-agent/           # CEO Mimi agent implementation
│   ├── cto-agent/           # CTO Zara agent implementation
│   ├── cfo-agent/           # CFO Maya agent implementation
│   ├── clo-agent/           # CLO Sage agent implementation
│   ├── cao-agent/           # CAO Eduardo agent implementation
│   ├── chief-of-staff-agent/ # Coordination and task management
│   ├── cognitive-interface/  # Cognitive-aware UI system
│   ├── intelligent-router/   # Adaptive LLM routing
│   ├── dao-governance-service/ # DAO management system
│   └── utility-agents/      # Supporting utility agents
├── packages/                # Shared libraries and plugins
│   ├── elizaos-plugins/     # ElizaOS plugin ecosystem
│   ├── cognitive-engine/    # Cognitive state detection
│   ├── business-intelligence/ # Analytics and BI tools
│   ├── nx-workspace/        # Self-aware workspace manipulation
│   └── thinng-testing/      # Mathematical state management
└── libs/prompts/agent-definitions/ # Agent "brains" (YAML files)
```

## Agent Development

### Agent Architecture
Each agent follows a unified **brain/body architecture**:
- **Brain**: Agent definitions stored as YAML files in `libs/prompts/agent-definitions/`
- **Body**: TypeScript/Node.js execution runtime in `apps/`

### Adding New Agents
1. Create agent definition YAML in `libs/prompts/agent-definitions/`
2. Generate application: `bun nx generate @nx/node:application <agent-name>`
3. Implement agent logic using ElizaOS patterns
4. Add Nx project configuration (`project.json`)
5. Implement comprehensive tests using Bun test runner

### Available Agents
- **CEO Mimi** (`ceo-agent`) - Strategic decisions and cost optimization
- **CTO Zara** (`cto-agent`) - Technical architecture and system design
- **CFO Maya** (`cfo-agent`) - Financial analysis and budget optimization
- **CLO Sage** (`clo-agent`) - Legal compliance and governance
- **CAO Eduardo** (`cao-agent`) - Administrative operations
- **Chief of Staff** (`chief-of-staff-agent`) - Task coordination
- **Cognitive Interface** (`cognitive-interface`) - Adaptive UI system
- **Agent Factory** (`agent-factory`) - Dynamic agent creation

## Testing

The project uses Bun's built-in test runner for optimal performance:
```bash
# Run all tests
bun test

# Run tests for specific project
bun nx test <project-name>

# Run affected tests only
bun nx affected --target=test
```

## Linting and Formatting

The project uses Biome for linting and formatting:
```bash
# Check and fix linting issues
bunx @biomejs/biome check --write .

# Format code
bunx @biomejs/biome format --write .
```

## Deployment

### Local Development
```bash
# Quick development setup
bun run quick-start

# Start system monitoring
bun run start:monitoring
```

### Production Deployment
```bash
# Deploy to Akash Network
bun run deploy:akash

# Deploy with secure token management
bun run deploy:with-secrets
```

## Environment Configuration

- **Runtime**: Bun (preferred over Node.js for 50x faster performance)
- **Package Manager**: Bun (configured in package.json as `"packageManager": "bun@1.2.18"`)
- **Module Type**: ES modules (`"type": "module"` in package.json)
- **Platform**: Windows-optimized with PowerShell scripts
- **Build Tool**: tsup for dual ESM/CJS output with TypeScript declarations

## Troubleshooting

### Common Issues
- **Dependency Installation**: Use `bun install` instead of npm to avoid hanging
- **Build Failures**: Check TypeScript configuration and run `bun nx affected --target=build`
- **Test Issues**: Ensure Bun test runner is properly configured in project.json
- **Windows Execution**: Use PowerShell with ExecutionPolicy Bypass for scripts

### Health Checks
```bash
# System health validation
node AB/scripts/quick-status.js

# Check MCP server connectivity
node core/mcp/test-mcp-connection.js
```