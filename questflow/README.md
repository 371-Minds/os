# QuestFlow-371OS

QuestFlow is an AI workflow automation platform that enables users to orchestrate multiple AI agents in collaborative workflows, specifically integrated with the 371OS Autonomous Agent Operating System.

## API Server

QuestFlow now includes a RESTful API server for integrating with the 371-Minds/os project. The server provides endpoints for workflow management, C-Suite agent coordination, and Akash Network deployments.

For detailed API documentation, see [API Server Documentation](docs/api-server.md).

## Folder Structure

```
questflow/
├── agents/                 # AI agents definitions
│   ├── core/              # Core agent implementations
│   ├── specialized/       # Specialized agents for specific tasks
│   └── templates/         # Agent templates for common use cases
├── workflows/              # Workflow definitions
│   ├── configs/           # Workflow configuration files
│   ├── templates/         # Workflow templates
│   └── executions/        # Execution logs and results
├── tasks/                  # Individual task definitions
├── connectors/             # Integration connectors for external services
├── lib/                    # Core library functions
├── utils/                  # Utility functions
├── tests/                  # Test files
│   ├── unit/              # Unit tests
│   └── integration/       # Integration tests
├── docs/                   # Documentation
├── examples/               # Example workflows and implementations
├── config/                 # Global configuration files
└── scripts/                # Automation scripts
```

## Getting Started

1. Install dependencies: `bun install`
2. Set up 371OS integration: `bun run setup`
3. Configure Postiz API key in `config/default.json` (see [Postiz Integration Guide](docs/postiz-integration.md))
4. Define your agents in the `agents/` directory
5. Create workflows in the `workflows/` directory
6. Connect external services using connectors in `connectors/`
7. Execute workflows and monitor results in `workflows/executions/`

## Core Components

### Agents
Agents are the building blocks of QuestFlow. Each agent has specific capabilities and can perform tasks based on their configuration.

### Workflows
Workflows define the sequence of steps that agents will execute to accomplish a goal. Workflows can be linear or include parallel processing.

### Connectors
Connectors enable integration with external services and APIs, allowing agents to interact with the outside world.

## Integrations

### 371OS Integration
QuestFlow integrates with the 371OS Autonomous Agent Operating System for advanced AI agent orchestration.

See [371OS Integration Guide](docs/371os-integration.md) for details.

### Postiz Integration
QuestFlow integrates with Postiz for social media management, allowing you to create and schedule posts across multiple platforms.

See [Postiz Integration Guide](docs/postiz-integration.md) for details.

## Development

- Run tests: `bun test`
- Run unit tests: `bun test:unit`
- Run integration tests: `bun test:integration`
- Run API server: `bun run serve`
- Run API server in development mode: `bun run dev`

## Examples

Check the `examples/` directory for sample implementations of agents and workflows.

For 371OS-specific examples, see `examples/371os-integration.md`.

For Postiz integration examples, see `examples/postiz-integration.md`.