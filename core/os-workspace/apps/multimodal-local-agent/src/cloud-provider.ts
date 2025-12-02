/**
 * Cloud Provider Abstraction
 *
 * Supports multiple cloud backends:
 * - Local Ollama
 * - Ollama Cloud
 * - Akash Network deployment
 */

import type {
  ExecutionMetrics,
  GPUConfig,
  OllamaModelConfig,
} from './types.js';

/** Cloud provider types */
export type CloudProviderType = 'local' | 'ollama-cloud' | 'akash';

/** Cloud provider configuration */
export interface CloudProviderConfig {
  /** Provider type */
  type: CloudProviderType;
  /** API endpoint */
  endpoint: string;
  /** API key (for cloud providers) */
  apiKey?: string;
  /** Region/location preference */
  region?: string;
  /** Akash-specific configuration */
  akashConfig?: AkashConfig;
  /** Cloud-specific options */
  cloudOptions?: CloudOptions;
}

/** Akash Network deployment configuration */
export interface AkashConfig {
  /** Akash wallet address */
  walletAddress?: string;
  /** Deployment sequence number */
  dseq?: string;
  /** Provider address */
  providerAddress?: string;
  /** Resource requirements */
  resources: AkashResources;
  /** Pricing configuration */
  pricing: AkashPricing;
}

/** Akash resource specification */
export interface AkashResources {
  /** CPU units (e.g., 0.5, 1, 2) */
  cpu: number;
  /** Memory in Mi/Gi (e.g., '512Mi', '2Gi') */
  memory: string;
  /** Storage in Mi/Gi */
  storage: string;
  /** GPU requirements */
  gpu?: {
    units: number;
    vendor: 'nvidia' | 'amd';
    model?: string;
  };
}

/** Akash pricing configuration */
export interface AkashPricing {
  /** Price denomination (uakt) */
  denom: string;
  /** Max price per block */
  amount: number;
}

/** Cloud-specific options */
export interface CloudOptions {
  /** Enable auto-scaling */
  autoScale?: boolean;
  /** Min instances for scaling */
  minInstances?: number;
  /** Max instances for scaling */
  maxInstances?: number;
  /** Timeout for requests (ms) */
  timeoutMs?: number;
  /** Retry configuration */
  retry?: {
    maxAttempts: number;
    backoffMs: number;
  };
}

/** Provider health status */
export interface ProviderHealth {
  healthy: boolean;
  latencyMs: number;
  availableModels: string[];
  resourceUsage?: {
    cpu: number;
    memory: number;
    gpu?: number;
  };
  error?: string;
}

/** Provider metrics */
export interface ProviderMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageLatencyMs: number;
  tokensProcessed: number;
  costEstimate?: number;
}

/**
 * Cloud Provider abstraction for multimodal agent
 */
export class CloudProvider {
  private config: CloudProviderConfig;
  private metrics: ProviderMetrics = {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    averageLatencyMs: 0,
    tokensProcessed: 0,
  };

  constructor(config: CloudProviderConfig) {
    this.config = config;
  }

  /**
   * Get the effective endpoint for the provider
   */
  getEndpoint(): string {
    switch (this.config.type) {
      case 'local':
        return this.config.endpoint || 'http://localhost:11434';
      case 'ollama-cloud':
        return this.config.endpoint || 'https://api.ollama.ai';
      case 'akash':
        return this.config.endpoint; // Must be provided
      default:
        return this.config.endpoint;
    }
  }

