/**
 * business-intelligence.types.ts - Type definitions for spatial BI integration
 */

export interface BusinessMetric {
  id: string;
  name: string;
  category: 'revenue' | 'expense' | 'asset' | 'liability' | 'kpi' | 'operational';
  value: number;
  target?: number;
  previousValue?: number;
  currency: string;
  trend: 'ascending' | 'descending' | 'stable' | 'volatile';
  priority: 'critical' | 'high' | 'medium' | 'low';
  confidence: number;
  volatility: number;
  source: 'agent' | 'api' | 'manual' | 'calculated';
  lastUpdated: Date;
  agentRole?: 'CEO' | 'CFO' | 'CTO' | 'CLO' | 'CMO';
  relatedMetrics?: string[];
}

export interface AgentInsight {
  id: string;
  agentRole: 'CEO' | 'CTO' | 'CFO' | 'CLO' | 'CMO';
  type: 'trend_analysis' | 'anomaly_detection' | 'prediction' | 'recommendation' | 'alert';
  title: string;
  content: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  priority: number;
  timestamp: Date;
  relatedMetrics?: string[];
  actionable: boolean;
  estimatedValue?: number;
  timeframe?: string;
  riskLevel?: number;
}

export interface BusinessAlert {
  id: string;
  type: 'threshold' | 'anomaly' | 'trend' | 'prediction' | 'system';
  severity: 'info' | 'warning' | 'critical' | 'emergency';
  title: string;
  message: string;
  metricId?: string;
  agentRole?: 'CEO' | 'CFO' | 'CTO' | 'CLO' | 'CMO';
  timestamp: Date;
  actionRequired: boolean;
  estimatedImpact?: number;
  suggestedActions?: string[];
  priority: number;
  resolved: boolean;
  resolvedAt?: Date;
}

export interface AgentAction {
  action: 'COLLECT_BUSINESS_DATA' | 'GENERATE_BUSINESS_ALERT' | 'ANALYZE_BUSINESS_TRENDS' | 'ANALYZE_DEPARTMENT_PERFORMANCE';
  parameters: any;
  context?: any;
}

export interface AgentResponse {
  success: boolean;
  data?: any;
  insights?: AgentInsight[];
  alerts?: BusinessAlert[];
  metrics?: BusinessMetric[];
  error?: string;
  executionTime?: number;
  agentRole?: string;
  confidence?: number;
}

export interface SpatialBusinessData {
  metrics: BusinessMetric[];
  insights: AgentInsight[];
  alerts: BusinessAlert[];
  departments: any[];
  lastUpdated: Date;
  syncStatus: 'connected' | 'syncing' | 'disconnected';
  agentStatus: {
    CEO: 'active' | 'inactive';
    CFO: 'active' | 'inactive';
    CTO: 'active' | 'inactive';
    CLO: 'active' | 'inactive';
    CMO: 'active' | 'inactive';
  };
}