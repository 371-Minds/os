/**
 * Business Intelligence Plugin - Real-time CEO's Orrery Data Integration
 * 
 * This plugin enables real-time business data synchronization between ElizaOS agents
 * and the CEO's Orrery visualization system, transforming traditional BI dashboards
 * into a living, breathing business universe.
 * 
 * Revolutionary Features:
 * - Agent-driven business data collection and analysis
 * - Real-time financial planet updates from autonomous agents
 * - Smart alert generation based on business threshold events
 * - Cross-department coordination through blockchain registry
 * - Predictive analytics through agent intelligence
 */

import { Plugin } from '@elizaos/core';
import { BusinessIntelligenceActions } from './actions';
import { BusinessDataProvider } from './provider';
import { BusinessMetricsEvaluator } from './evaluator';

export const BusinessIntelligencePlugin: Plugin = {
  name: 'business-intelligence',
  description: 'Revolutionary business intelligence engine connecting ElizaOS agents with CEO\'s Orrery for real-time business universe visualization',
  
  actions: BusinessIntelligenceActions,
  
  evaluators: [BusinessMetricsEvaluator],
  
  providers: [BusinessDataProvider]
};

// Export the plugin as default for easy importing
export default BusinessIntelligencePlugin;