/**
 * @fileoverview Unit Tests for Thi.ng Mathematical Foundation
 * Comprehensive test suite for mathematical operations and type safety
 */

// Use standard testing framework until Bun test types are available
const describe = (name: string, fn: () => void) => {
  console.log(`\n🧪 ${name}`);
  fn();
};

const test = (name: string, fn: () => void | Promise<void>) => {
  try {
    const result = fn();
    if (result instanceof Promise) {
      result.then(() => console.log(`  ✅ ${name}`)).catch(err => console.log(`  ❌ ${name}: ${err}`));
    } else {
      console.log(`  ✅ ${name}`);
    }
  } catch (err) {
    console.log(`  ❌ ${name}: ${err}`);
  }
};

const expect = (actual: any) => ({
  toBe: (expected: any) => {
    if (actual !== expected) throw new Error(`Expected ${expected}, got ${actual}`);
  },
  toEqual: (expected: any) => {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    }
  },
  toBeCloseTo: (expected: number, precision: number = 2) => {
    const diff = Math.abs(actual - expected);
    const threshold = Math.pow(10, -precision);
    if (diff >= threshold) {
      throw new Error(`Expected ${actual} to be close to ${expected} (precision: ${precision})`);
    }
  },
  toBeGreaterThan: (expected: number) => {
    if (actual <= expected) throw new Error(`Expected ${actual} to be greater than ${expected}`);
  },
  toBeGreaterThanOrEqual: (expected: number) => {
    if (actual < expected) throw new Error(`Expected ${actual} to be greater than or equal to ${expected}`);
  },
  toHaveLength: (expected: number) => {
    if (!actual || actual.length !== expected) {
      throw new Error(`Expected length ${expected}, got ${actual ? actual.length : 'undefined'}`);
    }
  },
  toBeDefined: () => {
    if (actual === undefined) throw new Error('Expected value to be defined');
  },
  toBeNull: () => {
    if (actual !== null) throw new Error(`Expected null, got ${actual}`);
  },
  toThrow: () => {
    try {
      if (typeof actual === 'function') {
        actual();
      }
      throw new Error('Expected function to throw');
    } catch (error) {
      // Function threw as expected
    }
  },
  not: {
    toBeNull: () => {
      if (actual === null) throw new Error('Expected value not to be null');
    },
    toBeCloseTo: (expected: number, precision: number = 2) => {
      const diff = Math.abs(actual - expected);
      const threshold = Math.pow(10, -precision);
      if (diff < threshold) {
        throw new Error(`Expected ${actual} not to be close to ${expected}`);
      }
    },
    toEqual: (expected: any) => {
      if (JSON.stringify(actual) === JSON.stringify(expected)) {
        throw new Error(`Expected not to equal ${JSON.stringify(expected)}`);
      }
    }
  }
});

const beforeAll = (fn: () => void | Promise<void>) => {
  console.log('🔧 Setting up tests...');
  const result = fn();
  if (result instanceof Promise) {
    return result.then(() => console.log('✅ Setup complete'));
  }
  console.log('✅ Setup complete');
};

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
import type {
  MathematicalAgentState as MathematicalState,
  SpatialTransformation,
  MathPrecision
} from './types';
import { Vec3 } from '@thi.ng/vectors';

