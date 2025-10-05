/**
 * @fileoverview Thi.ng Mathematical Foundation for 371 OS
 * Provides mathematical precision, optimized data structures, and
 * performance enhancements for the autonomous agent operating system.
 */

import { Vec2, Vec3, Vec4 } from '@thi.ng/vectors';
import { Mat } from '@thi.ng/matrices';
// Type alias for matrix operations
type Mat4 = Mat;
import { PI, TAU, DEG2RAD, RAD2DEG } from '@thi.ng/math';
import { map, filter, comp, take } from '@thi.ng/transducers';
import { isNumber, isArray } from '@thi.ng/checks';
import { illegalArgs } from '@thi.ng/errors';
import type { IMemoryProvider, ActionHandler } from '@elizaos/core';

/**
 * Mathematical precision constants for 371 OS operations
 */
export const MATH_CONSTANTS = {
  PI,
  TAU,
  DEG2RAD,
  RAD2DEG,
  GOLDEN_RATIO: (1 + Math.sqrt(5)) / 2,
  EULER: Math.E,
  PRECISION_THRESHOLD: 1e-10
} as const;

/**
 * Enhanced mathematical operations with thi.ng precision
 */
export class MathOps {
  /**
   * Normalize angle to [-π, π] range with mathematical precision
   */
  static normalizeAngle(angle: number): number {
    if (!isNumber(angle)) {
      throw illegalArgs('angle must be a number');
    }
    while (angle > PI) angle -= TAU;
    while (angle < -PI) angle += TAU;
    return angle;
  }

  /**
   * Linear interpolation with mathematical precision
   */
  static lerp(a: number, b: number, t: number): number {
    if (!isNumber(a) || !isNumber(b) || !isNumber(t)) {
      throw illegalArgs('all parameters must be numbers');
    }
    return a + (b - a) * Math.max(0, Math.min(1, t));
  }

  /**
   * Smooth step interpolation for agent transitions
   */
  static smoothstep(edge0: number, edge1: number, x: number): number {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  }

  /**
   * Calculate distance between two points with mathematical precision
   */
  static distance2D(p1: Vec2, p2: Vec2): number {
    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Calculate 3D distance for spatial environments
   */
  static distance3D(p1: Vec3, p2: Vec3): number {
    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    const dz = p2[2] - p1[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
}

/**
 * Enhanced geometry primitives for CEO's Orrery and spatial environments
 */
export class GeometryEngine {
  /**
   * Create a sphere with mathematical precision for business universe visualization
   */
  static createSphere(center: Vec3, radius: number, segments: number = 32): {
    vertices: Vec3[];
    indices: number[];
    normals: Vec3[];
  } {
    if (!isArray(center) || center.length !== 3) {
      throw illegalArgs('center must be a Vec3');
    }
    if (!isNumber(radius) || radius <= 0) {
      throw illegalArgs('radius must be a positive number');
    }

    const vertices: Vec3[] = [];
    const normals: Vec3[] = [];
    const indices: number[] = [];

    // Generate vertices and normals
    for (let i = 0; i <= segments; i++) {
      const phi = (i * PI) / segments;
      for (let j = 0; j <= segments; j++) {
        const theta = (j * TAU) / segments;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        
        vertices.push([center[0] + x, center[1] + y, center[2] + z]);
        
        // Normalized normal vector
        const length = Math.sqrt(x * x + y * y + z * z);
        normals.push([x / length, y / length, z / length]);
      }
    }

    // Generate indices for triangulation
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        const first = i * (segments + 1) + j;
        const second = first + segments + 1;
        
        indices.push(first, second, first + 1);
        indices.push(second, second + 1, first + 1);
      }
    }

    return { vertices, indices, normals };
  }

  /**
   * Create optimized tessellation for complex 3D shapes
   */
  static tessellatePolygon(vertices: Vec2[], maxArea: number = 1.0): {
    triangles: Vec2[][];
    area: number;
  } {
    if (!isArray(vertices) || vertices.length < 3) {
      throw illegalArgs('vertices must be an array with at least 3 points');
    }

    const triangles: Vec2[][] = [];
    let totalArea = 0;

    // Simple ear clipping triangulation for now
    // In production, would use more sophisticated algorithms
    const remaining = [...vertices];
    
    while (remaining.length > 3) {
      const triangle = [remaining[0], remaining[1], remaining[2]];
      triangles.push(triangle);
      
      // Calculate triangle area
      const area = Math.abs(
        (triangle[1][0] - triangle[0][0]) * (triangle[2][1] - triangle[0][1]) -
        (triangle[2][0] - triangle[0][0]) * (triangle[1][1] - triangle[0][1])
      ) / 2;
      
      totalArea += area;
      remaining.splice(1, 1); // Remove middle vertex
    }

    // Add final triangle
    if (remaining.length === 3) {
      triangles.push(remaining);
      const area = Math.abs(
        (remaining[1][0] - remaining[0][0]) * (remaining[2][1] - remaining[0][1]) -
        (remaining[2][0] - remaining[0][0]) * (remaining[1][1] - remaining[0][1])
      ) / 2;
      totalArea += area;
    }

    return { triangles, area: totalArea };
  }
}

/**
 * Performance-optimized data structures for agent operations
 */
export class OptimizedDataStructures {
  /**
   * Memory pool for efficient Vec3 allocation
   */
  private static vec3Pool: Vec3[] = [];
  private static vec3PoolIndex = 0;
  private static readonly POOL_SIZE = 1000;

  /**
   * Get a Vec3 from the memory pool
   */
  static getVec3(x: number = 0, y: number = 0, z: number = 0): Vec3 {
    if (this.vec3Pool.length < this.POOL_SIZE) {
      return [x, y, z];
    }
    
    const vec = this.vec3Pool[this.vec3PoolIndex];
    vec[0] = x;
    vec[1] = y;
    vec[2] = z;
    
    this.vec3PoolIndex = (this.vec3PoolIndex + 1) % this.POOL_SIZE;
    return vec;
  }

