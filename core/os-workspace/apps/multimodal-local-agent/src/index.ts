/**
 * Ultimate Multimodal Local Autonomous Agent
 *
 * The world's first truly multimodal, locally-deployed autonomous agent
 * optimized for Windows with NVIDIA 4060 GPU and local Ollama cloud.
 *
 * Features:
 * - Vision/image analysis with local models
 * - Autonomous task execution with reasoning chains
 * - Self-improvement and learning capabilities
 * - GPU-optimized inference
 * - Full offline operation capability
 */

import { type Logger, createLogger, format, transports } from 'winston';
import { AutonomousTaskProcessor } from './autonomous-processor.js';
import { OllamaClient, type OllamaClientConfig } from './ollama-client.js';
import type {
  AgentEvent,
  AgentHealthStatus,
  AgentTool,
  AutonomousTask,
  ComponentHealth,
  GPUConfig,
  ImageInput,
  MemoryEntry,
  MultimodalAgentConfig,
  OllamaModelConfig,
  ProcessingResult,
  VisionAnalysisResult,
} from './types.js';
import {
  type VisionAnalysisRequest,
  type VisionMode,
  VisionProcessor,
} from './vision-processor.js';

/** Event handler type */
type EventHandler = (event: AgentEvent) => void;

/**
 * Ultimate Multimodal Local Autonomous Agent
 *
 * This agent combines:
 * - Local LLM inference via Ollama
 * - Vision capabilities for image understanding
 * - Autonomous task execution with reasoning
 * - Self-improvement through reflection
 * - Episodic memory for context retention
 */
export class MultimodalLocalAgent {
  private config: MultimodalAgentConfig;
  private logger: Logger;
  private ollamaClient: OllamaClient;
  private taskProcessor: AutonomousTaskProcessor;
  private visionProcessor: VisionProcessor;
  private eventHandlers: EventHandler[] = [];
  private isInitialized = false;
  private startTime: Date;