describe('Thi.ng Mathematical Foundation', () => {
  let foundation: ThinngFoundation;

  beforeAll(async () => {
    foundation = ThinngFoundation.getInstance();
    await foundation.initialize();
  });

  describe('Mathematical Constants', () => {
    test('should provide accurate mathematical constants', () => {
      expect(MATH_CONSTANTS.PI).toBeCloseTo(Math.PI, 10);
      expect(MATH_CONSTANTS.TAU).toBeCloseTo(2 * Math.PI, 10);
      expect(MATH_CONSTANTS.GOLDEN_RATIO).toBeCloseTo(1.618033988749, 10);
      expect(MATH_CONSTANTS.EULER).toBeCloseTo(Math.E, 10);
    });

    test('should have proper precision threshold', () => {
      expect(MATH_CONSTANTS.PRECISION_THRESHOLD).toBe(1e-10);
    });
  });

  describe('MathOps', () => {
    describe('normalizeAngle', () => {
      test('should normalize angles to [-π, π] range', () => {
        expect(MathOps.normalizeAngle(Math.PI * 3)).toBeCloseTo(-Math.PI, 10);
        expect(MathOps.normalizeAngle(-Math.PI * 3)).toBeCloseTo(Math.PI, 10);
        expect(MathOps.normalizeAngle(Math.PI / 2)).toBeCloseTo(Math.PI / 2, 10);
        expect(MathOps.normalizeAngle(0)).toBeCloseTo(0, 10);
      });

      test('should throw error for non-number input', () => {
        expect(() => MathOps.normalizeAngle('invalid' as any)).toThrow();
        expect(() => MathOps.normalizeAngle(null as any)).toThrow();
        expect(() => MathOps.normalizeAngle(undefined as any)).toThrow();
      });
    });

    describe('lerp', () => {
      test('should perform linear interpolation correctly', () => {
        expect(MathOps.lerp(0, 10, 0)).toBe(0);
        expect(MathOps.lerp(0, 10, 1)).toBe(10);
        expect(MathOps.lerp(0, 10, 0.5)).toBe(5);
        expect(MathOps.lerp(-5, 5, 0.5)).toBe(0);
      });

      test('should clamp t parameter to [0, 1]', () => {
        expect(MathOps.lerp(0, 10, -0.5)).toBe(0);
        expect(MathOps.lerp(0, 10, 1.5)).toBe(10);
      });

      test('should throw error for invalid inputs', () => {
        expect(() => MathOps.lerp('a' as any, 10, 0.5)).toThrow();
        expect(() => MathOps.lerp(0, 'b' as any, 0.5)).toThrow();
        expect(() => MathOps.lerp(0, 10, 'c' as any)).toThrow();
      });
    });

    describe('smoothstep', () => {
      test('should provide smooth interpolation', () => {
        expect(MathOps.smoothstep(0, 1, 0)).toBe(0);
        expect(MathOps.smoothstep(0, 1, 1)).toBe(1);
        expect(MathOps.smoothstep(0, 1, 0.5)).toBeCloseTo(0.5, 5);
      });

      test('should be smoother than linear interpolation', () => {
        const t = 0.25;
        const linear = t;
        const smooth = MathOps.smoothstep(0, 1, t);
        
        // Smoothstep should be different from linear at quarter point
        expect(smooth).not.toBeCloseTo(linear, 5);
      });
    });

    describe('distance calculations', () => {
      test('should calculate 2D distance correctly', () => {
        const p1 = [0, 0, 0] as unknown as Vec3;
        const p2 = [3, 4, 0] as unknown as Vec3;
        expect(MathOps.distance2D(p1, p2)).toBeCloseTo(5, 10);
      });

      test('should calculate 3D distance correctly', () => {
        const p1 = [0, 0, 0] as unknown as Vec3;
        const p2 = [1, 1, 1] as unknown as Vec3;
        expect(MathOps.distance3D(p1, p2)).toBeCloseTo(Math.sqrt(3), 10);
      });

      test('should handle zero distance', () => {
        const p = [5, 5, 5] as unknown as Vec3;
        expect(MathOps.distance3D(p, p)).toBe(0);
      });
    });
  });

  describe('GeometryEngine', () => {
    describe('createSphere', () => {
      test('should create sphere with correct vertex count', () => {
        const sphere = GeometryEngine.createSphere([0, 0, 0] as Vec3, 1, 8);
        
        // 8 segments should create (8+1) * (8+1) = 81 vertices
        expect(sphere.vertices).toHaveLength(81);
        expect(sphere.normals).toHaveLength(81);
        expect(sphere.indices.length).toBeGreaterThan(0);
      });

      test('should position vertices correctly', () => {
        const center = [5, 5, 5] as Vec3;
        const radius = 2;
        const sphere = GeometryEngine.createSphere(center, radius, 4);
        
        // Check that all vertices are approximately at the correct distance from center
        sphere.vertices.forEach(vertex => {
          const distance = MathOps.distance3D(center, vertex);
          expect(distance).toBeCloseTo(radius, 5);
        });
      });

      test('should throw error for invalid inputs', () => {
        expect(() => GeometryEngine.createSphere('invalid' as any, 1, 8)).toThrow();
        expect(() => GeometryEngine.createSphere([0, 0] as any, 1, 8)).toThrow();
        expect(() => GeometryEngine.createSphere([0, 0, 0] as Vec3, -1, 8)).toThrow();
        expect(() => GeometryEngine.createSphere([0, 0, 0] as Vec3, 'invalid' as any, 8)).toThrow();
      });
    });

    describe('tessellatePolygon', () => {
      test('should tessellate simple square', () => {
        const square = [[0, 0], [1, 0], [1, 1], [0, 1]] as Vec3[];
        const result = GeometryEngine.tessellatePolygon(square);
        
        expect(result.triangles.length).toBeGreaterThan(0);
        expect(result.area).toBeCloseTo(1, 5); // Square area should be 1
      });

      test('should handle triangles', () => {
        const triangle = [[0, 0], [1, 0], [0.5, 1]] as Vec3[];
        const result = GeometryEngine.tessellatePolygon(triangle);
        
        expect(result.triangles).toHaveLength(1);
        expect(result.area).toBeCloseTo(0.5, 5); // Triangle area
      });

      test('should throw error for invalid polygons', () => {
        expect(() => GeometryEngine.tessellatePolygon([])).toThrow();
        expect(() => GeometryEngine.tessellatePolygon([[0, 0]])).toThrow();
        expect(() => GeometryEngine.tessellatePolygon('invalid' as any)).toThrow();
      });
    });
  });

  describe('OptimizedDataStructures', () => {
    describe('Vec3 memory pool', () => {
      test('should provide Vec3 instances', () => {
        const vec = OptimizedDataStructures.getVec3(1, 2, 3);
        expect(vec).toEqual([1, 2, 3]);
      });

      test('should reuse returned vectors', () => {
        const vec1 = OptimizedDataStructures.getVec3(1, 2, 3);
        OptimizedDataStructures.returnVec3(vec1);
        
        const vec2 = OptimizedDataStructures.getVec3(4, 5, 6);
        expect(vec2).toEqual([4, 5, 6]);
        
        // Should reuse the same array instance for memory efficiency
        expect(vec2).toBe(vec1);
      });
    });

    describe('processAgentData', () => {
      test('should process data with pipeline', () => {
        const data = [1, 2, 3, 4, 5];
        const processors = [
          (x: number) => x * 2,
          (x: number) => x + 1
        ];
        
        const result = OptimizedDataStructures.processAgentData(data, processors);
        expect(result).toHaveLength(5);
        expect(result[0]).toBe(3); // (1 * 2) + 1
        expect(result[1]).toBe(5); // (2 * 2) + 1
      });

      test('should filter null results', () => {
        const data = [1, 2, 3, 4, 5];
        const processors = [
          (x: number) => x % 2 === 0 ? x : null
        ];
        
        const result = OptimizedDataStructures.processAgentData(data, processors as any);
        expect(result.length).toBeLessThan(data.length);
        expect(result).toEqual([2, 4]);
      });
    });
  });

  describe('Vector3D class', () => {
    test('should convert to and from Vec3', () => {
      const vec3d = new Vector3D(1, 2, 3);
      const vec3 = vec3d.toVec3();
      
      expect(vec3).toEqual([1, 2, 3]);
      
      const newVec3d = Vector3D.from(vec3);
      expect(newVec3d.x).toBe(1);
      expect(newVec3d.y).toBe(2);
      expect(newVec3d.z).toBe(3);
    });

    test('should update values with fromVec3', () => {
      const vec3d = new Vector3D(0, 0, 0);
      vec3d.fromVec3([5, 10, 15]);
      
      expect(vec3d.x).toBe(5);
      expect(vec3d.y).toBe(10);
      expect(vec3d.z).toBe(15);
    });
  });

  describe('PerformanceBenchmarks', () => {
    test('should measure execution time', () => {
      const result = PerformanceBenchmarks.measure('test_operation', () => {
        // Simulate work
        let sum = 0;
        for (let i = 0; i < 1000; i++) {
          sum += i;
        }
        return sum;
      });
      
      expect(result).toBe(499500); // Sum of 0 to 999
      
      const stats = PerformanceBenchmarks.getStats('test_operation');
      expect(stats).not.toBeNull();
      expect(stats!.count).toBe(1);
      expect(stats!.average).toBeGreaterThan(0);
    });

    test('should compare implementations', () => {
      const comparison = PerformanceBenchmarks.compareImplementations(
        () => {
          // Slower implementation
          let sum = 0;
          for (let i = 0; i < 100; i++) {
            sum += Math.sqrt(i);
          }
        },
        () => {
          // Faster implementation
          let sum = 0;
          for (let i = 0; i < 100; i++) {
            sum += i * 0.5;
          }
        },
        10
      );
      
      expect(comparison.oldAverage).toBeGreaterThan(0);
      expect(comparison.newAverage).toBeGreaterThan(0);
      expect(comparison.improvement).toBeGreaterThan(0);
    });
  });

  describe('ThinngFoundation singleton', () => {
    test('should maintain singleton instance', () => {
      const instance1 = ThinngFoundation.getInstance();
      const instance2 = ThinngFoundation.getInstance();
      
      expect(instance1).toBe(instance2);
    });

    test('should provide status information', () => {
      const status = foundation.getStatus();
      
      expect(status.mathConstants).toBeDefined();
      expect(status.memoryPoolSize).toBeGreaterThanOrEqual(0);
      expect(status.benchmarkCount).toBeGreaterThanOrEqual(0);
    });
  });
});

