/**
 * Business Intelligence Plugin Types
 *
 * Comprehensive type definitions for the revolutionary business intelligence
 * system that transforms static dashboards into living business universes.
 */

import type {
  Action,
  ActionResult,
  Evaluator,
  IAgentRuntime,
  Memory,
  Provider,
  ProviderResult,
  State,
} from '@elizaos/core';

// Core Business Intelligence Types
export interface BusinessMetric {
  id: string;
  name: string;
  category:
    | 'revenue'
    | 'expense'
    | 'asset'
    | 'liability'
    | 'kpi'
    | 'operational';
  value: number;
  previousValue?: number;
  target?: number;
  currency?: string;
  unit?: string;
  trend: 'ascending' | 'descending' | 'stable' | 'volatile';
  priority: 'critical' | 'high' | 'medium' | 'low';
  confidence: number; // 0-100, agent confidence in data accuracy
  source: 'agent' | 'api' | 'manual' | 'calculated';
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface BusinessAlert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  metricId?: string;
  departmentId?: string;
  threshold?: {
    operator: '>' | '<' | '=' | '>=' | '<=';
    value: number;
    breachedAt: Date;
  };
  actionRequired: boolean;
  priority: number; // 1-10
  agentGenerated: boolean;
  timestamp: Date;
  resolved?: boolean;
  resolvedAt?: Date;
  resolvedBy?: string;
}

export interface Department {
  id: string;
  name: string;
  type:
    | 'sales'
    | 'engineering'
    | 'operations'
    | 'finance'
    | 'marketing'
    | 'hr'
    | 'legal';
  headcount: number;
  budget: number;
  budgetUtilization: number;
  performance: number; // 0-200, percentage of target
  efficiency: number; // 0-100
  productivity: number; // revenue per employee
  riskLevel: 'low' | 'medium' | 'high';
  strategicImportance: number; // 1-10
  managedMetrics: string[]; // metric IDs
  lastReview: Date;
}

export interface BusinessSnapshot {
  timestamp: Date;
  metrics: BusinessMetric[];
  departments: Department[];
  alerts: BusinessAlert[];
  summary: {
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
    growthRate: number;
    cashFlow: number;
    operatingMargin: number;
    marketConditions: 'bull' | 'bear' | 'neutral' | 'volatile';
  };
  agentInsights: AgentInsight[];
}

export interface AgentInsight {
  id: string;
  agentId: string;
  agentRole: 'CEO' | 'CTO' | 'CFO' | 'CLO' | 'CMO';
  type:
    | 'trend_analysis'
    | 'anomaly_detection'
    | 'prediction'
    | 'recommendation'
    | 'alert';
  title: string;
  description: string;
  confidence: number; // 0-100
  impact: 'low' | 'medium' | 'high' | 'critical';
  relatedMetrics: string[];
  actionRecommendations?: string[];
  timestamp: Date;
  validated?: boolean;
  validatedBy?: string;
}

// Agent Actions for Business Intelligence
export interface BusinessDataCollectionAction extends Action {
  name: 'COLLECT_BUSINESS_DATA';
  description: 'Collect and analyze business metrics from various sources';
  handler: (
    runtime: IAgentRuntime,
    message: Memory,
    state?: State,
    options?: {
      department?: string;
      metricTypes?: string[];
      timeRange?: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
    },
    callback?: any,
    responses?: Memory[],
  ) => Promise<ActionResult | void | undefined>;
}

export interface AlertGenerationAction extends Action {
  name: 'GENERATE_BUSINESS_ALERT';
  description: 'Generate intelligent business alerts based on metric thresholds and patterns';
  handler: (
    runtime: IAgentRuntime,
    message: Memory,
    state?: State,
    options?: {
      metricId?: string;
      threshold?: number;
      operator?: '>' | '<' | '=' | '>=' | '<=';
      severity?: 'info' | 'warning' | 'critical';
    },
    callback?: any,
    responses?: Memory[],
  ) => Promise<ActionResult | void | undefined>;
}

