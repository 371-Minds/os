/**
 * Standardized Agent Blueprint Types
 * 
 * These types define the interface for all Nexe-compatible agents
 * following the 371 OS standardized agent architecture.
 */

export interface AgentBlueprintConfig {
  /**
   * Agent identification and metadata
   */
  agent_id: string;
  agent_name: string;
  agent_version: string;
  agent_type: 'UTILITY' | 'STRATEGIC' | 'FUNCTIONAL' | 'COORDINATION';
  
  /**
   * Core functionality description
   */
  core_instructions: string;
  description: string;
  functionality: string[];
  
  /**
   * Execution configuration for Nexe compatibility
   */
  execution_config: {
    entry_point: string;
    binary_name: string;
    supported_platforms: string[];
    resource_requirements: {
      min_memory_mb: number;
      max_cpu_percent: number;
      disk_space_mb: number;
    };
  };
  
  /**
   * Dependencies and bundling strategy
   */
  dependencies: {
    elizaos_core_version: string;
    external_dependencies: ExternalDependency[];
    bundled_assets: string[];
  };
  
  /**
   * Configuration handling strategy
   */
  configuration: {
    embedded_config: Record<string, any>;
    environment_variables: string[];
    runtime_parameters: RuntimeParameter[];
  };
}

export interface ExternalDependency {
  name: string;
  version: string;
  type: 'runtime' | 'bundled' | 'optional';
  nexe_compatible: boolean;
}

export interface RuntimeParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  required: boolean;
  default_value?: any;
  description: string;
  validation?: string; // regex pattern for validation
}

export interface AgentExecutionContext {
  agent_id: string;
  execution_id: string;
  start_time: Date;
  command_args: string[];
  environment: Record<string, string>;
  working_directory: string;
}

export interface AgentExecutionResult {
  success: boolean;
  exit_code: number;
  execution_time_ms: number;
  output: string;
  error?: string;
  metrics: {
    memory_used_mb: number;
    cpu_time_ms: number;
    network_calls: number;
  };
}

/**
 * Base interface that all Nexe-compatible agents must implement
 */
export interface NexeCompatibleAgent {
  /**
   * Initialize the agent with given configuration
   */
  initialize(config: AgentBlueprintConfig, context: AgentExecutionContext): Promise<void>;
  
  /**
   * Execute the agent's primary function
   */
  execute(args: string[]): Promise<AgentExecutionResult>;
  
  /**
   * Graceful shutdown
   */
  shutdown(): Promise<void>;
  
  /**
   * Health check for the agent
   */
  healthCheck(): Promise<{ status: 'healthy' | 'degraded' | 'unhealthy'; details: string }>;
  
  /**
   * Get agent capabilities and status
   */
  getStatus(): {
    agent_id: string;
    status: 'initializing' | 'ready' | 'executing' | 'error';
    capabilities: string[];
    version: string;
  };
}

/**
 * Factory pattern for creating Nexe-compatible agents
 */
export interface AgentFactory {
  createAgent(config: AgentBlueprintConfig): NexeCompatibleAgent;
  validateConfig(config: AgentBlueprintConfig): { valid: boolean; errors: string[] };
  getSupportedAgentTypes(): string[];
}

/**
 * Packaging metadata for Nexe compilation
 */
export interface NexePackagingConfig {
  input_file: string;
  output_file: string;
  target_platform: 'win-x64' | 'linux-x64' | 'mac-x64';
  node_version: string;
  build_options: {
    compress: boolean;
    strip_debug: boolean;
    include_node_modules: boolean;
    custom_flags: string[];
  };
  assets: {
    static_files: string[];
    embedded_resources: string[];
  };
}