/**
 * Ollama Client - Multimodal LLM Integration
 *
 * Optimized for local deployment on Windows with NVIDIA 4060 GPU
 * Supports text generation, vision analysis, and code generation
 */

import {
  Ollama,
  type Message as OllamaMessage,
} from 'ollama';
import type {
  DetectedObject,
  ExecutionMetrics,
  GPUConfig,
  ImageInput,
  OllamaModelConfig,
  VisionAnalysisResult,
} from './types.js';

/** Ollama client configuration */
export interface OllamaClientConfig {
  /** Ollama API endpoint */
  endpoint: string;
  /** GPU configuration */
  gpuConfig: GPUConfig;
  /** Request timeout in ms */
  timeoutMs: number;
  /** Enable response streaming */
  enableStreaming: boolean;
  /** Retry configuration */
  retry: {
    maxAttempts: number;
    baseDelayMs: number;
  };
}

/** Generation options */
export interface GenerationOptions {
  /** Model to use */
  model: string;
  /** System prompt */
  systemPrompt?: string;
  /** Temperature (0-1) */
  temperature?: number;
  /** Top-p sampling */
  topP?: number;
  /** Maximum tokens to generate */
  maxTokens?: number;
  /** Stop sequences */
  stopSequences?: string[];
  /** Enable streaming callback */
  onStream?: (chunk: string) => void;
}

/** Vision generation options extending base options */
export interface VisionGenerationOptions extends GenerationOptions {
  /** Images to analyze */
  images: ImageInput[];
  /** Analysis focus */
  analysisFocus?: 'general' | 'objects' | 'text' | 'detailed';
}

export class OllamaClient {
  private client: Ollama;
  private config: OllamaClientConfig;
  private modelCache: Map<string, OllamaModelConfig> = new Map();
  private requestCount = 0;

  constructor(config: OllamaClientConfig) {
    this.config = config;
    this.client = new Ollama({
      host: config.endpoint,
    });
  }

  /**
   * Generate text response from a prompt
   */
  async generateText(
    prompt: string,
    options: GenerationOptions,
  ): Promise<{ response: string; metrics: Partial<ExecutionMetrics> }> {
    const startTime = Date.now();
    this.requestCount++;

    try {
      const response = await this.client.generate({
        model: options.model,
        prompt: options.systemPrompt
          ? `${options.systemPrompt}\n\nUser: ${prompt}`
          : prompt,
        stream: false,
        options: {
          temperature: options.temperature ?? 0.7,
          top_p: options.topP ?? 0.9,
          num_predict: options.maxTokens ?? 2048,
          stop: options.stopSequences,
        },
      });

      const metrics: Partial<ExecutionMetrics> = {
        inferenceTimeMs: Date.now() - startTime,
        inputTokens: response.prompt_eval_count || 0,
        outputTokens: response.eval_count || 0,
        llmCalls: 1,
      };

      return {
        response: response.response,
        metrics,
      };
    } catch (error) {
      throw this.handleError(error, 'generateText');
    }
  }

  /**
   * Generate text with streaming response
   */
  async generateTextStream(
    prompt: string,
    options: GenerationOptions,
  ): Promise<{ response: string; metrics: Partial<ExecutionMetrics> }> {
    const startTime = Date.now();
    this.requestCount++;
    let fullResponse = '';
    let inputTokens = 0;
    let outputTokens = 0;

    try {
      const stream = await this.client.generate({
        model: options.model,
        prompt: options.systemPrompt
          ? `${options.systemPrompt}\n\nUser: ${prompt}`
          : prompt,
        stream: true,
        options: {
          temperature: options.temperature ?? 0.7,
          top_p: options.topP ?? 0.9,
          num_predict: options.maxTokens ?? 2048,
          stop: options.stopSequences,
        },
      });

      for await (const part of stream) {
        if (part.response) {
          fullResponse += part.response;
          options.onStream?.(part.response);
        }
        if (part.prompt_eval_count) inputTokens = part.prompt_eval_count;
        if (part.eval_count) outputTokens = part.eval_count;
      }

      const metrics: Partial<ExecutionMetrics> = {
        inferenceTimeMs: Date.now() - startTime,
        inputTokens,
        outputTokens,
        llmCalls: 1,
      };

      return {
        response: fullResponse,
        metrics,
      };
    } catch (error) {
      throw this.handleError(error, 'generateTextStream');
    }
  }

  /**
   * Analyze image using vision model
   */
  async analyzeImage(
    imageInput: ImageInput,
    prompt: string,
    options: VisionGenerationOptions,
  ): Promise<VisionAnalysisResult> {
    const startTime = Date.now();
    this.requestCount++;

    try {
      // Prepare image data
      const imageData = await this.prepareImageData(imageInput);

      // Build analysis prompt based on focus
      const analysisPrompt = this.buildVisionPrompt(
        prompt,
        options.analysisFocus,
      );

      const response = await this.client.generate({
        model: options.model,
        prompt: analysisPrompt,
        images: [imageData],
        stream: false,
        options: {
          temperature: options.temperature ?? 0.3,
          top_p: options.topP ?? 0.9,
          num_predict: options.maxTokens ?? 1024,
        },
      });

      // Parse the response
      const analysisResult = this.parseVisionResponse(
        response.response,
        imageInput.id,
      );

      analysisResult.processingTimeMs = Date.now() - startTime;
      return analysisResult;
    } catch (error) {
      throw this.handleError(error, 'analyzeImage');
    }
  }

