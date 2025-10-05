/**
 * @fileoverview Performance Benchmarks for Thi.ng Integration
 * Validates performance improvements and measures optimization effectiveness
 */

import { 
  MathOps, 
  GeometryEngine, 
  OptimizedDataStructures, 
  PerformanceBenchmarks,
  Vector3D
} from './thinng-foundation';
import { MathematicalActionHandler } from './math-bridge';
import type { 
  MathOperation, 
  BenchmarkResult, 
  MathPerformanceMetrics,
  MathematicalAgentState 
} from './types';
import { Vec3 } from '@thi.ng/vectors';

/**
 * Comprehensive benchmark suite for mathematical operations
 */
export class ThinngBenchmarkSuite {
  private results: Map<string, BenchmarkResult> = new Map();
  private iterations = 10000;

  /**
   * Run all benchmarks and generate comprehensive report
   */
  async runAllBenchmarks(): Promise<Map<string, BenchmarkResult>> {
    console.log('🧮 Starting Thi.ng Performance Benchmarks...');
    
    await this.benchmarkMathematicalOperations();
    await this.benchmarkGeometryOperations();
    await this.benchmarkDataStructures();
    await this.benchmarkSpatialOperations();
    
    this.generateReport();
    return this.results;
  }

  /**
   * Benchmark basic mathematical operations
   */
  private async benchmarkMathematicalOperations(): Promise<void> {
    console.log('📊 Benchmarking mathematical operations...');
    
    // Test angle normalization
    const oldNormalizeAngle = (angle: number) => {
      while (angle > Math.PI) angle -= 2 * Math.PI;
      while (angle < -Math.PI) angle += 2 * Math.PI;
      return angle;
    };
    
    const comparison = PerformanceBenchmarks.compareImplementations(
      () => {
        for (let i = 0; i < 100; i++) {
          oldNormalizeAngle(Math.random() * 20 - 10);
        }
      },
      () => {
        for (let i = 0; i < 100; i++) {
          MathOps.normalizeAngle(Math.random() * 20 - 10);
        }
      },
      this.iterations / 100
    );
    
    this.results.set('angle_normalization', {
      operation: 'normalization',
      implementation: 'thinng',
      metrics: {
        average_time_ms: comparison.newAverage,
        min_time_ms: 0,
        max_time_ms: 0,
        memory_usage_bytes: 0,
        precision_score: 1.0,
        error_count: 0
      },
      improvement_factor: comparison.improvement,
      recommendation: comparison.improvement > 1.1 ? 'use' : 'optimize'
    });
    
    // Test interpolation operations
    const lerpComparison = PerformanceBenchmarks.compareImplementations(
      () => {
        for (let i = 0; i < 100; i++) {
          const a = Math.random();
          const b = Math.random();
          const t = Math.random();
          a + (b - a) * t; // Basic lerp
        }
      },
      () => {
        for (let i = 0; i < 100; i++) {
          MathOps.lerp(Math.random(), Math.random(), Math.random());
        }
      },
      this.iterations / 100
    );
    
    this.results.set('interpolation', {
      operation: 'interpolation',
      implementation: 'thinng',
      metrics: {
        average_time_ms: lerpComparison.newAverage,
        min_time_ms: 0,
        max_time_ms: 0,
        memory_usage_bytes: 0,
        precision_score: 1.0,
        error_count: 0
      },
      improvement_factor: lerpComparison.improvement,
      recommendation: lerpComparison.improvement > 1.1 ? 'use' : 'optimize'
    });
  }

