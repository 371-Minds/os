/**
 * @fileoverview Type definitions for Thi.ng integration with 371 OS
 * Provides comprehensive type safety for mathematical operations and spatial computing
 */

import type { Vec2, Vec3, Vec4 } from '@thi.ng/vectors';
import type { Mat } from '@thi.ng/matrices';
import type { State, Memory, AgentRuntime } from '@elizaos/core';

// Type alias for matrix operations
export type Mat4 = Mat;

/**
 * Mathematical precision levels for different operations
 */
export enum MathPrecision {
  LOW = 'low',      // Standard JavaScript precision
  MEDIUM = 'medium', // Enhanced precision with validation
  HIGH = 'high',     // Maximum precision with error correction
  SPATIAL = 'spatial' // Specialized for spatial operations
}

/**
 * Spatial coordinate systems used in 371 OS
 */
export enum CoordinateSystem {
  CARTESIAN = 'cartesian',     // Standard X, Y, Z coordinates
  POLAR = 'polar',             // Radius, angle, height
  SPHERICAL = 'spherical',     // Radius, azimuth, elevation
  BUSINESS_UNIVERSE = 'business_universe', // CEO's Orrery coordinates
  GALAXY_COORDS = 'galaxy_coords',         // Developer's Galaxy coordinates
  COSMOS_COORDS = 'cosmos_coords'          // Creator's Cosmos coordinates
}

/**
 * Mathematical operation types supported by the foundation
 */
export type MathOperation = 
  | 'addition'
  | 'subtraction'
  | 'multiplication'
  | 'division'
  | 'interpolation'
  | 'transformation'
  | 'projection'
  | 'rotation'
  | 'scaling'
  | 'normalization'
  | 'tessellation'
  | 'optimization';

/**
 * Spatial transformation types for agent operations
 */
export interface SpatialTransformation {
  type: 'translate' | 'rotate' | 'scale' | 'matrix';
  values: Vec3 | Vec4 | Mat4;
  coordinateSystem: CoordinateSystem;
  precision: MathPrecision;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'custom';
}

/**
 * Geometric primitive definitions for spatial environments
 */
export interface GeometricPrimitive {
  type: 'sphere' | 'cube' | 'cylinder' | 'plane' | 'mesh' | 'point_cloud';
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
  geometry: {
    vertices: Vec3[];
    indices?: number[];
    normals?: Vec3[];
    uvs?: Vec2[];
  };
  material?: {
    color: Vec4;
    opacity: number;
    metallic?: number;
    roughness?: number;
  };
}

/**
 * Spatial bounds for collision detection and optimization
 */
export interface SpatialBounds {
  min: Vec3;
  max: Vec3;
  center: Vec3;
  radius: number;
  volume: number;
  surface_area: number;
}

/**
 * Performance metrics for mathematical operations
 */
export interface MathPerformanceMetrics {
  operation: MathOperation;
  execution_time_ms: number;
  memory_usage_bytes: number;
  precision_level: MathPrecision;
  error_rate: number;
  optimization_factor: number;
}

/**
 * Spatial relationship between agents or objects
 */
export interface SpatialRelationship {
  distance: number;
  direction: Vec3;
  angle: number;
  relative_velocity?: Vec3;
  collision_probability?: number;
  interaction_strength?: number;
}

/**
 * Mathematical state for enhanced agent operations
 */
export interface MathematicalAgentState {
  agent_id: string;
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
  velocity: Vec3;
  acceleration: Vec3;
  angular_velocity: Vec3;
  spatial_bounds: SpatialBounds;
  coordinate_system: CoordinateSystem;
  precision_level: MathPrecision;
  last_updated: string;
}

/**
 * Spatial environment configuration
 */
export interface SpatialEnvironment {
  id: string;
  name: string;
  type: 'ceo_orrery' | 'developer_galaxy' | 'creator_cosmos' | 'general';
  bounds: SpatialBounds;
  coordinate_system: CoordinateSystem;
  agents: MathematicalAgentState[];
  objects: GeometricPrimitive[];
  physics_enabled: boolean;
  collision_detection: boolean;
  optimization_level: 'none' | 'basic' | 'advanced' | 'maximum';
}