  /**
   * Multi-turn chat conversation
   */
  async chat(
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
    options: GenerationOptions,
  ): Promise<{ response: string; metrics: Partial<ExecutionMetrics> }> {
    const startTime = Date.now();
    this.requestCount++;

    try {
      const ollamaMessages: OllamaMessage[] = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await this.client.chat({
        model: options.model,
        messages: ollamaMessages,
        stream: false,
        options: {
          temperature: options.temperature ?? 0.7,
          top_p: options.topP ?? 0.9,
          num_predict: options.maxTokens ?? 2048,
          stop: options.stopSequences,
        },
      });

      const metrics: Partial<ExecutionMetrics> = {
        inferenceTimeMs: Date.now() - startTime,
        inputTokens: response.prompt_eval_count || 0,
        outputTokens: response.eval_count || 0,
        llmCalls: 1,
      };

      return {
        response: response.message.content,
        metrics,
      };
    } catch (error) {
      throw this.handleError(error, 'chat');
    }
  }

  /**
   * Vision-enabled chat with images
   */
  async chatWithVision(
    messages: Array<{
      role: 'system' | 'user' | 'assistant';
      content: string;
      images?: ImageInput[];
    }>,
    options: VisionGenerationOptions,
  ): Promise<{ response: string; metrics: Partial<ExecutionMetrics> }> {
    const startTime = Date.now();
    this.requestCount++;

    try {
      const ollamaMessages: OllamaMessage[] = await Promise.all(
        messages.map(async (msg) => {
          const ollamaMsg: OllamaMessage = {
            role: msg.role,
            content: msg.content,
          };

          if (msg.images && msg.images.length > 0) {
            ollamaMsg.images = await Promise.all(
              msg.images.map((img) => this.prepareImageData(img)),
            );
          }

          return ollamaMsg;
        }),
      );

      const response = await this.client.chat({
        model: options.model,
        messages: ollamaMessages,
        stream: false,
        options: {
          temperature: options.temperature ?? 0.3,
          top_p: options.topP ?? 0.9,
          num_predict: options.maxTokens ?? 1024,
        },
      });

      const metrics: Partial<ExecutionMetrics> = {
        inferenceTimeMs: Date.now() - startTime,
        inputTokens: response.prompt_eval_count || 0,
        outputTokens: response.eval_count || 0,
        llmCalls: 1,
        visionProcessingCount: options.images.length,
      };

      return {
        response: response.message.content,
        metrics,
      };
    } catch (error) {
      throw this.handleError(error, 'chatWithVision');
    }
  }

  /**
   * Generate code with specialized model
   */
  async generateCode(
    prompt: string,
    language: string,
    options: GenerationOptions,
  ): Promise<{
    code: string;
    explanation: string;
    metrics: Partial<ExecutionMetrics>;
  }> {
    const startTime = Date.now();
    this.requestCount++;

    const codePrompt = `You are an expert ${language} programmer. Generate clean, efficient, and well-documented code.

Task: ${prompt}

Requirements:
- Use best practices and modern patterns
- Include appropriate error handling
- Add helpful comments
- Ensure the code is production-ready

Respond with:
1. The complete code
2. A brief explanation of key decisions

Format your response as:
\`\`\`${language}
// Your code here
\`\`\`

Explanation:
Your explanation here`;

    try {
      const response = await this.client.generate({
        model: options.model,
        prompt: codePrompt,
        stream: false,
        options: {
          temperature: options.temperature ?? 0.2,
          top_p: options.topP ?? 0.95,
          num_predict: options.maxTokens ?? 4096,
        },
      });

      // Parse code and explanation
      const codeMatch = response.response.match(
        new RegExp(`\`\`\`${language}([\\s\\S]*?)\`\`\``),
      );
      const code = codeMatch ? codeMatch[1].trim() : response.response;

      const explanationMatch = response.response.match(
        /Explanation:\s*([\s\S]*?)$/i,
      );
      const explanation = explanationMatch
        ? explanationMatch[1].trim()
        : 'Code generated successfully.';

      const metrics: Partial<ExecutionMetrics> = {
        inferenceTimeMs: Date.now() - startTime,
        inputTokens: response.prompt_eval_count || 0,
        outputTokens: response.eval_count || 0,
        llmCalls: 1,
      };

      return {
        code,
        explanation,
        metrics,
      };
    } catch (error) {
      throw this.handleError(error, 'generateCode');
    }
  }

