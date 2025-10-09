# AGENTS.md

## Project Overview

The **371-OS** project is a revolutionary autonomous agent operating system built on ElizaOS and structured as an Nx monorepo. This comprehensive ecosystem enables a network of AI agents to operate with self-awareness, blockchain coordination, and 97.6% cost reduction through Akash Network deployment.

The project implements a sophisticated **C-Suite agent ecosystem** where specialized AI agents handle different business functions, from strategic planning (CEO Mimi) to technical architecture (CTO Zara) and financial optimization (CFO Maya). All agents are coordinated through blockchain-based mechanisms and enhanced by the Model Context Protocol (MCP).

### Core Architecture
- **Agent-Based Architecture**: Self-aware agents with workspace manipulation capabilities
- **Universal Tool Server**: Beyond MCP limitations with blockchain coordination
- **Cognitive Engine**: World's first cognitive-aware interface system
- **Spatial Computing**: Revolutionary spatial development environments
- **Zero-Trust Security**: Secretless Broker and ACI.dev policy enforcement
- **Economic Incentive Model**: Stake-based reputation system with DAO governance

### Technology Stack
- **Runtime**: Bun (50x faster than npm)
- **Framework**: ElizaOS with Nx workspace management
- **Linting/Formatting**: Biome (Rust-based for optimal performance)
- **Deployment**: Akash Network for 97.6% cost reduction
- **Blockchain**: Ethereum with Status Network (L2)
- **Storage**: IPFS for decentralized content
- **Coordination**: Model Context Protocol (MCP) servers

## Workspace Structure

```
371-minds-os/
├── core/os-workspace/           # Main development workspace
│   ├── apps/                    # Application packages
│   │   ├── agent-factory/       # Agent creation and management
│   │   ├── c-suite-agent-runner/ # C-Suite coordination system
│   │   ├── ceo-agent/           # CEO Mimi agent implementation
│   │   ├── cto-agent/           # CTO Zara agent implementation
│   │   ├── cfo-agent/           # CFO Maya agent implementation
│   │   ├── clo-agent/           # CLO Sage agent implementation
│   │   ├── cao-agent/           # CAO Eduardo agent implementation
│   │   ├── chief-of-staff-agent/ # Coordination and task management
│   │   ├── cognitive-interface/  # Cognitive-aware UI system
│   │   ├── intelligent-router/   # Adaptive LLM routing
│   │   ├── dao-governance-service/ # DAO management system
│   │   └── utility-agents/      # Supporting utility agents
│   ├── packages/                # Shared libraries and plugins
│   │   ├── elizaos-plugins/     # ElizaOS plugin ecosystem
│   │   ├── cognitive-engine/    # Cognitive state detection
│   │   ├── business-intelligence/ # Analytics and BI tools
│   │   ├── nx-workspace/        # Self-aware workspace manipulation
│   │   └── thinng-testing/      # Mathematical state management
│   └── ...configuration files
├── project-management/AB/       # Milestone tracking and session continuity
├── integrations/               # External platform integrations
├── documentation/              # Comprehensive project documentation
└── legacy/                     # Legacy systems and migration artifacts
```

## Build & Test

### Installing Dependencies
```bash
# Install all dependencies (lightning fast with Bun)
bun install

# Alternative installation script for Windows
powershell -ExecutionPolicy Bypass -File ./AB/scripts/bun-install.ps1
```

### Building
```bash
# Build a specific application
bun nx build <app-name>

# Build all affected projects (optimized for monorepo efficiency)
bun nx affected --target=build

# Build all projects
bun nx run-many -t build

# Examples for specific agents
bun nx build ceo-agent
bun nx build cto-agent
bun nx build cognitive-engine
```

### Testing
```bash
# Run tests for a specific application
bun nx test <app-name>

# Run all affected tests
bun nx affected --target=test

# Run tests with Bun's built-in test runner
bun test

# Examples for specific components
bun nx test elizaos-plugin-nx-workspace
bun nx test cognitive-engine
```

### Linting & Formatting
```bash
# Lint and format code with Biome (Rust-based performance)
bun nx affected --target=lint
bunx @biomejs/biome check --write .
bunx @biomejs/biome format --write .
```

