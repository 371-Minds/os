/**
 * Enhanced Intelligence Plugin for ElizaOS
 * 
 * This plugin enhances agent intelligence with fuzzy logic decision making,
 * pattern recognition, mathematical optimization, and transparent decision explanation.
 */

import type { Plugin } from '@elizaos/core';
import { EnhancedIntelligenceActions } from './actions';

/**
 * The Enhanced Intelligence Plugin
 * 
 * When loaded into an ElizaOS agent, this plugin provides the agent with
 * advanced intelligence capabilities:
 * 
 * 1. Fuzzy Logic Decision Making - Multi-criteria decisions with uncertainty handling
 * 2. Pattern Recognition - Learning from historical decision patterns
 * 3. Mathematical Optimization - Resource allocation with constraints
 * 4. Decision Explanation - Transparent reasoning and audit trails
 * 5. WebGL Visualization Integration - 3D decision and pattern visualization
 * 
 * This represents the intelligence evolution from basic rule-based agents
 * to mathematically sophisticated decision-making entities with learning capabilities.
 */
export const EnhancedIntelligencePlugin: Plugin = {
  name: 'enhanced-intelligence',
  description:
    'Enhances agent intelligence with fuzzy logic, pattern recognition, and mathematical optimization',
  actions: EnhancedIntelligenceActions,
  evaluators: [],
  providers: [],
};