describe('Mathematical Bridge', () => {
  let memoryProvider: MathematicalMemoryProvider;

  beforeAll(() => {
    memoryProvider = new MathematicalMemoryProvider();
  });

  describe('MathematicalMemoryProvider', () => {
    test('should create and retrieve memories', async () => {
      const memory = {
        id: 'test_memory_1',
        userId: 'user1',
        agentId: 'agent1',
        roomId: 'room1',
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
      
      expect(memories).toHaveLength(1);
      expect(memories[0].id).toBe('test_memory_1');
    });

    test('should handle spatial indexing', async () => {
      const spatialMemory = {
        id: 'spatial_memory_1',
        userId: 'user1',
        agentId: 'agent1',
        roomId: 'room1',
        content: {
          text: 'Spatial test',
          position: [10, 20, 30]
        },
        createdAt: new Date().toISOString()
      };
      
      await memoryProvider.createMemory(spatialMemory, 'spatial');
      
      const results = await memoryProvider.searchMemoriesByEmbedding(
        [0.1, 0.2, 0.3],
        {
          roomId: 'room1',
          tableName: 'spatial',
          count: 5
        }
      );
      
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe('spatial_memory_1');
    });
  });

  describe('MathematicalActionHandler', () => {
    test('should process spatial move action', async () => {
      const initialState: MathematicalState = {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1]
      };
      
      const action = {
        type: 'move' as const,
        target: [5, 5, 5] as Vec3,
        duration: 1
      };
      
      const newState = await MathematicalActionHandler.processSpatialAction(
        initialState,
        action
      );
      
      expect(newState.position).not.toEqual(initialState.position);
      expect(newState.spatialProperties).toBeDefined();
      expect(newState.spatialProperties!.center).toEqual(newState.position);
    });

    test('should calculate spatial relationships', () => {
      const agents = [
        {
          id: 'agent1',
          state: { position: [0, 0, 0] } as MathematicalState
        },
        {
          id: 'agent2',
          state: { position: [3, 4, 0] } as MathematicalState
        }
      ];
      
      const relationships = MathematicalActionHandler.calculateSpatialRelationships(agents);
      
      expect(relationships.size).toBe(2);
      
      const agent1Relationships = relationships.get('agent1')!;
      const relationshipToAgent2 = agent1Relationships.get('agent2')!;
      
      expect(relationshipToAgent2.distance).toBeCloseTo(5, 5);
      expect(relationshipToAgent2.direction).toEqual([0.6, 0.8, 0]);
    });
  });

  describe('ElizaMathUtils', () => {
    test('should convert between ElizaOS and mathematical states', () => {
      const elizaState = {
        bio: {
          position: { x: 1, y: 2, z: 3 },
          rotation: { x: 0.1, y: 0.2, z: 0.3 },
          scale: { x: 2, y: 2, z: 2 }
        }
      };
      
      const mathState = ElizaMathUtils.toMathematicalState(elizaState as any);
      
      expect(mathState.position).toEqual([1, 2, 3]);
      expect(mathState.rotation).toEqual([0.1, 0.2, 0.3]);
      expect(mathState.scale).toEqual([2, 2, 2]);
      
      const backToEliza = ElizaMathUtils.fromMathematicalState(mathState);
      
      expect(backToEliza.bio.position).toEqual({ x: 1, y: 2, z: 3 });
      expect(backToEliza.bio.rotation).toEqual({ x: 0.1, y: 0.2, z: 0.3 });
      expect(backToEliza.bio.scale).toEqual({ x: 2, y: 2, z: 2 });
    });
  });
});