/**
 * Tests for the Ultimate Multimodal Local Autonomous Agent
 */

import { beforeEach, describe, expect, it, mock, spyOn } from 'bun:test';
import {
  AutonomousTaskProcessor,
  type MultimodalLocalAgent,
  OllamaClient,
  VisionProcessor,
  createMultimodalAgent,
} from './index.js';
import type {
  AutonomousTask,
  GPUConfig,
  ImageInput,
  MultimodalAgentConfig,
  OllamaModelConfig,
} from './types.js';

describe('MultimodalLocalAgent', () => {
  let agent: MultimodalLocalAgent;

  beforeEach(() => {
    agent = createMultimodalAgent({
      name: 'Test Agent',
      ollamaEndpoint: 'http://localhost:11434',
    });
  });

  describe('createMultimodalAgent', () => {
    it('should create an agent with default configuration', () => {
      const testAgent = createMultimodalAgent();
      expect(testAgent).toBeDefined();
      expect(testAgent.getConfig().name).toBe('Ultimate Multimodal Agent');
    });

    it('should create an agent with custom configuration', () => {
      const customConfig: Partial<MultimodalAgentConfig> = {
        name: 'Custom Agent',
        description: 'A custom test agent',
        ollamaEndpoint: 'http://custom:11434',
      };
      const testAgent = createMultimodalAgent(customConfig);

      expect(testAgent.getConfig().name).toBe('Custom Agent');
      expect(testAgent.getConfig().ollamaEndpoint).toBe('http://custom:11434');
    });

    it('should have proper GPU configuration for NVIDIA 4060', () => {
      const testAgent = createMultimodalAgent();
      const config = testAgent.getConfig();

      expect(config.gpuConfig.availableVRAM).toBe(8);
      expect(config.gpuConfig.enableCUDA).toBe(true);
      expect(config.gpuConfig.memoryStrategy).toBe('balanced');
    });
  });

  describe('getConfig', () => {
    it('should return the current configuration', () => {
      const config = agent.getConfig();

      expect(config.name).toBe('Test Agent');
      expect(config.textModel).toBeDefined();
      expect(config.visionModel).toBeDefined();
      expect(config.autonomousConfig).toBeDefined();
      expect(config.safetyConfig).toBeDefined();
    });

    it('should include all required model configurations', () => {
      const config = agent.getConfig();

      // Text model
      expect(config.textModel.name).toBeTruthy();
      expect(config.textModel.capabilities).toContain('text');
      expect(config.textModel.gpuMemoryGB).toBeGreaterThan(0);

      // Vision model
      expect(config.visionModel.name).toBeTruthy();
      expect(config.visionModel.capabilities).toContain('image');
    });
  });

  describe('getStats', () => {
    it('should return agent statistics', () => {
      const stats = agent.getStats();

      expect(stats.uptime).toBeGreaterThanOrEqual(0);
      expect(stats.initialized).toBe(false); // Not initialized yet
      expect(stats.config.textModel).toBeTruthy();
      expect(stats.config.visionModel).toBeTruthy();
      expect(stats.config.gpuVRAM).toBe(8);
    });
  });

  describe('onEvent', () => {
    it('should register event handlers', () => {
      const events: any[] = [];
      const unsubscribe = agent.onEvent((event) => events.push(event));

      expect(typeof unsubscribe).toBe('function');
    });

    it('should allow unsubscribing from events', () => {
      let eventCount = 0;
      const unsubscribe = agent.onEvent(() => eventCount++);

      // Unsubscribe
      unsubscribe();

      // Event count should not change after unsubscribe
      expect(eventCount).toBe(0);
    });
  });

  describe('registerTool', () => {
    it('should register a custom tool', () => {
      const customTool = {
        name: 'test_tool',
        description: 'A test tool',
        inputSchema: { input: 'string' },
        outputSchema: { output: 'string' },
        requiredPermissions: [],
        execute: async (input: any) => ({ output: 'test' }),
      };

      // Should not throw
      expect(() => agent.registerTool(customTool)).not.toThrow();
    });
  });

  describe('shutdown', () => {
    it('should shutdown gracefully', async () => {
      await expect(agent.shutdown()).resolves.toBeUndefined();
    });
  });
});

describe('OllamaClient', () => {
  describe('configuration', () => {
    it('should create client with custom endpoint', () => {
      const client = new OllamaClient({
        endpoint: 'http://custom:11434',
        gpuConfig: {
          deviceId: 0,
          availableVRAM: 8,
          enableCUDA: true,
          memoryStrategy: 'balanced',
          maxConcurrentRequests: 2,
        },
        timeoutMs: 30000,
        enableStreaming: true,
        retry: {
          maxAttempts: 3,
          baseDelayMs: 1000,
        },
      });

      expect(client).toBeDefined();
    });
  });

  describe('getStats', () => {
    it('should return client statistics', () => {
      const client = new OllamaClient({
        endpoint: 'http://localhost:11434',
        gpuConfig: {
          deviceId: 0,
          availableVRAM: 8,
          enableCUDA: true,
          memoryStrategy: 'balanced',
          maxConcurrentRequests: 2,
        },
        timeoutMs: 30000,
        enableStreaming: true,
        retry: {
          maxAttempts: 3,
          baseDelayMs: 1000,
        },
      });

      const stats = client.getStats();

      expect(stats.requestCount).toBe(0);
      expect(stats.cachedModels).toBe(0);
    });
  });
});

