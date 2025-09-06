/**
 * MongoDB Provider for 371 OS ElizaOS Integration
 * 
 * Provides database context and connection status to agents
 */

import { Provider, IAgentRuntime, Memory, State } from '@elizaos/core';
import { mongodb371 } from './mongodb-service.js';

export const MongoDBProvider: Provider = {
  name: 'mongodb-provider',
  description: 'Provides MongoDB database context and connection status',
  get: async (runtime: IAgentRuntime, message: Memory, state: State) => {
    try {
      const health = await mongodb371.healthCheck();
      const stats = await mongodb371.getDatabaseStats();
      
      return {
        values: {
          database: {
            status: health.status,
            database: health.database,
            collections: health.collections,
            stats: stats ? {
              dataSize: stats.dataSize,
              indexSize: stats.indexSize,
              collections: stats.collections
            } : null
          },
          timestamp: new Date().toISOString()
        }
      };
    } catch (error: any) {
      return {
        values: {
          database: {
            status: 'error',
            error: error.message
          },
          timestamp: new Date().toISOString()
        }
      };
    }
  }
};