export interface PredictiveAnalysisAction extends Action {
  name: 'ANALYZE_BUSINESS_TRENDS';
  description: 'Perform predictive analysis on business metrics and generate insights';
  handler: (
    runtime: IAgentRuntime,
    message: Memory,
    state?: State,
    options?: {
      lookbackPeriod?: number; // days
      forecastPeriod?: number; // days
      departments?: string[];
    },
    callback?: any,
    responses?: Memory[],
  ) => Promise<ActionResult | void | undefined>;
}

export interface DepartmentAnalysisAction extends Action {
  name: 'ANALYZE_DEPARTMENT_PERFORMANCE';
  description: 'Analyze department performance and efficiency metrics';
  handler: (
    runtime: IAgentRuntime,
    message: Memory,
    state?: State,
    options?: {
      departmentId?: string;
      analysisType?:
        | 'performance'
        | 'efficiency'
        | 'budget'
        | 'risk'
        | 'comprehensive';
    },
    callback?: any,
    responses?: Memory[],
  ) => Promise<ActionResult | void | undefined>;
}

// Business Data Provider
export interface BusinessDataProvider extends Provider {
  name: 'business-context';
  description: 'Provides current business context and metrics for agent decision-making';
  get: (
    runtime: IAgentRuntime,
    message: Memory,
    state?: State,
  ) => Promise<ProviderResult>;
}

// Business Metrics Evaluator
export interface BusinessMetricsEvaluator extends Evaluator {
  name: 'business-metrics-evaluator';
  description: 'Evaluates agent responses for business insight quality and accuracy';
  handler: (
    runtime: IAgentRuntime,
    message: Memory,
    state?: State,
    options?: any,
    callback?: any,
    responses?: Memory[],
  ) => Promise<ActionResult | void | undefined>;
}

// Configuration Types
export interface BusinessIntelligenceConfig {
  dataRefreshInterval: number; // seconds
  alertThresholds: Record<string, number>;
  departmentWeights: Record<string, number>;
  agentRoles: {
    dataCollection: string[];
    analysis: string[];
    alerting: string[];
    reporting: string[];
  };
  integrations: {
    orreryEndpoint?: string;
    blockchainRegistry?: string;
    ipfsGateway?: string;
  };
}

// Event Types for Real-time Updates
export interface BusinessDataUpdateEvent {
  type:
    | 'METRIC_UPDATE'
    | 'ALERT_GENERATED'
    | 'DEPARTMENT_STATUS_CHANGE'
    | 'INSIGHT_CREATED';
  timestamp: Date;
  data: BusinessMetric | BusinessAlert | Department | AgentInsight;
  agentId?: string;
  source: string;
}

// API Response Types
export interface OrreryUpdatePayload {
  planets: Array<{
    id: string;
    value: number;
    growth: number;
    trend: string;
    alerts: BusinessAlert[];
    lastUpdated: Date;
  }>;
  departments: Array<{
    id: string;
    performance: number;
    efficiency: number;
    riskLevel: string;
  }>;
  universe: {
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
    growthRate: number;
    marketConditions: string;
  };
  insights: AgentInsight[];
  timestamp: Date;
}

export interface BlockchainCoordinationData {
  agentId: string;
  businessData: BusinessSnapshot;
  signature: string;
  timestamp: Date;
  ipfsHash?: string;
}

// Export all actions as array for plugin registration
export const BusinessIntelligenceActions = [
  'COLLECT_BUSINESS_DATA',
  'GENERATE_BUSINESS_ALERT',
  'ANALYZE_BUSINESS_TRENDS',
  'ANALYZE_DEPARTMENT_PERFORMANCE',
] as const;

export type BusinessIntelligenceActionType =
  (typeof BusinessIntelligenceActions)[number];
