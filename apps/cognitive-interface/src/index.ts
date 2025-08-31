/**
 * Cognitive Interface - Main Entry Point
 * 
 * Revolutionary cognitive-aware interface system for 371 OS.
 * Exports the main components and integration utilities.
 */

export { default as App, CognitiveInterface } from './App';
export * from './components';

// Re-export for easy integration with ElizaOS
export { AdaptiveLayout as CognitiveUI } from './components/AdaptiveLayout';

// Version and metadata
export const VERSION = '1.0.0';
export const COGNITIVE_MODES = [
  'executive',
  'technical', 
  'creative',
  'analytical',
  'collaborative',
  'learning'
] as const;

export type CognitiveModeType = typeof COGNITIVE_MODES[number];