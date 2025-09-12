# @371minds/blockchain-registry

Blockchain Registry Provider for 371 Minds OS.

## Overview

This library provides blockchain-based agent coordination and discovery capabilities for the 371 Minds OS. It implements the BlockchainRegistryProvider interface which allows agents to register themselves on the blockchain and discover other agents.

## Features

- Agent registration on blockchain
- Agent discovery mechanism
- Decentralized trust model
- Integration with Ethereum-based smart contracts

## Installation

```bash
bun add @371minds/blockchain-registry
```

## Usage

```typescript
import { BlockchainRegistryProviderImpl } from '@371minds/blockchain-registry';

const registry = new BlockchainRegistryProviderImpl();
// TODO: Implement usage
```

## API

### BlockchainRegistryProvider

Interface for blockchain registry provider.

### BlockchainRegistryProviderImpl

Implementation of the blockchain registry provider.

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
├── index.ts          # Main entry point
├── index.test.ts     # Tests
```

## Dependencies

- `ethers`: Ethereum JavaScript library for interacting with the blockchain

## Integration with 371 OS

This library is part of the core libraries in the 371 OS project and is designed to work seamlessly with other components of the system, including:

- Agent coordination through the Universal Tool Server
- Integration with IPFS storage for metadata
- Shared types from the core-types library