const { validateAgentConfig, generateUniqueId } = require('../utils/helpers');

describe('QuestFlow Helpers', () => {
  describe('validateAgentConfig', () => {
    it('should return true for a valid agent configuration', () => {
      const validConfig = {
        name: 'test-agent',
        provider: 'openai',
        model: 'gpt-4'
      };
      
      expect(validateAgentConfig(validConfig)).toBe(true);
    });

    it('should return false for an invalid agent configuration', () => {
      const invalidConfig = {
        name: 'test-agent'
        // Missing provider and model
      };
      
      expect(validateAgentConfig(invalidConfig)).toBe(false);
    });

    it('should return false for a non-object input', () => {
      expect(validateAgentConfig(null)).toBe(false);
      expect(validateAgentConfig('string')).toBe(false);
      expect(validateAgentConfig(123)).toBe(false);
    });
  });

  describe('generateUniqueId', () => {
    it('should generate a unique ID', () => {
      const id1 = generateUniqueId();
      const id2 = generateUniqueId();
      
      expect(typeof id1).toBe('string');
      expect(typeof id2).toBe('string');
      expect(id1).not.toBe(id2);
    });
  });
});