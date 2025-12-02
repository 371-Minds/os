/**
 * Types for the Ultimate Multimodal Local Autonomous Agent
 *
 * Designed for Windows with NVIDIA 4060 GPU and local Ollama deployment
 * Supports text, vision, and autonomous task execution
 */

/** Supported input modalities */
export type InputModality = 'text' | 'image' | 'audio' | 'video' | 'file';

/** Supported output modalities */
export type OutputModality =
  | 'text'
  | 'image'
  | 'code'
  | 'action'
  | 'structured';

/** Ollama model configuration */
export interface OllamaModelConfig {
  /** Model name (e.g., 'llava', 'llama3.2-vision', 'codestral') */
  name: string;
  /** Model capabilities */
  capabilities: InputModality[];
  /** GPU memory requirement in GB */
  gpuMemoryGB: number;
  /** Whether model supports streaming */
  supportsStreaming: boolean;
  /** Context window size */
  contextLength: number;
  /** Optimal batch size for GPU */
  optimalBatchSize?: number;
}

/** GPU configuration for NVIDIA 4060 optimization */
export interface GPUConfig {
  /** GPU device ID */
  deviceId: number;
  /** Available VRAM in GB (4060 has 8GB) */
  availableVRAM: number;
  /** Enable CUDA optimizations */
  enableCUDA: boolean;
  /** Memory allocation strategy */
  memoryStrategy: 'aggressive' | 'balanced' | 'conservative';
  /** Concurrent processing limit */
  maxConcurrentRequests: number;
}

/** Autonomous task definition */
export interface AutonomousTask {
  /** Unique task identifier */
  id: string;
  /** Task title */
  title: string;
  /** Detailed description */
  description: string;
  /** Task priority */
  priority: 'low' | 'medium' | 'high' | 'critical';
  /** Required capabilities */
  requiredCapabilities: InputModality[];
  /** Expected output type */
  expectedOutput: OutputModality;
  /** Maximum execution time in ms */
  timeoutMs: number;
  /** Whether to allow sub-task spawning */
  allowSubTasks: boolean;
  /** Context data for the task */
  context?: TaskContext;
  /** Creation timestamp */
  createdAt: Date;
}

/** Task context with multimodal inputs */
export interface TaskContext {
  /** Text inputs */
  textInputs?: string[];
  /** Image inputs (base64 or file paths) */
  imageInputs?: ImageInput[];
  /** File inputs */
  fileInputs?: FileInput[];
  /** Memory context from previous interactions */
  memoryContext?: MemoryEntry[];
  /** Environment variables */
  environment?: Record<string, string>;
}

/** Image input specification */
export interface ImageInput {
  /** Unique identifier */
  id: string;
  /** Source type */
  source: 'base64' | 'filepath' | 'url';
  /** Image data or path */
  data: string;
  /** MIME type */
  mimeType: 'image/png' | 'image/jpeg' | 'image/gif' | 'image/webp';
  /** Optional description */
  description?: string;
}

/** File input specification */
export interface FileInput {
  /** Unique identifier */
  id: string;
  /** File path */
  path: string;
  /** File type */
  type: 'code' | 'document' | 'data' | 'config';
  /** File size in bytes */
  sizeBytes: number;
  /** File hash for caching */
  hash?: string;
}

/** Memory entry for episodic memory */
export interface MemoryEntry {
  /** Entry ID */
  id: string;
  /** Entry type */
  type: 'observation' | 'action' | 'result' | 'learning';
  /** Content */
  content: string;
  /** Importance score (0-1) */
  importance: number;
  /** Timestamp */
  timestamp: Date;
  /** Related task ID */
  taskId?: string;
}

/** Agent processing result */
export interface ProcessingResult {
  /** Success status */
  success: boolean;
  /** Task ID */
  taskId: string;
  /** Output type */
  outputType: OutputModality;
  /** Primary output content */
  output: string | StructuredOutput | ActionOutput;
  /** Reasoning chain */
  reasoning: ReasoningStep[];
  /** Generated sub-tasks */
  subTasks?: AutonomousTask[];
  /** Execution metrics */
  metrics: ExecutionMetrics;
  /** Errors if any */
  errors?: ProcessingError[];
}

/** Structured output for complex responses */
export interface StructuredOutput {
  /** Output format */
  format: 'json' | 'yaml' | 'markdown' | 'code';
  /** Structured data */
  data: Record<string, unknown>;
  /** Schema reference */
  schema?: string;
}

/** Action output for autonomous actions */
export interface ActionOutput {
  /** Action type */
  actionType:
    | 'file_operation'
    | 'code_execution'
    | 'api_call'
    | 'system_command';
  /** Action status */
  status: 'pending' | 'executed' | 'failed' | 'cancelled';
  /** Action details */
  details: Record<string, unknown>;
  /** Rollback information */
  rollback?: RollbackInfo;
}

/** Rollback information for action safety */
export interface RollbackInfo {
  /** Whether rollback is possible */
  canRollback: boolean;
  /** Rollback command */
  rollbackCommand?: string;
  /** Original state snapshot */
  originalState?: Record<string, unknown>;
}

/** Reasoning step in the agent's thought process */
export interface ReasoningStep {
  /** Step number */
  step: number;
  /** Thought type */
  type: 'observation' | 'analysis' | 'hypothesis' | 'action' | 'reflection';
  /** Thought content */
  content: string;
  /** Confidence score */
  confidence: number;
  /** Supporting evidence */
  evidence?: string[];
}

