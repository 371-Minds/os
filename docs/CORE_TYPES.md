# Core Types Library

## Overview

The `@371minds/core-types` library contains shared TypeScript interfaces and types used across multiple packages in the 371 OS. It provides a consistent type system for agent capabilities, registry entries, and other core concepts.

This library is a fundamental component of the 371 OS architecture, ensuring type safety and consistency across all packages and agents.

## Key Features

- **Type Safety**: Strong TypeScript typing for reliability
- **Consistency**: Shared types across all packages
- **No Dependencies**: Pure TypeScript with no external dependencies
- **Extensibility**: Easily extensible type definitions
- **Documentation**: Well-documented type interfaces

## Architecture

The library provides the following core types:

### AgentRegistryEntry

Represents an entry in the agent registry:

```typescript
interface AgentRegistryEntry {
  agentId: string;
  did: string;
  capabilities: AgentCapability[];
  reputation: ReputationScore;
  stakeAmount: bigint;
}
```

### AgentCapability

Represents a capability of an agent:

```typescript
interface AgentCapability {
  name: string;
  description: string;
  version: string;
}
```

### ReputationScore

Represents a reputation score:

```typescript
interface ReputationScore {
  value: number;
  lastUpdated: Date;
}
```

## Usage

### Installation

```bash
bun add @371minds/core-types
```

### Basic Usage

```typescript
import { AgentRegistryEntry, AgentCapability, ReputationScore } from '@371minds/core-types';

// Use the shared types
const agentEntry: AgentRegistryEntry = {
  agentId: 'agent-1',
  did: 'did:example:123',
  capabilities: [],
  reputation: { value: 0.95, lastUpdated: new Date() },
  stakeAmount: BigInt(1000)
};
```

### Using AgentCapability

```typescript
import { AgentCapability } from '@371minds/core-types';

const capability: AgentCapability = {
  name: 'data-analysis',
  description: 'Performs data analysis on datasets',
  version: '1.0.0'
};
```

### Using ReputationScore

```typescript
import { ReputationScore } from '@371minds/core-types';

const reputation: ReputationScore = {
  value: 0.85,
  lastUpdated: new Date()
};
```

## Development

### Project Structure

```
libs/core-types/
├── src/
│   ├── index.ts          # Main entry point with all type definitions
│   ├── index.test.ts     # Tests for type definitions
├── package.json          # Package definition
├── project.json          # Nx project configuration
├── tsconfig.json         # TypeScript configuration
├── tsup.config.ts        # Build configuration
└── README.md             # Library documentation
```

### Building

```bash
cd os-workspace/libs/core-types
bun run build
```

### Testing

```bash
cd os-workspace/libs/core-types
bun test
```

### Running Tests with Coverage

```bash
cd os-workspace/libs/core-types
bun test --coverage
```

## Integration with 371 OS

The core-types library is used by all other components of the 371 OS:

1. **Agent Framework**: Defines agent registry entries and capabilities
2. **Blockchain Registry**: Uses types for agent registration and discovery
3. **IPFS Storage**: Uses types for metadata storage
4. **Universal Tool Server**: Uses types for tool definitions
5. **ElizaOS Plugins**: Uses types for plugin interfaces

## Best Practices

### Type Safety

- Always use the defined types instead of inline object definitions
- Extend existing types rather than creating new ones for similar concepts
- Use proper type annotations for function parameters and return values

### Extensibility

- Design types to be easily extensible
- Use optional properties for non-required fields
- Consider using discriminated unions for complex type hierarchies

### Documentation

- Document all type properties with clear descriptions
- Provide examples for complex types
- Keep documentation up-to-date with type changes

## Future Enhancements

### Planned Features

1. **Advanced Types**: More sophisticated type definitions
2. **Type Utilities**: Utility types for common operations
3. **Validation**: Runtime validation functions for types
4. **Schema Generation**: Automatic schema generation from types

### Contributing

To contribute to the core-types library:

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests for your changes
5. Update documentation
6. Submit a pull request

## API Reference

### AgentRegistryEntry

Represents an entry in the agent registry.

Properties:
- `agentId`: Unique identifier for the agent
- `did`: Decentralized identifier for the agent
- `capabilities`: Array of capabilities the agent supports
- `reputation`: Reputation score of the agent
- `stakeAmount`: Amount of stake provided by the agent

### AgentCapability

Represents a capability of an agent.

Properties:
- `name`: Name of the capability
- `description`: Description of the capability
- `version`: Version of the capability

### ReputationScore

Represents a reputation score.

Properties:
- `value`: Numerical value of the reputation score
- `lastUpdated`: Timestamp of when the score was last updated

## Troubleshooting

### Common Issues

1. **Type Mismatch Errors**: Verify type usage matches definitions
2. **Missing Properties**: Ensure all required properties are provided
3. **Version Compatibility**: Check for breaking changes between versions

### Debugging Tips

- Use TypeScript's built-in type checking for validation
- Enable strict mode for more comprehensive type checking
- Use IDE features for type introspection