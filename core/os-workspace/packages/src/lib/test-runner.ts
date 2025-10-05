/**
 * @fileoverview Test Runner for Thi.ng Mathematical Foundation
 * Simple validation script to verify Phase 1 implementation
 */

import {
  ThinngFoundation,
  MathOps,
  GeometryEngine,
  OptimizedDataStructures,
  PerformanceBenchmarks,
  Vector3D,
  MATH_CONSTANTS
} from './thinng-foundation';
import {
  MathematicalMemoryProvider,
  MathematicalActionHandler,
  ElizaMathUtils
} from './math-bridge';
import { runThinngBenchmarks } from './performance-benchmarks';

/**
 * Simple test runner for Phase 1 validation
 */
class Phase1TestRunner {
  private passedTests = 0;
  private totalTests = 0;

  async runAllTests(): Promise<boolean> {
    console.log('🚀 Starting Phase 1 Implementation Tests...\n');

    await this.testFoundationInitialization();
    await this.testMathematicalOperations();
    await this.testGeometryEngine();
    await this.testDataStructures();
    await this.testMemoryProvider();
    await this.testPerformanceBenchmarks();

    const success = this.passedTests === this.totalTests;
    console.log(`\n📊 Test Results: ${this.passedTests}/${this.totalTests} passed`);
    
    if (success) {
      console.log('✅ Phase 1 Implementation: ALL TESTS PASSED');
      console.log('🎯 Ready for Phase 2: WebGL Rendering Enhancement');
    } else {
      console.log('❌ Some tests failed - review implementation');
    }

    return success;
  }

  private async test(name: string, testFn: () => void | Promise<void>): Promise<void> {
    this.totalTests++;
    try {
      await testFn();
      console.log(`  ✅ ${name}`);
      this.passedTests++;
    } catch (error) {
      console.log(`  ❌ ${name}: ${error}`);
    }
  }

  private async testFoundationInitialization(): Promise<void> {
    console.log('🏗️  Testing Foundation Initialization...');

    await this.test('Foundation singleton', () => {
      const foundation1 = ThinngFoundation.getInstance();
      const foundation2 = ThinngFoundation.getInstance();
      if (foundation1 !== foundation2) {
        throw new Error('Foundation should be singleton');
      }
    });

    await this.test('Foundation initialization', async () => {
      const foundation = ThinngFoundation.getInstance();
      await foundation.initialize();
      const status = foundation.getStatus();
      if (!status.mathConstants) {
        throw new Error('Math constants not loaded');
      }
    });

    await this.test('Math constants accuracy', () => {
      if (Math.abs(MATH_CONSTANTS.PI - Math.PI) > 1e-10) {
        throw new Error('PI constant inaccurate');
      }
      if (Math.abs(MATH_CONSTANTS.TAU - (2 * Math.PI)) > 1e-10) {
        throw new Error('TAU constant inaccurate');
      }
    });
  }

  private async testMathematicalOperations(): Promise<void> {
    console.log('\n🧮 Testing Mathematical Operations...');

    await this.test('Angle normalization', () => {
      const normalized = MathOps.normalizeAngle(Math.PI * 3);
      if (Math.abs(normalized - (-Math.PI)) > 1e-10) {
        throw new Error('Angle normalization failed');
      }
    });

    await this.test('Linear interpolation', () => {
      const result = MathOps.lerp(0, 10, 0.5);
      if (result !== 5) {
        throw new Error('Linear interpolation failed');
      }
    });

    await this.test('Smooth interpolation', () => {
      const smooth = MathOps.smoothstep(0, 1, 0.5);
      if (Math.abs(smooth - 0.5) > 0.1) {
        throw new Error('Smooth interpolation failed');
      }
    });

    await this.test('3D distance calculation', () => {
      const p1 = [0, 0, 0] as any;
      const p2 = [3, 4, 0] as any;
      const distance = MathOps.distance3D(p1, p2);
      if (Math.abs(distance - 5) > 1e-10) {
        throw new Error('3D distance calculation failed');
      }
    });

    await this.test('Error handling for invalid inputs', () => {
      try {
        MathOps.normalizeAngle('invalid' as any);
        throw new Error('Should have thrown error');
      } catch (error) {
        if ((error as any).message === 'Should have thrown error') {
          throw error;
        }
        // Expected error
      }
    });
  }

  private async testGeometryEngine(): Promise<void> {
    console.log('\n🔺 Testing Geometry Engine...');

    await this.test('Sphere creation', () => {
      const center = [0, 0, 0] as any;
      const sphere = GeometryEngine.createSphere(center, 1, 8);
      if (sphere.vertices.length === 0 || sphere.indices.length === 0) {
        throw new Error('Sphere creation failed');
      }
      if (sphere.vertices.length !== 81) { // (8+1) * (8+1)
        throw new Error('Incorrect vertex count');
      }
    });

    await this.test('Polygon tessellation', () => {
      const square = [[0, 0], [1, 0], [1, 1], [0, 1]] as any;
      const result = GeometryEngine.tessellatePolygon(square);
      if (result.triangles.length === 0) {
        throw new Error('Tessellation failed');
      }
      if (Math.abs(result.area - 1) > 1e-5) {
        throw new Error('Incorrect area calculation');
      }
    });

    await this.test('Geometry error handling', () => {
      try {
        GeometryEngine.createSphere('invalid' as any, 1, 8);
        throw new Error('Should have thrown error');
      } catch (error) {
        if ((error as any).message === 'Should have thrown error') {
          throw error;
        }
        // Expected error
      }
    });
  }

