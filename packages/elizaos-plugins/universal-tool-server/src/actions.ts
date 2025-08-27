/**
 * Universal Tool Server Actions - Beyond MCP Limitations
 * 
 * These actions implement the next-generation agent-tool interaction paradigm
 * with blockchain-based registries, cryptographic trust, and economic coordination.
 */

import { Action, IAgentRuntime, Memory, State, HandlerCallback } from '@elizaos/core';
import { BlockchainRegistryProvider } from './blockchain-registry';
import { MCPEvolutionProvider } from './mcp-evolution';
import { AkashIntegrationProvider } from './akash-integration';
import { 
  AgentRegistryEntry, 
  UniversalToolCall, 
  UniversalToolResponse,
  AgentAuthentication,
  ReputationScore,
  PerformanceMetrics
} from './types';

/**
 * Action: Register Agent in Blockchain Registry
 * 
 * Enables agents to register their capabilities in the decentralized registry,
 * making them discoverable by other agents without centralized coordination.
 */
export const registerAgentAction: Action = {
  name: 'REGISTER_AGENT_BLOCKCHAIN',
  similes: [
    'PUBLISH_AGENT_CAPABILITIES',
    'JOIN_DECENTRALIZED_NETWORK', 
    'CREATE_AGENT_IDENTITY',
    'ESTABLISH_CRYPTOGRAPHIC_TRUST'
  ],
  description: 'Register agent capabilities in blockchain-based Universal Tool Server registry',
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    const content = message.content;
    return !!(content.capabilities && content.economicTerms);
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    options: any,
    callback?: HandlerCallback
  ): Promise<boolean> => {
    try {
      const registryProvider = new BlockchainRegistryProvider();
      
      const registryEntry: AgentRegistryEntry = {
        agentId: runtime.agentId,
        did: options.did || `did:371minds:${runtime.agentId}`,
        capabilities: message.content.capabilities,
        verifiableCredentials: options.credentials || [],
        reputation: options.initialReputation || { overall: 0.5, categories: [], history: [], attestations: [], slashingHistory: [] },
        economicTerms: message.content.economicTerms,
        deploymentInfo: options.deploymentInfo || { platforms: [], constraints: {}, monitoring: {} }
      };
      
      const txHash = await registryProvider.registerAgent(registryEntry);
      
      if (callback) {
        callback({
          text: `Agent successfully registered in blockchain registry with transaction ${txHash}. Agent DID: ${registryEntry.did}`,
          content: {
            success: true,
            transactionHash: txHash,
            agentDid: registryEntry.did,
            capabilities: registryEntry.capabilities,
            registryUrl: `https://registry.371minds.com/agent/${registryEntry.agentId}`
          }
        });
      }
      
      return true;
    } catch (error) {
      console.error('Failed to register agent in blockchain registry:', error);
      if (callback) {
        callback({
          text: `Failed to register agent: ${error.message}`,
          content: { error: error.message, success: false }
        });
      }
      return false;
    }
  }
};

/**
 * Action: Discover Universal Tools
 * 
 * Discovers available tools from the decentralized registry based on 
 * capability requirements, reputation filters, and cost constraints.
 */
export const discoverUniversalToolsAction: Action = {
  name: 'DISCOVER_UNIVERSAL_TOOLS',
  similes: [
    'FIND_BLOCKCHAIN_TOOLS',
    'SEARCH_DECENTRALIZED_REGISTRY',
    'QUERY_AGENT_MARKETPLACE',
    'DISCOVER_TRUSTED_PROVIDERS'
  ],
  description: 'Discover tools from blockchain-based Universal Tool Server registry',
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    return !!(message.content.requirements);
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    options: any,
    callback?: HandlerCallback
  ): Promise<boolean> => {
    try {
      const registryProvider = new BlockchainRegistryProvider();
      
      const searchCriteria = {
        capabilities: message.content.requirements,
        minReputation: options.minReputation || 0.7,
        maxCost: options.maxCost || 1.0,
        preferredProviders: options.preferredProviders || [],
        excludedProviders: options.excludedProviders || []
      };
      
      const availableTools = await registryProvider.discoverTools(searchCriteria);
      
      // Rank by reputation, cost, and availability
      const rankedTools = availableTools.sort((a, b) => {
        const scoreA = (a.reputation.overall * 0.4) + 
                      ((1 - a.economicTerms.basePrice) * 0.3) +
                      (a.deploymentInfo.platforms.length * 0.3);
        const scoreB = (b.reputation.overall * 0.4) + 
                      ((1 - b.economicTerms.basePrice) * 0.3) +
                      (b.deploymentInfo.platforms.length * 0.3);
        return scoreB - scoreA;
      });
      
      if (callback) {
        callback({
          text: `Discovered ${rankedTools.length} compatible tools from decentralized registry`,
          content: {
            tools: rankedTools.slice(0, 10), // Top 10 results
            searchCriteria,
            totalFound: rankedTools.length,
            recommendation: rankedTools[0] ? {
              agentId: rankedTools[0].agentId,
              reputation: rankedTools[0].reputation.overall,
              estimatedCost: rankedTools[0].economicTerms.basePrice,
              platforms: rankedTools[0].deploymentInfo.platforms.map(p => p.platform)
            } : null
          }
        });
      }
      
      return true;
    } catch (error) {
      console.error('Failed to discover universal tools:', error);
      if (callback) {
        callback({
          text: `Failed to discover tools: ${error.message}`,
          content: { error: error.message }
        });
      }
      return false;
    }
  }
};