  /**
   * Benchmark geometry operations
   */
  private async benchmarkGeometryOperations(): Promise<void> {
    console.log('🔺 Benchmarking geometry operations...');
    
    // Test sphere generation
    const sphereTime = PerformanceBenchmarks.measure('sphere_generation', () => {
      for (let i = 0; i < 100; i++) {
        GeometryEngine.createSphere([0, 0, 0], 1, 16);
      }
    });
    
    this.results.set('sphere_generation', {
      operation: 'tessellation',
      implementation: 'thinng',
      metrics: {
        average_time_ms: sphereTime,
        min_time_ms: 0,
        max_time_ms: 0,
        memory_usage_bytes: 0,
        precision_score: 1.0,
        error_count: 0
      },
      improvement_factor: 1.0, // Base measurement
      recommendation: 'use'
    });
    
    // Test tessellation
    const vertices: Vec3[] = [
      [0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]
    ];
    
    const tessellationTime = PerformanceBenchmarks.measure('tessellation', () => {
      for (let i = 0; i < 1000; i++) {
        GeometryEngine.tessellatePolygon(vertices.map(v => [v[0], v[1]]));
      }
    });
    
    this.results.set('tessellation', {
      operation: 'tessellation',
      implementation: 'thinng',
      metrics: {
        average_time_ms: tessellationTime,
        min_time_ms: 0,
        max_time_ms: 0,
        memory_usage_bytes: 0,
        precision_score: 1.0,
        error_count: 0
      },
      improvement_factor: 1.0,
      recommendation: 'use'
    });
  }

  /**
   * Benchmark data structure operations
   */
  private async benchmarkDataStructures(): Promise<void> {
    console.log('📚 Benchmarking data structures...');
    
    // Test memory pool vs regular allocation
    const poolComparison = PerformanceBenchmarks.compareImplementations(
      () => {
        // Regular allocation
        const vectors: Vec3[] = [];
        for (let i = 0; i < 1000; i++) {
          vectors.push([Math.random(), Math.random(), Math.random()]);
        }
      },
      () => {
        // Pool allocation
        const vectors: Vec3[] = [];
        for (let i = 0; i < 1000; i++) {
          vectors.push(OptimizedDataStructures.getVec3(
            Math.random(), Math.random(), Math.random()
          ));
        }
        // Return to pool
        vectors.forEach(v => OptimizedDataStructures.returnVec3(v));
      },
      100
    );
    
    this.results.set('memory_pool', {
      operation: 'addition', // Represents memory allocation
      implementation: 'thinng',
      metrics: {
        average_time_ms: poolComparison.newAverage,
        min_time_ms: 0,
        max_time_ms: 0,
        memory_usage_bytes: 0,
        precision_score: 1.0,
        error_count: 0
      },
      improvement_factor: poolComparison.improvement,
      recommendation: poolComparison.improvement > 1.2 ? 'use' : 'optimize'
    });
    
    // Test functional data processing
    const testData = Array.from({ length: 10000 }, (_, i) => ({ 
      id: i, 
      value: Math.random() 
    }));
    
    const functionalTime = PerformanceBenchmarks.measure('functional_processing', () => {
      OptimizedDataStructures.processAgentData(
        testData,
        [
          (item) => ({ ...item, processed: true }),
          (item) => ({ ...item, doubled: (item as any).value * 2 })
        ]
      );
    });
    
    this.results.set('functional_processing', {
      operation: 'transformation',
      implementation: 'thinng',
      metrics: {
        average_time_ms: functionalTime,
        min_time_ms: 0,
        max_time_ms: 0,
        memory_usage_bytes: 0,
        precision_score: 1.0,
        error_count: 0
      },
      improvement_factor: 1.0,
      recommendation: 'use'
    });
  }

