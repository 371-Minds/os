/**
 * MongoDB Configuration for 371 OS
 *
 * Central database configuration for the revolutionary autonomous agent operating system.
 * Supports both local MongoDB and Akash Network deployed instances.
 */

import dotenv from 'dotenv';
import { Collection, type Db, MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import winston from 'winston';

// Load environment variables
dotenv.config();

interface MongoDB371Config {
  local: {
    uri: string;
    database: string;
  };
  akash: {
    uri: string;
    database: string;
    username: string;
    password: string;
  };
  options: {
    maxPoolSize: number;
    serverSelectionTimeoutMS: number;
    socketTimeoutMS: number;
    family: number;
  };
}

interface AgentData {
  agentId: string;
  type: 'CEO' | 'CTO' | 'CFO' | 'CLO' | 'TestAgent';
  status: 'active' | 'inactive' | 'error';
  lastActivity: Date;
  metrics: {
    tasksCompleted: number;
    coordinationEvents: number;
    uptime: number;
  };
  blockchainData?: {
    did: string;
    registryAddress: string;
    stakeAmount: string;
  };
}

interface BusinessIntelligence {
  timestamp: Date;
  agentId: string;
  eventType:
    | 'data_collection'
    | 'alert_generation'
    | 'trend_analysis'
    | 'department_analysis';
  data: Record<string, any>;
  insights: string[];
  confidence: number;
}

interface CommunicationEvent {
  eventId: string;
  timestamp: Date;
  type:
    | 'email_sent'
    | 'notification_triggered'
    | 'agent_coordination'
    | 'system_alert';
  agentId: string;
  recipientId?: string;
  data: Record<string, any>;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
}

class MongoDB371Service {
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private logger: winston.Logger;
  private config: MongoDB371Config;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/mongodb-371.log' }),
      ],
    });

    this.config = {
      local: {
        uri: process.env.MONGODB_LOCAL_URI || 'mongodb://localhost:27017',
        database: process.env.MONGODB_DATABASE || 'os371',
      },
      akash: {
        uri:
          process.env.MONGODB_AKASH_URI ||
          'mongodb://root:rootpassword@akash-mongodb:27017',
        database: process.env.MONGODB_DATABASE || 'os371',
        username: process.env.MONGODB_USERNAME || 'root',
        password: process.env.MONGODB_PASSWORD || 'rootpassword',
      },
      options: {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
      },
    };
  }

  async connect(useAkash: boolean = false): Promise<boolean> {
    try {
      const connectionConfig = useAkash ? this.config.akash : this.config.local;

      this.logger.info(
        `Connecting to MongoDB: ${useAkash ? 'Akash Network' : 'Local'}`,
      );

      this.client = new MongoClient(connectionConfig.uri, this.config.options);
      await this.client.connect();

      this.db = this.client.db(connectionConfig.database);

      // Test the connection
      await this.db.admin().ping();

      this.logger.info('MongoDB connection established successfully');

      // Initialize collections and indexes
      await this.initializeCollections();

      return true;
    } catch (error) {
      this.logger.error('Failed to connect to MongoDB:', error);
      return false;
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      this.logger.info('MongoDB connection closed');
    }
  }

  private async initializeCollections(): Promise<void> {
    if (!this.db) throw new Error('Database not connected');

    // Create collections with proper indexes
    const collections = [
      'agents',
      'business_intelligence',
      'communication_events',
      'system_metrics',
    ];

    for (const collectionName of collections) {
      try {
        await this.db.createCollection(collectionName);
        this.logger.info(`Collection '${collectionName}' created/verified`);
      } catch (error: any) {
        if (error.code !== 48) {
          // Collection already exists
          this.logger.warn(
            `Collection creation warning for '${collectionName}':`,
            error,
          );
        }
      }
    }

    // Create indexes for performance
    await this.createIndexes();
  }

  private async createIndexes(): Promise<void> {
    if (!this.db) return;

    try {
      // Agent collection indexes
      await this.db
        .collection('agents')
        .createIndex({ agentId: 1 }, { unique: true });
      await this.db.collection('agents').createIndex({ type: 1 });
      await this.db.collection('agents').createIndex({ status: 1 });
      await this.db.collection('agents').createIndex({ lastActivity: 1 });

      // Business intelligence indexes
      await this.db
        .collection('business_intelligence')
        .createIndex({ timestamp: 1 });
      await this.db
        .collection('business_intelligence')
        .createIndex({ agentId: 1 });
      await this.db
        .collection('business_intelligence')
        .createIndex({ eventType: 1 });

      // Communication events indexes
      await this.db
        .collection('communication_events')
        .createIndex({ eventId: 1 }, { unique: true });
      await this.db
        .collection('communication_events')
        .createIndex({ timestamp: 1 });
      await this.db
        .collection('communication_events')
        .createIndex({ agentId: 1 });
      await this.db.collection('communication_events').createIndex({ type: 1 });

      this.logger.info('Database indexes created successfully');
    } catch (error) {
      this.logger.error('Error creating database indexes:', error);
    }
  }

  // Agent Management Methods
  async saveAgentData(agentData: AgentData): Promise<boolean> {
    if (!this.db) throw new Error('Database not connected');

    try {
      const result = await this.db
        .collection<AgentData>('agents')
        .replaceOne({ agentId: agentData.agentId }, agentData, {
          upsert: true,
        });

      this.logger.info(`Agent data saved for ${agentData.agentId}`);
      return result.acknowledged;
    } catch (error) {
      this.logger.error('Error saving agent data:', error);
      return false;
    }
  }

  async getAgentData(agentId: string): Promise<AgentData | null> {
    if (!this.db) throw new Error('Database not connected');

    try {
      const agent = await this.db
        .collection<AgentData>('agents')
        .findOne({ agentId });
      return agent;
    } catch (error) {
      this.logger.error('Error retrieving agent data:', error);
      return null;
    }
  }

  async getAllAgents(): Promise<AgentData[]> {
    if (!this.db) throw new Error('Database not connected');

    try {
      const agents = await this.db
        .collection<AgentData>('agents')
        .find({})
        .toArray();
      return agents;
    } catch (error) {
      this.logger.error('Error retrieving all agents:', error);
      return [];
    }
  }

  // Business Intelligence Methods
  async saveBusinessIntelligence(data: BusinessIntelligence): Promise<boolean> {
    if (!this.db) throw new Error('Database not connected');

    try {
      const result = await this.db
        .collection<BusinessIntelligence>('business_intelligence')
        .insertOne(data);
      this.logger.info(`Business intelligence data saved for ${data.agentId}`);
      return result.acknowledged;
    } catch (error) {
      this.logger.error('Error saving business intelligence data:', error);
      return false;
    }
  }

  async getBusinessIntelligence(
    agentId: string,
    limit: number = 100,
  ): Promise<BusinessIntelligence[]> {
    if (!this.db) throw new Error('Database not connected');

    try {
      const data = await this.db
        .collection<BusinessIntelligence>('business_intelligence')
        .find({ agentId })
        .sort({ timestamp: -1 })
        .limit(limit)
        .toArray();
      return data;
    } catch (error) {
      this.logger.error('Error retrieving business intelligence data:', error);
      return [];
    }
  }

  // Communication Events Methods
  async saveCommunicationEvent(event: CommunicationEvent): Promise<boolean> {
    if (!this.db) throw new Error('Database not connected');

    try {
      const result = await this.db
        .collection<CommunicationEvent>('communication_events')
        .insertOne(event);
      this.logger.info(`Communication event saved: ${event.eventId}`);
      return result.acknowledged;
    } catch (error) {
      this.logger.error('Error saving communication event:', error);
      return false;
    }
  }

  async getCommunicationEvents(
    agentId: string,
    limit: number = 100,
  ): Promise<CommunicationEvent[]> {
    if (!this.db) throw new Error('Database not connected');

    try {
      const events = await this.db
        .collection<CommunicationEvent>('communication_events')
        .find({ agentId })
        .sort({ timestamp: -1 })
        .limit(limit)
        .toArray();
      return events;
    } catch (error) {
      this.logger.error('Error retrieving communication events:', error);
      return [];
    }
  }

  // Health Check Methods
  async healthCheck(): Promise<{
    status: string;
    database: string;
    collections: number;
  }> {
    if (!this.db) {
      return { status: 'disconnected', database: 'unknown', collections: 0 };
    }

    try {
      await this.db.admin().ping();
      const collections = await this.db.listCollections().toArray();

      return {
        status: 'connected',
        database: this.db.databaseName,
        collections: collections.length,
      };
    } catch (error) {
      this.logger.error('Health check failed:', error);
      return { status: 'error', database: 'unknown', collections: 0 };
    }
  }

  // Get database statistics
  async getDatabaseStats(): Promise<any> {
    if (!this.db) throw new Error('Database not connected');

    try {
      const stats = await this.db.stats();
      return stats;
    } catch (error) {
      this.logger.error('Error getting database stats:', error);
      return null;
    }
  }

  /**
   * Get the database instance
   * @returns The database instance or null if not connected
   */
  getDatabase(): Db | null {
    return this.db;
  }
}

// Singleton instance
export const mongodb371 = new MongoDB371Service();

// Export types for other modules
export type {
  AgentData,
  BusinessIntelligence,
  CommunicationEvent,
  MongoDB371Config,
};

// Export the service class
export { MongoDB371Service };

// Default export
export default mongodb371;
