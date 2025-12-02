# 🤖 Ultimate Multimodal Local Autonomous Agent

The world's first truly multimodal autonomous agent with support for local deployment (Windows + NVIDIA 4060), Ollama Cloud, and Akash Network.

## 🚀 Features

- **🖼️ Vision/Image Analysis** - Analyze images, extract text (OCR), understand diagrams
- **🧠 Autonomous Task Execution** - Self-directed reasoning with goal-seeking behavior
- **💡 Self-Improvement** - Learns from interactions through episodic memory
- **⚡ GPU-Optimized** - Configured for NVIDIA 4060 (8GB VRAM)
- **🔒 Fully Local** - Complete offline operation capability
- **🎯 Multi-Model Support** - Text, vision, and code generation models
- **☁️ Multi-Cloud Support** - Local Ollama, Ollama Cloud, and Akash Network
- **🔀 Router Integration** - Works with 371 OS Intelligent Router for task distribution

## 📋 Prerequisites

### Hardware Requirements
- **GPU**: NVIDIA RTX 4060 (8GB VRAM) or equivalent
- **RAM**: 16GB+ recommended
- **Storage**: 20GB+ for models

### Software Requirements
- **Windows 10/11** (optimized for Windows)
- **Ollama** - Local LLM runtime
- **Bun** - JavaScript runtime
- **CUDA Toolkit** (optional, for GPU acceleration)

## 🔧 Installation

### 1. Install Ollama