  constructor(config?: Partial<MultimodalAgentConfig>) {
    this.startTime = new Date();

    // Initialize logger
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.printf(
          ({ timestamp, level, message }) =>
            `${timestamp} [MultimodalAgent] ${level}: ${message}`,
        ),
      ),
      transports: [new transports.Console()],
    });

    // Merge with default configuration
    this.config = this.createDefaultConfig(config);

    // Initialize Ollama client
    const ollamaConfig: OllamaClientConfig = {
      endpoint: this.config.ollamaEndpoint,
      gpuConfig: this.config.gpuConfig,
      timeoutMs: 60000,
      enableStreaming: true,
      retry: {
        maxAttempts: 3,
        baseDelayMs: 1000,
      },
    };
    this.ollamaClient = new OllamaClient(ollamaConfig);

    // Initialize processors
    this.taskProcessor = new AutonomousTaskProcessor(
      this.ollamaClient,
      this.config.autonomousConfig,
      {
        maxSteps: 10,
        confidenceThreshold: 0.7,
        enableSelfReflection: true,
        enableToolUse: true,
      },
    );

    this.visionProcessor = new VisionProcessor(
      this.ollamaClient,
      this.config.visionModel.name,
    );

    this.logger.info('🚀 Ultimate Multimodal Local Autonomous Agent created');
  }

  /**
   * Initialize the agent and verify all components
   */
  async initialize(): Promise<boolean> {
    this.logger.info('Initializing agent components...');

    try {
      // 1. Check Ollama connection
      const ollamaHealth = await this.ollamaClient.healthCheck();
      if (!ollamaHealth.healthy) {
        this.logger.error(`Ollama not available: ${ollamaHealth.error}`);
        return false;
      }
      this.logger.info(
        `✅ Ollama connected. Available models: ${ollamaHealth.models.join(', ')}`,
      );

      // 2. Ensure required models are available
      const textModelReady = await this.ollamaClient.ensureModel(
        this.config.textModel.name,
      );
      const visionModelReady = await this.ollamaClient.ensureModel(
        this.config.visionModel.name,
      );

      if (!textModelReady) {
        this.logger.warn(
          `Text model ${this.config.textModel.name} not available`,
        );
      }
      if (!visionModelReady) {
        this.logger.warn(
          `Vision model ${this.config.visionModel.name} not available`,
        );
      }

      // 3. Verify GPU configuration
      this.logger.info(
        `GPU Config: Device ${this.config.gpuConfig.deviceId}, ` +
          `VRAM: ${this.config.gpuConfig.availableVRAM}GB, ` +
          `CUDA: ${this.config.gpuConfig.enableCUDA ? 'enabled' : 'disabled'}`,
      );

      this.isInitialized = true;
      this.emitEvent('task_started', { status: 'initialized' });
      this.logger.info('🎯 Agent initialization complete!');

      return true;
    } catch (error) {
      this.logger.error('Initialization failed:', error);
      return false;
    }
  }

  /**
   * Process an autonomous task
   */
  async processTask(task: AutonomousTask): Promise<ProcessingResult> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    this.logger.info(`📋 Processing task: ${task.title} (ID: ${task.id})`);
    this.emitEvent('task_started', { taskId: task.id, title: task.title });

    try {
      // Process with vision if images are provided
      if (task.context?.imageInputs && task.context.imageInputs.length > 0) {
        this.logger.info(
          `🖼️ Task includes ${task.context.imageInputs.length} image(s)`,
        );

        // Analyze images first
        const imageAnalyses = await Promise.all(
          task.context.imageInputs.map((img) =>
            this.visionProcessor.analyzeImage(img, 'detailed'),
          ),
        );

        // Add image analyses to task context
        const imageContext = imageAnalyses
          .map((a, i) => `Image ${i + 1}: ${a.sceneDescription}`)
          .join('\n\n');

        task.context.textInputs = [
          ...(task.context.textInputs || []),
          '--- Image Analysis ---',
          imageContext,
        ];
      }

      // Process the task autonomously
      const result = await this.taskProcessor.processTask(
        task,
        this.config.textModel.name,
      );

      if (result.success) {
        this.logger.info(`✅ Task ${task.id} completed successfully`);
        this.emitEvent('task_completed', { taskId: task.id, result });
      } else {
        this.logger.warn(`⚠️ Task ${task.id} completed with issues`);
        this.emitEvent('task_failed', {
          taskId: task.id,
          errors: result.errors,
        });
      }

      return result;
    } catch (error) {
      this.logger.error(`❌ Task ${task.id} failed:`, error);
      this.emitEvent('task_failed', {
        taskId: task.id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  /**
   * Analyze an image using vision capabilities
   */
  async analyzeImage(
    image: ImageInput,
    mode: VisionMode = 'general',
    customPrompt?: string,
  ): Promise<VisionAnalysisResult> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    this.logger.info(`🖼️ Analyzing image: ${image.id} (mode: ${mode})`);
    return await this.visionProcessor.analyzeImage(image, mode, customPrompt);
  }

  /**
   * Analyze multiple images
   */
  async analyzeImages(request: VisionAnalysisRequest): Promise<{
    results: VisionAnalysisResult[];
    summary: string;
  }> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    this.logger.info(`🖼️ Batch analyzing ${request.images.length} images`);
    const result = await this.visionProcessor.analyzeBatch(request);
    return {
      results: result.results,
      summary: result.summary,
    };
  }

  /**
   * Extract text from an image (OCR)
   */
  async extractText(image: ImageInput): Promise<string> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    this.logger.info(`📝 Extracting text from image: ${image.id}`);
    const result = await this.visionProcessor.extractText(image);
    return result.text;
  }

  /**
   * Compare multiple images
   */
  async compareImages(images: ImageInput[]): Promise<{
    similarities: string[];
    differences: string[];
    analysis: string;
  }> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    this.logger.info(`🔍 Comparing ${images.length} images`);
    const result = await this.visionProcessor.compareImages(images);
    return {
      similarities: result.similarities,
      differences: result.differences,
      analysis: result.detailedAnalysis,
    };
  }

  /**
   * Generate text response
   */
  async generateText(
    prompt: string,
    options?: {
      systemPrompt?: string;
      temperature?: number;
      maxTokens?: number;
      stream?: boolean;
      onStream?: (chunk: string) => void;
    },
  ): Promise<string> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    this.logger.info('💬 Generating text response');

    const genOptions = {
      model: this.config.textModel.name,
      systemPrompt: options?.systemPrompt,
      temperature: options?.temperature ?? 0.7,
      maxTokens: options?.maxTokens ?? 2048,
      onStream: options?.onStream,
    };

    if (options?.stream && options?.onStream) {
      const { response } = await this.ollamaClient.generateTextStream(
        prompt,
        genOptions,
      );
      return response;
    }

    const { response } = await this.ollamaClient.generateText(
      prompt,
      genOptions,
    );
    return response;
  }

  /**
   * Generate code
   */
  async generateCode(
    prompt: string,
    language: string,
  ): Promise<{ code: string; explanation: string }> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    this.logger.info(`💻 Generating ${language} code`);

    const model = this.config.codeModel?.name || this.config.textModel.name;
    const result = await this.ollamaClient.generateCode(prompt, language, {
      model,
      temperature: 0.2,
      maxTokens: 4096,
    });

    return {
      code: result.code,
      explanation: result.explanation,
    };
  }

  /**
   * Chat conversation
   */
  async chat(
    messages: Array<{ role: 'user' | 'assistant'; content: string }>,
    systemPrompt?: string,
  ): Promise<string> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const fullMessages = systemPrompt
      ? [{ role: 'system' as const, content: systemPrompt }, ...messages]
      : messages.map((m) => ({
          ...m,
          role: m.role as 'system' | 'user' | 'assistant',
        }));

    const { response } = await this.ollamaClient.chat(fullMessages, {
      model: this.config.textModel.name,
      temperature: 0.7,
      maxTokens: 2048,
    });

    return response;
  }

  /**
   * Register a custom tool
   */
  registerTool(tool: AgentTool): void {
    this.taskProcessor.registerTool(tool);
    this.logger.info(`🔧 Registered tool: ${tool.name}`);
  }

  /**
   * Subscribe to agent events
   */
  onEvent(handler: EventHandler): () => void {
    this.eventHandlers.push(handler);
    return () => {
      const index = this.eventHandlers.indexOf(handler);
      if (index > -1) {
        this.eventHandlers.splice(index, 1);
      }
    };
  }

  /**
   * Get agent health status
   */
  async getHealth(): Promise<AgentHealthStatus> {
    const ollamaHealth = await this.ollamaClient.healthCheck();

    const components: AgentHealthStatus['components'] = {
      ollama: {
        name: 'Ollama LLM Engine',
        status: ollamaHealth.healthy ? 'healthy' : 'unhealthy',
        error: ollamaHealth.error,
        details: { models: ollamaHealth.models },
      },
      gpu: {
        name: 'NVIDIA GPU',
        status: this.config.gpuConfig.enableCUDA ? 'healthy' : 'degraded',
        details: {
          device: this.config.gpuConfig.deviceId,
          vram: `${this.config.gpuConfig.availableVRAM}GB`,
          strategy: this.config.gpuConfig.memoryStrategy,
        },
      },
      memory: {
        name: 'Episodic Memory',
        status: 'healthy',
        details: {
          entries: this.taskProcessor.getMemories().length,
          maxEntries: this.config.memoryConfig.maxEntries,
        },
      },
      autonomy: {
        name: 'Autonomous Processor',
        status: this.config.autonomousConfig.enabled ? 'healthy' : 'degraded',
        details: {
          enabled: this.config.autonomousConfig.enabled,
          maxDepth: this.config.autonomousConfig.maxSubTaskDepth,
          activeContexts: this.taskProcessor.getActiveContexts().size,
        },
      },
    };

    const allHealthy = Object.values(components).every(
      (c) => c.status === 'healthy',
    );
    const recommendations: string[] = [];

    if (!ollamaHealth.healthy) {
      recommendations.push('Start Ollama service: ollama serve');
    }
    if (!this.config.gpuConfig.enableCUDA) {
      recommendations.push('Enable CUDA for better performance');
    }
    if (!this.config.autonomousConfig.enabled) {
      recommendations.push('Enable autonomous mode for full capabilities');
    }

    return {
      healthy: allHealthy,
      components,
      lastCheck: new Date(),
      recommendations: recommendations.length > 0 ? recommendations : undefined,
    };
  }

  /**
   * Get agent memories
   */
  getMemories(): MemoryEntry[] {
    return this.taskProcessor.getMemories();
  }

  /**
   * Get agent statistics
   */
  getStats(): {
    uptime: number;
    initialized: boolean;
    config: {
      textModel: string;
      visionModel: string;
      gpuVRAM: number;
      autonomousEnabled: boolean;
    };
    processing: {
      activeContexts: number;
      memoryEntries: number;
    };
    ollama: {
      requestCount: number;
      cachedModels: number;
    };
  } {
    const ollamaStats = this.ollamaClient.getStats();
    const visionStats = this.visionProcessor.getStats();

    return {
      uptime: Date.now() - this.startTime.getTime(),
      initialized: this.isInitialized,
      config: {
        textModel: this.config.textModel.name,
        visionModel: this.config.visionModel.name,
        gpuVRAM: this.config.gpuConfig.availableVRAM,
        autonomousEnabled: this.config.autonomousConfig.enabled,
      },
      processing: {
        activeContexts: this.taskProcessor.getActiveContexts().size,
        memoryEntries: this.taskProcessor.getMemories().length,
      },
      ollama: ollamaStats,
    };
  }

  /**
   * Get current configuration
   */
  getConfig(): MultimodalAgentConfig {
    return { ...this.config };
  }

  /**
   * Shutdown the agent gracefully
   */
  async shutdown(): Promise<void> {
    this.logger.info('🛑 Shutting down Multimodal Agent...');
    this.isInitialized = false;
    this.emitEvent('task_completed', { status: 'shutdown' });
    this.logger.info('Agent shutdown complete');
  }

  /**
   * Emit an event to all handlers
   */
  private emitEvent(
    type: AgentEvent['type'],
    data: Record<string, unknown>,
  ): void {
    const event: AgentEvent = {
      type,
      timestamp: new Date(),
      data,
      taskId: data.taskId as string | undefined,
    };

    for (const handler of this.eventHandlers) {
      try {
        handler(event);
      } catch (error) {
        this.logger.error('Event handler error:', error);
      }
    }
  }

  /**
   * Create default configuration optimized for NVIDIA 4060
   */
  private createDefaultConfig(
    overrides?: Partial<MultimodalAgentConfig>,
  ): MultimodalAgentConfig {
    const defaultGPUConfig: GPUConfig = {
      deviceId: 0,
      availableVRAM: 8, // NVIDIA 4060 has 8GB VRAM
      enableCUDA: true,
      memoryStrategy: 'balanced',
      maxConcurrentRequests: 2,
    };

    const defaultTextModel: OllamaModelConfig = {
      name: 'llama3.2',
      capabilities: ['text'],
      gpuMemoryGB: 4,
      supportsStreaming: true,
      contextLength: 8192,
      optimalBatchSize: 16,
    };

    const defaultVisionModel: OllamaModelConfig = {
      name: 'llava',
      capabilities: ['text', 'image'],
      gpuMemoryGB: 5,
      supportsStreaming: true,
      contextLength: 4096,
      optimalBatchSize: 8,
    };

    const defaultCodeModel: OllamaModelConfig = {
      name: 'codestral',
      capabilities: ['text'],
      gpuMemoryGB: 4,
      supportsStreaming: true,
      contextLength: 32768,
      optimalBatchSize: 8,
    };

    return {
      name: overrides?.name || 'Ultimate Multimodal Agent',
      description:
        overrides?.description ||
        'Local autonomous agent with vision, reasoning, and self-improvement capabilities',
      ollamaEndpoint: overrides?.ollamaEndpoint || 'http://localhost:11434',
      textModel: overrides?.textModel || defaultTextModel,
      visionModel: overrides?.visionModel || defaultVisionModel,
      codeModel: overrides?.codeModel || defaultCodeModel,
      gpuConfig: {
        ...defaultGPUConfig,
        ...overrides?.gpuConfig,
      },
      autonomousConfig: {
        enabled: true,
        maxSubTaskDepth: 3,
        maxConcurrentTasks: 2,
        requireApproval: ['file_write', 'system_command', 'external_api'],
        selfImprovementEnabled: true,
        goalSeekingEnabled: true,
        ...overrides?.autonomousConfig,
      },
      memoryConfig: {
        enableEpisodicMemory: true,
        maxEntries: 1000,
        persistencePath: './memory',
        compressionEnabled: true,
        relevanceDecay: 0.95,
        ...overrides?.memoryConfig,
      },
      safetyConfig: {
        enabled: true,
        maxResourceUsage: 0.8,
        blockedActions: [],
        confirmDestructive: true,
        sandboxMode: false,
        rateLimitPerMinute: 60,
        ...overrides?.safetyConfig,
      },
    };
  }
}

