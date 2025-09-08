/**
 * MongoDB Integration Plugin for 371 OS
 *
 * Provides database persistence and coordination for autonomous agents
 */

export { mongodbActions } from './actions.js';
export type {
  AgentData,
  BusinessIntelligence,
  CommunicationEvent,
  MongoDB371Config,
} from './mongodb-service.js';
export { MongoDB371Service, mongodb371 } from './mongodb-service.js';
// ElizaOS Plugin Integration
export { mongodbIntegrationPlugin } from './plugin.js';
export { MongoDBProvider } from './provider.js';
