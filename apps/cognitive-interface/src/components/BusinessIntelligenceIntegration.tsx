/**
 * BusinessIntelligenceIntegration.tsx - Real-time BI Plugin Integration
 * Connects spatial business universe with ElizaOS Business Intelligence Plugin
 */

import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  AgentAction,
  AgentInsight,
  AgentResponse,
  BusinessAlert,
  BusinessMetric,
  SpatialBusinessData,
} from '../types/business-intelligence';

interface BusinessIntelligenceIntegrationProps {
  onDataUpdate: (data: SpatialBusinessData) => void;
  onError: (error: string) => void;
  realTimeMode: boolean;
  refreshInterval: number;
  agentEndpoint?: string;
}

// Mock ElizaOS Business Intelligence Plugin integration
class BusinessIntelligencePlugin {
  private endpoint: string;
  private isConnected: boolean = false;
  private retryCount: number = 0;
  private maxRetries: number = 3;

  constructor(endpoint: string = 'http://localhost:3000/api/elizaos') {
    this.endpoint = endpoint;
  }

  async connect(): Promise<boolean> {
    try {
      // Simulate connection to ElizaOS runtime
      console.log('🔌 Connecting to ElizaOS Business Intelligence Plugin...');

      // Mock connection delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      this.isConnected = true;
      this.retryCount = 0;
      console.log('✅ Connected to ElizaOS Business Intelligence Plugin');
      return true;
    } catch (error) {
      console.error('❌ Failed to connect to ElizaOS:', error);
      this.isConnected = false;
      return false;
    }
  }

  async executeAction(action: AgentAction): Promise<AgentResponse> {
    if (!this.isConnected) {
      throw new Error('Not connected to ElizaOS runtime');
    }

    try {
      console.log(`🤖 Executing action: ${action.action}`);

      // Simulate agent processing time
      await new Promise((resolve) =>
        setTimeout(resolve, 500 + Math.random() * 1000),
      );

      // Generate mock response based on action type
      return this.generateMockResponse(action);
    } catch (error) {
      console.error(`❌ Action failed: ${action.action}`, error);
      throw error;
    }
  }

  private generateMockResponse(action: AgentAction): AgentResponse {
    const baseResponse: AgentResponse = {
      success: true,
      executionTime: 500 + Math.random() * 1000,
      confidence: 0.8 + Math.random() * 0.2,
    };

    switch (action.action) {
      case 'COLLECT_BUSINESS_DATA':
        return {
          ...baseResponse,
          agentRole: 'CFO',
          data: this.generateMockBusinessData(),
          metrics: this.generateMockMetrics(),
          insights: [this.generateMockInsight('CFO', 'trend_analysis')],
        };

      case 'ANALYZE_BUSINESS_TRENDS':
        return {
          ...baseResponse,
          agentRole: 'CEO',
          insights: [
            this.generateMockInsight('CEO', 'trend_analysis'),
            this.generateMockInsight('CEO', 'prediction'),
          ],
        };

      case 'ANALYZE_DEPARTMENT_PERFORMANCE':
        return {
          ...baseResponse,
          agentRole: 'CTO',
          data: this.generateMockDepartmentData(),
          insights: [this.generateMockInsight('CTO', 'recommendation')],
        };

      case 'GENERATE_BUSINESS_ALERT':
        return {
          ...baseResponse,
          agentRole: 'CFO',
          alerts: [this.generateMockAlert()],
        };

      default:
        throw new Error(`Unknown action: ${action.action}`);
    }
  }

  private generateMockBusinessData(): any {
    return {
      totalRevenue: 12500000 + (Math.random() - 0.5) * 1000000,
      totalExpenses: 8900000 + (Math.random() - 0.5) * 500000,
      netProfit: 3600000 + (Math.random() - 0.5) * 300000,
      cashFlow: 4200000 + (Math.random() - 0.5) * 400000,
      growthRate: 23.4 + (Math.random() - 0.5) * 5,
      marketConditions: ['bull', 'bear', 'neutral', 'volatile'][
        Math.floor(Math.random() * 4)
      ],
    };
  }