  /**
   * Get authorization headers for cloud providers
   */
  getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};

    if (this.config.apiKey) {
      headers['Authorization'] = `Bearer ${this.config.apiKey}`;
    }

    return headers;
  }

  /**
   * Check provider health
   */
  async healthCheck(): Promise<ProviderHealth> {
    const startTime = Date.now();

    try {
      const endpoint = this.getEndpoint();
      const response = await fetch(`${endpoint}/api/tags`, {
        headers: this.getAuthHeaders(),
        signal: AbortSignal.timeout(
          this.config.cloudOptions?.timeoutMs || 10000,
        ),
      });

      if (!response.ok) {
        return {
          healthy: false,
          latencyMs: Date.now() - startTime,
          availableModels: [],
          error: `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      const data = (await response.json()) as {
        models?: Array<{ name: string }>;
      };

      return {
        healthy: true,
        latencyMs: Date.now() - startTime,
        availableModels: data.models?.map((m) => m.name) || [],
      };
    } catch (error) {
      return {
        healthy: false,
        latencyMs: Date.now() - startTime,
        availableModels: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get provider metrics
   */
  getMetrics(): ProviderMetrics {
    return { ...this.metrics };
  }

  /**
   * Update metrics after a request
   */
  updateMetrics(success: boolean, latencyMs: number, tokens: number): void {
    this.metrics.totalRequests++;
    if (success) {
      this.metrics.successfulRequests++;
    } else {
      this.metrics.failedRequests++;
    }

    // Calculate running average for latency
    this.metrics.averageLatencyMs =
      (this.metrics.averageLatencyMs * (this.metrics.totalRequests - 1) +
        latencyMs) /
      this.metrics.totalRequests;

    this.metrics.tokensProcessed += tokens;

    // Estimate cost for cloud providers
    if (this.config.type === 'akash' && this.config.akashConfig) {
      // Rough estimate: tokens * price per million tokens
      this.metrics.costEstimate =
        (this.metrics.tokensProcessed / 1000000) * 0.5;
    }
  }

  /**
   * Get provider type
   */
  getType(): CloudProviderType {
    return this.config.type;
  }

  /**
   * Get full configuration
   */
  getConfig(): CloudProviderConfig {
    return { ...this.config };
  }

  /**
   * Generate Akash deployment manifest
   */
  generateAkashManifest(
    imageName: string,
    envVars: Record<string, string> = {},
  ): string {
    if (this.config.type !== 'akash' || !this.config.akashConfig) {
      throw new Error('Akash configuration required for manifest generation');
    }

    const { resources, pricing } = this.config.akashConfig;
    const envEntries = Object.entries(envVars)
      .map(([key, value]) => `      - ${key}=${value}`)
      .join('\n');
    
    // Build GPU section if required
    const gpuSection = this.buildGpuSection(resources.gpu);

    return `---
version: "2.0"

services:
  multimodal-agent:
    image: ${imageName}
    env:
${envEntries}
    expose:
      - port: 3000
        as: 80
        to:
          - global: true

profiles:
  compute:
    multimodal-agent:
      resources:
        cpu:
          units: ${resources.cpu}
        memory:
          size: ${resources.memory}
        storage:
          size: ${resources.storage}
${gpuSection}
          
  placement:
    dcloud:
      attributes:
        host: akash
      signedBy:
        anyOf:
          - "akash1365yvmc4s7awdyj3n2sav7xfx76adc6dnmlx63"
      pricing:
        multimodal-agent:
          denom: ${pricing.denom}
          amount: ${pricing.amount}

deployment:
  multimodal-agent:
    dcloud:
      profile: multimodal-agent
      count: 1`;
  }

  /**
   * Build GPU section for Akash manifest
   */
  private buildGpuSection(
    gpu?: AkashResources['gpu'],
  ): string {
    if (!gpu) {
      return '';
    }

    return `        gpu:
          units: ${gpu.units}
          attributes:
            vendor:
              ${gpu.vendor}: true`;
  }
}

/**
 * Create a cloud provider with default local configuration
 */
export function createLocalProvider(endpoint?: string): CloudProvider {
  return new CloudProvider({
    type: 'local',
    endpoint: endpoint || 'http://localhost:11434',
  });
}

/**
 * Create an Ollama Cloud provider
 */
export function createOllamaCloudProvider(
  apiKey: string,
  region?: string,
): CloudProvider {
  return new CloudProvider({
    type: 'ollama-cloud',
    endpoint: 'https://api.ollama.ai',
    apiKey,
    region,
    cloudOptions: {
      timeoutMs: 30000,
      retry: {
        maxAttempts: 3,
        backoffMs: 1000,
      },
    },
  });
}

/**
 * Create an Akash Network provider
 */
export function createAkashProvider(
  endpoint: string,
  akashConfig: AkashConfig,
): CloudProvider {
  return new CloudProvider({
    type: 'akash',
    endpoint,
    akashConfig,
    cloudOptions: {
      timeoutMs: 60000,
      retry: {
        maxAttempts: 5,
        backoffMs: 2000,
      },
    },
  });
}
