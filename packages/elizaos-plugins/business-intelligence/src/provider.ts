/**
 * Business Data Provider
 * 
 * Provides comprehensive business context and real-time metrics to ElizaOS agents,
 * enabling intelligent decision-making based on current business state.
 */

import { Provider, IAgentRuntime, Memory, State } from '@elizaos/core';
import { BusinessMetric, BusinessAlert, Department } from './types';

export const BusinessDataProvider: Provider = {
  name: 'business-context',
  description: 'Provides current business context, metrics, and departmental status for agent decision-making',
  
  get: async (
    runtime: IAgentRuntime,
    message: Memory,
    state?: State
  ) => {
    try {
      // Get current business metrics
      const currentMetrics = await getCurrentBusinessMetrics();
      
      // Get active alerts
      const activeAlerts = await getActiveBusinessAlerts();
      
      // Get department status
      const departmentStatus = await getDepartmentStatus();
      
      // Determine market conditions
      const marketConditions = analyzeMarketConditions(currentMetrics);
      
      // Format business context for LLM
      const businessContext = formatBusinessContext({
        currentMetrics,
        activeAlerts,
        departmentStatus,
        marketConditions
      });

      return {
        text: businessContext,
        data: {
          currentMetrics,
          activeAlerts,
          departmentStatus,
          marketConditions,
          lastUpdated: new Date()
        }
      };
    } catch (error) {
      console.error('Failed to provide business context:', error);
      return {
        text: 'Business context temporarily unavailable',
        data: {
          error: (error as Error).message,
          lastUpdated: new Date()
        }
      };
    }
  }
};

// Helper functions
async function getCurrentBusinessMetrics(): Promise<BusinessMetric[]> {
  // Simulate fetching current business metrics
  return [
    {
      id: 'total-revenue',
      name: 'Total Revenue',
      category: 'revenue',
      value: 12500000,
      previousValue: 11800000,
      target: 13000000,
      currency: 'USD',
      trend: 'ascending',
      priority: 'critical',
      confidence: 95,
      source: 'api',
      timestamp: new Date()
    },
    {
      id: 'net-profit',
      name: 'Net Profit',
      category: 'revenue',
      value: 3600000,
      previousValue: 3200000,
      target: 4000000,
      currency: 'USD',
      trend: 'ascending',
      priority: 'critical',
      confidence: 92,
      source: 'calculated',
      timestamp: new Date()
    },
    {
      id: 'cash-flow',
      name: 'Cash Flow',
      category: 'asset',
      value: 4200000,
      previousValue: 4500000,
      target: 5000000,
      currency: 'USD',
      trend: 'descending',
      priority: 'high',
      confidence: 88,
      source: 'api',
      timestamp: new Date()
    },
    {
      id: 'customer-satisfaction',
      name: 'Customer Satisfaction',
      category: 'kpi',
      value: 4.7,
      previousValue: 4.5,
      target: 4.8,
      unit: '/5',
      trend: 'ascending',
      priority: 'high',
      confidence: 90,
      source: 'agent',
      timestamp: new Date()
    }
  ];
}

