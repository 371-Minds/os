import { describe, test, expect } from 'bun:test';
import BusinessIntelligencePlugin from './plugin';

describe('Business Intelligence Plugin', () => {
  test('should have correct name', () => {
    expect(BusinessIntelligencePlugin.name).toBe('business-intelligence');
  });

  test('should have actions defined', () => {
    expect(BusinessIntelligencePlugin.actions).toBeDefined();
    expect(Array.isArray(BusinessIntelligencePlugin.actions)).toBe(true);
  });

  test('should have providers defined', () => {
    expect(BusinessIntelligencePlugin.providers).toBeDefined();
    expect(Array.isArray(BusinessIntelligencePlugin.providers)).toBe(true);
  });
});