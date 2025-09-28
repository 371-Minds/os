# QuestFlow Dev Team - Internal Development Support

*Revolutionary internal development team with autonomous agent coordination and blockchain-based verification for the 371 OS ecosystem.*

[![Development](https://img.shields.io/badge/Development-Active-green.svg)](./)
[![Architecture](https://img.shields.io/badge/Architecture-Nx_Workspace-blue.svg)](./)
[![Deployment](https://img.shields.io/badge/Deployment-Akash_Network-red.svg)](./docker/)
[![Testing](https://img.shields.io/badge/Testing-Bun_Runner-yellow.svg)](./tests/)

## 🚀 Purpose

This directory contains the internal tooling and development support for the QuestFlow platform implementation:

### 🏆 Core Capabilities
- **🤖 Agent Development Support**: Frameworks and tools for developing autonomous AI agents
- **📄 Spec-Driven Development**: BDD (Behavior-Driven Development) and API specification workflows
- **🏗️ Nx Workspace Integration**: Advanced monorepo structure for 40x development efficiency
- **☁️ Akash Deployment Tools**: Automated deployment to decentralized infrastructure (97.6% cost reduction)
- **🔄 Unified Architecture Compliance**: Follows 371 OS brain/body separation pattern
- **📊 Performance Optimization**: Advanced analytics and monitoring capabilities

### ⚠️ Architecture Note
> **Legacy Patterns**: This dev-team workspace follows legacy patterns for backward compatibility. 
> **New Development**: New agents should use the unified architecture in [`os-workspace/`](../../os-workspace/) with agent definitions in [`libs/prompts/agent-definitions/`](../../os-workspace/libs/prompts/agent-definitions/) and implementations in [`apps/`](../../os-workspace/apps/).

## 🏗️ Architecture

The Dev Team workspace follows the 371 OS architecture principles with enhanced tooling:

```
dev-team/
├── apps/                    # 📦 Application packages
│   └── api/                # 🌐 Express API server with agent integrations
│       ├── agents/         # 🤖 Agent-specific implementations
│       │   ├── code-mern/  # MERN stack code generation
│       │   ├── code-t3/    # T3 stack (Next.js/Prisma) generation
│       │   ├── deploy/     # Akash Network deployment automation
│       │   └── qa/        # Quality assurance and testing
│       └── src/            # 🔧 Core API implementation
│
├── libs/                   # 📚 Shared libraries and utilities
│   ├── agents-core/        # 🧠 Core agent functionality and coordination
│   └── shared/             # 🔗 Shared utilities and helpers
│
├── src/                    # 💻 Main source code
│   ├── app.js              # 🌐 Express application entry point
│   └── routes/             # 🇭 API routes and endpoints
│
├── tests/                  # 🧪 Comprehensive test suites
│   └── integration/        # 🔗 Integration and end-to-end tests
│
├── specs/                  # 📄 System specifications
│   ├── openapi.yaml        # API contract definitions
│   └── tasks.feature       # BDD scenarios and acceptance criteria
│
├── prompts/                # 🧠 AI agent prompts and instructions
│   ├── generate_routes.md  # Route generation prompts
│   ├── generate_tests.md   # Test generation prompts
│   └── refine_code.md      # Code refinement prompts
│
└── docker/                 # 🐳 Docker configurations and deployment
    ├── deploy.yaml         # Base Akash deployment configuration
    └── profiles/           # Resource profiles for different environments
        ├── minimal.yaml    # Staging/development profile
        ├── standard.yaml   # Standard production profile  
        └── high.yaml       # High-performance profile
```

### 🔄 Integration with Unified Architecture

```
371 OS Ecosystem Integration:

Legacy QuestFlow Dev Team ↔️ Unified 371 OS Architecture
        │                           │
        ├── Agent Development →     os-workspace/apps/
        ├── Agent Definitions →     libs/prompts/agent-definitions/
        ├── Shared Libraries →      packages/
        └── Deployment Tools →      deployments/
```

## ⚡ Quick Start

### 📈 1. **Dependency Installation (Optimized)**
```bash
# Use Bun for lightning-fast installation (50x faster than npm)
bun install

# Alternative: Traditional npm (for compatibility)
npm install
```

### 🔥 2. **Development Server (Hot Reloading)**
```bash
# Start with Bun's built-in watcher (recommended)
bun --watch src/app.js

# Alternative: Traditional start
bun run start
```

### 🧪 3. **Run Comprehensive Tests**
```bash
# Bun's built-in test runner (orders of magnitude faster)
bun test

# Run specific test categories
bun test tests/integration/    # Integration tests
bun test tests/unit/          # Unit tests
bun test --coverage           # With coverage report
```

### 📉 4. **Performance and Quality Checks**
```bash
# Code quality with Biome (replaces ESLint + Prettier)
bunx @biomejs/biome check --write .     # Lint and fix
bunx @biomejs/biome format --write .    # Format code

# Nx workspace operations
bun nx affected -t build    # Build only affected projects
bun nx affected -t test     # Test only affected projects
bun nx graph               # Visualize project dependencies
```

## 🧪 Testing

The Dev Team tools use Bun's built-in test runner for fast and efficient testing:

```bash
# Run all tests
bun run test

# Run specific test file
bun run test tests/integration/tasks.test.js

# Run tests with coverage
bun run test --coverage
```

## 🤖 Agent Development

The Dev Team tools support agent development for the QuestFlow platform:

### Code Generation Agents
- Code-MERN Agent: Generates MERN stack implementations
- Code-T3 Agent: Generates T3 stack (Next.js/Prisma) features

### QA Agents
- Validation agents that test code quality and spec compliance

### Deployment Agents
- Automated deployment to Akash Network

### Migration to Unified Architecture
For new agent development, consider migrating to the unified architecture pattern:
1. **Agent "Brain"**: Define in `../../os-workspace/libs/prompts/agent-definitions/agent-name.yml`
2. **Agent "Body"**: Implement in `../../os-workspace/apps/agent-name/`
3. Follow the [Chief of Staff Agent (Ortega)](../../os-workspace/apps/chief-of-staff-agent/) example

## 🔧 Development

### Project Structure
- **Nx Workspace**: Monorepo with affected analysis for 40x efficiency gains
- **Bun Runtime**: Lightning-fast JavaScript runtime with built-in test runner
- **TypeScript**: Type-safe development with modern JavaScript features

### Development Commands
```bash
# Start development server with hot reloading
bun --watch src/app.js

# Run tests in watch mode
bun run test --watch

# Lint code
bun run lint

# Format code
bun run format
```

## 📚 Documentation

- [DEV.md](./DEV.md) - Development guidelines and setup instructions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## 🙏 Acknowledgments

- **371 OS Team**: For the revolutionary autonomous agent framework
- **Nx Team**: For the incredible monorepo tooling
- **Bun Team**: For the lightning-fast JavaScript runtime
- **Akash Network**: For decentralized infrastructure enabling cost reduction