async function getActiveBusinessAlerts(): Promise<BusinessAlert[]> {
  // Simulate fetching active business alerts
  return [
    {
      id: 'cash-flow-alert',
      type: 'warning',
      title: 'Cash Flow Trend',
      message: 'Monthly burn rate increased 12% due to growth investments',
      metricId: 'cash-flow',
      threshold: {
        operator: '<',
        value: 4500000,
        breachedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      actionRequired: true,
      priority: 7,
      agentGenerated: true,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: 'customer-growth-alert',
      type: 'success',
      title: 'Customer Satisfaction Improvement',
      message: 'NPS score improved to 72, exceeding industry average',
      metricId: 'customer-satisfaction',
      actionRequired: false,
      priority: 5,
      agentGenerated: true,
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
    }
  ];
}

async function getDepartmentStatus(): Promise<Department[]> {
  // Simulate fetching department status
  return [
    {
      id: 'sales',
      name: 'Sales & Marketing',
      type: 'sales',
      headcount: 45,
      budget: 2400000,
      budgetUtilization: 87,
      performance: 118,
      efficiency: 94,
      productivity: 156000,
      riskLevel: 'low',
      strategicImportance: 9,
      managedMetrics: ['total-revenue'],
      lastReview: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'engineering',
      name: 'Engineering',
      type: 'engineering',
      headcount: 72,
      budget: 3800000,
      budgetUtilization: 93,
      performance: 102,
      efficiency: 87,
      productivity: 89000,
      riskLevel: 'medium',
      strategicImportance: 10,
      managedMetrics: ['customer-satisfaction'],
      lastReview: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'operations',
      name: 'Operations',
      type: 'operations',
      headcount: 38,
      budget: 1600000,
      budgetUtilization: 91,
      performance: 95,
      efficiency: 91,
      productivity: 67000,
      riskLevel: 'low',
      strategicImportance: 7,
      managedMetrics: ['cash-flow'],
      lastReview: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'finance',
      name: 'Finance & Legal',
      type: 'finance',
      headcount: 18,
      budget: 800000,
      budgetUtilization: 78,
      performance: 108,
      efficiency: 96,
      productivity: 112000,
      riskLevel: 'low',
      strategicImportance: 8,
      managedMetrics: ['net-profit'],
      lastReview: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ];
}

function analyzeMarketConditions(metrics: BusinessMetric[]): string {
  const revenueMetric = metrics.find(m => m.id === 'total-revenue');
  const profitMetric = metrics.find(m => m.id === 'net-profit');
  
  if (revenueMetric?.trend === 'ascending' && profitMetric?.trend === 'ascending') {
    return 'bull';
  } else if (revenueMetric?.trend === 'descending' && profitMetric?.trend === 'descending') {
    return 'bear';
  } else if (revenueMetric?.trend === 'volatile' || profitMetric?.trend === 'volatile') {
    return 'volatile';
  }
  
  return 'neutral';
}

function formatBusinessContext(data: {
  currentMetrics: BusinessMetric[];
  activeAlerts: BusinessAlert[];
  departmentStatus: Department[];
  marketConditions: string;
}): string {
  const { currentMetrics, activeAlerts, departmentStatus, marketConditions } = data;
  
  // Format key metrics
  const keyMetrics = currentMetrics
    .filter(m => m.priority === 'critical')
    .map(m => `${m.name}: ${formatMetricValue(m)}`)
    .join(', ');
  
  // Format active alerts
  const criticalAlerts = activeAlerts
    .filter(a => a.type === 'critical' || a.type === 'warning')
    .map(a => `${a.title}: ${a.message}`)
    .join('; ');
  
  // Format department performance
  const topPerformers = departmentStatus
    .filter(d => d.performance > 100)
    .map(d => `${d.name} (${d.performance}%)`)
    .join(', ');
  
  const underPerformers = departmentStatus
    .filter(d => d.performance < 95)
    .map(d => `${d.name} (${d.performance}%)`)
    .join(', ');

  return `CURRENT BUSINESS CONTEXT:

📊 Key Metrics: ${keyMetrics}
📈 Market Conditions: ${marketConditions.toUpperCase()}
🚨 Active Alerts: ${criticalAlerts || 'None'}

🏢 Department Performance:
✅ Top Performers: ${topPerformers || 'All departments meeting targets'}
⚠️ Need Attention: ${underPerformers || 'All departments performing well'}

📅 Last Updated: ${new Date().toLocaleString()}

This business context should inform all strategic decisions and recommendations.`;
}

function formatMetricValue(metric: BusinessMetric): string {
  if (metric.currency) {
    const value = metric.value >= 1000000 
      ? `$${(metric.value / 1000000).toFixed(1)}M`
      : `$${(metric.value / 1000).toFixed(0)}K`;
    
    const change = metric.previousValue 
      ? ((metric.value - metric.previousValue) / metric.previousValue * 100).toFixed(1)
      : '0';
    
    return `${value} (${change > '0' ? '+' : ''}${change}%)`;
  }
  
  if (metric.unit) {
    return `${metric.value}${metric.unit}`;
  }
  
  return metric.value.toString();
}