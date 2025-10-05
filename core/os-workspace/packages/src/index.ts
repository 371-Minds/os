// Mathematical Foundation Exports
export * from './lib/thinng-foundation';
export * from './lib/math-bridge';
export * from './lib/performance-benchmarks';

// Test runner for Phase 1 validation
export { runPhase1Tests } from './lib/test-runner';

// Type exports (avoiding conflicts)
export type {
  MathPrecision,
  CoordinateSystem,
  MathOperation,
  SpatialTransformation,
  GeometricPrimitive,
  SpatialBounds,
  MathPerformanceMetrics,
  SpatialRelationship,
  MathematicalAgentState,
  SpatialEnvironment,
  SpatialMemory,
  MathematicalAction,
  SpatialQuery,
  OptimizationConfig,
  BenchmarkResult,
  ThinngIntegrationStatus,
  SpatialComputingCapabilities,
  AgentMathCapabilities,
  ValidationRule,
  ThinngConfiguration,
  MathValue,
  SpatialValue,
  TransformValue,
  MathFunction,
  SpatialFunction,
  TransformFunction,
  MathOperationCallback,
  SpatialUpdateCallback,
  OptimizationCallback
} from './lib/types';

// Main foundation instance
export { default as ThinngFoundation } from './lib/thinng-foundation';
