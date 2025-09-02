/**
 * MongoDB Integration ElizaOS Plugin
 * 
 * Enables autonomous agents to persist and coordinate through MongoDB
 */

import { Plugin, Action, ActionHandler } from '@elizaos/core';
import { mongodb371 } from './mongodb-service.js';
import type { AgentData, BusinessIntelligence, CommunicationEvent } from './mongodb-service.js';

interface MongoDBActionContext {
  agentId: string;
  timestamp: Date;
  data?: Record<string, any>;
}

// Save Agent Data Action
const saveAgentDataAction: Action = {
  name: 'SAVE_AGENT_DATA',
  description: 'Save agent status and metrics to MongoDB',
  handler: async (context: MongoDBActionContext): Promise<boolean> => {
    try {
      const agentData: AgentData = {
        agentId: context.agentId,
        type: 'TestAgent', // TODO: Determine from context
        status: 'active',
        lastActivity: context.timestamp,
        metrics: {
          tasksCompleted: context.data?.tasksCompleted || 0,
          coordinationEvents: context.data?.coordinationEvents || 0,
          uptime: context.data?.uptime || 0
        },
        blockchainData: context.data?.blockchainData
      };

      return await mongodb371.saveAgentData(agentData);
    } catch (error) {
      console.error('Failed to save agent data:', error);
      return false;
    }
  },
  examples: [
    {
      user: 'Save my current status to database',
      content: {
        text: 'Agent status saved to MongoDB',
        action: 'SAVE_AGENT_DATA'
      }
    }
  ]
};

// Save Business Intelligence Action
const saveBusinessIntelligenceAction: Action = {
  name: 'SAVE_BUSINESS_INTELLIGENCE',
  description: 'Save business intelligence data and insights to MongoDB',
  handler: async (context: MongoDBActionContext): Promise<boolean> => {
    try {
      const biData: BusinessIntelligence = {
        timestamp: context.timestamp,
        agentId: context.agentId,
        eventType: context.data?.eventType || 'data_collection',
        data: context.data?.analysisData || {},
        insights: context.data?.insights || [],
        confidence: context.data?.confidence || 0.5
      };

      return await mongodb371.saveBusinessIntelligence(biData);
    } catch (error) {
      console.error('Failed to save business intelligence:', error);
      return false;
    }
  },
  examples: [
    {
      user: 'Save business analysis results',
      content: {
        text: 'Business intelligence data saved to MongoDB',
        action: 'SAVE_BUSINESS_INTELLIGENCE'
      }
    }
  ]
};

// Save Communication Event Action
const saveCommunicationEventAction: Action = {
  name: 'SAVE_COMMUNICATION_EVENT',
  description: 'Save communication events for agent coordination',
  handler: async (context: MongoDBActionContext): Promise<boolean> => {
    try {
      const eventData: CommunicationEvent = {
        eventId: context.data?.eventId || `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: context.timestamp,
        type: context.data?.type || 'system_alert',
        agentId: context.agentId,
        recipientId: context.data?.recipientId,
        data: context.data?.eventData || {},
        status: context.data?.status || 'pending'
      };

      return await mongodb371.saveCommunicationEvent(eventData);
    } catch (error) {
      console.error('Failed to save communication event:', error);
      return false;
    }
  },
  examples: [
    {
      user: 'Log this communication event',
      content: {
        text: 'Communication event saved to MongoDB',
        action: 'SAVE_COMMUNICATION_EVENT'
      }
    }
  ]
};

// Get Agent Status Action
const getAgentStatusAction: Action = {
  name: 'GET_AGENT_STATUS',
  description: 'Retrieve agent status and metrics from MongoDB',
  handler: async (context: MongoDBActionContext): Promise<AgentData | null> => {
    try {
      return await mongodb371.getAgentData(context.agentId);
    } catch (error) {
      console.error('Failed to get agent status:', error);
      return null;
    }
  },
  examples: [
    {
      user: 'What is my current status?',
      content: {
        text: 'Retrieved agent status from MongoDB',
        action: 'GET_AGENT_STATUS'
      }
    }
  ]
};

// Get All Agents Action
const getAllAgentsAction: Action = {
  name: 'GET_ALL_AGENTS',
  description: 'Retrieve status of all agents for coordination',
  handler: async (): Promise<AgentData[]> => {
    try {
      return await mongodb371.getAllAgents();
    } catch (error) {
      console.error('Failed to get all agents:', error);
      return [];
    }
  },
  examples: [
    {
      user: 'Show me all active agents',
      content: {
        text: 'Retrieved all agent statuses from MongoDB',
        action: 'GET_ALL_AGENTS'
      }
    }
  ]
};

// Database Health Check Action
const mongoHealthCheckAction: Action = {
  name: 'MONGODB_HEALTH_CHECK',
  description: 'Check MongoDB connection and database health',
  handler: async (): Promise<any> => {
    try {
      return await mongodb371.healthCheck();
    } catch (error) {
      console.error('MongoDB health check failed:', error);
      return { status: 'error', error: error.message };
    }
  },
  examples: [
    {
      user: 'Check database health',
      content: {
        text: 'MongoDB health check completed',
        action: 'MONGODB_HEALTH_CHECK'
      }
    }
  ]
};

// Export actions array
export const mongodbActions = [
  saveAgentDataAction,
  saveBusinessIntelligenceAction,
  saveCommunicationEventAction,
  getAgentStatusAction,
  getAllAgentsAction,
  mongoHealthCheckAction
];

// MongoDB Integration Plugin
export const mongodbIntegrationPlugin: Plugin = {
  name: 'mongodb-integration',
  description: 'MongoDB persistence and coordination for 371 OS agents',
  actions: mongodbActions,
  evaluators: [],
  providers: []
};