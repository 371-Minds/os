# QuestFlow-371OS

QuestFlow is an AI workflow automation platform that enables users to orchestrate multiple AI agents in collaborative workflows, specifically integrated with the 371OS Autonomous Agent Operating System.

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

1. Install dependencies: `npm install`
2. Set up 371OS integration: `npm run setup`
3. Define your agents in the `agents/` directory
4. Create workflows in the `workflows/` directory
5. Connect external services using connectors in `connectors/`
6. Execute workflows and monitor results in `workflows/executions/`

## Core Components

### Agents
Agents are the building blocks of QuestFlow. Each agent has specific capabilities and can perform tasks based on their configuration.

### Workflows
Workflows define the sequence of steps that agents will execute to accomplish a goal. Workflows can be linear or include parallel processing.

### Connectors
Connectors enable integration with external services and APIs, allowing agents to interact with the outside world.

## Development

- Run tests: `npm test`
- Run unit tests: `npm run test:unit`
- Run integration tests: `npm run test:integration`

## Examples

Check the `examples/` directory for sample implementations of agents and workflows.

For 371OS-specific examples, see `examples/371os-integration.md`.