  /**
   * Check if Ollama is available and healthy
   */
  async healthCheck(): Promise<{
    healthy: boolean;
    models: string[];
    error?: string;
  }> {
    try {
      const models = await this.client.list();
      return {
        healthy: true,
        models: models.models.map((m) => m.name),
      };
    } catch (error) {
      return {
        healthy: false,
        models: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Pull a model if not available
   */
  async ensureModel(modelName: string): Promise<boolean> {
    try {
      const models = await this.client.list();
      const hasModel = models.models.some((m) => m.name.includes(modelName));

      if (!hasModel) {
        console.log(`Pulling model: ${modelName}...`);
        await this.client.pull({ model: modelName });
        console.log(`Model ${modelName} pulled successfully.`);
      }

      return true;
    } catch (error) {
      console.error(`Failed to ensure model ${modelName}:`, error);
      return false;
    }
  }

  /**
   * Get model information
   */
  async getModelInfo(modelName: string): Promise<OllamaModelConfig | null> {
    if (this.modelCache.has(modelName)) {
      return this.modelCache.get(modelName)!;
    }

    try {
      const info = await this.client.show({ model: modelName });

      const config: OllamaModelConfig = {
        name: modelName,
        capabilities: this.detectCapabilities(modelName),
        gpuMemoryGB: this.estimateGPUMemory(modelName),
        supportsStreaming: true,
        contextLength: this.extractContextLength(info),
      };

      this.modelCache.set(modelName, config);
      return config;
    } catch {
      return null;
    }
  }

  /**
   * Prepare image data for Ollama
   */
  private async prepareImageData(imageInput: ImageInput): Promise<string> {
    if (imageInput.source === 'base64') {
      // Remove data URI prefix if present
      const base64Data = imageInput.data.replace(
        /^data:image\/\w+;base64,/,
        '',
      );
      return base64Data;
    }

    if (imageInput.source === 'filepath') {
      // Read file and convert to base64
      const fs = await import('fs/promises');
      const buffer = await fs.readFile(imageInput.data);
      return buffer.toString('base64');
    }

    if (imageInput.source === 'url') {
      // Fetch URL and convert to base64
      const response = await fetch(imageInput.data);
      const buffer = await response.arrayBuffer();
      return Buffer.from(buffer).toString('base64');
    }

    throw new Error(`Unsupported image source: ${imageInput.source}`);
  }

  /**
   * Build vision analysis prompt
   */
  private buildVisionPrompt(
    userPrompt: string,
    focus?: 'general' | 'objects' | 'text' | 'detailed',
  ): string {
    const focusInstructions = {
      general: 'Provide a general description of what you see in this image.',
      objects:
        'Identify and list all objects visible in this image with their locations.',
      text: 'Extract and transcribe any text visible in this image.',
      detailed:
        'Provide a comprehensive analysis including objects, colors, composition, and any text.',
    };

    const instruction = focusInstructions[focus || 'general'];
    return `${instruction}\n\nUser request: ${userPrompt}`;
  }

  /**
   * Parse vision model response
   */
  private parseVisionResponse(
    response: string,
    imageId: string,
  ): VisionAnalysisResult {
    // Extract objects if mentioned
    const objects: DetectedObject[] = [];
    const objectMatches = response.match(
      /(?:contains?|shows?|includes?)\s+(?:a|an|the)\s+(\w+)/gi,
    );
    if (objectMatches) {
      objectMatches.forEach((match) => {
        const label = match.replace(
          /^(?:contains?|shows?|includes?)\s+(?:a|an|the)\s+/i,
          '',
        );
        if (
          label &&
          !objects.find((o) => o.label.toLowerCase() === label.toLowerCase())
        ) {
          objects.push({
            label,
            confidence: 0.8,
          });
        }
      });
    }

    return {
      success: true,
      imageId,
      objects,
      sceneDescription: response,
      caption: response.slice(0, 200) + (response.length > 200 ? '...' : ''),
      confidence: 0.85,
      processingTimeMs: 0,
    };
  }

  /**
   * Detect model capabilities based on name
   */
  private detectCapabilities(modelName: string): ('text' | 'image')[] {
    const lowerName = modelName.toLowerCase();

    if (
      lowerName.includes('llava') ||
      lowerName.includes('vision') ||
      lowerName.includes('bakllava')
    ) {
      return ['text', 'image'];
    }

    return ['text'];
  }

  /**
   * Estimate GPU memory requirement
   */
  private estimateGPUMemory(modelName: string): number {
    const lowerName = modelName.toLowerCase();

    if (lowerName.includes('70b')) return 40;
    if (lowerName.includes('34b')) return 20;
    if (lowerName.includes('13b')) return 8;
    if (lowerName.includes('7b')) return 5;
    if (lowerName.includes('3b')) return 3;
    if (lowerName.includes('1b')) return 2;

    return 4; // Default estimate
  }

  /**
   * Extract context length from model info
   */
  private extractContextLength(info: unknown): number {
    // Default context lengths for common models
    return 4096;
  }

  /**
   * Handle and wrap errors
   */
  private handleError(error: unknown, operation: string): Error {
    if (error instanceof Error) {
      return new Error(`Ollama ${operation} failed: ${error.message}`);
    }
    return new Error(`Ollama ${operation} failed with unknown error`);
  }

  /**
   * Get current request statistics
   */
  getStats(): { requestCount: number; cachedModels: number } {
    return {
      requestCount: this.requestCount,
      cachedModels: this.modelCache.size,
    };
  }
}
