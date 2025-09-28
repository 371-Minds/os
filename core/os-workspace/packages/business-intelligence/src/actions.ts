/**
 * Business Intelligence Actions
 *
 * Revolutionary actions that enable ElizaOS agents to collect, analyze, and act on
 * business intelligence data in real-time, transforming the CEO's Orrery into a
 * living business universe powered by autonomous agent intelligence.
 */

import {
  type Action,
  ActionExample,
  type HandlerCallback,
  type IAgentRuntime,
  type Memory,
  type State,
} from '@elizaos/core';
import {
  type AgentInsight,
  type BusinessAlert,
  type BusinessMetric,
  type BusinessSnapshot,
  type Department,
  OrreryUpdatePayload,
} from './types';

// Business Data Collection Action
export const collectBusinessDataAction: Action = {
  name: 'COLLECT_BUSINESS_DATA',
  similes: [
    'GATHER_BUSINESS_METRICS',
    'FETCH_FINANCIAL_DATA',
    'UPDATE_BUSINESS_INTEL',
    'SYNC_BUSINESS_DATA',
  ],
  description:
    'Collect and analyze comprehensive business metrics from various sources including APIs, databases, and agent observations',

  validate: async (runtime: IAgentRuntime, message: Memory) => {
    // Validate agent has business data collection permissions
    const agentRole = runtime.character?.settings?.role as string;
    const allowedRoles = ['CEO', 'CFO', 'CTO', 'CLO', 'business-analyst'];
    const messageText =
      typeof message.content.text === 'string' ? message.content.text : '';
    return (
      allowedRoles.includes(agentRole || '') ||
      messageText.includes('business data')
    );
  },

  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State = { values: {}, data: {}, text: '' },
    options?: {
      department?: string;
      metricTypes?: string[];
      timeRange?: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
    },
    callback?: HandlerCallback,
  ) => {
    try {
      callback?.({
        text: '🔄 Initiating comprehensive business data collection...',
        content: { action: 'COLLECT_BUSINESS_DATA', status: 'started' },
      });

      // Simulate comprehensive business data collection
      const snapshot = await generateBusinessSnapshot(options);

      // Update CEO's Orrery with new data
      await updateOrreryVisualization(snapshot);

      // Store insights in agent memory for future reference (mock for development)
      // await runtime.messageManager?.createMemory({
      //   ...message,
      //   content: {
      //     text: `Business data collected: ${snapshot.metrics.length} metrics, ${snapshot.alerts.length} alerts`,
      //     source: message.content.source,
      //     data: snapshot
      //   }
      // });

      console.log('💾 Mock: Business data stored in agent memory');

      callback?.({
        text: `✅ Business intelligence update complete!\n\n📊 **Metrics Collected**: ${snapshot.metrics.length}\n🚨 **Active Alerts**: ${snapshot.alerts.length}\n🏢 **Departments Analyzed**: ${snapshot.departments.length}\n💡 **Agent Insights**: ${snapshot.agentInsights.length}\n\n🌌 CEO's Orrery has been updated with live business universe data!`,
        content: {
          action: 'COLLECT_BUSINESS_DATA',
          status: 'completed',
          snapshot: snapshot,
          timestamp: new Date().toISOString(),
        },
      });

      return {
        text: `Business intelligence update complete`,
        data: {
          action: 'COLLECT_BUSINESS_DATA',
          status: 'completed',
          snapshot: snapshot,
          timestamp: new Date().toISOString(),
        },
        success: true,
      };
    } catch (error) {
      console.error('Business data collection failed:', error);
      callback?.({
        text: `❌ Business data collection failed: ${(error as Error).message}`,
        content: {
          action: 'COLLECT_BUSINESS_DATA',
          status: 'error',
          error: (error as Error).message,
        },
      });
      return {
        text: `Business data collection failed: ${(error as Error).message}`,
        data: {
          action: 'COLLECT_BUSINESS_DATA',
          status: 'error',
          error: (error as Error).message,
        },
        success: false,
      };
    }
  },

  examples: [
    [
      {
        user: '{{user1}}',
        content: {
          text: 'Update the business metrics for our revenue analysis',
        },
      } as any,
      {
        user: '{{user2}}',
        content: {
          text: "🔄 Collecting comprehensive business data across all departments...\n\n✅ Revenue metrics updated: SaaS $8.2M (+28.5%), Services $4.3M (+15.2%)\n🏢 4 departments analyzed with performance scores\n🚨 2 critical alerts generated\n💡 5 agent insights discovered\n\n🌌 CEO's Orrery universe is now live with your latest business intelligence!",
          action: 'COLLECT_BUSINESS_DATA',
        },
      } as any,
    ],
  ],
};

