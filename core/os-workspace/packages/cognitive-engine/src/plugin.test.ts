import { describe, test, expect } from 'bun:test';
import { CognitiveEnginePlugin } from './plugin';

describe('Cognitive Engine Plugin', () => {
  test('should have correct name', () => {
    expect(CognitiveEnginePlugin.name).toBe('cognitive-engine');
  });

  test('should have actions defined', () => {
    expect(CognitiveEnginePlugin.actions).toBeDefined();
    expect(Array.isArray(CognitiveEnginePlugin.actions)).toBe(true);
  });

  test('should have providers defined', () => {
    expect(CognitiveEnginePlugin.providers).toBeDefined();
    expect(Array.isArray(CognitiveEnginePlugin.providers)).toBe(true);
  });
});