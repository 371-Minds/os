/**
 * Business Metrics Evaluator
 *
 * Evaluates agent responses for business insight quality, accuracy, and actionability,
 * ensuring that all business intelligence interactions maintain high standards.
 */

import type { Evaluator, IAgentRuntime, Memory, State } from '@elizaos/core';
import type { AgentInsight } from './types';

export const BusinessMetricsEvaluator: Evaluator = {
  name: 'business-metrics-evaluator',
  similes: [
    'business-insight-quality-checker',
    'business-response-analyzer',
    'business-accuracy-validator',
  ],
  description:
    'Evaluates agent responses for business insight quality, accuracy, and actionability to ensure high-quality business intelligence',

  validate: async (runtime: IAgentRuntime, message: Memory) => {
    // Run evaluation for business-related conversations
    const businessKeywords = [
      'revenue',
      'profit',
      'metrics',
      'business',
      'department',
      'performance',
      'kpi',
      'financial',
      'budget',
      'growth',
      'analysis',
      'forecast',
      'alert',
      'trend',
      'insight',
      'orrery',
    ];

    const messageText =
      typeof message.content.text === 'string'
        ? message.content.text.toLowerCase()
        : '';
    return businessKeywords.some((keyword) => messageText.includes(keyword));
  },

  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state?: State,
    options?: { [key: string]: unknown },
    callback?: any,
    responses?: Memory[],
  ) => {
    try {
      // Get response text from the last response or callback with proper type safety
      let responseText = '';
      if (responses && responses.length > 0) {
        const lastResponse = responses[responses.length - 1];
        responseText = (lastResponse.content.text as string) || '';
      }

      // Analyze response quality
      const qualityScore = evaluateResponseQuality(responseText);

      // Assess business relevance
      const businessRelevance = evaluateBusinessRelevance(
        responseText,
        message,
      );

      // Determine actionability
      const actionability = evaluateActionability(responseText);

      // Extract potential insights
      const insights = extractBusinessInsights(responseText, runtime);

      // Generate follow-up suggestions
      const suggestedFollowups = generateFollowupSuggestions(
        responseText,
        qualityScore,
      );

      // Log evaluation metrics for continuous improvement
      await logEvaluationMetrics({
        quality: qualityScore,
        businessRelevance,
        actionability,
        messageId: message.id || 'unknown',
        agentId: runtime.agentId || 'unknown',
        timestamp: new Date(),
      });

      return {
        text: `Business Intelligence Evaluation Complete`,
        data: {
          quality: qualityScore,
          businessRelevance,
          actionability,
          insights,
          suggestedFollowups,
        },
        success: true,
      };
    } catch (error) {
      console.error('Business metrics evaluation failed:', error);
      return {
        text: `Business metrics evaluation failed: ${(error as Error).message}`,
        data: {
          quality: 50,
          businessRelevance: 50,
          actionability: 30,
          insights: [],
          suggestedFollowups: [],
        },
        success: false,
      };
    }
  },

  examples: [
    {
      prompt: 'Agent provides revenue analysis',
      messages: [
        {
          name: 'user',
          content: { text: 'What does our revenue trend look like?' },
        },
        {
          name: 'agent',
          content: {
            text: 'Revenue is up 23.4% this quarter, with SaaS growing 28.5% and Services at 15.2%. Enterprise segment is particularly strong.',
          },
        },
      ],
      outcome:
        'High quality: specific metrics, clear trends, actionable segmentation',
    },
  ],
};