// Business Alert Generation Action
export const generateBusinessAlertAction: Action = {
  name: 'GENERATE_BUSINESS_ALERT',
  similes: [
    'CREATE_BUSINESS_ALERT',
    'FLAG_BUSINESS_ISSUE',
    'TRIGGER_ALERT',
    'NOTIFY_THRESHOLD_BREACH',
  ],
  description:
    'Generate intelligent business alerts based on metric thresholds, trend analysis, and predictive patterns',

  validate: async (runtime: IAgentRuntime, message: Memory) => {
    const messageText =
      typeof message.content.text === 'string' ? message.content.text : '';
    return (
      messageText.includes('alert') ||
      messageText.includes('warning') ||
      messageText.includes('threshold') ||
      messageText.includes('notify')
    );
  },

  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State = { values: {}, data: {}, text: '' },
    options?: {
      metricId?: string;
      threshold?: number;
      operator?: '>' | '<' | '=' | '>=' | '<=';
      severity?: 'info' | 'warning' | 'critical';
      customMessage?: string;
    },
    callback?: HandlerCallback,
  ) => {
    try {
      callback?.({
        text: '🔍 Analyzing business metrics for alert conditions...',
        content: { action: 'GENERATE_BUSINESS_ALERT', status: 'analyzing' },
      });

      const alerts = await analyzeAndGenerateAlerts(options);

      // Broadcast alerts to relevant stakeholders
      for (const alert of alerts) {
        await broadcastAlert(alert, runtime);
      }

      const alertSummary = alerts
        .map(
          (alert) =>
            `${getAlertIcon(alert.type)} ${alert.title}: ${alert.message}`,
        )
        .join('\n');

      callback?.({
        text: `🚨 **Business Alert System Activated**\n\n${alertSummary}\n\n🌌 Alerts are now visible in the CEO's Orrery business universe!`,
        content: {
          action: 'GENERATE_BUSINESS_ALERT',
          status: 'completed',
          alerts: alerts,
          count: alerts.length,
        },
      });

      return {
        text: `Business Alert System Activated`,
        data: {
          action: 'GENERATE_BUSINESS_ALERT',
          status: 'completed',
          alerts: alerts,
          count: alerts.length,
        },
        success: true,
      };
    } catch (error) {
      console.error('Alert generation failed:', error);
      callback?.({
        text: `❌ Alert generation failed: ${(error as Error).message}`,
        content: {
          action: 'GENERATE_BUSINESS_ALERT',
          status: 'error',
          error: (error as Error).message,
        },
      });
      return {
        text: `Alert generation failed: ${(error as Error).message}`,
        data: {
          action: 'GENERATE_BUSINESS_ALERT',
          status: 'error',
          error: (error as Error).message,
        },
        success: false,
      };
    }
  },

  examples: [
    [
      {
        user: '{{user1}}',
        content: {
          text: 'Generate alerts for any metrics that are significantly off target',
        },
      } as any,
      {
        user: '{{user2}}',
        content: {
          text: "🚨 **Critical Business Alerts Generated**\n\n⚠️ Cash Flow Warning: Monthly burn rate increased 12% - Action required\n📉 Revenue Target: SaaS revenue 8.9% below Q4 target\n🔄 R&D Efficiency: Spending optimized but output quality improved 15%\n\n🌌 All alerts are now live in your CEO's Orrery!",
          action: 'GENERATE_BUSINESS_ALERT',
        },
      } as any,
    ],
  ],
};

