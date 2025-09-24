# Intelligent Router Agent

The Intelligent Router Agent serves as the central nervous system for task routing within the 371 OS ecosystem. It analyzes incoming tasks with sophisticated intelligence and routes them to the most appropriate C-Suite agents based on content analysis, workload distribution, and strategic priorities.

## Architecture

This application follows the unified "brain/body" architecture pattern:

- **Brain**: `libs/prompts/agent-definitions/intelligent_router.yml` - Contains the agent's core instructions, personality, and routing policies
- **Body**: This TypeScript application - Implements the execution runtime with sophisticated routing logic

## Features

- **Intelligent Task Analysis**: Advanced natural language processing for task content analysis
- **Multi-Factor Routing**: Considers domain expertise, agent availability, and historical performance
- **Multi-Agent Coordination**: Orchestrates complex tasks requiring multiple agent types
- **Performance Optimization**: Continuously improves routing decisions based on success metrics
- **Escalation Management**: Identifies when human intervention is required

## Components

- `RouterEngine`: Core orchestration logic for routing decisions
- `TaskAnalyzer`: Task content analysis and domain classification
- `AgentSelector`: Agent selection based on capabilities and availability
- `DelegationOrchestrator`: Multi-agent coordination and task delegation
- `PerformanceMonitor`: Metrics collection and routing optimization

## Usage

```bash
# Build the application
bun nx build intelligent-router

# Run the application
bun nx serve intelligent-router

# Run tests
bun nx test intelligent-router

# Lint and format
bun nx lint intelligent-router
```

## Integration

The Intelligent Router integrates with:
- Agent Registry for capability and availability information
- Performance monitoring system for continuous improvement
- C-Suite agents for task delegation
- Escalation system for human intervention when needed