  private generateMockMetrics(): BusinessMetric[] {
    const metrics: BusinessMetric[] = [
      {
        id: 'revenue-saas',
        name: 'SaaS Revenue',
        category: 'revenue',
        value: 8200000 + (Math.random() - 0.5) * 500000,
        target: 9000000,
        previousValue: 7850000,
        currency: 'USD',
        trend: 'ascending',
        priority: 'critical',
        confidence: 0.92,
        volatility: 0.3,
        source: 'agent',
        lastUpdated: new Date(),
        agentRole: 'CFO',
      },
      {
        id: 'expense-operations',
        name: 'Operating Expenses',
        category: 'expense',
        value: 5200000 + (Math.random() - 0.5) * 300000,
        previousValue: 4950000,
        currency: 'USD',
        trend: 'stable',
        priority: 'high',
        confidence: 0.88,
        volatility: 0.2,
        source: 'agent',
        lastUpdated: new Date(),
        agentRole: 'CFO',
      },
      {
        id: 'kpi-customer-satisfaction',
        name: 'Customer Satisfaction',
        category: 'kpi',
        value: 87.5 + (Math.random() - 0.5) * 5,
        target: 90,
        previousValue: 86.2,
        currency: '%',
        trend: 'ascending',
        priority: 'medium',
        confidence: 0.85,
        volatility: 0.4,
        source: 'agent',
        lastUpdated: new Date(),
        agentRole: 'CMO',
      },
    ];

    return metrics;
  }