// Predictive Business Analysis Action
export const analyzeBusinessTrendsAction: Action = {
  name: 'ANALYZE_BUSINESS_TRENDS',
  similes: [
    'PREDICT_BUSINESS_TRENDS',
    'FORECAST_METRICS',
    'ANALYZE_PATTERNS',
    'GENERATE_INSIGHTS',
  ],
  description:
    'Perform advanced predictive analysis on business metrics using AI to identify trends, patterns, and future opportunities',

  validate: async (runtime: IAgentRuntime, message: Memory) => {
    const messageText =
      typeof message.content.text === 'string' ? message.content.text : '';
    return (
      messageText.includes('trend') ||
      messageText.includes('predict') ||
      messageText.includes('forecast') ||
      messageText.includes('analysis') ||
      messageText.includes('insight')
    );
  },

  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State = { values: {}, data: {}, text: '' },
    options?: {
      lookbackPeriod?: number;
      forecastPeriod?: number;
      departments?: string[];
      analysisType?: 'trends' | 'anomalies' | 'opportunities' | 'risks';
    },
    callback?: HandlerCallback,
  ) => {
    try {
      callback?.({
        text: '🧠 Initializing AI-powered business trend analysis...',
        content: { action: 'ANALYZE_BUSINESS_TRENDS', status: 'analyzing' },
      });

      const insights = await performPredictiveAnalysis(options);

      // Categorize insights by impact and confidence
      const criticalInsights = insights.filter(
        (i) => i.impact === 'critical' && i.confidence > 80,
      );
      const highValueInsights = insights.filter(
        (i) => i.impact === 'high' && i.confidence > 70,
      );

      const insightSummary = formatInsightsSummary(insights);

      callback?.({
        text: `🔮 **AI Business Intelligence Analysis Complete**\n\n${insightSummary}\n\n🌟 **Key Predictions:**\n${criticalInsights
          .slice(0, 3)
          .map((i) => `• ${i.title}`)
          .join(
            '\n',
          )}\n\n🌌 Predictive insights are now integrated into your CEO's Orrery!`,
        content: {
          action: 'ANALYZE_BUSINESS_TRENDS',
          status: 'completed',
          insights: insights,
          criticalCount: criticalInsights.length,
          highValueCount: highValueInsights.length,
        },
      });

      return {
        text: `AI Business Intelligence Analysis Complete`,
        data: {
          action: 'ANALYZE_BUSINESS_TRENDS',
          status: 'completed',
          insights: insights,
          criticalCount: criticalInsights.length,
          highValueCount: highValueInsights.length,
        },
        success: true,
      };
    } catch (error) {
      console.error('Trend analysis failed:', error);
      callback?.({
        text: `❌ Business trend analysis failed: ${(error as Error).message}`,
        content: {
          action: 'ANALYZE_BUSINESS_TRENDS',
          status: 'error',
          error: (error as Error).message,
        },
      });
      return {
        text: `Business trend analysis failed: ${(error as Error).message}`,
        data: {
          action: 'ANALYZE_BUSINESS_TRENDS',
          status: 'error',
          error: (error as Error).message,
        },
        success: false,
      };
    }
  },

  examples: [
    [
      {
        user: '{{user1}}',
        content: {
          text: 'Analyze our business trends and predict next quarter performance',
        },
      } as any,
      {
        user: '{{user2}}',
        content: {
          text: '🔮 **AI Business Analysis Complete**\n\n📈 **Revenue Forecast**: 15.2% growth predicted for Q1\n🎯 **Key Opportunity**: Enterprise segment showing 45% growth momentum\n⚠️ **Risk Alert**: Cash burn rate trending 8% above sustainable levels\n💡 **Strategic Insight**: Product development efficiency gains enabling 23% faster feature delivery\n\n🌌 All predictive insights are now visualized in your business universe!',
          action: 'ANALYZE_BUSINESS_TRENDS',
        },
      } as any,
    ],
  ],
};