Download and install Ollama from [https://ollama.ai/download](https://ollama.ai/download)

### 2. Pull Required Models

```bash
# Text model (recommended)
ollama pull llama3.2

# Vision model (required for image analysis)
ollama pull llava

# Code model (optional, for code generation)
ollama pull codestral
```

### 3. Start Ollama

```bash
ollama serve
```

### 4. Build the Agent

```bash
cd core/os-workspace
bun nx build multimodal-local-agent
```

## 🎮 Usage

### Quick Start

```typescript
import { createMultimodalAgent } from './multimodal-local-agent';

// Create and initialize the agent
const agent = createMultimodalAgent({
  name: 'My Agent',
  ollamaEndpoint: 'http://localhost:11434',
});

await agent.initialize();

// Generate text
const response = await agent.generateText('Explain quantum computing in simple terms');
console.log(response);

// Process autonomous task
const result = await agent.processTask({
  id: 'task_001',
  title: 'Analyze market trends',
  description: 'Research and summarize current AI market trends',
  priority: 'high',
  requiredCapabilities: ['text'],
  expectedOutput: 'structured',
  timeoutMs: 60000,
  allowSubTasks: true,
  createdAt: new Date(),
});

console.log(result);
```

### Vision Analysis

```typescript
// Analyze an image
const analysis = await agent.analyzeImage({
  id: 'img_001',
  source: 'filepath',
  data: './screenshot.png',
  mimeType: 'image/png',
}, 'detailed');

console.log(analysis.sceneDescription);
console.log(analysis.objects);

// Extract text from image (OCR)
const text = await agent.extractText({
  id: 'doc_001',
  source: 'filepath',
  data: './document.png',
  mimeType: 'image/png',
});

console.log(text);

// Compare images
const comparison = await agent.compareImages([
  { id: 'before', source: 'filepath', data: './before.png', mimeType: 'image/png' },
  { id: 'after', source: 'filepath', data: './after.png', mimeType: 'image/png' },
]);

console.log(comparison.similarities);
console.log(comparison.differences);
```

### Code Generation

```typescript
const code = await agent.generateCode(
  'Create a function that validates email addresses',
  'typescript'
);

console.log(code.code);
console.log(code.explanation);
```

### Autonomous Task with Vision

```typescript
const task = {
  id: 'vision_task_001',
  title: 'Analyze UI Screenshot',
  description: 'Review this UI screenshot and suggest improvements',
  priority: 'high',
  requiredCapabilities: ['text', 'image'],
  expectedOutput: 'structured',
  timeoutMs: 60000,
  allowSubTasks: true,
  createdAt: new Date(),
  context: {
    textInputs: ['Focus on accessibility and user experience'],
    imageInputs: [{
      id: 'ui_screenshot',
      source: 'filepath',
      data: './ui-screenshot.png',
      mimeType: 'image/png',
    }],
  },
};

const result = await agent.processTask(task);
console.log(result.reasoning); // See the agent's thought process
console.log(result.output);
```

### Event Handling

```typescript
// Subscribe to agent events
const unsubscribe = agent.onEvent(event => {
  switch (event.type) {
    case 'task_started':
      console.log('Task started:', event.data);
      break;
    case 'reasoning':
      console.log('Reasoning step:', event.data);
      break;
    case 'task_completed':
      console.log('Task completed:', event.data);
      break;
  }
});

// Unsubscribe when done
unsubscribe();
```

### Custom Tools

```typescript
// Register a custom tool
agent.registerTool({
  name: 'fetch_weather',
  description: 'Fetch current weather for a location',
  inputSchema: { location: 'string' },
  outputSchema: { temperature: 'number', conditions: 'string' },
  requiredPermissions: ['external_api'],
  execute: async (input: { location: string }) => {
    // Implementation
    return { temperature: 72, conditions: 'sunny' };
  },
});
```

## ☁️ Cloud Providers

### Local Ollama (Default)

```typescript
import { createLocalProvider, createMultimodalAgent } from './multimodal-local-agent';

const provider = createLocalProvider('http://localhost:11434');
const agent = createMultimodalAgent({
  ollamaEndpoint: provider.getEndpoint(),
});
```

### Ollama Cloud

```typescript
import { createOllamaCloudProvider, createMultimodalAgent } from './multimodal-local-agent';

const provider = createOllamaCloudProvider(
  process.env.OLLAMA_CLOUD_API_KEY!,
  'us-west'
);

const agent = createMultimodalAgent({
  ollamaEndpoint: provider.getEndpoint(),
});

// Check provider health
const health = await provider.healthCheck();
console.log('Provider healthy:', health.healthy);
console.log('Available models:', health.availableModels);
```

### Akash Network

```typescript
import { createAkashProvider, createMultimodalAgent } from './multimodal-local-agent';

const provider = createAkashProvider('https://your-akash-deployment.akash.network', {
  walletAddress: 'akash1...',
  dseq: '12345678',
  resources: {
    cpu: 2,
    memory: '4Gi',
    storage: '10Gi',
    gpu: {
      units: 1,
      vendor: 'nvidia',
      model: 'rtx4060',
    },
  },
  pricing: {
    denom: 'uakt',
    amount: 500,
  },
});

// Generate deployment manifest
const manifest = provider.generateAkashManifest(
  'ghcr.io/371-minds/multimodal-agent:latest',
  {
    NODE_ENV: 'production',
    OLLAMA_HOST: '0.0.0.0',
  }
);
console.log(manifest);
```

## 🔀 Router Integration

Integrate with the 371 OS Intelligent Router for multi-agent task distribution:

```typescript
import { createRouterIntegration, createMultimodalAgent } from './multimodal-local-agent';

// Create router integration
const router = createRouterIntegration(
  'http://localhost:3001', // Router endpoint
  'multimodal-agent-001'   // Agent ID
);

// Initialize and register with router
await router.initialize();

// Create agent
const agent = createMultimodalAgent();
await agent.initialize();

// Process task via router
const task = {
  id: 'task_001',
  title: 'Analyze document',
  description: 'Extract key information from this document image',
  priority: 'high',
  requiredCapabilities: ['text', 'image'],
  expectedOutput: 'structured',
  timeoutMs: 60000,
  allowSubTasks: true,
  createdAt: new Date(),
  context: {
    imageInputs: [documentImage],
  },
};

// Convert to router task and get routing decision
const routerTask = router.toRouterTask(task, 'user_001');
const decision = await router.submitTask(routerTask);

console.log('Routed to:', decision.primary_agent);
console.log('Confidence:', decision.confidence_score);

// If routed to this agent, process the task
if (decision.primary_agent === 'multimodal-agent-001') {
  const result = await agent.processTask(task);
  await router.reportCompletion(task.id, result);
}

// Cleanup
await router.shutdown();
```

## 📊 Configuration

### Full Configuration Example

```typescript
const agent = createMultimodalAgent({
  name: 'Production Agent',
  description: 'Production multimodal agent',
  ollamaEndpoint: 'http://localhost:11434',
  
  // Text model configuration
  textModel: {
    name: 'llama3.2',
    capabilities: ['text'],
    gpuMemoryGB: 4,
    supportsStreaming: true,
    contextLength: 8192,
    optimalBatchSize: 16,
  },
  
  // Vision model configuration
  visionModel: {
    name: 'llava',
    capabilities: ['text', 'image'],
    gpuMemoryGB: 5,
    supportsStreaming: true,
    contextLength: 4096,
    optimalBatchSize: 8,
  },
  
  // GPU configuration for NVIDIA 4060
  gpuConfig: {
    deviceId: 0,
    availableVRAM: 8,
    enableCUDA: true,
    memoryStrategy: 'balanced',
    maxConcurrentRequests: 2,
  },
  
  // Autonomous behavior settings
  autonomousConfig: {
    enabled: true,
    maxSubTaskDepth: 3,
    maxConcurrentTasks: 2,
    requireApproval: ['file_write', 'system_command'],
    selfImprovementEnabled: true,
    goalSeekingEnabled: true,
  },
  
  // Episodic memory settings
  memoryConfig: {
    enableEpisodicMemory: true,
    maxEntries: 1000,
    persistencePath: './agent-memory',
    compressionEnabled: true,
    relevanceDecay: 0.95,
  },
  
  // Safety settings
  safetyConfig: {
    enabled: true,
    maxResourceUsage: 0.8,
    blockedActions: [],
    confirmDestructive: true,
    sandboxMode: false,
    rateLimitPerMinute: 60,
  },
});
```

## 🔍 Monitoring

### Health Check

```typescript
const health = await agent.getHealth();

console.log('Overall:', health.healthy);
console.log('Components:');
for (const [name, status] of Object.entries(health.components)) {
  console.log(`  ${name}: ${status.status}`);
}
```

### Statistics

```typescript
const stats = agent.getStats();

console.log('Uptime:', stats.uptime, 'ms');
console.log('Text Model:', stats.config.textModel);
console.log('Vision Model:', stats.config.visionModel);
console.log('GPU VRAM:', stats.config.gpuVRAM, 'GB');
console.log('Active Contexts:', stats.processing.activeContexts);
console.log('Memory Entries:', stats.processing.memoryEntries);
```

### Memory Access

```typescript
const memories = agent.getMemories();

memories.forEach(memory => {
  console.log(`[${memory.type}] ${memory.content}`);
});
```

## 🧠 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  MultimodalLocalAgent                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │  OllamaClient   │  │  VisionProcessor│  │ TaskProcessor│ │
│  │  - Text Gen     │  │  - Image Analyze│  │ - Reasoning  │ │
│  │  - Code Gen     │  │  - OCR          │  │ - Sub-tasks  │ │
│  │  - Chat         │  │  - Compare      │  │ - Memory     │ │
│  │  - Vision       │  │  - Diagrams     │  │ - Tools      │ │
│  └────────┬────────┘  └────────┬────────┘  └──────┬──────┘ │
│           │                    │                   │         │
│           └────────────────────┼───────────────────┘         │
│                                │                              │
│                      ┌─────────▼─────────┐                   │
│                      │   Ollama Server   │                   │
│                      │   (Local LLMs)    │                   │
│                      └─────────┬─────────┘                   │
│                                │                              │
│                      ┌─────────▼─────────┐                   │
│                      │   NVIDIA 4060     │                   │
│                      │   (8GB VRAM)      │                   │
│                      └───────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Troubleshooting

### Ollama Connection Issues

```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Restart Ollama
ollama serve
```

### GPU Memory Issues

If you encounter CUDA out-of-memory errors:

1. Reduce `optimalBatchSize` in model config
2. Use smaller models (e.g., `llama3.2:1b` instead of `llama3.2:7b`)
3. Set `memoryStrategy` to 'conservative'
4. Reduce `maxConcurrentRequests`

### Model Not Found

```bash
# List available models
ollama list

# Pull missing models
ollama pull llama3.2
ollama pull llava
```

## 🧪 Testing

```bash
cd core/os-workspace
bun nx test multimodal-local-agent
```

## 📝 License

MIT License - see repository LICENSE file.

## 🤝 Contributing

See the main repository CONTRIBUTING.md for guidelines.