// Evaluation Functions
function evaluateResponseQuality(response: string): number {
  let score = 0;

  // Check for specific metrics (numbers, percentages, currency)
  const metricPatterns = [
    /\$[\d,]+[KMB]?/g, // Currency values
    /\d+\.?\d*%/g, // Percentages
    /\d+\.?\d*[KMB]/g, // Large numbers with K/M/B suffix
    /\d{1,3}(,\d{3})*/g, // Regular numbers with commas
  ];

  metricPatterns.forEach((pattern) => {
    const matches = response.match(pattern);
    if (matches && matches.length > 0) {
      score += Math.min(matches.length * 10, 30); // Up to 30 points for metrics
    }
  });

  // Check for trend indicators
  const trendWords = [
    'growth',
    'increase',
    'decrease',
    'trend',
    'rising',
    'falling',
    'stable',
  ];
  const trendCount = trendWords.filter((word) =>
    response.toLowerCase().includes(word),
  ).length;
  score += Math.min(trendCount * 5, 20); // Up to 20 points for trend language

  // Check for time context
  const timeWords = [
    'quarter',
    'month',
    'year',
    'week',
    'daily',
    'annual',
    'ytd',
    'qtd',
  ];
  const timeContext = timeWords.some((word) =>
    response.toLowerCase().includes(word),
  );
  if (timeContext) score += 15;

  // Check for business segments/departments
  const segmentWords = [
    'enterprise',
    'smb',
    'department',
    'division',
    'segment',
    'channel',
  ];
  const segmentContext = segmentWords.some((word) =>
    response.toLowerCase().includes(word),
  );
  if (segmentContext) score += 15;

  // Check for forward-looking statements
  const futureWords = [
    'forecast',
    'predict',
    'expect',
    'project',
    'target',
    'goal',
  ];
  const futureContext = futureWords.some((word) =>
    response.toLowerCase().includes(word),
  );
  if (futureContext) score += 20;

  return Math.min(score, 100);
}

function evaluateBusinessRelevance(response: string, message: Memory): number {
  let score = 0;

  // Check if response addresses the specific business question
  const messageText =
    typeof message.content.text === 'string' ? message.content.text : '';
  const messageWords = messageText.toLowerCase().split(' ');
  const responseWords = response.toLowerCase().split(' ');

  const relevantWords = messageWords.filter(
    (word) => word.length > 3 && responseWords.includes(word),
  );

  score += Math.min(relevantWords.length * 5, 40); // Up to 40 points for word overlap

  // Check for business domain vocabulary
  const businessTerms = [
    'revenue',
    'profit',
    'margin',
    'roi',
    'kpi',
    'metrics',
    'performance',
    'efficiency',
    'productivity',
    'budget',
    'cost',
    'investment',
    'return',
    'market',
    'customer',
    'growth',
    'strategy',
    'competitive',
    'analysis',
  ];

  const businessTermCount = businessTerms.filter((term) =>
    response.toLowerCase().includes(term),
  ).length;

  score += Math.min(businessTermCount * 3, 30); // Up to 30 points for business vocabulary

  // Check for specific business context (departments, products, etc.)
  const contextTerms = [
    'engineering',
    'sales',
    'marketing',
    'finance',
    'operations',
    'saas',
    'enterprise',
    'smb',
    'subscription',
    'recurring',
  ];

  const contextCount = contextTerms.filter((term) =>
    response.toLowerCase().includes(term),
  ).length;

  score += Math.min(contextCount * 5, 30); // Up to 30 points for business context

  return Math.min(score, 100);
}

function evaluateActionability(response: string): number {
  let score = 0;

  // Check for specific recommendations
  const actionWords = [
    'recommend',
    'suggest',
    'should',
    'need to',
    'must',
    'consider',
    'implement',
    'focus on',
    'prioritize',
    'action',
    'next step',
  ];

  const actionCount = actionWords.filter((word) =>
    response.toLowerCase().includes(word),
  ).length;

  score += Math.min(actionCount * 10, 40); // Up to 40 points for action language

  // Check for specific next steps or recommendations
  const stepPatterns = [/step \d+/gi, /\d+\.\s/g, /•\s/g, /-\s/g];

  stepPatterns.forEach((pattern) => {
    const matches = response.match(pattern);
    if (matches && matches.length > 0) {
      score += Math.min(matches.length * 5, 20);
    }
  });

  // Check for urgency indicators
  const urgencyWords = ['urgent', 'immediate', 'critical', 'asap', 'priority'];
  const urgencyContext = urgencyWords.some((word) =>
    response.toLowerCase().includes(word),
  );
  if (urgencyContext) score += 15;

  // Check for measurable outcomes
  const outcomeWords = [
    'target',
    'goal',
    'metric',
    'measure',
    'track',
    'monitor',
  ];
  const outcomeContext = outcomeWords.some((word) =>
    response.toLowerCase().includes(word),
  );
  if (outcomeContext) score += 25;

  return Math.min(score, 100);
}