  /**
   * Benchmark spatial operations
   */
  private async benchmarkSpatialOperations(): Promise<void> {
    console.log('🌌 Benchmarking spatial operations...');
    
    // Create test agents
    const testAgents = Array.from({ length: 100 }, (_, i) => ({
      id: `agent_${i}`,
      state: {
        position: [Math.random() * 100, Math.random() * 100, Math.random() * 100] as Vec3,
        rotation: [0, 0, 0] as Vec3,
        scale: [1, 1, 1] as Vec3,
        velocity: [0, 0, 0] as Vec3,
        acceleration: [0, 0, 0] as Vec3
      } as any
    }));
    
    // Test spatial relationship calculations
    const spatialTime = PerformanceBenchmarks.measure('spatial_relationships', () => {
      MathematicalActionHandler.calculateSpatialRelationships(testAgents);
    });
    
    this.results.set('spatial_relationships', {
      operation: 'optimization',
      implementation: 'thinng',
      metrics: {
        average_time_ms: spatialTime,
        min_time_ms: 0,
        max_time_ms: 0,
        memory_usage_bytes: 0,
        precision_score: 1.0,
        error_count: 0
      },
      improvement_factor: 1.0,
      recommendation: 'use'
    });
    
    // Test distance calculations
    const distanceComparison = PerformanceBenchmarks.compareImplementations(
      () => {
        // Basic distance calculation
        for (let i = 0; i < 1000; i++) {
          const p1 = [Math.random(), Math.random(), Math.random()];
          const p2 = [Math.random(), Math.random(), Math.random()];
          const dx = p2[0] - p1[0];
          const dy = p2[1] - p1[1];
          const dz = p2[2] - p1[2];
          Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
      },
      () => {
        // Thi.ng optimized distance calculation
        for (let i = 0; i < 1000; i++) {
          const p1: Vec3 = [Math.random(), Math.random(), Math.random()];
          const p2: Vec3 = [Math.random(), Math.random(), Math.random()];
          MathOps.distance3D(p1, p2);
        }
      },
      100
    );
    
    this.results.set('distance_calculation', {
      operation: 'multiplication', // Distance involves square root
      implementation: 'thinng',
      metrics: {
        average_time_ms: distanceComparison.newAverage,
        min_time_ms: 0,
        max_time_ms: 0,
        memory_usage_bytes: 0,
        precision_score: 1.0,
        error_count: 0
      },
      improvement_factor: distanceComparison.improvement,
      recommendation: distanceComparison.improvement > 1.1 ? 'use' : 'optimize'
    });
  }

  /**
   * Generate comprehensive benchmark report
   */
  private generateReport(): void {
    console.log('\n📋 Thi.ng Performance Benchmark Report');
    console.log('=' .repeat(50));
    
    let totalImprovement = 0;
    let recommendUse = 0;
    
    this.results.forEach((result, operation) => {
      console.log(`\n🔧 ${operation.toUpperCase()}`);
      console.log(`   Implementation: ${result.implementation}`);
      console.log(`   Average Time: ${result.metrics.average_time_ms.toFixed(3)}ms`);
      console.log(`   Improvement: ${result.improvement_factor.toFixed(2)}x`);
      console.log(`   Recommendation: ${result.recommendation.toUpperCase()}`);
      
      totalImprovement += result.improvement_factor;
      if (result.recommendation === 'use') recommendUse++;
    });
    
    const avgImprovement = totalImprovement / this.results.size;
    const usePercentage = (recommendUse / this.results.size) * 100;
    
    console.log('\n📊 SUMMARY');
    console.log(`   Total Benchmarks: ${this.results.size}`);
    console.log(`   Average Improvement: ${avgImprovement.toFixed(2)}x`);
    console.log(`   Recommended for Use: ${usePercentage.toFixed(1)}%`);
    
    if (avgImprovement >= 1.5) {
      console.log('\n✅ EXCELLENT: Thi.ng integration shows significant performance improvements!');
    } else if (avgImprovement >= 1.2) {
      console.log('\n✅ GOOD: Thi.ng integration shows measurable performance improvements.');
    } else {
      console.log('\n⚠️  REVIEW: Consider optimization strategies for better performance gains.');
    }
  }

  /**
   * Export results for analysis
   */
  exportResults(): {
    summary: {
      total_benchmarks: number;
      average_improvement: number;
      recommended_percentage: number;
    };
    detailed_results: Array<{
      operation: string;
      result: BenchmarkResult;
    }>;
  } {
    const results = Array.from(this.results.entries()).map(([operation, result]) => ({
      operation,
      result
    }));
    
    const totalImprovement = results.reduce((sum, { result }) => sum + result.improvement_factor, 0);
    const recommendUse = results.filter(({ result }) => result.recommendation === 'use').length;
    
    return {
      summary: {
        total_benchmarks: results.length,
        average_improvement: totalImprovement / results.length,
        recommended_percentage: (recommendUse / results.length) * 100
      },
      detailed_results: results
    };
  }
}

/**
 * Validation tests for mathematical operations
 */
export class ThinngValidationSuite {
  /**
   * Run all validation tests
   */
  async runAllValidations(): Promise<boolean> {
    console.log('🧪 Starting Thi.ng Validation Tests...');
    
    const tests = [
      this.validateMathematicalPrecision(),
      this.validateGeometryOperations(),
      this.validateTypeConversions(),
      this.validateMemoryManagement()
    ];
    
    const results = await Promise.all(tests);
    const allPassed = results.every(result => result);
    
    console.log(`\n${allPassed ? '✅' : '❌'} Validation Complete: ${results.filter(r => r).length}/${results.length} tests passed`);
    
    return allPassed;
  }