/** Execution metrics for performance monitoring */
export interface ExecutionMetrics {
  /** Total execution time in ms */
  totalTimeMs: number;
  /** LLM inference time in ms */
  inferenceTimeMs: number;
  /** GPU utilization percentage */
  gpuUtilization: number;
  /** Memory usage in MB */
  memoryUsageMB: number;
  /** Token count (input) */
  inputTokens: number;
  /** Token count (output) */
  outputTokens: number;
  /** Number of LLM calls */
  llmCalls: number;
  /** Vision processing count */
  visionProcessingCount: number;
}

/** Processing error */
export interface ProcessingError {
  /** Error code */
  code: string;
  /** Error message */
  message: string;
  /** Error severity */
  severity: 'warning' | 'error' | 'critical';
  /** Recovery suggestion */
  recoverySuggestion?: string;
}

/** Agent configuration */
export interface MultimodalAgentConfig {
  /** Agent name */
  name: string;
  /** Agent description */
  description: string;
  /** Ollama endpoint */
  ollamaEndpoint: string;
  /** Primary model for text processing */
  textModel: OllamaModelConfig;
  /** Vision model for image processing */
  visionModel: OllamaModelConfig;
  /** Code model for code generation */
  codeModel?: OllamaModelConfig;
  /** GPU configuration */
  gpuConfig: GPUConfig;
  /** Autonomous mode settings */
  autonomousConfig: AutonomousConfig;
  /** Memory configuration */
  memoryConfig: MemoryConfig;
  /** Safety configuration */
  safetyConfig: SafetyConfig;
}

/** Autonomous operation configuration */
export interface AutonomousConfig {
  /** Enable autonomous mode */
  enabled: boolean;
  /** Maximum depth of sub-task spawning */
  maxSubTaskDepth: number;
  /** Maximum concurrent autonomous tasks */
  maxConcurrentTasks: number;
  /** Require human approval for certain actions */
  requireApproval: ActionApprovalLevel[];
  /** Self-improvement enabled */
  selfImprovementEnabled: boolean;
  /** Goal-seeking behavior */
  goalSeekingEnabled: boolean;
}

/** Action approval levels */
export type ActionApprovalLevel =
  | 'file_write'
  | 'code_execution'
  | 'system_command'
  | 'external_api'
  | 'sensitive_data'
  | 'high_resource';

/** Memory configuration */
export interface MemoryConfig {
  /** Enable episodic memory */
  enableEpisodicMemory: boolean;
  /** Maximum memory entries */
  maxEntries: number;
  /** Memory persistence path */
  persistencePath: string;
  /** Memory compression enabled */
  compressionEnabled: boolean;
  /** Relevance decay factor */
  relevanceDecay: number;
}

/** Safety configuration */
export interface SafetyConfig {
  /** Enable safety checks */
  enabled: boolean;
  /** Maximum resource usage (0-1) */
  maxResourceUsage: number;
  /** Blocked actions */
  blockedActions: string[];
  /** Require confirmation for destructive actions */
  confirmDestructive: boolean;
  /** Sandbox mode for testing */
  sandboxMode: boolean;
  /** Rate limiting (requests per minute) */
  rateLimitPerMinute: number;
}

/** Agent health status */
export interface AgentHealthStatus {
  /** Overall health */
  healthy: boolean;
  /** Component statuses */
  components: {
    ollama: ComponentHealth;
    gpu: ComponentHealth;
    memory: ComponentHealth;
    autonomy: ComponentHealth;
  };
  /** Last check timestamp */
  lastCheck: Date;
  /** Recommendations */
  recommendations?: string[];
}

/** Component health status */
export interface ComponentHealth {
  /** Component name */
  name: string;
  /** Health status */
  status: 'healthy' | 'degraded' | 'unhealthy';
  /** Response time in ms */
  responseTimeMs?: number;
  /** Error message if unhealthy */
  error?: string;
  /** Additional details */
  details?: Record<string, unknown>;
}

/** Vision analysis result */
export interface VisionAnalysisResult {
  /** Analysis success */
  success: boolean;
  /** Image ID */
  imageId: string;
  /** Detected objects */
  objects: DetectedObject[];
  /** Scene description */
  sceneDescription: string;
  /** Text extracted (OCR) */
  extractedText?: string;
  /** Generated caption */
  caption: string;
  /** Confidence score */
  confidence: number;
  /** Processing time in ms */
  processingTimeMs: number;
}

/** Detected object in vision analysis */
export interface DetectedObject {
  /** Object label */
  label: string;
  /** Confidence score */
  confidence: number;
  /** Bounding box (normalized coordinates) */
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  /** Object attributes */
  attributes?: Record<string, string>;
}

/** Tool definition for agent capabilities */
export interface AgentTool {
  /** Tool name */
  name: string;
  /** Tool description */
  description: string;
  /** Input schema */
  inputSchema: Record<string, unknown>;
  /** Output schema */
  outputSchema: Record<string, unknown>;
  /** Required permissions */
  requiredPermissions: string[];
  /** Execute function reference */
  execute: (input: unknown) => Promise<unknown>;
}

/** Event emitted by the agent */
export interface AgentEvent {
  /** Event type */
  type:
    | 'task_started'
    | 'task_completed'
    | 'task_failed'
    | 'reasoning'
    | 'action'
    | 'memory_update';
  /** Event timestamp */
  timestamp: Date;
  /** Event data */
  data: Record<string, unknown>;
  /** Related task ID */
  taskId?: string;
}