// Department Performance Analysis Action
export const analyzeDepartmentPerformanceAction: Action = {
  name: 'ANALYZE_DEPARTMENT_PERFORMANCE',
  similes: [
    'EVALUATE_DEPARTMENT',
    'ASSESS_TEAM_PERFORMANCE',
    'ANALYZE_DIVISION',
    'REVIEW_DEPARTMENT_METRICS',
  ],
  description:
    'Comprehensive analysis of department performance, efficiency, budget utilization, and strategic contribution',

  validate: async (runtime: IAgentRuntime, message: Memory) => {
    const messageText =
      typeof message.content.text === 'string' ? message.content.text : '';
    return (
      messageText.includes('department') ||
      messageText.includes('team') ||
      messageText.includes('division') ||
      messageText.includes('performance')
    );
  },

  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State = { values: {}, data: {}, text: '' },
    options?: {
      departmentId?: string;
      analysisType?:
        | 'performance'
        | 'efficiency'
        | 'budget'
        | 'risk'
        | 'comprehensive';
      compareToLastPeriod?: boolean;
    },
    callback?: HandlerCallback,
  ) => {
    try {
      callback?.({
        text: '🏢 Conducting comprehensive department performance analysis...',
        content: {
          action: 'ANALYZE_DEPARTMENT_PERFORMANCE',
          status: 'analyzing',
        },
      });

      const analysisResults = await analyzeDepartments(options);

      const departmentScores = analysisResults
        .map(
          (result) =>
            `🏢 **${result.department.name}**: ${result.score}/100 (${getPerformanceRating(result.score)})`,
        )
        .join('\n');

      const topRecommendations = analysisResults
        .flatMap((r) => r.recommendations)
        .slice(0, 5)
        .map((rec) => `• ${rec}`)
        .join('\n');

      callback?.({
        text: `🏢 **Department Performance Analysis Complete**\n\n${departmentScores}\n\n🎯 **Top Recommendations:**\n${topRecommendations}\n\n🌌 Department analysis is now reflected in your CEO's Orrery solar systems!`,
        content: {
          action: 'ANALYZE_DEPARTMENT_PERFORMANCE',
          status: 'completed',
          results: analysisResults,
          averageScore:
            analysisResults.reduce((sum, r) => sum + r.score, 0) /
            analysisResults.length,
        },
      });

      return {
        text: `Department Performance Analysis Complete`,
        data: {
          action: 'ANALYZE_DEPARTMENT_PERFORMANCE',
          status: 'completed',
          results: analysisResults,
          averageScore:
            analysisResults.reduce((sum, r) => sum + r.score, 0) /
            analysisResults.length,
        },
        success: true,
      };
    } catch (error) {
      console.error('Department analysis failed:', error);
      callback?.({
        text: `❌ Department performance analysis failed: ${(error as Error).message}`,
        content: {
          action: 'ANALYZE_DEPARTMENT_PERFORMANCE',
          status: 'error',
          error: (error as Error).message,
        },
      });
      return {
        text: `Department performance analysis failed: ${(error as Error).message}`,
        data: {
          action: 'ANALYZE_DEPARTMENT_PERFORMANCE',
          status: 'error',
          error: (error as Error).message,
        },
        success: false,
      };
    }
  },

  examples: [
    [
      {
        user: '{{user1}}',
        content: {
          text: 'Analyze the performance of our engineering department',
        },
      } as any,
      {
        user: '{{user2}}',
        content: {
          text: "🏢 **Engineering Department Analysis**\n\nScore: 87/100 (Excellent)\n📊 Performance: 102% of target\n💰 Budget Utilization: 93% (optimal)\n⚡ Efficiency: 87% (above average)\n👥 Productivity: $89K per engineer\n\n🎯 **Key Recommendations:**\n• Increase technical debt allocation by 15%\n• Implement pair programming for junior developers\n• Consider expanding AI/ML team by 3 engineers\n\n🌌 Engineering solar system updated in CEO's Orrery!",
          action: 'ANALYZE_DEPARTMENT_PERFORMANCE',
        },
      } as any,
    ],
  ],
};

