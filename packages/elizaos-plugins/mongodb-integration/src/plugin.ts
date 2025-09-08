/**
 * MongoDB Integration ElizaOS Plugin
 *
 * Enables autonomous agents to persist and coordinate through MongoDB
 */

import {
  type Action,
  ActionResult,
  Handler,
  type IAgentRuntime,
  type Memory,
  type Plugin,
  type State,
} from '@elizaos/core';
import type {
  AgentData,
  BusinessIntelligence,
  CommunicationEvent,
} from './mongodb-service.js';
import { mongodb371 } from './mongodb-service.js';

interface MongoDBActionContext {
  runtime: IAgentRuntime;
  message: Memory;
  state?: State;
  options?: Record<string, any>;
}

// Save Agent Data Action
const saveAgentDataAction: Action = {
  name: 'SAVE_AGENT_DATA',
  description: 'Save agent status and metrics to MongoDB',
  handler: async (runtime: IAgentRuntime, message: Memory, state?: State) => {
    try {
      const agentData: AgentData = {
        agentId: runtime.agentId,
        type: 'TestAgent', // TODO: Determine from context
        status: 'active',
        lastActivity: new Date(),
        metrics: {
          tasksCompleted: state?.data?.tasksCompleted || 0,
          coordinationEvents: state?.data?.coordinationEvents || 0,
          uptime: state?.data?.uptime || 0,
        },
        blockchainData: state?.data?.blockchainData,
      };

      const success = await mongodb371.saveAgentData(agentData);
      return { success };
    } catch (error: any) {
      console.error('Failed to save agent data:', error);
      return { success: false, error: error.message };
    }
  },
  examples: [
    [
      {
        name: 'user',
        content: {
          text: 'Save my current status to database',
          action: 'SAVE_AGENT_DATA',
        },
      },
    ],
  ],
  validate: async (runtime: IAgentRuntime, message: Memory, state?: State) => {
    return true; // Always allow for now
  },
};

// Save Business Intelligence Action
const saveBusinessIntelligenceAction: Action = {
  name: 'SAVE_BUSINESS_INTELLIGENCE',
  description: 'Save business intelligence data and insights to MongoDB',
  handler: async (runtime: IAgentRuntime, message: Memory, state?: State) => {
    try {
      const biData: BusinessIntelligence = {
        timestamp: new Date(),
        agentId: runtime.agentId,
        eventType: state?.data?.eventType || 'data_collection',
        data: state?.data?.analysisData || {},
        insights: state?.data?.insights || [],
        confidence: state?.data?.confidence || 0.5,
      };

      const success = await mongodb371.saveBusinessIntelligence(biData);
      return { success };
    } catch (error: any) {
      console.error('Failed to save business intelligence:', error);
      return { success: false, error: error.message };
    }
  },
  examples: [
    [
      {
        name: 'user',
        content: {
          text: 'Save business analysis results',
          action: 'SAVE_BUSINESS_INTELLIGENCE',
        },
      },
    ],
  ],
  validate: async (runtime: IAgentRuntime, message: Memory, state?: State) => {
    return true; // Always allow for now
  },
};

// Save Communication Event Action
const saveCommunicationEventAction: Action = {
  name: 'SAVE_COMMUNICATION_EVENT',
  description: 'Save communication events for agent coordination',
  handler: async (runtime: IAgentRuntime, message: Memory, state?: State) => {
    try {
      const eventData: CommunicationEvent = {
        eventId:
          state?.data?.eventId ||
          `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
        type: state?.data?.type || 'system_alert',
        agentId: runtime.agentId,
        recipientId: state?.data?.recipientId,
        data: state?.data?.eventData || {},
        status: state?.data?.status || 'pending',
      };

      const success = await mongodb371.saveCommunicationEvent(eventData);
      return { success };
    } catch (error: any) {
      console.error('Failed to save communication event:', error);
      return { success: false, error: error.message };
    }
  },
  examples: [
    [
      {
        name: 'user',
        content: {
          text: 'Log this communication event',
          action: 'SAVE_COMMUNICATION_EVENT',
        },
      },
    ],
  ],
  validate: async (runtime: IAgentRuntime, message: Memory, state?: State) => {
    return true; // Always allow for now
  },
};

// Get Agent Status Action
const getAgentStatusAction: Action = {
  name: 'GET_AGENT_STATUS',
  description: 'Retrieve agent status and metrics from MongoDB',
  handler: async (runtime: IAgentRuntime, message: Memory, state?: State) => {
    try {
      const agentData = await mongodb371.getAgentData(runtime.agentId);
      return { success: true, data: agentData || {} };
    } catch (error: any) {
      console.error('Failed to get agent status:', error);
      return { success: false, error: error.message };
    }
  },
  examples: [
    [
      {
        name: 'user',
        content: {
          text: 'What is my current status?',
          action: 'GET_AGENT_STATUS',
        },
      },
    ],
  ],
  validate: async (runtime: IAgentRuntime, message: Memory, state?: State) => {
    return true; // Always allow for now
  },
};

// Get All Agents Action
const getAllAgentsAction: Action = {
  name: 'GET_ALL_AGENTS',
  description: 'Retrieve status of all agents for coordination',
  handler: async (runtime: IAgentRuntime, message: Memory, state?: State) => {
    try {
      const agents = await mongodb371.getAllAgents();
      return { success: true, data: agents };
    } catch (error: any) {
      console.error('Failed to get all agents:', error);
      return { success: false, error: error.message };
    }
  },
  examples: [
    [
      {
        name: 'user',
        content: {
          text: 'Show me all active agents',
          action: 'GET_ALL_AGENTS',
        },
      },
    ],
  ],
  validate: async (runtime: IAgentRuntime, message: Memory, state?: State) => {
    return true; // Always allow for now
  },
};

// Database Health Check Action
const mongoHealthCheckAction: Action = {
  name: 'MONGODB_HEALTH_CHECK',
  description: 'Check MongoDB connection and database health',
  handler: async (runtime: IAgentRuntime, message: Memory, state?: State) => {
    try {
      const healthData = await mongodb371.healthCheck();
      return { success: true, data: healthData };
    } catch (error: any) {
      console.error('MongoDB health check failed:', error);
      return { success: false, error: error.message };
    }
  },
  examples: [
    [
      {
        name: 'user',
        content: {
          text: 'Check database health',
          action: 'MONGODB_HEALTH_CHECK',
        },
      },
    ],
  ],
  validate: async (runtime: IAgentRuntime, message: Memory, state?: State) => {
    return true; // Always allow for now
  },
};

// Export actions array
export const mongodbActions = [
  saveAgentDataAction,
  saveBusinessIntelligenceAction,
  saveCommunicationEventAction,
  getAgentStatusAction,
  getAllAgentsAction,
  mongoHealthCheckAction,
];

// MongoDB Integration Plugin
export const mongodbIntegrationPlugin: Plugin = {
  name: 'mongodb-integration',
  description: 'MongoDB persistence and coordination for 371 OS agents',
  actions: mongodbActions,
  evaluators: [],
  providers: [],
};
