# Copilot Instructions for 371 OS

## Project Overview

This project, `371-os`, is a comprehensive OS for running a network of AI agents with **email coordination** and **social media management capabilities**. It is structured as an **Nx monorepo** using **Bun** as the package manager and runtime.

## Tech Stack

- **Runtime**: Bun (preferred over Node.js)
- **Package Manager**: Bun (`bun install`, not `npm` or `yarn`)
- **Monorepo Tool**: Nx CLI (`bun nx ...`)
- **Module Type**: ES modules (`"type": "module"`)
- **Linting/Formatting**: Biome
- **Build Tool**: tsup for dual ESM/CJS output

## Directory Structure

```
core/os-workspace/
├── apps/                       # Application packages
│   ├── agent-factory/          # Agent creation and management
│   ├── c-suite-agent-runner/   # C-Suite coordination system
│   ├── ceo-agent/              # CEO Mimi agent
│   ├── cto-agent/              # CTO Zara agent
│   ├── cfo-agent/              # CFO Maya agent
│   ├── clo-agent/              # CLO Sage agent
│   ├── cao-agent/              # CAO Eduardo agent
│   ├── chief-of-staff-agent/   # Coordination agent
│   ├── cognitive-interface/    # UI system
│   ├── enhanced-mail-conduit/  # Email service
│   ├── intelligent-router/     # LLM routing
│   ├── dao-governance-service/ # DAO management
│   └── utility-agents/         # Supporting utility agents
└── packages/                   # Shared libraries
    ├── elizaos-plugins/        # ElizaOS plugin ecosystem
    ├── cognitive-engine/       # Cognitive state detection
    ├── business-intelligence/
    ├── react-email-templates/
    └── thinng-testing/
```

## Build & Test Commands

### Installing Dependencies

```bash
bun install
```

### Building

```bash
# Build a single application
bun nx build <app-name>

# Build all affected projects
bun nx affected --target=build
```

### Testing

```bash
# Run tests for a single application
bun nx test <app-name>

# Run all affected tests
bun nx affected --target=test

# Run all tests
bun test
```

### Linting and Formatting

```bash
# Check and fix linting issues
bunx @biomejs/biome check --write .

# Format code
bunx @biomejs/biome format --write .
```

### Development Server

```bash
bun nx serve <app-name>
```

## Key Conventions

1. **Always use `bun`** instead of `npm` or `yarn` for package management
2. **Run commands through Nx CLI** for monorepo operations (`bun nx ...`)
3. **New applications** go in `core/os-workspace/apps/`
4. **New shared libraries** go in `core/os-workspace/packages/`
5. **Feature branches** are required for all new features and bugfixes

## Agent Architecture

Agents follow a **brain/body architecture**:

- **Brain**: Agent definitions stored as configuration
- **Body**: TypeScript/Node.js runtime in `apps/`

### Adding New Agents

1. Generate application: `bun nx generate @nx/node:application <agent-name>`
2. Implement agent logic using ElizaOS patterns
3. Add Nx project configuration (`project.json`)
4. Implement tests using Bun test runner

## Code Style Guidelines

- Use TypeScript for all new code
- Follow existing patterns in the codebase
- Add comments only when they match the style of existing comments
- Use existing libraries; only add new dependencies when absolutely necessary
- Prefer ES modules over CommonJS

## Testing Requirements

- Use Bun's built-in test runner
- Test files should follow existing naming conventions in the project
- Run `bun nx test <project-name>` to verify changes

## Common Troubleshooting

- **Dependency Installation**: Use `bun install` to avoid hanging
- **Build Failures**: Check TypeScript configuration and run `bun nx affected --target=build`
- **Test Issues**: Ensure Bun test runner is properly configured in `project.json`
