# @371minds/ipfs-storage

IPFS Storage Implementation for 371 Minds OS.

## Overview

This library provides decentralized storage capabilities using IPFS (InterPlanetary File System) for the 371 Minds OS. It implements the IPFSStorage interface which allows agents to store and retrieve data in a decentralized manner.

## Features

- Decentralized file storage
- Content addressing
- Integration with IPFS and Web3.Storage
- Data persistence across the network

## Installation

```bash
bun add @371minds/ipfs-storage
```

## Usage

```typescript
import { IPFSStorageImpl } from '@371minds/ipfs-storage';

const storage = new IPFSStorageImpl();
// TODO: Implement usage
```

## API

### IPFSStorage

Interface for IPFS storage.

### IPFSStorageImpl

Implementation of the IPFS storage.

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

- `ipfs-http-client`: JavaScript client for the IPFS HTTP API
- `web3.storage`: Client for Web3.Storage service

## Integration with 371 OS

This library is part of the core libraries in the 371 OS project and is designed to work seamlessly with other components of the system, including:

- Storage of agent metadata and capabilities
- Integration with the blockchain registry for content verification
- Shared types from the core-types library