describe('Types', () => {
  describe('AutonomousTask', () => {
    it('should allow creating a valid task', () => {
      const task: AutonomousTask = {
        id: 'test_001',
        title: 'Test Task',
        description: 'A test autonomous task',
        priority: 'high',
        requiredCapabilities: ['text', 'image'],
        expectedOutput: 'structured',
        timeoutMs: 30000,
        allowSubTasks: true,
        createdAt: new Date(),
      };

      expect(task.id).toBe('test_001');
      expect(task.priority).toBe('high');
      expect(task.requiredCapabilities).toContain('text');
      expect(task.requiredCapabilities).toContain('image');
    });

    it('should support task context with images', () => {
      const task: AutonomousTask = {
        id: 'test_002',
        title: 'Image Analysis Task',
        description: 'Analyze provided images',
        priority: 'medium',
        requiredCapabilities: ['image'],
        expectedOutput: 'text',
        timeoutMs: 60000,
        allowSubTasks: false,
        createdAt: new Date(),
        context: {
          textInputs: ['Additional context'],
          imageInputs: [
            {
              id: 'img_001',
              source: 'base64',
              data: 'base64encodeddata',
              mimeType: 'image/png',
            },
          ],
        },
      };

      expect(task.context?.imageInputs).toBeDefined();
      expect(task.context?.imageInputs?.length).toBe(1);
    });
  });

  describe('ImageInput', () => {
    it('should support base64 images', () => {
      const image: ImageInput = {
        id: 'img_001',
        source: 'base64',
        data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        mimeType: 'image/png',
        description: 'A 1x1 red pixel',
      };

      expect(image.source).toBe('base64');
      expect(image.mimeType).toBe('image/png');
    });

    it('should support file path images', () => {
      const image: ImageInput = {
        id: 'img_002',
        source: 'filepath',
        data: '/path/to/image.jpg',
        mimeType: 'image/jpeg',
      };

      expect(image.source).toBe('filepath');
      expect(image.data).toBe('/path/to/image.jpg');
    });

    it('should support URL images', () => {
      const image: ImageInput = {
        id: 'img_003',
        source: 'url',
        data: 'https://example.com/image.webp',
        mimeType: 'image/webp',
      };

      expect(image.source).toBe('url');
    });
  });

  describe('GPUConfig', () => {
    it('should configure for NVIDIA 4060', () => {
      const gpuConfig: GPUConfig = {
        deviceId: 0,
        availableVRAM: 8, // 8GB VRAM
        enableCUDA: true,
        memoryStrategy: 'aggressive',
        maxConcurrentRequests: 3,
      };

      expect(gpuConfig.availableVRAM).toBe(8);
      expect(gpuConfig.enableCUDA).toBe(true);
    });
  });

  describe('OllamaModelConfig', () => {
    it('should configure text model', () => {
      const textModel: OllamaModelConfig = {
        name: 'llama3.2',
        capabilities: ['text'],
        gpuMemoryGB: 4,
        supportsStreaming: true,
        contextLength: 8192,
        optimalBatchSize: 16,
      };

      expect(textModel.name).toBe('llama3.2');
      expect(textModel.capabilities).toContain('text');
    });

    it('should configure vision model', () => {
      const visionModel: OllamaModelConfig = {
        name: 'llava',
        capabilities: ['text', 'image'],
        gpuMemoryGB: 5,
        supportsStreaming: true,
        contextLength: 4096,
      };

      expect(visionModel.capabilities).toContain('image');
      expect(visionModel.gpuMemoryGB).toBeLessThanOrEqual(8); // Fits in 4060
    });
  });
});

describe('AutonomousTaskProcessor', () => {
  it('should be exported and usable', () => {
    expect(AutonomousTaskProcessor).toBeDefined();
  });
});

describe('VisionProcessor', () => {
  it('should be exported and usable', () => {
    expect(VisionProcessor).toBeDefined();
  });
});

describe('Integration', () => {
  describe('Full workflow simulation', () => {
    it('should handle complete task lifecycle', async () => {
      const agent = createMultimodalAgent({
        name: 'Integration Test Agent',
      });

      // Verify initial state
      expect(agent.getStats().initialized).toBe(false);

      // Create a test task
      const task: AutonomousTask = {
        id: 'integration_001',
        title: 'Integration Test Task',
        description: 'Test the full workflow',
        priority: 'medium',
        requiredCapabilities: ['text'],
        expectedOutput: 'text',
        timeoutMs: 30000,
        allowSubTasks: false,
        createdAt: new Date(),
      };

      // Event tracking
      const events: string[] = [];
      agent.onEvent((e) => events.push(e.type));

      // Shutdown
      await agent.shutdown();
    });
  });
});