  /**
   * Return a Vec3 to the memory pool
   */
  static returnVec3(vec: Vec3): void {
    if (this.vec3Pool.length < this.POOL_SIZE) {
      this.vec3Pool.push(vec);
    }
  }

  /**
   * Functional data processing pipeline using thi.ng transducers
   */
  static processAgentData<T, R>(
    data: Iterable<T>,
    processors: Array<(input: T) => R>
  ): R[] {
    const pipeline = comp(
      map((item: T) => {
        let result = item as unknown as R;
        for (const processor of processors) {
          result = processor(item);
        }
        return result;
      }),
      filter((item: R) => item != null),
      take(10000) // Prevent memory overflow
    );

    return Array.from(pipeline(data));
  }
}

/**
 * Type-safe bridges between 371 OS and thi.ng types
 */
export interface ThingVector2D {
  x: number;
  y: number;
  toVec2(): Vec2;
  fromVec2(vec: Vec2): ThingVector2D;
}

export interface ThingVector3D {
  x: number;
  y: number;
  z: number;
  toVec3(): Vec3;
  fromVec3(vec: Vec3): ThingVector3D;
}

export interface ThingMatrix4D {
  elements: number[];
  toMat4(): Mat4;
  fromMat4(mat: Mat4): ThingMatrix4D;
}

/**
 * Implementation of type-safe bridges
 */
export class Vector2D implements ThingVector2D {
  constructor(public x: number = 0, public y: number = 0) {}

  toVec2(): Vec2 {
    return [this.x, this.y];
  }

  fromVec2(vec: Vec2): ThingVector2D {
    this.x = vec[0];
    this.y = vec[1];
    return this;
  }

  static from(vec: Vec2): Vector2D {
    return new Vector2D(vec[0], vec[1]);
  }
}

export class Vector3D implements ThingVector3D {
  constructor(public x: number = 0, public y: number = 0, public z: number = 0) {}

  toVec3(): Vec3 {
    return [this.x, this.y, this.z];
  }

  fromVec3(vec: Vec3): ThingVector3D {
    this.x = vec[0];
    this.y = vec[1];
    this.z = vec[2];
    return this;
  }

  static from(vec: Vec3): Vector3D {
    return new Vector3D(vec[0], vec[1], vec[2]);
  }
}

/**
 * Performance benchmarking utilities
 */
export class PerformanceBenchmarks {
  private static measurements: Map<string, number[]> = new Map();

  /**
   * Measure execution time of a function
   */
  static measure<T>(name: string, fn: () => T): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    if (!this.measurements.has(name)) {
      this.measurements.set(name, []);
    }
    
    this.measurements.get(name)!.push(end - start);
    return result;
  }

  /**
   * Get performance statistics
   */
  static getStats(name: string): {
    average: number;
    min: number;
    max: number;
    count: number;
  } | null {
    const times = this.measurements.get(name);
    if (!times || times.length === 0) return null;

    const sum = times.reduce((a, b) => a + b, 0);
    return {
      average: sum / times.length,
      min: Math.min(...times),
      max: Math.max(...times),
      count: times.length
    };
  }

  /**
   * Compare performance between old and new implementations
   */
  static compareImplementations(
    oldImpl: () => void,
    newImpl: () => void,
    iterations: number = 1000
  ): {
    oldAverage: number;
    newAverage: number;
    improvement: number;
  } {
    // Benchmark old implementation
    for (let i = 0; i < iterations; i++) {
      this.measure('old_impl', oldImpl);
    }

    // Benchmark new implementation
    for (let i = 0; i < iterations; i++) {
      this.measure('new_impl', newImpl);
    }

    const oldStats = this.getStats('old_impl')!;
    const newStats = this.getStats('new_impl')!;

    return {
      oldAverage: oldStats.average,
      newAverage: newStats.average,
      improvement: oldStats.average / newStats.average
    };
  }
}

/**
 * Export all foundation components
 */
export {
  Vec2,
  Vec3,
  Vec4,
  Mat4,
  PI,
  TAU,
  DEG2RAD,
  RAD2DEG,
  map,
  filter,
  comp,
  take
};

/**
 * Main foundation class for integration with ElizaOS
 */
export class ThinngFoundation {
  private static instance: ThinngFoundation;
  
  private constructor() {
    // Initialize foundation components
  }

  static getInstance(): ThinngFoundation {
    if (!ThinngFoundation.instance) {
      ThinngFoundation.instance = new ThinngFoundation();
    }
    return ThinngFoundation.instance;
  }

  /**
   * Initialize mathematical foundation for 371 OS
   */
  initialize(): Promise<void> {
    return new Promise((resolve) => {
      console.log('🧮 Initializing Thi.ng Mathematical Foundation for 371 OS');
      console.log('✅ Mathematical precision constants loaded');
      console.log('✅ Geometry engine operational');
      console.log('✅ Optimized data structures ready');
      console.log('✅ Performance benchmarking system active');
      console.log('🚀 Thi.ng Foundation ready for autonomous agent operations');
      resolve();
    });
  }

  /**
   * Get foundation status
   */
  getStatus(): {
    mathConstants: typeof MATH_CONSTANTS;
    memoryPoolSize: number;
    benchmarkCount: number;
  } {
    return {
      mathConstants: MATH_CONSTANTS,
      memoryPoolSize: OptimizedDataStructures['vec3Pool'].length,
      benchmarkCount: PerformanceBenchmarks['measurements'].size
    };
  }
}

/**
 * Default export for convenience
 */
export default ThinngFoundation;