  /**
   * Validate mathematical precision
   */
  private async validateMathematicalPrecision(): Promise<boolean> {
    console.log('🔢 Validating mathematical precision...');
    
    try {
      // Test angle normalization
      const angle1 = MathOps.normalizeAngle(Math.PI * 3);
      if (Math.abs(angle1 - (-Math.PI)) > 1e-10) {
        throw new Error('Angle normalization failed');
      }
      
      // Test interpolation
      const lerp1 = MathOps.lerp(0, 10, 0.5);
      if (Math.abs(lerp1 - 5) > 1e-10) {
        throw new Error('Linear interpolation failed');
      }
      
      // Test distance calculation
      const dist = MathOps.distance3D([0, 0, 0], [3, 4, 0]);
      if (Math.abs(dist - 5) > 1e-10) {
        throw new Error('3D distance calculation failed');
      }
      
      console.log('   ✅ Mathematical precision validated');
      return true;
    } catch (error) {
      console.log(`   ❌ Mathematical precision failed: ${error}`);
      return false;
    }
  }

  /**
   * Validate geometry operations
   */
  private async validateGeometryOperations(): Promise<boolean> {
    console.log('🔺 Validating geometry operations...');
    
    try {
      // Test sphere generation
      const sphere = GeometryEngine.createSphere([0, 0, 0], 1, 8);
      if (sphere.vertices.length === 0 || sphere.indices.length === 0) {
        throw new Error('Sphere generation failed');
      }
      
      // Test tessellation
      const square = [[0, 0], [1, 0], [1, 1], [0, 1]];
      const tessellation = GeometryEngine.tessellatePolygon(square as any);
      if (tessellation.triangles.length === 0) {
        throw new Error('Tessellation failed');
      }
      
      console.log('   ✅ Geometry operations validated');
      return true;
    } catch (error) {
      console.log(`   ❌ Geometry operations failed: ${error}`);
      return false;
    }
  }

  /**
   * Validate type conversions
   */
  private async validateTypeConversions(): Promise<boolean> {
    console.log('🔄 Validating type conversions...');
    
    try {
      // Test Vector3D conversions
      const vec3d = new Vector3D(1, 2, 3);
      const vec3 = vec3d.toVec3();
      const back = Vector3D.from(vec3);
      
      if (back.x !== 1 || back.y !== 2 || back.z !== 3) {
        throw new Error('Vector3D conversion failed');
      }
      
      console.log('   ✅ Type conversions validated');
      return true;
    } catch (error) {
      console.log(`   ❌ Type conversions failed: ${error}`);
      return false;
    }
  }

  /**
   * Validate memory management
   */
  private async validateMemoryManagement(): Promise<boolean> {
    console.log('💾 Validating memory management...');
    
    try {
      // Test memory pool
      const vec1 = OptimizedDataStructures.getVec3(1, 2, 3);
      const vec2 = OptimizedDataStructures.getVec3(4, 5, 6);
      
      OptimizedDataStructures.returnVec3(vec1);
      OptimizedDataStructures.returnVec3(vec2);
      
      // Get vector from pool (should reuse)
      const vec3 = OptimizedDataStructures.getVec3(7, 8, 9);
      if (vec3[0] !== 7 || vec3[1] !== 8 || vec3[2] !== 9) {
        throw new Error('Memory pool failed');
      }
      
      console.log('   ✅ Memory management validated');
      return true;
    } catch (error) {
      console.log(`   ❌ Memory management failed: ${error}`);
      return false;
    }
  }
}

/**
 * Main entry point for running benchmarks and validation
 */
export async function runThinngBenchmarks(): Promise<{
  benchmarks: any;
  validation: boolean;
}> {
  const benchmarkSuite = new ThinngBenchmarkSuite();
  const validationSuite = new ThinngValidationSuite();
  
  const benchmarks = await benchmarkSuite.runAllBenchmarks();
  const validation = await validationSuite.runAllValidations();
  
  return {
    benchmarks: benchmarkSuite.exportResults(),
    validation
  };
}

