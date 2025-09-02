/**
 * MongoDB Provider for 371 OS ElizaOS Integration
 * 
 * Provides database context and connection status to agents
 */

import { Provider } from '@elizaos/core';
import { mongodb371 } from './mongodb-service.js';

export const MongoDBProvider: Provider = {
  get: async () => {
    try {
      const health = await mongodb371.healthCheck();
      const stats = await mongodb371.getDatabaseStats();
      
      return {
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
      };
    } catch (error) {
      return {
        database: {
          status: 'error',
          error: error.message
        },
        timestamp: new Date().toISOString()
      };
    }
  }
};