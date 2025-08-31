/**
 * Cognitive Interface Components - Index
 * 
 * Revolutionary cognitive-aware interface system for 371 OS.
 * Exports all components for the Galaxy Engine universe paradigm.
 */

export { ExecutiveMode } from './ExecutiveMode';
export { TechnicalMode } from './TechnicalMode';
export { CreativeMode } from './CreativeMode';
export { CognitiveModeSwicher } from './CognitiveModeSwicher';
export { AdaptiveLayout } from './AdaptiveLayout';
export { default as ReadersConstellation } from './ReaderConstellation';

// Type exports for component props and interfaces
export type {
  KPIMetric,
  AgentStatus,
  StrategicAlert
} from './ExecutiveMode';

export type {
  SystemMetric,
  BuildStatus,
  QualityMetric,
  DevelopmentTool
} from './TechnicalMode';

export type {
  CreativeProject,
  ContentMetric,
  CreativeInsight,
  CreativeTool
} from './CreativeMode';

export type {
  CognitiveMode,
  CognitiveContext,
  CognitiveTransition
} from './CognitiveModeSwicher';

// Galaxy Engine Universe Prototypes
export type {
  Book,
  Constellation,
  UniverseState
} from './ReaderConstellation';

// Re-export AdaptiveLayout as default for main app integration
export { AdaptiveLayout as default } from './AdaptiveLayout';