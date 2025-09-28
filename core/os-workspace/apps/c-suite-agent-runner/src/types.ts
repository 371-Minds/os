/**
 * C-Suite Agent Runner Types
 * 
 * Type definitions for the C-Suite agent runner application implementing
 * the NexeCompatibleAgent interface with ElizaOS character integration.
 */

import type { Character } from '@elizaos/core';

/**
 * Agent blueprint configuration for C-Suite agents
 */
export interface CSuiteAgentConfig {
  agent_id: string;
  character: Character;
  role: CSuiteRole;
  capabilities: string[];
  deployment_target?: 'local' | 'akash' | 'hybrid';
  resource_limits?: {
    max_memory_mb: number;
    max_cpu_percent: number;
    max_storage_gb: number;
  };
}

/**
 * Execution context for agent operations
 */
export interface AgentExecutionContext {
  workspace_root: string;
  environment: 'development' | 'production' | 'test';
  log_level: 'debug' | 'info' | 'warn' | 'error';
  enable_self_awareness: boolean;
  plugins: string[];
}

/**
 * Agent execution result
 */
export interface AgentExecutionResult {
  success: boolean;
  message: string;
  data?: any;
  execution_time_ms: number;
  agent_id: string;
}

/**
 * C-Suite roles supported by the runner
 */
export type CSuiteRole = 'CEO' | 'CTO' | 'CFO' | 'CLO';

/**
 * Agent lifecycle status
 */
export type AgentStatus = 'initializing' | 'ready' | 'executing' | 'error' | 'shutdown';

/**
 * Health check status
 */
export type HealthStatus = 'healthy' | 'degraded' | 'unhealthy';

/**
 * NexeCompatibleAgent interface for standardized agent blueprint
 */
export interface NexeCompatibleAgent {
  /**
   * Initialize the agent with given configuration
   */
  initialize(config: CSuiteAgentConfig, context: AgentExecutionContext): Promise<void>;
  
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
  healthCheck(): Promise<{ status: HealthStatus; details: string }>;
  
  /**
   * Get agent capabilities and status
   */
  getStatus(): {
    agent_id: string;
    status: AgentStatus;
    capabilities: string[];
    version: string;
    role: CSuiteRole;
  };
}

/**
 * Agent coordination event types
 */
export interface CSuiteCoordinationEvent {
  event_type: 'decision_request' | 'status_update' | 'coordination_request' | 'execution_result';
  source_agent: CSuiteRole;
  target_agent?: CSuiteRole;
  timestamp: Date;
  data: any;
}

/**
 * Multi-agent coordination manager interface
 */
export interface CSuiteCoordinationManager {
  registerAgent(agent: NexeCompatibleAgent): Promise<void>;
  broadcastEvent(event: CSuiteCoordinationEvent): Promise<void>;
  requestDecision(request: DecisionRequest): Promise<DecisionResponse>;
  getActiveAgents(): CSuiteRole[];
}

/**
 * Decision request structure for C-Suite coordination
 */
export interface DecisionRequest {
  request_id: string;
  requester: CSuiteRole;
  decision_type: 'strategic' | 'technical' | 'financial' | 'legal';
  context: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  required_approvers?: CSuiteRole[];
  deadline?: Date;
}

/**
 * Decision response from C-Suite agents
 */
export interface DecisionResponse {
  request_id: string;
  responder: CSuiteRole;
  decision: 'approve' | 'reject' | 'abstain' | 'delegate';
  reasoning: string;
  conditions?: string[];
  timestamp: Date;
}