/**
 * Mathematical memory with spatial indexing
 */
export interface SpatialMemory extends Memory {
  spatial_data?: {
    position: Vec3;
    bounds: SpatialBounds;
    coordinate_system: CoordinateSystem;
    precision: MathPrecision;
  };
  mathematical_context?: {
    calculations: MathOperation[];
    transformations: SpatialTransformation[];
    performance_metrics: MathPerformanceMetrics[];
  };
}

/**
 * Mathematical action with spatial context
 */
export interface MathematicalAction {
  type: string;
  spatial_context?: {
    environment_id: string;
    target_position?: Vec3;
    transformations: SpatialTransformation[];
    coordinate_system: CoordinateSystem;
  };
  mathematical_operations: {
    operation: MathOperation;
    inputs: (number | Vec2 | Vec3 | Vec4 | Mat4)[];
    precision: MathPrecision;
    validation_rules?: string[];
  }[];
  performance_requirements?: {
    max_execution_time_ms: number;
    max_memory_usage_bytes: number;
    required_precision: MathPrecision;
  };
}

/**
 * Spatial query parameters for memory and agent operations
 */
export interface SpatialQuery {
  center: Vec3;
  radius: number;
  bounds?: SpatialBounds;
  coordinate_system: CoordinateSystem;
  filter_criteria?: {
    agent_types?: string[];
    object_types?: string[];
    precision_levels?: MathPrecision[];
    time_range?: {
      start: string;
      end: string;
    };
  };
  sorting?: {
    by: 'distance' | 'relevance' | 'time' | 'performance';
    order: 'asc' | 'desc';
  };
  limit?: number;
}

/**
 * Mathematical optimization configuration
 */
export interface OptimizationConfig {
  target: 'performance' | 'precision' | 'memory' | 'balanced';
  constraints: {
    max_execution_time_ms?: number;
    max_memory_usage_bytes?: number;
    min_precision_level?: MathPrecision;
    required_accuracy?: number;
  };
  algorithms: {
    data_structures: 'standard' | 'optimized' | 'memory_pool';
    mathematical_operations: 'javascript' | 'thinng' | 'hybrid';
    spatial_indexing: 'none' | 'grid' | 'octree' | 'bvh';
  };
}

/**
 * Benchmark result for mathematical operations
 */
export interface BenchmarkResult {
  operation: MathOperation;
  implementation: 'old' | 'new' | 'thinng';
  metrics: {
    average_time_ms: number;
    min_time_ms: number;
    max_time_ms: number;
    memory_usage_bytes: number;
    precision_score: number;
    error_count: number;
  };
  improvement_factor: number;
  recommendation: 'use' | 'optimize' | 'replace';
}

/**
 * Thi.ng integration status
 */
export interface ThinngIntegrationStatus {
  phase: 'planning' | 'implementing' | 'testing' | 'complete';
  components: {
    mathematical_foundation: boolean;
    webgl_enhancement: boolean;
    agent_intelligence: boolean;
    performance_optimization: boolean;
  };
  performance_improvements: {
    rendering_fps: number;
    memory_usage_reduction: number;
    calculation_speed_improvement: number;
    precision_enhancement: number;
  };
  benchmark_results: BenchmarkResult[];
  errors: string[];
  warnings: string[];
}

/**
 * Spatial computing capabilities
 */
export interface SpatialComputingCapabilities {
  coordinate_systems: CoordinateSystem[];
  precision_levels: MathPrecision[];
  supported_operations: MathOperation[];
  geometric_primitives: GeometricPrimitive['type'][];
  transformation_types: SpatialTransformation['type'][];
  optimization_algorithms: string[];
  performance_targets: {
    min_fps: number;
    max_memory_mb: number;
    precision_threshold: number;
  };
}

/**
 * Agent mathematical capabilities
 */
