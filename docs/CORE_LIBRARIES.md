# Core Libraries Architecture

## Overview

The 371 OS project includes a set of core libraries that provide essential functionality for the autonomous agent operating system. These libraries are designed to be shared across different packages and provide foundational capabilities for blockchain coordination, decentralized storage, and type definitions.

The core libraries follow the 371 OS architecture principles:
- **Decentralized**: Leverage blockchain and IPFS for trustless coordination
- **Modular**: Independent libraries with well-defined interfaces
- **Reusable**: Shared across multiple packages and agents
- **Type-Safe**: Strong TypeScript typing for reliability
- **Nx-Integrated**: Fully integrated with the Nx workspace

For detailed documentation on each library, see:
- [Blockchain Registry Library](./BLOCKCHAIN_REGISTRY.md)
- [IPFS Storage Library](./IPFS_STORAGE.md)
- [Core Types Library](./CORE_TYPES.md)

## Library Structure

```
os-workspace/
├── libs/
│   ├── blockchain-registry/
│   ├── ipfs-storage/
│   └── core-types/
```

## blockchain-registry

The `blockchain-registry` library provides blockchain-based agent coordination and discovery capabilities. It enables agents to register themselves on the blockchain and discover other agents in a decentralized manner.

For detailed documentation, see [Blockchain Registry Library](./BLOCKCHAIN_REGISTRY.md).

### Key Features

- Agent registration on blockchain
- Agent discovery mechanism
- Decentralized trust model
- Integration with Ethereum-based smart contracts
- Cryptographic verification of agent capabilities

### Dependencies

- `ethers`: Ethereum JavaScript library for interacting with the blockchain

### Usage

```typescript
import { BlockchainRegistryProviderImpl } from '@371minds/blockchain-registry';

const registry = new BlockchainRegistryProviderImpl();
// TODO: Implement usage
```

### Development

#### Building

```bash
cd os-workspace/libs/blockchain-registry
bun run build
```

#### Testing

```bash
cd os-workspace/libs/blockchain-registry
bun test
```

## ipfs-storage

The `ipfs-storage` library implements decentralized storage using IPFS (InterPlanetary File System). It allows agents to store and retrieve data in a decentralized manner.

For detailed documentation, see [IPFS Storage Library](./IPFS_STORAGE.md).

### Key Features

- Decentralized file storage
- Content addressing
- Integration with IPFS and Web3.Storage
- Data persistence across the network
- Immutable storage with cryptographic hashing

### Dependencies

- `ipfs-http-client`: JavaScript client for the IPFS HTTP API
- `web3.storage`: Client for Web3.Storage service

### Usage

```typescript
import { IPFSStorageImpl } from '@371minds/ipfs-storage';

const storage = new IPFSStorageImpl();
// TODO: Implement usage
```

### Development

#### Building

```bash
cd os-workspace/libs/ipfs-storage
bun run build
```

#### Testing

```bash
cd os-workspace/libs/ipfs-storage
bun test
```

## core-types

The `core-types` library contains shared TypeScript interfaces and types used across multiple packages in the 371 OS. It provides a consistent type system for agent capabilities, registry entries, and other core concepts.

For detailed documentation, see [Core Types Library](./CORE_TYPES.md).

### Key Types

- `AgentRegistryEntry`: Represents an entry in the agent registry
- `AgentCapability`: Represents a capability of an agent
- `ReputationScore`: Represents a reputation score

### Dependencies

- None (pure TypeScript types)

### Usage

```typescript
import { AgentRegistryEntry, AgentCapability } from '@371minds/core-types';

// Use the shared types
const agentEntry: AgentRegistryEntry = {
  agentId: 'agent-1',
  did: 'did:example:123',
  capabilities: [],
  reputation: { value: 0.95, lastUpdated: new Date() },
  stakeAmount: BigInt(1000)
};
```

### Development

#### Building

```bash
cd os-workspace/libs/core-types
bun run build
```

#### Testing

```bash
cd os-workspace/libs/core-types
bun test
```

## Usage

To use these libraries in your packages, you can import them as follows:

```typescript
import { BlockchainRegistryProviderImpl } from '@371minds/blockchain-registry';
import { IPFSStorageImpl } from '@371minds/ipfs-storage';
import { AgentRegistryEntry, AgentCapability } from '@371minds/core-types';
```

## Development

### Building All Libraries

To build all core libraries at once, run:

```bash
cd os-workspace
bun nx run-many -t build --projects=blockchain-registry,ipfs-storage,core-types
```

### Testing All Libraries

To test all core libraries at once, run:

```bash
cd os-workspace
bun nx run-many -t test --projects=blockchain-registry,ipfs-storage,core-types
```

## Integration with Nx Workspace

These libraries are fully integrated with the Nx workspace and can be referenced by other projects in the workspace. The `project.json` files in each library directory define the build and test targets for Nx.

The workspace is configured to use `libs` as the directory for libraries, which is reflected in the `nx.json` file:

```json
{
  "workspaceLayout": {
    "appsDir": "apps",
    "libsDir": "libs"
  }
}
```

### Project Structure

Each library follows a consistent structure:

```
libs/{library-name}/
├── src/
│   ├── index.ts          # Main entry point
│   ├── index.test.ts     # Tests
├── package.json          # Package definition
├── project.json          # Nx project configuration
├── tsconfig.json         # TypeScript configuration
├── tsup.config.ts        # Build configuration
└── README.md             # Library documentation
```

### Nx Integration

Each library is registered as an Nx project with build and test targets:

```json
{
  "name": "{library-name}",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/{library-name}/src",
  "projectType": "library",
  "targets": {
    "build": {
      "executor": "nx:run-commands",
      "options": {
        "command": "bun run build",
        "cwd": "libs/{library-name}"
      }
    },
    "test": {
      "executor": "nx:run-commands",
      "options": {
        "command": "bun test",
        "cwd": "libs/{library-name}"
      }
    }
  },
  "tags": ["library", "{library-type}"]
}
```

## Best Practices

### Type Safety

All libraries are written in TypeScript with strict typing to ensure type safety across the 371 OS ecosystem.

### Modularity

Each library has a single responsibility and well-defined interfaces, making them easy to use and maintain.

### Testing

All libraries include comprehensive tests to ensure reliability and prevent regressions.

### Documentation

Each library includes detailed documentation in its README.md file.

## Future Enhancements

### Planned Features

1. **Enhanced Blockchain Integration**: Additional features for the blockchain-registry library
2. **Advanced IPFS Features**: More sophisticated storage patterns for the ipfs-storage library
3. **Extended Type Definitions**: Additional shared types in the core-types library
4. **Cross-Chain Support**: Multi-blockchain coordination capabilities

### Contributing

To contribute to the core libraries:

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests for your changes
5. Update documentation
6. Submit a pull request