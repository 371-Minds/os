# Blockchain Registry Library

## Overview

The `@371minds/blockchain-registry` library provides blockchain-based agent coordination and discovery capabilities for the 371 OS. It enables agents to register themselves on the blockchain and discover other agents in a decentralized manner.

This library is a core component of the 371 OS architecture, implementing the decentralized registry pattern that allows for trustless agent coordination.

## Key Features

- **Agent Registration**: Allows agents to register their capabilities on the blockchain
- **Agent Discovery**: Enables agents to discover other agents based on capabilities
- **Decentralized Trust**: Uses cryptographic verification for agent authenticity
- **Ethereum Integration**: Integrates with Ethereum-based smart contracts
- **Staking Mechanism**: Supports stake-based reputation system

## Architecture

The library implements the following components:

### BlockchainRegistryProvider

Interface defining the contract for blockchain registry operations:

```typescript
interface BlockchainRegistryProvider {
  // TODO: Implement blockchain registry provider logic
}
```

### BlockchainRegistryProviderImpl

Concrete implementation of the BlockchainRegistryProvider interface:

```typescript
class BlockchainRegistryProviderImpl implements BlockchainRegistryProvider {
  // TODO: Implement the actual blockchain registry provider
}
```

## Dependencies

- `ethers`: Ethereum JavaScript library for interacting with the blockchain

## Usage

### Installation

```bash
bun add @371minds/blockchain-registry
```

### Basic Usage

```typescript
import { BlockchainRegistryProviderImpl } from '@371minds/blockchain-registry';

const registry = new BlockchainRegistryProviderImpl();
// TODO: Implement usage
```

### Agent Registration

```typescript
// Register an agent with its capabilities
const agentId = 'agent-123';
const did = 'did:371minds:agent-123';
const capabilities = ['data-analysis', 'report-generation'];
const stakeAmount = ethers.parseEther('1.0');

await registry.registerAgent(agentId, did, capabilities, stakeAmount);
```

### Agent Discovery

```typescript
// Discover agents with specific capabilities
const agents = await registry.discoverAgents('data-analysis');
console.log('Found agents:', agents);
```

## Development

### Project Structure

```
libs/blockchain-registry/
├── src/
│   ├── index.ts          # Main entry point
│   ├── index.test.ts     # Tests
├── package.json          # Package definition
├── project.json          # Nx project configuration
├── tsconfig.json         # TypeScript configuration
├── tsup.config.ts        # Build configuration
└── README.md             # Library documentation
```

### Building

```bash
cd os-workspace/libs/blockchain-registry
bun run build
```

### Testing

```bash
cd os-workspace/libs/blockchain-registry
bun test
```

### Running Tests with Coverage

```bash
cd os-workspace/libs/blockchain-registry
bun test --coverage
```

## Integration with 371 OS

The blockchain-registry library integrates with other components of the 371 OS:

1. **Agent Framework**: Agents use the registry to register their capabilities
2. **Universal Tool Server**: Coordinates agent discovery and communication
3. **Smart Contracts**: Interacts with Ethereum-based registry contracts
4. **Core Types**: Uses shared types from the core-types library

## Best Practices

### Security

- Always verify agent identities through cryptographic means
- Use appropriate stake amounts for different capability levels
- Implement proper error handling for blockchain interactions

### Performance

- Cache registry lookups to reduce blockchain calls
- Use batch operations when registering multiple agents
- Implement proper retry logic for transient blockchain errors

### Testing

- Use mock blockchain providers for unit tests
- Test edge cases like network failures and contract errors
- Verify cryptographic signatures in integration tests

## Future Enhancements

### Planned Features

1. **Multi-Chain Support**: Support for multiple blockchain networks
2. **Advanced Discovery**: More sophisticated agent discovery algorithms
3. **Reputation System**: Enhanced reputation scoring mechanisms
4. **Event Streaming**: Real-time registry updates through events

### Contributing

To contribute to the blockchain-registry library:

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests for your changes
5. Update documentation
6. Submit a pull request

## API Reference

### BlockchainRegistryProvider

#### Methods

##### registerAgent

Registers an agent in the blockchain registry.

```typescript
registerAgent(
  agentId: string,
  did: string,
  capabilities: string[],
  stakeAmount: bigint
): Promise<void>
```

Parameters:
- `agentId`: Unique identifier for the agent
- `did`: Decentralized identifier for the agent
- `capabilities`: Array of capabilities the agent supports
- `stakeAmount`: Amount of stake provided by the agent

Returns: Promise that resolves when registration is complete

##### discoverAgents

Discovers agents with specific capabilities.

```typescript
discoverAgents(capability: string): Promise<AgentRegistryEntry[]>
```

Parameters:
- `capability`: Capability to search for

Returns: Promise that resolves to an array of agent registry entries

## Troubleshooting

### Common Issues

1. **Blockchain Connection Errors**: Verify RPC endpoint configuration
2. **Insufficient Gas**: Ensure wallet has sufficient funds for transactions
3. **Contract Not Deployed**: Verify registry contract is deployed to the network
4. **Signature Verification Failures**: Check cryptographic key configurations

### Debugging Tips

- Enable verbose logging to see blockchain interactions
- Use blockchain explorers to verify transaction status
- Check contract events for registration confirmation