  private async testDataStructures(): Promise<void> {
    console.log('\n📚 Testing Optimized Data Structures...');

    await this.test('Memory pool operations', () => {
      const vec1 = OptimizedDataStructures.getVec3(1, 2, 3);
      if (vec1[0] !== 1 || vec1[1] !== 2 || vec1[2] !== 3) {
        throw new Error('Vec3 pool creation failed');
      }
      
      OptimizedDataStructures.returnVec3(vec1);
      const vec2 = OptimizedDataStructures.getVec3(4, 5, 6);
      if (vec2[0] !== 4 || vec2[1] !== 5 || vec2[2] !== 6) {
        throw new Error('Vec3 pool reuse failed');
      }
    });

    await this.test('Functional data processing', () => {
      const data = [1, 2, 3, 4, 5];
      const processors = [
        (x: number) => x * 2,
        (x: number) => x + 1
      ];
      
      const result = OptimizedDataStructures.processAgentData(data, processors);
      if (result.length !== 5) {
        throw new Error('Data processing failed');
      }
      if (result[0] !== 3) { // (1 * 2) + 1
        throw new Error('Incorrect processing result');
      }
    });

    await this.test('Vector3D type conversion', () => {
      const vec3d = new Vector3D(1, 2, 3);
      const vec3 = vec3d.toVec3();
      if (vec3[0] !== 1 || vec3[1] !== 2 || vec3[2] !== 3) {
        throw new Error('Vec3D to Vec3 conversion failed');
      }
      
      const newVec3d = Vector3D.from(vec3);
      if (newVec3d.x !== 1 || newVec3d.y !== 2 || newVec3d.z !== 3) {
        throw new Error('Vec3 to Vec3D conversion failed');
      }
    });
  }

  private async testMemoryProvider(): Promise<void> {
    console.log('\n💾 Testing Mathematical Memory Provider...');

    const memoryProvider = new MathematicalMemoryProvider();

    await this.test('Memory creation and retrieval', async () => {
      const memory = {
        id: 'test-1234-5678-9012-3456' as any,
        userId: 'user1',
        agentId: 'agent1',
        roomId: 'room1',
        entityId: 'entity1',
        content: {
          text: 'Test memory',
          position: [1, 2, 3]
        },
        createdAt: new Date().toISOString()
      };
      
      await memoryProvider.createMemory(memory, 'test');
      const memories = await memoryProvider.getMemories({
        roomId: 'room1',
        tableName: 'test'
      });
      
      if (memories.length !== 1 || memories[0].id !== 'test-1234-5678-9012-3456') {
        throw new Error('Memory creation/retrieval failed');
      }
    });

    await this.test('Spatial action processing', async () => {
      const initialState = {
        values: {},
        data: {},
        text: 'test state',
        agent_id: 'test_agent',
        position: [0, 0, 0] as any,
        rotation: [0, 0, 0] as any,
        scale: [1, 1, 1] as any,
        velocity: [0, 0, 0] as any,
        acceleration: [0, 0, 0] as any,
        angular_velocity: [0, 0, 0] as any,
        spatial_bounds: {
          min: [-1, -1, -1] as any,
          max: [1, 1, 1] as any,
          center: [0, 0, 0] as any,
          radius: 1,
          volume: 8,
          surface_area: 24
        },
        coordinate_system: 'cartesian' as any,
        precision_level: 'high' as any,
        last_updated: new Date().toISOString()
      };
      
      const action = {
        type: 'move' as const,
        target: [5, 5, 5] as any,
        duration: 1
      };
      
      const newState = await MathematicalActionHandler.processSpatialAction(
        initialState,
        action
      );
      
      if (!newState.position || newState.position[0] === 0) {
        throw new Error('Spatial action processing failed');
      }
    });
  }

  private async testPerformanceBenchmarks(): Promise<void> {
    console.log('\n📊 Testing Performance Benchmarks...');

    await this.test('Performance measurement', () => {
      const result = PerformanceBenchmarks.measure('test_op', () => {
        let sum = 0;
        for (let i = 0; i < 1000; i++) {
          sum += i;
        }
        return sum;
      });
      
      if (result !== 499500) {
        throw new Error('Performance measurement failed');
      }
      
      const stats = PerformanceBenchmarks.getStats('test_op');
      if (!stats || stats.count !== 1) {
        throw new Error('Performance stats failed');
      }
    });

    await this.test('Implementation comparison', () => {
      const comparison = PerformanceBenchmarks.compareImplementations(
        () => {
          for (let i = 0; i < 100; i++) {
            Math.sqrt(i);
          }
        },
        () => {
          for (let i = 0; i < 100; i++) {
            i * 0.5;
          }
        },
        10
      );
      
      if (comparison.improvement <= 0) {
        throw new Error('Implementation comparison failed');
      }
    });
  }
}

/**
 * Main test runner function
 */
export async function runPhase1Tests(): Promise<boolean> {
  const runner = new Phase1TestRunner();
  const success = await runner.runAllTests();
  
  if (success) {
    console.log('\n🎉 Running comprehensive benchmarks...');
    try {
      const benchmarkResults = await runThinngBenchmarks();
      console.log('\n📈 Benchmark Summary:');
      console.log(`   Total Benchmarks: ${benchmarkResults.benchmarks.summary.total_benchmarks}`);
      console.log(`   Average Improvement: ${benchmarkResults.benchmarks.summary.average_improvement.toFixed(2)}x`);
      console.log(`   Validation: ${benchmarkResults.validation ? 'PASSED' : 'FAILED'}`);
    } catch (error) {
      console.log(`⚠️ Benchmarks failed: ${error}`);
    }
  }
  
  return success;
}

export { Phase1TestRunner };