  private generateMockInsight(
    agentRole: AgentInsight['agentRole'],
    type: AgentInsight['type'],
  ): AgentInsight {
    const insights: Record<
      string,
      Record<string, { title: string; content: string }>
    > = {
      CEO: {
        trend_analysis: {
          title: 'Strategic Growth Acceleration',
          content:
            'Revenue growth momentum indicates 28% YoY expansion potential with current market conditions and operational efficiency improvements.',
        },
        prediction: {
          title: 'Q4 Performance Forecast',
          content:
            'Predictive models suggest 15.2% revenue growth in Q4, driven by enterprise segment expansion and product-market fit optimization.',
        },
      },
      CFO: {
        trend_analysis: {
          title: 'Cash Flow Optimization',
          content:
            'Free cash flow trends show 12% improvement opportunity through accounts receivable acceleration and expense timing optimization.',
        },
      },
      CTO: {
        recommendation: {
          title: 'Engineering Efficiency Enhancement',
          content:
            'Technical debt reduction initiative could improve development velocity by 23% and reduce infrastructure costs by $180K annually.',
        },
      },
    };

    const insight = insights[agentRole]?.[type] || {
      title: 'Business Intelligence Update',
      content: `${agentRole} agent has analyzed current business metrics and identified optimization opportunities.`,
    };

    return {
      id: `insight-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      agentRole,
      type,
      title: insight.title,
      content: insight.content,
      confidence: 0.8 + Math.random() * 0.2,
      impact: ['low', 'medium', 'high', 'critical'][
        Math.floor(Math.random() * 4)
      ] as AgentInsight['impact'],
      priority: Math.floor(Math.random() * 10) + 1,
      timestamp: new Date(),
      actionable: Math.random() > 0.3,
      estimatedValue: Math.random() * 500000,
      timeframe: ['1 week', '1 month', '1 quarter', '1 year'][
        Math.floor(Math.random() * 4)
      ],
      riskLevel: Math.random() * 10,
    };
  }

  private generateMockAlert(): BusinessAlert {
    const alertTypes = [
      {
        type: 'threshold',
        severity: 'warning',
        title: 'Revenue Target Alert',
        message:
          'Monthly revenue is 8% below target with 5 days remaining in period',
      },
      {
        type: 'anomaly',
        severity: 'critical',
        title: 'Expense Anomaly Detected',
        message:
          'Operating expenses increased 15% above normal range in the last 3 days',
      },
      {
        type: 'trend',
        severity: 'info',
        title: 'Positive Growth Trend',
        message:
          'Customer acquisition rate has increased 22% over the last 2 weeks',
      },
    ];

    const alert = alertTypes[Math.floor(Math.random() * alertTypes.length)];

    return {
      id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: alert.type as BusinessAlert['type'],
      severity: alert.severity as BusinessAlert['severity'],
      title: alert.title,
      message: alert.message,
      agentRole: ['CEO', 'CFO', 'CTO'][
        Math.floor(Math.random() * 3)
      ] as BusinessAlert['agentRole'],
      timestamp: new Date(),
      actionRequired: Math.random() > 0.5,
      estimatedImpact: Math.random() * 100000,
      suggestedActions: [
        'Review expense allocation',
        'Analyze customer feedback',
        'Optimize marketing spend',
        'Accelerate product development',
      ].slice(0, Math.floor(Math.random() * 3) + 1),
      priority: Math.floor(Math.random() * 10) + 1,
      resolved: false,
    };
  }

  private generateMockDepartmentData(): any {
    return {
      engineering: {
        performance: 87 + Math.random() * 10,
        budget: 3800000,
        budgetUtilization: 93 + Math.random() * 7,
        headcount: 72,
        efficiency: 87 + Math.random() * 8,
        productivity: 89000 + Math.random() * 10000,
      },
      sales: {
        performance: 92 + Math.random() * 8,
        budget: 2400000,
        budgetUtilization: 87 + Math.random() * 10,
        headcount: 45,
        efficiency: 94 + Math.random() * 6,
        productivity: 156000 + Math.random() * 20000,
      },
    };
  }

  disconnect(): void {
    this.isConnected = false;
    console.log('🔌 Disconnected from ElizaOS Business Intelligence Plugin');
  }

  isConnectedToRuntime(): boolean {
    return this.isConnected;
  }
}

export const BusinessIntelligenceIntegration: React.FC<
  BusinessIntelligenceIntegrationProps
> = ({
  onDataUpdate,
  onError,
  realTimeMode,
  refreshInterval,
  agentEndpoint,
}) => {
  const [plugin] = useState(
    () => new BusinessIntelligencePlugin(agentEndpoint),
  );
  const [isConnected, setIsConnected] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize plugin connection
  const initializePlugin = useCallback(async () => {
    try {
      const connected = await plugin.connect();
      setIsConnected(connected);

      if (connected) {
        console.log('🚀 Business Intelligence Plugin initialized successfully');
        await collectBusinessData();
      } else {
        onError('Failed to connect to ElizaOS Business Intelligence Plugin');
      }
    } catch (error) {
      console.error('💥 Plugin initialization error:', error);
      onError(`Plugin initialization failed: ${error}`);
    }
  }, [plugin, onError]);

  // Collect comprehensive business data
  const collectBusinessData = useCallback(async () => {
    if (!isConnected) return;

    try {
      console.log('📊 Collecting comprehensive business intelligence...');

      // Execute multiple agent actions in parallel
      const [dataResponse, trendsResponse, departmentResponse] =
        await Promise.all([
          plugin.executeAction({
            action: 'COLLECT_BUSINESS_DATA',
            parameters: {},
          }),
          plugin.executeAction({
            action: 'ANALYZE_BUSINESS_TRENDS',
            parameters: { timeRange: 'quarter' },
          }),
          plugin.executeAction({
            action: 'ANALYZE_DEPARTMENT_PERFORMANCE',
            parameters: {},
          }),
        ]);

      // Combine responses into spatial business data
      const spatialData: SpatialBusinessData = {
        metrics: [
          ...(dataResponse.metrics || []),
          ...(trendsResponse.metrics || []),
          ...(departmentResponse.metrics || []),
        ],
        insights: [
          ...(dataResponse.insights || []),
          ...(trendsResponse.insights || []),
          ...(departmentResponse.insights || []),
        ],
        alerts: [
          ...(dataResponse.alerts || []),
          ...(trendsResponse.alerts || []),
          ...(departmentResponse.alerts || []),
        ],
        departments: [
          {
            id: 'engineering',
            name: 'Engineering',
            centerPosition: { x: 500, y: 300 },
            ...(departmentResponse.data?.engineering || {}),
          },
          {
            id: 'sales',
            name: 'Sales & Marketing',
            centerPosition: { x: 300, y: 200 },
            ...(departmentResponse.data?.sales || {}),
          },
        ],
        lastUpdated: new Date(),
        syncStatus: 'connected',
        agentStatus: {
          CEO: 'active',
          CFO: 'active',
          CTO: 'active',
          CLO: 'active',
          CMO: 'active',
        },
      };

      setLastSyncTime(new Date());
      onDataUpdate(spatialData);

      console.log('✅ Business intelligence data synchronized successfully');
    } catch (error) {
      console.error('💥 Data collection error:', error);
      onError(`Data collection failed: ${error}`);
    }
  }, [isConnected, plugin, onDataUpdate, onError]);

  // Setup real-time data synchronization
  useEffect(() => {
    if (realTimeMode && isConnected) {
      console.log(`🔄 Starting real-time sync every ${refreshInterval}ms`);

      intervalRef.current = setInterval(() => {
        collectBusinessData();
      }, refreshInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [realTimeMode, isConnected, refreshInterval, collectBusinessData]);

  // Initialize on mount
  useEffect(() => {
    initializePlugin();

    return () => {
      plugin.disconnect();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [initializePlugin]);

  // Manual data refresh
  const refreshData = useCallback(() => {
    if (isConnected) {
      collectBusinessData();
    } else {
      initializePlugin();
    }
  }, [isConnected, collectBusinessData, initializePlugin]);

  return null; // This component only handles data integration
};

export default BusinessIntelligenceIntegration;
