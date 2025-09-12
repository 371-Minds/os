# IPFS Storage Library

## Overview

The `@371minds/ipfs-storage` library implements decentralized storage using IPFS (InterPlanetary File System) for the 371 OS. It allows agents to store and retrieve data in a decentralized manner, providing immutable storage with cryptographic hashing.

This library is a core component of the 371 OS architecture, enabling agents to persist data across the decentralized network without relying on centralized storage providers.

## Key Features

- **Decentralized Storage**: Store data across the IPFS network
- **Content Addressing**: Immutable storage using cryptographic hashes
- **IPFS Integration**: Direct integration with IPFS HTTP API
- **Web3.Storage Support**: Integration with Web3.Storage service
- **Data Persistence**: Long-term data storage across the network

## Architecture

The library implements the following components:

### IPFSStorage

Interface defining the contract for IPFS storage operations:

```typescript
interface IPFSStorage {
  // TODO: Implement IPFS storage interface
}
```

### IPFSStorageImpl

Concrete implementation of the IPFSStorage interface:

```typescript
class IPFSStorageImpl implements IPFSStorage {
  // TODO: Implement the actual IPFS storage
}
```

## Dependencies

- `ipfs-http-client`: JavaScript client for the IPFS HTTP API
- `web3.storage`: Client for Web3.Storage service

## Usage

### Installation

```bash
bun add @371minds/ipfs-storage
```

### Basic Usage

```typescript
import { IPFSStorageImpl } from '@371minds/ipfs-storage';

const storage = new IPFSStorageImpl();
// TODO: Implement usage
```

### Storing Data

```typescript
// Store data in IPFS
const data = { message: 'Hello, 371 OS!' };
const cid = await storage.store(data);
console.log('Data stored with CID:', cid);
```

### Retrieving Data

```typescript
// Retrieve data from IPFS
const cid = 'Qm...'; // CID from storage operation
const data = await storage.retrieve(cid);
console.log('Retrieved data:', data);
```

## Development

### Project Structure

```
libs/ipfs-storage/
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
cd os-workspace/libs/ipfs-storage
bun run build
```

### Testing

```bash
cd os-workspace/libs/ipfs-storage
bun test
```

### Running Tests with Coverage

```bash
cd os-workspace/libs/ipfs-storage
bun test --coverage
```

## Integration with 371 OS

The ipfs-storage library integrates with other components of the 371 OS:

1. **Agent Framework**: Agents use storage for persisting data and metadata
2. **Blockchain Registry**: Stores agent metadata and capabilities
3. **Universal Tool Server**: Persists tool definitions and configurations
4. **Core Types**: Uses shared types from the core-types library

## Best Practices

### Security

- Always verify data integrity using CID hashes
- Implement proper access controls for sensitive data
- Use encryption for private data before storing

### Performance

- Pin important data to ensure availability
- Use directory structures for organizing related data
- Implement caching for frequently accessed data

### Testing

- Use IPFS mock clients for unit tests
- Test edge cases like network failures and large files
- Verify data integrity through hash comparisons

## Future Enhancements

### Planned Features

1. **Advanced Pinning**: More sophisticated pinning strategies
2. **Data Encryption**: Built-in encryption for private data
3. **Content Discovery**: Enhanced content discovery mechanisms
4. **Storage Market Integration**: Integration with Filecoin storage markets

### Contributing

To contribute to the ipfs-storage library:

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests for your changes
5. Update documentation
6. Submit a pull request

## API Reference

### IPFSStorage

#### Methods

##### store

Stores data in IPFS and returns the CID.

```typescript
store(data: any): Promise<string>
```

Parameters:
- `data`: Data to store (will be serialized to JSON)

Returns: Promise that resolves to the CID of the stored data

##### retrieve

Retrieves data from IPFS using the CID.

```typescript
retrieve(cid: string): Promise<any>
```

Parameters:
- `cid`: Content Identifier of the data to retrieve

Returns: Promise that resolves to the retrieved data

## Troubleshooting

### Common Issues

1. **Connection Errors**: Verify IPFS API endpoint configuration
2. **Rate Limiting**: Check Web3.Storage rate limits
3. **Data Not Found**: Verify CID and network connectivity
4. **Large File Issues**: Consider chunking for large files

### Debugging Tips

- Enable verbose logging to see IPFS interactions
- Use IPFS gateways to verify data availability
- Check network connectivity to IPFS nodes
- Monitor storage usage and quotas