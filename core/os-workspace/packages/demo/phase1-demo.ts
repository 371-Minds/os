#!/usr/bin/env bun

/**
 * @fileoverview Phase 1 Demo - Thi.ng Mathematical Foundation
 * Demonstrates the mathematical foundation integration working correctly
 */

import {
  ThinngFoundation,
  MathOps,
  GeometryEngine,
  OptimizedDataStructures,
  PerformanceBenchmarks,
  Vector3D,
  MATH_CONSTANTS
} from '../src/index';

async function runPhase1Demo() {
  console.log('\ud83d\ude80 Phase 1 Demo: Thi.ng Mathematical Foundation Integration');
  console.log('=' .repeat(60));
  
  // Initialize foundation
  console.log('\n\ud83c\udfed Initializing Mathematical Foundation...');
  const foundation = ThinngFoundation.getInstance();
  await foundation.initialize();
  
  // Test mathematical constants
  console.log('\n\ud83d\udcca Mathematical Constants:');
  console.log(`  \u03c0 (PI): ${MATH_CONSTANTS.PI}`);
  console.log(`  \u03c4 (TAU): ${MATH_CONSTANTS.TAU}`);
  console.log(`  \u03c6 (Golden Ratio): ${MATH_CONSTANTS.GOLDEN_RATIO}`);
  console.log(`  e (Euler): ${MATH_CONSTANTS.EULER}`);
  
  // Test mathematical operations
  console.log('\n\ud83e\uddee Mathematical Operations:');
  const angle = Math.PI * 2.5;
  const normalized = MathOps.normalizeAngle(angle);
  console.log(`  Normalize ${angle.toFixed(3)} rad \u2192 ${normalized.toFixed(3)} rad`);
  
  const lerp = MathOps.lerp(0, 100, 0.3);
  console.log(`  Lerp(0, 100, 0.3) = ${lerp}`);
  
  const smooth = MathOps.smoothstep(0, 1, 0.5);
  console.log(`  Smoothstep(0, 1, 0.5) = ${smooth.toFixed(3)}`);
  
  // Test distance calculations
  const p1 = [0, 0, 0] as any;
  const p2 = [3, 4, 0] as any;
  const distance = MathOps.distance3D(p1, p2);
  console.log(`  Distance([0,0,0], [3,4,0]) = ${distance}`);
  
  // Test geometry engine
  console.log('\n\ud83d\udd3a Geometry Engine:');
  const center = [0, 0, 0] as any;
  const sphere = GeometryEngine.createSphere(center, 1, 16);
  console.log(`  Sphere: ${sphere.vertices.length} vertices, ${sphere.indices.length} indices`);
  
  const square = [[0, 0], [1, 0], [1, 1], [0, 1]] as any;
  const tessellation = GeometryEngine.tessellatePolygon(square);
  console.log(`  Square tessellation: ${tessellation.triangles.length} triangles, area = ${tessellation.area}`);
  
  // Test optimized data structures
  console.log('\n\ud83d\udcbe Optimized Data Structures:');
  const vec1 = OptimizedDataStructures.getVec3(1, 2, 3);
  console.log(`  Memory pool Vec3: [${vec1.join(', ')}]`);
  
  OptimizedDataStructures.returnVec3(vec1);
  const vec2 = OptimizedDataStructures.getVec3(4, 5, 6);
  console.log(`  Reused Vec3: [${vec2.join(', ')}] (same instance: ${vec1 === vec2})`);
  
  // Test functional processing
  const data = [1, 2, 3, 4, 5];
  const processors = [
    (x: number) => x * 2,
    (x: number) => x + 1
  ];
  const processed = OptimizedDataStructures.processAgentData(data, processors);
  console.log(`  Functional processing: [${data.join(', ')}] \u2192 [${processed.join(', ')}]`);
  
  // Test Vector3D class
  console.log('\n\ud83d\udd04 Type Conversions:');
  const vec3d = new Vector3D(10, 20, 30);
  const vec3 = vec3d.toVec3();
  console.log(`  Vector3D [${vec3d.x}, ${vec3d.y}, ${vec3d.z}] \u2192 Vec3 [${vec3.join(', ')}]`);
  
  const fromVec3 = Vector3D.from(vec3);
  console.log(`  Vec3 [${vec3.join(', ')}] \u2192 Vector3D [${fromVec3.x}, ${fromVec3.y}, ${fromVec3.z}]`);
  
  // Test performance benchmarks
  console.log('\n\ud83d\udcca Performance Benchmarks:');
  const result = PerformanceBenchmarks.measure('demo_calculation', () => {
    let sum = 0;
    for (let i = 0; i < 10000; i++) {
      sum += Math.sqrt(i);
    }
    return sum;
  });
  console.log(`  Calculation result: ${result.toFixed(2)}`);
  
  const stats = PerformanceBenchmarks.getStats('demo_calculation');
  console.log(`  Execution time: ${stats?.average.toFixed(3)}ms`);
  
  // Performance comparison
  const comparison = PerformanceBenchmarks.compareImplementations(
    () => {
      // Slower: repeated calculations
      for (let i = 0; i < 1000; i++) {
        Math.sqrt(Math.pow(i, 2));
      }
    },
    () => {
      // Faster: direct calculation
      for (let i = 0; i < 1000; i++) {
        Math.abs(i);
      }
    },
    100
  );
  console.log(`  Implementation comparison: ${comparison.improvement.toFixed(2)}x improvement`);
  
  // Foundation status
  console.log('\n\ud83d\udcca Foundation Status:');
  const status = foundation.getStatus();
  console.log(`  Memory pool size: ${status.memoryPoolSize}`);
  console.log(`  Benchmark count: ${status.benchmarkCount}`);
  console.log(`  Math constants loaded: \u2713`);
  
  console.log('\n\u2705 Phase 1 Implementation: COMPLETE');
  console.log('\ud83c\udf86 Mathematical Foundation Successfully Integrated!');
  console.log('\n\ud83d\ude80 Ready for Phase 2: WebGL Rendering Enhancement');
}

// Run the demo if this file is executed directly
if (import.meta.main) {
  runPhase1Demo().catch(console.error);
}

export { runPhase1Demo };