# @371minds/core-types

Shared TypeScript interfaces for 371 Minds OS.

## Overview

This library contains shared TypeScript interfaces and types used across multiple packages in the 371 Minds OS. It provides a consistent type system for agent capabilities, registry entries, and other core concepts.

## Features

- Shared type definitions
- Consistent interfaces across packages
- Type safety for agent interactions
- Centralized type management

## Installation

```bash
bun add @371minds/core-types
```

## Usage

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

## Types

### AgentRegistryEntry

Represents an entry in the agent registry.

### AgentCapability

Represents a capability of an agent.

### ReputationScore

Represents a reputation score.

## Development

### Building

```bash
bun run build
```

### Testing

```bash
bun test
```

### Project Structure

```
src/
├── index.ts          # Main entry point with all type definitions
├── index.test.ts     # Tests for type definitions
```

## Integration with 371 OS

This library is part of the core libraries in the 371 OS project and is designed to be used by other components of the system, including:

- Blockchain registry for agent registration
- IPFS storage for metadata storage
- Agent implementations for capability definitions
- Universal Tool Server for agent coordination