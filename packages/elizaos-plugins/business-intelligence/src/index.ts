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

// Main plugin export
export { BusinessIntelligencePlugin as default } from './plugin';
export * from './plugin';

// Type definitions (interfaces and types only)
export type {
  BusinessMetric,
  BusinessAlert,
  Department,
  BusinessSnapshot,
  AgentInsight,
  BusinessDataCollectionAction,
  AlertGenerationAction,
  PredictiveAnalysisAction,
  DepartmentAnalysisAction,
  BusinessIntelligenceConfig,
  BusinessDataUpdateEvent,
  OrreryUpdatePayload,
  BlockchainCoordinationData,
  BusinessIntelligenceActionType
} from './types';

// Constants from types (using explicit import to avoid conflicts)
export { BusinessIntelligenceActions as BusinessIntelligenceActionNames } from './types';

// Actual implementations (actions, provider, evaluator)
export { 
  collectBusinessDataAction,
  generateBusinessAlertAction,
  analyzeBusinessTrendsAction,
  analyzeDepartmentPerformanceAction,
  BusinessIntelligenceActions
} from './actions';

export { BusinessDataProvider } from './provider';
export { BusinessMetricsEvaluator } from './evaluator';