/**
 * Action: Execute Universal Tool Call
 * 
 * Executes a tool call using the Universal Tool Calling Protocol (UTCP)
 * with automatic authentication, cost management, and provenance tracking.
 */
export const executeUniversalToolAction: Action = {
  name: 'EXECUTE_UNIVERSAL_TOOL',
  similes: [
    'CALL_BLOCKCHAIN_TOOL',
    'INVOKE_DECENTRALIZED_SERVICE',
    'EXECUTE_TRUSTED_FUNCTION',
    'RUN_CRYPTOGRAPHICALLY_VERIFIED_TOOL'
  ],
  description: 'Execute tool using Universal Tool Calling Protocol with blockchain verification',
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    const content = message.content;
    return !!(content.agentId && content.tool && content.parameters);
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    options: any,
    callback?: HandlerCallback
  ): Promise<boolean> => {
    try {
      const mcpProvider = new MCPEvolutionProvider();
      
      // Prepare authentication based on user's delegation
      const authentication: AgentAuthentication = {
        method: 'delegated-oauth',
        credentials: {
          userId: runtime.userId || 'anonymous',
          delegationToken: options.delegationToken,
          scope: options.scope || ['read', 'write'],
          expiresAt: new Date(Date.now() + 3600000).toISOString() // 1 hour
        }
      };
      
      const toolCall: UniversalToolCall = {
        id: `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        tool: message.content.tool,
        parameters: message.content.parameters,
        authentication,
        context: {
          userId: runtime.userId,
          sessionId: state.sessionId,
          platform: runtime.platform || 'eliza-os',
          capabilities: runtime.capabilities || [],
          preferences: options.userPreferences || {},
          budget: options.budgetConstraints
        }
      };
      
      const response: UniversalToolResponse = await mcpProvider.executeToolCall(
        message.content.agentId, 
        toolCall
      );
      
      if (callback) {
        if (response.success) {
          callback({
            text: `Tool executed successfully. Cost: ${response.cost || 0} tokens. Execution ID: ${response.id}`,
            content: {
              success: true,
              result: response.result,
              executionId: response.id,
              cost: response.cost,
              provenance: response.provenance,
              verificationHash: response.provenance?.cryptographicHash
            }
          });
        } else {
          callback({
            text: `Tool execution failed: ${response.error}`,
            content: {
              success: false,
              error: response.error,
              executionId: response.id
            }
          });
        }
      }
      
      return response.success;
    } catch (error) {
      console.error('Failed to execute universal tool:', error);
      if (callback) {
        callback({
          text: `Failed to execute tool: ${error.message}`,
          content: { error: error.message }
        });
      }
      return false;
    }
  }
};

/**
 * Action: Update Agent Reputation
 * 
 * Updates agent reputation based on completed interactions,
 * user feedback, and automated performance metrics.
 */
export const updateReputationAction: Action = {
  name: 'UPDATE_AGENT_REPUTATION',
  similes: [
    'RATE_AGENT_PERFORMANCE',
    'SUBMIT_TRUST_ATTESTATION',
    'UPDATE_BLOCKCHAIN_REPUTATION',
    'PROVIDE_PERFORMANCE_FEEDBACK'
  ],
  description: 'Update agent reputation in blockchain registry based on performance metrics',
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    const content = message.content;
    return !!(content.agentId && (content.rating || content.metrics));
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    options: any,
    callback?: HandlerCallback
  ): Promise<boolean> => {
    try {
      const registryProvider = new BlockchainRegistryProvider();
      
      const reputationUpdate = {
        agentId: message.content.agentId,
        raterDid: `did:371minds:${runtime.agentId}`,
        rating: message.content.rating || calculateRatingFromMetrics(message.content.metrics),
        category: message.content.category || 'overall',
        evidence: message.content.evidence || [],
        executionId: message.content.executionId,
        timestamp: new Date().toISOString()
      };
      
      const txHash = await registryProvider.updateReputation(reputationUpdate);
      
      if (callback) {
        callback({
          text: `Reputation update submitted for agent ${message.content.agentId}. Transaction: ${txHash}`,
          content: {
            success: true,
            transactionHash: txHash,
            reputationUpdate,
            networkConfirmation: `https://explorer.akash.network/tx/${txHash}`
          }
        });
      }
      
      return true;
    } catch (error) {
      console.error('Failed to update agent reputation:', error);
      if (callback) {
        callback({
          text: `Failed to update reputation: ${error.message}`,
          content: { error: error.message }
        });
      }
      return false;
    }
  }
};