## Running in Development

### Individual Agent Development
```bash
# Serve an application in development mode with live reloading
bun nx serve <app-name>

# Start specific agents with hot reloading
bun --watch apps/ceo-agent/src/index.ts
bun --watch apps/cto-agent/src/index.ts
bun --watch apps/cognitive-interface/src/main.tsx
```

### System-Wide Development
```bash
# Start coordinated development environment
bun run start:dev

# Start CEO and Coordinator agents together
concurrently "bun run start:ceo" "bun run start:coordinator"

# Full system startup with MongoDB and all services
bun run system:full-start
```

### Agent Testing & Validation
```bash
# Test agent startup and connectivity
bun run start:test-agent

# Validate specific agent implementations
bun run validate-clo-agent.js
node core/os-workspace/test-ping-agent.mjs

# Test cognitive engine capabilities
bun nx test cognitive-engine
```

## Agent Ecosystem

### C-Suite Agents (Executive Level)
- **CEO Mimi**: Strategic decisions, cost optimization, high-level coordination
- **CTO Zara**: Technical architecture, system design, security oversight  
- **CFO Maya**: Financial analysis, budget optimization, ROI tracking
- **CLO Sage**: Legal compliance, governance, regulatory frameworks
- **CAO Eduardo**: Administrative operations, process optimization
- **Chief of Staff**: Task coordination, inter-agent communication

### Specialized Agents
- **Intelligent Router**: Adaptive LLM provider selection and cost optimization
- **Agent Factory**: Dynamic agent creation and lifecycle management
- **Utility Agents**: Supporting functions like credential management

### Agent Capabilities
Each agent follows the unified **brain/body architecture**:
- **Brain**: Agent definitions stored in YAML files (`libs/prompts/agent-definitions/`)
- **Body**: TypeScript/Node.js execution runtime in `apps/`
- **Coordination**: Blockchain registry for agent discovery and trust
- **Memory**: MCP servers for persistent context and knowledge

## Key Conventions

### Package Management
- **Primary**: Use `bun` for all operations (50x faster than npm)
- **Fallback**: `npm install --legacy-peer-deps` only if Bun fails
- **Scripts**: All package.json scripts use `bun` commands

### Monorepo Management
- **Workspace Operations**: Run through Nx CLI (`bun nx ...`)
- **Affected Analysis**: Use `bun nx affected` for efficient builds/tests
- **Dependency Graph**: Visualize with `bun nx graph`

### Directory Conventions
- **New Applications**: Add to `core/os-workspace/apps/`
- **Shared Libraries**: Add to `core/os-workspace/packages/`
- **Agent Definitions**: Store in `libs/prompts/agent-definitions/` as YAML
- **Documentation**: Update `documentation/` and session logs in `project-management/AB/`

### Development Workflow
- **Branch Strategy**: Feature branches merged to `main`
- **Session Continuity**: Document progress in `project-management/AB/sessions/`
- **Milestone Tracking**: Update `project-management/AB/milestone-tracker.md`
- **Troubleshooting**: Reference `documentation/troubleshooting/` for common issues

### Code Organization
```typescript
// Standard ElizaOS plugin structure
export interface Action {
  name: string;
  description: string;
  handler: ActionHandler;
  validate?: ValidateFunction;
  examples?: ActionExample[];
}

// Agent registry patterns for blockchain coordination
export interface AgentRegistryEntry {
  agentId: string;
  did: string;
  capabilities: AgentCapability[];
  reputation: ReputationScore;
  stakeAmount: bigint;
}
```

## Deployment & Production

### Local Development
```bash
# Quick development setup
bun run quick-start

# Start monitoring and health checks
bun run start:monitoring
bun run health-check
```

### Akash Network Deployment (97.6% Cost Reduction)
```bash
# Deploy to Akash Network
bun run deploy:akash
powershell -ExecutionPolicy Bypass -File ./scripts/deploy-akash.ps1

# Deploy specific components
bun run deploy:github:all
bun run deploy:github:uts    # Universal Tool Server
bun run deploy:github:ceo    # CEO Agent
```

