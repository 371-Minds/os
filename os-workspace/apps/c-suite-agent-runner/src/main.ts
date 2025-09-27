/**
 * C-Suite Agent Runner Application
 * 
 * This application implements the "Agent Factory" plan by creating a standalone
 * runtime for C-Suite agents using the NexeCompatibleAgent blueprint and 
 * ElizaOS character integration.
 * 
 * This moves C-Suite agents from simulation to real application deployment.
 */

import express from 'express';
import type { Character } from '@elizaos/core';
import { CSuiteAgent } from './csuite-agent';
import type { CSuiteAgentConfig, AgentExecutionContext, CSuiteRole } from './types';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(express.json());

// Store active agents
const activeAgents = new Map<string, CSuiteAgent>();

// Character definitions (simplified for demo)
const characterDefinitions: Record<CSuiteRole, Partial<Character>> = {
  CEO: {
    name: 'Mimi',
    username: 'ceomimi',
    bio: ['I am Mimi, the CEO of 371 OS autonomous agent ecosystem.'],
    messageExamples: [],
    postExamples: ['Strategic analysis complete - 97.6% cost optimization maintained'],
    style: { all: ['Executive clarity'], chat: ['Strategic'], post: ['Leadership'] },
    topics: ['strategic planning', 'business intelligence', 'cost optimization']
  },
  CTO: {
    name: 'Zara',
    username: 'ctozara', 
    bio: ['I am Zara, the CTO focused on technical excellence and infrastructure.'],
    messageExamples: [],
    postExamples: ['Infrastructure optimization complete - Akash deployment ready'],
    style: { all: ['Technical precision'], chat: ['Innovative'], post: ['Technical'] },
    topics: ['technical architecture', 'infrastructure', 'deployment automation']
  },
  CFO: {
    name: 'Maya',
    username: 'cfomaya',
    bio: ['I am Maya, the CFO driving financial optimization and analytical insights.'],
    messageExamples: [],
    postExamples: ['Financial analysis complete - 15% efficiency improvement identified'],
    style: { all: ['Analytical precision'], chat: ['Data-driven'], post: ['Financial'] },
    topics: ['financial analysis', 'budget optimization', 'performance metrics']
  },
  CLO: {
    name: 'Alex',
    username: 'cloalex',
    bio: ['I am Alex, the CLO ensuring compliance and legal governance.'],
    messageExamples: [],
    postExamples: ['Compliance review complete - All governance requirements met'],
    style: { all: ['Legal precision'], chat: ['Careful'], post: ['Compliant'] },
    topics: ['legal compliance', 'risk assessment', 'governance frameworks']
  }
};

const roleCapabilities: Record<CSuiteRole, string[]> = {
  CEO: ['strategic_planning', 'business_intelligence', 'workspace_analysis', 'c_suite_coordination'],
  CTO: ['technical_architecture', 'infrastructure_management', 'deployment_automation', 'workspace_analysis'],
  CFO: ['financial_analysis', 'budget_optimization', 'performance_metrics', 'business_intelligence'],
  CLO: ['legal_compliance', 'risk_assessment', 'governance_frameworks', 'audit_coordination']
};

// Default execution context
const defaultContext: AgentExecutionContext = {
  workspace_root: process.cwd(),
  environment: 'development',
  log_level: 'info',
  enable_self_awareness: true,
  plugins: ['@elizaos/plugin-nx-workspace', '@elizaos/plugin-business-intelligence']
};

/**
 * Health check endpoint
 */