/**
 * Action: Deploy to Akash Network
 * 
 * Deploys agent or tool to Akash Network with automatic resource optimization,
 * cost monitoring, and multi-region availability.
 */
export const deployToAkashAction: Action = {
  name: 'DEPLOY_TO_AKASH',
  similes: [
    'DEPLOY_DECENTRALIZED_INFRASTRUCTURE',
    'LAUNCH_ON_AKASH_NETWORK',
    'CREATE_DISTRIBUTED_DEPLOYMENT',
    'ESTABLISH_DECENTRALIZED_PRESENCE'
  ],
  description: 'Deploy agent or tool to Akash Network with cost optimization',
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    const content = message.content;
    return !!(content.dockerImage || content.manifestPath);
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    options: any,
    callback?: HandlerCallback
  ): Promise<boolean> => {
    try {
      const akashProvider = new AkashIntegrationProvider();
      
      const deploymentConfig = {
        image: message.content.dockerImage,
        resources: message.content.resources || {
          cpu: '0.5',
          memory: '1Gi',
          storage: '10Gi'
        },
        replicas: message.content.replicas || 1,
        expose: message.content.ports || [{ port: 8080, protocol: 'http' }],
        env: message.content.environment || {},
        budget: options.maxCost || 100, // USD per month
        regions: options.preferredRegions || ['us-west', 'eu-central'],
        persistence: message.content.persistence || false
      };
      
      const deployment = await akashProvider.createDeployment(deploymentConfig);
      
      // Register deployment in blockchain registry
      const registryProvider = new BlockchainRegistryProvider();
      await registryProvider.updateDeployment(runtime.agentId, {
        akashDeployment: {
          leaseId: deployment.leaseId,
          provider: deployment.provider,
          endpoint: deployment.endpoints[0],
          resources: deploymentConfig.resources,
          cost: deployment.costPerMonth,
          region: deployment.region
        }
      });
      
      if (callback) {
        callback({
          text: `Successfully deployed to Akash Network. Endpoint: ${deployment.endpoints[0]}. Cost: $${deployment.costPerMonth}/month`,
          content: {
            success: true,
            deployment,
            monitoring: {
              dashboardUrl: `https://console.akash.network/deployments/${deployment.leaseId}`,
              metricsEndpoint: `${deployment.endpoints[0]}/metrics`,
              logsEndpoint: `${deployment.endpoints[0]}/logs`
            },
            costOptimization: {
              estimatedMonthlyCost: deployment.costPerMonth,
              savingsVsTraditional: `${((200 - deployment.costPerMonth) / 200 * 100).toFixed(1)}%`,
              autoScaling: deployment.autoScaling
            }
          }
        });
      }
      
      return true;
    } catch (error) {
      console.error('Failed to deploy to Akash Network:', error);
      if (callback) {
        callback({
          text: `Deployment failed: ${error.message}`,
          content: { error: error.message }
        });
      }
      return false;
    }
  }
};

/**
 * Action: Monitor Universal Tool Performance
 * 
 * Monitors performance metrics across the Universal Tool Server network,
 * tracking latency, cost, reliability, and user satisfaction.
 */
