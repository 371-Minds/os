/**
 * Business Intelligence Plugin for ElizaOS
 *
 * Revolutionary real-time business intelligence integration that transforms
 * the CEO's Orrery into a living business universe powered by autonomous agents.
 *
 * Features:
 * - Real-time business data collection and analysis
 * - Intelligent alert generation and threshold monitoring
 * - Predictive analytics and trend analysis
 * - Department performance evaluation
 * - Agent-driven business insights
 * - Seamless CEO's Orrery integration
 */

// Actual implementations (actions, provider, evaluator)
export {
  analyzeBusinessTrendsAction,
  analyzeDepartmentPerformanceAction,
  BusinessIntelligenceActions,
  collectBusinessDataAction,
  generateBusinessAlertAction,
} from './actions';
export { BusinessMetricsEvaluator } from './evaluator';
export * from './plugin';
// Main plugin export
export { BusinessIntelligencePlugin as default } from './plugin';
export { BusinessDataProvider } from './provider';
// Type definitions (interfaces and types only)
export type {
  AgentInsight,
  AlertGenerationAction,
  BlockchainCoordinationData,
  BusinessAlert,
  BusinessDataCollectionAction,
  BusinessDataUpdateEvent,
  BusinessIntelligenceActionType,
  BusinessIntelligenceConfig,
  BusinessMetric,
  BusinessSnapshot,
  Department,
  DepartmentAnalysisAction,
  OrreryUpdatePayload,
  PredictiveAnalysisAction,
} from './types';
// Constants from types (using explicit import to avoid conflicts)
export { BusinessIntelligenceActions as BusinessIntelligenceActionNames } from './types';