### Production Environment
```bash
# Secure token management
bun run env:load
bun run env:validate

# Production deployment with secrets
bun run deploy:with-secrets

# Package publishing
bun run publish:all
bun run publish:plugins
```

## Advanced Features

### Cognitive Engine
- **Cognitive State Detection**: Real-time analysis of user mental states
- **Adaptive Interfaces**: UI that adjusts based on cognitive load
- **Mode Transitions**: Automatic switching between Executive, Technical, and Creative modes

### Universal Tool Server
- **Blockchain Registry**: Decentralized agent discovery and trust
- **Cross-Network Tools**: Execute tools across different blockchain networks
- **Economic Incentives**: Stake-based reputation and reward distribution

### Performance Optimizations
- **Bun Runtime**: 50x faster dependency installation and execution
- **Biome Linting**: Rust-based tools for optimal performance
- **Nx Affected**: Build only what changed for massive time savings
- **Hot Reloading**: Instant feedback during development

## Integration Guidelines

### Adding New Agents
1. Create agent definition YAML in `libs/prompts/agent-definitions/`
2. Generate application: `bun nx generate @nx/node:application <agent-name>`
3. Implement agent logic using ElizaOS patterns
4. Register in blockchain registry for coordination
5. Add to monitoring and health check systems

### Plugin Development
1. Create plugin in `packages/elizaos-plugins/`
2. Follow ElizaOS plugin architecture (Actions, Evaluators, Providers)
3. Add Nx project configuration (`project.json`)
4. Implement comprehensive tests
5. Document capabilities and integration points

### External Integrations
- **MCP Servers**: For persistent memory and context
- **Blockchain Networks**: For coordination and trust
- **IPFS**: For decentralized storage
- **PostHog**: For analytics and behavior tracking
- **MongoDB**: For structured data persistence

## Security & Compliance

### Zero-Trust Architecture
- **Secretless Broker**: No hardcoded credentials in code
- **ACI.dev Integration**: Policy enforcement and access control
- **Credential Warehouse**: Centralized, secure credential management
- **Agent Authentication**: Blockchain-based identity verification

### Governance
- **DAO Governance**: Decentralized decision making via DAO DAO platform
- **Smart Contracts**: Automated execution of strategic plans
- **Compliance Monitoring**: CLO agent ensures regulatory adherence
- **Audit Trails**: Comprehensive logging and transaction tracking

## Troubleshooting & Support

### Common Issues
- **Dependency Installation**: Use `bun install` or `AB/scripts/bun-install.ps1`
- **Build Failures**: Check TypeScript configuration and imports
- **Agent Coordination**: Verify blockchain connectivity and MCP servers
- **Performance Issues**: Review Bun configuration and Nx cache

### Documentation Resources
- **Architecture Guide**: `documentation/reference/`
- **Troubleshooting**: `documentation/troubleshooting/`
- **Session Logs**: `project-management/AB/sessions/`
- **API Reference**: ElizaOS and blockchain integration docs

### Health Monitoring
```bash
# System health validation
node AB/scripts/quick-status.js
bun run health-check

# Specific component testing
bun nx test cognitive-engine
bun nx build elizaos-plugin-nx-workspace
```

## Performance Metrics

| Component | Performance | Status | Benefits |
|-----------|-------------|--------|----------|
| Dependency Installation | 50x faster | ✅ Complete | Bun vs npm |
| Build System | 10x faster | ✅ Complete | Nx affected analysis |
| Test Execution | 50-100x faster | ✅ Complete | Bun test runner |
| Cost Optimization | 97.6% reduction | ✅ Complete | Akash Network |
| Agent Coordination | Real-time | ✅ Complete | Blockchain registry |
| Cognitive Awareness | Revolutionary | ✅ Complete | World's first |

---

**🚀 Welcome to the most advanced autonomous agent operating system!**

For detailed implementation guides, architectural documentation, and troubleshooting resources, refer to the comprehensive documentation in the `documentation/` directory and session continuity system in `project-management/AB/`.

The 371-OS represents a breakthrough in cognitive computing, autonomous business operations, and cost-optimized AI infrastructure. Every component is designed for production-scale deployment with enterprise security and revolutionary performance optimizations.