function extractBusinessInsights(
  response: string,
  runtime: IAgentRuntime,
): AgentInsight[] {
  const insights: AgentInsight[] = [];

  // Extract numerical insights
  const percentMatches = response.match(/\d+\.?\d*%/g);
  if (percentMatches) {
    percentMatches.forEach((match, index) => {
      const value = Number.parseFloat(match.replace('%', ''));
      let impact: 'low' | 'medium' | 'high' | 'critical' = 'medium';

      if (value > 20 || value < -10) impact = 'high';
      if (value > 50 || value < -20) impact = 'critical';

      insights.push({
        id: `insight-${Date.now()}-${index}`,
        agentId: runtime.agentId || 'unknown',
        agentRole: 'CEO', // Default for business insights
        type: 'trend_analysis',
        title: `${value}% Change Identified`,
        description: `Significant ${value > 0 ? 'positive' : 'negative'} change of ${value}% detected in business metrics`,
        confidence: 75,
        impact,
        relatedMetrics: [],
        timestamp: new Date(),
      });
    });
  }

  // Extract trend insights
  const trendPatterns = [
    { pattern: /growing|increasing|rising|up/gi, type: 'positive_trend' },
    { pattern: /declining|decreasing|falling|down/gi, type: 'negative_trend' },
    { pattern: /stable|steady|consistent/gi, type: 'stable_trend' },
  ];

  trendPatterns.forEach(({ pattern, type }, index) => {
    const matches = response.match(pattern);
    if (matches && matches.length > 0) {
      insights.push({
        id: `trend-insight-${Date.now()}-${index}`,
        agentId: runtime.agentId || 'unknown',
        agentRole: 'CEO',
        type: 'trend_analysis',
        title: `${type.replace('_', ' ').toUpperCase()} Pattern Detected`,
        description: `Business metrics showing ${type.replace('_', ' ')} pattern`,
        confidence: 70,
        impact: 'medium',
        relatedMetrics: [],
        timestamp: new Date(),
      });
    }
  });

  return insights.slice(0, 3); // Limit to top 3 insights
}

function generateFollowupSuggestions(
  response: string,
  qualityScore: number,
): string[] {
  const suggestions: string[] = [];

  if (qualityScore < 70) {
    suggestions.push('Request more specific metrics and data points');
    suggestions.push(
      'Ask for time-based comparisons (month-over-month, year-over-year)',
    );
  }

  if (!response.toLowerCase().includes('recommend')) {
    suggestions.push('Ask for specific recommendations based on the analysis');
  }

  if (
    !response.toLowerCase().includes('forecast') &&
    !response.toLowerCase().includes('predict')
  ) {
    suggestions.push('Request predictive analysis and future projections');
  }

  if (
    !response.toLowerCase().includes('department') &&
    !response.toLowerCase().includes('segment')
  ) {
    suggestions.push('Ask for breakdown by department or business segment');
  }

  if (!response.toLowerCase().includes('risk')) {
    suggestions.push('Inquire about potential risks and mitigation strategies');
  }

  return suggestions.slice(0, 3); // Limit to top 3 suggestions
}

async function logEvaluationMetrics(metrics: {
  quality: number;
  businessRelevance: number;
  actionability: number;
  messageId: string;
  agentId: string;
  timestamp: Date;
}): Promise<void> {
  // Log evaluation metrics for continuous improvement
  console.log('📊 Business Intelligence Evaluation:', {
    quality: `${metrics.quality}/100`,
    relevance: `${metrics.businessRelevance}/100`,
    actionability: `${metrics.actionability}/100`,
    messageId: metrics.messageId,
    timestamp: metrics.timestamp.toISOString(),
  });

  // In production, this would store metrics in a database for analysis
}
