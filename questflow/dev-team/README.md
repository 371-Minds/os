# QuestFlow Dev Team - Internal Development Support

The internal development team that supports the QuestFlow implementation, featuring autonomous agent coordination and blockchain-based verification. This team operates within the broader 371 OS unified architecture.

## 🚀 Purpose

This directory contains the internal tooling and development support for the QuestFlow platform implementation:

- **Agent Development Support**: Tools and frameworks for developing AI agents
- **Spec-Driven Development**: BDD and API specification workflows
- **Nx Workspace Integration**: Monorepo structure for efficient development
- **Akash Deployment Tools**: Automated deployment to decentralized infrastructure
- **Unified Architecture Compliance**: Follows 371 OS brain/body separation pattern

> **Note**: This dev-team workspace follows legacy patterns. New agents should use the unified architecture in `os-workspace/` with agent definitions in `libs/prompts/agent-definitions/` and implementations in `apps/`.

## 🏗️ Architecture

The Dev Team workspace follows the 371 OS architecture principles:

```
dev-team/
├── apps/                    # Application packages
│   └── api/                # API server with agent integrations
├── libs/                   # Shared libraries
│   ├── agents-core/        # Core agent functionality
│   └── shared/             # Shared utilities
├── src/                    # Main source code
│   ├── app.js              # Express application entry point
│   └── routes/             # API routes
├── tests/                  # Test suites
│   └── integration/        # Integration tests
├── specs/                  # System specifications
├── prompts/                # AI agent prompts
└── docker/                 # Docker configurations
```

## ⚡ Quick Start

### 1. **Install Dependencies**
```bash
bun install
```

### 2. **Start Development Server**
```bash
bun run start
```

### 3. **Run Tests**
```bash
bun run test
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