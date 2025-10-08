/**
 * @fileoverview Phase 5 Comprehensive Testing Framework
 * Revolutionary testing infrastructure for 371 OS thi.ng integration validation
 */

export * from './test-framework';
export * from './performance-regression';
export * from './integration-tests';
export * from './test-discovery';
export * from './test-reporting';
export * from './phase1-tests';
export * from './phase2-webgl-tests';
export * from './phase3-intelligence-tests';
export * from './phase4-performance-tests';
export * from './cross-phase-integration';
export * from './types';

// Core testing framework exports
export { ThinngTestingFramework } from './test-framework';
export { PerformanceRegressionSuite } from './performance-regression';
export { IntegrationTestSuite } from './integration-tests';
export { TestDiscoveryEngine } from './test-discovery';
export { TestReportingSystem } from './test-reporting';

// Phase-specific test exports
export { Phase1MathematicalTests } from './phase1-tests';
export { Phase2WebGLTests } from './phase2-webgl-tests';
export { Phase3IntelligenceTests } from './phase3-intelligence-tests';
export { Phase4PerformanceTests } from './phase4-performance-tests';
export { CrossPhaseIntegrationTests } from './cross-phase-integration';

// Version and metadata
export const THINNG_TESTING_VERSION = '1.0.0';
export const SUPPORTED_PHASES = ['phase1', 'phase2', 'phase3', 'phase4'] as const;
export const FRAMEWORK_NAME = '371 OS thi.ng Testing Framework';

/**
 * Initialize the complete testing framework
 */
export async function initializeThinngTesting() {
  console.log(`🧪 ${FRAMEWORK_NAME} v${THINNG_TESTING_VERSION}`);
  console.log('⚡ Initializing comprehensive testing infrastructure...');
  
  const framework = ThinngTestingFramework.getInstance();
  await framework.initialize();
  
  console.log('✅ Testing framework ready for Phase 5 validation!');
  return framework;
}