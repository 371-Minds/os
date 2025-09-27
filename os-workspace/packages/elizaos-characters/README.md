# @elizaos/characters

ElizaOS character definitions for the 371 OS C-Suite agent ecosystem. This package provides first-class TypeScript character definitions that replace legacy YAML configurations with type-safe, integrated agent definitions.

## 🚀 Features

- **Type-Safe Character Definitions**: Native TypeScript interfaces replacing YAML parsing
- **Self-Awareness Integration**: Direct integration with `@elizaos/plugin-nx-workspace` for workspace manipulation
- **C-Suite Agent Ecosystem**: Complete C-Suite agent definitions (CEO, CTO, CFO, CLO)
- **Business Intelligence Integration**: Seamless connection with `@elizaos/plugin-business-intelligence`
- **Modular Architecture**: Individual character imports for optimized loading

## 🏗️ Architecture

This package implements the "brain/body" architecture where character definitions (the "brain") are separated from runtime execution (the "body"). Each character definition includes:

- **Personality & Bio**: Rich backstory and behavioral patterns
- **Capabilities**: Integrated actions from ElizaOS plugins
- **Style & Communication**: Consistent voice and response patterns
- **Domain Expertise**: Specialized knowledge and decision-making frameworks

## 📖 Usage

### Import Individual Characters

```typescript
import { ceoMimiCharacter } from '@elizaos/characters/ceo-mimi';
import { ctoZaraCharacter } from '@elizaos/characters/cto-zara';

// Use with ElizaOS runtime
const runtime = new ElizaOS();
const mimiAgent = runtime.createAgent({ character: ceoMimiCharacter });
```

### Import All Characters

```typescript
import { 
  ceoMimiCharacter,
  ctoZaraCharacter,
  cfoMayaCharacter,
  cloAlexCharacter 
} from '@elizaos/characters';

// Create complete C-Suite
const cSuite = [
  runtime.createAgent({ character: ceoMimiCharacter }),
  runtime.createAgent({ character: ctoZaraCharacter }),
  runtime.createAgent({ character: cfoMayaCharacter }),
  runtime.createAgent({ character: cloAlexCharacter })
];
```

## 🤖 Available Characters

### CEO Mimi
Strategic orchestrator with workspace awareness and business coordination capabilities.

### CTO Zara  
Technical architect with infrastructure management and Akash Network integration.

### CFO Maya
Financial analyst with budget management and business intelligence capabilities.

### CLO Alex
Legal compliance officer with governance and security oversight.

## 🔗 Related Packages

- [`@elizaos/plugin-nx-workspace`](../elizaos-plugins/nx-workspace/) - Self-awareness capabilities
- [`@elizaos/plugin-business-intelligence`](../business-intelligence/) - Business analytics integration
- [`@elizaos/core`](https://www.npmjs.com/package/@elizaos/core) - Core ElizaOS runtime

## 🔧 Development

```bash
# Build the package
bun run build

# Development mode with hot reload
bun run dev

# Run tests
bun test

# Lint and format
bun run lint:fix
```

## 📝 Contributing

This package follows the 371 OS development standards:
- TypeScript-first development
- Bun for package management and testing
- Biome for linting and formatting
- Nx workspace integration

## 📄 License

MIT License - see LICENSE file for details.