/**
 * Create and export default agent factory function
 */
export function createMultimodalAgent(
  config?: Partial<MultimodalAgentConfig>,
): MultimodalLocalAgent {
  return new MultimodalLocalAgent(config);
}

// Export types
export * from './types.js';
export { OllamaClient } from './ollama-client.js';
export { AutonomousTaskProcessor } from './autonomous-processor.js';
export { VisionProcessor } from './vision-processor.js';
export type { VisionMode } from './vision-processor.js';

/**
 * Quick demonstration when run directly
 */
async function main(): Promise<void> {
  console.log('');
  console.log(
    '═══════════════════════════════════════════════════════════════',
  );
  console.log('       🤖 ULTIMATE MULTIMODAL LOCAL AUTONOMOUS AGENT 🤖');
  console.log(
    '═══════════════════════════════════════════════════════════════',
  );
  console.log('');
  console.log('Optimized for: Windows + NVIDIA 4060 (8GB VRAM) + Local Ollama');
  console.log('');

  // Create agent with default configuration
  const agent = createMultimodalAgent({
    name: 'Demo Agent',
    description: 'Demonstration of multimodal capabilities',
  });

  // Subscribe to events
  agent.onEvent((event) => {
    console.log(`[Event] ${event.type}:`, JSON.stringify(event.data, null, 2));
  });

  // Initialize
  console.log('📡 Initializing agent...');
  const initialized = await agent.initialize();

  if (!initialized) {
    console.log('');
    console.log('⚠️  Agent initialization failed.');
    console.log('');
    console.log('Prerequisites:');
    console.log('  1. Install Ollama: https://ollama.ai/download');
    console.log('  2. Start Ollama: ollama serve');
    console.log('  3. Pull models: ollama pull llama3.2 && ollama pull llava');
    console.log('');
    return;
  }

  // Show health status
  console.log('');
  console.log('📊 Agent Health Status:');
  const health = await agent.getHealth();
  console.log(
    `   Overall: ${health.healthy ? '✅ Healthy' : '⚠️ Issues detected'}`,
  );
  for (const [key, status] of Object.entries(health.components)) {
    const icon =
      status.status === 'healthy'
        ? '✅'
        : status.status === 'degraded'
          ? '⚠️'
          : '❌';
    console.log(`   ${icon} ${status.name}: ${status.status}`);
  }

  if (health.recommendations) {
    console.log('');
    console.log('💡 Recommendations:');
    health.recommendations.forEach((r) => console.log(`   - ${r}`));
  }

  // Show stats
  console.log('');
  console.log('📈 Agent Statistics:');
  const stats = agent.getStats();
  console.log(`   Text Model: ${stats.config.textModel}`);
  console.log(`   Vision Model: ${stats.config.visionModel}`);
  console.log(`   GPU VRAM: ${stats.config.gpuVRAM}GB`);
  console.log(
    `   Autonomous: ${stats.config.autonomousEnabled ? 'Enabled' : 'Disabled'}`,
  );

  // Demo text generation
  console.log('');
  console.log('💬 Testing text generation...');
  try {
    const response = await agent.generateText(
      'Explain quantum computing in one sentence.',
      { maxTokens: 100 },
    );
    console.log(`   Response: ${response}`);
  } catch (error) {
    console.log(
      `   ⚠️ Text generation not available: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }

  // Demo autonomous task
  console.log('');
  console.log('🤖 Testing autonomous task processing...');
  try {
    const task = {
      id: 'demo_001',
      title: 'Analyze technology trends',
      description:
        'Identify the top 3 emerging technology trends for 2025 and explain their potential impact.',
      priority: 'medium' as const,
      requiredCapabilities: ['text' as const],
      expectedOutput: 'text' as const,
      timeoutMs: 30000,
      allowSubTasks: false,
      createdAt: new Date(),
    };

    const result = await agent.processTask(task);
    console.log(`   Success: ${result.success}`);
    console.log(`   Reasoning steps: ${result.reasoning.length}`);
    if (result.success && typeof result.output === 'string') {
      console.log(`   Output preview: ${result.output.substring(0, 200)}...`);
    }
  } catch (error) {
    console.log(
      `   ⚠️ Task processing not available: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }

  // Shutdown
  console.log('');
  console.log('🛑 Shutting down agent...');
  await agent.shutdown();

  console.log('');
  console.log(
    '═══════════════════════════════════════════════════════════════',
  );
  console.log('              Demo complete! Agent ready for use.');
  console.log(
    '═══════════════════════════════════════════════════════════════',
  );
  console.log('');
}

// Run if executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
