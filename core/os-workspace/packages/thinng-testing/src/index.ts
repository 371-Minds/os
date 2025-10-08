/**
 * @fileoverview Phase 5 Comprehensive Testing Framework
 * Revolutionary testing infrastructure for 371 OS thi.ng integration validation
 */

// Type exports (these should work since types.ts exists)
export * from './types';

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
  
  try {
    const { ThinngTestingFramework } = await import('./test-framework');
    const framework = ThinngTestingFramework.getInstance();
    await framework.initialize();
    
    console.log('✅ Testing framework ready for Phase 5 validation!');
    return framework;
  } catch (error) {
    console.error('❌ Failed to initialize testing framework:', error);
    throw error;
  }
}

/**
 * Initialize Phase 1 Mathematical Tests
 */
export async function initializePhase1Tests() {
  const { Phase1MathematicalTests } = await import('./phase1-tests');
  return new Phase1MathematicalTests();
}

/**
 * Initialize Phase 2 WebGL Tests
 */
export async function initializePhase2Tests() {
  const { Phase2WebGLTests } = await import('./phase2-webgl-tests');
  return new Phase2WebGLTests();
}

/**
 * Initialize Phase 3 Intelligence Tests
 */
export async function initializePhase3Tests() {
  const { Phase3IntelligenceTests } = await import('./phase3-intelligence-tests');
  return new Phase3IntelligenceTests();
}

/**
 * Initialize Phase 4 Performance Tests
 */
export async function initializePhase4Tests() {
  const { Phase4PerformanceTests } = await import('./phase4-performance-tests');
  return new Phase4PerformanceTests();
}

/**
 * Initialize Cross-Phase Integration Tests
 */
export async function initializeCrossPhaseTests() {
  const { CrossPhaseIntegrationTests } = await import('./cross-phase-integration');
  return new CrossPhaseIntegrationTests();
}