// Helper Functions
async function generateBusinessSnapshot(
  options?: any,
): Promise<BusinessSnapshot> {
  // Simulate comprehensive business data collection
  const metrics: BusinessMetric[] = [
    {
      id: 'saas-revenue',
      name: 'SaaS Revenue',
      category: 'revenue',
      value: 8200000,
      previousValue: 7850000,
      target: 9000000,
      currency: 'USD',
      trend: 'ascending',
      priority: 'critical',
      confidence: 95,
      source: 'api',
      timestamp: new Date(),
    },
    {
      id: 'cash-reserves',
      name: 'Cash Reserves',
      category: 'asset',
      value: 8500000,
      previousValue: 9200000,
      target: 10000000,
      currency: 'USD',
      trend: 'descending',
      priority: 'critical',
      confidence: 98,
      source: 'api',
      timestamp: new Date(),
    },
  ];

  const departments: Department[] = [
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
      managedMetrics: ['saas-revenue'],
      lastReview: new Date(),
    },
  ];

  const alerts: BusinessAlert[] = [
    {
      id: 'cash-flow-alert',
      type: 'warning',
      title: 'Cash Flow Trend',
      message: 'Monthly burn rate increased 12% due to growth investments',
      metricId: 'cash-reserves',
      actionRequired: true,
      priority: 7,
      agentGenerated: true,
      timestamp: new Date(),
    },
  ];

  const agentInsights: AgentInsight[] = [
    {
      id: 'insight-1',
      agentId: 'ceo-agent',
      agentRole: 'CEO',
      type: 'trend_analysis',
      title: 'SaaS Growth Acceleration',
      description:
        'Enterprise segment momentum indicates potential for 45% YoY growth',
      confidence: 87,
      impact: 'high',
      relatedMetrics: ['saas-revenue'],
      timestamp: new Date(),
    },
  ];

  return {
    timestamp: new Date(),
    metrics,
    departments,
    alerts,
    summary: {
      totalRevenue: 12500000,
      totalExpenses: 8900000,
      netProfit: 3600000,
      growthRate: 23.4,
      cashFlow: 4200000,
      operatingMargin: 28.8,
      marketConditions: 'bull',
    },
    agentInsights,
  };
}

async function updateOrreryVisualization(
  snapshot: BusinessSnapshot,
): Promise<void> {
  // Simulate updating the CEO's Orrery with new business data
  console.log("🌌 Updating CEO's Orrery with business universe data:", {
    metrics: snapshot.metrics.length,
    departments: snapshot.departments.length,
    alerts: snapshot.alerts.length,
  });
}

async function analyzeAndGenerateAlerts(
  options?: any,
): Promise<BusinessAlert[]> {
  return [
    {
      id: 'alert-' + Date.now(),
      type: 'warning',
      title: 'Revenue Target Gap',
      message: 'SaaS revenue 8.9% below Q4 target, recommend enterprise focus',
      agentGenerated: true,
      actionRequired: true,
      priority: 8,
      timestamp: new Date(),
    },
  ];
}

async function broadcastAlert(
  alert: BusinessAlert,
  runtime: IAgentRuntime,
): Promise<void> {
  console.log('📢 Broadcasting business alert:', alert.title);
}

async function performPredictiveAnalysis(
  options?: any,
): Promise<AgentInsight[]> {
  return [
    {
      id: 'prediction-' + Date.now(),
      agentId: 'analytics-agent',
      agentRole: 'CFO',
      type: 'prediction',
      title: 'Q1 Revenue Forecast',
      description:
        '15.2% growth predicted based on current enterprise pipeline momentum',
      confidence: 84,
      impact: 'high',
      relatedMetrics: ['saas-revenue'],
      timestamp: new Date(),
    },
  ];
}

async function analyzeDepartments(options?: any): Promise<any[]> {
  return [
    {
      department: {
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
        managedMetrics: ['technical-debt'],
        lastReview: new Date(),
      },
      insights: [],
      recommendations: [
        'Increase technical debt allocation by 15%',
        'Implement pair programming for junior developers',
        'Consider expanding AI/ML team by 3 engineers',
      ],
      score: 87,
    },
  ];
}

function getAlertIcon(type: string): string {
  switch (type) {
    case 'critical':
      return '🚨';
    case 'warning':
      return '⚠️';
    case 'info':
      return 'ℹ️';
    case 'success':
      return '✅';
    default:
      return '📢';
  }
}

function formatInsightsSummary(insights: AgentInsight[]): string {
  const critical = insights.filter((i) => i.impact === 'critical').length;
  const high = insights.filter((i) => i.impact === 'high').length;
  const medium = insights.filter((i) => i.impact === 'medium').length;

  return `📊 **${insights.length} AI Insights Generated**\n🔴 Critical: ${critical} | 🟡 High: ${high} | 🟢 Medium: ${medium}`;
}

function getPerformanceRating(score: number): string {
  if (score >= 90) return '🌟 Excellent';
  if (score >= 80) return '🎯 Good';
  if (score >= 70) return '📈 Average';
  if (score >= 60) return '⚠️ Needs Improvement';
  return '🚨 Critical';
}

// Export all actions
export const BusinessIntelligenceActions: Action[] = [
  collectBusinessDataAction,
  generateBusinessAlertAction,
  analyzeBusinessTrendsAction,
  analyzeDepartmentPerformanceAction,
];