export interface AgentMathCapabilities {
  agent_id: string;
  supported_operations: MathOperation[];
  precision_levels: MathPrecision[];
  coordinate_systems: CoordinateSystem[];
  spatial_awareness: boolean;
  collision_detection: boolean;
  pathfinding: boolean;
  optimization_algorithms: string[];
  performance_profile: {
    cpu_intensive: boolean;
    memory_intensive: boolean;
    precision_critical: boolean;
  };
}

/**
 * Mathematical validation rules
 */
export interface ValidationRule {
  name: string;
  description: string;
  rule: (value: any) => boolean;
  error_message: string;
  severity: 'error' | 'warning' | 'info';
}

/**
 * Type guards for mathematical types
 */
export type TypeGuard<T> = (value: unknown) => value is T;

export const isVec2: TypeGuard<Vec2> = (value): value is Vec2 => 
  Array.isArray(value) && value.length === 2 && value.every(v => typeof v === 'number');

export const isVec3: TypeGuard<Vec3> = (value): value is Vec3 => 
  Array.isArray(value) && value.length === 3 && value.every(v => typeof v === 'number');

export const isVec4: TypeGuard<Vec4> = (value): value is Vec4 => 
  Array.isArray(value) && value.length === 4 && value.every(v => typeof v === 'number');

export const isMat: TypeGuard<Mat> = (value): value is Mat => 
  Array.isArray(value) && value.length === 16 && value.every(v => typeof v === 'number');

export const isSpatialBounds: TypeGuard<SpatialBounds> = (value): value is SpatialBounds => 
  typeof value === 'object' && value !== null &&
  isVec3((value as any).min) &&
  isVec3((value as any).max) &&
  isVec3((value as any).center) &&
  typeof (value as any).radius === 'number' &&
  typeof (value as any).volume === 'number' &&
  typeof (value as any).surface_area === 'number';

export const isMathematicalAgentState: TypeGuard<MathematicalAgentState> = (value): value is MathematicalAgentState => 
  typeof value === 'object' && value !== null &&
  typeof (value as any).agent_id === 'string' &&
  isVec3((value as any).position) &&
  isVec3((value as any).rotation) &&
  isVec3((value as any).scale) &&
  isVec3((value as any).velocity) &&
  isVec3((value as any).acceleration) &&
  isVec3((value as any).angular_velocity) &&
  isSpatialBounds((value as any).spatial_bounds) &&
  Object.values(CoordinateSystem).includes((value as any).coordinate_system) &&
  Object.values(MathPrecision).includes((value as any).precision_level) &&
  typeof (value as any).last_updated === 'string';

/**
 * Utility types for mathematical operations
 */
export type MathValue = number | Vec2 | Vec3 | Vec4 | Mat4;
export type SpatialValue = Vec2 | Vec3 | Vec4;
export type TransformValue = Vec3 | Vec4 | Mat4;

/**
 * Function type definitions for mathematical operations
 */
export type MathFunction<T extends MathValue, R extends MathValue> = (input: T) => R;
export type SpatialFunction<T extends SpatialValue, R extends SpatialValue> = (input: T) => R;
export type TransformFunction = (transform: SpatialTransformation) => Mat4;

/**
 * Callback types for mathematical events
 */
export type MathOperationCallback = (result: MathPerformanceMetrics) => void;
export type SpatialUpdateCallback = (state: MathematicalAgentState) => void;
export type OptimizationCallback = (config: OptimizationConfig) => void;

/**
 * Configuration interface for Thi.ng integration
 */
export interface ThinngConfiguration {
  precision: MathPrecision;
  optimization: OptimizationConfig;
  capabilities: SpatialComputingCapabilities;
  validation_rules: ValidationRule[];
  performance_targets: {
    fps: number;
    memory_limit_mb: number;
    precision_threshold: number;
  };
  debugging: {
    enabled: boolean;
    log_level: 'error' | 'warn' | 'info' | 'debug';
    benchmark_mode: boolean;
  };
}

/**
 * Export all type definitions
 */
export type {
  Vec2,
  Vec3,
  Vec4,
  Mat,
  State,
  Memory,
  AgentRuntime
};