export const monitorPerformanceAction: Action = {
  name: 'MONITOR_UTS_PERFORMANCE',
  similes: [
    'TRACK_NETWORK_METRICS',
    'ANALYZE_TOOL_PERFORMANCE',
    'MONITOR_DECENTRALIZED_HEALTH',
    'ASSESS_SYSTEM_RELIABILITY'
  ],
  description: 'Monitor performance metrics across Universal Tool Server network',
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    return true; // No specific validation needed for monitoring
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    options: any,
    callback?: HandlerCallback
  ): Promise<boolean> => {
    try {
      const registryProvider = new BlockchainRegistryProvider();
      const akashProvider = new AkashIntegrationProvider();
      
      const timeWindow = options.timeWindow || '24h';
      const metrics = await registryProvider.getNetworkMetrics(timeWindow);
      const deploymentMetrics = await akashProvider.getDeploymentMetrics(runtime.agentId);
      
      const analysis = {
        networkHealth: calculateNetworkHealth(metrics),
        topPerformers: metrics.agents.slice(0, 5),
        costEfficiency: calculateCostEfficiency(metrics),
        reliabilityTrends: calculateReliabilityTrends(metrics),
        recommendations: generateOptimizationRecommendations(metrics, deploymentMetrics)
      };
      
      if (callback) {
        callback({
          text: `Network performance analysis complete. Overall health: ${analysis.networkHealth.score}/100. Active agents: ${metrics.totalAgents}`,
          content: {
            analysis,
            metrics: {
              totalAgents: metrics.totalAgents,
              totalToolCalls: metrics.totalToolCalls,
              averageLatency: metrics.averageLatency,
              successRate: metrics.successRate,
              networkUptime: metrics.networkUptime
            },
            trends: {
              performanceTrend: metrics.performanceTrend,
              costTrend: metrics.costTrend,
              adoptionTrend: metrics.adoptionTrend
            },
            alerts: metrics.alerts || []
          }
        });
      }
      
      return true;
    } catch (error) {
      console.error('Failed to monitor UTS performance:', error);
      if (callback) {
        callback({
          text: `Performance monitoring failed: ${error.message}`,
          content: { error: error.message }
        });
      }
      return false;
    }
  }
};

// Helper Functions
function calculateRatingFromMetrics(metrics: PerformanceMetrics): number {
  const latencyScore = Math.max(0, 1 - (metrics.latency.p95 / 5000)); // 5s max
  const reliabilityScore = metrics.reliability.uptime / 100;
  const costScore = Math.max(0, 1 - (metrics.cost.averageCost / 10)); // $10 max
  
  return (latencyScore * 0.4 + reliabilityScore * 0.4 + costScore * 0.2);
}

function calculateNetworkHealth(metrics: any): { score: number; factors: any[] } {
  const factors = [
    { name: 'Agent Availability', score: metrics.availabilityRate * 100, weight: 0.3 },
    { name: 'Average Latency', score: Math.max(0, 100 - metrics.averageLatency / 50), weight: 0.25 },
    { name: 'Success Rate', score: metrics.successRate * 100, weight: 0.25 },
    { name: 'Network Diversity', score: Math.min(100, metrics.totalAgents * 2), weight: 0.2 }
  ];
  
  const weightedScore = factors.reduce((sum, factor) => sum + factor.score * factor.weight, 0);
  
  return { score: Math.round(weightedScore), factors };
}

function calculateCostEfficiency(metrics: any): any {
  return {
    averageCostPerCall: metrics.averageCostPerCall,
    costTrend: metrics.costTrend,
    savingsVsTraditional: metrics.savingsVsTraditional,
    mostEfficientAgents: metrics.agents
      .sort((a, b) => a.economicTerms.basePrice - b.economicTerms.basePrice)
      .slice(0, 3)
  };
}

function calculateReliabilityTrends(metrics: any): any {
  return {
    uptimeTrend: metrics.uptimeTrend,
    errorRateTrend: metrics.errorRateTrend,
    latencyTrend: metrics.latencyTrend,
    qualityScore: metrics.qualityScore
  };
}

function generateOptimizationRecommendations(networkMetrics: any, deploymentMetrics: any): string[] {
  const recommendations = [];
  
  if (networkMetrics.averageLatency > 2000) {
    recommendations.push('Consider deploying to additional regions to reduce latency');
  }
  
  if (deploymentMetrics?.cost > networkMetrics.averageCost * 1.5) {
    recommendations.push('Your deployment cost is above average - consider resource optimization');
  }
  
  if (networkMetrics.successRate < 0.95) {
    recommendations.push('Network reliability is below optimal - implement circuit breakers');
  }
  
  return recommendations;
}

/**
 * All Universal Tool Server Actions
 */
export const UniversalToolServerActions = [
  registerAgentAction,
  discoverUniversalToolsAction,
  executeUniversalToolAction,
  updateReputationAction,
  deployToAkashAction,
  monitorPerformanceAction
];