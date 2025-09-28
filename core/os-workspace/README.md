# 371 OS - Revolutionary Autonomous Agent Operating System

This is the main workspace for the 371 OS project, a revolutionary autonomous agent operating system that represents the next evolution beyond traditional Model Context Protocol (MCP) limitations.

## 🌟 Project Vision

371 OS enables self-aware AI agents to coordinate through blockchain-based Universal Tool Servers, achieving 97.6% cost reduction through Akash Network integration. Our mission is to transform AI agent architecture from stateful, limited MCP connections to stateless blockchain coordination with cryptographic trust verification.

## 🚀 Quick Start

To get started with the 371 OS project:

1. **Install Dependencies**: `bun install`
2. **Build Affected Projects**: `bun nx affected -t build` 
3. **Connect to Nx Cloud**: `bun nx connect` (optional, for analytics)
4. **Understand the Project Context**: [01-project-context.md](docs/01-project-context.md)
5. **Review Development Rules**: [02-development-rules.md](docs/02-development-rules.md)
6. **Learn Code Patterns**: [03-code-patterns.md](docs/03-code-patterns.md)
7. **Explore Architecture**: [docs/architecture/](docs/architecture/)
8. **Set Up Development Environment**: [docs/implementation/](docs/implementation/)

### **Development Commands**
```bash
# Install dependencies (lightning fast)
bun install

# Build only affected projects
bun nx affected -t build

# Run tests with Bun's built-in runner
bun test

# Start development servers
bun run start:dev

# Connect to Nx Cloud for advanced analytics
bun nx connect

# View detailed logs (after Nx Cloud connection)
bun nx view-logs

# Generate dependency graph
bun nx graph
```

## 📁 Directory Structure

```
os-workspace/
├── agents/                 # Agent configurations
├── apps/                   # Applications
├── libs/                   # Shared libraries
├── packages/               # ElizaOS plugins and packages
├── docs/                   # Centralized documentation
│   ├── 01-project-context.md    # Project vision and context
│   ├── 02-development-rules.md  # Development rules and conventions
│   ├── 03-code-patterns.md      # Code patterns and guidelines
│   ├── architecture/       # Architecture documentation
│   ├── implementation/     # Implementation guides
│   ├── api/                # API references
│   ├── development/        # Development guidelines
│   ├── deployment/         # Deployment guides
│   └── troubleshooting/    # Troubleshooting guides
├── nx.json                 # Nx workspace configuration
└── package.json            # Project dependencies
```

## 📚 Essential Documentation

### Core Contextual Documents
These documents provide essential context about the project's vision, architecture, and implementation patterns:

- [Project Context](docs/01-project-context.md) - High-level vision and technical patterns for onboarding
- [Development Rules](docs/02-development-rules.md) - Development conventions and best practices
- [Code Patterns](docs/03-code-patterns.md) - Implementation guidelines and code patterns

### Technical Documentation
- [Architecture Overview](docs/architecture/README.md) - System architecture and component diagrams
- [Implementation Guide](docs/implementation/README.md) - Getting started and development setup
- [API Reference](docs/api/README.md) - API documentation and endpoints
- [Development Guidelines](docs/development/README.md) - Coding standards and workflows
- [Deployment Guide](docs/deployment/README.md) - Deployment procedures and scaling
- [Troubleshooting Guide](docs/troubleshooting/README.md) - Common issues and solutions

## 🔧 Technology Stack

- **Runtime & Package Manager**: Bun v1.2.18 (50x faster than npm)
- **Development Framework**: Nx Workspace v21.4.1 with Nx Cloud integration
- **Frontend**: React v18+
- **Backend**: Node.js 18+, Express
- **Database**: MongoDB, Mongoose
- **Blockchain**: Ethereum (via ethers.js), Hardhat
- **Storage**: IPFS (via ipfs-http-client), Web3.storage
- **Infrastructure**: Akash Network
- **Testing**: Bun Test Runner (Jest-compatible, built-in)
- **Linting & Formatting**: Biome (Rust-powered, replaces ESLint + Prettier)
- **Languages**: TypeScript v5.9.2
- **Key Libraries**: Ethers.js v6.15.0, IPFS Client v60.0.1, MongoDB v6.10.0, Mongoose v8.8.3

## 🤖 Key Features

### Universal Tool Server Architecture
Stateless, blockchain-based agent coordination beyond MCP limitations

### Self-Aware Agents
Agents that understand and manipulate their own workspace

### Cost Optimization
97.6% cost reduction through Akash Network deployment

### Decentralized Registry
Blockchain-based agent discovery with cryptographic trust

### Enterprise Security
Zero-trust architecture with Secretless Broker and ACI.dev

### Economic Incentives
Stake-based reputation system for agent reliability

## 📖 Contributing

Please read our [Development Guidelines](docs/development/README.md) before contributing to the project. Make sure to follow the [Code Patterns](docs/03-code-patterns.md) and [Development Rules](docs/02-development-rules.md).

## 📞 Support

For questions and support, please refer to the [Troubleshooting Guide](docs/troubleshooting/README.md) or create an issue in the repository.