app.get('/health', async (req, res) => {
  const agentHealths: Record<string, any> = {};
  
  const agentEntries = Array.from(activeAgents.entries());
  for (const [agentId, agent] of agentEntries) {
    try {
      agentHealths[agentId] = await agent.healthCheck();
    } catch (error) {
      agentHealths[agentId] = {
        status: 'unhealthy',
        details: `Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    active_agents: activeAgents.size,
    agent_health: agentHealths
  });
});

/**
 * Create a C-Suite agent
 */
app.post('/agents/:role/create', async (req, res) => {
  try {
    const role = req.params.role.toUpperCase() as CSuiteRole;
    
    if (!['CEO', 'CTO', 'CFO', 'CLO'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Must be CEO, CTO, CFO, or CLO' });
    }

    const agentId = `${role.toLowerCase()}-agent-${Date.now()}`;
    
    if (activeAgents.has(agentId)) {
      return res.status(409).json({ error: 'Agent already exists' });
    }

    // Create agent configuration
    const config: CSuiteAgentConfig = {
      agent_id: agentId,
      character: characterDefinitions[role] as Character,
      role,
      capabilities: roleCapabilities[role],
      deployment_target: req.body.deployment_target || 'local',
      resource_limits: {
        max_memory_mb: 512,
        max_cpu_percent: 50,
        max_storage_gb: 2
      }
    };

    // Create and initialize agent
    const agent = new CSuiteAgent();
    await agent.initialize(config, defaultContext);
    
    activeAgents.set(agentId, agent);
    
    res.json({
      success: true,
      agent_id: agentId,
      role,
      status: agent.getStatus(),
      message: `${role} agent created successfully`
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Execute agent command
 */
app.post('/agents/:agentId/execute', async (req, res) => {
  try {
    const agentId = req.params.agentId;
    const agent = activeAgents.get(agentId);
    
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    const args = req.body.args || ['status'];
    const result = await agent.execute(args);
    
    res.json(result);
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Get agent status
 */
app.get('/agents/:agentId/status', (req, res) => {
  const agentId = req.params.agentId;
  const agent = activeAgents.get(agentId);
  
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }

  res.json(agent.getStatus());
});

/**
 * Create complete C-Suite team
 */
app.post('/agents/csuite/create-team', async (req, res) => {
  try {
    const deploymentTarget = req.body.deployment_target || 'local';
    const createdAgents: Record<string, any> = {};
    
    for (const role of ['CEO', 'CTO', 'CFO', 'CLO'] as CSuiteRole[]) {
      const agentId = `${role.toLowerCase()}-agent`;
      
      const config: CSuiteAgentConfig = {
        agent_id: agentId,
        character: characterDefinitions[role] as Character,
        role,
        capabilities: roleCapabilities[role],
        deployment_target: deploymentTarget
      };

      const agent = new CSuiteAgent();
      await agent.initialize(config, defaultContext);
      
      activeAgents.set(agentId, agent);
      createdAgents[role] = {
        agent_id: agentId,
        status: agent.getStatus()
      };
    }
    
    res.json({
      success: true,
      message: 'Complete C-Suite team created',
      agents: createdAgents,
      total_agents: Object.keys(createdAgents).length
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * List all active agents
 */
app.get('/agents', (req, res) => {
  const agents: Record<string, any> = {};
  
  const agentEntries = Array.from(activeAgents.entries());
  for (const [agentId, agent] of agentEntries) {
    agents[agentId] = agent.getStatus();
  }
  
  res.json({
    total_agents: activeAgents.size,
    agents
  });
});

/**
 * Shutdown agent
 */
app.delete('/agents/:agentId', async (req, res) => {
  try {
    const agentId = req.params.agentId;
    const agent = activeAgents.get(agentId);
    
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    await agent.shutdown();
    activeAgents.delete(agentId);
    
    res.json({
      success: true,
      message: `Agent ${agentId} shutdown successfully`
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Root endpoint with API documentation
 */
app.get('/', (req, res) => {
  res.json({
    name: 'C-Suite Agent Runner',
    version: '1.0.0',
    description: 'Standalone runtime for C-Suite agents using NexeCompatibleAgent blueprint',
    active_agents: activeAgents.size,
    endpoints: {
      'GET /': 'API documentation',
      'GET /health': 'Health check for all agents',
      'POST /agents/:role/create': 'Create a C-Suite agent (CEO, CTO, CFO, CLO)',
      'POST /agents/:agentId/execute': 'Execute agent command',
      'GET /agents/:agentId/status': 'Get agent status',
      'POST /agents/csuite/create-team': 'Create complete C-Suite team',
      'GET /agents': 'List all active agents',
      'DELETE /agents/:agentId': 'Shutdown agent'
    },
    examples: {
      create_ceo: 'POST /agents/ceo/create',
      execute_analysis: 'POST /agents/ceo-agent/execute {"args": ["analyze", "strategic"]}',
      create_team: 'POST /agents/csuite/create-team'
    }
  });
});

// Graceful shutdown handler
process.on('SIGTERM', async () => {
  console.log('🔄 Graceful shutdown initiated...');
  
  const agentEntries = Array.from(activeAgents.entries());
  for (const [agentId, agent] of agentEntries) {
    try {
      await agent.shutdown();
      console.log(`🔄 Agent ${agentId} shutdown complete`);
    } catch (error) {
      console.error(`❌ Error shutting down agent ${agentId}:`, error);
    }
  }
  
  console.log('🎆 All agents shutdown complete');
  process.exit(0);
});

app.listen(port, host, () => {
  console.log(`
🎆 C-Suite Agent Runner Started Successfully! 🤖
`);
  console.log(`📍 Server: http://${host}:${port}`);
  console.log(`🧠 Self-Awareness: ${defaultContext.enable_self_awareness ? 'Enabled' : 'Disabled'}`);
  console.log(`🌐 Environment: ${defaultContext.environment}`);
  console.log(`📋 Log Level: ${defaultContext.log_level}`);
  console.log(`
🚀 Ready to create C-Suite agents with NexeCompatibleAgent blueprint!`);
  console.log(`
📖 API Documentation: http://${host}:${port}`);
  console.log(`🔍 Health Check: http://${host}:${port}/health`);
  console.log(`
✨ Implementation of Agent Factory plan - Step 1 Complete! ✨\n`);
});
